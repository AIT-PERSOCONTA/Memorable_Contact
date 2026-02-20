import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function GET() {
    return NextResponse.json({ status: 'active', message: 'Stripe API route is reachable' });
}

export async function POST(req: Request) {
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
        console.error('STRIPE_SECRET_KEY is missing from environment variables');
        return NextResponse.json({ error: 'Stripe API key is not configured' }, { status: 500 });
    }

    const stripe = new Stripe(stripeKey, {
        apiVersion: '2026-01-28.clover',
    });

    try {
        const { amount, lang } = await req.json();

        if (!amount || isNaN(amount)) {
            return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
        }

        // Hostname for redirects
        const host = req.headers.get('origin') || 'http://localhost:3000';

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: 'Memorable Contact Presales',
                        },
                        unit_amount: Math.round(amount * 100), // Convert to cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${host}/presales-success`,
            cancel_url: `${host}/presales-cancel`,
            metadata: {
                product: 'memorable_contact',
                type: 'presales',
                lang: lang || 'en'
            },
            payment_intent_data: {
                metadata: {
                    product: 'memorable_contact',
                    type: 'presales'
                }
            }
        });

        return NextResponse.json({ url: session.url });
    } catch (err: any) {
        console.error('Stripe Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
