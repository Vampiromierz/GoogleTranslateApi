import type { NextApiRequest, NextApiResponse } from "next"

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export async function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: any
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        console.log('result', result)
        return reject(result)
      }

      return resolve(result)
    })
  })
}
