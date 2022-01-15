import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import { sleep } from "./misc";

export default async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
) {
  if (process.env.NODE_ENV === "development") {
    await sleep(1000);
  }

  const response = await fetch(`${path}`, {
    ...options,
    credentials: "include",
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
  });

  const jsonResponse = await response.json();

  if (jsonResponse.error) {
    throw response;
  } else {
    return jsonResponse as T;
  }
}

export const secret = "kWLFeLZadeckW0TnJRwj";

export const authenticated =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    return verify(req.cookies.auth!, secret, async function (err, decoded) {
      if (!err && decoded) {
        const data = await fn(req, res);
        return data;
      }

      return res.status(403).json({ message: "Unauthorized" });
    });
  };

