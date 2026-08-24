// src/config/apiEndpoints.ts

export const API_BASE_URL = "http://192.168.1.70:5000";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    ME: `${API_BASE_URL}/api/auth/me`
  },
  DELIVERY: {
    APPLY: `${API_BASE_URL}/api/deliveries/apply-delivery`,
  },
} as const;