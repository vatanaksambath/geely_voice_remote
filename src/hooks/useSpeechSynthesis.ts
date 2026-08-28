'use client';

import { useCallback, useEffect, useState } from 'react';

export const useSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [supported, setSupported] = useState(true);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setSupported(false);
      return;
    }

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = useCallback((text: string) => {
    if (!supported || typeof window === 'undefined') return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Small delay to allow the cancel command to process in the browser engine
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Try to find a Chinese voice, prioritizing female voices
      const zhVoices = voices.filter(v => v.lang.includes('zh') || v.lang.includes('cmn'));
      
      let selectedVoice = zhVoices.find(v => {
        const name = v.name.toLowerCase();
        // Look for known female Chinese voices or generic female names
        return name.includes('female') || 
               name.includes('tingting') || // Apple's zh-CN female
               name.includes('xiaoxiao') || // Microsoft's zh-CN female
               name.includes('yaoyao') ||   // Microsoft's zh-CN female
               name.includes('meijia');     // Apple's zh-TW female
      });

      // Fallback 1: Google's default Chinese voice (usually female)
      if (!selectedVoice) {
        selectedVoice = zhVoices.find(v => v.name.toLowerCase().includes('google'));
      }

      // Fallback 2: Avoid known male voices if possible
      if (!selectedVoice) {
        selectedVoice = zhVoices.find(v => {
          const name = v.name.toLowerCase();
          return !name.includes('male') && !name.includes('kankan') && !name.includes('yunjian');
        });
      }

      // Fallback 3: Just use the first Chinese voice available
      if (!selectedVoice && zhVoices.length > 0) {
        selectedVoice = zhVoices[0];
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      utterance.lang = 'zh-CN';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (e) => {
        // Some browsers throw an empty error on interruption or normal failures, just silently reset state
        if (e.error !== 'interrupted') {
          console.warn('TTS Warning:', e.error || 'Unknown error');
        }
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    }, 50);
  }, [supported, voices]);

  const stop = useCallback(() => {
    if (supported && typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [supported]);

  return {
    speak,
    stop,
    isSpeaking,
    supported
  };
};
