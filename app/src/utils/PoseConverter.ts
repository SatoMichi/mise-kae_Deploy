import { VRMPose } from '@pixiv/three-vrm';

export class PoseConverter {
  /**
   * JSONから読み込んだポーズデータをVRMの座標系に変換します
   * @param jsonPose JSONから読み込んだポーズデータ
   * @returns VRMの座標系に変換されたポーズデータ
   */
  public static convertFromJSON(jsonPose: VRMPose): VRMPose {
    const convertedPose: VRMPose = {};

    // 各ボーンの回転を変換
    Object.entries(jsonPose).forEach(([boneName, boneData]) => {
      if (boneData.rotation) {
        // X軸とZ軸の回転を反転
        convertedPose[boneName as keyof VRMPose] = {
          rotation: [
            -boneData.rotation[0], // X軸を反転
            boneData.rotation[1],  // Y軸はそのまま
            -boneData.rotation[2], // Z軸を反転
            boneData.rotation[3]   // W値はそのまま
          ],
          position: boneData.position || [0, 0, 0]
        };
      }
    });

    return convertedPose;
  }

  /**
   * JSONファイルからポーズを読み込み、変換します
   * @param jsonString JSONファイルの内容
   * @returns 変換されたポーズデータ
   */
  public static fromJSONString(jsonString: string): VRMPose {
    try {
      const jsonPose = JSON.parse(jsonString) as VRMPose;
      return this.convertFromJSON(jsonPose);
    } catch (error) {
      console.error('JSONのパースに失敗:', error);
      throw error;
    }
  }

  /**
   * ポーズデータをJSONファイル用の形式に変換します
   * @param vrmPose VRMの座標系のポーズデータ
   * @returns JSONファイル用の形式に変換されたポーズデータ
   */
  public static convertToJSON(vrmPose: VRMPose): VRMPose {
    const jsonPose: VRMPose = {};

    // 各ボーンの回転を変換
    Object.entries(vrmPose).forEach(([boneName, boneData]) => {
      if (boneData.rotation) {
        // X軸とZ軸の回転を反転して元の形式に戻す
        jsonPose[boneName as keyof VRMPose] = {
          rotation: [
            -boneData.rotation[0], // X軸を反転
            boneData.rotation[1],  // Y軸はそのまま
            -boneData.rotation[2], // Z軸を反転
            boneData.rotation[3]   // W値はそのまま
          ],
          position: boneData.position || [0, 0, 0]
        };
      }
    });

    return jsonPose;
  }

  /**
   * ポーズデータをJSON文字列に変換します
   * @param vrmPose VRMの座標系のポーズデータ
   * @returns JSON文字列
   */
  public static toJSONString(vrmPose: VRMPose): string {
    const jsonPose = this.convertToJSON(vrmPose);
    return JSON.stringify(jsonPose, null, 2);
  }

  /**
   * JSONポーズをVRMポーズに変換します
   * @param jsonPose JSON形式のポーズデータ
   * @returns VRMポーズ
   */
  public static convertToVRMPose(jsonPose: any): VRMPose {
    console.log('JSONポーズの変換開始:', {
      input: jsonPose,
      keys: Object.keys(jsonPose)
    });

    // ネストされたポーズデータを取得
    const poseData = jsonPose.pose || jsonPose;
    console.log('処理するポーズデータ:', poseData);

    // ポーズデータが空でないことを確認
    if (!poseData || Object.keys(poseData).length === 0) {
      console.error('ポーズデータが空です');
      return {};
    }

    const vrmPose = this.convertFromJSON(poseData);

    console.log('JSONポーズの変換結果:', {
      output: vrmPose,
      keys: Object.keys(vrmPose),
      hasRotation: Object.entries(vrmPose).some(([_, data]) => data.rotation !== undefined),
      hasPosition: Object.entries(vrmPose).some(([_, data]) => data.position !== undefined),
      sampleBone: Object.entries(vrmPose)[0] // 最初のボーンのデータをサンプルとして表示
    });

    return vrmPose;
  }

  /**
   * VRMポーズをJSONポーズに変換します
   * @param vrmPose VRMポーズ
   * @returns JSON形式のポーズデータ
   */
  public static convertToJsonPose(vrmPose: VRMPose): any {
    // 既存のconvertToJSONメソッドを流用
    return this.convertToJSON(vrmPose);
  }
} 
