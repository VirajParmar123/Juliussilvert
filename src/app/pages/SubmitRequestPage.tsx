import { useState } from 'react';
import { Link } from 'react-router';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

export function SubmitRequestPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="sticky top-0 z-50">
        <Header />
        <Navigation />
      </div>

      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 max-w-[640px] mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 outline-none"
      >
        <nav className="text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-gray-900">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Submit a Request</span>
        </nav>

        <h1 className="text-3xl font-medium text-gray-900 mb-2">Submit a Request</h1>
        <p className="text-gray-600 mb-8">
          Tell us how we can help. Our team will follow up as soon as possible.
        </p>

        {submitted ? (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
            <p className="text-gray-900 font-medium mb-2">Thank you — your request was sent.</p>
            <p className="text-sm text-gray-600 mb-6">
              This is a demo: connect this form to your support inbox or CRM when you go live.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-lg bg-brand-header px-6 py-3 text-sm font-semibold text-white hover:bg-brand-header-hover transition-colors"
            >
              Back to home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="req-name" className="block text-sm font-medium text-gray-800 mb-1.5">
                Name <span className="text-red-600">*</span>
              </label>
              <input
                id="req-name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 shadow-sm focus:border-brand-header focus:outline-none focus:ring-1 focus:ring-brand-header"
              />
            </div>
            <div>
              <label htmlFor="req-email" className="block text-sm font-medium text-gray-800 mb-1.5">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                id="req-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 shadow-sm focus:border-brand-header focus:outline-none focus:ring-1 focus:ring-brand-header"
              />
            </div>
            <div>
              <label htmlFor="req-phone" className="block text-sm font-medium text-gray-800 mb-1.5">
                Phone
              </label>
              <input
                id="req-phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 shadow-sm focus:border-brand-header focus:outline-none focus:ring-1 focus:ring-brand-header"
              />
            </div>
            <div>
              <label htmlFor="req-subject" className="block text-sm font-medium text-gray-800 mb-1.5">
                Subject <span className="text-red-600">*</span>
              </label>
              <input
                id="req-subject"
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 shadow-sm focus:border-brand-header focus:outline-none focus:ring-1 focus:ring-brand-header"
              />
            </div>
            <div>
              <label htmlFor="req-message" className="block text-sm font-medium text-gray-800 mb-1.5">
                Message <span className="text-red-600">*</span>
              </label>
              <textarea
                id="req-message"
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 shadow-sm focus:border-brand-header focus:outline-none focus:ring-1 focus:ring-brand-header resize-y min-h-[140px]"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto rounded-lg bg-brand-header px-8 py-3 text-sm font-semibold text-white hover:bg-brand-header-hover transition-colors"
            >
              Submit request
            </button>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
