/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/engine/ec.ts":
/*!**************************!*\
  !*** ./src/engine/ec.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "registerComponent": () => (/* binding */ registerComponent),
/* harmony export */   "newEntity": () => (/* binding */ newEntity),
/* harmony export */   "addComponent": () => (/* binding */ addComponent),
/* harmony export */   "removeComponent": () => (/* binding */ removeComponent),
/* harmony export */   "removeEntity": () => (/* binding */ removeEntity),
/* harmony export */   "createECState": () => (/* binding */ createECState)
/* harmony export */ });
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/engine/state.ts");

const registerComponent = (components, componentName) => (Object.assign(Object.assign({}, components), { [componentName]: new Map() }));
const newEntity = (entities, entityId) => {
    entities.set(entityId, []);
    return entities;
};
const addComponent = (state, entityId, storage, component) => {
    const entities = state.entities;
    const components = state.components;
    const componentStorage = components[storage];
    const entity = entities.get(entityId);
    if (!entity)
        throw Error("Add Component: Entity does not exist!");
    if (!componentStorage)
        throw Error("Add Component: No registered component storage!");
    components[storage].set(entityId, component);
    entities.set(entityId, [...entity, storage]);
    state.entities = entities;
    state.components = components;
    return state;
};
const removeComponent = (state, entityId, storage) => {
    const entities = state.entities;
    const components = state.components;
    const componentStorage = components[storage];
    const entity = entities.get(entityId);
    if (!entity)
        return state;
    //throw Error("Remove Component: Entity does not exist!");
    if (!componentStorage)
        return state;
    // throw Error("Remove Component: No registered component storage!");
    components[storage].delete(entityId);
    const edges = entity.filter(v => v !== storage);
    entities.set(entityId, edges);
    state.entities = entities;
    state.components = components;
    return state;
};
const removeEntity = (state, entityId) => {
    const entities = state.entities;
    const components = state.components;
    const entity = entities.get(entityId);
    if (!entity)
        return state;
    const componentList = [...entity];
    for (let i = 0; i < componentList.length; i++)
        state = removeComponent(state, entityId, componentList[i]);
    entities.delete(entityId);
    state.entities = entities;
    state.components = components;
    return state;
};
;
const createECState = (gl) => {
    const state = (0,_state__WEBPACK_IMPORTED_MODULE_0__.createState)(gl);
    return Object.assign(Object.assign({}, state), { entities: new Map(), components: {} });
};


/***/ }),

/***/ "./src/engine/freeCamera.ts":
/*!**********************************!*\
  !*** ./src/engine/freeCamera.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projectionMatrix": () => (/* binding */ projectionMatrix),
/* harmony export */   "createCamera": () => (/* binding */ createCamera),
/* harmony export */   "recalculateView": () => (/* binding */ recalculateView),
/* harmony export */   "freeCameraInput": () => (/* binding */ freeCameraInput)
/* harmony export */ });
/* harmony import */ var _math_gl_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @math.gl/core */ "./node_modules/@math.gl/core/dist/esm/classes/matrix4.js");
/* harmony import */ var _math_gl_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @math.gl/core */ "./node_modules/@math.gl/core/dist/esm/classes/vector3.js");
/* harmony import */ var _lib_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/math */ "./src/lib/math.ts");


const projectionMatrix = (w, h) => (new _math_gl_core__WEBPACK_IMPORTED_MODULE_1__["default"]().perspective({
    fov: 70,
    fovy: (Math.PI * 70) / 180,
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 1000.0
}));
const createCamera = (gl) => {
    const camera = {
        projection: projectionMatrix(window.innerWidth, window.innerHeight),
        view: new _math_gl_core__WEBPACK_IMPORTED_MODULE_1__["default"]().identity(),
        position: new _math_gl_core__WEBPACK_IMPORTED_MODULE_2__["default"](0, 0, 1),
        direction: new _math_gl_core__WEBPACK_IMPORTED_MODULE_2__["default"](0, 0, -1),
        speed: 10,
        pitch: 0,
        yaw: -90.0,
        // atlas: loadTexture(gl, atlasUrl),
        // activeInput: new Set<string>()
    };
    // updateCamera(player);
    window.onresize = onResize(gl, camera);
    return camera;
};
const onResize = (gl, camera) => () => {
    const w = window.innerWidth, h = window.innerHeight;
    gl.canvas.width = w;
    gl.canvas.height = h;
    gl.viewport(0, 0, w, h);
    camera.projection = projectionMatrix(w, h);
};
const recalculateView = (camera) => {
    const pos = camera.position;
    const dir = camera.direction;
    const pitch = (0,_lib_math__WEBPACK_IMPORTED_MODULE_0__.radians)(camera.pitch);
    const yaw = (0,_lib_math__WEBPACK_IMPORTED_MODULE_0__.radians)(camera.yaw);
    dir.x = Math.cos(yaw) * Math.cos(pitch);
    dir.y = Math.sin(pitch);
    dir.z = Math.sin(yaw) * Math.cos(pitch);
    camera.view.lookAt([pos.x, pos.y, pos.z], [pos.x + dir.x, pos.y + dir.y, pos.z + dir.z], [0, 1.0, 0]);
    return camera;
};
/*
const rayTrace = (entities: Entity[], components: Components, player: Player) => (stepValue: number, numSteps: number) => (onHit: (pos: Vector3) => void) => {

  const step = multiplyAndDestructVector3(player.direction, stepValue);
  const ray = new Vector3(player.position.x, player.position.y, player.position.z);

  for(let i = 0; i < numSteps; i++) {
    
    if(getBlock(entities, components)(ray) != 0) {
      onHit(ray);
      return;
    }

    ray.x = ray.x + step[0];
    ray.y = ray.y + step[1];
    ray.z = ray.z + step[2];
  }

};
*/
const freeCameraInput = (camera, state, delta) => {
    const activeInput = state.activeInput;
    const mouseMovement = state.mouseMovement;
    const lock = state.lock;
    if (!lock)
        return camera;
    let speed = camera.speed;
    const up = new _math_gl_core__WEBPACK_IMPORTED_MODULE_2__["default"](0, 1, 0);
    const move = (0,_lib_math__WEBPACK_IMPORTED_MODULE_0__.multiplyAndDestructVector3)(camera.direction, speed * delta);
    const strafe = (0,_lib_math__WEBPACK_IMPORTED_MODULE_0__.multiplyAndDestructVector3)((0,_lib_math__WEBPACK_IMPORTED_MODULE_0__.functionalCrossVector3)(camera.direction, up), speed * delta);
    if (activeInput.has("w"))
        camera.position.add(move);
    if (activeInput.has("s"))
        camera.position.subtract(move);
    if (activeInput.has("a"))
        camera.position.subtract(strafe);
    if (activeInput.has("d"))
        camera.position.add(strafe);
    if (activeInput.has(" "))
        camera.position.add((0,_lib_math__WEBPACK_IMPORTED_MODULE_0__.multiplyAndDestructVector3)(up, delta * speed));
    if (activeInput.has("shift"))
        camera.position.subtract((0,_lib_math__WEBPACK_IMPORTED_MODULE_0__.multiplyAndDestructVector3)(up, delta * speed));
    camera.yaw += mouseMovement[0];
    camera.pitch -= mouseMovement[1];
    if (camera.pitch > 89.0)
        camera.pitch = 89.0;
    if (camera.pitch < -89.0)
        camera.pitch = -89.0;
    return recalculateView(camera);
    /*
    document.onclick = (e) => {
  
      rayTrace(entities, components, player)(0.05, 100)((pos: Vector3) => {
        setBlock(entities, components)(pos, 0);
        updateChunk(gl, entities, components)(pos);
      });
    }
    */
};


/***/ }),

/***/ "./src/engine/state.ts":
/*!*****************************!*\
  !*** ./src/engine/state.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createState": () => (/* binding */ createState),
/* harmony export */   "addSystem": () => (/* binding */ addSystem),
/* harmony export */   "dispatch": () => (/* binding */ dispatch)
/* harmony export */ });
;
const createState = (gl) => {
    const state = {
        systems: new Map(),
        activeInput: new Set(),
        mouseMovement: [0, 0],
        queue: [],
        lock: false,
    };
    return state;
};
const addSystem = (state, type, system) => {
    const systems = state.systems;
    const systemContainer = systems.get(type);
    if (!systemContainer) {
        systems.set(type, [system]);
        return state;
    }
    systemContainer === null || systemContainer === void 0 ? void 0 : systemContainer.push(system);
    return state;
};
const dispatch = (gl, state, type, delta) => (data) => {
    const systems = state.systems;
    const system = systems.get(type);
    if (!system)
        return state;
    //throw Error("Dispatch: System not registered");
    for (let i = 0; i < system.length; i++)
        state = system[i](gl, state, delta)(data);
    return state;
};
// need to create addSystem and seperate components/entities into another file


/***/ }),

/***/ "./src/example/chunk/chunk.ts":
/*!************************************!*\
  !*** ./src/example/chunk/chunk.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChunkFactory": () => (/* binding */ ChunkFactory),
/* harmony export */   "chunkId": () => (/* binding */ chunkId),
/* harmony export */   "chunkPosFromBlockPos": () => (/* binding */ chunkPosFromBlockPos),
/* harmony export */   "localBlockPosToIndex": () => (/* binding */ localBlockPosToIndex),
/* harmony export */   "loadChunk": () => (/* binding */ loadChunk),
/* harmony export */   "loadManyChunks": () => (/* binding */ loadManyChunks),
/* harmony export */   "updateChunk": () => (/* binding */ updateChunk),
/* harmony export */   "unloadChunk": () => (/* binding */ unloadChunk),
/* harmony export */   "setBlock": () => (/* binding */ setBlock),
/* harmony export */   "getBlock": () => (/* binding */ getBlock)
/* harmony export */ });
/* harmony import */ var _math_gl_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @math.gl/core */ "./node_modules/@math.gl/core/dist/esm/classes/vector3.js");
/* harmony import */ var _engine_ec__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../engine/ec */ "./src/engine/ec.ts");
/* harmony import */ var _mesh__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mesh */ "./src/example/chunk/mesh.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../index */ "./src/example/index.ts");
/* harmony import */ var _generation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../generation */ "./src/example/generation.ts");





const ChunkFactory = (gl) => ({
    chunkSize: 8,
    loadDistance: 3,
    blockDictionary: (0,_index__WEBPACK_IMPORTED_MODULE_2__.createBlockDictionary)(),
});
const chunkId = (pos) => (`chu-${pos[0]}-${pos[1]}-${pos[2]}`);
const chunkPosFromBlockPos = (chunkFactory, pos) => (new _math_gl_core__WEBPACK_IMPORTED_MODULE_4__["default"](Math.floor(pos[0] / chunkFactory.chunkSize), Math.floor(pos[1] / chunkFactory.chunkSize), Math.floor(pos[2] / chunkFactory.chunkSize)));
const localBlockPosToIndex = (chunkFactory, x, y, z) => {
    const chunkSize = chunkFactory.chunkSize;
    return (x + y * chunkSize + z * chunkSize * chunkSize);
};
/** Start EXPOSED CHUNK FUNCTIONS **/
// SYNCHRONOUS
const loadChunk = (gl, state, pos) => {
    const entities = state.entities;
    const components = state.components;
    const chunkFactory = state.chunkFactory;
    const entityId = chunkId(pos);
    if (state.entities.has(entityId))
        return state;
    const entity = (0,_engine_ec__WEBPACK_IMPORTED_MODULE_0__.newEntity)(entities, entityId);
    const structure = (0,_generation__WEBPACK_IMPORTED_MODULE_3__.generateStructure)(chunkFactory, pos);
    state = (0,_engine_ec__WEBPACK_IMPORTED_MODULE_0__.addComponent)(state, entityId, "structures", structure);
    const renderObject = buildChunk(gl, state, pos);
    state = (0,_engine_ec__WEBPACK_IMPORTED_MODULE_0__.addComponent)(state, entityId, "renderObjects", renderObject);
    state = (0,_engine_ec__WEBPACK_IMPORTED_MODULE_0__.addComponent)(state, entityId, "chunkPos", pos);
    return state;
};
// ASYNCHRONOUS
const loadManyChunks = (gl, state, pos) => {
    const entities = state.entities;
    const components = state.components;
    const structures = components["structures"];
    const chunkFactory = state.chunkFactory;
    let activeThreads = 0;
    for (let i = 0; i < pos.length; i++) {
        const entityId = chunkId(pos[i]);
        if (state.entities.has(entityId))
            continue;
        const entity = (0,_engine_ec__WEBPACK_IMPORTED_MODULE_0__.newEntity)(entities, entityId);
        const structure = (0,_generation__WEBPACK_IMPORTED_MODULE_3__.generateStructure)(chunkFactory, pos[i]);
        state = (0,_engine_ec__WEBPACK_IMPORTED_MODULE_0__.addComponent)(state, entityId, "structures", structure);
        state = (0,_engine_ec__WEBPACK_IMPORTED_MODULE_0__.addComponent)(state, entityId, "chunkPos", pos[i]);
        const worker = new Worker(new URL(/* worker import */ __webpack_require__.p + __webpack_require__.u("src_example_chunk_chunk_ts"), __webpack_require__.b), { type: undefined });
        activeThreads++;
        worker.postMessage({ chunkFactory, structures, pos: pos[i] });
        worker.onmessage = (e) => {
            console.log(`Active threads: ${activeThreads}`);
            if (activeThreads == 1 && state.isStartup) {
                // disable generating text
                const s = document.getElementById("intro");
                if (s)
                    s.hidden = true;
                state.isStartup = false;
            }
            activeThreads--;
            const renderObject = (0,_mesh__WEBPACK_IMPORTED_MODULE_1__.createChunkRenderObject)(gl, state.program, state.chunkFactory, pos[i], e.data);
            state = (0,_engine_ec__WEBPACK_IMPORTED_MODULE_0__.addComponent)(state, entityId, "renderObjects", renderObject);
            worker.terminate();
        };
    }
    return state;
};
// FIXME: don't create a new VAO every time, just update the existing
const updateChunk = (gl, state, pos) => {
    const cid = chunkId(pos);
    const renderObject = buildChunk(gl, state, pos);
    state = (0,_engine_ec__WEBPACK_IMPORTED_MODULE_0__.addComponent)(state, cid, "renderObjects", renderObject);
    return state;
};
const unloadChunk = (state, pos) => {
    const entityId = chunkId(pos);
    if (!state.entities.has(entityId))
        return state;
    return (0,_engine_ec__WEBPACK_IMPORTED_MODULE_0__.removeEntity)(state, entityId);
};
/** End EXPOSED CHUNK FUNCTIONS */
// FIXME: doesn't set the block if it's not loaded
const setBlock = (state, pos, blockId) => {
    var _a;
    const chunkSize = state.chunkFactory.chunkSize;
    const blockPos = new _math_gl_core__WEBPACK_IMPORTED_MODULE_4__["default"](Math.floor(pos[0]), Math.floor(pos[1]), Math.floor(pos[2]));
    const localPos = new _math_gl_core__WEBPACK_IMPORTED_MODULE_4__["default"](((blockPos[0] % chunkSize) + chunkSize) % chunkSize, ((blockPos[1] % chunkSize) + chunkSize) % chunkSize, ((blockPos[2] % chunkSize) + chunkSize) % chunkSize);
    const chunkPos = chunkPosFromBlockPos(state.chunkFactory, blockPos);
    const chunkEntity = chunkId(chunkPos);
    const structure = (_a = state.components["structures"]) === null || _a === void 0 ? void 0 : _a.get(chunkEntity);
    // if structure exists set block and replace it
    if (structure) {
        const t = new Float64Array(structure);
        t[localBlockPosToIndex(state.chunkFactory, localPos[0], localPos[1], localPos[2])] = blockId;
        state = (0,_engine_ec__WEBPACK_IMPORTED_MODULE_0__.addComponent)(state, chunkEntity, "structures", structure);
    }
    return state;
};
// FIXME: does not work for some reason
const getBlock = (chunkFactory, structures, pos) => {
    const chunkSize = chunkFactory.chunkSize;
    const blockPos = new _math_gl_core__WEBPACK_IMPORTED_MODULE_4__["default"](Math.floor(pos[0]), Math.floor(pos[1]), Math.floor(pos[2]));
    const localPos = new _math_gl_core__WEBPACK_IMPORTED_MODULE_4__["default"](((blockPos[0] % chunkSize) + chunkSize) % chunkSize, ((blockPos[1] % chunkSize) + chunkSize) % chunkSize, ((blockPos[2] % chunkSize) + chunkSize) % chunkSize);
    const chunkPos = chunkPosFromBlockPos(chunkFactory, blockPos);
    //const chunkEntity = chunkId(chunkPos);
    const chunkEntity = `chu-${chunkPos[0]}-${chunkPos[1]}-${chunkPos[2]}`;
    const structure = structures.get(chunkEntity);
    if (structure) {
        const t = new Float64Array(structure);
        return t[localBlockPosToIndex(chunkFactory, localPos[0], localPos[1], localPos[2])];
    }
    return (0,_generation__WEBPACK_IMPORTED_MODULE_3__.generateBlock)(chunkFactory, pos);
};
// used for updating/meshing
const buildChunk = (gl, state, pos) => {
    const mesh = (0,_mesh__WEBPACK_IMPORTED_MODULE_1__.naiveMeshing)(state.chunkFactory, state.components["structures"], pos);
    const renderObject = (0,_mesh__WEBPACK_IMPORTED_MODULE_1__.createChunkRenderObject)(gl, state.program, state.chunkFactory, pos, mesh);
    return renderObject;
};


/***/ }),

/***/ "./src/example/chunk/mesh.ts":
/*!***********************************!*\
  !*** ./src/example/chunk/mesh.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "chunkVertexShader": () => (/* binding */ chunkVertexShader),
/* harmony export */   "chunkFragmentShader": () => (/* binding */ chunkFragmentShader),
/* harmony export */   "createChunkRenderObject": () => (/* binding */ createChunkRenderObject),
/* harmony export */   "sum": () => (/* binding */ sum),
/* harmony export */   "calculateAO": () => (/* binding */ calculateAO),
/* harmony export */   "naiveMeshing": () => (/* binding */ naiveMeshing),
/* harmony export */   "fullBlockMesh": () => (/* binding */ fullBlockMesh)
/* harmony export */ });
/* harmony import */ var _math_gl_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @math.gl/core */ "./node_modules/@math.gl/core/dist/esm/classes/matrix4.js");
/* harmony import */ var _math_gl_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @math.gl/core */ "./node_modules/@math.gl/core/dist/esm/classes/vector3.js");
/* harmony import */ var _chunk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk */ "./src/example/chunk/chunk.ts");


