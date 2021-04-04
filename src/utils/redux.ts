import { SagaIterator } from 'redux-saga';
import { Action, AsyncActionCreators } from 'typescript-fsa';
import { call } from 'redux-saga/effects';

import { EProcessStatus } from '../common/enums';
import { IAsyncData, IError, IItem, IItems, IPaginatedItems, TActionPayload, TAsyncResult, TFailurePayload, TSuccessPayload } from '../common/models';

/**
 * Reducers handler type.
 */
type THandler<P, S, R> = (state: S, payload: TActionPayload<P, R>) => S;

/**
 * Async reducers handler type.
 */
type TAsyncReducerHandlers<P, S, R> = Record<keyof Omit<AsyncActionCreators<P, R, IError>, 'type'>, THandler<P, S, R>>;

/**
 * Partial async reducers handler type.
 */
type TAsyncReducerHandlersPartial<P, S, R> = Record<keyof Partial<Omit<AsyncActionCreators<P, R, IError>, 'type'>>, THandler<P, S, R>>;

/**
 * Reducers type.
 */
type TReducer<P, S, R> = Record<string, THandler<P, S, R>>;

const isResultPaginated = (result: TAsyncResult<any>): result is IPaginatedItems<any, any> => !!(result as IPaginatedItems<any>)?.page;

/**
 * Generates action namespace duck.
 *
 * @param scope Scope name or array of names.
 * @param duckName Duck name.
 */
export const getActionNamespace = (duckName: string, scope: string | string[] = ''): string =>
    scope ? `${Array.isArray(scope) ? scope.join('/') : `${scope}/`}${duckName}` : duckName;

/**
 * Generates async data.
 *
 * @param data {T} Entity data.
 * @param meta {M} Meta information about entity.
 * @param error {Error} Error object.
 * @param status {EProcessStatus} Current branch status.
 */
export const generateAsyncData = <T, M = any>(data?: T, meta?: M, error?: Error, status: EProcessStatus = EProcessStatus.IDLE): IAsyncData<T, M> => ({
    data,
    error,
    meta,
    status,
});

/**
 * Generates initial async data.
 */
export const getInitialAsyncData = <T, M = any>(initialData?: T, initialMeta?: M): IAsyncData<T, M> => generateAsyncData(initialData, initialMeta);

/**
 * Async default handlers.
 */
export function asyncDefaultHandlers<Payload, State extends IAsyncData<any>, Result extends TAsyncResult<any>>(): TAsyncReducerHandlers<
    Payload,
    State,
    Result
> {
    return {
        done: (state, payload) => {
            const result = (payload.payload as TSuccessPayload<Payload, Result>).result;
            let data;
            let meta;

            if (result) {
                data = (result as IItem<any, any> | IItems<any, any>).data;
                meta = (result as IItem<any, any> | IItems<any, any>).meta;

                if (isResultPaginated(result)) {
                    meta = {
                        ...(meta || {}),
                        page: result.page,
                        perPage: result.perPage,
                        total: result.total,
                    };
                }
            }

            return {
                ...state,
                data,
                error: undefined,
                meta,
                status: EProcessStatus.SUCCESS,
            } as State;
        },
        failed: (state, payload) => ({
            ...state,
            error: (payload.payload as TFailurePayload<Payload>).error,
            status: EProcessStatus.ERROR,
        }),
        started: (state) => ({
            ...state,
            status: EProcessStatus.PENDING,
        }),
    };
}

/**
 * Reducers generator for asynchronous data.
 *
 * @param asyncActionCreator Base action creator.
 * @param customHandlers Custom async action handlers.
 * @type {Payload} Payload data type.
 * @type {State} State data type.
 * @type {Result} Response data type.
 */
export function asyncReducer<Payload, State extends IAsyncData<any>, Result extends TAsyncResult<any>>(
    asyncActionCreator: AsyncActionCreators<Payload, Result, IError>,
    customHandlers?: TAsyncReducerHandlersPartial<Payload, State, Result>,
): TReducer<Payload, State, Result> {
    let handlers = asyncDefaultHandlers<Payload, State, Result>();

    if (customHandlers) {
        handlers = {
            ...handlers,
            ...customHandlers,
        };
    }

    return {
        [asyncActionCreator.started.type]: (state: State, payload: TActionPayload<Payload, Result>) => handlers.started(state, payload),
        [asyncActionCreator.done.type]: (state: State, payload: TActionPayload<Payload, Result>) => handlers.done(state, payload),
        [asyncActionCreator.failed.type]: (state: State, payload: TActionPayload<Payload, Result>) => handlers.failed(state, payload),
    };
}

/**
 * Wrapper for handling saga call effect exceptions that are handled in reducers.
 */
export function safeCall<P>(worker: (params: P, ...args: any[]) => SagaIterator): any {
    return function* (action: Action<P>): SagaIterator {
        try {
            yield call(worker, action.payload);
        } catch (e) {
            console.log(e);
        }
    };
}

/** Is async branch is in initial state. */
export const isInitial = (data: IAsyncData<any>) => data.status === EProcessStatus.IDLE;

/** Is async branch is in loading state. */
export const isLoading = (data: IAsyncData<any>) => data.status === EProcessStatus.PENDING || data.status === EProcessStatus.IDLE;

/** Is async branch is in pending state. */
export const isPending = (data: IAsyncData<any>) => data.status === EProcessStatus.PENDING;

/** Is async branch is in success state. */
export const isSuccess = (data: IAsyncData<any>) => data.status === EProcessStatus.SUCCESS;

/** Is async branch is in error state. */
export const isError = (data: IAsyncData<any>) => data.status === EProcessStatus.ERROR;

/** Is async branch is in initial loading state. */
export const isInitialLoading = (data: IAsyncData<any>) => isLoading(data) && !data.data;

/** Is async branch is in initial pending state. */
export const isInitialPending = (data: IAsyncData<any>) => isPending(data) && !data.data;

/** Is there are validation errors in async branch. */
export const isValidationError = (data: IAsyncData<any>) =>
    data.status === EProcessStatus.ERROR && Array.isArray(data.error?.checks) && Boolean(data.error?.checks);
