import { VRMPose } from '@pixiv/three-vrm';

export const PeacePose: VRMPose = {
  // 中央部・頭部
  hips: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  spine: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  chest: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  neck: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  head: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },

  // 左腕（自然な状態）
  leftShoulder: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  leftUpperArm: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  leftLowerArm: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  leftHand: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },

  // 右腕（ピースポーズ）
  rightShoulder: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  rightUpperArm: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  rightLowerArm: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  rightHand: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },

  // 左手指（自然な状態）
  leftThumbProximal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  leftThumbDistal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  leftIndexProximal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  leftIndexIntermediate: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  leftIndexDistal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  leftMiddleProximal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  leftMiddleIntermediate: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  leftMiddleDistal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  leftRingProximal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  leftRingIntermediate: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  leftRingDistal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  leftLittleProximal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  leftLittleIntermediate: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  leftLittleDistal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },

  // 右手指（ピースポーズ）
  rightThumbProximal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  rightThumbDistal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  rightIndexProximal: { rotation: [0, 0, 0.5, 0.866], position: [0, 0, 0] }, // 人差し指を立てる
  rightIndexIntermediate: { rotation: [0, 0, 0.5, 0.866], position: [0, 0, 0] },
  rightIndexDistal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  rightMiddleProximal: { rotation: [0, 0, 0.5, 0.866], position: [0, 0, 0] }, // 中指を立てる
  rightMiddleIntermediate: { rotation: [0, 0, 0.5, 0.866], position: [0, 0, 0] },
  rightMiddleDistal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  rightRingProximal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  rightRingIntermediate: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  rightRingDistal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  rightLittleProximal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  rightLittleIntermediate: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  rightLittleDistal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },

  // 脚部（立ち姿勢、動かさない）
  leftUpperLeg: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  leftLowerLeg: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  leftFoot: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  rightUpperLeg: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  rightLowerLeg: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  rightFoot: { rotation: [0, 0, 0, 1], position: [0, 0, 0] }
}; 
