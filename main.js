
import * as THREE from './three.js-master/build/three.module.js';
import {OrbitControls} from './three.js-master/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from './three.js-master/examples/jsm/loaders/GLTFLoader.js';

let c1 = null
  c1 = document.createElement('div');
  c1.className = 'loading';
  let c2 = document.createElement('div');
  c2.className = 'loader';
  document.getElementsByTagName('body')[0].appendChild(c1);
  c1.appendChild(c2);
document.addEventListener("DOMContentLoaded", function(event) { 
  if (c1 !== null){
    c1.remove();
  }
// texturas load
const textureLoader = new THREE.TextureLoader()
const simpleShadow = textureLoader.load('./texturas/simpleShadow.jpg')
const colorstapiz = [
  {
      texture: './texturas/azul.jpg',
      size: [8, 8, 8],
      shininess: 0
  },{
      texture: './texturas/azulmarino.jpg',
      size: [8, 8, 8],
      shininess: 6
  },{
     texture: './texturas/gris.jpg',
     size: [8, 8, 8],
     shininess: 12
  },{
     texture: './texturas/grisoscuro.jpg',
      size: [8, 8, 8],
     shininess: 12
  },{
        texture: './texturas/verde.jpg',
       size: [8, 8, 8],
      shininess: 12
  },{
    texture: './texturas/claro.jpg',
    size: [8, 8, 8],
    shininess: 16
  }
 ]
  const colorssoporte = [
    {
        texture: './texturas/madera.jpg',
        size: [2,2,2],
        shininess: 50
    },{
        texture: './texturas/maderaazul.jpg',
        size: [3,3,3],
        shininess: 50
    },{
       texture: './texturas/maderaamarillo.jpg',
       size: [2,2,2],
       shininess: 50
    },{
       texture: './texturas/maderagris.jpg',
       size: [2,2,2],
       shininess: 50
    },{
        texture: './texturas/walnut.jpg',
        size: [6,6,6],
        shininess: 30
    },{
        texture: './texturas/lightbirch.jpg',
       size: [6,6,6],
        shininess: 42
    }  
    ]
  const bandejatapiz = document.getElementById('texturasjstapiz')
  const bandejasoporte = document.getElementById('texturasjssoporte')
     
//Modelos
const modelos = []
var pt1ci01 ={name:"pt1ci01",path:"./modelos/pt1ci01.glb",x:0.908,y: 0.76,z: 1.012,price:3500,loaded: false,img:"./botones/pt1ci01.png"};
var pt1ci02 ={name:"pt1ci02",path:"./modelos/pt1ci02.glb",x:0.91,y: 0.76,z: 1.02,price:3600,loaded: false,img:"./botones/pt1ci02.png"};
var pt2ci01 ={name:"pt2ci01",path:"./modelos/pt2ci01.glb",x:0.908,y: 0.76,z: 1.7512,price:3700,loaded: false,img:"./botones/pt2ci01.png"};
var pt3ci01 ={name:"pt3ci01",path:"./modelos/pt3ci01.glb",x:1.252,y: 0.76,z: 1.012,price:3800,loaded: false,img:"./botones/pt3ci01.png"};
var pt3ci02 ={name:"pt3ci02",path:"./modelos/pt3ci02.glb",x:1.252,y: 0.76,z: 1.012,price:3804,loaded: false,img:"./botones/pt3ci02.png"};
var pt4ci01 ={name:"pt4ci01",path:"./modelos/pt4ci01.glb",x:1.252,y: 0.76,z: 1.7512,price:3900,loaded: false,img:"./botones/pt4ci01.png"};
var pt4ci02 ={name:"pt4ci02",path:"./modelos/pt4ci02.glb",x:1.252,y: 0.76,z: 1.7512,price:4000,loaded: false,img:"./botones/pt4ci02.png"};
var ptcd101 ={name:"ptcd101",path:"./modelos/ptcd101.glb",x:1.802,y: 0.76,z: 1.012,price:4100,loaded: false,img:"./botones/ptcd101.png"};
var ptcd201 ={name:"ptcd201",path:"./modelos/ptcd201.glb",x:2.152,y: 0.76,z: 1.012,price:4200,loaded: false,img:"./botones/ptcd201.png"};
var ptcd301 ={name:"ptcd301",path:"./modelos/ptcd301.glb",x:2.51,y: 0.76,z: 1.012,price:4300,loaded: false,img:"./botones/ptcd301.png"};
var ptct101 ={name:"ptct101",path:"./modelos/ptct101.glb",x:2.702,y: 0.76,z: 1.012,price:4400,loaded: false,img:"./botones/ptct101.png"};
var ptct201 ={name:"ptct201",path:"./modelos/ptct201.glb",x:3.051,y: 0.76,z: 1.012,price:4500,loaded: false,img:"./botones/ptct201.png"};
var ptct301 ={name:"ptct301",path:"./modelos/ptct301.glb",x:3.402,y: 0.76,z: 1.012,price:4600,loaded: false,img:"./botones/ptct301.png"};
var esquina ={name:"esquina",path:"./modelos/esquina.glb",x:1.012,y: 0.76,z: 1.012,price:3300,loaded: false,img:"./botones/esquina.png"};

const catalogo = [pt1ci01,pt1ci02,pt2ci01,pt3ci01,pt3ci02,pt4ci01,pt4ci02,ptcd101,ptcd201,ptcd301,ptct101,ptct201,ptct301,esquina]

const BACKGROUND_COLOR = 0xf1f1f1;
// Init the scene
const scene = new THREE.Scene();
// Set background
scene.background = new THREE.Color(BACKGROUND_COLOR);
scene.fog = new THREE.Fog(BACKGROUND_COLOR, 20, 100);

const canvas = document.querySelector('#c');
        alphaMap: simpleShadow
// Init the renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true});

renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

// Add a camera
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1;
camera.position.x = 0;
camera.position.y = 10;

// Add lights
var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.59);
hemiLight.position.set(0, 50, 0);
// Add hemisphere light to scene   
scene.add(hemiLight);

var dirLight = new THREE.DirectionalLight(0xffffff, 0.59);
dirLight.position.set(-8, 12, 8);
dirLight.castShadow = true;
dirLight.shadow.mapSize = new THREE.Vector2(4096,4096);

dirLight.shadow.camera.left = - 12;
dirLight.shadow.camera.right = 12;
dirLight.shadow.camera.top = 12;
dirLight.shadow.camera.bottom = - 12;
// Add directional Light to scene    
scene.add(dirLight);

// Floor
var floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
var floorMaterial = new THREE.MeshPhongMaterial({
  color: 0xeeeeee,
  shininess: 0 });

var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -0.5 * Math.PI;
floor.receiveShadow = true;

floor.position.y = -1;
scene.add(floor);

// Add controls
var controls = new OrbitControls( camera, renderer.domElement );
controls.maxPolarAngle = Math.PI/2.1 
controls.minPolarAngle = Math.PI / 4.5;
controls.enableDamping = true;
controls.enablePan =  true;
controls.dampingFactor = 0.15;
controls.maxDistance = 2.5
controls.maxDistance = 12.5
//Las lineas de abajo intentan resolver el bug al orbitar la camara
controls.addEventListener( 'change', test);
controls.addEventListener( 'end', test2);
let activarControles = true;
var contador = 0

function test (){
    contador += 1
 //   console.log(contador)
  if (contador > 25){
    activarControles = false
  }
}   
function test2 (){
   setTimeout(function() {
    activarControles = true
    contador = 0
  }, 50);
}   

// Initial material
let inittxt_tapiz = new THREE.TextureLoader().load('./texturas/azul.jpg');
inittxt_tapiz.repeat.set(8, 8, 8);
inittxt_tapiz.wrapS = THREE.RepeatWrapping;
inittxt_tapiz.wrapT = THREE.RepeatWrapping;

let inittxt_soporte = new THREE.TextureLoader().load('./texturas/madera.jpg');
inittxt_soporte.repeat.set(2, 2, 2);
inittxt_soporte.wrapS = THREE.RepeatWrapping;
inittxt_soporte.wrapT = THREE.RepeatWrapping;

var INITIAL_MTL_soporte = new THREE.MeshPhongMaterial({ map: inittxt_soporte, shininess: 60 });
var INITIAL_MTL_tapiz = new THREE.MeshPhongMaterial( {map: inittxt_tapiz, shininess: 25})
 
// Raycaster

const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (event) =>
{
    mouse.x = event.clientX / window.innerWidth * 2 - 1
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1
  //  console.log(mouse)
})

