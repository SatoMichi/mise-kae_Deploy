import * as THREE from 'three';

export class Camera {
  private camera: THREE.PerspectiveCamera;

  constructor() {
    this.camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 1.5, 2);
    this.camera.lookAt(0, 1, 0);
  }

  public getCamera() {
    return this.camera;
  }

  public updateAspect() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  public reset() {
    this.camera.position.set(0, 1.5, 2);
    this.camera.lookAt(0, 1, 0);
  }
} 
