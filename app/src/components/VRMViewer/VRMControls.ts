import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { VRM } from '@pixiv/three-vrm';
import { ClothingManagerProps } from '../../types/vrm';

export class ClothingManager {
  private vrm: VRM | null = null;
  private clothingMesh: THREE.SkinnedMesh | null = null;
  private container: HTMLDivElement;
  private selectElement: HTMLSelectElement;

  constructor(
    private props: ClothingManagerProps,
    private scene: THREE.Scene
  ) {
    // UIの作成
    this.container = document.createElement('div');
    this.container.style.position = 'absolute';
    this.container.style.top = '10px';
    this.container.style.left = '10px';
    this.container.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    this.container.style.padding = '10px';
    this.container.style.borderRadius = '5px';
    this.container.style.zIndex = '1000';

    // セレクトボックスの作成
    this.selectElement = document.createElement('select');
    this.selectElement.style.width = '200px';
    this.selectElement.style.padding = '5px';
    this.selectElement.style.marginRight = '10px';

    // デフォルトオプションの追加
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '衣服を選択してください';
    this.selectElement.appendChild(defaultOption);

    // セレクトボックスのイベントリスナー
    this.selectElement.addEventListener('change', async (event) => {
      const target = event.target as HTMLSelectElement;
      if (target.value) {
        try {
          await this.loadClothing(`/assets/clothes/${target.value}`);
        } catch (error) {
          console.error('衣服の読み込みに失敗:', error);
          if (this.props.onError && error instanceof Error) {
            this.props.onError(error);
          }
        }
      } else {
        this.dispose();
      }
    });

    // UIの組み立て
    this.container.appendChild(this.selectElement);
    document.body.appendChild(this.container);
  }

  /**
   * 利用可能な衣服のリストを更新します
   */
  public async updateClothingList(): Promise<void> {
    try {
      const response = await fetch('/assets/clothes/');
      const files = await response.json();
      
      // 既存のオプションをクリア（デフォルトオプションを除く）
      while (this.selectElement.options.length > 1) {
        this.selectElement.remove(1);
      }

      // 新しいオプションを追加
      files.forEach((file: string) => {
        if (file.endsWith('.glb') || file.endsWith('.gltf') || file.endsWith('.fbx')) {
          const option = document.createElement('option');
          option.value = file;
          option.textContent = file.replace(/\.[^/.]+$/, ''); // 拡張子を除去
          this.selectElement.appendChild(option);
        }
      });
    } catch (error) {
      console.error('衣服リストの取得に失敗:', error);
    }
  }

  /**
   * 衣服モデルを読み込んでVRMモデルに合成します
   */
  public async loadClothing(clothingPath: string): Promise<void> {
    try {
      // 既存の衣服を削除
      this.dispose();

      let clothingMesh: THREE.SkinnedMesh | null = null;

      // ファイル形式に応じてローダーを選択
      if (clothingPath.endsWith('.fbx')) {
        // FBXファイルの読み込み
        const loader = new FBXLoader();
        const fbx = await new Promise<THREE.Group>((resolve, reject) => {
          loader.load(
            clothingPath,
            (fbx) => resolve(fbx),
            undefined,
            (error) => reject(error)
          );
        });

        // FBXからSkinnedMeshを探す
        fbx.traverse((child) => {
          if (child instanceof THREE.SkinnedMesh && !clothingMesh) {
            clothingMesh = child;
          }
        });

        if (!clothingMesh) {
          throw new Error('FBXモデルにSkinnedMeshが見つかりません');
        }
      } else {
        // GLTF/GLBファイルの読み込み
        const loader = new GLTFLoader();
        const gltf = await new Promise<THREE.GLTF>((resolve, reject) => {
          loader.load(
            clothingPath,
            (gltf) => resolve(gltf),
            undefined,
            (error) => reject(error)
          );
        });

        clothingMesh = gltf.scene.children.find(
          (child) => child instanceof THREE.SkinnedMesh
        ) as THREE.SkinnedMesh;

        if (!clothingMesh) {
          throw new Error('GLTFモデルにSkinnedMeshが見つかりません');
        }
      }

      // VRMモデルの取得
      this.vrm = this.props.vrm;
      if (!this.vrm) {
        throw new Error('VRMモデルが設定されていません');
      }

      // ボーンのマッピング
      await this.mapBones(clothingMesh);

      // 衣服をVRMモデルに追加
      this.vrm.scene.add(clothingMesh);
      this.clothingMesh = clothingMesh;

      console.log('衣服の合成が完了しました');
    } catch (error) {
      console.error('衣服の合成に失敗:', error);
      throw error;
    }
  }

