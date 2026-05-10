import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const fieldWrap =
  'flex items-center mt-2 mb-4 min-h-11 pl-3 border border-dk-line rounded-xl bg-white focus-within:border-dk-green-400 focus-within:ring-2 focus-within:ring-dk-green-200/80 transition-all';

export default function ContactForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('common.thankYouMessage'));
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center px-4 py-10 text-sm text-dk-ink sm:py-12"
    >
      <span className="inline-flex rounded-full bg-dk-green-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-dk-green-800">
        {t('common.contactUs')}
      </span>

      <h2 className="font-serif py-4 text-center text-3xl font-semibold tracking-tight text-dk-green-900 sm:text-4xl">
        {t('common.letsGetInTouch')}
      </h2>

      <p className="max-w-lg pb-8 text-center text-dk-muted sm:pb-10">
        {t('common.orReachOut')}{' '}
        <a href="mailto:info@dairykonnect.com" className="font-semibold text-dk-green-700 underline-offset-2 hover:underline">
          info@dairykonnect.com
        </a>
      </p>

      <div className="w-full max-w-md px-1 sm:px-2">
        <label htmlFor="name" className="font-medium text-dk-ink-2">
          {t('common.fullName')}
        </label>
        <div className={fieldWrap}>
          <svg className="h-5 w-5 shrink-0 text-dk-muted" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path
              d="M18.311 16.406a9.64 9.64 0 0 0-4.748-4.158 5.938 5.938 0 1 0-7.125 0 9.64 9.64 0 0 0-4.749 4.158.937.937 0 1 0 1.623.938c1.416-2.447 3.916-3.906 6.688-3.906 2.773 0 5.273 1.46 6.689 3.906a.938.938 0 0 0 1.622-.938M5.938 7.5a4.063 4.063 0 1 1 8.125 0 4.063 4.063 0 0 1-8.125 0"
              fill="currentColor"
            />
          </svg>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="h-11 min-w-0 flex-1 bg-transparent px-2 text-dk-ink outline-none placeholder:text-dk-muted/80"
            placeholder={t('common.enterFullName')}
            required
          />
        </div>

        <label htmlFor="email-address" className="mt-2 block font-medium text-dk-ink-2">
          {t('common.emailAddress')}
        </label>
        <div className={fieldWrap}>
          <svg className="h-5 w-5 shrink-0 text-dk-muted" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path
              d="M17.5 3.438h-15a.937.937 0 0 0-.937.937V15a1.563 1.563 0 0 0 1.562 1.563h13.75A1.563 1.563 0 0 0 18.438 15V4.375a.94.94 0 0 0-.938-.937m-2.41 1.874L10 9.979 4.91 5.313zM3.438 14.688v-8.18l5.928 5.434a.937.937 0 0 0 1.268 0l5.929-5.435v8.182z"
              fill="currentColor"
            />
          </svg>
          <input
            type="email"
            id="email-address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="h-11 min-w-0 flex-1 bg-transparent px-2 text-dk-ink outline-none placeholder:text-dk-muted/80"
            placeholder={t('common.enterEmailAddress')}
            required
          />
        </div>

        <label htmlFor="message" className="mt-2 block font-medium text-dk-ink-2">
          {t('common.message')}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="mt-2 w-full resize-none rounded-xl border border-dk-line bg-white p-3 text-dk-ink outline-none transition placeholder:text-dk-muted/80 focus:border-dk-green-400 focus:ring-2 focus:ring-dk-green-200/80"
          placeholder={t('common.enterMessage')}
          required
        />

        <button
          type="submit"
          className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-dk-green-800 px-5 text-sm font-semibold text-white shadow-dk-sm transition hover:bg-dk-green-900 hover:brightness-[1.02] active:scale-[0.98]"
        >
          {t('common.submitForm')}
          <svg className="h-4 w-4 shrink-0" width="21" height="20" viewBox="0 0 21 20" fill="none" aria-hidden>
            <path
              d="m18.038 10.663-5.625 5.625a.94.94 0 0 1-1.328-1.328l4.024-4.023H3.625a.938.938 0 0 1 0-1.875h11.484l-4.022-4.025a.94.94 0 0 1 1.328-1.328l5.625 5.625a.935.935 0 0 1-.002 1.33"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
