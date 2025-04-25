import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Lightbulb, BarChart3, Shield } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Decentralized Funding for Scientific Innovation
            </motion.h1>
            <motion.p 
              className="text-lg text-purple-100 mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Connecting brilliant researchers with blockchain-powered funding. Transparent progress tracking, secure smart contracts, and seamless payments.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link to="/explore" className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 shadow-lg flex items-center justify-center">
                Explore Projects
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/create" className="bg-transparent border border-purple-400 hover:border-purple-300 text-white font-medium py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center">
                Start Your Project
              </Link>
            </motion.div>
          </div>
          <div className="md:w-1/2">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative z-10 bg-gradient-to-br from-slate-800 to-purple-800 rounded-2xl shadow-2xl p-6 border border-purple-700/50">
                <img 
                  src="https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Scientific research" 
                  className="w-full h-auto rounded-lg mb-6"
                />
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-purple-700/30 p-3 rounded-lg">
                    <Lightbulb className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Research Innovation</h4>
                    <p className="text-purple-200 text-sm">Fund groundbreaking scientific advancements</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-purple-700/30 p-3 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Progress Tracking</h4>
                    <p className="text-purple-200 text-sm">Transparent milestone verification</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-purple-700/30 p-3 rounded-lg">
                    <Shield className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Secure Funding</h4>
                    <p className="text-purple-200 text-sm">Blockchain-secured smart contracts</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
              <div className="absolute -top-6 -left-6 w-40 h-40 bg-indigo-600 rounded-full blur-3xl opacity-20"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;