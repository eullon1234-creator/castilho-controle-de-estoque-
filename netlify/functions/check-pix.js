exports.handler = async (event, context) => {
    try {
        const id = event.queryStringParameters.id;
        if (!id) return { statusCode: 400, body: 'Missing id' };

        const mpToken = process.env.MP_ACCESS_TOKEN;
        if (!mpToken) return { statusCode: 500, body: 'Server missing config' };

        const response = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
            headers: { 'Authorization': `Bearer ${mpToken}` }
        });
        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify({ status: data.status })
        };
    } catch (e) {
        return { statusCode: 500, body: 'Error' };
    }
};
