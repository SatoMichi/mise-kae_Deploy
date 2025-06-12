import { VRMPose } from '@pixiv/three-vrm';
import { PoseConverter } from './PoseConverter';
import { PoseFileManager, PoseDefinition } from './PoseFileManager';

export class Pose {
  private static instance: Pose;
  private currentPose: VRMPose = {};
  private poseFileManager: PoseFileManager;

  private constructor() {
    this.poseFileManager = PoseFileManager.getInstance();
  }

  public static getInstance(): Pose {
    if (!Pose.instance) {
      Pose.instance = new Pose();
    }
    return Pose.instance;
  }

  /**
   * 現在のポーズを取得します
   */
  public getCurrentPose(): VRMPose {
    return this.currentPose;
  }

  /**
   * ポーズを設定します
   * @param pose 設定するポーズ
   */
  public setPose(pose: VRMPose): void {
    this.currentPose = pose;
  }

  /**
   * JSONファイルからポーズを読み込みます
   * @param filePath JSONファイルのパス
   */
  public async loadPoseFromFile(filePath: string): Promise<void> {
    try {
      const poseDef = await this.poseFileManager.loadPoseFromFile(filePath);
      this.currentPose = poseDef.pose;
    } catch (error) {
      console.error('ポーズの読み込みに失敗:', error);
      throw error;
    }
  }

  /**
   * 現在のポーズをJSONファイルとして保存します
   * @param filePath 保存先のファイルパス
   */
  public async savePoseToFile(filePath: string): Promise<void> {
    try {
      const jsonString = PoseConverter.toJSONString(this.currentPose);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = filePath.split('/').pop() || 'pose.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('ポーズの保存に失敗:', error);
      throw error;
    }
  }

  /**
   * ポーズディレクトリから全てのポーズを読み込みます
   * @param directoryPath ポーズディレクトリのパス
   */
  public async loadPosesFromDirectory(directoryPath: string): Promise<void> {
    try {
      await this.poseFileManager.loadPosesFromDirectory(directoryPath);
    } catch (error) {
      console.error('ポーズディレクトリの読み込みに失敗:', error);
      throw error;
    }
  }

  /**
   * 保存されている全てのポーズ定義を取得します
   */
  public getAllPoses(): PoseDefinition[] {
    return this.poseFileManager.getAllPoses();
  }

  /**
   * ポーズを保存します
   * @param name ポーズ名
   * @param description ポーズの説明
   */
  public savePose(name: string, description: string): void {
    const poseDef: PoseDefinition = {
      name,
      description,
      pose: this.currentPose
    };
    this.poseFileManager.savePose(poseDef);
  }

  /**
   * ポーズを削除します
   * @param poseName 削除するポーズの名前
   */
  public deletePose(poseName: string): void {
    this.poseFileManager.deletePose(poseName);
  }
} 
