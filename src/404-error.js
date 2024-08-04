export async function handler(event) {
    return {
        headers: {'Access-Control-Allow-Origin': '*'},
        statusCode: 404,
        body: JSON.stringify({message: 'Serverless route not found.'}),
    };
}