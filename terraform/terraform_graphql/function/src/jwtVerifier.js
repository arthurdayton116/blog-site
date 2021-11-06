const OktaJwtVerifier = require('@okta/jwt-verifier')

// validates that used calling API is authorized to do so
const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: process.env.OKTA_ISSUER,
    clientId: process.env.OKTA_CLIENT_ID
})

module.exports = async (request) => {
const bad_request = null
    const { authorization } = request.headers;
    if (!authorization) {
        console.log('null authorization')
        return bad_request
    }

    const [authType, token] = authorization.trim().split(' ');

    try {
        const { claims } = await oktaJwtVerifier.verifyAccessToken(token, process.env.OKTA_AUDIENCE)
        console.log('claims',claims)
        if (!claims) {
            console.log('does not include claims')
            return bad_request;
        }
        if (!claims.scp.includes('comment_approve')) {
            console.log('does not include comment_approve scope')
            return bad_request;
        }

        return claims;
    }
    catch (err) {
        console.log(err);
        return bad_request;
    }
}
