import React from 'react';
import { Clock, Users, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const LiveUpdates = () => {
  const updates = [
    {
      id: 1,
      title: "Wait Time Alert",
      message: "Downtown Polling Station is experiencing higher than usual wait times (approx. 45 mins).",
      time: "10 mins ago",
      type: "live"
    },
    {
      id: 2,
      title: "New Resource Available",
      message: "Sample ballots for District 4 have been updated with new municipal propositions.",
      time: "2 hours ago",
      type: "info"
    }
  ];

  return (
    <div className="glass-card" style={{ height: '100%' }}>
      <h3 className="flex-center" style={{ gap: '0.5rem', marginBottom: '1.5rem', justifyContent: 'flex-start' }}>
        <Clock className="text-gradient" size={20} />
        Live Updates
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {updates.map((update, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            key={update.id} 
            style={{ 
              padding: '1rem', 
              background: 'rgba(255,255,255,0.03)', 
              borderRadius: '12px',
              borderLeft: `3px solid ${update.type === 'live' ? '#F87171' : '#60A5FA'}`
            }}
          >
            <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
              <span className={`update-badge badge-${update.type}`}>{update.type === 'live' ? 'Live Alert' : 'Info'}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{update.time}</span>
            </div>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{update.title}</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{update.message}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LiveUpdates;
