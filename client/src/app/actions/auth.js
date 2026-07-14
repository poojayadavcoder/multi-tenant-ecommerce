"use server";

import { cookies } from 'next/headers';

export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    return { success: true };
  } catch (error) {
    console.error("Global Logout Error:", error);
    return { success: false };
  }
}