const raycaster = new THREE.Raycaster()

const redcircle = new THREE.Mesh(
  new THREE.PlaneGeometry(4, 4),
  new THREE.MeshBasicMaterial({
      color: 0x155E7E,
      transparent: true,
      alphaMap: simpleShadow
  })
)

redcircle.rotation.x = - Math.PI * 0.5
redcircle.position.y = floor.position.y + 0.03
redcircle.material.opacity = 0.75
 
    // Init the object loader
    var loader = new GLTFLoader();
 
let addedvectors = new THREE.Vector3( );
addedvectors.set(0,0,0)
function centercamera(){
 if (modelos.length<=1){

 } 
 else{
   for (var modelo of modelos){
     addedvectors.add(modelo.position)
   }
   controls.target.set(addedvectors.x/modelos.length,addedvectors.y/modelos.length,addedvectors.z/modelos.length)
   addedvectors.set(0,0,0)
 }
}    
let cantake = false
let modeloselecto = null

function moveractivado(){
  if (choque==false){
    if(cantake == true){
        
        cantake = false
        modeloselecto = null
        comparar = true
        seleccion = 0
        marcamaterial.opacity= 0.00
        centercamera()
        compileList()
        document.body.style.cursor="default"
    }
    else{
        cantake= true
        compileList()
        document.body.style.cursor="grabbing"
    }
  }
  else{
    cantake = true
    compileList()
 
  }
  
}
// Select Option
const options = document.querySelectorAll(".modelo");

