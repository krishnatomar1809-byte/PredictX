import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, ArrowLeft, RefreshCw, FileText, Download, User, Droplet, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface DiabetesFormData {
  pregnancies: number;
  glucose: number;
  bloodPressure: number;
  skinThickness: number;
  insulin: number;
  bmi: number;
  diabetesPedigreeFunction: number;
  age: number;
}

const DiabetesPredictor = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<DiabetesFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ prediction: string, result: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: DiabetesFormData) => {
    setIsSubmitting(true);
    setError(null);
    setResult(null);
    
    try {
      const response = await axios.post('/predict/diabetes-pred', data);
      setResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to analyze data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "input-field mt-1 block w-full";
  const labelClass = "block text-sm font-medium text-text-muted mb-1";
  const errorClass = "text-error text-xs mt-1";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/predictors" className="inline-flex items-center text-text-muted hover:text-blue-400 transition-colors mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Predictors
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-3 text-blue-400 flex items-center">
          <Activity className="mr-3 h-8 w-8" />
          Diabetes Predictor
        </h1>
        <p className="text-text-muted max-w-2xl">Enter patient clinical metrics to predict the likelihood of diabetes using our diagnostic ML model.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Patient Info */}
            <div className="card p-6 border-blue-400/10">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-text-main">
                <User className="h-5 w-5 mr-2 text-blue-400" />
                Patient Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Age (Years) <span className="text-blue-400">*</span></label>
                  <input type="number" step="1" className={inputClass} placeholder="e.g., 35"
                    {...register("age", { required: "Age is required", min: 1, max: 120 })} />
                  {errors.age && <p className={errorClass}>{errors.age.message}</p>}
                </div>
                <div>
                  <label className={labelClass}>Number of Pregnancies <span className="text-blue-400">*</span></label>
                  <input type="number" step="1" className={inputClass} placeholder="e.g., 2"
                    {...register("pregnancies", { required: "Required", min: 0 })} />
                  {errors.pregnancies && <p className={errorClass}>{errors.pregnancies.message}</p>}
                </div>
              </div>
            </div>

            {/* Blood & Metabolic */}
            <div className="card p-6 border-blue-400/10">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-text-main">
                <Droplet className="h-5 w-5 mr-2 text-blue-400" />
                Glucose & Blood Metrics
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Glucose Level (mg/dL) <span className="text-blue-400">*</span></label>
                  <input type="number" step="0.1" className={inputClass} placeholder="e.g., 120"
                    {...register("glucose", { required: true })} />
                </div>
                <div>
                  <label className={labelClass}>Blood Pressure (mm Hg) <span className="text-blue-400">*</span></label>
                  <input type="number" step="0.1" className={inputClass} placeholder="e.g., 70"
                    {...register("bloodPressure", { required: true })} />
                </div>
                <div>
                  <label className={labelClass}>Insulin Level (IU/mL) <span className="text-blue-400">*</span></label>
                  <input type="number" step="0.1" className={inputClass} placeholder="e.g., 79"
                    {...register("insulin", { required: true })} />
                </div>
              </div>
            </div>

            {/* Body Metrics */}
            <div className="card p-6 border-blue-400/10">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-text-main">
                <Flame className="h-5 w-5 mr-2 text-blue-400" />
                Body Metrics & History
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Body Mass Index (BMI) <span className="text-blue-400">*</span></label>
                  <input type="number" step="0.1" className={inputClass} placeholder="e.g., 28.1"
                    {...register("bmi", { required: true })} />
                </div>
                <div>
                  <label className={labelClass}>Skin Thickness (mm) <span className="text-blue-400">*</span></label>
                  <input type="number" step="0.1" className={inputClass} placeholder="e.g., 20"
                    {...register("skinThickness", { required: true })} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Diabetes Pedigree Function <span className="text-blue-400">*</span></label>
                  <input type="number" step="0.001" className={inputClass} placeholder="e.g., 0.627"
                    {...register("diabetesPedigreeFunction", { required: true })} />
                  <p className="text-xs text-text-muted mt-1">A function which scores likelihood of diabetes based on family history.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full md:w-auto px-8 !from-blue-500 !to-indigo-500 shadow-blue-500/20 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <><RefreshCw className="h-5 w-5 animate-spin mr-2" /> Processing...</>
                ) : 'Analyze Diabetes Risk'}
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
          <div className="card p-6 h-full flex flex-col sticky top-24 border-blue-400/20">
            <h3 className="text-lg font-semibold mb-6 flex items-center border-b border-primary/10 pb-4">
              <Activity className="h-5 w-5 text-blue-400 mr-2" />
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
                      <Activity className="h-8 w-8" />
                    ) : (
                      <AlertTriangle className="h-8 w-8" />
                    )}
                  </div>
                  <h4 className="text-xl font-bold mb-2">Prediction Complete</h4>
                  <p className="text-lg text-text-main font-medium p-4 bg-surface-hover rounded-xl border border-primary/10">
                    {result.result}
                  </p>
                </div>

                <div className="mt-auto pt-6 border-t border-primary/10 space-y-3">
                  <button className="w-full flex items-center justify-center py-3 text-sm font-medium text-text-main hover:text-blue-400 transition-colors bg-primary/5 hover:bg-primary/10 rounded-xl">
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

export default DiabetesPredictor;
