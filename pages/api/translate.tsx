import type { NextApiRequest, NextApiResponse } from "next"

//
// added api middleware to hide Google Api Key on PROD
//
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const api_key = process.env.GOOGLE_API_KEY

  if (req.method !== "POST") {
    return res
      .status(400)
      .json({ success: false, message: "Only POST requests are allowed." })
  }

  const data = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${api_key}`,
    {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: req.body,
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }
  )

  const json = await data.json()

  return res.json(json)
}
