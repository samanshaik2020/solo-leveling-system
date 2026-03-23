export const playSystemSound = (type: 'alert' | 'levelup' | 'click' | 'arise' = 'click') => {
  // Speech synthesis for "Arise"
  if (type === 'arise') {
    const utterance = new SpeechSynthesisUtterance("Arise");
    utterance.pitch = 0.1; // Deep voice
    utterance.rate = 0.7;  // Slow and powerful
    utterance.volume = 1.0;
    
    // Try to find a deep male voice
    const voices = window.speechSynthesis.getVoices();
    const googleVoice = voices.find(v => v.name.includes('Google UK English Male') || v.name.includes('Male'));
    if (googleVoice) utterance.voice = googleVoice;
    
    window.speechSynthesis.speak(utterance);
    
    // Add a cinematic bass drop effect
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(100, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 1.5);
    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1.5);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 1.5);
    return;
  }

  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  if (type === 'levelup') {
    // Cinematic level up sound (ascending tones)
    const now = audioCtx.currentTime;
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(220, now);
    oscillator.frequency.exponentialRampToValueAtTime(880, now + 0.8);
    
    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
    
    oscillator.start();
    oscillator.stop(now + 0.8);

    // Add a second harmonic
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(440, now);
    osc2.frequency.exponentialRampToValueAtTime(1760, now + 0.8);
    gain2.gain.setValueAtTime(0.05, now);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
    osc2.start();
    osc2.stop(now + 0.8);
  } else if (type === 'alert') {
    // Movie-like cinematic alert sound (two-tone deep pulse)
    const now = audioCtx.currentTime;
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(120, now);
    oscillator.frequency.exponentialRampToValueAtTime(80, now + 0.5);
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.2, now + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    
    oscillator.start();
    oscillator.stop(now + 0.5);

    // Add a high-frequency "ping" for clarity
    const ping = audioCtx.createOscillator();
    const pingGain = audioCtx.createGain();
    ping.connect(pingGain);
    pingGain.connect(audioCtx.destination);
    ping.type = 'sine';
    ping.frequency.setValueAtTime(1200, now);
    ping.frequency.exponentialRampToValueAtTime(800, now + 0.2);
    pingGain.gain.setValueAtTime(0.05, now);
    pingGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    ping.start();
    ping.stop(now + 0.2);
  } else {
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
  }
};
