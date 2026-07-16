import Endpoints from '../constant/apiRoutes';
import { cookies } from 'next/headers';

export async function getMe() {
  const endpoints = Endpoints();
  
  try {
    const cookieStore = await cookies();

    let token = cookieStore.get('accessToken')?.value; 
    const currentRefreshToken = cookieStore.get('refreshToken')?.value;

    if (!currentRefreshToken) {
      console.log("No refresh token found. User is logged out.");
      return null;
    }

    if (!token) {
      console.log('Access token missing or expired. Fetching fresh tokens...');
      
      try {
        const refreshResponse = await fetch(`${endpoints.REFRESH_TOKEN}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken: currentRefreshToken }),
        });

        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          
          token = refreshData.accessToken;
          const newRefreshToken = refreshData.refreshToken;

          if (token && newRefreshToken) {
            cookieStore.set('accessToken', token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
              maxAge: 15 * 60,
              path: '/',
            });

            cookieStore.set('refreshToken', newRefreshToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
              maxAge: 7 * 24 * 60 * 60,
              path: '/',
            });
            console.log('Successfully synchronized new tokens to Next.js cookie jar.');
          }
        } else {
          cookieStore.delete('accessToken');
          cookieStore.delete('refreshToken');
          return null;
        }
      } catch (refreshError) {
        console.error('Token Refresh Error:', refreshError);
        return null;
      }
    }

    if (token) {
      console.log('Fetching user profile...');
      const response = await fetch(`${endpoints.GETME}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('User authenticated successfully!');
        return userData; 
      }
    }

    return null;

  } catch (error) {
    console.error('getMe Global Error:', error);
    return null;
  }
}