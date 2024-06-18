"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSchema = exports.dataObjectToSchema = void 0;
var dataObjectToSchema = function (schemaToCheck) {
    // Check if schemaToCheck is not an object, return its type directly
    if (typeof schemaToCheck !== "object" || schemaToCheck === null)
        return typeof schemaToCheck;
    // Initialize an empty object to hold the schema
    var schema = {};
    // Iterate over each field in schemaToCheck
    for (var field in schemaToCheck) {
        if (schemaToCheck.hasOwnProperty(field)) {
            // Get the value of the field
            var value = schemaToCheck[field];
            // Recursively determine the type of the field's value
            schema[field] = (0, exports.dataObjectToSchema)(value);
        }
    }
    return schema;
};
exports.dataObjectToSchema = dataObjectToSchema;
var checkSchema = function (dataSchemaExpected, data) {
    // If dataSchema is null, the check passes
    if (dataSchemaExpected == null)
        return true;
    // Determine the type of data
    var typeofData = typeof data;
    // Check if the schema is a single value type and matches the data type
    if (typeofData !== "object" && typeofData === dataSchemaExpected)
        return true;
    // If the data is not an object or is null, it should match the schema type
    if (typeofData !== "object" || data === null)
        return typeofData === dataSchemaExpected;
    // Check if the schema is an object and the data matches the schema structure
    for (var field in dataSchemaExpected) {
        if (dataSchemaExpected.hasOwnProperty(field)) {
            // Recursively check each field in the schema
            var expectedType = dataSchemaExpected[field];
            var actualType = typeof data[field];
            // If the expected type is an object, recursively check the nested schema
            if (typeof expectedType === "object") {
                if (!(0, exports.checkSchema)(expectedType, data[field])) {
                    return false;
                }
            }
            else if (actualType !== expectedType) {
                return false;
            }
        }
    }
    // If all checks pass, return true
    return true;
};
exports.checkSchema = checkSchema;
