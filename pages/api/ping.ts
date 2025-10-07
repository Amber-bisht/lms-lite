import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Simple health check
    const timestamp = new Date().toISOString();
    const uptime = process.uptime();
    
    return res.status(200).json({
      status: 'ok',
      message: 'LMS Lite is running',
      timestamp,
      uptime: `${Math.floor(uptime / 60)} minutes`,
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0'
    });
  } catch (error) {
    console.error('Ping endpoint error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
}
