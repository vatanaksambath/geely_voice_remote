'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Volume2, VolumeX } from 'lucide-react';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { cn } from '@/components/BottomNav';

export default function DynamicMediaControls() {
  const { speak } = useSpeechSynthesis();
  
  const [volume, setVolume] = useLocalStorage('geely_media_vol', 10);
  const [activePhraseId, setActivePhraseId] = useState<string | null>(null);
  
  const volumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSpeak = (id: string, phrase: string) => {
    setActivePhraseId(id);
    speak(phrase);
    setTimeout(() => setActivePhraseId(null), 2000);
  };

  const setAbsoluteVolume = (newVol: number) => {
    const clamped = Math.max(0, Math.min(30, newVol));
    setVolume(clamped);
    if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current);
    volumeTimeoutRef.current = setTimeout(() => {
      handleSpeak(`vol_${clamped}`, `把音量调到${clamped}`);
    }, 600);
  };

  const adjustVolume = (delta: number) => setAbsoluteVolume(volume + delta);

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Volume Control */}
      <div className={cn(
        "col-span-2 bg-white dark:bg-[#18181b] border rounded-[20px] p-3.5 shadow-sm dark:shadow-xl dark:shadow-black/40 transition-all duration-300 flex flex-col justify-between",
        activePhraseId?.startsWith('vol') ? "border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)]" : "border-slate-200 dark:border-[#27272a]"
      )}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {volume === 0 ? (
              <VolumeX size={20} className="text-purple-600 dark:text-purple-400" />
            ) : (
              <Volume2 size={20} className="text-purple-600 dark:text-purple-400" />
            )}
            <span className="text-slate-800 dark:text-gray-300 font-semibold text-sm tracking-wide">Volume</span>
          </div>
          <span className="text-gray-500 text-xs font-medium">កម្រិតសំឡេង</span>
        </div>
        <div className="flex items-center justify-between">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => adjustVolume(-1)}
            className="w-11 h-11 rounded-full bg-slate-100 dark:bg-[#27272a] border border-slate-200 dark:border-[#27272a] flex items-center justify-center text-slate-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-[#3f3f46] transition-colors shadow-sm"
          >
            <Minus size={20} />
          </motion.button>
          
          <div className="text-4xl font-bold text-slate-800 dark:text-white flex items-start tracking-tighter" style={{ textShadow: '0 0 20px rgba(125,125,125,0.1)' }}>
            {volume}<span className="text-lg text-gray-500 mt-1.5 ml-1">/30</span>
          </div>
          
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => adjustVolume(1)}
            className="w-11 h-11 rounded-full bg-purple-100 dark:bg-purple-500/20 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center text-purple-700 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-500/30 transition-colors shadow-sm dark:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
          >
            <Plus size={20} />
          </motion.button>
        </div>

        <div className="flex flex-col space-y-3 mt-1.5">
          <input 
            type="range" 
            min="0" max="30" step="1" 
            value={volume} 
            onChange={(e) => setAbsoluteVolume(parseInt(e.target.value))} 
            className="w-full h-2 rounded-lg appearance-none bg-slate-200 dark:bg-[#27272a] accent-purple-500 cursor-pointer"
          />
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => setAbsoluteVolume(0)} className="py-2 rounded-xl bg-slate-100 dark:bg-[#27272a] text-slate-700 dark:text-gray-300 font-bold text-[10px] sm:text-xs hover:bg-slate-200 dark:hover:bg-[#3f3f46] transition-colors">MUTE</button>
            <button onClick={() => setAbsoluteVolume(10)} className="py-2 rounded-xl bg-slate-100 dark:bg-[#27272a] text-slate-700 dark:text-gray-300 font-bold text-[10px] sm:text-xs hover:bg-slate-200 dark:hover:bg-[#3f3f46] transition-colors">MED</button>
            <button onClick={() => setAbsoluteVolume(15)} className="py-2 rounded-xl bg-slate-100 dark:bg-[#27272a] text-slate-700 dark:text-gray-300 font-bold text-[10px] sm:text-xs hover:bg-slate-200 dark:hover:bg-[#3f3f46] transition-colors">HI</button>
          </div>
        </div>
      </div>
    </div>
  );
}
