import { ResponseType } from "axios";
import OptionClass from "./Option";
declare const Req: (option: OptionClass, responseType?: ResponseType) => import("axios").AxiosInstance;
export default Req;
