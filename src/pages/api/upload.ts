import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const xmlData = req.body;
    if (!xmlData) {
      return res.status(400).json({ error: "No file provided" });
    }
    axios
      .post(
        `${process.env.NEXT_PUBLIC_AUTH_API_URL}/purchase_history/import_xml/`,
        xmlData
      )
      .then((response) => {
        console.log(response);
        res.status(200).json({ message: "XML received!" });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: "XML not received!" });
      });
  }
}