function rotar(){
  if (modeloselecto == null){
    // your code here.
  }
  else {
    let a = null         
    modelos[modeloselecto].rotation.y += Math.PI/2;  
    a = modelos[modeloselecto].userData[0]
    modelos[modeloselecto].userData[0] =  modelos[modeloselecto].userData[1] 
    modelos[modeloselecto].userData[1] = a
  //  console.log( modelos[modeloselecto].userData)
  }
}

function flip(){
  if (modeloselecto == null){
    // your code here.
  }
  else {
  console.log( modelos[modeloselecto].matrix)   
    modelos[modeloselecto].applyMatrix4(new THREE.Matrix4().makeScale(-1, 1, 1));
    modelos[modeloselecto].applyMatrix4(new THREE.Matrix4().makeScale(1, 1, 1));
  console.log( modelos[modeloselecto].matrix)
  }
}
let activarsnap = true;
function activarSnap(){
  if (activarsnap == true){
    activarsnap = false
  }
  else {
    activarsnap = true
  }
}
function remove(){
  if (modeloselecto == null){

  }
  else {
    for (var m = 0; m < objectsToTest.length; m++){
    if(objectsToTest[m].uuid==modelos[modeloselecto].uuid){
     objectsToTest.splice(m,1)
    }
  } 
   modelos[modeloselecto].clear ()
   scene.remove(modelos[modeloselecto]);
   modelos.splice(modeloselecto,1)
    cantake = false
    modeloselecto = null
    comparar = true
    seleccion = 0
    marcamaterial.opacity= 0.00
    colmaterial.opacity= 0.00
    setTimeout(function() {
      compileList()
    }, 30);
    centercamera()
  }
}

//Controles
document.addEventListener('keydown', function (event) {
  if (event.key === 'r') {
  //  cambiarmaterial();
    rotar();
  }
  if (event.key === 't') {
      flip();
    }
  if (event.key === 'e') {
     remove();
  }  
  if (event.key === 'g') {
    menu();
 }  
 if (event.key === 's') {
  activarSnap();
} 
 if (event.key === 'd') {
  compileList();
}   
}); 

window.addEventListener('click', toque)

for (const option of options) {
  option.addEventListener('mousedown',crear);
}   

