import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const startTime = Date.now();
    const responseTime = Date.now() - startTime;
    const timestamp = new Date().toISOString();
    const uptime = process.uptime();

    const healthData = {
      status: 'healthy',
      timestamp,
      uptime: `${Math.floor(uptime / 60)} minutes`,
      responseTime: `${responseTime}ms`,
      dataSource: {
        type: 'json-files',
        status: 'active'
      },
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024)
      }
    };

    return res.status(200).json(healthData);
  } catch (error) {
    console.error('Health check error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Health check failed',
      timestamp: new Date().toISOString(),
      error: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : 'Internal server error'
    });
  }
}
