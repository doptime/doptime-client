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
var checkSchema = function (dataSchemaExpected, data, parentField) {
    if (parentField === void 0) { parentField = ''; }
    var errors = [];
    // If dataSchemaExpected is null, the check passes
    if (dataSchemaExpected == null)
        return errors;
    // Determine the type of data
    var typeofData = typeof data;
    // Check if the schema is a single value type and matches the data type
    if (typeofData !== "object" && typeofData === dataSchemaExpected)
        return errors;
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
    for (var field in dataSchemaExpected) {
        if (dataSchemaExpected.hasOwnProperty(field)) {
            // Recursively check each field in the schema
            var expectedType = dataSchemaExpected[field];
            var actualType = typeof data[field];
            var currentField = parentField ? "".concat(parentField, ".").concat(field) : field;
            // If the expected type is an object, recursively check the nested schema
            if (typeof expectedType === "object" && expectedType !== null) {
                errors.push.apply(errors, (0, exports.checkSchema)(expectedType, data[field], currentField));
            }
            else if (actualType !== expectedType) {
                errors.push({
                    field: currentField,
                    expectedType: expectedType,
                    actualType: actualType
                });
            }
        }
    }
    // If all checks pass, return the errors array (empty if no errors)
    return errors;
};
exports.checkSchema = checkSchema;
