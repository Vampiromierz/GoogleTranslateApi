import type { NextApiRequest, NextApiResponse } from "next"
import Cors from "cors"
import { runMiddleware } from "../../lib/middleware"

// Initializing the cors middleware
const cors = Cors({
  methods: ["POST"],
  // origin: true,
  origin: "https://google-translateapi.herokuapp.com/",
  credentials: true,
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors)

  // console.log(res)

  const api_key = process.env.GOOGLE_API_KEY

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
