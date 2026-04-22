import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, User, Shield, Info, ExternalLink, X, FileText, Award, Calendar } from 'lucide-react';

const CandidateList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConstituency, setSelectedConstituency] = useState('Central District');
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const constituencies = ['Central District', 'North County', 'West Side', 'East Bay'];

  const parties = [
    { name: "Progressive Party", symbol: "🌱", color: "#10B981" },
    { name: "Traditional Party", symbol: "🏛️", color: "#3B82F6" },
    { name: "Innovation Alliance", symbol: "🚀", color: "#F59E0B" },
    { name: "Unity Group", symbol: "🤝", color: "#EF4444" },
    { name: "Green Future", symbol: "🍀", color: "#059669" },
    { name: "Liberty Front", symbol: "🔔", color: "#7C3AED" }
  ];

  const firstNames = ["James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];

  // Generate 40 mock candidates
  const generateCandidates = () => {
    const list = [];
    for (let i = 1; i <= 40; i++) {
      const party = parties[i % parties.length];
      const constituency = constituencies[i % constituencies.length];
      const firstName = firstNames[i % firstNames.length];
      const lastName = lastNames[i % lastNames.length];
      
      list.push({
        id: i,
        name: `${firstName} ${lastName}`,
        party: party.name,
        symbol: party.symbol,
        symbolColor: party.color,
        constituency: constituency,
        bio: `${firstName} has dedicated over ${10 + (i % 15)} years to public service, specializing in ${i % 2 === 0 ? 'economic development' : 'environmental protection'}.`,
        platform: [
          i % 2 === 0 ? "Lower Taxes" : "Clean Energy",
          i % 3 === 0 ? "Better Schools" : "Better Healthcare",
          i % 5 === 0 ? "Public Safety" : "Job Creation"
        ],
        experience: `${10 + (i % 10)} Years`,
        education: "Masters in Public Policy",
        achievements: ["Community Leader Award", "Economic Reform Lead"]
      });
    }
    return list;
  };

  const allCandidates = generateCandidates();

  const filteredCandidates = allCandidates.filter(c => 
    c.constituency === selectedConstituency && 
    (c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.party.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Know Your <span className="text-gradient">Candidates</span></h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Showing {allCandidates.length} candidates across {constituencies.length} constituencies. Select your district to meet your representatives.
        </p>
      </div>

      <div className="glass-card" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
          <MapPin size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <select 
            value={selectedConstituency}
            onChange={(e) => setSelectedConstituency(e.target.value)}
            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'rgba(15,23,42,0.8)', color: 'white', outline: 'none', appearance: 'none', fontFamily: 'inherit' }}
          >
            {constituencies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        
        <div style={{ flex: 2, minWidth: '250px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search by name or party..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'rgba(15,23,42,0.8)', color: 'white', outline: 'none', fontFamily: 'inherit' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        <AnimatePresence mode="popLayout">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map((c, i) => (
              <motion.div 
                key={c.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: (i % 10) * 0.05 }}
                className="glass-card"
                style={{ position: 'relative', overflow: 'hidden' }}
              >
                <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '5rem', opacity: 0.05, transform: 'rotate(15deg)' }}>
                  {c.symbol}
                </div>

                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '70px', height: '70px', borderRadius: '14px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', border: `2px solid ${c.symbolColor}`, flexShrink: 0 }}>
                    {c.symbol}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '0.25rem' }}>{c.name}</h3>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: c.symbolColor }}>{c.party}</span>
                  </div>
                </div>

                <div style={{ marginTop: '1.25rem' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {c.bio}
                  </p>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                    {c.platform.map(p => (
                      <span key={p} style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '999px', border: '1px solid var(--border)' }}>
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', fontSize: '0.85rem', padding: '0.6rem', justifyContent: 'center' }}
                  onClick={() => setSelectedCandidate(c)}
                >
                  View Full Profile
                </button>
              </motion.div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
              <User size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
              <p>No candidates found for this selection.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Full Profile Modal */}
      <AnimatePresence>
        {selectedCandidate && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}
            onClick={() => setSelectedCandidate(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card"
              style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedCandidate(null)}
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', zIndex: 10 }}
              >
                <X size={24} />
              </button>

              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '2.5rem' }}>
                <div style={{ width: '120px', height: '120px', borderRadius: '24px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', border: `4px solid ${selectedCandidate.symbolColor}`, flexShrink: 0 }}>
                  {selectedCandidate.symbol}
                </div>
                <div>
                  <h2 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>{selectedCandidate.name}</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 600, color: selectedCandidate.symbolColor }}>{selectedCandidate.party}</span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>• {selectedCandidate.constituency}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div className="glass" style={{ padding: '1rem', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                    <Calendar size={18} />
                    <span style={{ fontWeight: 600 }}>Experience</span>
                  </div>
                  <p style={{ fontSize: '1.1rem' }}>{selectedCandidate.experience}</p>
                </div>
                <div className="glass" style={{ padding: '1rem', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                    <FileText size={18} />
                    <span style={{ fontWeight: 600 }}>Education</span>
                  </div>
                  <p style={{ fontSize: '1.1rem' }}>{selectedCandidate.education}</p>
                </div>
              </div>

              <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Info size={20} className="text-gradient" /> About the Candidate
                </h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '1.05rem' }}>
                  {selectedCandidate.bio}
                </p>
              </div>

              <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Shield size={20} className="text-gradient" /> Political Platform
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {selectedCandidate.platform.map((p, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: selectedCandidate.symbolColor }}></div>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Award size={20} className="text-gradient" /> Achievements
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {selectedCandidate.achievements.map((a, idx) => (
                    <span key={idx} style={{ padding: '0.5rem 1rem', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '999px', fontSize: '0.9rem', fontWeight: 600 }}>
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CandidateList;
