'use client';

import { Settings, Globe, Volume2, Shield } from 'lucide-react';

export default function SettingsPage() {
  return (
    <main className="min-h-screen pb-24 bg-gradient-to-b from-[#111] to-[#050505]">
      <header className="sticky top-0 z-40 bg-[#111]/80 backdrop-blur-xl border-b border-gray-800 px-6 py-6 pt-12">
        <h1 className="text-2xl font-semibold tracking-wide text-white">Settings</h1>
      </header>

      <div className="px-6 py-8 space-y-6">
        
        <section>
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 px-2">Voice Assistant</h2>
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-3xl overflow-hidden shadow-lg">
            
            <div className="flex items-center justify-between p-4 border-b border-gray-800/50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl">
                  <Globe size={20} />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Language</div>
                  <div className="text-gray-500 text-xs">Mandarin Chinese (zh-CN)</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border-b border-gray-800/50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500/10 text-purple-400 rounded-xl">
                  <Settings size={20} />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Wake Word</div>
                  <div className="text-gray-500 text-xs">"你好银河" / "你好吉利"</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/10 text-green-400 rounded-xl">
                  <Volume2 size={20} />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Voice Feedback</div>
                  <div className="text-gray-500 text-xs">Enabled</div>
                </div>
              </div>
              <div className="w-12 h-6 bg-cyan-500 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            
          </div>
        </section>

        <section>
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 px-2">Privacy & Security</h2>
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-3xl overflow-hidden shadow-lg">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-500/10 text-red-400 rounded-xl">
                  <Shield size={20} />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Microphone Access</div>
                  <div className="text-gray-500 text-xs">Required for voice commands</div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
