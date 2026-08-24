import { API_ENDPOINTS } from '@/config/apiEndpoints';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';

export interface User {
  _id: string;
  name: string;
  email: string;
  phone_number: string;
  role: string;
  status: 'none' | 'pending' | 'approved' | 'rejected' | string;
  vehicleType?: string;
  licenseNumber?: string;
  vehicleNumber?: string;
  isAvailable?: boolean;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isLoading: true,
};

export const fetchCurrentUser = async (token: string): Promise<User | null> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.AUTH.ME}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data: User = await response.json();
      console.log(data)
      return data;
    }
  } catch (error) {
    console.error('Failed to fetch user from /api/auth/me:', error);
  }
  return null;
};

export const loadStoredAuth = createAsyncThunk('auth/loadStoredAuth', async () => {
  const token = await SecureStore.getItemAsync('accessToken');
  let user: User | null = null;

  if (token) {
    // Attempt live server fetch first
    user = await fetchCurrentUser(token);

    // Fallback to local storage if offline
    if (!user) {
      const userJson = await SecureStore.getItemAsync('userData');
      user = userJson ? JSON.parse(userJson) : null;
    } else {
      // Keep SecureStore in sync with fresh user data
      await SecureStore.setItemAsync('userData', JSON.stringify(user));
    }
  }

  return { token, user };
});


export const saveAuthData = createAsyncThunk('auth/saveAuthData',
  async ({ token, user }: { token: string; user: User }) => {
    await SecureStore.setItemAsync('accessToken', token);
    await SecureStore.setItemAsync('userData', JSON.stringify(user));
    return { token, user };
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await SecureStore.deleteItemAsync('accessToken');
  await SecureStore.deleteItemAsync('userData');
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadStoredAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadStoredAuth.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(loadStoredAuth.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(saveAuthData.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
      });
  },
});

export default authSlice.reducer;