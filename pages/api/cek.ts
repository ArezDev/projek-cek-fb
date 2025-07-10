import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const { user } = req.body;
      const response = await axios.get(`https://graph.facebook.com/${user}/picture?type=normal`);
      return res.status(200).json({ status: true, message: 'Akun hidup!', data: response.statusText });
    }
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Gagal mengakses database' });
  }
}