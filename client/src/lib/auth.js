import Endpoints from "../constant/apiRoutes";
import { cookies } from "next/headers";

export async function getMe() {
  const endpoints = Endpoints();
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  if (!token) return null;

  try {
    const response = await fetch(endpoints.GETME, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    if (response.ok) return await response.json();
    return null;
  } catch (error) {
    console.error('getMe Error:', error);
    return null;
  }
}