import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { Clock } from 'three';

import model from "./demo/bird.js";


let camera, scene, renderer, stats;
const clock = new Clock();

function init(){
    scene = new THREE.Scene();

    //添加物体
    scene.add(model[0],model[1],model[2]);

    //相机
    camera = new THREE.PerspectiveCamera(
        90, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000, 
    );
    camera.position.set(-50,20,100);
    camera.lookAt(50,50,0);

    //光源
    const pointLight = new THREE.PointLight(0xffffff, 8);
    pointLight.position.set(50, 10, 60);
    pointLight.decay = 0;  //设置光源不随距离衰减
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    scene.background = new THREE.Color("rgb(143,188,212)");

    renderer = new THREE.WebGLRenderer({antialias:true,});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.render(scene,camera);
    
    document.body.appendChild(renderer.domElement);

    window.onresize = onWindowResize;

    //视图辅助
    initHelper();

}

function animate(){
    renderer.setAnimationLoop(()=>{
        renderer.render(scene,camera);

        const delta = clock.getDelta();
        model.forEach(model => model.tick(delta));

    })
    
}

function onWindowResize(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function initHelper(){
    //轨道控制器
    const constrols = new OrbitControls(camera,renderer.domElement);
    constrols.addEventListener('change',() => {
        renderer.render(scene,camera);
    })


    stats = new Stats();
    //stats.domElement:web页面上输出计算结果,一个div元素，
    document.body.appendChild(stats.domElement);
}


init();
animate();