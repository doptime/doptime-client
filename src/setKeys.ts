import Req from "./http"
import RequestOptions, { Option } from "./Option"
import { checkSchema, dataObjectToSchema } from "./dataschema"


export default class setKey {
    private dataSchema: any = null
    constructor(public key: string, public dataSchemaInstace: any = null) {
        if (!!this.dataSchemaInstace) this.dataSchema = dataObjectToSchema(this.dataSchemaInstace)
    }

    public ConcatKey(...fields: any[]): setKey {
        const newKey = [this.key, ...fields].filter((v) => !!v).join(":")
        const _key = new setKey(newKey);
        _key.dataSchema = this.dataSchema;
        return _key;
    }

    public sIsMember = (Key: string, Member: string, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/SISMEMBER-${this.key}?Member=${Member}`)

    public sScan = (Key: string, Cursor: number, Match: string, Count = 4096, opt: RequestOptions = Option.responseAsMsgpack()) =>
        Req(opt, "arraybuffer").get(`${opt.baseUrl}/SSCAN-${this.key}?Cursor=${Cursor}&Match=${encodeURIComponent(Match)}&Count=${Count}`)
    public sCard = (Key: string, opt: RequestOptions = Option) =>
        Req(opt).get(`${opt.baseUrl}/SCARD-${this.key}`)

}