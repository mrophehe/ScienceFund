import React from 'react';
import { motion } from 'framer-motion';
import { FlaskRound as Flask, Microscope, FileCheck, Wallet } from 'lucide-react';

const steps = [
  {
    icon: <Flask className="w-12 h-12 text-purple-600" />,
    title: 'Create a Project',
    description: 'Researchers submit their project proposal including funding goals, milestones, and expected outcomes.',
  },
  {
    icon: <Microscope className="w-12 h-12 text-purple-600" />,
    title: 'Get Funded',
    description: 'Contributors fund projects they believe in using cryptocurrency via secure smart contracts.',
  },
  {
    icon: <FileCheck className="w-12 h-12 text-purple-600" />,
    title: 'Track Progress',
    description: 'Milestone completion is verified through Screenpipe\'s transparent tracking system.',
  },
  {
    icon: <Wallet className="w-12 h-12 text-purple-600" />,
    title: 'Receive Payments',
    description: 'Funds are automatically released when milestones are verified via Base payment network.',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold text-slate-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            How It Works
          </motion.h2>
          <motion.p 
            className="text-slate-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our decentralized platform connects researchers with funding through a transparent and secure process
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-center mb-4">
                <div className="bg-purple-100 p-4 rounded-full">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-600">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="max-w-3xl mx-auto mt-16 p-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-2">Ready to advance science through decentralized funding?</h3>
          <p className="mb-6">Join our platform today as a researcher or contributor.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-purple-600 hover:bg-slate-100 font-medium py-2 px-6 rounded-lg transition duration-300">
              Start a Project
            </button>
            <button className="bg-transparent border border-white hover:bg-white/10 text-white font-medium py-2 px-6 rounded-lg transition duration-300">
              Browse Projects
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;