import React from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Activity, Stethoscope, Zap, ArrowRight, User } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const predictors = [
    { title: 'Heart Disease', icon: Heart, path: '/predictors/heart', color: 'text-red-400', bg: 'bg-red-400/10' },
    { title: 'Diabetes', icon: Activity, path: '/predictors/diabetes', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { title: 'Breast Cancer', icon: Stethoscope, path: '/predictors/breast', color: 'text-pink-400', bg: 'bg-pink-400/10' },
    { title: 'Lung Cancer', icon: Zap, path: '/predictors/lung', color: 'text-teal-400', bg: 'bg-teal-400/10' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.fullname || 'User'}</h1>
          <p className="text-text-muted">Select a module below to start a new analysis</p>
        </div>
        <div className="hidden sm:flex items-center space-x-3 bg-surface border border-white/5 px-4 py-2 rounded-xl">
          <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="font-medium text-sm">{user?.fullname}</div>
            <div className="text-xs text-text-muted">{user?.email}</div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-6">Prediction Modules</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {predictors.map((module, idx) => (
          <motion.div
            key={module.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link to={module.path} className="block h-full">
              <div className="card p-6 h-full hover:bg-surface-hover transition-colors group">
                <div className={`h-12 w-12 rounded-xl ${module.bg} flex items-center justify-center mb-4`}>
                  <module.icon className={`h-6 w-6 ${module.color}`} />
                </div>
                <h3 className="text-lg font-bold mb-2">{module.title}</h3>
                <div className="flex items-center text-primary text-sm font-medium mt-4 group-hover:translate-x-1 transition-transform">
                  Start Prediction <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      
      {/* Disclaimer */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-lg font-semibold mb-2 text-warning flex items-center">
           Medical Disclaimer
        </h3>
        <p className="text-text-muted text-sm leading-relaxed">
          PredictX is an educational and research-oriented machine learning project. Predictions are model outputs and are not a medical diagnosis. Always consult a qualified healthcare professional for medical decisions.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
