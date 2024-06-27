export default function concatKey<T>(keyType: new (key: string, dataSchemaInstance?: any) => T, key: string, dataSchema: any, ...fields: any[]): T;