const chunkVertexShader = `#version 300 es
  in vec3 v_Position;
  in vec2 uv_Coords;
  in float ao_Coords;

  uniform mat4 projection;
  uniform mat4 view;
  uniform mat4 model;
  
  out float ao;
  out vec3 fog_depth;
  out vec2 text_coords;
  
  void main() {
    
    text_coords = uv_Coords;
    ao = ao_Coords;
    
    fog_depth = (view * model * vec4(v_Position, 1.0)).xyz;

    gl_Position = projection * view * model * vec4(v_Position, 1.0);
  }
`;
const chunkFragmentShader = `#version 300 es
  precision highp float;
  
  in vec2 text_coords;
  in float ao;
  in vec3 fog_depth;
  
  uniform sampler2D texture_atlas;
  
  out vec4 frag_color;

  void main() {
    
    float aoIntensity = ao / 2.0;
    float darkenAmount = 1.0 / (aoIntensity + 1.0);
    
    vec4 atlas = texture(texture_atlas, text_coords);

    float fog_near = 18.0;
    float fog_far = 24.0;
    float fog_amount = smoothstep(fog_near, fog_far, length(fog_depth));
    vec4 fog_color = vec4(1.0);

    frag_color = mix(vec4(darkenAmount * atlas.xyz, atlas.w), fog_color, fog_amount);
  }
`;
const createChunkRenderObject = (gl, program, chunkFactory, pos, mesh) => {
    const chunkSize = chunkFactory.chunkSize;
    const vao = gl.createVertexArray();
    const vbo = gl.createBuffer();
    if (!vao)
        throw new Error("Failed creating VAO");
    if (!vbo)
        throw new Error("Failed creating VBO");
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, mesh, gl.STATIC_DRAW);
    const vertexSize = 3;
    const uvSize = 2;
    const aoSize = 1;
    const stride = 4 * (vertexSize + uvSize + aoSize);
    const vertexOffset = 0;
    const uvOffset = 4 * 3;
    const aoOffset = 4 * 5;
    const positionAttributeLocation = gl.getAttribLocation(program, 'v_Position');
    gl.vertexAttribPointer(positionAttributeLocation, vertexSize, gl.FLOAT, false, stride, vertexOffset);
    gl.enableVertexAttribArray(positionAttributeLocation);
    const uvAttributeLocation = gl.getAttribLocation(program, 'uv_Coords');
    gl.vertexAttribPointer(uvAttributeLocation, uvSize, gl.FLOAT, false, stride, uvOffset);
    gl.enableVertexAttribArray(uvAttributeLocation);
    const aoAttributeLocation = gl.getAttribLocation(program, 'ao_Coords');
    gl.vertexAttribPointer(aoAttributeLocation, aoSize, gl.FLOAT, false, stride, aoOffset);
    gl.enableVertexAttribArray(aoAttributeLocation);
    const count = mesh.length / 6;
    const model = new _math_gl_core__WEBPACK_IMPORTED_MODULE_1__["default"]();
    model.identity().translate([pos.x * chunkSize, pos.y * chunkSize, pos.z * chunkSize]);
    return {
        lod: 0,
        vao,
        program,
        model,
        vertexCount: count,
        wireframe: false
    };
};
/*
export const updateChunkRenderObject = (gl: WebGL2RenderingContext, program: WebGLProgram) => (previous: StaticRenderObjectComponent, mesh: Float32Array) => {

  const { vao, vbo, program, model, count } = previous;

  gl.bindVertexArray(vao);

  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, mesh, gl.STATIC_DRAW);

  previous.count = mesh.length / 5;
};
*/
const sum = (a, b) => {
    return new _math_gl_core__WEBPACK_IMPORTED_MODULE_2__["default"]([a[0] + b[0], a[1] + b[1], a[2] + b[2]]);
};
const calculateAO = (side1, corner1, side2, corner2, side3, corner3, side4, corner4) => {
    let v1 = (side1 && 1) + (side2 && 1) + (corner1 && 1);
    let v2 = (side2 && 1) + (side3 && 1) + (corner2 && 1);
    let v3 = (side3 && 1) + (side4 && 1) + (corner3 && 1);
    let v4 = (side4 && 1) + (side1 && 1) + (corner4 && 1);
    return [v1, v2, v3, v4];
};
// pass in all the block data and then return the vertex array
// In the future may implement a greedy algorithm to cut down on
// vertex count
// This sets the vertices/textures/ambient occlusion
const naiveMeshing = (chunkFactory, structures, pos) => {
    const output = [];
    //console.log(structures);
    const cId = `chu-${pos[0]}-${pos[1]}-${pos[2]}`;
    //console.log(cId);
    const chunkSize = chunkFactory.chunkSize;
    const blockStructure = structures.get(cId);
    if (!blockStructure) {
        return new Float32Array();
    }
    const dict = chunkFactory.blockDictionary;
    const startPos = new _math_gl_core__WEBPACK_IMPORTED_MODULE_2__["default"](pos[0] * chunkSize, pos[1] * chunkSize, pos[2] * chunkSize);
    for (let i = 0; i < chunkSize; i++) {
        for (let j = 0; j < chunkSize; j++) {
            for (let k = 0; k < chunkSize; k++) {
                //if(i == 0 && j == 0 && k == 0)
                //  console.log("Did we get here? 1")
                const blockPos = sum(startPos, ([i, j, k]));
                if ((0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, blockPos) == 0)
                    continue;
                if ((0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, blockPos) == 0)
                    continue;
                const blockId = (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, blockPos);
                const block = dict[blockId];
                if ((0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, ([1, 0, 0]))) == 0)
                    output.push(...fullBlockMesh.eastFace(i, j, k, block.u, block.v, calculateAO((0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [1, 1, 0])), // side
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [1, 1, 1])), // corner
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [1, 0, 1])), // side
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [1, -1, 1])), // corner
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [1, -1, 0])), // side
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [1, -1, -1])), // corner
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [1, 0, -1])), // side
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [1, 1, -1])) // corner
                    )));
                if ((0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, ([-1, 0, 0]))) == 0)
                    output.push(...fullBlockMesh.westFace(i, j, k, block.u, block.v, calculateAO((0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [-1, 1, 0])), // side
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [-1, 1, 1])), // corner
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [-1, 0, 1])), // side
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [-1, -1, 1])), // corner
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [-1, -1, 0])), // side
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [-1, -1, -1])), // corner
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [-1, 0, -1])), // side
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [-1, 1, -1])) // corner
                    )));
                if ((0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, ([0, 1, 0]))) == 0)
                    output.push(...fullBlockMesh.topFace(i, j, k, block.u, block.v, calculateAO((0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [1, 1, 0])), // side
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [1, 1, 1])), // corner
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [0, 1, 1])), // side
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [-1, 1, 1])), // corner
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [-1, 1, 0])), // side
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [-1, 1, -1])), // corner
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [0, 1, -1])), // side
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [1, 1, -1])) // corner
                    )));
                if ((0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, ([0, -1, 0]))) == 0)
                    output.push(...fullBlockMesh.bottomFace(i, j, k, block.u, block.v, calculateAO((0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [1, -1, 0])), // side
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [1, -1, 1])), // corner
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [0, -1, 1])), // side
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [-1, -1, 1])), // corner
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [-1, -1, 0])), // side
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [-1, -1, -1])), // corner
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [0, -1, -1])), // side
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [1, -1, -1])) // corner
                    )));
                if ((0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, ([0, 0, 1]))) == 0)
                    output.push(...fullBlockMesh.northFace(i, j, k, block.u, block.v, calculateAO((0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [1, 0, 1])), // side
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [1, 1, 1])), // corner
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [0, 1, 1])), // side
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [-1, 1, 1])), // corner
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [-1, 0, 1])), // side
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [-1, -1, 1])), // corner
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [0, -1, 1])), // side
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [1, -1, 1])) // corner
                    )));
                if ((0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, ([0, 0, -1]))) == 0)
                    output.push(...fullBlockMesh.southFace(i, j, k, block.u, block.v, calculateAO((0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [1, 0, -1])), // side
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [1, 1, -1])), // corner
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [0, 1, -1])), // side
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [-1, 1, -1])), // corner
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [-1, 0, -1])), // side
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [-1, -1, -1])), // corner
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [0, -1, -1])), // side
                    (0,_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(chunkFactory, structures, sum(blockPos, [1, -1, -1])) // corner
                    )));
                // skip over special blocks for now
                // if(block.type != 'fullBlock' || block.type == 'none')
                //  continue;
            }
        }
    }
    //console.log("In meshing");
    //console.log(output);
    return new Float32Array(output);
};
// texture offsets so that there are no borders from how sampling the texture
const textureWidthOffset = 0.0625;
const textureWidthStart = 0.00;
// TODO: replace textureWidthOffset with texel dimensions
const fullBlockMesh = {
    southFace: (x, y, z, u, v, ao) => ([
        0.0 + x, 0.0 + y, 0.0 + z, u + textureWidthStart, v + textureWidthStart, ao[2],
        1.0 + x, 1.0 + y, 0.0 + z, u + textureWidthOffset, v + textureWidthOffset, ao[0],
        1.0 + x, 0.0 + y, 0.0 + z, u + textureWidthOffset, v + textureWidthStart, ao[3],
        0.0 + x, 0.0 + y, 0.0 + z, u + textureWidthStart, v + textureWidthStart, ao[2],
        0.0 + x, 1.0 + y, 0.0 + z, u + textureWidthStart, v + textureWidthOffset, ao[1],
        1.0 + x, 1.0 + y, 0.0 + z, u + textureWidthOffset, v + textureWidthOffset, ao[0]
    ]),
    northFace: (x, y, z, u, v, ao) => ([
        0.0 + x, 0.0 + y, 1.0 + z, u + textureWidthStart, v + textureWidthStart, ao[2],
        1.0 + x, 0.0 + y, 1.0 + z, u + textureWidthStart, v + textureWidthOffset, ao[3],
        1.0 + x, 1.0 + y, 1.0 + z, u + textureWidthOffset, v + textureWidthOffset, ao[0],
        0.0 + x, 0.0 + y, 1.0 + z, u + textureWidthStart, v + textureWidthStart, ao[2],
        1.0 + x, 1.0 + y, 1.0 + z, u + textureWidthOffset, v + textureWidthOffset, ao[0],
        0.0 + x, 1.0 + y, 1.0 + z, u + textureWidthStart, v + textureWidthOffset, ao[1]
    ]),
    westFace: (x, y, z, u, v, ao) => ([
        0.0 + x, 0.0 + y, 0.0 + z, u + textureWidthStart, v + textureWidthStart, ao[2],
        0.0 + x, 0.0 + y, 1.0 + z, u + textureWidthStart, v + textureWidthOffset, ao[1],
        0.0 + x, 1.0 + y, 1.0 + z, u + textureWidthOffset, v + textureWidthOffset, ao[0],
        0.0 + x, 0.0 + y, 0.0 + z, u + textureWidthStart, v + textureWidthStart, ao[2],
        0.0 + x, 1.0 + y, 1.0 + z, u + textureWidthOffset, v + textureWidthOffset, ao[0],
        0.0 + x, 1.0 + y, 0.0 + z, u + textureWidthOffset, v + textureWidthStart, ao[3]
    ]),
    eastFace: (x, y, z, u, v, ao) => ([
        1.0 + x, 0.0 + y, 0.0 + z, u + textureWidthStart, v + textureWidthStart, ao[2],
        1.0 + x, 1.0 + y, 0.0 + z, u + textureWidthOffset, v + textureWidthStart, ao[3],
        1.0 + x, 1.0 + y, 1.0 + z, u + textureWidthOffset, v + textureWidthOffset, ao[0],
        1.0 + x, 0.0 + y, 0.0 + z, u + textureWidthStart, v + textureWidthStart, ao[2],
        1.0 + x, 1.0 + y, 1.0 + z, u + textureWidthOffset, v + textureWidthOffset, ao[0],
        1.0 + x, 0.0 + y, 1.0 + z, u + textureWidthStart, v + textureWidthOffset, ao[1]
    ]),
    topFace: (x, y, z, u, v, ao) => ([
        0.0 + x, 1.0 + y, 0.0 + z, u + textureWidthStart, v + textureWidthStart, ao[2],
        1.0 + x, 1.0 + y, 1.0 + z, u + textureWidthOffset, v + textureWidthOffset, ao[0],
        1.0 + x, 1.0 + y, 0.0 + z, u + textureWidthOffset, v + textureWidthStart, ao[3],
        0.0 + x, 1.0 + y, 0.0 + z, u + textureWidthStart, v + textureWidthStart, ao[2],
        0.0 + x, 1.0 + y, 1.0 + z, u + textureWidthStart, v + textureWidthOffset, ao[1],
        1.0 + x, 1.0 + y, 1.0 + z, u + textureWidthOffset, v + textureWidthOffset, ao[0] // ao[3]
    ]),
    bottomFace: (x, y, z, u, v, ao) => ([
        0.0 + x, 0.0 + y, 0.0 + z, u + textureWidthStart, v + textureWidthStart, ao[2],
        1.0 + x, 0.0 + y, 0.0 + z, u + textureWidthOffset, v + textureWidthStart, ao[3],
        1.0 + x, 0.0 + y, 1.0 + z, u + textureWidthOffset, v + textureWidthOffset, ao[0],
        0.0 + x, 0.0 + y, 0.0 + z, u + textureWidthStart, v + textureWidthStart, ao[2],
        1.0 + x, 0.0 + y, 1.0 + z, u + textureWidthOffset, v + textureWidthOffset, ao[0],
        0.0 + x, 0.0 + y, 1.0 + z, u + textureWidthStart, v + textureWidthOffset, ao[1]
    ]),
};


/***/ }),

/***/ "./src/example/generation.ts":
/*!***********************************!*\
  !*** ./src/example/generation.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "noise": () => (/* binding */ noise),
/* harmony export */   "generateBlock": () => (/* binding */ generateBlock),
/* harmony export */   "generateStructure": () => (/* binding */ generateStructure)
/* harmony export */ });
/* harmony import */ var _math_gl_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @math.gl/core */ "./node_modules/@math.gl/core/dist/esm/classes/vector3.js");
/* harmony import */ var _chunk_chunk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk/chunk */ "./src/example/chunk/chunk.ts");
/* harmony import */ var simplex_noise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! simplex-noise */ "./node_modules/simplex-noise/dist/esm/simplex-noise.js");



// copy some noise code
const noise = (x, y) => {
    return 0.5;
};
const generateBlock = (chunkFactory, pos) => {
    const n = new simplex_noise__WEBPACK_IMPORTED_MODULE_1__["default"]("test");
    const chunkSize = chunkFactory.chunkSize;
    const baseHeight = chunkSize / 2;
    const wavelength = chunkSize * 2;
    const height = chunkSize / 4;
    // check for already loaded chunks
    const h = baseHeight + height * n.noise2D(pos[0] / wavelength, pos[2] / wavelength);
    const ran = n.noise3D(pos[0] / wavelength, pos[1] / wavelength, pos[2] / wavelength);
    if (pos[1] < h && ran < 0.4) {
        if (pos[1] == h - 1)
            return 1;
        if (pos[1] > h - 3)
            return 2;
        return 3;
    }
    if (pos[1] > 4 * h)
        return 3;
    return 0;
};
const generateStructure = (chunkFactory, pos) => {
    const output = new SharedArrayBuffer(8 * (Math.pow(chunkFactory.chunkSize, 3)));
    const t = new Float64Array(output);
    const entityId = (0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_0__.chunkId)(pos);
    const chunkSize = chunkFactory.chunkSize;
    const blockPos = new _math_gl_core__WEBPACK_IMPORTED_MODULE_2__["default"](pos[0] * chunkSize, pos[1] * chunkSize, pos[2] * chunkSize);
    // set the blocks
    for (let i = 0; i < chunkSize; i++) { // x
        for (let j = 0; j < chunkSize; j++) { // y
            for (let k = 0; k < chunkSize; k++) { // z
                const gx = blockPos[0] + i;
                const gy = blockPos[1] + j;
                const gz = blockPos[2] + k;
                const l = (0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_0__.localBlockPosToIndex)(chunkFactory, i, j, k);
                t[l] = generateBlock(chunkFactory, new _math_gl_core__WEBPACK_IMPORTED_MODULE_2__["default"](gx, gy, gz));
            }
        }
    }
    return output;
};


/***/ }),

/***/ "./src/example/index.ts":
/*!******************************!*\
  !*** ./src/example/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "createBlockDictionary": () => (/* binding */ createBlockDictionary)
/* harmony export */ });
/* harmony import */ var _engine_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../engine/state */ "./src/engine/state.ts");
/* harmony import */ var _engine_ec__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../engine/ec */ "./src/engine/ec.ts");
/* harmony import */ var _systems_input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./systems/input */ "./src/example/systems/input.ts");
/* harmony import */ var _systems_world__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./systems/world */ "./src/example/systems/world.ts");
/* harmony import */ var _systems_chunk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./systems/chunk */ "./src/example/systems/chunk.ts");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./player */ "./src/example/player.ts");
/* harmony import */ var _chunk_chunk__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./chunk/chunk */ "./src/example/chunk/chunk.ts");
/* harmony import */ var _chunk_mesh__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./chunk/mesh */ "./src/example/chunk/mesh.ts");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./render */ "./src/example/render.ts");










;
const init = (gl) => {
    let state = Object.assign(Object.assign({}, (0,_engine_ec__WEBPACK_IMPORTED_MODULE_1__.createECState)(gl)), { player: (0,_player__WEBPACK_IMPORTED_MODULE_5__.createPlayer)(gl), chunkFactory: (0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_6__.ChunkFactory)(gl), blockDictionary: createBlockDictionary(), atlas: (0,_render__WEBPACK_IMPORTED_MODULE_8__.loadTexture)(gl, "atlas.png"), program: (0,_render__WEBPACK_IMPORTED_MODULE_8__.initShaders)(gl, _chunk_mesh__WEBPACK_IMPORTED_MODULE_7__.chunkVertexShader, _chunk_mesh__WEBPACK_IMPORTED_MODULE_7__.chunkFragmentShader), isStartup: true });
    state.components = (0,_engine_ec__WEBPACK_IMPORTED_MODULE_1__.registerComponent)(state.components, "renderObjects");
    state.components = (0,_engine_ec__WEBPACK_IMPORTED_MODULE_1__.registerComponent)(state.components, "structures");
    state.components = (0,_engine_ec__WEBPACK_IMPORTED_MODULE_1__.registerComponent)(state.components, "chunkPos");
    // systems
    state = (0,_engine_state__WEBPACK_IMPORTED_MODULE_0__.addSystem)(state, "playerChangeChunk", _systems_world__WEBPACK_IMPORTED_MODULE_3__.unloadChunks);
    state = (0,_engine_state__WEBPACK_IMPORTED_MODULE_0__.addSystem)(state, "playerChangeChunk", _systems_world__WEBPACK_IMPORTED_MODULE_3__.loadChunks);
    state = (0,_engine_state__WEBPACK_IMPORTED_MODULE_0__.addSystem)(state, "input", _systems_input__WEBPACK_IMPORTED_MODULE_2__.cameraInput);
    state = (0,_engine_state__WEBPACK_IMPORTED_MODULE_0__.addSystem)(state, "input", _systems_input__WEBPACK_IMPORTED_MODULE_2__.checkChunkChange);
    state = (0,_engine_state__WEBPACK_IMPORTED_MODULE_0__.addSystem)(state, "click", _systems_input__WEBPACK_IMPORTED_MODULE_2__.blockInput);
    state = (0,_engine_state__WEBPACK_IMPORTED_MODULE_0__.addSystem)(state, "render", _systems_input__WEBPACK_IMPORTED_MODULE_2__.renderSelectionBox);
    state = (0,_engine_state__WEBPACK_IMPORTED_MODULE_0__.addSystem)(state, "render", _systems_chunk__WEBPACK_IMPORTED_MODULE_4__.renderChunks);
    return state;
};
const createBlockDictionary = () => ([
    {
        name: 'air',
        type: 'air',
        u: 0,
        v: 0
    },
    {
        name: 'dirt',
        type: 'fullBlock',
        u: 0.125,
        v: 0
    },
    {
        name: 'grass',
        type: 'fullBlock',
        u: 0.0,
        v: 0
    },
    {
        name: 'stone',
        type: 'fullBlock',
        u: 0.0625,
        v: 0
    },
    {
        name: 'wood',
        type: 'fullBlock',
        u: 0.250,
        v: 0
    },
]);


/***/ }),

/***/ "./src/example/player.ts":
/*!*******************************!*\
  !*** ./src/example/player.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPlayer": () => (/* binding */ createPlayer),
/* harmony export */   "drawSelectionBox": () => (/* binding */ drawSelectionBox),
/* harmony export */   "rayCast": () => (/* binding */ rayCast)
/* harmony export */ });
/* harmony import */ var _chunk_chunk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk/chunk */ "./src/example/chunk/chunk.ts");
/* harmony import */ var _math_gl_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @math.gl/core */ "./node_modules/@math.gl/core/dist/esm/classes/vector3.js");
/* harmony import */ var _math_gl_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @math.gl/core */ "./node_modules/@math.gl/core/dist/esm/classes/matrix4.js");
/* harmony import */ var _engine_freeCamera__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../engine/freeCamera */ "./src/engine/freeCamera.ts");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./src/example/render.ts");




;
;
const createPlayer = (gl) => {
    const camera = (0,_engine_freeCamera__WEBPACK_IMPORTED_MODULE_1__.createCamera)(gl);
    camera.position = new _math_gl_core__WEBPACK_IMPORTED_MODULE_3__["default"](0, 10, 0);
    return (Object.assign(Object.assign({ rayStep: 0.1, rayMaxLength: 5 }, camera), { selectionBox: createSelectionBox(gl), previousPosition: new _math_gl_core__WEBPACK_IMPORTED_MODULE_3__["default"](-1, -1, -1) }));
};
;
const createSelectionBox = (gl) => {
    const program = (0,_render__WEBPACK_IMPORTED_MODULE_2__.initShaders)(gl, boxVertexShader, boxFragmentShader);
    const mesh = new Float32Array([
        0.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        0.0, 0.0, 0.0,
        0.0, 0.0, 1.0,
        1.0, 1.0, 1.0,
        0.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        1.0, 0.0, 1.0,
        1.0, 1.0, 1.0,
        1.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 1.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        1.0, 0.0, 1.0,
        0.0, 1.0, 0.0,
        1.0, 1.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        0.0, 1.0, 1.0,
    ]);
    const vao = gl.createVertexArray();
    const vbo = gl.createBuffer();
    if (!vao)
        throw new Error("Failed creating VAO");
    if (!vbo)
        throw new Error("Failed creating VBO");
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, mesh, gl.STATIC_DRAW);
    const vertexSize = 3;
    const stride = 4 * 3;
    const vertexOffset = 0;
    const positionAttributeLocation = gl.getAttribLocation(program, 'v_Position');
    gl.vertexAttribPointer(positionAttributeLocation, vertexSize, gl.FLOAT, false, stride, vertexOffset);
    gl.enableVertexAttribArray(positionAttributeLocation);
    const vertexCount = mesh.length / 3;
    const model = (new _math_gl_core__WEBPACK_IMPORTED_MODULE_4__["default"]()).identity();
    return {
        program,
        vao,
        vertexCount,
        model
    };
};
const drawSelectionBox = (gl, state) => {
    const { program, vao, vertexCount, model: modelMatrix } = state.player.selectionBox;
    const { projection: projectionMatrix, view: viewMatrix } = state.player;
    gl.useProgram(program);
    const projection = gl.getUniformLocation(program, "projection");
    const view = gl.getUniformLocation(program, "view");
    const model = gl.getUniformLocation(program, "model");
    gl.uniformMatrix4fv(projection, false, projectionMatrix);
    gl.uniformMatrix4fv(view, false, viewMatrix);
    gl.uniformMatrix4fv(model, false, modelMatrix);
    gl.bindVertexArray(vao);
    gl.drawArrays(gl.LINES, 0, vertexCount);
    return state;
};
const rayCast = (gl, state, pos, dir, rayStep, rayMaxLength) => {
    let ray = new _math_gl_core__WEBPACK_IMPORTED_MODULE_3__["default"](pos.x, pos.y, pos.z);
    const step = new _math_gl_core__WEBPACK_IMPORTED_MODULE_3__["default"](rayStep * dir.x, rayStep * dir.y, rayStep * dir.z);
    const numSteps = rayMaxLength / rayStep;
    for (let i = 0; i < numSteps; i++) {
        const previous = new _math_gl_core__WEBPACK_IMPORTED_MODULE_3__["default"](ray.x, ray.y, ray.z);
        ray.x += step[0];
        if ((0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(state.chunkFactory, state.components["structures"], ray) != 0)
            return {
                position: ray,
                previous: previous,
            };
        previous.x += step[0];
        ray.y += step[1];
        if ((0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(state.chunkFactory, state.components["structures"], ray) != 0)
            return {
                position: ray,
                previous: previous,
            };
        previous.y += step[1];
        ray.z += step[2];
        if ((0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_0__.getBlock)(state.chunkFactory, state.components["structures"], ray) != 0)
            return {
                position: ray,
                previous: previous,
            };
    }
    return null;
};
const boxVertexShader = `#version 300 es
  in vec3 v_Position;

  uniform mat4 projection;
  uniform mat4 view;
  uniform mat4 model;
  
  void main() {
    
    gl_Position = projection * view * model * vec4(v_Position, 1.0);
  }
`;
const boxFragmentShader = `#version 300 es
  precision highp float;
  
  out vec4 frag_color;

  void main() {
    frag_color = vec4(0.0, 0.0, 0.0, 1.0);
  }
`;


/***/ }),

/***/ "./src/example/render.ts":
/*!*******************************!*\
  !*** ./src/example/render.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initShaders": () => (/* binding */ initShaders),
/* harmony export */   "loadTexture": () => (/* binding */ loadTexture)
/* harmony export */ });
const initShaders = (gl, vshader, fshader) => {
    const program = gl.createProgram();
    if (!program)
        throw new Error("WebGL failed to create program");
    const vertex = compileShader(gl, vshader, gl.VERTEX_SHADER);
    const fragment = compileShader(gl, fshader, gl.FRAGMENT_SHADER);
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success)
        throw new Error("program failed to link:"); // + gl.getProgramInfoLog (program));
    return program;
};
const compileShader = (gl, source, type) => {
    const shader = gl.createShader(type);
    if (!shader)
        throw new Error("WebGL failed to create shader");
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success)
        throw new Error(`Could not compile shader: ${gl.getShaderInfoLog(shader)}`);
    return shader;
};
/*
 * Assumes the texture size is a power of 2. Generates mipmaps
 */
const loadTexture = (gl, url) => {
    const texture = gl.createTexture();
    if (!texture)
        throw new Error("WebGL couldn't create needed textures");
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([255, 0, 255, 255]);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);
    const image = new Image();
    image.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        //gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        //gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.generateMipmap(gl.TEXTURE_2D);
    };
    image.src = url;
    return texture;
};


/***/ }),

/***/ "./src/example/systems/chunk.ts":
/*!**************************************!*\
  !*** ./src/example/systems/chunk.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderChunks": () => (/* binding */ renderChunks)
/* harmony export */ });
// just renders all render objects right now
const renderChunks = (gl, state, delta) => (data) => {
    const castedState = state;
    const renderObjects = castedState.components["renderObjects"];
    if (!renderObjects)
        throw Error("RenderChunks: RenderObjects component not registered!");
    renderObjects.forEach((v, k) => {
        gl.useProgram(v.program);
        const projection = gl.getUniformLocation(v.program, "projection");
        const view = gl.getUniformLocation(v.program, "view");
        const model = gl.getUniformLocation(v.program, "model");
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, castedState.atlas);
        gl.uniformMatrix4fv(projection, false, castedState.player.projection);
        gl.uniformMatrix4fv(view, false, castedState.player.view);
        gl.uniformMatrix4fv(model, false, v.model);
        gl.bindVertexArray(v.vao);
        gl.drawArrays(v.wireframe ? gl.LINES : gl.TRIANGLES, 0, v.vertexCount);
    });
    return state;
};


/***/ }),

/***/ "./src/example/systems/input.ts":
/*!**************************************!*\
  !*** ./src/example/systems/input.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cameraInput": () => (/* binding */ cameraInput),
/* harmony export */   "checkChunkChange": () => (/* binding */ checkChunkChange),
/* harmony export */   "blockInput": () => (/* binding */ blockInput),
/* harmony export */   "renderSelectionBox": () => (/* binding */ renderSelectionBox)
/* harmony export */ });
/* harmony import */ var _math_gl_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @math.gl/core */ "./node_modules/@math.gl/core/dist/esm/classes/vector3.js");
/* harmony import */ var _engine_freeCamera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../engine/freeCamera */ "./src/engine/freeCamera.ts");
/* harmony import */ var _chunk_chunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../chunk/chunk */ "./src/example/chunk/chunk.ts");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../player */ "./src/example/player.ts");
/* harmony import */ var _lib_math__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/math */ "./src/lib/math.ts");





