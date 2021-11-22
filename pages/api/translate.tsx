// import Cors from 'cors'
import type { NextApiRequest, NextApiResponse } from "next"

// // Initializing the cors middleware
// const cors = Cors({
//   methods: ['POST', 'GET', 'HEAD'],
// })

// // Helper method to wait for a middleware to execute before continuing
// // And to throw an error when an error happens in a middleware
// function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         return reject(result)
//       }

//       return resolve(result)
//     })
//   })
// }

// async function handler(req, res) {
//   // Run the middleware
//   await runMiddleware(req, res, cors)

//   // Rest of the API logic
//   res.json({ message: 'Hello Everyone!' })
// }

// export default handler

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const api_key = process.env.GOOGLE_API_KEY

  if (req.method !== 'POST') {
    return res
      .status(400)
      .json({ success: false, message: 'Only POST requests are allowed.' });
  }

  const data = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${api_key}`,
    {
      method: req.method, // *GET, POST, PUT, DELETE, etc.
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
