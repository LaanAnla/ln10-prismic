import * as THREE from 'three';

export default class Canvas {
  constructor() {

    this.createRenderer()
    this.createCamera()
    this.createCube()
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer( { 
      antialias: true,
      alpha: true
    } );
    
    document.body.appendChild( this.renderer.domElement );
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    this.camera.position.z = 2;
  }

  createCube() {
    this.scene = new THREE.Scene();

    this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
    this.material = new THREE.MeshNormalMaterial();

    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.scene.add( this.mesh );
  }

  onResize() {
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
  }

  update() {
    this.mesh.rotation.x += 0.005;
	  this.mesh.rotation.y += 0.005;
    this.renderer.render( this.scene, this.camera );
  }
}