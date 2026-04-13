import { useState } from 'react';
import { Camera, Upload, Send, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SellWithUs() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    brand: '',
    itemType: '',
    itemName: '',
    condition: 'Excellent',
    accessories: '',
    expectedPrice: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3); // Success state
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-dark mb-6">Sell With Us</h1>
        <p className="text-gray-500 font-light text-lg max-w-2xl mx-auto">
          Turn your luxury collection into liquidity. We offer a seamless consignment and buyout process for authentic designer pieces.
        </p>
      </div>

      {step === 1 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-brand-royal text-white flex items-center justify-center shrink-0 font-bold">1</div>
              <div>
                <h3 className="text-xl font-serif font-bold mb-2">Submit Your Item</h3>
                <p className="text-gray-500 text-sm font-light">Fill out our simple form with details and photos of your luxury piece.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-brand-royal text-white flex items-center justify-center shrink-0 font-bold">2</div>
              <div>
                <h3 className="text-xl font-serif font-bold mb-2">Expert Valuation</h3>
                <p className="text-gray-500 text-sm font-light">Our specialists will review your submission and provide a preliminary offer within 24-48 hours.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-brand-royal text-white flex items-center justify-center shrink-0 font-bold">3</div>
              <div>
                <h3 className="text-xl font-serif font-bold mb-2">Get Paid</h3>
                <p className="text-gray-500 text-sm font-light">Ship your item to us for final inspection. Once verified, you'll receive payment via your preferred method.</p>
              </div>
            </div>
            <button 
              onClick={() => setStep(2)}
              className="w-full btn-premium py-4 text-lg"
            >
              START SUBMISSION
            </button>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1590739225287-bd31519780c3?q=80&w=800" 
              alt="Luxury Items" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-royal/10" />
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.form 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
              <input required type="text" className="w-full px-4 py-3 bg-brand-soft border-none rounded-md focus:ring-1 focus:ring-brand-royal" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
              <input required type="email" className="w-full px-4 py-3 bg-brand-soft border-none rounded-md focus:ring-1 focus:ring-brand-royal" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Brand</label>
              <input required type="text" placeholder="e.g. Chanel, Louis Vuitton" className="w-full px-4 py-3 bg-brand-soft border-none rounded-md focus:ring-1 focus:ring-brand-royal" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Item Name</label>
              <input required type="text" placeholder="e.g. Classic Flap Bag" className="w-full px-4 py-3 bg-brand-soft border-none rounded-md focus:ring-1 focus:ring-brand-royal" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Item Photos</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-brand-soft rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-brand-royal hover:text-brand-royal transition-all cursor-pointer">
                  <Camera size={24} />
                  <span className="text-[10px] mt-2">ADD PHOTO</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Additional Notes</label>
            <textarea rows={4} className="w-full px-4 py-3 bg-brand-soft border-none rounded-md focus:ring-1 focus:ring-brand-royal" placeholder="Condition details, accessories included, etc."></textarea>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg text-brand-royal">
            <ShieldCheck size={20} />
            <p className="text-xs">Your information is secure. We never share your details with third parties.</p>
          </div>

          <button type="submit" className="w-full btn-premium py-4 flex items-center justify-center space-x-2">
            <Send size={18} />
            <span>SUBMIT REQUEST</span>
          </button>
        </motion.form>
      )}

      {step === 3 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 space-y-6"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-brand-dark">Request Submitted!</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Thank you for your submission. Our specialists will review your item and contact you within 24-48 hours with a valuation.
          </p>
          <button onClick={() => setStep(1)} className="btn-outline">
            BACK TO HOME
          </button>
        </motion.div>
      )}
    </div>
  );
}
