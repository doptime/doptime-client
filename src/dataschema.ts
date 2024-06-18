export const dataObjectToSchema = (schemaToCheck: any): any => {
    // Check if schemaToCheck is not an object, return its type directly
    if (typeof schemaToCheck !== "object" || schemaToCheck === null) return typeof schemaToCheck;

    // Initialize an empty object to hold the schema
    const schema: { [key: string]: any } = {};

    // Iterate over each field in schemaToCheck
    for (const field in schemaToCheck) {
        if (schemaToCheck.hasOwnProperty(field)) {
            // Get the value of the field
            const value = schemaToCheck[field];

            // Recursively determine the type of the field's value
            schema[field] = dataObjectToSchema(value);
        }
    }
    return schema;
};

export const checkSchema = (dataSchemaExpected: any, data: any): boolean => {
    // If dataSchema is null, the check passes
    if (dataSchemaExpected == null) return true;

    // Determine the type of data
    const typeofData = typeof data;

    // Check if the schema is a single value type and matches the data type
    if (typeofData !== "object" && typeofData === dataSchemaExpected) return true;

    // If the data is not an object or is null, it should match the schema type
    if (typeofData !== "object" || data === null) return typeofData === dataSchemaExpected;

    // Check if the schema is an object and the data matches the schema structure
    for (const field in dataSchemaExpected) {
        if (dataSchemaExpected.hasOwnProperty(field)) {
            // Recursively check each field in the schema
            const expectedType = dataSchemaExpected[field];
            const actualType = typeof data[field];

            // If the expected type is an object, recursively check the nested schema
            if (typeof expectedType === "object") {
                if (!checkSchema(expectedType, data[field])) {
                    return false;
                }
            } else if (actualType !== expectedType) {
                return false;
            }
        }
    }

    // If all checks pass, return true
    return true;
};