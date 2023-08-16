import { Response } from "express";

export const Error = (res: Response, message: unknown) => () => {
  res.status(400).json({ status: false, message });
};

export const Success = (res: Response, message: string, data: Object) => () => {
  res.status(200).json({ status: false, message, data });
};
