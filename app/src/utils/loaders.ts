import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRM } from '@pixiv/three-vrm';

export class PromiseGLTFLoader extends GLTFLoader {
  promiseLoad(
    url: string,
    onProgress?: ((event: ProgressEvent<EventTarget>) => void) | undefined,
  ) {
    return new Promise<GLTF>((resolve, reject) => {
      super.load(url, resolve, onProgress, reject);
    });
  }
}

export const createVRMLoader = () => {
  const loader = new PromiseGLTFLoader();
  loader.register((parser) => {
    return new VRMLoaderPlugin(parser);
  });
  return loader;
};

export const loadVRM = async (
  loader: PromiseGLTFLoader,
  modelPath: string,
  onProgress?: (progress: number) => void
): Promise<VRM> => {
  try {
    const gltf = await loader.promiseLoad(
      modelPath,
      (progress) => {
        if (onProgress) {
          onProgress(100.0 * (progress.loaded / progress.total));
        }
      }
    );

    const vrm = gltf.userData.vrm;
    if (!vrm) {
      throw new Error('VRMデータが見つかりません');
    }

    return vrm;
  } catch (error) {
    console.error('VRMファイルの読み込み中にエラーが発生:', error);
    throw new Error(`VRMファイルの読み込みに失敗しました: ${error}`);
  }
}; 
