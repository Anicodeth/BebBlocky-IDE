import firebase_app from '@/lib/firebaseClient'
import { type FirebaseApp } from 'firebase/app'
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { txref } = req.query
    if (txref) {
        const db = getFirestore(firebase_app as FirebaseApp)
        const paymentRef = doc(db, 'payments', txref as string)
        const payment = await getDoc(paymentRef)
        if (!payment.exists()) {
            return res.redirect('/')
        }
        const userRef = doc(db, 'users', payment.data().id)

        // Verify the tip
        await fetch(`https://api.chapa.co/v1/transaction/verify/${txref as string}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY as string}`,
            },
        }).then(async (response) => {
            if (response.status !== 200) {
                return res.redirect('/')
            }

            await updateDoc(paymentRef, { verified: true }).then(async () => {
                await updateDoc(userRef, { credit: "5" })
            })
        })
    }
    return res.redirect('/')
}
