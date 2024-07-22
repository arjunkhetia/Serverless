export async function handler(event) {
    const token = event.headers.Authorization;
    const methodArn = event.methodArn;
    switch (token) {
        case 'allow':
            return generatePolicy('user', 'Allow', methodArn);
    
        default:
            return generatePolicy('user', 'Deny', methodArn);
    }
}

function generatePolicy(principalId, effect, resource) {
    const authResponse = {
        principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [{
                Action: 'execute-api:Invoke',
                Effect: effect,
                Resource: resource,
            }],
        },
    };
    return authResponse;
}