export const color = {
  bg: {
    canvas: '#FFFFFF',
    subtle: '#F7F7F8',
    muted: '#EFF0F1',
    elevated: '#FFFFFF',
    inverse: '#3B3D40',
    hover: 'rgba(20, 21, 23, 0.04)',
    pressed: 'rgba(20, 21, 23, 0.08)',
    selected: 'rgba(20, 21, 23, 0.08)',
    overlay: 'rgba(20, 21, 23, 0.4)',
    brand: '#4453FF',
    brand_hover: '#3745D7',
    brand_subtle: '#E6EDFF',
    danger: '#C71722',
    danger_subtle: '#FFE9E7',
    warning_subtle: '#FFF1E8',
    highlight: '#CFDBFE',
    highlight_active: '#A8BCFE',
    text_selection: 'rgba(68, 83, 255, 0.2)',
  },

  text: {
    primary: '#232426',
    secondary: '#55575B',
    tertiary: '#6D7073',
    disabled: '#A7A9AC',
    inverse: '#FFFFFF',
    on_brand: '#FFFFFF',
    brand: '#4453FF',
    danger: '#C71722',
    warning: '#D35F0F',
  },

  border: {
    subtle: '#EFF0F1',
    default: '#DFE0E2',
    strong: '#CACBCD',
    focus: '#6F8AFD',
    brand: '#4453FF',
    danger: '#E82532',
    warning: '#FDA36B',
  },

  icon: {
    primary: '#3B3D40',
    secondary: '#6D7073',
    disabled: '#A7A9AC',
    inverse: '#FFFFFF',
    brand: '#4453FF',
    danger: '#C71722',
    warning: '#FC7A15',
  },

  shadow: {
    color: 'rgba(20, 21, 23, 0.12)',
  },

  tag: {
    // tag/rose
    rose_bg: '#FFEFF1',
    rose_text: '#A13749',
    rose_dot: '#F26981',

    // tag/orange
    orange_bg: '#FFF1E8',
    orange_text: '#8E3906',
    orange_dot: '#FC7A15',

    // tag/amber
    amber_bg: '#FFF6E5',
    amber_text: '#825008',
    amber_dot: '#F9AD1B',

    // tag/lime
    lime_bg: '#F1FBDE',
    lime_text: '#3D6A08',
    lime_dot: '#92CD1A',

    // tag/green
    green_bg: '#DEF9E4',
    green_text: '#0B713F',
    green_dot: '#16AF60',

    // tag/teal
    teal_bg: '#D4FAF4',
    teal_text: '#0C746D',
    teal_dot: '#18B1A5',

    // tag/cyan
    cyan_bg: '#DEF7FF',
    cyan_text: '#0B6E89',
    cyan_dot: '#17ABCE',

    // tag/sky
    sky_bg: '#E9F4FF',
    sky_text: '#085E9B',
    sky_dot: '#1498F1',

    // tag/violet
    violet_bg: '#F4F1FF',
    violet_text: '#5D3D96',
    violet_dot: '#9E76EB',

    // tag/magenta
    magenta_bg: '#FFEEF8',
    magenta_text: '#923771',
    magenta_dot: '#E06AB5',

    // tag/default
    default_bg: '#EFF0F1',
    default_text: '#55575B',
    default_dot: '#8D8F93',
  },
} as const;