function crear(e){


let compiledelay = 50
let maxz = 0;  
let option = e.target.dataset.option;
for (var c of catalogo){
  if (c.name==option){
    let x = c.x
    let y = c.y
    let z = c.z
    let name = c.name
    let price = c.price
    let img = c.img
    const geometry = new THREE.BoxBufferGeometry( c.x, c.y, c.z, 1)
    const materials = new THREE.MeshBasicMaterial( {color: 0xffff00} )
    materials.transparent= true
    materials.opacity= 0.00
    materials.visible = false
   
    const INITIAL_MAP = [
      { childID: "soporte", mtl: INITIAL_MTL_soporte },
      { childID: "tapiz", mtl: INITIAL_MTL_tapiz },];
  
    let i = modelos.length;
  
    modelos [i] = new THREE.Mesh( geometry, materials)
    if (modelos.length<=1){
      modelos [i].position.set(0,redcircle.position.y,0);
      //centercamera()
    } 
    else{
      for (var modelo of modelos){
        addedvectors.add(modelo.position)
        if(maxz<modelo.position.z){
          maxz = modelo.position.z
        }
      }
      modelos [i].position.set(addedvectors.x/modelos.length,redcircle.position.y,(maxz)+2.1)
      addedvectors.set(0,0,0)
      maxz = 0
      centercamera()
    }
    modelos [i].userData = [c.x,c.z]
    let d1 = null
    if(c.loaded==false){
      d1 = document.createElement('div');
      d1.className = 'loading';
      let d2 = document.createElement('div');
      d2.className = 'loader';
      document.getElementsByTagName('body')[0].appendChild(d1);
      d1.appendChild(d2);
      c.loaded = true;
      compiledelay = 1000
    }
    
    loader.load(c.path, function (gltf) {  
      gltf.scene.traverse(o => {
        if (o.isMesh) {
          o.castShadow = true;
          o.receiveShadow = true;
        }
      });
      gltf.scene.scale.set(1, 1, 1);
      gltf.scene.position.copy(redcircle.position);
      gltf.scene.position.set(-(x/2),-(y/2),(z/2));
      
      modelos[i].add(gltf.scene)
      scene.add(modelos[i]);
      if (d1 !== null){
        d1.remove();
        
      }
      
      objectsToTest.push(modelos[i]);
      modelos [i].userData.push (name)
      modelos [i].userData.push (price)
      modelos [i].userData.push (img)
      // Set initial textures
      for (let object of INITIAL_MAP) {
        initColor(gltf.scene, object.childID, object.mtl);
      }
    }, undefined, function (error) {
      console.error(error);
    });
    
  }
  
}
console.log(modelos)
setTimeout(function() {
  compileList()
}, compiledelay);
setTimeout(function() {
  compileList()
}, compiledelay);
}
    // Function - Add the textures to the models
    function initColor(parent, type, mtl) {
      parent.traverse(o => {
        if (o.isMesh) {
          if (o.name.includes(type)) {
            o.material = mtl;
            o.nameID = type; // Set a new property to identify this object
          }
        }
      });
    }

function cambiarmaterial(){
  if (modelos[1] == null){
    // your code here.
  }
  else {         
     console.log(modelos[1].children[0].children[0].material);
     modelos[1].children[0].children[0].material.transparent = true;
     modelos[1].children[0].children[0].material.opacity -= 0.1;
  }
}

var choque = false;

