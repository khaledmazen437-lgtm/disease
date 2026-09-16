import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { AUDIO_REGISTRY } from '../config/audioRegistry';

const SensoryContext = createContext();

// Shared Audio Context across session
let globalAudioCtx = null;

const getAudioContext = () => {
  if (!globalAudioCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      globalAudioCtx = new AudioCtx();
    }
  }
  if (globalAudioCtx && globalAudioCtx.state === 'suspended') {
    globalAudioCtx.resume().catch(() => {});
  }
  return globalAudioCtx;
};

export const SensoryProvider = ({ children }) => {
  const [calmMode, setCalmMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [fontSizeScale, setFontSizeScale] = useState('normal');
  const [activeRole, setActiveRole] = useState('child');
  
  const [childStars, setChildStars] = useState(12);
  const [completedActivities, setCompletedActivities] = useState(['emotion-1', 'sensory-1']);

  const voicesRef = useRef([]);
  const activeAudioRef = useRef(null);
  const activeUtteranceRef = useRef(null);
  const speakingTimerRef = useRef(null);

  // Preload browser TTS voices
  const loadVoices = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices && availableVoices.length > 0) {
        voicesRef.current = availableVoices;
      }
    }
  };

  useEffect(() => {
    loadVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    const unlockAudio = () => {
      const ctx = getAudioContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      if (typeof window !== 'undefined' && window.speechSynthesis && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    };

    window.addEventListener('click', unlockAudio, { passive: true });
    window.addEventListener('touchstart', unlockAudio, { passive: true });
    window.addEventListener('keydown', unlockAudio, { passive: true });

    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, []);

  // Activity success / interaction tone
  const playCalmTone = (type = 'success') => {
    if (!soundEnabled) return;
    playCustomSound('pop');
  };

  // REAL AUDIO PLAYBACK FROM REGISTERED PUBLIC-DOMAIN/CC ASSETS
  const playCustomSound = (soundType = 'laugh') => {
    if (!soundEnabled) return;

    let soundAsset = AUDIO_REGISTRY[soundType];
    if (!soundAsset) {
      const matchingKey = Object.keys(AUDIO_REGISTRY).find(
        (k) => k.startsWith(soundType) || soundType.startsWith(k)
      );
      if (matchingKey) {
        soundAsset = AUDIO_REGISTRY[matchingKey];
      }
    }

    const soundUrl = soundAsset ? soundAsset.url : null;

    if (soundUrl) {
      try {
        const audio = new Audio(soundUrl);
        audio.volume = (soundAsset && soundAsset.volume) ? soundAsset.volume : 0.85;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            playCustomSoundSynthFallback(soundType);
          });
          return;
        }
      } catch (e) {
        console.warn('MP3 playback failed, executing fallback', e);
      }
    }

    playCustomSoundSynthFallback(soundType);
  };

  const playCustomSoundSynthFallback = (soundType) => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      if (ctx.state === 'suspended') {
        ctx.resume().then(() => playCustomSoundInternal(ctx, soundType)).catch(() => {});
      } else {
        playCustomSoundInternal(ctx, soundType);
      }
    } catch (e) {
      console.warn('Custom sound synthesis error', e);
    }
  };

  const playCustomSoundInternal = (ctx, type) => {
    const now = ctx.currentTime;
    if (type.includes('wrong') || type.includes('error')) {
      // Gentle, child-friendly descending warm tone for incorrect attempt (Autism-friendly)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(360, now);
      osc1.frequency.exponentialRampToValueAtTime(240, now + 0.28);
      osc2.frequency.setValueAtTime(270, now);
      osc2.frequency.exponentialRampToValueAtTime(180, now + 0.28);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.32);
      osc2.stop(now + 0.32);
    } else if (type.includes('chime') || type.includes('guide_intro')) {
      // Warm welcoming guide chime
      const freqs = [523.25, 659.25, 783.99];
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.08);
        gain.gain.setValueAtTime(0.25, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.22);
      });
    } else if (type.includes('bakh') || type.includes('laugh') || type.includes('surprise')) {
      const freqs = [659.25, 783.99, 1046.5, 1318.5];
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + i * 0.07);
        gain.gain.setValueAtTime(0.5, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.14);
      });
    } else {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.2);
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.24);
    }
  };

  // REALISTIC ACOUSTIC ANIMAL SOUND SYNTHESIZER (Web Audio API)
  const playSynthesizedAnimalSound = (animalKey) => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const playAnimalInternal = () => {
        const now = ctx.currentTime;
        const key = String(animalKey).toLowerCase();

        if (key.includes('cat') || key === '1' || key.includes('قطة')) {
          // Cat Meow: Glide 680Hz -> 480Hz -> 640Hz
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(650, now);
          osc.frequency.exponentialRampToValueAtTime(450, now + 0.25);
          osc.frequency.exponentialRampToValueAtTime(620, now + 0.55);
          gain.gain.setValueAtTime(0.01, now);
          gain.gain.linearRampToValueAtTime(0.4, now + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.62);
        } else if (key.includes('dog') || key === '2' || key.includes('كلب')) {
          // Dog Bark: Dual woof impulse
          [0, 0.25].forEach((delay) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(380, now + delay);
            osc.frequency.exponentialRampToValueAtTime(120, now + delay + 0.15);
            gain.gain.setValueAtTime(0.5, now + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.16);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + delay);
            osc.stop(now + delay + 0.18);
          });
        } else if (key.includes('chick') || key === '3' || key.includes('كتكوت')) {
          // Chick peep: 3 high chirps
          [0, 0.18, 0.36].forEach((delay) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(2400, now + delay);
            osc.frequency.exponentialRampToValueAtTime(3100, now + delay + 0.08);
            gain.gain.setValueAtTime(0.35, now + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.1);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + delay);
            osc.stop(now + delay + 0.11);
          });
        } else if (key.includes('cow') || key === '4' || key.includes('بقرة')) {
          // Cow Moo: Low resonant oscillator
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();
          osc1.type = 'triangle';
          osc2.type = 'sawtooth';
          osc1.frequency.setValueAtTime(145, now);
          osc1.frequency.linearRampToValueAtTime(130, now + 0.7);
          osc2.frequency.setValueAtTime(146, now);
          osc2.frequency.linearRampToValueAtTime(131, now + 0.7);
          gain.gain.setValueAtTime(0.01, now);
          gain.gain.linearRampToValueAtTime(0.45, now + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(ctx.destination);
          osc1.start(now);
          osc2.start(now);
          osc1.stop(now + 0.78);
          osc2.stop(now + 0.78);
        } else if (key.includes('sheep') || key === '5' || key.includes('خروف')) {
          // Sheep bleat: 210Hz + LFO tremolo
          const osc = ctx.createOscillator();
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          const mainGain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(220, now);
          lfo.frequency.setValueAtTime(13, now);
          lfoGain.gain.setValueAtTime(0.25, now);
          lfo.connect(mainGain.gain);
          mainGain.gain.setValueAtTime(0.3, now);
          mainGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
          osc.connect(mainGain);
          mainGain.connect(ctx.destination);
          lfo.start(now);
          osc.start(now);
          lfo.stop(now + 0.65);
          osc.stop(now + 0.68);
        } else if (key.includes('lion') || key === '6' || key.includes('أسد')) {
          // Lion Roar: Low noise + sub bass sweep
          const bufferSize = Math.floor(ctx.sampleRate * 0.8);
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
          }
          const noise = ctx.createBufferSource();
          noise.buffer = buffer;
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(300, now);
          filter.frequency.linearRampToValueAtTime(600, now + 0.3);
          filter.frequency.linearRampToValueAtTime(200, now + 0.8);
          const noiseGain = ctx.createGain();
          noiseGain.gain.setValueAtTime(0.6, now);
          noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
          noise.connect(filter);
          filter.connect(noiseGain);
          noiseGain.connect(ctx.destination);
          noise.start(now);
          noise.stop(now + 0.82);
        } else if (key.includes('duck') || key === '7' || key.includes('بطة')) {
          // Duck Quack: Filtered sawtooth drop
          [0, 0.22].forEach((delay) => {
            const osc = ctx.createOscillator();
            const filter = ctx.createBiquadFilter();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(420, now + delay);
            osc.frequency.exponentialRampToValueAtTime(220, now + delay + 0.16);
            filter.type = 'bandpass';
            filter.frequency.value = 850;
            filter.Q.value = 3;
            gain.gain.setValueAtTime(0.55, now + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.18);
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + delay);
            osc.stop(now + delay + 0.2);
          });
        } else if (key.includes('frog') || key === '8' || key.includes('ضفدع')) {
          // Frog Ribbit: Low dual pulse
          [0, 0.2].forEach((delay) => {
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gain = ctx.createGain();
            osc1.type = 'square';
            osc2.type = 'sawtooth';
            osc1.frequency.setValueAtTime(160, now + delay);
            osc2.frequency.setValueAtTime(240, now + delay);
            gain.gain.setValueAtTime(0.4, now + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.14);
            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(ctx.destination);
            osc1.start(now + delay);
            osc2.start(now + delay);
            osc1.stop(now + delay + 0.15);
            osc2.stop(now + delay + 0.15);
          });
        } else if (key.includes('bird') || key === '9' || key.includes('عصفور')) {
          // Bird Chirp: High FM modulation
          [0, 0.12, 0.26].forEach((delay) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(2200, now + delay);
            osc.frequency.exponentialRampToValueAtTime(3600, now + delay + 0.07);
            osc.frequency.exponentialRampToValueAtTime(2400, now + delay + 0.1);
            gain.gain.setValueAtTime(0.35, now + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.11);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + delay);
            osc.stop(now + delay + 0.12);
          });
        } else if (key.includes('horse') || key === '10' || key.includes('حصان')) {
          // Horse Whinny: Pitch vibrato glide
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(800, now);
          osc.frequency.exponentialRampToValueAtTime(1250, now + 0.2);
          osc.frequency.exponentialRampToValueAtTime(600, now + 0.5);
          gain.gain.setValueAtTime(0.01, now);
          gain.gain.linearRampToValueAtTime(0.35, now + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.58);
        } else if (key.includes('elephant') || key === '11' || key.includes('فيل')) {
          // Elephant Trumpet: Low-to-high resonant sweep
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(220, now);
          osc.frequency.exponentialRampToValueAtTime(580, now + 0.4);
          gain.gain.setValueAtTime(0.01, now);
          gain.gain.linearRampToValueAtTime(0.45, now + 0.15);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.62);
        } else {
          // Rooster / Default: Cock-a-doodle-do
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(450, now);
          osc.frequency.exponentialRampToValueAtTime(850, now + 0.25);
          osc.frequency.exponentialRampToValueAtTime(650, now + 0.55);
          gain.gain.setValueAtTime(0.01, now);
          gain.gain.linearRampToValueAtTime(0.4, now + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.62);
        }
      };

      if (ctx.state === 'suspended') {
        ctx.resume().then(playAnimalInternal).catch(() => {});
      } else {
        playAnimalInternal();
      }
    } catch (err) {
      console.warn('Animal sound synthesis error', err);
    }
  };

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSpeakingText, setCurrentSpeakingText] = useState('');

  // Stop any ongoing spoken audio or TTS speech
  const stopSpeech = () => {
    if (activeAudioRef.current) {
      try {
        activeAudioRef.current.pause();
        activeAudioRef.current.currentTime = 0;
      } catch (_) {}
      activeAudioRef.current = null;
    }
    if (speakingTimerRef.current) {
      clearTimeout(speakingTimerRef.current);
      speakingTimerRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
          window.speechSynthesis.cancel();
        }
      } catch (_) {}
    }
    window.__activeUtterance = null;
    setIsSpeaking(false);
    setCurrentSpeakingText('');
  };

  // Arabic Web Speech & Multi-Tier Audio Player Helper
  // Note: isCelebration = true is strictly reserved for MISSION COMPLETION (شاطر شاطر يا بطل)
  const speakArabic = (text, { isCelebration = false, onEnd = null } = {}) => {
    if (!soundEnabled || !text) return;

    // Stop ongoing audio cleanly
    stopSpeech();

    const cleanText = text
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/[🔊🎙️⏹️🎯💡🚗🎮⭕🫧⭐🤪🐇🐱🐶🐥🐦🚂⏰🔔]/g, '')
      .trim();

    if (!cleanText) return;

    setIsSpeaking(true);
    setCurrentSpeakingText(cleanText);

    const handleSpeechEnd = () => {
      if (speakingTimerRef.current) {
        clearTimeout(speakingTimerRef.current);
        speakingTimerRef.current = null;
      }
      setIsSpeaking(false);
      setCurrentSpeakingText('');
      window.__activeUtterance = null;
      if (typeof onEnd === 'function') onEnd();
    };

    // 1. High-Fidelity Praise Audio ONLY when explicitly celebrating mission completion
    if (isCelebration) {
      let matchedAudioUrl = '/audio/shater_hero.mp3';
      if (cleanText.includes('عبقري')) {
        matchedAudioUrl = '/audio/shater_abqari.mp3';
      } else if (cleanText.includes('أحسنت يا بطل') && !cleanText.includes('شاطر')) {
        matchedAudioUrl = '/audio/ahsant_hero.mp3';
      }

      try {
        const audio = new Audio(matchedAudioUrl);
        audio.volume = 0.95;
        activeAudioRef.current = audio;
        audio.onended = handleSpeechEnd;
        audio.onerror = () => {
          activeAudioRef.current = null;
          playWebSpeechOrSynth();
        };
        const p = audio.play();
        if (p) {
          p.catch(() => {
            activeAudioRef.current = null;
            playWebSpeechOrSynth();
          });
        }
        return;
      } catch (err) {
        console.warn('Celebration audio error', err);
      }
    }

    // 2. Play subtle warm welcoming guide chime immediately via Web Audio API
    playCustomSoundSynthFallback('guide_intro');

    // Acoustic warm voice pulse synthesizer if offline or browser blocked
    const playAcousticVoicePulses = (wordsCount) => {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        const totalWords = Math.min(wordsCount || 8, 20);
        for (let i = 0; i < totalWords; i++) {
          const startTime = now + i * 0.35 + (Math.random() * 0.05);
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const baseFreq = 320 + (i % 3 === 0 ? 60 : i % 2 === 0 ? 30 : 0) + (Math.random() * 20 - 10);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(baseFreq, startTime);
          osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, startTime + 0.22);
          
          gain.gain.setValueAtTime(0.2, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(startTime);
          osc.stop(startTime + 0.26);
        }
      } catch (_) {}
    };

    // Fallback: Web Speech API or Acoustic Voice Pulses
    const playWebSpeechOrSynth = () => {
      const words = cleanText.split(/\s+/);
      const estimatedDurationMs = Math.min(22000, Math.max(3500, words.length * 420));

      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }

          const allVoices = (window.speechSynthesis.getVoices && window.speechSynthesis.getVoices().length > 0)
            ? window.speechSynthesis.getVoices()
            : voicesRef.current || [];

          const arabicVoice = allVoices.find((v) => {
            const lang = (v.lang || '').toLowerCase();
            const name = (v.name || '').toLowerCase();
            return (
              lang.startsWith('ar') ||
              lang.includes('arabic') ||
              name.includes('arabic') ||
              name.includes('عربي') ||
              name.includes('salma') ||
              name.includes('shakir') ||
              name.includes('hoda') ||
              name.includes('naayf') ||
              name.includes('zayd') ||
              name.includes('laila') ||
              name.includes('tarik') ||
              name.includes('maged') ||
              name.includes('mariam') ||
              name.includes('bilal') ||
              name.includes('zeina')
            );
          });

          const utterance = new SpeechSynthesisUtterance(cleanText);
          if (arabicVoice) {
            utterance.voice = arabicVoice;
            utterance.lang = arabicVoice.lang || 'ar-SA';
          } else {
            utterance.lang = 'ar-SA';
          }
          utterance.rate = 0.88;
          utterance.pitch = 1.0;
          utterance.volume = 1.0;

          window.__activeUtterance = utterance;
          activeUtteranceRef.current = utterance;

          utterance.onend = handleSpeechEnd;
          utterance.onerror = (e) => {
            if (e && e.error !== 'canceled') {
              playAcousticVoicePulses(words.length);
              speakingTimerRef.current = setTimeout(handleSpeechEnd, estimatedDurationMs);
            } else {
              handleSpeechEnd();
            }
          };

          window.speechSynthesis.speak(utterance);
          return;
        } catch (_) {
          playAcousticVoicePulses(words.length);
          speakingTimerRef.current = setTimeout(handleSpeechEnd, estimatedDurationMs);
        }
      } else {
        playAcousticVoicePulses(words.length);
        speakingTimerRef.current = setTimeout(handleSpeechEnd, estimatedDurationMs);
      }
    };

    // 3. Primary Engine: High-Fidelity Arabic Speech Stream via StreamElements API
    try {
      const shortText = cleanText.slice(0, 200);
      const ttsUrl = `https://api.streamelements.com/kappa/v2/speech?voice=Maged&text=${encodeURIComponent(shortText)}`;
      const audio = new Audio(ttsUrl);
      audio.volume = 1.0;
      activeAudioRef.current = audio;

      audio.onended = handleSpeechEnd;
      audio.onerror = () => {
        activeAudioRef.current = null;
        playWebSpeechOrSynth();
      };

      const playPromise = audio.play();
      if (playPromise) {
        playPromise.catch(() => {
          playWebSpeechOrSynth();
        });
      }
    } catch (_) {
      playWebSpeechOrSynth();
    }
  };

  // Centralized wrong feedback: plays gentle audio cue + speaks "خطأ! حاول مرة ثانية يا بطل"
  const playWrongFeedback = (customText = 'خطأ! حاول مرة ثانية يا بطل') => {
    if (!soundEnabled) return;
    playCustomSoundSynthFallback('gentle_wrong');
    speakArabic(customText);
  };

  // Celebration State for "شاطر شاطر" and Clapping
  const [celebrationData, setCelebrationData] = useState({
    isOpen: false,
    title: '',
    message: '',
    stars: 3,
  });

  // Synthesize realistic acoustic hand-clapping via Web Audio API
  const playSynthesizedClapping = (ctx) => {
    try {
      const now = ctx.currentTime;
      for (let i = 0; i < 8; i++) {
        const burstTime = now + i * 0.15 + (Math.random() * 0.03);
        const bufferSize = Math.floor(ctx.sampleRate * 0.06);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let j = 0; j < bufferSize; j++) {
          data[j] = (Math.random() * 2 - 1) * Math.exp(-j / (bufferSize * 0.25));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1200 + (Math.random() * 200 - 100);
        filter.Q.value = 1.8;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.5, burstTime);
        gain.gain.exponentialRampToValueAtTime(0.001, burstTime + 0.07);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start(burstTime);
        noise.stop(burstTime + 0.08);
      }
    } catch (e) {
      console.warn('Synthesized clapping error', e);
    }
  };

  const lastCheerTimeRef = useRef(0);

  // Play clapping audio + speak cheering "شاطر شاطر يا بطل" in Arabic ONCE (no duplicates)
  const playClappingAndCheer = () => {
    if (!soundEnabled) return;

    // Debounce rapid duplicate calls (ignore duplicate triggers within 2500ms)
    const now = Date.now();
    if (now - lastCheerTimeRef.current < 2500) {
      return;
    }
    lastCheerTimeRef.current = now;

    // Stop previous ongoing speech/audio cleanly
    stopSpeech();

    // 1. Play real applause audio asset once
    playCustomSound('applause');

    // 2. Immediate synthesized clapping layer for instant responsiveness
    const ctx = getAudioContext();
    if (ctx) {
      if (ctx.state === 'suspended') {
        ctx.resume().then(() => playSynthesizedClapping(ctx)).catch(() => {});
      } else {
        playSynthesizedClapping(ctx);
      }
    }

    // 3. Spoken encouragement in Arabic: Strictly "شاطر شاطر يا بطل!" voice ONCE
    setTimeout(() => {
      speakArabic('شاطر شاطر يا بطل!', { isCelebration: true });
    }, 200);
  };

  // Open the celebratory clapping modal with voice
  const triggerCelebration = ({
    title = 'شاطر شاطر يا بطل!',
    message = 'أحسنت صنعاً في هذا النشاط.',
    stars = 3,
  } = {}) => {
    setCelebrationData({
      isOpen: true,
      title: 'شاطر شاطر يا بطل!',
      message: 'أحسنت صنعاً في هذا النشاط.',
      stars,
    });
    addStar(stars);
    playClappingAndCheer();
  };

  const closeCelebration = () => {
    stopSpeech();
    setCelebrationData((prev) => ({ ...prev, isOpen: false }));
  };

  const addStar = (count = 1) => {
    setChildStars((prev) => prev + count);
  };

  const markActivityComplete = (activityId, title, message) => {
    if (!completedActivities.includes(activityId)) {
      setCompletedActivities((prev) => [...prev, activityId]);
      triggerCelebration({
        title: title || 'شاطر شاطر يا بطل!',
        message: message || 'شاطر شاطر! أحسنت يا بطل، لقد حققت إنجازاً رائعاً في هذا النشاط!',
        stars: 3,
      });
    } else {
      // If already completed once, still reward with clapping and cheering
      triggerCelebration({
        title: title || 'شاطر شاطر يا بطل!',
        message: message || 'ما شاء الله عليك، شاطر شاطر جداً يا عبقري!',
        stars: 1,
      });
    }
  };

  return (
    <SensoryContext.Provider
      value={{
        calmMode,
        setCalmMode,
        soundEnabled,
        setSoundEnabled,
        fontSizeScale,
        setFontSizeScale,
        activeRole,
        setActiveRole,
        childStars,
        addStar,
        completedActivities,
        markActivityComplete,
        playCalmTone,
        playCustomSound,
        speakArabic,
        playWrongFeedback,
        isSpeaking,
        stopSpeech,
        currentSpeakingText,
        celebrationData,
        triggerCelebration,
        closeCelebration,
        playClappingAndCheer,
        playSynthesizedAnimalSound,
        audioRegistry: AUDIO_REGISTRY,
      }}
    >
      <div
        className={`min-h-screen transition-all duration-300 ${calmMode ? 'calm-mode' : ''} ${
          fontSizeScale === 'large' ? 'text-lg' : fontSizeScale === 'xlarge' ? 'text-xl' : 'text-base'
        }`}
      >
        {children}
      </div>
    </SensoryContext.Provider>
  );
};

export const useSensory = () => useContext(SensoryContext);
