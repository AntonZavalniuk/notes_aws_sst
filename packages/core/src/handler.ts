export default function handler(lambda: (arg0: any, arg1: any) => any) {
  return async function (event: any, context: any) {
    let body;
    let statusCode;

    try {
      body = await lambda(event, context);
      statusCode = 200;
    } catch (e: any) {
      console.error(e);
      body = { error: e.message };
      statusCode = 500;
    }

    return {
      statusCode,
      body: JSON.stringify(body),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    };
  };
}
