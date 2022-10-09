import type { NextApiRequest, NextApiResponse } from "next";
import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from "discord-interactions";

// interface ResponseData {
//   name: string;
// }

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);

  if (req.method === "POST") {
    const signature = req.headers["x-signature-ed25519"];
    const timestamp = req.headers["x-signature-timestamp"];
    const rawBody = JSON.stringify(req.body);

    const isValidRequest = verifyKey(
      rawBody,
      signature,
      timestamp,
      process.env.PUBLIC_KEY
    );

    if (!isValidRequest) {
      console.error("Invalid Request");
      return res.status(401).send({ error: "Bad request signature " });
    }

    const message = req.body;

    if (message.type === InteractionType.PING) {
      console.log("Handling Ping request");
      res.send({
        type: InteractionResponseType.PONG,
      });
    } else {
      console.error("Unknown Type");
      res.status(400).send({ error: "Unknown Type" });
    }
  }
}
