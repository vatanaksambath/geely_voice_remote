'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Power, Sun, Palette, ChevronLeft, ChevronRight, BookOpen, Circle, Waves, Music } from 'lucide-react';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { cn } from '@/components/BottomNav';

const COLORS = [
  { id: 'red', hex: '#ef4444', labelEn: 'Red', labelKm: 'ក្រហម', phrase: '把氛围灯调成红色' },
  { id: 'orange', hex: '#f97316', labelEn: 'Warm', labelKm: 'លឿងទុំ', phrase: '把氛围灯调成暖色' },
  { id: 'yellow', hex: '#eab308', labelEn: 'Yellow', labelKm: 'លឿង', phrase: '把氛围灯调成黄色' },
  { id: 'green', hex: '#22c55e', labelEn: 'Green', labelKm: 'បៃតង', phrase: '把氛围灯调成绿色' },
  { id: 'cyan', hex: '#06b6d4', labelEn: 'Cyan', labelKm: 'ផ្ទៃមេឃ', phrase: '把氛围灯调成青色' },
  { id: 'blue', hex: '#3b82f6', labelEn: 'Blue', labelKm: 'ខៀវ', phrase: '把氛围灯调成蓝色' },
  { id: 'purple', hex: '#a855f7', labelEn: 'Purple', labelKm: 'ស្វាយ', phrase: '把氛围灯调成紫色' },
  { id: 'pink', hex: '#ec4899', labelEn: 'Pink', labelKm: 'ផ្កាឈូក', phrase: '把氛围灯调成粉色' },
  { id: 'white', hex: '#ffffff', labelEn: 'White', labelKm: 'ស', phrase: '把氛围灯调成白色' },
  { id: 'dynamic', hex: 'linear-gradient(45deg, #ef4444, #eab308, #22c55e, #06b6d4, #a855f7)', labelEn: 'Dynamic', labelKm: 'ចម្រុះ', phrase: '把氛围灯调成流光' },
];

const MODES = [
  { id: 'static', icon: Circle, labelEn: 'Static', labelKm: 'ថេរ', phrase: '把氛围灯调成常亮' },
  { id: 'breathing', icon: Waves, labelEn: 'Breath', labelKm: 'ដង្ហើម', phrase: '把氛围灯调成呼吸模式' },
  { id: 'rhythm', icon: Music, labelEn: 'Rhythm', labelKm: 'ភ្លេង', phrase: '把氛围灯调成音乐律动模式' },
];

