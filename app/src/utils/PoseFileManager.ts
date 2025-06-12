import { VRMPose } from '@pixiv/three-vrm';
import { PoseConverter } from './PoseConverter';

export interface PoseDefinition {
  name: string;
  description: string;
  pose: VRMPose;
}

export class PoseFileManager {
  private static instance: PoseFileManager;
  private poses: { [key: string]: PoseDefinition } = {};

  private constructor() {}

  public static getInstance(): PoseFileManager {
    if (!PoseFileManager.instance) {
      PoseFileManager.instance = new PoseFileManager();
    }
    return PoseFileManager.instance;
  }

  /**
   * JSONファイルからポーズを読み込みます
   * @param filePath JSONファイルのパス
   * @returns 読み込んだポーズの定義
   */
  public async loadPoseFromFile(filePath: string): Promise<PoseDefinition> {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`ファイルの読み込みに失敗: ${response.statusText}`);
      }

      const jsonString = await response.text();
      const pose = PoseConverter.fromJSONString(jsonString);

      // ファイル名からポーズ名を生成
      const fileName = filePath.split('/').pop()?.replace('.json', '') || 'unknown';
      const poseName = this.formatPoseName(fileName);

      return {
        name: poseName,
        description: `${poseName}のポーズ`,
        pose: pose
      };
    } catch (error) {
      console.error('ポーズの読み込みに失敗:', error);
      throw error;
    }
  }

  /**
   * ディレクトリ内の全てのポーズファイルを読み込みます
   * @param directoryPath ポーズファイルが格納されているディレクトリのパス
   */
  public async loadPosesFromDirectory(directoryPath: string): Promise<void> {
    try {
      const response = await fetch(directoryPath);
      if (!response.ok) {
        throw new Error(`ディレクトリの読み込みに失敗: ${response.statusText}`);
      }

      const files = await response.json();
      for (const file of files) {
        if (file.endsWith('.json')) {
          const poseDef = await this.loadPoseFromFile(`${directoryPath}/${file}`);
          const key = this.getPoseKey(poseDef.name);
          this.poses[key] = poseDef;
        }
      }
    } catch (error) {
      console.error('ポーズディレクトリの読み込みに失敗:', error);
      throw error;
    }
  }

  /**
   * ポーズを保存します
   * @param poseDef 保存するポーズの定義
   */
  public savePose(poseDef: PoseDefinition): void {
    const key = this.getPoseKey(poseDef.name);
    this.poses[key] = poseDef;
  }

  /**
   * ポーズを削除します
   * @param poseName 削除するポーズの名前
   */
  public deletePose(poseName: string): void {
    const key = this.getPoseKey(poseName);
    delete this.poses[key];
  }

  /**
   * 全てのポーズ定義を取得します
   * @returns ポーズ定義の配列
   */
  public getAllPoses(): PoseDefinition[] {
    return Object.values(this.poses);
  }

  /**
   * ポーズ名からキーを生成します
   * @param poseName ポーズ名
   * @returns ポーズのキー
   */
  private getPoseKey(poseName: string): string {
    return poseName.toLowerCase().replace(/\s+/g, '');
  }

  /**
   * ファイル名からポーズ名を生成します
   * @param fileName ファイル名
   * @returns フォーマットされたポーズ名
   */
  private formatPoseName(fileName: string): string {
    // ファイル名から拡張子を除去し、キャメルケースをスペース区切りの単語に変換
    return fileName
      .replace(/([A-Z])/g, ' $1') // キャメルケースをスペース区切りに
      .replace(/^./, str => str.toUpperCase()) // 先頭を大文字に
      .trim();
  }
} 
