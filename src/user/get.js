export async function handler(event) {
    return {
        headers: {'Access-Control-Allow-Origin': '*'},
        statusCode: 200,
        body: JSON.stringify({message: '😃 Hello from User ' + process.env.ENVIRONMENT + '!'}),
    };
}