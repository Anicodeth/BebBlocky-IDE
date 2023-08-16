import type { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid/async';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import firebase_app from '@/lib/firebaseClient';
import type { FirebaseApp } from 'firebase/app';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { amount, email, name, id } = req.body;

    try {
        // Generate a unique reference for this transaction
        const ref = `TX-${(await nanoid()).toUpperCase()}`;
        const paymentData = {
            first_name: name.split(' ')[0],
            last_name: name.split(' ')[1],
            email: email,
            amount: amount,
            currency: 'ETB',
            tx_ref: ref,
            return_url: `${`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/verify/` || 'http://localhost:3000/api/verify/'}${ref}`,
            // return_url: `http://localhost:3000/`,
        }

        // Initialize the transaction and redirect to payment page
        const response = await fetch('https://api.chapa.co/v1/transaction/initialize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
            },
            body: JSON.stringify(paymentData),
        });
        // Handle the payment response and return the appropriate response to the client
        if (response.status !== 200) {
            return res.status(500).json({ error: 'Something went wrong' });
        }
        const db = getFirestore(firebase_app as FirebaseApp);
        await setDoc(doc(db, 'payments', ref), {
            id: id,
            amount: amount,
            ref: ref,
            email: email,
            name: name,
            verified: false,
        });
        res.status(200).json({ response: await response.json() });
    } catch (error) {
        // Handle any errors that occur during the payment process
        res.status(500).json({ error: error });
    }
}