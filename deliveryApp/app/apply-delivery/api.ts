import { API_ENDPOINTS } from "@/config/apiEndpoints";
import * as SecureStore from "expo-secure-store";

export interface ApplyDeliveryPayload {
  vehicle_type: string;
  vehicle_number: string;
  license_number: string;
}

export interface ApiResponse {
  message: string;
  [key: string]: any;
}

export const applyDeliveryPartner = async (
  payload: ApplyDeliveryPayload
): Promise<ApiResponse> => {
  const token = await SecureStore.getItemAsync("accessToken");

  const response = await fetch(`${API_ENDPOINTS.DELIVERY.APPLY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data: ApiResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Application submission failed");
  }

  return data;
};