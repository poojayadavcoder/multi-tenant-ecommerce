import React from 'react';

const TermsAndConditions = () => {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-sm rounded-lg p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Terms & Conditions
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
              Welcome to Zoka Market. These Terms & Conditions govern your
              access to and use of our website and the purchase of products
              through our platform. By accessing or using the website, you
              agree to be bound by these terms.
            </p>
          </section>

          {/* 2. About Zoka */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              2. About Our Services
            </h2>

            <p>
              Zoka Market is an e-commerce platform that allows customers to
              browse products, place orders, and make payments online. Product
              information, availability, pricing, and other details may be
              updated from time to time.
            </p>
          </section>

          {/* 3. User Account */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              3. User Accounts
            </h2>

            <p className="mb-4">
              Some features of the website may require you to create an
              account. You are responsible for:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Providing accurate and complete information.</li>
              <li>Keeping your account credentials secure.</li>
              <li>Maintaining the confidentiality of your account.</li>
              <li>Informing us if you become aware of unauthorized access.</li>
            </ul>
          </section>

          {/* 4. Products & Pricing */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              4. Products and Pricing
            </h2>

            <p>
              We make reasonable efforts to ensure that product descriptions,
              images, availability, and prices displayed on the website are
              accurate. However, errors or changes may occasionally occur.
            </p>

            <p className="mt-4">
              We reserve the right to update product information, pricing, and
              availability at any time without prior notice.
            </p>
          </section>

          {/* 5. Orders */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              5. Orders
            </h2>

            <p>
              When you place an order through Zoka Market, you agree to provide
              accurate information required for processing and delivery.
            </p>

            <p className="mt-4">
              An order may be cancelled or rejected if the product is
              unavailable, there is an error in pricing or product information,
              or if we reasonably suspect fraudulent or unauthorized activity.
            </p>
          </section>

          {/* 6. Payments */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              6. Payments
            </h2>

            <p>
              Zoka Market uses a third-party payment gateway to process online
              payments securely. Customers may be required to provide payment
              information directly to the payment gateway during checkout.
            </p>

            <p className="mt-4">
              Payment confirmation is subject to successful authorization and
              verification by the payment gateway. An order may not be
              considered successfully paid until payment confirmation is
              received.
            </p>

            <p className="mt-4">
              Zoka Market does not store complete payment card details, CVV
              numbers, or banking credentials on its servers.
            </p>
          </section>

          {/* 7. Shipping */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              7. Shipping and Delivery
            </h2>

            <p>
              Orders will be shipped to the delivery address provided by the
              customer during checkout. Delivery timelines may vary depending
              on the delivery location, product availability, and logistics
              conditions.
            </p>

            <p className="mt-4">
              For more information about delivery timelines and shipping
              conditions, please refer to our Shipping Policy.
            </p>
          </section>

          {/* 8. Cancellation & Refund */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              8. Cancellation and Refunds
            </h2>

            <p>
              Order cancellation and refund requests are subject to our
              Refund and Cancellation Policy.
            </p>

            <p className="mt-4">
              Where a refund is approved, the refund will generally be
              processed through the applicable payment method or payment
              gateway, subject to the processing time of the relevant
              financial institution.
            </p>
          </section>

          {/* 9. Prohibited Use */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              9. Prohibited Activities
            </h2>

            <p className="mb-4">
              You agree not to use the website for any unlawful or unauthorized
              purpose, including:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Attempting to gain unauthorized access to the website.</li>
              <li>Using the website for fraudulent transactions.</li>
              <li>Providing false or misleading information.</li>
              <li>Interfering with the security or functionality of the website.</li>
              <li>Using the website in violation of applicable laws.</li>
            </ul>
          </section>

          {/* 10. Intellectual Property */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              10. Intellectual Property
            </h2>

            <p>
              Unless otherwise stated, the content available on Zoka Market,
              including text, graphics, logos, designs, and website
              functionality, is owned by or licensed to Zoka Market and may
              not be copied, reproduced, or distributed without permission.
            </p>
          </section>

          {/* 11. Limitation */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              11. Limitation of Liability
            </h2>

            <p>
              We will make reasonable efforts to keep the website available and
              information accurate. However, we do not guarantee that the
              website will always be available, error-free, or uninterrupted.
            </p>

            <p className="mt-4">
              To the extent permitted by applicable law, Zoka Market will not
              be responsible for losses arising from circumstances beyond our
              reasonable control.
            </p>
          </section>

          {/* 12. Changes */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              12. Changes to These Terms
            </h2>

            <p>
              We may update these Terms & Conditions from time to time. Any
              changes will be posted on this page with an updated revision
              date. Your continued use of the website after changes are
              published constitutes acceptance of the updated terms.
            </p>
          </section>

          {/* 13. Contact */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              13. Contact Us
            </h2>

            <p>
              If you have any questions regarding these Terms & Conditions,
              please contact us:
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

export default TermsAndConditions;