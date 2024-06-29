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
var checkSchema = function (dataSchemaExpected, actualData, parentField, parentType) {
    if (parentField === void 0) { parentField = ''; }
    if (parentType === void 0) { parentType = ''; }
    var errors = [];
    // If dataSchemaExpected is null, the check passes
    if (dataSchemaExpected == null)
        return errors;
    // Determine the type of data
    var actualType = typeof actualData;
    if (dataSchemaExpected !== "object") {
        // Check if the schema is a single value type and matches the data type
        if (actualType === dataSchemaExpected)
            return errors;
        if (parentType == "object" && (actualData == undefined || actualData == null || actualType == undefined))
            return errors;
        if (actualType !== dataSchemaExpected)
            errors.push({ field: parentField || 'root', expectedType: dataSchemaExpected, actualData: actualData, actualType: actualType });
        return errors;
    }
    // Check if the schema is an object and the data matches the schema structure
    for (var field in dataSchemaExpected) {
        if (dataSchemaExpected.hasOwnProperty(field)) {
            // Recursively check each field in the schema
            var expectedType = dataSchemaExpected[field];
            var actualType_1 = typeof actualData[field];
            var currentField = parentField ? "".concat(parentField, ".").concat(field) : field;
            // If the expected type is an object, recursively check the nested schema
            if (typeof expectedType === "object" && expectedType !== null) {
                errors.push.apply(errors, (0, exports.checkSchema)(expectedType, actualData[field], currentField, actualType_1));
            }
            else if (actualType_1 !== expectedType) {
                errors.push({ field: currentField, expectedType: expectedType, actualData: actualData, actualType: actualType_1 });
            }
        }
    }
    // If all checks pass, return the errors array (empty if no errors)
    return errors;
};
exports.checkSchema = checkSchema;
