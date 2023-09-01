import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.post('https://api.chapa.co/v1/transaction/initialize', req.body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`
      }
    });

    res.status(200).json({ response: response.data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ response: 'Internal Server Error.' });
  }
}

