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
      
      // Try to find a Chinese voice
      const zhVoice = voices.find(v => v.lang.includes('zh') || v.lang.includes('cmn'));
      if (zhVoice) {
        utterance.voice = zhVoice;
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
