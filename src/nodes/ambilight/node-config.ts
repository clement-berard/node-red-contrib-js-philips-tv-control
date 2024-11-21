import { JOINTSPACE_CONSTANTS } from 'philtv-js/constants';

export const actionsDefinition = [
  {
    text: 'Set Brightness',
    value: 'set_brightness',
  },
  {
    text: 'Set Video Mode',
    value: 'set_video_mode',
  },
];

export const ambilightChangeBrightnessAvailableValues =
  JOINTSPACE_CONSTANTS.ambilight.ambilightChangeBrightnessAvailableSinglesValues;
export const AmbilightFollowVideoModeEnum = JOINTSPACE_CONSTANTS.ambilight.followVideoMode;

export const assumedValues = {
  set_brightness: ambilightChangeBrightnessAvailableValues,
  set_video_mode: AmbilightFollowVideoModeEnum,
};
