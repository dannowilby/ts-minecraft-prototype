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
    for (let i = 0; i < pos.length; i++) {
        const entityId = chunkId(pos[i]);
        if (state.entities.has(entityId))
            continue;
        const entity = (0,_engine_ec__WEBPACK_IMPORTED_MODULE_0__.newEntity)(entities, entityId);
        const structure = (0,_generation__WEBPACK_IMPORTED_MODULE_3__.generateStructure)(chunkFactory, pos[i]);
        state = (0,_engine_ec__WEBPACK_IMPORTED_MODULE_0__.addComponent)(state, entityId, "structures", structure);
        state = (0,_engine_ec__WEBPACK_IMPORTED_MODULE_0__.addComponent)(state, entityId, "chunkPos", pos[i]);
        const worker = new Worker(new URL(/* worker import */ __webpack_require__.p + __webpack_require__.u("src_example_chunk_chunk_ts"), __webpack_require__.b), { type: undefined });
        worker.postMessage({ chunkFactory, structures, pos: pos[i] });
        worker.onmessage = (e) => {
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
  out vec2 text_coords;
  
  void main() {
    
    text_coords = uv_Coords;
    ao = ao_Coords;
    
    gl_Position = projection * view * model * vec4(v_Position, 1.0);
  }
`;
const chunkFragmentShader = `#version 300 es
  precision highp float;
  
  in vec2 text_coords;
  in float ao;
  
  uniform sampler2D texture_atlas;
  
  out vec4 frag_color;

  void main() {
    
    float aoIntensity = ao / 2.0;
    float darkenAmount = 1.0 / (aoIntensity + 1.0);
    
    vec4 atlas = texture(texture_atlas, text_coords);

    frag_color = vec4(darkenAmount * atlas.xyz, atlas.w);
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
/* harmony import */ var _math_gl_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @math.gl/core */ "./node_modules/@math.gl/core/dist/esm/classes/vector3.js");
/* harmony import */ var _chunk_chunk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk/chunk */ "./src/example/chunk/chunk.ts");


// copy some noise code
const noise = (x, y) => {
    return 0.5;
};
const generateBlock = (chunkFactory, pos) => {
    const chunkSize = chunkFactory.chunkSize;
    const baseHeight = chunkSize / 2;
    const wavelength = chunkSize * 2;
    const height = chunkSize / 4;
    // check for already loaded chunks
    const h = baseHeight + height * noise(pos[0] / wavelength, pos[2] / wavelength);
    if (pos[1] < 0)
        return 1;
    if (pos[1] < h || pos[1] > 2 * h)
        return 2;
    return 0;
};
const generateStructure = (chunkFactory, pos) => {
    const output = new SharedArrayBuffer(8 * (Math.pow(chunkFactory.chunkSize, 3)));
    const t = new Float64Array(output);
    const entityId = (0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_0__.chunkId)(pos);
    const chunkSize = chunkFactory.chunkSize;
    const blockPos = new _math_gl_core__WEBPACK_IMPORTED_MODULE_1__["default"](pos[0] * chunkSize, pos[1] * chunkSize, pos[2] * chunkSize);
    // set the blocks
    for (let i = 0; i < chunkSize; i++) { // x
        for (let j = 0; j < chunkSize; j++) { // y
            for (let k = 0; k < chunkSize; k++) { // z
                const gx = blockPos[0] + i;
                const gy = blockPos[1] + j;
                const gz = blockPos[2] + k;
                const l = (0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_0__.localBlockPosToIndex)(chunkFactory, i, j, k);
                //console.log(l);
                t[l] = generateBlock(chunkFactory, new _math_gl_core__WEBPACK_IMPORTED_MODULE_1__["default"](gx, gy, gz));
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
    let state = Object.assign(Object.assign({}, (0,_engine_ec__WEBPACK_IMPORTED_MODULE_1__.createECState)(gl)), { player: (0,_player__WEBPACK_IMPORTED_MODULE_5__.createPlayer)(gl), chunkFactory: (0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_6__.ChunkFactory)(gl), blockDictionary: createBlockDictionary(), atlas: (0,_render__WEBPACK_IMPORTED_MODULE_8__.loadTexture)(gl, "atlas.png"), program: (0,_render__WEBPACK_IMPORTED_MODULE_8__.initShaders)(gl, _chunk_mesh__WEBPACK_IMPORTED_MODULE_7__.chunkVertexShader, _chunk_mesh__WEBPACK_IMPORTED_MODULE_7__.chunkFragmentShader) });
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
        castedState = (0,_chunk_chunk__WEBPACK_IMPORTED_MODULE_1__.setBlock)(castedState, prevPos, 1);
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
    const offset = [];
    const r = loadDistance;
    for (let i = 0; i < r; i++) {
        for (let j = 0; j < r; j++) {
            for (let k = 0; k < r; k++) {
                if ((i * i + j * j + k * k) < r * r) {
                    offset.push(new _math_gl_core__WEBPACK_IMPORTED_MODULE_1__["default"](i, j, k));
                    offset.push(new _math_gl_core__WEBPACK_IMPORTED_MODULE_1__["default"](i, -j, k));
                }
            }
        }
    }
    console.log(offset);
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
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_math_gl_core_dist_esm_classes_matrix4_js-node_modules_math_gl_core_dist_-038b6a"], () => (__webpack_require__("./src/example/workers/meshWorker.ts")))
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
/******/ 			return __webpack_require__.e("vendors-node_modules_math_gl_core_dist_esm_classes_matrix4_js-node_modules_math_gl_core_dist_-038b6a").then(next);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7Ozs7O1dDUkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NKQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDZkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGFBQWE7V0FDYjtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7Ozs7O1dDcENBO1dBQ0E7V0FDQTtXQUNBOzs7OztVRUhBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcHAvLi9zcmMvZW5naW5lL2VjLnRzIiwid2VicGFjazovL2FwcC8uL3NyYy9lbmdpbmUvZnJlZUNhbWVyYS50cyIsIndlYnBhY2s6Ly9hcHAvLi9zcmMvZW5naW5lL3N0YXRlLnRzIiwid2VicGFjazovL2FwcC8uL3NyYy9leGFtcGxlL2NodW5rL2NodW5rLnRzIiwid2VicGFjazovL2FwcC8uL3NyYy9leGFtcGxlL2NodW5rL21lc2gudHMiLCJ3ZWJwYWNrOi8vYXBwLy4vc3JjL2V4YW1wbGUvZ2VuZXJhdGlvbi50cyIsIndlYnBhY2s6Ly9hcHAvLi9zcmMvZXhhbXBsZS9pbmRleC50cyIsIndlYnBhY2s6Ly9hcHAvLi9zcmMvZXhhbXBsZS9wbGF5ZXIudHMiLCJ3ZWJwYWNrOi8vYXBwLy4vc3JjL2V4YW1wbGUvcmVuZGVyLnRzIiwid2VicGFjazovL2FwcC8uL3NyYy9leGFtcGxlL3N5c3RlbXMvY2h1bmsudHMiLCJ3ZWJwYWNrOi8vYXBwLy4vc3JjL2V4YW1wbGUvc3lzdGVtcy9pbnB1dC50cyIsIndlYnBhY2s6Ly9hcHAvLi9zcmMvZXhhbXBsZS9zeXN0ZW1zL3dvcmxkLnRzIiwid2VicGFjazovL2FwcC8uL3NyYy9leGFtcGxlL3dvcmtlcnMvbWVzaFdvcmtlci50cyIsIndlYnBhY2s6Ly9hcHAvLi9zcmMvbGliL21hdGgudHMiLCJ3ZWJwYWNrOi8vYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2FwcC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2FwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYXBwL3dlYnBhY2svcnVudGltZS9lbnN1cmUgY2h1bmsiLCJ3ZWJwYWNrOi8vYXBwL3dlYnBhY2svcnVudGltZS9nZXQgamF2YXNjcmlwdCBjaHVuayBmaWxlbmFtZSIsIndlYnBhY2s6Ly9hcHAvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9hcHAvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vYXBwL3dlYnBhY2svcnVudGltZS9pbXBvcnRTY3JpcHRzIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYXBwL3dlYnBhY2svcnVudGltZS9zdGFydHVwIGNodW5rIGRlcGVuZGVuY2llcyIsIndlYnBhY2s6Ly9hcHAvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9hcHAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2FwcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlU3RhdGUgfSBmcm9tICcuL3N0YXRlJztcbmV4cG9ydCBjb25zdCByZWdpc3RlckNvbXBvbmVudCA9IChjb21wb25lbnRzLCBjb21wb25lbnROYW1lKSA9PiAoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBjb21wb25lbnRzKSwgeyBbY29tcG9uZW50TmFtZV06IG5ldyBNYXAoKSB9KSk7XG5leHBvcnQgY29uc3QgbmV3RW50aXR5ID0gKGVudGl0aWVzLCBlbnRpdHlJZCkgPT4ge1xuICAgIGVudGl0aWVzLnNldChlbnRpdHlJZCwgW10pO1xuICAgIHJldHVybiBlbnRpdGllcztcbn07XG5leHBvcnQgY29uc3QgYWRkQ29tcG9uZW50ID0gKHN0YXRlLCBlbnRpdHlJZCwgc3RvcmFnZSwgY29tcG9uZW50KSA9PiB7XG4gICAgY29uc3QgZW50aXRpZXMgPSBzdGF0ZS5lbnRpdGllcztcbiAgICBjb25zdCBjb21wb25lbnRzID0gc3RhdGUuY29tcG9uZW50cztcbiAgICBjb25zdCBjb21wb25lbnRTdG9yYWdlID0gY29tcG9uZW50c1tzdG9yYWdlXTtcbiAgICBjb25zdCBlbnRpdHkgPSBlbnRpdGllcy5nZXQoZW50aXR5SWQpO1xuICAgIGlmICghZW50aXR5KVxuICAgICAgICB0aHJvdyBFcnJvcihcIkFkZCBDb21wb25lbnQ6IEVudGl0eSBkb2VzIG5vdCBleGlzdCFcIik7XG4gICAgaWYgKCFjb21wb25lbnRTdG9yYWdlKVxuICAgICAgICB0aHJvdyBFcnJvcihcIkFkZCBDb21wb25lbnQ6IE5vIHJlZ2lzdGVyZWQgY29tcG9uZW50IHN0b3JhZ2UhXCIpO1xuICAgIGNvbXBvbmVudHNbc3RvcmFnZV0uc2V0KGVudGl0eUlkLCBjb21wb25lbnQpO1xuICAgIGVudGl0aWVzLnNldChlbnRpdHlJZCwgWy4uLmVudGl0eSwgc3RvcmFnZV0pO1xuICAgIHN0YXRlLmVudGl0aWVzID0gZW50aXRpZXM7XG4gICAgc3RhdGUuY29tcG9uZW50cyA9IGNvbXBvbmVudHM7XG4gICAgcmV0dXJuIHN0YXRlO1xufTtcbmV4cG9ydCBjb25zdCByZW1vdmVDb21wb25lbnQgPSAoc3RhdGUsIGVudGl0eUlkLCBzdG9yYWdlKSA9PiB7XG4gICAgY29uc3QgZW50aXRpZXMgPSBzdGF0ZS5lbnRpdGllcztcbiAgICBjb25zdCBjb21wb25lbnRzID0gc3RhdGUuY29tcG9uZW50cztcbiAgICBjb25zdCBjb21wb25lbnRTdG9yYWdlID0gY29tcG9uZW50c1tzdG9yYWdlXTtcbiAgICBjb25zdCBlbnRpdHkgPSBlbnRpdGllcy5nZXQoZW50aXR5SWQpO1xuICAgIGlmICghZW50aXR5KVxuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgLy90aHJvdyBFcnJvcihcIlJlbW92ZSBDb21wb25lbnQ6IEVudGl0eSBkb2VzIG5vdCBleGlzdCFcIik7XG4gICAgaWYgKCFjb21wb25lbnRTdG9yYWdlKVxuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgLy8gdGhyb3cgRXJyb3IoXCJSZW1vdmUgQ29tcG9uZW50OiBObyByZWdpc3RlcmVkIGNvbXBvbmVudCBzdG9yYWdlIVwiKTtcbiAgICBjb21wb25lbnRzW3N0b3JhZ2VdLmRlbGV0ZShlbnRpdHlJZCk7XG4gICAgY29uc3QgZWRnZXMgPSBlbnRpdHkuZmlsdGVyKHYgPT4gdiAhPT0gc3RvcmFnZSk7XG4gICAgZW50aXRpZXMuc2V0KGVudGl0eUlkLCBlZGdlcyk7XG4gICAgc3RhdGUuZW50aXRpZXMgPSBlbnRpdGllcztcbiAgICBzdGF0ZS5jb21wb25lbnRzID0gY29tcG9uZW50cztcbiAgICByZXR1cm4gc3RhdGU7XG59O1xuZXhwb3J0IGNvbnN0IHJlbW92ZUVudGl0eSA9IChzdGF0ZSwgZW50aXR5SWQpID0+IHtcbiAgICBjb25zdCBlbnRpdGllcyA9IHN0YXRlLmVudGl0aWVzO1xuICAgIGNvbnN0IGNvbXBvbmVudHMgPSBzdGF0ZS5jb21wb25lbnRzO1xuICAgIGNvbnN0IGVudGl0eSA9IGVudGl0aWVzLmdldChlbnRpdHlJZCk7XG4gICAgaWYgKCFlbnRpdHkpXG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICBjb25zdCBjb21wb25lbnRMaXN0ID0gWy4uLmVudGl0eV07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21wb25lbnRMaXN0Lmxlbmd0aDsgaSsrKVxuICAgICAgICBzdGF0ZSA9IHJlbW92ZUNvbXBvbmVudChzdGF0ZSwgZW50aXR5SWQsIGNvbXBvbmVudExpc3RbaV0pO1xuICAgIGVudGl0aWVzLmRlbGV0ZShlbnRpdHlJZCk7XG4gICAgc3RhdGUuZW50aXRpZXMgPSBlbnRpdGllcztcbiAgICBzdGF0ZS5jb21wb25lbnRzID0gY29tcG9uZW50cztcbiAgICByZXR1cm4gc3RhdGU7XG59O1xuO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUVDU3RhdGUgPSAoZ2wpID0+IHtcbiAgICBjb25zdCBzdGF0ZSA9IGNyZWF0ZVN0YXRlKGdsKTtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSksIHsgZW50aXRpZXM6IG5ldyBNYXAoKSwgY29tcG9uZW50czoge30gfSk7XG59O1xuIiwiaW1wb3J0IHsgVmVjdG9yMywgTWF0cml4NCB9IGZyb20gJ0BtYXRoLmdsL2NvcmUnO1xuaW1wb3J0IHsgcmFkaWFucywgbXVsdGlwbHlBbmREZXN0cnVjdFZlY3RvcjMsIGZ1bmN0aW9uYWxDcm9zc1ZlY3RvcjMgfSBmcm9tICcuLi9saWIvbWF0aCc7XG5leHBvcnQgY29uc3QgcHJvamVjdGlvbk1hdHJpeCA9ICh3LCBoKSA9PiAobmV3IE1hdHJpeDQoKS5wZXJzcGVjdGl2ZSh7XG4gICAgZm92OiA3MCxcbiAgICBmb3Z5OiAoTWF0aC5QSSAqIDcwKSAvIDE4MCxcbiAgICBhc3BlY3Q6IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LFxuICAgIG5lYXI6IDAuMSxcbiAgICBmYXI6IDEwMDAuMFxufSkpO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUNhbWVyYSA9IChnbCkgPT4ge1xuICAgIGNvbnN0IGNhbWVyYSA9IHtcbiAgICAgICAgcHJvamVjdGlvbjogcHJvamVjdGlvbk1hdHJpeCh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KSxcbiAgICAgICAgdmlldzogbmV3IE1hdHJpeDQoKS5pZGVudGl0eSgpLFxuICAgICAgICBwb3NpdGlvbjogbmV3IFZlY3RvcjMoMCwgMCwgMSksXG4gICAgICAgIGRpcmVjdGlvbjogbmV3IFZlY3RvcjMoMCwgMCwgLTEpLFxuICAgICAgICBzcGVlZDogMTAsXG4gICAgICAgIHBpdGNoOiAwLFxuICAgICAgICB5YXc6IC05MC4wLFxuICAgICAgICAvLyBhdGxhczogbG9hZFRleHR1cmUoZ2wsIGF0bGFzVXJsKSxcbiAgICAgICAgLy8gYWN0aXZlSW5wdXQ6IG5ldyBTZXQ8c3RyaW5nPigpXG4gICAgfTtcbiAgICAvLyB1cGRhdGVDYW1lcmEocGxheWVyKTtcbiAgICB3aW5kb3cub25yZXNpemUgPSBvblJlc2l6ZShnbCwgY2FtZXJhKTtcbiAgICByZXR1cm4gY2FtZXJhO1xufTtcbmNvbnN0IG9uUmVzaXplID0gKGdsLCBjYW1lcmEpID0+ICgpID0+IHtcbiAgICBjb25zdCB3ID0gd2luZG93LmlubmVyV2lkdGgsIGggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgZ2wuY2FudmFzLndpZHRoID0gdztcbiAgICBnbC5jYW52YXMuaGVpZ2h0ID0gaDtcbiAgICBnbC52aWV3cG9ydCgwLCAwLCB3LCBoKTtcbiAgICBjYW1lcmEucHJvamVjdGlvbiA9IHByb2plY3Rpb25NYXRyaXgodywgaCk7XG59O1xuZXhwb3J0IGNvbnN0IHJlY2FsY3VsYXRlVmlldyA9IChjYW1lcmEpID0+IHtcbiAgICBjb25zdCBwb3MgPSBjYW1lcmEucG9zaXRpb247XG4gICAgY29uc3QgZGlyID0gY2FtZXJhLmRpcmVjdGlvbjtcbiAgICBjb25zdCBwaXRjaCA9IHJhZGlhbnMoY2FtZXJhLnBpdGNoKTtcbiAgICBjb25zdCB5YXcgPSByYWRpYW5zKGNhbWVyYS55YXcpO1xuICAgIGRpci54ID0gTWF0aC5jb3MoeWF3KSAqIE1hdGguY29zKHBpdGNoKTtcbiAgICBkaXIueSA9IE1hdGguc2luKHBpdGNoKTtcbiAgICBkaXIueiA9IE1hdGguc2luKHlhdykgKiBNYXRoLmNvcyhwaXRjaCk7XG4gICAgY2FtZXJhLnZpZXcubG9va0F0KFtwb3MueCwgcG9zLnksIHBvcy56XSwgW3Bvcy54ICsgZGlyLngsIHBvcy55ICsgZGlyLnksIHBvcy56ICsgZGlyLnpdLCBbMCwgMS4wLCAwXSk7XG4gICAgcmV0dXJuIGNhbWVyYTtcbn07XG4vKlxuY29uc3QgcmF5VHJhY2UgPSAoZW50aXRpZXM6IEVudGl0eVtdLCBjb21wb25lbnRzOiBDb21wb25lbnRzLCBwbGF5ZXI6IFBsYXllcikgPT4gKHN0ZXBWYWx1ZTogbnVtYmVyLCBudW1TdGVwczogbnVtYmVyKSA9PiAob25IaXQ6IChwb3M6IFZlY3RvcjMpID0+IHZvaWQpID0+IHtcblxuICBjb25zdCBzdGVwID0gbXVsdGlwbHlBbmREZXN0cnVjdFZlY3RvcjMocGxheWVyLmRpcmVjdGlvbiwgc3RlcFZhbHVlKTtcbiAgY29uc3QgcmF5ID0gbmV3IFZlY3RvcjMocGxheWVyLnBvc2l0aW9uLngsIHBsYXllci5wb3NpdGlvbi55LCBwbGF5ZXIucG9zaXRpb24ueik7XG5cbiAgZm9yKGxldCBpID0gMDsgaSA8IG51bVN0ZXBzOyBpKyspIHtcbiAgICBcbiAgICBpZihnZXRCbG9jayhlbnRpdGllcywgY29tcG9uZW50cykocmF5KSAhPSAwKSB7XG4gICAgICBvbkhpdChyYXkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJheS54ID0gcmF5LnggKyBzdGVwWzBdO1xuICAgIHJheS55ID0gcmF5LnkgKyBzdGVwWzFdO1xuICAgIHJheS56ID0gcmF5LnogKyBzdGVwWzJdO1xuICB9XG5cbn07XG4qL1xuZXhwb3J0IGNvbnN0IGZyZWVDYW1lcmFJbnB1dCA9IChjYW1lcmEsIHN0YXRlLCBkZWx0YSkgPT4ge1xuICAgIGNvbnN0IGFjdGl2ZUlucHV0ID0gc3RhdGUuYWN0aXZlSW5wdXQ7XG4gICAgY29uc3QgbW91c2VNb3ZlbWVudCA9IHN0YXRlLm1vdXNlTW92ZW1lbnQ7XG4gICAgY29uc3QgbG9jayA9IHN0YXRlLmxvY2s7XG4gICAgaWYgKCFsb2NrKVxuICAgICAgICByZXR1cm4gY2FtZXJhO1xuICAgIGxldCBzcGVlZCA9IGNhbWVyYS5zcGVlZDtcbiAgICBjb25zdCB1cCA9IG5ldyBWZWN0b3IzKDAsIDEsIDApO1xuICAgIGNvbnN0IG1vdmUgPSBtdWx0aXBseUFuZERlc3RydWN0VmVjdG9yMyhjYW1lcmEuZGlyZWN0aW9uLCBzcGVlZCAqIGRlbHRhKTtcbiAgICBjb25zdCBzdHJhZmUgPSBtdWx0aXBseUFuZERlc3RydWN0VmVjdG9yMyhmdW5jdGlvbmFsQ3Jvc3NWZWN0b3IzKGNhbWVyYS5kaXJlY3Rpb24sIHVwKSwgc3BlZWQgKiBkZWx0YSk7XG4gICAgaWYgKGFjdGl2ZUlucHV0LmhhcyhcIndcIikpXG4gICAgICAgIGNhbWVyYS5wb3NpdGlvbi5hZGQobW92ZSk7XG4gICAgaWYgKGFjdGl2ZUlucHV0LmhhcyhcInNcIikpXG4gICAgICAgIGNhbWVyYS5wb3NpdGlvbi5zdWJ0cmFjdChtb3ZlKTtcbiAgICBpZiAoYWN0aXZlSW5wdXQuaGFzKFwiYVwiKSlcbiAgICAgICAgY2FtZXJhLnBvc2l0aW9uLnN1YnRyYWN0KHN0cmFmZSk7XG4gICAgaWYgKGFjdGl2ZUlucHV0LmhhcyhcImRcIikpXG4gICAgICAgIGNhbWVyYS5wb3NpdGlvbi5hZGQoc3RyYWZlKTtcbiAgICBpZiAoYWN0aXZlSW5wdXQuaGFzKFwiIFwiKSlcbiAgICAgICAgY2FtZXJhLnBvc2l0aW9uLmFkZChtdWx0aXBseUFuZERlc3RydWN0VmVjdG9yMyh1cCwgZGVsdGEgKiBzcGVlZCkpO1xuICAgIGlmIChhY3RpdmVJbnB1dC5oYXMoXCJzaGlmdFwiKSlcbiAgICAgICAgY2FtZXJhLnBvc2l0aW9uLnN1YnRyYWN0KG11bHRpcGx5QW5kRGVzdHJ1Y3RWZWN0b3IzKHVwLCBkZWx0YSAqIHNwZWVkKSk7XG4gICAgY2FtZXJhLnlhdyArPSBtb3VzZU1vdmVtZW50WzBdO1xuICAgIGNhbWVyYS5waXRjaCAtPSBtb3VzZU1vdmVtZW50WzFdO1xuICAgIGlmIChjYW1lcmEucGl0Y2ggPiA4OS4wKVxuICAgICAgICBjYW1lcmEucGl0Y2ggPSA4OS4wO1xuICAgIGlmIChjYW1lcmEucGl0Y2ggPCAtODkuMClcbiAgICAgICAgY2FtZXJhLnBpdGNoID0gLTg5LjA7XG4gICAgcmV0dXJuIHJlY2FsY3VsYXRlVmlldyhjYW1lcmEpO1xuICAgIC8qXG4gICAgZG9jdW1lbnQub25jbGljayA9IChlKSA9PiB7XG4gIFxuICAgICAgcmF5VHJhY2UoZW50aXRpZXMsIGNvbXBvbmVudHMsIHBsYXllcikoMC4wNSwgMTAwKSgocG9zOiBWZWN0b3IzKSA9PiB7XG4gICAgICAgIHNldEJsb2NrKGVudGl0aWVzLCBjb21wb25lbnRzKShwb3MsIDApO1xuICAgICAgICB1cGRhdGVDaHVuayhnbCwgZW50aXRpZXMsIGNvbXBvbmVudHMpKHBvcyk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgKi9cbn07XG4iLCI7XG5leHBvcnQgY29uc3QgY3JlYXRlU3RhdGUgPSAoZ2wpID0+IHtcbiAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgc3lzdGVtczogbmV3IE1hcCgpLFxuICAgICAgICBhY3RpdmVJbnB1dDogbmV3IFNldCgpLFxuICAgICAgICBtb3VzZU1vdmVtZW50OiBbMCwgMF0sXG4gICAgICAgIHF1ZXVlOiBbXSxcbiAgICAgICAgbG9jazogZmFsc2UsXG4gICAgfTtcbiAgICByZXR1cm4gc3RhdGU7XG59O1xuZXhwb3J0IGNvbnN0IGFkZFN5c3RlbSA9IChzdGF0ZSwgdHlwZSwgc3lzdGVtKSA9PiB7XG4gICAgY29uc3Qgc3lzdGVtcyA9IHN0YXRlLnN5c3RlbXM7XG4gICAgY29uc3Qgc3lzdGVtQ29udGFpbmVyID0gc3lzdGVtcy5nZXQodHlwZSk7XG4gICAgaWYgKCFzeXN0ZW1Db250YWluZXIpIHtcbiAgICAgICAgc3lzdGVtcy5zZXQodHlwZSwgW3N5c3RlbV0pO1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICAgIHN5c3RlbUNvbnRhaW5lciA9PT0gbnVsbCB8fCBzeXN0ZW1Db250YWluZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN5c3RlbUNvbnRhaW5lci5wdXNoKHN5c3RlbSk7XG4gICAgcmV0dXJuIHN0YXRlO1xufTtcbmV4cG9ydCBjb25zdCBkaXNwYXRjaCA9IChnbCwgc3RhdGUsIHR5cGUsIGRlbHRhKSA9PiAoZGF0YSkgPT4ge1xuICAgIGNvbnN0IHN5c3RlbXMgPSBzdGF0ZS5zeXN0ZW1zO1xuICAgIGNvbnN0IHN5c3RlbSA9IHN5c3RlbXMuZ2V0KHR5cGUpO1xuICAgIGlmICghc3lzdGVtKVxuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgLy90aHJvdyBFcnJvcihcIkRpc3BhdGNoOiBTeXN0ZW0gbm90IHJlZ2lzdGVyZWRcIik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzeXN0ZW0ubGVuZ3RoOyBpKyspXG4gICAgICAgIHN0YXRlID0gc3lzdGVtW2ldKGdsLCBzdGF0ZSwgZGVsdGEpKGRhdGEpO1xuICAgIHJldHVybiBzdGF0ZTtcbn07XG4vLyBuZWVkIHRvIGNyZWF0ZSBhZGRTeXN0ZW0gYW5kIHNlcGVyYXRlIGNvbXBvbmVudHMvZW50aXRpZXMgaW50byBhbm90aGVyIGZpbGVcbiIsImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICdAbWF0aC5nbC9jb3JlJztcbmltcG9ydCB7IG5ld0VudGl0eSwgYWRkQ29tcG9uZW50LCByZW1vdmVFbnRpdHkgfSBmcm9tICcuLi8uLi9lbmdpbmUvZWMnO1xuaW1wb3J0IHsgY3JlYXRlQ2h1bmtSZW5kZXJPYmplY3QsIG5haXZlTWVzaGluZyB9IGZyb20gJy4vbWVzaCc7XG5pbXBvcnQgeyBjcmVhdGVCbG9ja0RpY3Rpb25hcnkgfSBmcm9tICcuLi9pbmRleCc7XG5pbXBvcnQgeyBnZW5lcmF0ZVN0cnVjdHVyZSwgZ2VuZXJhdGVCbG9jayB9IGZyb20gJy4uL2dlbmVyYXRpb24nO1xuZXhwb3J0IGNvbnN0IENodW5rRmFjdG9yeSA9IChnbCkgPT4gKHtcbiAgICBjaHVua1NpemU6IDgsXG4gICAgbG9hZERpc3RhbmNlOiAzLFxuICAgIGJsb2NrRGljdGlvbmFyeTogY3JlYXRlQmxvY2tEaWN0aW9uYXJ5KCksXG59KTtcbmV4cG9ydCBjb25zdCBjaHVua0lkID0gKHBvcykgPT4gKGBjaHUtJHtwb3NbMF19LSR7cG9zWzFdfS0ke3Bvc1syXX1gKTtcbmV4cG9ydCBjb25zdCBjaHVua1Bvc0Zyb21CbG9ja1BvcyA9IChjaHVua0ZhY3RvcnksIHBvcykgPT4gKG5ldyBWZWN0b3IzKE1hdGguZmxvb3IocG9zWzBdIC8gY2h1bmtGYWN0b3J5LmNodW5rU2l6ZSksIE1hdGguZmxvb3IocG9zWzFdIC8gY2h1bmtGYWN0b3J5LmNodW5rU2l6ZSksIE1hdGguZmxvb3IocG9zWzJdIC8gY2h1bmtGYWN0b3J5LmNodW5rU2l6ZSkpKTtcbmV4cG9ydCBjb25zdCBsb2NhbEJsb2NrUG9zVG9JbmRleCA9IChjaHVua0ZhY3RvcnksIHgsIHksIHopID0+IHtcbiAgICBjb25zdCBjaHVua1NpemUgPSBjaHVua0ZhY3RvcnkuY2h1bmtTaXplO1xuICAgIHJldHVybiAoeCArIHkgKiBjaHVua1NpemUgKyB6ICogY2h1bmtTaXplICogY2h1bmtTaXplKTtcbn07XG4vKiogU3RhcnQgRVhQT1NFRCBDSFVOSyBGVU5DVElPTlMgKiovXG4vLyBTWU5DSFJPTk9VU1xuZXhwb3J0IGNvbnN0IGxvYWRDaHVuayA9IChnbCwgc3RhdGUsIHBvcykgPT4ge1xuICAgIGNvbnN0IGVudGl0aWVzID0gc3RhdGUuZW50aXRpZXM7XG4gICAgY29uc3QgY29tcG9uZW50cyA9IHN0YXRlLmNvbXBvbmVudHM7XG4gICAgY29uc3QgY2h1bmtGYWN0b3J5ID0gc3RhdGUuY2h1bmtGYWN0b3J5O1xuICAgIGNvbnN0IGVudGl0eUlkID0gY2h1bmtJZChwb3MpO1xuICAgIGlmIChzdGF0ZS5lbnRpdGllcy5oYXMoZW50aXR5SWQpKVxuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgY29uc3QgZW50aXR5ID0gbmV3RW50aXR5KGVudGl0aWVzLCBlbnRpdHlJZCk7XG4gICAgY29uc3Qgc3RydWN0dXJlID0gZ2VuZXJhdGVTdHJ1Y3R1cmUoY2h1bmtGYWN0b3J5LCBwb3MpO1xuICAgIHN0YXRlID0gYWRkQ29tcG9uZW50KHN0YXRlLCBlbnRpdHlJZCwgXCJzdHJ1Y3R1cmVzXCIsIHN0cnVjdHVyZSk7XG4gICAgY29uc3QgcmVuZGVyT2JqZWN0ID0gYnVpbGRDaHVuayhnbCwgc3RhdGUsIHBvcyk7XG4gICAgc3RhdGUgPSBhZGRDb21wb25lbnQoc3RhdGUsIGVudGl0eUlkLCBcInJlbmRlck9iamVjdHNcIiwgcmVuZGVyT2JqZWN0KTtcbiAgICBzdGF0ZSA9IGFkZENvbXBvbmVudChzdGF0ZSwgZW50aXR5SWQsIFwiY2h1bmtQb3NcIiwgcG9zKTtcbiAgICByZXR1cm4gc3RhdGU7XG59O1xuLy8gQVNZTkNIUk9OT1VTXG5leHBvcnQgY29uc3QgbG9hZE1hbnlDaHVua3MgPSAoZ2wsIHN0YXRlLCBwb3MpID0+IHtcbiAgICBjb25zdCBlbnRpdGllcyA9IHN0YXRlLmVudGl0aWVzO1xuICAgIGNvbnN0IGNvbXBvbmVudHMgPSBzdGF0ZS5jb21wb25lbnRzO1xuICAgIGNvbnN0IHN0cnVjdHVyZXMgPSBjb21wb25lbnRzW1wic3RydWN0dXJlc1wiXTtcbiAgICBjb25zdCBjaHVua0ZhY3RvcnkgPSBzdGF0ZS5jaHVua0ZhY3Rvcnk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZW50aXR5SWQgPSBjaHVua0lkKHBvc1tpXSk7XG4gICAgICAgIGlmIChzdGF0ZS5lbnRpdGllcy5oYXMoZW50aXR5SWQpKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIGNvbnN0IGVudGl0eSA9IG5ld0VudGl0eShlbnRpdGllcywgZW50aXR5SWQpO1xuICAgICAgICBjb25zdCBzdHJ1Y3R1cmUgPSBnZW5lcmF0ZVN0cnVjdHVyZShjaHVua0ZhY3RvcnksIHBvc1tpXSk7XG4gICAgICAgIHN0YXRlID0gYWRkQ29tcG9uZW50KHN0YXRlLCBlbnRpdHlJZCwgXCJzdHJ1Y3R1cmVzXCIsIHN0cnVjdHVyZSk7XG4gICAgICAgIHN0YXRlID0gYWRkQ29tcG9uZW50KHN0YXRlLCBlbnRpdHlJZCwgXCJjaHVua1Bvc1wiLCBwb3NbaV0pO1xuICAgICAgICBjb25zdCB3b3JrZXIgPSBuZXcgV29ya2VyKG5ldyBVUkwoJy4uL3dvcmtlcnMvbWVzaFdvcmtlci50cycsIGltcG9ydC5tZXRhLnVybCksIHsgdHlwZTogXCJtb2R1bGVcIiB9KTtcbiAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHsgY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBwb3M6IHBvc1tpXSB9KTtcbiAgICAgICAgd29ya2VyLm9ubWVzc2FnZSA9IChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZW5kZXJPYmplY3QgPSBjcmVhdGVDaHVua1JlbmRlck9iamVjdChnbCwgc3RhdGUucHJvZ3JhbSwgc3RhdGUuY2h1bmtGYWN0b3J5LCBwb3NbaV0sIGUuZGF0YSk7XG4gICAgICAgICAgICBzdGF0ZSA9IGFkZENvbXBvbmVudChzdGF0ZSwgZW50aXR5SWQsIFwicmVuZGVyT2JqZWN0c1wiLCByZW5kZXJPYmplY3QpO1xuICAgICAgICAgICAgd29ya2VyLnRlcm1pbmF0ZSgpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gc3RhdGU7XG59O1xuLy8gRklYTUU6IGRvbid0IGNyZWF0ZSBhIG5ldyBWQU8gZXZlcnkgdGltZSwganVzdCB1cGRhdGUgdGhlIGV4aXN0aW5nXG5leHBvcnQgY29uc3QgdXBkYXRlQ2h1bmsgPSAoZ2wsIHN0YXRlLCBwb3MpID0+IHtcbiAgICBjb25zdCBjaWQgPSBjaHVua0lkKHBvcyk7XG4gICAgY29uc3QgcmVuZGVyT2JqZWN0ID0gYnVpbGRDaHVuayhnbCwgc3RhdGUsIHBvcyk7XG4gICAgc3RhdGUgPSBhZGRDb21wb25lbnQoc3RhdGUsIGNpZCwgXCJyZW5kZXJPYmplY3RzXCIsIHJlbmRlck9iamVjdCk7XG4gICAgcmV0dXJuIHN0YXRlO1xufTtcbmV4cG9ydCBjb25zdCB1bmxvYWRDaHVuayA9IChzdGF0ZSwgcG9zKSA9PiB7XG4gICAgY29uc3QgZW50aXR5SWQgPSBjaHVua0lkKHBvcyk7XG4gICAgaWYgKCFzdGF0ZS5lbnRpdGllcy5oYXMoZW50aXR5SWQpKVxuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgcmV0dXJuIHJlbW92ZUVudGl0eShzdGF0ZSwgZW50aXR5SWQpO1xufTtcbi8qKiBFbmQgRVhQT1NFRCBDSFVOSyBGVU5DVElPTlMgKi9cbi8vIEZJWE1FOiBkb2Vzbid0IHNldCB0aGUgYmxvY2sgaWYgaXQncyBub3QgbG9hZGVkXG5leHBvcnQgY29uc3Qgc2V0QmxvY2sgPSAoc3RhdGUsIHBvcywgYmxvY2tJZCkgPT4ge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBjaHVua1NpemUgPSBzdGF0ZS5jaHVua0ZhY3RvcnkuY2h1bmtTaXplO1xuICAgIGNvbnN0IGJsb2NrUG9zID0gbmV3IFZlY3RvcjMoTWF0aC5mbG9vcihwb3NbMF0pLCBNYXRoLmZsb29yKHBvc1sxXSksIE1hdGguZmxvb3IocG9zWzJdKSk7XG4gICAgY29uc3QgbG9jYWxQb3MgPSBuZXcgVmVjdG9yMygoKGJsb2NrUG9zWzBdICUgY2h1bmtTaXplKSArIGNodW5rU2l6ZSkgJSBjaHVua1NpemUsICgoYmxvY2tQb3NbMV0gJSBjaHVua1NpemUpICsgY2h1bmtTaXplKSAlIGNodW5rU2l6ZSwgKChibG9ja1Bvc1syXSAlIGNodW5rU2l6ZSkgKyBjaHVua1NpemUpICUgY2h1bmtTaXplKTtcbiAgICBjb25zdCBjaHVua1BvcyA9IGNodW5rUG9zRnJvbUJsb2NrUG9zKHN0YXRlLmNodW5rRmFjdG9yeSwgYmxvY2tQb3MpO1xuICAgIGNvbnN0IGNodW5rRW50aXR5ID0gY2h1bmtJZChjaHVua1Bvcyk7XG4gICAgY29uc3Qgc3RydWN0dXJlID0gKF9hID0gc3RhdGUuY29tcG9uZW50c1tcInN0cnVjdHVyZXNcIl0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXQoY2h1bmtFbnRpdHkpO1xuICAgIC8vIGlmIHN0cnVjdHVyZSBleGlzdHMgc2V0IGJsb2NrIGFuZCByZXBsYWNlIGl0XG4gICAgaWYgKHN0cnVjdHVyZSkge1xuICAgICAgICBjb25zdCB0ID0gbmV3IEZsb2F0NjRBcnJheShzdHJ1Y3R1cmUpO1xuICAgICAgICB0W2xvY2FsQmxvY2tQb3NUb0luZGV4KHN0YXRlLmNodW5rRmFjdG9yeSwgbG9jYWxQb3NbMF0sIGxvY2FsUG9zWzFdLCBsb2NhbFBvc1syXSldID0gYmxvY2tJZDtcbiAgICAgICAgc3RhdGUgPSBhZGRDb21wb25lbnQoc3RhdGUsIGNodW5rRW50aXR5LCBcInN0cnVjdHVyZXNcIiwgc3RydWN0dXJlKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlO1xufTtcbi8vIEZJWE1FOiBkb2VzIG5vdCB3b3JrIGZvciBzb21lIHJlYXNvblxuZXhwb3J0IGNvbnN0IGdldEJsb2NrID0gKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgcG9zKSA9PiB7XG4gICAgY29uc3QgY2h1bmtTaXplID0gY2h1bmtGYWN0b3J5LmNodW5rU2l6ZTtcbiAgICBjb25zdCBibG9ja1BvcyA9IG5ldyBWZWN0b3IzKE1hdGguZmxvb3IocG9zWzBdKSwgTWF0aC5mbG9vcihwb3NbMV0pLCBNYXRoLmZsb29yKHBvc1syXSkpO1xuICAgIGNvbnN0IGxvY2FsUG9zID0gbmV3IFZlY3RvcjMoKChibG9ja1Bvc1swXSAlIGNodW5rU2l6ZSkgKyBjaHVua1NpemUpICUgY2h1bmtTaXplLCAoKGJsb2NrUG9zWzFdICUgY2h1bmtTaXplKSArIGNodW5rU2l6ZSkgJSBjaHVua1NpemUsICgoYmxvY2tQb3NbMl0gJSBjaHVua1NpemUpICsgY2h1bmtTaXplKSAlIGNodW5rU2l6ZSk7XG4gICAgY29uc3QgY2h1bmtQb3MgPSBjaHVua1Bvc0Zyb21CbG9ja1BvcyhjaHVua0ZhY3RvcnksIGJsb2NrUG9zKTtcbiAgICAvL2NvbnN0IGNodW5rRW50aXR5ID0gY2h1bmtJZChjaHVua1Bvcyk7XG4gICAgY29uc3QgY2h1bmtFbnRpdHkgPSBgY2h1LSR7Y2h1bmtQb3NbMF19LSR7Y2h1bmtQb3NbMV19LSR7Y2h1bmtQb3NbMl19YDtcbiAgICBjb25zdCBzdHJ1Y3R1cmUgPSBzdHJ1Y3R1cmVzLmdldChjaHVua0VudGl0eSk7XG4gICAgaWYgKHN0cnVjdHVyZSkge1xuICAgICAgICBjb25zdCB0ID0gbmV3IEZsb2F0NjRBcnJheShzdHJ1Y3R1cmUpO1xuICAgICAgICByZXR1cm4gdFtsb2NhbEJsb2NrUG9zVG9JbmRleChjaHVua0ZhY3RvcnksIGxvY2FsUG9zWzBdLCBsb2NhbFBvc1sxXSwgbG9jYWxQb3NbMl0pXTtcbiAgICB9XG4gICAgcmV0dXJuIGdlbmVyYXRlQmxvY2soY2h1bmtGYWN0b3J5LCBwb3MpO1xufTtcbi8vIHVzZWQgZm9yIHVwZGF0aW5nL21lc2hpbmdcbmNvbnN0IGJ1aWxkQ2h1bmsgPSAoZ2wsIHN0YXRlLCBwb3MpID0+IHtcbiAgICBjb25zdCBtZXNoID0gbmFpdmVNZXNoaW5nKHN0YXRlLmNodW5rRmFjdG9yeSwgc3RhdGUuY29tcG9uZW50c1tcInN0cnVjdHVyZXNcIl0sIHBvcyk7XG4gICAgY29uc3QgcmVuZGVyT2JqZWN0ID0gY3JlYXRlQ2h1bmtSZW5kZXJPYmplY3QoZ2wsIHN0YXRlLnByb2dyYW0sIHN0YXRlLmNodW5rRmFjdG9yeSwgcG9zLCBtZXNoKTtcbiAgICByZXR1cm4gcmVuZGVyT2JqZWN0O1xufTtcbiIsImltcG9ydCB7IFZlY3RvcjMsIE1hdHJpeDQgfSBmcm9tICdAbWF0aC5nbC9jb3JlJztcbmltcG9ydCB7IGdldEJsb2NrIH0gZnJvbSAnLi9jaHVuayc7XG5leHBvcnQgY29uc3QgY2h1bmtWZXJ0ZXhTaGFkZXIgPSBgI3ZlcnNpb24gMzAwIGVzXG4gIGluIHZlYzMgdl9Qb3NpdGlvbjtcbiAgaW4gdmVjMiB1dl9Db29yZHM7XG4gIGluIGZsb2F0IGFvX0Nvb3JkcztcblxuICB1bmlmb3JtIG1hdDQgcHJvamVjdGlvbjtcbiAgdW5pZm9ybSBtYXQ0IHZpZXc7XG4gIHVuaWZvcm0gbWF0NCBtb2RlbDtcbiAgXG4gIG91dCBmbG9hdCBhbztcbiAgb3V0IHZlYzIgdGV4dF9jb29yZHM7XG4gIFxuICB2b2lkIG1haW4oKSB7XG4gICAgXG4gICAgdGV4dF9jb29yZHMgPSB1dl9Db29yZHM7XG4gICAgYW8gPSBhb19Db29yZHM7XG4gICAgXG4gICAgZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uICogdmlldyAqIG1vZGVsICogdmVjNCh2X1Bvc2l0aW9uLCAxLjApO1xuICB9XG5gO1xuZXhwb3J0IGNvbnN0IGNodW5rRnJhZ21lbnRTaGFkZXIgPSBgI3ZlcnNpb24gMzAwIGVzXG4gIHByZWNpc2lvbiBoaWdocCBmbG9hdDtcbiAgXG4gIGluIHZlYzIgdGV4dF9jb29yZHM7XG4gIGluIGZsb2F0IGFvO1xuICBcbiAgdW5pZm9ybSBzYW1wbGVyMkQgdGV4dHVyZV9hdGxhcztcbiAgXG4gIG91dCB2ZWM0IGZyYWdfY29sb3I7XG5cbiAgdm9pZCBtYWluKCkge1xuICAgIFxuICAgIGZsb2F0IGFvSW50ZW5zaXR5ID0gYW8gLyAyLjA7XG4gICAgZmxvYXQgZGFya2VuQW1vdW50ID0gMS4wIC8gKGFvSW50ZW5zaXR5ICsgMS4wKTtcbiAgICBcbiAgICB2ZWM0IGF0bGFzID0gdGV4dHVyZSh0ZXh0dXJlX2F0bGFzLCB0ZXh0X2Nvb3Jkcyk7XG5cbiAgICBmcmFnX2NvbG9yID0gdmVjNChkYXJrZW5BbW91bnQgKiBhdGxhcy54eXosIGF0bGFzLncpO1xuICB9XG5gO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUNodW5rUmVuZGVyT2JqZWN0ID0gKGdsLCBwcm9ncmFtLCBjaHVua0ZhY3RvcnksIHBvcywgbWVzaCkgPT4ge1xuICAgIGNvbnN0IGNodW5rU2l6ZSA9IGNodW5rRmFjdG9yeS5jaHVua1NpemU7XG4gICAgY29uc3QgdmFvID0gZ2wuY3JlYXRlVmVydGV4QXJyYXkoKTtcbiAgICBjb25zdCB2Ym8gPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBpZiAoIXZhbylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIGNyZWF0aW5nIFZBT1wiKTtcbiAgICBpZiAoIXZibylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIGNyZWF0aW5nIFZCT1wiKTtcbiAgICBnbC5iaW5kVmVydGV4QXJyYXkodmFvKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdmJvKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbWVzaCwgZ2wuU1RBVElDX0RSQVcpO1xuICAgIGNvbnN0IHZlcnRleFNpemUgPSAzO1xuICAgIGNvbnN0IHV2U2l6ZSA9IDI7XG4gICAgY29uc3QgYW9TaXplID0gMTtcbiAgICBjb25zdCBzdHJpZGUgPSA0ICogKHZlcnRleFNpemUgKyB1dlNpemUgKyBhb1NpemUpO1xuICAgIGNvbnN0IHZlcnRleE9mZnNldCA9IDA7XG4gICAgY29uc3QgdXZPZmZzZXQgPSA0ICogMztcbiAgICBjb25zdCBhb09mZnNldCA9IDQgKiA1O1xuICAgIGNvbnN0IHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCAndl9Qb3NpdGlvbicpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIocG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbiwgdmVydGV4U2l6ZSwgZ2wuRkxPQVQsIGZhbHNlLCBzdHJpZGUsIHZlcnRleE9mZnNldCk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbik7XG4gICAgY29uc3QgdXZBdHRyaWJ1dGVMb2NhdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sICd1dl9Db29yZHMnKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHV2QXR0cmlidXRlTG9jYXRpb24sIHV2U2l6ZSwgZ2wuRkxPQVQsIGZhbHNlLCBzdHJpZGUsIHV2T2Zmc2V0KTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh1dkF0dHJpYnV0ZUxvY2F0aW9uKTtcbiAgICBjb25zdCBhb0F0dHJpYnV0ZUxvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgJ2FvX0Nvb3JkcycpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoYW9BdHRyaWJ1dGVMb2NhdGlvbiwgYW9TaXplLCBnbC5GTE9BVCwgZmFsc2UsIHN0cmlkZSwgYW9PZmZzZXQpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGFvQXR0cmlidXRlTG9jYXRpb24pO1xuICAgIGNvbnN0IGNvdW50ID0gbWVzaC5sZW5ndGggLyA2O1xuICAgIGNvbnN0IG1vZGVsID0gbmV3IE1hdHJpeDQoKTtcbiAgICBtb2RlbC5pZGVudGl0eSgpLnRyYW5zbGF0ZShbcG9zLnggKiBjaHVua1NpemUsIHBvcy55ICogY2h1bmtTaXplLCBwb3MueiAqIGNodW5rU2l6ZV0pO1xuICAgIHJldHVybiB7XG4gICAgICAgIGxvZDogMCxcbiAgICAgICAgdmFvLFxuICAgICAgICBwcm9ncmFtLFxuICAgICAgICBtb2RlbCxcbiAgICAgICAgdmVydGV4Q291bnQ6IGNvdW50LFxuICAgICAgICB3aXJlZnJhbWU6IGZhbHNlXG4gICAgfTtcbn07XG4vKlxuZXhwb3J0IGNvbnN0IHVwZGF0ZUNodW5rUmVuZGVyT2JqZWN0ID0gKGdsOiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0LCBwcm9ncmFtOiBXZWJHTFByb2dyYW0pID0+IChwcmV2aW91czogU3RhdGljUmVuZGVyT2JqZWN0Q29tcG9uZW50LCBtZXNoOiBGbG9hdDMyQXJyYXkpID0+IHtcblxuICBjb25zdCB7IHZhbywgdmJvLCBwcm9ncmFtLCBtb2RlbCwgY291bnQgfSA9IHByZXZpb3VzO1xuXG4gIGdsLmJpbmRWZXJ0ZXhBcnJheSh2YW8pO1xuXG4gIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2Ym8pO1xuICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbWVzaCwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gIHByZXZpb3VzLmNvdW50ID0gbWVzaC5sZW5ndGggLyA1O1xufTtcbiovXG5leHBvcnQgY29uc3Qgc3VtID0gKGEsIGIpID0+IHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoW2FbMF0gKyBiWzBdLCBhWzFdICsgYlsxXSwgYVsyXSArIGJbMl1dKTtcbn07XG5leHBvcnQgY29uc3QgY2FsY3VsYXRlQU8gPSAoc2lkZTEsIGNvcm5lcjEsIHNpZGUyLCBjb3JuZXIyLCBzaWRlMywgY29ybmVyMywgc2lkZTQsIGNvcm5lcjQpID0+IHtcbiAgICBsZXQgdjEgPSAoc2lkZTEgJiYgMSkgKyAoc2lkZTIgJiYgMSkgKyAoY29ybmVyMSAmJiAxKTtcbiAgICBsZXQgdjIgPSAoc2lkZTIgJiYgMSkgKyAoc2lkZTMgJiYgMSkgKyAoY29ybmVyMiAmJiAxKTtcbiAgICBsZXQgdjMgPSAoc2lkZTMgJiYgMSkgKyAoc2lkZTQgJiYgMSkgKyAoY29ybmVyMyAmJiAxKTtcbiAgICBsZXQgdjQgPSAoc2lkZTQgJiYgMSkgKyAoc2lkZTEgJiYgMSkgKyAoY29ybmVyNCAmJiAxKTtcbiAgICByZXR1cm4gW3YxLCB2MiwgdjMsIHY0XTtcbn07XG4vLyBwYXNzIGluIGFsbCB0aGUgYmxvY2sgZGF0YSBhbmQgdGhlbiByZXR1cm4gdGhlIHZlcnRleCBhcnJheVxuLy8gSW4gdGhlIGZ1dHVyZSBtYXkgaW1wbGVtZW50IGEgZ3JlZWR5IGFsZ29yaXRobSB0byBjdXQgZG93biBvblxuLy8gdmVydGV4IGNvdW50XG4vLyBUaGlzIHNldHMgdGhlIHZlcnRpY2VzL3RleHR1cmVzL2FtYmllbnQgb2NjbHVzaW9uXG5leHBvcnQgY29uc3QgbmFpdmVNZXNoaW5nID0gKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgcG9zKSA9PiB7XG4gICAgY29uc3Qgb3V0cHV0ID0gW107XG4gICAgLy9jb25zb2xlLmxvZyhzdHJ1Y3R1cmVzKTtcbiAgICBjb25zdCBjSWQgPSBgY2h1LSR7cG9zWzBdfS0ke3Bvc1sxXX0tJHtwb3NbMl19YDtcbiAgICAvL2NvbnNvbGUubG9nKGNJZCk7XG4gICAgY29uc3QgY2h1bmtTaXplID0gY2h1bmtGYWN0b3J5LmNodW5rU2l6ZTtcbiAgICBjb25zdCBibG9ja1N0cnVjdHVyZSA9IHN0cnVjdHVyZXMuZ2V0KGNJZCk7XG4gICAgaWYgKCFibG9ja1N0cnVjdHVyZSkge1xuICAgICAgICByZXR1cm4gbmV3IEZsb2F0MzJBcnJheSgpO1xuICAgIH1cbiAgICBjb25zdCBkaWN0ID0gY2h1bmtGYWN0b3J5LmJsb2NrRGljdGlvbmFyeTtcbiAgICBjb25zdCBzdGFydFBvcyA9IG5ldyBWZWN0b3IzKHBvc1swXSAqIGNodW5rU2l6ZSwgcG9zWzFdICogY2h1bmtTaXplLCBwb3NbMl0gKiBjaHVua1NpemUpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2h1bmtTaXplOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjaHVua1NpemU7IGorKykge1xuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBjaHVua1NpemU7IGsrKykge1xuICAgICAgICAgICAgICAgIC8vaWYoaSA9PSAwICYmIGogPT0gMCAmJiBrID09IDApXG4gICAgICAgICAgICAgICAgLy8gIGNvbnNvbGUubG9nKFwiRGlkIHdlIGdldCBoZXJlPyAxXCIpXG4gICAgICAgICAgICAgICAgY29uc3QgYmxvY2tQb3MgPSBzdW0oc3RhcnRQb3MsIChbaSwgaiwga10pKTtcbiAgICAgICAgICAgICAgICBpZiAoZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBibG9ja1BvcykgPT0gMClcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgaWYgKGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgYmxvY2tQb3MpID09IDApXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2NrSWQgPSBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIGJsb2NrUG9zKTtcbiAgICAgICAgICAgICAgICBjb25zdCBibG9jayA9IGRpY3RbYmxvY2tJZF07XG4gICAgICAgICAgICAgICAgaWYgKGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCAoWzEsIDAsIDBdKSkpID09IDApXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKC4uLmZ1bGxCbG9ja01lc2guZWFzdEZhY2UoaSwgaiwgaywgYmxvY2sudSwgYmxvY2sudiwgY2FsY3VsYXRlQU8oZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFsxLCAxLCAwXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMSwgMSwgMV0pKSwgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMSwgMCwgMV0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzEsIC0xLCAxXSkpLCAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFsxLCAtMSwgMF0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzEsIC0xLCAtMV0pKSwgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMSwgMCwgLTFdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFsxLCAxLCAtMV0pKSAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgKSkpO1xuICAgICAgICAgICAgICAgIGlmIChnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgKFstMSwgMCwgMF0pKSkgPT0gMClcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goLi4uZnVsbEJsb2NrTWVzaC53ZXN0RmFjZShpLCBqLCBrLCBibG9jay51LCBibG9jay52LCBjYWxjdWxhdGVBTyhnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWy0xLCAxLCAwXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbLTEsIDEsIDFdKSksIC8vIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWy0xLCAwLCAxXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbLTEsIC0xLCAxXSkpLCAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFstMSwgLTEsIDBdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFstMSwgLTEsIC0xXSkpLCAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFstMSwgMCwgLTFdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFstMSwgMSwgLTFdKSkgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgICkpKTtcbiAgICAgICAgICAgICAgICBpZiAoZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIChbMCwgMSwgMF0pKSkgPT0gMClcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goLi4uZnVsbEJsb2NrTWVzaC50b3BGYWNlKGksIGosIGssIGJsb2NrLnUsIGJsb2NrLnYsIGNhbGN1bGF0ZUFPKGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMSwgMSwgMF0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzEsIDEsIDFdKSksIC8vIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzAsIDEsIDFdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFstMSwgMSwgMV0pKSwgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbLTEsIDEsIDBdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFstMSwgMSwgLTFdKSksIC8vIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzAsIDEsIC0xXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMSwgMSwgLTFdKSkgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgICkpKTtcbiAgICAgICAgICAgICAgICBpZiAoZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIChbMCwgLTEsIDBdKSkpID09IDApXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKC4uLmZ1bGxCbG9ja01lc2guYm90dG9tRmFjZShpLCBqLCBrLCBibG9jay51LCBibG9jay52LCBjYWxjdWxhdGVBTyhnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzEsIC0xLCAwXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMSwgLTEsIDFdKSksIC8vIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzAsIC0xLCAxXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbLTEsIC0xLCAxXSkpLCAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFstMSwgLTEsIDBdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFstMSwgLTEsIC0xXSkpLCAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFswLCAtMSwgLTFdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFsxLCAtMSwgLTFdKSkgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgICkpKTtcbiAgICAgICAgICAgICAgICBpZiAoZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIChbMCwgMCwgMV0pKSkgPT0gMClcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goLi4uZnVsbEJsb2NrTWVzaC5ub3J0aEZhY2UoaSwgaiwgaywgYmxvY2sudSwgYmxvY2sudiwgY2FsY3VsYXRlQU8oZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFsxLCAwLCAxXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMSwgMSwgMV0pKSwgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMCwgMSwgMV0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWy0xLCAxLCAxXSkpLCAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFstMSwgMCwgMV0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWy0xLCAtMSwgMV0pKSwgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMCwgLTEsIDFdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFsxLCAtMSwgMV0pKSAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgKSkpO1xuICAgICAgICAgICAgICAgIGlmIChnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgKFswLCAwLCAtMV0pKSkgPT0gMClcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goLi4uZnVsbEJsb2NrTWVzaC5zb3V0aEZhY2UoaSwgaiwgaywgYmxvY2sudSwgYmxvY2sudiwgY2FsY3VsYXRlQU8oZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFsxLCAwLCAtMV0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzEsIDEsIC0xXSkpLCAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFswLCAxLCAtMV0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWy0xLCAxLCAtMV0pKSwgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbLTEsIDAsIC0xXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbLTEsIC0xLCAtMV0pKSwgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMCwgLTEsIC0xXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMSwgLTEsIC0xXSkpIC8vIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICApKSk7XG4gICAgICAgICAgICAgICAgLy8gc2tpcCBvdmVyIHNwZWNpYWwgYmxvY2tzIGZvciBub3dcbiAgICAgICAgICAgICAgICAvLyBpZihibG9jay50eXBlICE9ICdmdWxsQmxvY2snIHx8IGJsb2NrLnR5cGUgPT0gJ25vbmUnKVxuICAgICAgICAgICAgICAgIC8vICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvL2NvbnNvbGUubG9nKFwiSW4gbWVzaGluZ1wiKTtcbiAgICAvL2NvbnNvbGUubG9nKG91dHB1dCk7XG4gICAgcmV0dXJuIG5ldyBGbG9hdDMyQXJyYXkob3V0cHV0KTtcbn07XG4vLyB0ZXh0dXJlIG9mZnNldHMgc28gdGhhdCB0aGVyZSBhcmUgbm8gYm9yZGVycyBmcm9tIGhvdyBzYW1wbGluZyB0aGUgdGV4dHVyZVxuY29uc3QgdGV4dHVyZVdpZHRoT2Zmc2V0ID0gMC4wNjI1O1xuY29uc3QgdGV4dHVyZVdpZHRoU3RhcnQgPSAwLjAwO1xuLy8gVE9ETzogcmVwbGFjZSB0ZXh0dXJlV2lkdGhPZmZzZXQgd2l0aCB0ZXhlbCBkaW1lbnNpb25zXG5leHBvcnQgY29uc3QgZnVsbEJsb2NrTWVzaCA9IHtcbiAgICBzb3V0aEZhY2U6ICh4LCB5LCB6LCB1LCB2LCBhbykgPT4gKFtcbiAgICAgICAgMC4wICsgeCwgMC4wICsgeSwgMC4wICsgeiwgdSArIHRleHR1cmVXaWR0aFN0YXJ0LCB2ICsgdGV4dHVyZVdpZHRoU3RhcnQsIGFvWzJdLFxuICAgICAgICAxLjAgKyB4LCAxLjAgKyB5LCAwLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCB2ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCBhb1swXSxcbiAgICAgICAgMS4wICsgeCwgMC4wICsgeSwgMC4wICsgeiwgdSArIHRleHR1cmVXaWR0aE9mZnNldCwgdiArIHRleHR1cmVXaWR0aFN0YXJ0LCBhb1szXSxcbiAgICAgICAgMC4wICsgeCwgMC4wICsgeSwgMC4wICsgeiwgdSArIHRleHR1cmVXaWR0aFN0YXJ0LCB2ICsgdGV4dHVyZVdpZHRoU3RhcnQsIGFvWzJdLFxuICAgICAgICAwLjAgKyB4LCAxLjAgKyB5LCAwLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoU3RhcnQsIHYgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIGFvWzFdLFxuICAgICAgICAxLjAgKyB4LCAxLjAgKyB5LCAwLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCB2ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCBhb1swXVxuICAgIF0pLFxuICAgIG5vcnRoRmFjZTogKHgsIHksIHosIHUsIHYsIGFvKSA9PiAoW1xuICAgICAgICAwLjAgKyB4LCAwLjAgKyB5LCAxLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoU3RhcnQsIHYgKyB0ZXh0dXJlV2lkdGhTdGFydCwgYW9bMl0sXG4gICAgICAgIDEuMCArIHgsIDAuMCArIHksIDEuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhTdGFydCwgdiArIHRleHR1cmVXaWR0aE9mZnNldCwgYW9bM10sXG4gICAgICAgIDEuMCArIHgsIDEuMCArIHksIDEuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIHYgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIGFvWzBdLFxuICAgICAgICAwLjAgKyB4LCAwLjAgKyB5LCAxLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoU3RhcnQsIHYgKyB0ZXh0dXJlV2lkdGhTdGFydCwgYW9bMl0sXG4gICAgICAgIDEuMCArIHgsIDEuMCArIHksIDEuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIHYgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIGFvWzBdLFxuICAgICAgICAwLjAgKyB4LCAxLjAgKyB5LCAxLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoU3RhcnQsIHYgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIGFvWzFdXG4gICAgXSksXG4gICAgd2VzdEZhY2U6ICh4LCB5LCB6LCB1LCB2LCBhbykgPT4gKFtcbiAgICAgICAgMC4wICsgeCwgMC4wICsgeSwgMC4wICsgeiwgdSArIHRleHR1cmVXaWR0aFN0YXJ0LCB2ICsgdGV4dHVyZVdpZHRoU3RhcnQsIGFvWzJdLFxuICAgICAgICAwLjAgKyB4LCAwLjAgKyB5LCAxLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoU3RhcnQsIHYgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIGFvWzFdLFxuICAgICAgICAwLjAgKyB4LCAxLjAgKyB5LCAxLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCB2ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCBhb1swXSxcbiAgICAgICAgMC4wICsgeCwgMC4wICsgeSwgMC4wICsgeiwgdSArIHRleHR1cmVXaWR0aFN0YXJ0LCB2ICsgdGV4dHVyZVdpZHRoU3RhcnQsIGFvWzJdLFxuICAgICAgICAwLjAgKyB4LCAxLjAgKyB5LCAxLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCB2ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCBhb1swXSxcbiAgICAgICAgMC4wICsgeCwgMS4wICsgeSwgMC4wICsgeiwgdSArIHRleHR1cmVXaWR0aE9mZnNldCwgdiArIHRleHR1cmVXaWR0aFN0YXJ0LCBhb1szXVxuICAgIF0pLFxuICAgIGVhc3RGYWNlOiAoeCwgeSwgeiwgdSwgdiwgYW8pID0+IChbXG4gICAgICAgIDEuMCArIHgsIDAuMCArIHksIDAuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhTdGFydCwgdiArIHRleHR1cmVXaWR0aFN0YXJ0LCBhb1syXSxcbiAgICAgICAgMS4wICsgeCwgMS4wICsgeSwgMC4wICsgeiwgdSArIHRleHR1cmVXaWR0aE9mZnNldCwgdiArIHRleHR1cmVXaWR0aFN0YXJ0LCBhb1szXSxcbiAgICAgICAgMS4wICsgeCwgMS4wICsgeSwgMS4wICsgeiwgdSArIHRleHR1cmVXaWR0aE9mZnNldCwgdiArIHRleHR1cmVXaWR0aE9mZnNldCwgYW9bMF0sXG4gICAgICAgIDEuMCArIHgsIDAuMCArIHksIDAuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhTdGFydCwgdiArIHRleHR1cmVXaWR0aFN0YXJ0LCBhb1syXSxcbiAgICAgICAgMS4wICsgeCwgMS4wICsgeSwgMS4wICsgeiwgdSArIHRleHR1cmVXaWR0aE9mZnNldCwgdiArIHRleHR1cmVXaWR0aE9mZnNldCwgYW9bMF0sXG4gICAgICAgIDEuMCArIHgsIDAuMCArIHksIDEuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhTdGFydCwgdiArIHRleHR1cmVXaWR0aE9mZnNldCwgYW9bMV1cbiAgICBdKSxcbiAgICB0b3BGYWNlOiAoeCwgeSwgeiwgdSwgdiwgYW8pID0+IChbXG4gICAgICAgIDAuMCArIHgsIDEuMCArIHksIDAuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhTdGFydCwgdiArIHRleHR1cmVXaWR0aFN0YXJ0LCBhb1syXSxcbiAgICAgICAgMS4wICsgeCwgMS4wICsgeSwgMS4wICsgeiwgdSArIHRleHR1cmVXaWR0aE9mZnNldCwgdiArIHRleHR1cmVXaWR0aE9mZnNldCwgYW9bMF0sXG4gICAgICAgIDEuMCArIHgsIDEuMCArIHksIDAuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIHYgKyB0ZXh0dXJlV2lkdGhTdGFydCwgYW9bM10sXG4gICAgICAgIDAuMCArIHgsIDEuMCArIHksIDAuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhTdGFydCwgdiArIHRleHR1cmVXaWR0aFN0YXJ0LCBhb1syXSxcbiAgICAgICAgMC4wICsgeCwgMS4wICsgeSwgMS4wICsgeiwgdSArIHRleHR1cmVXaWR0aFN0YXJ0LCB2ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCBhb1sxXSxcbiAgICAgICAgMS4wICsgeCwgMS4wICsgeSwgMS4wICsgeiwgdSArIHRleHR1cmVXaWR0aE9mZnNldCwgdiArIHRleHR1cmVXaWR0aE9mZnNldCwgYW9bMF0gLy8gYW9bM11cbiAgICBdKSxcbiAgICBib3R0b21GYWNlOiAoeCwgeSwgeiwgdSwgdiwgYW8pID0+IChbXG4gICAgICAgIDAuMCArIHgsIDAuMCArIHksIDAuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhTdGFydCwgdiArIHRleHR1cmVXaWR0aFN0YXJ0LCBhb1syXSxcbiAgICAgICAgMS4wICsgeCwgMC4wICsgeSwgMC4wICsgeiwgdSArIHRleHR1cmVXaWR0aE9mZnNldCwgdiArIHRleHR1cmVXaWR0aFN0YXJ0LCBhb1szXSxcbiAgICAgICAgMS4wICsgeCwgMC4wICsgeSwgMS4wICsgeiwgdSArIHRleHR1cmVXaWR0aE9mZnNldCwgdiArIHRleHR1cmVXaWR0aE9mZnNldCwgYW9bMF0sXG4gICAgICAgIDAuMCArIHgsIDAuMCArIHksIDAuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhTdGFydCwgdiArIHRleHR1cmVXaWR0aFN0YXJ0LCBhb1syXSxcbiAgICAgICAgMS4wICsgeCwgMC4wICsgeSwgMS4wICsgeiwgdSArIHRleHR1cmVXaWR0aE9mZnNldCwgdiArIHRleHR1cmVXaWR0aE9mZnNldCwgYW9bMF0sXG4gICAgICAgIDAuMCArIHgsIDAuMCArIHksIDEuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhTdGFydCwgdiArIHRleHR1cmVXaWR0aE9mZnNldCwgYW9bMV1cbiAgICBdKSxcbn07XG4iLCJpbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSBcIkBtYXRoLmdsL2NvcmVcIjtcbmltcG9ydCB7IGNodW5rSWQsIGxvY2FsQmxvY2tQb3NUb0luZGV4IH0gZnJvbSBcIi4vY2h1bmsvY2h1bmtcIjtcbi8vIGNvcHkgc29tZSBub2lzZSBjb2RlXG5leHBvcnQgY29uc3Qgbm9pc2UgPSAoeCwgeSkgPT4ge1xuICAgIHJldHVybiAwLjU7XG59O1xuZXhwb3J0IGNvbnN0IGdlbmVyYXRlQmxvY2sgPSAoY2h1bmtGYWN0b3J5LCBwb3MpID0+IHtcbiAgICBjb25zdCBjaHVua1NpemUgPSBjaHVua0ZhY3RvcnkuY2h1bmtTaXplO1xuICAgIGNvbnN0IGJhc2VIZWlnaHQgPSBjaHVua1NpemUgLyAyO1xuICAgIGNvbnN0IHdhdmVsZW5ndGggPSBjaHVua1NpemUgKiAyO1xuICAgIGNvbnN0IGhlaWdodCA9IGNodW5rU2l6ZSAvIDQ7XG4gICAgLy8gY2hlY2sgZm9yIGFscmVhZHkgbG9hZGVkIGNodW5rc1xuICAgIGNvbnN0IGggPSBiYXNlSGVpZ2h0ICsgaGVpZ2h0ICogbm9pc2UocG9zWzBdIC8gd2F2ZWxlbmd0aCwgcG9zWzJdIC8gd2F2ZWxlbmd0aCk7XG4gICAgaWYgKHBvc1sxXSA8IDApXG4gICAgICAgIHJldHVybiAxO1xuICAgIGlmIChwb3NbMV0gPCBoIHx8IHBvc1sxXSA+IDIgKiBoKVxuICAgICAgICByZXR1cm4gMjtcbiAgICByZXR1cm4gMDtcbn07XG5leHBvcnQgY29uc3QgZ2VuZXJhdGVTdHJ1Y3R1cmUgPSAoY2h1bmtGYWN0b3J5LCBwb3MpID0+IHtcbiAgICBjb25zdCBvdXRwdXQgPSBuZXcgU2hhcmVkQXJyYXlCdWZmZXIoOCAqIChNYXRoLnBvdyhjaHVua0ZhY3RvcnkuY2h1bmtTaXplLCAzKSkpO1xuICAgIGNvbnN0IHQgPSBuZXcgRmxvYXQ2NEFycmF5KG91dHB1dCk7XG4gICAgY29uc3QgZW50aXR5SWQgPSBjaHVua0lkKHBvcyk7XG4gICAgY29uc3QgY2h1bmtTaXplID0gY2h1bmtGYWN0b3J5LmNodW5rU2l6ZTtcbiAgICBjb25zdCBibG9ja1BvcyA9IG5ldyBWZWN0b3IzKHBvc1swXSAqIGNodW5rU2l6ZSwgcG9zWzFdICogY2h1bmtTaXplLCBwb3NbMl0gKiBjaHVua1NpemUpO1xuICAgIC8vIHNldCB0aGUgYmxvY2tzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaHVua1NpemU7IGkrKykgeyAvLyB4XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY2h1bmtTaXplOyBqKyspIHsgLy8geVxuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBjaHVua1NpemU7IGsrKykgeyAvLyB6XG4gICAgICAgICAgICAgICAgY29uc3QgZ3ggPSBibG9ja1Bvc1swXSArIGk7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3kgPSBibG9ja1Bvc1sxXSArIGo7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3ogPSBibG9ja1Bvc1syXSArIGs7XG4gICAgICAgICAgICAgICAgY29uc3QgbCA9IGxvY2FsQmxvY2tQb3NUb0luZGV4KGNodW5rRmFjdG9yeSwgaSwgaiwgayk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhsKTtcbiAgICAgICAgICAgICAgICB0W2xdID0gZ2VuZXJhdGVCbG9jayhjaHVua0ZhY3RvcnksIG5ldyBWZWN0b3IzKGd4LCBneSwgZ3opKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xufTtcbiIsImltcG9ydCB7IGFkZFN5c3RlbSB9IGZyb20gJy4uL2VuZ2luZS9zdGF0ZSc7XG5pbXBvcnQgeyBjcmVhdGVFQ1N0YXRlLCByZWdpc3RlckNvbXBvbmVudCB9IGZyb20gJy4uL2VuZ2luZS9lYyc7XG5pbXBvcnQgeyBibG9ja0lucHV0LCBjYW1lcmFJbnB1dCwgY2hlY2tDaHVua0NoYW5nZSwgcmVuZGVyU2VsZWN0aW9uQm94IH0gZnJvbSAnLi9zeXN0ZW1zL2lucHV0JztcbmltcG9ydCB7IGxvYWRDaHVua3MsIHVubG9hZENodW5rcyB9IGZyb20gJy4vc3lzdGVtcy93b3JsZCc7XG5pbXBvcnQgeyByZW5kZXJDaHVua3MgfSBmcm9tICcuL3N5c3RlbXMvY2h1bmsnO1xuaW1wb3J0IHsgY3JlYXRlUGxheWVyIH0gZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHsgQ2h1bmtGYWN0b3J5IH0gZnJvbSAnLi9jaHVuay9jaHVuayc7XG5pbXBvcnQgeyBjaHVua1ZlcnRleFNoYWRlciwgY2h1bmtGcmFnbWVudFNoYWRlciB9IGZyb20gJy4vY2h1bmsvbWVzaCc7XG5pbXBvcnQgeyBpbml0U2hhZGVycyB9IGZyb20gJy4vcmVuZGVyJztcbmltcG9ydCB7IGxvYWRUZXh0dXJlIH0gZnJvbSAnLi9yZW5kZXInO1xuO1xuZXhwb3J0IGNvbnN0IGluaXQgPSAoZ2wpID0+IHtcbiAgICBsZXQgc3RhdGUgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGNyZWF0ZUVDU3RhdGUoZ2wpKSwgeyBwbGF5ZXI6IGNyZWF0ZVBsYXllcihnbCksIGNodW5rRmFjdG9yeTogQ2h1bmtGYWN0b3J5KGdsKSwgYmxvY2tEaWN0aW9uYXJ5OiBjcmVhdGVCbG9ja0RpY3Rpb25hcnkoKSwgYXRsYXM6IGxvYWRUZXh0dXJlKGdsLCBcImF0bGFzLnBuZ1wiKSwgcHJvZ3JhbTogaW5pdFNoYWRlcnMoZ2wsIGNodW5rVmVydGV4U2hhZGVyLCBjaHVua0ZyYWdtZW50U2hhZGVyKSB9KTtcbiAgICBzdGF0ZS5jb21wb25lbnRzID0gcmVnaXN0ZXJDb21wb25lbnQoc3RhdGUuY29tcG9uZW50cywgXCJyZW5kZXJPYmplY3RzXCIpO1xuICAgIHN0YXRlLmNvbXBvbmVudHMgPSByZWdpc3RlckNvbXBvbmVudChzdGF0ZS5jb21wb25lbnRzLCBcInN0cnVjdHVyZXNcIik7XG4gICAgc3RhdGUuY29tcG9uZW50cyA9IHJlZ2lzdGVyQ29tcG9uZW50KHN0YXRlLmNvbXBvbmVudHMsIFwiY2h1bmtQb3NcIik7XG4gICAgLy8gc3lzdGVtc1xuICAgIHN0YXRlID0gYWRkU3lzdGVtKHN0YXRlLCBcInBsYXllckNoYW5nZUNodW5rXCIsIHVubG9hZENodW5rcyk7XG4gICAgc3RhdGUgPSBhZGRTeXN0ZW0oc3RhdGUsIFwicGxheWVyQ2hhbmdlQ2h1bmtcIiwgbG9hZENodW5rcyk7XG4gICAgc3RhdGUgPSBhZGRTeXN0ZW0oc3RhdGUsIFwiaW5wdXRcIiwgY2FtZXJhSW5wdXQpO1xuICAgIHN0YXRlID0gYWRkU3lzdGVtKHN0YXRlLCBcImlucHV0XCIsIGNoZWNrQ2h1bmtDaGFuZ2UpO1xuICAgIHN0YXRlID0gYWRkU3lzdGVtKHN0YXRlLCBcImNsaWNrXCIsIGJsb2NrSW5wdXQpO1xuICAgIHN0YXRlID0gYWRkU3lzdGVtKHN0YXRlLCBcInJlbmRlclwiLCByZW5kZXJTZWxlY3Rpb25Cb3gpO1xuICAgIHN0YXRlID0gYWRkU3lzdGVtKHN0YXRlLCBcInJlbmRlclwiLCByZW5kZXJDaHVua3MpO1xuICAgIHJldHVybiBzdGF0ZTtcbn07XG5leHBvcnQgY29uc3QgY3JlYXRlQmxvY2tEaWN0aW9uYXJ5ID0gKCkgPT4gKFtcbiAgICB7XG4gICAgICAgIG5hbWU6ICdhaXInLFxuICAgICAgICB0eXBlOiAnYWlyJyxcbiAgICAgICAgdTogMCxcbiAgICAgICAgdjogMFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZGlydCcsXG4gICAgICAgIHR5cGU6ICdmdWxsQmxvY2snLFxuICAgICAgICB1OiAwLjEyNSxcbiAgICAgICAgdjogMFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZ3Jhc3MnLFxuICAgICAgICB0eXBlOiAnZnVsbEJsb2NrJyxcbiAgICAgICAgdTogMC4wLFxuICAgICAgICB2OiAwXG4gICAgfSxcbl0pO1xuIiwiaW1wb3J0IHsgZ2V0QmxvY2sgfSBmcm9tIFwiLi9jaHVuay9jaHVua1wiO1xuaW1wb3J0IHsgTWF0cml4NCwgVmVjdG9yMyB9IGZyb20gXCJAbWF0aC5nbC9jb3JlXCI7XG5pbXBvcnQgeyBjcmVhdGVDYW1lcmEgfSBmcm9tICcuLi9lbmdpbmUvZnJlZUNhbWVyYSc7XG5pbXBvcnQgeyBpbml0U2hhZGVycyB9IGZyb20gXCIuL3JlbmRlclwiO1xuO1xuO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVBsYXllciA9IChnbCkgPT4ge1xuICAgIGNvbnN0IGNhbWVyYSA9IGNyZWF0ZUNhbWVyYShnbCk7XG4gICAgY2FtZXJhLnBvc2l0aW9uID0gbmV3IFZlY3RvcjMoMCwgMTAsIDApO1xuICAgIHJldHVybiAoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHsgcmF5U3RlcDogMC4xLCByYXlNYXhMZW5ndGg6IDUgfSwgY2FtZXJhKSwgeyBzZWxlY3Rpb25Cb3g6IGNyZWF0ZVNlbGVjdGlvbkJveChnbCksIHByZXZpb3VzUG9zaXRpb246IG5ldyBWZWN0b3IzKC0xLCAtMSwgLTEpIH0pKTtcbn07XG47XG5jb25zdCBjcmVhdGVTZWxlY3Rpb25Cb3ggPSAoZ2wpID0+IHtcbiAgICBjb25zdCBwcm9ncmFtID0gaW5pdFNoYWRlcnMoZ2wsIGJveFZlcnRleFNoYWRlciwgYm94RnJhZ21lbnRTaGFkZXIpO1xuICAgIGNvbnN0IG1lc2ggPSBuZXcgRmxvYXQzMkFycmF5KFtcbiAgICAgICAgMC4wLCAwLjAsIDAuMCxcbiAgICAgICAgMC4wLCAxLjAsIDAuMCxcbiAgICAgICAgMC4wLCAwLjAsIDAuMCxcbiAgICAgICAgMS4wLCAwLjAsIDAuMCxcbiAgICAgICAgMC4wLCAwLjAsIDAuMCxcbiAgICAgICAgMC4wLCAwLjAsIDEuMCxcbiAgICAgICAgMS4wLCAxLjAsIDEuMCxcbiAgICAgICAgMC4wLCAxLjAsIDEuMCxcbiAgICAgICAgMS4wLCAxLjAsIDEuMCxcbiAgICAgICAgMS4wLCAwLjAsIDEuMCxcbiAgICAgICAgMS4wLCAxLjAsIDEuMCxcbiAgICAgICAgMS4wLCAxLjAsIDAuMCxcbiAgICAgICAgMC4wLCAxLjAsIDAuMCxcbiAgICAgICAgMC4wLCAxLjAsIDEuMCxcbiAgICAgICAgMS4wLCAwLjAsIDAuMCxcbiAgICAgICAgMS4wLCAwLjAsIDEuMCxcbiAgICAgICAgMC4wLCAwLjAsIDEuMCxcbiAgICAgICAgMS4wLCAwLjAsIDEuMCxcbiAgICAgICAgMC4wLCAxLjAsIDAuMCxcbiAgICAgICAgMS4wLCAxLjAsIDAuMCxcbiAgICAgICAgMS4wLCAwLjAsIDAuMCxcbiAgICAgICAgMS4wLCAxLjAsIDAuMCxcbiAgICAgICAgMC4wLCAwLjAsIDEuMCxcbiAgICAgICAgMC4wLCAxLjAsIDEuMCxcbiAgICBdKTtcbiAgICBjb25zdCB2YW8gPSBnbC5jcmVhdGVWZXJ0ZXhBcnJheSgpO1xuICAgIGNvbnN0IHZibyA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGlmICghdmFvKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgY3JlYXRpbmcgVkFPXCIpO1xuICAgIGlmICghdmJvKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgY3JlYXRpbmcgVkJPXCIpO1xuICAgIGdsLmJpbmRWZXJ0ZXhBcnJheSh2YW8pO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2Ym8pO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBtZXNoLCBnbC5TVEFUSUNfRFJBVyk7XG4gICAgY29uc3QgdmVydGV4U2l6ZSA9IDM7XG4gICAgY29uc3Qgc3RyaWRlID0gNCAqIDM7XG4gICAgY29uc3QgdmVydGV4T2Zmc2V0ID0gMDtcbiAgICBjb25zdCBwb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgJ3ZfUG9zaXRpb24nKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24sIHZlcnRleFNpemUsIGdsLkZMT0FULCBmYWxzZSwgc3RyaWRlLCB2ZXJ0ZXhPZmZzZXQpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24pO1xuICAgIGNvbnN0IHZlcnRleENvdW50ID0gbWVzaC5sZW5ndGggLyAzO1xuICAgIGNvbnN0IG1vZGVsID0gKG5ldyBNYXRyaXg0KCkpLmlkZW50aXR5KCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcHJvZ3JhbSxcbiAgICAgICAgdmFvLFxuICAgICAgICB2ZXJ0ZXhDb3VudCxcbiAgICAgICAgbW9kZWxcbiAgICB9O1xufTtcbmV4cG9ydCBjb25zdCBkcmF3U2VsZWN0aW9uQm94ID0gKGdsLCBzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IHsgcHJvZ3JhbSwgdmFvLCB2ZXJ0ZXhDb3VudCwgbW9kZWw6IG1vZGVsTWF0cml4IH0gPSBzdGF0ZS5wbGF5ZXIuc2VsZWN0aW9uQm94O1xuICAgIGNvbnN0IHsgcHJvamVjdGlvbjogcHJvamVjdGlvbk1hdHJpeCwgdmlldzogdmlld01hdHJpeCB9ID0gc3RhdGUucGxheWVyO1xuICAgIGdsLnVzZVByb2dyYW0ocHJvZ3JhbSk7XG4gICAgY29uc3QgcHJvamVjdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBcInByb2plY3Rpb25cIik7XG4gICAgY29uc3QgdmlldyA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBcInZpZXdcIik7XG4gICAgY29uc3QgbW9kZWwgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgXCJtb2RlbFwiKTtcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KHByb2plY3Rpb24sIGZhbHNlLCBwcm9qZWN0aW9uTWF0cml4KTtcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KHZpZXcsIGZhbHNlLCB2aWV3TWF0cml4KTtcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KG1vZGVsLCBmYWxzZSwgbW9kZWxNYXRyaXgpO1xuICAgIGdsLmJpbmRWZXJ0ZXhBcnJheSh2YW8pO1xuICAgIGdsLmRyYXdBcnJheXMoZ2wuTElORVMsIDAsIHZlcnRleENvdW50KTtcbiAgICByZXR1cm4gc3RhdGU7XG59O1xuZXhwb3J0IGNvbnN0IHJheUNhc3QgPSAoZ2wsIHN0YXRlLCBwb3MsIGRpciwgcmF5U3RlcCwgcmF5TWF4TGVuZ3RoKSA9PiB7XG4gICAgbGV0IHJheSA9IG5ldyBWZWN0b3IzKHBvcy54LCBwb3MueSwgcG9zLnopO1xuICAgIGNvbnN0IHN0ZXAgPSBuZXcgVmVjdG9yMyhyYXlTdGVwICogZGlyLngsIHJheVN0ZXAgKiBkaXIueSwgcmF5U3RlcCAqIGRpci56KTtcbiAgICBjb25zdCBudW1TdGVwcyA9IHJheU1heExlbmd0aCAvIHJheVN0ZXA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1TdGVwczsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzID0gbmV3IFZlY3RvcjMocmF5LngsIHJheS55LCByYXkueik7XG4gICAgICAgIHJheS54ICs9IHN0ZXBbMF07XG4gICAgICAgIGlmIChnZXRCbG9jayhzdGF0ZS5jaHVua0ZhY3RvcnksIHN0YXRlLmNvbXBvbmVudHNbXCJzdHJ1Y3R1cmVzXCJdLCByYXkpICE9IDApXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiByYXksXG4gICAgICAgICAgICAgICAgcHJldmlvdXM6IHByZXZpb3VzLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgcHJldmlvdXMueCArPSBzdGVwWzBdO1xuICAgICAgICByYXkueSArPSBzdGVwWzFdO1xuICAgICAgICBpZiAoZ2V0QmxvY2soc3RhdGUuY2h1bmtGYWN0b3J5LCBzdGF0ZS5jb21wb25lbnRzW1wic3RydWN0dXJlc1wiXSwgcmF5KSAhPSAwKVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogcmF5LFxuICAgICAgICAgICAgICAgIHByZXZpb3VzOiBwcmV2aW91cyxcbiAgICAgICAgICAgIH07XG4gICAgICAgIHByZXZpb3VzLnkgKz0gc3RlcFsxXTtcbiAgICAgICAgcmF5LnogKz0gc3RlcFsyXTtcbiAgICAgICAgaWYgKGdldEJsb2NrKHN0YXRlLmNodW5rRmFjdG9yeSwgc3RhdGUuY29tcG9uZW50c1tcInN0cnVjdHVyZXNcIl0sIHJheSkgIT0gMClcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHJheSxcbiAgICAgICAgICAgICAgICBwcmV2aW91czogcHJldmlvdXMsXG4gICAgICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5jb25zdCBib3hWZXJ0ZXhTaGFkZXIgPSBgI3ZlcnNpb24gMzAwIGVzXG4gIGluIHZlYzMgdl9Qb3NpdGlvbjtcblxuICB1bmlmb3JtIG1hdDQgcHJvamVjdGlvbjtcbiAgdW5pZm9ybSBtYXQ0IHZpZXc7XG4gIHVuaWZvcm0gbWF0NCBtb2RlbDtcbiAgXG4gIHZvaWQgbWFpbigpIHtcbiAgICBcbiAgICBnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb24gKiB2aWV3ICogbW9kZWwgKiB2ZWM0KHZfUG9zaXRpb24sIDEuMCk7XG4gIH1cbmA7XG5jb25zdCBib3hGcmFnbWVudFNoYWRlciA9IGAjdmVyc2lvbiAzMDAgZXNcbiAgcHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xuICBcbiAgb3V0IHZlYzQgZnJhZ19jb2xvcjtcblxuICB2b2lkIG1haW4oKSB7XG4gICAgZnJhZ19jb2xvciA9IHZlYzQoMC4wLCAwLjAsIDAuMCwgMS4wKTtcbiAgfVxuYDtcbiIsImV4cG9ydCBjb25zdCBpbml0U2hhZGVycyA9IChnbCwgdnNoYWRlciwgZnNoYWRlcikgPT4ge1xuICAgIGNvbnN0IHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgaWYgKCFwcm9ncmFtKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXZWJHTCBmYWlsZWQgdG8gY3JlYXRlIHByb2dyYW1cIik7XG4gICAgY29uc3QgdmVydGV4ID0gY29tcGlsZVNoYWRlcihnbCwgdnNoYWRlciwgZ2wuVkVSVEVYX1NIQURFUik7XG4gICAgY29uc3QgZnJhZ21lbnQgPSBjb21waWxlU2hhZGVyKGdsLCBmc2hhZGVyLCBnbC5GUkFHTUVOVF9TSEFERVIpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCB2ZXJ0ZXgpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCBmcmFnbWVudCk7XG4gICAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XG4gICAgY29uc3Qgc3VjY2VzcyA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpO1xuICAgIGlmICghc3VjY2VzcylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicHJvZ3JhbSBmYWlsZWQgdG8gbGluazpcIik7IC8vICsgZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cgKHByb2dyYW0pKTtcbiAgICByZXR1cm4gcHJvZ3JhbTtcbn07XG5jb25zdCBjb21waWxlU2hhZGVyID0gKGdsLCBzb3VyY2UsIHR5cGUpID0+IHtcbiAgICBjb25zdCBzaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIodHlwZSk7XG4gICAgaWYgKCFzaGFkZXIpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIldlYkdMIGZhaWxlZCB0byBjcmVhdGUgc2hhZGVyXCIpO1xuICAgIGdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHNvdXJjZSk7XG4gICAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xuICAgIGNvbnN0IHN1Y2Nlc3MgPSBnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUyk7XG4gICAgaWYgKCFzdWNjZXNzKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBjb21waWxlIHNoYWRlcjogJHtnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcil9YCk7XG4gICAgcmV0dXJuIHNoYWRlcjtcbn07XG4vKlxuICogQXNzdW1lcyB0aGUgdGV4dHVyZSBzaXplIGlzIGEgcG93ZXIgb2YgMi4gR2VuZXJhdGVzIG1pcG1hcHNcbiAqL1xuZXhwb3J0IGNvbnN0IGxvYWRUZXh0dXJlID0gKGdsLCB1cmwpID0+IHtcbiAgICBjb25zdCB0ZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xuICAgIGlmICghdGV4dHVyZSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiV2ViR0wgY291bGRuJ3QgY3JlYXRlIG5lZWRlZCB0ZXh0dXJlc1wiKTtcbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlKTtcbiAgICBjb25zdCBsZXZlbCA9IDA7XG4gICAgY29uc3QgaW50ZXJuYWxGb3JtYXQgPSBnbC5SR0JBO1xuICAgIGNvbnN0IHdpZHRoID0gMTtcbiAgICBjb25zdCBoZWlnaHQgPSAxO1xuICAgIGNvbnN0IGJvcmRlciA9IDA7XG4gICAgY29uc3Qgc3JjRm9ybWF0ID0gZ2wuUkdCQTtcbiAgICBjb25zdCBzcmNUeXBlID0gZ2wuVU5TSUdORURfQllURTtcbiAgICBjb25zdCBwaXhlbCA9IG5ldyBVaW50OEFycmF5KFsyNTUsIDAsIDI1NSwgMjU1XSk7XG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCBsZXZlbCwgaW50ZXJuYWxGb3JtYXQsIHdpZHRoLCBoZWlnaHQsIGJvcmRlciwgc3JjRm9ybWF0LCBzcmNUeXBlLCBwaXhlbCk7XG4gICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpO1xuICAgICAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIGxldmVsLCBpbnRlcm5hbEZvcm1hdCwgc3JjRm9ybWF0LCBzcmNUeXBlLCBpbWFnZSk7XG4gICAgICAgIGdsLnRleFBhcmFtZXRlcmYoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICAgICAgZ2wudGV4UGFyYW1ldGVyZihnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgICAgICAvL2dsLnRleFBhcmFtZXRlcmYoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLlJFUEVBVCk7XG4gICAgICAgIC8vZ2wudGV4UGFyYW1ldGVyZihnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuUkVQRUFUKTtcbiAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xuICAgICAgICBnbC5nZW5lcmF0ZU1pcG1hcChnbC5URVhUVVJFXzJEKTtcbiAgICB9O1xuICAgIGltYWdlLnNyYyA9IHVybDtcbiAgICByZXR1cm4gdGV4dHVyZTtcbn07XG4iLCIvLyBqdXN0IHJlbmRlcnMgYWxsIHJlbmRlciBvYmplY3RzIHJpZ2h0IG5vd1xuZXhwb3J0IGNvbnN0IHJlbmRlckNodW5rcyA9IChnbCwgc3RhdGUsIGRlbHRhKSA9PiAoZGF0YSkgPT4ge1xuICAgIGNvbnN0IGNhc3RlZFN0YXRlID0gc3RhdGU7XG4gICAgY29uc3QgcmVuZGVyT2JqZWN0cyA9IGNhc3RlZFN0YXRlLmNvbXBvbmVudHNbXCJyZW5kZXJPYmplY3RzXCJdO1xuICAgIGlmICghcmVuZGVyT2JqZWN0cylcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJSZW5kZXJDaHVua3M6IFJlbmRlck9iamVjdHMgY29tcG9uZW50IG5vdCByZWdpc3RlcmVkIVwiKTtcbiAgICByZW5kZXJPYmplY3RzLmZvckVhY2goKHYsIGspID0+IHtcbiAgICAgICAgZ2wudXNlUHJvZ3JhbSh2LnByb2dyYW0pO1xuICAgICAgICBjb25zdCBwcm9qZWN0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHYucHJvZ3JhbSwgXCJwcm9qZWN0aW9uXCIpO1xuICAgICAgICBjb25zdCB2aWV3ID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHYucHJvZ3JhbSwgXCJ2aWV3XCIpO1xuICAgICAgICBjb25zdCBtb2RlbCA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbih2LnByb2dyYW0sIFwibW9kZWxcIik7XG4gICAgICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApO1xuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBjYXN0ZWRTdGF0ZS5hdGxhcyk7XG4gICAgICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYocHJvamVjdGlvbiwgZmFsc2UsIGNhc3RlZFN0YXRlLnBsYXllci5wcm9qZWN0aW9uKTtcbiAgICAgICAgZ2wudW5pZm9ybU1hdHJpeDRmdih2aWV3LCBmYWxzZSwgY2FzdGVkU3RhdGUucGxheWVyLnZpZXcpO1xuICAgICAgICBnbC51bmlmb3JtTWF0cml4NGZ2KG1vZGVsLCBmYWxzZSwgdi5tb2RlbCk7XG4gICAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheSh2LnZhbyk7XG4gICAgICAgIGdsLmRyYXdBcnJheXModi53aXJlZnJhbWUgPyBnbC5MSU5FUyA6IGdsLlRSSUFOR0xFUywgMCwgdi52ZXJ0ZXhDb3VudCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHN0YXRlO1xufTtcbiIsImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICdAbWF0aC5nbC9jb3JlJztcbmltcG9ydCB7IGZyZWVDYW1lcmFJbnB1dCB9IGZyb20gJy4uLy4uL2VuZ2luZS9mcmVlQ2FtZXJhJztcbmltcG9ydCB7IGNodW5rSWQsIGNodW5rUG9zRnJvbUJsb2NrUG9zLCBzZXRCbG9jaywgdXBkYXRlQ2h1bmsgfSBmcm9tICcuLi9jaHVuay9jaHVuayc7XG5pbXBvcnQgeyBkcmF3U2VsZWN0aW9uQm94LCByYXlDYXN0IH0gZnJvbSAnLi4vcGxheWVyJztcbmltcG9ydCB7IGZsb29yVmVjdG9yIH0gZnJvbSAnLi4vLi4vbGliL21hdGgnO1xuZXhwb3J0IGNvbnN0IGNhbWVyYUlucHV0ID0gKGdsLCBzdGF0ZSwgZGVsdGEpID0+IChkYXRhKSA9PiB7XG4gICAgdmFyIF9hO1xuICAgIGxldCBjYXN0ZWRTdGF0ZSA9IHN0YXRlO1xuICAgIGNhc3RlZFN0YXRlLnBsYXllciA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZnJlZUNhbWVyYUlucHV0KGNhc3RlZFN0YXRlLnBsYXllciwgY2FzdGVkU3RhdGUsIGRlbHRhKSksIGNhc3RlZFN0YXRlLnBsYXllcik7XG4gICAgY2FzdGVkU3RhdGUubW91c2VNb3ZlbWVudCA9IFswLCAwXTtcbiAgICBpZiAoY2FzdGVkU3RhdGUuYWN0aXZlSW5wdXQuaGFzKFwiZ1wiKSlcbiAgICAgICAgY29uc29sZS5sb2coY2FzdGVkU3RhdGUucGxheWVyLnBvc2l0aW9uKTtcbiAgICBpZiAoY2FzdGVkU3RhdGUuYWN0aXZlSW5wdXQuaGFzKFwidlwiKSkge1xuICAgICAgICBjb25zdCBwb3MgPSBjYXN0ZWRTdGF0ZS5wbGF5ZXIucG9zaXRpb247XG4gICAgICAgIGNvbnN0IGNodW5rU2l6ZSA9IGNhc3RlZFN0YXRlLmNodW5rRmFjdG9yeS5jaHVua1NpemU7XG4gICAgICAgIGNvbnN0IGNodW5rUG9zID0gbmV3IFZlY3RvcjMoTWF0aC5mbG9vcihwb3MueCAvIGNodW5rU2l6ZSksIE1hdGguZmxvb3IocG9zLnkgLyBjaHVua1NpemUpLCBNYXRoLmZsb29yKHBvcy56IC8gY2h1bmtTaXplKSk7XG4gICAgICAgIGNvbnN0IGVpZCA9IGNodW5rSWQoY2h1bmtQb3MpO1xuICAgICAgICBjb25zdCBjaHVuayA9IChfYSA9IGNhc3RlZFN0YXRlLmNvbXBvbmVudHNbXCJyZW5kZXJPYmplY3RzXCJdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0KGVpZCk7XG4gICAgICAgIGlmIChjaHVuaykge1xuICAgICAgICAgICAgY2h1bmsud2lyZWZyYW1lID0gIWNodW5rLndpcmVmcmFtZTtcbiAgICAgICAgICAgIGNhc3RlZFN0YXRlLmNvbXBvbmVudHNbXCJyZW5kZXJPYmplY3RzXCJdLnNldChlaWQsIGNodW5rKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2FzdGVkU3RhdGU7XG59O1xuZXhwb3J0IGNvbnN0IGNoZWNrQ2h1bmtDaGFuZ2UgPSAoZ2wsIHN0YXRlLCBkZWx0YSkgPT4gKGRhdGEpID0+IHtcbiAgICBsZXQgY2FzdGVkU3RhdGUgPSBzdGF0ZTtcbiAgICBjb25zdCBjdXJyZW50Q2h1bmtJZCA9IGNodW5rSWQoY2h1bmtQb3NGcm9tQmxvY2tQb3MoY2FzdGVkU3RhdGUuY2h1bmtGYWN0b3J5LCBmbG9vclZlY3RvcihjYXN0ZWRTdGF0ZS5wbGF5ZXIucG9zaXRpb24pKSk7XG4gICAgY29uc3QgcHJldmlvdXNDaHVua0lkID0gY2h1bmtJZChjaHVua1Bvc0Zyb21CbG9ja1BvcyhjYXN0ZWRTdGF0ZS5jaHVua0ZhY3RvcnksIGZsb29yVmVjdG9yKGNhc3RlZFN0YXRlLnBsYXllci5wcmV2aW91c1Bvc2l0aW9uKSkpO1xuICAgIGlmICghKGN1cnJlbnRDaHVua0lkID09PSBwcmV2aW91c0NodW5rSWQpKVxuICAgICAgICBjYXN0ZWRTdGF0ZS5xdWV1ZS5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6IFwicGxheWVyQ2hhbmdlQ2h1bmtcIixcbiAgICAgICAgICAgIGRhdGE6IG51bGxcbiAgICAgICAgfSk7XG4gICAgY2FzdGVkU3RhdGUucGxheWVyLnByZXZpb3VzUG9zaXRpb24ueCA9IGNhc3RlZFN0YXRlLnBsYXllci5wb3NpdGlvbi54O1xuICAgIGNhc3RlZFN0YXRlLnBsYXllci5wcmV2aW91c1Bvc2l0aW9uLnkgPSBjYXN0ZWRTdGF0ZS5wbGF5ZXIucG9zaXRpb24ueTtcbiAgICBjYXN0ZWRTdGF0ZS5wbGF5ZXIucHJldmlvdXNQb3NpdGlvbi56ID0gY2FzdGVkU3RhdGUucGxheWVyLnBvc2l0aW9uLno7XG4gICAgcmV0dXJuIGNhc3RlZFN0YXRlO1xufTtcbmV4cG9ydCBjb25zdCBibG9ja0lucHV0ID0gKGdsLCBzdGF0ZSwgZGVsdGEpID0+IChkYXRhKSA9PiB7XG4gICAgbGV0IGNhc3RlZFN0YXRlID0gc3RhdGU7XG4gICAgY29uc3QgY2h1bmtTaXplID0gY2FzdGVkU3RhdGUuY2h1bmtGYWN0b3J5LmNodW5rU2l6ZTtcbiAgICBjb25zdCB3aGljaCA9IGRhdGEgPT09IG51bGwgfHwgZGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGF0YS53aGljaDtcbiAgICBjb25zdCB7IHBvc2l0aW9uLCBkaXJlY3Rpb24sIHJheVN0ZXAsIHJheU1heExlbmd0aCB9ID0gY2FzdGVkU3RhdGUucGxheWVyO1xuICAgIGNvbnN0IGhpdCA9IHJheUNhc3QoZ2wsIGNhc3RlZFN0YXRlLCBwb3NpdGlvbiwgZGlyZWN0aW9uLCByYXlTdGVwLCByYXlNYXhMZW5ndGgpO1xuICAgIGlmICghaGl0KVxuICAgICAgICByZXR1cm4gY2FzdGVkU3RhdGU7XG4gICAgY29uc3QgYmxvY2tQb3MgPSBmbG9vclZlY3RvcihoaXQucG9zaXRpb24pO1xuICAgIGNvbnN0IGNodW5rUG9zID0gY2h1bmtQb3NGcm9tQmxvY2tQb3MoY2FzdGVkU3RhdGUuY2h1bmtGYWN0b3J5LCBibG9ja1Bvcyk7XG4gICAgY29uc3QgcHJldlBvcyA9IGZsb29yVmVjdG9yKGhpdC5wcmV2aW91cyk7XG4gICAgY29uc3QgcHJldkNodW5rUG9zID0gY2h1bmtQb3NGcm9tQmxvY2tQb3MoY2FzdGVkU3RhdGUuY2h1bmtGYWN0b3J5LCBwcmV2UG9zKTtcbiAgICAvLyBsZWZ0IGNsaWNrIC0gcmVtb3ZlIGJsb2NrXG4gICAgaWYgKHdoaWNoID09IDEpIHtcbiAgICAgICAgLy8gc2V0IHRoZSBibG9ja1xuICAgICAgICBjYXN0ZWRTdGF0ZSA9IHNldEJsb2NrKGNhc3RlZFN0YXRlLCBibG9ja1BvcywgMCk7XG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgbWVzaFxuICAgICAgICBjYXN0ZWRTdGF0ZSA9IHVwZGF0ZUNodW5rKGdsLCBjYXN0ZWRTdGF0ZSwgY2h1bmtQb3MpO1xuICAgICAgICBjb25zdCBtb2R1bG8gPSBuZXcgVmVjdG9yMygoKGJsb2NrUG9zLnggJSBjaHVua1NpemUpICsgY2h1bmtTaXplKSAlIGNodW5rU2l6ZSwgKChibG9ja1Bvcy55ICUgY2h1bmtTaXplKSArIGNodW5rU2l6ZSkgJSBjaHVua1NpemUsICgoYmxvY2tQb3MueiAlIGNodW5rU2l6ZSkgKyBjaHVua1NpemUpICUgY2h1bmtTaXplKTtcbiAgICAgICAgaWYgKG1vZHVsby54ICUgY2h1bmtTaXplID09IDApXG4gICAgICAgICAgICBjYXN0ZWRTdGF0ZSA9IHVwZGF0ZUNodW5rKGdsLCBjYXN0ZWRTdGF0ZSwgbmV3IFZlY3RvcjMoY2h1bmtQb3MueCAtIDEsIGNodW5rUG9zLnksIGNodW5rUG9zLnopKTtcbiAgICAgICAgaWYgKG1vZHVsby54ICUgY2h1bmtTaXplID09IGNodW5rU2l6ZSAtIDEpXG4gICAgICAgICAgICBjYXN0ZWRTdGF0ZSA9IHVwZGF0ZUNodW5rKGdsLCBjYXN0ZWRTdGF0ZSwgbmV3IFZlY3RvcjMoY2h1bmtQb3MueCArIDEsIGNodW5rUG9zLnksIGNodW5rUG9zLnopKTtcbiAgICAgICAgaWYgKG1vZHVsby55ICUgY2h1bmtTaXplID09IDApXG4gICAgICAgICAgICBjYXN0ZWRTdGF0ZSA9IHVwZGF0ZUNodW5rKGdsLCBjYXN0ZWRTdGF0ZSwgbmV3IFZlY3RvcjMoY2h1bmtQb3MueCwgY2h1bmtQb3MueSAtIDEsIGNodW5rUG9zLnopKTtcbiAgICAgICAgaWYgKG1vZHVsby55ICUgY2h1bmtTaXplID09IGNodW5rU2l6ZSAtIDEpXG4gICAgICAgICAgICBjYXN0ZWRTdGF0ZSA9IHVwZGF0ZUNodW5rKGdsLCBjYXN0ZWRTdGF0ZSwgbmV3IFZlY3RvcjMoY2h1bmtQb3MueCwgY2h1bmtQb3MueSArIDEsIGNodW5rUG9zLnopKTtcbiAgICAgICAgaWYgKG1vZHVsby56ICUgY2h1bmtTaXplID09IDApXG4gICAgICAgICAgICBjYXN0ZWRTdGF0ZSA9IHVwZGF0ZUNodW5rKGdsLCBjYXN0ZWRTdGF0ZSwgbmV3IFZlY3RvcjMoY2h1bmtQb3MueCwgY2h1bmtQb3MueSwgY2h1bmtQb3MueiAtIDEpKTtcbiAgICAgICAgaWYgKG1vZHVsby56ICUgY2h1bmtTaXplID09IGNodW5rU2l6ZSAtIDEpXG4gICAgICAgICAgICBjYXN0ZWRTdGF0ZSA9IHVwZGF0ZUNodW5rKGdsLCBjYXN0ZWRTdGF0ZSwgbmV3IFZlY3RvcjMoY2h1bmtQb3MueCwgY2h1bmtQb3MueSwgY2h1bmtQb3MueiArIDEpKTtcbiAgICB9XG4gICAgLy8gcmlnaHQgY2xpY2sgLSBhZGQgYmxvY2tcbiAgICBpZiAod2hpY2ggPT0gMykge1xuICAgICAgICAvLyBzZXQgdGhlIGJsb2NrXG4gICAgICAgIGNhc3RlZFN0YXRlID0gc2V0QmxvY2soY2FzdGVkU3RhdGUsIHByZXZQb3MsIDEpO1xuICAgICAgICAvLyB1cGRhdGUgdGhlIG1lc2hcbiAgICAgICAgY2FzdGVkU3RhdGUgPSB1cGRhdGVDaHVuayhnbCwgY2FzdGVkU3RhdGUsIHByZXZDaHVua1Bvcyk7XG4gICAgfVxuICAgIHJldHVybiBjYXN0ZWRTdGF0ZTtcbn07XG5leHBvcnQgY29uc3QgcmVuZGVyU2VsZWN0aW9uQm94ID0gKGdsLCBzdGF0ZSwgZGVsdGEpID0+IChkYXRhKSA9PiB7XG4gICAgbGV0IGNhc3RlZFN0YXRlID0gc3RhdGU7XG4gICAgY29uc3Qgd2hpY2ggPSBkYXRhID09PSBudWxsIHx8IGRhdGEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRhdGEud2hpY2g7XG4gICAgY29uc3QgeyBwb3NpdGlvbiwgZGlyZWN0aW9uLCByYXlTdGVwLCByYXlNYXhMZW5ndGggfSA9IGNhc3RlZFN0YXRlLnBsYXllcjtcbiAgICBjb25zdCBoaXQgPSByYXlDYXN0KGdsLCBjYXN0ZWRTdGF0ZSwgcG9zaXRpb24sIGRpcmVjdGlvbiwgcmF5U3RlcCwgcmF5TWF4TGVuZ3RoKTtcbiAgICBpZiAoIWhpdClcbiAgICAgICAgcmV0dXJuIGNhc3RlZFN0YXRlO1xuICAgIGNvbnN0IHBvcyA9IGZsb29yVmVjdG9yKGhpdC5wb3NpdGlvbik7XG4gICAgY2FzdGVkU3RhdGUucGxheWVyLnNlbGVjdGlvbkJveC5tb2RlbCA9IGNhc3RlZFN0YXRlLnBsYXllci5zZWxlY3Rpb25Cb3gubW9kZWwuaWRlbnRpdHkoKS50cmFuc2xhdGUoW3Bvcy54LCBwb3MueSwgcG9zLnpdKTtcbiAgICBjYXN0ZWRTdGF0ZSA9IGRyYXdTZWxlY3Rpb25Cb3goZ2wsIGNhc3RlZFN0YXRlKTtcbiAgICByZXR1cm4gY2FzdGVkU3RhdGU7XG59O1xuIiwiaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJ0BtYXRoLmdsL2NvcmUnO1xuaW1wb3J0IHsgbG9hZE1hbnlDaHVua3MsIHVubG9hZENodW5rIH0gZnJvbSAnLi4vY2h1bmsvY2h1bmsnO1xuZXhwb3J0IGNvbnN0IGxvYWRDaHVua3MgPSAoZ2wsIHN0YXRlLCBkZWx0YSkgPT4gKGRhdGEpID0+IHtcbiAgICBsZXQgY2FzdGVkU3RhdGUgPSBzdGF0ZTtcbiAgICBjb25zdCBsb2FkRGlzdGFuY2UgPSBjYXN0ZWRTdGF0ZS5jaHVua0ZhY3RvcnkubG9hZERpc3RhbmNlO1xuICAgIGNvbnN0IGNodW5rU2l6ZSA9IGNhc3RlZFN0YXRlLmNodW5rRmFjdG9yeS5jaHVua1NpemU7XG4gICAgY29uc3QgcG9zID0gY2FzdGVkU3RhdGUucGxheWVyLnBvc2l0aW9uO1xuICAgIGNvbnN0IGNodW5rUG9zID0gbmV3IFZlY3RvcjMoTWF0aC5mbG9vcihwb3MueCAvIGNodW5rU2l6ZSksIE1hdGguZmxvb3IocG9zLnkgLyBjaHVua1NpemUpLCBNYXRoLmZsb29yKHBvcy56IC8gY2h1bmtTaXplKSk7XG4gICAgY29uc3QgdG9Mb2FkID0gW107XG4gICAgY29uc3Qgb2Zmc2V0ID0gW107XG4gICAgY29uc3QgciA9IGxvYWREaXN0YW5jZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHI7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHI7IGorKykge1xuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCByOyBrKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoKGkgKiBpICsgaiAqIGogKyBrICogaykgPCByICogcikge1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQucHVzaChuZXcgVmVjdG9yMyhpLCBqLCBrKSk7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldC5wdXNoKG5ldyBWZWN0b3IzKGksIC1qLCBrKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKG9mZnNldCk7XG4gICAgY2FzdGVkU3RhdGUgPSBsb2FkTWFueUNodW5rcyhnbCwgY2FzdGVkU3RhdGUsIG9mZnNldCk7XG4gICAgcmV0dXJuIGNhc3RlZFN0YXRlO1xufTtcbmV4cG9ydCBjb25zdCB1bmxvYWRDaHVua3MgPSAoZ2wsIHN0YXRlLCBkZWx0YSkgPT4gKGRhdGEpID0+IHtcbiAgICBsZXQgY2FzdGVkU3RhdGUgPSBzdGF0ZTtcbiAgICBjb25zdCBsb2FkRGlzdGFuY2UgPSBjYXN0ZWRTdGF0ZS5jaHVua0ZhY3RvcnkubG9hZERpc3RhbmNlO1xuICAgIGNvbnN0IGNodW5rU2l6ZSA9IGNhc3RlZFN0YXRlLmNodW5rRmFjdG9yeS5jaHVua1NpemU7XG4gICAgY29uc3QgcGxheWVyUG9zID0gY2FzdGVkU3RhdGUucGxheWVyLnBvc2l0aW9uO1xuICAgIGNvbnN0IGNodW5rUG9zID0gbmV3IFZlY3RvcjMoTWF0aC5mbG9vcihwbGF5ZXJQb3MueCAvIGNodW5rU2l6ZSksIE1hdGguZmxvb3IocGxheWVyUG9zLnkgLyBjaHVua1NpemUpLCBNYXRoLmZsb29yKHBsYXllclBvcy56IC8gY2h1bmtTaXplKSk7XG4gICAgY29uc3QgY2h1bmtQb3NTdG9yYWdlID0gY2FzdGVkU3RhdGUuY29tcG9uZW50c1tcImNodW5rUG9zXCJdO1xuICAgIGlmICghY2h1bmtQb3NTdG9yYWdlKVxuICAgICAgICByZXR1cm4gY2FzdGVkU3RhdGU7XG4gICAgY2h1bmtQb3NTdG9yYWdlLmZvckVhY2goKHYsIGspID0+IHtcbiAgICAgICAgLy8gbGV0IHVubG9hZCA9IGZhbHNlO1xuICAgICAgICAvLyBmaW5kIGNodW5rcG9zIG91dHNpZGUgcmFuZ2UgYW5kIHVubG9hZFxuICAgICAgICBpZiAodi54IDwgY2h1bmtQb3MueCAtIGxvYWREaXN0YW5jZSlcbiAgICAgICAgICAgIGNhc3RlZFN0YXRlID0gdW5sb2FkQ2h1bmsoY2FzdGVkU3RhdGUsIHYpO1xuICAgICAgICBpZiAodi54ID4gY2h1bmtQb3MueCArIGxvYWREaXN0YW5jZSlcbiAgICAgICAgICAgIGNhc3RlZFN0YXRlID0gdW5sb2FkQ2h1bmsoY2FzdGVkU3RhdGUsIHYpO1xuICAgICAgICBpZiAodi55IDwgY2h1bmtQb3MueSAtIGxvYWREaXN0YW5jZSlcbiAgICAgICAgICAgIGNhc3RlZFN0YXRlID0gdW5sb2FkQ2h1bmsoY2FzdGVkU3RhdGUsIHYpO1xuICAgICAgICBpZiAodi55ID4gY2h1bmtQb3MueSArIGxvYWREaXN0YW5jZSlcbiAgICAgICAgICAgIGNhc3RlZFN0YXRlID0gdW5sb2FkQ2h1bmsoY2FzdGVkU3RhdGUsIHYpO1xuICAgICAgICBpZiAodi56IDwgY2h1bmtQb3MueiAtIGxvYWREaXN0YW5jZSlcbiAgICAgICAgICAgIGNhc3RlZFN0YXRlID0gdW5sb2FkQ2h1bmsoY2FzdGVkU3RhdGUsIHYpO1xuICAgICAgICBpZiAodi56ID4gY2h1bmtQb3MueiArIGxvYWREaXN0YW5jZSlcbiAgICAgICAgICAgIGNhc3RlZFN0YXRlID0gdW5sb2FkQ2h1bmsoY2FzdGVkU3RhdGUsIHYpO1xuICAgICAgICAvLyBjYXN0ZWRTdGF0ZS5xdWV1ZS5wdXNoKHsgdHlwZTogXCJjaHVua1VubG9hZFwiLCBkYXRhOiB2IH0pXG4gICAgfSk7XG4gICAgcmV0dXJuIGNhc3RlZFN0YXRlO1xufTtcbiIsImltcG9ydCB7IG5haXZlTWVzaGluZyB9IGZyb20gJy4uL2NodW5rL21lc2gnO1xuLy8gbWVzaCBjaHVua1xuc2VsZi5vbm1lc3NhZ2UgPSAoZSkgPT4ge1xuICAgIGNvbnN0IGNodW5rUG9zID0gZS5kYXRhLnBvczsgLy8gcGFzc2VkIGluXG4gICAgY29uc3Qgc3RydWN0dXJlcyA9IGUuZGF0YS5zdHJ1Y3R1cmVzO1xuICAgIGNvbnN0IGNodW5rRmFjdG9yeSA9IGUuZGF0YS5jaHVua0ZhY3Rvcnk7XG4gICAgLy8gZ2VuZXJhdGUgbWVzaFxuICAgIGNvbnN0IG1lc2ggPSBuYWl2ZU1lc2hpbmcoY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBjaHVua1Bvcyk7XG4gICAgc2VsZi5wb3N0TWVzc2FnZShtZXNoKTtcbiAgICBjbG9zZSgpO1xufTtcbiIsImltcG9ydCB7IE1hdHJpeDQsIFZlY3RvcjMgfSBmcm9tICdAbWF0aC5nbC9jb3JlJztcbmV4cG9ydCBjb25zdCByYWRpYW5zID0gKG4pID0+IHtcbiAgICByZXR1cm4gKG4gKiBNYXRoLlBJKSAvIDE4MC4wO1xufTtcbmV4cG9ydCBjb25zdCBtdWx0aXBseUFuZERlc3RydWN0VmVjdG9yMyA9ICh2ZWMsIG0pID0+IHtcbiAgICByZXR1cm4gW3ZlYy54ICogbSwgdmVjLnkgKiBtLCB2ZWMueiAqIG1dO1xufTtcbmV4cG9ydCBjb25zdCBmdW5jdGlvbmFsQ3Jvc3NWZWN0b3IzID0gKHYxLCB2MikgPT4ge1xuICAgIGNvbnN0IHYgPSBuZXcgVmVjdG9yMyh2MS54LCB2MS55LCB2MS56KTtcbiAgICByZXR1cm4gdi5jcm9zcyhbdjIueCwgdjIueSwgdjIuel0pLm5vcm1hbGl6ZSgpO1xufTtcbmV4cG9ydCBjb25zdCBwcm9qZWN0aW9uTWF0cml4ID0gKHcsIGgpID0+IChuZXcgTWF0cml4NCgpLnBlcnNwZWN0aXZlKHtcbiAgICBmb3Y6IDcwLFxuICAgIGZvdnk6IChNYXRoLlBJICogNzApIC8gMTgwLFxuICAgIGFzcGVjdDogd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgbmVhcjogMC4xLFxuICAgIGZhcjogMTAwLjBcbn0pKTtcbmV4cG9ydCBjb25zdCBmbG9vclZlY3RvciA9IChwb3MpID0+IChuZXcgVmVjdG9yMyhNYXRoLmZsb29yKHBvcy54KSwgTWF0aC5mbG9vcihwb3MueSksIE1hdGguZmxvb3IocG9zLnopKSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbi8vIHRoZSBzdGFydHVwIGZ1bmN0aW9uXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnggPSAoKSA9PiB7XG5cdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuXHQvLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcblx0dmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19tYXRoX2dsX2NvcmVfZGlzdF9lc21fY2xhc3Nlc19tYXRyaXg0X2pzLW5vZGVfbW9kdWxlc19tYXRoX2dsX2NvcmVfZGlzdF8tMDM4YjZhXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2V4YW1wbGUvd29ya2Vycy9tZXNoV29ya2VyLnRzXCIpKSlcblx0X193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcblx0cmV0dXJuIF9fd2VicGFja19leHBvcnRzX187XG59O1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmYgPSB7fTtcbi8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5lID0gKGNodW5rSWQpID0+IHtcblx0cmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uZikucmVkdWNlKChwcm9taXNlcywga2V5KSA9PiB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5mW2tleV0oY2h1bmtJZCwgcHJvbWlzZXMpO1xuXHRcdHJldHVybiBwcm9taXNlcztcblx0fSwgW10pKTtcbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYXN5bmMgY2h1bmtzIGFuZCBzaWJsaW5nIGNodW5rcyBmb3IgdGhlIGVudHJ5cG9pbnRcbl9fd2VicGFja19yZXF1aXJlX18udSA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gXCJcIiArIGNodW5rSWQgKyBcIi5idW5kbGUuanNcIjtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBzZWxmLmxvY2F0aW9uICsgXCJcIjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBjaHVua3Ncbi8vIFwiMVwiIG1lYW5zIFwiYWxyZWFkeSBsb2FkZWRcIlxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJzcmNfZXhhbXBsZV9jaHVua19jaHVua190c1wiOiAxXG59O1xuXG4vLyBpbXBvcnRTY3JpcHRzIGNodW5rIGxvYWRpbmdcbnZhciBpbnN0YWxsQ2h1bmsgPSAoZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHRmb3IodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0fVxuXHR9XG5cdGlmKHJ1bnRpbWUpIHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdHdoaWxlKGNodW5rSWRzLmxlbmd0aClcblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZHMucG9wKCldID0gMTtcblx0cGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG59O1xuX193ZWJwYWNrX3JlcXVpcmVfXy5mLmkgPSAoY2h1bmtJZCwgcHJvbWlzZXMpID0+IHtcblx0Ly8gXCIxXCIgaXMgdGhlIHNpZ25hbCBmb3IgXCJhbHJlYWR5IGxvYWRlZFwiXG5cdGlmKCFpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRpZih0cnVlKSB7IC8vIGFsbCBjaHVua3MgaGF2ZSBKU1xuXHRcdFx0aW1wb3J0U2NyaXB0cyhfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLnUoY2h1bmtJZCkpO1xuXHRcdH1cblx0fVxufTtcblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmthcHBcIl0gPSBzZWxmW1wid2VicGFja0NodW5rYXBwXCJdIHx8IFtdO1xudmFyIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uID0gY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSBpbnN0YWxsQ2h1bms7XG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3QiLCJ2YXIgbmV4dCA9IF9fd2VicGFja19yZXF1aXJlX18ueDtcbl9fd2VicGFja19yZXF1aXJlX18ueCA9ICgpID0+IHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShcInZlbmRvcnMtbm9kZV9tb2R1bGVzX21hdGhfZ2xfY29yZV9kaXN0X2VzbV9jbGFzc2VzX21hdHJpeDRfanMtbm9kZV9tb2R1bGVzX21hdGhfZ2xfY29yZV9kaXN0Xy0wMzhiNmFcIikudGhlbihuZXh0KTtcbn07IiwiIiwiLy8gcnVuIHN0YXJ0dXBcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy54KCk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=