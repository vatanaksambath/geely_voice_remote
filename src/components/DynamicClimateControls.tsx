'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Thermometer, Fan, Wind, Flame } from 'lucide-react';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { cn } from '@/components/BottomNav';

const LEVELS = ['off', 'low', 'med', 'high'] as const;
type VentLevel = typeof LEVELS[number];

export default function DynamicClimateControls() {
  const { speak } = useSpeechSynthesis();
  
  const [temp, setTemp] = useLocalStorage('geely_ac_temp', 22);
  const [fan, setFan] = useLocalStorage('geely_ac_fan', 3);
  
  const [driverMode, setDriverMode] = useLocalStorage<'vent' | 'heat'>('geely_ac_driver_mode', 'vent');
  const [passengerMode, setPassengerMode] = useLocalStorage<'vent' | 'heat'>('geely_ac_pass_mode', 'vent');
  
  const [driverVent, setDriverVent] = useLocalStorage<VentLevel>('geely_ac_driver_vent', 'off');
  const [passengerVent, setPassengerVent] = useLocalStorage<VentLevel>('geely_ac_pass_vent', 'off');
  const [driverHeat, setDriverHeat] = useLocalStorage<VentLevel>('geely_ac_driver_heat', 'off');
  const [passengerHeat, setPassengerHeat] = useLocalStorage<VentLevel>('geely_ac_pass_heat', 'off');

  const [activePhraseId, setActivePhraseId] = useState<string | null>(null);

  const handleSpeak = (id: string, phrase: string) => {
    setActivePhraseId(id);
    speak(phrase);
    setTimeout(() => setActivePhraseId(null), 2000);
  };

  const tempTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fanTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setAbsoluteTemp = (newTemp: number) => {
    const clamped = Math.max(16, Math.min(30, newTemp));
    setTemp(clamped);
    if (tempTimeoutRef.current) clearTimeout(tempTimeoutRef.current);
    tempTimeoutRef.current = setTimeout(() => {
      handleSpeak(`temp_${clamped}`, `把温度调到${clamped}度`);
    }, 600);
  };

  const adjustTemp = (delta: number) => setAbsoluteTemp(temp + delta);

  const setAbsoluteFan = (newFan: number) => {
    const clamped = Math.max(1, Math.min(9, newFan));
    setFan(clamped);
    if (fanTimeoutRef.current) clearTimeout(fanTimeoutRef.current);
    fanTimeoutRef.current = setTimeout(() => {
      handleSpeak(`fan_${clamped}`, `把风量调到${clamped}档`);
    }, 600);
  };

  const adjustFan = (delta: number) => setAbsoluteFan(fan + delta);

  const setDriverSeatLevel = (level: VentLevel) => {
    if (driverMode === 'vent') {
      setDriverVent(level);
      let phrase = '关闭主驾座椅通风';
      if (level === 'low') phrase = '主驾座椅通风调到一档';
      if (level === 'med') phrase = '主驾座椅通风调到二档';
      if (level === 'high') phrase = '主驾座椅通风调到三档';
      handleSpeak(`driver_vent_${level}`, phrase);
    } else {
      setDriverHeat(level);
      let phrase = '关闭主驾座椅加热';
      if (level === 'low') phrase = '主驾座椅加热调到一档';
      if (level === 'med') phrase = '主驾座椅加热调到二档';
      if (level === 'high') phrase = '主驾座椅加热调到三档';
      handleSpeak(`driver_heat_${level}`, phrase);
    }
  };

  const setPassengerSeatLevel = (level: VentLevel) => {
    if (passengerMode === 'vent') {
      setPassengerVent(level);
      let phrase = '关闭副驾座椅通风';
      if (level === 'low') phrase = '副驾座椅通风调到一档';
      if (level === 'med') phrase = '副驾座椅通风调到二档';
      if (level === 'high') phrase = '副驾座椅通风调到三档';
      handleSpeak(`pass_vent_${level}`, phrase);
    } else {
      setPassengerHeat(level);
      let phrase = '关闭副驾座椅加热';
      if (level === 'low') phrase = '副驾座椅加热调到一档';
      if (level === 'med') phrase = '副驾座椅加热调到二档';
      if (level === 'high') phrase = '副驾座椅加热调到三档';
      handleSpeak(`pass_heat_${level}`, phrase);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      
      {/* Temperature Control */}
      <div className={cn(
        "bg-white dark:bg-[#18181b] border rounded-[20px] p-3.5 shadow-sm dark:shadow-xl dark:shadow-black/40 transition-all duration-300 flex flex-col justify-between",
        activePhraseId?.startsWith('temp') ? "border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]" : "border-slate-200 dark:border-[#27272a]"
      )}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Thermometer size={20} className="text-cyan-600 dark:text-cyan-400" />
            <span className="text-slate-800 dark:text-gray-300 font-semibold text-sm tracking-wide">Temperature</span>
          </div>
          <span className="text-gray-500 text-xs font-medium">សីតុណ្ហភាព</span>
        </div>
        <div className="flex items-center justify-between">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => adjustTemp(-0.5)}
            className="w-11 h-11 rounded-full bg-slate-100 dark:bg-[#27272a] border border-slate-200 dark:border-[#27272a] flex items-center justify-center text-slate-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-[#3f3f46] transition-colors shadow-sm"
          >
            <Minus size={20} />
          </motion.button>
          
          <div className="text-4xl font-bold text-slate-800 dark:text-white flex items-start tracking-tighter" style={{ textShadow: '0 0 20px rgba(125,125,125,0.1)' }}>
            {temp.toFixed(1)}<span className="text-lg text-gray-500 mt-1.5 ml-1">°C</span>
          </div>
          
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => adjustTemp(0.5)}
            className="w-11 h-11 rounded-full bg-cyan-100 dark:bg-cyan-500/20 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-cyan-700 dark:text-cyan-400 hover:bg-cyan-200 dark:hover:bg-cyan-500/30 transition-colors shadow-sm dark:shadow-[0_0_15px_rgba(6,182,212,0.2)]"
          >
            <Plus size={20} />
          </motion.button>
        </div>

        <div className="flex flex-col space-y-3 mt-1.5">
          <input 
            type="range" 
            min="16" max="30" step="0.5" 
            value={temp} 
            onChange={(e) => setAbsoluteTemp(parseFloat(e.target.value))} 
            className="w-full h-2 rounded-lg appearance-none bg-slate-200 dark:bg-[#27272a] accent-cyan-500 cursor-pointer"
          />
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => setAbsoluteTemp(16)} className="py-2 rounded-xl bg-slate-100 dark:bg-[#27272a] text-slate-700 dark:text-gray-300 font-bold text-[10px] sm:text-xs hover:bg-slate-200 dark:hover:bg-[#3f3f46] transition-colors">LO</button>
            <button onClick={() => setAbsoluteTemp(23.5)} className="py-2 rounded-xl bg-slate-100 dark:bg-[#27272a] text-slate-700 dark:text-gray-300 font-bold text-[10px] sm:text-xs hover:bg-slate-200 dark:hover:bg-[#3f3f46] transition-colors">MED</button>
            <button onClick={() => setAbsoluteTemp(26.5)} className="py-2 rounded-xl bg-slate-100 dark:bg-[#27272a] text-slate-700 dark:text-gray-300 font-bold text-[10px] sm:text-xs hover:bg-slate-200 dark:hover:bg-[#3f3f46] transition-colors">HI</button>
          </div>
        </div>
      </div>

      {/* Fan Speed Control */}
      <div className={cn(
        "bg-white dark:bg-[#18181b] border rounded-[20px] p-3.5 shadow-sm dark:shadow-xl dark:shadow-black/40 transition-all duration-300 flex flex-col justify-between",
        activePhraseId?.startsWith('fan') ? "border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]" : "border-slate-200 dark:border-[#27272a]"
      )}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Fan size={20} className="text-blue-600 dark:text-blue-400" />
            <span className="text-slate-800 dark:text-gray-300 font-semibold text-sm tracking-wide">Fan Speed</span>
          </div>
          <span className="text-gray-500 text-xs font-medium">កម្លាំងខ្យល់</span>
        </div>
        <div className="flex items-center justify-between">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => adjustFan(-1)}
            className="w-11 h-11 rounded-full bg-slate-100 dark:bg-[#27272a] border border-slate-200 dark:border-[#27272a] flex items-center justify-center text-slate-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-[#3f3f46] transition-colors shadow-sm"
          >
            <Minus size={20} />
          </motion.button>
          
          <div className="text-4xl font-bold text-slate-800 dark:text-white flex items-start tracking-tighter" style={{ textShadow: '0 0 20px rgba(125,125,125,0.1)' }}>
            {fan}<span className="text-lg text-gray-500 mt-1.5 ml-1">/9</span>
          </div>
          
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => adjustFan(1)}
            className="w-11 h-11 rounded-full bg-blue-100 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-500/30 transition-colors shadow-sm dark:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
          >
            <Plus size={20} />
          </motion.button>
        </div>

        <div className="flex flex-col space-y-3 mt-1.5">
          <input 
            type="range" 
            min="1" max="9" step="1" 
            value={fan} 
            onChange={(e) => setAbsoluteFan(parseInt(e.target.value))} 
            className="w-full h-2 rounded-lg appearance-none bg-slate-200 dark:bg-[#27272a] accent-blue-500 cursor-pointer"
          />
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => setAbsoluteFan(1)} className="py-2 rounded-xl bg-slate-100 dark:bg-[#27272a] text-slate-700 dark:text-gray-300 font-bold text-[10px] sm:text-xs hover:bg-slate-200 dark:hover:bg-[#3f3f46] transition-colors">LO</button>
            <button onClick={() => setAbsoluteFan(3)} className="py-2 rounded-xl bg-slate-100 dark:bg-[#27272a] text-slate-700 dark:text-gray-300 font-bold text-[10px] sm:text-xs hover:bg-slate-200 dark:hover:bg-[#3f3f46] transition-colors">MED</button>
            <button onClick={() => setAbsoluteFan(9)} className="py-2 rounded-xl bg-slate-100 dark:bg-[#27272a] text-slate-700 dark:text-gray-300 font-bold text-[10px] sm:text-xs hover:bg-slate-200 dark:hover:bg-[#3f3f46] transition-colors">HI</button>
          </div>
        </div>
      </div>

      {/* Driver Seat */}
      <div className={cn(
        "bg-white dark:bg-[#18181b] border rounded-[20px] p-4 shadow-sm dark:shadow-xl dark:shadow-black/40 transition-all duration-300",
        (activePhraseId?.startsWith('driver_vent') || activePhraseId?.startsWith('driver_heat')) ? "border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]" : "border-slate-200 dark:border-[#27272a]"
      )}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {driverMode === 'vent' ? (
              <Wind size={20} className={driverVent !== 'off' ? "text-cyan-600 dark:text-cyan-400" : "text-gray-400 dark:text-gray-500"} />
            ) : (
              <Flame size={20} className={driverHeat !== 'off' ? "text-orange-600 dark:text-orange-400" : "text-gray-400 dark:text-gray-500"} />
            )}
            <span className="text-slate-800 dark:text-gray-300 font-semibold text-sm tracking-wide">Driver Seat</span>
          </div>
          
          <div className="bg-slate-100 dark:bg-[#27272a] rounded-lg p-0.5">
            <button onClick={() => setDriverMode('vent')} className={cn("px-3 py-1 rounded-md text-[10px] font-bold transition-all", driverMode === 'vent' ? "bg-white dark:bg-[#3f3f46] text-cyan-600 dark:text-cyan-400 shadow-sm" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300")}>VENT</button>
            <button onClick={() => setDriverMode('heat')} className={cn("px-3 py-1 rounded-md text-[10px] font-bold transition-all", driverMode === 'heat' ? "bg-white dark:bg-[#3f3f46] text-orange-600 dark:text-orange-400 shadow-sm" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300")}>HEAT</button>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {LEVELS.map(level => {
            const currentLevel = driverMode === 'vent' ? driverVent : driverHeat;
            const isActive = currentLevel === level;
            const activeColor = driverMode === 'vent' ? "bg-cyan-500 shadow-cyan-500/30" : "bg-orange-500 shadow-orange-500/30";
            
            return (
              <motion.button
                key={level}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDriverSeatLevel(level)}
                className={cn(
                  "py-2.5 rounded-xl text-[10px] sm:text-xs font-bold transition-all duration-300 uppercase tracking-wide",
                  isActive
                    ? `${activeColor} text-white shadow-lg`
                    : "bg-slate-100 dark:bg-[#27272a] text-slate-500 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-[#3f3f46]"
                )}
              >
                {level}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Passenger Seat */}
      <div className={cn(
        "bg-white dark:bg-[#18181b] border rounded-[20px] p-4 shadow-sm dark:shadow-xl dark:shadow-black/40 transition-all duration-300",
        (activePhraseId?.startsWith('pass_vent') || activePhraseId?.startsWith('pass_heat')) ? "border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]" : "border-slate-200 dark:border-[#27272a]"
      )}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {passengerMode === 'vent' ? (
              <Wind size={20} className={passengerVent !== 'off' ? "text-cyan-600 dark:text-cyan-400" : "text-gray-400 dark:text-gray-500"} />
            ) : (
              <Flame size={20} className={passengerHeat !== 'off' ? "text-orange-600 dark:text-orange-400" : "text-gray-400 dark:text-gray-500"} />
            )}
            <span className="text-slate-800 dark:text-gray-300 font-semibold text-sm tracking-wide">Passenger Seat</span>
          </div>
          
          <div className="bg-slate-100 dark:bg-[#27272a] rounded-lg p-0.5">
            <button onClick={() => setPassengerMode('vent')} className={cn("px-3 py-1 rounded-md text-[10px] font-bold transition-all", passengerMode === 'vent' ? "bg-white dark:bg-[#3f3f46] text-cyan-600 dark:text-cyan-400 shadow-sm" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300")}>VENT</button>
            <button onClick={() => setPassengerMode('heat')} className={cn("px-3 py-1 rounded-md text-[10px] font-bold transition-all", passengerMode === 'heat' ? "bg-white dark:bg-[#3f3f46] text-orange-600 dark:text-orange-400 shadow-sm" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300")}>HEAT</button>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {LEVELS.map(level => {
            const currentLevel = passengerMode === 'vent' ? passengerVent : passengerHeat;
            const isActive = currentLevel === level;
            const activeColor = passengerMode === 'vent' ? "bg-cyan-500 shadow-cyan-500/30" : "bg-orange-500 shadow-orange-500/30";
            
            return (
              <motion.button
                key={level}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPassengerSeatLevel(level)}
                className={cn(
                  "py-2.5 rounded-xl text-[10px] sm:text-xs font-bold transition-all duration-300 uppercase tracking-wide",
                  isActive
                    ? `${activeColor} text-white shadow-lg`
                    : "bg-slate-100 dark:bg-[#27272a] text-slate-500 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-[#3f3f46]"
                )}
              >
                {level}
              </motion.button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
