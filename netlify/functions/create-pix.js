exports.handler = async (event, context) => {
    // Apenas aceita POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const body = JSON.parse(event.body);
        const { transaction_amount, description, payer, external_reference } = body;

        const mpToken = process.env.MP_ACCESS_TOKEN;
        if (!mpToken) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Configuração do servidor ausente (MP_ACCESS_TOKEN)' })
            };
        }

        const idempotencyKey = event.headers['x-idempotency-key'] || Date.now().toString();

        const payload = {
            transaction_amount,
            description,
            payment_method_id: 'pix',
            payer,
            external_reference // AQUI PASSAMOS O UID DO USUÁRIO
        };

        const response = await fetch('https://api.mercadopago.com/v1/payments', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${mpToken}`,
                'Content-Type': 'application/json',
                'X-Idempotency-Key': idempotencyKey
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: 'Erro no Mercado Pago', details: data })
            };
        }

        // Retornar apenas o que o frontend precisa de fato (segurança)
        return {
            statusCode: 200,
            body: JSON.stringify({
                id: data.id,
                status: data.status,
                qr_code: data.point_of_interaction?.transaction_data?.qr_code,
                qr_code_base64: data.point_of_interaction?.transaction_data?.qr_code_base64
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error', message: error.message })
        };
    }
};
