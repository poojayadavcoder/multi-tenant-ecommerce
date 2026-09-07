import React from 'react';

const PrivacyPolicy = () => {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-sm rounded-lg p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Privacy Policy
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
              Welcome to Zoka Market. We respect your privacy and are committed
              to protecting your personal information. This Privacy Policy
              explains how we collect, use, store, and protect your information
              when you use our website and purchase products from us.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              2. Information We Collect
            </h2>

            <p className="mb-4">
              We may collect the following types of information when you use
              our website:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Account Information:</strong> Name, username, email
                address, phone number, and other information required to create
                and manage your account.
              </li>

              <li>
                <strong>Contact and Delivery Information:</strong> Billing
                address, delivery address, email address, and telephone number
                required to process and deliver your orders.
              </li>

              <li>
                <strong>Order Information:</strong> Details of products you
                purchase, order details, order status, and related transaction
                information.
              </li>

              <li>
                <strong>Payment Information:</strong> Payment-related
                information such as transaction ID, order ID, payment status,
                and payment verification details. Payment card or banking
                information is processed securely by our third-party payment
                gateway and is not stored by Zoka Market.
              </li>

              <li>
                <strong>Technical Information:</strong> IP address, browser
                type, device information, login information, and other
                technical information collected when you access our website.
              </li>
            </ul>
          </section>

          {/* 3. How We Use Your Information */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              3. How We Use Your Personal Data
            </h2>

            <p className="mb-4">
              We may use the information we collect for the following purposes:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                To create and manage your customer account.
              </li>

              <li>
                To process and fulfil your orders.
              </li>

              <li>
                To process and verify online payments through our payment
                gateway.
              </li>

              <li>
                To provide order updates, delivery information, and customer
                support.
              </li>

              <li>
                To prevent fraudulent or unauthorized transactions and maintain
                the security of our website.
              </li>

              <li>
                To improve our website, products, services, and overall user
                experience.
              </li>

              <li>
                To comply with applicable legal and regulatory requirements.
              </li>
            </ul>
          </section>

          {/* 4. Payment Processing */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              4. Payment Processing
            </h2>

            <p>
              Zoka Market uses third-party payment gateway services to process
              online payments. Payment information required to complete a
              transaction may be securely processed by the payment gateway.
            </p>

            <p className="mt-4">
              Zoka Market does not directly store customers' complete payment
              card details, CVV numbers, or banking credentials on its
              servers. Payment processing is handled through the payment
              gateway's secure infrastructure.
            </p>
          </section>

          {/* 5. Data Security */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              5. Data Security
            </h2>

            <p>
              We take reasonable technical and organizational measures to
              protect your personal information against unauthorized access,
              loss, misuse, alteration, or disclosure.
            </p>

            <p className="mt-4">
              Access to personal information is limited to authorized persons
              who need the information to provide services, process orders,
              provide customer support, or maintain the website.
            </p>
          </section>

          {/* 6. Data Sharing */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              6. Sharing of Your Information
            </h2>

            <p className="mb-4">
              We may share necessary information with trusted third-party
              service providers when required to operate our e-commerce
              services, including:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                Payment gateway providers for processing and verifying
                payments.
              </li>

              <li>
                Delivery and logistics partners for fulfilling customer
                orders.
              </li>

              <li>
                Service providers that help us operate, maintain, and secure
                our website.
              </li>

              <li>
                Government or regulatory authorities where required by law.
              </li>
            </ul>
          </section>

          {/* 7. Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              7. Cookies and Similar Technologies
            </h2>

            <p>
              Our website may use cookies or similar technologies to maintain
              user sessions, remember preferences, improve website
              functionality, and understand how users interact with our
              website.
            </p>
          </section>

          {/* 8. Data Retention */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              8. Data Retention
            </h2>

            <p>
              We retain personal information only for as long as reasonably
              necessary to provide our services, fulfil orders, maintain
              transaction records, resolve disputes, prevent fraud, and comply
              with applicable legal obligations.
            </p>
          </section>

          {/* 9. Your Rights */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              9. Your Rights
            </h2>

            <p className="mb-4">
              Depending on applicable law, you may have rights regarding your
              personal information, including the right to:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Request access to your personal information.</li>

              <li>Request correction of inaccurate information.</li>

              <li>Request deletion of your personal information where
                applicable.</li>

              <li>Object to or restrict certain processing of your information.</li>

              <li>Withdraw consent where processing is based on consent.</li>
            </ul>
          </section>

          {/* 10. Contact */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              10. Contact Us
            </h2>

            <p>
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our privacy practices, you can contact us
              using the information below:
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

export default PrivacyPolicy;