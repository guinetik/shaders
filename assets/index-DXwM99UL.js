const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ShaderDetailView-DIfFCC-A.js","assets/ShaderDetailView-DneXjzD-.css"])))=>i.map(i=>d[i]);
(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function t(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(o){if(o.ep)return;o.ep=!0;const a=t(o);fetch(o.href,a)}})();/**
* @vue/shared v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Mr(e){const n=Object.create(null);for(const t of e.split(","))n[t]=1;return t=>t in n}const ie={},Fn=[],rn=()=>{},ba=()=>!1,Gt=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),Hr=e=>e.startsWith("onUpdate:"),he=Object.assign,zr=(e,n)=>{const t=e.indexOf(n);t>-1&&e.splice(t,1)},Zi=Object.prototype.hasOwnProperty,ne=(e,n)=>Zi.call(e,n),F=Array.isArray,Gn=e=>xt(e)==="[object Map]",xa=e=>xt(e)==="[object Set]",co=e=>xt(e)==="[object Date]",V=e=>typeof e=="function",de=e=>typeof e=="string",on=e=>typeof e=="symbol",te=e=>e!==null&&typeof e=="object",wa=e=>(te(e)||V(e))&&V(e.then)&&V(e.catch),Sa=Object.prototype.toString,xt=e=>Sa.call(e),$i=e=>xt(e).slice(8,-1),Ea=e=>xt(e)==="[object Object]",Br=e=>de(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,rt=Mr(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Vt=e=>{const n=Object.create(null);return(t=>n[t]||(n[t]=e(t)))},Ji=/-\w/g,Ue=Vt(e=>e.replace(Ji,n=>n.slice(1).toUpperCase())),es=/\B([A-Z])/g,Mn=Vt(e=>e.replace(es,"-$1").toLowerCase()),Kt=Vt(e=>e.charAt(0).toUpperCase()+e.slice(1)),nr=Vt(e=>e?`on${Kt(e)}`:""),_n=(e,n)=>!Object.is(e,n),tr=(e,...n)=>{for(let t=0;t<e.length;t++)e[t](...n)},Ca=(e,n,t,r=!1)=>{Object.defineProperty(e,n,{configurable:!0,enumerable:!1,writable:r,value:t})},ns=e=>{const n=parseFloat(e);return isNaN(n)?e:n},ts=e=>{const n=de(e)?Number(e):NaN;return isNaN(n)?e:n};let fo;const Yt=()=>fo||(fo=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Ur(e){if(F(e)){const n={};for(let t=0;t<e.length;t++){const r=e[t],o=de(r)?is(r):Ur(r);if(o)for(const a in o)n[a]=o[a]}return n}else if(de(e)||te(e))return e}const rs=/;(?![^(]*\))/g,os=/:([^]+)/,as=/\/\*[^]*?\*\//g;function is(e){const n={};return e.replace(as,"").split(rs).forEach(t=>{if(t){const r=t.split(os);r.length>1&&(n[r[0].trim()]=r[1].trim())}}),n}function Yn(e){let n="";if(de(e))n=e;else if(F(e))for(let t=0;t<e.length;t++){const r=Yn(e[t]);r&&(n+=r+" ")}else if(te(e))for(const t in e)e[t]&&(n+=t+" ");return n.trim()}const ss="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",ls=Mr(ss);function Ta(e){return!!e||e===""}function cs(e,n){if(e.length!==n.length)return!1;let t=!0;for(let r=0;t&&r<e.length;r++)t=Fr(e[r],n[r]);return t}function Fr(e,n){if(e===n)return!0;let t=co(e),r=co(n);if(t||r)return t&&r?e.getTime()===n.getTime():!1;if(t=on(e),r=on(n),t||r)return e===n;if(t=F(e),r=F(n),t||r)return t&&r?cs(e,n):!1;if(t=te(e),r=te(n),t||r){if(!t||!r)return!1;const o=Object.keys(e).length,a=Object.keys(n).length;if(o!==a)return!1;for(const i in e){const s=e.hasOwnProperty(i),l=n.hasOwnProperty(i);if(s&&!l||!s&&l||!Fr(e[i],n[i]))return!1}}return String(e)===String(n)}const _a=e=>!!(e&&e.__v_isRef===!0),ot=e=>de(e)?e:e==null?"":F(e)||te(e)&&(e.toString===Sa||!V(e.toString))?_a(e)?ot(e.value):JSON.stringify(e,Aa,2):String(e),Aa=(e,n)=>_a(n)?Aa(e,n.value):Gn(n)?{[`Map(${n.size})`]:[...n.entries()].reduce((t,[r,o],a)=>(t[rr(r,a)+" =>"]=o,t),{})}:xa(n)?{[`Set(${n.size})`]:[...n.values()].map(t=>rr(t))}:on(n)?rr(n):te(n)&&!F(n)&&!Ea(n)?String(n):n,rr=(e,n="")=>{var t;return on(e)?`Symbol(${(t=e.description)!=null?t:n})`:e};/**
* @vue/reactivity v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let De;class fs{constructor(n=!1){this.detached=n,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.__v_skip=!0,this.parent=De,!n&&De&&(this.index=(De.scopes||(De.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let n,t;if(this.scopes)for(n=0,t=this.scopes.length;n<t;n++)this.scopes[n].pause();for(n=0,t=this.effects.length;n<t;n++)this.effects[n].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let n,t;if(this.scopes)for(n=0,t=this.scopes.length;n<t;n++)this.scopes[n].resume();for(n=0,t=this.effects.length;n<t;n++)this.effects[n].resume()}}run(n){if(this._active){const t=De;try{return De=this,n()}finally{De=t}}}on(){++this._on===1&&(this.prevScope=De,De=this)}off(){this._on>0&&--this._on===0&&(De=this.prevScope,this.prevScope=void 0)}stop(n){if(this._active){this._active=!1;let t,r;for(t=0,r=this.effects.length;t<r;t++)this.effects[t].stop();for(this.effects.length=0,t=0,r=this.cleanups.length;t<r;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,r=this.scopes.length;t<r;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!n){const o=this.parent.scopes.pop();o&&o!==this&&(this.parent.scopes[this.index]=o,o.index=this.index)}this.parent=void 0}}}function ds(){return De}let ae;const or=new WeakSet;class Ra{constructor(n){this.fn=n,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,De&&De.active&&De.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,or.has(this)&&(or.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Da(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,uo(this),Pa(this);const n=ae,t=Ve;ae=this,Ve=!0;try{return this.fn()}finally{Na(this),ae=n,Ve=t,this.flags&=-3}}stop(){if(this.flags&1){for(let n=this.deps;n;n=n.nextDep)Kr(n);this.deps=this.depsTail=void 0,uo(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?or.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){yr(this)&&this.run()}get dirty(){return yr(this)}}let Ia=0,at,it;function Da(e,n=!1){if(e.flags|=8,n){e.next=it,it=e;return}e.next=at,at=e}function Gr(){Ia++}function Vr(){if(--Ia>0)return;if(it){let n=it;for(it=void 0;n;){const t=n.next;n.next=void 0,n.flags&=-9,n=t}}let e;for(;at;){let n=at;for(at=void 0;n;){const t=n.next;if(n.next=void 0,n.flags&=-9,n.flags&1)try{n.trigger()}catch(r){e||(e=r)}n=t}}if(e)throw e}function Pa(e){for(let n=e.deps;n;n=n.nextDep)n.version=-1,n.prevActiveLink=n.dep.activeLink,n.dep.activeLink=n}function Na(e){let n,t=e.depsTail,r=t;for(;r;){const o=r.prevDep;r.version===-1?(r===t&&(t=o),Kr(r),us(r)):n=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=o}e.deps=n,e.depsTail=t}function yr(e){for(let n=e.deps;n;n=n.nextDep)if(n.dep.version!==n.version||n.dep.computed&&(La(n.dep.computed)||n.dep.version!==n.version))return!0;return!!e._dirty}function La(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===pt)||(e.globalVersion=pt,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!yr(e))))return;e.flags|=2;const n=e.dep,t=ae,r=Ve;ae=e,Ve=!0;try{Pa(e);const o=e.fn(e._value);(n.version===0||_n(o,e._value))&&(e.flags|=128,e._value=o,n.version++)}catch(o){throw n.version++,o}finally{ae=t,Ve=r,Na(e),e.flags&=-3}}function Kr(e,n=!1){const{dep:t,prevSub:r,nextSub:o}=e;if(r&&(r.nextSub=o,e.prevSub=void 0),o&&(o.prevSub=r,e.nextSub=void 0),t.subs===e&&(t.subs=r,!r&&t.computed)){t.computed.flags&=-5;for(let a=t.computed.deps;a;a=a.nextDep)Kr(a,!0)}!n&&!--t.sc&&t.map&&t.map.delete(t.key)}function us(e){const{prevDep:n,nextDep:t}=e;n&&(n.nextDep=t,e.prevDep=void 0),t&&(t.prevDep=n,e.nextDep=void 0)}let Ve=!0;const Oa=[];function pn(){Oa.push(Ve),Ve=!1}function hn(){const e=Oa.pop();Ve=e===void 0?!0:e}function uo(e){const{cleanup:n}=e;if(e.cleanup=void 0,n){const t=ae;ae=void 0;try{n()}finally{ae=t}}}let pt=0;class ps{constructor(n,t){this.sub=n,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Yr{constructor(n){this.computed=n,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(n){if(!ae||!Ve||ae===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==ae)t=this.activeLink=new ps(ae,this),ae.deps?(t.prevDep=ae.depsTail,ae.depsTail.nextDep=t,ae.depsTail=t):ae.deps=ae.depsTail=t,ka(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const r=t.nextDep;r.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=r),t.prevDep=ae.depsTail,t.nextDep=void 0,ae.depsTail.nextDep=t,ae.depsTail=t,ae.deps===t&&(ae.deps=r)}return t}trigger(n){this.version++,pt++,this.notify(n)}notify(n){Gr();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{Vr()}}}function ka(e){if(e.dep.sc++,e.sub.flags&4){const n=e.dep.computed;if(n&&!e.dep.subs){n.flags|=20;for(let r=n.deps;r;r=r.nextDep)ka(r)}const t=e.dep.subs;t!==e&&(e.prevSub=t,t&&(t.nextSub=e)),e.dep.subs=e}}const br=new WeakMap,Ln=Symbol(""),xr=Symbol(""),ht=Symbol("");function ye(e,n,t){if(Ve&&ae){let r=br.get(e);r||br.set(e,r=new Map);let o=r.get(t);o||(r.set(t,o=new Yr),o.map=r,o.key=t),o.track()}}function un(e,n,t,r,o,a){const i=br.get(e);if(!i){pt++;return}const s=l=>{l&&l.trigger()};if(Gr(),n==="clear")i.forEach(s);else{const l=F(e),f=l&&Br(t);if(l&&t==="length"){const c=Number(r);i.forEach((d,h)=>{(h==="length"||h===ht||!on(h)&&h>=c)&&s(d)})}else switch((t!==void 0||i.has(void 0))&&s(i.get(t)),f&&s(i.get(ht)),n){case"add":l?f&&s(i.get("length")):(s(i.get(Ln)),Gn(e)&&s(i.get(xr)));break;case"delete":l||(s(i.get(Ln)),Gn(e)&&s(i.get(xr)));break;case"set":Gn(e)&&s(i.get(Ln));break}}Vr()}function Hn(e){const n=Z(e);return n===e?n:(ye(n,"iterate",ht),ze(e)?n:n.map(Ye))}function Wt(e){return ye(e=Z(e),"iterate",ht),e}function Sn(e,n){return mn(e)?Wn(On(e)?Ye(n):n):Ye(n)}const hs={__proto__:null,[Symbol.iterator](){return ar(this,Symbol.iterator,e=>Sn(this,e))},concat(...e){return Hn(this).concat(...e.map(n=>F(n)?Hn(n):n))},entries(){return ar(this,"entries",e=>(e[1]=Sn(this,e[1]),e))},every(e,n){return ln(this,"every",e,n,void 0,arguments)},filter(e,n){return ln(this,"filter",e,n,t=>t.map(r=>Sn(this,r)),arguments)},find(e,n){return ln(this,"find",e,n,t=>Sn(this,t),arguments)},findIndex(e,n){return ln(this,"findIndex",e,n,void 0,arguments)},findLast(e,n){return ln(this,"findLast",e,n,t=>Sn(this,t),arguments)},findLastIndex(e,n){return ln(this,"findLastIndex",e,n,void 0,arguments)},forEach(e,n){return ln(this,"forEach",e,n,void 0,arguments)},includes(...e){return ir(this,"includes",e)},indexOf(...e){return ir(this,"indexOf",e)},join(e){return Hn(this).join(e)},lastIndexOf(...e){return ir(this,"lastIndexOf",e)},map(e,n){return ln(this,"map",e,n,void 0,arguments)},pop(){return $n(this,"pop")},push(...e){return $n(this,"push",e)},reduce(e,...n){return po(this,"reduce",e,n)},reduceRight(e,...n){return po(this,"reduceRight",e,n)},shift(){return $n(this,"shift")},some(e,n){return ln(this,"some",e,n,void 0,arguments)},splice(...e){return $n(this,"splice",e)},toReversed(){return Hn(this).toReversed()},toSorted(e){return Hn(this).toSorted(e)},toSpliced(...e){return Hn(this).toSpliced(...e)},unshift(...e){return $n(this,"unshift",e)},values(){return ar(this,"values",e=>Sn(this,e))}};function ar(e,n,t){const r=Wt(e),o=r[n]();return r!==e&&!ze(e)&&(o._next=o.next,o.next=()=>{const a=o._next();return a.done||(a.value=t(a.value)),a}),o}const ms=Array.prototype;function ln(e,n,t,r,o,a){const i=Wt(e),s=i!==e&&!ze(e),l=i[n];if(l!==ms[n]){const d=l.apply(e,a);return s?Ye(d):d}let f=t;i!==e&&(s?f=function(d,h){return t.call(this,Sn(e,d),h,e)}:t.length>2&&(f=function(d,h){return t.call(this,d,h,e)}));const c=l.call(i,f,r);return s&&o?o(c):c}function po(e,n,t,r){const o=Wt(e);let a=t;return o!==e&&(ze(e)?t.length>3&&(a=function(i,s,l){return t.call(this,i,s,l,e)}):a=function(i,s,l){return t.call(this,i,Sn(e,s),l,e)}),o[n](a,...r)}function ir(e,n,t){const r=Z(e);ye(r,"iterate",ht);const o=r[n](...t);return(o===-1||o===!1)&&Xr(t[0])?(t[0]=Z(t[0]),r[n](...t)):o}function $n(e,n,t=[]){pn(),Gr();const r=Z(e)[n].apply(e,t);return Vr(),hn(),r}const vs=Mr("__proto__,__v_isRef,__isVue"),Ma=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(on));function gs(e){on(e)||(e=String(e));const n=Z(this);return ye(n,"has",e),n.hasOwnProperty(e)}class Ha{constructor(n=!1,t=!1){this._isReadonly=n,this._isShallow=t}get(n,t,r){if(t==="__v_skip")return n.__v_skip;const o=this._isReadonly,a=this._isShallow;if(t==="__v_isReactive")return!o;if(t==="__v_isReadonly")return o;if(t==="__v_isShallow")return a;if(t==="__v_raw")return r===(o?a?As:Fa:a?Ua:Ba).get(n)||Object.getPrototypeOf(n)===Object.getPrototypeOf(r)?n:void 0;const i=F(n);if(!o){let l;if(i&&(l=hs[t]))return l;if(t==="hasOwnProperty")return gs}const s=Reflect.get(n,t,xe(n)?n:r);if((on(t)?Ma.has(t):vs(t))||(o||ye(n,"get",t),a))return s;if(xe(s)){const l=i&&Br(t)?s:s.value;return o&&te(l)?Sr(l):l}return te(s)?o?Sr(s):qt(s):s}}class za extends Ha{constructor(n=!1){super(!1,n)}set(n,t,r,o){let a=n[t];const i=F(n)&&Br(t);if(!this._isShallow){const f=mn(a);if(!ze(r)&&!mn(r)&&(a=Z(a),r=Z(r)),!i&&xe(a)&&!xe(r))return f||(a.value=r),!0}const s=i?Number(t)<n.length:ne(n,t),l=Reflect.set(n,t,r,xe(n)?n:o);return n===Z(o)&&(s?_n(r,a)&&un(n,"set",t,r):un(n,"add",t,r)),l}deleteProperty(n,t){const r=ne(n,t);n[t];const o=Reflect.deleteProperty(n,t);return o&&r&&un(n,"delete",t,void 0),o}has(n,t){const r=Reflect.has(n,t);return(!on(t)||!Ma.has(t))&&ye(n,"has",t),r}ownKeys(n){return ye(n,"iterate",F(n)?"length":Ln),Reflect.ownKeys(n)}}class ys extends Ha{constructor(n=!1){super(!0,n)}set(n,t){return!0}deleteProperty(n,t){return!0}}const bs=new za,xs=new ys,ws=new za(!0);const wr=e=>e,Ct=e=>Reflect.getPrototypeOf(e);function Ss(e,n,t){return function(...r){const o=this.__v_raw,a=Z(o),i=Gn(a),s=e==="entries"||e===Symbol.iterator&&i,l=e==="keys"&&i,f=o[e](...r),c=t?wr:n?Wn:Ye;return!n&&ye(a,"iterate",l?xr:Ln),he(Object.create(f),{next(){const{value:d,done:h}=f.next();return h?{value:d,done:h}:{value:s?[c(d[0]),c(d[1])]:c(d),done:h}}})}}function Tt(e){return function(...n){return e==="delete"?!1:e==="clear"?void 0:this}}function Es(e,n){const t={get(o){const a=this.__v_raw,i=Z(a),s=Z(o);e||(_n(o,s)&&ye(i,"get",o),ye(i,"get",s));const{has:l}=Ct(i),f=n?wr:e?Wn:Ye;if(l.call(i,o))return f(a.get(o));if(l.call(i,s))return f(a.get(s));a!==i&&a.get(o)},get size(){const o=this.__v_raw;return!e&&ye(Z(o),"iterate",Ln),o.size},has(o){const a=this.__v_raw,i=Z(a),s=Z(o);return e||(_n(o,s)&&ye(i,"has",o),ye(i,"has",s)),o===s?a.has(o):a.has(o)||a.has(s)},forEach(o,a){const i=this,s=i.__v_raw,l=Z(s),f=n?wr:e?Wn:Ye;return!e&&ye(l,"iterate",Ln),s.forEach((c,d)=>o.call(a,f(c),f(d),i))}};return he(t,e?{add:Tt("add"),set:Tt("set"),delete:Tt("delete"),clear:Tt("clear")}:{add(o){!n&&!ze(o)&&!mn(o)&&(o=Z(o));const a=Z(this);return Ct(a).has.call(a,o)||(a.add(o),un(a,"add",o,o)),this},set(o,a){!n&&!ze(a)&&!mn(a)&&(a=Z(a));const i=Z(this),{has:s,get:l}=Ct(i);let f=s.call(i,o);f||(o=Z(o),f=s.call(i,o));const c=l.call(i,o);return i.set(o,a),f?_n(a,c)&&un(i,"set",o,a):un(i,"add",o,a),this},delete(o){const a=Z(this),{has:i,get:s}=Ct(a);let l=i.call(a,o);l||(o=Z(o),l=i.call(a,o)),s&&s.call(a,o);const f=a.delete(o);return l&&un(a,"delete",o,void 0),f},clear(){const o=Z(this),a=o.size!==0,i=o.clear();return a&&un(o,"clear",void 0,void 0),i}}),["keys","values","entries",Symbol.iterator].forEach(o=>{t[o]=Ss(o,e,n)}),t}function Wr(e,n){const t=Es(e,n);return(r,o,a)=>o==="__v_isReactive"?!e:o==="__v_isReadonly"?e:o==="__v_raw"?r:Reflect.get(ne(t,o)&&o in r?t:r,o,a)}const Cs={get:Wr(!1,!1)},Ts={get:Wr(!1,!0)},_s={get:Wr(!0,!1)};const Ba=new WeakMap,Ua=new WeakMap,Fa=new WeakMap,As=new WeakMap;function Rs(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Is(e){return e.__v_skip||!Object.isExtensible(e)?0:Rs($i(e))}function qt(e){return mn(e)?e:qr(e,!1,bs,Cs,Ba)}function Ga(e){return qr(e,!1,ws,Ts,Ua)}function Sr(e){return qr(e,!0,xs,_s,Fa)}function qr(e,n,t,r,o){if(!te(e)||e.__v_raw&&!(n&&e.__v_isReactive))return e;const a=Is(e);if(a===0)return e;const i=o.get(e);if(i)return i;const s=new Proxy(e,a===2?r:t);return o.set(e,s),s}function On(e){return mn(e)?On(e.__v_raw):!!(e&&e.__v_isReactive)}function mn(e){return!!(e&&e.__v_isReadonly)}function ze(e){return!!(e&&e.__v_isShallow)}function Xr(e){return e?!!e.__v_raw:!1}function Z(e){const n=e&&e.__v_raw;return n?Z(n):e}function Ds(e){return!ne(e,"__v_skip")&&Object.isExtensible(e)&&Ca(e,"__v_skip",!0),e}const Ye=e=>te(e)?qt(e):e,Wn=e=>te(e)?Sr(e):e;function xe(e){return e?e.__v_isRef===!0:!1}function Ne(e){return Va(e,!1)}function Ps(e){return Va(e,!0)}function Va(e,n){return xe(e)?e:new Ns(e,n)}class Ns{constructor(n,t){this.dep=new Yr,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?n:Z(n),this._value=t?n:Ye(n),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(n){const t=this._rawValue,r=this.__v_isShallow||ze(n)||mn(n);n=r?n:Z(n),_n(n,t)&&(this._rawValue=n,this._value=r?n:Ye(n),this.dep.trigger())}}function Pe(e){return xe(e)?e.value:e}const Ls={get:(e,n,t)=>n==="__v_raw"?e:Pe(Reflect.get(e,n,t)),set:(e,n,t,r)=>{const o=e[n];return xe(o)&&!xe(t)?(o.value=t,!0):Reflect.set(e,n,t,r)}};function Ka(e){return On(e)?e:new Proxy(e,Ls)}class Os{constructor(n,t,r){this.fn=n,this.setter=t,this._value=void 0,this.dep=new Yr(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=pt-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&ae!==this)return Da(this,!0),!0}get value(){const n=this.dep.track();return La(this),n&&(n.version=this.dep.version),this._value}set value(n){this.setter&&this.setter(n)}}function ks(e,n,t=!1){let r,o;return V(e)?r=e:(r=e.get,o=e.set),new Os(r,o,t)}const _t={},Nt=new WeakMap;let Pn;function Ms(e,n=!1,t=Pn){if(t){let r=Nt.get(t);r||Nt.set(t,r=[]),r.push(e)}}function Hs(e,n,t=ie){const{immediate:r,deep:o,once:a,scheduler:i,augmentJob:s,call:l}=t,f=N=>o?N:ze(N)||o===!1||o===0?Tn(N,1):Tn(N);let c,d,h,v,E=!1,S=!1;if(xe(e)?(d=()=>e.value,E=ze(e)):On(e)?(d=()=>f(e),E=!0):F(e)?(S=!0,E=e.some(N=>On(N)||ze(N)),d=()=>e.map(N=>{if(xe(N))return N.value;if(On(N))return f(N);if(V(N))return l?l(N,2):N()})):V(e)?n?d=l?()=>l(e,2):e:d=()=>{if(h){pn();try{h()}finally{hn()}}const N=Pn;Pn=c;try{return l?l(e,3,[v]):e(v)}finally{Pn=N}}:d=rn,n&&o){const N=d,B=o===!0?1/0:o;d=()=>Tn(N(),B)}const T=ds(),A=()=>{c.stop(),T&&T.active&&zr(T.effects,c)};if(a&&n){const N=n;n=(...B)=>{N(...B),A()}}let C=S?new Array(e.length).fill(_t):_t;const P=N=>{if(!(!(c.flags&1)||!c.dirty&&!N))if(n){const B=c.run();if(o||E||(S?B.some((q,W)=>_n(q,C[W])):_n(B,C))){h&&h();const q=Pn;Pn=c;try{const W=[B,C===_t?void 0:S&&C[0]===_t?[]:C,v];C=B,l?l(n,3,W):n(...W)}finally{Pn=q}}}else c.run()};return s&&s(P),c=new Ra(d),c.scheduler=i?()=>i(P,!1):P,v=N=>Ms(N,!1,c),h=c.onStop=()=>{const N=Nt.get(c);if(N){if(l)l(N,4);else for(const B of N)B();Nt.delete(c)}},n?r?P(!0):C=c.run():i?i(P.bind(null,!0),!0):c.run(),A.pause=c.pause.bind(c),A.resume=c.resume.bind(c),A.stop=A,A}function Tn(e,n=1/0,t){if(n<=0||!te(e)||e.__v_skip||(t=t||new Map,(t.get(e)||0)>=n))return e;if(t.set(e,n),n--,xe(e))Tn(e.value,n,t);else if(F(e))for(let r=0;r<e.length;r++)Tn(e[r],n,t);else if(xa(e)||Gn(e))e.forEach(r=>{Tn(r,n,t)});else if(Ea(e)){for(const r in e)Tn(e[r],n,t);for(const r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&Tn(e[r],n,t)}return e}/**
* @vue/runtime-core v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function wt(e,n,t,r){try{return r?e(...r):e()}catch(o){Xt(o,n,t)}}function We(e,n,t,r){if(V(e)){const o=wt(e,n,t,r);return o&&wa(o)&&o.catch(a=>{Xt(a,n,t)}),o}if(F(e)){const o=[];for(let a=0;a<e.length;a++)o.push(We(e[a],n,t,r));return o}}function Xt(e,n,t,r=!0){const o=n?n.vnode:null,{errorHandler:a,throwUnhandledErrorInProduction:i}=n&&n.appContext.config||ie;if(n){let s=n.parent;const l=n.proxy,f=`https://vuejs.org/error-reference/#runtime-${t}`;for(;s;){const c=s.ec;if(c){for(let d=0;d<c.length;d++)if(c[d](e,l,f)===!1)return}s=s.parent}if(a){pn(),wt(a,null,10,[e,l,f]),hn();return}}zs(e,t,o,r,i)}function zs(e,n,t,r=!0,o=!1){if(o)throw e;console.error(e)}const Ce=[];let nn=-1;const Vn=[];let En=null,zn=0;const Ya=Promise.resolve();let Lt=null;function Wa(e){const n=Lt||Ya;return e?n.then(this?e.bind(this):e):n}function Bs(e){let n=nn+1,t=Ce.length;for(;n<t;){const r=n+t>>>1,o=Ce[r],a=mt(o);a<e||a===e&&o.flags&2?n=r+1:t=r}return n}function jr(e){if(!(e.flags&1)){const n=mt(e),t=Ce[Ce.length-1];!t||!(e.flags&2)&&n>=mt(t)?Ce.push(e):Ce.splice(Bs(n),0,e),e.flags|=1,qa()}}function qa(){Lt||(Lt=Ya.then(ja))}function Us(e){F(e)?Vn.push(...e):En&&e.id===-1?En.splice(zn+1,0,e):e.flags&1||(Vn.push(e),e.flags|=1),qa()}function ho(e,n,t=nn+1){for(;t<Ce.length;t++){const r=Ce[t];if(r&&r.flags&2){if(e&&r.id!==e.uid)continue;Ce.splice(t,1),t--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function Xa(e){if(Vn.length){const n=[...new Set(Vn)].sort((t,r)=>mt(t)-mt(r));if(Vn.length=0,En){En.push(...n);return}for(En=n,zn=0;zn<En.length;zn++){const t=En[zn];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}En=null,zn=0}}const mt=e=>e.id==null?e.flags&2?-1:1/0:e.id;function ja(e){try{for(nn=0;nn<Ce.length;nn++){const n=Ce[nn];n&&!(n.flags&8)&&(n.flags&4&&(n.flags&=-2),wt(n,n.i,n.i?15:14),n.flags&4||(n.flags&=-2))}}finally{for(;nn<Ce.length;nn++){const n=Ce[nn];n&&(n.flags&=-2)}nn=-1,Ce.length=0,Xa(),Lt=null,(Ce.length||Vn.length)&&ja()}}let Ge=null,Qa=null;function Ot(e){const n=Ge;return Ge=e,Qa=e&&e.type.__scopeId||null,n}function Qr(e,n=Ge,t){if(!n||e._n)return e;const r=(...o)=>{r._d&&Ht(-1);const a=Ot(n);let i;try{i=e(...o)}finally{Ot(a),r._d&&Ht(1)}return i};return r._n=!0,r._c=!0,r._d=!0,r}function Rn(e,n,t,r){const o=e.dirs,a=n&&n.dirs;for(let i=0;i<o.length;i++){const s=o[i];a&&(s.oldValue=a[i].value);let l=s.dir[r];l&&(pn(),We(l,t,8,[e.el,s,e,n]),hn())}}function Rt(e,n){if(be){let t=be.provides;const r=be.parent&&be.parent.provides;r===t&&(t=be.provides=Object.create(r)),t[e]=n}}function Ke(e,n,t=!1){const r=_i();if(r||Kn){let o=Kn?Kn._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(o&&e in o)return o[e];if(arguments.length>1)return t&&V(n)?n.call(r&&r.proxy):n}}const Fs=Symbol.for("v-scx"),Gs=()=>Ke(Fs);function st(e,n,t){return Za(e,n,t)}function Za(e,n,t=ie){const{immediate:r,deep:o,flush:a,once:i}=t,s=he({},t),l=n&&r||!n&&a!=="post";let f;if(yt){if(a==="sync"){const v=Gs();f=v.__watcherHandles||(v.__watcherHandles=[])}else if(!l){const v=()=>{};return v.stop=rn,v.resume=rn,v.pause=rn,v}}const c=be;s.call=(v,E,S)=>We(v,c,E,S);let d=!1;a==="post"?s.scheduler=v=>{Ie(v,c&&c.suspense)}:a!=="sync"&&(d=!0,s.scheduler=(v,E)=>{E?v():jr(v)}),s.augmentJob=v=>{n&&(v.flags|=4),d&&(v.flags|=2,c&&(v.id=c.uid,v.i=c))};const h=Hs(e,n,s);return yt&&(f?f.push(h):l&&h()),h}function Vs(e,n,t){const r=this.proxy,o=de(e)?e.includes(".")?$a(r,e):()=>r[e]:e.bind(r,r);let a;V(n)?a=n:(a=n.handler,t=n);const i=St(this),s=Za(o,a.bind(r),t);return i(),s}function $a(e,n){const t=n.split(".");return()=>{let r=e;for(let o=0;o<t.length&&r;o++)r=r[t[o]];return r}}const Ks=Symbol("_vte"),Ys=e=>e.__isTeleport,xn=Symbol("_leaveCb"),Jn=Symbol("_enterCb");function Ws(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Qn(()=>{e.isMounted=!0}),oi(()=>{e.isUnmounting=!0}),e}const Me=[Function,Array],qs={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:Me,onEnter:Me,onAfterEnter:Me,onEnterCancelled:Me,onBeforeLeave:Me,onLeave:Me,onAfterLeave:Me,onLeaveCancelled:Me,onBeforeAppear:Me,onAppear:Me,onAfterAppear:Me,onAppearCancelled:Me};function Xs(e,n){const{leavingVNodes:t}=e;let r=t.get(n.type);return r||(r=Object.create(null),t.set(n.type,r)),r}function Er(e,n,t,r,o){const{appear:a,mode:i,persisted:s=!1,onBeforeEnter:l,onEnter:f,onAfterEnter:c,onEnterCancelled:d,onBeforeLeave:h,onLeave:v,onAfterLeave:E,onLeaveCancelled:S,onBeforeAppear:T,onAppear:A,onAfterAppear:C,onAppearCancelled:P}=n,N=String(e.key),B=Xs(t,e),q=(U,K)=>{U&&We(U,r,9,K)},W=(U,K)=>{const $=K[1];q(U,K),F(U)?U.every(O=>O.length<=1)&&$():U.length<=1&&$()},ue={mode:i,persisted:s,beforeEnter(U){let K=l;if(!t.isMounted)if(a)K=T||l;else return;U[xn]&&U[xn](!0);const $=B[N];$&&Bn(e,$)&&$.el[xn]&&$.el[xn](),q(K,[U])},enter(U){let K=f,$=c,O=d;if(!t.isMounted)if(a)K=A||f,$=C||c,O=P||d;else return;let Q=!1;U[Jn]=ve=>{Q||(Q=!0,ve?q(O,[U]):q($,[U]),ue.delayedLeave&&ue.delayedLeave(),U[Jn]=void 0)};const se=U[Jn].bind(null,!1);K?W(K,[U,se]):se()},leave(U,K){const $=String(e.key);if(U[Jn]&&U[Jn](!0),t.isUnmounting)return K();q(h,[U]);let O=!1;U[xn]=se=>{O||(O=!0,K(),se?q(S,[U]):q(E,[U]),U[xn]=void 0,B[$]===e&&delete B[$])};const Q=U[xn].bind(null,!1);B[$]=e,v?W(v,[U,Q]):Q()},clone(U){return Er(U,n,t,r)}};return ue}function vt(e,n){e.shapeFlag&6&&e.component?(e.transition=n,vt(e.component.subTree,n)):e.shapeFlag&128?(e.ssContent.transition=n.clone(e.ssContent),e.ssFallback.transition=n.clone(e.ssFallback)):e.transition=n}function Ja(e,n=!1,t){let r=[],o=0;for(let a=0;a<e.length;a++){let i=e[a];const s=t==null?i.key:String(t)+String(i.key!=null?i.key:a);i.type===Te?(i.patchFlag&128&&o++,r=r.concat(Ja(i.children,n,s))):(n||i.type!==vn)&&r.push(s!=null?kn(i,{key:s}):i)}if(o>1)for(let a=0;a<r.length;a++)r[a].patchFlag=-2;return r}function An(e,n){return V(e)?he({name:e.name},n,{setup:e}):e}function ei(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function mo(e,n){let t;return!!((t=Object.getOwnPropertyDescriptor(e,n))&&!t.configurable)}const kt=new WeakMap;function lt(e,n,t,r,o=!1){if(F(e)){e.forEach((S,T)=>lt(S,n&&(F(n)?n[T]:n),t,r,o));return}if(ct(r)&&!o){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&lt(e,n,t,r.component.subTree);return}const a=r.shapeFlag&4?to(r.component):r.el,i=o?null:a,{i:s,r:l}=e,f=n&&n.r,c=s.refs===ie?s.refs={}:s.refs,d=s.setupState,h=Z(d),v=d===ie?ba:S=>mo(c,S)?!1:ne(h,S),E=(S,T)=>!(T&&mo(c,T));if(f!=null&&f!==l){if(vo(n),de(f))c[f]=null,v(f)&&(d[f]=null);else if(xe(f)){const S=n;E(f,S.k)&&(f.value=null),S.k&&(c[S.k]=null)}}if(V(l))wt(l,s,12,[i,c]);else{const S=de(l),T=xe(l);if(S||T){const A=()=>{if(e.f){const C=S?v(l)?d[l]:c[l]:E()||!e.k?l.value:c[e.k];if(o)F(C)&&zr(C,a);else if(F(C))C.includes(a)||C.push(a);else if(S)c[l]=[a],v(l)&&(d[l]=c[l]);else{const P=[a];E(l,e.k)&&(l.value=P),e.k&&(c[e.k]=P)}}else S?(c[l]=i,v(l)&&(d[l]=i)):T&&(E(l,e.k)&&(l.value=i),e.k&&(c[e.k]=i))};if(i){const C=()=>{A(),kt.delete(e)};C.id=-1,kt.set(e,C),Ie(C,t)}else vo(e),A()}}}function vo(e){const n=kt.get(e);n&&(n.flags|=8,kt.delete(e))}Yt().requestIdleCallback;Yt().cancelIdleCallback;const ct=e=>!!e.type.__asyncLoader,ni=e=>e.type.__isKeepAlive;function js(e,n){ti(e,"a",n)}function Qs(e,n){ti(e,"da",n)}function ti(e,n,t=be){const r=e.__wdc||(e.__wdc=()=>{let o=t;for(;o;){if(o.isDeactivated)return;o=o.parent}return e()});if(jt(n,r,t),t){let o=t.parent;for(;o&&o.parent;)ni(o.parent.vnode)&&Zs(r,n,t,o),o=o.parent}}function Zs(e,n,t,r){const o=jt(n,e,r,!0);Qt(()=>{zr(r[n],o)},t)}function jt(e,n,t=be,r=!1){if(t){const o=t[e]||(t[e]=[]),a=n.__weh||(n.__weh=(...i)=>{pn();const s=St(t),l=We(n,t,e,i);return s(),hn(),l});return r?o.unshift(a):o.push(a),a}}const gn=e=>(n,t=be)=>{(!yt||e==="sp")&&jt(e,(...r)=>n(...r),t)},$s=gn("bm"),Qn=gn("m"),Js=gn("bu"),ri=gn("u"),oi=gn("bum"),Qt=gn("um"),el=gn("sp"),nl=gn("rtg"),tl=gn("rtc");function rl(e,n=be){jt("ec",e,n)}const ol="components";function ai(e,n){return il(ol,e,!0,n)||e}const al=Symbol.for("v-ndc");function il(e,n,t=!0,r=!1){const o=Ge||be;if(o){const a=o.type;{const s=Wl(a,!1);if(s&&(s===n||s===Ue(n)||s===Kt(Ue(n))))return a}const i=go(o[e]||a[e],n)||go(o.appContext[e],n);return!i&&r?a:i}}function go(e,n){return e&&(e[n]||e[Ue(n)]||e[Kt(Ue(n))])}function Zr(e,n,t,r){let o;const a=t,i=F(e);if(i||de(e)){const s=i&&On(e);let l=!1,f=!1;s&&(l=!ze(e),f=mn(e),e=Wt(e)),o=new Array(e.length);for(let c=0,d=e.length;c<d;c++)o[c]=n(l?f?Wn(Ye(e[c])):Ye(e[c]):e[c],c,void 0,a)}else if(typeof e=="number"){o=new Array(e);for(let s=0;s<e;s++)o[s]=n(s+1,s,void 0,a)}else if(te(e))if(e[Symbol.iterator])o=Array.from(e,(s,l)=>n(s,l,void 0,a));else{const s=Object.keys(e);o=new Array(s.length);for(let l=0,f=s.length;l<f;l++){const c=s[l];o[l]=n(e[c],c,l,a)}}else o=[];return o}const Cr=e=>e?Ai(e)?to(e):Cr(e.parent):null,ft=he(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Cr(e.parent),$root:e=>Cr(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>si(e),$forceUpdate:e=>e.f||(e.f=()=>{jr(e.update)}),$nextTick:e=>e.n||(e.n=Wa.bind(e.proxy)),$watch:e=>Vs.bind(e)}),sr=(e,n)=>e!==ie&&!e.__isScriptSetup&&ne(e,n),sl={get({_:e},n){if(n==="__v_skip")return!0;const{ctx:t,setupState:r,data:o,props:a,accessCache:i,type:s,appContext:l}=e;if(n[0]!=="$"){const h=i[n];if(h!==void 0)switch(h){case 1:return r[n];case 2:return o[n];case 4:return t[n];case 3:return a[n]}else{if(sr(r,n))return i[n]=1,r[n];if(o!==ie&&ne(o,n))return i[n]=2,o[n];if(ne(a,n))return i[n]=3,a[n];if(t!==ie&&ne(t,n))return i[n]=4,t[n];Tr&&(i[n]=0)}}const f=ft[n];let c,d;if(f)return n==="$attrs"&&ye(e.attrs,"get",""),f(e);if((c=s.__cssModules)&&(c=c[n]))return c;if(t!==ie&&ne(t,n))return i[n]=4,t[n];if(d=l.config.globalProperties,ne(d,n))return d[n]},set({_:e},n,t){const{data:r,setupState:o,ctx:a}=e;return sr(o,n)?(o[n]=t,!0):r!==ie&&ne(r,n)?(r[n]=t,!0):ne(e.props,n)||n[0]==="$"&&n.slice(1)in e?!1:(a[n]=t,!0)},has({_:{data:e,setupState:n,accessCache:t,ctx:r,appContext:o,props:a,type:i}},s){let l;return!!(t[s]||e!==ie&&s[0]!=="$"&&ne(e,s)||sr(n,s)||ne(a,s)||ne(r,s)||ne(ft,s)||ne(o.config.globalProperties,s)||(l=i.__cssModules)&&l[s])},defineProperty(e,n,t){return t.get!=null?e._.accessCache[n]=0:ne(t,"value")&&this.set(e,n,t.value,null),Reflect.defineProperty(e,n,t)}};function yo(e){return F(e)?e.reduce((n,t)=>(n[t]=null,n),{}):e}let Tr=!0;function ll(e){const n=si(e),t=e.proxy,r=e.ctx;Tr=!1,n.beforeCreate&&bo(n.beforeCreate,e,"bc");const{data:o,computed:a,methods:i,watch:s,provide:l,inject:f,created:c,beforeMount:d,mounted:h,beforeUpdate:v,updated:E,activated:S,deactivated:T,beforeDestroy:A,beforeUnmount:C,destroyed:P,unmounted:N,render:B,renderTracked:q,renderTriggered:W,errorCaptured:ue,serverPrefetch:U,expose:K,inheritAttrs:$,components:O,directives:Q,filters:se}=n;if(f&&cl(f,r,null),i)for(const J in i){const Y=i[J];V(Y)&&(r[J]=Y.bind(t))}if(o){const J=o.call(t,t);te(J)&&(e.data=qt(J))}if(Tr=!0,a)for(const J in a){const Y=a[J],Fe=V(Y)?Y.bind(t,t):V(Y.get)?Y.get.bind(t,t):rn,Xe=!V(Y)&&V(Y.set)?Y.set.bind(t):rn,fe=He({get:Fe,set:Xe});Object.defineProperty(r,J,{enumerable:!0,configurable:!0,get:()=>fe.value,set:ge=>fe.value=ge})}if(s)for(const J in s)ii(s[J],r,t,J);if(l){const J=V(l)?l.call(t):l;Reflect.ownKeys(J).forEach(Y=>{Rt(Y,J[Y])})}c&&bo(c,e,"c");function le(J,Y){F(Y)?Y.forEach(Fe=>J(Fe.bind(t))):Y&&J(Y.bind(t))}if(le($s,d),le(Qn,h),le(Js,v),le(ri,E),le(js,S),le(Qs,T),le(rl,ue),le(tl,q),le(nl,W),le(oi,C),le(Qt,N),le(el,U),F(K))if(K.length){const J=e.exposed||(e.exposed={});K.forEach(Y=>{Object.defineProperty(J,Y,{get:()=>t[Y],set:Fe=>t[Y]=Fe,enumerable:!0})})}else e.exposed||(e.exposed={});B&&e.render===rn&&(e.render=B),$!=null&&(e.inheritAttrs=$),O&&(e.components=O),Q&&(e.directives=Q),U&&ei(e)}function cl(e,n,t=rn){F(e)&&(e=_r(e));for(const r in e){const o=e[r];let a;te(o)?"default"in o?a=Ke(o.from||r,o.default,!0):a=Ke(o.from||r):a=Ke(o),xe(a)?Object.defineProperty(n,r,{enumerable:!0,configurable:!0,get:()=>a.value,set:i=>a.value=i}):n[r]=a}}function bo(e,n,t){We(F(e)?e.map(r=>r.bind(n.proxy)):e.bind(n.proxy),n,t)}function ii(e,n,t,r){let o=r.includes(".")?$a(t,r):()=>t[r];if(de(e)){const a=n[e];V(a)&&st(o,a)}else if(V(e))st(o,e.bind(t));else if(te(e))if(F(e))e.forEach(a=>ii(a,n,t,r));else{const a=V(e.handler)?e.handler.bind(t):n[e.handler];V(a)&&st(o,a,e)}}function si(e){const n=e.type,{mixins:t,extends:r}=n,{mixins:o,optionsCache:a,config:{optionMergeStrategies:i}}=e.appContext,s=a.get(n);let l;return s?l=s:!o.length&&!t&&!r?l=n:(l={},o.length&&o.forEach(f=>Mt(l,f,i,!0)),Mt(l,n,i)),te(n)&&a.set(n,l),l}function Mt(e,n,t,r=!1){const{mixins:o,extends:a}=n;a&&Mt(e,a,t,!0),o&&o.forEach(i=>Mt(e,i,t,!0));for(const i in n)if(!(r&&i==="expose")){const s=fl[i]||t&&t[i];e[i]=s?s(e[i],n[i]):n[i]}return e}const fl={data:xo,props:wo,emits:wo,methods:tt,computed:tt,beforeCreate:Se,created:Se,beforeMount:Se,mounted:Se,beforeUpdate:Se,updated:Se,beforeDestroy:Se,beforeUnmount:Se,destroyed:Se,unmounted:Se,activated:Se,deactivated:Se,errorCaptured:Se,serverPrefetch:Se,components:tt,directives:tt,watch:ul,provide:xo,inject:dl};function xo(e,n){return n?e?function(){return he(V(e)?e.call(this,this):e,V(n)?n.call(this,this):n)}:n:e}function dl(e,n){return tt(_r(e),_r(n))}function _r(e){if(F(e)){const n={};for(let t=0;t<e.length;t++)n[e[t]]=e[t];return n}return e}function Se(e,n){return e?[...new Set([].concat(e,n))]:n}function tt(e,n){return e?he(Object.create(null),e,n):n}function wo(e,n){return e?F(e)&&F(n)?[...new Set([...e,...n])]:he(Object.create(null),yo(e),yo(n??{})):n}function ul(e,n){if(!e)return n;if(!n)return e;const t=he(Object.create(null),e);for(const r in n)t[r]=Se(e[r],n[r]);return t}function li(){return{app:null,config:{isNativeTag:ba,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let pl=0;function hl(e,n){return function(r,o=null){V(r)||(r=he({},r)),o!=null&&!te(o)&&(o=null);const a=li(),i=new WeakSet,s=[];let l=!1;const f=a.app={_uid:pl++,_component:r,_props:o,_container:null,_context:a,_instance:null,version:Xl,get config(){return a.config},set config(c){},use(c,...d){return i.has(c)||(c&&V(c.install)?(i.add(c),c.install(f,...d)):V(c)&&(i.add(c),c(f,...d))),f},mixin(c){return a.mixins.includes(c)||a.mixins.push(c),f},component(c,d){return d?(a.components[c]=d,f):a.components[c]},directive(c,d){return d?(a.directives[c]=d,f):a.directives[c]},mount(c,d,h){if(!l){const v=f._ceVNode||pe(r,o);return v.appContext=a,h===!0?h="svg":h===!1&&(h=void 0),e(v,c,h),l=!0,f._container=c,c.__vue_app__=f,to(v.component)}},onUnmount(c){s.push(c)},unmount(){l&&(We(s,f._instance,16),e(null,f._container),delete f._container.__vue_app__)},provide(c,d){return a.provides[c]=d,f},runWithContext(c){const d=Kn;Kn=f;try{return c()}finally{Kn=d}}};return f}}let Kn=null;const ml=(e,n)=>n==="modelValue"||n==="model-value"?e.modelModifiers:e[`${n}Modifiers`]||e[`${Ue(n)}Modifiers`]||e[`${Mn(n)}Modifiers`];function vl(e,n,...t){if(e.isUnmounted)return;const r=e.vnode.props||ie;let o=t;const a=n.startsWith("update:"),i=a&&ml(r,n.slice(7));i&&(i.trim&&(o=t.map(c=>de(c)?c.trim():c)),i.number&&(o=t.map(ns)));let s,l=r[s=nr(n)]||r[s=nr(Ue(n))];!l&&a&&(l=r[s=nr(Mn(n))]),l&&We(l,e,6,o);const f=r[s+"Once"];if(f){if(!e.emitted)e.emitted={};else if(e.emitted[s])return;e.emitted[s]=!0,We(f,e,6,o)}}const gl=new WeakMap;function ci(e,n,t=!1){const r=t?gl:n.emitsCache,o=r.get(e);if(o!==void 0)return o;const a=e.emits;let i={},s=!1;if(!V(e)){const l=f=>{const c=ci(f,n,!0);c&&(s=!0,he(i,c))};!t&&n.mixins.length&&n.mixins.forEach(l),e.extends&&l(e.extends),e.mixins&&e.mixins.forEach(l)}return!a&&!s?(te(e)&&r.set(e,null),null):(F(a)?a.forEach(l=>i[l]=null):he(i,a),te(e)&&r.set(e,i),i)}function Zt(e,n){return!e||!Gt(n)?!1:(n=n.slice(2).replace(/Once$/,""),ne(e,n[0].toLowerCase()+n.slice(1))||ne(e,Mn(n))||ne(e,n))}function So(e){const{type:n,vnode:t,proxy:r,withProxy:o,propsOptions:[a],slots:i,attrs:s,emit:l,render:f,renderCache:c,props:d,data:h,setupState:v,ctx:E,inheritAttrs:S}=e,T=Ot(e);let A,C;try{if(t.shapeFlag&4){const N=o||r,B=N;A=tn(f.call(B,N,c,d,v,h,E)),C=s}else{const N=n;A=tn(N.length>1?N(d,{attrs:s,slots:i,emit:l}):N(d,null)),C=n.props?s:yl(s)}}catch(N){dt.length=0,Xt(N,e,1),A=pe(vn)}let P=A;if(C&&S!==!1){const N=Object.keys(C),{shapeFlag:B}=P;N.length&&B&7&&(a&&N.some(Hr)&&(C=bl(C,a)),P=kn(P,C,!1,!0))}return t.dirs&&(P=kn(P,null,!1,!0),P.dirs=P.dirs?P.dirs.concat(t.dirs):t.dirs),t.transition&&vt(P,t.transition),A=P,Ot(T),A}const yl=e=>{let n;for(const t in e)(t==="class"||t==="style"||Gt(t))&&((n||(n={}))[t]=e[t]);return n},bl=(e,n)=>{const t={};for(const r in e)(!Hr(r)||!(r.slice(9)in n))&&(t[r]=e[r]);return t};function xl(e,n,t){const{props:r,children:o,component:a}=e,{props:i,children:s,patchFlag:l}=n,f=a.emitsOptions;if(n.dirs||n.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return r?Eo(r,i,f):!!i;if(l&8){const c=n.dynamicProps;for(let d=0;d<c.length;d++){const h=c[d];if(fi(i,r,h)&&!Zt(f,h))return!0}}}else return(o||s)&&(!s||!s.$stable)?!0:r===i?!1:r?i?Eo(r,i,f):!0:!!i;return!1}function Eo(e,n,t){const r=Object.keys(n);if(r.length!==Object.keys(e).length)return!0;for(let o=0;o<r.length;o++){const a=r[o];if(fi(n,e,a)&&!Zt(t,a))return!0}return!1}function fi(e,n,t){const r=e[t],o=n[t];return t==="style"&&te(r)&&te(o)?!Fr(r,o):r!==o}function wl({vnode:e,parent:n},t){for(;n;){const r=n.subTree;if(r.suspense&&r.suspense.activeBranch===e&&(r.el=e.el),r===e)(e=n.vnode).el=t,n=n.parent;else break}}const di={},ui=()=>Object.create(di),pi=e=>Object.getPrototypeOf(e)===di;function Sl(e,n,t,r=!1){const o={},a=ui();e.propsDefaults=Object.create(null),hi(e,n,o,a);for(const i in e.propsOptions[0])i in o||(o[i]=void 0);t?e.props=r?o:Ga(o):e.type.props?e.props=o:e.props=a,e.attrs=a}function El(e,n,t,r){const{props:o,attrs:a,vnode:{patchFlag:i}}=e,s=Z(o),[l]=e.propsOptions;let f=!1;if((r||i>0)&&!(i&16)){if(i&8){const c=e.vnode.dynamicProps;for(let d=0;d<c.length;d++){let h=c[d];if(Zt(e.emitsOptions,h))continue;const v=n[h];if(l)if(ne(a,h))v!==a[h]&&(a[h]=v,f=!0);else{const E=Ue(h);o[E]=Ar(l,s,E,v,e,!1)}else v!==a[h]&&(a[h]=v,f=!0)}}}else{hi(e,n,o,a)&&(f=!0);let c;for(const d in s)(!n||!ne(n,d)&&((c=Mn(d))===d||!ne(n,c)))&&(l?t&&(t[d]!==void 0||t[c]!==void 0)&&(o[d]=Ar(l,s,d,void 0,e,!0)):delete o[d]);if(a!==s)for(const d in a)(!n||!ne(n,d))&&(delete a[d],f=!0)}f&&un(e.attrs,"set","")}function hi(e,n,t,r){const[o,a]=e.propsOptions;let i=!1,s;if(n)for(let l in n){if(rt(l))continue;const f=n[l];let c;o&&ne(o,c=Ue(l))?!a||!a.includes(c)?t[c]=f:(s||(s={}))[c]=f:Zt(e.emitsOptions,l)||(!(l in r)||f!==r[l])&&(r[l]=f,i=!0)}if(a){const l=Z(t),f=s||ie;for(let c=0;c<a.length;c++){const d=a[c];t[d]=Ar(o,l,d,f[d],e,!ne(f,d))}}return i}function Ar(e,n,t,r,o,a){const i=e[t];if(i!=null){const s=ne(i,"default");if(s&&r===void 0){const l=i.default;if(i.type!==Function&&!i.skipFactory&&V(l)){const{propsDefaults:f}=o;if(t in f)r=f[t];else{const c=St(o);r=f[t]=l.call(null,n),c()}}else r=l;o.ce&&o.ce._setProp(t,r)}i[0]&&(a&&!s?r=!1:i[1]&&(r===""||r===Mn(t))&&(r=!0))}return r}const Cl=new WeakMap;function mi(e,n,t=!1){const r=t?Cl:n.propsCache,o=r.get(e);if(o)return o;const a=e.props,i={},s=[];let l=!1;if(!V(e)){const c=d=>{l=!0;const[h,v]=mi(d,n,!0);he(i,h),v&&s.push(...v)};!t&&n.mixins.length&&n.mixins.forEach(c),e.extends&&c(e.extends),e.mixins&&e.mixins.forEach(c)}if(!a&&!l)return te(e)&&r.set(e,Fn),Fn;if(F(a))for(let c=0;c<a.length;c++){const d=Ue(a[c]);Co(d)&&(i[d]=ie)}else if(a)for(const c in a){const d=Ue(c);if(Co(d)){const h=a[c],v=i[d]=F(h)||V(h)?{type:h}:he({},h),E=v.type;let S=!1,T=!0;if(F(E))for(let A=0;A<E.length;++A){const C=E[A],P=V(C)&&C.name;if(P==="Boolean"){S=!0;break}else P==="String"&&(T=!1)}else S=V(E)&&E.name==="Boolean";v[0]=S,v[1]=T,(S||ne(v,"default"))&&s.push(d)}}const f=[i,s];return te(e)&&r.set(e,f),f}function Co(e){return e[0]!=="$"&&!rt(e)}const $r=e=>e==="_"||e==="_ctx"||e==="$stable",Jr=e=>F(e)?e.map(tn):[tn(e)],Tl=(e,n,t)=>{if(n._n)return n;const r=Qr((...o)=>Jr(n(...o)),t);return r._c=!1,r},vi=(e,n,t)=>{const r=e._ctx;for(const o in e){if($r(o))continue;const a=e[o];if(V(a))n[o]=Tl(o,a,r);else if(a!=null){const i=Jr(a);n[o]=()=>i}}},gi=(e,n)=>{const t=Jr(n);e.slots.default=()=>t},yi=(e,n,t)=>{for(const r in n)(t||!$r(r))&&(e[r]=n[r])},_l=(e,n,t)=>{const r=e.slots=ui();if(e.vnode.shapeFlag&32){const o=n._;o?(yi(r,n,t),t&&Ca(r,"_",o,!0)):vi(n,r)}else n&&gi(e,n)},Al=(e,n,t)=>{const{vnode:r,slots:o}=e;let a=!0,i=ie;if(r.shapeFlag&32){const s=n._;s?t&&s===1?a=!1:yi(o,n,t):(a=!n.$stable,vi(n,o)),i=n}else n&&(gi(e,n),i={default:1});if(a)for(const s in o)!$r(s)&&i[s]==null&&delete o[s]},Ie=Nl;function Rl(e){return Il(e)}function Il(e,n){const t=Yt();t.__VUE__=!0;const{insert:r,remove:o,patchProp:a,createElement:i,createText:s,createComment:l,setText:f,setElementText:c,parentNode:d,nextSibling:h,setScopeId:v=rn,insertStaticContent:E}=e,S=(u,p,m,g=null,x=null,b=null,I=void 0,R=null,_=!!p.dynamicChildren)=>{if(u===p)return;u&&!Bn(u,p)&&(g=y(u),ge(u,x,b,!0),u=null),p.patchFlag===-2&&(_=!1,p.dynamicChildren=null);const{type:w,ref:z,shapeFlag:L}=p;switch(w){case $t:T(u,p,m,g);break;case vn:A(u,p,m,g);break;case It:u==null&&C(p,m,g,I);break;case Te:O(u,p,m,g,x,b,I,R,_);break;default:L&1?B(u,p,m,g,x,b,I,R,_):L&6?Q(u,p,m,g,x,b,I,R,_):(L&64||L&128)&&w.process(u,p,m,g,x,b,I,R,_,M)}z!=null&&x?lt(z,u&&u.ref,b,p||u,!p):z==null&&u&&u.ref!=null&&lt(u.ref,null,b,u,!0)},T=(u,p,m,g)=>{if(u==null)r(p.el=s(p.children),m,g);else{const x=p.el=u.el;p.children!==u.children&&f(x,p.children)}},A=(u,p,m,g)=>{u==null?r(p.el=l(p.children||""),m,g):p.el=u.el},C=(u,p,m,g)=>{[u.el,u.anchor]=E(u.children,p,m,g,u.el,u.anchor)},P=({el:u,anchor:p},m,g)=>{let x;for(;u&&u!==p;)x=h(u),r(u,m,g),u=x;r(p,m,g)},N=({el:u,anchor:p})=>{let m;for(;u&&u!==p;)m=h(u),o(u),u=m;o(p)},B=(u,p,m,g,x,b,I,R,_)=>{if(p.type==="svg"?I="svg":p.type==="math"&&(I="mathml"),u==null)q(p,m,g,x,b,I,R,_);else{const w=u.el&&u.el._isVueCE?u.el:null;try{w&&w._beginPatch(),U(u,p,x,b,I,R,_)}finally{w&&w._endPatch()}}},q=(u,p,m,g,x,b,I,R)=>{let _,w;const{props:z,shapeFlag:L,transition:H,dirs:G}=u;if(_=u.el=i(u.type,b,z&&z.is,z),L&8?c(_,u.children):L&16&&ue(u.children,_,null,g,x,lr(u,b),I,R),G&&Rn(u,null,g,"created"),W(_,u,u.scopeId,I,g),z){for(const oe in z)oe!=="value"&&!rt(oe)&&a(_,oe,null,z[oe],b,g);"value"in z&&a(_,"value",null,z.value,b),(w=z.onVnodeBeforeMount)&&Je(w,g,u)}G&&Rn(u,null,g,"beforeMount");const j=Dl(x,H);j&&H.beforeEnter(_),r(_,p,m),((w=z&&z.onVnodeMounted)||j||G)&&Ie(()=>{w&&Je(w,g,u),j&&H.enter(_),G&&Rn(u,null,g,"mounted")},x)},W=(u,p,m,g,x)=>{if(m&&v(u,m),g)for(let b=0;b<g.length;b++)v(u,g[b]);if(x){let b=x.subTree;if(p===b||Si(b.type)&&(b.ssContent===p||b.ssFallback===p)){const I=x.vnode;W(u,I,I.scopeId,I.slotScopeIds,x.parent)}}},ue=(u,p,m,g,x,b,I,R,_=0)=>{for(let w=_;w<u.length;w++){const z=u[w]=R?dn(u[w]):tn(u[w]);S(null,z,p,m,g,x,b,I,R)}},U=(u,p,m,g,x,b,I)=>{const R=p.el=u.el;let{patchFlag:_,dynamicChildren:w,dirs:z}=p;_|=u.patchFlag&16;const L=u.props||ie,H=p.props||ie;let G;if(m&&In(m,!1),(G=H.onVnodeBeforeUpdate)&&Je(G,m,p,u),z&&Rn(p,u,m,"beforeUpdate"),m&&In(m,!0),(L.innerHTML&&H.innerHTML==null||L.textContent&&H.textContent==null)&&c(R,""),w?K(u.dynamicChildren,w,R,m,g,lr(p,x),b):I||Y(u,p,R,null,m,g,lr(p,x),b,!1),_>0){if(_&16)$(R,L,H,m,x);else if(_&2&&L.class!==H.class&&a(R,"class",null,H.class,x),_&4&&a(R,"style",L.style,H.style,x),_&8){const j=p.dynamicProps;for(let oe=0;oe<j.length;oe++){const re=j[oe],Ae=L[re],Re=H[re];(Re!==Ae||re==="value")&&a(R,re,Ae,Re,x,m)}}_&1&&u.children!==p.children&&c(R,p.children)}else!I&&w==null&&$(R,L,H,m,x);((G=H.onVnodeUpdated)||z)&&Ie(()=>{G&&Je(G,m,p,u),z&&Rn(p,u,m,"updated")},g)},K=(u,p,m,g,x,b,I)=>{for(let R=0;R<p.length;R++){const _=u[R],w=p[R],z=_.el&&(_.type===Te||!Bn(_,w)||_.shapeFlag&198)?d(_.el):m;S(_,w,z,null,g,x,b,I,!0)}},$=(u,p,m,g,x)=>{if(p!==m){if(p!==ie)for(const b in p)!rt(b)&&!(b in m)&&a(u,b,p[b],null,x,g);for(const b in m){if(rt(b))continue;const I=m[b],R=p[b];I!==R&&b!=="value"&&a(u,b,R,I,x,g)}"value"in m&&a(u,"value",p.value,m.value,x)}},O=(u,p,m,g,x,b,I,R,_)=>{const w=p.el=u?u.el:s(""),z=p.anchor=u?u.anchor:s("");let{patchFlag:L,dynamicChildren:H,slotScopeIds:G}=p;G&&(R=R?R.concat(G):G),u==null?(r(w,m,g),r(z,m,g),ue(p.children||[],m,z,x,b,I,R,_)):L>0&&L&64&&H&&u.dynamicChildren&&u.dynamicChildren.length===H.length?(K(u.dynamicChildren,H,m,x,b,I,R),(p.key!=null||x&&p===x.subTree)&&bi(u,p,!0)):Y(u,p,m,z,x,b,I,R,_)},Q=(u,p,m,g,x,b,I,R,_)=>{p.slotScopeIds=R,u==null?p.shapeFlag&512?x.ctx.activate(p,m,g,I,_):se(p,m,g,x,b,I,_):ve(u,p,_)},se=(u,p,m,g,x,b,I)=>{const R=u.component=Fl(u,g,x);if(ni(u)&&(R.ctx.renderer=M),Gl(R,!1,I),R.asyncDep){if(x&&x.registerDep(R,le,I),!u.el){const _=R.subTree=pe(vn);A(null,_,p,m),u.placeholder=_.el}}else le(R,u,p,m,x,b,I)},ve=(u,p,m)=>{const g=p.component=u.component;if(xl(u,p,m))if(g.asyncDep&&!g.asyncResolved){J(g,p,m);return}else g.next=p,g.update();else p.el=u.el,g.vnode=p},le=(u,p,m,g,x,b,I)=>{const R=()=>{if(u.isMounted){let{next:L,bu:H,u:G,parent:j,vnode:oe}=u;{const Ze=xi(u);if(Ze){L&&(L.el=oe.el,J(u,L,I)),Ze.asyncDep.then(()=>{Ie(()=>{u.isUnmounted||w()},x)});return}}let re=L,Ae;In(u,!1),L?(L.el=oe.el,J(u,L,I)):L=oe,H&&tr(H),(Ae=L.props&&L.props.onVnodeBeforeUpdate)&&Je(Ae,j,L,oe),In(u,!0);const Re=So(u),Qe=u.subTree;u.subTree=Re,S(Qe,Re,d(Qe.el),y(Qe),u,x,b),L.el=Re.el,re===null&&wl(u,Re.el),G&&Ie(G,x),(Ae=L.props&&L.props.onVnodeUpdated)&&Ie(()=>Je(Ae,j,L,oe),x)}else{let L;const{el:H,props:G}=p,{bm:j,m:oe,parent:re,root:Ae,type:Re}=u,Qe=ct(p);In(u,!1),j&&tr(j),!Qe&&(L=G&&G.onVnodeBeforeMount)&&Je(L,re,p),In(u,!0);{Ae.ce&&Ae.ce._hasShadowRoot()&&Ae.ce._injectChildStyle(Re);const Ze=u.subTree=So(u);S(null,Ze,m,g,u,x,b),p.el=Ze.el}if(oe&&Ie(oe,x),!Qe&&(L=G&&G.onVnodeMounted)){const Ze=p;Ie(()=>Je(L,re,Ze),x)}(p.shapeFlag&256||re&&ct(re.vnode)&&re.vnode.shapeFlag&256)&&u.a&&Ie(u.a,x),u.isMounted=!0,p=m=g=null}};u.scope.on();const _=u.effect=new Ra(R);u.scope.off();const w=u.update=_.run.bind(_),z=u.job=_.runIfDirty.bind(_);z.i=u,z.id=u.uid,_.scheduler=()=>jr(z),In(u,!0),w()},J=(u,p,m)=>{p.component=u;const g=u.vnode.props;u.vnode=p,u.next=null,El(u,p.props,g,m),Al(u,p.children,m),pn(),ho(u),hn()},Y=(u,p,m,g,x,b,I,R,_=!1)=>{const w=u&&u.children,z=u?u.shapeFlag:0,L=p.children,{patchFlag:H,shapeFlag:G}=p;if(H>0){if(H&128){Xe(w,L,m,g,x,b,I,R,_);return}else if(H&256){Fe(w,L,m,g,x,b,I,R,_);return}}G&8?(z&16&&we(w,x,b),L!==w&&c(m,L)):z&16?G&16?Xe(w,L,m,g,x,b,I,R,_):we(w,x,b,!0):(z&8&&c(m,""),G&16&&ue(L,m,g,x,b,I,R,_))},Fe=(u,p,m,g,x,b,I,R,_)=>{u=u||Fn,p=p||Fn;const w=u.length,z=p.length,L=Math.min(w,z);let H;for(H=0;H<L;H++){const G=p[H]=_?dn(p[H]):tn(p[H]);S(u[H],G,m,null,x,b,I,R,_)}w>z?we(u,x,b,!0,!1,L):ue(p,m,g,x,b,I,R,_,L)},Xe=(u,p,m,g,x,b,I,R,_)=>{let w=0;const z=p.length;let L=u.length-1,H=z-1;for(;w<=L&&w<=H;){const G=u[w],j=p[w]=_?dn(p[w]):tn(p[w]);if(Bn(G,j))S(G,j,m,null,x,b,I,R,_);else break;w++}for(;w<=L&&w<=H;){const G=u[L],j=p[H]=_?dn(p[H]):tn(p[H]);if(Bn(G,j))S(G,j,m,null,x,b,I,R,_);else break;L--,H--}if(w>L){if(w<=H){const G=H+1,j=G<z?p[G].el:g;for(;w<=H;)S(null,p[w]=_?dn(p[w]):tn(p[w]),m,j,x,b,I,R,_),w++}}else if(w>H)for(;w<=L;)ge(u[w],x,b,!0),w++;else{const G=w,j=w,oe=new Map;for(w=j;w<=H;w++){const Le=p[w]=_?dn(p[w]):tn(p[w]);Le.key!=null&&oe.set(Le.key,w)}let re,Ae=0;const Re=H-j+1;let Qe=!1,Ze=0;const Zn=new Array(Re);for(w=0;w<Re;w++)Zn[w]=0;for(w=G;w<=L;w++){const Le=u[w];if(Ae>=Re){ge(Le,x,b,!0);continue}let $e;if(Le.key!=null)$e=oe.get(Le.key);else for(re=j;re<=H;re++)if(Zn[re-j]===0&&Bn(Le,p[re])){$e=re;break}$e===void 0?ge(Le,x,b,!0):(Zn[$e-j]=w+1,$e>=Ze?Ze=$e:Qe=!0,S(Le,p[$e],m,null,x,b,I,R,_),Ae++)}const io=Qe?Pl(Zn):Fn;for(re=io.length-1,w=Re-1;w>=0;w--){const Le=j+w,$e=p[Le],so=p[Le+1],lo=Le+1<z?so.el||wi(so):g;Zn[w]===0?S(null,$e,m,lo,x,b,I,R,_):Qe&&(re<0||w!==io[re]?fe($e,m,lo,2):re--)}}},fe=(u,p,m,g,x=null)=>{const{el:b,type:I,transition:R,children:_,shapeFlag:w}=u;if(w&6){fe(u.component.subTree,p,m,g);return}if(w&128){u.suspense.move(p,m,g);return}if(w&64){I.move(u,p,m,M);return}if(I===Te){r(b,p,m);for(let L=0;L<_.length;L++)fe(_[L],p,m,g);r(u.anchor,p,m);return}if(I===It){P(u,p,m);return}if(g!==2&&w&1&&R)if(g===0)R.beforeEnter(b),r(b,p,m),Ie(()=>R.enter(b),x);else{const{leave:L,delayLeave:H,afterLeave:G}=R,j=()=>{u.ctx.isUnmounted?o(b):r(b,p,m)},oe=()=>{b._isLeaving&&b[xn](!0),L(b,()=>{j(),G&&G()})};H?H(b,j,oe):oe()}else r(b,p,m)},ge=(u,p,m,g=!1,x=!1)=>{const{type:b,props:I,ref:R,children:_,dynamicChildren:w,shapeFlag:z,patchFlag:L,dirs:H,cacheIndex:G}=u;if(L===-2&&(x=!1),R!=null&&(pn(),lt(R,null,m,u,!0),hn()),G!=null&&(p.renderCache[G]=void 0),z&256){p.ctx.deactivate(u);return}const j=z&1&&H,oe=!ct(u);let re;if(oe&&(re=I&&I.onVnodeBeforeUnmount)&&Je(re,p,u),z&6)je(u.component,m,g);else{if(z&128){u.suspense.unmount(m,g);return}j&&Rn(u,null,p,"beforeUnmount"),z&64?u.type.remove(u,p,m,M,g):w&&!w.hasOnce&&(b!==Te||L>0&&L&64)?we(w,p,m,!1,!0):(b===Te&&L&384||!x&&z&16)&&we(_,p,m),g&&an(u)}(oe&&(re=I&&I.onVnodeUnmounted)||j)&&Ie(()=>{re&&Je(re,p,u),j&&Rn(u,null,p,"unmounted")},m)},an=u=>{const{type:p,el:m,anchor:g,transition:x}=u;if(p===Te){sn(m,g);return}if(p===It){N(u);return}const b=()=>{o(m),x&&!x.persisted&&x.afterLeave&&x.afterLeave()};if(u.shapeFlag&1&&x&&!x.persisted){const{leave:I,delayLeave:R}=x,_=()=>I(m,b);R?R(u.el,b,_):_()}else b()},sn=(u,p)=>{let m;for(;u!==p;)m=h(u),o(u),u=m;o(p)},je=(u,p,m)=>{const{bum:g,scope:x,job:b,subTree:I,um:R,m:_,a:w}=u;To(_),To(w),g&&tr(g),x.stop(),b&&(b.flags|=8,ge(I,u,p,m)),R&&Ie(R,p),Ie(()=>{u.isUnmounted=!0},p)},we=(u,p,m,g=!1,x=!1,b=0)=>{for(let I=b;I<u.length;I++)ge(u[I],p,m,g,x)},y=u=>{if(u.shapeFlag&6)return y(u.component.subTree);if(u.shapeFlag&128)return u.suspense.next();const p=h(u.anchor||u.el),m=p&&p[Ks];return m?h(m):p};let k=!1;const D=(u,p,m)=>{let g;u==null?p._vnode&&(ge(p._vnode,null,null,!0),g=p._vnode.component):S(p._vnode||null,u,p,null,null,null,m),p._vnode=u,k||(k=!0,ho(g),Xa(),k=!1)},M={p:S,um:ge,m:fe,r:an,mt:se,mc:ue,pc:Y,pbc:K,n:y,o:e};return{render:D,hydrate:void 0,createApp:hl(D)}}function lr({type:e,props:n},t){return t==="svg"&&e==="foreignObject"||t==="mathml"&&e==="annotation-xml"&&n&&n.encoding&&n.encoding.includes("html")?void 0:t}function In({effect:e,job:n},t){t?(e.flags|=32,n.flags|=4):(e.flags&=-33,n.flags&=-5)}function Dl(e,n){return(!e||e&&!e.pendingBranch)&&n&&!n.persisted}function bi(e,n,t=!1){const r=e.children,o=n.children;if(F(r)&&F(o))for(let a=0;a<r.length;a++){const i=r[a];let s=o[a];s.shapeFlag&1&&!s.dynamicChildren&&((s.patchFlag<=0||s.patchFlag===32)&&(s=o[a]=dn(o[a]),s.el=i.el),!t&&s.patchFlag!==-2&&bi(i,s)),s.type===$t&&(s.patchFlag===-1&&(s=o[a]=dn(s)),s.el=i.el),s.type===vn&&!s.el&&(s.el=i.el)}}function Pl(e){const n=e.slice(),t=[0];let r,o,a,i,s;const l=e.length;for(r=0;r<l;r++){const f=e[r];if(f!==0){if(o=t[t.length-1],e[o]<f){n[r]=o,t.push(r);continue}for(a=0,i=t.length-1;a<i;)s=a+i>>1,e[t[s]]<f?a=s+1:i=s;f<e[t[a]]&&(a>0&&(n[r]=t[a-1]),t[a]=r)}}for(a=t.length,i=t[a-1];a-- >0;)t[a]=i,i=n[i];return t}function xi(e){const n=e.subTree.component;if(n)return n.asyncDep&&!n.asyncResolved?n:xi(n)}function To(e){if(e)for(let n=0;n<e.length;n++)e[n].flags|=8}function wi(e){if(e.placeholder)return e.placeholder;const n=e.component;return n?wi(n.subTree):null}const Si=e=>e.__isSuspense;function Nl(e,n){n&&n.pendingBranch?F(e)?n.effects.push(...e):n.effects.push(e):Us(e)}const Te=Symbol.for("v-fgt"),$t=Symbol.for("v-txt"),vn=Symbol.for("v-cmt"),It=Symbol.for("v-stc"),dt=[];let ke=null;function _e(e=!1){dt.push(ke=e?null:[])}function Ll(){dt.pop(),ke=dt[dt.length-1]||null}let gt=1;function Ht(e,n=!1){gt+=e,e<0&&ke&&n&&(ke.hasOnce=!0)}function Ei(e){return e.dynamicChildren=gt>0?ke||Fn:null,Ll(),gt>0&&ke&&ke.push(e),e}function Be(e,n,t,r,o,a){return Ei(Oe(e,n,t,r,o,a,!0))}function eo(e,n,t,r,o){return Ei(pe(e,n,t,r,o,!0))}function zt(e){return e?e.__v_isVNode===!0:!1}function Bn(e,n){return e.type===n.type&&e.key===n.key}const Ci=({key:e})=>e??null,Dt=({ref:e,ref_key:n,ref_for:t})=>(typeof e=="number"&&(e=""+e),e!=null?de(e)||xe(e)||V(e)?{i:Ge,r:e,k:n,f:!!t}:e:null);function Oe(e,n=null,t=null,r=0,o=null,a=e===Te?0:1,i=!1,s=!1){const l={__v_isVNode:!0,__v_skip:!0,type:e,props:n,key:n&&Ci(n),ref:n&&Dt(n),scopeId:Qa,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:a,patchFlag:r,dynamicProps:o,dynamicChildren:null,appContext:null,ctx:Ge};return s?(no(l,t),a&128&&e.normalize(l)):t&&(l.shapeFlag|=de(t)?8:16),gt>0&&!i&&ke&&(l.patchFlag>0||a&6)&&l.patchFlag!==32&&ke.push(l),l}const pe=Ol;function Ol(e,n=null,t=null,r=0,o=null,a=!1){if((!e||e===al)&&(e=vn),zt(e)){const s=kn(e,n,!0);return t&&no(s,t),gt>0&&!a&&ke&&(s.shapeFlag&6?ke[ke.indexOf(e)]=s:ke.push(s)),s.patchFlag=-2,s}if(ql(e)&&(e=e.__vccOpts),n){n=kl(n);let{class:s,style:l}=n;s&&!de(s)&&(n.class=Yn(s)),te(l)&&(Xr(l)&&!F(l)&&(l=he({},l)),n.style=Ur(l))}const i=de(e)?1:Si(e)?128:Ys(e)?64:te(e)?4:V(e)?2:0;return Oe(e,n,t,r,o,i,a,!0)}function kl(e){return e?Xr(e)||pi(e)?he({},e):e:null}function kn(e,n,t=!1,r=!1){const{props:o,ref:a,patchFlag:i,children:s,transition:l}=e,f=n?zl(o||{},n):o,c={__v_isVNode:!0,__v_skip:!0,type:e.type,props:f,key:f&&Ci(f),ref:n&&n.ref?t&&a?F(a)?a.concat(Dt(n)):[a,Dt(n)]:Dt(n):a,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:s,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:n&&e.type!==Te?i===-1?16:i|16:i,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:l,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&kn(e.ssContent),ssFallback:e.ssFallback&&kn(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return l&&r&&vt(c,l.clone(c)),c}function Ml(e=" ",n=0){return pe($t,null,e,n)}function Hl(e,n){const t=pe(It,null,e);return t.staticCount=n,t}function Ti(e="",n=!1){return n?(_e(),eo(vn,null,e)):pe(vn,null,e)}function tn(e){return e==null||typeof e=="boolean"?pe(vn):F(e)?pe(Te,null,e.slice()):zt(e)?dn(e):pe($t,null,String(e))}function dn(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:kn(e)}function no(e,n){let t=0;const{shapeFlag:r}=e;if(n==null)n=null;else if(F(n))t=16;else if(typeof n=="object")if(r&65){const o=n.default;o&&(o._c&&(o._d=!1),no(e,o()),o._c&&(o._d=!0));return}else{t=32;const o=n._;!o&&!pi(n)?n._ctx=Ge:o===3&&Ge&&(Ge.slots._===1?n._=1:(n._=2,e.patchFlag|=1024))}else V(n)?(n={default:n,_ctx:Ge},t=32):(n=String(n),r&64?(t=16,n=[Ml(n)]):t=8);e.children=n,e.shapeFlag|=t}function zl(...e){const n={};for(let t=0;t<e.length;t++){const r=e[t];for(const o in r)if(o==="class")n.class!==r.class&&(n.class=Yn([n.class,r.class]));else if(o==="style")n.style=Ur([n.style,r.style]);else if(Gt(o)){const a=n[o],i=r[o];i&&a!==i&&!(F(a)&&a.includes(i))&&(n[o]=a?[].concat(a,i):i)}else o!==""&&(n[o]=r[o])}return n}function Je(e,n,t,r=null){We(e,n,7,[t,r])}const Bl=li();let Ul=0;function Fl(e,n,t){const r=e.type,o=(n?n.appContext:e.appContext)||Bl,a={uid:Ul++,vnode:e,type:r,parent:n,appContext:o,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new fs(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:n?n.provides:Object.create(o.provides),ids:n?n.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:mi(r,o),emitsOptions:ci(r,o),emit:null,emitted:null,propsDefaults:ie,inheritAttrs:r.inheritAttrs,ctx:ie,data:ie,props:ie,attrs:ie,slots:ie,refs:ie,setupState:ie,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return a.ctx={_:a},a.root=n?n.root:a,a.emit=vl.bind(null,a),e.ce&&e.ce(a),a}let be=null;const _i=()=>be||Ge;let Bt,Rr;{const e=Yt(),n=(t,r)=>{let o;return(o=e[t])||(o=e[t]=[]),o.push(r),a=>{o.length>1?o.forEach(i=>i(a)):o[0](a)}};Bt=n("__VUE_INSTANCE_SETTERS__",t=>be=t),Rr=n("__VUE_SSR_SETTERS__",t=>yt=t)}const St=e=>{const n=be;return Bt(e),e.scope.on(),()=>{e.scope.off(),Bt(n)}},_o=()=>{be&&be.scope.off(),Bt(null)};function Ai(e){return e.vnode.shapeFlag&4}let yt=!1;function Gl(e,n=!1,t=!1){n&&Rr(n);const{props:r,children:o}=e.vnode,a=Ai(e);Sl(e,r,a,n),_l(e,o,t||n);const i=a?Vl(e,n):void 0;return n&&Rr(!1),i}function Vl(e,n){const t=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,sl);const{setup:r}=t;if(r){pn();const o=e.setupContext=r.length>1?Yl(e):null,a=St(e),i=wt(r,e,0,[e.props,o]),s=wa(i);if(hn(),a(),(s||e.sp)&&!ct(e)&&ei(e),s){if(i.then(_o,_o),n)return i.then(l=>{Ao(e,l)}).catch(l=>{Xt(l,e,0)});e.asyncDep=i}else Ao(e,i)}else Ri(e)}function Ao(e,n,t){V(n)?e.type.__ssrInlineRender?e.ssrRender=n:e.render=n:te(n)&&(e.setupState=Ka(n)),Ri(e)}function Ri(e,n,t){const r=e.type;e.render||(e.render=r.render||rn);{const o=St(e);pn();try{ll(e)}finally{hn(),o()}}}const Kl={get(e,n){return ye(e,"get",""),e[n]}};function Yl(e){const n=t=>{e.exposed=t||{}};return{attrs:new Proxy(e.attrs,Kl),slots:e.slots,emit:e.emit,expose:n}}function to(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(Ka(Ds(e.exposed)),{get(n,t){if(t in n)return n[t];if(t in ft)return ft[t](e)},has(n,t){return t in n||t in ft}})):e.proxy}function Wl(e,n=!0){return V(e)?e.displayName||e.name:e.name||n&&e.__name}function ql(e){return V(e)&&"__vccOpts"in e}const He=(e,n)=>ks(e,n,yt);function Ii(e,n,t){try{Ht(-1);const r=arguments.length;return r===2?te(n)&&!F(n)?zt(n)?pe(e,null,[n]):pe(e,n):pe(e,null,n):(r>3?t=Array.prototype.slice.call(arguments,2):r===3&&zt(t)&&(t=[t]),pe(e,n,t))}finally{Ht(1)}}const Xl="3.5.28";/**
* @vue/runtime-dom v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ir;const Ro=typeof window<"u"&&window.trustedTypes;if(Ro)try{Ir=Ro.createPolicy("vue",{createHTML:e=>e})}catch{}const Di=Ir?e=>Ir.createHTML(e):e=>e,jl="http://www.w3.org/2000/svg",Ql="http://www.w3.org/1998/Math/MathML",fn=typeof document<"u"?document:null,Io=fn&&fn.createElement("template"),Zl={insert:(e,n,t)=>{n.insertBefore(e,t||null)},remove:e=>{const n=e.parentNode;n&&n.removeChild(e)},createElement:(e,n,t,r)=>{const o=n==="svg"?fn.createElementNS(jl,e):n==="mathml"?fn.createElementNS(Ql,e):t?fn.createElement(e,{is:t}):fn.createElement(e);return e==="select"&&r&&r.multiple!=null&&o.setAttribute("multiple",r.multiple),o},createText:e=>fn.createTextNode(e),createComment:e=>fn.createComment(e),setText:(e,n)=>{e.nodeValue=n},setElementText:(e,n)=>{e.textContent=n},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>fn.querySelector(e),setScopeId(e,n){e.setAttribute(n,"")},insertStaticContent(e,n,t,r,o,a){const i=t?t.previousSibling:n.lastChild;if(o&&(o===a||o.nextSibling))for(;n.insertBefore(o.cloneNode(!0),t),!(o===a||!(o=o.nextSibling)););else{Io.innerHTML=Di(r==="svg"?`<svg>${e}</svg>`:r==="mathml"?`<math>${e}</math>`:e);const s=Io.content;if(r==="svg"||r==="mathml"){const l=s.firstChild;for(;l.firstChild;)s.appendChild(l.firstChild);s.removeChild(l)}n.insertBefore(s,t)}return[i?i.nextSibling:n.firstChild,t?t.previousSibling:n.lastChild]}},yn="transition",et="animation",qn=Symbol("_vtc"),Pi={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},$l=he({},qs,Pi),Dn=(e,n=[])=>{F(e)?e.forEach(t=>t(...n)):e&&e(...n)},Do=e=>e?F(e)?e.some(n=>n.length>1):e.length>1:!1;function Jl(e){const n={};for(const O in e)O in Pi||(n[O]=e[O]);if(e.css===!1)return n;const{name:t="v",type:r,duration:o,enterFromClass:a=`${t}-enter-from`,enterActiveClass:i=`${t}-enter-active`,enterToClass:s=`${t}-enter-to`,appearFromClass:l=a,appearActiveClass:f=i,appearToClass:c=s,leaveFromClass:d=`${t}-leave-from`,leaveActiveClass:h=`${t}-leave-active`,leaveToClass:v=`${t}-leave-to`}=e,E=ec(o),S=E&&E[0],T=E&&E[1],{onBeforeEnter:A,onEnter:C,onEnterCancelled:P,onLeave:N,onLeaveCancelled:B,onBeforeAppear:q=A,onAppear:W=C,onAppearCancelled:ue=P}=n,U=(O,Q,se,ve)=>{O._enterCancelled=ve,wn(O,Q?c:s),wn(O,Q?f:i),se&&se()},K=(O,Q)=>{O._isLeaving=!1,wn(O,d),wn(O,v),wn(O,h),Q&&Q()},$=O=>(Q,se)=>{const ve=O?W:C,le=()=>U(Q,O,se);Dn(ve,[Q,le]),Po(()=>{wn(Q,O?l:a),en(Q,O?c:s),Do(ve)||No(Q,r,S,le)})};return he(n,{onBeforeEnter(O){Dn(A,[O]),en(O,a),en(O,i)},onBeforeAppear(O){Dn(q,[O]),en(O,l),en(O,f)},onEnter:$(!1),onAppear:$(!0),onLeave(O,Q){O._isLeaving=!0;const se=()=>K(O,Q);en(O,d),O._enterCancelled?(en(O,h),Dr(O)):(Dr(O),en(O,h)),Po(()=>{O._isLeaving&&(wn(O,d),en(O,v),Do(N)||No(O,r,T,se))}),Dn(N,[O,se])},onEnterCancelled(O){U(O,!1,void 0,!0),Dn(P,[O])},onAppearCancelled(O){U(O,!0,void 0,!0),Dn(ue,[O])},onLeaveCancelled(O){K(O),Dn(B,[O])}})}function ec(e){if(e==null)return null;if(te(e))return[cr(e.enter),cr(e.leave)];{const n=cr(e);return[n,n]}}function cr(e){return ts(e)}function en(e,n){n.split(/\s+/).forEach(t=>t&&e.classList.add(t)),(e[qn]||(e[qn]=new Set)).add(n)}function wn(e,n){n.split(/\s+/).forEach(r=>r&&e.classList.remove(r));const t=e[qn];t&&(t.delete(n),t.size||(e[qn]=void 0))}function Po(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}let nc=0;function No(e,n,t,r){const o=e._endId=++nc,a=()=>{o===e._endId&&r()};if(t!=null)return setTimeout(a,t);const{type:i,timeout:s,propCount:l}=Ni(e,n);if(!i)return r();const f=i+"end";let c=0;const d=()=>{e.removeEventListener(f,h),a()},h=v=>{v.target===e&&++c>=l&&d()};setTimeout(()=>{c<l&&d()},s+1),e.addEventListener(f,h)}function Ni(e,n){const t=window.getComputedStyle(e),r=E=>(t[E]||"").split(", "),o=r(`${yn}Delay`),a=r(`${yn}Duration`),i=Lo(o,a),s=r(`${et}Delay`),l=r(`${et}Duration`),f=Lo(s,l);let c=null,d=0,h=0;n===yn?i>0&&(c=yn,d=i,h=a.length):n===et?f>0&&(c=et,d=f,h=l.length):(d=Math.max(i,f),c=d>0?i>f?yn:et:null,h=c?c===yn?a.length:l.length:0);const v=c===yn&&/\b(?:transform|all)(?:,|$)/.test(r(`${yn}Property`).toString());return{type:c,timeout:d,propCount:h,hasTransform:v}}function Lo(e,n){for(;e.length<n.length;)e=e.concat(e);return Math.max(...n.map((t,r)=>Oo(t)+Oo(e[r])))}function Oo(e){return e==="auto"?0:Number(e.slice(0,-1).replace(",","."))*1e3}function Dr(e){return(e?e.ownerDocument:document).body.offsetHeight}function tc(e,n,t){const r=e[qn];r&&(n=(n?[n,...r]:[...r]).join(" ")),n==null?e.removeAttribute("class"):t?e.setAttribute("class",n):e.className=n}const ko=Symbol("_vod"),rc=Symbol("_vsh"),oc=Symbol(""),ac=/(?:^|;)\s*display\s*:/;function ic(e,n,t){const r=e.style,o=de(t);let a=!1;if(t&&!o){if(n)if(de(n))for(const i of n.split(";")){const s=i.slice(0,i.indexOf(":")).trim();t[s]==null&&Pt(r,s,"")}else for(const i in n)t[i]==null&&Pt(r,i,"");for(const i in t)i==="display"&&(a=!0),Pt(r,i,t[i])}else if(o){if(n!==t){const i=r[oc];i&&(t+=";"+i),r.cssText=t,a=ac.test(t)}}else n&&e.removeAttribute("style");ko in e&&(e[ko]=a?r.display:"",e[rc]&&(r.display="none"))}const Mo=/\s*!important$/;function Pt(e,n,t){if(F(t))t.forEach(r=>Pt(e,n,r));else if(t==null&&(t=""),n.startsWith("--"))e.setProperty(n,t);else{const r=sc(e,n);Mo.test(t)?e.setProperty(Mn(r),t.replace(Mo,""),"important"):e[r]=t}}const Ho=["Webkit","Moz","ms"],fr={};function sc(e,n){const t=fr[n];if(t)return t;let r=Ue(n);if(r!=="filter"&&r in e)return fr[n]=r;r=Kt(r);for(let o=0;o<Ho.length;o++){const a=Ho[o]+r;if(a in e)return fr[n]=a}return n}const zo="http://www.w3.org/1999/xlink";function Bo(e,n,t,r,o,a=ls(n)){r&&n.startsWith("xlink:")?t==null?e.removeAttributeNS(zo,n.slice(6,n.length)):e.setAttributeNS(zo,n,t):t==null||a&&!Ta(t)?e.removeAttribute(n):e.setAttribute(n,a?"":on(t)?String(t):t)}function Uo(e,n,t,r,o){if(n==="innerHTML"||n==="textContent"){t!=null&&(e[n]=n==="innerHTML"?Di(t):t);return}const a=e.tagName;if(n==="value"&&a!=="PROGRESS"&&!a.includes("-")){const s=a==="OPTION"?e.getAttribute("value")||"":e.value,l=t==null?e.type==="checkbox"?"on":"":String(t);(s!==l||!("_value"in e))&&(e.value=l),t==null&&e.removeAttribute(n),e._value=t;return}let i=!1;if(t===""||t==null){const s=typeof e[n];s==="boolean"?t=Ta(t):t==null&&s==="string"?(t="",i=!0):s==="number"&&(t=0,i=!0)}try{e[n]=t}catch{}i&&e.removeAttribute(o||n)}function lc(e,n,t,r){e.addEventListener(n,t,r)}function cc(e,n,t,r){e.removeEventListener(n,t,r)}const Fo=Symbol("_vei");function fc(e,n,t,r,o=null){const a=e[Fo]||(e[Fo]={}),i=a[n];if(r&&i)i.value=r;else{const[s,l]=dc(n);if(r){const f=a[n]=hc(r,o);lc(e,s,f,l)}else i&&(cc(e,s,i,l),a[n]=void 0)}}const Go=/(?:Once|Passive|Capture)$/;function dc(e){let n;if(Go.test(e)){n={};let r;for(;r=e.match(Go);)e=e.slice(0,e.length-r[0].length),n[r[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):Mn(e.slice(2)),n]}let dr=0;const uc=Promise.resolve(),pc=()=>dr||(uc.then(()=>dr=0),dr=Date.now());function hc(e,n){const t=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=t.attached)return;We(mc(r,t.value),n,5,[r])};return t.value=e,t.attached=pc(),t}function mc(e,n){if(F(n)){const t=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{t.call(e),e._stopped=!0},n.map(r=>o=>!o._stopped&&r&&r(o))}else return n}const Vo=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,vc=(e,n,t,r,o,a)=>{const i=o==="svg";n==="class"?tc(e,r,i):n==="style"?ic(e,t,r):Gt(n)?Hr(n)||fc(e,n,t,r,a):(n[0]==="."?(n=n.slice(1),!0):n[0]==="^"?(n=n.slice(1),!1):gc(e,n,r,i))?(Uo(e,n,r),!e.tagName.includes("-")&&(n==="value"||n==="checked"||n==="selected")&&Bo(e,n,r,i,a,n!=="value")):e._isVueCE&&(/[A-Z]/.test(n)||!de(r))?Uo(e,Ue(n),r,a,n):(n==="true-value"?e._trueValue=r:n==="false-value"&&(e._falseValue=r),Bo(e,n,r,i))};function gc(e,n,t,r){if(r)return!!(n==="innerHTML"||n==="textContent"||n in e&&Vo(n)&&V(t));if(n==="spellcheck"||n==="draggable"||n==="translate"||n==="autocorrect"||n==="sandbox"&&e.tagName==="IFRAME"||n==="form"||n==="list"&&e.tagName==="INPUT"||n==="type"&&e.tagName==="TEXTAREA")return!1;if(n==="width"||n==="height"){const o=e.tagName;if(o==="IMG"||o==="VIDEO"||o==="CANVAS"||o==="SOURCE")return!1}return Vo(n)&&de(t)?!1:n in e}const Li=new WeakMap,Oi=new WeakMap,Ut=Symbol("_moveCb"),Ko=Symbol("_enterCb"),yc=e=>(delete e.props.mode,e),bc=yc({name:"TransitionGroup",props:he({},$l,{tag:String,moveClass:String}),setup(e,{slots:n}){const t=_i(),r=Ws();let o,a;return ri(()=>{if(!o.length)return;const i=e.moveClass||`${e.name||"v"}-move`;if(!Cc(o[0].el,t.vnode.el,i)){o=[];return}o.forEach(wc),o.forEach(Sc);const s=o.filter(Ec);Dr(t.vnode.el),s.forEach(l=>{const f=l.el,c=f.style;en(f,i),c.transform=c.webkitTransform=c.transitionDuration="";const d=f[Ut]=h=>{h&&h.target!==f||(!h||h.propertyName.endsWith("transform"))&&(f.removeEventListener("transitionend",d),f[Ut]=null,wn(f,i))};f.addEventListener("transitionend",d)}),o=[]}),()=>{const i=Z(e),s=Jl(i);let l=i.tag||Te;if(o=[],a)for(let f=0;f<a.length;f++){const c=a[f];c.el&&c.el instanceof Element&&(o.push(c),vt(c,Er(c,s,r,t)),Li.set(c,ki(c.el)))}a=n.default?Ja(n.default()):[];for(let f=0;f<a.length;f++){const c=a[f];c.key!=null&&vt(c,Er(c,s,r,t))}return pe(l,null,a)}}}),xc=bc;function wc(e){const n=e.el;n[Ut]&&n[Ut](),n[Ko]&&n[Ko]()}function Sc(e){Oi.set(e,ki(e.el))}function Ec(e){const n=Li.get(e),t=Oi.get(e),r=n.left-t.left,o=n.top-t.top;if(r||o){const a=e.el,i=a.style,s=a.getBoundingClientRect();let l=1,f=1;return a.offsetWidth&&(l=s.width/a.offsetWidth),a.offsetHeight&&(f=s.height/a.offsetHeight),(!Number.isFinite(l)||l===0)&&(l=1),(!Number.isFinite(f)||f===0)&&(f=1),Math.abs(l-1)<.01&&(l=1),Math.abs(f-1)<.01&&(f=1),i.transform=i.webkitTransform=`translate(${r/l}px,${o/f}px)`,i.transitionDuration="0s",e}}function ki(e){const n=e.getBoundingClientRect();return{left:n.left,top:n.top}}function Cc(e,n,t){const r=e.cloneNode(),o=e[qn];o&&o.forEach(s=>{s.split(/\s+/).forEach(l=>l&&r.classList.remove(l))}),t.split(/\s+/).forEach(s=>s&&r.classList.add(s)),r.style.display="none";const a=n.nodeType===1?n:n.parentNode;a.appendChild(r);const{hasTransform:i}=Ni(r);return a.removeChild(r),i}const Tc=he({patchProp:vc},Zl);let Yo;function _c(){return Yo||(Yo=Rl(Tc))}const Ac=((...e)=>{const n=_c().createApp(...e),{mount:t}=n;return n.mount=r=>{const o=Ic(r);if(!o)return;const a=n._component;!V(a)&&!a.render&&!a.template&&(a.template=o.innerHTML),o.nodeType===1&&(o.textContent="");const i=t(o,!1,Rc(o));return o instanceof Element&&(o.removeAttribute("v-cloak"),o.setAttribute("data-v-app","")),i},n});function Rc(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function Ic(e){return de(e)?document.querySelector(e):e}const pd=4,hd=2,Wo=400,qo=300,Xo=50,Dc=800,jo=500,Pc=300,Nc=250,ur=8,Lc=8,Oc=18,kc=2.5,Mc=1.2,Hc=1.5,zc=10,Bc=4,Uc=2,Fc=2,Gc=1.5,Vc=8,Qo=Ne(null),Ft=Ne("full");let Zo=!1,pr=null;function Kc(){Zo||(Zo=!0,pr=window.matchMedia("(prefers-reduced-motion: reduce)"),Ft.value=pr.matches?"reduced":"full",pr.addEventListener("change",e=>{Ft.value=e.matches?"reduced":"full"}))}function ro(){Qn(()=>{Kc()});const e=Ft;function n(o,a){if(a<=1)return 0;const i=Dc-Xo,s=Math.min(Xo,i/(a-1));return Math.round(o*s)}function t(o){Qo.value=o}function r(o){return Ft.value==="reduced"?Promise.resolve():o.animate([{transform:"scale(1)",opacity:1},{transform:"scale(0.95)",opacity:0}],{duration:Nc,easing:"cubic-bezier(0.25, 0.1, 0.25, 1)",fill:"forwards"}).finished.then(()=>{})}return{prefersReducedMotion:e,transitionSnapshot:Qo,getStaggerDelay:n,setTransitionSnapshot:t,triggerCardExit:r}}const Yc=["src"],Wc=An({__name:"TransitionOverlay",setup(e){const{transitionSnapshot:n,setTransitionSnapshot:t,prefersReducedMotion:r}=ro(),o=Ne(null),a=Ne(null),i=Ne(!1);return st(n,s=>{!s||r.value==="reduced"||(i.value=!0,requestAnimationFrame(()=>{const l=a.value,f=o.value;if(!l||!f){i.value=!1,t(null);return}const{top:c,left:d,width:h,height:v}=s.rect;f.animate([{backgroundColor:"rgba(9, 10, 16, 0)"},{backgroundColor:"rgba(9, 10, 16, 0.95)"}],{duration:jo,easing:"cubic-bezier(0.25, 0.1, 0.25, 1)",fill:"forwards"}),l.animate([{top:`${c}px`,left:`${d}px`,width:`${h}px`,height:`${v}px`,borderRadius:"8px"},{top:"0px",left:"0px",width:"100vw",height:"100vh",borderRadius:"0px"}],{duration:jo,easing:"cubic-bezier(0.25, 0.1, 0.25, 1)",fill:"forwards"}).finished.then(()=>{setTimeout(()=>{f&&f.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards"}).finished.then(()=>{i.value=!1,t(null)})},100)})}))}),(s,l)=>i.value&&Pe(n)?(_e(),Be("div",{key:0,ref_key:"overlayRef",ref:o,class:"transition-overlay"},[Oe("img",{ref_key:"imgRef",ref:a,src:Pe(n).screenshotUrl,alt:"",class:"transition-image"},null,8,Yc)],512)):Ti("",!0)}}),Et=(e,n)=>{const t=e.__vccOpts||e;for(const[r,o]of n)t[r]=o;return t},qc=Et(Wc,[["__scopeId","data-v-f5768e1f"]]),Xc=An({__name:"App",setup(e){return(n,t)=>{const r=ai("router-view");return _e(),Be(Te,null,[pe(r),pe(qc)],64)}}}),jc="modulepreload",Qc=function(e){return"/"+e},$o={},Zc=function(n,t,r){let o=Promise.resolve();if(t&&t.length>0){let i=function(f){return Promise.all(f.map(c=>Promise.resolve(c).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),l=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));o=i(t.map(f=>{if(f=Qc(f),f in $o)return;$o[f]=!0;const c=f.endsWith(".css"),d=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${f}"]${d}`))return;const h=document.createElement("link");if(h.rel=c?"stylesheet":jc,c||(h.as="script"),h.crossOrigin="",h.href=f,l&&h.setAttribute("nonce",l),document.head.appendChild(h),c)return new Promise((v,E)=>{h.addEventListener("load",v),h.addEventListener("error",()=>E(new Error(`Unable to preload CSS for ${f}`)))})}))}function a(i){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=i,window.dispatchEvent(s),!s.defaultPrevented)throw i}return o.then(i=>{for(const s of i||[])s.status==="rejected"&&a(s.reason);return n().catch(a)})};/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const Un=typeof document<"u";function Mi(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function $c(e){return e.__esModule||e[Symbol.toStringTag]==="Module"||e.default&&Mi(e.default)}const ee=Object.assign;function hr(e,n){const t={};for(const r in n){const o=n[r];t[r]=qe(o)?o.map(e):e(o)}return t}const ut=()=>{},qe=Array.isArray;function Jo(e,n){const t={};for(const r in e)t[r]=r in n?n[r]:e[r];return t}const Hi=/#/g,Jc=/&/g,e0=/\//g,n0=/=/g,t0=/\?/g,zi=/\+/g,r0=/%5B/g,o0=/%5D/g,Bi=/%5E/g,a0=/%60/g,Ui=/%7B/g,i0=/%7C/g,Fi=/%7D/g,s0=/%20/g;function oo(e){return e==null?"":encodeURI(""+e).replace(i0,"|").replace(r0,"[").replace(o0,"]")}function l0(e){return oo(e).replace(Ui,"{").replace(Fi,"}").replace(Bi,"^")}function Pr(e){return oo(e).replace(zi,"%2B").replace(s0,"+").replace(Hi,"%23").replace(Jc,"%26").replace(a0,"`").replace(Ui,"{").replace(Fi,"}").replace(Bi,"^")}function c0(e){return Pr(e).replace(n0,"%3D")}function f0(e){return oo(e).replace(Hi,"%23").replace(t0,"%3F")}function d0(e){return f0(e).replace(e0,"%2F")}function bt(e){if(e==null)return null;try{return decodeURIComponent(""+e)}catch{}return""+e}const u0=/\/$/,p0=e=>e.replace(u0,"");function mr(e,n,t="/"){let r,o={},a="",i="";const s=n.indexOf("#");let l=n.indexOf("?");return l=s>=0&&l>s?-1:l,l>=0&&(r=n.slice(0,l),a=n.slice(l,s>0?s:n.length),o=e(a.slice(1))),s>=0&&(r=r||n.slice(0,s),i=n.slice(s,n.length)),r=g0(r??n,t),{fullPath:r+a+i,path:r,query:o,hash:bt(i)}}function h0(e,n){const t=n.query?e(n.query):"";return n.path+(t&&"?")+t+(n.hash||"")}function ea(e,n){return!n||!e.toLowerCase().startsWith(n.toLowerCase())?e:e.slice(n.length)||"/"}function m0(e,n,t){const r=n.matched.length-1,o=t.matched.length-1;return r>-1&&r===o&&Xn(n.matched[r],t.matched[o])&&Gi(n.params,t.params)&&e(n.query)===e(t.query)&&n.hash===t.hash}function Xn(e,n){return(e.aliasOf||e)===(n.aliasOf||n)}function Gi(e,n){if(Object.keys(e).length!==Object.keys(n).length)return!1;for(var t in e)if(!v0(e[t],n[t]))return!1;return!0}function v0(e,n){return qe(e)?na(e,n):qe(n)?na(n,e):(e==null?void 0:e.valueOf())===(n==null?void 0:n.valueOf())}function na(e,n){return qe(n)?e.length===n.length&&e.every((t,r)=>t===n[r]):e.length===1&&e[0]===n}function g0(e,n){if(e.startsWith("/"))return e;if(!e)return n;const t=n.split("/"),r=e.split("/"),o=r[r.length-1];(o===".."||o===".")&&r.push("");let a=t.length-1,i,s;for(i=0;i<r.length;i++)if(s=r[i],s!==".")if(s==="..")a>1&&a--;else break;return t.slice(0,a).join("/")+"/"+r.slice(i).join("/")}const bn={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let Nr=(function(e){return e.pop="pop",e.push="push",e})({}),vr=(function(e){return e.back="back",e.forward="forward",e.unknown="",e})({});function y0(e){if(!e)if(Un){const n=document.querySelector("base");e=n&&n.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),p0(e)}const b0=/^[^#]+#/;function x0(e,n){return e.replace(b0,"#")+n}function w0(e,n){const t=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:n.behavior,left:r.left-t.left-(n.left||0),top:r.top-t.top-(n.top||0)}}const Jt=()=>({left:window.scrollX,top:window.scrollY});function S0(e){let n;if("el"in e){const t=e.el,r=typeof t=="string"&&t.startsWith("#"),o=typeof t=="string"?r?document.getElementById(t.slice(1)):document.querySelector(t):t;if(!o)return;n=w0(o,e)}else n=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(n):window.scrollTo(n.left!=null?n.left:window.scrollX,n.top!=null?n.top:window.scrollY)}function ta(e,n){return(history.state?history.state.position-n:-1)+e}const Lr=new Map;function E0(e,n){Lr.set(e,n)}function C0(e){const n=Lr.get(e);return Lr.delete(e),n}function T0(e){return typeof e=="string"||e&&typeof e=="object"}function Vi(e){return typeof e=="string"||typeof e=="symbol"}let ce=(function(e){return e[e.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",e[e.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",e[e.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",e[e.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",e[e.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",e})({});const Ki=Symbol("");ce.MATCHER_NOT_FOUND+"",ce.NAVIGATION_GUARD_REDIRECT+"",ce.NAVIGATION_ABORTED+"",ce.NAVIGATION_CANCELLED+"",ce.NAVIGATION_DUPLICATED+"";function jn(e,n){return ee(new Error,{type:e,[Ki]:!0},n)}function cn(e,n){return e instanceof Error&&Ki in e&&(n==null||!!(e.type&n))}const _0=["params","query","hash"];function A0(e){if(typeof e=="string")return e;if(e.path!=null)return e.path;const n={};for(const t of _0)t in e&&(n[t]=e[t]);return JSON.stringify(n,null,2)}function R0(e){const n={};if(e===""||e==="?")return n;const t=(e[0]==="?"?e.slice(1):e).split("&");for(let r=0;r<t.length;++r){const o=t[r].replace(zi," "),a=o.indexOf("="),i=bt(a<0?o:o.slice(0,a)),s=a<0?null:bt(o.slice(a+1));if(i in n){let l=n[i];qe(l)||(l=n[i]=[l]),l.push(s)}else n[i]=s}return n}function ra(e){let n="";for(let t in e){const r=e[t];if(t=c0(t),r==null){r!==void 0&&(n+=(n.length?"&":"")+t);continue}(qe(r)?r.map(o=>o&&Pr(o)):[r&&Pr(r)]).forEach(o=>{o!==void 0&&(n+=(n.length?"&":"")+t,o!=null&&(n+="="+o))})}return n}function I0(e){const n={};for(const t in e){const r=e[t];r!==void 0&&(n[t]=qe(r)?r.map(o=>o==null?null:""+o):r==null?r:""+r)}return n}const D0=Symbol(""),oa=Symbol(""),er=Symbol(""),ao=Symbol(""),Or=Symbol("");function nt(){let e=[];function n(r){return e.push(r),()=>{const o=e.indexOf(r);o>-1&&e.splice(o,1)}}function t(){e=[]}return{add:n,list:()=>e.slice(),reset:t}}function Cn(e,n,t,r,o,a=i=>i()){const i=r&&(r.enterCallbacks[o]=r.enterCallbacks[o]||[]);return()=>new Promise((s,l)=>{const f=h=>{h===!1?l(jn(ce.NAVIGATION_ABORTED,{from:t,to:n})):h instanceof Error?l(h):T0(h)?l(jn(ce.NAVIGATION_GUARD_REDIRECT,{from:n,to:h})):(i&&r.enterCallbacks[o]===i&&typeof h=="function"&&i.push(h),s())},c=a(()=>e.call(r&&r.instances[o],n,t,f));let d=Promise.resolve(c);e.length<3&&(d=d.then(f)),d.catch(h=>l(h))})}function gr(e,n,t,r,o=a=>a()){const a=[];for(const i of e)for(const s in i.components){let l=i.components[s];if(!(n!=="beforeRouteEnter"&&!i.instances[s]))if(Mi(l)){const f=(l.__vccOpts||l)[n];f&&a.push(Cn(f,t,r,i,s,o))}else{let f=l();a.push(()=>f.then(c=>{if(!c)throw new Error(`Couldn't resolve component "${s}" at "${i.path}"`);const d=$c(c)?c.default:c;i.mods[s]=c,i.components[s]=d;const h=(d.__vccOpts||d)[n];return h&&Cn(h,t,r,i,s,o)()}))}}return a}function P0(e,n){const t=[],r=[],o=[],a=Math.max(n.matched.length,e.matched.length);for(let i=0;i<a;i++){const s=n.matched[i];s&&(e.matched.find(f=>Xn(f,s))?r.push(s):t.push(s));const l=e.matched[i];l&&(n.matched.find(f=>Xn(f,l))||o.push(l))}return[t,r,o]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let N0=()=>location.protocol+"//"+location.host;function Yi(e,n){const{pathname:t,search:r,hash:o}=n,a=e.indexOf("#");if(a>-1){let i=o.includes(e.slice(a))?e.slice(a).length:1,s=o.slice(i);return s[0]!=="/"&&(s="/"+s),ea(s,"")}return ea(t,e)+r+o}function L0(e,n,t,r){let o=[],a=[],i=null;const s=({state:h})=>{const v=Yi(e,location),E=t.value,S=n.value;let T=0;if(h){if(t.value=v,n.value=h,i&&i===E){i=null;return}T=S?h.position-S.position:0}else r(v);o.forEach(A=>{A(t.value,E,{delta:T,type:Nr.pop,direction:T?T>0?vr.forward:vr.back:vr.unknown})})};function l(){i=t.value}function f(h){o.push(h);const v=()=>{const E=o.indexOf(h);E>-1&&o.splice(E,1)};return a.push(v),v}function c(){if(document.visibilityState==="hidden"){const{history:h}=window;if(!h.state)return;h.replaceState(ee({},h.state,{scroll:Jt()}),"")}}function d(){for(const h of a)h();a=[],window.removeEventListener("popstate",s),window.removeEventListener("pagehide",c),document.removeEventListener("visibilitychange",c)}return window.addEventListener("popstate",s),window.addEventListener("pagehide",c),document.addEventListener("visibilitychange",c),{pauseListeners:l,listen:f,destroy:d}}function aa(e,n,t,r=!1,o=!1){return{back:e,current:n,forward:t,replaced:r,position:window.history.length,scroll:o?Jt():null}}function O0(e){const{history:n,location:t}=window,r={value:Yi(e,t)},o={value:n.state};o.value||a(r.value,{back:null,current:r.value,forward:null,position:n.length-1,replaced:!0,scroll:null},!0);function a(l,f,c){const d=e.indexOf("#"),h=d>-1?(t.host&&document.querySelector("base")?e:e.slice(d))+l:N0()+e+l;try{n[c?"replaceState":"pushState"](f,"",h),o.value=f}catch(v){console.error(v),t[c?"replace":"assign"](h)}}function i(l,f){a(l,ee({},n.state,aa(o.value.back,l,o.value.forward,!0),f,{position:o.value.position}),!0),r.value=l}function s(l,f){const c=ee({},o.value,n.state,{forward:l,scroll:Jt()});a(c.current,c,!0),a(l,ee({},aa(r.value,l,null),{position:c.position+1},f),!1),r.value=l}return{location:r,state:o,push:s,replace:i}}function k0(e){e=y0(e);const n=O0(e),t=L0(e,n.state,n.location,n.replace);function r(a,i=!0){i||t.pauseListeners(),history.go(a)}const o=ee({location:"",base:e,go:r,createHref:x0.bind(null,e)},n,t);return Object.defineProperty(o,"location",{enumerable:!0,get:()=>n.location.value}),Object.defineProperty(o,"state",{enumerable:!0,get:()=>n.state.value}),o}function M0(e){return e=location.host?e||location.pathname+location.search:"",e.includes("#")||(e+="#"),k0(e)}let Nn=(function(e){return e[e.Static=0]="Static",e[e.Param=1]="Param",e[e.Group=2]="Group",e})({});var me=(function(e){return e[e.Static=0]="Static",e[e.Param=1]="Param",e[e.ParamRegExp=2]="ParamRegExp",e[e.ParamRegExpEnd=3]="ParamRegExpEnd",e[e.EscapeNext=4]="EscapeNext",e})(me||{});const H0={type:Nn.Static,value:""},z0=/[a-zA-Z0-9_]/;function B0(e){if(!e)return[[]];if(e==="/")return[[H0]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function n(v){throw new Error(`ERR (${t})/"${f}": ${v}`)}let t=me.Static,r=t;const o=[];let a;function i(){a&&o.push(a),a=[]}let s=0,l,f="",c="";function d(){f&&(t===me.Static?a.push({type:Nn.Static,value:f}):t===me.Param||t===me.ParamRegExp||t===me.ParamRegExpEnd?(a.length>1&&(l==="*"||l==="+")&&n(`A repeatable param (${f}) must be alone in its segment. eg: '/:ids+.`),a.push({type:Nn.Param,value:f,regexp:c,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):n("Invalid state to consume buffer"),f="")}function h(){f+=l}for(;s<e.length;){if(l=e[s++],l==="\\"&&t!==me.ParamRegExp){r=t,t=me.EscapeNext;continue}switch(t){case me.Static:l==="/"?(f&&d(),i()):l===":"?(d(),t=me.Param):h();break;case me.EscapeNext:h(),t=r;break;case me.Param:l==="("?t=me.ParamRegExp:z0.test(l)?h():(d(),t=me.Static,l!=="*"&&l!=="?"&&l!=="+"&&s--);break;case me.ParamRegExp:l===")"?c[c.length-1]=="\\"?c=c.slice(0,-1)+l:t=me.ParamRegExpEnd:c+=l;break;case me.ParamRegExpEnd:d(),t=me.Static,l!=="*"&&l!=="?"&&l!=="+"&&s--,c="";break;default:n("Unknown state");break}}return t===me.ParamRegExp&&n(`Unfinished custom RegExp for param "${f}"`),d(),i(),o}const ia="[^/]+?",U0={sensitive:!1,strict:!1,start:!0,end:!0};var Ee=(function(e){return e[e._multiplier=10]="_multiplier",e[e.Root=90]="Root",e[e.Segment=40]="Segment",e[e.SubSegment=30]="SubSegment",e[e.Static=40]="Static",e[e.Dynamic=20]="Dynamic",e[e.BonusCustomRegExp=10]="BonusCustomRegExp",e[e.BonusWildcard=-50]="BonusWildcard",e[e.BonusRepeatable=-20]="BonusRepeatable",e[e.BonusOptional=-8]="BonusOptional",e[e.BonusStrict=.7000000000000001]="BonusStrict",e[e.BonusCaseSensitive=.25]="BonusCaseSensitive",e})(Ee||{});const F0=/[.+*?^${}()[\]/\\]/g;function G0(e,n){const t=ee({},U0,n),r=[];let o=t.start?"^":"";const a=[];for(const f of e){const c=f.length?[]:[Ee.Root];t.strict&&!f.length&&(o+="/");for(let d=0;d<f.length;d++){const h=f[d];let v=Ee.Segment+(t.sensitive?Ee.BonusCaseSensitive:0);if(h.type===Nn.Static)d||(o+="/"),o+=h.value.replace(F0,"\\$&"),v+=Ee.Static;else if(h.type===Nn.Param){const{value:E,repeatable:S,optional:T,regexp:A}=h;a.push({name:E,repeatable:S,optional:T});const C=A||ia;if(C!==ia){v+=Ee.BonusCustomRegExp;try{`${C}`}catch(N){throw new Error(`Invalid custom RegExp for param "${E}" (${C}): `+N.message)}}let P=S?`((?:${C})(?:/(?:${C}))*)`:`(${C})`;d||(P=T&&f.length<2?`(?:/${P})`:"/"+P),T&&(P+="?"),o+=P,v+=Ee.Dynamic,T&&(v+=Ee.BonusOptional),S&&(v+=Ee.BonusRepeatable),C===".*"&&(v+=Ee.BonusWildcard)}c.push(v)}r.push(c)}if(t.strict&&t.end){const f=r.length-1;r[f][r[f].length-1]+=Ee.BonusStrict}t.strict||(o+="/?"),t.end?o+="$":t.strict&&!o.endsWith("/")&&(o+="(?:/|$)");const i=new RegExp(o,t.sensitive?"":"i");function s(f){const c=f.match(i),d={};if(!c)return null;for(let h=1;h<c.length;h++){const v=c[h]||"",E=a[h-1];d[E.name]=v&&E.repeatable?v.split("/"):v}return d}function l(f){let c="",d=!1;for(const h of e){(!d||!c.endsWith("/"))&&(c+="/"),d=!1;for(const v of h)if(v.type===Nn.Static)c+=v.value;else if(v.type===Nn.Param){const{value:E,repeatable:S,optional:T}=v,A=E in f?f[E]:"";if(qe(A)&&!S)throw new Error(`Provided param "${E}" is an array but it is not repeatable (* or + modifiers)`);const C=qe(A)?A.join("/"):A;if(!C)if(T)h.length<2&&(c.endsWith("/")?c=c.slice(0,-1):d=!0);else throw new Error(`Missing required param "${E}"`);c+=C}}return c||"/"}return{re:i,score:r,keys:a,parse:s,stringify:l}}function V0(e,n){let t=0;for(;t<e.length&&t<n.length;){const r=n[t]-e[t];if(r)return r;t++}return e.length<n.length?e.length===1&&e[0]===Ee.Static+Ee.Segment?-1:1:e.length>n.length?n.length===1&&n[0]===Ee.Static+Ee.Segment?1:-1:0}function Wi(e,n){let t=0;const r=e.score,o=n.score;for(;t<r.length&&t<o.length;){const a=V0(r[t],o[t]);if(a)return a;t++}if(Math.abs(o.length-r.length)===1){if(sa(r))return 1;if(sa(o))return-1}return o.length-r.length}function sa(e){const n=e[e.length-1];return e.length>0&&n[n.length-1]<0}const K0={strict:!1,end:!0,sensitive:!1};function Y0(e,n,t){const r=G0(B0(e.path),t),o=ee(r,{record:e,parent:n,children:[],alias:[]});return n&&!o.record.aliasOf==!n.record.aliasOf&&n.children.push(o),o}function W0(e,n){const t=[],r=new Map;n=Jo(K0,n);function o(d){return r.get(d)}function a(d,h,v){const E=!v,S=ca(d);S.aliasOf=v&&v.record;const T=Jo(n,d),A=[S];if("alias"in d){const N=typeof d.alias=="string"?[d.alias]:d.alias;for(const B of N)A.push(ca(ee({},S,{components:v?v.record.components:S.components,path:B,aliasOf:v?v.record:S})))}let C,P;for(const N of A){const{path:B}=N;if(h&&B[0]!=="/"){const q=h.record.path,W=q[q.length-1]==="/"?"":"/";N.path=h.record.path+(B&&W+B)}if(C=Y0(N,h,T),v?v.alias.push(C):(P=P||C,P!==C&&P.alias.push(C),E&&d.name&&!fa(C)&&i(d.name)),qi(C)&&l(C),S.children){const q=S.children;for(let W=0;W<q.length;W++)a(q[W],C,v&&v.children[W])}v=v||C}return P?()=>{i(P)}:ut}function i(d){if(Vi(d)){const h=r.get(d);h&&(r.delete(d),t.splice(t.indexOf(h),1),h.children.forEach(i),h.alias.forEach(i))}else{const h=t.indexOf(d);h>-1&&(t.splice(h,1),d.record.name&&r.delete(d.record.name),d.children.forEach(i),d.alias.forEach(i))}}function s(){return t}function l(d){const h=j0(d,t);t.splice(h,0,d),d.record.name&&!fa(d)&&r.set(d.record.name,d)}function f(d,h){let v,E={},S,T;if("name"in d&&d.name){if(v=r.get(d.name),!v)throw jn(ce.MATCHER_NOT_FOUND,{location:d});T=v.record.name,E=ee(la(h.params,v.keys.filter(P=>!P.optional).concat(v.parent?v.parent.keys.filter(P=>P.optional):[]).map(P=>P.name)),d.params&&la(d.params,v.keys.map(P=>P.name))),S=v.stringify(E)}else if(d.path!=null)S=d.path,v=t.find(P=>P.re.test(S)),v&&(E=v.parse(S),T=v.record.name);else{if(v=h.name?r.get(h.name):t.find(P=>P.re.test(h.path)),!v)throw jn(ce.MATCHER_NOT_FOUND,{location:d,currentLocation:h});T=v.record.name,E=ee({},h.params,d.params),S=v.stringify(E)}const A=[];let C=v;for(;C;)A.unshift(C.record),C=C.parent;return{name:T,path:S,params:E,matched:A,meta:X0(A)}}e.forEach(d=>a(d));function c(){t.length=0,r.clear()}return{addRoute:a,resolve:f,removeRoute:i,clearRoutes:c,getRoutes:s,getRecordMatcher:o}}function la(e,n){const t={};for(const r of n)r in e&&(t[r]=e[r]);return t}function ca(e){const n={path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:e.aliasOf,beforeEnter:e.beforeEnter,props:q0(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}};return Object.defineProperty(n,"mods",{value:{}}),n}function q0(e){const n={},t=e.props||!1;if("component"in e)n.default=t;else for(const r in e.components)n[r]=typeof t=="object"?t[r]:t;return n}function fa(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function X0(e){return e.reduce((n,t)=>ee(n,t.meta),{})}function j0(e,n){let t=0,r=n.length;for(;t!==r;){const a=t+r>>1;Wi(e,n[a])<0?r=a:t=a+1}const o=Q0(e);return o&&(r=n.lastIndexOf(o,r-1)),r}function Q0(e){let n=e;for(;n=n.parent;)if(qi(n)&&Wi(e,n)===0)return n}function qi({record:e}){return!!(e.name||e.components&&Object.keys(e.components).length||e.redirect)}function da(e){const n=Ke(er),t=Ke(ao),r=He(()=>{const l=Pe(e.to);return n.resolve(l)}),o=He(()=>{const{matched:l}=r.value,{length:f}=l,c=l[f-1],d=t.matched;if(!c||!d.length)return-1;const h=d.findIndex(Xn.bind(null,c));if(h>-1)return h;const v=ua(l[f-2]);return f>1&&ua(c)===v&&d[d.length-1].path!==v?d.findIndex(Xn.bind(null,l[f-2])):h}),a=He(()=>o.value>-1&&nf(t.params,r.value.params)),i=He(()=>o.value>-1&&o.value===t.matched.length-1&&Gi(t.params,r.value.params));function s(l={}){if(ef(l)){const f=n[Pe(e.replace)?"replace":"push"](Pe(e.to)).catch(ut);return e.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>f),f}return Promise.resolve()}return{route:r,href:He(()=>r.value.href),isActive:a,isExactActive:i,navigate:s}}function Z0(e){return e.length===1?e[0]:e}const $0=An({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:da,setup(e,{slots:n}){const t=qt(da(e)),{options:r}=Ke(er),o=He(()=>({[pa(e.activeClass,r.linkActiveClass,"router-link-active")]:t.isActive,[pa(e.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:t.isExactActive}));return()=>{const a=n.default&&Z0(n.default(t));return e.custom?a:Ii("a",{"aria-current":t.isExactActive?e.ariaCurrentValue:null,href:t.href,onClick:t.navigate,class:o.value},a)}}}),J0=$0;function ef(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const n=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(n))return}return e.preventDefault&&e.preventDefault(),!0}}function nf(e,n){for(const t in n){const r=n[t],o=e[t];if(typeof r=="string"){if(r!==o)return!1}else if(!qe(o)||o.length!==r.length||r.some((a,i)=>a.valueOf()!==o[i].valueOf()))return!1}return!0}function ua(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const pa=(e,n,t)=>e??n??t,tf=An({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:n,slots:t}){const r=Ke(Or),o=He(()=>e.route||r.value),a=Ke(oa,0),i=He(()=>{let f=Pe(a);const{matched:c}=o.value;let d;for(;(d=c[f])&&!d.components;)f++;return f}),s=He(()=>o.value.matched[i.value]);Rt(oa,He(()=>i.value+1)),Rt(D0,s),Rt(Or,o);const l=Ne();return st(()=>[l.value,s.value,e.name],([f,c,d],[h,v,E])=>{c&&(c.instances[d]=f,v&&v!==c&&f&&f===h&&(c.leaveGuards.size||(c.leaveGuards=v.leaveGuards),c.updateGuards.size||(c.updateGuards=v.updateGuards))),f&&c&&(!v||!Xn(c,v)||!h)&&(c.enterCallbacks[d]||[]).forEach(S=>S(f))},{flush:"post"}),()=>{const f=o.value,c=e.name,d=s.value,h=d&&d.components[c];if(!h)return ha(t.default,{Component:h,route:f});const v=d.props[c],E=v?v===!0?f.params:typeof v=="function"?v(f):v:null,T=Ii(h,ee({},E,n,{onVnodeUnmounted:A=>{A.component.isUnmounted&&(d.instances[c]=null)},ref:l}));return ha(t.default,{Component:T,route:f})||T}}});function ha(e,n){if(!e)return null;const t=e(n);return t.length===1?t[0]:t}const rf=tf;function of(e){const n=W0(e.routes,e),t=e.parseQuery||R0,r=e.stringifyQuery||ra,o=e.history,a=nt(),i=nt(),s=nt(),l=Ps(bn);let f=bn;Un&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const c=hr.bind(null,y=>""+y),d=hr.bind(null,d0),h=hr.bind(null,bt);function v(y,k){let D,M;return Vi(y)?(D=n.getRecordMatcher(y),M=k):M=y,n.addRoute(M,D)}function E(y){const k=n.getRecordMatcher(y);k&&n.removeRoute(k)}function S(){return n.getRoutes().map(y=>y.record)}function T(y){return!!n.getRecordMatcher(y)}function A(y,k){if(k=ee({},k||l.value),typeof y=="string"){const m=mr(t,y,k.path),g=n.resolve({path:m.path},k),x=o.createHref(m.fullPath);return ee(m,g,{params:h(g.params),hash:bt(m.hash),redirectedFrom:void 0,href:x})}let D;if(y.path!=null)D=ee({},y,{path:mr(t,y.path,k.path).path});else{const m=ee({},y.params);for(const g in m)m[g]==null&&delete m[g];D=ee({},y,{params:d(m)}),k.params=d(k.params)}const M=n.resolve(D,k),X=y.hash||"";M.params=c(h(M.params));const u=h0(r,ee({},y,{hash:l0(X),path:M.path})),p=o.createHref(u);return ee({fullPath:u,hash:X,query:r===ra?I0(y.query):y.query||{}},M,{redirectedFrom:void 0,href:p})}function C(y){return typeof y=="string"?mr(t,y,l.value.path):ee({},y)}function P(y,k){if(f!==y)return jn(ce.NAVIGATION_CANCELLED,{from:k,to:y})}function N(y){return W(y)}function B(y){return N(ee(C(y),{replace:!0}))}function q(y,k){const D=y.matched[y.matched.length-1];if(D&&D.redirect){const{redirect:M}=D;let X=typeof M=="function"?M(y,k):M;return typeof X=="string"&&(X=X.includes("?")||X.includes("#")?X=C(X):{path:X},X.params={}),ee({query:y.query,hash:y.hash,params:X.path!=null?{}:y.params},X)}}function W(y,k){const D=f=A(y),M=l.value,X=y.state,u=y.force,p=y.replace===!0,m=q(D,M);if(m)return W(ee(C(m),{state:typeof m=="object"?ee({},X,m.state):X,force:u,replace:p}),k||D);const g=D;g.redirectedFrom=k;let x;return!u&&m0(r,M,D)&&(x=jn(ce.NAVIGATION_DUPLICATED,{to:g,from:M}),fe(M,M,!0,!1)),(x?Promise.resolve(x):K(g,M)).catch(b=>cn(b)?cn(b,ce.NAVIGATION_GUARD_REDIRECT)?b:Xe(b):Y(b,g,M)).then(b=>{if(b){if(cn(b,ce.NAVIGATION_GUARD_REDIRECT))return W(ee({replace:p},C(b.to),{state:typeof b.to=="object"?ee({},X,b.to.state):X,force:u}),k||g)}else b=O(g,M,!0,p,X);return $(g,M,b),b})}function ue(y,k){const D=P(y,k);return D?Promise.reject(D):Promise.resolve()}function U(y){const k=sn.values().next().value;return k&&typeof k.runWithContext=="function"?k.runWithContext(y):y()}function K(y,k){let D;const[M,X,u]=P0(y,k);D=gr(M.reverse(),"beforeRouteLeave",y,k);for(const m of M)m.leaveGuards.forEach(g=>{D.push(Cn(g,y,k))});const p=ue.bind(null,y,k);return D.push(p),we(D).then(()=>{D=[];for(const m of a.list())D.push(Cn(m,y,k));return D.push(p),we(D)}).then(()=>{D=gr(X,"beforeRouteUpdate",y,k);for(const m of X)m.updateGuards.forEach(g=>{D.push(Cn(g,y,k))});return D.push(p),we(D)}).then(()=>{D=[];for(const m of u)if(m.beforeEnter)if(qe(m.beforeEnter))for(const g of m.beforeEnter)D.push(Cn(g,y,k));else D.push(Cn(m.beforeEnter,y,k));return D.push(p),we(D)}).then(()=>(y.matched.forEach(m=>m.enterCallbacks={}),D=gr(u,"beforeRouteEnter",y,k,U),D.push(p),we(D))).then(()=>{D=[];for(const m of i.list())D.push(Cn(m,y,k));return D.push(p),we(D)}).catch(m=>cn(m,ce.NAVIGATION_CANCELLED)?m:Promise.reject(m))}function $(y,k,D){s.list().forEach(M=>U(()=>M(y,k,D)))}function O(y,k,D,M,X){const u=P(y,k);if(u)return u;const p=k===bn,m=Un?history.state:{};D&&(M||p?o.replace(y.fullPath,ee({scroll:p&&m&&m.scroll},X)):o.push(y.fullPath,X)),l.value=y,fe(y,k,D,p),Xe()}let Q;function se(){Q||(Q=o.listen((y,k,D)=>{if(!je.listening)return;const M=A(y),X=q(M,je.currentRoute.value);if(X){W(ee(X,{replace:!0,force:!0}),M).catch(ut);return}f=M;const u=l.value;Un&&E0(ta(u.fullPath,D.delta),Jt()),K(M,u).catch(p=>cn(p,ce.NAVIGATION_ABORTED|ce.NAVIGATION_CANCELLED)?p:cn(p,ce.NAVIGATION_GUARD_REDIRECT)?(W(ee(C(p.to),{force:!0}),M).then(m=>{cn(m,ce.NAVIGATION_ABORTED|ce.NAVIGATION_DUPLICATED)&&!D.delta&&D.type===Nr.pop&&o.go(-1,!1)}).catch(ut),Promise.reject()):(D.delta&&o.go(-D.delta,!1),Y(p,M,u))).then(p=>{p=p||O(M,u,!1),p&&(D.delta&&!cn(p,ce.NAVIGATION_CANCELLED)?o.go(-D.delta,!1):D.type===Nr.pop&&cn(p,ce.NAVIGATION_ABORTED|ce.NAVIGATION_DUPLICATED)&&o.go(-1,!1)),$(M,u,p)}).catch(ut)}))}let ve=nt(),le=nt(),J;function Y(y,k,D){Xe(y);const M=le.list();return M.length?M.forEach(X=>X(y,k,D)):console.error(y),Promise.reject(y)}function Fe(){return J&&l.value!==bn?Promise.resolve():new Promise((y,k)=>{ve.add([y,k])})}function Xe(y){return J||(J=!y,se(),ve.list().forEach(([k,D])=>y?D(y):k()),ve.reset()),y}function fe(y,k,D,M){const{scrollBehavior:X}=e;if(!Un||!X)return Promise.resolve();const u=!D&&C0(ta(y.fullPath,0))||(M||!D)&&history.state&&history.state.scroll||null;return Wa().then(()=>X(y,k,u)).then(p=>p&&S0(p)).catch(p=>Y(p,y,k))}const ge=y=>o.go(y);let an;const sn=new Set,je={currentRoute:l,listening:!0,addRoute:v,removeRoute:E,clearRoutes:n.clearRoutes,hasRoute:T,getRoutes:S,resolve:A,options:e,push:N,replace:B,go:ge,back:()=>ge(-1),forward:()=>ge(1),beforeEach:a.add,beforeResolve:i.add,afterEach:s.add,onError:le.add,isReady:Fe,install(y){y.component("RouterLink",J0),y.component("RouterView",rf),y.config.globalProperties.$router=je,Object.defineProperty(y.config.globalProperties,"$route",{enumerable:!0,get:()=>Pe(l)}),Un&&!an&&l.value===bn&&(an=!0,N(o.location).catch(M=>{}));const k={};for(const M in bn)Object.defineProperty(k,M,{get:()=>l.value[M],enumerable:!0});y.provide(er,je),y.provide(ao,Ga(k)),y.provide(Or,l);const D=y.unmount;sn.add(y),y.unmount=function(){sn.delete(y),sn.size<1&&(f=bn,Q&&Q(),Q=null,l.value=bn,an=!1,J=!1),D()}}};function we(y){return y.reduce((k,D)=>k.then(()=>U(D)),Promise.resolve())}return je}function af(){return Ke(er)}function md(e){return Ke(ao)}const sf="/assets/screenshot-BGlXLzxn.webp",lf="/assets/screenshot-BU-MfndP.webp",cf="/assets/screenshot-BbBk66JL.webp",ff="/assets/screenshot-DJ8DWsNe.webp",df="/assets/screenshot-Bgnvpmle.webp",uf="/assets/screenshot-DI4mxV0q.webp",pf="/assets/screenshot-Cr4gcPub.webp",hf="/assets/screenshot-Bftu4Vm4.webp",mf="/assets/screenshot-D69-qLJd.webp",vf="/assets/screenshot-BHPmctOt.webp",gf="/assets/screenshot-uj0WCOUe.webp",yf="/assets/screenshot-CbvnZ5gw.webp",bf="/assets/screenshot-D2kvp1Pc.webp",xf="/assets/screenshot-FespJOdi.webp",wf="/assets/screenshot-BYNpPvRq.webp",Sf="/assets/screenshot-TbFZaVjZ.webp",Ef="/assets/screenshot-eXevvs9S.webp",Cf="/assets/screenshot-BXUdMyeo.webp",Tf="/assets/screenshot-CLKNMPWT.webp",_f="/assets/screenshot-Dge5FRDF.webp",Af="/assets/screenshot-DtcnOqgw.webp",Rf="/assets/screenshot-o465L8pw.webp",If="/assets/screenshot-BeLUHnME.webp",Df="/assets/screenshot-dnSW_Jt8.webp",Pf="/assets/screenshot-Zy4Ap0si.webp",Nf="/assets/screenshot-GJoazymJ.webp",Lf="/assets/screenshot-Dj7Yx2aa.webp",Of="/assets/screenshot-CHzCcHjz.webp",kf="/assets/screenshot-UCJWYxEG.webp",Mf="/assets/screenshot-DXkgzLB7.webp",Xi=[{slug:"arrakis",title:"24h in Arrakis",description:"A full day/night cycle of pure raymarched desert poetry.",date:"2026-02-12",tags:["raymarching","3d","noise"],links:{},screenshotUrl:sf,passes:{image:`/**
 * 24h in Arrakis
 * @author guinetik
 * @date 2026-02-12
 *
 * "Arrakis is so beautiful when the sun is low."
 * The desert planet — twin suns arc across the sky,
 * spice-laden winds, heat shimmer, and the worm's domain.
 * Full day/night cycle (~80s) with raymarched dune terrain,
 * periodic spice storms, and sandworm tracks.
 */

#define PI 3.14159265359
#define TAU 6.28318530718

// ── noise primitives ──────────────────────────────────────────

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float hash21(float p) {
    return fract(sin(p * 127.1) * 43758.5453);
}

float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
        mix(hash(i), hash(i + vec2(1, 0)), f.x),
        mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x),
        f.y
    );
}

float fbm(vec2 p, int octaves) {
    float v = 0.0, a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        v += a * noise(p);
        p = rot * p * 2.0;
        a *= 0.5;
    }
    return v;
}

// ── palettes ──────────────────────────────────────────────────

vec3 sandPalette(float t) {
    // warm desert golds → burnt orange → deep rust → bleached bone
    vec3 a = vec3(0.78, 0.50, 0.28);
    vec3 b = vec3(0.28, 0.20, 0.12);
    vec3 c = vec3(1.0, 0.7, 0.4);
    vec3 d = vec3(0.00, 0.15, 0.25);
    return a + b * cos(TAU * (c * t + d));
}

vec3 spicePalette(float t) {
    // melange purple → violet → deep indigo
    vec3 a = vec3(0.55, 0.20, 0.65);
    vec3 b = vec3(0.30, 0.15, 0.25);
    vec3 c = vec3(1.0, 0.8, 0.6);
    vec3 d = vec3(0.10, 0.25, 0.50);
    return a + b * cos(TAU * (c * t + d));
}

vec3 skyPalette(float t) {
    // pale amber zenith → burnt horizon
    vec3 a = vec3(0.90, 0.72, 0.48);
    vec3 b = vec3(0.15, 0.12, 0.10);
    vec3 c = vec3(0.5, 0.5, 0.3);
    vec3 d = vec3(0.25, 0.30, 0.40);
    return a + b * cos(TAU * (c * t + d));
}

// ── dune terrain ──────────────────────────────────────────────

// sharp asymmetric dune ridge — steep slip face, gentle windward slope
float duneRidge(float x) {
    float s = sin(x);
    // sharpen the peaks, flatten the troughs
    return s * s * sign(s) * 0.5 + 0.5 * s;
}

float duneHeight(vec2 p, float time) {
    // 1. regional mask — cheap single noise instead of fbm
    float region = noise(p * 0.025 + time * 0.002);
    float duneMask = smoothstep(0.30, 0.55, region);

    // 2. flat basin floor
    float basin = noise(p * 0.04) * 0.3 - 0.5;

    // 3. primary mega-dunes
    float megaDune = duneRidge(p.x * 0.12 + p.y * 0.28 + time * 0.008) * 3.5
                   + duneRidge(p.x * 0.22 - p.y * 0.10 + time * 0.005) * 1.8;
    // height variation — single noise lookup instead of fbm
    megaDune *= 0.5 + noise(p * 0.05 + vec2(3.7, 8.1));

    // 4. medium dunes
    float medDune = duneRidge(p.x * 0.5 + p.y * 1.5 + time * 0.015) * 0.6
                  + duneRidge(p.x * 0.8 - p.y * 0.4 + time * 0.012) * 0.35;

    // 5. wind ripples — single layer
    float ripple = noise(p * vec2(8.0, 3.0) + vec2(time * 0.1, 0.0)) * 0.09;

    float h = basin;
    h += (megaDune + medDune) * duneMask;
    h += ripple * (0.2 + 0.8 * duneMask);

    return h;
}

// ── ray marching the dune field ───────────────────────────────

float terrainMap(vec3 p, float time) {
    return p.y - duneHeight(p.xz, time);
}

vec3 terrainNormal(vec3 p, float time) {
    vec2 e = vec2(0.03, 0.0);
    return normalize(vec3(
        terrainMap(p + e.xyy, time) - terrainMap(p - e.xyy, time),
        terrainMap(p + e.yxy, time) - terrainMap(p - e.yxy, time),
        terrainMap(p + e.yyx, time) - terrainMap(p - e.yyx, time)
    ));
}

float marchTerrain(vec3 ro, vec3 rd, float time) {
    float t = 0.0;
    for (int i = 0; i < 80; i++) {
        vec3 p = ro + rd * t;
        float d = terrainMap(p, time);
        if (d < 0.005 * t) return t;
        if (t > 180.0) break;
        t += d * 0.7 + 0.02;
    }
    return -1.0;
}

// ── twin suns ─────────────────────────────────────────────────

vec3 sun(vec2 uv, vec2 pos, float size, vec3 color, float halo) {
    float d = length(uv - pos);
    vec3 col = vec3(0.0);
    // core
    col += color * smoothstep(size, size * 0.2, d);
    // corona
    col += color * 0.6 * exp(-d * d * halo);
    // outer halo
    col += color * 0.15 * exp(-d * 3.0);
    return col;
}

// ── sandworm track ────────────────────────────────────────────

float wormTrack(vec2 p, float time) {
    // sinuous path carved through the sand
    float wormX = sin(p.y * 0.12 + time * 0.08) * 8.0
                + sin(p.y * 0.05 - time * 0.03) * 15.0;
    float dist = abs(p.x - wormX);
    // track width varies
    float width = 2.5 + sin(p.y * 0.3 + time * 0.1) * 0.8;
    return smoothstep(width, width * 0.3, dist);
}

// ── spice blow ────────────────────────────────────────────────

vec3 spiceBlow(vec2 uv, float time) {
    vec3 col = vec3(0.0);

    // sporadic eruption — only one burst at a time, cycles every ~15s
    for (float i = 0.0; i < 3.0; i++) {
        // each eruption has its own phase, only briefly burst
        float phase = sin(time * 0.2 + i * 2.09) * 0.5 + 0.5;
        float burst = smoothstep(0.7, 0.85, phase) * smoothstep(1.0, 0.92, phase);
        if (burst < 0.01) continue;

        vec2 center = vec2(
            sin(time * 0.03 + i * 2.09) * 0.25,
            cos(time * 0.02 + i * 1.73) * 0.1 - 0.05
        );

        float d = length(uv - center);
        // tight, small cloud — not a screen-filling blanket
        float cloud = fbm((uv - center) * 14.0 + time * 0.3, 4);
        float mask = exp(-d * d * 60.0) * burst;
        col += spicePalette(cloud + i * 0.33) * mask * cloud * 0.5;

        // small bright core flash
        col += vec3(0.7, 0.4, 1.0) * exp(-d * d * 200.0) * burst * 0.3;
    }

    return col;
}

// ── heat distortion ───────────────────────────────────────────
// Two noise layers simulate convective air shimmer above hot sand:
//   Layer 1: 3.0 x 20.0 — wide horizontally, narrow vertically (tall rising-air columns)
//   Layer 2: 5.0 x 35.0 — finer detail at higher frequency, scrolls faster
// The asymmetric UV scaling stretches noise vertically, mimicking real
// heat shimmer which distorts more along the vertical axis.

vec2 heatHaze(vec2 uv, float time) {
    float distort = noise(uv * vec2(3.0, 20.0) + vec2(0.0, time * 0.8)) * 2.0 - 1.0;
    distort += noise(uv * vec2(5.0, 35.0) + vec2(time * 0.3, time * 1.2)) * 0.5;
    // stronger near the horizon — where real mirages appear
    float horizonMask = smoothstep(0.1, -0.15, uv.y);
    return vec2(distort * 0.006 * horizonMask, distort * 0.003 * horizonMask);
}

// ── main ──────────────────────────────────────────────────────

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / min(iResolution.x, iResolution.y);
    float time = iTime;

    // ── day/night cycle — ~80s full rotation ─────────────
    // phases (in dayCycle 0→1):
    //   0.00–0.10  dawn / sunrise (sun climbs from below horizon)
    //   0.10–0.20  golden hour morning (sun low, warm light)
    //   0.20–0.45  midday (sun at peak)
    //   0.45–0.55  golden hour evening (sun sinking, long shadows)
    //   0.55–0.65  sunset (sun on the horizon, deep reds)
    //   0.65–0.70  dusk (sun gone, sky fading)
    //   0.70–0.95  night (moons arc across)
    //   0.95–1.00  pre-dawn (sky lightening)
    float dayCycle = fract(time / 80.0 + 0.15); // offset so t=0 starts in morning

    // sun elevation — uses sin curve but remapped to spend more time low
    float sunPhase = smoothstep(0.0, 0.65, dayCycle); // 0→1 over the sun's journey
    float sunElev = 0.0;
    if (dayCycle < 0.65) {
        // sin arc: rises at 0, peaks at ~0.32, sets at 0.65
        sunElev = sin(sunPhase * PI) * 0.30;
    } else if (dayCycle < 0.70) {
        // dusk: sun sinks below horizon
        float duskT = (dayCycle - 0.65) / 0.05;
        sunElev = -0.3 * duskT;
    } else {
        sunElev = -0.3; // fully below
    }

    float daylight = smoothstep(-0.02, 0.06, sunElev);
    // sunset factor: wide window when sun is low but still visible
    float sunsetFactor = smoothstep(0.15, 0.03, sunElev) * smoothstep(-0.01, 0.01, sunElev);

    // sun screen position: sweeps left→right, stops at edge when setting
    float sunScreenX = mix(-0.50, 0.55, clamp(dayCycle / 0.65, 0.0, 1.0));
    float sunScreenY = max(sunElev, -0.08) * 0.9; // sinks just below horizon line

    // world-space sun direction for lighting
    vec3 sunDir1 = normalize(vec3(sunScreenX, max(sunElev, 0.01), 1.0));
    vec3 sunDir2 = normalize(vec3(sunScreenX - 0.12, max(sunElev * 0.8, 0.01), 1.0));

    // moon: arcs across during night (0.70–0.95), with rise/set at horizon
    float moonStart = 0.70;
    float moonEnd = 0.97;
    float nightPhase = clamp((dayCycle - moonStart) / (moonEnd - moonStart), 0.0, 1.0);
    float moonElev = 0.0;
    if (dayCycle > moonStart && dayCycle < moonEnd) {
        moonElev = sin(nightPhase * PI) * 0.40;
    }
    float moonScreenX = mix(-0.45, 0.50, nightPhase);
    float moonScreenY = moonElev * 1.2;
    vec3 moonDir = normalize(vec3(moonScreenX, max(moonElev, 0.01), 1.0));
    float moonVis = smoothstep(0.0, 0.05, moonElev);

    // heat shimmer distortion — only during the day
    uv += heatHaze(uv, time) * daylight;

    // camera — high enough to see over the mega-dunes
    float camHeight = 8.0 + sin(time * 0.08) * 2.0;
    vec3 ro = vec3(time * 0.6, camHeight, time * 0.25);
    vec3 lookAt = ro + vec3(0.8, -0.25, 0.6);
    vec3 forward = normalize(lookAt - ro);
    vec3 right = normalize(cross(forward, vec3(0, 1, 0)));
    vec3 up = cross(right, forward);
    vec3 rd = normalize(forward + uv.x * right + uv.y * up);

    // ── sky ────────────────────────────────────────────────
    vec3 col = vec3(0.0);

    float skyGrad = smoothstep(-0.1, 0.6, rd.y);
    float highSky = smoothstep(0.4, 0.9, rd.y);

    // day sky
    vec3 dayHorizon = vec3(0.95, 0.55, 0.25);
    vec3 dayZenith = vec3(0.70, 0.42, 0.30);
    vec3 dayUpper = vec3(0.40, 0.22, 0.45);
    vec3 daySky = mix(dayHorizon, dayZenith, skyGrad);
    daySky = mix(daySky, dayUpper, highSky);

    // sunset sky — deep reds, oranges, purples
    vec3 sunsetHorizon = vec3(1.0, 0.30, 0.08);
    vec3 sunsetZenith = vec3(0.55, 0.18, 0.40);
    vec3 sunsetUpper = vec3(0.20, 0.08, 0.35);
    vec3 sunsetSky = mix(sunsetHorizon, sunsetZenith, skyGrad);
    sunsetSky = mix(sunsetSky, sunsetUpper, highSky);

    // night sky — deep indigo
    vec3 nightHorizon = vec3(0.06, 0.04, 0.10);
    vec3 nightZenith = vec3(0.02, 0.01, 0.06);
    vec3 nightSky = mix(nightHorizon, nightZenith, skyGrad);

    // blend: night → sunset → day → sunset → night
    vec3 sky = mix(nightSky, daySky, daylight);
    sky = mix(sky, sunsetSky, sunsetFactor);

    // atmospheric haze bands
    float hazeBand = fbm(vec2(rd.x * 3.0 + time * 0.01, rd.y * 8.0), 3);
    sky += vec3(0.15, 0.06, 0.10) * hazeBand * smoothstep(0.3, 0.0, abs(rd.y)) * daylight;

    // horizon glow — stronger at sunset, warm ember at night
    float horizonGlow = smoothstep(0.15, 0.0, abs(rd.y));
    sky += vec3(0.40, 0.12, 0.05) * horizonGlow * 0.3 * daylight;
    sky += vec3(0.80, 0.25, 0.05) * horizonGlow * 0.6 * sunsetFactor;
    sky += vec3(0.05, 0.02, 0.08) * horizonGlow * 0.3 * (1.0 - daylight); // faint night glow

    col = sky;

    // ── stars — visible at night ─────────────────────────
    float nightAmount = 1.0 - daylight;
    if (nightAmount > 0.01) {
        for (float i = 0.0; i < 5.0; i++) {
            vec2 starUV = rd.xz * (60.0 + i * 80.0) / max(rd.y, 0.01);
            vec2 starId = floor(starUV);
            vec2 starF = fract(starUV) - 0.5;
            float sh = hash(starId + i * 137.0);
            float starDist = length(starF);

            if (sh > 0.90) {
                float starBright = exp(-starDist * starDist * 400.0);
                starBright *= step(0.05, rd.y); // only above horizon
                float twinkle = 0.7 + 0.3 * sin(time * (2.0 + sh * 5.0) + sh * TAU);
                vec3 starCol = mix(vec3(0.8, 0.85, 1.0), vec3(1.0, 0.8, 0.6), sh);
                col += starCol * starBright * twinkle * nightAmount * 0.6;
            }
        }

        // a few bright guide stars
        for (float i = 0.0; i < 3.0; i++) {
            vec2 gPos = vec2(sin(i * 2.39 + 0.5) * 0.5, 0.3 + i * 0.12);
            vec2 starUV2 = vec2(dot(rd, right), dot(rd, up));
            float gDist = length(starUV2 - gPos);
            float glow = exp(-gDist * gDist * 200.0) * 0.4;
            glow += exp(-gDist * gDist * 2000.0) * 0.6;
            vec3 gCol = mix(vec3(0.7, 0.8, 1.0), vec3(1.0, 0.6, 0.4), i / 3.0);
            col += gCol * glow * nightAmount;
        }
    }

    // save sky before celestial bodies — terrain fog blends toward this
    vec3 skyCol = col;

    // ── twin suns — arc across the sky from horizon to horizon ──
    vec2 sun1Pos = vec2(sunScreenX, sunScreenY);
    vec2 sun2Pos = vec2(sunScreenX - 0.12, sunScreenY * 0.8 - 0.02);
    float sun1Vis = smoothstep(0.0, 0.03, sunElev);
    float sun2Vis = smoothstep(0.0, 0.03, sunElev) * 0.9;
    vec3 sun1Col = mix(vec3(1.0, 0.25, 0.02), vec3(1.0, 0.55, 0.12), smoothstep(0.0, 0.20, sunElev));
    vec3 sun2Col = mix(vec3(1.0, 0.15, 0.01), vec3(1.0, 0.40, 0.08), smoothstep(0.0, 0.20, sunElev));
    col += sun(uv, sun1Pos, 0.06, sun1Col * 1.3, 35.0) * sun1Vis;
    col += sun(uv, sun2Pos, 0.04, sun2Col * 1.2, 50.0) * sun2Vis;

    // ── terrain ────────────────────────────────────────────
    float t = marchTerrain(ro, rd, time);

    if (t > 0.0) {
        vec3 p = ro + rd * t;
        vec3 n = terrainNormal(p, time);

        // ── sand grain micro-detail ──────────────────────
        // two noise lookups, derive everything else from them
        float grainScale = 40.0 / (1.0 + t * 0.05);
        float grain1 = noise(p.xz * grainScale);
        float grain2 = noise(p.xz * grainScale + 77.7);

        // perturb normal for rough sand surface
        vec3 nGrain = normalize(n + vec3(grain1 - 0.5, 0.0, grain2 - 0.5) * 0.15);

        // diffuse from both suns
        float diff1 = max(dot(nGrain, sunDir1), 0.0) * sun1Vis;
        float diff2 = max(dot(nGrain, sunDir2), 0.0) * sun2Vis;
        float diff = diff1 * 0.7 + diff2 * 0.4;

        // specular — reuse grain noise for glint mask
        vec3 halfVec = normalize(sunDir1 - rd);
        float nDotH = max(dot(nGrain, halfVec), 0.0);
        float specRough = pow(nDotH, 8.0) * 0.12 * sun1Vis;
        float specSharp = pow(nDotH, 80.0) * grain2 * 0.5 * sun1Vis;
        float spec = specRough + specSharp;

        // ── sand color — reuse grain noise for variation ─
        float sandVar = noise(p.xz * 0.8) * 0.7 + grain1 * 0.3;
        vec3 sandCol = sandPalette(sandVar * 0.6 + 0.2);
        // micro variation from grain1
        sandCol *= 0.85 + 0.3 * grain1;
        sandCol = mix(sandCol, sandCol * vec3(1.05, 0.95, 0.85), grain1 * 0.3);

        // pores — derive from grain2 (already sampled, different offset)
        float pores = smoothstep(0.35, 0.25, grain2) * 0.15;
        sandCol *= 1.0 - pores;

        // darken wind shadow side of dunes
        float windShadow = smoothstep(0.0, 0.5, dot(n, vec3(0.7, 0.0, 0.7)));
        sandCol *= 0.6 + 0.4 * windShadow;

        // worm tracks — disturbed sand exposing spice-stained substrate
        float track = wormTrack(p.xz, time);
        vec3 trackCol = sandCol * 0.4 + vec3(0.12, 0.04, 0.15);
        sandCol = mix(sandCol, trackCol, track * 0.7);

        // ── lighting ─────────────────────────────────────
        vec3 sunLightCol = mix(vec3(1.0, 0.35, 0.10), vec3(1.0, 0.80, 0.55), smoothstep(0.0, 0.4, sunElev));
        vec3 dayAmbient = vec3(0.30, 0.20, 0.18);
        vec3 nightAmbient = vec3(0.04, 0.04, 0.08);
        vec3 ambient = mix(nightAmbient, dayAmbient, daylight);

        vec3 terrainCol = sandCol * (ambient + sunLightCol * diff);
        terrainCol += sunLightCol * spec;

        // rim light on dune crests — beautiful at sunset
        float rim = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
        vec3 rimCol = mix(vec3(1.0, 0.25, 0.08), vec3(1.0, 0.50, 0.20), smoothstep(0.0, 0.3, sunElev));
        terrainCol += rimCol * rim * 0.15 * daylight;
        // at sunset, extra-strong golden rim
        terrainCol += vec3(1.0, 0.40, 0.10) * rim * 0.25 * sunsetFactor;

        // night: moonlight from actual moon direction
        float moonDiff = max(dot(nGrain, moonDir), 0.0);
        terrainCol += vec3(0.08, 0.08, 0.18) * moonDiff * moonVis;

        // atmospheric fog — blend terrain into sky at distance (seamless horizon)
        float fogAmount = 1.0 - exp(-t * 0.008);
        fogAmount *= fogAmount;
        terrainCol = mix(terrainCol, skyCol, fogAmount);

        col = terrainCol;
    }

    // ── moons — rendered after terrain so dunes occlude them ──
    if (moonVis > 0.01 && t < 0.0) {
        // only draw moons where terrain was NOT hit (sky pixels)
        vec2 moon1Pos = vec2(moonScreenX, moonScreenY);
        float moonDist = length(uv - moon1Pos);
        float moonDisc = smoothstep(0.045, 0.035, moonDist);
        float shadow = smoothstep(0.04, 0.02, length(uv - moon1Pos + vec2(0.02, 0.01)));
        moonDisc *= 1.0 - shadow * 0.7;
        vec3 moonCol = vec3(0.75, 0.78, 0.90) * moonDisc;
        moonCol += vec3(0.3, 0.35, 0.55) * exp(-moonDist * moonDist * 60.0);
        col += moonCol * moonVis;

        vec2 moon2Pos = vec2(moonScreenX + 0.18, moonScreenY - 0.04);
        float moon2Dist = length(uv - moon2Pos);
        float moon2Disc = smoothstep(0.025, 0.018, moon2Dist);
        vec3 moon2Col = vec3(0.85, 0.75, 0.60) * moon2Disc;
        moon2Col += vec3(0.25, 0.20, 0.30) * exp(-moon2Dist * moon2Dist * 100.0);
        col += moon2Col * moonVis;
    }

    // ── spice in the atmosphere ────────────────────────────
    col += spiceBlow(uv, time);

    // ── dust in the wind — sparse drifting wisps ───────────
    float dust = fbm(uv * 3.0 + vec2(time * 0.12, time * 0.04), 5);
    float dustBreak = noise(uv * 1.5 + time * 0.03); // large-scale breakup
    float dustMask = smoothstep(0.55, 0.72, dust) * smoothstep(0.35, 0.65, dustBreak);
    dustMask *= smoothstep(0.25, -0.15, uv.y) * 0.25 * daylight;
    vec3 dustCol = mix(vec3(0.85, 0.35, 0.15), vec3(0.85, 0.55, 0.30), smoothstep(0.0, 0.3, sunElev));
    col += dustCol * dustMask;

    // ── periodic spice dust storm ────────────────────────────
    // every ~20s a wave of purple spice dust sweeps across the screen
    float stormCycle = mod(time, 20.0);
    float stormActive = smoothstep(8.0, 10.0, stormCycle) * smoothstep(16.0, 14.0, stormCycle);
    if (stormActive > 0.01) {
        // dust sweeps from left to right
        float stormProgress = (stormCycle - 9.0) / 6.0; // 0→1 over the burst window
        float waveFront = stormProgress * 3.0 - 1.0;

        // distance from the wave front
        float waveDist = uv.x - waveFront;
        float waveShape = smoothstep(0.6, 0.0, waveDist) * smoothstep(-0.8, -0.1, waveDist);

        // turbulent spice particles within the storm
        float stormNoise = fbm(uv * 6.0 + vec2(time * 0.5, time * 0.2), 5);
        float stormDetail = noise(uv * 25.0 + time * 1.5);

        // purple spice dust
        float spiceDust = waveShape * stormActive * stormNoise;
        vec3 spiceDustCol = mix(
            vec3(0.50, 0.18, 0.60), // deep purple
            vec3(0.75, 0.35, 0.85), // bright violet
            stormDetail
        );
        // add some iridescent shimmer
        spiceDustCol += vec3(0.15, 0.0, 0.2) * sin(uv.x * 30.0 + time * 3.0);
        col += spiceDustCol * spiceDust * 0.7;

        // bright spice motes within the storm
        for (float i = 0.0; i < 4.0; i++) {
            vec2 moteUV = uv * (50.0 + i * 40.0) + vec2(time * (2.0 + i), i * 7.7);
            vec2 moteId = floor(moteUV);
            vec2 moteF = fract(moteUV) - 0.5;
            float mh = hash(moteId + i * 77.0);
            float moteDist = length(moteF);
            if (mh > 0.92) {
                float flash = pow(sin(time * (5.0 + mh * 10.0) + mh * TAU) * 0.5 + 0.5, 3.0);
                float moteBright = exp(-moteDist * moteDist * 300.0) * flash * waveShape * stormActive;
                vec3 moteCol = mix(vec3(0.7, 0.3, 1.0), vec3(1.0, 0.7, 1.0), mh);
                col += moteCol * moteBright * 0.8;
            }
        }
    }

    // ── spice sparkle — tiny glints of melange ─────────────
    for (float i = 0.0; i < 3.0; i++) {
        vec2 sparkUV = uv * (80.0 + i * 60.0);
        vec2 sparkId = floor(sparkUV);
        vec2 sparkF = fract(sparkUV) - 0.5;
        float h = hash(sparkId + i * 100.0);
        float sparkDist = length(sparkF);

        if (h > 0.985) {
            float twinkle = sin(time * (3.0 + h * 8.0) + h * TAU) * 0.5 + 0.5;
            twinkle *= twinkle;
            float sparkBright = exp(-sparkDist * sparkDist * 200.0) * twinkle;
            // melange purple/violet glints among gold sand
            vec3 sparkCol = mix(vec3(1.0, 0.75, 0.25), vec3(0.6, 0.25, 1.0), h);
            col += sparkCol * sparkBright * 0.7;
        }
    }

    // ── post processing ────────────────────────────────────

    // vignette — dark edges like looking through a stillsuit visor
    float vig = 1.0 - dot(uv * 0.7, uv * 0.7);
    col *= smoothstep(-0.2, 0.5, vig);

    // subtle visor tint — stillsuit helmet, warm but not desaturating
    col = mix(col, col * vec3(1.0, 0.90, 0.85), 0.08);

    // film grain — desert grit
    col += (hash(fragCoord + fract(time * 17.0)) - 0.5) * 0.025;

    // tone mapping
    col = col / (col + 0.5);
    // gamma
    col = pow(max(col, 0.0), vec3(0.45));

    col = clamp(col, 0.0, 1.0);
    fragColor = vec4(col, 1.0);
}
`},channels:{}},{slug:"black-hole",title:"Black Hole",description:"Raytraced black hole with Newtonian gravitational lensing, a procedural accretion disk, and a starfield background that visibly bends around the event horizon. Based on Genuary 2026 Day 31.",date:"2026-01-31",tags:["genuary","space","3d","physics"],links:{},screenshotUrl:lf,passes:{image:`/**
 * Black Hole Raytracer
 *
 * Raytraced black hole with Newtonian gravitational lensing,
 * a procedural FBM-textured accretion disk, and a starfield
 * background that visibly bends around the event horizon.
 *
 * Physics model (simplified):
 *   Light rays are stepped through space. At each step,
 *   the ray velocity is deflected toward the singularity
 *   by an inverse-square gravitational acceleration:
 *     a = G * M / r^2  (Newton)
 *   Rays that cross the event horizon are absorbed (black).
 *   Rays that escape sample a procedural starfield, producing
 *   visible lensing arcs around the hole.
 *
 * Ported from Genuary 2026 Day 31 (blackhole.frag).
 *
 * @author guinetik
 * @date 2026-01-31
 */

// ── Constants ──────────────────────────────────────────────
#define PI 3.1415927

// Camera
#define CAMERA_DIST 2.0
#define CAMERA_ANGLE_V (PI * 0.48)
#define ORBIT_SPEED 0.08
#define FOV_FACTOR 1.5

// Black hole physics
#define EVENT_HORIZON_RADIUS 0.1
#define GRAVITY_STRENGTH 0.005
#define CAPTURE_THRESHOLD 0.001

// Raymarching
#define MAX_STEPS 150
#define STEP_SIZE 0.02
#define ADAPTIVE_NEAR 0.8
#define ADAPTIVE_FAR 1.5
#define ADAPTIVE_INNER 0.2
#define ADAPTIVE_OUTER 1.5

// Accretion disk
#define DISK_TORUS_MAJOR 1.0
#define DISK_TORUS_MINOR 1.2
#define DISK_FLATTEN 40.0
#define DISK_ROTATION_SPEED 0.6
#define DISK_INTENSITY 0.5
#define DISK_FALLOFF 100.0
#define DOPPLER_STRENGTH 0.7
#define FBM_OCTAVES 4

// Accretion disk colors (hot white center → orange → deep red edge)
#define OUTER_DISK_COLOR vec3(0.5, 0.12, 0.02)
#define MID_DISK_COLOR vec3(1.0, 0.55, 0.12)
#define INNER_DISK_COLOR vec3(1.0, 0.85, 0.6)

// Ambient glow near event horizon
#define GLOW_COLOR vec3(0.8, 0.5, 0.2)
#define GLOW_INTENSITY 0.00006

// Photon ring (Einstein ring) — warm white band at photon sphere
#define PHOTON_SPHERE_RADIUS 0.15
#define PHOTON_RING_WIDTH 0.02
#define PHOTON_RING_COLOR vec3(0.9, 0.7, 0.4)
#define PHOTON_RING_INTENSITY 0.0015

// Starfield
#define STAR_CELL_SIZE 50.0
#define STAR_THRESHOLD 0.97
#define STAR_BRIGHTNESS 0.4
#define STAR_POINT_SIZE 0.2
#define STAR_COLOR vec3(0.9, 0.95, 1.0)

// Post-processing
#define GAMMA vec3(0.45)

// ── Signed Distance Functions ──────────────────────────────

/** Distance from point p to a sphere at origin. */
float sdfSphere(vec3 p, float radius) {
    return length(p) - radius;
}

/**
 * Distance from point p to a torus.
 * t.x = major radius, t.y = minor radius.
 */
float sdfTorus(vec3 p, vec2 t) {
    vec2 q = vec2(length(p.xz) - t.x, p.y);
    return length(q) - t.y;
}

// ── Procedural Noise ───────────────────────────────────────

/** Hash function — pseudo-random from 2D input. */
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

/**
 * Smooth value noise — bilinear interpolation between grid cells.
 * Unlike raw hash(), this slides smoothly as input changes.
 */
float valueNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f); // Hermite smoothstep
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

/**
 * Fractal Brownian Motion — layered smooth noise for organic textures.
 * 4 octaves, each at double frequency and half amplitude.
 */
float fbmNoise(vec2 p) {
    float total = 0.0;
    float amplitude = 1.0;
    for (int i = 0; i < FBM_OCTAVES; i++) {
        total += amplitude * valueNoise(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return total;
}

// ── Starfield ──────────────────────────────────────────────

/**
 * Procedural starfield from ray direction.
 * Uses spherical coordinates for uniform distribution, then
 * places a point-star per cell with Gaussian falloff.
 */
vec3 starfield(vec3 rd) {
    // Spherical projection — avoids stretching at poles/edges
    vec2 sph = vec2(atan(rd.z, rd.x), asin(clamp(rd.y, -1.0, 1.0)));
    vec2 uv = sph * STAR_CELL_SIZE;
    vec2 cell = floor(uv);
    vec2 frac = fract(uv);

    // Check this cell and its neighbors to avoid cutoff at edges
    vec3 col = vec3(0.0);
    for (int dx = -1; dx <= 1; dx++) {
        for (int dy = -1; dy <= 1; dy++) {
            vec2 neighbor = cell + vec2(float(dx), float(dy));
            float h = hash(neighbor);
            if (h > STAR_THRESHOLD) {
                // Star position within its cell
                vec2 starPos = vec2(hash(neighbor + 7.0), hash(neighbor + 13.0));
                vec2 delta = (vec2(float(dx), float(dy)) + starPos) - frac;
                float d = length(delta) / STAR_POINT_SIZE;
                float brightness = exp(-d * d * 8.0);
                brightness *= (h - STAR_THRESHOLD) / (1.0 - STAR_THRESHOLD);
                vec3 tint = STAR_COLOR + vec3(hash(neighbor + 1.0) - 0.5,
                                               hash(neighbor + 2.0) - 0.5,
                                               hash(neighbor + 3.0) - 0.5) * 0.2;
                col += tint * brightness * STAR_BRIGHTNESS;
            }
        }
    }
    return col;
}

// ── Main ───────────────────────────────────────────────────

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    // UV setup with aspect correction
    vec2 uv = fragCoord / iResolution.xy;
    vec2 screenPos = uv * 2.0 - 1.0;
    screenPos.x *= iResolution.x / iResolution.y;

    // Camera: slow horizontal orbit around the black hole
    float cameraAngleH = PI * 0.5 + iTime * ORBIT_SPEED;

    vec3 cameraPos = vec3(
        CAMERA_DIST * cos(cameraAngleH) * sin(CAMERA_ANGLE_V),
        CAMERA_DIST * cos(CAMERA_ANGLE_V),
        CAMERA_DIST * sin(cameraAngleH) * sin(CAMERA_ANGLE_V)
    );

    // Camera orientation (look-at origin)
    vec3 forward = normalize(-cameraPos);
    vec3 right = normalize(cross(vec3(0.0, 1.0, -0.1), forward));
    vec3 up = normalize(cross(forward, right));

    // Ray for this pixel
    vec3 rayDir = normalize(forward * FOV_FACTOR + right * screenPos.x + up * screenPos.y);

    // ── Raytrace with gravitational lensing ────────────────

    vec3 rayPos = cameraPos;
    vec3 rayVel = rayDir;
    vec3 finalColor = vec3(0.0);
    float notCaptured = 1.0;

    for (int i = 0; i < MAX_STEPS; i++) {

        // Gravity: bend ray toward singularity
        vec3 toBH = -rayPos; // black hole at origin
        float dist = length(toBH);
        float distSq = dist * dist;

        // Adaptive step size: smaller near event horizon
        float adaptiveStep = STEP_SIZE * mix(ADAPTIVE_NEAR, ADAPTIVE_FAR,
                                              smoothstep(ADAPTIVE_INNER, ADAPTIVE_OUTER, dist));

        // Advance ray
        rayPos += rayVel * adaptiveStep * notCaptured;

        // Newton's inverse-square acceleration
        rayVel += normalize(toBH) * (GRAVITY_STRENGTH / distSq);

        // Check capture
        float distToHorizon = dist - EVENT_HORIZON_RADIUS;
        notCaptured = smoothstep(0.0, 0.666, distToHorizon);

        if (notCaptured < CAPTURE_THRESHOLD) break;

        // ── Accretion disk ─────────────────────────────────

        float diskRadius = length(toBH.xz);
        float diskAngle = atan(toBH.x, toBH.z);

        // Rotating angle for Kerr disk spin
        float rotAngle = diskAngle + iTime * DISK_ROTATION_SPEED;

        // FBM turbulence — visible clumps that rotate with the disk
        vec2 diskUV = vec2(diskRadius * 8.0, rotAngle * 5.0);
        float turbulence = fbmNoise(diskUV) * 0.5 + 0.5;
        // Second layer at different scale for finer detail
        turbulence *= fbmNoise(diskUV * 2.3 + 7.0) * 0.4 + 0.6;

        // Doppler beaming — approaching side much brighter, receding side dim
        float doppler = 1.0 + cos(rotAngle) * DOPPLER_STRENGTH;

        // Radial heat gradient: hot white center → orange → deep red edge
        float distFromBH = dist - EVENT_HORIZON_RADIUS;
        float t = clamp(pow(max(distFromBH, 0.0), 1.5), 0.0, 1.0);
        vec3 diskColor = mix(INNER_DISK_COLOR, MID_DISK_COLOR, smoothstep(0.0, 0.4, t));
        diskColor = mix(diskColor, OUTER_DISK_COLOR, smoothstep(0.3, 1.0, t));
        diskColor *= turbulence * doppler;
        diskColor *= DISK_INTENSITY / (0.001 + distFromBH * DISK_FALLOFF);

        // Disk shape: flattened torus SDF
        vec3 flatPos = rayPos * vec3(1.0, DISK_FLATTEN, 1.0);
        float diskMask = smoothstep(0.0, 1.0, -sdfTorus(flatPos, vec2(DISK_TORUS_MAJOR, DISK_TORUS_MINOR)));

        finalColor += max(vec3(0.0), diskColor * diskMask * notCaptured);

        // Subtle ambient glow near event horizon
        finalColor += GLOW_COLOR * (1.0 / distSq) * GLOW_INTENSITY * notCaptured;

        // Photon ring (Einstein ring) — bright blue-white band at photon sphere
        float ringDist = abs(dist - PHOTON_SPHERE_RADIUS);
        float ring = exp(-ringDist * ringDist / (PHOTON_RING_WIDTH * PHOTON_RING_WIDTH));
        finalColor += PHOTON_RING_COLOR * ring * PHOTON_RING_INTENSITY * notCaptured;
    }

    // ── Starfield background (for escaped rays) ────────────
    if (notCaptured > CAPTURE_THRESHOLD) {
        vec3 stars = starfield(normalize(rayVel));
        finalColor += stars * notCaptured;
    }

    // ── Post-processing ────────────────────────────────────
    // Gamma correction
    finalColor = pow(max(finalColor, vec3(0.0)), GAMMA);

    fragColor = vec4(finalColor, 1.0);
}
`},channels:{}},{slug:"caustics-pool",title:"Caustic Study #02: Pool",description:"Ray-marched 3D swimming pool with tiled interior surfaces, a transparent water plane, caustic light patterns, and a periodically dropping ball with ripple physics. Mouse drag orbits with inertia.",date:"2026-02-15",tags:["caustics","raymarching","3d","physics"],links:{},screenshotUrl:cf,passes:{image:`/**
 * Caustics Pool
 *
 * @author guinetik
 * @date 2026-02-15
 *
 * Ray-marched 3D swimming pool — an open-top box with tiled interior
 * surfaces, a transparent water plane, and caustic light patterns
 * on all submerged surfaces.
 *
 * A ball drops into the pool periodically, creating expanding ripple
 * waves on the water surface. Physics are analytical (no simulation
 * buffers): free-fall under gravity, then damped harmonic bob once
 * submerged. Ripples propagate as circular waves from the splash
 * point, decaying over time. Ball despawns after BALL_LIFETIME.
 *
 * Caustic pattern: joltz0r / David Hoskins iterative domain warp.
 * Pool geometry: analytical ray-box interior intersection.
 * Camera angle is stored in buffer-a pixel (0,0) with angular
 * velocity and friction — mouse drag spins with inertia.
 */

// -- Pool geometry --
#define POOL_HALF_SIZE  2.5
#define POOL_DEPTH      2.0
#define POOL_FLOOR_Y    -2.0
#define WATER_Y         -0.3

// -- Camera --
#define CAM_DIST        7.0
#define CAM_HEIGHT      3.5
#define CAM_TARGET      vec3(0.0, -0.8, 0.0)
#define CAM_FOV         2.0

// -- Tiles --
#define TILE_SCALE      3.0
#define TILE_GROUT      0.04
#define TILE_COL        vec3(0.65, 0.82, 0.88)
#define GROUT_COL       vec3(0.35, 0.50, 0.55)
#define WALL_TILE_COL   vec3(0.60, 0.78, 0.85)

// -- Water --
#define WATER_COL       vec3(0.05, 0.30, 0.45)
#define WATER_OPACITY   0.55
#define FRESNEL_POWER   3.0
#define FRESNEL_MIN     0.1
#define FRESNEL_MAX     0.9

// -- Ball --
#define BALL_RADIUS     0.25
#define BALL_COL        vec3(0.9, 0.2, 0.15)
#define BALL_SPEC_COL   vec3(1.0, 0.6, 0.5)
#define BALL_CYCLE       4.0
#define BALL_LIFETIME    3.5
#define BALL_DROP_HEIGHT 4.0
#define BALL_GRAVITY     9.81
#define BALL_BOB_FREQ    3.0
#define BALL_BOB_DECAY   1.8
#define BALL_BOB_AMP     0.3
#define BALL_BUOYANCY_Y  (WATER_Y - BALL_RADIUS * 0.4)
#define BALL_FADE_START  2.5
#define BALL_SPECULAR    32.0

// -- Ripples --
#define RIPPLE_SPEED     2.5
#define RIPPLE_FREQ      8.0
#define RIPPLE_AMP       0.06
#define RIPPLE_DECAY     0.8
#define RIPPLE_SPREAD    0.15

// -- Caustic (joltz0r / David Hoskins) --
#define TAU             6.28318530718
#define CAUSTIC_ITERS   5
#define CAUSTIC_INTEN   0.005
#define CAUSTIC_POWER   1.4
#define CAUSTIC_BASE    1.17
#define CAUSTIC_BRIGHT  8.0
#define CAUSTIC_SPEED   0.5
#define CAUSTIC_OFFSET  23.0
#define CAUSTIC_SCALE   0.8
#define CAUSTIC_TINT    vec3(0.0, 0.35, 0.5)

// -- Lighting --
#define LIGHT_DIR       normalize(vec3(0.5, 1.0, 0.3))
#define AMBIENT         0.25
#define DIFFUSE_STR     0.65
#define SKY_COL         vec3(0.02, 0.02, 0.04)
#define SHADOW_DARK     0.3

// -- Precision --
#define SURF_EPSILON    0.001

// -------------------------------------------------------
// Hash — pseudo-random position per cycle
// -------------------------------------------------------
float hash11(float p)
{
    p = fract(p * 443.8975);
    p *= p + 33.33;
    p *= p + p;
    return fract(p);
}

// -------------------------------------------------------
// Ball state: compute position + opacity from global time
// -------------------------------------------------------
struct BallState {
    vec3 pos;
    float alpha;     // 0 = invisible, 1 = fully visible
    float splashAge; // time since water impact, <0 if still falling
    vec2 dropXZ;     // xz position where ball drops
};

BallState getBall(float t)
{
    BallState b;

    float cycle = floor(t / BALL_CYCLE);
    float local = mod(t, BALL_CYCLE);

    // Pseudo-random drop position within pool (leave margin for ball radius)
    float margin = POOL_HALF_SIZE - BALL_RADIUS - 0.3;
    b.dropXZ = vec2(
        mix(-margin, margin, hash11(cycle * 7.13)),
        mix(-margin, margin, hash11(cycle * 13.37))
    );

    // Time for ball to fall from DROP_HEIGHT to WATER_Y
    // y = DROP_HEIGHT - 0.5 * g * t^2, solve for y = WATER_Y
    float fallDist = BALL_DROP_HEIGHT - WATER_Y;
    float impactTime = sqrt(2.0 * fallDist / BALL_GRAVITY);

    b.splashAge = local - impactTime;

    if (local > BALL_LIFETIME)
    {
        // Despawned
        b.pos = vec3(0.0, 10.0, 0.0); // off screen
        b.alpha = 0.0;
    }
    else if (local < impactTime)
    {
        // Free fall phase
        float y = BALL_DROP_HEIGHT - 0.5 * BALL_GRAVITY * local * local;
        b.pos = vec3(b.dropXZ.x, y, b.dropXZ.y);
        b.alpha = 1.0;
    }
    else
    {
        // Damped bob in water
        float age = b.splashAge;
        float bob = BALL_BOB_AMP * exp(-BALL_BOB_DECAY * age) * cos(BALL_BOB_FREQ * TAU * age);
        float y = BALL_BUOYANCY_Y + bob;
        b.pos = vec3(b.dropXZ.x, y, b.dropXZ.y);

        // Fade out near end of lifetime
        b.alpha = 1.0 - smoothstep(BALL_FADE_START, BALL_LIFETIME, local);
    }

    return b;
}

// -------------------------------------------------------
// Ripple displacement on the water surface
// Circular waves expanding from splash point
// -------------------------------------------------------
float rippleHeight(vec2 xz, BallState ball)
{
    if (ball.splashAge < 0.0 || ball.alpha <= 0.0) return 0.0;

    float age = ball.splashAge;
    float dist = length(xz - ball.dropXZ);

    // Expanding ring: wave front position
    float waveFront = age * RIPPLE_SPEED;

    // Distance from wave front
    float d = dist - waveFront;

    // Envelope: gaussian around wave front, decays over time
    float envelope = exp(-d * d / (RIPPLE_SPREAD + age * 0.5))
                   * exp(-age * RIPPLE_DECAY);

    return sin(dist * RIPPLE_FREQ - age * RIPPLE_SPEED * RIPPLE_FREQ) * envelope * RIPPLE_AMP;
}

// -------------------------------------------------------
// Ripple normal via finite differences
// -------------------------------------------------------
vec3 rippleNormal(vec2 xz, BallState ball)
{
    float e = 0.02;
    float hc = rippleHeight(xz, ball);
    float hx = rippleHeight(xz + vec2(e, 0.0), ball);
    float hz = rippleHeight(xz + vec2(0.0, e), ball);
    return normalize(vec3(hc - hx, e, hc - hz));
}

// -------------------------------------------------------
// Ray-sphere intersection, returns t or -1
// -------------------------------------------------------
float sphereIntersect(vec3 ro, vec3 rd, vec3 center, float radius)
{
    vec3 oc = ro - center;
    float b = dot(oc, rd);
    float c = dot(oc, oc) - radius * radius;
    float h = b * b - c;
    if (h < 0.0) return -1.0;
    return -b - sqrt(h);
}

// -------------------------------------------------------
// Caustic pattern (joltz0r / David Hoskins)
// -------------------------------------------------------
float causticPattern(vec2 uv, float t)
{
    float time = t * CAUSTIC_SPEED + CAUSTIC_OFFSET;
    vec2 p = mod(uv * CAUSTIC_SCALE * TAU, TAU) - 250.0;
    vec2 i = p;
    float c = 1.0;

    for (int n = 0; n < CAUSTIC_ITERS; n++)
    {
        float tt = time * (1.0 - (3.5 / float(n + 1)));
        i = p + vec2(
            cos(tt - i.x) + sin(tt + i.y),
            sin(tt - i.y) + cos(tt + i.x)
        );
        c += 1.0 / length(vec2(
            p.x / (sin(i.x + tt) / CAUSTIC_INTEN),
            p.y / (cos(i.y + tt) / CAUSTIC_INTEN)
        ));
    }

    c /= float(CAUSTIC_ITERS);
    c = CAUSTIC_BASE - pow(max(c, 0.0), CAUSTIC_POWER);
    return pow(abs(c), CAUSTIC_BRIGHT);
}

// -------------------------------------------------------
// Tile pattern
// -------------------------------------------------------
float tileGrid(vec2 uv)
{
    vec2 grid = fract(uv * TILE_SCALE);
    vec2 edge = smoothstep(0.0, TILE_GROUT, grid) *
                smoothstep(0.0, TILE_GROUT, 1.0 - grid);
    return edge.x * edge.y;
}

// -------------------------------------------------------
// Ray-box interior intersection
// -------------------------------------------------------
vec2 boxInterior(vec3 ro, vec3 rd, out vec3 normal, out vec3 hitPos)
{
    vec3 bmin = vec3(-POOL_HALF_SIZE, POOL_FLOOR_Y, -POOL_HALF_SIZE);
    vec3 bmax = vec3( POOL_HALF_SIZE, 0.0,           POOL_HALF_SIZE);

    vec3 invRd = 1.0 / rd;
    vec3 t1 = (bmin - ro) * invRd;
    vec3 t2 = (bmax - ro) * invRd;

    vec3 tmin = min(t1, t2);
    vec3 tmax = max(t1, t2);

    float tNear = max(max(tmin.x, tmin.y), tmin.z);
    float tFar  = min(min(tmax.x, tmax.y), tmax.z);

    if (tNear > tFar || tFar < 0.0) return vec2(-1.0);

    hitPos = ro + rd * tFar;
    normal = vec3(0.0);

    if (abs(hitPos.x - bmin.x) < SURF_EPSILON)      normal = vec3( 1.0, 0.0, 0.0);
    else if (abs(hitPos.x - bmax.x) < SURF_EPSILON)  normal = vec3(-1.0, 0.0, 0.0);
    else if (abs(hitPos.z - bmin.z) < SURF_EPSILON)   normal = vec3( 0.0, 0.0, 1.0);
    else if (abs(hitPos.z - bmax.z) < SURF_EPSILON)   normal = vec3( 0.0, 0.0,-1.0);
    else if (abs(hitPos.y - bmin.y) < SURF_EPSILON)   normal = vec3( 0.0, 1.0, 0.0);
    else                                               normal = vec3( 0.0,-1.0, 0.0);

    return vec2(tNear, tFar);
}

// -------------------------------------------------------
// Water plane intersection
// -------------------------------------------------------
float waterPlane(vec3 ro, vec3 rd)
{
    if (abs(rd.y) < 0.0001) return -1.0;
    float t = (WATER_Y - ro.y) / rd.y;
    return t > 0.0 ? t : -1.0;
}

// -------------------------------------------------------
// Tile UV from hit position + normal
// -------------------------------------------------------
vec2 tileUV(vec3 p, vec3 n)
{
    if (abs(n.y) > 0.5) return p.xz;
    if (abs(n.x) > 0.5) return p.zy;
    return p.xy;
}

// -------------------------------------------------------
// Shade a pool surface point
// -------------------------------------------------------
vec3 shadeSurface(vec3 p, vec3 n, float t)
{
    vec2 uv = tileUV(p, n);

    float tile = tileGrid(uv);
    vec3 baseCol = abs(n.y) > 0.5 ? TILE_COL : WALL_TILE_COL;
    vec3 col = mix(GROUT_COL, baseCol, tile);

    float diff = max(dot(n, LIGHT_DIR), 0.0);
    col *= AMBIENT + DIFFUSE_STR * diff;

    // Caustics on submerged surfaces
    if (p.y < WATER_Y + 0.05)
    {
        float depth = WATER_Y - p.y;
        float caustic = causticPattern(uv, t);
        float depthFade = exp(-depth * 0.3);
        col += (vec3(caustic) + CAUSTIC_TINT) * depthFade * 0.6;
    }

    float depthDarken = 1.0 - smoothstep(0.0, POOL_DEPTH, WATER_Y - p.y) * SHADOW_DARK;
    col *= depthDarken;

    return col;
}

// -------------------------------------------------------
// Shade the ball
// -------------------------------------------------------
vec3 shadeBall(vec3 p, vec3 center, vec3 rd, float t)
{
    vec3 n = normalize(p - center);
    float diff = max(dot(n, LIGHT_DIR), 0.0);

    // Specular highlight
    vec3 h = normalize(LIGHT_DIR - rd);
    float spec = pow(max(dot(n, h), 0.0), BALL_SPECULAR);

    vec3 col = BALL_COL * (AMBIENT + DIFFUSE_STR * diff);
    col += BALL_SPEC_COL * spec * 0.5;

    // Underwater darkening
    if (p.y < WATER_Y)
    {
        float depth = WATER_Y - p.y;
        col *= exp(-depth * 0.4);
        col = mix(col, WATER_COL, 0.2);
    }

    return col;
}

// -------------------------------------------------------
// Fresnel (Schlick)
// -------------------------------------------------------
float fresnel(vec3 rd, vec3 n)
{
    float cosTheta = abs(dot(rd, n));
    float f = pow(max(1.0 - cosTheta, 0.0), FRESNEL_POWER);
    return mix(FRESNEL_MIN, FRESNEL_MAX, f);
}

// -------------------------------------------------------
// Camera
// -------------------------------------------------------
mat3 lookAt(vec3 ro, vec3 ta)
{
    vec3 fwd = normalize(ta - ro);
    vec3 right = normalize(cross(fwd, vec3(0.0, 1.0, 0.0)));
    vec3 up = cross(right, fwd);
    return mat3(right, up, fwd);
}

// -------------------------------------------------------
// Main
// -------------------------------------------------------
void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / min(iResolution.x, iResolution.y);
    float t = iTime;

    // Camera angles from buffer-a (pixel 0,0) — has inertia/friction
    vec4 camState = texelFetch(iChannel0, ivec2(0, 0), 0);
    float yaw   = camState.x;
    float pitch = camState.y;

    // Spherical camera: pitch tilts elevation around the base height
    float baseElev = atan(CAM_HEIGHT, CAM_DIST);
    float elev     = baseElev + pitch;
    float camR     = length(vec2(CAM_DIST, CAM_HEIGHT));

    vec3 ro = vec3(
        cos(elev) * cos(yaw) * camR,
        sin(elev) * camR,
        cos(elev) * sin(yaw) * camR
    );
    mat3 cam = lookAt(ro, CAM_TARGET);
    vec3 rd = cam * normalize(vec3(uv, CAM_FOV));

    // Get ball state
    BallState ball = getBall(t);

    vec3 col = SKY_COL;

    // --- Ball intersection (above water) ---
    float ballT = -1.0;
    if (ball.alpha > 0.0)
        ballT = sphereIntersect(ro, rd, ball.pos, BALL_RADIUS);

    // --- Pool box ---
    vec3 boxNorm, boxHit;
    vec2 boxT = boxInterior(ro, rd, boxNorm, boxHit);

    if (boxT.y > 0.0)
    {
        vec3 poolCol = shadeSurface(boxHit, boxNorm, t);

        // --- Water plane ---
        float waterT = waterPlane(ro, rd);
        bool hitWater = waterT > 0.0 && waterT < boxT.y;

        if (hitWater)
        {
            vec3 waterHit = ro + rd * waterT;

            if (abs(waterHit.x) < POOL_HALF_SIZE && abs(waterHit.z) < POOL_HALF_SIZE)
            {
                // Ripple-perturbed water normal
                vec3 wn = rippleNormal(waterHit.xz, ball);

                float refl = fresnel(rd, wn);
                vec3 reflDir = reflect(rd, wn);
                vec3 reflCol = SKY_COL + vec3(0.02, 0.05, 0.08) * max(reflDir.y, 0.0);

                vec3 waterSurf = mix(poolCol, WATER_COL, WATER_OPACITY);
                col = mix(waterSurf, reflCol, refl);

                // Ball visible through water
                if (ballT > waterT && ball.alpha > 0.0)
                {
                    vec3 ballHitPos = ro + rd * ballT;
                    vec3 ballCol = shadeBall(ballHitPos, ball.pos, rd, t);
                    ballCol = mix(ballCol, WATER_COL, 0.3);
                    col = mix(col, ballCol, ball.alpha);
                }
            }
            else
            {
                col = poolCol;
            }
        }
        else
        {
            col = poolCol;
        }

        // Above-water wall/rim
        if (boxHit.y > WATER_Y && !(hitWater && waterT < boxT.y))
        {
            vec2 rimUV = tileUV(boxHit, boxNorm);
            float tile = tileGrid(rimUV);
            vec3 rimCol = mix(GROUT_COL, TILE_COL * 1.1, tile);
            float diff = max(dot(boxNorm, LIGHT_DIR), 0.0);
            rimCol *= AMBIENT + DIFFUSE_STR * diff * 1.2;
            col = rimCol;
        }

        // Ball above water (in front of everything)
        if (ballT > 0.0 && ballT < waterT && ball.alpha > 0.0)
        {
            vec3 ballHitPos = ro + rd * ballT;
            vec3 ballCol = shadeBall(ballHitPos, ball.pos, rd, t);
            col = mix(col, ballCol, ball.alpha);
        }
        // Ball above water when no water hit
        else if (ballT > 0.0 && !hitWater && ballT < boxT.y && ball.alpha > 0.0)
        {
            vec3 ballHitPos = ro + rd * ballT;
            vec3 ballCol = shadeBall(ballHitPos, ball.pos, rd, t);
            col = mix(col, ballCol, ball.alpha);
        }
    }
    else if (ballT > 0.0 && ball.alpha > 0.0)
    {
        // Ball visible against sky (during drop)
        vec3 ballHitPos = ro + rd * ballT;
        col = mix(col, shadeBall(ballHitPos, ball.pos, rd, t), ball.alpha);
    }

    // Gamma correction
    col = pow(max(col, 0.0), vec3(0.45));

    fragColor = vec4(col, 1.0);
}
`,bufferA:`/**
 * Caustics Pool — Buffer A: Camera state
 *
 * @author guinetik
 * @date 2026-02-15
 *
 * Pixel (0,0) stores camera angles and velocities:
 *   .x = yaw angle (radians, wraps TAU)
 *   .y = pitch angle (radians, clamped)
 *   .z = yaw velocity (radians/frame)
 *   .w = pitch velocity (radians/frame)
 *
 * Pixel (1,0) stores previous mouse position:
 *   .x = previous mouse X normalized
 *   .y = previous mouse Y normalized
 *
 * Drag detection: if mouse position changed between frames, we're
 * dragging. This avoids relying on iMouse.z which stays positive
 * after the first click in our renderer.
 *
 * On release, velocity decays slowly (high friction coefficient =
 * long coast). When nearly stopped, yaw blends back to idle orbit;
 * pitch decays to zero.
 */

// -- Camera physics (per-frame units) --
#define FRICTION          0.993
#define DRAG_SENSITIVITY  2.0
#define PITCH_SENSITIVITY 0.3
#define VELOCITY_SMOOTH   0.35
#define IDLE_ORBIT_SPEED  0.003
#define IDLE_THRESHOLD    0.0003
#define IDLE_BLEND        0.015
#define DRAG_DEAD_ZONE    0.0001

// -- Pitch limits (radians) --
#define PITCH_MIN        -0.35
#define PITCH_MAX         0.18

#define TAU 6.28318530718

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    // Only pixels (0,0) and (1,0) store state
    if (fragCoord.x > 1.5 || fragCoord.y > 1.5)
    {
        fragColor = vec4(0.0);
        return;
    }

    // Read previous state from both pixels
    vec4 state = texelFetch(iChannel0, ivec2(0, 0), 0);
    vec4 mouse = texelFetch(iChannel0, ivec2(1, 0), 0);

    float yaw      = state.x;
    float pitch    = state.y;
    float yawVel   = state.z;
    float pitchVel = state.w;
    float prevMX   = mouse.x;
    float prevMY   = mouse.y;

    // Initialize on first frame
    if (iFrame == 0)
    {
        yaw      = 0.0;
        pitch    = 0.0;
        yawVel   = IDLE_ORBIT_SPEED;
        pitchVel = 0.0;
        prevMX   = iMouse.x / iResolution.x;
        prevMY   = iMouse.y / iResolution.y;
    }

    float mouseX = iMouse.x / iResolution.x;
    float mouseY = iMouse.y / iResolution.y;

    // Detect drag: mouse position actually changed this frame
    float dx = mouseX - prevMX;
    float dy = mouseY - prevMY;
    bool dragging = (dx * dx + dy * dy) > DRAG_DEAD_ZONE * DRAG_DEAD_ZONE;

    if (dragging)
    {
        // Blend drag delta into velocity for smooth momentum buildup
        float dragYawVel   = dx * DRAG_SENSITIVITY;
        float dragPitchVel = -dy * PITCH_SENSITIVITY; // inverted Y: drag up = look higher

        yawVel   = mix(yawVel,   dragYawVel,   VELOCITY_SMOOTH);
        pitchVel = mix(pitchVel, dragPitchVel, VELOCITY_SMOOTH);
    }
    else
    {
        // Not dragging: friction decay
        yawVel   *= FRICTION;
        pitchVel *= FRICTION;

        // Yaw blends toward idle orbit when nearly stopped
        if (abs(yawVel) < IDLE_THRESHOLD)
        {
            yawVel = mix(yawVel, IDLE_ORBIT_SPEED, IDLE_BLEND);
        }

        // Pitch decays to zero (no idle pitch movement)
        if (abs(pitchVel) < IDLE_THRESHOLD)
        {
            pitchVel = mix(pitchVel, 0.0, IDLE_BLEND);
        }
    }

    // Integrate angles
    yaw += yawVel;
    yaw = mod(yaw, TAU);

    pitch += pitchVel;
    pitch = clamp(pitch, PITCH_MIN, PITCH_MAX);

    // Output: pixel (0,0) = angles + velocities, pixel (1,0) = mouse
    if (fragCoord.x < 0.5)
    {
        fragColor = vec4(yaw, pitch, yawVel, pitchVel);
    }
    else
    {
        fragColor = vec4(mouseX, mouseY, 0.0, 0.0);
    }
}
`},channels:{image:{iChannel0:"buffer-a"},bufferA:{iChannel0:"buffer-a"}}},{slug:"caustics-study",title:"Caustic Study #01: Simple",description:"Water caustic pattern via iterative domain warping. Each iteration displaces UV coordinates with sin/cos feedback, accumulating inverse distance to create bright convergence lines mimicking refracted light on a pool floor.",date:"2026-02-15",tags:["caustics","procedural","physics"],links:{},screenshotUrl:ff,passes:{image:`/**
 * Caustic Study #01: Simple
 * @author guinetik
 * @date 2026-02-15
 *
 * Animated caustic light patterns refracting an input texture.
 * The water surface displaces UV sampling (chromatic aberration
 * per-channel), and caustic intensity brightens the displaced
 * image -- so light and texture interact naturally.
 *
 * TECHNIQUE: Iterative domain warping for caustics
 * Each iteration displaces UV coordinates with sin/cos feedback,
 * accumulating inverse distance to create bright convergence lines
 * mimicking refracted light on a pool floor. Two layers at different
 * scales are blended for depth and complexity.
 *
 * Caustic pattern: joltz0r / David Hoskins iterative domain warp.
 * Based on the water turbulence effect by joltz0r,
 * made tileable by David Hoskins.
 */

// -- Math --
#define TAU             6.28318530718

// -- Animation --
#define TIME_SCALE      0.5   // Global time multiplier — lower = slower ripple animation.
                              // 0.2 = very calm pool. 1.0+ = turbulent water.
#define TIME_OFFSET     23.0  // Time offset to avoid boring initial state at t=0.

// -- Caustic pattern --
#define WARP_ITERATIONS 5     // Domain warp iterations — more = sharper, more defined caustic lines.
                              // 3 = soft blobs. 5 = crisp caustics. 8+ = very sharp but expensive.
#define INTENSITY       0.005 // Inverse-distance sensitivity — smaller = tighter, brighter convergence lines.
#define CAUSTIC_POWER   1.4   // Power curve applied to raw caustic value — higher = more contrast.
#define CAUSTIC_BASE    1.17  // Base subtracted before power — shifts the brightness threshold.
                              // Values near 1.0 produce more visible caustic patterns.
#define BRIGHT_POWER    8.0   // Final brightness exponent — higher = caustic lines become thinner and brighter.
                              // 4 = broad glow. 8 = defined lines. 12+ = very thin, intense lines.

// -- Dual caustic layers --
#define CAUSTIC_SCALE_A 2.5   // UV scale for the primary caustic layer — larger = finer pattern.
#define CAUSTIC_SCALE_B 1.5   // UV scale for the secondary layer — offset in time for parallax depth.
#define CAUSTIC_MIX_B   0.4   // Blend weight of the second layer — 0 = single layer only, 1 = equal.

// -- Water distortion (uses same time base as caustics) --
#define DISTORT_STR     0.008 // UV displacement amplitude — how much the water surface warps the image.
                              // 0.005 = subtle shimmer. 0.02 = strong wavy distortion.
#define DISTORT_FREQ    3.0   // Frequency of the sinusoidal displacement field.
#define CHROMA_SPREAD   0.001 // Chromatic aberration offset between R/G/B channels.
                              // 0 = no aberration. 0.005+ = very visible color fringing.

// -- Water / depth --
#define POOL_BLUE       vec3(0.3, 0.7, 1.0)   // Tint color multiplied onto the texture — simulates water absorption.
#define CAUSTIC_COL     vec3(0.95, 0.98, 1.0)  // Color of the additive caustic highlights — near-white with slight blue.
#define CAUSTIC_ADD     0.8   // Additive intensity of caustic highlights — 0 = invisible, 1 = full brightness.
#define VIGNETTE_STR    0.35  // Radial darkening strength — simulates depth falloff at pool edges.
                              // 0 = no vignette. 0.5+ = strong edge darkening.

// -------------------------------------------------------
// Caustic pattern (joltz0r / David Hoskins)
// -------------------------------------------------------

// TECHNIQUE: Iterative domain warp caustics
// Starting from a TAU-scaled, tiled UV, each iteration displaces the
// coordinate using sin/cos of the running position plus time. The
// accumulator \`c\` sums inverse distances: where displaced coordinates
// nearly converge, c spikes, creating bright caustic lines.

float caustic(vec2 uv, float scale, float t)
{
    float time = t * TIME_SCALE + TIME_OFFSET;
    vec2 p = mod(uv * scale * TAU, TAU) - 250.0;
    vec2 i = p;
    float c = 1.0;

    for (int n = 0; n < WARP_ITERATIONS; n++)
    {
        float tt = time * (1.0 - (3.5 / float(n + 1)));
        i = p + vec2(
            cos(tt - i.x) + sin(tt + i.y),
            sin(tt - i.y) + cos(tt + i.x)
        );
        c += 1.0 / length(vec2(
            p.x / (sin(i.x + tt) / INTENSITY),
            p.y / (cos(i.y + tt) / INTENSITY)
        ));
    }

    c /= float(WARP_ITERATIONS);
    c = CAUSTIC_BASE - pow(max(c, 0.0), CAUSTIC_POWER);
    return pow(abs(c), BRIGHT_POWER);
}

// -------------------------------------------------------
// Water surface displacement field
// Returns a 2D offset for UV distortion.
// Uses overlapping sin/cos waves at slightly different frequencies
// to approximate a rippling water surface.
// -------------------------------------------------------
vec2 waterDisplace(vec2 uv, float t)
{
    float tx = t * TIME_SCALE + TIME_OFFSET;
    return vec2(
        sin(uv.y * DISTORT_FREQ * TAU + tx * 1.1) +
        sin(uv.x * DISTORT_FREQ * 0.7 * TAU + tx * 0.9),
        cos(uv.x * DISTORT_FREQ * TAU + tx * 0.8) +
        cos(uv.y * DISTORT_FREQ * 0.6 * TAU + tx * 1.3)
    ) * DISTORT_STR;
}

// -------------------------------------------------------
// Vignette — radial darkening from center
// -------------------------------------------------------
float vignette(vec2 uv)
{
    vec2 q = uv * 2.0 - 1.0;
    return 1.0 - dot(q, q) * VIGNETTE_STR;
}

// -------------------------------------------------------
// Main
// -------------------------------------------------------
void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = fragCoord.xy / iResolution.xy;
    float t = iTime;

    // Water surface UV displacement
    vec2 disp = waterDisplace(uv, t);

    // Chromatic aberration: sample R/G/B at slightly offset UVs
    float r = texture(iChannel0, uv + disp + vec2( CHROMA_SPREAD, 0.0)).r;
    float g = texture(iChannel0, uv + disp).g;
    float b = texture(iChannel0, uv + disp + vec2(-CHROMA_SPREAD, CHROMA_SPREAD)).b;
    vec3 tex = vec3(r, g, b);

    // Tint texture with pool blue (multiply preserves detail, shifts hue)
    tex *= POOL_BLUE;

    // Two caustic layers at different scales
    float c1 = caustic(uv, CAUSTIC_SCALE_A, t);
    float c2 = caustic(uv, CAUSTIC_SCALE_B, t + 7.0);
    float c  = c1 + c2 * CAUSTIC_MIX_B;

    // Caustics: bright additive light on the dark floor
    vec3 col = tex + CAUSTIC_COL * c * CAUSTIC_ADD;

    // Depth vignette
    col *= clamp(vignette(uv), 0.0, 1.0);

    // Gamma correction
    col = pow(max(col, 0.0), vec3(0.45));

    fragColor = vec4(col, 1.0);
}
`},channels:{image:{iChannel0:"textures/pool.webp"}}},{slug:"dadras",title:"Attractor Study #01: Dadras",description:"Dadras strange attractor (2010) by Sara Dadras & Hamid Reza Momeni. A three-scroll chaotic system rendered with distance-field line tracing and feedback accumulation. Velocity-mapped HSL coloring shifts over time with random blink pulses.",date:"2026-02-10",tags:["attractors","simulation","3d"],links:{},screenshotUrl:df,passes:{image:`/**\r
 * Attractor Study #01: Dadras — Image Pass\r
 * @author guinetik\r
 * @date 2026-02-10\r
 *\r
 * Composite pass for the Dadras attractor. Reads the accumulated trail from\r
 * Buffer A, applies filmic tone-mapping and a soft vignette for final display.\r
 */\r
\r
// TECHNIQUE: Filmic tone-mapping via exponential exposure\r
// The formula col = 1 - exp(-col * EXPOSURE) compresses HDR accumulation\r
// from the buffer into displayable [0,1] range while preserving bright detail.\r
#define EXPOSURE 2.5        // Tone-map strength — higher values brighten midtones\r
                            // and compress highlights. Below 1.0: dim/flat. Above 4.0: washed out.\r
#define VIGNETTE_STRENGTH 0.3  // Darkening at screen edges — 0.0 = none, 0.5 = heavy.\r
\r
void mainImage(out vec4 fragColor, in vec2 fragCoord) {\r
    vec2 uv = fragCoord.xy / iResolution.xy;\r
    vec3 col = texture(iChannel0, uv).rgb;\r
    col = 1.0 - exp(-col * EXPOSURE);\r
    float vig = 1.0 - VIGNETTE_STRENGTH * length(uv - 0.5);\r
    col *= vig;\r
    fragColor = vec4(col, 1.0);\r
}\r
`,bufferA:`/**
 * Attractor Study #01: Dadras — Buffer A (Simulation + Trail Rendering)
 * @author guinetik
 * @date 2026-02-10
 *
 * Simulates the Dadras strange attractor (2010, Sara Dadras & Hamid Reza Momeni),
 * a three-scroll chaotic system. A single particle is integrated via forward Euler,
 * projected to 2D, and rendered as distance-field line segments with feedback
 * accumulation for persistent trails. Velocity-mapped HSL coloring with random
 * blink pulses provides visual variety.
 *
 * Dadras attractor equations:
 *   dx/dt = y - a*x + b*y*z
 *   dy/dt = c*y - x*z + z
 *   dz/dt = d*x*y - e*z
 * Parameters: a=3, b=2.7, c=1.7, d=2, e=9
 *
 * Reference: Dadras, S. & Momeni, H.R. (2010). "A novel three-dimensional
 * autonomous chaotic system generating two, three and four-scroll attractors."
 */

// === STATE LAYOUT (buffer-a, self-feedback via iChannel0) ===
// Pixel (0, 0):          Particle position (xyz). Initialized to \`start\` on frame 0.
// Pixel (CAM_PIXEL, 0):  Camera state — xy = rotation offsets, zw = last mouse position.
// All other pixels:      Accumulated trail color (RGB). Faded each frame by FADE.

// ── Integration & rendering ──
#define STEPS 500.0        // Euler integration steps per frame — more = longer trail segment
                           // per frame. Below 100: short/sparse trail. Above 800: GPU-heavy.
#define BASE_VIEW_SCALE 0.05  // Base 3D-to-screen scale — smaller zooms out, larger zooms in.
                              // Automatically scaled down on portrait/mobile screens.
#define SPEED 0.85         // Time-step multiplier for integration — higher = faster traversal.
                           // Below 0.3: sluggish. Above 1.5: may overshoot and diverge.
#define INTENSITY 0.35     // Base brightness of each line segment — higher = brighter trails.
                           // Below 0.1: barely visible. Above 0.6: over-saturated accumulation.
#define FADE 0.990         // Trail persistence per frame — closer to 1.0 = longer trails.
                           // Below 0.98: trails vanish quickly. Above 0.999: ghosting/smearing.
#define FOCUS 1.5          // Distance-field softness in pixels — smaller = sharper/thinner lines.
                           // Below 0.5: aliased. Above 3.0: wide, blurry glow.

// ── 3D view rotation defaults (radians) ──
// Identity shows xy plane — matches the thumbnail
#define DEFAULT_ROT_X 0.0          // Initial pitch rotation — 0 = front-on view of xy plane.
#define DEFAULT_ROT_Y 0.0          // Initial yaw rotation — 0 = no horizontal rotation.
#define MOUSE_SENSITIVITY 3.0      // Drag-to-rotate speed — higher = faster orbit on drag.

// Camera state stored at pixel (1, 0)
#define CAM_PIXEL 1

// ── Color settings ──
#define MIN_HUE 60.0       // Hue for fastest velocity (yellow-green region).
#define MAX_HUE 240.0      // Hue for slowest velocity (blue region).
#define MAX_SPEED 30.0     // Velocity clamp for hue mapping — speeds above this all map to MIN_HUE.
#define HUE_SHIFT_SPEED 15.0  // Degrees/sec of continuous hue rotation over time.
#define SATURATION 0.85    // Base color saturation — 0.0 = grayscale, 1.0 = fully vivid.
#define LIGHTNESS 0.55     // Base HSL lightness — 0.5 = pure color, higher = pastel.

// ── Blink settings — random brightness pulses for visual interest ──
#define BLINK_FREQ 8.0         // Pulse evaluation rate (Hz). Higher = more frequent blink checks.
#define BLINK_INTENSITY 1.8    // Brightness multiplier during blink peak — 1.0 = no change.
#define BLINK_SAT_BOOST 1.3    // Saturation multiplier during blink — pushes color more vivid.
#define BLINK_LIT_BOOST 1.4    // Lightness multiplier during blink — makes highlight whiter.

// ── Dadras attractor parameters ──
// These define the chaotic regime producing three-scroll behavior.
float pa = 3.0;    // Dadras 'a' — linear damping on x. Higher = stronger contraction.
float pb = 2.7;    // Dadras 'b' — coupling strength of y*z into dx/dt.
float pc = 1.7;    // Dadras 'c' — linear gain on y. Drives the instability.
float pd = 2.0;    // Dadras 'd' — coupling of x*y into dz/dt.
float pe = 9.0;    // Dadras 'e' — linear damping on z. Higher = faster z-decay.

vec3 start = vec3(1.0, 1.0, 1.0);  // Initial particle position on frame 0.

// Forward Euler integration of the Dadras system.
// dx/dt = y - a*x + b*y*z
// dy/dt = c*y - x*z + z
// dz/dt = d*x*y - e*z
vec3 integrate(vec3 cur, float dt) {
    return cur + vec3(
        cur.y - pa * cur.x + pb * cur.y * cur.z,
        pc * cur.y - cur.x * cur.z + cur.z,
        pd * cur.x * cur.y - pe * cur.z
    ) * dt;
}

// Rotation matrix around the X axis by angle \`a\` (radians).
mat3 rotX(float a) {
    float c = cos(a), s = sin(a);
    return mat3(1,0,0, 0,c,-s, 0,s,c);
}

// Rotation matrix around the Y axis by angle \`a\` (radians).
mat3 rotY(float a) {
    float c = cos(a), s = sin(a);
    return mat3(c,0,s, 0,1,0, -s,0,c);
}

// Project a 3D attractor point to 2D screen space via camera rotation + scale.
vec2 project(vec3 p, mat3 viewRot, float scale) {
    return (viewRot * p).xy * scale;
}

// TECHNIQUE: Distance-field line segment rendering
// Computes the minimum distance from point \`p\` to the line segment (a, b).
// Used to evaluate per-pixel intensity of each trail segment.
float dfLine(vec2 a, vec2 b, vec2 p) {
    vec2 ab = b - a;
    float t = clamp(dot(p - a, ab) / dot(ab, ab), 0.0, 1.0);
    return distance(a + ab * t, p);
}

// Pseudo-random hash — maps a float seed to [0, 1).
float hash(float n) {
    return fract(sin(n) * 43758.5453);
}

// Convert HSL (hue in degrees, saturation, lightness) to RGB.
vec3 hsl2rgb(float h, float s, float l) {
    h = mod(h, 360.0) / 60.0;
    float c = (1.0 - abs(2.0 * l - 1.0)) * s;
    float x = c * (1.0 - abs(mod(h, 2.0) - 1.0));
    float m = l - c * 0.5;
    vec3 rgb;
    if      (h < 1.0) rgb = vec3(c, x, 0);
    else if (h < 2.0) rgb = vec3(x, c, 0);
    else if (h < 3.0) rgb = vec3(0, c, x);
    else if (h < 4.0) rgb = vec3(0, x, c);
    else if (h < 5.0) rgb = vec3(x, 0, c);
    else              rgb = vec3(c, 0, x);
    return rgb + m;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 res = iResolution.xy / iResolution.y;
    vec2 uv = fragCoord / iResolution.y;
    uv -= res / 2.0;

    // Responsive scale: shrink on portrait screens to prevent horizontal clipping
    float viewScale = BASE_VIEW_SCALE * min(1.0, iResolution.x / iResolution.y);

    int px = int(floor(fragCoord.x));
    int py = int(floor(fragCoord.y));

    // TECHNIQUE: Frame-persistent state via texelFetch
    // Camera rotation offsets and last mouse position are stored in a dedicated
    // pixel (CAM_PIXEL, 0) in the self-feedback buffer and read back each frame.
    vec4 camState = texelFetch(iChannel0, ivec2(CAM_PIXEL, 0), 0);
    float offsetRx = camState.x;
    float offsetRy = camState.y;
    vec2 lastMouse = camState.zw;

    if (iFrame == 0) {
        offsetRx = 0.0;
        offsetRy = 0.0;
        lastMouse = vec2(-1.0);
    }

    bool pressed = iMouse.z > 0.0;
    bool wasTracking = lastMouse.x >= 0.0;

    // Accumulate rotation delta while dragging
    if (pressed && wasTracking) {
        vec2 delta = iMouse.xy - lastMouse;
        offsetRx -= delta.y / iResolution.y * MOUSE_SENSITIVITY;
        offsetRy -= delta.x / iResolution.x * MOUSE_SENSITIVITY;
    }

    float rx = DEFAULT_ROT_X + offsetRx;
    float ry = DEFAULT_ROT_Y + offsetRy;
    mat3 viewRot = rotY(ry) * rotX(rx);

    // Detect active mouse movement for instant trail clear
    bool rotating = pressed && wasTracking && length(iMouse.xy - lastMouse) > 1.0;

    // ── Integrate particle, find closest line segment ──
    // Each frame, the particle is advanced STEPS times. For every step, the
    // projected segment is tested against this pixel's UV. The closest segment
    // determines brightness and its velocity determines color hue.
    float d = 1e6;         // Minimum distance from pixel to any trail segment.
    float bestSpeed = 0.0; // Velocity magnitude at the closest segment.

    vec3 last = texelFetch(iChannel0, ivec2(0, 0), 0).xyz;
    vec3 next;

    for (float i = 0.0; i < STEPS; i++) {
        next = integrate(last, 0.005 * SPEED);

        float segD = dfLine(project(last, viewRot, viewScale), project(next, viewRot, viewScale), uv);
        if (segD < d) {
            d = segD;
            // Recompute derivative at \`next\` to get instantaneous speed for color mapping.
            bestSpeed = length(vec3(
                next.y - pa * next.x + pb * next.y * next.z,
                pc * next.y - next.x * next.z + next.z,
                pd * next.x * next.y - pe * next.z
            ));
        }

        last = next;
    }

    // TECHNIQUE: Dual-layer intensity — smoothstep for soft falloff + Gaussian for bright core.
    float c = (INTENSITY / SPEED) * smoothstep(FOCUS / iResolution.y, 0.0, d);
    c += (INTENSITY / 8.5) * exp(-1000.0 * d * d);

    // Blink: random pulses of brightness
    float blinkSeed = floor(iTime * BLINK_FREQ);
    float blink = hash(blinkSeed) < 0.3
        ? sin(fract(iTime * BLINK_FREQ) * 3.14159) : 0.0;

    // Velocity-based color with hue shift + blink boost
    float speedNorm = clamp(bestSpeed / MAX_SPEED, 0.0, 1.0);
    float hue = mod(MAX_HUE - speedNorm * (MAX_HUE - MIN_HUE) + iTime * HUE_SHIFT_SPEED, 360.0);
    float sat = min(1.0, SATURATION * (1.0 + blink * (BLINK_SAT_BOOST - 1.0)));
    float lit = min(1.0, LIGHTNESS * (1.0 + blink * (BLINK_LIT_BOOST - 1.0)));
    vec3 lineColor = hsl2rgb(hue, sat, lit);
    c *= 1.0 + blink * (BLINK_INTENSITY - 1.0);

    // ── State persistence (row 0) & trail accumulation ──
    if (py == 0 && px == 0) {
        // Pixel (0,0): Particle position — seed on frame 0, else store latest state.
        fragColor = (iFrame == 0) ? vec4(start, 0) : vec4(next, 0);
    } else if (py == 0 && px == CAM_PIXEL) {
        // Pixel (1,0): Camera state — rotation offsets + mouse for drag continuity.
        // lastMouse = -1 sentinel means "not tracking" (mouse released).
        vec2 storeMouse = pressed ? iMouse.xy : vec2(-1.0);
        fragColor = vec4(offsetRx, offsetRy, storeMouse);
    } else {
        // Visual pixels — blend new line color onto faded previous frame.
        // Instant clear (fade=0) while actively rotating to avoid smeared trails.
        vec3 prev = texelFetch(iChannel0, ivec2(fragCoord), 0).rgb;
        float fade = rotating ? 0.0 : FADE;
        fragColor = vec4(lineColor * c + prev * fade, 0);
    }
}
`},channels:{image:{iChannel0:"buffer-a"},bufferA:{iChannel0:"buffer-a"}}},{slug:"domain-warping",title:"06. Domain Warping Study",description:"Multi-layer domain warping with recursive coordinate distortion, animated rotation, and mouse-interactive effects. Terminal green aesthetic with accent colors and dark vortex contrast.",date:"2026-01-27",tags:["10-days","procedural","interactive"],links:{},screenshotUrl:uf,passes:{image:`/**\r
 * Domain Warping Study\r
 * @author guinetik\r
 * @date 2026-01-27\r
 *\r
 * Multi-layer domain warping with recursive coordinate distortion.\r
 * Uses Inigo Quilez's classic domain warping approach: f(p + f(p + f(p))).\r
 *\r
 * Domain Warping Techniques:\r
 * - Multi-layer FBM noise for base pattern\r
 * - Recursive domain warping (warping the warped coordinates)\r
 * - Rotating domain warp for dynamic motion\r
 * - Mouse-reactive warping (interactive domain distortion)\r
 * - Time-based warping for animation\r
 *\r
 * Color Palette:\r
 * - Terminal green base (col2-col4) for the "hacker aesthetic"\r
 * - Orange/pink/purple accents (col5-col7) mapped to warp layers q, r, f2\r
 *   so each color appears in different warping regimes\r
 * - Black vortex centers (col1) create contrast against bright folds\r
 *\r
 * Visual Features:\r
 * - Dark vortex areas for contrast\r
 * - Cyan mouse interactions for visibility\r
 * - Pulsing rings from warped coordinates\r
 */\r
\r
// Hash function\r
float hash(vec2 p) {\r
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);\r
}\r
\r
// 2D Noise\r
float noise(vec2 p) {\r
    vec2 i = floor(p);\r
    vec2 f = fract(p);\r
    f = f * f * (3.0 - 2.0 * f);\r
\r
    float a = hash(i);\r
    float b = hash(i + vec2(1.0, 0.0));\r
    float c = hash(i + vec2(0.0, 1.0));\r
    float d = hash(i + vec2(1.0, 1.0));\r
\r
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);\r
}\r
\r
// FBM (Fractal Brownian Motion)\r
float fbm(vec2 p) {\r
    float v = 0.0;\r
    float a = 0.5;\r
    for (int i = 0; i < 6; i++) {\r
        v += a * noise(p);\r
        p *= 2.0;\r
        a *= 0.5;\r
    }\r
    return v;\r
}\r
\r
// Rotate 2D\r
vec2 rotate(vec2 p, float angle) {\r
    float c = cos(angle);\r
    float s = sin(angle);\r
    return vec2(p.x * c - p.y * s, p.x * s + p.y * c);\r
}\r
\r
void mainImage( out vec4 fragColor, in vec2 fragCoord )\r
{\r
    vec2 uv = fragCoord / iResolution.xy;\r
    float aspect = iResolution.x / iResolution.y;\r
\r
    // Centered coordinates\r
    vec2 p = (uv - 0.5) * 2.0;\r
    p.x *= aspect;\r
\r
    float t = iTime * 0.3;\r
\r
    // Mouse influence (Shadertoy uses iMouse.xy / iResolution.xy)\r
    // In Shadertoy: fragCoord.y=0 at top, iMouse.y=0 at top\r
    // p.y = (uv.y - 0.5) * 2.0, so p.y = -1 at top, +1 at bottom\r
    // We need mouse.y to match: mouse.y = -1 at top, +1 at bottom\r
    vec2 mouse = (iMouse.xy / iResolution.xy) * 2.0 - 1.0;\r
    mouse.x *= aspect;\r
    // No Y flip needed - both use same coordinate system\r
\r
    float mouseDist = length(p - mouse);\r
    float mouseActive = (iMouse.z > 0.0) ? 1.0 : 0.0;\r
    float mouseInf = smoothstep(1.2, 0.0, mouseDist) * mouseActive;\r
\r
    // Warping intensity (can animate or set to 1.0)\r
    float warpIntensity = 1.0;\r
\r
    // Pulsing effect from warped coordinates - creates expanding rings\r
    float pulse = sin(t * 2.0 + warpIntensity * 10.0) * 0.5 + 0.5;\r
    float centerDist = length(p);\r
    float ring1 = sin(centerDist * 8.0 - t * 4.0) * 0.5 + 0.5;\r
    float ring2 = sin(centerDist * 12.0 - t * 6.0 + 1.0) * 0.5 + 0.5;\r
    float rings = (ring1 + ring2) * 0.5;\r
    rings *= smoothstep(0.8, 0.0, centerDist) * smoothstep(0.0, 0.3, centerDist);\r
\r
    // === DOMAIN WARPING LAYERS ===\r
    // Start with base coordinates\r
    vec2 pp = p;\r
\r
    // Layer 0: Mouse-reactive domain distortion\r
    // Warp coordinates based on mouse position for interactive effect\r
    pp -= mouse * mouseInf * 0.4;\r
\r
    // Layer 1: Rotating domain warp\r
    // Rotate the coordinate space for dynamic motion\r
    pp = rotate(pp, t * 0.1);\r
\r
    // Layer 2: First FBM warp layer\r
    // Sample FBM noise at different offsets to create warping vectors\r
    vec2 q = vec2(\r
        fbm(pp * 2.0 + t * 0.3),\r
        fbm(pp * 2.0 + vec2(5.2, 1.3) + t * 0.35)\r
    );\r
\r
    // Layer 3: Recursive domain warping\r
    // Warp the already-warped coordinates (q) for complex patterns\r
    vec2 r = vec2(\r
        fbm(pp + q * 2.5 + vec2(1.7, 9.2) + t * 0.4),\r
        fbm(pp + q * 2.5 + vec2(8.3, 2.8) + t * 0.38)\r
    );\r
\r
    // Additional warping: Time-based sinusoidal distortion\r
    // Adds pulsing energy to the warp pattern\r
    float warpBoost = pulse * warpIntensity;\r
    r += warpBoost * vec2(\r
        sin(t * 3.0 + centerDist * 5.0),\r
        cos(t * 3.0 + centerDist * 5.0)\r
    ) * 0.3;\r
\r
    // Additional warping: Mouse-reactive distortion\r
    // Interactive domain warping based on mouse proximity\r
    float mouseWarp = mouseInf * 2.5;\r
    r += mouseWarp * vec2(\r
        sin(t * 6.0 + mouseDist * 10.0),\r
        cos(t * 6.0 + mouseDist * 10.0)\r
    ) * 0.4;\r
\r
    // Final pattern: Sample FBM using the heavily warped coordinates\r
    // The multiple layers of warping create complex, organic patterns\r
    float f = fbm(pp + q + r * 1.2);\r
    float f2 = fbm(pp * 1.5 + r * 1.8 + t * 0.25);\r
\r
    // === COLOR MAPPING ===\r
    // Terminal green base with celebration accents; each accent is driven\r
    // by a different warp layer (q, r, f2) so colors separate spatially\r
    vec3 col1 = vec3(0.0, 0.0, 0.0);        // Black — vortex centers\r
    vec3 col2 = vec3(0.0, 0.2, 0.05);       // Very dark green — shadow regions\r
    vec3 col3 = vec3(0.0, 0.6, 0.15);       // Medium green — mid-warp zones\r
    vec3 col4 = vec3(0.0, 0.9, 0.3);        // Bright green — terminal highlights\r
    vec3 col5 = vec3(1.0, 0.4, 0.0);        // Orange — mapped to q.x (1st warp)\r
    vec3 col6 = vec3(1.0, 0.0, 0.4);        // Pink — mapped to r.y (2nd warp)\r
    vec3 col7 = vec3(0.4, 0.0, 0.9);        // Purple — mapped to f2 (recursive warp)\r
\r
    // Color mixing - green base with celebration colors and dark areas\r
    vec3 color = col1;\r
\r
    // Dark areas first for contrast\r
    float darkMask = smoothstep(0.0, 0.2, f);\r
    color = mix(color, col2, darkMask * 0.8);\r
\r
    // Medium green\r
    color = mix(color, col3, smoothstep(0.2, 0.5, f));\r
\r
    // Bright green with warp intensity boost\r
    color = mix(color, col4, smoothstep(0.4, 0.7, f) * (0.6 + warpBoost * 0.4));\r
\r
    // Accent colors mapped to warped coordinate layers\r
    color = mix(color, col5, smoothstep(0.5, 0.85, q.x) * pulse * 0.8);\r
    color = mix(color, col6, smoothstep(0.45, 0.75, r.y) * pulse * 0.7);\r
    color = mix(color, col7, smoothstep(0.65, 0.95, f2) * pulse * 0.6);\r
\r
    // Dark vortex areas - add dark spots for contrast\r
    float darkVortex = smoothstep(0.7, 0.5, f) * smoothstep(0.3, 0.5, f);\r
    color = mix(color, col1, darkVortex * 0.4);\r
\r
    // Bright streaks from warped pattern - cyan-green with dark contrast\r
    float streak = smoothstep(0.6, 0.65, f) * smoothstep(0.7, 0.65, f);\r
    color += vec3(0.0, 0.8, 0.6) * streak * 2.0 * pulse;\r
\r
    // Pulsing rings from warped coordinates - brighter green with dark gaps\r
    color += vec3(0.0, 0.9, 0.25) * rings * 0.9 * pulse;\r
\r
    // Mouse glow - CYAN with dark core for contrast\r
    vec3 glowCol = vec3(0.0, 0.85, 1.0);  // Bright cyan\r
    float glowIntensity = mouseInf * 1.8;\r
    // Add dark core in center of mouse glow\r
    float darkCore = smoothstep(0.15, 0.0, mouseDist) * mouseInf;\r
    color = mix(color, col1, darkCore * 0.3);\r
    color += glowCol * glowIntensity;\r
\r
    // Mouse ripple rings - cyan with dark gaps\r
    float ripple = sin(mouseDist * 20.0 - t * 10.0) * 0.5 + 0.5;\r
    ripple *= mouseInf * smoothstep(0.0, 1.0, mouseDist);\r
    // Add dark gaps between ripples\r
    float darkRipple = smoothstep(0.05, 0.0, abs(sin(mouseDist * 20.0 - t * 10.0))) * mouseInf;\r
    color = mix(color, col1, darkRipple * 0.2);\r
    color += vec3(0.0, 0.7, 1.0) * ripple * 0.9;\r
\r
    // Overall brightness - modulated by warp intensity\r
    color *= 1.0 + warpBoost * 0.5;\r
\r
    // Vignette\r
    float vig = 1.0 - length(uv - 0.5) * 0.4;\r
    color *= vig;\r
\r
    // Clamp\r
    color = clamp(color, 0.0, 1.0);\r
\r
    fragColor = vec4(color, 1.0);\r
}\r
`},channels:{}},{slug:"exoplanets",title:"Exoplanets Study",description:"A procedural solar system with a star and three different planet types",date:"2025-11-26",tags:["exoplanets","raymarching","3d","space","interactive"],links:{},screenshotUrl:pf,passes:{image:`/**\r
 * Exoplanets Study\r
 * @author guinetik\r
 * @date 2025-11-26\r
 *\r
 * A procedural solar system with a realistic star and three different planet types.\r
 * All geometry is ray-sphere intersected (no raymarching), with procedural surface\r
 * shading driven by simplex noise, FBM, and tiled noise for seamless flame textures.\r
 *\r
 * Scene:\r
 * - Central star with boiling plasma surface, corona flames, and rays\r
 * - Rocky planet (inner orbit) -- Earth/Mars-like with FBM terrain, craters, and ice/lava biomes\r
 * - Gas giant (middle orbit) -- Jupiter-like with latitudinal bands and storm spots\r
 * - Ice giant (outer orbit) -- Neptune-like with methane atmosphere and haze\r
 *\r
 * Controls:\r
 * - Mouse X: Orbit camera horizontally (full 360 degrees)\r
 * - Mouse Y: Orbit camera vertically (pitch up/down)\r
 * - Click anywhere: Change star temperature (cycles through spectral types)\r
 * - No interaction: Camera gently auto-orbits\r
 *\r
 * Star temperatures cycle through: Y-dwarf (purple) -> M (red) -> K (orange) ->\r
 *                                   G (yellow) -> F (white) -> A (blue-white) -> O (blue)\r
 *\r
 * Physical models:\r
 * - Stellar surface: tiled FBM plasma + spherical distortion + limb darkening\r
 * - Corona: angular noise prominences with lifecycle modulation\r
 * - Star rays: outward-traveling wave pulses along angular spokes\r
 * - Temperature-to-color: piecewise linear interpolation across spectral types\r
 *   (Y/T/L brown dwarfs through O-type blue giants)\r
 *\r
 * Created from the Exoplanets visualization project\r
 * https://github.com/guinetik/exoplanets\r
 */\r
\r
// =============================================================================\r
// CONFIGURATION - Adjust these to customize the scene\r
// =============================================================================\r
\r
// 3D positions - Star at center, planets orbiting\r
#define STAR_CENTER vec3(0.0, 0.0, 0.0)  // Star placed at world origin.\r
#define STAR_RADIUS 1.0                   // Star radius — all other distances are relative to this.\r
#define CORONA_RADIUS 1.5                 // Corona extends to 1.5x star radius — larger = wider flame halo.\r
#define RAY_LENGTH 0.8                    // How far light rays extend beyond star surface (in star radii).\r
\r
// Rocky planet (closest to star - like Mercury/Venus/Earth)\r
#define ROCKY_CENTER vec3(2.5, 0.0, 0.0) // Orbital position — closer = more star illumination.\r
#define ROCKY_RADIUS 0.3                  // Planet radius — smaller = more Earth-like scale relative to star.\r
\r
// Gas giant (middle distance - like Jupiter/Saturn)\r
#define GAS_CENTER vec3(0.0, 0.0, 4.0)   // Placed along Z axis for visual separation.\r
#define GAS_RADIUS 0.7                    // Largest planet — visually dominant in the mid-field.\r
\r
// Ice giant (farthest - like Uranus/Neptune)\r
#define ICE_CENTER vec3(-3.5, 0.5, -2.0) // Off-axis position for depth variety.\r
#define ICE_RADIUS 0.5                    // Medium size — between rocky and gas giant.\r
\r
// Camera settings\r
#define CAMERA_DISTANCE 8.0               // Orbit radius — larger = wider view of the system.\r
#define CAMERA_FOV 1.8                    // Focal length factor — higher = narrower FOV (more telephoto).\r
\r
// Planet base colors - vivid and distinct\r
#define ROCKY_COLOR vec3(0.3, 0.5, 0.8)       // Blue-tinted base for rocky terrain.\r
#define GAS_GIANT_COLOR vec3(0.95, 0.6, 0.3)  // Warm orange-amber for Jupiter-like bands.\r
#define ICE_GIANT_COLOR vec3(0.2, 0.5, 0.95)  // Cool blue for Neptune-like atmosphere.\r
\r
// =============================================================================\r
// SHADER CONSTANTS\r
// =============================================================================\r
\r
const float PI = 3.14159265359;\r
const float TAU = 6.28318530718;\r
const float MOD_DIVISOR = 289.0;\r
\r
// Star surface constants\r
const float PLASMA_SCALE = 3.0;          // UV scale for plasma noise — higher = finer granules.\r
const float PLASMA_SPEED = 0.12;         // Time multiplier for plasma animation — higher = faster boiling.\r
const float FLAME_SCALE_COARSE = 15.0;   // Tiled noise resolution for large flame structures.\r
const float FLAME_SCALE_FINE = 45.0;     // Tiled noise resolution for fine flame detail.\r
const float FLAME_FLOW_SPEED = 0.35;     // Outward flow speed of flame patterns along latitude.\r
const int FLAME_OCTAVES = 5;             // FBM octaves for flame detail — more = finer but costlier.\r
\r
// Corona constants\r
const float CORONA_FLAME_INTENSITY = 2.0; // Brightness multiplier for corona flames.\r
const int NUM_PROMINENCES = 5;            // Number of solar prominence arcs — more = busier corona.\r
const float PROMINENCE_BRIGHTNESS = 3.0;  // Peak brightness of individual prominences.\r
\r
// Star rays constants\r
const int NUM_MAIN_RAYS = 6;             // Primary light ray spokes around the star.\r
const int NUM_SECONDARY_RAYS = 8;        // Fainter secondary rays for visual richness.\r
const float RAY_INTENSITY = 1.2;         // Overall ray brightness multiplier.\r
const float RAY_FADE_POWER = 3.0;        // Exponential distance falloff — higher = rays fade faster.\r
\r
// Planet constants\r
const float BAND_FREQ_BASE = 10.0;       // Base frequency of gas giant latitude bands.\r
const float TURBULENCE_STRENGTH = 0.15;  // Noise-based turbulence amplitude in the bands.\r
const float STORM_SIZE = 0.06;           // Radius of storm spots (Great Red Spot analogue).\r
\r
// =============================================================================\r
// TEMPERATURE TO COLOR - Full spectral range including brown dwarfs\r
// =============================================================================\r
// PHYSICS: Stellar spectral classification\r
// Real star colors follow blackbody radiation (Planck's law), but brown dwarfs\r
// (< ~2000K) deviate significantly due to molecular absorption (methane, water).\r
// Colors below are artist-interpreted from spectral type observations,\r
// interpolated piecewise-linearly between anchor temperatures.\r
\r
// Brown dwarfs (substellar objects) - non-blackbody due to methane absorption\r
const vec3 TEMP_300K = vec3(0.35, 0.2, 0.45);      // Dark purple (Y-dwarf, ultra-cool)\r
const vec3 TEMP_500K = vec3(0.5, 0.25, 0.55);      // Purple (Y-dwarf)\r
const vec3 TEMP_800K = vec3(0.6, 0.27, 0.65);      // Magenta-purple (T-dwarf, methane)\r
const vec3 TEMP_1300K = vec3(0.8, 0.3, 0.35);      // Deep red-magenta (L-dwarf boundary)\r
\r
// Main sequence stars\r
const vec3 TEMP_2000K = vec3(1.0, 0.35, 0.1);      // Deep red (late L-dwarf/early M)\r
const vec3 TEMP_3000K = vec3(1.0, 0.65, 0.35);     // Orange-red (M-dwarf)\r
const vec3 TEMP_4000K = vec3(1.0, 0.78, 0.55);     // Orange (K-dwarf)\r
const vec3 TEMP_5778K = vec3(1.0, 0.96, 0.91);     // Yellow-white (Sun, G-type)\r
const vec3 TEMP_7500K = vec3(0.92, 0.93, 1.0);     // White (F-type)\r
const vec3 TEMP_10000K = vec3(0.80, 0.85, 1.0);    // Blue-white (A-type)\r
const vec3 TEMP_20000K = vec3(0.70, 0.78, 1.0);    // Blue (B-type)\r
const vec3 TEMP_40000K = vec3(0.62, 0.72, 1.0);    // Deep blue (O-type)\r
\r
/**\r
 * Convert temperature (Kelvin) to RGB color\r
 * Full range from Y-dwarfs (300K) to O-stars (40000K)\r
 */\r
vec3 temperatureToColor(float tempK) {\r
    tempK = clamp(tempK, 300.0, 40000.0);\r
\r
    // Brown dwarf range (Y, T, L types) - purple/magenta colors\r
    if (tempK < 500.0) {\r
        float t = (tempK - 300.0) / 200.0;\r
        return mix(TEMP_300K, TEMP_500K, t);\r
    } else if (tempK < 800.0) {\r
        float t = (tempK - 500.0) / 300.0;\r
        return mix(TEMP_500K, TEMP_800K, t);\r
    } else if (tempK < 1300.0) {\r
        float t = (tempK - 800.0) / 500.0;\r
        return mix(TEMP_800K, TEMP_1300K, t);\r
    } else if (tempK < 2000.0) {\r
        float t = (tempK - 1300.0) / 700.0;\r
        return mix(TEMP_1300K, TEMP_2000K, t);\r
    } else if (tempK < 3000.0) {\r
        float t = (tempK - 2000.0) / 1000.0;\r
        return mix(TEMP_2000K, TEMP_3000K, t);\r
    } else if (tempK < 4000.0) {\r
        float t = (tempK - 3000.0) / 1000.0;\r
        return mix(TEMP_3000K, TEMP_4000K, t);\r
    } else if (tempK < 5778.0) {\r
        float t = (tempK - 4000.0) / 1778.0;\r
        return mix(TEMP_4000K, TEMP_5778K, t);\r
    } else if (tempK < 7500.0) {\r
        float t = (tempK - 5778.0) / 1722.0;\r
        return mix(TEMP_5778K, TEMP_7500K, t);\r
    } else if (tempK < 10000.0) {\r
        float t = (tempK - 7500.0) / 2500.0;\r
        return mix(TEMP_7500K, TEMP_10000K, t);\r
    } else if (tempK < 20000.0) {\r
        float t = (tempK - 10000.0) / 10000.0;\r
        return mix(TEMP_10000K, TEMP_20000K, t);\r
    } else {\r
        float t = (tempK - 20000.0) / 20000.0;\r
        return mix(TEMP_20000K, TEMP_40000K, t);\r
    }\r
}\r
\r
// =============================================================================\r
// NOISE FUNCTIONS\r
// =============================================================================\r
// Noise algorithm choices:\r
// - 3D Simplex (snoise3D): Used for star surface, corona, and planet terrain.\r
//   Simplex is preferred over Perlin for its lack of axis-aligned artifacts and\r
//   lower computational cost in 3D (4 corners vs 8 for classic Perlin).\r
// - 2D Simplex (snoise2D): Used for planet surface detail where 3D is unnecessary.\r
// - Tiled noise (tiledNoise3D): Used for star flames — tiles seamlessly at a\r
//   given resolution to prevent visible seams on the spherical surface.\r
\r
vec3 mod289_3(vec3 x) { return x - floor(x * (1.0 / MOD_DIVISOR)) * MOD_DIVISOR; }\r
vec4 mod289_4(vec4 x) { return x - floor(x * (1.0 / MOD_DIVISOR)) * MOD_DIVISOR; }\r
vec2 mod289_2(vec2 x) { return x - floor(x * (1.0 / MOD_DIVISOR)) * MOD_DIVISOR; }\r
\r
vec4 permute(vec4 x) { return mod289_4(((x * 34.0) + 1.0) * x); }\r
vec3 permute3(vec3 x) { return mod289_3(((x * 34.0) + 1.0) * x); }\r
\r
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }\r
\r
float hash(float n) { return fract(sin(n) * 43758.5453123); }\r
\r
float seedHash(float seed) {\r
    return fract(sin(seed * 127.1 + seed * seed * 0.013) * 43758.5453);\r
}\r
\r
float wrapTime(float t) { return mod(t, 1000.0); }\r
\r
// 3D Simplex Noise\r
float snoise3D(vec3 v) {\r
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);\r
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);\r
\r
    vec3 i = floor(v + dot(v, C.yyy));\r
    vec3 x0 = v - i + dot(i, C.xxx);\r
\r
    vec3 g = step(x0.yzx, x0.xyz);\r
    vec3 l = 1.0 - g;\r
    vec3 i1 = min(g.xyz, l.zxy);\r
    vec3 i2 = max(g.xyz, l.zxy);\r
\r
    vec3 x1 = x0 - i1 + C.xxx;\r
    vec3 x2 = x0 - i2 + C.yyy;\r
    vec3 x3 = x0 - D.yyy;\r
\r
    i = mod289_3(i);\r
    vec4 p = permute(permute(permute(\r
        i.z + vec4(0.0, i1.z, i2.z, 1.0))\r
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))\r
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));\r
\r
    float n_ = 0.142857142857;\r
    vec3 ns = n_ * D.wyz - D.xzx;\r
\r
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);\r
    vec4 x_ = floor(j * ns.z);\r
    vec4 y_ = floor(j - 7.0 * x_);\r
\r
    vec4 x = x_ * ns.x + ns.yyyy;\r
    vec4 y = y_ * ns.x + ns.yyyy;\r
    vec4 h = 1.0 - abs(x) - abs(y);\r
\r
    vec4 b0 = vec4(x.xy, y.xy);\r
    vec4 b1 = vec4(x.zw, y.zw);\r
\r
    vec4 s0 = floor(b0) * 2.0 + 1.0;\r
    vec4 s1 = floor(b1) * 2.0 + 1.0;\r
    vec4 sh = -step(h, vec4(0.0));\r
\r
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;\r
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;\r
\r
    vec3 p0 = vec3(a0.xy, h.x);\r
    vec3 p1 = vec3(a0.zw, h.y);\r
    vec3 p2 = vec3(a1.xy, h.z);\r
    vec3 p3 = vec3(a1.zw, h.w);\r
\r
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));\r
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;\r
\r
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\r
    m = m * m;\r
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));\r
}\r
\r
// 2D Simplex Noise\r
float snoise2D(vec2 v) {\r
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,\r
                       -0.577350269189626, 0.024390243902439);\r
    vec2 i = floor(v + dot(v, C.yy));\r
    vec2 x0 = v - i + dot(i, C.xx);\r
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\r
    vec4 x12 = x0.xyxy + C.xxzz;\r
    x12.xy -= i1;\r
    i = mod289_2(i);\r
    vec3 p = permute3(permute3(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));\r
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\r
    m = m * m; m = m * m;\r
    vec3 x = 2.0 * fract(p * C.www) - 1.0;\r
    vec3 h = abs(x) - 0.5;\r
    vec3 ox = floor(x + 0.5);\r
    vec3 a0 = x - ox;\r
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);\r
    vec3 g;\r
    g.x = a0.x * x0.x + h.x * x0.y;\r
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;\r
    return 130.0 * dot(m, g);\r
}\r
\r
// Tiled noise for seamless flame patterns\r
float tiledNoise3D(vec3 uv, float res) {\r
    uv *= res;\r
    vec3 uv0 = floor(mod(uv, res)) * vec3(1.0, 100.0, 10000.0);\r
    vec3 uv1 = floor(mod(uv + vec3(1.0), res)) * vec3(1.0, 100.0, 10000.0);\r
    vec3 f = fract(uv);\r
    f = f * f * (3.0 - 2.0 * f);\r
\r
    vec4 v = vec4(uv0.x + uv0.y + uv0.z, uv1.x + uv0.y + uv0.z,\r
                  uv0.x + uv1.y + uv0.z, uv1.x + uv1.y + uv0.z);\r
\r
    vec4 r = fract(sin(v * 0.001) * 100000.0);\r
    float r0 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);\r
\r
    r = fract(sin((v + uv1.z - uv0.z) * 0.001) * 100000.0);\r
    float r1 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);\r
\r
    return mix(r0, r1, f.z) * 2.0 - 1.0;\r
}\r
\r
// FBM variants\r
float fbm3D(vec3 p, int octaves) {\r
    float value = 0.0;\r
    float amplitude = 0.5;\r
    float frequency = 1.0;\r
    for (int i = 0; i < 6; i++) {\r
        if (i >= octaves) break;\r
        value += amplitude * snoise3D(p * frequency);\r
        amplitude *= 0.5;\r
        frequency *= 2.0;\r
    }\r
    return value;\r
}\r
\r
float fbm2D(vec2 p) {\r
    float value = 0.0;\r
    float amplitude = 0.5;\r
    for (int i = 0; i < 5; i++) {\r
        value += amplitude * snoise2D(p);\r
        p *= 2.0;\r
        amplitude *= 0.5;\r
    }\r
    return value;\r
}\r
\r
// Plasma noise with flowing distortion\r
float plasmaNoise(vec3 p, float time) {\r
    float value = 0.0;\r
    float amplitude = 1.0;\r
    float frequency = 1.0;\r
    float totalAmp = 0.0;\r
\r
    for (int i = 0; i < 5; i++) {\r
        vec3 offset = vec3(\r
            sin(time * 0.1 + float(i)) * 0.5,\r
            cos(time * 0.15 + float(i) * 0.7) * 0.5,\r
            time * 0.05\r
        );\r
        value += amplitude * snoise3D((p + offset) * frequency);\r
        totalAmp += amplitude;\r
        amplitude *= 0.5;\r
        frequency *= 2.0;\r
    }\r
\r
    return value / totalAmp;\r
}\r
\r
// =============================================================================\r
// COLOR UTILITIES\r
// =============================================================================\r
\r
vec3 hsv2rgb(vec3 c) {\r
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);\r
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\r
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\r
}\r
\r
vec3 rgb2hsv(vec3 c) {\r
    vec4 K = vec4(0.0, -1.0/3.0, 2.0/3.0, -1.0);\r
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));\r
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));\r
    float d = q.x - min(q.w, q.y);\r
    float e = 1.0e-10;\r
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);\r
}\r
\r
// =============================================================================\r
// OUTWARD TRAVELING WAVE (for star rays)\r
// =============================================================================\r
\r
float outwardWave(float edgeDist, float time, float frequency, float speed) {\r
    float wave = fract(edgeDist * frequency - time * speed);\r
    wave = smoothstep(0.0, 0.3, wave) * smoothstep(1.0, 0.5, wave);\r
    return wave;\r
}\r
\r
// =============================================================================\r
// STAR SURFACE SHADER - Boiling plasma with spherical distortion\r
// =============================================================================\r
// TECHNIQUE: Spherical UV distortion for boiling plasma\r
// The star surface is projected through a spherical lens distortion\r
// (similar to a fish-eye effect) before sampling plasma noise. This creates\r
// the characteristic "boiling" appearance where granules appear to emerge\r
// from the center and flow toward the limb.\r
//\r
// PHYSICS: Limb darkening\r
// Real stars appear dimmer at the edge (limb) because we see deeper into\r
// hotter layers when looking at the center. Approximated here with\r
// pow(dot(normal, viewDir), 0.4).\r
\r
vec3 renderStarSurface(vec3 spherePos, vec3 normal, vec3 rayDir, vec3 baseColor, float activityLevel, float seed) {\r
    float time = wrapTime(iTime);\r
\r
    // Spherical coordinates\r
    float angle = atan(spherePos.y, spherePos.x);\r
    float elevation = acos(clamp(spherePos.z, -1.0, 1.0));\r
\r
    // View angle (for limb darkening)\r
    float viewAngle = max(dot(normal, -rayDir), 0.0);\r
    float edgeDist = 1.0 - viewAngle;\r
\r
    // === SPHERICAL DISTORTION (the key boiling effect) ===\r
    vec2 sp = spherePos.xy;\r
    float brightness = 0.25;\r
    float distortStrength = 2.0 - brightness;\r
    vec2 distortedSP = sp * distortStrength;\r
    float r = dot(distortedSP, distortedSP);\r
    float f = (1.0 - sqrt(abs(1.0 - r))) / (r + 0.001) + brightness * 0.5;\r
\r
    vec2 warpedUV;\r
    warpedUV.x = distortedSP.x * f;\r
    warpedUV.y = distortedSP.y * f;\r
    warpedUV += vec2(time * 0.1, 0.0);\r
\r
    // === PLASMA TEXTURE ===\r
    vec3 plasmaCoord = vec3(warpedUV * PLASMA_SCALE, time * PLASMA_SPEED);\r
    float plasma1 = plasmaNoise(plasmaCoord, time);\r
    vec3 plasma2Coord = vec3(warpedUV * PLASMA_SCALE * 1.3, time * PLASMA_SPEED * 0.8);\r
    float plasma2 = plasmaNoise(plasma2Coord + vec3(50.0, 50.0, 0.0), time * 1.2);\r
    float plasma = plasma1 * 0.6 + plasma2 * 0.4;\r
    plasma = plasma * 0.5 + 0.5;\r
\r
    // Extra warping for more chaos\r
    float plasmaDistort = plasma * brightness * PI;\r
    vec2 extraWarp = warpedUV + vec2(plasmaDistort, 0.0);\r
    float plasma3 = plasmaNoise(vec3(extraWarp * PLASMA_SCALE * 0.8, time * PLASMA_SPEED * 1.5), time);\r
    plasma = mix(plasma, plasma3 * 0.5 + 0.5, 0.3);\r
\r
    // === OUTWARD FLOWING FLAMES ===\r
    vec3 flameCoord = vec3(angle / TAU, elevation / PI, time * 0.1);\r
\r
    float newTime1 = abs(tiledNoise3D(\r
        flameCoord + vec3(0.0, -time * FLAME_FLOW_SPEED, time * 0.08),\r
        FLAME_SCALE_COARSE\r
    ));\r
    float newTime2 = abs(tiledNoise3D(\r
        flameCoord + vec3(0.0, -time * FLAME_FLOW_SPEED * 0.5, time * 0.08),\r
        FLAME_SCALE_FINE\r
    ));\r
\r
    float flameVal1 = 1.0 - edgeDist;\r
    float flameVal2 = 1.0 - edgeDist;\r
\r
    for (int i = 1; i <= FLAME_OCTAVES; i++) {\r
        float power = pow(2.0, float(i + 1));\r
        float contribution = 0.5 / power;\r
        flameVal1 += contribution * tiledNoise3D(\r
            flameCoord + vec3(0.0, -time * 0.1, time * 0.2),\r
            power * 10.0 * (newTime1 + 1.0)\r
        );\r
        flameVal2 += contribution * tiledNoise3D(\r
            flameCoord + vec3(0.0, -time * 0.1, time * 0.2),\r
            power * 25.0 * (newTime2 + 1.0)\r
        );\r
    }\r
\r
    float flames = (flameVal1 + flameVal2) * 0.5;\r
    flames = clamp(flames, 0.0, 1.0);\r
\r
    // Edge flame boost\r
    float edgeBoost = pow(edgeDist, 0.5) * 2.5 * activityLevel;\r
    flames += edgeBoost * flames * 0.5;\r
\r
    // === CONVECTION CELLS ===\r
    float cells = snoise3D(spherePos * 6.0 + vec3(0.0, time * 0.02, 0.0));\r
    cells = cells * 0.5 + 0.5 + snoise3D(spherePos * 6.0 + vec3(0.0, time * 0.04, 0.0)) * 0.2;\r
\r
    // === SUNSPOTS ===\r
    float spotNoise = snoise3D(spherePos * 3.0 + vec3(0.0, time * 0.005, 0.0));\r
    float spotMask = smoothstep(0.55, 0.75, spotNoise);\r
    float spotDarkening = 1.0 - spotMask * 0.5;\r
\r
    // === PULSATION ===\r
    float pulse1 = cos(time * 0.5 + seedHash(seed) * TAU);\r
    float pulse2 = sin(time * 0.25 + seedHash(seed + 1.0) * TAU);\r
    float pulse = (pulse1 * 0.6 + pulse2 * 0.4) * 0.3 * activityLevel;\r
\r
    // === COMBINE INTENSITIES ===\r
    float totalIntensity = plasma * 0.5 + flames * 0.35 + cells * 0.3 * 0.15;\r
    totalIntensity *= spotDarkening;\r
    totalIntensity *= 1.0 + pulse * 0.5;\r
    totalIntensity = clamp(totalIntensity, 0.0, 1.5);\r
\r
    // === COLOR ===\r
    vec3 hotColor = baseColor * vec3(1.5, 1.3, 1.2);\r
    hotColor = min(hotColor, vec3(1.8));\r
    vec3 coolColor = baseColor * vec3(0.7, 0.4, 0.3);\r
    vec3 warmColor = baseColor * vec3(1.2, 1.0, 0.85);\r
\r
    vec3 surfaceColor;\r
    if (totalIntensity < 0.4) {\r
        surfaceColor = mix(coolColor, warmColor, totalIntensity / 0.4);\r
    } else if (totalIntensity < 0.7) {\r
        surfaceColor = mix(warmColor, hotColor, (totalIntensity - 0.4) / 0.3);\r
    } else {\r
        surfaceColor = hotColor * (1.0 + (totalIntensity - 0.7) * 1.8);\r
    }\r
\r
    // Base glow\r
    surfaceColor *= 0.6 + brightness * 0.4;\r
\r
    // === LIMB DARKENING ===\r
    float limbDark = pow(viewAngle, 0.4);\r
    surfaceColor *= 0.85 + limbDark * 0.15;\r
\r
    // === EDGE GLOW ===\r
    float edgeGlow = pow(edgeDist, 0.3) * flames * 0.4 * activityLevel;\r
    surfaceColor += warmColor * edgeGlow;\r
\r
    // Center boost\r
    surfaceColor += baseColor * pow(viewAngle, 1.5) * 0.3;\r
\r
    return clamp(surfaceColor, 0.0, 2.5);\r
}\r
\r
// =============================================================================\r
// CORONA FLAMES - 3D version\r
// =============================================================================\r
\r
vec3 renderCorona3D(vec3 rayOrigin, vec3 rayDir, vec3 starCenter, float starRadius,\r
                    vec3 baseColor, float activityLevel, float seed) {\r
    float time = wrapTime(iTime);\r
\r
    // Find closest point on ray to star center\r
    vec3 toStar = starCenter - rayOrigin;\r
    float t = max(dot(toStar, rayDir), 0.0);\r
    vec3 closestPoint = rayOrigin + rayDir * t;\r
    float dist = length(closestPoint - starCenter);\r
\r
    // Don't render corona inside the star\r
    if (dist < starRadius) return vec3(0.0);\r
\r
    // Normalized distance from star edge\r
    float normalizedDist = (dist - starRadius) / (CORONA_RADIUS * starRadius - starRadius);\r
    if (normalizedDist > 1.2) return vec3(0.0);\r
    normalizedDist = clamp(normalizedDist, 0.0, 1.2);\r
\r
    // Direction from star center to closest point (for angular variation)\r
    vec3 dir = normalize(closestPoint - starCenter);\r
    float angle = atan(dir.y, dir.x);\r
\r
    // === FLAME NOISE ===\r
    float flameTime = time * 0.3;\r
    vec3 flameCoord = vec3(angle * 3.0, normalizedDist * 2.0, flameTime * 2.0);\r
    float flameNoise = fbm3D(flameCoord, 3);\r
    flameNoise = flameNoise * 0.5 + 0.5;\r
\r
    // Turbulence\r
    vec3 turbCoord = vec3(angle * 6.0 + time * 0.5, normalizedDist * 4.0, time * 0.25);\r
    float flameTurbulence = fbm3D(turbCoord, 4);\r
\r
    // Flame intensity with falloff\r
    float flameIntensity = flameNoise * (0.5 + flameTurbulence * 0.5);\r
    flameIntensity *= smoothstep(0.0, 0.2, normalizedDist);  // Fade in from star edge\r
    flameIntensity *= smoothstep(1.2, 0.4, normalizedDist);  // Fade out toward edge\r
    flameIntensity *= activityLevel * 0.7 + 0.3;\r
\r
    // === SOLAR PROMINENCES ===\r
    float prominenceTotal = 0.0;\r
    float flareTime = time * 0.4;\r
\r
    for (int i = 0; i < NUM_PROMINENCES; i++) {\r
        float fi = float(i);\r
        float prominenceAngle = seedHash(seed + fi) * TAU;\r
        float prominencePhase = seedHash(seed + fi + 10.0) * TAU;\r
\r
        float angleDiff = abs(mod(angle - prominenceAngle + PI, TAU) - PI);\r
        float spatialMask = exp(-angleDiff * angleDiff * 12.0);\r
\r
        // Lifecycle\r
        float cycleSpeed = 0.5 + seedHash(seed + fi + 20.0) * 0.5;\r
        float lifecycle = sin(flareTime * cycleSpeed + prominencePhase);\r
        lifecycle = max(lifecycle, 0.0);\r
        lifecycle = pow(lifecycle, 0.7);\r
\r
        float prominenceIntensity = spatialMask * lifecycle * normalizedDist;\r
\r
        // Noise for organic shape\r
        float pNoise = snoise3D(vec3(angle * 8.0, normalizedDist * 5.0, time * 0.25 + fi));\r
        prominenceIntensity *= 0.7 + pNoise * 0.3;\r
\r
        prominenceTotal += prominenceIntensity;\r
    }\r
\r
    prominenceTotal *= PROMINENCE_BRIGHTNESS * activityLevel;\r
\r
    // === COMBINE ===\r
    float totalIntensity = flameIntensity * CORONA_FLAME_INTENSITY + prominenceTotal;\r
\r
    // === COLOR ===\r
    vec3 hotColor = baseColor * vec3(1.3, 1.1, 0.9) * 1.5 + vec3(0.2);\r
    vec3 coolColor = baseColor * vec3(1.2, 0.7, 0.4) * 1.5 + vec3(0.2);\r
    vec3 prominenceColor = baseColor * vec3(1.5, 1.0, 0.5) * 1.5;\r
\r
    vec3 flameColor = mix(hotColor, coolColor, normalizedDist);\r
    flameColor = mix(flameColor, prominenceColor, min(prominenceTotal * 0.5, 1.0));\r
    flameColor *= totalIntensity;\r
\r
    // Alpha falloff\r
    float alpha = totalIntensity * smoothstep(0.0, 0.15, normalizedDist);\r
    alpha = pow(alpha, 0.7);\r
    alpha = clamp(alpha, 0.0, 0.8);\r
\r
    return flameColor * alpha;\r
}\r
\r
// =============================================================================\r
// STAR RAYS - 3D version\r
// =============================================================================\r
\r
vec3 renderStarRays3D(vec3 rayOrigin, vec3 rayDir, vec3 starCenter, float starRadius,\r
                      vec3 baseColor, float activityLevel, float seed) {\r
    float time = wrapTime(iTime);\r
\r
    // Find closest point on ray to star center\r
    vec3 toStar = starCenter - rayOrigin;\r
    float t = max(dot(toStar, rayDir), 0.0);\r
    vec3 closestPoint = rayOrigin + rayDir * t;\r
    float dist = length(closestPoint - starCenter);\r
\r
    // Distance from star edge\r
    float edgeDist = dist - starRadius;\r
    if (edgeDist < 0.0) return vec3(0.0);\r
\r
    float normalizedDist = edgeDist / (RAY_LENGTH * starRadius);\r
    if (normalizedDist > 1.5) return vec3(0.0);\r
\r
    // Fade with distance\r
    float distanceFade = exp(-normalizedDist * RAY_FADE_POWER);\r
\r
    // Direction for angular variation\r
    vec3 dir = normalize(closestPoint - starCenter);\r
    float angle = atan(dir.y, dir.x);\r
\r
    float rayTime = time * 0.4;\r
    float rays = 0.0;\r
    float baseSharpness = 6.0;\r
\r
    // Main rays\r
    for (int i = 0; i < NUM_MAIN_RAYS; i++) {\r
        float fi = float(i);\r
        float rayAngle = seedHash(seed + fi * 0.13) * TAU;\r
\r
        float angleDiff = angle - rayAngle;\r
        angleDiff = mod(angleDiff + PI, TAU) - PI;\r
\r
        float angularFalloff = exp(-abs(angleDiff) * baseSharpness);\r
\r
        float waveFreq = 3.0 + seedHash(seed + fi * 0.7) * 2.0;\r
        float waveSpeed = 0.8 + seedHash(seed + fi * 0.9) * 0.4;\r
        float wave = outwardWave(normalizedDist, rayTime, waveFreq, waveSpeed);\r
        float wave2 = outwardWave(normalizedDist, rayTime * 0.7, waveFreq * 1.5, waveSpeed * 0.8);\r
\r
        float waveIntensity = 0.6 + wave * 0.3 + wave2 * 0.2;\r
        float rayBrightness = 0.6 + seedHash(seed + fi * 0.5) * 0.4;\r
\r
        rays += angularFalloff * waveIntensity * rayBrightness;\r
    }\r
\r
    // Secondary rays\r
    for (int i = 0; i < NUM_SECONDARY_RAYS; i++) {\r
        float fi = float(i);\r
        float rayAngle = seedHash(seed + fi * 0.19 + 5.0) * TAU;\r
\r
        float angleDiff = angle - rayAngle;\r
        angleDiff = mod(angleDiff + PI, TAU) - PI;\r
\r
        float angularFalloff = exp(-abs(angleDiff) * baseSharpness * 0.5) * 0.4;\r
        float wave = outwardWave(normalizedDist, rayTime * 0.9, 4.0, 0.6);\r
        float waveIntensity = 0.5 + wave * 0.3;\r
\r
        rays += angularFalloff * waveIntensity * 0.5;\r
    }\r
\r
    rays *= distanceFade;\r
    rays *= 0.6 + activityLevel * 0.4;\r
\r
    // Color\r
    vec3 rayColor = mix(vec3(1.0, 0.98, 0.95), baseColor, clamp(normalizedDist * 0.8, 0.0, 1.0));\r
    rayColor *= rays * RAY_INTENSITY;\r
\r
    // Alpha\r
    float alpha = rays * 0.7;\r
    alpha *= smoothstep(0.0, starRadius * 0.1, edgeDist);\r
\r
    return rayColor * alpha;\r
}\r
\r
// =============================================================================\r
// OUTER GLOW - Simple atmospheric haze\r
// =============================================================================\r
\r
vec3 renderOuterGlow3D(vec3 rayOrigin, vec3 rayDir, vec3 starCenter, float starRadius, vec3 baseColor) {\r
    vec3 toStar = starCenter - rayOrigin;\r
    float t = max(dot(toStar, rayDir), 0.0);\r
    vec3 closestPoint = rayOrigin + rayDir * t;\r
    float dist = length(closestPoint - starCenter);\r
\r
    if (dist < starRadius) return vec3(0.0);\r
\r
    float glowDist = (dist - starRadius) / (starRadius * 2.0);\r
    float glow = exp(-glowDist * 2.0) * 0.4;\r
\r
    return baseColor * vec3(1.1, 0.9, 0.7) * glow;\r
}\r
\r
// =============================================================================\r
// ROCKY PLANET SHADER\r
// =============================================================================\r
\r
vec3 renderRockyPlanet(vec2 uv, vec3 normal, vec3 baseColor, float seed, float temperature) {\r
    float time = iTime;\r
    vec2 terrainUv = uv + vec2(seed * 10.0, seed * 7.0);\r
\r
    vec3 hsv = rgb2hsv(baseColor);\r
    hsv.x = fract(hsv.x + seed * 0.15);\r
    hsv.y = clamp(hsv.y * 1.3, 0.5, 1.0);\r
    hsv.z = clamp(hsv.z * 1.1, 0.4, 1.0);\r
    vec3 variedColor = hsv2rgb(hsv);\r
\r
    float terrain = fbm2D(terrainUv * (3.0 + seed * 3.0));\r
\r
    float iceFactor = smoothstep(250.0, 180.0, temperature);\r
    float volcanicFactor = smoothstep(400.0, 800.0, temperature);\r
\r
    vec3 lowland = variedColor * 0.7;\r
    vec3 highland = variedColor * 1.2;\r
    vec3 peak = variedColor * 1.4;\r
\r
    vec3 iceColor = vec3(0.8 + seed * 0.15, 0.85 + seed * 0.1, 0.9 + seed * 0.1);\r
    lowland = mix(lowland, iceColor * 0.6, iceFactor);\r
    highland = mix(highland, iceColor * 0.8, iceFactor);\r
    peak = mix(peak, iceColor, iceFactor);\r
\r
    vec3 lavaColor = vec3(1.0, 0.2 + seed * 0.3, 0.05 + seed * 0.15);\r
    vec3 ashColor = vec3(0.15 + seed * 0.1, 0.1 + seed * 0.1, 0.05 + seed * 0.1);\r
    lowland = mix(lowland, lavaColor * 0.8, volcanicFactor * 0.5);\r
    highland = mix(highland, ashColor, volcanicFactor);\r
\r
    vec3 surfaceColor = mix(lowland, highland, smoothstep(0.3, 0.6, terrain));\r
    surfaceColor = mix(surfaceColor, peak, smoothstep(0.7, 0.9, terrain));\r
\r
    float craters = snoise2D(terrainUv * (25.0 + seed * 15.0));\r
    float craterMask = smoothstep(0.8, 0.7, craters) * (1.0 - min(iceFactor + volcanicFactor, 1.0));\r
    surfaceColor *= (1.0 - craterMask * 0.3);\r
\r
    if (volcanicFactor > 0.0) {\r
        float cracks = snoise2D(terrainUv * (15.0 + seed * 10.0));\r
        float crackMask = smoothstep(0.7, 0.6, abs(cracks));\r
        surfaceColor = mix(surfaceColor, lavaColor * 1.2, crackMask * volcanicFactor * 0.6);\r
    }\r
\r
    float detail = snoise2D(terrainUv * 40.0) * 0.05;\r
    surfaceColor += surfaceColor * detail;\r
\r
    float limb = smoothstep(-0.2, 0.8, normal.z);\r
    surfaceColor *= 0.4 + limb * 0.6;\r
\r
    return surfaceColor;\r
}\r
\r
// =============================================================================\r
// GAS GIANT SHADER\r
// =============================================================================\r
\r
vec3 renderGasGiant(vec2 uv, vec3 normal, vec3 baseColor, float seed) {\r
    float time = iTime;\r
    float latitude = uv.y;\r
\r
    float bandFreq = BAND_FREQ_BASE + seed * 6.0;\r
    float bands = sin(latitude * PI * bandFreq) * 0.5 + 0.5;\r
\r
    float turbulence = snoise2D(vec2(\r
        uv.x * 8.0 + time * 0.02 + seed * 10.0,\r
        latitude * 20.0\r
    )) * TURBULENCE_STRENGTH;\r
    bands += turbulence;\r
\r
    float smallBands = sin(latitude * PI * bandFreq * 3.0 + seed * 5.0) * 0.5 + 0.5;\r
    bands = mix(bands, smallBands * 0.3, 0.3);\r
\r
    vec2 stormCenter = vec2(fract(seed * 3.7), 0.4 + fract(seed * 2.3) * 0.3);\r
    float stormDist = length(uv - stormCenter);\r
    float stormSize = STORM_SIZE + fract(seed * 5.1) * 0.06;\r
    float storm = smoothstep(stormSize + 0.03, stormSize, stormDist);\r
\r
    vec2 storm2Center = vec2(fract(seed * 7.1 + 0.5), 0.3 + fract(seed * 4.7) * 0.4);\r
    float storm2 = smoothstep(0.05, 0.01, length(uv - storm2Center)) * 0.6;\r
\r
    vec3 hsv = rgb2hsv(baseColor);\r
    hsv.x = fract(hsv.x + (seed - 0.5) * 0.1);\r
    hsv.y = clamp(hsv.y * 1.4, 0.6, 1.0);\r
    hsv.z = clamp(hsv.z * 1.2, 0.5, 1.0);\r
    vec3 variedColor = hsv2rgb(hsv);\r
\r
    vec3 lightBand = variedColor * 1.4;\r
    vec3 darkBand = variedColor * vec3(0.5, 0.4, 0.35);\r
\r
    vec3 stormHsv = hsv;\r
    stormHsv.x = fract(stormHsv.x - 0.05);\r
    stormHsv.y = min(stormHsv.y * 1.3, 1.0);\r
    stormHsv.z *= 0.85;\r
    vec3 stormColor = hsv2rgb(stormHsv);\r
\r
    vec3 surfaceColor = mix(darkBand, lightBand, bands);\r
    surfaceColor = mix(surfaceColor, stormColor, storm + storm2);\r
\r
    float swirl = snoise2D(vec2(uv.x * 15.0 + time * 0.01, uv.y * 10.0 + seed * 20.0)) * 0.1;\r
    surfaceColor += surfaceColor * swirl;\r
\r
    float limb = smoothstep(-0.2, 0.8, normal.z);\r
    surfaceColor *= 0.4 + limb * 0.6;\r
\r
    return surfaceColor;\r
}\r
\r
// =============================================================================\r
// ICE GIANT SHADER\r
// =============================================================================\r
\r
vec3 renderIceGiant(vec2 uv, vec3 normal, vec3 baseColor, float seed) {\r
    float time = iTime;\r
    float latitude = uv.y;\r
\r
    vec3 hsv = rgb2hsv(baseColor);\r
    hsv.x = fract(hsv.x + (seed - 0.5) * 0.05);\r
    hsv.y = clamp(hsv.y * 1.5, 0.7, 1.0);\r
    hsv.z = clamp(hsv.z * 1.15, 0.5, 1.0);\r
    vec3 variedColor = hsv2rgb(hsv);\r
\r
    float bandFreq = 5.0 + seed * 4.0;\r
    float bandPattern = sin(latitude * PI * bandFreq + seed * 3.0) * 0.5 + 0.5;\r
    float bands = smoothstep(0.3, 0.7, bandPattern);\r
\r
    float flow = snoise2D(vec2(\r
        uv.x * 4.0 + time * 0.015 + seed * 5.0,\r
        latitude * 8.0\r
    )) * 0.2;\r
    bands += flow;\r
\r
    float haze = snoise2D(vec2(uv.x * 6.0 + time * 0.01, uv.y * 6.0 + seed * 10.0)) * 0.5 + 0.5;\r
    float hazeMask = smoothstep(0.4, 0.8, haze) * 0.3;\r
\r
    vec3 deepColor = variedColor * 0.7;\r
    vec3 brightColor = variedColor * 1.2;\r
    vec3 hazeColor = vec3(0.8, 0.9, 1.0);\r
\r
    vec3 atmosphereColor = mix(deepColor, brightColor, bands);\r
\r
    float methane = snoise2D(vec2(uv.x * 3.0 + seed * 7.0, uv.y * 5.0 + time * 0.005)) * 0.5 + 0.5;\r
    vec3 methaneTint = vec3(0.7, 0.9, 1.1);\r
    atmosphereColor *= mix(vec3(1.0), methaneTint, methane * 0.3);\r
\r
    atmosphereColor = mix(atmosphereColor, hazeColor * variedColor, hazeMask);\r
\r
    vec2 spotCenter = vec2(0.3 + fract(seed * 4.3) * 0.4, 0.4 + fract(seed * 2.7) * 0.3);\r
    float spotDist = length(uv - spotCenter);\r
    float spotSize = 0.05 + fract(seed * 6.1) * 0.08;\r
    float spotMask = smoothstep(spotSize + 0.04, spotSize, spotDist);\r
    atmosphereColor *= (1.0 - spotMask * 0.4);\r
\r
    float limb = smoothstep(-0.3, 0.7, normal.z);\r
    atmosphereColor *= 0.3 + limb * 0.7;\r
\r
    float edgeGlow = 1.0 - abs(normal.z);\r
    edgeGlow = pow(edgeGlow, 3.0) * 0.2;\r
    atmosphereColor += variedColor * edgeGlow;\r
\r
    return atmosphereColor;\r
}\r
\r
// =============================================================================\r
// 3D RAY-SPHERE INTERSECTION\r
// =============================================================================\r
\r
float intersectSphere3D(vec3 rayOrigin, vec3 rayDir, vec3 sphereCenter, float radius) {\r
    vec3 oc = rayOrigin - sphereCenter;\r
    float b = dot(oc, rayDir);\r
    float c = dot(oc, oc) - radius * radius;\r
    float h = b * b - c;\r
\r
    if (h < 0.0) return -1.0;\r
\r
    h = sqrt(h);\r
    float t = -b - h;\r
\r
    if (t < 0.0) t = -b + h;\r
    if (t < 0.0) return -1.0;\r
\r
    return t;\r
}\r
\r
void getSphereInfo(vec3 hitPoint, vec3 sphereCenter, out vec3 normal, out vec2 sphereUv) {\r
    normal = normalize(hitPoint - sphereCenter);\r
    float latitude = 0.5 + asin(normal.y) / PI;\r
    float longitude = 0.5 + atan(normal.x, normal.z) / (2.0 * PI);\r
    sphereUv = vec2(longitude, latitude);\r
}\r
\r
// =============================================================================\r
// CAMERA UTILITIES\r
// =============================================================================\r
\r
mat3 rotateY(float angle) {\r
    float c = cos(angle);\r
    float s = sin(angle);\r
    return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);\r
}\r
\r
mat3 rotateX(float angle) {\r
    float c = cos(angle);\r
    float s = sin(angle);\r
    return mat3(1.0, 0.0, 0.0, 0.0, c, s, 0.0, -s, c);\r
}\r
\r
mat3 setCamera(vec3 ro, vec3 ta) {\r
    vec3 cw = normalize(ta - ro);\r
    vec3 cp = vec3(0.0, 1.0, 0.0);\r
    vec3 cu = normalize(cross(cw, cp));\r
    vec3 cv = cross(cu, cw);\r
    return mat3(cu, cv, cw);\r
}\r
\r
// =============================================================================\r
// MAIN IMAGE\r
// =============================================================================\r
\r
void mainImage(out vec4 fragColor, in vec2 fragCoord) {\r
    vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;\r
\r
    // =========================================================================\r
    // CAMERA SETUP - Mouse controls orbit\r
    // =========================================================================\r
\r
    vec2 mouse;\r
    if (iMouse.z > 0.0) {\r
        mouse = iMouse.xy / iResolution.xy;\r
    } else {\r
        float lastY = (iMouse.xy == vec2(0.0)) ? 0.5 : iMouse.y / iResolution.y;\r
        mouse = vec2(fract(iTime * 0.03), lastY);\r
    }\r
\r
    float angleY = (mouse.x - 0.5) * PI * 2.0;\r
    float angleX = (mouse.y - 0.5) * PI * 0.8;\r
    angleX = clamp(angleX, -PI * 0.4, PI * 0.4);\r
\r
    vec3 target = vec3(0.0, 0.0, 0.0);\r
    vec3 cameraPos = vec3(0.0, 0.0, CAMERA_DISTANCE);\r
\r
    cameraPos = rotateX(angleX) * cameraPos;\r
    cameraPos = rotateY(angleY) * cameraPos;\r
\r
    mat3 cameraMat = setCamera(cameraPos, target);\r
    vec3 rayDir = cameraMat * normalize(vec3(uv, CAMERA_FOV));\r
    vec3 rayOrigin = cameraPos;\r
\r
    // =========================================================================\r
    // STAR TEMPERATURE - Click to cycle through spectral types\r
    // =========================================================================\r
\r
    // Use click count to cycle through temperatures\r
    // Temperature cycles: Y-dwarf (400K) -> M -> K -> G -> F -> A -> O (25000K)\r
    float tempIndex = mod(floor(iTime * 0.1), 8.0); // Auto-cycle slowly, or use mouse\r
\r
    // If mouse has been clicked, use position to select temperature\r
    if (iMouse.z > 0.0 || iMouse.w > 0.0) {\r
        tempIndex = floor(mouse.x * 8.0);\r
    }\r
\r
    float starTemperature;\r
    if (tempIndex < 1.0) {\r
        starTemperature = 400.0;   // Y-dwarf (purple)\r
    } else if (tempIndex < 2.0) {\r
        starTemperature = 800.0;   // T-dwarf (magenta)\r
    } else if (tempIndex < 3.0) {\r
        starTemperature = 2500.0;  // M-dwarf (red)\r
    } else if (tempIndex < 4.0) {\r
        starTemperature = 4000.0;  // K-dwarf (orange)\r
    } else if (tempIndex < 5.0) {\r
        starTemperature = 5778.0;  // G-type Sun (yellow)\r
    } else if (tempIndex < 6.0) {\r
        starTemperature = 7500.0;  // F-type (white)\r
    } else if (tempIndex < 7.0) {\r
        starTemperature = 10000.0; // A-type (blue-white)\r
    } else {\r
        starTemperature = 25000.0; // O/B-type (blue)\r
    }\r
\r
    vec3 starColor = temperatureToColor(starTemperature);\r
\r
    // Normalize star color to prevent washout\r
    float maxComp = max(starColor.r, max(starColor.g, starColor.b));\r
    if (maxComp > 0.01) {\r
        starColor = starColor / maxComp * 0.85;\r
    }\r
\r
    float activityLevel = 0.7;\r
    float starSeed = 42.0;\r
\r
    // =========================================================================\r
    // SCENE RENDERING\r
    // =========================================================================\r
\r
    // Background - pure black space\r
    vec3 color = vec3(0.0);\r
\r
    // Procedural star field\r
    vec3 starFieldDir = rayDir;\r
    float stars = snoise3D(starFieldDir * 80.0);\r
    if (stars > 0.94) {\r
        float brightness = smoothstep(0.94, 1.0, stars);\r
        color += vec3(brightness * 0.5);\r
    }\r
\r
    // Planet seeds\r
    float rockySeed = 0.3;\r
    float gasSeed = 0.6;\r
    float iceSeed = 0.8;\r
\r
    float closestHit = 1e10;\r
    vec3 hitColor = color;\r
\r
    // -------------------------------------------------------------------------\r
    // STAR EFFECTS (rendered behind star surface)\r
    // -------------------------------------------------------------------------\r
\r
    // Outer glow\r
    color += renderOuterGlow3D(rayOrigin, rayDir, STAR_CENTER, STAR_RADIUS, starColor);\r
\r
    // Star rays\r
    color += renderStarRays3D(rayOrigin, rayDir, STAR_CENTER, STAR_RADIUS,\r
                              starColor, activityLevel, starSeed);\r
\r
    // Corona flames\r
    color += renderCorona3D(rayOrigin, rayDir, STAR_CENTER, STAR_RADIUS,\r
                            starColor, activityLevel, starSeed);\r
\r
    // -------------------------------------------------------------------------\r
    // STAR SURFACE\r
    // -------------------------------------------------------------------------\r
    float starDist = intersectSphere3D(rayOrigin, rayDir, STAR_CENTER, STAR_RADIUS);\r
\r
    if (starDist > 0.0 && starDist < closestHit) {\r
        closestHit = starDist;\r
\r
        vec3 hitPoint = rayOrigin + rayDir * starDist;\r
        vec3 starNormal;\r
        vec2 starUv;\r
        getSphereInfo(hitPoint, STAR_CENTER, starNormal, starUv);\r
\r
        vec3 spherePos = normalize(hitPoint - STAR_CENTER);\r
        hitColor = renderStarSurface(spherePos, starNormal, rayDir, starColor, activityLevel, starSeed);\r
    }\r
\r
    // -------------------------------------------------------------------------\r
    // ROCKY PLANET\r
    // -------------------------------------------------------------------------\r
    float rockyDist = intersectSphere3D(rayOrigin, rayDir, ROCKY_CENTER, ROCKY_RADIUS);\r
\r
    if (rockyDist > 0.0 && rockyDist < closestHit) {\r
        closestHit = rockyDist;\r
\r
        vec3 hitPoint = rayOrigin + rayDir * rockyDist;\r
        vec3 planetNormal;\r
        vec2 planetUv;\r
        getSphereInfo(hitPoint, ROCKY_CENTER, planetNormal, planetUv);\r
\r
        vec3 viewNormal = planetNormal;\r
        viewNormal.z = dot(planetNormal, -rayDir);\r
\r
        vec3 planetColor = renderRockyPlanet(planetUv, viewNormal, ROCKY_COLOR, rockySeed, 300.0);\r
\r
        vec3 lightDir = normalize(STAR_CENTER - hitPoint);\r
        float diffuse = max(dot(planetNormal, lightDir), 0.0);\r
        float ambient = 0.12;\r
        float shadow = (intersectSphere3D(hitPoint + planetNormal * 0.01, lightDir, STAR_CENTER, STAR_RADIUS) > 0.0) ? 1.0 : 0.0;\r
\r
        hitColor = planetColor * (ambient + diffuse * 0.88 * shadow);\r
        hitColor += starColor * pow(1.0 - max(dot(viewNormal, vec3(0.0, 0.0, 1.0)), 0.0), 3.0) * 0.15;\r
    }\r
\r
    // -------------------------------------------------------------------------\r
    // GAS GIANT\r
    // -------------------------------------------------------------------------\r
    float gasDist = intersectSphere3D(rayOrigin, rayDir, GAS_CENTER, GAS_RADIUS);\r
\r
    if (gasDist > 0.0 && gasDist < closestHit) {\r
        closestHit = gasDist;\r
\r
        vec3 hitPoint = rayOrigin + rayDir * gasDist;\r
        vec3 planetNormal;\r
        vec2 planetUv;\r
        getSphereInfo(hitPoint, GAS_CENTER, planetNormal, planetUv);\r
\r
        vec3 viewNormal = planetNormal;\r
        viewNormal.z = dot(planetNormal, -rayDir);\r
\r
        vec3 planetColor = renderGasGiant(planetUv, viewNormal, GAS_GIANT_COLOR, gasSeed);\r
\r
        vec3 lightDir = normalize(STAR_CENTER - hitPoint);\r
        float diffuse = max(dot(planetNormal, lightDir), 0.0);\r
        float ambient = 0.1;\r
        float shadow = (intersectSphere3D(hitPoint + planetNormal * 0.01, lightDir, STAR_CENTER, STAR_RADIUS) > 0.0) ? 1.0 : 0.0;\r
\r
        hitColor = planetColor * (ambient + diffuse * 0.9 * shadow);\r
        hitColor += starColor * pow(1.0 - max(dot(viewNormal, vec3(0.0, 0.0, 1.0)), 0.0), 3.0) * 0.2;\r
    }\r
\r
    // -------------------------------------------------------------------------\r
    // ICE GIANT\r
    // -------------------------------------------------------------------------\r
    float iceDist = intersectSphere3D(rayOrigin, rayDir, ICE_CENTER, ICE_RADIUS);\r
\r
    if (iceDist > 0.0 && iceDist < closestHit) {\r
        closestHit = iceDist;\r
\r
        vec3 hitPoint = rayOrigin + rayDir * iceDist;\r
        vec3 planetNormal;\r
        vec2 planetUv;\r
        getSphereInfo(hitPoint, ICE_CENTER, planetNormal, planetUv);\r
\r
        vec3 viewNormal = planetNormal;\r
        viewNormal.z = dot(planetNormal, -rayDir);\r
\r
        vec3 planetColor = renderIceGiant(planetUv, viewNormal, ICE_GIANT_COLOR, iceSeed);\r
\r
        vec3 lightDir = normalize(STAR_CENTER - hitPoint);\r
        float diffuse = max(dot(planetNormal, lightDir), 0.0);\r
        float ambient = 0.08;\r
        float shadow = (intersectSphere3D(hitPoint + planetNormal * 0.01, lightDir, STAR_CENTER, STAR_RADIUS) > 0.0) ? 1.0 : 0.0;\r
\r
        hitColor = planetColor * (ambient + diffuse * 0.92 * shadow);\r
        hitColor += ICE_GIANT_COLOR * pow(1.0 - max(dot(viewNormal, vec3(0.0, 0.0, 1.0)), 0.0), 2.5) * 0.25;\r
    }\r
\r
    // Use hit color if we hit something\r
    if (closestHit < 1e9) {\r
        color = hitColor;\r
    }\r
\r
    // =========================================================================\r
    // POST PROCESSING\r
    // =========================================================================\r
\r
    // Tone mapping (Reinhard)\r
    color = color / (color + vec3(1.0));\r
\r
    // Vignette\r
    float vignette = 1.0 - dot(uv * 0.4, uv * 0.4) * 0.4;\r
    color *= vignette;\r
\r
    // Gamma correction\r
    color = pow(color, vec3(1.0 / 2.2));\r
\r
    fragColor = vec4(color, 1.0);\r
}\r
`},channels:{}},{slug:"genuary31",title:"Genuary 2026 Day 31: GLSL Day",description:"Raymarched triangular grid terrain with Sierpinski fractal sky dome, raytraced black hole with gravitational lensing and accretion disk, bird flocks, and Matrix rain overlay with scanlines.",date:"2026-01-31",tags:["genuary","raymarching","3d"],links:{},screenshotUrl:hf,passes:{image:`/**\r
 * Genuary 2026 Day 31: GLSL Day\r
 * @author guinetik\r
 * @date 2026-01-31\r
 *\r
 * Synthwave terrain with Sierpinski fractal sky and Black Hole.\r
 * A kitchen-sink shader combining multiple techniques as a Genuary finale:\r
 * raymarched triangular-grid terrain, Sierpinski-triangle sky dome,\r
 * raytraced black hole with gravitational lensing and accretion disk,\r
 * animated bird flocks, and a Matrix-rain glyph overlay.\r
 *\r
 * Features:\r
 * - Raymarched triangular grid terrain with dramatic peaks and canyon\r
 * - Terminal green color palette throughout\r
 * - Sierpinski triangle pattern projected onto the sky dome\r
 * - Raytraced black hole with gravitational lensing and accretion disk\r
 * - Bird flocks flying across the sky in periodic waves\r
 * - Mouse-controlled camera rotation (yaw/pitch)\r
 * - Matrix rain overlay with procedural katakana-like glyphs\r
 * - Scanline and vignette post-processing\r
 *\r
 * Based on "another synthwave sunset thing" by stduhpf\r
 * Original: https://www.shadertoy.com/view/tsScRK\r
 *\r
 * @project Genuary 2026\r
 * @see https://genuary2026.guinetik.com\r
 */\r
\r
// ============================================\r
// CONSTANTS\r
// ============================================\r
#define PI 3.1415927\r
\r
// ============================================\r
// CONFIGURATION - Tweak these!\r
// ============================================\r
\r
// Camera\r
#define CAM_SPEED 10.0            // Forward travel speed — higher = faster flythrough.\r
#define CAM_HEIGHT 1.5            // Camera altitude above terrain — raise to see more terrain.\r
#define CAM_START_Z 20000.0       // Starting Z offset — large value avoids terrain edge artifacts at start.\r
#define CAM_YAW_SENS 0.8          // Mouse-X sensitivity for horizontal camera rotation.\r
#define CAM_PITCH_SENS 0.08       // Mouse-Y sensitivity for vertical camera tilt.\r
#define CAM_VIEW_OFFSET 0.15      // Vertical UV offset — tilts default view slightly downward.\r
#define CAM_FOV 1.333             // 4/3 aspect FOV factor — higher = narrower field of view.\r
\r
// Terrain\r
#define TERRAIN_HEIGHT 3.0        // Peak terrain height from triangular noise.\r
#define TERRAIN_WAVE_FREQ 0.15    // Frequency of rolling wave ridges along Z — higher = tighter waves.\r
#define TERRAIN_WAVE_SPEED 2.0    // Speed of wave ridge animation — higher = faster rolling.\r
#define TERRAIN_WAVE_AMP 0.3      // Amplitude of rolling waves — higher = taller ridges.\r
#define TERRAIN_WAVE_FADE 5.0     // X-distance at which waves fade in — prevents center canyon disruption.\r
#define TERRAIN_CANYON_WIDTH 0.02  // Gaussian width of the central canyon — smaller = narrower canyon.\r
#define TERRAIN_CANYON_DEPTH 0.8   // Depth of the central canyon groove.\r
#define TERRAIN_SPIKE_FREQ 0.5    // How often spike formations repeat along Z.\r
#define TERRAIN_SPIKE_PERIOD 8.0  // Period of spike repetition pattern.\r
#define TERRAIN_SPIKE_HEIGHT 1.5  // Maximum height of dramatic spike peaks.\r
\r
// Grid\r
#define GRID_GLOW_THRESH 0.08     // Distance from triangle edge where glow activates — wider = thicker lines.\r
#define GRID_PULSE_SPEED 3.0      // Speed of the grid brightness pulsing.\r
#define GRID_PULSE_SCALE 0.1      // Spatial frequency of the pulse wave along Z.\r
#define GRID_COLOR vec3(0.0, 1.0, 0.3)       // Bright neon green grid line color.\r
#define GRID_GLOW_COLOR vec3(0.0, 0.4, 0.15) // Softer green for the grid bloom/glow halo.\r
\r
// Raymarching\r
#define MARCH_MAX_ITER 500        // Maximum raymarch iterations — higher = more detail but slower.\r
#define MARCH_STEP_MULT 0.5       // Step size multiplier (relaxation) — 0.5 is conservative/safe,\r
                                  // 0.8+ is faster but may cause surface artifacts.\r
#define MARCH_HIT_THRESH 0.003    // Surface hit threshold — smaller = more precise but more iterations.\r
#define MARCH_MAX_DIST 150.0      // Maximum ray travel distance before giving up.\r
#define MARCH_MAX_Y 4.0           // Y height above which aggressive stepping is used (above terrain).\r
\r
// Sky (Sierpinski fractal dome)\r
#define SKY_LAYER1_SCALE 60.0     // Scale of the largest Sierpinski layer — smaller = bigger triangles.\r
#define SKY_LAYER2_SCALE 120.0    // Medium Sierpinski layer scale.\r
#define SKY_LAYER3_SCALE 200.0    // Finest Sierpinski layer scale.\r
#define SKY_DRIFT_SPEED vec2(2.0, 1.5)    // Drift velocity of fractal layers across the sky dome.\r
#define SKY_PATTERN_INTENSITY 0.38         // Brightness of the Sierpinski pattern — 0 = invisible, 1 = full.\r
#define SKY_BG_COLOR vec3(0.0, 0.10, 0.03) // Deep green-black sky background.\r
#define SKY_HAZE_COLOR vec3(0.0, 0.22, 0.07)   // Horizon haze color — green-tinged fog.\r
#define SKY_PATTERN_COLOR vec3(0.1, 0.55, 0.22) // Color of the Sierpinski fractal triangles.\r
\r
// Black hole\r
#define BH_POSITION vec2(0.5, 0.5)   // Screen-space position of the black hole (0-1 range).\r
#define BH_SIZE 0.08                  // Visual size scaling — smaller = smaller black hole on screen.\r
#define BH_CAM_DIST 2.0              // Camera distance from the black hole center.\r
#define BH_CAM_ANGLE 0.48            // Camera elevation angle (multiplied by PI) — ~86 deg from pole.\r
#define BH_EVENT_HORIZON 0.1         // Radius of the event horizon — light inside is fully captured.\r
#define BH_GRAVITY 0.005             // Gravitational lensing strength — higher = more bending.\r
#define BH_STEP_SIZE 0.02            // Base integration step for light ray bending.\r
#define BH_DISK_OUTER vec3(0.1, 0.5, 0.2)  // Outer accretion disk color (cooler, green-tinted).\r
#define BH_DISK_INNER vec3(0.4, 1.0, 0.6)  // Inner accretion disk color (hotter, bright green).\r
#define BH_GLOW_COLOR vec3(0.3, 1.0, 0.5)  // Point-source glow around the singularity.\r
#define BH_COUNTER_YAW 0.7           // Counter-rotation factor to keep BH fixed when camera pans.\r
#define BH_COUNTER_PITCH 0.06        // Counter-pitch factor for vertical camera movement.\r
\r
// Birds\r
#define BIRD_FLOCK_COUNT 4.0     // Number of independent bird flocks.\r
#define BIRD_FLOCK_OFFSET 6.0    // Time offset between flock appearances (seconds).\r
#define BIRD_CYCLE_TIME 25.0     // Full cycle duration (active + rest) per flock.\r
#define BIRD_ACTIVE_TIME 18.0    // How long a flock is visible during its cycle.\r
#define BIRD_SIZE 12.0           // Wingspan in pixels — larger = bigger birds.\r
#define BIRD_LINE_THICK 1.5      // Stroke thickness of the V-shaped bird silhouette.\r
#define BIRD_Y_MIN 0.55          // Minimum normalized Y position for flock path.\r
#define BIRD_Y_RANGE 0.30        // Range of vertical variation for flock paths.\r
#define BIRD_COUNT_MIN 6.0       // Minimum birds per flock.\r
#define BIRD_COUNT_RANGE 7.0     // Random range added to min — so 6 to 13 birds per flock.\r
#define BIRD_SPREAD_X 80.0       // Horizontal scatter of birds within a flock (pixels).\r
#define BIRD_SPREAD_Y 50.0       // Vertical scatter of birds within a flock (pixels).\r
#define BIRD_WING_SPEED 12.0     // Wing flapping frequency — higher = faster flapping.\r
#define BIRD_COLOR vec3(0.1, 0.9, 0.4) // Bird silhouette color (bright green to match theme).\r
\r
// Matrix rain (Quine style)\r
#define MATRIX_CYCLE 30.0        // Full cycle time — rain triggers once per cycle.\r
#define MATRIX_BURST 5.0         // Duration of the initial burst window when new drops start.\r
#define MATRIX_CELL_W 11.0       // Width of each character cell in pixels.\r
#define MATRIX_CELL_H 18.0       // Height of each character cell in pixels.\r
#define MATRIX_DENSITY 0.35      // Fraction of columns that are active — 0.35 = 35% have rain.\r
#define MATRIX_DELAY_MAX 2.5     // Max random start delay for staggered drops (seconds).\r
#define MATRIX_TICK 0.07         // Time per discrete drop step — smaller = faster rain.\r
#define MATRIX_TAIL_MIN 25.0     // Minimum tail length in character rows.\r
#define MATRIX_TAIL_RANGE 25.0   // Random additional tail length — so 25 to 50 rows.\r
#define MATRIX_HEAD_COLOR vec3(0.95, 1.0, 0.98)  // Bright white-green head of each rain drop.\r
#define MATRIX_HEAD_GLOW 0.4     // Bloom intensity around the leading character.\r
#define MATRIX_TAIL_COLOR vec3(0.0, 0.85, 0.35)  // Classic Matrix green for the trailing tail.\r
#define MATRIX_BG_FLICKER 0.02   // Probability of a random background glyph flickering on.\r
#define MATRIX_CHAR_CHANGE 15.0  // Speed of character mutation — higher = glyphs change faster.\r
\r
// Post-processing\r
#define SCANLINE_MIN 0.95        // Minimum brightness in scanline troughs — 1.0 = no scanlines.\r
#define SCANLINE_RANGE 0.05      // Amplitude of scanline brightness variation.\r
#define SCANLINE_FREQ 2.0        // Spatial frequency of scanlines — higher = tighter lines.\r
#define VIGNETTE_STRENGTH 0.5    // Corner darkening intensity — 0 = off, 1 = heavy.\r
\r
// Terrain colors\r
#define TERRAIN_BASE_COLOR vec3(0.0, 0.12, 0.05)  // Base terrain diffuse color (dark green).\r
#define FOG_DECAY vec3(0.2, 0.08, 0.25)           // Per-channel exponential fog falloff rates.\r
                                                    // Lower = fog extends farther in that channel.\r
\r
// ============================================\r
// GLOBALS\r
// ============================================\r
float jTime;\r
\r
// ============================================\r
// FORWARD DECLARATIONS\r
// ============================================\r
// Utilities\r
float amp(vec2 p);\r
float pow512(float a);\r
float pow1d5(float a);\r
float bhHash(vec2 p);\r
float fbmNoise(vec2 p);\r
float hash21(vec2 co);\r
float hash(vec2 uv);\r
float edgeMin(float dx, vec2 da, vec2 db, vec2 uv);\r
vec2 trinoise(vec2 uv);\r
\r
// SDFs\r
float sdfSphere(vec3 p, float radius);\r
float sdfTorus(vec3 p, vec2 t);\r
\r
// Raymarching\r
vec2 map(vec3 p);\r
vec3 grad(vec3 p);\r
vec2 intersect(vec3 ro, vec3 rd);\r
\r
// Sky\r
float sierpinski(vec2 p, float iterations);\r
float sierpinskiSky(vec3 rd, float time);\r
vec3 gsky(vec3 rd, vec3 ld, bool mask);\r
\r
// Black hole\r
vec4 renderBlackHole(vec2 screenPos, float time);\r
\r
// Birds\r
float birdShape(vec2 p, float angle, float wingFlap);\r
vec3 renderBirds(vec2 fragCoord, vec2 resolution, float time);\r
\r
// Matrix rain\r
float matrixGlyph(vec2 uv, float seed);\r
vec3 renderMatrix(vec2 fragCoord, vec2 resolution, float time);\r
\r
// ============================================\r
// MAIN IMAGE\r
// ============================================\r
void mainImage(out vec4 fragColor, in vec2 fragCoord) {\r
    vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;\r
\r
    const float shutter_speed = 0.25;\r
    float dt = fract(hash21(fragCoord) + iTime) * shutter_speed;\r
    jTime = mod(iTime - dt * 0.016, 4000.0);\r
\r
    // Mouse interaction: camera control\r
    vec2 mouse = vec2(0.0);\r
    if (iMouse.z > 0.0) {\r
        mouse = (iMouse.xy / iResolution.xy) * 2.0 - 1.0;\r
    }\r
    float camYaw = mouse.x * CAM_YAW_SENS;\r
    float camPitch = mouse.y * CAM_PITCH_SENS;\r
\r
    // Camera position\r
    vec3 ro = vec3(0.0, CAM_HEIGHT, (-CAM_START_Z + jTime * CAM_SPEED));\r
\r
    // Ray direction with view offset\r
    vec2 viewUV = uv;\r
    viewUV.y += CAM_VIEW_OFFSET;\r
    vec3 rd = normalize(vec3(viewUV, CAM_FOV));\r
\r
    // Apply camera rotation\r
    float cy = cos(camYaw), sy = sin(camYaw);\r
    rd.xz = mat2(cy, -sy, sy, cy) * rd.xz;\r
    float cp = cos(camPitch), sp = sin(camPitch);\r
    rd.yz = mat2(cp, -sp, sp, cp) * rd.yz;\r
\r
    // Raymarching\r
    vec2 i = intersect(ro, rd);\r
    float d = i.x;\r
\r
    // Lighting\r
    vec3 ld = normalize(vec3(0.0, 0.125 + 0.05 * sin(0.1 * jTime), 1.0));\r
\r
    // Fog and sky\r
    vec3 fog = d > 0.0 ? exp2(-d * FOG_DECAY) : vec3(0.0);\r
    vec3 sky = gsky(rd, ld, d < 0.0);\r
\r
    // Terrain shading\r
    vec3 p = ro + d * rd;\r
    vec3 n = normalize(grad(p));\r
    float diff = dot(n, ld) + 0.1 * n.y;\r
    vec3 col = TERRAIN_BASE_COLOR * diff;\r
\r
    // Reflection\r
    vec3 rfd = reflect(rd, n);\r
    vec3 rfcol = gsky(rfd, ld, true);\r
    col = mix(col, rfcol, 0.05 + 0.95 * pow(max(1.0 + dot(rd, n), 0.0), 5.0));\r
\r
    // Grid lines glow - with pulsing intensity\r
    float gridGlow = smoothstep(GRID_GLOW_THRESH, 0.0, i.y);\r
    float gridPulse = 0.7 + 0.3 * sin(jTime * GRID_PULSE_SPEED + p.z * GRID_PULSE_SCALE);\r
    col = mix(col, GRID_COLOR * gridPulse, gridGlow);\r
    col += GRID_GLOW_COLOR * gridGlow * gridGlow * gridPulse;\r
    col = mix(sky, col, fog);\r
\r
    // Bird flocks\r
    col += renderBirds(fragCoord, iResolution.xy, jTime);\r
\r
    // Post-processing: scanlines\r
    col *= SCANLINE_MIN + SCANLINE_RANGE * sin(fragCoord.y * SCANLINE_FREQ);\r
\r
    // Post-processing: vignette\r
    vec2 vUv = fragCoord / iResolution.xy;\r
    float vig = 1.0 - length(vUv - 0.5) * VIGNETTE_STRENGTH;\r
    col *= vig;\r
\r
    // Black hole overlay (counter-rotated to stay fixed)\r
    vec2 bhScreenPos = uv;\r
    bhScreenPos.x += mouse.x * BH_COUNTER_YAW;\r
    bhScreenPos.y += mouse.y * BH_COUNTER_PITCH;\r
    vec4 bh = renderBlackHole(bhScreenPos, jTime);\r
    float bhAlpha = d < 0.0 ? bh.a : 0.0;\r
    col = mix(col, bh.rgb, bhAlpha);\r
\r
    // Matrix rain overlay\r
    col += renderMatrix(fragCoord, iResolution.xy, jTime);\r
\r
    fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);\r
}\r
\r
// ============================================\r
// UTILITY FUNCTIONS\r
// ============================================\r
float amp(vec2 p) {\r
    return smoothstep(1.0, 8.0, abs(p.x));\r
}\r
\r
float pow512(float a) {\r
    a *= a; a *= a; a *= a; a *= a;\r
    a *= a; a *= a; a *= a; a *= a;\r
    return a * a;\r
}\r
\r
float pow1d5(float a) {\r
    return a * sqrt(abs(a));\r
}\r
\r
float bhHash(vec2 p) {\r
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);\r
}\r
\r
float fbmNoise(vec2 p) {\r
    float total = 0.0;\r
    float amplitude = 1.0;\r
    for (int i = 0; i < 4; i++) {\r
        total += amplitude * bhHash(p);\r
        p *= 2.0;\r
        amplitude *= 0.5;\r
    }\r
    return total;\r
}\r
\r
float hash21(vec2 co) {\r
    return fract(sin(dot(co.xy, vec2(1.9898, 7.233))) * 45758.5433);\r
}\r
\r
float hash(vec2 uv) {\r
    float a = amp(uv);\r
    if (a <= 0.0) return 0.0;\r
    float h = hash21(uv);\r
    float h2 = hash21(uv * 0.5 + vec2(17.3, 31.7));\r
    float h3 = hash21(uv * 0.25 + vec2(53.1, 97.2));\r
    float combined = h * 0.5 + h2 * 0.3 + h3 * 0.2;\r
    combined = pow(max(combined, 0.0), 0.8);\r
    return a * pow1d5(combined) * 1.2;\r
}\r
\r
float edgeMin(float dx, vec2 da, vec2 db, vec2 uv) {\r
    uv.x += 5.0;\r
    vec3 c = fract((floor(vec3(uv, uv.x + uv.y) + 0.5)) * (vec3(0, 1, 2) + 0.61803398875));\r
    return min(min((1.0 - dx) * db.y, da.x), da.y);\r
}\r
\r
vec2 trinoise(vec2 uv) {\r
    const float sq = sqrt(3.0 / 2.0);\r
    uv.x *= sq;\r
    uv.y -= 0.5 * uv.x;\r
    vec2 d = fract(uv);\r
    uv -= d;\r
    bool c = dot(d, vec2(1)) > 1.0;\r
    vec2 dd = 1.0 - d;\r
    vec2 da = c ? dd : d;\r
    vec2 db = c ? d : dd;\r
    float nn = hash(uv + float(c));\r
    float n2 = hash(uv + vec2(1, 0));\r
    float n3 = hash(uv + vec2(0, 1));\r
    float nmid = mix(n2, n3, d.y);\r
    float ns = mix(nn, c ? n2 : n3, da.y);\r
    float dx = da.x / db.y;\r
    return vec2(mix(ns, nmid, dx), edgeMin(dx, da, db, uv + d));\r
}\r
\r
// ============================================\r
// SDFs\r
// ============================================\r
float sdfSphere(vec3 p, float radius) {\r
    return length(p) - radius;\r
}\r
\r
float sdfTorus(vec3 p, vec2 t) {\r
    vec2 q = vec2(length(p.xz) - t.x, p.y);\r
    return length(q) - t.y;\r
}\r
\r
// ============================================\r
// RAYMARCHING\r
// ============================================\r
vec2 map(vec3 p) {\r
    vec2 n = trinoise(p.xz);\r
\r
    // Base terrain height\r
    float h = n.x * TERRAIN_HEIGHT;\r
\r
    // Add rolling wave ridges that travel forward\r
    float waveZ = p.z * TERRAIN_WAVE_FREQ + jTime * TERRAIN_WAVE_SPEED;\r
    float wave = sin(waveZ) * TERRAIN_WAVE_AMP;\r
    wave *= smoothstep(0.0, TERRAIN_WAVE_FADE, abs(p.x));\r
\r
    // Pulsing central canyon - deeper in the middle\r
    float canyon = exp(-p.x * p.x * TERRAIN_CANYON_WIDTH) * TERRAIN_CANYON_DEPTH;\r
\r
    // Dramatic spikes at certain intervals\r
    float spikeDist = abs(mod(p.z * TERRAIN_SPIKE_FREQ, TERRAIN_SPIKE_PERIOD) - TERRAIN_SPIKE_PERIOD * 0.5);\r
    float spike = smoothstep(1.0, 0.0, spikeDist) * smoothstep(3.0, 6.0, abs(p.x));\r
    spike *= (0.5 + 0.5 * sin(p.z * 0.2)) * TERRAIN_SPIKE_HEIGHT;\r
\r
    // Combine: terrain + waves + canyon depth + spikes\r
    h = h + wave + spike - canyon;\r
\r
    return vec2(p.y - h, n.y);\r
}\r
\r
vec3 grad(vec3 p) {\r
    const vec2 e = vec2(0.005, 0);\r
    float a = map(p).x;\r
    return vec3(\r
        map(p + e.xyy).x - a,\r
        map(p + e.yxy).x - a,\r
        map(p + e.yyx).x - a\r
    ) / e.x;\r
}\r
\r
vec2 intersect(vec3 ro, vec3 rd) {\r
    float d = 0.0, h = 0.0;\r
\r
    // Early-out: if looking up and starting above terrain, skip entirely\r
    if (rd.y > 0.1 && ro.y > 2.0) return vec2(-1);\r
\r
    for (int i = 0; i < MARCH_MAX_ITER; i++) {\r
        vec3 p = ro + d * rd;\r
\r
        // Aggressive early-out when above terrain and ray going up\r
        if (p.y > MARCH_MAX_Y) {\r
            if (rd.y > 0.0) return vec2(-1);  // Looking up = sky\r
            // Looking down from high = use bigger steps\r
            d += (p.y - MARCH_MAX_Y) * 0.5;\r
            continue;\r
        }\r
\r
        vec2 s = map(p);\r
        h = s.x;\r
\r
        // Step with fixed multiplier\r
        d += h * MARCH_STEP_MULT;\r
\r
        // Hit threshold\r
        if (abs(h) < MARCH_HIT_THRESH) return vec2(d, s.y);\r
        if (d > MARCH_MAX_DIST) break;\r
    }\r
    return vec2(-1);\r
}\r
\r
// ============================================\r
// SIERPINSKI SKY\r
// ============================================\r
\r
// TECHNIQUE: Sierpinski carpet test\r
// For each scale level, check if the pixel falls in a "removed" quadrant\r
// (both x and y in the middle third). If so, the pixel is empty (0).\r
// Multiple scales layered together create the fractal sky dome pattern.\r
\r
float sierpinski(vec2 p, float iterations) {\r
    float filled = 1.0;\r
    for (float i = 0.0; i < 8.0; i++) {\r
        if (i >= iterations) break;\r
        float scale = pow(2.0, i);\r
        float mx = mod(floor(p.x / scale), 2.0);\r
        float my = mod(floor(p.y / scale), 2.0);\r
        if (mx > 0.5 && my > 0.5) {\r
            filled = 0.0;\r
            break;\r
        }\r
    }\r
    return filled;\r
}\r
\r
float sierpinskiSky(vec3 rd, float time) {\r
    vec2 skyUV = rd.xz / (abs(rd.y) + 0.3);\r
    vec2 drift = time * SKY_DRIFT_SPEED;\r
    float s1 = sierpinski(skyUV * SKY_LAYER1_SCALE + drift, 6.0);\r
    float s2 = sierpinski(skyUV * SKY_LAYER2_SCALE - drift * 0.7, 5.0);\r
    float s3 = sierpinski(skyUV * SKY_LAYER3_SCALE + vec2(drift.y, -drift.x) * 0.5, 4.0);\r
    float pattern = s1 * 0.5 + s2 * 0.3 + s3 * 0.2;\r
    float heightFade = smoothstep(0.05, 0.5, rd.y);\r
    float horizonFade = smoothstep(0.0, 0.12, abs(rd.y));\r
    return pattern * heightFade * horizonFade * SKY_PATTERN_INTENSITY;\r
}\r
\r
vec3 gsky(vec3 rd, vec3 ld, bool mask) {\r
    float haze = exp2(-5.0 * (abs(rd.y) - 0.2 * dot(rd, ld)));\r
    float sierpPattern = mask ? sierpinskiSky(rd, jTime) * (1.0 - min(haze * 0.5, 0.8)) : 0.0;\r
    vec3 back = SKY_BG_COLOR * (1.0 - 0.5 * exp2(-0.1 * abs(length(rd.xz) / rd.y)) * max(sign(rd.y), 0.0));\r
    vec3 patternColor = SKY_PATTERN_COLOR * sierpPattern;\r
    return clamp(mix(back, SKY_HAZE_COLOR, haze) + patternColor, 0.0, 1.0);\r
}\r
\r
// ============================================\r
// BLACK HOLE\r
// ============================================\r
\r
// TECHNIQUE: Gravitational lensing via ray deflection\r
// Light rays are stepped through space and deflected toward the black hole\r
// center by an inverse-square gravitational force. Rays that cross the\r
// event horizon are absorbed (captured). The accretion disk is rendered\r
// as a flattened torus with FBM-textured emissive color.\r
\r
vec4 renderBlackHole(vec2 screenPos, float time) {\r
    vec2 bhOffset = (BH_POSITION - 0.5) * 2.0;\r
    bhOffset.x *= iResolution.x / iResolution.y;\r
    screenPos -= bhOffset;\r
    screenPos *= 1.0 / (BH_SIZE * 15.0);\r
\r
    float cameraAngleH = PI * 0.5;\r
    float cameraAngleV = PI * BH_CAM_ANGLE;\r
\r
    vec3 cameraPos = vec3(\r
        BH_CAM_DIST * cos(cameraAngleH) * sin(cameraAngleV),\r
        BH_CAM_DIST * cos(cameraAngleV),\r
        BH_CAM_DIST * sin(cameraAngleH) * sin(cameraAngleV)\r
    );\r
\r
    vec3 target = vec3(0.0);\r
    vec3 forward = normalize(target - cameraPos);\r
    vec3 right = normalize(cross(vec3(0.0, 1.0, -0.1), forward));\r
    vec3 up = normalize(cross(forward, right));\r
    vec3 rayDir = normalize(forward * 1.5 + right * screenPos.x + up * screenPos.y);\r
\r
    vec3 bhPos = vec3(0.0);\r
    vec3 rayPos = cameraPos;\r
    vec3 rayVel = rayDir;\r
\r
    vec3 finalColor = vec3(0.0);\r
    float notCaptured = 1.0;\r
\r
    // 150 iterations with mild adaptive stepping (was 200 fixed)\r
    for (int i = 0; i < 150; i++) {\r
        vec3 toBH = bhPos - rayPos;\r
        float dist = length(toBH);\r
        float distanceSquared = dist * dist;\r
\r
        // Mild adaptive: 0.8x to 1.5x base step based on distance\r
        float adaptiveStep = BH_STEP_SIZE * mix(0.8, 1.5, smoothstep(0.2, 1.5, dist));\r
        rayPos += rayVel * adaptiveStep * notCaptured;\r
        rayVel += normalize(toBH) * (BH_GRAVITY / distanceSquared);\r
\r
        float distToHorizon = dist - BH_EVENT_HORIZON;\r
        notCaptured = smoothstep(0.0, 0.666, distToHorizon);\r
\r
        // Early exit only if fully captured\r
        if (notCaptured < 0.001) break;\r
\r
        float diskRadius = length(toBH.xz);\r
        float diskAngle = atan(toBH.x, toBH.z);\r
        vec2 diskUV = vec2(diskRadius, diskAngle * (0.01 + (diskRadius - BH_EVENT_HORIZON) * 0.002) + time * 0.1);\r
        diskUV *= vec2(10.0, 20.0);\r
\r
        float diskTexture = fbmNoise(diskUV * vec2(0.1, 0.5)) * 0.8 + 0.2;\r
        diskTexture += sin(diskUV.x * 3.0 + diskUV.y * 0.5 + time * 0.5) * 0.15;\r
\r
        float distFromBH = dist - BH_EVENT_HORIZON;\r
        vec3 diskColor = mix(BH_DISK_INNER, BH_DISK_OUTER, pow(max(distFromBH, 0.0), 2.0));\r
        diskColor *= max(0.0, diskTexture);\r
        diskColor *= 4.0 / (0.001 + distFromBH * 50.0);\r
\r
        vec3 flattenedPos = rayPos * vec3(1.0, 40.0, 1.0);\r
        float diskMask = smoothstep(0.0, 1.0, -sdfTorus(flattenedPos - bhPos, vec2(0.8, 0.99)));\r
\r
        finalColor += max(vec3(0.0), diskColor * diskMask * notCaptured);\r
        finalColor += BH_GLOW_COLOR * (1.0 / distanceSquared) * 0.002 * notCaptured;\r
    }\r
\r
    float alpha = min(1.0, length(finalColor) * 2.0 + (1.0 - notCaptured));\r
    return vec4(finalColor, alpha);\r
}\r
\r
// ============================================\r
// BIRD FLOCKS\r
// ============================================\r
float birdShape(vec2 p, float angle, float wingFlap) {\r
    float c = cos(-angle), s = sin(-angle);\r
    p = mat2(c, -s, s, c) * p;\r
    float wingY = BIRD_SIZE * (0.5 + wingFlap * 0.4);\r
    float d1 = abs(p.y - (p.x / BIRD_SIZE) * wingY) - BIRD_LINE_THICK;\r
    float d2 = abs(p.y + (p.x / BIRD_SIZE) * wingY) - BIRD_LINE_THICK;\r
    float wing = min(d1, d2);\r
    wing = max(wing, p.x);\r
    wing = max(wing, -p.x - BIRD_SIZE);\r
    return wing;\r
}\r
\r
vec3 renderBirds(vec2 fragCoord, vec2 resolution, float time) {\r
    vec3 col = vec3(0.0);\r
\r
    for (float flock = 0.0; flock < BIRD_FLOCK_COUNT; flock++) {\r
        float flockTime = mod(time + flock * BIRD_FLOCK_OFFSET, BIRD_CYCLE_TIME);\r
        if (flockTime > BIRD_ACTIVE_TIME) continue;\r
\r
        float flockSeed = flock * 7.31 + 0.5;\r
        float startSide = mod(flock, 2.0) < 1.0 ? 1.0 : -1.0;\r
\r
        float startYNorm = BIRD_Y_MIN + bhHash(vec2(flockSeed, 1.0)) * BIRD_Y_RANGE;\r
        float targetYNorm = BIRD_Y_MIN + bhHash(vec2(flockSeed, 2.0)) * BIRD_Y_RANGE;\r
\r
        float progress = flockTime / BIRD_ACTIVE_TIME;\r
        float flockX = startSide > 0.0\r
            ? mix(-50.0, resolution.x + 50.0, progress)\r
            : mix(resolution.x + 50.0, -50.0, progress);\r
        float flockY = mix(startYNorm, targetYNorm, progress) * resolution.y;\r
\r
        float birdCount = BIRD_COUNT_MIN + floor(bhHash(vec2(flockSeed, 3.0)) * BIRD_COUNT_RANGE);\r
\r
        for (float b = 0.0; b < 12.0; b++) {\r
            if (b >= birdCount) break;\r
\r
            float birdSeed = flockSeed + b * 3.17;\r
            float offsetX = (bhHash(vec2(birdSeed, 0.0)) - 0.5) * BIRD_SPREAD_X;\r
            float offsetY = (bhHash(vec2(birdSeed, 1.0)) - 0.5) * BIRD_SPREAD_Y;\r
            offsetX += sin(time * 2.0 + b) * 15.0;\r
            offsetY += cos(time * 1.5 + b * 0.7) * 8.0;\r
\r
            vec2 birdPos = vec2(flockX + offsetX, flockY + offsetY);\r
            vec2 toBird = fragCoord - birdPos;\r
\r
            float angle = startSide > 0.0 ? 0.0 : PI;\r
            angle += (bhHash(vec2(birdSeed, 2.0)) - 0.5) * 0.4;\r
\r
            float wingPhase = time * BIRD_WING_SPEED + bhHash(vec2(birdSeed, 3.0)) * PI * 2.0;\r
            float wingFlap = sin(wingPhase);\r
\r
            float d = birdShape(toBird, angle, wingFlap);\r
            if (d < 0.0) {\r
                float intensity = smoothstep(0.0, -2.5, d);\r
                col += BIRD_COLOR * intensity;\r
            }\r
        }\r
    }\r
\r
    return col;\r
}\r
\r
// ============================================\r
// MATRIX RAIN (Quine Style)\r
// ============================================\r
\r
// TECHNIQUE: Procedural glyph rain\r
// Each screen column is independently seeded. A "drop head" advances\r
// downward in discrete tick steps, leaving a fading green tail behind.\r
// Glyphs are procedurally constructed from simple geometric primitives\r
// (vertical/horizontal strokes, diagonals, boxes) to approximate\r
// katakana-like characters without any font texture.\r
\r
/** Procedural glyph pattern — creates katakana-like shapes from geometric primitives. */\r
float matrixGlyph(vec2 uv, float seed) {\r
    // Create a procedural glyph based on seed\r
    float glyphType = floor(seed * 8.0);\r
    float pattern = 0.0;\r
\r
    // Vertical stroke (common in katakana)\r
    if (glyphType < 2.0) {\r
        pattern = step(0.4, uv.x) * step(uv.x, 0.6);\r
        pattern *= step(0.1, uv.y) * step(uv.y, 0.9);\r
    }\r
    // Horizontal with vertical\r
    else if (glyphType < 4.0) {\r
        float vert = step(0.4, uv.x) * step(uv.x, 0.6) * step(0.3, uv.y);\r
        float horiz = step(0.2, uv.x) * step(uv.x, 0.8) * step(0.45, uv.y) * step(uv.y, 0.55);\r
        pattern = max(vert, horiz);\r
    }\r
    // Diagonal\r
    else if (glyphType < 5.5) {\r
        float diag = 1.0 - step(0.15, abs(uv.x - uv.y * 0.8 - 0.1));\r
        pattern = diag * step(0.15, uv.x) * step(uv.x, 0.85);\r
    }\r
    // Box-like\r
    else if (glyphType < 7.0) {\r
        float outline = step(0.2, uv.x) * step(uv.x, 0.8) * step(0.2, uv.y) * step(uv.y, 0.8);\r
        float inner = step(0.3, uv.x) * step(uv.x, 0.7) * step(0.35, uv.y) * step(uv.y, 0.65);\r
        pattern = outline - inner * 0.7;\r
    }\r
    // Complex\r
    else {\r
        float v1 = step(0.25, uv.x) * step(uv.x, 0.35) * step(0.2, uv.y);\r
        float v2 = step(0.65, uv.x) * step(uv.x, 0.75) * step(0.2, uv.y);\r
        float h = step(0.25, uv.x) * step(uv.x, 0.75) * step(0.4, uv.y) * step(uv.y, 0.5);\r
        pattern = max(max(v1, v2), h);\r
    }\r
\r
    return clamp(pattern, 0.0, 1.0);\r
}\r
\r
vec3 renderMatrix(vec2 fragCoord, vec2 resolution, float time) {\r
    float cycleNum = floor(time / MATRIX_CYCLE);\r
    float cycle = mod(time, MATRIX_CYCLE);\r
\r
    // Calculate how long drops need to fall (based on screen height + tail)\r
    float numRows = resolution.y / MATRIX_CELL_H;\r
    float ticksToBottom = numRows + MATRIX_TAIL_MIN + MATRIX_TAIL_RANGE;\r
    float dropDuration = ticksToBottom * MATRIX_TICK + MATRIX_DELAY_MAX;\r
\r
    // Early-out: not in active window\r
    if (cycle > MATRIX_BURST + dropDuration) return vec3(0.0);\r
\r
    // Spatial hash: only compute for this fragment's cell\r
    float colIdx = floor(fragCoord.x / MATRIX_CELL_W);\r
    float rowIdx = floor((resolution.y - fragCoord.y) / MATRIX_CELL_H);\r
\r
    // Early-out: skip edge columns (often partially visible)\r
    if (colIdx < 0.0 || colIdx * MATRIX_CELL_W > resolution.x) return vec3(0.0);\r
\r
    vec3 col = vec3(0.0);\r
\r
    // Per-cycle column seed for consistent behavior within cycle\r
    float cycleSeed = cycleNum * 17.31;\r
    float colSeed = bhHash(vec2(colIdx + cycleSeed, 0.0));\r
\r
    // Sparse columns - only some are active\r
    if (colSeed > MATRIX_DENSITY) {\r
        // Background flicker for inactive columns\r
        float flickerSeed = bhHash(vec2(colIdx, rowIdx + floor(time * MATRIX_CHAR_CHANGE)));\r
        if (flickerSeed < MATRIX_BG_FLICKER && cycle < MATRIX_BURST + dropDuration * 0.8) {\r
            vec2 cellUV = fract(fragCoord / vec2(MATRIX_CELL_W, MATRIX_CELL_H));\r
            float glyph = matrixGlyph(cellUV, flickerSeed * 7.0);\r
            col = MATRIX_TAIL_COLOR * glyph * 0.15;\r
        }\r
        return col;\r
    }\r
\r
    // Staggered start times - drops begin at different moments\r
    float startDelay = bhHash(vec2(colIdx + cycleSeed, 1.0)) * MATRIX_DELAY_MAX;\r
    float dropTime = cycle - startDelay;\r
\r
    if (dropTime < 0.0) return vec3(0.0);\r
\r
    // Tick-based discrete movement (like day11)\r
    float currentTick = floor(dropTime / MATRIX_TICK);\r
    float headRow = currentTick;\r
\r
    // Tail length varies per column\r
    float tailLen = MATRIX_TAIL_MIN + bhHash(vec2(colIdx + cycleSeed, 2.0)) * MATRIX_TAIL_RANGE;\r
\r
    // Distance from head (0 = head at bottom, positive = tail trailing above)\r
    // Head is at headRow, tail extends to lower rowIdx values (higher on screen)\r
    float distFromHead = headRow - rowIdx;\r
\r
    // Cell UV for glyph rendering\r
    vec2 cellUV = fract(fragCoord / vec2(MATRIX_CELL_W, MATRIX_CELL_H));\r
\r
    // In the visible drop?\r
    if (distFromHead >= 0.0 && distFromHead < tailLen) {\r
        // Character changes occasionally for that "live code" feel\r
        float charChangeTick = floor(time * MATRIX_CHAR_CHANGE);\r
        float charSeed = bhHash(vec2(colIdx, rowIdx + charChangeTick * 0.1));\r
\r
        // Render glyph\r
        float glyph = matrixGlyph(cellUV, charSeed);\r
\r
        // Head vs tail coloring\r
        if (distFromHead < 1.0) {\r
            // HEAD: bright white with glow\r
            float glowDist = length(cellUV - 0.5);\r
            float glow = exp(-glowDist * 4.0) * MATRIX_HEAD_GLOW;\r
            col = MATRIX_HEAD_COLOR * (glyph + glow);\r
        } else {\r
            // TAIL: fade from bright to dim green\r
            float tailPos = distFromHead / tailLen;\r
            // Exponential falloff for more natural fade\r
            float brightness = exp(-tailPos * 3.0);\r
            // Add slight flicker\r
            brightness *= 0.85 + 0.15 * sin(distFromHead * 2.0 + time * 5.0);\r
            col = MATRIX_TAIL_COLOR * glyph * brightness;\r
        }\r
    }\r
    // Faint trailing ghost\r
    else if (distFromHead >= tailLen && distFromHead < tailLen + 3.0) {\r
        float ghostSeed = bhHash(vec2(colIdx, rowIdx));\r
        float glyph = matrixGlyph(cellUV, ghostSeed);\r
        float ghost = (1.0 - (distFromHead - tailLen) / 3.0) * 0.1;\r
        col = MATRIX_TAIL_COLOR * glyph * ghost;\r
    }\r
\r
    return col;\r
}\r
`},channels:{}},{slug:"gravity-well",title:"Gravity Well Study ",description:"Gravitational lensing effect that warps input images/videos through orbiting singularities. Wells sample and boost colors from the texture beneath them for glowing halos, while dark cores create the event horizon effect.",date:"2026-01-29",tags:["10-days","procedural","space"],links:{},screenshotUrl:mf,passes:{image:`/**\r
 * Gravity Well Study\r
 *\r
 * @author guinetik\r
 * @date 2026-01-29\r
 * @project Genuary 2026\r
 * @see https://genuary2026.guinetik.com\r
 *\r
 * Gravitational lensing effect that warps input images through orbiting\r
 * singularities. Wells sample and boost colors from the texture beneath\r
 * them for glowing halos, while dark cores create the event horizon effect.\r
 *\r
 * Techniques:\r
 * - Inverse-square gravitational lensing via gravityWarp()\r
 * - Multi-well interference warping (1 central + 4 orbiting)\r
 * - Image-based color sampling at well positions for glow tinting\r
 */\r
\r
#define PI 3.14159265359\r
#define TAU 6.28318530718\r
\r
/**\r
 * Warp UV toward a gravity point.\r
 * The softness parameter prevents the singularity at dist=0 by adding\r
 * a floor to the denominator: pull = mass / (dist^2 + softness).\r
 * Lower softness = sharper warp near the center; higher = gentler falloff.\r
 */\r
vec2 gravityWarp(vec2 uv, vec2 center, float mass, float softness) {\r
    vec2 delta = uv - center;\r
    float dist = length(delta);\r
    float pull = mass / (dist * dist + softness);\r
    return uv - normalize(delta) * pull;\r
}\r
\r
void mainImage(out vec4 fragColor, in vec2 fragCoord)\r
{\r
    vec2 uv = fragCoord / iResolution.xy;\r
    float aspect = iResolution.x / iResolution.y;\r
\r
    // Centered aspect-corrected coords\r
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);\r
\r
    float time = iTime;\r
\r
    // === GRAVITY WELLS ===\r
    vec2 warped = p;\r
\r
    // Central pulsing well\r
    vec2 center = vec2(\r
        sin(time * 0.7) * 0.15,\r
        cos(time * 0.5) * 0.15\r
    );\r
    float centerMass = 0.06 + sin(time * 2.0) * 0.02;\r
    warped = gravityWarp(warped, center, centerMass, 0.01);\r
\r
    // Orbiting wells\r
    vec2 wellPositions[4];\r
    for (int i = 0; i < 4; i++) {\r
        float fi = float(i);\r
        float angle = time * (0.4 + fi * 0.15) + fi * TAU / 4.0;\r
        float radius = 0.35 + sin(time * 0.3 + fi) * 0.1;\r
        wellPositions[i] = vec2(cos(angle), sin(angle)) * radius;\r
\r
        float mass = 0.025 * (1.0 + sin(time * 1.5 + fi * 2.0) * 0.5);\r
        warped = gravityWarp(warped, wellPositions[i], mass, 0.015);\r
    }\r
\r
    // Convert warped coords back to UV space\r
    vec2 warpedUV = warped / vec2(aspect, 1.0) + 0.5;\r
\r
    // === SAMPLE TEXTURE ===\r
    vec3 color = vec3(0.0);\r
\r
    if (warpedUV.x > 0.0 && warpedUV.x < 1.0 && warpedUV.y > 0.0 && warpedUV.y < 1.0) {\r
        color = texture(iChannel0, warpedUV).rgb;\r
    }\r
\r
    // Fallback pattern if no texture\r
    if (length(texture(iChannel0, vec2(0.5)).rgb) < 0.01) {\r
        // Procedural fallback - gradient\r
        color = vec3(warpedUV.x, warpedUV.y, 0.5 + 0.5 * sin(time));\r
    }\r
\r
    // === WELL GLOWS (sample color from texture near each well) ===\r
    float totalGlow = 0.0;\r
    vec3 glowColor = vec3(0.0);\r
\r
    // Center well glow\r
    float centerDist = length(p - center);\r
    float centerGlow = smoothstep(0.25, 0.0, centerDist);\r
    vec2 centerSampleUV = center / vec2(aspect, 1.0) + 0.5;\r
    vec3 centerColor = texture(iChannel0, clamp(centerSampleUV, 0.0, 1.0)).rgb;\r
    // Boost brightness for glow\r
    centerColor = centerColor * 1.5 + 0.3;\r
    glowColor += centerColor * centerGlow;\r
    totalGlow += centerGlow;\r
\r
    // Orbiting well glows\r
    for (int i = 0; i < 4; i++) {\r
        float dist = length(p - wellPositions[i]);\r
        float glow = smoothstep(0.15, 0.0, dist);\r
\r
        // Sample texture color at well position\r
        vec2 sampleUV = wellPositions[i] / vec2(aspect, 1.0) + 0.5;\r
        vec3 wellColor = texture(iChannel0, clamp(sampleUV, 0.0, 1.0)).rgb;\r
        wellColor = wellColor * 1.5 + 0.3;\r
\r
        glowColor += wellColor * glow;\r
        totalGlow += glow;\r
    }\r
\r
    // Apply glow\r
    color += glowColor * 0.6;\r
\r
    // === DARK CORES ===\r
    float core = smoothstep(0.06, 0.02, length(p - center));\r
    color *= 1.0 - core * 0.9;\r
\r
    for (int i = 0; i < 4; i++) {\r
        float coreDist = length(p - wellPositions[i]);\r
        float coreAlpha = smoothstep(0.04, 0.015, coreDist);\r
        color *= 1.0 - coreAlpha * 0.85;\r
    }\r
\r
    // === POST ===\r
    // Vignette\r
    float vig = 1.0 - length(uv - 0.5) * 0.5;\r
    color *= vig;\r
\r
    // Slight contrast boost\r
    color = pow(color, vec3(0.95));\r
\r
    fragColor = vec4(color, 1.0);\r
}\r
`},channels:{image:{iChannel0:"textures/space.jpg"}}},{slug:"halvorsen",title:"Attractor Study #05: Halvorsen",description:"Halvorsen's symmetric chaotic attractor with three-fold rotational symmetry. 20 particles with respawn dynamics traced through 3D phase space. Drag to rotate.",date:"2026-02-15",tags:["attractors","simulation","3d"],links:{},screenshotUrl:vf,passes:{image:`/**
 * Attractor Study #05: Halvorsen — Image Pass
 * @author guinetik
 * @date 2026-02-15
 *
 * Composite pass for Halvorsen's symmetric chaotic attractor. Reads the
 * accumulated trail from Buffer A, applies filmic tone-mapping and a soft
 * vignette for final display. Ported from gcanvas attractor-3d-demo / halvorsen.js.
 */

// TECHNIQUE: Filmic tone-mapping via exponential exposure
// The formula col = 1 - exp(-col * EXPOSURE) compresses HDR accumulation
// from the buffer into displayable [0,1] range while preserving bright detail.
#define EXPOSURE 2.5        // Tone-map strength — higher values brighten midtones
                            // and compress highlights. Below 1.0: dim/flat. Above 4.0: washed out.
#define VIGNETTE_STRENGTH 0.3  // Darkening at screen edges — 0.0 = none, 0.5 = heavy.

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord.xy / iResolution.xy;
    vec3 col = texture(iChannel0, uv).rgb;
    col = 1.0 - exp(-col * EXPOSURE);
    float vig = 1.0 - VIGNETTE_STRENGTH * length(uv - 0.5);
    col *= vig;
    fragColor = vec4(col, 1.0);
}
`,bufferA:`/**
 * Attractor Study #05: Halvorsen — Buffer A (Simulation + Trail Rendering)
 * @author guinetik
 * @date 2026-02-15
 *
 * Simulates Halvorsen's symmetric chaotic attractor, a system with exact
 * three-fold rotational symmetry. 10 particles with stochastic respawn dynamics
 * are traced through 3D phase space using distance-field line rendering and
 * feedback accumulation. Velocity-mapped HSL coloring (pink-to-blue) with
 * blink pulses. Ported from gcanvas attractor-3d-demo / halvorsen.js.
 *
 * Halvorsen attractor equations:
 *   dx/dt = -A*x - 4*y - 4*z - y^2
 *   dy/dt = -A*y - 4*z - 4*x - z^2
 *   dz/dt = -A*z - 4*x - 4*y - x^2
 * Parameter: A = 1.89
 *
 * The three-fold symmetry is evident: each equation has the same structure,
 * cyclically permuting (x, y, z). This produces a triangular-lobed attractor
 * when viewed along the (1,1,1) diagonal.
 */

// === STATE LAYOUT (buffer-a, self-feedback via iChannel0) ===
// Pixels (0..9, 0):       Particle positions (xyz). Respawn on escape or by random chance.
// Pixel (CAM_PIXEL, 0):   Camera state — rg = yaw/pitch as [0,1], zw = last mouse.
// All other pixels:       Accumulated trail color (RGB). Faded each frame by FADE.

// ── Integration & rendering ──
#define NUM_PARTICLES 10   // Simultaneous particles tracing the attractor.
                           // More = denser trails. Above 20: GPU-heavy (NUM_PARTICLES * STEPS).
#define STEPS 5.0          // Euler steps per particle per frame — kept low since the
                           // Halvorsen system moves fast. Above 15: trail segments get long.
#define BASE_VIEW_SCALE 0.05  // Base 3D-to-screen scale — smaller zooms out, larger zooms in.
                              // Automatically scaled down on portrait/mobile screens.
#define SPEED 0.95         // Time-step multiplier — higher = faster traversal.
#define INTENSITY 0.5      // Base brightness per segment.
#define FADE 0.990         // Trail persistence per frame — closer to 1.0 = longer trails.
                           // Below 0.98: trails vanish quickly. Above 0.999: ghosting.
#define FOCUS 2.0          // Distance-field softness (pixels) — smaller = thinner lines.
#define RESPAWN_CHANCE 0.025  // Per-particle per-frame probability of random respawn.
                              // Higher = more frequent refreshes. 0.0 = only respawn on escape.

// ── Halvorsen parameter ──
// A controls the linear dissipation on each axis. At A=1.89 the system is chaotic.
// Lower values make the attractor expand; higher values cause it to collapse.
#define A 1.89             // Dissipation constant — classic value for chaotic regime.

// ── Color settings — pink-to-blue palette ──
#define MIN_HUE 320.0      // Hue for fastest velocity (pink-magenta).
#define MAX_HUE 220.0      // Hue for slowest velocity (blue).
                           // Note: MIN_HUE > MAX_HUE means hue wraps through red/pink.
#define MAX_SPEED 40.0     // Velocity clamp for hue mapping.
#define HUE_SHIFT_SPEED 15.0  // Degrees/sec of continuous hue rotation.
#define SATURATION 0.80    // Base color saturation.
#define LIGHTNESS 0.55     // Base HSL lightness.

// ── Blink settings — random brightness pulses ──
#define BLINK_FREQ 7.0         // Pulse rate (Hz).
#define BLINK_INTENSITY 1.5    // Brightness multiplier during blink peak.
#define BLINK_SAT_BOOST 1.2    // Saturation boost during blink.
#define BLINK_LIT_BOOST 1.3    // Lightness boost during blink.

// ── State pixel index for camera ──
// Stored immediately after the last particle pixel.
#define CAM_PIXEL NUM_PARTICLES

// Forward Euler integration of the Halvorsen system.
// dx/dt = -A*x - 4*y - 4*z - y^2
// dy/dt = -A*y - 4*z - 4*x - z^2
// dz/dt = -A*z - 4*x - 4*y - x^2
// Note the cyclic symmetry: each component has the same form under (x,y,z) -> (y,z,x).
vec3 integrate(vec3 cur, float dt) {
    return cur + vec3(
        -A * cur.x - 4.0 * cur.y - 4.0 * cur.z - cur.y * cur.y,
        -A * cur.y - 4.0 * cur.z - 4.0 * cur.x - cur.z * cur.z,
        -A * cur.z - 4.0 * cur.x - 4.0 * cur.y - cur.x * cur.x
    ) * dt;
}

// Inline yaw-pitch projection — applies yaw (cy/sy) then pitch (cp/sp) rotation.
// More efficient than building a full mat3 when only 2D output is needed.
vec2 project(vec3 p, float cy, float sy, float cp, float sp) {
    vec3 r = vec3(p.x * cy - p.z * sy, p.y, p.x * sy + p.z * cy);
    return vec2(r.x, r.y * cp - r.z * sp);
}

// TECHNIQUE: Distance-field line segment rendering
// Computes the minimum distance from point \`p\` to the line segment (a, b).
float dfLine(vec2 a, vec2 b, vec2 p) {
    vec2 ab = b - a;
    float t = clamp(dot(p - a, ab) / dot(ab, ab), 0.0, 1.0);
    return distance(a + ab * t, p);
}

// Pseudo-random hash — maps a float seed to [0, 1).
float hash(float n) {
    return fract(sin(n) * 43758.5453);
}

// Convert HSL (hue in degrees, saturation, lightness) to RGB.
vec3 hsl2rgb(float h, float s, float l) {
    h = mod(h, 360.0) / 60.0;
    float c = (1.0 - abs(2.0 * l - 1.0)) * s;
    float x = c * (1.0 - abs(mod(h, 2.0) - 1.0));
    float m = l - c * 0.5;
    vec3 rgb;
    if      (h < 1.0) rgb = vec3(c, x, 0.0);
    else if (h < 2.0) rgb = vec3(x, c, 0.0);
    else if (h < 3.0) rgb = vec3(0.0, c, x);
    else if (h < 4.0) rgb = vec3(0.0, x, c);
    else if (h < 5.0) rgb = vec3(x, 0.0, c);
    else              rgb = vec3(c, 0.0, x);
    return rgb + m;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 res = iResolution.xy / iResolution.y;
    vec2 uv = fragCoord / iResolution.y;
    uv -= res / 2.0;

    // Responsive scale: shrink on portrait screens to prevent horizontal clipping
    float viewScale = BASE_VIEW_SCALE * min(1.0, iResolution.x / iResolution.y);

    int px = int(floor(fragCoord.x));
    int py = int(floor(fragCoord.y));

    // TECHNIQUE: Frame-persistent state via texelFetch
    // Camera yaw/pitch stored as normalized [0,1] values in rg channels;
    // last mouse position in zw (-1 = not tracking).
    vec4 camState = texelFetch(iChannel0, ivec2(CAM_PIXEL, 0), 0);
    float yaw, pitch;
    vec2 lastMouse = camState.zw;
    if (iFrame == 0) {
        yaw = 0.615;
        pitch = 0.495;
        lastMouse = vec2(-1.0);
    } else {
        yaw   = camState.r * 6.28318;
        pitch = (camState.g - 0.5) * 3.14159;
    }

    bool pressed = iMouse.z > 0.0;
    if (pressed) {
        yaw   = (iMouse.x / iResolution.x) * 6.28318;
        pitch = (iMouse.y / iResolution.y - 0.5) * 3.14159 * 0.6;
    }

    // Detect active mouse movement for instant trail clear
    bool wasTracking = lastMouse.x >= 0.0;
    bool rotating = pressed && wasTracking && length(iMouse.xy - lastMouse) > 1.0;

    // Precompute camera trig
    float cy = cos(yaw),  sy = sin(yaw);
    float cp = cos(pitch), sp = sin(pitch);

    // ── Integrate all particles, find closest line segment ──
    // Each of the NUM_PARTICLES particles is advanced STEPS times. The closest
    // projected segment to this pixel determines brightness and velocity color.
    float d = 1e6;         // Minimum distance from pixel to any trail segment.
    float bestSpeed = 0.0; // Velocity magnitude at the closest segment.
    float dt = 0.008 * SPEED;

    for (int pid = 0; pid < NUM_PARTICLES; pid++) {
        vec3 pos = texelFetch(iChannel0, ivec2(pid, 0), 0).xyz;

        for (float i = 0.0; i < STEPS; i++) {
            vec3 next = integrate(pos, dt);

            vec2 a = project(pos,  cy, sy, cp, sp) * viewScale;
            vec2 b = project(next, cy, sy, cp, sp) * viewScale;

            float segD = dfLine(a, b, uv);
            if (segD < d) {
                d = segD;
                bestSpeed = length(next - pos) / dt;
            }

            pos = next;
        }
    }

    // TECHNIQUE: Dual-layer intensity — smoothstep for soft falloff + Gaussian for bright core.
    float c = (INTENSITY / SPEED) * smoothstep(FOCUS / iResolution.y, 0.0, d);
    c += (INTENSITY / 8.5) * exp(-1000.0 * d * d);

    // ── Blink ──
    float blinkSeed = floor(iTime * BLINK_FREQ);
    float blink = hash(blinkSeed) < 0.25
        ? sin(fract(iTime * BLINK_FREQ) * 3.14159) : 0.0;

    // ── Color: pink (fast) -> blue (slow), with continuous hue rotation ──
    float speedNorm = clamp(bestSpeed / MAX_SPEED, 0.0, 1.0);
    float hue = mod(MAX_HUE - speedNorm * (MAX_HUE - MIN_HUE) + iTime * HUE_SHIFT_SPEED, 360.0);
    float sat = min(1.0, SATURATION * (1.0 + blink * (BLINK_SAT_BOOST - 1.0)));
    float lit = min(1.0, LIGHTNESS * (1.0 + blink * (BLINK_LIT_BOOST - 1.0)));
    vec3 lineColor = hsl2rgb(hue, sat, lit);
    c *= 1.0 + blink * (BLINK_INTENSITY - 1.0);

    // ── State persistence (row 0) & trail accumulation ──
    if (py == 0 && px < NUM_PARTICLES) {
        // Particle state pixels — integrate this particle forward.
        if (iFrame == 0) {
            // Spread particles evenly around a small circle near the attractor.
            // Radius 0.5 is well within the basin of attraction for A=1.89.
            float angle = float(px) * 6.28318 / float(NUM_PARTICLES);
            float r = 0.5;
            fragColor = vec4(r * cos(angle), r * sin(angle), r * sin(angle * 0.7 + 1.0), 0.0);
        } else {
            vec3 pos = texelFetch(iChannel0, ivec2(px, 0), 0).xyz;
            for (float i = 0.0; i < STEPS; i++) {
                pos = integrate(pos, dt);
            }
            // TECHNIQUE: Stochastic respawn
            // Particles that escape beyond radius 20 are respawned, plus a small
            // random chance (RESPAWN_CHANCE) per frame ensures continuous renewal
            // even for well-behaved orbits. Prevents stale/stuck particles.
            float rng = hash(float(px) * 13.7 + iTime * 60.0);
            if (length(pos) > 20.0 || rng < RESPAWN_CHANCE) {
                float angle = hash(float(px) + iTime) * 6.28318;
                float r = 0.5;
                pos = vec3(r * cos(angle), r * sin(angle), r * sin(angle * 0.7 + 1.0));
            }
            fragColor = vec4(pos, 0.0);
        }
    } else if (py == 0 && px == CAM_PIXEL) {
        // Camera state pixel — persist yaw & pitch as normalized [0,1], mouse pos in zw.
        // lastMouse = -1 sentinel means "not tracking" (mouse released).
        vec2 storeMouse = pressed ? iMouse.xy : vec2(-1.0);
        fragColor = vec4(mod(yaw, 6.28318) / 6.28318, pitch / 3.14159 + 0.5, storeMouse);
    } else {
        // Visual pixels — blend new line color onto faded previous frame.
        // Instant clear (fade=0) while actively rotating to avoid smeared trails.
        vec3 prev = texelFetch(iChannel0, ivec2(fragCoord), 0).rgb;
        float fade = rotating ? 0.0 : FADE;
        fragColor = vec4(lineColor * c + prev * fade, 0.0);
    }
}
`},channels:{image:{iChannel0:"buffer-a"},bufferA:{iChannel0:"buffer-a"}}},{slug:"kaleidoscope-study",title:"Kaleidoscope Interactive",description:"Polar coordinate folding with 10 iterations of symmetry. Auto-rotating with mouse X/Y control for speed and zoom, producing vignette-focused mandala-like patterns.",date:"2026-01-28",tags:["procedural","interactive"],links:{},screenshotUrl:gf,passes:{image:`/**\r
 * Kaleidoscope Interactive\r
 * @author guinetik\r
 * @date 2026-01-28\r
 *\r
 * Polar coordinate folding with iterative symmetry. Auto-rotating\r
 * with mouse X/Y control for speed and zoom, producing vignette-focused\r
 * mandala-like patterns from a sampled texture.\r
 *\r
 * Kaleidoscope Techniques:\r
 * - Polar coordinate transformation\r
 * - Iterative angle folding for symmetry\r
 * - Modulo-based reflection patterns\r
 * - Radial coordinate mapping\r
 * - Mouse-controlled rotation and zoom\r
 *\r
 * Visual Features:\r
 * - 10 iterations of symmetry folding\r
 * - Auto-rotation with mouse speed control\r
 * - Mouse Y controls zoom level\r
 * - Vignette for center focus\r
 * - Interactive time-based animation\r
 *\r
 * Controls:\r
 * - Move mouse left/right to speed up/slow down rotation\r
 * - Move mouse up/down to zoom in/out\r
 */\r
\r
#define PI 3.14159265359\r
#define KALEIDO_ITERATIONS 10  // number of fold passes — higher = more complex symmetry\r
\r
vec2 safeUV(vec2 uv) {\r
    return clamp(uv, vec2(0.001), vec2(0.999));\r
}\r
\r
vec3 renderKaleidoscope(vec2 p, float aspect, float time, vec2 mouse) {\r
    // Convert to polar - angle tells us direction, radius is distance\r
    float angle = atan(p.y, p.x);\r
    float radius = length(p);\r
\r
    // Base rotation + mouse X controls additional speed\r
    float baseRotation = time * 0.3;\r
    float mouseModifier = (mouse.x - 0.5) * 2.0;\r
    angle += baseRotation * (1.0 + mouseModifier);\r
\r
    // Fold the angle space repeatedly — each iteration compounds the symmetry.\r
    // abs() mirrors negative angles, mod() wraps into a 60-degree wedge,\r
    // then centering by -half shifts the seam. Repeated folding creates\r
    // exponentially complex symmetry patterns.\r
    for (int i = 0; i < KALEIDO_ITERATIONS; i++) {\r
        angle = abs(angle);  // Mirror across the fold line\r
        float foldAngle = PI / 3.0;  // 60 degrees — hexagonal symmetry base\r
        angle = mod(angle, foldAngle) - foldAngle * 0.5;\r
    }\r
\r
    // Convert back to cartesian coordinates\r
    vec2 foldedP = vec2(cos(angle), sin(angle)) * radius;\r
\r
    // Mouse Y controls zoom (0.5x to 2x)\r
    float zoom = 0.5 + mouse.y * 1.5;\r
    foldedP *= zoom;\r
\r
    // Add a little breathing effect\r
    float pulse = sin(time * 0.5) * 0.1 + 1.0;\r
    foldedP *= pulse;\r
\r
    // Map to UV space for texture sampling\r
    vec2 kaleidoUV = foldedP * 0.5 + 0.5;\r
    kaleidoUV.x /= aspect;\r
    kaleidoUV = kaleidoUV * 0.5 + 0.25;\r
    kaleidoUV = safeUV(kaleidoUV);\r
\r
    // Sample the image\r
    vec3 color = texture(iChannel0, kaleidoUV).rgb;\r
\r
    // Darken the edges to keep focus on the center\r
    float vignette = smoothstep(1.2, 0.4, radius);\r
    color *= vignette * 0.7 + 0.3;\r
\r
    return color;\r
}\r
\r
void mainImage(out vec4 fragColor, in vec2 fragCoord) {\r
    vec2 uv = fragCoord / iResolution.xy;\r
    vec2 p = (uv - 0.5) * 2.0;\r
\r
    float aspect = iResolution.x / iResolution.y;\r
    p.x *= aspect;\r
\r
    // Normalize mouse position to 0-1 range\r
    vec2 mouse = iMouse.xy / iResolution.xy;\r
    // If mouse hasn't been used yet, default to center\r
    if (iMouse.z < 0.0) {\r
        mouse = vec2(0.5);\r
    }\r
\r
    vec3 color = renderKaleidoscope(p, aspect, iTime, mouse);\r
\r
    fragColor = vec4(color, 1.0);\r
}\r
`},channels:{image:{iChannel0:"textures/penrose.png"}}},{slug:"kaleidoscopic",title:"Kaleidoscopic Study",description:"Mandala-like symmetric patterns through polar coordinate folding. Three kaleidoscope styles: simple N-fold symmetry, iterative fractal folding for complex patterns, and spiral twist that warps with radius.",date:"2026-02-01",tags:["10-days","procedural"],links:{},screenshotUrl:yf,passes:{image:`/**\r
 * Kaleidoscopic Study\r
 * @author guinetik\r
 * @date 2026-02-01\r
 *\r
 * Mandala-like symmetric patterns through polar coordinate folding.\r
 * Three kaleidoscope styles cycle over time: simple N-fold symmetry,\r
 * iterative fractal folding, and spiral twist warped with radius.\r
 *\r
 * Kaleidoscope Techniques:\r
 * - Polar coordinate folding\r
 * - Iterative mirror reflections\r
 * - Rotational symmetry control\r
 *\r
 * Visual Features:\r
 * - Mandala-like symmetric patterns\r
 * - Animated rotation and zoom\r
 * - Samples and reflects input texture\r
 */\r
\r
#define PI 3.14159265359\r
#define TAU 6.28318530718\r
\r
/**\r
 * Rotation matrix\r
 */\r
mat2 rot2D(float a) {\r
    float c = cos(a);\r
    float s = sin(a);\r
    return mat2(c, -s, s, c);\r
}\r
\r
/**\r
 * Simple kaleidoscope - fold into N segments\r
 * Polar fold math:\r
 *   1. Convert to polar (angle, radius)\r
 *   2. mod(angle, TAU/N) maps all angles into one wedge of N segments\r
 *   3. Mirror within the wedge (if angle > half-wedge, reflect it)\r
 *   4. Convert back to Cartesian — produces N-fold mirror symmetry\r
 * The +PI offset shifts atan's discontinuity from 9 o'clock to 3 o'clock.\r
 */\r
vec2 kaleido(vec2 p, float segments) {\r
    // Add PI to shift discontinuity from -PI/+PI (9 o'clock) to 0/TAU (3 o'clock)\r
    float angle = atan(p.y, p.x) + PI;\r
    float radius = length(p);\r
\r
    // Fold angle into one segment\r
    float segmentAngle = TAU / segments;\r
    angle = mod(angle, segmentAngle);\r
\r
    // Mirror within segment — creates bilateral symmetry inside each wedge\r
    if (angle > segmentAngle * 0.5) {\r
        angle = segmentAngle - angle;\r
    }\r
\r
    return vec2(cos(angle), sin(angle)) * radius;\r
}\r
\r
/**\r
 * Iterative kaleidoscope - multiple fold passes\r
 * Each iteration: rotate -> fold into 60-degree wedge -> abs-fold -> scale down.\r
 * Repeated folding creates fractal self-similarity at progressively smaller scales.\r
 */\r
vec2 kaleidoIterative(vec2 p, float time, int iterations) {\r
    float scale = PI / 3.0;  // 60 degree segments (hexagonal symmetry)\r
\r
    for (int i = 0; i < iterations; i++) {\r
        float fi = float(i);\r
\r
        // Rotate each iteration\r
        float rotSpeed = 0.1 + fi * 0.02;\r
        p *= rot2D(time * rotSpeed);\r
\r
        // Fold into segment\r
        float theta = atan(p.y, p.x) + PI;\r
        theta = (floor(theta / scale) + 0.5) * scale;\r
\r
        vec2 dir = vec2(cos(theta), sin(theta));\r
        vec2 codir = vec2(-dir.y, dir.x);\r
        p = vec2(dot(dir, p), dot(codir, p));\r
\r
        // Translate and fold\r
        p += vec2(sin(time * 0.5 + fi), cos(time * 0.6 + fi)) * 0.05;\r
        p = abs(fract(p + 0.5) * 2.0 - 1.0);\r
\r
        // Scale down\r
        p *= 0.8;\r
    }\r
\r
    return p;\r
}\r
\r
/**\r
 * Spiral kaleidoscope - adds spiral twist\r
 * Fixed: shift angle to avoid atan discontinuity at 9 o'clock\r
 */\r
vec2 kaleidoSpiral(vec2 p, float segments, float twist, float time) {\r
    // Shift angle by PI to move discontinuity from 9 o'clock to 3 o'clock\r
    // Then add PI back so the visual result is the same\r
    float angle = atan(p.y, p.x) + PI;\r
    float radius = length(p);\r
\r
    // Add spiral twist based on radius\r
    angle += radius * twist + time * 0.3;\r
\r
    // Fold into segment (using TAU to keep in 0-TAU range)\r
    float segmentAngle = TAU / segments;\r
    angle = mod(angle, segmentAngle);\r
\r
    // Mirror within segment\r
    if (angle > segmentAngle * 0.5) {\r
        angle = segmentAngle - angle;\r
    }\r
\r
    return vec2(cos(angle), sin(angle)) * radius;\r
}\r
\r
/**\r
 * Breathing zoom effect\r
 */\r
float breathe(float time) {\r
    return 1.0 + sin(time * 0.8) * 0.3;\r
}\r
\r
void mainImage(out vec4 fragColor, in vec2 fragCoord)\r
{\r
    vec2 uv = fragCoord / iResolution.xy;\r
    float aspect = iResolution.x / iResolution.y;\r
    float time = iTime;\r
\r
    // Centered aspect-corrected coords\r
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);\r
\r
    // === BREATHING ZOOM ===\r
    float zoom = breathe(time);\r
    p *= zoom;\r
\r
    // === CHOOSE KALEIDOSCOPE STYLE ===\r
    float cycleTime = mod(time * 0.08, 3.0);\r
    vec2 kp;\r
\r
    if (cycleTime < 1.0) {\r
        // Simple 6-fold symmetry\r
        kp = kaleido(p, 6.0);\r
        kp *= rot2D(time * 0.2);\r
    } else if (cycleTime < 2.0) {\r
        // Iterative fractal kaleidoscope\r
        kp = kaleidoIterative(p, time, 8);\r
    } else {\r
        // Spiral kaleidoscope\r
        float segments = 6.0 + sin(time * 0.3) * 2.0;\r
        float twist = 3.0 + sin(time * 0.2) * 2.0;\r
        kp = kaleidoSpiral(p, segments, twist, time);\r
    }\r
\r
    // === MAP TO TEXTURE UV ===\r
    vec2 texUV = kp * 0.5 + 0.5;\r
\r
    // Tile/wrap for infinite pattern\r
    texUV = fract(texUV);\r
\r
    // === SAMPLE TEXTURE ===\r
    vec3 color = texture(iChannel0, texUV).rgb;\r
\r
    // === FALLBACK PATTERN ===\r
    if (length(texture(iChannel0, vec2(0.5)).rgb) < 0.01) {\r
        // Colorful geometric pattern\r
        float dist = length(kp);\r
        float angle = atan(kp.y, kp.x);\r
\r
        // Concentric rings\r
        float rings = sin(dist * 20.0 - time * 2.0) * 0.5 + 0.5;\r
\r
        // Radial spokes\r
        float spokes = sin(angle * 12.0 + time) * 0.5 + 0.5;\r
\r
        // Combine\r
        float pattern = rings * 0.5 + spokes * 0.5;\r
\r
        // Rainbow color\r
        vec3 col = 0.5 + 0.5 * cos(TAU * (pattern + time * 0.1 + vec3(0.0, 0.33, 0.67)));\r
\r
        // Center glow\r
        col += vec3(1.0, 0.8, 0.5) * smoothstep(0.3, 0.0, dist);\r
\r
        color = col;\r
    }\r
\r
    // === EDGE GLOW ===\r
    // Add glow at fold boundaries\r
    float edgeDist = min(abs(kp.x), abs(kp.y));\r
    float edge = smoothstep(0.02, 0.0, edgeDist);\r
    color += vec3(0.5, 0.7, 1.0) * edge * 0.3;\r
\r
    // === CENTER HIGHLIGHT ===\r
    float centerGlow = smoothstep(0.2, 0.0, length(p / zoom));\r
    color += color * centerGlow * 0.5;\r
\r
    // === POST ===\r
    // Vignette\r
    float vig = 1.0 - length(uv - 0.5) * 0.6;\r
    color *= vig;\r
\r
    fragColor = vec4(color, 1.0);\r
}\r
`},channels:{image:{iChannel0:"textures/landscape.jpeg"}}},{slug:"liquid-glass",title:"Liquid Glass",description:"A frosted glass lens with Fresnel reflections and chromatic aberration, drifting over an input image like a billiard ball. Based on Genuary 2026 Day 23.",date:"2026-01-23",tags:["genuary","procedural"],links:{},screenshotUrl:bf,passes:{image:`/**
 * Liquid Glass
 * @author guinetik
 * @date 2026-01-23
 *
 * Two superellipse glass blobs drifting over an input image,
 * bouncing off screen edges like billiard balls and merging
 * into metaball shapes via smooth minimum blending.
 *
 * Ported from Genuary 2026 Day 23 ("Transparency").
 *
 * Physical model:
 * - Fresnel equations for dielectric reflectance (IOR 1.5 ~ glass)
 * - Chromatic aberration via wavelength-dependent refraction offset
 * - Gaussian blur kernel for frosted glass scattering
 * - Superellipse SDF for rounded-square lens shape
 * - Smooth minimum (smin) for organic metaball merging
 *
 * @credit PaoloCurtoni (shader inspiration), IQ (superellipse SDF)
 */

// -- Glass properties --
#define IOR                 1.5   // Index of refraction — 1.5 is typical crown glass.
                                  // Higher (1.8+) = more reflection, stronger Fresnel.
#define BLUR_STRENGTH       1.5   // Frosted glass scatter radius — higher = more diffuse/frosted.
                                  // 0 = perfectly clear glass. 3+ = heavily frosted.

// -- Shape --
#define RADIUS              0.22  // Blob radius in NDC — larger = bigger glass blobs.
#define SUPERELLIPSE_N      4.0   // Superellipse exponent — 2.0 = circle, 4.0 = rounded square,
                                  // higher = sharper corners approaching a true square.
#define BLEND_RADIUS        0.12  // Smooth-minimum blend radius for metaball merging.
                                  // Larger = blobs merge from farther apart; 0 = no blending.

// -- Lens distortion --
#define BASE_MAGNIFICATION  0.75  // UV scale inside the lens — <1.0 zooms out (minifies),
                                  // >1.0 zooms in (magnifies).
#define LENS_STRENGTH       0.4   // Edge distortion intensity — how much the lens warps near edges.
#define EDGE_EXPONENT       3.0   // Exponential distortion ramp — higher = distortion concentrated at edges.
#define DEPTH_NORMALIZER    0.8   // Fraction of radius used as max SDF depth — controls distortion falloff shape.
#define ABERRATION_AMOUNT   0.08  // Chromatic aberration — separation between R and B channels.
                                  // 0 = no aberration. 0.15+ = very visible color fringing.

// -- Edge highlight --
#define EDGE_THICKNESS      0.008 // Width of the bright rim at the glass boundary.
#define EDGE_DIAG_SCALE     1.5   // Scale for diagonal highlight pattern on the edge rim.
#define EDGE_DIAG_POWER     1.8   // Sharpness of diagonal highlight — higher = tighter specular band.
#define EDGE_BRIGHTNESS     1.2   // Peak brightness of the edge highlight (>1.0 = HDR white).

// -- Shadow --
#define SHADOW_OFFSET       0.02  // Vertical offset of the drop shadow below the blob.
#define SHADOW_SPREAD       0.06  // How far the shadow feathers outward from the blob edge.
#define SHADOW_OPACITY      0.15  // Peak shadow darkness — 0.0 = invisible, 1.0 = fully opaque.

// -- Fresnel --
#define FRESNEL_STRENGTH    0.35  // How much Fresnel reflection tints the glass surface.
                                  // 0.0 = no reflection. 1.0 = fully reflective at grazing angles.
#define FRESNEL_GRAD_EPS    0.01  // Epsilon for numerical gradient of the blended SDF (normal estimation).
#define NORMAL_Z            0.5   // Z component of the pseudo-3D normal — controls perceived curvature depth.

// -- Blur kernel --
#define BLUR_SAMPLES        16    // Gaussian blur grid side length — total taps = (SAMPLES/2)^2.
                                  // 8 = fast/coarse. 32 = smooth but expensive.
#define BLUR_SIGMA_FACTOR   0.25  // Gaussian sigma as fraction of sample count — controls blur bell width.
#define BLUR_PIXEL_SCALE    0.002 // UV-space size of each blur tap offset.

// -- Motion (blob A) --
#define SPEED_AX            0.31  // Horizontal bounce speed for blob A — larger = faster drift.
#define SPEED_AY            0.23  // Vertical bounce speed for blob A.
#define PHASE_AX            0.37  // Horizontal phase offset — shifts starting position.
#define PHASE_AY            0.71  // Vertical phase offset.

// -- Motion (blob B) --
#define SPEED_BX            0.43  // Horizontal bounce speed for blob B.
#define SPEED_BY            0.29  // Vertical bounce speed for blob B.
#define PHASE_BX            2.13  // Horizontal phase offset.
#define PHASE_BY            1.47  // Vertical phase offset.

// -- Bounds --
#define BOUNDS_MARGIN       0.02  // Inset from screen edge for bounce limits.

// -- Weighted center --
#define CENTER_FALLOFF      8.0   // Gaussian falloff for weighted center calculation.
                                  // Higher = each blob's lens effect stays more localized.

// -- Post-processing --
#define VIGNETTE_START      0.6   // Radial distance where vignette begins (0 = center, 1 = edge).
#define VIGNETTE_END        1.4   // Radial distance where vignette reaches full darkness.
#define VIGNETTE_MIX        0.1   // Vignette blending strength — 0 = off, 1 = full effect.
#define GAMMA               0.95  // Output gamma — <1.0 brightens midtones, >1.0 darkens.
#define GLASS_TINT          vec3(0.95, 0.98, 1.0)   // Subtle cool tint applied inside the glass.
#define GLASS_LIFT          0.15  // Additive brightness lift inside the glass — simulates internal scattering.
#define FRESNEL_COLOR       vec3(1.0, 0.98, 0.95)   // Warm-white Fresnel reflection highlight color.

// -- SDF iteration --
#define SDF_ITERATIONS      12    // Accuracy of superellipse SDF distance — more = tighter fit to the shape.
                                  // 6 = fast but rough. 16+ = very accurate but expensive.
#define PI_OVER_4           0.7853981634

// =============================================================================
// IQ's Superellipse SDF
// Returns vec3(distance, gradient.xy)
// =============================================================================

vec3 sdSuperellipse(vec2 p, float r, float n) {
    p = p / r;
    vec2 gs = sign(p);
    vec2 ps = abs(p);
    float gm = pow(ps.x, n) + pow(ps.y, n);
    float gd = pow(gm, 1.0 / n) - 1.0;
    vec2 g = gs * pow(ps, vec2(n - 1.0)) * pow(gm, 1.0 / n - 1.0);
    p = abs(p);
    if (p.y > p.x) p = p.yx;
    n = 2.0 / n;
    float d = 1e20;
    vec2 oq = vec2(1.0, 0.0);
    for (int i = 1; i < SDF_ITERATIONS; i++) {
        float h = float(i) / float(SDF_ITERATIONS - 1);
        vec2 q = vec2(pow(cos(h * PI_OVER_4), n),
                      pow(sin(h * PI_OVER_4), n));
        vec2 pa = p - oq;
        vec2 ba = q - oq;
        vec2 z = pa - ba * clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
        float d2 = dot(z, z);
        if (d2 < d) {
            d = d2;
        }
        oq = q;
    }
    return vec3(sqrt(d) * sign(gd) * r, g);
}

// =============================================================================
// Smooth minimum for blending SDFs
// =============================================================================

float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
}

// =============================================================================
// Fresnel reflectance (Schlick-approximated dielectric)
// =============================================================================

float fresnel(vec3 I, vec3 N, float ior) {
    float cosi = clamp(dot(I, N), -1.0, 1.0);
    float etai = 1.0, etat = ior;
    if (cosi > 0.0) {
        float temp = etai;
        etai = etat;
        etat = temp;
    }
    float sint = etai / etat * sqrt(max(0.0, 1.0 - cosi * cosi));
    if (sint >= 1.0) {
        return 1.0;
    }
    float cost = sqrt(max(0.0, 1.0 - sint * sint));
    cosi = abs(cosi);
    float Rs = ((etat * cosi) - (etai * cost)) / ((etat * cosi) + (etai * cost));
    float Rp = ((etai * cosi) - (etat * cost)) / ((etai * cosi) + (etat * cost));
    return (Rs * Rs + Rp * Rp) / 2.0;
}

// =============================================================================
// Sample the background image from iChannel0
// UV is in centered [-aspect, aspect] x [-1, 1] space;
// remap to [0,1] for texture lookup.
// =============================================================================

vec3 sampleBackground(vec2 uv, float aspect) {
    vec2 texUV = vec2(uv.x / aspect, uv.y) * 0.5 + 0.5;
    texUV = clamp(texUV, 0.001, 0.999);
    return texture(iChannel0, texUV).rgb;
}

// =============================================================================
// Gaussian blur (frosted glass scattering)
// =============================================================================

float gaussian(vec2 i) {
    float sigma = float(BLUR_SAMPLES) * BLUR_SIGMA_FACTOR;
    return exp(-0.5 * dot(i / sigma, i / sigma)) / (6.28318 * sigma * sigma);
}

vec3 efficientBlur(vec2 uv, float blurAmt, float aspect) {
    vec3 O = vec3(0.0);
    float totalWeight = 0.0;
    int s = BLUR_SAMPLES / 2;

    for (int i = 0; i < 64; i++) {
        if (i >= s * s) break;
        vec2 d = vec2(mod(float(i), float(s)), floor(float(i) / float(s)))
                 * 2.0 - float(s) / 2.0;
        vec2 offset = d * blurAmt * BLUR_PIXEL_SCALE;
        float weight = gaussian(d);

        vec3 sampleCol = sampleBackground(uv + offset, aspect);
        O += sampleCol * weight;
        totalWeight += weight;
    }

    return O / totalWeight;
}

// =============================================================================
// Triangle-wave bounce: maps linear time to ping-pong within [-bound, bound]
// =============================================================================

float triangleWave(float t, float bound) {
    float halfPeriod = 2.0 * bound;
    return bound - abs(mod(t, 2.0 * halfPeriod) - halfPeriod);
}

// =============================================================================
// Main
// =============================================================================

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord / iResolution.xy - 0.5) * 2.0;
    float aspect = iResolution.x / iResolution.y;
    uv.x *= aspect;

    // =========================================================================
    // Blob positions: billiard-ball bounce via triangle wave
    // =========================================================================
    float boundsX = aspect - RADIUS - BOUNDS_MARGIN;
    float boundsY = 1.0 - RADIUS - BOUNDS_MARGIN;

    vec2 posA = vec2(
        triangleWave(iTime * SPEED_AX + PHASE_AX, boundsX),
        triangleWave(iTime * SPEED_AY + PHASE_AY, boundsY)
    );
    vec2 posB = vec2(
        triangleWave(iTime * SPEED_BX + PHASE_BX, boundsX),
        triangleWave(iTime * SPEED_BY + PHASE_BY, boundsY)
    );

    // =========================================================================
    // Blended SDF (metaball merge via smin)
    // =========================================================================
    float dA = sdSuperellipse(uv - posA, RADIUS, SUPERELLIPSE_N).x;
    float dB = sdSuperellipse(uv - posB, RADIUS, SUPERELLIPSE_N).x;
    float d = smin(dA, dB, BLEND_RADIUS);

    // Weighted center — pixels near blob A pull toward A, near B toward B
    float wA = exp(-dA * dA * CENTER_FALLOFF);
    float wB = exp(-dB * dB * CENTER_FALLOFF);
    vec2 center = (posA * wA + posB * wB) / (wA + wB + 1e-6);

    // Shadow (blended)
    vec2 shadowA = posA + vec2(0.0, -SHADOW_OFFSET);
    vec2 shadowB = posB + vec2(0.0, -SHADOW_OFFSET);
    float sdA = sdSuperellipse(uv - shadowA, RADIUS, SUPERELLIPSE_N).x;
    float sdB = sdSuperellipse(uv - shadowB, RADIUS, SUPERELLIPSE_N).x;
    float shadowD = smin(sdA, sdB, BLEND_RADIUS);
    float shadowMask = (1.0 - smoothstep(0.0, SHADOW_SPREAD, shadowD)) * SHADOW_OPACITY;

    // Base background
    vec3 baseColor = sampleBackground(uv, aspect);
    baseColor = mix(baseColor, vec3(0.0), shadowMask);

    vec3 finalColor = baseColor;

    // =========================================================================
    // Inside the glass
    // =========================================================================
    if (d < 0.0) {
        vec2 offset = uv - center;
        float distFromCenter = length(offset);

        float depthInShape = abs(d);
        float normalizedDepth = clamp(depthInShape / (RADIUS * DEPTH_NORMALIZER), 0.0, 1.0);
        float edgeFactor = 1.0 - normalizedDepth;
        float exponentialDistortion = exp(edgeFactor * EDGE_EXPONENT) - 1.0;

        float distortionAmount = exponentialDistortion * LENS_STRENGTH;

        // Chromatic aberration
        float baseDistortion = BASE_MAGNIFICATION + distortionAmount * distFromCenter;

        float redDistortion   = baseDistortion * (1.0 - ABERRATION_AMOUNT);
        float greenDistortion = baseDistortion;
        float blueDistortion  = baseDistortion * (1.0 + ABERRATION_AMOUNT);

        vec2 redUV   = center + offset * redDistortion;
        vec2 greenUV = center + offset * greenDistortion;
        vec2 blueUV  = center + offset * blueDistortion;

        float blur = BLUR_STRENGTH * (edgeFactor * 0.5 + 0.5);

        vec3 redBlur   = efficientBlur(redUV,   blur, aspect);
        vec3 greenBlur = efficientBlur(greenUV, blur, aspect);
        vec3 blueBlur  = efficientBlur(blueUV,  blur, aspect);

        vec3 refractedColor = vec3(redBlur.r, greenBlur.g, blueBlur.b);
        refractedColor *= GLASS_TINT;
        refractedColor += vec3(GLASS_LIFT);

        // Fresnel via numerical gradient of the blended SDF
        vec2 eps = vec2(FRESNEL_GRAD_EPS, 0.0);
        float dxp = smin(
            sdSuperellipse(uv + eps.xy - posA, RADIUS, SUPERELLIPSE_N).x,
            sdSuperellipse(uv + eps.xy - posB, RADIUS, SUPERELLIPSE_N).x,
            BLEND_RADIUS);
        float dxn = smin(
            sdSuperellipse(uv - eps.xy - posA, RADIUS, SUPERELLIPSE_N).x,
            sdSuperellipse(uv - eps.xy - posB, RADIUS, SUPERELLIPSE_N).x,
            BLEND_RADIUS);
        float dyp = smin(
            sdSuperellipse(uv + eps.yx - posA, RADIUS, SUPERELLIPSE_N).x,
            sdSuperellipse(uv + eps.yx - posB, RADIUS, SUPERELLIPSE_N).x,
            BLEND_RADIUS);
        float dyn = smin(
            sdSuperellipse(uv - eps.yx - posA, RADIUS, SUPERELLIPSE_N).x,
            sdSuperellipse(uv - eps.yx - posB, RADIUS, SUPERELLIPSE_N).x,
            BLEND_RADIUS);

        vec2 gradient = vec2(dxp - dxn, dyp - dyn);
        vec3 normal = normalize(vec3(gradient, NORMAL_Z));
        vec3 viewDir = vec3(0.0, 0.0, -1.0);
        float fresnelAmount = fresnel(viewDir, normal, IOR);

        finalColor = mix(refractedColor, FRESNEL_COLOR, fresnelAmount * FRESNEL_STRENGTH);
    }

    // =========================================================================
    // Edge highlight
    // =========================================================================
    float edgeMask = smoothstep(EDGE_THICKNESS, 0.0, abs(d));

    if (edgeMask > 0.0) {
        vec2 normalizedPos = uv * EDGE_DIAG_SCALE;
        float diagonal1 = abs(normalizedPos.x + normalizedPos.y);
        float diagonal2 = abs(normalizedPos.x - normalizedPos.y);
        float diagonalFactor = max(
            smoothstep(1.0, 0.1, diagonal1),
            smoothstep(1.0, 0.5, diagonal2)
        );
        diagonalFactor = pow(diagonalFactor, EDGE_DIAG_POWER);

        vec3 edgeWhite = vec3(EDGE_BRIGHTNESS);
        vec3 internalColor = finalColor * 0.5;
        vec3 edgeColor = mix(internalColor, edgeWhite, diagonalFactor);
        finalColor = mix(finalColor, edgeColor, edgeMask);
    }

    // =========================================================================
    // Post-processing: vignette + gamma
    // =========================================================================
    float vig = 1.0 - smoothstep(VIGNETTE_START, VIGNETTE_END, length(uv / aspect));
    finalColor *= 1.0 - VIGNETTE_MIX + vig * VIGNETTE_MIX;
    finalColor = pow(max(finalColor, vec3(0.0)), vec3(GAMMA));

    fragColor = vec4(clamp(finalColor, 0.0, 1.0), 1.0);
}
`},channels:{image:{iChannel0:"textures/landscape.jpeg"}}},{slug:"lorenz",title:"Attractor Study #02: Lorenz",description:"Lorenz strange attractor (1963), the classic 'butterfly effect' system. Distance-field line tracing with feedback accumulation. Velocity-mapped HSL coloring, continuous hue shift, and random blink pulses.",date:"2026-02-10",tags:["attractors","simulation"],links:{},screenshotUrl:xf,passes:{image:`/**
 * Attractor Study #02: Lorenz — Image Pass
 * @author guinetik
 * @date 2026-02-10
 *
 * Composite pass for the Lorenz attractor. Reads the accumulated trail from
 * Buffer A, applies filmic tone-mapping and a soft vignette for final display.
 */

// TECHNIQUE: Filmic tone-mapping via exponential exposure
// The formula col = 1 - exp(-col * EXPOSURE) compresses HDR accumulation
// from the buffer into displayable [0,1] range while preserving bright detail.
#define EXPOSURE 2.5        // Tone-map strength — higher values brighten midtones
                            // and compress highlights. Below 1.0: dim/flat. Above 4.0: washed out.
#define VIGNETTE_STRENGTH 0.3  // Darkening at screen edges — 0.0 = none, 0.5 = heavy.

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord.xy / iResolution.xy;
    vec3 col = texture(iChannel0, uv).rgb;
    col = 1.0 - exp(-col * EXPOSURE);
    float vig = 1.0 - VIGNETTE_STRENGTH * length(uv - 0.5);
    col *= vig;
    fragColor = vec4(col, 1.0);
}
`,bufferA:`/**
 * Attractor Study #02: Lorenz — Buffer A (Simulation + Trail Rendering)
 * @author guinetik
 * @date 2026-02-10
 *
 * Simulates the Lorenz attractor (1963, Edward Lorenz), the foundational
 * "butterfly effect" system of deterministic chaos. A single particle is
 * integrated via forward Euler, projected to 2D with interactive orbit
 * control, and rendered as distance-field line segments with feedback
 * accumulation for persistent trails. Velocity-mapped HSL coloring with
 * continuous hue shift and random blink pulses.
 *
 * Lorenz attractor equations:
 *   dx/dt = sigma * (y - x)
 *   dy/dt = x * (rho - z) - y
 *   dz/dt = x * y - beta * z
 * Parameters: sigma=10, rho=28, beta=8/3 (classic chaotic regime)
 */

// === STATE LAYOUT (buffer-a, self-feedback via iChannel0) ===
// Pixel (0, 0):          Particle position (xyz). Initialized to \`start\` on frame 0.
// Pixel (CAM_PIXEL, 0):  Camera state — xy = rotation offsets, zw = last mouse position.
// All other pixels:      Accumulated trail color (RGB). Faded each frame by FADE.

// ── Integration & rendering ──
#define STEPS 96.0         // Euler steps per frame — more = longer trail per frame.
                           // Below 30: sparse trail. Above 200: GPU-heavy.
#define BASE_VIEW_SCALE 0.025  // Base 3D-to-screen scale — smaller zooms out, larger zooms in.
                               // Automatically scaled down on portrait/mobile screens.
#define SPEED 0.55         // Time-step multiplier — higher = faster traversal of attractor.
                           // Below 0.2: sluggish. Above 1.0: may overshoot.
#define INTENSITY 0.18     // Base brightness per segment — higher = brighter trails.
                           // Below 0.05: dim. Above 0.4: over-saturated.
#define FADE 0.985         // Trail persistence per frame — closer to 1.0 = longer trails.
                           // Below 0.97: trails vanish quickly. Above 0.999: ghosting.
#define FOCUS 2.0          // Distance-field softness (pixels) — smaller = thinner lines.

// 3D attractor center (midpoint of the two lobes at z~27 for rho=28).
// Subtracted before projection to keep the attractor centered on screen.
vec3 center3d = vec3(0.0, 0.0, 27.0);

// ── 3D view rotation defaults (radians) ──
// rotX = pi/2 maps xz plane to screen, producing the classic butterfly silhouette.
#define DEFAULT_ROT_X 1.5708       // Initial pitch — pi/2 rotates view to show butterfly wings.
#define DEFAULT_ROT_Y 0.0          // Initial yaw — 0 = symmetric front-on view.
#define MOUSE_SENSITIVITY 3.0      // Drag-to-rotate speed — higher = faster orbit.

#define CAM_PIXEL 1

// ── Color settings ──
#define MIN_HUE 30.0       // Hue for fastest velocity (orange region).
#define MAX_HUE 200.0      // Hue for slowest velocity (cyan-blue region).
#define MAX_SPEED 50.0     // Velocity clamp for hue mapping — above this maps to MIN_HUE.
#define HUE_SHIFT_SPEED 15.0  // Degrees/sec of continuous hue rotation.
#define SATURATION 0.85    // Base color saturation.
#define LIGHTNESS 0.55     // Base HSL lightness.

// ── Blink settings — random brightness pulses ──
#define BLINK_FREQ 8.0         // Pulse rate (Hz).
#define BLINK_INTENSITY 1.8    // Brightness multiplier during blink peak.
#define BLINK_SAT_BOOST 1.3    // Saturation boost during blink.
#define BLINK_LIT_BOOST 1.4    // Lightness boost during blink.

// ── Lorenz parameters (classic chaotic regime) ──
// sigma (Prandtl number): controls coupling between x and y.
// rho (Rayleigh number): drives convection — above ~24.74 the system is chaotic.
// beta (geometric factor): relates to the aspect ratio of convection cells.
const float sigma = 10.0;
const float rho   = 28.0;
const float beta  = 8.0 / 3.0;

const vec3 start = vec3(0.1, 0.001, 0.0);  // Initial position — off-center seed for chaos.

// Forward Euler integration of the Lorenz system.
// dx/dt = sigma*(y-x), dy/dt = x*(rho-z)-y, dz/dt = x*y - beta*z
vec3 integrate(vec3 cur, float dt) {
    return cur + vec3(
        sigma * (cur.y - cur.x),
        cur.x * (rho - cur.z) - cur.y,
        cur.x * cur.y - beta * cur.z
    ) * dt;
}

// Rotation matrix around the X axis by angle \`a\` (radians).
mat3 rotX(float a) {
    float c = cos(a), s = sin(a);
    return mat3(1,0,0, 0,c,-s, 0,s,c);
}

// Rotation matrix around the Y axis by angle \`a\` (radians).
mat3 rotY(float a) {
    float c = cos(a), s = sin(a);
    return mat3(c,0,s, 0,1,0, -s,0,c);
}

// Project a 3D attractor point to 2D screen space.
// Subtracts the attractor center to keep both lobes visible on screen.
vec2 project(vec3 p, mat3 viewRot, float scale) {
    return (viewRot * (p - center3d)).xy * scale;
}

// TECHNIQUE: Distance-field line segment rendering
// Computes the minimum distance from point \`p\` to the line segment (a, b).
// Guards against degenerate zero-length segments.
float dfLine(vec2 a, vec2 b, vec2 p) {
    vec2 ab = b - a;
    float denom = dot(ab, ab);
    if (denom < 1e-10) return distance(a, p);
    float t = clamp(dot(p - a, ab) / denom, 0.0, 1.0);
    return distance(a + ab * t, p);
}

// Pseudo-random hash — maps a float seed to [0, 1).
float hash(float n) {
    return fract(sin(n) * 43758.5453);
}

// Convert HSL (hue in degrees, saturation, lightness) to RGB.
vec3 hsl2rgb(float h, float s, float l) {
    h = mod(h, 360.0) / 60.0;
    float c = (1.0 - abs(2.0 * l - 1.0)) * s;
    float x = c * (1.0 - abs(mod(h, 2.0) - 1.0));
    float m = l - c * 0.5;
    vec3 rgb;
    if      (h < 1.0) rgb = vec3(c, x, 0.0);
    else if (h < 2.0) rgb = vec3(x, c, 0.0);
    else if (h < 3.0) rgb = vec3(0.0, c, x);
    else if (h < 4.0) rgb = vec3(0.0, x, c);
    else if (h < 5.0) rgb = vec3(x, 0.0, c);
    else              rgb = vec3(c, 0.0, x);
    return rgb + m;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 res = iResolution.xy / iResolution.y;
    vec2 uv = fragCoord / iResolution.y;
    uv -= res / 2.0;

    // Responsive scale: shrink on portrait screens to prevent horizontal clipping
    float viewScale = BASE_VIEW_SCALE * min(1.0, iResolution.x / iResolution.y);

    int px = int(floor(fragCoord.x));
    int py = int(floor(fragCoord.y));

    // TECHNIQUE: Frame-persistent state via texelFetch
    // Camera rotation offsets and last mouse position are stored in a dedicated
    // pixel (CAM_PIXEL, 0) in the self-feedback buffer and read back each frame.
    vec4 camState = texelFetch(iChannel0, ivec2(CAM_PIXEL, 0), 0);
    float offsetRx = camState.x;
    float offsetRy = camState.y;
    vec2 lastMouse = camState.zw;

    if (iFrame == 0) {
        offsetRx = 0.0;
        offsetRy = 0.0;
        lastMouse = vec2(-1.0);
    }

    bool pressed = iMouse.z > 0.0;
    bool wasTracking = lastMouse.x >= 0.0;

    // Accumulate rotation delta while dragging
    if (pressed && wasTracking) {
        vec2 delta = iMouse.xy - lastMouse;
        offsetRx -= delta.y / iResolution.y * MOUSE_SENSITIVITY;
        offsetRy -= delta.x / iResolution.x * MOUSE_SENSITIVITY;
    }

    float rx = DEFAULT_ROT_X + offsetRx;
    float ry = DEFAULT_ROT_Y + offsetRy;
    mat3 viewRot = rotY(ry) * rotX(rx);

    // Detect active mouse movement for instant trail clear
    bool rotating = pressed && wasTracking && length(iMouse.xy - lastMouse) > 1.0;

    // ── Integrate particle, find closest line segment ──
    // Each frame, the particle is advanced STEPS times. For every step, the
    // projected segment is tested against this pixel's UV. The closest segment
    // determines brightness and its velocity determines color hue.
    float d = 1e6;         // Minimum distance from pixel to any trail segment.
    float bestSpeed = 0.0; // Velocity magnitude at the closest segment.

    vec3 last = texelFetch(iChannel0, ivec2(0, 0), 0).xyz;
    vec3 next;

    for (float i = 0.0; i < STEPS; i++) {
        next = integrate(last, 0.016 * SPEED);

        float segD = dfLine(project(last, viewRot, viewScale), project(next, viewRot, viewScale), uv);
        if (segD < d) {
            d = segD;
            // Recompute derivative at \`next\` to get instantaneous speed for color mapping.
            bestSpeed = length(vec3(
                sigma * (next.y - next.x),
                next.x * (rho - next.z) - next.y,
                next.x * next.y - beta * next.z
            ));
        }

        last = next;
    }

    // TECHNIQUE: Dual-layer intensity — smoothstep for soft falloff + Gaussian for bright core.
    float c = (INTENSITY / SPEED) * smoothstep(FOCUS / iResolution.y, 0.0, d);
    c += (INTENSITY / 8.5) * exp(-1000.0 * d * d);

    // Blink: random pulses of brightness — 30% chance each tick, sine-shaped.
    float blinkSeed = floor(iTime * BLINK_FREQ);
    float blink = hash(blinkSeed) < 0.3
        ? sin(fract(iTime * BLINK_FREQ) * 3.14159) : 0.0;

    // Velocity-based color: fast regions map to MIN_HUE, slow to MAX_HUE.
    // Continuous hue shift over time adds temporal variety.
    float speedNorm = clamp(bestSpeed / MAX_SPEED, 0.0, 1.0);
    float hue = mod(MAX_HUE - speedNorm * (MAX_HUE - MIN_HUE) + iTime * HUE_SHIFT_SPEED, 360.0);
    float sat = min(1.0, SATURATION * (1.0 + blink * (BLINK_SAT_BOOST - 1.0)));
    float lit = min(1.0, LIGHTNESS * (1.0 + blink * (BLINK_LIT_BOOST - 1.0)));
    vec3 lineColor = hsl2rgb(hue, sat, lit);
    c *= 1.0 + blink * (BLINK_INTENSITY - 1.0);

    // ── State persistence (row 0) ──
    if (py == 0 && px == 0) {
        // Particle position
        fragColor = (iFrame == 0) ? vec4(start, 0.0) : vec4(next, 0.0);
    } else if (py == 0 && px == CAM_PIXEL) {
        // Camera state: rotation offsets + mouse position for next frame
        vec2 storeMouse = pressed ? iMouse.xy : vec2(-1.0);
        fragColor = vec4(offsetRx, offsetRy, storeMouse);
    } else {
        // Visual pixels — accumulate with fade; instant clear when rotating
        vec3 prev = texelFetch(iChannel0, ivec2(fragCoord), 0).rgb;
        float fade = rotating ? 0.0 : FADE;
        fragColor = vec4(lineColor * c + prev * fade, 0.0);
    }
}
`},channels:{image:{iChannel0:"buffer-a"},bufferA:{iChannel0:"buffer-a"}}},{slug:"nebulae",title:"Nebulae Generator",description:"Procedural nebulae with heterogeneous density, dust lanes, emission knots, dark nebulae, galaxies, storms with lightning, and stars. Cinematic camera cuts with auto-pan or mouse drag override.",date:"2025-11-25",tags:["procedural","space","interactive"],links:{},screenshotUrl:wf,passes:{image:`/**\r
 * Nebula Background Shadertoy Study\r
 *\r
 * @author guinetik\r
 * @date 2025-11-25\r
 * @see https://github.com/guinetik\r
 *\r
 * Cinematic camera movement with cuts every 4 seconds.\r
 * Each segment has a unique pan/zoom direction. Drag to override.\r
 *\r
 * Features procedural variety:\r
 * - Main nebula with emission colors\r
 * - Distant gas clouds in contrasting colors\r
 * - Dark nebulae (Bok globules)\r
 * - Bright emission knots\r
 * - Distant galaxies\r
 * - Distant storms with lightning and dust (spawn, flash, fade)\r
 * - Heterogeneous density (bright regions, voids, dust lanes)\r
 */\r
\r
// =============================================================================\r
// CONSTANTS\r
// =============================================================================\r
\r
#define PI 3.14159265359\r
#define TAU 6.28318530718\r
\r
// Nebula structure\r
const float NEBULA_SCALE = 0.5;\r
const float NEBULA_DETAIL = 2.0;\r
const int SPIRAL_NOISE_ITER = 5;\r
const float NUDGE = 3.0;\r
\r
// Animation\r
const float TIME_SCALE = 0.008;\r
const float FLOW_SPEED = 0.03;\r
\r
// Density\r
const float DENSITY_THRESHOLD = 0.02;\r
const float DENSITY_FALLOFF = 0.5;\r
\r
// Colors\r
const float COLOR_VARIATION = 0.25;\r
const float BRIGHTNESS_BASE = 0.5;\r
const float BRIGHTNESS_RANGE = 0.8;\r
\r
// Noise constants\r
const float MOD_DIVISOR = 289.0;\r
const vec4 TAYLOR_INV_SQRT = vec4(1.79284291400159, 0.85373472095314, 0.0, 0.0);\r
const float NOISE_OUTPUT_SCALE_3D = 42.0;\r
const float FBM_LACUNARITY = 2.0;\r
const float FBM_PERSISTENCE = 0.5;\r
const int FBM_MAX_OCTAVES = 8;\r
\r
// Hash constants\r
const float HASH_K1 = 0.1031;\r
const float HASH_K2 = 0.1030;\r
const float HASH_K3 = 0.0973;\r
const float HASH_K4 = 33.33;\r
\r
// =============================================================================\r
// HASH FUNCTIONS\r
// =============================================================================\r
\r
float seedHash(float seed) {\r
    vec3 p3 = fract(vec3(seed) * vec3(HASH_K1, HASH_K2, HASH_K3));\r
    p3 += dot(p3, p3.yzx + HASH_K4);\r
    return fract((p3.x + p3.y) * p3.z);\r
}\r
\r
vec3 hash33(vec3 p) {\r
    p = fract(p * vec3(0.1031, 0.1030, 0.0973));\r
    p += dot(p, p.yxz + 33.33);\r
    return fract((p.xxy + p.yxx) * p.zyx);\r
}\r
\r
// =============================================================================\r
// NOISE FUNCTIONS\r
// =============================================================================\r
\r
vec3 mod289_3(vec3 x) {\r
    return x - floor(x * (1.0 / MOD_DIVISOR)) * MOD_DIVISOR;\r
}\r
\r
vec4 mod289_4(vec4 x) {\r
    return x - floor(x * (1.0 / MOD_DIVISOR)) * MOD_DIVISOR;\r
}\r
\r
vec4 permute_4(vec4 x) {\r
    return mod289_4(((x * 34.0) + 1.0) * x);\r
}\r
\r
vec4 taylorInvSqrt(vec4 r) {\r
    return TAYLOR_INV_SQRT.x - TAYLOR_INV_SQRT.y * r;\r
}\r
\r
float snoise3D(vec3 v) {\r
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);\r
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);\r
\r
    vec3 i = floor(v + dot(v, C.yyy));\r
    vec3 x0 = v - i + dot(i, C.xxx);\r
\r
    vec3 g = step(x0.yzx, x0.xyz);\r
    vec3 l = 1.0 - g;\r
    vec3 i1 = min(g.xyz, l.zxy);\r
    vec3 i2 = max(g.xyz, l.zxy);\r
\r
    vec3 x1 = x0 - i1 + C.xxx;\r
    vec3 x2 = x0 - i2 + C.yyy;\r
    vec3 x3 = x0 - D.yyy;\r
\r
    i = mod289_3(i);\r
    vec4 p = permute_4(permute_4(permute_4(\r
                i.z + vec4(0.0, i1.z, i2.z, 1.0))\r
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))\r
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));\r
\r
    float n_ = 0.142857142857;\r
    vec3 ns = n_ * D.wyz - D.xzx;\r
\r
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);\r
\r
    vec4 x_ = floor(j * ns.z);\r
    vec4 y_ = floor(j - 7.0 * x_);\r
\r
    vec4 x = x_ * ns.x + ns.yyyy;\r
    vec4 y = y_ * ns.x + ns.yyyy;\r
    vec4 h = 1.0 - abs(x) - abs(y);\r
\r
    vec4 b0 = vec4(x.xy, y.xy);\r
    vec4 b1 = vec4(x.zw, y.zw);\r
\r
    vec4 s0 = floor(b0) * 2.0 + 1.0;\r
    vec4 s1 = floor(b1) * 2.0 + 1.0;\r
    vec4 sh = -step(h, vec4(0.0));\r
\r
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;\r
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;\r
\r
    vec3 p0 = vec3(a0.xy, h.x);\r
    vec3 p1 = vec3(a0.zw, h.y);\r
    vec3 p2 = vec3(a1.xy, h.z);\r
    vec3 p3 = vec3(a1.zw, h.w);\r
\r
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));\r
    p0 *= norm.x;\r
    p1 *= norm.y;\r
    p2 *= norm.z;\r
    p3 *= norm.w;\r
\r
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);\r
    m = m * m;\r
\r
    return NOISE_OUTPUT_SCALE_3D * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));\r
}\r
\r
float fbm3D(vec3 p, int octaves) {\r
    float value = 0.0;\r
    float amplitude = FBM_PERSISTENCE;\r
    float frequency = 1.0;\r
    vec3 shift = vec3(100.0);\r
\r
    for (int i = 0; i < FBM_MAX_OCTAVES; i++) {\r
        if (i >= octaves) break;\r
        value += amplitude * snoise3D(p * frequency);\r
        p += shift;\r
        frequency *= FBM_LACUNARITY;\r
        amplitude *= FBM_PERSISTENCE;\r
    }\r
\r
    return value;\r
}\r
\r
// =============================================================================\r
// HSV TO RGB\r
// =============================================================================\r
\r
vec3 hsv2rgb(float h, float s, float v) {\r
    return v + v * s * (clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0) - 1.0);\r
}\r
\r
// =============================================================================\r
// SPIRAL NOISE\r
// =============================================================================\r
\r
float spiralNoise(vec3 p, float seed) {\r
    float normalizer = 1.0 / sqrt(1.0 + NUDGE * NUDGE);\r
    float n = 1.5 - seed * 0.5;\r
    float iter = 2.0;\r
\r
    for (int i = 0; i < SPIRAL_NOISE_ITER; i++) {\r
        n += -abs(sin(p.y * iter) + cos(p.x * iter)) / iter;\r
        p.xy += vec2(p.y, -p.x) * NUDGE;\r
        p.xy *= normalizer;\r
        p.xz += vec2(p.z, -p.x) * NUDGE;\r
        p.xz *= normalizer;\r
        iter *= 1.5 + seed * 0.2;\r
    }\r
\r
    return n;\r
}\r
\r
// =============================================================================\r
// NEBULA DENSITY (with voids and bright regions)\r
// =============================================================================\r
\r
float nebulaDensity(vec3 p, float seed) {\r
    float k = 1.5 + seed * 0.5;\r
    float spiral = spiralNoise(p * NEBULA_SCALE, seed);\r
    float detail = fbm3D(p * NEBULA_DETAIL, 4) * 0.35;\r
    float fine = fbm3D(p * NEBULA_DETAIL * 3.0, 2) * 0.15;\r
    return k * (0.5 + spiral * 0.5 + detail + fine);\r
}\r
\r
// Large-scale density variation - creates bright regions and voids\r
float densityVariation(vec3 p, float seed) {\r
    // Very large scale blobs for major bright/dark regions\r
    float largeBright = fbm3D(p * 0.3 + seed * 50.0, 2);\r
    largeBright = smoothstep(-0.4, 0.4, largeBright);\r
\r
    // Medium scale variation\r
    float mediumVar = fbm3D(p * 0.8 + seed * 30.0, 2);\r
    mediumVar = mediumVar * 0.5 + 0.5;\r
\r
    // Combine - higher base ensures visibility everywhere\r
    float variation = 0.3 + largeBright * (0.4 + mediumVar * 0.3);\r
\r
    return variation;\r
}\r
\r
// Creates voids - empty regions in the nebula (reduced for better coverage)\r
float voidMask(vec3 p, float seed) {\r
    // Large void regions - smaller and less frequent\r
    float voidNoise = fbm3D(p * 0.6 + seed * 70.0, 2);\r
\r
    // Softer cutoff, fewer voids\r
    float voids = smoothstep(-0.5, 0.2, voidNoise);\r
\r
    // Smaller void pockets\r
    float smallVoids = fbm3D(p * 1.5 + seed * 90.0, 2);\r
    smallVoids = smoothstep(-0.5, 0.1, smallVoids);\r
\r
    // Higher minimum (0.4 instead of 0.3) ensures nebula is always visible\r
    return 0.4 + voids * smallVoids * 0.6;\r
}\r
\r
// Bright emission regions - localized bright spots\r
float brightRegions(vec3 p, float seed) {\r
    float bright = 0.0;\r
\r
    // Large bright patches\r
    float patch1 = fbm3D(p * 0.5 + seed * 40.0, 2);\r
    patch1 = pow(max(patch1 + 0.3, 0.0), 2.0);\r
\r
    // Concentrated bright cores\r
    float cores = fbm3D(p * 1.5 + seed * 60.0, 2);\r
    cores = pow(max(cores + 0.5, 0.0), 3.0) * 0.5;\r
\r
    bright = patch1 + cores;\r
\r
    return bright;\r
}\r
\r
// =============================================================================\r
// ROTATION MATRIX\r
// =============================================================================\r
\r
mat3 rotationMatrix(float yaw, float pitch) {\r
    float cy = cos(yaw);\r
    float sy = sin(yaw);\r
    float cp = cos(pitch);\r
    float sp = sin(pitch);\r
\r
    return mat3(\r
        cy, 0.0, -sy,\r
        sy * sp, cp, cy * sp,\r
        sy * cp, -sp, cy * cp\r
    );\r
}\r
\r
// =============================================================================\r
// STAR COLORS\r
// =============================================================================\r
\r
vec3 starColorFromTemp(float temp) {\r
    if (temp < 0.2) {\r
        return mix(vec3(1.0, 0.6, 0.4), vec3(1.0, 0.75, 0.5), temp / 0.2);\r
    } else if (temp < 0.4) {\r
        return mix(vec3(1.0, 0.75, 0.5), vec3(1.0, 0.9, 0.75), (temp - 0.2) / 0.2);\r
    } else if (temp < 0.6) {\r
        return mix(vec3(1.0, 0.9, 0.75), vec3(1.0, 1.0, 1.0), (temp - 0.4) / 0.2);\r
    } else if (temp < 0.8) {\r
        return mix(vec3(1.0, 1.0, 1.0), vec3(0.85, 0.9, 1.0), (temp - 0.6) / 0.2);\r
    } else {\r
        return mix(vec3(0.85, 0.9, 1.0), vec3(0.7, 0.8, 1.0), (temp - 0.8) / 0.2);\r
    }\r
}\r
\r
// =============================================================================\r
// EMISSION NEBULA COLORS\r
// =============================================================================\r
\r
vec3 nebulaEmissionColor(float hue, float variation) {\r
    vec3 hAlpha = vec3(0.9, 0.3, 0.35);\r
    vec3 oiii = vec3(0.2, 0.7, 0.65);\r
    vec3 sii = vec3(0.8, 0.25, 0.2);\r
    vec3 hBeta = vec3(0.3, 0.5, 0.8);\r
\r
    vec3 color;\r
    if (hue < 0.25) {\r
        color = mix(hAlpha, oiii, hue / 0.25);\r
    } else if (hue < 0.5) {\r
        color = mix(oiii, hBeta, (hue - 0.25) / 0.25);\r
    } else if (hue < 0.75) {\r
        color = mix(hBeta, sii, (hue - 0.5) / 0.25);\r
    } else {\r
        color = mix(sii, hAlpha, (hue - 0.75) / 0.25);\r
    }\r
\r
    color += (variation - 0.5) * 0.15;\r
    return color;\r
}\r
\r
// =============================================================================\r
// DISTANT GAS CLOUDS (different from main nebula)\r
// =============================================================================\r
\r
vec4 distantGasCloud(vec3 dir, float seed, vec3 cloudCenter, float cloudSize, vec3 cloudColor) {\r
    float dist = length(dir - cloudCenter);\r
\r
    // Soft falloff\r
    float mask = 1.0 - smoothstep(0.0, cloudSize, dist);\r
    mask = pow(mask, 1.5);\r
\r
    if (mask < 0.01) return vec4(0.0);\r
\r
    // Internal structure with voids\r
    vec3 localPos = (dir - cloudCenter) / cloudSize;\r
    float noise = fbm3D(localPos * 3.0 + seed * 10.0, 3) * 0.5 + 0.5;\r
    float detail = fbm3D(localPos * 8.0 + seed * 20.0, 2) * 0.5 + 0.5;\r
\r
    // Internal voids\r
    float voidNoise = fbm3D(localPos * 2.0 + seed * 30.0, 2);\r
    float voids = smoothstep(-0.3, 0.2, voidNoise);\r
\r
    // Bright cores within the cloud\r
    float brightCore = fbm3D(localPos * 4.0 + seed * 40.0, 2);\r
    brightCore = pow(max(brightCore + 0.4, 0.0), 2.5);\r
\r
    float density = mask * noise * (0.7 + detail * 0.3) * voids;\r
    density += brightCore * mask * 0.3;\r
\r
    // Wispy edges\r
    float edge = smoothstep(0.0, 0.3, mask) * (1.0 - smoothstep(0.7, 1.0, mask));\r
    density *= 0.4 + edge * 0.6;\r
\r
    // Color variation within cloud\r
    float colorVar = fbm3D(localPos * 2.5 + seed * 15.0, 2) * 0.15;\r
    vec3 variedColor = cloudColor * (0.85 + colorVar * 2.0);\r
\r
    // Bright cores are slightly different color\r
    variedColor = mix(variedColor, cloudColor * 1.3, brightCore);\r
\r
    vec3 color = variedColor * (0.12 + density * 0.28);\r
\r
    return vec4(color, density * 0.45);\r
}\r
\r
// =============================================================================\r
// DARK NEBULA / BOK GLOBULE\r
// =============================================================================\r
\r
float darkNebula(vec3 dir, float seed, vec3 center, float size) {\r
    float dist = length(dir - center);\r
    float mask = 1.0 - smoothstep(0.0, size, dist);\r
\r
    if (mask < 0.01) return 0.0;\r
\r
    // Irregular shape\r
    vec3 localPos = (dir - center) / size;\r
    float noise = fbm3D(localPos * 4.0 + seed * 15.0, 3);\r
\r
    float density = mask * (0.5 + noise * 0.5);\r
    density = smoothstep(0.2, 0.6, density);\r
\r
    return density;\r
}\r
\r
// =============================================================================\r
// BRIGHT EMISSION KNOT (HII region)\r
// =============================================================================\r
\r
vec4 emissionKnot(vec3 dir, float seed, vec3 center, float size, vec3 knotColor) {\r
    float dist = length(dir - center);\r
    float mask = 1.0 - smoothstep(0.0, size, dist);\r
    mask = pow(mask, 2.0);\r
\r
    if (mask < 0.01) return vec4(0.0);\r
\r
    // Compact bright core\r
    vec3 localPos = (dir - center) / size;\r
    float noise = fbm3D(localPos * 5.0 + seed * 25.0, 2) * 0.5 + 0.5;\r
\r
    float density = mask * noise;\r
\r
    // Bright center\r
    float core = exp(-dist * 30.0 / size) * 0.8;\r
    density += core;\r
\r
    vec3 color = knotColor * density * 0.6;\r
\r
    return vec4(color, min(density * 0.5, 1.0));\r
}\r
\r
// =============================================================================\r
// DISTANT GALAXY\r
// =============================================================================\r
\r
vec3 distantGalaxy(vec3 dir, float seed, vec3 center, float size) {\r
    float dist = length(dir - center);\r
\r
    if (dist > size * 2.0) return vec3(0.0);\r
\r
    // Galaxy disk plane (tilted)\r
    vec3 toCenter = dir - center;\r
    vec3 tiltAxis = normalize(hash33(vec3(seed * 100.0)) - 0.5);\r
\r
    // Project onto disk\r
    float diskDist = length(toCenter - tiltAxis * dot(toCenter, tiltAxis));\r
    float heightDist = abs(dot(toCenter, tiltAxis));\r
\r
    // Spiral arms (simplified)\r
    float angle = atan(toCenter.y, toCenter.x);\r
    float spiral = sin(angle * 2.0 + diskDist * 20.0 / size + seed * TAU) * 0.5 + 0.5;\r
\r
    // Disk profile\r
    float disk = exp(-diskDist * 8.0 / size) * exp(-heightDist * 40.0 / size);\r
\r
    // Core bulge\r
    float bulge = exp(-dist * 15.0 / size) * 0.8;\r
\r
    float brightness = (disk * (0.3 + spiral * 0.7) + bulge) * 0.15;\r
\r
    // Warm galaxy color\r
    vec3 galaxyColor = mix(vec3(1.0, 0.9, 0.7), vec3(0.9, 0.85, 1.0), seedHash(seed + 0.5));\r
\r
    return galaxyColor * brightness;\r
}\r
\r
// =============================================================================\r
// STAR SCINTILLATION\r
// =============================================================================\r
\r
float starScintillation(float baseIntensity, float starHash, float time) {\r
    if (baseIntensity < 0.5) return baseIntensity;\r
\r
    float scint = 1.0;\r
    scint += 0.03 * sin(time * 1.5 + starHash * TAU);\r
    scint += 0.02 * sin(time * 2.7 + starHash * TAU * 1.3);\r
    return baseIntensity * scint;\r
}\r
\r
// =============================================================================\r
// DISTANT STORMS (lightning + dust)\r
// =============================================================================\r
\r
// Storm lifecycle constants\r
const float STORM_DURATION = 10.0;     // Total storm duration in seconds\r
const float STORM_FADE_IN = 1.5;       // Fade in time\r
const float STORM_FADE_OUT = 3.0;      // Fade out time\r
const float STORM_CYCLE = 12.0;        // Time between storm spawns per slot\r
\r
vec4 distantStorm(vec3 dir, float time, float seed, vec3 stormCenter, float stormSize) {\r
    float dist = length(dir - stormCenter);\r
\r
    // Storm boundary with soft edge\r
    float stormMask = 1.0 - smoothstep(0.0, stormSize, dist);\r
    if (stormMask < 0.01) return vec4(0.0);\r
\r
    // Storm lifecycle - each storm fades in, is active, then fades out\r
    float cycleTime = mod(time + seed * STORM_CYCLE, STORM_CYCLE);\r
    float lifecycle = 0.0;\r
\r
    if (cycleTime < STORM_FADE_IN) {\r
        // Fading in\r
        lifecycle = cycleTime / STORM_FADE_IN;\r
    } else if (cycleTime < STORM_DURATION - STORM_FADE_OUT) {\r
        // Active\r
        lifecycle = 1.0;\r
    } else if (cycleTime < STORM_DURATION) {\r
        // Fading out\r
        lifecycle = 1.0 - (cycleTime - (STORM_DURATION - STORM_FADE_OUT)) / STORM_FADE_OUT;\r
    } else {\r
        // Dormant\r
        return vec4(0.0);\r
    }\r
\r
    lifecycle = smoothstep(0.0, 1.0, lifecycle);\r
\r
    vec3 localPos = (dir - stormCenter) / stormSize;\r
\r
    // === DUST CLOUD ===\r
    float dustNoise = fbm3D(localPos * 4.0 + seed * 10.0, 3) * 0.5 + 0.5;\r
    float dustDetail = fbm3D(localPos * 8.0 + seed * 20.0, 2) * 0.5 + 0.5;\r
    float dust = stormMask * dustNoise * (0.6 + dustDetail * 0.4);\r
\r
    // Swirling motion in dust\r
    float swirl = fbm3D(localPos * 3.0 + vec3(time * 0.1, time * 0.05, seed), 2);\r
    dust *= 0.7 + swirl * 0.3;\r
\r
    // Dust color - purple/orange tint for visibility\r
    vec3 dustColor = mix(\r
        vec3(0.5, 0.3, 0.5),   // Purple-brown\r
        vec3(0.8, 0.5, 0.3),   // Orange\r
        dustNoise\r
    );\r
\r
    // === LIGHTNING BOLTS ===\r
    float lightning = 0.0;\r
    vec3 lightningColor = vec3(0.9, 0.95, 1.0); // Bright blue-white\r
\r
    // Multiple lightning bolts with different timings\r
    for (int i = 0; i < 3; i++) {\r
        float boltSeed = seed + float(i) * 7.0;\r
        float boltHash = seedHash(boltSeed);\r
\r
        // Each bolt has its own flash timing\r
        float flashFreq = 1.5 + boltHash * 2.0;\r
        float flashTime = time * flashFreq + boltHash * TAU;\r
\r
        // Irregular flashing - bolt appears/disappears\r
        float flash = 0.0;\r
        flash += step(0.85, sin(flashTime));  // Sharp on/off\r
        flash += step(0.9, sin(flashTime * 1.7 + 1.0)) * 0.8;\r
        flash = min(flash, 1.0);\r
\r
        // Random flicker\r
        float flicker = seedHash(floor(time * 12.0) + boltSeed);\r
        flash *= step(0.5, flicker);\r
\r
        if (flash < 0.01) continue;\r
\r
        // Bolt start and end points\r
        vec3 boltStart = stormCenter + normalize(vec3(\r
            seedHash(boltSeed + 0.1) - 0.5,\r
            seedHash(boltSeed + 0.2) + 0.3,  // Bias upward\r
            seedHash(boltSeed + 0.3) - 0.5\r
        )) * stormSize * 0.3;\r
\r
        vec3 boltEnd = stormCenter + normalize(vec3(\r
            seedHash(boltSeed + 0.4) - 0.5,\r
            seedHash(boltSeed + 0.5) - 0.6,  // Bias downward\r
            seedHash(boltSeed + 0.6) - 0.5\r
        )) * stormSize * 0.4;\r
\r
        // Animate bolt shape over time (new shape each flash)\r
        float boltTime = floor(time * flashFreq * 0.5 + boltHash * 10.0);\r
\r
        // Calculate distance to lightning bolt line with jagged displacement\r
        vec3 boltDir = boltEnd - boltStart;\r
        float boltLen = length(boltDir);\r
        vec3 boltNorm = boltDir / boltLen;\r
\r
        // Project point onto bolt line\r
        vec3 toPoint = dir - boltStart;\r
        float alongBolt = dot(toPoint, boltNorm);\r
        float t = clamp(alongBolt / boltLen, 0.0, 1.0);\r
\r
        // Jagged displacement - changes with each flash\r
        float jagSeed = boltSeed + boltTime * 13.7;\r
        float jag1 = sin(t * 15.0 + jagSeed) * 0.02;\r
        float jag2 = sin(t * 31.0 + jagSeed * 2.3) * 0.01;\r
        float jag3 = sin(t * 67.0 + jagSeed * 3.7) * 0.005;\r
        vec3 perpOffset = normalize(cross(boltNorm, vec3(0.0, 1.0, 0.1)));\r
        vec3 perpOffset2 = normalize(cross(boltNorm, perpOffset));\r
\r
        vec3 jaggedPoint = boltStart + boltNorm * alongBolt;\r
        jaggedPoint += perpOffset * (jag1 + jag2) + perpOffset2 * (jag2 + jag3);\r
\r
        float distToBolt = length(dir - jaggedPoint);\r
\r
        // Sharp bolt core + glow\r
        float boltCore = exp(-distToBolt * 400.0 / stormSize);  // Thin bright core\r
        float boltGlow = exp(-distToBolt * 40.0 / stormSize);   // Wider glow\r
\r
        // Taper at ends\r
        float taper = smoothstep(0.0, 0.1, t) * smoothstep(1.0, 0.85, t);\r
\r
        // Branches (smaller offshoots)\r
        float branches = 0.0;\r
        for (int b = 0; b < 2; b++) {\r
            float branchT = 0.3 + float(b) * 0.35;\r
            vec3 branchStart = boltStart + boltNorm * boltLen * branchT;\r
            branchStart += perpOffset * (jag1 * 0.5);\r
\r
            vec3 branchDir = normalize(perpOffset + boltNorm * 0.3 + perpOffset2 * (seedHash(jagSeed + float(b)) - 0.5));\r
            float branchLen = stormSize * 0.15;\r
\r
            vec3 toBranch = dir - branchStart;\r
            float alongBranch = dot(toBranch, branchDir);\r
            float tb = clamp(alongBranch / branchLen, 0.0, 1.0);\r
\r
            // Branch jag\r
            float branchJag = sin(tb * 20.0 + jagSeed + float(b) * 5.0) * 0.008;\r
            vec3 branchPoint = branchStart + branchDir * alongBranch + perpOffset2 * branchJag;\r
\r
            float distToBranch = length(dir - branchPoint);\r
            float branchCore = exp(-distToBranch * 500.0 / stormSize) * smoothstep(1.0, 0.0, tb);\r
            branches += branchCore * 0.6;\r
        }\r
\r
        lightning += (boltCore * 1.5 + boltGlow * 0.4 + branches) * flash * taper;\r
    }\r
\r
    // Lightning illuminates the dust\r
    vec3 litDust = dustColor + lightningColor * lightning * 0.8;\r
\r
    // === COMBINE ===\r
    vec3 stormColor = litDust * dust * 0.6;\r
    stormColor += lightningColor * lightning * 2.0;  // Direct lightning glow (very bright!)\r
\r
    // Apply lifecycle fade\r
    stormColor *= lifecycle;\r
    float alpha = dust * 0.6 * lifecycle;\r
\r
    return vec4(stormColor, alpha);\r
}\r
\r
// =============================================================================\r
// MAIN IMAGE\r
// =============================================================================\r
\r
void mainImage(out vec4 fragColor, in vec2 fragCoord) {\r
    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / min(iResolution.x, iResolution.y);\r
\r
    // === SEED GENERATION (changes every 4 seconds) ===\r
    float seedTime = floor(iTime / 4.0);\r
    float uSeed = seedHash(seedTime);\r
\r
    // === CINEMATIC CAMERA MOVEMENT ===\r
    float yaw, pitch;\r
\r
    // Time within current 4-second segment (0 to 1)\r
    float segmentTime = fract(iTime / 4.0);\r
    // Smooth easing\r
    float eased = segmentTime * segmentTime * (3.0 - 2.0 * segmentTime);  // smoothstep\r
\r
    // Random base angles for this segment\r
    float baseYaw = (seedHash(seedTime + 100.0) - 0.5) * PI * 0.6;\r
    float basePitch = (seedHash(seedTime + 200.0) - 0.5) * 0.4;\r
\r
    // Random movement style per segment - weighted towards zooms\r
    float moveStyle = seedHash(seedTime + 500.0);\r
\r
    if (iMouse.z > 0.0) {\r
        // Dragging - use mouse position\r
        yaw = (iMouse.x / iResolution.x - 0.5) * TAU;\r
        pitch = (iMouse.y / iResolution.y - 0.5) * PI * 0.8;\r
    } else {\r
        if (moveStyle < 0.2) {\r
            // Style 1: Drift with slight pan\r
            yaw = baseYaw + eased * 0.15;\r
            pitch = basePitch + eased * 0.1;\r
        } else if (moveStyle < 0.5) {\r
            // Style 2: Zoom in - pitch down (diving into nebula)\r
            yaw = baseYaw + eased * 0.1;\r
            pitch = basePitch + eased * 0.35;\r
        } else if (moveStyle < 0.8) {\r
            // Style 3: Zoom out - pitch up (pulling back)\r
            yaw = baseYaw - eased * 0.1;\r
            pitch = basePitch - eased * 0.3;\r
        } else {\r
            // Style 4: Lateral sweep\r
            float driftDir = sign(seedHash(seedTime + 600.0) - 0.5);\r
            yaw = baseYaw + eased * 0.25 * driftDir;\r
            pitch = basePitch + sin(eased * PI) * 0.08;\r
        }\r
    }\r
\r
    // === RAY DIRECTION ===\r
    mat3 rot = rotationMatrix(yaw, pitch);\r
    vec3 dir = rot * normalize(vec3(uv, 1.0));\r
\r
    float time = mod(iTime * TIME_SCALE, 1000.0);\r
    float realTime = iTime;\r
\r
    // Seed-based parameters\r
    float sh1 = seedHash(uSeed);\r
    float sh2 = seedHash(uSeed + 1.0);\r
    float sh3 = seedHash(uSeed + 2.0);\r
    float sh4 = seedHash(uSeed + 3.0);\r
    float sh5 = seedHash(uSeed + 4.0);\r
    float sh6 = seedHash(uSeed + 5.0);\r
\r
    // === DRAMATIC NEBULA (25% chance) ===\r
    // Rare, vivid nebulae with boosted colors and brightness\r
    float dramaticChance = seedHash(uSeed + 10.0);\r
    bool isDramatic = dramaticChance > 0.75;\r
    float dramaticBoost = isDramatic ? 1.8 : 1.0;\r
    float colorBoost = isDramatic ? 1.5 : 1.0;\r
\r
    // Animated position for main nebula\r
    vec3 animPos = dir + vec3(\r
        time * FLOW_SPEED * (sh1 - 0.5),\r
        time * FLOW_SPEED * 0.5,\r
        time * FLOW_SPEED * (sh2 - 0.5)\r
    );\r
\r
    // === DEEP SPACE BACKGROUND ===\r
    vec3 finalColor = vec3(0.005, 0.005, 0.008);\r
\r
    // === DISTANT GALAXIES (very far background) ===\r
    // Generate 2-4 distant galaxies based on seed\r
    int numGalaxies = 2 + int(sh5 * 3.0);\r
    for (int i = 0; i < 4; i++) {\r
        if (i >= numGalaxies) break;\r
\r
        float galSeed = seedHash(uSeed + float(i) * 7.0 + 100.0);\r
        vec3 galCenter = normalize(vec3(\r
            seedHash(galSeed) - 0.5,\r
            seedHash(galSeed + 0.1) - 0.5,\r
            seedHash(galSeed + 0.2) - 0.5\r
        ));\r
        float galSize = 0.03 + seedHash(galSeed + 0.3) * 0.04;\r
\r
        finalColor += distantGalaxy(dir, galSeed, galCenter, galSize);\r
    }\r
\r
    // === STARS (behind everything) ===\r
    float starField = 0.0;\r
    vec3 starColor = vec3(1.0);\r
\r
    // Bright stars\r
    vec3 starPos1 = floor(dir * 180.0);\r
    float starHash1 = seedHash(dot(starPos1, vec3(127.1, 311.7, 74.7)) + uSeed);\r
\r
    if (starHash1 > 0.994) {\r
        vec3 starCenter = (starPos1 + 0.5) / 180.0;\r
        float dist = length(dir - normalize(starCenter));\r
        float star = exp(-dist * 700.0) * (0.6 + starHash1 * 0.4);\r
        star = starScintillation(star, starHash1, realTime);\r
        starField = star;\r
        starColor = starColorFromTemp(seedHash(starHash1 * 77.7));\r
    }\r
\r
    // Medium stars\r
    vec3 starPos2 = floor(dir * 300.0);\r
    float starHash2Val = seedHash(dot(starPos2, vec3(93.1, 157.3, 211.7)) + uSeed * 2.0);\r
\r
    if (starHash2Val > 0.990) {\r
        vec3 starCenter2 = (starPos2 + 0.5) / 300.0;\r
        float dist2 = length(dir - normalize(starCenter2));\r
        float star2 = exp(-dist2 * 900.0) * (0.35 + starHash2Val * 0.35);\r
        if (star2 > starField) {\r
            starField = star2;\r
            starColor = starColorFromTemp(seedHash(starHash2Val * 77.7));\r
        }\r
    }\r
\r
    // Faint stars\r
    vec3 starPos3 = floor(dir * 500.0);\r
    float starHash3 = seedHash(dot(starPos3, vec3(41.1, 89.3, 173.7)) + uSeed * 3.0);\r
    if (starHash3 > 0.982) {\r
        vec3 starCenter3 = (starPos3 + 0.5) / 500.0;\r
        float dist3 = length(dir - normalize(starCenter3));\r
        starField = max(starField, exp(-dist3 * 1200.0) * 0.2);\r
    }\r
\r
    // Very faint stars\r
    vec3 starPos4 = floor(dir * 800.0);\r
    float starHash4Val = seedHash(dot(starPos4, vec3(17.3, 43.7, 97.1)) + uSeed * 4.0);\r
    if (starHash4Val > 0.975) {\r
        vec3 starCenter4 = (starPos4 + 0.5) / 800.0;\r
        float dist4 = length(dir - normalize(starCenter4));\r
        starField = max(starField, exp(-dist4 * 1800.0) * 0.08);\r
    }\r
\r
    finalColor += starColor * starField;\r
\r
    // === DISTANT GAS CLOUDS (background, different colors) ===\r
    // Generate 3-6 distant clouds\r
    int numClouds = 3 + int(sh4 * 4.0);\r
    for (int i = 0; i < 6; i++) {\r
        if (i >= numClouds) break;\r
\r
        float cloudSeed = seedHash(uSeed + float(i) * 13.0 + 50.0);\r
\r
        // Position on sphere\r
        vec3 cloudCenter = normalize(vec3(\r
            seedHash(cloudSeed) - 0.5,\r
            seedHash(cloudSeed + 0.1) - 0.5,\r
            seedHash(cloudSeed + 0.2) - 0.5\r
        ));\r
\r
        float cloudSize = 0.15 + seedHash(cloudSeed + 0.3) * 0.25;\r
\r
        // Color - contrasting with main nebula\r
        float cloudHue = fract(sh1 + 0.3 + seedHash(cloudSeed + 0.4) * 0.4);\r
        vec3 cloudColor = nebulaEmissionColor(cloudHue, seedHash(cloudSeed + 0.5));\r
\r
        vec4 cloud = distantGasCloud(dir, cloudSeed, cloudCenter, cloudSize, cloudColor);\r
        finalColor = mix(finalColor, finalColor + cloud.rgb, cloud.a);\r
    }\r
\r
    // === DARK NEBULAE (Bok globules) ===\r
    float totalDarkness = 0.0;\r
    int numDark = 2 + int(sh6 * 3.0);\r
    for (int i = 0; i < 4; i++) {\r
        if (i >= numDark) break;\r
\r
        float darkSeed = seedHash(uSeed + float(i) * 17.0 + 200.0);\r
        vec3 darkCenter = normalize(vec3(\r
            seedHash(darkSeed) - 0.5,\r
            seedHash(darkSeed + 0.1) - 0.5,\r
            seedHash(darkSeed + 0.2) - 0.5\r
        ));\r
        float darkSize = 0.05 + seedHash(darkSeed + 0.3) * 0.1;\r
\r
        totalDarkness += darkNebula(dir, darkSeed, darkCenter, darkSize);\r
    }\r
    totalDarkness = min(totalDarkness, 1.0);\r
\r
    // === MAIN NEBULA ===\r
    vec3 nebulaColor = vec3(0.0);\r
    float nebulaAlpha = 0.0;\r
\r
    vec3 lightDir = normalize(vec3(sh1 - 0.5, 0.3, sh2 - 0.5));\r
\r
    // Base density\r
    float mainDensity = nebulaDensity(animPos * 2.0, sh1);\r
    float offsetDensity = nebulaDensity(animPos * 2.0 + lightDir * 0.15, sh1);\r
    float density = mainDensity * 0.65 + offsetDensity * 0.35;\r
\r
    // === HETEROGENEOUS DENSITY ===\r
    // Apply large-scale variation (bright regions vs dim regions)\r
    float variation = densityVariation(animPos, sh1);\r
    density *= 0.3 + variation * 1.2; // Range from very faint to very bright\r
\r
    // Apply voids - carve out empty regions\r
    float voids = voidMask(animPos, sh2);\r
    density *= voids;\r
\r
    // Add bright emission regions\r
    float brightSpots = brightRegions(animPos, sh3);\r
    density += brightSpots * 0.4;\r
\r
    float cloudMask = smoothstep(DENSITY_THRESHOLD, DENSITY_THRESHOLD + DENSITY_FALLOFF, density);\r
    cloudMask *= 0.85;\r
\r
    // === COLOR VARIATION ACROSS NEBULA ===\r
    // Different regions have different dominant colors\r
    float colorNoise = fbm3D(animPos * 1.2 + vec3(sh3 * 10.0), 3);\r
    colorNoise = colorNoise * 0.5 + 0.5;\r
\r
    // Regional color shifts - more variation for dramatic nebulae\r
    float colorVarAmount = isDramatic ? 0.5 : 0.3;\r
    float regionalHue = fbm3D(animPos * 0.4 + sh4 * 20.0, 2) * colorVarAmount;\r
    float hue = fract(sh1 + colorNoise * COLOR_VARIATION * colorBoost + regionalHue);\r
    nebulaColor = nebulaEmissionColor(hue, colorNoise);\r
\r
    // Extra color layers for dramatic nebulae\r
    if (isDramatic) {\r
        float secondHue = fract(hue + 0.3 + fbm3D(animPos * 0.8, 2) * 0.2);\r
        vec3 secondColor = nebulaEmissionColor(secondHue, 0.7);\r
        float blend = fbm3D(animPos * 1.5 + sh5 * 15.0, 2) * 0.5 + 0.5;\r
        nebulaColor = mix(nebulaColor, secondColor, blend * 0.4);\r
    }\r
\r
    // === BRIGHTNESS VARIATION ===\r
    // Localized brightness hotspots\r
    float hotspots = fbm3D(animPos * 2.5 + sh6 * 30.0, 2);\r
    hotspots = pow(max(hotspots + 0.3, 0.0), 2.0);\r
\r
    float brightness = BRIGHTNESS_BASE + cloudMask * BRIGHTNESS_RANGE;\r
    brightness *= 0.85 + sh4 * 0.3;\r
\r
    // Bright regions get extra boost\r
    brightness *= 0.6 + brightSpots * 1.2;\r
\r
    // Hotspots create punchy bright areas\r
    brightness *= 0.8 + hotspots * 0.8;\r
\r
    // Variation makes some areas extra bright\r
    brightness *= 0.7 + variation * 0.8;\r
\r
    // Apply dramatic boost\r
    brightness *= dramaticBoost;\r
\r
    nebulaColor *= brightness;\r
\r
    // Saturate colors more for dramatic nebulae\r
    if (isDramatic) {\r
        nebulaColor = pow(nebulaColor, vec3(0.85));  // Boost midtones\r
    }\r
\r
    // Structure\r
    float structure = fbm3D(animPos * 4.0, 2) * 0.5 + 0.5;\r
    nebulaColor *= 0.85 + structure * 0.3;\r
\r
    // Edge glow (ionization fronts at density boundaries)\r
    float edgeGlow = pow(cloudMask, 0.6) - pow(cloudMask, 1.8);\r
    nebulaColor += nebulaColor * edgeGlow * (isDramatic ? 0.8 : 0.5);\r
\r
    // Bright regions have extra edge glow\r
    float brightEdge = pow(max(brightSpots - 0.2, 0.0), 0.5);\r
    nebulaColor += nebulaEmissionColor(hue + 0.1, 0.8) * brightEdge * (isDramatic ? 0.5 : 0.3);\r
\r
    // Dust lanes - dark filaments (less intense for dramatic so colors pop)\r
    float dustLane = fbm3D(animPos * 1.5 + vec3(sh2 * 5.0), 3);\r
    dustLane = smoothstep(0.2, 0.5, dustLane);\r
    nebulaColor *= isDramatic ? (0.65 + dustLane * 0.35) : (0.5 + dustLane * 0.5);\r
\r
    // Void regions should be very dark\r
    nebulaColor *= 0.2 + voids * 0.8;\r
\r
    nebulaAlpha = cloudMask * 0.7 * voids;\r
\r
    // === BRIGHT EMISSION KNOTS (within main nebula) ===\r
    int numKnots = 2 + int(sh3 * 4.0);\r
    for (int i = 0; i < 5; i++) {\r
        if (i >= numKnots) break;\r
\r
        float knotSeed = seedHash(uSeed + float(i) * 23.0 + 300.0);\r
\r
        // Position knots within nebula region\r
        vec3 knotCenter = normalize(vec3(\r
            (seedHash(knotSeed) - 0.5) * 0.8,\r
            (seedHash(knotSeed + 0.1) - 0.5) * 0.8,\r
            0.5 + seedHash(knotSeed + 0.2) * 0.3\r
        ));\r
\r
        float knotSize = 0.02 + seedHash(knotSeed + 0.3) * 0.03;\r
\r
        // Bright contrasting color\r
        float knotHue = fract(sh1 + 0.15 + seedHash(knotSeed + 0.4) * 0.2);\r
        vec3 knotColor = nebulaEmissionColor(knotHue, 0.7);\r
        knotColor *= 1.5; // Brighter\r
\r
        vec4 knot = emissionKnot(dir, knotSeed, knotCenter, knotSize, knotColor);\r
        nebulaColor += knot.rgb;\r
        nebulaAlpha = max(nebulaAlpha, knot.a);\r
    }\r
\r
    // === COMBINE NEBULA WITH BACKGROUND ===\r
    float obscuration = nebulaAlpha * 0.8;\r
    finalColor = mix(finalColor, nebulaColor, obscuration);\r
\r
    // Stars punch through slightly\r
    finalColor += starColor * starField * (1.0 - obscuration) * 0.3;\r
\r
    // === APPLY DARK NEBULAE ===\r
    finalColor *= 1.0 - totalDarkness * 0.85;\r
\r
    // === DISTANT STORMS ===\r
    // Spawn 4-6 storms at different positions with staggered timings\r
    int numStorms = 4 + int(sh6 * 3.0);\r
    for (int i = 0; i < 6; i++) {\r
        if (i >= numStorms) break;\r
\r
        float stormSeed = seedHash(uSeed + float(i) * 31.0 + 400.0);\r
\r
        // Position storms - first one always in front, others random\r
        vec3 stormCenter;\r
        if (i == 0) {\r
            // First storm always visible in front\r
            stormCenter = normalize(vec3(\r
                (seedHash(stormSeed) - 0.5) * 0.6,\r
                (seedHash(stormSeed + 0.1) - 0.5) * 0.6,\r
                0.8\r
            ));\r
        } else {\r
            stormCenter = normalize(vec3(\r
                seedHash(stormSeed) - 0.5,\r
                seedHash(stormSeed + 0.1) - 0.5,\r
                seedHash(stormSeed + 0.2) - 0.5\r
            ));\r
        }\r
\r
        float stormSize = 0.2 + seedHash(stormSeed + 0.3) * 0.25;\r
\r
        // Stagger storm timings so they don't all appear at once\r
        float stormTimeOffset = float(i) * 2.5;\r
\r
        vec4 storm = distantStorm(dir, realTime + stormTimeOffset, stormSeed, stormCenter, stormSize);\r
\r
        // Additive blending for lightning glow, alpha blend for dust\r
        finalColor = mix(finalColor, finalColor + storm.rgb, storm.a);\r
    }\r
\r
    // === FINAL ADJUSTMENTS ===\r
    float vignette = 1.0 - length(uv) * 0.12;\r
    finalColor *= vignette;\r
\r
    finalColor = pow(max(finalColor, 0.0), vec3(0.95));\r
\r
    fragColor = vec4(finalColor, 1.0);\r
}\r
`},channels:{}},{slug:"planet-earth",title:"Earth-like Planet",description:"A procedural Earth-like world with oceans, forests, deserts, ice caps, clouds, and atmospheric scattering. All terrain generated from inline hash-based noise.",date:"2025-11-27",tags:["exoplanets","space","3d"],links:{},screenshotUrl:Sf,passes:{image:`/**
 * Earth-like Planet
 * @author guinetik
 * @date 2025-11-27
 *
 * Procedural Earth-like world with oceans, forests, deserts, ice caps, clouds,
 * and atmospheric scattering. All terrain is generated from inline hash-based
 * noise with no texture dependencies.
 *
 * Based on the atmospheric study shader from the exoplanets project.
 * Original texture-based noise replaced with hash-based procedural noise.
 *
 * Rendering layers (front to back):
 *   1. Surface — terrain heightmap drives biome selection (water/tropics/forest/desert/ice)
 *   2. Clouds  — separate FBM layer with independent drift speed
 *   3. Atmosphere — Fresnel-like rim glow simulating Rayleigh scattering
 *   4. Halo   — off-sphere atmospheric glow for the background
 *
 * TECHNIQUE: Analytic unit-sphere projection. The planet is rendered as a unit
 * sphere centered at the origin. For each pixel, z is derived from the
 * Pythagorean identity (x^2 + y^2 + z^2 = 1), giving both the 3D position and
 * the surface normal in a single step — no raymarching needed.
 *
 * TECHNIQUE: Finite-difference normal mapping. Land normals are computed by
 * sampling the heightmap at two offset points along the tangent and binormal
 * directions, then reconstructing the perturbed normal for diffuse/specular
 * lighting.
 *
 * Noise: Hash-based 3D value noise (fract-sin family) chosen for speed and
 * simplicity. Produces smooth, non-directional terrain suitable for planetary
 * surfaces. 6-octave FBM provides multi-scale detail from continental shapes
 * down to small terrain features.
 */

// =============================================================================
// INLINE NOISE (replaces iChannel0 texture lookups)
// =============================================================================
// Noise: Hash-based value noise using the fract(sin(x)*43758.5453) family.
// Fast and simple, produces smooth non-directional noise suitable for terrain.

float hashN(float n) { return fract(sin(n) * 43758.5453123); }

float hashN2(vec2 p) {
    float h = dot(p, vec2(127.1, 311.7));
    return fract(sin(h) * 43758.5453123);
}

// 2D value noise — Hermite smoothstep interpolation (3t^2 - 2t^3) for C1 continuity
float valueNoise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hashN2(i + vec2(0.0, 0.0)), hashN2(i + vec2(1.0, 0.0)), u.x),
               mix(hashN2(i + vec2(0.0, 1.0)), hashN2(i + vec2(1.0, 1.0)), u.x), u.y);
}

// 3D value noise (replaces the texture-based ValueNoise)
float ValueNoise(vec3 pos) {
    vec3 i = floor(pos);
    vec3 f = fract(pos);
    vec3 u = f * f * (3.0 - 2.0 * f);

    float n = dot(i, vec3(1.0, 157.0, 113.0));
    return mix(mix(mix(hashN(n + 0.0),   hashN(n + 1.0), u.x),
                   mix(hashN(n + 157.0), hashN(n + 158.0), u.x), u.y),
               mix(mix(hashN(n + 113.0), hashN(n + 114.0), u.x),
                   mix(hashN(n + 270.0), hashN(n + 271.0), u.x), u.y), u.z);
}

// =============================================================================
// UTILITY
// =============================================================================

vec2 Rotate(vec2 p, float a) {
    return p * cos(a) + vec2(-p.y, p.x) * sin(a);
}

// FBM for terrain height & clouds — 6 octaves, lacunarity ~2.77, gain ~1/2.1
// Higher octave count = more fine detail on terrain. The pos offset (0.23, 0.77, 0.57)
// and rotation (0.6 rad) between octaves decorrelate layers to avoid grid artifacts.
float Heightmap(vec3 pos) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    pos *= 1.5;                     // Base frequency — higher = smaller continents
    for (int i = 0; i < 6; i++) {
        height += scale * ValueNoise(pos);
        total += scale;
        pos += vec3(0.23, 0.77, 0.57);
        pos *= 2.77;
        scale /= 2.1;
        pos.xy = Rotate(pos.xy, 0.6);
    }
    return height / total;
}

// =============================================================================
// MAIN
// =============================================================================

#define BASE_UV_SCALE 1.1          // UV zoom — larger zooms out, showing more space around planet.
                                   // Automatically scaled up on portrait/mobile to prevent clipping.

void mainImage(out vec4 fragColor, in vec2 fragCoord) {

    // ── Biome color palette ──
    const vec3 ICE_COL = vec3(1.0, 1.0, 1.0);          // Polar ice caps and snow peaks
    const vec3 LIGHT_DIR = normalize(vec3(0.5, 1.0, 1.0)); // Sun direction (upper-right)
    const float HEIGHT_SCALE = 0.09;                    // Normal perturbation strength — higher = sharper terrain relief

    vec3 ATMOS_COL = vec3(0.37, 0.71, 0.95);           // Atmosphere tint — Rayleigh-like blue
    vec3 WATER_COL = vec3(0.17, 0.32, 0.52) * 0.8;     // Deep ocean blue
    vec3 TROPICS_COL = vec3(0.0, 1.0, 1.0) * 0.75;     // Shallow tropical water — cyan-teal
    vec3 FOREST_COL = vec3(0.15, 0.58, 0.22);           // Temperate forest green
    vec3 DESERT_COL = vec3(0.8, 0.58, 0.52);            // Arid desert tan

    float WATER_LEVEL = 0.48;                           // FBM threshold for ocean — lower = more water, higher = more land

    // Map window roughly to -1..1, planet has r=1
    // Responsive UV scale: zoom out on portrait screens to keep planet fully visible
    float uvScale = BASE_UV_SCALE / min(1.0, iResolution.x / iResolution.y);
    vec2 uv = uvScale * (2.0 * fragCoord.xy - iResolution.xy) / iResolution.y;

    // Derive Z pythagorean-ly; if on the sphere...
    float z2 = 1.0 - uv.x * uv.x - uv.y * uv.y;
    if (z2 >= 0.0) {

        // Unit sphere, so pos = normal
        vec3 pos = vec3(uv, sqrt(z2));
        vec3 normal = pos;

        // Terrain height — rotate noise space for planetary spin
        vec3 noiseNormal = pos;
        float surfaceRot = -0.1 * iTime;               // Rotation speed — negative = eastward spin
        noiseNormal.xz = Rotate(noiseNormal.xz, surfaceRot);
        vec3 noisePos = noiseNormal + vec3(0.0, 0.0, 0.025 * iTime);
        float height = Heightmap(noisePos);

        // Tropics amount
        vec3 tropicsCol = mix(WATER_COL, TROPICS_COL, ValueNoise(3.0 * noisePos));

        // If water...
        vec3 surfaceColor;
        float specAmount = 0.1;
        if (height < WATER_LEVEL) {
            surfaceColor = mix(WATER_COL, tropicsCol, pow(height / WATER_LEVEL, 16.0));
            vec3 wavesPos = pos;
            wavesPos.xz = Rotate(wavesPos.xz, 1.4);
            normal = normalize(normal + 0.08 * ValueNoise(256.0 * (wavesPos + 0.04 * vec3(iTime))));
            specAmount = 0.55;
        }
        // Otherwise if land...
        else {

            // Find a tangent and binormal basis to use
            vec3 tangent = cross(noiseNormal, vec3(0.0, 1.0, 0.0));
            vec3 binormal = cross(noiseNormal, tangent);

            // Get surface normal via finite difference, rotate back into view space
            const float DX = 0.01;
            float scaledHeight = height * HEIGHT_SCALE;
            float tangentWeight = (scaledHeight - HEIGHT_SCALE * Heightmap(noisePos + DX * tangent)) / DX;
            float binormalWeight = (scaledHeight - HEIGHT_SCALE * Heightmap(noisePos + DX * binormal)) / DX;
            vec3 landNormal = normalize(
                noiseNormal +
                tangent * tangentWeight +
                binormal * binormalWeight
            );
            landNormal.xz = Rotate(landNormal.xz, -surfaceRot);
            normal = landNormal;

            // Choose color
            vec3 landColor = mix(DESERT_COL, FOREST_COL,
                clamp(2.0 * ValueNoise(2.0 * noisePos) - 0.8, 0.0, 1.0));
            landColor = mix(landColor, ICE_COL, smoothstep(0.7, 1.0, abs(pos.y)));
            float waterBlend = smoothstep(0.0, 0.01, height - WATER_LEVEL);
            specAmount = 0.55 * (1.0 - waterBlend);
            landColor = mix(tropicsCol, landColor, waterBlend);
            surfaceColor = mix(landColor, ICE_COL,
                smoothstep(WATER_LEVEL + 0.1, WATER_LEVEL + 0.2, height));
        }

        // Surface lighting — Blinn-Phong model with warm-tinted specular
        float diffuse = 0.05 + clamp(dot(normal, LIGHT_DIR), 0.0, 1.0);  // 0.05 ambient floor
        vec3 lightViewHalf = normalize(LIGHT_DIR + vec3(0.0, 0.0, 1.0)); // Half-vector (view is +Z)
        float specular = specAmount * pow(clamp(dot(normal, lightViewHalf), 0.0, 1.0), 15.0); // Exponent 15 = moderate gloss
        fragColor.rgb = diffuse * surfaceColor + vec3(1.0, 0.92, 0.81) * specular; // Warm sun-tinted highlight

        // Clouds — separate noise layer with independent drift
        vec3 cloudPos = vec3(2.0, 6.0, 2.0) * noisePos + 0.07 * iTime;  // Anisotropic scale stretches clouds latitudinally
        cloudPos.xz = Rotate(cloudPos.xz, 0.007 * iTime);               // Slow jet-stream drift
        cloudPos.xy = Rotate(cloudPos.xy, 0.3);                          // Tilt cloud patterns off-axis
        float cloudMin = 0.35;                                            // FBM threshold for cloud formation
        float cloudAmt = 0.75 * smoothstep(cloudMin, 0.7, Heightmap(cloudPos)); // Max 75% opacity
        fragColor.rgb = mix(fragColor.rgb, vec3(pow(diffuse, 0.9)), cloudAmt);  // Clouds lit by diffuse, slight gamma lift

        // TECHNIQUE: Fresnel-like atmospheric rim glow simulating Rayleigh scattering
        // Atmosphere blue intensifies at the limb where the optical path through
        // the atmosphere is longest, approximated by pow(1 - z, 1.2).
        vec3 atmosCol = ATMOS_COL * clamp(0.7 * diffuse + 0.05, 0.0, 1.0);
        fragColor.rgb = mix(fragColor.rgb, 0.6 * atmosCol, smoothstep(0.993, 1.0, length(uv))); // Edge antialias
        fragColor.rgb += pow(1.0 - pos.z, 1.2) * atmosCol;  // Rim glow — exponent 1.2 controls falloff width
    }
    // If off the sphere...
    else {

        // Add atmospheric halo, mild BG gradient
        vec3 skyCol = vec3(0.15, 0.2, 0.25) * abs(uv.y);
        vec3 pos = normalize(vec3(uv, 1.0));
        fragColor.rgb = mix(ATMOS_COL, skyCol, smoothstep(0.95, 1.06, length(uv))) *
            1.5 * clamp(dot(pos, normalize(vec3(0.5, 1.0, 1.0))), 0.0, 1.0);
    }

    fragColor.a = 1.0;
}
`},channels:{}},{slug:"planet-gas-giant",title:"Gas Giant",description:"Jupiter-like gas giant with alternating tan zones and brown belts, turbulent eddies at band boundaries, and the Great Red Spot. Fully procedural with no texture dependencies.",date:"2025-11-27",tags:["exoplanets","space","3d"],links:{},screenshotUrl:Ef,passes:{image:`/**
 * Gas Giant (Jupiter)
 * @author guinetik
 * @date 2025-11-27
 *
 * Jupiter-like gas giant with alternating tan zones and brown belts, turbulent
 * eddies at band boundaries, and the Great Red Spot. Fully procedural with no
 * texture dependencies.
 *
 * Based on the gas giant template by guinetik.
 *
 * Rendering layers (front to back):
 *   1. Banded atmosphere — alternating light zones and dark belts driven by
 *      sinusoidal latitude mapping with FBM turbulence at band edges
 *   2. Great Red Spot   — elliptical storm feature at ~22 deg S latitude with
 *      internal swirl pattern from polar-coordinate distortion
 *   3. Storm features   — small scattered bright spots from 1D FBM
 *   4. Specular + diffuse lighting with Blinn-Phong half-vector model
 *   5. Atmosphere limb  — Fresnel-like rim glow at the sphere edge
 *   6. Halo             — off-sphere atmospheric glow for background
 *
 * TECHNIQUE: Analytic unit-sphere projection. Same approach as the other planet
 * shaders: z derived from Pythagorean identity, giving position and normal.
 *
 * TECHNIQUE: Band-edge turbulence amplification. FBM turbulence is amplified at
 * band boundaries (detected via cos derivative of the band function) to simulate
 * the chaotic eddies that form at Jupiter's zone/belt interfaces.
 *
 * TECHNIQUE: Great Red Spot. An elliptical mask in latitude/longitude space is
 * combined with a swirl pattern generated by converting the local GRS coordinates
 * to polar angle + spiral offset. This creates the characteristic anti-cyclonic
 * vortex appearance.
 *
 * Noise: Hash-based 3D noise with a decorrelation matrix between FBM octaves,
 * identical to the Neptune-like shader. 5-octave 3D FBM for atmospheric bands
 * and 5-octave 1D FBM for storm features.
 */

const float tau = 6.283185;  // 2*PI — full circle in radians

// ── Jupiter color palette ────────────────────────────────────────────────────
#define ZONE_COLOR vec3(0.95, 0.75, 0.45)   // Light ammonia-ice zones — warm cream/tan
#define BELT_LIGHT vec3(0.82, 0.48, 0.20)   // Lighter brown belts — ammonium hydrosulfide
#define BELT_DARK vec3(0.60, 0.28, 0.10)    // Darker brown belts — deeper cloud deck
#define POLAR_COLOR vec3(0.50, 0.38, 0.28)  // Polar darkening — less reflective at high latitudes
#define GRS_COLOR vec3(0.78, 0.25, 0.10)    // Great Red Spot — phosphine/sulfur reddish tint

// ── Atmosphere ───────────────────────────────────────────────────────────────
#define ATMOS_COLOR vec3(0.90, 0.60, 0.30)  // Warm orange atmospheric glow and specular tint

// ── Band structure ───────────────────────────────────────────────────────────
#define BAND_COUNT 7.0           // Number of zone/belt pairs — higher = more/thinner bands.
                                 // Jupiter has ~6-8 major bands; 7.0 gives a good balance.
#define BAND_TURBULENCE 0.06     // FBM displacement of band latitude — higher = wavier edges.
                                 // Below 0.02: very clean stripes. Above 0.15: chaotic.
#define EDGE_TURBULENCE 0.15     // Extra turbulence at band boundaries — simulates the eddies
                                 // and vortex streets that form where zones meet belts.
                                 // Higher = more chaotic boundary layers.

// ── Great Red Spot ───────────────────────────────────────────────────────────
// Positioned at ~22 deg S latitude (Y ~ -0.37 on unit sphere)
#define GRS_LAT -0.37            // Latitude center — negative = southern hemisphere
#define GRS_LON 0.0              // Longitude center — 0.0 = centered on visible face at start
#define GRS_WIDTH 0.28           // Longitudinal half-width — wider = fatter storm ellipse
#define GRS_HEIGHT 0.14          // Latitudinal half-height — taller = more circular storm

// ── UV & lighting ──────────────────────────────────────────────────────────
#define BASE_UV_SCALE 1.1            // UV zoom — larger zooms out, showing more space around planet.
                                     // Automatically scaled up on portrait/mobile to prevent clipping.
#define LIGHT_DIR normalize(vec3(0.5, 1.0, 1.0))  // Sun direction (upper-right)
#define ROTATION_SPEED -0.1      // Planet spin rate — negative = eastward. Jupiter's ~10hr
                                 // rotation is the fastest in our solar system.

// =============================================================================
// HASH & NOISE
// =============================================================================
// Same hash-based value noise as the Neptune-like shader. PCG-style polynomial
// hashing avoids sin-based precision issues on some mobile GPUs.

float hash1(float p) {
    p = fract(p * 0.1031);
    p *= p + 33.33;
    p *= p + p;
    return fract(p);
}

vec3 hash3(vec3 p3) {
    p3 = fract(p3 * vec3(0.1031, 0.1030, 0.0973));
    p3 += dot(p3, p3.yxz + 33.33);
    return fract((p3.xxy + p3.yxx) * p3.zyx);
}

float noise1(float p) {
    float i = floor(p);
    float f = fract(p);
    float u = f * f * (3.0 - 2.0 * f);
    return 1.0 - 2.0 * mix(hash1(i), hash1(i + 1.0), u);
}

vec3 noise3(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return 1.0 - 2.0 * mix(
        mix(mix(hash3(i + vec3(0.0, 0.0, 0.0)),
                hash3(i + vec3(1.0, 0.0, 0.0)), u.x),
            mix(hash3(i + vec3(0.0, 1.0, 0.0)),
                hash3(i + vec3(1.0, 1.0, 0.0)), u.x), u.y),
        mix(mix(hash3(i + vec3(0.0, 0.0, 1.0)),
                hash3(i + vec3(1.0, 0.0, 1.0)), u.x),
            mix(hash3(i + vec3(0.0, 1.0, 1.0)),
                hash3(i + vec3(1.0, 1.0, 1.0)), u.x), u.y), u.z);
}

float fbm1(float p) {
    float f = noise1(p); p = 2.0 * p;
    f += 0.5 * noise1(p); p = 2.0 * p;
    f += 0.25 * noise1(p); p = 2.0 * p;
    f += 0.125 * noise1(p); p = 2.0 * p;
    f += 0.0625 * noise1(p);
    return f / 1.9375;
}

// Decorrelation matrix for 3D FBM — same as Neptune-like shader.
// Rotates domain between octaves to prevent axis-aligned grid artifacts.
const mat3 m = mat3(0.51162, -1.54702, 1.15972,
                    -1.70666, -0.92510, -0.48114,
                     0.90858, -0.86654, -1.55678);

vec3 fbm3(vec3 p) {
    vec3 f = noise3(p); p = m * p;
    f += 0.5 * noise3(p); p = m * p;
    f += 0.25 * noise3(p); p = m * p;
    f += 0.125 * noise3(p); p = m * p;
    f += 0.0625 * noise3(p);
    return f / 1.9375;
}

// =============================================================================
// UTILITY
// =============================================================================

vec2 Rotate(vec2 p, float a) {
    return p * cos(a) + vec2(-p.y, p.x) * sin(a);
}

// =============================================================================
// JUPITER BANDS
// =============================================================================

/**
 * Jupiter band color from latitude.
 * Alternating light zones and dark belts with smooth transitions.
 * Poles are darker and less saturated.
 */
vec3 bandColor(float lat, float lon) {
    // Polar darkening
    float polar = smoothstep(0.85, 1.0, abs(lat));

    // Alternating zones and belts
    float bandPos = lat * BAND_COUNT;
    float band = sin(bandPos * tau * 0.5);

    // Zone (light) vs belt (dark)
    vec3 zone = ZONE_COLOR;
    vec3 belt = mix(BELT_LIGHT, BELT_DARK, 0.5 + 0.5 * sin(bandPos * 1.7 + 2.0));
    vec3 col = mix(belt, zone, 0.5 + 0.5 * band);

    // Darken toward poles
    col = mix(col, POLAR_COLOR, polar);

    return col;
}

// =============================================================================
// MAIN
// =============================================================================

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    // Map window to -1..1, planet has r=1
    // Responsive UV scale: zoom out on portrait screens to keep planet fully visible
    float uvScale = BASE_UV_SCALE / min(1.0, iResolution.x / iResolution.y);
    vec2 uv = uvScale * (2.0 * fragCoord.xy - iResolution.xy) / iResolution.y;

    float z2 = 1.0 - uv.x * uv.x - uv.y * uv.y;
    if (z2 >= 0.0) {
        // Unit sphere
        vec3 pos = vec3(uv, sqrt(z2));
        vec3 normal = pos;

        // Auto rotation
        vec3 noisePos = pos;
        float surfaceRot = ROTATION_SPEED * iTime;
        noisePos.xz = Rotate(noisePos.xz, surfaceRot);

        // Latitude (-1 at pole, 0 equator, 1 at pole)
        float lat = noisePos.y;
        float lon = atan(noisePos.x, noisePos.z);

        // Turbulence displaces latitude for wavy band edges
        vec3 p = noisePos;
        vec3 turb = fbm3(12.0 * p);                            // 3-channel FBM for independent X/Y/Z turbulence
        float latDisplaced = lat + turb.x * BAND_TURBULENCE;   // Baseline latitude wobble

        // TECHNIQUE: Band-edge turbulence amplification — cos() derivative peaks
        // at band transitions (where sin() crosses zero). smoothstep isolates
        // only the sharpest transitions, then extra turbulence is added to
        // simulate the chaotic eddies at Jupiter's zone/belt interfaces.
        float bandEdge = abs(cos(lat * BAND_COUNT * tau * 0.5));
        bandEdge = smoothstep(0.85, 1.0, bandEdge);                  // Isolate sharp band boundaries
        latDisplaced += turb.y * EDGE_TURBULENCE * bandEdge;          // Extra chaos at boundaries only

        // Base band color
        vec3 color = bandColor(latDisplaced, lon);

        // Small-scale color variation from noise
        vec3 detail = fbm3(25.0 * vec3(0.3, 1.0, 0.3) * p);
        color += detail * 0.06;

        // ── Great Red Spot ──────────────────────────────────
        // TECHNIQUE: Elliptical mask in normalized lat/lon space. grsDist is the
        // squared distance in GRS-local coordinates; smoothstep gives soft edges.
        float grsLat = (lat - GRS_LAT) / GRS_HEIGHT;     // Normalize to ellipse half-height
        float grsLon = (lon - GRS_LON) / GRS_WIDTH;      // Normalize to ellipse half-width
        float grsDist = grsLat * grsLat + grsLon * grsLon; // Elliptical distance (1.0 = edge)
        float grsMask = smoothstep(1.0, 0.3, grsDist);   // Soft falloff — 0 outside, 1 at center

        // TECHNIQUE: Anti-cyclonic swirl pattern. Converting GRS-local coords to
        // polar angle + spiral offset (atan + sqrt*4) creates the characteristic
        // rotating vortex appearance of the Great Red Spot.
        float grsSwirl = atan(grsLat, grsLon) + sqrt(max(grsDist, 0.0)) * 4.0;  // Spiral factor 4.0 — tighter = more swirl arms
        float grsTexture = 0.5 + 0.5 * sin(grsSwirl * 3.0 + iTime * 0.3);       // 3 swirl arms, slow rotation
        vec3 grsCol = mix(GRS_COLOR, GRS_COLOR * 1.4, grsTexture * 0.3);         // Subtle brightness variation within spot

        color = mix(color, grsCol, grsMask);

        // ── Storm features ──────────────────────────────────
        float stormNoise = fbm1(10.0 * lat + 5.0);
        float storm = smoothstep(0.65, 0.85, stormNoise) * 0.15;
        color = mix(color, color * 1.3 + vec3(0.05, 0.03, 0.0), storm);

        // ── Lighting — Blinn-Phong with atmosphere-tinted specular ─────────
        float diffuse = 0.05 + clamp(dot(normal, LIGHT_DIR), 0.0, 1.0);   // 0.05 ambient floor
        vec3 lightViewHalf = normalize(LIGHT_DIR + vec3(0.0, 0.0, 1.0));  // Half-vector (view is +Z)
        float specular = 0.1 * pow(clamp(dot(normal, lightViewHalf), 0.0, 1.0), 30.0); // Exponent 30 = moderately tight highlight
        fragColor.rgb = diffuse * color * 2.0 + ATMOS_COLOR * specular;   // 2x boost for HDR vibrancy

        // Atmosphere limb
        vec3 atmosCol = ATMOS_COLOR * clamp(0.7 * diffuse + 0.05, 0.0, 1.0);
        fragColor.rgb = mix(fragColor.rgb, 0.5 * atmosCol, smoothstep(0.993, 1.0, length(uv)));
        fragColor.rgb += pow(1.0 - pos.z, 1.5) * atmosCol * 0.5;
    }
    // Off sphere — atmospheric halo
    else {
        float dist = length(uv);
        vec3 dir = normalize(vec3(uv, 1.0));
        float halo = smoothstep(1.3, 0.95, dist);
        float lightFacing = clamp(dot(dir, LIGHT_DIR), 0.0, 1.0);
        fragColor.rgb = ATMOS_COLOR * halo * lightFacing * 0.3;
    }

    // Gamma correction — standard sRGB approximation (1/2.2 ~ 0.45)
    // max() protects against negative values before pow()
    fragColor.rgb = pow(max(fragColor.rgb, vec3(0.0)), vec3(0.45));
    fragColor.a = 1.0;
}
`},channels:{}},{slug:"planet-lava",title:"Lava World",description:"A molten lava planet with boiling surface, glowing cracks, atmospheric haze, and volumetric corona rays. Fully procedural using simplex noise.",date:"2025-11-27",tags:["exoplanets","space","3d"],links:{},screenshotUrl:Cf,passes:{image:`/**
 * Lava World
 * @author guinetik
 * @date 2025-11-27
 *
 * A molten lava planet with dark cooled crust, glowing magma cracks, and a
 * hot atmospheric haze. Fully procedural using hash-based noise.
 *
 * Based on "Tiny Planet: Vulcan" by Morgan McGuire @CasualEffects.
 * Adapted for standalone rendering with no texture dependencies.
 *
 * Rendering layers (front to back):
 *   1. Crust surface — tectonic plates formed by FBM heightmap
 *   2. Lava emission — glowing cracks where crust height is low (lava pools)
 *      and at plate boundaries (edge heat from height gradient)
 *   3. Rim glow     — hot atmospheric haze at the limb
 *   4. Halo         — off-sphere atmospheric glow for background
 *
 * TECHNIQUE: Analytic unit-sphere projection — same as the Earth shader.
 * Surface position and normal derived from Pythagorean identity on a unit sphere.
 *
 * TECHNIQUE: Height-inverted heat mapping. Crust height from FBM is inverted so
 * low regions become hot lava pools and high regions become cool solidified crust.
 * Plate boundaries (mid-height zones) get extra crack detail, simulating tectonic
 * spreading ridges.
 *
 * Physics: Lava emission uses a self-illumination model — hot areas add emissive
 * light proportional to heat^2, while cool crust relies on diffuse sun lighting.
 * The pulsing glow modulates heat over time to simulate convective churning.
 *
 * Noise: Hash-based 3D value noise (fract-sin family) with configurable FBM
 * octaves. Crust uses 6 octaves for detailed plate structure; lava cracks use
 * 4-5 octaves at different scales for veins and large fissures.
 */

// =============================================================================
// NOISE
// =============================================================================
// Noise: Hash-based 3D value noise using fract(sin(n)*1e4) family.
// The step vector (110, 241, 171) creates a unique hash per lattice cell,
// and Hermite smoothstep interpolation (3t^2 - 2t^3) gives C1 continuity.

float hash(float n) { return fract(sin(n) * 1e4); }

float noise(vec3 x) {
    const vec3 step = vec3(110.0, 241.0, 171.0);   // Prime-ish lattice offsets — chosen to avoid correlation
    vec3 i = floor(x);
    vec3 f = fract(x);
    float n = dot(i, step);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash(n + dot(step, vec3(0, 0, 0))), hash(n + dot(step, vec3(1, 0, 0))), u.x),
                   mix(hash(n + dot(step, vec3(0, 1, 0))), hash(n + dot(step, vec3(1, 1, 0))), u.x), u.y),
               mix(mix(hash(n + dot(step, vec3(0, 0, 1))), hash(n + dot(step, vec3(1, 0, 1))), u.x),
                   mix(hash(n + dot(step, vec3(0, 1, 1))), hash(n + dot(step, vec3(1, 1, 1))), u.x), u.y), u.z);
}

// FBM with configurable octave count — lacunarity 2.0, gain 0.5
// The shift vec3(100.0) offsets each octave's domain to decorrelate layers.
float fbm(vec3 x, int octaves) {
    float v = 0.0;
    float a = 0.5;              // Amplitude — halves per octave (gain = 0.5)
    vec3 shift = vec3(100.0);   // Domain offset between octaves to avoid self-correlation
    for (int i = 0; i < 6; ++i) {
        if (i >= octaves) break;
        v += a * noise(x);
        x = x * 2.0 + shift;   // Lacunarity 2.0 — doubles frequency each octave
        a *= 0.5;
    }
    return v;
}

// =============================================================================
// UTILITY
// =============================================================================

vec2 Rotate(vec2 p, float a) {
    return p * cos(a) + vec2(-p.y, p.x) * sin(a);
}

float square(float x) { return x * x; }

// =============================================================================
// LAVA PALETTE — single noise value mapped to a hot/cold color ramp
// =============================================================================

// Color ramp: black crust → dark red → orange → bright yellow
vec3 lavaRamp(float t) {
    // t=0: cold dark crust, t=1: white-hot magma
    const vec3 BLACK_CRUST = vec3(0.05, 0.02, 0.01);
    const vec3 DARK_RED    = vec3(0.4, 0.05, 0.0);
    const vec3 ORANGE      = vec3(1.0, 0.35, 0.0);
    const vec3 YELLOW_HOT  = vec3(1.0, 0.85, 0.3);

    if (t < 0.3) return mix(BLACK_CRUST, DARK_RED, t / 0.3);
    if (t < 0.6) return mix(DARK_RED, ORANGE, (t - 0.3) / 0.3);
    return mix(ORANGE, YELLOW_HOT, (t - 0.6) / 0.4);
}

// =============================================================================
// LAVA SURFACE
// =============================================================================

// Crust elevation — forms tectonic plates
// Scale 3.0 controls plate size — lower = larger continents, higher = more fragmented
// 6 octaves gives fine detail on plate surfaces
float crustHeight(vec3 pos) {
    return fbm(pos * 3.0, 6);
}

// Lava heat — where the cracks glow hot
// TECHNIQUE: Height-inverted heat mapping — low crust = hot lava pools,
// high crust = cool solidified plates, mid-height = glowing plate edges
float lavaHeat(vec3 pos, float time) {
    // Large-scale cracks between plates — scale 4.0, slow drift
    float cracks = fbm(pos * 4.0 + vec3(0.0, time * 0.01, 0.0), 5);

    // Fine detail veins
    float veins = fbm(pos * 8.0 + vec3(time * 0.02, 0.0, time * 0.015), 4);

    // Combine: low crust = hot cracks, high crust = cool plates
    float height = crustHeight(pos);

    // Invert height: low areas are hot (lava pools), high areas are cool crust
    float heat = 1.0 - smoothstep(0.3, 0.6, height);

    // Add crack detail in medium-height zones (edges of plates)
    float edgeHeat = smoothstep(0.35, 0.45, height) * smoothstep(0.55, 0.45, height);
    heat += edgeHeat * cracks * 1.5;

    // Fine veins everywhere, stronger in hot areas
    heat += veins * 0.2 * heat;

    // Pulsing glow
    heat *= 0.8 + 0.2 * sin(time * 0.3 + fbm(pos * 2.0, 3) * 6.0);

    return clamp(heat, 0.0, 1.0);
}

// =============================================================================
// MAIN
// =============================================================================

#define BASE_UV_SCALE 1.1          // UV zoom — larger zooms out, showing more space around planet.
                                   // Automatically scaled up on portrait/mobile to prevent clipping.

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    const vec3 LIGHT_DIR = normalize(vec3(0.5, 1.0, 0.8));  // Sun direction (upper-right-forward)
    const vec3 ATMOS_COL = vec3(0.7, 0.15, 0.02);         // Atmosphere tint — sulfurous orange-red haze
    const vec3 RIM_COL = vec3(1.0, 0.4, 0.05);            // Hot atmospheric rim — bright orange for thermal glow

    // Map window to -1..1, planet has r=1
    // Responsive UV scale: zoom out on portrait screens to keep planet fully visible
    float uvScale = BASE_UV_SCALE / min(1.0, iResolution.x / iResolution.y);
    vec2 uv = uvScale * (2.0 * fragCoord.xy - iResolution.xy) / iResolution.y;

    float z2 = 1.0 - uv.x * uv.x - uv.y * uv.y;
    if (z2 >= 0.0) {
        // Unit sphere
        vec3 pos = vec3(uv, sqrt(z2));
        vec3 normal = pos;

        // Auto rotation
        vec3 noisePos = pos;
        float surfaceRot = -0.06 * iTime;
        noisePos.xz = Rotate(noisePos.xz, surfaceRot);

        // Surface normal via finite difference on crust height
        float height = crustHeight(noisePos);
        vec3 tangent = normalize(cross(noisePos, vec3(0.0, 1.0, 0.0)));
        vec3 binormal = cross(noisePos, tangent);
        const float DX = 0.01;              // Finite-difference step for normal computation — smaller = sharper but noisier
        const float HEIGHT_SCALE = 0.08;   // Normal perturbation amplitude — higher = bumpier crust terrain
        float he = height * HEIGHT_SCALE;
        float tangentW = (he - HEIGHT_SCALE * crustHeight(noisePos + DX * tangent)) / DX;
        float binormalW = (he - HEIGHT_SCALE * crustHeight(noisePos + DX * binormal)) / DX;
        vec3 surfNormal = normalize(noisePos + tangent * tangentW + binormal * binormalW);
        surfNormal.xz = Rotate(surfNormal.xz, -surfaceRot);
        normal = normalize(mix(surfNormal, pos, 0.9));

        // Compute lava heat and map to color
        float heat = lavaHeat(noisePos, iTime);
        vec3 surfaceColor = lavaRamp(heat);

        // Lighting — diffuse on crust, emission from hot areas
        float diffuse = 0.05 + clamp(dot(normal, LIGHT_DIR), 0.0, 1.0);

        // Dark crust is lit by the sun; hot areas emit their own light
        vec3 litCrust = surfaceColor * diffuse;
        vec3 emission = surfaceColor * heat * heat * 2.0;
        fragColor.rgb = mix(litCrust, litCrust + emission, heat);

        // TECHNIQUE: Rim glow simulating hot atmospheric haze at limb
        // pow(1-z, 1.5) approximates long optical path through volcanic atmosphere
        float rim = pow(1.0 - pos.z, 1.5);     // Exponent 1.5 — steeper = thinner rim
        fragColor.rgb += RIM_COL * rim * 0.8;

        // Atmosphere edge blend
        vec3 atmosCol = ATMOS_COL * clamp(0.7 * diffuse + 0.05, 0.0, 1.0);
        fragColor.rgb = mix(fragColor.rgb, atmosCol, smoothstep(0.993, 1.0, length(uv)));
        fragColor.rgb += ATMOS_COL * rim * 0.4;
    }
    // Off sphere — atmospheric halo
    else {
        float dist = length(uv);
        vec3 dir = normalize(vec3(uv, 1.0));
        float halo = smoothstep(1.3, 0.95, dist);
        float lightFacing = clamp(dot(dir, LIGHT_DIR), 0.0, 1.0);
        fragColor.rgb = ATMOS_COL * halo * lightFacing * 1.5;
    }

    // Gamma — 0.9 exponent (slightly less than standard 0.45) to preserve
    // contrast in the dark crust while boosting lava glow visibility
    fragColor.rgb = pow(fragColor.rgb, vec3(0.9));
    fragColor.a = 1.0;
}
`},channels:{}},{slug:"planet-neptune-like",title:"Neptune-like",description:"A Neptune-like ice giant with colorful banded atmosphere, turbulent storms, and dramatic lighting. Fully procedural with no texture dependencies.",date:"2025-11-27",tags:["exoplanets","space","3d"],links:{},screenshotUrl:Tf,passes:{image:`/**
 * Neptune-like Ice Giant
 * @author guinetik
 * @date 2025-11-27
 *
 * A Neptune-like ice giant planet with colorful banded atmosphere, turbulent
 * storms, and dramatic lighting. Fully procedural with no texture dependencies.
 *
 * Based on the exoplanets study shader by guinetik.
 * Stripped down to a single planet — no star, moons, or rings.
 *
 * Rendering layers (front to back):
 *   1. Banded atmosphere — FBM-driven color bands stretched along latitude,
 *      with seed-based HSV palette for consistent hue across runs
 *   2. Storm features   — high-frequency 1D FBM along latitude creates
 *      localized bright storm ovals
 *   3. Specular highlight — Blinn-Phong half-vector specular tinted by
 *      atmosphere color
 *   4. Atmosphere limb   — Fresnel-like rim glow at the sphere edge
 *   5. Halo              — off-sphere atmospheric glow for background
 *
 * TECHNIQUE: Analytic unit-sphere projection — planet rendered as a unit sphere
 * with z derived from the Pythagorean identity. No raymarching needed.
 *
 * TECHNIQUE: Anisotropic band scaling. The 3D noise input is scaled with
 * vec3(0.05, 1.0, 0.05), compressing X/Z to stretch features into horizontal
 * bands while preserving vertical (latitudinal) variation. Small turbulence
 * displacement (bandTurbulence) breaks up perfect stripes.
 *
 * Noise: Hash-based 3D noise with a decorrelation matrix (const mat3 m) applied
 * between FBM octaves. The matrix rotates and scales the domain to eliminate
 * axis-aligned artifacts that would otherwise create visible grid lines on
 * the planetary bands. 5-octave FBM provides detail from broad belt structure
 * down to fine turbulent wisps.
 */

const float tau = 6.283185;  // 2*PI — full circle in radians

// =============================================================================
// HASH & NOISE
// =============================================================================
// Noise: Hash-based value noise using PCG-style integer hashing (fract of
// polynomial). Produces uniform distribution without the precision issues of
// sin-based hashing on some GPUs.

float hash1(float p) {
    p = fract(p * 0.1031);
    p *= p + 33.33;
    p *= p + p;
    return fract(p);
}

vec3 hash3(vec3 p3) {
    p3 = fract(p3 * vec3(0.1031, 0.1030, 0.0973));
    p3 += dot(p3, p3.yxz + 33.33);
    return fract((p3.xxy + p3.yxx) * p3.zyx);
}

vec4 hash4(float p) {
    vec4 p4 = fract(vec4(p) * vec4(0.1031, 0.1030, 0.0973, 0.1099));
    p4 += dot(p4, p4.wzxy + 33.33);
    return fract((p4.xxyz + p4.yzzw) * p4.zywx);
}

float noise1(float p) {
    float i = floor(p);
    float f = fract(p);
    float u = f * f * (3.0 - 2.0 * f);
    return 1.0 - 2.0 * mix(hash1(i), hash1(i + 1.0), u);
}

vec3 noise3(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return 1.0 - 2.0 * mix(
        mix(mix(hash3(i + vec3(0.0, 0.0, 0.0)),
                hash3(i + vec3(1.0, 0.0, 0.0)), u.x),
            mix(hash3(i + vec3(0.0, 1.0, 0.0)),
                hash3(i + vec3(1.0, 1.0, 0.0)), u.x), u.y),
        mix(mix(hash3(i + vec3(0.0, 0.0, 1.0)),
                hash3(i + vec3(1.0, 0.0, 1.0)), u.x),
            mix(hash3(i + vec3(0.0, 1.0, 1.0)),
                hash3(i + vec3(1.0, 1.0, 1.0)), u.x), u.y), u.z);
}

float fbm1(float p) {
    float f = noise1(p); p = 2.0 * p;
    f += 0.5 * noise1(p); p = 2.0 * p;
    f += 0.25 * noise1(p); p = 2.0 * p;
    f += 0.125 * noise1(p); p = 2.0 * p;
    f += 0.0625 * noise1(p);
    return f / 1.9375;
}

// Decorrelation matrix for 3D FBM — rotates and scales domain between octaves
// to eliminate axis-aligned artifacts. The non-orthogonal entries create
// a pseudo-random rotation that prevents visible grid lines in the bands.
const mat3 m = mat3(0.51162, -1.54702, 1.15972,
                    -1.70666, -0.92510, -0.48114,
                     0.90858, -0.86654, -1.55678);

vec3 fbm3(vec3 p) {
    vec3 f = noise3(p); p = m * p;
    f += 0.5 * noise3(p); p = m * p;
    f += 0.25 * noise3(p); p = m * p;
    f += 0.125 * noise3(p); p = m * p;
    f += 0.0625 * noise3(p);
    return f / 1.9375;
}

vec3 hsv(float hue, float sat, float val) {
    return val * (vec3(1.0 - sat) + sat * (0.5 + 0.5 * cos(6.2831853 * (vec3(hue) + vec3(0.0, 0.33, 0.67)))));
}

// =============================================================================
// UTILITY
// =============================================================================

vec2 Rotate(vec2 p, float a) {
    return p * cos(a) + vec2(-p.y, p.x) * sin(a);
}

// =============================================================================
// MAIN
// =============================================================================

#define BASE_UV_SCALE 1.1          // UV zoom — larger zooms out, showing more space around planet.
                                   // Automatically scaled up on portrait/mobile to prevent clipping.

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    const vec3 LIGHT_DIR = normalize(vec3(0.5, 1.0, 1.0));  // Sun direction (upper-right)

    // Fixed seed for consistent gas giant look — changing this value generates
    // a completely different color palette and band pattern
    const float seed = 3.7;

    // Planet visual properties
    float bandScale = 4.5;          // Number of atmospheric bands — higher = more/thinner bands
    float bandTurbulence = 0.04;    // FBM displacement of bands — higher = wavier band edges

    // TECHNIQUE: Seed-based HSV palette generation. The seed is hashed to derive
    // a base hue, then minor color axes are offset in hue/sat/val to create
    // coherent but varied color bands when mixed by the 3-channel FBM.
    vec4 planetHash = hash4(seed + 0.3);
    vec3 planetColor = hsv(planetHash.x, 0.5, 0.5 + 0.2 * planetHash.y);          // Base band color
    vec3 planetMinorX = hsv(planetHash.x, 0.3, 0.5 + 0.2 * planetHash.y + 0.3 * planetHash.w) - planetColor;  // Band variation axis X
    vec3 planetMinorY = hsv(planetHash.x + 0.4 * planetHash.z, 0.5, 0.5 + 0.2 * planetHash.y) - planetColor;  // Band variation axis Y
    vec3 planetMinorZ = hsv(planetHash.x + 0.4 * planetHash.z, 0.3, 0.5 + 0.2 * planetHash.y - 0.4 * planetHash.w) - planetColor; // Band variation axis Z

    // Atmospheric glow color — derived from same hue family for consistency
    vec3 atmosColor = hsv(planetHash.x, 0.3, 0.7);

    // Map window to -1..1, planet has r=1
    // Responsive UV scale: zoom out on portrait screens to keep planet fully visible
    float uvScale = BASE_UV_SCALE / min(1.0, iResolution.x / iResolution.y);
    vec2 uv = uvScale * (2.0 * fragCoord.xy - iResolution.xy) / iResolution.y;

    float z2 = 1.0 - uv.x * uv.x - uv.y * uv.y;
    if (z2 >= 0.0) {
        // Unit sphere
        vec3 pos = vec3(uv, sqrt(z2));
        vec3 normal = pos;

        // Auto rotation
        vec3 noisePos = pos;
        float surfaceRot = -0.08 * iTime;   // Rotation speed — negative = eastward spin
        noisePos.xz = Rotate(noisePos.xz, surfaceRot);

        // Use Y (screen vertical) as latitude for horizontal bands
        // Add slight turbulence to break up perfect stripes
        vec3 p = noisePos;
        p += bandTurbulence * fbm3(10.0 * p);  // Turbulence displacement — breaks geometric perfection

        // TECHNIQUE: Anisotropic band scaling — vec3(0.05, 1.0, 0.05) compresses
        // X and Z by 20x, stretching features into horizontal bands while keeping
        // latitudinal variation at full resolution
        vec3 bands = fbm3(bandScale * vec3(0.05, 1.0, 0.05) * p + seed);
        vec3 color = planetColor;
        color += planetMinorX * bands.x;
        color += planetMinorY * bands.y;
        color += planetMinorZ * bands.z;

        // Storm features — large oval spots at certain latitudes
        float stormNoise = fbm1(8.0 * p.y + seed);
        float storm = smoothstep(0.6, 0.8, stormNoise) * 0.3;
        color = mix(color, color * 1.5 + vec3(0.1), storm);

        // Lighting — Blinn-Phong with atmosphere-tinted specular
        float diffuse = 0.05 + clamp(dot(normal, LIGHT_DIR), 0.0, 1.0);  // 0.05 ambient floor
        vec3 lightViewHalf = normalize(LIGHT_DIR + vec3(0.0, 0.0, 1.0)); // Half-vector (view is +Z)
        float specular = 0.15 * pow(clamp(dot(normal, lightViewHalf), 0.0, 1.0), 20.0); // Exponent 20 = mild gloss
        fragColor.rgb = diffuse * color * 2.0 + atmosColor * specular;   // 2x color boost for HDR vibrancy

        // TECHNIQUE: Fresnel-like atmospheric rim — intensifies at limb where
        // optical path through the atmosphere is longest
        vec3 atmosCol = atmosColor * clamp(0.7 * diffuse + 0.05, 0.0, 1.0);
        fragColor.rgb = mix(fragColor.rgb, 0.6 * atmosCol, smoothstep(0.993, 1.0, length(uv))); // Edge antialias
        fragColor.rgb += pow(1.0 - pos.z, 1.2) * atmosCol * 0.8;  // Rim glow — exponent 1.2, 80% intensity
    }
    // Off sphere — atmospheric halo
    else {
        float dist = length(uv);
        vec3 dir = normalize(vec3(uv, 1.0));
        float halo = smoothstep(1.3, 0.95, dist);
        float lightFacing = clamp(dot(dir, LIGHT_DIR), 0.0, 1.0);
        fragColor.rgb = atmosColor * halo * lightFacing * 0.5;
    }

    fragColor.a = 1.0;
}
`},channels:{}},{slug:"plasma",title:"Perlin Plasma Study",description:"Classic demoscene plasma effect enhanced with Perlin noise for organic turbulence. Multiple sine wave interference patterns warped through FBM noise create flowing psychedelic color fields.",date:"2026-01-30",tags:["10-days","procedural","noise"],links:{},screenshotUrl:_f,passes:{image:`/**\r
 * Perlin Plasma Study\r
 * @author guinetik\r
 * @date 2026-01-30\r
 *\r
 * Classic demoscene plasma enhanced with 3D Perlin gradient noise\r
 * for organic turbulence. Multiple sine wave interference patterns\r
 * warped through FBM noise create flowing psychedelic color fields.\r
 *\r
 * Plasma Techniques:\r
 * - True 3D Perlin gradient noise\r
 * - Classic demoscene sine plasma\r
 * - Noise-warped interference patterns\r
 *\r
 * Visual Features:\r
 * - Organic flowing color fields\r
 * - Smoother gradients than value noise\r
 * - Blends with input texture\r
 */\r
\r
#define PI 3.14159265359\r
#define TAU 6.28318530718\r
\r
/**\r
 * 3D Hash for gradient vectors\r
 */\r
vec3 hash3(vec3 p) {\r
    p = vec3(\r
        dot(p, vec3(127.1, 311.7, 213.6)),\r
        dot(p, vec3(327.1, 211.7, 113.6)),\r
        dot(p, vec3(269.5, 183.3, 351.1))\r
    );\r
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);\r
}\r
\r
/**\r
 * True 3D Perlin Gradient Noise\r
 * Interpolates gradient dot products for smoother results\r
 */\r
float perlin3D(vec3 p) {\r
    vec3 i = floor(p);\r
    vec3 f = fract(p);\r
\r
    // Quintic interpolation for C2 continuity (smoother than cubic)\r
    vec3 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);\r
\r
    return mix(\r
        mix(\r
            mix(dot(hash3(i + vec3(0, 0, 0)), f - vec3(0, 0, 0)),\r
                dot(hash3(i + vec3(1, 0, 0)), f - vec3(1, 0, 0)), u.x),\r
            mix(dot(hash3(i + vec3(0, 1, 0)), f - vec3(0, 1, 0)),\r
                dot(hash3(i + vec3(1, 1, 0)), f - vec3(1, 1, 0)), u.x),\r
            u.y),\r
        mix(\r
            mix(dot(hash3(i + vec3(0, 0, 1)), f - vec3(0, 0, 1)),\r
                dot(hash3(i + vec3(1, 0, 1)), f - vec3(1, 0, 1)), u.x),\r
            mix(dot(hash3(i + vec3(0, 1, 1)), f - vec3(0, 1, 1)),\r
                dot(hash3(i + vec3(1, 1, 1)), f - vec3(1, 1, 1)), u.x),\r
            u.y),\r
        u.z);\r
}\r
\r
/**\r
 * Perlin FBM - layered gradient noise\r
 * 5 octaves with standard lacunarity 2.0 and gain 0.5:\r
 *   - Each octave doubles spatial frequency (p *= 2.0)\r
 *   - Each octave halves amplitude (a *= 0.5)\r
 *   - This 1/f weighting produces natural-looking turbulence\r
 */\r
float perlinFBM(vec3 p) {\r
    float v = 0.0;\r
    float a = 0.5;\r
    for (int i = 0; i < 5; i++) {\r
        v += a * perlin3D(p);\r
        p *= 2.0;  // lacunarity: double frequency each octave\r
        a *= 0.5;  // gain: halve amplitude each octave\r
    }\r
    return v;\r
}\r
\r
/**\r
 * Classic plasma + Perlin turbulence\r
 */\r
float plasma(vec2 p, float time) {\r
    float v = 0.0;\r
\r
    // Classic sine waves\r
    v += sin(p.x * 3.0 + time);\r
    v += sin(p.y * 2.7 + time * 1.3);\r
    v += sin((p.x + p.y) * 2.5 + time * 0.7);\r
    v += sin(length(p) * 4.0 - time * 1.5);\r
\r
    // Moving center ripple\r
    vec2 center = vec2(sin(time * 0.5), cos(time * 0.7)) * 0.5;\r
    v += sin(length(p - center) * 5.0 + time);\r
\r
    // ADD PERLIN: 3D noise traveling through time\r
    vec3 noiseCoord = vec3(p * 1.5, time * 0.4);\r
    v += perlin3D(noiseCoord) * 2.0;\r
\r
    // ADD PERLIN: Turbulent FBM layer\r
    v += perlinFBM(vec3(p * 0.8, time * 0.3)) * 1.5;\r
\r
    return v / 7.0;\r
}\r
\r
/**\r
 * Perlin-warped coordinates\r
 * Distorts the plasma field organically\r
 */\r
vec2 perlinWarp(vec2 p, float time) {\r
    vec3 np = vec3(p * 2.0, time * 0.25);\r
\r
    return p + vec2(\r
        perlin3D(np),\r
        perlin3D(np + vec3(5.2, 1.3, 2.7))\r
    ) * 0.3;\r
}\r
\r
/**\r
 * Psychedelic rainbow palette\r
 */\r
vec3 plasmaColor(float v, float time) {\r
    return vec3(\r
        sin(v * PI + time * 0.5),\r
        sin(v * PI + time * 0.5 + TAU / 3.0),\r
        sin(v * PI + time * 0.5 + TAU * 2.0 / 3.0)\r
    ) * 0.5 + 0.5;\r
}\r
\r
/**\r
 * Hot plasma palette\r
 */\r
vec3 hotPlasma(float v) {\r
    v = v * 0.5 + 0.5;\r
    vec3 color = mix(vec3(0.0, 0.0, 0.2), vec3(0.5, 0.0, 0.5), smoothstep(0.0, 0.25, v));\r
    color = mix(color, vec3(1.0, 0.2, 0.0), smoothstep(0.25, 0.5, v));\r
    color = mix(color, vec3(1.0, 0.8, 0.0), smoothstep(0.5, 0.75, v));\r
    color = mix(color, vec3(1.0, 1.0, 0.9), smoothstep(0.75, 1.0, v));\r
    return color;\r
}\r
\r
/**\r
 * Electric palette\r
 */\r
vec3 electricPlasma(float v, float time) {\r
    v = v * 0.5 + 0.5;\r
    vec3 c1 = vec3(0.0, 0.1, 0.2);\r
    vec3 c2 = vec3(0.0, 0.5, 0.8);\r
    vec3 c3 = vec3(0.8, 0.2, 0.8);\r
    vec3 c4 = vec3(1.0, 1.0, 1.0);\r
\r
    vec3 color = mix(c1, c2, smoothstep(0.0, 0.33, v));\r
    color = mix(color, c3, smoothstep(0.33, 0.66, v));\r
    color = mix(color, c4, smoothstep(0.66, 1.0, v));\r
    color *= 0.8 + 0.2 * sin(v * 10.0 + time * 2.0);\r
    return color;\r
}\r
\r
void mainImage(out vec4 fragColor, in vec2 fragCoord)\r
{\r
    vec2 uv = fragCoord / iResolution.xy;\r
    float aspect = iResolution.x / iResolution.y;\r
    float time = iTime;\r
\r
    // Centered aspect-corrected\r
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0) * 2.0;\r
\r
    // === PERLIN WARP THE COORDINATES ===\r
    vec2 warped = perlinWarp(p, time);\r
\r
    // === GENERATE PLASMA ===\r
    float v1 = plasma(warped, time);\r
    float v2 = plasma(warped * 0.7 + 10.0, time * 0.8);\r
    float combined = v1 * 0.6 + v2 * 0.4;\r
\r
    // === EXTRA PERLIN DETAIL ===\r
    // High-frequency Perlin adds fine organic texture\r
    float detail = perlin3D(vec3(warped * 4.0, time * 0.6)) * 0.15;\r
    combined += detail;\r
\r
    // === COLOR ===\r
    float paletteTime = mod(time * 0.1, 3.0);\r
    vec3 plasmaCol;\r
\r
    if (paletteTime < 1.0) {\r
        plasmaCol = plasmaColor(combined, time);\r
    } else if (paletteTime < 2.0) {\r
        plasmaCol = hotPlasma(combined);\r
    } else {\r
        plasmaCol = electricPlasma(combined, time);\r
    }\r
\r
    // === BLEND WITH TEXTURE ===\r
    vec3 texColor = texture(iChannel0, uv).rgb;\r
    vec3 color;\r
\r
    if (length(texColor) > 0.01) {\r
        vec3 overlay = mix(\r
            2.0 * texColor * plasmaCol,\r
            1.0 - 2.0 * (1.0 - texColor) * (1.0 - plasmaCol),\r
            step(0.5, texColor)\r
        );\r
        color = mix(texColor, overlay, 0.6);\r
    } else {\r
        color = plasmaCol;\r
    }\r
\r
    // === SCANLINES ===\r
    float scanline = sin(uv.y * 400.0) * 0.03;\r
    color -= scanline;\r
\r
    // === POST ===\r
    color += plasmaCol * 0.1;\r
    float vig = 1.0 - length(uv - 0.5) * 0.5;\r
    color *= vig;\r
\r
    fragColor = vec4(color, 1.0);\r
}\r
`},channels:{}},{slug:"ripples",title:"Perlin Ripples Study",description:"Chaotic liquid surface with multiple wandering ripple sources that move unpredictably through noise space. Each source has randomized parameters and pulsing intensity. Sudden burst ripples spawn randomly. Turbulent noise adds extra chaos.",date:"2026-01-30",tags:["10-days","procedural","noise"],links:{},screenshotUrl:Af,passes:{image:`/**\r
 * Perlin Ripples Study\r
 * @author guinetik\r
 * @date 2026-01-30\r
 *\r
 * Chaotic liquid surface with multiple wandering ripple sources\r
 * that move unpredictably through noise space. Each source has\r
 * randomized parameters and pulsing intensity.\r
 *\r
 * Perlin Ripple Techniques:\r
 * - 3D gradient noise for smooth animation\r
 * - Chaotic multi-source ripple interference\r
 * - Turbulent displacement layers\r
 *\r
 * Visual Features:\r
 * - Unpredictable liquid surface\r
 * - Wandering ripple sources\r
 * - Colors sampled from displaced texture\r
 */\r
\r
#define PI 3.14159265359\r
\r
/**\r
 * 3D Hash for gradient noise\r
 */\r
vec3 hash3(vec3 p) {\r
    p = vec3(\r
        dot(p, vec3(127.1, 311.7, 213.6)),\r
        dot(p, vec3(327.1, 211.7, 113.6)),\r
        dot(p, vec3(269.5, 183.3, 351.1))\r
    );\r
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);\r
}\r
\r
/**\r
 * Simple hash for randomness\r
 */\r
float hash(float n) {\r
    return fract(sin(n) * 43758.5453);\r
}\r
\r
/**\r
 * 3D Gradient Noise (Perlin-style)\r
 */\r
float noise3D(vec3 p) {\r
    vec3 i = floor(p);\r
    vec3 f = fract(p);\r
    vec3 u = f * f * (3.0 - 2.0 * f);\r
\r
    return mix(\r
        mix(\r
            mix(dot(hash3(i + vec3(0, 0, 0)), f - vec3(0, 0, 0)),\r
                dot(hash3(i + vec3(1, 0, 0)), f - vec3(1, 0, 0)), u.x),\r
            mix(dot(hash3(i + vec3(0, 1, 0)), f - vec3(0, 1, 0)),\r
                dot(hash3(i + vec3(1, 1, 0)), f - vec3(1, 1, 0)), u.x),\r
            u.y),\r
        mix(\r
            mix(dot(hash3(i + vec3(0, 0, 1)), f - vec3(0, 0, 1)),\r
                dot(hash3(i + vec3(1, 0, 1)), f - vec3(1, 0, 1)), u.x),\r
            mix(dot(hash3(i + vec3(0, 1, 1)), f - vec3(0, 1, 1)),\r
                dot(hash3(i + vec3(1, 1, 1)), f - vec3(1, 1, 1)), u.x),\r
            u.y),\r
        u.z);\r
}\r
\r
void mainImage(out vec4 fragColor, in vec2 fragCoord)\r
{\r
    vec2 uv = fragCoord / iResolution.xy;\r
    float aspect = iResolution.x / iResolution.y;\r
    float time = iTime;\r
\r
    vec2 p = uv - 0.5;\r
    p.x *= aspect;\r
\r
    // === CHAOTIC RIPPLE SOURCES ===\r
    // Multiple wandering points that emit ripples\r
    float totalRipple = 0.0;\r
    vec2 totalDisplace = vec2(0.0);\r
\r
    for (int i = 0; i < 6; i++) {\r
        float fi = float(i);\r
        // Seed offset per source — 73.156 is an arbitrary irrational-ish\r
        // constant that spaces sources far apart in noise space, avoiding\r
        // correlated motion between emitters\r
        float seed = fi * 73.156;\r
\r
        // Each source wanders unpredictably using noise\r
        vec2 sourcePos = vec2(\r
            noise3D(vec3(time * 0.3 + seed, fi * 1.7, 0.0)),\r
            noise3D(vec3(fi * 2.3, time * 0.25 + seed, 1.0))\r
        ) * 0.8;\r
\r
        // Distance to this source\r
        float dist = length(p - sourcePos);\r
\r
        // Ripple with unique frequency, speed, and phase\r
        // Hash seeds (5.1, 7.3, 11.7) are coprime-ish multipliers that\r
        // ensure each source gets decorrelated freq/speed/phase values\r
        float freq = 15.0 + hash(fi * 5.1) * 20.0;   // 15-35 Hz range\r
        float speed = 2.0 + hash(fi * 7.3) * 3.0;     // 2-5 propagation speed\r
        float phase = hash(fi * 11.7) * 6.28;          // random initial phase\r
\r
        float ripple = sin(dist * freq - time * speed + phase);\r
\r
        // Irregular decay - not smooth falloff\r
        float decay = 1.0 / (1.0 + dist * (3.0 + hash(fi * 3.3) * 4.0));\r
        decay *= 0.5 + 0.5 * sin(time * (0.5 + hash(fi * 9.1)) + fi);\r
\r
        ripple *= decay;\r
        totalRipple += ripple;\r
\r
        // Displacement toward/away from source\r
        vec2 dir = normalize(p - sourcePos + 0.001);\r
        totalDisplace += dir * ripple * 0.015;\r
    }\r
\r
    // === TURBULENT NOISE LAYER ===\r
    // Add chaotic 3D noise displacement\r
    vec3 noisePos = vec3(p * 4.0, time * 0.4);\r
    float turb1 = noise3D(noisePos);\r
    float turb2 = noise3D(noisePos * 2.3 + 100.0);\r
\r
    totalDisplace += vec2(turb1, turb2) * 0.03;\r
\r
    // === SUDDEN BURSTS ===\r
    // Occasional random strong ripples\r
    float burstPhase = floor(time * 0.5);\r
    float burstT = fract(time * 0.5);\r
    vec2 burstPos = vec2(\r
        hash(burstPhase * 17.1) - 0.5,\r
        hash(burstPhase * 23.7) - 0.5\r
    ) * 0.6;\r
    float burstDist = length(p - burstPos);\r
    float burst = sin(burstDist * 25.0 - burstT * 15.0);\r
    burst *= smoothstep(0.5, 0.0, burstT);\r
    burst *= smoothstep(0.6, 0.0, burstDist);\r
    totalDisplace += normalize(p - burstPos + 0.001) * burst * 0.025;\r
\r
    // === SAMPLE TEXTURE ===\r
    vec2 displacedUV = uv + totalDisplace;\r
    displacedUV = clamp(displacedUV, 0.001, 0.999);\r
\r
    vec3 color = texture(iChannel0, displacedUV).rgb;\r
\r
    // Fallback if no texture\r
    if (length(texture(iChannel0, vec2(0.5)).rgb) < 0.01) {\r
        // Chaotic liquid visualization\r
        float pattern = totalRipple * 0.3 + 0.5;\r
        pattern += turb1 * 0.2 + turb2 * 0.15;\r
\r
        // Shifting color palette\r
        float hue = pattern * 0.5 + time * 0.05;\r
        vec3 col1 = vec3(0.1, 0.1, 0.2);\r
        vec3 col2 = 0.5 + 0.5 * cos(6.28 * (hue + vec3(0.0, 0.33, 0.67)));\r
\r
        color = mix(col1, col2, smoothstep(0.2, 0.8, pattern));\r
\r
        // Bright interference lines\r
        float interference = abs(fract(totalRipple * 2.0) - 0.5) * 2.0;\r
        interference = pow(interference, 8.0);\r
        color += vec3(0.8, 0.9, 1.0) * interference * 0.5;\r
    }\r
\r
    // === REFRACTION BRIGHTNESS ===\r
    float refract = length(totalDisplace) * 20.0;\r
    color *= 1.0 + refract * 0.5;\r
\r
    // === SPECULAR FLASHES ===\r
    float spec = pow(max(0.0, totalRipple), 6.0) * 0.4;\r
    color += vec3(1.0) * spec;\r
\r
    // === POST ===\r
    float vig = 1.0 - length(uv - 0.5) * 0.4;\r
    color *= vig;\r
\r
    fragColor = vec4(color, 1.0);\r
}\r
`},channels:{image:{iChannel0:"textures/landscape.jpeg"}}},{slug:"rossler",title:"Attractor Study #03: Rossler",description:"Rössler strange attractor (1976), a single-scroll spiral with chaotic z-foldback. Distance-field line tracing with feedback accumulation. Velocity-mapped HSL coloring, hue shift, blink pulses, and click-drag orbit.",date:"2026-02-11",tags:["attractors","simulation","3d","interactive"],links:{},screenshotUrl:Rf,passes:{image:`/**\r
 * Attractor Study #03: Rossler — Image Pass\r
 * @author guinetik\r
 * @date 2026-02-11\r
 *\r
 * Composite pass for the Rossler attractor. Reads the accumulated trail from\r
 * Buffer A, applies filmic tone-mapping and a soft vignette for final display.\r
 */\r
\r
// TECHNIQUE: Filmic tone-mapping via exponential exposure\r
// The formula col = 1 - exp(-col * EXPOSURE) compresses HDR accumulation\r
// from the buffer into displayable [0,1] range while preserving bright detail.\r
#define EXPOSURE 2.5        // Tone-map strength — higher values brighten midtones\r
                            // and compress highlights. Below 1.0: dim/flat. Above 4.0: washed out.\r
#define VIGNETTE_STRENGTH 0.3  // Darkening at screen edges — 0.0 = none, 0.5 = heavy.\r
\r
void mainImage(out vec4 fragColor, in vec2 fragCoord) {\r
    vec2 uv = fragCoord.xy / iResolution.xy;\r
    vec3 col = texture(iChannel0, uv).rgb;\r
    col = 1.0 - exp(-col * EXPOSURE);\r
    float vig = 1.0 - VIGNETTE_STRENGTH * length(uv - 0.5);\r
    col *= vig;\r
    fragColor = vec4(col, 1.0);\r
}\r
`,bufferA:`/**\r
 * Attractor Study #03: Rossler — Buffer A (Simulation + Trail Rendering)\r
 * @author guinetik\r
 * @date 2026-02-11\r
 *\r
 * Simulates the Rossler attractor (1976, Otto Rossler), a minimal three-variable\r
 * system that produces a single-scroll spiral with periodic z-axis foldback bursts.\r
 * 8 particles with per-particle parameter variation trace the attractor with\r
 * distance-field line rendering and feedback accumulation. Stochastic respawn\r
 * dynamics continuously regenerate particles for organic renewal without hard\r
 * cycle cuts. Velocity-mapped HSL coloring (yellow-orange to purple) with\r
 * per-particle intensity modulation and blink pulses.\r
 *\r
 * Rossler attractor equations:\r
 *   dx/dt = -y - z\r
 *   dy/dt = x + a*y\r
 *   dz/dt = b + z*(x - c)\r
 * Parameters: a=0.2, b=0.2, c=5.7 (classic single-scroll chaotic regime)\r
 *\r
 * The z-equation creates the characteristic "foldback" spike: when x exceeds c,\r
 * z grows exponentially, then reinjection occurs as the trajectory spirals back.\r
 */\r
\r
// === STATE LAYOUT (buffer-a, self-feedback via iChannel0) ===\r
// Pixels (0..7, 0):       Particle positions (xyz). Respawn on escape or by random chance.\r
// Pixel (PARTICLES, 0):   Camera state — xy = rotation offsets, zw = last mouse.\r
// All other pixels:       Accumulated trail color (RGB). Faded each frame by FADE.\r
\r
// ── Integration & rendering ──\r
#define PARTICLES 8        // Number of simultaneous particles — each gets slight parameter\r
                           // variation for orbit separation. More = denser but heavier.\r
#define STEPS 50.0        // Euler steps per particle per frame — more = longer trail segment.\r
                           // Below 30: sparse. Above 200: GPU cost grows (PARTICLES * STEPS).\r
#define BASE_VIEW_SCALE 0.045  // Base 3D-to-screen scale — smaller zooms out, larger zooms in.\r
                               // Automatically scaled down on portrait/mobile screens.\r
#define SPEED 0.8          // Time-step multiplier — higher = faster traversal.\r
#define INTENSITY 0.50     // Base brightness per segment — kept low since 8 particles overlap.\r
#define FADE 0.990         // Trail persistence per frame — closer to 1.0 = longer trails.\r
                           // Below 0.98: trails vanish quickly. Above 0.999: ghosting.\r
#define FOCUS 2.0          // Distance-field softness (pixels) — smaller = thinner lines.\r
\r
// ── Stochastic respawn — individual particles reset randomly for continuous renewal ──\r
#define RESPAWN_CHANCE 0.025   // Per-particle per-frame probability of random respawn.\r
                               // Higher = more frequent refreshes. 0.0 = only respawn on escape.\r
                               // At 0.02, each particle respawns roughly every 50 frames (~0.8s at 60fps).\r
#define ESCAPE_RADIUS 50.0     // Particles beyond this distance are respawned immediately.\r
                               // The Rossler attractor stays within ~30 units for classic params.\r
\r
// ── 3D view rotation defaults (radians) ──\r
#define DEFAULT_ROT_X 1.0      // Initial pitch — tilted forward to reveal the z-axis spike.\r
#define DEFAULT_ROT_Y 0.2      // Initial yaw — slight side rotation for depth perception.\r
#define MOUSE_SENSITIVITY 3.0  // Drag-to-rotate speed.\r
\r
// Attractor 3D center — offset to keep the spiral centered on screen.\r
// The Rossler attractor orbits roughly around (0, -3, 5) for these parameters.\r
vec3 center3d = vec3(0.0, -3.0, 5.0);\r
\r
// ── Color settings — yellow-orange to purple palette ──\r
#define MIN_HUE 40.0       // Hue for fastest velocity (yellow-orange).\r
#define MAX_HUE 280.0      // Hue for slowest velocity (purple-magenta).\r
#define MAX_SPEED 20.0     // Velocity clamp for hue mapping.\r
#define HUE_SHIFT_SPEED 10.0  // Degrees/sec of continuous hue rotation.\r
#define SATURATION 0.85    // Base color saturation.\r
#define LIGHTNESS 0.55     // Base HSL lightness.\r
\r
// ── Blink settings — random brightness pulses ──\r
#define BLINK_FREQ 8.0         // Pulse rate (Hz).\r
#define BLINK_INTENSITY 1.8    // Brightness multiplier during blink peak.\r
#define BLINK_SAT_BOOST 1.3    // Saturation boost during blink.\r
#define BLINK_LIT_BOOST 1.4    // Lightness boost during blink.\r
\r
// ── Rossler parameters (classic single-scroll chaotic regime) ──\r
// a: controls the speed of spiral growth in the xy-plane.\r
// b: sets the minimal z-injection rate. Small but critical for reinjection.\r
// c: threshold for the z-foldback. When x > c, z spikes upward.\r
#define PA 0.2             // Rossler 'a' — spiral growth rate. Higher = faster expansion.\r
#define PB 0.2             // Rossler 'b' — z-injection constant. Higher = more frequent spikes.\r
#define PC 5.7             // Rossler 'c' — foldback threshold. Higher = larger spiral before spike.\r
\r
// Pseudo-random hash — maps a float seed to [0, 1).\r
float hash(float n) {\r
    return fract(sin(n) * 43758.5453);\r
}\r
\r
// Forward Euler integration of the Rossler system with per-particle variation.\r
// \`pv\` is a small fractional offset (e.g. +/-5%) applied to all three parameters,\r
// giving each particle a slightly different orbit to fill the attractor volume.\r
// dx/dt = -y - z, dy/dt = x + a*y, dz/dt = b + z*(x - c)\r
vec3 integrateV(vec3 cur, float dt, float pv) {\r
    float a = PA * (1.0 + pv);\r
    float b = PB * (1.0 + pv);\r
    float c = PC * (1.0 + pv);\r
    return cur + vec3(\r
        -cur.y - cur.z,\r
        cur.x + a * cur.y,\r
        b + cur.z * (cur.x - c)\r
    ) * dt;\r
}\r
\r
// Rotation matrix around the X axis by angle \`a\` (radians).\r
mat3 rotX(float a) {\r
    float c = cos(a), s = sin(a);\r
    return mat3(1,0,0, 0,c,-s, 0,s,c);\r
}\r
\r
// Rotation matrix around the Y axis by angle \`a\` (radians).\r
mat3 rotY(float a) {\r
    float c = cos(a), s = sin(a);\r
    return mat3(c,0,s, 0,1,0, -s,0,c);\r
}\r
\r
// Project a 3D attractor point to 2D screen space.\r
// Subtracts the attractor center to keep the spiral visible on screen.\r
vec2 project(vec3 p, mat3 viewRot, float scale) {\r
    return (viewRot * (p - center3d)).xy * scale;\r
}\r
\r
// TECHNIQUE: Distance-field line segment rendering\r
// Computes the minimum distance from point \`p\` to the line segment (a, b).\r
float dfLine(vec2 a, vec2 b, vec2 p) {\r
    vec2 ab = b - a;\r
    float t = clamp(dot(p - a, ab) / dot(ab, ab), 0.0, 1.0);\r
    return distance(a + ab * t, p);\r
}\r
\r
// Convert HSL (hue in degrees, saturation, lightness) to RGB.\r
vec3 hsl2rgb(float h, float s, float l) {\r
    h = mod(h, 360.0) / 60.0;\r
    float c = (1.0 - abs(2.0 * l - 1.0)) * s;\r
    float x = c * (1.0 - abs(mod(h, 2.0) - 1.0));\r
    float m = l - c * 0.5;\r
    vec3 rgb;\r
    if      (h < 1.0) rgb = vec3(c, x, 0);\r
    else if (h < 2.0) rgb = vec3(x, c, 0);\r
    else if (h < 3.0) rgb = vec3(0, c, x);\r
    else if (h < 4.0) rgb = vec3(0, x, c);\r
    else if (h < 5.0) rgb = vec3(x, 0, c);\r
    else              rgb = vec3(c, 0, x);\r
    return rgb + m;\r
}\r
\r
void mainImage(out vec4 fragColor, in vec2 fragCoord) {\r
    vec2 res = iResolution.xy / iResolution.y;\r
    vec2 uv = fragCoord / iResolution.y;\r
    uv -= res / 2.0;\r
\r
    // Responsive scale: shrink on portrait screens to prevent horizontal clipping\r
    float viewScale = BASE_VIEW_SCALE * min(1.0, iResolution.x / iResolution.y);\r
\r
    // TECHNIQUE: Frame-persistent state via texelFetch\r
    // Camera rotation offsets and last mouse position are stored in a dedicated\r
    // pixel (PARTICLES, 0) in the self-feedback buffer and read back each frame.\r
    vec4 rotState = texelFetch(iChannel0, ivec2(PARTICLES, 0), 0);\r
    float offsetRx = rotState.x;\r
    float offsetRy = rotState.y;\r
    vec2 lastMouse = rotState.zw;\r
\r
    bool pressed = iMouse.z > 0.0;\r
    bool wasTracking = lastMouse.x >= 0.0;\r
\r
    // Accumulate rotation delta while dragging\r
    if (pressed && wasTracking) {\r
        vec2 delta = iMouse.xy - lastMouse;\r
        offsetRx -= delta.y / iResolution.y * MOUSE_SENSITIVITY;\r
        offsetRy -= delta.x / iResolution.x * MOUSE_SENSITIVITY;\r
    }\r
\r
    float rx = DEFAULT_ROT_X + offsetRx;\r
    float ry = DEFAULT_ROT_Y + offsetRy;\r
    mat3 viewRot = rotY(ry) * rotX(rx);\r
\r
    // Detect actual mouse movement for instant fade\r
    bool rotating = pressed && wasTracking && length(iMouse.xy - lastMouse) > 1.0;\r
\r
    // ── Integrate all particles, find closest line segment ──\r
    // Each of the PARTICLES particles gets +/-5% parameter variation for orbit\r
    // separation and a per-particle intensity oscillation for visual depth.\r
    float d = 1e6;         // Minimum distance from pixel to any trail segment.\r
    float bestSpeed = 0.0; // Velocity magnitude at the closest segment.\r
    float bestAlpha = 1.0; // Per-particle intensity oscillation at the closest segment.\r
    vec3 finalPos[8];      // Final position of each particle (stored back to state row).\r
\r
    for (int p = 0; p < PARTICLES; p++) {\r
        vec3 last = texelFetch(iChannel0, ivec2(p, 0), 0).xyz;\r
        vec3 next;\r
\r
        // +/-5% parameter variation per particle for orbit separation.\r
        // Each particle explores a slightly different dynamical regime.\r
        float pv = (hash(float(p) * 7.13) - 0.5) * 0.10;\r
\r
        // TECHNIQUE: Per-particle intensity modulation\r
        // Each particle oscillates brightness at its own frequency/phase,\r
        // creating a firefly-like effect where different orbits pulse independently.\r
        float pFreq = 0.3 + hash(float(p) * 3.71) * 0.7;\r
        float pPhase = hash(float(p) * 11.3) * 6.2832;\r
        float pAlpha = 0.3 + 0.7 * max(0.0, sin(iTime * pFreq + pPhase));\r
\r
        for (float i = 0.0; i < STEPS; i++) {\r
            next = integrateV(last, 0.016 * SPEED, pv);\r
\r
            float segD = dfLine(project(last, viewRot, viewScale), project(next, viewRot, viewScale), uv);\r
            if (segD < d) {\r
                d = segD;\r
                bestAlpha = pAlpha;\r
                // Recompute derivative at \`next\` for instantaneous speed (color mapping).\r
                bestSpeed = length(vec3(\r
                    -next.y - next.z,\r
                    next.x + PA * next.y,\r
                    PB + next.z * (next.x - PC)\r
                ));\r
            }\r
\r
            last = next;\r
        }\r
        finalPos[p] = next;\r
    }\r
\r
    // TECHNIQUE: Dual-layer intensity — smoothstep for soft falloff + Gaussian for bright core.\r
    // Modulated by per-particle alpha for depth variation.\r
    float c = bestAlpha * (INTENSITY / SPEED) * smoothstep(FOCUS / iResolution.y, 0.0, d);\r
    c += bestAlpha * (INTENSITY / 8.5) * exp(-1000.0 * d * d);\r
\r
    // Blink: random pulses of brightness — 30% chance each tick, sine-shaped.\r
    float blinkSeed = floor(iTime * BLINK_FREQ);\r
    float blink = hash(blinkSeed) < 0.3\r
        ? sin(fract(iTime * BLINK_FREQ) * 3.14159) : 0.0;\r
\r
    // Velocity-based color: fast regions map to MIN_HUE, slow to MAX_HUE.\r
    // Continuous hue shift over time adds temporal variety.\r
    float speedNorm = clamp(bestSpeed / MAX_SPEED, 0.0, 1.0);\r
    float hue = mod(MAX_HUE - speedNorm * (MAX_HUE - MIN_HUE) + iTime * HUE_SHIFT_SPEED, 360.0);\r
    float sat = min(1.0, SATURATION * (1.0 + blink * (BLINK_SAT_BOOST - 1.0)));\r
    float lit = min(1.0, LIGHTNESS * (1.0 + blink * (BLINK_LIT_BOOST - 1.0)));\r
    vec3 lineColor = hsl2rgb(hue, sat, lit);\r
    c *= 1.0 + blink * (BLINK_INTENSITY - 1.0);\r
\r
    // ── State persistence (row 0) & trail accumulation ──\r
    int px = int(floor(fragCoord.x));\r
    int py = int(floor(fragCoord.y));\r
    if (py == 0 && px == PARTICLES) {\r
        // Pixel (PARTICLES, 0): Camera state — rotation offsets + mouse for drag continuity.\r
        // lastMouse = -1 sentinel means "not tracking" (mouse released).\r
        vec2 storeMouse = pressed ? iMouse.xy : vec2(-1.0);\r
        fragColor = vec4(offsetRx, offsetRy, storeMouse);\r
    } else if (py == 0 && px < PARTICLES) {\r
        if (iFrame == 0) {\r
            // Initial spawn near the attractor — z kept small since the\r
            // Rossler spiral lives mostly in the xy-plane with occasional z-spikes.\r
            float seed = float(px) * 37.0;\r
            vec3 pos = vec3(\r
                (hash(seed) - 0.5) * 10.0,\r
                (hash(seed * 1.31) - 0.5) * 10.0,\r
                hash(seed * 2.17) * 0.2\r
            );\r
            fragColor = vec4(pos, 0);\r
        } else {\r
            vec3 pos = finalPos[px];\r
            // TECHNIQUE: Stochastic respawn\r
            // Particles that escape beyond ESCAPE_RADIUS are respawned, plus a small\r
            // random chance (RESPAWN_CHANCE) per frame ensures continuous renewal\r
            // even for well-behaved orbits. Prevents stale/stuck particles and keeps\r
            // the form regenerating organically without hard cycle cuts.\r
            float rng = hash(float(px) * 13.7 + iTime * 60.0);\r
            if (length(pos) > ESCAPE_RADIUS || rng < RESPAWN_CHANCE) {\r
                float seed = float(px) + iTime * 60.0;\r
                pos = vec3(\r
                    (hash(seed) - 0.5) * 10.0,\r
                    (hash(seed * 1.31) - 0.5) * 10.0,\r
                    hash(seed * 2.17) * 0.2\r
                );\r
            }\r
            fragColor = vec4(pos, 0);\r
        }\r
    } else {\r
        // Visual pixels — blend new line color onto faded previous frame.\r
        // Instant clear (fade=0) while actively rotating.\r
        vec3 prev = texelFetch(iChannel0, ivec2(fragCoord), 0).rgb;\r
        float fade = rotating ? 0.0 : FADE;\r
\r
        vec3 newCol = lineColor * c + prev * fade;\r
        fragColor = vec4(min(newCol, 1.5), 0);  // Cap at 1.5 to prevent white blowout in HDR buffer.\r
    }\r
}\r
`},channels:{image:{iChannel0:"buffer-a"},bufferA:{iChannel0:"buffer-a"}}},{slug:"signal-noise",title:"Signal / Noise",description:"A meditation on attractors, cosmic distance, and connection across void. Two pulsing signals interfere through a Lorenz attractor field, connected by a breathing filament amid cosmic dust and nebula.",date:"2026-02-11",tags:["attractors","simulation","space"],links:{},screenshotUrl:If,passes:{image:`/**
 * Signal / Noise
 * @author guinetik
 * @date 2026-02-11
 *
 * A meditation on attractors, cosmic distance, and connection across void.
 * Two pulsing signals interfere through a Lorenz attractor field, connected
 * by a breathing filament amid cosmic dust and nebula. A valentine card.
 *
 * Techniques used:
 * - Lorenz attractor field distortion
 * - Multi-layer FBM domain warping for cosmic dust
 * - IQ-style cosine palette coloring for nebula hues
 * - Wave interference from two orbiting signal sources
 * - Diffraction spikes on procedural star field
 */

#define PI 3.14159265359
#define TAU 6.28318530718

// ---------------------------------------------------------------------------
// Hash / Noise
// ---------------------------------------------------------------------------

/**
 * Pseudo-random hash — classic sin-dot construction.
 * Returns [0, 1) for any 2D input.
 */
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

/**
 * Value noise with Hermite smoothing (smoothstep-style interpolation).
 * Chosen over simplex for its simplicity; adequate for the soft
 * nebula textures that don't need gradient continuity.
 */
float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
        mix(hash(i), hash(i + vec2(1, 0)), f.x),
        mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x),
        f.y
    );
}

/**
 * Fractal Brownian Motion — 6 octaves with domain rotation.
 * The rotation matrix between octaves prevents axis-aligned artifacts
 * and produces more isotropic, cloud-like patterns.
 */
float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);  // ~36.87 degree rotation between octaves
    for (int i = 0; i < 6; i++) {
        v += a * noise(p);
        p = rot * p * 2.0;
        a *= 0.5;
    }
    return v;
}

// ---------------------------------------------------------------------------
// Lorenz attractor
// ---------------------------------------------------------------------------

// TECHNIQUE: Lorenz attractor field
// The Lorenz system (sigma=10, rho=28, beta=8/3) defines a chaotic vector
// field. Instead of integrating a trajectory, we evaluate the derivative
// at each pixel to get a flow-magnitude map that creates organic swirls.

/**
 * Lorenz attractor derivative.
 * PHYSICS: dx/dt = sigma*(y-x), dy/dt = x*(rho-z)-y, dz/dt = x*y - beta*z
 * Returns the instantaneous velocity vector at point p.
 */
vec3 attractor(vec3 p, float sigma, float rho, float beta) {
    return vec3(
        sigma * (p.y - p.x),
        p.x * (rho - p.z) - p.y,
        p.x * p.y - beta * p.z
    );
}

// ---------------------------------------------------------------------------
// IQ cosine palettes for nebula coloring
// ---------------------------------------------------------------------------

// TECHNIQUE: Cosine color palette (Inigo Quilez)
// color(t) = a + b * cos(TAU * (c*t + d))
// Produces smooth, looping gradients ideal for nebula and emission coloring.
// See https://iquilezles.org/articles/palettes/

/** Primary nebula palette — dark purples and deep space blues. */
vec3 nebula1(float t) {
    vec3 a = vec3(0.12, 0.03, 0.20);
    vec3 b = vec3(0.15, 0.05, 0.18);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.00, 0.10, 0.05);
    return a + b * cos(TAU * (c * t + d));
}

/** Secondary nebula palette — shifted phase for attractor regions. */
vec3 nebula2(float t) {
    vec3 a = vec3(0.16, 0.04, 0.22);
    vec3 b = vec3(0.18, 0.06, 0.20);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.50, 0.55, 0.45);
    return a + b * cos(TAU * (c * t + d));
}

/** Emission glow palette — brighter tones for hot nebula regions. */
vec3 emissionGlow(float t) {
    vec3 a = vec3(0.20, 0.06, 0.22);
    vec3 b = vec3(0.20, 0.06, 0.18);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.25, 0.35, 0.30);
    return a + b * cos(TAU * (c * t + d));
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / min(iResolution.x, iResolution.y);
    float time = iTime * 0.3;

    // TECHNIQUE: Triple-layer domain warping for cosmic dust
    // Each FBM feeds into the next as a coordinate offset, creating
    // deeply organic, slowly drifting nebula structures.
    vec2 q = vec2(fbm(uv * 2.0 + time * 0.08), fbm(uv * 2.0 + vec2(5.2, 1.3)));
    vec2 rr = vec2(fbm(uv * 2.0 + 4.0 * q + vec2(1.7, 9.2) + 0.12 * time),
                   fbm(uv * 2.0 + 4.0 * q + vec2(8.3, 2.8) + 0.1 * time));
    float f = fbm(uv * 2.0 + 4.0 * rr);

    // Dust lanes — FBM thresholded to create dark absorption bands
    float dust = fbm(uv * 3.5 + vec2(time * 0.05, -time * 0.03));
    float dustLanes = smoothstep(0.35, 0.55, dust) * 0.6;

    // Lorenz attractor field — evaluate derivative at each pixel
    // sigma=10, rho=28, beta=8/3 are the classic chaotic parameters
    vec3 ap = vec3(uv * 15.0, sin(time * 0.25) * 10.0 + 15.0);
    vec3 da = attractor(ap, 10.0, 28.0, 8.0 / 3.0);
    float attractorField = length(da.xy) * 0.003;
    attractorField = sin(attractorField * 6.0 + time * 0.8) * 0.5 + 0.5;

    // Two orbiting signal sources — concentric wave emitters
    vec2 focus1 = vec2(sin(time * 0.5) * 0.3, cos(time * 0.35) * 0.2);
    vec2 focus2 = vec2(cos(time * 0.4) * 0.25, sin(time * 0.55) * 0.3);
    float d1 = length(uv - focus1);
    float d2 = length(uv - focus2);

    // Radial pulses with exponential falloff — simulates signal attenuation
    float pulse1 = sin(d1 * 18.0 - time * 2.5) * exp(-d1 * 2.5);
    float pulse2 = sin(d2 * 18.0 - time * 2.5) * exp(-d2 * 2.5);

    // Wave interference — product of pulses plus standing-wave pattern
    // along the equal-distance locus (where d1 ~ d2)
    float interference = pulse1 * pulse2 * 3.0;
    interference += sin((d1 + d2) * 12.0 - time * 1.5) * 0.12 *
                    smoothstep(1.0, 0.2, abs(d1 - d2));

    // Connection filament — Gaussian beam along the line between foci
    // Represents the invisible tether binding the two signals
    vec2 dir = normalize(focus2 - focus1);
    vec2 toP = uv - focus1;
    float proj = dot(toP, dir);
    float projClamped = clamp(proj, 0.0, length(focus2 - focus1));
    vec2 closest = focus1 + dir * projClamped;
    float lineDist = length(uv - closest);
    float breath = sin(time * 0.4) * 0.5 + 0.5;  // slow breathing modulation
    float connectionLine = exp(-lineDist * lineDist * 600.0) *
                           (0.3 + 0.4 * breath) * 0.5;

    // ---- Compose layers ----
    vec3 col = nebula1(f * 0.7 + time * 0.015);

    vec3 darkDust = vec3(0.02, 0.015, 0.03);
    col = mix(col, darkDust, dustLanes * 0.7);

    vec3 attractorColor = nebula2(attractorField + time * 0.03);
    col = mix(col, attractorColor, attractorField * 0.35 * (0.6 + 0.4 * breath));

    float emissionMask = smoothstep(0.45, 0.7, f) * (1.0 - dustLanes);
    vec3 emission = emissionGlow(f * 0.5 + attractorField * 0.3);
    col = mix(col, emission * 1.5, emissionMask * 0.3);

    float coreGlow1 = exp(-d1 * d1 * 8.0) * 0.4;
    float coreGlow2 = exp(-d2 * d2 * 8.0) * 0.35;
    col += vec3(0.45, 0.12, 0.35) * coreGlow1 * (0.7 + 0.3 * breath);
    col += vec3(0.20, 0.12, 0.45) * coreGlow2 * (0.6 + 0.4 * breath);

    col += vec3(0.30, 0.15, 0.55) * max(pulse1, 0.0) * 0.25;
    col += vec3(0.50, 0.12, 0.40) * max(pulse2, 0.0) * 0.25;

    col += vec3(0.45, 0.15, 0.55) * max(interference, 0.0) * (0.3 + 0.3 * breath);

    col += vec3(0.55, 0.25, 0.70) * connectionLine;

    // TECHNIQUE: Procedural star field with diffraction spikes
    // Multiple grid layers at different scales prevent visible tiling.
    // Bright stars (hash > 0.96) get four-pointed diffraction spikes
    // via cos^20 angular falloff — mimics real telescope optics.
    float stars = 0.0;
    float spikes = 0.0;
    for (float i = 0.0; i < 4.0; i++) {
        vec2 starUV = uv * (40.0 + i * 50.0) + vec2(i * 17.3, i * 31.7);
        vec2 starId = floor(starUV);
        vec2 starF = fract(starUV) - 0.5;
        float h = hash(starId + i * 100.0);
        float starDist = length(starF);

        if (h > 0.96) {
            float angle = atan(starF.y, starF.x);
            spikes += pow(max(cos(angle * 2.0), 0.0), 20.0) * exp(-starDist * 8.0) * 0.3;
            spikes += pow(max(cos(angle * 2.0 + PI * 0.5), 0.0), 20.0) * exp(-starDist * 8.0) * 0.3;
        }

        float starBright = smoothstep(0.04 + h * 0.015, 0.0, starDist);
        starBright *= step(0.9, h);
        starBright *= max(0.0, 0.4 + 0.6 * sin(time * (0.8 + h * 2.0) + h * TAU));
        stars += starBright;
    }

    vec3 starColor = mix(vec3(0.80, 0.50, 1.0), vec3(1.0, 0.55, 0.90),
                         hash(floor(uv * 80.0)));
    col += (stars + spikes) * starColor * 0.5;

    // Guide stars — a few fixed bright points with soft Gaussian halos
    for (float i = 0.0; i < 3.0; i++) {
        vec2 gPos = vec2(sin(i * 2.39 + 0.5) * 0.6, cos(i * 3.17 + 0.8) * 0.4);
        float gDist = length(uv - gPos);
        float glow = exp(-gDist * gDist * 50.0) * 0.08;
        glow += exp(-gDist * gDist * 400.0) * 0.15;
        vec3 gCol = mix(vec3(0.70, 0.40, 1.0), vec3(1.0, 0.45, 0.85), i / 3.0);
        col += gCol * glow * (0.7 + 0.3 * sin(time * 0.5 + i));
    }

    // Vignette — soft radial darkening
    float vig = 1.0 - dot(uv * 0.6, uv * 0.6);
    col *= smoothstep(-0.1, 0.6, vig);

    // Film grain — subtle dithering to break banding
    col += (hash(uv * iResolution.xy + fract(time)) - 0.5) * 0.015;
    // Near-unity gamma — slight contrast lift
    col = pow(max(col, 0.0), vec3(0.95));
    col = clamp(col, 0.0, 1.0);

    fragColor = vec4(col, 1.0);
}
`},channels:{}},{slug:"star-blue-giant",title:"Blue Giant",description:"A massive blue giant star with a smooth, intense surface and powerful corona glow. Temperature at ~20000K with low but steady stellar activity.",date:"2025-11-29",tags:["exoplanets","space","3d","raymarching"],links:{},screenshotUrl:Df,passes:{image:`/**
 * Blue Giant Star
 * @author guinetik
 * @date 2025-11-29
 *
 * A massive blue giant with a smooth, intensely luminous surface and powerful
 * corona glow. Temperature at ~20000K with low but steady stellar activity.
 * Smoother, larger-scale features than cooler stars.
 *
 * Based on the exoplanets v2 star shaders by guinetik.
 *
 * Rendering layers (back to front):
 *   1. Background      — near-black with cool blue tint
 *   2. Glow            — inverse-square radial falloff, wider reach than Sun
 *   3. Corona          — FBM flame tendrils + only 2 subtle prominences
 *   4. Star surface    — large smooth convection cells, minimal starspots
 *   5. Tone mapping    — Reinhard at 2.0x exposure (highest of the three stars)
 *
 * TECHNIQUE: Ray-sphere intersection with orbiting camera. Same architecture as
 * the red dwarf and sun shaders but with the slowest orbital and self-rotation
 * speeds, emphasizing the massive scale of a blue giant.
 *
 * TECHNIQUE: Limb darkening with pow(viewAngle, 0.5). The highest exponent of
 * the three star types, producing the strongest center-to-edge contrast. Hot
 * blue giants have steep temperature gradients in their photospheres.
 *
 * TECHNIQUE: Wider corona (extends to r=2.5 vs r=2.0 for other stars) with
 * slower exponential decay (exp(-rimFactor * 3.0) vs 4.0-4.5), reflecting the
 * powerful radiation pressure of a luminous blue giant.
 *
 * Physics: Color palette approximates ~20000K blackbody radiation — dominated
 * by blue-white emission. Wien's displacement law places peak emission in the
 * UV, so visible light appears strongly blue-shifted. The high base brightness
 * multiplier (2.0 + heat * 1.5) models the extreme luminosity — blue giants
 * can be 10,000-100,000x more luminous than the Sun.
 *
 * Noise: 3D simplex noise (Ashima Arts implementation). Lower frequency
 * multipliers and fewer FBM octaves than cooler stars produce the smoother,
 * larger-scale convection patterns characteristic of massive stellar envelopes.
 */

#define PI 3.14159265359   // Half-circle — used for prominence angular wrapping
#define TAU 6.28318530718  // Full circle — used for prominence distribution

// =============================================================================
// NOISE — 3D Simplex Noise (Ashima Arts / Stefan Gustavson)
// =============================================================================
// Same simplex noise implementation as the other star shaders. Lower base
// frequencies are used throughout to produce the smoother, larger-scale
// convection patterns characteristic of massive stellar envelopes.

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

// FBM with configurable octaves — lacunarity 2.0, gain 0.5
// Called with fewer octaves (3-4) than the other stars to produce the
// smoother surface characteristic of a massive blue giant.
float fbm(vec3 p, int octaves) {
    float v = 0.0, a = 0.5, f = 1.0;
    for (int i = 0; i < 6; i++) {
        if (i >= octaves) break;
        v += a * snoise(p * f);
        f *= 2.0;         // Double frequency each octave
        a *= 0.5;         // Halve amplitude each octave
        p += vec3(100.0); // Domain shift to decorrelate
    }
    return v;
}

// =============================================================================
// BLUE GIANT PALETTE — blue-white, intensely luminous
// =============================================================================
// Physics: ~20000K blackbody color ramp. Wien's displacement law places peak
// emission at ~145nm (deep UV), so visible light is dominated by the blue tail
// of the Planck distribution. The narrow color range (blue -> near-white)
// reflects the compressed visible portion of such a hot spectrum.

vec3 starRamp(float t) {
    const vec3 SPOT     = vec3(0.15, 0.2, 0.4);      // Dark blue spot — still blue even when cool
    const vec3 COOL     = vec3(0.5, 0.6, 0.9);       // Cooler blue surface — rare on such a hot star
    const vec3 WARM     = vec3(0.7, 0.8, 1.0);       // Warm blue-white — typical photosphere
    const vec3 HOT      = vec3(0.85, 0.9, 1.0);      // Hot near-white — convective peak
    const vec3 BRIGHT   = vec3(0.95, 0.97, 1.0);     // Intense white-blue — maximum emission

    if (t < 0.15) return mix(SPOT, COOL, t / 0.15);
    if (t < 0.4)  return mix(COOL, WARM, (t - 0.15) / 0.25);
    if (t < 0.7)  return mix(WARM, HOT, (t - 0.4) / 0.3);
    return mix(HOT, BRIGHT, (t - 0.7) / 0.3);
}

// =============================================================================
// STAR SURFACE — low activity, smooth large-scale features
// =============================================================================
// All frequencies are the lowest of the three star types (3/7/14 vs Sun's
// 4.5/10/20 vs red dwarf's 5/12/25). The large cells weigh more (0.55) and
// fine detail weighs less (0.15), producing the smooth appearance of a massive
// stellar envelope where convection operates on much larger spatial scales.

float convectionCells(vec3 p, float time) {
    float cells = snoise(p * 3.0 + vec3(0.0, time * 0.01, 0.0));     // Large granules — freq 3.0 (lowest)
    float med = snoise(p * 7.0 + vec3(time * 0.008, 0.0, time * 0.006)); // Medium detail — freq 7.0
    float fine = snoise(p * 14.0 + vec3(0.0, time * 0.015, time * 0.01)); // Fine texture — freq 14.0
    return cells * 0.55 + med * 0.3 + fine * 0.15;  // Large features dominate (0.55 vs 0.5)
}

// Starspots — rarest and most subtle of the three star types.
// Lowest frequency (2.0) and highest threshold (0.6) = very few, faint spots.
// Massive blue giants have weaker magnetic fields relative to their luminosity.
float starSpots(vec3 p, float time) {
    float spots = snoise(p * 2.0 + vec3(0.0, time * 0.003, 0.0));  // Freq 2.0 — largest spot scale
    return smoothstep(0.6, 0.85, spots);  // Highest threshold = fewest spots of any star type
}

// Plasma flow — lowest frequencies and fewest FBM octaves of any star type.
// Scales 2.5/3.0 (vs red dwarf 3.5/4.5), octaves 4/3 (vs 5/4).
float plasmaFlow(vec3 p, float time) {
    vec3 q = p * 2.5;    // Lowest base frequency — largest flow patterns
    q += vec3(sin(time * 0.06) * 0.2, cos(time * 0.08) * 0.2, time * 0.03); // Slowest drift
    float n1 = fbm(q, 4) * 0.5 + 0.5;   // 4 octaves (vs 5 for red dwarf)

    vec3 r = p * 3.0 + vec3(50.0);       // Secondary flow layer
    r += vec3(cos(time * 0.05) * 0.25, sin(time * 0.07) * 0.2, time * 0.04);
    float n2 = fbm(r, 3) * 0.5 + 0.5;   // Only 3 octaves — smoothest of all

    return n1 * 0.6 + n2 * 0.4;
}

// Surface rendering — the most stable and luminous of the three star types.
vec3 renderSurface(vec3 spherePos, float viewAngle, float time) {
    float edgeDist = 1.0 - viewAngle;

    float plasma = plasmaFlow(spherePos, time);
    float cells = convectionCells(spherePos, time) * 0.5 + 0.5;
    float spots = starSpots(spherePos, time);

    // Very subtle pulsing — +/-5% (vs +/-8% Sun, +/-10% red dwarf)
    float pulse = 0.95 + 0.05 * sin(time * 0.3 + snoise(spherePos * 1.5) * 2.0);

    float heat = plasma * 0.65 + cells * 0.35;  // Plasma dominates even more
    heat *= pulse;
    heat *= 1.0 - spots * 0.5;   // 50% spot darkening — mildest of all (vs 65% Sun, 70% red dwarf)

    // TECHNIQUE: Limb darkening — pow(viewAngle, 0.5), strongest of the three
    // star types. Hot blue giants have steep photospheric temperature gradients.
    float limb = pow(viewAngle, 0.5);
    heat *= 0.65 + limb * 0.35;   // 35% range — strongest center-to-edge contrast

    // Minimal edge flares — blue giants are more stable due to their
    // radiation-dominated envelopes (less convective turbulence at surface)
    float edgeFlare = pow(edgeDist, 3.0) * fbm(spherePos * 6.0 + vec3(time * 0.1), 3);
    heat += edgeFlare * 0.12;     // Lowest flare contribution (vs 0.2 Sun, 0.3 red dwarf)

    heat = clamp(heat, 0.0, 1.0);

    // Highest base brightness multiplier: (2.0 + heat*1.5) gives range [2.0, 3.5]
    // vs [1.5, 3.0] for other stars. Models 10,000-100,000x solar luminosity.
    vec3 color = starRamp(heat) * (2.0 + heat * 1.5);
    // Blue-white granule highlights
    color += vec3(0.7, 0.8, 1.0) * pow(max(cells - 0.3, 0.0), 2.0) * limb * 1.2;

    return color;
}

// =============================================================================
// GLOW AND CORONA — intense blue-white, wider glow
// =============================================================================

// Radial glow — widest and brightest of all three star types.
// Extends to 5x/7x radius (vs 4x/6x), lower falloff factor (1.2 vs 1.5),
// and highest intensity (0.18 vs 0.12-0.15) — models extreme luminosity.
vec3 renderGlow(vec2 p, float starRadius) {
    float dist = length(p);
    float r = dist / starRadius;

    // Stronger glow — gentler falloff factor (1.2 vs 1.5) and wider reach (5x vs 4x)
    float glow = 1.0 / (r * r * 1.2 + 0.01);
    glow *= smoothstep(5.0, 1.0, r);                        // Extends to 5x radius
    vec3 glowColor = vec3(0.6, 0.75, 1.0) * glow * 0.18;   // Blue-white, 0.18 intensity (highest)

    float haze = 1.0 / (r * r * 4.0 + 0.1);                // Outer haze — gentler falloff (4.0 vs 5.0)
    haze *= smoothstep(7.0, 1.5, r);                        // Extends to 7x radius (widest)
    glowColor += vec3(0.4, 0.5, 0.9) * haze * 0.1;         // Deep blue outer haze

    return glowColor;
}

// Corona — widest extent (2.5x vs 2.0x for other stars) but with calmer,
// smoother flame patterns. Fewer prominences (2) reflect the more stable
// magnetic environment of a massive blue giant.
vec3 renderCorona(vec2 p, float starRadius, float time) {
    float dist = length(p);
    float r = dist / starRadius;

    if (r < 1.0 || r > 2.5) return vec3(0.0);  // Widest corona range — 2.5x (vs 2.0x)

    float rimFactor = (r - 1.0);
    float angle = atan(p.y, p.x);

    // Smoother corona — lower angular frequencies (1.5/3.0 vs 2.0/4.0) and
    // only 3 FBM octaves per layer (vs 4/3 for red dwarf)
    float flame1 = fbm(vec3(angle * 1.5, rimFactor * 4.0, time * 0.2), 3);
    float flame2 = fbm(vec3(angle * 3.0 + 10.0, rimFactor * 2.5, time * 0.15), 3);
    float flames = (flame1 * 0.6 + flame2 * 0.4) * 0.5 + 0.5;

    // Slowest exponential decay — wider corona powered by extreme radiation pressure
    float fade = exp(-rimFactor * 3.0);       // Gentlest decay (3.0 vs 4.0-4.5)
    float intensity = flames * fade * 0.6;     // Lowest base intensity (0.6 vs 0.7-0.9)

    // Only 2 prominences — fewest of any star type
    // Tightest angular mask (12.0) and slowest lifecycle (0.15)
    for (int i = 0; i < 2; i++) {
        float fi = float(i);
        float promAngle = fract(fi * 0.618 + 0.5) * TAU;
        float angleDiff = abs(mod(angle - promAngle + PI, TAU) - PI);
        float promMask = exp(-angleDiff * angleDiff * 12.0);  // Tightest mask
        float lifecycle = max(sin(time * 0.15 * (1.0 + fi * 0.4) + fi * 3.0), 0.0); // Slowest cycle
        intensity += promMask * lifecycle * fade * 0.8;        // 0.8x brightness (lowest)
    }

    vec3 coronaColor = mix(vec3(0.7, 0.8, 1.0), vec3(0.5, 0.6, 1.0), rimFactor);
    return coronaColor * intensity;
}

// =============================================================================
// MAIN
// =============================================================================

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 p = (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);
    float time = mod(iTime, 1000.0);

    float starRadius = 0.85;   // World-space star radius
    float focalLength = 1.5;  // Camera focal length

    // Slowest rotation of all three star types — emphasizes massive scale
    float rotX = time * 0.1;               // Horizontal orbit (slowest: 0.1 vs 0.12 vs 0.15)
    float rotY = sin(time * 0.04) * 0.2;   // Vertical bob — gentlest (+/-0.2 vs 0.25 vs 0.3)

    float camDist = 3.5;  // Camera distance
    vec3 camPos = vec3(
        camDist * sin(rotX) * cos(rotY),
        camDist * sin(rotY),
        camDist * cos(rotX) * cos(rotY)
    );

    vec3 camDir = normalize(-camPos);
    vec3 camRight = normalize(cross(vec3(0.0, 1.0, 0.0), camDir));
    vec3 camUp = cross(camDir, camRight);
    vec3 rd = normalize(p.x * camRight + p.y * camUp + focalLength * camDir);

    // Project world-space radius to screen space
    float apparentRadius = starRadius / sqrt(camDist * camDist - starRadius * starRadius) * focalLength;

    vec3 color = vec3(0.0, 0.0, 0.01);  // Near-black background with cool blue tint

    color += renderGlow(p, apparentRadius);
    color += renderCorona(p, apparentRadius, time);

    // Ray-sphere intersection (quadratic formula)
    vec3 oc = camPos;
    float b = dot(oc, rd);
    float c = dot(oc, oc) - starRadius * starRadius;
    float h = b * b - c;

    if (h > 0.0) {
        float t = -b - sqrt(h);
        if (t > 0.0) {
            vec3 hitPos = camPos + rd * t;
            vec3 normal = normalize(hitPos);
            vec3 spherePos = normal;

            // Slowest axial rotation — 0.03 rad/s (vs 0.04 Sun, 0.05 red dwarf)
            float starRot = time * 0.03;
            float cs = cos(starRot), sn = sin(starRot);
            spherePos = vec3(
                spherePos.x * cs + spherePos.z * sn,
                spherePos.y,
                -spherePos.x * sn + spherePos.z * cs
            );

            float viewAngle = max(dot(normal, normalize(camPos - hitPos)), 0.0);
            color = renderSurface(spherePos, viewAngle, time);
        }
    }

    // Tone mapping — Reinhard with highest exposure (2.0x vs 1.8x for others)
    // The higher exposure reflects the extreme luminosity of blue giants
    color *= 2.0;
    color = color / (color + vec3(1.0));

    // Cool blue tint to blacks — opposite of the warm tint used for red/yellow stars
    color += vec3(0.003, 0.004, 0.01);

    // Gamma — same 0.85 exponent as other stars
    color = pow(color, vec3(0.85));

    fragColor = vec4(color, 1.0);
}
`},channels:{}},{slug:"star-red-dwarf",title:"Red Dwarf",description:"A small, turbulent red dwarf star with orange-red boiling plasma, active flares, and prominent corona. Temperature locked at ~3000K with high stellar activity.",date:"2025-11-29",tags:["exoplanets","space","3d","raymarching"],links:{},screenshotUrl:Pf,passes:{image:`/**
 * Red Dwarf Star
 * @author guinetik
 * @date 2025-11-29
 *
 * A small, turbulent red dwarf star with orange-red plasma, boiling convection
 * cells, dark starspots, and a warm glowing corona. Temperature locked at ~3000K
 * with high stellar activity.
 *
 * Based on the exoplanets v2 star shaders by guinetik.
 *
 * Rendering layers (back to front):
 *   1. Background      — near-black with subtle blue tint
 *   2. Glow            — inverse-square radial falloff around the star
 *   3. Corona          — FBM-driven flame tendrils + cyclic prominences
 *   4. Star surface    — convection cells, plasma flow, starspots, limb darkening
 *   5. Tone mapping    — Reinhard operator with exposure boost
 *
 * TECHNIQUE: Ray-sphere intersection. Unlike the planet shaders (which use
 * analytic Pythagorean projection), the star shaders use a proper 3D camera
 * with orbital rotation and ray-sphere intersection (quadratic formula). This
 * allows the camera to orbit and zoom around the star.
 *
 * TECHNIQUE: Limb darkening. The star's edges are darkened using pow(viewAngle,
 * 0.35), approximating the physical effect where photons escaping at shallow
 * angles traverse more stellar atmosphere. The exponent 0.35 is tuned for a
 * red dwarf's convective envelope (cooler stars show stronger limb darkening).
 *
 * TECHNIQUE: Prominence lifecycle. Corona prominences use a golden-ratio angular
 * distribution (0.618 * i) for even spacing, modulated by sin()-based lifecycle
 * functions so prominences grow and fade over time independently.
 *
 * Physics: Color palette approximates ~3000K blackbody radiation — dominant
 * orange-red emission with occasional yellow-white flare peaks. Red dwarfs
 * are fully convective, so the surface shows vigorous boiling granulation
 * at higher activity levels than hotter stars.
 *
 * Noise: 3D simplex noise (Ashima Arts implementation) chosen for its smooth,
 * isotropic gradients — critical for convincing stellar surface turbulence
 * without visible grid artifacts. FBM with up to 5 octaves for plasma flow.
 */

#define PI 3.14159265359   // Half-circle — used for prominence angular wrapping
#define TAU 6.28318530718  // Full circle — used for prominence distribution

// =============================================================================
// NOISE — 3D Simplex Noise (Ashima Arts / Stefan Gustavson)
// =============================================================================
// Chosen for smooth, isotropic gradients essential for convincing stellar
// surface turbulence. Simplex noise has no visible grid artifacts and is
// computationally cheaper than classic Perlin noise in 3D.

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

// FBM with configurable octaves — lacunarity 2.0, gain 0.5
// Domain offset vec3(100.0) between octaves decorrelates layers.
// 5 octaves for plasma detail, 3-4 for corona flames.
float fbm(vec3 p, int octaves) {
    float v = 0.0, a = 0.5, f = 1.0;
    for (int i = 0; i < 6; i++) {
        if (i >= octaves) break;
        v += a * snoise(p * f);
        f *= 2.0;         // Double frequency each octave
        a *= 0.5;         // Halve amplitude each octave
        p += vec3(100.0); // Domain shift to decorrelate
    }
    return v;
}

// =============================================================================
// STAR COLOR PALETTE — direct ramp, no normalization that kills brightness
// =============================================================================

// Physics: ~3000K blackbody color ramp. Red dwarfs peak in infrared; visible
// emission is dominated by red-orange. Flare peaks can briefly reach yellow-white.
// Ramp: dark spots -> warm orange -> bright yellow-white
vec3 starRamp(float t) {
    const vec3 SPOT     = vec3(0.3, 0.08, 0.0);     // Dark starspot — cooler magnetic regions
    const vec3 COOL     = vec3(0.8, 0.25, 0.02);     // Cool surface — typical photosphere
    const vec3 WARM     = vec3(1.0, 0.55, 0.08);     // Warm convection upwelling
    const vec3 HOT      = vec3(1.0, 0.8, 0.3);       // Hot granule center — convective peak
    const vec3 BRIGHT   = vec3(1.0, 0.95, 0.7);      // Brightest flare — transient energy release

    if (t < 0.15) return mix(SPOT, COOL, t / 0.15);
    if (t < 0.4)  return mix(COOL, WARM, (t - 0.15) / 0.25);
    if (t < 0.7)  return mix(WARM, HOT, (t - 0.4) / 0.3);
    return mix(HOT, BRIGHT, (t - 0.7) / 0.3);
}

// =============================================================================
// STAR SURFACE
// =============================================================================

// Convection granulation — three octaves at hand-tuned frequencies for
// red dwarf's vigorous convective envelope. Higher frequencies than the
// Sun/blue giant reflect the smaller, more turbulent convection cells.
float convectionCells(vec3 p, float time) {
    float cells = snoise(p * 5.0 + vec3(0.0, time * 0.02, 0.0));     // Large granules — freq 5.0
    float med = snoise(p * 12.0 + vec3(time * 0.015, 0.0, time * 0.01)); // Medium detail — freq 12.0
    float fine = snoise(p * 25.0 + vec3(0.0, time * 0.03, time * 0.02)); // Fine turbulence — freq 25.0

    return cells * 0.5 + med * 0.3 + fine * 0.2;  // Weighted blend: large features dominate
}

// Starspots — magnetically active regions where convection is suppressed.
// Red dwarfs have frequent, large starspots due to their fully convective interiors.
float starSpots(vec3 p, float time) {
    float spots = snoise(p * 3.0 + vec3(0.0, time * 0.005, 0.0));  // Freq 3.0 — large spot regions
    return smoothstep(0.5, 0.75, spots);  // Only noise peaks become spots. Threshold 0.5 = ~30% coverage.
                                           // Lower threshold = more spots. Higher = fewer, rarer spots.
}

float plasmaFlow(vec3 p, float time) {
    // Boiling plasma with time-varying flow
    vec3 q = p * 3.5;
    q += vec3(sin(time * 0.1) * 0.3, cos(time * 0.13) * 0.3, time * 0.05);
    float n1 = fbm(q, 5) * 0.5 + 0.5;

    // Second layer offset for turbulence
    vec3 r = p * 4.5 + vec3(50.0);
    r += vec3(cos(time * 0.08) * 0.4, sin(time * 0.12) * 0.3, time * 0.07);
    float n2 = fbm(r, 4) * 0.5 + 0.5;

    return n1 * 0.6 + n2 * 0.4;
}

// Surface rendering — combines all stellar surface effects into final color.
vec3 renderSurface(vec3 spherePos, float viewAngle, float time) {
    float edgeDist = 1.0 - viewAngle;

    // Plasma base — large-scale flow pattern
    float plasma = plasmaFlow(spherePos, time);

    // Convection granulation — remapped to [0,1]
    float cells = convectionCells(spherePos, time) * 0.5 + 0.5;

    // Dark starspots — magnetically suppressed regions
    float spots = starSpots(spherePos, time);

    // Pulsing brightness — simulates global oscillation modes
    float pulse = 0.9 + 0.1 * sin(time * 0.5 + snoise(spherePos * 2.0) * 3.0); // +/-10% variation

    // Combine into a single heat value [0..1]
    float heat = plasma * 0.6 + cells * 0.4;  // Plasma dominates, cells add texture
    heat *= pulse;

    // Darken spots — 70% darkening factor (red dwarfs have prominent spots)
    heat *= 1.0 - spots * 0.7;

    // TECHNIQUE: Limb darkening — pow(viewAngle, 0.35) approximates the physical
    // effect where photons escaping at shallow angles traverse more photosphere.
    // Exponent 0.35 tuned for red dwarf's deep convective envelope.
    float limb = pow(viewAngle, 0.35);
    heat *= 0.7 + limb * 0.3;   // 30% intensity range from edge to center

    // Edge brightening for active flares — visible at the limb
    float edgeFlare = pow(edgeDist, 2.0) * fbm(spherePos * 8.0 + vec3(time * 0.2), 3);
    heat += edgeFlare * 0.3;    // 30% flare contribution — high for an active red dwarf

    heat = clamp(heat, 0.0, 1.0);

    // Map to color — multiplier (1.5 + heat*1.5) gives range [1.5, 3.0] for HDR
    // Hot areas push above 1.0 and get compressed by tone mapping for natural bloom
    vec3 color = starRamp(heat) * (1.5 + heat * 1.5);

    // Extra brightness at center of convection granules — warm orange highlight
    color += vec3(1.0, 0.7, 0.2) * pow(max(cells - 0.3, 0.0), 2.0) * limb * 2.0;

    return color;
}

// =============================================================================
// GLOW AND CORONA
// =============================================================================

// Radial glow — inverse-square falloff simulating scattered light in the
// interstellar medium and instrumental diffraction.
vec3 renderGlow(vec2 p, float starRadius) {
    float dist = length(p);
    float r = dist / starRadius;   // Normalized distance from star center

    // Soft inner glow — 1/r^2 with small epsilon to prevent division by zero
    float glow = 1.0 / (r * r * 1.5 + 0.01);  // Factor 1.5 controls falloff steepness
    glow *= smoothstep(4.0, 1.0, r);           // Fade to zero beyond 4x star radius

    // Warm orange glow color — matches ~3000K blackbody
    vec3 glowColor = vec3(1.0, 0.5, 0.1) * glow * 0.15;  // 0.15 intensity — brighter = more bloom

    // Wider, dimmer haze — secondary falloff layer
    float haze = 1.0 / (r * r * 5.0 + 0.1);   // Steeper 1/r^2 for outer haze
    haze *= smoothstep(6.0, 1.5, r);            // Extends to 6x radius
    glowColor += vec3(0.6, 0.2, 0.03) * haze * 0.1;  // Deep red outer haze

    return glowColor;
}

// Corona — FBM-driven flame tendrils extending beyond the stellar surface.
// Only rendered in the annular region between 1.0x and 2.0x star radius.
vec3 renderCorona(vec2 p, float starRadius, float time) {
    float dist = length(p);
    float r = dist / starRadius;

    if (r < 1.0 || r > 2.0) return vec3(0.0);  // Skip pixels outside corona range

    float rimFactor = (r - 1.0);   // 0 at surface, 1 at outer corona edge
    float angle = atan(p.y, p.x);  // Polar angle around star

    // Two-layer flame pattern at different angular frequencies for organic look
    float flame1 = fbm(vec3(angle * 2.0, rimFactor * 5.0, time * 0.3), 4);   // Broad flames
    float flame2 = fbm(vec3(angle * 4.0 + 10.0, rimFactor * 3.0, time * 0.2), 3); // Fine detail
    float flames = (flame1 * 0.6 + flame2 * 0.4) * 0.5 + 0.5;  // Remap to [0,1]

    // Physics: Exponential decay with distance — models density falloff in stellar corona
    float fade = exp(-rimFactor * 4.0);    // Decay rate 4.0 — higher = more concentrated near surface
    float intensity = flames * fade * 0.9; // 0.9 base intensity — high for active red dwarf

    // TECHNIQUE: Prominence lifecycle. 4 prominences distributed by golden ratio
    // (0.618) for even angular spacing. Each has an independent sin()-based
    // lifecycle so prominences grow and fade over time.
    for (int i = 0; i < 4; i++) {          // 4 prominences — highest count of the three star types
        float fi = float(i);
        float promAngle = fract(fi * 0.618 + 0.2) * TAU;  // Golden-ratio spacing
        float angleDiff = abs(mod(angle - promAngle + PI, TAU) - PI); // Wrapped angular distance
        float promMask = exp(-angleDiff * angleDiff * 8.0);           // Gaussian angular mask — 8.0 = spread width
        float lifecycle = max(sin(time * 0.25 * (1.0 + fi * 0.3) + fi * 2.0), 0.0); // Half-wave rectified sine
        intensity += promMask * lifecycle * fade * 1.5;    // 1.5x prominence brightness
    }

    vec3 coronaColor = mix(vec3(1.0, 0.55, 0.1), vec3(1.0, 0.3, 0.02), rimFactor);
    return coronaColor * intensity;
}

// =============================================================================
// MAIN
// =============================================================================

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 p = (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);
    float time = mod(iTime, 1000.0);

    float starRadius = 0.85;   // World-space star radius — red dwarfs are 0.1-0.6 solar radii
    float focalLength = 1.5;  // Camera focal length — higher = more zoomed in

    // Auto rotation camera — orbits around star
    float rotX = time * 0.15;              // Horizontal orbit speed — fastest of three star types
    float rotY = sin(time * 0.07) * 0.3;  // Vertical bob amplitude — +/-0.3 rad

    float camDist = 3.5;                   // Camera distance from origin — affects apparent size
    vec3 camPos = vec3(
        camDist * sin(rotX) * cos(rotY),
        camDist * sin(rotY),
        camDist * cos(rotX) * cos(rotY)
    );

    vec3 camDir = normalize(-camPos);
    vec3 camRight = normalize(cross(vec3(0.0, 1.0, 0.0), camDir));
    vec3 camUp = cross(camDir, camRight);
    vec3 rd = normalize(p.x * camRight + p.y * camUp + focalLength * camDir);

    // TECHNIQUE: Apparent radius projection — project world-space star radius to
    // screen space so glow/corona effects match the rendered sphere exactly
    float apparentRadius = starRadius / sqrt(camDist * camDist - starRadius * starRadius) * focalLength;

    // Dark background
    vec3 color = vec3(0.0, 0.0, 0.01);

    // Glow and corona use apparent radius so they match the rendered sphere
    color += renderGlow(p, apparentRadius);
    color += renderCorona(p, apparentRadius, time);

    // TECHNIQUE: Ray-sphere intersection using the quadratic formula.
    // For a sphere centered at origin: |camPos + t*rd|^2 = r^2
    // Discriminant h = b^2 - c determines hit (h > 0) or miss (h <= 0)
    vec3 oc = camPos;
    float b = dot(oc, rd);
    float c = dot(oc, oc) - starRadius * starRadius;
    float h = b * b - c;

    if (h > 0.0) {
        float t = -b - sqrt(h);
        if (t > 0.0) {
            vec3 hitPos = camPos + rd * t;
            vec3 normal = normalize(hitPos);

            // Sphere position in object space
            vec3 spherePos = normal;

            // Add star's own axial rotation — 0.05 rad/s
            float starRot = time * 0.05;
            float cs = cos(starRot), sn = sin(starRot);
            spherePos = vec3(
                spherePos.x * cs + spherePos.z * sn,
                spherePos.y,
                -spherePos.x * sn + spherePos.z * cs
            );

            // View angle for limb effects
            float viewAngle = max(dot(normal, normalize(camPos - hitPos)), 0.0);

            color = renderSurface(spherePos, viewAngle, time);
        }
    }

    // Tone mapping — Reinhard operator: color / (color + 1)
    // Exposure 1.8x boosts overall brightness before compression
    color *= 1.8;
    color = color / (color + vec3(1.0));  // Maps [0, inf) -> [0, 1) with soft rolloff

    // Slight warm tint to blacks — prevents pure black, adds ambient warmth
    color += vec3(0.01, 0.003, 0.0);

    // Gamma — 0.85 exponent (brighter than standard 0.45) preserves corona detail
    color = pow(color, vec3(0.85));

    fragColor = vec4(color, 1.0);
}
`},channels:{}},{slug:"star-study",title:"Star Study",description:"A procedural star with boiling plasma surface and an orbiting planet",date:"2025-11-30",tags:["exoplanets","space","3d","raymarching"],links:{},screenshotUrl:Nf,passes:{image:`/**\r
 * Star Study - 3D Raymarched Star with Orbiting Planet\r
 *\r
 * @author guinetik\r
 * @date 2025-11-30\r
 *\r
 * A procedural star system featuring a realistic boiling plasma surface,\r
 * corona flames, solar prominences, and an orbiting rocky planet.\r
 *\r
 * Features:\r
 * - Raymarched 3D star with spherical UV distortion for boiling effect\r
 * - Multi-layered plasma surface with convection cells and turbulence\r
 * - Corona, solar flares, and flame tongues that rotate with the star\r
 * - Radial god rays with star rotation\r
 * - Temperature cycling through stellar spectral types (O to M class)\r
 * - Rocky planet with day/night terminator and star-colored lighting\r
 * - Planet orbits the star and rotates on its axis\r
 *\r
 * Controls:\r
 * - Auto-rotates until first mouse interaction\r
 * - Click and drag to adjust camera angle (persists after release)\r
 * - Horizontal drag: orbit around the star\r
 * - Vertical drag: tilt camera up/down\r
 *\r
 * Temperature cycle: Orange (K-type) -> Yellow (G-type) -> White (F-type) ->\r
 *                    Blue-white (A-type) -> Blue (O-type) -> Magenta (T-dwarf) ->\r
 *                    Red (M-type) -> back to Orange\r
 *\r
 * Based on the v2 star shaders from the Exoplanets visualization project\r
 * https://github.com/guinetik/exoplanets\r
 */\r
\r
// =============================================================================\r
// CONSTANTS\r
// =============================================================================\r
\r
const float PI = 3.14159265359;\r
const float TAU = 6.28318530718;\r
\r
// Star geometry\r
const float STAR_RADIUS = 1.0;\r
const float CORONA_RADIUS = 1.35;  // Subtle corona, close to surface\r
\r
// Planet geometry\r
const float PLANET_RADIUS = 0.15;\r
const float PLANET_ORBIT_RADIUS = 3.5;\r
const float PLANET_ORBIT_SPEED = 0.15;\r
const float PLANET_ROTATION_SPEED = 0.4;\r
const vec3 PLANET_BASE_COLOR = vec3(0.3, 0.5, 0.8); // Earth-like blue\r
\r
// Temperature color palette (from shadertoy-study.glsl)\r
const vec3 TEMP_300K = vec3(0.35, 0.2, 0.45);      // Y-dwarf purple\r
const vec3 TEMP_800K = vec3(0.6, 0.27, 0.65);      // T-dwarf magenta\r
const vec3 TEMP_2000K = vec3(1.0, 0.35, 0.1);      // M-dwarf red\r
const vec3 TEMP_3000K = vec3(1.0, 0.65, 0.35);     // M-dwarf orange-red\r
const vec3 TEMP_4000K = vec3(1.0, 0.78, 0.55);     // K-dwarf orange\r
const vec3 TEMP_5778K = vec3(1.0, 0.96, 0.91);     // G-type Sun\r
const vec3 TEMP_7500K = vec3(0.92, 0.93, 1.0);     // F-type white\r
const vec3 TEMP_10000K = vec3(0.80, 0.85, 1.0);    // A-type blue-white\r
const vec3 TEMP_25000K = vec3(0.65, 0.75, 1.0);    // O-type blue\r
\r
// =============================================================================\r
// NOISE FUNCTIONS\r
// =============================================================================\r
\r
float hash(float n) { return fract(sin(n) * 43758.5453123); }\r
float hash3(vec3 p) {\r
    p = fract(p * 0.3183099 + 0.1);\r
    p *= 17.0;\r
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));\r
}\r
\r
float snoise3D(vec3 v) {\r
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);\r
    vec3 i = floor(v + dot(v, C.yyy));\r
    vec3 x0 = v - i + dot(i, C.xxx);\r
    vec3 g = step(x0.yzx, x0.xyz);\r
    vec3 l = 1.0 - g;\r
    vec3 i1 = min(g.xyz, l.zxy);\r
    vec3 i2 = max(g.xyz, l.zxy);\r
    vec3 x1 = x0 - i1 + C.xxx;\r
    vec3 x2 = x0 - i2 + C.yyy;\r
    vec3 x3 = x0 - 0.5;\r
    i = mod(i, 289.0);\r
    vec4 p = mod(((i.z + vec4(0.0, i1.z, i2.z, 1.0)) * 34.0 + 1.0) *\r
                  (i.z + vec4(0.0, i1.z, i2.z, 1.0)), 289.0);\r
    p = mod(((p + i.y + vec4(0.0, i1.y, i2.y, 1.0)) * 34.0 + 1.0) *\r
             (p + i.y + vec4(0.0, i1.y, i2.y, 1.0)), 289.0);\r
    p = mod(((p + i.x + vec4(0.0, i1.x, i2.x, 1.0)) * 34.0 + 1.0) *\r
             (p + i.x + vec4(0.0, i1.x, i2.x, 1.0)), 289.0);\r
    vec4 j = p - 49.0 * floor(p / 49.0);\r
    vec4 x_ = floor(j / 7.0);\r
    vec4 y_ = j - 7.0 * x_;\r
    vec4 x = (x_ * 2.0 + 0.5) / 7.0 - 1.0;\r
    vec4 y = (y_ * 2.0 + 0.5) / 7.0 - 1.0;\r
    vec4 h = 1.0 - abs(x) - abs(y);\r
    vec4 b0 = vec4(x.xy, y.xy);\r
    vec4 b1 = vec4(x.zw, y.zw);\r
    vec4 s0 = floor(b0) * 2.0 + 1.0;\r
    vec4 s1 = floor(b1) * 2.0 + 1.0;\r
    vec4 sh = -step(h, vec4(0.0));\r
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;\r
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;\r
    vec3 g0 = vec3(a0.xy, h.x);\r
    vec3 g1 = vec3(a0.zw, h.y);\r
    vec3 g2 = vec3(a1.xy, h.z);\r
    vec3 g3 = vec3(a1.zw, h.w);\r
    vec4 norm = 1.79284291400159 - 0.85373472095314 *\r
        vec4(dot(g0,g0), dot(g1,g1), dot(g2,g2), dot(g3,g3));\r
    g0 *= norm.x; g1 *= norm.y; g2 *= norm.z; g3 *= norm.w;\r
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\r
    m = m * m;\r
    return 42.0 * dot(m*m, vec4(dot(g0,x0), dot(g1,x1), dot(g2,x2), dot(g3,x3)));\r
}\r
\r
float tiledNoise3D(vec3 uv, float res) {\r
    uv *= res;\r
    vec3 uv0 = floor(mod(uv, res)) * vec3(1.0, 100.0, 10000.0);\r
    vec3 uv1 = floor(mod(uv + 1.0, res)) * vec3(1.0, 100.0, 10000.0);\r
    vec3 f = fract(uv);\r
    f = f * f * (3.0 - 2.0 * f);\r
    vec4 v = vec4(uv0.x+uv0.y+uv0.z, uv1.x+uv0.y+uv0.z, uv0.x+uv1.y+uv0.z, uv1.x+uv1.y+uv0.z);\r
    vec4 r = fract(sin(v * 0.001) * 100000.0);\r
    float r0 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);\r
    r = fract(sin((v + uv1.z - uv0.z) * 0.001) * 100000.0);\r
    float r1 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);\r
    return mix(r0, r1, f.z) * 2.0 - 1.0;\r
}\r
\r
float fbm3D(vec3 p, int octaves) {\r
    float v = 0.0, a = 0.5;\r
    for (int i = 0; i < 5; i++) {\r
        if (i >= octaves) break;\r
        v += a * snoise3D(p);\r
        p *= 2.0; a *= 0.5;\r
    }\r
    return v;\r
}\r
\r
// 2D Simplex Noise\r
float snoise2D(vec2 v) {\r
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,\r
                       -0.577350269189626, 0.024390243902439);\r
    vec2 i = floor(v + dot(v, C.yy));\r
    vec2 x0 = v - i + dot(i, C.xx);\r
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\r
    vec4 x12 = x0.xyxy + C.xxzz;\r
    x12.xy -= i1;\r
    i = mod(i, 289.0);\r
    vec3 perm1 = vec3(i.y) + vec3(0.0, i1.y, 1.0);\r
    perm1 = mod(((perm1 * 34.0) + 1.0) * perm1, 289.0);\r
    vec3 perm2 = perm1 + vec3(i.x) + vec3(0.0, i1.x, 1.0);\r
    vec3 p = mod(((perm2 * 34.0) + 1.0) * perm2, 289.0);\r
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\r
    m = m * m; m = m * m;\r
    vec3 x = 2.0 * fract(p * C.www) - 1.0;\r
    vec3 h = abs(x) - 0.5;\r
    vec3 ox = floor(x + 0.5);\r
    vec3 a0 = x - ox;\r
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);\r
    vec3 g;\r
    g.x = a0.x * x0.x + h.x * x0.y;\r
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;\r
    return 130.0 * dot(m, g);\r
}\r
\r
float fbm2D(vec2 p) {\r
    float value = 0.0, amplitude = 0.5;\r
    for (int i = 0; i < 5; i++) {\r
        value += amplitude * snoise2D(p);\r
        p *= 2.0;\r
        amplitude *= 0.5;\r
    }\r
    return value;\r
}\r
\r
// =============================================================================\r
// COLOR UTILITIES\r
// =============================================================================\r
\r
vec3 hsv2rgb(vec3 c) {\r
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);\r
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\r
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\r
}\r
\r
vec3 rgb2hsv(vec3 c) {\r
    vec4 K = vec4(0.0, -1.0/3.0, 2.0/3.0, -1.0);\r
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));\r
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));\r
    float d = q.x - min(q.w, q.y);\r
    float e = 1.0e-10;\r
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);\r
}\r
\r
// =============================================================================\r
// TEMPERATURE TO COLOR\r
// =============================================================================\r
\r
vec3 temperatureToColor(float tempK) {\r
    tempK = clamp(tempK, 300.0, 30000.0);\r
    if (tempK < 800.0) return mix(TEMP_300K, TEMP_800K, (tempK - 300.0) / 500.0);\r
    if (tempK < 2000.0) return mix(TEMP_800K, TEMP_2000K, (tempK - 800.0) / 1200.0);\r
    if (tempK < 3000.0) return mix(TEMP_2000K, TEMP_3000K, (tempK - 2000.0) / 1000.0);\r
    if (tempK < 4000.0) return mix(TEMP_3000K, TEMP_4000K, (tempK - 3000.0) / 1000.0);\r
    if (tempK < 5778.0) return mix(TEMP_4000K, TEMP_5778K, (tempK - 4000.0) / 1778.0);\r
    if (tempK < 7500.0) return mix(TEMP_5778K, TEMP_7500K, (tempK - 5778.0) / 1722.0);\r
    if (tempK < 10000.0) return mix(TEMP_7500K, TEMP_10000K, (tempK - 7500.0) / 2500.0);\r
    return mix(TEMP_10000K, TEMP_25000K, (tempK - 10000.0) / 15000.0);\r
}\r
\r
// =============================================================================\r
// PLASMA NOISE (flowing distortion)\r
// =============================================================================\r
\r
float plasmaNoise(vec3 p, float time) {\r
    float v = 0.0, a = 1.0, total = 0.0;\r
    for (int i = 0; i < 5; i++) {\r
        vec3 offset = vec3(sin(time * 0.1 + float(i)) * 0.5,\r
                          cos(time * 0.15 + float(i) * 0.7) * 0.5,\r
                          time * 0.05);\r
        v += a * snoise3D((p + offset) * pow(2.0, float(i)));\r
        total += a;\r
        a *= 0.5;\r
    }\r
    return v / total;\r
}\r
\r
// =============================================================================\r
// CAMERA\r
// =============================================================================\r
\r
mat3 rotateY(float a) {\r
    float c = cos(a), s = sin(a);\r
    return mat3(c, 0, s, 0, 1, 0, -s, 0, c);\r
}\r
\r
// =============================================================================\r
// RISING PLASMA CELLS - creates visible convection bubbles\r
// =============================================================================\r
\r
float risingCells(vec3 p, float time) {\r
    float cells = snoise3D(p * 6.0 + vec3(0.0, time * 0.02, 0.0));\r
    float detail = snoise3D(p * 15.0 + vec3(time * 0.01, 0.0, time * 0.01));\r
    cells = cells * 0.7 + detail * 0.3;\r
    float rise = snoise3D(p * 6.0 + vec3(0.0, time * 0.04, 0.0));\r
    return cells * 0.5 + 0.5 + rise * 0.2;\r
}\r
\r
// =============================================================================\r
// BOILING TURBULENCE - fast chaotic movement\r
// =============================================================================\r
\r
float boilingTurbulence(vec3 p, float time) {\r
    float turb = 0.0;\r
    float amp = 1.0;\r
    float freq = 4.0;\r
\r
    for (int i = 0; i < 4; i++) {\r
        // Each octave moves in different direction\r
        vec3 offset = vec3(\r
            sin(time * 0.3 + float(i) * 1.7) * 0.5,\r
            cos(time * 0.25 + float(i) * 2.3) * 0.5,\r
            time * 0.15 * (1.0 + float(i) * 0.3)\r
        );\r
        turb += amp * abs(snoise3D(p * freq + offset));\r
        amp *= 0.5;\r
        freq *= 2.1;\r
    }\r
    return turb;\r
}\r
\r
// =============================================================================\r
// HOT BUBBLES - bright spots that appear and pop\r
// =============================================================================\r
\r
float hotBubbles(vec3 p, float time) {\r
    float bubbles = 0.0;\r
\r
    // Large slow bubbles\r
    vec3 p1 = p * 5.0 + vec3(0.0, time * 0.06, 0.0);\r
    float b1 = snoise3D(p1);\r
    b1 = smoothstep(0.3, 0.6, b1); // Only show peaks\r
\r
    // Medium bubbles, faster\r
    vec3 p2 = p * 9.0 + vec3(time * 0.04, time * 0.08, 0.0);\r
    float b2 = snoise3D(p2);\r
    b2 = smoothstep(0.35, 0.65, b2);\r
\r
    // Small rapid bubbles\r
    vec3 p3 = p * 16.0 + vec3(time * 0.1, 0.0, time * 0.12);\r
    float b3 = snoise3D(p3);\r
    b3 = smoothstep(0.4, 0.7, b3);\r
\r
    bubbles = b1 * 0.5 + b2 * 0.35 + b3 * 0.15;\r
\r
    // Pulsing intensity\r
    float pulse = sin(time * 2.0 + p.x * 10.0) * 0.3 + 0.7;\r
\r
    return bubbles * pulse;\r
}\r
\r
// =============================================================================\r
// STAR SURFACE - Boiling plasma with spherical distortion (v2 style)\r
// =============================================================================\r
\r
vec3 starSurface(vec3 pos, vec3 normal, vec3 rayDir, vec3 baseColor, float time) {\r
    vec3 spherePos = normalize(pos);\r
\r
    // View geometry\r
    float viewAngle = max(dot(normal, -rayDir), 0.0);\r
    float edgeDist = 1.0 - viewAngle;\r
\r
    // Pulsation (dual frequency for organic feel)\r
    float pulse1 = cos(time * 0.5) * 0.6;\r
    float pulse2 = sin(time * 0.25) * 0.4;\r
    float pulse = (pulse1 + pulse2) * 0.3;\r
    float brightness = 0.15 + pulse * 0.1;\r
\r
    // Spherical coordinates\r
    float angle = atan(spherePos.y, spherePos.x);\r
    float elevation = acos(clamp(spherePos.z, -1.0, 1.0));\r
\r
    // ==========================================================================\r
    // SPHERICAL DISTORTION - THE KEY BOILING EFFECT\r
    // Maps the flat XY sphere hit into curved UV space using the formula:\r
    //   f = (1 - sqrt(1 - r^2)) / r^2\r
    // This is the inverse stereographic-like projection that compresses\r
    // UVs toward the limb, so noise patterns wrap convincingly around\r
    // the sphere rather than sliding flat across it. The brightness-\r
    // modulated distortStrength makes the surface "breathe" as it pulses.\r
    // ==========================================================================\r
    vec2 sp = spherePos.xy;\r
    float distortStrength = 2.0 - brightness;\r
    sp *= distortStrength;\r
    float r = dot(sp, sp);\r
    float f = (1.0 - sqrt(abs(1.0 - r))) / (r + 0.001) + brightness * 0.5;\r
\r
    vec2 warpedUV;\r
    warpedUV.x = sp.x * f;\r
    warpedUV.y = sp.y * f;\r
    warpedUV += vec2(time * 0.1, 0.0);\r
\r
    // ==========================================================================\r
    // PLASMA TEXTURE - Multiple layers for rich boiling effect\r
    // ==========================================================================\r
    vec3 plasmaCoord = vec3(warpedUV * 3.0, time * 0.12);\r
    float plasma1 = plasmaNoise(plasmaCoord, time);\r
\r
    vec3 plasma2Coord = vec3(warpedUV * 3.9, time * 0.096);\r
    float plasma2 = plasmaNoise(plasma2Coord + vec3(50.0, 50.0, 0.0), time * 1.2);\r
\r
    float plasma = plasma1 * 0.6 + plasma2 * 0.4;\r
    plasma = plasma * 0.5 + 0.5;\r
\r
    // Extra warping for more chaos\r
    float plasmaDistort = plasma * brightness * PI;\r
    vec2 extraWarp = warpedUV + vec2(plasmaDistort, 0.0);\r
    float plasma3 = plasmaNoise(vec3(extraWarp * 2.4, time * 0.18), time);\r
    plasma = mix(plasma, plasma3 * 0.5 + 0.5, 0.3);\r
\r
    // ==========================================================================\r
    // OUTWARD FLOWING FLAMES - 7 octaves like v2\r
    // ==========================================================================\r
    vec3 flameCoord = vec3(angle / TAU, elevation / PI, time * 0.1);\r
\r
    float newTime1 = abs(tiledNoise3D(\r
        flameCoord + vec3(0.0, -time * 0.35, time * 0.08), 15.0));\r
    float newTime2 = abs(tiledNoise3D(\r
        flameCoord + vec3(0.0, -time * 0.175, time * 0.08), 45.0));\r
\r
    float flameVal1 = 1.0 - edgeDist;\r
    float flameVal2 = 1.0 - edgeDist;\r
\r
    for (int i = 1; i <= 7; i++) {\r
        float power = pow(2.0, float(i + 1));\r
        float contribution = 0.5 / power;\r
        flameVal1 += contribution * tiledNoise3D(\r
            flameCoord + vec3(0.0, -time * 0.1, time * 0.2),\r
            power * 10.0 * (newTime1 + 1.0));\r
        flameVal2 += contribution * tiledNoise3D(\r
            flameCoord + vec3(0.0, -time * 0.1, time * 0.2),\r
            power * 25.0 * (newTime2 + 1.0));\r
    }\r
\r
    float flames = (flameVal1 + flameVal2) * 0.5;\r
    flames = clamp(flames, 0.0, 1.0);\r
\r
    // Edge flame boost\r
    float edgeBoost = pow(edgeDist, 0.5) * 2.5;\r
    flames += edgeBoost * flames * 0.5;\r
\r
    // ==========================================================================\r
    // CONVECTION CELLS - visible bubbling pattern\r
    // ==========================================================================\r
    float cells = risingCells(spherePos, time);\r
\r
    // ==========================================================================\r
    // BOILING TURBULENCE - chaotic fast movement\r
    // ==========================================================================\r
    float turbulence = boilingTurbulence(spherePos, time);\r
\r
    // ==========================================================================\r
    // HOT BUBBLES - bright spots popping up\r
    // ==========================================================================\r
    float bubbles = hotBubbles(spherePos, time);\r
\r
    // ==========================================================================\r
    // SUNSPOTS - dark cooler regions\r
    // ==========================================================================\r
    float spotNoise = snoise3D(spherePos * 3.0 + vec3(0.0, time * 0.005, 0.0));\r
    float spotMask = smoothstep(0.55, 0.75, spotNoise);\r
    float spotDarkening = 1.0 - spotMask * 0.4;\r
\r
    // ==========================================================================\r
    // COMBINE ALL EFFECTS - more turbulent, more boiling\r
    // ==========================================================================\r
    float plasmaIntensity = plasma;\r
    float flameIntensity = flames * 0.6;\r
    float cellIntensity = cells * 0.4;\r
    float turbIntensity = turbulence * 0.5;\r
\r
    float totalIntensity = plasmaIntensity * 0.35 + flameIntensity * 0.25 + cellIntensity * 0.2 + turbIntensity * 0.2;\r
\r
    // Add bubbles as bright highlights\r
    totalIntensity += bubbles * 0.4;\r
\r
    totalIntensity *= spotDarkening;\r
    totalIntensity *= 1.0 + pulse * 0.5;\r
    totalIntensity = clamp(totalIntensity, 0.0, 1.8);\r
\r
    // ==========================================================================\r
    // COLOR MAPPING - strong contrast between hot/cool\r
    // ==========================================================================\r
    vec3 hotColor = baseColor * vec3(1.6, 1.35, 1.2);\r
    hotColor = min(hotColor, vec3(2.0));\r
    vec3 coolColor = baseColor * vec3(0.5, 0.3, 0.2);\r
    vec3 warmColor = baseColor * vec3(1.2, 1.0, 0.85);\r
    vec3 blazingColor = baseColor * vec3(2.0, 1.6, 1.3); // For bubble peaks\r
\r
    vec3 surfaceColor;\r
    if (totalIntensity < 0.35) {\r
        surfaceColor = mix(coolColor, warmColor, totalIntensity / 0.35);\r
    } else if (totalIntensity < 0.65) {\r
        surfaceColor = mix(warmColor, hotColor, (totalIntensity - 0.35) / 0.3);\r
    } else if (totalIntensity < 1.0) {\r
        surfaceColor = mix(hotColor, blazingColor, (totalIntensity - 0.65) / 0.35);\r
    } else {\r
        surfaceColor = blazingColor * (1.0 + (totalIntensity - 1.0) * 0.8);\r
    }\r
\r
    // Bubble highlights - extra bright spots\r
    float bubbleHighlight = pow(bubbles, 1.5) * turbulence;\r
    surfaceColor += blazingColor * bubbleHighlight * 0.6;\r
\r
    // Base glow\r
    float burnGlow = 0.6 + brightness * 0.4;\r
    surfaceColor *= burnGlow;\r
\r
    // Limb darkening\r
    float limbDark = pow(viewAngle, 0.4);\r
    surfaceColor *= 0.85 + limbDark * 0.15;\r
\r
    // Edge glow\r
    float edgeGlow = pow(edgeDist, 0.3) * flames * 0.4;\r
    surfaceColor += warmColor * edgeGlow;\r
\r
    // Center boost\r
    float centerBoost = pow(viewAngle, 1.5) * 0.3;\r
    surfaceColor += baseColor * centerBoost;\r
\r
    // Turbulent shimmer - subtle fast variation\r
    float shimmer = sin(turbulence * 10.0 + time * 3.0) * 0.05 + 1.0;\r
    surfaceColor *= shimmer;\r
\r
    return clamp(surfaceColor, 0.0, 2.5);\r
}\r
\r
// =============================================================================\r
// CORONA - Volumetric glow around the star (smooth falloff, no hard edges)\r
// =============================================================================\r
\r
vec3 corona(vec3 ro, vec3 rd, vec3 starColor, float time) {\r
    vec3 col = vec3(0.0);\r
\r
    // Use a larger radius but with smooth exponential falloff\r
    float b = dot(ro, rd);\r
\r
    // Find closest approach to star center\r
    float closestDist = sqrt(max(dot(ro, ro) - b * b, 0.0));\r
\r
    // Smooth falloff from star surface - no hard boundary\r
    float distFromSurface = closestDist - STAR_RADIUS;\r
    if (distFromSurface < -0.1) return col;  // Inside star\r
\r
    // Exponential density falloff (no hard edge)\r
    float density = exp(-max(distFromSurface, 0.0) * 2.5);\r
\r
    // Direction for noise - rotate with star\r
    vec3 closest = ro - rd * b;\r
    vec3 np = normalize(closest);\r
\r
    // Apply star rotation\r
    float starRot = time * 0.5;\r
    float cosR = cos(starRot);\r
    float sinR = sin(starRot);\r
    vec3 rotNp = vec3(np.x * cosR - np.z * sinR, np.y, np.x * sinR + np.z * cosR);\r
\r
    float angle = atan(rotNp.y, rotNp.x);\r
    float elev = acos(clamp(rotNp.z, -1.0, 1.0));\r
\r
    // Animated noise for variation\r
    float n = snoise3D(vec3(angle * 2.0, elev * 2.0, time * 0.15));\r
    n = abs(n) * 0.6 + 0.4;\r
\r
    // Second noise layer for more detail\r
    float n2 = snoise3D(vec3(angle * 4.0 + time * 0.1, elev * 3.0, time * 0.08));\r
    n2 = abs(n2) * 0.4 + 0.6;\r
\r
    density *= n * n2;\r
\r
    // Fade smoothly at edges\r
    density *= smoothstep(0.0, 0.15, distFromSurface + 0.1);\r
\r
    col = starColor * vec3(1.3, 1.0, 0.7) * density * 0.6;\r
\r
    return col;\r
}\r
\r
// =============================================================================\r
// SOLAR FLARES - Bright prominences (smooth falloff, no hard edges)\r
// =============================================================================\r
\r
vec3 solarFlares(vec3 ro, vec3 rd, vec3 starColor, float time) {\r
    vec3 col = vec3(0.0);\r
\r
    float b = dot(ro, rd);\r
    float closestDist = sqrt(max(dot(ro, ro) - b * b, 0.0));\r
\r
    // Smooth falloff instead of hard cutoff\r
    float innerFade = smoothstep(0.7, 1.0, closestDist);  // Fade in from star center\r
    float outerFade = exp(-(closestDist - 1.0) * 2.0);    // Exponential fade outward\r
    float flareMask = innerFade * outerFade;\r
\r
    if (flareMask < 0.01) return col;\r
\r
    vec3 closest = ro - rd * b;\r
    vec3 dir = normalize(closest);\r
\r
    // Apply star rotation to direction\r
    float starRot = time * 0.5;\r
    float cosR = cos(starRot);\r
    float sinR = sin(starRot);\r
    vec3 rotDir = vec3(dir.x * cosR - dir.z * sinR, dir.y, dir.x * sinR + dir.z * cosR);\r
\r
    // 6 flare sources - rotate with star\r
    for (float i = 0.0; i < 6.0; i++) {\r
        float flareAngle = i * TAU / 6.0;  // Fixed positions, star rotation handles movement\r
        float flareElev = PI * 0.5 + sin(i * 1.5) * 0.3;\r
\r
        vec3 flareDir = vec3(\r
            sin(flareElev) * cos(flareAngle),\r
            sin(flareElev) * sin(flareAngle),\r
            cos(flareElev)\r
        );\r
\r
        float alignment = max(dot(rotDir, flareDir), 0.0);\r
        alignment = pow(alignment, 12.0);\r
\r
        float flareIntensity = 0.5 + 0.5 * sin(time * 0.5 + i * 2.0);\r
        flareIntensity *= hash(i * 7.13 + floor(time * 0.1)) > 0.3 ? 1.0 : 0.4;\r
\r
        col += starColor * vec3(1.2, 0.85, 0.5) * alignment * flareIntensity * flareMask * 2.0;\r
    }\r
\r
    return col;\r
}\r
\r
// =============================================================================\r
// LIGHT RAYS - Radial god rays\r
// =============================================================================\r
\r
vec3 lightRays(vec2 uv, vec3 starColor, float time) {\r
    // Rotate UV with star\r
    float starRot = time * 0.5;\r
    float cosR = cos(starRot);\r
    float sinR = sin(starRot);\r
    vec2 rotUv = vec2(uv.x * cosR - uv.y * sinR, uv.x * sinR + uv.y * cosR);\r
\r
    float angle = atan(rotUv.y, rotUv.x);\r
    float dist = length(uv);\r
\r
    float rays = 0.0;\r
    for (float i = 1.0; i < 4.0; i++) {\r
        float rayAngle = angle * (4.0 + i * 2.0);\r
        float ray = sin(rayAngle) * 0.5 + 0.5;\r
        ray = pow(ray, 8.0);\r
        rays += ray / i;\r
    }\r
\r
    float falloff = 1.0 / (1.0 + dist * 4.0);\r
    falloff = pow(falloff, 2.0);\r
\r
    // Fade in outside star\r
    float rayMask = smoothstep(0.2, 0.35, dist);\r
\r
    return starColor * vec3(1.1, 0.95, 0.8) * rays * falloff * rayMask * 0.2;\r
}\r
\r
// =============================================================================\r
// OUTER GLOW - Soft bloom\r
// =============================================================================\r
\r
vec3 outerGlow(vec2 uv, vec3 starColor) {\r
    float dist = length(uv);\r
    float glow = 0.25 / (dist + 0.15);\r
    glow = pow(glow, 1.4) * 0.25;\r
    return starColor * vec3(1.1, 0.9, 0.7) * glow;\r
}\r
\r
// =============================================================================\r
// FLAME TONGUES - Visible protrusions that break the circular silhouette\r
// =============================================================================\r
\r
vec3 flameTongues(vec3 ro, vec3 rd, vec3 starColor, float time) {\r
    vec3 col = vec3(0.0);\r
\r
    // Find closest approach to star center\r
    float b = dot(ro, rd);\r
    float closestDist = sqrt(max(dot(ro, ro) - b * b, 0.0));\r
\r
    // Only render in the zone just outside the star (the silhouette area)\r
    if (closestDist < 0.85 || closestDist > 1.4) return col;\r
\r
    vec3 closest = ro - rd * b;\r
    vec3 dir = normalize(closest);\r
\r
    // Apply star rotation\r
    float starRot = time * 0.5;\r
    float cosR = cos(starRot);\r
    float sinR = sin(starRot);\r
    vec3 rotDir = vec3(dir.x * cosR - dir.z * sinR, dir.y, dir.x * sinR + dir.z * cosR);\r
\r
    float angle = atan(rotDir.y, rotDir.x);\r
    float elev = acos(clamp(rotDir.z, -1.0, 1.0));\r
\r
    // Multiple flame layers with different frequencies\r
    float flames = 0.0;\r
\r
    // Large slow-moving tongues\r
    float tongue1 = tiledNoise3D(vec3(angle / TAU * 8.0, elev / PI * 4.0, time * 0.08), 8.0);\r
    tongue1 = pow(max(tongue1, 0.0), 1.5);\r
\r
    // Medium flames\r
    float tongue2 = tiledNoise3D(vec3(angle / TAU * 16.0, elev / PI * 8.0, time * 0.12), 16.0);\r
    tongue2 = pow(max(tongue2, 0.0), 2.0);\r
\r
    // Small flickering details\r
    float tongue3 = snoise3D(vec3(angle * 6.0, elev * 4.0, time * 0.3));\r
    tongue3 = pow(max(tongue3, 0.0), 2.5);\r
\r
    flames = tongue1 * 0.5 + tongue2 * 0.35 + tongue3 * 0.15;\r
\r
    // Each flame extends to different heights based on noise\r
    float flameHeight = 0.15 + flames * 0.25;\r
    float distFromSurface = closestDist - STAR_RADIUS;\r
\r
    // Flame is visible if we're within its reach\r
    float flameReach = smoothstep(flameHeight, 0.0, distFromSurface);\r
    flameReach *= smoothstep(0.85, 1.0, closestDist); // Fade in from star surface\r
\r
    // Intensity varies with height (brighter at base)\r
    float heightFade = 1.0 - (distFromSurface / flameHeight);\r
    heightFade = pow(max(heightFade, 0.0), 0.7);\r
\r
    float intensity = flames * flameReach * heightFade;\r
\r
    // Color: hot at base, cooler at tips\r
    vec3 baseFlameColor = starColor * vec3(1.4, 1.1, 0.8);\r
    vec3 tipFlameColor = starColor * vec3(1.1, 0.7, 0.4);\r
    vec3 flameColor = mix(baseFlameColor, tipFlameColor, distFromSurface / 0.3);\r
\r
    col = flameColor * intensity * 1.2;\r
\r
    return col;\r
}\r
\r
// =============================================================================\r
// BACKGROUND STARS\r
// =============================================================================\r
\r
vec3 backgroundStars(vec3 rd) {\r
    vec3 stars = vec3(0.0);\r
    // Sharp pixel stars\r
    vec3 p = rd * 150.0;\r
    vec3 id = floor(p);\r
    vec3 f = fract(p) - 0.5;\r
    float h = hash3(id);\r
    if (h > 0.985) {\r
        // Sharp cutoff for pixel-like appearance\r
        float d = max(abs(f.x), max(abs(f.y), abs(f.z)));\r
        if (d < 0.15) {\r
            float bright = (h - 0.985) * 60.0;\r
            stars = vec3(bright * 0.6);\r
        }\r
    }\r
    return stars;\r
}\r
\r
// =============================================================================\r
// RAY-SPHERE INTERSECTION\r
// =============================================================================\r
\r
float intersectSphere(vec3 ro, vec3 rd, vec3 center, float radius) {\r
    vec3 oc = ro - center;\r
    float b = dot(oc, rd);\r
    float c = dot(oc, oc) - radius * radius;\r
    float h = b * b - c;\r
    if (h < 0.0) return -1.0;\r
    return -b - sqrt(h);\r
}\r
\r
// =============================================================================\r
// ROCKY PLANET SHADER\r
// =============================================================================\r
\r
vec3 renderRockyPlanet(vec2 uv, vec3 normal, vec3 baseColor, float seed) {\r
    vec2 terrainUv = uv + vec2(seed * 10.0, seed * 7.0);\r
\r
    // Vary base color\r
    vec3 hsv = rgb2hsv(baseColor);\r
    hsv.x = fract(hsv.x + seed * 0.15);\r
    hsv.y = clamp(hsv.y * 1.3, 0.5, 1.0);\r
    hsv.z = clamp(hsv.z * 1.1, 0.4, 1.0);\r
    vec3 variedColor = hsv2rgb(hsv);\r
\r
    // Terrain elevation\r
    float terrain = fbm2D(terrainUv * (3.0 + seed * 3.0));\r
\r
    // Color zones\r
    vec3 lowland = variedColor * 0.6;  // Oceans/valleys\r
    vec3 highland = variedColor * 1.1; // Land\r
    vec3 peak = variedColor * 1.4;     // Mountains/ice caps\r
\r
    // Mix by elevation\r
    vec3 surfaceColor = mix(lowland, highland, smoothstep(0.3, 0.6, terrain));\r
    surfaceColor = mix(surfaceColor, peak, smoothstep(0.7, 0.9, terrain));\r
\r
    // Craters\r
    float craters = snoise2D(terrainUv * (25.0 + seed * 15.0));\r
    float craterMask = smoothstep(0.8, 0.7, craters);\r
    surfaceColor *= (1.0 - craterMask * 0.25);\r
\r
    // Fine detail\r
    float detail = snoise2D(terrainUv * 40.0) * 0.05;\r
    surfaceColor += surfaceColor * detail;\r
\r
    // Limb darkening (atmosphere effect)\r
    float limb = smoothstep(-0.2, 0.8, normal.z);\r
    surfaceColor *= 0.4 + limb * 0.6;\r
\r
    return surfaceColor;\r
}\r
\r
// =============================================================================\r
// MAIN\r
// =============================================================================\r
\r
void mainImage(out vec4 fragColor, in vec2 fragCoord) {\r
    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;\r
\r
    // Mouse control\r
    float camDist = 9.0;\r
    float camAngleX, camAngleY;\r
\r
    // Has mouse ever been clicked?\r
    bool mouseUsed = iMouse.x > 0.0 || iMouse.y > 0.0;\r
\r
    if (!mouseUsed) {\r
        // Auto-rotate until first interaction\r
        camAngleX = iTime * 0.1;\r
        camAngleY = 0.15;\r
    } else {\r
        // After first click: auto-rotate continues, mouse offset persists\r
        // iMouse.xy holds last position even after release\r
        vec2 mouse = iMouse.xy / iResolution.xy;\r
\r
        // Auto-rotate base + mouse offset\r
        // Mouse X scrolls through angles, wrapping around\r
        camAngleX = iTime * 0.1 + mouse.x * TAU * 2.0;\r
        camAngleY = 0.15 + (mouse.y - 0.5) * PI * 0.5;\r
    }\r
\r
    camAngleY = clamp(camAngleY, -0.8, 0.8);\r
\r
    vec3 ro = vec3(\r
        camDist * cos(camAngleY) * sin(camAngleX),\r
        camDist * sin(camAngleY),\r
        camDist * cos(camAngleY) * cos(camAngleX)\r
    );\r
\r
    vec3 forward = normalize(-ro);\r
    vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), forward));\r
    vec3 up = cross(forward, right);\r
    vec3 rd = normalize(forward + uv.x * right + uv.y * up);\r
\r
    // === TEMPERATURE CYCLING ===\r
    // Offset so we start at nice orange (4000K) and cycle through all types\r
    float tempCycle = mod(iTime * 0.08 + 0.3125, 1.0);  // Start at orange, full cycle ~12s\r
    float temperature;\r
    if (tempCycle < 0.125) temperature = mix(4000.0, 5778.0, tempCycle / 0.125);       // Orange -> Yellow\r
    else if (tempCycle < 0.25) temperature = mix(5778.0, 7500.0, (tempCycle - 0.125) / 0.125);   // Yellow -> White\r
    else if (tempCycle < 0.375) temperature = mix(7500.0, 10000.0, (tempCycle - 0.25) / 0.125);  // White -> Blue-white\r
    else if (tempCycle < 0.5) temperature = mix(10000.0, 25000.0, (tempCycle - 0.375) / 0.125);  // Blue-white -> Blue\r
    else if (tempCycle < 0.625) temperature = mix(25000.0, 800.0, (tempCycle - 0.5) / 0.125);    // Blue -> Magenta (wrap)\r
    else if (tempCycle < 0.75) temperature = mix(800.0, 2500.0, (tempCycle - 0.625) / 0.125);    // Magenta -> Red\r
    else if (tempCycle < 0.875) temperature = mix(2500.0, 3500.0, (tempCycle - 0.75) / 0.125);   // Red -> Orange-red\r
    else temperature = mix(3500.0, 4000.0, (tempCycle - 0.875) / 0.125);                          // Orange-red -> Orange\r
\r
    vec3 starColor = temperatureToColor(temperature);\r
    // Normalize to prevent washout\r
    float maxC = max(starColor.r, max(starColor.g, starColor.b));\r
    if (maxC > 0.01) starColor = starColor / maxC * 0.85;\r
\r
    // Background\r
    vec3 col = backgroundStars(rd) * 0.5;\r
\r
    // Outer glow (behind everything)\r
    col += outerGlow(uv, starColor);\r
\r
    // Light rays\r
    col += lightRays(uv, starColor, iTime);\r
\r
    // Corona volume\r
    col += corona(ro, rd, starColor, iTime);\r
\r
    // Solar flares\r
    col += solarFlares(ro, rd, starColor, iTime);\r
\r
    // Flame tongues - break the circular silhouette\r
    col += flameTongues(ro, rd, starColor, iTime);\r
\r
    // Raymarch star sphere\r
    float b = dot(ro, rd);\r
    float c = dot(ro, ro) - STAR_RADIUS * STAR_RADIUS;\r
    float h = b * b - c;\r
\r
    if (h > 0.0) {\r
        float t = -b - sqrt(h);\r
        if (t > 0.0) {\r
            vec3 p = ro + rd * t;\r
            vec3 n = normalize(p);\r
\r
            // Rotate star around its axis (fast spin)\r
            float starRotation = iTime * 0.5;\r
            float cosR = cos(starRotation);\r
            float sinR = sin(starRotation);\r
            vec3 rotatedP = vec3(\r
                p.x * cosR - p.z * sinR,\r
                p.y,\r
                p.x * sinR + p.z * cosR\r
            );\r
\r
            col = starSurface(rotatedP, n, rd, starColor, iTime);\r
\r
            // Organic rim glow - varies around the edge to break circular silhouette\r
            float rim = 1.0 - max(dot(n, -rd), 0.0);\r
\r
            // Add noise to rim intensity based on position\r
            float rimAngle = atan(n.y, n.x);\r
            float rimElev = acos(n.z);\r
            float rimNoise = snoise3D(vec3(rimAngle * 3.0, rimElev * 2.0, iTime * 0.2));\r
            rimNoise = rimNoise * 0.5 + 0.5;\r
\r
            // Flame-like protrusions at the edge\r
            float flameRim = tiledNoise3D(vec3(rimAngle / TAU, rimElev / PI, iTime * 0.15), 12.0);\r
            flameRim = abs(flameRim);\r
\r
            // Combine for organic edge\r
            float rimIntensity = pow(rim, 2.5) * (0.4 + rimNoise * 0.6 + flameRim * 0.5);\r
            col += starColor * vec3(1.3, 0.95, 0.6) * rimIntensity * 0.8;\r
\r
            // Extra bright spots that "pop" out\r
            float hotSpots = pow(rimNoise * flameRim, 2.0);\r
            col += starColor * vec3(1.5, 1.1, 0.7) * hotSpots * rim * 0.5;\r
        }\r
    }\r
\r
    // =========================================================================\r
    // ORBITING PLANET\r
    // =========================================================================\r
\r
    // Planet orbital position (orbits around star)\r
    float orbitAngle = iTime * PLANET_ORBIT_SPEED;\r
    vec3 planetCenter = vec3(\r
        cos(orbitAngle) * PLANET_ORBIT_RADIUS,\r
        0.0,  // Flat orbit, centered on star\r
        sin(orbitAngle) * PLANET_ORBIT_RADIUS\r
    );\r
\r
    // Check if ray hits planet\r
    float planetHitDist = intersectSphere(ro, rd, planetCenter, PLANET_RADIUS);\r
\r
    // Check if ray hits star (for depth comparison)\r
    float starHitDist = intersectSphere(ro, rd, vec3(0.0), STAR_RADIUS);\r
    if (starHitDist < 0.0) starHitDist = 1e10;  // No hit = far away\r
\r
    // Only render planet if it's in front of the star\r
    if (planetHitDist > 0.0 && planetHitDist < starHitDist) {\r
        vec3 hitPoint = ro + rd * planetHitDist;\r
        vec3 planetNormal = normalize(hitPoint - planetCenter);\r
\r
        // Planet self-rotation for UV mapping\r
        float rotAngle = iTime * PLANET_ROTATION_SPEED;\r
        float cosR = cos(rotAngle);\r
        float sinR = sin(rotAngle);\r
        vec3 rotatedNormal = vec3(\r
            planetNormal.x * cosR - planetNormal.z * sinR,\r
            planetNormal.y,\r
            planetNormal.x * sinR + planetNormal.z * cosR\r
        );\r
\r
        // UV from rotated coordinates\r
        float latitude = 0.5 + asin(rotatedNormal.y) / PI;\r
        float longitude = 0.5 + atan(rotatedNormal.x, rotatedNormal.z) / TAU;\r
        vec2 planetUv = vec2(longitude, latitude);\r
\r
        // View-space normal for limb darkening\r
        vec3 viewNormal = planetNormal;\r
        viewNormal.z = dot(planetNormal, -rd);\r
\r
        // Render planet surface\r
        vec3 planetSurface = renderRockyPlanet(planetUv, viewNormal, PLANET_BASE_COLOR, 0.42);\r
\r
        // === STAR LIGHTING ===\r
        vec3 lightDir = normalize(-planetCenter);  // Direction to star (at origin)\r
        float diffuse = max(dot(planetNormal, lightDir), 0.0);\r
\r
        // Boost diffuse for more visible lighting\r
        diffuse = pow(diffuse, 0.7);  // Soften falloff for more light coverage\r
\r
        // Smooth terminator (day/night transition)\r
        float terminator = smoothstep(-0.05, 0.15, diffuse);\r
\r
        // Ambient light\r
        float ambient = 0.08;\r
\r
        // Night side\r
        vec3 nightColor = planetSurface * ambient;\r
\r
        // Day side - much brighter, strongly lit by star\r
        vec3 dayColor = planetSurface * (0.3 + diffuse * 1.2);\r
\r
        // Tint day side with star color (stronger tint)\r
        dayColor *= mix(vec3(1.0), starColor * 1.5, 0.5);\r
\r
        vec3 planetCol = mix(nightColor, dayColor, terminator);\r
\r
        // Atmospheric rim glow (catches star light at edges)\r
        float rimLight = pow(1.0 - abs(dot(viewNormal, vec3(0.0, 0.0, 1.0))), 2.5);\r
        float rimLit = max(dot(planetNormal, lightDir) + 0.4, 0.0);\r
        planetCol += starColor * rimLight * rimLit * 0.5;\r
\r
        col = planetCol;\r
    }\r
\r
    // Post-processing\r
    col = col / (1.0 + col);  // Tone mapping\r
    col = pow(col, vec3(0.9));  // Gamma\r
    col *= 1.0 - dot(uv, uv) * 0.15;  // Vignette\r
    col += col * col * 0.08;  // Subtle bloom\r
\r
    fragColor = vec4(col, 1.0);\r
}\r
`},channels:{}},{slug:"star-sun",title:"Solar",description:"Our Sun rendered as a yellow-white star with balanced convection cells, moderate flare activity, and a warm corona glow. Temperature set to 5778K.",date:"2025-11-29",tags:["exoplanets","space","3d","raymarching"],links:{},screenshotUrl:Lf,passes:{image:`/**
 * Solar Star
 * @author guinetik
 * @date 2025-11-29
 *
 * Our Sun -- a yellow-white G-type main sequence star with balanced convection
 * cells, moderate flare activity, and a warm corona glow. Temperature set to
 * 5778K, the measured effective temperature of the Sun.
 *
 * Based on the exoplanets v2 star shaders by guinetik.
 *
 * Rendering layers (back to front):
 *   1. Background      — near-black with subtle warm tint
 *   2. Glow            — inverse-square radial falloff, warm yellow-orange
 *   3. Corona          — FBM flame tendrils + 3 cyclic prominences
 *   4. Star surface    — convection cells, plasma flow, sunspots, limb darkening
 *   5. Tone mapping    — Reinhard operator with exposure boost
 *
 * TECHNIQUE: Ray-sphere intersection with orbiting camera, identical structure
 * to the red dwarf shader but with tuned parameters for a G-type star.
 *
 * TECHNIQUE: Limb darkening with pow(viewAngle, 0.4). The exponent is slightly
 * higher than the red dwarf (0.35), producing a gentler falloff consistent with
 * the Sun's radiative/convective boundary layer structure.
 *
 * TECHNIQUE: Moderate prominence activity. 3 prominences (vs 4 for red dwarf)
 * with slower lifecycle oscillation and tighter angular masking, reflecting the
 * Sun's calmer magnetic activity compared to fully-convective red dwarfs.
 *
 * Physics: Color palette approximates ~5778K blackbody radiation — warm
 * yellow-white surface with orange-tinted cooler granule edges and near-white
 * hot granule centers. Sunspots are darker (smoothstep threshold 0.55-0.8)
 * and less frequent than on the red dwarf.
 *
 * Noise: 3D simplex noise (Ashima Arts implementation), same as the red dwarf
 * shader. FBM octave counts are identical but frequency multipliers are lower,
 * producing larger, smoother convection cells appropriate for a larger star.
 */

#define PI 3.14159265359   // Half-circle — used for prominence angular wrapping
#define TAU 6.28318530718  // Full circle — used for prominence distribution

// =============================================================================
// NOISE — 3D Simplex Noise (Ashima Arts / Stefan Gustavson)
// =============================================================================
// Same simplex noise implementation as the red dwarf shader. Smooth, isotropic
// gradients produce convincing stellar surface turbulence.

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

// FBM with configurable octaves — lacunarity 2.0, gain 0.5
// Same structure as red dwarf but called with lower base frequencies
// to produce the Sun's larger, smoother convection features.
float fbm(vec3 p, int octaves) {
    float v = 0.0, a = 0.5, f = 1.0;
    for (int i = 0; i < 6; i++) {
        if (i >= octaves) break;
        v += a * snoise(p * f);
        f *= 2.0;         // Double frequency each octave
        a *= 0.5;         // Halve amplitude each octave
        p += vec3(100.0); // Domain shift to decorrelate
    }
    return v;
}

// =============================================================================
// SOLAR PALETTE — yellow-white with warm tones
// =============================================================================
// Physics: ~5778K blackbody color ramp. The Sun's peak emission is in the
// green-yellow band (Wien's law: ~500nm), but the broad spectrum appears
// yellow-white to the human eye.

vec3 starRamp(float t) {
    const vec3 SPOT     = vec3(0.35, 0.12, 0.02);    // Dark sunspot — ~3500-4500K cooler magnetic region
    const vec3 COOL     = vec3(0.9, 0.5, 0.1);       // Cooler granule edge — intergranular lanes
    const vec3 WARM     = vec3(1.0, 0.75, 0.3);      // Warm surface — average photosphere
    const vec3 HOT      = vec3(1.0, 0.92, 0.6);      // Hot granule center — convective upwelling
    const vec3 BRIGHT   = vec3(1.0, 1.0, 0.9);       // Brightest — near white, flare or facular region

    if (t < 0.15) return mix(SPOT, COOL, t / 0.15);
    if (t < 0.4)  return mix(COOL, WARM, (t - 0.15) / 0.25);
    if (t < 0.7)  return mix(WARM, HOT, (t - 0.4) / 0.3);
    return mix(HOT, BRIGHT, (t - 0.7) / 0.3);
}

// =============================================================================
// STAR SURFACE — moderate activity (G-type main sequence)
// =============================================================================
// Convection frequencies are lower than the red dwarf (4.5/10/20 vs 5/12/25)
// and time multipliers are slower, producing larger, calmer granulation cells
// consistent with the Sun's ~1000km granule size.

float convectionCells(vec3 p, float time) {
    float cells = snoise(p * 4.5 + vec3(0.0, time * 0.015, 0.0));    // Large granules — freq 4.5
    float med = snoise(p * 10.0 + vec3(time * 0.01, 0.0, time * 0.008)); // Medium detail — freq 10.0
    float fine = snoise(p * 20.0 + vec3(0.0, time * 0.02, time * 0.015)); // Fine texture — freq 20.0
    return cells * 0.5 + med * 0.3 + fine * 0.2;  // Weighted blend
}

// Sunspots — cooler magnetic regions. Lower frequency (2.5) and higher
// threshold (0.55) than red dwarf = fewer, larger spots. The Sun's ~11-year
// cycle produces 0-200 spots; this approximates moderate activity.
float starSpots(vec3 p, float time) {
    float spots = snoise(p * 2.5 + vec3(0.0, time * 0.004, 0.0));  // Freq 2.5 — large spot groups
    return smoothstep(0.55, 0.8, spots);  // Higher threshold = fewer spots than red dwarf (0.5)
}

float plasmaFlow(vec3 p, float time) {
    vec3 q = p * 3.0;
    q += vec3(sin(time * 0.08) * 0.25, cos(time * 0.1) * 0.25, time * 0.04);
    float n1 = fbm(q, 5) * 0.5 + 0.5;

    vec3 r = p * 4.0 + vec3(50.0);
    r += vec3(cos(time * 0.06) * 0.3, sin(time * 0.09) * 0.25, time * 0.05);
    float n2 = fbm(r, 4) * 0.5 + 0.5;

    return n1 * 0.6 + n2 * 0.4;
}

// Surface rendering — moderate activity parameters compared to red dwarf.
vec3 renderSurface(vec3 spherePos, float viewAngle, float time) {
    float edgeDist = 1.0 - viewAngle;

    float plasma = plasmaFlow(spherePos, time);
    float cells = convectionCells(spherePos, time) * 0.5 + 0.5;
    float spots = starSpots(spherePos, time);

    // Gentler pulse than red dwarf — +/-8% vs +/-10%
    float pulse = 0.92 + 0.08 * sin(time * 0.4 + snoise(spherePos * 2.0) * 3.0);

    float heat = plasma * 0.6 + cells * 0.4;
    heat *= pulse;
    heat *= 1.0 - spots * 0.65;   // 65% spot darkening (vs 70% for red dwarf)

    // TECHNIQUE: Limb darkening — pow(viewAngle, 0.4). Slightly gentler than
    // red dwarf (0.35) due to Sun's radiative-convective boundary structure.
    float limb = pow(viewAngle, 0.4);
    heat *= 0.7 + limb * 0.3;

    // Moderate edge flares — steeper falloff (2.5) and lower intensity (0.2)
    // than red dwarf (2.0, 0.3), reflecting the Sun's calmer magnetic activity
    float edgeFlare = pow(edgeDist, 2.5) * fbm(spherePos * 7.0 + vec3(time * 0.15), 3);
    heat += edgeFlare * 0.2;

    heat = clamp(heat, 0.0, 1.0);

    vec3 color = starRamp(heat) * (1.5 + heat * 1.5);
    // Yellow-white granule highlights — warmer tint than red dwarf's orange
    color += vec3(1.0, 0.85, 0.4) * pow(max(cells - 0.3, 0.0), 2.0) * limb * 1.5;

    return color;
}

// =============================================================================
// GLOW AND CORONA — warm yellow-white
// =============================================================================

// Radial glow — same structure as red dwarf but with yellow-white tint and
// slightly lower intensity (0.12 vs 0.15) for the Sun's more moderate luminosity.
vec3 renderGlow(vec2 p, float starRadius) {
    float dist = length(p);
    float r = dist / starRadius;

    float glow = 1.0 / (r * r * 1.5 + 0.01);     // Inverse-square falloff
    glow *= smoothstep(4.0, 1.0, r);               // Fade beyond 4x radius
    vec3 glowColor = vec3(1.0, 0.7, 0.2) * glow * 0.12;  // Warm yellow glow

    float haze = 1.0 / (r * r * 5.0 + 0.1);       // Outer haze layer
    haze *= smoothstep(6.0, 1.5, r);
    glowColor += vec3(0.8, 0.4, 0.08) * haze * 0.08;  // Orange outer haze

    return glowColor;
}

// Corona — same structure as red dwarf but with calmer parameters:
// - Steeper decay (4.5 vs 4.0) = more concentrated near surface
// - Lower base intensity (0.7 vs 0.9)
// - Only 3 prominences at 1.0x brightness (vs 4 at 1.5x)
vec3 renderCorona(vec2 p, float starRadius, float time) {
    float dist = length(p);
    float r = dist / starRadius;

    if (r < 1.0 || r > 2.0) return vec3(0.0);

    float rimFactor = (r - 1.0);
    float angle = atan(p.y, p.x);

    // Two-layer flame pattern — slightly slower than red dwarf (0.25/0.18 vs 0.3/0.2)
    float flame1 = fbm(vec3(angle * 2.0, rimFactor * 5.0, time * 0.25), 4);
    float flame2 = fbm(vec3(angle * 4.0 + 10.0, rimFactor * 3.0, time * 0.18), 3);
    float flames = (flame1 * 0.6 + flame2 * 0.4) * 0.5 + 0.5;

    float fade = exp(-rimFactor * 4.5);       // Steeper decay than red dwarf (4.5 vs 4.0)
    float intensity = flames * fade * 0.7;     // Lower base intensity — calmer corona

    // Fewer, calmer prominences — 3 (vs 4 for red dwarf)
    // Tighter angular mask (10.0 vs 8.0) and slower lifecycle (0.2 vs 0.25)
    for (int i = 0; i < 3; i++) {
        float fi = float(i);
        float promAngle = fract(fi * 0.618 + 0.4) * TAU;
        float angleDiff = abs(mod(angle - promAngle + PI, TAU) - PI);
        float promMask = exp(-angleDiff * angleDiff * 10.0);  // Narrower than red dwarf (10 vs 8)
        float lifecycle = max(sin(time * 0.2 * (1.0 + fi * 0.3) + fi * 2.5), 0.0);
        intensity += promMask * lifecycle * fade * 1.0;        // 1.0x prominence (vs 1.5x for red dwarf)
    }

    vec3 coronaColor = mix(vec3(1.0, 0.75, 0.25), vec3(1.0, 0.5, 0.08), rimFactor);
    return coronaColor * intensity;
}

// =============================================================================
// MAIN
// =============================================================================

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 p = (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);
    float time = mod(iTime, 1000.0);

    float starRadius = 0.85;   // World-space star radius
    float focalLength = 1.5;  // Camera focal length

    // Slightly slower orbit than red dwarf (0.12 vs 0.15)
    float rotX = time * 0.12;              // Horizontal orbit speed
    float rotY = sin(time * 0.06) * 0.25;  // Vertical bob — gentler than red dwarf (+/-0.25 vs 0.3)

    float camDist = 3.5;  // Camera distance
    vec3 camPos = vec3(
        camDist * sin(rotX) * cos(rotY),
        camDist * sin(rotY),
        camDist * cos(rotX) * cos(rotY)
    );

    vec3 camDir = normalize(-camPos);
    vec3 camRight = normalize(cross(vec3(0.0, 1.0, 0.0), camDir));
    vec3 camUp = cross(camDir, camRight);
    vec3 rd = normalize(p.x * camRight + p.y * camUp + focalLength * camDir);

    // Project world-space radius to screen space for glow/corona alignment
    float apparentRadius = starRadius / sqrt(camDist * camDist - starRadius * starRadius) * focalLength;

    vec3 color = vec3(0.0, 0.0, 0.01);  // Near-black background with warm tint

    color += renderGlow(p, apparentRadius);
    color += renderCorona(p, apparentRadius, time);

    // Ray-sphere intersection (quadratic formula)
    vec3 oc = camPos;
    float b = dot(oc, rd);
    float c = dot(oc, oc) - starRadius * starRadius;
    float h = b * b - c;

    if (h > 0.0) {
        float t = -b - sqrt(h);
        if (t > 0.0) {
            vec3 hitPos = camPos + rd * t;
            vec3 normal = normalize(hitPos);
            vec3 spherePos = normal;

            float starRot = time * 0.04;  // Axial rotation — slower than red dwarf (0.04 vs 0.05)
            float cs = cos(starRot), sn = sin(starRot);
            spherePos = vec3(
                spherePos.x * cs + spherePos.z * sn,
                spherePos.y,
                -spherePos.x * sn + spherePos.z * cs
            );

            float viewAngle = max(dot(normal, normalize(camPos - hitPos)), 0.0);
            color = renderSurface(spherePos, viewAngle, time);
        }
    }

    // Tone mapping — Reinhard with 1.8x exposure (same as red dwarf)
    color *= 1.8;
    color = color / (color + vec3(1.0));
    color += vec3(0.008, 0.004, 0.0);   // Warm tint to blacks
    color = pow(color, vec3(0.85));      // Gamma — brighter than standard 0.45

    fragColor = vec4(color, 1.0);
}
`},channels:{}},{slug:"stargate",title:"Stargate Study",description:"A raymarched infinite corridor effect inspired by the 2001: A Space Odyssey Stargate sequence. The shader creates a pseudo-3D tunnel by sphere-tracing through a box corridor, mapping the input video/image onto the walls with noise-based distortion.",date:"2026-02-02",tags:["10-days","raymarching","3d"],links:{},screenshotUrl:Of,passes:{image:`/**\r
 * Stargate Study\r
 * @author guinetik\r
 * @date 2026-02-02\r
 *\r
 * A raymarched infinite corridor effect inspired by the 2001: A Space Odyssey\r
 * Stargate sequence. Sphere-traces through a box corridor, mapping the input\r
 * image onto walls with noise-based distortion and cycling hue shifts.\r
 *\r
 * Techniques:\r
 * - Raymarched box corridor with wall-distance SDF\r
 * - Input texture mapped to walls with noise-warped UVs\r
 * - HSV hue cycling over time and depth for psychedelic color\r
 * - Screen blend compositing (additive light model)\r
 * - Alternating horizontal/vertical tunnel orientation every 4 seconds\r
 *\r
 * @project Genuary 2026\r
 * @see https://genuary2026.guinetik.com\r
 */\r
\r
#define PI 3.14159265359\r
\r
// ---------------------------------------------------------------------------\r
// Noise utilities\r
// ---------------------------------------------------------------------------\r
\r
/** Pseudo-random hash — returns [-1, 1] range for signed noise. */\r
float hash(vec2 p) {\r
    p = 50.0 * fract(p * 0.3183099 + vec2(0.71, 0.113));\r
    return -1.0 + 2.0 * fract(p.x * p.y * (p.x + p.y));\r
}\r
\r
/** 2D value noise with Hermite smoothing — returns [-1, 1]. */\r
float noise(vec2 p) {\r
    vec2 i = floor(p);\r
    vec2 f = fract(p);\r
    vec2 u = f * f * (3.0 - 2.0 * f);\r
\r
    return mix(\r
        mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),\r
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),\r
        u.y);\r
}\r
\r
// ---------------------------------------------------------------------------\r
// Blend modes and color space\r
// ---------------------------------------------------------------------------\r
\r
/** Screen blend mode — 1-(1-a)*(1-b). Adds light without blowing out to white. */\r
vec3 blendScreen(vec3 base, vec3 blend) {\r
    return 1.0 - (1.0 - base) * (1.0 - blend);\r
}\r
\r
/** RGB to HSV conversion — used for hue-shifting wall textures. */\r
vec3 rgb2hsv(vec3 c) {\r
    vec4 K = vec4(0.0, -1.0/3.0, 2.0/3.0, -1.0);\r
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));\r
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));\r
    float d = q.x - min(q.w, q.y);\r
    float e = 1.0e-10;\r
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);\r
}\r
\r
/** HSV to RGB conversion. */\r
vec3 hsv2rgb(vec3 c) {\r
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);\r
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\r
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\r
}\r
\r
// ---------------------------------------------------------------------------\r
// Raymarch tunnel\r
// ---------------------------------------------------------------------------\r
\r
// TECHNIQUE: Raymarched box corridor\r
// The SDF is simply the minimum distance to the four walls (two horizontal\r
// or two vertical depending on orientation). The ray marches forward until\r
// it hits a wall, then the wall is textured with the input image and\r
// noise-warped UVs for a psychedelic Stargate look.\r
\r
/**\r
 * Raymarch an infinite corridor and sample the input texture on the walls.\r
 * @param isVertical 0.0 = horizontal walls, 1.0 = vertical walls\r
 */\r
vec3 raymarchTunnel(vec2 uv, float time, sampler2D videoTex, float isVertical) {\r
    const float FOV_ZOOM = 0.4;  // Controls field-of-view width — smaller = wider FOV\r
\r
    // Camera oscillation — subtle drift for organic camera movement\r
    float oscillation = 0.1 * sin(time * 1.137) * (1.0 + 0.1 * cos(time * 0.37));\r
\r
    // Camera rotation — snaps between 0 and 90 degrees using smoothstep threshold\r
    float rot = smoothstep(-0.005, 0.005, sin(0.1 * time + 4.0)) * PI * 0.5;\r
    float c = cos(rot), s = sin(rot);\r
    uv = uv * mat2(c, -s, s, c);\r
\r
    // Camera setup — slightly off-center, looking mostly down the corridor\r
    vec3 camPos = vec3(oscillation, sin(time * 17.39) * oscillation * oscillation, -1.0);\r
    vec3 forward = normalize(mix(-camPos, vec3(0.0, 0.0, 1.0), 0.6));\r
    vec3 up = vec3(0.0, 1.0, 0.0);\r
    vec3 right = cross(forward, up);\r
\r
    // Ray direction — project screen pixel through camera basis\r
    vec3 screenPoint = camPos + forward * FOV_ZOOM + uv.x * right + uv.y * up;\r
    vec3 rayDir = normalize(screenPoint - camPos);\r
\r
    // Raymarch through the corridor (250 max steps)\r
    vec3 rayPos;\r
    float rayLength = 0.0;\r
    float stepDist = 0.0;\r
\r
    for (int i = 0; i < 250; i++) {\r
        rayPos = camPos + rayDir * rayLength;\r
\r
        // Distance to walls\r
        float vertStep = min(abs(rayPos.y - 1.0), abs(rayPos.y + 1.0));\r
        float horizStep = min(abs(rayPos.x - 1.0), abs(rayPos.x + 1.0));\r
        stepDist = mix(horizStep, vertStep, isVertical);\r
\r
        if (stepDist < 0.001) break;\r
        rayLength += stepDist;\r
    }\r
\r
    // Base color - bright white center that feathers out\r
    float centerDist = length(uv);\r
    float centerGlow = exp(-centerDist * 2.0);  // Exponential falloff from center\r
    vec3 col = vec3(1.0) * centerGlow + vec3(0.1) * (1.0 - centerGlow);\r
\r
    // If hit wall, sample video texture\r
    if (stepDist < 0.001) {\r
        // Compute wall UVs\r
        vec2 wallUV_horiz = vec2(rayPos.z, rayPos.y + step(rayPos.x, 0.0) * 33.1 + time * 0.097);\r
        vec2 wallUV_vert = vec2(rayPos.z, rayPos.x + step(rayPos.y, 0.0) * 33.1 + time * 0.097);\r
        vec2 wallUV = mix(wallUV_horiz, wallUV_vert, isVertical);\r
        wallUV.x += time * 7.0;\r
\r
        // Sample video texture\r
        vec2 sampleUV = clamp(fract(wallUV * 0.1) * 0.5 + 0.25, 0.001, 0.999);\r
        vec3 wallColor = texture(videoTex, sampleUV).rgb;\r
\r
        // Noise variation\r
        float noiseVal = noise(wallUV * 2.2);\r
        vec3 noiseColor = texture(videoTex, clamp(fract(sampleUV + noiseVal * 0.1), 0.001, 0.999)).rgb;\r
\r
        // Animated mix\r
        float mixFactor = 0.6 + 0.35 * sin(0.253 * time);\r
        wallColor = mix(noiseColor, wallColor, mixFactor);\r
\r
        // TECHNIQUE: HSV hue cycling (2001 Stargate homage)\r
        // Hue rotates with time and ray depth so distant walls shift color\r
        // faster, creating the characteristic psychedelic corridor effect.\r
        vec3 hsv = rgb2hsv(wallColor);\r
        float hueShift = time * 0.15 + rayLength * 0.1;  // Time + depth based\r
        hsv.x = fract(hsv.x + hueShift);\r
        hsv.y = min(hsv.y * 1.3, 1.0);  // Boost saturation\r
        wallColor = hsv2rgb(hsv);\r
\r
        // Perspective fade\r
        float fade = mix(\r
            min(7.0 * abs(uv.x), 1.0),\r
            min(7.0 * abs(uv.y), 1.0),\r
            isVertical\r
        );\r
        wallColor *= fade;\r
\r
        col = mix(col, wallColor, fade);\r
    }\r
\r
    return col;\r
}\r
\r
void mainImage(out vec4 fragColor, in vec2 fragCoord)\r
{\r
    vec2 uv = fragCoord / iResolution.xy;\r
    float aspect = iResolution.x / iResolution.y;\r
    float time = iTime;\r
\r
    // === BASE VIDEO ===\r
    vec3 baseColor = texture(iChannel0, uv).rgb;\r
\r
    // Fallback gradient if no texture\r
    if (length(texture(iChannel0, vec2(0.5)).rgb) < 0.01) {\r
        baseColor = vec3(0.1, 0.1, 0.15);\r
        baseColor += vec3(0.05, 0.1, 0.15) * (1.0 - length(uv - 0.5));\r
    }\r
\r
    // === TUNNEL ===\r
    // Alternate orientation every 4 seconds\r
    float tunnelOrientation = mod(floor(time / 4.0), 2.0);\r
\r
    // Centered coords for tunnel\r
    vec2 tunnelUV = (uv - 0.5) * 2.0;\r
    tunnelUV.x *= aspect;\r
\r
    // Raymarch the tunnel\r
    vec3 tunnelColor = raymarchTunnel(tunnelUV, time, iChannel0, tunnelOrientation);\r
\r
    // === SCREEN BLEND ===\r
    // Tunnel adds light on top of video\r
    vec3 blended = blendScreen(baseColor, tunnelColor * 0.8);\r
\r
    // Mix amount\r
    float tunnelMix = 0.9;\r
    vec3 color = mix(baseColor, blended, tunnelMix);\r
\r
    // === CENTER WHITE GLOW ===\r
    // Add extra bright white feathered glow at center\r
    float centerDist = length(uv - 0.5);\r
    float whiteGlow = exp(-centerDist * 4.0);  // Tight exponential falloff\r
    color = mix(color, vec3(1.0), whiteGlow * 0.8);\r
\r
    // === POST ===\r
    // Vignette (softer to preserve center brightness)\r
    float vig = 1.0 - length(uv - 0.5) * 0.3;\r
    color *= vig;\r
\r
    fragColor = vec4(color, 1.0);\r
}\r
`},channels:{image:{iChannel0:"textures/landscape.jpeg"}}},{slug:"thomas",title:"Attractor Study #04: Thomas",description:"Thomas' cyclically symmetric attractor (1999) with 16 particles traced through 3D phase space. Drag to rotate.",date:"2026-02-13",tags:["attractors","simulation","3d"],links:{},screenshotUrl:kf,passes:{image:`/**
 * Attractor Study #04: Thomas — Image Pass
 * @author guinetik
 * @date 2026-02-13
 *
 * Composite pass for Thomas' cyclically symmetric attractor. Reads the
 * accumulated trail from Buffer A, applies filmic tone-mapping and a soft
 * vignette for final display. Ported from gcanvas attractor-3d-demo / thomas.js.
 */

// TECHNIQUE: Filmic tone-mapping via exponential exposure
// The formula col = 1 - exp(-col * EXPOSURE) compresses HDR accumulation
// from the buffer into displayable [0,1] range while preserving bright detail.
#define EXPOSURE 2.5        // Tone-map strength — higher values brighten midtones
                            // and compress highlights. Below 1.0: dim/flat. Above 4.0: washed out.
#define VIGNETTE_STRENGTH 0.3  // Darkening at screen edges — 0.0 = none, 0.5 = heavy.

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord.xy / iResolution.xy;
    vec3 col = texture(iChannel0, uv).rgb;
    col = 1.0 - exp(-col * EXPOSURE);
    float vig = 1.0 - VIGNETTE_STRENGTH * length(uv - 0.5);
    col *= vig;
    fragColor = vec4(col, 1.0);
}
`,bufferA:`/**
 * Attractor Study #04: Thomas — Buffer A (Simulation + Trail Rendering)
 * @author guinetik
 * @date 2026-02-13
 *
 * Simulates Thomas' cyclically symmetric attractor (1999, Rene Thomas), a
 * dissipative system with three-fold cyclic symmetry where each variable feeds
 * into the next via sine coupling. 16 particles are traced simultaneously through
 * 3D phase space with distance-field line rendering and feedback accumulation.
 * Velocity-mapped HSL coloring (green/teal) with blink pulses.
 *
 * Thomas attractor equations:
 *   dx/dt = sin(y) - b*x
 *   dy/dt = sin(z) - b*y
 *   dz/dt = sin(x) - b*z
 * Parameter: b = 0.208186 (dissipation — below ~0.2 the system becomes chaotic,
 *   above ~0.3 it decays to a fixed point)
 */

// === STATE LAYOUT (buffer-a, self-feedback via iChannel0) ===
// Pixels (0..15, 0):     Particle positions (xyz), one per pixel. 16 total.
// Pixel (CAM_PIXEL, 0):  Camera state — rg = yaw/pitch as [0,1], zw = last mouse.
// All other pixels:      Accumulated trail color (RGB). Faded each frame by FADE.

// ── Integration & rendering ──
#define NUM_PARTICLES 16   // Number of simultaneous particles tracing the attractor.
                           // More = denser visualization. Above 32: GPU-heavy per frame.
#define STEPS 32.0         // Euler steps per particle per frame — more = longer trail segment.
                           // Below 8: sparse. Above 64: GPU cost grows (NUM_PARTICLES * STEPS).
#define BASE_VIEW_SCALE 0.16  // Base 3D-to-screen scale — smaller zooms out, larger zooms in.
                              // Automatically scaled down on portrait/mobile screens.
#define SPEED 0.65         // Time-step multiplier — higher = faster traversal.
                           // Below 0.2: sluggish. Above 1.5: may overshoot sine coupling.
#define INTENSITY 0.18     // Base brightness per segment — higher = brighter trails.
#define FADE 0.993         // Trail persistence per frame — closer to 1.0 = longer trails.
                           // Below 0.98: trails vanish quickly. Above 0.999: ghosting.
#define FOCUS 2.0          // Distance-field softness (pixels) — smaller = thinner lines.

// ── Thomas attractor parameter ──
// b controls dissipation. The system is cyclically symmetric: each axis damps
// itself by -b*x_i and is driven by sin(x_{i+1}). At b=0.208186, the system
// exhibits a strange attractor with intricate folded structure.
#define B 0.208186         // Dissipation constant — lower = more chaotic, higher = decays to fixed point.

// ── Color settings — green/teal palette ──
#define MIN_HUE 120.0      // Hue for fastest velocity (green).
#define MAX_HUE 200.0      // Hue for slowest velocity (teal-cyan).
#define MAX_SPEED 2.5      // Velocity clamp for hue mapping — Thomas is slow-moving compared to Lorenz.
#define HUE_SHIFT_SPEED 8.0   // Degrees/sec of continuous hue rotation.
#define SATURATION 0.85    // Base color saturation.
#define LIGHTNESS 0.55     // Base HSL lightness.

// ── Blink settings — subtle random brightness pulses ──
#define BLINK_FREQ 6.0         // Pulse rate (Hz).
#define BLINK_INTENSITY 1.4    // Brightness multiplier during blink peak.
#define BLINK_SAT_BOOST 1.15   // Saturation boost during blink.
#define BLINK_LIT_BOOST 1.2    // Lightness boost during blink.

// ── State pixel index for camera ──
// Stored immediately after the last particle pixel.
#define CAM_PIXEL NUM_PARTICLES

// Forward Euler integration of the Thomas system.
// dx/dt = sin(y) - b*x, dy/dt = sin(z) - b*y, dz/dt = sin(x) - b*z
// The cyclic symmetry means swapping (x,y,z) -> (y,z,x) gives the same equations.
vec3 integrate(vec3 cur, float dt) {
    return cur + vec3(
        sin(cur.y) - B * cur.x,
        sin(cur.z) - B * cur.y,
        sin(cur.x) - B * cur.z
    ) * dt;
}

// Inline yaw-pitch projection — applies yaw (cy/sy) then pitch (cp/sp) rotation.
// More efficient than building a full mat3 when only 2D output is needed.
vec2 project(vec3 p, float cy, float sy, float cp, float sp) {
    vec3 r = vec3(p.x * cy - p.z * sy, p.y, p.x * sy + p.z * cy);
    return vec2(r.x, r.y * cp - r.z * sp);
}

// TECHNIQUE: Distance-field line segment rendering
// Computes the minimum distance from point \`p\` to the line segment (a, b).
float dfLine(vec2 a, vec2 b, vec2 p) {
    vec2 ab = b - a;
    float t = clamp(dot(p - a, ab) / dot(ab, ab), 0.0, 1.0);
    return distance(a + ab * t, p);
}

// Pseudo-random hash — maps a float seed to [0, 1).
float hash(float n) {
    return fract(sin(n) * 43758.5453);
}

// Convert HSL (hue in degrees, saturation, lightness) to RGB.
vec3 hsl2rgb(float h, float s, float l) {
    h = mod(h, 360.0) / 60.0;
    float c = (1.0 - abs(2.0 * l - 1.0)) * s;
    float x = c * (1.0 - abs(mod(h, 2.0) - 1.0));
    float m = l - c * 0.5;
    vec3 rgb;
    if      (h < 1.0) rgb = vec3(c, x, 0.0);
    else if (h < 2.0) rgb = vec3(x, c, 0.0);
    else if (h < 3.0) rgb = vec3(0, c, x);
    else if (h < 4.0) rgb = vec3(0, x, c);
    else if (h < 5.0) rgb = vec3(x, 0, c);
    else              rgb = vec3(c, 0, x);
    return rgb + m;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 res = iResolution.xy / iResolution.y;
    vec2 uv = fragCoord / iResolution.y;
    uv -= res / 2.0;

    // Responsive scale: shrink on portrait screens to prevent horizontal clipping
    float viewScale = BASE_VIEW_SCALE * min(1.0, iResolution.x / iResolution.y);

    int px = int(floor(fragCoord.x));
    int py = int(floor(fragCoord.y));

    // TECHNIQUE: Frame-persistent state via texelFetch
    // Camera yaw/pitch stored as normalized [0,1] values in rg channels;
    // last mouse position in zw (-1 = not tracking).
    vec4 camState = texelFetch(iChannel0, ivec2(CAM_PIXEL, 0), 0);
    float yaw, pitch;
    vec2 lastMouse = camState.zw;
    if (iFrame == 0) {
        yaw = 0.2;
        pitch = 0.35;
        lastMouse = vec2(-1.0);
    } else {
        yaw   = camState.r * 6.28318;
        pitch = (camState.g - 0.5) * 3.14159;
    }

    bool pressed = iMouse.z > 0.0;
    if (pressed) {
        yaw   = (iMouse.x / iResolution.x) * 6.28318;
        pitch = (iMouse.y / iResolution.y - 0.5) * 3.14159 * 0.6;
    }

    // Detect active mouse movement for instant trail clear
    bool wasTracking = lastMouse.x >= 0.0;
    bool rotating = pressed && wasTracking && length(iMouse.xy - lastMouse) > 1.0;

    // Precompute camera trig (same for all particles & segments)
    float cy = cos(yaw),  sy = sin(yaw);
    float cp = cos(pitch), sp = sin(pitch);

    // ── Integrate all particles, find closest line segment ──
    // Each of the NUM_PARTICLES particles is advanced STEPS times. The closest
    // projected segment to this pixel determines brightness and velocity color.
    float d = 1e6;         // Minimum distance from pixel to any trail segment.
    float bestSpeed = 0.0; // Velocity magnitude at the closest segment.
    float dt = 0.08 * SPEED;

    for (int pid = 0; pid < NUM_PARTICLES; pid++) {
        vec3 pos = texelFetch(iChannel0, ivec2(pid, 0), 0).xyz;

        for (float i = 0.0; i < STEPS; i++) {
            vec3 next = integrate(pos, dt);

            vec2 a = project(pos,  cy, sy, cp, sp) * viewScale;
            vec2 b = project(next, cy, sy, cp, sp) * viewScale;

            float segD = dfLine(a, b, uv);
            if (segD < d) {
                d = segD;
                bestSpeed = length(next - pos) / dt;
            }

            pos = next;
        }
    }

    // TECHNIQUE: Dual-layer intensity — smoothstep for soft falloff + Gaussian for bright core.
    float c = (INTENSITY / SPEED) * smoothstep(FOCUS / iResolution.y, 0.0, d);
    c += (INTENSITY / 8.5) * exp(-1000.0 * d * d);

    // ── Blink ──
    float blinkSeed = floor(iTime * BLINK_FREQ);
    float blink = hash(blinkSeed) < 0.25
        ? sin(fract(iTime * BLINK_FREQ) * 3.14159) : 0.0;

    // ── Color: green (fast) -> cyan-blue (slow), with continuous hue rotation ──
    float speedNorm = clamp(bestSpeed / MAX_SPEED, 0.0, 1.0);
    float hue = mod(MAX_HUE - speedNorm * (MAX_HUE - MIN_HUE) + iTime * HUE_SHIFT_SPEED, 360.0);
    float sat = min(1.0, SATURATION * (1.0 + blink * (BLINK_SAT_BOOST - 1.0)));
    float lit = min(1.0, LIGHTNESS * (1.0 + blink * (BLINK_LIT_BOOST - 1.0)));
    vec3 lineColor = hsl2rgb(hue, sat, lit);
    c *= 1.0 + blink * (BLINK_INTENSITY - 1.0);

    // ── State persistence (row 0) & trail accumulation ──
    if (py == 0 && px < NUM_PARTICLES) {
        // Particle state pixels — integrate this particle forward.
        if (iFrame == 0) {
            // Spread particles evenly around a circle in the attractor's domain.
            // Radius 1.5 is within the basin of attraction for b=0.208186.
            float angle = float(px) * 6.28318 / float(NUM_PARTICLES);
            float r = 1.5;
            fragColor = vec4(r * cos(angle), r * sin(angle), r * sin(angle * 0.7 + 1.0), 0.0);
        } else {
            vec3 pos = texelFetch(iChannel0, ivec2(px, 0), 0).xyz;
            for (float i = 0.0; i < STEPS; i++) {
                pos = integrate(pos, dt);
            }
            fragColor = vec4(pos, 0.0);
        }
    } else if (py == 0 && px == CAM_PIXEL) {
        // Camera state pixel — persist yaw & pitch as normalized [0,1], mouse pos in zw.
        // lastMouse = -1 sentinel means "not tracking" (mouse released).
        vec2 storeMouse = pressed ? iMouse.xy : vec2(-1.0);
        fragColor = vec4(mod(yaw, 6.28318) / 6.28318, pitch / 3.14159 + 0.5, storeMouse);
    } else {
        // Visual pixels — blend new line color onto faded previous frame.
        // Instant clear (fade=0) while actively rotating to avoid smeared trails.
        vec3 prev = texelFetch(iChannel0, ivec2(fragCoord), 0).rgb;
        float fade = rotating ? 0.0 : FADE;
        fragColor = vec4(lineColor * c + prev * fade, 0.0);
    }
}
`},channels:{image:{iChannel0:"buffer-a"},bufferA:{iChannel0:"buffer-a"}}},{slug:"waves",title:"Smooth Waves",description:"Dali-inspired liquid with layered sine waves, center ripple source, corner-based interference patterns, and heat shimmer. Smooth flowing animation with displacement edge highlighting.",date:"2026-01-29",tags:["10-days","procedural"],links:{},screenshotUrl:Mf,passes:{image:`/**\r
 * Smooth Waves Study\r
 * @author guinetik\r
 * @date 2026-01-29\r
 *\r
 * Dali-inspired liquid surface with layered sine waves, center ripple\r
 * source, corner-based interference patterns, and heat shimmer.\r
 *\r
 * Wave Distortion Techniques:\r
 * - Layered sine waves (Dali-inspired liquid)\r
 * - Diagonal wave interference\r
 * - Ripple propagation patterns\r
 *\r
 * Visual Features:\r
 * - Multiple wave frequencies blend\r
 * - Smooth flowing animation\r
 * - Colors sampled from warped texture\r
 */\r
\r
#define PI 3.14159265359\r
#define TAU 6.28318530718\r
\r
/**\r
 * Layered wave distortion\r
 * Three frequency bands mimic real water wave spectra:\r
 *   Layer 1 (4-3 Hz):  large swell — slow, high amplitude, diagonal\r
 *   Layer 2 (8-6 Hz):  medium chop — moderate speed & amplitude\r
 *   Layer 3 (15-12 Hz): surface ripples — fast, low amplitude\r
 * Diagonal cross-terms (uv.y*freq + uv.x*freq) create wave interference.\r
 */\r
vec2 waveDistort(vec2 uv, float time, float intensity) {\r
    vec2 offset = vec2(0.0);\r
\r
    // Layer 1: Large slow diagonal waves (longest wavelength, biggest amplitude)\r
    offset.x += sin(uv.y * 4.0 + uv.x * 2.0 + time * 1.2) * 0.03;\r
    offset.y += cos(uv.x * 3.0 + uv.y * 2.0 + time * 1.0) * 0.03;\r
\r
    // Layer 2: Medium flowing waves (2x frequency, ~half amplitude)\r
    offset.x += sin(uv.y * 8.0 + time * 1.8) * 0.015;\r
    offset.y += cos(uv.x * 6.0 + time * 1.5) * 0.02;\r
\r
    // Layer 3: Small fast ripples (~4x frequency, ~quarter amplitude)\r
    offset.x += sin(uv.y * 15.0 + uv.x * 10.0 + time * 3.0) * 0.008;\r
    offset.y += sin(uv.x * 12.0 + uv.y * 8.0 + time * 2.5) * 0.008;\r
\r
    return uv + offset * intensity;\r
}\r
\r
/**\r
 * Concentric ripple from center\r
 */\r
vec2 rippleDistort(vec2 uv, vec2 center, float time, float intensity) {\r
    vec2 delta = uv - center;\r
    float dist = length(delta);\r
\r
    // Outward propagating ripples\r
    float ripple = sin(dist * 30.0 - time * 4.0) * 0.02;\r
\r
    // Fade with distance\r
    ripple *= smoothstep(0.8, 0.0, dist);\r
\r
    return uv + normalize(delta + 0.001) * ripple * intensity;\r
}\r
\r
/**\r
 * Interference pattern from multiple wave sources\r
 */\r
vec2 interferenceDistort(vec2 uv, float time, float intensity) {\r
    vec2 offset = vec2(0.0);\r
\r
    // Four wave sources at corners\r
    vec2 sources[4];\r
    sources[0] = vec2(0.0, 0.0);\r
    sources[1] = vec2(1.0, 0.0);\r
    sources[2] = vec2(0.0, 1.0);\r
    sources[3] = vec2(1.0, 1.0);\r
\r
    for (int i = 0; i < 4; i++) {\r
        vec2 delta = uv - sources[i];\r
        float dist = length(delta);\r
        float wave = sin(dist * 20.0 - time * 3.0 + float(i) * 1.5);\r
        offset += normalize(delta + 0.001) * wave * 0.01;\r
    }\r
\r
    return uv + offset * intensity;\r
}\r
\r
/**\r
 * Horizontal heat shimmer effect\r
 * Two high-frequency sine layers (40 Hz, 80 Hz) create the jittery\r
 * horizontal displacement characteristic of heat convection.\r
 */\r
vec2 shimmerDistort(vec2 uv, float time, float intensity) {\r
    float shimmer = sin(uv.y * 40.0 + time * 5.0) * 0.003;  // primary shimmer\r
    shimmer += sin(uv.y * 80.0 + time * 8.0) * 0.001;        // fine detail at 2x freq\r
\r
    // Stronger in middle, fade at edges\r
    float mask = smoothstep(0.0, 0.3, uv.y) * smoothstep(1.0, 0.7, uv.y);\r
\r
    return uv + vec2(shimmer * mask * intensity, 0.0);\r
}\r
\r
void mainImage(out vec4 fragColor, in vec2 fragCoord)\r
{\r
    vec2 uv = fragCoord / iResolution.xy;\r
    float time = iTime;\r
\r
    // === COMBINE WAVE EFFECTS ===\r
    vec2 warped = uv;\r
\r
    // Main layered waves\r
    warped = waveDistort(warped, time, 1.0);\r
\r
    // Center ripple\r
    vec2 center = vec2(0.5 + sin(time * 0.3) * 0.1, 0.5 + cos(time * 0.4) * 0.1);\r
    warped = rippleDistort(warped, center, time, 0.6);\r
\r
    // Interference pattern\r
    warped = interferenceDistort(warped, time * 0.7, 0.4);\r
\r
    // Heat shimmer\r
    warped = shimmerDistort(warped, time, 0.5);\r
\r
    // === SAMPLE TEXTURE ===\r
    vec3 color = vec3(0.0);\r
\r
    // Clamp to valid UV range\r
    vec2 safeUV = clamp(warped, 0.001, 0.999);\r
    color = texture(iChannel0, safeUV).rgb;\r
\r
    // Fallback if no texture\r
    if (length(texture(iChannel0, vec2(0.5)).rgb) < 0.01) {\r
        // Colorful gradient fallback\r
        float dist = length(warped - 0.5);\r
        float angle = atan(warped.y - 0.5, warped.x - 0.5);\r
\r
        color = vec3(\r
            0.5 + 0.5 * sin(angle * 3.0 + time),\r
            0.5 + 0.5 * sin(angle * 3.0 + time + TAU / 3.0),\r
            0.5 + 0.5 * sin(angle * 3.0 + time + TAU * 2.0 / 3.0)\r
        );\r
        color *= 0.8 + 0.2 * sin(dist * 20.0 - time * 2.0);\r
    }\r
\r
    // === SUBTLE EDGE HIGHLIGHT ===\r
    // Show wave displacement as subtle brightness variation\r
    float displacement = length(warped - uv) * 20.0;\r
    color *= 1.0 + displacement * 0.3;\r
\r
    // === POST ===\r
    // Soft vignette\r
    float vig = 1.0 - length(uv - 0.5) * 0.4;\r
    color *= vig;\r
\r
    fragColor = vec4(color, 1.0);\r
}\r
`},channels:{image:{iChannel0:"textures/landscape.jpeg"}}}],kr=[...Xi].sort((e,n)=>new Date(n.date).getTime()-new Date(e.date).getTime()),Hf=[...new Set(Xi.flatMap(e=>e.tags))].sort();function vd(e){return kr.find(n=>n.slug===e)}function zf(){const e=Ne(null),n=He(()=>e.value===null?kr:kr.filter(r=>r.tags.includes(e.value)));function t(r){e.value=e.value===r?null:r}return{activeTag:e,allTags:Hf,filteredShaders:n,setTag:t}}const Bf=Math.PI*.5,ma=150;function ji(e,n){let t=null,r=null,o=0,a=null,i=0,s="none",l=0;function f(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function c(){return window.matchMedia("(hover: hover)").matches}function d(){t=document.createElement("canvas"),t.style.cssText="position:fixed;pointer-events:none;z-index:50;opacity:0;transition:none;",t.setAttribute("aria-hidden","true"),document.body.appendChild(t),r=t.getContext("2d")}function h(T){if(!t)return;const A=T.getBoundingClientRect(),P=getComputedStyle(T).borderRadius||"0";t.style.top=`${A.top}px`,t.style.left=`${A.left}px`,t.style.width=`${A.width}px`,t.style.height=`${A.height}px`,t.style.borderRadius=P,t.style.overflow="hidden";const N=window.devicePixelRatio||1,B=Math.round(A.width*N),q=Math.round(A.height*N);(t.width!==B||t.height!==q)&&(t.width=B,t.height=q)}function v(T){if((!t||!r||!a)&&s==="none"&&i<=0)return;const A=l?T-l:16;if(l=T,s==="in")i=Math.min(1,i+A/ma),i>=1&&(s="none");else if(s==="out"&&(i=Math.max(0,i-A/ma),i<=0)){s="none",t&&(t.style.opacity="0");return}if(t&&(t.style.opacity=String(i)),!t||!r)return;a&&h(a);const C=window.devicePixelRatio||1,P=t.width/C,N=t.height/C;r.setTransform(C,0,0,C,0,0),r.clearRect(0,0,P,N);const B=T*.001*Fc,q=N*.5;for(let W=0;W<2;W++){const ue=W===0?0:Bf,U=W===0?.5:.25;r.beginPath(),r.strokeStyle=`rgba(17, 220, 255, ${U})`,r.lineWidth=Gc,r.shadowColor=`rgba(17, 220, 255, ${U*.5})`,r.shadowBlur=Vc;for(let K=0;K<=P;K+=2){const $=q+Math.sin(K/P*Math.PI*2*Uc+B+ue)*Bc;K===0?r.moveTo(K,$):r.lineTo(K,$)}r.stroke(),r.shadowBlur=0}o=requestAnimationFrame(v)}function E(T){if(f()||!c())return;const A=T.target.closest(n);A&&(t||d(),a=A,h(A),s="in",cancelAnimationFrame(o),l=0,o=requestAnimationFrame(v))}function S(T){if(!T.target.closest(n))return;const C=T.relatedTarget;C&&C.closest(n)||(a=null,s="out",cancelAnimationFrame(o),l=0,o=requestAnimationFrame(v))}Qn(()=>{const T=e.value;T&&(T.addEventListener("mouseenter",E,!0),T.addEventListener("mouseleave",S,!0))}),Qt(()=>{cancelAnimationFrame(o);const T=e.value;T&&(T.removeEventListener("mouseenter",E,!0),T.removeEventListener("mouseleave",S,!0)),t&&t.parentNode&&t.parentNode.removeChild(t),t=null,r=null,a=null})}const Uf=["onClick"],Ff=An({__name:"TagFilter",props:{tags:{},activeTag:{}},emits:["select"],setup(e,{emit:n}){const t=n,r=Ne(null);return ji(r,".tag-btn"),(o,a)=>(_e(),Be("div",{ref_key:"filterRef",ref:r,class:"tag-filter"},[Oe("button",{class:Yn(["tag-btn",{active:e.activeTag===null}]),onClick:a[0]||(a[0]=i=>t("select",null))}," All ",2),(_e(!0),Be(Te,null,Zr(e.tags,i=>(_e(),Be("button",{key:i,class:Yn(["tag-btn",{active:e.activeTag===i}]),onClick:s=>t("select",i)},ot(i),11,Uf))),128))],512))}}),Gf=Et(Ff,[["__scopeId","data-v-f002c231"]]),Vf={class:"card-trace-svg","aria-hidden":"true"},Kf=["stroke-dasharray","stroke-dashoffset"],Yf={class:"card-content"},Wf=["src","alt"],qf={class:"card-overlay"},Xf={class:"card-kicker"},jf={class:"card-title"},Qf={class:"card-tags"},Zf=An({__name:"ShaderCard",props:{shader:{},index:{},total:{}},setup(e,{expose:n}){const t=e,r=af(),{prefersReducedMotion:o,getStaggerDelay:a,setTransitionSnapshot:i}=ro(),s=Ne(null),l=Ne(null),f=Ne("hidden"),c=Ne(0);function d(){const E=s.value;if(!E)return null;const S=E.$el;return S instanceof HTMLElement?S:null}Qn(()=>{if(o.value==="reduced"){f.value="visible";return}const E=d(),S=l.value;if(!E||!S){f.value="visible";return}const T=E.getBoundingClientRect();c.value=(T.width+T.height)*2;const A=a(t.index,t.total);setTimeout(()=>{f.value="tracing",S.animate([{strokeDashoffset:c.value},{strokeDashoffset:0}],{duration:Wo,easing:"cubic-bezier(0.25, 0.1, 0.25, 1)",fill:"forwards"}).finished.then(()=>{f.value="filling",setTimeout(()=>{f.value="visible"},qo)})},A)});function h(){if(o.value==="reduced"){f.value="visible";return}const E=l.value;if(!E||!c.value){f.value="visible";return}f.value="tracing",E.animate([{strokeDashoffset:c.value},{strokeDashoffset:0}],{duration:Wo,easing:"cubic-bezier(0.25, 0.1, 0.25, 1)",fill:"forwards"}).finished.then(()=>{f.value="filling",setTimeout(()=>{f.value="visible"},qo)})}function v(E){if(o.value==="reduced")return;E.preventDefault();const S=d();if(!S)return;const T=S.getBoundingClientRect();i({slug:t.shader.slug,rect:{top:T.top,left:T.left,width:T.width,height:T.height},screenshotUrl:t.shader.screenshotUrl});const A=S.parentElement;A&&Array.from(A.children).filter(P=>P!==S).forEach(P=>{P.animate([{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.95)"}],{duration:Pc,easing:"ease-out",fill:"forwards"})}),setTimeout(()=>{r.push("/shader/"+t.shader.slug)},100)}return n({triggerEntrance:h,getCardEl:d}),(E,S)=>{const T=ai("router-link");return _e(),eo(T,{ref_key:"cardRef",ref:s,to:"/shader/"+e.shader.slug,class:Yn(["shader-card n-panel n-corner-frame",{"card--hidden":f.value==="hidden","card--tracing":f.value==="tracing","card--filling":f.value==="filling","card--visible":f.value==="visible"}]),onClick:v},{default:Qr(()=>[(_e(),Be("svg",Vf,[Oe("rect",{ref_key:"svgRef",ref:l,x:"0.5",y:"0.5",rx:"8",ry:"8",width:"calc(100% - 1px)",height:"calc(100% - 1px)",fill:"none","stroke-dasharray":c.value,"stroke-dashoffset":c.value,"stroke-width":"2"},null,8,Kf)])),Oe("div",Yf,[Oe("img",{src:e.shader.screenshotUrl,alt:e.shader.title,loading:"lazy",class:"card-image"},null,8,Wf),S[0]||(S[0]=Oe("div",{class:"card-scanline","aria-hidden":"true"},null,-1)),Oe("div",qf,[Oe("span",Xf,ot(e.shader.date),1),Oe("span",jf,ot(e.shader.title),1)]),Oe("div",Qf,[(_e(!0),Be(Te,null,Zr(e.shader.tags,A=>(_e(),Be("span",{key:A,class:"card-tag"},ot(A),1))),128))])])]),_:1},8,["to","class"])}}}),$f=Et(Zf,[["__scopeId","data-v-f240d199"]]),At=200,va=40,Jf=280,ed=12,ga=85,nd=55,ya=.45,td=.12,rd=.25,od=15;function ad(e){let n=0,t=-1,r=-1,o=!0;function a(f){const c=e.value;if(!c)return;const d=c.getBoundingClientRect();t=f.clientX-d.left,r=f.clientY-d.top}function i(){t=-1,r=-1}function s(){o=!document.hidden,o&&e.value&&(n=requestAnimationFrame(l))}function l(f){if(!o)return;const c=e.value;if(!c)return;const d=c.getContext("2d");if(!d)return;const h=window.devicePixelRatio||1,v=c.clientWidth,E=c.clientHeight;if(v===0||E===0){n=requestAnimationFrame(l);return}const S=Math.round(v*h),T=Math.round(E*h);(c.width!==S||c.height!==T)&&(c.width=S,c.height=T),d.setTransform(h,0,0,h,0,0),d.clearRect(0,0,v,E);const A=f*.001,C=A*Mc,P=A*ed,N=2;for(let B=0;B<ur;B++){const q=B/(ur-1),W=E*(.08+q*.84),ue=B*Math.PI*.6,U=kc+B%3*.3,K=1+(B%2===0?.15:-.1)*(B/ur),O=(va+q*(Jf-va)+P)%360,Q=Math.abs(q-.5)*2;let se=ya-(ya-td)*Q,ve=nd;const le=.4+B%4*.15,J=Math.sin(A*le+B*1.7)*.5+.5;se*=.7+J*.3;let Y=0;if(t>=0&&r>=0){const fe=Math.abs(W-r);fe<At&&(Y=1-fe/At,Y*=Y,se=Math.min(1,se+rd*Y),ve=ve+od*Y)}const Fe=`hsla(${O}, ${ga}%, ${ve}%, ${se})`,Xe=`hsla(${O}, ${ga}%, ${ve}%, ${se*.5})`;d.beginPath(),d.strokeStyle=Fe,d.lineWidth=Hc+Y*.5,d.shadowColor=Xe,d.shadowBlur=zc+Y*6;for(let fe=0;fe<=v;fe+=N){let ge=Lc;if(t>=0&&r>=0){const sn=fe-t,je=W-r,we=Math.sqrt(sn*sn+je*je);if(we<At){const y=1-we/At;ge+=Oc*y*y}}const an=W+Math.sin(fe/v*Math.PI*2*U+C*K+ue)*ge;fe===0?d.moveTo(fe,an):d.lineTo(fe,an)}d.stroke(),d.shadowBlur=0}n=requestAnimationFrame(l)}Qn(()=>{const f=e.value;f&&(f.addEventListener("mousemove",a),f.addEventListener("mouseleave",i),document.addEventListener("visibilitychange",s),n=requestAnimationFrame(l))}),Qt(()=>{cancelAnimationFrame(n);const f=e.value;f&&(f.removeEventListener("mousemove",a),f.removeEventListener("mouseleave",i)),document.removeEventListener("visibilitychange",s)})}const id=An({__name:"SineWaveDivider",setup(e){const n=Ne(null);return ad(n),(t,r)=>(_e(),Be("canvas",{ref_key:"canvasRef",ref:n,class:"sine-wave-bg","aria-hidden":"true"},null,512))}}),sd=Et(id,[["__scopeId","data-v-05c59859"]]),ld={class:"gallery-view n-layout-shell"},cd={key:0,class:"gallery-empty"},fd=An({__name:"GalleryView",setup(e){const{activeTag:n,allTags:t,filteredShaders:r,setTag:o}=zf(),{triggerCardExit:a,prefersReducedMotion:i}=ro(),s=Ne(null);ji(s,".profile-link, .github-link");function l(c,d){if(i.value==="reduced"){d();return}setTimeout(d,800)}function f(c,d){if(i.value==="reduced"){d();return}a(c).then(d)}return(c,d)=>(_e(),Be("div",ld,[Oe("header",{ref_key:"headerRef",ref:s,class:"gallery-header n-panel"},[pe(sd),d[0]||(d[0]=Hl('<div class="gallery-brand" data-v-cd37ac52><a href="https://guinetik.com" target="_blank" rel="noopener" class="brand-logo-link" aria-label="Visit Guinetik website" data-v-cd37ac52><svg class="brand-logo" xmlns="http://www.w3.org/2000/svg" viewBox="32.9 174.743 71.888 63.576" aria-hidden="true" data-v-cd37ac52><path d="M 57.971 224.292 L 57.971 203.374 L 57.971 194.861 L 75.109 194.861 L 75.109 188.769 L 63.16 188.769 L 63.16 174.743 L 57.971 174.743 L 57.971 189.041 L 57.971 194.861 L 32.9 194.861 L 32.9 203.773 L 50.377 203.773 L 50.377 224.292 L 57.971 224.292 Z M 79.717 238.319 L 79.717 224.02 L 79.717 218.2 L 104.788 218.2 L 104.788 209.287 L 87.31 209.287 L 87.31 188.769 L 79.717 188.769 L 79.717 209.686 L 79.717 218.2 L 62.579 218.2 L 62.579 224.293 L 74.526 224.293 L 74.526 238.319 L 79.717 238.319 Z" data-v-cd37ac52></path></svg></a><h1 class="gallery-title" data-v-cd37ac52>Guinetik&#39;s Shaders Collection</h1></div><nav class="gallery-links" aria-label="Profile links" data-v-cd37ac52><a href="https://guinetik.com" target="_blank" rel="noopener" class="profile-link" data-v-cd37ac52>Website</a><a href="https://x.com/guinetik" target="_blank" rel="noopener" class="profile-link" data-v-cd37ac52>@guinetik</a><a href="https://www.shadertoy.com/user/guinetik" target="_blank" rel="noopener" class="profile-link" data-v-cd37ac52>Shadertoy</a><a href="https://github.com/guinetik" target="_blank" rel="noopener" class="github-link" aria-label="Visit Guinetik on GitHub" title="GitHub" data-v-cd37ac52><svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true" data-v-cd37ac52><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" data-v-cd37ac52></path></svg></a></nav><p class="gallery-subtitle" data-v-cd37ac52> Interactive GPU programming experiments using WebGL. </p>',3))],512),pe(Gf,{tags:Pe(t),activeTag:Pe(n),onSelect:Pe(o)},null,8,["tags","activeTag","onSelect"]),pe(xc,{name:"shader-card",tag:"div",class:"gallery-grid",onEnter:l,onLeave:f,css:!1},{default:Qr(()=>[(_e(!0),Be(Te,null,Zr(Pe(r),(h,v)=>(_e(),eo($f,{key:h.slug,shader:h,index:v,total:Pe(r).length},null,8,["shader","index","total"]))),128))]),_:1}),Pe(r).length===0?(_e(),Be("p",cd," No shaders found. ")):Ti("",!0)]))}}),dd=Et(fd,[["__scopeId","data-v-cd37ac52"]]),ud=[{path:"/",name:"gallery",component:dd},{path:"/shader/:slug",name:"shader-detail",component:()=>Zc(()=>import("./ShaderDetailView-DIfFCC-A.js"),__vite__mapDeps([0,1]))}],Qi=of({history:M0(),routes:ud});Qi.afterEach(e=>{typeof window.gtag=="function"&&window.gtag("event","page_view",{page_path:e.fullPath})});Ac(Xc).use(Qi).mount("#app");export{jo as C,hd as F,pd as M,Et as _,Be as a,Oe as b,He as c,An as d,Ti as e,vd as f,_e as g,Zc as h,Te as i,Zr as j,ro as k,ji as l,Qn as m,Yn as n,Qt as o,pe as p,Qr as q,Ne as r,eo as s,ot as t,Pe as u,Ml as v,st as w,md as x,ai as y,af as z};
