'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings2, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { cn } from '@/components/BottomNav';

type SeatTarget = 'driver' | 'passenger';

export default function DynamicSeatControls() {
  const { speak } = useSpeechSynthesis();
  
  const [target, setTarget] = useLocalStorage<SeatTarget>('geely_seat_target', 'driver');
  const [activePhraseId, setActivePhraseId] = useState<string | null>(null);

  const handleSpeak = (id: string, phrase: string) => {
    setActivePhraseId(id);
    speak(phrase);
    setTimeout(() => setActivePhraseId(null), 2000);
  };

  const getTargetName = () => target === 'driver' ? '主驾座椅' : '副驾座椅';

  const moveSeat = (direction: string, phraseSuffix: string) => {
    handleSpeak(`seat_${target}_${direction}`, `把${getTargetName()}${phraseSuffix}`);
  };

  return (
    <div className={cn(
      "bg-white dark:bg-[#18181b] border rounded-[20px] p-4 shadow-sm dark:shadow-xl dark:shadow-black/40 transition-all duration-300 flex flex-col space-y-4 mb-4",
      activePhraseId?.startsWith('seat') ? "border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)]" : "border-slate-200 dark:border-[#27272a]"
    )}>
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Settings2 size={20} className={activePhraseId ? "text-indigo-500" : "text-slate-400 dark:text-gray-500"} />
          <span className="text-slate-800 dark:text-gray-100 font-bold text-sm tracking-wide">Seat Adjustments</span>
        </div>
        <span className="text-slate-500 dark:text-gray-400 text-xs font-medium">កែសម្រួលកៅអី</span>
      </div>

      {/* Target Selector */}
      <div className="bg-slate-100 dark:bg-[#27272a] p-1 rounded-xl flex items-center">
        <button
          onClick={() => setTarget('driver')}
          className={cn(
            "flex-1 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all",
            target === 'driver' ? "bg-white dark:bg-[#3f3f46] text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          )}
        >
          Driver
        </button>
        <button
          onClick={() => setTarget('passenger')}
          className={cn(
            "flex-1 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all",
            target === 'passenger' ? "bg-white dark:bg-[#3f3f46] text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          )}
        >
          Passenger
        </button>
      </div>

      {/* D-Pad for Seat Position */}
      <div className="flex justify-center items-center py-2">
        <div className="grid grid-cols-3 gap-2 w-40 h-40">
          {/* Top Row */}
          <div />
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => moveSeat('up', '调高一点')} className="bg-slate-50 dark:bg-[#27272a] rounded-xl flex items-center justify-center text-slate-600 dark:text-gray-300 shadow-sm hover:bg-slate-100 dark:hover:bg-[#3f3f46] border border-gray-100 dark:border-white/5">
            <ArrowUp size={20} />
          </motion.button>
          <div />

          {/* Middle Row */}
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => moveSeat('forward', '往前调一点')} className="bg-slate-50 dark:bg-[#27272a] rounded-xl flex items-center justify-center text-slate-600 dark:text-gray-300 shadow-sm hover:bg-slate-100 dark:hover:bg-[#3f3f46] border border-gray-100 dark:border-white/5">
            <ArrowLeft size={20} />
          </motion.button>
          
          <div className="flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-500/20" />
          </div>

          <motion.button whileTap={{ scale: 0.9 }} onClick={() => moveSeat('backward', '往后调一点')} className="bg-slate-50 dark:bg-[#27272a] rounded-xl flex items-center justify-center text-slate-600 dark:text-gray-300 shadow-sm hover:bg-slate-100 dark:hover:bg-[#3f3f46] border border-gray-100 dark:border-white/5">
            <ArrowRight size={20} />
          </motion.button>

          {/* Bottom Row */}
          <div />
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => moveSeat('down', '调低一点')} className="bg-slate-50 dark:bg-[#27272a] rounded-xl flex items-center justify-center text-slate-600 dark:text-gray-300 shadow-sm hover:bg-slate-100 dark:hover:bg-[#3f3f46] border border-gray-100 dark:border-white/5">
            <ArrowDown size={20} />
          </motion.button>
          <div />
        </div>
      </div>

      <div className="h-px w-full bg-gray-100 dark:bg-white/5 my-1" />

      {/* Recline */}
      <div className="grid grid-cols-1 gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => moveSeat('recline', '靠背往后倒')}
          className="p-3 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 bg-slate-50 dark:bg-[#27272a] text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-[#3f3f46]"
        >
          <span className="text-[10px] font-bold uppercase tracking-wide">Recline</span>
        </motion.button>
      </div>

    </div>
  );
}