const colgeo = new THREE.BoxGeometry( 1, 0.8, 1 );
const colmaterial = new THREE.MeshBasicMaterial( {color: 0xffe6cc} );
colmaterial.transparent= true
colmaterial.opacity= 0.00
const colobj = new THREE.Mesh( colgeo, colmaterial );
scene.add( colobj );
function testCollision(otro) {
  var offset = 0.02
  var selbot = (modelos[modeloselecto].position.z-modelos[modeloselecto].userData[1]/2)
  var seltop = (modelos[modeloselecto].position.z+modelos[modeloselecto].userData[1]/2)
  var selright = (modelos[modeloselecto].position.x+modelos[modeloselecto].userData[0]/2)
  var selleft = (modelos[modeloselecto].position.x-modelos[modeloselecto].userData[0]/2)

  var otrobot = (otro.position.z-otro.userData[1]/2)
  var otrotop = (otro.position.z+otro.userData[1]/2)
  var otroright = (otro.position.x+otro.userData[0]/2)
  var otroleft = (otro.position.x-otro.userData[0]/2)

    if (seltop < otrobot+offset || selright < otroleft+offset || selbot > otrotop-offset || selleft > otroright-offset) {
    // marcamaterial.opacity= 0.00
     return false;
    }
     else {
     colobj.position.set(modelos[modeloselecto].position.x, modelos[modeloselecto].position.y, modelos[modeloselecto].position.z)
     colobj.scale.x = modelos[modeloselecto].userData[0]
     colobj.scale.z = modelos[modeloselecto].userData[1]
     colmaterial.opacity= 0.08
     return true
     }
  }

  let selA = new THREE.Vector3( );
  let selB = new THREE.Vector3( );
  let selC = new THREE.Vector3( );
  let selD = new THREE.Vector3( );

  let otroA = new THREE.Vector3( );
  let otroB = new THREE.Vector3( );
  let otroC = new THREE.Vector3( );
  let otroD = new THREE.Vector3( );

  let umbralsnap = 0.15;
  let umbralmouse = 0.11
  let offsettoma = 0.05
  let comparar = true
  let seleccion = 0

  const marcageo = new THREE.CylinderGeometry( 0.20,0.20, 0.1, 32 );
  const marcamaterial = new THREE.MeshBasicMaterial( {color: 0xffa64d} );
  marcamaterial.transparent= true
  marcamaterial.opacity= 0.00
  const marcasnap = new THREE.Mesh( marcageo, marcamaterial );
  scene.add( marcasnap );
  function Snaps(otro) {
    let selx= modelos[modeloselecto].userData[0]/2
    let selz = modelos[modeloselecto].userData[1]/2

    let otrox= (otro.userData[0]/2)+0.0
    let otroz= (otro.userData[1]/2)+0.0

    selA.set(modelos[modeloselecto].position.x-selx, -1, modelos[modeloselecto].position.z-selz );
    selB.set(modelos[modeloselecto].position.x-selx, -1, modelos[modeloselecto].position.z+selz );
    selC.set(modelos[modeloselecto].position.x+selx, -1, modelos[modeloselecto].position.z+selz );
    selD.set(modelos[modeloselecto].position.x+selx, -1, modelos[modeloselecto].position.z-selz );
  
    otroA.set(otro.position.x-otrox, -1,otro.position.z-otroz );
    otroB.set(otro.position.x-otrox, -1,otro.position.z+otroz );
    otroC.set(otro.position.x+otrox, -1,otro.position.z+otroz );
    otroD.set(otro.position.x+otrox, -1,otro.position.z-otroz );
 
    let MA = xz.distanceToSquared(otroA)
    let MB = xz.distanceToSquared(otroB)
    let MC = xz.distanceToSquared(otroC)
    let MD = xz.distanceToSquared(otroD)

    let MSA = xz.distanceToSquared(selA)
    let MSB = xz.distanceToSquared(selB)
    let MSC = xz.distanceToSquared(selC)
    let MSD = xz.distanceToSquared(selD)
    
    if (comparar==true){
      if(MSA<MSB&&MSA<MSC&&MSA<MSD){
        
        seleccion = 1 
        comparar=false
        console.log(seleccion)
      }
      else if(MSB<MSA&&MSB<MSC&&MSB<MSD){
        seleccion = 2
        comparar=false
        console.log(seleccion)
       }
      else if(MSC<MSB&&MSC<MSA&&MSC<MSD){
        seleccion = 3
        comparar=false
        console.log(seleccion)
       }
      else if(MSD<MSB&&MSD<MSC&&MSD<MSA){
         seleccion = 4
         comparar=false
         console.log(seleccion)
        }
    }
        if (snaped == false){

            if(seleccion==1){
              marcasnap.position.set(modelos[modeloselecto].position.x-selx, -1, modelos[modeloselecto].position.z-selz)
              marcamaterial.opacity= 0.50
            if (MB<umbralmouse) {
              modelos[modeloselecto].position.set(otro.position.x-otrox+selx, redcircle.position.y,otro.position.z+otroz+selz );
              snaped = true
            }
            else if (MC<umbralmouse) {
              modelos[modeloselecto].position.set(otro.position.x+otrox+selx, redcircle.position.y,otro.position.z+otroz+selz );
              snaped = true  
            }
            else if (MD<umbralmouse) {
              modelos[modeloselecto].position.set(otro.position.x+otrox+selx, redcircle.position.y,otro.position.z-otroz+selz);
              snaped = true
            }
            
          else{
          modelos[modeloselecto].position.set(redcircle.position.x+selx-offsettoma, redcircle.position.y,redcircle.position.z+selz-offsettoma);
       
          }
          }
           if(seleccion==2){
            marcasnap.position.set(modelos[modeloselecto].position.x-selx, -1, modelos[modeloselecto].position.z+selz)
            marcamaterial.opacity= 0.50
            if (MA<umbralmouse) {
              modelos[modeloselecto].position.set(otro.position.x-otrox+selx, redcircle.position.y,otro.position.z-otroz-selz );
              snaped = true          
            }
            else if (MD<umbralmouse) {
              modelos[modeloselecto].position.set(otro.position.x+otrox+selx, redcircle.position.y,otro.position.z-otroz-selz );
              snaped = true           
            }
            else if (MC<umbralmouse) {
              modelos[modeloselecto].position.set(otro.position.x+otrox+selx, redcircle.position.y,otro.position.z+otroz-selz);
              snaped = true
             
            }

          else{
           modelos[modeloselecto].position.set(redcircle.position.x+selx-offsettoma, redcircle.position.y,redcircle.position.z-selz+offsettoma);
          
          }
          }  
           if(seleccion==3){
            marcasnap.position.set(modelos[modeloselecto].position.x+selx, -1, modelos[modeloselecto].position.z+selz)
            marcamaterial.opacity= 0.50
            if (MA<umbralmouse) {
              modelos[modeloselecto].position.set(otro.position.x-otrox-selx, redcircle.position.y,otro.position.z-otroz-selz );
              snaped = true
              
            }
            else if (MB<umbralmouse) {
              modelos[modeloselecto].position.set(otro.position.x-otrox-selx, redcircle.position.y,otro.position.z+otroz-selz );
              snaped = true
              ;
            }
            else if (MD<umbralmouse) {
              modelos[modeloselecto].position.set(otro.position.x+otrox-selx, redcircle.position.y,otro.position.z-otroz-selz);
              snaped = true
              
            }

            else{
            modelos[modeloselecto].position.set(redcircle.position.x-selx+offsettoma, redcircle.position.y,redcircle.position.z-selz+offsettoma);
            
            }
          }
           if(seleccion==4){
            marcasnap.position.set(modelos[modeloselecto].position.x+selx, -1, modelos[modeloselecto].position.z-selz)
            marcamaterial.opacity= 0.50
            if (MA<umbralmouse) {
             
              modelos[modeloselecto].position.set(otro.position.x-otrox-selx, redcircle.position.y,otro.position.z-otroz+selz );
              snaped = true
              
            }
            else if (MB<umbralmouse) {
              modelos[modeloselecto].position.set(otro.position.x-otrox-selx, redcircle.position.y,otro.position.z+otroz+selz );
              snaped = true
              
            }
            else if (MC<umbralmouse) {
              modelos[modeloselecto].position.set(otro.position.x+otrox-selx, redcircle.position.y,otro.position.z+otroz+selz);
              snaped = true
             
            }
            else{
            modelos[modeloselecto].position.set(redcircle.position.x-selx+offsettoma, redcircle.position.y,redcircle.position.z+selz-offsettoma);
          }
          }  
       }
    }

  // Function - Build Colors
