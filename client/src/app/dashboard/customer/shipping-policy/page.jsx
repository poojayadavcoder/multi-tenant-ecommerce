import React from 'react';

const ShippingPolicy = () => {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-sm rounded-lg p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Shipping Policy
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          Last Updated: {lastUpdated}
        </p>

        <div className="space-y-8 text-gray-600 leading-relaxed">

          {/* 1. Introduction */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              1. Introduction
            </h2>

            <p>
              At Zoka Market, we aim to provide a reliable and convenient
              delivery experience. This Shipping Policy explains how orders
              placed through our website are processed and delivered.
            </p>
          </section>

          {/* 2. Order Processing */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              2. Order Processing
            </h2>

            <p>
              Orders are processed after successful order confirmation and
              payment verification, where applicable.
            </p>

            <p className="mt-4">
              Processing time may vary depending on product availability,
              order details, and other operational factors. Orders may take
              additional time during weekends, public holidays, or periods of
              high order volume.
            </p>
          </section>

          {/* 3. Delivery Address */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              3. Delivery Address
            </h2>

            <p>
              Customers are responsible for providing a complete and accurate
              delivery address, including the recipient's name, phone number,
              address, city, state, and postal code where required.
            </p>

            <p className="mt-4">
              Zoka Market may not be responsible for delivery delays or failed
              deliveries caused by incorrect or incomplete information provided
              by the customer.
            </p>
          </section>

          {/* 4. Shipping Charges */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              4. Shipping Charges
            </h2>

            <p>
              Any applicable shipping charges will be displayed to the
              customer during the ordering or checkout process before the
              order is confirmed.
            </p>

            <p className="mt-4">
              Shipping charges may vary depending on the order, delivery
              location, product, or applicable delivery conditions.
            </p>
          </section>

          {/* 5. Delivery Time */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              5. Delivery Time
            </h2>

            <p>
              Estimated delivery time may vary depending on the delivery
              location, product availability, shipping method, and logistics
              conditions.
            </p>

            <p className="mt-4">
              Delivery timelines are estimates and may be affected by
              circumstances outside our reasonable control, including
              transportation delays, weather conditions, public holidays,
              operational issues, or other unforeseen events.
            </p>
          </section>

          {/* 6. Order Tracking */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              6. Order Tracking
            </h2>

            <p>
              Where tracking information is available, customers may receive
              order or delivery updates through the contact information
              provided during checkout.
            </p>
          </section>

          {/* 7. Failed Delivery */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              7. Failed or Delayed Delivery
            </h2>

            <p className="mb-4">
              A delivery may be delayed or unsuccessful due to circumstances
              such as:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Incorrect or incomplete delivery information.</li>
              <li>Customer unavailable at the delivery address.</li>
              <li>Courier or logistics delays.</li>
              <li>Adverse weather or unforeseen circumstances.</li>
              <li>Product availability or operational issues.</li>
            </ul>
          </section>

          {/* 8. Damaged Package */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              8. Damaged or Incorrect Product
            </h2>

            <p>
              If you receive a damaged, defective, or incorrect product,
              please contact us as soon as possible with your order details
              and relevant information. We will review the issue and provide
              an appropriate resolution according to our Refund &
              Cancellation Policy.
            </p>
          </section>

          {/* 9. Delivery Locations */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              9. Delivery Locations
            </h2>

            <p>
              Delivery availability depends on the serviceable locations
              supported by our delivery arrangements. Delivery availability
              and applicable charges, where relevant, may be determined during
              the ordering process.
            </p>
          </section>

          {/* 10. Contact */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              10. Contact Us
            </h2>

            <p>
              If you have any questions regarding shipping or delivery, please
              contact us:
            </p>

            <ul className="mt-4 space-y-2">
              <li>
                <strong>Email:</strong> py5825590@gmail.com
              </li>

              <li>
                <strong>Phone:</strong> +91 7410903250
              </li>

              <li>
                <strong>Address:</strong> Jaipur, Rajasthan, India
              </li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;