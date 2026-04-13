import { ShieldCheck, Award, CheckCircle, Lock, Search, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AuthGuarantee() {
  const steps = [
    {
      icon: <Search size={32} />,
      title: "Multi-Point Inspection",
      desc: "Our experts perform a rigorous physical inspection of every item, checking materials, stitching, hardware, and serial codes."
    },
    {
      icon: <Award size={32} />,
      title: "Expert Verification",
      desc: "Items are cross-referenced with our extensive database of brand-specific authentication markers and historical data."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "100% Money-Back Guarantee",
      desc: "If any item sold by us is proven to be inauthentic by a reputable third-party authenticator, we offer a full refund."
    }
  ];

  return (
    <div className="pb-20">
      {/* Hero */}
      <section className="bg-brand-deep text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <ShieldCheck size={40} className="text-white" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold">Authenticity Guarantee</h1>
          <p className="text-brand-soft/80 text-lg font-light leading-relaxed">
            At Basket Brand Name, trust is our most valuable asset. We guarantee that every item we sell is 100% authentic.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center space-y-6"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-brand-soft text-brand-royal mb-4">
                {step.icon}
              </div>
              <h3 className="text-2xl font-serif font-bold text-brand-dark">{step.title}</h3>
              <p className="text-gray-500 font-light leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Details */}
      <section className="max-w-4xl mx-auto px-6 py-24 bg-brand-soft rounded-3xl">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-brand-dark mb-4">Our Commitment</h2>
            <p className="text-gray-500 font-light">We take the risk out of luxury resale so you can shop with peace of mind.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl space-y-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3 text-brand-royal">
                <CheckCircle size={20} />
                <h4 className="font-serif font-bold">In-House Experts</h4>
              </div>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                Our team consists of seasoned luxury specialists with years of experience in brand authentication.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl space-y-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3 text-brand-royal">
                <Lock size={20} />
                <h4 className="font-serif font-bold">Secure Sourcing</h4>
              </div>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                We only source items from trusted private collections and authorized luxury partners.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
