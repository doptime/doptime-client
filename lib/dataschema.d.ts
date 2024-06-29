export declare const dataObjectToSchema: (schemaToCheck: any) => any;
interface SchemaError {
    field: string;
    expectedType: string;
    actualData: any;
    actualType: string;
}
export declare const checkSchema: (dataSchemaExpected: any, actualData: any, parentField?: string, parentType?: string) => SchemaError[];
export {};
