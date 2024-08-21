import { Request, Response } from 'express';
import client from 'prom-client';

export async function init(app: any) {
    const collectDefaultMetrics = client.collectDefaultMetrics;
    collectDefaultMetrics({
        register: client.register
    })
    app.get('/metrics', async (req: Request, res: Response) => {
        res.setHeader('Content-Type', client.register.contentType);
        const metrics = await client.register.metrics();
        res.send(metrics);
    })
}
