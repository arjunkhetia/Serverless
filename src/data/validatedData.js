import { commonMiddleware } from "../middleware/commonMiddleware.js";

const lambdaHandler = async (event) => {
    return {
        headers: {'Access-Control-Allow-Origin': '*'},
        statusCode: 200,
        body: JSON.stringify({message: '🔷 Hello from Validated ' + process.env.ENVIRONMENT + '!'}),
    };
}

export const handler = commonMiddleware(lambdaHandler);