import React from 'react';

const RefundPolicy = () => {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-sm rounded-lg p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Refund Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: {lastUpdated}</p>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. General Overview</h2>
            <p>
              Thank you for shopping at Zoka Market. If you are not entirely satisfied with your purchase, we're here to help. 
              Our products can be returned within 30 days of the original purchase of the product. 
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Eligibility for Refunds and Exchanges</h2>
            <p className="mb-4">
              To be eligible for a return and refund, please make sure that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The product was purchased in the last 30 days.</li>
              <li>The product is in its original packaging and condition.</li>
              <li>The product isn't used or damaged.</li>
              <li>You have the receipt or proof of purchase.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Products Not Eligible for Refund</h2>
            <p className="mb-4">
              The following products cannot be returned:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Products made to your specifications or clearly personalized.</li>
              <li>Products which according to their nature are not suitable to be returned, deteriorate rapidly, or where the date of expiry is over.</li>
              <li>Products which are not suitable for return due to health protection or hygiene reasons and were unsealed after delivery.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Shipping Charges</h2>
            <p>
              Shipping charges incurred in connection with the return of a product are non-refundable. 
              You are responsible for paying the costs of shipping and for the risk of loss of or damage to the product during shipping, both to and from Zoka Market.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Damaged Items</h2>
            <p>
              If you received a damaged product, please notify us immediately for assistance. We will arrange a replacement or provide a full refund as per your preference.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Contact Us</h2>
            <p>
              If you have any questions about our Returns and Refunds Policy, please contact us:
            </p>
            <ul className="mt-4 space-y-2">
              <li><strong>Email address:</strong> py5825590@gmail.com</li>
              <li><strong>Phone number:</strong> +91 7410903250</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
