/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@math.gl/core/dist/esm/classes/base/math-array.js":
/*!************************************************************************!*\
  !*** ./node_modules/@math.gl/core/dist/esm/classes/base/math-array.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MathArray)
/* harmony export */ });
/* harmony import */ var _lib_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/common */ "./node_modules/@math.gl/core/dist/esm/lib/common.js");
/* harmony import */ var _lib_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/assert */ "./node_modules/@math.gl/core/dist/esm/lib/assert.js");
function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    var instance = Reflect.construct(cls, Array.from(arguments));
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}



class MathArray extends _extendableBuiltin(Array) {
  get ELEMENTS() {
    (0,_lib_assert__WEBPACK_IMPORTED_MODULE_0__["default"])(false);
    return 0;
  }

  clone() {
    return new this.constructor().copy(this);
  }

  from(arrayOrObject) {
    return Array.isArray(arrayOrObject) ? this.copy(arrayOrObject) : this.fromObject(arrayOrObject);
  }

  fromArray(array, offset = 0) {
    for (let i = 0; i < this.ELEMENTS; ++i) {
      this[i] = array[i + offset];
    }

    return this.check();
  }

  to(arrayOrObject) {
    if (arrayOrObject === this) {
      return this;
    }

    return (0,_lib_common__WEBPACK_IMPORTED_MODULE_1__.isArray)(arrayOrObject) ? this.toArray(arrayOrObject) : this.toObject(arrayOrObject);
  }

  toTarget(target) {
    return target ? this.to(target) : this;
  }

  toArray(array = [], offset = 0) {
    for (let i = 0; i < this.ELEMENTS; ++i) {
      array[offset + i] = this[i];
    }

    return array;
  }

  toFloat32Array() {
    return new Float32Array(this);
  }

  toString() {
    return this.formatString(_lib_common__WEBPACK_IMPORTED_MODULE_1__.config);
  }

  formatString(opts) {
    let string = '';

    for (let i = 0; i < this.ELEMENTS; ++i) {
      string += (i > 0 ? ', ' : '') + (0,_lib_common__WEBPACK_IMPORTED_MODULE_1__.formatValue)(this[i], opts);
    }

    return "".concat(opts.printTypes ? this.constructor.name : '', "[").concat(string, "]");
  }

  equals(array) {
    if (!array || this.length !== array.length) {
      return false;
    }

    for (let i = 0; i < this.ELEMENTS; ++i) {
      if (!(0,_lib_common__WEBPACK_IMPORTED_MODULE_1__.equals)(this[i], array[i])) {
        return false;
      }
    }

    return true;
  }

  exactEquals(array) {
    if (!array || this.length !== array.length) {
      return false;
    }

    for (let i = 0; i < this.ELEMENTS; ++i) {
      if (this[i] !== array[i]) {
        return false;
      }
    }

    return true;
  }

  negate() {
    for (let i = 0; i < this.ELEMENTS; ++i) {
      this[i] = -this[i];
    }

    return this.check();
  }

  lerp(a, b, t) {
    if (t === undefined) {
      t = b;
      b = a;
      a = this;
    }

    for (let i = 0; i < this.ELEMENTS; ++i) {
      const ai = a[i];
      this[i] = ai + t * (b[i] - ai);
    }

    return this.check();
  }

  min(vector) {
    for (let i = 0; i < this.ELEMENTS; ++i) {
      this[i] = Math.min(vector[i], this[i]);
    }

    return this.check();
  }

  max(vector) {
    for (let i = 0; i < this.ELEMENTS; ++i) {
      this[i] = Math.max(vector[i], this[i]);
    }

    return this.check();
  }

  clamp(minVector, maxVector) {
    for (let i = 0; i < this.ELEMENTS; ++i) {
      this[i] = Math.min(Math.max(this[i], minVector[i]), maxVector[i]);
    }

    return this.check();
  }

  add(...vectors) {
    for (const vector of vectors) {
      for (let i = 0; i < this.ELEMENTS; ++i) {
        this[i] += vector[i];
      }
    }

    return this.check();
  }

  subtract(...vectors) {
    for (const vector of vectors) {
      for (let i = 0; i < this.ELEMENTS; ++i) {
        this[i] -= vector[i];
      }
    }

    return this.check();
  }

  scale(scale) {
    if (Array.isArray(scale)) {
      return this.multiply(scale);
    }

    for (let i = 0; i < this.ELEMENTS; ++i) {
      this[i] *= scale;
    }

    return this.check();
  }

  sub(a) {
    return this.subtract(a);
  }

  setScalar(a) {
    for (let i = 0; i < this.ELEMENTS; ++i) {
      this[i] = a;
    }

    return this.check();
  }

  addScalar(a) {
    for (let i = 0; i < this.ELEMENTS; ++i) {
      this[i] += a;
    }

    return this.check();
  }

  subScalar(a) {
    return this.addScalar(-a);
  }

  multiplyScalar(scalar) {
    for (let i = 0; i < this.ELEMENTS; ++i) {
      this[i] *= scalar;
    }

    return this.check();
  }

  divideScalar(a) {
    return this.scale(1 / a);
  }

  clampScalar(min, max) {
    for (let i = 0; i < this.ELEMENTS; ++i) {
      this[i] = Math.min(Math.max(this[i], min), max);
    }

    return this.check();
  }

  multiplyByScalar(scalar) {
    return this.scale(scalar);
  }

  get elements() {
    return this;
  }

  check() {
    if (_lib_common__WEBPACK_IMPORTED_MODULE_1__.config.debug && !this.validate()) {
      throw new Error("math.gl: ".concat(this.constructor.name, " some fields set to invalid numbers'"));
    }

    return this;
  }

  validate() {
    let valid = this.length === this.ELEMENTS;

    for (let i = 0; i < this.ELEMENTS; ++i) {
      valid = valid && Number.isFinite(this[i]);
    }

    return valid;
  }

}
//# sourceMappingURL=math-array.js.map

/***/ }),

/***/ "./node_modules/@math.gl/core/dist/esm/classes/base/matrix.js":
/*!********************************************************************!*\
  !*** ./node_modules/@math.gl/core/dist/esm/classes/base/matrix.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Matrix)
/* harmony export */ });
/* harmony import */ var _math_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math-array */ "./node_modules/@math.gl/core/dist/esm/classes/base/math-array.js");
/* harmony import */ var _lib_validators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/validators */ "./node_modules/@math.gl/core/dist/esm/lib/validators.js");
/* harmony import */ var _lib_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/common */ "./node_modules/@math.gl/core/dist/esm/lib/common.js");
/* harmony import */ var _lib_assert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/assert */ "./node_modules/@math.gl/core/dist/esm/lib/assert.js");




class Matrix extends _math_array__WEBPACK_IMPORTED_MODULE_0__["default"] {
  get ELEMENTS() {
    (0,_lib_assert__WEBPACK_IMPORTED_MODULE_1__["default"])(false);
    return 0;
  }

  get RANK() {
    (0,_lib_assert__WEBPACK_IMPORTED_MODULE_1__["default"])(false);
    return 0;
  }

  toString() {
    let string = '[';

    if (_lib_common__WEBPACK_IMPORTED_MODULE_2__.config.printRowMajor) {
      string += 'row-major:';

      for (let row = 0; row < this.RANK; ++row) {
        for (let col = 0; col < this.RANK; ++col) {
          string += " ".concat(this[col * this.RANK + row]);
        }
      }
    } else {
      string += 'column-major:';

      for (let i = 0; i < this.ELEMENTS; ++i) {
        string += " ".concat(this[i]);
      }
    }

    string += ']';
    return string;
  }

  getElementIndex(row, col) {
    return col * this.RANK + row;
  }

  getElement(row, col) {
    return this[col * this.RANK + row];
  }

  setElement(row, col, value) {
    this[col * this.RANK + row] = (0,_lib_validators__WEBPACK_IMPORTED_MODULE_3__.checkNumber)(value);
    return this;
  }

  getColumn(columnIndex, result = new Array(this.RANK).fill(-0)) {
    const firstIndex = columnIndex * this.RANK;

    for (let i = 0; i < this.RANK; ++i) {
      result[i] = this[firstIndex + i];
    }

    return result;
  }

  setColumn(columnIndex, columnVector) {
    const firstIndex = columnIndex * this.RANK;

    for (let i = 0; i < this.RANK; ++i) {
      this[firstIndex + i] = columnVector[i];
    }

    return this;
  }

}
//# sourceMappingURL=matrix.js.map

/***/ }),

/***/ "./node_modules/@math.gl/core/dist/esm/classes/base/vector.js":
/*!********************************************************************!*\
  !*** ./node_modules/@math.gl/core/dist/esm/classes/base/vector.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Vector)
/* harmony export */ });
/* harmony import */ var _math_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math-array */ "./node_modules/@math.gl/core/dist/esm/classes/base/math-array.js");
/* harmony import */ var _lib_validators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/validators */ "./node_modules/@math.gl/core/dist/esm/lib/validators.js");
/* harmony import */ var _lib_assert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/assert */ "./node_modules/@math.gl/core/dist/esm/lib/assert.js");



class Vector extends _math_array__WEBPACK_IMPORTED_MODULE_0__["default"] {
  get ELEMENTS() {
    (0,_lib_assert__WEBPACK_IMPORTED_MODULE_1__["default"])(false);
    return 0;
  }

  copy(vector) {
    (0,_lib_assert__WEBPACK_IMPORTED_MODULE_1__["default"])(false);
    return this;
  }

  get x() {
    return this[0];
  }

  set x(value) {
    this[0] = (0,_lib_validators__WEBPACK_IMPORTED_MODULE_2__.checkNumber)(value);
  }

  get y() {
    return this[1];
  }

  set y(value) {
    this[1] = (0,_lib_validators__WEBPACK_IMPORTED_MODULE_2__.checkNumber)(value);
  }

  len() {
    return Math.sqrt(this.lengthSquared());
  }

  magnitude() {
    return this.len();
  }

  lengthSquared() {
    let length = 0;

    for (let i = 0; i < this.ELEMENTS; ++i) {
      length += this[i] * this[i];
    }

    return length;
  }

  magnitudeSquared() {
    return this.lengthSquared();
  }

  distance(mathArray) {
    return Math.sqrt(this.distanceSquared(mathArray));
  }

  distanceSquared(mathArray) {
    let length = 0;

    for (let i = 0; i < this.ELEMENTS; ++i) {
      const dist = this[i] - mathArray[i];
      length += dist * dist;
    }

    return (0,_lib_validators__WEBPACK_IMPORTED_MODULE_2__.checkNumber)(length);
  }

  dot(mathArray) {
    let product = 0;

    for (let i = 0; i < this.ELEMENTS; ++i) {
      product += this[i] * mathArray[i];
    }

    return (0,_lib_validators__WEBPACK_IMPORTED_MODULE_2__.checkNumber)(product);
  }

  normalize() {
    const length = this.magnitude();

    if (length !== 0) {
      for (let i = 0; i < this.ELEMENTS; ++i) {
        this[i] /= length;
      }
    }

    return this.check();
  }

  multiply(...vectors) {
    for (const vector of vectors) {
      for (let i = 0; i < this.ELEMENTS; ++i) {
        this[i] *= vector[i];
      }
    }

    return this.check();
  }

  divide(...vectors) {
    for (const vector of vectors) {
      for (let i = 0; i < this.ELEMENTS; ++i) {
        this[i] /= vector[i];
      }
    }

    return this.check();
  }

  lengthSq() {
    return this.lengthSquared();
  }

  distanceTo(vector) {
    return this.distance(vector);
  }

  distanceToSquared(vector) {
    return this.distanceSquared(vector);
  }

  getComponent(i) {
    (0,_lib_assert__WEBPACK_IMPORTED_MODULE_1__["default"])(i >= 0 && i < this.ELEMENTS, 'index is out of range');
    return (0,_lib_validators__WEBPACK_IMPORTED_MODULE_2__.checkNumber)(this[i]);
  }

  setComponent(i, value) {
    (0,_lib_assert__WEBPACK_IMPORTED_MODULE_1__["default"])(i >= 0 && i < this.ELEMENTS, 'index is out of range');
    this[i] = value;
    return this.check();
  }

  addVectors(a, b) {
    return this.copy(a).add(b);
  }

  subVectors(a, b) {
    return this.copy(a).subtract(b);
  }

  multiplyVectors(a, b) {
    return this.copy(a).multiply(b);
  }

  addScaledVector(a, b) {
    return this.add(new this.constructor(a).multiplyScalar(b));
  }

}
//# sourceMappingURL=vector.js.map

/***/ }),

/***/ "./node_modules/@math.gl/core/dist/esm/classes/matrix4.js":
/*!****************************************************************!*\
  !*** ./node_modules/@math.gl/core/dist/esm/classes/matrix4.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Matrix4)
/* harmony export */ });
/* harmony import */ var _lib_validators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/validators */ "./node_modules/@math.gl/core/dist/esm/lib/validators.js");
/* harmony import */ var _base_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base/matrix */ "./node_modules/@math.gl/core/dist/esm/classes/base/matrix.js");
/* harmony import */ var _lib_gl_matrix_extras__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/gl-matrix-extras */ "./node_modules/@math.gl/core/dist/esm/lib/gl-matrix-extras.js");
/* harmony import */ var gl_matrix_mat4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gl-matrix/mat4 */ "./node_modules/gl-matrix/esm/mat4.js");
/* harmony import */ var gl_matrix_vec2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gl-matrix/vec2 */ "./node_modules/gl-matrix/esm/vec2.js");
/* harmony import */ var gl_matrix_vec3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gl-matrix/vec3 */ "./node_modules/gl-matrix/esm/vec3.js");
/* harmony import */ var gl_matrix_vec4__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gl-matrix/vec4 */ "./node_modules/gl-matrix/esm/vec4.js");







const IDENTITY = Object.freeze([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
const ZERO = Object.freeze([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
const INDICES = Object.freeze({
  COL0ROW0: 0,
  COL0ROW1: 1,
  COL0ROW2: 2,
  COL0ROW3: 3,
  COL1ROW0: 4,
  COL1ROW1: 5,
  COL1ROW2: 6,
  COL1ROW3: 7,
  COL2ROW0: 8,
  COL2ROW1: 9,
  COL2ROW2: 10,
  COL2ROW3: 11,
  COL3ROW0: 12,
  COL3ROW1: 13,
  COL3ROW2: 14,
  COL3ROW3: 15
});
const constants = {};
class Matrix4 extends _base_matrix__WEBPACK_IMPORTED_MODULE_0__["default"] {
  static get IDENTITY() {
    constants.IDENTITY = constants.IDENTITY || Object.freeze(new Matrix4(IDENTITY));
    return constants.IDENTITY;
  }

  static get ZERO() {
    constants.ZERO = constants.ZERO || Object.freeze(new Matrix4(ZERO));
    return constants.ZERO;
  }

  get INDICES() {
    return INDICES;
  }

  get ELEMENTS() {
    return 16;
  }

  get RANK() {
    return 4;
  }

  constructor(array) {
    super(-0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0);

    if (arguments.length === 1 && Array.isArray(array)) {
      this.copy(array);
    } else {
      this.identity();
    }
  }

  copy(array) {
    this[0] = array[0];
    this[1] = array[1];
    this[2] = array[2];
    this[3] = array[3];
    this[4] = array[4];
    this[5] = array[5];
    this[6] = array[6];
    this[7] = array[7];
    this[8] = array[8];
    this[9] = array[9];
    this[10] = array[10];
    this[11] = array[11];
    this[12] = array[12];
    this[13] = array[13];
    this[14] = array[14];
    this[15] = array[15];
    return this.check();
  }

  set(m00, m10, m20, m30, m01, m11, m21, m31, m02, m12, m22, m32, m03, m13, m23, m33) {
    this[0] = m00;
    this[1] = m10;
    this[2] = m20;
    this[3] = m30;
    this[4] = m01;
    this[5] = m11;
    this[6] = m21;
    this[7] = m31;
    this[8] = m02;
    this[9] = m12;
    this[10] = m22;
    this[11] = m32;
    this[12] = m03;
    this[13] = m13;
    this[14] = m23;
    this[15] = m33;
    return this.check();
  }

  setRowMajor(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    this[0] = m00;
    this[1] = m10;
    this[2] = m20;
    this[3] = m30;
    this[4] = m01;
    this[5] = m11;
    this[6] = m21;
    this[7] = m31;
    this[8] = m02;
    this[9] = m12;
    this[10] = m22;
    this[11] = m32;
    this[12] = m03;
    this[13] = m13;
    this[14] = m23;
    this[15] = m33;
    return this.check();
  }

  toRowMajor(result) {
    result[0] = this[0];
    result[1] = this[4];
    result[2] = this[8];
    result[3] = this[12];
    result[4] = this[1];
    result[5] = this[5];
    result[6] = this[9];
    result[7] = this[13];
    result[8] = this[2];
    result[9] = this[6];
    result[10] = this[10];
    result[11] = this[14];
    result[12] = this[3];
    result[13] = this[7];
    result[14] = this[11];
    result[15] = this[15];
    return result;
  }

  identity() {
    return this.copy(IDENTITY);
  }

  fromQuaternion(q) {
    gl_matrix_mat4__WEBPACK_IMPORTED_MODULE_1__.fromQuat(this, q);
    return this.check();
  }

  frustum({
    left,
    right,
    bottom,
    top,
    near,
    far
  }) {
    if (far === Infinity) {
      Matrix4._computeInfinitePerspectiveOffCenter(this, left, right, bottom, top, near);
    } else {
      gl_matrix_mat4__WEBPACK_IMPORTED_MODULE_1__.frustum(this, left, right, bottom, top, near, far);
    }

    return this.check();
  }

  static _computeInfinitePerspectiveOffCenter(result, left, right, bottom, top, near) {
    const column0Row0 = 2.0 * near / (right - left);
    const column1Row1 = 2.0 * near / (top - bottom);
    const column2Row0 = (right + left) / (right - left);
    const column2Row1 = (top + bottom) / (top - bottom);
    const column2Row2 = -1.0;
    const column2Row3 = -1.0;
    const column3Row2 = -2.0 * near;
    result[0] = column0Row0;
    result[1] = 0.0;
    result[2] = 0.0;
    result[3] = 0.0;
    result[4] = 0.0;
    result[5] = column1Row1;
    result[6] = 0.0;
    result[7] = 0.0;
    result[8] = column2Row0;
    result[9] = column2Row1;
    result[10] = column2Row2;
    result[11] = column2Row3;
    result[12] = 0.0;
    result[13] = 0.0;
    result[14] = column3Row2;
    result[15] = 0.0;
    return result;
  }

  lookAt(eye, center, up) {
    if (arguments.length === 1) {
      ({
        eye,
        center,
        up
      } = eye);
    }

    center = center || [0, 0, 0];
    up = up || [0, 1, 0];
    gl_matrix_mat4__WEBPACK_IMPORTED_MODULE_1__.lookAt(this, eye, center, up);
    return this.check();
  }

  ortho({
    left,
    right,
    bottom,
    top,
    near = 0.1,
    far = 500
  }) {
    gl_matrix_mat4__WEBPACK_IMPORTED_MODULE_1__.ortho(this, left, right, bottom, top, near, far);
    return this.check();
  }

  orthographic({
    fovy = 45 * Math.PI / 180,
    aspect = 1,
    focalDistance = 1,
    near = 0.1,
    far = 500
  }) {
    if (fovy > Math.PI * 2) {
      throw Error('radians');
    }

    const halfY = fovy / 2;
    const top = focalDistance * Math.tan(halfY);
    const right = top * aspect;
    return new Matrix4().ortho({
      left: -right,
      right,
      bottom: -top,
      top,
      near,
      far
    });
  }

  perspective({
    fovy = undefined,
    fov = 45 * Math.PI / 180,
    aspect = 1,
    near = 0.1,
    far = 500
  } = {}) {
    fovy = fovy || fov;

    if (fovy > Math.PI * 2) {
      throw Error('radians');
    }

    gl_matrix_mat4__WEBPACK_IMPORTED_MODULE_1__.perspective(this, fovy, aspect, near, far);
    return this.check();
  }

  determinant() {
    return gl_matrix_mat4__WEBPACK_IMPORTED_MODULE_1__.determinant(this);
  }

  getScale(result = [-0, -0, -0]) {
    result[0] = Math.sqrt(this[0] * this[0] + this[1] * this[1] + this[2] * this[2]);
    result[1] = Math.sqrt(this[4] * this[4] + this[5] * this[5] + this[6] * this[6]);
    result[2] = Math.sqrt(this[8] * this[8] + this[9] * this[9] + this[10] * this[10]);
    return result;
  }

  getTranslation(result = [-0, -0, -0]) {
    result[0] = this[12];
    result[1] = this[13];
    result[2] = this[14];
    return result;
  }

  getRotation(result = [-0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0], scaleResult = null) {
    const scale = this.getScale(scaleResult || [-0, -0, -0]);
    const inverseScale0 = 1 / scale[0];
    const inverseScale1 = 1 / scale[1];
    const inverseScale2 = 1 / scale[2];
    result[0] = this[0] * inverseScale0;
    result[1] = this[1] * inverseScale1;
    result[2] = this[2] * inverseScale2;
    result[3] = 0;
    result[4] = this[4] * inverseScale0;
    result[5] = this[5] * inverseScale1;
    result[6] = this[6] * inverseScale2;
    result[7] = 0;
    result[8] = this[8] * inverseScale0;
    result[9] = this[9] * inverseScale1;
    result[10] = this[10] * inverseScale2;
    result[11] = 0;
    result[12] = 0;
    result[13] = 0;
    result[14] = 0;
    result[15] = 1;
    return result;
  }

  getRotationMatrix3(result = [-0, -0, -0, -0, -0, -0, -0, -0, -0], scaleResult = null) {
    const scale = this.getScale(scaleResult || [-0, -0, -0]);
    const inverseScale0 = 1 / scale[0];
    const inverseScale1 = 1 / scale[1];
    const inverseScale2 = 1 / scale[2];
    result[0] = this[0] * inverseScale0;
    result[1] = this[1] * inverseScale1;
    result[2] = this[2] * inverseScale2;
    result[3] = this[4] * inverseScale0;
    result[4] = this[5] * inverseScale1;
    result[5] = this[6] * inverseScale2;
    result[6] = this[8] * inverseScale0;
    result[7] = this[9] * inverseScale1;
    result[8] = this[10] * inverseScale2;
    return result;
  }

  transpose() {
    gl_matrix_mat4__WEBPACK_IMPORTED_MODULE_1__.transpose(this, this);
    return this.check();
  }

  invert() {
    gl_matrix_mat4__WEBPACK_IMPORTED_MODULE_1__.invert(this, this);
    return this.check();
  }

  multiplyLeft(a) {
    gl_matrix_mat4__WEBPACK_IMPORTED_MODULE_1__.multiply(this, a, this);
    return this.check();
  }

  multiplyRight(a) {
    gl_matrix_mat4__WEBPACK_IMPORTED_MODULE_1__.multiply(this, this, a);
    return this.check();
  }

  rotateX(radians) {
    gl_matrix_mat4__WEBPACK_IMPORTED_MODULE_1__.rotateX(this, this, radians);
    return this.check();
  }

  rotateY(radians) {
    gl_matrix_mat4__WEBPACK_IMPORTED_MODULE_1__.rotateY(this, this, radians);
    return this.check();
  }

  rotateZ(radians) {
    gl_matrix_mat4__WEBPACK_IMPORTED_MODULE_1__.rotateZ(this, this, radians);
    return this.check();
  }

  rotateXYZ([rx, ry, rz]) {
    return this.rotateX(rx).rotateY(ry).rotateZ(rz);
  }

  rotateAxis(radians, axis) {
    gl_matrix_mat4__WEBPACK_IMPORTED_MODULE_1__.rotate(this, this, radians, axis);
    return this.check();
  }

  scale(factor) {
    if (Array.isArray(factor)) {
      gl_matrix_mat4__WEBPACK_IMPORTED_MODULE_1__.scale(this, this, factor);
    } else {
      gl_matrix_mat4__WEBPACK_IMPORTED_MODULE_1__.scale(this, this, [factor, factor, factor]);
    }

    return this.check();
  }

  translate(vec) {
    gl_matrix_mat4__WEBPACK_IMPORTED_MODULE_1__.translate(this, this, vec);
    return this.check();
  }

  transform(vector, result) {
    if (vector.length === 4) {
      result = gl_matrix_vec4__WEBPACK_IMPORTED_MODULE_2__.transformMat4(result || [-0, -0, -0, -0], vector, this);
      (0,_lib_validators__WEBPACK_IMPORTED_MODULE_3__.checkVector)(result, 4);
      return result;
    }

    return this.transformAsPoint(vector, result);
  }

  transformAsPoint(vector, result) {
    const {
      length
    } = vector;

    switch (length) {
      case 2:
        result = gl_matrix_vec2__WEBPACK_IMPORTED_MODULE_4__.transformMat4(result || [-0, -0], vector, this);
        break;

      case 3:
        result = gl_matrix_vec3__WEBPACK_IMPORTED_MODULE_5__.transformMat4(result || [-0, -0, -0], vector, this);
        break;

      default:
        throw new Error('Illegal vector');
    }

    (0,_lib_validators__WEBPACK_IMPORTED_MODULE_3__.checkVector)(result, vector.length);
    return result;
  }

  transformAsVector(vector, result) {
    switch (vector.length) {
      case 2:
        result = (0,_lib_gl_matrix_extras__WEBPACK_IMPORTED_MODULE_6__.vec2_transformMat4AsVector)(result || [-0, -0], vector, this);
        break;

      case 3:
        result = (0,_lib_gl_matrix_extras__WEBPACK_IMPORTED_MODULE_6__.vec3_transformMat4AsVector)(result || [-0, -0, -0], vector, this);
        break;

      default:
        throw new Error('Illegal vector');
    }

    (0,_lib_validators__WEBPACK_IMPORTED_MODULE_3__.checkVector)(result, vector.length);
    return result;
  }

  makeRotationX(radians) {
    return this.identity().rotateX(radians);
  }

  makeTranslation(x, y, z) {
    return this.identity().translate([x, y, z]);
  }

  transformPoint(vector, result) {
    (0,_lib_validators__WEBPACK_IMPORTED_MODULE_3__.deprecated)('Matrix4.transformPoint', '3.0');
    return this.transformAsPoint(vector, result);
  }

  transformVector(vector, result) {
    (0,_lib_validators__WEBPACK_IMPORTED_MODULE_3__.deprecated)('Matrix4.transformVector', '3.0');
    return this.transformAsPoint(vector, result);
  }

  transformDirection(vector, result) {
    (0,_lib_validators__WEBPACK_IMPORTED_MODULE_3__.deprecated)('Matrix4.transformDirection', '3.0');
    return this.transformAsVector(vector, result);
  }

}
//# sourceMappingURL=matrix4.js.map

/***/ }),

/***/ "./node_modules/@math.gl/core/dist/esm/classes/vector3.js":
/*!****************************************************************!*\
  !*** ./node_modules/@math.gl/core/dist/esm/classes/vector3.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Vector3)
/* harmony export */ });
/* harmony import */ var _base_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base/vector */ "./node_modules/@math.gl/core/dist/esm/classes/base/vector.js");
/* harmony import */ var _lib_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/common */ "./node_modules/@math.gl/core/dist/esm/lib/common.js");
/* harmony import */ var _lib_validators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/validators */ "./node_modules/@math.gl/core/dist/esm/lib/validators.js");
/* harmony import */ var gl_matrix_vec3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gl-matrix/vec3 */ "./node_modules/gl-matrix/esm/vec3.js");
/* harmony import */ var _lib_gl_matrix_extras__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/gl-matrix-extras */ "./node_modules/@math.gl/core/dist/esm/lib/gl-matrix-extras.js");





const ORIGIN = [0, 0, 0];
const constants = {};
class Vector3 extends _base_vector__WEBPACK_IMPORTED_MODULE_0__["default"] {
  static get ZERO() {
    return constants.ZERO = constants.ZERO || Object.freeze(new Vector3(0, 0, 0, 0));
  }

  constructor(x = 0, y = 0, z = 0) {
    super(-0, -0, -0);

    if (arguments.length === 1 && (0,_lib_common__WEBPACK_IMPORTED_MODULE_1__.isArray)(x)) {
      this.copy(x);
    } else {
      if (_lib_common__WEBPACK_IMPORTED_MODULE_1__.config.debug) {
        (0,_lib_validators__WEBPACK_IMPORTED_MODULE_2__.checkNumber)(x);
        (0,_lib_validators__WEBPACK_IMPORTED_MODULE_2__.checkNumber)(y);
        (0,_lib_validators__WEBPACK_IMPORTED_MODULE_2__.checkNumber)(z);
      }

      this[0] = x;
      this[1] = y;
      this[2] = z;
    }
  }

  set(x, y, z) {
    this[0] = x;
    this[1] = y;
    this[2] = z;
    return this.check();
  }

  copy(array) {
    this[0] = array[0];
    this[1] = array[1];
    this[2] = array[2];
    return this.check();
  }

  fromObject(object) {
    if (_lib_common__WEBPACK_IMPORTED_MODULE_1__.config.debug) {
      (0,_lib_validators__WEBPACK_IMPORTED_MODULE_2__.checkNumber)(object.x);
      (0,_lib_validators__WEBPACK_IMPORTED_MODULE_2__.checkNumber)(object.y);
      (0,_lib_validators__WEBPACK_IMPORTED_MODULE_2__.checkNumber)(object.z);
    }

    this[0] = object.x;
    this[1] = object.y;
    this[2] = object.z;
    return this.check();
  }

  toObject(object) {
    object.x = this[0];
    object.y = this[1];
    object.z = this[2];
    return object;
  }

  get ELEMENTS() {
    return 3;
  }

  get z() {
    return this[2];
  }

  set z(value) {
    this[2] = (0,_lib_validators__WEBPACK_IMPORTED_MODULE_2__.checkNumber)(value);
  }

  angle(vector) {
    return gl_matrix_vec3__WEBPACK_IMPORTED_MODULE_3__.angle(this, vector);
  }

  cross(vector) {
    gl_matrix_vec3__WEBPACK_IMPORTED_MODULE_3__.cross(this, this, vector);
    return this.check();
  }

  rotateX({
    radians,
    origin = ORIGIN
  }) {
    gl_matrix_vec3__WEBPACK_IMPORTED_MODULE_3__.rotateX(this, this, origin, radians);
    return this.check();
  }

  rotateY({
    radians,
    origin = ORIGIN
  }) {
    gl_matrix_vec3__WEBPACK_IMPORTED_MODULE_3__.rotateY(this, this, origin, radians);
    return this.check();
  }

  rotateZ({
    radians,
    origin = ORIGIN
  }) {
    gl_matrix_vec3__WEBPACK_IMPORTED_MODULE_3__.rotateZ(this, this, origin, radians);
    return this.check();
  }

  transform(matrix4) {
    return this.transformAsPoint(matrix4);
  }

  transformAsPoint(matrix4) {
    gl_matrix_vec3__WEBPACK_IMPORTED_MODULE_3__.transformMat4(this, this, matrix4);
    return this.check();
  }

  transformAsVector(matrix4) {
    (0,_lib_gl_matrix_extras__WEBPACK_IMPORTED_MODULE_4__.vec3_transformMat4AsVector)(this, this, matrix4);
    return this.check();
  }

  transformByMatrix3(matrix3) {
    gl_matrix_vec3__WEBPACK_IMPORTED_MODULE_3__.transformMat3(this, this, matrix3);
    return this.check();
  }

  transformByMatrix2(matrix2) {
    (0,_lib_gl_matrix_extras__WEBPACK_IMPORTED_MODULE_4__.vec3_transformMat2)(this, this, matrix2);
    return this.check();
  }

  transformByQuaternion(quaternion) {
    gl_matrix_vec3__WEBPACK_IMPORTED_MODULE_3__.transformQuat(this, this, quaternion);
    return this.check();
  }

}
//# sourceMappingURL=vector3.js.map

/***/ }),

/***/ "./node_modules/@math.gl/core/dist/esm/lib/assert.js":
/*!***********************************************************!*\
  !*** ./node_modules/@math.gl/core/dist/esm/lib/assert.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ assert)
/* harmony export */ });
function assert(condition, message) {
  if (!condition) {
    throw new Error("math.gl assertion ".concat(message));
  }
}
//# sourceMappingURL=assert.js.map

/***/ }),

/***/ "./node_modules/@math.gl/core/dist/esm/lib/common.js":
/*!***********************************************************!*\
  !*** ./node_modules/@math.gl/core/dist/esm/lib/common.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config),
/* harmony export */   "configure": () => (/* binding */ configure),
/* harmony export */   "formatValue": () => (/* binding */ formatValue),
/* harmony export */   "isArray": () => (/* binding */ isArray),
/* harmony export */   "clone": () => (/* binding */ clone),
/* harmony export */   "toRadians": () => (/* binding */ toRadians),
/* harmony export */   "toDegrees": () => (/* binding */ toDegrees),
/* harmony export */   "radians": () => (/* binding */ radians),
/* harmony export */   "degrees": () => (/* binding */ degrees),
/* harmony export */   "sin": () => (/* binding */ sin),
/* harmony export */   "cos": () => (/* binding */ cos),
/* harmony export */   "tan": () => (/* binding */ tan),
/* harmony export */   "asin": () => (/* binding */ asin),
/* harmony export */   "acos": () => (/* binding */ acos),
/* harmony export */   "atan": () => (/* binding */ atan),
/* harmony export */   "clamp": () => (/* binding */ clamp),
/* harmony export */   "lerp": () => (/* binding */ lerp),
/* harmony export */   "equals": () => (/* binding */ equals),
/* harmony export */   "exactEquals": () => (/* binding */ exactEquals),
/* harmony export */   "withEpsilon": () => (/* binding */ withEpsilon)
/* harmony export */ });
/* harmony import */ var _assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assert */ "./node_modules/@math.gl/core/dist/esm/lib/assert.js");

const RADIANS_TO_DEGREES = 1 / Math.PI * 180;
const DEGREES_TO_RADIANS = 1 / 180 * Math.PI;
const config = {};
config.EPSILON = 1e-12;
config.debug = false;
config.precision = 4;
config.printTypes = false;
config.printDegrees = false;
config.printRowMajor = true;

function configure(options = {}) {
  for (const key in options) {
    (0,_assert__WEBPACK_IMPORTED_MODULE_0__["default"])(key in config);
    config[key] = options[key];
  }

  return config;
}

function round(value) {
  return Math.round(value / config.EPSILON) * config.EPSILON;
}

function formatValue(value, {
  precision = config.precision || 4
} = {}) {
  value = round(value);
  return "".concat(parseFloat(value.toPrecision(precision)));
}
function isArray(value) {
  return Array.isArray(value) || ArrayBuffer.isView(value) && !(value instanceof DataView);
}

function duplicateArray(array) {
  return array.clone ? array.clone() : new Array(array.length);
}

function clone(array) {
  return array.clone ? array.clone() : new Array(...array);
}

function map(value, func, result) {
  if (isArray(value)) {
    result = result || duplicateArray(value);

    for (let i = 0; i < result.length && i < value.length; ++i) {
      result[i] = func(value[i], i, result);
    }

    return result;
  }

  return func(value);
}

function toRadians(degrees) {
  return radians(degrees);
}
function toDegrees(radians) {
  return degrees(radians);
}
function radians(degrees, result) {
  return map(degrees, degrees => degrees * DEGREES_TO_RADIANS, result);
}
function degrees(radians, result) {
  return map(radians, radians => radians * RADIANS_TO_DEGREES, result);
}
function sin(radians) {
  return map(radians, angle => Math.sin(angle));
}
function cos(radians) {
  return map(radians, angle => Math.cos(angle));
}
function tan(radians) {
  return map(radians, angle => Math.tan(angle));
}
function asin(radians) {
  return map(radians, angle => Math.asin(angle));
}
function acos(radians) {
  return map(radians, angle => Math.acos(angle));
}
function atan(radians) {
  return map(radians, angle => Math.atan(angle));
}
function clamp(value, min, max) {
  return map(value, value => Math.max(min, Math.min(max, value)));
}
function lerp(a, b, t) {
  if (isArray(a)) {
    return a.map((ai, i) => lerp(ai, b[i], t));
  }

  return t * b + (1 - t) * a;
}
function equals(a, b, epsilon) {
  const oldEpsilon = config.EPSILON;

  if (epsilon) {
    config.EPSILON = epsilon;
  }

  try {
    if (a === b) {
      return true;
    }

    if (isArray(a) && isArray(b)) {
      if (a.length !== b.length) {
        return false;
      }

      for (let i = 0; i < a.length; ++i) {
        if (!equals(a[i], b[i])) {
          return false;
        }
      }

      return true;
    }

    if (a && a.equals) {
      return a.equals(b);
    }

    if (b && b.equals) {
      return b.equals(a);
    }

    if (Number.isFinite(a) && Number.isFinite(b)) {
      return Math.abs(a - b) <= config.EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
    }

    return false;
  } finally {
    config.EPSILON = oldEpsilon;
  }
}
function exactEquals(a, b) {
  if (a === b) {
    return true;
  }

  if (a && typeof a === 'object' && b && typeof b === 'object') {
    if (a.constructor !== b.constructor) {
      return false;
    }

    if (a.exactEquals) {
      return a.exactEquals(b);
    }
  }

  if (isArray(a) && isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }

    for (let i = 0; i < a.length; ++i) {
      if (!exactEquals(a[i], b[i])) {
        return false;
      }
    }

    return true;
  }

  return false;
}
function withEpsilon(EPSILON, func) {
  const oldPrecision = config.EPSILON;
  config.EPSILON = EPSILON;
  let value;

  try {
    value = func();
  } finally {
    config.EPSILON = oldPrecision;
  }

  return value;
}
//# sourceMappingURL=common.js.map

/***/ }),

/***/ "./node_modules/@math.gl/core/dist/esm/lib/gl-matrix-extras.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@math.gl/core/dist/esm/lib/gl-matrix-extras.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "vec2_transformMat4AsVector": () => (/* binding */ vec2_transformMat4AsVector),
/* harmony export */   "vec3_transformMat4AsVector": () => (/* binding */ vec3_transformMat4AsVector),
/* harmony export */   "vec3_transformMat2": () => (/* binding */ vec3_transformMat2),
/* harmony export */   "vec4_transformMat2": () => (/* binding */ vec4_transformMat2),
/* harmony export */   "vec4_transformMat3": () => (/* binding */ vec4_transformMat3)
/* harmony export */ });
function vec2_transformMat4AsVector(out, a, m) {
  const x = a[0];
  const y = a[1];
  const w = m[3] * x + m[7] * y || 1.0;
  out[0] = (m[0] * x + m[4] * y) / w;
  out[1] = (m[1] * x + m[5] * y) / w;
  return out;
}
function vec3_transformMat4AsVector(out, a, m) {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  const w = m[3] * x + m[7] * y + m[11] * z || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z) / w;
  return out;
}
function vec3_transformMat2(out, a, m) {
  const x = a[0];
  const y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  out[2] = a[2];
  return out;
}
function vec4_transformMat2(out, a, m) {
  const x = a[0];
  const y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
function vec4_transformMat3(out, a, m) {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  out[0] = m[0] * x + m[3] * y + m[6] * z;
  out[1] = m[1] * x + m[4] * y + m[7] * z;
  out[2] = m[2] * x + m[5] * y + m[8] * z;
  out[3] = a[3];
  return out;
}
//# sourceMappingURL=gl-matrix-extras.js.map

/***/ }),

/***/ "./node_modules/@math.gl/core/dist/esm/lib/validators.js":
/*!***************************************************************!*\
  !*** ./node_modules/@math.gl/core/dist/esm/lib/validators.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validateVector": () => (/* binding */ validateVector),
/* harmony export */   "checkNumber": () => (/* binding */ checkNumber),
/* harmony export */   "checkVector": () => (/* binding */ checkVector),
/* harmony export */   "deprecated": () => (/* binding */ deprecated)
/* harmony export */ });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ "./node_modules/@math.gl/core/dist/esm/lib/common.js");

function validateVector(v, length) {
  if (v.length !== length) {
    return false;
  }

  for (let i = 0; i < v.length; ++i) {
    if (!Number.isFinite(v[i])) {
      return false;
    }
  }

  return true;
}
function checkNumber(value) {
  if (!Number.isFinite(value)) {
    throw new Error("Invalid number ".concat(value));
  }

  return value;
}
function checkVector(v, length, callerName = '') {
  if (_common__WEBPACK_IMPORTED_MODULE_0__.config.debug && !validateVector(v, length)) {
    throw new Error("math.gl: ".concat(callerName, " some fields set to invalid numbers'"));
  }

  return v;
}
const map = {};
function deprecated(method, version) {
  if (!map[method]) {
    map[method] = true;
    console.warn("".concat(method, " has been removed in version ").concat(version, ", see upgrade guide for more information"));
  }
}
//# sourceMappingURL=validators.js.map

/***/ }),

/***/ "./node_modules/gl-matrix/esm/common.js":
/*!**********************************************!*\
  !*** ./node_modules/gl-matrix/esm/common.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EPSILON": () => (/* binding */ EPSILON),
/* harmony export */   "ARRAY_TYPE": () => (/* binding */ ARRAY_TYPE),
/* harmony export */   "RANDOM": () => (/* binding */ RANDOM),
/* harmony export */   "setMatrixArrayType": () => (/* binding */ setMatrixArrayType),
/* harmony export */   "toRadian": () => (/* binding */ toRadian),
/* harmony export */   "equals": () => (/* binding */ equals)
/* harmony export */ });
/**
 * Common utilities
 * @module glMatrix
 */
// Configuration Constants
var EPSILON = 0.000001;
var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
var RANDOM = Math.random;
/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Float32ArrayConstructor | ArrayConstructor} type Array type, such as Float32Array or Array
 */

function setMatrixArrayType(type) {
  ARRAY_TYPE = type;
}
var degree = Math.PI / 180;
/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */

function toRadian(a) {
  return a * degree;
}
/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */

function equals(a, b) {
  return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
}
if (!Math.hypot) Math.hypot = function () {
  var y = 0,
      i = arguments.length;

  while (i--) {
    y += arguments[i] * arguments[i];
  }

  return Math.sqrt(y);
};

/***/ }),

/***/ "./node_modules/gl-matrix/esm/mat4.js":
/*!********************************************!*\
  !*** ./node_modules/gl-matrix/esm/mat4.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "clone": () => (/* binding */ clone),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "fromValues": () => (/* binding */ fromValues),
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "identity": () => (/* binding */ identity),
/* harmony export */   "transpose": () => (/* binding */ transpose),
/* harmony export */   "invert": () => (/* binding */ invert),
/* harmony export */   "adjoint": () => (/* binding */ adjoint),
/* harmony export */   "determinant": () => (/* binding */ determinant),
/* harmony export */   "multiply": () => (/* binding */ multiply),
/* harmony export */   "translate": () => (/* binding */ translate),
/* harmony export */   "scale": () => (/* binding */ scale),
/* harmony export */   "rotate": () => (/* binding */ rotate),
/* harmony export */   "rotateX": () => (/* binding */ rotateX),
/* harmony export */   "rotateY": () => (/* binding */ rotateY),
/* harmony export */   "rotateZ": () => (/* binding */ rotateZ),
/* harmony export */   "fromTranslation": () => (/* binding */ fromTranslation),
/* harmony export */   "fromScaling": () => (/* binding */ fromScaling),
/* harmony export */   "fromRotation": () => (/* binding */ fromRotation),
/* harmony export */   "fromXRotation": () => (/* binding */ fromXRotation),
/* harmony export */   "fromYRotation": () => (/* binding */ fromYRotation),
/* harmony export */   "fromZRotation": () => (/* binding */ fromZRotation),
/* harmony export */   "fromRotationTranslation": () => (/* binding */ fromRotationTranslation),
/* harmony export */   "fromQuat2": () => (/* binding */ fromQuat2),
/* harmony export */   "getTranslation": () => (/* binding */ getTranslation),
/* harmony export */   "getScaling": () => (/* binding */ getScaling),
/* harmony export */   "getRotation": () => (/* binding */ getRotation),
/* harmony export */   "fromRotationTranslationScale": () => (/* binding */ fromRotationTranslationScale),
/* harmony export */   "fromRotationTranslationScaleOrigin": () => (/* binding */ fromRotationTranslationScaleOrigin),
/* harmony export */   "fromQuat": () => (/* binding */ fromQuat),
/* harmony export */   "frustum": () => (/* binding */ frustum),
/* harmony export */   "perspective": () => (/* binding */ perspective),
/* harmony export */   "perspectiveFromFieldOfView": () => (/* binding */ perspectiveFromFieldOfView),
/* harmony export */   "ortho": () => (/* binding */ ortho),
/* harmony export */   "lookAt": () => (/* binding */ lookAt),
/* harmony export */   "targetTo": () => (/* binding */ targetTo),
/* harmony export */   "str": () => (/* binding */ str),
/* harmony export */   "frob": () => (/* binding */ frob),
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "subtract": () => (/* binding */ subtract),
/* harmony export */   "multiplyScalar": () => (/* binding */ multiplyScalar),
/* harmony export */   "multiplyScalarAndAdd": () => (/* binding */ multiplyScalarAndAdd),
/* harmony export */   "exactEquals": () => (/* binding */ exactEquals),
/* harmony export */   "equals": () => (/* binding */ equals),
/* harmony export */   "mul": () => (/* binding */ mul),
/* harmony export */   "sub": () => (/* binding */ sub)
/* harmony export */ });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/esm/common.js");

/**
 * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
 * @module mat4
 */

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(16);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }

  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}
/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {ReadonlyMat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Create a new mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} A new mat4
 */

function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(16);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} out
 */

function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */

function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a12 = a[6],
        a13 = a[7];
    var a23 = a[11];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }

  return out;
}
/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}
/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function adjoint(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
  out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
  out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
  out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
  out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
  out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
  out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
  out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
  out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
  out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
  out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
  out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
  out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
  out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
  out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
  out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
  return out;
}
/**
 * Calculates the determinant of a mat4
 *
 * @param {ReadonlyMat4} a the source matrix
 * @returns {Number} determinant of a
 */

function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}
/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */

function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15]; // Cache only the current line of the second matrix

  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}
/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to translate
 * @param {ReadonlyVec3} v vector to translate by
 * @returns {mat4} out
 */

function translate(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;

  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;
    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }

  return out;
}
/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to scale
 * @param {ReadonlyVec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/

function scale(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {ReadonlyVec3} axis the axis to rotate around
 * @returns {mat4} out
 */

function rotate(out, a, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  var b00, b01, b02;
  var b10, b11, b12;
  var b20, b21, b22;

  if (len < _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  a00 = a[0];
  a01 = a[1];
  a02 = a[2];
  a03 = a[3];
  a10 = a[4];
  a11 = a[5];
  a12 = a[6];
  a13 = a[7];
  a20 = a[8];
  a21 = a[9];
  a22 = a[10];
  a23 = a[11]; // Construct the elements of the rotation matrix

  b00 = x * x * t + c;
  b01 = y * x * t + z * s;
  b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;
  b11 = y * y * t + c;
  b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;
  b21 = y * z * t - x * s;
  b22 = z * z * t + c; // Perform rotation-specific matrix multiplication

  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  return out;
}
/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateX(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out;
}
/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateY(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}
/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateZ(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out;
}
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyVec3} v Translation vector
 * @returns {mat4} out
 */

function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyVec3} v Scaling vector
 * @returns {mat4} out
 */

function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = v[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = v[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {ReadonlyVec3} axis the axis to rotate around
 * @returns {mat4} out
 */

function fromRotation(out, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;

  if (len < _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c; // Perform rotation-specific matrix multiplication

  out[0] = x * x * t + c;
  out[1] = y * x * t + z * s;
  out[2] = z * x * t - y * s;
  out[3] = 0;
  out[4] = x * y * t - z * s;
  out[5] = y * y * t + c;
  out[6] = z * y * t + x * s;
  out[7] = 0;
  out[8] = x * z * t + y * s;
  out[9] = y * z * t - x * s;
  out[10] = z * z * t + c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function fromXRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = c;
  out[6] = s;
  out[7] = 0;
  out[8] = 0;
  out[9] = -s;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function fromYRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = c;
  out[1] = 0;
  out[2] = -s;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = s;
  out[9] = 0;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function fromZRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = 0;
  out[4] = -s;
  out[5] = c;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @returns {mat4} out
 */

function fromRotationTranslation(out, q, v) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - (yy + zz);
  out[1] = xy + wz;
  out[2] = xz - wy;
  out[3] = 0;
  out[4] = xy - wz;
  out[5] = 1 - (xx + zz);
  out[6] = yz + wx;
  out[7] = 0;
  out[8] = xz + wy;
  out[9] = yz - wx;
  out[10] = 1 - (xx + yy);
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a new mat4 from a dual quat.
 *
 * @param {mat4} out Matrix
 * @param {ReadonlyQuat2} a Dual Quaternion
 * @returns {mat4} mat4 receiving operation result
 */

function fromQuat2(out, a) {
  var translation = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(3);
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7];
  var magnitude = bx * bx + by * by + bz * bz + bw * bw; //Only scale if it makes sense

  if (magnitude > 0) {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
  } else {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  }

  fromRotationTranslation(out, a, translation);
  return out;
}
/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */

function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];
  return out;
}
/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive scaling factor component
 * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */

function getScaling(out, mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  out[0] = Math.hypot(m11, m12, m13);
  out[1] = Math.hypot(m21, m22, m23);
  out[2] = Math.hypot(m31, m32, m33);
  return out;
}
/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */

function getRotation(out, mat) {
  var scaling = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(3);
  getScaling(scaling, mat);
  var is1 = 1 / scaling[0];
  var is2 = 1 / scaling[1];
  var is3 = 1 / scaling[2];
  var sm11 = mat[0] * is1;
  var sm12 = mat[1] * is2;
  var sm13 = mat[2] * is3;
  var sm21 = mat[4] * is1;
  var sm22 = mat[5] * is2;
  var sm23 = mat[6] * is3;
  var sm31 = mat[8] * is1;
  var sm32 = mat[9] * is2;
  var sm33 = mat[10] * is3;
  var trace = sm11 + sm22 + sm33;
  var S = 0;

  if (trace > 0) {
    S = Math.sqrt(trace + 1.0) * 2;
    out[3] = 0.25 * S;
    out[0] = (sm23 - sm32) / S;
    out[1] = (sm31 - sm13) / S;
    out[2] = (sm12 - sm21) / S;
  } else if (sm11 > sm22 && sm11 > sm33) {
    S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
    out[3] = (sm23 - sm32) / S;
    out[0] = 0.25 * S;
    out[1] = (sm12 + sm21) / S;
    out[2] = (sm31 + sm13) / S;
  } else if (sm22 > sm33) {
    S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
    out[3] = (sm31 - sm13) / S;
    out[0] = (sm12 + sm21) / S;
    out[1] = 0.25 * S;
    out[2] = (sm23 + sm32) / S;
  } else {
    S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
    out[3] = (sm12 - sm21) / S;
    out[0] = (sm31 + sm13) / S;
    out[1] = (sm23 + sm32) / S;
    out[2] = 0.25 * S;
  }

  return out;
}
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @param {ReadonlyVec3} s Scaling vector
 * @returns {mat4} out
 */

function fromRotationTranslationScale(out, q, v, s) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @param {ReadonlyVec3} s Scaling vector
 * @param {ReadonlyVec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */

function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  var ox = o[0];
  var oy = o[1];
  var oz = o[2];
  var out0 = (1 - (yy + zz)) * sx;
  var out1 = (xy + wz) * sx;
  var out2 = (xz - wy) * sx;
  var out4 = (xy - wz) * sy;
  var out5 = (1 - (xx + zz)) * sy;
  var out6 = (yz + wx) * sy;
  var out8 = (xz + wy) * sz;
  var out9 = (yz - wx) * sz;
  var out10 = (1 - (xx + yy)) * sz;
  out[0] = out0;
  out[1] = out1;
  out[2] = out2;
  out[3] = 0;
  out[4] = out4;
  out[5] = out5;
  out[6] = out6;
  out[7] = 0;
  out[8] = out8;
  out[9] = out9;
  out[10] = out10;
  out[11] = 0;
  out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
  out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
  out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
  out[15] = 1;
  return out;
}
/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyQuat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */

function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;
  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;
  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */

function frustum(out, left, right, bottom, top, near, far) {
  var rl = 1 / (right - left);
  var tb = 1 / (top - bottom);
  var nf = 1 / (near - far);
  out[0] = near * 2 * rl;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = near * 2 * tb;
  out[6] = 0;
  out[7] = 0;
  out[8] = (right + left) * rl;
  out[9] = (top + bottom) * tb;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near * 2 * nf;
  out[15] = 0;
  return out;
}
/**
 * Generates a perspective projection matrix with the given bounds.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum, can be null or Infinity
 * @returns {mat4} out
 */

function perspective(out, fovy, aspect, near, far) {
  var f = 1.0 / Math.tan(fovy / 2),
      nf;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;

  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = (far + near) * nf;
    out[14] = 2 * far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -2 * near;
  }

  return out;
}
/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */

function perspectiveFromFieldOfView(out, fov, near, far) {
  var upTan = Math.tan(fov.upDegrees * Math.PI / 180.0);
  var downTan = Math.tan(fov.downDegrees * Math.PI / 180.0);
  var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0);
  var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0);
  var xScale = 2.0 / (leftTan + rightTan);
  var yScale = 2.0 / (upTan + downTan);
  out[0] = xScale;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  out[4] = 0.0;
  out[5] = yScale;
  out[6] = 0.0;
  out[7] = 0.0;
  out[8] = -((leftTan - rightTan) * xScale * 0.5);
  out[9] = (upTan - downTan) * yScale * 0.5;
  out[10] = far / (near - far);
  out[11] = -1.0;
  out[12] = 0.0;
  out[13] = 0.0;
  out[14] = far * near / (near - far);
  out[15] = 0.0;
  return out;
}
/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */

function ortho(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}
/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis.
 * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {ReadonlyVec3} eye Position of the viewer
 * @param {ReadonlyVec3} center Point the viewer is looking at
 * @param {ReadonlyVec3} up vec3 pointing up
 * @returns {mat4} out
 */

function lookAt(out, eye, center, up) {
  var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
  var eyex = eye[0];
  var eyey = eye[1];
  var eyez = eye[2];
  var upx = up[0];
  var upy = up[1];
  var upz = up[2];
  var centerx = center[0];
  var centery = center[1];
  var centerz = center[2];

  if (Math.abs(eyex - centerx) < _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON && Math.abs(eyey - centery) < _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON && Math.abs(eyez - centerz) < _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON) {
    return identity(out);
  }

  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;
  len = 1 / Math.hypot(z0, z1, z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;
  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len = Math.hypot(x0, x1, x2);

  if (!len) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len = 1 / len;
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  len = Math.hypot(y0, y1, y2);

  if (!len) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len = 1 / len;
    y0 *= len;
    y1 *= len;
    y2 *= len;
  }

  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;
  return out;
}
/**
 * Generates a matrix that makes something look at something else.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {ReadonlyVec3} eye Position of the viewer
 * @param {ReadonlyVec3} center Point the viewer is looking at
 * @param {ReadonlyVec3} up vec3 pointing up
 * @returns {mat4} out
 */

function targetTo(out, eye, target, up) {
  var eyex = eye[0],
      eyey = eye[1],
      eyez = eye[2],
      upx = up[0],
      upy = up[1],
      upz = up[2];
  var z0 = eyex - target[0],
      z1 = eyey - target[1],
      z2 = eyez - target[2];
  var len = z0 * z0 + z1 * z1 + z2 * z2;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
    z0 *= len;
    z1 *= len;
    z2 *= len;
  }

  var x0 = upy * z2 - upz * z1,
      x1 = upz * z0 - upx * z2,
      x2 = upx * z1 - upy * z0;
  len = x0 * x0 + x1 * x1 + x2 * x2;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
}
/**
 * Returns a string representation of a mat4
 *
 * @param {ReadonlyMat4} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */

function str(a) {
  return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
}
/**
 * Returns Frobenius norm of a mat4
 *
 * @param {ReadonlyMat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */

function frob(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
}
/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */

function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}
/**
 * Adds two mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat4} out the receiving vector
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat4} out
 */

function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  out[6] = a[6] + b[6] * scale;
  out[7] = a[7] + b[7] * scale;
  out[8] = a[8] + b[8] * scale;
  out[9] = a[9] + b[9] * scale;
  out[10] = a[10] + b[10] * scale;
  out[11] = a[11] + b[11] * scale;
  out[12] = a[12] + b[12] * scale;
  out[13] = a[13] + b[13] * scale;
  out[14] = a[14] + b[14] * scale;
  out[15] = a[15] + b[15] * scale;
  return out;
}
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyMat4} a The first matrix.
 * @param {ReadonlyMat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {ReadonlyMat4} a The first matrix.
 * @param {ReadonlyMat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7];
  var a8 = a[8],
      a9 = a[9],
      a10 = a[10],
      a11 = a[11];
  var a12 = a[12],
      a13 = a[13],
      a14 = a[14],
      a15 = a[15];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  var b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7];
  var b8 = b[8],
      b9 = b[9],
      b10 = b[10],
      b11 = b[11];
  var b12 = b[12],
      b13 = b[13],
      b14 = b[14],
      b15 = b[15];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a15), Math.abs(b15));
}
/**
 * Alias for {@link mat4.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link mat4.subtract}
 * @function
 */

var sub = subtract;

/***/ }),

/***/ "./node_modules/gl-matrix/esm/vec2.js":
/*!********************************************!*\
  !*** ./node_modules/gl-matrix/esm/vec2.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "clone": () => (/* binding */ clone),
/* harmony export */   "fromValues": () => (/* binding */ fromValues),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "subtract": () => (/* binding */ subtract),
/* harmony export */   "multiply": () => (/* binding */ multiply),
/* harmony export */   "divide": () => (/* binding */ divide),
/* harmony export */   "ceil": () => (/* binding */ ceil),
/* harmony export */   "floor": () => (/* binding */ floor),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "round": () => (/* binding */ round),
/* harmony export */   "scale": () => (/* binding */ scale),
/* harmony export */   "scaleAndAdd": () => (/* binding */ scaleAndAdd),
/* harmony export */   "distance": () => (/* binding */ distance),
/* harmony export */   "squaredDistance": () => (/* binding */ squaredDistance),
/* harmony export */   "length": () => (/* binding */ length),
/* harmony export */   "squaredLength": () => (/* binding */ squaredLength),
/* harmony export */   "negate": () => (/* binding */ negate),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "normalize": () => (/* binding */ normalize),
/* harmony export */   "dot": () => (/* binding */ dot),
/* harmony export */   "cross": () => (/* binding */ cross),
/* harmony export */   "lerp": () => (/* binding */ lerp),
/* harmony export */   "random": () => (/* binding */ random),
/* harmony export */   "transformMat2": () => (/* binding */ transformMat2),
/* harmony export */   "transformMat2d": () => (/* binding */ transformMat2d),
/* harmony export */   "transformMat3": () => (/* binding */ transformMat3),
/* harmony export */   "transformMat4": () => (/* binding */ transformMat4),
/* harmony export */   "rotate": () => (/* binding */ rotate),
/* harmony export */   "angle": () => (/* binding */ angle),
/* harmony export */   "zero": () => (/* binding */ zero),
/* harmony export */   "str": () => (/* binding */ str),
/* harmony export */   "exactEquals": () => (/* binding */ exactEquals),
/* harmony export */   "equals": () => (/* binding */ equals),
/* harmony export */   "len": () => (/* binding */ len),
/* harmony export */   "sub": () => (/* binding */ sub),
/* harmony export */   "mul": () => (/* binding */ mul),
/* harmony export */   "div": () => (/* binding */ div),
/* harmony export */   "dist": () => (/* binding */ dist),
/* harmony export */   "sqrDist": () => (/* binding */ sqrDist),
/* harmony export */   "sqrLen": () => (/* binding */ sqrLen),
/* harmony export */   "forEach": () => (/* binding */ forEach)
/* harmony export */ });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/esm/common.js");

/**
 * 2 Dimensional Vector
 * @module vec2
 */

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(2);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }

  return out;
}
/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {ReadonlyVec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(2);
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */

function fromValues(x, y) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(2);
  out[0] = x;
  out[1] = y;
  return out;
}
/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the source vector
 * @returns {vec2} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */

function set(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}
/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}
/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out;
}
/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
}
/**
 * Math.ceil the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to ceil
 * @returns {vec2} out
 */

function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  return out;
}
/**
 * Math.floor the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to floor
 * @returns {vec2} out
 */

function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  return out;
}
/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  return out;
}
/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  return out;
}
/**
 * Math.round the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to round
 * @returns {vec2} out
 */

function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  return out;
}
/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */

function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
}
/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */

function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  return out;
}
/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {Number} distance between a and b
 */

function distance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return Math.hypot(x, y);
}
/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {Number} squared distance between a and b
 */

function squaredDistance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return x * x + y * y;
}
/**
 * Calculates the length of a vec2
 *
 * @param {ReadonlyVec2} a vector to calculate length of
 * @returns {Number} length of a
 */

function length(a) {
  var x = a[0],
      y = a[1];
  return Math.hypot(x, y);
}
/**
 * Calculates the squared length of a vec2
 *
 * @param {ReadonlyVec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */

function squaredLength(a) {
  var x = a[0],
      y = a[1];
  return x * x + y * y;
}
/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to negate
 * @returns {vec2} out
 */

function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  return out;
}
/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to invert
 * @returns {vec2} out
 */

function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
}
/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to normalize
 * @returns {vec2} out
 */

function normalize(out, a) {
  var x = a[0],
      y = a[1];
  var len = x * x + y * y;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  return out;
}
/**
 * Calculates the dot product of two vec2's
 *
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}
/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec3} out
 */

function cross(out, a, b) {
  var z = a[0] * b[1] - a[1] * b[0];
  out[0] = out[1] = 0;
  out[2] = z;
  return out;
}
/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec2} out
 */

function lerp(out, a, b, t) {
  var ax = a[0],
      ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out;
}
/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */

function random(out, scale) {
  scale = scale || 1.0;
  var r = _common_js__WEBPACK_IMPORTED_MODULE_0__.RANDOM() * 2.0 * Math.PI;
  out[0] = Math.cos(r) * scale;
  out[1] = Math.sin(r) * scale;
  return out;
}
/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat2} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat2(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  return out;
}
/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat2d} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat2d(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
}
/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat3} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
}
/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat4(out, a, m) {
  var x = a[0];
  var y = a[1];
  out[0] = m[0] * x + m[4] * y + m[12];
  out[1] = m[1] * x + m[5] * y + m[13];
  return out;
}
/**
 * Rotate a 2D vector
 * @param {vec2} out The receiving vec2
 * @param {ReadonlyVec2} a The vec2 point to rotate
 * @param {ReadonlyVec2} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec2} out
 */

function rotate(out, a, b, rad) {
  //Translate point to the origin
  var p0 = a[0] - b[0],
      p1 = a[1] - b[1],
      sinC = Math.sin(rad),
      cosC = Math.cos(rad); //perform rotation and translate to correct position

  out[0] = p0 * cosC - p1 * sinC + b[0];
  out[1] = p0 * sinC + p1 * cosC + b[1];
  return out;
}
/**
 * Get the angle between two 2D vectors
 * @param {ReadonlyVec2} a The first operand
 * @param {ReadonlyVec2} b The second operand
 * @returns {Number} The angle in radians
 */

function angle(a, b) {
  var x1 = a[0],
      y1 = a[1],
      x2 = b[0],
      y2 = b[1],
      // mag is the product of the magnitudes of a and b
  mag = Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2),
      // mag &&.. short circuits if mag == 0
  cosine = mag && (x1 * x2 + y1 * y2) / mag; // Math.min(Math.max(cosine, -1), 1) clamps the cosine between -1 and 1

  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
/**
 * Set the components of a vec2 to zero
 *
 * @param {vec2} out the receiving vector
 * @returns {vec2} out
 */

function zero(out) {
  out[0] = 0.0;
  out[1] = 0.0;
  return out;
}
/**
 * Returns a string representation of a vector
 *
 * @param {ReadonlyVec2} a vector to represent as a string
 * @returns {String} string representation of the vector
 */

function str(a) {
  return "vec2(" + a[0] + ", " + a[1] + ")";
}
/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyVec2} a The first vector.
 * @param {ReadonlyVec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {ReadonlyVec2} a The first vector.
 * @param {ReadonlyVec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1];
  var b0 = b[0],
      b1 = b[1];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1));
}
/**
 * Alias for {@link vec2.length}
 * @function
 */

var len = length;
/**
 * Alias for {@link vec2.subtract}
 * @function
 */

var sub = subtract;
/**
 * Alias for {@link vec2.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link vec2.divide}
 * @function
 */

var div = divide;
/**
 * Alias for {@link vec2.distance}
 * @function
 */

var dist = distance;
/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */

var sqrDist = squaredDistance;
/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */

var sqrLen = squaredLength;
/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

var forEach = function () {
  var vec = create();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 2;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
    }

    return a;
  };
}();

/***/ }),

/***/ "./node_modules/gl-matrix/esm/vec3.js":
/*!********************************************!*\
  !*** ./node_modules/gl-matrix/esm/vec3.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "clone": () => (/* binding */ clone),
/* harmony export */   "length": () => (/* binding */ length),
/* harmony export */   "fromValues": () => (/* binding */ fromValues),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "subtract": () => (/* binding */ subtract),
/* harmony export */   "multiply": () => (/* binding */ multiply),
/* harmony export */   "divide": () => (/* binding */ divide),
/* harmony export */   "ceil": () => (/* binding */ ceil),
/* harmony export */   "floor": () => (/* binding */ floor),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "round": () => (/* binding */ round),
/* harmony export */   "scale": () => (/* binding */ scale),
/* harmony export */   "scaleAndAdd": () => (/* binding */ scaleAndAdd),
/* harmony export */   "distance": () => (/* binding */ distance),
/* harmony export */   "squaredDistance": () => (/* binding */ squaredDistance),
/* harmony export */   "squaredLength": () => (/* binding */ squaredLength),
/* harmony export */   "negate": () => (/* binding */ negate),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "normalize": () => (/* binding */ normalize),
/* harmony export */   "dot": () => (/* binding */ dot),
/* harmony export */   "cross": () => (/* binding */ cross),
/* harmony export */   "lerp": () => (/* binding */ lerp),
/* harmony export */   "hermite": () => (/* binding */ hermite),
/* harmony export */   "bezier": () => (/* binding */ bezier),
/* harmony export */   "random": () => (/* binding */ random),
/* harmony export */   "transformMat4": () => (/* binding */ transformMat4),
/* harmony export */   "transformMat3": () => (/* binding */ transformMat3),
/* harmony export */   "transformQuat": () => (/* binding */ transformQuat),
/* harmony export */   "rotateX": () => (/* binding */ rotateX),
/* harmony export */   "rotateY": () => (/* binding */ rotateY),
/* harmony export */   "rotateZ": () => (/* binding */ rotateZ),
/* harmony export */   "angle": () => (/* binding */ angle),
/* harmony export */   "zero": () => (/* binding */ zero),
/* harmony export */   "str": () => (/* binding */ str),
/* harmony export */   "exactEquals": () => (/* binding */ exactEquals),
/* harmony export */   "equals": () => (/* binding */ equals),
/* harmony export */   "sub": () => (/* binding */ sub),
/* harmony export */   "mul": () => (/* binding */ mul),
/* harmony export */   "div": () => (/* binding */ div),
/* harmony export */   "dist": () => (/* binding */ dist),
/* harmony export */   "sqrDist": () => (/* binding */ sqrDist),
/* harmony export */   "len": () => (/* binding */ len),
/* harmony export */   "sqrLen": () => (/* binding */ sqrLen),
/* harmony export */   "forEach": () => (/* binding */ forEach)
/* harmony export */ });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/esm/common.js");

/**
 * 3 Dimensional Vector
 * @module vec3
 */

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(3);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }

  return out;
}
/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {ReadonlyVec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Calculates the length of a vec3
 *
 * @param {ReadonlyVec3} a vector to calculate length of
 * @returns {Number} length of a
 */

function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.hypot(x, y, z);
}
/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */

function fromValues(x, y, z) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the source vector
 * @returns {vec3} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */

function set(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}
/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}
/**
 * Math.ceil the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to ceil
 * @returns {vec3} out
 */

function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  return out;
}
/**
 * Math.floor the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to floor
 * @returns {vec3} out
 */

function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  return out;
}
/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
}
/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
}
/**
 * Math.round the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to round
 * @returns {vec3} out
 */

function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  return out;
}
/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */

function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}
/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */

function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  return out;
}
/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} distance between a and b
 */

function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return Math.hypot(x, y, z);
}
/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} squared distance between a and b
 */

function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return x * x + y * y + z * z;
}
/**
 * Calculates the squared length of a vec3
 *
 * @param {ReadonlyVec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */

function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return x * x + y * y + z * z;
}
/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to negate
 * @returns {vec3} out
 */

function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}
/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to invert
 * @returns {vec3} out
 */

function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
}
/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to normalize
 * @returns {vec3} out
 */

function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len = x * x + y * y + z * z;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  out[2] = a[2] * len;
  return out;
}
/**
 * Calculates the dot product of two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function cross(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2];
  var bx = b[0],
      by = b[1],
      bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */

function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}
/**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {ReadonlyVec3} c the third operand
 * @param {ReadonlyVec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */

function hermite(out, a, b, c, d, t) {
  var factorTimes2 = t * t;
  var factor1 = factorTimes2 * (2 * t - 3) + 1;
  var factor2 = factorTimes2 * (t - 2) + t;
  var factor3 = factorTimes2 * (t - 1);
  var factor4 = factorTimes2 * (3 - 2 * t);
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
/**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {ReadonlyVec3} c the third operand
 * @param {ReadonlyVec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */

function bezier(out, a, b, c, d, t) {
  var inverseFactor = 1 - t;
  var inverseFactorTimesTwo = inverseFactor * inverseFactor;
  var factorTimes2 = t * t;
  var factor1 = inverseFactorTimesTwo * inverseFactor;
  var factor2 = 3 * t * inverseFactorTimesTwo;
  var factor3 = 3 * factorTimes2 * inverseFactor;
  var factor4 = factorTimes2 * t;
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */

function random(out, scale) {
  scale = scale || 1.0;
  var r = _common_js__WEBPACK_IMPORTED_MODULE_0__.RANDOM() * 2.0 * Math.PI;
  var z = _common_js__WEBPACK_IMPORTED_MODULE_0__.RANDOM() * 2.0 - 1.0;
  var zScale = Math.sqrt(1.0 - z * z) * scale;
  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale;
  return out;
}
/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec3} out
 */

function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}
/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyMat3} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */

function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}
/**
 * Transforms the vec3 with a quat
 * Can also be used for dual quaternions. (Multiply it with the real part)
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyQuat} q quaternion to transform with
 * @returns {vec3} out
 */

function transformQuat(out, a, q) {
  // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3];
  var x = a[0],
      y = a[1],
      z = a[2]; // var qvec = [qx, qy, qz];
  // var uv = vec3.cross([], qvec, a);

  var uvx = qy * z - qz * y,
      uvy = qz * x - qx * z,
      uvz = qx * y - qy * x; // var uuv = vec3.cross([], qvec, uv);

  var uuvx = qy * uvz - qz * uvy,
      uuvy = qz * uvx - qx * uvz,
      uuvz = qx * uvy - qy * uvx; // vec3.scale(uv, uv, 2 * w);

  var w2 = qw * 2;
  uvx *= w2;
  uvy *= w2;
  uvz *= w2; // vec3.scale(uuv, uuv, 2);

  uuvx *= 2;
  uuvy *= 2;
  uuvz *= 2; // return vec3.add(out, a, vec3.add(out, uv, uuv));

  out[0] = x + uvx + uuvx;
  out[1] = y + uvy + uuvy;
  out[2] = z + uvz + uuvz;
  return out;
}
/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */

function rotateX(out, a, b, rad) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[0];
  r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
  r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad); //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */

function rotateY(out, a, b, rad) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad); //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */

function rotateZ(out, a, b, rad) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
  r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
  r[2] = p[2]; //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Get the angle between two 3D vectors
 * @param {ReadonlyVec3} a The first operand
 * @param {ReadonlyVec3} b The second operand
 * @returns {Number} The angle in radians
 */

function angle(a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2],
      bx = b[0],
      by = b[1],
      bz = b[2],
      mag1 = Math.sqrt(ax * ax + ay * ay + az * az),
      mag2 = Math.sqrt(bx * bx + by * by + bz * bz),
      mag = mag1 * mag2,
      cosine = mag && dot(a, b) / mag;
  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
/**
 * Set the components of a vec3 to zero
 *
 * @param {vec3} out the receiving vector
 * @returns {vec3} out
 */

function zero(out) {
  out[0] = 0.0;
  out[1] = 0.0;
  out[2] = 0.0;
  return out;
}
/**
 * Returns a string representation of a vector
 *
 * @param {ReadonlyVec3} a vector to represent as a string
 * @returns {String} string representation of the vector
 */

function str(a) {
  return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
}
/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyVec3} a The first vector.
 * @param {ReadonlyVec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {ReadonlyVec3} a The first vector.
 * @param {ReadonlyVec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2));
}
/**
 * Alias for {@link vec3.subtract}
 * @function
 */

var sub = subtract;
/**
 * Alias for {@link vec3.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link vec3.divide}
 * @function
 */

var div = divide;
/**
 * Alias for {@link vec3.distance}
 * @function
 */

var dist = distance;
/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */

var sqrDist = squaredDistance;
/**
 * Alias for {@link vec3.length}
 * @function
 */

var len = length;
/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */

var sqrLen = squaredLength;
/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

var forEach = function () {
  var vec = create();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 3;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
    }

    return a;
  };
}();

/***/ }),

/***/ "./node_modules/gl-matrix/esm/vec4.js":
/*!********************************************!*\
  !*** ./node_modules/gl-matrix/esm/vec4.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "clone": () => (/* binding */ clone),
/* harmony export */   "fromValues": () => (/* binding */ fromValues),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "subtract": () => (/* binding */ subtract),
/* harmony export */   "multiply": () => (/* binding */ multiply),
/* harmony export */   "divide": () => (/* binding */ divide),
/* harmony export */   "ceil": () => (/* binding */ ceil),
/* harmony export */   "floor": () => (/* binding */ floor),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "round": () => (/* binding */ round),
/* harmony export */   "scale": () => (/* binding */ scale),
/* harmony export */   "scaleAndAdd": () => (/* binding */ scaleAndAdd),
/* harmony export */   "distance": () => (/* binding */ distance),
/* harmony export */   "squaredDistance": () => (/* binding */ squaredDistance),
/* harmony export */   "length": () => (/* binding */ length),
/* harmony export */   "squaredLength": () => (/* binding */ squaredLength),
/* harmony export */   "negate": () => (/* binding */ negate),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "normalize": () => (/* binding */ normalize),
/* harmony export */   "dot": () => (/* binding */ dot),
/* harmony export */   "cross": () => (/* binding */ cross),
/* harmony export */   "lerp": () => (/* binding */ lerp),
/* harmony export */   "random": () => (/* binding */ random),
/* harmony export */   "transformMat4": () => (/* binding */ transformMat4),
/* harmony export */   "transformQuat": () => (/* binding */ transformQuat),
/* harmony export */   "zero": () => (/* binding */ zero),
/* harmony export */   "str": () => (/* binding */ str),
/* harmony export */   "exactEquals": () => (/* binding */ exactEquals),
/* harmony export */   "equals": () => (/* binding */ equals),
/* harmony export */   "sub": () => (/* binding */ sub),
/* harmony export */   "mul": () => (/* binding */ mul),
/* harmony export */   "div": () => (/* binding */ div),
/* harmony export */   "dist": () => (/* binding */ dist),
/* harmony export */   "sqrDist": () => (/* binding */ sqrDist),
/* harmony export */   "len": () => (/* binding */ len),
/* harmony export */   "sqrLen": () => (/* binding */ sqrLen),
/* harmony export */   "forEach": () => (/* binding */ forEach)
/* harmony export */ });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/esm/common.js");

/**
 * 4 Dimensional Vector
 * @module vec4
 */

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(4);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
  }

  return out;
}
/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {ReadonlyVec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */

function fromValues(x, y, z, w) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(4);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the source vector
 * @returns {vec4} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */

function set(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}
/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  out[3] = a[3] * b[3];
  return out;
}
/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  out[3] = a[3] / b[3];
  return out;
}
/**
 * Math.ceil the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to ceil
 * @returns {vec4} out
 */

function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  out[3] = Math.ceil(a[3]);
  return out;
}
/**
 * Math.floor the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to floor
 * @returns {vec4} out
 */

function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  out[3] = Math.floor(a[3]);
  return out;
}
/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  out[3] = Math.min(a[3], b[3]);
  return out;
}
/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  out[3] = Math.max(a[3], b[3]);
  return out;
}
/**
 * Math.round the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to round
 * @returns {vec4} out
 */

function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  out[3] = Math.round(a[3]);
  return out;
}
/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */

function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */

function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  return out;
}
/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} distance between a and b
 */

function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return Math.hypot(x, y, z, w);
}
/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} squared distance between a and b
 */

function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return x * x + y * y + z * z + w * w;
}
/**
 * Calculates the length of a vec4
 *
 * @param {ReadonlyVec4} a vector to calculate length of
 * @returns {Number} length of a
 */

function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return Math.hypot(x, y, z, w);
}
/**
 * Calculates the squared length of a vec4
 *
 * @param {ReadonlyVec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */

function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return x * x + y * y + z * z + w * w;
}
/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to negate
 * @returns {vec4} out
 */

function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = -a[3];
  return out;
}
/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to invert
 * @returns {vec4} out
 */

function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  out[3] = 1.0 / a[3];
  return out;
}
/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to normalize
 * @returns {vec4} out
 */

function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  var len = x * x + y * y + z * z + w * w;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }

  out[0] = x * len;
  out[1] = y * len;
  out[2] = z * len;
  out[3] = w * len;
  return out;
}
/**
 * Calculates the dot product of two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}
/**
 * Returns the cross-product of three vectors in a 4-dimensional space
 *
 * @param {ReadonlyVec4} result the receiving vector
 * @param {ReadonlyVec4} U the first vector
 * @param {ReadonlyVec4} V the second vector
 * @param {ReadonlyVec4} W the third vector
 * @returns {vec4} result
 */

function cross(out, u, v, w) {
  var A = v[0] * w[1] - v[1] * w[0],
      B = v[0] * w[2] - v[2] * w[0],
      C = v[0] * w[3] - v[3] * w[0],
      D = v[1] * w[2] - v[2] * w[1],
      E = v[1] * w[3] - v[3] * w[1],
      F = v[2] * w[3] - v[3] * w[2];
  var G = u[0];
  var H = u[1];
  var I = u[2];
  var J = u[3];
  out[0] = H * F - I * E + J * D;
  out[1] = -(G * F) + I * C - J * B;
  out[2] = G * E - H * C + J * A;
  out[3] = -(G * D) + H * B - I * A;
  return out;
}
/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec4} out
 */

function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  var aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
}
/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */

function random(out, scale) {
  scale = scale || 1.0; // Marsaglia, George. Choosing a Point from the Surface of a
  // Sphere. Ann. Math. Statist. 43 (1972), no. 2, 645--646.
  // http://projecteuclid.org/euclid.aoms/1177692644;

  var v1, v2, v3, v4;
  var s1, s2;

  do {
    v1 = _common_js__WEBPACK_IMPORTED_MODULE_0__.RANDOM() * 2 - 1;
    v2 = _common_js__WEBPACK_IMPORTED_MODULE_0__.RANDOM() * 2 - 1;
    s1 = v1 * v1 + v2 * v2;
  } while (s1 >= 1);

  do {
    v3 = _common_js__WEBPACK_IMPORTED_MODULE_0__.RANDOM() * 2 - 1;
    v4 = _common_js__WEBPACK_IMPORTED_MODULE_0__.RANDOM() * 2 - 1;
    s2 = v3 * v3 + v4 * v4;
  } while (s2 >= 1);

  var d = Math.sqrt((1 - s1) / s2);
  out[0] = scale * v1;
  out[1] = scale * v2;
  out[2] = scale * v3 * d;
  out[3] = scale * v4 * d;
  return out;
}
/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec4} out
 */

function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
  return out;
}
/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to transform
 * @param {ReadonlyQuat} q quaternion to transform with
 * @returns {vec4} out
 */

function transformQuat(out, a, q) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3]; // calculate quat * vec

  var ix = qw * x + qy * z - qz * y;
  var iy = qw * y + qz * x - qx * z;
  var iz = qw * z + qx * y - qy * x;
  var iw = -qx * x - qy * y - qz * z; // calculate result * inverse quat

  out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  out[3] = a[3];
  return out;
}
/**
 * Set the components of a vec4 to zero
 *
 * @param {vec4} out the receiving vector
 * @returns {vec4} out
 */

function zero(out) {
  out[0] = 0.0;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  return out;
}
/**
 * Returns a string representation of a vector
 *
 * @param {ReadonlyVec4} a vector to represent as a string
 * @returns {String} string representation of the vector
 */

function str(a) {
  return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyVec4} a The first vector.
 * @param {ReadonlyVec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {ReadonlyVec4} a The first vector.
 * @param {ReadonlyVec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));
}
/**
 * Alias for {@link vec4.subtract}
 * @function
 */

var sub = subtract;
/**
 * Alias for {@link vec4.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link vec4.divide}
 * @function
 */

var div = divide;
/**
 * Alias for {@link vec4.distance}
 * @function
 */

var dist = distance;
/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */

var sqrDist = squaredDistance;
/**
 * Alias for {@link vec4.length}
 * @function
 */

var len = length;
/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */

var sqrLen = squaredLength;
/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

var forEach = function () {
  var vec = create();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 4;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      vec[3] = a[i + 3];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
      a[i + 3] = vec[3];
    }

    return a;
  };
}();

/***/ }),

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

/***/ "./src/engine/profiler.ts":
/*!********************************!*\
  !*** ./src/engine/profiler.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createProfiler": () => (/* binding */ createProfiler),
/* harmony export */   "updateProfiler": () => (/* binding */ updateProfiler),
/* harmony export */   "start": () => (/* binding */ start),
/* harmony export */   "end": () => (/* binding */ end)
/* harmony export */ });
// somehow make a profiler that can get elapsed time or fps
const createProfiler = (displayFPS) => {
    const profiler = {
        delta: 0,
        accTime: 0,
        frames: 0,
    };
    if (displayFPS)
        setInterval(() => {
            // frames per time elapsed
            // console.log(profiler.frames / profiler.accTime);
            console.log(profiler.frames); // actual number of frames per second
            profiler.frames = 0;
            profiler.accTime = 0;
        }, 1000);
    return profiler;
};
const updateProfiler = (profiler, delta) => {
    profiler.accTime = profiler.accTime + delta;
    profiler.frames = profiler.frames + 1;
    profiler.delta = delta;
    return profiler;
};
const start = (profiler) => {
    profiler.delta = window.performance.now();
    return profiler;
};
const end = (profiler) => {
    profiler.delta = window.performance.now() - profiler.delta;
    return profiler;
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

/***/ "./src/engine/window.ts":
/*!******************************!*\
  !*** ./src/engine/window.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createWindow": () => (/* binding */ createWindow)
/* harmony export */ });
const createWindow = () => {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = "block";
    canvas.style.margin = "auto";
    canvas.onclick = () => {
        canvas.requestPointerLock();
    };
    document.body.appendChild(canvas);
    const gl = canvas.getContext("webgl2");
    if (!gl)
        throw new Error("Webgl couldn't instanciate");
    // baby blue clear color for a basic skybox
    gl.clearColor(0.537, 0.811, 0.941, 1.0);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    return gl;
};


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
/************************************************************************/
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
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _engine_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine/state */ "./src/engine/state.ts");
/* harmony import */ var _engine_profiler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./engine/profiler */ "./src/engine/profiler.ts");
/* harmony import */ var _engine_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./engine/window */ "./src/engine/window.ts");
/* harmony import */ var _example_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./example/index */ "./src/example/index.ts");
/**
import { createEntities, createComponents, Components, Entity, StaticRenderObjectComponent } from './state';
import { createSystems, addSystem, dispatch_event, System } from './system';
import { createPlayer, Player, projectionMatrix, freeCameraInput } from './player';
import { renderStaticObjects } from './render';
*/



const captureInput = (gl, state) => {
    window.onkeyup = (e) => {
        state.activeInput.delete(e.key.toLowerCase());
    };
    window.onkeydown = (e) => {
        state.activeInput.add(e.key.toLowerCase());
    };
    document.onmousemove = (e) => {
        state.mouseMovement = [e.movementX, e.movementY];
    };
    const lockChangeAlert = () => {
        if (document.pointerLockElement === gl.canvas)
            state.lock = true;
        else
            state.lock = false;
    };
    document.addEventListener('pointerlockchange', lockChangeAlert, false);
    return state;
};
const main = () => {
    if (!crossOriginIsolated) {
        alert("SharedArrayBuffer not enabled! Will not function.");
        return;
    }
    const gl = (0,_engine_window__WEBPACK_IMPORTED_MODULE_2__.createWindow)();
    let profiler = (0,_engine_profiler__WEBPACK_IMPORTED_MODULE_1__.createProfiler)(true); // boolean parameter: print or not
    // let dispatchProfiler = createProfiler(false);
    let state = create(gl);
    state = captureInput(gl, state);
    document.onclick = (e) => {
        state = (0,_engine_state__WEBPACK_IMPORTED_MODULE_0__.dispatch)(gl, state, "click", 0)(e);
    };
    let previousTime = -1;
    const gameloop = (time) => {
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
        // calc delta
        if (previousTime == -1)
            previousTime = time;
        const delta = (time - previousTime) * 0.001; // in seconds
        // flush events, need to figure a way to pass event data/how to structure event data
        while (state.queue.length != 0) {
            const event = state.queue.shift();
            if (event === undefined)
                continue;
            state = (0,_engine_state__WEBPACK_IMPORTED_MODULE_0__.dispatch)(gl, state, event.type, delta)(event.data);
        }
        // update frame
        state = (0,_engine_state__WEBPACK_IMPORTED_MODULE_0__.dispatch)(gl, state, "input", delta)(null);
        state = (0,_engine_state__WEBPACK_IMPORTED_MODULE_0__.dispatch)(gl, state, "tick", delta)(null);
        // profile this
        // dispatchProfiler = start(dispatchProfiler);
        state = (0,_engine_state__WEBPACK_IMPORTED_MODULE_0__.dispatch)(gl, state, "render", delta)(null);
        // dispatchProfiler = end(dispatchProfiler);
        // console.log(dispatchProfiler.delta);
        profiler = (0,_engine_profiler__WEBPACK_IMPORTED_MODULE_1__.updateProfiler)(profiler, delta);
        previousTime = time;
        requestAnimationFrame(gameloop);
    };
    requestAnimationFrame(gameloop);
};
window.addEventListener('load', main);

const create = (gl) => {
    // console.log(description);
    /*
    const atlas = "atlas.png";
    const player = createPlayer(gl, atlas);
  
    const entities   = createEntities();
    const components = createComponents();
    const systems    = createSystems();
  
    initMaze(gl, entities, components);
  
    addSystem(systems, "render", renderStaticObjects);
    addSystem(systems, "input",  freeCameraInput);
    */
    return (0,_example_index__WEBPACK_IMPORTED_MODULE_3__.init)(gl);
};
// The following was before the complete rewrite
const description = `
Some info about my project:

Controls mimic minecraft creative mode, 
just click in the window and then you 
should be able to fly around. Left clicking 
will remove blocks in front of you, up to 5 
blocks away.

The arena is generated randomly each time, 
so it'll be different if you refresh the page.

I used a very basic ecs system and laid the 
groundwork for an event system, but due to 
time constraints the code may resemble a plate
of spaghetti.

I coded this in typescript and used webpack to
compile the project into a simple bundle file.
I used math.gl/core so that I could use predefined
Vector3 and Matrix4 classes, specifically for the 
lookAt and perspective functions.

The texture atlas I used for the blocks is taken
from The Painterly Pack: http://painterlypack.net/.

I've also uploaded this project to my github incase 
I decide to work on it further.
`;

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBSSx1REFBTTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcko0RDtBQUN6QjtBQUM4RDtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNlLHNCQUFzQixvREFBTTtBQUMzQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUksb0RBQWE7QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsTUFBTTtBQUNOLE1BQU0sbURBQVk7QUFDbEI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjs7QUFFQTtBQUNBO0FBQ0EsSUFBSSxrREFBVztBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsSUFBSSxpREFBVTtBQUNkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLElBQUk7QUFDUjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSSx1REFBZ0I7QUFDcEI7QUFDQTs7QUFFQTtBQUNBLFdBQVcsdURBQWdCO0FBQzNCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUkscURBQWM7QUFDbEI7QUFDQTs7QUFFQTtBQUNBLElBQUks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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG9EQUFJO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcHAvLi9ub2RlX21vZHVsZXMvQG1hdGguZ2wvY29yZS9kaXN0L2VzbS9jbGFzc2VzL2Jhc2UvbWF0aC1hcnJheS5qcyIsIndlYnBhY2s6Ly9hcHAvLi9ub2RlX21vZHVsZXMvQG1hdGguZ2wvY29yZS9kaXN0L2VzbS9jbGFzc2VzL2Jhc2UvbWF0cml4LmpzIiwid2VicGFjazovL2FwcC8uL25vZGVfbW9kdWxlcy9AbWF0aC5nbC9jb3JlL2Rpc3QvZXNtL2NsYXNzZXMvYmFzZS92ZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYXBwLy4vbm9kZV9tb2R1bGVzL0BtYXRoLmdsL2NvcmUvZGlzdC9lc20vY2xhc3Nlcy9tYXRyaXg0LmpzIiwid2VicGFjazovL2FwcC8uL25vZGVfbW9kdWxlcy9AbWF0aC5nbC9jb3JlL2Rpc3QvZXNtL2NsYXNzZXMvdmVjdG9yMy5qcyIsIndlYnBhY2s6Ly9hcHAvLi9ub2RlX21vZHVsZXMvQG1hdGguZ2wvY29yZS9kaXN0L2VzbS9saWIvYXNzZXJ0LmpzIiwid2VicGFjazovL2FwcC8uL25vZGVfbW9kdWxlcy9AbWF0aC5nbC9jb3JlL2Rpc3QvZXNtL2xpYi9jb21tb24uanMiLCJ3ZWJwYWNrOi8vYXBwLy4vbm9kZV9tb2R1bGVzL0BtYXRoLmdsL2NvcmUvZGlzdC9lc20vbGliL2dsLW1hdHJpeC1leHRyYXMuanMiLCJ3ZWJwYWNrOi8vYXBwLy4vbm9kZV9tb2R1bGVzL0BtYXRoLmdsL2NvcmUvZGlzdC9lc20vbGliL3ZhbGlkYXRvcnMuanMiLCJ3ZWJwYWNrOi8vYXBwLy4vbm9kZV9tb2R1bGVzL2dsLW1hdHJpeC9lc20vY29tbW9uLmpzIiwid2VicGFjazovL2FwcC8uL25vZGVfbW9kdWxlcy9nbC1tYXRyaXgvZXNtL21hdDQuanMiLCJ3ZWJwYWNrOi8vYXBwLy4vbm9kZV9tb2R1bGVzL2dsLW1hdHJpeC9lc20vdmVjMi5qcyIsIndlYnBhY2s6Ly9hcHAvLi9ub2RlX21vZHVsZXMvZ2wtbWF0cml4L2VzbS92ZWMzLmpzIiwid2VicGFjazovL2FwcC8uL25vZGVfbW9kdWxlcy9nbC1tYXRyaXgvZXNtL3ZlYzQuanMiLCJ3ZWJwYWNrOi8vYXBwLy4vc3JjL2VuZ2luZS9lYy50cyIsIndlYnBhY2s6Ly9hcHAvLi9zcmMvZW5naW5lL2ZyZWVDYW1lcmEudHMiLCJ3ZWJwYWNrOi8vYXBwLy4vc3JjL2VuZ2luZS9wcm9maWxlci50cyIsIndlYnBhY2s6Ly9hcHAvLi9zcmMvZW5naW5lL3N0YXRlLnRzIiwid2VicGFjazovL2FwcC8uL3NyYy9lbmdpbmUvd2luZG93LnRzIiwid2VicGFjazovL2FwcC8uL3NyYy9leGFtcGxlL2NodW5rL2NodW5rLnRzIiwid2VicGFjazovL2FwcC8uL3NyYy9leGFtcGxlL2NodW5rL21lc2gudHMiLCJ3ZWJwYWNrOi8vYXBwLy4vc3JjL2V4YW1wbGUvZ2VuZXJhdGlvbi50cyIsIndlYnBhY2s6Ly9hcHAvLi9zcmMvZXhhbXBsZS9pbmRleC50cyIsIndlYnBhY2s6Ly9hcHAvLi9zcmMvZXhhbXBsZS9wbGF5ZXIudHMiLCJ3ZWJwYWNrOi8vYXBwLy4vc3JjL2V4YW1wbGUvcmVuZGVyLnRzIiwid2VicGFjazovL2FwcC8uL3NyYy9leGFtcGxlL3N5c3RlbXMvY2h1bmsudHMiLCJ3ZWJwYWNrOi8vYXBwLy4vc3JjL2V4YW1wbGUvc3lzdGVtcy9pbnB1dC50cyIsIndlYnBhY2s6Ly9hcHAvLi9zcmMvZXhhbXBsZS9zeXN0ZW1zL3dvcmxkLnRzIiwid2VicGFjazovL2FwcC8uL3NyYy9saWIvbWF0aC50cyIsIndlYnBhY2s6Ly9hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9hcHAvd2VicGFjay9ydW50aW1lL2dldCBqYXZhc2NyaXB0IGNodW5rIGZpbGVuYW1lIiwid2VicGFjazovL2FwcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2FwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2FwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2FwcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9hcHAvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYXBwLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIF9leHRlbmRhYmxlQnVpbHRpbihjbHMpIHtcbiAgZnVuY3Rpb24gRXh0ZW5kYWJsZUJ1aWx0aW4oKSB7XG4gICAgdmFyIGluc3RhbmNlID0gUmVmbGVjdC5jb25zdHJ1Y3QoY2xzLCBBcnJheS5mcm9tKGFyZ3VtZW50cykpO1xuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihpbnN0YW5jZSwgT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cblxuICBFeHRlbmRhYmxlQnVpbHRpbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKGNscy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IGNscyxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuXG4gIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoRXh0ZW5kYWJsZUJ1aWx0aW4sIGNscyk7XG4gIH0gZWxzZSB7XG4gICAgRXh0ZW5kYWJsZUJ1aWx0aW4uX19wcm90b19fID0gY2xzO1xuICB9XG5cbiAgcmV0dXJuIEV4dGVuZGFibGVCdWlsdGluO1xufVxuXG5pbXBvcnQgeyBjb25maWcsIGZvcm1hdFZhbHVlLCBlcXVhbHMsIGlzQXJyYXkgfSBmcm9tICcuLi8uLi9saWIvY29tbW9uJztcbmltcG9ydCBhc3NlcnQgZnJvbSAnLi4vLi4vbGliL2Fzc2VydCc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXRoQXJyYXkgZXh0ZW5kcyBfZXh0ZW5kYWJsZUJ1aWx0aW4oQXJyYXkpIHtcbiAgZ2V0IEVMRU1FTlRTKCkge1xuICAgIGFzc2VydChmYWxzZSk7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IoKS5jb3B5KHRoaXMpO1xuICB9XG5cbiAgZnJvbShhcnJheU9yT2JqZWN0KSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXJyYXlPck9iamVjdCkgPyB0aGlzLmNvcHkoYXJyYXlPck9iamVjdCkgOiB0aGlzLmZyb21PYmplY3QoYXJyYXlPck9iamVjdCk7XG4gIH1cblxuICBmcm9tQXJyYXkoYXJyYXksIG9mZnNldCA9IDApIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuRUxFTUVOVFM7ICsraSkge1xuICAgICAgdGhpc1tpXSA9IGFycmF5W2kgKyBvZmZzZXRdO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNoZWNrKCk7XG4gIH1cblxuICB0byhhcnJheU9yT2JqZWN0KSB7XG4gICAgaWYgKGFycmF5T3JPYmplY3QgPT09IHRoaXMpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJldHVybiBpc0FycmF5KGFycmF5T3JPYmplY3QpID8gdGhpcy50b0FycmF5KGFycmF5T3JPYmplY3QpIDogdGhpcy50b09iamVjdChhcnJheU9yT2JqZWN0KTtcbiAgfVxuXG4gIHRvVGFyZ2V0KHRhcmdldCkge1xuICAgIHJldHVybiB0YXJnZXQgPyB0aGlzLnRvKHRhcmdldCkgOiB0aGlzO1xuICB9XG5cbiAgdG9BcnJheShhcnJheSA9IFtdLCBvZmZzZXQgPSAwKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLkVMRU1FTlRTOyArK2kpIHtcbiAgICAgIGFycmF5W29mZnNldCArIGldID0gdGhpc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXk7XG4gIH1cblxuICB0b0Zsb2F0MzJBcnJheSgpIHtcbiAgICByZXR1cm4gbmV3IEZsb2F0MzJBcnJheSh0aGlzKTtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLmZvcm1hdFN0cmluZyhjb25maWcpO1xuICB9XG5cbiAgZm9ybWF0U3RyaW5nKG9wdHMpIHtcbiAgICBsZXQgc3RyaW5nID0gJyc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuRUxFTUVOVFM7ICsraSkge1xuICAgICAgc3RyaW5nICs9IChpID4gMCA/ICcsICcgOiAnJykgKyBmb3JtYXRWYWx1ZSh0aGlzW2ldLCBvcHRzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gXCJcIi5jb25jYXQob3B0cy5wcmludFR5cGVzID8gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lIDogJycsIFwiW1wiKS5jb25jYXQoc3RyaW5nLCBcIl1cIik7XG4gIH1cblxuICBlcXVhbHMoYXJyYXkpIHtcbiAgICBpZiAoIWFycmF5IHx8IHRoaXMubGVuZ3RoICE9PSBhcnJheS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuRUxFTUVOVFM7ICsraSkge1xuICAgICAgaWYgKCFlcXVhbHModGhpc1tpXSwgYXJyYXlbaV0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGV4YWN0RXF1YWxzKGFycmF5KSB7XG4gICAgaWYgKCFhcnJheSB8fCB0aGlzLmxlbmd0aCAhPT0gYXJyYXkubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLkVMRU1FTlRTOyArK2kpIHtcbiAgICAgIGlmICh0aGlzW2ldICE9PSBhcnJheVtpXSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBuZWdhdGUoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLkVMRU1FTlRTOyArK2kpIHtcbiAgICAgIHRoaXNbaV0gPSAtdGhpc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgbGVycChhLCBiLCB0KSB7XG4gICAgaWYgKHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdCA9IGI7XG4gICAgICBiID0gYTtcbiAgICAgIGEgPSB0aGlzO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5FTEVNRU5UUzsgKytpKSB7XG4gICAgICBjb25zdCBhaSA9IGFbaV07XG4gICAgICB0aGlzW2ldID0gYWkgKyB0ICogKGJbaV0gLSBhaSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIG1pbih2ZWN0b3IpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuRUxFTUVOVFM7ICsraSkge1xuICAgICAgdGhpc1tpXSA9IE1hdGgubWluKHZlY3RvcltpXSwgdGhpc1tpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIG1heCh2ZWN0b3IpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuRUxFTUVOVFM7ICsraSkge1xuICAgICAgdGhpc1tpXSA9IE1hdGgubWF4KHZlY3RvcltpXSwgdGhpc1tpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIGNsYW1wKG1pblZlY3RvciwgbWF4VmVjdG9yKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLkVMRU1FTlRTOyArK2kpIHtcbiAgICAgIHRoaXNbaV0gPSBNYXRoLm1pbihNYXRoLm1heCh0aGlzW2ldLCBtaW5WZWN0b3JbaV0pLCBtYXhWZWN0b3JbaV0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNoZWNrKCk7XG4gIH1cblxuICBhZGQoLi4udmVjdG9ycykge1xuICAgIGZvciAoY29uc3QgdmVjdG9yIG9mIHZlY3RvcnMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5FTEVNRU5UUzsgKytpKSB7XG4gICAgICAgIHRoaXNbaV0gKz0gdmVjdG9yW2ldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNoZWNrKCk7XG4gIH1cblxuICBzdWJ0cmFjdCguLi52ZWN0b3JzKSB7XG4gICAgZm9yIChjb25zdCB2ZWN0b3Igb2YgdmVjdG9ycykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLkVMRU1FTlRTOyArK2kpIHtcbiAgICAgICAgdGhpc1tpXSAtPSB2ZWN0b3JbaV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIHNjYWxlKHNjYWxlKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc2NhbGUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5tdWx0aXBseShzY2FsZSk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLkVMRU1FTlRTOyArK2kpIHtcbiAgICAgIHRoaXNbaV0gKj0gc2NhbGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIHN1YihhKSB7XG4gICAgcmV0dXJuIHRoaXMuc3VidHJhY3QoYSk7XG4gIH1cblxuICBzZXRTY2FsYXIoYSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5FTEVNRU5UUzsgKytpKSB7XG4gICAgICB0aGlzW2ldID0gYTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgYWRkU2NhbGFyKGEpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuRUxFTUVOVFM7ICsraSkge1xuICAgICAgdGhpc1tpXSArPSBhO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNoZWNrKCk7XG4gIH1cblxuICBzdWJTY2FsYXIoYSkge1xuICAgIHJldHVybiB0aGlzLmFkZFNjYWxhcigtYSk7XG4gIH1cblxuICBtdWx0aXBseVNjYWxhcihzY2FsYXIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuRUxFTUVOVFM7ICsraSkge1xuICAgICAgdGhpc1tpXSAqPSBzY2FsYXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIGRpdmlkZVNjYWxhcihhKSB7XG4gICAgcmV0dXJuIHRoaXMuc2NhbGUoMSAvIGEpO1xuICB9XG5cbiAgY2xhbXBTY2FsYXIobWluLCBtYXgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuRUxFTUVOVFM7ICsraSkge1xuICAgICAgdGhpc1tpXSA9IE1hdGgubWluKE1hdGgubWF4KHRoaXNbaV0sIG1pbiksIG1heCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIG11bHRpcGx5QnlTY2FsYXIoc2NhbGFyKSB7XG4gICAgcmV0dXJuIHRoaXMuc2NhbGUoc2NhbGFyKTtcbiAgfVxuXG4gIGdldCBlbGVtZW50cygpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNoZWNrKCkge1xuICAgIGlmIChjb25maWcuZGVidWcgJiYgIXRoaXMudmFsaWRhdGUoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwibWF0aC5nbDogXCIuY29uY2F0KHRoaXMuY29uc3RydWN0b3IubmFtZSwgXCIgc29tZSBmaWVsZHMgc2V0IHRvIGludmFsaWQgbnVtYmVycydcIikpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdmFsaWRhdGUoKSB7XG4gICAgbGV0IHZhbGlkID0gdGhpcy5sZW5ndGggPT09IHRoaXMuRUxFTUVOVFM7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuRUxFTUVOVFM7ICsraSkge1xuICAgICAgdmFsaWQgPSB2YWxpZCAmJiBOdW1iZXIuaXNGaW5pdGUodGhpc1tpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkO1xuICB9XG5cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hdGgtYXJyYXkuanMubWFwIiwiaW1wb3J0IE1hdGhBcnJheSBmcm9tICcuL21hdGgtYXJyYXknO1xuaW1wb3J0IHsgY2hlY2tOdW1iZXIgfSBmcm9tICcuLi8uLi9saWIvdmFsaWRhdG9ycyc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuLi8uLi9saWIvY29tbW9uJztcbmltcG9ydCBhc3NlcnQgZnJvbSAnLi4vLi4vbGliL2Fzc2VydCc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXRyaXggZXh0ZW5kcyBNYXRoQXJyYXkge1xuICBnZXQgRUxFTUVOVFMoKSB7XG4gICAgYXNzZXJ0KGZhbHNlKTtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGdldCBSQU5LKCkge1xuICAgIGFzc2VydChmYWxzZSk7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICBsZXQgc3RyaW5nID0gJ1snO1xuXG4gICAgaWYgKGNvbmZpZy5wcmludFJvd01ham9yKSB7XG4gICAgICBzdHJpbmcgKz0gJ3Jvdy1tYWpvcjonO1xuXG4gICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCB0aGlzLlJBTks7ICsrcm93KSB7XG4gICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IHRoaXMuUkFOSzsgKytjb2wpIHtcbiAgICAgICAgICBzdHJpbmcgKz0gXCIgXCIuY29uY2F0KHRoaXNbY29sICogdGhpcy5SQU5LICsgcm93XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3RyaW5nICs9ICdjb2x1bW4tbWFqb3I6JztcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLkVMRU1FTlRTOyArK2kpIHtcbiAgICAgICAgc3RyaW5nICs9IFwiIFwiLmNvbmNhdCh0aGlzW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdHJpbmcgKz0gJ10nO1xuICAgIHJldHVybiBzdHJpbmc7XG4gIH1cblxuICBnZXRFbGVtZW50SW5kZXgocm93LCBjb2wpIHtcbiAgICByZXR1cm4gY29sICogdGhpcy5SQU5LICsgcm93O1xuICB9XG5cbiAgZ2V0RWxlbWVudChyb3csIGNvbCkge1xuICAgIHJldHVybiB0aGlzW2NvbCAqIHRoaXMuUkFOSyArIHJvd107XG4gIH1cblxuICBzZXRFbGVtZW50KHJvdywgY29sLCB2YWx1ZSkge1xuICAgIHRoaXNbY29sICogdGhpcy5SQU5LICsgcm93XSA9IGNoZWNrTnVtYmVyKHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldENvbHVtbihjb2x1bW5JbmRleCwgcmVzdWx0ID0gbmV3IEFycmF5KHRoaXMuUkFOSykuZmlsbCgtMCkpIHtcbiAgICBjb25zdCBmaXJzdEluZGV4ID0gY29sdW1uSW5kZXggKiB0aGlzLlJBTks7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuUkFOSzsgKytpKSB7XG4gICAgICByZXN1bHRbaV0gPSB0aGlzW2ZpcnN0SW5kZXggKyBpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgc2V0Q29sdW1uKGNvbHVtbkluZGV4LCBjb2x1bW5WZWN0b3IpIHtcbiAgICBjb25zdCBmaXJzdEluZGV4ID0gY29sdW1uSW5kZXggKiB0aGlzLlJBTks7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuUkFOSzsgKytpKSB7XG4gICAgICB0aGlzW2ZpcnN0SW5kZXggKyBpXSA9IGNvbHVtblZlY3RvcltpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXRyaXguanMubWFwIiwiaW1wb3J0IE1hdGhBcnJheSBmcm9tICcuL21hdGgtYXJyYXknO1xuaW1wb3J0IHsgY2hlY2tOdW1iZXIgfSBmcm9tICcuLi8uLi9saWIvdmFsaWRhdG9ycyc7XG5pbXBvcnQgYXNzZXJ0IGZyb20gJy4uLy4uL2xpYi9hc3NlcnQnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yIGV4dGVuZHMgTWF0aEFycmF5IHtcbiAgZ2V0IEVMRU1FTlRTKCkge1xuICAgIGFzc2VydChmYWxzZSk7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBjb3B5KHZlY3Rvcikge1xuICAgIGFzc2VydChmYWxzZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQgeCgpIHtcbiAgICByZXR1cm4gdGhpc1swXTtcbiAgfVxuXG4gIHNldCB4KHZhbHVlKSB7XG4gICAgdGhpc1swXSA9IGNoZWNrTnVtYmVyKHZhbHVlKTtcbiAgfVxuXG4gIGdldCB5KCkge1xuICAgIHJldHVybiB0aGlzWzFdO1xuICB9XG5cbiAgc2V0IHkodmFsdWUpIHtcbiAgICB0aGlzWzFdID0gY2hlY2tOdW1iZXIodmFsdWUpO1xuICB9XG5cbiAgbGVuKCkge1xuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5sZW5ndGhTcXVhcmVkKCkpO1xuICB9XG5cbiAgbWFnbml0dWRlKCkge1xuICAgIHJldHVybiB0aGlzLmxlbigpO1xuICB9XG5cbiAgbGVuZ3RoU3F1YXJlZCgpIHtcbiAgICBsZXQgbGVuZ3RoID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5FTEVNRU5UUzsgKytpKSB7XG4gICAgICBsZW5ndGggKz0gdGhpc1tpXSAqIHRoaXNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGxlbmd0aDtcbiAgfVxuXG4gIG1hZ25pdHVkZVNxdWFyZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMubGVuZ3RoU3F1YXJlZCgpO1xuICB9XG5cbiAgZGlzdGFuY2UobWF0aEFycmF5KSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmRpc3RhbmNlU3F1YXJlZChtYXRoQXJyYXkpKTtcbiAgfVxuXG4gIGRpc3RhbmNlU3F1YXJlZChtYXRoQXJyYXkpIHtcbiAgICBsZXQgbGVuZ3RoID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5FTEVNRU5UUzsgKytpKSB7XG4gICAgICBjb25zdCBkaXN0ID0gdGhpc1tpXSAtIG1hdGhBcnJheVtpXTtcbiAgICAgIGxlbmd0aCArPSBkaXN0ICogZGlzdDtcbiAgICB9XG5cbiAgICByZXR1cm4gY2hlY2tOdW1iZXIobGVuZ3RoKTtcbiAgfVxuXG4gIGRvdChtYXRoQXJyYXkpIHtcbiAgICBsZXQgcHJvZHVjdCA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuRUxFTUVOVFM7ICsraSkge1xuICAgICAgcHJvZHVjdCArPSB0aGlzW2ldICogbWF0aEFycmF5W2ldO1xuICAgIH1cblxuICAgIHJldHVybiBjaGVja051bWJlcihwcm9kdWN0KTtcbiAgfVxuXG4gIG5vcm1hbGl6ZSgpIHtcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLm1hZ25pdHVkZSgpO1xuXG4gICAgaWYgKGxlbmd0aCAhPT0gMCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLkVMRU1FTlRTOyArK2kpIHtcbiAgICAgICAgdGhpc1tpXSAvPSBsZW5ndGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIG11bHRpcGx5KC4uLnZlY3RvcnMpIHtcbiAgICBmb3IgKGNvbnN0IHZlY3RvciBvZiB2ZWN0b3JzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuRUxFTUVOVFM7ICsraSkge1xuICAgICAgICB0aGlzW2ldICo9IHZlY3RvcltpXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgZGl2aWRlKC4uLnZlY3RvcnMpIHtcbiAgICBmb3IgKGNvbnN0IHZlY3RvciBvZiB2ZWN0b3JzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuRUxFTUVOVFM7ICsraSkge1xuICAgICAgICB0aGlzW2ldIC89IHZlY3RvcltpXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgbGVuZ3RoU3EoKSB7XG4gICAgcmV0dXJuIHRoaXMubGVuZ3RoU3F1YXJlZCgpO1xuICB9XG5cbiAgZGlzdGFuY2VUbyh2ZWN0b3IpIHtcbiAgICByZXR1cm4gdGhpcy5kaXN0YW5jZSh2ZWN0b3IpO1xuICB9XG5cbiAgZGlzdGFuY2VUb1NxdWFyZWQodmVjdG9yKSB7XG4gICAgcmV0dXJuIHRoaXMuZGlzdGFuY2VTcXVhcmVkKHZlY3Rvcik7XG4gIH1cblxuICBnZXRDb21wb25lbnQoaSkge1xuICAgIGFzc2VydChpID49IDAgJiYgaSA8IHRoaXMuRUxFTUVOVFMsICdpbmRleCBpcyBvdXQgb2YgcmFuZ2UnKTtcbiAgICByZXR1cm4gY2hlY2tOdW1iZXIodGhpc1tpXSk7XG4gIH1cblxuICBzZXRDb21wb25lbnQoaSwgdmFsdWUpIHtcbiAgICBhc3NlcnQoaSA+PSAwICYmIGkgPCB0aGlzLkVMRU1FTlRTLCAnaW5kZXggaXMgb3V0IG9mIHJhbmdlJyk7XG4gICAgdGhpc1tpXSA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzLmNoZWNrKCk7XG4gIH1cblxuICBhZGRWZWN0b3JzKGEsIGIpIHtcbiAgICByZXR1cm4gdGhpcy5jb3B5KGEpLmFkZChiKTtcbiAgfVxuXG4gIHN1YlZlY3RvcnMoYSwgYikge1xuICAgIHJldHVybiB0aGlzLmNvcHkoYSkuc3VidHJhY3QoYik7XG4gIH1cblxuICBtdWx0aXBseVZlY3RvcnMoYSwgYikge1xuICAgIHJldHVybiB0aGlzLmNvcHkoYSkubXVsdGlwbHkoYik7XG4gIH1cblxuICBhZGRTY2FsZWRWZWN0b3IoYSwgYikge1xuICAgIHJldHVybiB0aGlzLmFkZChuZXcgdGhpcy5jb25zdHJ1Y3RvcihhKS5tdWx0aXBseVNjYWxhcihiKSk7XG4gIH1cblxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dmVjdG9yLmpzLm1hcCIsImltcG9ydCB7IGNoZWNrVmVjdG9yLCBkZXByZWNhdGVkIH0gZnJvbSAnLi4vbGliL3ZhbGlkYXRvcnMnO1xuaW1wb3J0IE1hdHJpeCBmcm9tICcuL2Jhc2UvbWF0cml4JztcbmltcG9ydCB7IHZlYzJfdHJhbnNmb3JtTWF0NEFzVmVjdG9yLCB2ZWMzX3RyYW5zZm9ybU1hdDRBc1ZlY3RvciB9IGZyb20gJy4uL2xpYi9nbC1tYXRyaXgtZXh0cmFzJztcbmltcG9ydCAqIGFzIG1hdDQgZnJvbSAnZ2wtbWF0cml4L21hdDQnO1xuaW1wb3J0ICogYXMgdmVjMiBmcm9tICdnbC1tYXRyaXgvdmVjMic7XG5pbXBvcnQgKiBhcyB2ZWMzIGZyb20gJ2dsLW1hdHJpeC92ZWMzJztcbmltcG9ydCAqIGFzIHZlYzQgZnJvbSAnZ2wtbWF0cml4L3ZlYzQnO1xuY29uc3QgSURFTlRJVFkgPSBPYmplY3QuZnJlZXplKFsxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxXSk7XG5jb25zdCBaRVJPID0gT2JqZWN0LmZyZWV6ZShbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0pO1xuY29uc3QgSU5ESUNFUyA9IE9iamVjdC5mcmVlemUoe1xuICBDT0wwUk9XMDogMCxcbiAgQ09MMFJPVzE6IDEsXG4gIENPTDBST1cyOiAyLFxuICBDT0wwUk9XMzogMyxcbiAgQ09MMVJPVzA6IDQsXG4gIENPTDFST1cxOiA1LFxuICBDT0wxUk9XMjogNixcbiAgQ09MMVJPVzM6IDcsXG4gIENPTDJST1cwOiA4LFxuICBDT0wyUk9XMTogOSxcbiAgQ09MMlJPVzI6IDEwLFxuICBDT0wyUk9XMzogMTEsXG4gIENPTDNST1cwOiAxMixcbiAgQ09MM1JPVzE6IDEzLFxuICBDT0wzUk9XMjogMTQsXG4gIENPTDNST1czOiAxNVxufSk7XG5jb25zdCBjb25zdGFudHMgPSB7fTtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hdHJpeDQgZXh0ZW5kcyBNYXRyaXgge1xuICBzdGF0aWMgZ2V0IElERU5USVRZKCkge1xuICAgIGNvbnN0YW50cy5JREVOVElUWSA9IGNvbnN0YW50cy5JREVOVElUWSB8fCBPYmplY3QuZnJlZXplKG5ldyBNYXRyaXg0KElERU5USVRZKSk7XG4gICAgcmV0dXJuIGNvbnN0YW50cy5JREVOVElUWTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgWkVSTygpIHtcbiAgICBjb25zdGFudHMuWkVSTyA9IGNvbnN0YW50cy5aRVJPIHx8IE9iamVjdC5mcmVlemUobmV3IE1hdHJpeDQoWkVSTykpO1xuICAgIHJldHVybiBjb25zdGFudHMuWkVSTztcbiAgfVxuXG4gIGdldCBJTkRJQ0VTKCkge1xuICAgIHJldHVybiBJTkRJQ0VTO1xuICB9XG5cbiAgZ2V0IEVMRU1FTlRTKCkge1xuICAgIHJldHVybiAxNjtcbiAgfVxuXG4gIGdldCBSQU5LKCkge1xuICAgIHJldHVybiA0O1xuICB9XG5cbiAgY29uc3RydWN0b3IoYXJyYXkpIHtcbiAgICBzdXBlcigtMCwgLTAsIC0wLCAtMCwgLTAsIC0wLCAtMCwgLTAsIC0wLCAtMCwgLTAsIC0wLCAtMCwgLTAsIC0wLCAtMCk7XG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiBBcnJheS5pc0FycmF5KGFycmF5KSkge1xuICAgICAgdGhpcy5jb3B5KGFycmF5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pZGVudGl0eSgpO1xuICAgIH1cbiAgfVxuXG4gIGNvcHkoYXJyYXkpIHtcbiAgICB0aGlzWzBdID0gYXJyYXlbMF07XG4gICAgdGhpc1sxXSA9IGFycmF5WzFdO1xuICAgIHRoaXNbMl0gPSBhcnJheVsyXTtcbiAgICB0aGlzWzNdID0gYXJyYXlbM107XG4gICAgdGhpc1s0XSA9IGFycmF5WzRdO1xuICAgIHRoaXNbNV0gPSBhcnJheVs1XTtcbiAgICB0aGlzWzZdID0gYXJyYXlbNl07XG4gICAgdGhpc1s3XSA9IGFycmF5WzddO1xuICAgIHRoaXNbOF0gPSBhcnJheVs4XTtcbiAgICB0aGlzWzldID0gYXJyYXlbOV07XG4gICAgdGhpc1sxMF0gPSBhcnJheVsxMF07XG4gICAgdGhpc1sxMV0gPSBhcnJheVsxMV07XG4gICAgdGhpc1sxMl0gPSBhcnJheVsxMl07XG4gICAgdGhpc1sxM10gPSBhcnJheVsxM107XG4gICAgdGhpc1sxNF0gPSBhcnJheVsxNF07XG4gICAgdGhpc1sxNV0gPSBhcnJheVsxNV07XG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIHNldChtMDAsIG0xMCwgbTIwLCBtMzAsIG0wMSwgbTExLCBtMjEsIG0zMSwgbTAyLCBtMTIsIG0yMiwgbTMyLCBtMDMsIG0xMywgbTIzLCBtMzMpIHtcbiAgICB0aGlzWzBdID0gbTAwO1xuICAgIHRoaXNbMV0gPSBtMTA7XG4gICAgdGhpc1syXSA9IG0yMDtcbiAgICB0aGlzWzNdID0gbTMwO1xuICAgIHRoaXNbNF0gPSBtMDE7XG4gICAgdGhpc1s1XSA9IG0xMTtcbiAgICB0aGlzWzZdID0gbTIxO1xuICAgIHRoaXNbN10gPSBtMzE7XG4gICAgdGhpc1s4XSA9IG0wMjtcbiAgICB0aGlzWzldID0gbTEyO1xuICAgIHRoaXNbMTBdID0gbTIyO1xuICAgIHRoaXNbMTFdID0gbTMyO1xuICAgIHRoaXNbMTJdID0gbTAzO1xuICAgIHRoaXNbMTNdID0gbTEzO1xuICAgIHRoaXNbMTRdID0gbTIzO1xuICAgIHRoaXNbMTVdID0gbTMzO1xuICAgIHJldHVybiB0aGlzLmNoZWNrKCk7XG4gIH1cblxuICBzZXRSb3dNYWpvcihtMDAsIG0wMSwgbTAyLCBtMDMsIG0xMCwgbTExLCBtMTIsIG0xMywgbTIwLCBtMjEsIG0yMiwgbTIzLCBtMzAsIG0zMSwgbTMyLCBtMzMpIHtcbiAgICB0aGlzWzBdID0gbTAwO1xuICAgIHRoaXNbMV0gPSBtMTA7XG4gICAgdGhpc1syXSA9IG0yMDtcbiAgICB0aGlzWzNdID0gbTMwO1xuICAgIHRoaXNbNF0gPSBtMDE7XG4gICAgdGhpc1s1XSA9IG0xMTtcbiAgICB0aGlzWzZdID0gbTIxO1xuICAgIHRoaXNbN10gPSBtMzE7XG4gICAgdGhpc1s4XSA9IG0wMjtcbiAgICB0aGlzWzldID0gbTEyO1xuICAgIHRoaXNbMTBdID0gbTIyO1xuICAgIHRoaXNbMTFdID0gbTMyO1xuICAgIHRoaXNbMTJdID0gbTAzO1xuICAgIHRoaXNbMTNdID0gbTEzO1xuICAgIHRoaXNbMTRdID0gbTIzO1xuICAgIHRoaXNbMTVdID0gbTMzO1xuICAgIHJldHVybiB0aGlzLmNoZWNrKCk7XG4gIH1cblxuICB0b1Jvd01ham9yKHJlc3VsdCkge1xuICAgIHJlc3VsdFswXSA9IHRoaXNbMF07XG4gICAgcmVzdWx0WzFdID0gdGhpc1s0XTtcbiAgICByZXN1bHRbMl0gPSB0aGlzWzhdO1xuICAgIHJlc3VsdFszXSA9IHRoaXNbMTJdO1xuICAgIHJlc3VsdFs0XSA9IHRoaXNbMV07XG4gICAgcmVzdWx0WzVdID0gdGhpc1s1XTtcbiAgICByZXN1bHRbNl0gPSB0aGlzWzldO1xuICAgIHJlc3VsdFs3XSA9IHRoaXNbMTNdO1xuICAgIHJlc3VsdFs4XSA9IHRoaXNbMl07XG4gICAgcmVzdWx0WzldID0gdGhpc1s2XTtcbiAgICByZXN1bHRbMTBdID0gdGhpc1sxMF07XG4gICAgcmVzdWx0WzExXSA9IHRoaXNbMTRdO1xuICAgIHJlc3VsdFsxMl0gPSB0aGlzWzNdO1xuICAgIHJlc3VsdFsxM10gPSB0aGlzWzddO1xuICAgIHJlc3VsdFsxNF0gPSB0aGlzWzExXTtcbiAgICByZXN1bHRbMTVdID0gdGhpc1sxNV07XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGlkZW50aXR5KCkge1xuICAgIHJldHVybiB0aGlzLmNvcHkoSURFTlRJVFkpO1xuICB9XG5cbiAgZnJvbVF1YXRlcm5pb24ocSkge1xuICAgIG1hdDQuZnJvbVF1YXQodGhpcywgcSk7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIGZydXN0dW0oe1xuICAgIGxlZnQsXG4gICAgcmlnaHQsXG4gICAgYm90dG9tLFxuICAgIHRvcCxcbiAgICBuZWFyLFxuICAgIGZhclxuICB9KSB7XG4gICAgaWYgKGZhciA9PT0gSW5maW5pdHkpIHtcbiAgICAgIE1hdHJpeDQuX2NvbXB1dGVJbmZpbml0ZVBlcnNwZWN0aXZlT2ZmQ2VudGVyKHRoaXMsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hdDQuZnJ1c3R1bSh0aGlzLCBsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIG5lYXIsIGZhcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIHN0YXRpYyBfY29tcHV0ZUluZmluaXRlUGVyc3BlY3RpdmVPZmZDZW50ZXIocmVzdWx0LCBsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIG5lYXIpIHtcbiAgICBjb25zdCBjb2x1bW4wUm93MCA9IDIuMCAqIG5lYXIgLyAocmlnaHQgLSBsZWZ0KTtcbiAgICBjb25zdCBjb2x1bW4xUm93MSA9IDIuMCAqIG5lYXIgLyAodG9wIC0gYm90dG9tKTtcbiAgICBjb25zdCBjb2x1bW4yUm93MCA9IChyaWdodCArIGxlZnQpIC8gKHJpZ2h0IC0gbGVmdCk7XG4gICAgY29uc3QgY29sdW1uMlJvdzEgPSAodG9wICsgYm90dG9tKSAvICh0b3AgLSBib3R0b20pO1xuICAgIGNvbnN0IGNvbHVtbjJSb3cyID0gLTEuMDtcbiAgICBjb25zdCBjb2x1bW4yUm93MyA9IC0xLjA7XG4gICAgY29uc3QgY29sdW1uM1JvdzIgPSAtMi4wICogbmVhcjtcbiAgICByZXN1bHRbMF0gPSBjb2x1bW4wUm93MDtcbiAgICByZXN1bHRbMV0gPSAwLjA7XG4gICAgcmVzdWx0WzJdID0gMC4wO1xuICAgIHJlc3VsdFszXSA9IDAuMDtcbiAgICByZXN1bHRbNF0gPSAwLjA7XG4gICAgcmVzdWx0WzVdID0gY29sdW1uMVJvdzE7XG4gICAgcmVzdWx0WzZdID0gMC4wO1xuICAgIHJlc3VsdFs3XSA9IDAuMDtcbiAgICByZXN1bHRbOF0gPSBjb2x1bW4yUm93MDtcbiAgICByZXN1bHRbOV0gPSBjb2x1bW4yUm93MTtcbiAgICByZXN1bHRbMTBdID0gY29sdW1uMlJvdzI7XG4gICAgcmVzdWx0WzExXSA9IGNvbHVtbjJSb3czO1xuICAgIHJlc3VsdFsxMl0gPSAwLjA7XG4gICAgcmVzdWx0WzEzXSA9IDAuMDtcbiAgICByZXN1bHRbMTRdID0gY29sdW1uM1JvdzI7XG4gICAgcmVzdWx0WzE1XSA9IDAuMDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgbG9va0F0KGV5ZSwgY2VudGVyLCB1cCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAoe1xuICAgICAgICBleWUsXG4gICAgICAgIGNlbnRlcixcbiAgICAgICAgdXBcbiAgICAgIH0gPSBleWUpO1xuICAgIH1cblxuICAgIGNlbnRlciA9IGNlbnRlciB8fCBbMCwgMCwgMF07XG4gICAgdXAgPSB1cCB8fCBbMCwgMSwgMF07XG4gICAgbWF0NC5sb29rQXQodGhpcywgZXllLCBjZW50ZXIsIHVwKTtcbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgb3J0aG8oe1xuICAgIGxlZnQsXG4gICAgcmlnaHQsXG4gICAgYm90dG9tLFxuICAgIHRvcCxcbiAgICBuZWFyID0gMC4xLFxuICAgIGZhciA9IDUwMFxuICB9KSB7XG4gICAgbWF0NC5vcnRobyh0aGlzLCBsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIG5lYXIsIGZhcik7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIG9ydGhvZ3JhcGhpYyh7XG4gICAgZm92eSA9IDQ1ICogTWF0aC5QSSAvIDE4MCxcbiAgICBhc3BlY3QgPSAxLFxuICAgIGZvY2FsRGlzdGFuY2UgPSAxLFxuICAgIG5lYXIgPSAwLjEsXG4gICAgZmFyID0gNTAwXG4gIH0pIHtcbiAgICBpZiAoZm92eSA+IE1hdGguUEkgKiAyKSB7XG4gICAgICB0aHJvdyBFcnJvcigncmFkaWFucycpO1xuICAgIH1cblxuICAgIGNvbnN0IGhhbGZZID0gZm92eSAvIDI7XG4gICAgY29uc3QgdG9wID0gZm9jYWxEaXN0YW5jZSAqIE1hdGgudGFuKGhhbGZZKTtcbiAgICBjb25zdCByaWdodCA9IHRvcCAqIGFzcGVjdDtcbiAgICByZXR1cm4gbmV3IE1hdHJpeDQoKS5vcnRobyh7XG4gICAgICBsZWZ0OiAtcmlnaHQsXG4gICAgICByaWdodCxcbiAgICAgIGJvdHRvbTogLXRvcCxcbiAgICAgIHRvcCxcbiAgICAgIG5lYXIsXG4gICAgICBmYXJcbiAgICB9KTtcbiAgfVxuXG4gIHBlcnNwZWN0aXZlKHtcbiAgICBmb3Z5ID0gdW5kZWZpbmVkLFxuICAgIGZvdiA9IDQ1ICogTWF0aC5QSSAvIDE4MCxcbiAgICBhc3BlY3QgPSAxLFxuICAgIG5lYXIgPSAwLjEsXG4gICAgZmFyID0gNTAwXG4gIH0gPSB7fSkge1xuICAgIGZvdnkgPSBmb3Z5IHx8IGZvdjtcblxuICAgIGlmIChmb3Z5ID4gTWF0aC5QSSAqIDIpIHtcbiAgICAgIHRocm93IEVycm9yKCdyYWRpYW5zJyk7XG4gICAgfVxuXG4gICAgbWF0NC5wZXJzcGVjdGl2ZSh0aGlzLCBmb3Z5LCBhc3BlY3QsIG5lYXIsIGZhcik7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIGRldGVybWluYW50KCkge1xuICAgIHJldHVybiBtYXQ0LmRldGVybWluYW50KHRoaXMpO1xuICB9XG5cbiAgZ2V0U2NhbGUocmVzdWx0ID0gWy0wLCAtMCwgLTBdKSB7XG4gICAgcmVzdWx0WzBdID0gTWF0aC5zcXJ0KHRoaXNbMF0gKiB0aGlzWzBdICsgdGhpc1sxXSAqIHRoaXNbMV0gKyB0aGlzWzJdICogdGhpc1syXSk7XG4gICAgcmVzdWx0WzFdID0gTWF0aC5zcXJ0KHRoaXNbNF0gKiB0aGlzWzRdICsgdGhpc1s1XSAqIHRoaXNbNV0gKyB0aGlzWzZdICogdGhpc1s2XSk7XG4gICAgcmVzdWx0WzJdID0gTWF0aC5zcXJ0KHRoaXNbOF0gKiB0aGlzWzhdICsgdGhpc1s5XSAqIHRoaXNbOV0gKyB0aGlzWzEwXSAqIHRoaXNbMTBdKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZ2V0VHJhbnNsYXRpb24ocmVzdWx0ID0gWy0wLCAtMCwgLTBdKSB7XG4gICAgcmVzdWx0WzBdID0gdGhpc1sxMl07XG4gICAgcmVzdWx0WzFdID0gdGhpc1sxM107XG4gICAgcmVzdWx0WzJdID0gdGhpc1sxNF07XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGdldFJvdGF0aW9uKHJlc3VsdCA9IFstMCwgLTAsIC0wLCAtMCwgLTAsIC0wLCAtMCwgLTAsIC0wLCAtMCwgLTAsIC0wLCAtMCwgLTAsIC0wLCAtMF0sIHNjYWxlUmVzdWx0ID0gbnVsbCkge1xuICAgIGNvbnN0IHNjYWxlID0gdGhpcy5nZXRTY2FsZShzY2FsZVJlc3VsdCB8fCBbLTAsIC0wLCAtMF0pO1xuICAgIGNvbnN0IGludmVyc2VTY2FsZTAgPSAxIC8gc2NhbGVbMF07XG4gICAgY29uc3QgaW52ZXJzZVNjYWxlMSA9IDEgLyBzY2FsZVsxXTtcbiAgICBjb25zdCBpbnZlcnNlU2NhbGUyID0gMSAvIHNjYWxlWzJdO1xuICAgIHJlc3VsdFswXSA9IHRoaXNbMF0gKiBpbnZlcnNlU2NhbGUwO1xuICAgIHJlc3VsdFsxXSA9IHRoaXNbMV0gKiBpbnZlcnNlU2NhbGUxO1xuICAgIHJlc3VsdFsyXSA9IHRoaXNbMl0gKiBpbnZlcnNlU2NhbGUyO1xuICAgIHJlc3VsdFszXSA9IDA7XG4gICAgcmVzdWx0WzRdID0gdGhpc1s0XSAqIGludmVyc2VTY2FsZTA7XG4gICAgcmVzdWx0WzVdID0gdGhpc1s1XSAqIGludmVyc2VTY2FsZTE7XG4gICAgcmVzdWx0WzZdID0gdGhpc1s2XSAqIGludmVyc2VTY2FsZTI7XG4gICAgcmVzdWx0WzddID0gMDtcbiAgICByZXN1bHRbOF0gPSB0aGlzWzhdICogaW52ZXJzZVNjYWxlMDtcbiAgICByZXN1bHRbOV0gPSB0aGlzWzldICogaW52ZXJzZVNjYWxlMTtcbiAgICByZXN1bHRbMTBdID0gdGhpc1sxMF0gKiBpbnZlcnNlU2NhbGUyO1xuICAgIHJlc3VsdFsxMV0gPSAwO1xuICAgIHJlc3VsdFsxMl0gPSAwO1xuICAgIHJlc3VsdFsxM10gPSAwO1xuICAgIHJlc3VsdFsxNF0gPSAwO1xuICAgIHJlc3VsdFsxNV0gPSAxO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBnZXRSb3RhdGlvbk1hdHJpeDMocmVzdWx0ID0gWy0wLCAtMCwgLTAsIC0wLCAtMCwgLTAsIC0wLCAtMCwgLTBdLCBzY2FsZVJlc3VsdCA9IG51bGwpIHtcbiAgICBjb25zdCBzY2FsZSA9IHRoaXMuZ2V0U2NhbGUoc2NhbGVSZXN1bHQgfHwgWy0wLCAtMCwgLTBdKTtcbiAgICBjb25zdCBpbnZlcnNlU2NhbGUwID0gMSAvIHNjYWxlWzBdO1xuICAgIGNvbnN0IGludmVyc2VTY2FsZTEgPSAxIC8gc2NhbGVbMV07XG4gICAgY29uc3QgaW52ZXJzZVNjYWxlMiA9IDEgLyBzY2FsZVsyXTtcbiAgICByZXN1bHRbMF0gPSB0aGlzWzBdICogaW52ZXJzZVNjYWxlMDtcbiAgICByZXN1bHRbMV0gPSB0aGlzWzFdICogaW52ZXJzZVNjYWxlMTtcbiAgICByZXN1bHRbMl0gPSB0aGlzWzJdICogaW52ZXJzZVNjYWxlMjtcbiAgICByZXN1bHRbM10gPSB0aGlzWzRdICogaW52ZXJzZVNjYWxlMDtcbiAgICByZXN1bHRbNF0gPSB0aGlzWzVdICogaW52ZXJzZVNjYWxlMTtcbiAgICByZXN1bHRbNV0gPSB0aGlzWzZdICogaW52ZXJzZVNjYWxlMjtcbiAgICByZXN1bHRbNl0gPSB0aGlzWzhdICogaW52ZXJzZVNjYWxlMDtcbiAgICByZXN1bHRbN10gPSB0aGlzWzldICogaW52ZXJzZVNjYWxlMTtcbiAgICByZXN1bHRbOF0gPSB0aGlzWzEwXSAqIGludmVyc2VTY2FsZTI7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHRyYW5zcG9zZSgpIHtcbiAgICBtYXQ0LnRyYW5zcG9zZSh0aGlzLCB0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgaW52ZXJ0KCkge1xuICAgIG1hdDQuaW52ZXJ0KHRoaXMsIHRoaXMpO1xuICAgIHJldHVybiB0aGlzLmNoZWNrKCk7XG4gIH1cblxuICBtdWx0aXBseUxlZnQoYSkge1xuICAgIG1hdDQubXVsdGlwbHkodGhpcywgYSwgdGhpcyk7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIG11bHRpcGx5UmlnaHQoYSkge1xuICAgIG1hdDQubXVsdGlwbHkodGhpcywgdGhpcywgYSk7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIHJvdGF0ZVgocmFkaWFucykge1xuICAgIG1hdDQucm90YXRlWCh0aGlzLCB0aGlzLCByYWRpYW5zKTtcbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgcm90YXRlWShyYWRpYW5zKSB7XG4gICAgbWF0NC5yb3RhdGVZKHRoaXMsIHRoaXMsIHJhZGlhbnMpO1xuICAgIHJldHVybiB0aGlzLmNoZWNrKCk7XG4gIH1cblxuICByb3RhdGVaKHJhZGlhbnMpIHtcbiAgICBtYXQ0LnJvdGF0ZVoodGhpcywgdGhpcywgcmFkaWFucyk7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIHJvdGF0ZVhZWihbcngsIHJ5LCByel0pIHtcbiAgICByZXR1cm4gdGhpcy5yb3RhdGVYKHJ4KS5yb3RhdGVZKHJ5KS5yb3RhdGVaKHJ6KTtcbiAgfVxuXG4gIHJvdGF0ZUF4aXMocmFkaWFucywgYXhpcykge1xuICAgIG1hdDQucm90YXRlKHRoaXMsIHRoaXMsIHJhZGlhbnMsIGF4aXMpO1xuICAgIHJldHVybiB0aGlzLmNoZWNrKCk7XG4gIH1cblxuICBzY2FsZShmYWN0b3IpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShmYWN0b3IpKSB7XG4gICAgICBtYXQ0LnNjYWxlKHRoaXMsIHRoaXMsIGZhY3Rvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hdDQuc2NhbGUodGhpcywgdGhpcywgW2ZhY3RvciwgZmFjdG9yLCBmYWN0b3JdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgdHJhbnNsYXRlKHZlYykge1xuICAgIG1hdDQudHJhbnNsYXRlKHRoaXMsIHRoaXMsIHZlYyk7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIHRyYW5zZm9ybSh2ZWN0b3IsIHJlc3VsdCkge1xuICAgIGlmICh2ZWN0b3IubGVuZ3RoID09PSA0KSB7XG4gICAgICByZXN1bHQgPSB2ZWM0LnRyYW5zZm9ybU1hdDQocmVzdWx0IHx8IFstMCwgLTAsIC0wLCAtMF0sIHZlY3RvciwgdGhpcyk7XG4gICAgICBjaGVja1ZlY3RvcihyZXN1bHQsIDQpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm1Bc1BvaW50KHZlY3RvciwgcmVzdWx0KTtcbiAgfVxuXG4gIHRyYW5zZm9ybUFzUG9pbnQodmVjdG9yLCByZXN1bHQpIHtcbiAgICBjb25zdCB7XG4gICAgICBsZW5ndGhcbiAgICB9ID0gdmVjdG9yO1xuXG4gICAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmVzdWx0ID0gdmVjMi50cmFuc2Zvcm1NYXQ0KHJlc3VsdCB8fCBbLTAsIC0wXSwgdmVjdG9yLCB0aGlzKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgMzpcbiAgICAgICAgcmVzdWx0ID0gdmVjMy50cmFuc2Zvcm1NYXQ0KHJlc3VsdCB8fCBbLTAsIC0wLCAtMF0sIHZlY3RvciwgdGhpcyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lsbGVnYWwgdmVjdG9yJyk7XG4gICAgfVxuXG4gICAgY2hlY2tWZWN0b3IocmVzdWx0LCB2ZWN0b3IubGVuZ3RoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdHJhbnNmb3JtQXNWZWN0b3IodmVjdG9yLCByZXN1bHQpIHtcbiAgICBzd2l0Y2ggKHZlY3Rvci5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmVzdWx0ID0gdmVjMl90cmFuc2Zvcm1NYXQ0QXNWZWN0b3IocmVzdWx0IHx8IFstMCwgLTBdLCB2ZWN0b3IsIHRoaXMpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAzOlxuICAgICAgICByZXN1bHQgPSB2ZWMzX3RyYW5zZm9ybU1hdDRBc1ZlY3RvcihyZXN1bHQgfHwgWy0wLCAtMCwgLTBdLCB2ZWN0b3IsIHRoaXMpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbGxlZ2FsIHZlY3RvcicpO1xuICAgIH1cblxuICAgIGNoZWNrVmVjdG9yKHJlc3VsdCwgdmVjdG9yLmxlbmd0aCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIG1ha2VSb3RhdGlvblgocmFkaWFucykge1xuICAgIHJldHVybiB0aGlzLmlkZW50aXR5KCkucm90YXRlWChyYWRpYW5zKTtcbiAgfVxuXG4gIG1ha2VUcmFuc2xhdGlvbih4LCB5LCB6KSB7XG4gICAgcmV0dXJuIHRoaXMuaWRlbnRpdHkoKS50cmFuc2xhdGUoW3gsIHksIHpdKTtcbiAgfVxuXG4gIHRyYW5zZm9ybVBvaW50KHZlY3RvciwgcmVzdWx0KSB7XG4gICAgZGVwcmVjYXRlZCgnTWF0cml4NC50cmFuc2Zvcm1Qb2ludCcsICczLjAnKTtcbiAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm1Bc1BvaW50KHZlY3RvciwgcmVzdWx0KTtcbiAgfVxuXG4gIHRyYW5zZm9ybVZlY3Rvcih2ZWN0b3IsIHJlc3VsdCkge1xuICAgIGRlcHJlY2F0ZWQoJ01hdHJpeDQudHJhbnNmb3JtVmVjdG9yJywgJzMuMCcpO1xuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybUFzUG9pbnQodmVjdG9yLCByZXN1bHQpO1xuICB9XG5cbiAgdHJhbnNmb3JtRGlyZWN0aW9uKHZlY3RvciwgcmVzdWx0KSB7XG4gICAgZGVwcmVjYXRlZCgnTWF0cml4NC50cmFuc2Zvcm1EaXJlY3Rpb24nLCAnMy4wJyk7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtQXNWZWN0b3IodmVjdG9yLCByZXN1bHQpO1xuICB9XG5cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hdHJpeDQuanMubWFwIiwiaW1wb3J0IFZlY3RvciBmcm9tICcuL2Jhc2UvdmVjdG9yJztcbmltcG9ydCB7IGNvbmZpZywgaXNBcnJheSB9IGZyb20gJy4uL2xpYi9jb21tb24nO1xuaW1wb3J0IHsgY2hlY2tOdW1iZXIgfSBmcm9tICcuLi9saWIvdmFsaWRhdG9ycyc7XG5pbXBvcnQgKiBhcyB2ZWMzIGZyb20gJ2dsLW1hdHJpeC92ZWMzJztcbmltcG9ydCB7IHZlYzNfdHJhbnNmb3JtTWF0MiwgdmVjM190cmFuc2Zvcm1NYXQ0QXNWZWN0b3IgfSBmcm9tICcuLi9saWIvZ2wtbWF0cml4LWV4dHJhcyc7XG5jb25zdCBPUklHSU4gPSBbMCwgMCwgMF07XG5jb25zdCBjb25zdGFudHMgPSB7fTtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvcjMgZXh0ZW5kcyBWZWN0b3Ige1xuICBzdGF0aWMgZ2V0IFpFUk8oKSB7XG4gICAgcmV0dXJuIGNvbnN0YW50cy5aRVJPID0gY29uc3RhbnRzLlpFUk8gfHwgT2JqZWN0LmZyZWV6ZShuZXcgVmVjdG9yMygwLCAwLCAwLCAwKSk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDAsIHogPSAwKSB7XG4gICAgc3VwZXIoLTAsIC0wLCAtMCk7XG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiBpc0FycmF5KHgpKSB7XG4gICAgICB0aGlzLmNvcHkoeCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjb25maWcuZGVidWcpIHtcbiAgICAgICAgY2hlY2tOdW1iZXIoeCk7XG4gICAgICAgIGNoZWNrTnVtYmVyKHkpO1xuICAgICAgICBjaGVja051bWJlcih6KTtcbiAgICAgIH1cblxuICAgICAgdGhpc1swXSA9IHg7XG4gICAgICB0aGlzWzFdID0geTtcbiAgICAgIHRoaXNbMl0gPSB6O1xuICAgIH1cbiAgfVxuXG4gIHNldCh4LCB5LCB6KSB7XG4gICAgdGhpc1swXSA9IHg7XG4gICAgdGhpc1sxXSA9IHk7XG4gICAgdGhpc1syXSA9IHo7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIGNvcHkoYXJyYXkpIHtcbiAgICB0aGlzWzBdID0gYXJyYXlbMF07XG4gICAgdGhpc1sxXSA9IGFycmF5WzFdO1xuICAgIHRoaXNbMl0gPSBhcnJheVsyXTtcbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgZnJvbU9iamVjdChvYmplY3QpIHtcbiAgICBpZiAoY29uZmlnLmRlYnVnKSB7XG4gICAgICBjaGVja051bWJlcihvYmplY3QueCk7XG4gICAgICBjaGVja051bWJlcihvYmplY3QueSk7XG4gICAgICBjaGVja051bWJlcihvYmplY3Queik7XG4gICAgfVxuXG4gICAgdGhpc1swXSA9IG9iamVjdC54O1xuICAgIHRoaXNbMV0gPSBvYmplY3QueTtcbiAgICB0aGlzWzJdID0gb2JqZWN0Lno7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIHRvT2JqZWN0KG9iamVjdCkge1xuICAgIG9iamVjdC54ID0gdGhpc1swXTtcbiAgICBvYmplY3QueSA9IHRoaXNbMV07XG4gICAgb2JqZWN0LnogPSB0aGlzWzJdO1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cblxuICBnZXQgRUxFTUVOVFMoKSB7XG4gICAgcmV0dXJuIDM7XG4gIH1cblxuICBnZXQgeigpIHtcbiAgICByZXR1cm4gdGhpc1syXTtcbiAgfVxuXG4gIHNldCB6KHZhbHVlKSB7XG4gICAgdGhpc1syXSA9IGNoZWNrTnVtYmVyKHZhbHVlKTtcbiAgfVxuXG4gIGFuZ2xlKHZlY3Rvcikge1xuICAgIHJldHVybiB2ZWMzLmFuZ2xlKHRoaXMsIHZlY3Rvcik7XG4gIH1cblxuICBjcm9zcyh2ZWN0b3IpIHtcbiAgICB2ZWMzLmNyb3NzKHRoaXMsIHRoaXMsIHZlY3Rvcik7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIHJvdGF0ZVgoe1xuICAgIHJhZGlhbnMsXG4gICAgb3JpZ2luID0gT1JJR0lOXG4gIH0pIHtcbiAgICB2ZWMzLnJvdGF0ZVgodGhpcywgdGhpcywgb3JpZ2luLCByYWRpYW5zKTtcbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgcm90YXRlWSh7XG4gICAgcmFkaWFucyxcbiAgICBvcmlnaW4gPSBPUklHSU5cbiAgfSkge1xuICAgIHZlYzMucm90YXRlWSh0aGlzLCB0aGlzLCBvcmlnaW4sIHJhZGlhbnMpO1xuICAgIHJldHVybiB0aGlzLmNoZWNrKCk7XG4gIH1cblxuICByb3RhdGVaKHtcbiAgICByYWRpYW5zLFxuICAgIG9yaWdpbiA9IE9SSUdJTlxuICB9KSB7XG4gICAgdmVjMy5yb3RhdGVaKHRoaXMsIHRoaXMsIG9yaWdpbiwgcmFkaWFucyk7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIHRyYW5zZm9ybShtYXRyaXg0KSB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtQXNQb2ludChtYXRyaXg0KTtcbiAgfVxuXG4gIHRyYW5zZm9ybUFzUG9pbnQobWF0cml4NCkge1xuICAgIHZlYzMudHJhbnNmb3JtTWF0NCh0aGlzLCB0aGlzLCBtYXRyaXg0KTtcbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgdHJhbnNmb3JtQXNWZWN0b3IobWF0cml4NCkge1xuICAgIHZlYzNfdHJhbnNmb3JtTWF0NEFzVmVjdG9yKHRoaXMsIHRoaXMsIG1hdHJpeDQpO1xuICAgIHJldHVybiB0aGlzLmNoZWNrKCk7XG4gIH1cblxuICB0cmFuc2Zvcm1CeU1hdHJpeDMobWF0cml4Mykge1xuICAgIHZlYzMudHJhbnNmb3JtTWF0Myh0aGlzLCB0aGlzLCBtYXRyaXgzKTtcbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgdHJhbnNmb3JtQnlNYXRyaXgyKG1hdHJpeDIpIHtcbiAgICB2ZWMzX3RyYW5zZm9ybU1hdDIodGhpcywgdGhpcywgbWF0cml4Mik7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIHRyYW5zZm9ybUJ5UXVhdGVybmlvbihxdWF0ZXJuaW9uKSB7XG4gICAgdmVjMy50cmFuc2Zvcm1RdWF0KHRoaXMsIHRoaXMsIHF1YXRlcm5pb24pO1xuICAgIHJldHVybiB0aGlzLmNoZWNrKCk7XG4gIH1cblxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dmVjdG9yMy5qcy5tYXAiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwibWF0aC5nbCBhc3NlcnRpb24gXCIuY29uY2F0KG1lc3NhZ2UpKTtcbiAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXNzZXJ0LmpzLm1hcCIsImltcG9ydCBhc3NlcnQgZnJvbSAnLi9hc3NlcnQnO1xuY29uc3QgUkFESUFOU19UT19ERUdSRUVTID0gMSAvIE1hdGguUEkgKiAxODA7XG5jb25zdCBERUdSRUVTX1RPX1JBRElBTlMgPSAxIC8gMTgwICogTWF0aC5QSTtcbmNvbnN0IGNvbmZpZyA9IHt9O1xuY29uZmlnLkVQU0lMT04gPSAxZS0xMjtcbmNvbmZpZy5kZWJ1ZyA9IGZhbHNlO1xuY29uZmlnLnByZWNpc2lvbiA9IDQ7XG5jb25maWcucHJpbnRUeXBlcyA9IGZhbHNlO1xuY29uZmlnLnByaW50RGVncmVlcyA9IGZhbHNlO1xuY29uZmlnLnByaW50Um93TWFqb3IgPSB0cnVlO1xuZXhwb3J0IHsgY29uZmlnIH07XG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlKG9wdGlvbnMgPSB7fSkge1xuICBmb3IgKGNvbnN0IGtleSBpbiBvcHRpb25zKSB7XG4gICAgYXNzZXJ0KGtleSBpbiBjb25maWcpO1xuICAgIGNvbmZpZ1trZXldID0gb3B0aW9uc1trZXldO1xuICB9XG5cbiAgcmV0dXJuIGNvbmZpZztcbn1cblxuZnVuY3Rpb24gcm91bmQodmFsdWUpIHtcbiAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgLyBjb25maWcuRVBTSUxPTikgKiBjb25maWcuRVBTSUxPTjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFZhbHVlKHZhbHVlLCB7XG4gIHByZWNpc2lvbiA9IGNvbmZpZy5wcmVjaXNpb24gfHwgNFxufSA9IHt9KSB7XG4gIHZhbHVlID0gcm91bmQodmFsdWUpO1xuICByZXR1cm4gXCJcIi5jb25jYXQocGFyc2VGbG9hdCh2YWx1ZS50b1ByZWNpc2lvbihwcmVjaXNpb24pKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgQXJyYXlCdWZmZXIuaXNWaWV3KHZhbHVlKSAmJiAhKHZhbHVlIGluc3RhbmNlb2YgRGF0YVZpZXcpO1xufVxuXG5mdW5jdGlvbiBkdXBsaWNhdGVBcnJheShhcnJheSkge1xuICByZXR1cm4gYXJyYXkuY2xvbmUgPyBhcnJheS5jbG9uZSgpIDogbmV3IEFycmF5KGFycmF5Lmxlbmd0aCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZShhcnJheSkge1xuICByZXR1cm4gYXJyYXkuY2xvbmUgPyBhcnJheS5jbG9uZSgpIDogbmV3IEFycmF5KC4uLmFycmF5KTtcbn1cblxuZnVuY3Rpb24gbWFwKHZhbHVlLCBmdW5jLCByZXN1bHQpIHtcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmVzdWx0ID0gcmVzdWx0IHx8IGR1cGxpY2F0ZUFycmF5KHZhbHVlKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aCAmJiBpIDwgdmFsdWUubGVuZ3RoOyArK2kpIHtcbiAgICAgIHJlc3VsdFtpXSA9IGZ1bmModmFsdWVbaV0sIGksIHJlc3VsdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHJldHVybiBmdW5jKHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvUmFkaWFucyhkZWdyZWVzKSB7XG4gIHJldHVybiByYWRpYW5zKGRlZ3JlZXMpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHRvRGVncmVlcyhyYWRpYW5zKSB7XG4gIHJldHVybiBkZWdyZWVzKHJhZGlhbnMpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJhZGlhbnMoZGVncmVlcywgcmVzdWx0KSB7XG4gIHJldHVybiBtYXAoZGVncmVlcywgZGVncmVlcyA9PiBkZWdyZWVzICogREVHUkVFU19UT19SQURJQU5TLCByZXN1bHQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRlZ3JlZXMocmFkaWFucywgcmVzdWx0KSB7XG4gIHJldHVybiBtYXAocmFkaWFucywgcmFkaWFucyA9PiByYWRpYW5zICogUkFESUFOU19UT19ERUdSRUVTLCByZXN1bHQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNpbihyYWRpYW5zKSB7XG4gIHJldHVybiBtYXAocmFkaWFucywgYW5nbGUgPT4gTWF0aC5zaW4oYW5nbGUpKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb3MocmFkaWFucykge1xuICByZXR1cm4gbWFwKHJhZGlhbnMsIGFuZ2xlID0+IE1hdGguY29zKGFuZ2xlKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gdGFuKHJhZGlhbnMpIHtcbiAgcmV0dXJuIG1hcChyYWRpYW5zLCBhbmdsZSA9PiBNYXRoLnRhbihhbmdsZSkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFzaW4ocmFkaWFucykge1xuICByZXR1cm4gbWFwKHJhZGlhbnMsIGFuZ2xlID0+IE1hdGguYXNpbihhbmdsZSkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFjb3MocmFkaWFucykge1xuICByZXR1cm4gbWFwKHJhZGlhbnMsIGFuZ2xlID0+IE1hdGguYWNvcyhhbmdsZSkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGF0YW4ocmFkaWFucykge1xuICByZXR1cm4gbWFwKHJhZGlhbnMsIGFuZ2xlID0+IE1hdGguYXRhbihhbmdsZSkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNsYW1wKHZhbHVlLCBtaW4sIG1heCkge1xuICByZXR1cm4gbWFwKHZhbHVlLCB2YWx1ZSA9PiBNYXRoLm1heChtaW4sIE1hdGgubWluKG1heCwgdmFsdWUpKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gbGVycChhLCBiLCB0KSB7XG4gIGlmIChpc0FycmF5KGEpKSB7XG4gICAgcmV0dXJuIGEubWFwKChhaSwgaSkgPT4gbGVycChhaSwgYltpXSwgdCkpO1xuICB9XG5cbiAgcmV0dXJuIHQgKiBiICsgKDEgLSB0KSAqIGE7XG59XG5leHBvcnQgZnVuY3Rpb24gZXF1YWxzKGEsIGIsIGVwc2lsb24pIHtcbiAgY29uc3Qgb2xkRXBzaWxvbiA9IGNvbmZpZy5FUFNJTE9OO1xuXG4gIGlmIChlcHNpbG9uKSB7XG4gICAgY29uZmlnLkVQU0lMT04gPSBlcHNpbG9uO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBpZiAoYSA9PT0gYikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGlzQXJyYXkoYSkgJiYgaXNBcnJheShiKSkge1xuICAgICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAoIWVxdWFscyhhW2ldLCBiW2ldKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoYSAmJiBhLmVxdWFscykge1xuICAgICAgcmV0dXJuIGEuZXF1YWxzKGIpO1xuICAgIH1cblxuICAgIGlmIChiICYmIGIuZXF1YWxzKSB7XG4gICAgICByZXR1cm4gYi5lcXVhbHMoYSk7XG4gICAgfVxuXG4gICAgaWYgKE51bWJlci5pc0Zpbml0ZShhKSAmJiBOdW1iZXIuaXNGaW5pdGUoYikpIHtcbiAgICAgIHJldHVybiBNYXRoLmFicyhhIC0gYikgPD0gY29uZmlnLkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEpLCBNYXRoLmFicyhiKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGZpbmFsbHkge1xuICAgIGNvbmZpZy5FUFNJTE9OID0gb2xkRXBzaWxvbjtcbiAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGV4YWN0RXF1YWxzKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmIChhICYmIHR5cGVvZiBhID09PSAnb2JqZWN0JyAmJiBiICYmIHR5cGVvZiBiID09PSAnb2JqZWN0Jykge1xuICAgIGlmIChhLmNvbnN0cnVjdG9yICE9PSBiLmNvbnN0cnVjdG9yKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGEuZXhhY3RFcXVhbHMpIHtcbiAgICAgIHJldHVybiBhLmV4YWN0RXF1YWxzKGIpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChpc0FycmF5KGEpICYmIGlzQXJyYXkoYikpIHtcbiAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgKytpKSB7XG4gICAgICBpZiAoIWV4YWN0RXF1YWxzKGFbaV0sIGJbaV0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB3aXRoRXBzaWxvbihFUFNJTE9OLCBmdW5jKSB7XG4gIGNvbnN0IG9sZFByZWNpc2lvbiA9IGNvbmZpZy5FUFNJTE9OO1xuICBjb25maWcuRVBTSUxPTiA9IEVQU0lMT047XG4gIGxldCB2YWx1ZTtcblxuICB0cnkge1xuICAgIHZhbHVlID0gZnVuYygpO1xuICB9IGZpbmFsbHkge1xuICAgIGNvbmZpZy5FUFNJTE9OID0gb2xkUHJlY2lzaW9uO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tbW9uLmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiB2ZWMyX3RyYW5zZm9ybU1hdDRBc1ZlY3RvcihvdXQsIGEsIG0pIHtcbiAgY29uc3QgeCA9IGFbMF07XG4gIGNvbnN0IHkgPSBhWzFdO1xuICBjb25zdCB3ID0gbVszXSAqIHggKyBtWzddICogeSB8fCAxLjA7XG4gIG91dFswXSA9IChtWzBdICogeCArIG1bNF0gKiB5KSAvIHc7XG4gIG91dFsxXSA9IChtWzFdICogeCArIG1bNV0gKiB5KSAvIHc7XG4gIHJldHVybiBvdXQ7XG59XG5leHBvcnQgZnVuY3Rpb24gdmVjM190cmFuc2Zvcm1NYXQ0QXNWZWN0b3Iob3V0LCBhLCBtKSB7XG4gIGNvbnN0IHggPSBhWzBdO1xuICBjb25zdCB5ID0gYVsxXTtcbiAgY29uc3QgeiA9IGFbMl07XG4gIGNvbnN0IHcgPSBtWzNdICogeCArIG1bN10gKiB5ICsgbVsxMV0gKiB6IHx8IDEuMDtcbiAgb3V0WzBdID0gKG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzhdICogeikgLyB3O1xuICBvdXRbMV0gPSAobVsxXSAqIHggKyBtWzVdICogeSArIG1bOV0gKiB6KSAvIHc7XG4gIG91dFsyXSA9IChtWzJdICogeCArIG1bNl0gKiB5ICsgbVsxMF0gKiB6KSAvIHc7XG4gIHJldHVybiBvdXQ7XG59XG5leHBvcnQgZnVuY3Rpb24gdmVjM190cmFuc2Zvcm1NYXQyKG91dCwgYSwgbSkge1xuICBjb25zdCB4ID0gYVswXTtcbiAgY29uc3QgeSA9IGFbMV07XG4gIG91dFswXSA9IG1bMF0gKiB4ICsgbVsyXSAqIHk7XG4gIG91dFsxXSA9IG1bMV0gKiB4ICsgbVszXSAqIHk7XG4gIG91dFsyXSA9IGFbMl07XG4gIHJldHVybiBvdXQ7XG59XG5leHBvcnQgZnVuY3Rpb24gdmVjNF90cmFuc2Zvcm1NYXQyKG91dCwgYSwgbSkge1xuICBjb25zdCB4ID0gYVswXTtcbiAgY29uc3QgeSA9IGFbMV07XG4gIG91dFswXSA9IG1bMF0gKiB4ICsgbVsyXSAqIHk7XG4gIG91dFsxXSA9IG1bMV0gKiB4ICsgbVszXSAqIHk7XG4gIG91dFsyXSA9IGFbMl07XG4gIG91dFszXSA9IGFbM107XG4gIHJldHVybiBvdXQ7XG59XG5leHBvcnQgZnVuY3Rpb24gdmVjNF90cmFuc2Zvcm1NYXQzKG91dCwgYSwgbSkge1xuICBjb25zdCB4ID0gYVswXTtcbiAgY29uc3QgeSA9IGFbMV07XG4gIGNvbnN0IHogPSBhWzJdO1xuICBvdXRbMF0gPSBtWzBdICogeCArIG1bM10gKiB5ICsgbVs2XSAqIHo7XG4gIG91dFsxXSA9IG1bMV0gKiB4ICsgbVs0XSAqIHkgKyBtWzddICogejtcbiAgb3V0WzJdID0gbVsyXSAqIHggKyBtWzVdICogeSArIG1bOF0gKiB6O1xuICBvdXRbM10gPSBhWzNdO1xuICByZXR1cm4gb3V0O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z2wtbWF0cml4LWV4dHJhcy5qcy5tYXAiLCJpbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbW1vbic7XG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVWZWN0b3IodiwgbGVuZ3RoKSB7XG4gIGlmICh2Lmxlbmd0aCAhPT0gbGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB2Lmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUodltpXSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjaGVja051bWJlcih2YWx1ZSkge1xuICBpZiAoIU51bWJlci5pc0Zpbml0ZSh2YWx1ZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIG51bWJlciBcIi5jb25jYXQodmFsdWUpKTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjaGVja1ZlY3Rvcih2LCBsZW5ndGgsIGNhbGxlck5hbWUgPSAnJykge1xuICBpZiAoY29uZmlnLmRlYnVnICYmICF2YWxpZGF0ZVZlY3Rvcih2LCBsZW5ndGgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwibWF0aC5nbDogXCIuY29uY2F0KGNhbGxlck5hbWUsIFwiIHNvbWUgZmllbGRzIHNldCB0byBpbnZhbGlkIG51bWJlcnMnXCIpKTtcbiAgfVxuXG4gIHJldHVybiB2O1xufVxuY29uc3QgbWFwID0ge307XG5leHBvcnQgZnVuY3Rpb24gZGVwcmVjYXRlZChtZXRob2QsIHZlcnNpb24pIHtcbiAgaWYgKCFtYXBbbWV0aG9kXSkge1xuICAgIG1hcFttZXRob2RdID0gdHJ1ZTtcbiAgICBjb25zb2xlLndhcm4oXCJcIi5jb25jYXQobWV0aG9kLCBcIiBoYXMgYmVlbiByZW1vdmVkIGluIHZlcnNpb24gXCIpLmNvbmNhdCh2ZXJzaW9uLCBcIiwgc2VlIHVwZ3JhZGUgZ3VpZGUgZm9yIG1vcmUgaW5mb3JtYXRpb25cIikpO1xuICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD12YWxpZGF0b3JzLmpzLm1hcCIsIi8qKlxyXG4gKiBDb21tb24gdXRpbGl0aWVzXHJcbiAqIEBtb2R1bGUgZ2xNYXRyaXhcclxuICovXG4vLyBDb25maWd1cmF0aW9uIENvbnN0YW50c1xuZXhwb3J0IHZhciBFUFNJTE9OID0gMC4wMDAwMDE7XG5leHBvcnQgdmFyIEFSUkFZX1RZUEUgPSB0eXBlb2YgRmxvYXQzMkFycmF5ICE9PSAndW5kZWZpbmVkJyA/IEZsb2F0MzJBcnJheSA6IEFycmF5O1xuZXhwb3J0IHZhciBSQU5ET00gPSBNYXRoLnJhbmRvbTtcbi8qKlxyXG4gKiBTZXRzIHRoZSB0eXBlIG9mIGFycmF5IHVzZWQgd2hlbiBjcmVhdGluZyBuZXcgdmVjdG9ycyBhbmQgbWF0cmljZXNcclxuICpcclxuICogQHBhcmFtIHtGbG9hdDMyQXJyYXlDb25zdHJ1Y3RvciB8IEFycmF5Q29uc3RydWN0b3J9IHR5cGUgQXJyYXkgdHlwZSwgc3VjaCBhcyBGbG9hdDMyQXJyYXkgb3IgQXJyYXlcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRNYXRyaXhBcnJheVR5cGUodHlwZSkge1xuICBBUlJBWV9UWVBFID0gdHlwZTtcbn1cbnZhciBkZWdyZWUgPSBNYXRoLlBJIC8gMTgwO1xuLyoqXHJcbiAqIENvbnZlcnQgRGVncmVlIFRvIFJhZGlhblxyXG4gKlxyXG4gKiBAcGFyYW0ge051bWJlcn0gYSBBbmdsZSBpbiBEZWdyZWVzXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdG9SYWRpYW4oYSkge1xuICByZXR1cm4gYSAqIGRlZ3JlZTtcbn1cbi8qKlxyXG4gKiBUZXN0cyB3aGV0aGVyIG9yIG5vdCB0aGUgYXJndW1lbnRzIGhhdmUgYXBwcm94aW1hdGVseSB0aGUgc2FtZSB2YWx1ZSwgd2l0aGluIGFuIGFic29sdXRlXHJcbiAqIG9yIHJlbGF0aXZlIHRvbGVyYW5jZSBvZiBnbE1hdHJpeC5FUFNJTE9OIChhbiBhYnNvbHV0ZSB0b2xlcmFuY2UgaXMgdXNlZCBmb3IgdmFsdWVzIGxlc3NcclxuICogdGhhbiBvciBlcXVhbCB0byAxLjAsIGFuZCBhIHJlbGF0aXZlIHRvbGVyYW5jZSBpcyB1c2VkIGZvciBsYXJnZXIgdmFsdWVzKVxyXG4gKlxyXG4gKiBAcGFyYW0ge051bWJlcn0gYSBUaGUgZmlyc3QgbnVtYmVyIHRvIHRlc3QuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIFRoZSBzZWNvbmQgbnVtYmVyIHRvIHRlc3QuXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSBudW1iZXJzIGFyZSBhcHByb3hpbWF0ZWx5IGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxzKGEsIGIpIHtcbiAgcmV0dXJuIE1hdGguYWJzKGEgLSBiKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhKSwgTWF0aC5hYnMoYikpO1xufVxuaWYgKCFNYXRoLmh5cG90KSBNYXRoLmh5cG90ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgeSA9IDAsXG4gICAgICBpID0gYXJndW1lbnRzLmxlbmd0aDtcblxuICB3aGlsZSAoaS0tKSB7XG4gICAgeSArPSBhcmd1bWVudHNbaV0gKiBhcmd1bWVudHNbaV07XG4gIH1cblxuICByZXR1cm4gTWF0aC5zcXJ0KHkpO1xufTsiLCJpbXBvcnQgKiBhcyBnbE1hdHJpeCBmcm9tIFwiLi9jb21tb24uanNcIjtcbi8qKlxyXG4gKiA0eDQgTWF0cml4PGJyPkZvcm1hdDogY29sdW1uLW1ham9yLCB3aGVuIHR5cGVkIG91dCBpdCBsb29rcyBsaWtlIHJvdy1tYWpvcjxicj5UaGUgbWF0cmljZXMgYXJlIGJlaW5nIHBvc3QgbXVsdGlwbGllZC5cclxuICogQG1vZHVsZSBtYXQ0XHJcbiAqL1xuXG4vKipcclxuICogQ3JlYXRlcyBhIG5ldyBpZGVudGl0eSBtYXQ0XHJcbiAqXHJcbiAqIEByZXR1cm5zIHttYXQ0fSBhIG5ldyA0eDQgbWF0cml4XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKCkge1xuICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoMTYpO1xuXG4gIGlmIChnbE1hdHJpeC5BUlJBWV9UWVBFICE9IEZsb2F0MzJBcnJheSkge1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IDA7XG4gICAgb3V0WzldID0gMDtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gMDtcbiAgICBvdXRbMTNdID0gMDtcbiAgICBvdXRbMTRdID0gMDtcbiAgfVxuXG4gIG91dFswXSA9IDE7XG4gIG91dFs1XSA9IDE7XG4gIG91dFsxMF0gPSAxO1xuICBvdXRbMTVdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBDcmVhdGVzIGEgbmV3IG1hdDQgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyBtYXRyaXhcclxuICpcclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgbWF0cml4IHRvIGNsb25lXHJcbiAqIEByZXR1cm5zIHttYXQ0fSBhIG5ldyA0eDQgbWF0cml4XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY2xvbmUoYSkge1xuICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoMTYpO1xuICBvdXRbMF0gPSBhWzBdO1xuICBvdXRbMV0gPSBhWzFdO1xuICBvdXRbMl0gPSBhWzJdO1xuICBvdXRbM10gPSBhWzNdO1xuICBvdXRbNF0gPSBhWzRdO1xuICBvdXRbNV0gPSBhWzVdO1xuICBvdXRbNl0gPSBhWzZdO1xuICBvdXRbN10gPSBhWzddO1xuICBvdXRbOF0gPSBhWzhdO1xuICBvdXRbOV0gPSBhWzldO1xuICBvdXRbMTBdID0gYVsxMF07XG4gIG91dFsxMV0gPSBhWzExXTtcbiAgb3V0WzEyXSA9IGFbMTJdO1xuICBvdXRbMTNdID0gYVsxM107XG4gIG91dFsxNF0gPSBhWzE0XTtcbiAgb3V0WzE1XSA9IGFbMTVdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSBtYXQ0IHRvIGFub3RoZXJcclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHkob3V0LCBhKSB7XG4gIG91dFswXSA9IGFbMF07XG4gIG91dFsxXSA9IGFbMV07XG4gIG91dFsyXSA9IGFbMl07XG4gIG91dFszXSA9IGFbM107XG4gIG91dFs0XSA9IGFbNF07XG4gIG91dFs1XSA9IGFbNV07XG4gIG91dFs2XSA9IGFbNl07XG4gIG91dFs3XSA9IGFbN107XG4gIG91dFs4XSA9IGFbOF07XG4gIG91dFs5XSA9IGFbOV07XG4gIG91dFsxMF0gPSBhWzEwXTtcbiAgb3V0WzExXSA9IGFbMTFdO1xuICBvdXRbMTJdID0gYVsxMl07XG4gIG91dFsxM10gPSBhWzEzXTtcbiAgb3V0WzE0XSA9IGFbMTRdO1xuICBvdXRbMTVdID0gYVsxNV07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQ3JlYXRlIGEgbmV3IG1hdDQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMDAgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggMClcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0wMSBDb21wb25lbnQgaW4gY29sdW1uIDAsIHJvdyAxIHBvc2l0aW9uIChpbmRleCAxKVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTAyIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDIgcG9zaXRpb24gKGluZGV4IDIpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMDMgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggMylcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0xMCBDb21wb25lbnQgaW4gY29sdW1uIDEsIHJvdyAwIHBvc2l0aW9uIChpbmRleCA0KVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTExIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDEgcG9zaXRpb24gKGluZGV4IDUpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMTIgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggNilcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0xMyBDb21wb25lbnQgaW4gY29sdW1uIDEsIHJvdyAzIHBvc2l0aW9uIChpbmRleCA3KVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTIwIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDAgcG9zaXRpb24gKGluZGV4IDgpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMjEgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggOSlcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0yMiBDb21wb25lbnQgaW4gY29sdW1uIDIsIHJvdyAyIHBvc2l0aW9uIChpbmRleCAxMClcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0yMyBDb21wb25lbnQgaW4gY29sdW1uIDIsIHJvdyAzIHBvc2l0aW9uIChpbmRleCAxMSlcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0zMCBDb21wb25lbnQgaW4gY29sdW1uIDMsIHJvdyAwIHBvc2l0aW9uIChpbmRleCAxMilcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0zMSBDb21wb25lbnQgaW4gY29sdW1uIDMsIHJvdyAxIHBvc2l0aW9uIChpbmRleCAxMylcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0zMiBDb21wb25lbnQgaW4gY29sdW1uIDMsIHJvdyAyIHBvc2l0aW9uIChpbmRleCAxNClcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0zMyBDb21wb25lbnQgaW4gY29sdW1uIDMsIHJvdyAzIHBvc2l0aW9uIChpbmRleCAxNSlcclxuICogQHJldHVybnMge21hdDR9IEEgbmV3IG1hdDRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tVmFsdWVzKG0wMCwgbTAxLCBtMDIsIG0wMywgbTEwLCBtMTEsIG0xMiwgbTEzLCBtMjAsIG0yMSwgbTIyLCBtMjMsIG0zMCwgbTMxLCBtMzIsIG0zMykge1xuICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoMTYpO1xuICBvdXRbMF0gPSBtMDA7XG4gIG91dFsxXSA9IG0wMTtcbiAgb3V0WzJdID0gbTAyO1xuICBvdXRbM10gPSBtMDM7XG4gIG91dFs0XSA9IG0xMDtcbiAgb3V0WzVdID0gbTExO1xuICBvdXRbNl0gPSBtMTI7XG4gIG91dFs3XSA9IG0xMztcbiAgb3V0WzhdID0gbTIwO1xuICBvdXRbOV0gPSBtMjE7XG4gIG91dFsxMF0gPSBtMjI7XG4gIG91dFsxMV0gPSBtMjM7XG4gIG91dFsxMl0gPSBtMzA7XG4gIG91dFsxM10gPSBtMzE7XG4gIG91dFsxNF0gPSBtMzI7XG4gIG91dFsxNV0gPSBtMzM7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgbWF0NCB0byB0aGUgZ2l2ZW4gdmFsdWVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMDAgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggMClcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0wMSBDb21wb25lbnQgaW4gY29sdW1uIDAsIHJvdyAxIHBvc2l0aW9uIChpbmRleCAxKVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTAyIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDIgcG9zaXRpb24gKGluZGV4IDIpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMDMgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggMylcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0xMCBDb21wb25lbnQgaW4gY29sdW1uIDEsIHJvdyAwIHBvc2l0aW9uIChpbmRleCA0KVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTExIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDEgcG9zaXRpb24gKGluZGV4IDUpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMTIgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggNilcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0xMyBDb21wb25lbnQgaW4gY29sdW1uIDEsIHJvdyAzIHBvc2l0aW9uIChpbmRleCA3KVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTIwIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDAgcG9zaXRpb24gKGluZGV4IDgpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMjEgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggOSlcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0yMiBDb21wb25lbnQgaW4gY29sdW1uIDIsIHJvdyAyIHBvc2l0aW9uIChpbmRleCAxMClcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0yMyBDb21wb25lbnQgaW4gY29sdW1uIDIsIHJvdyAzIHBvc2l0aW9uIChpbmRleCAxMSlcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0zMCBDb21wb25lbnQgaW4gY29sdW1uIDMsIHJvdyAwIHBvc2l0aW9uIChpbmRleCAxMilcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0zMSBDb21wb25lbnQgaW4gY29sdW1uIDMsIHJvdyAxIHBvc2l0aW9uIChpbmRleCAxMylcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0zMiBDb21wb25lbnQgaW4gY29sdW1uIDMsIHJvdyAyIHBvc2l0aW9uIChpbmRleCAxNClcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0zMyBDb21wb25lbnQgaW4gY29sdW1uIDMsIHJvdyAzIHBvc2l0aW9uIChpbmRleCAxNSlcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNldChvdXQsIG0wMCwgbTAxLCBtMDIsIG0wMywgbTEwLCBtMTEsIG0xMiwgbTEzLCBtMjAsIG0yMSwgbTIyLCBtMjMsIG0zMCwgbTMxLCBtMzIsIG0zMykge1xuICBvdXRbMF0gPSBtMDA7XG4gIG91dFsxXSA9IG0wMTtcbiAgb3V0WzJdID0gbTAyO1xuICBvdXRbM10gPSBtMDM7XG4gIG91dFs0XSA9IG0xMDtcbiAgb3V0WzVdID0gbTExO1xuICBvdXRbNl0gPSBtMTI7XG4gIG91dFs3XSA9IG0xMztcbiAgb3V0WzhdID0gbTIwO1xuICBvdXRbOV0gPSBtMjE7XG4gIG91dFsxMF0gPSBtMjI7XG4gIG91dFsxMV0gPSBtMjM7XG4gIG91dFsxMl0gPSBtMzA7XG4gIG91dFsxM10gPSBtMzE7XG4gIG91dFsxNF0gPSBtMzI7XG4gIG91dFsxNV0gPSBtMzM7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogU2V0IGEgbWF0NCB0byB0aGUgaWRlbnRpdHkgbWF0cml4XHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpZGVudGl0eShvdXQpIHtcbiAgb3V0WzBdID0gMTtcbiAgb3V0WzFdID0gMDtcbiAgb3V0WzJdID0gMDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gMDtcbiAgb3V0WzVdID0gMTtcbiAgb3V0WzZdID0gMDtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gMDtcbiAgb3V0WzldID0gMDtcbiAgb3V0WzEwXSA9IDE7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gMDtcbiAgb3V0WzEzXSA9IDA7XG4gIG91dFsxNF0gPSAwO1xuICBvdXRbMTVdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBUcmFuc3Bvc2UgdGhlIHZhbHVlcyBvZiBhIG1hdDRcclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zcG9zZShvdXQsIGEpIHtcbiAgLy8gSWYgd2UgYXJlIHRyYW5zcG9zaW5nIG91cnNlbHZlcyB3ZSBjYW4gc2tpcCBhIGZldyBzdGVwcyBidXQgaGF2ZSB0byBjYWNoZSBzb21lIHZhbHVlc1xuICBpZiAob3V0ID09PSBhKSB7XG4gICAgdmFyIGEwMSA9IGFbMV0sXG4gICAgICAgIGEwMiA9IGFbMl0sXG4gICAgICAgIGEwMyA9IGFbM107XG4gICAgdmFyIGExMiA9IGFbNl0sXG4gICAgICAgIGExMyA9IGFbN107XG4gICAgdmFyIGEyMyA9IGFbMTFdO1xuICAgIG91dFsxXSA9IGFbNF07XG4gICAgb3V0WzJdID0gYVs4XTtcbiAgICBvdXRbM10gPSBhWzEyXTtcbiAgICBvdXRbNF0gPSBhMDE7XG4gICAgb3V0WzZdID0gYVs5XTtcbiAgICBvdXRbN10gPSBhWzEzXTtcbiAgICBvdXRbOF0gPSBhMDI7XG4gICAgb3V0WzldID0gYTEyO1xuICAgIG91dFsxMV0gPSBhWzE0XTtcbiAgICBvdXRbMTJdID0gYTAzO1xuICAgIG91dFsxM10gPSBhMTM7XG4gICAgb3V0WzE0XSA9IGEyMztcbiAgfSBlbHNlIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbNF07XG4gICAgb3V0WzJdID0gYVs4XTtcbiAgICBvdXRbM10gPSBhWzEyXTtcbiAgICBvdXRbNF0gPSBhWzFdO1xuICAgIG91dFs1XSA9IGFbNV07XG4gICAgb3V0WzZdID0gYVs5XTtcbiAgICBvdXRbN10gPSBhWzEzXTtcbiAgICBvdXRbOF0gPSBhWzJdO1xuICAgIG91dFs5XSA9IGFbNl07XG4gICAgb3V0WzEwXSA9IGFbMTBdO1xuICAgIG91dFsxMV0gPSBhWzE0XTtcbiAgICBvdXRbMTJdID0gYVszXTtcbiAgICBvdXRbMTNdID0gYVs3XTtcbiAgICBvdXRbMTRdID0gYVsxMV07XG4gICAgb3V0WzE1XSA9IGFbMTVdO1xuICB9XG5cbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBJbnZlcnRzIGEgbWF0NFxyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJ0KG91dCwgYSkge1xuICB2YXIgYTAwID0gYVswXSxcbiAgICAgIGEwMSA9IGFbMV0sXG4gICAgICBhMDIgPSBhWzJdLFxuICAgICAgYTAzID0gYVszXTtcbiAgdmFyIGExMCA9IGFbNF0sXG4gICAgICBhMTEgPSBhWzVdLFxuICAgICAgYTEyID0gYVs2XSxcbiAgICAgIGExMyA9IGFbN107XG4gIHZhciBhMjAgPSBhWzhdLFxuICAgICAgYTIxID0gYVs5XSxcbiAgICAgIGEyMiA9IGFbMTBdLFxuICAgICAgYTIzID0gYVsxMV07XG4gIHZhciBhMzAgPSBhWzEyXSxcbiAgICAgIGEzMSA9IGFbMTNdLFxuICAgICAgYTMyID0gYVsxNF0sXG4gICAgICBhMzMgPSBhWzE1XTtcbiAgdmFyIGIwMCA9IGEwMCAqIGExMSAtIGEwMSAqIGExMDtcbiAgdmFyIGIwMSA9IGEwMCAqIGExMiAtIGEwMiAqIGExMDtcbiAgdmFyIGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMDtcbiAgdmFyIGIwMyA9IGEwMSAqIGExMiAtIGEwMiAqIGExMTtcbiAgdmFyIGIwNCA9IGEwMSAqIGExMyAtIGEwMyAqIGExMTtcbiAgdmFyIGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMjtcbiAgdmFyIGIwNiA9IGEyMCAqIGEzMSAtIGEyMSAqIGEzMDtcbiAgdmFyIGIwNyA9IGEyMCAqIGEzMiAtIGEyMiAqIGEzMDtcbiAgdmFyIGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMDtcbiAgdmFyIGIwOSA9IGEyMSAqIGEzMiAtIGEyMiAqIGEzMTtcbiAgdmFyIGIxMCA9IGEyMSAqIGEzMyAtIGEyMyAqIGEzMTtcbiAgdmFyIGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMjsgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuXG4gIHZhciBkZXQgPSBiMDAgKiBiMTEgLSBiMDEgKiBiMTAgKyBiMDIgKiBiMDkgKyBiMDMgKiBiMDggLSBiMDQgKiBiMDcgKyBiMDUgKiBiMDY7XG5cbiAgaWYgKCFkZXQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGRldCA9IDEuMCAvIGRldDtcbiAgb3V0WzBdID0gKGExMSAqIGIxMSAtIGExMiAqIGIxMCArIGExMyAqIGIwOSkgKiBkZXQ7XG4gIG91dFsxXSA9IChhMDIgKiBiMTAgLSBhMDEgKiBiMTEgLSBhMDMgKiBiMDkpICogZGV0O1xuICBvdXRbMl0gPSAoYTMxICogYjA1IC0gYTMyICogYjA0ICsgYTMzICogYjAzKSAqIGRldDtcbiAgb3V0WzNdID0gKGEyMiAqIGIwNCAtIGEyMSAqIGIwNSAtIGEyMyAqIGIwMykgKiBkZXQ7XG4gIG91dFs0XSA9IChhMTIgKiBiMDggLSBhMTAgKiBiMTEgLSBhMTMgKiBiMDcpICogZGV0O1xuICBvdXRbNV0gPSAoYTAwICogYjExIC0gYTAyICogYjA4ICsgYTAzICogYjA3KSAqIGRldDtcbiAgb3V0WzZdID0gKGEzMiAqIGIwMiAtIGEzMCAqIGIwNSAtIGEzMyAqIGIwMSkgKiBkZXQ7XG4gIG91dFs3XSA9IChhMjAgKiBiMDUgLSBhMjIgKiBiMDIgKyBhMjMgKiBiMDEpICogZGV0O1xuICBvdXRbOF0gPSAoYTEwICogYjEwIC0gYTExICogYjA4ICsgYTEzICogYjA2KSAqIGRldDtcbiAgb3V0WzldID0gKGEwMSAqIGIwOCAtIGEwMCAqIGIxMCAtIGEwMyAqIGIwNikgKiBkZXQ7XG4gIG91dFsxMF0gPSAoYTMwICogYjA0IC0gYTMxICogYjAyICsgYTMzICogYjAwKSAqIGRldDtcbiAgb3V0WzExXSA9IChhMjEgKiBiMDIgLSBhMjAgKiBiMDQgLSBhMjMgKiBiMDApICogZGV0O1xuICBvdXRbMTJdID0gKGExMSAqIGIwNyAtIGExMCAqIGIwOSAtIGExMiAqIGIwNikgKiBkZXQ7XG4gIG91dFsxM10gPSAoYTAwICogYjA5IC0gYTAxICogYjA3ICsgYTAyICogYjA2KSAqIGRldDtcbiAgb3V0WzE0XSA9IChhMzEgKiBiMDEgLSBhMzAgKiBiMDMgLSBhMzIgKiBiMDApICogZGV0O1xuICBvdXRbMTVdID0gKGEyMCAqIGIwMyAtIGEyMSAqIGIwMSArIGEyMiAqIGIwMCkgKiBkZXQ7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgYWRqdWdhdGUgb2YgYSBtYXQ0XHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGpvaW50KG91dCwgYSkge1xuICB2YXIgYTAwID0gYVswXSxcbiAgICAgIGEwMSA9IGFbMV0sXG4gICAgICBhMDIgPSBhWzJdLFxuICAgICAgYTAzID0gYVszXTtcbiAgdmFyIGExMCA9IGFbNF0sXG4gICAgICBhMTEgPSBhWzVdLFxuICAgICAgYTEyID0gYVs2XSxcbiAgICAgIGExMyA9IGFbN107XG4gIHZhciBhMjAgPSBhWzhdLFxuICAgICAgYTIxID0gYVs5XSxcbiAgICAgIGEyMiA9IGFbMTBdLFxuICAgICAgYTIzID0gYVsxMV07XG4gIHZhciBhMzAgPSBhWzEyXSxcbiAgICAgIGEzMSA9IGFbMTNdLFxuICAgICAgYTMyID0gYVsxNF0sXG4gICAgICBhMzMgPSBhWzE1XTtcbiAgb3V0WzBdID0gYTExICogKGEyMiAqIGEzMyAtIGEyMyAqIGEzMikgLSBhMjEgKiAoYTEyICogYTMzIC0gYTEzICogYTMyKSArIGEzMSAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpO1xuICBvdXRbMV0gPSAtKGEwMSAqIChhMjIgKiBhMzMgLSBhMjMgKiBhMzIpIC0gYTIxICogKGEwMiAqIGEzMyAtIGEwMyAqIGEzMikgKyBhMzEgKiAoYTAyICogYTIzIC0gYTAzICogYTIyKSk7XG4gIG91dFsyXSA9IGEwMSAqIChhMTIgKiBhMzMgLSBhMTMgKiBhMzIpIC0gYTExICogKGEwMiAqIGEzMyAtIGEwMyAqIGEzMikgKyBhMzEgKiAoYTAyICogYTEzIC0gYTAzICogYTEyKTtcbiAgb3V0WzNdID0gLShhMDEgKiAoYTEyICogYTIzIC0gYTEzICogYTIyKSAtIGExMSAqIChhMDIgKiBhMjMgLSBhMDMgKiBhMjIpICsgYTIxICogKGEwMiAqIGExMyAtIGEwMyAqIGExMikpO1xuICBvdXRbNF0gPSAtKGExMCAqIChhMjIgKiBhMzMgLSBhMjMgKiBhMzIpIC0gYTIwICogKGExMiAqIGEzMyAtIGExMyAqIGEzMikgKyBhMzAgKiAoYTEyICogYTIzIC0gYTEzICogYTIyKSk7XG4gIG91dFs1XSA9IGEwMCAqIChhMjIgKiBhMzMgLSBhMjMgKiBhMzIpIC0gYTIwICogKGEwMiAqIGEzMyAtIGEwMyAqIGEzMikgKyBhMzAgKiAoYTAyICogYTIzIC0gYTAzICogYTIyKTtcbiAgb3V0WzZdID0gLShhMDAgKiAoYTEyICogYTMzIC0gYTEzICogYTMyKSAtIGExMCAqIChhMDIgKiBhMzMgLSBhMDMgKiBhMzIpICsgYTMwICogKGEwMiAqIGExMyAtIGEwMyAqIGExMikpO1xuICBvdXRbN10gPSBhMDAgKiAoYTEyICogYTIzIC0gYTEzICogYTIyKSAtIGExMCAqIChhMDIgKiBhMjMgLSBhMDMgKiBhMjIpICsgYTIwICogKGEwMiAqIGExMyAtIGEwMyAqIGExMik7XG4gIG91dFs4XSA9IGExMCAqIChhMjEgKiBhMzMgLSBhMjMgKiBhMzEpIC0gYTIwICogKGExMSAqIGEzMyAtIGExMyAqIGEzMSkgKyBhMzAgKiAoYTExICogYTIzIC0gYTEzICogYTIxKTtcbiAgb3V0WzldID0gLShhMDAgKiAoYTIxICogYTMzIC0gYTIzICogYTMxKSAtIGEyMCAqIChhMDEgKiBhMzMgLSBhMDMgKiBhMzEpICsgYTMwICogKGEwMSAqIGEyMyAtIGEwMyAqIGEyMSkpO1xuICBvdXRbMTBdID0gYTAwICogKGExMSAqIGEzMyAtIGExMyAqIGEzMSkgLSBhMTAgKiAoYTAxICogYTMzIC0gYTAzICogYTMxKSArIGEzMCAqIChhMDEgKiBhMTMgLSBhMDMgKiBhMTEpO1xuICBvdXRbMTFdID0gLShhMDAgKiAoYTExICogYTIzIC0gYTEzICogYTIxKSAtIGExMCAqIChhMDEgKiBhMjMgLSBhMDMgKiBhMjEpICsgYTIwICogKGEwMSAqIGExMyAtIGEwMyAqIGExMSkpO1xuICBvdXRbMTJdID0gLShhMTAgKiAoYTIxICogYTMyIC0gYTIyICogYTMxKSAtIGEyMCAqIChhMTEgKiBhMzIgLSBhMTIgKiBhMzEpICsgYTMwICogKGExMSAqIGEyMiAtIGExMiAqIGEyMSkpO1xuICBvdXRbMTNdID0gYTAwICogKGEyMSAqIGEzMiAtIGEyMiAqIGEzMSkgLSBhMjAgKiAoYTAxICogYTMyIC0gYTAyICogYTMxKSArIGEzMCAqIChhMDEgKiBhMjIgLSBhMDIgKiBhMjEpO1xuICBvdXRbMTRdID0gLShhMDAgKiAoYTExICogYTMyIC0gYTEyICogYTMxKSAtIGExMCAqIChhMDEgKiBhMzIgLSBhMDIgKiBhMzEpICsgYTMwICogKGEwMSAqIGExMiAtIGEwMiAqIGExMSkpO1xuICBvdXRbMTVdID0gYTAwICogKGExMSAqIGEyMiAtIGExMiAqIGEyMSkgLSBhMTAgKiAoYTAxICogYTIyIC0gYTAyICogYTIxKSArIGEyMCAqIChhMDEgKiBhMTIgLSBhMDIgKiBhMTEpO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGRldGVybWluYW50IG9mIGEgbWF0NFxyXG4gKlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkZXRlcm1pbmFudCBvZiBhXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZGV0ZXJtaW5hbnQoYSkge1xuICB2YXIgYTAwID0gYVswXSxcbiAgICAgIGEwMSA9IGFbMV0sXG4gICAgICBhMDIgPSBhWzJdLFxuICAgICAgYTAzID0gYVszXTtcbiAgdmFyIGExMCA9IGFbNF0sXG4gICAgICBhMTEgPSBhWzVdLFxuICAgICAgYTEyID0gYVs2XSxcbiAgICAgIGExMyA9IGFbN107XG4gIHZhciBhMjAgPSBhWzhdLFxuICAgICAgYTIxID0gYVs5XSxcbiAgICAgIGEyMiA9IGFbMTBdLFxuICAgICAgYTIzID0gYVsxMV07XG4gIHZhciBhMzAgPSBhWzEyXSxcbiAgICAgIGEzMSA9IGFbMTNdLFxuICAgICAgYTMyID0gYVsxNF0sXG4gICAgICBhMzMgPSBhWzE1XTtcbiAgdmFyIGIwMCA9IGEwMCAqIGExMSAtIGEwMSAqIGExMDtcbiAgdmFyIGIwMSA9IGEwMCAqIGExMiAtIGEwMiAqIGExMDtcbiAgdmFyIGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMDtcbiAgdmFyIGIwMyA9IGEwMSAqIGExMiAtIGEwMiAqIGExMTtcbiAgdmFyIGIwNCA9IGEwMSAqIGExMyAtIGEwMyAqIGExMTtcbiAgdmFyIGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMjtcbiAgdmFyIGIwNiA9IGEyMCAqIGEzMSAtIGEyMSAqIGEzMDtcbiAgdmFyIGIwNyA9IGEyMCAqIGEzMiAtIGEyMiAqIGEzMDtcbiAgdmFyIGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMDtcbiAgdmFyIGIwOSA9IGEyMSAqIGEzMiAtIGEyMiAqIGEzMTtcbiAgdmFyIGIxMCA9IGEyMSAqIGEzMyAtIGEyMyAqIGEzMTtcbiAgdmFyIGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMjsgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuXG4gIHJldHVybiBiMDAgKiBiMTEgLSBiMDEgKiBiMTAgKyBiMDIgKiBiMDkgKyBiMDMgKiBiMDggLSBiMDQgKiBiMDcgKyBiMDUgKiBiMDY7XG59XG4vKipcclxuICogTXVsdGlwbGllcyB0d28gbWF0NHNcclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aXBseShvdXQsIGEsIGIpIHtcbiAgdmFyIGEwMCA9IGFbMF0sXG4gICAgICBhMDEgPSBhWzFdLFxuICAgICAgYTAyID0gYVsyXSxcbiAgICAgIGEwMyA9IGFbM107XG4gIHZhciBhMTAgPSBhWzRdLFxuICAgICAgYTExID0gYVs1XSxcbiAgICAgIGExMiA9IGFbNl0sXG4gICAgICBhMTMgPSBhWzddO1xuICB2YXIgYTIwID0gYVs4XSxcbiAgICAgIGEyMSA9IGFbOV0sXG4gICAgICBhMjIgPSBhWzEwXSxcbiAgICAgIGEyMyA9IGFbMTFdO1xuICB2YXIgYTMwID0gYVsxMl0sXG4gICAgICBhMzEgPSBhWzEzXSxcbiAgICAgIGEzMiA9IGFbMTRdLFxuICAgICAgYTMzID0gYVsxNV07IC8vIENhY2hlIG9ubHkgdGhlIGN1cnJlbnQgbGluZSBvZiB0aGUgc2Vjb25kIG1hdHJpeFxuXG4gIHZhciBiMCA9IGJbMF0sXG4gICAgICBiMSA9IGJbMV0sXG4gICAgICBiMiA9IGJbMl0sXG4gICAgICBiMyA9IGJbM107XG4gIG91dFswXSA9IGIwICogYTAwICsgYjEgKiBhMTAgKyBiMiAqIGEyMCArIGIzICogYTMwO1xuICBvdXRbMV0gPSBiMCAqIGEwMSArIGIxICogYTExICsgYjIgKiBhMjEgKyBiMyAqIGEzMTtcbiAgb3V0WzJdID0gYjAgKiBhMDIgKyBiMSAqIGExMiArIGIyICogYTIyICsgYjMgKiBhMzI7XG4gIG91dFszXSA9IGIwICogYTAzICsgYjEgKiBhMTMgKyBiMiAqIGEyMyArIGIzICogYTMzO1xuICBiMCA9IGJbNF07XG4gIGIxID0gYls1XTtcbiAgYjIgPSBiWzZdO1xuICBiMyA9IGJbN107XG4gIG91dFs0XSA9IGIwICogYTAwICsgYjEgKiBhMTAgKyBiMiAqIGEyMCArIGIzICogYTMwO1xuICBvdXRbNV0gPSBiMCAqIGEwMSArIGIxICogYTExICsgYjIgKiBhMjEgKyBiMyAqIGEzMTtcbiAgb3V0WzZdID0gYjAgKiBhMDIgKyBiMSAqIGExMiArIGIyICogYTIyICsgYjMgKiBhMzI7XG4gIG91dFs3XSA9IGIwICogYTAzICsgYjEgKiBhMTMgKyBiMiAqIGEyMyArIGIzICogYTMzO1xuICBiMCA9IGJbOF07XG4gIGIxID0gYls5XTtcbiAgYjIgPSBiWzEwXTtcbiAgYjMgPSBiWzExXTtcbiAgb3V0WzhdID0gYjAgKiBhMDAgKyBiMSAqIGExMCArIGIyICogYTIwICsgYjMgKiBhMzA7XG4gIG91dFs5XSA9IGIwICogYTAxICsgYjEgKiBhMTEgKyBiMiAqIGEyMSArIGIzICogYTMxO1xuICBvdXRbMTBdID0gYjAgKiBhMDIgKyBiMSAqIGExMiArIGIyICogYTIyICsgYjMgKiBhMzI7XG4gIG91dFsxMV0gPSBiMCAqIGEwMyArIGIxICogYTEzICsgYjIgKiBhMjMgKyBiMyAqIGEzMztcbiAgYjAgPSBiWzEyXTtcbiAgYjEgPSBiWzEzXTtcbiAgYjIgPSBiWzE0XTtcbiAgYjMgPSBiWzE1XTtcbiAgb3V0WzEyXSA9IGIwICogYTAwICsgYjEgKiBhMTAgKyBiMiAqIGEyMCArIGIzICogYTMwO1xuICBvdXRbMTNdID0gYjAgKiBhMDEgKyBiMSAqIGExMSArIGIyICogYTIxICsgYjMgKiBhMzE7XG4gIG91dFsxNF0gPSBiMCAqIGEwMiArIGIxICogYTEyICsgYjIgKiBhMjIgKyBiMyAqIGEzMjtcbiAgb3V0WzE1XSA9IGIwICogYTAzICsgYjEgKiBhMTMgKyBiMiAqIGEyMyArIGIzICogYTMzO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFRyYW5zbGF0ZSBhIG1hdDQgYnkgdGhlIGdpdmVuIHZlY3RvclxyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgbWF0cml4IHRvIHRyYW5zbGF0ZVxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gdiB2ZWN0b3IgdG8gdHJhbnNsYXRlIGJ5XHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGUob3V0LCBhLCB2KSB7XG4gIHZhciB4ID0gdlswXSxcbiAgICAgIHkgPSB2WzFdLFxuICAgICAgeiA9IHZbMl07XG4gIHZhciBhMDAsIGEwMSwgYTAyLCBhMDM7XG4gIHZhciBhMTAsIGExMSwgYTEyLCBhMTM7XG4gIHZhciBhMjAsIGEyMSwgYTIyLCBhMjM7XG5cbiAgaWYgKGEgPT09IG91dCkge1xuICAgIG91dFsxMl0gPSBhWzBdICogeCArIGFbNF0gKiB5ICsgYVs4XSAqIHogKyBhWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxXSAqIHggKyBhWzVdICogeSArIGFbOV0gKiB6ICsgYVsxM107XG4gICAgb3V0WzE0XSA9IGFbMl0gKiB4ICsgYVs2XSAqIHkgKyBhWzEwXSAqIHogKyBhWzE0XTtcbiAgICBvdXRbMTVdID0gYVszXSAqIHggKyBhWzddICogeSArIGFbMTFdICogeiArIGFbMTVdO1xuICB9IGVsc2Uge1xuICAgIGEwMCA9IGFbMF07XG4gICAgYTAxID0gYVsxXTtcbiAgICBhMDIgPSBhWzJdO1xuICAgIGEwMyA9IGFbM107XG4gICAgYTEwID0gYVs0XTtcbiAgICBhMTEgPSBhWzVdO1xuICAgIGExMiA9IGFbNl07XG4gICAgYTEzID0gYVs3XTtcbiAgICBhMjAgPSBhWzhdO1xuICAgIGEyMSA9IGFbOV07XG4gICAgYTIyID0gYVsxMF07XG4gICAgYTIzID0gYVsxMV07XG4gICAgb3V0WzBdID0gYTAwO1xuICAgIG91dFsxXSA9IGEwMTtcbiAgICBvdXRbMl0gPSBhMDI7XG4gICAgb3V0WzNdID0gYTAzO1xuICAgIG91dFs0XSA9IGExMDtcbiAgICBvdXRbNV0gPSBhMTE7XG4gICAgb3V0WzZdID0gYTEyO1xuICAgIG91dFs3XSA9IGExMztcbiAgICBvdXRbOF0gPSBhMjA7XG4gICAgb3V0WzldID0gYTIxO1xuICAgIG91dFsxMF0gPSBhMjI7XG4gICAgb3V0WzExXSA9IGEyMztcbiAgICBvdXRbMTJdID0gYTAwICogeCArIGExMCAqIHkgKyBhMjAgKiB6ICsgYVsxMl07XG4gICAgb3V0WzEzXSA9IGEwMSAqIHggKyBhMTEgKiB5ICsgYTIxICogeiArIGFbMTNdO1xuICAgIG91dFsxNF0gPSBhMDIgKiB4ICsgYTEyICogeSArIGEyMiAqIHogKyBhWzE0XTtcbiAgICBvdXRbMTVdID0gYTAzICogeCArIGExMyAqIHkgKyBhMjMgKiB6ICsgYVsxNV07XG4gIH1cblxuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFNjYWxlcyB0aGUgbWF0NCBieSB0aGUgZGltZW5zaW9ucyBpbiB0aGUgZ2l2ZW4gdmVjMyBub3QgdXNpbmcgdmVjdG9yaXphdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgbWF0cml4IHRvIHNjYWxlXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSB2IHRoZSB2ZWMzIHRvIHNjYWxlIHRoZSBtYXRyaXggYnlcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKiovXG5cbmV4cG9ydCBmdW5jdGlvbiBzY2FsZShvdXQsIGEsIHYpIHtcbiAgdmFyIHggPSB2WzBdLFxuICAgICAgeSA9IHZbMV0sXG4gICAgICB6ID0gdlsyXTtcbiAgb3V0WzBdID0gYVswXSAqIHg7XG4gIG91dFsxXSA9IGFbMV0gKiB4O1xuICBvdXRbMl0gPSBhWzJdICogeDtcbiAgb3V0WzNdID0gYVszXSAqIHg7XG4gIG91dFs0XSA9IGFbNF0gKiB5O1xuICBvdXRbNV0gPSBhWzVdICogeTtcbiAgb3V0WzZdID0gYVs2XSAqIHk7XG4gIG91dFs3XSA9IGFbN10gKiB5O1xuICBvdXRbOF0gPSBhWzhdICogejtcbiAgb3V0WzldID0gYVs5XSAqIHo7XG4gIG91dFsxMF0gPSBhWzEwXSAqIHo7XG4gIG91dFsxMV0gPSBhWzExXSAqIHo7XG4gIG91dFsxMl0gPSBhWzEyXTtcbiAgb3V0WzEzXSA9IGFbMTNdO1xuICBvdXRbMTRdID0gYVsxNF07XG4gIG91dFsxNV0gPSBhWzE1XTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBSb3RhdGVzIGEgbWF0NCBieSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBnaXZlbiBheGlzXHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBheGlzIHRoZSBheGlzIHRvIHJvdGF0ZSBhcm91bmRcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZShvdXQsIGEsIHJhZCwgYXhpcykge1xuICB2YXIgeCA9IGF4aXNbMF0sXG4gICAgICB5ID0gYXhpc1sxXSxcbiAgICAgIHogPSBheGlzWzJdO1xuICB2YXIgbGVuID0gTWF0aC5oeXBvdCh4LCB5LCB6KTtcbiAgdmFyIHMsIGMsIHQ7XG4gIHZhciBhMDAsIGEwMSwgYTAyLCBhMDM7XG4gIHZhciBhMTAsIGExMSwgYTEyLCBhMTM7XG4gIHZhciBhMjAsIGEyMSwgYTIyLCBhMjM7XG4gIHZhciBiMDAsIGIwMSwgYjAyO1xuICB2YXIgYjEwLCBiMTEsIGIxMjtcbiAgdmFyIGIyMCwgYjIxLCBiMjI7XG5cbiAgaWYgKGxlbiA8IGdsTWF0cml4LkVQU0lMT04pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGxlbiA9IDEgLyBsZW47XG4gIHggKj0gbGVuO1xuICB5ICo9IGxlbjtcbiAgeiAqPSBsZW47XG4gIHMgPSBNYXRoLnNpbihyYWQpO1xuICBjID0gTWF0aC5jb3MocmFkKTtcbiAgdCA9IDEgLSBjO1xuICBhMDAgPSBhWzBdO1xuICBhMDEgPSBhWzFdO1xuICBhMDIgPSBhWzJdO1xuICBhMDMgPSBhWzNdO1xuICBhMTAgPSBhWzRdO1xuICBhMTEgPSBhWzVdO1xuICBhMTIgPSBhWzZdO1xuICBhMTMgPSBhWzddO1xuICBhMjAgPSBhWzhdO1xuICBhMjEgPSBhWzldO1xuICBhMjIgPSBhWzEwXTtcbiAgYTIzID0gYVsxMV07IC8vIENvbnN0cnVjdCB0aGUgZWxlbWVudHMgb2YgdGhlIHJvdGF0aW9uIG1hdHJpeFxuXG4gIGIwMCA9IHggKiB4ICogdCArIGM7XG4gIGIwMSA9IHkgKiB4ICogdCArIHogKiBzO1xuICBiMDIgPSB6ICogeCAqIHQgLSB5ICogcztcbiAgYjEwID0geCAqIHkgKiB0IC0geiAqIHM7XG4gIGIxMSA9IHkgKiB5ICogdCArIGM7XG4gIGIxMiA9IHogKiB5ICogdCArIHggKiBzO1xuICBiMjAgPSB4ICogeiAqIHQgKyB5ICogcztcbiAgYjIxID0geSAqIHogKiB0IC0geCAqIHM7XG4gIGIyMiA9IHogKiB6ICogdCArIGM7IC8vIFBlcmZvcm0gcm90YXRpb24tc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG5cbiAgb3V0WzBdID0gYTAwICogYjAwICsgYTEwICogYjAxICsgYTIwICogYjAyO1xuICBvdXRbMV0gPSBhMDEgKiBiMDAgKyBhMTEgKiBiMDEgKyBhMjEgKiBiMDI7XG4gIG91dFsyXSA9IGEwMiAqIGIwMCArIGExMiAqIGIwMSArIGEyMiAqIGIwMjtcbiAgb3V0WzNdID0gYTAzICogYjAwICsgYTEzICogYjAxICsgYTIzICogYjAyO1xuICBvdXRbNF0gPSBhMDAgKiBiMTAgKyBhMTAgKiBiMTEgKyBhMjAgKiBiMTI7XG4gIG91dFs1XSA9IGEwMSAqIGIxMCArIGExMSAqIGIxMSArIGEyMSAqIGIxMjtcbiAgb3V0WzZdID0gYTAyICogYjEwICsgYTEyICogYjExICsgYTIyICogYjEyO1xuICBvdXRbN10gPSBhMDMgKiBiMTAgKyBhMTMgKiBiMTEgKyBhMjMgKiBiMTI7XG4gIG91dFs4XSA9IGEwMCAqIGIyMCArIGExMCAqIGIyMSArIGEyMCAqIGIyMjtcbiAgb3V0WzldID0gYTAxICogYjIwICsgYTExICogYjIxICsgYTIxICogYjIyO1xuICBvdXRbMTBdID0gYTAyICogYjIwICsgYTEyICogYjIxICsgYTIyICogYjIyO1xuICBvdXRbMTFdID0gYTAzICogYjIwICsgYTEzICogYjIxICsgYTIzICogYjIyO1xuXG4gIGlmIChhICE9PSBvdXQpIHtcbiAgICAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCBsYXN0IHJvd1xuICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxM107XG4gICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogUm90YXRlcyBhIG1hdHJpeCBieSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBYIGF4aXNcclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcclxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZVgob3V0LCBhLCByYWQpIHtcbiAgdmFyIHMgPSBNYXRoLnNpbihyYWQpO1xuICB2YXIgYyA9IE1hdGguY29zKHJhZCk7XG4gIHZhciBhMTAgPSBhWzRdO1xuICB2YXIgYTExID0gYVs1XTtcbiAgdmFyIGExMiA9IGFbNl07XG4gIHZhciBhMTMgPSBhWzddO1xuICB2YXIgYTIwID0gYVs4XTtcbiAgdmFyIGEyMSA9IGFbOV07XG4gIHZhciBhMjIgPSBhWzEwXTtcbiAgdmFyIGEyMyA9IGFbMTFdO1xuXG4gIGlmIChhICE9PSBvdXQpIHtcbiAgICAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCByb3dzXG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICBvdXRbMTVdID0gYVsxNV07XG4gIH0gLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuXG5cbiAgb3V0WzRdID0gYTEwICogYyArIGEyMCAqIHM7XG4gIG91dFs1XSA9IGExMSAqIGMgKyBhMjEgKiBzO1xuICBvdXRbNl0gPSBhMTIgKiBjICsgYTIyICogcztcbiAgb3V0WzddID0gYTEzICogYyArIGEyMyAqIHM7XG4gIG91dFs4XSA9IGEyMCAqIGMgLSBhMTAgKiBzO1xuICBvdXRbOV0gPSBhMjEgKiBjIC0gYTExICogcztcbiAgb3V0WzEwXSA9IGEyMiAqIGMgLSBhMTIgKiBzO1xuICBvdXRbMTFdID0gYTIzICogYyAtIGExMyAqIHM7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogUm90YXRlcyBhIG1hdHJpeCBieSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBZIGF4aXNcclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcclxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZVkob3V0LCBhLCByYWQpIHtcbiAgdmFyIHMgPSBNYXRoLnNpbihyYWQpO1xuICB2YXIgYyA9IE1hdGguY29zKHJhZCk7XG4gIHZhciBhMDAgPSBhWzBdO1xuICB2YXIgYTAxID0gYVsxXTtcbiAgdmFyIGEwMiA9IGFbMl07XG4gIHZhciBhMDMgPSBhWzNdO1xuICB2YXIgYTIwID0gYVs4XTtcbiAgdmFyIGEyMSA9IGFbOV07XG4gIHZhciBhMjIgPSBhWzEwXTtcbiAgdmFyIGEyMyA9IGFbMTFdO1xuXG4gIGlmIChhICE9PSBvdXQpIHtcbiAgICAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCByb3dzXG4gICAgb3V0WzRdID0gYVs0XTtcbiAgICBvdXRbNV0gPSBhWzVdO1xuICAgIG91dFs2XSA9IGFbNl07XG4gICAgb3V0WzddID0gYVs3XTtcbiAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICBvdXRbMTVdID0gYVsxNV07XG4gIH0gLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuXG5cbiAgb3V0WzBdID0gYTAwICogYyAtIGEyMCAqIHM7XG4gIG91dFsxXSA9IGEwMSAqIGMgLSBhMjEgKiBzO1xuICBvdXRbMl0gPSBhMDIgKiBjIC0gYTIyICogcztcbiAgb3V0WzNdID0gYTAzICogYyAtIGEyMyAqIHM7XG4gIG91dFs4XSA9IGEwMCAqIHMgKyBhMjAgKiBjO1xuICBvdXRbOV0gPSBhMDEgKiBzICsgYTIxICogYztcbiAgb3V0WzEwXSA9IGEwMiAqIHMgKyBhMjIgKiBjO1xuICBvdXRbMTFdID0gYTAzICogcyArIGEyMyAqIGM7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogUm90YXRlcyBhIG1hdHJpeCBieSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBaIGF4aXNcclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcclxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZVoob3V0LCBhLCByYWQpIHtcbiAgdmFyIHMgPSBNYXRoLnNpbihyYWQpO1xuICB2YXIgYyA9IE1hdGguY29zKHJhZCk7XG4gIHZhciBhMDAgPSBhWzBdO1xuICB2YXIgYTAxID0gYVsxXTtcbiAgdmFyIGEwMiA9IGFbMl07XG4gIHZhciBhMDMgPSBhWzNdO1xuICB2YXIgYTEwID0gYVs0XTtcbiAgdmFyIGExMSA9IGFbNV07XG4gIHZhciBhMTIgPSBhWzZdO1xuICB2YXIgYTEzID0gYVs3XTtcblxuICBpZiAoYSAhPT0gb3V0KSB7XG4gICAgLy8gSWYgdGhlIHNvdXJjZSBhbmQgZGVzdGluYXRpb24gZGlmZmVyLCBjb3B5IHRoZSB1bmNoYW5nZWQgbGFzdCByb3dcbiAgICBvdXRbOF0gPSBhWzhdO1xuICAgIG91dFs5XSA9IGFbOV07XG4gICAgb3V0WzEwXSA9IGFbMTBdO1xuICAgIG91dFsxMV0gPSBhWzExXTtcbiAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICBvdXRbMTVdID0gYVsxNV07XG4gIH0gLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuXG5cbiAgb3V0WzBdID0gYTAwICogYyArIGExMCAqIHM7XG4gIG91dFsxXSA9IGEwMSAqIGMgKyBhMTEgKiBzO1xuICBvdXRbMl0gPSBhMDIgKiBjICsgYTEyICogcztcbiAgb3V0WzNdID0gYTAzICogYyArIGExMyAqIHM7XG4gIG91dFs0XSA9IGExMCAqIGMgLSBhMDAgKiBzO1xuICBvdXRbNV0gPSBhMTEgKiBjIC0gYTAxICogcztcbiAgb3V0WzZdID0gYTEyICogYyAtIGEwMiAqIHM7XG4gIG91dFs3XSA9IGExMyAqIGMgLSBhMDMgKiBzO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIHZlY3RvciB0cmFuc2xhdGlvblxyXG4gKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcclxuICpcclxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XHJcbiAqICAgICBtYXQ0LnRyYW5zbGF0ZShkZXN0LCBkZXN0LCB2ZWMpO1xyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSB2IFRyYW5zbGF0aW9uIHZlY3RvclxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVRyYW5zbGF0aW9uKG91dCwgdikge1xuICBvdXRbMF0gPSAxO1xuICBvdXRbMV0gPSAwO1xuICBvdXRbMl0gPSAwO1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSAwO1xuICBvdXRbNV0gPSAxO1xuICBvdXRbNl0gPSAwO1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSAwO1xuICBvdXRbOV0gPSAwO1xuICBvdXRbMTBdID0gMTtcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSB2WzBdO1xuICBvdXRbMTNdID0gdlsxXTtcbiAgb3V0WzE0XSA9IHZbMl07XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIHZlY3RvciBzY2FsaW5nXHJcbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxyXG4gKlxyXG4gKiAgICAgbWF0NC5pZGVudGl0eShkZXN0KTtcclxuICogICAgIG1hdDQuc2NhbGUoZGVzdCwgZGVzdCwgdmVjKTtcclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gdiBTY2FsaW5nIHZlY3RvclxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVNjYWxpbmcob3V0LCB2KSB7XG4gIG91dFswXSA9IHZbMF07XG4gIG91dFsxXSA9IDA7XG4gIG91dFsyXSA9IDA7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IDA7XG4gIG91dFs1XSA9IHZbMV07XG4gIG91dFs2XSA9IDA7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9IDA7XG4gIG91dFs5XSA9IDA7XG4gIG91dFsxMF0gPSB2WzJdO1xuICBvdXRbMTFdID0gMDtcbiAgb3V0WzEyXSA9IDA7XG4gIG91dFsxM10gPSAwO1xuICBvdXRbMTRdID0gMDtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgZ2l2ZW4gYW5nbGUgYXJvdW5kIGEgZ2l2ZW4gYXhpc1xyXG4gKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcclxuICpcclxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XHJcbiAqICAgICBtYXQ0LnJvdGF0ZShkZXN0LCBkZXN0LCByYWQsIGF4aXMpO1xyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBheGlzIHRoZSBheGlzIHRvIHJvdGF0ZSBhcm91bmRcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21Sb3RhdGlvbihvdXQsIHJhZCwgYXhpcykge1xuICB2YXIgeCA9IGF4aXNbMF0sXG4gICAgICB5ID0gYXhpc1sxXSxcbiAgICAgIHogPSBheGlzWzJdO1xuICB2YXIgbGVuID0gTWF0aC5oeXBvdCh4LCB5LCB6KTtcbiAgdmFyIHMsIGMsIHQ7XG5cbiAgaWYgKGxlbiA8IGdsTWF0cml4LkVQU0lMT04pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGxlbiA9IDEgLyBsZW47XG4gIHggKj0gbGVuO1xuICB5ICo9IGxlbjtcbiAgeiAqPSBsZW47XG4gIHMgPSBNYXRoLnNpbihyYWQpO1xuICBjID0gTWF0aC5jb3MocmFkKTtcbiAgdCA9IDEgLSBjOyAvLyBQZXJmb3JtIHJvdGF0aW9uLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuXG4gIG91dFswXSA9IHggKiB4ICogdCArIGM7XG4gIG91dFsxXSA9IHkgKiB4ICogdCArIHogKiBzO1xuICBvdXRbMl0gPSB6ICogeCAqIHQgLSB5ICogcztcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0geCAqIHkgKiB0IC0geiAqIHM7XG4gIG91dFs1XSA9IHkgKiB5ICogdCArIGM7XG4gIG91dFs2XSA9IHogKiB5ICogdCArIHggKiBzO1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSB4ICogeiAqIHQgKyB5ICogcztcbiAgb3V0WzldID0geSAqIHogKiB0IC0geCAqIHM7XG4gIG91dFsxMF0gPSB6ICogeiAqIHQgKyBjO1xuICBvdXRbMTFdID0gMDtcbiAgb3V0WzEyXSA9IDA7XG4gIG91dFsxM10gPSAwO1xuICBvdXRbMTRdID0gMDtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFggYXhpc1xyXG4gKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcclxuICpcclxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XHJcbiAqICAgICBtYXQ0LnJvdGF0ZVgoZGVzdCwgZGVzdCwgcmFkKTtcclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxyXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVhSb3RhdGlvbihvdXQsIHJhZCkge1xuICB2YXIgcyA9IE1hdGguc2luKHJhZCk7XG4gIHZhciBjID0gTWF0aC5jb3MocmFkKTsgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuXG4gIG91dFswXSA9IDE7XG4gIG91dFsxXSA9IDA7XG4gIG91dFsyXSA9IDA7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IDA7XG4gIG91dFs1XSA9IGM7XG4gIG91dFs2XSA9IHM7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9IDA7XG4gIG91dFs5XSA9IC1zO1xuICBvdXRbMTBdID0gYztcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSAwO1xuICBvdXRbMTNdID0gMDtcbiAgb3V0WzE0XSA9IDA7XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBZIGF4aXNcclxuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XHJcbiAqXHJcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xyXG4gKiAgICAgbWF0NC5yb3RhdGVZKGRlc3QsIGRlc3QsIHJhZCk7XHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21ZUm90YXRpb24ob3V0LCByYWQpIHtcbiAgdmFyIHMgPSBNYXRoLnNpbihyYWQpO1xuICB2YXIgYyA9IE1hdGguY29zKHJhZCk7IC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cblxuICBvdXRbMF0gPSBjO1xuICBvdXRbMV0gPSAwO1xuICBvdXRbMl0gPSAtcztcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gMDtcbiAgb3V0WzVdID0gMTtcbiAgb3V0WzZdID0gMDtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gcztcbiAgb3V0WzldID0gMDtcbiAgb3V0WzEwXSA9IGM7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gMDtcbiAgb3V0WzEzXSA9IDA7XG4gIG91dFsxNF0gPSAwO1xuICBvdXRbMTVdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWiBheGlzXHJcbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxyXG4gKlxyXG4gKiAgICAgbWF0NC5pZGVudGl0eShkZXN0KTtcclxuICogICAgIG1hdDQucm90YXRlWihkZXN0LCBkZXN0LCByYWQpO1xyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tWlJvdGF0aW9uKG91dCwgcmFkKSB7XG4gIHZhciBzID0gTWF0aC5zaW4ocmFkKTtcbiAgdmFyIGMgPSBNYXRoLmNvcyhyYWQpOyAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG5cbiAgb3V0WzBdID0gYztcbiAgb3V0WzFdID0gcztcbiAgb3V0WzJdID0gMDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gLXM7XG4gIG91dFs1XSA9IGM7XG4gIG91dFs2XSA9IDA7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9IDA7XG4gIG91dFs5XSA9IDA7XG4gIG91dFsxMF0gPSAxO1xuICBvdXRbMTFdID0gMDtcbiAgb3V0WzEyXSA9IDA7XG4gIG91dFsxM10gPSAwO1xuICBvdXRbMTRdID0gMDtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgcXVhdGVybmlvbiByb3RhdGlvbiBhbmQgdmVjdG9yIHRyYW5zbGF0aW9uXHJcbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxyXG4gKlxyXG4gKiAgICAgbWF0NC5pZGVudGl0eShkZXN0KTtcclxuICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIHZlYyk7XHJcbiAqICAgICBsZXQgcXVhdE1hdCA9IG1hdDQuY3JlYXRlKCk7XHJcbiAqICAgICBxdWF0NC50b01hdDQocXVhdCwgcXVhdE1hdCk7XHJcbiAqICAgICBtYXQ0Lm11bHRpcGx5KGRlc3QsIHF1YXRNYXQpO1xyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XHJcbiAqIEBwYXJhbSB7cXVhdDR9IHEgUm90YXRpb24gcXVhdGVybmlvblxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gdiBUcmFuc2xhdGlvbiB2ZWN0b3JcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uKG91dCwgcSwgdikge1xuICAvLyBRdWF0ZXJuaW9uIG1hdGhcbiAgdmFyIHggPSBxWzBdLFxuICAgICAgeSA9IHFbMV0sXG4gICAgICB6ID0gcVsyXSxcbiAgICAgIHcgPSBxWzNdO1xuICB2YXIgeDIgPSB4ICsgeDtcbiAgdmFyIHkyID0geSArIHk7XG4gIHZhciB6MiA9IHogKyB6O1xuICB2YXIgeHggPSB4ICogeDI7XG4gIHZhciB4eSA9IHggKiB5MjtcbiAgdmFyIHh6ID0geCAqIHoyO1xuICB2YXIgeXkgPSB5ICogeTI7XG4gIHZhciB5eiA9IHkgKiB6MjtcbiAgdmFyIHp6ID0geiAqIHoyO1xuICB2YXIgd3ggPSB3ICogeDI7XG4gIHZhciB3eSA9IHcgKiB5MjtcbiAgdmFyIHd6ID0gdyAqIHoyO1xuICBvdXRbMF0gPSAxIC0gKHl5ICsgenopO1xuICBvdXRbMV0gPSB4eSArIHd6O1xuICBvdXRbMl0gPSB4eiAtIHd5O1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSB4eSAtIHd6O1xuICBvdXRbNV0gPSAxIC0gKHh4ICsgenopO1xuICBvdXRbNl0gPSB5eiArIHd4O1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSB4eiArIHd5O1xuICBvdXRbOV0gPSB5eiAtIHd4O1xuICBvdXRbMTBdID0gMSAtICh4eCArIHl5KTtcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSB2WzBdO1xuICBvdXRbMTNdID0gdlsxXTtcbiAgb3V0WzE0XSA9IHZbMl07XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcgbWF0NCBmcm9tIGEgZHVhbCBxdWF0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCBNYXRyaXhcclxuICogQHBhcmFtIHtSZWFkb25seVF1YXQyfSBhIER1YWwgUXVhdGVybmlvblxyXG4gKiBAcmV0dXJucyB7bWF0NH0gbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21RdWF0MihvdXQsIGEpIHtcbiAgdmFyIHRyYW5zbGF0aW9uID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoMyk7XG4gIHZhciBieCA9IC1hWzBdLFxuICAgICAgYnkgPSAtYVsxXSxcbiAgICAgIGJ6ID0gLWFbMl0sXG4gICAgICBidyA9IGFbM10sXG4gICAgICBheCA9IGFbNF0sXG4gICAgICBheSA9IGFbNV0sXG4gICAgICBheiA9IGFbNl0sXG4gICAgICBhdyA9IGFbN107XG4gIHZhciBtYWduaXR1ZGUgPSBieCAqIGJ4ICsgYnkgKiBieSArIGJ6ICogYnogKyBidyAqIGJ3OyAvL09ubHkgc2NhbGUgaWYgaXQgbWFrZXMgc2Vuc2VcblxuICBpZiAobWFnbml0dWRlID4gMCkge1xuICAgIHRyYW5zbGF0aW9uWzBdID0gKGF4ICogYncgKyBhdyAqIGJ4ICsgYXkgKiBieiAtIGF6ICogYnkpICogMiAvIG1hZ25pdHVkZTtcbiAgICB0cmFuc2xhdGlvblsxXSA9IChheSAqIGJ3ICsgYXcgKiBieSArIGF6ICogYnggLSBheCAqIGJ6KSAqIDIgLyBtYWduaXR1ZGU7XG4gICAgdHJhbnNsYXRpb25bMl0gPSAoYXogKiBidyArIGF3ICogYnogKyBheCAqIGJ5IC0gYXkgKiBieCkgKiAyIC8gbWFnbml0dWRlO1xuICB9IGVsc2Uge1xuICAgIHRyYW5zbGF0aW9uWzBdID0gKGF4ICogYncgKyBhdyAqIGJ4ICsgYXkgKiBieiAtIGF6ICogYnkpICogMjtcbiAgICB0cmFuc2xhdGlvblsxXSA9IChheSAqIGJ3ICsgYXcgKiBieSArIGF6ICogYnggLSBheCAqIGJ6KSAqIDI7XG4gICAgdHJhbnNsYXRpb25bMl0gPSAoYXogKiBidyArIGF3ICogYnogKyBheCAqIGJ5IC0gYXkgKiBieCkgKiAyO1xuICB9XG5cbiAgZnJvbVJvdGF0aW9uVHJhbnNsYXRpb24ob3V0LCBhLCB0cmFuc2xhdGlvbik7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogUmV0dXJucyB0aGUgdHJhbnNsYXRpb24gdmVjdG9yIGNvbXBvbmVudCBvZiBhIHRyYW5zZm9ybWF0aW9uXHJcbiAqICBtYXRyaXguIElmIGEgbWF0cml4IGlzIGJ1aWx0IHdpdGggZnJvbVJvdGF0aW9uVHJhbnNsYXRpb24sXHJcbiAqICB0aGUgcmV0dXJuZWQgdmVjdG9yIHdpbGwgYmUgdGhlIHNhbWUgYXMgdGhlIHRyYW5zbGF0aW9uIHZlY3RvclxyXG4gKiAgb3JpZ2luYWxseSBzdXBwbGllZC5cclxuICogQHBhcmFtICB7dmVjM30gb3V0IFZlY3RvciB0byByZWNlaXZlIHRyYW5zbGF0aW9uIGNvbXBvbmVudFxyXG4gKiBAcGFyYW0gIHtSZWFkb25seU1hdDR9IG1hdCBNYXRyaXggdG8gYmUgZGVjb21wb3NlZCAoaW5wdXQpXHJcbiAqIEByZXR1cm4ge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zbGF0aW9uKG91dCwgbWF0KSB7XG4gIG91dFswXSA9IG1hdFsxMl07XG4gIG91dFsxXSA9IG1hdFsxM107XG4gIG91dFsyXSA9IG1hdFsxNF07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogUmV0dXJucyB0aGUgc2NhbGluZyBmYWN0b3IgY29tcG9uZW50IG9mIGEgdHJhbnNmb3JtYXRpb25cclxuICogIG1hdHJpeC4gSWYgYSBtYXRyaXggaXMgYnVpbHQgd2l0aCBmcm9tUm90YXRpb25UcmFuc2xhdGlvblNjYWxlXHJcbiAqICB3aXRoIGEgbm9ybWFsaXplZCBRdWF0ZXJuaW9uIHBhcmFtdGVyLCB0aGUgcmV0dXJuZWQgdmVjdG9yIHdpbGwgYmVcclxuICogIHRoZSBzYW1lIGFzIHRoZSBzY2FsaW5nIHZlY3RvclxyXG4gKiAgb3JpZ2luYWxseSBzdXBwbGllZC5cclxuICogQHBhcmFtICB7dmVjM30gb3V0IFZlY3RvciB0byByZWNlaXZlIHNjYWxpbmcgZmFjdG9yIGNvbXBvbmVudFxyXG4gKiBAcGFyYW0gIHtSZWFkb25seU1hdDR9IG1hdCBNYXRyaXggdG8gYmUgZGVjb21wb3NlZCAoaW5wdXQpXHJcbiAqIEByZXR1cm4ge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjYWxpbmcob3V0LCBtYXQpIHtcbiAgdmFyIG0xMSA9IG1hdFswXTtcbiAgdmFyIG0xMiA9IG1hdFsxXTtcbiAgdmFyIG0xMyA9IG1hdFsyXTtcbiAgdmFyIG0yMSA9IG1hdFs0XTtcbiAgdmFyIG0yMiA9IG1hdFs1XTtcbiAgdmFyIG0yMyA9IG1hdFs2XTtcbiAgdmFyIG0zMSA9IG1hdFs4XTtcbiAgdmFyIG0zMiA9IG1hdFs5XTtcbiAgdmFyIG0zMyA9IG1hdFsxMF07XG4gIG91dFswXSA9IE1hdGguaHlwb3QobTExLCBtMTIsIG0xMyk7XG4gIG91dFsxXSA9IE1hdGguaHlwb3QobTIxLCBtMjIsIG0yMyk7XG4gIG91dFsyXSA9IE1hdGguaHlwb3QobTMxLCBtMzIsIG0zMyk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogUmV0dXJucyBhIHF1YXRlcm5pb24gcmVwcmVzZW50aW5nIHRoZSByb3RhdGlvbmFsIGNvbXBvbmVudFxyXG4gKiAgb2YgYSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXguIElmIGEgbWF0cml4IGlzIGJ1aWx0IHdpdGhcclxuICogIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uLCB0aGUgcmV0dXJuZWQgcXVhdGVybmlvbiB3aWxsIGJlIHRoZVxyXG4gKiAgc2FtZSBhcyB0aGUgcXVhdGVybmlvbiBvcmlnaW5hbGx5IHN1cHBsaWVkLlxyXG4gKiBAcGFyYW0ge3F1YXR9IG91dCBRdWF0ZXJuaW9uIHRvIHJlY2VpdmUgdGhlIHJvdGF0aW9uIGNvbXBvbmVudFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gbWF0IE1hdHJpeCB0byBiZSBkZWNvbXBvc2VkIChpbnB1dClcclxuICogQHJldHVybiB7cXVhdH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um90YXRpb24ob3V0LCBtYXQpIHtcbiAgdmFyIHNjYWxpbmcgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgzKTtcbiAgZ2V0U2NhbGluZyhzY2FsaW5nLCBtYXQpO1xuICB2YXIgaXMxID0gMSAvIHNjYWxpbmdbMF07XG4gIHZhciBpczIgPSAxIC8gc2NhbGluZ1sxXTtcbiAgdmFyIGlzMyA9IDEgLyBzY2FsaW5nWzJdO1xuICB2YXIgc20xMSA9IG1hdFswXSAqIGlzMTtcbiAgdmFyIHNtMTIgPSBtYXRbMV0gKiBpczI7XG4gIHZhciBzbTEzID0gbWF0WzJdICogaXMzO1xuICB2YXIgc20yMSA9IG1hdFs0XSAqIGlzMTtcbiAgdmFyIHNtMjIgPSBtYXRbNV0gKiBpczI7XG4gIHZhciBzbTIzID0gbWF0WzZdICogaXMzO1xuICB2YXIgc20zMSA9IG1hdFs4XSAqIGlzMTtcbiAgdmFyIHNtMzIgPSBtYXRbOV0gKiBpczI7XG4gIHZhciBzbTMzID0gbWF0WzEwXSAqIGlzMztcbiAgdmFyIHRyYWNlID0gc20xMSArIHNtMjIgKyBzbTMzO1xuICB2YXIgUyA9IDA7XG5cbiAgaWYgKHRyYWNlID4gMCkge1xuICAgIFMgPSBNYXRoLnNxcnQodHJhY2UgKyAxLjApICogMjtcbiAgICBvdXRbM10gPSAwLjI1ICogUztcbiAgICBvdXRbMF0gPSAoc20yMyAtIHNtMzIpIC8gUztcbiAgICBvdXRbMV0gPSAoc20zMSAtIHNtMTMpIC8gUztcbiAgICBvdXRbMl0gPSAoc20xMiAtIHNtMjEpIC8gUztcbiAgfSBlbHNlIGlmIChzbTExID4gc20yMiAmJiBzbTExID4gc20zMykge1xuICAgIFMgPSBNYXRoLnNxcnQoMS4wICsgc20xMSAtIHNtMjIgLSBzbTMzKSAqIDI7XG4gICAgb3V0WzNdID0gKHNtMjMgLSBzbTMyKSAvIFM7XG4gICAgb3V0WzBdID0gMC4yNSAqIFM7XG4gICAgb3V0WzFdID0gKHNtMTIgKyBzbTIxKSAvIFM7XG4gICAgb3V0WzJdID0gKHNtMzEgKyBzbTEzKSAvIFM7XG4gIH0gZWxzZSBpZiAoc20yMiA+IHNtMzMpIHtcbiAgICBTID0gTWF0aC5zcXJ0KDEuMCArIHNtMjIgLSBzbTExIC0gc20zMykgKiAyO1xuICAgIG91dFszXSA9IChzbTMxIC0gc20xMykgLyBTO1xuICAgIG91dFswXSA9IChzbTEyICsgc20yMSkgLyBTO1xuICAgIG91dFsxXSA9IDAuMjUgKiBTO1xuICAgIG91dFsyXSA9IChzbTIzICsgc20zMikgLyBTO1xuICB9IGVsc2Uge1xuICAgIFMgPSBNYXRoLnNxcnQoMS4wICsgc20zMyAtIHNtMTEgLSBzbTIyKSAqIDI7XG4gICAgb3V0WzNdID0gKHNtMTIgLSBzbTIxKSAvIFM7XG4gICAgb3V0WzBdID0gKHNtMzEgKyBzbTEzKSAvIFM7XG4gICAgb3V0WzFdID0gKHNtMjMgKyBzbTMyKSAvIFM7XG4gICAgb3V0WzJdID0gMC4yNSAqIFM7XG4gIH1cblxuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIHF1YXRlcm5pb24gcm90YXRpb24sIHZlY3RvciB0cmFuc2xhdGlvbiBhbmQgdmVjdG9yIHNjYWxlXHJcbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxyXG4gKlxyXG4gKiAgICAgbWF0NC5pZGVudGl0eShkZXN0KTtcclxuICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIHZlYyk7XHJcbiAqICAgICBsZXQgcXVhdE1hdCA9IG1hdDQuY3JlYXRlKCk7XHJcbiAqICAgICBxdWF0NC50b01hdDQocXVhdCwgcXVhdE1hdCk7XHJcbiAqICAgICBtYXQ0Lm11bHRpcGx5KGRlc3QsIHF1YXRNYXQpO1xyXG4gKiAgICAgbWF0NC5zY2FsZShkZXN0LCBzY2FsZSlcclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxyXG4gKiBAcGFyYW0ge3F1YXQ0fSBxIFJvdGF0aW9uIHF1YXRlcm5pb25cclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHYgVHJhbnNsYXRpb24gdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBzIFNjYWxpbmcgdmVjdG9yXHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tUm90YXRpb25UcmFuc2xhdGlvblNjYWxlKG91dCwgcSwgdiwgcykge1xuICAvLyBRdWF0ZXJuaW9uIG1hdGhcbiAgdmFyIHggPSBxWzBdLFxuICAgICAgeSA9IHFbMV0sXG4gICAgICB6ID0gcVsyXSxcbiAgICAgIHcgPSBxWzNdO1xuICB2YXIgeDIgPSB4ICsgeDtcbiAgdmFyIHkyID0geSArIHk7XG4gIHZhciB6MiA9IHogKyB6O1xuICB2YXIgeHggPSB4ICogeDI7XG4gIHZhciB4eSA9IHggKiB5MjtcbiAgdmFyIHh6ID0geCAqIHoyO1xuICB2YXIgeXkgPSB5ICogeTI7XG4gIHZhciB5eiA9IHkgKiB6MjtcbiAgdmFyIHp6ID0geiAqIHoyO1xuICB2YXIgd3ggPSB3ICogeDI7XG4gIHZhciB3eSA9IHcgKiB5MjtcbiAgdmFyIHd6ID0gdyAqIHoyO1xuICB2YXIgc3ggPSBzWzBdO1xuICB2YXIgc3kgPSBzWzFdO1xuICB2YXIgc3ogPSBzWzJdO1xuICBvdXRbMF0gPSAoMSAtICh5eSArIHp6KSkgKiBzeDtcbiAgb3V0WzFdID0gKHh5ICsgd3opICogc3g7XG4gIG91dFsyXSA9ICh4eiAtIHd5KSAqIHN4O1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSAoeHkgLSB3eikgKiBzeTtcbiAgb3V0WzVdID0gKDEgLSAoeHggKyB6eikpICogc3k7XG4gIG91dFs2XSA9ICh5eiArIHd4KSAqIHN5O1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSAoeHogKyB3eSkgKiBzejtcbiAgb3V0WzldID0gKHl6IC0gd3gpICogc3o7XG4gIG91dFsxMF0gPSAoMSAtICh4eCArIHl5KSkgKiBzejtcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSB2WzBdO1xuICBvdXRbMTNdID0gdlsxXTtcbiAgb3V0WzE0XSA9IHZbMl07XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIHF1YXRlcm5pb24gcm90YXRpb24sIHZlY3RvciB0cmFuc2xhdGlvbiBhbmQgdmVjdG9yIHNjYWxlLCByb3RhdGluZyBhbmQgc2NhbGluZyBhcm91bmQgdGhlIGdpdmVuIG9yaWdpblxyXG4gKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcclxuICpcclxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XHJcbiAqICAgICBtYXQ0LnRyYW5zbGF0ZShkZXN0LCB2ZWMpO1xyXG4gKiAgICAgbWF0NC50cmFuc2xhdGUoZGVzdCwgb3JpZ2luKTtcclxuICogICAgIGxldCBxdWF0TWF0ID0gbWF0NC5jcmVhdGUoKTtcclxuICogICAgIHF1YXQ0LnRvTWF0NChxdWF0LCBxdWF0TWF0KTtcclxuICogICAgIG1hdDQubXVsdGlwbHkoZGVzdCwgcXVhdE1hdCk7XHJcbiAqICAgICBtYXQ0LnNjYWxlKGRlc3QsIHNjYWxlKVxyXG4gKiAgICAgbWF0NC50cmFuc2xhdGUoZGVzdCwgbmVnYXRpdmVPcmlnaW4pO1xyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XHJcbiAqIEBwYXJhbSB7cXVhdDR9IHEgUm90YXRpb24gcXVhdGVybmlvblxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gdiBUcmFuc2xhdGlvbiB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHMgU2NhbGluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IG8gVGhlIG9yaWdpbiB2ZWN0b3IgYXJvdW5kIHdoaWNoIHRvIHNjYWxlIGFuZCByb3RhdGVcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uU2NhbGVPcmlnaW4ob3V0LCBxLCB2LCBzLCBvKSB7XG4gIC8vIFF1YXRlcm5pb24gbWF0aFxuICB2YXIgeCA9IHFbMF0sXG4gICAgICB5ID0gcVsxXSxcbiAgICAgIHogPSBxWzJdLFxuICAgICAgdyA9IHFbM107XG4gIHZhciB4MiA9IHggKyB4O1xuICB2YXIgeTIgPSB5ICsgeTtcbiAgdmFyIHoyID0geiArIHo7XG4gIHZhciB4eCA9IHggKiB4MjtcbiAgdmFyIHh5ID0geCAqIHkyO1xuICB2YXIgeHogPSB4ICogejI7XG4gIHZhciB5eSA9IHkgKiB5MjtcbiAgdmFyIHl6ID0geSAqIHoyO1xuICB2YXIgenogPSB6ICogejI7XG4gIHZhciB3eCA9IHcgKiB4MjtcbiAgdmFyIHd5ID0gdyAqIHkyO1xuICB2YXIgd3ogPSB3ICogejI7XG4gIHZhciBzeCA9IHNbMF07XG4gIHZhciBzeSA9IHNbMV07XG4gIHZhciBzeiA9IHNbMl07XG4gIHZhciBveCA9IG9bMF07XG4gIHZhciBveSA9IG9bMV07XG4gIHZhciBveiA9IG9bMl07XG4gIHZhciBvdXQwID0gKDEgLSAoeXkgKyB6eikpICogc3g7XG4gIHZhciBvdXQxID0gKHh5ICsgd3opICogc3g7XG4gIHZhciBvdXQyID0gKHh6IC0gd3kpICogc3g7XG4gIHZhciBvdXQ0ID0gKHh5IC0gd3opICogc3k7XG4gIHZhciBvdXQ1ID0gKDEgLSAoeHggKyB6eikpICogc3k7XG4gIHZhciBvdXQ2ID0gKHl6ICsgd3gpICogc3k7XG4gIHZhciBvdXQ4ID0gKHh6ICsgd3kpICogc3o7XG4gIHZhciBvdXQ5ID0gKHl6IC0gd3gpICogc3o7XG4gIHZhciBvdXQxMCA9ICgxIC0gKHh4ICsgeXkpKSAqIHN6O1xuICBvdXRbMF0gPSBvdXQwO1xuICBvdXRbMV0gPSBvdXQxO1xuICBvdXRbMl0gPSBvdXQyO1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSBvdXQ0O1xuICBvdXRbNV0gPSBvdXQ1O1xuICBvdXRbNl0gPSBvdXQ2O1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSBvdXQ4O1xuICBvdXRbOV0gPSBvdXQ5O1xuICBvdXRbMTBdID0gb3V0MTA7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gdlswXSArIG94IC0gKG91dDAgKiBveCArIG91dDQgKiBveSArIG91dDggKiBveik7XG4gIG91dFsxM10gPSB2WzFdICsgb3kgLSAob3V0MSAqIG94ICsgb3V0NSAqIG95ICsgb3V0OSAqIG96KTtcbiAgb3V0WzE0XSA9IHZbMl0gKyBveiAtIChvdXQyICogb3ggKyBvdXQ2ICogb3kgKyBvdXQxMCAqIG96KTtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQ2FsY3VsYXRlcyBhIDR4NCBtYXRyaXggZnJvbSB0aGUgZ2l2ZW4gcXVhdGVybmlvblxyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBxIFF1YXRlcm5pb24gdG8gY3JlYXRlIG1hdHJpeCBmcm9tXHJcbiAqXHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tUXVhdChvdXQsIHEpIHtcbiAgdmFyIHggPSBxWzBdLFxuICAgICAgeSA9IHFbMV0sXG4gICAgICB6ID0gcVsyXSxcbiAgICAgIHcgPSBxWzNdO1xuICB2YXIgeDIgPSB4ICsgeDtcbiAgdmFyIHkyID0geSArIHk7XG4gIHZhciB6MiA9IHogKyB6O1xuICB2YXIgeHggPSB4ICogeDI7XG4gIHZhciB5eCA9IHkgKiB4MjtcbiAgdmFyIHl5ID0geSAqIHkyO1xuICB2YXIgenggPSB6ICogeDI7XG4gIHZhciB6eSA9IHogKiB5MjtcbiAgdmFyIHp6ID0geiAqIHoyO1xuICB2YXIgd3ggPSB3ICogeDI7XG4gIHZhciB3eSA9IHcgKiB5MjtcbiAgdmFyIHd6ID0gdyAqIHoyO1xuICBvdXRbMF0gPSAxIC0geXkgLSB6ejtcbiAgb3V0WzFdID0geXggKyB3ejtcbiAgb3V0WzJdID0genggLSB3eTtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0geXggLSB3ejtcbiAgb3V0WzVdID0gMSAtIHh4IC0geno7XG4gIG91dFs2XSA9IHp5ICsgd3g7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9IHp4ICsgd3k7XG4gIG91dFs5XSA9IHp5IC0gd3g7XG4gIG91dFsxMF0gPSAxIC0geHggLSB5eTtcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSAwO1xuICBvdXRbMTNdID0gMDtcbiAgb3V0WzE0XSA9IDA7XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIGZydXN0dW0gbWF0cml4IHdpdGggdGhlIGdpdmVuIGJvdW5kc1xyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBsZWZ0IExlZnQgYm91bmQgb2YgdGhlIGZydXN0dW1cclxuICogQHBhcmFtIHtOdW1iZXJ9IHJpZ2h0IFJpZ2h0IGJvdW5kIG9mIHRoZSBmcnVzdHVtXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBib3R0b20gQm90dG9tIGJvdW5kIG9mIHRoZSBmcnVzdHVtXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB0b3AgVG9wIGJvdW5kIG9mIHRoZSBmcnVzdHVtXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBuZWFyIE5lYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cclxuICogQHBhcmFtIHtOdW1iZXJ9IGZhciBGYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZydXN0dW0ob3V0LCBsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIG5lYXIsIGZhcikge1xuICB2YXIgcmwgPSAxIC8gKHJpZ2h0IC0gbGVmdCk7XG4gIHZhciB0YiA9IDEgLyAodG9wIC0gYm90dG9tKTtcbiAgdmFyIG5mID0gMSAvIChuZWFyIC0gZmFyKTtcbiAgb3V0WzBdID0gbmVhciAqIDIgKiBybDtcbiAgb3V0WzFdID0gMDtcbiAgb3V0WzJdID0gMDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gMDtcbiAgb3V0WzVdID0gbmVhciAqIDIgKiB0YjtcbiAgb3V0WzZdID0gMDtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gKHJpZ2h0ICsgbGVmdCkgKiBybDtcbiAgb3V0WzldID0gKHRvcCArIGJvdHRvbSkgKiB0YjtcbiAgb3V0WzEwXSA9IChmYXIgKyBuZWFyKSAqIG5mO1xuICBvdXRbMTFdID0gLTE7XG4gIG91dFsxMl0gPSAwO1xuICBvdXRbMTNdID0gMDtcbiAgb3V0WzE0XSA9IGZhciAqIG5lYXIgKiAyICogbmY7XG4gIG91dFsxNV0gPSAwO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIHBlcnNwZWN0aXZlIHByb2plY3Rpb24gbWF0cml4IHdpdGggdGhlIGdpdmVuIGJvdW5kcy5cclxuICogUGFzc2luZyBudWxsL3VuZGVmaW5lZC9ubyB2YWx1ZSBmb3IgZmFyIHdpbGwgZ2VuZXJhdGUgaW5maW5pdGUgcHJvamVjdGlvbiBtYXRyaXguXHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cclxuICogQHBhcmFtIHtudW1iZXJ9IGZvdnkgVmVydGljYWwgZmllbGQgb2YgdmlldyBpbiByYWRpYW5zXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBhc3BlY3QgQXNwZWN0IHJhdGlvLiB0eXBpY2FsbHkgdmlld3BvcnQgd2lkdGgvaGVpZ2h0XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBuZWFyIE5lYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cclxuICogQHBhcmFtIHtudW1iZXJ9IGZhciBGYXIgYm91bmQgb2YgdGhlIGZydXN0dW0sIGNhbiBiZSBudWxsIG9yIEluZmluaXR5XHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBwZXJzcGVjdGl2ZShvdXQsIGZvdnksIGFzcGVjdCwgbmVhciwgZmFyKSB7XG4gIHZhciBmID0gMS4wIC8gTWF0aC50YW4oZm92eSAvIDIpLFxuICAgICAgbmY7XG4gIG91dFswXSA9IGYgLyBhc3BlY3Q7XG4gIG91dFsxXSA9IDA7XG4gIG91dFsyXSA9IDA7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IDA7XG4gIG91dFs1XSA9IGY7XG4gIG91dFs2XSA9IDA7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9IDA7XG4gIG91dFs5XSA9IDA7XG4gIG91dFsxMV0gPSAtMTtcbiAgb3V0WzEyXSA9IDA7XG4gIG91dFsxM10gPSAwO1xuICBvdXRbMTVdID0gMDtcblxuICBpZiAoZmFyICE9IG51bGwgJiYgZmFyICE9PSBJbmZpbml0eSkge1xuICAgIG5mID0gMSAvIChuZWFyIC0gZmFyKTtcbiAgICBvdXRbMTBdID0gKGZhciArIG5lYXIpICogbmY7XG4gICAgb3V0WzE0XSA9IDIgKiBmYXIgKiBuZWFyICogbmY7XG4gIH0gZWxzZSB7XG4gICAgb3V0WzEwXSA9IC0xO1xuICAgIG91dFsxNF0gPSAtMiAqIG5lYXI7XG4gIH1cblxuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIHBlcnNwZWN0aXZlIHByb2plY3Rpb24gbWF0cml4IHdpdGggdGhlIGdpdmVuIGZpZWxkIG9mIHZpZXcuXHJcbiAqIFRoaXMgaXMgcHJpbWFyaWx5IHVzZWZ1bCBmb3IgZ2VuZXJhdGluZyBwcm9qZWN0aW9uIG1hdHJpY2VzIHRvIGJlIHVzZWRcclxuICogd2l0aCB0aGUgc3RpbGwgZXhwZXJpZW1lbnRhbCBXZWJWUiBBUEkuXHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cclxuICogQHBhcmFtIHtPYmplY3R9IGZvdiBPYmplY3QgY29udGFpbmluZyB0aGUgZm9sbG93aW5nIHZhbHVlczogdXBEZWdyZWVzLCBkb3duRGVncmVlcywgbGVmdERlZ3JlZXMsIHJpZ2h0RGVncmVlc1xyXG4gKiBAcGFyYW0ge251bWJlcn0gbmVhciBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBmYXIgRmFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBwZXJzcGVjdGl2ZUZyb21GaWVsZE9mVmlldyhvdXQsIGZvdiwgbmVhciwgZmFyKSB7XG4gIHZhciB1cFRhbiA9IE1hdGgudGFuKGZvdi51cERlZ3JlZXMgKiBNYXRoLlBJIC8gMTgwLjApO1xuICB2YXIgZG93blRhbiA9IE1hdGgudGFuKGZvdi5kb3duRGVncmVlcyAqIE1hdGguUEkgLyAxODAuMCk7XG4gIHZhciBsZWZ0VGFuID0gTWF0aC50YW4oZm92LmxlZnREZWdyZWVzICogTWF0aC5QSSAvIDE4MC4wKTtcbiAgdmFyIHJpZ2h0VGFuID0gTWF0aC50YW4oZm92LnJpZ2h0RGVncmVlcyAqIE1hdGguUEkgLyAxODAuMCk7XG4gIHZhciB4U2NhbGUgPSAyLjAgLyAobGVmdFRhbiArIHJpZ2h0VGFuKTtcbiAgdmFyIHlTY2FsZSA9IDIuMCAvICh1cFRhbiArIGRvd25UYW4pO1xuICBvdXRbMF0gPSB4U2NhbGU7XG4gIG91dFsxXSA9IDAuMDtcbiAgb3V0WzJdID0gMC4wO1xuICBvdXRbM10gPSAwLjA7XG4gIG91dFs0XSA9IDAuMDtcbiAgb3V0WzVdID0geVNjYWxlO1xuICBvdXRbNl0gPSAwLjA7XG4gIG91dFs3XSA9IDAuMDtcbiAgb3V0WzhdID0gLSgobGVmdFRhbiAtIHJpZ2h0VGFuKSAqIHhTY2FsZSAqIDAuNSk7XG4gIG91dFs5XSA9ICh1cFRhbiAtIGRvd25UYW4pICogeVNjYWxlICogMC41O1xuICBvdXRbMTBdID0gZmFyIC8gKG5lYXIgLSBmYXIpO1xuICBvdXRbMTFdID0gLTEuMDtcbiAgb3V0WzEyXSA9IDAuMDtcbiAgb3V0WzEzXSA9IDAuMDtcbiAgb3V0WzE0XSA9IGZhciAqIG5lYXIgLyAobmVhciAtIGZhcik7XG4gIG91dFsxNV0gPSAwLjA7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogR2VuZXJhdGVzIGEgb3J0aG9nb25hbCBwcm9qZWN0aW9uIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBib3VuZHNcclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xyXG4gKiBAcGFyYW0ge251bWJlcn0gbGVmdCBMZWZ0IGJvdW5kIG9mIHRoZSBmcnVzdHVtXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSByaWdodCBSaWdodCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxyXG4gKiBAcGFyYW0ge251bWJlcn0gYm90dG9tIEJvdHRvbSBib3VuZCBvZiB0aGUgZnJ1c3R1bVxyXG4gKiBAcGFyYW0ge251bWJlcn0gdG9wIFRvcCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxyXG4gKiBAcGFyYW0ge251bWJlcn0gbmVhciBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBmYXIgRmFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBvcnRobyhvdXQsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyKSB7XG4gIHZhciBsciA9IDEgLyAobGVmdCAtIHJpZ2h0KTtcbiAgdmFyIGJ0ID0gMSAvIChib3R0b20gLSB0b3ApO1xuICB2YXIgbmYgPSAxIC8gKG5lYXIgLSBmYXIpO1xuICBvdXRbMF0gPSAtMiAqIGxyO1xuICBvdXRbMV0gPSAwO1xuICBvdXRbMl0gPSAwO1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSAwO1xuICBvdXRbNV0gPSAtMiAqIGJ0O1xuICBvdXRbNl0gPSAwO1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSAwO1xuICBvdXRbOV0gPSAwO1xuICBvdXRbMTBdID0gMiAqIG5mO1xuICBvdXRbMTFdID0gMDtcbiAgb3V0WzEyXSA9IChsZWZ0ICsgcmlnaHQpICogbHI7XG4gIG91dFsxM10gPSAodG9wICsgYm90dG9tKSAqIGJ0O1xuICBvdXRbMTRdID0gKGZhciArIG5lYXIpICogbmY7XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIGxvb2stYXQgbWF0cml4IHdpdGggdGhlIGdpdmVuIGV5ZSBwb3NpdGlvbiwgZm9jYWwgcG9pbnQsIGFuZCB1cCBheGlzLlxyXG4gKiBJZiB5b3Ugd2FudCBhIG1hdHJpeCB0aGF0IGFjdHVhbGx5IG1ha2VzIGFuIG9iamVjdCBsb29rIGF0IGFub3RoZXIgb2JqZWN0LCB5b3Ugc2hvdWxkIHVzZSB0YXJnZXRUbyBpbnN0ZWFkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBleWUgUG9zaXRpb24gb2YgdGhlIHZpZXdlclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gY2VudGVyIFBvaW50IHRoZSB2aWV3ZXIgaXMgbG9va2luZyBhdFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gdXAgdmVjMyBwb2ludGluZyB1cFxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbG9va0F0KG91dCwgZXllLCBjZW50ZXIsIHVwKSB7XG4gIHZhciB4MCwgeDEsIHgyLCB5MCwgeTEsIHkyLCB6MCwgejEsIHoyLCBsZW47XG4gIHZhciBleWV4ID0gZXllWzBdO1xuICB2YXIgZXlleSA9IGV5ZVsxXTtcbiAgdmFyIGV5ZXogPSBleWVbMl07XG4gIHZhciB1cHggPSB1cFswXTtcbiAgdmFyIHVweSA9IHVwWzFdO1xuICB2YXIgdXB6ID0gdXBbMl07XG4gIHZhciBjZW50ZXJ4ID0gY2VudGVyWzBdO1xuICB2YXIgY2VudGVyeSA9IGNlbnRlclsxXTtcbiAgdmFyIGNlbnRlcnogPSBjZW50ZXJbMl07XG5cbiAgaWYgKE1hdGguYWJzKGV5ZXggLSBjZW50ZXJ4KSA8IGdsTWF0cml4LkVQU0lMT04gJiYgTWF0aC5hYnMoZXlleSAtIGNlbnRlcnkpIDwgZ2xNYXRyaXguRVBTSUxPTiAmJiBNYXRoLmFicyhleWV6IC0gY2VudGVyeikgPCBnbE1hdHJpeC5FUFNJTE9OKSB7XG4gICAgcmV0dXJuIGlkZW50aXR5KG91dCk7XG4gIH1cblxuICB6MCA9IGV5ZXggLSBjZW50ZXJ4O1xuICB6MSA9IGV5ZXkgLSBjZW50ZXJ5O1xuICB6MiA9IGV5ZXogLSBjZW50ZXJ6O1xuICBsZW4gPSAxIC8gTWF0aC5oeXBvdCh6MCwgejEsIHoyKTtcbiAgejAgKj0gbGVuO1xuICB6MSAqPSBsZW47XG4gIHoyICo9IGxlbjtcbiAgeDAgPSB1cHkgKiB6MiAtIHVweiAqIHoxO1xuICB4MSA9IHVweiAqIHowIC0gdXB4ICogejI7XG4gIHgyID0gdXB4ICogejEgLSB1cHkgKiB6MDtcbiAgbGVuID0gTWF0aC5oeXBvdCh4MCwgeDEsIHgyKTtcblxuICBpZiAoIWxlbikge1xuICAgIHgwID0gMDtcbiAgICB4MSA9IDA7XG4gICAgeDIgPSAwO1xuICB9IGVsc2Uge1xuICAgIGxlbiA9IDEgLyBsZW47XG4gICAgeDAgKj0gbGVuO1xuICAgIHgxICo9IGxlbjtcbiAgICB4MiAqPSBsZW47XG4gIH1cblxuICB5MCA9IHoxICogeDIgLSB6MiAqIHgxO1xuICB5MSA9IHoyICogeDAgLSB6MCAqIHgyO1xuICB5MiA9IHowICogeDEgLSB6MSAqIHgwO1xuICBsZW4gPSBNYXRoLmh5cG90KHkwLCB5MSwgeTIpO1xuXG4gIGlmICghbGVuKSB7XG4gICAgeTAgPSAwO1xuICAgIHkxID0gMDtcbiAgICB5MiA9IDA7XG4gIH0gZWxzZSB7XG4gICAgbGVuID0gMSAvIGxlbjtcbiAgICB5MCAqPSBsZW47XG4gICAgeTEgKj0gbGVuO1xuICAgIHkyICo9IGxlbjtcbiAgfVxuXG4gIG91dFswXSA9IHgwO1xuICBvdXRbMV0gPSB5MDtcbiAgb3V0WzJdID0gejA7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IHgxO1xuICBvdXRbNV0gPSB5MTtcbiAgb3V0WzZdID0gejE7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9IHgyO1xuICBvdXRbOV0gPSB5MjtcbiAgb3V0WzEwXSA9IHoyO1xuICBvdXRbMTFdID0gMDtcbiAgb3V0WzEyXSA9IC0oeDAgKiBleWV4ICsgeDEgKiBleWV5ICsgeDIgKiBleWV6KTtcbiAgb3V0WzEzXSA9IC0oeTAgKiBleWV4ICsgeTEgKiBleWV5ICsgeTIgKiBleWV6KTtcbiAgb3V0WzE0XSA9IC0oejAgKiBleWV4ICsgejEgKiBleWV5ICsgejIgKiBleWV6KTtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogR2VuZXJhdGVzIGEgbWF0cml4IHRoYXQgbWFrZXMgc29tZXRoaW5nIGxvb2sgYXQgc29tZXRoaW5nIGVsc2UuXHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGV5ZSBQb3NpdGlvbiBvZiB0aGUgdmlld2VyXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBjZW50ZXIgUG9pbnQgdGhlIHZpZXdlciBpcyBsb29raW5nIGF0XHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSB1cCB2ZWMzIHBvaW50aW5nIHVwXHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB0YXJnZXRUbyhvdXQsIGV5ZSwgdGFyZ2V0LCB1cCkge1xuICB2YXIgZXlleCA9IGV5ZVswXSxcbiAgICAgIGV5ZXkgPSBleWVbMV0sXG4gICAgICBleWV6ID0gZXllWzJdLFxuICAgICAgdXB4ID0gdXBbMF0sXG4gICAgICB1cHkgPSB1cFsxXSxcbiAgICAgIHVweiA9IHVwWzJdO1xuICB2YXIgejAgPSBleWV4IC0gdGFyZ2V0WzBdLFxuICAgICAgejEgPSBleWV5IC0gdGFyZ2V0WzFdLFxuICAgICAgejIgPSBleWV6IC0gdGFyZ2V0WzJdO1xuICB2YXIgbGVuID0gejAgKiB6MCArIHoxICogejEgKyB6MiAqIHoyO1xuXG4gIGlmIChsZW4gPiAwKSB7XG4gICAgbGVuID0gMSAvIE1hdGguc3FydChsZW4pO1xuICAgIHowICo9IGxlbjtcbiAgICB6MSAqPSBsZW47XG4gICAgejIgKj0gbGVuO1xuICB9XG5cbiAgdmFyIHgwID0gdXB5ICogejIgLSB1cHogKiB6MSxcbiAgICAgIHgxID0gdXB6ICogejAgLSB1cHggKiB6MixcbiAgICAgIHgyID0gdXB4ICogejEgLSB1cHkgKiB6MDtcbiAgbGVuID0geDAgKiB4MCArIHgxICogeDEgKyB4MiAqIHgyO1xuXG4gIGlmIChsZW4gPiAwKSB7XG4gICAgbGVuID0gMSAvIE1hdGguc3FydChsZW4pO1xuICAgIHgwICo9IGxlbjtcbiAgICB4MSAqPSBsZW47XG4gICAgeDIgKj0gbGVuO1xuICB9XG5cbiAgb3V0WzBdID0geDA7XG4gIG91dFsxXSA9IHgxO1xuICBvdXRbMl0gPSB4MjtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gejEgKiB4MiAtIHoyICogeDE7XG4gIG91dFs1XSA9IHoyICogeDAgLSB6MCAqIHgyO1xuICBvdXRbNl0gPSB6MCAqIHgxIC0gejEgKiB4MDtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gejA7XG4gIG91dFs5XSA9IHoxO1xuICBvdXRbMTBdID0gejI7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gZXlleDtcbiAgb3V0WzEzXSA9IGV5ZXk7XG4gIG91dFsxNF0gPSBleWV6O1xuICBvdXRbMTVdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgbWF0NFxyXG4gKlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSBtYXRyaXggdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbWF0cml4XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc3RyKGEpIHtcbiAgcmV0dXJuIFwibWF0NChcIiArIGFbMF0gKyBcIiwgXCIgKyBhWzFdICsgXCIsIFwiICsgYVsyXSArIFwiLCBcIiArIGFbM10gKyBcIiwgXCIgKyBhWzRdICsgXCIsIFwiICsgYVs1XSArIFwiLCBcIiArIGFbNl0gKyBcIiwgXCIgKyBhWzddICsgXCIsIFwiICsgYVs4XSArIFwiLCBcIiArIGFbOV0gKyBcIiwgXCIgKyBhWzEwXSArIFwiLCBcIiArIGFbMTFdICsgXCIsIFwiICsgYVsxMl0gKyBcIiwgXCIgKyBhWzEzXSArIFwiLCBcIiArIGFbMTRdICsgXCIsIFwiICsgYVsxNV0gKyBcIilcIjtcbn1cbi8qKlxyXG4gKiBSZXR1cm5zIEZyb2Jlbml1cyBub3JtIG9mIGEgbWF0NFxyXG4gKlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgbWF0cml4IHRvIGNhbGN1bGF0ZSBGcm9iZW5pdXMgbm9ybSBvZlxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBGcm9iZW5pdXMgbm9ybVxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb2IoYSkge1xuICByZXR1cm4gTWF0aC5oeXBvdChhWzBdLCBhWzFdLCBhWzJdLCBhWzNdLCBhWzRdLCBhWzVdLCBhWzZdLCBhWzddLCBhWzhdLCBhWzldLCBhWzEwXSwgYVsxMV0sIGFbMTJdLCBhWzEzXSwgYVsxNF0sIGFbMTVdKTtcbn1cbi8qKlxyXG4gKiBBZGRzIHR3byBtYXQ0J3NcclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGQob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gKyBiWzBdO1xuICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgb3V0WzJdID0gYVsyXSArIGJbMl07XG4gIG91dFszXSA9IGFbM10gKyBiWzNdO1xuICBvdXRbNF0gPSBhWzRdICsgYls0XTtcbiAgb3V0WzVdID0gYVs1XSArIGJbNV07XG4gIG91dFs2XSA9IGFbNl0gKyBiWzZdO1xuICBvdXRbN10gPSBhWzddICsgYls3XTtcbiAgb3V0WzhdID0gYVs4XSArIGJbOF07XG4gIG91dFs5XSA9IGFbOV0gKyBiWzldO1xuICBvdXRbMTBdID0gYVsxMF0gKyBiWzEwXTtcbiAgb3V0WzExXSA9IGFbMTFdICsgYlsxMV07XG4gIG91dFsxMl0gPSBhWzEyXSArIGJbMTJdO1xuICBvdXRbMTNdID0gYVsxM10gKyBiWzEzXTtcbiAgb3V0WzE0XSA9IGFbMTRdICsgYlsxNF07XG4gIG91dFsxNV0gPSBhWzE1XSArIGJbMTVdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFN1YnRyYWN0cyBtYXRyaXggYiBmcm9tIG1hdHJpeCBhXHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc3VidHJhY3Qob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gLSBiWzBdO1xuICBvdXRbMV0gPSBhWzFdIC0gYlsxXTtcbiAgb3V0WzJdID0gYVsyXSAtIGJbMl07XG4gIG91dFszXSA9IGFbM10gLSBiWzNdO1xuICBvdXRbNF0gPSBhWzRdIC0gYls0XTtcbiAgb3V0WzVdID0gYVs1XSAtIGJbNV07XG4gIG91dFs2XSA9IGFbNl0gLSBiWzZdO1xuICBvdXRbN10gPSBhWzddIC0gYls3XTtcbiAgb3V0WzhdID0gYVs4XSAtIGJbOF07XG4gIG91dFs5XSA9IGFbOV0gLSBiWzldO1xuICBvdXRbMTBdID0gYVsxMF0gLSBiWzEwXTtcbiAgb3V0WzExXSA9IGFbMTFdIC0gYlsxMV07XG4gIG91dFsxMl0gPSBhWzEyXSAtIGJbMTJdO1xuICBvdXRbMTNdID0gYVsxM10gLSBiWzEzXTtcbiAgb3V0WzE0XSA9IGFbMTRdIC0gYlsxNF07XG4gIG91dFsxNV0gPSBhWzE1XSAtIGJbMTVdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIE11bHRpcGx5IGVhY2ggZWxlbWVudCBvZiB0aGUgbWF0cml4IGJ5IGEgc2NhbGFyLlxyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgbWF0cml4IHRvIHNjYWxlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgbWF0cml4J3MgZWxlbWVudHMgYnlcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG11bHRpcGx5U2NhbGFyKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICogYjtcbiAgb3V0WzFdID0gYVsxXSAqIGI7XG4gIG91dFsyXSA9IGFbMl0gKiBiO1xuICBvdXRbM10gPSBhWzNdICogYjtcbiAgb3V0WzRdID0gYVs0XSAqIGI7XG4gIG91dFs1XSA9IGFbNV0gKiBiO1xuICBvdXRbNl0gPSBhWzZdICogYjtcbiAgb3V0WzddID0gYVs3XSAqIGI7XG4gIG91dFs4XSA9IGFbOF0gKiBiO1xuICBvdXRbOV0gPSBhWzldICogYjtcbiAgb3V0WzEwXSA9IGFbMTBdICogYjtcbiAgb3V0WzExXSA9IGFbMTFdICogYjtcbiAgb3V0WzEyXSA9IGFbMTJdICogYjtcbiAgb3V0WzEzXSA9IGFbMTNdICogYjtcbiAgb3V0WzE0XSA9IGFbMTRdICogYjtcbiAgb3V0WzE1XSA9IGFbMTVdICogYjtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBBZGRzIHR3byBtYXQ0J3MgYWZ0ZXIgbXVsdGlwbHlpbmcgZWFjaCBlbGVtZW50IG9mIHRoZSBzZWNvbmQgb3BlcmFuZCBieSBhIHNjYWxhciB2YWx1ZS5cclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsZSB0aGUgYW1vdW50IHRvIHNjYWxlIGIncyBlbGVtZW50cyBieSBiZWZvcmUgYWRkaW5nXHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aXBseVNjYWxhckFuZEFkZChvdXQsIGEsIGIsIHNjYWxlKSB7XG4gIG91dFswXSA9IGFbMF0gKyBiWzBdICogc2NhbGU7XG4gIG91dFsxXSA9IGFbMV0gKyBiWzFdICogc2NhbGU7XG4gIG91dFsyXSA9IGFbMl0gKyBiWzJdICogc2NhbGU7XG4gIG91dFszXSA9IGFbM10gKyBiWzNdICogc2NhbGU7XG4gIG91dFs0XSA9IGFbNF0gKyBiWzRdICogc2NhbGU7XG4gIG91dFs1XSA9IGFbNV0gKyBiWzVdICogc2NhbGU7XG4gIG91dFs2XSA9IGFbNl0gKyBiWzZdICogc2NhbGU7XG4gIG91dFs3XSA9IGFbN10gKyBiWzddICogc2NhbGU7XG4gIG91dFs4XSA9IGFbOF0gKyBiWzhdICogc2NhbGU7XG4gIG91dFs5XSA9IGFbOV0gKyBiWzldICogc2NhbGU7XG4gIG91dFsxMF0gPSBhWzEwXSArIGJbMTBdICogc2NhbGU7XG4gIG91dFsxMV0gPSBhWzExXSArIGJbMTFdICogc2NhbGU7XG4gIG91dFsxMl0gPSBhWzEyXSArIGJbMTJdICogc2NhbGU7XG4gIG91dFsxM10gPSBhWzEzXSArIGJbMTNdICogc2NhbGU7XG4gIG91dFsxNF0gPSBhWzE0XSArIGJbMTRdICogc2NhbGU7XG4gIG91dFsxNV0gPSBhWzE1XSArIGJbMTVdICogc2NhbGU7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgbWF0cmljZXMgaGF2ZSBleGFjdGx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uICh3aGVuIGNvbXBhcmVkIHdpdGggPT09KVxyXG4gKlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSBUaGUgZmlyc3QgbWF0cml4LlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYiBUaGUgc2Vjb25kIG1hdHJpeC5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIG1hdHJpY2VzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGV4YWN0RXF1YWxzKGEsIGIpIHtcbiAgcmV0dXJuIGFbMF0gPT09IGJbMF0gJiYgYVsxXSA9PT0gYlsxXSAmJiBhWzJdID09PSBiWzJdICYmIGFbM10gPT09IGJbM10gJiYgYVs0XSA9PT0gYls0XSAmJiBhWzVdID09PSBiWzVdICYmIGFbNl0gPT09IGJbNl0gJiYgYVs3XSA9PT0gYls3XSAmJiBhWzhdID09PSBiWzhdICYmIGFbOV0gPT09IGJbOV0gJiYgYVsxMF0gPT09IGJbMTBdICYmIGFbMTFdID09PSBiWzExXSAmJiBhWzEyXSA9PT0gYlsxMl0gJiYgYVsxM10gPT09IGJbMTNdICYmIGFbMTRdID09PSBiWzE0XSAmJiBhWzE1XSA9PT0gYlsxNV07XG59XG4vKipcclxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgbWF0cmljZXMgaGF2ZSBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSBUaGUgZmlyc3QgbWF0cml4LlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYiBUaGUgc2Vjb25kIG1hdHJpeC5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIG1hdHJpY2VzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVxdWFscyhhLCBiKSB7XG4gIHZhciBhMCA9IGFbMF0sXG4gICAgICBhMSA9IGFbMV0sXG4gICAgICBhMiA9IGFbMl0sXG4gICAgICBhMyA9IGFbM107XG4gIHZhciBhNCA9IGFbNF0sXG4gICAgICBhNSA9IGFbNV0sXG4gICAgICBhNiA9IGFbNl0sXG4gICAgICBhNyA9IGFbN107XG4gIHZhciBhOCA9IGFbOF0sXG4gICAgICBhOSA9IGFbOV0sXG4gICAgICBhMTAgPSBhWzEwXSxcbiAgICAgIGExMSA9IGFbMTFdO1xuICB2YXIgYTEyID0gYVsxMl0sXG4gICAgICBhMTMgPSBhWzEzXSxcbiAgICAgIGExNCA9IGFbMTRdLFxuICAgICAgYTE1ID0gYVsxNV07XG4gIHZhciBiMCA9IGJbMF0sXG4gICAgICBiMSA9IGJbMV0sXG4gICAgICBiMiA9IGJbMl0sXG4gICAgICBiMyA9IGJbM107XG4gIHZhciBiNCA9IGJbNF0sXG4gICAgICBiNSA9IGJbNV0sXG4gICAgICBiNiA9IGJbNl0sXG4gICAgICBiNyA9IGJbN107XG4gIHZhciBiOCA9IGJbOF0sXG4gICAgICBiOSA9IGJbOV0sXG4gICAgICBiMTAgPSBiWzEwXSxcbiAgICAgIGIxMSA9IGJbMTFdO1xuICB2YXIgYjEyID0gYlsxMl0sXG4gICAgICBiMTMgPSBiWzEzXSxcbiAgICAgIGIxNCA9IGJbMTRdLFxuICAgICAgYjE1ID0gYlsxNV07XG4gIHJldHVybiBNYXRoLmFicyhhMCAtIGIwKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMCksIE1hdGguYWJzKGIwKSkgJiYgTWF0aC5hYnMoYTEgLSBiMSkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEpLCBNYXRoLmFicyhiMSkpICYmIE1hdGguYWJzKGEyIC0gYjIpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEyKSwgTWF0aC5hYnMoYjIpKSAmJiBNYXRoLmFicyhhMyAtIGIzKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMyksIE1hdGguYWJzKGIzKSkgJiYgTWF0aC5hYnMoYTQgLSBiNCkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTQpLCBNYXRoLmFicyhiNCkpICYmIE1hdGguYWJzKGE1IC0gYjUpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE1KSwgTWF0aC5hYnMoYjUpKSAmJiBNYXRoLmFicyhhNiAtIGI2KSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNiksIE1hdGguYWJzKGI2KSkgJiYgTWF0aC5hYnMoYTcgLSBiNykgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTcpLCBNYXRoLmFicyhiNykpICYmIE1hdGguYWJzKGE4IC0gYjgpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE4KSwgTWF0aC5hYnMoYjgpKSAmJiBNYXRoLmFicyhhOSAtIGI5KSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhOSksIE1hdGguYWJzKGI5KSkgJiYgTWF0aC5hYnMoYTEwIC0gYjEwKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMTApLCBNYXRoLmFicyhiMTApKSAmJiBNYXRoLmFicyhhMTEgLSBiMTEpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExMSksIE1hdGguYWJzKGIxMSkpICYmIE1hdGguYWJzKGExMiAtIGIxMikgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEyKSwgTWF0aC5hYnMoYjEyKSkgJiYgTWF0aC5hYnMoYTEzIC0gYjEzKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMTMpLCBNYXRoLmFicyhiMTMpKSAmJiBNYXRoLmFicyhhMTQgLSBiMTQpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExNCksIE1hdGguYWJzKGIxNCkpICYmIE1hdGguYWJzKGExNSAtIGIxNSkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTE1KSwgTWF0aC5hYnMoYjE1KSk7XG59XG4vKipcclxuICogQWxpYXMgZm9yIHtAbGluayBtYXQ0Lm11bHRpcGx5fVxyXG4gKiBAZnVuY3Rpb25cclxuICovXG5cbmV4cG9ydCB2YXIgbXVsID0gbXVsdGlwbHk7XG4vKipcclxuICogQWxpYXMgZm9yIHtAbGluayBtYXQ0LnN1YnRyYWN0fVxyXG4gKiBAZnVuY3Rpb25cclxuICovXG5cbmV4cG9ydCB2YXIgc3ViID0gc3VidHJhY3Q7IiwiaW1wb3J0ICogYXMgZ2xNYXRyaXggZnJvbSBcIi4vY29tbW9uLmpzXCI7XG4vKipcclxuICogMiBEaW1lbnNpb25hbCBWZWN0b3JcclxuICogQG1vZHVsZSB2ZWMyXHJcbiAqL1xuXG4vKipcclxuICogQ3JlYXRlcyBhIG5ldywgZW1wdHkgdmVjMlxyXG4gKlxyXG4gKiBAcmV0dXJucyB7dmVjMn0gYSBuZXcgMkQgdmVjdG9yXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKCkge1xuICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoMik7XG5cbiAgaWYgKGdsTWF0cml4LkFSUkFZX1RZUEUgIT0gRmxvYXQzMkFycmF5KSB7XG4gICAgb3V0WzBdID0gMDtcbiAgICBvdXRbMV0gPSAwO1xuICB9XG5cbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzIgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyB2ZWN0b3JcclxuICpcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdmVjdG9yIHRvIGNsb25lXHJcbiAqIEByZXR1cm5zIHt2ZWMyfSBhIG5ldyAyRCB2ZWN0b3JcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZShhKSB7XG4gIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgyKTtcbiAgb3V0WzBdID0gYVswXTtcbiAgb3V0WzFdID0gYVsxXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzIgaW5pdGlhbGl6ZWQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XHJcbiAqIEByZXR1cm5zIHt2ZWMyfSBhIG5ldyAyRCB2ZWN0b3JcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tVmFsdWVzKHgsIHkpIHtcbiAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDIpO1xuICBvdXRbMF0gPSB4O1xuICBvdXRbMV0gPSB5O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSB2ZWMyIHRvIGFub3RoZXJcclxuICpcclxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIHNvdXJjZSB2ZWN0b3JcclxuICogQHJldHVybnMge3ZlYzJ9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHkob3V0LCBhKSB7XG4gIG91dFswXSA9IGFbMF07XG4gIG91dFsxXSA9IGFbMV07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMiB0byB0aGUgZ2l2ZW4gdmFsdWVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XHJcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXQob3V0LCB4LCB5KSB7XG4gIG91dFswXSA9IHg7XG4gIG91dFsxXSA9IHk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQWRkcyB0d28gdmVjMidzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgb3V0WzFdID0gYVsxXSArIGJbMV07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogU3VidHJhY3RzIHZlY3RvciBiIGZyb20gdmVjdG9yIGFcclxuICpcclxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJ0cmFjdChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAtIGJbMF07XG4gIG91dFsxXSA9IGFbMV0gLSBiWzFdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIE11bHRpcGxpZXMgdHdvIHZlYzInc1xyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHJldHVybnMge3ZlYzJ9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG11bHRpcGx5KG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICogYlswXTtcbiAgb3V0WzFdID0gYVsxXSAqIGJbMV07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogRGl2aWRlcyB0d28gdmVjMidzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZGl2aWRlKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdIC8gYlswXTtcbiAgb3V0WzFdID0gYVsxXSAvIGJbMV07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogTWF0aC5jZWlsIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMlxyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB2ZWN0b3IgdG8gY2VpbFxyXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY2VpbChvdXQsIGEpIHtcbiAgb3V0WzBdID0gTWF0aC5jZWlsKGFbMF0pO1xuICBvdXRbMV0gPSBNYXRoLmNlaWwoYVsxXSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogTWF0aC5mbG9vciB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzJcclxuICpcclxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdmVjdG9yIHRvIGZsb29yXHJcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmbG9vcihvdXQsIGEpIHtcbiAgb3V0WzBdID0gTWF0aC5mbG9vcihhWzBdKTtcbiAgb3V0WzFdID0gTWF0aC5mbG9vcihhWzFdKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBtaW5pbXVtIG9mIHR3byB2ZWMyJ3NcclxuICpcclxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBtaW4ob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IE1hdGgubWluKGFbMF0sIGJbMF0pO1xuICBvdXRbMV0gPSBNYXRoLm1pbihhWzFdLCBiWzFdKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBtYXhpbXVtIG9mIHR3byB2ZWMyJ3NcclxuICpcclxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBtYXgob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IE1hdGgubWF4KGFbMF0sIGJbMF0pO1xuICBvdXRbMV0gPSBNYXRoLm1heChhWzFdLCBiWzFdKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBNYXRoLnJvdW5kIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMlxyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB2ZWN0b3IgdG8gcm91bmRcclxuICogQHJldHVybnMge3ZlYzJ9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdW5kKG91dCwgYSkge1xuICBvdXRbMF0gPSBNYXRoLnJvdW5kKGFbMF0pO1xuICBvdXRbMV0gPSBNYXRoLnJvdW5kKGFbMV0pO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFNjYWxlcyBhIHZlYzIgYnkgYSBzY2FsYXIgbnVtYmVyXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSB2ZWN0b3IgdG8gc2NhbGVcclxuICogQHBhcmFtIHtOdW1iZXJ9IGIgYW1vdW50IHRvIHNjYWxlIHRoZSB2ZWN0b3IgYnlcclxuICogQHJldHVybnMge3ZlYzJ9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICogYjtcbiAgb3V0WzFdID0gYVsxXSAqIGI7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQWRkcyB0d28gdmVjMidzIGFmdGVyIHNjYWxpbmcgdGhlIHNlY29uZCBvcGVyYW5kIGJ5IGEgc2NhbGFyIHZhbHVlXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGUgdGhlIGFtb3VudCB0byBzY2FsZSBiIGJ5IGJlZm9yZSBhZGRpbmdcclxuICogQHJldHVybnMge3ZlYzJ9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlQW5kQWRkKG91dCwgYSwgYiwgc2NhbGUpIHtcbiAgb3V0WzBdID0gYVswXSArIGJbMF0gKiBzY2FsZTtcbiAgb3V0WzFdID0gYVsxXSArIGJbMV0gKiBzY2FsZTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjMidzXHJcbiAqXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkaXN0YW5jZShhLCBiKSB7XG4gIHZhciB4ID0gYlswXSAtIGFbMF0sXG4gICAgICB5ID0gYlsxXSAtIGFbMV07XG4gIHJldHVybiBNYXRoLmh5cG90KHgsIHkpO1xufVxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzInc1xyXG4gKlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzcXVhcmVkRGlzdGFuY2UoYSwgYikge1xuICB2YXIgeCA9IGJbMF0gLSBhWzBdLFxuICAgICAgeSA9IGJbMV0gLSBhWzFdO1xuICByZXR1cm4geCAqIHggKyB5ICogeTtcbn1cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgYSB2ZWMyXHJcbiAqXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHZlY3RvciB0byBjYWxjdWxhdGUgbGVuZ3RoIG9mXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGxlbmd0aCBvZiBhXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbGVuZ3RoKGEpIHtcbiAgdmFyIHggPSBhWzBdLFxuICAgICAgeSA9IGFbMV07XG4gIHJldHVybiBNYXRoLmh5cG90KHgsIHkpO1xufVxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIGEgdmVjMlxyXG4gKlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIHNxdWFyZWQgbGVuZ3RoIG9mXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgbGVuZ3RoIG9mIGFcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzcXVhcmVkTGVuZ3RoKGEpIHtcbiAgdmFyIHggPSBhWzBdLFxuICAgICAgeSA9IGFbMV07XG4gIHJldHVybiB4ICogeCArIHkgKiB5O1xufVxuLyoqXHJcbiAqIE5lZ2F0ZXMgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMyXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHZlY3RvciB0byBuZWdhdGVcclxuICogQHJldHVybnMge3ZlYzJ9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG5lZ2F0ZShvdXQsIGEpIHtcbiAgb3V0WzBdID0gLWFbMF07XG4gIG91dFsxXSA9IC1hWzFdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGludmVyc2Ugb2YgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMyXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHZlY3RvciB0byBpbnZlcnRcclxuICogQHJldHVybnMge3ZlYzJ9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGludmVyc2Uob3V0LCBhKSB7XG4gIG91dFswXSA9IDEuMCAvIGFbMF07XG4gIG91dFsxXSA9IDEuMCAvIGFbMV07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogTm9ybWFsaXplIGEgdmVjMlxyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB2ZWN0b3IgdG8gbm9ybWFsaXplXHJcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemUob3V0LCBhKSB7XG4gIHZhciB4ID0gYVswXSxcbiAgICAgIHkgPSBhWzFdO1xuICB2YXIgbGVuID0geCAqIHggKyB5ICogeTtcblxuICBpZiAobGVuID4gMCkge1xuICAgIC8vVE9ETzogZXZhbHVhdGUgdXNlIG9mIGdsbV9pbnZzcXJ0IGhlcmU/XG4gICAgbGVuID0gMSAvIE1hdGguc3FydChsZW4pO1xuICB9XG5cbiAgb3V0WzBdID0gYVswXSAqIGxlbjtcbiAgb3V0WzFdID0gYVsxXSAqIGxlbjtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0d28gdmVjMidzXHJcbiAqXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkb3QgcHJvZHVjdCBvZiBhIGFuZCBiXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZG90KGEsIGIpIHtcbiAgcmV0dXJuIGFbMF0gKiBiWzBdICsgYVsxXSAqIGJbMV07XG59XG4vKipcclxuICogQ29tcHV0ZXMgdGhlIGNyb3NzIHByb2R1Y3Qgb2YgdHdvIHZlYzInc1xyXG4gKiBOb3RlIHRoYXQgdGhlIGNyb3NzIHByb2R1Y3QgbXVzdCBieSBkZWZpbml0aW9uIHByb2R1Y2UgYSAzRCB2ZWN0b3JcclxuICpcclxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjcm9zcyhvdXQsIGEsIGIpIHtcbiAgdmFyIHogPSBhWzBdICogYlsxXSAtIGFbMV0gKiBiWzBdO1xuICBvdXRbMF0gPSBvdXRbMV0gPSAwO1xuICBvdXRbMl0gPSB6O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjMidzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge051bWJlcn0gdCBpbnRlcnBvbGF0aW9uIGFtb3VudCwgaW4gdGhlIHJhbmdlIFswLTFdLCBiZXR3ZWVuIHRoZSB0d28gaW5wdXRzXHJcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBsZXJwKG91dCwgYSwgYiwgdCkge1xuICB2YXIgYXggPSBhWzBdLFxuICAgICAgYXkgPSBhWzFdO1xuICBvdXRbMF0gPSBheCArIHQgKiAoYlswXSAtIGF4KTtcbiAgb3V0WzFdID0gYXkgKyB0ICogKGJbMV0gLSBheSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogR2VuZXJhdGVzIGEgcmFuZG9tIHZlY3RvciB3aXRoIHRoZSBnaXZlbiBzY2FsZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge051bWJlcn0gW3NjYWxlXSBMZW5ndGggb2YgdGhlIHJlc3VsdGluZyB2ZWN0b3IuIElmIG9tbWl0dGVkLCBhIHVuaXQgdmVjdG9yIHdpbGwgYmUgcmV0dXJuZWRcclxuICogQHJldHVybnMge3ZlYzJ9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbShvdXQsIHNjYWxlKSB7XG4gIHNjYWxlID0gc2NhbGUgfHwgMS4wO1xuICB2YXIgciA9IGdsTWF0cml4LlJBTkRPTSgpICogMi4wICogTWF0aC5QSTtcbiAgb3V0WzBdID0gTWF0aC5jb3MocikgKiBzY2FsZTtcbiAgb3V0WzFdID0gTWF0aC5zaW4ocikgKiBzY2FsZTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMyIHdpdGggYSBtYXQyXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyfSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxyXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtTWF0MihvdXQsIGEsIG0pIHtcbiAgdmFyIHggPSBhWzBdLFxuICAgICAgeSA9IGFbMV07XG4gIG91dFswXSA9IG1bMF0gKiB4ICsgbVsyXSAqIHk7XG4gIG91dFsxXSA9IG1bMV0gKiB4ICsgbVszXSAqIHk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogVHJhbnNmb3JtcyB0aGUgdmVjMiB3aXRoIGEgbWF0MmRcclxuICpcclxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cclxuICogQHBhcmFtIHtSZWFkb25seU1hdDJkfSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxyXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtTWF0MmQob3V0LCBhLCBtKSB7XG4gIHZhciB4ID0gYVswXSxcbiAgICAgIHkgPSBhWzFdO1xuICBvdXRbMF0gPSBtWzBdICogeCArIG1bMl0gKiB5ICsgbVs0XTtcbiAgb3V0WzFdID0gbVsxXSAqIHggKyBtWzNdICogeSArIG1bNV07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogVHJhbnNmb3JtcyB0aGUgdmVjMiB3aXRoIGEgbWF0M1xyXG4gKiAzcmQgdmVjdG9yIGNvbXBvbmVudCBpcyBpbXBsaWNpdGx5ICcxJ1xyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcclxuICogQHJldHVybnMge3ZlYzJ9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybU1hdDMob3V0LCBhLCBtKSB7XG4gIHZhciB4ID0gYVswXSxcbiAgICAgIHkgPSBhWzFdO1xuICBvdXRbMF0gPSBtWzBdICogeCArIG1bM10gKiB5ICsgbVs2XTtcbiAgb3V0WzFdID0gbVsxXSAqIHggKyBtWzRdICogeSArIG1bN107XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogVHJhbnNmb3JtcyB0aGUgdmVjMiB3aXRoIGEgbWF0NFxyXG4gKiAzcmQgdmVjdG9yIGNvbXBvbmVudCBpcyBpbXBsaWNpdGx5ICcwJ1xyXG4gKiA0dGggdmVjdG9yIGNvbXBvbmVudCBpcyBpbXBsaWNpdGx5ICcxJ1xyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcclxuICogQHJldHVybnMge3ZlYzJ9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybU1hdDQob3V0LCBhLCBtKSB7XG4gIHZhciB4ID0gYVswXTtcbiAgdmFyIHkgPSBhWzFdO1xuICBvdXRbMF0gPSBtWzBdICogeCArIG1bNF0gKiB5ICsgbVsxMl07XG4gIG91dFsxXSA9IG1bMV0gKiB4ICsgbVs1XSAqIHkgKyBtWzEzXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBSb3RhdGUgYSAyRCB2ZWN0b3JcclxuICogQHBhcmFtIHt2ZWMyfSBvdXQgVGhlIHJlY2VpdmluZyB2ZWMyXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIFRoZSB2ZWMyIHBvaW50IHRvIHJvdGF0ZVxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiBUaGUgb3JpZ2luIG9mIHRoZSByb3RhdGlvblxyXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIFRoZSBhbmdsZSBvZiByb3RhdGlvbiBpbiByYWRpYW5zXHJcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGUob3V0LCBhLCBiLCByYWQpIHtcbiAgLy9UcmFuc2xhdGUgcG9pbnQgdG8gdGhlIG9yaWdpblxuICB2YXIgcDAgPSBhWzBdIC0gYlswXSxcbiAgICAgIHAxID0gYVsxXSAtIGJbMV0sXG4gICAgICBzaW5DID0gTWF0aC5zaW4ocmFkKSxcbiAgICAgIGNvc0MgPSBNYXRoLmNvcyhyYWQpOyAvL3BlcmZvcm0gcm90YXRpb24gYW5kIHRyYW5zbGF0ZSB0byBjb3JyZWN0IHBvc2l0aW9uXG5cbiAgb3V0WzBdID0gcDAgKiBjb3NDIC0gcDEgKiBzaW5DICsgYlswXTtcbiAgb3V0WzFdID0gcDAgKiBzaW5DICsgcDEgKiBjb3NDICsgYlsxXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBHZXQgdGhlIGFuZ2xlIGJldHdlZW4gdHdvIDJEIHZlY3RvcnNcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgVGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgVGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBhbmdsZSBpbiByYWRpYW5zXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gYW5nbGUoYSwgYikge1xuICB2YXIgeDEgPSBhWzBdLFxuICAgICAgeTEgPSBhWzFdLFxuICAgICAgeDIgPSBiWzBdLFxuICAgICAgeTIgPSBiWzFdLFxuICAgICAgLy8gbWFnIGlzIHRoZSBwcm9kdWN0IG9mIHRoZSBtYWduaXR1ZGVzIG9mIGEgYW5kIGJcbiAgbWFnID0gTWF0aC5zcXJ0KHgxICogeDEgKyB5MSAqIHkxKSAqIE1hdGguc3FydCh4MiAqIHgyICsgeTIgKiB5MiksXG4gICAgICAvLyBtYWcgJiYuLiBzaG9ydCBjaXJjdWl0cyBpZiBtYWcgPT0gMFxuICBjb3NpbmUgPSBtYWcgJiYgKHgxICogeDIgKyB5MSAqIHkyKSAvIG1hZzsgLy8gTWF0aC5taW4oTWF0aC5tYXgoY29zaW5lLCAtMSksIDEpIGNsYW1wcyB0aGUgY29zaW5lIGJldHdlZW4gLTEgYW5kIDFcblxuICByZXR1cm4gTWF0aC5hY29zKE1hdGgubWluKE1hdGgubWF4KGNvc2luZSwgLTEpLCAxKSk7XG59XG4vKipcclxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMiB0byB6ZXJvXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB6ZXJvKG91dCkge1xuICBvdXRbMF0gPSAwLjA7XG4gIG91dFsxXSA9IDAuMDtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgdmVjdG9yXHJcbiAqXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHZlY3RvciB0byByZXByZXNlbnQgYXMgYSBzdHJpbmdcclxuICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2ZWN0b3JcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzdHIoYSkge1xuICByZXR1cm4gXCJ2ZWMyKFwiICsgYVswXSArIFwiLCBcIiArIGFbMV0gKyBcIilcIjtcbn1cbi8qKlxyXG4gKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSB2ZWN0b3JzIGV4YWN0bHkgaGF2ZSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbiAod2hlbiBjb21wYXJlZCB3aXRoID09PSlcclxuICpcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgVGhlIGZpcnN0IHZlY3Rvci5cclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgVGhlIHNlY29uZCB2ZWN0b3IuXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSB2ZWN0b3JzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGV4YWN0RXF1YWxzKGEsIGIpIHtcbiAgcmV0dXJuIGFbMF0gPT09IGJbMF0gJiYgYVsxXSA9PT0gYlsxXTtcbn1cbi8qKlxyXG4gKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSB2ZWN0b3JzIGhhdmUgYXBwcm94aW1hdGVseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbi5cclxuICpcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgVGhlIGZpcnN0IHZlY3Rvci5cclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgVGhlIHNlY29uZCB2ZWN0b3IuXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSB2ZWN0b3JzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVxdWFscyhhLCBiKSB7XG4gIHZhciBhMCA9IGFbMF0sXG4gICAgICBhMSA9IGFbMV07XG4gIHZhciBiMCA9IGJbMF0sXG4gICAgICBiMSA9IGJbMV07XG4gIHJldHVybiBNYXRoLmFicyhhMCAtIGIwKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMCksIE1hdGguYWJzKGIwKSkgJiYgTWF0aC5hYnMoYTEgLSBiMSkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEpLCBNYXRoLmFicyhiMSkpO1xufVxuLyoqXHJcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5sZW5ndGh9XHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cblxuZXhwb3J0IHZhciBsZW4gPSBsZW5ndGg7XG4vKipcclxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLnN1YnRyYWN0fVxyXG4gKiBAZnVuY3Rpb25cclxuICovXG5cbmV4cG9ydCB2YXIgc3ViID0gc3VidHJhY3Q7XG4vKipcclxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLm11bHRpcGx5fVxyXG4gKiBAZnVuY3Rpb25cclxuICovXG5cbmV4cG9ydCB2YXIgbXVsID0gbXVsdGlwbHk7XG4vKipcclxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLmRpdmlkZX1cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xuXG5leHBvcnQgdmFyIGRpdiA9IGRpdmlkZTtcbi8qKlxyXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzIuZGlzdGFuY2V9XHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cblxuZXhwb3J0IHZhciBkaXN0ID0gZGlzdGFuY2U7XG4vKipcclxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLnNxdWFyZWREaXN0YW5jZX1cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xuXG5leHBvcnQgdmFyIHNxckRpc3QgPSBzcXVhcmVkRGlzdGFuY2U7XG4vKipcclxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLnNxdWFyZWRMZW5ndGh9XHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cblxuZXhwb3J0IHZhciBzcXJMZW4gPSBzcXVhcmVkTGVuZ3RoO1xuLyoqXHJcbiAqIFBlcmZvcm0gc29tZSBvcGVyYXRpb24gb3ZlciBhbiBhcnJheSBvZiB2ZWMycy5cclxuICpcclxuICogQHBhcmFtIHtBcnJheX0gYSB0aGUgYXJyYXkgb2YgdmVjdG9ycyB0byBpdGVyYXRlIG92ZXJcclxuICogQHBhcmFtIHtOdW1iZXJ9IHN0cmlkZSBOdW1iZXIgb2YgZWxlbWVudHMgYmV0d2VlbiB0aGUgc3RhcnQgb2YgZWFjaCB2ZWMyLiBJZiAwIGFzc3VtZXMgdGlnaHRseSBwYWNrZWRcclxuICogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldCBOdW1iZXIgb2YgZWxlbWVudHMgdG8gc2tpcCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBhcnJheVxyXG4gKiBAcGFyYW0ge051bWJlcn0gY291bnQgTnVtYmVyIG9mIHZlYzJzIHRvIGl0ZXJhdGUgb3Zlci4gSWYgMCBpdGVyYXRlcyBvdmVyIGVudGlyZSBhcnJheVxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIHZlY3RvciBpbiB0aGUgYXJyYXlcclxuICogQHBhcmFtIHtPYmplY3R9IFthcmddIGFkZGl0aW9uYWwgYXJndW1lbnQgdG8gcGFzcyB0byBmblxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IGFcclxuICogQGZ1bmN0aW9uXHJcbiAqL1xuXG5leHBvcnQgdmFyIGZvckVhY2ggPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB2ZWMgPSBjcmVhdGUoKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChhLCBzdHJpZGUsIG9mZnNldCwgY291bnQsIGZuLCBhcmcpIHtcbiAgICB2YXIgaSwgbDtcblxuICAgIGlmICghc3RyaWRlKSB7XG4gICAgICBzdHJpZGUgPSAyO1xuICAgIH1cblxuICAgIGlmICghb2Zmc2V0KSB7XG4gICAgICBvZmZzZXQgPSAwO1xuICAgIH1cblxuICAgIGlmIChjb3VudCkge1xuICAgICAgbCA9IE1hdGgubWluKGNvdW50ICogc3RyaWRlICsgb2Zmc2V0LCBhLmxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGwgPSBhLmxlbmd0aDtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCBsOyBpICs9IHN0cmlkZSkge1xuICAgICAgdmVjWzBdID0gYVtpXTtcbiAgICAgIHZlY1sxXSA9IGFbaSArIDFdO1xuICAgICAgZm4odmVjLCB2ZWMsIGFyZyk7XG4gICAgICBhW2ldID0gdmVjWzBdO1xuICAgICAgYVtpICsgMV0gPSB2ZWNbMV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGE7XG4gIH07XG59KCk7IiwiaW1wb3J0ICogYXMgZ2xNYXRyaXggZnJvbSBcIi4vY29tbW9uLmpzXCI7XG4vKipcclxuICogMyBEaW1lbnNpb25hbCBWZWN0b3JcclxuICogQG1vZHVsZSB2ZWMzXHJcbiAqL1xuXG4vKipcclxuICogQ3JlYXRlcyBhIG5ldywgZW1wdHkgdmVjM1xyXG4gKlxyXG4gKiBAcmV0dXJucyB7dmVjM30gYSBuZXcgM0QgdmVjdG9yXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKCkge1xuICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoMyk7XG5cbiAgaWYgKGdsTWF0cml4LkFSUkFZX1RZUEUgIT0gRmxvYXQzMkFycmF5KSB7XG4gICAgb3V0WzBdID0gMDtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gIH1cblxuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcgdmVjMyBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIHZlY3RvclxyXG4gKlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gY2xvbmVcclxuICogQHJldHVybnMge3ZlYzN9IGEgbmV3IDNEIHZlY3RvclxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lKGEpIHtcbiAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDMpO1xuICBvdXRbMF0gPSBhWzBdO1xuICBvdXRbMV0gPSBhWzFdO1xuICBvdXRbMl0gPSBhWzJdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGxlbmd0aCBvZiBhIHZlYzNcclxuICpcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBsZW5ndGggb2ZcclxuICogQHJldHVybnMge051bWJlcn0gbGVuZ3RoIG9mIGFcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBsZW5ndGgoYSkge1xuICB2YXIgeCA9IGFbMF07XG4gIHZhciB5ID0gYVsxXTtcbiAgdmFyIHogPSBhWzJdO1xuICByZXR1cm4gTWF0aC5oeXBvdCh4LCB5LCB6KTtcbn1cbi8qKlxyXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzMgaW5pdGlhbGl6ZWQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB6IFogY29tcG9uZW50XHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBhIG5ldyAzRCB2ZWN0b3JcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tVmFsdWVzKHgsIHksIHopIHtcbiAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDMpO1xuICBvdXRbMF0gPSB4O1xuICBvdXRbMV0gPSB5O1xuICBvdXRbMl0gPSB6O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSB2ZWMzIHRvIGFub3RoZXJcclxuICpcclxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIHNvdXJjZSB2ZWN0b3JcclxuICogQHJldHVybnMge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHkob3V0LCBhKSB7XG4gIG91dFswXSA9IGFbMF07XG4gIG91dFsxXSA9IGFbMV07XG4gIG91dFsyXSA9IGFbMl07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMyB0byB0aGUgZ2l2ZW4gdmFsdWVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB6IFogY29tcG9uZW50XHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXQob3V0LCB4LCB5LCB6KSB7XG4gIG91dFswXSA9IHg7XG4gIG91dFsxXSA9IHk7XG4gIG91dFsyXSA9IHo7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQWRkcyB0d28gdmVjMydzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgb3V0WzFdID0gYVsxXSArIGJbMV07XG4gIG91dFsyXSA9IGFbMl0gKyBiWzJdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFN1YnRyYWN0cyB2ZWN0b3IgYiBmcm9tIHZlY3RvciBhXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc3VidHJhY3Qob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gLSBiWzBdO1xuICBvdXRbMV0gPSBhWzFdIC0gYlsxXTtcbiAgb3V0WzJdID0gYVsyXSAtIGJbMl07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogTXVsdGlwbGllcyB0d28gdmVjMydzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlwbHkob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gKiBiWzBdO1xuICBvdXRbMV0gPSBhWzFdICogYlsxXTtcbiAgb3V0WzJdID0gYVsyXSAqIGJbMl07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogRGl2aWRlcyB0d28gdmVjMydzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZGl2aWRlKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdIC8gYlswXTtcbiAgb3V0WzFdID0gYVsxXSAvIGJbMV07XG4gIG91dFsyXSA9IGFbMl0gLyBiWzJdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIE1hdGguY2VpbCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzNcclxuICpcclxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdmVjdG9yIHRvIGNlaWxcclxuICogQHJldHVybnMge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNlaWwob3V0LCBhKSB7XG4gIG91dFswXSA9IE1hdGguY2VpbChhWzBdKTtcbiAgb3V0WzFdID0gTWF0aC5jZWlsKGFbMV0pO1xuICBvdXRbMl0gPSBNYXRoLmNlaWwoYVsyXSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogTWF0aC5mbG9vciB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzNcclxuICpcclxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdmVjdG9yIHRvIGZsb29yXHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmbG9vcihvdXQsIGEpIHtcbiAgb3V0WzBdID0gTWF0aC5mbG9vcihhWzBdKTtcbiAgb3V0WzFdID0gTWF0aC5mbG9vcihhWzFdKTtcbiAgb3V0WzJdID0gTWF0aC5mbG9vcihhWzJdKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBtaW5pbXVtIG9mIHR3byB2ZWMzJ3NcclxuICpcclxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBtaW4ob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IE1hdGgubWluKGFbMF0sIGJbMF0pO1xuICBvdXRbMV0gPSBNYXRoLm1pbihhWzFdLCBiWzFdKTtcbiAgb3V0WzJdID0gTWF0aC5taW4oYVsyXSwgYlsyXSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogUmV0dXJucyB0aGUgbWF4aW11bSBvZiB0d28gdmVjMydzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbWF4KG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBNYXRoLm1heChhWzBdLCBiWzBdKTtcbiAgb3V0WzFdID0gTWF0aC5tYXgoYVsxXSwgYlsxXSk7XG4gIG91dFsyXSA9IE1hdGgubWF4KGFbMl0sIGJbMl0pO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIE1hdGgucm91bmQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHZlY3RvciB0byByb3VuZFxyXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcm91bmQob3V0LCBhKSB7XG4gIG91dFswXSA9IE1hdGgucm91bmQoYVswXSk7XG4gIG91dFsxXSA9IE1hdGgucm91bmQoYVsxXSk7XG4gIG91dFsyXSA9IE1hdGgucm91bmQoYVsyXSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogU2NhbGVzIGEgdmVjMyBieSBhIHNjYWxhciBudW1iZXJcclxuICpcclxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIHZlY3RvciB0byBzY2FsZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIHZlY3RvciBieVxyXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc2NhbGUob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gKiBiO1xuICBvdXRbMV0gPSBhWzFdICogYjtcbiAgb3V0WzJdID0gYVsyXSAqIGI7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQWRkcyB0d28gdmVjMydzIGFmdGVyIHNjYWxpbmcgdGhlIHNlY29uZCBvcGVyYW5kIGJ5IGEgc2NhbGFyIHZhbHVlXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGUgdGhlIGFtb3VudCB0byBzY2FsZSBiIGJ5IGJlZm9yZSBhZGRpbmdcclxuICogQHJldHVybnMge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlQW5kQWRkKG91dCwgYSwgYiwgc2NhbGUpIHtcbiAgb3V0WzBdID0gYVswXSArIGJbMF0gKiBzY2FsZTtcbiAgb3V0WzFdID0gYVsxXSArIGJbMV0gKiBzY2FsZTtcbiAgb3V0WzJdID0gYVsyXSArIGJbMl0gKiBzY2FsZTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjMydzXHJcbiAqXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkaXN0YW5jZShhLCBiKSB7XG4gIHZhciB4ID0gYlswXSAtIGFbMF07XG4gIHZhciB5ID0gYlsxXSAtIGFbMV07XG4gIHZhciB6ID0gYlsyXSAtIGFbMl07XG4gIHJldHVybiBNYXRoLmh5cG90KHgsIHksIHopO1xufVxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzMnc1xyXG4gKlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzcXVhcmVkRGlzdGFuY2UoYSwgYikge1xuICB2YXIgeCA9IGJbMF0gLSBhWzBdO1xuICB2YXIgeSA9IGJbMV0gLSBhWzFdO1xuICB2YXIgeiA9IGJbMl0gLSBhWzJdO1xuICByZXR1cm4geCAqIHggKyB5ICogeSArIHogKiB6O1xufVxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIGEgdmVjM1xyXG4gKlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIHNxdWFyZWQgbGVuZ3RoIG9mXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgbGVuZ3RoIG9mIGFcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzcXVhcmVkTGVuZ3RoKGEpIHtcbiAgdmFyIHggPSBhWzBdO1xuICB2YXIgeSA9IGFbMV07XG4gIHZhciB6ID0gYVsyXTtcbiAgcmV0dXJuIHggKiB4ICsgeSAqIHkgKyB6ICogejtcbn1cbi8qKlxyXG4gKiBOZWdhdGVzIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjM1xyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gbmVnYXRlXHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBuZWdhdGUob3V0LCBhKSB7XG4gIG91dFswXSA9IC1hWzBdO1xuICBvdXRbMV0gPSAtYVsxXTtcbiAgb3V0WzJdID0gLWFbMl07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogUmV0dXJucyB0aGUgaW52ZXJzZSBvZiB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzNcclxuICpcclxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdmVjdG9yIHRvIGludmVydFxyXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJzZShvdXQsIGEpIHtcbiAgb3V0WzBdID0gMS4wIC8gYVswXTtcbiAgb3V0WzFdID0gMS4wIC8gYVsxXTtcbiAgb3V0WzJdID0gMS4wIC8gYVsyXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBOb3JtYWxpemUgYSB2ZWMzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHZlY3RvciB0byBub3JtYWxpemVcclxuICogQHJldHVybnMge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZShvdXQsIGEpIHtcbiAgdmFyIHggPSBhWzBdO1xuICB2YXIgeSA9IGFbMV07XG4gIHZhciB6ID0gYVsyXTtcbiAgdmFyIGxlbiA9IHggKiB4ICsgeSAqIHkgKyB6ICogejtcblxuICBpZiAobGVuID4gMCkge1xuICAgIC8vVE9ETzogZXZhbHVhdGUgdXNlIG9mIGdsbV9pbnZzcXJ0IGhlcmU/XG4gICAgbGVuID0gMSAvIE1hdGguc3FydChsZW4pO1xuICB9XG5cbiAgb3V0WzBdID0gYVswXSAqIGxlbjtcbiAgb3V0WzFdID0gYVsxXSAqIGxlbjtcbiAgb3V0WzJdID0gYVsyXSAqIGxlbjtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0d28gdmVjMydzXHJcbiAqXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkb3QgcHJvZHVjdCBvZiBhIGFuZCBiXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZG90KGEsIGIpIHtcbiAgcmV0dXJuIGFbMF0gKiBiWzBdICsgYVsxXSAqIGJbMV0gKyBhWzJdICogYlsyXTtcbn1cbi8qKlxyXG4gKiBDb21wdXRlcyB0aGUgY3Jvc3MgcHJvZHVjdCBvZiB0d28gdmVjMydzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY3Jvc3Mob3V0LCBhLCBiKSB7XG4gIHZhciBheCA9IGFbMF0sXG4gICAgICBheSA9IGFbMV0sXG4gICAgICBheiA9IGFbMl07XG4gIHZhciBieCA9IGJbMF0sXG4gICAgICBieSA9IGJbMV0sXG4gICAgICBieiA9IGJbMl07XG4gIG91dFswXSA9IGF5ICogYnogLSBheiAqIGJ5O1xuICBvdXRbMV0gPSBheiAqIGJ4IC0gYXggKiBiejtcbiAgb3V0WzJdID0gYXggKiBieSAtIGF5ICogYng7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogUGVyZm9ybXMgYSBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHR3byB2ZWMzJ3NcclxuICpcclxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50LCBpbiB0aGUgcmFuZ2UgWzAtMV0sIGJldHdlZW4gdGhlIHR3byBpbnB1dHNcclxuICogQHJldHVybnMge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGxlcnAob3V0LCBhLCBiLCB0KSB7XG4gIHZhciBheCA9IGFbMF07XG4gIHZhciBheSA9IGFbMV07XG4gIHZhciBheiA9IGFbMl07XG4gIG91dFswXSA9IGF4ICsgdCAqIChiWzBdIC0gYXgpO1xuICBvdXRbMV0gPSBheSArIHQgKiAoYlsxXSAtIGF5KTtcbiAgb3V0WzJdID0gYXogKyB0ICogKGJbMl0gLSBheik7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogUGVyZm9ybXMgYSBoZXJtaXRlIGludGVycG9sYXRpb24gd2l0aCB0d28gY29udHJvbCBwb2ludHNcclxuICpcclxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBjIHRoZSB0aGlyZCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBkIHRoZSBmb3VydGggb3BlcmFuZFxyXG4gKiBAcGFyYW0ge051bWJlcn0gdCBpbnRlcnBvbGF0aW9uIGFtb3VudCwgaW4gdGhlIHJhbmdlIFswLTFdLCBiZXR3ZWVuIHRoZSB0d28gaW5wdXRzXHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBoZXJtaXRlKG91dCwgYSwgYiwgYywgZCwgdCkge1xuICB2YXIgZmFjdG9yVGltZXMyID0gdCAqIHQ7XG4gIHZhciBmYWN0b3IxID0gZmFjdG9yVGltZXMyICogKDIgKiB0IC0gMykgKyAxO1xuICB2YXIgZmFjdG9yMiA9IGZhY3RvclRpbWVzMiAqICh0IC0gMikgKyB0O1xuICB2YXIgZmFjdG9yMyA9IGZhY3RvclRpbWVzMiAqICh0IC0gMSk7XG4gIHZhciBmYWN0b3I0ID0gZmFjdG9yVGltZXMyICogKDMgLSAyICogdCk7XG4gIG91dFswXSA9IGFbMF0gKiBmYWN0b3IxICsgYlswXSAqIGZhY3RvcjIgKyBjWzBdICogZmFjdG9yMyArIGRbMF0gKiBmYWN0b3I0O1xuICBvdXRbMV0gPSBhWzFdICogZmFjdG9yMSArIGJbMV0gKiBmYWN0b3IyICsgY1sxXSAqIGZhY3RvcjMgKyBkWzFdICogZmFjdG9yNDtcbiAgb3V0WzJdID0gYVsyXSAqIGZhY3RvcjEgKyBiWzJdICogZmFjdG9yMiArIGNbMl0gKiBmYWN0b3IzICsgZFsyXSAqIGZhY3RvcjQ7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogUGVyZm9ybXMgYSBiZXppZXIgaW50ZXJwb2xhdGlvbiB3aXRoIHR3byBjb250cm9sIHBvaW50c1xyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGMgdGhlIHRoaXJkIG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGQgdGhlIGZvdXJ0aCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50LCBpbiB0aGUgcmFuZ2UgWzAtMV0sIGJldHdlZW4gdGhlIHR3byBpbnB1dHNcclxuICogQHJldHVybnMge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGJlemllcihvdXQsIGEsIGIsIGMsIGQsIHQpIHtcbiAgdmFyIGludmVyc2VGYWN0b3IgPSAxIC0gdDtcbiAgdmFyIGludmVyc2VGYWN0b3JUaW1lc1R3byA9IGludmVyc2VGYWN0b3IgKiBpbnZlcnNlRmFjdG9yO1xuICB2YXIgZmFjdG9yVGltZXMyID0gdCAqIHQ7XG4gIHZhciBmYWN0b3IxID0gaW52ZXJzZUZhY3RvclRpbWVzVHdvICogaW52ZXJzZUZhY3RvcjtcbiAgdmFyIGZhY3RvcjIgPSAzICogdCAqIGludmVyc2VGYWN0b3JUaW1lc1R3bztcbiAgdmFyIGZhY3RvcjMgPSAzICogZmFjdG9yVGltZXMyICogaW52ZXJzZUZhY3RvcjtcbiAgdmFyIGZhY3RvcjQgPSBmYWN0b3JUaW1lczIgKiB0O1xuICBvdXRbMF0gPSBhWzBdICogZmFjdG9yMSArIGJbMF0gKiBmYWN0b3IyICsgY1swXSAqIGZhY3RvcjMgKyBkWzBdICogZmFjdG9yNDtcbiAgb3V0WzFdID0gYVsxXSAqIGZhY3RvcjEgKyBiWzFdICogZmFjdG9yMiArIGNbMV0gKiBmYWN0b3IzICsgZFsxXSAqIGZhY3RvcjQ7XG4gIG91dFsyXSA9IGFbMl0gKiBmYWN0b3IxICsgYlsyXSAqIGZhY3RvcjIgKyBjWzJdICogZmFjdG9yMyArIGRbMl0gKiBmYWN0b3I0O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIHJhbmRvbSB2ZWN0b3Igd2l0aCB0aGUgZ2l2ZW4gc2NhbGVcclxuICpcclxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtOdW1iZXJ9IFtzY2FsZV0gTGVuZ3RoIG9mIHRoZSByZXN1bHRpbmcgdmVjdG9yLiBJZiBvbW1pdHRlZCwgYSB1bml0IHZlY3RvciB3aWxsIGJlIHJldHVybmVkXHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByYW5kb20ob3V0LCBzY2FsZSkge1xuICBzY2FsZSA9IHNjYWxlIHx8IDEuMDtcbiAgdmFyIHIgPSBnbE1hdHJpeC5SQU5ET00oKSAqIDIuMCAqIE1hdGguUEk7XG4gIHZhciB6ID0gZ2xNYXRyaXguUkFORE9NKCkgKiAyLjAgLSAxLjA7XG4gIHZhciB6U2NhbGUgPSBNYXRoLnNxcnQoMS4wIC0geiAqIHopICogc2NhbGU7XG4gIG91dFswXSA9IE1hdGguY29zKHIpICogelNjYWxlO1xuICBvdXRbMV0gPSBNYXRoLnNpbihyKSAqIHpTY2FsZTtcbiAgb3V0WzJdID0geiAqIHNjYWxlO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzMgd2l0aCBhIG1hdDQuXHJcbiAqIDR0aCB2ZWN0b3IgY29tcG9uZW50IGlzIGltcGxpY2l0bHkgJzEnXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxyXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtTWF0NChvdXQsIGEsIG0pIHtcbiAgdmFyIHggPSBhWzBdLFxuICAgICAgeSA9IGFbMV0sXG4gICAgICB6ID0gYVsyXTtcbiAgdmFyIHcgPSBtWzNdICogeCArIG1bN10gKiB5ICsgbVsxMV0gKiB6ICsgbVsxNV07XG4gIHcgPSB3IHx8IDEuMDtcbiAgb3V0WzBdID0gKG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzhdICogeiArIG1bMTJdKSAvIHc7XG4gIG91dFsxXSA9IChtWzFdICogeCArIG1bNV0gKiB5ICsgbVs5XSAqIHogKyBtWzEzXSkgLyB3O1xuICBvdXRbMl0gPSAobVsyXSAqIHggKyBtWzZdICogeSArIG1bMTBdICogeiArIG1bMTRdKSAvIHc7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogVHJhbnNmb3JtcyB0aGUgdmVjMyB3aXRoIGEgbWF0My5cclxuICpcclxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cclxuICogQHBhcmFtIHtSZWFkb25seU1hdDN9IG0gdGhlIDN4MyBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcclxuICogQHJldHVybnMge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybU1hdDMob3V0LCBhLCBtKSB7XG4gIHZhciB4ID0gYVswXSxcbiAgICAgIHkgPSBhWzFdLFxuICAgICAgeiA9IGFbMl07XG4gIG91dFswXSA9IHggKiBtWzBdICsgeSAqIG1bM10gKyB6ICogbVs2XTtcbiAgb3V0WzFdID0geCAqIG1bMV0gKyB5ICogbVs0XSArIHogKiBtWzddO1xuICBvdXRbMl0gPSB4ICogbVsyXSArIHkgKiBtWzVdICsgeiAqIG1bOF07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogVHJhbnNmb3JtcyB0aGUgdmVjMyB3aXRoIGEgcXVhdFxyXG4gKiBDYW4gYWxzbyBiZSB1c2VkIGZvciBkdWFsIHF1YXRlcm5pb25zLiAoTXVsdGlwbHkgaXQgd2l0aCB0aGUgcmVhbCBwYXJ0KVxyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gcSBxdWF0ZXJuaW9uIHRvIHRyYW5zZm9ybSB3aXRoXHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1RdWF0KG91dCwgYSwgcSkge1xuICAvLyBiZW5jaG1hcmtzOiBodHRwczovL2pzcGVyZi5jb20vcXVhdGVybmlvbi10cmFuc2Zvcm0tdmVjMy1pbXBsZW1lbnRhdGlvbnMtZml4ZWRcbiAgdmFyIHF4ID0gcVswXSxcbiAgICAgIHF5ID0gcVsxXSxcbiAgICAgIHF6ID0gcVsyXSxcbiAgICAgIHF3ID0gcVszXTtcbiAgdmFyIHggPSBhWzBdLFxuICAgICAgeSA9IGFbMV0sXG4gICAgICB6ID0gYVsyXTsgLy8gdmFyIHF2ZWMgPSBbcXgsIHF5LCBxel07XG4gIC8vIHZhciB1diA9IHZlYzMuY3Jvc3MoW10sIHF2ZWMsIGEpO1xuXG4gIHZhciB1dnggPSBxeSAqIHogLSBxeiAqIHksXG4gICAgICB1dnkgPSBxeiAqIHggLSBxeCAqIHosXG4gICAgICB1dnogPSBxeCAqIHkgLSBxeSAqIHg7IC8vIHZhciB1dXYgPSB2ZWMzLmNyb3NzKFtdLCBxdmVjLCB1dik7XG5cbiAgdmFyIHV1dnggPSBxeSAqIHV2eiAtIHF6ICogdXZ5LFxuICAgICAgdXV2eSA9IHF6ICogdXZ4IC0gcXggKiB1dnosXG4gICAgICB1dXZ6ID0gcXggKiB1dnkgLSBxeSAqIHV2eDsgLy8gdmVjMy5zY2FsZSh1diwgdXYsIDIgKiB3KTtcblxuICB2YXIgdzIgPSBxdyAqIDI7XG4gIHV2eCAqPSB3MjtcbiAgdXZ5ICo9IHcyO1xuICB1dnogKj0gdzI7IC8vIHZlYzMuc2NhbGUodXV2LCB1dXYsIDIpO1xuXG4gIHV1dnggKj0gMjtcbiAgdXV2eSAqPSAyO1xuICB1dXZ6ICo9IDI7IC8vIHJldHVybiB2ZWMzLmFkZChvdXQsIGEsIHZlYzMuYWRkKG91dCwgdXYsIHV1dikpO1xuXG4gIG91dFswXSA9IHggKyB1dnggKyB1dXZ4O1xuICBvdXRbMV0gPSB5ICsgdXZ5ICsgdXV2eTtcbiAgb3V0WzJdID0geiArIHV2eiArIHV1dno7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogUm90YXRlIGEgM0QgdmVjdG9yIGFyb3VuZCB0aGUgeC1heGlzXHJcbiAqIEBwYXJhbSB7dmVjM30gb3V0IFRoZSByZWNlaXZpbmcgdmVjM1xyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSBUaGUgdmVjMyBwb2ludCB0byByb3RhdGVcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgVGhlIG9yaWdpbiBvZiB0aGUgcm90YXRpb25cclxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCBUaGUgYW5nbGUgb2Ygcm90YXRpb24gaW4gcmFkaWFuc1xyXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcm90YXRlWChvdXQsIGEsIGIsIHJhZCkge1xuICB2YXIgcCA9IFtdLFxuICAgICAgciA9IFtdOyAvL1RyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXG5cbiAgcFswXSA9IGFbMF0gLSBiWzBdO1xuICBwWzFdID0gYVsxXSAtIGJbMV07XG4gIHBbMl0gPSBhWzJdIC0gYlsyXTsgLy9wZXJmb3JtIHJvdGF0aW9uXG5cbiAgclswXSA9IHBbMF07XG4gIHJbMV0gPSBwWzFdICogTWF0aC5jb3MocmFkKSAtIHBbMl0gKiBNYXRoLnNpbihyYWQpO1xuICByWzJdID0gcFsxXSAqIE1hdGguc2luKHJhZCkgKyBwWzJdICogTWF0aC5jb3MocmFkKTsgLy90cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxuXG4gIG91dFswXSA9IHJbMF0gKyBiWzBdO1xuICBvdXRbMV0gPSByWzFdICsgYlsxXTtcbiAgb3V0WzJdID0gclsyXSArIGJbMl07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogUm90YXRlIGEgM0QgdmVjdG9yIGFyb3VuZCB0aGUgeS1heGlzXHJcbiAqIEBwYXJhbSB7dmVjM30gb3V0IFRoZSByZWNlaXZpbmcgdmVjM1xyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSBUaGUgdmVjMyBwb2ludCB0byByb3RhdGVcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgVGhlIG9yaWdpbiBvZiB0aGUgcm90YXRpb25cclxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCBUaGUgYW5nbGUgb2Ygcm90YXRpb24gaW4gcmFkaWFuc1xyXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcm90YXRlWShvdXQsIGEsIGIsIHJhZCkge1xuICB2YXIgcCA9IFtdLFxuICAgICAgciA9IFtdOyAvL1RyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXG5cbiAgcFswXSA9IGFbMF0gLSBiWzBdO1xuICBwWzFdID0gYVsxXSAtIGJbMV07XG4gIHBbMl0gPSBhWzJdIC0gYlsyXTsgLy9wZXJmb3JtIHJvdGF0aW9uXG5cbiAgclswXSA9IHBbMl0gKiBNYXRoLnNpbihyYWQpICsgcFswXSAqIE1hdGguY29zKHJhZCk7XG4gIHJbMV0gPSBwWzFdO1xuICByWzJdID0gcFsyXSAqIE1hdGguY29zKHJhZCkgLSBwWzBdICogTWF0aC5zaW4ocmFkKTsgLy90cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxuXG4gIG91dFswXSA9IHJbMF0gKyBiWzBdO1xuICBvdXRbMV0gPSByWzFdICsgYlsxXTtcbiAgb3V0WzJdID0gclsyXSArIGJbMl07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogUm90YXRlIGEgM0QgdmVjdG9yIGFyb3VuZCB0aGUgei1heGlzXHJcbiAqIEBwYXJhbSB7dmVjM30gb3V0IFRoZSByZWNlaXZpbmcgdmVjM1xyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSBUaGUgdmVjMyBwb2ludCB0byByb3RhdGVcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgVGhlIG9yaWdpbiBvZiB0aGUgcm90YXRpb25cclxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCBUaGUgYW5nbGUgb2Ygcm90YXRpb24gaW4gcmFkaWFuc1xyXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcm90YXRlWihvdXQsIGEsIGIsIHJhZCkge1xuICB2YXIgcCA9IFtdLFxuICAgICAgciA9IFtdOyAvL1RyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXG5cbiAgcFswXSA9IGFbMF0gLSBiWzBdO1xuICBwWzFdID0gYVsxXSAtIGJbMV07XG4gIHBbMl0gPSBhWzJdIC0gYlsyXTsgLy9wZXJmb3JtIHJvdGF0aW9uXG5cbiAgclswXSA9IHBbMF0gKiBNYXRoLmNvcyhyYWQpIC0gcFsxXSAqIE1hdGguc2luKHJhZCk7XG4gIHJbMV0gPSBwWzBdICogTWF0aC5zaW4ocmFkKSArIHBbMV0gKiBNYXRoLmNvcyhyYWQpO1xuICByWzJdID0gcFsyXTsgLy90cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxuXG4gIG91dFswXSA9IHJbMF0gKyBiWzBdO1xuICBvdXRbMV0gPSByWzFdICsgYlsxXTtcbiAgb3V0WzJdID0gclsyXSArIGJbMl07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogR2V0IHRoZSBhbmdsZSBiZXR3ZWVuIHR3byAzRCB2ZWN0b3JzXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIFRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIFRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgYW5nbGUgaW4gcmFkaWFuc1xyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGFuZ2xlKGEsIGIpIHtcbiAgdmFyIGF4ID0gYVswXSxcbiAgICAgIGF5ID0gYVsxXSxcbiAgICAgIGF6ID0gYVsyXSxcbiAgICAgIGJ4ID0gYlswXSxcbiAgICAgIGJ5ID0gYlsxXSxcbiAgICAgIGJ6ID0gYlsyXSxcbiAgICAgIG1hZzEgPSBNYXRoLnNxcnQoYXggKiBheCArIGF5ICogYXkgKyBheiAqIGF6KSxcbiAgICAgIG1hZzIgPSBNYXRoLnNxcnQoYnggKiBieCArIGJ5ICogYnkgKyBieiAqIGJ6KSxcbiAgICAgIG1hZyA9IG1hZzEgKiBtYWcyLFxuICAgICAgY29zaW5lID0gbWFnICYmIGRvdChhLCBiKSAvIG1hZztcbiAgcmV0dXJuIE1hdGguYWNvcyhNYXRoLm1pbihNYXRoLm1heChjb3NpbmUsIC0xKSwgMSkpO1xufVxuLyoqXHJcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzMgdG8gemVyb1xyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gemVybyhvdXQpIHtcbiAgb3V0WzBdID0gMC4wO1xuICBvdXRbMV0gPSAwLjA7XG4gIG91dFsyXSA9IDAuMDtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgdmVjdG9yXHJcbiAqXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHZlY3RvciB0byByZXByZXNlbnQgYXMgYSBzdHJpbmdcclxuICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2ZWN0b3JcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzdHIoYSkge1xuICByZXR1cm4gXCJ2ZWMzKFwiICsgYVswXSArIFwiLCBcIiArIGFbMV0gKyBcIiwgXCIgKyBhWzJdICsgXCIpXCI7XG59XG4vKipcclxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgdmVjdG9ycyBoYXZlIGV4YWN0bHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24gKHdoZW4gY29tcGFyZWQgd2l0aCA9PT0pXHJcbiAqXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIFRoZSBmaXJzdCB2ZWN0b3IuXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIFRoZSBzZWNvbmQgdmVjdG9yLlxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmVjdG9ycyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBleGFjdEVxdWFscyhhLCBiKSB7XG4gIHJldHVybiBhWzBdID09PSBiWzBdICYmIGFbMV0gPT09IGJbMV0gJiYgYVsyXSA9PT0gYlsyXTtcbn1cbi8qKlxyXG4gKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSB2ZWN0b3JzIGhhdmUgYXBwcm94aW1hdGVseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbi5cclxuICpcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgVGhlIGZpcnN0IHZlY3Rvci5cclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgVGhlIHNlY29uZCB2ZWN0b3IuXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSB2ZWN0b3JzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVxdWFscyhhLCBiKSB7XG4gIHZhciBhMCA9IGFbMF0sXG4gICAgICBhMSA9IGFbMV0sXG4gICAgICBhMiA9IGFbMl07XG4gIHZhciBiMCA9IGJbMF0sXG4gICAgICBiMSA9IGJbMV0sXG4gICAgICBiMiA9IGJbMl07XG4gIHJldHVybiBNYXRoLmFicyhhMCAtIGIwKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMCksIE1hdGguYWJzKGIwKSkgJiYgTWF0aC5hYnMoYTEgLSBiMSkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEpLCBNYXRoLmFicyhiMSkpICYmIE1hdGguYWJzKGEyIC0gYjIpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEyKSwgTWF0aC5hYnMoYjIpKTtcbn1cbi8qKlxyXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMuc3VidHJhY3R9XHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cblxuZXhwb3J0IHZhciBzdWIgPSBzdWJ0cmFjdDtcbi8qKlxyXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMubXVsdGlwbHl9XHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cblxuZXhwb3J0IHZhciBtdWwgPSBtdWx0aXBseTtcbi8qKlxyXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMuZGl2aWRlfVxyXG4gKiBAZnVuY3Rpb25cclxuICovXG5cbmV4cG9ydCB2YXIgZGl2ID0gZGl2aWRlO1xuLyoqXHJcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5kaXN0YW5jZX1cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xuXG5leHBvcnQgdmFyIGRpc3QgPSBkaXN0YW5jZTtcbi8qKlxyXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMuc3F1YXJlZERpc3RhbmNlfVxyXG4gKiBAZnVuY3Rpb25cclxuICovXG5cbmV4cG9ydCB2YXIgc3FyRGlzdCA9IHNxdWFyZWREaXN0YW5jZTtcbi8qKlxyXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMubGVuZ3RofVxyXG4gKiBAZnVuY3Rpb25cclxuICovXG5cbmV4cG9ydCB2YXIgbGVuID0gbGVuZ3RoO1xuLyoqXHJcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5zcXVhcmVkTGVuZ3RofVxyXG4gKiBAZnVuY3Rpb25cclxuICovXG5cbmV4cG9ydCB2YXIgc3FyTGVuID0gc3F1YXJlZExlbmd0aDtcbi8qKlxyXG4gKiBQZXJmb3JtIHNvbWUgb3BlcmF0aW9uIG92ZXIgYW4gYXJyYXkgb2YgdmVjM3MuXHJcbiAqXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGEgdGhlIGFycmF5IG9mIHZlY3RvcnMgdG8gaXRlcmF0ZSBvdmVyXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdHJpZGUgTnVtYmVyIG9mIGVsZW1lbnRzIGJldHdlZW4gdGhlIHN0YXJ0IG9mIGVhY2ggdmVjMy4gSWYgMCBhc3N1bWVzIHRpZ2h0bHkgcGFja2VkXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBvZmZzZXQgTnVtYmVyIG9mIGVsZW1lbnRzIHRvIHNraXAgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgYXJyYXlcclxuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50IE51bWJlciBvZiB2ZWMzcyB0byBpdGVyYXRlIG92ZXIuIElmIDAgaXRlcmF0ZXMgb3ZlciBlbnRpcmUgYXJyYXlcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCB2ZWN0b3IgaW4gdGhlIGFycmF5XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbYXJnXSBhZGRpdGlvbmFsIGFyZ3VtZW50IHRvIHBhc3MgdG8gZm5cclxuICogQHJldHVybnMge0FycmF5fSBhXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cblxuZXhwb3J0IHZhciBmb3JFYWNoID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdmVjID0gY3JlYXRlKCk7XG4gIHJldHVybiBmdW5jdGlvbiAoYSwgc3RyaWRlLCBvZmZzZXQsIGNvdW50LCBmbiwgYXJnKSB7XG4gICAgdmFyIGksIGw7XG5cbiAgICBpZiAoIXN0cmlkZSkge1xuICAgICAgc3RyaWRlID0gMztcbiAgICB9XG5cbiAgICBpZiAoIW9mZnNldCkge1xuICAgICAgb2Zmc2V0ID0gMDtcbiAgICB9XG5cbiAgICBpZiAoY291bnQpIHtcbiAgICAgIGwgPSBNYXRoLm1pbihjb3VudCAqIHN0cmlkZSArIG9mZnNldCwgYS5sZW5ndGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsID0gYS5sZW5ndGg7XG4gICAgfVxuXG4gICAgZm9yIChpID0gb2Zmc2V0OyBpIDwgbDsgaSArPSBzdHJpZGUpIHtcbiAgICAgIHZlY1swXSA9IGFbaV07XG4gICAgICB2ZWNbMV0gPSBhW2kgKyAxXTtcbiAgICAgIHZlY1syXSA9IGFbaSArIDJdO1xuICAgICAgZm4odmVjLCB2ZWMsIGFyZyk7XG4gICAgICBhW2ldID0gdmVjWzBdO1xuICAgICAgYVtpICsgMV0gPSB2ZWNbMV07XG4gICAgICBhW2kgKyAyXSA9IHZlY1syXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYTtcbiAgfTtcbn0oKTsiLCJpbXBvcnQgKiBhcyBnbE1hdHJpeCBmcm9tIFwiLi9jb21tb24uanNcIjtcbi8qKlxyXG4gKiA0IERpbWVuc2lvbmFsIFZlY3RvclxyXG4gKiBAbW9kdWxlIHZlYzRcclxuICovXG5cbi8qKlxyXG4gKiBDcmVhdGVzIGEgbmV3LCBlbXB0eSB2ZWM0XHJcbiAqXHJcbiAqIEByZXR1cm5zIHt2ZWM0fSBhIG5ldyA0RCB2ZWN0b3JcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSg0KTtcblxuICBpZiAoZ2xNYXRyaXguQVJSQVlfVFlQRSAhPSBGbG9hdDMyQXJyYXkpIHtcbiAgICBvdXRbMF0gPSAwO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICB9XG5cbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzQgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyB2ZWN0b3JcclxuICpcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdmVjdG9yIHRvIGNsb25lXHJcbiAqIEByZXR1cm5zIHt2ZWM0fSBhIG5ldyA0RCB2ZWN0b3JcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZShhKSB7XG4gIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSg0KTtcbiAgb3V0WzBdID0gYVswXTtcbiAgb3V0WzFdID0gYVsxXTtcbiAgb3V0WzJdID0gYVsyXTtcbiAgb3V0WzNdID0gYVszXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzQgaW5pdGlhbGl6ZWQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB6IFogY29tcG9uZW50XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB3IFcgY29tcG9uZW50XHJcbiAqIEByZXR1cm5zIHt2ZWM0fSBhIG5ldyA0RCB2ZWN0b3JcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tVmFsdWVzKHgsIHksIHosIHcpIHtcbiAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDQpO1xuICBvdXRbMF0gPSB4O1xuICBvdXRbMV0gPSB5O1xuICBvdXRbMl0gPSB6O1xuICBvdXRbM10gPSB3O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSB2ZWM0IHRvIGFub3RoZXJcclxuICpcclxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIHNvdXJjZSB2ZWN0b3JcclxuICogQHJldHVybnMge3ZlYzR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHkob3V0LCBhKSB7XG4gIG91dFswXSA9IGFbMF07XG4gIG91dFsxXSA9IGFbMV07XG4gIG91dFsyXSA9IGFbMl07XG4gIG91dFszXSA9IGFbM107XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjNCB0byB0aGUgZ2l2ZW4gdmFsdWVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB6IFogY29tcG9uZW50XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB3IFcgY29tcG9uZW50XHJcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXQob3V0LCB4LCB5LCB6LCB3KSB7XG4gIG91dFswXSA9IHg7XG4gIG91dFsxXSA9IHk7XG4gIG91dFsyXSA9IHo7XG4gIG91dFszXSA9IHc7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQWRkcyB0d28gdmVjNCdzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgb3V0WzFdID0gYVsxXSArIGJbMV07XG4gIG91dFsyXSA9IGFbMl0gKyBiWzJdO1xuICBvdXRbM10gPSBhWzNdICsgYlszXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBTdWJ0cmFjdHMgdmVjdG9yIGIgZnJvbSB2ZWN0b3IgYVxyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHJldHVybnMge3ZlYzR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHN1YnRyYWN0KG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdIC0gYlswXTtcbiAgb3V0WzFdID0gYVsxXSAtIGJbMV07XG4gIG91dFsyXSA9IGFbMl0gLSBiWzJdO1xuICBvdXRbM10gPSBhWzNdIC0gYlszXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBNdWx0aXBsaWVzIHR3byB2ZWM0J3NcclxuICpcclxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aXBseShvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAqIGJbMF07XG4gIG91dFsxXSA9IGFbMV0gKiBiWzFdO1xuICBvdXRbMl0gPSBhWzJdICogYlsyXTtcbiAgb3V0WzNdID0gYVszXSAqIGJbM107XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogRGl2aWRlcyB0d28gdmVjNCdzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZGl2aWRlKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdIC8gYlswXTtcbiAgb3V0WzFdID0gYVsxXSAvIGJbMV07XG4gIG91dFsyXSA9IGFbMl0gLyBiWzJdO1xuICBvdXRbM10gPSBhWzNdIC8gYlszXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBNYXRoLmNlaWwgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWM0XHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHZlY3RvciB0byBjZWlsXHJcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjZWlsKG91dCwgYSkge1xuICBvdXRbMF0gPSBNYXRoLmNlaWwoYVswXSk7XG4gIG91dFsxXSA9IE1hdGguY2VpbChhWzFdKTtcbiAgb3V0WzJdID0gTWF0aC5jZWlsKGFbMl0pO1xuICBvdXRbM10gPSBNYXRoLmNlaWwoYVszXSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogTWF0aC5mbG9vciB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzRcclxuICpcclxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdmVjdG9yIHRvIGZsb29yXHJcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmbG9vcihvdXQsIGEpIHtcbiAgb3V0WzBdID0gTWF0aC5mbG9vcihhWzBdKTtcbiAgb3V0WzFdID0gTWF0aC5mbG9vcihhWzFdKTtcbiAgb3V0WzJdID0gTWF0aC5mbG9vcihhWzJdKTtcbiAgb3V0WzNdID0gTWF0aC5mbG9vcihhWzNdKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBtaW5pbXVtIG9mIHR3byB2ZWM0J3NcclxuICpcclxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBtaW4ob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IE1hdGgubWluKGFbMF0sIGJbMF0pO1xuICBvdXRbMV0gPSBNYXRoLm1pbihhWzFdLCBiWzFdKTtcbiAgb3V0WzJdID0gTWF0aC5taW4oYVsyXSwgYlsyXSk7XG4gIG91dFszXSA9IE1hdGgubWluKGFbM10sIGJbM10pO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFJldHVybnMgdGhlIG1heGltdW0gb2YgdHdvIHZlYzQnc1xyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHJldHVybnMge3ZlYzR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG1heChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gTWF0aC5tYXgoYVswXSwgYlswXSk7XG4gIG91dFsxXSA9IE1hdGgubWF4KGFbMV0sIGJbMV0pO1xuICBvdXRbMl0gPSBNYXRoLm1heChhWzJdLCBiWzJdKTtcbiAgb3V0WzNdID0gTWF0aC5tYXgoYVszXSwgYlszXSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogTWF0aC5yb3VuZCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzRcclxuICpcclxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdmVjdG9yIHRvIHJvdW5kXHJcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByb3VuZChvdXQsIGEpIHtcbiAgb3V0WzBdID0gTWF0aC5yb3VuZChhWzBdKTtcbiAgb3V0WzFdID0gTWF0aC5yb3VuZChhWzFdKTtcbiAgb3V0WzJdID0gTWF0aC5yb3VuZChhWzJdKTtcbiAgb3V0WzNdID0gTWF0aC5yb3VuZChhWzNdKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBTY2FsZXMgYSB2ZWM0IGJ5IGEgc2NhbGFyIG51bWJlclxyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgdmVjdG9yIHRvIHNjYWxlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgdmVjdG9yIGJ5XHJcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzY2FsZShvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAqIGI7XG4gIG91dFsxXSA9IGFbMV0gKiBiO1xuICBvdXRbMl0gPSBhWzJdICogYjtcbiAgb3V0WzNdID0gYVszXSAqIGI7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQWRkcyB0d28gdmVjNCdzIGFmdGVyIHNjYWxpbmcgdGhlIHNlY29uZCBvcGVyYW5kIGJ5IGEgc2NhbGFyIHZhbHVlXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGUgdGhlIGFtb3VudCB0byBzY2FsZSBiIGJ5IGJlZm9yZSBhZGRpbmdcclxuICogQHJldHVybnMge3ZlYzR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlQW5kQWRkKG91dCwgYSwgYiwgc2NhbGUpIHtcbiAgb3V0WzBdID0gYVswXSArIGJbMF0gKiBzY2FsZTtcbiAgb3V0WzFdID0gYVsxXSArIGJbMV0gKiBzY2FsZTtcbiAgb3V0WzJdID0gYVsyXSArIGJbMl0gKiBzY2FsZTtcbiAgb3V0WzNdID0gYVszXSArIGJbM10gKiBzY2FsZTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjNCdzXHJcbiAqXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkaXN0YW5jZShhLCBiKSB7XG4gIHZhciB4ID0gYlswXSAtIGFbMF07XG4gIHZhciB5ID0gYlsxXSAtIGFbMV07XG4gIHZhciB6ID0gYlsyXSAtIGFbMl07XG4gIHZhciB3ID0gYlszXSAtIGFbM107XG4gIHJldHVybiBNYXRoLmh5cG90KHgsIHksIHosIHcpO1xufVxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzQnc1xyXG4gKlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzcXVhcmVkRGlzdGFuY2UoYSwgYikge1xuICB2YXIgeCA9IGJbMF0gLSBhWzBdO1xuICB2YXIgeSA9IGJbMV0gLSBhWzFdO1xuICB2YXIgeiA9IGJbMl0gLSBhWzJdO1xuICB2YXIgdyA9IGJbM10gLSBhWzNdO1xuICByZXR1cm4geCAqIHggKyB5ICogeSArIHogKiB6ICsgdyAqIHc7XG59XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIGEgdmVjNFxyXG4gKlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIGxlbmd0aCBvZlxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBsZW5ndGggb2YgYVxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGxlbmd0aChhKSB7XG4gIHZhciB4ID0gYVswXTtcbiAgdmFyIHkgPSBhWzFdO1xuICB2YXIgeiA9IGFbMl07XG4gIHZhciB3ID0gYVszXTtcbiAgcmV0dXJuIE1hdGguaHlwb3QoeCwgeSwgeiwgdyk7XG59XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgYSB2ZWM0XHJcbiAqXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHZlY3RvciB0byBjYWxjdWxhdGUgc3F1YXJlZCBsZW5ndGggb2ZcclxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBsZW5ndGggb2YgYVxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNxdWFyZWRMZW5ndGgoYSkge1xuICB2YXIgeCA9IGFbMF07XG4gIHZhciB5ID0gYVsxXTtcbiAgdmFyIHogPSBhWzJdO1xuICB2YXIgdyA9IGFbM107XG4gIHJldHVybiB4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogdztcbn1cbi8qKlxyXG4gKiBOZWdhdGVzIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjNFxyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB2ZWN0b3IgdG8gbmVnYXRlXHJcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBuZWdhdGUob3V0LCBhKSB7XG4gIG91dFswXSA9IC1hWzBdO1xuICBvdXRbMV0gPSAtYVsxXTtcbiAgb3V0WzJdID0gLWFbMl07XG4gIG91dFszXSA9IC1hWzNdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGludmVyc2Ugb2YgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWM0XHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHZlY3RvciB0byBpbnZlcnRcclxuICogQHJldHVybnMge3ZlYzR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGludmVyc2Uob3V0LCBhKSB7XG4gIG91dFswXSA9IDEuMCAvIGFbMF07XG4gIG91dFsxXSA9IDEuMCAvIGFbMV07XG4gIG91dFsyXSA9IDEuMCAvIGFbMl07XG4gIG91dFszXSA9IDEuMCAvIGFbM107XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogTm9ybWFsaXplIGEgdmVjNFxyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB2ZWN0b3IgdG8gbm9ybWFsaXplXHJcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemUob3V0LCBhKSB7XG4gIHZhciB4ID0gYVswXTtcbiAgdmFyIHkgPSBhWzFdO1xuICB2YXIgeiA9IGFbMl07XG4gIHZhciB3ID0gYVszXTtcbiAgdmFyIGxlbiA9IHggKiB4ICsgeSAqIHkgKyB6ICogeiArIHcgKiB3O1xuXG4gIGlmIChsZW4gPiAwKSB7XG4gICAgbGVuID0gMSAvIE1hdGguc3FydChsZW4pO1xuICB9XG5cbiAgb3V0WzBdID0geCAqIGxlbjtcbiAgb3V0WzFdID0geSAqIGxlbjtcbiAgb3V0WzJdID0geiAqIGxlbjtcbiAgb3V0WzNdID0gdyAqIGxlbjtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0d28gdmVjNCdzXHJcbiAqXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkb3QgcHJvZHVjdCBvZiBhIGFuZCBiXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZG90KGEsIGIpIHtcbiAgcmV0dXJuIGFbMF0gKiBiWzBdICsgYVsxXSAqIGJbMV0gKyBhWzJdICogYlsyXSArIGFbM10gKiBiWzNdO1xufVxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGNyb3NzLXByb2R1Y3Qgb2YgdGhyZWUgdmVjdG9ycyBpbiBhIDQtZGltZW5zaW9uYWwgc3BhY2VcclxuICpcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IHJlc3VsdCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gVSB0aGUgZmlyc3QgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBWIHRoZSBzZWNvbmQgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBXIHRoZSB0aGlyZCB2ZWN0b3JcclxuICogQHJldHVybnMge3ZlYzR9IHJlc3VsdFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNyb3NzKG91dCwgdSwgdiwgdykge1xuICB2YXIgQSA9IHZbMF0gKiB3WzFdIC0gdlsxXSAqIHdbMF0sXG4gICAgICBCID0gdlswXSAqIHdbMl0gLSB2WzJdICogd1swXSxcbiAgICAgIEMgPSB2WzBdICogd1szXSAtIHZbM10gKiB3WzBdLFxuICAgICAgRCA9IHZbMV0gKiB3WzJdIC0gdlsyXSAqIHdbMV0sXG4gICAgICBFID0gdlsxXSAqIHdbM10gLSB2WzNdICogd1sxXSxcbiAgICAgIEYgPSB2WzJdICogd1szXSAtIHZbM10gKiB3WzJdO1xuICB2YXIgRyA9IHVbMF07XG4gIHZhciBIID0gdVsxXTtcbiAgdmFyIEkgPSB1WzJdO1xuICB2YXIgSiA9IHVbM107XG4gIG91dFswXSA9IEggKiBGIC0gSSAqIEUgKyBKICogRDtcbiAgb3V0WzFdID0gLShHICogRikgKyBJICogQyAtIEogKiBCO1xuICBvdXRbMl0gPSBHICogRSAtIEggKiBDICsgSiAqIEE7XG4gIG91dFszXSA9IC0oRyAqIEQpICsgSCAqIEIgLSBJICogQTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBQZXJmb3JtcyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHZlYzQnc1xyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQsIGluIHRoZSByYW5nZSBbMC0xXSwgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xyXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbGVycChvdXQsIGEsIGIsIHQpIHtcbiAgdmFyIGF4ID0gYVswXTtcbiAgdmFyIGF5ID0gYVsxXTtcbiAgdmFyIGF6ID0gYVsyXTtcbiAgdmFyIGF3ID0gYVszXTtcbiAgb3V0WzBdID0gYXggKyB0ICogKGJbMF0gLSBheCk7XG4gIG91dFsxXSA9IGF5ICsgdCAqIChiWzFdIC0gYXkpO1xuICBvdXRbMl0gPSBheiArIHQgKiAoYlsyXSAtIGF6KTtcbiAgb3V0WzNdID0gYXcgKyB0ICogKGJbM10gLSBhdyk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogR2VuZXJhdGVzIGEgcmFuZG9tIHZlY3RvciB3aXRoIHRoZSBnaXZlbiBzY2FsZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge051bWJlcn0gW3NjYWxlXSBMZW5ndGggb2YgdGhlIHJlc3VsdGluZyB2ZWN0b3IuIElmIG9tbWl0dGVkLCBhIHVuaXQgdmVjdG9yIHdpbGwgYmUgcmV0dXJuZWRcclxuICogQHJldHVybnMge3ZlYzR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbShvdXQsIHNjYWxlKSB7XG4gIHNjYWxlID0gc2NhbGUgfHwgMS4wOyAvLyBNYXJzYWdsaWEsIEdlb3JnZS4gQ2hvb3NpbmcgYSBQb2ludCBmcm9tIHRoZSBTdXJmYWNlIG9mIGFcbiAgLy8gU3BoZXJlLiBBbm4uIE1hdGguIFN0YXRpc3QuIDQzICgxOTcyKSwgbm8uIDIsIDY0NS0tNjQ2LlxuICAvLyBodHRwOi8vcHJvamVjdGV1Y2xpZC5vcmcvZXVjbGlkLmFvbXMvMTE3NzY5MjY0NDtcblxuICB2YXIgdjEsIHYyLCB2MywgdjQ7XG4gIHZhciBzMSwgczI7XG5cbiAgZG8ge1xuICAgIHYxID0gZ2xNYXRyaXguUkFORE9NKCkgKiAyIC0gMTtcbiAgICB2MiA9IGdsTWF0cml4LlJBTkRPTSgpICogMiAtIDE7XG4gICAgczEgPSB2MSAqIHYxICsgdjIgKiB2MjtcbiAgfSB3aGlsZSAoczEgPj0gMSk7XG5cbiAgZG8ge1xuICAgIHYzID0gZ2xNYXRyaXguUkFORE9NKCkgKiAyIC0gMTtcbiAgICB2NCA9IGdsTWF0cml4LlJBTkRPTSgpICogMiAtIDE7XG4gICAgczIgPSB2MyAqIHYzICsgdjQgKiB2NDtcbiAgfSB3aGlsZSAoczIgPj0gMSk7XG5cbiAgdmFyIGQgPSBNYXRoLnNxcnQoKDEgLSBzMSkgLyBzMik7XG4gIG91dFswXSA9IHNjYWxlICogdjE7XG4gIG91dFsxXSA9IHNjYWxlICogdjI7XG4gIG91dFsyXSA9IHNjYWxlICogdjMgKiBkO1xuICBvdXRbM10gPSBzY2FsZSAqIHY0ICogZDtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWM0IHdpdGggYSBtYXQ0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcclxuICogQHJldHVybnMge3ZlYzR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybU1hdDQob3V0LCBhLCBtKSB7XG4gIHZhciB4ID0gYVswXSxcbiAgICAgIHkgPSBhWzFdLFxuICAgICAgeiA9IGFbMl0sXG4gICAgICB3ID0gYVszXTtcbiAgb3V0WzBdID0gbVswXSAqIHggKyBtWzRdICogeSArIG1bOF0gKiB6ICsgbVsxMl0gKiB3O1xuICBvdXRbMV0gPSBtWzFdICogeCArIG1bNV0gKiB5ICsgbVs5XSAqIHogKyBtWzEzXSAqIHc7XG4gIG91dFsyXSA9IG1bMl0gKiB4ICsgbVs2XSAqIHkgKyBtWzEwXSAqIHogKyBtWzE0XSAqIHc7XG4gIG91dFszXSA9IG1bM10gKiB4ICsgbVs3XSAqIHkgKyBtWzExXSAqIHogKyBtWzE1XSAqIHc7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogVHJhbnNmb3JtcyB0aGUgdmVjNCB3aXRoIGEgcXVhdFxyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gcSBxdWF0ZXJuaW9uIHRvIHRyYW5zZm9ybSB3aXRoXHJcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1RdWF0KG91dCwgYSwgcSkge1xuICB2YXIgeCA9IGFbMF0sXG4gICAgICB5ID0gYVsxXSxcbiAgICAgIHogPSBhWzJdO1xuICB2YXIgcXggPSBxWzBdLFxuICAgICAgcXkgPSBxWzFdLFxuICAgICAgcXogPSBxWzJdLFxuICAgICAgcXcgPSBxWzNdOyAvLyBjYWxjdWxhdGUgcXVhdCAqIHZlY1xuXG4gIHZhciBpeCA9IHF3ICogeCArIHF5ICogeiAtIHF6ICogeTtcbiAgdmFyIGl5ID0gcXcgKiB5ICsgcXogKiB4IC0gcXggKiB6O1xuICB2YXIgaXogPSBxdyAqIHogKyBxeCAqIHkgLSBxeSAqIHg7XG4gIHZhciBpdyA9IC1xeCAqIHggLSBxeSAqIHkgLSBxeiAqIHo7IC8vIGNhbGN1bGF0ZSByZXN1bHQgKiBpbnZlcnNlIHF1YXRcblxuICBvdXRbMF0gPSBpeCAqIHF3ICsgaXcgKiAtcXggKyBpeSAqIC1xeiAtIGl6ICogLXF5O1xuICBvdXRbMV0gPSBpeSAqIHF3ICsgaXcgKiAtcXkgKyBpeiAqIC1xeCAtIGl4ICogLXF6O1xuICBvdXRbMl0gPSBpeiAqIHF3ICsgaXcgKiAtcXogKyBpeCAqIC1xeSAtIGl5ICogLXF4O1xuICBvdXRbM10gPSBhWzNdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzQgdG8gemVyb1xyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gemVybyhvdXQpIHtcbiAgb3V0WzBdID0gMC4wO1xuICBvdXRbMV0gPSAwLjA7XG4gIG91dFsyXSA9IDAuMDtcbiAgb3V0WzNdID0gMC4wO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSB2ZWN0b3JcclxuICpcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdmVjdG9yIHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cihhKSB7XG4gIHJldHVybiBcInZlYzQoXCIgKyBhWzBdICsgXCIsIFwiICsgYVsxXSArIFwiLCBcIiArIGFbMl0gKyBcIiwgXCIgKyBhWzNdICsgXCIpXCI7XG59XG4vKipcclxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgdmVjdG9ycyBoYXZlIGV4YWN0bHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24gKHdoZW4gY29tcGFyZWQgd2l0aCA9PT0pXHJcbiAqXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIFRoZSBmaXJzdCB2ZWN0b3IuXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIFRoZSBzZWNvbmQgdmVjdG9yLlxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmVjdG9ycyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBleGFjdEVxdWFscyhhLCBiKSB7XG4gIHJldHVybiBhWzBdID09PSBiWzBdICYmIGFbMV0gPT09IGJbMV0gJiYgYVsyXSA9PT0gYlsyXSAmJiBhWzNdID09PSBiWzNdO1xufVxuLyoqXHJcbiAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHZlY3RvcnMgaGF2ZSBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSBUaGUgZmlyc3QgdmVjdG9yLlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiBUaGUgc2Vjb25kIHZlY3Rvci5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxzKGEsIGIpIHtcbiAgdmFyIGEwID0gYVswXSxcbiAgICAgIGExID0gYVsxXSxcbiAgICAgIGEyID0gYVsyXSxcbiAgICAgIGEzID0gYVszXTtcbiAgdmFyIGIwID0gYlswXSxcbiAgICAgIGIxID0gYlsxXSxcbiAgICAgIGIyID0gYlsyXSxcbiAgICAgIGIzID0gYlszXTtcbiAgcmV0dXJuIE1hdGguYWJzKGEwIC0gYjApIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEwKSwgTWF0aC5hYnMoYjApKSAmJiBNYXRoLmFicyhhMSAtIGIxKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMSksIE1hdGguYWJzKGIxKSkgJiYgTWF0aC5hYnMoYTIgLSBiMikgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTIpLCBNYXRoLmFicyhiMikpICYmIE1hdGguYWJzKGEzIC0gYjMpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEzKSwgTWF0aC5hYnMoYjMpKTtcbn1cbi8qKlxyXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQuc3VidHJhY3R9XHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cblxuZXhwb3J0IHZhciBzdWIgPSBzdWJ0cmFjdDtcbi8qKlxyXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQubXVsdGlwbHl9XHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cblxuZXhwb3J0IHZhciBtdWwgPSBtdWx0aXBseTtcbi8qKlxyXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQuZGl2aWRlfVxyXG4gKiBAZnVuY3Rpb25cclxuICovXG5cbmV4cG9ydCB2YXIgZGl2ID0gZGl2aWRlO1xuLyoqXHJcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5kaXN0YW5jZX1cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xuXG5leHBvcnQgdmFyIGRpc3QgPSBkaXN0YW5jZTtcbi8qKlxyXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQuc3F1YXJlZERpc3RhbmNlfVxyXG4gKiBAZnVuY3Rpb25cclxuICovXG5cbmV4cG9ydCB2YXIgc3FyRGlzdCA9IHNxdWFyZWREaXN0YW5jZTtcbi8qKlxyXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQubGVuZ3RofVxyXG4gKiBAZnVuY3Rpb25cclxuICovXG5cbmV4cG9ydCB2YXIgbGVuID0gbGVuZ3RoO1xuLyoqXHJcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5zcXVhcmVkTGVuZ3RofVxyXG4gKiBAZnVuY3Rpb25cclxuICovXG5cbmV4cG9ydCB2YXIgc3FyTGVuID0gc3F1YXJlZExlbmd0aDtcbi8qKlxyXG4gKiBQZXJmb3JtIHNvbWUgb3BlcmF0aW9uIG92ZXIgYW4gYXJyYXkgb2YgdmVjNHMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGEgdGhlIGFycmF5IG9mIHZlY3RvcnMgdG8gaXRlcmF0ZSBvdmVyXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdHJpZGUgTnVtYmVyIG9mIGVsZW1lbnRzIGJldHdlZW4gdGhlIHN0YXJ0IG9mIGVhY2ggdmVjNC4gSWYgMCBhc3N1bWVzIHRpZ2h0bHkgcGFja2VkXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBvZmZzZXQgTnVtYmVyIG9mIGVsZW1lbnRzIHRvIHNraXAgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgYXJyYXlcclxuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50IE51bWJlciBvZiB2ZWM0cyB0byBpdGVyYXRlIG92ZXIuIElmIDAgaXRlcmF0ZXMgb3ZlciBlbnRpcmUgYXJyYXlcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCB2ZWN0b3IgaW4gdGhlIGFycmF5XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbYXJnXSBhZGRpdGlvbmFsIGFyZ3VtZW50IHRvIHBhc3MgdG8gZm5cclxuICogQHJldHVybnMge0FycmF5fSBhXHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cblxuZXhwb3J0IHZhciBmb3JFYWNoID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdmVjID0gY3JlYXRlKCk7XG4gIHJldHVybiBmdW5jdGlvbiAoYSwgc3RyaWRlLCBvZmZzZXQsIGNvdW50LCBmbiwgYXJnKSB7XG4gICAgdmFyIGksIGw7XG5cbiAgICBpZiAoIXN0cmlkZSkge1xuICAgICAgc3RyaWRlID0gNDtcbiAgICB9XG5cbiAgICBpZiAoIW9mZnNldCkge1xuICAgICAgb2Zmc2V0ID0gMDtcbiAgICB9XG5cbiAgICBpZiAoY291bnQpIHtcbiAgICAgIGwgPSBNYXRoLm1pbihjb3VudCAqIHN0cmlkZSArIG9mZnNldCwgYS5sZW5ndGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsID0gYS5sZW5ndGg7XG4gICAgfVxuXG4gICAgZm9yIChpID0gb2Zmc2V0OyBpIDwgbDsgaSArPSBzdHJpZGUpIHtcbiAgICAgIHZlY1swXSA9IGFbaV07XG4gICAgICB2ZWNbMV0gPSBhW2kgKyAxXTtcbiAgICAgIHZlY1syXSA9IGFbaSArIDJdO1xuICAgICAgdmVjWzNdID0gYVtpICsgM107XG4gICAgICBmbih2ZWMsIHZlYywgYXJnKTtcbiAgICAgIGFbaV0gPSB2ZWNbMF07XG4gICAgICBhW2kgKyAxXSA9IHZlY1sxXTtcbiAgICAgIGFbaSArIDJdID0gdmVjWzJdO1xuICAgICAgYVtpICsgM10gPSB2ZWNbM107XG4gICAgfVxuXG4gICAgcmV0dXJuIGE7XG4gIH07XG59KCk7IiwiaW1wb3J0IHsgY3JlYXRlU3RhdGUgfSBmcm9tICcuL3N0YXRlJztcbmV4cG9ydCBjb25zdCByZWdpc3RlckNvbXBvbmVudCA9IChjb21wb25lbnRzLCBjb21wb25lbnROYW1lKSA9PiAoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBjb21wb25lbnRzKSwgeyBbY29tcG9uZW50TmFtZV06IG5ldyBNYXAoKSB9KSk7XG5leHBvcnQgY29uc3QgbmV3RW50aXR5ID0gKGVudGl0aWVzLCBlbnRpdHlJZCkgPT4ge1xuICAgIGVudGl0aWVzLnNldChlbnRpdHlJZCwgW10pO1xuICAgIHJldHVybiBlbnRpdGllcztcbn07XG5leHBvcnQgY29uc3QgYWRkQ29tcG9uZW50ID0gKHN0YXRlLCBlbnRpdHlJZCwgc3RvcmFnZSwgY29tcG9uZW50KSA9PiB7XG4gICAgY29uc3QgZW50aXRpZXMgPSBzdGF0ZS5lbnRpdGllcztcbiAgICBjb25zdCBjb21wb25lbnRzID0gc3RhdGUuY29tcG9uZW50cztcbiAgICBjb25zdCBjb21wb25lbnRTdG9yYWdlID0gY29tcG9uZW50c1tzdG9yYWdlXTtcbiAgICBjb25zdCBlbnRpdHkgPSBlbnRpdGllcy5nZXQoZW50aXR5SWQpO1xuICAgIGlmICghZW50aXR5KVxuICAgICAgICB0aHJvdyBFcnJvcihcIkFkZCBDb21wb25lbnQ6IEVudGl0eSBkb2VzIG5vdCBleGlzdCFcIik7XG4gICAgaWYgKCFjb21wb25lbnRTdG9yYWdlKVxuICAgICAgICB0aHJvdyBFcnJvcihcIkFkZCBDb21wb25lbnQ6IE5vIHJlZ2lzdGVyZWQgY29tcG9uZW50IHN0b3JhZ2UhXCIpO1xuICAgIGNvbXBvbmVudHNbc3RvcmFnZV0uc2V0KGVudGl0eUlkLCBjb21wb25lbnQpO1xuICAgIGVudGl0aWVzLnNldChlbnRpdHlJZCwgWy4uLmVudGl0eSwgc3RvcmFnZV0pO1xuICAgIHN0YXRlLmVudGl0aWVzID0gZW50aXRpZXM7XG4gICAgc3RhdGUuY29tcG9uZW50cyA9IGNvbXBvbmVudHM7XG4gICAgcmV0dXJuIHN0YXRlO1xufTtcbmV4cG9ydCBjb25zdCByZW1vdmVDb21wb25lbnQgPSAoc3RhdGUsIGVudGl0eUlkLCBzdG9yYWdlKSA9PiB7XG4gICAgY29uc3QgZW50aXRpZXMgPSBzdGF0ZS5lbnRpdGllcztcbiAgICBjb25zdCBjb21wb25lbnRzID0gc3RhdGUuY29tcG9uZW50cztcbiAgICBjb25zdCBjb21wb25lbnRTdG9yYWdlID0gY29tcG9uZW50c1tzdG9yYWdlXTtcbiAgICBjb25zdCBlbnRpdHkgPSBlbnRpdGllcy5nZXQoZW50aXR5SWQpO1xuICAgIGlmICghZW50aXR5KVxuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgLy90aHJvdyBFcnJvcihcIlJlbW92ZSBDb21wb25lbnQ6IEVudGl0eSBkb2VzIG5vdCBleGlzdCFcIik7XG4gICAgaWYgKCFjb21wb25lbnRTdG9yYWdlKVxuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgLy8gdGhyb3cgRXJyb3IoXCJSZW1vdmUgQ29tcG9uZW50OiBObyByZWdpc3RlcmVkIGNvbXBvbmVudCBzdG9yYWdlIVwiKTtcbiAgICBjb21wb25lbnRzW3N0b3JhZ2VdLmRlbGV0ZShlbnRpdHlJZCk7XG4gICAgY29uc3QgZWRnZXMgPSBlbnRpdHkuZmlsdGVyKHYgPT4gdiAhPT0gc3RvcmFnZSk7XG4gICAgZW50aXRpZXMuc2V0KGVudGl0eUlkLCBlZGdlcyk7XG4gICAgc3RhdGUuZW50aXRpZXMgPSBlbnRpdGllcztcbiAgICBzdGF0ZS5jb21wb25lbnRzID0gY29tcG9uZW50cztcbiAgICByZXR1cm4gc3RhdGU7XG59O1xuZXhwb3J0IGNvbnN0IHJlbW92ZUVudGl0eSA9IChzdGF0ZSwgZW50aXR5SWQpID0+IHtcbiAgICBjb25zdCBlbnRpdGllcyA9IHN0YXRlLmVudGl0aWVzO1xuICAgIGNvbnN0IGNvbXBvbmVudHMgPSBzdGF0ZS5jb21wb25lbnRzO1xuICAgIGNvbnN0IGVudGl0eSA9IGVudGl0aWVzLmdldChlbnRpdHlJZCk7XG4gICAgaWYgKCFlbnRpdHkpXG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICBjb25zdCBjb21wb25lbnRMaXN0ID0gWy4uLmVudGl0eV07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21wb25lbnRMaXN0Lmxlbmd0aDsgaSsrKVxuICAgICAgICBzdGF0ZSA9IHJlbW92ZUNvbXBvbmVudChzdGF0ZSwgZW50aXR5SWQsIGNvbXBvbmVudExpc3RbaV0pO1xuICAgIGVudGl0aWVzLmRlbGV0ZShlbnRpdHlJZCk7XG4gICAgc3RhdGUuZW50aXRpZXMgPSBlbnRpdGllcztcbiAgICBzdGF0ZS5jb21wb25lbnRzID0gY29tcG9uZW50cztcbiAgICByZXR1cm4gc3RhdGU7XG59O1xuO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUVDU3RhdGUgPSAoZ2wpID0+IHtcbiAgICBjb25zdCBzdGF0ZSA9IGNyZWF0ZVN0YXRlKGdsKTtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSksIHsgZW50aXRpZXM6IG5ldyBNYXAoKSwgY29tcG9uZW50czoge30gfSk7XG59O1xuIiwiaW1wb3J0IHsgVmVjdG9yMywgTWF0cml4NCB9IGZyb20gJ0BtYXRoLmdsL2NvcmUnO1xuaW1wb3J0IHsgcmFkaWFucywgbXVsdGlwbHlBbmREZXN0cnVjdFZlY3RvcjMsIGZ1bmN0aW9uYWxDcm9zc1ZlY3RvcjMgfSBmcm9tICcuLi9saWIvbWF0aCc7XG5leHBvcnQgY29uc3QgcHJvamVjdGlvbk1hdHJpeCA9ICh3LCBoKSA9PiAobmV3IE1hdHJpeDQoKS5wZXJzcGVjdGl2ZSh7XG4gICAgZm92OiA3MCxcbiAgICBmb3Z5OiAoTWF0aC5QSSAqIDcwKSAvIDE4MCxcbiAgICBhc3BlY3Q6IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LFxuICAgIG5lYXI6IDAuMSxcbiAgICBmYXI6IDEwMDAuMFxufSkpO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUNhbWVyYSA9IChnbCkgPT4ge1xuICAgIGNvbnN0IGNhbWVyYSA9IHtcbiAgICAgICAgcHJvamVjdGlvbjogcHJvamVjdGlvbk1hdHJpeCh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KSxcbiAgICAgICAgdmlldzogbmV3IE1hdHJpeDQoKS5pZGVudGl0eSgpLFxuICAgICAgICBwb3NpdGlvbjogbmV3IFZlY3RvcjMoMCwgMCwgMSksXG4gICAgICAgIGRpcmVjdGlvbjogbmV3IFZlY3RvcjMoMCwgMCwgLTEpLFxuICAgICAgICBzcGVlZDogMTAsXG4gICAgICAgIHBpdGNoOiAwLFxuICAgICAgICB5YXc6IC05MC4wLFxuICAgICAgICAvLyBhdGxhczogbG9hZFRleHR1cmUoZ2wsIGF0bGFzVXJsKSxcbiAgICAgICAgLy8gYWN0aXZlSW5wdXQ6IG5ldyBTZXQ8c3RyaW5nPigpXG4gICAgfTtcbiAgICAvLyB1cGRhdGVDYW1lcmEocGxheWVyKTtcbiAgICB3aW5kb3cub25yZXNpemUgPSBvblJlc2l6ZShnbCwgY2FtZXJhKTtcbiAgICByZXR1cm4gY2FtZXJhO1xufTtcbmNvbnN0IG9uUmVzaXplID0gKGdsLCBjYW1lcmEpID0+ICgpID0+IHtcbiAgICBjb25zdCB3ID0gd2luZG93LmlubmVyV2lkdGgsIGggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgZ2wuY2FudmFzLndpZHRoID0gdztcbiAgICBnbC5jYW52YXMuaGVpZ2h0ID0gaDtcbiAgICBnbC52aWV3cG9ydCgwLCAwLCB3LCBoKTtcbiAgICBjYW1lcmEucHJvamVjdGlvbiA9IHByb2plY3Rpb25NYXRyaXgodywgaCk7XG59O1xuZXhwb3J0IGNvbnN0IHJlY2FsY3VsYXRlVmlldyA9IChjYW1lcmEpID0+IHtcbiAgICBjb25zdCBwb3MgPSBjYW1lcmEucG9zaXRpb247XG4gICAgY29uc3QgZGlyID0gY2FtZXJhLmRpcmVjdGlvbjtcbiAgICBjb25zdCBwaXRjaCA9IHJhZGlhbnMoY2FtZXJhLnBpdGNoKTtcbiAgICBjb25zdCB5YXcgPSByYWRpYW5zKGNhbWVyYS55YXcpO1xuICAgIGRpci54ID0gTWF0aC5jb3MoeWF3KSAqIE1hdGguY29zKHBpdGNoKTtcbiAgICBkaXIueSA9IE1hdGguc2luKHBpdGNoKTtcbiAgICBkaXIueiA9IE1hdGguc2luKHlhdykgKiBNYXRoLmNvcyhwaXRjaCk7XG4gICAgY2FtZXJhLnZpZXcubG9va0F0KFtwb3MueCwgcG9zLnksIHBvcy56XSwgW3Bvcy54ICsgZGlyLngsIHBvcy55ICsgZGlyLnksIHBvcy56ICsgZGlyLnpdLCBbMCwgMS4wLCAwXSk7XG4gICAgcmV0dXJuIGNhbWVyYTtcbn07XG4vKlxuY29uc3QgcmF5VHJhY2UgPSAoZW50aXRpZXM6IEVudGl0eVtdLCBjb21wb25lbnRzOiBDb21wb25lbnRzLCBwbGF5ZXI6IFBsYXllcikgPT4gKHN0ZXBWYWx1ZTogbnVtYmVyLCBudW1TdGVwczogbnVtYmVyKSA9PiAob25IaXQ6IChwb3M6IFZlY3RvcjMpID0+IHZvaWQpID0+IHtcblxuICBjb25zdCBzdGVwID0gbXVsdGlwbHlBbmREZXN0cnVjdFZlY3RvcjMocGxheWVyLmRpcmVjdGlvbiwgc3RlcFZhbHVlKTtcbiAgY29uc3QgcmF5ID0gbmV3IFZlY3RvcjMocGxheWVyLnBvc2l0aW9uLngsIHBsYXllci5wb3NpdGlvbi55LCBwbGF5ZXIucG9zaXRpb24ueik7XG5cbiAgZm9yKGxldCBpID0gMDsgaSA8IG51bVN0ZXBzOyBpKyspIHtcbiAgICBcbiAgICBpZihnZXRCbG9jayhlbnRpdGllcywgY29tcG9uZW50cykocmF5KSAhPSAwKSB7XG4gICAgICBvbkhpdChyYXkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJheS54ID0gcmF5LnggKyBzdGVwWzBdO1xuICAgIHJheS55ID0gcmF5LnkgKyBzdGVwWzFdO1xuICAgIHJheS56ID0gcmF5LnogKyBzdGVwWzJdO1xuICB9XG5cbn07XG4qL1xuZXhwb3J0IGNvbnN0IGZyZWVDYW1lcmFJbnB1dCA9IChjYW1lcmEsIHN0YXRlLCBkZWx0YSkgPT4ge1xuICAgIGNvbnN0IGFjdGl2ZUlucHV0ID0gc3RhdGUuYWN0aXZlSW5wdXQ7XG4gICAgY29uc3QgbW91c2VNb3ZlbWVudCA9IHN0YXRlLm1vdXNlTW92ZW1lbnQ7XG4gICAgY29uc3QgbG9jayA9IHN0YXRlLmxvY2s7XG4gICAgaWYgKCFsb2NrKVxuICAgICAgICByZXR1cm4gY2FtZXJhO1xuICAgIGxldCBzcGVlZCA9IGNhbWVyYS5zcGVlZDtcbiAgICBjb25zdCB1cCA9IG5ldyBWZWN0b3IzKDAsIDEsIDApO1xuICAgIGNvbnN0IG1vdmUgPSBtdWx0aXBseUFuZERlc3RydWN0VmVjdG9yMyhjYW1lcmEuZGlyZWN0aW9uLCBzcGVlZCAqIGRlbHRhKTtcbiAgICBjb25zdCBzdHJhZmUgPSBtdWx0aXBseUFuZERlc3RydWN0VmVjdG9yMyhmdW5jdGlvbmFsQ3Jvc3NWZWN0b3IzKGNhbWVyYS5kaXJlY3Rpb24sIHVwKSwgc3BlZWQgKiBkZWx0YSk7XG4gICAgaWYgKGFjdGl2ZUlucHV0LmhhcyhcIndcIikpXG4gICAgICAgIGNhbWVyYS5wb3NpdGlvbi5hZGQobW92ZSk7XG4gICAgaWYgKGFjdGl2ZUlucHV0LmhhcyhcInNcIikpXG4gICAgICAgIGNhbWVyYS5wb3NpdGlvbi5zdWJ0cmFjdChtb3ZlKTtcbiAgICBpZiAoYWN0aXZlSW5wdXQuaGFzKFwiYVwiKSlcbiAgICAgICAgY2FtZXJhLnBvc2l0aW9uLnN1YnRyYWN0KHN0cmFmZSk7XG4gICAgaWYgKGFjdGl2ZUlucHV0LmhhcyhcImRcIikpXG4gICAgICAgIGNhbWVyYS5wb3NpdGlvbi5hZGQoc3RyYWZlKTtcbiAgICBpZiAoYWN0aXZlSW5wdXQuaGFzKFwiIFwiKSlcbiAgICAgICAgY2FtZXJhLnBvc2l0aW9uLmFkZChtdWx0aXBseUFuZERlc3RydWN0VmVjdG9yMyh1cCwgZGVsdGEgKiBzcGVlZCkpO1xuICAgIGlmIChhY3RpdmVJbnB1dC5oYXMoXCJzaGlmdFwiKSlcbiAgICAgICAgY2FtZXJhLnBvc2l0aW9uLnN1YnRyYWN0KG11bHRpcGx5QW5kRGVzdHJ1Y3RWZWN0b3IzKHVwLCBkZWx0YSAqIHNwZWVkKSk7XG4gICAgY2FtZXJhLnlhdyArPSBtb3VzZU1vdmVtZW50WzBdO1xuICAgIGNhbWVyYS5waXRjaCAtPSBtb3VzZU1vdmVtZW50WzFdO1xuICAgIGlmIChjYW1lcmEucGl0Y2ggPiA4OS4wKVxuICAgICAgICBjYW1lcmEucGl0Y2ggPSA4OS4wO1xuICAgIGlmIChjYW1lcmEucGl0Y2ggPCAtODkuMClcbiAgICAgICAgY2FtZXJhLnBpdGNoID0gLTg5LjA7XG4gICAgcmV0dXJuIHJlY2FsY3VsYXRlVmlldyhjYW1lcmEpO1xuICAgIC8qXG4gICAgZG9jdW1lbnQub25jbGljayA9IChlKSA9PiB7XG4gIFxuICAgICAgcmF5VHJhY2UoZW50aXRpZXMsIGNvbXBvbmVudHMsIHBsYXllcikoMC4wNSwgMTAwKSgocG9zOiBWZWN0b3IzKSA9PiB7XG4gICAgICAgIHNldEJsb2NrKGVudGl0aWVzLCBjb21wb25lbnRzKShwb3MsIDApO1xuICAgICAgICB1cGRhdGVDaHVuayhnbCwgZW50aXRpZXMsIGNvbXBvbmVudHMpKHBvcyk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgKi9cbn07XG4iLCIvLyBzb21laG93IG1ha2UgYSBwcm9maWxlciB0aGF0IGNhbiBnZXQgZWxhcHNlZCB0aW1lIG9yIGZwc1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVByb2ZpbGVyID0gKGRpc3BsYXlGUFMpID0+IHtcbiAgICBjb25zdCBwcm9maWxlciA9IHtcbiAgICAgICAgZGVsdGE6IDAsXG4gICAgICAgIGFjY1RpbWU6IDAsXG4gICAgICAgIGZyYW1lczogMCxcbiAgICB9O1xuICAgIGlmIChkaXNwbGF5RlBTKVxuICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBmcmFtZXMgcGVyIHRpbWUgZWxhcHNlZFxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocHJvZmlsZXIuZnJhbWVzIC8gcHJvZmlsZXIuYWNjVGltZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwcm9maWxlci5mcmFtZXMpOyAvLyBhY3R1YWwgbnVtYmVyIG9mIGZyYW1lcyBwZXIgc2Vjb25kXG4gICAgICAgICAgICBwcm9maWxlci5mcmFtZXMgPSAwO1xuICAgICAgICAgICAgcHJvZmlsZXIuYWNjVGltZSA9IDA7XG4gICAgICAgIH0sIDEwMDApO1xuICAgIHJldHVybiBwcm9maWxlcjtcbn07XG5leHBvcnQgY29uc3QgdXBkYXRlUHJvZmlsZXIgPSAocHJvZmlsZXIsIGRlbHRhKSA9PiB7XG4gICAgcHJvZmlsZXIuYWNjVGltZSA9IHByb2ZpbGVyLmFjY1RpbWUgKyBkZWx0YTtcbiAgICBwcm9maWxlci5mcmFtZXMgPSBwcm9maWxlci5mcmFtZXMgKyAxO1xuICAgIHByb2ZpbGVyLmRlbHRhID0gZGVsdGE7XG4gICAgcmV0dXJuIHByb2ZpbGVyO1xufTtcbmV4cG9ydCBjb25zdCBzdGFydCA9IChwcm9maWxlcikgPT4ge1xuICAgIHByb2ZpbGVyLmRlbHRhID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuICAgIHJldHVybiBwcm9maWxlcjtcbn07XG5leHBvcnQgY29uc3QgZW5kID0gKHByb2ZpbGVyKSA9PiB7XG4gICAgcHJvZmlsZXIuZGVsdGEgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCkgLSBwcm9maWxlci5kZWx0YTtcbiAgICByZXR1cm4gcHJvZmlsZXI7XG59O1xuIiwiO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVN0YXRlID0gKGdsKSA9PiB7XG4gICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgIHN5c3RlbXM6IG5ldyBNYXAoKSxcbiAgICAgICAgYWN0aXZlSW5wdXQ6IG5ldyBTZXQoKSxcbiAgICAgICAgbW91c2VNb3ZlbWVudDogWzAsIDBdLFxuICAgICAgICBxdWV1ZTogW10sXG4gICAgICAgIGxvY2s6IGZhbHNlLFxuICAgIH07XG4gICAgcmV0dXJuIHN0YXRlO1xufTtcbmV4cG9ydCBjb25zdCBhZGRTeXN0ZW0gPSAoc3RhdGUsIHR5cGUsIHN5c3RlbSkgPT4ge1xuICAgIGNvbnN0IHN5c3RlbXMgPSBzdGF0ZS5zeXN0ZW1zO1xuICAgIGNvbnN0IHN5c3RlbUNvbnRhaW5lciA9IHN5c3RlbXMuZ2V0KHR5cGUpO1xuICAgIGlmICghc3lzdGVtQ29udGFpbmVyKSB7XG4gICAgICAgIHN5c3RlbXMuc2V0KHR5cGUsIFtzeXN0ZW1dKTtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgICBzeXN0ZW1Db250YWluZXIgPT09IG51bGwgfHwgc3lzdGVtQ29udGFpbmVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzeXN0ZW1Db250YWluZXIucHVzaChzeXN0ZW0pO1xuICAgIHJldHVybiBzdGF0ZTtcbn07XG5leHBvcnQgY29uc3QgZGlzcGF0Y2ggPSAoZ2wsIHN0YXRlLCB0eXBlLCBkZWx0YSkgPT4gKGRhdGEpID0+IHtcbiAgICBjb25zdCBzeXN0ZW1zID0gc3RhdGUuc3lzdGVtcztcbiAgICBjb25zdCBzeXN0ZW0gPSBzeXN0ZW1zLmdldCh0eXBlKTtcbiAgICBpZiAoIXN5c3RlbSlcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIC8vdGhyb3cgRXJyb3IoXCJEaXNwYXRjaDogU3lzdGVtIG5vdCByZWdpc3RlcmVkXCIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3lzdGVtLmxlbmd0aDsgaSsrKVxuICAgICAgICBzdGF0ZSA9IHN5c3RlbVtpXShnbCwgc3RhdGUsIGRlbHRhKShkYXRhKTtcbiAgICByZXR1cm4gc3RhdGU7XG59O1xuLy8gbmVlZCB0byBjcmVhdGUgYWRkU3lzdGVtIGFuZCBzZXBlcmF0ZSBjb21wb25lbnRzL2VudGl0aWVzIGludG8gYW5vdGhlciBmaWxlXG4iLCJleHBvcnQgY29uc3QgY3JlYXRlV2luZG93ID0gKCkgPT4ge1xuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgY2FudmFzLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgY2FudmFzLnN0eWxlLm1hcmdpbiA9IFwiYXV0b1wiO1xuICAgIGNhbnZhcy5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBjYW52YXMucmVxdWVzdFBvaW50ZXJMb2NrKCk7XG4gICAgfTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG4gICAgY29uc3QgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dChcIndlYmdsMlwiKTtcbiAgICBpZiAoIWdsKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXZWJnbCBjb3VsZG4ndCBpbnN0YW5jaWF0ZVwiKTtcbiAgICAvLyBiYWJ5IGJsdWUgY2xlYXIgY29sb3IgZm9yIGEgYmFzaWMgc2t5Ym94XG4gICAgZ2wuY2xlYXJDb2xvcigwLjUzNywgMC44MTEsIDAuOTQxLCAxLjApO1xuICAgIGdsLmNsZWFyKGdsLkRFUFRIX0JVRkZFUl9CSVQgfCBnbC5DT0xPUl9CVUZGRVJfQklUKTtcbiAgICBnbC5lbmFibGUoZ2wuREVQVEhfVEVTVCk7XG4gICAgZ2wuZW5hYmxlKGdsLkNVTExfRkFDRSk7XG4gICAgZ2wuY3VsbEZhY2UoZ2wuQkFDSyk7XG4gICAgcmV0dXJuIGdsO1xufTtcbiIsImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICdAbWF0aC5nbC9jb3JlJztcbmltcG9ydCB7IG5ld0VudGl0eSwgYWRkQ29tcG9uZW50LCByZW1vdmVFbnRpdHkgfSBmcm9tICcuLi8uLi9lbmdpbmUvZWMnO1xuaW1wb3J0IHsgY3JlYXRlQ2h1bmtSZW5kZXJPYmplY3QsIG5haXZlTWVzaGluZyB9IGZyb20gJy4vbWVzaCc7XG5pbXBvcnQgeyBjcmVhdGVCbG9ja0RpY3Rpb25hcnkgfSBmcm9tICcuLi9pbmRleCc7XG5pbXBvcnQgeyBnZW5lcmF0ZVN0cnVjdHVyZSwgZ2VuZXJhdGVCbG9jayB9IGZyb20gJy4uL2dlbmVyYXRpb24nO1xuZXhwb3J0IGNvbnN0IENodW5rRmFjdG9yeSA9IChnbCkgPT4gKHtcbiAgICBjaHVua1NpemU6IDgsXG4gICAgbG9hZERpc3RhbmNlOiAzLFxuICAgIGJsb2NrRGljdGlvbmFyeTogY3JlYXRlQmxvY2tEaWN0aW9uYXJ5KCksXG59KTtcbmV4cG9ydCBjb25zdCBjaHVua0lkID0gKHBvcykgPT4gKGBjaHUtJHtwb3NbMF19LSR7cG9zWzFdfS0ke3Bvc1syXX1gKTtcbmV4cG9ydCBjb25zdCBjaHVua1Bvc0Zyb21CbG9ja1BvcyA9IChjaHVua0ZhY3RvcnksIHBvcykgPT4gKG5ldyBWZWN0b3IzKE1hdGguZmxvb3IocG9zWzBdIC8gY2h1bmtGYWN0b3J5LmNodW5rU2l6ZSksIE1hdGguZmxvb3IocG9zWzFdIC8gY2h1bmtGYWN0b3J5LmNodW5rU2l6ZSksIE1hdGguZmxvb3IocG9zWzJdIC8gY2h1bmtGYWN0b3J5LmNodW5rU2l6ZSkpKTtcbmV4cG9ydCBjb25zdCBsb2NhbEJsb2NrUG9zVG9JbmRleCA9IChjaHVua0ZhY3RvcnksIHgsIHksIHopID0+IHtcbiAgICBjb25zdCBjaHVua1NpemUgPSBjaHVua0ZhY3RvcnkuY2h1bmtTaXplO1xuICAgIHJldHVybiAoeCArIHkgKiBjaHVua1NpemUgKyB6ICogY2h1bmtTaXplICogY2h1bmtTaXplKTtcbn07XG4vKiogU3RhcnQgRVhQT1NFRCBDSFVOSyBGVU5DVElPTlMgKiovXG4vLyBTWU5DSFJPTk9VU1xuZXhwb3J0IGNvbnN0IGxvYWRDaHVuayA9IChnbCwgc3RhdGUsIHBvcykgPT4ge1xuICAgIGNvbnN0IGVudGl0aWVzID0gc3RhdGUuZW50aXRpZXM7XG4gICAgY29uc3QgY29tcG9uZW50cyA9IHN0YXRlLmNvbXBvbmVudHM7XG4gICAgY29uc3QgY2h1bmtGYWN0b3J5ID0gc3RhdGUuY2h1bmtGYWN0b3J5O1xuICAgIGNvbnN0IGVudGl0eUlkID0gY2h1bmtJZChwb3MpO1xuICAgIGlmIChzdGF0ZS5lbnRpdGllcy5oYXMoZW50aXR5SWQpKVxuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgY29uc3QgZW50aXR5ID0gbmV3RW50aXR5KGVudGl0aWVzLCBlbnRpdHlJZCk7XG4gICAgY29uc3Qgc3RydWN0dXJlID0gZ2VuZXJhdGVTdHJ1Y3R1cmUoY2h1bmtGYWN0b3J5LCBwb3MpO1xuICAgIHN0YXRlID0gYWRkQ29tcG9uZW50KHN0YXRlLCBlbnRpdHlJZCwgXCJzdHJ1Y3R1cmVzXCIsIHN0cnVjdHVyZSk7XG4gICAgY29uc3QgcmVuZGVyT2JqZWN0ID0gYnVpbGRDaHVuayhnbCwgc3RhdGUsIHBvcyk7XG4gICAgc3RhdGUgPSBhZGRDb21wb25lbnQoc3RhdGUsIGVudGl0eUlkLCBcInJlbmRlck9iamVjdHNcIiwgcmVuZGVyT2JqZWN0KTtcbiAgICBzdGF0ZSA9IGFkZENvbXBvbmVudChzdGF0ZSwgZW50aXR5SWQsIFwiY2h1bmtQb3NcIiwgcG9zKTtcbiAgICByZXR1cm4gc3RhdGU7XG59O1xuLy8gQVNZTkNIUk9OT1VTXG5leHBvcnQgY29uc3QgbG9hZE1hbnlDaHVua3MgPSAoZ2wsIHN0YXRlLCBwb3MpID0+IHtcbiAgICBjb25zdCBlbnRpdGllcyA9IHN0YXRlLmVudGl0aWVzO1xuICAgIGNvbnN0IGNvbXBvbmVudHMgPSBzdGF0ZS5jb21wb25lbnRzO1xuICAgIGNvbnN0IHN0cnVjdHVyZXMgPSBjb21wb25lbnRzW1wic3RydWN0dXJlc1wiXTtcbiAgICBjb25zdCBjaHVua0ZhY3RvcnkgPSBzdGF0ZS5jaHVua0ZhY3Rvcnk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZW50aXR5SWQgPSBjaHVua0lkKHBvc1tpXSk7XG4gICAgICAgIGlmIChzdGF0ZS5lbnRpdGllcy5oYXMoZW50aXR5SWQpKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIGNvbnN0IGVudGl0eSA9IG5ld0VudGl0eShlbnRpdGllcywgZW50aXR5SWQpO1xuICAgICAgICBjb25zdCBzdHJ1Y3R1cmUgPSBnZW5lcmF0ZVN0cnVjdHVyZShjaHVua0ZhY3RvcnksIHBvc1tpXSk7XG4gICAgICAgIHN0YXRlID0gYWRkQ29tcG9uZW50KHN0YXRlLCBlbnRpdHlJZCwgXCJzdHJ1Y3R1cmVzXCIsIHN0cnVjdHVyZSk7XG4gICAgICAgIHN0YXRlID0gYWRkQ29tcG9uZW50KHN0YXRlLCBlbnRpdHlJZCwgXCJjaHVua1Bvc1wiLCBwb3NbaV0pO1xuICAgICAgICBjb25zdCB3b3JrZXIgPSBuZXcgV29ya2VyKG5ldyBVUkwoJy4uL3dvcmtlcnMvbWVzaFdvcmtlci50cycsIGltcG9ydC5tZXRhLnVybCksIHsgdHlwZTogXCJtb2R1bGVcIiB9KTtcbiAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHsgY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBwb3M6IHBvc1tpXSB9KTtcbiAgICAgICAgd29ya2VyLm9ubWVzc2FnZSA9IChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZW5kZXJPYmplY3QgPSBjcmVhdGVDaHVua1JlbmRlck9iamVjdChnbCwgc3RhdGUucHJvZ3JhbSwgc3RhdGUuY2h1bmtGYWN0b3J5LCBwb3NbaV0sIGUuZGF0YSk7XG4gICAgICAgICAgICBzdGF0ZSA9IGFkZENvbXBvbmVudChzdGF0ZSwgZW50aXR5SWQsIFwicmVuZGVyT2JqZWN0c1wiLCByZW5kZXJPYmplY3QpO1xuICAgICAgICAgICAgd29ya2VyLnRlcm1pbmF0ZSgpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gc3RhdGU7XG59O1xuLy8gRklYTUU6IGRvbid0IGNyZWF0ZSBhIG5ldyBWQU8gZXZlcnkgdGltZSwganVzdCB1cGRhdGUgdGhlIGV4aXN0aW5nXG5leHBvcnQgY29uc3QgdXBkYXRlQ2h1bmsgPSAoZ2wsIHN0YXRlLCBwb3MpID0+IHtcbiAgICBjb25zdCBjaWQgPSBjaHVua0lkKHBvcyk7XG4gICAgY29uc3QgcmVuZGVyT2JqZWN0ID0gYnVpbGRDaHVuayhnbCwgc3RhdGUsIHBvcyk7XG4gICAgc3RhdGUgPSBhZGRDb21wb25lbnQoc3RhdGUsIGNpZCwgXCJyZW5kZXJPYmplY3RzXCIsIHJlbmRlck9iamVjdCk7XG4gICAgcmV0dXJuIHN0YXRlO1xufTtcbmV4cG9ydCBjb25zdCB1bmxvYWRDaHVuayA9IChzdGF0ZSwgcG9zKSA9PiB7XG4gICAgY29uc3QgZW50aXR5SWQgPSBjaHVua0lkKHBvcyk7XG4gICAgaWYgKCFzdGF0ZS5lbnRpdGllcy5oYXMoZW50aXR5SWQpKVxuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgcmV0dXJuIHJlbW92ZUVudGl0eShzdGF0ZSwgZW50aXR5SWQpO1xufTtcbi8qKiBFbmQgRVhQT1NFRCBDSFVOSyBGVU5DVElPTlMgKi9cbi8vIEZJWE1FOiBkb2Vzbid0IHNldCB0aGUgYmxvY2sgaWYgaXQncyBub3QgbG9hZGVkXG5leHBvcnQgY29uc3Qgc2V0QmxvY2sgPSAoc3RhdGUsIHBvcywgYmxvY2tJZCkgPT4ge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBjaHVua1NpemUgPSBzdGF0ZS5jaHVua0ZhY3RvcnkuY2h1bmtTaXplO1xuICAgIGNvbnN0IGJsb2NrUG9zID0gbmV3IFZlY3RvcjMoTWF0aC5mbG9vcihwb3NbMF0pLCBNYXRoLmZsb29yKHBvc1sxXSksIE1hdGguZmxvb3IocG9zWzJdKSk7XG4gICAgY29uc3QgbG9jYWxQb3MgPSBuZXcgVmVjdG9yMygoKGJsb2NrUG9zWzBdICUgY2h1bmtTaXplKSArIGNodW5rU2l6ZSkgJSBjaHVua1NpemUsICgoYmxvY2tQb3NbMV0gJSBjaHVua1NpemUpICsgY2h1bmtTaXplKSAlIGNodW5rU2l6ZSwgKChibG9ja1Bvc1syXSAlIGNodW5rU2l6ZSkgKyBjaHVua1NpemUpICUgY2h1bmtTaXplKTtcbiAgICBjb25zdCBjaHVua1BvcyA9IGNodW5rUG9zRnJvbUJsb2NrUG9zKHN0YXRlLmNodW5rRmFjdG9yeSwgYmxvY2tQb3MpO1xuICAgIGNvbnN0IGNodW5rRW50aXR5ID0gY2h1bmtJZChjaHVua1Bvcyk7XG4gICAgY29uc3Qgc3RydWN0dXJlID0gKF9hID0gc3RhdGUuY29tcG9uZW50c1tcInN0cnVjdHVyZXNcIl0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXQoY2h1bmtFbnRpdHkpO1xuICAgIC8vIGlmIHN0cnVjdHVyZSBleGlzdHMgc2V0IGJsb2NrIGFuZCByZXBsYWNlIGl0XG4gICAgaWYgKHN0cnVjdHVyZSkge1xuICAgICAgICBjb25zdCB0ID0gbmV3IEZsb2F0NjRBcnJheShzdHJ1Y3R1cmUpO1xuICAgICAgICB0W2xvY2FsQmxvY2tQb3NUb0luZGV4KHN0YXRlLmNodW5rRmFjdG9yeSwgbG9jYWxQb3NbMF0sIGxvY2FsUG9zWzFdLCBsb2NhbFBvc1syXSldID0gYmxvY2tJZDtcbiAgICAgICAgc3RhdGUgPSBhZGRDb21wb25lbnQoc3RhdGUsIGNodW5rRW50aXR5LCBcInN0cnVjdHVyZXNcIiwgc3RydWN0dXJlKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlO1xufTtcbi8vIEZJWE1FOiBkb2VzIG5vdCB3b3JrIGZvciBzb21lIHJlYXNvblxuZXhwb3J0IGNvbnN0IGdldEJsb2NrID0gKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgcG9zKSA9PiB7XG4gICAgY29uc3QgY2h1bmtTaXplID0gY2h1bmtGYWN0b3J5LmNodW5rU2l6ZTtcbiAgICBjb25zdCBibG9ja1BvcyA9IG5ldyBWZWN0b3IzKE1hdGguZmxvb3IocG9zWzBdKSwgTWF0aC5mbG9vcihwb3NbMV0pLCBNYXRoLmZsb29yKHBvc1syXSkpO1xuICAgIGNvbnN0IGxvY2FsUG9zID0gbmV3IFZlY3RvcjMoKChibG9ja1Bvc1swXSAlIGNodW5rU2l6ZSkgKyBjaHVua1NpemUpICUgY2h1bmtTaXplLCAoKGJsb2NrUG9zWzFdICUgY2h1bmtTaXplKSArIGNodW5rU2l6ZSkgJSBjaHVua1NpemUsICgoYmxvY2tQb3NbMl0gJSBjaHVua1NpemUpICsgY2h1bmtTaXplKSAlIGNodW5rU2l6ZSk7XG4gICAgY29uc3QgY2h1bmtQb3MgPSBjaHVua1Bvc0Zyb21CbG9ja1BvcyhjaHVua0ZhY3RvcnksIGJsb2NrUG9zKTtcbiAgICAvL2NvbnN0IGNodW5rRW50aXR5ID0gY2h1bmtJZChjaHVua1Bvcyk7XG4gICAgY29uc3QgY2h1bmtFbnRpdHkgPSBgY2h1LSR7Y2h1bmtQb3NbMF19LSR7Y2h1bmtQb3NbMV19LSR7Y2h1bmtQb3NbMl19YDtcbiAgICBjb25zdCBzdHJ1Y3R1cmUgPSBzdHJ1Y3R1cmVzLmdldChjaHVua0VudGl0eSk7XG4gICAgaWYgKHN0cnVjdHVyZSkge1xuICAgICAgICBjb25zdCB0ID0gbmV3IEZsb2F0NjRBcnJheShzdHJ1Y3R1cmUpO1xuICAgICAgICByZXR1cm4gdFtsb2NhbEJsb2NrUG9zVG9JbmRleChjaHVua0ZhY3RvcnksIGxvY2FsUG9zWzBdLCBsb2NhbFBvc1sxXSwgbG9jYWxQb3NbMl0pXTtcbiAgICB9XG4gICAgcmV0dXJuIGdlbmVyYXRlQmxvY2soY2h1bmtGYWN0b3J5LCBwb3MpO1xufTtcbi8vIHVzZWQgZm9yIHVwZGF0aW5nL21lc2hpbmdcbmNvbnN0IGJ1aWxkQ2h1bmsgPSAoZ2wsIHN0YXRlLCBwb3MpID0+IHtcbiAgICBjb25zdCBtZXNoID0gbmFpdmVNZXNoaW5nKHN0YXRlLmNodW5rRmFjdG9yeSwgc3RhdGUuY29tcG9uZW50c1tcInN0cnVjdHVyZXNcIl0sIHBvcyk7XG4gICAgY29uc3QgcmVuZGVyT2JqZWN0ID0gY3JlYXRlQ2h1bmtSZW5kZXJPYmplY3QoZ2wsIHN0YXRlLnByb2dyYW0sIHN0YXRlLmNodW5rRmFjdG9yeSwgcG9zLCBtZXNoKTtcbiAgICByZXR1cm4gcmVuZGVyT2JqZWN0O1xufTtcbiIsImltcG9ydCB7IFZlY3RvcjMsIE1hdHJpeDQgfSBmcm9tICdAbWF0aC5nbC9jb3JlJztcbmltcG9ydCB7IGdldEJsb2NrIH0gZnJvbSAnLi9jaHVuayc7XG5leHBvcnQgY29uc3QgY2h1bmtWZXJ0ZXhTaGFkZXIgPSBgI3ZlcnNpb24gMzAwIGVzXG4gIGluIHZlYzMgdl9Qb3NpdGlvbjtcbiAgaW4gdmVjMiB1dl9Db29yZHM7XG4gIGluIGZsb2F0IGFvX0Nvb3JkcztcblxuICB1bmlmb3JtIG1hdDQgcHJvamVjdGlvbjtcbiAgdW5pZm9ybSBtYXQ0IHZpZXc7XG4gIHVuaWZvcm0gbWF0NCBtb2RlbDtcbiAgXG4gIG91dCBmbG9hdCBhbztcbiAgb3V0IHZlYzIgdGV4dF9jb29yZHM7XG4gIFxuICB2b2lkIG1haW4oKSB7XG4gICAgXG4gICAgdGV4dF9jb29yZHMgPSB1dl9Db29yZHM7XG4gICAgYW8gPSBhb19Db29yZHM7XG4gICAgXG4gICAgZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uICogdmlldyAqIG1vZGVsICogdmVjNCh2X1Bvc2l0aW9uLCAxLjApO1xuICB9XG5gO1xuZXhwb3J0IGNvbnN0IGNodW5rRnJhZ21lbnRTaGFkZXIgPSBgI3ZlcnNpb24gMzAwIGVzXG4gIHByZWNpc2lvbiBoaWdocCBmbG9hdDtcbiAgXG4gIGluIHZlYzIgdGV4dF9jb29yZHM7XG4gIGluIGZsb2F0IGFvO1xuICBcbiAgdW5pZm9ybSBzYW1wbGVyMkQgdGV4dHVyZV9hdGxhcztcbiAgXG4gIG91dCB2ZWM0IGZyYWdfY29sb3I7XG5cbiAgdm9pZCBtYWluKCkge1xuICAgIFxuICAgIGZsb2F0IGFvSW50ZW5zaXR5ID0gYW8gLyAyLjA7XG4gICAgZmxvYXQgZGFya2VuQW1vdW50ID0gMS4wIC8gKGFvSW50ZW5zaXR5ICsgMS4wKTtcbiAgICBcbiAgICB2ZWM0IGF0bGFzID0gdGV4dHVyZSh0ZXh0dXJlX2F0bGFzLCB0ZXh0X2Nvb3Jkcyk7XG5cbiAgICBmcmFnX2NvbG9yID0gdmVjNChkYXJrZW5BbW91bnQgKiBhdGxhcy54eXosIGF0bGFzLncpO1xuICB9XG5gO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUNodW5rUmVuZGVyT2JqZWN0ID0gKGdsLCBwcm9ncmFtLCBjaHVua0ZhY3RvcnksIHBvcywgbWVzaCkgPT4ge1xuICAgIGNvbnN0IGNodW5rU2l6ZSA9IGNodW5rRmFjdG9yeS5jaHVua1NpemU7XG4gICAgY29uc3QgdmFvID0gZ2wuY3JlYXRlVmVydGV4QXJyYXkoKTtcbiAgICBjb25zdCB2Ym8gPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBpZiAoIXZhbylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIGNyZWF0aW5nIFZBT1wiKTtcbiAgICBpZiAoIXZibylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIGNyZWF0aW5nIFZCT1wiKTtcbiAgICBnbC5iaW5kVmVydGV4QXJyYXkodmFvKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdmJvKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbWVzaCwgZ2wuU1RBVElDX0RSQVcpO1xuICAgIGNvbnN0IHZlcnRleFNpemUgPSAzO1xuICAgIGNvbnN0IHV2U2l6ZSA9IDI7XG4gICAgY29uc3QgYW9TaXplID0gMTtcbiAgICBjb25zdCBzdHJpZGUgPSA0ICogKHZlcnRleFNpemUgKyB1dlNpemUgKyBhb1NpemUpO1xuICAgIGNvbnN0IHZlcnRleE9mZnNldCA9IDA7XG4gICAgY29uc3QgdXZPZmZzZXQgPSA0ICogMztcbiAgICBjb25zdCBhb09mZnNldCA9IDQgKiA1O1xuICAgIGNvbnN0IHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCAndl9Qb3NpdGlvbicpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIocG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbiwgdmVydGV4U2l6ZSwgZ2wuRkxPQVQsIGZhbHNlLCBzdHJpZGUsIHZlcnRleE9mZnNldCk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbik7XG4gICAgY29uc3QgdXZBdHRyaWJ1dGVMb2NhdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sICd1dl9Db29yZHMnKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHV2QXR0cmlidXRlTG9jYXRpb24sIHV2U2l6ZSwgZ2wuRkxPQVQsIGZhbHNlLCBzdHJpZGUsIHV2T2Zmc2V0KTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh1dkF0dHJpYnV0ZUxvY2F0aW9uKTtcbiAgICBjb25zdCBhb0F0dHJpYnV0ZUxvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgJ2FvX0Nvb3JkcycpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoYW9BdHRyaWJ1dGVMb2NhdGlvbiwgYW9TaXplLCBnbC5GTE9BVCwgZmFsc2UsIHN0cmlkZSwgYW9PZmZzZXQpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGFvQXR0cmlidXRlTG9jYXRpb24pO1xuICAgIGNvbnN0IGNvdW50ID0gbWVzaC5sZW5ndGggLyA2O1xuICAgIGNvbnN0IG1vZGVsID0gbmV3IE1hdHJpeDQoKTtcbiAgICBtb2RlbC5pZGVudGl0eSgpLnRyYW5zbGF0ZShbcG9zLnggKiBjaHVua1NpemUsIHBvcy55ICogY2h1bmtTaXplLCBwb3MueiAqIGNodW5rU2l6ZV0pO1xuICAgIHJldHVybiB7XG4gICAgICAgIGxvZDogMCxcbiAgICAgICAgdmFvLFxuICAgICAgICBwcm9ncmFtLFxuICAgICAgICBtb2RlbCxcbiAgICAgICAgdmVydGV4Q291bnQ6IGNvdW50LFxuICAgICAgICB3aXJlZnJhbWU6IGZhbHNlXG4gICAgfTtcbn07XG4vKlxuZXhwb3J0IGNvbnN0IHVwZGF0ZUNodW5rUmVuZGVyT2JqZWN0ID0gKGdsOiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0LCBwcm9ncmFtOiBXZWJHTFByb2dyYW0pID0+IChwcmV2aW91czogU3RhdGljUmVuZGVyT2JqZWN0Q29tcG9uZW50LCBtZXNoOiBGbG9hdDMyQXJyYXkpID0+IHtcblxuICBjb25zdCB7IHZhbywgdmJvLCBwcm9ncmFtLCBtb2RlbCwgY291bnQgfSA9IHByZXZpb3VzO1xuXG4gIGdsLmJpbmRWZXJ0ZXhBcnJheSh2YW8pO1xuXG4gIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2Ym8pO1xuICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbWVzaCwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gIHByZXZpb3VzLmNvdW50ID0gbWVzaC5sZW5ndGggLyA1O1xufTtcbiovXG5leHBvcnQgY29uc3Qgc3VtID0gKGEsIGIpID0+IHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoW2FbMF0gKyBiWzBdLCBhWzFdICsgYlsxXSwgYVsyXSArIGJbMl1dKTtcbn07XG5leHBvcnQgY29uc3QgY2FsY3VsYXRlQU8gPSAoc2lkZTEsIGNvcm5lcjEsIHNpZGUyLCBjb3JuZXIyLCBzaWRlMywgY29ybmVyMywgc2lkZTQsIGNvcm5lcjQpID0+IHtcbiAgICBsZXQgdjEgPSAoc2lkZTEgJiYgMSkgKyAoc2lkZTIgJiYgMSkgKyAoY29ybmVyMSAmJiAxKTtcbiAgICBsZXQgdjIgPSAoc2lkZTIgJiYgMSkgKyAoc2lkZTMgJiYgMSkgKyAoY29ybmVyMiAmJiAxKTtcbiAgICBsZXQgdjMgPSAoc2lkZTMgJiYgMSkgKyAoc2lkZTQgJiYgMSkgKyAoY29ybmVyMyAmJiAxKTtcbiAgICBsZXQgdjQgPSAoc2lkZTQgJiYgMSkgKyAoc2lkZTEgJiYgMSkgKyAoY29ybmVyNCAmJiAxKTtcbiAgICByZXR1cm4gW3YxLCB2MiwgdjMsIHY0XTtcbn07XG4vLyBwYXNzIGluIGFsbCB0aGUgYmxvY2sgZGF0YSBhbmQgdGhlbiByZXR1cm4gdGhlIHZlcnRleCBhcnJheVxuLy8gSW4gdGhlIGZ1dHVyZSBtYXkgaW1wbGVtZW50IGEgZ3JlZWR5IGFsZ29yaXRobSB0byBjdXQgZG93biBvblxuLy8gdmVydGV4IGNvdW50XG4vLyBUaGlzIHNldHMgdGhlIHZlcnRpY2VzL3RleHR1cmVzL2FtYmllbnQgb2NjbHVzaW9uXG5leHBvcnQgY29uc3QgbmFpdmVNZXNoaW5nID0gKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgcG9zKSA9PiB7XG4gICAgY29uc3Qgb3V0cHV0ID0gW107XG4gICAgLy9jb25zb2xlLmxvZyhzdHJ1Y3R1cmVzKTtcbiAgICBjb25zdCBjSWQgPSBgY2h1LSR7cG9zWzBdfS0ke3Bvc1sxXX0tJHtwb3NbMl19YDtcbiAgICAvL2NvbnNvbGUubG9nKGNJZCk7XG4gICAgY29uc3QgY2h1bmtTaXplID0gY2h1bmtGYWN0b3J5LmNodW5rU2l6ZTtcbiAgICBjb25zdCBibG9ja1N0cnVjdHVyZSA9IHN0cnVjdHVyZXMuZ2V0KGNJZCk7XG4gICAgaWYgKCFibG9ja1N0cnVjdHVyZSkge1xuICAgICAgICByZXR1cm4gbmV3IEZsb2F0MzJBcnJheSgpO1xuICAgIH1cbiAgICBjb25zdCBkaWN0ID0gY2h1bmtGYWN0b3J5LmJsb2NrRGljdGlvbmFyeTtcbiAgICBjb25zdCBzdGFydFBvcyA9IG5ldyBWZWN0b3IzKHBvc1swXSAqIGNodW5rU2l6ZSwgcG9zWzFdICogY2h1bmtTaXplLCBwb3NbMl0gKiBjaHVua1NpemUpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2h1bmtTaXplOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjaHVua1NpemU7IGorKykge1xuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBjaHVua1NpemU7IGsrKykge1xuICAgICAgICAgICAgICAgIC8vaWYoaSA9PSAwICYmIGogPT0gMCAmJiBrID09IDApXG4gICAgICAgICAgICAgICAgLy8gIGNvbnNvbGUubG9nKFwiRGlkIHdlIGdldCBoZXJlPyAxXCIpXG4gICAgICAgICAgICAgICAgY29uc3QgYmxvY2tQb3MgPSBzdW0oc3RhcnRQb3MsIChbaSwgaiwga10pKTtcbiAgICAgICAgICAgICAgICBpZiAoZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBibG9ja1BvcykgPT0gMClcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgaWYgKGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgYmxvY2tQb3MpID09IDApXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2NrSWQgPSBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIGJsb2NrUG9zKTtcbiAgICAgICAgICAgICAgICBjb25zdCBibG9jayA9IGRpY3RbYmxvY2tJZF07XG4gICAgICAgICAgICAgICAgaWYgKGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCAoWzEsIDAsIDBdKSkpID09IDApXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKC4uLmZ1bGxCbG9ja01lc2guZWFzdEZhY2UoaSwgaiwgaywgYmxvY2sudSwgYmxvY2sudiwgY2FsY3VsYXRlQU8oZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFsxLCAxLCAwXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMSwgMSwgMV0pKSwgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMSwgMCwgMV0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzEsIC0xLCAxXSkpLCAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFsxLCAtMSwgMF0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzEsIC0xLCAtMV0pKSwgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMSwgMCwgLTFdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFsxLCAxLCAtMV0pKSAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgKSkpO1xuICAgICAgICAgICAgICAgIGlmIChnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgKFstMSwgMCwgMF0pKSkgPT0gMClcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goLi4uZnVsbEJsb2NrTWVzaC53ZXN0RmFjZShpLCBqLCBrLCBibG9jay51LCBibG9jay52LCBjYWxjdWxhdGVBTyhnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWy0xLCAxLCAwXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbLTEsIDEsIDFdKSksIC8vIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWy0xLCAwLCAxXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbLTEsIC0xLCAxXSkpLCAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFstMSwgLTEsIDBdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFstMSwgLTEsIC0xXSkpLCAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFstMSwgMCwgLTFdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFstMSwgMSwgLTFdKSkgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgICkpKTtcbiAgICAgICAgICAgICAgICBpZiAoZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIChbMCwgMSwgMF0pKSkgPT0gMClcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goLi4uZnVsbEJsb2NrTWVzaC50b3BGYWNlKGksIGosIGssIGJsb2NrLnUsIGJsb2NrLnYsIGNhbGN1bGF0ZUFPKGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMSwgMSwgMF0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzEsIDEsIDFdKSksIC8vIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzAsIDEsIDFdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFstMSwgMSwgMV0pKSwgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbLTEsIDEsIDBdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFstMSwgMSwgLTFdKSksIC8vIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzAsIDEsIC0xXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMSwgMSwgLTFdKSkgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgICkpKTtcbiAgICAgICAgICAgICAgICBpZiAoZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIChbMCwgLTEsIDBdKSkpID09IDApXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKC4uLmZ1bGxCbG9ja01lc2guYm90dG9tRmFjZShpLCBqLCBrLCBibG9jay51LCBibG9jay52LCBjYWxjdWxhdGVBTyhnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzEsIC0xLCAwXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMSwgLTEsIDFdKSksIC8vIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzAsIC0xLCAxXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbLTEsIC0xLCAxXSkpLCAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFstMSwgLTEsIDBdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFstMSwgLTEsIC0xXSkpLCAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFswLCAtMSwgLTFdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFsxLCAtMSwgLTFdKSkgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgICkpKTtcbiAgICAgICAgICAgICAgICBpZiAoZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIChbMCwgMCwgMV0pKSkgPT0gMClcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goLi4uZnVsbEJsb2NrTWVzaC5ub3J0aEZhY2UoaSwgaiwgaywgYmxvY2sudSwgYmxvY2sudiwgY2FsY3VsYXRlQU8oZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFsxLCAwLCAxXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMSwgMSwgMV0pKSwgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMCwgMSwgMV0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWy0xLCAxLCAxXSkpLCAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFstMSwgMCwgMV0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWy0xLCAtMSwgMV0pKSwgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMCwgLTEsIDFdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFsxLCAtMSwgMV0pKSAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgKSkpO1xuICAgICAgICAgICAgICAgIGlmIChnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgKFswLCAwLCAtMV0pKSkgPT0gMClcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goLi4uZnVsbEJsb2NrTWVzaC5zb3V0aEZhY2UoaSwgaiwgaywgYmxvY2sudSwgYmxvY2sudiwgY2FsY3VsYXRlQU8oZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFsxLCAwLCAtMV0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzEsIDEsIC0xXSkpLCAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFswLCAxLCAtMV0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWy0xLCAxLCAtMV0pKSwgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbLTEsIDAsIC0xXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbLTEsIC0xLCAtMV0pKSwgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMCwgLTEsIC0xXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMSwgLTEsIC0xXSkpIC8vIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICApKSk7XG4gICAgICAgICAgICAgICAgLy8gc2tpcCBvdmVyIHNwZWNpYWwgYmxvY2tzIGZvciBub3dcbiAgICAgICAgICAgICAgICAvLyBpZihibG9jay50eXBlICE9ICdmdWxsQmxvY2snIHx8IGJsb2NrLnR5cGUgPT0gJ25vbmUnKVxuICAgICAgICAgICAgICAgIC8vICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvL2NvbnNvbGUubG9nKFwiSW4gbWVzaGluZ1wiKTtcbiAgICAvL2NvbnNvbGUubG9nKG91dHB1dCk7XG4gICAgcmV0dXJuIG5ldyBGbG9hdDMyQXJyYXkob3V0cHV0KTtcbn07XG4vLyB0ZXh0dXJlIG9mZnNldHMgc28gdGhhdCB0aGVyZSBhcmUgbm8gYm9yZGVycyBmcm9tIGhvdyBzYW1wbGluZyB0aGUgdGV4dHVyZVxuY29uc3QgdGV4dHVyZVdpZHRoT2Zmc2V0ID0gMC4wNjI1O1xuY29uc3QgdGV4dHVyZVdpZHRoU3RhcnQgPSAwLjAwO1xuLy8gVE9ETzogcmVwbGFjZSB0ZXh0dXJlV2lkdGhPZmZzZXQgd2l0aCB0ZXhlbCBkaW1lbnNpb25zXG5leHBvcnQgY29uc3QgZnVsbEJsb2NrTWVzaCA9IHtcbiAgICBzb3V0aEZhY2U6ICh4LCB5LCB6LCB1LCB2LCBhbykgPT4gKFtcbiAgICAgICAgMC4wICsgeCwgMC4wICsgeSwgMC4wICsgeiwgdSArIHRleHR1cmVXaWR0aFN0YXJ0LCB2ICsgdGV4dHVyZVdpZHRoU3RhcnQsIGFvWzJdLFxuICAgICAgICAxLjAgKyB4LCAxLjAgKyB5LCAwLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCB2ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCBhb1swXSxcbiAgICAgICAgMS4wICsgeCwgMC4wICsgeSwgMC4wICsgeiwgdSArIHRleHR1cmVXaWR0aE9mZnNldCwgdiArIHRleHR1cmVXaWR0aFN0YXJ0LCBhb1szXSxcbiAgICAgICAgMC4wICsgeCwgMC4wICsgeSwgMC4wICsgeiwgdSArIHRleHR1cmVXaWR0aFN0YXJ0LCB2ICsgdGV4dHVyZVdpZHRoU3RhcnQsIGFvWzJdLFxuICAgICAgICAwLjAgKyB4LCAxLjAgKyB5LCAwLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoU3RhcnQsIHYgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIGFvWzFdLFxuICAgICAgICAxLjAgKyB4LCAxLjAgKyB5LCAwLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCB2ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCBhb1swXVxuICAgIF0pLFxuICAgIG5vcnRoRmFjZTogKHgsIHksIHosIHUsIHYsIGFvKSA9PiAoW1xuICAgICAgICAwLjAgKyB4LCAwLjAgKyB5LCAxLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoU3RhcnQsIHYgKyB0ZXh0dXJlV2lkdGhTdGFydCwgYW9bMl0sXG4gICAgICAgIDEuMCArIHgsIDAuMCArIHksIDEuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhTdGFydCwgdiArIHRleHR1cmVXaWR0aE9mZnNldCwgYW9bM10sXG4gICAgICAgIDEuMCArIHgsIDEuMCArIHksIDEuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIHYgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIGFvWzBdLFxuICAgICAgICAwLjAgKyB4LCAwLjAgKyB5LCAxLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoU3RhcnQsIHYgKyB0ZXh0dXJlV2lkdGhTdGFydCwgYW9bMl0sXG4gICAgICAgIDEuMCArIHgsIDEuMCArIHksIDEuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIHYgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIGFvWzBdLFxuICAgICAgICAwLjAgKyB4LCAxLjAgKyB5LCAxLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoU3RhcnQsIHYgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIGFvWzFdXG4gICAgXSksXG4gICAgd2VzdEZhY2U6ICh4LCB5LCB6LCB1LCB2LCBhbykgPT4gKFtcbiAgICAgICAgMC4wICsgeCwgMC4wICsgeSwgMC4wICsgeiwgdSArIHRleHR1cmVXaWR0aFN0YXJ0LCB2ICsgdGV4dHVyZVdpZHRoU3RhcnQsIGFvWzJdLFxuICAgICAgICAwLjAgKyB4LCAwLjAgKyB5LCAxLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoU3RhcnQsIHYgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIGFvWzFdLFxuICAgICAgICAwLjAgKyB4LCAxLjAgKyB5LCAxLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCB2ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCBhb1swXSxcbiAgICAgICAgMC4wICsgeCwgMC4wICsgeSwgMC4wICsgeiwgdSArIHRleHR1cmVXaWR0aFN0YXJ0LCB2ICsgdGV4dHVyZVdpZHRoU3RhcnQsIGFvWzJdLFxuICAgICAgICAwLjAgKyB4LCAxLjAgKyB5LCAxLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCB2ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCBhb1swXSxcbiAgICAgICAgMC4wICsgeCwgMS4wICsgeSwgMC4wICsgeiwgdSArIHRleHR1cmVXaWR0aE9mZnNldCwgdiArIHRleHR1cmVXaWR0aFN0YXJ0LCBhb1szXVxuICAgIF0pLFxuICAgIGVhc3RGYWNlOiAoeCwgeSwgeiwgdSwgdiwgYW8pID0+IChbXG4gICAgICAgIDEuMCArIHgsIDAuMCArIHksIDAuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhTdGFydCwgdiArIHRleHR1cmVXaWR0aFN0YXJ0LCBhb1syXSxcbiAgICAgICAgMS4wICsgeCwgMS4wICsgeSwgMC4wICsgeiwgdSArIHRleHR1cmVXaWR0aE9mZnNldCwgdiArIHRleHR1cmVXaWR0aFN0YXJ0LCBhb1szXSxcbiAgICAgICAgMS4wICsgeCwgMS4wICsgeSwgMS4wICsgeiwgdSArIHRleHR1cmVXaWR0aE9mZnNldCwgdiArIHRleHR1cmVXaWR0aE9mZnNldCwgYW9bMF0sXG4gICAgICAgIDEuMCArIHgsIDAuMCArIHksIDAuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhTdGFydCwgdiArIHRleHR1cmVXaWR0aFN0YXJ0LCBhb1syXSxcbiAgICAgICAgMS4wICsgeCwgMS4wICsgeSwgMS4wICsgeiwgdSArIHRleHR1cmVXaWR0aE9mZnNldCwgdiArIHRleHR1cmVXaWR0aE9mZnNldCwgYW9bMF0sXG4gICAgICAgIDEuMCArIHgsIDAuMCArIHksIDEuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhTdGFydCwgdiArIHRleHR1cmVXaWR0aE9mZnNldCwgYW9bMV1cbiAgICBdKSxcbiAgICB0b3BGYWNlOiAoeCwgeSwgeiwgdSwgdiwgYW8pID0+IChbXG4gICAgICAgIDAuMCArIHgsIDEuMCArIHksIDAuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhTdGFydCwgdiArIHRleHR1cmVXaWR0aFN0YXJ0LCBhb1syXSxcbiAgICAgICAgMS4wICsgeCwgMS4wICsgeSwgMS4wICsgeiwgdSArIHRleHR1cmVXaWR0aE9mZnNldCwgdiArIHRleHR1cmVXaWR0aE9mZnNldCwgYW9bMF0sXG4gICAgICAgIDEuMCArIHgsIDEuMCArIHksIDAuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIHYgKyB0ZXh0dXJlV2lkdGhTdGFydCwgYW9bM10sXG4gICAgICAgIDAuMCArIHgsIDEuMCArIHksIDAuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhTdGFydCwgdiArIHRleHR1cmVXaWR0aFN0YXJ0LCBhb1syXSxcbiAgICAgICAgMC4wICsgeCwgMS4wICsgeSwgMS4wICsgeiwgdSArIHRleHR1cmVXaWR0aFN0YXJ0LCB2ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCBhb1sxXSxcbiAgICAgICAgMS4wICsgeCwgMS4wICsgeSwgMS4wICsgeiwgdSArIHRleHR1cmVXaWR0aE9mZnNldCwgdiArIHRleHR1cmVXaWR0aE9mZnNldCwgYW9bMF0gLy8gYW9bM11cbiAgICBdKSxcbiAgICBib3R0b21GYWNlOiAoeCwgeSwgeiwgdSwgdiwgYW8pID0+IChbXG4gICAgICAgIDAuMCArIHgsIDAuMCArIHksIDAuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhTdGFydCwgdiArIHRleHR1cmVXaWR0aFN0YXJ0LCBhb1syXSxcbiAgICAgICAgMS4wICsgeCwgMC4wICsgeSwgMC4wICsgeiwgdSArIHRleHR1cmVXaWR0aE9mZnNldCwgdiArIHRleHR1cmVXaWR0aFN0YXJ0LCBhb1szXSxcbiAgICAgICAgMS4wICsgeCwgMC4wICsgeSwgMS4wICsgeiwgdSArIHRleHR1cmVXaWR0aE9mZnNldCwgdiArIHRleHR1cmVXaWR0aE9mZnNldCwgYW9bMF0sXG4gICAgICAgIDAuMCArIHgsIDAuMCArIHksIDAuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhTdGFydCwgdiArIHRleHR1cmVXaWR0aFN0YXJ0LCBhb1syXSxcbiAgICAgICAgMS4wICsgeCwgMC4wICsgeSwgMS4wICsgeiwgdSArIHRleHR1cmVXaWR0aE9mZnNldCwgdiArIHRleHR1cmVXaWR0aE9mZnNldCwgYW9bMF0sXG4gICAgICAgIDAuMCArIHgsIDAuMCArIHksIDEuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhTdGFydCwgdiArIHRleHR1cmVXaWR0aE9mZnNldCwgYW9bMV1cbiAgICBdKSxcbn07XG4iLCJpbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSBcIkBtYXRoLmdsL2NvcmVcIjtcbmltcG9ydCB7IGNodW5rSWQsIGxvY2FsQmxvY2tQb3NUb0luZGV4IH0gZnJvbSBcIi4vY2h1bmsvY2h1bmtcIjtcbi8vIGNvcHkgc29tZSBub2lzZSBjb2RlXG5leHBvcnQgY29uc3Qgbm9pc2UgPSAoeCwgeSkgPT4ge1xuICAgIHJldHVybiAwLjU7XG59O1xuZXhwb3J0IGNvbnN0IGdlbmVyYXRlQmxvY2sgPSAoY2h1bmtGYWN0b3J5LCBwb3MpID0+IHtcbiAgICBjb25zdCBjaHVua1NpemUgPSBjaHVua0ZhY3RvcnkuY2h1bmtTaXplO1xuICAgIGNvbnN0IGJhc2VIZWlnaHQgPSBjaHVua1NpemUgLyAyO1xuICAgIGNvbnN0IHdhdmVsZW5ndGggPSBjaHVua1NpemUgKiAyO1xuICAgIGNvbnN0IGhlaWdodCA9IGNodW5rU2l6ZSAvIDQ7XG4gICAgLy8gY2hlY2sgZm9yIGFscmVhZHkgbG9hZGVkIGNodW5rc1xuICAgIGNvbnN0IGggPSBiYXNlSGVpZ2h0ICsgaGVpZ2h0ICogbm9pc2UocG9zWzBdIC8gd2F2ZWxlbmd0aCwgcG9zWzJdIC8gd2F2ZWxlbmd0aCk7XG4gICAgaWYgKHBvc1sxXSA8IDApXG4gICAgICAgIHJldHVybiAxO1xuICAgIGlmIChwb3NbMV0gPCBoIHx8IHBvc1sxXSA+IDIgKiBoKVxuICAgICAgICByZXR1cm4gMjtcbiAgICByZXR1cm4gMDtcbn07XG5leHBvcnQgY29uc3QgZ2VuZXJhdGVTdHJ1Y3R1cmUgPSAoY2h1bmtGYWN0b3J5LCBwb3MpID0+IHtcbiAgICBjb25zdCBvdXRwdXQgPSBuZXcgU2hhcmVkQXJyYXlCdWZmZXIoOCAqIChNYXRoLnBvdyhjaHVua0ZhY3RvcnkuY2h1bmtTaXplLCAzKSkpO1xuICAgIGNvbnN0IHQgPSBuZXcgRmxvYXQ2NEFycmF5KG91dHB1dCk7XG4gICAgY29uc3QgZW50aXR5SWQgPSBjaHVua0lkKHBvcyk7XG4gICAgY29uc3QgY2h1bmtTaXplID0gY2h1bmtGYWN0b3J5LmNodW5rU2l6ZTtcbiAgICBjb25zdCBibG9ja1BvcyA9IG5ldyBWZWN0b3IzKHBvc1swXSAqIGNodW5rU2l6ZSwgcG9zWzFdICogY2h1bmtTaXplLCBwb3NbMl0gKiBjaHVua1NpemUpO1xuICAgIC8vIHNldCB0aGUgYmxvY2tzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaHVua1NpemU7IGkrKykgeyAvLyB4XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY2h1bmtTaXplOyBqKyspIHsgLy8geVxuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBjaHVua1NpemU7IGsrKykgeyAvLyB6XG4gICAgICAgICAgICAgICAgY29uc3QgZ3ggPSBibG9ja1Bvc1swXSArIGk7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3kgPSBibG9ja1Bvc1sxXSArIGo7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3ogPSBibG9ja1Bvc1syXSArIGs7XG4gICAgICAgICAgICAgICAgY29uc3QgbCA9IGxvY2FsQmxvY2tQb3NUb0luZGV4KGNodW5rRmFjdG9yeSwgaSwgaiwgayk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhsKTtcbiAgICAgICAgICAgICAgICB0W2xdID0gZ2VuZXJhdGVCbG9jayhjaHVua0ZhY3RvcnksIG5ldyBWZWN0b3IzKGd4LCBneSwgZ3opKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xufTtcbiIsImltcG9ydCB7IGFkZFN5c3RlbSB9IGZyb20gJy4uL2VuZ2luZS9zdGF0ZSc7XG5pbXBvcnQgeyBjcmVhdGVFQ1N0YXRlLCByZWdpc3RlckNvbXBvbmVudCB9IGZyb20gJy4uL2VuZ2luZS9lYyc7XG5pbXBvcnQgeyBibG9ja0lucHV0LCBjYW1lcmFJbnB1dCwgY2hlY2tDaHVua0NoYW5nZSwgcmVuZGVyU2VsZWN0aW9uQm94IH0gZnJvbSAnLi9zeXN0ZW1zL2lucHV0JztcbmltcG9ydCB7IGxvYWRDaHVua3MsIHVubG9hZENodW5rcyB9IGZyb20gJy4vc3lzdGVtcy93b3JsZCc7XG5pbXBvcnQgeyByZW5kZXJDaHVua3MgfSBmcm9tICcuL3N5c3RlbXMvY2h1bmsnO1xuaW1wb3J0IHsgY3JlYXRlUGxheWVyIH0gZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHsgQ2h1bmtGYWN0b3J5IH0gZnJvbSAnLi9jaHVuay9jaHVuayc7XG5pbXBvcnQgeyBjaHVua1ZlcnRleFNoYWRlciwgY2h1bmtGcmFnbWVudFNoYWRlciB9IGZyb20gJy4vY2h1bmsvbWVzaCc7XG5pbXBvcnQgeyBpbml0U2hhZGVycyB9IGZyb20gJy4vcmVuZGVyJztcbmltcG9ydCB7IGxvYWRUZXh0dXJlIH0gZnJvbSAnLi9yZW5kZXInO1xuO1xuZXhwb3J0IGNvbnN0IGluaXQgPSAoZ2wpID0+IHtcbiAgICBsZXQgc3RhdGUgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGNyZWF0ZUVDU3RhdGUoZ2wpKSwgeyBwbGF5ZXI6IGNyZWF0ZVBsYXllcihnbCksIGNodW5rRmFjdG9yeTogQ2h1bmtGYWN0b3J5KGdsKSwgYmxvY2tEaWN0aW9uYXJ5OiBjcmVhdGVCbG9ja0RpY3Rpb25hcnkoKSwgYXRsYXM6IGxvYWRUZXh0dXJlKGdsLCBcImF0bGFzLnBuZ1wiKSwgcHJvZ3JhbTogaW5pdFNoYWRlcnMoZ2wsIGNodW5rVmVydGV4U2hhZGVyLCBjaHVua0ZyYWdtZW50U2hhZGVyKSB9KTtcbiAgICBzdGF0ZS5jb21wb25lbnRzID0gcmVnaXN0ZXJDb21wb25lbnQoc3RhdGUuY29tcG9uZW50cywgXCJyZW5kZXJPYmplY3RzXCIpO1xuICAgIHN0YXRlLmNvbXBvbmVudHMgPSByZWdpc3RlckNvbXBvbmVudChzdGF0ZS5jb21wb25lbnRzLCBcInN0cnVjdHVyZXNcIik7XG4gICAgc3RhdGUuY29tcG9uZW50cyA9IHJlZ2lzdGVyQ29tcG9uZW50KHN0YXRlLmNvbXBvbmVudHMsIFwiY2h1bmtQb3NcIik7XG4gICAgLy8gc3lzdGVtc1xuICAgIHN0YXRlID0gYWRkU3lzdGVtKHN0YXRlLCBcInBsYXllckNoYW5nZUNodW5rXCIsIHVubG9hZENodW5rcyk7XG4gICAgc3RhdGUgPSBhZGRTeXN0ZW0oc3RhdGUsIFwicGxheWVyQ2hhbmdlQ2h1bmtcIiwgbG9hZENodW5rcyk7XG4gICAgc3RhdGUgPSBhZGRTeXN0ZW0oc3RhdGUsIFwiaW5wdXRcIiwgY2FtZXJhSW5wdXQpO1xuICAgIHN0YXRlID0gYWRkU3lzdGVtKHN0YXRlLCBcImlucHV0XCIsIGNoZWNrQ2h1bmtDaGFuZ2UpO1xuICAgIHN0YXRlID0gYWRkU3lzdGVtKHN0YXRlLCBcImNsaWNrXCIsIGJsb2NrSW5wdXQpO1xuICAgIHN0YXRlID0gYWRkU3lzdGVtKHN0YXRlLCBcInJlbmRlclwiLCByZW5kZXJTZWxlY3Rpb25Cb3gpO1xuICAgIHN0YXRlID0gYWRkU3lzdGVtKHN0YXRlLCBcInJlbmRlclwiLCByZW5kZXJDaHVua3MpO1xuICAgIHJldHVybiBzdGF0ZTtcbn07XG5leHBvcnQgY29uc3QgY3JlYXRlQmxvY2tEaWN0aW9uYXJ5ID0gKCkgPT4gKFtcbiAgICB7XG4gICAgICAgIG5hbWU6ICdhaXInLFxuICAgICAgICB0eXBlOiAnYWlyJyxcbiAgICAgICAgdTogMCxcbiAgICAgICAgdjogMFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZGlydCcsXG4gICAgICAgIHR5cGU6ICdmdWxsQmxvY2snLFxuICAgICAgICB1OiAwLjEyNSxcbiAgICAgICAgdjogMFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZ3Jhc3MnLFxuICAgICAgICB0eXBlOiAnZnVsbEJsb2NrJyxcbiAgICAgICAgdTogMC4wLFxuICAgICAgICB2OiAwXG4gICAgfSxcbl0pO1xuIiwiaW1wb3J0IHsgZ2V0QmxvY2sgfSBmcm9tIFwiLi9jaHVuay9jaHVua1wiO1xuaW1wb3J0IHsgTWF0cml4NCwgVmVjdG9yMyB9IGZyb20gXCJAbWF0aC5nbC9jb3JlXCI7XG5pbXBvcnQgeyBjcmVhdGVDYW1lcmEgfSBmcm9tICcuLi9lbmdpbmUvZnJlZUNhbWVyYSc7XG5pbXBvcnQgeyBpbml0U2hhZGVycyB9IGZyb20gXCIuL3JlbmRlclwiO1xuO1xuO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVBsYXllciA9IChnbCkgPT4ge1xuICAgIGNvbnN0IGNhbWVyYSA9IGNyZWF0ZUNhbWVyYShnbCk7XG4gICAgY2FtZXJhLnBvc2l0aW9uID0gbmV3IFZlY3RvcjMoMCwgMTAsIDApO1xuICAgIHJldHVybiAoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHsgcmF5U3RlcDogMC4xLCByYXlNYXhMZW5ndGg6IDUgfSwgY2FtZXJhKSwgeyBzZWxlY3Rpb25Cb3g6IGNyZWF0ZVNlbGVjdGlvbkJveChnbCksIHByZXZpb3VzUG9zaXRpb246IG5ldyBWZWN0b3IzKC0xLCAtMSwgLTEpIH0pKTtcbn07XG47XG5jb25zdCBjcmVhdGVTZWxlY3Rpb25Cb3ggPSAoZ2wpID0+IHtcbiAgICBjb25zdCBwcm9ncmFtID0gaW5pdFNoYWRlcnMoZ2wsIGJveFZlcnRleFNoYWRlciwgYm94RnJhZ21lbnRTaGFkZXIpO1xuICAgIGNvbnN0IG1lc2ggPSBuZXcgRmxvYXQzMkFycmF5KFtcbiAgICAgICAgMC4wLCAwLjAsIDAuMCxcbiAgICAgICAgMC4wLCAxLjAsIDAuMCxcbiAgICAgICAgMC4wLCAwLjAsIDAuMCxcbiAgICAgICAgMS4wLCAwLjAsIDAuMCxcbiAgICAgICAgMC4wLCAwLjAsIDAuMCxcbiAgICAgICAgMC4wLCAwLjAsIDEuMCxcbiAgICAgICAgMS4wLCAxLjAsIDEuMCxcbiAgICAgICAgMC4wLCAxLjAsIDEuMCxcbiAgICAgICAgMS4wLCAxLjAsIDEuMCxcbiAgICAgICAgMS4wLCAwLjAsIDEuMCxcbiAgICAgICAgMS4wLCAxLjAsIDEuMCxcbiAgICAgICAgMS4wLCAxLjAsIDAuMCxcbiAgICAgICAgMC4wLCAxLjAsIDAuMCxcbiAgICAgICAgMC4wLCAxLjAsIDEuMCxcbiAgICAgICAgMS4wLCAwLjAsIDAuMCxcbiAgICAgICAgMS4wLCAwLjAsIDEuMCxcbiAgICAgICAgMC4wLCAwLjAsIDEuMCxcbiAgICAgICAgMS4wLCAwLjAsIDEuMCxcbiAgICAgICAgMC4wLCAxLjAsIDAuMCxcbiAgICAgICAgMS4wLCAxLjAsIDAuMCxcbiAgICAgICAgMS4wLCAwLjAsIDAuMCxcbiAgICAgICAgMS4wLCAxLjAsIDAuMCxcbiAgICAgICAgMC4wLCAwLjAsIDEuMCxcbiAgICAgICAgMC4wLCAxLjAsIDEuMCxcbiAgICBdKTtcbiAgICBjb25zdCB2YW8gPSBnbC5jcmVhdGVWZXJ0ZXhBcnJheSgpO1xuICAgIGNvbnN0IHZibyA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGlmICghdmFvKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgY3JlYXRpbmcgVkFPXCIpO1xuICAgIGlmICghdmJvKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgY3JlYXRpbmcgVkJPXCIpO1xuICAgIGdsLmJpbmRWZXJ0ZXhBcnJheSh2YW8pO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2Ym8pO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBtZXNoLCBnbC5TVEFUSUNfRFJBVyk7XG4gICAgY29uc3QgdmVydGV4U2l6ZSA9IDM7XG4gICAgY29uc3Qgc3RyaWRlID0gNCAqIDM7XG4gICAgY29uc3QgdmVydGV4T2Zmc2V0ID0gMDtcbiAgICBjb25zdCBwb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgJ3ZfUG9zaXRpb24nKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24sIHZlcnRleFNpemUsIGdsLkZMT0FULCBmYWxzZSwgc3RyaWRlLCB2ZXJ0ZXhPZmZzZXQpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24pO1xuICAgIGNvbnN0IHZlcnRleENvdW50ID0gbWVzaC5sZW5ndGggLyAzO1xuICAgIGNvbnN0IG1vZGVsID0gKG5ldyBNYXRyaXg0KCkpLmlkZW50aXR5KCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcHJvZ3JhbSxcbiAgICAgICAgdmFvLFxuICAgICAgICB2ZXJ0ZXhDb3VudCxcbiAgICAgICAgbW9kZWxcbiAgICB9O1xufTtcbmV4cG9ydCBjb25zdCBkcmF3U2VsZWN0aW9uQm94ID0gKGdsLCBzdGF0ZSkgPT4ge1xuICAgIGNvbnN0IHsgcHJvZ3JhbSwgdmFvLCB2ZXJ0ZXhDb3VudCwgbW9kZWw6IG1vZGVsTWF0cml4IH0gPSBzdGF0ZS5wbGF5ZXIuc2VsZWN0aW9uQm94O1xuICAgIGNvbnN0IHsgcHJvamVjdGlvbjogcHJvamVjdGlvbk1hdHJpeCwgdmlldzogdmlld01hdHJpeCB9ID0gc3RhdGUucGxheWVyO1xuICAgIGdsLnVzZVByb2dyYW0ocHJvZ3JhbSk7XG4gICAgY29uc3QgcHJvamVjdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBcInByb2plY3Rpb25cIik7XG4gICAgY29uc3QgdmlldyA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBcInZpZXdcIik7XG4gICAgY29uc3QgbW9kZWwgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgXCJtb2RlbFwiKTtcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KHByb2plY3Rpb24sIGZhbHNlLCBwcm9qZWN0aW9uTWF0cml4KTtcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KHZpZXcsIGZhbHNlLCB2aWV3TWF0cml4KTtcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KG1vZGVsLCBmYWxzZSwgbW9kZWxNYXRyaXgpO1xuICAgIGdsLmJpbmRWZXJ0ZXhBcnJheSh2YW8pO1xuICAgIGdsLmRyYXdBcnJheXMoZ2wuTElORVMsIDAsIHZlcnRleENvdW50KTtcbiAgICByZXR1cm4gc3RhdGU7XG59O1xuZXhwb3J0IGNvbnN0IHJheUNhc3QgPSAoZ2wsIHN0YXRlLCBwb3MsIGRpciwgcmF5U3RlcCwgcmF5TWF4TGVuZ3RoKSA9PiB7XG4gICAgbGV0IHJheSA9IG5ldyBWZWN0b3IzKHBvcy54LCBwb3MueSwgcG9zLnopO1xuICAgIGNvbnN0IHN0ZXAgPSBuZXcgVmVjdG9yMyhyYXlTdGVwICogZGlyLngsIHJheVN0ZXAgKiBkaXIueSwgcmF5U3RlcCAqIGRpci56KTtcbiAgICBjb25zdCBudW1TdGVwcyA9IHJheU1heExlbmd0aCAvIHJheVN0ZXA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1TdGVwczsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzID0gbmV3IFZlY3RvcjMocmF5LngsIHJheS55LCByYXkueik7XG4gICAgICAgIHJheS54ICs9IHN0ZXBbMF07XG4gICAgICAgIGlmIChnZXRCbG9jayhzdGF0ZS5jaHVua0ZhY3RvcnksIHN0YXRlLmNvbXBvbmVudHNbXCJzdHJ1Y3R1cmVzXCJdLCByYXkpICE9IDApXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiByYXksXG4gICAgICAgICAgICAgICAgcHJldmlvdXM6IHByZXZpb3VzLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgcHJldmlvdXMueCArPSBzdGVwWzBdO1xuICAgICAgICByYXkueSArPSBzdGVwWzFdO1xuICAgICAgICBpZiAoZ2V0QmxvY2soc3RhdGUuY2h1bmtGYWN0b3J5LCBzdGF0ZS5jb21wb25lbnRzW1wic3RydWN0dXJlc1wiXSwgcmF5KSAhPSAwKVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogcmF5LFxuICAgICAgICAgICAgICAgIHByZXZpb3VzOiBwcmV2aW91cyxcbiAgICAgICAgICAgIH07XG4gICAgICAgIHByZXZpb3VzLnkgKz0gc3RlcFsxXTtcbiAgICAgICAgcmF5LnogKz0gc3RlcFsyXTtcbiAgICAgICAgaWYgKGdldEJsb2NrKHN0YXRlLmNodW5rRmFjdG9yeSwgc3RhdGUuY29tcG9uZW50c1tcInN0cnVjdHVyZXNcIl0sIHJheSkgIT0gMClcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHJheSxcbiAgICAgICAgICAgICAgICBwcmV2aW91czogcHJldmlvdXMsXG4gICAgICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5jb25zdCBib3hWZXJ0ZXhTaGFkZXIgPSBgI3ZlcnNpb24gMzAwIGVzXG4gIGluIHZlYzMgdl9Qb3NpdGlvbjtcblxuICB1bmlmb3JtIG1hdDQgcHJvamVjdGlvbjtcbiAgdW5pZm9ybSBtYXQ0IHZpZXc7XG4gIHVuaWZvcm0gbWF0NCBtb2RlbDtcbiAgXG4gIHZvaWQgbWFpbigpIHtcbiAgICBcbiAgICBnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb24gKiB2aWV3ICogbW9kZWwgKiB2ZWM0KHZfUG9zaXRpb24sIDEuMCk7XG4gIH1cbmA7XG5jb25zdCBib3hGcmFnbWVudFNoYWRlciA9IGAjdmVyc2lvbiAzMDAgZXNcbiAgcHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xuICBcbiAgb3V0IHZlYzQgZnJhZ19jb2xvcjtcblxuICB2b2lkIG1haW4oKSB7XG4gICAgZnJhZ19jb2xvciA9IHZlYzQoMC4wLCAwLjAsIDAuMCwgMS4wKTtcbiAgfVxuYDtcbiIsImV4cG9ydCBjb25zdCBpbml0U2hhZGVycyA9IChnbCwgdnNoYWRlciwgZnNoYWRlcikgPT4ge1xuICAgIGNvbnN0IHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgaWYgKCFwcm9ncmFtKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXZWJHTCBmYWlsZWQgdG8gY3JlYXRlIHByb2dyYW1cIik7XG4gICAgY29uc3QgdmVydGV4ID0gY29tcGlsZVNoYWRlcihnbCwgdnNoYWRlciwgZ2wuVkVSVEVYX1NIQURFUik7XG4gICAgY29uc3QgZnJhZ21lbnQgPSBjb21waWxlU2hhZGVyKGdsLCBmc2hhZGVyLCBnbC5GUkFHTUVOVF9TSEFERVIpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCB2ZXJ0ZXgpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCBmcmFnbWVudCk7XG4gICAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XG4gICAgY29uc3Qgc3VjY2VzcyA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpO1xuICAgIGlmICghc3VjY2VzcylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicHJvZ3JhbSBmYWlsZWQgdG8gbGluazpcIik7IC8vICsgZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cgKHByb2dyYW0pKTtcbiAgICByZXR1cm4gcHJvZ3JhbTtcbn07XG5jb25zdCBjb21waWxlU2hhZGVyID0gKGdsLCBzb3VyY2UsIHR5cGUpID0+IHtcbiAgICBjb25zdCBzaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIodHlwZSk7XG4gICAgaWYgKCFzaGFkZXIpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIldlYkdMIGZhaWxlZCB0byBjcmVhdGUgc2hhZGVyXCIpO1xuICAgIGdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHNvdXJjZSk7XG4gICAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xuICAgIGNvbnN0IHN1Y2Nlc3MgPSBnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUyk7XG4gICAgaWYgKCFzdWNjZXNzKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBjb21waWxlIHNoYWRlcjogJHtnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcil9YCk7XG4gICAgcmV0dXJuIHNoYWRlcjtcbn07XG4vKlxuICogQXNzdW1lcyB0aGUgdGV4dHVyZSBzaXplIGlzIGEgcG93ZXIgb2YgMi4gR2VuZXJhdGVzIG1pcG1hcHNcbiAqL1xuZXhwb3J0IGNvbnN0IGxvYWRUZXh0dXJlID0gKGdsLCB1cmwpID0+IHtcbiAgICBjb25zdCB0ZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xuICAgIGlmICghdGV4dHVyZSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiV2ViR0wgY291bGRuJ3QgY3JlYXRlIG5lZWRlZCB0ZXh0dXJlc1wiKTtcbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlKTtcbiAgICBjb25zdCBsZXZlbCA9IDA7XG4gICAgY29uc3QgaW50ZXJuYWxGb3JtYXQgPSBnbC5SR0JBO1xuICAgIGNvbnN0IHdpZHRoID0gMTtcbiAgICBjb25zdCBoZWlnaHQgPSAxO1xuICAgIGNvbnN0IGJvcmRlciA9IDA7XG4gICAgY29uc3Qgc3JjRm9ybWF0ID0gZ2wuUkdCQTtcbiAgICBjb25zdCBzcmNUeXBlID0gZ2wuVU5TSUdORURfQllURTtcbiAgICBjb25zdCBwaXhlbCA9IG5ldyBVaW50OEFycmF5KFsyNTUsIDAsIDI1NSwgMjU1XSk7XG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCBsZXZlbCwgaW50ZXJuYWxGb3JtYXQsIHdpZHRoLCBoZWlnaHQsIGJvcmRlciwgc3JjRm9ybWF0LCBzcmNUeXBlLCBwaXhlbCk7XG4gICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpO1xuICAgICAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIGxldmVsLCBpbnRlcm5hbEZvcm1hdCwgc3JjRm9ybWF0LCBzcmNUeXBlLCBpbWFnZSk7XG4gICAgICAgIGdsLnRleFBhcmFtZXRlcmYoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICAgICAgZ2wudGV4UGFyYW1ldGVyZihnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgICAgICAvL2dsLnRleFBhcmFtZXRlcmYoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLlJFUEVBVCk7XG4gICAgICAgIC8vZ2wudGV4UGFyYW1ldGVyZihnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuUkVQRUFUKTtcbiAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xuICAgICAgICBnbC5nZW5lcmF0ZU1pcG1hcChnbC5URVhUVVJFXzJEKTtcbiAgICB9O1xuICAgIGltYWdlLnNyYyA9IHVybDtcbiAgICByZXR1cm4gdGV4dHVyZTtcbn07XG4iLCIvLyBqdXN0IHJlbmRlcnMgYWxsIHJlbmRlciBvYmplY3RzIHJpZ2h0IG5vd1xuZXhwb3J0IGNvbnN0IHJlbmRlckNodW5rcyA9IChnbCwgc3RhdGUsIGRlbHRhKSA9PiAoZGF0YSkgPT4ge1xuICAgIGNvbnN0IGNhc3RlZFN0YXRlID0gc3RhdGU7XG4gICAgY29uc3QgcmVuZGVyT2JqZWN0cyA9IGNhc3RlZFN0YXRlLmNvbXBvbmVudHNbXCJyZW5kZXJPYmplY3RzXCJdO1xuICAgIGlmICghcmVuZGVyT2JqZWN0cylcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJSZW5kZXJDaHVua3M6IFJlbmRlck9iamVjdHMgY29tcG9uZW50IG5vdCByZWdpc3RlcmVkIVwiKTtcbiAgICByZW5kZXJPYmplY3RzLmZvckVhY2goKHYsIGspID0+IHtcbiAgICAgICAgZ2wudXNlUHJvZ3JhbSh2LnByb2dyYW0pO1xuICAgICAgICBjb25zdCBwcm9qZWN0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHYucHJvZ3JhbSwgXCJwcm9qZWN0aW9uXCIpO1xuICAgICAgICBjb25zdCB2aWV3ID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHYucHJvZ3JhbSwgXCJ2aWV3XCIpO1xuICAgICAgICBjb25zdCBtb2RlbCA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbih2LnByb2dyYW0sIFwibW9kZWxcIik7XG4gICAgICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApO1xuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBjYXN0ZWRTdGF0ZS5hdGxhcyk7XG4gICAgICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYocHJvamVjdGlvbiwgZmFsc2UsIGNhc3RlZFN0YXRlLnBsYXllci5wcm9qZWN0aW9uKTtcbiAgICAgICAgZ2wudW5pZm9ybU1hdHJpeDRmdih2aWV3LCBmYWxzZSwgY2FzdGVkU3RhdGUucGxheWVyLnZpZXcpO1xuICAgICAgICBnbC51bmlmb3JtTWF0cml4NGZ2KG1vZGVsLCBmYWxzZSwgdi5tb2RlbCk7XG4gICAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheSh2LnZhbyk7XG4gICAgICAgIGdsLmRyYXdBcnJheXModi53aXJlZnJhbWUgPyBnbC5MSU5FUyA6IGdsLlRSSUFOR0xFUywgMCwgdi52ZXJ0ZXhDb3VudCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHN0YXRlO1xufTtcbiIsImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICdAbWF0aC5nbC9jb3JlJztcbmltcG9ydCB7IGZyZWVDYW1lcmFJbnB1dCB9IGZyb20gJy4uLy4uL2VuZ2luZS9mcmVlQ2FtZXJhJztcbmltcG9ydCB7IGNodW5rSWQsIGNodW5rUG9zRnJvbUJsb2NrUG9zLCBzZXRCbG9jaywgdXBkYXRlQ2h1bmsgfSBmcm9tICcuLi9jaHVuay9jaHVuayc7XG5pbXBvcnQgeyBkcmF3U2VsZWN0aW9uQm94LCByYXlDYXN0IH0gZnJvbSAnLi4vcGxheWVyJztcbmltcG9ydCB7IGZsb29yVmVjdG9yIH0gZnJvbSAnLi4vLi4vbGliL21hdGgnO1xuZXhwb3J0IGNvbnN0IGNhbWVyYUlucHV0ID0gKGdsLCBzdGF0ZSwgZGVsdGEpID0+IChkYXRhKSA9PiB7XG4gICAgdmFyIF9hO1xuICAgIGxldCBjYXN0ZWRTdGF0ZSA9IHN0YXRlO1xuICAgIGNhc3RlZFN0YXRlLnBsYXllciA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZnJlZUNhbWVyYUlucHV0KGNhc3RlZFN0YXRlLnBsYXllciwgY2FzdGVkU3RhdGUsIGRlbHRhKSksIGNhc3RlZFN0YXRlLnBsYXllcik7XG4gICAgY2FzdGVkU3RhdGUubW91c2VNb3ZlbWVudCA9IFswLCAwXTtcbiAgICBpZiAoY2FzdGVkU3RhdGUuYWN0aXZlSW5wdXQuaGFzKFwiZ1wiKSlcbiAgICAgICAgY29uc29sZS5sb2coY2FzdGVkU3RhdGUucGxheWVyLnBvc2l0aW9uKTtcbiAgICBpZiAoY2FzdGVkU3RhdGUuYWN0aXZlSW5wdXQuaGFzKFwidlwiKSkge1xuICAgICAgICBjb25zdCBwb3MgPSBjYXN0ZWRTdGF0ZS5wbGF5ZXIucG9zaXRpb247XG4gICAgICAgIGNvbnN0IGNodW5rU2l6ZSA9IGNhc3RlZFN0YXRlLmNodW5rRmFjdG9yeS5jaHVua1NpemU7XG4gICAgICAgIGNvbnN0IGNodW5rUG9zID0gbmV3IFZlY3RvcjMoTWF0aC5mbG9vcihwb3MueCAvIGNodW5rU2l6ZSksIE1hdGguZmxvb3IocG9zLnkgLyBjaHVua1NpemUpLCBNYXRoLmZsb29yKHBvcy56IC8gY2h1bmtTaXplKSk7XG4gICAgICAgIGNvbnN0IGVpZCA9IGNodW5rSWQoY2h1bmtQb3MpO1xuICAgICAgICBjb25zdCBjaHVuayA9IChfYSA9IGNhc3RlZFN0YXRlLmNvbXBvbmVudHNbXCJyZW5kZXJPYmplY3RzXCJdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0KGVpZCk7XG4gICAgICAgIGlmIChjaHVuaykge1xuICAgICAgICAgICAgY2h1bmsud2lyZWZyYW1lID0gIWNodW5rLndpcmVmcmFtZTtcbiAgICAgICAgICAgIGNhc3RlZFN0YXRlLmNvbXBvbmVudHNbXCJyZW5kZXJPYmplY3RzXCJdLnNldChlaWQsIGNodW5rKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2FzdGVkU3RhdGU7XG59O1xuZXhwb3J0IGNvbnN0IGNoZWNrQ2h1bmtDaGFuZ2UgPSAoZ2wsIHN0YXRlLCBkZWx0YSkgPT4gKGRhdGEpID0+IHtcbiAgICBsZXQgY2FzdGVkU3RhdGUgPSBzdGF0ZTtcbiAgICBjb25zdCBjdXJyZW50Q2h1bmtJZCA9IGNodW5rSWQoY2h1bmtQb3NGcm9tQmxvY2tQb3MoY2FzdGVkU3RhdGUuY2h1bmtGYWN0b3J5LCBmbG9vclZlY3RvcihjYXN0ZWRTdGF0ZS5wbGF5ZXIucG9zaXRpb24pKSk7XG4gICAgY29uc3QgcHJldmlvdXNDaHVua0lkID0gY2h1bmtJZChjaHVua1Bvc0Zyb21CbG9ja1BvcyhjYXN0ZWRTdGF0ZS5jaHVua0ZhY3RvcnksIGZsb29yVmVjdG9yKGNhc3RlZFN0YXRlLnBsYXllci5wcmV2aW91c1Bvc2l0aW9uKSkpO1xuICAgIGlmICghKGN1cnJlbnRDaHVua0lkID09PSBwcmV2aW91c0NodW5rSWQpKVxuICAgICAgICBjYXN0ZWRTdGF0ZS5xdWV1ZS5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6IFwicGxheWVyQ2hhbmdlQ2h1bmtcIixcbiAgICAgICAgICAgIGRhdGE6IG51bGxcbiAgICAgICAgfSk7XG4gICAgY2FzdGVkU3RhdGUucGxheWVyLnByZXZpb3VzUG9zaXRpb24ueCA9IGNhc3RlZFN0YXRlLnBsYXllci5wb3NpdGlvbi54O1xuICAgIGNhc3RlZFN0YXRlLnBsYXllci5wcmV2aW91c1Bvc2l0aW9uLnkgPSBjYXN0ZWRTdGF0ZS5wbGF5ZXIucG9zaXRpb24ueTtcbiAgICBjYXN0ZWRTdGF0ZS5wbGF5ZXIucHJldmlvdXNQb3NpdGlvbi56ID0gY2FzdGVkU3RhdGUucGxheWVyLnBvc2l0aW9uLno7XG4gICAgcmV0dXJuIGNhc3RlZFN0YXRlO1xufTtcbmV4cG9ydCBjb25zdCBibG9ja0lucHV0ID0gKGdsLCBzdGF0ZSwgZGVsdGEpID0+IChkYXRhKSA9PiB7XG4gICAgbGV0IGNhc3RlZFN0YXRlID0gc3RhdGU7XG4gICAgY29uc3QgY2h1bmtTaXplID0gY2FzdGVkU3RhdGUuY2h1bmtGYWN0b3J5LmNodW5rU2l6ZTtcbiAgICBjb25zdCB3aGljaCA9IGRhdGEgPT09IG51bGwgfHwgZGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGF0YS53aGljaDtcbiAgICBjb25zdCB7IHBvc2l0aW9uLCBkaXJlY3Rpb24sIHJheVN0ZXAsIHJheU1heExlbmd0aCB9ID0gY2FzdGVkU3RhdGUucGxheWVyO1xuICAgIGNvbnN0IGhpdCA9IHJheUNhc3QoZ2wsIGNhc3RlZFN0YXRlLCBwb3NpdGlvbiwgZGlyZWN0aW9uLCByYXlTdGVwLCByYXlNYXhMZW5ndGgpO1xuICAgIGlmICghaGl0KVxuICAgICAgICByZXR1cm4gY2FzdGVkU3RhdGU7XG4gICAgY29uc3QgYmxvY2tQb3MgPSBmbG9vclZlY3RvcihoaXQucG9zaXRpb24pO1xuICAgIGNvbnN0IGNodW5rUG9zID0gY2h1bmtQb3NGcm9tQmxvY2tQb3MoY2FzdGVkU3RhdGUuY2h1bmtGYWN0b3J5LCBibG9ja1Bvcyk7XG4gICAgY29uc3QgcHJldlBvcyA9IGZsb29yVmVjdG9yKGhpdC5wcmV2aW91cyk7XG4gICAgY29uc3QgcHJldkNodW5rUG9zID0gY2h1bmtQb3NGcm9tQmxvY2tQb3MoY2FzdGVkU3RhdGUuY2h1bmtGYWN0b3J5LCBwcmV2UG9zKTtcbiAgICAvLyBsZWZ0IGNsaWNrIC0gcmVtb3ZlIGJsb2NrXG4gICAgaWYgKHdoaWNoID09IDEpIHtcbiAgICAgICAgLy8gc2V0IHRoZSBibG9ja1xuICAgICAgICBjYXN0ZWRTdGF0ZSA9IHNldEJsb2NrKGNhc3RlZFN0YXRlLCBibG9ja1BvcywgMCk7XG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgbWVzaFxuICAgICAgICBjYXN0ZWRTdGF0ZSA9IHVwZGF0ZUNodW5rKGdsLCBjYXN0ZWRTdGF0ZSwgY2h1bmtQb3MpO1xuICAgICAgICBjb25zdCBtb2R1bG8gPSBuZXcgVmVjdG9yMygoKGJsb2NrUG9zLnggJSBjaHVua1NpemUpICsgY2h1bmtTaXplKSAlIGNodW5rU2l6ZSwgKChibG9ja1Bvcy55ICUgY2h1bmtTaXplKSArIGNodW5rU2l6ZSkgJSBjaHVua1NpemUsICgoYmxvY2tQb3MueiAlIGNodW5rU2l6ZSkgKyBjaHVua1NpemUpICUgY2h1bmtTaXplKTtcbiAgICAgICAgaWYgKG1vZHVsby54ICUgY2h1bmtTaXplID09IDApXG4gICAgICAgICAgICBjYXN0ZWRTdGF0ZSA9IHVwZGF0ZUNodW5rKGdsLCBjYXN0ZWRTdGF0ZSwgbmV3IFZlY3RvcjMoY2h1bmtQb3MueCAtIDEsIGNodW5rUG9zLnksIGNodW5rUG9zLnopKTtcbiAgICAgICAgaWYgKG1vZHVsby54ICUgY2h1bmtTaXplID09IGNodW5rU2l6ZSAtIDEpXG4gICAgICAgICAgICBjYXN0ZWRTdGF0ZSA9IHVwZGF0ZUNodW5rKGdsLCBjYXN0ZWRTdGF0ZSwgbmV3IFZlY3RvcjMoY2h1bmtQb3MueCArIDEsIGNodW5rUG9zLnksIGNodW5rUG9zLnopKTtcbiAgICAgICAgaWYgKG1vZHVsby55ICUgY2h1bmtTaXplID09IDApXG4gICAgICAgICAgICBjYXN0ZWRTdGF0ZSA9IHVwZGF0ZUNodW5rKGdsLCBjYXN0ZWRTdGF0ZSwgbmV3IFZlY3RvcjMoY2h1bmtQb3MueCwgY2h1bmtQb3MueSAtIDEsIGNodW5rUG9zLnopKTtcbiAgICAgICAgaWYgKG1vZHVsby55ICUgY2h1bmtTaXplID09IGNodW5rU2l6ZSAtIDEpXG4gICAgICAgICAgICBjYXN0ZWRTdGF0ZSA9IHVwZGF0ZUNodW5rKGdsLCBjYXN0ZWRTdGF0ZSwgbmV3IFZlY3RvcjMoY2h1bmtQb3MueCwgY2h1bmtQb3MueSArIDEsIGNodW5rUG9zLnopKTtcbiAgICAgICAgaWYgKG1vZHVsby56ICUgY2h1bmtTaXplID09IDApXG4gICAgICAgICAgICBjYXN0ZWRTdGF0ZSA9IHVwZGF0ZUNodW5rKGdsLCBjYXN0ZWRTdGF0ZSwgbmV3IFZlY3RvcjMoY2h1bmtQb3MueCwgY2h1bmtQb3MueSwgY2h1bmtQb3MueiAtIDEpKTtcbiAgICAgICAgaWYgKG1vZHVsby56ICUgY2h1bmtTaXplID09IGNodW5rU2l6ZSAtIDEpXG4gICAgICAgICAgICBjYXN0ZWRTdGF0ZSA9IHVwZGF0ZUNodW5rKGdsLCBjYXN0ZWRTdGF0ZSwgbmV3IFZlY3RvcjMoY2h1bmtQb3MueCwgY2h1bmtQb3MueSwgY2h1bmtQb3MueiArIDEpKTtcbiAgICB9XG4gICAgLy8gcmlnaHQgY2xpY2sgLSBhZGQgYmxvY2tcbiAgICBpZiAod2hpY2ggPT0gMykge1xuICAgICAgICAvLyBzZXQgdGhlIGJsb2NrXG4gICAgICAgIGNhc3RlZFN0YXRlID0gc2V0QmxvY2soY2FzdGVkU3RhdGUsIHByZXZQb3MsIDEpO1xuICAgICAgICAvLyB1cGRhdGUgdGhlIG1lc2hcbiAgICAgICAgY2FzdGVkU3RhdGUgPSB1cGRhdGVDaHVuayhnbCwgY2FzdGVkU3RhdGUsIHByZXZDaHVua1Bvcyk7XG4gICAgfVxuICAgIHJldHVybiBjYXN0ZWRTdGF0ZTtcbn07XG5leHBvcnQgY29uc3QgcmVuZGVyU2VsZWN0aW9uQm94ID0gKGdsLCBzdGF0ZSwgZGVsdGEpID0+IChkYXRhKSA9PiB7XG4gICAgbGV0IGNhc3RlZFN0YXRlID0gc3RhdGU7XG4gICAgY29uc3Qgd2hpY2ggPSBkYXRhID09PSBudWxsIHx8IGRhdGEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRhdGEud2hpY2g7XG4gICAgY29uc3QgeyBwb3NpdGlvbiwgZGlyZWN0aW9uLCByYXlTdGVwLCByYXlNYXhMZW5ndGggfSA9IGNhc3RlZFN0YXRlLnBsYXllcjtcbiAgICBjb25zdCBoaXQgPSByYXlDYXN0KGdsLCBjYXN0ZWRTdGF0ZSwgcG9zaXRpb24sIGRpcmVjdGlvbiwgcmF5U3RlcCwgcmF5TWF4TGVuZ3RoKTtcbiAgICBpZiAoIWhpdClcbiAgICAgICAgcmV0dXJuIGNhc3RlZFN0YXRlO1xuICAgIGNvbnN0IHBvcyA9IGZsb29yVmVjdG9yKGhpdC5wb3NpdGlvbik7XG4gICAgY2FzdGVkU3RhdGUucGxheWVyLnNlbGVjdGlvbkJveC5tb2RlbCA9IGNhc3RlZFN0YXRlLnBsYXllci5zZWxlY3Rpb25Cb3gubW9kZWwuaWRlbnRpdHkoKS50cmFuc2xhdGUoW3Bvcy54LCBwb3MueSwgcG9zLnpdKTtcbiAgICBjYXN0ZWRTdGF0ZSA9IGRyYXdTZWxlY3Rpb25Cb3goZ2wsIGNhc3RlZFN0YXRlKTtcbiAgICByZXR1cm4gY2FzdGVkU3RhdGU7XG59O1xuIiwiaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJ0BtYXRoLmdsL2NvcmUnO1xuaW1wb3J0IHsgbG9hZE1hbnlDaHVua3MsIHVubG9hZENodW5rIH0gZnJvbSAnLi4vY2h1bmsvY2h1bmsnO1xuZXhwb3J0IGNvbnN0IGxvYWRDaHVua3MgPSAoZ2wsIHN0YXRlLCBkZWx0YSkgPT4gKGRhdGEpID0+IHtcbiAgICBsZXQgY2FzdGVkU3RhdGUgPSBzdGF0ZTtcbiAgICBjb25zdCBsb2FkRGlzdGFuY2UgPSBjYXN0ZWRTdGF0ZS5jaHVua0ZhY3RvcnkubG9hZERpc3RhbmNlO1xuICAgIGNvbnN0IGNodW5rU2l6ZSA9IGNhc3RlZFN0YXRlLmNodW5rRmFjdG9yeS5jaHVua1NpemU7XG4gICAgY29uc3QgcG9zID0gY2FzdGVkU3RhdGUucGxheWVyLnBvc2l0aW9uO1xuICAgIGNvbnN0IGNodW5rUG9zID0gbmV3IFZlY3RvcjMoTWF0aC5mbG9vcihwb3MueCAvIGNodW5rU2l6ZSksIE1hdGguZmxvb3IocG9zLnkgLyBjaHVua1NpemUpLCBNYXRoLmZsb29yKHBvcy56IC8gY2h1bmtTaXplKSk7XG4gICAgY29uc3QgdG9Mb2FkID0gW107XG4gICAgY29uc3Qgb2Zmc2V0ID0gW107XG4gICAgY29uc3QgciA9IGxvYWREaXN0YW5jZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHI7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHI7IGorKykge1xuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCByOyBrKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoKGkgKiBpICsgaiAqIGogKyBrICogaykgPCByICogcikge1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQucHVzaChuZXcgVmVjdG9yMyhpLCBqLCBrKSk7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldC5wdXNoKG5ldyBWZWN0b3IzKGksIC1qLCBrKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKG9mZnNldCk7XG4gICAgY2FzdGVkU3RhdGUgPSBsb2FkTWFueUNodW5rcyhnbCwgY2FzdGVkU3RhdGUsIG9mZnNldCk7XG4gICAgcmV0dXJuIGNhc3RlZFN0YXRlO1xufTtcbmV4cG9ydCBjb25zdCB1bmxvYWRDaHVua3MgPSAoZ2wsIHN0YXRlLCBkZWx0YSkgPT4gKGRhdGEpID0+IHtcbiAgICBsZXQgY2FzdGVkU3RhdGUgPSBzdGF0ZTtcbiAgICBjb25zdCBsb2FkRGlzdGFuY2UgPSBjYXN0ZWRTdGF0ZS5jaHVua0ZhY3RvcnkubG9hZERpc3RhbmNlO1xuICAgIGNvbnN0IGNodW5rU2l6ZSA9IGNhc3RlZFN0YXRlLmNodW5rRmFjdG9yeS5jaHVua1NpemU7XG4gICAgY29uc3QgcGxheWVyUG9zID0gY2FzdGVkU3RhdGUucGxheWVyLnBvc2l0aW9uO1xuICAgIGNvbnN0IGNodW5rUG9zID0gbmV3IFZlY3RvcjMoTWF0aC5mbG9vcihwbGF5ZXJQb3MueCAvIGNodW5rU2l6ZSksIE1hdGguZmxvb3IocGxheWVyUG9zLnkgLyBjaHVua1NpemUpLCBNYXRoLmZsb29yKHBsYXllclBvcy56IC8gY2h1bmtTaXplKSk7XG4gICAgY29uc3QgY2h1bmtQb3NTdG9yYWdlID0gY2FzdGVkU3RhdGUuY29tcG9uZW50c1tcImNodW5rUG9zXCJdO1xuICAgIGlmICghY2h1bmtQb3NTdG9yYWdlKVxuICAgICAgICByZXR1cm4gY2FzdGVkU3RhdGU7XG4gICAgY2h1bmtQb3NTdG9yYWdlLmZvckVhY2goKHYsIGspID0+IHtcbiAgICAgICAgLy8gbGV0IHVubG9hZCA9IGZhbHNlO1xuICAgICAgICAvLyBmaW5kIGNodW5rcG9zIG91dHNpZGUgcmFuZ2UgYW5kIHVubG9hZFxuICAgICAgICBpZiAodi54IDwgY2h1bmtQb3MueCAtIGxvYWREaXN0YW5jZSlcbiAgICAgICAgICAgIGNhc3RlZFN0YXRlID0gdW5sb2FkQ2h1bmsoY2FzdGVkU3RhdGUsIHYpO1xuICAgICAgICBpZiAodi54ID4gY2h1bmtQb3MueCArIGxvYWREaXN0YW5jZSlcbiAgICAgICAgICAgIGNhc3RlZFN0YXRlID0gdW5sb2FkQ2h1bmsoY2FzdGVkU3RhdGUsIHYpO1xuICAgICAgICBpZiAodi55IDwgY2h1bmtQb3MueSAtIGxvYWREaXN0YW5jZSlcbiAgICAgICAgICAgIGNhc3RlZFN0YXRlID0gdW5sb2FkQ2h1bmsoY2FzdGVkU3RhdGUsIHYpO1xuICAgICAgICBpZiAodi55ID4gY2h1bmtQb3MueSArIGxvYWREaXN0YW5jZSlcbiAgICAgICAgICAgIGNhc3RlZFN0YXRlID0gdW5sb2FkQ2h1bmsoY2FzdGVkU3RhdGUsIHYpO1xuICAgICAgICBpZiAodi56IDwgY2h1bmtQb3MueiAtIGxvYWREaXN0YW5jZSlcbiAgICAgICAgICAgIGNhc3RlZFN0YXRlID0gdW5sb2FkQ2h1bmsoY2FzdGVkU3RhdGUsIHYpO1xuICAgICAgICBpZiAodi56ID4gY2h1bmtQb3MueiArIGxvYWREaXN0YW5jZSlcbiAgICAgICAgICAgIGNhc3RlZFN0YXRlID0gdW5sb2FkQ2h1bmsoY2FzdGVkU3RhdGUsIHYpO1xuICAgICAgICAvLyBjYXN0ZWRTdGF0ZS5xdWV1ZS5wdXNoKHsgdHlwZTogXCJjaHVua1VubG9hZFwiLCBkYXRhOiB2IH0pXG4gICAgfSk7XG4gICAgcmV0dXJuIGNhc3RlZFN0YXRlO1xufTtcbiIsImltcG9ydCB7IE1hdHJpeDQsIFZlY3RvcjMgfSBmcm9tICdAbWF0aC5nbC9jb3JlJztcbmV4cG9ydCBjb25zdCByYWRpYW5zID0gKG4pID0+IHtcbiAgICByZXR1cm4gKG4gKiBNYXRoLlBJKSAvIDE4MC4wO1xufTtcbmV4cG9ydCBjb25zdCBtdWx0aXBseUFuZERlc3RydWN0VmVjdG9yMyA9ICh2ZWMsIG0pID0+IHtcbiAgICByZXR1cm4gW3ZlYy54ICogbSwgdmVjLnkgKiBtLCB2ZWMueiAqIG1dO1xufTtcbmV4cG9ydCBjb25zdCBmdW5jdGlvbmFsQ3Jvc3NWZWN0b3IzID0gKHYxLCB2MikgPT4ge1xuICAgIGNvbnN0IHYgPSBuZXcgVmVjdG9yMyh2MS54LCB2MS55LCB2MS56KTtcbiAgICByZXR1cm4gdi5jcm9zcyhbdjIueCwgdjIueSwgdjIuel0pLm5vcm1hbGl6ZSgpO1xufTtcbmV4cG9ydCBjb25zdCBwcm9qZWN0aW9uTWF0cml4ID0gKHcsIGgpID0+IChuZXcgTWF0cml4NCgpLnBlcnNwZWN0aXZlKHtcbiAgICBmb3Y6IDcwLFxuICAgIGZvdnk6IChNYXRoLlBJICogNzApIC8gMTgwLFxuICAgIGFzcGVjdDogd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgbmVhcjogMC4xLFxuICAgIGZhcjogMTAwLjBcbn0pKTtcbmV4cG9ydCBjb25zdCBmbG9vclZlY3RvciA9IChwb3MpID0+IChuZXcgVmVjdG9yMyhNYXRoLmZsb29yKHBvcy54KSwgTWF0aC5mbG9vcihwb3MueSksIE1hdGguZmxvb3IocG9zLnopKSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIi8vIFRoaXMgZnVuY3Rpb24gYWxsb3cgdG8gcmVmZXJlbmNlIGFzeW5jIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy51ID0gKGNodW5rSWQpID0+IHtcblx0Ly8gcmV0dXJuIHVybCBmb3IgZmlsZW5hbWVzIGJhc2VkIG9uIHRlbXBsYXRlXG5cdHJldHVybiBcIlwiICsgY2h1bmtJZCArIFwiLmJ1bmRsZS5qc1wiO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiLyoqXG5pbXBvcnQgeyBjcmVhdGVFbnRpdGllcywgY3JlYXRlQ29tcG9uZW50cywgQ29tcG9uZW50cywgRW50aXR5LCBTdGF0aWNSZW5kZXJPYmplY3RDb21wb25lbnQgfSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7IGNyZWF0ZVN5c3RlbXMsIGFkZFN5c3RlbSwgZGlzcGF0Y2hfZXZlbnQsIFN5c3RlbSB9IGZyb20gJy4vc3lzdGVtJztcbmltcG9ydCB7IGNyZWF0ZVBsYXllciwgUGxheWVyLCBwcm9qZWN0aW9uTWF0cml4LCBmcmVlQ2FtZXJhSW5wdXQgfSBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgeyByZW5kZXJTdGF0aWNPYmplY3RzIH0gZnJvbSAnLi9yZW5kZXInO1xuKi9cbmltcG9ydCB7IGRpc3BhdGNoIH0gZnJvbSAnLi9lbmdpbmUvc3RhdGUnO1xuaW1wb3J0IHsgY3JlYXRlUHJvZmlsZXIsIHVwZGF0ZVByb2ZpbGVyIH0gZnJvbSAnLi9lbmdpbmUvcHJvZmlsZXInO1xuaW1wb3J0IHsgY3JlYXRlV2luZG93IH0gZnJvbSAnLi9lbmdpbmUvd2luZG93JztcbmNvbnN0IGNhcHR1cmVJbnB1dCA9IChnbCwgc3RhdGUpID0+IHtcbiAgICB3aW5kb3cub25rZXl1cCA9IChlKSA9PiB7XG4gICAgICAgIHN0YXRlLmFjdGl2ZUlucHV0LmRlbGV0ZShlLmtleS50b0xvd2VyQ2FzZSgpKTtcbiAgICB9O1xuICAgIHdpbmRvdy5vbmtleWRvd24gPSAoZSkgPT4ge1xuICAgICAgICBzdGF0ZS5hY3RpdmVJbnB1dC5hZGQoZS5rZXkudG9Mb3dlckNhc2UoKSk7XG4gICAgfTtcbiAgICBkb2N1bWVudC5vbm1vdXNlbW92ZSA9IChlKSA9PiB7XG4gICAgICAgIHN0YXRlLm1vdXNlTW92ZW1lbnQgPSBbZS5tb3ZlbWVudFgsIGUubW92ZW1lbnRZXTtcbiAgICB9O1xuICAgIGNvbnN0IGxvY2tDaGFuZ2VBbGVydCA9ICgpID0+IHtcbiAgICAgICAgaWYgKGRvY3VtZW50LnBvaW50ZXJMb2NrRWxlbWVudCA9PT0gZ2wuY2FudmFzKVxuICAgICAgICAgICAgc3RhdGUubG9jayA9IHRydWU7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHN0YXRlLmxvY2sgPSBmYWxzZTtcbiAgICB9O1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJsb2NrY2hhbmdlJywgbG9ja0NoYW5nZUFsZXJ0LCBmYWxzZSk7XG4gICAgcmV0dXJuIHN0YXRlO1xufTtcbmNvbnN0IG1haW4gPSAoKSA9PiB7XG4gICAgaWYgKCFjcm9zc09yaWdpbklzb2xhdGVkKSB7XG4gICAgICAgIGFsZXJ0KFwiU2hhcmVkQXJyYXlCdWZmZXIgbm90IGVuYWJsZWQhIFdpbGwgbm90IGZ1bmN0aW9uLlwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBnbCA9IGNyZWF0ZVdpbmRvdygpO1xuICAgIGxldCBwcm9maWxlciA9IGNyZWF0ZVByb2ZpbGVyKHRydWUpOyAvLyBib29sZWFuIHBhcmFtZXRlcjogcHJpbnQgb3Igbm90XG4gICAgLy8gbGV0IGRpc3BhdGNoUHJvZmlsZXIgPSBjcmVhdGVQcm9maWxlcihmYWxzZSk7XG4gICAgbGV0IHN0YXRlID0gY3JlYXRlKGdsKTtcbiAgICBzdGF0ZSA9IGNhcHR1cmVJbnB1dChnbCwgc3RhdGUpO1xuICAgIGRvY3VtZW50Lm9uY2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICBzdGF0ZSA9IGRpc3BhdGNoKGdsLCBzdGF0ZSwgXCJjbGlja1wiLCAwKShlKTtcbiAgICB9O1xuICAgIGxldCBwcmV2aW91c1RpbWUgPSAtMTtcbiAgICBjb25zdCBnYW1lbG9vcCA9ICh0aW1lKSA9PiB7XG4gICAgICAgIGdsLmNsZWFyKGdsLkRFUFRIX0JVRkZFUl9CSVQgfCBnbC5DT0xPUl9CVUZGRVJfQklUKTtcbiAgICAgICAgLy8gY2FsYyBkZWx0YVxuICAgICAgICBpZiAocHJldmlvdXNUaW1lID09IC0xKVxuICAgICAgICAgICAgcHJldmlvdXNUaW1lID0gdGltZTtcbiAgICAgICAgY29uc3QgZGVsdGEgPSAodGltZSAtIHByZXZpb3VzVGltZSkgKiAwLjAwMTsgLy8gaW4gc2Vjb25kc1xuICAgICAgICAvLyBmbHVzaCBldmVudHMsIG5lZWQgdG8gZmlndXJlIGEgd2F5IHRvIHBhc3MgZXZlbnQgZGF0YS9ob3cgdG8gc3RydWN0dXJlIGV2ZW50IGRhdGFcbiAgICAgICAgd2hpbGUgKHN0YXRlLnF1ZXVlLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgICBjb25zdCBldmVudCA9IHN0YXRlLnF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAoZXZlbnQgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIHN0YXRlID0gZGlzcGF0Y2goZ2wsIHN0YXRlLCBldmVudC50eXBlLCBkZWx0YSkoZXZlbnQuZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdXBkYXRlIGZyYW1lXG4gICAgICAgIHN0YXRlID0gZGlzcGF0Y2goZ2wsIHN0YXRlLCBcImlucHV0XCIsIGRlbHRhKShudWxsKTtcbiAgICAgICAgc3RhdGUgPSBkaXNwYXRjaChnbCwgc3RhdGUsIFwidGlja1wiLCBkZWx0YSkobnVsbCk7XG4gICAgICAgIC8vIHByb2ZpbGUgdGhpc1xuICAgICAgICAvLyBkaXNwYXRjaFByb2ZpbGVyID0gc3RhcnQoZGlzcGF0Y2hQcm9maWxlcik7XG4gICAgICAgIHN0YXRlID0gZGlzcGF0Y2goZ2wsIHN0YXRlLCBcInJlbmRlclwiLCBkZWx0YSkobnVsbCk7XG4gICAgICAgIC8vIGRpc3BhdGNoUHJvZmlsZXIgPSBlbmQoZGlzcGF0Y2hQcm9maWxlcik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGRpc3BhdGNoUHJvZmlsZXIuZGVsdGEpO1xuICAgICAgICBwcm9maWxlciA9IHVwZGF0ZVByb2ZpbGVyKHByb2ZpbGVyLCBkZWx0YSk7XG4gICAgICAgIHByZXZpb3VzVGltZSA9IHRpbWU7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShnYW1lbG9vcCk7XG4gICAgfTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2FtZWxvb3ApO1xufTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgbWFpbik7XG5pbXBvcnQgeyBpbml0IH0gZnJvbSAnLi9leGFtcGxlL2luZGV4JztcbmNvbnN0IGNyZWF0ZSA9IChnbCkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKGRlc2NyaXB0aW9uKTtcbiAgICAvKlxuICAgIGNvbnN0IGF0bGFzID0gXCJhdGxhcy5wbmdcIjtcbiAgICBjb25zdCBwbGF5ZXIgPSBjcmVhdGVQbGF5ZXIoZ2wsIGF0bGFzKTtcbiAgXG4gICAgY29uc3QgZW50aXRpZXMgICA9IGNyZWF0ZUVudGl0aWVzKCk7XG4gICAgY29uc3QgY29tcG9uZW50cyA9IGNyZWF0ZUNvbXBvbmVudHMoKTtcbiAgICBjb25zdCBzeXN0ZW1zICAgID0gY3JlYXRlU3lzdGVtcygpO1xuICBcbiAgICBpbml0TWF6ZShnbCwgZW50aXRpZXMsIGNvbXBvbmVudHMpO1xuICBcbiAgICBhZGRTeXN0ZW0oc3lzdGVtcywgXCJyZW5kZXJcIiwgcmVuZGVyU3RhdGljT2JqZWN0cyk7XG4gICAgYWRkU3lzdGVtKHN5c3RlbXMsIFwiaW5wdXRcIiwgIGZyZWVDYW1lcmFJbnB1dCk7XG4gICAgKi9cbiAgICByZXR1cm4gaW5pdChnbCk7XG59O1xuLy8gVGhlIGZvbGxvd2luZyB3YXMgYmVmb3JlIHRoZSBjb21wbGV0ZSByZXdyaXRlXG5jb25zdCBkZXNjcmlwdGlvbiA9IGBcblNvbWUgaW5mbyBhYm91dCBteSBwcm9qZWN0OlxuXG5Db250cm9scyBtaW1pYyBtaW5lY3JhZnQgY3JlYXRpdmUgbW9kZSwgXG5qdXN0IGNsaWNrIGluIHRoZSB3aW5kb3cgYW5kIHRoZW4geW91IFxuc2hvdWxkIGJlIGFibGUgdG8gZmx5IGFyb3VuZC4gTGVmdCBjbGlja2luZyBcbndpbGwgcmVtb3ZlIGJsb2NrcyBpbiBmcm9udCBvZiB5b3UsIHVwIHRvIDUgXG5ibG9ja3MgYXdheS5cblxuVGhlIGFyZW5hIGlzIGdlbmVyYXRlZCByYW5kb21seSBlYWNoIHRpbWUsIFxuc28gaXQnbGwgYmUgZGlmZmVyZW50IGlmIHlvdSByZWZyZXNoIHRoZSBwYWdlLlxuXG5JIHVzZWQgYSB2ZXJ5IGJhc2ljIGVjcyBzeXN0ZW0gYW5kIGxhaWQgdGhlIFxuZ3JvdW5kd29yayBmb3IgYW4gZXZlbnQgc3lzdGVtLCBidXQgZHVlIHRvIFxudGltZSBjb25zdHJhaW50cyB0aGUgY29kZSBtYXkgcmVzZW1ibGUgYSBwbGF0ZVxub2Ygc3BhZ2hldHRpLlxuXG5JIGNvZGVkIHRoaXMgaW4gdHlwZXNjcmlwdCBhbmQgdXNlZCB3ZWJwYWNrIHRvXG5jb21waWxlIHRoZSBwcm9qZWN0IGludG8gYSBzaW1wbGUgYnVuZGxlIGZpbGUuXG5JIHVzZWQgbWF0aC5nbC9jb3JlIHNvIHRoYXQgSSBjb3VsZCB1c2UgcHJlZGVmaW5lZFxuVmVjdG9yMyBhbmQgTWF0cml4NCBjbGFzc2VzLCBzcGVjaWZpY2FsbHkgZm9yIHRoZSBcbmxvb2tBdCBhbmQgcGVyc3BlY3RpdmUgZnVuY3Rpb25zLlxuXG5UaGUgdGV4dHVyZSBhdGxhcyBJIHVzZWQgZm9yIHRoZSBibG9ja3MgaXMgdGFrZW5cbmZyb20gVGhlIFBhaW50ZXJseSBQYWNrOiBodHRwOi8vcGFpbnRlcmx5cGFjay5uZXQvLlxuXG5JJ3ZlIGFsc28gdXBsb2FkZWQgdGhpcyBwcm9qZWN0IHRvIG15IGdpdGh1YiBpbmNhc2UgXG5JIGRlY2lkZSB0byB3b3JrIG9uIGl0IGZ1cnRoZXIuXG5gO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9