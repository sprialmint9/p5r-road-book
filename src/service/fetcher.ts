// Define fetchWrapper function
export async function fetcher<T>(
  url: string,
  options: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
): Promise<T> {
  // Part 1: Add headers and attach auth token
  const headers = new Headers(options.headers || {});

  // Part 2: Fetch sends the request
  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Part 3: Handle the received response
  if (response.ok) {
    // If the status code is 200, convert data structure according to Content-Type
    // const contentType = response.headers.get('Content-Type');
    // if (contentType && contentType.includes('application/json')) {
    return await response.json();
    // } else if (contentType && contentType.includes('text/plain')) {
    //   return await response.text();
    // }
    // return response.json();
  } else {
    // Handle other non-200 status codes as needed
    throw new Error(`Request failed with status ${response.status}`);
  }
}
