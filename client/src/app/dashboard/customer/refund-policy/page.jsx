import React from 'react';

const RefundPolicy = () => {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-sm rounded-lg p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Refund & Cancellation Policy
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
              At Zoka Market, we aim to provide a smooth and reliable shopping
              experience. This Refund & Cancellation Policy explains the
              conditions under which customers may cancel an order or request
              a refund.
            </p>
          </section>

          {/* 2. Order Cancellation */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              2. Order Cancellation
            </h2>

            <p>
              Customers may request cancellation of an order before the order
              has been shipped or dispatched.
            </p>

            <p className="mt-4">
              Once an order has been shipped or dispatched, cancellation may
              not be possible. In such cases, the customer may need to follow
              the applicable return or refund process.
            </p>
          </section>

          {/* 3. Refund Eligibility */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              3. Refund Eligibility
            </h2>

            <p className="mb-4">
              A refund may be considered in the following situations:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                The order was cancelled before shipment.
              </li>

              <li>
                The product was unavailable after the order was placed.
              </li>

              <li>
                The customer received a damaged or incorrect product.
              </li>

              <li>
                A payment was successfully deducted but the order could not be
                successfully processed.
              </li>

              <li>
                Any other situation where a refund is approved by Zoka Market.
              </li>
            </ul>
          </section>

          {/* 4. Non-Refundable Situations */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              4. Non-Refundable Situations
            </h2>

            <p className="mb-4">
              A refund may not be available in situations such as:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                Products damaged due to improper use or handling by the
                customer.
              </li>

              <li>
                Requests made after the applicable return or refund period.
              </li>

              <li>
                Products that have been altered, used, or damaged after
                delivery, where applicable.
              </li>
            </ul>
          </section>

          {/* 5. Payment Failure */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              5. Payment Failure
            </h2>

            <p>
              If money is deducted from a customer's account but the payment
              is not successfully confirmed by the payment gateway, the
              transaction will be verified before any refund is initiated.
            </p>

            <p className="mt-4">
              If a refund is applicable, it will generally be processed to the
              original payment method through the payment gateway.
            </p>
          </section>

          {/* 6. Refund Process */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              6. Refund Process
            </h2>

            <p>
              To request a refund, customers should contact us with their order
              details, including the order ID and the reason for the refund
              request.
            </p>

            <p className="mt-4">
              Refund requests will be reviewed and processed according to the
              applicable circumstances and our policies.
            </p>
          </section>

          {/* 7. Refund Timeline */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              7. Refund Timeline
            </h2>

            <p>
              Once a refund is approved and initiated, the time required for
              the amount to appear in the customer's account may depend on the
              payment gateway and the customer's bank or financial
              institution.
            </p>

            <p className="mt-4">
              Customers should allow the applicable processing time for the
              refund to be reflected in their account.
            </p>
          </section>

          {/* 8. Incorrect or Damaged Products */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              8. Damaged or Incorrect Products
            </h2>

            <p>
              If you receive a damaged, defective, or incorrect product,
              please contact us as soon as possible with your order details
              and relevant information so that we can review the issue and
              determine the appropriate resolution.
            </p>
          </section>

          {/* 9. Changes */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              9. Changes to This Policy
            </h2>

            <p>
              We may update this Refund & Cancellation Policy from time to
              time. Any changes will be posted on this page with an updated
              revision date.
            </p>
          </section>

          {/* 10. Contact */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              10. Contact Us
            </h2>

            <p>
              If you have any questions regarding refunds or order
              cancellations, please contact us:
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

export default RefundPolicy;