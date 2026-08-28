'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AppWindow } from 'lucide-react';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { cn } from '@/components/BottomNav';

type WindowTarget = 'all' | 'driver' | 'passenger' | 'rear_left' | 'rear_right';
type WindowAction = 'open' | 'crack' | 'close';

const WINDOW_TARGETS: { id: WindowTarget; labelEn: string; labelKm: string }[] = [
  { id: 'all', labelEn: 'All Windows', labelKm: 'កញ្ចក់ទាំងអស់' },
  { id: 'driver', labelEn: 'Driver', labelKm: 'អ្នកបើកបរ (មុខឆ្វេង)' },
  { id: 'passenger', labelEn: 'Passenger', labelKm: 'អ្នកដំណើរ (មុខស្តាំ)' },
  { id: 'rear_left', labelEn: 'Rear Left', labelKm: 'ក្រោយឆ្វេង' },
  { id: 'rear_right', labelEn: 'Rear Right', labelKm: 'ក្រោយស្តាំ' },
];

const WINDOW_ACTIONS: { id: WindowAction; labelEn: string; labelKm: string }[] = [
  { id: 'open', labelEn: 'Open', labelKm: 'បើក' },
  { id: 'crack', labelEn: 'Crack', labelKm: 'បើកបន្តិច' },
  { id: 'close', labelEn: 'Close', labelKm: 'បិទ' },
];

const CHINESE_TARGETS: Record<WindowTarget, string> = {
  all: '所有车窗',
  driver: '主驾车窗',
  passenger: '副驾车窗',
  rear_left: '左后车窗',
  rear_right: '右后车窗',
};

export default function DynamicWindowControls() {
  const { speak } = useSpeechSynthesis();
  const [target, setTarget] = useState<WindowTarget>('all');
  const [activePhraseId, setActivePhraseId] = useState<string | null>(null);

  const handleAction = (action: WindowAction) => {
    const targetName = CHINESE_TARGETS[target];
    let phrase = '';
    
    if (action === 'open') phrase = `打开${targetName}`;
    if (action === 'close') phrase = `关闭${targetName}`;
    if (action === 'crack') phrase = `把${targetName}打开一条缝`;
    
    const id = `win_${target}_${action}`;
    setActivePhraseId(id);
    speak(phrase);
    setTimeout(() => setActivePhraseId(null), 2000);
  };

  return (
    <div className={cn(
      "bg-white dark:bg-[#18181b] border rounded-[20px] p-4 shadow-sm dark:shadow-xl dark:shadow-black/40 transition-all duration-300 flex flex-col space-y-4 mb-4",
      activePhraseId ? "border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]" : "border-slate-200 dark:border-[#27272a]"
    )}>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1.5">
          <AppWindow size={16} className={activePhraseId ? "text-cyan-500" : "text-slate-400 dark:text-gray-500"} />
          <span className="text-slate-800 dark:text-gray-100 font-bold text-xs tracking-wide">Window Controls</span>
        </div>
        <span className="text-slate-500 dark:text-gray-400 text-[10px] font-medium">បញ្ជាកញ្ចក់ឡាន</span>
      </div>

      {/* Target Selector */}
      <div className="grid grid-cols-2 gap-2">
        {WINDOW_TARGETS.map(t => (
          <motion.button
            key={t.id}
            onClick={() => setTarget(t.id)}
            className={cn(
              "py-2 rounded-xl flex flex-col items-center justify-center transition-all duration-300",
              t.id === 'all' ? "col-span-2" : "",
              target === t.id
                ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                : "bg-slate-100 dark:bg-[#27272a] hover:bg-slate-200 dark:hover:bg-[#3f3f46]"
            )}
          >
            <span className={cn("text-xs font-bold uppercase tracking-wide", target === t.id ? "text-white" : "text-slate-800 dark:text-gray-100")}>{t.labelKm}</span>
            <span className={cn("text-[9px] mt-0.5", target === t.id ? "text-cyan-100" : "text-slate-500 dark:text-gray-400")}>{t.labelEn}</span>
          </motion.button>
        ))}
      </div>

      <div className="h-px w-full bg-gray-200 dark:bg-white/10 my-1" />

      {/* Actions */}
      <div className="grid grid-cols-3 gap-2">
        {WINDOW_ACTIONS.map(a => {
          const isActive = activePhraseId === `win_${target}_${a.id}`;
          return (
            <motion.button
              key={a.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAction(a.id)}
              className={cn(
                "py-3 rounded-xl flex flex-col items-center justify-center transition-all duration-300 overflow-hidden relative",
                isActive
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                  : "bg-slate-100 dark:bg-[#27272a] hover:bg-slate-200 dark:hover:bg-[#3f3f46]"
              )}
            >
              <span className={cn("text-xs sm:text-[13px] font-bold uppercase tracking-wide", isActive ? "text-white" : "text-slate-800 dark:text-gray-100")}>{a.labelKm}</span>
              <span className={cn("text-[9px] mt-0.5", isActive ? "text-cyan-100" : "text-slate-500 dark:text-gray-400")}>{a.labelEn}</span>
            </motion.button>
          )
        })}
      </div>

    </div>
  );
}
