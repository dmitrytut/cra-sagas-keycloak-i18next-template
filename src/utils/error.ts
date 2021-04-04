import { IError } from '../common/models';

/**
 * Type guard for checking whether the object is IError.
 *
 * @param {any | IError} obj Object for checking.
 */
export function isError(obj: any | IError): obj is IError {
    return Boolean(obj?.message) && Boolean(obj?.code);
}
