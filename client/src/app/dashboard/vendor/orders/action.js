"use server";

import { request } from "../../../../controller/RequestController.server";
import Endpoints from "../../../../constant/apiRoutes";


export async function VendorOrders() {
  const endpoint = Endpoints();
  
  const result = await request(endpoint.VENDOR_ORDER, "GET");

  if (!result.success) {
    return { success: false, error: result.error || "vendor order is not found." };
  }

  return { 
    success: true, 
    products: result.data?.products || result.data 
  };
}