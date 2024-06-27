export default function concatKey<T>(keyType: new (key: string, dataSchemaInstance?: any) => T, key: string, dataSchema: any, ...fields: any[]): T {
    const newKey = [key, ...fields].filter((v) => !!v).join(":");
    const newInstance = new keyType(newKey);
    (newInstance as any).dataSchema = dataSchema;
    return newInstance;
}