const cameraInput = (gl, state, delta) => (data) => {
    var _a;
    let castedState = state;
    castedState.player = Object.assign(Object.assign({}, (0,_engine_freeCamera__WEBPACK_IMPORTED_MODULE_0__.freeCameraInput)(castedState.player, castedState, delta)), castedState.player);
    castedState.mouseMovement = [0, 0];
    if (castedState.activeInput.has("g"))
        console.log(castedState.player.position);
    if (castedState.activeInput.has("v")) {
        const pos = castedState.player.position;
        const chunkSize = castedState.chunkFactory.chunkSize;
        const chunkPos = new _math_gl_core__WEBPACK_IMPORTED_MODULE_4__["default"](Math.floor(pos.x / chunkSize), Math.floor(pos.y / chunkSize), Math.floor(pos.z / chunkSize));
        const eid = (0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_1__.chunkId)(chunkPos);
        const chunk = (_a = castedState.components["renderObjects"]) === null || _a === void 0 ? void 0 : _a.get(eid);
        if (chunk) {
            chunk.wireframe = !chunk.wireframe;
            castedState.components["renderObjects"].set(eid, chunk);
        }
    }
    return castedState;
};
const checkChunkChange = (gl, state, delta) => (data) => {
    let castedState = state;
    const currentChunkId = (0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_1__.chunkId)((0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_1__.chunkPosFromBlockPos)(castedState.chunkFactory, (0,_lib_math__WEBPACK_IMPORTED_MODULE_3__.floorVector)(castedState.player.position)));
    const previousChunkId = (0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_1__.chunkId)((0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_1__.chunkPosFromBlockPos)(castedState.chunkFactory, (0,_lib_math__WEBPACK_IMPORTED_MODULE_3__.floorVector)(castedState.player.previousPosition)));
    if (!(currentChunkId === previousChunkId))
        castedState.queue.push({
            type: "playerChangeChunk",
            data: null
        });
    castedState.player.previousPosition.x = castedState.player.position.x;
    castedState.player.previousPosition.y = castedState.player.position.y;
    castedState.player.previousPosition.z = castedState.player.position.z;
    return castedState;
};
const blockInput = (gl, state, delta) => (data) => {
    let castedState = state;
    const chunkSize = castedState.chunkFactory.chunkSize;
    const which = data === null || data === void 0 ? void 0 : data.which;
    const { position, direction, rayStep, rayMaxLength } = castedState.player;
    const hit = (0,_player__WEBPACK_IMPORTED_MODULE_2__.rayCast)(gl, castedState, position, direction, rayStep, rayMaxLength);
    if (!hit)
        return castedState;
    const blockPos = (0,_lib_math__WEBPACK_IMPORTED_MODULE_3__.floorVector)(hit.position);
    const chunkPos = (0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_1__.chunkPosFromBlockPos)(castedState.chunkFactory, blockPos);
    const prevPos = (0,_lib_math__WEBPACK_IMPORTED_MODULE_3__.floorVector)(hit.previous);
    const prevChunkPos = (0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_1__.chunkPosFromBlockPos)(castedState.chunkFactory, prevPos);
    // left click - remove block
    if (which == 1) {
        // set the block
        castedState = (0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_1__.setBlock)(castedState, blockPos, 0);
        // update the mesh
        castedState = (0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_1__.updateChunk)(gl, castedState, chunkPos);
        const modulo = new _math_gl_core__WEBPACK_IMPORTED_MODULE_4__["default"](((blockPos.x % chunkSize) + chunkSize) % chunkSize, ((blockPos.y % chunkSize) + chunkSize) % chunkSize, ((blockPos.z % chunkSize) + chunkSize) % chunkSize);
        if (modulo.x % chunkSize == 0)
            castedState = (0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_1__.updateChunk)(gl, castedState, new _math_gl_core__WEBPACK_IMPORTED_MODULE_4__["default"](chunkPos.x - 1, chunkPos.y, chunkPos.z));
        if (modulo.x % chunkSize == chunkSize - 1)
            castedState = (0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_1__.updateChunk)(gl, castedState, new _math_gl_core__WEBPACK_IMPORTED_MODULE_4__["default"](chunkPos.x + 1, chunkPos.y, chunkPos.z));
        if (modulo.y % chunkSize == 0)
            castedState = (0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_1__.updateChunk)(gl, castedState, new _math_gl_core__WEBPACK_IMPORTED_MODULE_4__["default"](chunkPos.x, chunkPos.y - 1, chunkPos.z));
        if (modulo.y % chunkSize == chunkSize - 1)
            castedState = (0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_1__.updateChunk)(gl, castedState, new _math_gl_core__WEBPACK_IMPORTED_MODULE_4__["default"](chunkPos.x, chunkPos.y + 1, chunkPos.z));
        if (modulo.z % chunkSize == 0)
            castedState = (0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_1__.updateChunk)(gl, castedState, new _math_gl_core__WEBPACK_IMPORTED_MODULE_4__["default"](chunkPos.x, chunkPos.y, chunkPos.z - 1));
        if (modulo.z % chunkSize == chunkSize - 1)
            castedState = (0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_1__.updateChunk)(gl, castedState, new _math_gl_core__WEBPACK_IMPORTED_MODULE_4__["default"](chunkPos.x, chunkPos.y, chunkPos.z + 1));
    }
    // right click - add block
    if (which == 3) {
        // set the block
        castedState = (0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_1__.setBlock)(castedState, prevPos, 4);
        // update the mesh
        castedState = (0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_1__.updateChunk)(gl, castedState, prevChunkPos);
    }
    return castedState;
};
const renderSelectionBox = (gl, state, delta) => (data) => {
    let castedState = state;
    const which = data === null || data === void 0 ? void 0 : data.which;
    const { position, direction, rayStep, rayMaxLength } = castedState.player;
    const hit = (0,_player__WEBPACK_IMPORTED_MODULE_2__.rayCast)(gl, castedState, position, direction, rayStep, rayMaxLength);
    if (!hit)
        return castedState;
    const pos = (0,_lib_math__WEBPACK_IMPORTED_MODULE_3__.floorVector)(hit.position);
    castedState.player.selectionBox.model = castedState.player.selectionBox.model.identity().translate([pos.x, pos.y, pos.z]);
    castedState = (0,_player__WEBPACK_IMPORTED_MODULE_2__.drawSelectionBox)(gl, castedState);
    return castedState;
};


/***/ }),

/***/ "./src/example/systems/world.ts":
/*!**************************************!*\
  !*** ./src/example/systems/world.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadChunks": () => (/* binding */ loadChunks),
/* harmony export */   "unloadChunks": () => (/* binding */ unloadChunks)
/* harmony export */ });
/* harmony import */ var _math_gl_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @math.gl/core */ "./node_modules/@math.gl/core/dist/esm/classes/vector3.js");
/* harmony import */ var _chunk_chunk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../chunk/chunk */ "./src/example/chunk/chunk.ts");


const loadChunks = (gl, state, delta) => (data) => {
    let castedState = state;
    const loadDistance = castedState.chunkFactory.loadDistance;
    const chunkSize = castedState.chunkFactory.chunkSize;
    const pos = castedState.player.position;
    const chunkPos = new _math_gl_core__WEBPACK_IMPORTED_MODULE_1__["default"](Math.floor(pos.x / chunkSize), Math.floor(pos.y / chunkSize), Math.floor(pos.z / chunkSize));
    const toLoad = [];
    let offset = [];
    const r = loadDistance;
    for (let i = 0; i < r; i++) {
        for (let j = 0; j < r; j++) {
            for (let k = 0; k < r; k++) {
                if ((i * i + j * j + k * k) < r * r) {
                    const x = i + chunkPos[0], x1 = (i == 0 ? 0 : -i) + chunkPos[0];
                    const y = j + chunkPos[1], y1 = (j == 0 ? 0 : -j) + chunkPos[1];
                    const z = k + chunkPos[2], z1 = (k == 0 ? 0 : -k) + chunkPos[2];
                    offset.push(new _math_gl_core__WEBPACK_IMPORTED_MODULE_1__["default"](x, y, z));
                    offset.push(new _math_gl_core__WEBPACK_IMPORTED_MODULE_1__["default"](x, y, z1));
                    offset.push(new _math_gl_core__WEBPACK_IMPORTED_MODULE_1__["default"](x, y1, z));
                    offset.push(new _math_gl_core__WEBPACK_IMPORTED_MODULE_1__["default"](x, y1, z1));
                    offset.push(new _math_gl_core__WEBPACK_IMPORTED_MODULE_1__["default"](x1, y1, z));
                    offset.push(new _math_gl_core__WEBPACK_IMPORTED_MODULE_1__["default"](x1, y, z1));
                    offset.push(new _math_gl_core__WEBPACK_IMPORTED_MODULE_1__["default"](x1, y, z));
                    offset.push(new _math_gl_core__WEBPACK_IMPORTED_MODULE_1__["default"](x1, y1, z1));
                }
            }
        }
    }
    offset = offset.filter((v, i, a) => a.findIndex(v2 => (v[0] === v2[0] && v[1] === v2[1] && v[2] === v2[2])) === i);
    castedState = (0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_0__.loadManyChunks)(gl, castedState, offset);
    return castedState;
};
const unloadChunks = (gl, state, delta) => (data) => {
    let castedState = state;
    const loadDistance = castedState.chunkFactory.loadDistance;
    const chunkSize = castedState.chunkFactory.chunkSize;
    const playerPos = castedState.player.position;
    const chunkPos = new _math_gl_core__WEBPACK_IMPORTED_MODULE_1__["default"](Math.floor(playerPos.x / chunkSize), Math.floor(playerPos.y / chunkSize), Math.floor(playerPos.z / chunkSize));
    const chunkPosStorage = castedState.components["chunkPos"];
    if (!chunkPosStorage)
        return castedState;
    chunkPosStorage.forEach((v, k) => {
        // let unload = false;
        // find chunkpos outside range and unload
        // if(v[0]**2 + v[1]**2 + v[2]**2 > loadDistance**2)
        //  castedState = unloadChunk(castedState, v);
        if (v.x < chunkPos.x - loadDistance)
            castedState = (0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_0__.unloadChunk)(castedState, v);
        if (v.x > chunkPos.x + loadDistance)
            castedState = (0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_0__.unloadChunk)(castedState, v);
        if (v.y < chunkPos.y - loadDistance)
            castedState = (0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_0__.unloadChunk)(castedState, v);
        if (v.y > chunkPos.y + loadDistance)
            castedState = (0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_0__.unloadChunk)(castedState, v);
        if (v.z < chunkPos.z - loadDistance)
            castedState = (0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_0__.unloadChunk)(castedState, v);
        if (v.z > chunkPos.z + loadDistance)
            castedState = (0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_0__.unloadChunk)(castedState, v);
        // castedState.queue.push({ type: "chunkUnload", data: v })
    });
    return castedState;
};


/***/ }),

/***/ "./src/example/workers/meshWorker.ts":
/*!*******************************************!*\
  !*** ./src/example/workers/meshWorker.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _chunk_mesh__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../chunk/mesh */ "./src/example/chunk/mesh.ts");

// mesh chunk
self.onmessage = (e) => {
    const chunkPos = e.data.pos; // passed in
    const structures = e.data.structures;
    const chunkFactory = e.data.chunkFactory;
    // generate mesh
    const mesh = (0,_chunk_mesh__WEBPACK_IMPORTED_MODULE_0__.naiveMeshing)(chunkFactory, structures, chunkPos);
    self.postMessage(mesh);
    close();
};


/***/ }),

/***/ "./src/lib/math.ts":
/*!*************************!*\
  !*** ./src/lib/math.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "radians": () => (/* binding */ radians),
/* harmony export */   "multiplyAndDestructVector3": () => (/* binding */ multiplyAndDestructVector3),
/* harmony export */   "functionalCrossVector3": () => (/* binding */ functionalCrossVector3),
/* harmony export */   "projectionMatrix": () => (/* binding */ projectionMatrix),
/* harmony export */   "floorVector": () => (/* binding */ floorVector)
/* harmony export */ });
/* harmony import */ var _math_gl_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @math.gl/core */ "./node_modules/@math.gl/core/dist/esm/classes/vector3.js");
/* harmony import */ var _math_gl_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @math.gl/core */ "./node_modules/@math.gl/core/dist/esm/classes/matrix4.js");

