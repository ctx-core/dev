import { GraphQLError } from 'graphql';
import { andand } from '@ctx-core/function';
import { assign } from '@ctx-core/object';
import { reduce } from '@ctx-core/array';

class ValidationError extends GraphQLError {
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
    const errors = andand(payload, 'errors') || [];
    const validation_errors = reduce(errors, (memo, error) => assign(memo, andand(error, 'extensions', 'exception', 'state')), {});
    return validation_errors;
}
function gql(a1) {
    const gql_str = a1[0];
    return gql_str;
}

export { ValidationError, _validation_errors__graphql, gql };
