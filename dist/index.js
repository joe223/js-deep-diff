module.exports=function(e){var t={};function __webpack_require__(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,__webpack_require__),n.l=!0,n.exports}return __webpack_require__.m=e,__webpack_require__.c=t,__webpack_require__.d=function(e,t,r){__webpack_require__.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.t=function(e,t){if(1&t&&(e=__webpack_require__(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(__webpack_require__.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)__webpack_require__.d(r,n,function(t){return e[t]}.bind(null,n));return r},__webpack_require__.n=function(e){var t=e&&e.__esModule?function getDefault(){return e.default}:function getModuleExports(){return e};return __webpack_require__.d(t,"a",t),t},__webpack_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=0)}([function(e,t){const r=void 0;const n={Object(e,t,r=[],n=[]){new Set(Object.keys(e)).add(...Object.keys(t)).forEach(i=>{diff(e[i],t[i],r,n.concat([i]))})},Date(e,t,r=[],n=[]){e.getTime()!==t.getTime()&&r.push(new EditAction(n,e,t))},Number(e,t,r=[],n=[]){e.valueOf()!==t.valueOf()&&r.push(new EditAction(n,e,t))},String(e,t,r=[],n=[]){e.valueOf()!==t.valueOf()&&r.push(new EditAction(n,e,t))},Boolean(e,t,r=[],n=[]){e.valueOf()!==t.valueOf()&&r.push(new EditAction(n,e,t))},RegExp(e,t,r=[],n=[]){e.toString()!==t.toString()&&r.push(new EditAction(n,e,t))},Array(e,t,r=[],n=[]){const i=Math.max(e.length,t.length);for(let _=0;_<i;_++){let i=n.concat([_]);_<e.length?diff(e[_],t[_],r,i):r.push(new AddAction(i,e[_],t[_]))}}};function diff(e,t,i=[],_=[]){const o=type(e);return o!==type(t)?e===r?i.push(new AddAction(_,e,t)):t===r?i.push(new DeleteAction(_,e,t)):i.push(new EditAction(_,e,t)):"object"===o?function diffObject(e,t,r=[],i=[]){const _=realType(e);_!==realType(t)?r.push(new EditAction(i,e,t)):n[_]&&n[_](e,t,r,i)}(e,t,i,_):function diffPrimitive(e,t,r=[],n=[]){e!==t&&r.push(new EditAction(n,e,t))}(e,t,i,_),i}function type(e){return typeof e}function realType(e){return Object.prototype.toString.call(e).slice(8,-1)}class AddAction{constructor(e,t,r){this.type="ADD",this.path=e,this.lhs=t,this.rhs=r}}class EditAction{constructor(e,t,r){this.type="EDIT",this.path=e,this.lhs=t,this.rhs=r}}class DeleteAction{constructor(e,t,r){this.type="DEL",this.path=e,this.lhs=t,this.rhs=r}}e.exports=diff}]);
//# sourceMappingURL=index.js.map