const radians = (n) => {
    return (n * Math.PI) / 180.0;
};
const multiplyAndDestructVector3 = (vec, m) => {
    return [vec.x * m, vec.y * m, vec.z * m];
};
const functionalCrossVector3 = (v1, v2) => {
    const v = new _math_gl_core__WEBPACK_IMPORTED_MODULE_0__["default"](v1.x, v1.y, v1.z);
    return v.cross([v2.x, v2.y, v2.z]).normalize();
};
const projectionMatrix = (w, h) => (new _math_gl_core__WEBPACK_IMPORTED_MODULE_1__["default"]().perspective({
    fov: 70,
    fovy: (Math.PI * 70) / 180,
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 100.0
}));
const floorVector = (pos) => (new _math_gl_core__WEBPACK_IMPORTED_MODULE_0__["default"](Math.floor(pos.x), Math.floor(pos.y), Math.floor(pos.z)));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = () => {
/******/ 		// Load entry module and return exports
/******/ 		// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_math_gl_core_dist_esm_classes_matrix4_js-node_modules_math_gl_core_dist_-7907d9"], () => (__webpack_require__("./src/example/workers/meshWorker.ts")))
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".bundle.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/importScripts chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = self.location + "";
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "already loaded"
/******/ 		var installedChunks = {
/******/ 			"src_example_chunk_chunk_ts": 1
/******/ 		};
/******/ 		
/******/ 		// importScripts chunk loading
/******/ 		var installChunk = (data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			while(chunkIds.length)
/******/ 				installedChunks[chunkIds.pop()] = 1;
/******/ 			parentChunkLoadingFunction(data);
/******/ 		};
/******/ 		__webpack_require__.f.i = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					importScripts(__webpack_require__.p + __webpack_require__.u(chunkId));
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkapp"] = self["webpackChunkapp"] || [];
/******/ 		var parentChunkLoadingFunction = chunkLoadingGlobal.push.bind(chunkLoadingGlobal);
/******/ 		chunkLoadingGlobal.push = installChunk;
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	(() => {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			return __webpack_require__.e("vendors-node_modules_math_gl_core_dist_esm_classes_matrix4_js-node_modules_math_gl_core_dist_-7907d9").then(next);
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2V4YW1wbGVfY2h1bmtfY2h1bmtfdHMuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXNDO0FBQy9CLHdGQUF3RixpQkFBaUIsNEJBQTRCO0FBQ3JJO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsMEJBQTBCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUCxrQkFBa0IsbURBQVc7QUFDN0IseUNBQXlDLFlBQVkscUNBQXFDO0FBQzFGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6RGlEO0FBQ3lDO0FBQ25GLHdDQUF3QyxxREFBTztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNNO0FBQ1A7QUFDQTtBQUNBLGtCQUFrQixxREFBTztBQUN6QixzQkFBc0IscURBQU87QUFDN0IsdUJBQXVCLHFEQUFPO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSxrQkFBa0Isa0RBQU87QUFDekIsZ0JBQWdCLGtEQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsY0FBYztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixxREFBTztBQUMxQixpQkFBaUIscUVBQTBCO0FBQzNDLG1CQUFtQixxRUFBMEIsQ0FBQyxpRUFBc0I7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHFFQUEwQjtBQUN0RDtBQUNBLGlDQUFpQyxxRUFBMEI7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JHQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsbUJBQW1CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9Cd0M7QUFDZ0M7QUFDVDtBQUNkO0FBQ2dCO0FBQzFEO0FBQ1A7QUFDQTtBQUNBLHFCQUFxQiw2REFBcUI7QUFDMUMsQ0FBQztBQUNNLGlDQUFpQyxPQUFPLEdBQUcsT0FBTyxHQUFHLE9BQU87QUFDNUQseURBQXlELHFEQUFPO0FBQ2hFO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHFEQUFTO0FBQzVCLHNCQUFzQiw4REFBaUI7QUFDdkMsWUFBWSx3REFBWTtBQUN4QjtBQUNBLFlBQVksd0RBQVk7QUFDeEIsWUFBWSx3REFBWTtBQUN4QjtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsZ0JBQWdCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixxREFBUztBQUNoQywwQkFBMEIsOERBQWlCO0FBQzNDLGdCQUFnQix3REFBWTtBQUM1QixnQkFBZ0Isd0RBQVk7QUFDNUIsMENBQTBDLHNIQUEyQyxLQUFLLE1BQU0sU0FBUSxFQUFFO0FBQzFHO0FBQ0EsNkJBQTZCLHVDQUF1QztBQUNwRTtBQUNBLDJDQUEyQyxjQUFjO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsOERBQXVCO0FBQ3hELG9CQUFvQix3REFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSxZQUFZLHdEQUFZO0FBQ3hCO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFdBQVcsd0RBQVk7QUFDdkI7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EseUJBQXlCLHFEQUFPO0FBQ2hDLHlCQUF5QixxREFBTztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix3REFBWTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSx5QkFBeUIscURBQU87QUFDaEMseUJBQXlCLHFEQUFPO0FBQ2hDO0FBQ0E7QUFDQSwrQkFBK0IsWUFBWSxHQUFHLFlBQVksR0FBRyxZQUFZO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLDBEQUFhO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixtREFBWTtBQUM3Qix5QkFBeUIsOERBQXVCO0FBQ2hEO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZIaUQ7QUFDZDtBQUM1QjtBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixxREFBTztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVSxrQ0FBa0M7O0FBRTVDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ087QUFDUCxlQUFlLHFEQUFPO0FBQ3RCO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLHVCQUF1QixPQUFPLEdBQUcsT0FBTyxHQUFHLE9BQU87QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIscURBQU87QUFDaEMsb0JBQW9CLGVBQWU7QUFDbkMsd0JBQXdCLGVBQWU7QUFDdkMsNEJBQTRCLGVBQWU7QUFDM0M7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGdEQUFRO0FBQzVCO0FBQ0Esb0JBQW9CLGdEQUFRO0FBQzVCO0FBQ0EsZ0NBQWdDLGdEQUFRO0FBQ3hDO0FBQ0Esb0JBQW9CLGdEQUFRO0FBQzVCLGlHQUFpRyxnREFBUTtBQUN6RyxvQkFBb0IsZ0RBQVE7QUFDNUIsb0JBQW9CLGdEQUFRO0FBQzVCLG9CQUFvQixnREFBUTtBQUM1QixvQkFBb0IsZ0RBQVE7QUFDNUIsb0JBQW9CLGdEQUFRO0FBQzVCLG9CQUFvQixnREFBUTtBQUM1QixvQkFBb0IsZ0RBQVE7QUFDNUI7QUFDQSxvQkFBb0IsZ0RBQVE7QUFDNUIsaUdBQWlHLGdEQUFRO0FBQ3pHLG9CQUFvQixnREFBUTtBQUM1QixvQkFBb0IsZ0RBQVE7QUFDNUIsb0JBQW9CLGdEQUFRO0FBQzVCLG9CQUFvQixnREFBUTtBQUM1QixvQkFBb0IsZ0RBQVE7QUFDNUIsb0JBQW9CLGdEQUFRO0FBQzVCLG9CQUFvQixnREFBUTtBQUM1QjtBQUNBLG9CQUFvQixnREFBUTtBQUM1QixnR0FBZ0csZ0RBQVE7QUFDeEcsb0JBQW9CLGdEQUFRO0FBQzVCLG9CQUFvQixnREFBUTtBQUM1QixvQkFBb0IsZ0RBQVE7QUFDNUIsb0JBQW9CLGdEQUFRO0FBQzVCLG9CQUFvQixnREFBUTtBQUM1QixvQkFBb0IsZ0RBQVE7QUFDNUIsb0JBQW9CLGdEQUFRO0FBQzVCO0FBQ0Esb0JBQW9CLGdEQUFRO0FBQzVCLG1HQUFtRyxnREFBUTtBQUMzRyxvQkFBb0IsZ0RBQVE7QUFDNUIsb0JBQW9CLGdEQUFRO0FBQzVCLG9CQUFvQixnREFBUTtBQUM1QixvQkFBb0IsZ0RBQVE7QUFDNUIsb0JBQW9CLGdEQUFRO0FBQzVCLG9CQUFvQixnREFBUTtBQUM1QixvQkFBb0IsZ0RBQVE7QUFDNUI7QUFDQSxvQkFBb0IsZ0RBQVE7QUFDNUIsa0dBQWtHLGdEQUFRO0FBQzFHLG9CQUFvQixnREFBUTtBQUM1QixvQkFBb0IsZ0RBQVE7QUFDNUIsb0JBQW9CLGdEQUFRO0FBQzVCLG9CQUFvQixnREFBUTtBQUM1QixvQkFBb0IsZ0RBQVE7QUFDNUIsb0JBQW9CLGdEQUFRO0FBQzVCLG9CQUFvQixnREFBUTtBQUM1QjtBQUNBLG9CQUFvQixnREFBUTtBQUM1QixrR0FBa0csZ0RBQVE7QUFDMUcsb0JBQW9CLGdEQUFRO0FBQzVCLG9CQUFvQixnREFBUTtBQUM1QixvQkFBb0IsZ0RBQVE7QUFDNUIsb0JBQW9CLGdEQUFRO0FBQzVCLG9CQUFvQixnREFBUTtBQUM1QixvQkFBb0IsZ0RBQVE7QUFDNUIsb0JBQW9CLGdEQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeFF3QztBQUNzQjtBQUNyQjtBQUN6QztBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1Asa0JBQWtCLHFEQUFZO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLHFCQUFxQixxREFBTztBQUM1QjtBQUNBLHlCQUF5QixxREFBTztBQUNoQztBQUNBLG9CQUFvQixlQUFlLE9BQU87QUFDMUMsd0JBQXdCLGVBQWUsT0FBTztBQUM5Qyw0QkFBNEIsZUFBZSxPQUFPO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixrRUFBb0I7QUFDOUMsdURBQXVELHFEQUFPO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5QzRDO0FBQ29CO0FBQ2dDO0FBQ3JDO0FBQ1o7QUFDUDtBQUNLO0FBQ3lCO0FBQy9CO0FBQ0E7QUFDdkM7QUFDTztBQUNQLDhDQUE4QyxFQUFFLHlEQUFhLFNBQVMsUUFBUSxxREFBWSxvQkFBb0IsMERBQVksdURBQXVELG9EQUFXLDRCQUE0QixvREFBVyxLQUFLLDBEQUFpQixFQUFFLDREQUFtQixvQkFBb0I7QUFDbFMsdUJBQXVCLDZEQUFpQjtBQUN4Qyx1QkFBdUIsNkRBQWlCO0FBQ3hDLHVCQUF1Qiw2REFBaUI7QUFDeEM7QUFDQSxZQUFZLHdEQUFTLDZCQUE2Qix3REFBWTtBQUM5RCxZQUFZLHdEQUFTLDZCQUE2QixzREFBVTtBQUM1RCxZQUFZLHdEQUFTLGlCQUFpQix1REFBVztBQUNqRCxZQUFZLHdEQUFTLGlCQUFpQiw0REFBZ0I7QUFDdEQsWUFBWSx3REFBUyxpQkFBaUIsc0RBQVU7QUFDaEQsWUFBWSx3REFBUyxrQkFBa0IsOERBQWtCO0FBQ3pELFlBQVksd0RBQVMsa0JBQWtCLHdEQUFZO0FBQ25EO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pEeUM7QUFDUTtBQUNHO0FBQ2I7QUFDdkM7QUFDQTtBQUNPO0FBQ1AsbUJBQW1CLGdFQUFZO0FBQy9CLDBCQUEwQixxREFBTztBQUNqQywwQ0FBMEMsK0JBQStCLGFBQWEsNERBQTRELHFEQUFPLGNBQWM7QUFDdks7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG9EQUFXO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixxREFBTztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1AsWUFBWSxnREFBZ0Q7QUFDNUQsWUFBWSxpREFBaUQ7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1Asa0JBQWtCLHFEQUFPO0FBQ3pCLHFCQUFxQixxREFBTztBQUM1QjtBQUNBLG9CQUFvQixjQUFjO0FBQ2xDLDZCQUE2QixxREFBTztBQUNwQztBQUNBLFlBQVksc0RBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxzREFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHNEQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQy9ITztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9EO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELDRCQUE0QjtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN6REE7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEJ3QztBQUNrQjtBQUM0QjtBQUNoQztBQUNUO0FBQ3RDO0FBQ1A7QUFDQTtBQUNBLHVEQUF1RCxFQUFFLG1FQUFlO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixxREFBTztBQUNwQyxvQkFBb0IscURBQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSwyQkFBMkIscURBQU8sQ0FBQyxrRUFBb0IsMkJBQTJCLHNEQUFXO0FBQzdGLDRCQUE0QixxREFBTyxDQUFDLGtFQUFvQiwyQkFBMkIsc0RBQVc7QUFDOUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsWUFBWSw2Q0FBNkM7QUFDekQsZ0JBQWdCLGdEQUFPO0FBQ3ZCO0FBQ0E7QUFDQSxxQkFBcUIsc0RBQVc7QUFDaEMscUJBQXFCLGtFQUFvQjtBQUN6QyxvQkFBb0Isc0RBQVc7QUFDL0IseUJBQXlCLGtFQUFvQjtBQUM3QztBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isc0RBQVE7QUFDOUI7QUFDQSxzQkFBc0IseURBQVc7QUFDakMsMkJBQTJCLHFEQUFPO0FBQ2xDO0FBQ0EsMEJBQTBCLHlEQUFXLHNCQUFzQixxREFBTztBQUNsRTtBQUNBLDBCQUEwQix5REFBVyxzQkFBc0IscURBQU87QUFDbEU7QUFDQSwwQkFBMEIseURBQVcsc0JBQXNCLHFEQUFPO0FBQ2xFO0FBQ0EsMEJBQTBCLHlEQUFXLHNCQUFzQixxREFBTztBQUNsRTtBQUNBLDBCQUEwQix5REFBVyxzQkFBc0IscURBQU87QUFDbEU7QUFDQSwwQkFBMEIseURBQVcsc0JBQXNCLHFEQUFPO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHNEQUFRO0FBQzlCO0FBQ0Esc0JBQXNCLHlEQUFXO0FBQ2pDO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLFlBQVksNkNBQTZDO0FBQ3pELGdCQUFnQixnREFBTztBQUN2QjtBQUNBO0FBQ0EsZ0JBQWdCLHNEQUFXO0FBQzNCO0FBQ0Esa0JBQWtCLHlEQUFnQjtBQUNsQztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzRndDO0FBQ3FCO0FBQ3REO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIscURBQU87QUFDaEM7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0Isd0JBQXdCLE9BQU87QUFDL0IsNEJBQTRCLE9BQU87QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MscURBQU87QUFDM0Msb0NBQW9DLHFEQUFPO0FBQzNDLG9DQUFvQyxxREFBTztBQUMzQyxvQ0FBb0MscURBQU87QUFDM0Msb0NBQW9DLHFEQUFPO0FBQzNDLG9DQUFvQyxxREFBTztBQUMzQyxvQ0FBb0MscURBQU87QUFDM0Msb0NBQW9DLHFEQUFPO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsNERBQWM7QUFDaEM7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIscURBQU87QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHlEQUFXO0FBQ3JDO0FBQ0EsMEJBQTBCLHlEQUFXO0FBQ3JDO0FBQ0EsMEJBQTBCLHlEQUFXO0FBQ3JDO0FBQ0EsMEJBQTBCLHlEQUFXO0FBQ3JDO0FBQ0EsMEJBQTBCLHlEQUFXO0FBQ3JDO0FBQ0EsMEJBQTBCLHlEQUFXO0FBQ3JDLG9DQUFvQyw4QkFBOEI7QUFDbEUsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMvRDZDO0FBQzdDO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLHlEQUFZO0FBQzdCO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVmlEO0FBQzFDO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1Asa0JBQWtCLHFEQUFPO0FBQ3pCO0FBQ0E7QUFDTyx3Q0FBd0MscURBQU87QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDTSxrQ0FBa0MscURBQU87Ozs7Ozs7VUNsQmhEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOzs7OztXQ2xDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRUFBRTtXQUNGOzs7OztXQ1JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDSkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2ZBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxhQUFhO1dBQ2I7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOztXQUVBOztXQUVBOzs7OztXQ3BDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7VUVIQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXBwLy4vc3JjL2VuZ2luZS9lYy50cyIsIndlYnBhY2s6Ly9hcHAvLi9zcmMvZW5naW5lL2ZyZWVDYW1lcmEudHMiLCJ3ZWJwYWNrOi8vYXBwLy4vc3JjL2VuZ2luZS9zdGF0ZS50cyIsIndlYnBhY2s6Ly9hcHAvLi9zcmMvZXhhbXBsZS9jaHVuay9jaHVuay50cyIsIndlYnBhY2s6Ly9hcHAvLi9zcmMvZXhhbXBsZS9jaHVuay9tZXNoLnRzIiwid2VicGFjazovL2FwcC8uL3NyYy9leGFtcGxlL2dlbmVyYXRpb24udHMiLCJ3ZWJwYWNrOi8vYXBwLy4vc3JjL2V4YW1wbGUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYXBwLy4vc3JjL2V4YW1wbGUvcGxheWVyLnRzIiwid2VicGFjazovL2FwcC8uL3NyYy9leGFtcGxlL3JlbmRlci50cyIsIndlYnBhY2s6Ly9hcHAvLi9zcmMvZXhhbXBsZS9zeXN0ZW1zL2NodW5rLnRzIiwid2VicGFjazovL2FwcC8uL3NyYy9leGFtcGxlL3N5c3RlbXMvaW5wdXQudHMiLCJ3ZWJwYWNrOi8vYXBwLy4vc3JjL2V4YW1wbGUvc3lzdGVtcy93b3JsZC50cyIsIndlYnBhY2s6Ly9hcHAvLi9zcmMvZXhhbXBsZS93b3JrZXJzL21lc2hXb3JrZXIudHMiLCJ3ZWJwYWNrOi8vYXBwLy4vc3JjL2xpYi9tYXRoLnRzIiwid2VicGFjazovL2FwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9hcHAvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2FwcC93ZWJwYWNrL3J1bnRpbWUvZW5zdXJlIGNodW5rIiwid2VicGFjazovL2FwcC93ZWJwYWNrL3J1bnRpbWUvZ2V0IGphdmFzY3JpcHQgY2h1bmsgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vYXBwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYXBwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2FwcC93ZWJwYWNrL3J1bnRpbWUvaW1wb3J0U2NyaXB0cyBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2FwcC93ZWJwYWNrL3J1bnRpbWUvc3RhcnR1cCBjaHVuayBkZXBlbmRlbmNpZXMiLCJ3ZWJwYWNrOi8vYXBwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYXBwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9hcHAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVN0YXRlIH0gZnJvbSAnLi9zdGF0ZSc7XG5leHBvcnQgY29uc3QgcmVnaXN0ZXJDb21wb25lbnQgPSAoY29tcG9uZW50cywgY29tcG9uZW50TmFtZSkgPT4gKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgY29tcG9uZW50cyksIHsgW2NvbXBvbmVudE5hbWVdOiBuZXcgTWFwKCkgfSkpO1xuZXhwb3J0IGNvbnN0IG5ld0VudGl0eSA9IChlbnRpdGllcywgZW50aXR5SWQpID0+IHtcbiAgICBlbnRpdGllcy5zZXQoZW50aXR5SWQsIFtdKTtcbiAgICByZXR1cm4gZW50aXRpZXM7XG59O1xuZXhwb3J0IGNvbnN0IGFkZENvbXBvbmVudCA9IChzdGF0ZSwgZW50aXR5SWQsIHN0b3JhZ2UsIGNvbXBvbmVudCkgPT4ge1xuICAgIGNvbnN0IGVudGl0aWVzID0gc3RhdGUuZW50aXRpZXM7XG4gICAgY29uc3QgY29tcG9uZW50cyA9IHN0YXRlLmNvbXBvbmVudHM7XG4gICAgY29uc3QgY29tcG9uZW50U3RvcmFnZSA9IGNvbXBvbmVudHNbc3RvcmFnZV07XG4gICAgY29uc3QgZW50aXR5ID0gZW50aXRpZXMuZ2V0KGVudGl0eUlkKTtcbiAgICBpZiAoIWVudGl0eSlcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJBZGQgQ29tcG9uZW50OiBFbnRpdHkgZG9lcyBub3QgZXhpc3QhXCIpO1xuICAgIGlmICghY29tcG9uZW50U3RvcmFnZSlcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJBZGQgQ29tcG9uZW50OiBObyByZWdpc3RlcmVkIGNvbXBvbmVudCBzdG9yYWdlIVwiKTtcbiAgICBjb21wb25lbnRzW3N0b3JhZ2VdLnNldChlbnRpdHlJZCwgY29tcG9uZW50KTtcbiAgICBlbnRpdGllcy5zZXQoZW50aXR5SWQsIFsuLi5lbnRpdHksIHN0b3JhZ2VdKTtcbiAgICBzdGF0ZS5lbnRpdGllcyA9IGVudGl0aWVzO1xuICAgIHN0YXRlLmNvbXBvbmVudHMgPSBjb21wb25lbnRzO1xuICAgIHJldHVybiBzdGF0ZTtcbn07XG5leHBvcnQgY29uc3QgcmVtb3ZlQ29tcG9uZW50ID0gKHN0YXRlLCBlbnRpdHlJZCwgc3RvcmFnZSkgPT4ge1xuICAgIGNvbnN0IGVudGl0aWVzID0gc3RhdGUuZW50aXRpZXM7XG4gICAgY29uc3QgY29tcG9uZW50cyA9IHN0YXRlLmNvbXBvbmVudHM7XG4gICAgY29uc3QgY29tcG9uZW50U3RvcmFnZSA9IGNvbXBvbmVudHNbc3RvcmFnZV07XG4gICAgY29uc3QgZW50aXR5ID0gZW50aXRpZXMuZ2V0KGVudGl0eUlkKTtcbiAgICBpZiAoIWVudGl0eSlcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIC8vdGhyb3cgRXJyb3IoXCJSZW1vdmUgQ29tcG9uZW50OiBFbnRpdHkgZG9lcyBub3QgZXhpc3QhXCIpO1xuICAgIGlmICghY29tcG9uZW50U3RvcmFnZSlcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIC8vIHRocm93IEVycm9yKFwiUmVtb3ZlIENvbXBvbmVudDogTm8gcmVnaXN0ZXJlZCBjb21wb25lbnQgc3RvcmFnZSFcIik7XG4gICAgY29tcG9uZW50c1tzdG9yYWdlXS5kZWxldGUoZW50aXR5SWQpO1xuICAgIGNvbnN0IGVkZ2VzID0gZW50aXR5LmZpbHRlcih2ID0+IHYgIT09IHN0b3JhZ2UpO1xuICAgIGVudGl0aWVzLnNldChlbnRpdHlJZCwgZWRnZXMpO1xuICAgIHN0YXRlLmVudGl0aWVzID0gZW50aXRpZXM7XG4gICAgc3RhdGUuY29tcG9uZW50cyA9IGNvbXBvbmVudHM7XG4gICAgcmV0dXJuIHN0YXRlO1xufTtcbmV4cG9ydCBjb25zdCByZW1vdmVFbnRpdHkgPSAoc3RhdGUsIGVudGl0eUlkKSA9PiB7XG4gICAgY29uc3QgZW50aXRpZXMgPSBzdGF0ZS5lbnRpdGllcztcbiAgICBjb25zdCBjb21wb25lbnRzID0gc3RhdGUuY29tcG9uZW50cztcbiAgICBjb25zdCBlbnRpdHkgPSBlbnRpdGllcy5nZXQoZW50aXR5SWQpO1xuICAgIGlmICghZW50aXR5KVxuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgY29uc3QgY29tcG9uZW50TGlzdCA9IFsuLi5lbnRpdHldO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29tcG9uZW50TGlzdC5sZW5ndGg7IGkrKylcbiAgICAgICAgc3RhdGUgPSByZW1vdmVDb21wb25lbnQoc3RhdGUsIGVudGl0eUlkLCBjb21wb25lbnRMaXN0W2ldKTtcbiAgICBlbnRpdGllcy5kZWxldGUoZW50aXR5SWQpO1xuICAgIHN0YXRlLmVudGl0aWVzID0gZW50aXRpZXM7XG4gICAgc3RhdGUuY29tcG9uZW50cyA9IGNvbXBvbmVudHM7XG4gICAgcmV0dXJuIHN0YXRlO1xufTtcbjtcbmV4cG9ydCBjb25zdCBjcmVhdGVFQ1N0YXRlID0gKGdsKSA9PiB7XG4gICAgY29uc3Qgc3RhdGUgPSBjcmVhdGVTdGF0ZShnbCk7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpLCB7IGVudGl0aWVzOiBuZXcgTWFwKCksIGNvbXBvbmVudHM6IHt9IH0pO1xufTtcbiIsImltcG9ydCB7IFZlY3RvcjMsIE1hdHJpeDQgfSBmcm9tICdAbWF0aC5nbC9jb3JlJztcbmltcG9ydCB7IHJhZGlhbnMsIG11bHRpcGx5QW5kRGVzdHJ1Y3RWZWN0b3IzLCBmdW5jdGlvbmFsQ3Jvc3NWZWN0b3IzIH0gZnJvbSAnLi4vbGliL21hdGgnO1xuZXhwb3J0IGNvbnN0IHByb2plY3Rpb25NYXRyaXggPSAodywgaCkgPT4gKG5ldyBNYXRyaXg0KCkucGVyc3BlY3RpdmUoe1xuICAgIGZvdjogNzAsXG4gICAgZm92eTogKE1hdGguUEkgKiA3MCkgLyAxODAsXG4gICAgYXNwZWN0OiB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICBuZWFyOiAwLjEsXG4gICAgZmFyOiAxMDAwLjBcbn0pKTtcbmV4cG9ydCBjb25zdCBjcmVhdGVDYW1lcmEgPSAoZ2wpID0+IHtcbiAgICBjb25zdCBjYW1lcmEgPSB7XG4gICAgICAgIHByb2plY3Rpb246IHByb2plY3Rpb25NYXRyaXgod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCksXG4gICAgICAgIHZpZXc6IG5ldyBNYXRyaXg0KCkuaWRlbnRpdHkoKSxcbiAgICAgICAgcG9zaXRpb246IG5ldyBWZWN0b3IzKDAsIDAsIDEpLFxuICAgICAgICBkaXJlY3Rpb246IG5ldyBWZWN0b3IzKDAsIDAsIC0xKSxcbiAgICAgICAgc3BlZWQ6IDEwLFxuICAgICAgICBwaXRjaDogMCxcbiAgICAgICAgeWF3OiAtOTAuMCxcbiAgICAgICAgLy8gYXRsYXM6IGxvYWRUZXh0dXJlKGdsLCBhdGxhc1VybCksXG4gICAgICAgIC8vIGFjdGl2ZUlucHV0OiBuZXcgU2V0PHN0cmluZz4oKVxuICAgIH07XG4gICAgLy8gdXBkYXRlQ2FtZXJhKHBsYXllcik7XG4gICAgd2luZG93Lm9ucmVzaXplID0gb25SZXNpemUoZ2wsIGNhbWVyYSk7XG4gICAgcmV0dXJuIGNhbWVyYTtcbn07XG5jb25zdCBvblJlc2l6ZSA9IChnbCwgY2FtZXJhKSA9PiAoKSA9PiB7XG4gICAgY29uc3QgdyA9IHdpbmRvdy5pbm5lcldpZHRoLCBoID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIGdsLmNhbnZhcy53aWR0aCA9IHc7XG4gICAgZ2wuY2FudmFzLmhlaWdodCA9IGg7XG4gICAgZ2wudmlld3BvcnQoMCwgMCwgdywgaCk7XG4gICAgY2FtZXJhLnByb2plY3Rpb24gPSBwcm9qZWN0aW9uTWF0cml4KHcsIGgpO1xufTtcbmV4cG9ydCBjb25zdCByZWNhbGN1bGF0ZVZpZXcgPSAoY2FtZXJhKSA9PiB7XG4gICAgY29uc3QgcG9zID0gY2FtZXJhLnBvc2l0aW9uO1xuICAgIGNvbnN0IGRpciA9IGNhbWVyYS5kaXJlY3Rpb247XG4gICAgY29uc3QgcGl0Y2ggPSByYWRpYW5zKGNhbWVyYS5waXRjaCk7XG4gICAgY29uc3QgeWF3ID0gcmFkaWFucyhjYW1lcmEueWF3KTtcbiAgICBkaXIueCA9IE1hdGguY29zKHlhdykgKiBNYXRoLmNvcyhwaXRjaCk7XG4gICAgZGlyLnkgPSBNYXRoLnNpbihwaXRjaCk7XG4gICAgZGlyLnogPSBNYXRoLnNpbih5YXcpICogTWF0aC5jb3MocGl0Y2gpO1xuICAgIGNhbWVyYS52aWV3Lmxvb2tBdChbcG9zLngsIHBvcy55LCBwb3Muel0sIFtwb3MueCArIGRpci54LCBwb3MueSArIGRpci55LCBwb3MueiArIGRpci56XSwgWzAsIDEuMCwgMF0pO1xuICAgIHJldHVybiBjYW1lcmE7XG59O1xuLypcbmNvbnN0IHJheVRyYWNlID0gKGVudGl0aWVzOiBFbnRpdHlbXSwgY29tcG9uZW50czogQ29tcG9uZW50cywgcGxheWVyOiBQbGF5ZXIpID0+IChzdGVwVmFsdWU6IG51bWJlciwgbnVtU3RlcHM6IG51bWJlcikgPT4gKG9uSGl0OiAocG9zOiBWZWN0b3IzKSA9PiB2b2lkKSA9PiB7XG5cbiAgY29uc3Qgc3RlcCA9IG11bHRpcGx5QW5kRGVzdHJ1Y3RWZWN0b3IzKHBsYXllci5kaXJlY3Rpb24sIHN0ZXBWYWx1ZSk7XG4gIGNvbnN0IHJheSA9IG5ldyBWZWN0b3IzKHBsYXllci5wb3NpdGlvbi54LCBwbGF5ZXIucG9zaXRpb24ueSwgcGxheWVyLnBvc2l0aW9uLnopO1xuXG4gIGZvcihsZXQgaSA9IDA7IGkgPCBudW1TdGVwczsgaSsrKSB7XG4gICAgXG4gICAgaWYoZ2V0QmxvY2soZW50aXRpZXMsIGNvbXBvbmVudHMpKHJheSkgIT0gMCkge1xuICAgICAgb25IaXQocmF5KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByYXkueCA9IHJheS54ICsgc3RlcFswXTtcbiAgICByYXkueSA9IHJheS55ICsgc3RlcFsxXTtcbiAgICByYXkueiA9IHJheS56ICsgc3RlcFsyXTtcbiAgfVxuXG59O1xuKi9cbmV4cG9ydCBjb25zdCBmcmVlQ2FtZXJhSW5wdXQgPSAoY2FtZXJhLCBzdGF0ZSwgZGVsdGEpID0+IHtcbiAgICBjb25zdCBhY3RpdmVJbnB1dCA9IHN0YXRlLmFjdGl2ZUlucHV0O1xuICAgIGNvbnN0IG1vdXNlTW92ZW1lbnQgPSBzdGF0ZS5tb3VzZU1vdmVtZW50O1xuICAgIGNvbnN0IGxvY2sgPSBzdGF0ZS5sb2NrO1xuICAgIGlmICghbG9jaylcbiAgICAgICAgcmV0dXJuIGNhbWVyYTtcbiAgICBsZXQgc3BlZWQgPSBjYW1lcmEuc3BlZWQ7XG4gICAgY29uc3QgdXAgPSBuZXcgVmVjdG9yMygwLCAxLCAwKTtcbiAgICBjb25zdCBtb3ZlID0gbXVsdGlwbHlBbmREZXN0cnVjdFZlY3RvcjMoY2FtZXJhLmRpcmVjdGlvbiwgc3BlZWQgKiBkZWx0YSk7XG4gICAgY29uc3Qgc3RyYWZlID0gbXVsdGlwbHlBbmREZXN0cnVjdFZlY3RvcjMoZnVuY3Rpb25hbENyb3NzVmVjdG9yMyhjYW1lcmEuZGlyZWN0aW9uLCB1cCksIHNwZWVkICogZGVsdGEpO1xuICAgIGlmIChhY3RpdmVJbnB1dC5oYXMoXCJ3XCIpKVxuICAgICAgICBjYW1lcmEucG9zaXRpb24uYWRkKG1vdmUpO1xuICAgIGlmIChhY3RpdmVJbnB1dC5oYXMoXCJzXCIpKVxuICAgICAgICBjYW1lcmEucG9zaXRpb24uc3VidHJhY3QobW92ZSk7XG4gICAgaWYgKGFjdGl2ZUlucHV0LmhhcyhcImFcIikpXG4gICAgICAgIGNhbWVyYS5wb3NpdGlvbi5zdWJ0cmFjdChzdHJhZmUpO1xuICAgIGlmIChhY3RpdmVJbnB1dC5oYXMoXCJkXCIpKVxuICAgICAgICBjYW1lcmEucG9zaXRpb24uYWRkKHN0cmFmZSk7XG4gICAgaWYgKGFjdGl2ZUlucHV0LmhhcyhcIiBcIikpXG4gICAgICAgIGNhbWVyYS5wb3NpdGlvbi5hZGQobXVsdGlwbHlBbmREZXN0cnVjdFZlY3RvcjModXAsIGRlbHRhICogc3BlZWQpKTtcbiAgICBpZiAoYWN0aXZlSW5wdXQuaGFzKFwic2hpZnRcIikpXG4gICAgICAgIGNhbWVyYS5wb3NpdGlvbi5zdWJ0cmFjdChtdWx0aXBseUFuZERlc3RydWN0VmVjdG9yMyh1cCwgZGVsdGEgKiBzcGVlZCkpO1xuICAgIGNhbWVyYS55YXcgKz0gbW91c2VNb3ZlbWVudFswXTtcbiAgICBjYW1lcmEucGl0Y2ggLT0gbW91c2VNb3ZlbWVudFsxXTtcbiAgICBpZiAoY2FtZXJhLnBpdGNoID4gODkuMClcbiAgICAgICAgY2FtZXJhLnBpdGNoID0gODkuMDtcbiAgICBpZiAoY2FtZXJhLnBpdGNoIDwgLTg5LjApXG4gICAgICAgIGNhbWVyYS5waXRjaCA9IC04OS4wO1xuICAgIHJldHVybiByZWNhbGN1bGF0ZVZpZXcoY2FtZXJhKTtcbiAgICAvKlxuICAgIGRvY3VtZW50Lm9uY2xpY2sgPSAoZSkgPT4ge1xuICBcbiAgICAgIHJheVRyYWNlKGVudGl0aWVzLCBjb21wb25lbnRzLCBwbGF5ZXIpKDAuMDUsIDEwMCkoKHBvczogVmVjdG9yMykgPT4ge1xuICAgICAgICBzZXRCbG9jayhlbnRpdGllcywgY29tcG9uZW50cykocG9zLCAwKTtcbiAgICAgICAgdXBkYXRlQ2h1bmsoZ2wsIGVudGl0aWVzLCBjb21wb25lbnRzKShwb3MpO1xuICAgICAgfSk7XG4gICAgfVxuICAgICovXG59O1xuIiwiO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVN0YXRlID0gKGdsKSA9PiB7XG4gICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgIHN5c3RlbXM6IG5ldyBNYXAoKSxcbiAgICAgICAgYWN0aXZlSW5wdXQ6IG5ldyBTZXQoKSxcbiAgICAgICAgbW91c2VNb3ZlbWVudDogWzAsIDBdLFxuICAgICAgICBxdWV1ZTogW10sXG4gICAgICAgIGxvY2s6IGZhbHNlLFxuICAgIH07XG4gICAgcmV0dXJuIHN0YXRlO1xufTtcbmV4cG9ydCBjb25zdCBhZGRTeXN0ZW0gPSAoc3RhdGUsIHR5cGUsIHN5c3RlbSkgPT4ge1xuICAgIGNvbnN0IHN5c3RlbXMgPSBzdGF0ZS5zeXN0ZW1zO1xuICAgIGNvbnN0IHN5c3RlbUNvbnRhaW5lciA9IHN5c3RlbXMuZ2V0KHR5cGUpO1xuICAgIGlmICghc3lzdGVtQ29udGFpbmVyKSB7XG4gICAgICAgIHN5c3RlbXMuc2V0KHR5cGUsIFtzeXN0ZW1dKTtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgICBzeXN0ZW1Db250YWluZXIgPT09IG51bGwgfHwgc3lzdGVtQ29udGFpbmVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzeXN0ZW1Db250YWluZXIucHVzaChzeXN0ZW0pO1xuICAgIHJldHVybiBzdGF0ZTtcbn07XG5leHBvcnQgY29uc3QgZGlzcGF0Y2ggPSAoZ2wsIHN0YXRlLCB0eXBlLCBkZWx0YSkgPT4gKGRhdGEpID0+IHtcbiAgICBjb25zdCBzeXN0ZW1zID0gc3RhdGUuc3lzdGVtcztcbiAgICBjb25zdCBzeXN0ZW0gPSBzeXN0ZW1zLmdldCh0eXBlKTtcbiAgICBpZiAoIXN5c3RlbSlcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIC8vdGhyb3cgRXJyb3IoXCJEaXNwYXRjaDogU3lzdGVtIG5vdCByZWdpc3RlcmVkXCIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3lzdGVtLmxlbmd0aDsgaSsrKVxuICAgICAgICBzdGF0ZSA9IHN5c3RlbVtpXShnbCwgc3RhdGUsIGRlbHRhKShkYXRhKTtcbiAgICByZXR1cm4gc3RhdGU7XG59O1xuLy8gbmVlZCB0byBjcmVhdGUgYWRkU3lzdGVtIGFuZCBzZXBlcmF0ZSBjb21wb25lbnRzL2VudGl0aWVzIGludG8gYW5vdGhlciBmaWxlXG4iLCJpbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnQG1hdGguZ2wvY29yZSc7XG5pbXBvcnQgeyBuZXdFbnRpdHksIGFkZENvbXBvbmVudCwgcmVtb3ZlRW50aXR5IH0gZnJvbSAnLi4vLi4vZW5naW5lL2VjJztcbmltcG9ydCB7IGNyZWF0ZUNodW5rUmVuZGVyT2JqZWN0LCBuYWl2ZU1lc2hpbmcgfSBmcm9tICcuL21lc2gnO1xuaW1wb3J0IHsgY3JlYXRlQmxvY2tEaWN0aW9uYXJ5IH0gZnJvbSAnLi4vaW5kZXgnO1xuaW1wb3J0IHsgZ2VuZXJhdGVTdHJ1Y3R1cmUsIGdlbmVyYXRlQmxvY2sgfSBmcm9tICcuLi9nZW5lcmF0aW9uJztcbmV4cG9ydCBjb25zdCBDaHVua0ZhY3RvcnkgPSAoZ2wpID0+ICh7XG4gICAgY2h1bmtTaXplOiA4LFxuICAgIGxvYWREaXN0YW5jZTogMyxcbiAgICBibG9ja0RpY3Rpb25hcnk6IGNyZWF0ZUJsb2NrRGljdGlvbmFyeSgpLFxufSk7XG5leHBvcnQgY29uc3QgY2h1bmtJZCA9IChwb3MpID0+IChgY2h1LSR7cG9zWzBdfS0ke3Bvc1sxXX0tJHtwb3NbMl19YCk7XG5leHBvcnQgY29uc3QgY2h1bmtQb3NGcm9tQmxvY2tQb3MgPSAoY2h1bmtGYWN0b3J5LCBwb3MpID0+IChuZXcgVmVjdG9yMyhNYXRoLmZsb29yKHBvc1swXSAvIGNodW5rRmFjdG9yeS5jaHVua1NpemUpLCBNYXRoLmZsb29yKHBvc1sxXSAvIGNodW5rRmFjdG9yeS5jaHVua1NpemUpLCBNYXRoLmZsb29yKHBvc1syXSAvIGNodW5rRmFjdG9yeS5jaHVua1NpemUpKSk7XG5leHBvcnQgY29uc3QgbG9jYWxCbG9ja1Bvc1RvSW5kZXggPSAoY2h1bmtGYWN0b3J5LCB4LCB5LCB6KSA9PiB7XG4gICAgY29uc3QgY2h1bmtTaXplID0gY2h1bmtGYWN0b3J5LmNodW5rU2l6ZTtcbiAgICByZXR1cm4gKHggKyB5ICogY2h1bmtTaXplICsgeiAqIGNodW5rU2l6ZSAqIGNodW5rU2l6ZSk7XG59O1xuLyoqIFN0YXJ0IEVYUE9TRUQgQ0hVTksgRlVOQ1RJT05TICoqL1xuLy8gU1lOQ0hST05PVVNcbmV4cG9ydCBjb25zdCBsb2FkQ2h1bmsgPSAoZ2wsIHN0YXRlLCBwb3MpID0+IHtcbiAgICBjb25zdCBlbnRpdGllcyA9IHN0YXRlLmVudGl0aWVzO1xuICAgIGNvbnN0IGNvbXBvbmVudHMgPSBzdGF0ZS5jb21wb25lbnRzO1xuICAgIGNvbnN0IGNodW5rRmFjdG9yeSA9IHN0YXRlLmNodW5rRmFjdG9yeTtcbiAgICBjb25zdCBlbnRpdHlJZCA9IGNodW5rSWQocG9zKTtcbiAgICBpZiAoc3RhdGUuZW50aXRpZXMuaGFzKGVudGl0eUlkKSlcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIGNvbnN0IGVudGl0eSA9IG5ld0VudGl0eShlbnRpdGllcywgZW50aXR5SWQpO1xuICAgIGNvbnN0IHN0cnVjdHVyZSA9IGdlbmVyYXRlU3RydWN0dXJlKGNodW5rRmFjdG9yeSwgcG9zKTtcbiAgICBzdGF0ZSA9IGFkZENvbXBvbmVudChzdGF0ZSwgZW50aXR5SWQsIFwic3RydWN0dXJlc1wiLCBzdHJ1Y3R1cmUpO1xuICAgIGNvbnN0IHJlbmRlck9iamVjdCA9IGJ1aWxkQ2h1bmsoZ2wsIHN0YXRlLCBwb3MpO1xuICAgIHN0YXRlID0gYWRkQ29tcG9uZW50KHN0YXRlLCBlbnRpdHlJZCwgXCJyZW5kZXJPYmplY3RzXCIsIHJlbmRlck9iamVjdCk7XG4gICAgc3RhdGUgPSBhZGRDb21wb25lbnQoc3RhdGUsIGVudGl0eUlkLCBcImNodW5rUG9zXCIsIHBvcyk7XG4gICAgcmV0dXJuIHN0YXRlO1xufTtcbi8vIEFTWU5DSFJPTk9VU1xuZXhwb3J0IGNvbnN0IGxvYWRNYW55Q2h1bmtzID0gKGdsLCBzdGF0ZSwgcG9zKSA9PiB7XG4gICAgY29uc3QgZW50aXRpZXMgPSBzdGF0ZS5lbnRpdGllcztcbiAgICBjb25zdCBjb21wb25lbnRzID0gc3RhdGUuY29tcG9uZW50cztcbiAgICBjb25zdCBzdHJ1Y3R1cmVzID0gY29tcG9uZW50c1tcInN0cnVjdHVyZXNcIl07XG4gICAgY29uc3QgY2h1bmtGYWN0b3J5ID0gc3RhdGUuY2h1bmtGYWN0b3J5O1xuICAgIGxldCBhY3RpdmVUaHJlYWRzID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBlbnRpdHlJZCA9IGNodW5rSWQocG9zW2ldKTtcbiAgICAgICAgaWYgKHN0YXRlLmVudGl0aWVzLmhhcyhlbnRpdHlJZCkpXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgY29uc3QgZW50aXR5ID0gbmV3RW50aXR5KGVudGl0aWVzLCBlbnRpdHlJZCk7XG4gICAgICAgIGNvbnN0IHN0cnVjdHVyZSA9IGdlbmVyYXRlU3RydWN0dXJlKGNodW5rRmFjdG9yeSwgcG9zW2ldKTtcbiAgICAgICAgc3RhdGUgPSBhZGRDb21wb25lbnQoc3RhdGUsIGVudGl0eUlkLCBcInN0cnVjdHVyZXNcIiwgc3RydWN0dXJlKTtcbiAgICAgICAgc3RhdGUgPSBhZGRDb21wb25lbnQoc3RhdGUsIGVudGl0eUlkLCBcImNodW5rUG9zXCIsIHBvc1tpXSk7XG4gICAgICAgIGNvbnN0IHdvcmtlciA9IG5ldyBXb3JrZXIobmV3IFVSTCgnLi4vd29ya2Vycy9tZXNoV29ya2VyLnRzJywgaW1wb3J0Lm1ldGEudXJsKSwgeyB0eXBlOiBcIm1vZHVsZVwiIH0pO1xuICAgICAgICBhY3RpdmVUaHJlYWRzKys7XG4gICAgICAgIHdvcmtlci5wb3N0TWVzc2FnZSh7IGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgcG9zOiBwb3NbaV0gfSk7XG4gICAgICAgIHdvcmtlci5vbm1lc3NhZ2UgPSAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYEFjdGl2ZSB0aHJlYWRzOiAke2FjdGl2ZVRocmVhZHN9YCk7XG4gICAgICAgICAgICBpZiAoYWN0aXZlVGhyZWFkcyA9PSAxICYmIHN0YXRlLmlzU3RhcnR1cCkge1xuICAgICAgICAgICAgICAgIC8vIGRpc2FibGUgZ2VuZXJhdGluZyB0ZXh0XG4gICAgICAgICAgICAgICAgY29uc3QgcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW50cm9cIik7XG4gICAgICAgICAgICAgICAgaWYgKHMpXG4gICAgICAgICAgICAgICAgICAgIHMuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzdGF0ZS5pc1N0YXJ0dXAgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFjdGl2ZVRocmVhZHMtLTtcbiAgICAgICAgICAgIGNvbnN0IHJlbmRlck9iamVjdCA9IGNyZWF0ZUNodW5rUmVuZGVyT2JqZWN0KGdsLCBzdGF0ZS5wcm9ncmFtLCBzdGF0ZS5jaHVua0ZhY3RvcnksIHBvc1tpXSwgZS5kYXRhKTtcbiAgICAgICAgICAgIHN0YXRlID0gYWRkQ29tcG9uZW50KHN0YXRlLCBlbnRpdHlJZCwgXCJyZW5kZXJPYmplY3RzXCIsIHJlbmRlck9iamVjdCk7XG4gICAgICAgICAgICB3b3JrZXIudGVybWluYXRlKCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBzdGF0ZTtcbn07XG4vLyBGSVhNRTogZG9uJ3QgY3JlYXRlIGEgbmV3IFZBTyBldmVyeSB0aW1lLCBqdXN0IHVwZGF0ZSB0aGUgZXhpc3RpbmdcbmV4cG9ydCBjb25zdCB1cGRhdGVDaHVuayA9IChnbCwgc3RhdGUsIHBvcykgPT4ge1xuICAgIGNvbnN0IGNpZCA9IGNodW5rSWQocG9zKTtcbiAgICBjb25zdCByZW5kZXJPYmplY3QgPSBidWlsZENodW5rKGdsLCBzdGF0ZSwgcG9zKTtcbiAgICBzdGF0ZSA9IGFkZENvbXBvbmVudChzdGF0ZSwgY2lkLCBcInJlbmRlck9iamVjdHNcIiwgcmVuZGVyT2JqZWN0KTtcbiAgICByZXR1cm4gc3RhdGU7XG59O1xuZXhwb3J0IGNvbnN0IHVubG9hZENodW5rID0gKHN0YXRlLCBwb3MpID0+IHtcbiAgICBjb25zdCBlbnRpdHlJZCA9IGNodW5rSWQocG9zKTtcbiAgICBpZiAoIXN0YXRlLmVudGl0aWVzLmhhcyhlbnRpdHlJZCkpXG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICByZXR1cm4gcmVtb3ZlRW50aXR5KHN0YXRlLCBlbnRpdHlJZCk7XG59O1xuLyoqIEVuZCBFWFBPU0VEIENIVU5LIEZVTkNUSU9OUyAqL1xuLy8gRklYTUU6IGRvZXNuJ3Qgc2V0IHRoZSBibG9jayBpZiBpdCdzIG5vdCBsb2FkZWRcbmV4cG9ydCBjb25zdCBzZXRCbG9jayA9IChzdGF0ZSwgcG9zLCBibG9ja0lkKSA9PiB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IGNodW5rU2l6ZSA9IHN0YXRlLmNodW5rRmFjdG9yeS5jaHVua1NpemU7XG4gICAgY29uc3QgYmxvY2tQb3MgPSBuZXcgVmVjdG9yMyhNYXRoLmZsb29yKHBvc1swXSksIE1hdGguZmxvb3IocG9zWzFdKSwgTWF0aC5mbG9vcihwb3NbMl0pKTtcbiAgICBjb25zdCBsb2NhbFBvcyA9IG5ldyBWZWN0b3IzKCgoYmxvY2tQb3NbMF0gJSBjaHVua1NpemUpICsgY2h1bmtTaXplKSAlIGNodW5rU2l6ZSwgKChibG9ja1Bvc1sxXSAlIGNodW5rU2l6ZSkgKyBjaHVua1NpemUpICUgY2h1bmtTaXplLCAoKGJsb2NrUG9zWzJdICUgY2h1bmtTaXplKSArIGNodW5rU2l6ZSkgJSBjaHVua1NpemUpO1xuICAgIGNvbnN0IGNodW5rUG9zID0gY2h1bmtQb3NGcm9tQmxvY2tQb3Moc3RhdGUuY2h1bmtGYWN0b3J5LCBibG9ja1Bvcyk7XG4gICAgY29uc3QgY2h1bmtFbnRpdHkgPSBjaHVua0lkKGNodW5rUG9zKTtcbiAgICBjb25zdCBzdHJ1Y3R1cmUgPSAoX2EgPSBzdGF0ZS5jb21wb25lbnRzW1wic3RydWN0dXJlc1wiXSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldChjaHVua0VudGl0eSk7XG4gICAgLy8gaWYgc3RydWN0dXJlIGV4aXN0cyBzZXQgYmxvY2sgYW5kIHJlcGxhY2UgaXRcbiAgICBpZiAoc3RydWN0dXJlKSB7XG4gICAgICAgIGNvbnN0IHQgPSBuZXcgRmxvYXQ2NEFycmF5KHN0cnVjdHVyZSk7XG4gICAgICAgIHRbbG9jYWxCbG9ja1Bvc1RvSW5kZXgoc3RhdGUuY2h1bmtGYWN0b3J5LCBsb2NhbFBvc1swXSwgbG9jYWxQb3NbMV0sIGxvY2FsUG9zWzJdKV0gPSBibG9ja0lkO1xuICAgICAgICBzdGF0ZSA9IGFkZENvbXBvbmVudChzdGF0ZSwgY2h1bmtFbnRpdHksIFwic3RydWN0dXJlc1wiLCBzdHJ1Y3R1cmUpO1xuICAgIH1cbiAgICByZXR1cm4gc3RhdGU7XG59O1xuLy8gRklYTUU6IGRvZXMgbm90IHdvcmsgZm9yIHNvbWUgcmVhc29uXG5leHBvcnQgY29uc3QgZ2V0QmxvY2sgPSAoY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBwb3MpID0+IHtcbiAgICBjb25zdCBjaHVua1NpemUgPSBjaHVua0ZhY3RvcnkuY2h1bmtTaXplO1xuICAgIGNvbnN0IGJsb2NrUG9zID0gbmV3IFZlY3RvcjMoTWF0aC5mbG9vcihwb3NbMF0pLCBNYXRoLmZsb29yKHBvc1sxXSksIE1hdGguZmxvb3IocG9zWzJdKSk7XG4gICAgY29uc3QgbG9jYWxQb3MgPSBuZXcgVmVjdG9yMygoKGJsb2NrUG9zWzBdICUgY2h1bmtTaXplKSArIGNodW5rU2l6ZSkgJSBjaHVua1NpemUsICgoYmxvY2tQb3NbMV0gJSBjaHVua1NpemUpICsgY2h1bmtTaXplKSAlIGNodW5rU2l6ZSwgKChibG9ja1Bvc1syXSAlIGNodW5rU2l6ZSkgKyBjaHVua1NpemUpICUgY2h1bmtTaXplKTtcbiAgICBjb25zdCBjaHVua1BvcyA9IGNodW5rUG9zRnJvbUJsb2NrUG9zKGNodW5rRmFjdG9yeSwgYmxvY2tQb3MpO1xuICAgIC8vY29uc3QgY2h1bmtFbnRpdHkgPSBjaHVua0lkKGNodW5rUG9zKTtcbiAgICBjb25zdCBjaHVua0VudGl0eSA9IGBjaHUtJHtjaHVua1Bvc1swXX0tJHtjaHVua1Bvc1sxXX0tJHtjaHVua1Bvc1syXX1gO1xuICAgIGNvbnN0IHN0cnVjdHVyZSA9IHN0cnVjdHVyZXMuZ2V0KGNodW5rRW50aXR5KTtcbiAgICBpZiAoc3RydWN0dXJlKSB7XG4gICAgICAgIGNvbnN0IHQgPSBuZXcgRmxvYXQ2NEFycmF5KHN0cnVjdHVyZSk7XG4gICAgICAgIHJldHVybiB0W2xvY2FsQmxvY2tQb3NUb0luZGV4KGNodW5rRmFjdG9yeSwgbG9jYWxQb3NbMF0sIGxvY2FsUG9zWzFdLCBsb2NhbFBvc1syXSldO1xuICAgIH1cbiAgICByZXR1cm4gZ2VuZXJhdGVCbG9jayhjaHVua0ZhY3RvcnksIHBvcyk7XG59O1xuLy8gdXNlZCBmb3IgdXBkYXRpbmcvbWVzaGluZ1xuY29uc3QgYnVpbGRDaHVuayA9IChnbCwgc3RhdGUsIHBvcykgPT4ge1xuICAgIGNvbnN0IG1lc2ggPSBuYWl2ZU1lc2hpbmcoc3RhdGUuY2h1bmtGYWN0b3J5LCBzdGF0ZS5jb21wb25lbnRzW1wic3RydWN0dXJlc1wiXSwgcG9zKTtcbiAgICBjb25zdCByZW5kZXJPYmplY3QgPSBjcmVhdGVDaHVua1JlbmRlck9iamVjdChnbCwgc3RhdGUucHJvZ3JhbSwgc3RhdGUuY2h1bmtGYWN0b3J5LCBwb3MsIG1lc2gpO1xuICAgIHJldHVybiByZW5kZXJPYmplY3Q7XG59O1xuIiwiaW1wb3J0IHsgVmVjdG9yMywgTWF0cml4NCB9IGZyb20gJ0BtYXRoLmdsL2NvcmUnO1xuaW1wb3J0IHsgZ2V0QmxvY2sgfSBmcm9tICcuL2NodW5rJztcbmV4cG9ydCBjb25zdCBjaHVua1ZlcnRleFNoYWRlciA9IGAjdmVyc2lvbiAzMDAgZXNcbiAgaW4gdmVjMyB2X1Bvc2l0aW9uO1xuICBpbiB2ZWMyIHV2X0Nvb3JkcztcbiAgaW4gZmxvYXQgYW9fQ29vcmRzO1xuXG4gIHVuaWZvcm0gbWF0NCBwcm9qZWN0aW9uO1xuICB1bmlmb3JtIG1hdDQgdmlldztcbiAgdW5pZm9ybSBtYXQ0IG1vZGVsO1xuICBcbiAgb3V0IGZsb2F0IGFvO1xuICBvdXQgdmVjMyBmb2dfZGVwdGg7XG4gIG91dCB2ZWMyIHRleHRfY29vcmRzO1xuICBcbiAgdm9pZCBtYWluKCkge1xuICAgIFxuICAgIHRleHRfY29vcmRzID0gdXZfQ29vcmRzO1xuICAgIGFvID0gYW9fQ29vcmRzO1xuICAgIFxuICAgIGZvZ19kZXB0aCA9ICh2aWV3ICogbW9kZWwgKiB2ZWM0KHZfUG9zaXRpb24sIDEuMCkpLnh5ejtcblxuICAgIGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbiAqIHZpZXcgKiBtb2RlbCAqIHZlYzQodl9Qb3NpdGlvbiwgMS4wKTtcbiAgfVxuYDtcbmV4cG9ydCBjb25zdCBjaHVua0ZyYWdtZW50U2hhZGVyID0gYCN2ZXJzaW9uIDMwMCBlc1xuICBwcmVjaXNpb24gaGlnaHAgZmxvYXQ7XG4gIFxuICBpbiB2ZWMyIHRleHRfY29vcmRzO1xuICBpbiBmbG9hdCBhbztcbiAgaW4gdmVjMyBmb2dfZGVwdGg7XG4gIFxuICB1bmlmb3JtIHNhbXBsZXIyRCB0ZXh0dXJlX2F0bGFzO1xuICBcbiAgb3V0IHZlYzQgZnJhZ19jb2xvcjtcblxuICB2b2lkIG1haW4oKSB7XG4gICAgXG4gICAgZmxvYXQgYW9JbnRlbnNpdHkgPSBhbyAvIDIuMDtcbiAgICBmbG9hdCBkYXJrZW5BbW91bnQgPSAxLjAgLyAoYW9JbnRlbnNpdHkgKyAxLjApO1xuICAgIFxuICAgIHZlYzQgYXRsYXMgPSB0ZXh0dXJlKHRleHR1cmVfYXRsYXMsIHRleHRfY29vcmRzKTtcblxuICAgIGZsb2F0IGZvZ19uZWFyID0gMTguMDtcbiAgICBmbG9hdCBmb2dfZmFyID0gMjQuMDtcbiAgICBmbG9hdCBmb2dfYW1vdW50ID0gc21vb3Roc3RlcChmb2dfbmVhciwgZm9nX2ZhciwgbGVuZ3RoKGZvZ19kZXB0aCkpO1xuICAgIHZlYzQgZm9nX2NvbG9yID0gdmVjNCgxLjApO1xuXG4gICAgZnJhZ19jb2xvciA9IG1peCh2ZWM0KGRhcmtlbkFtb3VudCAqIGF0bGFzLnh5eiwgYXRsYXMudyksIGZvZ19jb2xvciwgZm9nX2Ftb3VudCk7XG4gIH1cbmA7XG5leHBvcnQgY29uc3QgY3JlYXRlQ2h1bmtSZW5kZXJPYmplY3QgPSAoZ2wsIHByb2dyYW0sIGNodW5rRmFjdG9yeSwgcG9zLCBtZXNoKSA9PiB7XG4gICAgY29uc3QgY2h1bmtTaXplID0gY2h1bmtGYWN0b3J5LmNodW5rU2l6ZTtcbiAgICBjb25zdCB2YW8gPSBnbC5jcmVhdGVWZXJ0ZXhBcnJheSgpO1xuICAgIGNvbnN0IHZibyA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGlmICghdmFvKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgY3JlYXRpbmcgVkFPXCIpO1xuICAgIGlmICghdmJvKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgY3JlYXRpbmcgVkJPXCIpO1xuICAgIGdsLmJpbmRWZXJ0ZXhBcnJheSh2YW8pO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2Ym8pO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBtZXNoLCBnbC5TVEFUSUNfRFJBVyk7XG4gICAgY29uc3QgdmVydGV4U2l6ZSA9IDM7XG4gICAgY29uc3QgdXZTaXplID0gMjtcbiAgICBjb25zdCBhb1NpemUgPSAxO1xuICAgIGNvbnN0IHN0cmlkZSA9IDQgKiAodmVydGV4U2l6ZSArIHV2U2l6ZSArIGFvU2l6ZSk7XG4gICAgY29uc3QgdmVydGV4T2Zmc2V0ID0gMDtcbiAgICBjb25zdCB1dk9mZnNldCA9IDQgKiAzO1xuICAgIGNvbnN0IGFvT2Zmc2V0ID0gNCAqIDU7XG4gICAgY29uc3QgcG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sICd2X1Bvc2l0aW9uJyk7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihwb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uLCB2ZXJ0ZXhTaXplLCBnbC5GTE9BVCwgZmFsc2UsIHN0cmlkZSwgdmVydGV4T2Zmc2V0KTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShwb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uKTtcbiAgICBjb25zdCB1dkF0dHJpYnV0ZUxvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgJ3V2X0Nvb3JkcycpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodXZBdHRyaWJ1dGVMb2NhdGlvbiwgdXZTaXplLCBnbC5GTE9BVCwgZmFsc2UsIHN0cmlkZSwgdXZPZmZzZXQpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHV2QXR0cmlidXRlTG9jYXRpb24pO1xuICAgIGNvbnN0IGFvQXR0cmlidXRlTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCAnYW9fQ29vcmRzJyk7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihhb0F0dHJpYnV0ZUxvY2F0aW9uLCBhb1NpemUsIGdsLkZMT0FULCBmYWxzZSwgc3RyaWRlLCBhb09mZnNldCk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoYW9BdHRyaWJ1dGVMb2NhdGlvbik7XG4gICAgY29uc3QgY291bnQgPSBtZXNoLmxlbmd0aCAvIDY7XG4gICAgY29uc3QgbW9kZWwgPSBuZXcgTWF0cml4NCgpO1xuICAgIG1vZGVsLmlkZW50aXR5KCkudHJhbnNsYXRlKFtwb3MueCAqIGNodW5rU2l6ZSwgcG9zLnkgKiBjaHVua1NpemUsIHBvcy56ICogY2h1bmtTaXplXSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbG9kOiAwLFxuICAgICAgICB2YW8sXG4gICAgICAgIHByb2dyYW0sXG4gICAgICAgIG1vZGVsLFxuICAgICAgICB2ZXJ0ZXhDb3VudDogY291bnQsXG4gICAgICAgIHdpcmVmcmFtZTogZmFsc2VcbiAgICB9O1xufTtcbi8qXG5leHBvcnQgY29uc3QgdXBkYXRlQ2h1bmtSZW5kZXJPYmplY3QgPSAoZ2w6IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQsIHByb2dyYW06IFdlYkdMUHJvZ3JhbSkgPT4gKHByZXZpb3VzOiBTdGF0aWNSZW5kZXJPYmplY3RDb21wb25lbnQsIG1lc2g6IEZsb2F0MzJBcnJheSkgPT4ge1xuXG4gIGNvbnN0IHsgdmFvLCB2Ym8sIHByb2dyYW0sIG1vZGVsLCBjb3VudCB9ID0gcHJldmlvdXM7XG5cbiAgZ2wuYmluZFZlcnRleEFycmF5KHZhbyk7XG5cbiAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHZibyk7XG4gIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBtZXNoLCBnbC5TVEFUSUNfRFJBVyk7XG5cbiAgcHJldmlvdXMuY291bnQgPSBtZXNoLmxlbmd0aCAvIDU7XG59O1xuKi9cbmV4cG9ydCBjb25zdCBzdW0gPSAoYSwgYikgPT4ge1xuICAgIHJldHVybiBuZXcgVmVjdG9yMyhbYVswXSArIGJbMF0sIGFbMV0gKyBiWzFdLCBhWzJdICsgYlsyXV0pO1xufTtcbmV4cG9ydCBjb25zdCBjYWxjdWxhdGVBTyA9IChzaWRlMSwgY29ybmVyMSwgc2lkZTIsIGNvcm5lcjIsIHNpZGUzLCBjb3JuZXIzLCBzaWRlNCwgY29ybmVyNCkgPT4ge1xuICAgIGxldCB2MSA9IChzaWRlMSAmJiAxKSArIChzaWRlMiAmJiAxKSArIChjb3JuZXIxICYmIDEpO1xuICAgIGxldCB2MiA9IChzaWRlMiAmJiAxKSArIChzaWRlMyAmJiAxKSArIChjb3JuZXIyICYmIDEpO1xuICAgIGxldCB2MyA9IChzaWRlMyAmJiAxKSArIChzaWRlNCAmJiAxKSArIChjb3JuZXIzICYmIDEpO1xuICAgIGxldCB2NCA9IChzaWRlNCAmJiAxKSArIChzaWRlMSAmJiAxKSArIChjb3JuZXI0ICYmIDEpO1xuICAgIHJldHVybiBbdjEsIHYyLCB2MywgdjRdO1xufTtcbi8vIHBhc3MgaW4gYWxsIHRoZSBibG9jayBkYXRhIGFuZCB0aGVuIHJldHVybiB0aGUgdmVydGV4IGFycmF5XG4vLyBJbiB0aGUgZnV0dXJlIG1heSBpbXBsZW1lbnQgYSBncmVlZHkgYWxnb3JpdGhtIHRvIGN1dCBkb3duIG9uXG4vLyB2ZXJ0ZXggY291bnRcbi8vIFRoaXMgc2V0cyB0aGUgdmVydGljZXMvdGV4dHVyZXMvYW1iaWVudCBvY2NsdXNpb25cbmV4cG9ydCBjb25zdCBuYWl2ZU1lc2hpbmcgPSAoY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBwb3MpID0+IHtcbiAgICBjb25zdCBvdXRwdXQgPSBbXTtcbiAgICAvL2NvbnNvbGUubG9nKHN0cnVjdHVyZXMpO1xuICAgIGNvbnN0IGNJZCA9IGBjaHUtJHtwb3NbMF19LSR7cG9zWzFdfS0ke3Bvc1syXX1gO1xuICAgIC8vY29uc29sZS5sb2coY0lkKTtcbiAgICBjb25zdCBjaHVua1NpemUgPSBjaHVua0ZhY3RvcnkuY2h1bmtTaXplO1xuICAgIGNvbnN0IGJsb2NrU3RydWN0dXJlID0gc3RydWN0dXJlcy5nZXQoY0lkKTtcbiAgICBpZiAoIWJsb2NrU3RydWN0dXJlKSB7XG4gICAgICAgIHJldHVybiBuZXcgRmxvYXQzMkFycmF5KCk7XG4gICAgfVxuICAgIGNvbnN0IGRpY3QgPSBjaHVua0ZhY3RvcnkuYmxvY2tEaWN0aW9uYXJ5O1xuICAgIGNvbnN0IHN0YXJ0UG9zID0gbmV3IFZlY3RvcjMocG9zWzBdICogY2h1bmtTaXplLCBwb3NbMV0gKiBjaHVua1NpemUsIHBvc1syXSAqIGNodW5rU2l6ZSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaHVua1NpemU7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNodW5rU2l6ZTsgaisrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IGNodW5rU2l6ZTsgaysrKSB7XG4gICAgICAgICAgICAgICAgLy9pZihpID09IDAgJiYgaiA9PSAwICYmIGsgPT0gMClcbiAgICAgICAgICAgICAgICAvLyAgY29uc29sZS5sb2coXCJEaWQgd2UgZ2V0IGhlcmU/IDFcIilcbiAgICAgICAgICAgICAgICBjb25zdCBibG9ja1BvcyA9IHN1bShzdGFydFBvcywgKFtpLCBqLCBrXSkpO1xuICAgICAgICAgICAgICAgIGlmIChnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIGJsb2NrUG9zKSA9PSAwKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBpZiAoZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBibG9ja1BvcykgPT0gMClcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgY29uc3QgYmxvY2tJZCA9IGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgYmxvY2tQb3MpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2NrID0gZGljdFtibG9ja0lkXTtcbiAgICAgICAgICAgICAgICBpZiAoZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIChbMSwgMCwgMF0pKSkgPT0gMClcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goLi4uZnVsbEJsb2NrTWVzaC5lYXN0RmFjZShpLCBqLCBrLCBibG9jay51LCBibG9jay52LCBjYWxjdWxhdGVBTyhnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzEsIDEsIDBdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFsxLCAxLCAxXSkpLCAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFsxLCAwLCAxXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMSwgLTEsIDFdKSksIC8vIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzEsIC0xLCAwXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMSwgLTEsIC0xXSkpLCAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFsxLCAwLCAtMV0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzEsIDEsIC0xXSkpIC8vIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICApKSk7XG4gICAgICAgICAgICAgICAgaWYgKGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCAoWy0xLCAwLCAwXSkpKSA9PSAwKVxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCguLi5mdWxsQmxvY2tNZXNoLndlc3RGYWNlKGksIGosIGssIGJsb2NrLnUsIGJsb2NrLnYsIGNhbGN1bGF0ZUFPKGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbLTEsIDEsIDBdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFstMSwgMSwgMV0pKSwgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbLTEsIDAsIDFdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFstMSwgLTEsIDFdKSksIC8vIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWy0xLCAtMSwgMF0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWy0xLCAtMSwgLTFdKSksIC8vIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWy0xLCAwLCAtMV0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWy0xLCAxLCAtMV0pKSAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgKSkpO1xuICAgICAgICAgICAgICAgIGlmIChnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgKFswLCAxLCAwXSkpKSA9PSAwKVxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCguLi5mdWxsQmxvY2tNZXNoLnRvcEZhY2UoaSwgaiwgaywgYmxvY2sudSwgYmxvY2sudiwgY2FsY3VsYXRlQU8oZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFsxLCAxLCAwXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMSwgMSwgMV0pKSwgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMCwgMSwgMV0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWy0xLCAxLCAxXSkpLCAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFstMSwgMSwgMF0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWy0xLCAxLCAtMV0pKSwgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMCwgMSwgLTFdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFsxLCAxLCAtMV0pKSAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgKSkpO1xuICAgICAgICAgICAgICAgIGlmIChnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgKFswLCAtMSwgMF0pKSkgPT0gMClcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goLi4uZnVsbEJsb2NrTWVzaC5ib3R0b21GYWNlKGksIGosIGssIGJsb2NrLnUsIGJsb2NrLnYsIGNhbGN1bGF0ZUFPKGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMSwgLTEsIDBdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFsxLCAtMSwgMV0pKSwgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMCwgLTEsIDFdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFstMSwgLTEsIDFdKSksIC8vIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWy0xLCAtMSwgMF0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWy0xLCAtMSwgLTFdKSksIC8vIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzAsIC0xLCAtMV0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzEsIC0xLCAtMV0pKSAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgKSkpO1xuICAgICAgICAgICAgICAgIGlmIChnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgKFswLCAwLCAxXSkpKSA9PSAwKVxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCguLi5mdWxsQmxvY2tNZXNoLm5vcnRoRmFjZShpLCBqLCBrLCBibG9jay51LCBibG9jay52LCBjYWxjdWxhdGVBTyhnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzEsIDAsIDFdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFsxLCAxLCAxXSkpLCAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFswLCAxLCAxXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbLTEsIDEsIDFdKSksIC8vIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWy0xLCAwLCAxXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbLTEsIC0xLCAxXSkpLCAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFswLCAtMSwgMV0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzEsIC0xLCAxXSkpIC8vIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICApKSk7XG4gICAgICAgICAgICAgICAgaWYgKGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCAoWzAsIDAsIC0xXSkpKSA9PSAwKVxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCguLi5mdWxsQmxvY2tNZXNoLnNvdXRoRmFjZShpLCBqLCBrLCBibG9jay51LCBibG9jay52LCBjYWxjdWxhdGVBTyhnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzEsIDAsIC0xXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMSwgMSwgLTFdKSksIC8vIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzAsIDEsIC0xXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbLTEsIDEsIC0xXSkpLCAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFstMSwgMCwgLTFdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFstMSwgLTEsIC0xXSkpLCAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFswLCAtMSwgLTFdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFsxLCAtMSwgLTFdKSkgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgICkpKTtcbiAgICAgICAgICAgICAgICAvLyBza2lwIG92ZXIgc3BlY2lhbCBibG9ja3MgZm9yIG5vd1xuICAgICAgICAgICAgICAgIC8vIGlmKGJsb2NrLnR5cGUgIT0gJ2Z1bGxCbG9jaycgfHwgYmxvY2sudHlwZSA9PSAnbm9uZScpXG4gICAgICAgICAgICAgICAgLy8gIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vY29uc29sZS5sb2coXCJJbiBtZXNoaW5nXCIpO1xuICAgIC8vY29uc29sZS5sb2cob3V0cHV0KTtcbiAgICByZXR1cm4gbmV3IEZsb2F0MzJBcnJheShvdXRwdXQpO1xufTtcbi8vIHRleHR1cmUgb2Zmc2V0cyBzbyB0aGF0IHRoZXJlIGFyZSBubyBib3JkZXJzIGZyb20gaG93IHNhbXBsaW5nIHRoZSB0ZXh0dXJlXG5jb25zdCB0ZXh0dXJlV2lkdGhPZmZzZXQgPSAwLjA2MjU7XG5jb25zdCB0ZXh0dXJlV2lkdGhTdGFydCA9IDAuMDA7XG4vLyBUT0RPOiByZXBsYWNlIHRleHR1cmVXaWR0aE9mZnNldCB3aXRoIHRleGVsIGRpbWVuc2lvbnNcbmV4cG9ydCBjb25zdCBmdWxsQmxvY2tNZXNoID0ge1xuICAgIHNvdXRoRmFjZTogKHgsIHksIHosIHUsIHYsIGFvKSA9PiAoW1xuICAgICAgICAwLjAgKyB4LCAwLjAgKyB5LCAwLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoU3RhcnQsIHYgKyB0ZXh0dXJlV2lkdGhTdGFydCwgYW9bMl0sXG4gICAgICAgIDEuMCArIHgsIDEuMCArIHksIDAuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIHYgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIGFvWzBdLFxuICAgICAgICAxLjAgKyB4LCAwLjAgKyB5LCAwLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCB2ICsgdGV4dHVyZVdpZHRoU3RhcnQsIGFvWzNdLFxuICAgICAgICAwLjAgKyB4LCAwLjAgKyB5LCAwLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoU3RhcnQsIHYgKyB0ZXh0dXJlV2lkdGhTdGFydCwgYW9bMl0sXG4gICAgICAgIDAuMCArIHgsIDEuMCArIHksIDAuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhTdGFydCwgdiArIHRleHR1cmVXaWR0aE9mZnNldCwgYW9bMV0sXG4gICAgICAgIDEuMCArIHgsIDEuMCArIHksIDAuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIHYgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIGFvWzBdXG4gICAgXSksXG4gICAgbm9ydGhGYWNlOiAoeCwgeSwgeiwgdSwgdiwgYW8pID0+IChbXG4gICAgICAgIDAuMCArIHgsIDAuMCArIHksIDEuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhTdGFydCwgdiArIHRleHR1cmVXaWR0aFN0YXJ0LCBhb1syXSxcbiAgICAgICAgMS4wICsgeCwgMC4wICsgeSwgMS4wICsgeiwgdSArIHRleHR1cmVXaWR0aFN0YXJ0LCB2ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCBhb1szXSxcbiAgICAgICAgMS4wICsgeCwgMS4wICsgeSwgMS4wICsgeiwgdSArIHRleHR1cmVXaWR0aE9mZnNldCwgdiArIHRleHR1cmVXaWR0aE9mZnNldCwgYW9bMF0sXG4gICAgICAgIDAuMCArIHgsIDAuMCArIHksIDEuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhTdGFydCwgdiArIHRleHR1cmVXaWR0aFN0YXJ0LCBhb1syXSxcbiAgICAgICAgMS4wICsgeCwgMS4wICsgeSwgMS4wICsgeiwgdSArIHRleHR1cmVXaWR0aE9mZnNldCwgdiArIHRleHR1cmVXaWR0aE9mZnNldCwgYW9bMF0sXG4gICAgICAgIDAuMCArIHgsIDEuMCArIHksIDEuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhTdGFydCwgdiArIHRleHR1cmVXaWR0aE9mZnNldCwgYW9bMV1cbiAgICBdKSxcbiAgICB3ZXN0RmFjZTogKHgsIHksIHosIHUsIHYsIGFvKSA9PiAoW1xuICAgICAgICAwLjAgKyB4LCAwLjAgKyB5LCAwLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoU3RhcnQsIHYgKyB0ZXh0dXJlV2lkdGhTdGFydCwgYW9bMl0sXG4gICAgICAgIDAuMCArIHgsIDAuMCArIHksIDEuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhTdGFydCwgdiArIHRleHR1cmVXaWR0aE9mZnNldCwgYW9bMV0sXG4gICAgICAgIDAuMCArIHgsIDEuMCArIHksIDEuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIHYgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIGFvWzBdLFxuICAgICAgICAwLjAgKyB4LCAwLjAgKyB5LCAwLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoU3RhcnQsIHYgKyB0ZXh0dXJlV2lkdGhTdGFydCwgYW9bMl0sXG4gICAgICAgIDAuMCArIHgsIDEuMCArIHksIDEuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIHYgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIGFvWzBdLFxuICAgICAgICAwLjAgKyB4LCAxLjAgKyB5LCAwLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCB2ICsgdGV4dHVyZVdpZHRoU3RhcnQsIGFvWzNdXG4gICAgXSksXG4gICAgZWFzdEZhY2U6ICh4LCB5LCB6LCB1LCB2LCBhbykgPT4gKFtcbiAgICAgICAgMS4wICsgeCwgMC4wICsgeSwgMC4wICsgeiwgdSArIHRleHR1cmVXaWR0aFN0YXJ0LCB2ICsgdGV4dHVyZVdpZHRoU3RhcnQsIGFvWzJdLFxuICAgICAgICAxLjAgKyB4LCAxLjAgKyB5LCAwLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCB2ICsgdGV4dHVyZVdpZHRoU3RhcnQsIGFvWzNdLFxuICAgICAgICAxLjAgKyB4LCAxLjAgKyB5LCAxLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCB2ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCBhb1swXSxcbiAgICAgICAgMS4wICsgeCwgMC4wICsgeSwgMC4wICsgeiwgdSArIHRleHR1cmVXaWR0aFN0YXJ0LCB2ICsgdGV4dHVyZVdpZHRoU3RhcnQsIGFvWzJdLFxuICAgICAgICAxLjAgKyB4LCAxLjAgKyB5LCAxLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCB2ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCBhb1swXSxcbiAgICAgICAgMS4wICsgeCwgMC4wICsgeSwgMS4wICsgeiwgdSArIHRleHR1cmVXaWR0aFN0YXJ0LCB2ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCBhb1sxXVxuICAgIF0pLFxuICAgIHRvcEZhY2U6ICh4LCB5LCB6LCB1LCB2LCBhbykgPT4gKFtcbiAgICAgICAgMC4wICsgeCwgMS4wICsgeSwgMC4wICsgeiwgdSArIHRleHR1cmVXaWR0aFN0YXJ0LCB2ICsgdGV4dHVyZVdpZHRoU3RhcnQsIGFvWzJdLFxuICAgICAgICAxLjAgKyB4LCAxLjAgKyB5LCAxLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCB2ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCBhb1swXSxcbiAgICAgICAgMS4wICsgeCwgMS4wICsgeSwgMC4wICsgeiwgdSArIHRleHR1cmVXaWR0aE9mZnNldCwgdiArIHRleHR1cmVXaWR0aFN0YXJ0LCBhb1szXSxcbiAgICAgICAgMC4wICsgeCwgMS4wICsgeSwgMC4wICsgeiwgdSArIHRleHR1cmVXaWR0aFN0YXJ0LCB2ICsgdGV4dHVyZVdpZHRoU3RhcnQsIGFvWzJdLFxuICAgICAgICAwLjAgKyB4LCAxLjAgKyB5LCAxLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoU3RhcnQsIHYgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIGFvWzFdLFxuICAgICAgICAxLjAgKyB4LCAxLjAgKyB5LCAxLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCB2ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCBhb1swXSAvLyBhb1szXVxuICAgIF0pLFxuICAgIGJvdHRvbUZhY2U6ICh4LCB5LCB6LCB1LCB2LCBhbykgPT4gKFtcbiAgICAgICAgMC4wICsgeCwgMC4wICsgeSwgMC4wICsgeiwgdSArIHRleHR1cmVXaWR0aFN0YXJ0LCB2ICsgdGV4dHVyZVdpZHRoU3RhcnQsIGFvWzJdLFxuICAgICAgICAxLjAgKyB4LCAwLjAgKyB5LCAwLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCB2ICsgdGV4dHVyZVdpZHRoU3RhcnQsIGFvWzNdLFxuICAgICAgICAxLjAgKyB4LCAwLjAgKyB5LCAxLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCB2ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCBhb1swXSxcbiAgICAgICAgMC4wICsgeCwgMC4wICsgeSwgMC4wICsgeiwgdSArIHRleHR1cmVXaWR0aFN0YXJ0LCB2ICsgdGV4dHVyZVdpZHRoU3RhcnQsIGFvWzJdLFxuICAgICAgICAxLjAgKyB4LCAwLjAgKyB5LCAxLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCB2ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCBhb1swXSxcbiAgICAgICAgMC4wICsgeCwgMC4wICsgeSwgMS4wICsgeiwgdSArIHRleHR1cmVXaWR0aFN0YXJ0LCB2ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCBhb1sxXVxuICAgIF0pLFxufTtcbiIsImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tIFwiQG1hdGguZ2wvY29yZVwiO1xuaW1wb3J0IHsgY2h1bmtJZCwgbG9jYWxCbG9ja1Bvc1RvSW5kZXggfSBmcm9tIFwiLi9jaHVuay9jaHVua1wiO1xuaW1wb3J0IFNpbXBsZXhOb2lzZSBmcm9tIFwic2ltcGxleC1ub2lzZVwiO1xuLy8gY29weSBzb21lIG5vaXNlIGNvZGVcbmV4cG9ydCBjb25zdCBub2lzZSA9ICh4LCB5KSA9PiB7XG4gICAgcmV0dXJuIDAuNTtcbn07XG5leHBvcnQgY29uc3QgZ2VuZXJhdGVCbG9jayA9IChjaHVua0ZhY3RvcnksIHBvcykgPT4ge1xuICAgIGNvbnN0IG4gPSBuZXcgU2ltcGxleE5vaXNlKFwidGVzdFwiKTtcbiAgICBjb25zdCBjaHVua1NpemUgPSBjaHVua0ZhY3RvcnkuY2h1bmtTaXplO1xuICAgIGNvbnN0IGJhc2VIZWlnaHQgPSBjaHVua1NpemUgLyAyO1xuICAgIGNvbnN0IHdhdmVsZW5ndGggPSBjaHVua1NpemUgKiAyO1xuICAgIGNvbnN0IGhlaWdodCA9IGNodW5rU2l6ZSAvIDQ7XG4gICAgLy8gY2hlY2sgZm9yIGFscmVhZHkgbG9hZGVkIGNodW5rc1xuICAgIGNvbnN0IGggPSBiYXNlSGVpZ2h0ICsgaGVpZ2h0ICogbi5ub2lzZTJEKHBvc1swXSAvIHdhdmVsZW5ndGgsIHBvc1syXSAvIHdhdmVsZW5ndGgpO1xuICAgIGNvbnN0IHJhbiA9IG4ubm9pc2UzRChwb3NbMF0gLyB3YXZlbGVuZ3RoLCBwb3NbMV0gLyB3YXZlbGVuZ3RoLCBwb3NbMl0gLyB3YXZlbGVuZ3RoKTtcbiAgICBpZiAocG9zWzFdIDwgaCAmJiByYW4gPCAwLjQpIHtcbiAgICAgICAgaWYgKHBvc1sxXSA9PSBoIC0gMSlcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICBpZiAocG9zWzFdID4gaCAtIDMpXG4gICAgICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgcmV0dXJuIDM7XG4gICAgfVxuICAgIGlmIChwb3NbMV0gPiA0ICogaClcbiAgICAgICAgcmV0dXJuIDM7XG4gICAgcmV0dXJuIDA7XG59O1xuZXhwb3J0IGNvbnN0IGdlbmVyYXRlU3RydWN0dXJlID0gKGNodW5rRmFjdG9yeSwgcG9zKSA9PiB7XG4gICAgY29uc3Qgb3V0cHV0ID0gbmV3IFNoYXJlZEFycmF5QnVmZmVyKDggKiAoTWF0aC5wb3coY2h1bmtGYWN0b3J5LmNodW5rU2l6ZSwgMykpKTtcbiAgICBjb25zdCB0ID0gbmV3IEZsb2F0NjRBcnJheShvdXRwdXQpO1xuICAgIGNvbnN0IGVudGl0eUlkID0gY2h1bmtJZChwb3MpO1xuICAgIGNvbnN0IGNodW5rU2l6ZSA9IGNodW5rRmFjdG9yeS5jaHVua1NpemU7XG4gICAgY29uc3QgYmxvY2tQb3MgPSBuZXcgVmVjdG9yMyhwb3NbMF0gKiBjaHVua1NpemUsIHBvc1sxXSAqIGNodW5rU2l6ZSwgcG9zWzJdICogY2h1bmtTaXplKTtcbiAgICAvLyBzZXQgdGhlIGJsb2Nrc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2h1bmtTaXplOyBpKyspIHsgLy8geFxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNodW5rU2l6ZTsgaisrKSB7IC8vIHlcbiAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgY2h1bmtTaXplOyBrKyspIHsgLy8gelxuICAgICAgICAgICAgICAgIGNvbnN0IGd4ID0gYmxvY2tQb3NbMF0gKyBpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGd5ID0gYmxvY2tQb3NbMV0gKyBqO1xuICAgICAgICAgICAgICAgIGNvbnN0IGd6ID0gYmxvY2tQb3NbMl0gKyBrO1xuICAgICAgICAgICAgICAgIGNvbnN0IGwgPSBsb2NhbEJsb2NrUG9zVG9JbmRleChjaHVua0ZhY3RvcnksIGksIGosIGspO1xuICAgICAgICAgICAgICAgIHRbbF0gPSBnZW5lcmF0ZUJsb2NrKGNodW5rRmFjdG9yeSwgbmV3IFZlY3RvcjMoZ3gsIGd5LCBneikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG59O1xuIiwiaW1wb3J0IHsgYWRkU3lzdGVtIH0gZnJvbSAnLi4vZW5naW5lL3N0YXRlJztcbmltcG9ydCB7IGNyZWF0ZUVDU3RhdGUsIHJlZ2lzdGVyQ29tcG9uZW50IH0gZnJvbSAnLi4vZW5naW5lL2VjJztcbmltcG9ydCB7IGJsb2NrSW5wdXQsIGNhbWVyYUlucHV0LCBjaGVja0NodW5rQ2hhbmdlLCByZW5kZXJTZWxlY3Rpb25Cb3ggfSBmcm9tICcuL3N5c3RlbXMvaW5wdXQnO1xuaW1wb3J0IHsgbG9hZENodW5rcywgdW5sb2FkQ2h1bmtzIH0gZnJvbSAnLi9zeXN0ZW1zL3dvcmxkJztcbmltcG9ydCB7IHJlbmRlckNodW5rcyB9IGZyb20gJy4vc3lzdGVtcy9jaHVuayc7XG5pbXBvcnQgeyBjcmVhdGVQbGF5ZXIgfSBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgeyBDaHVua0ZhY3RvcnkgfSBmcm9tICcuL2NodW5rL2NodW5rJztcbmltcG9ydCB7IGNodW5rVmVydGV4U2hhZGVyLCBjaHVua0ZyYWdtZW50U2hhZGVyIH0gZnJvbSAnLi9jaHVuay9tZXNoJztcbmltcG9ydCB7IGluaXRTaGFkZXJzIH0gZnJvbSAnLi9yZW5kZXInO1xuaW1wb3J0IHsgbG9hZFRleHR1cmUgfSBmcm9tICcuL3JlbmRlcic7XG47XG5leHBvcnQgY29uc3QgaW5pdCA9IChnbCkgPT4ge1xuICAgIGxldCBzdGF0ZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgY3JlYXRlRUNTdGF0ZShnbCkpLCB7IHBsYXllcjogY3JlYXRlUGxheWVyKGdsKSwgY2h1bmtGYWN0b3J5OiBDaHVua0ZhY3RvcnkoZ2wpLCBibG9ja0RpY3Rpb25hcnk6IGNyZWF0ZUJsb2NrRGljdGlvbmFyeSgpLCBhdGxhczogbG9hZFRleHR1cmUoZ2wsIFwiYXRsYXMucG5nXCIpLCBwcm9ncmFtOiBpbml0U2hhZGVycyhnbCwgY2h1bmtWZXJ0ZXhTaGFkZXIsIGNodW5rRnJhZ21lbnRTaGFkZXIpLCBpc1N0YXJ0dXA6IHRydWUgfSk7XG4gICAgc3RhdGUuY29tcG9uZW50cyA9IHJlZ2lzdGVyQ29tcG9uZW50KHN0YXRlLmNvbXBvbmVudHMsIFwicmVuZGVyT2JqZWN0c1wiKTtcbiAgICBzdGF0ZS5jb21wb25lbnRzID0gcmVnaXN0ZXJDb21wb25lbnQoc3RhdGUuY29tcG9uZW50cywgXCJzdHJ1Y3R1cmVzXCIpO1xuICAgIHN0YXRlLmNvbXBvbmVudHMgPSByZWdpc3RlckNvbXBvbmVudChzdGF0ZS5jb21wb25lbnRzLCBcImNodW5rUG9zXCIpO1xuICAgIC8vIHN5c3RlbXNcbiAgICBzdGF0ZSA9IGFkZFN5c3RlbShzdGF0ZSwgXCJwbGF5ZXJDaGFuZ2VDaHVua1wiLCB1bmxvYWRDaHVua3MpO1xuICAgIHN0YXRlID0gYWRkU3lzdGVtKHN0YXRlLCBcInBsYXllckNoYW5nZUNodW5rXCIsIGxvYWRDaHVua3MpO1xuICAgIHN0YXRlID0gYWRkU3lzdGVtKHN0YXRlLCBcImlucHV0XCIsIGNhbWVyYUlucHV0KTtcbiAgICBzdGF0ZSA9IGFkZFN5c3RlbShzdGF0ZSwgXCJpbnB1dFwiLCBjaGVja0NodW5rQ2hhbmdlKTtcbiAgICBzdGF0ZSA9IGFkZFN5c3RlbShzdGF0ZSwgXCJjbGlja1wiLCBibG9ja0lucHV0KTtcbiAgICBzdGF0ZSA9IGFkZFN5c3RlbShzdGF0ZSwgXCJyZW5kZXJcIiwgcmVuZGVyU2VsZWN0aW9uQm94KTtcbiAgICBzdGF0ZSA9IGFkZFN5c3RlbShzdGF0ZSwgXCJyZW5kZXJcIiwgcmVuZGVyQ2h1bmtzKTtcbiAgICByZXR1cm4gc3RhdGU7XG59O1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUJsb2NrRGljdGlvbmFyeSA9ICgpID0+IChbXG4gICAge1xuICAgICAgICBuYW1lOiAnYWlyJyxcbiAgICAgICAgdHlwZTogJ2FpcicsXG4gICAgICAgIHU6IDAsXG4gICAgICAgIHY6IDBcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2RpcnQnLFxuICAgICAgICB0eXBlOiAnZnVsbEJsb2NrJyxcbiAgICAgICAgdTogMC4xMjUsXG4gICAgICAgIHY6IDBcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2dyYXNzJyxcbiAgICAgICAgdHlwZTogJ2Z1bGxCbG9jaycsXG4gICAgICAgIHU6IDAuMCxcbiAgICAgICAgdjogMFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnc3RvbmUnLFxuICAgICAgICB0eXBlOiAnZnVsbEJsb2NrJyxcbiAgICAgICAgdTogMC4wNjI1LFxuICAgICAgICB2OiAwXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd3b29kJyxcbiAgICAgICAgdHlwZTogJ2Z1bGxCbG9jaycsXG4gICAgICAgIHU6IDAuMjUwLFxuICAgICAgICB2OiAwXG4gICAgfSxcbl0pO1xuIiwiaW1wb3J0IHsgZ2V0QmxvY2sgfSBmcm9tIFwiLi9jaHVuay9jaHVua1wiO1xuaW1wb3J0IHsgTWF0cml4NCwgVmVjdG9yMyB9IGZyb20gXCJAbWF0aC5nbC9jb3JlXCI7XG5pbXBvcnQgeyBjcmVhdGVDYW1lcmEgfSBmcm9tICcuLi9lbmdpbmUvZnJlZUNhbWVyYSc7XG5pbXBvcnQgeyBpbml0U2hhZGVycyB9IGZyb20gXCIuL3JlbmRlclwiO1xuO1xuO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVBsYXllciA9IChnbCkgPT4ge1xuICAgIGNvbnN0IGNhbWVyYSA9IGNyZWF0ZUNhbWVyYShnbCk7XG4gICAgY2FtZXJhLnBvc2l0aW9uID0gbmV3IFZlY3RvcjMoMCwgMTAsIDApO1xuICAgIHJldHVybiAoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHsgcmF5U3RlcDogMC4xLCByYXlNYXhMZW5ndGg6IDUgfSwgY2FtZXJhKSwgeyBzZWxlY3Rpb25Cb3g6IGNyZWF0ZVNlbGVjdGlvbkJveChnbCksIHByZXZpb3VzUG9zaXRpb246IG5ldyBWZWN0b3IzKC0xLCAtMSwgLTEpIH0pKTtcbn07XG47XG5jb25zdCBjcmVhdGVTZWxlY3Rpb25Cb3ggPSAoZ2wpID0+IHtcbiAgICBjb25zdCBwcm9ncmFtID0gaW5pdFNoYWRlcnMoZ2wsIGJveFZlcnRleFNoYWRlciwgYm94RnJhZ21lbnRTaGFkZXIpO1xuICAgIGNvbnN0IG1lc2ggPSBuZXcgRmxvYXQzMkFycmF5KFtcbiAgICAgICAgMC4wLCAwLjAsIDAuMCxcbiAgICAgICAgMC4wLCAxLjAsIDAuMCxcbiAgICAgICAgMC4wLCAwLjAsIDAuMCxcbiAgICAgICAgMS4wLCAwLjAsIDAuMCxcbiAgICAgICAgMC4wLCAwLjAsIDAuMCxcbiAgICAgICAgMC4wLCAwLjAsIDEuMCxcbiAgICAgICAgMS4wLCAxLjAsIDEuMCxcbiAgICAgICAgMC4wLCAxLjAsIDEuMCxcbiAgICAgICAgMS4wLCAxLjAsIDEuMCxcbiAgICAgICAgMS4wLCAwLjAsIDEuMCxcbiAgICAgICAgMS4wLCAxLjAsIDEuMCxcbiAgICAgICAgMS4wLCAxLjAsIDAuMCxcbiAgICAgICAgMC4wLCAxLjAsIDAuMCxcbiAgICAgICAgMC4wLCAxLjAsIDEuMCxcbiAgICAgICAgMS4wLCAwLjAsIDAuMCxcbiAgICAgICAgMS4wLCAwLjAsIDEuMCxcbiAgICAgICAgMC4wLCAwLjAsIDEuMCxcbiAgICAgICAgMS4wLCAwLjAsIDEuMCxcbiAgICAgICAgMC4wLCAxLjAsIDAuMCxcbiAgICAgICAgMS4wLCAxLjAsIDAuMCxcbiAgICAgICAgMS4wLCAwLjAsIDAuMCxcbiAgICAgICAgMS4wLCAxLjAsIDAuMCxcbiAgICAgICAgMC4wLCAwLjAsIDEuMCxcbiAgICAgICAgMC4wLCAxLjAsIDEuMCxcbiAgICBdKTtcbiAgICBjb25zdCB2YW8gPSBnbC5jcmVhdGVWZXJ0ZXhBcnJheSgpO1xuICAgIGNvbnN0IHZibyA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGlmICghdmFvKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgY3JlYXRpbmcgVkFPXCIpO1xuICAgIGlmICghdmJvKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgY3JlYXRpbmcgVkJPXCIpO1xuICAgIGdsLmJpbmRWZXJ0ZXhBcnJheSh2YW8pO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2Ym8pO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBtZXNoLCBnbC5TVEFUSUNfRFJBVyk7XG4gICAgY29uc3QgdmVydGV4U2l6ZSA9IDM7XG4gICAgY29uc3Qgc3RyaWRlID0gNCAqIDM7XG4gICAgY29uc3QgdmVydGV4T2Zmc2V0ID0gMDtcbiAgICBjb25zdCBwb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgJ3ZfUG9zaXRpb24nKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24sIHZlcnRleFNpemUsIGdsLkZMT0FULCBmYWxzZSwgc3RyaWRlLCB2ZXJ0ZXhPZmZzZXQpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24pO1xuICAgIGNvbnN0IHZlcnRleENvdW50ID0gbWVzaC5sZW5ndGggLyAzO1xuICAgIGNvbnN0IG1vZGVsID0gKG5ldyBNYXRyaXg0KCkpLmlkZW50aXR5KCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcHJvZ3JhbSxcbiAgICAgICAgdmFvLFxuICAgICAgICB2ZXJ0ZXhDb3VudCxcbiAgICAgICAgbW9kZWxcbiAgICB9O1xufTtcbmV4cG9ydCBjb25zdCBkcmF3U2VsZWN0aW9uQm94ID0gKGdsLCBzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IHsgcHJvZ3JhbSwgdmFvLCB2ZXJ0ZXhDb3VudCwgbW9kZWw6IG1vZGVsTWF0cml4IH0gPSBzdGF0ZS5wbGF5ZXIuc2VsZWN0aW9uQm94O1xuICAgIGNvbnN0IHsgcHJvamVjdGlvbjogcHJvamVjdGlvbk1hdHJpeCwgdmlldzogdmlld01hdHJpeCB9ID0gc3RhdGUucGxheWVyO1xuICAgIGdsLnVzZVByb2dyYW0ocHJvZ3JhbSk7XG4gICAgY29uc3QgcHJvamVjdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBcInByb2plY3Rpb25cIik7XG4gICAgY29uc3QgdmlldyA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBcInZpZXdcIik7XG4gICAgY29uc3QgbW9kZWwgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgXCJtb2RlbFwiKTtcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KHByb2plY3Rpb24sIGZhbHNlLCBwcm9qZWN0aW9uTWF0cml4KTtcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KHZpZXcsIGZhbHNlLCB2aWV3TWF0cml4KTtcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KG1vZGVsLCBmYWxzZSwgbW9kZWxNYXRyaXgpO1xuICAgIGdsLmJpbmRWZXJ0ZXhBcnJheSh2YW8pO1xuICAgIGdsLmRyYXdBcnJheXMoZ2wuTElORVMsIDAsIHZlcnRleENvdW50KTtcbiAgICByZXR1cm4gc3RhdGU7XG59O1xuZXhwb3J0IGNvbnN0IHJheUNhc3QgPSAoZ2wsIHN0YXRlLCBwb3MsIGRpciwgcmF5U3RlcCwgcmF5TWF4TGVuZ3RoKSA9PiB7XG4gICAgbGV0IHJheSA9IG5ldyBWZWN0b3IzKHBvcy54LCBwb3MueSwgcG9zLnopO1xuICAgIGNvbnN0IHN0ZXAgPSBuZXcgVmVjdG9yMyhyYXlTdGVwICogZGlyLngsIHJheVN0ZXAgKiBkaXIueSwgcmF5U3RlcCAqIGRpci56KTtcbiAgICBjb25zdCBudW1TdGVwcyA9IHJheU1heExlbmd0aCAvIHJheVN0ZXA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1TdGVwczsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzID0gbmV3IFZlY3RvcjMocmF5LngsIHJheS55LCByYXkueik7XG4gICAgICAgIHJheS54ICs9IHN0ZXBbMF07XG4gICAgICAgIGlmIChnZXRCbG9jayhzdGF0ZS5jaHVua0ZhY3RvcnksIHN0YXRlLmNvbXBvbmVudHNbXCJzdHJ1Y3R1cmVzXCJdLCByYXkpICE9IDApXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiByYXksXG4gICAgICAgICAgICAgICAgcHJldmlvdXM6IHByZXZpb3VzLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgcHJldmlvdXMueCArPSBzdGVwWzBdO1xuICAgICAgICByYXkueSArPSBzdGVwWzFdO1xuICAgICAgICBpZiAoZ2V0QmxvY2soc3RhdGUuY2h1bmtGYWN0b3J5LCBzdGF0ZS5jb21wb25lbnRzW1wic3RydWN0dXJlc1wiXSwgcmF5KSAhPSAwKVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogcmF5LFxuICAgICAgICAgICAgICAgIHByZXZpb3VzOiBwcmV2aW91cyxcbiAgICAgICAgICAgIH07XG4gICAgICAgIHByZXZpb3VzLnkgKz0gc3RlcFsxXTtcbiAgICAgICAgcmF5LnogKz0gc3RlcFsyXTtcbiAgICAgICAgaWYgKGdldEJsb2NrKHN0YXRlLmNodW5rRmFjdG9yeSwgc3RhdGUuY29tcG9uZW50c1tcInN0cnVjdHVyZXNcIl0sIHJheSkgIT0gMClcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHJheSxcbiAgICAgICAgICAgICAgICBwcmV2aW91czogcHJldmlvdXMsXG4gICAgICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5jb25zdCBib3hWZXJ0ZXhTaGFkZXIgPSBgI3ZlcnNpb24gMzAwIGVzXG4gIGluIHZlYzMgdl9Qb3NpdGlvbjtcblxuICB1bmlmb3JtIG1hdDQgcHJvamVjdGlvbjtcbiAgdW5pZm9ybSBtYXQ0IHZpZXc7XG4gIHVuaWZvcm0gbWF0NCBtb2RlbDtcbiAgXG4gIHZvaWQgbWFpbigpIHtcbiAgICBcbiAgICBnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb24gKiB2aWV3ICogbW9kZWwgKiB2ZWM0KHZfUG9zaXRpb24sIDEuMCk7XG4gIH1cbmA7XG5jb25zdCBib3hGcmFnbWVudFNoYWRlciA9IGAjdmVyc2lvbiAzMDAgZXNcbiAgcHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xuICBcbiAgb3V0IHZlYzQgZnJhZ19jb2xvcjtcblxuICB2b2lkIG1haW4oKSB7XG4gICAgZnJhZ19jb2xvciA9IHZlYzQoMC4wLCAwLjAsIDAuMCwgMS4wKTtcbiAgfVxuYDtcbiIsImV4cG9ydCBjb25zdCBpbml0U2hhZGVycyA9IChnbCwgdnNoYWRlciwgZnNoYWRlcikgPT4ge1xuICAgIGNvbnN0IHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgaWYgKCFwcm9ncmFtKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXZWJHTCBmYWlsZWQgdG8gY3JlYXRlIHByb2dyYW1cIik7XG4gICAgY29uc3QgdmVydGV4ID0gY29tcGlsZVNoYWRlcihnbCwgdnNoYWRlciwgZ2wuVkVSVEVYX1NIQURFUik7XG4gICAgY29uc3QgZnJhZ21lbnQgPSBjb21waWxlU2hhZGVyKGdsLCBmc2hhZGVyLCBnbC5GUkFHTUVOVF9TSEFERVIpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCB2ZXJ0ZXgpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCBmcmFnbWVudCk7XG4gICAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XG4gICAgY29uc3Qgc3VjY2VzcyA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpO1xuICAgIGlmICghc3VjY2VzcylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicHJvZ3JhbSBmYWlsZWQgdG8gbGluazpcIik7IC8vICsgZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cgKHByb2dyYW0pKTtcbiAgICByZXR1cm4gcHJvZ3JhbTtcbn07XG5jb25zdCBjb21waWxlU2hhZGVyID0gKGdsLCBzb3VyY2UsIHR5cGUpID0+IHtcbiAgICBjb25zdCBzaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIodHlwZSk7XG4gICAgaWYgKCFzaGFkZXIpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIldlYkdMIGZhaWxlZCB0byBjcmVhdGUgc2hhZGVyXCIpO1xuICAgIGdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHNvdXJjZSk7XG4gICAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xuICAgIGNvbnN0IHN1Y2Nlc3MgPSBnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUyk7XG4gICAgaWYgKCFzdWNjZXNzKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBjb21waWxlIHNoYWRlcjogJHtnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcil9YCk7XG4gICAgcmV0dXJuIHNoYWRlcjtcbn07XG4vKlxuICogQXNzdW1lcyB0aGUgdGV4dHVyZSBzaXplIGlzIGEgcG93ZXIgb2YgMi4gR2VuZXJhdGVzIG1pcG1hcHNcbiAqL1xuZXhwb3J0IGNvbnN0IGxvYWRUZXh0dXJlID0gKGdsLCB1cmwpID0+IHtcbiAgICBjb25zdCB0ZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xuICAgIGlmICghdGV4dHVyZSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiV2ViR0wgY291bGRuJ3QgY3JlYXRlIG5lZWRlZCB0ZXh0dXJlc1wiKTtcbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlKTtcbiAgICBjb25zdCBsZXZlbCA9IDA7XG4gICAgY29uc3QgaW50ZXJuYWxGb3JtYXQgPSBnbC5SR0JBO1xuICAgIGNvbnN0IHdpZHRoID0gMTtcbiAgICBjb25zdCBoZWlnaHQgPSAxO1xuICAgIGNvbnN0IGJvcmRlciA9IDA7XG4gICAgY29uc3Qgc3JjRm9ybWF0ID0gZ2wuUkdCQTtcbiAgICBjb25zdCBzcmNUeXBlID0gZ2wuVU5TSUdORURfQllURTtcbiAgICBjb25zdCBwaXhlbCA9IG5ldyBVaW50OEFycmF5KFsyNTUsIDAsIDI1NSwgMjU1XSk7XG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCBsZXZlbCwgaW50ZXJuYWxGb3JtYXQsIHdpZHRoLCBoZWlnaHQsIGJvcmRlciwgc3JjRm9ybWF0LCBzcmNUeXBlLCBwaXhlbCk7XG4gICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpO1xuICAgICAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIGxldmVsLCBpbnRlcm5hbEZvcm1hdCwgc3JjRm9ybWF0LCBzcmNUeXBlLCBpbWFnZSk7XG4gICAgICAgIGdsLnRleFBhcmFtZXRlcmYoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICAgICAgZ2wudGV4UGFyYW1ldGVyZihnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgICAgICAvL2dsLnRleFBhcmFtZXRlcmYoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLlJFUEVBVCk7XG4gICAgICAgIC8vZ2wudGV4UGFyYW1ldGVyZihnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuUkVQRUFUKTtcbiAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xuICAgICAgICBnbC5nZW5lcmF0ZU1pcG1hcChnbC5URVhUVVJFXzJEKTtcbiAgICB9O1xuICAgIGltYWdlLnNyYyA9IHVybDtcbiAgICByZXR1cm4gdGV4dHVyZTtcbn07XG4iLCIvLyBqdXN0IHJlbmRlcnMgYWxsIHJlbmRlciBvYmplY3RzIHJpZ2h0IG5vd1xuZXhwb3J0IGNvbnN0IHJlbmRlckNodW5rcyA9IChnbCwgc3RhdGUsIGRlbHRhKSA9PiAoZGF0YSkgPT4ge1xuICAgIGNvbnN0IGNhc3RlZFN0YXRlID0gc3RhdGU7XG4gICAgY29uc3QgcmVuZGVyT2JqZWN0cyA9IGNhc3RlZFN0YXRlLmNvbXBvbmVudHNbXCJyZW5kZXJPYmplY3RzXCJdO1xuICAgIGlmICghcmVuZGVyT2JqZWN0cylcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJSZW5kZXJDaHVua3M6IFJlbmRlck9iamVjdHMgY29tcG9uZW50IG5vdCByZWdpc3RlcmVkIVwiKTtcbiAgICByZW5kZXJPYmplY3RzLmZvckVhY2goKHYsIGspID0+IHtcbiAgICAgICAgZ2wudXNlUHJvZ3JhbSh2LnByb2dyYW0pO1xuICAgICAgICBjb25zdCBwcm9qZWN0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHYucHJvZ3JhbSwgXCJwcm9qZWN0aW9uXCIpO1xuICAgICAgICBjb25zdCB2aWV3ID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHYucHJvZ3JhbSwgXCJ2aWV3XCIpO1xuICAgICAgICBjb25zdCBtb2RlbCA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbih2LnByb2dyYW0sIFwibW9kZWxcIik7XG4gICAgICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApO1xuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBjYXN0ZWRTdGF0ZS5hdGxhcyk7XG4gICAgICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYocHJvamVjdGlvbiwgZmFsc2UsIGNhc3RlZFN0YXRlLnBsYXllci5wcm9qZWN0aW9uKTtcbiAgICAgICAgZ2wudW5pZm9ybU1hdHJpeDRmdih2aWV3LCBmYWxzZSwgY2FzdGVkU3RhdGUucGxheWVyLnZpZXcpO1xuICAgICAgICBnbC51bmlmb3JtTWF0cml4NGZ2KG1vZGVsLCBmYWxzZSwgdi5tb2RlbCk7XG4gICAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheSh2LnZhbyk7XG4gICAgICAgIGdsLmRyYXdBcnJheXModi53aXJlZnJhbWUgPyBnbC5MSU5FUyA6IGdsLlRSSUFOR0xFUywgMCwgdi52ZXJ0ZXhDb3VudCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHN0YXRlO1xufTtcbiIsImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICdAbWF0aC5nbC9jb3JlJztcbmltcG9ydCB7IGZyZWVDYW1lcmFJbnB1dCB9IGZyb20gJy4uLy4uL2VuZ2luZS9mcmVlQ2FtZXJhJztcbmltcG9ydCB7IGNodW5rSWQsIGNodW5rUG9zRnJvbUJsb2NrUG9zLCBzZXRCbG9jaywgdXBkYXRlQ2h1bmsgfSBmcm9tICcuLi9jaHVuay9jaHVuayc7XG5pbXBvcnQgeyBkcmF3U2VsZWN0aW9uQm94LCByYXlDYXN0IH0gZnJvbSAnLi4vcGxheWVyJztcbmltcG9ydCB7IGZsb29yVmVjdG9yIH0gZnJvbSAnLi4vLi4vbGliL21hdGgnO1xuZXhwb3J0IGNvbnN0IGNhbWVyYUlucHV0ID0gKGdsLCBzdGF0ZSwgZGVsdGEpID0+IChkYXRhKSA9PiB7XG4gICAgdmFyIF9hO1xuICAgIGxldCBjYXN0ZWRTdGF0ZSA9IHN0YXRlO1xuICAgIGNhc3RlZFN0YXRlLnBsYXllciA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZnJlZUNhbWVyYUlucHV0KGNhc3RlZFN0YXRlLnBsYXllciwgY2FzdGVkU3RhdGUsIGRlbHRhKSksIGNhc3RlZFN0YXRlLnBsYXllcik7XG4gICAgY2FzdGVkU3RhdGUubW91c2VNb3ZlbWVudCA9IFswLCAwXTtcbiAgICBpZiAoY2FzdGVkU3RhdGUuYWN0aXZlSW5wdXQuaGFzKFwiZ1wiKSlcbiAgICAgICAgY29uc29sZS5sb2coY2FzdGVkU3RhdGUucGxheWVyLnBvc2l0aW9uKTtcbiAgICBpZiAoY2FzdGVkU3RhdGUuYWN0aXZlSW5wdXQuaGFzKFwidlwiKSkge1xuICAgICAgICBjb25zdCBwb3MgPSBjYXN0ZWRTdGF0ZS5wbGF5ZXIucG9zaXRpb247XG4gICAgICAgIGNvbnN0IGNodW5rU2l6ZSA9IGNhc3RlZFN0YXRlLmNodW5rRmFjdG9yeS5jaHVua1NpemU7XG4gICAgICAgIGNvbnN0IGNodW5rUG9zID0gbmV3IFZlY3RvcjMoTWF0aC5mbG9vcihwb3MueCAvIGNodW5rU2l6ZSksIE1hdGguZmxvb3IocG9zLnkgLyBjaHVua1NpemUpLCBNYXRoLmZsb29yKHBvcy56IC8gY2h1bmtTaXplKSk7XG4gICAgICAgIGNvbnN0IGVpZCA9IGNodW5rSWQoY2h1bmtQb3MpO1xuICAgICAgICBjb25zdCBjaHVuayA9IChfYSA9IGNhc3RlZFN0YXRlLmNvbXBvbmVudHNbXCJyZW5kZXJPYmplY3RzXCJdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0KGVpZCk7XG4gICAgICAgIGlmIChjaHVuaykge1xuICAgICAgICAgICAgY2h1bmsud2lyZWZyYW1lID0gIWNodW5rLndpcmVmcmFtZTtcbiAgICAgICAgICAgIGNhc3RlZFN0YXRlLmNvbXBvbmVudHNbXCJyZW5kZXJPYmplY3RzXCJdLnNldChlaWQsIGNodW5rKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2FzdGVkU3RhdGU7XG59O1xuZXhwb3J0IGNvbnN0IGNoZWNrQ2h1bmtDaGFuZ2UgPSAoZ2wsIHN0YXRlLCBkZWx0YSkgPT4gKGRhdGEpID0+IHtcbiAgICBsZXQgY2FzdGVkU3RhdGUgPSBzdGF0ZTtcbiAgICBjb25zdCBjdXJyZW50Q2h1bmtJZCA9IGNodW5rSWQoY2h1bmtQb3NGcm9tQmxvY2tQb3MoY2FzdGVkU3RhdGUuY2h1bmtGYWN0b3J5LCBmbG9vclZlY3RvcihjYXN0ZWRTdGF0ZS5wbGF5ZXIucG9zaXRpb24pKSk7XG4gICAgY29uc3QgcHJldmlvdXNDaHVua0lkID0gY2h1bmtJZChjaHVua1Bvc0Zyb21CbG9ja1BvcyhjYXN0ZWRTdGF0ZS5jaHVua0ZhY3RvcnksIGZsb29yVmVjdG9yKGNhc3RlZFN0YXRlLnBsYXllci5wcmV2aW91c1Bvc2l0aW9uKSkpO1xuICAgIGlmICghKGN1cnJlbnRDaHVua0lkID09PSBwcmV2aW91c0NodW5rSWQpKVxuICAgICAgICBjYXN0ZWRTdGF0ZS5xdWV1ZS5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6IFwicGxheWVyQ2hhbmdlQ2h1bmtcIixcbiAgICAgICAgICAgIGRhdGE6IG51bGxcbiAgICAgICAgfSk7XG4gICAgY2FzdGVkU3RhdGUucGxheWVyLnByZXZpb3VzUG9zaXRpb24ueCA9IGNhc3RlZFN0YXRlLnBsYXllci5wb3NpdGlvbi54O1xuICAgIGNhc3RlZFN0YXRlLnBsYXllci5wcmV2aW91c1Bvc2l0aW9uLnkgPSBjYXN0ZWRTdGF0ZS5wbGF5ZXIucG9zaXRpb24ueTtcbiAgICBjYXN0ZWRTdGF0ZS5wbGF5ZXIucHJldmlvdXNQb3NpdGlvbi56ID0gY2FzdGVkU3RhdGUucGxheWVyLnBvc2l0aW9uLno7XG4gICAgcmV0dXJuIGNhc3RlZFN0YXRlO1xufTtcbmV4cG9ydCBjb25zdCBibG9ja0lucHV0ID0gKGdsLCBzdGF0ZSwgZGVsdGEpID0+IChkYXRhKSA9PiB7XG4gICAgbGV0IGNhc3RlZFN0YXRlID0gc3RhdGU7XG4gICAgY29uc3QgY2h1bmtTaXplID0gY2FzdGVkU3RhdGUuY2h1bmtGYWN0b3J5LmNodW5rU2l6ZTtcbiAgICBjb25zdCB3aGljaCA9IGRhdGEgPT09IG51bGwgfHwgZGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGF0YS53aGljaDtcbiAgICBjb25zdCB7IHBvc2l0aW9uLCBkaXJlY3Rpb24sIHJheVN0ZXAsIHJheU1heExlbmd0aCB9ID0gY2FzdGVkU3RhdGUucGxheWVyO1xuICAgIGNvbnN0IGhpdCA9IHJheUNhc3QoZ2wsIGNhc3RlZFN0YXRlLCBwb3NpdGlvbiwgZGlyZWN0aW9uLCByYXlTdGVwLCByYXlNYXhMZW5ndGgpO1xuICAgIGlmICghaGl0KVxuICAgICAgICByZXR1cm4gY2FzdGVkU3RhdGU7XG4gICAgY29uc3QgYmxvY2tQb3MgPSBmbG9vclZlY3RvcihoaXQucG9zaXRpb24pO1xuICAgIGNvbnN0IGNodW5rUG9zID0gY2h1bmtQb3NGcm9tQmxvY2tQb3MoY2FzdGVkU3RhdGUuY2h1bmtGYWN0b3J5LCBibG9ja1Bvcyk7XG4gICAgY29uc3QgcHJldlBvcyA9IGZsb29yVmVjdG9yKGhpdC5wcmV2aW91cyk7XG4gICAgY29uc3QgcHJldkNodW5rUG9zID0gY2h1bmtQb3NGcm9tQmxvY2tQb3MoY2FzdGVkU3RhdGUuY2h1bmtGYWN0b3J5LCBwcmV2UG9zKTtcbiAgICAvLyBsZWZ0IGNsaWNrIC0gcmVtb3ZlIGJsb2NrXG4gICAgaWYgKHdoaWNoID09IDEpIHtcbiAgICAgICAgLy8gc2V0IHRoZSBibG9ja1xuICAgICAgICBjYXN0ZWRTdGF0ZSA9IHNldEJsb2NrKGNhc3RlZFN0YXRlLCBibG9ja1BvcywgMCk7XG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgbWVzaFxuICAgICAgICBjYXN0ZWRTdGF0ZSA9IHVwZGF0ZUNodW5rKGdsLCBjYXN0ZWRTdGF0ZSwgY2h1bmtQb3MpO1xuICAgICAgICBjb25zdCBtb2R1bG8gPSBuZXcgVmVjdG9yMygoKGJsb2NrUG9zLnggJSBjaHVua1NpemUpICsgY2h1bmtTaXplKSAlIGNodW5rU2l6ZSwgKChibG9ja1Bvcy55ICUgY2h1bmtTaXplKSArIGNodW5rU2l6ZSkgJSBjaHVua1NpemUsICgoYmxvY2tQb3MueiAlIGNodW5rU2l6ZSkgKyBjaHVua1NpemUpICUgY2h1bmtTaXplKTtcbiAgICAgICAgaWYgKG1vZHVsby54ICUgY2h1bmtTaXplID09IDApXG4gICAgICAgICAgICBjYXN0ZWRTdGF0ZSA9IHVwZGF0ZUNodW5rKGdsLCBjYXN0ZWRTdGF0ZSwgbmV3IFZlY3RvcjMoY2h1bmtQb3MueCAtIDEsIGNodW5rUG9zLnksIGNodW5rUG9zLnopKTtcbiAgICAgICAgaWYgKG1vZHVsby54ICUgY2h1bmtTaXplID09IGNodW5rU2l6ZSAtIDEpXG4gICAgICAgICAgICBjYXN0ZWRTdGF0ZSA9IHVwZGF0ZUNodW5rKGdsLCBjYXN0ZWRTdGF0ZSwgbmV3IFZlY3RvcjMoY2h1bmtQb3MueCArIDEsIGNodW5rUG9zLnksIGNodW5rUG9zLnopKTtcbiAgICAgICAgaWYgKG1vZHVsby55ICUgY2h1bmtTaXplID09IDApXG4gICAgICAgICAgICBjYXN0ZWRTdGF0ZSA9IHVwZGF0ZUNodW5rKGdsLCBjYXN0ZWRTdGF0ZSwgbmV3IFZlY3RvcjMoY2h1bmtQb3MueCwgY2h1bmtQb3MueSAtIDEsIGNodW5rUG9zLnopKTtcbiAgICAgICAgaWYgKG1vZHVsby55ICUgY2h1bmtTaXplID09IGNodW5rU2l6ZSAtIDEpXG4gICAgICAgICAgICBjYXN0ZWRTdGF0ZSA9IHVwZGF0ZUNodW5rKGdsLCBjYXN0ZWRTdGF0ZSwgbmV3IFZlY3RvcjMoY2h1bmtQb3MueCwgY2h1bmtQb3MueSArIDEsIGNodW5rUG9zLnopKTtcbiAgICAgICAgaWYgKG1vZHVsby56ICUgY2h1bmtTaXplID09IDApXG4gICAgICAgICAgICBjYXN0ZWRTdGF0ZSA9IHVwZGF0ZUNodW5rKGdsLCBjYXN0ZWRTdGF0ZSwgbmV3IFZlY3RvcjMoY2h1bmtQb3MueCwgY2h1bmtQb3MueSwgY2h1bmtQb3MueiAtIDEpKTtcbiAgICAgICAgaWYgKG1vZHVsby56ICUgY2h1bmtTaXplID09IGNodW5rU2l6ZSAtIDEpXG4gICAgICAgICAgICBjYXN0ZWRTdGF0ZSA9IHVwZGF0ZUNodW5rKGdsLCBjYXN0ZWRTdGF0ZSwgbmV3IFZlY3RvcjMoY2h1bmtQb3MueCwgY2h1bmtQb3MueSwgY2h1bmtQb3MueiArIDEpKTtcbiAgICB9XG4gICAgLy8gcmlnaHQgY2xpY2sgLSBhZGQgYmxvY2tcbiAgICBpZiAod2hpY2ggPT0gMykge1xuICAgICAgICAvLyBzZXQgdGhlIGJsb2NrXG4gICAgICAgIGNhc3RlZFN0YXRlID0gc2V0QmxvY2soY2FzdGVkU3RhdGUsIHByZXZQb3MsIDQpO1xuICAgICAgICAvLyB1cGRhdGUgdGhlIG1lc2hcbiAgICAgICAgY2FzdGVkU3RhdGUgPSB1cGRhdGVDaHVuayhnbCwgY2FzdGVkU3RhdGUsIHByZXZDaHVua1Bvcyk7XG4gICAgfVxuICAgIHJldHVybiBjYXN0ZWRTdGF0ZTtcbn07XG5leHBvcnQgY29uc3QgcmVuZGVyU2VsZWN0aW9uQm94ID0gKGdsLCBzdGF0ZSwgZGVsdGEpID0+IChkYXRhKSA9PiB7XG4gICAgbGV0IGNhc3RlZFN0YXRlID0gc3RhdGU7XG4gICAgY29uc3Qgd2hpY2ggPSBkYXRhID09PSBudWxsIHx8IGRhdGEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRhdGEud2hpY2g7XG4gICAgY29uc3QgeyBwb3NpdGlvbiwgZGlyZWN0aW9uLCByYXlTdGVwLCByYXlNYXhMZW5ndGggfSA9IGNhc3RlZFN0YXRlLnBsYXllcjtcbiAgICBjb25zdCBoaXQgPSByYXlDYXN0KGdsLCBjYXN0ZWRTdGF0ZSwgcG9zaXRpb24sIGRpcmVjdGlvbiwgcmF5U3RlcCwgcmF5TWF4TGVuZ3RoKTtcbiAgICBpZiAoIWhpdClcbiAgICAgICAgcmV0dXJuIGNhc3RlZFN0YXRlO1xuICAgIGNvbnN0IHBvcyA9IGZsb29yVmVjdG9yKGhpdC5wb3NpdGlvbik7XG4gICAgY2FzdGVkU3RhdGUucGxheWVyLnNlbGVjdGlvbkJveC5tb2RlbCA9IGNhc3RlZFN0YXRlLnBsYXllci5zZWxlY3Rpb25Cb3gubW9kZWwuaWRlbnRpdHkoKS50cmFuc2xhdGUoW3Bvcy54LCBwb3MueSwgcG9zLnpdKTtcbiAgICBjYXN0ZWRTdGF0ZSA9IGRyYXdTZWxlY3Rpb25Cb3goZ2wsIGNhc3RlZFN0YXRlKTtcbiAgICByZXR1cm4gY2FzdGVkU3RhdGU7XG59O1xuIiwiaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJ0BtYXRoLmdsL2NvcmUnO1xuaW1wb3J0IHsgbG9hZE1hbnlDaHVua3MsIHVubG9hZENodW5rIH0gZnJvbSAnLi4vY2h1bmsvY2h1bmsnO1xuZXhwb3J0IGNvbnN0IGxvYWRDaHVua3MgPSAoZ2wsIHN0YXRlLCBkZWx0YSkgPT4gKGRhdGEpID0+IHtcbiAgICBsZXQgY2FzdGVkU3RhdGUgPSBzdGF0ZTtcbiAgICBjb25zdCBsb2FkRGlzdGFuY2UgPSBjYXN0ZWRTdGF0ZS5jaHVua0ZhY3RvcnkubG9hZERpc3RhbmNlO1xuICAgIGNvbnN0IGNodW5rU2l6ZSA9IGNhc3RlZFN0YXRlLmNodW5rRmFjdG9yeS5jaHVua1NpemU7XG4gICAgY29uc3QgcG9zID0gY2FzdGVkU3RhdGUucGxheWVyLnBvc2l0aW9uO1xuICAgIGNvbnN0IGNodW5rUG9zID0gbmV3IFZlY3RvcjMoTWF0aC5mbG9vcihwb3MueCAvIGNodW5rU2l6ZSksIE1hdGguZmxvb3IocG9zLnkgLyBjaHVua1NpemUpLCBNYXRoLmZsb29yKHBvcy56IC8gY2h1bmtTaXplKSk7XG4gICAgY29uc3QgdG9Mb2FkID0gW107XG4gICAgbGV0IG9mZnNldCA9IFtdO1xuICAgIGNvbnN0IHIgPSBsb2FkRGlzdGFuY2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByOyBqKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgcjsgaysrKSB7XG4gICAgICAgICAgICAgICAgaWYgKChpICogaSArIGogKiBqICsgayAqIGspIDwgciAqIHIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeCA9IGkgKyBjaHVua1Bvc1swXSwgeDEgPSAoaSA9PSAwID8gMCA6IC1pKSArIGNodW5rUG9zWzBdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB5ID0gaiArIGNodW5rUG9zWzFdLCB5MSA9IChqID09IDAgPyAwIDogLWopICsgY2h1bmtQb3NbMV07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHogPSBrICsgY2h1bmtQb3NbMl0sIHoxID0gKGsgPT0gMCA/IDAgOiAtaykgKyBjaHVua1Bvc1syXTtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0LnB1c2gobmV3IFZlY3RvcjMoeCwgeSwgeikpO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQucHVzaChuZXcgVmVjdG9yMyh4LCB5LCB6MSkpO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQucHVzaChuZXcgVmVjdG9yMyh4LCB5MSwgeikpO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQucHVzaChuZXcgVmVjdG9yMyh4LCB5MSwgejEpKTtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0LnB1c2gobmV3IFZlY3RvcjMoeDEsIHkxLCB6KSk7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldC5wdXNoKG5ldyBWZWN0b3IzKHgxLCB5LCB6MSkpO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQucHVzaChuZXcgVmVjdG9yMyh4MSwgeSwgeikpO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQucHVzaChuZXcgVmVjdG9yMyh4MSwgeTEsIHoxKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIG9mZnNldCA9IG9mZnNldC5maWx0ZXIoKHYsIGksIGEpID0+IGEuZmluZEluZGV4KHYyID0+ICh2WzBdID09PSB2MlswXSAmJiB2WzFdID09PSB2MlsxXSAmJiB2WzJdID09PSB2MlsyXSkpID09PSBpKTtcbiAgICBjYXN0ZWRTdGF0ZSA9IGxvYWRNYW55Q2h1bmtzKGdsLCBjYXN0ZWRTdGF0ZSwgb2Zmc2V0KTtcbiAgICByZXR1cm4gY2FzdGVkU3RhdGU7XG59O1xuZXhwb3J0IGNvbnN0IHVubG9hZENodW5rcyA9IChnbCwgc3RhdGUsIGRlbHRhKSA9PiAoZGF0YSkgPT4ge1xuICAgIGxldCBjYXN0ZWRTdGF0ZSA9IHN0YXRlO1xuICAgIGNvbnN0IGxvYWREaXN0YW5jZSA9IGNhc3RlZFN0YXRlLmNodW5rRmFjdG9yeS5sb2FkRGlzdGFuY2U7XG4gICAgY29uc3QgY2h1bmtTaXplID0gY2FzdGVkU3RhdGUuY2h1bmtGYWN0b3J5LmNodW5rU2l6ZTtcbiAgICBjb25zdCBwbGF5ZXJQb3MgPSBjYXN0ZWRTdGF0ZS5wbGF5ZXIucG9zaXRpb247XG4gICAgY29uc3QgY2h1bmtQb3MgPSBuZXcgVmVjdG9yMyhNYXRoLmZsb29yKHBsYXllclBvcy54IC8gY2h1bmtTaXplKSwgTWF0aC5mbG9vcihwbGF5ZXJQb3MueSAvIGNodW5rU2l6ZSksIE1hdGguZmxvb3IocGxheWVyUG9zLnogLyBjaHVua1NpemUpKTtcbiAgICBjb25zdCBjaHVua1Bvc1N0b3JhZ2UgPSBjYXN0ZWRTdGF0ZS5jb21wb25lbnRzW1wiY2h1bmtQb3NcIl07XG4gICAgaWYgKCFjaHVua1Bvc1N0b3JhZ2UpXG4gICAgICAgIHJldHVybiBjYXN0ZWRTdGF0ZTtcbiAgICBjaHVua1Bvc1N0b3JhZ2UuZm9yRWFjaCgodiwgaykgPT4ge1xuICAgICAgICAvLyBsZXQgdW5sb2FkID0gZmFsc2U7XG4gICAgICAgIC8vIGZpbmQgY2h1bmtwb3Mgb3V0c2lkZSByYW5nZSBhbmQgdW5sb2FkXG4gICAgICAgIC8vIGlmKHZbMF0qKjIgKyB2WzFdKioyICsgdlsyXSoqMiA+IGxvYWREaXN0YW5jZSoqMilcbiAgICAgICAgLy8gIGNhc3RlZFN0YXRlID0gdW5sb2FkQ2h1bmsoY2FzdGVkU3RhdGUsIHYpO1xuICAgICAgICBpZiAodi54IDwgY2h1bmtQb3MueCAtIGxvYWREaXN0YW5jZSlcbiAgICAgICAgICAgIGNhc3RlZFN0YXRlID0gdW5sb2FkQ2h1bmsoY2FzdGVkU3RhdGUsIHYpO1xuICAgICAgICBpZiAodi54ID4gY2h1bmtQb3MueCArIGxvYWREaXN0YW5jZSlcbiAgICAgICAgICAgIGNhc3RlZFN0YXRlID0gdW5sb2FkQ2h1bmsoY2FzdGVkU3RhdGUsIHYpO1xuICAgICAgICBpZiAodi55IDwgY2h1bmtQb3MueSAtIGxvYWREaXN0YW5jZSlcbiAgICAgICAgICAgIGNhc3RlZFN0YXRlID0gdW5sb2FkQ2h1bmsoY2FzdGVkU3RhdGUsIHYpO1xuICAgICAgICBpZiAodi55ID4gY2h1bmtQb3MueSArIGxvYWREaXN0YW5jZSlcbiAgICAgICAgICAgIGNhc3RlZFN0YXRlID0gdW5sb2FkQ2h1bmsoY2FzdGVkU3RhdGUsIHYpO1xuICAgICAgICBpZiAodi56IDwgY2h1bmtQb3MueiAtIGxvYWREaXN0YW5jZSlcbiAgICAgICAgICAgIGNhc3RlZFN0YXRlID0gdW5sb2FkQ2h1bmsoY2FzdGVkU3RhdGUsIHYpO1xuICAgICAgICBpZiAodi56ID4gY2h1bmtQb3MueiArIGxvYWREaXN0YW5jZSlcbiAgICAgICAgICAgIGNhc3RlZFN0YXRlID0gdW5sb2FkQ2h1bmsoY2FzdGVkU3RhdGUsIHYpO1xuICAgICAgICAvLyBjYXN0ZWRTdGF0ZS5xdWV1ZS5wdXNoKHsgdHlwZTogXCJjaHVua1VubG9hZFwiLCBkYXRhOiB2IH0pXG4gICAgfSk7XG4gICAgcmV0dXJuIGNhc3RlZFN0YXRlO1xufTtcbiIsImltcG9ydCB7IG5haXZlTWVzaGluZyB9IGZyb20gJy4uL2NodW5rL21lc2gnO1xuLy8gbWVzaCBjaHVua1xuc2VsZi5vbm1lc3NhZ2UgPSAoZSkgPT4ge1xuICAgIGNvbnN0IGNodW5rUG9zID0gZS5kYXRhLnBvczsgLy8gcGFzc2VkIGluXG4gICAgY29uc3Qgc3RydWN0dXJlcyA9IGUuZGF0YS5zdHJ1Y3R1cmVzO1xuICAgIGNvbnN0IGNodW5rRmFjdG9yeSA9IGUuZGF0YS5jaHVua0ZhY3Rvcnk7XG4gICAgLy8gZ2VuZXJhdGUgbWVzaFxuICAgIGNvbnN0IG1lc2ggPSBuYWl2ZU1lc2hpbmcoY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBjaHVua1Bvcyk7XG4gICAgc2VsZi5wb3N0TWVzc2FnZShtZXNoKTtcbiAgICBjbG9zZSgpO1xufTtcbiIsImltcG9ydCB7IE1hdHJpeDQsIFZlY3RvcjMgfSBmcm9tICdAbWF0aC5nbC9jb3JlJztcbmV4cG9ydCBjb25zdCByYWRpYW5zID0gKG4pID0+IHtcbiAgICByZXR1cm4gKG4gKiBNYXRoLlBJKSAvIDE4MC4wO1xufTtcbmV4cG9ydCBjb25zdCBtdWx0aXBseUFuZERlc3RydWN0VmVjdG9yMyA9ICh2ZWMsIG0pID0+IHtcbiAgICByZXR1cm4gW3ZlYy54ICogbSwgdmVjLnkgKiBtLCB2ZWMueiAqIG1dO1xufTtcbmV4cG9ydCBjb25zdCBmdW5jdGlvbmFsQ3Jvc3NWZWN0b3IzID0gKHYxLCB2MikgPT4ge1xuICAgIGNvbnN0IHYgPSBuZXcgVmVjdG9yMyh2MS54LCB2MS55LCB2MS56KTtcbiAgICByZXR1cm4gdi5jcm9zcyhbdjIueCwgdjIueSwgdjIuel0pLm5vcm1hbGl6ZSgpO1xufTtcbmV4cG9ydCBjb25zdCBwcm9qZWN0aW9uTWF0cml4ID0gKHcsIGgpID0+IChuZXcgTWF0cml4NCgpLnBlcnNwZWN0aXZlKHtcbiAgICBmb3Y6IDcwLFxuICAgIGZvdnk6IChNYXRoLlBJICogNzApIC8gMTgwLFxuICAgIGFzcGVjdDogd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgbmVhcjogMC4xLFxuICAgIGZhcjogMTAwLjBcbn0pKTtcbmV4cG9ydCBjb25zdCBmbG9vclZlY3RvciA9IChwb3MpID0+IChuZXcgVmVjdG9yMyhNYXRoLmZsb29yKHBvcy54KSwgTWF0aC5mbG9vcihwb3MueSksIE1hdGguZmxvb3IocG9zLnopKSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbi8vIHRoZSBzdGFydHVwIGZ1bmN0aW9uXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnggPSAoKSA9PiB7XG5cdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuXHQvLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcblx0dmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19tYXRoX2dsX2NvcmVfZGlzdF9lc21fY2xhc3Nlc19tYXRyaXg0X2pzLW5vZGVfbW9kdWxlc19tYXRoX2dsX2NvcmVfZGlzdF8tNzkwN2Q5XCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2V4YW1wbGUvd29ya2Vycy9tZXNoV29ya2VyLnRzXCIpKSlcblx0X193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcblx0cmV0dXJuIF9fd2VicGFja19leHBvcnRzX187XG59O1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmYgPSB7fTtcbi8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5lID0gKGNodW5rSWQpID0+IHtcblx0cmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uZikucmVkdWNlKChwcm9taXNlcywga2V5KSA9PiB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5mW2tleV0oY2h1bmtJZCwgcHJvbWlzZXMpO1xuXHRcdHJldHVybiBwcm9taXNlcztcblx0fSwgW10pKTtcbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYXN5bmMgY2h1bmtzIGFuZCBzaWJsaW5nIGNodW5rcyBmb3IgdGhlIGVudHJ5cG9pbnRcbl9fd2VicGFja19yZXF1aXJlX18udSA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gXCJcIiArIGNodW5rSWQgKyBcIi5idW5kbGUuanNcIjtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBzZWxmLmxvY2F0aW9uICsgXCJcIjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBjaHVua3Ncbi8vIFwiMVwiIG1lYW5zIFwiYWxyZWFkeSBsb2FkZWRcIlxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJzcmNfZXhhbXBsZV9jaHVua19jaHVua190c1wiOiAxXG59O1xuXG4vLyBpbXBvcnRTY3JpcHRzIGNodW5rIGxvYWRpbmdcbnZhciBpbnN0YWxsQ2h1bmsgPSAoZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHRmb3IodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0fVxuXHR9XG5cdGlmKHJ1bnRpbWUpIHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdHdoaWxlKGNodW5rSWRzLmxlbmd0aClcblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZHMucG9wKCldID0gMTtcblx0cGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG59O1xuX193ZWJwYWNrX3JlcXVpcmVfXy5mLmkgPSAoY2h1bmtJZCwgcHJvbWlzZXMpID0+IHtcblx0Ly8gXCIxXCIgaXMgdGhlIHNpZ25hbCBmb3IgXCJhbHJlYWR5IGxvYWRlZFwiXG5cdGlmKCFpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRpZih0cnVlKSB7IC8vIGFsbCBjaHVua3MgaGF2ZSBKU1xuXHRcdFx0aW1wb3J0U2NyaXB0cyhfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLnUoY2h1bmtJZCkpO1xuXHRcdH1cblx0fVxufTtcblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmthcHBcIl0gPSBzZWxmW1wid2VicGFja0NodW5rYXBwXCJdIHx8IFtdO1xudmFyIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uID0gY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSBpbnN0YWxsQ2h1bms7XG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3QiLCJ2YXIgbmV4dCA9IF9fd2VicGFja19yZXF1aXJlX18ueDtcbl9fd2VicGFja19yZXF1aXJlX18ueCA9ICgpID0+IHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShcInZlbmRvcnMtbm9kZV9tb2R1bGVzX21hdGhfZ2xfY29yZV9kaXN0X2VzbV9jbGFzc2VzX21hdHJpeDRfanMtbm9kZV9tb2R1bGVzX21hdGhfZ2xfY29yZV9kaXN0Xy03OTA3ZDlcIikudGhlbihuZXh0KTtcbn07IiwiIiwiLy8gcnVuIHN0YXJ0dXBcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy54KCk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=