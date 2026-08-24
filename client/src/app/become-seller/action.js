"use server";

import Endpoints from "../../constant/apiRoutes.js";
import { request } from "../../controller/RequestController.server.js";

export async function applyVendor(values) {
  const endpoints = Endpoints();
  const result = await request(endpoints.APPLY_VENDOR, "POST", {
    body: values,
  });

  if (!result.success) {
    return { success: false, error: result.error || "Shop detail missing." };
  }

  return { success: true };
}