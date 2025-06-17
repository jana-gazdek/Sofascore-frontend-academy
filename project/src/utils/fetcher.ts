export const fetcher = async <T = any>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) {
    const error: any = new Error('An error occurred while fetching the data.');
    try {
      error.info = await res.json();
    } catch (e) {
      error.info = { message: 'Could not parse error response.' };
    }
    error.status = res.status;
    throw error;
  }
  return res.json();
};