  /**
   * 衣服のボーンをVRMモデルのボーンにマッピングします
   */
  private async mapBones(clothingMesh: THREE.SkinnedMesh): Promise<void> {
    if (!this.vrm) return;

    // VRMモデルのボーン情報を取得
    // @ts-ignore: VRMの型定義が不完全なため
    const humanoid = this.vrm.humanoid;
    if (!humanoid) {
      throw new Error('VRMモデルにHumanoidが見つかりません');
    }

    // ボーンのマッピング情報
    const boneMapping: { [key: string]: string } = {
      // 上半身
      'spine': 'spine',
      'chest': 'chest',
      'upperChest': 'upperChest',
      'neck': 'neck',
      'head': 'head',
      // 左腕
      'leftShoulder': 'leftShoulder',
      'leftUpperArm': 'leftUpperArm',
      'leftLowerArm': 'leftLowerArm',
      'leftHand': 'leftHand',
      // 右腕
      'rightShoulder': 'rightShoulder',
      'rightUpperArm': 'rightUpperArm',
      'rightLowerArm': 'rightLowerArm',
      'rightHand': 'rightHand',
      // 下半身
      'hips': 'hips',
      // 'spine': 'spine',  // 重複しているので削除
      // 左足
      'leftUpperLeg': 'leftUpperLeg',
      'leftLowerLeg': 'leftLowerLeg',
      'leftFoot': 'leftFoot',
      'leftToes': 'leftToes',
      // 右足
      'rightUpperLeg': 'rightUpperLeg',
      'rightLowerLeg': 'rightLowerLeg',
      'rightFoot': 'rightFoot',
      'rightToes': 'rightToes'
    };

    // 衣服のボーンをVRMモデルのボーンにマッピング
    const newBones: THREE.Bone[] = [];
    const boneNameMap: { [key: string]: number } = {};

    clothingMesh.skeleton.bones.forEach((bone, index) => {
      const vrmBoneName = boneMapping[bone.name];
      if (vrmBoneName) {
        // @ts-ignore: VRMの型定義が不完全なため
        const vrmBone = humanoid.getBoneNode(vrmBoneName);
        if (vrmBone) {
          newBones.push(vrmBone);
          boneNameMap[bone.name] = index;
        }
      }
    });

    // ボーンのマッピングを更新
    clothingMesh.skeleton.bones = newBones;
    clothingMesh.bind(clothingMesh.skeleton, clothingMesh.bindMatrix);

    // スキンメッシュの更新
    clothingMesh.updateMatrixWorld(true);
  }

  /**
   * 衣服の位置とスケールを調整します
   */
  public adjustClothing(scale: number = 1.0, offset: THREE.Vector3 = new THREE.Vector3()): void {
    if (!this.clothingMesh) return;

    this.clothingMesh.scale.set(scale, scale, scale);
    this.clothingMesh.position.copy(offset);
    this.clothingMesh.updateMatrixWorld(true);
  }

  /**
   * 衣服を削除します
   */
  public dispose(): void {
    if (this.clothingMesh && this.vrm) {
      this.vrm.scene.remove(this.clothingMesh);
      this.clothingMesh = null;
    }
  }

  /**
   * UIを削除します
   */
  public disposeUI(): void {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
} 