function buildColorstapiz(colors) {
  for (let [i, color] of colors.entries()) {
     let swatch = document.createElement('div');
    swatch.classList.add('selector_swatchtapiz');
    
    if (color.texture)  {
        swatch.style.backgroundImage = "url(" + color.texture + ")";
      } else
      {
        swatch.style.background = "#" + color.color;
      }
  
     swatch.setAttribute('data-key', i);
     bandejatapiz.append(swatch);
   }
 }  
buildColorstapiz(colorstapiz);

 const swatchestapiz = document.querySelectorAll(".selector_swatchtapiz");

 for (const swatch of swatchestapiz) {
   swatch.addEventListener('click', selectSwatchtapiz);
}

function selectSwatchtapiz(e) {
  let color = colorstapiz[parseInt(e.target.dataset.key)];
  let new_mtl;

 if (color.texture) {
   
   let txt = new THREE.TextureLoader().load(color.texture);
   
   txt.repeat.set( color.size[0], color.size[1], color.size[2]);
   txt.wrapS = THREE.RepeatWrapping;
   txt.wrapT = THREE.RepeatWrapping;
   
   new_mtl = new THREE.MeshPhongMaterial( {
     map: txt,
     shininess: color.shininess ? color.shininess : 10
   });    
 } 
 else
 {
   new_mtl = new THREE.MeshPhongMaterial({
       color: parseInt('0x' + color.color),
       shininess: color.shininess ? color.shininess : 10
       
     });
 }

 for (const modelo of modelos){
 setMaterial(modelo, "tapiz", new_mtl);
 }
 INITIAL_MTL_tapiz=new_mtl;
}
//
function buildColorssoporte(colors) {
  for (let [i, color] of colors.entries()) {
     let swatch = document.createElement('div');
    swatch.classList.add('selector_swatchsoporte');
    if (color.texture)  {
        swatch.style.backgroundImage = "url(" + color.texture + ")";
      } else
      {
        swatch.style.background = "#" + color.color;
      }
     swatch.setAttribute('data-key', i);
     bandejasoporte.append(swatch);
   }
 }  
buildColorssoporte(colorssoporte);

 const swatchessoporte = document.querySelectorAll(".selector_swatchsoporte");

 for (const swatch of swatchessoporte) {
   swatch.addEventListener('click', selectSwatchsoporte);
}

function selectSwatchsoporte(e) {
  let color = colorssoporte[parseInt(e.target.dataset.key)];
  let new_mtl;

 if (color.texture) {
   
   let txt = new THREE.TextureLoader().load(color.texture);
   
   txt.repeat.set( color.size[0], color.size[1], color.size[2]);
   txt.wrapS = THREE.RepeatWrapping;
   txt.wrapT = THREE.RepeatWrapping;
   
   new_mtl = new THREE.MeshPhongMaterial( {
     map: txt,
     shininess: color.shininess ? color.shininess : 10
   });    
 } 
 else
 {
   new_mtl = new THREE.MeshPhongMaterial({
       color: parseInt('0x' + color.color),
       shininess: color.shininess ? color.shininess : 10
       
     });
 }

 for (const modelo of modelos){
 setMaterial(modelo, "soporte", new_mtl);
 }
 INITIAL_MTL_soporte=new_mtl;
}

