"use server";

import Endpoints from "../../../constant/apiRoutes";
import { request } from "../../../controller/RequestController.server";

export async function Products() {
  const endpoint = Endpoints();
  const result = await request(endpoint.GET_PRODUCTS, "GET");

  if (!result.success) {
    return { success: false, error: result.error || "Product is not getting." };
  }

  return { success: true, product: result.data?.product || result.data };
}

export async function ProductsById(id) {
  const endpoint = Endpoints();
  const result = await request(`${endpoint.GET_PRODUCTS}/${id}`, "GET");

  if (!result.success) {
    return { success: false, error: result.error || "Product is not getting." };
  }

  return { success: true, product: result.data?.product || result.data };
}

export async function AddToCart(productId, quantity) {
  const endpoint = Endpoints();
  const result = await request(endpoint.CART_ITEMS, "POST", {
    body: { productId, quantity },
  });

  if (!result.success) {
    return { success: false, error: result.error || "Product is not updated." };
  }

  return { success: true, product: result.data?.product || result.data };
}

export async function GetCart() {
  const endpoint = Endpoints();
  const result = await request(endpoint.CART_ITEMS, "GET");

  if (!result.success) {
    return { success: false, error: result.error || "Product is not got." };
  }

  return { success: true, product: result.data?.product || result.data };
}

export async function UpdateCart(productId, quantity) {
  const endpoint = Endpoints();
  const result = await request(`${endpoint.UPDATE_CART_ITEMS}/${productId}`, "PUT", {
    body: { productId, quantity },
  });

  if (!result.success) {
    return { success: false, error: result.error || "Failed to update quantity." };
  }

  return { success: true };
}

export async function DeleteCart(productId) {
  const endpoint = Endpoints();
  const result = await request(`${endpoint.CART_ITEMS}/${productId}`, "DELETE");

  if (!result.success) {
    return { success: false, error: result.error || "Failed to remove item." };
  }

  return { success: true };
}

export async function CheckoutOrder(shippingAddress) {
  const endpoint = Endpoints();
  const result = await request(endpoint.ORDER_CHECKOUT, "POST", {
    body: { shippingAddress },
  });

  if (!result.success) {
    return { success: false, error: result.error || "Failed to checkout order." };
  }

  return { success: true };
}

export async function GetOrderForCustomer() {
  const endpoint = Endpoints();
  const result = await request(endpoint.CUSTOMER_ORDER, "GET");

  if (!result.success) {
    return { success: false, error: result.error || "Product is not got." };
  }

  return { success: true, product: result.data?.product || result.data };
}

export async function GetOrderForVendor() {
  const endpoint = Endpoints();
  const result = await request(endpoint.VENDOR_ORDER, "GET");

  if (!result.success) {
    return { success: false, error: result.error || "Product is not got." };
  }

  return { success: true, product: result.data?.product || result.data };
}

export async function CreateOrder() {
  const endpoint = Endpoints();

  const result = await request(endpoint.CREATE_ORDER, "POST");

  if (!result.success) {
    return { success: false, error: result.error || "Failed to initiate payment." };
  }

  return { success: true, order: result.data?.order, keyId: result.data?.keyId };
}

export async function VerifyOrder(paymentData) {
  const endpoint = Endpoints();
  const payload = paymentData?.orderPayload || paymentData;

  const result = await request(endpoint.VERIFY_PAYMENT, "POST", {
    body: payload,
  });

  if (!result.success) {
    return { success: false, error: result.error || "Order verification failed." };
  }

  return { success: true, ...result.data };
}