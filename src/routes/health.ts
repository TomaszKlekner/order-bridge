import { Router, type Request, type Response } from "express";

const healthRouter = Router();

healthRouter.get("/", (_req: Request, res: Response): void => {
  res.status(200).json({ ok: true });
});

export { healthRouter };
