import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import firebase_app from '@/lib/firebaseClient';
import { FirebaseApp } from 'firebase/app';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { transaction_reference } = req.query;

    if (!transaction_reference) {
      res.status(400).json({ error: "No transaction_reference provided."})
    }

    await axios.get(`https://api.chapa.co/v1/transaction/verify/${transaction_reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`
    }})
      .then(async (data) => {
        res.send(data);
        try {
          const tx_ref = data.data.tx_ref;
          const firestore = getFirestore(firebase_app as FirebaseApp);
          const userSubscriptionsRef = doc(firestore, "UserSubscriptions", tx_ref);

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
