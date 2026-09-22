import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Heart, Activity, AlertTriangle, ArrowLeft, RefreshCw, FileText, Download, User, ActivitySquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface HeartFormData {
  p1: number; // Age
  p2: string; // Sex (Male/Female or 1/0)
  p3: number; // CP (0-3)
  p4: number; // trestbps
  p5: number; // chol
  p6: string; // fbs (Yes/No or 1/0)
  p7: number; // restecg (0-2)
  p8: number; // thalach
  p9: number; // exang (1/0)
  p10: number; // oldpeak
  p11: number; // slope (0-2)
  p12: number; // ca (0-4)
  p13: number; // thal (0-3)
}

const HeartPredictor = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<HeartFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ prediction: string, result: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: HeartFormData) => {
    setIsSubmitting(true);
    setError(null);
    setResult(null);
    
    try {
      const response = await axios.post('/predict/heart-pred', data);
      setResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to analyze heart data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "input-field mt-1 block w-full";
  const labelClass = "block text-sm font-medium text-text-muted mb-1";
  const errorClass = "text-error text-xs mt-1";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/predictors" className="inline-flex items-center text-text-muted hover:text-red-400 transition-colors mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Predictors
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-3 text-red-400 flex items-center">
          <Heart className="mr-3 h-8 w-8" />
          Heart Disease Predictor
        </h1>
        <p className="text-text-muted max-w-2xl">Enter patient clinical parameters to assess cardiovascular disease risk using our ML model.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Personal Info */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
                <User className="h-5 w-5 mr-2 text-red-400" />
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Age <span className="text-red-400">*</span></label>
                  <input type="number" step="1" className={inputClass} placeholder="e.g., 45"
                    {...register("p1", { required: "Age is required", min: 1, max: 120 })} />
                  {errors.p1 && <p className={errorClass}>{errors.p1.message}</p>}
                </div>
                <div>
                  <label className={labelClass}>Biological Sex <span className="text-red-400">*</span></label>
                  <select className={inputClass} {...register("p2", { required: "Sex is required" })}>
                    <option value="">Select Sex...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.p2 && <p className={errorClass}>{errors.p2.message}</p>}
                </div>
              </div>
            </div>

            {/* Clinical Parameters */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
                <FileText className="h-5 w-5 mr-2 text-red-400" />
                Clinical Parameters
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Chest Pain Type (0-3) <span className="text-red-400">*</span></label>
                  <select className={inputClass} {...register("p3", { required: true })}>
                    <option value="">Select Type...</option>
                    <option value="0">0: Typical Angina</option>
                    <option value="1">1: Atypical Angina</option>
                    <option value="2">2: Non-anginal Pain</option>
                    <option value="3">3: Asymptomatic</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Resting Blood Pressure (mm Hg) <span className="text-red-400">*</span></label>
                  <input type="number" className={inputClass} placeholder="e.g., 120"
                    {...register("p4", { required: true })} />
                </div>
                <div>
                  <label className={labelClass}>Serum Cholesterol (mg/dl) <span className="text-red-400">*</span></label>
                  <input type="number" className={inputClass} placeholder="e.g., 200"
                    {...register("p5", { required: true })} />
                </div>
                <div>
                  <label className={labelClass}>Fasting Blood Sugar &gt; 120 mg/dl <span className="text-red-400">*</span></label>
                  <select className={inputClass} {...register("p6", { required: true })}>
                    <option value="">Select...</option>
                    <option value="Yes">Yes (True)</option>
                    <option value="No">No (False)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Cardiac Parameters */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
                <ActivitySquare className="h-5 w-5 mr-2 text-red-400" />
                Cardiac Parameters
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Resting ECG (0-2) <span className="text-red-400">*</span></label>
                  <select className={inputClass} {...register("p7", { required: true })}>
                    <option value="">Select...</option>
                    <option value="0">0: Normal</option>
                    <option value="1">1: ST-T wave abnormality</option>
                    <option value="2">2: Left ventricular hypertrophy</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Max Heart Rate Achieved <span className="text-red-400">*</span></label>
                  <input type="number" className={inputClass} placeholder="e.g., 150"
                    {...register("p8", { required: true })} />
                </div>
                <div>
                  <label className={labelClass}>Exercise Induced Angina (0-1) <span className="text-red-400">*</span></label>
                  <select className={inputClass} {...register("p9", { required: true })}>
                    <option value="">Select...</option>
                    <option value="1">1: Yes</option>
                    <option value="0">0: No</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>ST Depression (Oldpeak) <span className="text-red-400">*</span></label>
                  <input type="number" step="0.1" className={inputClass} placeholder="e.g., 1.5"
                    {...register("p10", { required: true })} />
                </div>
                <div>
                  <label className={labelClass}>Slope of Peak Exercise ST (0-2) <span className="text-red-400">*</span></label>
                  <select className={inputClass} {...register("p11", { required: true })}>
                    <option value="">Select...</option>
                    <option value="0">0: Upsloping</option>
                    <option value="1">1: Flat</option>
                    <option value="2">2: Downsloping</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Number of Major Vessels (0-4) <span className="text-red-400">*</span></label>
                  <input type="number" className={inputClass} placeholder="e.g., 0"
                    {...register("p12", { required: true })} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Thalassemia (0-3) <span className="text-red-400">*</span></label>
                  <select className={inputClass} {...register("p13", { required: true })}>
                    <option value="">Select...</option>
                    <option value="0">0: Normal</option>
                    <option value="1">1: Fixed defect</option>
                    <option value="2">2: Reversable defect</option>
                    <option value="3">3: Unknown</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full md:w-auto px-8 !from-red-500 !to-rose-500 shadow-red-500/20 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <><RefreshCw className="h-5 w-5 animate-spin mr-2" /> Processing...</>
                ) : 'Analyze Heart Risk'}
              </button>
            </div>
            
            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-error/10 border border-error/20 rounded-xl text-error flex items-center">
                <AlertTriangle className="h-5 w-5 mr-3 flex-shrink-0" />
                <p>{error}</p>
              </motion.div>
            )}
          </form>
        </div>

        <div>
          {/* Status Panel */}
          <div className="card p-6 h-full flex flex-col sticky top-24 border-red-400/20">
            <h3 className="text-lg font-semibold mb-6 flex items-center border-b border-white/5 pb-4">
              <Activity className="h-5 w-5 text-red-400 mr-2" />
              Analysis Results
            </h3>

            {result ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col h-full"
              >
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center p-4 rounded-full mb-4 ${
                    result.prediction === '0' 
                      ? 'bg-success/20 text-success' 
                      : 'bg-error/20 text-error'
                  }`}>
                    {result.prediction === '0' ? (
                      <Heart className="h-8 w-8" />
                    ) : (
                      <AlertTriangle className="h-8 w-8" />
                    )}
                  </div>
                  <h4 className="text-xl font-bold mb-2">Prediction Complete</h4>
                  <p className="text-lg text-text-main font-medium p-4 bg-surface-hover rounded-xl border border-white/5">
                    {result.result}
                  </p>
                </div>

                <div className="mt-auto pt-6 border-t border-white/5 space-y-3">
                  <button className="w-full flex items-center justify-center py-3 text-sm font-medium text-text-main hover:text-red-400 transition-colors bg-white/5 hover:bg-white/10 rounded-xl">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF Report
                  </button>
                  <button onClick={() => setResult(null)} className="w-full py-3 text-sm font-medium text-text-muted hover:text-text-main transition-colors">
                    Start New Analysis
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center opacity-50 py-12">
                <FileText className="h-12 w-12 mb-4 text-text-muted" />
                <p className="text-text-muted">Fill out the clinical parameters and submit the form to see risk analysis results here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Medical Disclaimer */}
      <div className="mt-8 text-center text-xs text-text-muted/60 max-w-2xl mx-auto">
        <p>PredictX is an educational and research-oriented machine learning project. Predictions are model outputs and are not a medical diagnosis. Always consult a qualified healthcare professional for medical decisions.</p>
      </div>
    </div>
  );
};

export default HeartPredictor;
