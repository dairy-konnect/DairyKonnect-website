import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-full bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-green-600 mb-3">
          Legal
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500 mb-10">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-slate-700">
          <p>
            Dairy Konnect (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is a platform designed to help dairies, milk
            vendors, and farmers manage daily milk collection, pricing, and payments in a transparent and
            efficient way. This Privacy Policy explains how we handle information when you visit our website,
            use our applications, or contact us.
          </p>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">1. Information we collect</h2>
            <p className="mb-2">
              At this stage, Dairy Konnect primarily collects limited information to communicate with you and
              improve the platform:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <span className="font-medium">Contact details</span> such as your name, email address, and any
                information you provide when you submit a form or write to us at{' '}
                <a href="mailto:info@dairykonnect.com" className="text-green-600 hover:underline">
                  info@dairykonnect.com
                </a>
                .
              </li>
              <li>
                <span className="font-medium">Usage information</span> such as pages visited, approximate
                location, and device details collected via standard analytics and logs.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">2. How we use your information</h2>
            <p className="mb-2">We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Respond to your enquiries and provide customer support.</li>
              <li>Understand how people discover and use Dairy Konnect so we can improve the product.</li>
              <li>Communicate product updates, early access invitations, and important notices.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">3. Data sharing</h2>
            <p>
              We do not sell your personal data. We may share limited information with trusted service
              providers (for example, hosting, analytics, or email services) strictly for operating and
              improving Dairy Konnect. These providers are required to protect your data and use it only for
              the services they deliver to us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">4. Data security</h2>
            <p>
              We use modern infrastructure and HTTPS encryption to help protect your information in transit.
              However, no online service can be completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">5. Your choices</h2>
            <p className="mb-2">You can:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Ask us to update or delete your contact details by emailing{' '}
                <a href="mailto:info@dairykonnect.com" className="text-green-600 hover:underline">
                  info@dairykonnect.com
                </a>
                .
              </li>
              <li>Choose not to submit forms or provide optional information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">6. Third‑party links</h2>
            <p>
              Our website may link to third‑party sites (for example, app stores or partner websites). We are
              not responsible for the privacy practices or content of those websites, and we encourage you to
              review their policies separately.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">7. Changes to this policy</h2>
            <p>
              As we grow Dairy Konnect and launch more features, we may update this Privacy Policy. When we do,
              we will update the &quot;Last updated&quot; date at the top of this page.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">8. Contact us</h2>
            <p>
              If you have any questions about this Privacy Policy or how we handle your data, you can contact
              us at{' '}
              <a href="mailto:info@dairykonnect.com" className="text-green-600 hover:underline">
                info@dairykonnect.com
              </a>{' '}
              or via our{' '}
              <Link to="/contact" className="text-green-600 hover:underline">
                Contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

