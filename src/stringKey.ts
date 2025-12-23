import Req from "./http"
import RequestOptions, { Opt } from "./config"


export default class stringKey<T> {
    constructor(public key: string, public dataSchemaInstace: T | null = null) {
    }

    public ConcatKey(...fields: any[]): stringKey<T> {
        const newKey = [this.key, ...fields].filter((v) => !!v).join(":")
        return new stringKey<T>(newKey, this.dataSchemaInstace);
    }

    public get = (Field: string = "", opt: RequestOptions = Opt) =>
        Req(opt).get(`${opt.baseUrl}/GET-${this.key}?f=${encodeURIComponent(Field)}`)

    public set = (Field: string = "", data: any, opt: RequestOptions = Opt) =>
        Req(opt).put(`${opt.baseUrl}/SET-${this.key}?f=${encodeURIComponent(Field)}`, data)

}