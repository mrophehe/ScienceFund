import React from 'react';
import Hero from '../components/Hero';
import FeaturedProjects from '../components/FeaturedProjects';
import HowItWorks from '../components/HowItWorks';
import { motion } from 'framer-motion';
import { Users, BadgeCheck, BarChart3 } from 'lucide-react';

const HomePage: React.FC = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      value: "1,200+",
      label: "Researchers",
    },
    {
      icon: <BadgeCheck className="w-8 h-8 text-purple-600" />,
      value: "$4.2M+",
      label: "Funded",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
      value: "87%",
      label: "Project Success Rate",
    },
  ];

  return (
    <div>
      <Hero />
      <FeaturedProjects />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="bg-slate-50 p-6 rounded-xl shadow-sm text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                <p className="text-slate-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <HowItWorks />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold text-slate-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Partners & Integrations
            </motion.h2>
            <motion.p 
              className="text-slate-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Powered by innovative technology partners
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col items-center p-6">
              <div className="text-2xl font-bold text-slate-900 mb-2">Screenpipe</div>
              <p className="text-center text-slate-600 text-sm">
                Research progress tracking and verification
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6">
              <div className="text-2xl font-bold text-slate-900 mb-2">Groq</div>
              <p className="text-center text-slate-600 text-sm">
                Smart contract interpretation and analysis
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6">
              <div className="text-2xl font-bold text-slate-900 mb-2">Base</div>
              <p className="text-center text-slate-600 text-sm">
                Secure wallet-based payment processing
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;