'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BatteryCharging, Plug, Activity } from 'lucide-react';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { cn } from '@/components/BottomNav';

export default function DynamicEVControls() {
  const { speak } = useSpeechSynthesis();
  
  const [activePhraseId, setActivePhraseId] = useState<string | null>(null);

  const handleSpeak = (id: string, phrase: string) => {
    setActivePhraseId(id);
    speak(phrase);
    setTimeout(() => setActivePhraseId(null), 2000);
  };

  const setChargePort = (action: 'open' | 'close') => {
    handleSpeak(`ev_port_${action}`, action === 'open' ? '打开充电口' : '关闭充电口');
  };

  const queryBattery = () => {
    handleSpeak('ev_battery_query', '查询剩余电量');
  };

  return (
    <div className={cn(
      "bg-white dark:bg-[#18181b] border rounded-[20px] p-4 shadow-sm dark:shadow-xl dark:shadow-black/40 transition-all duration-300 flex flex-col space-y-4 mb-4",
      activePhraseId?.startsWith('ev') ? "border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]" : "border-slate-200 dark:border-[#27272a]"
    )}>
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BatteryCharging size={20} className={activePhraseId ? "text-emerald-500" : "text-slate-400 dark:text-gray-500"} />
          <span className="text-slate-800 dark:text-gray-100 font-bold text-sm tracking-wide">EV Specifics</span>
        </div>
        <span className="text-slate-500 dark:text-gray-400 text-xs font-medium">ថាមពលអគ្គិសនី</span>
      </div>

      {/* Charging Port & Battery Check */}
      <div className="grid grid-cols-2 gap-3">
        {/* Charge Port Card */}
        <div className="bg-slate-50 dark:bg-[#27272a] rounded-xl p-2.5 flex flex-col justify-between">
          <div className="flex items-center justify-center space-x-1 mb-2">
            <Plug size={14} className="text-emerald-500" />
            <span className="text-[10px] font-bold uppercase tracking-wide text-slate-700 dark:text-gray-300">Charge Port</span>
          </div>
          <div className="flex items-center space-x-1.5 h-full">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setChargePort('open')}
              className={cn(
                "flex-1 py-2 rounded-lg flex items-center justify-center transition-all duration-300",
                activePhraseId === 'ev_port_open' ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20" : "bg-white dark:bg-[#3f3f46] text-slate-600 dark:text-gray-300 shadow-sm hover:text-emerald-500"
              )}
            >
              <span className="text-[10px] font-bold uppercase tracking-wide">Open</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setChargePort('close')}
              className={cn(
                "flex-1 py-2 rounded-lg flex items-center justify-center transition-all duration-300",
                activePhraseId === 'ev_port_close' ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20" : "bg-white dark:bg-[#3f3f46] text-slate-600 dark:text-gray-300 shadow-sm hover:text-emerald-500"
              )}
            >
              <span className="text-[10px] font-bold uppercase tracking-wide">Close</span>
            </motion.button>
          </div>
        </div>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={queryBattery}
          className="p-3 rounded-xl flex flex-col items-center justify-center space-y-2 transition-all duration-300 bg-slate-50 dark:bg-[#27272a] text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-[#3f3f46]"
        >
          <Activity size={20} />
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold uppercase tracking-wide">Check Battery</span>
            <span className="text-[8px] opacity-70 mt-0.5">STATUS</span>
          </div>
        </motion.button>
      </div>

    </div>
  );
}
