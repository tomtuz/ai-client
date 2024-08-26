import axios from 'axios';

interface ApiResponse<T> {
  data: T;
  status: number;
}

export async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  try {
    const response = await axios.get<T>(url);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export function parseJsonResponse<T>(response: string): T {
  try {
    return JSON.parse(response) as T;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    throw error;
  }
}
