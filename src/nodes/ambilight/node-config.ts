import {
  ambilightBrightnessChoices,
  ambilightFollowAudioModeEnum,
  ambilightFollowVideoModeEnum,
} from 'philtv-js/constants';

export const actionsDefinition = [
  {
    text: 'Set Brightness',
    value: 'set_brightness',
  },
  {
    text: 'Increase Brightness',
    value: 'increase_brightness',
  },
  {
    text: 'Decrease Brightness',
    value: 'decrease_brightness',
  },
  {
    text: 'Set Video Mode',
    value: 'set_video_mode',
  },
  {
    text: 'Set Audio Mode',
    value: 'set_audio_mode',
  },
];

export const assumedValues = {
  set_brightness: ambilightBrightnessChoices.map(String),
  set_video_mode: ambilightFollowVideoModeEnum,
  set_audio_mode: ambilightFollowAudioModeEnum,
};
