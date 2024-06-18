import { ResponseType } from "axios";
import RequestOptions from "./Option";
declare const Req: (option: RequestOptions, responseType?: ResponseType) => import("axios").AxiosInstance;
export default Req;
