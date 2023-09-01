import type { NextApiRequest, NextApiResponse } from 'next';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, password } = req.body;
  const email = "";
  const auth = getAuth()

  try {
    await createUserWithEmailAndPassword(auth, email, password).then(async ({ user }) => {
        await updateProfile(user, { displayName: name });
    });

    res.status(200).json({ message: "User registration successful." });
  } catch (e) {
    console.error("Error adding document: ", e);
    res.status(500).json({ error: e });
  }
}
