export type CommandCategory = 'Climate Control' | 'Vehicle Controls' | 'Media & Entertainment' | 'Navigation & Phone';

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

  // Vehicle Controls
  {
    id: 'windows', category: 'Vehicle Controls', titleEn: 'Windows', titleKm: 'កញ្ចក់ឡាន',
    commands: [
      { id: 'window_open', labelEn: 'Open', labelKm: 'បើក', chinesePhrase: '打开车窗' },
      { id: 'window_crack', labelEn: 'Open a Bit', labelKm: 'បើកបន្តិច', chinesePhrase: '把车窗打开一条缝' },
      { id: 'window_close', labelEn: 'Close', labelKm: 'បិទ', chinesePhrase: '关闭车窗' },
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
    id: 'sunshade', category: 'Vehicle Controls', titleEn: 'Sunshade', titleKm: 'វាំងននបាំងថ្ងៃ',
    commands: [
      { id: 'sunshade_open', labelEn: 'Open', labelKm: 'បើក', chinesePhrase: '打开遮阳帘' },
      { id: 'sunshade_close', labelEn: 'Close', labelKm: 'បិទ', chinesePhrase: '关闭遮阳帘' },
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
    id: 'doors', category: 'Vehicle Controls', titleEn: 'Doors', titleKm: 'ទ្វារឡាន',
    commands: [
      { id: 'door_lock', labelEn: 'Lock', labelKm: 'ចាក់សោ', chinesePhrase: '锁定车门' },
      { id: 'door_unlock', labelEn: 'Unlock', labelKm: 'ដោះសោ', chinesePhrase: '解锁车门' },
    ]
  },
  {
    id: 'steering', category: 'Vehicle Controls', titleEn: 'Steering', titleKm: 'ចង្កូត',
    commands: [
      { id: 'steer_heat', labelEn: 'Heating', labelKm: 'កម្តៅ', chinesePhrase: '打开方向盘加热' },
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

  // Navigation & Phone
  {
    id: 'nav_dest', category: 'Navigation & Phone', titleEn: 'Navigation', titleKm: 'នាំផ្លូវ',
    commands: [
      { id: 'nav_home', labelEn: 'Home', labelKm: 'ផ្ទះ', chinesePhrase: '导航回家' },
      { id: 'nav_company', labelEn: 'Company', labelKm: 'ក្រុមហ៊ុន', chinesePhrase: '导航去公司' },
      { id: 'nav_cancel', labelEn: 'Cancel', labelKm: 'បោះបង់', chinesePhrase: '取消导航' },
    ]
  },
  {
    id: 'find_poi', category: 'Navigation & Phone', titleEn: 'Find POI', titleKm: 'ស្វែងរកទីតាំង',
    commands: [
      { id: 'find_gas', labelEn: 'Gas', labelKm: 'ប្រេង', chinesePhrase: '找一下附近的加油站' },
      { id: 'find_charge', labelEn: 'Charge', labelKm: 'សាកថ្ម', chinesePhrase: '找一下附近的充电站' },
    ]
  },
  {
    id: 'map_zoom', category: 'Navigation & Phone', titleEn: 'Map Zoom', titleKm: 'ពង្រីក/បង្រួមផែនទី',
    commands: [
      { id: 'map_zoom_out', labelEn: 'Out (-)', labelKm: 'បង្រួម', chinesePhrase: '缩小地图' },
      { id: 'map_zoom_in', labelEn: 'In (+)', labelKm: 'ពង្រីក', chinesePhrase: '放大地图' },
    ]
  },
  {
    id: 'phone_call', category: 'Navigation & Phone', titleEn: 'Phone Call', titleKm: 'ទូរស័ព្ទ',
    commands: [
      { id: 'call_answer', labelEn: 'Answer', labelKm: 'ទទួល', chinesePhrase: '接听电话' },
      { id: 'call_hangup', labelEn: 'Hang Up', labelKm: 'ដាក់ចុះ', chinesePhrase: '挂断电话' },
      { id: 'call_wife', labelEn: 'Call Wife', labelKm: 'តេប្រពន្ធ', chinesePhrase: '打电话给老婆' },
    ]
  }
];
