export default function Endpoints() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';
  return {
    REGISTER: `${BASE_URL}/api/auth/register`,
    LOGIN: `${BASE_URL}/api/auth/login`,
    LOGOUT: `${BASE_URL}/api/auth/logout`,
    GETME: `${BASE_URL}/api/auth/me`,
    REFRESH_TOKEN : `${BASE_URL}/api/auth/refresh`,
    APPLY_VENDOR : `${BASE_URL}/api/auth/apply-vendor`,
    GET_PRODUCTS : `${BASE_URL}/api/products`,
    VENDOR_PRODUCTS : `${BASE_URL}/api/products/vendor-product`,
    CART_ITEMS : `${BASE_URL}/api/cart`,
    UPDATE_CART_ITEMS : `${BASE_URL}/api/cart/update-quantity`,
    ORDER_CHECKOUT : `${BASE_URL}/api/orders/checkout`,
    CUSTOMER_ORDER : `${BASE_URL}/api/orders/customer/orders`,
    VENDOR_ORDER : `${BASE_URL}/api/orders/vendor/orders`,
    
    CREATE_ORDER : `${BASE_URL}/api/payment/create-order`,
    VERIFY_PAYMENT : `${BASE_URL}/api/payment/verify`,

  };
}