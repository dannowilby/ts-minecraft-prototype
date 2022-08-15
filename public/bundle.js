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
    // gl.clearColor(0.537, 0.811, 0.941, 1.0);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
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


/***/ }),

/***/ "./node_modules/simplex-noise/dist/esm/simplex-noise.js":
/*!**************************************************************!*\
  !*** ./node_modules/simplex-noise/dist/esm/simplex-noise.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SimplexNoise": () => (/* binding */ SimplexNoise),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "buildPermutationTable": () => (/* binding */ buildPermutationTable)
/* harmony export */ });
/*
 * A fast javascript implementation of simplex noise by Jonas Wagner

Based on a speed-improved simplex noise algorithm for 2D, 3D and 4D in Java.
Which is based on example code by Stefan Gustavson (stegu@itn.liu.se).
With Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
Better rank ordering method by Stefan Gustavson in 2012.

 Copyright (c) 2021 Jonas Wagner

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
const F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
const G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
const F3 = 1.0 / 3.0;
const G3 = 1.0 / 6.0;
const F4 = (Math.sqrt(5.0) - 1.0) / 4.0;
const G4 = (5.0 - Math.sqrt(5.0)) / 20.0;
const grad3 = new Float32Array([1, 1, 0,
    -1, 1, 0,
    1, -1, 0,
    -1, -1, 0,
    1, 0, 1,
    -1, 0, 1,
    1, 0, -1,
    -1, 0, -1,
    0, 1, 1,
    0, -1, 1,
    0, 1, -1,
    0, -1, -1]);
const grad4 = new Float32Array([0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1,
    0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1,
    1, 0, 1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1, 0, -1, -1,
    -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1,
    1, 1, 0, 1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1,
    -1, 1, 0, 1, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, -1,
    1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0,
    -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0]);
/** Deterministic simplex noise generator suitable for 2D, 3D and 4D spaces. */
class SimplexNoise {
    /**
     * Creates a new `SimplexNoise` instance.
     * This involves some setup. You can save a few cpu cycles by reusing the same instance.
     * @param randomOrSeed A random number generator or a seed (string|number).
     * Defaults to Math.random (random irreproducible initialization).
     */
    constructor(randomOrSeed = Math.random) {
        const random = typeof randomOrSeed == 'function' ? randomOrSeed : alea(randomOrSeed);
        this.p = buildPermutationTable(random);
        this.perm = new Uint8Array(512);
        this.permMod12 = new Uint8Array(512);
        for (let i = 0; i < 512; i++) {
            this.perm[i] = this.p[i & 255];
            this.permMod12[i] = this.perm[i] % 12;
        }
    }
    /**
     * Samples the noise field in 2 dimensions
     * @param x
     * @param y
     * @returns a number in the interval [-1, 1]
     */
    noise2D(x, y) {
        const permMod12 = this.permMod12;
        const perm = this.perm;
        let n0 = 0; // Noise contributions from the three corners
        let n1 = 0;
        let n2 = 0;
        // Skew the input space to determine which simplex cell we're in
        const s = (x + y) * F2; // Hairy factor for 2D
        const i = Math.floor(x + s);
        const j = Math.floor(y + s);
        const t = (i + j) * G2;
        const X0 = i - t; // Unskew the cell origin back to (x,y) space
        const Y0 = j - t;
        const x0 = x - X0; // The x,y distances from the cell origin
        const y0 = y - Y0;
        // For the 2D case, the simplex shape is an equilateral triangle.
        // Determine which simplex we are in.
        let i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
        if (x0 > y0) {
            i1 = 1;
            j1 = 0;
        } // lower triangle, XY order: (0,0)->(1,0)->(1,1)
        else {
            i1 = 0;
            j1 = 1;
        } // upper triangle, YX order: (0,0)->(0,1)->(1,1)
        // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
        // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
        // c = (3-sqrt(3))/6
        const x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
        const y1 = y0 - j1 + G2;
        const x2 = x0 - 1.0 + 2.0 * G2; // Offsets for last corner in (x,y) unskewed coords
        const y2 = y0 - 1.0 + 2.0 * G2;
        // Work out the hashed gradient indices of the three simplex corners
        const ii = i & 255;
        const jj = j & 255;
        // Calculate the contribution from the three corners
        let t0 = 0.5 - x0 * x0 - y0 * y0;
        if (t0 >= 0) {
            const gi0 = permMod12[ii + perm[jj]] * 3;
            t0 *= t0;
            n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0); // (x,y) of grad3 used for 2D gradient
        }
        let t1 = 0.5 - x1 * x1 - y1 * y1;
        if (t1 >= 0) {
            const gi1 = permMod12[ii + i1 + perm[jj + j1]] * 3;
            t1 *= t1;
            n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1);
        }
        let t2 = 0.5 - x2 * x2 - y2 * y2;
        if (t2 >= 0) {
            const gi2 = permMod12[ii + 1 + perm[jj + 1]] * 3;
            t2 *= t2;
            n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2);
        }
        // Add contributions from each corner to get the final noise value.
        // The result is scaled to return values in the interval [-1,1].
        return 70.0 * (n0 + n1 + n2);
    }
    /**
     * Samples the noise field in 3 dimensions
     * @param x
     * @param y
     * @param z
     * @returns a number in the interval [-1, 1]
     */
    noise3D(x, y, z) {
        const permMod12 = this.permMod12;
        const perm = this.perm;
        let n0, n1, n2, n3; // Noise contributions from the four corners
        // Skew the input space to determine which simplex cell we're in
        const s = (x + y + z) * F3; // Very nice and simple skew factor for 3D
        const i = Math.floor(x + s);
        const j = Math.floor(y + s);
        const k = Math.floor(z + s);
        const t = (i + j + k) * G3;
        const X0 = i - t; // Unskew the cell origin back to (x,y,z) space
        const Y0 = j - t;
        const Z0 = k - t;
        const x0 = x - X0; // The x,y,z distances from the cell origin
        const y0 = y - Y0;
        const z0 = z - Z0;
        // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
        // Determine which simplex we are in.
        let i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
        let i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
        if (x0 >= y0) {
            if (y0 >= z0) {
                i1 = 1;
                j1 = 0;
                k1 = 0;
                i2 = 1;
                j2 = 1;
                k2 = 0;
            } // X Y Z order
            else if (x0 >= z0) {
                i1 = 1;
                j1 = 0;
                k1 = 0;
                i2 = 1;
                j2 = 0;
                k2 = 1;
            } // X Z Y order
            else {
                i1 = 0;
                j1 = 0;
                k1 = 1;
                i2 = 1;
                j2 = 0;
                k2 = 1;
            } // Z X Y order
        }
        else { // x0<y0
            if (y0 < z0) {
                i1 = 0;
                j1 = 0;
                k1 = 1;
                i2 = 0;
                j2 = 1;
                k2 = 1;
            } // Z Y X order
            else if (x0 < z0) {
                i1 = 0;
                j1 = 1;
                k1 = 0;
                i2 = 0;
                j2 = 1;
                k2 = 1;
            } // Y Z X order
            else {
                i1 = 0;
                j1 = 1;
                k1 = 0;
                i2 = 1;
                j2 = 1;
                k2 = 0;
            } // Y X Z order
        }
        // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
        // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
        // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
        // c = 1/6.
        const x1 = x0 - i1 + G3; // Offsets for second corner in (x,y,z) coords
        const y1 = y0 - j1 + G3;
        const z1 = z0 - k1 + G3;
        const x2 = x0 - i2 + 2.0 * G3; // Offsets for third corner in (x,y,z) coords
        const y2 = y0 - j2 + 2.0 * G3;
        const z2 = z0 - k2 + 2.0 * G3;
        const x3 = x0 - 1.0 + 3.0 * G3; // Offsets for last corner in (x,y,z) coords
        const y3 = y0 - 1.0 + 3.0 * G3;
        const z3 = z0 - 1.0 + 3.0 * G3;
        // Work out the hashed gradient indices of the four simplex corners
        const ii = i & 255;
        const jj = j & 255;
        const kk = k & 255;
        // Calculate the contribution from the four corners
        let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
        if (t0 < 0)
            n0 = 0.0;
        else {
            const gi0 = permMod12[ii + perm[jj + perm[kk]]] * 3;
            t0 *= t0;
            n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0 + grad3[gi0 + 2] * z0);
        }
        let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
        if (t1 < 0)
            n1 = 0.0;
        else {
            const gi1 = permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]] * 3;
            t1 *= t1;
            n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1 + grad3[gi1 + 2] * z1);
        }
        let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
        if (t2 < 0)
            n2 = 0.0;
        else {
            const gi2 = permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]] * 3;
            t2 *= t2;
            n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2 + grad3[gi2 + 2] * z2);
        }
        let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
        if (t3 < 0)
            n3 = 0.0;
        else {
            const gi3 = permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]] * 3;
            t3 *= t3;
            n3 = t3 * t3 * (grad3[gi3] * x3 + grad3[gi3 + 1] * y3 + grad3[gi3 + 2] * z3);
        }
        // Add contributions from each corner to get the final noise value.
        // The result is scaled to stay just inside [-1,1]
        return 32.0 * (n0 + n1 + n2 + n3);
    }
    /**
     * Samples the noise field in 4 dimensions
     * @param x
     * @param y
     * @param z
     * @returns a number in the interval [-1, 1]
     */
    noise4D(x, y, z, w) {
        const perm = this.perm;
        let n0, n1, n2, n3, n4; // Noise contributions from the five corners
        // Skew the (x,y,z,w) space to determine which cell of 24 simplices we're in
        const s = (x + y + z + w) * F4; // Factor for 4D skewing
        const i = Math.floor(x + s);
        const j = Math.floor(y + s);
        const k = Math.floor(z + s);
        const l = Math.floor(w + s);
        const t = (i + j + k + l) * G4; // Factor for 4D unskewing
        const X0 = i - t; // Unskew the cell origin back to (x,y,z,w) space
        const Y0 = j - t;
        const Z0 = k - t;
        const W0 = l - t;
        const x0 = x - X0; // The x,y,z,w distances from the cell origin
        const y0 = y - Y0;
        const z0 = z - Z0;
        const w0 = w - W0;
        // For the 4D case, the simplex is a 4D shape I won't even try to describe.
        // To find out which of the 24 possible simplices we're in, we need to
        // determine the magnitude ordering of x0, y0, z0 and w0.
        // Six pair-wise comparisons are performed between each possible pair
        // of the four coordinates, and the results are used to rank the numbers.
        let rankx = 0;
        let ranky = 0;
        let rankz = 0;
        let rankw = 0;
        if (x0 > y0)
            rankx++;
        else
            ranky++;
        if (x0 > z0)
            rankx++;
        else
            rankz++;
        if (x0 > w0)
            rankx++;
        else
            rankw++;
        if (y0 > z0)
            ranky++;
        else
            rankz++;
        if (y0 > w0)
            ranky++;
        else
            rankw++;
        if (z0 > w0)
            rankz++;
        else
            rankw++;
        // simplex[c] is a 4-vector with the numbers 0, 1, 2 and 3 in some order.
        // Many values of c will never occur, since e.g. x>y>z>w makes x<z, y<w and x<w
        // impossible. Only the 24 indices which have non-zero entries make any sense.
        // We use a thresholding to set the coordinates in turn from the largest magnitude.
        // Rank 3 denotes the largest coordinate.
        // Rank 2 denotes the second largest coordinate.
        // Rank 1 denotes the second smallest coordinate.
        // The integer offsets for the second simplex corner
        const i1 = rankx >= 3 ? 1 : 0;
        const j1 = ranky >= 3 ? 1 : 0;
        const k1 = rankz >= 3 ? 1 : 0;
        const l1 = rankw >= 3 ? 1 : 0;
        // The integer offsets for the third simplex corner
        const i2 = rankx >= 2 ? 1 : 0;
        const j2 = ranky >= 2 ? 1 : 0;
        const k2 = rankz >= 2 ? 1 : 0;
        const l2 = rankw >= 2 ? 1 : 0;
        // The integer offsets for the fourth simplex corner
        const i3 = rankx >= 1 ? 1 : 0;
        const j3 = ranky >= 1 ? 1 : 0;
        const k3 = rankz >= 1 ? 1 : 0;
        const l3 = rankw >= 1 ? 1 : 0;
        // The fifth corner has all coordinate offsets = 1, so no need to compute that.
        const x1 = x0 - i1 + G4; // Offsets for second corner in (x,y,z,w) coords
        const y1 = y0 - j1 + G4;
        const z1 = z0 - k1 + G4;
        const w1 = w0 - l1 + G4;
        const x2 = x0 - i2 + 2.0 * G4; // Offsets for third corner in (x,y,z,w) coords
        const y2 = y0 - j2 + 2.0 * G4;
        const z2 = z0 - k2 + 2.0 * G4;
        const w2 = w0 - l2 + 2.0 * G4;
        const x3 = x0 - i3 + 3.0 * G4; // Offsets for fourth corner in (x,y,z,w) coords
        const y3 = y0 - j3 + 3.0 * G4;
        const z3 = z0 - k3 + 3.0 * G4;
        const w3 = w0 - l3 + 3.0 * G4;
        const x4 = x0 - 1.0 + 4.0 * G4; // Offsets for last corner in (x,y,z,w) coords
        const y4 = y0 - 1.0 + 4.0 * G4;
        const z4 = z0 - 1.0 + 4.0 * G4;
        const w4 = w0 - 1.0 + 4.0 * G4;
        // Work out the hashed gradient indices of the five simplex corners
        const ii = i & 255;
        const jj = j & 255;
        const kk = k & 255;
        const ll = l & 255;
        // Calculate the contribution from the five corners
        let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0 - w0 * w0;
        if (t0 < 0)
            n0 = 0.0;
        else {
            const gi0 = (perm[ii + perm[jj + perm[kk + perm[ll]]]] % 32) * 4;
            t0 *= t0;
            n0 = t0 * t0 * (grad4[gi0] * x0 + grad4[gi0 + 1] * y0 + grad4[gi0 + 2] * z0 + grad4[gi0 + 3] * w0);
        }
        let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1 - w1 * w1;
        if (t1 < 0)
            n1 = 0.0;
        else {
            const gi1 = (perm[ii + i1 + perm[jj + j1 + perm[kk + k1 + perm[ll + l1]]]] % 32) * 4;
            t1 *= t1;
            n1 = t1 * t1 * (grad4[gi1] * x1 + grad4[gi1 + 1] * y1 + grad4[gi1 + 2] * z1 + grad4[gi1 + 3] * w1);
        }
        let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2 - w2 * w2;
        if (t2 < 0)
            n2 = 0.0;
        else {
            const gi2 = (perm[ii + i2 + perm[jj + j2 + perm[kk + k2 + perm[ll + l2]]]] % 32) * 4;
            t2 *= t2;
            n2 = t2 * t2 * (grad4[gi2] * x2 + grad4[gi2 + 1] * y2 + grad4[gi2 + 2] * z2 + grad4[gi2 + 3] * w2);
        }
        let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3 - w3 * w3;
        if (t3 < 0)
            n3 = 0.0;
        else {
            const gi3 = (perm[ii + i3 + perm[jj + j3 + perm[kk + k3 + perm[ll + l3]]]] % 32) * 4;
            t3 *= t3;
            n3 = t3 * t3 * (grad4[gi3] * x3 + grad4[gi3 + 1] * y3 + grad4[gi3 + 2] * z3 + grad4[gi3 + 3] * w3);
        }
        let t4 = 0.6 - x4 * x4 - y4 * y4 - z4 * z4 - w4 * w4;
        if (t4 < 0)
            n4 = 0.0;
        else {
            const gi4 = (perm[ii + 1 + perm[jj + 1 + perm[kk + 1 + perm[ll + 1]]]] % 32) * 4;
            t4 *= t4;
            n4 = t4 * t4 * (grad4[gi4] * x4 + grad4[gi4 + 1] * y4 + grad4[gi4 + 2] * z4 + grad4[gi4 + 3] * w4);
        }
        // Sum up and scale the result to cover the range [-1,1]
        return 27.0 * (n0 + n1 + n2 + n3 + n4);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SimplexNoise);
/**
 * Builds a random permutation table.
 * This is exported only for (internal) testing purposes.
 * Do not rely on this export.
 * @private
 */
function buildPermutationTable(random) {
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) {
        p[i] = i;
    }
    for (let i = 0; i < 255; i++) {
        const r = i + ~~(random() * (256 - i));
        const aux = p[i];
        p[i] = p[r];
        p[r] = aux;
    }
    return p;
}
/*
The ALEA PRNG and masher code used by simplex-noise.js
is based on code by Johannes Baagøe, modified by Jonas Wagner.
See alea.md for the full license.
*/
function alea(seed) {
    let s0 = 0;
    let s1 = 0;
    let s2 = 0;
    let c = 1;
    const mash = masher();
    s0 = mash(' ');
    s1 = mash(' ');
    s2 = mash(' ');
    s0 -= mash(seed);
    if (s0 < 0) {
        s0 += 1;
    }
    s1 -= mash(seed);
    if (s1 < 0) {
        s1 += 1;
    }
    s2 -= mash(seed);
    if (s2 < 0) {
        s2 += 1;
    }
    return function () {
        const t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
        s0 = s1;
        s1 = s2;
        return s2 = t - (c = t | 0);
    };
}
function masher() {
    let n = 0xefc8249d;
    return function (data) {
        data = data.toString();
        for (let i = 0; i < data.length; i++) {
            n += data.charCodeAt(i);
            let h = 0.02519603282416938 * n;
            n = h >>> 0;
            h -= n;
            h *= n;
            n = h >>> 0;
            h -= n;
            n += h * 0x100000000; // 2^32
        }
        return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
    };
}
//# sourceMappingURL=simplex-noise.js.map

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBOztBQUV3RTtBQUNsQztBQUN2QjtBQUNmO0FBQ0EsSUFBSSx1REFBTTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQixtQkFBbUI7QUFDdkM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVcsb0RBQU87QUFDbEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkJBQTZCLCtDQUFNO0FBQ25DOztBQUVBO0FBQ0E7O0FBRUEsb0JBQW9CLG1CQUFtQjtBQUN2QyxzQ0FBc0Msd0RBQVc7QUFDakQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsbUJBQW1CO0FBQ3ZDLFdBQVcsbURBQU07QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixtQkFBbUI7QUFDdkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsbUJBQW1CO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQixtQkFBbUI7QUFDdkM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQixtQkFBbUI7QUFDekM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQixtQkFBbUI7QUFDekM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsbUJBQW1CO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsbUJBQW1CO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsbUJBQW1CO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSxxREFBWTtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxvQkFBb0IsbUJBQW1CO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6UXFDO0FBQ2M7QUFDVDtBQUNKO0FBQ3ZCLHFCQUFxQixtREFBUztBQUM3QztBQUNBLElBQUksdURBQU07QUFDVjtBQUNBOztBQUVBO0FBQ0EsSUFBSSx1REFBTTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxRQUFRLDZEQUFvQjtBQUM1Qjs7QUFFQSx3QkFBd0IsaUJBQWlCO0FBQ3pDLDBCQUEwQixpQkFBaUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBLHNCQUFzQixtQkFBbUI7QUFDekM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0NBQWtDLDREQUFXO0FBQzdDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxvQkFBb0IsZUFBZTtBQUNuQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxvQkFBb0IsZUFBZTtBQUNuQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4RXFDO0FBQ2M7QUFDYjtBQUN2QixxQkFBcUIsbURBQVM7QUFDN0M7QUFDQSxJQUFJLHVEQUFNO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBLElBQUksdURBQU07QUFDVjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWMsNERBQVc7QUFDekI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYyw0REFBVztBQUN6Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG9CQUFvQixtQkFBbUI7QUFDdkM7QUFDQTtBQUNBOztBQUVBLFdBQVcsNERBQVc7QUFDdEI7O0FBRUE7QUFDQTs7QUFFQSxvQkFBb0IsbUJBQW1CO0FBQ3ZDO0FBQ0E7O0FBRUEsV0FBVyw0REFBVztBQUN0Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCLG1CQUFtQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLG1CQUFtQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLG1CQUFtQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUksdURBQU07QUFDVixXQUFXLDREQUFXO0FBQ3RCOztBQUVBO0FBQ0EsSUFBSSx1REFBTTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcko0RDtBQUN6QjtBQUM4RDtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNlLHNCQUFzQixvREFBTTtBQUMzQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUksb0RBQWE7QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsTUFBTTtBQUNOLE1BQU0sbURBQVk7QUFDbEI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjs7QUFFQTtBQUNBO0FBQ0EsSUFBSSxrREFBVztBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsSUFBSSxpREFBVTtBQUNkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLElBQUk7QUFDUjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSSx1REFBZ0I7QUFDcEI7QUFDQTs7QUFFQTtBQUNBLFdBQVcsdURBQWdCO0FBQzNCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUkscURBQWM7QUFDbEI7QUFDQTs7QUFFQTtBQUNBLElBQUks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QUNwQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLDREQUFZO0FBQzNCLG1CQUFtQixnRUFBYyxRQUFRO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHVEQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsdURBQVE7QUFDNUI7QUFDQTtBQUNBLGdCQUFnQix1REFBUTtBQUN4QixnQkFBZ0IsdURBQVE7QUFDeEI7QUFDQTtBQUNBLGdCQUFnQix1REFBUTtBQUN4QjtBQUNBO0FBQ0EsbUJBQW1CLGdFQUFjO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUN1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG9EQUFJO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcHAvLi9ub2RlX21vZHVsZXMvQG1hdGguZ2wvY29yZS9kaXN0L2VzbS9jbGFzc2VzL2Jhc2UvbWF0aC1hcnJheS5qcyIsIndlYnBhY2s6Ly9hcHAvLi9ub2RlX21vZHVsZXMvQG1hdGguZ2wvY29yZS9kaXN0L2VzbS9jbGFzc2VzL2Jhc2UvbWF0cml4LmpzIiwid2VicGFjazovL2FwcC8uL25vZGVfbW9kdWxlcy9AbWF0aC5nbC9jb3JlL2Rpc3QvZXNtL2NsYXNzZXMvYmFzZS92ZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYXBwLy4vbm9kZV9tb2R1bGVzL0BtYXRoLmdsL2NvcmUvZGlzdC9lc20vY2xhc3Nlcy9tYXRyaXg0LmpzIiwid2VicGFjazovL2FwcC8uL25vZGVfbW9kdWxlcy9AbWF0aC5nbC9jb3JlL2Rpc3QvZXNtL2NsYXNzZXMvdmVjdG9yMy5qcyIsIndlYnBhY2s6Ly9hcHAvLi9ub2RlX21vZHVsZXMvQG1hdGguZ2wvY29yZS9kaXN0L2VzbS9saWIvYXNzZXJ0LmpzIiwid2VicGFjazovL2FwcC8uL25vZGVfbW9kdWxlcy9AbWF0aC5nbC9jb3JlL2Rpc3QvZXNtL2xpYi9jb21tb24uanMiLCJ3ZWJwYWNrOi8vYXBwLy4vbm9kZV9tb2R1bGVzL0BtYXRoLmdsL2NvcmUvZGlzdC9lc20vbGliL2dsLW1hdHJpeC1leHRyYXMuanMiLCJ3ZWJwYWNrOi8vYXBwLy4vbm9kZV9tb2R1bGVzL0BtYXRoLmdsL2NvcmUvZGlzdC9lc20vbGliL3ZhbGlkYXRvcnMuanMiLCJ3ZWJwYWNrOi8vYXBwLy4vbm9kZV9tb2R1bGVzL2dsLW1hdHJpeC9lc20vY29tbW9uLmpzIiwid2VicGFjazovL2FwcC8uL25vZGVfbW9kdWxlcy9nbC1tYXRyaXgvZXNtL21hdDQuanMiLCJ3ZWJwYWNrOi8vYXBwLy4vbm9kZV9tb2R1bGVzL2dsLW1hdHJpeC9lc20vdmVjMi5qcyIsIndlYnBhY2s6Ly9hcHAvLi9ub2RlX21vZHVsZXMvZ2wtbWF0cml4L2VzbS92ZWMzLmpzIiwid2VicGFjazovL2FwcC8uL25vZGVfbW9kdWxlcy9nbC1tYXRyaXgvZXNtL3ZlYzQuanMiLCJ3ZWJwYWNrOi8vYXBwLy4vc3JjL2VuZ2luZS9lYy50cyIsIndlYnBhY2s6Ly9hcHAvLi9zcmMvZW5naW5lL2ZyZWVDYW1lcmEudHMiLCJ3ZWJwYWNrOi8vYXBwLy4vc3JjL2VuZ2luZS9wcm9maWxlci50cyIsIndlYnBhY2s6Ly9hcHAvLi9zcmMvZW5naW5lL3N0YXRlLnRzIiwid2VicGFjazovL2FwcC8uL3NyYy9lbmdpbmUvd2luZG93LnRzIiwid2VicGFjazovL2FwcC8uL3NyYy9leGFtcGxlL2NodW5rL2NodW5rLnRzIiwid2VicGFjazovL2FwcC8uL3NyYy9leGFtcGxlL2NodW5rL21lc2gudHMiLCJ3ZWJwYWNrOi8vYXBwLy4vc3JjL2V4YW1wbGUvZ2VuZXJhdGlvbi50cyIsIndlYnBhY2s6Ly9hcHAvLi9zcmMvZXhhbXBsZS9pbmRleC50cyIsIndlYnBhY2s6Ly9hcHAvLi9zcmMvZXhhbXBsZS9wbGF5ZXIudHMiLCJ3ZWJwYWNrOi8vYXBwLy4vc3JjL2V4YW1wbGUvcmVuZGVyLnRzIiwid2VicGFjazovL2FwcC8uL3NyYy9leGFtcGxlL3N5c3RlbXMvY2h1bmsudHMiLCJ3ZWJwYWNrOi8vYXBwLy4vc3JjL2V4YW1wbGUvc3lzdGVtcy9pbnB1dC50cyIsIndlYnBhY2s6Ly9hcHAvLi9zcmMvZXhhbXBsZS9zeXN0ZW1zL3dvcmxkLnRzIiwid2VicGFjazovL2FwcC8uL3NyYy9saWIvbWF0aC50cyIsIndlYnBhY2s6Ly9hcHAvLi9ub2RlX21vZHVsZXMvc2ltcGxleC1ub2lzZS9kaXN0L2VzbS9zaW1wbGV4LW5vaXNlLmpzIiwid2VicGFjazovL2FwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2FwcC93ZWJwYWNrL3J1bnRpbWUvZ2V0IGphdmFzY3JpcHQgY2h1bmsgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vYXBwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYXBwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2FwcC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9hcHAvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gX2V4dGVuZGFibGVCdWlsdGluKGNscykge1xuICBmdW5jdGlvbiBFeHRlbmRhYmxlQnVpbHRpbigpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBSZWZsZWN0LmNvbnN0cnVjdChjbHMsIEFycmF5LmZyb20oYXJndW1lbnRzKSk7XG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGluc3RhbmNlLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxuXG4gIEV4dGVuZGFibGVCdWlsdGluLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoY2xzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogY2xzLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG5cbiAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihFeHRlbmRhYmxlQnVpbHRpbiwgY2xzKTtcbiAgfSBlbHNlIHtcbiAgICBFeHRlbmRhYmxlQnVpbHRpbi5fX3Byb3RvX18gPSBjbHM7XG4gIH1cblxuICByZXR1cm4gRXh0ZW5kYWJsZUJ1aWx0aW47XG59XG5cbmltcG9ydCB7IGNvbmZpZywgZm9ybWF0VmFsdWUsIGVxdWFscywgaXNBcnJheSB9IGZyb20gJy4uLy4uL2xpYi9jb21tb24nO1xuaW1wb3J0IGFzc2VydCBmcm9tICcuLi8uLi9saWIvYXNzZXJ0JztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hdGhBcnJheSBleHRlbmRzIF9leHRlbmRhYmxlQnVpbHRpbihBcnJheSkge1xuICBnZXQgRUxFTUVOVFMoKSB7XG4gICAgYXNzZXJ0KGZhbHNlKTtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3RvcigpLmNvcHkodGhpcyk7XG4gIH1cblxuICBmcm9tKGFycmF5T3JPYmplY3QpIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShhcnJheU9yT2JqZWN0KSA/IHRoaXMuY29weShhcnJheU9yT2JqZWN0KSA6IHRoaXMuZnJvbU9iamVjdChhcnJheU9yT2JqZWN0KTtcbiAgfVxuXG4gIGZyb21BcnJheShhcnJheSwgb2Zmc2V0ID0gMCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5FTEVNRU5UUzsgKytpKSB7XG4gICAgICB0aGlzW2ldID0gYXJyYXlbaSArIG9mZnNldF07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIHRvKGFycmF5T3JPYmplY3QpIHtcbiAgICBpZiAoYXJyYXlPck9iamVjdCA9PT0gdGhpcykge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzQXJyYXkoYXJyYXlPck9iamVjdCkgPyB0aGlzLnRvQXJyYXkoYXJyYXlPck9iamVjdCkgOiB0aGlzLnRvT2JqZWN0KGFycmF5T3JPYmplY3QpO1xuICB9XG5cbiAgdG9UYXJnZXQodGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRhcmdldCA/IHRoaXMudG8odGFyZ2V0KSA6IHRoaXM7XG4gIH1cblxuICB0b0FycmF5KGFycmF5ID0gW10sIG9mZnNldCA9IDApIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuRUxFTUVOVFM7ICsraSkge1xuICAgICAgYXJyYXlbb2Zmc2V0ICsgaV0gPSB0aGlzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBhcnJheTtcbiAgfVxuXG4gIHRvRmxvYXQzMkFycmF5KCkge1xuICAgIHJldHVybiBuZXcgRmxvYXQzMkFycmF5KHRoaXMpO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0U3RyaW5nKGNvbmZpZyk7XG4gIH1cblxuICBmb3JtYXRTdHJpbmcob3B0cykge1xuICAgIGxldCBzdHJpbmcgPSAnJztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5FTEVNRU5UUzsgKytpKSB7XG4gICAgICBzdHJpbmcgKz0gKGkgPiAwID8gJywgJyA6ICcnKSArIGZvcm1hdFZhbHVlKHRoaXNbaV0sIG9wdHMpO1xuICAgIH1cblxuICAgIHJldHVybiBcIlwiLmNvbmNhdChvcHRzLnByaW50VHlwZXMgPyB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgOiAnJywgXCJbXCIpLmNvbmNhdChzdHJpbmcsIFwiXVwiKTtcbiAgfVxuXG4gIGVxdWFscyhhcnJheSkge1xuICAgIGlmICghYXJyYXkgfHwgdGhpcy5sZW5ndGggIT09IGFycmF5Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5FTEVNRU5UUzsgKytpKSB7XG4gICAgICBpZiAoIWVxdWFscyh0aGlzW2ldLCBhcnJheVtpXSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZXhhY3RFcXVhbHMoYXJyYXkpIHtcbiAgICBpZiAoIWFycmF5IHx8IHRoaXMubGVuZ3RoICE9PSBhcnJheS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuRUxFTUVOVFM7ICsraSkge1xuICAgICAgaWYgKHRoaXNbaV0gIT09IGFycmF5W2ldKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIG5lZ2F0ZSgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuRUxFTUVOVFM7ICsraSkge1xuICAgICAgdGhpc1tpXSA9IC10aGlzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNoZWNrKCk7XG4gIH1cblxuICBsZXJwKGEsIGIsIHQpIHtcbiAgICBpZiAodCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0ID0gYjtcbiAgICAgIGIgPSBhO1xuICAgICAgYSA9IHRoaXM7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLkVMRU1FTlRTOyArK2kpIHtcbiAgICAgIGNvbnN0IGFpID0gYVtpXTtcbiAgICAgIHRoaXNbaV0gPSBhaSArIHQgKiAoYltpXSAtIGFpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgbWluKHZlY3Rvcikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5FTEVNRU5UUzsgKytpKSB7XG4gICAgICB0aGlzW2ldID0gTWF0aC5taW4odmVjdG9yW2ldLCB0aGlzW2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgbWF4KHZlY3Rvcikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5FTEVNRU5UUzsgKytpKSB7XG4gICAgICB0aGlzW2ldID0gTWF0aC5tYXgodmVjdG9yW2ldLCB0aGlzW2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgY2xhbXAobWluVmVjdG9yLCBtYXhWZWN0b3IpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuRUxFTUVOVFM7ICsraSkge1xuICAgICAgdGhpc1tpXSA9IE1hdGgubWluKE1hdGgubWF4KHRoaXNbaV0sIG1pblZlY3RvcltpXSksIG1heFZlY3RvcltpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIGFkZCguLi52ZWN0b3JzKSB7XG4gICAgZm9yIChjb25zdCB2ZWN0b3Igb2YgdmVjdG9ycykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLkVMRU1FTlRTOyArK2kpIHtcbiAgICAgICAgdGhpc1tpXSArPSB2ZWN0b3JbaV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIHN1YnRyYWN0KC4uLnZlY3RvcnMpIHtcbiAgICBmb3IgKGNvbnN0IHZlY3RvciBvZiB2ZWN0b3JzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuRUxFTUVOVFM7ICsraSkge1xuICAgICAgICB0aGlzW2ldIC09IHZlY3RvcltpXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgc2NhbGUoc2NhbGUpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShzY2FsZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLm11bHRpcGx5KHNjYWxlKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuRUxFTUVOVFM7ICsraSkge1xuICAgICAgdGhpc1tpXSAqPSBzY2FsZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgc3ViKGEpIHtcbiAgICByZXR1cm4gdGhpcy5zdWJ0cmFjdChhKTtcbiAgfVxuXG4gIHNldFNjYWxhcihhKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLkVMRU1FTlRTOyArK2kpIHtcbiAgICAgIHRoaXNbaV0gPSBhO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNoZWNrKCk7XG4gIH1cblxuICBhZGRTY2FsYXIoYSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5FTEVNRU5UUzsgKytpKSB7XG4gICAgICB0aGlzW2ldICs9IGE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIHN1YlNjYWxhcihhKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRkU2NhbGFyKC1hKTtcbiAgfVxuXG4gIG11bHRpcGx5U2NhbGFyKHNjYWxhcikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5FTEVNRU5UUzsgKytpKSB7XG4gICAgICB0aGlzW2ldICo9IHNjYWxhcjtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgZGl2aWRlU2NhbGFyKGEpIHtcbiAgICByZXR1cm4gdGhpcy5zY2FsZSgxIC8gYSk7XG4gIH1cblxuICBjbGFtcFNjYWxhcihtaW4sIG1heCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5FTEVNRU5UUzsgKytpKSB7XG4gICAgICB0aGlzW2ldID0gTWF0aC5taW4oTWF0aC5tYXgodGhpc1tpXSwgbWluKSwgbWF4KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgbXVsdGlwbHlCeVNjYWxhcihzY2FsYXIpIHtcbiAgICByZXR1cm4gdGhpcy5zY2FsZShzY2FsYXIpO1xuICB9XG5cbiAgZ2V0IGVsZW1lbnRzKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY2hlY2soKSB7XG4gICAgaWYgKGNvbmZpZy5kZWJ1ZyAmJiAhdGhpcy52YWxpZGF0ZSgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJtYXRoLmdsOiBcIi5jb25jYXQodGhpcy5jb25zdHJ1Y3Rvci5uYW1lLCBcIiBzb21lIGZpZWxkcyBzZXQgdG8gaW52YWxpZCBudW1iZXJzJ1wiKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB2YWxpZGF0ZSgpIHtcbiAgICBsZXQgdmFsaWQgPSB0aGlzLmxlbmd0aCA9PT0gdGhpcy5FTEVNRU5UUztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5FTEVNRU5UUzsgKytpKSB7XG4gICAgICB2YWxpZCA9IHZhbGlkICYmIE51bWJlci5pc0Zpbml0ZSh0aGlzW2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWQ7XG4gIH1cblxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWF0aC1hcnJheS5qcy5tYXAiLCJpbXBvcnQgTWF0aEFycmF5IGZyb20gJy4vbWF0aC1hcnJheSc7XG5pbXBvcnQgeyBjaGVja051bWJlciB9IGZyb20gJy4uLy4uL2xpYi92YWxpZGF0b3JzJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uLy4uL2xpYi9jb21tb24nO1xuaW1wb3J0IGFzc2VydCBmcm9tICcuLi8uLi9saWIvYXNzZXJ0JztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hdHJpeCBleHRlbmRzIE1hdGhBcnJheSB7XG4gIGdldCBFTEVNRU5UUygpIHtcbiAgICBhc3NlcnQoZmFsc2UpO1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgZ2V0IFJBTksoKSB7XG4gICAgYXNzZXJ0KGZhbHNlKTtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIGxldCBzdHJpbmcgPSAnWyc7XG5cbiAgICBpZiAoY29uZmlnLnByaW50Um93TWFqb3IpIHtcbiAgICAgIHN0cmluZyArPSAncm93LW1ham9yOic7XG5cbiAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHRoaXMuUkFOSzsgKytyb3cpIHtcbiAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgdGhpcy5SQU5LOyArK2NvbCkge1xuICAgICAgICAgIHN0cmluZyArPSBcIiBcIi5jb25jYXQodGhpc1tjb2wgKiB0aGlzLlJBTksgKyByb3ddKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHJpbmcgKz0gJ2NvbHVtbi1tYWpvcjonO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuRUxFTUVOVFM7ICsraSkge1xuICAgICAgICBzdHJpbmcgKz0gXCIgXCIuY29uY2F0KHRoaXNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN0cmluZyArPSAnXSc7XG4gICAgcmV0dXJuIHN0cmluZztcbiAgfVxuXG4gIGdldEVsZW1lbnRJbmRleChyb3csIGNvbCkge1xuICAgIHJldHVybiBjb2wgKiB0aGlzLlJBTksgKyByb3c7XG4gIH1cblxuICBnZXRFbGVtZW50KHJvdywgY29sKSB7XG4gICAgcmV0dXJuIHRoaXNbY29sICogdGhpcy5SQU5LICsgcm93XTtcbiAgfVxuXG4gIHNldEVsZW1lbnQocm93LCBjb2wsIHZhbHVlKSB7XG4gICAgdGhpc1tjb2wgKiB0aGlzLlJBTksgKyByb3ddID0gY2hlY2tOdW1iZXIodmFsdWUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0Q29sdW1uKGNvbHVtbkluZGV4LCByZXN1bHQgPSBuZXcgQXJyYXkodGhpcy5SQU5LKS5maWxsKC0wKSkge1xuICAgIGNvbnN0IGZpcnN0SW5kZXggPSBjb2x1bW5JbmRleCAqIHRoaXMuUkFOSztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5SQU5LOyArK2kpIHtcbiAgICAgIHJlc3VsdFtpXSA9IHRoaXNbZmlyc3RJbmRleCArIGldO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBzZXRDb2x1bW4oY29sdW1uSW5kZXgsIGNvbHVtblZlY3Rvcikge1xuICAgIGNvbnN0IGZpcnN0SW5kZXggPSBjb2x1bW5JbmRleCAqIHRoaXMuUkFOSztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5SQU5LOyArK2kpIHtcbiAgICAgIHRoaXNbZmlyc3RJbmRleCArIGldID0gY29sdW1uVmVjdG9yW2ldO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hdHJpeC5qcy5tYXAiLCJpbXBvcnQgTWF0aEFycmF5IGZyb20gJy4vbWF0aC1hcnJheSc7XG5pbXBvcnQgeyBjaGVja051bWJlciB9IGZyb20gJy4uLy4uL2xpYi92YWxpZGF0b3JzJztcbmltcG9ydCBhc3NlcnQgZnJvbSAnLi4vLi4vbGliL2Fzc2VydCc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZWN0b3IgZXh0ZW5kcyBNYXRoQXJyYXkge1xuICBnZXQgRUxFTUVOVFMoKSB7XG4gICAgYXNzZXJ0KGZhbHNlKTtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGNvcHkodmVjdG9yKSB7XG4gICAgYXNzZXJ0KGZhbHNlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldCB4KCkge1xuICAgIHJldHVybiB0aGlzWzBdO1xuICB9XG5cbiAgc2V0IHgodmFsdWUpIHtcbiAgICB0aGlzWzBdID0gY2hlY2tOdW1iZXIodmFsdWUpO1xuICB9XG5cbiAgZ2V0IHkoKSB7XG4gICAgcmV0dXJuIHRoaXNbMV07XG4gIH1cblxuICBzZXQgeSh2YWx1ZSkge1xuICAgIHRoaXNbMV0gPSBjaGVja051bWJlcih2YWx1ZSk7XG4gIH1cblxuICBsZW4oKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmxlbmd0aFNxdWFyZWQoKSk7XG4gIH1cblxuICBtYWduaXR1ZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMubGVuKCk7XG4gIH1cblxuICBsZW5ndGhTcXVhcmVkKCkge1xuICAgIGxldCBsZW5ndGggPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLkVMRU1FTlRTOyArK2kpIHtcbiAgICAgIGxlbmd0aCArPSB0aGlzW2ldICogdGhpc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGVuZ3RoO1xuICB9XG5cbiAgbWFnbml0dWRlU3F1YXJlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5sZW5ndGhTcXVhcmVkKCk7XG4gIH1cblxuICBkaXN0YW5jZShtYXRoQXJyYXkpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMuZGlzdGFuY2VTcXVhcmVkKG1hdGhBcnJheSkpO1xuICB9XG5cbiAgZGlzdGFuY2VTcXVhcmVkKG1hdGhBcnJheSkge1xuICAgIGxldCBsZW5ndGggPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLkVMRU1FTlRTOyArK2kpIHtcbiAgICAgIGNvbnN0IGRpc3QgPSB0aGlzW2ldIC0gbWF0aEFycmF5W2ldO1xuICAgICAgbGVuZ3RoICs9IGRpc3QgKiBkaXN0O1xuICAgIH1cblxuICAgIHJldHVybiBjaGVja051bWJlcihsZW5ndGgpO1xuICB9XG5cbiAgZG90KG1hdGhBcnJheSkge1xuICAgIGxldCBwcm9kdWN0ID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5FTEVNRU5UUzsgKytpKSB7XG4gICAgICBwcm9kdWN0ICs9IHRoaXNbaV0gKiBtYXRoQXJyYXlbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGNoZWNrTnVtYmVyKHByb2R1Y3QpO1xuICB9XG5cbiAgbm9ybWFsaXplKCkge1xuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMubWFnbml0dWRlKCk7XG5cbiAgICBpZiAobGVuZ3RoICE9PSAwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuRUxFTUVOVFM7ICsraSkge1xuICAgICAgICB0aGlzW2ldIC89IGxlbmd0aDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgbXVsdGlwbHkoLi4udmVjdG9ycykge1xuICAgIGZvciAoY29uc3QgdmVjdG9yIG9mIHZlY3RvcnMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5FTEVNRU5UUzsgKytpKSB7XG4gICAgICAgIHRoaXNbaV0gKj0gdmVjdG9yW2ldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNoZWNrKCk7XG4gIH1cblxuICBkaXZpZGUoLi4udmVjdG9ycykge1xuICAgIGZvciAoY29uc3QgdmVjdG9yIG9mIHZlY3RvcnMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5FTEVNRU5UUzsgKytpKSB7XG4gICAgICAgIHRoaXNbaV0gLz0gdmVjdG9yW2ldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNoZWNrKCk7XG4gIH1cblxuICBsZW5ndGhTcSgpIHtcbiAgICByZXR1cm4gdGhpcy5sZW5ndGhTcXVhcmVkKCk7XG4gIH1cblxuICBkaXN0YW5jZVRvKHZlY3Rvcikge1xuICAgIHJldHVybiB0aGlzLmRpc3RhbmNlKHZlY3Rvcik7XG4gIH1cblxuICBkaXN0YW5jZVRvU3F1YXJlZCh2ZWN0b3IpIHtcbiAgICByZXR1cm4gdGhpcy5kaXN0YW5jZVNxdWFyZWQodmVjdG9yKTtcbiAgfVxuXG4gIGdldENvbXBvbmVudChpKSB7XG4gICAgYXNzZXJ0KGkgPj0gMCAmJiBpIDwgdGhpcy5FTEVNRU5UUywgJ2luZGV4IGlzIG91dCBvZiByYW5nZScpO1xuICAgIHJldHVybiBjaGVja051bWJlcih0aGlzW2ldKTtcbiAgfVxuXG4gIHNldENvbXBvbmVudChpLCB2YWx1ZSkge1xuICAgIGFzc2VydChpID49IDAgJiYgaSA8IHRoaXMuRUxFTUVOVFMsICdpbmRleCBpcyBvdXQgb2YgcmFuZ2UnKTtcbiAgICB0aGlzW2ldID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIGFkZFZlY3RvcnMoYSwgYikge1xuICAgIHJldHVybiB0aGlzLmNvcHkoYSkuYWRkKGIpO1xuICB9XG5cbiAgc3ViVmVjdG9ycyhhLCBiKSB7XG4gICAgcmV0dXJuIHRoaXMuY29weShhKS5zdWJ0cmFjdChiKTtcbiAgfVxuXG4gIG11bHRpcGx5VmVjdG9ycyhhLCBiKSB7XG4gICAgcmV0dXJuIHRoaXMuY29weShhKS5tdWx0aXBseShiKTtcbiAgfVxuXG4gIGFkZFNjYWxlZFZlY3RvcihhLCBiKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRkKG5ldyB0aGlzLmNvbnN0cnVjdG9yKGEpLm11bHRpcGx5U2NhbGFyKGIpKTtcbiAgfVxuXG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD12ZWN0b3IuanMubWFwIiwiaW1wb3J0IHsgY2hlY2tWZWN0b3IsIGRlcHJlY2F0ZWQgfSBmcm9tICcuLi9saWIvdmFsaWRhdG9ycyc7XG5pbXBvcnQgTWF0cml4IGZyb20gJy4vYmFzZS9tYXRyaXgnO1xuaW1wb3J0IHsgdmVjMl90cmFuc2Zvcm1NYXQ0QXNWZWN0b3IsIHZlYzNfdHJhbnNmb3JtTWF0NEFzVmVjdG9yIH0gZnJvbSAnLi4vbGliL2dsLW1hdHJpeC1leHRyYXMnO1xuaW1wb3J0ICogYXMgbWF0NCBmcm9tICdnbC1tYXRyaXgvbWF0NCc7XG5pbXBvcnQgKiBhcyB2ZWMyIGZyb20gJ2dsLW1hdHJpeC92ZWMyJztcbmltcG9ydCAqIGFzIHZlYzMgZnJvbSAnZ2wtbWF0cml4L3ZlYzMnO1xuaW1wb3J0ICogYXMgdmVjNCBmcm9tICdnbC1tYXRyaXgvdmVjNCc7XG5jb25zdCBJREVOVElUWSA9IE9iamVjdC5mcmVlemUoWzEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDFdKTtcbmNvbnN0IFpFUk8gPSBPYmplY3QuZnJlZXplKFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSk7XG5jb25zdCBJTkRJQ0VTID0gT2JqZWN0LmZyZWV6ZSh7XG4gIENPTDBST1cwOiAwLFxuICBDT0wwUk9XMTogMSxcbiAgQ09MMFJPVzI6IDIsXG4gIENPTDBST1czOiAzLFxuICBDT0wxUk9XMDogNCxcbiAgQ09MMVJPVzE6IDUsXG4gIENPTDFST1cyOiA2LFxuICBDT0wxUk9XMzogNyxcbiAgQ09MMlJPVzA6IDgsXG4gIENPTDJST1cxOiA5LFxuICBDT0wyUk9XMjogMTAsXG4gIENPTDJST1czOiAxMSxcbiAgQ09MM1JPVzA6IDEyLFxuICBDT0wzUk9XMTogMTMsXG4gIENPTDNST1cyOiAxNCxcbiAgQ09MM1JPVzM6IDE1XG59KTtcbmNvbnN0IGNvbnN0YW50cyA9IHt9O1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWF0cml4NCBleHRlbmRzIE1hdHJpeCB7XG4gIHN0YXRpYyBnZXQgSURFTlRJVFkoKSB7XG4gICAgY29uc3RhbnRzLklERU5USVRZID0gY29uc3RhbnRzLklERU5USVRZIHx8IE9iamVjdC5mcmVlemUobmV3IE1hdHJpeDQoSURFTlRJVFkpKTtcbiAgICByZXR1cm4gY29uc3RhbnRzLklERU5USVRZO1xuICB9XG5cbiAgc3RhdGljIGdldCBaRVJPKCkge1xuICAgIGNvbnN0YW50cy5aRVJPID0gY29uc3RhbnRzLlpFUk8gfHwgT2JqZWN0LmZyZWV6ZShuZXcgTWF0cml4NChaRVJPKSk7XG4gICAgcmV0dXJuIGNvbnN0YW50cy5aRVJPO1xuICB9XG5cbiAgZ2V0IElORElDRVMoKSB7XG4gICAgcmV0dXJuIElORElDRVM7XG4gIH1cblxuICBnZXQgRUxFTUVOVFMoKSB7XG4gICAgcmV0dXJuIDE2O1xuICB9XG5cbiAgZ2V0IFJBTksoKSB7XG4gICAgcmV0dXJuIDQ7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihhcnJheSkge1xuICAgIHN1cGVyKC0wLCAtMCwgLTAsIC0wLCAtMCwgLTAsIC0wLCAtMCwgLTAsIC0wLCAtMCwgLTAsIC0wLCAtMCwgLTAsIC0wKTtcblxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIEFycmF5LmlzQXJyYXkoYXJyYXkpKSB7XG4gICAgICB0aGlzLmNvcHkoYXJyYXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlkZW50aXR5KCk7XG4gICAgfVxuICB9XG5cbiAgY29weShhcnJheSkge1xuICAgIHRoaXNbMF0gPSBhcnJheVswXTtcbiAgICB0aGlzWzFdID0gYXJyYXlbMV07XG4gICAgdGhpc1syXSA9IGFycmF5WzJdO1xuICAgIHRoaXNbM10gPSBhcnJheVszXTtcbiAgICB0aGlzWzRdID0gYXJyYXlbNF07XG4gICAgdGhpc1s1XSA9IGFycmF5WzVdO1xuICAgIHRoaXNbNl0gPSBhcnJheVs2XTtcbiAgICB0aGlzWzddID0gYXJyYXlbN107XG4gICAgdGhpc1s4XSA9IGFycmF5WzhdO1xuICAgIHRoaXNbOV0gPSBhcnJheVs5XTtcbiAgICB0aGlzWzEwXSA9IGFycmF5WzEwXTtcbiAgICB0aGlzWzExXSA9IGFycmF5WzExXTtcbiAgICB0aGlzWzEyXSA9IGFycmF5WzEyXTtcbiAgICB0aGlzWzEzXSA9IGFycmF5WzEzXTtcbiAgICB0aGlzWzE0XSA9IGFycmF5WzE0XTtcbiAgICB0aGlzWzE1XSA9IGFycmF5WzE1XTtcbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgc2V0KG0wMCwgbTEwLCBtMjAsIG0zMCwgbTAxLCBtMTEsIG0yMSwgbTMxLCBtMDIsIG0xMiwgbTIyLCBtMzIsIG0wMywgbTEzLCBtMjMsIG0zMykge1xuICAgIHRoaXNbMF0gPSBtMDA7XG4gICAgdGhpc1sxXSA9IG0xMDtcbiAgICB0aGlzWzJdID0gbTIwO1xuICAgIHRoaXNbM10gPSBtMzA7XG4gICAgdGhpc1s0XSA9IG0wMTtcbiAgICB0aGlzWzVdID0gbTExO1xuICAgIHRoaXNbNl0gPSBtMjE7XG4gICAgdGhpc1s3XSA9IG0zMTtcbiAgICB0aGlzWzhdID0gbTAyO1xuICAgIHRoaXNbOV0gPSBtMTI7XG4gICAgdGhpc1sxMF0gPSBtMjI7XG4gICAgdGhpc1sxMV0gPSBtMzI7XG4gICAgdGhpc1sxMl0gPSBtMDM7XG4gICAgdGhpc1sxM10gPSBtMTM7XG4gICAgdGhpc1sxNF0gPSBtMjM7XG4gICAgdGhpc1sxNV0gPSBtMzM7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIHNldFJvd01ham9yKG0wMCwgbTAxLCBtMDIsIG0wMywgbTEwLCBtMTEsIG0xMiwgbTEzLCBtMjAsIG0yMSwgbTIyLCBtMjMsIG0zMCwgbTMxLCBtMzIsIG0zMykge1xuICAgIHRoaXNbMF0gPSBtMDA7XG4gICAgdGhpc1sxXSA9IG0xMDtcbiAgICB0aGlzWzJdID0gbTIwO1xuICAgIHRoaXNbM10gPSBtMzA7XG4gICAgdGhpc1s0XSA9IG0wMTtcbiAgICB0aGlzWzVdID0gbTExO1xuICAgIHRoaXNbNl0gPSBtMjE7XG4gICAgdGhpc1s3XSA9IG0zMTtcbiAgICB0aGlzWzhdID0gbTAyO1xuICAgIHRoaXNbOV0gPSBtMTI7XG4gICAgdGhpc1sxMF0gPSBtMjI7XG4gICAgdGhpc1sxMV0gPSBtMzI7XG4gICAgdGhpc1sxMl0gPSBtMDM7XG4gICAgdGhpc1sxM10gPSBtMTM7XG4gICAgdGhpc1sxNF0gPSBtMjM7XG4gICAgdGhpc1sxNV0gPSBtMzM7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIHRvUm93TWFqb3IocmVzdWx0KSB7XG4gICAgcmVzdWx0WzBdID0gdGhpc1swXTtcbiAgICByZXN1bHRbMV0gPSB0aGlzWzRdO1xuICAgIHJlc3VsdFsyXSA9IHRoaXNbOF07XG4gICAgcmVzdWx0WzNdID0gdGhpc1sxMl07XG4gICAgcmVzdWx0WzRdID0gdGhpc1sxXTtcbiAgICByZXN1bHRbNV0gPSB0aGlzWzVdO1xuICAgIHJlc3VsdFs2XSA9IHRoaXNbOV07XG4gICAgcmVzdWx0WzddID0gdGhpc1sxM107XG4gICAgcmVzdWx0WzhdID0gdGhpc1syXTtcbiAgICByZXN1bHRbOV0gPSB0aGlzWzZdO1xuICAgIHJlc3VsdFsxMF0gPSB0aGlzWzEwXTtcbiAgICByZXN1bHRbMTFdID0gdGhpc1sxNF07XG4gICAgcmVzdWx0WzEyXSA9IHRoaXNbM107XG4gICAgcmVzdWx0WzEzXSA9IHRoaXNbN107XG4gICAgcmVzdWx0WzE0XSA9IHRoaXNbMTFdO1xuICAgIHJlc3VsdFsxNV0gPSB0aGlzWzE1XTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaWRlbnRpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29weShJREVOVElUWSk7XG4gIH1cblxuICBmcm9tUXVhdGVybmlvbihxKSB7XG4gICAgbWF0NC5mcm9tUXVhdCh0aGlzLCBxKTtcbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgZnJ1c3R1bSh7XG4gICAgbGVmdCxcbiAgICByaWdodCxcbiAgICBib3R0b20sXG4gICAgdG9wLFxuICAgIG5lYXIsXG4gICAgZmFyXG4gIH0pIHtcbiAgICBpZiAoZmFyID09PSBJbmZpbml0eSkge1xuICAgICAgTWF0cml4NC5fY29tcHV0ZUluZmluaXRlUGVyc3BlY3RpdmVPZmZDZW50ZXIodGhpcywgbGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWF0NC5mcnVzdHVtKHRoaXMsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgc3RhdGljIF9jb21wdXRlSW5maW5pdGVQZXJzcGVjdGl2ZU9mZkNlbnRlcihyZXN1bHQsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhcikge1xuICAgIGNvbnN0IGNvbHVtbjBSb3cwID0gMi4wICogbmVhciAvIChyaWdodCAtIGxlZnQpO1xuICAgIGNvbnN0IGNvbHVtbjFSb3cxID0gMi4wICogbmVhciAvICh0b3AgLSBib3R0b20pO1xuICAgIGNvbnN0IGNvbHVtbjJSb3cwID0gKHJpZ2h0ICsgbGVmdCkgLyAocmlnaHQgLSBsZWZ0KTtcbiAgICBjb25zdCBjb2x1bW4yUm93MSA9ICh0b3AgKyBib3R0b20pIC8gKHRvcCAtIGJvdHRvbSk7XG4gICAgY29uc3QgY29sdW1uMlJvdzIgPSAtMS4wO1xuICAgIGNvbnN0IGNvbHVtbjJSb3czID0gLTEuMDtcbiAgICBjb25zdCBjb2x1bW4zUm93MiA9IC0yLjAgKiBuZWFyO1xuICAgIHJlc3VsdFswXSA9IGNvbHVtbjBSb3cwO1xuICAgIHJlc3VsdFsxXSA9IDAuMDtcbiAgICByZXN1bHRbMl0gPSAwLjA7XG4gICAgcmVzdWx0WzNdID0gMC4wO1xuICAgIHJlc3VsdFs0XSA9IDAuMDtcbiAgICByZXN1bHRbNV0gPSBjb2x1bW4xUm93MTtcbiAgICByZXN1bHRbNl0gPSAwLjA7XG4gICAgcmVzdWx0WzddID0gMC4wO1xuICAgIHJlc3VsdFs4XSA9IGNvbHVtbjJSb3cwO1xuICAgIHJlc3VsdFs5XSA9IGNvbHVtbjJSb3cxO1xuICAgIHJlc3VsdFsxMF0gPSBjb2x1bW4yUm93MjtcbiAgICByZXN1bHRbMTFdID0gY29sdW1uMlJvdzM7XG4gICAgcmVzdWx0WzEyXSA9IDAuMDtcbiAgICByZXN1bHRbMTNdID0gMC4wO1xuICAgIHJlc3VsdFsxNF0gPSBjb2x1bW4zUm93MjtcbiAgICByZXN1bHRbMTVdID0gMC4wO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBsb29rQXQoZXllLCBjZW50ZXIsIHVwKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICh7XG4gICAgICAgIGV5ZSxcbiAgICAgICAgY2VudGVyLFxuICAgICAgICB1cFxuICAgICAgfSA9IGV5ZSk7XG4gICAgfVxuXG4gICAgY2VudGVyID0gY2VudGVyIHx8IFswLCAwLCAwXTtcbiAgICB1cCA9IHVwIHx8IFswLCAxLCAwXTtcbiAgICBtYXQ0Lmxvb2tBdCh0aGlzLCBleWUsIGNlbnRlciwgdXApO1xuICAgIHJldHVybiB0aGlzLmNoZWNrKCk7XG4gIH1cblxuICBvcnRobyh7XG4gICAgbGVmdCxcbiAgICByaWdodCxcbiAgICBib3R0b20sXG4gICAgdG9wLFxuICAgIG5lYXIgPSAwLjEsXG4gICAgZmFyID0gNTAwXG4gIH0pIHtcbiAgICBtYXQ0Lm9ydGhvKHRoaXMsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyKTtcbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgb3J0aG9ncmFwaGljKHtcbiAgICBmb3Z5ID0gNDUgKiBNYXRoLlBJIC8gMTgwLFxuICAgIGFzcGVjdCA9IDEsXG4gICAgZm9jYWxEaXN0YW5jZSA9IDEsXG4gICAgbmVhciA9IDAuMSxcbiAgICBmYXIgPSA1MDBcbiAgfSkge1xuICAgIGlmIChmb3Z5ID4gTWF0aC5QSSAqIDIpIHtcbiAgICAgIHRocm93IEVycm9yKCdyYWRpYW5zJyk7XG4gICAgfVxuXG4gICAgY29uc3QgaGFsZlkgPSBmb3Z5IC8gMjtcbiAgICBjb25zdCB0b3AgPSBmb2NhbERpc3RhbmNlICogTWF0aC50YW4oaGFsZlkpO1xuICAgIGNvbnN0IHJpZ2h0ID0gdG9wICogYXNwZWN0O1xuICAgIHJldHVybiBuZXcgTWF0cml4NCgpLm9ydGhvKHtcbiAgICAgIGxlZnQ6IC1yaWdodCxcbiAgICAgIHJpZ2h0LFxuICAgICAgYm90dG9tOiAtdG9wLFxuICAgICAgdG9wLFxuICAgICAgbmVhcixcbiAgICAgIGZhclxuICAgIH0pO1xuICB9XG5cbiAgcGVyc3BlY3RpdmUoe1xuICAgIGZvdnkgPSB1bmRlZmluZWQsXG4gICAgZm92ID0gNDUgKiBNYXRoLlBJIC8gMTgwLFxuICAgIGFzcGVjdCA9IDEsXG4gICAgbmVhciA9IDAuMSxcbiAgICBmYXIgPSA1MDBcbiAgfSA9IHt9KSB7XG4gICAgZm92eSA9IGZvdnkgfHwgZm92O1xuXG4gICAgaWYgKGZvdnkgPiBNYXRoLlBJICogMikge1xuICAgICAgdGhyb3cgRXJyb3IoJ3JhZGlhbnMnKTtcbiAgICB9XG5cbiAgICBtYXQ0LnBlcnNwZWN0aXZlKHRoaXMsIGZvdnksIGFzcGVjdCwgbmVhciwgZmFyKTtcbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgZGV0ZXJtaW5hbnQoKSB7XG4gICAgcmV0dXJuIG1hdDQuZGV0ZXJtaW5hbnQodGhpcyk7XG4gIH1cblxuICBnZXRTY2FsZShyZXN1bHQgPSBbLTAsIC0wLCAtMF0pIHtcbiAgICByZXN1bHRbMF0gPSBNYXRoLnNxcnQodGhpc1swXSAqIHRoaXNbMF0gKyB0aGlzWzFdICogdGhpc1sxXSArIHRoaXNbMl0gKiB0aGlzWzJdKTtcbiAgICByZXN1bHRbMV0gPSBNYXRoLnNxcnQodGhpc1s0XSAqIHRoaXNbNF0gKyB0aGlzWzVdICogdGhpc1s1XSArIHRoaXNbNl0gKiB0aGlzWzZdKTtcbiAgICByZXN1bHRbMl0gPSBNYXRoLnNxcnQodGhpc1s4XSAqIHRoaXNbOF0gKyB0aGlzWzldICogdGhpc1s5XSArIHRoaXNbMTBdICogdGhpc1sxMF0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBnZXRUcmFuc2xhdGlvbihyZXN1bHQgPSBbLTAsIC0wLCAtMF0pIHtcbiAgICByZXN1bHRbMF0gPSB0aGlzWzEyXTtcbiAgICByZXN1bHRbMV0gPSB0aGlzWzEzXTtcbiAgICByZXN1bHRbMl0gPSB0aGlzWzE0XTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZ2V0Um90YXRpb24ocmVzdWx0ID0gWy0wLCAtMCwgLTAsIC0wLCAtMCwgLTAsIC0wLCAtMCwgLTAsIC0wLCAtMCwgLTAsIC0wLCAtMCwgLTAsIC0wXSwgc2NhbGVSZXN1bHQgPSBudWxsKSB7XG4gICAgY29uc3Qgc2NhbGUgPSB0aGlzLmdldFNjYWxlKHNjYWxlUmVzdWx0IHx8IFstMCwgLTAsIC0wXSk7XG4gICAgY29uc3QgaW52ZXJzZVNjYWxlMCA9IDEgLyBzY2FsZVswXTtcbiAgICBjb25zdCBpbnZlcnNlU2NhbGUxID0gMSAvIHNjYWxlWzFdO1xuICAgIGNvbnN0IGludmVyc2VTY2FsZTIgPSAxIC8gc2NhbGVbMl07XG4gICAgcmVzdWx0WzBdID0gdGhpc1swXSAqIGludmVyc2VTY2FsZTA7XG4gICAgcmVzdWx0WzFdID0gdGhpc1sxXSAqIGludmVyc2VTY2FsZTE7XG4gICAgcmVzdWx0WzJdID0gdGhpc1syXSAqIGludmVyc2VTY2FsZTI7XG4gICAgcmVzdWx0WzNdID0gMDtcbiAgICByZXN1bHRbNF0gPSB0aGlzWzRdICogaW52ZXJzZVNjYWxlMDtcbiAgICByZXN1bHRbNV0gPSB0aGlzWzVdICogaW52ZXJzZVNjYWxlMTtcbiAgICByZXN1bHRbNl0gPSB0aGlzWzZdICogaW52ZXJzZVNjYWxlMjtcbiAgICByZXN1bHRbN10gPSAwO1xuICAgIHJlc3VsdFs4XSA9IHRoaXNbOF0gKiBpbnZlcnNlU2NhbGUwO1xuICAgIHJlc3VsdFs5XSA9IHRoaXNbOV0gKiBpbnZlcnNlU2NhbGUxO1xuICAgIHJlc3VsdFsxMF0gPSB0aGlzWzEwXSAqIGludmVyc2VTY2FsZTI7XG4gICAgcmVzdWx0WzExXSA9IDA7XG4gICAgcmVzdWx0WzEyXSA9IDA7XG4gICAgcmVzdWx0WzEzXSA9IDA7XG4gICAgcmVzdWx0WzE0XSA9IDA7XG4gICAgcmVzdWx0WzE1XSA9IDE7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGdldFJvdGF0aW9uTWF0cml4MyhyZXN1bHQgPSBbLTAsIC0wLCAtMCwgLTAsIC0wLCAtMCwgLTAsIC0wLCAtMF0sIHNjYWxlUmVzdWx0ID0gbnVsbCkge1xuICAgIGNvbnN0IHNjYWxlID0gdGhpcy5nZXRTY2FsZShzY2FsZVJlc3VsdCB8fCBbLTAsIC0wLCAtMF0pO1xuICAgIGNvbnN0IGludmVyc2VTY2FsZTAgPSAxIC8gc2NhbGVbMF07XG4gICAgY29uc3QgaW52ZXJzZVNjYWxlMSA9IDEgLyBzY2FsZVsxXTtcbiAgICBjb25zdCBpbnZlcnNlU2NhbGUyID0gMSAvIHNjYWxlWzJdO1xuICAgIHJlc3VsdFswXSA9IHRoaXNbMF0gKiBpbnZlcnNlU2NhbGUwO1xuICAgIHJlc3VsdFsxXSA9IHRoaXNbMV0gKiBpbnZlcnNlU2NhbGUxO1xuICAgIHJlc3VsdFsyXSA9IHRoaXNbMl0gKiBpbnZlcnNlU2NhbGUyO1xuICAgIHJlc3VsdFszXSA9IHRoaXNbNF0gKiBpbnZlcnNlU2NhbGUwO1xuICAgIHJlc3VsdFs0XSA9IHRoaXNbNV0gKiBpbnZlcnNlU2NhbGUxO1xuICAgIHJlc3VsdFs1XSA9IHRoaXNbNl0gKiBpbnZlcnNlU2NhbGUyO1xuICAgIHJlc3VsdFs2XSA9IHRoaXNbOF0gKiBpbnZlcnNlU2NhbGUwO1xuICAgIHJlc3VsdFs3XSA9IHRoaXNbOV0gKiBpbnZlcnNlU2NhbGUxO1xuICAgIHJlc3VsdFs4XSA9IHRoaXNbMTBdICogaW52ZXJzZVNjYWxlMjtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdHJhbnNwb3NlKCkge1xuICAgIG1hdDQudHJhbnNwb3NlKHRoaXMsIHRoaXMpO1xuICAgIHJldHVybiB0aGlzLmNoZWNrKCk7XG4gIH1cblxuICBpbnZlcnQoKSB7XG4gICAgbWF0NC5pbnZlcnQodGhpcywgdGhpcyk7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIG11bHRpcGx5TGVmdChhKSB7XG4gICAgbWF0NC5tdWx0aXBseSh0aGlzLCBhLCB0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgbXVsdGlwbHlSaWdodChhKSB7XG4gICAgbWF0NC5tdWx0aXBseSh0aGlzLCB0aGlzLCBhKTtcbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgcm90YXRlWChyYWRpYW5zKSB7XG4gICAgbWF0NC5yb3RhdGVYKHRoaXMsIHRoaXMsIHJhZGlhbnMpO1xuICAgIHJldHVybiB0aGlzLmNoZWNrKCk7XG4gIH1cblxuICByb3RhdGVZKHJhZGlhbnMpIHtcbiAgICBtYXQ0LnJvdGF0ZVkodGhpcywgdGhpcywgcmFkaWFucyk7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIHJvdGF0ZVoocmFkaWFucykge1xuICAgIG1hdDQucm90YXRlWih0aGlzLCB0aGlzLCByYWRpYW5zKTtcbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgcm90YXRlWFlaKFtyeCwgcnksIHJ6XSkge1xuICAgIHJldHVybiB0aGlzLnJvdGF0ZVgocngpLnJvdGF0ZVkocnkpLnJvdGF0ZVoocnopO1xuICB9XG5cbiAgcm90YXRlQXhpcyhyYWRpYW5zLCBheGlzKSB7XG4gICAgbWF0NC5yb3RhdGUodGhpcywgdGhpcywgcmFkaWFucywgYXhpcyk7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIHNjYWxlKGZhY3Rvcikge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGZhY3RvcikpIHtcbiAgICAgIG1hdDQuc2NhbGUodGhpcywgdGhpcywgZmFjdG9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWF0NC5zY2FsZSh0aGlzLCB0aGlzLCBbZmFjdG9yLCBmYWN0b3IsIGZhY3Rvcl0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNoZWNrKCk7XG4gIH1cblxuICB0cmFuc2xhdGUodmVjKSB7XG4gICAgbWF0NC50cmFuc2xhdGUodGhpcywgdGhpcywgdmVjKTtcbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgdHJhbnNmb3JtKHZlY3RvciwgcmVzdWx0KSB7XG4gICAgaWYgKHZlY3Rvci5sZW5ndGggPT09IDQpIHtcbiAgICAgIHJlc3VsdCA9IHZlYzQudHJhbnNmb3JtTWF0NChyZXN1bHQgfHwgWy0wLCAtMCwgLTAsIC0wXSwgdmVjdG9yLCB0aGlzKTtcbiAgICAgIGNoZWNrVmVjdG9yKHJlc3VsdCwgNCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybUFzUG9pbnQodmVjdG9yLCByZXN1bHQpO1xuICB9XG5cbiAgdHJhbnNmb3JtQXNQb2ludCh2ZWN0b3IsIHJlc3VsdCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGxlbmd0aFxuICAgIH0gPSB2ZWN0b3I7XG5cbiAgICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXN1bHQgPSB2ZWMyLnRyYW5zZm9ybU1hdDQocmVzdWx0IHx8IFstMCwgLTBdLCB2ZWN0b3IsIHRoaXMpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAzOlxuICAgICAgICByZXN1bHQgPSB2ZWMzLnRyYW5zZm9ybU1hdDQocmVzdWx0IHx8IFstMCwgLTAsIC0wXSwgdmVjdG9yLCB0aGlzKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSWxsZWdhbCB2ZWN0b3InKTtcbiAgICB9XG5cbiAgICBjaGVja1ZlY3RvcihyZXN1bHQsIHZlY3Rvci5sZW5ndGgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICB0cmFuc2Zvcm1Bc1ZlY3Rvcih2ZWN0b3IsIHJlc3VsdCkge1xuICAgIHN3aXRjaCAodmVjdG9yLmxlbmd0aCkge1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXN1bHQgPSB2ZWMyX3RyYW5zZm9ybU1hdDRBc1ZlY3RvcihyZXN1bHQgfHwgWy0wLCAtMF0sIHZlY3RvciwgdGhpcyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDM6XG4gICAgICAgIHJlc3VsdCA9IHZlYzNfdHJhbnNmb3JtTWF0NEFzVmVjdG9yKHJlc3VsdCB8fCBbLTAsIC0wLCAtMF0sIHZlY3RvciwgdGhpcyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lsbGVnYWwgdmVjdG9yJyk7XG4gICAgfVxuXG4gICAgY2hlY2tWZWN0b3IocmVzdWx0LCB2ZWN0b3IubGVuZ3RoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgbWFrZVJvdGF0aW9uWChyYWRpYW5zKSB7XG4gICAgcmV0dXJuIHRoaXMuaWRlbnRpdHkoKS5yb3RhdGVYKHJhZGlhbnMpO1xuICB9XG5cbiAgbWFrZVRyYW5zbGF0aW9uKHgsIHksIHopIHtcbiAgICByZXR1cm4gdGhpcy5pZGVudGl0eSgpLnRyYW5zbGF0ZShbeCwgeSwgel0pO1xuICB9XG5cbiAgdHJhbnNmb3JtUG9pbnQodmVjdG9yLCByZXN1bHQpIHtcbiAgICBkZXByZWNhdGVkKCdNYXRyaXg0LnRyYW5zZm9ybVBvaW50JywgJzMuMCcpO1xuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybUFzUG9pbnQodmVjdG9yLCByZXN1bHQpO1xuICB9XG5cbiAgdHJhbnNmb3JtVmVjdG9yKHZlY3RvciwgcmVzdWx0KSB7XG4gICAgZGVwcmVjYXRlZCgnTWF0cml4NC50cmFuc2Zvcm1WZWN0b3InLCAnMy4wJyk7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtQXNQb2ludCh2ZWN0b3IsIHJlc3VsdCk7XG4gIH1cblxuICB0cmFuc2Zvcm1EaXJlY3Rpb24odmVjdG9yLCByZXN1bHQpIHtcbiAgICBkZXByZWNhdGVkKCdNYXRyaXg0LnRyYW5zZm9ybURpcmVjdGlvbicsICczLjAnKTtcbiAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm1Bc1ZlY3Rvcih2ZWN0b3IsIHJlc3VsdCk7XG4gIH1cblxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWF0cml4NC5qcy5tYXAiLCJpbXBvcnQgVmVjdG9yIGZyb20gJy4vYmFzZS92ZWN0b3InO1xuaW1wb3J0IHsgY29uZmlnLCBpc0FycmF5IH0gZnJvbSAnLi4vbGliL2NvbW1vbic7XG5pbXBvcnQgeyBjaGVja051bWJlciB9IGZyb20gJy4uL2xpYi92YWxpZGF0b3JzJztcbmltcG9ydCAqIGFzIHZlYzMgZnJvbSAnZ2wtbWF0cml4L3ZlYzMnO1xuaW1wb3J0IHsgdmVjM190cmFuc2Zvcm1NYXQyLCB2ZWMzX3RyYW5zZm9ybU1hdDRBc1ZlY3RvciB9IGZyb20gJy4uL2xpYi9nbC1tYXRyaXgtZXh0cmFzJztcbmNvbnN0IE9SSUdJTiA9IFswLCAwLCAwXTtcbmNvbnN0IGNvbnN0YW50cyA9IHt9O1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yMyBleHRlbmRzIFZlY3RvciB7XG4gIHN0YXRpYyBnZXQgWkVSTygpIHtcbiAgICByZXR1cm4gY29uc3RhbnRzLlpFUk8gPSBjb25zdGFudHMuWkVSTyB8fCBPYmplY3QuZnJlZXplKG5ldyBWZWN0b3IzKDAsIDAsIDAsIDApKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCwgeiA9IDApIHtcbiAgICBzdXBlcigtMCwgLTAsIC0wKTtcblxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIGlzQXJyYXkoeCkpIHtcbiAgICAgIHRoaXMuY29weSh4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNvbmZpZy5kZWJ1Zykge1xuICAgICAgICBjaGVja051bWJlcih4KTtcbiAgICAgICAgY2hlY2tOdW1iZXIoeSk7XG4gICAgICAgIGNoZWNrTnVtYmVyKHopO1xuICAgICAgfVxuXG4gICAgICB0aGlzWzBdID0geDtcbiAgICAgIHRoaXNbMV0gPSB5O1xuICAgICAgdGhpc1syXSA9IHo7XG4gICAgfVxuICB9XG5cbiAgc2V0KHgsIHksIHopIHtcbiAgICB0aGlzWzBdID0geDtcbiAgICB0aGlzWzFdID0geTtcbiAgICB0aGlzWzJdID0gejtcbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgY29weShhcnJheSkge1xuICAgIHRoaXNbMF0gPSBhcnJheVswXTtcbiAgICB0aGlzWzFdID0gYXJyYXlbMV07XG4gICAgdGhpc1syXSA9IGFycmF5WzJdO1xuICAgIHJldHVybiB0aGlzLmNoZWNrKCk7XG4gIH1cblxuICBmcm9tT2JqZWN0KG9iamVjdCkge1xuICAgIGlmIChjb25maWcuZGVidWcpIHtcbiAgICAgIGNoZWNrTnVtYmVyKG9iamVjdC54KTtcbiAgICAgIGNoZWNrTnVtYmVyKG9iamVjdC55KTtcbiAgICAgIGNoZWNrTnVtYmVyKG9iamVjdC56KTtcbiAgICB9XG5cbiAgICB0aGlzWzBdID0gb2JqZWN0Lng7XG4gICAgdGhpc1sxXSA9IG9iamVjdC55O1xuICAgIHRoaXNbMl0gPSBvYmplY3QuejtcbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgdG9PYmplY3Qob2JqZWN0KSB7XG4gICAgb2JqZWN0LnggPSB0aGlzWzBdO1xuICAgIG9iamVjdC55ID0gdGhpc1sxXTtcbiAgICBvYmplY3QueiA9IHRoaXNbMl07XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuXG4gIGdldCBFTEVNRU5UUygpIHtcbiAgICByZXR1cm4gMztcbiAgfVxuXG4gIGdldCB6KCkge1xuICAgIHJldHVybiB0aGlzWzJdO1xuICB9XG5cbiAgc2V0IHoodmFsdWUpIHtcbiAgICB0aGlzWzJdID0gY2hlY2tOdW1iZXIodmFsdWUpO1xuICB9XG5cbiAgYW5nbGUodmVjdG9yKSB7XG4gICAgcmV0dXJuIHZlYzMuYW5nbGUodGhpcywgdmVjdG9yKTtcbiAgfVxuXG4gIGNyb3NzKHZlY3Rvcikge1xuICAgIHZlYzMuY3Jvc3ModGhpcywgdGhpcywgdmVjdG9yKTtcbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgcm90YXRlWCh7XG4gICAgcmFkaWFucyxcbiAgICBvcmlnaW4gPSBPUklHSU5cbiAgfSkge1xuICAgIHZlYzMucm90YXRlWCh0aGlzLCB0aGlzLCBvcmlnaW4sIHJhZGlhbnMpO1xuICAgIHJldHVybiB0aGlzLmNoZWNrKCk7XG4gIH1cblxuICByb3RhdGVZKHtcbiAgICByYWRpYW5zLFxuICAgIG9yaWdpbiA9IE9SSUdJTlxuICB9KSB7XG4gICAgdmVjMy5yb3RhdGVZKHRoaXMsIHRoaXMsIG9yaWdpbiwgcmFkaWFucyk7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIHJvdGF0ZVooe1xuICAgIHJhZGlhbnMsXG4gICAgb3JpZ2luID0gT1JJR0lOXG4gIH0pIHtcbiAgICB2ZWMzLnJvdGF0ZVoodGhpcywgdGhpcywgb3JpZ2luLCByYWRpYW5zKTtcbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgdHJhbnNmb3JtKG1hdHJpeDQpIHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm1Bc1BvaW50KG1hdHJpeDQpO1xuICB9XG5cbiAgdHJhbnNmb3JtQXNQb2ludChtYXRyaXg0KSB7XG4gICAgdmVjMy50cmFuc2Zvcm1NYXQ0KHRoaXMsIHRoaXMsIG1hdHJpeDQpO1xuICAgIHJldHVybiB0aGlzLmNoZWNrKCk7XG4gIH1cblxuICB0cmFuc2Zvcm1Bc1ZlY3RvcihtYXRyaXg0KSB7XG4gICAgdmVjM190cmFuc2Zvcm1NYXQ0QXNWZWN0b3IodGhpcywgdGhpcywgbWF0cml4NCk7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG4gIHRyYW5zZm9ybUJ5TWF0cml4MyhtYXRyaXgzKSB7XG4gICAgdmVjMy50cmFuc2Zvcm1NYXQzKHRoaXMsIHRoaXMsIG1hdHJpeDMpO1xuICAgIHJldHVybiB0aGlzLmNoZWNrKCk7XG4gIH1cblxuICB0cmFuc2Zvcm1CeU1hdHJpeDIobWF0cml4Mikge1xuICAgIHZlYzNfdHJhbnNmb3JtTWF0Mih0aGlzLCB0aGlzLCBtYXRyaXgyKTtcbiAgICByZXR1cm4gdGhpcy5jaGVjaygpO1xuICB9XG5cbiAgdHJhbnNmb3JtQnlRdWF0ZXJuaW9uKHF1YXRlcm5pb24pIHtcbiAgICB2ZWMzLnRyYW5zZm9ybVF1YXQodGhpcywgdGhpcywgcXVhdGVybmlvbik7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2soKTtcbiAgfVxuXG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD12ZWN0b3IzLmpzLm1hcCIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzc2VydChjb25kaXRpb24sIG1lc3NhZ2UpIHtcbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJtYXRoLmdsIGFzc2VydGlvbiBcIi5jb25jYXQobWVzc2FnZSkpO1xuICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hc3NlcnQuanMubWFwIiwiaW1wb3J0IGFzc2VydCBmcm9tICcuL2Fzc2VydCc7XG5jb25zdCBSQURJQU5TX1RPX0RFR1JFRVMgPSAxIC8gTWF0aC5QSSAqIDE4MDtcbmNvbnN0IERFR1JFRVNfVE9fUkFESUFOUyA9IDEgLyAxODAgKiBNYXRoLlBJO1xuY29uc3QgY29uZmlnID0ge307XG5jb25maWcuRVBTSUxPTiA9IDFlLTEyO1xuY29uZmlnLmRlYnVnID0gZmFsc2U7XG5jb25maWcucHJlY2lzaW9uID0gNDtcbmNvbmZpZy5wcmludFR5cGVzID0gZmFsc2U7XG5jb25maWcucHJpbnREZWdyZWVzID0gZmFsc2U7XG5jb25maWcucHJpbnRSb3dNYWpvciA9IHRydWU7XG5leHBvcnQgeyBjb25maWcgfTtcbmV4cG9ydCBmdW5jdGlvbiBjb25maWd1cmUob3B0aW9ucyA9IHt9KSB7XG4gIGZvciAoY29uc3Qga2V5IGluIG9wdGlvbnMpIHtcbiAgICBhc3NlcnQoa2V5IGluIGNvbmZpZyk7XG4gICAgY29uZmlnW2tleV0gPSBvcHRpb25zW2tleV07XG4gIH1cblxuICByZXR1cm4gY29uZmlnO1xufVxuXG5mdW5jdGlvbiByb3VuZCh2YWx1ZSkge1xuICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAvIGNvbmZpZy5FUFNJTE9OKSAqIGNvbmZpZy5FUFNJTE9OO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0VmFsdWUodmFsdWUsIHtcbiAgcHJlY2lzaW9uID0gY29uZmlnLnByZWNpc2lvbiB8fCA0XG59ID0ge30pIHtcbiAgdmFsdWUgPSByb3VuZCh2YWx1ZSk7XG4gIHJldHVybiBcIlwiLmNvbmNhdChwYXJzZUZsb2F0KHZhbHVlLnRvUHJlY2lzaW9uKHByZWNpc2lvbikpKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0FycmF5KHZhbHVlKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKSB8fCBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsdWUpICYmICEodmFsdWUgaW5zdGFuY2VvZiBEYXRhVmlldyk7XG59XG5cbmZ1bmN0aW9uIGR1cGxpY2F0ZUFycmF5KGFycmF5KSB7XG4gIHJldHVybiBhcnJheS5jbG9uZSA/IGFycmF5LmNsb25lKCkgOiBuZXcgQXJyYXkoYXJyYXkubGVuZ3RoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lKGFycmF5KSB7XG4gIHJldHVybiBhcnJheS5jbG9uZSA/IGFycmF5LmNsb25lKCkgOiBuZXcgQXJyYXkoLi4uYXJyYXkpO1xufVxuXG5mdW5jdGlvbiBtYXAodmFsdWUsIGZ1bmMsIHJlc3VsdCkge1xuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXN1bHQgPSByZXN1bHQgfHwgZHVwbGljYXRlQXJyYXkodmFsdWUpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoICYmIGkgPCB2YWx1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgcmVzdWx0W2ldID0gZnVuYyh2YWx1ZVtpXSwgaSwgcmVzdWx0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcmV0dXJuIGZ1bmModmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9SYWRpYW5zKGRlZ3JlZXMpIHtcbiAgcmV0dXJuIHJhZGlhbnMoZGVncmVlcyk7XG59XG5leHBvcnQgZnVuY3Rpb24gdG9EZWdyZWVzKHJhZGlhbnMpIHtcbiAgcmV0dXJuIGRlZ3JlZXMocmFkaWFucyk7XG59XG5leHBvcnQgZnVuY3Rpb24gcmFkaWFucyhkZWdyZWVzLCByZXN1bHQpIHtcbiAgcmV0dXJuIG1hcChkZWdyZWVzLCBkZWdyZWVzID0+IGRlZ3JlZXMgKiBERUdSRUVTX1RPX1JBRElBTlMsIHJlc3VsdCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZGVncmVlcyhyYWRpYW5zLCByZXN1bHQpIHtcbiAgcmV0dXJuIG1hcChyYWRpYW5zLCByYWRpYW5zID0+IHJhZGlhbnMgKiBSQURJQU5TX1RPX0RFR1JFRVMsIHJlc3VsdCk7XG59XG5leHBvcnQgZnVuY3Rpb24gc2luKHJhZGlhbnMpIHtcbiAgcmV0dXJuIG1hcChyYWRpYW5zLCBhbmdsZSA9PiBNYXRoLnNpbihhbmdsZSkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvcyhyYWRpYW5zKSB7XG4gIHJldHVybiBtYXAocmFkaWFucywgYW5nbGUgPT4gTWF0aC5jb3MoYW5nbGUpKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB0YW4ocmFkaWFucykge1xuICByZXR1cm4gbWFwKHJhZGlhbnMsIGFuZ2xlID0+IE1hdGgudGFuKGFuZ2xlKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gYXNpbihyYWRpYW5zKSB7XG4gIHJldHVybiBtYXAocmFkaWFucywgYW5nbGUgPT4gTWF0aC5hc2luKGFuZ2xlKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gYWNvcyhyYWRpYW5zKSB7XG4gIHJldHVybiBtYXAocmFkaWFucywgYW5nbGUgPT4gTWF0aC5hY29zKGFuZ2xlKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gYXRhbihyYWRpYW5zKSB7XG4gIHJldHVybiBtYXAocmFkaWFucywgYW5nbGUgPT4gTWF0aC5hdGFuKGFuZ2xlKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gY2xhbXAodmFsdWUsIG1pbiwgbWF4KSB7XG4gIHJldHVybiBtYXAodmFsdWUsIHZhbHVlID0+IE1hdGgubWF4KG1pbiwgTWF0aC5taW4obWF4LCB2YWx1ZSkpKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBsZXJwKGEsIGIsIHQpIHtcbiAgaWYgKGlzQXJyYXkoYSkpIHtcbiAgICByZXR1cm4gYS5tYXAoKGFpLCBpKSA9PiBsZXJwKGFpLCBiW2ldLCB0KSk7XG4gIH1cblxuICByZXR1cm4gdCAqIGIgKyAoMSAtIHQpICogYTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbHMoYSwgYiwgZXBzaWxvbikge1xuICBjb25zdCBvbGRFcHNpbG9uID0gY29uZmlnLkVQU0lMT047XG5cbiAgaWYgKGVwc2lsb24pIHtcbiAgICBjb25maWcuRVBTSUxPTiA9IGVwc2lsb247XG4gIH1cblxuICB0cnkge1xuICAgIGlmIChhID09PSBiKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoaXNBcnJheShhKSAmJiBpc0FycmF5KGIpKSB7XG4gICAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmICghZXF1YWxzKGFbaV0sIGJbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChhICYmIGEuZXF1YWxzKSB7XG4gICAgICByZXR1cm4gYS5lcXVhbHMoYik7XG4gICAgfVxuXG4gICAgaWYgKGIgJiYgYi5lcXVhbHMpIHtcbiAgICAgIHJldHVybiBiLmVxdWFscyhhKTtcbiAgICB9XG5cbiAgICBpZiAoTnVtYmVyLmlzRmluaXRlKGEpICYmIE51bWJlci5pc0Zpbml0ZShiKSkge1xuICAgICAgcmV0dXJuIE1hdGguYWJzKGEgLSBiKSA8PSBjb25maWcuRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYSksIE1hdGguYWJzKGIpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZmluYWxseSB7XG4gICAgY29uZmlnLkVQU0lMT04gPSBvbGRFcHNpbG9uO1xuICB9XG59XG5leHBvcnQgZnVuY3Rpb24gZXhhY3RFcXVhbHMoYSwgYikge1xuICBpZiAoYSA9PT0gYikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKGEgJiYgdHlwZW9mIGEgPT09ICdvYmplY3QnICYmIGIgJiYgdHlwZW9mIGIgPT09ICdvYmplY3QnKSB7XG4gICAgaWYgKGEuY29uc3RydWN0b3IgIT09IGIuY29uc3RydWN0b3IpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoYS5leGFjdEVxdWFscykge1xuICAgICAgcmV0dXJuIGEuZXhhY3RFcXVhbHMoYik7XG4gICAgfVxuICB9XG5cbiAgaWYgKGlzQXJyYXkoYSkgJiYgaXNBcnJheShiKSkge1xuICAgIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyArK2kpIHtcbiAgICAgIGlmICghZXhhY3RFcXVhbHMoYVtpXSwgYltpXSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHdpdGhFcHNpbG9uKEVQU0lMT04sIGZ1bmMpIHtcbiAgY29uc3Qgb2xkUHJlY2lzaW9uID0gY29uZmlnLkVQU0lMT047XG4gIGNvbmZpZy5FUFNJTE9OID0gRVBTSUxPTjtcbiAgbGV0IHZhbHVlO1xuXG4gIHRyeSB7XG4gICAgdmFsdWUgPSBmdW5jKCk7XG4gIH0gZmluYWxseSB7XG4gICAgY29uZmlnLkVQU0lMT04gPSBvbGRQcmVjaXNpb247XG4gIH1cblxuICByZXR1cm4gdmFsdWU7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb21tb24uanMubWFwIiwiZXhwb3J0IGZ1bmN0aW9uIHZlYzJfdHJhbnNmb3JtTWF0NEFzVmVjdG9yKG91dCwgYSwgbSkge1xuICBjb25zdCB4ID0gYVswXTtcbiAgY29uc3QgeSA9IGFbMV07XG4gIGNvbnN0IHcgPSBtWzNdICogeCArIG1bN10gKiB5IHx8IDEuMDtcbiAgb3V0WzBdID0gKG1bMF0gKiB4ICsgbVs0XSAqIHkpIC8gdztcbiAgb3V0WzFdID0gKG1bMV0gKiB4ICsgbVs1XSAqIHkpIC8gdztcbiAgcmV0dXJuIG91dDtcbn1cbmV4cG9ydCBmdW5jdGlvbiB2ZWMzX3RyYW5zZm9ybU1hdDRBc1ZlY3RvcihvdXQsIGEsIG0pIHtcbiAgY29uc3QgeCA9IGFbMF07XG4gIGNvbnN0IHkgPSBhWzFdO1xuICBjb25zdCB6ID0gYVsyXTtcbiAgY29uc3QgdyA9IG1bM10gKiB4ICsgbVs3XSAqIHkgKyBtWzExXSAqIHogfHwgMS4wO1xuICBvdXRbMF0gPSAobVswXSAqIHggKyBtWzRdICogeSArIG1bOF0gKiB6KSAvIHc7XG4gIG91dFsxXSA9IChtWzFdICogeCArIG1bNV0gKiB5ICsgbVs5XSAqIHopIC8gdztcbiAgb3V0WzJdID0gKG1bMl0gKiB4ICsgbVs2XSAqIHkgKyBtWzEwXSAqIHopIC8gdztcbiAgcmV0dXJuIG91dDtcbn1cbmV4cG9ydCBmdW5jdGlvbiB2ZWMzX3RyYW5zZm9ybU1hdDIob3V0LCBhLCBtKSB7XG4gIGNvbnN0IHggPSBhWzBdO1xuICBjb25zdCB5ID0gYVsxXTtcbiAgb3V0WzBdID0gbVswXSAqIHggKyBtWzJdICogeTtcbiAgb3V0WzFdID0gbVsxXSAqIHggKyBtWzNdICogeTtcbiAgb3V0WzJdID0gYVsyXTtcbiAgcmV0dXJuIG91dDtcbn1cbmV4cG9ydCBmdW5jdGlvbiB2ZWM0X3RyYW5zZm9ybU1hdDIob3V0LCBhLCBtKSB7XG4gIGNvbnN0IHggPSBhWzBdO1xuICBjb25zdCB5ID0gYVsxXTtcbiAgb3V0WzBdID0gbVswXSAqIHggKyBtWzJdICogeTtcbiAgb3V0WzFdID0gbVsxXSAqIHggKyBtWzNdICogeTtcbiAgb3V0WzJdID0gYVsyXTtcbiAgb3V0WzNdID0gYVszXTtcbiAgcmV0dXJuIG91dDtcbn1cbmV4cG9ydCBmdW5jdGlvbiB2ZWM0X3RyYW5zZm9ybU1hdDMob3V0LCBhLCBtKSB7XG4gIGNvbnN0IHggPSBhWzBdO1xuICBjb25zdCB5ID0gYVsxXTtcbiAgY29uc3QgeiA9IGFbMl07XG4gIG91dFswXSA9IG1bMF0gKiB4ICsgbVszXSAqIHkgKyBtWzZdICogejtcbiAgb3V0WzFdID0gbVsxXSAqIHggKyBtWzRdICogeSArIG1bN10gKiB6O1xuICBvdXRbMl0gPSBtWzJdICogeCArIG1bNV0gKiB5ICsgbVs4XSAqIHo7XG4gIG91dFszXSA9IGFbM107XG4gIHJldHVybiBvdXQ7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1nbC1tYXRyaXgtZXh0cmFzLmpzLm1hcCIsImltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29tbW9uJztcbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVZlY3Rvcih2LCBsZW5ndGgpIHtcbiAgaWYgKHYubGVuZ3RoICE9PSBsZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHYubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoIU51bWJlci5pc0Zpbml0ZSh2W2ldKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrTnVtYmVyKHZhbHVlKSB7XG4gIGlmICghTnVtYmVyLmlzRmluaXRlKHZhbHVlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgbnVtYmVyIFwiLmNvbmNhdCh2YWx1ZSkpO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrVmVjdG9yKHYsIGxlbmd0aCwgY2FsbGVyTmFtZSA9ICcnKSB7XG4gIGlmIChjb25maWcuZGVidWcgJiYgIXZhbGlkYXRlVmVjdG9yKHYsIGxlbmd0aCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJtYXRoLmdsOiBcIi5jb25jYXQoY2FsbGVyTmFtZSwgXCIgc29tZSBmaWVsZHMgc2V0IHRvIGludmFsaWQgbnVtYmVycydcIikpO1xuICB9XG5cbiAgcmV0dXJuIHY7XG59XG5jb25zdCBtYXAgPSB7fTtcbmV4cG9ydCBmdW5jdGlvbiBkZXByZWNhdGVkKG1ldGhvZCwgdmVyc2lvbikge1xuICBpZiAoIW1hcFttZXRob2RdKSB7XG4gICAgbWFwW21ldGhvZF0gPSB0cnVlO1xuICAgIGNvbnNvbGUud2FybihcIlwiLmNvbmNhdChtZXRob2QsIFwiIGhhcyBiZWVuIHJlbW92ZWQgaW4gdmVyc2lvbiBcIikuY29uY2F0KHZlcnNpb24sIFwiLCBzZWUgdXBncmFkZSBndWlkZSBmb3IgbW9yZSBpbmZvcm1hdGlvblwiKSk7XG4gIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZhbGlkYXRvcnMuanMubWFwIiwiLyoqXHJcbiAqIENvbW1vbiB1dGlsaXRpZXNcclxuICogQG1vZHVsZSBnbE1hdHJpeFxyXG4gKi9cbi8vIENvbmZpZ3VyYXRpb24gQ29uc3RhbnRzXG5leHBvcnQgdmFyIEVQU0lMT04gPSAwLjAwMDAwMTtcbmV4cG9ydCB2YXIgQVJSQVlfVFlQRSA9IHR5cGVvZiBGbG9hdDMyQXJyYXkgIT09ICd1bmRlZmluZWQnID8gRmxvYXQzMkFycmF5IDogQXJyYXk7XG5leHBvcnQgdmFyIFJBTkRPTSA9IE1hdGgucmFuZG9tO1xuLyoqXHJcbiAqIFNldHMgdGhlIHR5cGUgb2YgYXJyYXkgdXNlZCB3aGVuIGNyZWF0aW5nIG5ldyB2ZWN0b3JzIGFuZCBtYXRyaWNlc1xyXG4gKlxyXG4gKiBAcGFyYW0ge0Zsb2F0MzJBcnJheUNvbnN0cnVjdG9yIHwgQXJyYXlDb25zdHJ1Y3Rvcn0gdHlwZSBBcnJheSB0eXBlLCBzdWNoIGFzIEZsb2F0MzJBcnJheSBvciBBcnJheVxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNldE1hdHJpeEFycmF5VHlwZSh0eXBlKSB7XG4gIEFSUkFZX1RZUEUgPSB0eXBlO1xufVxudmFyIGRlZ3JlZSA9IE1hdGguUEkgLyAxODA7XG4vKipcclxuICogQ29udmVydCBEZWdyZWUgVG8gUmFkaWFuXHJcbiAqXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBhIEFuZ2xlIGluIERlZ3JlZXNcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB0b1JhZGlhbihhKSB7XG4gIHJldHVybiBhICogZGVncmVlO1xufVxuLyoqXHJcbiAqIFRlc3RzIHdoZXRoZXIgb3Igbm90IHRoZSBhcmd1bWVudHMgaGF2ZSBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIHZhbHVlLCB3aXRoaW4gYW4gYWJzb2x1dGVcclxuICogb3IgcmVsYXRpdmUgdG9sZXJhbmNlIG9mIGdsTWF0cml4LkVQU0lMT04gKGFuIGFic29sdXRlIHRvbGVyYW5jZSBpcyB1c2VkIGZvciB2YWx1ZXMgbGVzc1xyXG4gKiB0aGFuIG9yIGVxdWFsIHRvIDEuMCwgYW5kIGEgcmVsYXRpdmUgdG9sZXJhbmNlIGlzIHVzZWQgZm9yIGxhcmdlciB2YWx1ZXMpXHJcbiAqXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBhIFRoZSBmaXJzdCBudW1iZXIgdG8gdGVzdC5cclxuICogQHBhcmFtIHtOdW1iZXJ9IGIgVGhlIHNlY29uZCBudW1iZXIgdG8gdGVzdC5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIG51bWJlcnMgYXJlIGFwcHJveGltYXRlbHkgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbHMoYSwgYikge1xuICByZXR1cm4gTWF0aC5hYnMoYSAtIGIpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEpLCBNYXRoLmFicyhiKSk7XG59XG5pZiAoIU1hdGguaHlwb3QpIE1hdGguaHlwb3QgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB5ID0gMCxcbiAgICAgIGkgPSBhcmd1bWVudHMubGVuZ3RoO1xuXG4gIHdoaWxlIChpLS0pIHtcbiAgICB5ICs9IGFyZ3VtZW50c1tpXSAqIGFyZ3VtZW50c1tpXTtcbiAgfVxuXG4gIHJldHVybiBNYXRoLnNxcnQoeSk7XG59OyIsImltcG9ydCAqIGFzIGdsTWF0cml4IGZyb20gXCIuL2NvbW1vbi5qc1wiO1xuLyoqXHJcbiAqIDR4NCBNYXRyaXg8YnI+Rm9ybWF0OiBjb2x1bW4tbWFqb3IsIHdoZW4gdHlwZWQgb3V0IGl0IGxvb2tzIGxpa2Ugcm93LW1ham9yPGJyPlRoZSBtYXRyaWNlcyBhcmUgYmVpbmcgcG9zdCBtdWx0aXBsaWVkLlxyXG4gKiBAbW9kdWxlIG1hdDRcclxuICovXG5cbi8qKlxyXG4gKiBDcmVhdGVzIGEgbmV3IGlkZW50aXR5IG1hdDRcclxuICpcclxuICogQHJldHVybnMge21hdDR9IGEgbmV3IDR4NCBtYXRyaXhcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgxNik7XG5cbiAgaWYgKGdsTWF0cml4LkFSUkFZX1RZUEUgIT0gRmxvYXQzMkFycmF5KSB7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMDtcbiAgICBvdXRbOV0gPSAwO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAwO1xuICB9XG5cbiAgb3V0WzBdID0gMTtcbiAgb3V0WzVdID0gMTtcbiAgb3V0WzEwXSA9IDE7XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcgbWF0NCBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIG1hdHJpeFxyXG4gKlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSBtYXRyaXggdG8gY2xvbmVcclxuICogQHJldHVybnMge21hdDR9IGEgbmV3IDR4NCBtYXRyaXhcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZShhKSB7XG4gIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgxNik7XG4gIG91dFswXSA9IGFbMF07XG4gIG91dFsxXSA9IGFbMV07XG4gIG91dFsyXSA9IGFbMl07XG4gIG91dFszXSA9IGFbM107XG4gIG91dFs0XSA9IGFbNF07XG4gIG91dFs1XSA9IGFbNV07XG4gIG91dFs2XSA9IGFbNl07XG4gIG91dFs3XSA9IGFbN107XG4gIG91dFs4XSA9IGFbOF07XG4gIG91dFs5XSA9IGFbOV07XG4gIG91dFsxMF0gPSBhWzEwXTtcbiAgb3V0WzExXSA9IGFbMTFdO1xuICBvdXRbMTJdID0gYVsxMl07XG4gIG91dFsxM10gPSBhWzEzXTtcbiAgb3V0WzE0XSA9IGFbMTRdO1xuICBvdXRbMTVdID0gYVsxNV07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIG1hdDQgdG8gYW5vdGhlclxyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY29weShvdXQsIGEpIHtcbiAgb3V0WzBdID0gYVswXTtcbiAgb3V0WzFdID0gYVsxXTtcbiAgb3V0WzJdID0gYVsyXTtcbiAgb3V0WzNdID0gYVszXTtcbiAgb3V0WzRdID0gYVs0XTtcbiAgb3V0WzVdID0gYVs1XTtcbiAgb3V0WzZdID0gYVs2XTtcbiAgb3V0WzddID0gYVs3XTtcbiAgb3V0WzhdID0gYVs4XTtcbiAgb3V0WzldID0gYVs5XTtcbiAgb3V0WzEwXSA9IGFbMTBdO1xuICBvdXRbMTFdID0gYVsxMV07XG4gIG91dFsxMl0gPSBhWzEyXTtcbiAgb3V0WzEzXSA9IGFbMTNdO1xuICBvdXRbMTRdID0gYVsxNF07XG4gIG91dFsxNV0gPSBhWzE1XTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBDcmVhdGUgYSBuZXcgbWF0NCB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0wMCBDb21wb25lbnQgaW4gY29sdW1uIDAsIHJvdyAwIHBvc2l0aW9uIChpbmRleCAwKVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTAxIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDEgcG9zaXRpb24gKGluZGV4IDEpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMDIgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggMilcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0wMyBDb21wb25lbnQgaW4gY29sdW1uIDAsIHJvdyAzIHBvc2l0aW9uIChpbmRleCAzKVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTEwIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDAgcG9zaXRpb24gKGluZGV4IDQpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMTEgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggNSlcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0xMiBDb21wb25lbnQgaW4gY29sdW1uIDEsIHJvdyAyIHBvc2l0aW9uIChpbmRleCA2KVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTEzIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDMgcG9zaXRpb24gKGluZGV4IDcpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMjAgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggOClcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0yMSBDb21wb25lbnQgaW4gY29sdW1uIDIsIHJvdyAxIHBvc2l0aW9uIChpbmRleCA5KVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTIyIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDIgcG9zaXRpb24gKGluZGV4IDEwKVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTIzIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDMgcG9zaXRpb24gKGluZGV4IDExKVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTMwIENvbXBvbmVudCBpbiBjb2x1bW4gMywgcm93IDAgcG9zaXRpb24gKGluZGV4IDEyKVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTMxIENvbXBvbmVudCBpbiBjb2x1bW4gMywgcm93IDEgcG9zaXRpb24gKGluZGV4IDEzKVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTMyIENvbXBvbmVudCBpbiBjb2x1bW4gMywgcm93IDIgcG9zaXRpb24gKGluZGV4IDE0KVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTMzIENvbXBvbmVudCBpbiBjb2x1bW4gMywgcm93IDMgcG9zaXRpb24gKGluZGV4IDE1KVxyXG4gKiBAcmV0dXJucyB7bWF0NH0gQSBuZXcgbWF0NFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21WYWx1ZXMobTAwLCBtMDEsIG0wMiwgbTAzLCBtMTAsIG0xMSwgbTEyLCBtMTMsIG0yMCwgbTIxLCBtMjIsIG0yMywgbTMwLCBtMzEsIG0zMiwgbTMzKSB7XG4gIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgxNik7XG4gIG91dFswXSA9IG0wMDtcbiAgb3V0WzFdID0gbTAxO1xuICBvdXRbMl0gPSBtMDI7XG4gIG91dFszXSA9IG0wMztcbiAgb3V0WzRdID0gbTEwO1xuICBvdXRbNV0gPSBtMTE7XG4gIG91dFs2XSA9IG0xMjtcbiAgb3V0WzddID0gbTEzO1xuICBvdXRbOF0gPSBtMjA7XG4gIG91dFs5XSA9IG0yMTtcbiAgb3V0WzEwXSA9IG0yMjtcbiAgb3V0WzExXSA9IG0yMztcbiAgb3V0WzEyXSA9IG0zMDtcbiAgb3V0WzEzXSA9IG0zMTtcbiAgb3V0WzE0XSA9IG0zMjtcbiAgb3V0WzE1XSA9IG0zMztcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSBtYXQ0IHRvIHRoZSBnaXZlbiB2YWx1ZXNcclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0wMCBDb21wb25lbnQgaW4gY29sdW1uIDAsIHJvdyAwIHBvc2l0aW9uIChpbmRleCAwKVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTAxIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDEgcG9zaXRpb24gKGluZGV4IDEpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMDIgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggMilcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0wMyBDb21wb25lbnQgaW4gY29sdW1uIDAsIHJvdyAzIHBvc2l0aW9uIChpbmRleCAzKVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTEwIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDAgcG9zaXRpb24gKGluZGV4IDQpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMTEgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggNSlcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0xMiBDb21wb25lbnQgaW4gY29sdW1uIDEsIHJvdyAyIHBvc2l0aW9uIChpbmRleCA2KVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTEzIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDMgcG9zaXRpb24gKGluZGV4IDcpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMjAgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggOClcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0yMSBDb21wb25lbnQgaW4gY29sdW1uIDIsIHJvdyAxIHBvc2l0aW9uIChpbmRleCA5KVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTIyIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDIgcG9zaXRpb24gKGluZGV4IDEwKVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTIzIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDMgcG9zaXRpb24gKGluZGV4IDExKVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTMwIENvbXBvbmVudCBpbiBjb2x1bW4gMywgcm93IDAgcG9zaXRpb24gKGluZGV4IDEyKVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTMxIENvbXBvbmVudCBpbiBjb2x1bW4gMywgcm93IDEgcG9zaXRpb24gKGluZGV4IDEzKVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTMyIENvbXBvbmVudCBpbiBjb2x1bW4gMywgcm93IDIgcG9zaXRpb24gKGluZGV4IDE0KVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTMzIENvbXBvbmVudCBpbiBjb2x1bW4gMywgcm93IDMgcG9zaXRpb24gKGluZGV4IDE1KVxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0KG91dCwgbTAwLCBtMDEsIG0wMiwgbTAzLCBtMTAsIG0xMSwgbTEyLCBtMTMsIG0yMCwgbTIxLCBtMjIsIG0yMywgbTMwLCBtMzEsIG0zMiwgbTMzKSB7XG4gIG91dFswXSA9IG0wMDtcbiAgb3V0WzFdID0gbTAxO1xuICBvdXRbMl0gPSBtMDI7XG4gIG91dFszXSA9IG0wMztcbiAgb3V0WzRdID0gbTEwO1xuICBvdXRbNV0gPSBtMTE7XG4gIG91dFs2XSA9IG0xMjtcbiAgb3V0WzddID0gbTEzO1xuICBvdXRbOF0gPSBtMjA7XG4gIG91dFs5XSA9IG0yMTtcbiAgb3V0WzEwXSA9IG0yMjtcbiAgb3V0WzExXSA9IG0yMztcbiAgb3V0WzEyXSA9IG0zMDtcbiAgb3V0WzEzXSA9IG0zMTtcbiAgb3V0WzE0XSA9IG0zMjtcbiAgb3V0WzE1XSA9IG0zMztcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBTZXQgYSBtYXQ0IHRvIHRoZSBpZGVudGl0eSBtYXRyaXhcclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGlkZW50aXR5KG91dCkge1xuICBvdXRbMF0gPSAxO1xuICBvdXRbMV0gPSAwO1xuICBvdXRbMl0gPSAwO1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSAwO1xuICBvdXRbNV0gPSAxO1xuICBvdXRbNl0gPSAwO1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSAwO1xuICBvdXRbOV0gPSAwO1xuICBvdXRbMTBdID0gMTtcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSAwO1xuICBvdXRbMTNdID0gMDtcbiAgb3V0WzE0XSA9IDA7XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFRyYW5zcG9zZSB0aGUgdmFsdWVzIG9mIGEgbWF0NFxyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNwb3NlKG91dCwgYSkge1xuICAvLyBJZiB3ZSBhcmUgdHJhbnNwb3Npbmcgb3Vyc2VsdmVzIHdlIGNhbiBza2lwIGEgZmV3IHN0ZXBzIGJ1dCBoYXZlIHRvIGNhY2hlIHNvbWUgdmFsdWVzXG4gIGlmIChvdXQgPT09IGEpIHtcbiAgICB2YXIgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXSxcbiAgICAgICAgYTAzID0gYVszXTtcbiAgICB2YXIgYTEyID0gYVs2XSxcbiAgICAgICAgYTEzID0gYVs3XTtcbiAgICB2YXIgYTIzID0gYVsxMV07XG4gICAgb3V0WzFdID0gYVs0XTtcbiAgICBvdXRbMl0gPSBhWzhdO1xuICAgIG91dFszXSA9IGFbMTJdO1xuICAgIG91dFs0XSA9IGEwMTtcbiAgICBvdXRbNl0gPSBhWzldO1xuICAgIG91dFs3XSA9IGFbMTNdO1xuICAgIG91dFs4XSA9IGEwMjtcbiAgICBvdXRbOV0gPSBhMTI7XG4gICAgb3V0WzExXSA9IGFbMTRdO1xuICAgIG91dFsxMl0gPSBhMDM7XG4gICAgb3V0WzEzXSA9IGExMztcbiAgICBvdXRbMTRdID0gYTIzO1xuICB9IGVsc2Uge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVs0XTtcbiAgICBvdXRbMl0gPSBhWzhdO1xuICAgIG91dFszXSA9IGFbMTJdO1xuICAgIG91dFs0XSA9IGFbMV07XG4gICAgb3V0WzVdID0gYVs1XTtcbiAgICBvdXRbNl0gPSBhWzldO1xuICAgIG91dFs3XSA9IGFbMTNdO1xuICAgIG91dFs4XSA9IGFbMl07XG4gICAgb3V0WzldID0gYVs2XTtcbiAgICBvdXRbMTBdID0gYVsxMF07XG4gICAgb3V0WzExXSA9IGFbMTRdO1xuICAgIG91dFsxMl0gPSBhWzNdO1xuICAgIG91dFsxM10gPSBhWzddO1xuICAgIG91dFsxNF0gPSBhWzExXTtcbiAgICBvdXRbMTVdID0gYVsxNV07XG4gIH1cblxuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIEludmVydHMgYSBtYXQ0XHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnQob3V0LCBhKSB7XG4gIHZhciBhMDAgPSBhWzBdLFxuICAgICAgYTAxID0gYVsxXSxcbiAgICAgIGEwMiA9IGFbMl0sXG4gICAgICBhMDMgPSBhWzNdO1xuICB2YXIgYTEwID0gYVs0XSxcbiAgICAgIGExMSA9IGFbNV0sXG4gICAgICBhMTIgPSBhWzZdLFxuICAgICAgYTEzID0gYVs3XTtcbiAgdmFyIGEyMCA9IGFbOF0sXG4gICAgICBhMjEgPSBhWzldLFxuICAgICAgYTIyID0gYVsxMF0sXG4gICAgICBhMjMgPSBhWzExXTtcbiAgdmFyIGEzMCA9IGFbMTJdLFxuICAgICAgYTMxID0gYVsxM10sXG4gICAgICBhMzIgPSBhWzE0XSxcbiAgICAgIGEzMyA9IGFbMTVdO1xuICB2YXIgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwO1xuICB2YXIgYjAxID0gYTAwICogYTEyIC0gYTAyICogYTEwO1xuICB2YXIgYjAyID0gYTAwICogYTEzIC0gYTAzICogYTEwO1xuICB2YXIgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExO1xuICB2YXIgYjA0ID0gYTAxICogYTEzIC0gYTAzICogYTExO1xuICB2YXIgYjA1ID0gYTAyICogYTEzIC0gYTAzICogYTEyO1xuICB2YXIgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwO1xuICB2YXIgYjA3ID0gYTIwICogYTMyIC0gYTIyICogYTMwO1xuICB2YXIgYjA4ID0gYTIwICogYTMzIC0gYTIzICogYTMwO1xuICB2YXIgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxO1xuICB2YXIgYjEwID0gYTIxICogYTMzIC0gYTIzICogYTMxO1xuICB2YXIgYjExID0gYTIyICogYTMzIC0gYTIzICogYTMyOyAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG5cbiAgdmFyIGRldCA9IGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcblxuICBpZiAoIWRldCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZGV0ID0gMS4wIC8gZGV0O1xuICBvdXRbMF0gPSAoYTExICogYjExIC0gYTEyICogYjEwICsgYTEzICogYjA5KSAqIGRldDtcbiAgb3V0WzFdID0gKGEwMiAqIGIxMCAtIGEwMSAqIGIxMSAtIGEwMyAqIGIwOSkgKiBkZXQ7XG4gIG91dFsyXSA9IChhMzEgKiBiMDUgLSBhMzIgKiBiMDQgKyBhMzMgKiBiMDMpICogZGV0O1xuICBvdXRbM10gPSAoYTIyICogYjA0IC0gYTIxICogYjA1IC0gYTIzICogYjAzKSAqIGRldDtcbiAgb3V0WzRdID0gKGExMiAqIGIwOCAtIGExMCAqIGIxMSAtIGExMyAqIGIwNykgKiBkZXQ7XG4gIG91dFs1XSA9IChhMDAgKiBiMTEgLSBhMDIgKiBiMDggKyBhMDMgKiBiMDcpICogZGV0O1xuICBvdXRbNl0gPSAoYTMyICogYjAyIC0gYTMwICogYjA1IC0gYTMzICogYjAxKSAqIGRldDtcbiAgb3V0WzddID0gKGEyMCAqIGIwNSAtIGEyMiAqIGIwMiArIGEyMyAqIGIwMSkgKiBkZXQ7XG4gIG91dFs4XSA9IChhMTAgKiBiMTAgLSBhMTEgKiBiMDggKyBhMTMgKiBiMDYpICogZGV0O1xuICBvdXRbOV0gPSAoYTAxICogYjA4IC0gYTAwICogYjEwIC0gYTAzICogYjA2KSAqIGRldDtcbiAgb3V0WzEwXSA9IChhMzAgKiBiMDQgLSBhMzEgKiBiMDIgKyBhMzMgKiBiMDApICogZGV0O1xuICBvdXRbMTFdID0gKGEyMSAqIGIwMiAtIGEyMCAqIGIwNCAtIGEyMyAqIGIwMCkgKiBkZXQ7XG4gIG91dFsxMl0gPSAoYTExICogYjA3IC0gYTEwICogYjA5IC0gYTEyICogYjA2KSAqIGRldDtcbiAgb3V0WzEzXSA9IChhMDAgKiBiMDkgLSBhMDEgKiBiMDcgKyBhMDIgKiBiMDYpICogZGV0O1xuICBvdXRbMTRdID0gKGEzMSAqIGIwMSAtIGEzMCAqIGIwMyAtIGEzMiAqIGIwMCkgKiBkZXQ7XG4gIG91dFsxNV0gPSAoYTIwICogYjAzIC0gYTIxICogYjAxICsgYTIyICogYjAwKSAqIGRldDtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBhZGp1Z2F0ZSBvZiBhIG1hdDRcclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGFkam9pbnQob3V0LCBhKSB7XG4gIHZhciBhMDAgPSBhWzBdLFxuICAgICAgYTAxID0gYVsxXSxcbiAgICAgIGEwMiA9IGFbMl0sXG4gICAgICBhMDMgPSBhWzNdO1xuICB2YXIgYTEwID0gYVs0XSxcbiAgICAgIGExMSA9IGFbNV0sXG4gICAgICBhMTIgPSBhWzZdLFxuICAgICAgYTEzID0gYVs3XTtcbiAgdmFyIGEyMCA9IGFbOF0sXG4gICAgICBhMjEgPSBhWzldLFxuICAgICAgYTIyID0gYVsxMF0sXG4gICAgICBhMjMgPSBhWzExXTtcbiAgdmFyIGEzMCA9IGFbMTJdLFxuICAgICAgYTMxID0gYVsxM10sXG4gICAgICBhMzIgPSBhWzE0XSxcbiAgICAgIGEzMyA9IGFbMTVdO1xuICBvdXRbMF0gPSBhMTEgKiAoYTIyICogYTMzIC0gYTIzICogYTMyKSAtIGEyMSAqIChhMTIgKiBhMzMgLSBhMTMgKiBhMzIpICsgYTMxICogKGExMiAqIGEyMyAtIGExMyAqIGEyMik7XG4gIG91dFsxXSA9IC0oYTAxICogKGEyMiAqIGEzMyAtIGEyMyAqIGEzMikgLSBhMjEgKiAoYTAyICogYTMzIC0gYTAzICogYTMyKSArIGEzMSAqIChhMDIgKiBhMjMgLSBhMDMgKiBhMjIpKTtcbiAgb3V0WzJdID0gYTAxICogKGExMiAqIGEzMyAtIGExMyAqIGEzMikgLSBhMTEgKiAoYTAyICogYTMzIC0gYTAzICogYTMyKSArIGEzMSAqIChhMDIgKiBhMTMgLSBhMDMgKiBhMTIpO1xuICBvdXRbM10gPSAtKGEwMSAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpIC0gYTExICogKGEwMiAqIGEyMyAtIGEwMyAqIGEyMikgKyBhMjEgKiAoYTAyICogYTEzIC0gYTAzICogYTEyKSk7XG4gIG91dFs0XSA9IC0oYTEwICogKGEyMiAqIGEzMyAtIGEyMyAqIGEzMikgLSBhMjAgKiAoYTEyICogYTMzIC0gYTEzICogYTMyKSArIGEzMCAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpKTtcbiAgb3V0WzVdID0gYTAwICogKGEyMiAqIGEzMyAtIGEyMyAqIGEzMikgLSBhMjAgKiAoYTAyICogYTMzIC0gYTAzICogYTMyKSArIGEzMCAqIChhMDIgKiBhMjMgLSBhMDMgKiBhMjIpO1xuICBvdXRbNl0gPSAtKGEwMCAqIChhMTIgKiBhMzMgLSBhMTMgKiBhMzIpIC0gYTEwICogKGEwMiAqIGEzMyAtIGEwMyAqIGEzMikgKyBhMzAgKiAoYTAyICogYTEzIC0gYTAzICogYTEyKSk7XG4gIG91dFs3XSA9IGEwMCAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpIC0gYTEwICogKGEwMiAqIGEyMyAtIGEwMyAqIGEyMikgKyBhMjAgKiAoYTAyICogYTEzIC0gYTAzICogYTEyKTtcbiAgb3V0WzhdID0gYTEwICogKGEyMSAqIGEzMyAtIGEyMyAqIGEzMSkgLSBhMjAgKiAoYTExICogYTMzIC0gYTEzICogYTMxKSArIGEzMCAqIChhMTEgKiBhMjMgLSBhMTMgKiBhMjEpO1xuICBvdXRbOV0gPSAtKGEwMCAqIChhMjEgKiBhMzMgLSBhMjMgKiBhMzEpIC0gYTIwICogKGEwMSAqIGEzMyAtIGEwMyAqIGEzMSkgKyBhMzAgKiAoYTAxICogYTIzIC0gYTAzICogYTIxKSk7XG4gIG91dFsxMF0gPSBhMDAgKiAoYTExICogYTMzIC0gYTEzICogYTMxKSAtIGExMCAqIChhMDEgKiBhMzMgLSBhMDMgKiBhMzEpICsgYTMwICogKGEwMSAqIGExMyAtIGEwMyAqIGExMSk7XG4gIG91dFsxMV0gPSAtKGEwMCAqIChhMTEgKiBhMjMgLSBhMTMgKiBhMjEpIC0gYTEwICogKGEwMSAqIGEyMyAtIGEwMyAqIGEyMSkgKyBhMjAgKiAoYTAxICogYTEzIC0gYTAzICogYTExKSk7XG4gIG91dFsxMl0gPSAtKGExMCAqIChhMjEgKiBhMzIgLSBhMjIgKiBhMzEpIC0gYTIwICogKGExMSAqIGEzMiAtIGExMiAqIGEzMSkgKyBhMzAgKiAoYTExICogYTIyIC0gYTEyICogYTIxKSk7XG4gIG91dFsxM10gPSBhMDAgKiAoYTIxICogYTMyIC0gYTIyICogYTMxKSAtIGEyMCAqIChhMDEgKiBhMzIgLSBhMDIgKiBhMzEpICsgYTMwICogKGEwMSAqIGEyMiAtIGEwMiAqIGEyMSk7XG4gIG91dFsxNF0gPSAtKGEwMCAqIChhMTEgKiBhMzIgLSBhMTIgKiBhMzEpIC0gYTEwICogKGEwMSAqIGEzMiAtIGEwMiAqIGEzMSkgKyBhMzAgKiAoYTAxICogYTEyIC0gYTAyICogYTExKSk7XG4gIG91dFsxNV0gPSBhMDAgKiAoYTExICogYTIyIC0gYTEyICogYTIxKSAtIGExMCAqIChhMDEgKiBhMjIgLSBhMDIgKiBhMjEpICsgYTIwICogKGEwMSAqIGExMiAtIGEwMiAqIGExMSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgZGV0ZXJtaW5hbnQgb2YgYSBtYXQ0XHJcbiAqXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRldGVybWluYW50IG9mIGFcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkZXRlcm1pbmFudChhKSB7XG4gIHZhciBhMDAgPSBhWzBdLFxuICAgICAgYTAxID0gYVsxXSxcbiAgICAgIGEwMiA9IGFbMl0sXG4gICAgICBhMDMgPSBhWzNdO1xuICB2YXIgYTEwID0gYVs0XSxcbiAgICAgIGExMSA9IGFbNV0sXG4gICAgICBhMTIgPSBhWzZdLFxuICAgICAgYTEzID0gYVs3XTtcbiAgdmFyIGEyMCA9IGFbOF0sXG4gICAgICBhMjEgPSBhWzldLFxuICAgICAgYTIyID0gYVsxMF0sXG4gICAgICBhMjMgPSBhWzExXTtcbiAgdmFyIGEzMCA9IGFbMTJdLFxuICAgICAgYTMxID0gYVsxM10sXG4gICAgICBhMzIgPSBhWzE0XSxcbiAgICAgIGEzMyA9IGFbMTVdO1xuICB2YXIgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwO1xuICB2YXIgYjAxID0gYTAwICogYTEyIC0gYTAyICogYTEwO1xuICB2YXIgYjAyID0gYTAwICogYTEzIC0gYTAzICogYTEwO1xuICB2YXIgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExO1xuICB2YXIgYjA0ID0gYTAxICogYTEzIC0gYTAzICogYTExO1xuICB2YXIgYjA1ID0gYTAyICogYTEzIC0gYTAzICogYTEyO1xuICB2YXIgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwO1xuICB2YXIgYjA3ID0gYTIwICogYTMyIC0gYTIyICogYTMwO1xuICB2YXIgYjA4ID0gYTIwICogYTMzIC0gYTIzICogYTMwO1xuICB2YXIgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxO1xuICB2YXIgYjEwID0gYTIxICogYTMzIC0gYTIzICogYTMxO1xuICB2YXIgYjExID0gYTIyICogYTMzIC0gYTIzICogYTMyOyAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG5cbiAgcmV0dXJuIGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcbn1cbi8qKlxyXG4gKiBNdWx0aXBsaWVzIHR3byBtYXQ0c1xyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG11bHRpcGx5KG91dCwgYSwgYikge1xuICB2YXIgYTAwID0gYVswXSxcbiAgICAgIGEwMSA9IGFbMV0sXG4gICAgICBhMDIgPSBhWzJdLFxuICAgICAgYTAzID0gYVszXTtcbiAgdmFyIGExMCA9IGFbNF0sXG4gICAgICBhMTEgPSBhWzVdLFxuICAgICAgYTEyID0gYVs2XSxcbiAgICAgIGExMyA9IGFbN107XG4gIHZhciBhMjAgPSBhWzhdLFxuICAgICAgYTIxID0gYVs5XSxcbiAgICAgIGEyMiA9IGFbMTBdLFxuICAgICAgYTIzID0gYVsxMV07XG4gIHZhciBhMzAgPSBhWzEyXSxcbiAgICAgIGEzMSA9IGFbMTNdLFxuICAgICAgYTMyID0gYVsxNF0sXG4gICAgICBhMzMgPSBhWzE1XTsgLy8gQ2FjaGUgb25seSB0aGUgY3VycmVudCBsaW5lIG9mIHRoZSBzZWNvbmQgbWF0cml4XG5cbiAgdmFyIGIwID0gYlswXSxcbiAgICAgIGIxID0gYlsxXSxcbiAgICAgIGIyID0gYlsyXSxcbiAgICAgIGIzID0gYlszXTtcbiAgb3V0WzBdID0gYjAgKiBhMDAgKyBiMSAqIGExMCArIGIyICogYTIwICsgYjMgKiBhMzA7XG4gIG91dFsxXSA9IGIwICogYTAxICsgYjEgKiBhMTEgKyBiMiAqIGEyMSArIGIzICogYTMxO1xuICBvdXRbMl0gPSBiMCAqIGEwMiArIGIxICogYTEyICsgYjIgKiBhMjIgKyBiMyAqIGEzMjtcbiAgb3V0WzNdID0gYjAgKiBhMDMgKyBiMSAqIGExMyArIGIyICogYTIzICsgYjMgKiBhMzM7XG4gIGIwID0gYls0XTtcbiAgYjEgPSBiWzVdO1xuICBiMiA9IGJbNl07XG4gIGIzID0gYls3XTtcbiAgb3V0WzRdID0gYjAgKiBhMDAgKyBiMSAqIGExMCArIGIyICogYTIwICsgYjMgKiBhMzA7XG4gIG91dFs1XSA9IGIwICogYTAxICsgYjEgKiBhMTEgKyBiMiAqIGEyMSArIGIzICogYTMxO1xuICBvdXRbNl0gPSBiMCAqIGEwMiArIGIxICogYTEyICsgYjIgKiBhMjIgKyBiMyAqIGEzMjtcbiAgb3V0WzddID0gYjAgKiBhMDMgKyBiMSAqIGExMyArIGIyICogYTIzICsgYjMgKiBhMzM7XG4gIGIwID0gYls4XTtcbiAgYjEgPSBiWzldO1xuICBiMiA9IGJbMTBdO1xuICBiMyA9IGJbMTFdO1xuICBvdXRbOF0gPSBiMCAqIGEwMCArIGIxICogYTEwICsgYjIgKiBhMjAgKyBiMyAqIGEzMDtcbiAgb3V0WzldID0gYjAgKiBhMDEgKyBiMSAqIGExMSArIGIyICogYTIxICsgYjMgKiBhMzE7XG4gIG91dFsxMF0gPSBiMCAqIGEwMiArIGIxICogYTEyICsgYjIgKiBhMjIgKyBiMyAqIGEzMjtcbiAgb3V0WzExXSA9IGIwICogYTAzICsgYjEgKiBhMTMgKyBiMiAqIGEyMyArIGIzICogYTMzO1xuICBiMCA9IGJbMTJdO1xuICBiMSA9IGJbMTNdO1xuICBiMiA9IGJbMTRdO1xuICBiMyA9IGJbMTVdO1xuICBvdXRbMTJdID0gYjAgKiBhMDAgKyBiMSAqIGExMCArIGIyICogYTIwICsgYjMgKiBhMzA7XG4gIG91dFsxM10gPSBiMCAqIGEwMSArIGIxICogYTExICsgYjIgKiBhMjEgKyBiMyAqIGEzMTtcbiAgb3V0WzE0XSA9IGIwICogYTAyICsgYjEgKiBhMTIgKyBiMiAqIGEyMiArIGIzICogYTMyO1xuICBvdXRbMTVdID0gYjAgKiBhMDMgKyBiMSAqIGExMyArIGIyICogYTIzICsgYjMgKiBhMzM7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogVHJhbnNsYXRlIGEgbWF0NCBieSB0aGUgZ2l2ZW4gdmVjdG9yXHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBtYXRyaXggdG8gdHJhbnNsYXRlXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSB2IHZlY3RvciB0byB0cmFuc2xhdGUgYnlcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zbGF0ZShvdXQsIGEsIHYpIHtcbiAgdmFyIHggPSB2WzBdLFxuICAgICAgeSA9IHZbMV0sXG4gICAgICB6ID0gdlsyXTtcbiAgdmFyIGEwMCwgYTAxLCBhMDIsIGEwMztcbiAgdmFyIGExMCwgYTExLCBhMTIsIGExMztcbiAgdmFyIGEyMCwgYTIxLCBhMjIsIGEyMztcblxuICBpZiAoYSA9PT0gb3V0KSB7XG4gICAgb3V0WzEyXSA9IGFbMF0gKiB4ICsgYVs0XSAqIHkgKyBhWzhdICogeiArIGFbMTJdO1xuICAgIG91dFsxM10gPSBhWzFdICogeCArIGFbNV0gKiB5ICsgYVs5XSAqIHogKyBhWzEzXTtcbiAgICBvdXRbMTRdID0gYVsyXSAqIHggKyBhWzZdICogeSArIGFbMTBdICogeiArIGFbMTRdO1xuICAgIG91dFsxNV0gPSBhWzNdICogeCArIGFbN10gKiB5ICsgYVsxMV0gKiB6ICsgYVsxNV07XG4gIH0gZWxzZSB7XG4gICAgYTAwID0gYVswXTtcbiAgICBhMDEgPSBhWzFdO1xuICAgIGEwMiA9IGFbMl07XG4gICAgYTAzID0gYVszXTtcbiAgICBhMTAgPSBhWzRdO1xuICAgIGExMSA9IGFbNV07XG4gICAgYTEyID0gYVs2XTtcbiAgICBhMTMgPSBhWzddO1xuICAgIGEyMCA9IGFbOF07XG4gICAgYTIxID0gYVs5XTtcbiAgICBhMjIgPSBhWzEwXTtcbiAgICBhMjMgPSBhWzExXTtcbiAgICBvdXRbMF0gPSBhMDA7XG4gICAgb3V0WzFdID0gYTAxO1xuICAgIG91dFsyXSA9IGEwMjtcbiAgICBvdXRbM10gPSBhMDM7XG4gICAgb3V0WzRdID0gYTEwO1xuICAgIG91dFs1XSA9IGExMTtcbiAgICBvdXRbNl0gPSBhMTI7XG4gICAgb3V0WzddID0gYTEzO1xuICAgIG91dFs4XSA9IGEyMDtcbiAgICBvdXRbOV0gPSBhMjE7XG4gICAgb3V0WzEwXSA9IGEyMjtcbiAgICBvdXRbMTFdID0gYTIzO1xuICAgIG91dFsxMl0gPSBhMDAgKiB4ICsgYTEwICogeSArIGEyMCAqIHogKyBhWzEyXTtcbiAgICBvdXRbMTNdID0gYTAxICogeCArIGExMSAqIHkgKyBhMjEgKiB6ICsgYVsxM107XG4gICAgb3V0WzE0XSA9IGEwMiAqIHggKyBhMTIgKiB5ICsgYTIyICogeiArIGFbMTRdO1xuICAgIG91dFsxNV0gPSBhMDMgKiB4ICsgYTEzICogeSArIGEyMyAqIHogKyBhWzE1XTtcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogU2NhbGVzIHRoZSBtYXQ0IGJ5IHRoZSBkaW1lbnNpb25zIGluIHRoZSBnaXZlbiB2ZWMzIG5vdCB1c2luZyB2ZWN0b3JpemF0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBtYXRyaXggdG8gc2NhbGVcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHYgdGhlIHZlYzMgdG8gc2NhbGUgdGhlIG1hdHJpeCBieVxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlKG91dCwgYSwgdikge1xuICB2YXIgeCA9IHZbMF0sXG4gICAgICB5ID0gdlsxXSxcbiAgICAgIHogPSB2WzJdO1xuICBvdXRbMF0gPSBhWzBdICogeDtcbiAgb3V0WzFdID0gYVsxXSAqIHg7XG4gIG91dFsyXSA9IGFbMl0gKiB4O1xuICBvdXRbM10gPSBhWzNdICogeDtcbiAgb3V0WzRdID0gYVs0XSAqIHk7XG4gIG91dFs1XSA9IGFbNV0gKiB5O1xuICBvdXRbNl0gPSBhWzZdICogeTtcbiAgb3V0WzddID0gYVs3XSAqIHk7XG4gIG91dFs4XSA9IGFbOF0gKiB6O1xuICBvdXRbOV0gPSBhWzldICogejtcbiAgb3V0WzEwXSA9IGFbMTBdICogejtcbiAgb3V0WzExXSA9IGFbMTFdICogejtcbiAgb3V0WzEyXSA9IGFbMTJdO1xuICBvdXRbMTNdID0gYVsxM107XG4gIG91dFsxNF0gPSBhWzE0XTtcbiAgb3V0WzE1XSA9IGFbMTVdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFJvdGF0ZXMgYSBtYXQ0IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIGdpdmVuIGF4aXNcclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcclxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGF4aXMgdGhlIGF4aXMgdG8gcm90YXRlIGFyb3VuZFxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcm90YXRlKG91dCwgYSwgcmFkLCBheGlzKSB7XG4gIHZhciB4ID0gYXhpc1swXSxcbiAgICAgIHkgPSBheGlzWzFdLFxuICAgICAgeiA9IGF4aXNbMl07XG4gIHZhciBsZW4gPSBNYXRoLmh5cG90KHgsIHksIHopO1xuICB2YXIgcywgYywgdDtcbiAgdmFyIGEwMCwgYTAxLCBhMDIsIGEwMztcbiAgdmFyIGExMCwgYTExLCBhMTIsIGExMztcbiAgdmFyIGEyMCwgYTIxLCBhMjIsIGEyMztcbiAgdmFyIGIwMCwgYjAxLCBiMDI7XG4gIHZhciBiMTAsIGIxMSwgYjEyO1xuICB2YXIgYjIwLCBiMjEsIGIyMjtcblxuICBpZiAobGVuIDwgZ2xNYXRyaXguRVBTSUxPTikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgbGVuID0gMSAvIGxlbjtcbiAgeCAqPSBsZW47XG4gIHkgKj0gbGVuO1xuICB6ICo9IGxlbjtcbiAgcyA9IE1hdGguc2luKHJhZCk7XG4gIGMgPSBNYXRoLmNvcyhyYWQpO1xuICB0ID0gMSAtIGM7XG4gIGEwMCA9IGFbMF07XG4gIGEwMSA9IGFbMV07XG4gIGEwMiA9IGFbMl07XG4gIGEwMyA9IGFbM107XG4gIGExMCA9IGFbNF07XG4gIGExMSA9IGFbNV07XG4gIGExMiA9IGFbNl07XG4gIGExMyA9IGFbN107XG4gIGEyMCA9IGFbOF07XG4gIGEyMSA9IGFbOV07XG4gIGEyMiA9IGFbMTBdO1xuICBhMjMgPSBhWzExXTsgLy8gQ29uc3RydWN0IHRoZSBlbGVtZW50cyBvZiB0aGUgcm90YXRpb24gbWF0cml4XG5cbiAgYjAwID0geCAqIHggKiB0ICsgYztcbiAgYjAxID0geSAqIHggKiB0ICsgeiAqIHM7XG4gIGIwMiA9IHogKiB4ICogdCAtIHkgKiBzO1xuICBiMTAgPSB4ICogeSAqIHQgLSB6ICogcztcbiAgYjExID0geSAqIHkgKiB0ICsgYztcbiAgYjEyID0geiAqIHkgKiB0ICsgeCAqIHM7XG4gIGIyMCA9IHggKiB6ICogdCArIHkgKiBzO1xuICBiMjEgPSB5ICogeiAqIHQgLSB4ICogcztcbiAgYjIyID0geiAqIHogKiB0ICsgYzsgLy8gUGVyZm9ybSByb3RhdGlvbi1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cblxuICBvdXRbMF0gPSBhMDAgKiBiMDAgKyBhMTAgKiBiMDEgKyBhMjAgKiBiMDI7XG4gIG91dFsxXSA9IGEwMSAqIGIwMCArIGExMSAqIGIwMSArIGEyMSAqIGIwMjtcbiAgb3V0WzJdID0gYTAyICogYjAwICsgYTEyICogYjAxICsgYTIyICogYjAyO1xuICBvdXRbM10gPSBhMDMgKiBiMDAgKyBhMTMgKiBiMDEgKyBhMjMgKiBiMDI7XG4gIG91dFs0XSA9IGEwMCAqIGIxMCArIGExMCAqIGIxMSArIGEyMCAqIGIxMjtcbiAgb3V0WzVdID0gYTAxICogYjEwICsgYTExICogYjExICsgYTIxICogYjEyO1xuICBvdXRbNl0gPSBhMDIgKiBiMTAgKyBhMTIgKiBiMTEgKyBhMjIgKiBiMTI7XG4gIG91dFs3XSA9IGEwMyAqIGIxMCArIGExMyAqIGIxMSArIGEyMyAqIGIxMjtcbiAgb3V0WzhdID0gYTAwICogYjIwICsgYTEwICogYjIxICsgYTIwICogYjIyO1xuICBvdXRbOV0gPSBhMDEgKiBiMjAgKyBhMTEgKiBiMjEgKyBhMjEgKiBiMjI7XG4gIG91dFsxMF0gPSBhMDIgKiBiMjAgKyBhMTIgKiBiMjEgKyBhMjIgKiBiMjI7XG4gIG91dFsxMV0gPSBhMDMgKiBiMjAgKyBhMTMgKiBiMjEgKyBhMjMgKiBiMjI7XG5cbiAgaWYgKGEgIT09IG91dCkge1xuICAgIC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIGxhc3Qgcm93XG4gICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgb3V0WzE1XSA9IGFbMTVdO1xuICB9XG5cbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBSb3RhdGVzIGEgbWF0cml4IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFggYXhpc1xyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcm90YXRlWChvdXQsIGEsIHJhZCkge1xuICB2YXIgcyA9IE1hdGguc2luKHJhZCk7XG4gIHZhciBjID0gTWF0aC5jb3MocmFkKTtcbiAgdmFyIGExMCA9IGFbNF07XG4gIHZhciBhMTEgPSBhWzVdO1xuICB2YXIgYTEyID0gYVs2XTtcbiAgdmFyIGExMyA9IGFbN107XG4gIHZhciBhMjAgPSBhWzhdO1xuICB2YXIgYTIxID0gYVs5XTtcbiAgdmFyIGEyMiA9IGFbMTBdO1xuICB2YXIgYTIzID0gYVsxMV07XG5cbiAgaWYgKGEgIT09IG91dCkge1xuICAgIC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIHJvd3NcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxM107XG4gICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgfSAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG5cblxuICBvdXRbNF0gPSBhMTAgKiBjICsgYTIwICogcztcbiAgb3V0WzVdID0gYTExICogYyArIGEyMSAqIHM7XG4gIG91dFs2XSA9IGExMiAqIGMgKyBhMjIgKiBzO1xuICBvdXRbN10gPSBhMTMgKiBjICsgYTIzICogcztcbiAgb3V0WzhdID0gYTIwICogYyAtIGExMCAqIHM7XG4gIG91dFs5XSA9IGEyMSAqIGMgLSBhMTEgKiBzO1xuICBvdXRbMTBdID0gYTIyICogYyAtIGExMiAqIHM7XG4gIG91dFsxMV0gPSBhMjMgKiBjIC0gYTEzICogcztcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBSb3RhdGVzIGEgbWF0cml4IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFkgYXhpc1xyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcm90YXRlWShvdXQsIGEsIHJhZCkge1xuICB2YXIgcyA9IE1hdGguc2luKHJhZCk7XG4gIHZhciBjID0gTWF0aC5jb3MocmFkKTtcbiAgdmFyIGEwMCA9IGFbMF07XG4gIHZhciBhMDEgPSBhWzFdO1xuICB2YXIgYTAyID0gYVsyXTtcbiAgdmFyIGEwMyA9IGFbM107XG4gIHZhciBhMjAgPSBhWzhdO1xuICB2YXIgYTIxID0gYVs5XTtcbiAgdmFyIGEyMiA9IGFbMTBdO1xuICB2YXIgYTIzID0gYVsxMV07XG5cbiAgaWYgKGEgIT09IG91dCkge1xuICAgIC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIHJvd3NcbiAgICBvdXRbNF0gPSBhWzRdO1xuICAgIG91dFs1XSA9IGFbNV07XG4gICAgb3V0WzZdID0gYVs2XTtcbiAgICBvdXRbN10gPSBhWzddO1xuICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxM107XG4gICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgfSAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG5cblxuICBvdXRbMF0gPSBhMDAgKiBjIC0gYTIwICogcztcbiAgb3V0WzFdID0gYTAxICogYyAtIGEyMSAqIHM7XG4gIG91dFsyXSA9IGEwMiAqIGMgLSBhMjIgKiBzO1xuICBvdXRbM10gPSBhMDMgKiBjIC0gYTIzICogcztcbiAgb3V0WzhdID0gYTAwICogcyArIGEyMCAqIGM7XG4gIG91dFs5XSA9IGEwMSAqIHMgKyBhMjEgKiBjO1xuICBvdXRbMTBdID0gYTAyICogcyArIGEyMiAqIGM7XG4gIG91dFsxMV0gPSBhMDMgKiBzICsgYTIzICogYztcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBSb3RhdGVzIGEgbWF0cml4IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFogYXhpc1xyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcm90YXRlWihvdXQsIGEsIHJhZCkge1xuICB2YXIgcyA9IE1hdGguc2luKHJhZCk7XG4gIHZhciBjID0gTWF0aC5jb3MocmFkKTtcbiAgdmFyIGEwMCA9IGFbMF07XG4gIHZhciBhMDEgPSBhWzFdO1xuICB2YXIgYTAyID0gYVsyXTtcbiAgdmFyIGEwMyA9IGFbM107XG4gIHZhciBhMTAgPSBhWzRdO1xuICB2YXIgYTExID0gYVs1XTtcbiAgdmFyIGExMiA9IGFbNl07XG4gIHZhciBhMTMgPSBhWzddO1xuXG4gIGlmIChhICE9PSBvdXQpIHtcbiAgICAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCBsYXN0IHJvd1xuICAgIG91dFs4XSA9IGFbOF07XG4gICAgb3V0WzldID0gYVs5XTtcbiAgICBvdXRbMTBdID0gYVsxMF07XG4gICAgb3V0WzExXSA9IGFbMTFdO1xuICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxM107XG4gICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgfSAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG5cblxuICBvdXRbMF0gPSBhMDAgKiBjICsgYTEwICogcztcbiAgb3V0WzFdID0gYTAxICogYyArIGExMSAqIHM7XG4gIG91dFsyXSA9IGEwMiAqIGMgKyBhMTIgKiBzO1xuICBvdXRbM10gPSBhMDMgKiBjICsgYTEzICogcztcbiAgb3V0WzRdID0gYTEwICogYyAtIGEwMCAqIHM7XG4gIG91dFs1XSA9IGExMSAqIGMgLSBhMDEgKiBzO1xuICBvdXRbNl0gPSBhMTIgKiBjIC0gYTAyICogcztcbiAgb3V0WzddID0gYTEzICogYyAtIGEwMyAqIHM7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgdmVjdG9yIHRyYW5zbGF0aW9uXHJcbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxyXG4gKlxyXG4gKiAgICAgbWF0NC5pZGVudGl0eShkZXN0KTtcclxuICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIGRlc3QsIHZlYyk7XHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHYgVHJhbnNsYXRpb24gdmVjdG9yXHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tVHJhbnNsYXRpb24ob3V0LCB2KSB7XG4gIG91dFswXSA9IDE7XG4gIG91dFsxXSA9IDA7XG4gIG91dFsyXSA9IDA7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IDA7XG4gIG91dFs1XSA9IDE7XG4gIG91dFs2XSA9IDA7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9IDA7XG4gIG91dFs5XSA9IDA7XG4gIG91dFsxMF0gPSAxO1xuICBvdXRbMTFdID0gMDtcbiAgb3V0WzEyXSA9IHZbMF07XG4gIG91dFsxM10gPSB2WzFdO1xuICBvdXRbMTRdID0gdlsyXTtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgdmVjdG9yIHNjYWxpbmdcclxuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XHJcbiAqXHJcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xyXG4gKiAgICAgbWF0NC5zY2FsZShkZXN0LCBkZXN0LCB2ZWMpO1xyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSB2IFNjYWxpbmcgdmVjdG9yXHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tU2NhbGluZyhvdXQsIHYpIHtcbiAgb3V0WzBdID0gdlswXTtcbiAgb3V0WzFdID0gMDtcbiAgb3V0WzJdID0gMDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gMDtcbiAgb3V0WzVdID0gdlsxXTtcbiAgb3V0WzZdID0gMDtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gMDtcbiAgb3V0WzldID0gMDtcbiAgb3V0WzEwXSA9IHZbMl07XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gMDtcbiAgb3V0WzEzXSA9IDA7XG4gIG91dFsxNF0gPSAwO1xuICBvdXRbMTVdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSBnaXZlbiBhbmdsZSBhcm91bmQgYSBnaXZlbiBheGlzXHJcbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxyXG4gKlxyXG4gKiAgICAgbWF0NC5pZGVudGl0eShkZXN0KTtcclxuICogICAgIG1hdDQucm90YXRlKGRlc3QsIGRlc3QsIHJhZCwgYXhpcyk7XHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGF4aXMgdGhlIGF4aXMgdG8gcm90YXRlIGFyb3VuZFxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVJvdGF0aW9uKG91dCwgcmFkLCBheGlzKSB7XG4gIHZhciB4ID0gYXhpc1swXSxcbiAgICAgIHkgPSBheGlzWzFdLFxuICAgICAgeiA9IGF4aXNbMl07XG4gIHZhciBsZW4gPSBNYXRoLmh5cG90KHgsIHksIHopO1xuICB2YXIgcywgYywgdDtcblxuICBpZiAobGVuIDwgZ2xNYXRyaXguRVBTSUxPTikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgbGVuID0gMSAvIGxlbjtcbiAgeCAqPSBsZW47XG4gIHkgKj0gbGVuO1xuICB6ICo9IGxlbjtcbiAgcyA9IE1hdGguc2luKHJhZCk7XG4gIGMgPSBNYXRoLmNvcyhyYWQpO1xuICB0ID0gMSAtIGM7IC8vIFBlcmZvcm0gcm90YXRpb24tc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG5cbiAgb3V0WzBdID0geCAqIHggKiB0ICsgYztcbiAgb3V0WzFdID0geSAqIHggKiB0ICsgeiAqIHM7XG4gIG91dFsyXSA9IHogKiB4ICogdCAtIHkgKiBzO1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSB4ICogeSAqIHQgLSB6ICogcztcbiAgb3V0WzVdID0geSAqIHkgKiB0ICsgYztcbiAgb3V0WzZdID0geiAqIHkgKiB0ICsgeCAqIHM7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9IHggKiB6ICogdCArIHkgKiBzO1xuICBvdXRbOV0gPSB5ICogeiAqIHQgLSB4ICogcztcbiAgb3V0WzEwXSA9IHogKiB6ICogdCArIGM7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gMDtcbiAgb3V0WzEzXSA9IDA7XG4gIG91dFsxNF0gPSAwO1xuICBvdXRbMTVdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWCBheGlzXHJcbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxyXG4gKlxyXG4gKiAgICAgbWF0NC5pZGVudGl0eShkZXN0KTtcclxuICogICAgIG1hdDQucm90YXRlWChkZXN0LCBkZXN0LCByYWQpO1xyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tWFJvdGF0aW9uKG91dCwgcmFkKSB7XG4gIHZhciBzID0gTWF0aC5zaW4ocmFkKTtcbiAgdmFyIGMgPSBNYXRoLmNvcyhyYWQpOyAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG5cbiAgb3V0WzBdID0gMTtcbiAgb3V0WzFdID0gMDtcbiAgb3V0WzJdID0gMDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gMDtcbiAgb3V0WzVdID0gYztcbiAgb3V0WzZdID0gcztcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gMDtcbiAgb3V0WzldID0gLXM7XG4gIG91dFsxMF0gPSBjO1xuICBvdXRbMTFdID0gMDtcbiAgb3V0WzEyXSA9IDA7XG4gIG91dFsxM10gPSAwO1xuICBvdXRbMTRdID0gMDtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFkgYXhpc1xyXG4gKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcclxuICpcclxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XHJcbiAqICAgICBtYXQ0LnJvdGF0ZVkoZGVzdCwgZGVzdCwgcmFkKTtcclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxyXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVlSb3RhdGlvbihvdXQsIHJhZCkge1xuICB2YXIgcyA9IE1hdGguc2luKHJhZCk7XG4gIHZhciBjID0gTWF0aC5jb3MocmFkKTsgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuXG4gIG91dFswXSA9IGM7XG4gIG91dFsxXSA9IDA7XG4gIG91dFsyXSA9IC1zO1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSAwO1xuICBvdXRbNV0gPSAxO1xuICBvdXRbNl0gPSAwO1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSBzO1xuICBvdXRbOV0gPSAwO1xuICBvdXRbMTBdID0gYztcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSAwO1xuICBvdXRbMTNdID0gMDtcbiAgb3V0WzE0XSA9IDA7XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBaIGF4aXNcclxuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XHJcbiAqXHJcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xyXG4gKiAgICAgbWF0NC5yb3RhdGVaKGRlc3QsIGRlc3QsIHJhZCk7XHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21aUm90YXRpb24ob3V0LCByYWQpIHtcbiAgdmFyIHMgPSBNYXRoLnNpbihyYWQpO1xuICB2YXIgYyA9IE1hdGguY29zKHJhZCk7IC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cblxuICBvdXRbMF0gPSBjO1xuICBvdXRbMV0gPSBzO1xuICBvdXRbMl0gPSAwO1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSAtcztcbiAgb3V0WzVdID0gYztcbiAgb3V0WzZdID0gMDtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gMDtcbiAgb3V0WzldID0gMDtcbiAgb3V0WzEwXSA9IDE7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gMDtcbiAgb3V0WzEzXSA9IDA7XG4gIG91dFsxNF0gPSAwO1xuICBvdXRbMTVdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSBxdWF0ZXJuaW9uIHJvdGF0aW9uIGFuZCB2ZWN0b3IgdHJhbnNsYXRpb25cclxuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XHJcbiAqXHJcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xyXG4gKiAgICAgbWF0NC50cmFuc2xhdGUoZGVzdCwgdmVjKTtcclxuICogICAgIGxldCBxdWF0TWF0ID0gbWF0NC5jcmVhdGUoKTtcclxuICogICAgIHF1YXQ0LnRvTWF0NChxdWF0LCBxdWF0TWF0KTtcclxuICogICAgIG1hdDQubXVsdGlwbHkoZGVzdCwgcXVhdE1hdCk7XHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcclxuICogQHBhcmFtIHtxdWF0NH0gcSBSb3RhdGlvbiBxdWF0ZXJuaW9uXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSB2IFRyYW5zbGF0aW9uIHZlY3RvclxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVJvdGF0aW9uVHJhbnNsYXRpb24ob3V0LCBxLCB2KSB7XG4gIC8vIFF1YXRlcm5pb24gbWF0aFxuICB2YXIgeCA9IHFbMF0sXG4gICAgICB5ID0gcVsxXSxcbiAgICAgIHogPSBxWzJdLFxuICAgICAgdyA9IHFbM107XG4gIHZhciB4MiA9IHggKyB4O1xuICB2YXIgeTIgPSB5ICsgeTtcbiAgdmFyIHoyID0geiArIHo7XG4gIHZhciB4eCA9IHggKiB4MjtcbiAgdmFyIHh5ID0geCAqIHkyO1xuICB2YXIgeHogPSB4ICogejI7XG4gIHZhciB5eSA9IHkgKiB5MjtcbiAgdmFyIHl6ID0geSAqIHoyO1xuICB2YXIgenogPSB6ICogejI7XG4gIHZhciB3eCA9IHcgKiB4MjtcbiAgdmFyIHd5ID0gdyAqIHkyO1xuICB2YXIgd3ogPSB3ICogejI7XG4gIG91dFswXSA9IDEgLSAoeXkgKyB6eik7XG4gIG91dFsxXSA9IHh5ICsgd3o7XG4gIG91dFsyXSA9IHh6IC0gd3k7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IHh5IC0gd3o7XG4gIG91dFs1XSA9IDEgLSAoeHggKyB6eik7XG4gIG91dFs2XSA9IHl6ICsgd3g7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9IHh6ICsgd3k7XG4gIG91dFs5XSA9IHl6IC0gd3g7XG4gIG91dFsxMF0gPSAxIC0gKHh4ICsgeXkpO1xuICBvdXRbMTFdID0gMDtcbiAgb3V0WzEyXSA9IHZbMF07XG4gIG91dFsxM10gPSB2WzFdO1xuICBvdXRbMTRdID0gdlsyXTtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQ3JlYXRlcyBhIG5ldyBtYXQ0IGZyb20gYSBkdWFsIHF1YXQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IE1hdHJpeFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5UXVhdDJ9IGEgRHVhbCBRdWF0ZXJuaW9uXHJcbiAqIEByZXR1cm5zIHttYXQ0fSBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVF1YXQyKG91dCwgYSkge1xuICB2YXIgdHJhbnNsYXRpb24gPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgzKTtcbiAgdmFyIGJ4ID0gLWFbMF0sXG4gICAgICBieSA9IC1hWzFdLFxuICAgICAgYnogPSAtYVsyXSxcbiAgICAgIGJ3ID0gYVszXSxcbiAgICAgIGF4ID0gYVs0XSxcbiAgICAgIGF5ID0gYVs1XSxcbiAgICAgIGF6ID0gYVs2XSxcbiAgICAgIGF3ID0gYVs3XTtcbiAgdmFyIG1hZ25pdHVkZSA9IGJ4ICogYnggKyBieSAqIGJ5ICsgYnogKiBieiArIGJ3ICogYnc7IC8vT25seSBzY2FsZSBpZiBpdCBtYWtlcyBzZW5zZVxuXG4gIGlmIChtYWduaXR1ZGUgPiAwKSB7XG4gICAgdHJhbnNsYXRpb25bMF0gPSAoYXggKiBidyArIGF3ICogYnggKyBheSAqIGJ6IC0gYXogKiBieSkgKiAyIC8gbWFnbml0dWRlO1xuICAgIHRyYW5zbGF0aW9uWzFdID0gKGF5ICogYncgKyBhdyAqIGJ5ICsgYXogKiBieCAtIGF4ICogYnopICogMiAvIG1hZ25pdHVkZTtcbiAgICB0cmFuc2xhdGlvblsyXSA9IChheiAqIGJ3ICsgYXcgKiBieiArIGF4ICogYnkgLSBheSAqIGJ4KSAqIDIgLyBtYWduaXR1ZGU7XG4gIH0gZWxzZSB7XG4gICAgdHJhbnNsYXRpb25bMF0gPSAoYXggKiBidyArIGF3ICogYnggKyBheSAqIGJ6IC0gYXogKiBieSkgKiAyO1xuICAgIHRyYW5zbGF0aW9uWzFdID0gKGF5ICogYncgKyBhdyAqIGJ5ICsgYXogKiBieCAtIGF4ICogYnopICogMjtcbiAgICB0cmFuc2xhdGlvblsyXSA9IChheiAqIGJ3ICsgYXcgKiBieiArIGF4ICogYnkgLSBheSAqIGJ4KSAqIDI7XG4gIH1cblxuICBmcm9tUm90YXRpb25UcmFuc2xhdGlvbihvdXQsIGEsIHRyYW5zbGF0aW9uKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSB0cmFuc2xhdGlvbiB2ZWN0b3IgY29tcG9uZW50IG9mIGEgdHJhbnNmb3JtYXRpb25cclxuICogIG1hdHJpeC4gSWYgYSBtYXRyaXggaXMgYnVpbHQgd2l0aCBmcm9tUm90YXRpb25UcmFuc2xhdGlvbixcclxuICogIHRoZSByZXR1cm5lZCB2ZWN0b3Igd2lsbCBiZSB0aGUgc2FtZSBhcyB0aGUgdHJhbnNsYXRpb24gdmVjdG9yXHJcbiAqICBvcmlnaW5hbGx5IHN1cHBsaWVkLlxyXG4gKiBAcGFyYW0gIHt2ZWMzfSBvdXQgVmVjdG9yIHRvIHJlY2VpdmUgdHJhbnNsYXRpb24gY29tcG9uZW50XHJcbiAqIEBwYXJhbSAge1JlYWRvbmx5TWF0NH0gbWF0IE1hdHJpeCB0byBiZSBkZWNvbXBvc2VkIChpbnB1dClcclxuICogQHJldHVybiB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJhbnNsYXRpb24ob3V0LCBtYXQpIHtcbiAgb3V0WzBdID0gbWF0WzEyXTtcbiAgb3V0WzFdID0gbWF0WzEzXTtcbiAgb3V0WzJdID0gbWF0WzE0XTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBzY2FsaW5nIGZhY3RvciBjb21wb25lbnQgb2YgYSB0cmFuc2Zvcm1hdGlvblxyXG4gKiAgbWF0cml4LiBJZiBhIG1hdHJpeCBpcyBidWlsdCB3aXRoIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uU2NhbGVcclxuICogIHdpdGggYSBub3JtYWxpemVkIFF1YXRlcm5pb24gcGFyYW10ZXIsIHRoZSByZXR1cm5lZCB2ZWN0b3Igd2lsbCBiZVxyXG4gKiAgdGhlIHNhbWUgYXMgdGhlIHNjYWxpbmcgdmVjdG9yXHJcbiAqICBvcmlnaW5hbGx5IHN1cHBsaWVkLlxyXG4gKiBAcGFyYW0gIHt2ZWMzfSBvdXQgVmVjdG9yIHRvIHJlY2VpdmUgc2NhbGluZyBmYWN0b3IgY29tcG9uZW50XHJcbiAqIEBwYXJhbSAge1JlYWRvbmx5TWF0NH0gbWF0IE1hdHJpeCB0byBiZSBkZWNvbXBvc2VkIChpbnB1dClcclxuICogQHJldHVybiB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2NhbGluZyhvdXQsIG1hdCkge1xuICB2YXIgbTExID0gbWF0WzBdO1xuICB2YXIgbTEyID0gbWF0WzFdO1xuICB2YXIgbTEzID0gbWF0WzJdO1xuICB2YXIgbTIxID0gbWF0WzRdO1xuICB2YXIgbTIyID0gbWF0WzVdO1xuICB2YXIgbTIzID0gbWF0WzZdO1xuICB2YXIgbTMxID0gbWF0WzhdO1xuICB2YXIgbTMyID0gbWF0WzldO1xuICB2YXIgbTMzID0gbWF0WzEwXTtcbiAgb3V0WzBdID0gTWF0aC5oeXBvdChtMTEsIG0xMiwgbTEzKTtcbiAgb3V0WzFdID0gTWF0aC5oeXBvdChtMjEsIG0yMiwgbTIzKTtcbiAgb3V0WzJdID0gTWF0aC5oeXBvdChtMzEsIG0zMiwgbTMzKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBSZXR1cm5zIGEgcXVhdGVybmlvbiByZXByZXNlbnRpbmcgdGhlIHJvdGF0aW9uYWwgY29tcG9uZW50XHJcbiAqICBvZiBhIHRyYW5zZm9ybWF0aW9uIG1hdHJpeC4gSWYgYSBtYXRyaXggaXMgYnVpbHQgd2l0aFxyXG4gKiAgZnJvbVJvdGF0aW9uVHJhbnNsYXRpb24sIHRoZSByZXR1cm5lZCBxdWF0ZXJuaW9uIHdpbGwgYmUgdGhlXHJcbiAqICBzYW1lIGFzIHRoZSBxdWF0ZXJuaW9uIG9yaWdpbmFsbHkgc3VwcGxpZWQuXHJcbiAqIEBwYXJhbSB7cXVhdH0gb3V0IFF1YXRlcm5pb24gdG8gcmVjZWl2ZSB0aGUgcm90YXRpb24gY29tcG9uZW50XHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBtYXQgTWF0cml4IHRvIGJlIGRlY29tcG9zZWQgKGlucHV0KVxyXG4gKiBAcmV0dXJuIHtxdWF0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSb3RhdGlvbihvdXQsIG1hdCkge1xuICB2YXIgc2NhbGluZyA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDMpO1xuICBnZXRTY2FsaW5nKHNjYWxpbmcsIG1hdCk7XG4gIHZhciBpczEgPSAxIC8gc2NhbGluZ1swXTtcbiAgdmFyIGlzMiA9IDEgLyBzY2FsaW5nWzFdO1xuICB2YXIgaXMzID0gMSAvIHNjYWxpbmdbMl07XG4gIHZhciBzbTExID0gbWF0WzBdICogaXMxO1xuICB2YXIgc20xMiA9IG1hdFsxXSAqIGlzMjtcbiAgdmFyIHNtMTMgPSBtYXRbMl0gKiBpczM7XG4gIHZhciBzbTIxID0gbWF0WzRdICogaXMxO1xuICB2YXIgc20yMiA9IG1hdFs1XSAqIGlzMjtcbiAgdmFyIHNtMjMgPSBtYXRbNl0gKiBpczM7XG4gIHZhciBzbTMxID0gbWF0WzhdICogaXMxO1xuICB2YXIgc20zMiA9IG1hdFs5XSAqIGlzMjtcbiAgdmFyIHNtMzMgPSBtYXRbMTBdICogaXMzO1xuICB2YXIgdHJhY2UgPSBzbTExICsgc20yMiArIHNtMzM7XG4gIHZhciBTID0gMDtcblxuICBpZiAodHJhY2UgPiAwKSB7XG4gICAgUyA9IE1hdGguc3FydCh0cmFjZSArIDEuMCkgKiAyO1xuICAgIG91dFszXSA9IDAuMjUgKiBTO1xuICAgIG91dFswXSA9IChzbTIzIC0gc20zMikgLyBTO1xuICAgIG91dFsxXSA9IChzbTMxIC0gc20xMykgLyBTO1xuICAgIG91dFsyXSA9IChzbTEyIC0gc20yMSkgLyBTO1xuICB9IGVsc2UgaWYgKHNtMTEgPiBzbTIyICYmIHNtMTEgPiBzbTMzKSB7XG4gICAgUyA9IE1hdGguc3FydCgxLjAgKyBzbTExIC0gc20yMiAtIHNtMzMpICogMjtcbiAgICBvdXRbM10gPSAoc20yMyAtIHNtMzIpIC8gUztcbiAgICBvdXRbMF0gPSAwLjI1ICogUztcbiAgICBvdXRbMV0gPSAoc20xMiArIHNtMjEpIC8gUztcbiAgICBvdXRbMl0gPSAoc20zMSArIHNtMTMpIC8gUztcbiAgfSBlbHNlIGlmIChzbTIyID4gc20zMykge1xuICAgIFMgPSBNYXRoLnNxcnQoMS4wICsgc20yMiAtIHNtMTEgLSBzbTMzKSAqIDI7XG4gICAgb3V0WzNdID0gKHNtMzEgLSBzbTEzKSAvIFM7XG4gICAgb3V0WzBdID0gKHNtMTIgKyBzbTIxKSAvIFM7XG4gICAgb3V0WzFdID0gMC4yNSAqIFM7XG4gICAgb3V0WzJdID0gKHNtMjMgKyBzbTMyKSAvIFM7XG4gIH0gZWxzZSB7XG4gICAgUyA9IE1hdGguc3FydCgxLjAgKyBzbTMzIC0gc20xMSAtIHNtMjIpICogMjtcbiAgICBvdXRbM10gPSAoc20xMiAtIHNtMjEpIC8gUztcbiAgICBvdXRbMF0gPSAoc20zMSArIHNtMTMpIC8gUztcbiAgICBvdXRbMV0gPSAoc20yMyArIHNtMzIpIC8gUztcbiAgICBvdXRbMl0gPSAwLjI1ICogUztcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgcXVhdGVybmlvbiByb3RhdGlvbiwgdmVjdG9yIHRyYW5zbGF0aW9uIGFuZCB2ZWN0b3Igc2NhbGVcclxuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XHJcbiAqXHJcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xyXG4gKiAgICAgbWF0NC50cmFuc2xhdGUoZGVzdCwgdmVjKTtcclxuICogICAgIGxldCBxdWF0TWF0ID0gbWF0NC5jcmVhdGUoKTtcclxuICogICAgIHF1YXQ0LnRvTWF0NChxdWF0LCBxdWF0TWF0KTtcclxuICogICAgIG1hdDQubXVsdGlwbHkoZGVzdCwgcXVhdE1hdCk7XHJcbiAqICAgICBtYXQ0LnNjYWxlKGRlc3QsIHNjYWxlKVxyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XHJcbiAqIEBwYXJhbSB7cXVhdDR9IHEgUm90YXRpb24gcXVhdGVybmlvblxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gdiBUcmFuc2xhdGlvbiB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHMgU2NhbGluZyB2ZWN0b3JcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uU2NhbGUob3V0LCBxLCB2LCBzKSB7XG4gIC8vIFF1YXRlcm5pb24gbWF0aFxuICB2YXIgeCA9IHFbMF0sXG4gICAgICB5ID0gcVsxXSxcbiAgICAgIHogPSBxWzJdLFxuICAgICAgdyA9IHFbM107XG4gIHZhciB4MiA9IHggKyB4O1xuICB2YXIgeTIgPSB5ICsgeTtcbiAgdmFyIHoyID0geiArIHo7XG4gIHZhciB4eCA9IHggKiB4MjtcbiAgdmFyIHh5ID0geCAqIHkyO1xuICB2YXIgeHogPSB4ICogejI7XG4gIHZhciB5eSA9IHkgKiB5MjtcbiAgdmFyIHl6ID0geSAqIHoyO1xuICB2YXIgenogPSB6ICogejI7XG4gIHZhciB3eCA9IHcgKiB4MjtcbiAgdmFyIHd5ID0gdyAqIHkyO1xuICB2YXIgd3ogPSB3ICogejI7XG4gIHZhciBzeCA9IHNbMF07XG4gIHZhciBzeSA9IHNbMV07XG4gIHZhciBzeiA9IHNbMl07XG4gIG91dFswXSA9ICgxIC0gKHl5ICsgenopKSAqIHN4O1xuICBvdXRbMV0gPSAoeHkgKyB3eikgKiBzeDtcbiAgb3V0WzJdID0gKHh6IC0gd3kpICogc3g7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9ICh4eSAtIHd6KSAqIHN5O1xuICBvdXRbNV0gPSAoMSAtICh4eCArIHp6KSkgKiBzeTtcbiAgb3V0WzZdID0gKHl6ICsgd3gpICogc3k7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9ICh4eiArIHd5KSAqIHN6O1xuICBvdXRbOV0gPSAoeXogLSB3eCkgKiBzejtcbiAgb3V0WzEwXSA9ICgxIC0gKHh4ICsgeXkpKSAqIHN6O1xuICBvdXRbMTFdID0gMDtcbiAgb3V0WzEyXSA9IHZbMF07XG4gIG91dFsxM10gPSB2WzFdO1xuICBvdXRbMTRdID0gdlsyXTtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgcXVhdGVybmlvbiByb3RhdGlvbiwgdmVjdG9yIHRyYW5zbGF0aW9uIGFuZCB2ZWN0b3Igc2NhbGUsIHJvdGF0aW5nIGFuZCBzY2FsaW5nIGFyb3VuZCB0aGUgZ2l2ZW4gb3JpZ2luXHJcbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxyXG4gKlxyXG4gKiAgICAgbWF0NC5pZGVudGl0eShkZXN0KTtcclxuICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIHZlYyk7XHJcbiAqICAgICBtYXQ0LnRyYW5zbGF0ZShkZXN0LCBvcmlnaW4pO1xyXG4gKiAgICAgbGV0IHF1YXRNYXQgPSBtYXQ0LmNyZWF0ZSgpO1xyXG4gKiAgICAgcXVhdDQudG9NYXQ0KHF1YXQsIHF1YXRNYXQpO1xyXG4gKiAgICAgbWF0NC5tdWx0aXBseShkZXN0LCBxdWF0TWF0KTtcclxuICogICAgIG1hdDQuc2NhbGUoZGVzdCwgc2NhbGUpXHJcbiAqICAgICBtYXQ0LnRyYW5zbGF0ZShkZXN0LCBuZWdhdGl2ZU9yaWdpbik7XHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcclxuICogQHBhcmFtIHtxdWF0NH0gcSBSb3RhdGlvbiBxdWF0ZXJuaW9uXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSB2IFRyYW5zbGF0aW9uIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gcyBTY2FsaW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gbyBUaGUgb3JpZ2luIHZlY3RvciBhcm91bmQgd2hpY2ggdG8gc2NhbGUgYW5kIHJvdGF0ZVxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVJvdGF0aW9uVHJhbnNsYXRpb25TY2FsZU9yaWdpbihvdXQsIHEsIHYsIHMsIG8pIHtcbiAgLy8gUXVhdGVybmlvbiBtYXRoXG4gIHZhciB4ID0gcVswXSxcbiAgICAgIHkgPSBxWzFdLFxuICAgICAgeiA9IHFbMl0sXG4gICAgICB3ID0gcVszXTtcbiAgdmFyIHgyID0geCArIHg7XG4gIHZhciB5MiA9IHkgKyB5O1xuICB2YXIgejIgPSB6ICsgejtcbiAgdmFyIHh4ID0geCAqIHgyO1xuICB2YXIgeHkgPSB4ICogeTI7XG4gIHZhciB4eiA9IHggKiB6MjtcbiAgdmFyIHl5ID0geSAqIHkyO1xuICB2YXIgeXogPSB5ICogejI7XG4gIHZhciB6eiA9IHogKiB6MjtcbiAgdmFyIHd4ID0gdyAqIHgyO1xuICB2YXIgd3kgPSB3ICogeTI7XG4gIHZhciB3eiA9IHcgKiB6MjtcbiAgdmFyIHN4ID0gc1swXTtcbiAgdmFyIHN5ID0gc1sxXTtcbiAgdmFyIHN6ID0gc1syXTtcbiAgdmFyIG94ID0gb1swXTtcbiAgdmFyIG95ID0gb1sxXTtcbiAgdmFyIG96ID0gb1syXTtcbiAgdmFyIG91dDAgPSAoMSAtICh5eSArIHp6KSkgKiBzeDtcbiAgdmFyIG91dDEgPSAoeHkgKyB3eikgKiBzeDtcbiAgdmFyIG91dDIgPSAoeHogLSB3eSkgKiBzeDtcbiAgdmFyIG91dDQgPSAoeHkgLSB3eikgKiBzeTtcbiAgdmFyIG91dDUgPSAoMSAtICh4eCArIHp6KSkgKiBzeTtcbiAgdmFyIG91dDYgPSAoeXogKyB3eCkgKiBzeTtcbiAgdmFyIG91dDggPSAoeHogKyB3eSkgKiBzejtcbiAgdmFyIG91dDkgPSAoeXogLSB3eCkgKiBzejtcbiAgdmFyIG91dDEwID0gKDEgLSAoeHggKyB5eSkpICogc3o7XG4gIG91dFswXSA9IG91dDA7XG4gIG91dFsxXSA9IG91dDE7XG4gIG91dFsyXSA9IG91dDI7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IG91dDQ7XG4gIG91dFs1XSA9IG91dDU7XG4gIG91dFs2XSA9IG91dDY7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9IG91dDg7XG4gIG91dFs5XSA9IG91dDk7XG4gIG91dFsxMF0gPSBvdXQxMDtcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSB2WzBdICsgb3ggLSAob3V0MCAqIG94ICsgb3V0NCAqIG95ICsgb3V0OCAqIG96KTtcbiAgb3V0WzEzXSA9IHZbMV0gKyBveSAtIChvdXQxICogb3ggKyBvdXQ1ICogb3kgKyBvdXQ5ICogb3opO1xuICBvdXRbMTRdID0gdlsyXSArIG96IC0gKG91dDIgKiBveCArIG91dDYgKiBveSArIG91dDEwICogb3opO1xuICBvdXRbMTVdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIGEgNHg0IG1hdHJpeCBmcm9tIHRoZSBnaXZlbiBxdWF0ZXJuaW9uXHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcclxuICogQHBhcmFtIHtSZWFkb25seVF1YXR9IHEgUXVhdGVybmlvbiB0byBjcmVhdGUgbWF0cml4IGZyb21cclxuICpcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21RdWF0KG91dCwgcSkge1xuICB2YXIgeCA9IHFbMF0sXG4gICAgICB5ID0gcVsxXSxcbiAgICAgIHogPSBxWzJdLFxuICAgICAgdyA9IHFbM107XG4gIHZhciB4MiA9IHggKyB4O1xuICB2YXIgeTIgPSB5ICsgeTtcbiAgdmFyIHoyID0geiArIHo7XG4gIHZhciB4eCA9IHggKiB4MjtcbiAgdmFyIHl4ID0geSAqIHgyO1xuICB2YXIgeXkgPSB5ICogeTI7XG4gIHZhciB6eCA9IHogKiB4MjtcbiAgdmFyIHp5ID0geiAqIHkyO1xuICB2YXIgenogPSB6ICogejI7XG4gIHZhciB3eCA9IHcgKiB4MjtcbiAgdmFyIHd5ID0gdyAqIHkyO1xuICB2YXIgd3ogPSB3ICogejI7XG4gIG91dFswXSA9IDEgLSB5eSAtIHp6O1xuICBvdXRbMV0gPSB5eCArIHd6O1xuICBvdXRbMl0gPSB6eCAtIHd5O1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSB5eCAtIHd6O1xuICBvdXRbNV0gPSAxIC0geHggLSB6ejtcbiAgb3V0WzZdID0genkgKyB3eDtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0genggKyB3eTtcbiAgb3V0WzldID0genkgLSB3eDtcbiAgb3V0WzEwXSA9IDEgLSB4eCAtIHl5O1xuICBvdXRbMTFdID0gMDtcbiAgb3V0WzEyXSA9IDA7XG4gIG91dFsxM10gPSAwO1xuICBvdXRbMTRdID0gMDtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogR2VuZXJhdGVzIGEgZnJ1c3R1bSBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gYm91bmRzXHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cclxuICogQHBhcmFtIHtOdW1iZXJ9IGxlZnQgTGVmdCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxyXG4gKiBAcGFyYW0ge051bWJlcn0gcmlnaHQgUmlnaHQgYm91bmQgb2YgdGhlIGZydXN0dW1cclxuICogQHBhcmFtIHtOdW1iZXJ9IGJvdHRvbSBCb3R0b20gYm91bmQgb2YgdGhlIGZydXN0dW1cclxuICogQHBhcmFtIHtOdW1iZXJ9IHRvcCBUb3AgYm91bmQgb2YgdGhlIGZydXN0dW1cclxuICogQHBhcmFtIHtOdW1iZXJ9IG5lYXIgTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxyXG4gKiBAcGFyYW0ge051bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJ1c3R1bShvdXQsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyKSB7XG4gIHZhciBybCA9IDEgLyAocmlnaHQgLSBsZWZ0KTtcbiAgdmFyIHRiID0gMSAvICh0b3AgLSBib3R0b20pO1xuICB2YXIgbmYgPSAxIC8gKG5lYXIgLSBmYXIpO1xuICBvdXRbMF0gPSBuZWFyICogMiAqIHJsO1xuICBvdXRbMV0gPSAwO1xuICBvdXRbMl0gPSAwO1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSAwO1xuICBvdXRbNV0gPSBuZWFyICogMiAqIHRiO1xuICBvdXRbNl0gPSAwO1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSAocmlnaHQgKyBsZWZ0KSAqIHJsO1xuICBvdXRbOV0gPSAodG9wICsgYm90dG9tKSAqIHRiO1xuICBvdXRbMTBdID0gKGZhciArIG5lYXIpICogbmY7XG4gIG91dFsxMV0gPSAtMTtcbiAgb3V0WzEyXSA9IDA7XG4gIG91dFsxM10gPSAwO1xuICBvdXRbMTRdID0gZmFyICogbmVhciAqIDIgKiBuZjtcbiAgb3V0WzE1XSA9IDA7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogR2VuZXJhdGVzIGEgcGVyc3BlY3RpdmUgcHJvamVjdGlvbiBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gYm91bmRzLlxyXG4gKiBQYXNzaW5nIG51bGwvdW5kZWZpbmVkL25vIHZhbHVlIGZvciBmYXIgd2lsbCBnZW5lcmF0ZSBpbmZpbml0ZSBwcm9qZWN0aW9uIG1hdHJpeC5cclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xyXG4gKiBAcGFyYW0ge251bWJlcn0gZm92eSBWZXJ0aWNhbCBmaWVsZCBvZiB2aWV3IGluIHJhZGlhbnNcclxuICogQHBhcmFtIHtudW1iZXJ9IGFzcGVjdCBBc3BlY3QgcmF0aW8uIHR5cGljYWxseSB2aWV3cG9ydCB3aWR0aC9oZWlnaHRcclxuICogQHBhcmFtIHtudW1iZXJ9IG5lYXIgTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxyXG4gKiBAcGFyYW0ge251bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bSwgY2FuIGJlIG51bGwgb3IgSW5maW5pdHlcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHBlcnNwZWN0aXZlKG91dCwgZm92eSwgYXNwZWN0LCBuZWFyLCBmYXIpIHtcbiAgdmFyIGYgPSAxLjAgLyBNYXRoLnRhbihmb3Z5IC8gMiksXG4gICAgICBuZjtcbiAgb3V0WzBdID0gZiAvIGFzcGVjdDtcbiAgb3V0WzFdID0gMDtcbiAgb3V0WzJdID0gMDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gMDtcbiAgb3V0WzVdID0gZjtcbiAgb3V0WzZdID0gMDtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gMDtcbiAgb3V0WzldID0gMDtcbiAgb3V0WzExXSA9IC0xO1xuICBvdXRbMTJdID0gMDtcbiAgb3V0WzEzXSA9IDA7XG4gIG91dFsxNV0gPSAwO1xuXG4gIGlmIChmYXIgIT0gbnVsbCAmJiBmYXIgIT09IEluZmluaXR5KSB7XG4gICAgbmYgPSAxIC8gKG5lYXIgLSBmYXIpO1xuICAgIG91dFsxMF0gPSAoZmFyICsgbmVhcikgKiBuZjtcbiAgICBvdXRbMTRdID0gMiAqIGZhciAqIG5lYXIgKiBuZjtcbiAgfSBlbHNlIHtcbiAgICBvdXRbMTBdID0gLTE7XG4gICAgb3V0WzE0XSA9IC0yICogbmVhcjtcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogR2VuZXJhdGVzIGEgcGVyc3BlY3RpdmUgcHJvamVjdGlvbiBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gZmllbGQgb2Ygdmlldy5cclxuICogVGhpcyBpcyBwcmltYXJpbHkgdXNlZnVsIGZvciBnZW5lcmF0aW5nIHByb2plY3Rpb24gbWF0cmljZXMgdG8gYmUgdXNlZFxyXG4gKiB3aXRoIHRoZSBzdGlsbCBleHBlcmllbWVudGFsIFdlYlZSIEFQSS5cclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xyXG4gKiBAcGFyYW0ge09iamVjdH0gZm92IE9iamVjdCBjb250YWluaW5nIHRoZSBmb2xsb3dpbmcgdmFsdWVzOiB1cERlZ3JlZXMsIGRvd25EZWdyZWVzLCBsZWZ0RGVncmVlcywgcmlnaHREZWdyZWVzXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBuZWFyIE5lYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cclxuICogQHBhcmFtIHtudW1iZXJ9IGZhciBGYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHBlcnNwZWN0aXZlRnJvbUZpZWxkT2ZWaWV3KG91dCwgZm92LCBuZWFyLCBmYXIpIHtcbiAgdmFyIHVwVGFuID0gTWF0aC50YW4oZm92LnVwRGVncmVlcyAqIE1hdGguUEkgLyAxODAuMCk7XG4gIHZhciBkb3duVGFuID0gTWF0aC50YW4oZm92LmRvd25EZWdyZWVzICogTWF0aC5QSSAvIDE4MC4wKTtcbiAgdmFyIGxlZnRUYW4gPSBNYXRoLnRhbihmb3YubGVmdERlZ3JlZXMgKiBNYXRoLlBJIC8gMTgwLjApO1xuICB2YXIgcmlnaHRUYW4gPSBNYXRoLnRhbihmb3YucmlnaHREZWdyZWVzICogTWF0aC5QSSAvIDE4MC4wKTtcbiAgdmFyIHhTY2FsZSA9IDIuMCAvIChsZWZ0VGFuICsgcmlnaHRUYW4pO1xuICB2YXIgeVNjYWxlID0gMi4wIC8gKHVwVGFuICsgZG93blRhbik7XG4gIG91dFswXSA9IHhTY2FsZTtcbiAgb3V0WzFdID0gMC4wO1xuICBvdXRbMl0gPSAwLjA7XG4gIG91dFszXSA9IDAuMDtcbiAgb3V0WzRdID0gMC4wO1xuICBvdXRbNV0gPSB5U2NhbGU7XG4gIG91dFs2XSA9IDAuMDtcbiAgb3V0WzddID0gMC4wO1xuICBvdXRbOF0gPSAtKChsZWZ0VGFuIC0gcmlnaHRUYW4pICogeFNjYWxlICogMC41KTtcbiAgb3V0WzldID0gKHVwVGFuIC0gZG93blRhbikgKiB5U2NhbGUgKiAwLjU7XG4gIG91dFsxMF0gPSBmYXIgLyAobmVhciAtIGZhcik7XG4gIG91dFsxMV0gPSAtMS4wO1xuICBvdXRbMTJdID0gMC4wO1xuICBvdXRbMTNdID0gMC4wO1xuICBvdXRbMTRdID0gZmFyICogbmVhciAvIChuZWFyIC0gZmFyKTtcbiAgb3V0WzE1XSA9IDAuMDtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYSBvcnRob2dvbmFsIHByb2plY3Rpb24gbWF0cml4IHdpdGggdGhlIGdpdmVuIGJvdW5kc1xyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBsZWZ0IExlZnQgYm91bmQgb2YgdGhlIGZydXN0dW1cclxuICogQHBhcmFtIHtudW1iZXJ9IHJpZ2h0IFJpZ2h0IGJvdW5kIG9mIHRoZSBmcnVzdHVtXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBib3R0b20gQm90dG9tIGJvdW5kIG9mIHRoZSBmcnVzdHVtXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB0b3AgVG9wIGJvdW5kIG9mIHRoZSBmcnVzdHVtXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBuZWFyIE5lYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cclxuICogQHBhcmFtIHtudW1iZXJ9IGZhciBGYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG9ydGhvKG91dCwgbGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpIHtcbiAgdmFyIGxyID0gMSAvIChsZWZ0IC0gcmlnaHQpO1xuICB2YXIgYnQgPSAxIC8gKGJvdHRvbSAtIHRvcCk7XG4gIHZhciBuZiA9IDEgLyAobmVhciAtIGZhcik7XG4gIG91dFswXSA9IC0yICogbHI7XG4gIG91dFsxXSA9IDA7XG4gIG91dFsyXSA9IDA7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IDA7XG4gIG91dFs1XSA9IC0yICogYnQ7XG4gIG91dFs2XSA9IDA7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9IDA7XG4gIG91dFs5XSA9IDA7XG4gIG91dFsxMF0gPSAyICogbmY7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gKGxlZnQgKyByaWdodCkgKiBscjtcbiAgb3V0WzEzXSA9ICh0b3AgKyBib3R0b20pICogYnQ7XG4gIG91dFsxNF0gPSAoZmFyICsgbmVhcikgKiBuZjtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogR2VuZXJhdGVzIGEgbG9vay1hdCBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gZXllIHBvc2l0aW9uLCBmb2NhbCBwb2ludCwgYW5kIHVwIGF4aXMuXHJcbiAqIElmIHlvdSB3YW50IGEgbWF0cml4IHRoYXQgYWN0dWFsbHkgbWFrZXMgYW4gb2JqZWN0IGxvb2sgYXQgYW5vdGhlciBvYmplY3QsIHlvdSBzaG91bGQgdXNlIHRhcmdldFRvIGluc3RlYWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGV5ZSBQb3NpdGlvbiBvZiB0aGUgdmlld2VyXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBjZW50ZXIgUG9pbnQgdGhlIHZpZXdlciBpcyBsb29raW5nIGF0XHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSB1cCB2ZWMzIHBvaW50aW5nIHVwXHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBsb29rQXQob3V0LCBleWUsIGNlbnRlciwgdXApIHtcbiAgdmFyIHgwLCB4MSwgeDIsIHkwLCB5MSwgeTIsIHowLCB6MSwgejIsIGxlbjtcbiAgdmFyIGV5ZXggPSBleWVbMF07XG4gIHZhciBleWV5ID0gZXllWzFdO1xuICB2YXIgZXlleiA9IGV5ZVsyXTtcbiAgdmFyIHVweCA9IHVwWzBdO1xuICB2YXIgdXB5ID0gdXBbMV07XG4gIHZhciB1cHogPSB1cFsyXTtcbiAgdmFyIGNlbnRlcnggPSBjZW50ZXJbMF07XG4gIHZhciBjZW50ZXJ5ID0gY2VudGVyWzFdO1xuICB2YXIgY2VudGVyeiA9IGNlbnRlclsyXTtcblxuICBpZiAoTWF0aC5hYnMoZXlleCAtIGNlbnRlcngpIDwgZ2xNYXRyaXguRVBTSUxPTiAmJiBNYXRoLmFicyhleWV5IC0gY2VudGVyeSkgPCBnbE1hdHJpeC5FUFNJTE9OICYmIE1hdGguYWJzKGV5ZXogLSBjZW50ZXJ6KSA8IGdsTWF0cml4LkVQU0lMT04pIHtcbiAgICByZXR1cm4gaWRlbnRpdHkob3V0KTtcbiAgfVxuXG4gIHowID0gZXlleCAtIGNlbnRlcng7XG4gIHoxID0gZXlleSAtIGNlbnRlcnk7XG4gIHoyID0gZXlleiAtIGNlbnRlcno7XG4gIGxlbiA9IDEgLyBNYXRoLmh5cG90KHowLCB6MSwgejIpO1xuICB6MCAqPSBsZW47XG4gIHoxICo9IGxlbjtcbiAgejIgKj0gbGVuO1xuICB4MCA9IHVweSAqIHoyIC0gdXB6ICogejE7XG4gIHgxID0gdXB6ICogejAgLSB1cHggKiB6MjtcbiAgeDIgPSB1cHggKiB6MSAtIHVweSAqIHowO1xuICBsZW4gPSBNYXRoLmh5cG90KHgwLCB4MSwgeDIpO1xuXG4gIGlmICghbGVuKSB7XG4gICAgeDAgPSAwO1xuICAgIHgxID0gMDtcbiAgICB4MiA9IDA7XG4gIH0gZWxzZSB7XG4gICAgbGVuID0gMSAvIGxlbjtcbiAgICB4MCAqPSBsZW47XG4gICAgeDEgKj0gbGVuO1xuICAgIHgyICo9IGxlbjtcbiAgfVxuXG4gIHkwID0gejEgKiB4MiAtIHoyICogeDE7XG4gIHkxID0gejIgKiB4MCAtIHowICogeDI7XG4gIHkyID0gejAgKiB4MSAtIHoxICogeDA7XG4gIGxlbiA9IE1hdGguaHlwb3QoeTAsIHkxLCB5Mik7XG5cbiAgaWYgKCFsZW4pIHtcbiAgICB5MCA9IDA7XG4gICAgeTEgPSAwO1xuICAgIHkyID0gMDtcbiAgfSBlbHNlIHtcbiAgICBsZW4gPSAxIC8gbGVuO1xuICAgIHkwICo9IGxlbjtcbiAgICB5MSAqPSBsZW47XG4gICAgeTIgKj0gbGVuO1xuICB9XG5cbiAgb3V0WzBdID0geDA7XG4gIG91dFsxXSA9IHkwO1xuICBvdXRbMl0gPSB6MDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0geDE7XG4gIG91dFs1XSA9IHkxO1xuICBvdXRbNl0gPSB6MTtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0geDI7XG4gIG91dFs5XSA9IHkyO1xuICBvdXRbMTBdID0gejI7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gLSh4MCAqIGV5ZXggKyB4MSAqIGV5ZXkgKyB4MiAqIGV5ZXopO1xuICBvdXRbMTNdID0gLSh5MCAqIGV5ZXggKyB5MSAqIGV5ZXkgKyB5MiAqIGV5ZXopO1xuICBvdXRbMTRdID0gLSh6MCAqIGV5ZXggKyB6MSAqIGV5ZXkgKyB6MiAqIGV5ZXopO1xuICBvdXRbMTVdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYSBtYXRyaXggdGhhdCBtYWtlcyBzb21ldGhpbmcgbG9vayBhdCBzb21ldGhpbmcgZWxzZS5cclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gZXllIFBvc2l0aW9uIG9mIHRoZSB2aWV3ZXJcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGNlbnRlciBQb2ludCB0aGUgdmlld2VyIGlzIGxvb2tpbmcgYXRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHVwIHZlYzMgcG9pbnRpbmcgdXBcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHRhcmdldFRvKG91dCwgZXllLCB0YXJnZXQsIHVwKSB7XG4gIHZhciBleWV4ID0gZXllWzBdLFxuICAgICAgZXlleSA9IGV5ZVsxXSxcbiAgICAgIGV5ZXogPSBleWVbMl0sXG4gICAgICB1cHggPSB1cFswXSxcbiAgICAgIHVweSA9IHVwWzFdLFxuICAgICAgdXB6ID0gdXBbMl07XG4gIHZhciB6MCA9IGV5ZXggLSB0YXJnZXRbMF0sXG4gICAgICB6MSA9IGV5ZXkgLSB0YXJnZXRbMV0sXG4gICAgICB6MiA9IGV5ZXogLSB0YXJnZXRbMl07XG4gIHZhciBsZW4gPSB6MCAqIHowICsgejEgKiB6MSArIHoyICogejI7XG5cbiAgaWYgKGxlbiA+IDApIHtcbiAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gICAgejAgKj0gbGVuO1xuICAgIHoxICo9IGxlbjtcbiAgICB6MiAqPSBsZW47XG4gIH1cblxuICB2YXIgeDAgPSB1cHkgKiB6MiAtIHVweiAqIHoxLFxuICAgICAgeDEgPSB1cHogKiB6MCAtIHVweCAqIHoyLFxuICAgICAgeDIgPSB1cHggKiB6MSAtIHVweSAqIHowO1xuICBsZW4gPSB4MCAqIHgwICsgeDEgKiB4MSArIHgyICogeDI7XG5cbiAgaWYgKGxlbiA+IDApIHtcbiAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gICAgeDAgKj0gbGVuO1xuICAgIHgxICo9IGxlbjtcbiAgICB4MiAqPSBsZW47XG4gIH1cblxuICBvdXRbMF0gPSB4MDtcbiAgb3V0WzFdID0geDE7XG4gIG91dFsyXSA9IHgyO1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSB6MSAqIHgyIC0gejIgKiB4MTtcbiAgb3V0WzVdID0gejIgKiB4MCAtIHowICogeDI7XG4gIG91dFs2XSA9IHowICogeDEgLSB6MSAqIHgwO1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSB6MDtcbiAgb3V0WzldID0gejE7XG4gIG91dFsxMF0gPSB6MjtcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSBleWV4O1xuICBvdXRbMTNdID0gZXlleTtcbiAgb3V0WzE0XSA9IGV5ZXo7XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBtYXQ0XHJcbiAqXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIG1hdHJpeCB0byByZXByZXNlbnQgYXMgYSBzdHJpbmdcclxuICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBtYXRyaXhcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzdHIoYSkge1xuICByZXR1cm4gXCJtYXQ0KFwiICsgYVswXSArIFwiLCBcIiArIGFbMV0gKyBcIiwgXCIgKyBhWzJdICsgXCIsIFwiICsgYVszXSArIFwiLCBcIiArIGFbNF0gKyBcIiwgXCIgKyBhWzVdICsgXCIsIFwiICsgYVs2XSArIFwiLCBcIiArIGFbN10gKyBcIiwgXCIgKyBhWzhdICsgXCIsIFwiICsgYVs5XSArIFwiLCBcIiArIGFbMTBdICsgXCIsIFwiICsgYVsxMV0gKyBcIiwgXCIgKyBhWzEyXSArIFwiLCBcIiArIGFbMTNdICsgXCIsIFwiICsgYVsxNF0gKyBcIiwgXCIgKyBhWzE1XSArIFwiKVwiO1xufVxuLyoqXHJcbiAqIFJldHVybnMgRnJvYmVuaXVzIG5vcm0gb2YgYSBtYXQ0XHJcbiAqXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBtYXRyaXggdG8gY2FsY3VsYXRlIEZyb2Jlbml1cyBub3JtIG9mXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IEZyb2Jlbml1cyBub3JtXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvYihhKSB7XG4gIHJldHVybiBNYXRoLmh5cG90KGFbMF0sIGFbMV0sIGFbMl0sIGFbM10sIGFbNF0sIGFbNV0sIGFbNl0sIGFbN10sIGFbOF0sIGFbOV0sIGFbMTBdLCBhWzExXSwgYVsxMl0sIGFbMTNdLCBhWzE0XSwgYVsxNV0pO1xufVxuLyoqXHJcbiAqIEFkZHMgdHdvIG1hdDQnc1xyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSArIGJbMF07XG4gIG91dFsxXSA9IGFbMV0gKyBiWzFdO1xuICBvdXRbMl0gPSBhWzJdICsgYlsyXTtcbiAgb3V0WzNdID0gYVszXSArIGJbM107XG4gIG91dFs0XSA9IGFbNF0gKyBiWzRdO1xuICBvdXRbNV0gPSBhWzVdICsgYls1XTtcbiAgb3V0WzZdID0gYVs2XSArIGJbNl07XG4gIG91dFs3XSA9IGFbN10gKyBiWzddO1xuICBvdXRbOF0gPSBhWzhdICsgYls4XTtcbiAgb3V0WzldID0gYVs5XSArIGJbOV07XG4gIG91dFsxMF0gPSBhWzEwXSArIGJbMTBdO1xuICBvdXRbMTFdID0gYVsxMV0gKyBiWzExXTtcbiAgb3V0WzEyXSA9IGFbMTJdICsgYlsxMl07XG4gIG91dFsxM10gPSBhWzEzXSArIGJbMTNdO1xuICBvdXRbMTRdID0gYVsxNF0gKyBiWzE0XTtcbiAgb3V0WzE1XSA9IGFbMTVdICsgYlsxNV07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogU3VidHJhY3RzIG1hdHJpeCBiIGZyb20gbWF0cml4IGFcclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJ0cmFjdChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAtIGJbMF07XG4gIG91dFsxXSA9IGFbMV0gLSBiWzFdO1xuICBvdXRbMl0gPSBhWzJdIC0gYlsyXTtcbiAgb3V0WzNdID0gYVszXSAtIGJbM107XG4gIG91dFs0XSA9IGFbNF0gLSBiWzRdO1xuICBvdXRbNV0gPSBhWzVdIC0gYls1XTtcbiAgb3V0WzZdID0gYVs2XSAtIGJbNl07XG4gIG91dFs3XSA9IGFbN10gLSBiWzddO1xuICBvdXRbOF0gPSBhWzhdIC0gYls4XTtcbiAgb3V0WzldID0gYVs5XSAtIGJbOV07XG4gIG91dFsxMF0gPSBhWzEwXSAtIGJbMTBdO1xuICBvdXRbMTFdID0gYVsxMV0gLSBiWzExXTtcbiAgb3V0WzEyXSA9IGFbMTJdIC0gYlsxMl07XG4gIG91dFsxM10gPSBhWzEzXSAtIGJbMTNdO1xuICBvdXRbMTRdID0gYVsxNF0gLSBiWzE0XTtcbiAgb3V0WzE1XSA9IGFbMTVdIC0gYlsxNV07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogTXVsdGlwbHkgZWFjaCBlbGVtZW50IG9mIHRoZSBtYXRyaXggYnkgYSBzY2FsYXIuXHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBtYXRyaXggdG8gc2NhbGVcclxuICogQHBhcmFtIHtOdW1iZXJ9IGIgYW1vdW50IHRvIHNjYWxlIHRoZSBtYXRyaXgncyBlbGVtZW50cyBieVxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlwbHlTY2FsYXIob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gKiBiO1xuICBvdXRbMV0gPSBhWzFdICogYjtcbiAgb3V0WzJdID0gYVsyXSAqIGI7XG4gIG91dFszXSA9IGFbM10gKiBiO1xuICBvdXRbNF0gPSBhWzRdICogYjtcbiAgb3V0WzVdID0gYVs1XSAqIGI7XG4gIG91dFs2XSA9IGFbNl0gKiBiO1xuICBvdXRbN10gPSBhWzddICogYjtcbiAgb3V0WzhdID0gYVs4XSAqIGI7XG4gIG91dFs5XSA9IGFbOV0gKiBiO1xuICBvdXRbMTBdID0gYVsxMF0gKiBiO1xuICBvdXRbMTFdID0gYVsxMV0gKiBiO1xuICBvdXRbMTJdID0gYVsxMl0gKiBiO1xuICBvdXRbMTNdID0gYVsxM10gKiBiO1xuICBvdXRbMTRdID0gYVsxNF0gKiBiO1xuICBvdXRbMTVdID0gYVsxNV0gKiBiO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIEFkZHMgdHdvIG1hdDQncyBhZnRlciBtdWx0aXBseWluZyBlYWNoIGVsZW1lbnQgb2YgdGhlIHNlY29uZCBvcGVyYW5kIGJ5IGEgc2NhbGFyIHZhbHVlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxlIHRoZSBhbW91bnQgdG8gc2NhbGUgYidzIGVsZW1lbnRzIGJ5IGJlZm9yZSBhZGRpbmdcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG11bHRpcGx5U2NhbGFyQW5kQWRkKG91dCwgYSwgYiwgc2NhbGUpIHtcbiAgb3V0WzBdID0gYVswXSArIGJbMF0gKiBzY2FsZTtcbiAgb3V0WzFdID0gYVsxXSArIGJbMV0gKiBzY2FsZTtcbiAgb3V0WzJdID0gYVsyXSArIGJbMl0gKiBzY2FsZTtcbiAgb3V0WzNdID0gYVszXSArIGJbM10gKiBzY2FsZTtcbiAgb3V0WzRdID0gYVs0XSArIGJbNF0gKiBzY2FsZTtcbiAgb3V0WzVdID0gYVs1XSArIGJbNV0gKiBzY2FsZTtcbiAgb3V0WzZdID0gYVs2XSArIGJbNl0gKiBzY2FsZTtcbiAgb3V0WzddID0gYVs3XSArIGJbN10gKiBzY2FsZTtcbiAgb3V0WzhdID0gYVs4XSArIGJbOF0gKiBzY2FsZTtcbiAgb3V0WzldID0gYVs5XSArIGJbOV0gKiBzY2FsZTtcbiAgb3V0WzEwXSA9IGFbMTBdICsgYlsxMF0gKiBzY2FsZTtcbiAgb3V0WzExXSA9IGFbMTFdICsgYlsxMV0gKiBzY2FsZTtcbiAgb3V0WzEyXSA9IGFbMTJdICsgYlsxMl0gKiBzY2FsZTtcbiAgb3V0WzEzXSA9IGFbMTNdICsgYlsxM10gKiBzY2FsZTtcbiAgb3V0WzE0XSA9IGFbMTRdICsgYlsxNF0gKiBzY2FsZTtcbiAgb3V0WzE1XSA9IGFbMTVdICsgYlsxNV0gKiBzY2FsZTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBtYXRyaWNlcyBoYXZlIGV4YWN0bHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24gKHdoZW4gY29tcGFyZWQgd2l0aCA9PT0pXHJcbiAqXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIFRoZSBmaXJzdCBtYXRyaXguXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBiIFRoZSBzZWNvbmQgbWF0cml4LlxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWF0cmljZXMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZXhhY3RFcXVhbHMoYSwgYikge1xuICByZXR1cm4gYVswXSA9PT0gYlswXSAmJiBhWzFdID09PSBiWzFdICYmIGFbMl0gPT09IGJbMl0gJiYgYVszXSA9PT0gYlszXSAmJiBhWzRdID09PSBiWzRdICYmIGFbNV0gPT09IGJbNV0gJiYgYVs2XSA9PT0gYls2XSAmJiBhWzddID09PSBiWzddICYmIGFbOF0gPT09IGJbOF0gJiYgYVs5XSA9PT0gYls5XSAmJiBhWzEwXSA9PT0gYlsxMF0gJiYgYVsxMV0gPT09IGJbMTFdICYmIGFbMTJdID09PSBiWzEyXSAmJiBhWzEzXSA9PT0gYlsxM10gJiYgYVsxNF0gPT09IGJbMTRdICYmIGFbMTVdID09PSBiWzE1XTtcbn1cbi8qKlxyXG4gKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBtYXRyaWNlcyBoYXZlIGFwcHJveGltYXRlbHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24uXHJcbiAqXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIFRoZSBmaXJzdCBtYXRyaXguXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBiIFRoZSBzZWNvbmQgbWF0cml4LlxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWF0cmljZXMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxzKGEsIGIpIHtcbiAgdmFyIGEwID0gYVswXSxcbiAgICAgIGExID0gYVsxXSxcbiAgICAgIGEyID0gYVsyXSxcbiAgICAgIGEzID0gYVszXTtcbiAgdmFyIGE0ID0gYVs0XSxcbiAgICAgIGE1ID0gYVs1XSxcbiAgICAgIGE2ID0gYVs2XSxcbiAgICAgIGE3ID0gYVs3XTtcbiAgdmFyIGE4ID0gYVs4XSxcbiAgICAgIGE5ID0gYVs5XSxcbiAgICAgIGExMCA9IGFbMTBdLFxuICAgICAgYTExID0gYVsxMV07XG4gIHZhciBhMTIgPSBhWzEyXSxcbiAgICAgIGExMyA9IGFbMTNdLFxuICAgICAgYTE0ID0gYVsxNF0sXG4gICAgICBhMTUgPSBhWzE1XTtcbiAgdmFyIGIwID0gYlswXSxcbiAgICAgIGIxID0gYlsxXSxcbiAgICAgIGIyID0gYlsyXSxcbiAgICAgIGIzID0gYlszXTtcbiAgdmFyIGI0ID0gYls0XSxcbiAgICAgIGI1ID0gYls1XSxcbiAgICAgIGI2ID0gYls2XSxcbiAgICAgIGI3ID0gYls3XTtcbiAgdmFyIGI4ID0gYls4XSxcbiAgICAgIGI5ID0gYls5XSxcbiAgICAgIGIxMCA9IGJbMTBdLFxuICAgICAgYjExID0gYlsxMV07XG4gIHZhciBiMTIgPSBiWzEyXSxcbiAgICAgIGIxMyA9IGJbMTNdLFxuICAgICAgYjE0ID0gYlsxNF0sXG4gICAgICBiMTUgPSBiWzE1XTtcbiAgcmV0dXJuIE1hdGguYWJzKGEwIC0gYjApIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEwKSwgTWF0aC5hYnMoYjApKSAmJiBNYXRoLmFicyhhMSAtIGIxKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMSksIE1hdGguYWJzKGIxKSkgJiYgTWF0aC5hYnMoYTIgLSBiMikgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTIpLCBNYXRoLmFicyhiMikpICYmIE1hdGguYWJzKGEzIC0gYjMpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEzKSwgTWF0aC5hYnMoYjMpKSAmJiBNYXRoLmFicyhhNCAtIGI0KSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNCksIE1hdGguYWJzKGI0KSkgJiYgTWF0aC5hYnMoYTUgLSBiNSkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTUpLCBNYXRoLmFicyhiNSkpICYmIE1hdGguYWJzKGE2IC0gYjYpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE2KSwgTWF0aC5hYnMoYjYpKSAmJiBNYXRoLmFicyhhNyAtIGI3KSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNyksIE1hdGguYWJzKGI3KSkgJiYgTWF0aC5hYnMoYTggLSBiOCkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTgpLCBNYXRoLmFicyhiOCkpICYmIE1hdGguYWJzKGE5IC0gYjkpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE5KSwgTWF0aC5hYnMoYjkpKSAmJiBNYXRoLmFicyhhMTAgLSBiMTApIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExMCksIE1hdGguYWJzKGIxMCkpICYmIE1hdGguYWJzKGExMSAtIGIxMSkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTExKSwgTWF0aC5hYnMoYjExKSkgJiYgTWF0aC5hYnMoYTEyIC0gYjEyKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMTIpLCBNYXRoLmFicyhiMTIpKSAmJiBNYXRoLmFicyhhMTMgLSBiMTMpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExMyksIE1hdGguYWJzKGIxMykpICYmIE1hdGguYWJzKGExNCAtIGIxNCkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTE0KSwgTWF0aC5hYnMoYjE0KSkgJiYgTWF0aC5hYnMoYTE1IC0gYjE1KSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMTUpLCBNYXRoLmFicyhiMTUpKTtcbn1cbi8qKlxyXG4gKiBBbGlhcyBmb3Ige0BsaW5rIG1hdDQubXVsdGlwbHl9XHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cblxuZXhwb3J0IHZhciBtdWwgPSBtdWx0aXBseTtcbi8qKlxyXG4gKiBBbGlhcyBmb3Ige0BsaW5rIG1hdDQuc3VidHJhY3R9XHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cblxuZXhwb3J0IHZhciBzdWIgPSBzdWJ0cmFjdDsiLCJpbXBvcnQgKiBhcyBnbE1hdHJpeCBmcm9tIFwiLi9jb21tb24uanNcIjtcbi8qKlxyXG4gKiAyIERpbWVuc2lvbmFsIFZlY3RvclxyXG4gKiBAbW9kdWxlIHZlYzJcclxuICovXG5cbi8qKlxyXG4gKiBDcmVhdGVzIGEgbmV3LCBlbXB0eSB2ZWMyXHJcbiAqXHJcbiAqIEByZXR1cm5zIHt2ZWMyfSBhIG5ldyAyRCB2ZWN0b3JcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgyKTtcblxuICBpZiAoZ2xNYXRyaXguQVJSQVlfVFlQRSAhPSBGbG9hdDMyQXJyYXkpIHtcbiAgICBvdXRbMF0gPSAwO1xuICAgIG91dFsxXSA9IDA7XG4gIH1cblxuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcgdmVjMiBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIHZlY3RvclxyXG4gKlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB2ZWN0b3IgdG8gY2xvbmVcclxuICogQHJldHVybnMge3ZlYzJ9IGEgbmV3IDJEIHZlY3RvclxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lKGEpIHtcbiAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDIpO1xuICBvdXRbMF0gPSBhWzBdO1xuICBvdXRbMV0gPSBhWzFdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcgdmVjMiBpbml0aWFsaXplZCB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcclxuICogQHJldHVybnMge3ZlYzJ9IGEgbmV3IDJEIHZlY3RvclxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21WYWx1ZXMoeCwgeSkge1xuICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoMik7XG4gIG91dFswXSA9IHg7XG4gIG91dFsxXSA9IHk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIHZlYzIgdG8gYW5vdGhlclxyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgc291cmNlIHZlY3RvclxyXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY29weShvdXQsIGEpIHtcbiAgb3V0WzBdID0gYVswXTtcbiAgb3V0WzFdID0gYVsxXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMyIHRvIHRoZSBnaXZlbiB2YWx1ZXNcclxuICpcclxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcclxuICogQHJldHVybnMge3ZlYzJ9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNldChvdXQsIHgsIHkpIHtcbiAgb3V0WzBdID0geDtcbiAgb3V0WzFdID0geTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBBZGRzIHR3byB2ZWMyJ3NcclxuICpcclxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGQob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gKyBiWzBdO1xuICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBTdWJ0cmFjdHMgdmVjdG9yIGIgZnJvbSB2ZWN0b3IgYVxyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHJldHVybnMge3ZlYzJ9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHN1YnRyYWN0KG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdIC0gYlswXTtcbiAgb3V0WzFdID0gYVsxXSAtIGJbMV07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogTXVsdGlwbGllcyB0d28gdmVjMidzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlwbHkob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gKiBiWzBdO1xuICBvdXRbMV0gPSBhWzFdICogYlsxXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBEaXZpZGVzIHR3byB2ZWMyJ3NcclxuICpcclxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkaXZpZGUob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gLyBiWzBdO1xuICBvdXRbMV0gPSBhWzFdIC8gYlsxXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBNYXRoLmNlaWwgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMyXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHZlY3RvciB0byBjZWlsXHJcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjZWlsKG91dCwgYSkge1xuICBvdXRbMF0gPSBNYXRoLmNlaWwoYVswXSk7XG4gIG91dFsxXSA9IE1hdGguY2VpbChhWzFdKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBNYXRoLmZsb29yIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMlxyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB2ZWN0b3IgdG8gZmxvb3JcclxuICogQHJldHVybnMge3ZlYzJ9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZsb29yKG91dCwgYSkge1xuICBvdXRbMF0gPSBNYXRoLmZsb29yKGFbMF0pO1xuICBvdXRbMV0gPSBNYXRoLmZsb29yKGFbMV0pO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFJldHVybnMgdGhlIG1pbmltdW0gb2YgdHdvIHZlYzInc1xyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHJldHVybnMge3ZlYzJ9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG1pbihvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gTWF0aC5taW4oYVswXSwgYlswXSk7XG4gIG91dFsxXSA9IE1hdGgubWluKGFbMV0sIGJbMV0pO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFJldHVybnMgdGhlIG1heGltdW0gb2YgdHdvIHZlYzInc1xyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHJldHVybnMge3ZlYzJ9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG1heChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gTWF0aC5tYXgoYVswXSwgYlswXSk7XG4gIG91dFsxXSA9IE1hdGgubWF4KGFbMV0sIGJbMV0pO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIE1hdGgucm91bmQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMyXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHZlY3RvciB0byByb3VuZFxyXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcm91bmQob3V0LCBhKSB7XG4gIG91dFswXSA9IE1hdGgucm91bmQoYVswXSk7XG4gIG91dFsxXSA9IE1hdGgucm91bmQoYVsxXSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogU2NhbGVzIGEgdmVjMiBieSBhIHNjYWxhciBudW1iZXJcclxuICpcclxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIHZlY3RvciB0byBzY2FsZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIHZlY3RvciBieVxyXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc2NhbGUob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gKiBiO1xuICBvdXRbMV0gPSBhWzFdICogYjtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBBZGRzIHR3byB2ZWMyJ3MgYWZ0ZXIgc2NhbGluZyB0aGUgc2Vjb25kIG9wZXJhbmQgYnkgYSBzY2FsYXIgdmFsdWVcclxuICpcclxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsZSB0aGUgYW1vdW50IHRvIHNjYWxlIGIgYnkgYmVmb3JlIGFkZGluZ1xyXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc2NhbGVBbmRBZGQob3V0LCBhLCBiLCBzY2FsZSkge1xuICBvdXRbMF0gPSBhWzBdICsgYlswXSAqIHNjYWxlO1xuICBvdXRbMV0gPSBhWzFdICsgYlsxXSAqIHNjYWxlO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWMyJ3NcclxuICpcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3RhbmNlKGEsIGIpIHtcbiAgdmFyIHggPSBiWzBdIC0gYVswXSxcbiAgICAgIHkgPSBiWzFdIC0gYVsxXTtcbiAgcmV0dXJuIE1hdGguaHlwb3QoeCwgeSk7XG59XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjMidzXHJcbiAqXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNxdWFyZWREaXN0YW5jZShhLCBiKSB7XG4gIHZhciB4ID0gYlswXSAtIGFbMF0sXG4gICAgICB5ID0gYlsxXSAtIGFbMV07XG4gIHJldHVybiB4ICogeCArIHkgKiB5O1xufVxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGxlbmd0aCBvZiBhIHZlYzJcclxuICpcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBsZW5ndGggb2ZcclxuICogQHJldHVybnMge051bWJlcn0gbGVuZ3RoIG9mIGFcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBsZW5ndGgoYSkge1xuICB2YXIgeCA9IGFbMF0sXG4gICAgICB5ID0gYVsxXTtcbiAgcmV0dXJuIE1hdGguaHlwb3QoeCwgeSk7XG59XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgYSB2ZWMyXHJcbiAqXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHZlY3RvciB0byBjYWxjdWxhdGUgc3F1YXJlZCBsZW5ndGggb2ZcclxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBsZW5ndGggb2YgYVxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNxdWFyZWRMZW5ndGgoYSkge1xuICB2YXIgeCA9IGFbMF0sXG4gICAgICB5ID0gYVsxXTtcbiAgcmV0dXJuIHggKiB4ICsgeSAqIHk7XG59XG4vKipcclxuICogTmVnYXRlcyB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzJcclxuICpcclxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdmVjdG9yIHRvIG5lZ2F0ZVxyXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbmVnYXRlKG91dCwgYSkge1xuICBvdXRbMF0gPSAtYVswXTtcbiAgb3V0WzFdID0gLWFbMV07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogUmV0dXJucyB0aGUgaW52ZXJzZSBvZiB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzJcclxuICpcclxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdmVjdG9yIHRvIGludmVydFxyXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJzZShvdXQsIGEpIHtcbiAgb3V0WzBdID0gMS4wIC8gYVswXTtcbiAgb3V0WzFdID0gMS4wIC8gYVsxXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBOb3JtYWxpemUgYSB2ZWMyXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHZlY3RvciB0byBub3JtYWxpemVcclxuICogQHJldHVybnMge3ZlYzJ9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZShvdXQsIGEpIHtcbiAgdmFyIHggPSBhWzBdLFxuICAgICAgeSA9IGFbMV07XG4gIHZhciBsZW4gPSB4ICogeCArIHkgKiB5O1xuXG4gIGlmIChsZW4gPiAwKSB7XG4gICAgLy9UT0RPOiBldmFsdWF0ZSB1c2Ugb2YgZ2xtX2ludnNxcnQgaGVyZT9cbiAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gIH1cblxuICBvdXRbMF0gPSBhWzBdICogbGVuO1xuICBvdXRbMV0gPSBhWzFdICogbGVuO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byB2ZWMyJ3NcclxuICpcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRvdCBwcm9kdWN0IG9mIGEgYW5kIGJcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkb3QoYSwgYikge1xuICByZXR1cm4gYVswXSAqIGJbMF0gKyBhWzFdICogYlsxXTtcbn1cbi8qKlxyXG4gKiBDb21wdXRlcyB0aGUgY3Jvc3MgcHJvZHVjdCBvZiB0d28gdmVjMidzXHJcbiAqIE5vdGUgdGhhdCB0aGUgY3Jvc3MgcHJvZHVjdCBtdXN0IGJ5IGRlZmluaXRpb24gcHJvZHVjZSBhIDNEIHZlY3RvclxyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHJldHVybnMge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNyb3NzKG91dCwgYSwgYikge1xuICB2YXIgeiA9IGFbMF0gKiBiWzFdIC0gYVsxXSAqIGJbMF07XG4gIG91dFswXSA9IG91dFsxXSA9IDA7XG4gIG91dFsyXSA9IHo7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogUGVyZm9ybXMgYSBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHR3byB2ZWMyJ3NcclxuICpcclxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50LCBpbiB0aGUgcmFuZ2UgWzAtMV0sIGJldHdlZW4gdGhlIHR3byBpbnB1dHNcclxuICogQHJldHVybnMge3ZlYzJ9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGxlcnAob3V0LCBhLCBiLCB0KSB7XG4gIHZhciBheCA9IGFbMF0sXG4gICAgICBheSA9IGFbMV07XG4gIG91dFswXSA9IGF4ICsgdCAqIChiWzBdIC0gYXgpO1xuICBvdXRbMV0gPSBheSArIHQgKiAoYlsxXSAtIGF5KTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYSByYW5kb20gdmVjdG9yIHdpdGggdGhlIGdpdmVuIHNjYWxlXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbc2NhbGVdIExlbmd0aCBvZiB0aGUgcmVzdWx0aW5nIHZlY3Rvci4gSWYgb21taXR0ZWQsIGEgdW5pdCB2ZWN0b3Igd2lsbCBiZSByZXR1cm5lZFxyXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tKG91dCwgc2NhbGUpIHtcbiAgc2NhbGUgPSBzY2FsZSB8fCAxLjA7XG4gIHZhciByID0gZ2xNYXRyaXguUkFORE9NKCkgKiAyLjAgKiBNYXRoLlBJO1xuICBvdXRbMF0gPSBNYXRoLmNvcyhyKSAqIHNjYWxlO1xuICBvdXRbMV0gPSBNYXRoLnNpbihyKSAqIHNjYWxlO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzIgd2l0aCBhIG1hdDJcclxuICpcclxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cclxuICogQHBhcmFtIHtSZWFkb25seU1hdDJ9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXHJcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1NYXQyKG91dCwgYSwgbSkge1xuICB2YXIgeCA9IGFbMF0sXG4gICAgICB5ID0gYVsxXTtcbiAgb3V0WzBdID0gbVswXSAqIHggKyBtWzJdICogeTtcbiAgb3V0WzFdID0gbVsxXSAqIHggKyBtWzNdICogeTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMyIHdpdGggYSBtYXQyZFxyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0MmR9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXHJcbiAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1NYXQyZChvdXQsIGEsIG0pIHtcbiAgdmFyIHggPSBhWzBdLFxuICAgICAgeSA9IGFbMV07XG4gIG91dFswXSA9IG1bMF0gKiB4ICsgbVsyXSAqIHkgKyBtWzRdO1xuICBvdXRbMV0gPSBtWzFdICogeCArIG1bM10gKiB5ICsgbVs1XTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMyIHdpdGggYSBtYXQzXHJcbiAqIDNyZCB2ZWN0b3IgY29tcG9uZW50IGlzIGltcGxpY2l0bHkgJzEnXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxyXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtTWF0MyhvdXQsIGEsIG0pIHtcbiAgdmFyIHggPSBhWzBdLFxuICAgICAgeSA9IGFbMV07XG4gIG91dFswXSA9IG1bMF0gKiB4ICsgbVszXSAqIHkgKyBtWzZdO1xuICBvdXRbMV0gPSBtWzFdICogeCArIG1bNF0gKiB5ICsgbVs3XTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMyIHdpdGggYSBtYXQ0XHJcbiAqIDNyZCB2ZWN0b3IgY29tcG9uZW50IGlzIGltcGxpY2l0bHkgJzAnXHJcbiAqIDR0aCB2ZWN0b3IgY29tcG9uZW50IGlzIGltcGxpY2l0bHkgJzEnXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxyXG4gKiBAcmV0dXJucyB7dmVjMn0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtTWF0NChvdXQsIGEsIG0pIHtcbiAgdmFyIHggPSBhWzBdO1xuICB2YXIgeSA9IGFbMV07XG4gIG91dFswXSA9IG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzEyXTtcbiAgb3V0WzFdID0gbVsxXSAqIHggKyBtWzVdICogeSArIG1bMTNdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFJvdGF0ZSBhIDJEIHZlY3RvclxyXG4gKiBAcGFyYW0ge3ZlYzJ9IG91dCBUaGUgcmVjZWl2aW5nIHZlYzJcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgVGhlIHZlYzIgcG9pbnQgdG8gcm90YXRlXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIFRoZSBvcmlnaW4gb2YgdGhlIHJvdGF0aW9uXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgVGhlIGFuZ2xlIG9mIHJvdGF0aW9uIGluIHJhZGlhbnNcclxuICogQHJldHVybnMge3ZlYzJ9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZShvdXQsIGEsIGIsIHJhZCkge1xuICAvL1RyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXG4gIHZhciBwMCA9IGFbMF0gLSBiWzBdLFxuICAgICAgcDEgPSBhWzFdIC0gYlsxXSxcbiAgICAgIHNpbkMgPSBNYXRoLnNpbihyYWQpLFxuICAgICAgY29zQyA9IE1hdGguY29zKHJhZCk7IC8vcGVyZm9ybSByb3RhdGlvbiBhbmQgdHJhbnNsYXRlIHRvIGNvcnJlY3QgcG9zaXRpb25cblxuICBvdXRbMF0gPSBwMCAqIGNvc0MgLSBwMSAqIHNpbkMgKyBiWzBdO1xuICBvdXRbMV0gPSBwMCAqIHNpbkMgKyBwMSAqIGNvc0MgKyBiWzFdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIEdldCB0aGUgYW5nbGUgYmV0d2VlbiB0d28gMkQgdmVjdG9yc1xyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSBUaGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiBUaGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHJldHVybnMge051bWJlcn0gVGhlIGFuZ2xlIGluIHJhZGlhbnNcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBhbmdsZShhLCBiKSB7XG4gIHZhciB4MSA9IGFbMF0sXG4gICAgICB5MSA9IGFbMV0sXG4gICAgICB4MiA9IGJbMF0sXG4gICAgICB5MiA9IGJbMV0sXG4gICAgICAvLyBtYWcgaXMgdGhlIHByb2R1Y3Qgb2YgdGhlIG1hZ25pdHVkZXMgb2YgYSBhbmQgYlxuICBtYWcgPSBNYXRoLnNxcnQoeDEgKiB4MSArIHkxICogeTEpICogTWF0aC5zcXJ0KHgyICogeDIgKyB5MiAqIHkyKSxcbiAgICAgIC8vIG1hZyAmJi4uIHNob3J0IGNpcmN1aXRzIGlmIG1hZyA9PSAwXG4gIGNvc2luZSA9IG1hZyAmJiAoeDEgKiB4MiArIHkxICogeTIpIC8gbWFnOyAvLyBNYXRoLm1pbihNYXRoLm1heChjb3NpbmUsIC0xKSwgMSkgY2xhbXBzIHRoZSBjb3NpbmUgYmV0d2VlbiAtMSBhbmQgMVxuXG4gIHJldHVybiBNYXRoLmFjb3MoTWF0aC5taW4oTWF0aC5tYXgoY29zaW5lLCAtMSksIDEpKTtcbn1cbi8qKlxyXG4gKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMyIHRvIHplcm9cclxuICpcclxuICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHJldHVybnMge3ZlYzJ9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHplcm8ob3V0KSB7XG4gIG91dFswXSA9IDAuMDtcbiAgb3V0WzFdID0gMC4wO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSB2ZWN0b3JcclxuICpcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdmVjdG9yIHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cihhKSB7XG4gIHJldHVybiBcInZlYzIoXCIgKyBhWzBdICsgXCIsIFwiICsgYVsxXSArIFwiKVwiO1xufVxuLyoqXHJcbiAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHZlY3RvcnMgZXhhY3RseSBoYXZlIHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uICh3aGVuIGNvbXBhcmVkIHdpdGggPT09KVxyXG4gKlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSBUaGUgZmlyc3QgdmVjdG9yLlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiBUaGUgc2Vjb25kIHZlY3Rvci5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZXhhY3RFcXVhbHMoYSwgYikge1xuICByZXR1cm4gYVswXSA9PT0gYlswXSAmJiBhWzFdID09PSBiWzFdO1xufVxuLyoqXHJcbiAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHZlY3RvcnMgaGF2ZSBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSBUaGUgZmlyc3QgdmVjdG9yLlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiBUaGUgc2Vjb25kIHZlY3Rvci5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxzKGEsIGIpIHtcbiAgdmFyIGEwID0gYVswXSxcbiAgICAgIGExID0gYVsxXTtcbiAgdmFyIGIwID0gYlswXSxcbiAgICAgIGIxID0gYlsxXTtcbiAgcmV0dXJuIE1hdGguYWJzKGEwIC0gYjApIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEwKSwgTWF0aC5hYnMoYjApKSAmJiBNYXRoLmFicyhhMSAtIGIxKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMSksIE1hdGguYWJzKGIxKSk7XG59XG4vKipcclxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLmxlbmd0aH1cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xuXG5leHBvcnQgdmFyIGxlbiA9IGxlbmd0aDtcbi8qKlxyXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzIuc3VidHJhY3R9XHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cblxuZXhwb3J0IHZhciBzdWIgPSBzdWJ0cmFjdDtcbi8qKlxyXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzIubXVsdGlwbHl9XHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cblxuZXhwb3J0IHZhciBtdWwgPSBtdWx0aXBseTtcbi8qKlxyXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzIuZGl2aWRlfVxyXG4gKiBAZnVuY3Rpb25cclxuICovXG5cbmV4cG9ydCB2YXIgZGl2ID0gZGl2aWRlO1xuLyoqXHJcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5kaXN0YW5jZX1cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xuXG5leHBvcnQgdmFyIGRpc3QgPSBkaXN0YW5jZTtcbi8qKlxyXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzIuc3F1YXJlZERpc3RhbmNlfVxyXG4gKiBAZnVuY3Rpb25cclxuICovXG5cbmV4cG9ydCB2YXIgc3FyRGlzdCA9IHNxdWFyZWREaXN0YW5jZTtcbi8qKlxyXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzIuc3F1YXJlZExlbmd0aH1cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xuXG5leHBvcnQgdmFyIHNxckxlbiA9IHNxdWFyZWRMZW5ndGg7XG4vKipcclxuICogUGVyZm9ybSBzb21lIG9wZXJhdGlvbiBvdmVyIGFuIGFycmF5IG9mIHZlYzJzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhIHRoZSBhcnJheSBvZiB2ZWN0b3JzIHRvIGl0ZXJhdGUgb3ZlclxyXG4gKiBAcGFyYW0ge051bWJlcn0gc3RyaWRlIE51bWJlciBvZiBlbGVtZW50cyBiZXR3ZWVuIHRoZSBzdGFydCBvZiBlYWNoIHZlYzIuIElmIDAgYXNzdW1lcyB0aWdodGx5IHBhY2tlZFxyXG4gKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0IE51bWJlciBvZiBlbGVtZW50cyB0byBza2lwIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGFycmF5XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudCBOdW1iZXIgb2YgdmVjMnMgdG8gaXRlcmF0ZSBvdmVyLiBJZiAwIGl0ZXJhdGVzIG92ZXIgZW50aXJlIGFycmF5XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggdmVjdG9yIGluIHRoZSBhcnJheVxyXG4gKiBAcGFyYW0ge09iamVjdH0gW2FyZ10gYWRkaXRpb25hbCBhcmd1bWVudCB0byBwYXNzIHRvIGZuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gYVxyXG4gKiBAZnVuY3Rpb25cclxuICovXG5cbmV4cG9ydCB2YXIgZm9yRWFjaCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHZlYyA9IGNyZWF0ZSgpO1xuICByZXR1cm4gZnVuY3Rpb24gKGEsIHN0cmlkZSwgb2Zmc2V0LCBjb3VudCwgZm4sIGFyZykge1xuICAgIHZhciBpLCBsO1xuXG4gICAgaWYgKCFzdHJpZGUpIHtcbiAgICAgIHN0cmlkZSA9IDI7XG4gICAgfVxuXG4gICAgaWYgKCFvZmZzZXQpIHtcbiAgICAgIG9mZnNldCA9IDA7XG4gICAgfVxuXG4gICAgaWYgKGNvdW50KSB7XG4gICAgICBsID0gTWF0aC5taW4oY291bnQgKiBzdHJpZGUgKyBvZmZzZXQsIGEubGVuZ3RoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbCA9IGEubGVuZ3RoO1xuICAgIH1cblxuICAgIGZvciAoaSA9IG9mZnNldDsgaSA8IGw7IGkgKz0gc3RyaWRlKSB7XG4gICAgICB2ZWNbMF0gPSBhW2ldO1xuICAgICAgdmVjWzFdID0gYVtpICsgMV07XG4gICAgICBmbih2ZWMsIHZlYywgYXJnKTtcbiAgICAgIGFbaV0gPSB2ZWNbMF07XG4gICAgICBhW2kgKyAxXSA9IHZlY1sxXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYTtcbiAgfTtcbn0oKTsiLCJpbXBvcnQgKiBhcyBnbE1hdHJpeCBmcm9tIFwiLi9jb21tb24uanNcIjtcbi8qKlxyXG4gKiAzIERpbWVuc2lvbmFsIFZlY3RvclxyXG4gKiBAbW9kdWxlIHZlYzNcclxuICovXG5cbi8qKlxyXG4gKiBDcmVhdGVzIGEgbmV3LCBlbXB0eSB2ZWMzXHJcbiAqXHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBhIG5ldyAzRCB2ZWN0b3JcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgzKTtcblxuICBpZiAoZ2xNYXRyaXguQVJSQVlfVFlQRSAhPSBGbG9hdDMyQXJyYXkpIHtcbiAgICBvdXRbMF0gPSAwO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQ3JlYXRlcyBhIG5ldyB2ZWMzIGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgdmVjdG9yXHJcbiAqXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHZlY3RvciB0byBjbG9uZVxyXG4gKiBAcmV0dXJucyB7dmVjM30gYSBuZXcgM0QgdmVjdG9yXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY2xvbmUoYSkge1xuICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoMyk7XG4gIG91dFswXSA9IGFbMF07XG4gIG91dFsxXSA9IGFbMV07XG4gIG91dFsyXSA9IGFbMl07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIGEgdmVjM1xyXG4gKlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIGxlbmd0aCBvZlxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBsZW5ndGggb2YgYVxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGxlbmd0aChhKSB7XG4gIHZhciB4ID0gYVswXTtcbiAgdmFyIHkgPSBhWzFdO1xuICB2YXIgeiA9IGFbMl07XG4gIHJldHVybiBNYXRoLmh5cG90KHgsIHksIHopO1xufVxuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcgdmVjMyBpbml0aWFsaXplZCB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcclxuICogQHJldHVybnMge3ZlYzN9IGEgbmV3IDNEIHZlY3RvclxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21WYWx1ZXMoeCwgeSwgeikge1xuICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoMyk7XG4gIG91dFswXSA9IHg7XG4gIG91dFsxXSA9IHk7XG4gIG91dFsyXSA9IHo7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIHZlYzMgdG8gYW5vdGhlclxyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgc291cmNlIHZlY3RvclxyXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY29weShvdXQsIGEpIHtcbiAgb3V0WzBdID0gYVswXTtcbiAgb3V0WzFdID0gYVsxXTtcbiAgb3V0WzJdID0gYVsyXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMzIHRvIHRoZSBnaXZlbiB2YWx1ZXNcclxuICpcclxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcclxuICogQHJldHVybnMge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNldChvdXQsIHgsIHksIHopIHtcbiAgb3V0WzBdID0geDtcbiAgb3V0WzFdID0geTtcbiAgb3V0WzJdID0gejtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBBZGRzIHR3byB2ZWMzJ3NcclxuICpcclxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGQob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gKyBiWzBdO1xuICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgb3V0WzJdID0gYVsyXSArIGJbMl07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogU3VidHJhY3RzIHZlY3RvciBiIGZyb20gdmVjdG9yIGFcclxuICpcclxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJ0cmFjdChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAtIGJbMF07XG4gIG91dFsxXSA9IGFbMV0gLSBiWzFdO1xuICBvdXRbMl0gPSBhWzJdIC0gYlsyXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBNdWx0aXBsaWVzIHR3byB2ZWMzJ3NcclxuICpcclxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aXBseShvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAqIGJbMF07XG4gIG91dFsxXSA9IGFbMV0gKiBiWzFdO1xuICBvdXRbMl0gPSBhWzJdICogYlsyXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBEaXZpZGVzIHR3byB2ZWMzJ3NcclxuICpcclxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkaXZpZGUob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gLyBiWzBdO1xuICBvdXRbMV0gPSBhWzFdIC8gYlsxXTtcbiAgb3V0WzJdID0gYVsyXSAvIGJbMl07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogTWF0aC5jZWlsIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjM1xyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gY2VpbFxyXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY2VpbChvdXQsIGEpIHtcbiAgb3V0WzBdID0gTWF0aC5jZWlsKGFbMF0pO1xuICBvdXRbMV0gPSBNYXRoLmNlaWwoYVsxXSk7XG4gIG91dFsyXSA9IE1hdGguY2VpbChhWzJdKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBNYXRoLmZsb29yIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjM1xyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gZmxvb3JcclxuICogQHJldHVybnMge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZsb29yKG91dCwgYSkge1xuICBvdXRbMF0gPSBNYXRoLmZsb29yKGFbMF0pO1xuICBvdXRbMV0gPSBNYXRoLmZsb29yKGFbMV0pO1xuICBvdXRbMl0gPSBNYXRoLmZsb29yKGFbMl0pO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFJldHVybnMgdGhlIG1pbmltdW0gb2YgdHdvIHZlYzMnc1xyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHJldHVybnMge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG1pbihvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gTWF0aC5taW4oYVswXSwgYlswXSk7XG4gIG91dFsxXSA9IE1hdGgubWluKGFbMV0sIGJbMV0pO1xuICBvdXRbMl0gPSBNYXRoLm1pbihhWzJdLCBiWzJdKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBtYXhpbXVtIG9mIHR3byB2ZWMzJ3NcclxuICpcclxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBtYXgob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IE1hdGgubWF4KGFbMF0sIGJbMF0pO1xuICBvdXRbMV0gPSBNYXRoLm1heChhWzFdLCBiWzFdKTtcbiAgb3V0WzJdID0gTWF0aC5tYXgoYVsyXSwgYlsyXSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogTWF0aC5yb3VuZCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzNcclxuICpcclxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdmVjdG9yIHRvIHJvdW5kXHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByb3VuZChvdXQsIGEpIHtcbiAgb3V0WzBdID0gTWF0aC5yb3VuZChhWzBdKTtcbiAgb3V0WzFdID0gTWF0aC5yb3VuZChhWzFdKTtcbiAgb3V0WzJdID0gTWF0aC5yb3VuZChhWzJdKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBTY2FsZXMgYSB2ZWMzIGJ5IGEgc2NhbGFyIG51bWJlclxyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgdmVjdG9yIHRvIHNjYWxlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgdmVjdG9yIGJ5XHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzY2FsZShvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAqIGI7XG4gIG91dFsxXSA9IGFbMV0gKiBiO1xuICBvdXRbMl0gPSBhWzJdICogYjtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBBZGRzIHR3byB2ZWMzJ3MgYWZ0ZXIgc2NhbGluZyB0aGUgc2Vjb25kIG9wZXJhbmQgYnkgYSBzY2FsYXIgdmFsdWVcclxuICpcclxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsZSB0aGUgYW1vdW50IHRvIHNjYWxlIGIgYnkgYmVmb3JlIGFkZGluZ1xyXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc2NhbGVBbmRBZGQob3V0LCBhLCBiLCBzY2FsZSkge1xuICBvdXRbMF0gPSBhWzBdICsgYlswXSAqIHNjYWxlO1xuICBvdXRbMV0gPSBhWzFdICsgYlsxXSAqIHNjYWxlO1xuICBvdXRbMl0gPSBhWzJdICsgYlsyXSAqIHNjYWxlO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWMzJ3NcclxuICpcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3RhbmNlKGEsIGIpIHtcbiAgdmFyIHggPSBiWzBdIC0gYVswXTtcbiAgdmFyIHkgPSBiWzFdIC0gYVsxXTtcbiAgdmFyIHogPSBiWzJdIC0gYVsyXTtcbiAgcmV0dXJuIE1hdGguaHlwb3QoeCwgeSwgeik7XG59XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjMydzXHJcbiAqXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNxdWFyZWREaXN0YW5jZShhLCBiKSB7XG4gIHZhciB4ID0gYlswXSAtIGFbMF07XG4gIHZhciB5ID0gYlsxXSAtIGFbMV07XG4gIHZhciB6ID0gYlsyXSAtIGFbMl07XG4gIHJldHVybiB4ICogeCArIHkgKiB5ICsgeiAqIHo7XG59XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgYSB2ZWMzXHJcbiAqXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHZlY3RvciB0byBjYWxjdWxhdGUgc3F1YXJlZCBsZW5ndGggb2ZcclxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBsZW5ndGggb2YgYVxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNxdWFyZWRMZW5ndGgoYSkge1xuICB2YXIgeCA9IGFbMF07XG4gIHZhciB5ID0gYVsxXTtcbiAgdmFyIHogPSBhWzJdO1xuICByZXR1cm4geCAqIHggKyB5ICogeSArIHogKiB6O1xufVxuLyoqXHJcbiAqIE5lZ2F0ZXMgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHZlY3RvciB0byBuZWdhdGVcclxuICogQHJldHVybnMge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG5lZ2F0ZShvdXQsIGEpIHtcbiAgb3V0WzBdID0gLWFbMF07XG4gIG91dFsxXSA9IC1hWzFdO1xuICBvdXRbMl0gPSAtYVsyXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBpbnZlcnNlIG9mIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjM1xyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gaW52ZXJ0XHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnNlKG91dCwgYSkge1xuICBvdXRbMF0gPSAxLjAgLyBhWzBdO1xuICBvdXRbMV0gPSAxLjAgLyBhWzFdO1xuICBvdXRbMl0gPSAxLjAgLyBhWzJdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIE5vcm1hbGl6ZSBhIHZlYzNcclxuICpcclxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdmVjdG9yIHRvIG5vcm1hbGl6ZVxyXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplKG91dCwgYSkge1xuICB2YXIgeCA9IGFbMF07XG4gIHZhciB5ID0gYVsxXTtcbiAgdmFyIHogPSBhWzJdO1xuICB2YXIgbGVuID0geCAqIHggKyB5ICogeSArIHogKiB6O1xuXG4gIGlmIChsZW4gPiAwKSB7XG4gICAgLy9UT0RPOiBldmFsdWF0ZSB1c2Ugb2YgZ2xtX2ludnNxcnQgaGVyZT9cbiAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gIH1cblxuICBvdXRbMF0gPSBhWzBdICogbGVuO1xuICBvdXRbMV0gPSBhWzFdICogbGVuO1xuICBvdXRbMl0gPSBhWzJdICogbGVuO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byB2ZWMzJ3NcclxuICpcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRvdCBwcm9kdWN0IG9mIGEgYW5kIGJcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkb3QoYSwgYikge1xuICByZXR1cm4gYVswXSAqIGJbMF0gKyBhWzFdICogYlsxXSArIGFbMl0gKiBiWzJdO1xufVxuLyoqXHJcbiAqIENvbXB1dGVzIHRoZSBjcm9zcyBwcm9kdWN0IG9mIHR3byB2ZWMzJ3NcclxuICpcclxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjcm9zcyhvdXQsIGEsIGIpIHtcbiAgdmFyIGF4ID0gYVswXSxcbiAgICAgIGF5ID0gYVsxXSxcbiAgICAgIGF6ID0gYVsyXTtcbiAgdmFyIGJ4ID0gYlswXSxcbiAgICAgIGJ5ID0gYlsxXSxcbiAgICAgIGJ6ID0gYlsyXTtcbiAgb3V0WzBdID0gYXkgKiBieiAtIGF6ICogYnk7XG4gIG91dFsxXSA9IGF6ICogYnggLSBheCAqIGJ6O1xuICBvdXRbMl0gPSBheCAqIGJ5IC0gYXkgKiBieDtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBQZXJmb3JtcyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHZlYzMnc1xyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQsIGluIHRoZSByYW5nZSBbMC0xXSwgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xyXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbGVycChvdXQsIGEsIGIsIHQpIHtcbiAgdmFyIGF4ID0gYVswXTtcbiAgdmFyIGF5ID0gYVsxXTtcbiAgdmFyIGF6ID0gYVsyXTtcbiAgb3V0WzBdID0gYXggKyB0ICogKGJbMF0gLSBheCk7XG4gIG91dFsxXSA9IGF5ICsgdCAqIChiWzFdIC0gYXkpO1xuICBvdXRbMl0gPSBheiArIHQgKiAoYlsyXSAtIGF6KTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBQZXJmb3JtcyBhIGhlcm1pdGUgaW50ZXJwb2xhdGlvbiB3aXRoIHR3byBjb250cm9sIHBvaW50c1xyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGMgdGhlIHRoaXJkIG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGQgdGhlIGZvdXJ0aCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50LCBpbiB0aGUgcmFuZ2UgWzAtMV0sIGJldHdlZW4gdGhlIHR3byBpbnB1dHNcclxuICogQHJldHVybnMge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGhlcm1pdGUob3V0LCBhLCBiLCBjLCBkLCB0KSB7XG4gIHZhciBmYWN0b3JUaW1lczIgPSB0ICogdDtcbiAgdmFyIGZhY3RvcjEgPSBmYWN0b3JUaW1lczIgKiAoMiAqIHQgLSAzKSArIDE7XG4gIHZhciBmYWN0b3IyID0gZmFjdG9yVGltZXMyICogKHQgLSAyKSArIHQ7XG4gIHZhciBmYWN0b3IzID0gZmFjdG9yVGltZXMyICogKHQgLSAxKTtcbiAgdmFyIGZhY3RvcjQgPSBmYWN0b3JUaW1lczIgKiAoMyAtIDIgKiB0KTtcbiAgb3V0WzBdID0gYVswXSAqIGZhY3RvcjEgKyBiWzBdICogZmFjdG9yMiArIGNbMF0gKiBmYWN0b3IzICsgZFswXSAqIGZhY3RvcjQ7XG4gIG91dFsxXSA9IGFbMV0gKiBmYWN0b3IxICsgYlsxXSAqIGZhY3RvcjIgKyBjWzFdICogZmFjdG9yMyArIGRbMV0gKiBmYWN0b3I0O1xuICBvdXRbMl0gPSBhWzJdICogZmFjdG9yMSArIGJbMl0gKiBmYWN0b3IyICsgY1syXSAqIGZhY3RvcjMgKyBkWzJdICogZmFjdG9yNDtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBQZXJmb3JtcyBhIGJlemllciBpbnRlcnBvbGF0aW9uIHdpdGggdHdvIGNvbnRyb2wgcG9pbnRzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYyB0aGUgdGhpcmQgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gZCB0aGUgZm91cnRoIG9wZXJhbmRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQsIGluIHRoZSByYW5nZSBbMC0xXSwgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xyXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gYmV6aWVyKG91dCwgYSwgYiwgYywgZCwgdCkge1xuICB2YXIgaW52ZXJzZUZhY3RvciA9IDEgLSB0O1xuICB2YXIgaW52ZXJzZUZhY3RvclRpbWVzVHdvID0gaW52ZXJzZUZhY3RvciAqIGludmVyc2VGYWN0b3I7XG4gIHZhciBmYWN0b3JUaW1lczIgPSB0ICogdDtcbiAgdmFyIGZhY3RvcjEgPSBpbnZlcnNlRmFjdG9yVGltZXNUd28gKiBpbnZlcnNlRmFjdG9yO1xuICB2YXIgZmFjdG9yMiA9IDMgKiB0ICogaW52ZXJzZUZhY3RvclRpbWVzVHdvO1xuICB2YXIgZmFjdG9yMyA9IDMgKiBmYWN0b3JUaW1lczIgKiBpbnZlcnNlRmFjdG9yO1xuICB2YXIgZmFjdG9yNCA9IGZhY3RvclRpbWVzMiAqIHQ7XG4gIG91dFswXSA9IGFbMF0gKiBmYWN0b3IxICsgYlswXSAqIGZhY3RvcjIgKyBjWzBdICogZmFjdG9yMyArIGRbMF0gKiBmYWN0b3I0O1xuICBvdXRbMV0gPSBhWzFdICogZmFjdG9yMSArIGJbMV0gKiBmYWN0b3IyICsgY1sxXSAqIGZhY3RvcjMgKyBkWzFdICogZmFjdG9yNDtcbiAgb3V0WzJdID0gYVsyXSAqIGZhY3RvcjEgKyBiWzJdICogZmFjdG9yMiArIGNbMl0gKiBmYWN0b3IzICsgZFsyXSAqIGZhY3RvcjQ7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogR2VuZXJhdGVzIGEgcmFuZG9tIHZlY3RvciB3aXRoIHRoZSBnaXZlbiBzY2FsZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge051bWJlcn0gW3NjYWxlXSBMZW5ndGggb2YgdGhlIHJlc3VsdGluZyB2ZWN0b3IuIElmIG9tbWl0dGVkLCBhIHVuaXQgdmVjdG9yIHdpbGwgYmUgcmV0dXJuZWRcclxuICogQHJldHVybnMge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbShvdXQsIHNjYWxlKSB7XG4gIHNjYWxlID0gc2NhbGUgfHwgMS4wO1xuICB2YXIgciA9IGdsTWF0cml4LlJBTkRPTSgpICogMi4wICogTWF0aC5QSTtcbiAgdmFyIHogPSBnbE1hdHJpeC5SQU5ET00oKSAqIDIuMCAtIDEuMDtcbiAgdmFyIHpTY2FsZSA9IE1hdGguc3FydCgxLjAgLSB6ICogeikgKiBzY2FsZTtcbiAgb3V0WzBdID0gTWF0aC5jb3MocikgKiB6U2NhbGU7XG4gIG91dFsxXSA9IE1hdGguc2luKHIpICogelNjYWxlO1xuICBvdXRbMl0gPSB6ICogc2NhbGU7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogVHJhbnNmb3JtcyB0aGUgdmVjMyB3aXRoIGEgbWF0NC5cclxuICogNHRoIHZlY3RvciBjb21wb25lbnQgaXMgaW1wbGljaXRseSAnMSdcclxuICpcclxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1NYXQ0KG91dCwgYSwgbSkge1xuICB2YXIgeCA9IGFbMF0sXG4gICAgICB5ID0gYVsxXSxcbiAgICAgIHogPSBhWzJdO1xuICB2YXIgdyA9IG1bM10gKiB4ICsgbVs3XSAqIHkgKyBtWzExXSAqIHogKyBtWzE1XTtcbiAgdyA9IHcgfHwgMS4wO1xuICBvdXRbMF0gPSAobVswXSAqIHggKyBtWzRdICogeSArIG1bOF0gKiB6ICsgbVsxMl0pIC8gdztcbiAgb3V0WzFdID0gKG1bMV0gKiB4ICsgbVs1XSAqIHkgKyBtWzldICogeiArIG1bMTNdKSAvIHc7XG4gIG91dFsyXSA9IChtWzJdICogeCArIG1bNl0gKiB5ICsgbVsxMF0gKiB6ICsgbVsxNF0pIC8gdztcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMzIHdpdGggYSBtYXQzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gbSB0aGUgM3gzIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxyXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtTWF0MyhvdXQsIGEsIG0pIHtcbiAgdmFyIHggPSBhWzBdLFxuICAgICAgeSA9IGFbMV0sXG4gICAgICB6ID0gYVsyXTtcbiAgb3V0WzBdID0geCAqIG1bMF0gKyB5ICogbVszXSArIHogKiBtWzZdO1xuICBvdXRbMV0gPSB4ICogbVsxXSArIHkgKiBtWzRdICsgeiAqIG1bN107XG4gIG91dFsyXSA9IHggKiBtWzJdICsgeSAqIG1bNV0gKyB6ICogbVs4XTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMzIHdpdGggYSBxdWF0XHJcbiAqIENhbiBhbHNvIGJlIHVzZWQgZm9yIGR1YWwgcXVhdGVybmlvbnMuIChNdWx0aXBseSBpdCB3aXRoIHRoZSByZWFsIHBhcnQpXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBxIHF1YXRlcm5pb24gdG8gdHJhbnNmb3JtIHdpdGhcclxuICogQHJldHVybnMge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybVF1YXQob3V0LCBhLCBxKSB7XG4gIC8vIGJlbmNobWFya3M6IGh0dHBzOi8vanNwZXJmLmNvbS9xdWF0ZXJuaW9uLXRyYW5zZm9ybS12ZWMzLWltcGxlbWVudGF0aW9ucy1maXhlZFxuICB2YXIgcXggPSBxWzBdLFxuICAgICAgcXkgPSBxWzFdLFxuICAgICAgcXogPSBxWzJdLFxuICAgICAgcXcgPSBxWzNdO1xuICB2YXIgeCA9IGFbMF0sXG4gICAgICB5ID0gYVsxXSxcbiAgICAgIHogPSBhWzJdOyAvLyB2YXIgcXZlYyA9IFtxeCwgcXksIHF6XTtcbiAgLy8gdmFyIHV2ID0gdmVjMy5jcm9zcyhbXSwgcXZlYywgYSk7XG5cbiAgdmFyIHV2eCA9IHF5ICogeiAtIHF6ICogeSxcbiAgICAgIHV2eSA9IHF6ICogeCAtIHF4ICogeixcbiAgICAgIHV2eiA9IHF4ICogeSAtIHF5ICogeDsgLy8gdmFyIHV1diA9IHZlYzMuY3Jvc3MoW10sIHF2ZWMsIHV2KTtcblxuICB2YXIgdXV2eCA9IHF5ICogdXZ6IC0gcXogKiB1dnksXG4gICAgICB1dXZ5ID0gcXogKiB1dnggLSBxeCAqIHV2eixcbiAgICAgIHV1dnogPSBxeCAqIHV2eSAtIHF5ICogdXZ4OyAvLyB2ZWMzLnNjYWxlKHV2LCB1diwgMiAqIHcpO1xuXG4gIHZhciB3MiA9IHF3ICogMjtcbiAgdXZ4ICo9IHcyO1xuICB1dnkgKj0gdzI7XG4gIHV2eiAqPSB3MjsgLy8gdmVjMy5zY2FsZSh1dXYsIHV1diwgMik7XG5cbiAgdXV2eCAqPSAyO1xuICB1dXZ5ICo9IDI7XG4gIHV1dnogKj0gMjsgLy8gcmV0dXJuIHZlYzMuYWRkKG91dCwgYSwgdmVjMy5hZGQob3V0LCB1diwgdXV2KSk7XG5cbiAgb3V0WzBdID0geCArIHV2eCArIHV1dng7XG4gIG91dFsxXSA9IHkgKyB1dnkgKyB1dXZ5O1xuICBvdXRbMl0gPSB6ICsgdXZ6ICsgdXV2ejtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBSb3RhdGUgYSAzRCB2ZWN0b3IgYXJvdW5kIHRoZSB4LWF4aXNcclxuICogQHBhcmFtIHt2ZWMzfSBvdXQgVGhlIHJlY2VpdmluZyB2ZWMzXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIFRoZSB2ZWMzIHBvaW50IHRvIHJvdGF0ZVxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiBUaGUgb3JpZ2luIG9mIHRoZSByb3RhdGlvblxyXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIFRoZSBhbmdsZSBvZiByb3RhdGlvbiBpbiByYWRpYW5zXHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGVYKG91dCwgYSwgYiwgcmFkKSB7XG4gIHZhciBwID0gW10sXG4gICAgICByID0gW107IC8vVHJhbnNsYXRlIHBvaW50IHRvIHRoZSBvcmlnaW5cblxuICBwWzBdID0gYVswXSAtIGJbMF07XG4gIHBbMV0gPSBhWzFdIC0gYlsxXTtcbiAgcFsyXSA9IGFbMl0gLSBiWzJdOyAvL3BlcmZvcm0gcm90YXRpb25cblxuICByWzBdID0gcFswXTtcbiAgclsxXSA9IHBbMV0gKiBNYXRoLmNvcyhyYWQpIC0gcFsyXSAqIE1hdGguc2luKHJhZCk7XG4gIHJbMl0gPSBwWzFdICogTWF0aC5zaW4ocmFkKSArIHBbMl0gKiBNYXRoLmNvcyhyYWQpOyAvL3RyYW5zbGF0ZSB0byBjb3JyZWN0IHBvc2l0aW9uXG5cbiAgb3V0WzBdID0gclswXSArIGJbMF07XG4gIG91dFsxXSA9IHJbMV0gKyBiWzFdO1xuICBvdXRbMl0gPSByWzJdICsgYlsyXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBSb3RhdGUgYSAzRCB2ZWN0b3IgYXJvdW5kIHRoZSB5LWF4aXNcclxuICogQHBhcmFtIHt2ZWMzfSBvdXQgVGhlIHJlY2VpdmluZyB2ZWMzXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIFRoZSB2ZWMzIHBvaW50IHRvIHJvdGF0ZVxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiBUaGUgb3JpZ2luIG9mIHRoZSByb3RhdGlvblxyXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIFRoZSBhbmdsZSBvZiByb3RhdGlvbiBpbiByYWRpYW5zXHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGVZKG91dCwgYSwgYiwgcmFkKSB7XG4gIHZhciBwID0gW10sXG4gICAgICByID0gW107IC8vVHJhbnNsYXRlIHBvaW50IHRvIHRoZSBvcmlnaW5cblxuICBwWzBdID0gYVswXSAtIGJbMF07XG4gIHBbMV0gPSBhWzFdIC0gYlsxXTtcbiAgcFsyXSA9IGFbMl0gLSBiWzJdOyAvL3BlcmZvcm0gcm90YXRpb25cblxuICByWzBdID0gcFsyXSAqIE1hdGguc2luKHJhZCkgKyBwWzBdICogTWF0aC5jb3MocmFkKTtcbiAgclsxXSA9IHBbMV07XG4gIHJbMl0gPSBwWzJdICogTWF0aC5jb3MocmFkKSAtIHBbMF0gKiBNYXRoLnNpbihyYWQpOyAvL3RyYW5zbGF0ZSB0byBjb3JyZWN0IHBvc2l0aW9uXG5cbiAgb3V0WzBdID0gclswXSArIGJbMF07XG4gIG91dFsxXSA9IHJbMV0gKyBiWzFdO1xuICBvdXRbMl0gPSByWzJdICsgYlsyXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBSb3RhdGUgYSAzRCB2ZWN0b3IgYXJvdW5kIHRoZSB6LWF4aXNcclxuICogQHBhcmFtIHt2ZWMzfSBvdXQgVGhlIHJlY2VpdmluZyB2ZWMzXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIFRoZSB2ZWMzIHBvaW50IHRvIHJvdGF0ZVxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiBUaGUgb3JpZ2luIG9mIHRoZSByb3RhdGlvblxyXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIFRoZSBhbmdsZSBvZiByb3RhdGlvbiBpbiByYWRpYW5zXHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGVaKG91dCwgYSwgYiwgcmFkKSB7XG4gIHZhciBwID0gW10sXG4gICAgICByID0gW107IC8vVHJhbnNsYXRlIHBvaW50IHRvIHRoZSBvcmlnaW5cblxuICBwWzBdID0gYVswXSAtIGJbMF07XG4gIHBbMV0gPSBhWzFdIC0gYlsxXTtcbiAgcFsyXSA9IGFbMl0gLSBiWzJdOyAvL3BlcmZvcm0gcm90YXRpb25cblxuICByWzBdID0gcFswXSAqIE1hdGguY29zKHJhZCkgLSBwWzFdICogTWF0aC5zaW4ocmFkKTtcbiAgclsxXSA9IHBbMF0gKiBNYXRoLnNpbihyYWQpICsgcFsxXSAqIE1hdGguY29zKHJhZCk7XG4gIHJbMl0gPSBwWzJdOyAvL3RyYW5zbGF0ZSB0byBjb3JyZWN0IHBvc2l0aW9uXG5cbiAgb3V0WzBdID0gclswXSArIGJbMF07XG4gIG91dFsxXSA9IHJbMV0gKyBiWzFdO1xuICBvdXRbMl0gPSByWzJdICsgYlsyXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBHZXQgdGhlIGFuZ2xlIGJldHdlZW4gdHdvIDNEIHZlY3RvcnNcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgVGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgVGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBhbmdsZSBpbiByYWRpYW5zXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gYW5nbGUoYSwgYikge1xuICB2YXIgYXggPSBhWzBdLFxuICAgICAgYXkgPSBhWzFdLFxuICAgICAgYXogPSBhWzJdLFxuICAgICAgYnggPSBiWzBdLFxuICAgICAgYnkgPSBiWzFdLFxuICAgICAgYnogPSBiWzJdLFxuICAgICAgbWFnMSA9IE1hdGguc3FydChheCAqIGF4ICsgYXkgKiBheSArIGF6ICogYXopLFxuICAgICAgbWFnMiA9IE1hdGguc3FydChieCAqIGJ4ICsgYnkgKiBieSArIGJ6ICogYnopLFxuICAgICAgbWFnID0gbWFnMSAqIG1hZzIsXG4gICAgICBjb3NpbmUgPSBtYWcgJiYgZG90KGEsIGIpIC8gbWFnO1xuICByZXR1cm4gTWF0aC5hY29zKE1hdGgubWluKE1hdGgubWF4KGNvc2luZSwgLTEpLCAxKSk7XG59XG4vKipcclxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMyB0byB6ZXJvXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB6ZXJvKG91dCkge1xuICBvdXRbMF0gPSAwLjA7XG4gIG91dFsxXSA9IDAuMDtcbiAgb3V0WzJdID0gMC4wO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSB2ZWN0b3JcclxuICpcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdmVjdG9yIHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cihhKSB7XG4gIHJldHVybiBcInZlYzMoXCIgKyBhWzBdICsgXCIsIFwiICsgYVsxXSArIFwiLCBcIiArIGFbMl0gKyBcIilcIjtcbn1cbi8qKlxyXG4gKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSB2ZWN0b3JzIGhhdmUgZXhhY3RseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbiAod2hlbiBjb21wYXJlZCB3aXRoID09PSlcclxuICpcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgVGhlIGZpcnN0IHZlY3Rvci5cclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgVGhlIHNlY29uZCB2ZWN0b3IuXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSB2ZWN0b3JzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGV4YWN0RXF1YWxzKGEsIGIpIHtcbiAgcmV0dXJuIGFbMF0gPT09IGJbMF0gJiYgYVsxXSA9PT0gYlsxXSAmJiBhWzJdID09PSBiWzJdO1xufVxuLyoqXHJcbiAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHZlY3RvcnMgaGF2ZSBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSBUaGUgZmlyc3QgdmVjdG9yLlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiBUaGUgc2Vjb25kIHZlY3Rvci5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxzKGEsIGIpIHtcbiAgdmFyIGEwID0gYVswXSxcbiAgICAgIGExID0gYVsxXSxcbiAgICAgIGEyID0gYVsyXTtcbiAgdmFyIGIwID0gYlswXSxcbiAgICAgIGIxID0gYlsxXSxcbiAgICAgIGIyID0gYlsyXTtcbiAgcmV0dXJuIE1hdGguYWJzKGEwIC0gYjApIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEwKSwgTWF0aC5hYnMoYjApKSAmJiBNYXRoLmFicyhhMSAtIGIxKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMSksIE1hdGguYWJzKGIxKSkgJiYgTWF0aC5hYnMoYTIgLSBiMikgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTIpLCBNYXRoLmFicyhiMikpO1xufVxuLyoqXHJcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5zdWJ0cmFjdH1cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xuXG5leHBvcnQgdmFyIHN1YiA9IHN1YnRyYWN0O1xuLyoqXHJcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5tdWx0aXBseX1cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xuXG5leHBvcnQgdmFyIG11bCA9IG11bHRpcGx5O1xuLyoqXHJcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5kaXZpZGV9XHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cblxuZXhwb3J0IHZhciBkaXYgPSBkaXZpZGU7XG4vKipcclxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLmRpc3RhbmNlfVxyXG4gKiBAZnVuY3Rpb25cclxuICovXG5cbmV4cG9ydCB2YXIgZGlzdCA9IGRpc3RhbmNlO1xuLyoqXHJcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5zcXVhcmVkRGlzdGFuY2V9XHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cblxuZXhwb3J0IHZhciBzcXJEaXN0ID0gc3F1YXJlZERpc3RhbmNlO1xuLyoqXHJcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5sZW5ndGh9XHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cblxuZXhwb3J0IHZhciBsZW4gPSBsZW5ndGg7XG4vKipcclxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLnNxdWFyZWRMZW5ndGh9XHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cblxuZXhwb3J0IHZhciBzcXJMZW4gPSBzcXVhcmVkTGVuZ3RoO1xuLyoqXHJcbiAqIFBlcmZvcm0gc29tZSBvcGVyYXRpb24gb3ZlciBhbiBhcnJheSBvZiB2ZWMzcy5cclxuICpcclxuICogQHBhcmFtIHtBcnJheX0gYSB0aGUgYXJyYXkgb2YgdmVjdG9ycyB0byBpdGVyYXRlIG92ZXJcclxuICogQHBhcmFtIHtOdW1iZXJ9IHN0cmlkZSBOdW1iZXIgb2YgZWxlbWVudHMgYmV0d2VlbiB0aGUgc3RhcnQgb2YgZWFjaCB2ZWMzLiBJZiAwIGFzc3VtZXMgdGlnaHRseSBwYWNrZWRcclxuICogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldCBOdW1iZXIgb2YgZWxlbWVudHMgdG8gc2tpcCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBhcnJheVxyXG4gKiBAcGFyYW0ge051bWJlcn0gY291bnQgTnVtYmVyIG9mIHZlYzNzIHRvIGl0ZXJhdGUgb3Zlci4gSWYgMCBpdGVyYXRlcyBvdmVyIGVudGlyZSBhcnJheVxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIHZlY3RvciBpbiB0aGUgYXJyYXlcclxuICogQHBhcmFtIHtPYmplY3R9IFthcmddIGFkZGl0aW9uYWwgYXJndW1lbnQgdG8gcGFzcyB0byBmblxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IGFcclxuICogQGZ1bmN0aW9uXHJcbiAqL1xuXG5leHBvcnQgdmFyIGZvckVhY2ggPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB2ZWMgPSBjcmVhdGUoKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChhLCBzdHJpZGUsIG9mZnNldCwgY291bnQsIGZuLCBhcmcpIHtcbiAgICB2YXIgaSwgbDtcblxuICAgIGlmICghc3RyaWRlKSB7XG4gICAgICBzdHJpZGUgPSAzO1xuICAgIH1cblxuICAgIGlmICghb2Zmc2V0KSB7XG4gICAgICBvZmZzZXQgPSAwO1xuICAgIH1cblxuICAgIGlmIChjb3VudCkge1xuICAgICAgbCA9IE1hdGgubWluKGNvdW50ICogc3RyaWRlICsgb2Zmc2V0LCBhLmxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGwgPSBhLmxlbmd0aDtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCBsOyBpICs9IHN0cmlkZSkge1xuICAgICAgdmVjWzBdID0gYVtpXTtcbiAgICAgIHZlY1sxXSA9IGFbaSArIDFdO1xuICAgICAgdmVjWzJdID0gYVtpICsgMl07XG4gICAgICBmbih2ZWMsIHZlYywgYXJnKTtcbiAgICAgIGFbaV0gPSB2ZWNbMF07XG4gICAgICBhW2kgKyAxXSA9IHZlY1sxXTtcbiAgICAgIGFbaSArIDJdID0gdmVjWzJdO1xuICAgIH1cblxuICAgIHJldHVybiBhO1xuICB9O1xufSgpOyIsImltcG9ydCAqIGFzIGdsTWF0cml4IGZyb20gXCIuL2NvbW1vbi5qc1wiO1xuLyoqXHJcbiAqIDQgRGltZW5zaW9uYWwgVmVjdG9yXHJcbiAqIEBtb2R1bGUgdmVjNFxyXG4gKi9cblxuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcsIGVtcHR5IHZlYzRcclxuICpcclxuICogQHJldHVybnMge3ZlYzR9IGEgbmV3IDREIHZlY3RvclxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDQpO1xuXG4gIGlmIChnbE1hdHJpeC5BUlJBWV9UWVBFICE9IEZsb2F0MzJBcnJheSkge1xuICAgIG91dFswXSA9IDA7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gIH1cblxuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcgdmVjNCBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIHZlY3RvclxyXG4gKlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB2ZWN0b3IgdG8gY2xvbmVcclxuICogQHJldHVybnMge3ZlYzR9IGEgbmV3IDREIHZlY3RvclxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lKGEpIHtcbiAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDQpO1xuICBvdXRbMF0gPSBhWzBdO1xuICBvdXRbMV0gPSBhWzFdO1xuICBvdXRbMl0gPSBhWzJdO1xuICBvdXRbM10gPSBhWzNdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcgdmVjNCBpbml0aWFsaXplZCB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHcgVyBjb21wb25lbnRcclxuICogQHJldHVybnMge3ZlYzR9IGEgbmV3IDREIHZlY3RvclxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21WYWx1ZXMoeCwgeSwgeiwgdykge1xuICB2YXIgb3V0ID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoNCk7XG4gIG91dFswXSA9IHg7XG4gIG91dFsxXSA9IHk7XG4gIG91dFsyXSA9IHo7XG4gIG91dFszXSA9IHc7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIHZlYzQgdG8gYW5vdGhlclxyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgc291cmNlIHZlY3RvclxyXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY29weShvdXQsIGEpIHtcbiAgb3V0WzBdID0gYVswXTtcbiAgb3V0WzFdID0gYVsxXTtcbiAgb3V0WzJdID0gYVsyXTtcbiAgb3V0WzNdID0gYVszXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWM0IHRvIHRoZSBnaXZlbiB2YWx1ZXNcclxuICpcclxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHcgVyBjb21wb25lbnRcclxuICogQHJldHVybnMge3ZlYzR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNldChvdXQsIHgsIHksIHosIHcpIHtcbiAgb3V0WzBdID0geDtcbiAgb3V0WzFdID0geTtcbiAgb3V0WzJdID0gejtcbiAgb3V0WzNdID0gdztcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBBZGRzIHR3byB2ZWM0J3NcclxuICpcclxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGQob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gKyBiWzBdO1xuICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgb3V0WzJdID0gYVsyXSArIGJbMl07XG4gIG91dFszXSA9IGFbM10gKyBiWzNdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFN1YnRyYWN0cyB2ZWN0b3IgYiBmcm9tIHZlY3RvciBhXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc3VidHJhY3Qob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gLSBiWzBdO1xuICBvdXRbMV0gPSBhWzFdIC0gYlsxXTtcbiAgb3V0WzJdID0gYVsyXSAtIGJbMl07XG4gIG91dFszXSA9IGFbM10gLSBiWzNdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIE11bHRpcGxpZXMgdHdvIHZlYzQnc1xyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHJldHVybnMge3ZlYzR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG11bHRpcGx5KG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICogYlswXTtcbiAgb3V0WzFdID0gYVsxXSAqIGJbMV07XG4gIG91dFsyXSA9IGFbMl0gKiBiWzJdO1xuICBvdXRbM10gPSBhWzNdICogYlszXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBEaXZpZGVzIHR3byB2ZWM0J3NcclxuICpcclxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkaXZpZGUob3V0LCBhLCBiKSB7XG4gIG91dFswXSA9IGFbMF0gLyBiWzBdO1xuICBvdXRbMV0gPSBhWzFdIC8gYlsxXTtcbiAgb3V0WzJdID0gYVsyXSAvIGJbMl07XG4gIG91dFszXSA9IGFbM10gLyBiWzNdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIE1hdGguY2VpbCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzRcclxuICpcclxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdmVjdG9yIHRvIGNlaWxcclxuICogQHJldHVybnMge3ZlYzR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNlaWwob3V0LCBhKSB7XG4gIG91dFswXSA9IE1hdGguY2VpbChhWzBdKTtcbiAgb3V0WzFdID0gTWF0aC5jZWlsKGFbMV0pO1xuICBvdXRbMl0gPSBNYXRoLmNlaWwoYVsyXSk7XG4gIG91dFszXSA9IE1hdGguY2VpbChhWzNdKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBNYXRoLmZsb29yIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjNFxyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB2ZWN0b3IgdG8gZmxvb3JcclxuICogQHJldHVybnMge3ZlYzR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZsb29yKG91dCwgYSkge1xuICBvdXRbMF0gPSBNYXRoLmZsb29yKGFbMF0pO1xuICBvdXRbMV0gPSBNYXRoLmZsb29yKGFbMV0pO1xuICBvdXRbMl0gPSBNYXRoLmZsb29yKGFbMl0pO1xuICBvdXRbM10gPSBNYXRoLmZsb29yKGFbM10pO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFJldHVybnMgdGhlIG1pbmltdW0gb2YgdHdvIHZlYzQnc1xyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHJldHVybnMge3ZlYzR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG1pbihvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gTWF0aC5taW4oYVswXSwgYlswXSk7XG4gIG91dFsxXSA9IE1hdGgubWluKGFbMV0sIGJbMV0pO1xuICBvdXRbMl0gPSBNYXRoLm1pbihhWzJdLCBiWzJdKTtcbiAgb3V0WzNdID0gTWF0aC5taW4oYVszXSwgYlszXSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogUmV0dXJucyB0aGUgbWF4aW11bSBvZiB0d28gdmVjNCdzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbWF4KG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBNYXRoLm1heChhWzBdLCBiWzBdKTtcbiAgb3V0WzFdID0gTWF0aC5tYXgoYVsxXSwgYlsxXSk7XG4gIG91dFsyXSA9IE1hdGgubWF4KGFbMl0sIGJbMl0pO1xuICBvdXRbM10gPSBNYXRoLm1heChhWzNdLCBiWzNdKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBNYXRoLnJvdW5kIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjNFxyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB2ZWN0b3IgdG8gcm91bmRcclxuICogQHJldHVybnMge3ZlYzR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdW5kKG91dCwgYSkge1xuICBvdXRbMF0gPSBNYXRoLnJvdW5kKGFbMF0pO1xuICBvdXRbMV0gPSBNYXRoLnJvdW5kKGFbMV0pO1xuICBvdXRbMl0gPSBNYXRoLnJvdW5kKGFbMl0pO1xuICBvdXRbM10gPSBNYXRoLnJvdW5kKGFbM10pO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFNjYWxlcyBhIHZlYzQgYnkgYSBzY2FsYXIgbnVtYmVyXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSB2ZWN0b3IgdG8gc2NhbGVcclxuICogQHBhcmFtIHtOdW1iZXJ9IGIgYW1vdW50IHRvIHNjYWxlIHRoZSB2ZWN0b3IgYnlcclxuICogQHJldHVybnMge3ZlYzR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICogYjtcbiAgb3V0WzFdID0gYVsxXSAqIGI7XG4gIG91dFsyXSA9IGFbMl0gKiBiO1xuICBvdXRbM10gPSBhWzNdICogYjtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBBZGRzIHR3byB2ZWM0J3MgYWZ0ZXIgc2NhbGluZyB0aGUgc2Vjb25kIG9wZXJhbmQgYnkgYSBzY2FsYXIgdmFsdWVcclxuICpcclxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsZSB0aGUgYW1vdW50IHRvIHNjYWxlIGIgYnkgYmVmb3JlIGFkZGluZ1xyXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc2NhbGVBbmRBZGQob3V0LCBhLCBiLCBzY2FsZSkge1xuICBvdXRbMF0gPSBhWzBdICsgYlswXSAqIHNjYWxlO1xuICBvdXRbMV0gPSBhWzFdICsgYlsxXSAqIHNjYWxlO1xuICBvdXRbMl0gPSBhWzJdICsgYlsyXSAqIHNjYWxlO1xuICBvdXRbM10gPSBhWzNdICsgYlszXSAqIHNjYWxlO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWM0J3NcclxuICpcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3RhbmNlKGEsIGIpIHtcbiAgdmFyIHggPSBiWzBdIC0gYVswXTtcbiAgdmFyIHkgPSBiWzFdIC0gYVsxXTtcbiAgdmFyIHogPSBiWzJdIC0gYVsyXTtcbiAgdmFyIHcgPSBiWzNdIC0gYVszXTtcbiAgcmV0dXJuIE1hdGguaHlwb3QoeCwgeSwgeiwgdyk7XG59XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjNCdzXHJcbiAqXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNxdWFyZWREaXN0YW5jZShhLCBiKSB7XG4gIHZhciB4ID0gYlswXSAtIGFbMF07XG4gIHZhciB5ID0gYlsxXSAtIGFbMV07XG4gIHZhciB6ID0gYlsyXSAtIGFbMl07XG4gIHZhciB3ID0gYlszXSAtIGFbM107XG4gIHJldHVybiB4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogdztcbn1cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgYSB2ZWM0XHJcbiAqXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHZlY3RvciB0byBjYWxjdWxhdGUgbGVuZ3RoIG9mXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGxlbmd0aCBvZiBhXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbGVuZ3RoKGEpIHtcbiAgdmFyIHggPSBhWzBdO1xuICB2YXIgeSA9IGFbMV07XG4gIHZhciB6ID0gYVsyXTtcbiAgdmFyIHcgPSBhWzNdO1xuICByZXR1cm4gTWF0aC5oeXBvdCh4LCB5LCB6LCB3KTtcbn1cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiBhIHZlYzRcclxuICpcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBzcXVhcmVkIGxlbmd0aCBvZlxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGxlbmd0aCBvZiBhXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc3F1YXJlZExlbmd0aChhKSB7XG4gIHZhciB4ID0gYVswXTtcbiAgdmFyIHkgPSBhWzFdO1xuICB2YXIgeiA9IGFbMl07XG4gIHZhciB3ID0gYVszXTtcbiAgcmV0dXJuIHggKiB4ICsgeSAqIHkgKyB6ICogeiArIHcgKiB3O1xufVxuLyoqXHJcbiAqIE5lZ2F0ZXMgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWM0XHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHZlY3RvciB0byBuZWdhdGVcclxuICogQHJldHVybnMge3ZlYzR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG5lZ2F0ZShvdXQsIGEpIHtcbiAgb3V0WzBdID0gLWFbMF07XG4gIG91dFsxXSA9IC1hWzFdO1xuICBvdXRbMl0gPSAtYVsyXTtcbiAgb3V0WzNdID0gLWFbM107XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogUmV0dXJucyB0aGUgaW52ZXJzZSBvZiB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzRcclxuICpcclxuICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdmVjdG9yIHRvIGludmVydFxyXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJzZShvdXQsIGEpIHtcbiAgb3V0WzBdID0gMS4wIC8gYVswXTtcbiAgb3V0WzFdID0gMS4wIC8gYVsxXTtcbiAgb3V0WzJdID0gMS4wIC8gYVsyXTtcbiAgb3V0WzNdID0gMS4wIC8gYVszXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBOb3JtYWxpemUgYSB2ZWM0XHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHZlY3RvciB0byBub3JtYWxpemVcclxuICogQHJldHVybnMge3ZlYzR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZShvdXQsIGEpIHtcbiAgdmFyIHggPSBhWzBdO1xuICB2YXIgeSA9IGFbMV07XG4gIHZhciB6ID0gYVsyXTtcbiAgdmFyIHcgPSBhWzNdO1xuICB2YXIgbGVuID0geCAqIHggKyB5ICogeSArIHogKiB6ICsgdyAqIHc7XG5cbiAgaWYgKGxlbiA+IDApIHtcbiAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gIH1cblxuICBvdXRbMF0gPSB4ICogbGVuO1xuICBvdXRbMV0gPSB5ICogbGVuO1xuICBvdXRbMl0gPSB6ICogbGVuO1xuICBvdXRbM10gPSB3ICogbGVuO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byB2ZWM0J3NcclxuICpcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRvdCBwcm9kdWN0IG9mIGEgYW5kIGJcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkb3QoYSwgYikge1xuICByZXR1cm4gYVswXSAqIGJbMF0gKyBhWzFdICogYlsxXSArIGFbMl0gKiBiWzJdICsgYVszXSAqIGJbM107XG59XG4vKipcclxuICogUmV0dXJucyB0aGUgY3Jvc3MtcHJvZHVjdCBvZiB0aHJlZSB2ZWN0b3JzIGluIGEgNC1kaW1lbnNpb25hbCBzcGFjZVxyXG4gKlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gcmVzdWx0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBVIHRoZSBmaXJzdCB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IFYgdGhlIHNlY29uZCB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IFcgdGhlIHRoaXJkIHZlY3RvclxyXG4gKiBAcmV0dXJucyB7dmVjNH0gcmVzdWx0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY3Jvc3Mob3V0LCB1LCB2LCB3KSB7XG4gIHZhciBBID0gdlswXSAqIHdbMV0gLSB2WzFdICogd1swXSxcbiAgICAgIEIgPSB2WzBdICogd1syXSAtIHZbMl0gKiB3WzBdLFxuICAgICAgQyA9IHZbMF0gKiB3WzNdIC0gdlszXSAqIHdbMF0sXG4gICAgICBEID0gdlsxXSAqIHdbMl0gLSB2WzJdICogd1sxXSxcbiAgICAgIEUgPSB2WzFdICogd1szXSAtIHZbM10gKiB3WzFdLFxuICAgICAgRiA9IHZbMl0gKiB3WzNdIC0gdlszXSAqIHdbMl07XG4gIHZhciBHID0gdVswXTtcbiAgdmFyIEggPSB1WzFdO1xuICB2YXIgSSA9IHVbMl07XG4gIHZhciBKID0gdVszXTtcbiAgb3V0WzBdID0gSCAqIEYgLSBJICogRSArIEogKiBEO1xuICBvdXRbMV0gPSAtKEcgKiBGKSArIEkgKiBDIC0gSiAqIEI7XG4gIG91dFsyXSA9IEcgKiBFIC0gSCAqIEMgKyBKICogQTtcbiAgb3V0WzNdID0gLShHICogRCkgKyBIICogQiAtIEkgKiBBO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjNCdzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge051bWJlcn0gdCBpbnRlcnBvbGF0aW9uIGFtb3VudCwgaW4gdGhlIHJhbmdlIFswLTFdLCBiZXR3ZWVuIHRoZSB0d28gaW5wdXRzXHJcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBsZXJwKG91dCwgYSwgYiwgdCkge1xuICB2YXIgYXggPSBhWzBdO1xuICB2YXIgYXkgPSBhWzFdO1xuICB2YXIgYXogPSBhWzJdO1xuICB2YXIgYXcgPSBhWzNdO1xuICBvdXRbMF0gPSBheCArIHQgKiAoYlswXSAtIGF4KTtcbiAgb3V0WzFdID0gYXkgKyB0ICogKGJbMV0gLSBheSk7XG4gIG91dFsyXSA9IGF6ICsgdCAqIChiWzJdIC0gYXopO1xuICBvdXRbM10gPSBhdyArIHQgKiAoYlszXSAtIGF3KTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYSByYW5kb20gdmVjdG9yIHdpdGggdGhlIGdpdmVuIHNjYWxlXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbc2NhbGVdIExlbmd0aCBvZiB0aGUgcmVzdWx0aW5nIHZlY3Rvci4gSWYgb21taXR0ZWQsIGEgdW5pdCB2ZWN0b3Igd2lsbCBiZSByZXR1cm5lZFxyXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tKG91dCwgc2NhbGUpIHtcbiAgc2NhbGUgPSBzY2FsZSB8fCAxLjA7IC8vIE1hcnNhZ2xpYSwgR2VvcmdlLiBDaG9vc2luZyBhIFBvaW50IGZyb20gdGhlIFN1cmZhY2Ugb2YgYVxuICAvLyBTcGhlcmUuIEFubi4gTWF0aC4gU3RhdGlzdC4gNDMgKDE5NzIpLCBuby4gMiwgNjQ1LS02NDYuXG4gIC8vIGh0dHA6Ly9wcm9qZWN0ZXVjbGlkLm9yZy9ldWNsaWQuYW9tcy8xMTc3NjkyNjQ0O1xuXG4gIHZhciB2MSwgdjIsIHYzLCB2NDtcbiAgdmFyIHMxLCBzMjtcblxuICBkbyB7XG4gICAgdjEgPSBnbE1hdHJpeC5SQU5ET00oKSAqIDIgLSAxO1xuICAgIHYyID0gZ2xNYXRyaXguUkFORE9NKCkgKiAyIC0gMTtcbiAgICBzMSA9IHYxICogdjEgKyB2MiAqIHYyO1xuICB9IHdoaWxlIChzMSA+PSAxKTtcblxuICBkbyB7XG4gICAgdjMgPSBnbE1hdHJpeC5SQU5ET00oKSAqIDIgLSAxO1xuICAgIHY0ID0gZ2xNYXRyaXguUkFORE9NKCkgKiAyIC0gMTtcbiAgICBzMiA9IHYzICogdjMgKyB2NCAqIHY0O1xuICB9IHdoaWxlIChzMiA+PSAxKTtcblxuICB2YXIgZCA9IE1hdGguc3FydCgoMSAtIHMxKSAvIHMyKTtcbiAgb3V0WzBdID0gc2NhbGUgKiB2MTtcbiAgb3V0WzFdID0gc2NhbGUgKiB2MjtcbiAgb3V0WzJdID0gc2NhbGUgKiB2MyAqIGQ7XG4gIG91dFszXSA9IHNjYWxlICogdjQgKiBkO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzQgd2l0aCBhIG1hdDQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxyXG4gKiBAcmV0dXJucyB7dmVjNH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtTWF0NChvdXQsIGEsIG0pIHtcbiAgdmFyIHggPSBhWzBdLFxuICAgICAgeSA9IGFbMV0sXG4gICAgICB6ID0gYVsyXSxcbiAgICAgIHcgPSBhWzNdO1xuICBvdXRbMF0gPSBtWzBdICogeCArIG1bNF0gKiB5ICsgbVs4XSAqIHogKyBtWzEyXSAqIHc7XG4gIG91dFsxXSA9IG1bMV0gKiB4ICsgbVs1XSAqIHkgKyBtWzldICogeiArIG1bMTNdICogdztcbiAgb3V0WzJdID0gbVsyXSAqIHggKyBtWzZdICogeSArIG1bMTBdICogeiArIG1bMTRdICogdztcbiAgb3V0WzNdID0gbVszXSAqIHggKyBtWzddICogeSArIG1bMTFdICogeiArIG1bMTVdICogdztcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWM0IHdpdGggYSBxdWF0XHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBxIHF1YXRlcm5pb24gdG8gdHJhbnNmb3JtIHdpdGhcclxuICogQHJldHVybnMge3ZlYzR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybVF1YXQob3V0LCBhLCBxKSB7XG4gIHZhciB4ID0gYVswXSxcbiAgICAgIHkgPSBhWzFdLFxuICAgICAgeiA9IGFbMl07XG4gIHZhciBxeCA9IHFbMF0sXG4gICAgICBxeSA9IHFbMV0sXG4gICAgICBxeiA9IHFbMl0sXG4gICAgICBxdyA9IHFbM107IC8vIGNhbGN1bGF0ZSBxdWF0ICogdmVjXG5cbiAgdmFyIGl4ID0gcXcgKiB4ICsgcXkgKiB6IC0gcXogKiB5O1xuICB2YXIgaXkgPSBxdyAqIHkgKyBxeiAqIHggLSBxeCAqIHo7XG4gIHZhciBpeiA9IHF3ICogeiArIHF4ICogeSAtIHF5ICogeDtcbiAgdmFyIGl3ID0gLXF4ICogeCAtIHF5ICogeSAtIHF6ICogejsgLy8gY2FsY3VsYXRlIHJlc3VsdCAqIGludmVyc2UgcXVhdFxuXG4gIG91dFswXSA9IGl4ICogcXcgKyBpdyAqIC1xeCArIGl5ICogLXF6IC0gaXogKiAtcXk7XG4gIG91dFsxXSA9IGl5ICogcXcgKyBpdyAqIC1xeSArIGl6ICogLXF4IC0gaXggKiAtcXo7XG4gIG91dFsyXSA9IGl6ICogcXcgKyBpdyAqIC1xeiArIGl4ICogLXF5IC0gaXkgKiAtcXg7XG4gIG91dFszXSA9IGFbM107XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjNCB0byB6ZXJvXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB6ZXJvKG91dCkge1xuICBvdXRbMF0gPSAwLjA7XG4gIG91dFsxXSA9IDAuMDtcbiAgb3V0WzJdID0gMC4wO1xuICBvdXRbM10gPSAwLjA7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIHZlY3RvclxyXG4gKlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB2ZWN0b3IgdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmVjdG9yXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc3RyKGEpIHtcbiAgcmV0dXJuIFwidmVjNChcIiArIGFbMF0gKyBcIiwgXCIgKyBhWzFdICsgXCIsIFwiICsgYVsyXSArIFwiLCBcIiArIGFbM10gKyBcIilcIjtcbn1cbi8qKlxyXG4gKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSB2ZWN0b3JzIGhhdmUgZXhhY3RseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbiAod2hlbiBjb21wYXJlZCB3aXRoID09PSlcclxuICpcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgVGhlIGZpcnN0IHZlY3Rvci5cclxuICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGIgVGhlIHNlY29uZCB2ZWN0b3IuXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSB2ZWN0b3JzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGV4YWN0RXF1YWxzKGEsIGIpIHtcbiAgcmV0dXJuIGFbMF0gPT09IGJbMF0gJiYgYVsxXSA9PT0gYlsxXSAmJiBhWzJdID09PSBiWzJdICYmIGFbM10gPT09IGJbM107XG59XG4vKipcclxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgdmVjdG9ycyBoYXZlIGFwcHJveGltYXRlbHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24uXHJcbiAqXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIFRoZSBmaXJzdCB2ZWN0b3IuXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIFRoZSBzZWNvbmQgdmVjdG9yLlxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmVjdG9ycyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbHMoYSwgYikge1xuICB2YXIgYTAgPSBhWzBdLFxuICAgICAgYTEgPSBhWzFdLFxuICAgICAgYTIgPSBhWzJdLFxuICAgICAgYTMgPSBhWzNdO1xuICB2YXIgYjAgPSBiWzBdLFxuICAgICAgYjEgPSBiWzFdLFxuICAgICAgYjIgPSBiWzJdLFxuICAgICAgYjMgPSBiWzNdO1xuICByZXR1cm4gTWF0aC5hYnMoYTAgLSBiMCkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTApLCBNYXRoLmFicyhiMCkpICYmIE1hdGguYWJzKGExIC0gYjEpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExKSwgTWF0aC5hYnMoYjEpKSAmJiBNYXRoLmFicyhhMiAtIGIyKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMiksIE1hdGguYWJzKGIyKSkgJiYgTWF0aC5hYnMoYTMgLSBiMykgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTMpLCBNYXRoLmFicyhiMykpO1xufVxuLyoqXHJcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5zdWJ0cmFjdH1cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xuXG5leHBvcnQgdmFyIHN1YiA9IHN1YnRyYWN0O1xuLyoqXHJcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5tdWx0aXBseX1cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xuXG5leHBvcnQgdmFyIG11bCA9IG11bHRpcGx5O1xuLyoqXHJcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5kaXZpZGV9XHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cblxuZXhwb3J0IHZhciBkaXYgPSBkaXZpZGU7XG4vKipcclxuICogQWxpYXMgZm9yIHtAbGluayB2ZWM0LmRpc3RhbmNlfVxyXG4gKiBAZnVuY3Rpb25cclxuICovXG5cbmV4cG9ydCB2YXIgZGlzdCA9IGRpc3RhbmNlO1xuLyoqXHJcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5zcXVhcmVkRGlzdGFuY2V9XHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cblxuZXhwb3J0IHZhciBzcXJEaXN0ID0gc3F1YXJlZERpc3RhbmNlO1xuLyoqXHJcbiAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5sZW5ndGh9XHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cblxuZXhwb3J0IHZhciBsZW4gPSBsZW5ndGg7XG4vKipcclxuICogQWxpYXMgZm9yIHtAbGluayB2ZWM0LnNxdWFyZWRMZW5ndGh9XHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cblxuZXhwb3J0IHZhciBzcXJMZW4gPSBzcXVhcmVkTGVuZ3RoO1xuLyoqXHJcbiAqIFBlcmZvcm0gc29tZSBvcGVyYXRpb24gb3ZlciBhbiBhcnJheSBvZiB2ZWM0cy5cclxuICpcclxuICogQHBhcmFtIHtBcnJheX0gYSB0aGUgYXJyYXkgb2YgdmVjdG9ycyB0byBpdGVyYXRlIG92ZXJcclxuICogQHBhcmFtIHtOdW1iZXJ9IHN0cmlkZSBOdW1iZXIgb2YgZWxlbWVudHMgYmV0d2VlbiB0aGUgc3RhcnQgb2YgZWFjaCB2ZWM0LiBJZiAwIGFzc3VtZXMgdGlnaHRseSBwYWNrZWRcclxuICogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldCBOdW1iZXIgb2YgZWxlbWVudHMgdG8gc2tpcCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBhcnJheVxyXG4gKiBAcGFyYW0ge051bWJlcn0gY291bnQgTnVtYmVyIG9mIHZlYzRzIHRvIGl0ZXJhdGUgb3Zlci4gSWYgMCBpdGVyYXRlcyBvdmVyIGVudGlyZSBhcnJheVxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIHZlY3RvciBpbiB0aGUgYXJyYXlcclxuICogQHBhcmFtIHtPYmplY3R9IFthcmddIGFkZGl0aW9uYWwgYXJndW1lbnQgdG8gcGFzcyB0byBmblxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IGFcclxuICogQGZ1bmN0aW9uXHJcbiAqL1xuXG5leHBvcnQgdmFyIGZvckVhY2ggPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB2ZWMgPSBjcmVhdGUoKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChhLCBzdHJpZGUsIG9mZnNldCwgY291bnQsIGZuLCBhcmcpIHtcbiAgICB2YXIgaSwgbDtcblxuICAgIGlmICghc3RyaWRlKSB7XG4gICAgICBzdHJpZGUgPSA0O1xuICAgIH1cblxuICAgIGlmICghb2Zmc2V0KSB7XG4gICAgICBvZmZzZXQgPSAwO1xuICAgIH1cblxuICAgIGlmIChjb3VudCkge1xuICAgICAgbCA9IE1hdGgubWluKGNvdW50ICogc3RyaWRlICsgb2Zmc2V0LCBhLmxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGwgPSBhLmxlbmd0aDtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCBsOyBpICs9IHN0cmlkZSkge1xuICAgICAgdmVjWzBdID0gYVtpXTtcbiAgICAgIHZlY1sxXSA9IGFbaSArIDFdO1xuICAgICAgdmVjWzJdID0gYVtpICsgMl07XG4gICAgICB2ZWNbM10gPSBhW2kgKyAzXTtcbiAgICAgIGZuKHZlYywgdmVjLCBhcmcpO1xuICAgICAgYVtpXSA9IHZlY1swXTtcbiAgICAgIGFbaSArIDFdID0gdmVjWzFdO1xuICAgICAgYVtpICsgMl0gPSB2ZWNbMl07XG4gICAgICBhW2kgKyAzXSA9IHZlY1szXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYTtcbiAgfTtcbn0oKTsiLCJpbXBvcnQgeyBjcmVhdGVTdGF0ZSB9IGZyb20gJy4vc3RhdGUnO1xuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyQ29tcG9uZW50ID0gKGNvbXBvbmVudHMsIGNvbXBvbmVudE5hbWUpID0+IChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGNvbXBvbmVudHMpLCB7IFtjb21wb25lbnROYW1lXTogbmV3IE1hcCgpIH0pKTtcbmV4cG9ydCBjb25zdCBuZXdFbnRpdHkgPSAoZW50aXRpZXMsIGVudGl0eUlkKSA9PiB7XG4gICAgZW50aXRpZXMuc2V0KGVudGl0eUlkLCBbXSk7XG4gICAgcmV0dXJuIGVudGl0aWVzO1xufTtcbmV4cG9ydCBjb25zdCBhZGRDb21wb25lbnQgPSAoc3RhdGUsIGVudGl0eUlkLCBzdG9yYWdlLCBjb21wb25lbnQpID0+IHtcbiAgICBjb25zdCBlbnRpdGllcyA9IHN0YXRlLmVudGl0aWVzO1xuICAgIGNvbnN0IGNvbXBvbmVudHMgPSBzdGF0ZS5jb21wb25lbnRzO1xuICAgIGNvbnN0IGNvbXBvbmVudFN0b3JhZ2UgPSBjb21wb25lbnRzW3N0b3JhZ2VdO1xuICAgIGNvbnN0IGVudGl0eSA9IGVudGl0aWVzLmdldChlbnRpdHlJZCk7XG4gICAgaWYgKCFlbnRpdHkpXG4gICAgICAgIHRocm93IEVycm9yKFwiQWRkIENvbXBvbmVudDogRW50aXR5IGRvZXMgbm90IGV4aXN0IVwiKTtcbiAgICBpZiAoIWNvbXBvbmVudFN0b3JhZ2UpXG4gICAgICAgIHRocm93IEVycm9yKFwiQWRkIENvbXBvbmVudDogTm8gcmVnaXN0ZXJlZCBjb21wb25lbnQgc3RvcmFnZSFcIik7XG4gICAgY29tcG9uZW50c1tzdG9yYWdlXS5zZXQoZW50aXR5SWQsIGNvbXBvbmVudCk7XG4gICAgZW50aXRpZXMuc2V0KGVudGl0eUlkLCBbLi4uZW50aXR5LCBzdG9yYWdlXSk7XG4gICAgc3RhdGUuZW50aXRpZXMgPSBlbnRpdGllcztcbiAgICBzdGF0ZS5jb21wb25lbnRzID0gY29tcG9uZW50cztcbiAgICByZXR1cm4gc3RhdGU7XG59O1xuZXhwb3J0IGNvbnN0IHJlbW92ZUNvbXBvbmVudCA9IChzdGF0ZSwgZW50aXR5SWQsIHN0b3JhZ2UpID0+IHtcbiAgICBjb25zdCBlbnRpdGllcyA9IHN0YXRlLmVudGl0aWVzO1xuICAgIGNvbnN0IGNvbXBvbmVudHMgPSBzdGF0ZS5jb21wb25lbnRzO1xuICAgIGNvbnN0IGNvbXBvbmVudFN0b3JhZ2UgPSBjb21wb25lbnRzW3N0b3JhZ2VdO1xuICAgIGNvbnN0IGVudGl0eSA9IGVudGl0aWVzLmdldChlbnRpdHlJZCk7XG4gICAgaWYgKCFlbnRpdHkpXG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAvL3Rocm93IEVycm9yKFwiUmVtb3ZlIENvbXBvbmVudDogRW50aXR5IGRvZXMgbm90IGV4aXN0IVwiKTtcbiAgICBpZiAoIWNvbXBvbmVudFN0b3JhZ2UpXG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAvLyB0aHJvdyBFcnJvcihcIlJlbW92ZSBDb21wb25lbnQ6IE5vIHJlZ2lzdGVyZWQgY29tcG9uZW50IHN0b3JhZ2UhXCIpO1xuICAgIGNvbXBvbmVudHNbc3RvcmFnZV0uZGVsZXRlKGVudGl0eUlkKTtcbiAgICBjb25zdCBlZGdlcyA9IGVudGl0eS5maWx0ZXIodiA9PiB2ICE9PSBzdG9yYWdlKTtcbiAgICBlbnRpdGllcy5zZXQoZW50aXR5SWQsIGVkZ2VzKTtcbiAgICBzdGF0ZS5lbnRpdGllcyA9IGVudGl0aWVzO1xuICAgIHN0YXRlLmNvbXBvbmVudHMgPSBjb21wb25lbnRzO1xuICAgIHJldHVybiBzdGF0ZTtcbn07XG5leHBvcnQgY29uc3QgcmVtb3ZlRW50aXR5ID0gKHN0YXRlLCBlbnRpdHlJZCkgPT4ge1xuICAgIGNvbnN0IGVudGl0aWVzID0gc3RhdGUuZW50aXRpZXM7XG4gICAgY29uc3QgY29tcG9uZW50cyA9IHN0YXRlLmNvbXBvbmVudHM7XG4gICAgY29uc3QgZW50aXR5ID0gZW50aXRpZXMuZ2V0KGVudGl0eUlkKTtcbiAgICBpZiAoIWVudGl0eSlcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIGNvbnN0IGNvbXBvbmVudExpc3QgPSBbLi4uZW50aXR5XTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbXBvbmVudExpc3QubGVuZ3RoOyBpKyspXG4gICAgICAgIHN0YXRlID0gcmVtb3ZlQ29tcG9uZW50KHN0YXRlLCBlbnRpdHlJZCwgY29tcG9uZW50TGlzdFtpXSk7XG4gICAgZW50aXRpZXMuZGVsZXRlKGVudGl0eUlkKTtcbiAgICBzdGF0ZS5lbnRpdGllcyA9IGVudGl0aWVzO1xuICAgIHN0YXRlLmNvbXBvbmVudHMgPSBjb21wb25lbnRzO1xuICAgIHJldHVybiBzdGF0ZTtcbn07XG47XG5leHBvcnQgY29uc3QgY3JlYXRlRUNTdGF0ZSA9IChnbCkgPT4ge1xuICAgIGNvbnN0IHN0YXRlID0gY3JlYXRlU3RhdGUoZ2wpO1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKSwgeyBlbnRpdGllczogbmV3IE1hcCgpLCBjb21wb25lbnRzOiB7fSB9KTtcbn07XG4iLCJpbXBvcnQgeyBWZWN0b3IzLCBNYXRyaXg0IH0gZnJvbSAnQG1hdGguZ2wvY29yZSc7XG5pbXBvcnQgeyByYWRpYW5zLCBtdWx0aXBseUFuZERlc3RydWN0VmVjdG9yMywgZnVuY3Rpb25hbENyb3NzVmVjdG9yMyB9IGZyb20gJy4uL2xpYi9tYXRoJztcbmV4cG9ydCBjb25zdCBwcm9qZWN0aW9uTWF0cml4ID0gKHcsIGgpID0+IChuZXcgTWF0cml4NCgpLnBlcnNwZWN0aXZlKHtcbiAgICBmb3Y6IDcwLFxuICAgIGZvdnk6IChNYXRoLlBJICogNzApIC8gMTgwLFxuICAgIGFzcGVjdDogd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgbmVhcjogMC4xLFxuICAgIGZhcjogMTAwMC4wXG59KSk7XG5leHBvcnQgY29uc3QgY3JlYXRlQ2FtZXJhID0gKGdsKSA9PiB7XG4gICAgY29uc3QgY2FtZXJhID0ge1xuICAgICAgICBwcm9qZWN0aW9uOiBwcm9qZWN0aW9uTWF0cml4KHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpLFxuICAgICAgICB2aWV3OiBuZXcgTWF0cml4NCgpLmlkZW50aXR5KCksXG4gICAgICAgIHBvc2l0aW9uOiBuZXcgVmVjdG9yMygwLCAwLCAxKSxcbiAgICAgICAgZGlyZWN0aW9uOiBuZXcgVmVjdG9yMygwLCAwLCAtMSksXG4gICAgICAgIHNwZWVkOiAxMCxcbiAgICAgICAgcGl0Y2g6IDAsXG4gICAgICAgIHlhdzogLTkwLjAsXG4gICAgICAgIC8vIGF0bGFzOiBsb2FkVGV4dHVyZShnbCwgYXRsYXNVcmwpLFxuICAgICAgICAvLyBhY3RpdmVJbnB1dDogbmV3IFNldDxzdHJpbmc+KClcbiAgICB9O1xuICAgIC8vIHVwZGF0ZUNhbWVyYShwbGF5ZXIpO1xuICAgIHdpbmRvdy5vbnJlc2l6ZSA9IG9uUmVzaXplKGdsLCBjYW1lcmEpO1xuICAgIHJldHVybiBjYW1lcmE7XG59O1xuY29uc3Qgb25SZXNpemUgPSAoZ2wsIGNhbWVyYSkgPT4gKCkgPT4ge1xuICAgIGNvbnN0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aCwgaCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICBnbC5jYW52YXMud2lkdGggPSB3O1xuICAgIGdsLmNhbnZhcy5oZWlnaHQgPSBoO1xuICAgIGdsLnZpZXdwb3J0KDAsIDAsIHcsIGgpO1xuICAgIGNhbWVyYS5wcm9qZWN0aW9uID0gcHJvamVjdGlvbk1hdHJpeCh3LCBoKTtcbn07XG5leHBvcnQgY29uc3QgcmVjYWxjdWxhdGVWaWV3ID0gKGNhbWVyYSkgPT4ge1xuICAgIGNvbnN0IHBvcyA9IGNhbWVyYS5wb3NpdGlvbjtcbiAgICBjb25zdCBkaXIgPSBjYW1lcmEuZGlyZWN0aW9uO1xuICAgIGNvbnN0IHBpdGNoID0gcmFkaWFucyhjYW1lcmEucGl0Y2gpO1xuICAgIGNvbnN0IHlhdyA9IHJhZGlhbnMoY2FtZXJhLnlhdyk7XG4gICAgZGlyLnggPSBNYXRoLmNvcyh5YXcpICogTWF0aC5jb3MocGl0Y2gpO1xuICAgIGRpci55ID0gTWF0aC5zaW4ocGl0Y2gpO1xuICAgIGRpci56ID0gTWF0aC5zaW4oeWF3KSAqIE1hdGguY29zKHBpdGNoKTtcbiAgICBjYW1lcmEudmlldy5sb29rQXQoW3Bvcy54LCBwb3MueSwgcG9zLnpdLCBbcG9zLnggKyBkaXIueCwgcG9zLnkgKyBkaXIueSwgcG9zLnogKyBkaXIuel0sIFswLCAxLjAsIDBdKTtcbiAgICByZXR1cm4gY2FtZXJhO1xufTtcbi8qXG5jb25zdCByYXlUcmFjZSA9IChlbnRpdGllczogRW50aXR5W10sIGNvbXBvbmVudHM6IENvbXBvbmVudHMsIHBsYXllcjogUGxheWVyKSA9PiAoc3RlcFZhbHVlOiBudW1iZXIsIG51bVN0ZXBzOiBudW1iZXIpID0+IChvbkhpdDogKHBvczogVmVjdG9yMykgPT4gdm9pZCkgPT4ge1xuXG4gIGNvbnN0IHN0ZXAgPSBtdWx0aXBseUFuZERlc3RydWN0VmVjdG9yMyhwbGF5ZXIuZGlyZWN0aW9uLCBzdGVwVmFsdWUpO1xuICBjb25zdCByYXkgPSBuZXcgVmVjdG9yMyhwbGF5ZXIucG9zaXRpb24ueCwgcGxheWVyLnBvc2l0aW9uLnksIHBsYXllci5wb3NpdGlvbi56KTtcblxuICBmb3IobGV0IGkgPSAwOyBpIDwgbnVtU3RlcHM7IGkrKykge1xuICAgIFxuICAgIGlmKGdldEJsb2NrKGVudGl0aWVzLCBjb21wb25lbnRzKShyYXkpICE9IDApIHtcbiAgICAgIG9uSGl0KHJheSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmF5LnggPSByYXkueCArIHN0ZXBbMF07XG4gICAgcmF5LnkgPSByYXkueSArIHN0ZXBbMV07XG4gICAgcmF5LnogPSByYXkueiArIHN0ZXBbMl07XG4gIH1cblxufTtcbiovXG5leHBvcnQgY29uc3QgZnJlZUNhbWVyYUlucHV0ID0gKGNhbWVyYSwgc3RhdGUsIGRlbHRhKSA9PiB7XG4gICAgY29uc3QgYWN0aXZlSW5wdXQgPSBzdGF0ZS5hY3RpdmVJbnB1dDtcbiAgICBjb25zdCBtb3VzZU1vdmVtZW50ID0gc3RhdGUubW91c2VNb3ZlbWVudDtcbiAgICBjb25zdCBsb2NrID0gc3RhdGUubG9jaztcbiAgICBpZiAoIWxvY2spXG4gICAgICAgIHJldHVybiBjYW1lcmE7XG4gICAgbGV0IHNwZWVkID0gY2FtZXJhLnNwZWVkO1xuICAgIGNvbnN0IHVwID0gbmV3IFZlY3RvcjMoMCwgMSwgMCk7XG4gICAgY29uc3QgbW92ZSA9IG11bHRpcGx5QW5kRGVzdHJ1Y3RWZWN0b3IzKGNhbWVyYS5kaXJlY3Rpb24sIHNwZWVkICogZGVsdGEpO1xuICAgIGNvbnN0IHN0cmFmZSA9IG11bHRpcGx5QW5kRGVzdHJ1Y3RWZWN0b3IzKGZ1bmN0aW9uYWxDcm9zc1ZlY3RvcjMoY2FtZXJhLmRpcmVjdGlvbiwgdXApLCBzcGVlZCAqIGRlbHRhKTtcbiAgICBpZiAoYWN0aXZlSW5wdXQuaGFzKFwid1wiKSlcbiAgICAgICAgY2FtZXJhLnBvc2l0aW9uLmFkZChtb3ZlKTtcbiAgICBpZiAoYWN0aXZlSW5wdXQuaGFzKFwic1wiKSlcbiAgICAgICAgY2FtZXJhLnBvc2l0aW9uLnN1YnRyYWN0KG1vdmUpO1xuICAgIGlmIChhY3RpdmVJbnB1dC5oYXMoXCJhXCIpKVxuICAgICAgICBjYW1lcmEucG9zaXRpb24uc3VidHJhY3Qoc3RyYWZlKTtcbiAgICBpZiAoYWN0aXZlSW5wdXQuaGFzKFwiZFwiKSlcbiAgICAgICAgY2FtZXJhLnBvc2l0aW9uLmFkZChzdHJhZmUpO1xuICAgIGlmIChhY3RpdmVJbnB1dC5oYXMoXCIgXCIpKVxuICAgICAgICBjYW1lcmEucG9zaXRpb24uYWRkKG11bHRpcGx5QW5kRGVzdHJ1Y3RWZWN0b3IzKHVwLCBkZWx0YSAqIHNwZWVkKSk7XG4gICAgaWYgKGFjdGl2ZUlucHV0LmhhcyhcInNoaWZ0XCIpKVxuICAgICAgICBjYW1lcmEucG9zaXRpb24uc3VidHJhY3QobXVsdGlwbHlBbmREZXN0cnVjdFZlY3RvcjModXAsIGRlbHRhICogc3BlZWQpKTtcbiAgICBjYW1lcmEueWF3ICs9IG1vdXNlTW92ZW1lbnRbMF07XG4gICAgY2FtZXJhLnBpdGNoIC09IG1vdXNlTW92ZW1lbnRbMV07XG4gICAgaWYgKGNhbWVyYS5waXRjaCA+IDg5LjApXG4gICAgICAgIGNhbWVyYS5waXRjaCA9IDg5LjA7XG4gICAgaWYgKGNhbWVyYS5waXRjaCA8IC04OS4wKVxuICAgICAgICBjYW1lcmEucGl0Y2ggPSAtODkuMDtcbiAgICByZXR1cm4gcmVjYWxjdWxhdGVWaWV3KGNhbWVyYSk7XG4gICAgLypcbiAgICBkb2N1bWVudC5vbmNsaWNrID0gKGUpID0+IHtcbiAgXG4gICAgICByYXlUcmFjZShlbnRpdGllcywgY29tcG9uZW50cywgcGxheWVyKSgwLjA1LCAxMDApKChwb3M6IFZlY3RvcjMpID0+IHtcbiAgICAgICAgc2V0QmxvY2soZW50aXRpZXMsIGNvbXBvbmVudHMpKHBvcywgMCk7XG4gICAgICAgIHVwZGF0ZUNodW5rKGdsLCBlbnRpdGllcywgY29tcG9uZW50cykocG9zKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAqL1xufTtcbiIsIi8vIHNvbWVob3cgbWFrZSBhIHByb2ZpbGVyIHRoYXQgY2FuIGdldCBlbGFwc2VkIHRpbWUgb3IgZnBzXG5leHBvcnQgY29uc3QgY3JlYXRlUHJvZmlsZXIgPSAoZGlzcGxheUZQUykgPT4ge1xuICAgIGNvbnN0IHByb2ZpbGVyID0ge1xuICAgICAgICBkZWx0YTogMCxcbiAgICAgICAgYWNjVGltZTogMCxcbiAgICAgICAgZnJhbWVzOiAwLFxuICAgIH07XG4gICAgaWYgKGRpc3BsYXlGUFMpXG4gICAgICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIC8vIGZyYW1lcyBwZXIgdGltZSBlbGFwc2VkXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9maWxlci5mcmFtZXMgLyBwcm9maWxlci5hY2NUaW1lKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHByb2ZpbGVyLmZyYW1lcyk7IC8vIGFjdHVhbCBudW1iZXIgb2YgZnJhbWVzIHBlciBzZWNvbmRcbiAgICAgICAgICAgIHByb2ZpbGVyLmZyYW1lcyA9IDA7XG4gICAgICAgICAgICBwcm9maWxlci5hY2NUaW1lID0gMDtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgcmV0dXJuIHByb2ZpbGVyO1xufTtcbmV4cG9ydCBjb25zdCB1cGRhdGVQcm9maWxlciA9IChwcm9maWxlciwgZGVsdGEpID0+IHtcbiAgICBwcm9maWxlci5hY2NUaW1lID0gcHJvZmlsZXIuYWNjVGltZSArIGRlbHRhO1xuICAgIHByb2ZpbGVyLmZyYW1lcyA9IHByb2ZpbGVyLmZyYW1lcyArIDE7XG4gICAgcHJvZmlsZXIuZGVsdGEgPSBkZWx0YTtcbiAgICByZXR1cm4gcHJvZmlsZXI7XG59O1xuZXhwb3J0IGNvbnN0IHN0YXJ0ID0gKHByb2ZpbGVyKSA9PiB7XG4gICAgcHJvZmlsZXIuZGVsdGEgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG4gICAgcmV0dXJuIHByb2ZpbGVyO1xufTtcbmV4cG9ydCBjb25zdCBlbmQgPSAocHJvZmlsZXIpID0+IHtcbiAgICBwcm9maWxlci5kZWx0YSA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKSAtIHByb2ZpbGVyLmRlbHRhO1xuICAgIHJldHVybiBwcm9maWxlcjtcbn07XG4iLCI7XG5leHBvcnQgY29uc3QgY3JlYXRlU3RhdGUgPSAoZ2wpID0+IHtcbiAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgc3lzdGVtczogbmV3IE1hcCgpLFxuICAgICAgICBhY3RpdmVJbnB1dDogbmV3IFNldCgpLFxuICAgICAgICBtb3VzZU1vdmVtZW50OiBbMCwgMF0sXG4gICAgICAgIHF1ZXVlOiBbXSxcbiAgICAgICAgbG9jazogZmFsc2UsXG4gICAgfTtcbiAgICByZXR1cm4gc3RhdGU7XG59O1xuZXhwb3J0IGNvbnN0IGFkZFN5c3RlbSA9IChzdGF0ZSwgdHlwZSwgc3lzdGVtKSA9PiB7XG4gICAgY29uc3Qgc3lzdGVtcyA9IHN0YXRlLnN5c3RlbXM7XG4gICAgY29uc3Qgc3lzdGVtQ29udGFpbmVyID0gc3lzdGVtcy5nZXQodHlwZSk7XG4gICAgaWYgKCFzeXN0ZW1Db250YWluZXIpIHtcbiAgICAgICAgc3lzdGVtcy5zZXQodHlwZSwgW3N5c3RlbV0pO1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICAgIHN5c3RlbUNvbnRhaW5lciA9PT0gbnVsbCB8fCBzeXN0ZW1Db250YWluZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHN5c3RlbUNvbnRhaW5lci5wdXNoKHN5c3RlbSk7XG4gICAgcmV0dXJuIHN0YXRlO1xufTtcbmV4cG9ydCBjb25zdCBkaXNwYXRjaCA9IChnbCwgc3RhdGUsIHR5cGUsIGRlbHRhKSA9PiAoZGF0YSkgPT4ge1xuICAgIGNvbnN0IHN5c3RlbXMgPSBzdGF0ZS5zeXN0ZW1zO1xuICAgIGNvbnN0IHN5c3RlbSA9IHN5c3RlbXMuZ2V0KHR5cGUpO1xuICAgIGlmICghc3lzdGVtKVxuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgLy90aHJvdyBFcnJvcihcIkRpc3BhdGNoOiBTeXN0ZW0gbm90IHJlZ2lzdGVyZWRcIik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzeXN0ZW0ubGVuZ3RoOyBpKyspXG4gICAgICAgIHN0YXRlID0gc3lzdGVtW2ldKGdsLCBzdGF0ZSwgZGVsdGEpKGRhdGEpO1xuICAgIHJldHVybiBzdGF0ZTtcbn07XG4vLyBuZWVkIHRvIGNyZWF0ZSBhZGRTeXN0ZW0gYW5kIHNlcGVyYXRlIGNvbXBvbmVudHMvZW50aXRpZXMgaW50byBhbm90aGVyIGZpbGVcbiIsImV4cG9ydCBjb25zdCBjcmVhdGVXaW5kb3cgPSAoKSA9PiB7XG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICBjYW52YXMuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICBjYW52YXMuc3R5bGUubWFyZ2luID0gXCJhdXRvXCI7XG4gICAgY2FudmFzLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGNhbnZhcy5yZXF1ZXN0UG9pbnRlckxvY2soKTtcbiAgICB9O1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKTtcbiAgICBjb25zdCBnbCA9IGNhbnZhcy5nZXRDb250ZXh0KFwid2ViZ2wyXCIpO1xuICAgIGlmICghZ2wpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIldlYmdsIGNvdWxkbid0IGluc3RhbmNpYXRlXCIpO1xuICAgIC8vIGJhYnkgYmx1ZSBjbGVhciBjb2xvciBmb3IgYSBiYXNpYyBza3lib3hcbiAgICAvLyBnbC5jbGVhckNvbG9yKDAuNTM3LCAwLjgxMSwgMC45NDEsIDEuMCk7XG4gICAgZ2wuY2xlYXJDb2xvcigxLjAsIDEuMCwgMS4wLCAxLjApO1xuICAgIGdsLmNsZWFyKGdsLkRFUFRIX0JVRkZFUl9CSVQgfCBnbC5DT0xPUl9CVUZGRVJfQklUKTtcbiAgICBnbC5lbmFibGUoZ2wuREVQVEhfVEVTVCk7XG4gICAgZ2wuZW5hYmxlKGdsLkNVTExfRkFDRSk7XG4gICAgZ2wuY3VsbEZhY2UoZ2wuQkFDSyk7XG4gICAgcmV0dXJuIGdsO1xufTtcbiIsImltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICdAbWF0aC5nbC9jb3JlJztcbmltcG9ydCB7IG5ld0VudGl0eSwgYWRkQ29tcG9uZW50LCByZW1vdmVFbnRpdHkgfSBmcm9tICcuLi8uLi9lbmdpbmUvZWMnO1xuaW1wb3J0IHsgY3JlYXRlQ2h1bmtSZW5kZXJPYmplY3QsIG5haXZlTWVzaGluZyB9IGZyb20gJy4vbWVzaCc7XG5pbXBvcnQgeyBjcmVhdGVCbG9ja0RpY3Rpb25hcnkgfSBmcm9tICcuLi9pbmRleCc7XG5pbXBvcnQgeyBnZW5lcmF0ZVN0cnVjdHVyZSwgZ2VuZXJhdGVCbG9jayB9IGZyb20gJy4uL2dlbmVyYXRpb24nO1xuZXhwb3J0IGNvbnN0IENodW5rRmFjdG9yeSA9IChnbCkgPT4gKHtcbiAgICBjaHVua1NpemU6IDgsXG4gICAgbG9hZERpc3RhbmNlOiAzLFxuICAgIGJsb2NrRGljdGlvbmFyeTogY3JlYXRlQmxvY2tEaWN0aW9uYXJ5KCksXG59KTtcbmV4cG9ydCBjb25zdCBjaHVua0lkID0gKHBvcykgPT4gKGBjaHUtJHtwb3NbMF19LSR7cG9zWzFdfS0ke3Bvc1syXX1gKTtcbmV4cG9ydCBjb25zdCBjaHVua1Bvc0Zyb21CbG9ja1BvcyA9IChjaHVua0ZhY3RvcnksIHBvcykgPT4gKG5ldyBWZWN0b3IzKE1hdGguZmxvb3IocG9zWzBdIC8gY2h1bmtGYWN0b3J5LmNodW5rU2l6ZSksIE1hdGguZmxvb3IocG9zWzFdIC8gY2h1bmtGYWN0b3J5LmNodW5rU2l6ZSksIE1hdGguZmxvb3IocG9zWzJdIC8gY2h1bmtGYWN0b3J5LmNodW5rU2l6ZSkpKTtcbmV4cG9ydCBjb25zdCBsb2NhbEJsb2NrUG9zVG9JbmRleCA9IChjaHVua0ZhY3RvcnksIHgsIHksIHopID0+IHtcbiAgICBjb25zdCBjaHVua1NpemUgPSBjaHVua0ZhY3RvcnkuY2h1bmtTaXplO1xuICAgIHJldHVybiAoeCArIHkgKiBjaHVua1NpemUgKyB6ICogY2h1bmtTaXplICogY2h1bmtTaXplKTtcbn07XG4vKiogU3RhcnQgRVhQT1NFRCBDSFVOSyBGVU5DVElPTlMgKiovXG4vLyBTWU5DSFJPTk9VU1xuZXhwb3J0IGNvbnN0IGxvYWRDaHVuayA9IChnbCwgc3RhdGUsIHBvcykgPT4ge1xuICAgIGNvbnN0IGVudGl0aWVzID0gc3RhdGUuZW50aXRpZXM7XG4gICAgY29uc3QgY29tcG9uZW50cyA9IHN0YXRlLmNvbXBvbmVudHM7XG4gICAgY29uc3QgY2h1bmtGYWN0b3J5ID0gc3RhdGUuY2h1bmtGYWN0b3J5O1xuICAgIGNvbnN0IGVudGl0eUlkID0gY2h1bmtJZChwb3MpO1xuICAgIGlmIChzdGF0ZS5lbnRpdGllcy5oYXMoZW50aXR5SWQpKVxuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgY29uc3QgZW50aXR5ID0gbmV3RW50aXR5KGVudGl0aWVzLCBlbnRpdHlJZCk7XG4gICAgY29uc3Qgc3RydWN0dXJlID0gZ2VuZXJhdGVTdHJ1Y3R1cmUoY2h1bmtGYWN0b3J5LCBwb3MpO1xuICAgIHN0YXRlID0gYWRkQ29tcG9uZW50KHN0YXRlLCBlbnRpdHlJZCwgXCJzdHJ1Y3R1cmVzXCIsIHN0cnVjdHVyZSk7XG4gICAgY29uc3QgcmVuZGVyT2JqZWN0ID0gYnVpbGRDaHVuayhnbCwgc3RhdGUsIHBvcyk7XG4gICAgc3RhdGUgPSBhZGRDb21wb25lbnQoc3RhdGUsIGVudGl0eUlkLCBcInJlbmRlck9iamVjdHNcIiwgcmVuZGVyT2JqZWN0KTtcbiAgICBzdGF0ZSA9IGFkZENvbXBvbmVudChzdGF0ZSwgZW50aXR5SWQsIFwiY2h1bmtQb3NcIiwgcG9zKTtcbiAgICByZXR1cm4gc3RhdGU7XG59O1xuLy8gQVNZTkNIUk9OT1VTXG5leHBvcnQgY29uc3QgbG9hZE1hbnlDaHVua3MgPSAoZ2wsIHN0YXRlLCBwb3MpID0+IHtcbiAgICBjb25zdCBlbnRpdGllcyA9IHN0YXRlLmVudGl0aWVzO1xuICAgIGNvbnN0IGNvbXBvbmVudHMgPSBzdGF0ZS5jb21wb25lbnRzO1xuICAgIGNvbnN0IHN0cnVjdHVyZXMgPSBjb21wb25lbnRzW1wic3RydWN0dXJlc1wiXTtcbiAgICBjb25zdCBjaHVua0ZhY3RvcnkgPSBzdGF0ZS5jaHVua0ZhY3Rvcnk7XG4gICAgbGV0IGFjdGl2ZVRocmVhZHMgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGVudGl0eUlkID0gY2h1bmtJZChwb3NbaV0pO1xuICAgICAgICBpZiAoc3RhdGUuZW50aXRpZXMuaGFzKGVudGl0eUlkKSlcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBjb25zdCBlbnRpdHkgPSBuZXdFbnRpdHkoZW50aXRpZXMsIGVudGl0eUlkKTtcbiAgICAgICAgY29uc3Qgc3RydWN0dXJlID0gZ2VuZXJhdGVTdHJ1Y3R1cmUoY2h1bmtGYWN0b3J5LCBwb3NbaV0pO1xuICAgICAgICBzdGF0ZSA9IGFkZENvbXBvbmVudChzdGF0ZSwgZW50aXR5SWQsIFwic3RydWN0dXJlc1wiLCBzdHJ1Y3R1cmUpO1xuICAgICAgICBzdGF0ZSA9IGFkZENvbXBvbmVudChzdGF0ZSwgZW50aXR5SWQsIFwiY2h1bmtQb3NcIiwgcG9zW2ldKTtcbiAgICAgICAgY29uc3Qgd29ya2VyID0gbmV3IFdvcmtlcihuZXcgVVJMKCcuLi93b3JrZXJzL21lc2hXb3JrZXIudHMnLCBpbXBvcnQubWV0YS51cmwpLCB7IHR5cGU6IFwibW9kdWxlXCIgfSk7XG4gICAgICAgIGFjdGl2ZVRocmVhZHMrKztcbiAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHsgY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBwb3M6IHBvc1tpXSB9KTtcbiAgICAgICAgd29ya2VyLm9ubWVzc2FnZSA9IChlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgQWN0aXZlIHRocmVhZHM6ICR7YWN0aXZlVGhyZWFkc31gKTtcbiAgICAgICAgICAgIGlmIChhY3RpdmVUaHJlYWRzID09IDEgJiYgc3RhdGUuaXNTdGFydHVwKSB7XG4gICAgICAgICAgICAgICAgLy8gZGlzYWJsZSBnZW5lcmF0aW5nIHRleHRcbiAgICAgICAgICAgICAgICBjb25zdCBzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnRyb1wiKTtcbiAgICAgICAgICAgICAgICBpZiAocylcbiAgICAgICAgICAgICAgICAgICAgcy5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHN0YXRlLmlzU3RhcnR1cCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWN0aXZlVGhyZWFkcy0tO1xuICAgICAgICAgICAgY29uc3QgcmVuZGVyT2JqZWN0ID0gY3JlYXRlQ2h1bmtSZW5kZXJPYmplY3QoZ2wsIHN0YXRlLnByb2dyYW0sIHN0YXRlLmNodW5rRmFjdG9yeSwgcG9zW2ldLCBlLmRhdGEpO1xuICAgICAgICAgICAgc3RhdGUgPSBhZGRDb21wb25lbnQoc3RhdGUsIGVudGl0eUlkLCBcInJlbmRlck9iamVjdHNcIiwgcmVuZGVyT2JqZWN0KTtcbiAgICAgICAgICAgIHdvcmtlci50ZXJtaW5hdGUoKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlO1xufTtcbi8vIEZJWE1FOiBkb24ndCBjcmVhdGUgYSBuZXcgVkFPIGV2ZXJ5IHRpbWUsIGp1c3QgdXBkYXRlIHRoZSBleGlzdGluZ1xuZXhwb3J0IGNvbnN0IHVwZGF0ZUNodW5rID0gKGdsLCBzdGF0ZSwgcG9zKSA9PiB7XG4gICAgY29uc3QgY2lkID0gY2h1bmtJZChwb3MpO1xuICAgIGNvbnN0IHJlbmRlck9iamVjdCA9IGJ1aWxkQ2h1bmsoZ2wsIHN0YXRlLCBwb3MpO1xuICAgIHN0YXRlID0gYWRkQ29tcG9uZW50KHN0YXRlLCBjaWQsIFwicmVuZGVyT2JqZWN0c1wiLCByZW5kZXJPYmplY3QpO1xuICAgIHJldHVybiBzdGF0ZTtcbn07XG5leHBvcnQgY29uc3QgdW5sb2FkQ2h1bmsgPSAoc3RhdGUsIHBvcykgPT4ge1xuICAgIGNvbnN0IGVudGl0eUlkID0gY2h1bmtJZChwb3MpO1xuICAgIGlmICghc3RhdGUuZW50aXRpZXMuaGFzKGVudGl0eUlkKSlcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIHJldHVybiByZW1vdmVFbnRpdHkoc3RhdGUsIGVudGl0eUlkKTtcbn07XG4vKiogRW5kIEVYUE9TRUQgQ0hVTksgRlVOQ1RJT05TICovXG4vLyBGSVhNRTogZG9lc24ndCBzZXQgdGhlIGJsb2NrIGlmIGl0J3Mgbm90IGxvYWRlZFxuZXhwb3J0IGNvbnN0IHNldEJsb2NrID0gKHN0YXRlLCBwb3MsIGJsb2NrSWQpID0+IHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3QgY2h1bmtTaXplID0gc3RhdGUuY2h1bmtGYWN0b3J5LmNodW5rU2l6ZTtcbiAgICBjb25zdCBibG9ja1BvcyA9IG5ldyBWZWN0b3IzKE1hdGguZmxvb3IocG9zWzBdKSwgTWF0aC5mbG9vcihwb3NbMV0pLCBNYXRoLmZsb29yKHBvc1syXSkpO1xuICAgIGNvbnN0IGxvY2FsUG9zID0gbmV3IFZlY3RvcjMoKChibG9ja1Bvc1swXSAlIGNodW5rU2l6ZSkgKyBjaHVua1NpemUpICUgY2h1bmtTaXplLCAoKGJsb2NrUG9zWzFdICUgY2h1bmtTaXplKSArIGNodW5rU2l6ZSkgJSBjaHVua1NpemUsICgoYmxvY2tQb3NbMl0gJSBjaHVua1NpemUpICsgY2h1bmtTaXplKSAlIGNodW5rU2l6ZSk7XG4gICAgY29uc3QgY2h1bmtQb3MgPSBjaHVua1Bvc0Zyb21CbG9ja1BvcyhzdGF0ZS5jaHVua0ZhY3RvcnksIGJsb2NrUG9zKTtcbiAgICBjb25zdCBjaHVua0VudGl0eSA9IGNodW5rSWQoY2h1bmtQb3MpO1xuICAgIGNvbnN0IHN0cnVjdHVyZSA9IChfYSA9IHN0YXRlLmNvbXBvbmVudHNbXCJzdHJ1Y3R1cmVzXCJdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0KGNodW5rRW50aXR5KTtcbiAgICAvLyBpZiBzdHJ1Y3R1cmUgZXhpc3RzIHNldCBibG9jayBhbmQgcmVwbGFjZSBpdFxuICAgIGlmIChzdHJ1Y3R1cmUpIHtcbiAgICAgICAgY29uc3QgdCA9IG5ldyBGbG9hdDY0QXJyYXkoc3RydWN0dXJlKTtcbiAgICAgICAgdFtsb2NhbEJsb2NrUG9zVG9JbmRleChzdGF0ZS5jaHVua0ZhY3RvcnksIGxvY2FsUG9zWzBdLCBsb2NhbFBvc1sxXSwgbG9jYWxQb3NbMl0pXSA9IGJsb2NrSWQ7XG4gICAgICAgIHN0YXRlID0gYWRkQ29tcG9uZW50KHN0YXRlLCBjaHVua0VudGl0eSwgXCJzdHJ1Y3R1cmVzXCIsIHN0cnVjdHVyZSk7XG4gICAgfVxuICAgIHJldHVybiBzdGF0ZTtcbn07XG4vLyBGSVhNRTogZG9lcyBub3Qgd29yayBmb3Igc29tZSByZWFzb25cbmV4cG9ydCBjb25zdCBnZXRCbG9jayA9IChjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHBvcykgPT4ge1xuICAgIGNvbnN0IGNodW5rU2l6ZSA9IGNodW5rRmFjdG9yeS5jaHVua1NpemU7XG4gICAgY29uc3QgYmxvY2tQb3MgPSBuZXcgVmVjdG9yMyhNYXRoLmZsb29yKHBvc1swXSksIE1hdGguZmxvb3IocG9zWzFdKSwgTWF0aC5mbG9vcihwb3NbMl0pKTtcbiAgICBjb25zdCBsb2NhbFBvcyA9IG5ldyBWZWN0b3IzKCgoYmxvY2tQb3NbMF0gJSBjaHVua1NpemUpICsgY2h1bmtTaXplKSAlIGNodW5rU2l6ZSwgKChibG9ja1Bvc1sxXSAlIGNodW5rU2l6ZSkgKyBjaHVua1NpemUpICUgY2h1bmtTaXplLCAoKGJsb2NrUG9zWzJdICUgY2h1bmtTaXplKSArIGNodW5rU2l6ZSkgJSBjaHVua1NpemUpO1xuICAgIGNvbnN0IGNodW5rUG9zID0gY2h1bmtQb3NGcm9tQmxvY2tQb3MoY2h1bmtGYWN0b3J5LCBibG9ja1Bvcyk7XG4gICAgLy9jb25zdCBjaHVua0VudGl0eSA9IGNodW5rSWQoY2h1bmtQb3MpO1xuICAgIGNvbnN0IGNodW5rRW50aXR5ID0gYGNodS0ke2NodW5rUG9zWzBdfS0ke2NodW5rUG9zWzFdfS0ke2NodW5rUG9zWzJdfWA7XG4gICAgY29uc3Qgc3RydWN0dXJlID0gc3RydWN0dXJlcy5nZXQoY2h1bmtFbnRpdHkpO1xuICAgIGlmIChzdHJ1Y3R1cmUpIHtcbiAgICAgICAgY29uc3QgdCA9IG5ldyBGbG9hdDY0QXJyYXkoc3RydWN0dXJlKTtcbiAgICAgICAgcmV0dXJuIHRbbG9jYWxCbG9ja1Bvc1RvSW5kZXgoY2h1bmtGYWN0b3J5LCBsb2NhbFBvc1swXSwgbG9jYWxQb3NbMV0sIGxvY2FsUG9zWzJdKV07XG4gICAgfVxuICAgIHJldHVybiBnZW5lcmF0ZUJsb2NrKGNodW5rRmFjdG9yeSwgcG9zKTtcbn07XG4vLyB1c2VkIGZvciB1cGRhdGluZy9tZXNoaW5nXG5jb25zdCBidWlsZENodW5rID0gKGdsLCBzdGF0ZSwgcG9zKSA9PiB7XG4gICAgY29uc3QgbWVzaCA9IG5haXZlTWVzaGluZyhzdGF0ZS5jaHVua0ZhY3RvcnksIHN0YXRlLmNvbXBvbmVudHNbXCJzdHJ1Y3R1cmVzXCJdLCBwb3MpO1xuICAgIGNvbnN0IHJlbmRlck9iamVjdCA9IGNyZWF0ZUNodW5rUmVuZGVyT2JqZWN0KGdsLCBzdGF0ZS5wcm9ncmFtLCBzdGF0ZS5jaHVua0ZhY3RvcnksIHBvcywgbWVzaCk7XG4gICAgcmV0dXJuIHJlbmRlck9iamVjdDtcbn07XG4iLCJpbXBvcnQgeyBWZWN0b3IzLCBNYXRyaXg0IH0gZnJvbSAnQG1hdGguZ2wvY29yZSc7XG5pbXBvcnQgeyBnZXRCbG9jayB9IGZyb20gJy4vY2h1bmsnO1xuZXhwb3J0IGNvbnN0IGNodW5rVmVydGV4U2hhZGVyID0gYCN2ZXJzaW9uIDMwMCBlc1xuICBpbiB2ZWMzIHZfUG9zaXRpb247XG4gIGluIHZlYzIgdXZfQ29vcmRzO1xuICBpbiBmbG9hdCBhb19Db29yZHM7XG5cbiAgdW5pZm9ybSBtYXQ0IHByb2plY3Rpb247XG4gIHVuaWZvcm0gbWF0NCB2aWV3O1xuICB1bmlmb3JtIG1hdDQgbW9kZWw7XG4gIFxuICBvdXQgZmxvYXQgYW87XG4gIG91dCB2ZWMzIGZvZ19kZXB0aDtcbiAgb3V0IHZlYzIgdGV4dF9jb29yZHM7XG4gIFxuICB2b2lkIG1haW4oKSB7XG4gICAgXG4gICAgdGV4dF9jb29yZHMgPSB1dl9Db29yZHM7XG4gICAgYW8gPSBhb19Db29yZHM7XG4gICAgXG4gICAgZm9nX2RlcHRoID0gKHZpZXcgKiBtb2RlbCAqIHZlYzQodl9Qb3NpdGlvbiwgMS4wKSkueHl6O1xuXG4gICAgZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uICogdmlldyAqIG1vZGVsICogdmVjNCh2X1Bvc2l0aW9uLCAxLjApO1xuICB9XG5gO1xuZXhwb3J0IGNvbnN0IGNodW5rRnJhZ21lbnRTaGFkZXIgPSBgI3ZlcnNpb24gMzAwIGVzXG4gIHByZWNpc2lvbiBoaWdocCBmbG9hdDtcbiAgXG4gIGluIHZlYzIgdGV4dF9jb29yZHM7XG4gIGluIGZsb2F0IGFvO1xuICBpbiB2ZWMzIGZvZ19kZXB0aDtcbiAgXG4gIHVuaWZvcm0gc2FtcGxlcjJEIHRleHR1cmVfYXRsYXM7XG4gIFxuICBvdXQgdmVjNCBmcmFnX2NvbG9yO1xuXG4gIHZvaWQgbWFpbigpIHtcbiAgICBcbiAgICBmbG9hdCBhb0ludGVuc2l0eSA9IGFvIC8gMi4wO1xuICAgIGZsb2F0IGRhcmtlbkFtb3VudCA9IDEuMCAvIChhb0ludGVuc2l0eSArIDEuMCk7XG4gICAgXG4gICAgdmVjNCBhdGxhcyA9IHRleHR1cmUodGV4dHVyZV9hdGxhcywgdGV4dF9jb29yZHMpO1xuXG4gICAgZmxvYXQgZm9nX25lYXIgPSAxOC4wO1xuICAgIGZsb2F0IGZvZ19mYXIgPSAyNC4wO1xuICAgIGZsb2F0IGZvZ19hbW91bnQgPSBzbW9vdGhzdGVwKGZvZ19uZWFyLCBmb2dfZmFyLCBsZW5ndGgoZm9nX2RlcHRoKSk7XG4gICAgdmVjNCBmb2dfY29sb3IgPSB2ZWM0KDEuMCk7XG5cbiAgICBmcmFnX2NvbG9yID0gbWl4KHZlYzQoZGFya2VuQW1vdW50ICogYXRsYXMueHl6LCBhdGxhcy53KSwgZm9nX2NvbG9yLCBmb2dfYW1vdW50KTtcbiAgfVxuYDtcbmV4cG9ydCBjb25zdCBjcmVhdGVDaHVua1JlbmRlck9iamVjdCA9IChnbCwgcHJvZ3JhbSwgY2h1bmtGYWN0b3J5LCBwb3MsIG1lc2gpID0+IHtcbiAgICBjb25zdCBjaHVua1NpemUgPSBjaHVua0ZhY3RvcnkuY2h1bmtTaXplO1xuICAgIGNvbnN0IHZhbyA9IGdsLmNyZWF0ZVZlcnRleEFycmF5KCk7XG4gICAgY29uc3QgdmJvID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgaWYgKCF2YW8pXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCBjcmVhdGluZyBWQU9cIik7XG4gICAgaWYgKCF2Ym8pXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCBjcmVhdGluZyBWQk9cIik7XG4gICAgZ2wuYmluZFZlcnRleEFycmF5KHZhbyk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHZibyk7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG1lc2gsIGdsLlNUQVRJQ19EUkFXKTtcbiAgICBjb25zdCB2ZXJ0ZXhTaXplID0gMztcbiAgICBjb25zdCB1dlNpemUgPSAyO1xuICAgIGNvbnN0IGFvU2l6ZSA9IDE7XG4gICAgY29uc3Qgc3RyaWRlID0gNCAqICh2ZXJ0ZXhTaXplICsgdXZTaXplICsgYW9TaXplKTtcbiAgICBjb25zdCB2ZXJ0ZXhPZmZzZXQgPSAwO1xuICAgIGNvbnN0IHV2T2Zmc2V0ID0gNCAqIDM7XG4gICAgY29uc3QgYW9PZmZzZXQgPSA0ICogNTtcbiAgICBjb25zdCBwb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgJ3ZfUG9zaXRpb24nKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24sIHZlcnRleFNpemUsIGdsLkZMT0FULCBmYWxzZSwgc3RyaWRlLCB2ZXJ0ZXhPZmZzZXQpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24pO1xuICAgIGNvbnN0IHV2QXR0cmlidXRlTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCAndXZfQ29vcmRzJyk7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcih1dkF0dHJpYnV0ZUxvY2F0aW9uLCB1dlNpemUsIGdsLkZMT0FULCBmYWxzZSwgc3RyaWRlLCB1dk9mZnNldCk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodXZBdHRyaWJ1dGVMb2NhdGlvbik7XG4gICAgY29uc3QgYW9BdHRyaWJ1dGVMb2NhdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sICdhb19Db29yZHMnKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGFvQXR0cmlidXRlTG9jYXRpb24sIGFvU2l6ZSwgZ2wuRkxPQVQsIGZhbHNlLCBzdHJpZGUsIGFvT2Zmc2V0KTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShhb0F0dHJpYnV0ZUxvY2F0aW9uKTtcbiAgICBjb25zdCBjb3VudCA9IG1lc2gubGVuZ3RoIC8gNjtcbiAgICBjb25zdCBtb2RlbCA9IG5ldyBNYXRyaXg0KCk7XG4gICAgbW9kZWwuaWRlbnRpdHkoKS50cmFuc2xhdGUoW3Bvcy54ICogY2h1bmtTaXplLCBwb3MueSAqIGNodW5rU2l6ZSwgcG9zLnogKiBjaHVua1NpemVdKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBsb2Q6IDAsXG4gICAgICAgIHZhbyxcbiAgICAgICAgcHJvZ3JhbSxcbiAgICAgICAgbW9kZWwsXG4gICAgICAgIHZlcnRleENvdW50OiBjb3VudCxcbiAgICAgICAgd2lyZWZyYW1lOiBmYWxzZVxuICAgIH07XG59O1xuLypcbmV4cG9ydCBjb25zdCB1cGRhdGVDaHVua1JlbmRlck9iamVjdCA9IChnbDogV2ViR0wyUmVuZGVyaW5nQ29udGV4dCwgcHJvZ3JhbTogV2ViR0xQcm9ncmFtKSA9PiAocHJldmlvdXM6IFN0YXRpY1JlbmRlck9iamVjdENvbXBvbmVudCwgbWVzaDogRmxvYXQzMkFycmF5KSA9PiB7XG5cbiAgY29uc3QgeyB2YW8sIHZibywgcHJvZ3JhbSwgbW9kZWwsIGNvdW50IH0gPSBwcmV2aW91cztcblxuICBnbC5iaW5kVmVydGV4QXJyYXkodmFvKTtcblxuICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdmJvKTtcbiAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG1lc2gsIGdsLlNUQVRJQ19EUkFXKTtcblxuICBwcmV2aW91cy5jb3VudCA9IG1lc2gubGVuZ3RoIC8gNTtcbn07XG4qL1xuZXhwb3J0IGNvbnN0IHN1bSA9IChhLCBiKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKFthWzBdICsgYlswXSwgYVsxXSArIGJbMV0sIGFbMl0gKyBiWzJdXSk7XG59O1xuZXhwb3J0IGNvbnN0IGNhbGN1bGF0ZUFPID0gKHNpZGUxLCBjb3JuZXIxLCBzaWRlMiwgY29ybmVyMiwgc2lkZTMsIGNvcm5lcjMsIHNpZGU0LCBjb3JuZXI0KSA9PiB7XG4gICAgbGV0IHYxID0gKHNpZGUxICYmIDEpICsgKHNpZGUyICYmIDEpICsgKGNvcm5lcjEgJiYgMSk7XG4gICAgbGV0IHYyID0gKHNpZGUyICYmIDEpICsgKHNpZGUzICYmIDEpICsgKGNvcm5lcjIgJiYgMSk7XG4gICAgbGV0IHYzID0gKHNpZGUzICYmIDEpICsgKHNpZGU0ICYmIDEpICsgKGNvcm5lcjMgJiYgMSk7XG4gICAgbGV0IHY0ID0gKHNpZGU0ICYmIDEpICsgKHNpZGUxICYmIDEpICsgKGNvcm5lcjQgJiYgMSk7XG4gICAgcmV0dXJuIFt2MSwgdjIsIHYzLCB2NF07XG59O1xuLy8gcGFzcyBpbiBhbGwgdGhlIGJsb2NrIGRhdGEgYW5kIHRoZW4gcmV0dXJuIHRoZSB2ZXJ0ZXggYXJyYXlcbi8vIEluIHRoZSBmdXR1cmUgbWF5IGltcGxlbWVudCBhIGdyZWVkeSBhbGdvcml0aG0gdG8gY3V0IGRvd24gb25cbi8vIHZlcnRleCBjb3VudFxuLy8gVGhpcyBzZXRzIHRoZSB2ZXJ0aWNlcy90ZXh0dXJlcy9hbWJpZW50IG9jY2x1c2lvblxuZXhwb3J0IGNvbnN0IG5haXZlTWVzaGluZyA9IChjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHBvcykgPT4ge1xuICAgIGNvbnN0IG91dHB1dCA9IFtdO1xuICAgIC8vY29uc29sZS5sb2coc3RydWN0dXJlcyk7XG4gICAgY29uc3QgY0lkID0gYGNodS0ke3Bvc1swXX0tJHtwb3NbMV19LSR7cG9zWzJdfWA7XG4gICAgLy9jb25zb2xlLmxvZyhjSWQpO1xuICAgIGNvbnN0IGNodW5rU2l6ZSA9IGNodW5rRmFjdG9yeS5jaHVua1NpemU7XG4gICAgY29uc3QgYmxvY2tTdHJ1Y3R1cmUgPSBzdHJ1Y3R1cmVzLmdldChjSWQpO1xuICAgIGlmICghYmxvY2tTdHJ1Y3R1cmUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBGbG9hdDMyQXJyYXkoKTtcbiAgICB9XG4gICAgY29uc3QgZGljdCA9IGNodW5rRmFjdG9yeS5ibG9ja0RpY3Rpb25hcnk7XG4gICAgY29uc3Qgc3RhcnRQb3MgPSBuZXcgVmVjdG9yMyhwb3NbMF0gKiBjaHVua1NpemUsIHBvc1sxXSAqIGNodW5rU2l6ZSwgcG9zWzJdICogY2h1bmtTaXplKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNodW5rU2l6ZTsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY2h1bmtTaXplOyBqKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgY2h1bmtTaXplOyBrKyspIHtcbiAgICAgICAgICAgICAgICAvL2lmKGkgPT0gMCAmJiBqID09IDAgJiYgayA9PSAwKVxuICAgICAgICAgICAgICAgIC8vICBjb25zb2xlLmxvZyhcIkRpZCB3ZSBnZXQgaGVyZT8gMVwiKVxuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2NrUG9zID0gc3VtKHN0YXJ0UG9zLCAoW2ksIGosIGtdKSk7XG4gICAgICAgICAgICAgICAgaWYgKGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgYmxvY2tQb3MpID09IDApXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGlmIChnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIGJsb2NrUG9zKSA9PSAwKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBibG9ja0lkID0gZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBibG9ja1Bvcyk7XG4gICAgICAgICAgICAgICAgY29uc3QgYmxvY2sgPSBkaWN0W2Jsb2NrSWRdO1xuICAgICAgICAgICAgICAgIGlmIChnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgKFsxLCAwLCAwXSkpKSA9PSAwKVxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCguLi5mdWxsQmxvY2tNZXNoLmVhc3RGYWNlKGksIGosIGssIGJsb2NrLnUsIGJsb2NrLnYsIGNhbGN1bGF0ZUFPKGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMSwgMSwgMF0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzEsIDEsIDFdKSksIC8vIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzEsIDAsIDFdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFsxLCAtMSwgMV0pKSwgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMSwgLTEsIDBdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFsxLCAtMSwgLTFdKSksIC8vIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzEsIDAsIC0xXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMSwgMSwgLTFdKSkgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgICkpKTtcbiAgICAgICAgICAgICAgICBpZiAoZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIChbLTEsIDAsIDBdKSkpID09IDApXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKC4uLmZ1bGxCbG9ja01lc2gud2VzdEZhY2UoaSwgaiwgaywgYmxvY2sudSwgYmxvY2sudiwgY2FsY3VsYXRlQU8oZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFstMSwgMSwgMF0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWy0xLCAxLCAxXSkpLCAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFstMSwgMCwgMV0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWy0xLCAtMSwgMV0pKSwgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbLTEsIC0xLCAwXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbLTEsIC0xLCAtMV0pKSwgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbLTEsIDAsIC0xXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbLTEsIDEsIC0xXSkpIC8vIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICApKSk7XG4gICAgICAgICAgICAgICAgaWYgKGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCAoWzAsIDEsIDBdKSkpID09IDApXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKC4uLmZ1bGxCbG9ja01lc2gudG9wRmFjZShpLCBqLCBrLCBibG9jay51LCBibG9jay52LCBjYWxjdWxhdGVBTyhnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzEsIDEsIDBdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFsxLCAxLCAxXSkpLCAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFswLCAxLCAxXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbLTEsIDEsIDFdKSksIC8vIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWy0xLCAxLCAwXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbLTEsIDEsIC0xXSkpLCAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFswLCAxLCAtMV0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzEsIDEsIC0xXSkpIC8vIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICApKSk7XG4gICAgICAgICAgICAgICAgaWYgKGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCAoWzAsIC0xLCAwXSkpKSA9PSAwKVxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCguLi5mdWxsQmxvY2tNZXNoLmJvdHRvbUZhY2UoaSwgaiwgaywgYmxvY2sudSwgYmxvY2sudiwgY2FsY3VsYXRlQU8oZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFsxLCAtMSwgMF0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzEsIC0xLCAxXSkpLCAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFswLCAtMSwgMV0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWy0xLCAtMSwgMV0pKSwgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbLTEsIC0xLCAwXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbLTEsIC0xLCAtMV0pKSwgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMCwgLTEsIC0xXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMSwgLTEsIC0xXSkpIC8vIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICApKSk7XG4gICAgICAgICAgICAgICAgaWYgKGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCAoWzAsIDAsIDFdKSkpID09IDApXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKC4uLmZ1bGxCbG9ja01lc2gubm9ydGhGYWNlKGksIGosIGssIGJsb2NrLnUsIGJsb2NrLnYsIGNhbGN1bGF0ZUFPKGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMSwgMCwgMV0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzEsIDEsIDFdKSksIC8vIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzAsIDEsIDFdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFstMSwgMSwgMV0pKSwgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbLTEsIDAsIDFdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFstMSwgLTEsIDFdKSksIC8vIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzAsIC0xLCAxXSkpLCAvLyBzaWRlXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMSwgLTEsIDFdKSkgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgICkpKTtcbiAgICAgICAgICAgICAgICBpZiAoZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIChbMCwgMCwgLTFdKSkpID09IDApXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKC4uLmZ1bGxCbG9ja01lc2guc291dGhGYWNlKGksIGosIGssIGJsb2NrLnUsIGJsb2NrLnYsIGNhbGN1bGF0ZUFPKGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMSwgMCwgLTFdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFsxLCAxLCAtMV0pKSwgLy8gY29ybmVyXG4gICAgICAgICAgICAgICAgICAgIGdldEJsb2NrKGNodW5rRmFjdG9yeSwgc3RydWN0dXJlcywgc3VtKGJsb2NrUG9zLCBbMCwgMSwgLTFdKSksIC8vIHNpZGVcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmxvY2soY2h1bmtGYWN0b3J5LCBzdHJ1Y3R1cmVzLCBzdW0oYmxvY2tQb3MsIFstMSwgMSwgLTFdKSksIC8vIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWy0xLCAwLCAtMV0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWy0xLCAtMSwgLTFdKSksIC8vIGNvcm5lclxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzAsIC0xLCAtMV0pKSwgLy8gc2lkZVxuICAgICAgICAgICAgICAgICAgICBnZXRCbG9jayhjaHVua0ZhY3RvcnksIHN0cnVjdHVyZXMsIHN1bShibG9ja1BvcywgWzEsIC0xLCAtMV0pKSAvLyBjb3JuZXJcbiAgICAgICAgICAgICAgICAgICAgKSkpO1xuICAgICAgICAgICAgICAgIC8vIHNraXAgb3ZlciBzcGVjaWFsIGJsb2NrcyBmb3Igbm93XG4gICAgICAgICAgICAgICAgLy8gaWYoYmxvY2sudHlwZSAhPSAnZnVsbEJsb2NrJyB8fCBibG9jay50eXBlID09ICdub25lJylcbiAgICAgICAgICAgICAgICAvLyAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9jb25zb2xlLmxvZyhcIkluIG1lc2hpbmdcIik7XG4gICAgLy9jb25zb2xlLmxvZyhvdXRwdXQpO1xuICAgIHJldHVybiBuZXcgRmxvYXQzMkFycmF5KG91dHB1dCk7XG59O1xuLy8gdGV4dHVyZSBvZmZzZXRzIHNvIHRoYXQgdGhlcmUgYXJlIG5vIGJvcmRlcnMgZnJvbSBob3cgc2FtcGxpbmcgdGhlIHRleHR1cmVcbmNvbnN0IHRleHR1cmVXaWR0aE9mZnNldCA9IDAuMDYyNTtcbmNvbnN0IHRleHR1cmVXaWR0aFN0YXJ0ID0gMC4wMDtcbi8vIFRPRE86IHJlcGxhY2UgdGV4dHVyZVdpZHRoT2Zmc2V0IHdpdGggdGV4ZWwgZGltZW5zaW9uc1xuZXhwb3J0IGNvbnN0IGZ1bGxCbG9ja01lc2ggPSB7XG4gICAgc291dGhGYWNlOiAoeCwgeSwgeiwgdSwgdiwgYW8pID0+IChbXG4gICAgICAgIDAuMCArIHgsIDAuMCArIHksIDAuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhTdGFydCwgdiArIHRleHR1cmVXaWR0aFN0YXJ0LCBhb1syXSxcbiAgICAgICAgMS4wICsgeCwgMS4wICsgeSwgMC4wICsgeiwgdSArIHRleHR1cmVXaWR0aE9mZnNldCwgdiArIHRleHR1cmVXaWR0aE9mZnNldCwgYW9bMF0sXG4gICAgICAgIDEuMCArIHgsIDAuMCArIHksIDAuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIHYgKyB0ZXh0dXJlV2lkdGhTdGFydCwgYW9bM10sXG4gICAgICAgIDAuMCArIHgsIDAuMCArIHksIDAuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhTdGFydCwgdiArIHRleHR1cmVXaWR0aFN0YXJ0LCBhb1syXSxcbiAgICAgICAgMC4wICsgeCwgMS4wICsgeSwgMC4wICsgeiwgdSArIHRleHR1cmVXaWR0aFN0YXJ0LCB2ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCBhb1sxXSxcbiAgICAgICAgMS4wICsgeCwgMS4wICsgeSwgMC4wICsgeiwgdSArIHRleHR1cmVXaWR0aE9mZnNldCwgdiArIHRleHR1cmVXaWR0aE9mZnNldCwgYW9bMF1cbiAgICBdKSxcbiAgICBub3J0aEZhY2U6ICh4LCB5LCB6LCB1LCB2LCBhbykgPT4gKFtcbiAgICAgICAgMC4wICsgeCwgMC4wICsgeSwgMS4wICsgeiwgdSArIHRleHR1cmVXaWR0aFN0YXJ0LCB2ICsgdGV4dHVyZVdpZHRoU3RhcnQsIGFvWzJdLFxuICAgICAgICAxLjAgKyB4LCAwLjAgKyB5LCAxLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoU3RhcnQsIHYgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIGFvWzNdLFxuICAgICAgICAxLjAgKyB4LCAxLjAgKyB5LCAxLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCB2ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCBhb1swXSxcbiAgICAgICAgMC4wICsgeCwgMC4wICsgeSwgMS4wICsgeiwgdSArIHRleHR1cmVXaWR0aFN0YXJ0LCB2ICsgdGV4dHVyZVdpZHRoU3RhcnQsIGFvWzJdLFxuICAgICAgICAxLjAgKyB4LCAxLjAgKyB5LCAxLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCB2ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCBhb1swXSxcbiAgICAgICAgMC4wICsgeCwgMS4wICsgeSwgMS4wICsgeiwgdSArIHRleHR1cmVXaWR0aFN0YXJ0LCB2ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCBhb1sxXVxuICAgIF0pLFxuICAgIHdlc3RGYWNlOiAoeCwgeSwgeiwgdSwgdiwgYW8pID0+IChbXG4gICAgICAgIDAuMCArIHgsIDAuMCArIHksIDAuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhTdGFydCwgdiArIHRleHR1cmVXaWR0aFN0YXJ0LCBhb1syXSxcbiAgICAgICAgMC4wICsgeCwgMC4wICsgeSwgMS4wICsgeiwgdSArIHRleHR1cmVXaWR0aFN0YXJ0LCB2ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCBhb1sxXSxcbiAgICAgICAgMC4wICsgeCwgMS4wICsgeSwgMS4wICsgeiwgdSArIHRleHR1cmVXaWR0aE9mZnNldCwgdiArIHRleHR1cmVXaWR0aE9mZnNldCwgYW9bMF0sXG4gICAgICAgIDAuMCArIHgsIDAuMCArIHksIDAuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhTdGFydCwgdiArIHRleHR1cmVXaWR0aFN0YXJ0LCBhb1syXSxcbiAgICAgICAgMC4wICsgeCwgMS4wICsgeSwgMS4wICsgeiwgdSArIHRleHR1cmVXaWR0aE9mZnNldCwgdiArIHRleHR1cmVXaWR0aE9mZnNldCwgYW9bMF0sXG4gICAgICAgIDAuMCArIHgsIDEuMCArIHksIDAuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIHYgKyB0ZXh0dXJlV2lkdGhTdGFydCwgYW9bM11cbiAgICBdKSxcbiAgICBlYXN0RmFjZTogKHgsIHksIHosIHUsIHYsIGFvKSA9PiAoW1xuICAgICAgICAxLjAgKyB4LCAwLjAgKyB5LCAwLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoU3RhcnQsIHYgKyB0ZXh0dXJlV2lkdGhTdGFydCwgYW9bMl0sXG4gICAgICAgIDEuMCArIHgsIDEuMCArIHksIDAuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIHYgKyB0ZXh0dXJlV2lkdGhTdGFydCwgYW9bM10sXG4gICAgICAgIDEuMCArIHgsIDEuMCArIHksIDEuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIHYgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIGFvWzBdLFxuICAgICAgICAxLjAgKyB4LCAwLjAgKyB5LCAwLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoU3RhcnQsIHYgKyB0ZXh0dXJlV2lkdGhTdGFydCwgYW9bMl0sXG4gICAgICAgIDEuMCArIHgsIDEuMCArIHksIDEuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIHYgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIGFvWzBdLFxuICAgICAgICAxLjAgKyB4LCAwLjAgKyB5LCAxLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoU3RhcnQsIHYgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIGFvWzFdXG4gICAgXSksXG4gICAgdG9wRmFjZTogKHgsIHksIHosIHUsIHYsIGFvKSA9PiAoW1xuICAgICAgICAwLjAgKyB4LCAxLjAgKyB5LCAwLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoU3RhcnQsIHYgKyB0ZXh0dXJlV2lkdGhTdGFydCwgYW9bMl0sXG4gICAgICAgIDEuMCArIHgsIDEuMCArIHksIDEuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIHYgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIGFvWzBdLFxuICAgICAgICAxLjAgKyB4LCAxLjAgKyB5LCAwLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoT2Zmc2V0LCB2ICsgdGV4dHVyZVdpZHRoU3RhcnQsIGFvWzNdLFxuICAgICAgICAwLjAgKyB4LCAxLjAgKyB5LCAwLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoU3RhcnQsIHYgKyB0ZXh0dXJlV2lkdGhTdGFydCwgYW9bMl0sXG4gICAgICAgIDAuMCArIHgsIDEuMCArIHksIDEuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhTdGFydCwgdiArIHRleHR1cmVXaWR0aE9mZnNldCwgYW9bMV0sXG4gICAgICAgIDEuMCArIHgsIDEuMCArIHksIDEuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIHYgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIGFvWzBdIC8vIGFvWzNdXG4gICAgXSksXG4gICAgYm90dG9tRmFjZTogKHgsIHksIHosIHUsIHYsIGFvKSA9PiAoW1xuICAgICAgICAwLjAgKyB4LCAwLjAgKyB5LCAwLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoU3RhcnQsIHYgKyB0ZXh0dXJlV2lkdGhTdGFydCwgYW9bMl0sXG4gICAgICAgIDEuMCArIHgsIDAuMCArIHksIDAuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIHYgKyB0ZXh0dXJlV2lkdGhTdGFydCwgYW9bM10sXG4gICAgICAgIDEuMCArIHgsIDAuMCArIHksIDEuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIHYgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIGFvWzBdLFxuICAgICAgICAwLjAgKyB4LCAwLjAgKyB5LCAwLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoU3RhcnQsIHYgKyB0ZXh0dXJlV2lkdGhTdGFydCwgYW9bMl0sXG4gICAgICAgIDEuMCArIHgsIDAuMCArIHksIDEuMCArIHosIHUgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIHYgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIGFvWzBdLFxuICAgICAgICAwLjAgKyB4LCAwLjAgKyB5LCAxLjAgKyB6LCB1ICsgdGV4dHVyZVdpZHRoU3RhcnQsIHYgKyB0ZXh0dXJlV2lkdGhPZmZzZXQsIGFvWzFdXG4gICAgXSksXG59O1xuIiwiaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gXCJAbWF0aC5nbC9jb3JlXCI7XG5pbXBvcnQgeyBjaHVua0lkLCBsb2NhbEJsb2NrUG9zVG9JbmRleCB9IGZyb20gXCIuL2NodW5rL2NodW5rXCI7XG5pbXBvcnQgU2ltcGxleE5vaXNlIGZyb20gXCJzaW1wbGV4LW5vaXNlXCI7XG4vLyBjb3B5IHNvbWUgbm9pc2UgY29kZVxuZXhwb3J0IGNvbnN0IG5vaXNlID0gKHgsIHkpID0+IHtcbiAgICByZXR1cm4gMC41O1xufTtcbmV4cG9ydCBjb25zdCBnZW5lcmF0ZUJsb2NrID0gKGNodW5rRmFjdG9yeSwgcG9zKSA9PiB7XG4gICAgY29uc3QgbiA9IG5ldyBTaW1wbGV4Tm9pc2UoXCJ0ZXN0XCIpO1xuICAgIGNvbnN0IGNodW5rU2l6ZSA9IGNodW5rRmFjdG9yeS5jaHVua1NpemU7XG4gICAgY29uc3QgYmFzZUhlaWdodCA9IGNodW5rU2l6ZSAvIDI7XG4gICAgY29uc3Qgd2F2ZWxlbmd0aCA9IGNodW5rU2l6ZSAqIDI7XG4gICAgY29uc3QgaGVpZ2h0ID0gY2h1bmtTaXplIC8gNDtcbiAgICAvLyBjaGVjayBmb3IgYWxyZWFkeSBsb2FkZWQgY2h1bmtzXG4gICAgY29uc3QgaCA9IGJhc2VIZWlnaHQgKyBoZWlnaHQgKiBuLm5vaXNlMkQocG9zWzBdIC8gd2F2ZWxlbmd0aCwgcG9zWzJdIC8gd2F2ZWxlbmd0aCk7XG4gICAgY29uc3QgcmFuID0gbi5ub2lzZTNEKHBvc1swXSAvIHdhdmVsZW5ndGgsIHBvc1sxXSAvIHdhdmVsZW5ndGgsIHBvc1syXSAvIHdhdmVsZW5ndGgpO1xuICAgIGlmIChwb3NbMV0gPCBoICYmIHJhbiA8IDAuNCkge1xuICAgICAgICBpZiAocG9zWzFdID09IGggLSAxKVxuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIGlmIChwb3NbMV0gPiBoIC0gMylcbiAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICByZXR1cm4gMztcbiAgICB9XG4gICAgaWYgKHBvc1sxXSA+IDQgKiBoKVxuICAgICAgICByZXR1cm4gMztcbiAgICByZXR1cm4gMDtcbn07XG5leHBvcnQgY29uc3QgZ2VuZXJhdGVTdHJ1Y3R1cmUgPSAoY2h1bmtGYWN0b3J5LCBwb3MpID0+IHtcbiAgICBjb25zdCBvdXRwdXQgPSBuZXcgU2hhcmVkQXJyYXlCdWZmZXIoOCAqIChNYXRoLnBvdyhjaHVua0ZhY3RvcnkuY2h1bmtTaXplLCAzKSkpO1xuICAgIGNvbnN0IHQgPSBuZXcgRmxvYXQ2NEFycmF5KG91dHB1dCk7XG4gICAgY29uc3QgZW50aXR5SWQgPSBjaHVua0lkKHBvcyk7XG4gICAgY29uc3QgY2h1bmtTaXplID0gY2h1bmtGYWN0b3J5LmNodW5rU2l6ZTtcbiAgICBjb25zdCBibG9ja1BvcyA9IG5ldyBWZWN0b3IzKHBvc1swXSAqIGNodW5rU2l6ZSwgcG9zWzFdICogY2h1bmtTaXplLCBwb3NbMl0gKiBjaHVua1NpemUpO1xuICAgIC8vIHNldCB0aGUgYmxvY2tzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaHVua1NpemU7IGkrKykgeyAvLyB4XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY2h1bmtTaXplOyBqKyspIHsgLy8geVxuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBjaHVua1NpemU7IGsrKykgeyAvLyB6XG4gICAgICAgICAgICAgICAgY29uc3QgZ3ggPSBibG9ja1Bvc1swXSArIGk7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3kgPSBibG9ja1Bvc1sxXSArIGo7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3ogPSBibG9ja1Bvc1syXSArIGs7XG4gICAgICAgICAgICAgICAgY29uc3QgbCA9IGxvY2FsQmxvY2tQb3NUb0luZGV4KGNodW5rRmFjdG9yeSwgaSwgaiwgayk7XG4gICAgICAgICAgICAgICAgdFtsXSA9IGdlbmVyYXRlQmxvY2soY2h1bmtGYWN0b3J5LCBuZXcgVmVjdG9yMyhneCwgZ3ksIGd6KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn07XG4iLCJpbXBvcnQgeyBhZGRTeXN0ZW0gfSBmcm9tICcuLi9lbmdpbmUvc3RhdGUnO1xuaW1wb3J0IHsgY3JlYXRlRUNTdGF0ZSwgcmVnaXN0ZXJDb21wb25lbnQgfSBmcm9tICcuLi9lbmdpbmUvZWMnO1xuaW1wb3J0IHsgYmxvY2tJbnB1dCwgY2FtZXJhSW5wdXQsIGNoZWNrQ2h1bmtDaGFuZ2UsIHJlbmRlclNlbGVjdGlvbkJveCB9IGZyb20gJy4vc3lzdGVtcy9pbnB1dCc7XG5pbXBvcnQgeyBsb2FkQ2h1bmtzLCB1bmxvYWRDaHVua3MgfSBmcm9tICcuL3N5c3RlbXMvd29ybGQnO1xuaW1wb3J0IHsgcmVuZGVyQ2h1bmtzIH0gZnJvbSAnLi9zeXN0ZW1zL2NodW5rJztcbmltcG9ydCB7IGNyZWF0ZVBsYXllciB9IGZyb20gJy4vcGxheWVyJztcbmltcG9ydCB7IENodW5rRmFjdG9yeSB9IGZyb20gJy4vY2h1bmsvY2h1bmsnO1xuaW1wb3J0IHsgY2h1bmtWZXJ0ZXhTaGFkZXIsIGNodW5rRnJhZ21lbnRTaGFkZXIgfSBmcm9tICcuL2NodW5rL21lc2gnO1xuaW1wb3J0IHsgaW5pdFNoYWRlcnMgfSBmcm9tICcuL3JlbmRlcic7XG5pbXBvcnQgeyBsb2FkVGV4dHVyZSB9IGZyb20gJy4vcmVuZGVyJztcbjtcbmV4cG9ydCBjb25zdCBpbml0ID0gKGdsKSA9PiB7XG4gICAgbGV0IHN0YXRlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBjcmVhdGVFQ1N0YXRlKGdsKSksIHsgcGxheWVyOiBjcmVhdGVQbGF5ZXIoZ2wpLCBjaHVua0ZhY3Rvcnk6IENodW5rRmFjdG9yeShnbCksIGJsb2NrRGljdGlvbmFyeTogY3JlYXRlQmxvY2tEaWN0aW9uYXJ5KCksIGF0bGFzOiBsb2FkVGV4dHVyZShnbCwgXCJhdGxhcy5wbmdcIiksIHByb2dyYW06IGluaXRTaGFkZXJzKGdsLCBjaHVua1ZlcnRleFNoYWRlciwgY2h1bmtGcmFnbWVudFNoYWRlciksIGlzU3RhcnR1cDogdHJ1ZSB9KTtcbiAgICBzdGF0ZS5jb21wb25lbnRzID0gcmVnaXN0ZXJDb21wb25lbnQoc3RhdGUuY29tcG9uZW50cywgXCJyZW5kZXJPYmplY3RzXCIpO1xuICAgIHN0YXRlLmNvbXBvbmVudHMgPSByZWdpc3RlckNvbXBvbmVudChzdGF0ZS5jb21wb25lbnRzLCBcInN0cnVjdHVyZXNcIik7XG4gICAgc3RhdGUuY29tcG9uZW50cyA9IHJlZ2lzdGVyQ29tcG9uZW50KHN0YXRlLmNvbXBvbmVudHMsIFwiY2h1bmtQb3NcIik7XG4gICAgLy8gc3lzdGVtc1xuICAgIHN0YXRlID0gYWRkU3lzdGVtKHN0YXRlLCBcInBsYXllckNoYW5nZUNodW5rXCIsIHVubG9hZENodW5rcyk7XG4gICAgc3RhdGUgPSBhZGRTeXN0ZW0oc3RhdGUsIFwicGxheWVyQ2hhbmdlQ2h1bmtcIiwgbG9hZENodW5rcyk7XG4gICAgc3RhdGUgPSBhZGRTeXN0ZW0oc3RhdGUsIFwiaW5wdXRcIiwgY2FtZXJhSW5wdXQpO1xuICAgIHN0YXRlID0gYWRkU3lzdGVtKHN0YXRlLCBcImlucHV0XCIsIGNoZWNrQ2h1bmtDaGFuZ2UpO1xuICAgIHN0YXRlID0gYWRkU3lzdGVtKHN0YXRlLCBcImNsaWNrXCIsIGJsb2NrSW5wdXQpO1xuICAgIHN0YXRlID0gYWRkU3lzdGVtKHN0YXRlLCBcInJlbmRlclwiLCByZW5kZXJTZWxlY3Rpb25Cb3gpO1xuICAgIHN0YXRlID0gYWRkU3lzdGVtKHN0YXRlLCBcInJlbmRlclwiLCByZW5kZXJDaHVua3MpO1xuICAgIHJldHVybiBzdGF0ZTtcbn07XG5leHBvcnQgY29uc3QgY3JlYXRlQmxvY2tEaWN0aW9uYXJ5ID0gKCkgPT4gKFtcbiAgICB7XG4gICAgICAgIG5hbWU6ICdhaXInLFxuICAgICAgICB0eXBlOiAnYWlyJyxcbiAgICAgICAgdTogMCxcbiAgICAgICAgdjogMFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZGlydCcsXG4gICAgICAgIHR5cGU6ICdmdWxsQmxvY2snLFxuICAgICAgICB1OiAwLjEyNSxcbiAgICAgICAgdjogMFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZ3Jhc3MnLFxuICAgICAgICB0eXBlOiAnZnVsbEJsb2NrJyxcbiAgICAgICAgdTogMC4wLFxuICAgICAgICB2OiAwXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdzdG9uZScsXG4gICAgICAgIHR5cGU6ICdmdWxsQmxvY2snLFxuICAgICAgICB1OiAwLjA2MjUsXG4gICAgICAgIHY6IDBcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3dvb2QnLFxuICAgICAgICB0eXBlOiAnZnVsbEJsb2NrJyxcbiAgICAgICAgdTogMC4yNTAsXG4gICAgICAgIHY6IDBcbiAgICB9LFxuXSk7XG4iLCJpbXBvcnQgeyBnZXRCbG9jayB9IGZyb20gXCIuL2NodW5rL2NodW5rXCI7XG5pbXBvcnQgeyBNYXRyaXg0LCBWZWN0b3IzIH0gZnJvbSBcIkBtYXRoLmdsL2NvcmVcIjtcbmltcG9ydCB7IGNyZWF0ZUNhbWVyYSB9IGZyb20gJy4uL2VuZ2luZS9mcmVlQ2FtZXJhJztcbmltcG9ydCB7IGluaXRTaGFkZXJzIH0gZnJvbSBcIi4vcmVuZGVyXCI7XG47XG47XG5leHBvcnQgY29uc3QgY3JlYXRlUGxheWVyID0gKGdsKSA9PiB7XG4gICAgY29uc3QgY2FtZXJhID0gY3JlYXRlQ2FtZXJhKGdsKTtcbiAgICBjYW1lcmEucG9zaXRpb24gPSBuZXcgVmVjdG9yMygwLCAxMCwgMCk7XG4gICAgcmV0dXJuIChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oeyByYXlTdGVwOiAwLjEsIHJheU1heExlbmd0aDogNSB9LCBjYW1lcmEpLCB7IHNlbGVjdGlvbkJveDogY3JlYXRlU2VsZWN0aW9uQm94KGdsKSwgcHJldmlvdXNQb3NpdGlvbjogbmV3IFZlY3RvcjMoLTEsIC0xLCAtMSkgfSkpO1xufTtcbjtcbmNvbnN0IGNyZWF0ZVNlbGVjdGlvbkJveCA9IChnbCkgPT4ge1xuICAgIGNvbnN0IHByb2dyYW0gPSBpbml0U2hhZGVycyhnbCwgYm94VmVydGV4U2hhZGVyLCBib3hGcmFnbWVudFNoYWRlcik7XG4gICAgY29uc3QgbWVzaCA9IG5ldyBGbG9hdDMyQXJyYXkoW1xuICAgICAgICAwLjAsIDAuMCwgMC4wLFxuICAgICAgICAwLjAsIDEuMCwgMC4wLFxuICAgICAgICAwLjAsIDAuMCwgMC4wLFxuICAgICAgICAxLjAsIDAuMCwgMC4wLFxuICAgICAgICAwLjAsIDAuMCwgMC4wLFxuICAgICAgICAwLjAsIDAuMCwgMS4wLFxuICAgICAgICAxLjAsIDEuMCwgMS4wLFxuICAgICAgICAwLjAsIDEuMCwgMS4wLFxuICAgICAgICAxLjAsIDEuMCwgMS4wLFxuICAgICAgICAxLjAsIDAuMCwgMS4wLFxuICAgICAgICAxLjAsIDEuMCwgMS4wLFxuICAgICAgICAxLjAsIDEuMCwgMC4wLFxuICAgICAgICAwLjAsIDEuMCwgMC4wLFxuICAgICAgICAwLjAsIDEuMCwgMS4wLFxuICAgICAgICAxLjAsIDAuMCwgMC4wLFxuICAgICAgICAxLjAsIDAuMCwgMS4wLFxuICAgICAgICAwLjAsIDAuMCwgMS4wLFxuICAgICAgICAxLjAsIDAuMCwgMS4wLFxuICAgICAgICAwLjAsIDEuMCwgMC4wLFxuICAgICAgICAxLjAsIDEuMCwgMC4wLFxuICAgICAgICAxLjAsIDAuMCwgMC4wLFxuICAgICAgICAxLjAsIDEuMCwgMC4wLFxuICAgICAgICAwLjAsIDAuMCwgMS4wLFxuICAgICAgICAwLjAsIDEuMCwgMS4wLFxuICAgIF0pO1xuICAgIGNvbnN0IHZhbyA9IGdsLmNyZWF0ZVZlcnRleEFycmF5KCk7XG4gICAgY29uc3QgdmJvID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgaWYgKCF2YW8pXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCBjcmVhdGluZyBWQU9cIik7XG4gICAgaWYgKCF2Ym8pXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCBjcmVhdGluZyBWQk9cIik7XG4gICAgZ2wuYmluZFZlcnRleEFycmF5KHZhbyk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHZibyk7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG1lc2gsIGdsLlNUQVRJQ19EUkFXKTtcbiAgICBjb25zdCB2ZXJ0ZXhTaXplID0gMztcbiAgICBjb25zdCBzdHJpZGUgPSA0ICogMztcbiAgICBjb25zdCB2ZXJ0ZXhPZmZzZXQgPSAwO1xuICAgIGNvbnN0IHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCAndl9Qb3NpdGlvbicpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIocG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbiwgdmVydGV4U2l6ZSwgZ2wuRkxPQVQsIGZhbHNlLCBzdHJpZGUsIHZlcnRleE9mZnNldCk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbik7XG4gICAgY29uc3QgdmVydGV4Q291bnQgPSBtZXNoLmxlbmd0aCAvIDM7XG4gICAgY29uc3QgbW9kZWwgPSAobmV3IE1hdHJpeDQoKSkuaWRlbnRpdHkoKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBwcm9ncmFtLFxuICAgICAgICB2YW8sXG4gICAgICAgIHZlcnRleENvdW50LFxuICAgICAgICBtb2RlbFxuICAgIH07XG59O1xuZXhwb3J0IGNvbnN0IGRyYXdTZWxlY3Rpb25Cb3ggPSAoZ2wsIHN0YXRlKSA9PiB7XG4gICAgY29uc3QgeyBwcm9ncmFtLCB2YW8sIHZlcnRleENvdW50LCBtb2RlbDogbW9kZWxNYXRyaXggfSA9IHN0YXRlLnBsYXllci5zZWxlY3Rpb25Cb3g7XG4gICAgY29uc3QgeyBwcm9qZWN0aW9uOiBwcm9qZWN0aW9uTWF0cml4LCB2aWV3OiB2aWV3TWF0cml4IH0gPSBzdGF0ZS5wbGF5ZXI7XG4gICAgZ2wudXNlUHJvZ3JhbShwcm9ncmFtKTtcbiAgICBjb25zdCBwcm9qZWN0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sIFwicHJvamVjdGlvblwiKTtcbiAgICBjb25zdCB2aWV3ID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sIFwidmlld1wiKTtcbiAgICBjb25zdCBtb2RlbCA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBcIm1vZGVsXCIpO1xuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYocHJvamVjdGlvbiwgZmFsc2UsIHByb2plY3Rpb25NYXRyaXgpO1xuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYodmlldywgZmFsc2UsIHZpZXdNYXRyaXgpO1xuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYobW9kZWwsIGZhbHNlLCBtb2RlbE1hdHJpeCk7XG4gICAgZ2wuYmluZFZlcnRleEFycmF5KHZhbyk7XG4gICAgZ2wuZHJhd0FycmF5cyhnbC5MSU5FUywgMCwgdmVydGV4Q291bnQpO1xuICAgIHJldHVybiBzdGF0ZTtcbn07XG5leHBvcnQgY29uc3QgcmF5Q2FzdCA9IChnbCwgc3RhdGUsIHBvcywgZGlyLCByYXlTdGVwLCByYXlNYXhMZW5ndGgpID0+IHtcbiAgICBsZXQgcmF5ID0gbmV3IFZlY3RvcjMocG9zLngsIHBvcy55LCBwb3Mueik7XG4gICAgY29uc3Qgc3RlcCA9IG5ldyBWZWN0b3IzKHJheVN0ZXAgKiBkaXIueCwgcmF5U3RlcCAqIGRpci55LCByYXlTdGVwICogZGlyLnopO1xuICAgIGNvbnN0IG51bVN0ZXBzID0gcmF5TWF4TGVuZ3RoIC8gcmF5U3RlcDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVN0ZXBzOyBpKyspIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXMgPSBuZXcgVmVjdG9yMyhyYXkueCwgcmF5LnksIHJheS56KTtcbiAgICAgICAgcmF5LnggKz0gc3RlcFswXTtcbiAgICAgICAgaWYgKGdldEJsb2NrKHN0YXRlLmNodW5rRmFjdG9yeSwgc3RhdGUuY29tcG9uZW50c1tcInN0cnVjdHVyZXNcIl0sIHJheSkgIT0gMClcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHJheSxcbiAgICAgICAgICAgICAgICBwcmV2aW91czogcHJldmlvdXMsXG4gICAgICAgICAgICB9O1xuICAgICAgICBwcmV2aW91cy54ICs9IHN0ZXBbMF07XG4gICAgICAgIHJheS55ICs9IHN0ZXBbMV07XG4gICAgICAgIGlmIChnZXRCbG9jayhzdGF0ZS5jaHVua0ZhY3RvcnksIHN0YXRlLmNvbXBvbmVudHNbXCJzdHJ1Y3R1cmVzXCJdLCByYXkpICE9IDApXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiByYXksXG4gICAgICAgICAgICAgICAgcHJldmlvdXM6IHByZXZpb3VzLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgcHJldmlvdXMueSArPSBzdGVwWzFdO1xuICAgICAgICByYXkueiArPSBzdGVwWzJdO1xuICAgICAgICBpZiAoZ2V0QmxvY2soc3RhdGUuY2h1bmtGYWN0b3J5LCBzdGF0ZS5jb21wb25lbnRzW1wic3RydWN0dXJlc1wiXSwgcmF5KSAhPSAwKVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogcmF5LFxuICAgICAgICAgICAgICAgIHByZXZpb3VzOiBwcmV2aW91cyxcbiAgICAgICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcbmNvbnN0IGJveFZlcnRleFNoYWRlciA9IGAjdmVyc2lvbiAzMDAgZXNcbiAgaW4gdmVjMyB2X1Bvc2l0aW9uO1xuXG4gIHVuaWZvcm0gbWF0NCBwcm9qZWN0aW9uO1xuICB1bmlmb3JtIG1hdDQgdmlldztcbiAgdW5pZm9ybSBtYXQ0IG1vZGVsO1xuICBcbiAgdm9pZCBtYWluKCkge1xuICAgIFxuICAgIGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbiAqIHZpZXcgKiBtb2RlbCAqIHZlYzQodl9Qb3NpdGlvbiwgMS4wKTtcbiAgfVxuYDtcbmNvbnN0IGJveEZyYWdtZW50U2hhZGVyID0gYCN2ZXJzaW9uIDMwMCBlc1xuICBwcmVjaXNpb24gaGlnaHAgZmxvYXQ7XG4gIFxuICBvdXQgdmVjNCBmcmFnX2NvbG9yO1xuXG4gIHZvaWQgbWFpbigpIHtcbiAgICBmcmFnX2NvbG9yID0gdmVjNCgwLjAsIDAuMCwgMC4wLCAxLjApO1xuICB9XG5gO1xuIiwiZXhwb3J0IGNvbnN0IGluaXRTaGFkZXJzID0gKGdsLCB2c2hhZGVyLCBmc2hhZGVyKSA9PiB7XG4gICAgY29uc3QgcHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcbiAgICBpZiAoIXByb2dyYW0pXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIldlYkdMIGZhaWxlZCB0byBjcmVhdGUgcHJvZ3JhbVwiKTtcbiAgICBjb25zdCB2ZXJ0ZXggPSBjb21waWxlU2hhZGVyKGdsLCB2c2hhZGVyLCBnbC5WRVJURVhfU0hBREVSKTtcbiAgICBjb25zdCBmcmFnbWVudCA9IGNvbXBpbGVTaGFkZXIoZ2wsIGZzaGFkZXIsIGdsLkZSQUdNRU5UX1NIQURFUik7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHZlcnRleCk7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50KTtcbiAgICBnbC5saW5rUHJvZ3JhbShwcm9ncmFtKTtcbiAgICBjb25zdCBzdWNjZXNzID0gZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5MSU5LX1NUQVRVUyk7XG4gICAgaWYgKCFzdWNjZXNzKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJwcm9ncmFtIGZhaWxlZCB0byBsaW5rOlwiKTsgLy8gKyBnbC5nZXRQcm9ncmFtSW5mb0xvZyAocHJvZ3JhbSkpO1xuICAgIHJldHVybiBwcm9ncmFtO1xufTtcbmNvbnN0IGNvbXBpbGVTaGFkZXIgPSAoZ2wsIHNvdXJjZSwgdHlwZSkgPT4ge1xuICAgIGNvbnN0IHNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcih0eXBlKTtcbiAgICBpZiAoIXNoYWRlcilcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiV2ViR0wgZmFpbGVkIHRvIGNyZWF0ZSBzaGFkZXJcIik7XG4gICAgZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlKTtcbiAgICBnbC5jb21waWxlU2hhZGVyKHNoYWRlcik7XG4gICAgY29uc3Qgc3VjY2VzcyA9IGdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKTtcbiAgICBpZiAoIXN1Y2Nlc3MpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGNvbXBpbGUgc2hhZGVyOiAke2dsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKX1gKTtcbiAgICByZXR1cm4gc2hhZGVyO1xufTtcbi8qXG4gKiBBc3N1bWVzIHRoZSB0ZXh0dXJlIHNpemUgaXMgYSBwb3dlciBvZiAyLiBHZW5lcmF0ZXMgbWlwbWFwc1xuICovXG5leHBvcnQgY29uc3QgbG9hZFRleHR1cmUgPSAoZ2wsIHVybCkgPT4ge1xuICAgIGNvbnN0IHRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG4gICAgaWYgKCF0ZXh0dXJlKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXZWJHTCBjb3VsZG4ndCBjcmVhdGUgbmVlZGVkIHRleHR1cmVzXCIpO1xuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpO1xuICAgIGNvbnN0IGxldmVsID0gMDtcbiAgICBjb25zdCBpbnRlcm5hbEZvcm1hdCA9IGdsLlJHQkE7XG4gICAgY29uc3Qgd2lkdGggPSAxO1xuICAgIGNvbnN0IGhlaWdodCA9IDE7XG4gICAgY29uc3QgYm9yZGVyID0gMDtcbiAgICBjb25zdCBzcmNGb3JtYXQgPSBnbC5SR0JBO1xuICAgIGNvbnN0IHNyY1R5cGUgPSBnbC5VTlNJR05FRF9CWVRFO1xuICAgIGNvbnN0IHBpeGVsID0gbmV3IFVpbnQ4QXJyYXkoWzI1NSwgMCwgMjU1LCAyNTVdKTtcbiAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIGxldmVsLCBpbnRlcm5hbEZvcm1hdCwgd2lkdGgsIGhlaWdodCwgYm9yZGVyLCBzcmNGb3JtYXQsIHNyY1R5cGUsIHBpeGVsKTtcbiAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSk7XG4gICAgICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgbGV2ZWwsIGludGVybmFsRm9ybWF0LCBzcmNGb3JtYXQsIHNyY1R5cGUsIGltYWdlKTtcbiAgICAgICAgZ2wudGV4UGFyYW1ldGVyZihnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgICAgICBnbC50ZXhQYXJhbWV0ZXJmKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gICAgICAgIC8vZ2wudGV4UGFyYW1ldGVyZihnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuUkVQRUFUKTtcbiAgICAgICAgLy9nbC50ZXhQYXJhbWV0ZXJmKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5SRVBFQVQpO1xuICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5DTEFNUF9UT19FREdFKTtcbiAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgICAgIGdsLmdlbmVyYXRlTWlwbWFwKGdsLlRFWFRVUkVfMkQpO1xuICAgIH07XG4gICAgaW1hZ2Uuc3JjID0gdXJsO1xuICAgIHJldHVybiB0ZXh0dXJlO1xufTtcbiIsIi8vIGp1c3QgcmVuZGVycyBhbGwgcmVuZGVyIG9iamVjdHMgcmlnaHQgbm93XG5leHBvcnQgY29uc3QgcmVuZGVyQ2h1bmtzID0gKGdsLCBzdGF0ZSwgZGVsdGEpID0+IChkYXRhKSA9PiB7XG4gICAgY29uc3QgY2FzdGVkU3RhdGUgPSBzdGF0ZTtcbiAgICBjb25zdCByZW5kZXJPYmplY3RzID0gY2FzdGVkU3RhdGUuY29tcG9uZW50c1tcInJlbmRlck9iamVjdHNcIl07XG4gICAgaWYgKCFyZW5kZXJPYmplY3RzKVxuICAgICAgICB0aHJvdyBFcnJvcihcIlJlbmRlckNodW5rczogUmVuZGVyT2JqZWN0cyBjb21wb25lbnQgbm90IHJlZ2lzdGVyZWQhXCIpO1xuICAgIHJlbmRlck9iamVjdHMuZm9yRWFjaCgodiwgaykgPT4ge1xuICAgICAgICBnbC51c2VQcm9ncmFtKHYucHJvZ3JhbSk7XG4gICAgICAgIGNvbnN0IHByb2plY3Rpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24odi5wcm9ncmFtLCBcInByb2plY3Rpb25cIik7XG4gICAgICAgIGNvbnN0IHZpZXcgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24odi5wcm9ncmFtLCBcInZpZXdcIik7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHYucHJvZ3JhbSwgXCJtb2RlbFwiKTtcbiAgICAgICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCk7XG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIGNhc3RlZFN0YXRlLmF0bGFzKTtcbiAgICAgICAgZ2wudW5pZm9ybU1hdHJpeDRmdihwcm9qZWN0aW9uLCBmYWxzZSwgY2FzdGVkU3RhdGUucGxheWVyLnByb2plY3Rpb24pO1xuICAgICAgICBnbC51bmlmb3JtTWF0cml4NGZ2KHZpZXcsIGZhbHNlLCBjYXN0ZWRTdGF0ZS5wbGF5ZXIudmlldyk7XG4gICAgICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYobW9kZWwsIGZhbHNlLCB2Lm1vZGVsKTtcbiAgICAgICAgZ2wuYmluZFZlcnRleEFycmF5KHYudmFvKTtcbiAgICAgICAgZ2wuZHJhd0FycmF5cyh2LndpcmVmcmFtZSA/IGdsLkxJTkVTIDogZ2wuVFJJQU5HTEVTLCAwLCB2LnZlcnRleENvdW50KTtcbiAgICB9KTtcbiAgICByZXR1cm4gc3RhdGU7XG59O1xuIiwiaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJ0BtYXRoLmdsL2NvcmUnO1xuaW1wb3J0IHsgZnJlZUNhbWVyYUlucHV0IH0gZnJvbSAnLi4vLi4vZW5naW5lL2ZyZWVDYW1lcmEnO1xuaW1wb3J0IHsgY2h1bmtJZCwgY2h1bmtQb3NGcm9tQmxvY2tQb3MsIHNldEJsb2NrLCB1cGRhdGVDaHVuayB9IGZyb20gJy4uL2NodW5rL2NodW5rJztcbmltcG9ydCB7IGRyYXdTZWxlY3Rpb25Cb3gsIHJheUNhc3QgfSBmcm9tICcuLi9wbGF5ZXInO1xuaW1wb3J0IHsgZmxvb3JWZWN0b3IgfSBmcm9tICcuLi8uLi9saWIvbWF0aCc7XG5leHBvcnQgY29uc3QgY2FtZXJhSW5wdXQgPSAoZ2wsIHN0YXRlLCBkZWx0YSkgPT4gKGRhdGEpID0+IHtcbiAgICB2YXIgX2E7XG4gICAgbGV0IGNhc3RlZFN0YXRlID0gc3RhdGU7XG4gICAgY2FzdGVkU3RhdGUucGxheWVyID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBmcmVlQ2FtZXJhSW5wdXQoY2FzdGVkU3RhdGUucGxheWVyLCBjYXN0ZWRTdGF0ZSwgZGVsdGEpKSwgY2FzdGVkU3RhdGUucGxheWVyKTtcbiAgICBjYXN0ZWRTdGF0ZS5tb3VzZU1vdmVtZW50ID0gWzAsIDBdO1xuICAgIGlmIChjYXN0ZWRTdGF0ZS5hY3RpdmVJbnB1dC5oYXMoXCJnXCIpKVxuICAgICAgICBjb25zb2xlLmxvZyhjYXN0ZWRTdGF0ZS5wbGF5ZXIucG9zaXRpb24pO1xuICAgIGlmIChjYXN0ZWRTdGF0ZS5hY3RpdmVJbnB1dC5oYXMoXCJ2XCIpKSB7XG4gICAgICAgIGNvbnN0IHBvcyA9IGNhc3RlZFN0YXRlLnBsYXllci5wb3NpdGlvbjtcbiAgICAgICAgY29uc3QgY2h1bmtTaXplID0gY2FzdGVkU3RhdGUuY2h1bmtGYWN0b3J5LmNodW5rU2l6ZTtcbiAgICAgICAgY29uc3QgY2h1bmtQb3MgPSBuZXcgVmVjdG9yMyhNYXRoLmZsb29yKHBvcy54IC8gY2h1bmtTaXplKSwgTWF0aC5mbG9vcihwb3MueSAvIGNodW5rU2l6ZSksIE1hdGguZmxvb3IocG9zLnogLyBjaHVua1NpemUpKTtcbiAgICAgICAgY29uc3QgZWlkID0gY2h1bmtJZChjaHVua1Bvcyk7XG4gICAgICAgIGNvbnN0IGNodW5rID0gKF9hID0gY2FzdGVkU3RhdGUuY29tcG9uZW50c1tcInJlbmRlck9iamVjdHNcIl0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXQoZWlkKTtcbiAgICAgICAgaWYgKGNodW5rKSB7XG4gICAgICAgICAgICBjaHVuay53aXJlZnJhbWUgPSAhY2h1bmsud2lyZWZyYW1lO1xuICAgICAgICAgICAgY2FzdGVkU3RhdGUuY29tcG9uZW50c1tcInJlbmRlck9iamVjdHNcIl0uc2V0KGVpZCwgY2h1bmspO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjYXN0ZWRTdGF0ZTtcbn07XG5leHBvcnQgY29uc3QgY2hlY2tDaHVua0NoYW5nZSA9IChnbCwgc3RhdGUsIGRlbHRhKSA9PiAoZGF0YSkgPT4ge1xuICAgIGxldCBjYXN0ZWRTdGF0ZSA9IHN0YXRlO1xuICAgIGNvbnN0IGN1cnJlbnRDaHVua0lkID0gY2h1bmtJZChjaHVua1Bvc0Zyb21CbG9ja1BvcyhjYXN0ZWRTdGF0ZS5jaHVua0ZhY3RvcnksIGZsb29yVmVjdG9yKGNhc3RlZFN0YXRlLnBsYXllci5wb3NpdGlvbikpKTtcbiAgICBjb25zdCBwcmV2aW91c0NodW5rSWQgPSBjaHVua0lkKGNodW5rUG9zRnJvbUJsb2NrUG9zKGNhc3RlZFN0YXRlLmNodW5rRmFjdG9yeSwgZmxvb3JWZWN0b3IoY2FzdGVkU3RhdGUucGxheWVyLnByZXZpb3VzUG9zaXRpb24pKSk7XG4gICAgaWYgKCEoY3VycmVudENodW5rSWQgPT09IHByZXZpb3VzQ2h1bmtJZCkpXG4gICAgICAgIGNhc3RlZFN0YXRlLnF1ZXVlLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogXCJwbGF5ZXJDaGFuZ2VDaHVua1wiLFxuICAgICAgICAgICAgZGF0YTogbnVsbFxuICAgICAgICB9KTtcbiAgICBjYXN0ZWRTdGF0ZS5wbGF5ZXIucHJldmlvdXNQb3NpdGlvbi54ID0gY2FzdGVkU3RhdGUucGxheWVyLnBvc2l0aW9uLng7XG4gICAgY2FzdGVkU3RhdGUucGxheWVyLnByZXZpb3VzUG9zaXRpb24ueSA9IGNhc3RlZFN0YXRlLnBsYXllci5wb3NpdGlvbi55O1xuICAgIGNhc3RlZFN0YXRlLnBsYXllci5wcmV2aW91c1Bvc2l0aW9uLnogPSBjYXN0ZWRTdGF0ZS5wbGF5ZXIucG9zaXRpb24uejtcbiAgICByZXR1cm4gY2FzdGVkU3RhdGU7XG59O1xuZXhwb3J0IGNvbnN0IGJsb2NrSW5wdXQgPSAoZ2wsIHN0YXRlLCBkZWx0YSkgPT4gKGRhdGEpID0+IHtcbiAgICBsZXQgY2FzdGVkU3RhdGUgPSBzdGF0ZTtcbiAgICBjb25zdCBjaHVua1NpemUgPSBjYXN0ZWRTdGF0ZS5jaHVua0ZhY3RvcnkuY2h1bmtTaXplO1xuICAgIGNvbnN0IHdoaWNoID0gZGF0YSA9PT0gbnVsbCB8fCBkYXRhID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkYXRhLndoaWNoO1xuICAgIGNvbnN0IHsgcG9zaXRpb24sIGRpcmVjdGlvbiwgcmF5U3RlcCwgcmF5TWF4TGVuZ3RoIH0gPSBjYXN0ZWRTdGF0ZS5wbGF5ZXI7XG4gICAgY29uc3QgaGl0ID0gcmF5Q2FzdChnbCwgY2FzdGVkU3RhdGUsIHBvc2l0aW9uLCBkaXJlY3Rpb24sIHJheVN0ZXAsIHJheU1heExlbmd0aCk7XG4gICAgaWYgKCFoaXQpXG4gICAgICAgIHJldHVybiBjYXN0ZWRTdGF0ZTtcbiAgICBjb25zdCBibG9ja1BvcyA9IGZsb29yVmVjdG9yKGhpdC5wb3NpdGlvbik7XG4gICAgY29uc3QgY2h1bmtQb3MgPSBjaHVua1Bvc0Zyb21CbG9ja1BvcyhjYXN0ZWRTdGF0ZS5jaHVua0ZhY3RvcnksIGJsb2NrUG9zKTtcbiAgICBjb25zdCBwcmV2UG9zID0gZmxvb3JWZWN0b3IoaGl0LnByZXZpb3VzKTtcbiAgICBjb25zdCBwcmV2Q2h1bmtQb3MgPSBjaHVua1Bvc0Zyb21CbG9ja1BvcyhjYXN0ZWRTdGF0ZS5jaHVua0ZhY3RvcnksIHByZXZQb3MpO1xuICAgIC8vIGxlZnQgY2xpY2sgLSByZW1vdmUgYmxvY2tcbiAgICBpZiAod2hpY2ggPT0gMSkge1xuICAgICAgICAvLyBzZXQgdGhlIGJsb2NrXG4gICAgICAgIGNhc3RlZFN0YXRlID0gc2V0QmxvY2soY2FzdGVkU3RhdGUsIGJsb2NrUG9zLCAwKTtcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBtZXNoXG4gICAgICAgIGNhc3RlZFN0YXRlID0gdXBkYXRlQ2h1bmsoZ2wsIGNhc3RlZFN0YXRlLCBjaHVua1Bvcyk7XG4gICAgICAgIGNvbnN0IG1vZHVsbyA9IG5ldyBWZWN0b3IzKCgoYmxvY2tQb3MueCAlIGNodW5rU2l6ZSkgKyBjaHVua1NpemUpICUgY2h1bmtTaXplLCAoKGJsb2NrUG9zLnkgJSBjaHVua1NpemUpICsgY2h1bmtTaXplKSAlIGNodW5rU2l6ZSwgKChibG9ja1Bvcy56ICUgY2h1bmtTaXplKSArIGNodW5rU2l6ZSkgJSBjaHVua1NpemUpO1xuICAgICAgICBpZiAobW9kdWxvLnggJSBjaHVua1NpemUgPT0gMClcbiAgICAgICAgICAgIGNhc3RlZFN0YXRlID0gdXBkYXRlQ2h1bmsoZ2wsIGNhc3RlZFN0YXRlLCBuZXcgVmVjdG9yMyhjaHVua1Bvcy54IC0gMSwgY2h1bmtQb3MueSwgY2h1bmtQb3MueikpO1xuICAgICAgICBpZiAobW9kdWxvLnggJSBjaHVua1NpemUgPT0gY2h1bmtTaXplIC0gMSlcbiAgICAgICAgICAgIGNhc3RlZFN0YXRlID0gdXBkYXRlQ2h1bmsoZ2wsIGNhc3RlZFN0YXRlLCBuZXcgVmVjdG9yMyhjaHVua1Bvcy54ICsgMSwgY2h1bmtQb3MueSwgY2h1bmtQb3MueikpO1xuICAgICAgICBpZiAobW9kdWxvLnkgJSBjaHVua1NpemUgPT0gMClcbiAgICAgICAgICAgIGNhc3RlZFN0YXRlID0gdXBkYXRlQ2h1bmsoZ2wsIGNhc3RlZFN0YXRlLCBuZXcgVmVjdG9yMyhjaHVua1Bvcy54LCBjaHVua1Bvcy55IC0gMSwgY2h1bmtQb3MueikpO1xuICAgICAgICBpZiAobW9kdWxvLnkgJSBjaHVua1NpemUgPT0gY2h1bmtTaXplIC0gMSlcbiAgICAgICAgICAgIGNhc3RlZFN0YXRlID0gdXBkYXRlQ2h1bmsoZ2wsIGNhc3RlZFN0YXRlLCBuZXcgVmVjdG9yMyhjaHVua1Bvcy54LCBjaHVua1Bvcy55ICsgMSwgY2h1bmtQb3MueikpO1xuICAgICAgICBpZiAobW9kdWxvLnogJSBjaHVua1NpemUgPT0gMClcbiAgICAgICAgICAgIGNhc3RlZFN0YXRlID0gdXBkYXRlQ2h1bmsoZ2wsIGNhc3RlZFN0YXRlLCBuZXcgVmVjdG9yMyhjaHVua1Bvcy54LCBjaHVua1Bvcy55LCBjaHVua1Bvcy56IC0gMSkpO1xuICAgICAgICBpZiAobW9kdWxvLnogJSBjaHVua1NpemUgPT0gY2h1bmtTaXplIC0gMSlcbiAgICAgICAgICAgIGNhc3RlZFN0YXRlID0gdXBkYXRlQ2h1bmsoZ2wsIGNhc3RlZFN0YXRlLCBuZXcgVmVjdG9yMyhjaHVua1Bvcy54LCBjaHVua1Bvcy55LCBjaHVua1Bvcy56ICsgMSkpO1xuICAgIH1cbiAgICAvLyByaWdodCBjbGljayAtIGFkZCBibG9ja1xuICAgIGlmICh3aGljaCA9PSAzKSB7XG4gICAgICAgIC8vIHNldCB0aGUgYmxvY2tcbiAgICAgICAgY2FzdGVkU3RhdGUgPSBzZXRCbG9jayhjYXN0ZWRTdGF0ZSwgcHJldlBvcywgNCk7XG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgbWVzaFxuICAgICAgICBjYXN0ZWRTdGF0ZSA9IHVwZGF0ZUNodW5rKGdsLCBjYXN0ZWRTdGF0ZSwgcHJldkNodW5rUG9zKTtcbiAgICB9XG4gICAgcmV0dXJuIGNhc3RlZFN0YXRlO1xufTtcbmV4cG9ydCBjb25zdCByZW5kZXJTZWxlY3Rpb25Cb3ggPSAoZ2wsIHN0YXRlLCBkZWx0YSkgPT4gKGRhdGEpID0+IHtcbiAgICBsZXQgY2FzdGVkU3RhdGUgPSBzdGF0ZTtcbiAgICBjb25zdCB3aGljaCA9IGRhdGEgPT09IG51bGwgfHwgZGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGF0YS53aGljaDtcbiAgICBjb25zdCB7IHBvc2l0aW9uLCBkaXJlY3Rpb24sIHJheVN0ZXAsIHJheU1heExlbmd0aCB9ID0gY2FzdGVkU3RhdGUucGxheWVyO1xuICAgIGNvbnN0IGhpdCA9IHJheUNhc3QoZ2wsIGNhc3RlZFN0YXRlLCBwb3NpdGlvbiwgZGlyZWN0aW9uLCByYXlTdGVwLCByYXlNYXhMZW5ndGgpO1xuICAgIGlmICghaGl0KVxuICAgICAgICByZXR1cm4gY2FzdGVkU3RhdGU7XG4gICAgY29uc3QgcG9zID0gZmxvb3JWZWN0b3IoaGl0LnBvc2l0aW9uKTtcbiAgICBjYXN0ZWRTdGF0ZS5wbGF5ZXIuc2VsZWN0aW9uQm94Lm1vZGVsID0gY2FzdGVkU3RhdGUucGxheWVyLnNlbGVjdGlvbkJveC5tb2RlbC5pZGVudGl0eSgpLnRyYW5zbGF0ZShbcG9zLngsIHBvcy55LCBwb3Muel0pO1xuICAgIGNhc3RlZFN0YXRlID0gZHJhd1NlbGVjdGlvbkJveChnbCwgY2FzdGVkU3RhdGUpO1xuICAgIHJldHVybiBjYXN0ZWRTdGF0ZTtcbn07XG4iLCJpbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnQG1hdGguZ2wvY29yZSc7XG5pbXBvcnQgeyBsb2FkTWFueUNodW5rcywgdW5sb2FkQ2h1bmsgfSBmcm9tICcuLi9jaHVuay9jaHVuayc7XG5leHBvcnQgY29uc3QgbG9hZENodW5rcyA9IChnbCwgc3RhdGUsIGRlbHRhKSA9PiAoZGF0YSkgPT4ge1xuICAgIGxldCBjYXN0ZWRTdGF0ZSA9IHN0YXRlO1xuICAgIGNvbnN0IGxvYWREaXN0YW5jZSA9IGNhc3RlZFN0YXRlLmNodW5rRmFjdG9yeS5sb2FkRGlzdGFuY2U7XG4gICAgY29uc3QgY2h1bmtTaXplID0gY2FzdGVkU3RhdGUuY2h1bmtGYWN0b3J5LmNodW5rU2l6ZTtcbiAgICBjb25zdCBwb3MgPSBjYXN0ZWRTdGF0ZS5wbGF5ZXIucG9zaXRpb247XG4gICAgY29uc3QgY2h1bmtQb3MgPSBuZXcgVmVjdG9yMyhNYXRoLmZsb29yKHBvcy54IC8gY2h1bmtTaXplKSwgTWF0aC5mbG9vcihwb3MueSAvIGNodW5rU2l6ZSksIE1hdGguZmxvb3IocG9zLnogLyBjaHVua1NpemUpKTtcbiAgICBjb25zdCB0b0xvYWQgPSBbXTtcbiAgICBsZXQgb2Zmc2V0ID0gW107XG4gICAgY29uc3QgciA9IGxvYWREaXN0YW5jZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHI7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHI7IGorKykge1xuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCByOyBrKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoKGkgKiBpICsgaiAqIGogKyBrICogaykgPCByICogcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB4ID0gaSArIGNodW5rUG9zWzBdLCB4MSA9IChpID09IDAgPyAwIDogLWkpICsgY2h1bmtQb3NbMF07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHkgPSBqICsgY2h1bmtQb3NbMV0sIHkxID0gKGogPT0gMCA/IDAgOiAtaikgKyBjaHVua1Bvc1sxXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeiA9IGsgKyBjaHVua1Bvc1syXSwgejEgPSAoayA9PSAwID8gMCA6IC1rKSArIGNodW5rUG9zWzJdO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQucHVzaChuZXcgVmVjdG9yMyh4LCB5LCB6KSk7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldC5wdXNoKG5ldyBWZWN0b3IzKHgsIHksIHoxKSk7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldC5wdXNoKG5ldyBWZWN0b3IzKHgsIHkxLCB6KSk7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldC5wdXNoKG5ldyBWZWN0b3IzKHgsIHkxLCB6MSkpO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQucHVzaChuZXcgVmVjdG9yMyh4MSwgeTEsIHopKTtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0LnB1c2gobmV3IFZlY3RvcjMoeDEsIHksIHoxKSk7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldC5wdXNoKG5ldyBWZWN0b3IzKHgxLCB5LCB6KSk7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldC5wdXNoKG5ldyBWZWN0b3IzKHgxLCB5MSwgejEpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgb2Zmc2V0ID0gb2Zmc2V0LmZpbHRlcigodiwgaSwgYSkgPT4gYS5maW5kSW5kZXgodjIgPT4gKHZbMF0gPT09IHYyWzBdICYmIHZbMV0gPT09IHYyWzFdICYmIHZbMl0gPT09IHYyWzJdKSkgPT09IGkpO1xuICAgIGNhc3RlZFN0YXRlID0gbG9hZE1hbnlDaHVua3MoZ2wsIGNhc3RlZFN0YXRlLCBvZmZzZXQpO1xuICAgIHJldHVybiBjYXN0ZWRTdGF0ZTtcbn07XG5leHBvcnQgY29uc3QgdW5sb2FkQ2h1bmtzID0gKGdsLCBzdGF0ZSwgZGVsdGEpID0+IChkYXRhKSA9PiB7XG4gICAgbGV0IGNhc3RlZFN0YXRlID0gc3RhdGU7XG4gICAgY29uc3QgbG9hZERpc3RhbmNlID0gY2FzdGVkU3RhdGUuY2h1bmtGYWN0b3J5LmxvYWREaXN0YW5jZTtcbiAgICBjb25zdCBjaHVua1NpemUgPSBjYXN0ZWRTdGF0ZS5jaHVua0ZhY3RvcnkuY2h1bmtTaXplO1xuICAgIGNvbnN0IHBsYXllclBvcyA9IGNhc3RlZFN0YXRlLnBsYXllci5wb3NpdGlvbjtcbiAgICBjb25zdCBjaHVua1BvcyA9IG5ldyBWZWN0b3IzKE1hdGguZmxvb3IocGxheWVyUG9zLnggLyBjaHVua1NpemUpLCBNYXRoLmZsb29yKHBsYXllclBvcy55IC8gY2h1bmtTaXplKSwgTWF0aC5mbG9vcihwbGF5ZXJQb3MueiAvIGNodW5rU2l6ZSkpO1xuICAgIGNvbnN0IGNodW5rUG9zU3RvcmFnZSA9IGNhc3RlZFN0YXRlLmNvbXBvbmVudHNbXCJjaHVua1Bvc1wiXTtcbiAgICBpZiAoIWNodW5rUG9zU3RvcmFnZSlcbiAgICAgICAgcmV0dXJuIGNhc3RlZFN0YXRlO1xuICAgIGNodW5rUG9zU3RvcmFnZS5mb3JFYWNoKCh2LCBrKSA9PiB7XG4gICAgICAgIC8vIGxldCB1bmxvYWQgPSBmYWxzZTtcbiAgICAgICAgLy8gZmluZCBjaHVua3BvcyBvdXRzaWRlIHJhbmdlIGFuZCB1bmxvYWRcbiAgICAgICAgLy8gaWYodlswXSoqMiArIHZbMV0qKjIgKyB2WzJdKioyID4gbG9hZERpc3RhbmNlKioyKVxuICAgICAgICAvLyAgY2FzdGVkU3RhdGUgPSB1bmxvYWRDaHVuayhjYXN0ZWRTdGF0ZSwgdik7XG4gICAgICAgIGlmICh2LnggPCBjaHVua1Bvcy54IC0gbG9hZERpc3RhbmNlKVxuICAgICAgICAgICAgY2FzdGVkU3RhdGUgPSB1bmxvYWRDaHVuayhjYXN0ZWRTdGF0ZSwgdik7XG4gICAgICAgIGlmICh2LnggPiBjaHVua1Bvcy54ICsgbG9hZERpc3RhbmNlKVxuICAgICAgICAgICAgY2FzdGVkU3RhdGUgPSB1bmxvYWRDaHVuayhjYXN0ZWRTdGF0ZSwgdik7XG4gICAgICAgIGlmICh2LnkgPCBjaHVua1Bvcy55IC0gbG9hZERpc3RhbmNlKVxuICAgICAgICAgICAgY2FzdGVkU3RhdGUgPSB1bmxvYWRDaHVuayhjYXN0ZWRTdGF0ZSwgdik7XG4gICAgICAgIGlmICh2LnkgPiBjaHVua1Bvcy55ICsgbG9hZERpc3RhbmNlKVxuICAgICAgICAgICAgY2FzdGVkU3RhdGUgPSB1bmxvYWRDaHVuayhjYXN0ZWRTdGF0ZSwgdik7XG4gICAgICAgIGlmICh2LnogPCBjaHVua1Bvcy56IC0gbG9hZERpc3RhbmNlKVxuICAgICAgICAgICAgY2FzdGVkU3RhdGUgPSB1bmxvYWRDaHVuayhjYXN0ZWRTdGF0ZSwgdik7XG4gICAgICAgIGlmICh2LnogPiBjaHVua1Bvcy56ICsgbG9hZERpc3RhbmNlKVxuICAgICAgICAgICAgY2FzdGVkU3RhdGUgPSB1bmxvYWRDaHVuayhjYXN0ZWRTdGF0ZSwgdik7XG4gICAgICAgIC8vIGNhc3RlZFN0YXRlLnF1ZXVlLnB1c2goeyB0eXBlOiBcImNodW5rVW5sb2FkXCIsIGRhdGE6IHYgfSlcbiAgICB9KTtcbiAgICByZXR1cm4gY2FzdGVkU3RhdGU7XG59O1xuIiwiaW1wb3J0IHsgTWF0cml4NCwgVmVjdG9yMyB9IGZyb20gJ0BtYXRoLmdsL2NvcmUnO1xuZXhwb3J0IGNvbnN0IHJhZGlhbnMgPSAobikgPT4ge1xuICAgIHJldHVybiAobiAqIE1hdGguUEkpIC8gMTgwLjA7XG59O1xuZXhwb3J0IGNvbnN0IG11bHRpcGx5QW5kRGVzdHJ1Y3RWZWN0b3IzID0gKHZlYywgbSkgPT4ge1xuICAgIHJldHVybiBbdmVjLnggKiBtLCB2ZWMueSAqIG0sIHZlYy56ICogbV07XG59O1xuZXhwb3J0IGNvbnN0IGZ1bmN0aW9uYWxDcm9zc1ZlY3RvcjMgPSAodjEsIHYyKSA9PiB7XG4gICAgY29uc3QgdiA9IG5ldyBWZWN0b3IzKHYxLngsIHYxLnksIHYxLnopO1xuICAgIHJldHVybiB2LmNyb3NzKFt2Mi54LCB2Mi55LCB2Mi56XSkubm9ybWFsaXplKCk7XG59O1xuZXhwb3J0IGNvbnN0IHByb2plY3Rpb25NYXRyaXggPSAodywgaCkgPT4gKG5ldyBNYXRyaXg0KCkucGVyc3BlY3RpdmUoe1xuICAgIGZvdjogNzAsXG4gICAgZm92eTogKE1hdGguUEkgKiA3MCkgLyAxODAsXG4gICAgYXNwZWN0OiB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICBuZWFyOiAwLjEsXG4gICAgZmFyOiAxMDAuMFxufSkpO1xuZXhwb3J0IGNvbnN0IGZsb29yVmVjdG9yID0gKHBvcykgPT4gKG5ldyBWZWN0b3IzKE1hdGguZmxvb3IocG9zLngpLCBNYXRoLmZsb29yKHBvcy55KSwgTWF0aC5mbG9vcihwb3MueikpKTtcbiIsIi8qXG4gKiBBIGZhc3QgamF2YXNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiBzaW1wbGV4IG5vaXNlIGJ5IEpvbmFzIFdhZ25lclxuXG5CYXNlZCBvbiBhIHNwZWVkLWltcHJvdmVkIHNpbXBsZXggbm9pc2UgYWxnb3JpdGhtIGZvciAyRCwgM0QgYW5kIDREIGluIEphdmEuXG5XaGljaCBpcyBiYXNlZCBvbiBleGFtcGxlIGNvZGUgYnkgU3RlZmFuIEd1c3RhdnNvbiAoc3RlZ3VAaXRuLmxpdS5zZSkuXG5XaXRoIE9wdGltaXNhdGlvbnMgYnkgUGV0ZXIgRWFzdG1hbiAocGVhc3RtYW5AZHJpenpsZS5zdGFuZm9yZC5lZHUpLlxuQmV0dGVyIHJhbmsgb3JkZXJpbmcgbWV0aG9kIGJ5IFN0ZWZhbiBHdXN0YXZzb24gaW4gMjAxMi5cblxuIENvcHlyaWdodCAoYykgMjAyMSBKb25hcyBXYWduZXJcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuIFNPRlRXQVJFLlxuICovXG5jb25zdCBGMiA9IDAuNSAqIChNYXRoLnNxcnQoMy4wKSAtIDEuMCk7XG5jb25zdCBHMiA9ICgzLjAgLSBNYXRoLnNxcnQoMy4wKSkgLyA2LjA7XG5jb25zdCBGMyA9IDEuMCAvIDMuMDtcbmNvbnN0IEczID0gMS4wIC8gNi4wO1xuY29uc3QgRjQgPSAoTWF0aC5zcXJ0KDUuMCkgLSAxLjApIC8gNC4wO1xuY29uc3QgRzQgPSAoNS4wIC0gTWF0aC5zcXJ0KDUuMCkpIC8gMjAuMDtcbmNvbnN0IGdyYWQzID0gbmV3IEZsb2F0MzJBcnJheShbMSwgMSwgMCxcbiAgICAtMSwgMSwgMCxcbiAgICAxLCAtMSwgMCxcbiAgICAtMSwgLTEsIDAsXG4gICAgMSwgMCwgMSxcbiAgICAtMSwgMCwgMSxcbiAgICAxLCAwLCAtMSxcbiAgICAtMSwgMCwgLTEsXG4gICAgMCwgMSwgMSxcbiAgICAwLCAtMSwgMSxcbiAgICAwLCAxLCAtMSxcbiAgICAwLCAtMSwgLTFdKTtcbmNvbnN0IGdyYWQ0ID0gbmV3IEZsb2F0MzJBcnJheShbMCwgMSwgMSwgMSwgMCwgMSwgMSwgLTEsIDAsIDEsIC0xLCAxLCAwLCAxLCAtMSwgLTEsXG4gICAgMCwgLTEsIDEsIDEsIDAsIC0xLCAxLCAtMSwgMCwgLTEsIC0xLCAxLCAwLCAtMSwgLTEsIC0xLFxuICAgIDEsIDAsIDEsIDEsIDEsIDAsIDEsIC0xLCAxLCAwLCAtMSwgMSwgMSwgMCwgLTEsIC0xLFxuICAgIC0xLCAwLCAxLCAxLCAtMSwgMCwgMSwgLTEsIC0xLCAwLCAtMSwgMSwgLTEsIDAsIC0xLCAtMSxcbiAgICAxLCAxLCAwLCAxLCAxLCAxLCAwLCAtMSwgMSwgLTEsIDAsIDEsIDEsIC0xLCAwLCAtMSxcbiAgICAtMSwgMSwgMCwgMSwgLTEsIDEsIDAsIC0xLCAtMSwgLTEsIDAsIDEsIC0xLCAtMSwgMCwgLTEsXG4gICAgMSwgMSwgMSwgMCwgMSwgMSwgLTEsIDAsIDEsIC0xLCAxLCAwLCAxLCAtMSwgLTEsIDAsXG4gICAgLTEsIDEsIDEsIDAsIC0xLCAxLCAtMSwgMCwgLTEsIC0xLCAxLCAwLCAtMSwgLTEsIC0xLCAwXSk7XG4vKiogRGV0ZXJtaW5pc3RpYyBzaW1wbGV4IG5vaXNlIGdlbmVyYXRvciBzdWl0YWJsZSBmb3IgMkQsIDNEIGFuZCA0RCBzcGFjZXMuICovXG5leHBvcnQgY2xhc3MgU2ltcGxleE5vaXNlIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGBTaW1wbGV4Tm9pc2VgIGluc3RhbmNlLlxuICAgICAqIFRoaXMgaW52b2x2ZXMgc29tZSBzZXR1cC4gWW91IGNhbiBzYXZlIGEgZmV3IGNwdSBjeWNsZXMgYnkgcmV1c2luZyB0aGUgc2FtZSBpbnN0YW5jZS5cbiAgICAgKiBAcGFyYW0gcmFuZG9tT3JTZWVkIEEgcmFuZG9tIG51bWJlciBnZW5lcmF0b3Igb3IgYSBzZWVkIChzdHJpbmd8bnVtYmVyKS5cbiAgICAgKiBEZWZhdWx0cyB0byBNYXRoLnJhbmRvbSAocmFuZG9tIGlycmVwcm9kdWNpYmxlIGluaXRpYWxpemF0aW9uKS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyYW5kb21PclNlZWQgPSBNYXRoLnJhbmRvbSkge1xuICAgICAgICBjb25zdCByYW5kb20gPSB0eXBlb2YgcmFuZG9tT3JTZWVkID09ICdmdW5jdGlvbicgPyByYW5kb21PclNlZWQgOiBhbGVhKHJhbmRvbU9yU2VlZCk7XG4gICAgICAgIHRoaXMucCA9IGJ1aWxkUGVybXV0YXRpb25UYWJsZShyYW5kb20pO1xuICAgICAgICB0aGlzLnBlcm0gPSBuZXcgVWludDhBcnJheSg1MTIpO1xuICAgICAgICB0aGlzLnBlcm1Nb2QxMiA9IG5ldyBVaW50OEFycmF5KDUxMik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTEyOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucGVybVtpXSA9IHRoaXMucFtpICYgMjU1XTtcbiAgICAgICAgICAgIHRoaXMucGVybU1vZDEyW2ldID0gdGhpcy5wZXJtW2ldICUgMTI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2FtcGxlcyB0aGUgbm9pc2UgZmllbGQgaW4gMiBkaW1lbnNpb25zXG4gICAgICogQHBhcmFtIHhcbiAgICAgKiBAcGFyYW0geVxuICAgICAqIEByZXR1cm5zIGEgbnVtYmVyIGluIHRoZSBpbnRlcnZhbCBbLTEsIDFdXG4gICAgICovXG4gICAgbm9pc2UyRCh4LCB5KSB7XG4gICAgICAgIGNvbnN0IHBlcm1Nb2QxMiA9IHRoaXMucGVybU1vZDEyO1xuICAgICAgICBjb25zdCBwZXJtID0gdGhpcy5wZXJtO1xuICAgICAgICBsZXQgbjAgPSAwOyAvLyBOb2lzZSBjb250cmlidXRpb25zIGZyb20gdGhlIHRocmVlIGNvcm5lcnNcbiAgICAgICAgbGV0IG4xID0gMDtcbiAgICAgICAgbGV0IG4yID0gMDtcbiAgICAgICAgLy8gU2tldyB0aGUgaW5wdXQgc3BhY2UgdG8gZGV0ZXJtaW5lIHdoaWNoIHNpbXBsZXggY2VsbCB3ZSdyZSBpblxuICAgICAgICBjb25zdCBzID0gKHggKyB5KSAqIEYyOyAvLyBIYWlyeSBmYWN0b3IgZm9yIDJEXG4gICAgICAgIGNvbnN0IGkgPSBNYXRoLmZsb29yKHggKyBzKTtcbiAgICAgICAgY29uc3QgaiA9IE1hdGguZmxvb3IoeSArIHMpO1xuICAgICAgICBjb25zdCB0ID0gKGkgKyBqKSAqIEcyO1xuICAgICAgICBjb25zdCBYMCA9IGkgLSB0OyAvLyBVbnNrZXcgdGhlIGNlbGwgb3JpZ2luIGJhY2sgdG8gKHgseSkgc3BhY2VcbiAgICAgICAgY29uc3QgWTAgPSBqIC0gdDtcbiAgICAgICAgY29uc3QgeDAgPSB4IC0gWDA7IC8vIFRoZSB4LHkgZGlzdGFuY2VzIGZyb20gdGhlIGNlbGwgb3JpZ2luXG4gICAgICAgIGNvbnN0IHkwID0geSAtIFkwO1xuICAgICAgICAvLyBGb3IgdGhlIDJEIGNhc2UsIHRoZSBzaW1wbGV4IHNoYXBlIGlzIGFuIGVxdWlsYXRlcmFsIHRyaWFuZ2xlLlxuICAgICAgICAvLyBEZXRlcm1pbmUgd2hpY2ggc2ltcGxleCB3ZSBhcmUgaW4uXG4gICAgICAgIGxldCBpMSwgajE7IC8vIE9mZnNldHMgZm9yIHNlY29uZCAobWlkZGxlKSBjb3JuZXIgb2Ygc2ltcGxleCBpbiAoaSxqKSBjb29yZHNcbiAgICAgICAgaWYgKHgwID4geTApIHtcbiAgICAgICAgICAgIGkxID0gMTtcbiAgICAgICAgICAgIGoxID0gMDtcbiAgICAgICAgfSAvLyBsb3dlciB0cmlhbmdsZSwgWFkgb3JkZXI6ICgwLDApLT4oMSwwKS0+KDEsMSlcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpMSA9IDA7XG4gICAgICAgICAgICBqMSA9IDE7XG4gICAgICAgIH0gLy8gdXBwZXIgdHJpYW5nbGUsIFlYIG9yZGVyOiAoMCwwKS0+KDAsMSktPigxLDEpXG4gICAgICAgIC8vIEEgc3RlcCBvZiAoMSwwKSBpbiAoaSxqKSBtZWFucyBhIHN0ZXAgb2YgKDEtYywtYykgaW4gKHgseSksIGFuZFxuICAgICAgICAvLyBhIHN0ZXAgb2YgKDAsMSkgaW4gKGksaikgbWVhbnMgYSBzdGVwIG9mICgtYywxLWMpIGluICh4LHkpLCB3aGVyZVxuICAgICAgICAvLyBjID0gKDMtc3FydCgzKSkvNlxuICAgICAgICBjb25zdCB4MSA9IHgwIC0gaTEgKyBHMjsgLy8gT2Zmc2V0cyBmb3IgbWlkZGxlIGNvcm5lciBpbiAoeCx5KSB1bnNrZXdlZCBjb29yZHNcbiAgICAgICAgY29uc3QgeTEgPSB5MCAtIGoxICsgRzI7XG4gICAgICAgIGNvbnN0IHgyID0geDAgLSAxLjAgKyAyLjAgKiBHMjsgLy8gT2Zmc2V0cyBmb3IgbGFzdCBjb3JuZXIgaW4gKHgseSkgdW5za2V3ZWQgY29vcmRzXG4gICAgICAgIGNvbnN0IHkyID0geTAgLSAxLjAgKyAyLjAgKiBHMjtcbiAgICAgICAgLy8gV29yayBvdXQgdGhlIGhhc2hlZCBncmFkaWVudCBpbmRpY2VzIG9mIHRoZSB0aHJlZSBzaW1wbGV4IGNvcm5lcnNcbiAgICAgICAgY29uc3QgaWkgPSBpICYgMjU1O1xuICAgICAgICBjb25zdCBqaiA9IGogJiAyNTU7XG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY29udHJpYnV0aW9uIGZyb20gdGhlIHRocmVlIGNvcm5lcnNcbiAgICAgICAgbGV0IHQwID0gMC41IC0geDAgKiB4MCAtIHkwICogeTA7XG4gICAgICAgIGlmICh0MCA+PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBnaTAgPSBwZXJtTW9kMTJbaWkgKyBwZXJtW2pqXV0gKiAzO1xuICAgICAgICAgICAgdDAgKj0gdDA7XG4gICAgICAgICAgICBuMCA9IHQwICogdDAgKiAoZ3JhZDNbZ2kwXSAqIHgwICsgZ3JhZDNbZ2kwICsgMV0gKiB5MCk7IC8vICh4LHkpIG9mIGdyYWQzIHVzZWQgZm9yIDJEIGdyYWRpZW50XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHQxID0gMC41IC0geDEgKiB4MSAtIHkxICogeTE7XG4gICAgICAgIGlmICh0MSA+PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBnaTEgPSBwZXJtTW9kMTJbaWkgKyBpMSArIHBlcm1bamogKyBqMV1dICogMztcbiAgICAgICAgICAgIHQxICo9IHQxO1xuICAgICAgICAgICAgbjEgPSB0MSAqIHQxICogKGdyYWQzW2dpMV0gKiB4MSArIGdyYWQzW2dpMSArIDFdICogeTEpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0MiA9IDAuNSAtIHgyICogeDIgLSB5MiAqIHkyO1xuICAgICAgICBpZiAodDIgPj0gMCkge1xuICAgICAgICAgICAgY29uc3QgZ2kyID0gcGVybU1vZDEyW2lpICsgMSArIHBlcm1bamogKyAxXV0gKiAzO1xuICAgICAgICAgICAgdDIgKj0gdDI7XG4gICAgICAgICAgICBuMiA9IHQyICogdDIgKiAoZ3JhZDNbZ2kyXSAqIHgyICsgZ3JhZDNbZ2kyICsgMV0gKiB5Mik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWRkIGNvbnRyaWJ1dGlvbnMgZnJvbSBlYWNoIGNvcm5lciB0byBnZXQgdGhlIGZpbmFsIG5vaXNlIHZhbHVlLlxuICAgICAgICAvLyBUaGUgcmVzdWx0IGlzIHNjYWxlZCB0byByZXR1cm4gdmFsdWVzIGluIHRoZSBpbnRlcnZhbCBbLTEsMV0uXG4gICAgICAgIHJldHVybiA3MC4wICogKG4wICsgbjEgKyBuMik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNhbXBsZXMgdGhlIG5vaXNlIGZpZWxkIGluIDMgZGltZW5zaW9uc1xuICAgICAqIEBwYXJhbSB4XG4gICAgICogQHBhcmFtIHlcbiAgICAgKiBAcGFyYW0gelxuICAgICAqIEByZXR1cm5zIGEgbnVtYmVyIGluIHRoZSBpbnRlcnZhbCBbLTEsIDFdXG4gICAgICovXG4gICAgbm9pc2UzRCh4LCB5LCB6KSB7XG4gICAgICAgIGNvbnN0IHBlcm1Nb2QxMiA9IHRoaXMucGVybU1vZDEyO1xuICAgICAgICBjb25zdCBwZXJtID0gdGhpcy5wZXJtO1xuICAgICAgICBsZXQgbjAsIG4xLCBuMiwgbjM7IC8vIE5vaXNlIGNvbnRyaWJ1dGlvbnMgZnJvbSB0aGUgZm91ciBjb3JuZXJzXG4gICAgICAgIC8vIFNrZXcgdGhlIGlucHV0IHNwYWNlIHRvIGRldGVybWluZSB3aGljaCBzaW1wbGV4IGNlbGwgd2UncmUgaW5cbiAgICAgICAgY29uc3QgcyA9ICh4ICsgeSArIHopICogRjM7IC8vIFZlcnkgbmljZSBhbmQgc2ltcGxlIHNrZXcgZmFjdG9yIGZvciAzRFxuICAgICAgICBjb25zdCBpID0gTWF0aC5mbG9vcih4ICsgcyk7XG4gICAgICAgIGNvbnN0IGogPSBNYXRoLmZsb29yKHkgKyBzKTtcbiAgICAgICAgY29uc3QgayA9IE1hdGguZmxvb3IoeiArIHMpO1xuICAgICAgICBjb25zdCB0ID0gKGkgKyBqICsgaykgKiBHMztcbiAgICAgICAgY29uc3QgWDAgPSBpIC0gdDsgLy8gVW5za2V3IHRoZSBjZWxsIG9yaWdpbiBiYWNrIHRvICh4LHkseikgc3BhY2VcbiAgICAgICAgY29uc3QgWTAgPSBqIC0gdDtcbiAgICAgICAgY29uc3QgWjAgPSBrIC0gdDtcbiAgICAgICAgY29uc3QgeDAgPSB4IC0gWDA7IC8vIFRoZSB4LHkseiBkaXN0YW5jZXMgZnJvbSB0aGUgY2VsbCBvcmlnaW5cbiAgICAgICAgY29uc3QgeTAgPSB5IC0gWTA7XG4gICAgICAgIGNvbnN0IHowID0geiAtIFowO1xuICAgICAgICAvLyBGb3IgdGhlIDNEIGNhc2UsIHRoZSBzaW1wbGV4IHNoYXBlIGlzIGEgc2xpZ2h0bHkgaXJyZWd1bGFyIHRldHJhaGVkcm9uLlxuICAgICAgICAvLyBEZXRlcm1pbmUgd2hpY2ggc2ltcGxleCB3ZSBhcmUgaW4uXG4gICAgICAgIGxldCBpMSwgajEsIGsxOyAvLyBPZmZzZXRzIGZvciBzZWNvbmQgY29ybmVyIG9mIHNpbXBsZXggaW4gKGksaixrKSBjb29yZHNcbiAgICAgICAgbGV0IGkyLCBqMiwgazI7IC8vIE9mZnNldHMgZm9yIHRoaXJkIGNvcm5lciBvZiBzaW1wbGV4IGluIChpLGosaykgY29vcmRzXG4gICAgICAgIGlmICh4MCA+PSB5MCkge1xuICAgICAgICAgICAgaWYgKHkwID49IHowKSB7XG4gICAgICAgICAgICAgICAgaTEgPSAxO1xuICAgICAgICAgICAgICAgIGoxID0gMDtcbiAgICAgICAgICAgICAgICBrMSA9IDA7XG4gICAgICAgICAgICAgICAgaTIgPSAxO1xuICAgICAgICAgICAgICAgIGoyID0gMTtcbiAgICAgICAgICAgICAgICBrMiA9IDA7XG4gICAgICAgICAgICB9IC8vIFggWSBaIG9yZGVyXG4gICAgICAgICAgICBlbHNlIGlmICh4MCA+PSB6MCkge1xuICAgICAgICAgICAgICAgIGkxID0gMTtcbiAgICAgICAgICAgICAgICBqMSA9IDA7XG4gICAgICAgICAgICAgICAgazEgPSAwO1xuICAgICAgICAgICAgICAgIGkyID0gMTtcbiAgICAgICAgICAgICAgICBqMiA9IDA7XG4gICAgICAgICAgICAgICAgazIgPSAxO1xuICAgICAgICAgICAgfSAvLyBYIFogWSBvcmRlclxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaTEgPSAwO1xuICAgICAgICAgICAgICAgIGoxID0gMDtcbiAgICAgICAgICAgICAgICBrMSA9IDE7XG4gICAgICAgICAgICAgICAgaTIgPSAxO1xuICAgICAgICAgICAgICAgIGoyID0gMDtcbiAgICAgICAgICAgICAgICBrMiA9IDE7XG4gICAgICAgICAgICB9IC8vIFogWCBZIG9yZGVyXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7IC8vIHgwPHkwXG4gICAgICAgICAgICBpZiAoeTAgPCB6MCkge1xuICAgICAgICAgICAgICAgIGkxID0gMDtcbiAgICAgICAgICAgICAgICBqMSA9IDA7XG4gICAgICAgICAgICAgICAgazEgPSAxO1xuICAgICAgICAgICAgICAgIGkyID0gMDtcbiAgICAgICAgICAgICAgICBqMiA9IDE7XG4gICAgICAgICAgICAgICAgazIgPSAxO1xuICAgICAgICAgICAgfSAvLyBaIFkgWCBvcmRlclxuICAgICAgICAgICAgZWxzZSBpZiAoeDAgPCB6MCkge1xuICAgICAgICAgICAgICAgIGkxID0gMDtcbiAgICAgICAgICAgICAgICBqMSA9IDE7XG4gICAgICAgICAgICAgICAgazEgPSAwO1xuICAgICAgICAgICAgICAgIGkyID0gMDtcbiAgICAgICAgICAgICAgICBqMiA9IDE7XG4gICAgICAgICAgICAgICAgazIgPSAxO1xuICAgICAgICAgICAgfSAvLyBZIFogWCBvcmRlclxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaTEgPSAwO1xuICAgICAgICAgICAgICAgIGoxID0gMTtcbiAgICAgICAgICAgICAgICBrMSA9IDA7XG4gICAgICAgICAgICAgICAgaTIgPSAxO1xuICAgICAgICAgICAgICAgIGoyID0gMTtcbiAgICAgICAgICAgICAgICBrMiA9IDA7XG4gICAgICAgICAgICB9IC8vIFkgWCBaIG9yZGVyXG4gICAgICAgIH1cbiAgICAgICAgLy8gQSBzdGVwIG9mICgxLDAsMCkgaW4gKGksaixrKSBtZWFucyBhIHN0ZXAgb2YgKDEtYywtYywtYykgaW4gKHgseSx6KSxcbiAgICAgICAgLy8gYSBzdGVwIG9mICgwLDEsMCkgaW4gKGksaixrKSBtZWFucyBhIHN0ZXAgb2YgKC1jLDEtYywtYykgaW4gKHgseSx6KSwgYW5kXG4gICAgICAgIC8vIGEgc3RlcCBvZiAoMCwwLDEpIGluIChpLGosaykgbWVhbnMgYSBzdGVwIG9mICgtYywtYywxLWMpIGluICh4LHkseiksIHdoZXJlXG4gICAgICAgIC8vIGMgPSAxLzYuXG4gICAgICAgIGNvbnN0IHgxID0geDAgLSBpMSArIEczOyAvLyBPZmZzZXRzIGZvciBzZWNvbmQgY29ybmVyIGluICh4LHkseikgY29vcmRzXG4gICAgICAgIGNvbnN0IHkxID0geTAgLSBqMSArIEczO1xuICAgICAgICBjb25zdCB6MSA9IHowIC0gazEgKyBHMztcbiAgICAgICAgY29uc3QgeDIgPSB4MCAtIGkyICsgMi4wICogRzM7IC8vIE9mZnNldHMgZm9yIHRoaXJkIGNvcm5lciBpbiAoeCx5LHopIGNvb3Jkc1xuICAgICAgICBjb25zdCB5MiA9IHkwIC0gajIgKyAyLjAgKiBHMztcbiAgICAgICAgY29uc3QgejIgPSB6MCAtIGsyICsgMi4wICogRzM7XG4gICAgICAgIGNvbnN0IHgzID0geDAgLSAxLjAgKyAzLjAgKiBHMzsgLy8gT2Zmc2V0cyBmb3IgbGFzdCBjb3JuZXIgaW4gKHgseSx6KSBjb29yZHNcbiAgICAgICAgY29uc3QgeTMgPSB5MCAtIDEuMCArIDMuMCAqIEczO1xuICAgICAgICBjb25zdCB6MyA9IHowIC0gMS4wICsgMy4wICogRzM7XG4gICAgICAgIC8vIFdvcmsgb3V0IHRoZSBoYXNoZWQgZ3JhZGllbnQgaW5kaWNlcyBvZiB0aGUgZm91ciBzaW1wbGV4IGNvcm5lcnNcbiAgICAgICAgY29uc3QgaWkgPSBpICYgMjU1O1xuICAgICAgICBjb25zdCBqaiA9IGogJiAyNTU7XG4gICAgICAgIGNvbnN0IGtrID0gayAmIDI1NTtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjb250cmlidXRpb24gZnJvbSB0aGUgZm91ciBjb3JuZXJzXG4gICAgICAgIGxldCB0MCA9IDAuNiAtIHgwICogeDAgLSB5MCAqIHkwIC0gejAgKiB6MDtcbiAgICAgICAgaWYgKHQwIDwgMClcbiAgICAgICAgICAgIG4wID0gMC4wO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGdpMCA9IHBlcm1Nb2QxMltpaSArIHBlcm1bamogKyBwZXJtW2trXV1dICogMztcbiAgICAgICAgICAgIHQwICo9IHQwO1xuICAgICAgICAgICAgbjAgPSB0MCAqIHQwICogKGdyYWQzW2dpMF0gKiB4MCArIGdyYWQzW2dpMCArIDFdICogeTAgKyBncmFkM1tnaTAgKyAyXSAqIHowKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdDEgPSAwLjYgLSB4MSAqIHgxIC0geTEgKiB5MSAtIHoxICogejE7XG4gICAgICAgIGlmICh0MSA8IDApXG4gICAgICAgICAgICBuMSA9IDAuMDtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBnaTEgPSBwZXJtTW9kMTJbaWkgKyBpMSArIHBlcm1bamogKyBqMSArIHBlcm1ba2sgKyBrMV1dXSAqIDM7XG4gICAgICAgICAgICB0MSAqPSB0MTtcbiAgICAgICAgICAgIG4xID0gdDEgKiB0MSAqIChncmFkM1tnaTFdICogeDEgKyBncmFkM1tnaTEgKyAxXSAqIHkxICsgZ3JhZDNbZ2kxICsgMl0gKiB6MSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHQyID0gMC42IC0geDIgKiB4MiAtIHkyICogeTIgLSB6MiAqIHoyO1xuICAgICAgICBpZiAodDIgPCAwKVxuICAgICAgICAgICAgbjIgPSAwLjA7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZ2kyID0gcGVybU1vZDEyW2lpICsgaTIgKyBwZXJtW2pqICsgajIgKyBwZXJtW2trICsgazJdXV0gKiAzO1xuICAgICAgICAgICAgdDIgKj0gdDI7XG4gICAgICAgICAgICBuMiA9IHQyICogdDIgKiAoZ3JhZDNbZ2kyXSAqIHgyICsgZ3JhZDNbZ2kyICsgMV0gKiB5MiArIGdyYWQzW2dpMiArIDJdICogejIpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0MyA9IDAuNiAtIHgzICogeDMgLSB5MyAqIHkzIC0gejMgKiB6MztcbiAgICAgICAgaWYgKHQzIDwgMClcbiAgICAgICAgICAgIG4zID0gMC4wO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGdpMyA9IHBlcm1Nb2QxMltpaSArIDEgKyBwZXJtW2pqICsgMSArIHBlcm1ba2sgKyAxXV1dICogMztcbiAgICAgICAgICAgIHQzICo9IHQzO1xuICAgICAgICAgICAgbjMgPSB0MyAqIHQzICogKGdyYWQzW2dpM10gKiB4MyArIGdyYWQzW2dpMyArIDFdICogeTMgKyBncmFkM1tnaTMgKyAyXSAqIHozKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBZGQgY29udHJpYnV0aW9ucyBmcm9tIGVhY2ggY29ybmVyIHRvIGdldCB0aGUgZmluYWwgbm9pc2UgdmFsdWUuXG4gICAgICAgIC8vIFRoZSByZXN1bHQgaXMgc2NhbGVkIHRvIHN0YXkganVzdCBpbnNpZGUgWy0xLDFdXG4gICAgICAgIHJldHVybiAzMi4wICogKG4wICsgbjEgKyBuMiArIG4zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2FtcGxlcyB0aGUgbm9pc2UgZmllbGQgaW4gNCBkaW1lbnNpb25zXG4gICAgICogQHBhcmFtIHhcbiAgICAgKiBAcGFyYW0geVxuICAgICAqIEBwYXJhbSB6XG4gICAgICogQHJldHVybnMgYSBudW1iZXIgaW4gdGhlIGludGVydmFsIFstMSwgMV1cbiAgICAgKi9cbiAgICBub2lzZTREKHgsIHksIHosIHcpIHtcbiAgICAgICAgY29uc3QgcGVybSA9IHRoaXMucGVybTtcbiAgICAgICAgbGV0IG4wLCBuMSwgbjIsIG4zLCBuNDsgLy8gTm9pc2UgY29udHJpYnV0aW9ucyBmcm9tIHRoZSBmaXZlIGNvcm5lcnNcbiAgICAgICAgLy8gU2tldyB0aGUgKHgseSx6LHcpIHNwYWNlIHRvIGRldGVybWluZSB3aGljaCBjZWxsIG9mIDI0IHNpbXBsaWNlcyB3ZSdyZSBpblxuICAgICAgICBjb25zdCBzID0gKHggKyB5ICsgeiArIHcpICogRjQ7IC8vIEZhY3RvciBmb3IgNEQgc2tld2luZ1xuICAgICAgICBjb25zdCBpID0gTWF0aC5mbG9vcih4ICsgcyk7XG4gICAgICAgIGNvbnN0IGogPSBNYXRoLmZsb29yKHkgKyBzKTtcbiAgICAgICAgY29uc3QgayA9IE1hdGguZmxvb3IoeiArIHMpO1xuICAgICAgICBjb25zdCBsID0gTWF0aC5mbG9vcih3ICsgcyk7XG4gICAgICAgIGNvbnN0IHQgPSAoaSArIGogKyBrICsgbCkgKiBHNDsgLy8gRmFjdG9yIGZvciA0RCB1bnNrZXdpbmdcbiAgICAgICAgY29uc3QgWDAgPSBpIC0gdDsgLy8gVW5za2V3IHRoZSBjZWxsIG9yaWdpbiBiYWNrIHRvICh4LHkseix3KSBzcGFjZVxuICAgICAgICBjb25zdCBZMCA9IGogLSB0O1xuICAgICAgICBjb25zdCBaMCA9IGsgLSB0O1xuICAgICAgICBjb25zdCBXMCA9IGwgLSB0O1xuICAgICAgICBjb25zdCB4MCA9IHggLSBYMDsgLy8gVGhlIHgseSx6LHcgZGlzdGFuY2VzIGZyb20gdGhlIGNlbGwgb3JpZ2luXG4gICAgICAgIGNvbnN0IHkwID0geSAtIFkwO1xuICAgICAgICBjb25zdCB6MCA9IHogLSBaMDtcbiAgICAgICAgY29uc3QgdzAgPSB3IC0gVzA7XG4gICAgICAgIC8vIEZvciB0aGUgNEQgY2FzZSwgdGhlIHNpbXBsZXggaXMgYSA0RCBzaGFwZSBJIHdvbid0IGV2ZW4gdHJ5IHRvIGRlc2NyaWJlLlxuICAgICAgICAvLyBUbyBmaW5kIG91dCB3aGljaCBvZiB0aGUgMjQgcG9zc2libGUgc2ltcGxpY2VzIHdlJ3JlIGluLCB3ZSBuZWVkIHRvXG4gICAgICAgIC8vIGRldGVybWluZSB0aGUgbWFnbml0dWRlIG9yZGVyaW5nIG9mIHgwLCB5MCwgejAgYW5kIHcwLlxuICAgICAgICAvLyBTaXggcGFpci13aXNlIGNvbXBhcmlzb25zIGFyZSBwZXJmb3JtZWQgYmV0d2VlbiBlYWNoIHBvc3NpYmxlIHBhaXJcbiAgICAgICAgLy8gb2YgdGhlIGZvdXIgY29vcmRpbmF0ZXMsIGFuZCB0aGUgcmVzdWx0cyBhcmUgdXNlZCB0byByYW5rIHRoZSBudW1iZXJzLlxuICAgICAgICBsZXQgcmFua3ggPSAwO1xuICAgICAgICBsZXQgcmFua3kgPSAwO1xuICAgICAgICBsZXQgcmFua3ogPSAwO1xuICAgICAgICBsZXQgcmFua3cgPSAwO1xuICAgICAgICBpZiAoeDAgPiB5MClcbiAgICAgICAgICAgIHJhbmt4Kys7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJhbmt5Kys7XG4gICAgICAgIGlmICh4MCA+IHowKVxuICAgICAgICAgICAgcmFua3grKztcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmFua3orKztcbiAgICAgICAgaWYgKHgwID4gdzApXG4gICAgICAgICAgICByYW5reCsrO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByYW5rdysrO1xuICAgICAgICBpZiAoeTAgPiB6MClcbiAgICAgICAgICAgIHJhbmt5Kys7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJhbmt6Kys7XG4gICAgICAgIGlmICh5MCA+IHcwKVxuICAgICAgICAgICAgcmFua3krKztcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmFua3crKztcbiAgICAgICAgaWYgKHowID4gdzApXG4gICAgICAgICAgICByYW5reisrO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByYW5rdysrO1xuICAgICAgICAvLyBzaW1wbGV4W2NdIGlzIGEgNC12ZWN0b3Igd2l0aCB0aGUgbnVtYmVycyAwLCAxLCAyIGFuZCAzIGluIHNvbWUgb3JkZXIuXG4gICAgICAgIC8vIE1hbnkgdmFsdWVzIG9mIGMgd2lsbCBuZXZlciBvY2N1ciwgc2luY2UgZS5nLiB4Pnk+ej53IG1ha2VzIHg8eiwgeTx3IGFuZCB4PHdcbiAgICAgICAgLy8gaW1wb3NzaWJsZS4gT25seSB0aGUgMjQgaW5kaWNlcyB3aGljaCBoYXZlIG5vbi16ZXJvIGVudHJpZXMgbWFrZSBhbnkgc2Vuc2UuXG4gICAgICAgIC8vIFdlIHVzZSBhIHRocmVzaG9sZGluZyB0byBzZXQgdGhlIGNvb3JkaW5hdGVzIGluIHR1cm4gZnJvbSB0aGUgbGFyZ2VzdCBtYWduaXR1ZGUuXG4gICAgICAgIC8vIFJhbmsgMyBkZW5vdGVzIHRoZSBsYXJnZXN0IGNvb3JkaW5hdGUuXG4gICAgICAgIC8vIFJhbmsgMiBkZW5vdGVzIHRoZSBzZWNvbmQgbGFyZ2VzdCBjb29yZGluYXRlLlxuICAgICAgICAvLyBSYW5rIDEgZGVub3RlcyB0aGUgc2Vjb25kIHNtYWxsZXN0IGNvb3JkaW5hdGUuXG4gICAgICAgIC8vIFRoZSBpbnRlZ2VyIG9mZnNldHMgZm9yIHRoZSBzZWNvbmQgc2ltcGxleCBjb3JuZXJcbiAgICAgICAgY29uc3QgaTEgPSByYW5reCA+PSAzID8gMSA6IDA7XG4gICAgICAgIGNvbnN0IGoxID0gcmFua3kgPj0gMyA/IDEgOiAwO1xuICAgICAgICBjb25zdCBrMSA9IHJhbmt6ID49IDMgPyAxIDogMDtcbiAgICAgICAgY29uc3QgbDEgPSByYW5rdyA+PSAzID8gMSA6IDA7XG4gICAgICAgIC8vIFRoZSBpbnRlZ2VyIG9mZnNldHMgZm9yIHRoZSB0aGlyZCBzaW1wbGV4IGNvcm5lclxuICAgICAgICBjb25zdCBpMiA9IHJhbmt4ID49IDIgPyAxIDogMDtcbiAgICAgICAgY29uc3QgajIgPSByYW5reSA+PSAyID8gMSA6IDA7XG4gICAgICAgIGNvbnN0IGsyID0gcmFua3ogPj0gMiA/IDEgOiAwO1xuICAgICAgICBjb25zdCBsMiA9IHJhbmt3ID49IDIgPyAxIDogMDtcbiAgICAgICAgLy8gVGhlIGludGVnZXIgb2Zmc2V0cyBmb3IgdGhlIGZvdXJ0aCBzaW1wbGV4IGNvcm5lclxuICAgICAgICBjb25zdCBpMyA9IHJhbmt4ID49IDEgPyAxIDogMDtcbiAgICAgICAgY29uc3QgajMgPSByYW5reSA+PSAxID8gMSA6IDA7XG4gICAgICAgIGNvbnN0IGszID0gcmFua3ogPj0gMSA/IDEgOiAwO1xuICAgICAgICBjb25zdCBsMyA9IHJhbmt3ID49IDEgPyAxIDogMDtcbiAgICAgICAgLy8gVGhlIGZpZnRoIGNvcm5lciBoYXMgYWxsIGNvb3JkaW5hdGUgb2Zmc2V0cyA9IDEsIHNvIG5vIG5lZWQgdG8gY29tcHV0ZSB0aGF0LlxuICAgICAgICBjb25zdCB4MSA9IHgwIC0gaTEgKyBHNDsgLy8gT2Zmc2V0cyBmb3Igc2Vjb25kIGNvcm5lciBpbiAoeCx5LHosdykgY29vcmRzXG4gICAgICAgIGNvbnN0IHkxID0geTAgLSBqMSArIEc0O1xuICAgICAgICBjb25zdCB6MSA9IHowIC0gazEgKyBHNDtcbiAgICAgICAgY29uc3QgdzEgPSB3MCAtIGwxICsgRzQ7XG4gICAgICAgIGNvbnN0IHgyID0geDAgLSBpMiArIDIuMCAqIEc0OyAvLyBPZmZzZXRzIGZvciB0aGlyZCBjb3JuZXIgaW4gKHgseSx6LHcpIGNvb3Jkc1xuICAgICAgICBjb25zdCB5MiA9IHkwIC0gajIgKyAyLjAgKiBHNDtcbiAgICAgICAgY29uc3QgejIgPSB6MCAtIGsyICsgMi4wICogRzQ7XG4gICAgICAgIGNvbnN0IHcyID0gdzAgLSBsMiArIDIuMCAqIEc0O1xuICAgICAgICBjb25zdCB4MyA9IHgwIC0gaTMgKyAzLjAgKiBHNDsgLy8gT2Zmc2V0cyBmb3IgZm91cnRoIGNvcm5lciBpbiAoeCx5LHosdykgY29vcmRzXG4gICAgICAgIGNvbnN0IHkzID0geTAgLSBqMyArIDMuMCAqIEc0O1xuICAgICAgICBjb25zdCB6MyA9IHowIC0gazMgKyAzLjAgKiBHNDtcbiAgICAgICAgY29uc3QgdzMgPSB3MCAtIGwzICsgMy4wICogRzQ7XG4gICAgICAgIGNvbnN0IHg0ID0geDAgLSAxLjAgKyA0LjAgKiBHNDsgLy8gT2Zmc2V0cyBmb3IgbGFzdCBjb3JuZXIgaW4gKHgseSx6LHcpIGNvb3Jkc1xuICAgICAgICBjb25zdCB5NCA9IHkwIC0gMS4wICsgNC4wICogRzQ7XG4gICAgICAgIGNvbnN0IHo0ID0gejAgLSAxLjAgKyA0LjAgKiBHNDtcbiAgICAgICAgY29uc3QgdzQgPSB3MCAtIDEuMCArIDQuMCAqIEc0O1xuICAgICAgICAvLyBXb3JrIG91dCB0aGUgaGFzaGVkIGdyYWRpZW50IGluZGljZXMgb2YgdGhlIGZpdmUgc2ltcGxleCBjb3JuZXJzXG4gICAgICAgIGNvbnN0IGlpID0gaSAmIDI1NTtcbiAgICAgICAgY29uc3QgamogPSBqICYgMjU1O1xuICAgICAgICBjb25zdCBrayA9IGsgJiAyNTU7XG4gICAgICAgIGNvbnN0IGxsID0gbCAmIDI1NTtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjb250cmlidXRpb24gZnJvbSB0aGUgZml2ZSBjb3JuZXJzXG4gICAgICAgIGxldCB0MCA9IDAuNiAtIHgwICogeDAgLSB5MCAqIHkwIC0gejAgKiB6MCAtIHcwICogdzA7XG4gICAgICAgIGlmICh0MCA8IDApXG4gICAgICAgICAgICBuMCA9IDAuMDtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBnaTAgPSAocGVybVtpaSArIHBlcm1bamogKyBwZXJtW2trICsgcGVybVtsbF1dXV0gJSAzMikgKiA0O1xuICAgICAgICAgICAgdDAgKj0gdDA7XG4gICAgICAgICAgICBuMCA9IHQwICogdDAgKiAoZ3JhZDRbZ2kwXSAqIHgwICsgZ3JhZDRbZ2kwICsgMV0gKiB5MCArIGdyYWQ0W2dpMCArIDJdICogejAgKyBncmFkNFtnaTAgKyAzXSAqIHcwKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdDEgPSAwLjYgLSB4MSAqIHgxIC0geTEgKiB5MSAtIHoxICogejEgLSB3MSAqIHcxO1xuICAgICAgICBpZiAodDEgPCAwKVxuICAgICAgICAgICAgbjEgPSAwLjA7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZ2kxID0gKHBlcm1baWkgKyBpMSArIHBlcm1bamogKyBqMSArIHBlcm1ba2sgKyBrMSArIHBlcm1bbGwgKyBsMV1dXV0gJSAzMikgKiA0O1xuICAgICAgICAgICAgdDEgKj0gdDE7XG4gICAgICAgICAgICBuMSA9IHQxICogdDEgKiAoZ3JhZDRbZ2kxXSAqIHgxICsgZ3JhZDRbZ2kxICsgMV0gKiB5MSArIGdyYWQ0W2dpMSArIDJdICogejEgKyBncmFkNFtnaTEgKyAzXSAqIHcxKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdDIgPSAwLjYgLSB4MiAqIHgyIC0geTIgKiB5MiAtIHoyICogejIgLSB3MiAqIHcyO1xuICAgICAgICBpZiAodDIgPCAwKVxuICAgICAgICAgICAgbjIgPSAwLjA7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZ2kyID0gKHBlcm1baWkgKyBpMiArIHBlcm1bamogKyBqMiArIHBlcm1ba2sgKyBrMiArIHBlcm1bbGwgKyBsMl1dXV0gJSAzMikgKiA0O1xuICAgICAgICAgICAgdDIgKj0gdDI7XG4gICAgICAgICAgICBuMiA9IHQyICogdDIgKiAoZ3JhZDRbZ2kyXSAqIHgyICsgZ3JhZDRbZ2kyICsgMV0gKiB5MiArIGdyYWQ0W2dpMiArIDJdICogejIgKyBncmFkNFtnaTIgKyAzXSAqIHcyKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdDMgPSAwLjYgLSB4MyAqIHgzIC0geTMgKiB5MyAtIHozICogejMgLSB3MyAqIHczO1xuICAgICAgICBpZiAodDMgPCAwKVxuICAgICAgICAgICAgbjMgPSAwLjA7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZ2kzID0gKHBlcm1baWkgKyBpMyArIHBlcm1bamogKyBqMyArIHBlcm1ba2sgKyBrMyArIHBlcm1bbGwgKyBsM11dXV0gJSAzMikgKiA0O1xuICAgICAgICAgICAgdDMgKj0gdDM7XG4gICAgICAgICAgICBuMyA9IHQzICogdDMgKiAoZ3JhZDRbZ2kzXSAqIHgzICsgZ3JhZDRbZ2kzICsgMV0gKiB5MyArIGdyYWQ0W2dpMyArIDJdICogejMgKyBncmFkNFtnaTMgKyAzXSAqIHczKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdDQgPSAwLjYgLSB4NCAqIHg0IC0geTQgKiB5NCAtIHo0ICogejQgLSB3NCAqIHc0O1xuICAgICAgICBpZiAodDQgPCAwKVxuICAgICAgICAgICAgbjQgPSAwLjA7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZ2k0ID0gKHBlcm1baWkgKyAxICsgcGVybVtqaiArIDEgKyBwZXJtW2trICsgMSArIHBlcm1bbGwgKyAxXV1dXSAlIDMyKSAqIDQ7XG4gICAgICAgICAgICB0NCAqPSB0NDtcbiAgICAgICAgICAgIG40ID0gdDQgKiB0NCAqIChncmFkNFtnaTRdICogeDQgKyBncmFkNFtnaTQgKyAxXSAqIHk0ICsgZ3JhZDRbZ2k0ICsgMl0gKiB6NCArIGdyYWQ0W2dpNCArIDNdICogdzQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFN1bSB1cCBhbmQgc2NhbGUgdGhlIHJlc3VsdCB0byBjb3ZlciB0aGUgcmFuZ2UgWy0xLDFdXG4gICAgICAgIHJldHVybiAyNy4wICogKG4wICsgbjEgKyBuMiArIG4zICsgbjQpO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFNpbXBsZXhOb2lzZTtcbi8qKlxuICogQnVpbGRzIGEgcmFuZG9tIHBlcm11dGF0aW9uIHRhYmxlLlxuICogVGhpcyBpcyBleHBvcnRlZCBvbmx5IGZvciAoaW50ZXJuYWwpIHRlc3RpbmcgcHVycG9zZXMuXG4gKiBEbyBub3QgcmVseSBvbiB0aGlzIGV4cG9ydC5cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFBlcm11dGF0aW9uVGFibGUocmFuZG9tKSB7XG4gICAgY29uc3QgcCA9IG5ldyBVaW50OEFycmF5KDI1Nik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7IGkrKykge1xuICAgICAgICBwW2ldID0gaTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyNTU7IGkrKykge1xuICAgICAgICBjb25zdCByID0gaSArIH5+KHJhbmRvbSgpICogKDI1NiAtIGkpKTtcbiAgICAgICAgY29uc3QgYXV4ID0gcFtpXTtcbiAgICAgICAgcFtpXSA9IHBbcl07XG4gICAgICAgIHBbcl0gPSBhdXg7XG4gICAgfVxuICAgIHJldHVybiBwO1xufVxuLypcblRoZSBBTEVBIFBSTkcgYW5kIG1hc2hlciBjb2RlIHVzZWQgYnkgc2ltcGxleC1ub2lzZS5qc1xuaXMgYmFzZWQgb24gY29kZSBieSBKb2hhbm5lcyBCYWFnw7hlLCBtb2RpZmllZCBieSBKb25hcyBXYWduZXIuXG5TZWUgYWxlYS5tZCBmb3IgdGhlIGZ1bGwgbGljZW5zZS5cbiovXG5mdW5jdGlvbiBhbGVhKHNlZWQpIHtcbiAgICBsZXQgczAgPSAwO1xuICAgIGxldCBzMSA9IDA7XG4gICAgbGV0IHMyID0gMDtcbiAgICBsZXQgYyA9IDE7XG4gICAgY29uc3QgbWFzaCA9IG1hc2hlcigpO1xuICAgIHMwID0gbWFzaCgnICcpO1xuICAgIHMxID0gbWFzaCgnICcpO1xuICAgIHMyID0gbWFzaCgnICcpO1xuICAgIHMwIC09IG1hc2goc2VlZCk7XG4gICAgaWYgKHMwIDwgMCkge1xuICAgICAgICBzMCArPSAxO1xuICAgIH1cbiAgICBzMSAtPSBtYXNoKHNlZWQpO1xuICAgIGlmIChzMSA8IDApIHtcbiAgICAgICAgczEgKz0gMTtcbiAgICB9XG4gICAgczIgLT0gbWFzaChzZWVkKTtcbiAgICBpZiAoczIgPCAwKSB7XG4gICAgICAgIHMyICs9IDE7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHQgPSAyMDkxNjM5ICogczAgKyBjICogMi4zMjgzMDY0MzY1Mzg2OTYzZS0xMDsgLy8gMl4tMzJcbiAgICAgICAgczAgPSBzMTtcbiAgICAgICAgczEgPSBzMjtcbiAgICAgICAgcmV0dXJuIHMyID0gdCAtIChjID0gdCB8IDApO1xuICAgIH07XG59XG5mdW5jdGlvbiBtYXNoZXIoKSB7XG4gICAgbGV0IG4gPSAweGVmYzgyNDlkO1xuICAgIHJldHVybiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBkYXRhID0gZGF0YS50b1N0cmluZygpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG4gKz0gZGF0YS5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAgICAgbGV0IGggPSAwLjAyNTE5NjAzMjgyNDE2OTM4ICogbjtcbiAgICAgICAgICAgIG4gPSBoID4+PiAwO1xuICAgICAgICAgICAgaCAtPSBuO1xuICAgICAgICAgICAgaCAqPSBuO1xuICAgICAgICAgICAgbiA9IGggPj4+IDA7XG4gICAgICAgICAgICBoIC09IG47XG4gICAgICAgICAgICBuICs9IGggKiAweDEwMDAwMDAwMDsgLy8gMl4zMlxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAobiA+Pj4gMCkgKiAyLjMyODMwNjQzNjUzODY5NjNlLTEwOyAvLyAyXi0zMlxuICAgIH07XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zaW1wbGV4LW5vaXNlLmpzLm1hcCIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYXN5bmMgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnUgPSAoY2h1bmtJZCkgPT4ge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIFwiXCIgKyBjaHVua0lkICsgXCIuYnVuZGxlLmpzXCI7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCIvKipcbmltcG9ydCB7IGNyZWF0ZUVudGl0aWVzLCBjcmVhdGVDb21wb25lbnRzLCBDb21wb25lbnRzLCBFbnRpdHksIFN0YXRpY1JlbmRlck9iamVjdENvbXBvbmVudCB9IGZyb20gJy4vc3RhdGUnO1xuaW1wb3J0IHsgY3JlYXRlU3lzdGVtcywgYWRkU3lzdGVtLCBkaXNwYXRjaF9ldmVudCwgU3lzdGVtIH0gZnJvbSAnLi9zeXN0ZW0nO1xuaW1wb3J0IHsgY3JlYXRlUGxheWVyLCBQbGF5ZXIsIHByb2plY3Rpb25NYXRyaXgsIGZyZWVDYW1lcmFJbnB1dCB9IGZyb20gJy4vcGxheWVyJztcbmltcG9ydCB7IHJlbmRlclN0YXRpY09iamVjdHMgfSBmcm9tICcuL3JlbmRlcic7XG4qL1xuaW1wb3J0IHsgZGlzcGF0Y2ggfSBmcm9tICcuL2VuZ2luZS9zdGF0ZSc7XG5pbXBvcnQgeyBjcmVhdGVQcm9maWxlciwgdXBkYXRlUHJvZmlsZXIgfSBmcm9tICcuL2VuZ2luZS9wcm9maWxlcic7XG5pbXBvcnQgeyBjcmVhdGVXaW5kb3cgfSBmcm9tICcuL2VuZ2luZS93aW5kb3cnO1xuY29uc3QgY2FwdHVyZUlucHV0ID0gKGdsLCBzdGF0ZSkgPT4ge1xuICAgIHdpbmRvdy5vbmtleXVwID0gKGUpID0+IHtcbiAgICAgICAgc3RhdGUuYWN0aXZlSW5wdXQuZGVsZXRlKGUua2V5LnRvTG93ZXJDYXNlKCkpO1xuICAgIH07XG4gICAgd2luZG93Lm9ua2V5ZG93biA9IChlKSA9PiB7XG4gICAgICAgIHN0YXRlLmFjdGl2ZUlucHV0LmFkZChlLmtleS50b0xvd2VyQ2FzZSgpKTtcbiAgICB9O1xuICAgIGRvY3VtZW50Lm9ubW91c2Vtb3ZlID0gKGUpID0+IHtcbiAgICAgICAgc3RhdGUubW91c2VNb3ZlbWVudCA9IFtlLm1vdmVtZW50WCwgZS5tb3ZlbWVudFldO1xuICAgIH07XG4gICAgY29uc3QgbG9ja0NoYW5nZUFsZXJ0ID0gKCkgPT4ge1xuICAgICAgICBpZiAoZG9jdW1lbnQucG9pbnRlckxvY2tFbGVtZW50ID09PSBnbC5jYW52YXMpXG4gICAgICAgICAgICBzdGF0ZS5sb2NrID0gdHJ1ZTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgc3RhdGUubG9jayA9IGZhbHNlO1xuICAgIH07XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmxvY2tjaGFuZ2UnLCBsb2NrQ2hhbmdlQWxlcnQsIGZhbHNlKTtcbiAgICByZXR1cm4gc3RhdGU7XG59O1xuY29uc3QgbWFpbiA9ICgpID0+IHtcbiAgICBpZiAoIWNyb3NzT3JpZ2luSXNvbGF0ZWQpIHtcbiAgICAgICAgYWxlcnQoXCJTaGFyZWRBcnJheUJ1ZmZlciBub3QgZW5hYmxlZCEgV2lsbCBub3QgZnVuY3Rpb24uXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGdsID0gY3JlYXRlV2luZG93KCk7XG4gICAgbGV0IHByb2ZpbGVyID0gY3JlYXRlUHJvZmlsZXIodHJ1ZSk7IC8vIGJvb2xlYW4gcGFyYW1ldGVyOiBwcmludCBvciBub3RcbiAgICAvLyBsZXQgZGlzcGF0Y2hQcm9maWxlciA9IGNyZWF0ZVByb2ZpbGVyKGZhbHNlKTtcbiAgICBsZXQgc3RhdGUgPSBjcmVhdGUoZ2wpO1xuICAgIHN0YXRlID0gY2FwdHVyZUlucHV0KGdsLCBzdGF0ZSk7XG4gICAgZG9jdW1lbnQub25jbGljayA9IChlKSA9PiB7XG4gICAgICAgIHN0YXRlID0gZGlzcGF0Y2goZ2wsIHN0YXRlLCBcImNsaWNrXCIsIDApKGUpO1xuICAgIH07XG4gICAgbGV0IHByZXZpb3VzVGltZSA9IC0xO1xuICAgIGNvbnN0IGdhbWVsb29wID0gKHRpbWUpID0+IHtcbiAgICAgICAgZ2wuY2xlYXIoZ2wuREVQVEhfQlVGRkVSX0JJVCB8IGdsLkNPTE9SX0JVRkZFUl9CSVQpO1xuICAgICAgICAvLyBjYWxjIGRlbHRhXG4gICAgICAgIGlmIChwcmV2aW91c1RpbWUgPT0gLTEpXG4gICAgICAgICAgICBwcmV2aW91c1RpbWUgPSB0aW1lO1xuICAgICAgICBjb25zdCBkZWx0YSA9ICh0aW1lIC0gcHJldmlvdXNUaW1lKSAqIDAuMDAxOyAvLyBpbiBzZWNvbmRzXG4gICAgICAgIC8vIGZsdXNoIGV2ZW50cywgbmVlZCB0byBmaWd1cmUgYSB3YXkgdG8gcGFzcyBldmVudCBkYXRhL2hvdyB0byBzdHJ1Y3R1cmUgZXZlbnQgZGF0YVxuICAgICAgICB3aGlsZSAoc3RhdGUucXVldWUubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gc3RhdGUucXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgIGlmIChldmVudCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgc3RhdGUgPSBkaXNwYXRjaChnbCwgc3RhdGUsIGV2ZW50LnR5cGUsIGRlbHRhKShldmVudC5kYXRhKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB1cGRhdGUgZnJhbWVcbiAgICAgICAgc3RhdGUgPSBkaXNwYXRjaChnbCwgc3RhdGUsIFwiaW5wdXRcIiwgZGVsdGEpKG51bGwpO1xuICAgICAgICBzdGF0ZSA9IGRpc3BhdGNoKGdsLCBzdGF0ZSwgXCJ0aWNrXCIsIGRlbHRhKShudWxsKTtcbiAgICAgICAgLy8gcHJvZmlsZSB0aGlzXG4gICAgICAgIC8vIGRpc3BhdGNoUHJvZmlsZXIgPSBzdGFydChkaXNwYXRjaFByb2ZpbGVyKTtcbiAgICAgICAgc3RhdGUgPSBkaXNwYXRjaChnbCwgc3RhdGUsIFwicmVuZGVyXCIsIGRlbHRhKShudWxsKTtcbiAgICAgICAgLy8gZGlzcGF0Y2hQcm9maWxlciA9IGVuZChkaXNwYXRjaFByb2ZpbGVyKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZGlzcGF0Y2hQcm9maWxlci5kZWx0YSk7XG4gICAgICAgIHByb2ZpbGVyID0gdXBkYXRlUHJvZmlsZXIocHJvZmlsZXIsIGRlbHRhKTtcbiAgICAgICAgcHJldmlvdXNUaW1lID0gdGltZTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWVsb29wKTtcbiAgICB9O1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShnYW1lbG9vcCk7XG59O1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBtYWluKTtcbmltcG9ydCB7IGluaXQgfSBmcm9tICcuL2V4YW1wbGUvaW5kZXgnO1xuY29uc3QgY3JlYXRlID0gKGdsKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coZGVzY3JpcHRpb24pO1xuICAgIC8qXG4gICAgY29uc3QgYXRsYXMgPSBcImF0bGFzLnBuZ1wiO1xuICAgIGNvbnN0IHBsYXllciA9IGNyZWF0ZVBsYXllcihnbCwgYXRsYXMpO1xuICBcbiAgICBjb25zdCBlbnRpdGllcyAgID0gY3JlYXRlRW50aXRpZXMoKTtcbiAgICBjb25zdCBjb21wb25lbnRzID0gY3JlYXRlQ29tcG9uZW50cygpO1xuICAgIGNvbnN0IHN5c3RlbXMgICAgPSBjcmVhdGVTeXN0ZW1zKCk7XG4gIFxuICAgIGluaXRNYXplKGdsLCBlbnRpdGllcywgY29tcG9uZW50cyk7XG4gIFxuICAgIGFkZFN5c3RlbShzeXN0ZW1zLCBcInJlbmRlclwiLCByZW5kZXJTdGF0aWNPYmplY3RzKTtcbiAgICBhZGRTeXN0ZW0oc3lzdGVtcywgXCJpbnB1dFwiLCAgZnJlZUNhbWVyYUlucHV0KTtcbiAgICAqL1xuICAgIHJldHVybiBpbml0KGdsKTtcbn07XG4vLyBUaGUgZm9sbG93aW5nIHdhcyBiZWZvcmUgdGhlIGNvbXBsZXRlIHJld3JpdGVcbmNvbnN0IGRlc2NyaXB0aW9uID0gYFxuU29tZSBpbmZvIGFib3V0IG15IHByb2plY3Q6XG5cbkNvbnRyb2xzIG1pbWljIG1pbmVjcmFmdCBjcmVhdGl2ZSBtb2RlLCBcbmp1c3QgY2xpY2sgaW4gdGhlIHdpbmRvdyBhbmQgdGhlbiB5b3UgXG5zaG91bGQgYmUgYWJsZSB0byBmbHkgYXJvdW5kLiBMZWZ0IGNsaWNraW5nIFxud2lsbCByZW1vdmUgYmxvY2tzIGluIGZyb250IG9mIHlvdSwgdXAgdG8gNSBcbmJsb2NrcyBhd2F5LlxuXG5UaGUgYXJlbmEgaXMgZ2VuZXJhdGVkIHJhbmRvbWx5IGVhY2ggdGltZSwgXG5zbyBpdCdsbCBiZSBkaWZmZXJlbnQgaWYgeW91IHJlZnJlc2ggdGhlIHBhZ2UuXG5cbkkgdXNlZCBhIHZlcnkgYmFzaWMgZWNzIHN5c3RlbSBhbmQgbGFpZCB0aGUgXG5ncm91bmR3b3JrIGZvciBhbiBldmVudCBzeXN0ZW0sIGJ1dCBkdWUgdG8gXG50aW1lIGNvbnN0cmFpbnRzIHRoZSBjb2RlIG1heSByZXNlbWJsZSBhIHBsYXRlXG5vZiBzcGFnaGV0dGkuXG5cbkkgY29kZWQgdGhpcyBpbiB0eXBlc2NyaXB0IGFuZCB1c2VkIHdlYnBhY2sgdG9cbmNvbXBpbGUgdGhlIHByb2plY3QgaW50byBhIHNpbXBsZSBidW5kbGUgZmlsZS5cbkkgdXNlZCBtYXRoLmdsL2NvcmUgc28gdGhhdCBJIGNvdWxkIHVzZSBwcmVkZWZpbmVkXG5WZWN0b3IzIGFuZCBNYXRyaXg0IGNsYXNzZXMsIHNwZWNpZmljYWxseSBmb3IgdGhlIFxubG9va0F0IGFuZCBwZXJzcGVjdGl2ZSBmdW5jdGlvbnMuXG5cblRoZSB0ZXh0dXJlIGF0bGFzIEkgdXNlZCBmb3IgdGhlIGJsb2NrcyBpcyB0YWtlblxuZnJvbSBUaGUgUGFpbnRlcmx5IFBhY2s6IGh0dHA6Ly9wYWludGVybHlwYWNrLm5ldC8uXG5cbkkndmUgYWxzbyB1cGxvYWRlZCB0aGlzIHByb2plY3QgdG8gbXkgZ2l0aHViIGluY2FzZSBcbkkgZGVjaWRlIHRvIHdvcmsgb24gaXQgZnVydGhlci5cbmA7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=