function setMaterial(parent, type, mtl) {
  parent.traverse((o) => {
   if (o.isMesh && o.nameID != null) {
     if (o.nameID == type) {
          o.material = mtl;
       }
   }
 });
}

function toque(){
  if(activarControles==true){

      for (var p = 0; p <= modelos.length; p++){
      
       if(currentIntersect.object){
           switch(currentIntersect.object){
     
                   case floor:
     
                   console.log('clickfloor')
                   if(modeloselecto != null){
                    moveractivado()
                   }
                   //console.log(xz)   
                   break
            
                   case modelos[p]:
                   

                    if(modeloselecto==null){
                    modeloselecto = p 

                    moveractivado()
                    }
                    else{         
                    moveractivado()
                    }
 
                   break 

     
                   default:
 
                   }
           }
         }
        }
       }
      window.addEventListener('mousemove', sobre)
      function sobre(){
        if (choque == false){
          colmaterial.opacity= 0.00 
        }
        if(activarControles==true){

            for (var p = 0; p <= modelos.length; p++){
            
             if(currentIntersect.object){
                 switch(currentIntersect.object){
           
                         case floor:
           
                         if(modeloselecto == null){
                            document.body.style.cursor="default"
                         }
 
                         break
                  
                         case modelos[p]:
 
                          if(modeloselecto==null){
                            document.body.style.cursor="grab"
                          }
                          else{
                            document.body.style.cursor="grabbing"
                          }
 
                         break 
 
                         default:
 
                         }
                 }
               }
             }
            }
document.getElementById("shot").addEventListener('click', takeScreenshot);
function takeScreenshot() {
 
  renderer.preserveDrawingBuffer = true;
  renderer.render(scene, camera)
  html2canvas(document.body).then(function(canvas) {
    
    document.body.appendChild(canvas);
    var w = window.open('', '');
    w.document.title = "Screenshot";
    w.document.body.appendChild(canvas);

    canvas.toBlob(function(blob) {
      var a = document.createElement('a');
      var url = URL.createObjectURL(blob);
      a.href = url;
      a.download = 'Captura.png';
      a.click();
 
    }, 'image/png', 1.0);  
    
   });
   renderer.preserveDrawingBuffer = false; 
}
 
let mouseX = 0
let mouseY = 0
document.addEventListener('click', onMouseUpdate, false);
function onMouseUpdate(e) {
  mouseX = e.pageX;
  mouseY = e.pageY;
}

let menuActivado = false;
function menu(){
  if(menuActivado==false){
    menuActivado = true;
    document.getElementById("dd").style.left = mouseX+'px';
    document.getElementById("dd").style.top = mouseY+'px';
    console.log("x es "+mouseX+"y es "+mouseY)

    var menu = document.createElement('div');
    menu.className = 'radial menu';
    menu.title = "Click To Open";
    var inp = document.createElement("INPUT");
    inp.id = 'radialMenu';
    inp.setAttribute("type", "checkbox");
    menu.appendChild(inp);
    var lab = document.createElement("LABEL");
    lab.className = 'radialPivot';
    lab.htmlFor = 'radialMenu';
    menu.appendChild(lab);
    var span1 = document.createElement("SPAN");
    span1.className = 'far fa-compass';
    var span1icon = document.createTextNode("A");
    span1.appendChild(span1icon);
    lab.appendChild(span1);
    var span2 = document.createElement("SPAN");
    span2.className = 'sronly';
    var span2t = document.createTextNode("Show menu items");
    span2.appendChild(span2t);
    lab.appendChild(span2);
    var ul = document.createElement("UL");
    ul.className = 'radialList compass';
    ul.setAttribute("role", "navigation");
    ul.ariaLabel = "menu items"
    menu.appendChild(ul);
  
    var i1 = document.createElement("LI");
    var t1 = document.createTextNode("item 1");
    i1.appendChild(t1);
    var i2 = document.createElement("LI");
    var t2 = document.createTextNode("item 2");
    i2.appendChild(t2);
    var i3 = document.createElement("LI");
    var t3 = document.createTextNode("item 3");
    i3.appendChild(t3);
    ul.appendChild(i1);
    ul.appendChild(i2);
    ul.appendChild(i3);
  
    document.getElementById("dd").appendChild(menu);
  }
  else {
    menuActivado = false;  
    document.getElementById("dd").innerHTML = "";
  }
}

