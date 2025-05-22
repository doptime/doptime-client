import Req from "./http";
import RequestOptions, { Opt } from "./Option";

/**
 * @template T
 */
export default class ListKey<T> {
    constructor(public key: string, public dataSchemaInstance: T | null = null) { }

    /**
     * Concatenates additional fields to the current key to form a new key.
     * @param fields Additional fields to append to the key.
     * @returns A new ListKey instance with the concatenated key.
     */
    public concatKey(...fields: any[]): ListKey<T> {
        const newKey = [this.key, ...fields].filter((v) => !!v).join(":");
        return new ListKey<T>(newKey, this.dataSchemaInstance); 
    }

    /**
     * (LINDEX) Gets the element at the specified index in the list.
     * @param index Index of the element to retrieve.
     * @param opt Optional request options.
     * @returns Promise resolving to the element at the index, or null if index is out of bounds.
     */
    public lIndex = (index: number, opt: RequestOptions = Opt): Promise<T | null> =>
        Req(opt).get(`${opt.baseUrl}/LINDEX-${this.key}?Index=${index}`);

    /**
     * (LPOP) Removes and returns the first element of the list.
     * @param opt Optional request options.
     * @returns Promise resolving to the removed element, or null if the list is empty.
     */
    public lPop = (opt: RequestOptions = Opt): Promise<T | null> =>
        Req(opt).delete(`${opt.baseUrl}/LPOP-${this.key}`);

    /**
     * (LPUSH) Inserts one or more values at the beginning of the list.
     * @param data The value(s) to insert. Should be a single value or an array for multiple values.
     * @param opt Optional request options.
     * @returns Promise resolving to the length of the list after the push operation.
     */
    public lPush = (data: any, opt: RequestOptions = Opt): Promise<number> =>
        Req(opt).post(`${opt.baseUrl}/LPUSH-${this.key}`, data);

    /**
     * (LREM) Removes elements equal to the provided value based on count.
     * @param count Number of occurrences to remove (sign indicates direction).
     * @param data The value to match for removal.
     * @param opt Optional request options.
     * @returns Promise resolving to the number of removed elements.
     */
    public lRem = (count: number, data: any, opt: RequestOptions = Opt): Promise<number> =>
        Req(opt).delete(`${opt.baseUrl}/LREM-${this.key}?Count=${count}`, data);

    /**
     * (LSET) Sets the value of an element at the specified index.
     * @param index Index of the element to update.
     * @param data New value to set.
     * @param opt Optional request options.
     * @returns Promise resolving to "OK" if successful.
     */
    public lSet = (index: number, data: any, opt: RequestOptions = Opt): Promise<string> =>
        Req(opt).put(`${opt.baseUrl}/LSET-${this.key}?Index=${index}`, data);

    /**
     * (LTRIM) Trims the list to the specified range.
     * @param start Start index (inclusive).
     * @param stop End index (inclusive).
     * @param opt Optional request options.
     * @returns Promise resolving to "OK" if successful.
     */
    public lTrim = (start: number, stop: number, opt: RequestOptions = Opt): Promise<string> =>
        Req(opt).put(`${opt.baseUrl}/LTRIM-${this.key}?Start=${start}&Stop=${stop}`);

    /**
     * (RPOP) Removes and returns the last element of the list.
     * @param opt Optional request options.
     * @returns Promise resolving to the removed element, or null if the list is empty.
     */
    public rPop = (opt: RequestOptions = Opt): Promise<T | null> =>
        Req(opt).delete(`${opt.baseUrl}/RPOP-${this.key}`);

    /**
     * (RPUSH) Appends one or more values at the end of the list.
     * @param data The value(s) to append.
     * @param opt Optional request options.
     * @returns Promise resolving to the length of the list after the push operation.
     */
    public rPush = (data: any, opt: RequestOptions = Opt): Promise<number> =>
        Req(opt).post(`${opt.baseUrl}/RPUSH-${this.key}`, data);

    /**
     * (RPUSHX) Appends the value at the end of the list only if it exists.
     * @param data The value to append.
     * @param opt Optional request options.
     * @returns Promise resolving to the length of the list after the push, or 0 if the list doesn't exist.
     */
    public rPushX = (data: any, opt: RequestOptions = Opt): Promise<number> =>
        Req(opt).post(`${opt.baseUrl}/RPUSHX-${this.key}`, data);

    /**
     * (LLEN) Gets the length of the list.
     * @param opt Optional request options.
     * @returns Promise resolving to the length of the list.
     */
    public lLen = (opt: RequestOptions = Opt): Promise<number> =>
        Req(opt).get(`${opt.baseUrl}/LLEN-${this.key}`);

    /**
     * (LRANGE) Gets a range of elements from the list.
     * @param start Start index (inclusive).
     * @param stop End index (inclusive).
     * @param opt Optional request options (defaulting to binary/msgpack response handling).
     * @returns Promise resolving to an array of elements in the specified range.
     */
    public lRange = (start: number, stop: number, opt: RequestOptions = Opt): Promise<T[]> =>
        Req(opt).get(`${opt.baseUrl}/LRANGE-${this.key}?Start=${start}&Stop=${stop}`);
}