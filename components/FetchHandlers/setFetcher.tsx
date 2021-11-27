type Props = {
  url: string
  body?: object
  method?: string
}

export default async function setFetcher({
  url = "",
  body = {},
  method = "POST",
}: Props) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    body: JSON.stringify(body), // body data type must match "Content-Type" header
  })

  return response.json()
}