let listaActivado = true;
function compileList(){
  let total = 0
  if(listaActivado==true){
    document.getElementById("items").innerHTML = "";
    var names = document.createElement("LI");
    names.className = 'nombres';
    var imgs = document.createElement("LI");
    imgs.className = 'imgs';
    var prices = document.createElement("LI");
    prices.className = 'precios';
    document.getElementById("items").appendChild(imgs);
    document.getElementById("items").appendChild(names);
    document.getElementById("items").appendChild(prices);
    for (var i = 0; i < modelos.length; i++){

      let name = modelos[i].userData[2]
    
      let price = modelos[i].userData[3]
      let img = modelos[i].userData[4]
      total += price

      var precio = price.toLocaleString("es-CL")

      var nuevoname = document.createElement("P");

      var nuevonamet = document.createTextNode(name);

      var nuevoimg = document.createElement("P");
      var nuevoimgt = document.createElement("IMG");
      nuevoimgt.setAttribute("src", img);
      nuevoimgt.setAttribute("height", "49");
      nuevoimgt.setAttribute("border", "10");
      nuevoimgt.style.borderStyle = "hidden";
 
      var nuevoprice = document.createElement("P");

      var nuevopricet = document.createTextNode(precio);
 
      imgs.appendChild(nuevoimgt);

      nuevoname.appendChild(nuevonamet);
      names.appendChild(nuevoname);
      nuevoprice.appendChild(nuevopricet);
      prices.appendChild(nuevoprice);
 
      if (modeloselecto == i){
        nuevoname.style.textDecoration = "underline";
      }
      else if (modeloselecto ==null){
        names.style.textDecoration = "";
      }
    }
    document.getElementById("total").innerHTML = "<strong>&nbsp;Total: &nbsp;&nbsp;&nbsp;&nbsp;</strong>"+ total.toLocaleString("es-CL");

  }
  else {
     document.getElementById("items").innerHTML = "";
  }
}

// Animate Condition

const clock = new THREE.Clock()
let currentIntersect = null
let xz = null
let objectsToTest = [floor]
let rayOn = true


function checkBool(val) {
  return val == true;
}

let offsety = 0.38
let snaped = false

const tick = () =>
{   
    if (modelos.length <= 1 || modeloselecto == null){
      if(cantake == true){
        if (modeloselecto == null){
       }
       else {         
        modelos[modeloselecto].position.copy(redcircle.position)
      }
     }
    }
    else {         
      var check = [];
      for (var modelo of modelos){
        if(modelo == modelos[modeloselecto] ){
           continue;
        }
        var choca = testCollision(modelo)
        check.push(choca)
       }
      choque = check.some(checkBool)

      snaped = false

      for (var i = modelos.length - 1; i >= 0; i--) {
        if (i == modeloselecto){
         
        }
        else{
        if(cantake == true){
          if (modeloselecto == null){
         }
         else {    
           if(activarsnap==true){    
          Snaps(modelos[i])
          }
          else{
            modelos[modeloselecto].position.copy(redcircle.position)
            
          } 
         }
        }
       }
      }
     }

    const elapsedTime = clock.getElapsedTime()
    //Ray y cast
     raycaster.setFromCamera(mouse, camera)
     const intersects = raycaster.intersectObjects(objectsToTest, true)  

     for(const intersect of intersects)
    {
        //intersect.object.material.color.set('#0000ff')
        if(rayOn){
            //console.log(intersect.point)
            xz = intersect.point
            redcircle.position.copy(xz)
            redcircle.position.y = redcircle.position.y + offsety      
        }
    }
    if(intersects.length)
    {   
        if(currentIntersect == null)
        {
            console.log('mouse enter')
        }
        currentIntersect = intersects[0]
    }
    else{
        if(currentIntersect)
        {
            console.log('mouse leave')
        }
        currentIntersect = null
    }

   // Render
    renderer.render(scene, camera)

    setTimeout( function() {

       window.requestAnimationFrame(tick)

     }, 1000 / 50 );

    raycaster.updateProjectionMatrix

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
}

// Function - New resizing method
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  var width = window.innerWidth;
  var height = window.innerHeight;
  var canvasPixelWidth = (canvas.width / window.devicePixelRatio);
  var canvasPixelHeight = (canvas.height / window.devicePixelRatio);

  controls.update();

  const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
  if (needResize) {

    renderer.setSize(width, height, false);
  }
  return needResize;
  
}
tick()
});