import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


function setupModel(data){
    const model = data.scene.children[0];
    const clip = data.animations[0];

    //播放器
    const mixer = new THREE.AnimationMixer(model);
    const action = mixer.clipAction(clip);

    action.play();
    model.tick = (delta) => mixer.update(delta);

    //mixer.clipAction();
    return model;
}

const loader = new GLTFLoader();

// const parrotData = await loader.loadAsync('./src/assets/models/Parrot.glb')
// const flamingoData = await loader.loadAsync('./src/assets/models/Flamingo.glb')
// const storkData = await loader.loadAsync('./src/assets/models/Stork.glb')

const [parrotData,flamingoData,storkData] = await Promise.all([
    loader.loadAsync('./src/assets/models/Parrot.glb'),
    loader.loadAsync('./src/assets/models/Flamingo.glb'),
    loader.loadAsync('./src/assets/models/Stork.glb')

])

const parrot =setupModel(parrotData);
const flamingo =setupModel(flamingoData);
const stork =setupModel(storkData);

parrot.position.set(5,3,0)
flamingo.position.set(80,60,-200)
stork.position.set(-80,50,-200)

export default [parrot,flamingo,stork];