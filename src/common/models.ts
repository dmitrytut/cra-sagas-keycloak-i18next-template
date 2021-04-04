import { Failure, Success } from 'typescript-fsa';
import { ECheckErrorLevel, EProcessStatus } from './enums';

/**
 *  Validation error interface.
 */
export interface ICheckError {
    /** Error message. */
    message: string;

    /** Error path. */
    path?: string;

    /** Error level. */
    level?: ECheckErrorLevel;
}

/**
 * Interface that defines the common properties for error objects.
 */
export interface IError {
    /** Validation errors. */
    checks?: ICheckError[];

    /** Error code. */
    code?: string;

    /** HTTP error code. */
    httpCode?: number;

    /** Error flag. */
    error?: boolean;

    /** Error message. */
    message?: string;

    /** Error unique ID. */
    uuid?: string;

    /** Data. */
    data?: {
        linkText: string;
        linkUrl: string;
    };
}

/**
 * Async loading data.
 */
export interface IAsyncData<T, M = any> {
    /** Data. */
    data?: T;

    /** Meta. */
    meta?: M;

    /** Error. */
    error?: IError;

    /** Data loading state. */
    status: EProcessStatus;
}

/**
 * Пагинация.
 */
export interface IPagination {
    /** Количество элементов на странице. */
    perPage: number;
    /** Номер текущей страницы. */
    page: number;
}

/**
 * Подробная информация по пагинации.
 */
export interface IPaginationInfo extends IPagination {
    /** Общее количество элементов. */
    total: number;
}

/**
 * List.
 */
export interface IItems<TItem, TMeta = Record<string, never>> {
    /** List of items. */
    data: TItem[];

    /** Meta data. */
    meta?: TMeta;
}

/**
 * Single item.
 */
export interface IItem<TItem, TMeta = Record<string, never>> {
    /** Item. */
    data: TItem;

    /** Meta data. */
    meta?: TMeta;
}

/**
 * Список элементов с пагинацией.
 */
export interface IPaginatedItems<TItem, TMeta = Record<string, never>> extends IItems<TItem, TMeta>, IPaginationInfo {}

/**
 * Async result type.
 */
export type TAsyncResult<T, M = any> = IItem<T, M> | IItems<T, M> | IPaginatedItems<any, any> | void;

/**
 * Success payload type.
 */
export type TSuccessPayload<P, R> = Success<P, R>;

/**
 * Failure payload type.
 */
export type TFailurePayload<P> = Failure<P, IError>;

/**
 * Async action Payload type.
 */
export type TAsyncActionPayload<P, R> = TSuccessPayload<P, R> | TFailurePayload<P>;

/**
 * Action payload type.
 */
export type TActionPayload<P, R> = { payload: P | TAsyncActionPayload<P, R> };

export type Nullable<T> = T | null;
