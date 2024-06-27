export declare const dataObjectToSchema: (schemaToCheck: any) => any;
interface SchemaError {
    field: string;
    expectedType: string;
    actualType: string;
}
export declare const checkSchema: (dataSchemaExpected: any, data: any, parentField?: string) => SchemaError[];
export {};
