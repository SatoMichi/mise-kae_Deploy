import { PoseManager } from './PoseManager';
import { VRMPose } from '@pixiv/three-vrm';
import { PoseConverter } from '../../utils/PoseConverter';

export class PoseUploader {
  private container: HTMLDivElement;
  private fileInput: HTMLInputElement;

  constructor(private poseManager: PoseManager) {
    this.setupUI();
  }

  private setupUI() {
    // メインコンテナ
    this.container = document.createElement('div');
    this.container.style.position = 'absolute';
    this.container.style.top = '60px';  // PoseControlsの下に配置
    this.container.style.right = '10px';
    this.container.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    this.container.style.padding = '15px';
    this.container.style.borderRadius = '5px';
    this.container.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    this.container.style.zIndex = '1000';
    this.container.style.width = '200px';

    // ファイル入力
    this.fileInput = document.createElement('input');
    this.fileInput.type = 'file';
    this.fileInput.accept = '.json';
    this.fileInput.style.display = 'none';
    document.body.appendChild(this.fileInput);

    // ファイル選択時のイベントハンドラを設定
    this.fileInput.addEventListener('change', (event) => this.handleFileUpload(event));

    // アップロードボタン
    const uploadButton = document.createElement('button');
    uploadButton.textContent = 'ポーズをアップロード';
    uploadButton.style.width = '100%';
    uploadButton.style.padding = '8px';
    uploadButton.style.backgroundColor = '#4CAF50';
    uploadButton.style.color = 'white';
    uploadButton.style.border = 'none';
    uploadButton.style.borderRadius = '4px';
    uploadButton.style.cursor = 'pointer';

    uploadButton.addEventListener('click', () => {
      this.fileInput.click(); // ファイル選択ダイアログを開く
    });

    // UIの組み立て
    this.container.appendChild(uploadButton);

    // ドキュメントに追加
    document.body.appendChild(this.container);
  }

  private async handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    if (!file.name.endsWith('.json')) {
      console.error('JSONファイルのみアップロード可能です');
      return;
    }

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);
      console.log('アップロードされたJSONポーズ:', {
        fullData: jsonData,
        version: jsonData.version,
        hasPose: 'pose' in jsonData,
        poseKeys: 'pose' in jsonData ? Object.keys(jsonData.pose) : [],
        sampleBone: 'pose' in jsonData ? Object.entries(jsonData.pose).slice(0, 2) : []
      });

      // JSONポーズをVRMポーズに変換
      const convertedPose = PoseConverter.convertToVRMPose(jsonData);
      console.log('変換後のVRMポーズ:', {
        pose: convertedPose,
        bones: Object.keys(convertedPose),
        sampleBone: Object.entries(convertedPose).slice(0, 2)
      });

      // ポーズを適用（JSONアップロードフラグをtrueに設定）
      this.poseManager.applyPose(convertedPose, true);
      console.log('ポーズを適用しました:', {
        fileName: file.name,
        pose: convertedPose,
        bones: Object.keys(convertedPose),
        sampleBone: Object.entries(convertedPose).slice(0, 2)
      });

    } catch (error) {
      console.error('JSONファイルの読み込みに失敗しました:', error);
      alert('ポーズファイルの読み込みに失敗しました。正しいJSONファイルを選択してください。');
    } finally {
      // ファイル選択をクリアして、同じファイルを再度選択できるようにする
      input.value = '';
    }
  }

  public dispose() {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
} 
