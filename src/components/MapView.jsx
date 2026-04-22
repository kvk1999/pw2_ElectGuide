import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Clock, Search, Info, X, ChevronRight, Map as MapIcon, Compass, Play, Square, CheckCircle } from 'lucide-react';

const MapView = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showDirections, setShowDirections] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const locations = [
    { id: 1, name: "City Hall Central", address: "100 Main St", wait: "15 min", status: "Open", x: "30%", y: "40%", type: "Standard" },
    { id: 2, name: "Public Library North", address: "456 Library Ave", wait: "45 min", status: "Busy", x: "70%", y: "30%", type: "Busy" },
    { id: 3, name: "Community Center East", address: "789 Park Blvd", wait: "5 min", status: "Open", x: "50%", y: "60%", type: "Standard" },
    { id: 4, name: "University Union", address: "123 Campus Dr", wait: "20 min", status: "Open", x: "20%", y: "75%", type: "Standard" }
  ];

  const directions = selectedLocation ? [
    { step: "Head West on Main Street", dist: "0.2 mi" },
    { step: `Turn right toward ${selectedLocation.name}`, dist: "0.5 mi" },
    { step: "Continue straight for 2 minutes", dist: "0.1 mi" },
    { step: "Destination will be on your left", dist: "Arrived" }
  ] : [];

  useEffect(() => {
    let interval;
    if (isNavigating && currentStep < directions.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev + 1);
      }, 3000); // Progress step every 3 seconds
    } else if (currentStep === directions.length - 1) {
      // Finished
    }
    return () => clearInterval(interval);
  }, [isNavigating, currentStep, directions.length]);

  const startNav = () => {
    setShowDirections(false);
    setIsNavigating(true);
    setCurrentStep(0);
  };

  const stopNav = () => {
    setIsNavigating(false);
    setCurrentStep(0);
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Find Your <span className="text-gradient">Polling Place</span></h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Enter your address to find your designated polling location and view real-time wait times.
        </p>
      </div>

      <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem' }}>
        <div style={{ gridColumn: isNavigating ? 'span 12' : 'span 8' }}>
          <div className="glass-card" style={{ height: '600px', position: 'relative', overflow: 'hidden', padding: 0 }}>
            {/* Search Overlay (Hidden during nav) */}
            {!isNavigating && (
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', right: '1rem', zIndex: 10 }}>
                <div style={{ position: 'relative' }}>
                  <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="text" 
                    placeholder="Search by address or zip code..." 
                    style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'rgba(15,23,42,0.8)', color: 'white', outline: 'none', backdropFilter: 'blur(10px)' }}
                  />
                </div>
              </div>
            )}

            {/* Navigation Overlay */}
            <AnimatePresence>
              {isNavigating && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', right: '1.5rem', zIndex: 20, display: 'flex', gap: '1rem' }}
                >
                  <div className="glass-card" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem 2rem', background: 'rgba(15, 23, 42, 0.9)', border: '2px solid var(--primary)' }}>
                    <div style={{ background: 'var(--primary)', padding: '0.75rem', borderRadius: '12px', color: 'white' }}>
                      <Navigation size={24} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ color: 'var(--primary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Next Step</h4>
                      <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>{directions[currentStep].step}</p>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{directions[currentStep].dist} left</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={stopNav} className="btn btn-outline" style={{ borderColor: '#EF4444', color: '#F87171' }}>
                        <Square size={16} /> Stop
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Map Container */}
            <div className="map-container" style={{ height: '100%', border: 'none', backgroundImage: 'url("/map.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
              {!isNavigating && locations.map(loc => (
                <motion.div
                  key={loc.id}
                  className="region-dot"
                  style={{ 
                    top: loc.y, 
                    left: loc.x, 
                    background: loc.type === 'Busy' ? '#F87171' : 'var(--secondary)',
                    width: '16px',
                    height: '16px',
                    border: '3px solid white',
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)'
                  }}
                  whileHover={{ scale: 1.5 }}
                  onClick={() => setSelectedLocation(loc)}
                />
              ))}

              {/* Pulsating User Dot during Navigation */}
              {isNavigating && (
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    boxShadow: ["0 0 0px var(--primary)", "0 0 20px var(--primary)", "0 0 0px var(--primary)"]
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  style={{ 
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    border: '3px solid white',
                    zIndex: 15
                  }}
                />
              )}

              {/* Destination Flag during Navigation */}
              {isNavigating && selectedLocation && (
                <div style={{ position: 'absolute', top: selectedLocation.y, left: selectedLocation.x, zIndex: 15 }}>
                   <div style={{ background: 'var(--secondary)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, marginBottom: '4px', transform: 'translateX(-50%)' }}>
                     {selectedLocation.name}
                   </div>
                   <MapPin size={24} color="var(--secondary)" fill="var(--secondary)" style={{ transform: 'translateX(-50%)' }} />
                </div>
              )}
            </div>
            
            {/* Arrival Modal */}
            <AnimatePresence>
              {isNavigating && currentStep === directions.length - 1 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.8)', zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
                    <CheckCircle size={64} color="var(--secondary)" style={{ marginBottom: '1.5rem' }} />
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>You Have Arrived!</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>You are now at {selectedLocation.name}. Don't forget your ID!</p>
                    <button className="btn btn-primary" onClick={stopNav}>Return to Map</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {!isNavigating && (
          <div style={{ gridColumn: 'span 4' }}>
            <div className="glass-card" style={{ height: '100%', overflowY: 'auto' }}>
              <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Nearby Locations</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {selectedLocation ? (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }} 
                    animate={{ opacity: 1, x: 0 }}
                    style={{ padding: '1.5rem', background: 'rgba(79, 70, 229, 0.1)', borderRadius: '12px', border: '1px solid var(--primary)' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <h4 style={{ color: 'var(--primary)' }}>Selected</h4>
                      <button onClick={() => setSelectedLocation(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>Close</button>
                    </div>
                    <h3 style={{ marginBottom: '0.5rem' }}>{selectedLocation.name}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{selectedLocation.address}</p>
                    
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                        <Clock size={16} /> {selectedLocation.wait} wait
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                        <Info size={16} /> {selectedLocation.status}
                      </div>
                    </div>
                    
                    <button 
                      className="btn btn-primary" 
                      style={{ width: '100%', justifyContent: 'center' }}
                      onClick={() => setShowDirections(true)}
                    >
                      <Navigation size={18} /> Get Directions
                    </button>
                  </motion.div>
                ) : (
                  locations.map(loc => (
                    <div 
                      key={loc.id} 
                      style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border)', cursor: 'pointer' }}
                      onClick={() => setSelectedLocation(loc)}
                    >
                      <div className="flex-between" style={{ marginBottom: '0.25rem' }}>
                        <h4 style={{ fontSize: '1rem' }}>{loc.name}</h4>
                        <span style={{ fontSize: '0.75rem', color: loc.type === 'Busy' ? '#F87171' : 'var(--secondary)' }}>{loc.wait}</span>
                      </div>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{loc.address}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Directions Modal */}
      <AnimatePresence>
        {showDirections && selectedLocation && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
            onClick={() => setShowDirections(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card"
              style={{ width: '100%', maxWidth: '450px', position: 'relative' }}
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowDirections(false)}
                style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '0.75rem', background: 'var(--primary-light)', borderRadius: '12px', color: 'var(--primary)' }}>
                  <Compass size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem' }}>Directions</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>To {selectedLocation.name}</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {directions.map((dir, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg-color)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', flexShrink: 0 }}>
                      {i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{dir.step}</p>
                      <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>{dir.dist}</span>
                    </div>
                    {i < 3 && <ChevronRight size={18} style={{ alignSelf: 'center', opacity: 0.3 }} />}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  className="btn btn-primary" 
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={startNav}
                >
                  <Play size={18} /> Start Navigation
                </button>
                <button className="btn btn-outline" style={{ padding: '0.75rem' }} onClick={() => setShowDirections(false)}>
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapView;
