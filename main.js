import * as THREE from './three.js-master/build/three.module.js';
import {OrbitControls} from './three.js-master/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from './three.js-master/examples/jsm/loaders/GLTFLoader.js';


// texturas load
const textureLoader = new THREE.TextureLoader()
const simpleShadow = textureLoader.load('./texturas/simpleShadow.jpg')
const colorstapiz = [
  {
      texture: './texturas/azul.jpg',
      size: [8, 8, 8],
      shininess: 25
  },{
      texture: './texturas/azulmarino.jpg',
      size: [8, 8, 8],
      shininess: 42
  },{
     texture: './texturas/gris.jpg',
     size: [8, 8, 8],
     shininess: 27
  },{
     texture: './texturas/grisoscuro.jpg',
      size: [8, 8, 8],
     shininess: 27
  },{
        texture: './texturas/verde.jpg',
       size: [7, 7, 7],
      shininess: 33
  },{
    texture: './texturas/claro.jpg',
    size: [8, 8, 8],
    shininess: 27
  }
 ]
  const colorssoporte = [
    {
        texture: './texturas/madera.jpg',
        size: [2,2,2],
        shininess: 60
    },{
        texture: './texturas/maderaazul.jpg',
        size: [3,3,3],
        shininess: 60
    },{
       texture: './texturas/maderaamarillo.jpg',
       size: [2,2,2],
       shininess: 60
    },{
       texture: './texturas/maderagris.jpg',
       size: [2,2,2],
       shininess: 60
    },{
        texture: './texturas/walnut.jpg',
        size: [6,6,6],
        shininess: 60
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
var pt1ci01 ={name:"pt1ci01",path:"./modelos/pt1ci01.glb",x:0.908,y: 0.76,z: 1.012,price:3500,loaded: false};
var pt1ci02 ={name:"pt1ci02",path:"./modelos/pt1ci02.glb",x:0.91,y: 0.76,z: 1.02,price:3600,loaded: false};
var pt2ci01 ={name:"pt2ci01",path:"./modelos/pt2ci01.glb",x:0.908,y: 0.76,z: 1.7512,price:3700,loaded: false};
var pt3ci01 ={name:"pt3ci01",path:"./modelos/pt3ci01.glb",x:1.252,y: 0.76,z: 1.012,price:3800,loaded: false};
var pt3ci02 ={name:"pt3ci02",path:"./modelos/pt3ci02.glb",x:1.252,y: 0.76,z: 1.012,price:3804,loaded: false};
var pt4ci01 ={name:"pt4ci01",path:"./modelos/pt4ci01.glb",x:1.252,y: 0.76,z: 1.7512,price:3900,loaded: false};
var pt4ci02 ={name:"pt4ci02",path:"./modelos/pt4ci02.glb",x:1.252,y: 0.76,z: 1.7512,price:4000,loaded: false};
var ptcd101 ={name:"ptcd101",path:"./modelos/ptcd101.glb",x:1.802,y: 0.76,z: 1.012,price:4100,loaded: false};
var ptcd201 ={name:"ptcd201",path:"./modelos/ptcd201.glb",x:2.152,y: 0.76,z: 1.012,price:4200,loaded: false};
var ptcd301 ={name:"ptcd301",path:"./modelos/ptcd301.glb",x:2.51,y: 0.76,z: 1.012,price:4300,loaded: false};
var ptct101 ={name:"ptct101",path:"./modelos/ptct101.glb",x:2.702,y: 0.76,z: 1.012,price:4400,loaded: false};
var ptct201 ={name:"ptct201",path:"./modelos/ptct201.glb",x:3.051,y: 0.76,z: 1.012,price:4500,loaded: false};
var ptct301 ={name:"ptct301",path:"./modelos/ptct301.glb",x:3.402,y: 0.76,z: 1.012,price:4600,loaded: false};
var esquina ={name:"esquina",path:"./modelos/esquina.glb",x:1.012,y: 0.76,z: 1.012,price:3300,loaded: false};

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
   


 // new_mtl = new THREE.MeshPhongMaterial( {map: inittxt, shininess: 25})
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
redcircle.material.opacity = 0.1
scene.add(redcircle)

    // Init the object loader
    var loader = new GLTFLoader();


let addedvectors = new THREE.Vector3( );
addedvectors.set(0,0,0)
function centercamera(){
 if (modelos.length<1){

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
        centercamera()
        compileList()
    }
    else{
        cantake= true
        compileList()
    }
  }
  else{
    cantake = true
    compileList()
   // console.log(modelos[modeloselecto])
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
    modelos[modeloselecto].applyMatrix4(new THREE.Matrix4().makeScale(-1, 1, 1));
  //  console.log( modelos[modeloselecto].userData)
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
      centercamera()
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

      
      objectsToTest.push(modelos[i]);
      modelos [i].userData.push (name)
      modelos [i].userData.push (price)
      // Set initial textures
      for (let object of INITIAL_MAP) {
        initColor(gltf.scene, object.childID, object.mtl);
      }

    }, undefined, function (error) {
      console.error(error);
    });
    if (d1 !== null){
      d1.remove();
      compileList()
    }
  }
  
}
console.log(modelos)
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

