import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Engine,
  Scene,
  FreeCamera,
  Vector3,
  MeshBuilder,
  HemisphericLight,
  SceneLoader,
} from '@babylonjs/core';

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.css'],
})
export class ModelDetailsComponent { // implements AfterViewInit
  // @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  // engine!: Engine;
  // scene!: Scene;

  // async ngAfterViewInit() {
  //   this.engine = new Engine(this.canvas.nativeElement);
  //   this.scene = await this.createScene();

  //   this.engine.runRenderLoop(() => {
  //     this.scene.render();
  //   });
  // }

  // async createScene() {
  //   const scene = new Scene(this.engine);

  //   const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);
  //   camera.setTarget(new Vector3(0, 0, 0));
  //   camera.attachControl();

  //   const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
  //   light.intensity = 0.7;

  //   const mesh = await SceneLoader.ImportMeshAsync(
  //     'mesh1',
  //     'assets/models/',
  //     'NeilArmstrong.glb',
  //     scene,
  //     (meshes) => {
  //       console.log(meshes);
  //     }
  //   );

  //   return scene;
  // }
}
