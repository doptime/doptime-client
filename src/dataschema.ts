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
    actualType: string;
}


export const checkSchema = (dataSchemaExpected: any, data: any, parentField: string = ''): SchemaError[] => {
    const errors: SchemaError[] = [];

    // If dataSchemaExpected is null, the check passes
    if (dataSchemaExpected == null) return errors;

    // Determine the type of data
    const typeofData = typeof data;

    // Check if the schema is a single value type and matches the data type
    if (typeofData !== "object" && typeofData === dataSchemaExpected) return errors;

    // If the data is not an object or is null, it should match the schema type
    if (typeofData !== "object" || data === null) {
        if (typeofData !== dataSchemaExpected) {
            errors.push({
                field: parentField || 'root',
                expectedType: dataSchemaExpected,
                actualType: typeofData
            });
        }
        return errors;
    }

    // Check if the schema is an object and the data matches the schema structure
    for (const field in dataSchemaExpected) {
        if (dataSchemaExpected.hasOwnProperty(field)) {
            // Recursively check each field in the schema
            const expectedType = dataSchemaExpected[field];
            const actualData = data[field];
            const currentField = parentField ? `${parentField}.${field}` : field;

            // If the expected type is an object, recursively check the nested schema
            if (typeof expectedType === "object" && expectedType !== null) {
                errors.push(...checkSchema(expectedType, actualData, currentField));
            } else {
                // Check if the actual data is an array and if the expected type is an array
                if (Array.isArray(expectedType) && Array.isArray(actualData)) {
                    if (actualData.length === 0) {
                        // Allow empty arrays to pass the check
                        continue;
                    } else {
                        // Check each element in the array against the expected type
                        for (const item of actualData) {
                            const itemType = typeof item;
                            const expectedItemType = typeof expectedType[0];
                            if (itemType !== expectedItemType) {
                                errors.push({
                                    field: currentField,
                                    expectedType: `Array of ${expectedItemType}`,
                                    actualType: `Array of ${itemType}`
                                });
                                break; // Stop checking further items if one is invalid
                            }
                        }
                    }
                } else if (typeof actualData !== expectedType) {
                    errors.push({
                        field: currentField,
                        expectedType: expectedType,
                        actualType: typeof actualData
                    });
                }
            }
        }
    }

    // If all checks pass, return the errors array (empty if no errors)
    return errors;
};