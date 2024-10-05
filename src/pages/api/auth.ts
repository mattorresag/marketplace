import { NextApiRequest, NextApiResponse } from "next";
import { authenticateUserServerSide } from "../../utils/auth";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const user = await authenticateUserServerSide(req.cookies);

  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
}
