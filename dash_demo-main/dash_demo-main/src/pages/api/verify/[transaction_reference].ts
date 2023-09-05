import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import firebase_app from '@/lib/firebaseClient';
import { FirebaseApp } from 'firebase/app';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.query as { userId: string };

    if (!userId || userId === undefined) {
      res.status(400).json({ error: "No user id provided."})
    }

    const db = getFirestore(firebase_app as FirebaseApp);
    const userSubscriptionsRef = doc(db, "UserSubscriptions", userId);
    const docSnap = await getDoc(userSubscriptionsRef);

    if (!docSnap.exists()) {
      res.status(400).json({ error: "No user subscription found."})
    }

    const userSubscriptionData = docSnap.data();

    await axios.get(`https://api.chapa.co/v1/transaction/verify/${userSubscriptionData?.txRef}`, {
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`
    }})
      .then(async (data) => {
        try {
          const newData = {
            verified: true,
          };
          await updateDoc(userSubscriptionsRef, newData);
          res.status(200).json({ message: "Success." })
        }
        catch (error) {
          res.status(500).json({ error: "Internal Server Error." })
        }
      })
      .catch((error: Error) => {
          res.json(error);
      })
  }
