import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AxesHelper,
  Box3,
  BoxGeometry,
  BoxHelper,
  Color,
  Group,
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
})
export class Viewer3dComponent implements AfterViewInit {
  @ViewChild('canvas')
  private canvasRef!: ElementRef<HTMLCanvasElement>;

  private scene!: Scene;
  private camera!: PerspectiveCamera;
  private controls!: OrbitControls;
  private renderer!: WebGLRenderer;

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
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('assets/models/Nike Airmax.glb', (gltfScene) => {
      const mesh = gltfScene.scene;

      this.centerObject(mesh);
      this.fitCamera(mesh);

      this.scene.add(mesh);

      // const boxHelper = new BoxHelper(mesh, 0xffff00);
      // this.scene.add(boxHelper);
    });
  }

  private configureCamera() {
    this.camera = new PerspectiveCamera(45, 800 / 600);
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
    this.renderer.setSize(800, 600);
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
}
