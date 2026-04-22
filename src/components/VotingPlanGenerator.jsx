import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Car, CheckSquare, Download, Mail } from 'lucide-react';

const VotingPlanGenerator = () => {
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState({
    method: '',
    time: '',
    transport: '',
  });
  const [isGenerated, setIsGenerated] = useState(false);

  const handleSelect = (key, value) => {
    const newPlan = { ...plan, [key]: value };
    setPlan(newPlan);
    
    if (key === 'method' && value === 'Mail-in Ballot') {
      // Skip time and transport if mail-in
      setIsGenerated(true);
    } else if (step < 3) {
      setStep(step + 1);
    } else {
      setIsGenerated(true);
    }
  };

  const resetPlan = () => {
    setStep(1);
    setPlan({ method: '', time: '', transport: '' });
    setIsGenerated(false);
  };

  return (
    <div className="glass-card" style={{ marginTop: '2rem' }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <CheckSquare className="text-gradient" /> Make Your Voting Plan
      </h3>

      {!isGenerated ? (
        <div>
          {/* Step 1: Method */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h4 style={{ marginBottom: '1rem' }}>1. How will you vote?</h4>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {['In-Person on Election Day', 'Early Voting', 'Mail-in Ballot'].map(method => (
                  <button key={method} className="btn btn-outline" onClick={() => handleSelect('method', method)}>
                    {method}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Time */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h4 style={{ marginBottom: '1rem' }}>2. What time will you go?</h4>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {['Morning (Before Work)', 'Midday (Lunch Break)', 'Evening (After Work)'].map(time => (
                  <button key={time} className="btn btn-outline" onClick={() => handleSelect('time', time)}>
                    {time}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Transport */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h4 style={{ marginBottom: '1rem' }}>3. How will you get there?</h4>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {['Driving', 'Walking/Biking', 'Public Transit', 'Carpool with friend'].map(transport => (
                  <button key={transport} className="btn btn-outline" onClick={() => handleSelect('transport', transport)}>
                    {transport}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
          
          <div style={{ marginTop: '2rem', display: 'flex', gap: '0.5rem' }}>
            <div style={{ height: '4px', flex: 1, background: step >= 1 ? 'var(--primary)' : 'var(--border)', borderRadius: '2px', transition: 'background 0.3s' }} />
            <div style={{ height: '4px', flex: 1, background: step >= 2 ? 'var(--primary)' : 'var(--border)', borderRadius: '2px', transition: 'background 0.3s' }} />
            <div style={{ height: '4px', flex: 1, background: step >= 3 ? 'var(--primary)' : 'var(--border)', borderRadius: '2px', transition: 'background 0.3s' }} />
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="plan-summary" style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px' }}>
          <h4 style={{ color: 'var(--secondary)', marginBottom: '1rem', fontSize: '1.25rem' }}>Your Plan is Set! 🎉</h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem', background: 'var(--bg-color)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Calendar size={20} color="var(--primary)" />
                <span style={{ fontSize: '1.1rem' }}><strong>Method:</strong> {plan.method}</span>
             </div>
             
             {plan.method === 'Mail-in Ballot' ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Mail size={20} color="var(--primary)" />
                  <span style={{ fontSize: '1.1rem' }}><strong>Next Step:</strong> Request ballot by Oct 20th and mail it early!</span>
                </div>
             ) : (
               <>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Clock size={20} color="var(--primary)" />
                    <span style={{ fontSize: '1.1rem' }}><strong>Time:</strong> {plan.time}</span>
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Car size={20} color="var(--primary)" />
                    <span style={{ fontSize: '1.1rem' }}><strong>Transport:</strong> {plan.transport}</span>
                 </div>
               </>
             )}
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
             <button className="btn btn-primary">
               <Download size={18} /> Save Plan to PDF
             </button>
             <button className="btn btn-outline" onClick={resetPlan}>
               Create New Plan
             </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default VotingPlanGenerator;
