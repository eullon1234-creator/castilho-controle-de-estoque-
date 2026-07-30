// Importações para uso local sem node_modules complexos, usando módulos nativos se possível
// Para o Firebase Admin, será necessário instalar o 'firebase-admin' e 'node-fetch'
// O Netlify fará o bundle disso na hora do deploy.
const admin = require('firebase-admin');

// Inicializa o Firebase apenas uma vez
if (!admin.apps.length) {
    try {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    } catch (e) {
        console.warn('Firebase Admin não configurado corretamente:', e.message);
    }
}

exports.handler = async (event, context) => {
    // Mercado Pago Webhooks podem vir como POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const queryParams = event.queryStringParameters;
        const topic = queryParams.topic || queryParams.type;
        const id = queryParams.id || queryParams['data.id'];

        if (topic !== 'payment' || !id) {
            return { statusCode: 200, body: 'Ignorado' }; // Retornar 200 para o MP parar de tentar
        }

        const mpToken = process.env.MP_ACCESS_TOKEN;
        if (!mpToken) {
            return { statusCode: 500, body: 'Configuração do servidor ausente (MP_ACCESS_TOKEN)' };
        }

        // 1. Busca os dados reais do pagamento no Mercado Pago (Segurança contra Webhook Falso)
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
            headers: { 'Authorization': `Bearer ${mpToken}` }
        });
        const paymentData = await response.json();

        // 2. Se o pagamento foi aprovado, libera o sistema
        if (paymentData.status === 'approved') {
            const uid = paymentData.external_reference; // O UID que enviamos na criação
            
            if (!uid) {
                console.error('Pagamento aprovado sem external_reference (UID). ID:', id);
                return { statusCode: 200, body: 'Falta external_reference' };
            }

            // 3. Atualiza o banco de dados via Firebase Admin
            if (admin.apps.length) {
                const db = admin.firestore();
                // Determina o appId (castilho-controle-de-estoque-) - Isso pode precisar ser dinâmico ou fixo
                const appId = 'castilho-controle-de-estoque-'; // De acordo com o front-end
                
                const userRef = db.doc(`artifacts/${appId}/public/data/users/${uid}`);
                
                const addedDays = 30; // Considerando 1 mês
                const now = new Date();
                const newExpiresAt = new Date(now.getTime() + addedDays * 24 * 60 * 60 * 1000).toISOString();

                await userRef.set({
                    aprovado: true,
                    subscriptionActive: true,
                    subscriptionPaidAt: now.toISOString(),
                    subscriptionExpiresAt: newExpiresAt,
                    lastPaymentMethod: 'PIX Mercado Pago (Webhook)'
                }, { merge: true });

                console.log(`Assinatura ativada com sucesso para UID: ${uid}`);
            } else {
                console.error('Firebase Admin não inicializado. Não foi possível ativar a assinatura.');
            }
        }

        return { statusCode: 200, body: 'Webhook Processado' };

    } catch (error) {
        console.error('Erro no Webhook:', error);
        return { statusCode: 500, body: 'Internal Server Error' };
    }
};
