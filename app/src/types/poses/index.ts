import { VRMPose } from '@pixiv/three-vrm';

export interface PoseDefinition {
  [key: string]: {
    rotation: [number, number, number, number];
    position: [number, number, number];
  };
}

export const DefaultPoses: { [key: string]: PoseDefinition } = {
  // プリセットポーズの定義
  peace: {
    // ピースポーズの定義
  },
  hi: {
    // 手を振るポーズの定義
  }
};

// デバッグ用：ポーズの定義を確認
console.log('DefaultPoses定義:', {
  keys: Object.keys(DefaultPoses),
  entries: Object.entries(DefaultPoses).map(([key, pose]) => ({
    key,
    name: pose.name,
    description: pose.description
  }))
}); 
