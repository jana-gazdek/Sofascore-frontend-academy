export async function getData<T = any>(endpoint: string): Promise<T> {
  const res = await fetch(endpoint);

  if (!res.ok) {
    let errorDetail = `Failed to fetch data from ${endpoint}. Status: ${res.status}`;
    try {
      const errorBody = await res.json();
      errorDetail += ` Message: ${JSON.stringify(errorBody)}`;
    } catch (e) {
      errorDetail += ` (Could not parse error response body)`;
    }
    throw new Error(errorDetail);
  }

  return res.json();
}