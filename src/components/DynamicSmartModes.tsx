'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Dog, Moon, Droplets } from 'lucide-react';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { cn } from '@/components/BottomNav';

export default function DynamicSmartModes() {
  const { speak } = useSpeechSynthesis();
  
  const [petModeOn, setPetModeOn] = useLocalStorage('geely_smart_pet', false);
  const [restModeOn, setRestModeOn] = useLocalStorage('geely_smart_rest', false);
  const [washModeOn, setWashModeOn] = useLocalStorage('geely_smart_wash', false);

  const [activePhraseId, setActivePhraseId] = useState<string | null>(null);

  const handleSpeak = (id: string, phrase: string) => {
    setActivePhraseId(id);
    speak(phrase);
    setTimeout(() => setActivePhraseId(null), 2000);
  };

  const togglePetMode = () => {
    const newState = !petModeOn;
    setPetModeOn(newState);
    handleSpeak(`smart_pet_${newState ? 'on' : 'off'}`, newState ? '打开宠物模式' : '关闭宠物模式');
  };

  const toggleRestMode = () => {
    const newState = !restModeOn;
    setRestModeOn(newState);
    handleSpeak(`smart_rest_${newState ? 'on' : 'off'}`, newState ? '打开小憩模式' : '退出小憩模式');
  };

  const toggleWashMode = () => {
    const newState = !washModeOn;
    setWashModeOn(newState);
    handleSpeak(`smart_wash_${newState ? 'on' : 'off'}`, newState ? '打开洗车模式' : '退出洗车模式');
  };

  return (
    <div className={cn(
      "bg-white dark:bg-[#18181b] border rounded-[20px] p-4 shadow-sm dark:shadow-xl dark:shadow-black/40 transition-all duration-300 flex flex-col space-y-4 mb-4",
      activePhraseId?.startsWith('smart') ? "border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)]" : "border-slate-200 dark:border-[#27272a]"
    )}>
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles size={20} className={activePhraseId ? "text-purple-500" : "text-slate-400 dark:text-gray-500"} />
          <span className="text-slate-800 dark:text-gray-100 font-bold text-sm tracking-wide">Smart Modes</span>
        </div>
        <span className="text-slate-500 dark:text-gray-400 text-xs font-medium">មុខងារឆ្លាតវៃ</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {/* Pet Mode */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={togglePetMode}
          className={cn(
            "p-3 rounded-xl flex flex-col items-center justify-center space-y-2 transition-all duration-300",
            petModeOn ? "bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 shadow-inner" : "bg-slate-50 dark:bg-[#27272a] text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-[#3f3f46]"
          )}
        >
          <Dog size={20} className={petModeOn ? "text-purple-500 animate-bounce" : ""} />
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold uppercase tracking-wide">Pet Mode</span>
            <span className="text-[8px] opacity-70 mt-0.5">{petModeOn ? 'ON' : 'OFF'}</span>
          </div>
        </motion.button>
        
        {/* Rest Mode */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggleRestMode}
          className={cn(
            "p-3 rounded-xl flex flex-col items-center justify-center space-y-2 transition-all duration-300",
            restModeOn ? "bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 shadow-inner" : "bg-slate-50 dark:bg-[#27272a] text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-[#3f3f46]"
          )}
        >
          <Moon size={20} className={restModeOn ? "text-blue-500 animate-pulse" : ""} />
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold uppercase tracking-wide">Rest Mode</span>
            <span className="text-[8px] opacity-70 mt-0.5">{restModeOn ? 'ON' : 'OFF'}</span>
          </div>
        </motion.button>

        {/* Car Wash Mode */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggleWashMode}
          className={cn(
            "p-3 rounded-xl flex flex-col items-center justify-center space-y-2 transition-all duration-300",
            washModeOn ? "bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 shadow-inner" : "bg-slate-50 dark:bg-[#27272a] text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-[#3f3f46]"
          )}
        >
          <Droplets size={20} className={washModeOn ? "text-cyan-500" : ""} />
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold uppercase tracking-wide">Car Wash</span>
            <span className="text-[8px] opacity-70 mt-0.5">{washModeOn ? 'ON' : 'OFF'}</span>
          </div>
        </motion.button>
      </div>

    </div>
  );
}
