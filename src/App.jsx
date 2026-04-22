import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Vote, ChevronRight } from 'lucide-react';
import ProcessTimeline from './components/ProcessTimeline';
import AssistantWidget from './components/AssistantWidget';
import LiveUpdates from './components/LiveUpdates';
import VotingPlanGenerator from './components/VotingPlanGenerator';
import MapView from './components/MapView';
import ResourcesView from './components/ResourcesView';
import CandidateList from './components/CandidateList';
import AuthModal from './components/AuthModal';

function App() {
  const [currentView, setCurrentView] = useState('process'); // 'process', 'map', 'resources', 'candidates'
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case 'map':
        return <MapView />;
      case 'resources':
        return <ResourcesView />;
      case 'candidates':
        return <CandidateList />;
      default:
        return (
          <>
            <section style={{ textAlign: 'center', padding: '4rem 0 2rem' }}>
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontSize: '3rem', marginBottom: '1rem', maxWidth: '800px', margin: '0 auto 1rem' }}
              >
                Navigate the Election Process with <span className="text-gradient">Confidence</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2rem' }}
              >
                Your interactive guide to understanding deadlines, requirements, and polling details every step of the way.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button 
                  className="btn btn-primary" 
                  style={{ padding: '1rem 2rem', fontSize: '1.1rem' }} 
                  onClick={() => {
                    document.getElementById('process').scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Start Your Journey <ChevronRight size={20} />
                </button>
              </motion.div>
            </section>

            <section id="process">
              <div className="flex-center" style={{ flexDirection: 'column', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem' }}>Your Election Timeline</h2>
                <p style={{ color: 'var(--text-muted)' }}>Follow these steps to ensure your vote is counted.</p>
              </div>
              <ProcessTimeline />
            </section>

            <section className="dashboard-grid">
              <div style={{ gridColumn: 'span 2' }}>
                 <div className="glass-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Polling Locations Preview</h3>
                    <div className="map-container flex-center" onClick={() => setCurrentView('map')} style={{ cursor: 'pointer' }}>
                      <div className="region-dot" style={{ top: '40%', left: '30%' }}></div>
                      <div className="region-dot" style={{ top: '60%', left: '50%', background: '#F87171' }}></div>
                      <div className="region-dot" style={{ top: '30%', left: '70%' }}></div>
                      <div style={{ position: 'absolute', background: 'rgba(15,23,42,0.8)', padding: '0.5rem 1rem', borderRadius: '8px', bottom: '1rem', right: '1rem', fontSize: '0.8rem', border: '1px solid var(--border)' }}>
                        Click to expand map
                      </div>
                      <p style={{ color: 'var(--text-muted)' }}>Interactive map visualization</p>
                    </div>
                 </div>
              </div>
              <div>
                <LiveUpdates />
              </div>
            </section>
            
            <section>
              <VotingPlanGenerator />
            </section>
          </>
        );
    }
  };

  return (
    <>
      <header className="app-header glass">
        <div className="container flex-between">
          <div className="flex-center" style={{ gap: '0.75rem', cursor: 'pointer' }} onClick={() => setCurrentView('process')}>
            <div className="flex-center" style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}>
              <Vote size={24} color="white" />
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }} className="text-gradient">ElectGuide</h1>
          </div>
          
          <nav style={{ display: 'flex', gap: '2rem' }}>
            <button 
              onClick={() => setCurrentView('process')} 
              style={{ background: 'none', border: 'none', color: currentView === 'process' ? 'var(--text-main)' : 'var(--text-muted)', fontWeight: currentView === 'process' ? 600 : 400, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Process
            </button>
            <button 
              onClick={() => setCurrentView('candidates')} 
              style={{ background: 'none', border: 'none', color: currentView === 'candidates' ? 'var(--text-main)' : 'var(--text-muted)', fontWeight: currentView === 'candidates' ? 600 : 400, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Candidates
            </button>
            <button 
              onClick={() => setCurrentView('map')} 
              style={{ background: 'none', border: 'none', color: currentView === 'map' ? 'var(--text-main)' : 'var(--text-muted)', fontWeight: currentView === 'map' ? 600 : 400, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Map
            </button>
            <button 
              onClick={() => setCurrentView('resources')} 
              style={{ background: 'none', border: 'none', color: currentView === 'resources' ? 'var(--text-main)' : 'var(--text-muted)', fontWeight: currentView === 'resources' ? 600 : 400, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Resources
            </button>
          </nav>

          <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }} onClick={() => setIsAuthOpen(true)}>
            Sign In
          </button>
        </div>
      </header>

      <main className="app-main container">
        {renderContent()}
      </main>

      <AssistantWidget />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}

export default App;
