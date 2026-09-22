import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Activity, Stethoscope, Zap, ArrowRight, FileText, Upload, ShieldCheck } from 'lucide-react';

const Predictors = () => {
  const predictors = [
    {
      id: 'heart',
      title: 'Heart Disease Predictor',
      description: 'Analyze 13 clinical parameters including cholesterol, blood pressure, and ECG results to predict cardiovascular risk.',
      icon: Heart,
      color: 'text-red-400',
      bg: 'bg-red-400/10',
      border: 'hover:border-red-400/50',
      path: '/predictors/heart',
      inputType: 'Clinical Form Data',
      inputIcon: FileText
    },
    {
      id: 'diabetes',
      title: 'Diabetes Predictor',
      description: 'Evaluate factors such as glucose levels, BMI, insulin, and diabetes pedigree function to assess diabetes risk.',
      icon: Activity,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
      border: 'hover:border-blue-400/50',
      path: '/predictors/diabetes',
      inputType: 'Clinical Form Data',
      inputIcon: FileText
    },
    {
      id: 'breast',
      title: 'Breast Cancer Classifier',
      description: 'Upload histology images for AI analysis to classify tissue samples as malignant or benign.',
      icon: Stethoscope,
      color: 'text-pink-400',
      bg: 'bg-pink-400/10',
      border: 'hover:border-pink-400/50',
      path: '/predictors/breast',
      inputType: 'Image Upload',
      inputIcon: Upload
    },
    {
      id: 'lung',
      title: 'Lung Cancer Classifier',
      description: 'Upload CT scan imagery of pulmonary regions to detect the presence of cancerous nodules.',
      icon: Zap,
      color: 'text-teal-400',
      bg: 'bg-teal-400/10',
      border: 'hover:border-teal-400/50',
      path: '/predictors/lung',
      inputType: 'Image Upload',
      inputIcon: Upload
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Prediction Hub</h1>
        <p className="text-xl text-text-muted max-w-3xl mx-auto">
          Select a prediction module below to begin your analysis. Our machine learning models are designed to process clinical data and medical imagery securely.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-2 gap-8"
      >
        {predictors.map((module) => (
          <motion.div key={module.id} variants={itemVariants}>
            <Link to={module.path} className="block h-full">
              <div className={`card p-8 h-full transition-all duration-300 ${module.border} hover:bg-surface-hover group relative overflow-hidden`}>
                {/* Decorative background element */}
                <div className={`absolute -right-12 -top-12 w-40 h-40 rounded-full ${module.bg} blur-3xl opacity-50 group-hover:opacity-100 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className={`h-14 w-14 rounded-2xl ${module.bg} flex items-center justify-center mb-6`}>
                    <module.icon className={`h-7 w-7 ${module.color}`} />
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-3">{module.title}</h2>
                  <p className="text-text-muted mb-8 leading-relaxed line-clamp-2">
                    {module.description}
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-primary/10 pt-6 mt-auto">
                    <div className="flex items-center text-sm text-text-muted bg-primary/5 px-3 py-1.5 rounded-lg">
                      <module.inputIcon className="h-4 w-4 mr-2" />
                      {module.inputType}
                    </div>
                    
                    <div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform">
                      Start Analysis
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Disclaimer */}
      <div className="mt-20 glass p-6 rounded-2xl text-center max-w-3xl mx-auto">
        <p className="text-sm text-text-muted flex items-center justify-center">
          <ShieldCheck className="h-5 w-5 text-warning mr-2" />
          PredictX is an educational and research-oriented machine learning project. Predictions are model outputs and are not a medical diagnosis. Always consult a qualified healthcare professional for medical decisions.
        </p>
      </div>
    </div>
  );
};

export default Predictors;
