import { VRMPose } from '@pixiv/three-vrm';

export interface PoseDefinition {
  name: string;
  description: string;
  pose: VRMPose;
}

export const DefaultPoses: { [key: string]: PoseDefinition } = {
  // プリセットポーズの定義
  peace: {
    name: 'ピース',
    description: '右手でピースサイン、左手を腰に当てる',
    pose: {
      // ピースポーズの定義
      rightIndexProximal: { rotation: [0, 0, 0.5, 0.866], position: [0, 0, 0] },
      rightMiddleProximal: { rotation: [0, 0, 0.5, 0.866], position: [0, 0, 0] },
      rightRingProximal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
      rightLittleProximal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
      rightThumbProximal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
      leftUpperArm: { rotation: [0, 0, 0, 1], position: [0, 0, 0] }
    }
  },
  hi: {
    name: 'ハイ',
    description: '手を振るポーズ',
    pose: {
      rightUpperArm: { rotation: [0, 0, 0.5, 0.866], position: [0, 0, 0] },
      rightLowerArm: { rotation: [0, 0, 0.5, 0.866], position: [0, 0, 0] }
    }
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
