import React from 'react';

const ShippingPolicy = () => {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-sm rounded-lg p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Shipping Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: {lastUpdated}</p>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Order Processing Time</h2>
            <p>
              All orders are processed within 1 to 3 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped. 
              Please note that there may be potential delays due to a high volume of orders or postal service problems that are outside of our control.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Shipping Rates and Delivery Estimates</h2>
            <p className="mb-4">
              Shipping charges for your order will be calculated and displayed at checkout. Delivery delays can occasionally occur.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Standard Shipping:</strong> 3-5 business days.</li>
              <li><strong>Express Shipping:</strong> 1-2 business days.</li>
              <li><strong>International Shipping:</strong> 7-14 business days (varies by country).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. International Shipping</h2>
            <p>
              We offer international shipping to most countries. Your order may be subject to import duties and taxes (including VAT), which are incurred once a shipment reaches your destination country. 
              Zoka Market is not responsible for these charges if they are applied and are your responsibility as the customer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. How Do I Check the Status of My Order?</h2>
            <p>
              When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available. 
              If you haven't received your order within the estimated delivery time, please contact us with your name and order number.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Damages</h2>
            <p>
              Zoka Market is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim. 
              Please save all packaging materials and damaged goods before filing a claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Contact Us</h2>
            <p>
              If you have any further questions about our shipping policy, please contact us:
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

export default ShippingPolicy;
