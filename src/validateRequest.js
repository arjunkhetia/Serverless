import middy from '@middy/core';
import httpHeaderNormalizer from '@middy/http-header-normalizer'
import httpJsonBodyParser from '@middy/http-json-body-parser';
import validator from '@middy/validator';
import { transpileSchema } from '@middy/validator/transpile';
import httpErrorHandler from '@middy/http-error-handler';

const schema = {
    type: 'object',
    properties: {
      body: {
        type: 'object',
        properties: {
          username: { type: 'string' }
        },
        required: ['username']
      }
    },
    required: ['body']
};

const lambdaHandler = async (event) => {
    return {
        headers: {'Access-Control-Allow-Origin': '*'},
        statusCode: 200,
        body: JSON.stringify({
            message: '✅ Validation successful',
        }),
    };
}

export const handler = middy(lambdaHandler)
    .use(httpHeaderNormalizer())
    .use(httpJsonBodyParser())
    .use(validator({ 
        eventSchema: transpileSchema(schema) 
    }))
    .use(httpErrorHandler())
    .use({
        onError: (request) => {
            const error = request.error;
            if (error.expose && error.statusCode === 400) {
                request.response = {
                    statusCode: 400,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        message: error.message,
                        validationErrors: error.cause,
                    }),
                };
            }
        },
    });