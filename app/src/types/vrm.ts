import { VRM } from '@pixiv/three-vrm';

export type BlendShapePresetName = {
  Joy: 'joy';
  Angry: 'angry';
  Sorrow: 'sorrow';
  Fun: 'fun';
  LookUp: 'lookUp';
  LookDown: 'lookDown';
  LookLeft: 'lookLeft';
  LookRight: 'lookRight';
  Blink: 'blink';
  BlinkLeft: 'blinkLeft';
  BlinkRight: 'blinkRight';
  A: 'a';
  I: 'i';
  U: 'u';
  E: 'e';
  O: 'o';
};

export const BlendShapePreset: BlendShapePresetName = {
  Joy: 'joy',
  Angry: 'angry',
  Sorrow: 'sorrow',
  Fun: 'fun',
  LookUp: 'lookUp',
  LookDown: 'lookDown',
  LookLeft: 'lookLeft',
  LookRight: 'lookRight',
  Blink: 'blink',
  BlinkLeft: 'blinkLeft',
  BlinkRight: 'blinkRight',
  A: 'a',
  I: 'i',
  U: 'u',
  E: 'e',
  O: 'o',
} as const;

export interface VRMViewerProps {
  modelPath: string;
  onLoad?: (vrm: VRM) => void;
  onError?: (error: Error) => void;
}

export interface ClothingManagerProps {
  vrm: VRM | null;
  onError?: (error: Error) => void;
} 
