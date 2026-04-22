import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ExternalLink, HelpCircle, Download, X, Eye, Share2, Check } from 'lucide-react';

const ResourcesView = () => {
  const [selectedResource, setSelectedResource] = useState(null);
  const [notification, setNotification] = useState(null);

  const resources = [
    {
      id: 1,
      title: "Voter ID Requirements",
      desc: "A comprehensive guide on what identification you need to bring to the polls in your specific state.",
      icon: <FileText size={24} color="var(--primary)" />,
      type: "Guide",
      content: "Depending on your state, you may need a photo ID (like a Driver's License) or a non-photo ID (like a utility bill). This guide covers all 50 states and their specific requirements for 2026."
    },
    {
      id: 2,
      title: "Sample Ballot Download",
      desc: "Preview your local ballot before election day so you can research candidates and measures.",
      icon: <Download size={24} color="var(--secondary)" />,
      type: "PDF",
      content: "The sample ballot is a digital representation of what you will see at the polling station. Use this to prepare your decisions in advance."
    },
    {
      id: 3,
      title: "Know Your Rights",
      desc: "Information on your rights as a voter, including accessibility requirements and dealing with intimidation.",
      icon: <HelpCircle size={24} color="var(--accent)" />,
      type: "FAQ",
      content: "Every voter has the right to cast a private ballot, the right to assistance if needed, and the right to vote free from intimidation. If you face issues, call our hotline."
    },
    {
      id: 4,
      title: "Track Your Ballot",
      desc: "If you voted by mail, use this official portal to ensure your ballot was received and counted.",
      icon: <ExternalLink size={24} color="#F472B6" />,
      type: "External",
      content: "This portal connects you to the official state election board tracking system. Enter your registration details to see your ballot status."
    }
  ];

  const handleDownload = (title) => {
    setNotification(`Downloading ${title}...`);
    setTimeout(() => {
      setNotification(`Success! ${title} saved to downloads.`);
      setTimeout(() => setNotification(null), 3000);
    }, 1500);
  };

  const handleShare = (title) => {
    setNotification("Link copied to clipboard!");
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Voter <span className="text-gradient">Resources</span></h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Everything you need to be an informed and prepared voter. Click any resource to view details.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {resources.map((res, i) => (
          <motion.div 
            key={res.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card"
            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                {res.icon}
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.75rem', background: 'var(--bg-color)', borderRadius: '999px', border: '1px solid var(--border)' }}>
                {res.type}
              </span>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{res.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>
              {res.desc}
            </p>
            <button 
              className="btn btn-outline" 
              style={{ width: '100%', justifyContent: 'center', padding: '0.5rem' }}
              onClick={() => setSelectedResource(res)}
            >
              Access Resource
            </button>
          </motion.div>
        ))}
      </div>

      {/* Resource Viewer Modal */}
      <AnimatePresence>
        {selectedResource && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
            onClick={() => setSelectedResource(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card"
              style={{ width: '100%', maxWidth: '500px', position: 'relative' }}
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedResource(null)}
                style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                  {selectedResource.icon}
                </div>
                <h3 style={{ fontSize: '1.5rem' }}>{selectedResource.title}</h3>
              </div>

              <div style={{ background: 'var(--bg-color)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '1.5rem' }}>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  {selectedResource.content}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  className="btn btn-primary" 
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => handleDownload(selectedResource.title)}
                >
                  <Download size={18} /> Download Full {selectedResource.type}
                </button>
                <button 
                  className="btn btn-outline" 
                  style={{ padding: '0.75rem' }}
                  onClick={() => handleShare(selectedResource.title)}
                >
                  <Share2 size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            style={{ position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', background: 'var(--secondary)', color: 'white', padding: '1rem 2rem', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', gap: '0.75rem' }}
          >
            <Check size={20} /> {notification}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResourcesView;
