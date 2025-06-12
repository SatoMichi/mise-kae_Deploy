import { VRMPose } from '@pixiv/three-vrm';

export const HiPose: VRMPose = {
  // 中央部・頭部
  hips: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  spine: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  chest: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  neck: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  head: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },

  // 左腕（Hiポーズ）
  // 回転の軸の説明：
  // X軸: 前後方向の回転（正の値で前方向に回転）
  // Y軸: 左右方向の回転（正の値で内側に回転）
  // Z軸: ねじれ方向の回転（正の値で時計回りに回転）
  // W値: 回転の強さ（1に近いほど自然な回転）
  leftShoulder: { rotation: [-0.009528, -0.065063, -0.144585, 0.987305], position: [0, 0, 0] },
  leftUpperArm: { rotation: [0.448046, -0.069738, 0.039611, 0.890406], position: [0, 0, 0] },
  leftLowerArm: { rotation: [0, -0.775219, 0, 0.631693], position: [0, 0, 0] },
  leftHand: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },

  // 右腕（Hiポーズ）
  rightShoulder: { rotation: [-0.048041, 0.370482, 0.119285, 0.919895], position: [0, 0, 0] },
  rightUpperArm: { rotation: [-0.085411, -0.360893, -0.691625, 0.619771], position: [0, 0, 0] },
  rightLowerArm: { rotation: [0, 0.520643, 0, 0.853774], position: [0, 0, 0] },
  rightHand: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },

  // 左手指（自然な状態）
  leftThumbMetacarpal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  leftThumbProximal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  leftThumbIntermediate: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
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

  // 右手指（自然な状態）
  rightThumbMetacarpal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  rightThumbProximal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  rightThumbIntermediate: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  rightThumbDistal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  rightIndexProximal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  rightIndexIntermediate: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  rightIndexDistal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  rightMiddleProximal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  rightMiddleIntermediate: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
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
  leftToes: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  rightUpperLeg: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  rightLowerLeg: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  rightFoot: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  rightToes: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },

  // 目（動かさない）
  leftEye: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  rightEye: { rotation: [0, 0, 0, 1], position: [0, 0, 0] }
}; 
