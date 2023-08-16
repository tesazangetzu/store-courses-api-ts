import { Response } from "express";

export const HandlerError = (res: Response, error: any, message: string) => {
  console.log(error);
  return res.status(400).json({ status: false, message });
};

export const HandlerSuccess = (
  res: Response,
  message: string,
  data: Object = []
) => {
  return res.status(200).json({ status: true, message, data });
};
