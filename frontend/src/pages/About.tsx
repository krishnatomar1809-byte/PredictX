import React from 'react';
import { motion } from 'framer-motion';
import { Server, Cpu, Activity, ArrowDown, Database, ShieldCheck, FileCheck } from 'lucide-react';

const About = () => {
  const pipeline = [
    { id: 1, title: 'User Input', desc: 'Clinical data or medical imagery is securely collected via our React frontend.', icon: Activity },
    { id: 2, title: 'API Gateway', desc: 'The data is transmitted securely to our Node.js backend using REST APIs.', icon: Server },
    { id: 3, title: 'Model Inference', desc: 'Python processes execute predictive ML models (RandomForest, CNNs, SVM).', icon: Cpu },
    { id: 4, title: 'Result Generation', desc: 'The analysis outcome is immediately generated and sent back to the client.', icon: FileCheck },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">How PredictX Works</h1>
        <p className="text-xl text-text-muted">
          Understanding our architecture and machine learning integration for intelligent health predictions.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 mb-24">
        <div>
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <Server className="text-primary mr-3 h-6 w-6" />
            System Architecture
          </h2>
          
          <div className="relative border-l border-primary/20 ml-6 space-y-8 pb-4">
            {pipeline.map((step, idx) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-8"
              >
                <div className="absolute -left-[17px] top-1 h-8 w-8 rounded-full bg-surface border border-primary/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                
                <div className="card p-6 bg-surface">
                  <div className="flex items-center mb-3">
                    <step.icon className="h-5 w-5 text-primary mr-3" />
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed">{step.desc}</p>
                </div>
                
                {idx < pipeline.length - 1 && (
                  <ArrowDown className="absolute -bottom-6 left-[6px] h-4 w-4 text-text-main/20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <Cpu className="text-accent mr-3 h-6 w-6" />
            Technology Stack
          </h2>
          
          <div className="space-y-6">
            <div className="card p-6 border-primary/10">
              <h3 className="font-semibold mb-4 text-text-main">Frontend Architecture</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Lucide Icons'].map(tech => (
                  <span key={tech} className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium border border-primary/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="card p-6 border-primary/10">
              <h3 className="font-semibold mb-4 text-text-main">Backend Services</h3>
              <div className="flex flex-wrap gap-2">
                {['Node.js', 'Express', 'JWT Auth', 'REST APIs', 'Multer'].map(tech => (
                  <span key={tech} className="px-3 py-1 bg-accent/10 text-accent rounded-lg text-sm font-medium border border-accent/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="card p-6 border-primary/10">
              <h3 className="font-semibold mb-4 text-text-main">Machine Learning & Data</h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Scikit-Learn', 'TensorFlow/Keras', 'MongoDB', 'Mongoose'].map(tech => (
                  <span key={tech} className="px-3 py-1 bg-success/10 text-success rounded-lg text-sm font-medium border border-success/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="card p-6 bg-surface-hover border-primary/20 mt-8">
              <h3 className="font-semibold mb-3 flex items-center text-text-main">
                <ShieldCheck className="text-success h-5 w-5 mr-2" />
                Privacy First
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Our infrastructure immediately discards any uploaded medical imagery (such as breast histology or lung CT scans) from the server filesystem immediately after the Python prediction script completes its execution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
