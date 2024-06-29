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

interface SchemaError {
    field: string;
    expectedType: string;
    actualData: string;
    actualType: string;
}

export const checkSchema = (dataSchemaExpected: any, actualData: any, parentField: string = '', parentType: string = ''): SchemaError[] => {
    const errors: SchemaError[] = [];

    // If dataSchemaExpected is null, the check passes
    if (dataSchemaExpected == null) return errors;

    // Determine the type of data
    const actualType = typeof actualData;
    if (dataSchemaExpected !== "object") {
        // Check if the schema is a single value type and matches the data type
        if (actualType === dataSchemaExpected) return errors;

        if (parentType == "object" && (actualData == undefined || actualData == null || actualType == undefined)) return errors;

        if (actualType !== dataSchemaExpected)
            errors.push({ field: parentField || 'root', expectedType: dataSchemaExpected, actualData, actualType });

        return errors;
    }

    // Check if the schema is an object and the data matches the schema structure
    for (const field in dataSchemaExpected) {
        if (dataSchemaExpected.hasOwnProperty(field)) {
            // Recursively check each field in the schema
            const expectedType = dataSchemaExpected[field];
            const actualType = typeof actualData[field];
            const currentField = parentField ? `${parentField}.${field}` : field;

            // If the expected type is an object, recursively check the nested schema
            if (typeof expectedType === "object" && expectedType !== null) {
                errors.push(...checkSchema(expectedType, actualData[field], currentField, actualType));
            } else if (actualType !== expectedType) {
                errors.push({ field: currentField, expectedType: expectedType, actualData, actualType: actualType });
            }
        }
    }

    // If all checks pass, return the errors array (empty if no errors)
    return errors;
};
