'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Command, Fan, Car, Music, Map, Sparkles } from 'lucide-react';
import { COMMAND_GROUPS, CommandCategory } from '@/utils/commandService';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import DynamicClimateControls from '@/components/DynamicClimateControls';
import DynamicWindowControls from '@/components/DynamicWindowControls';
import DynamicMediaControls from '@/components/DynamicMediaControls';
import DynamicLightingControls from '@/components/DynamicLightingControls';
import DynamicSeatControls from '@/components/DynamicSeatControls';
import DynamicEVControls from '@/components/DynamicEVControls';
import DynamicSmartModes from '@/components/DynamicSmartModes';
import { cn } from '@/components/BottomNav';

const CATEGORIES: CommandCategory[] = [
  'Climate Control',
  'Vehicle Controls',
  'Media & Entertainment',
  'Advanced Controls'
];

const CATEGORY_ICONS: Record<CommandCategory, any> = {
  'Climate Control': Fan,
  'Vehicle Controls': Car,
  'Media & Entertainment': Music,
  'Advanced Controls': Sparkles
};

const CATEGORY_SHORT_NAMES: Record<CommandCategory, string> = {
  'Climate Control': 'Climate',
  'Vehicle Controls': 'Vehicle',
  'Media & Entertainment': 'Media',
  'Advanced Controls': 'Advanced'
};

export default function SoundboardPage() {
  const { speak, isSpeaking, supported } = useSpeechSynthesis();
  const [activeCategory, setActiveCategory] = useLocalStorage<CommandCategory>('geely_active_category', 'Climate Control');
  const [activePhraseId, setActivePhraseId] = useState<string | null>(null);

  const handleSpeak = (id: string, phrase: string) => {
    setActivePhraseId(id);
    speak(phrase);
    setTimeout(() => setActivePhraseId(null), 2000);
  };

  const activeGroups = COMMAND_GROUPS.filter(g => g.category === activeCategory);

  return (
    <main className="min-h-screen pb-28 flex flex-col relative transition-colors duration-500">

      {/* Modern Grid Background - Adaptive to Light/Dark */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.03] invert dark:invert-0"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      {/* Central Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-400/10 dark:bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Compact Header */}
      <header className="px-6 py-4 relative z-10 flex items-center justify-between">
        <h2 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">
          Geely Voice
        </h2>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSpeak('wake_word', '你好银河')}
          className={cn(
            "flex items-center space-x-1.5 px-3 py-1.5 rounded-full transition-all duration-300 border overflow-hidden relative",
            activePhraseId === 'wake_word'
              ? "bg-cyan-500 text-white border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
              : "bg-white dark:bg-[#18181b] text-cyan-600 dark:text-cyan-400 border-slate-200 dark:border-[#27272a] shadow-sm hover:border-cyan-300 dark:hover:border-cyan-800"
          )}
        >
          {activePhraseId === 'wake_word' && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          )}
          <Mic size={14} className={activePhraseId === 'wake_word' ? "animate-pulse relative z-10" : "relative z-10"} />
          <span className="text-[10px] font-bold tracking-wider uppercase relative z-10">Hi Eva</span>
        </motion.button>
      </header>

      {/* Commands Area */}
      <div className="px-6 flex-1 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {activeCategory === 'Climate Control' && (
              <div className="mb-4">
                <DynamicClimateControls />
              </div>
            )}

            {activeCategory === 'Vehicle Controls' && (
              <div className="mb-4">
                <DynamicWindowControls />
              </div>
            )}

            {activeCategory === 'Advanced Controls' && (
              <div className="flex flex-col space-y-4 mb-4">
                <DynamicSmartModes />
                <DynamicLightingControls />
                <DynamicSeatControls />
                <DynamicEVControls />
              </div>
            )}

            {activeCategory === 'Media & Entertainment' && (
              <div className="mb-4">
                <DynamicMediaControls />
              </div>
            )}

            {/* Grid for grouped commands */}
            {activeGroups.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {activeGroups.map(group => {
                  const hasActiveCommand = group.commands.some(cmd => cmd.id === activePhraseId);
                  const cols = group.commands.length;
                  const isWide = cols > 2;

                  return (
                    <div key={group.id} className={cn(
                      isWide ? "col-span-2" : "col-span-1",
                      "bg-white/80 dark:bg-black/40 backdrop-blur-xl border rounded-[20px] p-3.5 shadow-xl dark:shadow-2xl transition-all duration-300",
                      hasActiveCommand ? "border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)]" : "border-gray-200 dark:border-white/10"
                    )}>
                      <div className="flex flex-col mb-3">
                        <div className="flex items-center space-x-1.5">
                          <Command size={14} className={hasActiveCommand ? "text-cyan-600 dark:text-cyan-400" : "text-gray-400 dark:text-gray-500"} />
                          <span className="text-slate-800 dark:text-gray-300 font-bold text-[11px] tracking-wide truncate">{group.titleEn}</span>
                        </div>
                        <span className="text-gray-500 text-[9px] font-medium mt-0.5 ml-5 truncate">{group.titleKm}</span>
                      </div>

                      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
                        {group.commands.map(cmd => (
                          <motion.button
                            key={cmd.id}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSpeak(cmd.id, cmd.chinesePhrase)}
                            className={cn(
                              "py-2 rounded-xl flex flex-col items-center justify-center transition-all duration-300 overflow-hidden",
                              activePhraseId === cmd.id
                                ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                                : "bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10"
                            )}
                          >
                            <span className={cn("text-[10px] font-bold uppercase tracking-wide text-center px-1 leading-tight", activePhraseId === cmd.id ? "text-white" : "text-slate-700 dark:text-gray-300")}>
                              {cmd.labelKm}
                            </span>
                            <span className={cn("text-[8px] mt-0.5", activePhraseId === cmd.id ? "text-cyan-100" : "text-slate-500 dark:text-gray-500")}>
                              {cmd.labelEn}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {!supported && (
        <div className="fixed top-4 left-4 right-4 bg-red-100 dark:bg-red-500/10 backdrop-blur-md text-red-600 dark:text-red-400 p-4 rounded-2xl text-center text-xs font-medium border border-red-200 dark:border-red-500/20 z-50">
          Text-to-Speech is not supported in this browser.
        </div>
      )}

      {/* Category Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 h-[90px] bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-gray-200 dark:border-white/5 flex items-center justify-around z-50 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.5)] safe-area-pb px-2">
        {CATEGORIES.map(category => {
          const Icon = CATEGORY_ICONS[category];
          const isActive = activeCategory === category;
          const shortName = CATEGORY_SHORT_NAMES[category];

          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1.5 transition-colors duration-300",
                isActive ? "text-cyan-600 dark:text-cyan-400" : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              )}
            >
              <div className={cn(
                "p-2.5 rounded-2xl transition-all duration-300",
                isActive ? "bg-cyan-100 dark:bg-cyan-400/10 scale-110" : "bg-transparent scale-100"
              )}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-[10px] font-bold tracking-wider uppercase">{shortName}</span>
            </button>
          )
        })}
      </nav>

    </main>
  );
}
