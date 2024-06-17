export default class OptionClass {
    UrlItems: {
        [key: string]: string;
    };
    Header: {
        [key: string]: string;
    };
    WithHeader: (key: string, value: string) => OptionClass;
    primaryErrorHandler: Function;
    Urlbase: string;
    private optionCopiedFromDefault;
    withUrlField: (key: string, value: string) => OptionClass;
    rspTypeJson: () => OptionClass;
    rspTypeJpeg: () => OptionClass;
    rspTypeOgg: () => OptionClass;
    rspTypeMpeg: () => OptionClass;
    rspTypeMp4: () => OptionClass;
    rspTypeText: () => OptionClass;
    rspTypeStream: () => OptionClass;
    rspTypeMsgpack: () => OptionClass;
    rspTypeAny: (anyType: string) => OptionClass;
    withDataSource: (dataSourceName: string) => OptionClass;
    withUrlbase: (urlbase: string) => OptionClass;
    throwSecondaryPromiseError: boolean;
    ThrowSecondaryPromiseErrorSetter: (allowed: boolean) => OptionClass;
    urlbase: string;
    SetUrlbase: (urlbase: string) => OptionClass;
    paramString: () => string;
    constructor();
}
export declare const Option: OptionClass;
export declare const configure: (UrlBase?: string, JWT?: string, PrimaryErrorHandler?: Function) => void;
export declare const setDefaultSUToken: (sutoken: string) => void;
