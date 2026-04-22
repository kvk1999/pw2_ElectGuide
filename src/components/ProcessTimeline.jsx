import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, FileCheck, CheckCircle, Navigation } from 'lucide-react';

const ProcessTimeline = ({ onStartStep }) => {
  const steps = [
    {
      id: 1,
      title: "Voter Registration",
      date: "Deadline: Oct 15",
      description: "Ensure you are registered to vote at your current address. Check your status online or submit a new application.",
      icon: <UserPlus size={24} />,
      status: "completed"
    },
    {
      id: 2,
      title: "Review Ballot",
      date: "Oct 20 - Nov 4",
      description: "Research candidates and measures on your local ballot. Understand what you are voting for before heading to the polls.",
      icon: <FileCheck size={24} />,
      status: "active"
    },
    {
      id: 3,
      title: "Find Location",
      date: "Anytime",
      description: "Locate your designated polling place or early voting center. Check operating hours and wait times.",
      icon: <Navigation size={24} />,
      status: "pending"
    },
    {
      id: 4,
      title: "Cast Vote",
      date: "Nov 5",
      description: "Head to the polls with your ID (if required). Cast your ballot and make your voice heard in the election.",
      icon: <CheckCircle size={24} />,
      status: "pending"
    }
  ];

  return (
    <div className="timeline-container">
      <div className="timeline-line"></div>
      
      {steps.map((step, index) => (
        <motion.div 
          key={step.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: index * 0.2 }}
          className={`timeline-item ${step.status}`}
        >
          <div className="timeline-icon-wrapper">
            {step.icon}
          </div>
          
          <div className="timeline-content glass-card">
            <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
              <h3 className="text-gradient" style={{ fontSize: '1.25rem' }}>{step.title}</h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{step.date}</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              {step.description}
            </p>
            
            {step.status === 'active' && (
              <button 
                className="btn btn-primary" 
                style={{ marginTop: '1rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                onClick={() => onStartStep(step.title)}
              >
                Start Step
              </button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProcessTimeline;
