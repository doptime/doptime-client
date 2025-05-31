import Req from "./http"; // Assuming Req is a function that handles HTTP requests and returns Promises
import RequestOptions, { Opt } from "./Option"; // Assuming RequestOptions and a default Opt instance

export default class hashKey<T> {
    /**
     * Creates an instance of hashKey.
     * @param key The base key for the hash in the data store.
     * @param dataSchemaInstance An instance or representation of the schema for type T, potentially used for validation or transformation.
     */
    constructor(public key: string, public dataSchemaInstance: T | null = null) {
    }

    /**
     * Concatenates additional fields to the current key to form a new key.
     * @param fields Additional string segments to append to the key.
     * @returns A new hashKey instance with the concatenated key.
     */
    public ConcatKey(...fields: string[]): hashKey<T> {
        const newKey = [this.key, ...fields].filter((v) => !!v).join(":");
        return new hashKey<T>(newKey, this.dataSchemaInstance);
    }

    /**
     * (HEXISTS) Checks if a field exists in the hash.
     * @param Field The field name to check.
     * @param opt Optional request options.
     * @returns Promise resolving to true if the field exists, or false if the field does not exist or the key does not exist.

     */
    public hExists = (Field: string = "", opt: RequestOptions = Opt): Promise<boolean> =>
        Req(opt).get(`${opt.baseUrl}/HEXISTS-${this.key}?f=${encodeURIComponent(Field)}`);

    /**
     * (HSET) Sets the specified field to its respective value in the hash stored at key.
     * If field already exists in the hash, it is overwritten.
     * The type of `data` is `Partial<T>`, implying the value stored for the field is an object conforming to `Partial<T>`.
     * @param Field The field name to set.
     * @param data The value to set for the field, expected to be of type `Partial<T>`.
     * @param opt Optional request options.
     * @returns Promise resolving to the number of fields that were added (1 if field is new, 0 if field was updated).
     */
    public hSet = (Field: string = "", data: Partial<T>, opt: RequestOptions = Opt): Promise<number> =>
        Req(opt).put(`${opt.baseUrl}/HSET-${this.key}?f=${encodeURIComponent(Field)}`, data);

    /**
     * (HGET) Gets the value of a field in the hash.
     * Assumes the value stored is of type `Partial<T>` and will be deserialized.
     * @param Field The field name to retrieve.
     * @param opt Optional request options.
     * @returns Promise resolving to the value of the field (as `Partial<T>`), or null if the field or key does not exist.
     */
    public hGet = (Field: string = "", opt: RequestOptions = Opt): Promise<Partial<T> | null> =>
        Req(opt).get(`${opt.baseUrl}/HGET-${this.key}?f=${encodeURIComponent(Field)}`);

    /**
     * (HDEL) Removes the specified field from the hash.
     * @param Field The field name to delete.
     * @param opt Optional request options.
     * @returns Promise resolving to the number of fields that were removed from the hash (0 or 1).
     */
    public hDel = async (Field: string = "", opt: RequestOptions = Opt): Promise<number> =>
        Req(opt).delete(`${opt.baseUrl}/HDEL-${this.key}?f=${encodeURIComponent(Field)}`);

    /**
     * (HGETALL) Gets all fields and values in the hash.
     * Assumes values are of type `Partial<T>` and will be deserialized.
     * @param opt Optional request options.
     * @returns Promise resolving to an object where keys are field names and values are of type `Partial<T>`, or null if the key does not exist.
     */
    public hGetAll = (opt: RequestOptions = Opt): Promise<Record<string, Partial<T>> | null> =>
        Req(opt).get(`${opt.baseUrl}/HGETALL-${this.key}`);

    /**
     * (HVALS) Gets all values in the hash.
     * Assumes values are of type `Partial<T>` and will be deserialized.
     * @param opt Optional request options.
     * @returns Promise resolving to an array of values (each as `Partial<T>`) from the hash.
     */
    public hVals = (opt: RequestOptions = Opt): Promise<Partial<T>[]> =>
        Req(opt).get(`${opt.baseUrl}/HVALS-${this.key}`);

    /**
     * (HKEYS) Gets all field names in the hash.
     * @param opt Optional request options.
     * @returns Promise resolving to an array of field names.
     */
    public hKeys = (opt: RequestOptions = Opt): Promise<string[]> =>
        Req(opt).get(`${opt.baseUrl}/HKEYS-${this.key}`);

