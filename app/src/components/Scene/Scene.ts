import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

export class Scene {
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private labelRenderer: CSS2DRenderer;
  private controls: OrbitControls;

  constructor(
    private camera: THREE.PerspectiveCamera,
    container: HTMLElement
  ) {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(this.renderer.domElement);

    // ラベルレンダラーの初期化
    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0px';
    this.labelRenderer.domElement.style.pointerEvents = 'none';
    container.appendChild(this.labelRenderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0.85, 0);
    this.controls.screenSpacePanning = true;
    this.controls.update();

    this.setupHelpers();
    this.setupEventListeners();
  }

  private setupHelpers() {
    const gridHelper = new THREE.GridHelper(10, 10);
    this.scene.add(gridHelper);
    gridHelper.visible = true;

    // カスタム軸ヘルパーの作成
    const axisLength = 0.5;
    const axisColors = [0xff0000, 0x00ff00, 0x0000ff]; // RGB
    const axisLabels = ['X', 'Y', 'Z'];
    const axisDirections = [
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, 0, 1)
    ];

    // 各軸の線とラベルを作成
    axisDirections.forEach((direction, i) => {
      // 軸の線
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        direction.multiplyScalar(axisLength)
      ]);
      const material = new THREE.LineBasicMaterial({ color: axisColors[i] });
      const line = new THREE.Line(geometry, material);
      this.scene.add(line);

      // 軸のラベル
      const labelDiv = document.createElement('div');
      labelDiv.className = 'axis-label';
      labelDiv.textContent = axisLabels[i];
      labelDiv.style.color = `#${axisColors[i].toString(16).padStart(6, '0')}`;
      labelDiv.style.fontSize = '16px';
      labelDiv.style.fontWeight = 'bold';
      labelDiv.style.fontFamily = 'Arial, sans-serif';
      labelDiv.style.pointerEvents = 'none';

      const label = new CSS2DObject(labelDiv);
      label.position.copy(direction.multiplyScalar(axisLength * 1.2));
      this.scene.add(label);
    });
  }

  private setupEventListeners() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  public add(object: THREE.Object3D) {
    this.scene.add(object);
  }

  public remove(object: THREE.Object3D) {
    this.scene.remove(object);
  }

  public render() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  }

  public getScene() {
    return this.scene;
  }

  public getRenderer() {
    return this.renderer;
  }

  public getControls() {
    return this.controls;
  }
} 
