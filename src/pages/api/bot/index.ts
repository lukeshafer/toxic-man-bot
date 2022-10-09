import type { NextApiRequest, NextApiResponse } from "next";
import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from "discord-interactions";

interface ResponseData {
  name: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log(req.body);
  res.status(200).json({ name: "John Doe" });
}
