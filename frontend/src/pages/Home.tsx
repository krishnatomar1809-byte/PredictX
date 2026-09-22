import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Activity, Stethoscope, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-32">
        {/* Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-primary/5 border border-primary/20 rounded-full px-4 py-1.5 mb-8"
            >
              <span className="flex h-2 w-2 rounded-full bg-success"></span>
              <span className="text-sm font-medium text-text-muted">Multi-Disease Prediction Platform</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight"
            >
              AI-Powered <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Healthcare Intelligence
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-text-muted mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Explore intelligent prediction tools for heart disease, diabetes, breast cancer and lung cancer through a modern, secure, and user-friendly platform.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Link to="/predictors" className="btn-primary w-full sm:w-auto flex items-center justify-center text-lg px-8 py-4">
                Explore Predictors
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/about" className="w-full sm:w-auto px-8 py-4 rounded-full border border-primary/20 hover:bg-primary/5 transition-colors text-lg font-medium">
                How It Works
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-surface/50 border-y border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Available Prediction Modules</h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Our machine learning models have been trained to provide risk analysis for four major health conditions using clinical data and medical imaging.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Heart Disease', icon: Heart, desc: 'Analyze clinical parameters to assess cardiovascular risk.', color: 'text-red-400', bg: 'bg-red-400/10' },
              { title: 'Diabetes', icon: Activity, desc: 'Evaluate glucose, BMI, and family history for diabetes risk.', color: 'text-blue-400', bg: 'bg-blue-400/10' },
              { title: 'Breast Cancer', icon: Stethoscope, desc: 'Analyze histology images for malignant or benign detection.', color: 'text-pink-400', bg: 'bg-pink-400/10' },
              { title: 'Lung Cancer', icon: Zap, desc: 'Assess CT scan imagery for pulmonary nodules classification.', color: 'text-teal-400', bg: 'bg-teal-400/10' },
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="card p-6 hover:border-primary/50 transition-colors group"
              >
                <div className={`h-12 w-12 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Tech */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Designed for Privacy & Precision</h2>
              <p className="text-text-muted text-lg mb-8 leading-relaxed">
                PredictX utilizes state-of-the-art machine learning models securely deployed on a Node.js infrastructure. We ensure patient data is handled carefully during inference and immediately discarded post-prediction for image scans.
              </p>
              
              <ul className="space-y-4">
                {[
                  'Secure Authentication & Dashboard',
                  'Instant Model Inference via Python Processes',
                  'No Permanent Storage of Medical Images',
                  'Downloadable PDF Reports',
                ].map((item) => (
                  <li key={item} className="flex items-center text-text-main">
                    <CheckCircle2 className="h-5 w-5 text-success mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <div className="glass p-8 rounded-3xl relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-primary to-accent rounded-3xl opacity-20 blur"></div>
                <div className="relative space-y-6">
                  {/* Mock dashboard element */}
                  <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-primary/10">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Data Encryption</div>
                        <div className="text-xs text-text-muted">Active during transmission</div>
                      </div>
                    </div>
                    <div className="text-success text-sm font-medium">Secured</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-primary/10">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <Activity className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <div className="font-medium">Model Status</div>
                        <div className="text-xs text-text-muted">4/4 Models Online</div>
                      </div>
                    </div>
                    <div className="text-success text-sm font-medium">Operational</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/20 bg-surface py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Activity className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">PredictX</span>
          </div>
          <p className="text-sm text-text-muted text-center md:text-left">
            Developed by Krishna Tomar. This is an educational/research project.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
