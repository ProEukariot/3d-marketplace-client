import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  AxesHelper,
  Box3,
  BoxGeometry,
  BoxHelper,
  Color,
  Group,
  LoadingManager,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  Object3DEventMap,
  PerspectiveCamera,
  PointLight,
  Scene,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Color4 from 'three/examples/jsm/renderers/common/Color4';

@Component({
  selector: 'app-viewer3d',
  templateUrl: './viewer3d.component.html',
  styleUrls: ['./viewer3d.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class Viewer3dComponent implements AfterViewInit, OnChanges, OnDestroy {
  public loadedProgress = 0;
  public loaded = false;
  public disabled = true;

  @ViewChild('canvas', { static: true })
  private canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() dataSource!: string | null;
  @Input({ required: true }) dimensions!: { x: number; y: number };
  @Output() error = new EventEmitter<unknown>();

  private scene!: Scene;
  private camera!: PerspectiveCamera;
  private controls!: OrbitControls;
  private renderer!: WebGLRenderer;
  private loadingManager = new LoadingManager();

  constructor() {
    // this.loadingManager.onStart = (_, loaded, total) => {
    //   // this.loadedProgress = loaded / total;
    //   this.loadedProgress = 0;
    // };
    // this.loadingManager.onProgress = (_, loaded, total) => {
    //   this.loadedProgress = loaded / total;
    //   console.log(loaded, total, this.loadedProgress);
    // };
    // this.loadingManager.onLoad = () => {
    //   this.loadedProgress = 1;
    //   this.loaded = true;
    // };
    // this.loadingManager.onError = (a) => {
    //   console.log('ERROOOOR', a);
    // };
  }

  private getBox(object: Object3D<Object3DEventMap>) {
    return new Box3().setFromObject(object);
  }

  private centerObject(object: Object3D<Object3DEventMap>) {
    const box = this.getBox(object);

    const center = new Vector3();
    box.getCenter(center);

    object.position.sub(center);
    return object;
  }

  private fitCamera(object: Object3D<Object3DEventMap>) {
    const size = this.getBox(object).getSize(new Vector3());

    const maxDimension = Math.max(size.x, size.y, size.z);
    const fitHeightDistance =
      maxDimension / (2 * Math.tan((this.camera.fov * (Math.PI / 180)) / 2));
    this.camera.position.z = fitHeightDistance;
  }

  private createScene() {
    this.scene = new Scene();
  }

  private loadMesh() {
    // const gltfLoader = new GLTFLoader(this.loadingManager);
    const gltfLoader = new GLTFLoader();

    // !!!!!
    if (!this.dataSource) return;

    gltfLoader.load(
      this.dataSource,
      (gltfScene) => {
        const mesh = gltfScene.scene;

        this.centerObject(mesh);
        this.fitCamera(mesh);

        this.scene.add(mesh);

        this.loaded = true;

        // const boxHelper = new BoxHelper(mesh, 0xffff00);
        // this.scene.add(boxHelper);
      },
      (e) => {
        // console.log('PROGRESS__', e);
        this.loadedProgress = e.loaded / e.total;
      },
      (err) => {
        this.error.emit(err);
        console.error(err);
      }
    );
  }

  private configureCamera() {
    this.camera = new PerspectiveCamera(
      45,
      this.dimensions.x / this.dimensions.y
    );
    this.camera.position.z = 20;
    this.scene.add(this.camera);
  }

  private configureLight() {
    const target = new Vector3();

    const light1 = new PointLight(0xffffff, 500, 100);
    light1.lookAt(target);
    light1.position.set(5, 20, 0);

    const light2 = new PointLight(0xffffff, 500, 100);
    light2.lookAt(target);
    light2.position.set(10, 15, 10);

    const light3 = new PointLight(0xffffff, 200, 100);
    light3.lookAt(target);
    light3.position.set(-15, -10, -5);

    this.scene.add(light1);
    this.scene.add(light2);
    this.scene.add(light3);
  }

  private configureRenderer() {
    this.renderer = new WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      alpha: true,
    });
    this.renderer.setSize(this.dimensions.x, this.dimensions.y);
    this.renderer.render(this.scene, this.camera);
  }

  private configureControls() {
    this.controls = new OrbitControls(
      this.camera,
      this.canvasRef.nativeElement
    );
    this.controls.enableDamping = true;
  }

  private configureScene() {
    this.createScene();

    this.loadMesh();

    this.configureLight();
    this.configureCamera();

    this.configureControls();

    this.configureRenderer();
  }

  ngAfterViewInit(): void {
    this.configureScene();

    const loop = () => {
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
      window.requestAnimationFrame(loop);
    };
    loop();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource'].firstChange) return;

    this.loadMesh();
  }

  ngOnDestroy(): void {
    if (!this.scene) return;

    this.scene.traverse((obj) => {
      if (!obj) return;

      if (obj instanceof Mesh) {
        obj.geometry.dispose();
        obj.material.dispose();
      }
    });

    this.scene.clear();
  }
}
