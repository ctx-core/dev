export function _user_id(decoded__token__jwt) {
    return (decoded__token__jwt
        && (decoded__token__jwt.user_id
            || decoded__token__jwt.sub));
}