export default function DynamicLightingControls() {
  const { speak } = useSpeechSynthesis();
  
  const [isOn, setIsOn] = useLocalStorage('geely_light_on', false);
  const [brightness, setBrightness] = useLocalStorage('geely_light_bright', 50);
  const [activeColor, setActiveColor] = useLocalStorage('geely_light_color', 'blue');
  const [activeMode, setActiveMode] = useLocalStorage('geely_light_mode', 'static');
  const [frontReadingOn, setFrontReadingOn] = useLocalStorage('geely_light_read_f', false);
  const [rearReadingOn, setRearReadingOn] = useLocalStorage('geely_light_read_r', false);

  const [activePhraseId, setActivePhraseId] = useState<string | null>(null);
  const brightnessTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSpeak = (id: string, phrase: string) => {
    setActivePhraseId(id);
    speak(phrase);
    setTimeout(() => setActivePhraseId(null), 2000);
  };

  const toggleAmbient = () => {
    const newState = !isOn;
    setIsOn(newState);
    handleSpeak(`ambient_${newState ? 'on' : 'off'}`, newState ? '打开氛围灯' : '关闭氛围灯');
  };

  const changeColor = (colorId: string, phrase: string) => {
    if (!isOn) setIsOn(true);
    setActiveColor(colorId);
    handleSpeak(`ambient_color_${colorId}`, phrase);
  };

  const changeMode = (modeId: string, phrase: string) => {
    if (!isOn) setIsOn(true);
    setActiveMode(modeId);
    handleSpeak(`ambient_mode_${modeId}`, phrase);
  };

  const setAbsoluteBrightness = (newVal: number) => {
    const clamped = Math.max(0, Math.min(100, newVal));
    setBrightness(clamped);
    if (!isOn && clamped > 0) setIsOn(true);
    
    if (brightnessTimeoutRef.current) clearTimeout(brightnessTimeoutRef.current);
    brightnessTimeoutRef.current = setTimeout(() => {
      handleSpeak(`ambient_bright_${clamped}`, `把氛围灯亮度调到百分之${clamped}`);
    }, 600);
  };

  const toggleFrontReading = () => {
    const newState = !frontReadingOn;
    setFrontReadingOn(newState);
    handleSpeak(`read_front_${newState ? 'on' : 'off'}`, newState ? '打开前排阅读灯' : '关闭前排阅读灯');
  };

  const toggleRearReading = () => {
    const newState = !rearReadingOn;
    setRearReadingOn(newState);
    handleSpeak(`read_rear_${newState ? 'on' : 'off'}`, newState ? '打开后排阅读灯' : '关闭后排阅读灯');
  };

  return (
    <div className={cn(
      "bg-white dark:bg-[#18181b] border rounded-[20px] p-4 shadow-sm dark:shadow-xl dark:shadow-black/40 transition-all duration-300 flex flex-col space-y-4 mb-4",
      activePhraseId?.startsWith('ambient') || activePhraseId?.startsWith('read') ? "border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]" : "border-slate-200 dark:border-[#27272a]"
    )}>
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Lightbulb size={20} className={isOn ? "text-amber-500" : "text-slate-400 dark:text-gray-500"} />
          <span className="text-slate-800 dark:text-gray-100 font-bold text-sm tracking-wide">Lighting Controls</span>
        </div>
        <span className="text-slate-500 dark:text-gray-400 text-xs font-medium">បញ្ជាភ្លើងក្នុងឡាន</span>
      </div>

      {/* Main Ambient Light Toggle & Brightness */}
      <div className="bg-slate-50 dark:bg-[#27272a] rounded-2xl p-3 flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-gray-300 uppercase">Ambient Light</span>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={toggleAmbient}
            className={cn(
              "w-12 h-6 rounded-full relative transition-colors duration-300 shadow-inner flex items-center",
              isOn ? "bg-amber-500" : "bg-gray-300 dark:bg-gray-600"
            )}
          >
            <motion.div 
              className="w-5 h-5 bg-white rounded-full mx-0.5 shadow-sm absolute"
              animate={{ left: isOn ? "24px" : "2px" }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </motion.button>
        </div>

        <div className="flex items-center space-x-3">
          <Sun size={14} className="text-gray-400" />
          <input 
            type="range" 
            min="0" max="100" step="5" 
            value={brightness} 
            onChange={(e) => setAbsoluteBrightness(parseInt(e.target.value))} 
            className="flex-1 h-1.5 rounded-lg appearance-none bg-gray-200 dark:bg-gray-600 accent-amber-500 cursor-pointer"
            disabled={!isOn}
          />
          <span className="text-xs font-medium text-gray-500 w-8 text-right">{brightness}%</span>
        </div>
      </div>

      {/* Color Palette */}
      <div className={cn("transition-opacity duration-300", isOn ? "opacity-100" : "opacity-40 pointer-events-none")}>
        <div className="flex items-center space-x-1.5 mb-2.5 pl-1">
          <Palette size={12} className="text-gray-400" />
          <span className="text-[10px] font-bold text-gray-500 uppercase">Color Selection</span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {COLORS.map(color => (
            <div key={color.id} className="flex justify-center items-center py-1">
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => changeColor(color.id, color.phrase)}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                  activeColor === color.id ? "ring-2 ring-offset-2 ring-amber-500 dark:ring-offset-[#18181b] scale-110" : "hover:scale-105 shadow-sm"
                )}
                style={{ background: color.hex, border: color.id === 'white' ? '1px solid #e5e7eb' : 'none' }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 text-center text-[10px] font-medium text-gray-400 h-3">
          {COLORS.find(c => c.id === activeColor)?.labelKm} ({COLORS.find(c => c.id === activeColor)?.labelEn})
        </div>
      </div>

      {/* Modes */}
      <div className={cn("transition-opacity duration-300", isOn ? "opacity-100" : "opacity-40 pointer-events-none")}>
        <div className="grid grid-cols-3 gap-2">
          {MODES.map(mode => {
            const Icon = mode.icon;
            const isActive = activeMode === mode.id;
            return (
              <motion.button
                key={mode.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => changeMode(mode.id, mode.phrase)}
                className={cn(
                  "py-2 rounded-xl flex flex-col items-center justify-center space-y-1 transition-all duration-300",
                  isActive ? "bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 shadow-sm" : "bg-slate-50 dark:bg-[#27272a] text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-[#3f3f46]"
                )}
              >
                <Icon size={14} className={isActive ? (mode.id === 'breathing' ? "animate-pulse" : (mode.id === 'rhythm' ? "animate-bounce" : "")) : ""} />
                <span className="text-[9px] font-bold uppercase tracking-wide">{mode.labelEn}</span>
              </motion.button>
            )
          })}
        </div>
      </div>

      <div className="h-px w-full bg-gray-100 dark:bg-white/5" />

      {/* Reading Lights */}
      <div className="grid grid-cols-2 gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggleFrontReading}
          className={cn(
            "p-3 rounded-xl flex flex-col items-center justify-center space-y-1.5 transition-all duration-300",
            frontReadingOn ? "bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 shadow-inner" : "bg-slate-50 dark:bg-[#27272a] text-slate-500 dark:text-gray-400"
          )}
        >
          <BookOpen size={16} className={frontReadingOn ? "text-amber-500" : ""} />
          <span className="text-[10px] font-bold uppercase tracking-wide">Front Reading</span>
        </motion.button>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggleRearReading}
          className={cn(
            "p-3 rounded-xl flex flex-col items-center justify-center space-y-1.5 transition-all duration-300",
            rearReadingOn ? "bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 shadow-inner" : "bg-slate-50 dark:bg-[#27272a] text-slate-500 dark:text-gray-400"
          )}
        >
          <BookOpen size={16} className={rearReadingOn ? "text-amber-500" : ""} />
          <span className="text-[10px] font-bold uppercase tracking-wide">Rear Reading</span>
        </motion.button>
      </div>

    </div>
  );
}
