import { VRMPose } from '@pixiv/three-vrm';

export const PeacePose: VRMPose = {
  // 中央部・頭部
  hips: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  spine: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  chest: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  neck: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  head: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },

  // 左腕（地面に対して20度の角度をつけて下ろす）
  // 回転の軸の説明：
  // X軸: 前後方向の回転（正の値で前方向に回転）
  // Y軸: 左右方向の回転（正の値で内側に回転）
  // Z軸: ねじれ方向の回転（正の値で時計回りに回転）
  // W値: 回転の強さ（1に近いほど自然な回転）
  leftShoulder: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  leftUpperArm: { rotation: [0, 0, 0.6, 0.8], position: [0, 0, 0] },    // 上腕: Z軸正方向に70度回転（90度から20度戻す）
  leftLowerArm: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },         // 前腕: 自然な状態
  leftHand: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },             // 手: 自然な状態

  // 左手指（自然な状態）
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

  leftThumbMetacarpal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  leftThumbProximal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  leftThumbDistal: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },

  // 右腕（ピース、Y軸方向に90度回転）
  // 回転の軸の説明：
  // X軸: 前後方向の回転（正の値で前方向に回転）
  // Y軸: 左右方向の回転（正の値で内側に回転）
  // Z軸: ねじれ方向の回転（正の値で時計回りに回転）
  // W値: 回転の強さ（1に近いほど自然な回転）
  rightShoulder: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },
  rightUpperArm: { rotation: [0, 0.707, 0, 0.707], position: [0, 0, 0] },    // 上腕: Y軸正方向に90度回転
  rightLowerArm: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },             // 前腕: 自然な状態
  rightHand: { rotation: [0, 0, 0, 1], position: [0, 0, 0] },                 // 手: 自然な状態

  // 右手指（ピースサイン、親指を他の指と同じように曲げる）
  // 回転の軸の説明：
  // X軸: 前後方向の回転（正の値で前方向に回転）
  // Y軸: 左右方向の回転（正の値で内側に回転）
  // Z軸: ねじれ方向の回転（正の値で時計回りに回転）
  // W値: 回転の強さ（1に近いほど自然な回転）
  rightIndexProximal: { rotation: [0, 0, 0.5, 0.866], position: [0, 0, 0] },    // 人差し指を立てる
  rightIndexIntermediate: { rotation: [0, 0, 0.3, 0.954], position: [0, 0, 0] },
  rightIndexDistal: { rotation: [0, 0, 0.2, 0.98], position: [0, 0, 0] },

  rightMiddleProximal: { rotation: [0, 0, 0.5, 0.866], position: [0, 0, 0] },   // 中指を立てる
  rightMiddleIntermediate: { rotation: [0, 0, 0.3, 0.954], position: [0, 0, 0] },
  rightMiddleDistal: { rotation: [0, 0, 0.2, 0.98], position: [0, 0, 0] },

  rightRingProximal: { rotation: [0, 0, -0.3, 0.954], position: [0, 0, 0] },    // 薬指を曲げる
  rightRingIntermediate: { rotation: [0, 0, -0.3, 0.954], position: [0, 0, 0] },
  rightRingDistal: { rotation: [0, 0, -0.3, 0.954], position: [0, 0, 0] },

  rightLittleProximal: { rotation: [0, 0, -0.3, 0.954], position: [0, 0, 0] },  // 小指を曲げる
  rightLittleIntermediate: { rotation: [0, 0, -0.3, 0.954], position: [0, 0, 0] },
  rightLittleDistal: { rotation: [0, 0, -0.3, 0.954], position: [0, 0, 0] },

  rightThumbMetacarpal: { rotation: [0, 0, 0.3, 0.954], position: [0, 0, 0] },  // 親指を少し曲げる
  rightThumbProximal: { rotation: [0, 0, 0.5, 0.866], position: [0, 0, 0] },    // 親指の付け根: Z軸正方向に60度回転
  rightThumbIntermediate: { rotation: [0, 0, 0.5, 0.866], position: [0, 0, 0] }, // 親指の中間: Z軸正方向に60度回転
  rightThumbDistal: { rotation: [0, 0, 0.5, 0.866], position: [0, 0, 0] },       // 親指の先端: Z軸正方向に60度回転

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
