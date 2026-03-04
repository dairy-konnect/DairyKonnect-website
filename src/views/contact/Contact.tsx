import ContactForm from '../../components/about/ContactForm';

export default function Contact() {
  return (
    <div className="min-h-full bg-white">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-10">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-green-600 mb-2">
            Contact
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-3">
            Get in touch with Dairy Konnect
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Have questions about the platform, partnerships, or early access? Send us a message and we&apos;ll
            get back to you as soon as possible.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

