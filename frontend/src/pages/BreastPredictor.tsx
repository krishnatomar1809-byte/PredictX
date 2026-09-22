import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, FileImage, ShieldAlert, ArrowLeft, RefreshCw, Download, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BreastPredictor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<{ prediction: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      setError('Please upload an image file (JPEG, PNG).');
      return;
    }
    setError(null);
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setResult(null);
  };

  const removeFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('/predict/breast-pred', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Failed to analyze the image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <Link to="/predictors" className="inline-flex items-center text-text-muted hover:text-primary transition-colors mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Predictors
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-3">Breast Cancer Classifier</h1>
        <p className="text-text-muted">Upload a histology image to analyze for potential malignant or benign characteristics.</p>
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          <div className="card p-1">
            {!previewUrl ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-[1.25rem] p-12 text-center transition-all ${
                  isDragging ? 'border-primary bg-primary/5' : 'border-primary/20 hover:border-primary/30 hover:bg-primary/5'
                }`}
              >
                <div className="h-20 w-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-primary/10">
                  <Upload className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload Histology Image</h3>
                <p className="text-text-muted text-sm mb-6">Drag and drop your image here, or click to browse</p>
                
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept="image/jpeg, image/png, image/jpg"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="file-upload"
                  className="btn-primary cursor-pointer inline-block"
                >
                  Select File
                </label>
              </div>
            ) : (
              <div className="p-6">
                <div className="relative rounded-xl overflow-hidden bg-black/50 border border-primary/20 mb-6 flex justify-center items-center h-[300px]">
                  <img src={previewUrl} alt="Preview" className="max-h-full max-w-full object-contain" />
                  {!isUploading && !result && (
                    <button
                      onClick={removeFile}
                      className="absolute top-4 right-4 h-8 w-8 bg-black/50 hover:bg-error rounded-full flex items-center justify-center text-text-main transition-colors backdrop-blur-sm"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {!result ? (
                  <button
                    onClick={handleSubmit}
                    disabled={isUploading}
                    className="btn-primary w-full flex items-center justify-center py-4"
                  >
                    {isUploading ? (
                      <>
                        <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                        Analyzing Scan...
                      </>
                    ) : (
                      'Analyze Image'
                    )}
                  </button>
                ) : (
                  <button
                    onClick={removeFile}
                    className="w-full py-4 rounded-full border border-primary/20 hover:bg-primary/5 transition-colors font-medium flex items-center justify-center"
                  >
                    <FileImage className="h-5 w-5 mr-2" />
                    Upload New Image
                  </button>
                )}
              </div>
            )}
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-error/10 border border-error/20 rounded-xl text-error flex items-start">
              <ShieldAlert className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </motion.div>
          )}
        </div>

        <div className="md:col-span-2">
          {/* Status Panel */}
          <div className="card p-6 h-full flex flex-col">
            <h3 className="text-lg font-semibold mb-6 flex items-center border-b border-primary/10 pb-4">
              <Activity className="h-5 w-5 text-primary mr-2" />
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
                    result.prediction.toLowerCase().includes('not') || result.prediction.toLowerCase().includes('benign') 
                      ? 'bg-success/20 text-success' 
                      : 'bg-error/20 text-error'
                  }`}>
                    {result.prediction.toLowerCase().includes('not') || result.prediction.toLowerCase().includes('benign') ? (
                      <ShieldAlert className="h-8 w-8" />
                    ) : (
                      <Activity className="h-8 w-8" />
                    )}
                  </div>
                  <h4 className="text-xl font-bold mb-2">Prediction Complete</h4>
                  <p className="text-lg text-text-main font-medium p-4 bg-surface-hover rounded-xl border border-primary/10">
                    {result.prediction}
                  </p>
                </div>

                <div className="mt-auto pt-6 border-t border-primary/10">
                  <button className="w-full flex items-center justify-center py-3 text-sm font-medium text-text-main hover:text-primary transition-colors bg-primary/5 hover:bg-primary/10 rounded-xl">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF Report
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center opacity-50 py-12">
                <FileImage className="h-12 w-12 mb-4 text-text-muted" />
                <p className="text-text-muted">Upload an image and run analysis to see results here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Medical Disclaimer */}
      <div className="mt-8 text-center text-xs text-text-muted/60 max-w-2xl mx-auto">
        <p>This tool is for educational and research purposes only. The model prediction should not replace professional medical advice, diagnosis, or treatment.</p>
      </div>
    </div>
  );
};

export default BreastPredictor;
