export default function TermsAndConditions() {
  return (
    <div className="min-h-full bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-green-600 mb-3">
          Legal
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-4">
          Terms &amp; Conditions
        </h1>
        <p className="text-sm text-slate-500 mb-10">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-slate-700">
          <p>
            These Terms &amp; Conditions (&quot;Terms&quot;) govern your use of the Dairy Konnect website and
            platform (&quot;Service&quot;). By accessing or using Dairy Konnect, you agree to be bound by these
            Terms.
          </p>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">1. About Dairy Konnect</h2>
            <p>
              Dairy Konnect is a software platform that helps dairies, milk vendors, and farmers manage daily
              milk collection, pricing, transaction records, and payments in a transparent and efficient way.
              The platform is currently under active development and may change as we add new features.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">2. Acceptable use</h2>
            <p className="mb-2">You agree that you will not use Dairy Konnect to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Break any applicable laws or regulations.</li>
              <li>Upload or share malicious, fraudulent, or misleading content.</li>
              <li>Attempt to gain unauthorized access to our systems or other users&apos; data.</li>
              <li>Reverse engineer, copy, or resell the Service without our permission.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">3. Accounts and access</h2>
            <p>
              Some parts of Dairy Konnect may require a user account provided by an administrator or dairy
              partner. You are responsible for maintaining the confidentiality of your login details and for
              all activity that occurs under your account.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">4. Data and privacy</h2>
            <p>
              Our handling of personal information is described in our Privacy Policy. By using the Service,
              you agree that we can process your information in line with that policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">5. Availability and changes</h2>
            <p>
              We aim to keep Dairy Konnect available and reliable, but we do not guarantee uninterrupted
              access. We may modify, suspend, or discontinue parts of the Service at any time as we improve
              the platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">6. Disclaimer of warranties</h2>
            <p>
              Dairy Konnect is provided on an &quot;as is&quot; and &quot;as available&quot; basis. To the
              maximum extent permitted by law, we disclaim all warranties, whether express or implied,
              including fitness for a particular purpose and non‑infringement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">7. Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, Dairy Konnect and its team will not be liable for any
              indirect, incidental, or consequential damages arising from your use of, or inability to use, the
              Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">8. Changes to these Terms</h2>
            <p>
              We may update these Terms as Dairy Konnect evolves. When we make changes, we will update the
              &quot;Last updated&quot; date at the top of this page. Continued use of the Service after changes
              take effect means you accept the updated Terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