function testCollision(otro) {
  var offset = 0.1
  var selbot = (modelos[modeloselecto].position.z-modelos[modeloselecto].userData[1]/2)
  var seltop = (modelos[modeloselecto].position.z+modelos[modeloselecto].userData[1]/2)
  var selright = (modelos[modeloselecto].position.x+modelos[modeloselecto].userData[0]/2)
  var selleft = (modelos[modeloselecto].position.x-modelos[modeloselecto].userData[0]/2)

  var otrobot = (otro.position.z-otro.userData[1]/2)
  var otrotop = (otro.position.z+otro.userData[1]/2)
  var otroright = (otro.position.x+otro.userData[0]/2)
  var otroleft = (otro.position.x-otro.userData[0]/2)

    if (seltop < otrobot+offset || selright < otroleft+offset || selbot > otrotop-offset || selleft > otroright-offset) {
     return false;
    }
     else {
     return true;
     
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

  let umbralsnap = 0.8;
  let umbralmouse = 1.0;

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
    
    let AD = selA.distanceToSquared ( otroD );
    let AB = selA.distanceToSquared(otroB)
    let AC = selA.distanceToSquared(otroC)

    let BC = selB.distanceToSquared(otroC)
    let BA = selB.distanceToSquared(otroA)
    let BD = selB.distanceToSquared(otroD)

    let CD = selC.distanceToSquared(otroD)
    let CB = selC.distanceToSquared(otroB)
    let CA = selC.distanceToSquared(otroA)

    let DB = selD.distanceToSquared(otroB)
    let DA = selD.distanceToSquared(otroA)
    let DC = selD.distanceToSquared(otroC)

    let MA = xz.distanceToSquared(otroA)
    let MB = xz.distanceToSquared(otroB)
    let MC = xz.distanceToSquared(otroC)
    let MD = xz.distanceToSquared(otroD)

      if (MA<umbralmouse) {
       if(CA<umbralsnap){
        modelos[modeloselecto].position.set(otro.position.x-otrox-selx, redcircle.position.y,otro.position.z-otroz-selz );
       }
       else if(BA<umbralsnap){
        modelos[modeloselecto].position.set(otro.position.x-otrox+selx, redcircle.position.y,otro.position.z-otroz-selz );
       }
       else if(DA<umbralsnap){
        modelos[modeloselecto].position.set(otro.position.x-otrox-selx, redcircle.position.y,otro.position.z-otroz+selz);
       }
      snaped = true
      modelos[modeloselecto].applyMatrix4(new THREE.Matrix4().makeScale(1, 1, 1));
      }
      else if (MB<umbralmouse){
       if(CB<umbralsnap){
        modelos[modeloselecto].position.set(otro.position.x-otrox-selx, redcircle.position.y,otro.position.z+otroz-selz );
       }
       else if(DB<umbralsnap){
        modelos[modeloselecto].position.set(otro.position.x-otrox-selx, redcircle.position.y,otro.position.z+otroz+selz );
       }
       else if(AB<umbralsnap){
        modelos[modeloselecto].position.set(otro.position.x-otrox+selx, redcircle.position.y,otro.position.z+otroz+selz);
       }
      snaped = true
      modelos[modeloselecto].applyMatrix4(new THREE.Matrix4().makeScale(1, 1, 1));
      }

       else if (MC<umbralmouse){
        if(BC<umbralsnap){
         modelos[modeloselecto].position.set(otro.position.x+otrox+selx, redcircle.position.y,otro.position.z+otroz-selz );
        }
        else if(AC<umbralsnap){
         modelos[modeloselecto].position.set(otro.position.x+otrox+selx, redcircle.position.y,otro.position.z+otroz+selz );
        }
        else if(DC<umbralsnap){
         modelos[modeloselecto].position.set(otro.position.x+otrox-selx, redcircle.position.y,otro.position.z+otroz+selz);
        }
       snaped = true
       modelos[modeloselecto].applyMatrix4(new THREE.Matrix4().makeScale(1, 1, 1));
       }
      else if (MD<umbralmouse){
        if(CD<umbralsnap){
         modelos[modeloselecto].position.set(otro.position.x+otrox-selx, redcircle.position.y,otro.position.z-otroz-selz );
        }
        else if(BD<umbralsnap){
         modelos[modeloselecto].position.set(otro.position.x+otrox+selx, redcircle.position.y,otro.position.z-otroz-selz );
        }
        else if(AD<umbralsnap){
         modelos[modeloselecto].position.set(otro.position.x+otrox+selx, redcircle.position.y,otro.position.z-otroz+selz);
        }
       snaped = true
       modelos[modeloselecto].applyMatrix4(new THREE.Matrix4().makeScale(1, 1, 1));
       }
      else {
        if (snaped == false){
          modelos[modeloselecto].position.copy(redcircle.position)
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
    // console.log(modelos[modeloselecto])
    // console.log("cantake es "+cantake)
      for (var p = 0; p <= modelos.length; p++){
      
       if(currentIntersect.object){
           switch(currentIntersect.object){
     
                   case floor:
     
                   console.log('clickfloor')
                   //console.log(xz)   
                   break
            
                   case modelos[p]:
                   
                  // console.log('toque a '+ p)
                    
                    
                    if(modeloselecto==null){
                    modeloselecto = p 
                   // menu()
                    moveractivado()
                    }
                    else{
                    moveractivado()
                    }
                  //console.log(modelos[modeloselecto].position.x)     
                   //console.log(modelos[modeloselecto].userData)
                 
                   break 

     
                   default:
                 //  console.log('ah??')
     
                   }
           }
          
         }
       }
      }

document.getElementById("shot").addEventListener('click', takeScreenshot);
function takeScreenshot() {
  // open in new window like this
  //
  /*
    var w = window.open('', '');
    w.document.title = "Screenshot";
    //w.document.body.style.backgroundColor = "red";
    var img = new Image();
    // Without 'preserveDrawingBuffer' set to true, we must render now
    renderer.render(scene, camera);
    img.src = renderer.domElement.toDataURL();
    w.document.body.appendChild(img);  
*/
/*   var w = window.open('', '');
  w.document.title = "Screenshot";
  //w.document.body.style.backgroundColor = "red";
  var img = new Image();
  renderer.render(scene, camera);
  img.src = renderer.domElement.toDataURL();
  w.document.body.appendChild(img);   */

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
  /*
      // download file like this.
      //
      var a = document.createElement('a');
      // Without 'preserveDrawingBuffer' set to true, we must render now
      renderer.render(scene, camera);
      a.href = renderer.domElement.toDataURL().replace("image/png", "image/octet-stream");
      a.download = 'canvas.png'
      a.click();
  */
  // New version of file download using toBlob.
  // toBlob should be faster than toDataUrl.
  // But maybe not because also calling createOjectURL.
  //
/*   renderer.render(scene, camera);
  renderer.domElement.toBlob(function(blob) {
    var a = document.createElement('a');
    var url = URL.createObjectURL(blob);
    a.href = url;
    a.download = 'Captura.png';
    a.click();
  }, 'image/png', 1.0); */
}
/*        
function setMaterial(parent, type, mtl) {
    parent.traverse((o) => {
      if (o.isMesh && o.nameID != null) {
        if (o.nameID == type) {
             o.material = mtl;
         }
      }
   });
  } */
  /* 
  <div class="radial menu" title="Click To Open">
  <input id="radialMenu" type="checkbox">
  <label class="radialPivot" for="radialMenu">
    <span class="far fa-compass">A</span>
    <span class="sronly">Show menu items</span>
  </label>
  <ul class="radialList compass" role="navigation" aria-label="menu items">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
    ...
  </ul>
</div>
*/
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
    var prices = document.createElement("LI");
    prices.className = 'precios';
    document.getElementById("items").appendChild(names);
    document.getElementById("items").appendChild(prices);
    for (var i = 0; i < modelos.length; i++){

      let name = modelos[i].userData[2]
    
      let price = modelos[i].userData[3]
      
      total += price
      var nuevoname = document.createElement("P");

      var nuevonamet = document.createTextNode(name);

      var nuevoprice = document.createElement("P");

      var nuevopricet = document.createTextNode(price);

     // var brt = document.createElement('br');
     // var brp = document.createElement('br');
      nuevoname.appendChild(nuevonamet);
      names.appendChild(nuevoname);
      nuevoprice.appendChild(nuevopricet);
      prices.appendChild(nuevoprice);
      //names.appendChild(brt);
     // nuevoprice.appendChild(brp);
      if (modeloselecto == i){
        nuevoname.style.textDecoration = "underline";
      }
      else if (modeloselecto ==null){
        names.style.textDecoration = "";
      }
    }
    document.getElementById("total").innerHTML = "<strong>&nbsp;Total: &nbsp;&nbsp;&nbsp;&nbsp;</strong>"+ total;

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
      //console.log(choque)
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

/*     if(cantake == true){
      if (modeloselecto == null){
        // your code here.
      }
      else {         
        Snaps()
        
      // coso.position.copy(modelos[modeloselecto].position) 
  
      }
    } */
   // Render
    renderer.render(scene, camera)


    setTimeout( function() {

       window.requestAnimationFrame(tick)

     }, 1000 / 50 );

    // Call tick again on the next frame
  //  window.requestAnimationFrame(tick)
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