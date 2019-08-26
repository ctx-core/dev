'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var graphql = require('graphql');
var _function = require('@ctx-core/function');
var object = require('@ctx-core/object');
var array = require('@ctx-core/array');

class ValidationError extends graphql.GraphQLError {
    constructor(errors) {
        super('The request is invalid.');
        this.state = errors.reduce((result, error) => {
            if (Object.prototype.hasOwnProperty.call(result, error.key)) {
                result[error.key].push(error.message);
            }
            else {
                result[error.key] = [error.message];
            }
            return result;
        }, {});
    }
}
function _validation_errors__graphql(payload) {
    const errors = _function.andand(payload, 'errors') || [];
    const validation_errors = array.reduce(errors, (memo, error) => object.assign(memo, _function.andand(error, 'extensions', 'exception', 'state')), {});
    return validation_errors;
}
function gql(a1) {
    const gql_str = a1[0];
    return gql_str;
}

exports.ValidationError = ValidationError;
exports._validation_errors__graphql = _validation_errors__graphql;
exports.gql = gql;
