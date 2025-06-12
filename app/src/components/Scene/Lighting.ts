import * as THREE from 'three';

export class Lighting {
  private lights: THREE.Light[] = [];

  constructor() {
    // 環境光（全体を明るくする）
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.lights.push(ambientLight);

    // メインライト（前面からの光）
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(1, 1, 1).normalize();
    this.lights.push(mainLight);

    // 補助ライト（背面からの光）
    const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
    backLight.position.set(-1, 0.5, -1).normalize();
    this.lights.push(backLight);

    // 上部からの光
    const topLight = new THREE.DirectionalLight(0xffffff, 0.4);
    topLight.position.set(0, 1, 0).normalize();
    this.lights.push(topLight);
  }

  public addToScene(scene: THREE.Scene) {
    this.lights.forEach(light => scene.add(light));
  }

  public removeFromScene(scene: THREE.Scene) {
    this.lights.forEach(light => scene.remove(light));
  }
} 
