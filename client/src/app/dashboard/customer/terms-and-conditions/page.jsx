import React from 'react';

const TermsAndConditions = () => {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-sm rounded-lg p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms & Conditions</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: {lastUpdated}</p>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing this website, we assume you accept these terms and conditions. Do not continue to use Zoka Market 
              if you do not agree to take all of the terms and conditions stated on this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Intellectual Property Rights</h2>
            <p>
              Other than the content you own, under these Terms, Zoka Market and/or its licensors own all the intellectual 
              property rights and materials contained in this Website. You are granted limited license only for purposes of 
              viewing the material contained on this Website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Restrictions</h2>
            <p className="mb-4">
              You are specifically restricted from all of the following:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Publishing any Website material in any other media.</li>
              <li>Selling, sublicensing and/or otherwise commercializing any Website material.</li>
              <li>Publicly performing and/or showing any Website material.</li>
              <li>Using this Website in any way that is or may be damaging to this Website.</li>
              <li>Using this Website in any way that impacts user access to this Website.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Your Content</h2>
            <p>
              In these Website Standard Terms and Conditions, "Your Content" shall mean any audio, video text, images or other 
              material you choose to display on this Website. By displaying Your Content, you grant Zoka Market a non-exclusive, 
              worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any 
              and all media.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. No Warranties</h2>
            <p>
              This Website is provided "as is," with all faults, and Zoka Market express no representations or warranties, of any 
              kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall 
              be interpreted as advising you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
            <p>
              In no event shall Zoka Market, nor any of its officers, directors and employees, shall be held liable for anything 
              arising out of or in any way connected with your use of this Website whether such liability is under contract.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Contact Us</h2>
            <p>
              If you have any questions about our Terms and Conditions, please contact us:
            </p>
            <ul className="mt-4 space-y-2">
              <li><strong>Email address:</strong> py5825590@gmail.com</li>
              <li><strong>Phone number:</strong> +91 7410903250</li>
              <li><strong>Address:</strong> Jaipur, Rajasthan, India</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
