export type CommandCategory = 'Climate Control' | 'Vehicle Controls' | 'Media & Entertainment';

export interface VoiceCommand {
  id: string;
  labelEn: string;
  labelKm: string;
  chinesePhrase: string;
}

export interface CommandGroup {
  id: string;
  category: CommandCategory;
  titleEn: string;
  titleKm: string;
  commands: VoiceCommand[];
}

export const COMMAND_GROUPS: CommandGroup[] = [
  // Climate Control
  {
    id: 'ac', category: 'Climate Control', titleEn: 'Air Conditioning', titleKm: 'ម៉ាស៊ីនត្រជាក់',
    commands: [
      { id: 'ac_on', labelEn: 'On', labelKm: 'បើក', chinesePhrase: '打开空调' },
      { id: 'ac_off', labelEn: 'Off', labelKm: 'បិទ', chinesePhrase: '关闭空调' },
    ]
  },
  {
    id: 'circulation', category: 'Climate Control', titleEn: 'Circulation', titleKm: 'ខ្យល់',
    commands: [
      { id: 'circ_in', labelEn: 'Internal', labelKm: 'វិលក្នុង', chinesePhrase: '打开内循环' },
      { id: 'circ_out', labelEn: 'External', labelKm: 'ចូលពីក្រៅ', chinesePhrase: '打开外循环' },
    ]
  },
  {
    id: 'defrost', category: 'Climate Control', titleEn: 'Defrost', titleKm: 'រំលាយទឹកកក',
    commands: [
      { id: 'defrost_front', labelEn: 'Front', labelKm: 'មុខ', chinesePhrase: '前挡风除雾' },
      { id: 'defrost_rear', labelEn: 'Rear', labelKm: 'ក្រោយ', chinesePhrase: '后挡风除雾' },
    ]
  },

  {
    id: 'trunk', category: 'Vehicle Controls', titleEn: 'Trunk', titleKm: 'ឃ្លុបក្រោយ',
    commands: [
      { id: 'trunk_open', labelEn: 'Open', labelKm: 'បើក', chinesePhrase: '打开后备箱' },
      { id: 'trunk_close', labelEn: 'Close', labelKm: 'បិទ', chinesePhrase: '关闭后备箱' },
    ]
  },
  {
    id: 'sunshade', category: 'Vehicle Controls', titleEn: 'Sunshade', titleKm: 'វាំងននបាំងថ្ងៃ',
    commands: [
      { id: 'sunshade_open', labelEn: 'Open', labelKm: 'បើក', chinesePhrase: '打开遮阳帘' },
      { id: 'sunshade_close', labelEn: 'Close', labelKm: 'បិទ', chinesePhrase: '关闭遮阳帘' },
    ]
  },
  {
    id: 'sunroof', category: 'Vehicle Controls', titleEn: 'Sunroof', titleKm: 'ដំបូលឡាន',
    commands: [
      { id: 'sunroof_open', labelEn: 'Open', labelKm: 'បើក', chinesePhrase: '打开天窗' },
      { id: 'sunroof_close', labelEn: 'Close', labelKm: 'បិទ', chinesePhrase: '关闭天窗' },
    ]
  },
  {
    id: 'doors', category: 'Vehicle Controls', titleEn: 'Doors', titleKm: 'ទ្វារឡាន',
    commands: [
      { id: 'door_lock', labelEn: 'Lock', labelKm: 'ចាក់សោ', chinesePhrase: '锁定车门' },
      { id: 'door_unlock', labelEn: 'Unlock', labelKm: 'ដោះសោ', chinesePhrase: '解锁车门' },
    ]
  },
  {
    id: 'mirrors', category: 'Vehicle Controls', titleEn: 'Mirrors', titleKm: 'កញ្ចក់ចំហៀង',
    commands: [
      { id: 'mirror_fold', labelEn: 'Fold', labelKm: 'បត់ចូល', chinesePhrase: '折叠后视镜' },
      { id: 'mirror_unfold', labelEn: 'Unfold', labelKm: 'បើកចេញ', chinesePhrase: '展开后视镜' },
    ]
  },
  {
    id: 'ambient_light', category: 'Vehicle Controls', titleEn: 'Ambient Light', titleKm: 'ភ្លើងក្នុងឡាន',
    commands: [
      { id: 'ambient_on', labelEn: 'On', labelKm: 'បើក', chinesePhrase: '打开氛围灯' },
      { id: 'ambient_off', labelEn: 'Off', labelKm: 'បិទ', chinesePhrase: '关闭氛围灯' },
    ]
  },
  {
    id: 'screen_brightness', category: 'Vehicle Controls', titleEn: 'Screen', titleKm: 'អេក្រង់',
    commands: [
      { id: 'screen_dim', labelEn: 'Dim', labelKm: 'បន្ថយពន្លឺ', chinesePhrase: '调暗屏幕' },
      { id: 'screen_bright', labelEn: 'Brighten', labelKm: 'ដំឡើងពន្លឺ', chinesePhrase: '调亮屏幕' },
    ]
  },


  // Media
  {
    id: 'playback', category: 'Media & Entertainment', titleEn: 'Playback', titleKm: 'ចាក់តន្ត្រី',
    commands: [
      { id: 'music_play', labelEn: 'Play', labelKm: 'ចាក់', chinesePhrase: '播放音乐' },
      { id: 'music_pause', labelEn: 'Pause', labelKm: 'ផ្អាក', chinesePhrase: '暂停播放' },
    ]
  },
  {
    id: 'tracks', category: 'Media & Entertainment', titleEn: 'Tracks', titleKm: 'បទភ្លេង',
    commands: [
      { id: 'music_prev', labelEn: 'Prev', labelKm: 'មុន', chinesePhrase: '上一首' },
      { id: 'music_next', labelEn: 'Next', labelKm: 'បន្ទាប់', chinesePhrase: '下一首' },
    ]
  },
  {
    id: 'volume', category: 'Media & Entertainment', titleEn: 'Volume', titleKm: 'សំឡេង',
    commands: [
      { id: 'vol_down', labelEn: 'Down (-)', labelKm: 'បន្ថយ', chinesePhrase: '音量调小一点' },
      { id: 'vol_up', labelEn: 'Up (+)', labelKm: 'ដំឡើង', chinesePhrase: '音量调大一点' },
    ]
  },
  {
    id: 'radio', category: 'Media & Entertainment', titleEn: 'Radio', titleKm: 'វិទ្យុ',
    commands: [
      { id: 'radio_on', labelEn: 'Turn On', labelKm: 'បើក', chinesePhrase: '打开收音机' },
    ]
  },
  {
    id: 'mute_control', category: 'Media & Entertainment', titleEn: 'Mute', titleKm: 'បិទសំឡេង',
    commands: [
      { id: 'vol_mute', labelEn: 'Mute', labelKm: 'បិទ', chinesePhrase: '静音' },
      { id: 'vol_unmute', labelEn: 'Unmute', labelKm: 'បើក', chinesePhrase: '取消静音' },
    ]
  }
];
