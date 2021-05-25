
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
      shininess: 15
  },
  {
  texture: './texturas/rosa.jpg',
  size: [8, 8, 8],
  shininess: 0
},
  {
      color: '66533C'
  },
  {
      color: '173A2F'
  },
  {
      color: '153944'
  },

  ]
  const colorssoporte = [
    {
        texture: './texturas/madera.jpg',
        size: [2,2,2],
        shininess: 60
    },
    {
        color: 'B67F45'
    },
    {
        color: 'EE9973'
    },
    {
        color: 'B4A7D6'
    },
    {
        color: '27548D'
    },
    {
        color: '438AAC'
    }  
    ]
  const bandejatapiz = document.getElementById('texturasjstapiz')
  const bandejasoporte = document.getElementById('texturasjssoporte')
     
//Modelos
const modelos = []

const pathtest = "./modelos/pt4ci01.glb";


const BACKGROUND_COLOR = 0xf1f1f1;
// Init the scene
const scene = new THREE.Scene();
// Set background
scene.background = new THREE.Color(BACKGROUND_COLOR);
scene.fog = new THREE.Fog(BACKGROUND_COLOR, 20, 100);

const canvas = document.querySelector('#c');
        alphaMap: simpleShadow
// Init the renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

// Add a camera
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1;
camera.position.x = 0;
camera.position.y = 10;

// Add lights
var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
hemiLight.position.set(0, 50, 0);
// Add hemisphere light to scene   
scene.add(hemiLight);

var dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
dirLight.position.set(-8, 12, 8);
dirLight.castShadow = true;
dirLight.shadow.mapSize = new THREE.Vector2(8192,8192);


dirLight.shadow.camera.left = - 25;
dirLight.shadow.camera.right = 25;
dirLight.shadow.camera.top = 25;
dirLight.shadow.camera.bottom = - 25;
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
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = Math.PI / 3;
controls.enableDamping = true;
controls.enablePan =  true;
controls.dampingFactor = 0.1;

// Initial material
var INITIAL_MTL_soporte = new THREE.MeshPhongMaterial({ color: 0xf1f1f1, shininess: 10 });
var INITIAL_MTL_tapiz = new THREE.MeshPhongMaterial({ color: 0xf1f1f1, shininess: 10 });
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
    

let cantake = false
let modeloselecto = null

function moveractivado(){
    if(cantake == true){
        cantake = false
    }
    else{
        cantake= true
    }
}
// Select Option
const options = document.querySelectorAll(".modelo");

//Controles
/* 
document.addEventListener('keydown', function (event) {
  if (event.key === 'm') {
    cambiarmaterial();
  }
}); */

window.addEventListener('click', toque, true)

for (const option of options) {
  option.addEventListener('mousedown',crear);
}   

function crear(){
  const geometry = new THREE.BoxBufferGeometry( 1.28, 0.76, 1.78, 1)
  const materials = new THREE.MeshBasicMaterial( {color: 0xffff00} )
  materials.transparent= true
  materials.opacity= 0.0

  const INITIAL_MAP = [
    { childID: "soporte", mtl: INITIAL_MTL_soporte },
    { childID: "tapiz", mtl: INITIAL_MTL_tapiz },];

  let i = modelos.length;

  modelos [i] = new THREE.Mesh( geometry, materials)
  modelos [i].position.copy(redcircle.position);

  loader.load(pathtest, function (gltf) {  
    gltf.scene.traverse(o => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    gltf.scene.scale.set(1, 1, 1);
    gltf.scene.position.copy(redcircle.position);
    gltf.scene.position.set(-0.625,-0.38,0.88);
    objectsToTest.push(modelos[i]);
    modelos[i].add(gltf.scene)
    scene.add(modelos[i]);
    // Set initial textures
    for (let object of INITIAL_MAP) {
      initColor(gltf.scene, object.childID, object.mtl);
    }
  
  }, undefined, function (error) {
    console.error(error);
  });
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
    /*
    //aqui agregue un cubo amarillo para probar los click
    const geometry = new THREE.BoxBufferGeometry( 1.25, 0.76, 1.75, 1)
    const materials = new THREE.MeshBasicMaterial( {color: 0xffff00} )
    materials.transparent= false
    materials.opacity= 1.0
    
  modelos [0] = new THREE.Mesh( geometry, materials)
  modelos [0].position.set(0, -0.6, 0.5);
  modelos [0].rotation.y = Math.PI/4;
  scene.add(modelos [0]);
          moveractivado()
      console.log(cantake);
  */
function cambiarmaterial(){


  if (modelos[1] == null){
    // your code here.
  }
  else {         
     console.log(modelos[1].children[0].children[0].material);
     modelos[1].children[0].children[0].material = mtls;
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
      for (var p = 0; p <= modelos.length; p++){
       if(currentIntersect.object){
           switch(currentIntersect.object){
     
               case floor:
     
                   console.log('clickfloor')
                   console.log(xz)   
                   break
            
                   case modelos[p]:

                    console.log('cuak '+ p)
                    console.log(xz)
                    moveractivado()
                    modeloselecto = p
                          
                    break 

     
               default:
                   console.log('ah??')
     
               }
           }
         }
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

// Animate Condition

const clock = new THREE.Clock()
let currentIntersect = null
let xz = null
let objectsToTest = [floor]
let rayOn = true

const tick = () =>
{
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
            redcircle.position.y = redcircle.position.y + 0.38      
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

    if(cantake == true){
      if (modeloselecto == null){
        // your code here.
      }
      else {         
        modelos[modeloselecto].position.copy(redcircle.position)
    
      }
    }
   // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
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
  var canvasPixelWidth = canvas.width / window.devicePixelRatio;
  var canvasPixelHeight = canvas.height / window.devicePixelRatio;

  controls.update();

  const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
  if (needResize) {

    renderer.setSize(width, height, false);
  }
  return needResize;
  
}
tick()