    /**
     * (HRANDFIELD) Gets one or more random field names from the hash.
     * @param Count The number of random fields to return. If positive, returns distinct fields.
     * @param opt Optional request options.
     * @returns Promise resolving to an array of random field names, or null/empty array if the key doesn't exist or count is zero.
     */
    public hRandField = (Count: number, opt: RequestOptions = Opt): Promise<string[] | null> =>
        Req(opt).get(`${opt.baseUrl}/HRANDFIELD-${this.key}?Count=${Count}`);

    /**
     * (HMGET) Gets the values of multiple fields in the hash.
     * Assumes values are of type `Partial<T>` and will be deserialized.
     * @param Fields An array of field names to retrieve.
     * @param opt Optional request options.
     * @returns Promise resolving to an array of values (each as `Partial<T>` or null if the field does not exist) corresponding to the specified fields.
     */
    public hMGet = (Fields: string[] = [], opt: RequestOptions = Opt): Promise<(Partial<T> | null)[]> =>
        Req(opt).get(`${opt.baseUrl}/HMGET-${this.key}?f=${encodeURIComponent(Fields.join(","))}`);

    /**
     * (HMSET) Sets multiple fields to their respective values in a hash.
     * Each value is assumed to be of type `Partial<T>`.
     * @param data An object where each key is a field name and each value is the value (of type `Partial<T>`) to set for that field.
     * @param opt Optional request options.
     * @returns Promise resolving when the operation is successful (e.g., with void or a status string like "OK" from the API).
     */
    public hMSet = (data: Record<string, Partial<T>>, opt: RequestOptions = Opt): Promise<void> => // Or Promise<string> if API returns "OK"
        Req(opt).put(`${opt.baseUrl}/HMSET-${this.key}`, data);

    /**
     * (HINCRBY) Atomically increments the integer value of a hash field by the given number.
     * If the field does not exist, it is set to 0 before performing the operation.
     * An error is returned if the field contains a value of the wrong type or a string that cannot be represented as an integer.
     * @param Field The field name in the hash.
     * @param Increment The amount to increment the field's value by.
     * @param opt Optional request options.
     * @returns Promise resolving to the value of the field after the increment.
     */
    public hIncrBy = (Field: string, Increment: number, opt: RequestOptions = Opt): Promise<number> =>
        Req(opt).put(`${opt.baseUrl}/HINCRBY-${this.key}?Field=${Field}&Increment=${Increment}`);

    /**
     * (HINCRBYFLOAT) Atomically increments the float value of a hash field by the given number.
     * If the field does not exist, it is set to 0 before performing the operation.
     * An error is returned if the field contains a value of the wrong type or a string that cannot be represented as a float.
     * @param Field The field name in the hash.
     * @param Increment The amount to increment the field's value by (can be a float).
     * @param opt Optional request options.
     * @returns Promise resolving to the value of the field after the increment (as a number).
     */
    public hIncrByFloat = (Field: string, Increment: number, opt: RequestOptions = Opt): Promise<number> =>
        Req(opt).put(`${opt.baseUrl}/HINCRBYFLOAT-${this.key}?Field=${Field}&Increment=${Increment}`);

    /**
     * (HSCAN) Incrementally iterates over fields and values of a hash.
     * @param Cursor The cursor for the iteration. Start with 0 for the first call.
     * @param Match A glob-style pattern to filter fields.
     * @param Count An optional hint for the number of elements to return per scan. Default is 4096.
     * @param NOVALUES If true, values are not returned, only field names. Default is false.
     * @param opt Optional request options.
     * @returns Promise resolving to a tuple: `[newCursor: string, elements: string[] | Record<string, Partial<T>>]`.
     * `newCursor` is the cursor for the next iteration (a "0" string means iteration is complete).
     * `elements` is an array of field names if `NOVALUES` is true,
     * or a Record of field-value pairs (where values are `Partial<T>`) if `NOVALUES` is false.
     * The exact structure returned by `Req` for `elements` needs to match this type.
     */
    public hScan = (Cursor: number, Match: string, Count = 4096, NOVALUES: boolean = false, opt: RequestOptions = Opt): Promise<[string, string[] | Record<string, Partial<T>>]> =>
        Req(opt).get(`${opt.baseUrl}/HSCAN-${this.key}?Cursor=${Cursor}&Match=${encodeURIComponent(Match)}&Count=${Count}${NOVALUES ? "&NOVALUES=true" : ""}`);

    /**
     * (HLEN) Gets the number of fields contained in the hash stored at key.
     * @param opt Optional request options.
     * @returns Promise resolving to the number of fields in the hash, or 0 if the key does not exist.
     */
    public hLen = (opt: RequestOptions = Opt): Promise<number> =>
        Req(opt).get(`${opt.baseUrl}/HLEN-${this.key}`);
}