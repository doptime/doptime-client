import RequestOptions from "./config";
/**
 * @template T
 */
export default class ListKey<T> {
    key: string;
    dataSchemaInstance: T | null;
    constructor(key: string, dataSchemaInstance?: T | null);
    /**
     * Concatenates additional fields to the current key to form a new key.
     * @param fields Additional fields to append to the key.
     * @returns A new ListKey instance with the concatenated key.
     */
    concatKey(...fields: any[]): ListKey<T>;
    /**
     * (LINDEX) Gets the element at the specified index in the list.
     * @param index Index of the element to retrieve.
     * @param opt Optional request options.
     * @returns Promise resolving to the element at the index, or null if index is out of bounds.
     */
    lIndex: (index: number, opt?: RequestOptions) => Promise<T | null>;
    /**
     * (LPOP) Removes and returns the first element of the list.
     * @param opt Optional request options.
     * @returns Promise resolving to the removed element, or null if the list is empty.
     */
    lPop: (opt?: RequestOptions) => Promise<T | null>;
    /**
     * (LPUSH) Inserts one or more values at the beginning of the list.
     * @param data The value(s) to insert. Should be a single value or an array for multiple values.
     * @param opt Optional request options.
     * @returns Promise resolving to the length of the list after the push operation.
     */
    lPush: (data: any, opt?: RequestOptions) => Promise<number>;
    /**
     * (LREM) Removes elements equal to the provided value based on count.
     * @param count Number of occurrences to remove (sign indicates direction).
     * @param data The value to match for removal.
     * @param opt Optional request options.
     * @returns Promise resolving to the number of removed elements.
     */
    lRem: (count: number, data: any, opt?: RequestOptions) => Promise<number>;
    /**
     * (LSET) Sets the value of an element at the specified index.
     * @param index Index of the element to update.
     * @param data New value to set.
     * @param opt Optional request options.
     * @returns Promise resolving to "OK" if successful.
     */
    lSet: (index: number, data: any, opt?: RequestOptions) => Promise<string>;
    /**
     * (LTRIM) Trims the list to the specified range.
     * @param start Start index (inclusive).
     * @param stop End index (inclusive).
     * @param opt Optional request options.
     * @returns Promise resolving to "OK" if successful.
     */
    lTrim: (start: number, stop: number, opt?: RequestOptions) => Promise<string>;
    /**
     * (RPOP) Removes and returns the last element of the list.
     * @param opt Optional request options.
     * @returns Promise resolving to the removed element, or null if the list is empty.
     */
    rPop: (opt?: RequestOptions) => Promise<T | null>;
    /**
     * (RPUSH) Appends one or more values at the end of the list.
     * @param data The value(s) to append.
     * @param opt Optional request options.
     * @returns Promise resolving to the length of the list after the push operation.
     */
    rPush: (data: any, opt?: RequestOptions) => Promise<number>;
    /**
     * (RPUSHX) Appends the value at the end of the list only if it exists.
     * @param data The value to append.
     * @param opt Optional request options.
     * @returns Promise resolving to the length of the list after the push, or 0 if the list doesn't exist.
     */
    rPushX: (data: any, opt?: RequestOptions) => Promise<number>;
    /**
     * (LLEN) Gets the length of the list.
     * @param opt Optional request options.
     * @returns Promise resolving to the length of the list.
     */
    lLen: (opt?: RequestOptions) => Promise<number>;
    /**
     * (LRANGE) Gets a range of elements from the list.
     * @param start Start index (inclusive).
     * @param stop End index (inclusive).
     * @param opt Optional request options (defaulting to binary/msgpack response handling).
     * @returns Promise resolving to an array of elements in the specified range.
     */
    lRange: (start: number, stop: number, opt?: RequestOptions) => Promise<T[]>;
}
