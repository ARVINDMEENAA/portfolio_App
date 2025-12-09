import { useState } from 'react';
import { subscribeNewsletter } from '../api/api';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    
    try {
      await subscribeNewsletter({ email });
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error);
      const errorMsg = error.response?.data?.error || 'Failed to subscribe. Please try again.';
      setMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-blue-600 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="mb-8">Stay updated with our latest news and updates</p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 p-3 rounded text-gray-900"
            required
          />
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-white text-blue-600 px-6 py-3 rounded font-bold hover:bg-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        {message && <p className="mt-4 font-medium">{message}</p>}
      </div>
    </div>
  );
}
