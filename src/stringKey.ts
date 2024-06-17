import Req from "./http"
import OptionClass, { Option } from "./Option"

export default class stringKey {
    constructor(public key: string) {
    }
    public get = (Field: string = "", opt: OptionClass = Option) =>
        Req(opt).get(`${opt.Urlbase}/GET-!${this.key}${opt.paramString()}?F=${encodeURIComponent(Field)}`)


}