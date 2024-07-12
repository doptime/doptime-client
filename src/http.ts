
import axios, { Axios, ResponseType } from "axios";
var msgpack = require('@ygoe/msgpack');
import RequestOptions, { Option } from "./Option"



const Req = (option: RequestOptions, responseType: ResponseType = "json") => {
    let req = axios.create({ headers: option.headers, responseType })
    req.interceptors.request.use(
        (config: any) => {
            if (config.method === "post" || config.method === "put") {
                //if type of data is Object ,convert to object
                if (typeof config.data === "object" && !(config.data instanceof Array)) config.data = Object.assign({}, config.data);


                let datatype = typeof config.data
                //use text format rather than msgpack format if datatype is either bigint, number, string, or boolean
                if (!(datatype === "bigint" || datatype === "number" || datatype === "string" || datatype === "boolean")) {
                    config.data = msgpack.encode(config.data);
                }

                //if config.data is uint8 array ,create new buffer of it's length and copy it to new buffer
                if (config.data instanceof Uint8Array) {
                    let buf = new ArrayBuffer(config.data.length);
                    let view = new Uint8Array(buf);
                    for (let i = 0; i < config.data.length; ++i) {
                        view[i] = config.data[i];
                    }
                    config.data = buf;
                }
                config.headers["Content-Type"] = "application/octet-stream";
            }
            return config;
        },
        (error: any) => {
            return Promise.reject(error);
        }
    );
    req.interceptors.response.use(
        (response: any) => {
            if ("data" in response) {
                if (responseType === "arraybuffer") return msgpack.decode(new Uint8Array(response.data));
                return response.data;
            }
            return response
        },
        (error: any) => {
            if (!!option.primaryErrorHandler) option.primaryErrorHandler(error);
            if (option.throwSecondaryPromiseError) return Promise.reject(error);
        }
    );
    return req
};
export default Req