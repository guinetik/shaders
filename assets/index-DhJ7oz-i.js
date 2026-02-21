const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ShaderDetailView-DA3X-B4q.js","assets/ShaderDetailView-CFnL-AET.css"])))=>i.map(i=>d[i]);
(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function t(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(a){if(a.ep)return;a.ep=!0;const o=t(a);fetch(a.href,o)}})();/**
* @vue/shared v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ur(e){const n=Object.create(null);for(const t of e.split(","))n[t]=1;return t=>t in n}const se={},Vn=[],rn=()=>{},xo=()=>!1,qt=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),Br=e=>e.startsWith("onUpdate:"),me=Object.assign,Fr=(e,n)=>{const t=e.indexOf(n);t>-1&&e.splice(t,1)},ts=Object.prototype.hasOwnProperty,ne=(e,n)=>ts.call(e,n),z=Array.isArray,qn=e=>Et(e)==="[object Map]",So=e=>Et(e)==="[object Set]",da=e=>Et(e)==="[object Date]",Y=e=>typeof e=="function",pe=e=>typeof e=="string",an=e=>typeof e=="symbol",te=e=>e!==null&&typeof e=="object",Eo=e=>(te(e)||Y(e))&&Y(e.then)&&Y(e.catch),wo=Object.prototype.toString,Et=e=>wo.call(e),rs=e=>Et(e).slice(8,-1),_o=e=>Et(e)==="[object Object]",zr=e=>pe(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,ot=Ur(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Yt=e=>{const n=Object.create(null);return(t=>n[t]||(n[t]=e(t)))},as=/-\w/g,ze=Yt(e=>e.replace(as,n=>n.slice(1).toUpperCase())),os=/\B([A-Z])/g,Hn=Yt(e=>e.replace(os,"-$1").toLowerCase()),Kt=Yt(e=>e.charAt(0).toUpperCase()+e.slice(1)),tr=Yt(e=>e?`on${Kt(e)}`:""),Tn=(e,n)=>!Object.is(e,n),rr=(e,...n)=>{for(let t=0;t<e.length;t++)e[t](...n)},Co=(e,n,t,r=!1)=>{Object.defineProperty(e,n,{configurable:!0,enumerable:!1,writable:r,value:t})},is=e=>{const n=parseFloat(e);return isNaN(n)?e:n},ss=e=>{const n=pe(e)?Number(e):NaN;return isNaN(n)?e:n};let pa;const Wt=()=>pa||(pa=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Gr(e){if(z(e)){const n={};for(let t=0;t<e.length;t++){const r=e[t],a=pe(r)?ds(r):Gr(r);if(a)for(const o in a)n[o]=a[o]}return n}else if(pe(e)||te(e))return e}const ls=/;(?![^(]*\))/g,cs=/:([^]+)/,fs=/\/\*[^]*?\*\//g;function ds(e){const n={};return e.replace(fs,"").split(ls).forEach(t=>{if(t){const r=t.split(cs);r.length>1&&(n[r[0].trim()]=r[1].trim())}}),n}function Mn(e){let n="";if(pe(e))n=e;else if(z(e))for(let t=0;t<e.length;t++){const r=Mn(e[t]);r&&(n+=r+" ")}else if(te(e))for(const t in e)e[t]&&(n+=t+" ");return n.trim()}const ps="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",us=Ur(ps);function To(e){return!!e||e===""}function ms(e,n){if(e.length!==n.length)return!1;let t=!0;for(let r=0;t&&r<e.length;r++)t=Vr(e[r],n[r]);return t}function Vr(e,n){if(e===n)return!0;let t=da(e),r=da(n);if(t||r)return t&&r?e.getTime()===n.getTime():!1;if(t=an(e),r=an(n),t||r)return e===n;if(t=z(e),r=z(n),t||r)return t&&r?ms(e,n):!1;if(t=te(e),r=te(n),t||r){if(!t||!r)return!1;const a=Object.keys(e).length,o=Object.keys(n).length;if(a!==o)return!1;for(const i in e){const s=e.hasOwnProperty(i),l=n.hasOwnProperty(i);if(s&&!l||!s&&l||!Vr(e[i],n[i]))return!1}}return String(e)===String(n)}const Ao=e=>!!(e&&e.__v_isRef===!0),it=e=>pe(e)?e:e==null?"":z(e)||te(e)&&(e.toString===wo||!Y(e.toString))?Ao(e)?it(e.value):JSON.stringify(e,Ro,2):String(e),Ro=(e,n)=>Ao(n)?Ro(e,n.value):qn(n)?{[`Map(${n.size})`]:[...n.entries()].reduce((t,[r,a],o)=>(t[ar(r,o)+" =>"]=a,t),{})}:So(n)?{[`Set(${n.size})`]:[...n.values()].map(t=>ar(t))}:an(n)?ar(n):te(n)&&!z(n)&&!_o(n)?String(n):n,ar=(e,n="")=>{var t;return an(e)?`Symbol(${(t=e.description)!=null?t:n})`:e};/**
* @vue/reactivity v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Pe;class hs{constructor(n=!1){this.detached=n,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.__v_skip=!0,this.parent=Pe,!n&&Pe&&(this.index=(Pe.scopes||(Pe.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let n,t;if(this.scopes)for(n=0,t=this.scopes.length;n<t;n++)this.scopes[n].pause();for(n=0,t=this.effects.length;n<t;n++)this.effects[n].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let n,t;if(this.scopes)for(n=0,t=this.scopes.length;n<t;n++)this.scopes[n].resume();for(n=0,t=this.effects.length;n<t;n++)this.effects[n].resume()}}run(n){if(this._active){const t=Pe;try{return Pe=this,n()}finally{Pe=t}}}on(){++this._on===1&&(this.prevScope=Pe,Pe=this)}off(){this._on>0&&--this._on===0&&(Pe=this.prevScope,this.prevScope=void 0)}stop(n){if(this._active){this._active=!1;let t,r;for(t=0,r=this.effects.length;t<r;t++)this.effects[t].stop();for(this.effects.length=0,t=0,r=this.cleanups.length;t<r;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,r=this.scopes.length;t<r;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!n){const a=this.parent.scopes.pop();a&&a!==this&&(this.parent.scopes[this.index]=a,a.index=this.index)}this.parent=void 0}}}function vs(){return Pe}let ie;const or=new WeakSet;class Io{constructor(n){this.fn=n,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Pe&&Pe.active&&Pe.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,or.has(this)&&(or.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Do(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,ua(this),Po(this);const n=ie,t=qe;ie=this,qe=!0;try{return this.fn()}finally{Lo(this),ie=n,qe=t,this.flags&=-3}}stop(){if(this.flags&1){for(let n=this.deps;n;n=n.nextDep)Kr(n);this.deps=this.depsTail=void 0,ua(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?or.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){br(this)&&this.run()}get dirty(){return br(this)}}let No=0,st,lt;function Do(e,n=!1){if(e.flags|=8,n){e.next=lt,lt=e;return}e.next=st,st=e}function qr(){No++}function Yr(){if(--No>0)return;if(lt){let n=lt;for(lt=void 0;n;){const t=n.next;n.next=void 0,n.flags&=-9,n=t}}let e;for(;st;){let n=st;for(st=void 0;n;){const t=n.next;if(n.next=void 0,n.flags&=-9,n.flags&1)try{n.trigger()}catch(r){e||(e=r)}n=t}}if(e)throw e}function Po(e){for(let n=e.deps;n;n=n.nextDep)n.version=-1,n.prevActiveLink=n.dep.activeLink,n.dep.activeLink=n}function Lo(e){let n,t=e.depsTail,r=t;for(;r;){const a=r.prevDep;r.version===-1?(r===t&&(t=a),Kr(r),gs(r)):n=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=a}e.deps=n,e.depsTail=t}function br(e){for(let n=e.deps;n;n=n.nextDep)if(n.dep.version!==n.version||n.dep.computed&&(Oo(n.dep.computed)||n.dep.version!==n.version))return!0;return!!e._dirty}function Oo(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===ht)||(e.globalVersion=ht,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!br(e))))return;e.flags|=2;const n=e.dep,t=ie,r=qe;ie=e,qe=!0;try{Po(e);const a=e.fn(e._value);(n.version===0||Tn(a,e._value))&&(e.flags|=128,e._value=a,n.version++)}catch(a){throw n.version++,a}finally{ie=t,qe=r,Lo(e),e.flags&=-3}}function Kr(e,n=!1){const{dep:t,prevSub:r,nextSub:a}=e;if(r&&(r.nextSub=a,e.prevSub=void 0),a&&(a.prevSub=r,e.nextSub=void 0),t.subs===e&&(t.subs=r,!r&&t.computed)){t.computed.flags&=-5;for(let o=t.computed.deps;o;o=o.nextDep)Kr(o,!0)}!n&&!--t.sc&&t.map&&t.map.delete(t.key)}function gs(e){const{prevDep:n,nextDep:t}=e;n&&(n.nextDep=t,e.prevDep=void 0),t&&(t.prevDep=n,e.nextDep=void 0)}let qe=!0;const Mo=[];function un(){Mo.push(qe),qe=!1}function mn(){const e=Mo.pop();qe=e===void 0?!0:e}function ua(e){const{cleanup:n}=e;if(e.cleanup=void 0,n){const t=ie;ie=void 0;try{n()}finally{ie=t}}}let ht=0;class ys{constructor(n,t){this.sub=n,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Wr{constructor(n){this.computed=n,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(n){if(!ie||!qe||ie===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==ie)t=this.activeLink=new ys(ie,this),ie.deps?(t.prevDep=ie.depsTail,ie.depsTail.nextDep=t,ie.depsTail=t):ie.deps=ie.depsTail=t,ko(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const r=t.nextDep;r.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=r),t.prevDep=ie.depsTail,t.nextDep=void 0,ie.depsTail.nextDep=t,ie.depsTail=t,ie.deps===t&&(ie.deps=r)}return t}trigger(n){this.version++,ht++,this.notify(n)}notify(n){qr();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{Yr()}}}function ko(e){if(e.dep.sc++,e.sub.flags&4){const n=e.dep.computed;if(n&&!e.dep.subs){n.flags|=20;for(let r=n.deps;r;r=r.nextDep)ko(r)}const t=e.dep.subs;t!==e&&(e.prevSub=t,t&&(t.nextSub=e)),e.dep.subs=e}}const xr=new WeakMap,Ln=Symbol(""),Sr=Symbol(""),vt=Symbol("");function ye(e,n,t){if(qe&&ie){let r=xr.get(e);r||xr.set(e,r=new Map);let a=r.get(t);a||(r.set(t,a=new Wr),a.map=r,a.key=t),a.track()}}function pn(e,n,t,r,a,o){const i=xr.get(e);if(!i){ht++;return}const s=l=>{l&&l.trigger()};if(qr(),n==="clear")i.forEach(s);else{const l=z(e),f=l&&zr(t);if(l&&t==="length"){const c=Number(r);i.forEach((d,m)=>{(m==="length"||m===vt||!an(m)&&m>=c)&&s(d)})}else switch((t!==void 0||i.has(void 0))&&s(i.get(t)),f&&s(i.get(vt)),n){case"add":l?f&&s(i.get("length")):(s(i.get(Ln)),qn(e)&&s(i.get(Sr)));break;case"delete":l||(s(i.get(Ln)),qn(e)&&s(i.get(Sr)));break;case"set":qn(e)&&s(i.get(Ln));break}}Yr()}function Bn(e){const n=Z(e);return n===e?n:(ye(n,"iterate",vt),Ue(e)?n:n.map(Ye))}function Xt(e){return ye(e=Z(e),"iterate",vt),e}function En(e,n){return hn(e)?Wn(On(e)?Ye(n):n):Ye(n)}const bs={__proto__:null,[Symbol.iterator](){return ir(this,Symbol.iterator,e=>En(this,e))},concat(...e){return Bn(this).concat(...e.map(n=>z(n)?Bn(n):n))},entries(){return ir(this,"entries",e=>(e[1]=En(this,e[1]),e))},every(e,n){return ln(this,"every",e,n,void 0,arguments)},filter(e,n){return ln(this,"filter",e,n,t=>t.map(r=>En(this,r)),arguments)},find(e,n){return ln(this,"find",e,n,t=>En(this,t),arguments)},findIndex(e,n){return ln(this,"findIndex",e,n,void 0,arguments)},findLast(e,n){return ln(this,"findLast",e,n,t=>En(this,t),arguments)},findLastIndex(e,n){return ln(this,"findLastIndex",e,n,void 0,arguments)},forEach(e,n){return ln(this,"forEach",e,n,void 0,arguments)},includes(...e){return sr(this,"includes",e)},indexOf(...e){return sr(this,"indexOf",e)},join(e){return Bn(this).join(e)},lastIndexOf(...e){return sr(this,"lastIndexOf",e)},map(e,n){return ln(this,"map",e,n,void 0,arguments)},pop(){return Jn(this,"pop")},push(...e){return Jn(this,"push",e)},reduce(e,...n){return ma(this,"reduce",e,n)},reduceRight(e,...n){return ma(this,"reduceRight",e,n)},shift(){return Jn(this,"shift")},some(e,n){return ln(this,"some",e,n,void 0,arguments)},splice(...e){return Jn(this,"splice",e)},toReversed(){return Bn(this).toReversed()},toSorted(e){return Bn(this).toSorted(e)},toSpliced(...e){return Bn(this).toSpliced(...e)},unshift(...e){return Jn(this,"unshift",e)},values(){return ir(this,"values",e=>En(this,e))}};function ir(e,n,t){const r=Xt(e),a=r[n]();return r!==e&&!Ue(e)&&(a._next=a.next,a.next=()=>{const o=a._next();return o.done||(o.value=t(o.value)),o}),a}const xs=Array.prototype;function ln(e,n,t,r,a,o){const i=Xt(e),s=i!==e&&!Ue(e),l=i[n];if(l!==xs[n]){const d=l.apply(e,o);return s?Ye(d):d}let f=t;i!==e&&(s?f=function(d,m){return t.call(this,En(e,d),m,e)}:t.length>2&&(f=function(d,m){return t.call(this,d,m,e)}));const c=l.call(i,f,r);return s&&a?a(c):c}function ma(e,n,t,r){const a=Xt(e);let o=t;return a!==e&&(Ue(e)?t.length>3&&(o=function(i,s,l){return t.call(this,i,s,l,e)}):o=function(i,s,l){return t.call(this,i,En(e,s),l,e)}),a[n](o,...r)}function sr(e,n,t){const r=Z(e);ye(r,"iterate",vt);const a=r[n](...t);return(a===-1||a===!1)&&Qr(t[0])?(t[0]=Z(t[0]),r[n](...t)):a}function Jn(e,n,t=[]){un(),qr();const r=Z(e)[n].apply(e,t);return Yr(),mn(),r}const Ss=Ur("__proto__,__v_isRef,__isVue"),Ho=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(an));function Es(e){an(e)||(e=String(e));const n=Z(this);return ye(n,"has",e),n.hasOwnProperty(e)}class Uo{constructor(n=!1,t=!1){this._isReadonly=n,this._isShallow=t}get(n,t,r){if(t==="__v_skip")return n.__v_skip;const a=this._isReadonly,o=this._isShallow;if(t==="__v_isReactive")return!a;if(t==="__v_isReadonly")return a;if(t==="__v_isShallow")return o;if(t==="__v_raw")return r===(a?o?Ps:Go:o?zo:Fo).get(n)||Object.getPrototypeOf(n)===Object.getPrototypeOf(r)?n:void 0;const i=z(n);if(!a){let l;if(i&&(l=bs[t]))return l;if(t==="hasOwnProperty")return Es}const s=Reflect.get(n,t,Se(n)?n:r);if((an(t)?Ho.has(t):Ss(t))||(a||ye(n,"get",t),o))return s;if(Se(s)){const l=i&&zr(t)?s:s.value;return a&&te(l)?wr(l):l}return te(s)?a?wr(s):jt(s):s}}class Bo extends Uo{constructor(n=!1){super(!1,n)}set(n,t,r,a){let o=n[t];const i=z(n)&&zr(t);if(!this._isShallow){const f=hn(o);if(!Ue(r)&&!hn(r)&&(o=Z(o),r=Z(r)),!i&&Se(o)&&!Se(r))return f||(o.value=r),!0}const s=i?Number(t)<n.length:ne(n,t),l=Reflect.set(n,t,r,Se(n)?n:a);return n===Z(a)&&(s?Tn(r,o)&&pn(n,"set",t,r):pn(n,"add",t,r)),l}deleteProperty(n,t){const r=ne(n,t);n[t];const a=Reflect.deleteProperty(n,t);return a&&r&&pn(n,"delete",t,void 0),a}has(n,t){const r=Reflect.has(n,t);return(!an(t)||!Ho.has(t))&&ye(n,"has",t),r}ownKeys(n){return ye(n,"iterate",z(n)?"length":Ln),Reflect.ownKeys(n)}}class ws extends Uo{constructor(n=!1){super(!0,n)}set(n,t){return!0}deleteProperty(n,t){return!0}}const _s=new Bo,Cs=new ws,Ts=new Bo(!0);const Er=e=>e,Tt=e=>Reflect.getPrototypeOf(e);function As(e,n,t){return function(...r){const a=this.__v_raw,o=Z(a),i=qn(o),s=e==="entries"||e===Symbol.iterator&&i,l=e==="keys"&&i,f=a[e](...r),c=t?Er:n?Wn:Ye;return!n&&ye(o,"iterate",l?Sr:Ln),me(Object.create(f),{next(){const{value:d,done:m}=f.next();return m?{value:d,done:m}:{value:s?[c(d[0]),c(d[1])]:c(d),done:m}}})}}function At(e){return function(...n){return e==="delete"?!1:e==="clear"?void 0:this}}function Rs(e,n){const t={get(a){const o=this.__v_raw,i=Z(o),s=Z(a);e||(Tn(a,s)&&ye(i,"get",a),ye(i,"get",s));const{has:l}=Tt(i),f=n?Er:e?Wn:Ye;if(l.call(i,a))return f(o.get(a));if(l.call(i,s))return f(o.get(s));o!==i&&o.get(a)},get size(){const a=this.__v_raw;return!e&&ye(Z(a),"iterate",Ln),a.size},has(a){const o=this.__v_raw,i=Z(o),s=Z(a);return e||(Tn(a,s)&&ye(i,"has",a),ye(i,"has",s)),a===s?o.has(a):o.has(a)||o.has(s)},forEach(a,o){const i=this,s=i.__v_raw,l=Z(s),f=n?Er:e?Wn:Ye;return!e&&ye(l,"iterate",Ln),s.forEach((c,d)=>a.call(o,f(c),f(d),i))}};return me(t,e?{add:At("add"),set:At("set"),delete:At("delete"),clear:At("clear")}:{add(a){!n&&!Ue(a)&&!hn(a)&&(a=Z(a));const o=Z(this);return Tt(o).has.call(o,a)||(o.add(a),pn(o,"add",a,a)),this},set(a,o){!n&&!Ue(o)&&!hn(o)&&(o=Z(o));const i=Z(this),{has:s,get:l}=Tt(i);let f=s.call(i,a);f||(a=Z(a),f=s.call(i,a));const c=l.call(i,a);return i.set(a,o),f?Tn(o,c)&&pn(i,"set",a,o):pn(i,"add",a,o),this},delete(a){const o=Z(this),{has:i,get:s}=Tt(o);let l=i.call(o,a);l||(a=Z(a),l=i.call(o,a)),s&&s.call(o,a);const f=o.delete(a);return l&&pn(o,"delete",a,void 0),f},clear(){const a=Z(this),o=a.size!==0,i=a.clear();return o&&pn(a,"clear",void 0,void 0),i}}),["keys","values","entries",Symbol.iterator].forEach(a=>{t[a]=As(a,e,n)}),t}function Xr(e,n){const t=Rs(e,n);return(r,a,o)=>a==="__v_isReactive"?!e:a==="__v_isReadonly"?e:a==="__v_raw"?r:Reflect.get(ne(t,a)&&a in r?t:r,a,o)}const Is={get:Xr(!1,!1)},Ns={get:Xr(!1,!0)},Ds={get:Xr(!0,!1)};const Fo=new WeakMap,zo=new WeakMap,Go=new WeakMap,Ps=new WeakMap;function Ls(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Os(e){return e.__v_skip||!Object.isExtensible(e)?0:Ls(rs(e))}function jt(e){return hn(e)?e:jr(e,!1,_s,Is,Fo)}function Vo(e){return jr(e,!1,Ts,Ns,zo)}function wr(e){return jr(e,!0,Cs,Ds,Go)}function jr(e,n,t,r,a){if(!te(e)||e.__v_raw&&!(n&&e.__v_isReactive))return e;const o=Os(e);if(o===0)return e;const i=a.get(e);if(i)return i;const s=new Proxy(e,o===2?r:t);return a.set(e,s),s}function On(e){return hn(e)?On(e.__v_raw):!!(e&&e.__v_isReactive)}function hn(e){return!!(e&&e.__v_isReadonly)}function Ue(e){return!!(e&&e.__v_isShallow)}function Qr(e){return e?!!e.__v_raw:!1}function Z(e){const n=e&&e.__v_raw;return n?Z(n):e}function Ms(e){return!ne(e,"__v_skip")&&Object.isExtensible(e)&&Co(e,"__v_skip",!0),e}const Ye=e=>te(e)?jt(e):e,Wn=e=>te(e)?wr(e):e;function Se(e){return e?e.__v_isRef===!0:!1}function xe(e){return qo(e,!1)}function ks(e){return qo(e,!0)}function qo(e,n){return Se(e)?e:new Hs(e,n)}class Hs{constructor(n,t){this.dep=new Wr,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?n:Z(n),this._value=t?n:Ye(n),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(n){const t=this._rawValue,r=this.__v_isShallow||Ue(n)||hn(n);n=r?n:Z(n),Tn(n,t)&&(this._rawValue=n,this._value=r?n:Ye(n),this.dep.trigger())}}function Le(e){return Se(e)?e.value:e}const Us={get:(e,n,t)=>n==="__v_raw"?e:Le(Reflect.get(e,n,t)),set:(e,n,t,r)=>{const a=e[n];return Se(a)&&!Se(t)?(a.value=t,!0):Reflect.set(e,n,t,r)}};function Yo(e){return On(e)?e:new Proxy(e,Us)}class Bs{constructor(n,t,r){this.fn=n,this.setter=t,this._value=void 0,this.dep=new Wr(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=ht-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&ie!==this)return Do(this,!0),!0}get value(){const n=this.dep.track();return Oo(this),n&&(n.version=this.dep.version),this._value}set value(n){this.setter&&this.setter(n)}}function Fs(e,n,t=!1){let r,a;return Y(e)?r=e:(r=e.get,a=e.set),new Bs(r,a,t)}const Rt={},Ot=new WeakMap;let Dn;function zs(e,n=!1,t=Dn){if(t){let r=Ot.get(t);r||Ot.set(t,r=[]),r.push(e)}}function Gs(e,n,t=se){const{immediate:r,deep:a,once:o,scheduler:i,augmentJob:s,call:l}=t,f=w=>a?w:Ue(w)||a===!1||a===0?Cn(w,1):Cn(w);let c,d,m,h,C=!1,_=!1;if(Se(e)?(d=()=>e.value,C=Ue(e)):On(e)?(d=()=>f(e),C=!0):z(e)?(_=!0,C=e.some(w=>On(w)||Ue(w)),d=()=>e.map(w=>{if(Se(w))return w.value;if(On(w))return f(w);if(Y(w))return l?l(w,2):w()})):Y(e)?n?d=l?()=>l(e,2):e:d=()=>{if(m){un();try{m()}finally{mn()}}const w=Dn;Dn=c;try{return l?l(e,3,[h]):e(h)}finally{Dn=w}}:d=rn,n&&a){const w=d,L=a===!0?1/0:a;d=()=>Cn(w(),L)}const k=vs(),O=()=>{c.stop(),k&&k.active&&Fr(k.effects,c)};if(o&&n){const w=n;n=(...L)=>{w(...L),O()}}let E=_?new Array(e.length).fill(Rt):Rt;const A=w=>{if(!(!(c.flags&1)||!c.dirty&&!w))if(n){const L=c.run();if(a||C||(_?L.some((G,V)=>Tn(G,E[V])):Tn(L,E))){m&&m();const G=Dn;Dn=c;try{const V=[L,E===Rt?void 0:_&&E[0]===Rt?[]:E,h];E=L,l?l(n,3,V):n(...V)}finally{Dn=G}}}else c.run()};return s&&s(A),c=new Io(d),c.scheduler=i?()=>i(A,!1):A,h=w=>zs(w,!1,c),m=c.onStop=()=>{const w=Ot.get(c);if(w){if(l)l(w,4);else for(const L of w)L();Ot.delete(c)}},n?r?A(!0):E=c.run():i?i(A.bind(null,!0),!0):c.run(),O.pause=c.pause.bind(c),O.resume=c.resume.bind(c),O.stop=O,O}function Cn(e,n=1/0,t){if(n<=0||!te(e)||e.__v_skip||(t=t||new Map,(t.get(e)||0)>=n))return e;if(t.set(e,n),n--,Se(e))Cn(e.value,n,t);else if(z(e))for(let r=0;r<e.length;r++)Cn(e[r],n,t);else if(So(e)||qn(e))e.forEach(r=>{Cn(r,n,t)});else if(_o(e)){for(const r in e)Cn(e[r],n,t);for(const r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&Cn(e[r],n,t)}return e}/**
* @vue/runtime-core v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function wt(e,n,t,r){try{return r?e(...r):e()}catch(a){Qt(a,n,t)}}function Ke(e,n,t,r){if(Y(e)){const a=wt(e,n,t,r);return a&&Eo(a)&&a.catch(o=>{Qt(o,n,t)}),a}if(z(e)){const a=[];for(let o=0;o<e.length;o++)a.push(Ke(e[o],n,t,r));return a}}function Qt(e,n,t,r=!0){const a=n?n.vnode:null,{errorHandler:o,throwUnhandledErrorInProduction:i}=n&&n.appContext.config||se;if(n){let s=n.parent;const l=n.proxy,f=`https://vuejs.org/error-reference/#runtime-${t}`;for(;s;){const c=s.ec;if(c){for(let d=0;d<c.length;d++)if(c[d](e,l,f)===!1)return}s=s.parent}if(o){un(),wt(o,null,10,[e,l,f]),mn();return}}Vs(e,t,a,r,i)}function Vs(e,n,t,r=!0,a=!1){if(a)throw e;console.error(e)}const Te=[];let nn=-1;const Yn=[];let wn=null,Fn=0;const Ko=Promise.resolve();let Mt=null;function Wo(e){const n=Mt||Ko;return e?n.then(this?e.bind(this):e):n}function qs(e){let n=nn+1,t=Te.length;for(;n<t;){const r=n+t>>>1,a=Te[r],o=gt(a);o<e||o===e&&a.flags&2?n=r+1:t=r}return n}function Zr(e){if(!(e.flags&1)){const n=gt(e),t=Te[Te.length-1];!t||!(e.flags&2)&&n>=gt(t)?Te.push(e):Te.splice(qs(n),0,e),e.flags|=1,Xo()}}function Xo(){Mt||(Mt=Ko.then(Qo))}function Ys(e){z(e)?Yn.push(...e):wn&&e.id===-1?wn.splice(Fn+1,0,e):e.flags&1||(Yn.push(e),e.flags|=1),Xo()}function ha(e,n,t=nn+1){for(;t<Te.length;t++){const r=Te[t];if(r&&r.flags&2){if(e&&r.id!==e.uid)continue;Te.splice(t,1),t--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function jo(e){if(Yn.length){const n=[...new Set(Yn)].sort((t,r)=>gt(t)-gt(r));if(Yn.length=0,wn){wn.push(...n);return}for(wn=n,Fn=0;Fn<wn.length;Fn++){const t=wn[Fn];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}wn=null,Fn=0}}const gt=e=>e.id==null?e.flags&2?-1:1/0:e.id;function Qo(e){try{for(nn=0;nn<Te.length;nn++){const n=Te[nn];n&&!(n.flags&8)&&(n.flags&4&&(n.flags&=-2),wt(n,n.i,n.i?15:14),n.flags&4||(n.flags&=-2))}}finally{for(;nn<Te.length;nn++){const n=Te[nn];n&&(n.flags&=-2)}nn=-1,Te.length=0,jo(),Mt=null,(Te.length||Yn.length)&&Qo()}}let Ve=null,Zo=null;function kt(e){const n=Ve;return Ve=e,Zo=e&&e.type.__scopeId||null,n}function $r(e,n=Ve,t){if(!n||e._n)return e;const r=(...a)=>{r._d&&Bt(-1);const o=kt(n);let i;try{i=e(...a)}finally{kt(o),r._d&&Bt(1)}return i};return r._n=!0,r._c=!0,r._d=!0,r}function Rn(e,n,t,r){const a=e.dirs,o=n&&n.dirs;for(let i=0;i<a.length;i++){const s=a[i];o&&(s.oldValue=o[i].value);let l=s.dir[r];l&&(un(),Ke(l,t,8,[e.el,s,e,n]),mn())}}function Nt(e,n){if(be){let t=be.provides;const r=be.parent&&be.parent.provides;r===t&&(t=be.provides=Object.create(r)),t[e]=n}}function Be(e,n,t=!1){const r=Ii();if(r||Kn){let a=Kn?Kn._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(a&&e in a)return a[e];if(arguments.length>1)return t&&Y(n)?n.call(r&&r.proxy):n}}const Ks=Symbol.for("v-scx"),Ws=()=>Be(Ks);function ct(e,n,t){return $o(e,n,t)}function $o(e,n,t=se){const{immediate:r,deep:a,flush:o,once:i}=t,s=me({},t),l=n&&r||!n&&o!=="post";let f;if(xt){if(o==="sync"){const h=Ws();f=h.__watcherHandles||(h.__watcherHandles=[])}else if(!l){const h=()=>{};return h.stop=rn,h.resume=rn,h.pause=rn,h}}const c=be;s.call=(h,C,_)=>Ke(h,c,C,_);let d=!1;o==="post"?s.scheduler=h=>{De(h,c&&c.suspense)}:o!=="sync"&&(d=!0,s.scheduler=(h,C)=>{C?h():Zr(h)}),s.augmentJob=h=>{n&&(h.flags|=4),d&&(h.flags|=2,c&&(h.id=c.uid,h.i=c))};const m=Gs(e,n,s);return xt&&(f?f.push(m):l&&m()),m}function Xs(e,n,t){const r=this.proxy,a=pe(e)?e.includes(".")?Jo(r,e):()=>r[e]:e.bind(r,r);let o;Y(n)?o=n:(o=n.handler,t=n);const i=_t(this),s=$o(a,o.bind(r),t);return i(),s}function Jo(e,n){const t=n.split(".");return()=>{let r=e;for(let a=0;a<t.length&&r;a++)r=r[t[a]];return r}}const js=Symbol("_vte"),Qs=e=>e.__isTeleport,xn=Symbol("_leaveCb"),et=Symbol("_enterCb");function Zs(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Un(()=>{e.isMounted=!0}),si(()=>{e.isUnmounting=!0}),e}const ke=[Function,Array],$s={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:ke,onEnter:ke,onAfterEnter:ke,onEnterCancelled:ke,onBeforeLeave:ke,onLeave:ke,onAfterLeave:ke,onLeaveCancelled:ke,onBeforeAppear:ke,onAppear:ke,onAfterAppear:ke,onAppearCancelled:ke};function Js(e,n){const{leavingVNodes:t}=e;let r=t.get(n.type);return r||(r=Object.create(null),t.set(n.type,r)),r}function _r(e,n,t,r,a){const{appear:o,mode:i,persisted:s=!1,onBeforeEnter:l,onEnter:f,onAfterEnter:c,onEnterCancelled:d,onBeforeLeave:m,onLeave:h,onAfterLeave:C,onLeaveCancelled:_,onBeforeAppear:k,onAppear:O,onAfterAppear:E,onAppearCancelled:A}=n,w=String(e.key),L=Js(t,e),G=(H,W)=>{H&&Ke(H,r,9,W)},V=(H,W)=>{const $=W[1];G(H,W),z(H)?H.every(I=>I.length<=1)&&$():H.length<=1&&$()},ae={mode:i,persisted:s,beforeEnter(H){let W=l;if(!t.isMounted)if(o)W=k||l;else return;H[xn]&&H[xn](!0);const $=L[w];$&&zn(e,$)&&$.el[xn]&&$.el[xn](),G(W,[H])},enter(H){let W=f,$=c,I=d;if(!t.isMounted)if(o)W=O||f,$=E||c,I=A||d;else return;let X=!1;H[et]=ve=>{X||(X=!0,ve?G(I,[H]):G($,[H]),ae.delayedLeave&&ae.delayedLeave(),H[et]=void 0)};const le=H[et].bind(null,!1);W?V(W,[H,le]):le()},leave(H,W){const $=String(e.key);if(H[et]&&H[et](!0),t.isUnmounting)return W();G(m,[H]);let I=!1;H[xn]=le=>{I||(I=!0,W(),le?G(_,[H]):G(C,[H]),H[xn]=void 0,L[$]===e&&delete L[$])};const X=H[xn].bind(null,!1);L[$]=e,h?V(h,[H,X]):X()},clone(H){return _r(H,n,t,r)}};return ae}function yt(e,n){e.shapeFlag&6&&e.component?(e.transition=n,yt(e.component.subTree,n)):e.shapeFlag&128?(e.ssContent.transition=n.clone(e.ssContent),e.ssFallback.transition=n.clone(e.ssFallback)):e.transition=n}function ei(e,n=!1,t){let r=[],a=0;for(let o=0;o<e.length;o++){let i=e[o];const s=t==null?i.key:String(t)+String(i.key!=null?i.key:o);i.type===Ae?(i.patchFlag&128&&a++,r=r.concat(ei(i.children,n,s))):(n||i.type!==vn)&&r.push(s!=null?kn(i,{key:s}):i)}if(a>1)for(let o=0;o<r.length;o++)r[o].patchFlag=-2;return r}function An(e,n){return Y(e)?me({name:e.name},n,{setup:e}):e}function ni(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function va(e,n){let t;return!!((t=Object.getOwnPropertyDescriptor(e,n))&&!t.configurable)}const Ht=new WeakMap;function ft(e,n,t,r,a=!1){if(z(e)){e.forEach((_,k)=>ft(_,n&&(z(n)?n[k]:n),t,r,a));return}if(dt(r)&&!a){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&ft(e,n,t,r.component.subTree);return}const o=r.shapeFlag&4?aa(r.component):r.el,i=a?null:o,{i:s,r:l}=e,f=n&&n.r,c=s.refs===se?s.refs={}:s.refs,d=s.setupState,m=Z(d),h=d===se?xo:_=>va(c,_)?!1:ne(m,_),C=(_,k)=>!(k&&va(c,k));if(f!=null&&f!==l){if(ga(n),pe(f))c[f]=null,h(f)&&(d[f]=null);else if(Se(f)){const _=n;C(f,_.k)&&(f.value=null),_.k&&(c[_.k]=null)}}if(Y(l))wt(l,s,12,[i,c]);else{const _=pe(l),k=Se(l);if(_||k){const O=()=>{if(e.f){const E=_?h(l)?d[l]:c[l]:C()||!e.k?l.value:c[e.k];if(a)z(E)&&Fr(E,o);else if(z(E))E.includes(o)||E.push(o);else if(_)c[l]=[o],h(l)&&(d[l]=c[l]);else{const A=[o];C(l,e.k)&&(l.value=A),e.k&&(c[e.k]=A)}}else _?(c[l]=i,h(l)&&(d[l]=i)):k&&(C(l,e.k)&&(l.value=i),e.k&&(c[e.k]=i))};if(i){const E=()=>{O(),Ht.delete(e)};E.id=-1,Ht.set(e,E),De(E,t)}else ga(e),O()}}}function ga(e){const n=Ht.get(e);n&&(n.flags|=8,Ht.delete(e))}Wt().requestIdleCallback;Wt().cancelIdleCallback;const dt=e=>!!e.type.__asyncLoader,ti=e=>e.type.__isKeepAlive;function ri(e,n){oi(e,"a",n)}function ai(e,n){oi(e,"da",n)}function oi(e,n,t=be){const r=e.__wdc||(e.__wdc=()=>{let a=t;for(;a;){if(a.isDeactivated)return;a=a.parent}return e()});if(Zt(n,r,t),t){let a=t.parent;for(;a&&a.parent;)ti(a.parent.vnode)&&el(r,n,t,a),a=a.parent}}function el(e,n,t,r){const a=Zt(n,e,r,!0);Zn(()=>{Fr(r[n],a)},t)}function Zt(e,n,t=be,r=!1){if(t){const a=t[e]||(t[e]=[]),o=n.__weh||(n.__weh=(...i)=>{un();const s=_t(t),l=Ke(n,t,e,i);return s(),mn(),l});return r?a.unshift(o):a.push(o),o}}const gn=e=>(n,t=be)=>{(!xt||e==="sp")&&Zt(e,(...r)=>n(...r),t)},nl=gn("bm"),Un=gn("m"),tl=gn("bu"),ii=gn("u"),si=gn("bum"),Zn=gn("um"),rl=gn("sp"),al=gn("rtg"),ol=gn("rtc");function il(e,n=be){Zt("ec",e,n)}const sl="components";function li(e,n){return cl(sl,e,!0,n)||e}const ll=Symbol.for("v-ndc");function cl(e,n,t=!0,r=!1){const a=Ve||be;if(a){const o=a.type;{const s=jl(o,!1);if(s&&(s===n||s===ze(n)||s===Kt(ze(n))))return o}const i=ya(a[e]||o[e],n)||ya(a.appContext[e],n);return!i&&r?o:i}}function ya(e,n){return e&&(e[n]||e[ze(n)]||e[Kt(ze(n))])}function Jr(e,n,t,r){let a;const o=t,i=z(e);if(i||pe(e)){const s=i&&On(e);let l=!1,f=!1;s&&(l=!Ue(e),f=hn(e),e=Xt(e)),a=new Array(e.length);for(let c=0,d=e.length;c<d;c++)a[c]=n(l?f?Wn(Ye(e[c])):Ye(e[c]):e[c],c,void 0,o)}else if(typeof e=="number"){a=new Array(e);for(let s=0;s<e;s++)a[s]=n(s+1,s,void 0,o)}else if(te(e))if(e[Symbol.iterator])a=Array.from(e,(s,l)=>n(s,l,void 0,o));else{const s=Object.keys(e);a=new Array(s.length);for(let l=0,f=s.length;l<f;l++){const c=s[l];a[l]=n(e[c],c,l,o)}}else a=[];return a}const Cr=e=>e?Ni(e)?aa(e):Cr(e.parent):null,pt=me(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Cr(e.parent),$root:e=>Cr(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>fi(e),$forceUpdate:e=>e.f||(e.f=()=>{Zr(e.update)}),$nextTick:e=>e.n||(e.n=Wo.bind(e.proxy)),$watch:e=>Xs.bind(e)}),lr=(e,n)=>e!==se&&!e.__isScriptSetup&&ne(e,n),fl={get({_:e},n){if(n==="__v_skip")return!0;const{ctx:t,setupState:r,data:a,props:o,accessCache:i,type:s,appContext:l}=e;if(n[0]!=="$"){const m=i[n];if(m!==void 0)switch(m){case 1:return r[n];case 2:return a[n];case 4:return t[n];case 3:return o[n]}else{if(lr(r,n))return i[n]=1,r[n];if(a!==se&&ne(a,n))return i[n]=2,a[n];if(ne(o,n))return i[n]=3,o[n];if(t!==se&&ne(t,n))return i[n]=4,t[n];Tr&&(i[n]=0)}}const f=pt[n];let c,d;if(f)return n==="$attrs"&&ye(e.attrs,"get",""),f(e);if((c=s.__cssModules)&&(c=c[n]))return c;if(t!==se&&ne(t,n))return i[n]=4,t[n];if(d=l.config.globalProperties,ne(d,n))return d[n]},set({_:e},n,t){const{data:r,setupState:a,ctx:o}=e;return lr(a,n)?(a[n]=t,!0):r!==se&&ne(r,n)?(r[n]=t,!0):ne(e.props,n)||n[0]==="$"&&n.slice(1)in e?!1:(o[n]=t,!0)},has({_:{data:e,setupState:n,accessCache:t,ctx:r,appContext:a,props:o,type:i}},s){let l;return!!(t[s]||e!==se&&s[0]!=="$"&&ne(e,s)||lr(n,s)||ne(o,s)||ne(r,s)||ne(pt,s)||ne(a.config.globalProperties,s)||(l=i.__cssModules)&&l[s])},defineProperty(e,n,t){return t.get!=null?e._.accessCache[n]=0:ne(t,"value")&&this.set(e,n,t.value,null),Reflect.defineProperty(e,n,t)}};function ba(e){return z(e)?e.reduce((n,t)=>(n[t]=null,n),{}):e}let Tr=!0;function dl(e){const n=fi(e),t=e.proxy,r=e.ctx;Tr=!1,n.beforeCreate&&xa(n.beforeCreate,e,"bc");const{data:a,computed:o,methods:i,watch:s,provide:l,inject:f,created:c,beforeMount:d,mounted:m,beforeUpdate:h,updated:C,activated:_,deactivated:k,beforeDestroy:O,beforeUnmount:E,destroyed:A,unmounted:w,render:L,renderTracked:G,renderTriggered:V,errorCaptured:ae,serverPrefetch:H,expose:W,inheritAttrs:$,components:I,directives:X,filters:le}=n;if(f&&pl(f,r,null),i)for(const J in i){const K=i[J];Y(K)&&(r[J]=K.bind(t))}if(a){const J=a.call(t,t);te(J)&&(e.data=jt(J))}if(Tr=!0,o)for(const J in o){const K=o[J],Ge=Y(K)?K.bind(t,t):Y(K.get)?K.get.bind(t,t):rn,Xe=!Y(K)&&Y(K.set)?K.set.bind(t):rn,de=He({get:Ge,set:Xe});Object.defineProperty(r,J,{enumerable:!0,configurable:!0,get:()=>de.value,set:ge=>de.value=ge})}if(s)for(const J in s)ci(s[J],r,t,J);if(l){const J=Y(l)?l.call(t):l;Reflect.ownKeys(J).forEach(K=>{Nt(K,J[K])})}c&&xa(c,e,"c");function ce(J,K){z(K)?K.forEach(Ge=>J(Ge.bind(t))):K&&J(K.bind(t))}if(ce(nl,d),ce(Un,m),ce(tl,h),ce(ii,C),ce(ri,_),ce(ai,k),ce(il,ae),ce(ol,G),ce(al,V),ce(si,E),ce(Zn,w),ce(rl,H),z(W))if(W.length){const J=e.exposed||(e.exposed={});W.forEach(K=>{Object.defineProperty(J,K,{get:()=>t[K],set:Ge=>t[K]=Ge,enumerable:!0})})}else e.exposed||(e.exposed={});L&&e.render===rn&&(e.render=L),$!=null&&(e.inheritAttrs=$),I&&(e.components=I),X&&(e.directives=X),H&&ni(e)}function pl(e,n,t=rn){z(e)&&(e=Ar(e));for(const r in e){const a=e[r];let o;te(a)?"default"in a?o=Be(a.from||r,a.default,!0):o=Be(a.from||r):o=Be(a),Se(o)?Object.defineProperty(n,r,{enumerable:!0,configurable:!0,get:()=>o.value,set:i=>o.value=i}):n[r]=o}}function xa(e,n,t){Ke(z(e)?e.map(r=>r.bind(n.proxy)):e.bind(n.proxy),n,t)}function ci(e,n,t,r){let a=r.includes(".")?Jo(t,r):()=>t[r];if(pe(e)){const o=n[e];Y(o)&&ct(a,o)}else if(Y(e))ct(a,e.bind(t));else if(te(e))if(z(e))e.forEach(o=>ci(o,n,t,r));else{const o=Y(e.handler)?e.handler.bind(t):n[e.handler];Y(o)&&ct(a,o,e)}}function fi(e){const n=e.type,{mixins:t,extends:r}=n,{mixins:a,optionsCache:o,config:{optionMergeStrategies:i}}=e.appContext,s=o.get(n);let l;return s?l=s:!a.length&&!t&&!r?l=n:(l={},a.length&&a.forEach(f=>Ut(l,f,i,!0)),Ut(l,n,i)),te(n)&&o.set(n,l),l}function Ut(e,n,t,r=!1){const{mixins:a,extends:o}=n;o&&Ut(e,o,t,!0),a&&a.forEach(i=>Ut(e,i,t,!0));for(const i in n)if(!(r&&i==="expose")){const s=ul[i]||t&&t[i];e[i]=s?s(e[i],n[i]):n[i]}return e}const ul={data:Sa,props:Ea,emits:Ea,methods:rt,computed:rt,beforeCreate:we,created:we,beforeMount:we,mounted:we,beforeUpdate:we,updated:we,beforeDestroy:we,beforeUnmount:we,destroyed:we,unmounted:we,activated:we,deactivated:we,errorCaptured:we,serverPrefetch:we,components:rt,directives:rt,watch:hl,provide:Sa,inject:ml};function Sa(e,n){return n?e?function(){return me(Y(e)?e.call(this,this):e,Y(n)?n.call(this,this):n)}:n:e}function ml(e,n){return rt(Ar(e),Ar(n))}function Ar(e){if(z(e)){const n={};for(let t=0;t<e.length;t++)n[e[t]]=e[t];return n}return e}function we(e,n){return e?[...new Set([].concat(e,n))]:n}function rt(e,n){return e?me(Object.create(null),e,n):n}function Ea(e,n){return e?z(e)&&z(n)?[...new Set([...e,...n])]:me(Object.create(null),ba(e),ba(n??{})):n}function hl(e,n){if(!e)return n;if(!n)return e;const t=me(Object.create(null),e);for(const r in n)t[r]=we(e[r],n[r]);return t}function di(){return{app:null,config:{isNativeTag:xo,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let vl=0;function gl(e,n){return function(r,a=null){Y(r)||(r=me({},r)),a!=null&&!te(a)&&(a=null);const o=di(),i=new WeakSet,s=[];let l=!1;const f=o.app={_uid:vl++,_component:r,_props:a,_container:null,_context:o,_instance:null,version:Zl,get config(){return o.config},set config(c){},use(c,...d){return i.has(c)||(c&&Y(c.install)?(i.add(c),c.install(f,...d)):Y(c)&&(i.add(c),c(f,...d))),f},mixin(c){return o.mixins.includes(c)||o.mixins.push(c),f},component(c,d){return d?(o.components[c]=d,f):o.components[c]},directive(c,d){return d?(o.directives[c]=d,f):o.directives[c]},mount(c,d,m){if(!l){const h=f._ceVNode||ue(r,a);return h.appContext=o,m===!0?m="svg":m===!1&&(m=void 0),e(h,c,m),l=!0,f._container=c,c.__vue_app__=f,aa(h.component)}},onUnmount(c){s.push(c)},unmount(){l&&(Ke(s,f._instance,16),e(null,f._container),delete f._container.__vue_app__)},provide(c,d){return o.provides[c]=d,f},runWithContext(c){const d=Kn;Kn=f;try{return c()}finally{Kn=d}}};return f}}let Kn=null;const yl=(e,n)=>n==="modelValue"||n==="model-value"?e.modelModifiers:e[`${n}Modifiers`]||e[`${ze(n)}Modifiers`]||e[`${Hn(n)}Modifiers`];function bl(e,n,...t){if(e.isUnmounted)return;const r=e.vnode.props||se;let a=t;const o=n.startsWith("update:"),i=o&&yl(r,n.slice(7));i&&(i.trim&&(a=t.map(c=>pe(c)?c.trim():c)),i.number&&(a=t.map(is)));let s,l=r[s=tr(n)]||r[s=tr(ze(n))];!l&&o&&(l=r[s=tr(Hn(n))]),l&&Ke(l,e,6,a);const f=r[s+"Once"];if(f){if(!e.emitted)e.emitted={};else if(e.emitted[s])return;e.emitted[s]=!0,Ke(f,e,6,a)}}const xl=new WeakMap;function pi(e,n,t=!1){const r=t?xl:n.emitsCache,a=r.get(e);if(a!==void 0)return a;const o=e.emits;let i={},s=!1;if(!Y(e)){const l=f=>{const c=pi(f,n,!0);c&&(s=!0,me(i,c))};!t&&n.mixins.length&&n.mixins.forEach(l),e.extends&&l(e.extends),e.mixins&&e.mixins.forEach(l)}return!o&&!s?(te(e)&&r.set(e,null),null):(z(o)?o.forEach(l=>i[l]=null):me(i,o),te(e)&&r.set(e,i),i)}function $t(e,n){return!e||!qt(n)?!1:(n=n.slice(2).replace(/Once$/,""),ne(e,n[0].toLowerCase()+n.slice(1))||ne(e,Hn(n))||ne(e,n))}function wa(e){const{type:n,vnode:t,proxy:r,withProxy:a,propsOptions:[o],slots:i,attrs:s,emit:l,render:f,renderCache:c,props:d,data:m,setupState:h,ctx:C,inheritAttrs:_}=e,k=kt(e);let O,E;try{if(t.shapeFlag&4){const w=a||r,L=w;O=tn(f.call(L,w,c,d,h,m,C)),E=s}else{const w=n;O=tn(w.length>1?w(d,{attrs:s,slots:i,emit:l}):w(d,null)),E=n.props?s:Sl(s)}}catch(w){ut.length=0,Qt(w,e,1),O=ue(vn)}let A=O;if(E&&_!==!1){const w=Object.keys(E),{shapeFlag:L}=A;w.length&&L&7&&(o&&w.some(Br)&&(E=El(E,o)),A=kn(A,E,!1,!0))}return t.dirs&&(A=kn(A,null,!1,!0),A.dirs=A.dirs?A.dirs.concat(t.dirs):t.dirs),t.transition&&yt(A,t.transition),O=A,kt(k),O}const Sl=e=>{let n;for(const t in e)(t==="class"||t==="style"||qt(t))&&((n||(n={}))[t]=e[t]);return n},El=(e,n)=>{const t={};for(const r in e)(!Br(r)||!(r.slice(9)in n))&&(t[r]=e[r]);return t};function wl(e,n,t){const{props:r,children:a,component:o}=e,{props:i,children:s,patchFlag:l}=n,f=o.emitsOptions;if(n.dirs||n.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return r?_a(r,i,f):!!i;if(l&8){const c=n.dynamicProps;for(let d=0;d<c.length;d++){const m=c[d];if(ui(i,r,m)&&!$t(f,m))return!0}}}else return(a||s)&&(!s||!s.$stable)?!0:r===i?!1:r?i?_a(r,i,f):!0:!!i;return!1}function _a(e,n,t){const r=Object.keys(n);if(r.length!==Object.keys(e).length)return!0;for(let a=0;a<r.length;a++){const o=r[a];if(ui(n,e,o)&&!$t(t,o))return!0}return!1}function ui(e,n,t){const r=e[t],a=n[t];return t==="style"&&te(r)&&te(a)?!Vr(r,a):r!==a}function _l({vnode:e,parent:n},t){for(;n;){const r=n.subTree;if(r.suspense&&r.suspense.activeBranch===e&&(r.el=e.el),r===e)(e=n.vnode).el=t,n=n.parent;else break}}const mi={},hi=()=>Object.create(mi),vi=e=>Object.getPrototypeOf(e)===mi;function Cl(e,n,t,r=!1){const a={},o=hi();e.propsDefaults=Object.create(null),gi(e,n,a,o);for(const i in e.propsOptions[0])i in a||(a[i]=void 0);t?e.props=r?a:Vo(a):e.type.props?e.props=a:e.props=o,e.attrs=o}function Tl(e,n,t,r){const{props:a,attrs:o,vnode:{patchFlag:i}}=e,s=Z(a),[l]=e.propsOptions;let f=!1;if((r||i>0)&&!(i&16)){if(i&8){const c=e.vnode.dynamicProps;for(let d=0;d<c.length;d++){let m=c[d];if($t(e.emitsOptions,m))continue;const h=n[m];if(l)if(ne(o,m))h!==o[m]&&(o[m]=h,f=!0);else{const C=ze(m);a[C]=Rr(l,s,C,h,e,!1)}else h!==o[m]&&(o[m]=h,f=!0)}}}else{gi(e,n,a,o)&&(f=!0);let c;for(const d in s)(!n||!ne(n,d)&&((c=Hn(d))===d||!ne(n,c)))&&(l?t&&(t[d]!==void 0||t[c]!==void 0)&&(a[d]=Rr(l,s,d,void 0,e,!0)):delete a[d]);if(o!==s)for(const d in o)(!n||!ne(n,d))&&(delete o[d],f=!0)}f&&pn(e.attrs,"set","")}function gi(e,n,t,r){const[a,o]=e.propsOptions;let i=!1,s;if(n)for(let l in n){if(ot(l))continue;const f=n[l];let c;a&&ne(a,c=ze(l))?!o||!o.includes(c)?t[c]=f:(s||(s={}))[c]=f:$t(e.emitsOptions,l)||(!(l in r)||f!==r[l])&&(r[l]=f,i=!0)}if(o){const l=Z(t),f=s||se;for(let c=0;c<o.length;c++){const d=o[c];t[d]=Rr(a,l,d,f[d],e,!ne(f,d))}}return i}function Rr(e,n,t,r,a,o){const i=e[t];if(i!=null){const s=ne(i,"default");if(s&&r===void 0){const l=i.default;if(i.type!==Function&&!i.skipFactory&&Y(l)){const{propsDefaults:f}=a;if(t in f)r=f[t];else{const c=_t(a);r=f[t]=l.call(null,n),c()}}else r=l;a.ce&&a.ce._setProp(t,r)}i[0]&&(o&&!s?r=!1:i[1]&&(r===""||r===Hn(t))&&(r=!0))}return r}const Al=new WeakMap;function yi(e,n,t=!1){const r=t?Al:n.propsCache,a=r.get(e);if(a)return a;const o=e.props,i={},s=[];let l=!1;if(!Y(e)){const c=d=>{l=!0;const[m,h]=yi(d,n,!0);me(i,m),h&&s.push(...h)};!t&&n.mixins.length&&n.mixins.forEach(c),e.extends&&c(e.extends),e.mixins&&e.mixins.forEach(c)}if(!o&&!l)return te(e)&&r.set(e,Vn),Vn;if(z(o))for(let c=0;c<o.length;c++){const d=ze(o[c]);Ca(d)&&(i[d]=se)}else if(o)for(const c in o){const d=ze(c);if(Ca(d)){const m=o[c],h=i[d]=z(m)||Y(m)?{type:m}:me({},m),C=h.type;let _=!1,k=!0;if(z(C))for(let O=0;O<C.length;++O){const E=C[O],A=Y(E)&&E.name;if(A==="Boolean"){_=!0;break}else A==="String"&&(k=!1)}else _=Y(C)&&C.name==="Boolean";h[0]=_,h[1]=k,(_||ne(h,"default"))&&s.push(d)}}const f=[i,s];return te(e)&&r.set(e,f),f}function Ca(e){return e[0]!=="$"&&!ot(e)}const ea=e=>e==="_"||e==="_ctx"||e==="$stable",na=e=>z(e)?e.map(tn):[tn(e)],Rl=(e,n,t)=>{if(n._n)return n;const r=$r((...a)=>na(n(...a)),t);return r._c=!1,r},bi=(e,n,t)=>{const r=e._ctx;for(const a in e){if(ea(a))continue;const o=e[a];if(Y(o))n[a]=Rl(a,o,r);else if(o!=null){const i=na(o);n[a]=()=>i}}},xi=(e,n)=>{const t=na(n);e.slots.default=()=>t},Si=(e,n,t)=>{for(const r in n)(t||!ea(r))&&(e[r]=n[r])},Il=(e,n,t)=>{const r=e.slots=hi();if(e.vnode.shapeFlag&32){const a=n._;a?(Si(r,n,t),t&&Co(r,"_",a,!0)):bi(n,r)}else n&&xi(e,n)},Nl=(e,n,t)=>{const{vnode:r,slots:a}=e;let o=!0,i=se;if(r.shapeFlag&32){const s=n._;s?t&&s===1?o=!1:Si(a,n,t):(o=!n.$stable,bi(n,a)),i=n}else n&&(xi(e,n),i={default:1});if(o)for(const s in a)!ea(s)&&i[s]==null&&delete a[s]},De=Ml;function Dl(e){return Pl(e)}function Pl(e,n){const t=Wt();t.__VUE__=!0;const{insert:r,remove:a,patchProp:o,createElement:i,createText:s,createComment:l,setText:f,setElementText:c,parentNode:d,nextSibling:m,setScopeId:h=rn,insertStaticContent:C}=e,_=(p,u,v,g=null,x=null,b=null,N=void 0,R=null,T=!!u.dynamicChildren)=>{if(p===u)return;p&&!zn(p,u)&&(g=y(p),ge(p,x,b,!0),p=null),u.patchFlag===-2&&(T=!1,u.dynamicChildren=null);const{type:S,ref:F,shapeFlag:P}=u;switch(S){case Jt:k(p,u,v,g);break;case vn:O(p,u,v,g);break;case Dt:p==null&&E(u,v,g,N);break;case Ae:I(p,u,v,g,x,b,N,R,T);break;default:P&1?L(p,u,v,g,x,b,N,R,T):P&6?X(p,u,v,g,x,b,N,R,T):(P&64||P&128)&&S.process(p,u,v,g,x,b,N,R,T,U)}F!=null&&x?ft(F,p&&p.ref,b,u||p,!u):F==null&&p&&p.ref!=null&&ft(p.ref,null,b,p,!0)},k=(p,u,v,g)=>{if(p==null)r(u.el=s(u.children),v,g);else{const x=u.el=p.el;u.children!==p.children&&f(x,u.children)}},O=(p,u,v,g)=>{p==null?r(u.el=l(u.children||""),v,g):u.el=p.el},E=(p,u,v,g)=>{[p.el,p.anchor]=C(p.children,u,v,g,p.el,p.anchor)},A=({el:p,anchor:u},v,g)=>{let x;for(;p&&p!==u;)x=m(p),r(p,v,g),p=x;r(u,v,g)},w=({el:p,anchor:u})=>{let v;for(;p&&p!==u;)v=m(p),a(p),p=v;a(u)},L=(p,u,v,g,x,b,N,R,T)=>{if(u.type==="svg"?N="svg":u.type==="math"&&(N="mathml"),p==null)G(u,v,g,x,b,N,R,T);else{const S=p.el&&p.el._isVueCE?p.el:null;try{S&&S._beginPatch(),H(p,u,x,b,N,R,T)}finally{S&&S._endPatch()}}},G=(p,u,v,g,x,b,N,R)=>{let T,S;const{props:F,shapeFlag:P,transition:B,dirs:q}=p;if(T=p.el=i(p.type,b,F&&F.is,F),P&8?c(T,p.children):P&16&&ae(p.children,T,null,g,x,cr(p,b),N,R),q&&Rn(p,null,g,"created"),V(T,p,p.scopeId,N,g),F){for(const oe in F)oe!=="value"&&!ot(oe)&&o(T,oe,null,F[oe],b,g);"value"in F&&o(T,"value",null,F.value,b),(S=F.onVnodeBeforeMount)&&Je(S,g,p)}q&&Rn(p,null,g,"beforeMount");const Q=Ll(x,B);Q&&B.beforeEnter(T),r(T,u,v),((S=F&&F.onVnodeMounted)||Q||q)&&De(()=>{S&&Je(S,g,p),Q&&B.enter(T),q&&Rn(p,null,g,"mounted")},x)},V=(p,u,v,g,x)=>{if(v&&h(p,v),g)for(let b=0;b<g.length;b++)h(p,g[b]);if(x){let b=x.subTree;if(u===b||Ci(b.type)&&(b.ssContent===u||b.ssFallback===u)){const N=x.vnode;V(p,N,N.scopeId,N.slotScopeIds,x.parent)}}},ae=(p,u,v,g,x,b,N,R,T=0)=>{for(let S=T;S<p.length;S++){const F=p[S]=R?dn(p[S]):tn(p[S]);_(null,F,u,v,g,x,b,N,R)}},H=(p,u,v,g,x,b,N)=>{const R=u.el=p.el;let{patchFlag:T,dynamicChildren:S,dirs:F}=u;T|=p.patchFlag&16;const P=p.props||se,B=u.props||se;let q;if(v&&In(v,!1),(q=B.onVnodeBeforeUpdate)&&Je(q,v,u,p),F&&Rn(u,p,v,"beforeUpdate"),v&&In(v,!0),(P.innerHTML&&B.innerHTML==null||P.textContent&&B.textContent==null)&&c(R,""),S?W(p.dynamicChildren,S,R,v,g,cr(u,x),b):N||K(p,u,R,null,v,g,cr(u,x),b,!1),T>0){if(T&16)$(R,P,B,v,x);else if(T&2&&P.class!==B.class&&o(R,"class",null,B.class,x),T&4&&o(R,"style",P.style,B.style,x),T&8){const Q=u.dynamicProps;for(let oe=0;oe<Q.length;oe++){const re=Q[oe],Ie=P[re],Ne=B[re];(Ne!==Ie||re==="value")&&o(R,re,Ie,Ne,x,v)}}T&1&&p.children!==u.children&&c(R,u.children)}else!N&&S==null&&$(R,P,B,v,x);((q=B.onVnodeUpdated)||F)&&De(()=>{q&&Je(q,v,u,p),F&&Rn(u,p,v,"updated")},g)},W=(p,u,v,g,x,b,N)=>{for(let R=0;R<u.length;R++){const T=p[R],S=u[R],F=T.el&&(T.type===Ae||!zn(T,S)||T.shapeFlag&198)?d(T.el):v;_(T,S,F,null,g,x,b,N,!0)}},$=(p,u,v,g,x)=>{if(u!==v){if(u!==se)for(const b in u)!ot(b)&&!(b in v)&&o(p,b,u[b],null,x,g);for(const b in v){if(ot(b))continue;const N=v[b],R=u[b];N!==R&&b!=="value"&&o(p,b,R,N,x,g)}"value"in v&&o(p,"value",u.value,v.value,x)}},I=(p,u,v,g,x,b,N,R,T)=>{const S=u.el=p?p.el:s(""),F=u.anchor=p?p.anchor:s("");let{patchFlag:P,dynamicChildren:B,slotScopeIds:q}=u;q&&(R=R?R.concat(q):q),p==null?(r(S,v,g),r(F,v,g),ae(u.children||[],v,F,x,b,N,R,T)):P>0&&P&64&&B&&p.dynamicChildren&&p.dynamicChildren.length===B.length?(W(p.dynamicChildren,B,v,x,b,N,R),(u.key!=null||x&&u===x.subTree)&&Ei(p,u,!0)):K(p,u,v,F,x,b,N,R,T)},X=(p,u,v,g,x,b,N,R,T)=>{u.slotScopeIds=R,p==null?u.shapeFlag&512?x.ctx.activate(u,v,g,N,T):le(u,v,g,x,b,N,T):ve(p,u,T)},le=(p,u,v,g,x,b,N)=>{const R=p.component=ql(p,g,x);if(ti(p)&&(R.ctx.renderer=U),Yl(R,!1,N),R.asyncDep){if(x&&x.registerDep(R,ce,N),!p.el){const T=R.subTree=ue(vn);O(null,T,u,v),p.placeholder=T.el}}else ce(R,p,u,v,x,b,N)},ve=(p,u,v)=>{const g=u.component=p.component;if(wl(p,u,v))if(g.asyncDep&&!g.asyncResolved){J(g,u,v);return}else g.next=u,g.update();else u.el=p.el,g.vnode=u},ce=(p,u,v,g,x,b,N)=>{const R=()=>{if(p.isMounted){let{next:P,bu:B,u:q,parent:Q,vnode:oe}=p;{const Ze=wi(p);if(Ze){P&&(P.el=oe.el,J(p,P,N)),Ze.asyncDep.then(()=>{De(()=>{p.isUnmounted||S()},x)});return}}let re=P,Ie;In(p,!1),P?(P.el=oe.el,J(p,P,N)):P=oe,B&&rr(B),(Ie=P.props&&P.props.onVnodeBeforeUpdate)&&Je(Ie,Q,P,oe),In(p,!0);const Ne=wa(p),Qe=p.subTree;p.subTree=Ne,_(Qe,Ne,d(Qe.el),y(Qe),p,x,b),P.el=Ne.el,re===null&&_l(p,Ne.el),q&&De(q,x),(Ie=P.props&&P.props.onVnodeUpdated)&&De(()=>Je(Ie,Q,P,oe),x)}else{let P;const{el:B,props:q}=u,{bm:Q,m:oe,parent:re,root:Ie,type:Ne}=p,Qe=dt(u);In(p,!1),Q&&rr(Q),!Qe&&(P=q&&q.onVnodeBeforeMount)&&Je(P,re,u),In(p,!0);{Ie.ce&&Ie.ce._hasShadowRoot()&&Ie.ce._injectChildStyle(Ne);const Ze=p.subTree=wa(p);_(null,Ze,v,g,p,x,b),u.el=Ze.el}if(oe&&De(oe,x),!Qe&&(P=q&&q.onVnodeMounted)){const Ze=u;De(()=>Je(P,re,Ze),x)}(u.shapeFlag&256||re&&dt(re.vnode)&&re.vnode.shapeFlag&256)&&p.a&&De(p.a,x),p.isMounted=!0,u=v=g=null}};p.scope.on();const T=p.effect=new Io(R);p.scope.off();const S=p.update=T.run.bind(T),F=p.job=T.runIfDirty.bind(T);F.i=p,F.id=p.uid,T.scheduler=()=>Zr(F),In(p,!0),S()},J=(p,u,v)=>{u.component=p;const g=p.vnode.props;p.vnode=u,p.next=null,Tl(p,u.props,g,v),Nl(p,u.children,v),un(),ha(p),mn()},K=(p,u,v,g,x,b,N,R,T=!1)=>{const S=p&&p.children,F=p?p.shapeFlag:0,P=u.children,{patchFlag:B,shapeFlag:q}=u;if(B>0){if(B&128){Xe(S,P,v,g,x,b,N,R,T);return}else if(B&256){Ge(S,P,v,g,x,b,N,R,T);return}}q&8?(F&16&&Ee(S,x,b),P!==S&&c(v,P)):F&16?q&16?Xe(S,P,v,g,x,b,N,R,T):Ee(S,x,b,!0):(F&8&&c(v,""),q&16&&ae(P,v,g,x,b,N,R,T))},Ge=(p,u,v,g,x,b,N,R,T)=>{p=p||Vn,u=u||Vn;const S=p.length,F=u.length,P=Math.min(S,F);let B;for(B=0;B<P;B++){const q=u[B]=T?dn(u[B]):tn(u[B]);_(p[B],q,v,null,x,b,N,R,T)}S>F?Ee(p,x,b,!0,!1,P):ae(u,v,g,x,b,N,R,T,P)},Xe=(p,u,v,g,x,b,N,R,T)=>{let S=0;const F=u.length;let P=p.length-1,B=F-1;for(;S<=P&&S<=B;){const q=p[S],Q=u[S]=T?dn(u[S]):tn(u[S]);if(zn(q,Q))_(q,Q,v,null,x,b,N,R,T);else break;S++}for(;S<=P&&S<=B;){const q=p[P],Q=u[B]=T?dn(u[B]):tn(u[B]);if(zn(q,Q))_(q,Q,v,null,x,b,N,R,T);else break;P--,B--}if(S>P){if(S<=B){const q=B+1,Q=q<F?u[q].el:g;for(;S<=B;)_(null,u[S]=T?dn(u[S]):tn(u[S]),v,Q,x,b,N,R,T),S++}}else if(S>B)for(;S<=P;)ge(p[S],x,b,!0),S++;else{const q=S,Q=S,oe=new Map;for(S=Q;S<=B;S++){const Oe=u[S]=T?dn(u[S]):tn(u[S]);Oe.key!=null&&oe.set(Oe.key,S)}let re,Ie=0;const Ne=B-Q+1;let Qe=!1,Ze=0;const $n=new Array(Ne);for(S=0;S<Ne;S++)$n[S]=0;for(S=q;S<=P;S++){const Oe=p[S];if(Ie>=Ne){ge(Oe,x,b,!0);continue}let $e;if(Oe.key!=null)$e=oe.get(Oe.key);else for(re=Q;re<=B;re++)if($n[re-Q]===0&&zn(Oe,u[re])){$e=re;break}$e===void 0?ge(Oe,x,b,!0):($n[$e-Q]=S+1,$e>=Ze?Ze=$e:Qe=!0,_(Oe,u[$e],v,null,x,b,N,R,T),Ie++)}const la=Qe?Ol($n):Vn;for(re=la.length-1,S=Ne-1;S>=0;S--){const Oe=Q+S,$e=u[Oe],ca=u[Oe+1],fa=Oe+1<F?ca.el||_i(ca):g;$n[S]===0?_(null,$e,v,fa,x,b,N,R,T):Qe&&(re<0||S!==la[re]?de($e,v,fa,2):re--)}}},de=(p,u,v,g,x=null)=>{const{el:b,type:N,transition:R,children:T,shapeFlag:S}=p;if(S&6){de(p.component.subTree,u,v,g);return}if(S&128){p.suspense.move(u,v,g);return}if(S&64){N.move(p,u,v,U);return}if(N===Ae){r(b,u,v);for(let P=0;P<T.length;P++)de(T[P],u,v,g);r(p.anchor,u,v);return}if(N===Dt){A(p,u,v);return}if(g!==2&&S&1&&R)if(g===0)R.beforeEnter(b),r(b,u,v),De(()=>R.enter(b),x);else{const{leave:P,delayLeave:B,afterLeave:q}=R,Q=()=>{p.ctx.isUnmounted?a(b):r(b,u,v)},oe=()=>{b._isLeaving&&b[xn](!0),P(b,()=>{Q(),q&&q()})};B?B(b,Q,oe):oe()}else r(b,u,v)},ge=(p,u,v,g=!1,x=!1)=>{const{type:b,props:N,ref:R,children:T,dynamicChildren:S,shapeFlag:F,patchFlag:P,dirs:B,cacheIndex:q}=p;if(P===-2&&(x=!1),R!=null&&(un(),ft(R,null,v,p,!0),mn()),q!=null&&(u.renderCache[q]=void 0),F&256){u.ctx.deactivate(p);return}const Q=F&1&&B,oe=!dt(p);let re;if(oe&&(re=N&&N.onVnodeBeforeUnmount)&&Je(re,u,p),F&6)je(p.component,v,g);else{if(F&128){p.suspense.unmount(v,g);return}Q&&Rn(p,null,u,"beforeUnmount"),F&64?p.type.remove(p,u,v,U,g):S&&!S.hasOnce&&(b!==Ae||P>0&&P&64)?Ee(S,u,v,!1,!0):(b===Ae&&P&384||!x&&F&16)&&Ee(T,u,v),g&&on(p)}(oe&&(re=N&&N.onVnodeUnmounted)||Q)&&De(()=>{re&&Je(re,u,p),Q&&Rn(p,null,u,"unmounted")},v)},on=p=>{const{type:u,el:v,anchor:g,transition:x}=p;if(u===Ae){sn(v,g);return}if(u===Dt){w(p);return}const b=()=>{a(v),x&&!x.persisted&&x.afterLeave&&x.afterLeave()};if(p.shapeFlag&1&&x&&!x.persisted){const{leave:N,delayLeave:R}=x,T=()=>N(v,b);R?R(p.el,b,T):T()}else b()},sn=(p,u)=>{let v;for(;p!==u;)v=m(p),a(p),p=v;a(u)},je=(p,u,v)=>{const{bum:g,scope:x,job:b,subTree:N,um:R,m:T,a:S}=p;Ta(T),Ta(S),g&&rr(g),x.stop(),b&&(b.flags|=8,ge(N,p,u,v)),R&&De(R,u),De(()=>{p.isUnmounted=!0},u)},Ee=(p,u,v,g=!1,x=!1,b=0)=>{for(let N=b;N<p.length;N++)ge(p[N],u,v,g,x)},y=p=>{if(p.shapeFlag&6)return y(p.component.subTree);if(p.shapeFlag&128)return p.suspense.next();const u=m(p.anchor||p.el),v=u&&u[js];return v?m(v):u};let M=!1;const D=(p,u,v)=>{let g;p==null?u._vnode&&(ge(u._vnode,null,null,!0),g=u._vnode.component):_(u._vnode||null,p,u,null,null,null,v),u._vnode=p,M||(M=!0,ha(g),jo(),M=!1)},U={p:_,um:ge,m:de,r:on,mt:le,mc:ae,pc:K,pbc:W,n:y,o:e};return{render:D,hydrate:void 0,createApp:gl(D)}}function cr({type:e,props:n},t){return t==="svg"&&e==="foreignObject"||t==="mathml"&&e==="annotation-xml"&&n&&n.encoding&&n.encoding.includes("html")?void 0:t}function In({effect:e,job:n},t){t?(e.flags|=32,n.flags|=4):(e.flags&=-33,n.flags&=-5)}function Ll(e,n){return(!e||e&&!e.pendingBranch)&&n&&!n.persisted}function Ei(e,n,t=!1){const r=e.children,a=n.children;if(z(r)&&z(a))for(let o=0;o<r.length;o++){const i=r[o];let s=a[o];s.shapeFlag&1&&!s.dynamicChildren&&((s.patchFlag<=0||s.patchFlag===32)&&(s=a[o]=dn(a[o]),s.el=i.el),!t&&s.patchFlag!==-2&&Ei(i,s)),s.type===Jt&&(s.patchFlag===-1&&(s=a[o]=dn(s)),s.el=i.el),s.type===vn&&!s.el&&(s.el=i.el)}}function Ol(e){const n=e.slice(),t=[0];let r,a,o,i,s;const l=e.length;for(r=0;r<l;r++){const f=e[r];if(f!==0){if(a=t[t.length-1],e[a]<f){n[r]=a,t.push(r);continue}for(o=0,i=t.length-1;o<i;)s=o+i>>1,e[t[s]]<f?o=s+1:i=s;f<e[t[o]]&&(o>0&&(n[r]=t[o-1]),t[o]=r)}}for(o=t.length,i=t[o-1];o-- >0;)t[o]=i,i=n[i];return t}function wi(e){const n=e.subTree.component;if(n)return n.asyncDep&&!n.asyncResolved?n:wi(n)}function Ta(e){if(e)for(let n=0;n<e.length;n++)e[n].flags|=8}function _i(e){if(e.placeholder)return e.placeholder;const n=e.component;return n?_i(n.subTree):null}const Ci=e=>e.__isSuspense;function Ml(e,n){n&&n.pendingBranch?z(e)?n.effects.push(...e):n.effects.push(e):Ys(e)}const Ae=Symbol.for("v-fgt"),Jt=Symbol.for("v-txt"),vn=Symbol.for("v-cmt"),Dt=Symbol.for("v-stc"),ut=[];let Me=null;function Re(e=!1){ut.push(Me=e?null:[])}function kl(){ut.pop(),Me=ut[ut.length-1]||null}let bt=1;function Bt(e,n=!1){bt+=e,e<0&&Me&&n&&(Me.hasOnce=!0)}function Ti(e){return e.dynamicChildren=bt>0?Me||Vn:null,kl(),bt>0&&Me&&Me.push(e),e}function Fe(e,n,t,r,a,o){return Ti(Ce(e,n,t,r,a,o,!0))}function ta(e,n,t,r,a){return Ti(ue(e,n,t,r,a,!0))}function Ft(e){return e?e.__v_isVNode===!0:!1}function zn(e,n){return e.type===n.type&&e.key===n.key}const Ai=({key:e})=>e??null,Pt=({ref:e,ref_key:n,ref_for:t})=>(typeof e=="number"&&(e=""+e),e!=null?pe(e)||Se(e)||Y(e)?{i:Ve,r:e,k:n,f:!!t}:e:null);function Ce(e,n=null,t=null,r=0,a=null,o=e===Ae?0:1,i=!1,s=!1){const l={__v_isVNode:!0,__v_skip:!0,type:e,props:n,key:n&&Ai(n),ref:n&&Pt(n),scopeId:Zo,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:o,patchFlag:r,dynamicProps:a,dynamicChildren:null,appContext:null,ctx:Ve};return s?(ra(l,t),o&128&&e.normalize(l)):t&&(l.shapeFlag|=pe(t)?8:16),bt>0&&!i&&Me&&(l.patchFlag>0||o&6)&&l.patchFlag!==32&&Me.push(l),l}const ue=Hl;function Hl(e,n=null,t=null,r=0,a=null,o=!1){if((!e||e===ll)&&(e=vn),Ft(e)){const s=kn(e,n,!0);return t&&ra(s,t),bt>0&&!o&&Me&&(s.shapeFlag&6?Me[Me.indexOf(e)]=s:Me.push(s)),s.patchFlag=-2,s}if(Ql(e)&&(e=e.__vccOpts),n){n=Ul(n);let{class:s,style:l}=n;s&&!pe(s)&&(n.class=Mn(s)),te(l)&&(Qr(l)&&!z(l)&&(l=me({},l)),n.style=Gr(l))}const i=pe(e)?1:Ci(e)?128:Qs(e)?64:te(e)?4:Y(e)?2:0;return Ce(e,n,t,r,a,i,o,!0)}function Ul(e){return e?Qr(e)||vi(e)?me({},e):e:null}function kn(e,n,t=!1,r=!1){const{props:a,ref:o,patchFlag:i,children:s,transition:l}=e,f=n?zl(a||{},n):a,c={__v_isVNode:!0,__v_skip:!0,type:e.type,props:f,key:f&&Ai(f),ref:n&&n.ref?t&&o?z(o)?o.concat(Pt(n)):[o,Pt(n)]:Pt(n):o,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:s,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:n&&e.type!==Ae?i===-1?16:i|16:i,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:l,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&kn(e.ssContent),ssFallback:e.ssFallback&&kn(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return l&&r&&yt(c,l.clone(c)),c}function Bl(e=" ",n=0){return ue(Jt,null,e,n)}function Fl(e,n){const t=ue(Dt,null,e);return t.staticCount=n,t}function Ri(e="",n=!1){return n?(Re(),ta(vn,null,e)):ue(vn,null,e)}function tn(e){return e==null||typeof e=="boolean"?ue(vn):z(e)?ue(Ae,null,e.slice()):Ft(e)?dn(e):ue(Jt,null,String(e))}function dn(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:kn(e)}function ra(e,n){let t=0;const{shapeFlag:r}=e;if(n==null)n=null;else if(z(n))t=16;else if(typeof n=="object")if(r&65){const a=n.default;a&&(a._c&&(a._d=!1),ra(e,a()),a._c&&(a._d=!0));return}else{t=32;const a=n._;!a&&!vi(n)?n._ctx=Ve:a===3&&Ve&&(Ve.slots._===1?n._=1:(n._=2,e.patchFlag|=1024))}else Y(n)?(n={default:n,_ctx:Ve},t=32):(n=String(n),r&64?(t=16,n=[Bl(n)]):t=8);e.children=n,e.shapeFlag|=t}function zl(...e){const n={};for(let t=0;t<e.length;t++){const r=e[t];for(const a in r)if(a==="class")n.class!==r.class&&(n.class=Mn([n.class,r.class]));else if(a==="style")n.style=Gr([n.style,r.style]);else if(qt(a)){const o=n[a],i=r[a];i&&o!==i&&!(z(o)&&o.includes(i))&&(n[a]=o?[].concat(o,i):i)}else a!==""&&(n[a]=r[a])}return n}function Je(e,n,t,r=null){Ke(e,n,7,[t,r])}const Gl=di();let Vl=0;function ql(e,n,t){const r=e.type,a=(n?n.appContext:e.appContext)||Gl,o={uid:Vl++,vnode:e,type:r,parent:n,appContext:a,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new hs(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:n?n.provides:Object.create(a.provides),ids:n?n.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:yi(r,a),emitsOptions:pi(r,a),emit:null,emitted:null,propsDefaults:se,inheritAttrs:r.inheritAttrs,ctx:se,data:se,props:se,attrs:se,slots:se,refs:se,setupState:se,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return o.ctx={_:o},o.root=n?n.root:o,o.emit=bl.bind(null,o),e.ce&&e.ce(o),o}let be=null;const Ii=()=>be||Ve;let zt,Ir;{const e=Wt(),n=(t,r)=>{let a;return(a=e[t])||(a=e[t]=[]),a.push(r),o=>{a.length>1?a.forEach(i=>i(o)):a[0](o)}};zt=n("__VUE_INSTANCE_SETTERS__",t=>be=t),Ir=n("__VUE_SSR_SETTERS__",t=>xt=t)}const _t=e=>{const n=be;return zt(e),e.scope.on(),()=>{e.scope.off(),zt(n)}},Aa=()=>{be&&be.scope.off(),zt(null)};function Ni(e){return e.vnode.shapeFlag&4}let xt=!1;function Yl(e,n=!1,t=!1){n&&Ir(n);const{props:r,children:a}=e.vnode,o=Ni(e);Cl(e,r,o,n),Il(e,a,t||n);const i=o?Kl(e,n):void 0;return n&&Ir(!1),i}function Kl(e,n){const t=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,fl);const{setup:r}=t;if(r){un();const a=e.setupContext=r.length>1?Xl(e):null,o=_t(e),i=wt(r,e,0,[e.props,a]),s=Eo(i);if(mn(),o(),(s||e.sp)&&!dt(e)&&ni(e),s){if(i.then(Aa,Aa),n)return i.then(l=>{Ra(e,l)}).catch(l=>{Qt(l,e,0)});e.asyncDep=i}else Ra(e,i)}else Di(e)}function Ra(e,n,t){Y(n)?e.type.__ssrInlineRender?e.ssrRender=n:e.render=n:te(n)&&(e.setupState=Yo(n)),Di(e)}function Di(e,n,t){const r=e.type;e.render||(e.render=r.render||rn);{const a=_t(e);un();try{dl(e)}finally{mn(),a()}}}const Wl={get(e,n){return ye(e,"get",""),e[n]}};function Xl(e){const n=t=>{e.exposed=t||{}};return{attrs:new Proxy(e.attrs,Wl),slots:e.slots,emit:e.emit,expose:n}}function aa(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(Yo(Ms(e.exposed)),{get(n,t){if(t in n)return n[t];if(t in pt)return pt[t](e)},has(n,t){return t in n||t in pt}})):e.proxy}function jl(e,n=!0){return Y(e)?e.displayName||e.name:e.name||n&&e.__name}function Ql(e){return Y(e)&&"__vccOpts"in e}const He=(e,n)=>Fs(e,n,xt);function Pi(e,n,t){try{Bt(-1);const r=arguments.length;return r===2?te(n)&&!z(n)?Ft(n)?ue(e,null,[n]):ue(e,n):ue(e,null,n):(r>3?t=Array.prototype.slice.call(arguments,2):r===3&&Ft(t)&&(t=[t]),ue(e,n,t))}finally{Bt(1)}}const Zl="3.5.28";/**
* @vue/runtime-dom v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Nr;const Ia=typeof window<"u"&&window.trustedTypes;if(Ia)try{Nr=Ia.createPolicy("vue",{createHTML:e=>e})}catch{}const Li=Nr?e=>Nr.createHTML(e):e=>e,$l="http://www.w3.org/2000/svg",Jl="http://www.w3.org/1998/Math/MathML",fn=typeof document<"u"?document:null,Na=fn&&fn.createElement("template"),ec={insert:(e,n,t)=>{n.insertBefore(e,t||null)},remove:e=>{const n=e.parentNode;n&&n.removeChild(e)},createElement:(e,n,t,r)=>{const a=n==="svg"?fn.createElementNS($l,e):n==="mathml"?fn.createElementNS(Jl,e):t?fn.createElement(e,{is:t}):fn.createElement(e);return e==="select"&&r&&r.multiple!=null&&a.setAttribute("multiple",r.multiple),a},createText:e=>fn.createTextNode(e),createComment:e=>fn.createComment(e),setText:(e,n)=>{e.nodeValue=n},setElementText:(e,n)=>{e.textContent=n},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>fn.querySelector(e),setScopeId(e,n){e.setAttribute(n,"")},insertStaticContent(e,n,t,r,a,o){const i=t?t.previousSibling:n.lastChild;if(a&&(a===o||a.nextSibling))for(;n.insertBefore(a.cloneNode(!0),t),!(a===o||!(a=a.nextSibling)););else{Na.innerHTML=Li(r==="svg"?`<svg>${e}</svg>`:r==="mathml"?`<math>${e}</math>`:e);const s=Na.content;if(r==="svg"||r==="mathml"){const l=s.firstChild;for(;l.firstChild;)s.appendChild(l.firstChild);s.removeChild(l)}n.insertBefore(s,t)}return[i?i.nextSibling:n.firstChild,t?t.previousSibling:n.lastChild]}},yn="transition",nt="animation",Xn=Symbol("_vtc"),Oi={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},nc=me({},$s,Oi),Nn=(e,n=[])=>{z(e)?e.forEach(t=>t(...n)):e&&e(...n)},Da=e=>e?z(e)?e.some(n=>n.length>1):e.length>1:!1;function tc(e){const n={};for(const I in e)I in Oi||(n[I]=e[I]);if(e.css===!1)return n;const{name:t="v",type:r,duration:a,enterFromClass:o=`${t}-enter-from`,enterActiveClass:i=`${t}-enter-active`,enterToClass:s=`${t}-enter-to`,appearFromClass:l=o,appearActiveClass:f=i,appearToClass:c=s,leaveFromClass:d=`${t}-leave-from`,leaveActiveClass:m=`${t}-leave-active`,leaveToClass:h=`${t}-leave-to`}=e,C=rc(a),_=C&&C[0],k=C&&C[1],{onBeforeEnter:O,onEnter:E,onEnterCancelled:A,onLeave:w,onLeaveCancelled:L,onBeforeAppear:G=O,onAppear:V=E,onAppearCancelled:ae=A}=n,H=(I,X,le,ve)=>{I._enterCancelled=ve,Sn(I,X?c:s),Sn(I,X?f:i),le&&le()},W=(I,X)=>{I._isLeaving=!1,Sn(I,d),Sn(I,h),Sn(I,m),X&&X()},$=I=>(X,le)=>{const ve=I?V:E,ce=()=>H(X,I,le);Nn(ve,[X,ce]),Pa(()=>{Sn(X,I?l:o),en(X,I?c:s),Da(ve)||La(X,r,_,ce)})};return me(n,{onBeforeEnter(I){Nn(O,[I]),en(I,o),en(I,i)},onBeforeAppear(I){Nn(G,[I]),en(I,l),en(I,f)},onEnter:$(!1),onAppear:$(!0),onLeave(I,X){I._isLeaving=!0;const le=()=>W(I,X);en(I,d),I._enterCancelled?(en(I,m),Dr(I)):(Dr(I),en(I,m)),Pa(()=>{I._isLeaving&&(Sn(I,d),en(I,h),Da(w)||La(I,r,k,le))}),Nn(w,[I,le])},onEnterCancelled(I){H(I,!1,void 0,!0),Nn(A,[I])},onAppearCancelled(I){H(I,!0,void 0,!0),Nn(ae,[I])},onLeaveCancelled(I){W(I),Nn(L,[I])}})}function rc(e){if(e==null)return null;if(te(e))return[fr(e.enter),fr(e.leave)];{const n=fr(e);return[n,n]}}function fr(e){return ss(e)}function en(e,n){n.split(/\s+/).forEach(t=>t&&e.classList.add(t)),(e[Xn]||(e[Xn]=new Set)).add(n)}function Sn(e,n){n.split(/\s+/).forEach(r=>r&&e.classList.remove(r));const t=e[Xn];t&&(t.delete(n),t.size||(e[Xn]=void 0))}function Pa(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}let ac=0;function La(e,n,t,r){const a=e._endId=++ac,o=()=>{a===e._endId&&r()};if(t!=null)return setTimeout(o,t);const{type:i,timeout:s,propCount:l}=Mi(e,n);if(!i)return r();const f=i+"end";let c=0;const d=()=>{e.removeEventListener(f,m),o()},m=h=>{h.target===e&&++c>=l&&d()};setTimeout(()=>{c<l&&d()},s+1),e.addEventListener(f,m)}function Mi(e,n){const t=window.getComputedStyle(e),r=C=>(t[C]||"").split(", "),a=r(`${yn}Delay`),o=r(`${yn}Duration`),i=Oa(a,o),s=r(`${nt}Delay`),l=r(`${nt}Duration`),f=Oa(s,l);let c=null,d=0,m=0;n===yn?i>0&&(c=yn,d=i,m=o.length):n===nt?f>0&&(c=nt,d=f,m=l.length):(d=Math.max(i,f),c=d>0?i>f?yn:nt:null,m=c?c===yn?o.length:l.length:0);const h=c===yn&&/\b(?:transform|all)(?:,|$)/.test(r(`${yn}Property`).toString());return{type:c,timeout:d,propCount:m,hasTransform:h}}function Oa(e,n){for(;e.length<n.length;)e=e.concat(e);return Math.max(...n.map((t,r)=>Ma(t)+Ma(e[r])))}function Ma(e){return e==="auto"?0:Number(e.slice(0,-1).replace(",","."))*1e3}function Dr(e){return(e?e.ownerDocument:document).body.offsetHeight}function oc(e,n,t){const r=e[Xn];r&&(n=(n?[n,...r]:[...r]).join(" ")),n==null?e.removeAttribute("class"):t?e.setAttribute("class",n):e.className=n}const ka=Symbol("_vod"),ic=Symbol("_vsh"),sc=Symbol(""),lc=/(?:^|;)\s*display\s*:/;function cc(e,n,t){const r=e.style,a=pe(t);let o=!1;if(t&&!a){if(n)if(pe(n))for(const i of n.split(";")){const s=i.slice(0,i.indexOf(":")).trim();t[s]==null&&Lt(r,s,"")}else for(const i in n)t[i]==null&&Lt(r,i,"");for(const i in t)i==="display"&&(o=!0),Lt(r,i,t[i])}else if(a){if(n!==t){const i=r[sc];i&&(t+=";"+i),r.cssText=t,o=lc.test(t)}}else n&&e.removeAttribute("style");ka in e&&(e[ka]=o?r.display:"",e[ic]&&(r.display="none"))}const Ha=/\s*!important$/;function Lt(e,n,t){if(z(t))t.forEach(r=>Lt(e,n,r));else if(t==null&&(t=""),n.startsWith("--"))e.setProperty(n,t);else{const r=fc(e,n);Ha.test(t)?e.setProperty(Hn(r),t.replace(Ha,""),"important"):e[r]=t}}const Ua=["Webkit","Moz","ms"],dr={};function fc(e,n){const t=dr[n];if(t)return t;let r=ze(n);if(r!=="filter"&&r in e)return dr[n]=r;r=Kt(r);for(let a=0;a<Ua.length;a++){const o=Ua[a]+r;if(o in e)return dr[n]=o}return n}const Ba="http://www.w3.org/1999/xlink";function Fa(e,n,t,r,a,o=us(n)){r&&n.startsWith("xlink:")?t==null?e.removeAttributeNS(Ba,n.slice(6,n.length)):e.setAttributeNS(Ba,n,t):t==null||o&&!To(t)?e.removeAttribute(n):e.setAttribute(n,o?"":an(t)?String(t):t)}function za(e,n,t,r,a){if(n==="innerHTML"||n==="textContent"){t!=null&&(e[n]=n==="innerHTML"?Li(t):t);return}const o=e.tagName;if(n==="value"&&o!=="PROGRESS"&&!o.includes("-")){const s=o==="OPTION"?e.getAttribute("value")||"":e.value,l=t==null?e.type==="checkbox"?"on":"":String(t);(s!==l||!("_value"in e))&&(e.value=l),t==null&&e.removeAttribute(n),e._value=t;return}let i=!1;if(t===""||t==null){const s=typeof e[n];s==="boolean"?t=To(t):t==null&&s==="string"?(t="",i=!0):s==="number"&&(t=0,i=!0)}try{e[n]=t}catch{}i&&e.removeAttribute(a||n)}function dc(e,n,t,r){e.addEventListener(n,t,r)}function pc(e,n,t,r){e.removeEventListener(n,t,r)}const Ga=Symbol("_vei");function uc(e,n,t,r,a=null){const o=e[Ga]||(e[Ga]={}),i=o[n];if(r&&i)i.value=r;else{const[s,l]=mc(n);if(r){const f=o[n]=gc(r,a);dc(e,s,f,l)}else i&&(pc(e,s,i,l),o[n]=void 0)}}const Va=/(?:Once|Passive|Capture)$/;function mc(e){let n;if(Va.test(e)){n={};let r;for(;r=e.match(Va);)e=e.slice(0,e.length-r[0].length),n[r[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):Hn(e.slice(2)),n]}let pr=0;const hc=Promise.resolve(),vc=()=>pr||(hc.then(()=>pr=0),pr=Date.now());function gc(e,n){const t=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=t.attached)return;Ke(yc(r,t.value),n,5,[r])};return t.value=e,t.attached=vc(),t}function yc(e,n){if(z(n)){const t=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{t.call(e),e._stopped=!0},n.map(r=>a=>!a._stopped&&r&&r(a))}else return n}const qa=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,bc=(e,n,t,r,a,o)=>{const i=a==="svg";n==="class"?oc(e,r,i):n==="style"?cc(e,t,r):qt(n)?Br(n)||uc(e,n,t,r,o):(n[0]==="."?(n=n.slice(1),!0):n[0]==="^"?(n=n.slice(1),!1):xc(e,n,r,i))?(za(e,n,r),!e.tagName.includes("-")&&(n==="value"||n==="checked"||n==="selected")&&Fa(e,n,r,i,o,n!=="value")):e._isVueCE&&(/[A-Z]/.test(n)||!pe(r))?za(e,ze(n),r,o,n):(n==="true-value"?e._trueValue=r:n==="false-value"&&(e._falseValue=r),Fa(e,n,r,i))};function xc(e,n,t,r){if(r)return!!(n==="innerHTML"||n==="textContent"||n in e&&qa(n)&&Y(t));if(n==="spellcheck"||n==="draggable"||n==="translate"||n==="autocorrect"||n==="sandbox"&&e.tagName==="IFRAME"||n==="form"||n==="list"&&e.tagName==="INPUT"||n==="type"&&e.tagName==="TEXTAREA")return!1;if(n==="width"||n==="height"){const a=e.tagName;if(a==="IMG"||a==="VIDEO"||a==="CANVAS"||a==="SOURCE")return!1}return qa(n)&&pe(t)?!1:n in e}const ki=new WeakMap,Hi=new WeakMap,Gt=Symbol("_moveCb"),Ya=Symbol("_enterCb"),Sc=e=>(delete e.props.mode,e),Ec=Sc({name:"TransitionGroup",props:me({},nc,{tag:String,moveClass:String}),setup(e,{slots:n}){const t=Ii(),r=Zs();let a,o;return ii(()=>{if(!a.length)return;const i=e.moveClass||`${e.name||"v"}-move`;if(!Ac(a[0].el,t.vnode.el,i)){a=[];return}a.forEach(_c),a.forEach(Cc);const s=a.filter(Tc);Dr(t.vnode.el),s.forEach(l=>{const f=l.el,c=f.style;en(f,i),c.transform=c.webkitTransform=c.transitionDuration="";const d=f[Gt]=m=>{m&&m.target!==f||(!m||m.propertyName.endsWith("transform"))&&(f.removeEventListener("transitionend",d),f[Gt]=null,Sn(f,i))};f.addEventListener("transitionend",d)}),a=[]}),()=>{const i=Z(e),s=tc(i);let l=i.tag||Ae;if(a=[],o)for(let f=0;f<o.length;f++){const c=o[f];c.el&&c.el instanceof Element&&(a.push(c),yt(c,_r(c,s,r,t)),ki.set(c,Ui(c.el)))}o=n.default?ei(n.default()):[];for(let f=0;f<o.length;f++){const c=o[f];c.key!=null&&yt(c,_r(c,s,r,t))}return ue(l,null,o)}}}),wc=Ec;function _c(e){const n=e.el;n[Gt]&&n[Gt](),n[Ya]&&n[Ya]()}function Cc(e){Hi.set(e,Ui(e.el))}function Tc(e){const n=ki.get(e),t=Hi.get(e),r=n.left-t.left,a=n.top-t.top;if(r||a){const o=e.el,i=o.style,s=o.getBoundingClientRect();let l=1,f=1;return o.offsetWidth&&(l=s.width/o.offsetWidth),o.offsetHeight&&(f=s.height/o.offsetHeight),(!Number.isFinite(l)||l===0)&&(l=1),(!Number.isFinite(f)||f===0)&&(f=1),Math.abs(l-1)<.01&&(l=1),Math.abs(f-1)<.01&&(f=1),i.transform=i.webkitTransform=`translate(${r/l}px,${a/f}px)`,i.transitionDuration="0s",e}}function Ui(e){const n=e.getBoundingClientRect();return{left:n.left,top:n.top}}function Ac(e,n,t){const r=e.cloneNode(),a=e[Xn];a&&a.forEach(s=>{s.split(/\s+/).forEach(l=>l&&r.classList.remove(l))}),t.split(/\s+/).forEach(s=>s&&r.classList.add(s)),r.style.display="none";const o=n.nodeType===1?n:n.parentNode;o.appendChild(r);const{hasTransform:i}=Mi(r);return o.removeChild(r),i}const Rc=me({patchProp:bc},ec);let Ka;function Ic(){return Ka||(Ka=Dl(Rc))}const Nc=((...e)=>{const n=Ic().createApp(...e),{mount:t}=n;return n.mount=r=>{const a=Pc(r);if(!a)return;const o=n._component;!Y(o)&&!o.render&&!o.template&&(o.template=a.innerHTML),a.nodeType===1&&(a.textContent="");const i=t(a,!1,Dc(a));return a instanceof Element&&(a.removeAttribute("v-cloak"),a.setAttribute("data-v-app","")),i},n});function Dc(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function Pc(e){return pe(e)?document.querySelector(e):e}const yd=4,bd=2,Wa=400,Xa=300,ja=50,Lc=800,at=500,Bi=100,Fi=200,xd=at+Bi+Fi,Sd=200,Oc=300,Mc=250,ur=8,kc=8,Hc=18,Uc=2.5,Bc=1.2,Fc=1.5,zc=10,Gc=4,Vc=2,qc=2,Yc=1.5,Kc=8,Qa=xe(null),Vt=xe("full");let Za=!1,mr=null;function Wc(){Za||(Za=!0,mr=window.matchMedia("(prefers-reduced-motion: reduce)"),Vt.value=mr.matches?"reduced":"full",mr.addEventListener("change",e=>{Vt.value=e.matches?"reduced":"full"}))}function oa(){Un(()=>{Wc()});const e=Vt;function n(a,o){if(o<=1)return 0;const i=Lc-ja,s=Math.min(ja,i/(o-1));return Math.round(a*s)}function t(a){Qa.value=a}function r(a){return Vt.value==="reduced"?Promise.resolve():a.animate([{transform:"scale(1)",opacity:1},{transform:"scale(0.95)",opacity:0}],{duration:Mc,easing:"cubic-bezier(0.25, 0.1, 0.25, 1)",fill:"forwards"}).finished.then(()=>{})}return{prefersReducedMotion:e,transitionSnapshot:Qa,getStaggerDelay:n,setTransitionSnapshot:t,triggerCardExit:r}}const Xc=["src"],jc=An({__name:"TransitionOverlay",setup(e){const{transitionSnapshot:n,setTransitionSnapshot:t,prefersReducedMotion:r}=oa(),a=xe(null),o=xe(null),i=xe(!1);function s(c){const m=performance.now();return new Promise(h=>{const C=()=>{const _=typeof CSS<"u"&&typeof CSS.escape=="function"?CSS.escape(c):c,k=document.querySelector(`[data-shader-slug="${_}"]`);if(k){const O=k.getBoundingClientRect();h({top:O.top,left:O.left,width:O.width,height:O.height});return}if(performance.now()-m>=1500){h(null);return}requestAnimationFrame(C)};C()})}function l(c){const d=o.value,m=a.value;if(!d||!m){i.value=!1,t(null);return}const{top:h,left:C,width:_,height:k}=c.rect;m.animate([{backgroundColor:"rgba(9, 10, 16, 0)"},{backgroundColor:"rgba(9, 10, 16, 0.95)"}],{duration:at,easing:"cubic-bezier(0.25, 0.1, 0.25, 1)",fill:"forwards"}),d.animate([{top:`${h}px`,left:`${C}px`,width:`${_}px`,height:`${k}px`,borderRadius:"8px"},{top:"0px",left:"0px",width:"100vw",height:"100vh",borderRadius:"0px"}],{duration:at,easing:"cubic-bezier(0.25, 0.1, 0.25, 1)",fill:"forwards"}).finished.then(()=>{setTimeout(()=>{m.animate([{opacity:1},{opacity:0}],{duration:Fi,fill:"forwards"}).finished.then(()=>{i.value=!1,t(null)})},Bi)})}async function f(c){const d=o.value,m=a.value;if(!d||!m){i.value=!1,t(null);return}const h=await s(c.slug);if(!h){i.value=!1,t(null);return}m.animate([{backgroundColor:"rgba(9, 10, 16, 0.95)",opacity:1},{backgroundColor:"rgba(9, 10, 16, 0)",opacity:0}],{duration:at,easing:"cubic-bezier(0.25, 0.1, 0.25, 1)",fill:"forwards"}),d.animate([{top:"0px",left:"0px",width:"100vw",height:"100vh",borderRadius:"0px"},{top:`${h.top}px`,left:`${h.left}px`,width:`${h.width}px`,height:`${h.height}px`,borderRadius:"8px"}],{duration:at,easing:"cubic-bezier(0.25, 0.1, 0.25, 1)",fill:"forwards"}).finished.then(()=>{i.value=!1,t(null)})}return ct(n,async c=>{if(!(!c||r.value==="reduced")){if(i.value=!0,await new Promise(d=>requestAnimationFrame(()=>d())),c.direction==="to-gallery"){await f(c);return}l(c)}}),(c,d)=>i.value&&Le(n)?(Re(),Fe("div",{key:0,ref_key:"overlayRef",ref:a,class:"transition-overlay"},[Ce("img",{ref_key:"imgRef",ref:o,src:Le(n).screenshotUrl,alt:"",class:"transition-image"},null,8,Xc)],512)):Ri("",!0)}}),Ct=(e,n)=>{const t=e.__vccOpts||e;for(const[r,a]of n)t[r]=a;return t},Qc=Ct(jc,[["__scopeId","data-v-58df5b9e"]]),Zc=An({__name:"App",setup(e){return(n,t)=>{const r=li("router-view");return Re(),Fe(Ae,null,[ue(r),ue(Qc)],64)}}}),$c="modulepreload",Jc=function(e){return"/"+e},$a={},ef=function(n,t,r){let a=Promise.resolve();if(t&&t.length>0){let i=function(f){return Promise.all(f.map(c=>Promise.resolve(c).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),l=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));a=i(t.map(f=>{if(f=Jc(f),f in $a)return;$a[f]=!0;const c=f.endsWith(".css"),d=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${f}"]${d}`))return;const m=document.createElement("link");if(m.rel=c?"stylesheet":$c,c||(m.as="script"),m.crossOrigin="",m.href=f,l&&m.setAttribute("nonce",l),document.head.appendChild(m),c)return new Promise((h,C)=>{m.addEventListener("load",h),m.addEventListener("error",()=>C(new Error(`Unable to preload CSS for ${f}`)))})}))}function o(i){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=i,window.dispatchEvent(s),!s.defaultPrevented)throw i}return a.then(i=>{for(const s of i||[])s.status==="rejected"&&o(s.reason);return n().catch(o)})};/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const Gn=typeof document<"u";function zi(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function nf(e){return e.__esModule||e[Symbol.toStringTag]==="Module"||e.default&&zi(e.default)}const ee=Object.assign;function hr(e,n){const t={};for(const r in n){const a=n[r];t[r]=We(a)?a.map(e):e(a)}return t}const mt=()=>{},We=Array.isArray;function Ja(e,n){const t={};for(const r in e)t[r]=r in n?n[r]:e[r];return t}const Gi=/#/g,tf=/&/g,rf=/\//g,af=/=/g,of=/\?/g,Vi=/\+/g,sf=/%5B/g,lf=/%5D/g,qi=/%5E/g,cf=/%60/g,Yi=/%7B/g,ff=/%7C/g,Ki=/%7D/g,df=/%20/g;function ia(e){return e==null?"":encodeURI(""+e).replace(ff,"|").replace(sf,"[").replace(lf,"]")}function pf(e){return ia(e).replace(Yi,"{").replace(Ki,"}").replace(qi,"^")}function Pr(e){return ia(e).replace(Vi,"%2B").replace(df,"+").replace(Gi,"%23").replace(tf,"%26").replace(cf,"`").replace(Yi,"{").replace(Ki,"}").replace(qi,"^")}function uf(e){return Pr(e).replace(af,"%3D")}function mf(e){return ia(e).replace(Gi,"%23").replace(of,"%3F")}function hf(e){return mf(e).replace(rf,"%2F")}function St(e){if(e==null)return null;try{return decodeURIComponent(""+e)}catch{}return""+e}const vf=/\/$/,gf=e=>e.replace(vf,"");function vr(e,n,t="/"){let r,a={},o="",i="";const s=n.indexOf("#");let l=n.indexOf("?");return l=s>=0&&l>s?-1:l,l>=0&&(r=n.slice(0,l),o=n.slice(l,s>0?s:n.length),a=e(o.slice(1))),s>=0&&(r=r||n.slice(0,s),i=n.slice(s,n.length)),r=Sf(r??n,t),{fullPath:r+o+i,path:r,query:a,hash:St(i)}}function yf(e,n){const t=n.query?e(n.query):"";return n.path+(t&&"?")+t+(n.hash||"")}function eo(e,n){return!n||!e.toLowerCase().startsWith(n.toLowerCase())?e:e.slice(n.length)||"/"}function bf(e,n,t){const r=n.matched.length-1,a=t.matched.length-1;return r>-1&&r===a&&jn(n.matched[r],t.matched[a])&&Wi(n.params,t.params)&&e(n.query)===e(t.query)&&n.hash===t.hash}function jn(e,n){return(e.aliasOf||e)===(n.aliasOf||n)}function Wi(e,n){if(Object.keys(e).length!==Object.keys(n).length)return!1;for(var t in e)if(!xf(e[t],n[t]))return!1;return!0}function xf(e,n){return We(e)?no(e,n):We(n)?no(n,e):(e==null?void 0:e.valueOf())===(n==null?void 0:n.valueOf())}function no(e,n){return We(n)?e.length===n.length&&e.every((t,r)=>t===n[r]):e.length===1&&e[0]===n}function Sf(e,n){if(e.startsWith("/"))return e;if(!e)return n;const t=n.split("/"),r=e.split("/"),a=r[r.length-1];(a===".."||a===".")&&r.push("");let o=t.length-1,i,s;for(i=0;i<r.length;i++)if(s=r[i],s!==".")if(s==="..")o>1&&o--;else break;return t.slice(0,o).join("/")+"/"+r.slice(i).join("/")}const bn={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let Lr=(function(e){return e.pop="pop",e.push="push",e})({}),gr=(function(e){return e.back="back",e.forward="forward",e.unknown="",e})({});function Ef(e){if(!e)if(Gn){const n=document.querySelector("base");e=n&&n.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),gf(e)}const wf=/^[^#]+#/;function _f(e,n){return e.replace(wf,"#")+n}function Cf(e,n){const t=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:n.behavior,left:r.left-t.left-(n.left||0),top:r.top-t.top-(n.top||0)}}const er=()=>({left:window.scrollX,top:window.scrollY});function Tf(e){let n;if("el"in e){const t=e.el,r=typeof t=="string"&&t.startsWith("#"),a=typeof t=="string"?r?document.getElementById(t.slice(1)):document.querySelector(t):t;if(!a)return;n=Cf(a,e)}else n=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(n):window.scrollTo(n.left!=null?n.left:window.scrollX,n.top!=null?n.top:window.scrollY)}function to(e,n){return(history.state?history.state.position-n:-1)+e}const Or=new Map;function Af(e,n){Or.set(e,n)}function Rf(e){const n=Or.get(e);return Or.delete(e),n}function If(e){return typeof e=="string"||e&&typeof e=="object"}function Xi(e){return typeof e=="string"||typeof e=="symbol"}let fe=(function(e){return e[e.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",e[e.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",e[e.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",e[e.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",e[e.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",e})({});const ji=Symbol("");fe.MATCHER_NOT_FOUND+"",fe.NAVIGATION_GUARD_REDIRECT+"",fe.NAVIGATION_ABORTED+"",fe.NAVIGATION_CANCELLED+"",fe.NAVIGATION_DUPLICATED+"";function Qn(e,n){return ee(new Error,{type:e,[ji]:!0},n)}function cn(e,n){return e instanceof Error&&ji in e&&(n==null||!!(e.type&n))}const Nf=["params","query","hash"];function Df(e){if(typeof e=="string")return e;if(e.path!=null)return e.path;const n={};for(const t of Nf)t in e&&(n[t]=e[t]);return JSON.stringify(n,null,2)}function Pf(e){const n={};if(e===""||e==="?")return n;const t=(e[0]==="?"?e.slice(1):e).split("&");for(let r=0;r<t.length;++r){const a=t[r].replace(Vi," "),o=a.indexOf("="),i=St(o<0?a:a.slice(0,o)),s=o<0?null:St(a.slice(o+1));if(i in n){let l=n[i];We(l)||(l=n[i]=[l]),l.push(s)}else n[i]=s}return n}function ro(e){let n="";for(let t in e){const r=e[t];if(t=uf(t),r==null){r!==void 0&&(n+=(n.length?"&":"")+t);continue}(We(r)?r.map(a=>a&&Pr(a)):[r&&Pr(r)]).forEach(a=>{a!==void 0&&(n+=(n.length?"&":"")+t,a!=null&&(n+="="+a))})}return n}function Lf(e){const n={};for(const t in e){const r=e[t];r!==void 0&&(n[t]=We(r)?r.map(a=>a==null?null:""+a):r==null?r:""+r)}return n}const Qi=Symbol(""),ao=Symbol(""),nr=Symbol(""),sa=Symbol(""),Mr=Symbol("");function tt(){let e=[];function n(r){return e.push(r),()=>{const a=e.indexOf(r);a>-1&&e.splice(a,1)}}function t(){e=[]}return{add:n,list:()=>e.slice(),reset:t}}function Of(e,n,t){const r=()=>{e[n].delete(t)};Zn(r),ai(r),ri(()=>{e[n].add(t)}),e[n].add(t)}function Ed(e){const n=Be(Qi,{}).value;n&&Of(n,"leaveGuards",e)}function _n(e,n,t,r,a,o=i=>i()){const i=r&&(r.enterCallbacks[a]=r.enterCallbacks[a]||[]);return()=>new Promise((s,l)=>{const f=m=>{m===!1?l(Qn(fe.NAVIGATION_ABORTED,{from:t,to:n})):m instanceof Error?l(m):If(m)?l(Qn(fe.NAVIGATION_GUARD_REDIRECT,{from:n,to:m})):(i&&r.enterCallbacks[a]===i&&typeof m=="function"&&i.push(m),s())},c=o(()=>e.call(r&&r.instances[a],n,t,f));let d=Promise.resolve(c);e.length<3&&(d=d.then(f)),d.catch(m=>l(m))})}function yr(e,n,t,r,a=o=>o()){const o=[];for(const i of e)for(const s in i.components){let l=i.components[s];if(!(n!=="beforeRouteEnter"&&!i.instances[s]))if(zi(l)){const f=(l.__vccOpts||l)[n];f&&o.push(_n(f,t,r,i,s,a))}else{let f=l();o.push(()=>f.then(c=>{if(!c)throw new Error(`Couldn't resolve component "${s}" at "${i.path}"`);const d=nf(c)?c.default:c;i.mods[s]=c,i.components[s]=d;const m=(d.__vccOpts||d)[n];return m&&_n(m,t,r,i,s,a)()}))}}return o}function Mf(e,n){const t=[],r=[],a=[],o=Math.max(n.matched.length,e.matched.length);for(let i=0;i<o;i++){const s=n.matched[i];s&&(e.matched.find(f=>jn(f,s))?r.push(s):t.push(s));const l=e.matched[i];l&&(n.matched.find(f=>jn(f,l))||a.push(l))}return[t,r,a]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let kf=()=>location.protocol+"//"+location.host;function Zi(e,n){const{pathname:t,search:r,hash:a}=n,o=e.indexOf("#");if(o>-1){let i=a.includes(e.slice(o))?e.slice(o).length:1,s=a.slice(i);return s[0]!=="/"&&(s="/"+s),eo(s,"")}return eo(t,e)+r+a}function Hf(e,n,t,r){let a=[],o=[],i=null;const s=({state:m})=>{const h=Zi(e,location),C=t.value,_=n.value;let k=0;if(m){if(t.value=h,n.value=m,i&&i===C){i=null;return}k=_?m.position-_.position:0}else r(h);a.forEach(O=>{O(t.value,C,{delta:k,type:Lr.pop,direction:k?k>0?gr.forward:gr.back:gr.unknown})})};function l(){i=t.value}function f(m){a.push(m);const h=()=>{const C=a.indexOf(m);C>-1&&a.splice(C,1)};return o.push(h),h}function c(){if(document.visibilityState==="hidden"){const{history:m}=window;if(!m.state)return;m.replaceState(ee({},m.state,{scroll:er()}),"")}}function d(){for(const m of o)m();o=[],window.removeEventListener("popstate",s),window.removeEventListener("pagehide",c),document.removeEventListener("visibilitychange",c)}return window.addEventListener("popstate",s),window.addEventListener("pagehide",c),document.addEventListener("visibilitychange",c),{pauseListeners:l,listen:f,destroy:d}}function oo(e,n,t,r=!1,a=!1){return{back:e,current:n,forward:t,replaced:r,position:window.history.length,scroll:a?er():null}}function Uf(e){const{history:n,location:t}=window,r={value:Zi(e,t)},a={value:n.state};a.value||o(r.value,{back:null,current:r.value,forward:null,position:n.length-1,replaced:!0,scroll:null},!0);function o(l,f,c){const d=e.indexOf("#"),m=d>-1?(t.host&&document.querySelector("base")?e:e.slice(d))+l:kf()+e+l;try{n[c?"replaceState":"pushState"](f,"",m),a.value=f}catch(h){console.error(h),t[c?"replace":"assign"](m)}}function i(l,f){o(l,ee({},n.state,oo(a.value.back,l,a.value.forward,!0),f,{position:a.value.position}),!0),r.value=l}function s(l,f){const c=ee({},a.value,n.state,{forward:l,scroll:er()});o(c.current,c,!0),o(l,ee({},oo(r.value,l,null),{position:c.position+1},f),!1),r.value=l}return{location:r,state:a,push:s,replace:i}}function Bf(e){e=Ef(e);const n=Uf(e),t=Hf(e,n.state,n.location,n.replace);function r(o,i=!0){i||t.pauseListeners(),history.go(o)}const a=ee({location:"",base:e,go:r,createHref:_f.bind(null,e)},n,t);return Object.defineProperty(a,"location",{enumerable:!0,get:()=>n.location.value}),Object.defineProperty(a,"state",{enumerable:!0,get:()=>n.state.value}),a}function Ff(e){return e=location.host?e||location.pathname+location.search:"",e.includes("#")||(e+="#"),Bf(e)}let Pn=(function(e){return e[e.Static=0]="Static",e[e.Param=1]="Param",e[e.Group=2]="Group",e})({});var he=(function(e){return e[e.Static=0]="Static",e[e.Param=1]="Param",e[e.ParamRegExp=2]="ParamRegExp",e[e.ParamRegExpEnd=3]="ParamRegExpEnd",e[e.EscapeNext=4]="EscapeNext",e})(he||{});const zf={type:Pn.Static,value:""},Gf=/[a-zA-Z0-9_]/;function Vf(e){if(!e)return[[]];if(e==="/")return[[zf]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function n(h){throw new Error(`ERR (${t})/"${f}": ${h}`)}let t=he.Static,r=t;const a=[];let o;function i(){o&&a.push(o),o=[]}let s=0,l,f="",c="";function d(){f&&(t===he.Static?o.push({type:Pn.Static,value:f}):t===he.Param||t===he.ParamRegExp||t===he.ParamRegExpEnd?(o.length>1&&(l==="*"||l==="+")&&n(`A repeatable param (${f}) must be alone in its segment. eg: '/:ids+.`),o.push({type:Pn.Param,value:f,regexp:c,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):n("Invalid state to consume buffer"),f="")}function m(){f+=l}for(;s<e.length;){if(l=e[s++],l==="\\"&&t!==he.ParamRegExp){r=t,t=he.EscapeNext;continue}switch(t){case he.Static:l==="/"?(f&&d(),i()):l===":"?(d(),t=he.Param):m();break;case he.EscapeNext:m(),t=r;break;case he.Param:l==="("?t=he.ParamRegExp:Gf.test(l)?m():(d(),t=he.Static,l!=="*"&&l!=="?"&&l!=="+"&&s--);break;case he.ParamRegExp:l===")"?c[c.length-1]=="\\"?c=c.slice(0,-1)+l:t=he.ParamRegExpEnd:c+=l;break;case he.ParamRegExpEnd:d(),t=he.Static,l!=="*"&&l!=="?"&&l!=="+"&&s--,c="";break;default:n("Unknown state");break}}return t===he.ParamRegExp&&n(`Unfinished custom RegExp for param "${f}"`),d(),i(),a}const io="[^/]+?",qf={sensitive:!1,strict:!1,start:!0,end:!0};var _e=(function(e){return e[e._multiplier=10]="_multiplier",e[e.Root=90]="Root",e[e.Segment=40]="Segment",e[e.SubSegment=30]="SubSegment",e[e.Static=40]="Static",e[e.Dynamic=20]="Dynamic",e[e.BonusCustomRegExp=10]="BonusCustomRegExp",e[e.BonusWildcard=-50]="BonusWildcard",e[e.BonusRepeatable=-20]="BonusRepeatable",e[e.BonusOptional=-8]="BonusOptional",e[e.BonusStrict=.7000000000000001]="BonusStrict",e[e.BonusCaseSensitive=.25]="BonusCaseSensitive",e})(_e||{});const Yf=/[.+*?^${}()[\]/\\]/g;function Kf(e,n){const t=ee({},qf,n),r=[];let a=t.start?"^":"";const o=[];for(const f of e){const c=f.length?[]:[_e.Root];t.strict&&!f.length&&(a+="/");for(let d=0;d<f.length;d++){const m=f[d];let h=_e.Segment+(t.sensitive?_e.BonusCaseSensitive:0);if(m.type===Pn.Static)d||(a+="/"),a+=m.value.replace(Yf,"\\$&"),h+=_e.Static;else if(m.type===Pn.Param){const{value:C,repeatable:_,optional:k,regexp:O}=m;o.push({name:C,repeatable:_,optional:k});const E=O||io;if(E!==io){h+=_e.BonusCustomRegExp;try{`${E}`}catch(w){throw new Error(`Invalid custom RegExp for param "${C}" (${E}): `+w.message)}}let A=_?`((?:${E})(?:/(?:${E}))*)`:`(${E})`;d||(A=k&&f.length<2?`(?:/${A})`:"/"+A),k&&(A+="?"),a+=A,h+=_e.Dynamic,k&&(h+=_e.BonusOptional),_&&(h+=_e.BonusRepeatable),E===".*"&&(h+=_e.BonusWildcard)}c.push(h)}r.push(c)}if(t.strict&&t.end){const f=r.length-1;r[f][r[f].length-1]+=_e.BonusStrict}t.strict||(a+="/?"),t.end?a+="$":t.strict&&!a.endsWith("/")&&(a+="(?:/|$)");const i=new RegExp(a,t.sensitive?"":"i");function s(f){const c=f.match(i),d={};if(!c)return null;for(let m=1;m<c.length;m++){const h=c[m]||"",C=o[m-1];d[C.name]=h&&C.repeatable?h.split("/"):h}return d}function l(f){let c="",d=!1;for(const m of e){(!d||!c.endsWith("/"))&&(c+="/"),d=!1;for(const h of m)if(h.type===Pn.Static)c+=h.value;else if(h.type===Pn.Param){const{value:C,repeatable:_,optional:k}=h,O=C in f?f[C]:"";if(We(O)&&!_)throw new Error(`Provided param "${C}" is an array but it is not repeatable (* or + modifiers)`);const E=We(O)?O.join("/"):O;if(!E)if(k)m.length<2&&(c.endsWith("/")?c=c.slice(0,-1):d=!0);else throw new Error(`Missing required param "${C}"`);c+=E}}return c||"/"}return{re:i,score:r,keys:o,parse:s,stringify:l}}function Wf(e,n){let t=0;for(;t<e.length&&t<n.length;){const r=n[t]-e[t];if(r)return r;t++}return e.length<n.length?e.length===1&&e[0]===_e.Static+_e.Segment?-1:1:e.length>n.length?n.length===1&&n[0]===_e.Static+_e.Segment?1:-1:0}function $i(e,n){let t=0;const r=e.score,a=n.score;for(;t<r.length&&t<a.length;){const o=Wf(r[t],a[t]);if(o)return o;t++}if(Math.abs(a.length-r.length)===1){if(so(r))return 1;if(so(a))return-1}return a.length-r.length}function so(e){const n=e[e.length-1];return e.length>0&&n[n.length-1]<0}const Xf={strict:!1,end:!0,sensitive:!1};function jf(e,n,t){const r=Kf(Vf(e.path),t),a=ee(r,{record:e,parent:n,children:[],alias:[]});return n&&!a.record.aliasOf==!n.record.aliasOf&&n.children.push(a),a}function Qf(e,n){const t=[],r=new Map;n=Ja(Xf,n);function a(d){return r.get(d)}function o(d,m,h){const C=!h,_=co(d);_.aliasOf=h&&h.record;const k=Ja(n,d),O=[_];if("alias"in d){const w=typeof d.alias=="string"?[d.alias]:d.alias;for(const L of w)O.push(co(ee({},_,{components:h?h.record.components:_.components,path:L,aliasOf:h?h.record:_})))}let E,A;for(const w of O){const{path:L}=w;if(m&&L[0]!=="/"){const G=m.record.path,V=G[G.length-1]==="/"?"":"/";w.path=m.record.path+(L&&V+L)}if(E=jf(w,m,k),h?h.alias.push(E):(A=A||E,A!==E&&A.alias.push(E),C&&d.name&&!fo(E)&&i(d.name)),Ji(E)&&l(E),_.children){const G=_.children;for(let V=0;V<G.length;V++)o(G[V],E,h&&h.children[V])}h=h||E}return A?()=>{i(A)}:mt}function i(d){if(Xi(d)){const m=r.get(d);m&&(r.delete(d),t.splice(t.indexOf(m),1),m.children.forEach(i),m.alias.forEach(i))}else{const m=t.indexOf(d);m>-1&&(t.splice(m,1),d.record.name&&r.delete(d.record.name),d.children.forEach(i),d.alias.forEach(i))}}function s(){return t}function l(d){const m=Jf(d,t);t.splice(m,0,d),d.record.name&&!fo(d)&&r.set(d.record.name,d)}function f(d,m){let h,C={},_,k;if("name"in d&&d.name){if(h=r.get(d.name),!h)throw Qn(fe.MATCHER_NOT_FOUND,{location:d});k=h.record.name,C=ee(lo(m.params,h.keys.filter(A=>!A.optional).concat(h.parent?h.parent.keys.filter(A=>A.optional):[]).map(A=>A.name)),d.params&&lo(d.params,h.keys.map(A=>A.name))),_=h.stringify(C)}else if(d.path!=null)_=d.path,h=t.find(A=>A.re.test(_)),h&&(C=h.parse(_),k=h.record.name);else{if(h=m.name?r.get(m.name):t.find(A=>A.re.test(m.path)),!h)throw Qn(fe.MATCHER_NOT_FOUND,{location:d,currentLocation:m});k=h.record.name,C=ee({},m.params,d.params),_=h.stringify(C)}const O=[];let E=h;for(;E;)O.unshift(E.record),E=E.parent;return{name:k,path:_,params:C,matched:O,meta:$f(O)}}e.forEach(d=>o(d));function c(){t.length=0,r.clear()}return{addRoute:o,resolve:f,removeRoute:i,clearRoutes:c,getRoutes:s,getRecordMatcher:a}}function lo(e,n){const t={};for(const r of n)r in e&&(t[r]=e[r]);return t}function co(e){const n={path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:e.aliasOf,beforeEnter:e.beforeEnter,props:Zf(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}};return Object.defineProperty(n,"mods",{value:{}}),n}function Zf(e){const n={},t=e.props||!1;if("component"in e)n.default=t;else for(const r in e.components)n[r]=typeof t=="object"?t[r]:t;return n}function fo(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function $f(e){return e.reduce((n,t)=>ee(n,t.meta),{})}function Jf(e,n){let t=0,r=n.length;for(;t!==r;){const o=t+r>>1;$i(e,n[o])<0?r=o:t=o+1}const a=e0(e);return a&&(r=n.lastIndexOf(a,r-1)),r}function e0(e){let n=e;for(;n=n.parent;)if(Ji(n)&&$i(e,n)===0)return n}function Ji({record:e}){return!!(e.name||e.components&&Object.keys(e.components).length||e.redirect)}function po(e){const n=Be(nr),t=Be(sa),r=He(()=>{const l=Le(e.to);return n.resolve(l)}),a=He(()=>{const{matched:l}=r.value,{length:f}=l,c=l[f-1],d=t.matched;if(!c||!d.length)return-1;const m=d.findIndex(jn.bind(null,c));if(m>-1)return m;const h=uo(l[f-2]);return f>1&&uo(c)===h&&d[d.length-1].path!==h?d.findIndex(jn.bind(null,l[f-2])):m}),o=He(()=>a.value>-1&&o0(t.params,r.value.params)),i=He(()=>a.value>-1&&a.value===t.matched.length-1&&Wi(t.params,r.value.params));function s(l={}){if(a0(l)){const f=n[Le(e.replace)?"replace":"push"](Le(e.to)).catch(mt);return e.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>f),f}return Promise.resolve()}return{route:r,href:He(()=>r.value.href),isActive:o,isExactActive:i,navigate:s}}function n0(e){return e.length===1?e[0]:e}const t0=An({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:po,setup(e,{slots:n}){const t=jt(po(e)),{options:r}=Be(nr),a=He(()=>({[mo(e.activeClass,r.linkActiveClass,"router-link-active")]:t.isActive,[mo(e.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:t.isExactActive}));return()=>{const o=n.default&&n0(n.default(t));return e.custom?o:Pi("a",{"aria-current":t.isExactActive?e.ariaCurrentValue:null,href:t.href,onClick:t.navigate,class:a.value},o)}}}),r0=t0;function a0(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const n=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(n))return}return e.preventDefault&&e.preventDefault(),!0}}function o0(e,n){for(const t in n){const r=n[t],a=e[t];if(typeof r=="string"){if(r!==a)return!1}else if(!We(a)||a.length!==r.length||r.some((o,i)=>o.valueOf()!==a[i].valueOf()))return!1}return!0}function uo(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const mo=(e,n,t)=>e??n??t,i0=An({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:n,slots:t}){const r=Be(Mr),a=He(()=>e.route||r.value),o=Be(ao,0),i=He(()=>{let f=Le(o);const{matched:c}=a.value;let d;for(;(d=c[f])&&!d.components;)f++;return f}),s=He(()=>a.value.matched[i.value]);Nt(ao,He(()=>i.value+1)),Nt(Qi,s),Nt(Mr,a);const l=xe();return ct(()=>[l.value,s.value,e.name],([f,c,d],[m,h,C])=>{c&&(c.instances[d]=f,h&&h!==c&&f&&f===m&&(c.leaveGuards.size||(c.leaveGuards=h.leaveGuards),c.updateGuards.size||(c.updateGuards=h.updateGuards))),f&&c&&(!h||!jn(c,h)||!m)&&(c.enterCallbacks[d]||[]).forEach(_=>_(f))},{flush:"post"}),()=>{const f=a.value,c=e.name,d=s.value,m=d&&d.components[c];if(!m)return ho(t.default,{Component:m,route:f});const h=d.props[c],C=h?h===!0?f.params:typeof h=="function"?h(f):h:null,k=Pi(m,ee({},C,n,{onVnodeUnmounted:O=>{O.component.isUnmounted&&(d.instances[c]=null)},ref:l}));return ho(t.default,{Component:k,route:f})||k}}});function ho(e,n){if(!e)return null;const t=e(n);return t.length===1?t[0]:t}const s0=i0;function l0(e){const n=Qf(e.routes,e),t=e.parseQuery||Pf,r=e.stringifyQuery||ro,a=e.history,o=tt(),i=tt(),s=tt(),l=ks(bn);let f=bn;Gn&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const c=hr.bind(null,y=>""+y),d=hr.bind(null,hf),m=hr.bind(null,St);function h(y,M){let D,U;return Xi(y)?(D=n.getRecordMatcher(y),U=M):U=y,n.addRoute(U,D)}function C(y){const M=n.getRecordMatcher(y);M&&n.removeRoute(M)}function _(){return n.getRoutes().map(y=>y.record)}function k(y){return!!n.getRecordMatcher(y)}function O(y,M){if(M=ee({},M||l.value),typeof y=="string"){const v=vr(t,y,M.path),g=n.resolve({path:v.path},M),x=a.createHref(v.fullPath);return ee(v,g,{params:m(g.params),hash:St(v.hash),redirectedFrom:void 0,href:x})}let D;if(y.path!=null)D=ee({},y,{path:vr(t,y.path,M.path).path});else{const v=ee({},y.params);for(const g in v)v[g]==null&&delete v[g];D=ee({},y,{params:d(v)}),M.params=d(M.params)}const U=n.resolve(D,M),j=y.hash||"";U.params=c(m(U.params));const p=yf(r,ee({},y,{hash:pf(j),path:U.path})),u=a.createHref(p);return ee({fullPath:p,hash:j,query:r===ro?Lf(y.query):y.query||{}},U,{redirectedFrom:void 0,href:u})}function E(y){return typeof y=="string"?vr(t,y,l.value.path):ee({},y)}function A(y,M){if(f!==y)return Qn(fe.NAVIGATION_CANCELLED,{from:M,to:y})}function w(y){return V(y)}function L(y){return w(ee(E(y),{replace:!0}))}function G(y,M){const D=y.matched[y.matched.length-1];if(D&&D.redirect){const{redirect:U}=D;let j=typeof U=="function"?U(y,M):U;return typeof j=="string"&&(j=j.includes("?")||j.includes("#")?j=E(j):{path:j},j.params={}),ee({query:y.query,hash:y.hash,params:j.path!=null?{}:y.params},j)}}function V(y,M){const D=f=O(y),U=l.value,j=y.state,p=y.force,u=y.replace===!0,v=G(D,U);if(v)return V(ee(E(v),{state:typeof v=="object"?ee({},j,v.state):j,force:p,replace:u}),M||D);const g=D;g.redirectedFrom=M;let x;return!p&&bf(r,U,D)&&(x=Qn(fe.NAVIGATION_DUPLICATED,{to:g,from:U}),de(U,U,!0,!1)),(x?Promise.resolve(x):W(g,U)).catch(b=>cn(b)?cn(b,fe.NAVIGATION_GUARD_REDIRECT)?b:Xe(b):K(b,g,U)).then(b=>{if(b){if(cn(b,fe.NAVIGATION_GUARD_REDIRECT))return V(ee({replace:u},E(b.to),{state:typeof b.to=="object"?ee({},j,b.to.state):j,force:p}),M||g)}else b=I(g,U,!0,u,j);return $(g,U,b),b})}function ae(y,M){const D=A(y,M);return D?Promise.reject(D):Promise.resolve()}function H(y){const M=sn.values().next().value;return M&&typeof M.runWithContext=="function"?M.runWithContext(y):y()}function W(y,M){let D;const[U,j,p]=Mf(y,M);D=yr(U.reverse(),"beforeRouteLeave",y,M);for(const v of U)v.leaveGuards.forEach(g=>{D.push(_n(g,y,M))});const u=ae.bind(null,y,M);return D.push(u),Ee(D).then(()=>{D=[];for(const v of o.list())D.push(_n(v,y,M));return D.push(u),Ee(D)}).then(()=>{D=yr(j,"beforeRouteUpdate",y,M);for(const v of j)v.updateGuards.forEach(g=>{D.push(_n(g,y,M))});return D.push(u),Ee(D)}).then(()=>{D=[];for(const v of p)if(v.beforeEnter)if(We(v.beforeEnter))for(const g of v.beforeEnter)D.push(_n(g,y,M));else D.push(_n(v.beforeEnter,y,M));return D.push(u),Ee(D)}).then(()=>(y.matched.forEach(v=>v.enterCallbacks={}),D=yr(p,"beforeRouteEnter",y,M,H),D.push(u),Ee(D))).then(()=>{D=[];for(const v of i.list())D.push(_n(v,y,M));return D.push(u),Ee(D)}).catch(v=>cn(v,fe.NAVIGATION_CANCELLED)?v:Promise.reject(v))}function $(y,M,D){s.list().forEach(U=>H(()=>U(y,M,D)))}function I(y,M,D,U,j){const p=A(y,M);if(p)return p;const u=M===bn,v=Gn?history.state:{};D&&(U||u?a.replace(y.fullPath,ee({scroll:u&&v&&v.scroll},j)):a.push(y.fullPath,j)),l.value=y,de(y,M,D,u),Xe()}let X;function le(){X||(X=a.listen((y,M,D)=>{if(!je.listening)return;const U=O(y),j=G(U,je.currentRoute.value);if(j){V(ee(j,{replace:!0,force:!0}),U).catch(mt);return}f=U;const p=l.value;Gn&&Af(to(p.fullPath,D.delta),er()),W(U,p).catch(u=>cn(u,fe.NAVIGATION_ABORTED|fe.NAVIGATION_CANCELLED)?u:cn(u,fe.NAVIGATION_GUARD_REDIRECT)?(V(ee(E(u.to),{force:!0}),U).then(v=>{cn(v,fe.NAVIGATION_ABORTED|fe.NAVIGATION_DUPLICATED)&&!D.delta&&D.type===Lr.pop&&a.go(-1,!1)}).catch(mt),Promise.reject()):(D.delta&&a.go(-D.delta,!1),K(u,U,p))).then(u=>{u=u||I(U,p,!1),u&&(D.delta&&!cn(u,fe.NAVIGATION_CANCELLED)?a.go(-D.delta,!1):D.type===Lr.pop&&cn(u,fe.NAVIGATION_ABORTED|fe.NAVIGATION_DUPLICATED)&&a.go(-1,!1)),$(U,p,u)}).catch(mt)}))}let ve=tt(),ce=tt(),J;function K(y,M,D){Xe(y);const U=ce.list();return U.length?U.forEach(j=>j(y,M,D)):console.error(y),Promise.reject(y)}function Ge(){return J&&l.value!==bn?Promise.resolve():new Promise((y,M)=>{ve.add([y,M])})}function Xe(y){return J||(J=!y,le(),ve.list().forEach(([M,D])=>y?D(y):M()),ve.reset()),y}function de(y,M,D,U){const{scrollBehavior:j}=e;if(!Gn||!j)return Promise.resolve();const p=!D&&Rf(to(y.fullPath,0))||(U||!D)&&history.state&&history.state.scroll||null;return Wo().then(()=>j(y,M,p)).then(u=>u&&Tf(u)).catch(u=>K(u,y,M))}const ge=y=>a.go(y);let on;const sn=new Set,je={currentRoute:l,listening:!0,addRoute:h,removeRoute:C,clearRoutes:n.clearRoutes,hasRoute:k,getRoutes:_,resolve:O,options:e,push:w,replace:L,go:ge,back:()=>ge(-1),forward:()=>ge(1),beforeEach:o.add,beforeResolve:i.add,afterEach:s.add,onError:ce.add,isReady:Ge,install(y){y.component("RouterLink",r0),y.component("RouterView",s0),y.config.globalProperties.$router=je,Object.defineProperty(y.config.globalProperties,"$route",{enumerable:!0,get:()=>Le(l)}),Gn&&!on&&l.value===bn&&(on=!0,w(a.location).catch(U=>{}));const M={};for(const U in bn)Object.defineProperty(M,U,{get:()=>l.value[U],enumerable:!0});y.provide(nr,je),y.provide(sa,Vo(M)),y.provide(Mr,l);const D=y.unmount;sn.add(y),y.unmount=function(){sn.delete(y),sn.size<1&&(f=bn,X&&X(),X=null,l.value=bn,on=!1,J=!1),D()}}};function Ee(y){return y.reduce((M,D)=>M.then(()=>H(D)),Promise.resolve())}return je}function c0(){return Be(nr)}function wd(e){return Be(sa)}const f0="/assets/screenshot-BGlXLzxn.webp",d0="/assets/screenshot-BU-MfndP.webp",p0="/assets/screenshot-D6dFT7RF.webp",u0="/assets/screenshot-BbBk66JL.webp",m0="/assets/screenshot-DJ8DWsNe.webp",h0="/assets/screenshot-zFcJ0H7U.webp",v0="/assets/screenshot-Bgnvpmle.webp",g0="/assets/screenshot-DI4mxV0q.webp",y0="/assets/screenshot-Cr4gcPub.webp",b0="/assets/screenshot-Bftu4Vm4.webp",x0="/assets/screenshot-D69-qLJd.webp",S0="/assets/screenshot-RF0P22ZC.webp",E0="/assets/screenshot-uj0WCOUe.webp",w0="/assets/screenshot-CbvnZ5gw.webp",_0="/assets/screenshot-D2kvp1Pc.webp",C0="/assets/screenshot-FespJOdi.webp",T0="/assets/screenshot-BYNpPvRq.webp",A0="/assets/screenshot-TbFZaVjZ.webp",R0="/assets/screenshot-eXevvs9S.webp",I0="/assets/screenshot-BXUdMyeo.webp",N0="/assets/screenshot-CLKNMPWT.webp",D0="/assets/screenshot-Dge5FRDF.webp",P0="/assets/screenshot-BT7IpjX0.webp",L0="/assets/screenshot-o465L8pw.webp",O0="/assets/screenshot-BeLUHnME.webp",M0="/assets/screenshot-dnSW_Jt8.webp",k0="/assets/screenshot-Zy4Ap0si.webp",H0="/assets/screenshot-GJoazymJ.webp",U0="/assets/screenshot-Dj7Yx2aa.webp",B0="/assets/screenshot-BsPF7eOW.webp",F0="/assets/screenshot-UCJWYxEG.webp",z0="/assets/screenshot-COHhF7ff.webp",es=[{slug:"arrakis",title:"24h in Arrakis",description:"A full day/night cycle of pure raymarched desert poetry.",date:"2026-02-12",tags:["raymarching","3d","noise"],links:{},screenshotUrl:f0,passes:{image:`/**
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
// Hash (hashN2) and value noise (valueNoise2D) provided by noise-value commons.

float fbm(vec2 p, int octaves) {
    float v = 0.0, a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        v += a * valueNoise2D(p);
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
    float region = valueNoise2D(p * 0.025 + time * 0.002);
    float duneMask = smoothstep(0.30, 0.55, region);

    // 2. flat basin floor
    float basin = valueNoise2D(p * 0.04) * 0.3 - 0.5;

    // 3. primary mega-dunes
    float megaDune = duneRidge(p.x * 0.12 + p.y * 0.28 + time * 0.008) * 3.5
                   + duneRidge(p.x * 0.22 - p.y * 0.10 + time * 0.005) * 1.8;
    // height variation — single noise lookup instead of fbm
    megaDune *= 0.5 + valueNoise2D(p * 0.05 + vec2(3.7, 8.1));

    // 4. medium dunes
    float medDune = duneRidge(p.x * 0.5 + p.y * 1.5 + time * 0.015) * 0.6
                  + duneRidge(p.x * 0.8 - p.y * 0.4 + time * 0.012) * 0.35;

    // 5. wind ripples — single layer
    float ripple = valueNoise2D(p * vec2(8.0, 3.0) + vec2(time * 0.1, 0.0)) * 0.09;

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
    float distort = valueNoise2D(uv * vec2(3.0, 20.0) + vec2(0.0, time * 0.8)) * 2.0 - 1.0;
    distort += valueNoise2D(uv * vec2(5.0, 35.0) + vec2(time * 0.3, time * 1.2)) * 0.5;
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
            float sh = hashN2(starId + i * 137.0);
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
        float grain1 = valueNoise2D(p.xz * grainScale);
        float grain2 = valueNoise2D(p.xz * grainScale + 77.7);

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
        float sandVar = valueNoise2D(p.xz * 0.8) * 0.7 + grain1 * 0.3;
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
    float dustBreak = valueNoise2D(uv * 1.5 + time * 0.03); // large-scale breakup
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
        float stormDetail = valueNoise2D(uv * 25.0 + time * 1.5);

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
            float mh = hashN2(moteId + i * 77.0);
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
        float h = hashN2(sparkId + i * 100.0);
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
    col += (hashN2(fragCoord + fract(time * 17.0)) - 0.5) * 0.025;

    // tone mapping
    col = col / (col + 0.5);
    // gamma
    col = pow(max(col, 0.0), vec3(0.45));

    col = clamp(col, 0.0, 1.0);
    fragColor = vec4(col, 1.0);
}
`},channels:{},commonsSources:[{name:"noise-value",source:`/**
 * Value Noise (sin-hash family)
 * @author guinetik
 * @date 2026-02-15
 *
 * Hash-based value noise using the fract(sin(x)*43758) family.
 * Fast and simple, produces smooth non-directional noise suitable for terrain.
 * C1 continuous via Hermite smoothstep interpolation (3t^2 - 2t^3).
 *
 * Noise: Chosen for speed on desktop GPUs. For mobile or precision-sensitive
 * use cases, prefer noise-pcg.glsl which avoids sin-based hashing.
 */

// === HASH FUNCTIONS ===

/**
 * 1D hash — maps a float to a pseudo-random float in [0, 1).
 */
float hashN(float n) {
    return fract(sin(n) * 43758.5453123);
}

/**
 * 2D hash — maps a vec2 to a pseudo-random float in [0, 1).
 */
float hashN2(vec2 p) {
    float h = dot(p, vec2(127.1, 311.7));
    return fract(sin(h) * 43758.5453123);
}

// === VALUE NOISE ===

/**
 * 2D value noise with Hermite interpolation.
 *
 * @param p  2D position to sample
 * @return Noise value in [0, 1)
 */
float valueNoise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hashN2(i + vec2(0.0, 0.0)), hashN2(i + vec2(1.0, 0.0)), u.x),
               mix(hashN2(i + vec2(0.0, 1.0)), hashN2(i + vec2(1.0, 1.0)), u.x), u.y);
}

/**
 * 3D value noise with Hermite interpolation.
 *
 * Uses dot-product lattice hashing with step (1, 157, 113) for
 * decorrelated cell values.
 *
 * @param pos  3D position to sample
 * @return Noise value in [0, 1)
 */
float valueNoise3D(vec3 pos) {
    vec3 i = floor(pos);
    vec3 f = fract(pos);
    vec3 u = f * f * (3.0 - 2.0 * f);

    float n = dot(i, vec3(1.0, 157.0, 113.0));
    return mix(mix(mix(hashN(n + 0.0),   hashN(n + 1.0), u.x),
                   mix(hashN(n + 157.0), hashN(n + 158.0), u.x), u.y),
               mix(mix(hashN(n + 113.0), hashN(n + 114.0), u.x),
                   mix(hashN(n + 270.0), hashN(n + 271.0), u.x), u.y), u.z);
}

// === FBM ===

/**
 * Fractional Brownian Motion using 3D value noise.
 *
 * Sums multiple octaves of valueNoise3D with decreasing amplitude.
 * Domain is offset and rotated between octaves to decorrelate layers.
 *
 * @param pos        3D sample position
 * @param octaves    Number of noise octaves (1–8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0–3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4–0.5)
 * @return Normalized FBM value in approximately [0, 1)
 */
float fbmValue(vec3 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * valueNoise3D(pos);
        total += scale;
        pos += vec3(0.23, 0.77, 0.57);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}

/**
 * Fractional Brownian Motion using 2D value noise.
 *
 * Sums multiple octaves of valueNoise2D with decreasing amplitude.
 * Domain is offset between octaves to decorrelate layers.
 *
 * @param pos        2D sample position
 * @param octaves    Number of noise octaves (1-8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0-3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4-0.5)
 * @return Normalized FBM value in approximately [0, 1)
 */
float fbmValue2D(vec2 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * valueNoise2D(pos);
        total += scale;
        pos += vec2(0.23, 0.77);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}
`}]},{slug:"black-hole",title:"Black Hole",description:"Raytraced black hole with Newtonian gravitational lensing, a procedural accretion disk, and a starfield background that visibly bends around the event horizon. Based on Genuary 2026 Day 31.",date:"2026-01-31",tags:["genuary","space","3d","physics"],links:{},screenshotUrl:d0,passes:{image:`/**
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
`},channels:{},commonsSources:[]},{slug:"caustics-crystal",title:"Caustic Study #03: Crystal",description:"Ray-marched faceted crystal with prismatic caustics from chromatic dispersion. Light refracts through the gemstone's facets, projecting rainbow patterns on the ground plane below.",date:"2026-02-18",tags:["caustics","raymarching","3d","physics","refraction"],links:{},screenshotUrl:p0,passes:{image:`/**
 * Caustic Study #03: Crystal
 * @author guinetik
 * @date 2026-02-18
 *
 * Ray-marched faceted crystal (octahedron-based diamond SDF) hovering above
 * a dark ground plane. Light refracts through the gemstone's facets with
 * chromatic dispersion (separate UV offset per R/G/B channel), projecting
 * prismatic rainbow caustics on the ground.
 *
 * TECHNIQUE: Modified octahedron SDF
 * The octahedron's L1-norm distance gives natural faceted edges.
 * Y-stretch elongates into a diamond profile; max() with a plane
 * clips a flat table facet on top, mimicking a brilliant cut.
 *
 * TECHNIQUE: Prismatic caustics via chromatic causticWarp
 * Instead of expensive per-pixel ray tracing, we sample the causticWarp()
 * pattern at three chromatically offset UV positions (one per R/G/B channel).
 * The UV offsets rotate with the crystal, creating shifting rainbow patterns.
 * Brightness is modulated by the crystal's projected shadow footprint.
 *
 * TECHNIQUE: Refract-through via analytical ground intersection
 * Instead of unreliable interior SDF marching, refract the view ray
 * at the crystal entry surface and intersect the ground plane
 * analytically. This always works regardless of view angle or
 * crystal shape complexity.
 */

// === CRYSTAL GEOMETRY ===
#define CRYSTAL_POS     vec3(0.0, 0.5, 0.0)   // Hover center — raise to widen caustic spread on ground
#define CRYSTAL_SIZE    0.5                     // Octahedron half-extent — controls gem width
#define CRYSTAL_STRETCH 1.6                     // Y-axis stretch — >1 = taller diamond, <1 = pancake
#define TABLE_CUT       0.28                    // Y-height for flat table facet — lower = larger flat top
#define ROTATE_SPEED    0.25                    // Auto-rotation rad/s around Y — 0 disables

// === RAY MARCHING ===
#define MAX_STEPS       100                     // March iterations — 100 sufficient for simple scene
#define SURF_EPSILON    0.0005                  // Surface hit threshold — tight for sharp facet edges
#define MAX_DIST        30.0                    // Maximum ray travel distance
#define NORMAL_EPS      0.0005                  // Central-difference offset for normals
#define STEP_BIAS       0.01                    // Offset to step past surface when entering/exiting crystal

// === GROUND PLANE ===
#define GROUND_Y       -0.6                     // Ground plane Y — distance below crystal affects caustic scale
#define GROUND_COL     vec3(0.12, 0.11, 0.13)   // Medium-dark stone — visible but doesn't compete with caustics
#define GROUND_SPEC    24.0                     // Specular exponent for ground highlights
#define GROUND_SPEC_COL vec3(0.12)              // Specular highlight color

// === LIGHTING ===
#define LIGHT_DIR       normalize(vec3(0.5, 1.0, 0.3))  // Directional light from above-right
#define LIGHT_COL       vec3(1.0, 0.97, 0.92)            // Warm white light color
#define AMBIENT         0.2                               // Ambient illumination — enough to see the ground

// === CRYSTAL MATERIAL ===
#define IOR_BASE        1.54                    // Index of refraction — quartz = 1.54
#define FRESNEL_POWER   5.0                     // Schlick exponent — higher = more edge reflection
#define FRESNEL_MIN     0.04                    // Reflectance at normal incidence (clear quartz is low)
#define FRESNEL_MAX     0.85                    // Reflectance at grazing angle
#define ABSORB_TINT     vec3(0.98, 0.98, 1.0)  // Near-white — clear quartz, very slight cool tint
#define ABSORB_DENSITY  0.1                     // Very low absorption — nearly transparent
#define SPEC_POWER      80.0                    // Specular exponent — high = tiny bright highlights
#define SPEC_BRIGHT     2.5                     // Specular intensity multiplier

// === PRISMATIC CAUSTICS ===
#define CAUSTIC_FOOTPRINT 0.8                   // Radius of caustic pattern — tight focus under crystal
#define CAUSTIC_BRIGHT  1.5                     // Caustic brightness — visible against brighter ground
#define CAUSTIC_SCALE_A 1.8                     // UV scale for primary caustic layer — lower = larger pattern
#define CAUSTIC_SCALE_B 1.2                     // UV scale for secondary caustic layer (parallax)
#define CAUSTIC_SPEED   0.4                     // Time multiplier for caustic animation
#define CAUSTIC_OFFSET  23.0                    // Time offset — decorrelates from t=0 boring state
#define CAUSTIC_ITERS   5                       // Warp iterations — 5 = crisp convergence lines
#define CAUSTIC_INTEN   0.005                   // Inverse-distance sensitivity
#define CAUSTIC_BASE    1.17                    // Brightness curve offset
#define CAUSTIC_POWER   1.4                     // Brightness curve exponent
#define CAUSTIC_SHARP   8.0                     // Final power — higher = thinner brighter lines
#define CHROMA_SPREAD   0.25                    // Chromatic UV offset between R/G/B — higher = wider rainbow
#define CAUSTIC_MIX_B   0.35                    // Blend weight of secondary caustic layer

// === AMBIENT SHIMMER ===
#define SHIMMER_SCALE   1.0                     // UV scale for background shimmer
#define SHIMMER_SPEED   0.25                    // Shimmer animation speed
#define SHIMMER_OFFSET  11.0                    // Decorrelation offset from main caustics
#define SHIMMER_STR     0.02                    // Very subtle background life — too high = noisy ground

// === CAMERA ===
#define CAM_DIST        3.0                     // Orbital distance — closer for more detail
#define CAM_HEIGHT      1.9                     // Base camera height
#define CAM_TARGET      vec3(0.0, 0.1, 0.0)    // Look slightly above ground center
#define CAM_FOV         1.8                     // Focal length inverse — lower = more telephoto

// === BACKGROUND ===
#define SKY_COL         vec3(0.05, 0.05, 0.08)  // Dark blue-gray sky — visible but moody
#define INV_SQRT3       0.57735027               // 1/sqrt(3) — octahedron normalization

// -------------------------------------------------------
// Crystal SDF — octahedron stretched into diamond
// -------------------------------------------------------
float sdOctahedron(vec3 p, float s)
{
    p = abs(p);
    return (p.x + p.y + p.z - s) * INV_SQRT3;
}

float sdCrystal(vec3 p)
{
    vec3 q = p;
    q.y /= CRYSTAL_STRETCH;
    float d = sdOctahedron(q, CRYSTAL_SIZE);
    // Flat table facet on top
    d = max(d, p.y - TABLE_CUT);
    return d;
}

// -------------------------------------------------------
// Rotation
// -------------------------------------------------------
mat3 rotateY(float a)
{
    float c = cos(a);
    float s = sin(a);
    return mat3(c, 0.0, s,  0.0, 1.0, 0.0,  -s, 0.0, c);
}

// -------------------------------------------------------
// Crystal in world space (used by both full scene and crystal-only maps)
// -------------------------------------------------------
float crystalWorld(vec3 p, float rotAngle)
{
    vec3 cp = p - CRYSTAL_POS;
    cp = rotateY(-rotAngle) * cp;
    return sdCrystal(cp);
}

// -------------------------------------------------------
// Full scene map — crystal + ground
// -------------------------------------------------------
float map(vec3 p, float rotAngle)
{
    float dGround = p.y - GROUND_Y;
    float dCrystal = crystalWorld(p, rotAngle);
    return min(dGround, dCrystal);
}

// Scene map with material ID (0=ground, 1=crystal)
float mapID(vec3 p, float rotAngle, out int matID)
{
    float dGround = p.y - GROUND_Y;
    float dCrystal = crystalWorld(p, rotAngle);
    if (dCrystal < dGround) { matID = 1; return dCrystal; }
    else                    { matID = 0; return dGround; }
}

// -------------------------------------------------------
// Normals
// -------------------------------------------------------
vec3 calcNormal(vec3 p, float rotAngle)
{
    vec2 e = vec2(NORMAL_EPS, 0.0);
    return normalize(vec3(
        map(p + e.xyy, rotAngle) - map(p - e.xyy, rotAngle),
        map(p + e.yxy, rotAngle) - map(p - e.yxy, rotAngle),
        map(p + e.yyx, rotAngle) - map(p - e.yyx, rotAngle)
    ));
}

// -------------------------------------------------------
// Ray march — full scene
// -------------------------------------------------------
float march(vec3 ro, vec3 rd, float rotAngle)
{
    float t = 0.0;
    for (int i = 0; i < MAX_STEPS; i++)
    {
        float d = map(ro + rd * t, rotAngle);
        if (d < SURF_EPSILON) return t;
        if (t > MAX_DIST) break;
        t += d;
    }
    return -1.0;
}

// -------------------------------------------------------
// Fresnel (Schlick)
// -------------------------------------------------------
float fresnelSchlick(vec3 rd, vec3 n)
{
    float cosTheta = abs(dot(rd, n));
    float f = pow(max(1.0 - cosTheta, 0.0), FRESNEL_POWER);
    return mix(FRESNEL_MIN, FRESNEL_MAX, f);
}

// -------------------------------------------------------
// Single caustic layer with chromatic offsets
//
// TECHNIQUE: Chromatic causticWarp sampling
// Sample causticWarp at 3 UV positions offset in the direction
// determined by crystal rotation. The UV shift per channel
// simulates how different wavelengths refract at different
// angles through the crystal, creating rainbow separation.
// -------------------------------------------------------
float causticLayer(vec2 uv, float scale, float t)
{
    float time = t * CAUSTIC_SPEED + CAUSTIC_OFFSET;
    float c = causticWarp(uv, scale, time, CAUSTIC_ITERS, CAUSTIC_INTEN);
    c = CAUSTIC_BASE - pow(max(c, 0.0), CAUSTIC_POWER);
    return pow(abs(c), CAUSTIC_SHARP);
}

vec3 prismaticCaustic(vec3 groundPos, float rotAngle, float t)
{
    // Project crystal position onto ground — caustic center
    vec2 center = CRYSTAL_POS.xz;
    vec2 gxz = groundPos.xz;

    // Soft circular footprint — fades at edges
    float dist = length(gxz - center);
    float footprint = 1.0 - smoothstep(0.0, CAUSTIC_FOOTPRINT, dist);
    if (footprint < 0.01) return vec3(0.0);

    // Chromatic UV offset direction rotates with crystal
    vec2 chromaDir = vec2(cos(rotAngle), sin(rotAngle));
    vec2 baseUV = gxz;

    // Sample caustic pattern at chromatically offset UVs
    // Red refracts least, blue refracts most
    vec2 uvR = baseUV - chromaDir * CHROMA_SPREAD;
    vec2 uvG = baseUV;
    vec2 uvB = baseUV + chromaDir * CHROMA_SPREAD;

    // Primary layer
    float cR = causticLayer(uvR, CAUSTIC_SCALE_A, t);
    float cG = causticLayer(uvG, CAUSTIC_SCALE_A, t);
    float cB = causticLayer(uvB, CAUSTIC_SCALE_A, t);

    // Secondary layer at different scale for depth
    float cR2 = causticLayer(uvR, CAUSTIC_SCALE_B, t + 5.0);
    float cG2 = causticLayer(uvG, CAUSTIC_SCALE_B, t + 5.0);
    float cB2 = causticLayer(uvB, CAUSTIC_SCALE_B, t + 5.0);

    vec3 c1 = vec3(cR, cG, cB);
    vec3 c2 = vec3(cR2, cG2, cB2);
    vec3 caustic = c1 + c2 * CAUSTIC_MIX_B;

    // Brighten toward center, fade at edges
    float centerBright = smoothstep(CAUSTIC_FOOTPRINT, 0.0, dist * 0.8);

    return caustic * footprint * centerBright * CAUSTIC_BRIGHT;
}

// -------------------------------------------------------
// Ambient shimmer — very subtle background caustic wash
// -------------------------------------------------------
float ambientShimmer(vec2 uv, float t)
{
    float time = t * SHIMMER_SPEED + SHIMMER_OFFSET;
    float c = causticWarp(uv, SHIMMER_SCALE, time, 3, CAUSTIC_INTEN);
    c = CAUSTIC_BASE - pow(max(c, 0.0), CAUSTIC_POWER);
    return pow(abs(c), CAUSTIC_SHARP) * SHIMMER_STR;
}

// -------------------------------------------------------
// Soft shadow — approximate crystal shadow on ground
// March from ground point toward light, check if crystal blocks
// -------------------------------------------------------
float softShadow(vec3 p, float rotAngle)
{
    vec3 rd = LIGHT_DIR;
    float shade = 1.0;
    float t = STEP_BIAS;
    for (int i = 0; i < 32; i++)
    {
        float d = crystalWorld(p + rd * t, rotAngle);
        if (d < SURF_EPSILON) return 0.15;
        shade = min(shade, 8.0 * d / t);
        t += clamp(d, 0.01, 0.2);
        if (t > 3.0) break;
    }
    return clamp(shade, 0.15, 1.0);
}

// -------------------------------------------------------
// Main
// -------------------------------------------------------
void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    float t = iTime;

    // Orbit camera from buffer-a state
    OrbitCameraRay cam = orbitCameraRay(
        iChannel0, fragCoord, iResolution.xy,
        CAM_DIST, CAM_HEIGHT, CAM_TARGET, CAM_FOV
    );
    vec3 ro = cam.ro;
    vec3 rd = cam.rd;

    float rotAngle = t * ROTATE_SPEED;

    vec3 col = SKY_COL;

    float hitT = march(ro, rd, rotAngle);

    if (hitT > 0.0)
    {
        vec3 hitPos = ro + rd * hitT;
        int matID;
        mapID(hitPos, rotAngle, matID);
        vec3 n = calcNormal(hitPos, rotAngle);

        if (matID == 1)
        {
            // === CRYSTAL (clear quartz) ===
            // TECHNIQUE: Refract-through via analytical ground intersection
            // Instead of unreliable interior SDF marching, refract the view
            // ray at entry and intersect the ground plane analytically.
            // This always works regardless of crystal shape or view angle.

            float fres = fresnelSchlick(rd, n);

            // --- Reflection ---
            vec3 reflDir = reflect(rd, n);
            vec3 reflCol = SKY_COL + LIGHT_COL * max(reflDir.y, 0.0) * 0.2;

            // Specular highlight — bright point light on facets
            vec3 halfVec = normalize(LIGHT_DIR - rd);
            float spec = pow(max(dot(n, halfVec), 0.0), SPEC_POWER);
            reflCol += LIGHT_COL * spec * SPEC_BRIGHT;

            // --- Refraction (see-through) ---
            // TECHNIQUE: Project-down with refraction offset
            // Project the crystal hit point straight down to the ground plane,
            // then offset by the refraction displacement. This always works
            // regardless of camera angle — top, front, side, any pitch.
            vec3 refrDir = refract(rd, n, 1.0 / IOR_BASE);
            if (length(refrDir) < 0.001) refrDir = rd; // TIR fallback

            // Project hit point down to ground, offset by refraction
            vec2 groundUV = hitPos.xz + (refrDir.xz - rd.xz) * (hitPos.y - GROUND_Y);
            vec3 groundHit = vec3(groundUV.x, GROUND_Y, groundUV.y);

            float diff = max(dot(vec3(0.0, 1.0, 0.0), LIGHT_DIR), 0.0);
            vec3 refrCol = GROUND_COL * (AMBIENT + diff * 0.5);
            refrCol += prismaticCaustic(groundHit, rotAngle, t);
            refrCol += ambientShimmer(groundHit.xz, t) * 0.3;

            // Subtle tint based on view angle (thicker path = more tint)
            float NdotV = abs(dot(n, -rd));
            vec3 absorption = mix(ABSORB_TINT, vec3(1.0), NdotV);
            refrCol *= absorption;

            col = mix(refrCol, reflCol, fres);

            // Rim light — subtle white edge glow on silhouette
            float rim = 1.0 - NdotV;
            col += LIGHT_COL * pow(max(rim, 0.0), 3.0) * 0.1;

            // Facet edge highlight — makes edges sparkle
            float edgeCatch = pow(max(dot(n, LIGHT_DIR), 0.0), 2.0);
            col += LIGHT_COL * edgeCatch * 0.15;
        }
        else
        {
            // === GROUND ===
            float diff = max(dot(n, LIGHT_DIR), 0.0);
            float shadow = softShadow(hitPos, rotAngle);
            col = GROUND_COL * (AMBIENT + diff * 0.4 * shadow);

            // Specular
            vec3 halfVec = normalize(LIGHT_DIR - rd);
            float spec = pow(max(dot(n, halfVec), 0.0), GROUND_SPEC);
            col += GROUND_SPEC_COL * spec * shadow;

            // Prismatic caustics
            col += prismaticCaustic(hitPos, rotAngle, t);

            // Very subtle ambient shimmer
            col += ambientShimmer(hitPos.xz, t) * 0.5;
        }
    }

    // Gamma correction
    col = pow(max(col, 0.0), vec3(0.45));

    fragColor = vec4(col, 1.0);
}
`,bufferA:`/**
 * Caustic Study #03: Crystal — Buffer A: Camera state
 *
 * @author guinetik
 * @date 2026-02-18
 *
 * Orbit camera with mouse-drag inertia, powered by camera commons.
 * Crystal view: wider pitch range for looking down at the gem from above.
 *
 * === STATE LAYOUT (buffer-a → iChannel0) ===
 * Pixel (0, 0): yaw (x), pitch (y), yawVel (z), pitchVel (w)
 * Pixel (1, 0): prevMouseX (x), prevMouseY (y), unused (zw)
 */

// -- Pitch limits (radians) --
// Slightly elevated default view to look down at the crystal
#define PITCH_MIN -0.5    // Max downward tilt — allows steep overhead view
#define PITCH_MAX  0.3    // Max upward tilt — sees crystal from below

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    OrbitCameraConfig cfg = orbitCameraDefaultConfig();
    cfg.pitchMin = PITCH_MIN;
    cfg.pitchMax = PITCH_MAX;
    orbitCameraUpdate(fragColor, fragCoord, iChannel0, cfg, iFrame, iMouse, iResolution);
}
`},channels:{image:{iChannel0:"buffer-a"},bufferA:{iChannel0:"buffer-a"}},commonsSources:[{name:"camera",source:`/**
 * Orbit Camera Commons
 * @author guinetik
 * @date 2026-02-20
 *
 * Reusable orbit camera with mouse-drag inertia, friction decay, and idle
 * auto-rotation. Split into two parts:
 *
 * 1. **Buffer-A side** — \`orbitCameraUpdate()\` runs the state machine:
 *    drag detection, velocity blending, friction, idle orbit blend.
 *    Stores yaw/pitch/velocities in pixel (0,0), prev mouse in pixel (1,0).
 *
 * 2. **Image side** — \`orbitCameraRay()\` reads buffer state and computes
 *    a spherical orbit camera with \`cameraLookAt()\` view matrix.
 *
 * === STATE LAYOUT (buffer-a → iChannel0) ===
 * Pixel (0, 0): yaw (x), pitch (y), yawVel (z), pitchVel (w)
 * Pixel (1, 0): prevMouseX (x), prevMouseY (y), unused (zw)
 *
 * TECHNIQUE: Drag detection via mouse-delta dead zone
 * Instead of relying on iMouse.z (which stays positive after first click
 * in some renderers), we compare current vs previous mouse position.
 * If the squared delta exceeds DRAG_DEAD_ZONE², we're dragging.
 *
 * TECHNIQUE: Inertia with idle orbit blend
 * On release, velocity decays by FRICTION per frame. When yaw velocity
 * drops below IDLE_THRESHOLD, it blends toward IDLE_ORBIT_SPEED so the
 * camera never fully stops. Pitch always decays to zero (no idle tilt).
 */

// Guard TAU define to avoid conflicts with shader-local constants
#ifndef _CAM_TAU
#define _CAM_TAU 6.28318530718
#endif

// -------------------------------------------------------
// Configuration struct — all tunable camera parameters
// -------------------------------------------------------

/**
 * Orbit camera tuning parameters. Create via orbitCameraDefaultConfig()
 * and override individual fields as needed.
 *
 * friction       — velocity multiplier per frame when not dragging (0.99 = slow decay, 0.9 = fast)
 * dragSensitivity — horizontal drag-to-velocity scale
 * pitchSensitivity — vertical drag-to-velocity scale (typically < dragSensitivity)
 * velocitySmooth  — blend factor for new drag velocity (0 = ignore drag, 1 = instant)
 * idleOrbitSpeed  — yaw velocity target when coasting below threshold (rad/frame)
 * idleThreshold   — velocity magnitude below which idle blend kicks in
 * idleBlend       — blend rate toward idle orbit speed (0 = never, 1 = instant)
 * dragDeadZone    — minimum mouse delta to register as drag (normalized coords)
 * pitchMin        — minimum pitch angle in radians (negative = look down)
 * pitchMax        — maximum pitch angle in radians (positive = look up)
 */
struct OrbitCameraConfig {
    float friction;
    float dragSensitivity;
    float pitchSensitivity;
    float velocitySmooth;
    float idleOrbitSpeed;
    float idleThreshold;
    float idleBlend;
    float dragDeadZone;
    float pitchMin;
    float pitchMax;
};

/**
 * Sensible defaults matching the caustics-pool camera behavior.
 * Override pitchMin/pitchMax per shader for different viewing angles.
 */
OrbitCameraConfig orbitCameraDefaultConfig() {
    OrbitCameraConfig cfg;
    cfg.friction         = 0.993;
    cfg.dragSensitivity  = 2.0;
    cfg.pitchSensitivity = 0.3;
    cfg.velocitySmooth   = 0.35;
    cfg.idleOrbitSpeed   = 0.003;
    cfg.idleThreshold    = 0.0003;
    cfg.idleBlend        = 0.015;
    cfg.dragDeadZone     = 0.0001;
    cfg.pitchMin         = -0.35;
    cfg.pitchMax         =  0.18;
    return cfg;
}

// -------------------------------------------------------
// Buffer-A: full camera state machine
// -------------------------------------------------------

/**
 * Run the orbit camera state machine for a single frame.
 * Call this from buffer-a's mainImage(). Only pixels (0,0) and (1,0)
 * are written; all others output vec4(0).
 *
 * Uniforms are passed as parameters (not referenced as globals) so this
 * function works in Shadertoy's Common tab where uniforms aren't in scope.
 *
 * @param fragColor    Output color (state data, not visual)
 * @param fragCoord    Fragment coordinates
 * @param stateSampler Previous frame's buffer (self-feedback)
 * @param cfg          Camera configuration
 * @param frame        Current frame number (iFrame)
 * @param mouse        Mouse state (iMouse)
 * @param resolution   Viewport resolution (iResolution)
 */
void orbitCameraUpdate(
    out vec4 fragColor,
    in vec2 fragCoord,
    in sampler2D stateSampler,
    in OrbitCameraConfig cfg,
    int frame,
    vec4 mouse,
    vec3 resolution
) {
    // Only pixels (0,0) and (1,0) store state
    if (fragCoord.x > 1.5 || fragCoord.y > 1.5) {
        fragColor = vec4(0.0);
        return;
    }

    // Read previous state from both pixels
    vec4 state = texelFetch(stateSampler, ivec2(0, 0), 0);
    vec4 prevMouseState = texelFetch(stateSampler, ivec2(1, 0), 0);

    float yaw      = state.x;
    float pitch    = state.y;
    float yawVel   = state.z;
    float pitchVel = state.w;
    float prevMX   = prevMouseState.x;
    float prevMY   = prevMouseState.y;

    // Initialize on first frame
    if (frame == 0) {
        yaw      = 0.0;
        pitch    = 0.0;
        yawVel   = cfg.idleOrbitSpeed;
        pitchVel = 0.0;
        prevMX   = mouse.x / resolution.x;
        prevMY   = mouse.y / resolution.y;
    }

    float mouseX = mouse.x / resolution.x;
    float mouseY = mouse.y / resolution.y;

    // Detect drag: mouse position actually changed this frame
    float dx = mouseX - prevMX;
    float dy = mouseY - prevMY;
    bool dragging = (dx * dx + dy * dy) > cfg.dragDeadZone * cfg.dragDeadZone;

    if (dragging) {
        // Blend drag delta into velocity for smooth momentum buildup
        float dragYawVel   = dx * cfg.dragSensitivity;
        float dragPitchVel = -dy * cfg.pitchSensitivity; // inverted Y: drag up = look higher

        yawVel   = mix(yawVel,   dragYawVel,   cfg.velocitySmooth);
        pitchVel = mix(pitchVel, dragPitchVel, cfg.velocitySmooth);
    } else {
        // Not dragging: friction decay
        yawVel   *= cfg.friction;
        pitchVel *= cfg.friction;

        // Yaw blends toward idle orbit when nearly stopped
        if (abs(yawVel) < cfg.idleThreshold) {
            yawVel = mix(yawVel, cfg.idleOrbitSpeed, cfg.idleBlend);
        }

        // Pitch decays to zero (no idle pitch movement)
        if (abs(pitchVel) < cfg.idleThreshold) {
            pitchVel = mix(pitchVel, 0.0, cfg.idleBlend);
        }
    }

    // Integrate angles
    yaw += yawVel;
    yaw = mod(yaw, _CAM_TAU);

    pitch += pitchVel;
    pitch = clamp(pitch, cfg.pitchMin, cfg.pitchMax);

    // Output: pixel (0,0) = angles + velocities, pixel (1,0) = mouse
    if (fragCoord.x < 0.5) {
        fragColor = vec4(yaw, pitch, yawVel, pitchVel);
    } else {
        fragColor = vec4(mouseX, mouseY, 0.0, 0.0);
    }
}

// -------------------------------------------------------
// Image side: view matrix + orbit ray
// -------------------------------------------------------

/**
 * Construct a right-handed view matrix (camera-to-world).
 * Named cameraLookAt to avoid clashes with shader-local lookAt functions.
 *
 * @param ro  Camera position (ray origin)
 * @param ta  Look-at target point
 * @return 3x3 view matrix [right, up, forward]
 */
mat3 cameraLookAt(vec3 ro, vec3 ta) {
    vec3 fwd = normalize(ta - ro);
    vec3 right = normalize(cross(fwd, vec3(0.0, 1.0, 0.0)));
    vec3 up = cross(right, fwd);
    return mat3(right, up, fwd);
}

/**
 * Result of orbit camera ray computation.
 * ro    — ray origin (camera position in world space)
 * rd    — ray direction (normalized, per-pixel)
 * yaw   — current yaw angle from buffer state
 * pitch — current pitch angle from buffer state
 */
struct OrbitCameraRay {
    vec3 ro;
    vec3 rd;
    float yaw;
    float pitch;
};

/**
 * Compute orbit camera ray from buffer state.
 *
 * Reads yaw/pitch from pixel (0,0) of the state buffer, converts to a
 * spherical orbit position at the given distance and height from the
 * target, and builds a per-pixel ray direction.
 *
 * TECHNIQUE: Spherical orbit via base elevation
 * The base elevation angle is derived from CAM_HEIGHT and CAM_DIST,
 * then pitch is added on top. This keeps the camera at approximately
 * the right height regardless of the orbit distance.
 *
 * @param stateSampler  Buffer containing camera state (pixel 0,0)
 * @param fragCoord     Fragment coordinates
 * @param resolution    Viewport resolution (iResolution.xy)
 * @param dist          Horizontal orbit distance from target
 * @param height        Base camera height above target
 * @param target        Look-at target point
 * @param fov           Field of view (focal length inverse — lower = telephoto)
 * @return OrbitCameraRay with ro, rd, yaw, pitch
 */
OrbitCameraRay orbitCameraRay(
    in sampler2D stateSampler,
    in vec2 fragCoord,
    in vec2 resolution,
    float dist,
    float height,
    vec3 target,
    float fov
) {
    OrbitCameraRay cam;

    vec2 uv = (fragCoord * 2.0 - resolution) / min(resolution.x, resolution.y);

    // Camera angles from buffer state (pixel 0,0)
    vec4 camState = texelFetch(stateSampler, ivec2(0, 0), 0);
    cam.yaw   = camState.x;
    cam.pitch = camState.y;

    // Spherical camera: pitch tilts elevation around the base height
    float baseElev = atan(height, dist);
    float elev     = baseElev + cam.pitch;
    float camR     = length(vec2(dist, height));

    cam.ro = vec3(
        cos(elev) * cos(cam.yaw) * camR,
        sin(elev) * camR,
        cos(elev) * sin(cam.yaw) * camR
    );

    mat3 viewMat = cameraLookAt(cam.ro, target);
    cam.rd = viewMat * normalize(vec3(uv, fov));

    return cam;
}
`},{name:"sphere",source:`/**
 * Sphere Projection & Intersection Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless helpers for analytic sphere rendering:
 * 2D rotation, responsive UV-to-sphere projection, ray-sphere intersection,
 * and surface normal/UV extraction.
 */

// === 2D ROTATION ===

/**
 * Rotate a 2D vector by angle \`a\` (radians).
 * Equivalent to multiplying by mat2(cos(a), -sin(a), sin(a), cos(a)).
 */
vec2 Rotate(vec2 p, float a) {
    return p * cos(a) + vec2(-p.y, p.x) * sin(a);
}

// === SPHERE PROJECTION ===

/**
 * Compute responsive UV coordinates for unit-sphere rendering.
 *
 * Maps fragment coordinates to a centered coordinate system where the
 * unit sphere fills most of the viewport. On portrait screens, applies an
 * additional scale boost to shrink the sphere from ~91% to ~68% of viewport
 * width, preventing the sphere from dominating mobile displays.
 *
 * Portrait boost: linearly increases with portrait-ness (1 - aspect),
 * scaled by 0.7 for a natural feel. On landscape/square screens the boost
 * is zero and behavior is identical to the original formula.
 *
 * | Device             | Aspect | uvScale | Sphere width fill |
 * |--------------------|--------|---------|-------------------|
 * | Phone portrait     | 0.46   | 3.04    | ~68%              |
 * | iPad portrait      | 0.75   | 1.72    | ~78%              |
 * | Desktop 16:9       | 1.78   | 1.1     | ~51% (unchanged)  |
 *
 * @param fragCoord  Pixel coordinates (gl_FragCoord.xy)
 * @param resolution Viewport resolution (iResolution.xy)
 * @param baseScale  Base UV scale — larger zooms out (typically 1.1)
 * @return Centered UV coordinates where unit sphere has radius 1.0
 */
vec2 sphereUV(vec2 fragCoord, vec2 resolution, float baseScale) {
    float aspect = resolution.x / resolution.y;
    // Boost effective scale on portrait screens to shrink sphere from 91% → ~68% width fill
    float portraitBoost = max(0.0, 1.0 - aspect) * 0.7;
    float uvScale = (baseScale + portraitBoost) / min(1.0, aspect);
    return uvScale * (2.0 * fragCoord - resolution) / resolution.y;
}

// === RAY-SPHERE INTERSECTION ===

// Guard PI/TAU defines to avoid conflicts with shader-local constants
#ifndef M_PI
#define M_PI 3.14159265359
#endif
#ifndef M_TAU
#define M_TAU 6.28318530718
#endif

/**
 * Ray-sphere intersection via quadratic discriminant.
 *
 * Solves |ro + t*rd - center|^2 = radius^2 for the nearest positive t.
 * Returns -1.0 on miss (discriminant < 0 or both roots behind the ray).
 *
 * @param ro      Ray origin
 * @param rd      Ray direction (must be normalized)
 * @param center  Sphere center in world space
 * @param radius  Sphere radius
 * @return Nearest positive t, or -1.0 if no hit
 */
float intersectSphere(vec3 ro, vec3 rd, vec3 center, float radius) {
    vec3 oc = ro - center;
    float b = dot(oc, rd);
    float c = dot(oc, oc) - radius * radius;
    float h = b * b - c;

    if (h < 0.0) return -1.0;

    h = sqrt(h);
    float t = -b - h;

    if (t < 0.0) t = -b + h;
    if (t < 0.0) return -1.0;

    return t;
}

/**
 * Compute surface normal and spherical UV at a hit point on a sphere.
 *
 * Normal points outward from center. UV maps longitude to [0,1] on x
 * and latitude to [0,1] on y (0 = south pole, 1 = north pole).
 *
 * @param hitPoint  World-space intersection point
 * @param center    Sphere center
 * @param normal    (out) Unit surface normal
 * @param uv        (out) Spherical UV in [0,1]^2
 */
void getSphereInfo(vec3 hitPoint, vec3 center, out vec3 normal, out vec2 uv) {
    normal = normalize(hitPoint - center);
    float latitude = 0.5 + asin(normal.y) / M_PI;
    float longitude = 0.5 + atan(normal.x, normal.z) / M_TAU;
    uv = vec2(longitude, latitude);
}
`},{name:"color",source:`/**
 * Color Conversion Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless color space conversion functions.
 */

// === HSL TO RGB ===

/**
 * Convert HSL color to RGB.
 *
 * @param h  Hue in degrees (0–360, wraps automatically)
 * @param s  Saturation (0.0–1.0)
 * @param l  Lightness (0.0–1.0)
 * @return RGB color in [0, 1] per component
 */
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

// === HSV CONVERSIONS ===

/**
 * Convert RGB color to HSV.
 *
 * @param c  RGB color in [0, 1] per component
 * @return   HSV where H is in [0, 1] (not degrees), S and V in [0, 1]
 */
vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

/**
 * Convert HSV color to RGB.
 *
 * @param c  HSV where H is in [0, 1] (not degrees), S and V in [0, 1]
 * @return   RGB color in [0, 1] per component
 */
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
`},{name:"sdf",source:`/**
 * Signed Distance Field Primitives
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless distance field functions for 2D rendering.
 */

// === LINE SEGMENT ===

/**
 * Compute minimum distance from a point to a line segment.
 *
 * Returns the perpendicular distance from point \`p\` to the closest
 * point on the segment from \`a\` to \`b\`. Handles degenerate
 * zero-length segments gracefully.
 *
 * @param a  Segment start point
 * @param b  Segment end point
 * @param p  Query point
 * @return Distance from \`p\` to the nearest point on segment (a, b)
 */
float dfLine(vec2 a, vec2 b, vec2 p) {
    vec2 ab = b - a;
    float denom = dot(ab, ab);
    if (denom < 1e-10) return distance(a, p);
    float t = clamp(dot(p - a, ab) / denom, 0.0, 1.0);
    return distance(a + ab * t, p);
}
`},{name:"caustic",source:`/**
 * Caustic Pattern (joltz0r / David Hoskins)
 * @author joltz0r, David Hoskins (adapted by guinetik)
 * @date 2026-02-16
 *
 * Iterative domain warp for underwater caustic patterns.
 * Each iteration displaces UV coordinates with sin/cos feedback,
 * accumulating inverse distance to create bright convergence lines
 * mimicking refracted light on a pool floor.
 *
 * Two layers at different scales are recommended for depth complexity.
 */

#ifndef M_TAU
#define M_TAU 6.28318530718
#endif

/**
 * Compute raw caustic convergence via iterative domain warp.
 *
 * Returns normalized accumulation value -- higher where displaced UV
 * coordinates converge, producing bright caustic lines. Apply
 * post-processing for final brightness curve:
 *   c = base - pow(c, power);   // typical: 1.17 - pow(c, 1.4)
 *   c = pow(abs(c), bright);    // typical: pow(abs(c), 8.0)
 *
 * @param uv        2D sample position
 * @param scale     UV scaling (larger = finer pattern, typical 0.5-3.0)
 * @param time      Animation time (pre-scaled by caller)
 * @param iters     Warp iterations: 3=soft blobs, 5=crisp, 8+=very sharp
 * @param intensity Inverse-distance sensitivity (smaller = tighter lines, typical 0.005)
 * @return Normalized convergence value
 */
float causticWarp(vec2 uv, float scale, float time, int iters, float intensity) {
    vec2 p = mod(uv * scale * M_TAU, M_TAU) - 250.0;
    vec2 i = p;
    float c = 1.0;
    for (int n = 0; n < 8; n++) {
        if (n >= iters) break;
        float tt = time * (1.0 - (3.5 / float(n + 1)));
        i = p + vec2(
            cos(tt - i.x) + sin(tt + i.y),
            sin(tt - i.y) + cos(tt + i.x)
        );
        c += 1.0 / length(vec2(
            p.x / (sin(i.x + tt) / intensity),
            p.y / (cos(i.y + tt) / intensity)
        ));
    }
    return c / float(iters);
}
`}]},{slug:"caustics-pool",title:"Caustic Study #02: Pool",description:"Ray-marched 3D swimming pool with tiled interior surfaces, a transparent water plane, caustic light patterns, and a periodically dropping ball with ripple physics. Mouse drag orbits with inertia.",date:"2026-02-15",tags:["caustics","raymarching","3d","physics"],links:{},screenshotUrl:u0,passes:{image:`/**
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

// Ray-sphere intersection provided by sphere commons (intersectSphere).

// -------------------------------------------------------
// Caustic pattern — core warp provided by caustic commons
// (joltz0r / David Hoskins iterative domain warp)
// -------------------------------------------------------
float causticPattern(vec2 uv, float t)
{
    float time = t * CAUSTIC_SPEED + CAUSTIC_OFFSET;
    float c = causticWarp(uv, CAUSTIC_SCALE, time, CAUSTIC_ITERS, CAUSTIC_INTEN);
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
// Main
// -------------------------------------------------------
void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    float t = iTime;

    // Orbit camera from buffer-a state
    OrbitCameraRay cam = orbitCameraRay(
        iChannel0, fragCoord, iResolution.xy,
        CAM_DIST, CAM_HEIGHT, CAM_TARGET, CAM_FOV
    );
    vec3 ro = cam.ro;
    vec3 rd = cam.rd;

    // Get ball state
    BallState ball = getBall(t);

    vec3 col = SKY_COL;

    // --- Ball intersection (above water) ---
    float ballT = -1.0;
    if (ball.alpha > 0.0)
        ballT = intersectSphere(ro, rd, ball.pos, BALL_RADIUS);

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
 * Orbit camera with mouse-drag inertia, powered by camera commons.
 * Pool view: shallow pitch range for looking down into the water.
 *
 * === STATE LAYOUT (buffer-a → iChannel0) ===
 * Pixel (0, 0): yaw (x), pitch (y), yawVel (z), pitchVel (w)
 * Pixel (1, 0): prevMouseX (x), prevMouseY (y), unused (zw)
 */

// -- Pitch limits (radians) --
// Shallow range: camera looks slightly down into the pool
#define PITCH_MIN -0.35   // Max downward tilt — prevents looking under the pool
#define PITCH_MAX  0.18   // Max upward tilt — keeps water surface visible

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    OrbitCameraConfig cfg = orbitCameraDefaultConfig();
    cfg.pitchMin = PITCH_MIN;
    cfg.pitchMax = PITCH_MAX;
    orbitCameraUpdate(fragColor, fragCoord, iChannel0, cfg, iFrame, iMouse, iResolution);
}
`},channels:{image:{iChannel0:"buffer-a"},bufferA:{iChannel0:"buffer-a"}},commonsSources:[{name:"camera",source:`/**
 * Orbit Camera Commons
 * @author guinetik
 * @date 2026-02-20
 *
 * Reusable orbit camera with mouse-drag inertia, friction decay, and idle
 * auto-rotation. Split into two parts:
 *
 * 1. **Buffer-A side** — \`orbitCameraUpdate()\` runs the state machine:
 *    drag detection, velocity blending, friction, idle orbit blend.
 *    Stores yaw/pitch/velocities in pixel (0,0), prev mouse in pixel (1,0).
 *
 * 2. **Image side** — \`orbitCameraRay()\` reads buffer state and computes
 *    a spherical orbit camera with \`cameraLookAt()\` view matrix.
 *
 * === STATE LAYOUT (buffer-a → iChannel0) ===
 * Pixel (0, 0): yaw (x), pitch (y), yawVel (z), pitchVel (w)
 * Pixel (1, 0): prevMouseX (x), prevMouseY (y), unused (zw)
 *
 * TECHNIQUE: Drag detection via mouse-delta dead zone
 * Instead of relying on iMouse.z (which stays positive after first click
 * in some renderers), we compare current vs previous mouse position.
 * If the squared delta exceeds DRAG_DEAD_ZONE², we're dragging.
 *
 * TECHNIQUE: Inertia with idle orbit blend
 * On release, velocity decays by FRICTION per frame. When yaw velocity
 * drops below IDLE_THRESHOLD, it blends toward IDLE_ORBIT_SPEED so the
 * camera never fully stops. Pitch always decays to zero (no idle tilt).
 */

// Guard TAU define to avoid conflicts with shader-local constants
#ifndef _CAM_TAU
#define _CAM_TAU 6.28318530718
#endif

// -------------------------------------------------------
// Configuration struct — all tunable camera parameters
// -------------------------------------------------------

/**
 * Orbit camera tuning parameters. Create via orbitCameraDefaultConfig()
 * and override individual fields as needed.
 *
 * friction       — velocity multiplier per frame when not dragging (0.99 = slow decay, 0.9 = fast)
 * dragSensitivity — horizontal drag-to-velocity scale
 * pitchSensitivity — vertical drag-to-velocity scale (typically < dragSensitivity)
 * velocitySmooth  — blend factor for new drag velocity (0 = ignore drag, 1 = instant)
 * idleOrbitSpeed  — yaw velocity target when coasting below threshold (rad/frame)
 * idleThreshold   — velocity magnitude below which idle blend kicks in
 * idleBlend       — blend rate toward idle orbit speed (0 = never, 1 = instant)
 * dragDeadZone    — minimum mouse delta to register as drag (normalized coords)
 * pitchMin        — minimum pitch angle in radians (negative = look down)
 * pitchMax        — maximum pitch angle in radians (positive = look up)
 */
struct OrbitCameraConfig {
    float friction;
    float dragSensitivity;
    float pitchSensitivity;
    float velocitySmooth;
    float idleOrbitSpeed;
    float idleThreshold;
    float idleBlend;
    float dragDeadZone;
    float pitchMin;
    float pitchMax;
};

/**
 * Sensible defaults matching the caustics-pool camera behavior.
 * Override pitchMin/pitchMax per shader for different viewing angles.
 */
OrbitCameraConfig orbitCameraDefaultConfig() {
    OrbitCameraConfig cfg;
    cfg.friction         = 0.993;
    cfg.dragSensitivity  = 2.0;
    cfg.pitchSensitivity = 0.3;
    cfg.velocitySmooth   = 0.35;
    cfg.idleOrbitSpeed   = 0.003;
    cfg.idleThreshold    = 0.0003;
    cfg.idleBlend        = 0.015;
    cfg.dragDeadZone     = 0.0001;
    cfg.pitchMin         = -0.35;
    cfg.pitchMax         =  0.18;
    return cfg;
}

// -------------------------------------------------------
// Buffer-A: full camera state machine
// -------------------------------------------------------

/**
 * Run the orbit camera state machine for a single frame.
 * Call this from buffer-a's mainImage(). Only pixels (0,0) and (1,0)
 * are written; all others output vec4(0).
 *
 * Uniforms are passed as parameters (not referenced as globals) so this
 * function works in Shadertoy's Common tab where uniforms aren't in scope.
 *
 * @param fragColor    Output color (state data, not visual)
 * @param fragCoord    Fragment coordinates
 * @param stateSampler Previous frame's buffer (self-feedback)
 * @param cfg          Camera configuration
 * @param frame        Current frame number (iFrame)
 * @param mouse        Mouse state (iMouse)
 * @param resolution   Viewport resolution (iResolution)
 */
void orbitCameraUpdate(
    out vec4 fragColor,
    in vec2 fragCoord,
    in sampler2D stateSampler,
    in OrbitCameraConfig cfg,
    int frame,
    vec4 mouse,
    vec3 resolution
) {
    // Only pixels (0,0) and (1,0) store state
    if (fragCoord.x > 1.5 || fragCoord.y > 1.5) {
        fragColor = vec4(0.0);
        return;
    }

    // Read previous state from both pixels
    vec4 state = texelFetch(stateSampler, ivec2(0, 0), 0);
    vec4 prevMouseState = texelFetch(stateSampler, ivec2(1, 0), 0);

    float yaw      = state.x;
    float pitch    = state.y;
    float yawVel   = state.z;
    float pitchVel = state.w;
    float prevMX   = prevMouseState.x;
    float prevMY   = prevMouseState.y;

    // Initialize on first frame
    if (frame == 0) {
        yaw      = 0.0;
        pitch    = 0.0;
        yawVel   = cfg.idleOrbitSpeed;
        pitchVel = 0.0;
        prevMX   = mouse.x / resolution.x;
        prevMY   = mouse.y / resolution.y;
    }

    float mouseX = mouse.x / resolution.x;
    float mouseY = mouse.y / resolution.y;

    // Detect drag: mouse position actually changed this frame
    float dx = mouseX - prevMX;
    float dy = mouseY - prevMY;
    bool dragging = (dx * dx + dy * dy) > cfg.dragDeadZone * cfg.dragDeadZone;

    if (dragging) {
        // Blend drag delta into velocity for smooth momentum buildup
        float dragYawVel   = dx * cfg.dragSensitivity;
        float dragPitchVel = -dy * cfg.pitchSensitivity; // inverted Y: drag up = look higher

        yawVel   = mix(yawVel,   dragYawVel,   cfg.velocitySmooth);
        pitchVel = mix(pitchVel, dragPitchVel, cfg.velocitySmooth);
    } else {
        // Not dragging: friction decay
        yawVel   *= cfg.friction;
        pitchVel *= cfg.friction;

        // Yaw blends toward idle orbit when nearly stopped
        if (abs(yawVel) < cfg.idleThreshold) {
            yawVel = mix(yawVel, cfg.idleOrbitSpeed, cfg.idleBlend);
        }

        // Pitch decays to zero (no idle pitch movement)
        if (abs(pitchVel) < cfg.idleThreshold) {
            pitchVel = mix(pitchVel, 0.0, cfg.idleBlend);
        }
    }

    // Integrate angles
    yaw += yawVel;
    yaw = mod(yaw, _CAM_TAU);

    pitch += pitchVel;
    pitch = clamp(pitch, cfg.pitchMin, cfg.pitchMax);

    // Output: pixel (0,0) = angles + velocities, pixel (1,0) = mouse
    if (fragCoord.x < 0.5) {
        fragColor = vec4(yaw, pitch, yawVel, pitchVel);
    } else {
        fragColor = vec4(mouseX, mouseY, 0.0, 0.0);
    }
}

// -------------------------------------------------------
// Image side: view matrix + orbit ray
// -------------------------------------------------------

/**
 * Construct a right-handed view matrix (camera-to-world).
 * Named cameraLookAt to avoid clashes with shader-local lookAt functions.
 *
 * @param ro  Camera position (ray origin)
 * @param ta  Look-at target point
 * @return 3x3 view matrix [right, up, forward]
 */
mat3 cameraLookAt(vec3 ro, vec3 ta) {
    vec3 fwd = normalize(ta - ro);
    vec3 right = normalize(cross(fwd, vec3(0.0, 1.0, 0.0)));
    vec3 up = cross(right, fwd);
    return mat3(right, up, fwd);
}

/**
 * Result of orbit camera ray computation.
 * ro    — ray origin (camera position in world space)
 * rd    — ray direction (normalized, per-pixel)
 * yaw   — current yaw angle from buffer state
 * pitch — current pitch angle from buffer state
 */
struct OrbitCameraRay {
    vec3 ro;
    vec3 rd;
    float yaw;
    float pitch;
};

/**
 * Compute orbit camera ray from buffer state.
 *
 * Reads yaw/pitch from pixel (0,0) of the state buffer, converts to a
 * spherical orbit position at the given distance and height from the
 * target, and builds a per-pixel ray direction.
 *
 * TECHNIQUE: Spherical orbit via base elevation
 * The base elevation angle is derived from CAM_HEIGHT and CAM_DIST,
 * then pitch is added on top. This keeps the camera at approximately
 * the right height regardless of the orbit distance.
 *
 * @param stateSampler  Buffer containing camera state (pixel 0,0)
 * @param fragCoord     Fragment coordinates
 * @param resolution    Viewport resolution (iResolution.xy)
 * @param dist          Horizontal orbit distance from target
 * @param height        Base camera height above target
 * @param target        Look-at target point
 * @param fov           Field of view (focal length inverse — lower = telephoto)
 * @return OrbitCameraRay with ro, rd, yaw, pitch
 */
OrbitCameraRay orbitCameraRay(
    in sampler2D stateSampler,
    in vec2 fragCoord,
    in vec2 resolution,
    float dist,
    float height,
    vec3 target,
    float fov
) {
    OrbitCameraRay cam;

    vec2 uv = (fragCoord * 2.0 - resolution) / min(resolution.x, resolution.y);

    // Camera angles from buffer state (pixel 0,0)
    vec4 camState = texelFetch(stateSampler, ivec2(0, 0), 0);
    cam.yaw   = camState.x;
    cam.pitch = camState.y;

    // Spherical camera: pitch tilts elevation around the base height
    float baseElev = atan(height, dist);
    float elev     = baseElev + cam.pitch;
    float camR     = length(vec2(dist, height));

    cam.ro = vec3(
        cos(elev) * cos(cam.yaw) * camR,
        sin(elev) * camR,
        cos(elev) * sin(cam.yaw) * camR
    );

    mat3 viewMat = cameraLookAt(cam.ro, target);
    cam.rd = viewMat * normalize(vec3(uv, fov));

    return cam;
}
`},{name:"sphere",source:`/**
 * Sphere Projection & Intersection Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless helpers for analytic sphere rendering:
 * 2D rotation, responsive UV-to-sphere projection, ray-sphere intersection,
 * and surface normal/UV extraction.
 */

// === 2D ROTATION ===

/**
 * Rotate a 2D vector by angle \`a\` (radians).
 * Equivalent to multiplying by mat2(cos(a), -sin(a), sin(a), cos(a)).
 */
vec2 Rotate(vec2 p, float a) {
    return p * cos(a) + vec2(-p.y, p.x) * sin(a);
}

// === SPHERE PROJECTION ===

/**
 * Compute responsive UV coordinates for unit-sphere rendering.
 *
 * Maps fragment coordinates to a centered coordinate system where the
 * unit sphere fills most of the viewport. On portrait screens, applies an
 * additional scale boost to shrink the sphere from ~91% to ~68% of viewport
 * width, preventing the sphere from dominating mobile displays.
 *
 * Portrait boost: linearly increases with portrait-ness (1 - aspect),
 * scaled by 0.7 for a natural feel. On landscape/square screens the boost
 * is zero and behavior is identical to the original formula.
 *
 * | Device             | Aspect | uvScale | Sphere width fill |
 * |--------------------|--------|---------|-------------------|
 * | Phone portrait     | 0.46   | 3.04    | ~68%              |
 * | iPad portrait      | 0.75   | 1.72    | ~78%              |
 * | Desktop 16:9       | 1.78   | 1.1     | ~51% (unchanged)  |
 *
 * @param fragCoord  Pixel coordinates (gl_FragCoord.xy)
 * @param resolution Viewport resolution (iResolution.xy)
 * @param baseScale  Base UV scale — larger zooms out (typically 1.1)
 * @return Centered UV coordinates where unit sphere has radius 1.0
 */
vec2 sphereUV(vec2 fragCoord, vec2 resolution, float baseScale) {
    float aspect = resolution.x / resolution.y;
    // Boost effective scale on portrait screens to shrink sphere from 91% → ~68% width fill
    float portraitBoost = max(0.0, 1.0 - aspect) * 0.7;
    float uvScale = (baseScale + portraitBoost) / min(1.0, aspect);
    return uvScale * (2.0 * fragCoord - resolution) / resolution.y;
}

// === RAY-SPHERE INTERSECTION ===

// Guard PI/TAU defines to avoid conflicts with shader-local constants
#ifndef M_PI
#define M_PI 3.14159265359
#endif
#ifndef M_TAU
#define M_TAU 6.28318530718
#endif

/**
 * Ray-sphere intersection via quadratic discriminant.
 *
 * Solves |ro + t*rd - center|^2 = radius^2 for the nearest positive t.
 * Returns -1.0 on miss (discriminant < 0 or both roots behind the ray).
 *
 * @param ro      Ray origin
 * @param rd      Ray direction (must be normalized)
 * @param center  Sphere center in world space
 * @param radius  Sphere radius
 * @return Nearest positive t, or -1.0 if no hit
 */
float intersectSphere(vec3 ro, vec3 rd, vec3 center, float radius) {
    vec3 oc = ro - center;
    float b = dot(oc, rd);
    float c = dot(oc, oc) - radius * radius;
    float h = b * b - c;

    if (h < 0.0) return -1.0;

    h = sqrt(h);
    float t = -b - h;

    if (t < 0.0) t = -b + h;
    if (t < 0.0) return -1.0;

    return t;
}

/**
 * Compute surface normal and spherical UV at a hit point on a sphere.
 *
 * Normal points outward from center. UV maps longitude to [0,1] on x
 * and latitude to [0,1] on y (0 = south pole, 1 = north pole).
 *
 * @param hitPoint  World-space intersection point
 * @param center    Sphere center
 * @param normal    (out) Unit surface normal
 * @param uv        (out) Spherical UV in [0,1]^2
 */
void getSphereInfo(vec3 hitPoint, vec3 center, out vec3 normal, out vec2 uv) {
    normal = normalize(hitPoint - center);
    float latitude = 0.5 + asin(normal.y) / M_PI;
    float longitude = 0.5 + atan(normal.x, normal.z) / M_TAU;
    uv = vec2(longitude, latitude);
}
`},{name:"caustic",source:`/**
 * Caustic Pattern (joltz0r / David Hoskins)
 * @author joltz0r, David Hoskins (adapted by guinetik)
 * @date 2026-02-16
 *
 * Iterative domain warp for underwater caustic patterns.
 * Each iteration displaces UV coordinates with sin/cos feedback,
 * accumulating inverse distance to create bright convergence lines
 * mimicking refracted light on a pool floor.
 *
 * Two layers at different scales are recommended for depth complexity.
 */

#ifndef M_TAU
#define M_TAU 6.28318530718
#endif

/**
 * Compute raw caustic convergence via iterative domain warp.
 *
 * Returns normalized accumulation value -- higher where displaced UV
 * coordinates converge, producing bright caustic lines. Apply
 * post-processing for final brightness curve:
 *   c = base - pow(c, power);   // typical: 1.17 - pow(c, 1.4)
 *   c = pow(abs(c), bright);    // typical: pow(abs(c), 8.0)
 *
 * @param uv        2D sample position
 * @param scale     UV scaling (larger = finer pattern, typical 0.5-3.0)
 * @param time      Animation time (pre-scaled by caller)
 * @param iters     Warp iterations: 3=soft blobs, 5=crisp, 8+=very sharp
 * @param intensity Inverse-distance sensitivity (smaller = tighter lines, typical 0.005)
 * @return Normalized convergence value
 */
float causticWarp(vec2 uv, float scale, float time, int iters, float intensity) {
    vec2 p = mod(uv * scale * M_TAU, M_TAU) - 250.0;
    vec2 i = p;
    float c = 1.0;
    for (int n = 0; n < 8; n++) {
        if (n >= iters) break;
        float tt = time * (1.0 - (3.5 / float(n + 1)));
        i = p + vec2(
            cos(tt - i.x) + sin(tt + i.y),
            sin(tt - i.y) + cos(tt + i.x)
        );
        c += 1.0 / length(vec2(
            p.x / (sin(i.x + tt) / intensity),
            p.y / (cos(i.y + tt) / intensity)
        ));
    }
    return c / float(iters);
}
`}]},{slug:"caustics-study",title:"Caustic Study #01: Simple",description:"Water caustic pattern via iterative domain warping. Each iteration displaces UV coordinates with sin/cos feedback, accumulating inverse distance to create bright convergence lines mimicking refracted light on a pool floor.",date:"2026-02-15",tags:["caustics","procedural","physics"],links:{},screenshotUrl:m0,passes:{image:`/**
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
// Caustic pattern — core warp provided by caustic commons
// (joltz0r / David Hoskins iterative domain warp)
// -------------------------------------------------------
float caustic(vec2 uv, float scale, float t)
{
    float time = t * TIME_SCALE + TIME_OFFSET;
    float c = causticWarp(uv, scale, time, WARP_ITERATIONS, INTENSITY);
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
`},channels:{image:{iChannel0:"textures/pool.webp"}},commonsSources:[{name:"caustic",source:`/**
 * Caustic Pattern (joltz0r / David Hoskins)
 * @author joltz0r, David Hoskins (adapted by guinetik)
 * @date 2026-02-16
 *
 * Iterative domain warp for underwater caustic patterns.
 * Each iteration displaces UV coordinates with sin/cos feedback,
 * accumulating inverse distance to create bright convergence lines
 * mimicking refracted light on a pool floor.
 *
 * Two layers at different scales are recommended for depth complexity.
 */

#ifndef M_TAU
#define M_TAU 6.28318530718
#endif

/**
 * Compute raw caustic convergence via iterative domain warp.
 *
 * Returns normalized accumulation value -- higher where displaced UV
 * coordinates converge, producing bright caustic lines. Apply
 * post-processing for final brightness curve:
 *   c = base - pow(c, power);   // typical: 1.17 - pow(c, 1.4)
 *   c = pow(abs(c), bright);    // typical: pow(abs(c), 8.0)
 *
 * @param uv        2D sample position
 * @param scale     UV scaling (larger = finer pattern, typical 0.5-3.0)
 * @param time      Animation time (pre-scaled by caller)
 * @param iters     Warp iterations: 3=soft blobs, 5=crisp, 8+=very sharp
 * @param intensity Inverse-distance sensitivity (smaller = tighter lines, typical 0.005)
 * @return Normalized convergence value
 */
float causticWarp(vec2 uv, float scale, float time, int iters, float intensity) {
    vec2 p = mod(uv * scale * M_TAU, M_TAU) - 250.0;
    vec2 i = p;
    float c = 1.0;
    for (int n = 0; n < 8; n++) {
        if (n >= iters) break;
        float tt = time * (1.0 - (3.5 / float(n + 1)));
        i = p + vec2(
            cos(tt - i.x) + sin(tt + i.y),
            sin(tt - i.y) + cos(tt + i.x)
        );
        c += 1.0 / length(vec2(
            p.x / (sin(i.x + tt) / intensity),
            p.y / (cos(i.y + tt) / intensity)
        ));
    }
    return c / float(iters);
}
`}]},{slug:"chua",title:"Attractor Study #06: Chua",description:"Chua's double-scroll circuit attractor — the first physical electronic circuit proven to exhibit chaos (1983). 20 particles with respawn dynamics traced through 3D phase space. Drag to rotate.",date:"2026-02-16",tags:["attractors","3d"],links:{},screenshotUrl:h0,passes:{image:`/**
 * Attractor Study #06: Chua — Image Pass
 * @author guinetik
 * @date 2026-02-16
 *
 * Composite pass for Chua's double-scroll chaotic attractor. Reads the
 * accumulated trail from Buffer A, applies filmic tone-mapping and a soft
 * vignette for final display. Ported from gcanvas attractor-3d-demo / chua.js.
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
 * Attractor Study #06: Chua — Buffer A (Simulation + Trail Rendering)
 * @author guinetik
 * @date 2026-02-16
 *
 * Simulates Chua's circuit attractor, the first physical electronic circuit
 * proven to exhibit chaos (Leon Chua, 1983). A piecewise-linear nonlinear
 * resistor (Chua diode) drives the system into a double-scroll regime — two
 * spiralling lobes joined by a saddle region. 20 particles with stochastic
 * respawn dynamics are traced through 3D phase space using distance-field line
 * rendering and feedback accumulation. Velocity-mapped HSL coloring
 * (green-to-cyan) with blink pulses.
 * Ported from gcanvas attractor-3d-demo / chua.js.
 *
 * Chua's circuit equations:
 *   dx/dt = alpha * (y - x - g(x))
 *   dy/dt = x - y + z
 *   dz/dt = -gamma * y
 * where g(x) = m1*x + 0.5*(m0-m1)*(|x+1| - |x-1|) is the Chua diode.
 *
 * Parameters: alpha = 15.6, gamma = 25.58, m0 = -2.0 (inner slope),
 *             m1 = 0.0 (outer slope) — standard double-scroll regime.
 *
 * The piecewise-linear diode has three segments:
 *   g(x) = m0*x           for |x| < 1  (inner, steeper negative resistance)
 *   g(x) = m1*x +/- (m0-m1)  for |x| >= 1 (outer, shallower slope)
 * This creates two equilibrium regions (the scroll centers at x ~ +/- 1.5)
 * connected by a narrow saddle channel — particles spiral within a lobe then
 * occasionally hop to the other, producing the iconic double-scroll shape.
 */

// === STATE LAYOUT (buffer-a, self-feedback via iChannel0) ===
// Pixels (0..19, 0):      Particle positions (xyz). Respawn on escape or by random chance.
// Pixel (CAM_PIXEL, 0):   Camera state — rg = yaw/pitch as [0,1], zw = last mouse.
// All other pixels:        Accumulated trail color (RGB). Faded each frame by FADE.

// -- Integration & rendering --
#define NUM_PARTICLES 20   // Simultaneous particles tracing the attractor.
                           // More = denser trails. Above 30: GPU-heavy (NUM_PARTICLES * STEPS).
#define STEPS 5.0          // Euler steps per particle per frame — kept low since Chua
                           // moves fast with alpha=15.6. Above 15: trail segments get long.
#define BASE_VIEW_SCALE 0.15  // Base 3D-to-screen scale — smaller zooms out, larger zooms in.
                              // Automatically scaled down on portrait/mobile screens.
#define SPEED 1.5          // Time-step multiplier — higher = faster traversal.
#define INTENSITY 0.11     // Base brightness per segment.
#define FADE 0.995         // Trail persistence per frame — closer to 1.0 = longer trails.
                           // Below 0.98: trails vanish quickly. Above 0.999: ghosting.
#define FOCUS 1.2          // Distance-field softness (pixels) — smaller = thinner lines.
#define RESPAWN_CHANCE 0.005  // Per-particle per-frame probability of random respawn.
                              // Higher = more frequent refreshes. 0.0 = only respawn on escape.
#define ESCAPE_RADIUS 12.0 // Particles beyond this distance are respawned.
                           // Chua is compact; 12 is well outside the attractor basin.

// -- Chua diode parameters --
// Alpha controls the coupling strength between the capacitor voltages.
// At alpha=15.6 with these diode slopes, the system is in the double-scroll regime.
// Lower alpha (~9): period-1 orbit. Higher alpha (~16+): more chaotic, wider scrolls.
#define ALPHA 15.6         // Coupling constant — drives double-scroll chaos.
// Gamma controls the inductor's influence. At 25.58 the system balances
// spiral inward motion with cross-lobe hopping.
#define GAMMA 25.58        // Inductor coupling — higher compresses z-axis dynamics.
// Chua diode piecewise slopes:
// m0 = inner slope (|x| < 1), m1 = outer slope (|x| >= 1).
// The negative resistance (m0 < 0) provides energy to sustain oscillations.
#define M0 -2.0            // Inner diode slope — steeper negative = stronger scroll.
#define M1 0.0             // Outer diode slope — 0.0 = flat outside breakpoints.

// -- Color settings — green-to-cyan palette --
#define MIN_HUE 90.0       // Hue for fastest velocity (green — scroll transitions).
#define MAX_HUE 180.0      // Hue for slowest velocity (cyan — spiral arms).
#define MAX_SPEED 20.0     // Velocity clamp for hue mapping.
#define HUE_SHIFT_SPEED 10.0  // Degrees/sec of continuous hue rotation.
#define SATURATION 0.90    // Base color saturation.
#define LIGHTNESS 0.48     // Base HSL lightness.

// -- Blink settings — random brightness pulses --
#define BLINK_FREQ 7.0         // Pulse rate (Hz).
#define BLINK_INTENSITY 1.5    // Brightness multiplier during blink peak.
#define BLINK_SAT_BOOST 1.2    // Saturation boost during blink.
#define BLINK_LIT_BOOST 1.3    // Lightness boost during blink.

// -- State pixel index for camera --
// Stored immediately after the last particle pixel.
#define CAM_PIXEL NUM_PARTICLES

// Piecewise-linear Chua diode characteristic.
// g(x) = m1*x + 0.5*(m0-m1)*(|x+1| - |x-1|)
// This simplifies to m0*x for |x|<1 and m1*x +/- (m0-m1) for |x|>=1,
// creating the three-segment nonlinearity that drives the double-scroll.
float chuaDiode(float x) {
    return M1 * x + 0.5 * (M0 - M1) * (abs(x + 1.0) - abs(x - 1.0));
}

// Forward Euler integration of Chua's circuit equations.
// dx/dt = alpha * (y - x - g(x))   — voltage across C1
// dy/dt = x - y + z                — voltage across C2
// dz/dt = -gamma * y               — current through inductor
vec3 integrate(vec3 cur, float dt) {
    float g = chuaDiode(cur.x);
    return cur + vec3(
        ALPHA * (cur.y - cur.x - g),
        cur.x - cur.y + cur.z,
        -GAMMA * cur.y
    ) * dt;
}

// Inline yaw-pitch projection — applies yaw (cy/sy) then pitch (cp/sp) rotation.
// More efficient than building a full mat3 when only 2D output is needed.
vec2 project(vec3 p, float cy, float sy, float cp, float sp) {
    vec3 r = vec3(p.x * cy - p.z * sy, p.y, p.x * sy + p.z * cy);
    return vec2(r.x, r.y * cp - r.z * sp);
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
        yaw = 0.5;
        pitch = -0.6;
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

    // -- Integrate all particles, find closest line segment --
    // Each of the NUM_PARTICLES particles is advanced STEPS times. The closest
    // projected segment to this pixel determines brightness and velocity color.
    float d = 1e6;         // Minimum distance from pixel to any trail segment.
    float bestSpeed = 0.0; // Velocity magnitude at the closest segment.
    float dt = 0.01 * SPEED;

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

    // -- Blink --
    float blinkSeed = floor(iTime * BLINK_FREQ);
    float blink = hashN(blinkSeed) < 0.25
        ? sin(fract(iTime * BLINK_FREQ) * 3.14159) : 0.0;

    // -- Color: green (fast, scroll transitions) -> cyan (slow, spiral arms) --
    float speedNorm = clamp(bestSpeed / MAX_SPEED, 0.0, 1.0);
    float hue = mod(MAX_HUE - speedNorm * (MAX_HUE - MIN_HUE) + iTime * HUE_SHIFT_SPEED, 360.0);
    float sat = min(1.0, SATURATION * (1.0 + blink * (BLINK_SAT_BOOST - 1.0)));
    float lit = min(1.0, LIGHTNESS * (1.0 + blink * (BLINK_LIT_BOOST - 1.0)));
    vec3 lineColor = hsl2rgb(hue, sat, lit);
    c *= 1.0 + blink * (BLINK_INTENSITY - 1.0);

    // -- State persistence (row 0) & trail accumulation --
    if (py == 0 && px < NUM_PARTICLES) {
        // Particle state pixels — integrate this particle forward.
        if (iFrame == 0) {
            // TECHNIQUE: Dual-lobe seeding
            // Seed half the particles into each scroll lobe (x ~ +/-1.5).
            // This ensures both lobes are populated from frame 1, rather than
            // waiting for particles to migrate across the saddle region.
            float sign = (px < NUM_PARTICLES / 2) ? 1.0 : -1.0;
            float angle = float(px) * 6.28318 / float(NUM_PARTICLES);
            float r = 0.1;
            fragColor = vec4(sign * 1.5 + r * cos(angle), r * sin(angle), r * sin(angle * 0.7 + 1.0), 0.0);
        } else {
            vec3 pos = texelFetch(iChannel0, ivec2(px, 0), 0).xyz;
            for (float i = 0.0; i < STEPS; i++) {
                pos = integrate(pos, dt);
            }
            // TECHNIQUE: Stochastic respawn into alternating lobes
            // Particles that escape beyond ESCAPE_RADIUS are respawned, plus a small
            // random chance (RESPAWN_CHANCE) per frame ensures continuous renewal.
            // Respawn lobe is randomly chosen so both scrolls stay populated.
            float rng = hashN(float(px) * 13.7 + iTime * 60.0);
            if (length(pos) > ESCAPE_RADIUS || rng < RESPAWN_CHANCE) {
                float angle = hashN(float(px) + iTime) * 6.28318;
                float sign = hashN(float(px) * 7.3 + iTime * 31.0) < 0.5 ? 1.0 : -1.0;
                float r = 0.1;
                pos = vec3(sign * 1.5 + r * cos(angle), r * sin(angle), r * sin(angle * 0.7));
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
`},channels:{image:{iChannel0:"buffer-a"},bufferA:{iChannel0:"buffer-a"}},commonsSources:[{name:"noise-value",source:`/**
 * Value Noise (sin-hash family)
 * @author guinetik
 * @date 2026-02-15
 *
 * Hash-based value noise using the fract(sin(x)*43758) family.
 * Fast and simple, produces smooth non-directional noise suitable for terrain.
 * C1 continuous via Hermite smoothstep interpolation (3t^2 - 2t^3).
 *
 * Noise: Chosen for speed on desktop GPUs. For mobile or precision-sensitive
 * use cases, prefer noise-pcg.glsl which avoids sin-based hashing.
 */

// === HASH FUNCTIONS ===

/**
 * 1D hash — maps a float to a pseudo-random float in [0, 1).
 */
float hashN(float n) {
    return fract(sin(n) * 43758.5453123);
}

/**
 * 2D hash — maps a vec2 to a pseudo-random float in [0, 1).
 */
float hashN2(vec2 p) {
    float h = dot(p, vec2(127.1, 311.7));
    return fract(sin(h) * 43758.5453123);
}

// === VALUE NOISE ===

/**
 * 2D value noise with Hermite interpolation.
 *
 * @param p  2D position to sample
 * @return Noise value in [0, 1)
 */
float valueNoise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hashN2(i + vec2(0.0, 0.0)), hashN2(i + vec2(1.0, 0.0)), u.x),
               mix(hashN2(i + vec2(0.0, 1.0)), hashN2(i + vec2(1.0, 1.0)), u.x), u.y);
}

/**
 * 3D value noise with Hermite interpolation.
 *
 * Uses dot-product lattice hashing with step (1, 157, 113) for
 * decorrelated cell values.
 *
 * @param pos  3D position to sample
 * @return Noise value in [0, 1)
 */
float valueNoise3D(vec3 pos) {
    vec3 i = floor(pos);
    vec3 f = fract(pos);
    vec3 u = f * f * (3.0 - 2.0 * f);

    float n = dot(i, vec3(1.0, 157.0, 113.0));
    return mix(mix(mix(hashN(n + 0.0),   hashN(n + 1.0), u.x),
                   mix(hashN(n + 157.0), hashN(n + 158.0), u.x), u.y),
               mix(mix(hashN(n + 113.0), hashN(n + 114.0), u.x),
                   mix(hashN(n + 270.0), hashN(n + 271.0), u.x), u.y), u.z);
}

// === FBM ===

/**
 * Fractional Brownian Motion using 3D value noise.
 *
 * Sums multiple octaves of valueNoise3D with decreasing amplitude.
 * Domain is offset and rotated between octaves to decorrelate layers.
 *
 * @param pos        3D sample position
 * @param octaves    Number of noise octaves (1–8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0–3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4–0.5)
 * @return Normalized FBM value in approximately [0, 1)
 */
float fbmValue(vec3 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * valueNoise3D(pos);
        total += scale;
        pos += vec3(0.23, 0.77, 0.57);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}

/**
 * Fractional Brownian Motion using 2D value noise.
 *
 * Sums multiple octaves of valueNoise2D with decreasing amplitude.
 * Domain is offset between octaves to decorrelate layers.
 *
 * @param pos        2D sample position
 * @param octaves    Number of noise octaves (1-8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0-3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4-0.5)
 * @return Normalized FBM value in approximately [0, 1)
 */
float fbmValue2D(vec2 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * valueNoise2D(pos);
        total += scale;
        pos += vec2(0.23, 0.77);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}
`},{name:"color",source:`/**
 * Color Conversion Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless color space conversion functions.
 */

// === HSL TO RGB ===

/**
 * Convert HSL color to RGB.
 *
 * @param h  Hue in degrees (0–360, wraps automatically)
 * @param s  Saturation (0.0–1.0)
 * @param l  Lightness (0.0–1.0)
 * @return RGB color in [0, 1] per component
 */
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

// === HSV CONVERSIONS ===

/**
 * Convert RGB color to HSV.
 *
 * @param c  RGB color in [0, 1] per component
 * @return   HSV where H is in [0, 1] (not degrees), S and V in [0, 1]
 */
vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

/**
 * Convert HSV color to RGB.
 *
 * @param c  HSV where H is in [0, 1] (not degrees), S and V in [0, 1]
 * @return   RGB color in [0, 1] per component
 */
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
`},{name:"sdf",source:`/**
 * Signed Distance Field Primitives
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless distance field functions for 2D rendering.
 */

// === LINE SEGMENT ===

/**
 * Compute minimum distance from a point to a line segment.
 *
 * Returns the perpendicular distance from point \`p\` to the closest
 * point on the segment from \`a\` to \`b\`. Handles degenerate
 * zero-length segments gracefully.
 *
 * @param a  Segment start point
 * @param b  Segment end point
 * @param p  Query point
 * @return Distance from \`p\` to the nearest point on segment (a, b)
 */
float dfLine(vec2 a, vec2 b, vec2 p) {
    vec2 ab = b - a;
    float denom = dot(ab, ab);
    if (denom < 1e-10) return distance(a, p);
    float t = clamp(dot(p - a, ab) / denom, 0.0, 1.0);
    return distance(a + ab * t, p);
}
`}]},{slug:"dadras",title:"Attractor Study #01: Dadras",description:"Dadras strange attractor (2010) by Sara Dadras & Hamid Reza Momeni. A three-scroll chaotic system rendered with distance-field line tracing and feedback accumulation. Velocity-mapped HSL coloring shifts over time with random blink pulses.",date:"2026-02-10",tags:["attractors","3d"],links:{},screenshotUrl:v0,passes:{image:`/**\r
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

        float segD = dfLine(projectMat(last, viewRot, viewScale), projectMat(next, viewRot, viewScale), uv);
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
    float blink = hashN(blinkSeed) < 0.3
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
`},channels:{image:{iChannel0:"buffer-a"},bufferA:{iChannel0:"buffer-a"}},commonsSources:[{name:"noise-value",source:`/**
 * Value Noise (sin-hash family)
 * @author guinetik
 * @date 2026-02-15
 *
 * Hash-based value noise using the fract(sin(x)*43758) family.
 * Fast and simple, produces smooth non-directional noise suitable for terrain.
 * C1 continuous via Hermite smoothstep interpolation (3t^2 - 2t^3).
 *
 * Noise: Chosen for speed on desktop GPUs. For mobile or precision-sensitive
 * use cases, prefer noise-pcg.glsl which avoids sin-based hashing.
 */

// === HASH FUNCTIONS ===

/**
 * 1D hash — maps a float to a pseudo-random float in [0, 1).
 */
float hashN(float n) {
    return fract(sin(n) * 43758.5453123);
}

/**
 * 2D hash — maps a vec2 to a pseudo-random float in [0, 1).
 */
float hashN2(vec2 p) {
    float h = dot(p, vec2(127.1, 311.7));
    return fract(sin(h) * 43758.5453123);
}

// === VALUE NOISE ===

/**
 * 2D value noise with Hermite interpolation.
 *
 * @param p  2D position to sample
 * @return Noise value in [0, 1)
 */
float valueNoise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hashN2(i + vec2(0.0, 0.0)), hashN2(i + vec2(1.0, 0.0)), u.x),
               mix(hashN2(i + vec2(0.0, 1.0)), hashN2(i + vec2(1.0, 1.0)), u.x), u.y);
}

/**
 * 3D value noise with Hermite interpolation.
 *
 * Uses dot-product lattice hashing with step (1, 157, 113) for
 * decorrelated cell values.
 *
 * @param pos  3D position to sample
 * @return Noise value in [0, 1)
 */
float valueNoise3D(vec3 pos) {
    vec3 i = floor(pos);
    vec3 f = fract(pos);
    vec3 u = f * f * (3.0 - 2.0 * f);

    float n = dot(i, vec3(1.0, 157.0, 113.0));
    return mix(mix(mix(hashN(n + 0.0),   hashN(n + 1.0), u.x),
                   mix(hashN(n + 157.0), hashN(n + 158.0), u.x), u.y),
               mix(mix(hashN(n + 113.0), hashN(n + 114.0), u.x),
                   mix(hashN(n + 270.0), hashN(n + 271.0), u.x), u.y), u.z);
}

// === FBM ===

/**
 * Fractional Brownian Motion using 3D value noise.
 *
 * Sums multiple octaves of valueNoise3D with decreasing amplitude.
 * Domain is offset and rotated between octaves to decorrelate layers.
 *
 * @param pos        3D sample position
 * @param octaves    Number of noise octaves (1–8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0–3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4–0.5)
 * @return Normalized FBM value in approximately [0, 1)
 */
float fbmValue(vec3 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * valueNoise3D(pos);
        total += scale;
        pos += vec3(0.23, 0.77, 0.57);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}

/**
 * Fractional Brownian Motion using 2D value noise.
 *
 * Sums multiple octaves of valueNoise2D with decreasing amplitude.
 * Domain is offset between octaves to decorrelate layers.
 *
 * @param pos        2D sample position
 * @param octaves    Number of noise octaves (1-8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0-3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4-0.5)
 * @return Normalized FBM value in approximately [0, 1)
 */
float fbmValue2D(vec2 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * valueNoise2D(pos);
        total += scale;
        pos += vec2(0.23, 0.77);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}
`},{name:"color",source:`/**
 * Color Conversion Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless color space conversion functions.
 */

// === HSL TO RGB ===

/**
 * Convert HSL color to RGB.
 *
 * @param h  Hue in degrees (0–360, wraps automatically)
 * @param s  Saturation (0.0–1.0)
 * @param l  Lightness (0.0–1.0)
 * @return RGB color in [0, 1] per component
 */
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

// === HSV CONVERSIONS ===

/**
 * Convert RGB color to HSV.
 *
 * @param c  RGB color in [0, 1] per component
 * @return   HSV where H is in [0, 1] (not degrees), S and V in [0, 1]
 */
vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

/**
 * Convert HSV color to RGB.
 *
 * @param c  HSV where H is in [0, 1] (not degrees), S and V in [0, 1]
 * @return   RGB color in [0, 1] per component
 */
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
`},{name:"sdf",source:`/**
 * Signed Distance Field Primitives
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless distance field functions for 2D rendering.
 */

// === LINE SEGMENT ===

/**
 * Compute minimum distance from a point to a line segment.
 *
 * Returns the perpendicular distance from point \`p\` to the closest
 * point on the segment from \`a\` to \`b\`. Handles degenerate
 * zero-length segments gracefully.
 *
 * @param a  Segment start point
 * @param b  Segment end point
 * @param p  Query point
 * @return Distance from \`p\` to the nearest point on segment (a, b)
 */
float dfLine(vec2 a, vec2 b, vec2 p) {
    vec2 ab = b - a;
    float denom = dot(ab, ab);
    if (denom < 1e-10) return distance(a, p);
    float t = clamp(dot(p - a, ab) / denom, 0.0, 1.0);
    return distance(a + ab * t, p);
}
`},{name:"projection",source:`/**
 * 3D Projection Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless 3D-to-2D projection helpers for attractor rendering.
 * Provides rotation matrices and projection functions.
 */

// === ROTATION MATRICES ===

/**
 * Rotation matrix around the X axis.
 *
 * @param a  Angle in radians
 * @return 3x3 rotation matrix
 */
mat3 rotX(float a) {
    float c = cos(a), s = sin(a);
    return mat3(1,0,0, 0,c,-s, 0,s,c);
}

/**
 * Rotation matrix around the Y axis.
 *
 * @param a  Angle in radians
 * @return 3x3 rotation matrix
 */
mat3 rotY(float a) {
    float c = cos(a), s = sin(a);
    return mat3(c,0,s, 0,1,0, -s,0,c);
}

// === PROJECTION ===

/**
 * Project a 3D point to 2D screen space via rotation matrix.
 *
 * Applies the view rotation and scales the result. The Z component
 * is discarded (orthographic projection along the view axis).
 *
 * @param p        3D point to project
 * @param viewRot  Combined view rotation matrix (typically rotY * rotX)
 * @param scale    Screen scale factor (pixels per unit)
 * @return 2D screen-space position
 */
vec2 projectMat(vec3 p, mat3 viewRot, float scale) {
    return (viewRot * p).xy * scale;
}
`}]},{slug:"domain-warping",title:"06. Domain Warping Study",description:"Multi-layer domain warping with recursive coordinate distortion, animated rotation, and mouse-interactive effects. Terminal green aesthetic with accent colors and dark vortex contrast.",date:"2026-01-27",tags:["10-days","procedural"],links:{},screenshotUrl:g0,passes:{image:`/**\r
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
 *\r
 * Noise: Uses noise-value.glsl commons (sin-hash family, fbmValue2D).\r
 */\r
\r
// --- FBM Warp Parameters ---\r
#define FBM_OCTAVES 6           // Noise detail — more octaves = finer detail, higher cost.\r
                                // 4: fast/smooth. 6: good detail. 8: expensive/sharp.\r
#define FBM_LACUNARITY 2.0      // Frequency multiplier per octave — 2.0 is standard doubling.\r
#define FBM_GAIN 0.5            // Amplitude decay per octave — 0.5 = each octave half as strong.\r
#define WARP_FREQ 2.0           // Base frequency for FBM warp sampling — higher = tighter patterns.\r
#define WARP_Q_SCALE 2.5        // How strongly layer-1 warp (q) feeds into layer-2 (r).\r
                                // Below 1.0: subtle. Above 3.0: chaotic folding.\r
#define WARP_R_SCALE 1.2        // How strongly recursive warp (r) feeds into final pattern.\r
#define WARP_F2_FREQ 1.5        // Frequency for secondary pattern (f2) — offset from main for variety.\r
#define WARP_F2_R_SCALE 1.8     // How strongly r feeds into f2 — higher = more recursion visible.\r
\r
// --- Time Multipliers ---\r
#define TIME_SCALE 0.3          // Global time scale — controls overall animation speed.\r
#define TIME_Q_X 0.3            // Time offset speed for q.x FBM sampling.\r
#define TIME_Q_Y 0.35           // Time offset speed for q.y FBM sampling.\r
#define TIME_R_X 0.4            // Time offset speed for r.x FBM sampling.\r
#define TIME_R_Y 0.38           // Time offset speed for r.y FBM sampling.\r
#define TIME_F2 0.25            // Time offset speed for f2 pattern.\r
#define TIME_ROTATE 0.1         // Rotation speed — full revolution ~63 seconds at 0.1.\r
\r
// --- FBM Offset Vectors ---\r
// TECHNIQUE: Spatial offsets decorrelate FBM channels\r
// Without offsets, q.x and q.y would sample the same noise field,\r
// producing identical warping in both axes (boring). These magic offsets\r
// come from Inigo Quilez's original domain warping article.\r
#define Q_Y_OFFSET vec2(5.2, 1.3)   // Offset for q.y — separates it from q.x.\r
#define R_X_OFFSET vec2(1.7, 9.2)   // Offset for r.x — decorrelates from q.\r
#define R_Y_OFFSET vec2(8.3, 2.8)   // Offset for r.y — decorrelates from r.x.\r
\r
// --- Mouse Interaction ---\r
#define MOUSE_RADIUS 1.2        // Influence falloff radius — larger = wider effect area.\r
                                // Below 0.5: very localized. Above 2.0: covers most of screen.\r
#define MOUSE_WARP_DOMAIN 0.4   // Domain distortion strength from mouse proximity.\r
#define MOUSE_WARP_R 2.5        // How strongly mouse warps the r layer.\r
#define MOUSE_WARP_RIPPLE 0.4   // Amplitude of mouse ripple sinusoidal distortion.\r
#define MOUSE_GLOW_STRENGTH 1.8 // Brightness of the cyan mouse glow halo.\r
\r
// --- Ring Effect ---\r
#define RING1_FREQ 8.0          // Spatial frequency of inner ring pattern.\r
#define RING1_SPEED 4.0         // Animation speed of inner rings.\r
#define RING2_FREQ 12.0         // Spatial frequency of outer ring pattern — higher = tighter.\r
#define RING2_SPEED 6.0         // Animation speed of outer rings.\r
#define RING_FADE_OUTER 0.8     // Rings fade beyond this radius from center.\r
#define RING_FADE_INNER 0.3     // Rings fade within this radius (prevents center blob).\r
\r
// --- Pulse & Warp Boost ---\r
#define PULSE_SPEED 2.0         // Pulsing oscillation rate — higher = faster throb.\r
#define PULSE_WARP_SCALE 10.0   // How much warpIntensity modulates pulse phase.\r
#define WARP_BOOST_FREQ 3.0     // Sinusoidal warp boost frequency.\r
#define WARP_BOOST_SPATIAL 5.0  // Spatial modulation of warp boost by distance from center.\r
#define WARP_BOOST_AMP 0.3      // Amplitude of time-based warp boost.\r
\r
// --- Mouse Ripple ---\r
#define RIPPLE_SPATIAL_FREQ 20.0  // Spatial frequency of mouse ripple rings — higher = tighter.\r
#define RIPPLE_SPEED 10.0         // Animation speed of ripple expansion.\r
#define RIPPLE_BRIGHTNESS 0.9     // Brightness of cyan ripple rings.\r
#define RIPPLE_DARK_GAP 0.2       // Darkness of gaps between ripple rings.\r
\r
// --- Vignette ---\r
#define VIGNETTE_STRENGTH 0.4   // Edge darkening intensity — 0.0 = none, 1.0 = heavy.\r
                                // 0.4 gives subtle framing without crushing edges.\r
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
    float t = iTime * TIME_SCALE;\r
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
    float mouseInf = smoothstep(MOUSE_RADIUS, 0.0, mouseDist) * mouseActive;\r
\r
    // Warping intensity (can animate or set to 1.0)\r
    float warpIntensity = 1.0;\r
\r
    // Pulsing effect from warped coordinates - creates expanding rings\r
    float pulse = sin(t * PULSE_SPEED + warpIntensity * PULSE_WARP_SCALE) * 0.5 + 0.5;\r
    float centerDist = length(p);\r
    float ring1 = sin(centerDist * RING1_FREQ - t * RING1_SPEED) * 0.5 + 0.5;\r
    float ring2 = sin(centerDist * RING2_FREQ - t * RING2_SPEED + 1.0) * 0.5 + 0.5;\r
    float rings = (ring1 + ring2) * 0.5;\r
    rings *= smoothstep(RING_FADE_OUTER, 0.0, centerDist) * smoothstep(0.0, RING_FADE_INNER, centerDist);\r
\r
    // === DOMAIN WARPING LAYERS ===\r
    // Start with base coordinates\r
    vec2 pp = p;\r
\r
    // Layer 0: Mouse-reactive domain distortion\r
    // Warp coordinates based on mouse position for interactive effect\r
    pp -= mouse * mouseInf * MOUSE_WARP_DOMAIN;\r
\r
    // Layer 1: Rotating domain warp\r
    // Rotate the coordinate space for dynamic motion\r
    pp = rotate(pp, t * TIME_ROTATE);\r
\r
    // Layer 2: First FBM warp layer\r
    // Sample FBM noise at different offsets to create warping vectors\r
    // TECHNIQUE: Domain warping via Inigo Quilez's f(p + f(p + f(p)))\r
    // Each layer samples FBM at offset coordinates, producing organic folding.\r
    vec2 q = vec2(\r
        fbmValue2D(pp * WARP_FREQ + t * TIME_Q_X, FBM_OCTAVES, FBM_LACUNARITY, FBM_GAIN),\r
        fbmValue2D(pp * WARP_FREQ + Q_Y_OFFSET + t * TIME_Q_Y, FBM_OCTAVES, FBM_LACUNARITY, FBM_GAIN)\r
    );\r
\r
    // Layer 3: Recursive domain warping\r
    // Warp the already-warped coordinates (q) for complex patterns\r
    vec2 r = vec2(\r
        fbmValue2D(pp + q * WARP_Q_SCALE + R_X_OFFSET + t * TIME_R_X, FBM_OCTAVES, FBM_LACUNARITY, FBM_GAIN),\r
        fbmValue2D(pp + q * WARP_Q_SCALE + R_Y_OFFSET + t * TIME_R_Y, FBM_OCTAVES, FBM_LACUNARITY, FBM_GAIN)\r
    );\r
\r
    // Additional warping: Time-based sinusoidal distortion\r
    // Adds pulsing energy to the warp pattern\r
    float warpBoost = pulse * warpIntensity;\r
    r += warpBoost * vec2(\r
        sin(t * WARP_BOOST_FREQ + centerDist * WARP_BOOST_SPATIAL),\r
        cos(t * WARP_BOOST_FREQ + centerDist * WARP_BOOST_SPATIAL)\r
    ) * WARP_BOOST_AMP;\r
\r
    // Additional warping: Mouse-reactive distortion\r
    // Interactive domain warping based on mouse proximity\r
    float mouseWarp = mouseInf * MOUSE_WARP_R;\r
    r += mouseWarp * vec2(\r
        sin(t * 6.0 + mouseDist * RIPPLE_SPATIAL_FREQ * 0.5),\r
        cos(t * 6.0 + mouseDist * RIPPLE_SPATIAL_FREQ * 0.5)\r
    ) * MOUSE_WARP_RIPPLE;\r
\r
    // Final pattern: Sample FBM using the heavily warped coordinates\r
    // The multiple layers of warping create complex, organic patterns\r
    float f = fbmValue2D(pp + q + r * WARP_R_SCALE, FBM_OCTAVES, FBM_LACUNARITY, FBM_GAIN);\r
    float f2 = fbmValue2D(pp * WARP_F2_FREQ + r * WARP_F2_R_SCALE + t * TIME_F2, FBM_OCTAVES, FBM_LACUNARITY, FBM_GAIN);\r
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
    float glowIntensity = mouseInf * MOUSE_GLOW_STRENGTH;\r
    // Add dark core in center of mouse glow\r
    float darkCore = smoothstep(0.15, 0.0, mouseDist) * mouseInf;\r
    color = mix(color, col1, darkCore * 0.3);\r
    color += glowCol * glowIntensity;\r
\r
    // Mouse ripple rings - cyan with dark gaps\r
    float ripple = sin(mouseDist * RIPPLE_SPATIAL_FREQ - t * RIPPLE_SPEED) * 0.5 + 0.5;\r
    ripple *= mouseInf * smoothstep(0.0, 1.0, mouseDist);\r
    // Add dark gaps between ripples\r
    float darkRipple = smoothstep(0.05, 0.0, abs(sin(mouseDist * RIPPLE_SPATIAL_FREQ - t * RIPPLE_SPEED))) * mouseInf;\r
    color = mix(color, col1, darkRipple * RIPPLE_DARK_GAP);\r
    color += vec3(0.0, 0.7, 1.0) * ripple * RIPPLE_BRIGHTNESS;\r
\r
    // Overall brightness - modulated by warp intensity\r
    color *= 1.0 + warpBoost * 0.5;\r
\r
    // Vignette\r
    float vig = 1.0 - length(uv - 0.5) * VIGNETTE_STRENGTH;\r
    color *= vig;\r
\r
    fragColor = vec4(color, 1.0);\r
}\r
`},channels:{},commonsSources:[{name:"noise-value",source:`/**
 * Value Noise (sin-hash family)
 * @author guinetik
 * @date 2026-02-15
 *
 * Hash-based value noise using the fract(sin(x)*43758) family.
 * Fast and simple, produces smooth non-directional noise suitable for terrain.
 * C1 continuous via Hermite smoothstep interpolation (3t^2 - 2t^3).
 *
 * Noise: Chosen for speed on desktop GPUs. For mobile or precision-sensitive
 * use cases, prefer noise-pcg.glsl which avoids sin-based hashing.
 */

// === HASH FUNCTIONS ===

/**
 * 1D hash — maps a float to a pseudo-random float in [0, 1).
 */
float hashN(float n) {
    return fract(sin(n) * 43758.5453123);
}

/**
 * 2D hash — maps a vec2 to a pseudo-random float in [0, 1).
 */
float hashN2(vec2 p) {
    float h = dot(p, vec2(127.1, 311.7));
    return fract(sin(h) * 43758.5453123);
}

// === VALUE NOISE ===

/**
 * 2D value noise with Hermite interpolation.
 *
 * @param p  2D position to sample
 * @return Noise value in [0, 1)
 */
float valueNoise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hashN2(i + vec2(0.0, 0.0)), hashN2(i + vec2(1.0, 0.0)), u.x),
               mix(hashN2(i + vec2(0.0, 1.0)), hashN2(i + vec2(1.0, 1.0)), u.x), u.y);
}

/**
 * 3D value noise with Hermite interpolation.
 *
 * Uses dot-product lattice hashing with step (1, 157, 113) for
 * decorrelated cell values.
 *
 * @param pos  3D position to sample
 * @return Noise value in [0, 1)
 */
float valueNoise3D(vec3 pos) {
    vec3 i = floor(pos);
    vec3 f = fract(pos);
    vec3 u = f * f * (3.0 - 2.0 * f);

    float n = dot(i, vec3(1.0, 157.0, 113.0));
    return mix(mix(mix(hashN(n + 0.0),   hashN(n + 1.0), u.x),
                   mix(hashN(n + 157.0), hashN(n + 158.0), u.x), u.y),
               mix(mix(hashN(n + 113.0), hashN(n + 114.0), u.x),
                   mix(hashN(n + 270.0), hashN(n + 271.0), u.x), u.y), u.z);
}

// === FBM ===

/**
 * Fractional Brownian Motion using 3D value noise.
 *
 * Sums multiple octaves of valueNoise3D with decreasing amplitude.
 * Domain is offset and rotated between octaves to decorrelate layers.
 *
 * @param pos        3D sample position
 * @param octaves    Number of noise octaves (1–8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0–3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4–0.5)
 * @return Normalized FBM value in approximately [0, 1)
 */
float fbmValue(vec3 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * valueNoise3D(pos);
        total += scale;
        pos += vec3(0.23, 0.77, 0.57);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}

/**
 * Fractional Brownian Motion using 2D value noise.
 *
 * Sums multiple octaves of valueNoise2D with decreasing amplitude.
 * Domain is offset between octaves to decorrelate layers.
 *
 * @param pos        2D sample position
 * @param octaves    Number of noise octaves (1-8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0-3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4-0.5)
 * @return Normalized FBM value in approximately [0, 1)
 */
float fbmValue2D(vec2 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * valueNoise2D(pos);
        total += scale;
        pos += vec2(0.23, 0.77);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}
`}]},{slug:"exoplanets",title:"Exoplanets Study",description:"A procedural solar system with a star and three different planet types",date:"2025-11-26",tags:["exoplanets","raymarching","3d","space"],links:{},screenshotUrl:y0,passes:{image:`/**\r
 * Exoplanets Study\r
 * @author guinetik\r
 * @date 2025-11-26\r
 *\r
 * A procedural solar system with a realistic star and three different planet types.\r
 * All geometry is ray-sphere intersected (no raymarching), with procedural surface\r
 * shading driven by simplex noise, FBM, and tiled noise for seamless flame textures.\r
 *\r
 * Commons: sphere (intersection + UV), color (hsv2rgb/rgb2hsv), noise-simplex\r
 * (snoise2D/3D, fbmSimplex2D/3D, tiledNoise3D, plasmaNoise).\r
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
 * TECHNIQUE: Stellar spectral mapping\r
 * Star color is derived from temperature via piecewise linear interpolation\r
 * across 12 anchor points spanning Y-dwarfs (300K) to O-type stars (40000K).\r
 *\r
 * TECHNIQUE: Layered plasma surface\r
 * Star surface combines spherical distortion (fish-eye warping of UVs),\r
 * plasmaNoise for boiling granules, tiledNoise3D for seamless outward-flowing\r
 * flames, and convection cell noise — all modulated by limb darkening.\r
 *\r
 * TECHNIQUE: Solar prominences\r
 * Corona arcs are placed at random angular positions with lifecycle modulation\r
 * (sin-based birth/death cycle) and FBM-shaped intensity profiles.\r
 *\r
 * TECHNIQUE: Biome mapping (rocky planet)\r
 * Temperature drives ice/lava interpolation: below 180K → ice caps,\r
 * above 400K → volcanic cracks with lava glow. FBM terrain drives\r
 * lowland/highland/peak color mixing.\r
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
// LOCAL UTILITIES (unique to exoplanets, not in commons)\r
// =============================================================================\r
\r
float seedHash(float seed) {\r
    return fract(sin(seed * 127.1 + seed * seed * 0.013) * 43758.5453);\r
}\r
\r
float wrapTime(float t) { return mod(t, 1000.0); }\r
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
    float flameNoise = fbmSimplex3D(flameCoord, 3);\r
    flameNoise = flameNoise * 0.5 + 0.5;\r
\r
    // Turbulence\r
    vec3 turbCoord = vec3(angle * 6.0 + time * 0.5, normalizedDist * 4.0, time * 0.25);\r
    float flameTurbulence = fbmSimplex3D(turbCoord, 4);\r
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
    float terrain = fbmSimplex2D(terrainUv * (3.0 + seed * 3.0));\r
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
// CAMERA UTILITIES\r
// =============================================================================\r
// NOTE: rotateX/rotateY here use a different sign convention from projection.glsl.\r
// Exoplanets uses camera-orbit rotation (Y-up, right-handed), so these are kept inline.\r
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
\r
    // TECHNIQUE: Adaptive FOV — widen on portrait to preserve scene visibility.\r
    // Desktop 16:9: fov = 1.8 (unchanged). Phone portrait: fov ≈ 2.29 (wider view).\r
    float aspect = iResolution.x / iResolution.y;\r
    float fov = CAMERA_FOV * (1.0 + max(0.0, 1.0 - aspect) * 0.5);\r
\r
    vec3 rayDir = cameraMat * normalize(vec3(uv, fov));\r
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
    float starDist = intersectSphere(rayOrigin, rayDir, STAR_CENTER, STAR_RADIUS);\r
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
    float rockyDist = intersectSphere(rayOrigin, rayDir, ROCKY_CENTER, ROCKY_RADIUS);\r
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
        float shadow = (intersectSphere(hitPoint + planetNormal * 0.01, lightDir, STAR_CENTER, STAR_RADIUS) > 0.0) ? 1.0 : 0.0;\r
\r
        hitColor = planetColor * (ambient + diffuse * 0.88 * shadow);\r
        hitColor += starColor * pow(1.0 - max(dot(viewNormal, vec3(0.0, 0.0, 1.0)), 0.0), 3.0) * 0.15;\r
    }\r
\r
    // -------------------------------------------------------------------------\r
    // GAS GIANT\r
    // -------------------------------------------------------------------------\r
    float gasDist = intersectSphere(rayOrigin, rayDir, GAS_CENTER, GAS_RADIUS);\r
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
        float shadow = (intersectSphere(hitPoint + planetNormal * 0.01, lightDir, STAR_CENTER, STAR_RADIUS) > 0.0) ? 1.0 : 0.0;\r
\r
        hitColor = planetColor * (ambient + diffuse * 0.9 * shadow);\r
        hitColor += starColor * pow(1.0 - max(dot(viewNormal, vec3(0.0, 0.0, 1.0)), 0.0), 3.0) * 0.2;\r
    }\r
\r
    // -------------------------------------------------------------------------\r
    // ICE GIANT\r
    // -------------------------------------------------------------------------\r
    float iceDist = intersectSphere(rayOrigin, rayDir, ICE_CENTER, ICE_RADIUS);\r
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
        float shadow = (intersectSphere(hitPoint + planetNormal * 0.01, lightDir, STAR_CENTER, STAR_RADIUS) > 0.0) ? 1.0 : 0.0;\r
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
`},channels:{},commonsSources:[{name:"sphere",source:`/**
 * Sphere Projection & Intersection Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless helpers for analytic sphere rendering:
 * 2D rotation, responsive UV-to-sphere projection, ray-sphere intersection,
 * and surface normal/UV extraction.
 */

// === 2D ROTATION ===

/**
 * Rotate a 2D vector by angle \`a\` (radians).
 * Equivalent to multiplying by mat2(cos(a), -sin(a), sin(a), cos(a)).
 */
vec2 Rotate(vec2 p, float a) {
    return p * cos(a) + vec2(-p.y, p.x) * sin(a);
}

// === SPHERE PROJECTION ===

/**
 * Compute responsive UV coordinates for unit-sphere rendering.
 *
 * Maps fragment coordinates to a centered coordinate system where the
 * unit sphere fills most of the viewport. On portrait screens, applies an
 * additional scale boost to shrink the sphere from ~91% to ~68% of viewport
 * width, preventing the sphere from dominating mobile displays.
 *
 * Portrait boost: linearly increases with portrait-ness (1 - aspect),
 * scaled by 0.7 for a natural feel. On landscape/square screens the boost
 * is zero and behavior is identical to the original formula.
 *
 * | Device             | Aspect | uvScale | Sphere width fill |
 * |--------------------|--------|---------|-------------------|
 * | Phone portrait     | 0.46   | 3.04    | ~68%              |
 * | iPad portrait      | 0.75   | 1.72    | ~78%              |
 * | Desktop 16:9       | 1.78   | 1.1     | ~51% (unchanged)  |
 *
 * @param fragCoord  Pixel coordinates (gl_FragCoord.xy)
 * @param resolution Viewport resolution (iResolution.xy)
 * @param baseScale  Base UV scale — larger zooms out (typically 1.1)
 * @return Centered UV coordinates where unit sphere has radius 1.0
 */
vec2 sphereUV(vec2 fragCoord, vec2 resolution, float baseScale) {
    float aspect = resolution.x / resolution.y;
    // Boost effective scale on portrait screens to shrink sphere from 91% → ~68% width fill
    float portraitBoost = max(0.0, 1.0 - aspect) * 0.7;
    float uvScale = (baseScale + portraitBoost) / min(1.0, aspect);
    return uvScale * (2.0 * fragCoord - resolution) / resolution.y;
}

// === RAY-SPHERE INTERSECTION ===

// Guard PI/TAU defines to avoid conflicts with shader-local constants
#ifndef M_PI
#define M_PI 3.14159265359
#endif
#ifndef M_TAU
#define M_TAU 6.28318530718
#endif

/**
 * Ray-sphere intersection via quadratic discriminant.
 *
 * Solves |ro + t*rd - center|^2 = radius^2 for the nearest positive t.
 * Returns -1.0 on miss (discriminant < 0 or both roots behind the ray).
 *
 * @param ro      Ray origin
 * @param rd      Ray direction (must be normalized)
 * @param center  Sphere center in world space
 * @param radius  Sphere radius
 * @return Nearest positive t, or -1.0 if no hit
 */
float intersectSphere(vec3 ro, vec3 rd, vec3 center, float radius) {
    vec3 oc = ro - center;
    float b = dot(oc, rd);
    float c = dot(oc, oc) - radius * radius;
    float h = b * b - c;

    if (h < 0.0) return -1.0;

    h = sqrt(h);
    float t = -b - h;

    if (t < 0.0) t = -b + h;
    if (t < 0.0) return -1.0;

    return t;
}

/**
 * Compute surface normal and spherical UV at a hit point on a sphere.
 *
 * Normal points outward from center. UV maps longitude to [0,1] on x
 * and latitude to [0,1] on y (0 = south pole, 1 = north pole).
 *
 * @param hitPoint  World-space intersection point
 * @param center    Sphere center
 * @param normal    (out) Unit surface normal
 * @param uv        (out) Spherical UV in [0,1]^2
 */
void getSphereInfo(vec3 hitPoint, vec3 center, out vec3 normal, out vec2 uv) {
    normal = normalize(hitPoint - center);
    float latitude = 0.5 + asin(normal.y) / M_PI;
    float longitude = 0.5 + atan(normal.x, normal.z) / M_TAU;
    uv = vec2(longitude, latitude);
}
`},{name:"color",source:`/**
 * Color Conversion Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless color space conversion functions.
 */

// === HSL TO RGB ===

/**
 * Convert HSL color to RGB.
 *
 * @param h  Hue in degrees (0–360, wraps automatically)
 * @param s  Saturation (0.0–1.0)
 * @param l  Lightness (0.0–1.0)
 * @return RGB color in [0, 1] per component
 */
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

// === HSV CONVERSIONS ===

/**
 * Convert RGB color to HSV.
 *
 * @param c  RGB color in [0, 1] per component
 * @return   HSV where H is in [0, 1] (not degrees), S and V in [0, 1]
 */
vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

/**
 * Convert HSV color to RGB.
 *
 * @param c  HSV where H is in [0, 1] (not degrees), S and V in [0, 1]
 * @return   RGB color in [0, 1] per component
 */
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
`},{name:"noise-simplex",source:`/**
 * Simplex Noise (Ashima Arts implementation)
 * @author guinetik
 * @date 2026-02-16
 *
 * 2D and 3D simplex noise plus FBM and specialty variants.
 * Simplex noise is preferred over classic Perlin for 3D work because it
 * evaluates 4 simplex corners instead of 8 cube corners, and has no
 * axis-aligned artifacts. Range is approximately [-1, 1].
 *
 * Noise: Chosen for star surfaces, corona flames, and planet terrain where
 * isotropic noise without grid bias is important. Costlier than value noise
 * but cheaper than 3D Perlin in practice due to fewer gradient evaluations.
 *
 * Based on: "Simplex noise demystified" by Stefan Gustavson (2005),
 * GLSL implementation by Ashima Arts / Ian McEwan.
 */

// === INTERNAL HELPERS ===
// These mod289/permute functions form the hash core of simplex noise.
// 289 = 17*17 — chosen so that permute(permute(x)) covers [0,289) uniformly.

vec2 mod289_s2(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 mod289_s3(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289_s4(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }

vec3 permute_s3(vec3 x) { return mod289_s3(((x * 34.0) + 1.0) * x); }
vec4 permute_s4(vec4 x) { return mod289_s4(((x * 34.0) + 1.0) * x); }

vec4 taylorInvSqrt_s(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

// === 3D SIMPLEX NOISE ===

/**
 * 3D simplex noise.
 *
 * Evaluates gradient noise on a simplex (tetrahedron) lattice.
 * Output range is approximately [-1, 1].
 *
 * @param v  3D sample position
 * @return   Noise value in ~[-1, 1]
 */
float snoise3D(vec3 v) {
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

    i = mod289_s3(i);
    vec4 p = permute_s4(permute_s4(permute_s4(
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

    vec4 norm = taylorInvSqrt_s(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

// === 2D SIMPLEX NOISE ===

/**
 * 2D simplex noise.
 *
 * Evaluates gradient noise on a triangular simplex lattice.
 * Output range is approximately [-1, 1].
 *
 * @param v  2D sample position
 * @return   Noise value in ~[-1, 1]
 */
float snoise2D(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289_s2(i);
    vec3 p = permute_s3(permute_s3(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

// === FBM VARIANTS ===

/**
 * 2D FBM using simplex noise, 5 fixed octaves.
 *
 * Standard lacunarity 2.0, gain 0.5 (pink noise spectrum).
 *
 * @param p  2D sample position
 * @return   FBM value, centered near 0
 */
float fbmSimplex2D(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
        value += amplitude * snoise2D(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

/**
 * 3D FBM using simplex noise, configurable octaves (1–6).
 *
 * Standard lacunarity 2.0, gain 0.5 (pink noise spectrum).
 *
 * @param p        3D sample position
 * @param octaves  Number of octaves (clamped to 1–6)
 * @return         FBM value, centered near 0
 */
float fbmSimplex3D(vec3 p, int octaves) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 6; i++) {
        if (i >= octaves) break;
        value += amplitude * snoise3D(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
    }
    return value;
}

// === SPECIALTY NOISE ===

/**
 * Seamless tiling noise for sphere textures.
 *
 * Uses lattice hashing with modular wrap to tile seamlessly at resolution \`res\`.
 * Output range is [-1, 1]. Ideal for star flame patterns where seam-free
 * spherical coverage is needed.
 *
 * @param uv   3D coordinate (typically angular coords + time)
 * @param res  Tiling resolution — higher = finer detail
 * @return     Tiled noise in [-1, 1]
 */
float tiledNoise3D(vec3 uv, float res) {
    uv *= res;
    vec3 uv0 = floor(mod(uv, res)) * vec3(1.0, 100.0, 10000.0);
    vec3 uv1 = floor(mod(uv + vec3(1.0), res)) * vec3(1.0, 100.0, 10000.0);
    vec3 f = fract(uv);
    f = f * f * (3.0 - 2.0 * f);

    vec4 v = vec4(uv0.x + uv0.y + uv0.z, uv1.x + uv0.y + uv0.z,
                  uv0.x + uv1.y + uv0.z, uv1.x + uv1.y + uv0.z);

    vec4 r = fract(sin(v * 0.001) * 100000.0);
    float r0 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);

    r = fract(sin((v + uv1.z - uv0.z) * 0.001) * 100000.0);
    float r1 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);

    return mix(r0, r1, f.z) * 2.0 - 1.0;
}

/**
 * Animated flowing plasma noise.
 *
 * Multi-octave simplex noise with per-octave time-varying offsets that
 * create a "boiling" or flowing effect. Normalized to [0, 1].
 * Used for star surface plasma, lava flows, and other animated surfaces.
 *
 * @param p     3D sample position
 * @param time  Animation time (typically iTime or wrapped iTime)
 * @return      Plasma value in [0, 1]
 */
float plasmaNoise(vec3 p, float time) {
    float value = 0.0;
    float amplitude = 1.0;
    float frequency = 1.0;
    float totalAmp = 0.0;

    for (int i = 0; i < 5; i++) {
        vec3 offset = vec3(
            sin(time * 0.1 + float(i)) * 0.5,
            cos(time * 0.15 + float(i) * 0.7) * 0.5,
            time * 0.05
        );
        value += amplitude * snoise3D((p + offset) * frequency);
        totalAmp += amplitude;
        amplitude *= 0.5;
        frequency *= 2.0;
    }

    return value / totalAmp;
}
`}]},{slug:"genuary31",title:"Genuary 2026 Day 31: GLSL Day",description:"Raymarched triangular grid terrain with Sierpinski fractal sky dome, raytraced black hole with gravitational lensing and accretion disk, bird flocks, and Matrix rain overlay with scanlines.",date:"2026-01-31",tags:["genuary","raymarching","3d"],links:{},screenshotUrl:b0,passes:{image:`/**\r
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
`},channels:{},commonsSources:[]},{slug:"gravity-well",title:"Gravity Well Study ",description:"Gravitational lensing effect that warps input images/videos through orbiting singularities. Wells sample and boost colors from the texture beneath them for glowing halos, while dark cores create the event horizon effect.",date:"2026-01-29",tags:["10-days","procedural","space"],links:{},screenshotUrl:x0,passes:{image:`/**\r
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
// --- Well parameters ---\r
#define WELL_COUNT 4                // Number of orbiting wells around the central well.\r
#define CENTER_OSCILLATION 0.15     // Amplitude of central well's wander — higher sends the center further from origin.\r
                                    // Below 0.05: nearly stationary. Above 0.3: center drifts off-screen.\r
#define CENTER_MASS_BASE 0.06       // Baseline pull strength of the central well.\r
                                    // Below 0.03: barely visible warp. Above 0.12: extreme singularity.\r
#define CENTER_MASS_AMP 0.02        // How much the central mass pulses over time.\r
                                    // 0.0: steady pull. Above 0.04: dramatic breathing effect.\r
#define CENTER_SOFTNESS 0.01        // Singularity softening for center — prevents division-by-zero warp.\r
                                    // Lower (0.001): sharper, more singular. Higher (0.05): broad gentle lens.\r
\r
// --- Orbit parameters ---\r
#define ORBIT_RADIUS_BASE 0.35      // Mean orbital distance of the 4 wells from center.\r
                                    // Below 0.2: clustered tightly. Above 0.5: near screen edges.\r
#define ORBIT_RADIUS_AMP 0.1        // Radial oscillation per orbiting well — adds elliptical variation.\r
                                    // 0.0: perfect circles. Above 0.2: highly eccentric orbits.\r
#define ORBIT_MASS_BASE 0.025       // Baseline pull strength of each orbiting well.\r
                                    // Below 0.01: subtle ripple. Above 0.05: strong secondary lensing.\r
#define ORBIT_SOFTNESS 0.015        // Singularity softening for orbiters — slightly gentler than center.\r
                                    // Lower: tighter warp rings. Higher: diffuse lensing.\r
\r
// --- Glow parameters ---\r
#define GLOW_RADIUS_CENTER 0.25     // Smoothstep outer edge for center glow halo.\r
                                    // Smaller: tighter hotspot. Larger: wide diffuse aura.\r
#define GLOW_RADIUS_ORBIT 0.15      // Smoothstep outer edge for orbiter glow halos.\r
                                    // Smaller: pinpoint gleam. Larger: broad haze.\r
#define GLOW_BRIGHTNESS_MULT 1.5    // Color multiplier for sampled glow tint — boosts the texture color.\r
                                    // 1.0: natural. Above 2.0: blown-out neon.\r
#define GLOW_BRIGHTNESS_ADD 0.3     // Additive floor ensuring glow is visible even on dark textures.\r
                                    // 0.0: dark areas stay dark. Above 0.5: washed-out whites.\r
#define GLOW_BLEND 0.6              // How strongly the accumulated glow mixes into the final image.\r
                                    // 0.0: no glow. 1.0: intense halation.\r
\r
// --- Core parameters (event horizon) ---\r
#define CORE_OUTER_CENTER 0.06      // Outer smoothstep edge for center's dark core.\r
                                    // Larger: wider dark zone. Smaller: pinpoint black hole.\r
#define CORE_INNER_CENTER 0.02      // Inner smoothstep edge — fully dark inside this radius.\r
#define CORE_ALPHA_CENTER 0.9       // Opacity of center core darkening (0–1). 1.0 = pure black.\r
#define CORE_OUTER_ORBIT 0.04       // Outer smoothstep edge for orbiter dark cores.\r
#define CORE_INNER_ORBIT 0.015      // Inner smoothstep edge for orbiter dark cores.\r
#define CORE_ALPHA_ORBIT 0.85       // Opacity of orbiter core darkening.\r
\r
// --- Post-processing ---\r
#define VIGNETTE_STRENGTH 0.5       // How aggressively edges darken — higher = stronger vignette.\r
                                    // 0.0: no vignette. Above 0.8: heavy darkening at corners.\r
#define CONTRAST_POWER 0.95         // Gamma-like contrast tweak applied before final output.\r
                                    // Below 1.0: slight lift in darks. Above 1.0: crushed shadows.\r
\r
/**\r
 * Warp UV toward a gravity point.\r
 *\r
 * // TECHNIQUE: Inverse-square gravitational lensing\r
 * // Models Newtonian gravity: pull = mass / (dist^2 + softness).\r
 * // The UV is displaced toward \`center\` by an amount proportional to\r
 * // 1/r^2, mimicking how light bends around a massive body.\r
 * // The \`softness\` parameter acts as a regularization term that prevents\r
 * // the singularity at dist=0 by adding a floor to the denominator.\r
 * // Lower softness = sharper warp near the center; higher = gentler falloff.\r
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
        sin(time * 0.7) * CENTER_OSCILLATION,\r
        cos(time * 0.5) * CENTER_OSCILLATION\r
    );\r
    float centerMass = CENTER_MASS_BASE + sin(time * 2.0) * CENTER_MASS_AMP;\r
    warped = gravityWarp(warped, center, centerMass, CENTER_SOFTNESS);\r
\r
    // Orbiting wells\r
    vec2 wellPositions[WELL_COUNT];\r
    for (int i = 0; i < WELL_COUNT; i++) {\r
        float fi = float(i);\r
        float angle = time * (0.4 + fi * 0.15) + fi * TAU / 4.0;\r
        float radius = ORBIT_RADIUS_BASE + sin(time * 0.3 + fi) * ORBIT_RADIUS_AMP;\r
        wellPositions[i] = vec2(cos(angle), sin(angle)) * radius;\r
\r
        float mass = ORBIT_MASS_BASE * (1.0 + sin(time * 1.5 + fi * 2.0) * 0.5);\r
        warped = gravityWarp(warped, wellPositions[i], mass, ORBIT_SOFTNESS);\r
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
    float centerGlow = smoothstep(GLOW_RADIUS_CENTER, 0.0, centerDist);\r
    vec2 centerSampleUV = center / vec2(aspect, 1.0) + 0.5;\r
    vec3 centerColor = texture(iChannel0, clamp(centerSampleUV, 0.0, 1.0)).rgb;\r
    // Boost brightness for glow\r
    centerColor = centerColor * GLOW_BRIGHTNESS_MULT + GLOW_BRIGHTNESS_ADD;\r
    glowColor += centerColor * centerGlow;\r
    totalGlow += centerGlow;\r
\r
    // Orbiting well glows\r
    for (int i = 0; i < WELL_COUNT; i++) {\r
        float dist = length(p - wellPositions[i]);\r
        float glow = smoothstep(GLOW_RADIUS_ORBIT, 0.0, dist);\r
\r
        // Sample texture color at well position\r
        vec2 sampleUV = wellPositions[i] / vec2(aspect, 1.0) + 0.5;\r
        vec3 wellColor = texture(iChannel0, clamp(sampleUV, 0.0, 1.0)).rgb;\r
        wellColor = wellColor * GLOW_BRIGHTNESS_MULT + GLOW_BRIGHTNESS_ADD;\r
\r
        glowColor += wellColor * glow;\r
        totalGlow += glow;\r
    }\r
\r
    // Apply glow\r
    color += glowColor * GLOW_BLEND;\r
\r
    // === DARK CORES ===\r
    float core = smoothstep(CORE_OUTER_CENTER, CORE_INNER_CENTER, length(p - center));\r
    color *= 1.0 - core * CORE_ALPHA_CENTER;\r
\r
    for (int i = 0; i < WELL_COUNT; i++) {\r
        float coreDist = length(p - wellPositions[i]);\r
        float coreAlpha = smoothstep(CORE_OUTER_ORBIT, CORE_INNER_ORBIT, coreDist);\r
        color *= 1.0 - coreAlpha * CORE_ALPHA_ORBIT;\r
    }\r
\r
    // === POST ===\r
    // Vignette\r
    float vig = 1.0 - length(uv - 0.5) * VIGNETTE_STRENGTH;\r
    color *= vig;\r
\r
    // Slight contrast boost\r
    color = pow(max(color, vec3(0.0)), vec3(CONTRAST_POWER));\r
\r
    fragColor = vec4(color, 1.0);\r
}\r
`},channels:{image:{iChannel0:"textures/space.jpg"}},commonsSources:[]},{slug:"halvorsen",title:"Attractor Study #05: Halvorsen",description:"Halvorsen's symmetric chaotic attractor with three-fold rotational symmetry. 20 particles with respawn dynamics traced through 3D phase space. Drag to rotate.",date:"2026-02-15",tags:["attractors","3d"],links:{},screenshotUrl:S0,passes:{image:`/**
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
#define BASE_VIEW_SCALE 0.045  // Base 3D-to-screen scale — smaller zooms out, larger zooms in.
                              // Automatically scaled down on portrait/mobile screens.
#define SPEED 1.95         // Time-step multiplier — higher = faster traversal.
#define INTENSITY 0.3      // Base brightness per segment.
#define FADE 0.992         // Trail persistence per frame — closer to 1.0 = longer trails.
                           // Below 0.98: trails vanish quickly. Above 0.999: ghosting.
#define FOCUS 2.0          // Distance-field softness (pixels) — smaller = thinner lines.
#define RESPAWN_CHANCE 0.01  // Per-particle per-frame probability of random respawn.
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
    float blink = hashN(blinkSeed) < 0.25
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
            float rng = hashN(float(px) * 13.7 + iTime * 60.0);
            if (length(pos) > 20.0 || rng < RESPAWN_CHANCE) {
                float angle = hashN(float(px) + iTime) * 6.28318;
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
`},channels:{image:{iChannel0:"buffer-a"},bufferA:{iChannel0:"buffer-a"}},commonsSources:[{name:"noise-value",source:`/**
 * Value Noise (sin-hash family)
 * @author guinetik
 * @date 2026-02-15
 *
 * Hash-based value noise using the fract(sin(x)*43758) family.
 * Fast and simple, produces smooth non-directional noise suitable for terrain.
 * C1 continuous via Hermite smoothstep interpolation (3t^2 - 2t^3).
 *
 * Noise: Chosen for speed on desktop GPUs. For mobile or precision-sensitive
 * use cases, prefer noise-pcg.glsl which avoids sin-based hashing.
 */

// === HASH FUNCTIONS ===

/**
 * 1D hash — maps a float to a pseudo-random float in [0, 1).
 */
float hashN(float n) {
    return fract(sin(n) * 43758.5453123);
}

/**
 * 2D hash — maps a vec2 to a pseudo-random float in [0, 1).
 */
float hashN2(vec2 p) {
    float h = dot(p, vec2(127.1, 311.7));
    return fract(sin(h) * 43758.5453123);
}

// === VALUE NOISE ===

/**
 * 2D value noise with Hermite interpolation.
 *
 * @param p  2D position to sample
 * @return Noise value in [0, 1)
 */
float valueNoise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hashN2(i + vec2(0.0, 0.0)), hashN2(i + vec2(1.0, 0.0)), u.x),
               mix(hashN2(i + vec2(0.0, 1.0)), hashN2(i + vec2(1.0, 1.0)), u.x), u.y);
}

/**
 * 3D value noise with Hermite interpolation.
 *
 * Uses dot-product lattice hashing with step (1, 157, 113) for
 * decorrelated cell values.
 *
 * @param pos  3D position to sample
 * @return Noise value in [0, 1)
 */
float valueNoise3D(vec3 pos) {
    vec3 i = floor(pos);
    vec3 f = fract(pos);
    vec3 u = f * f * (3.0 - 2.0 * f);

    float n = dot(i, vec3(1.0, 157.0, 113.0));
    return mix(mix(mix(hashN(n + 0.0),   hashN(n + 1.0), u.x),
                   mix(hashN(n + 157.0), hashN(n + 158.0), u.x), u.y),
               mix(mix(hashN(n + 113.0), hashN(n + 114.0), u.x),
                   mix(hashN(n + 270.0), hashN(n + 271.0), u.x), u.y), u.z);
}

// === FBM ===

/**
 * Fractional Brownian Motion using 3D value noise.
 *
 * Sums multiple octaves of valueNoise3D with decreasing amplitude.
 * Domain is offset and rotated between octaves to decorrelate layers.
 *
 * @param pos        3D sample position
 * @param octaves    Number of noise octaves (1–8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0–3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4–0.5)
 * @return Normalized FBM value in approximately [0, 1)
 */
float fbmValue(vec3 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * valueNoise3D(pos);
        total += scale;
        pos += vec3(0.23, 0.77, 0.57);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}

/**
 * Fractional Brownian Motion using 2D value noise.
 *
 * Sums multiple octaves of valueNoise2D with decreasing amplitude.
 * Domain is offset between octaves to decorrelate layers.
 *
 * @param pos        2D sample position
 * @param octaves    Number of noise octaves (1-8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0-3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4-0.5)
 * @return Normalized FBM value in approximately [0, 1)
 */
float fbmValue2D(vec2 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * valueNoise2D(pos);
        total += scale;
        pos += vec2(0.23, 0.77);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}
`},{name:"color",source:`/**
 * Color Conversion Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless color space conversion functions.
 */

// === HSL TO RGB ===

/**
 * Convert HSL color to RGB.
 *
 * @param h  Hue in degrees (0–360, wraps automatically)
 * @param s  Saturation (0.0–1.0)
 * @param l  Lightness (0.0–1.0)
 * @return RGB color in [0, 1] per component
 */
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

// === HSV CONVERSIONS ===

/**
 * Convert RGB color to HSV.
 *
 * @param c  RGB color in [0, 1] per component
 * @return   HSV where H is in [0, 1] (not degrees), S and V in [0, 1]
 */
vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

/**
 * Convert HSV color to RGB.
 *
 * @param c  HSV where H is in [0, 1] (not degrees), S and V in [0, 1]
 * @return   RGB color in [0, 1] per component
 */
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
`},{name:"sdf",source:`/**
 * Signed Distance Field Primitives
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless distance field functions for 2D rendering.
 */

// === LINE SEGMENT ===

/**
 * Compute minimum distance from a point to a line segment.
 *
 * Returns the perpendicular distance from point \`p\` to the closest
 * point on the segment from \`a\` to \`b\`. Handles degenerate
 * zero-length segments gracefully.
 *
 * @param a  Segment start point
 * @param b  Segment end point
 * @param p  Query point
 * @return Distance from \`p\` to the nearest point on segment (a, b)
 */
float dfLine(vec2 a, vec2 b, vec2 p) {
    vec2 ab = b - a;
    float denom = dot(ab, ab);
    if (denom < 1e-10) return distance(a, p);
    float t = clamp(dot(p - a, ab) / denom, 0.0, 1.0);
    return distance(a + ab * t, p);
}
`}]},{slug:"kaleidoscope-study",title:"Kaleidoscope Interactive",description:"Polar coordinate folding with 10 iterations of symmetry. Auto-rotating with mouse X/Y control for speed and zoom, producing vignette-focused mandala-like patterns.",date:"2026-01-28",tags:["procedural"],links:{},screenshotUrl:E0,passes:{image:`/**\r
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
`},channels:{image:{iChannel0:"textures/penrose.png"}},commonsSources:[]},{slug:"kaleidoscopic",title:"Kaleidoscopic Study",description:"Mandala-like symmetric patterns through polar coordinate folding. Three kaleidoscope styles: simple N-fold symmetry, iterative fractal folding for complex patterns, and spiral twist that warps with radius.",date:"2026-02-01",tags:["10-days","procedural"],links:{},screenshotUrl:w0,passes:{image:`/**\r
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
// --- Kaleidoscope Geometry ---\r
#define SIMPLE_SEGMENTS 6.0           // N-fold symmetry count — 4 = square, 6 = hex, 8+ = near-circular\r
#define HEX_FOLD_ANGLE (PI / 3.0)    // 60-degree wedge for iterative hex folding — PI/4 gives octagonal\r
#define ITERATIVE_PASSES 8            // Fractal fold depth — 4: coarse, 8: detailed, 12+: diminishing returns\r
#define SPIRAL_TWIST_CENTER 3.0       // Base twist amount — higher values wind the spiral tighter\r
#define SPIRAL_TWIST_RANGE 2.0        // Twist oscillation amplitude — 0: static, 2.0: moderate breathing\r
#define SPIRAL_SEGMENTS_CENTER 6.0    // Base segment count for spiral mode — same tuning as SIMPLE_SEGMENTS\r
#define SPIRAL_SEGMENTS_RANGE 2.0     // Segment oscillation amplitude — 0: fixed, 2.0: varies from 4 to 8\r
\r
// --- Animation ---\r
#define BREATHE_AMPLITUDE 0.3         // Zoom oscillation depth — 0: static, 0.3: gentle pulse, 0.8: dramatic\r
#define BREATHE_SPEED 0.8             // Zoom oscillation rate (rad/s) — higher = faster pulsing\r
#define CYCLE_SPEED 0.08              // Speed of cycling between kaleido modes — 0.08: ~38s full cycle\r
#define SIMPLE_ROTATION_SPEED 0.2     // Rotation speed for simple mode (rad/s) — keep < 1.0 to avoid nausea\r
#define ITER_ROT_BASE_SPEED 0.1       // Per-iteration rotation base speed — sets the slowest layer\r
#define ITER_ROT_INCREMENT 0.02       // Extra rotation per deeper iteration — creates speed gradient across layers\r
#define SPIRAL_ANGLE_SPEED 0.3        // Spiral rotation rate (rad/s) — adds swirl animation on top of twist\r
#define TRANSLATE_AMPLITUDE 0.05      // Per-iteration translation jitter — 0: rigid, 0.05: organic wobble\r
#define TRANSLATE_SPEED_X 0.5         // Horizontal translation oscillation rate\r
#define TRANSLATE_SPEED_Y 0.6         // Vertical translation oscillation rate — differs from X to avoid lissajous loops\r
#define ITER_SCALE_FACTOR 0.8         // Scale reduction per iteration — 0.5: rapid zoom, 0.8: gradual, 1.0: none\r
\r
// --- Fallback Pattern ---\r
#define RING_FREQUENCY 20.0           // Concentric ring density — higher = thinner rings\r
#define RING_SPEED 2.0                // Ring animation speed — scrolls rings inward/outward\r
#define SPOKE_COUNT 12.0              // Number of radial spokes — more = finer angular detail\r
#define CENTER_GLOW_RADIUS 0.3        // Fallback center glow fade distance — larger = wider glow\r
\r
// --- Post-Processing ---\r
#define EDGE_GLOW_WIDTH 0.02          // Fold-boundary glow thickness — smaller = sharper lines\r
#define EDGE_GLOW_BRIGHTNESS 0.3      // Fold-boundary glow intensity — 0: off, 0.3: subtle, 1.0: harsh\r
#define HIGHLIGHT_RADIUS 0.2          // Center highlight fade distance — larger = broader highlight\r
#define HIGHLIGHT_STRENGTH 0.5        // Center highlight intensity multiplier — 0: off, 0.5: gentle bloom\r
#define VIGNETTE_STRENGTH 0.6         // Edge darkening — 0: none, 0.6: cinematic, 1.5: tunnel vision\r
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
 *\r
 * TECHNIQUE: Polar coordinate folding\r
 * Converts to polar (angle, radius), uses mod() to map all angles into one\r
 * wedge of N segments, then mirrors within the wedge for bilateral symmetry.\r
 * The +PI offset shifts atan's discontinuity from 9 o'clock to 3 o'clock,\r
 * preventing visible seam artifacts in the final image.\r
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
 *\r
 * TECHNIQUE: Iterative fractal folding\r
 * Each iteration: rotate -> fold into 60-degree wedge -> abs-fold -> scale down.\r
 * Repeated folding creates fractal self-similarity at progressively smaller scales.\r
 * The abs(fract(p + 0.5) * 2.0 - 1.0) pattern creates a triangle-wave fold that\r
 * mirrors the domain without discontinuities, feeding each layer into the next.\r
 */\r
vec2 kaleidoIterative(vec2 p, float time, int iterations) {\r
    for (int i = 0; i < iterations; i++) {\r
        float fi = float(i);\r
\r
        // Rotate each iteration — deeper layers spin faster\r
        float rotSpeed = ITER_ROT_BASE_SPEED + fi * ITER_ROT_INCREMENT;\r
        p *= rot2D(time * rotSpeed);\r
\r
        // Fold into hex wedge\r
        float theta = atan(p.y, p.x) + PI;\r
        theta = (floor(theta / HEX_FOLD_ANGLE) + 0.5) * HEX_FOLD_ANGLE;\r
\r
        vec2 dir = vec2(cos(theta), sin(theta));\r
        vec2 codir = vec2(-dir.y, dir.x);\r
        p = vec2(dot(dir, p), dot(codir, p));\r
\r
        // Translate and fold — triangle-wave domain mirroring\r
        p += vec2(sin(time * TRANSLATE_SPEED_X + fi), cos(time * TRANSLATE_SPEED_Y + fi)) * TRANSLATE_AMPLITUDE;\r
        p = abs(fract(p + 0.5) * 2.0 - 1.0);\r
\r
        // Scale down for next iteration\r
        p *= ITER_SCALE_FACTOR;\r
    }\r
\r
    return p;\r
}\r
\r
/**\r
 * Spiral kaleidoscope - adds spiral twist\r
 *\r
 * TECHNIQUE: Spiral twist via radius-dependent angle offset\r
 * Before folding, the polar angle is offset by (radius * twist), creating an\r
 * Archimedean spiral distortion. Points farther from center rotate more,\r
 * producing the characteristic spiral arm pattern. The time-animated angle\r
 * addition makes the spiral appear to rotate continuously.\r
 */\r
vec2 kaleidoSpiral(vec2 p, float segments, float twist, float time) {\r
    // Shift angle by PI to move discontinuity from 9 o'clock to 3 o'clock\r
    float angle = atan(p.y, p.x) + PI;\r
    float radius = length(p);\r
\r
    // Add spiral twist based on radius\r
    angle += radius * twist + time * SPIRAL_ANGLE_SPEED;\r
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
 * Breathing zoom effect — sinusoidal scale oscillation\r
 */\r
float breathe(float time) {\r
    return 1.0 + sin(time * BREATHE_SPEED) * BREATHE_AMPLITUDE;\r
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
    float cycleTime = mod(time * CYCLE_SPEED, 3.0);\r
    vec2 kp;\r
\r
    if (cycleTime < 1.0) {\r
        // Simple N-fold symmetry\r
        kp = kaleido(p, SIMPLE_SEGMENTS);\r
        kp *= rot2D(time * SIMPLE_ROTATION_SPEED);\r
    } else if (cycleTime < 2.0) {\r
        // Iterative fractal kaleidoscope\r
        kp = kaleidoIterative(p, time, ITERATIVE_PASSES);\r
    } else {\r
        // Spiral kaleidoscope with oscillating params\r
        float segments = SPIRAL_SEGMENTS_CENTER + sin(time * SPIRAL_ANGLE_SPEED) * SPIRAL_SEGMENTS_RANGE;\r
        float twist = SPIRAL_TWIST_CENTER + sin(time * SIMPLE_ROTATION_SPEED) * SPIRAL_TWIST_RANGE;\r
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
        // Colorful geometric pattern when no texture is bound\r
        float dist = length(kp);\r
        float angle = atan(kp.y, kp.x);\r
\r
        // Concentric rings\r
        float rings = sin(dist * RING_FREQUENCY - time * RING_SPEED) * 0.5 + 0.5;\r
\r
        // Radial spokes\r
        float spokes = sin(angle * SPOKE_COUNT + time) * 0.5 + 0.5;\r
\r
        // Combine\r
        float pattern = rings * 0.5 + spokes * 0.5;\r
\r
        // Rainbow color\r
        vec3 col = 0.5 + 0.5 * cos(TAU * (pattern + time * 0.1 + vec3(0.0, 0.33, 0.67)));\r
\r
        // Center glow\r
        col += vec3(1.0, 0.8, 0.5) * smoothstep(CENTER_GLOW_RADIUS, 0.0, dist);\r
\r
        color = col;\r
    }\r
\r
    // === EDGE GLOW ===\r
    // Add glow at fold boundaries\r
    float edgeDist = min(abs(kp.x), abs(kp.y));\r
    float edge = smoothstep(EDGE_GLOW_WIDTH, 0.0, edgeDist);\r
    color += vec3(0.5, 0.7, 1.0) * edge * EDGE_GLOW_BRIGHTNESS;\r
\r
    // === CENTER HIGHLIGHT ===\r
    float centerGlow = smoothstep(HIGHLIGHT_RADIUS, 0.0, length(p / zoom));\r
    color += color * centerGlow * HIGHLIGHT_STRENGTH;\r
\r
    // === POST ===\r
    // Vignette\r
    float vig = 1.0 - length(uv - 0.5) * VIGNETTE_STRENGTH;\r
    color *= vig;\r
\r
    fragColor = vec4(color, 1.0);\r
}\r
`},channels:{image:{iChannel0:"textures/landscape.jpeg"}},commonsSources:[]},{slug:"liquid-glass",title:"Liquid Glass",description:"A frosted glass lens with Fresnel reflections and chromatic aberration, drifting over an input image like a billiard ball. Based on Genuary 2026 Day 23.",date:"2026-01-23",tags:["genuary","procedural"],links:{},screenshotUrl:_0,passes:{image:`/**
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
`},channels:{image:{iChannel0:"textures/landscape.jpeg"}},commonsSources:[]},{slug:"lorenz",title:"Attractor Study #02: Lorenz",description:"Lorenz strange attractor (1963), the classic 'butterfly effect' system. Distance-field line tracing with feedback accumulation. Velocity-mapped HSL coloring, continuous hue shift, and random blink pulses.",date:"2026-02-10",tags:["attractors","simulation"],links:{},screenshotUrl:C0,passes:{image:`/**
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

        float segD = dfLine(projectMat(last - center3d, viewRot, viewScale), projectMat(next - center3d, viewRot, viewScale), uv);
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
    float blink = hashN(blinkSeed) < 0.3
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
`},channels:{image:{iChannel0:"buffer-a"},bufferA:{iChannel0:"buffer-a"}},commonsSources:[{name:"noise-value",source:`/**
 * Value Noise (sin-hash family)
 * @author guinetik
 * @date 2026-02-15
 *
 * Hash-based value noise using the fract(sin(x)*43758) family.
 * Fast and simple, produces smooth non-directional noise suitable for terrain.
 * C1 continuous via Hermite smoothstep interpolation (3t^2 - 2t^3).
 *
 * Noise: Chosen for speed on desktop GPUs. For mobile or precision-sensitive
 * use cases, prefer noise-pcg.glsl which avoids sin-based hashing.
 */

// === HASH FUNCTIONS ===

/**
 * 1D hash — maps a float to a pseudo-random float in [0, 1).
 */
float hashN(float n) {
    return fract(sin(n) * 43758.5453123);
}

/**
 * 2D hash — maps a vec2 to a pseudo-random float in [0, 1).
 */
float hashN2(vec2 p) {
    float h = dot(p, vec2(127.1, 311.7));
    return fract(sin(h) * 43758.5453123);
}

// === VALUE NOISE ===

/**
 * 2D value noise with Hermite interpolation.
 *
 * @param p  2D position to sample
 * @return Noise value in [0, 1)
 */
float valueNoise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hashN2(i + vec2(0.0, 0.0)), hashN2(i + vec2(1.0, 0.0)), u.x),
               mix(hashN2(i + vec2(0.0, 1.0)), hashN2(i + vec2(1.0, 1.0)), u.x), u.y);
}

/**
 * 3D value noise with Hermite interpolation.
 *
 * Uses dot-product lattice hashing with step (1, 157, 113) for
 * decorrelated cell values.
 *
 * @param pos  3D position to sample
 * @return Noise value in [0, 1)
 */
float valueNoise3D(vec3 pos) {
    vec3 i = floor(pos);
    vec3 f = fract(pos);
    vec3 u = f * f * (3.0 - 2.0 * f);

    float n = dot(i, vec3(1.0, 157.0, 113.0));
    return mix(mix(mix(hashN(n + 0.0),   hashN(n + 1.0), u.x),
                   mix(hashN(n + 157.0), hashN(n + 158.0), u.x), u.y),
               mix(mix(hashN(n + 113.0), hashN(n + 114.0), u.x),
                   mix(hashN(n + 270.0), hashN(n + 271.0), u.x), u.y), u.z);
}

// === FBM ===

/**
 * Fractional Brownian Motion using 3D value noise.
 *
 * Sums multiple octaves of valueNoise3D with decreasing amplitude.
 * Domain is offset and rotated between octaves to decorrelate layers.
 *
 * @param pos        3D sample position
 * @param octaves    Number of noise octaves (1–8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0–3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4–0.5)
 * @return Normalized FBM value in approximately [0, 1)
 */
float fbmValue(vec3 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * valueNoise3D(pos);
        total += scale;
        pos += vec3(0.23, 0.77, 0.57);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}

/**
 * Fractional Brownian Motion using 2D value noise.
 *
 * Sums multiple octaves of valueNoise2D with decreasing amplitude.
 * Domain is offset between octaves to decorrelate layers.
 *
 * @param pos        2D sample position
 * @param octaves    Number of noise octaves (1-8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0-3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4-0.5)
 * @return Normalized FBM value in approximately [0, 1)
 */
float fbmValue2D(vec2 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * valueNoise2D(pos);
        total += scale;
        pos += vec2(0.23, 0.77);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}
`},{name:"color",source:`/**
 * Color Conversion Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless color space conversion functions.
 */

// === HSL TO RGB ===

/**
 * Convert HSL color to RGB.
 *
 * @param h  Hue in degrees (0–360, wraps automatically)
 * @param s  Saturation (0.0–1.0)
 * @param l  Lightness (0.0–1.0)
 * @return RGB color in [0, 1] per component
 */
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

// === HSV CONVERSIONS ===

/**
 * Convert RGB color to HSV.
 *
 * @param c  RGB color in [0, 1] per component
 * @return   HSV where H is in [0, 1] (not degrees), S and V in [0, 1]
 */
vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

/**
 * Convert HSV color to RGB.
 *
 * @param c  HSV where H is in [0, 1] (not degrees), S and V in [0, 1]
 * @return   RGB color in [0, 1] per component
 */
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
`},{name:"sdf",source:`/**
 * Signed Distance Field Primitives
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless distance field functions for 2D rendering.
 */

// === LINE SEGMENT ===

/**
 * Compute minimum distance from a point to a line segment.
 *
 * Returns the perpendicular distance from point \`p\` to the closest
 * point on the segment from \`a\` to \`b\`. Handles degenerate
 * zero-length segments gracefully.
 *
 * @param a  Segment start point
 * @param b  Segment end point
 * @param p  Query point
 * @return Distance from \`p\` to the nearest point on segment (a, b)
 */
float dfLine(vec2 a, vec2 b, vec2 p) {
    vec2 ab = b - a;
    float denom = dot(ab, ab);
    if (denom < 1e-10) return distance(a, p);
    float t = clamp(dot(p - a, ab) / denom, 0.0, 1.0);
    return distance(a + ab * t, p);
}
`},{name:"projection",source:`/**
 * 3D Projection Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless 3D-to-2D projection helpers for attractor rendering.
 * Provides rotation matrices and projection functions.
 */

// === ROTATION MATRICES ===

/**
 * Rotation matrix around the X axis.
 *
 * @param a  Angle in radians
 * @return 3x3 rotation matrix
 */
mat3 rotX(float a) {
    float c = cos(a), s = sin(a);
    return mat3(1,0,0, 0,c,-s, 0,s,c);
}

/**
 * Rotation matrix around the Y axis.
 *
 * @param a  Angle in radians
 * @return 3x3 rotation matrix
 */
mat3 rotY(float a) {
    float c = cos(a), s = sin(a);
    return mat3(c,0,s, 0,1,0, -s,0,c);
}

// === PROJECTION ===

/**
 * Project a 3D point to 2D screen space via rotation matrix.
 *
 * Applies the view rotation and scales the result. The Z component
 * is discarded (orthographic projection along the view axis).
 *
 * @param p        3D point to project
 * @param viewRot  Combined view rotation matrix (typically rotY * rotX)
 * @param scale    Screen scale factor (pixels per unit)
 * @return 2D screen-space position
 */
vec2 projectMat(vec3 p, mat3 viewRot, float scale) {
    return (viewRot * p).xy * scale;
}
`}]},{slug:"nebulae",title:"Nebulae Generator",description:"Procedural nebulae with heterogeneous density, dust lanes, emission knots, dark nebulae, galaxies, storms with lightning, and stars. Cinematic camera cuts with auto-pan or mouse drag override.",date:"2025-11-25",tags:["procedural","space"],links:{},screenshotUrl:T0,passes:{image:`/**\r
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
`},channels:{},commonsSources:[]},{slug:"planet-earth",title:"Earth-like Planet",description:"A procedural Earth-like world with oceans, forests, deserts, ice caps, clouds, and atmospheric scattering. All terrain generated from inline hash-based noise.",date:"2025-11-27",tags:["exoplanets","space","3d"],links:{},screenshotUrl:A0,passes:{image:`/**
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
 *
 * Commons: sphere, noise-value, normal-map, lighting, atmosphere
 */

// FBM for terrain height & clouds — wraps the commons fbmValue with
// Earth-specific parameters: 6 octaves, lacunarity 2.77, gain ~1/2.1
// Base frequency 1.5 controls continent size — higher = smaller continents
float Heightmap(vec3 pos) {
    return fbmValue(pos * 1.5, 6, 2.77, 1.0 / 2.1);
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
    vec2 uv = sphereUV(fragCoord, iResolution.xy, BASE_UV_SCALE);

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
        vec3 tropicsCol = mix(WATER_COL, TROPICS_COL, valueNoise3D(3.0 * noisePos));

        // If water...
        vec3 surfaceColor;
        float specAmount = 0.1;
        if (height < WATER_LEVEL) {
            surfaceColor = mix(WATER_COL, tropicsCol, pow(height / WATER_LEVEL, 16.0));
            vec3 wavesPos = pos;
            wavesPos.xz = Rotate(wavesPos.xz, 1.4);
            normal = normalize(normal + 0.08 * valueNoise3D(256.0 * (wavesPos + 0.04 * vec3(iTime))));
            specAmount = 0.55;
        }
        // Otherwise if land...
        else {

            // Find a tangent and binormal basis to use
            vec3 tangent, binormal;
            computeTangentBasis(noiseNormal, tangent, binormal);

            // Get surface normal via finite difference, rotate back into view space
            const float DX = 0.01;
            float scaledHeight = height * HEIGHT_SCALE;
            float dh_tangent = (scaledHeight - HEIGHT_SCALE * Heightmap(noisePos + DX * tangent)) / DX;
            float dh_binormal = (scaledHeight - HEIGHT_SCALE * Heightmap(noisePos + DX * binormal)) / DX;
            vec3 landNormal = perturbNormal(noiseNormal, tangent, binormal, dh_tangent, dh_binormal);
            landNormal.xz = Rotate(landNormal.xz, -surfaceRot);
            normal = landNormal;

            // Choose color
            vec3 landColor = mix(DESERT_COL, FOREST_COL,
                clamp(2.0 * valueNoise3D(2.0 * noisePos) - 0.8, 0.0, 1.0));
            landColor = mix(landColor, ICE_COL, smoothstep(0.7, 1.0, abs(pos.y)));
            float waterBlend = smoothstep(0.0, 0.01, height - WATER_LEVEL);
            specAmount = 0.55 * (1.0 - waterBlend);
            landColor = mix(tropicsCol, landColor, waterBlend);
            surfaceColor = mix(landColor, ICE_COL,
                smoothstep(WATER_LEVEL + 0.1, WATER_LEVEL + 0.2, height));
        }

        // Surface lighting — Blinn-Phong model with warm-tinted specular
        vec2 light = blinnPhong(normal, LIGHT_DIR, 15.0, specAmount, 0.05);
        fragColor.rgb = light.x * surfaceColor + vec3(1.0, 0.92, 0.81) * light.y; // Warm sun-tinted highlight

        // Clouds — separate noise layer with independent drift
        vec3 cloudPos = vec3(2.0, 6.0, 2.0) * noisePos + 0.07 * iTime;  // Anisotropic scale stretches clouds latitudinally
        cloudPos.xz = Rotate(cloudPos.xz, 0.007 * iTime);               // Slow jet-stream drift
        cloudPos.xy = Rotate(cloudPos.xy, 0.3);                          // Tilt cloud patterns off-axis
        float cloudMin = 0.35;                                            // FBM threshold for cloud formation
        float cloudAmt = 0.75 * smoothstep(cloudMin, 0.7, Heightmap(cloudPos)); // Max 75% opacity
        fragColor.rgb = mix(fragColor.rgb, vec3(pow(light.x, 0.9)), cloudAmt);  // Clouds lit by diffuse, slight gamma lift

        // TECHNIQUE: Fresnel-like atmospheric rim glow simulating Rayleigh scattering
        // Atmosphere blue intensifies at the limb where the optical path through
        // the atmosphere is longest, approximated by pow(1 - z, 1.2).
        vec3 atmosCol = ATMOS_COL * clamp(0.7 * light.x + 0.05, 0.0, 1.0);
        fragColor.rgb = atmosEdge(fragColor.rgb, atmosCol, uv, 0.6);          // Edge antialias
        fragColor.rgb += rimGlow(pos.z, atmosCol, 1.2, 1.0);                  // Rim glow — exponent 1.2 controls falloff width
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
`},channels:{},commonsSources:[{name:"sphere",source:`/**
 * Sphere Projection & Intersection Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless helpers for analytic sphere rendering:
 * 2D rotation, responsive UV-to-sphere projection, ray-sphere intersection,
 * and surface normal/UV extraction.
 */

// === 2D ROTATION ===

/**
 * Rotate a 2D vector by angle \`a\` (radians).
 * Equivalent to multiplying by mat2(cos(a), -sin(a), sin(a), cos(a)).
 */
vec2 Rotate(vec2 p, float a) {
    return p * cos(a) + vec2(-p.y, p.x) * sin(a);
}

// === SPHERE PROJECTION ===

/**
 * Compute responsive UV coordinates for unit-sphere rendering.
 *
 * Maps fragment coordinates to a centered coordinate system where the
 * unit sphere fills most of the viewport. On portrait screens, applies an
 * additional scale boost to shrink the sphere from ~91% to ~68% of viewport
 * width, preventing the sphere from dominating mobile displays.
 *
 * Portrait boost: linearly increases with portrait-ness (1 - aspect),
 * scaled by 0.7 for a natural feel. On landscape/square screens the boost
 * is zero and behavior is identical to the original formula.
 *
 * | Device             | Aspect | uvScale | Sphere width fill |
 * |--------------------|--------|---------|-------------------|
 * | Phone portrait     | 0.46   | 3.04    | ~68%              |
 * | iPad portrait      | 0.75   | 1.72    | ~78%              |
 * | Desktop 16:9       | 1.78   | 1.1     | ~51% (unchanged)  |
 *
 * @param fragCoord  Pixel coordinates (gl_FragCoord.xy)
 * @param resolution Viewport resolution (iResolution.xy)
 * @param baseScale  Base UV scale — larger zooms out (typically 1.1)
 * @return Centered UV coordinates where unit sphere has radius 1.0
 */
vec2 sphereUV(vec2 fragCoord, vec2 resolution, float baseScale) {
    float aspect = resolution.x / resolution.y;
    // Boost effective scale on portrait screens to shrink sphere from 91% → ~68% width fill
    float portraitBoost = max(0.0, 1.0 - aspect) * 0.7;
    float uvScale = (baseScale + portraitBoost) / min(1.0, aspect);
    return uvScale * (2.0 * fragCoord - resolution) / resolution.y;
}

// === RAY-SPHERE INTERSECTION ===

// Guard PI/TAU defines to avoid conflicts with shader-local constants
#ifndef M_PI
#define M_PI 3.14159265359
#endif
#ifndef M_TAU
#define M_TAU 6.28318530718
#endif

/**
 * Ray-sphere intersection via quadratic discriminant.
 *
 * Solves |ro + t*rd - center|^2 = radius^2 for the nearest positive t.
 * Returns -1.0 on miss (discriminant < 0 or both roots behind the ray).
 *
 * @param ro      Ray origin
 * @param rd      Ray direction (must be normalized)
 * @param center  Sphere center in world space
 * @param radius  Sphere radius
 * @return Nearest positive t, or -1.0 if no hit
 */
float intersectSphere(vec3 ro, vec3 rd, vec3 center, float radius) {
    vec3 oc = ro - center;
    float b = dot(oc, rd);
    float c = dot(oc, oc) - radius * radius;
    float h = b * b - c;

    if (h < 0.0) return -1.0;

    h = sqrt(h);
    float t = -b - h;

    if (t < 0.0) t = -b + h;
    if (t < 0.0) return -1.0;

    return t;
}

/**
 * Compute surface normal and spherical UV at a hit point on a sphere.
 *
 * Normal points outward from center. UV maps longitude to [0,1] on x
 * and latitude to [0,1] on y (0 = south pole, 1 = north pole).
 *
 * @param hitPoint  World-space intersection point
 * @param center    Sphere center
 * @param normal    (out) Unit surface normal
 * @param uv        (out) Spherical UV in [0,1]^2
 */
void getSphereInfo(vec3 hitPoint, vec3 center, out vec3 normal, out vec2 uv) {
    normal = normalize(hitPoint - center);
    float latitude = 0.5 + asin(normal.y) / M_PI;
    float longitude = 0.5 + atan(normal.x, normal.z) / M_TAU;
    uv = vec2(longitude, latitude);
}
`},{name:"noise-value",source:`/**
 * Value Noise (sin-hash family)
 * @author guinetik
 * @date 2026-02-15
 *
 * Hash-based value noise using the fract(sin(x)*43758) family.
 * Fast and simple, produces smooth non-directional noise suitable for terrain.
 * C1 continuous via Hermite smoothstep interpolation (3t^2 - 2t^3).
 *
 * Noise: Chosen for speed on desktop GPUs. For mobile or precision-sensitive
 * use cases, prefer noise-pcg.glsl which avoids sin-based hashing.
 */

// === HASH FUNCTIONS ===

/**
 * 1D hash — maps a float to a pseudo-random float in [0, 1).
 */
float hashN(float n) {
    return fract(sin(n) * 43758.5453123);
}

/**
 * 2D hash — maps a vec2 to a pseudo-random float in [0, 1).
 */
float hashN2(vec2 p) {
    float h = dot(p, vec2(127.1, 311.7));
    return fract(sin(h) * 43758.5453123);
}

// === VALUE NOISE ===

/**
 * 2D value noise with Hermite interpolation.
 *
 * @param p  2D position to sample
 * @return Noise value in [0, 1)
 */
float valueNoise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hashN2(i + vec2(0.0, 0.0)), hashN2(i + vec2(1.0, 0.0)), u.x),
               mix(hashN2(i + vec2(0.0, 1.0)), hashN2(i + vec2(1.0, 1.0)), u.x), u.y);
}

/**
 * 3D value noise with Hermite interpolation.
 *
 * Uses dot-product lattice hashing with step (1, 157, 113) for
 * decorrelated cell values.
 *
 * @param pos  3D position to sample
 * @return Noise value in [0, 1)
 */
float valueNoise3D(vec3 pos) {
    vec3 i = floor(pos);
    vec3 f = fract(pos);
    vec3 u = f * f * (3.0 - 2.0 * f);

    float n = dot(i, vec3(1.0, 157.0, 113.0));
    return mix(mix(mix(hashN(n + 0.0),   hashN(n + 1.0), u.x),
                   mix(hashN(n + 157.0), hashN(n + 158.0), u.x), u.y),
               mix(mix(hashN(n + 113.0), hashN(n + 114.0), u.x),
                   mix(hashN(n + 270.0), hashN(n + 271.0), u.x), u.y), u.z);
}

// === FBM ===

/**
 * Fractional Brownian Motion using 3D value noise.
 *
 * Sums multiple octaves of valueNoise3D with decreasing amplitude.
 * Domain is offset and rotated between octaves to decorrelate layers.
 *
 * @param pos        3D sample position
 * @param octaves    Number of noise octaves (1–8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0–3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4–0.5)
 * @return Normalized FBM value in approximately [0, 1)
 */
float fbmValue(vec3 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * valueNoise3D(pos);
        total += scale;
        pos += vec3(0.23, 0.77, 0.57);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}

/**
 * Fractional Brownian Motion using 2D value noise.
 *
 * Sums multiple octaves of valueNoise2D with decreasing amplitude.
 * Domain is offset between octaves to decorrelate layers.
 *
 * @param pos        2D sample position
 * @param octaves    Number of noise octaves (1-8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0-3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4-0.5)
 * @return Normalized FBM value in approximately [0, 1)
 */
float fbmValue2D(vec2 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * valueNoise2D(pos);
        total += scale;
        pos += vec2(0.23, 0.77);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}
`},{name:"normal-map",source:`/**
 * Normal Mapping Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless helpers for finite-difference normal perturbation on
 * analytic sphere surfaces. Provides tangent/binormal basis computation.
 *
 * TECHNIQUE: Finite-difference normal mapping. The caller samples their
 * height function at offset positions along the tangent and binormal,
 * then uses perturbNormal() to reconstruct the perturbed surface normal.
 *
 * Usage pattern in shader:
 *   vec3 tangent, binormal;
 *   computeTangentBasis(surfaceNormal, tangent, binormal);
 *   float dh_dt = (centerHeight - heightFunc(pos + DX * tangent)) / DX;
 *   float dh_db = (centerHeight - heightFunc(pos + DX * binormal)) / DX;
 *   vec3 normal = perturbNormal(surfaceNormal, tangent, binormal, dh_dt, dh_db);
 */

/**
 * Compute a tangent/binormal basis from a sphere surface normal.
 *
 * Uses cross products with the Y-axis to derive orthogonal tangent
 * and binormal vectors lying in the sphere's tangent plane.
 *
 * @param normal    Unit sphere surface normal (= position for unit sphere)
 * @param tangent   Output tangent vector (set by this function)
 * @param binormal  Output binormal vector (set by this function)
 */
void computeTangentBasis(vec3 normal, out vec3 tangent, out vec3 binormal) {
    tangent = normalize(cross(normal, vec3(0.0, 1.0, 0.0)));
    binormal = cross(normal, tangent);
}

/**
 * Reconstruct a perturbed normal from finite-difference height gradients.
 *
 * @param normal     Original surface normal
 * @param tangent    Tangent vector from computeTangentBasis
 * @param binormal   Binormal vector from computeTangentBasis
 * @param dh_tangent Height gradient along tangent direction (scaled height delta / DX)
 * @param dh_binorm  Height gradient along binormal direction (scaled height delta / DX)
 * @return Perturbed and normalized surface normal
 */
vec3 perturbNormal(vec3 normal, vec3 tangent, vec3 binormal, float dh_tangent, float dh_binorm) {
    return normalize(normal + tangent * dh_tangent + binormal * dh_binorm);
}
`},{name:"lighting",source:`/**
 * Lighting Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless Blinn-Phong lighting functions for surface rendering.
 * View direction is assumed to be +Z (screen-facing sphere).
 */

// === BLINN-PHONG ===

/**
 * Compute Blinn-Phong diffuse + specular lighting.
 *
 * Uses a fixed view direction of +Z (appropriate for screen-facing
 * analytic sphere rendering). Includes a small ambient floor.
 *
 * @param normal     Surface normal (normalized)
 * @param lightDir   Light direction (normalized, pointing toward the light)
 * @param shininess  Specular exponent — higher = tighter highlight (15–60 typical)
 * @param specAmount Specular intensity multiplier (0.0–1.0)
 * @param ambient    Ambient light floor (typically 0.05)
 * @return vec2(diffuse, specular) — combine as: diffuse * color + specular * lightColor
 */
vec2 blinnPhong(vec3 normal, vec3 lightDir, float shininess, float specAmount, float ambient) {
    float diffuse = ambient + clamp(dot(normal, lightDir), 0.0, 1.0);
    vec3 halfVec = normalize(lightDir + vec3(0.0, 0.0, 1.0));
    float specular = specAmount * pow(clamp(dot(normal, halfVec), 0.0, 1.0), shininess);
    return vec2(diffuse, specular);
}
`},{name:"atmosphere",source:`/**
 * Atmospheric Effects
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless helpers for planetary atmosphere rendering:
 * Fresnel-like rim glow and off-sphere halo.
 */

// === RIM GLOW ===

/**
 * Compute Fresnel-like atmospheric rim glow at the sphere limb.
 *
 * Simulates the increased optical path through a thin atmosphere at
 * grazing angles. The glow intensifies as the surface normal tilts
 * away from the viewer (posZ approaches 0).
 *
 * @param posZ       Z component of the unit-sphere position (0 at limb, 1 at center)
 * @param atmosColor Atmosphere tint color
 * @param exponent   Falloff exponent — higher = thinner rim (1.0–2.0 typical)
 * @param intensity  Overall glow strength multiplier
 * @return RGB rim glow contribution to add to the surface color
 */
vec3 rimGlow(float posZ, vec3 atmosColor, float exponent, float intensity) {
    return pow(1.0 - posZ, exponent) * atmosColor * intensity;
}

/**
 * Blend atmosphere color at the sphere edge for anti-aliased limb transition.
 *
 * @param color      Current surface color
 * @param atmosColor Atmosphere tint (pre-multiplied by diffuse)
 * @param uv         Current UV coordinates
 * @param blendScale Scale factor for the atmosphere blend (typically 0.5–0.6)
 * @return Blended color with smooth atmosphere edge
 */
vec3 atmosEdge(vec3 color, vec3 atmosColor, vec2 uv, float blendScale) {
    return mix(color, blendScale * atmosColor, smoothstep(0.993, 1.0, length(uv)));
}

// === HALO ===

/**
 * Compute off-sphere atmospheric halo glow.
 *
 * Renders the faint atmospheric glow visible in the space surrounding
 * the planet, strongest on the sun-facing side.
 *
 * @param uv         Current UV coordinates (off-sphere, length > 1.0)
 * @param atmosColor Atmosphere tint color
 * @param lightDir   Light direction (normalized)
 * @param intensity  Overall halo brightness multiplier
 * @return RGB halo color for off-sphere pixels
 */
vec3 halo(vec2 uv, vec3 atmosColor, vec3 lightDir, float intensity) {
    float dist = length(uv);
    vec3 dir = normalize(vec3(uv, 1.0));
    float falloff = smoothstep(1.3, 0.95, dist);
    float lightFacing = clamp(dot(dir, lightDir), 0.0, 1.0);
    return atmosColor * falloff * lightFacing * intensity;
}
`}]},{slug:"planet-gas-giant",title:"Gas Giant",description:"Jupiter-like gas giant with alternating tan zones and brown belts, turbulent eddies at band boundaries, and the Great Red Spot. Fully procedural with no texture dependencies.",date:"2025-11-27",tags:["exoplanets","space","3d"],links:{},screenshotUrl:R0,passes:{image:`/**
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
 * Noise: PCG-style hash noise from commons/noise-pcg.glsl. 5-octave 3D FBM for
 * atmospheric bands and 5-octave 1D FBM for storm features.
 *
 * Commons: sphere.glsl, noise-pcg.glsl, lighting.glsl, atmosphere.glsl
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
    vec2 uv = sphereUV(fragCoord, iResolution.xy, BASE_UV_SCALE);

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
        vec3 turb = pcgFbm3(12.0 * p);                            // 3-channel FBM for independent X/Y/Z turbulence
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
        vec3 detail = pcgFbm3(25.0 * vec3(0.3, 1.0, 0.3) * p);
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
        float stormNoise = pcgFbm1(10.0 * lat + 5.0);
        float storm = smoothstep(0.65, 0.85, stormNoise) * 0.15;
        color = mix(color, color * 1.3 + vec3(0.05, 0.03, 0.0), storm);

        // ── Lighting — Blinn-Phong with atmosphere-tinted specular ─────────
        vec2 light = blinnPhong(normal, LIGHT_DIR, 30.0, 0.1, 0.05);
        fragColor.rgb = light.x * color * 2.0 + ATMOS_COLOR * light.y;

        // Atmosphere limb
        vec3 atmosCol = ATMOS_COLOR * clamp(0.7 * light.x + 0.05, 0.0, 1.0);
        fragColor.rgb = atmosEdge(fragColor.rgb, atmosCol, uv, 0.5);
        fragColor.rgb += rimGlow(pos.z, atmosCol, 1.5, 0.5);
    }
    // Off sphere — atmospheric halo
    else {
        fragColor.rgb = halo(uv, ATMOS_COLOR, LIGHT_DIR, 0.3);
    }

    // Gamma correction — standard sRGB approximation (1/2.2 ~ 0.45)
    // max() protects against negative values before pow()
    fragColor.rgb = pow(max(fragColor.rgb, vec3(0.0)), vec3(0.45));
    fragColor.a = 1.0;
}
`},channels:{},commonsSources:[{name:"sphere",source:`/**
 * Sphere Projection & Intersection Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless helpers for analytic sphere rendering:
 * 2D rotation, responsive UV-to-sphere projection, ray-sphere intersection,
 * and surface normal/UV extraction.
 */

// === 2D ROTATION ===

/**
 * Rotate a 2D vector by angle \`a\` (radians).
 * Equivalent to multiplying by mat2(cos(a), -sin(a), sin(a), cos(a)).
 */
vec2 Rotate(vec2 p, float a) {
    return p * cos(a) + vec2(-p.y, p.x) * sin(a);
}

// === SPHERE PROJECTION ===

/**
 * Compute responsive UV coordinates for unit-sphere rendering.
 *
 * Maps fragment coordinates to a centered coordinate system where the
 * unit sphere fills most of the viewport. On portrait screens, applies an
 * additional scale boost to shrink the sphere from ~91% to ~68% of viewport
 * width, preventing the sphere from dominating mobile displays.
 *
 * Portrait boost: linearly increases with portrait-ness (1 - aspect),
 * scaled by 0.7 for a natural feel. On landscape/square screens the boost
 * is zero and behavior is identical to the original formula.
 *
 * | Device             | Aspect | uvScale | Sphere width fill |
 * |--------------------|--------|---------|-------------------|
 * | Phone portrait     | 0.46   | 3.04    | ~68%              |
 * | iPad portrait      | 0.75   | 1.72    | ~78%              |
 * | Desktop 16:9       | 1.78   | 1.1     | ~51% (unchanged)  |
 *
 * @param fragCoord  Pixel coordinates (gl_FragCoord.xy)
 * @param resolution Viewport resolution (iResolution.xy)
 * @param baseScale  Base UV scale — larger zooms out (typically 1.1)
 * @return Centered UV coordinates where unit sphere has radius 1.0
 */
vec2 sphereUV(vec2 fragCoord, vec2 resolution, float baseScale) {
    float aspect = resolution.x / resolution.y;
    // Boost effective scale on portrait screens to shrink sphere from 91% → ~68% width fill
    float portraitBoost = max(0.0, 1.0 - aspect) * 0.7;
    float uvScale = (baseScale + portraitBoost) / min(1.0, aspect);
    return uvScale * (2.0 * fragCoord - resolution) / resolution.y;
}

// === RAY-SPHERE INTERSECTION ===

// Guard PI/TAU defines to avoid conflicts with shader-local constants
#ifndef M_PI
#define M_PI 3.14159265359
#endif
#ifndef M_TAU
#define M_TAU 6.28318530718
#endif

/**
 * Ray-sphere intersection via quadratic discriminant.
 *
 * Solves |ro + t*rd - center|^2 = radius^2 for the nearest positive t.
 * Returns -1.0 on miss (discriminant < 0 or both roots behind the ray).
 *
 * @param ro      Ray origin
 * @param rd      Ray direction (must be normalized)
 * @param center  Sphere center in world space
 * @param radius  Sphere radius
 * @return Nearest positive t, or -1.0 if no hit
 */
float intersectSphere(vec3 ro, vec3 rd, vec3 center, float radius) {
    vec3 oc = ro - center;
    float b = dot(oc, rd);
    float c = dot(oc, oc) - radius * radius;
    float h = b * b - c;

    if (h < 0.0) return -1.0;

    h = sqrt(h);
    float t = -b - h;

    if (t < 0.0) t = -b + h;
    if (t < 0.0) return -1.0;

    return t;
}

/**
 * Compute surface normal and spherical UV at a hit point on a sphere.
 *
 * Normal points outward from center. UV maps longitude to [0,1] on x
 * and latitude to [0,1] on y (0 = south pole, 1 = north pole).
 *
 * @param hitPoint  World-space intersection point
 * @param center    Sphere center
 * @param normal    (out) Unit surface normal
 * @param uv        (out) Spherical UV in [0,1]^2
 */
void getSphereInfo(vec3 hitPoint, vec3 center, out vec3 normal, out vec2 uv) {
    normal = normalize(hitPoint - center);
    float latitude = 0.5 + asin(normal.y) / M_PI;
    float longitude = 0.5 + atan(normal.x, normal.z) / M_TAU;
    uv = vec2(longitude, latitude);
}
`},{name:"noise-pcg",source:`/**
 * PCG-Style Hash Noise
 * @author guinetik
 * @date 2026-02-15
 *
 * Hash-based value noise using PCG-style polynomial hashing.
 * Avoids sin-based precision issues on some mobile GPUs.
 * Includes 1D, 3D, and 4D hash variants plus FBM with a
 * decorrelation matrix to eliminate axis-aligned artifacts.
 *
 * Noise: Preferred over sin-hash for mobile/WebGL targets.
 * The decorrelation matrix between FBM octaves prevents visible
 * grid lines in banded atmospheric patterns.
 */

// === CONSTANTS ===

/**
 * Decorrelation matrix for 3D FBM.
 * Rotates and scales domain between octaves to eliminate axis-aligned
 * artifacts. The non-orthogonal entries create a pseudo-random rotation
 * that prevents visible grid lines in banded patterns.
 */
const mat3 PCG_FBM_MATRIX = mat3(
    0.51162, -1.54702, 1.15972,
   -1.70666, -0.92510, -0.48114,
    0.90858, -0.86654, -1.55678
);

// === HASH FUNCTIONS ===

/**
 * 1D PCG-style hash — maps a float to pseudo-random [0, 1).
 */
float pcgHash1(float p) {
    p = fract(p * 0.1031);
    p *= p + 33.33;
    p *= p + p;
    return fract(p);
}

/**
 * 3D PCG-style hash — maps vec3 to pseudo-random vec3 in [0, 1).
 */
vec3 pcgHash3(vec3 p3) {
    p3 = fract(p3 * vec3(0.1031, 0.1030, 0.0973));
    p3 += dot(p3, p3.yxz + 33.33);
    return fract((p3.xxy + p3.yxx) * p3.zyx);
}

/**
 * 4D PCG-style hash — maps a float to pseudo-random vec4 in [0, 1).
 * Useful for seed-based parameter generation.
 */
vec4 pcgHash4(float p) {
    vec4 p4 = fract(vec4(p) * vec4(0.1031, 0.1030, 0.0973, 0.1099));
    p4 += dot(p4, p4.wzxy + 33.33);
    return fract((p4.xxyz + p4.yzzw) * p4.zywx);
}

// === NOISE FUNCTIONS ===

/**
 * 1D value noise from PCG hash with Hermite interpolation.
 * @return Noise value in [-1, 1]
 */
float pcgNoise1(float p) {
    float i = floor(p);
    float f = fract(p);
    float u = f * f * (3.0 - 2.0 * f);
    return 1.0 - 2.0 * mix(pcgHash1(i), pcgHash1(i + 1.0), u);
}

/**
 * 3D value noise from PCG hash with Hermite interpolation.
 * @return Noise vec3 in [-1, 1] per component
 */
vec3 pcgNoise3(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return 1.0 - 2.0 * mix(
        mix(mix(pcgHash3(i + vec3(0.0, 0.0, 0.0)),
                pcgHash3(i + vec3(1.0, 0.0, 0.0)), u.x),
            mix(pcgHash3(i + vec3(0.0, 1.0, 0.0)),
                pcgHash3(i + vec3(1.0, 1.0, 0.0)), u.x), u.y),
        mix(mix(pcgHash3(i + vec3(0.0, 0.0, 1.0)),
                pcgHash3(i + vec3(1.0, 0.0, 1.0)), u.x),
            mix(pcgHash3(i + vec3(0.0, 1.0, 1.0)),
                pcgHash3(i + vec3(1.0, 1.0, 1.0)), u.x), u.y), u.z);
}

// === FBM ===

/**
 * 1D Fractional Brownian Motion using PCG noise.
 *
 * 5 octaves, lacunarity 2.0, gain 0.5.
 * @param p  1D sample position
 * @return Normalized FBM value in approximately [-1, 1]
 */
float pcgFbm1(float p) {
    float f = pcgNoise1(p); p = 2.0 * p;
    f += 0.5 * pcgNoise1(p); p = 2.0 * p;
    f += 0.25 * pcgNoise1(p); p = 2.0 * p;
    f += 0.125 * pcgNoise1(p); p = 2.0 * p;
    f += 0.0625 * pcgNoise1(p);
    return f / 1.9375;
}

/**
 * 3D Fractional Brownian Motion using PCG noise with decorrelation matrix.
 *
 * 5 octaves with PCG_FBM_MATRIX applied between octaves to prevent
 * axis-aligned grid artifacts in banded patterns.
 *
 * @param p  3D sample position
 * @return Normalized FBM vec3 in approximately [-1, 1] per component
 */
vec3 pcgFbm3(vec3 p) {
    vec3 f = pcgNoise3(p); p = PCG_FBM_MATRIX * p;
    f += 0.5 * pcgNoise3(p); p = PCG_FBM_MATRIX * p;
    f += 0.25 * pcgNoise3(p); p = PCG_FBM_MATRIX * p;
    f += 0.125 * pcgNoise3(p); p = PCG_FBM_MATRIX * p;
    f += 0.0625 * pcgNoise3(p);
    return f / 1.9375;
}
`},{name:"lighting",source:`/**
 * Lighting Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless Blinn-Phong lighting functions for surface rendering.
 * View direction is assumed to be +Z (screen-facing sphere).
 */

// === BLINN-PHONG ===

/**
 * Compute Blinn-Phong diffuse + specular lighting.
 *
 * Uses a fixed view direction of +Z (appropriate for screen-facing
 * analytic sphere rendering). Includes a small ambient floor.
 *
 * @param normal     Surface normal (normalized)
 * @param lightDir   Light direction (normalized, pointing toward the light)
 * @param shininess  Specular exponent — higher = tighter highlight (15–60 typical)
 * @param specAmount Specular intensity multiplier (0.0–1.0)
 * @param ambient    Ambient light floor (typically 0.05)
 * @return vec2(diffuse, specular) — combine as: diffuse * color + specular * lightColor
 */
vec2 blinnPhong(vec3 normal, vec3 lightDir, float shininess, float specAmount, float ambient) {
    float diffuse = ambient + clamp(dot(normal, lightDir), 0.0, 1.0);
    vec3 halfVec = normalize(lightDir + vec3(0.0, 0.0, 1.0));
    float specular = specAmount * pow(clamp(dot(normal, halfVec), 0.0, 1.0), shininess);
    return vec2(diffuse, specular);
}
`},{name:"atmosphere",source:`/**
 * Atmospheric Effects
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless helpers for planetary atmosphere rendering:
 * Fresnel-like rim glow and off-sphere halo.
 */

// === RIM GLOW ===

/**
 * Compute Fresnel-like atmospheric rim glow at the sphere limb.
 *
 * Simulates the increased optical path through a thin atmosphere at
 * grazing angles. The glow intensifies as the surface normal tilts
 * away from the viewer (posZ approaches 0).
 *
 * @param posZ       Z component of the unit-sphere position (0 at limb, 1 at center)
 * @param atmosColor Atmosphere tint color
 * @param exponent   Falloff exponent — higher = thinner rim (1.0–2.0 typical)
 * @param intensity  Overall glow strength multiplier
 * @return RGB rim glow contribution to add to the surface color
 */
vec3 rimGlow(float posZ, vec3 atmosColor, float exponent, float intensity) {
    return pow(1.0 - posZ, exponent) * atmosColor * intensity;
}

/**
 * Blend atmosphere color at the sphere edge for anti-aliased limb transition.
 *
 * @param color      Current surface color
 * @param atmosColor Atmosphere tint (pre-multiplied by diffuse)
 * @param uv         Current UV coordinates
 * @param blendScale Scale factor for the atmosphere blend (typically 0.5–0.6)
 * @return Blended color with smooth atmosphere edge
 */
vec3 atmosEdge(vec3 color, vec3 atmosColor, vec2 uv, float blendScale) {
    return mix(color, blendScale * atmosColor, smoothstep(0.993, 1.0, length(uv)));
}

// === HALO ===

/**
 * Compute off-sphere atmospheric halo glow.
 *
 * Renders the faint atmospheric glow visible in the space surrounding
 * the planet, strongest on the sun-facing side.
 *
 * @param uv         Current UV coordinates (off-sphere, length > 1.0)
 * @param atmosColor Atmosphere tint color
 * @param lightDir   Light direction (normalized)
 * @param intensity  Overall halo brightness multiplier
 * @return RGB halo color for off-sphere pixels
 */
vec3 halo(vec2 uv, vec3 atmosColor, vec3 lightDir, float intensity) {
    float dist = length(uv);
    vec3 dir = normalize(vec3(uv, 1.0));
    float falloff = smoothstep(1.3, 0.95, dist);
    float lightFacing = clamp(dot(dir, lightDir), 0.0, 1.0);
    return atmosColor * falloff * lightFacing * intensity;
}
`}]},{slug:"planet-lava",title:"Lava World",description:"A molten lava planet with boiling surface, glowing cracks, atmospheric haze, and volumetric corona rays. Fully procedural using simplex noise.",date:"2025-11-27",tags:["exoplanets","space","3d"],links:{},screenshotUrl:I0,passes:{image:`/**
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
    vec2 uv = sphereUV(fragCoord, iResolution.xy, BASE_UV_SCALE);

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
        vec3 tangent, binormal;
        computeTangentBasis(noisePos, tangent, binormal);
        const float DX = 0.01;              // Finite-difference step for normal computation — smaller = sharper but noisier
        const float HEIGHT_SCALE = 0.08;   // Normal perturbation amplitude — higher = bumpier crust terrain
        float he = height * HEIGHT_SCALE;
        float dh_tangent = (he - HEIGHT_SCALE * crustHeight(noisePos + DX * tangent)) / DX;
        float dh_binormal = (he - HEIGHT_SCALE * crustHeight(noisePos + DX * binormal)) / DX;
        vec3 surfNormal = perturbNormal(noisePos, tangent, binormal, dh_tangent, dh_binormal);
        surfNormal.xz = Rotate(surfNormal.xz, -surfaceRot);
        normal = normalize(mix(surfNormal, pos, 0.9));

        // Compute lava heat and map to color
        float heat = lavaHeat(noisePos, iTime);
        vec3 surfaceColor = lavaRamp(heat);

        // Lighting — diffuse on crust, emission from hot areas
        vec2 light = blinnPhong(normal, LIGHT_DIR, 30.0, 0.0, 0.05);
        float diffuse = light.x;

        // Dark crust is lit by the sun; hot areas emit their own light
        vec3 litCrust = surfaceColor * diffuse;
        vec3 emission = surfaceColor * heat * heat * 2.0;
        fragColor.rgb = mix(litCrust, litCrust + emission, heat);

        // TECHNIQUE: Rim glow simulating hot atmospheric haze at limb
        // pow(1-z, 1.5) approximates long optical path through volcanic atmosphere
        fragColor.rgb += rimGlow(pos.z, RIM_COL, 1.5, 0.8);

        // Atmosphere edge blend
        vec3 atmosCol = ATMOS_COL * clamp(0.7 * diffuse + 0.05, 0.0, 1.0);
        fragColor.rgb = atmosEdge(fragColor.rgb, atmosCol, uv, 1.0);
        fragColor.rgb += rimGlow(pos.z, ATMOS_COL, 1.5, 0.4);
    }
    // Off sphere — atmospheric halo
    else {
        fragColor.rgb = halo(uv, ATMOS_COL, LIGHT_DIR, 1.5);
    }

    // Gamma — 0.9 exponent (slightly less than standard 0.45) to preserve
    // contrast in the dark crust while boosting lava glow visibility
    fragColor.rgb = pow(fragColor.rgb, vec3(0.9));
    fragColor.a = 1.0;
}
`},channels:{},commonsSources:[{name:"sphere",source:`/**
 * Sphere Projection & Intersection Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless helpers for analytic sphere rendering:
 * 2D rotation, responsive UV-to-sphere projection, ray-sphere intersection,
 * and surface normal/UV extraction.
 */

// === 2D ROTATION ===

/**
 * Rotate a 2D vector by angle \`a\` (radians).
 * Equivalent to multiplying by mat2(cos(a), -sin(a), sin(a), cos(a)).
 */
vec2 Rotate(vec2 p, float a) {
    return p * cos(a) + vec2(-p.y, p.x) * sin(a);
}

// === SPHERE PROJECTION ===

/**
 * Compute responsive UV coordinates for unit-sphere rendering.
 *
 * Maps fragment coordinates to a centered coordinate system where the
 * unit sphere fills most of the viewport. On portrait screens, applies an
 * additional scale boost to shrink the sphere from ~91% to ~68% of viewport
 * width, preventing the sphere from dominating mobile displays.
 *
 * Portrait boost: linearly increases with portrait-ness (1 - aspect),
 * scaled by 0.7 for a natural feel. On landscape/square screens the boost
 * is zero and behavior is identical to the original formula.
 *
 * | Device             | Aspect | uvScale | Sphere width fill |
 * |--------------------|--------|---------|-------------------|
 * | Phone portrait     | 0.46   | 3.04    | ~68%              |
 * | iPad portrait      | 0.75   | 1.72    | ~78%              |
 * | Desktop 16:9       | 1.78   | 1.1     | ~51% (unchanged)  |
 *
 * @param fragCoord  Pixel coordinates (gl_FragCoord.xy)
 * @param resolution Viewport resolution (iResolution.xy)
 * @param baseScale  Base UV scale — larger zooms out (typically 1.1)
 * @return Centered UV coordinates where unit sphere has radius 1.0
 */
vec2 sphereUV(vec2 fragCoord, vec2 resolution, float baseScale) {
    float aspect = resolution.x / resolution.y;
    // Boost effective scale on portrait screens to shrink sphere from 91% → ~68% width fill
    float portraitBoost = max(0.0, 1.0 - aspect) * 0.7;
    float uvScale = (baseScale + portraitBoost) / min(1.0, aspect);
    return uvScale * (2.0 * fragCoord - resolution) / resolution.y;
}

// === RAY-SPHERE INTERSECTION ===

// Guard PI/TAU defines to avoid conflicts with shader-local constants
#ifndef M_PI
#define M_PI 3.14159265359
#endif
#ifndef M_TAU
#define M_TAU 6.28318530718
#endif

/**
 * Ray-sphere intersection via quadratic discriminant.
 *
 * Solves |ro + t*rd - center|^2 = radius^2 for the nearest positive t.
 * Returns -1.0 on miss (discriminant < 0 or both roots behind the ray).
 *
 * @param ro      Ray origin
 * @param rd      Ray direction (must be normalized)
 * @param center  Sphere center in world space
 * @param radius  Sphere radius
 * @return Nearest positive t, or -1.0 if no hit
 */
float intersectSphere(vec3 ro, vec3 rd, vec3 center, float radius) {
    vec3 oc = ro - center;
    float b = dot(oc, rd);
    float c = dot(oc, oc) - radius * radius;
    float h = b * b - c;

    if (h < 0.0) return -1.0;

    h = sqrt(h);
    float t = -b - h;

    if (t < 0.0) t = -b + h;
    if (t < 0.0) return -1.0;

    return t;
}

/**
 * Compute surface normal and spherical UV at a hit point on a sphere.
 *
 * Normal points outward from center. UV maps longitude to [0,1] on x
 * and latitude to [0,1] on y (0 = south pole, 1 = north pole).
 *
 * @param hitPoint  World-space intersection point
 * @param center    Sphere center
 * @param normal    (out) Unit surface normal
 * @param uv        (out) Spherical UV in [0,1]^2
 */
void getSphereInfo(vec3 hitPoint, vec3 center, out vec3 normal, out vec2 uv) {
    normal = normalize(hitPoint - center);
    float latitude = 0.5 + asin(normal.y) / M_PI;
    float longitude = 0.5 + atan(normal.x, normal.z) / M_TAU;
    uv = vec2(longitude, latitude);
}
`},{name:"normal-map",source:`/**
 * Normal Mapping Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless helpers for finite-difference normal perturbation on
 * analytic sphere surfaces. Provides tangent/binormal basis computation.
 *
 * TECHNIQUE: Finite-difference normal mapping. The caller samples their
 * height function at offset positions along the tangent and binormal,
 * then uses perturbNormal() to reconstruct the perturbed surface normal.
 *
 * Usage pattern in shader:
 *   vec3 tangent, binormal;
 *   computeTangentBasis(surfaceNormal, tangent, binormal);
 *   float dh_dt = (centerHeight - heightFunc(pos + DX * tangent)) / DX;
 *   float dh_db = (centerHeight - heightFunc(pos + DX * binormal)) / DX;
 *   vec3 normal = perturbNormal(surfaceNormal, tangent, binormal, dh_dt, dh_db);
 */

/**
 * Compute a tangent/binormal basis from a sphere surface normal.
 *
 * Uses cross products with the Y-axis to derive orthogonal tangent
 * and binormal vectors lying in the sphere's tangent plane.
 *
 * @param normal    Unit sphere surface normal (= position for unit sphere)
 * @param tangent   Output tangent vector (set by this function)
 * @param binormal  Output binormal vector (set by this function)
 */
void computeTangentBasis(vec3 normal, out vec3 tangent, out vec3 binormal) {
    tangent = normalize(cross(normal, vec3(0.0, 1.0, 0.0)));
    binormal = cross(normal, tangent);
}

/**
 * Reconstruct a perturbed normal from finite-difference height gradients.
 *
 * @param normal     Original surface normal
 * @param tangent    Tangent vector from computeTangentBasis
 * @param binormal   Binormal vector from computeTangentBasis
 * @param dh_tangent Height gradient along tangent direction (scaled height delta / DX)
 * @param dh_binorm  Height gradient along binormal direction (scaled height delta / DX)
 * @return Perturbed and normalized surface normal
 */
vec3 perturbNormal(vec3 normal, vec3 tangent, vec3 binormal, float dh_tangent, float dh_binorm) {
    return normalize(normal + tangent * dh_tangent + binormal * dh_binorm);
}
`},{name:"lighting",source:`/**
 * Lighting Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless Blinn-Phong lighting functions for surface rendering.
 * View direction is assumed to be +Z (screen-facing sphere).
 */

// === BLINN-PHONG ===

/**
 * Compute Blinn-Phong diffuse + specular lighting.
 *
 * Uses a fixed view direction of +Z (appropriate for screen-facing
 * analytic sphere rendering). Includes a small ambient floor.
 *
 * @param normal     Surface normal (normalized)
 * @param lightDir   Light direction (normalized, pointing toward the light)
 * @param shininess  Specular exponent — higher = tighter highlight (15–60 typical)
 * @param specAmount Specular intensity multiplier (0.0–1.0)
 * @param ambient    Ambient light floor (typically 0.05)
 * @return vec2(diffuse, specular) — combine as: diffuse * color + specular * lightColor
 */
vec2 blinnPhong(vec3 normal, vec3 lightDir, float shininess, float specAmount, float ambient) {
    float diffuse = ambient + clamp(dot(normal, lightDir), 0.0, 1.0);
    vec3 halfVec = normalize(lightDir + vec3(0.0, 0.0, 1.0));
    float specular = specAmount * pow(clamp(dot(normal, halfVec), 0.0, 1.0), shininess);
    return vec2(diffuse, specular);
}
`},{name:"atmosphere",source:`/**
 * Atmospheric Effects
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless helpers for planetary atmosphere rendering:
 * Fresnel-like rim glow and off-sphere halo.
 */

// === RIM GLOW ===

/**
 * Compute Fresnel-like atmospheric rim glow at the sphere limb.
 *
 * Simulates the increased optical path through a thin atmosphere at
 * grazing angles. The glow intensifies as the surface normal tilts
 * away from the viewer (posZ approaches 0).
 *
 * @param posZ       Z component of the unit-sphere position (0 at limb, 1 at center)
 * @param atmosColor Atmosphere tint color
 * @param exponent   Falloff exponent — higher = thinner rim (1.0–2.0 typical)
 * @param intensity  Overall glow strength multiplier
 * @return RGB rim glow contribution to add to the surface color
 */
vec3 rimGlow(float posZ, vec3 atmosColor, float exponent, float intensity) {
    return pow(1.0 - posZ, exponent) * atmosColor * intensity;
}

/**
 * Blend atmosphere color at the sphere edge for anti-aliased limb transition.
 *
 * @param color      Current surface color
 * @param atmosColor Atmosphere tint (pre-multiplied by diffuse)
 * @param uv         Current UV coordinates
 * @param blendScale Scale factor for the atmosphere blend (typically 0.5–0.6)
 * @return Blended color with smooth atmosphere edge
 */
vec3 atmosEdge(vec3 color, vec3 atmosColor, vec2 uv, float blendScale) {
    return mix(color, blendScale * atmosColor, smoothstep(0.993, 1.0, length(uv)));
}

// === HALO ===

/**
 * Compute off-sphere atmospheric halo glow.
 *
 * Renders the faint atmospheric glow visible in the space surrounding
 * the planet, strongest on the sun-facing side.
 *
 * @param uv         Current UV coordinates (off-sphere, length > 1.0)
 * @param atmosColor Atmosphere tint color
 * @param lightDir   Light direction (normalized)
 * @param intensity  Overall halo brightness multiplier
 * @return RGB halo color for off-sphere pixels
 */
vec3 halo(vec2 uv, vec3 atmosColor, vec3 lightDir, float intensity) {
    float dist = length(uv);
    vec3 dir = normalize(vec3(uv, 1.0));
    float falloff = smoothstep(1.3, 0.95, dist);
    float lightFacing = clamp(dot(dir, lightDir), 0.0, 1.0);
    return atmosColor * falloff * lightFacing * intensity;
}
`}]},{slug:"planet-neptune-like",title:"Neptune-like",description:"A Neptune-like ice giant with colorful banded atmosphere, turbulent storms, and dramatic lighting. Fully procedural with no texture dependencies.",date:"2025-11-27",tags:["exoplanets","space","3d"],links:{},screenshotUrl:N0,passes:{image:`/**
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
 * Noise: PCG-style hash noise from commons/noise-pcg.glsl with a decorrelation
 * matrix (PCG_FBM_MATRIX) applied between FBM octaves. The matrix rotates and
 * scales the domain to eliminate axis-aligned artifacts that would otherwise
 * create visible grid lines on the planetary bands. 5-octave FBM provides
 * detail from broad belt structure down to fine turbulent wisps.
 *
 * Commons: sphere.glsl, noise-pcg.glsl, lighting.glsl, atmosphere.glsl
 */

const float tau = 6.283185;  // 2*PI — full circle in radians

vec3 hsv(float hue, float sat, float val) {
    return val * (vec3(1.0 - sat) + sat * (0.5 + 0.5 * cos(6.2831853 * (vec3(hue) + vec3(0.0, 0.33, 0.67)))));
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
    vec4 planetHash = pcgHash4(seed + 0.3);
    vec3 planetColor = hsv(planetHash.x, 0.5, 0.5 + 0.2 * planetHash.y);          // Base band color
    vec3 planetMinorX = hsv(planetHash.x, 0.3, 0.5 + 0.2 * planetHash.y + 0.3 * planetHash.w) - planetColor;  // Band variation axis X
    vec3 planetMinorY = hsv(planetHash.x + 0.4 * planetHash.z, 0.5, 0.5 + 0.2 * planetHash.y) - planetColor;  // Band variation axis Y
    vec3 planetMinorZ = hsv(planetHash.x + 0.4 * planetHash.z, 0.3, 0.5 + 0.2 * planetHash.y - 0.4 * planetHash.w) - planetColor; // Band variation axis Z

    // Atmospheric glow color — derived from same hue family for consistency
    vec3 atmosColor = hsv(planetHash.x, 0.3, 0.7);

    // Map window to -1..1, planet has r=1
    vec2 uv = sphereUV(fragCoord, iResolution.xy, BASE_UV_SCALE);

    float z2 = 1.0 - uv.x * uv.x - uv.y * uv.y;
    if (z2 >= 0.0) {
        // Unit sphere
        vec3 pos = vec3(uv, sqrt(z2));
        vec3 normal = pos;

        // Auto rotation
        vec3 noisePos = pos;
        float surfaceRot = -0.8 * iTime;    // Rotation speed — negative = eastward spin (SUPER fast)
        noisePos.xz = Rotate(noisePos.xz, surfaceRot);

        // Use Y (screen vertical) as latitude for horizontal bands
        // Add slight turbulence to break up perfect stripes
        vec3 p = noisePos;
        p += bandTurbulence * pcgFbm3(10.0 * p);  // Turbulence displacement — breaks geometric perfection

        // TECHNIQUE: Anisotropic band scaling — vec3(0.05, 1.0, 0.05) compresses
        // X and Z by 20x, stretching features into horizontal bands while keeping
        // latitudinal variation at full resolution
        vec3 bands = pcgFbm3(bandScale * vec3(0.05, 1.0, 0.05) * p + seed);
        vec3 color = planetColor;
        color += planetMinorX * bands.x;
        color += planetMinorY * bands.y;
        color += planetMinorZ * bands.z;

        // Storm features — large oval spots at certain latitudes
        float stormNoise = pcgFbm1(8.0 * p.y + seed);
        float storm = smoothstep(0.6, 0.8, stormNoise) * 0.3;
        color = mix(color, color * 1.5 + vec3(0.1), storm);

        // Lighting — Blinn-Phong with atmosphere-tinted specular
        vec2 light = blinnPhong(normal, LIGHT_DIR, 20.0, 0.15, 0.05);
        fragColor.rgb = light.x * color * 2.0 + atmosColor * light.y;

        // TECHNIQUE: Fresnel-like atmospheric rim — intensifies at limb where
        // optical path through the atmosphere is longest
        vec3 atmosCol = atmosColor * clamp(0.7 * light.x + 0.05, 0.0, 1.0);
        fragColor.rgb = atmosEdge(fragColor.rgb, atmosCol, uv, 0.6);
        fragColor.rgb += rimGlow(pos.z, atmosCol, 1.2, 0.8);
    }
    // Off sphere — atmospheric halo
    else {
        fragColor.rgb = halo(uv, atmosColor, LIGHT_DIR, 0.5);
    }

    fragColor.a = 1.0;
}
`},channels:{},commonsSources:[{name:"sphere",source:`/**
 * Sphere Projection & Intersection Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless helpers for analytic sphere rendering:
 * 2D rotation, responsive UV-to-sphere projection, ray-sphere intersection,
 * and surface normal/UV extraction.
 */

// === 2D ROTATION ===

/**
 * Rotate a 2D vector by angle \`a\` (radians).
 * Equivalent to multiplying by mat2(cos(a), -sin(a), sin(a), cos(a)).
 */
vec2 Rotate(vec2 p, float a) {
    return p * cos(a) + vec2(-p.y, p.x) * sin(a);
}

// === SPHERE PROJECTION ===

/**
 * Compute responsive UV coordinates for unit-sphere rendering.
 *
 * Maps fragment coordinates to a centered coordinate system where the
 * unit sphere fills most of the viewport. On portrait screens, applies an
 * additional scale boost to shrink the sphere from ~91% to ~68% of viewport
 * width, preventing the sphere from dominating mobile displays.
 *
 * Portrait boost: linearly increases with portrait-ness (1 - aspect),
 * scaled by 0.7 for a natural feel. On landscape/square screens the boost
 * is zero and behavior is identical to the original formula.
 *
 * | Device             | Aspect | uvScale | Sphere width fill |
 * |--------------------|--------|---------|-------------------|
 * | Phone portrait     | 0.46   | 3.04    | ~68%              |
 * | iPad portrait      | 0.75   | 1.72    | ~78%              |
 * | Desktop 16:9       | 1.78   | 1.1     | ~51% (unchanged)  |
 *
 * @param fragCoord  Pixel coordinates (gl_FragCoord.xy)
 * @param resolution Viewport resolution (iResolution.xy)
 * @param baseScale  Base UV scale — larger zooms out (typically 1.1)
 * @return Centered UV coordinates where unit sphere has radius 1.0
 */
vec2 sphereUV(vec2 fragCoord, vec2 resolution, float baseScale) {
    float aspect = resolution.x / resolution.y;
    // Boost effective scale on portrait screens to shrink sphere from 91% → ~68% width fill
    float portraitBoost = max(0.0, 1.0 - aspect) * 0.7;
    float uvScale = (baseScale + portraitBoost) / min(1.0, aspect);
    return uvScale * (2.0 * fragCoord - resolution) / resolution.y;
}

// === RAY-SPHERE INTERSECTION ===

// Guard PI/TAU defines to avoid conflicts with shader-local constants
#ifndef M_PI
#define M_PI 3.14159265359
#endif
#ifndef M_TAU
#define M_TAU 6.28318530718
#endif

/**
 * Ray-sphere intersection via quadratic discriminant.
 *
 * Solves |ro + t*rd - center|^2 = radius^2 for the nearest positive t.
 * Returns -1.0 on miss (discriminant < 0 or both roots behind the ray).
 *
 * @param ro      Ray origin
 * @param rd      Ray direction (must be normalized)
 * @param center  Sphere center in world space
 * @param radius  Sphere radius
 * @return Nearest positive t, or -1.0 if no hit
 */
float intersectSphere(vec3 ro, vec3 rd, vec3 center, float radius) {
    vec3 oc = ro - center;
    float b = dot(oc, rd);
    float c = dot(oc, oc) - radius * radius;
    float h = b * b - c;

    if (h < 0.0) return -1.0;

    h = sqrt(h);
    float t = -b - h;

    if (t < 0.0) t = -b + h;
    if (t < 0.0) return -1.0;

    return t;
}

/**
 * Compute surface normal and spherical UV at a hit point on a sphere.
 *
 * Normal points outward from center. UV maps longitude to [0,1] on x
 * and latitude to [0,1] on y (0 = south pole, 1 = north pole).
 *
 * @param hitPoint  World-space intersection point
 * @param center    Sphere center
 * @param normal    (out) Unit surface normal
 * @param uv        (out) Spherical UV in [0,1]^2
 */
void getSphereInfo(vec3 hitPoint, vec3 center, out vec3 normal, out vec2 uv) {
    normal = normalize(hitPoint - center);
    float latitude = 0.5 + asin(normal.y) / M_PI;
    float longitude = 0.5 + atan(normal.x, normal.z) / M_TAU;
    uv = vec2(longitude, latitude);
}
`},{name:"noise-pcg",source:`/**
 * PCG-Style Hash Noise
 * @author guinetik
 * @date 2026-02-15
 *
 * Hash-based value noise using PCG-style polynomial hashing.
 * Avoids sin-based precision issues on some mobile GPUs.
 * Includes 1D, 3D, and 4D hash variants plus FBM with a
 * decorrelation matrix to eliminate axis-aligned artifacts.
 *
 * Noise: Preferred over sin-hash for mobile/WebGL targets.
 * The decorrelation matrix between FBM octaves prevents visible
 * grid lines in banded atmospheric patterns.
 */

// === CONSTANTS ===

/**
 * Decorrelation matrix for 3D FBM.
 * Rotates and scales domain between octaves to eliminate axis-aligned
 * artifacts. The non-orthogonal entries create a pseudo-random rotation
 * that prevents visible grid lines in banded patterns.
 */
const mat3 PCG_FBM_MATRIX = mat3(
    0.51162, -1.54702, 1.15972,
   -1.70666, -0.92510, -0.48114,
    0.90858, -0.86654, -1.55678
);

// === HASH FUNCTIONS ===

/**
 * 1D PCG-style hash — maps a float to pseudo-random [0, 1).
 */
float pcgHash1(float p) {
    p = fract(p * 0.1031);
    p *= p + 33.33;
    p *= p + p;
    return fract(p);
}

/**
 * 3D PCG-style hash — maps vec3 to pseudo-random vec3 in [0, 1).
 */
vec3 pcgHash3(vec3 p3) {
    p3 = fract(p3 * vec3(0.1031, 0.1030, 0.0973));
    p3 += dot(p3, p3.yxz + 33.33);
    return fract((p3.xxy + p3.yxx) * p3.zyx);
}

/**
 * 4D PCG-style hash — maps a float to pseudo-random vec4 in [0, 1).
 * Useful for seed-based parameter generation.
 */
vec4 pcgHash4(float p) {
    vec4 p4 = fract(vec4(p) * vec4(0.1031, 0.1030, 0.0973, 0.1099));
    p4 += dot(p4, p4.wzxy + 33.33);
    return fract((p4.xxyz + p4.yzzw) * p4.zywx);
}

// === NOISE FUNCTIONS ===

/**
 * 1D value noise from PCG hash with Hermite interpolation.
 * @return Noise value in [-1, 1]
 */
float pcgNoise1(float p) {
    float i = floor(p);
    float f = fract(p);
    float u = f * f * (3.0 - 2.0 * f);
    return 1.0 - 2.0 * mix(pcgHash1(i), pcgHash1(i + 1.0), u);
}

/**
 * 3D value noise from PCG hash with Hermite interpolation.
 * @return Noise vec3 in [-1, 1] per component
 */
vec3 pcgNoise3(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return 1.0 - 2.0 * mix(
        mix(mix(pcgHash3(i + vec3(0.0, 0.0, 0.0)),
                pcgHash3(i + vec3(1.0, 0.0, 0.0)), u.x),
            mix(pcgHash3(i + vec3(0.0, 1.0, 0.0)),
                pcgHash3(i + vec3(1.0, 1.0, 0.0)), u.x), u.y),
        mix(mix(pcgHash3(i + vec3(0.0, 0.0, 1.0)),
                pcgHash3(i + vec3(1.0, 0.0, 1.0)), u.x),
            mix(pcgHash3(i + vec3(0.0, 1.0, 1.0)),
                pcgHash3(i + vec3(1.0, 1.0, 1.0)), u.x), u.y), u.z);
}

// === FBM ===

/**
 * 1D Fractional Brownian Motion using PCG noise.
 *
 * 5 octaves, lacunarity 2.0, gain 0.5.
 * @param p  1D sample position
 * @return Normalized FBM value in approximately [-1, 1]
 */
float pcgFbm1(float p) {
    float f = pcgNoise1(p); p = 2.0 * p;
    f += 0.5 * pcgNoise1(p); p = 2.0 * p;
    f += 0.25 * pcgNoise1(p); p = 2.0 * p;
    f += 0.125 * pcgNoise1(p); p = 2.0 * p;
    f += 0.0625 * pcgNoise1(p);
    return f / 1.9375;
}

/**
 * 3D Fractional Brownian Motion using PCG noise with decorrelation matrix.
 *
 * 5 octaves with PCG_FBM_MATRIX applied between octaves to prevent
 * axis-aligned grid artifacts in banded patterns.
 *
 * @param p  3D sample position
 * @return Normalized FBM vec3 in approximately [-1, 1] per component
 */
vec3 pcgFbm3(vec3 p) {
    vec3 f = pcgNoise3(p); p = PCG_FBM_MATRIX * p;
    f += 0.5 * pcgNoise3(p); p = PCG_FBM_MATRIX * p;
    f += 0.25 * pcgNoise3(p); p = PCG_FBM_MATRIX * p;
    f += 0.125 * pcgNoise3(p); p = PCG_FBM_MATRIX * p;
    f += 0.0625 * pcgNoise3(p);
    return f / 1.9375;
}
`},{name:"lighting",source:`/**
 * Lighting Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless Blinn-Phong lighting functions for surface rendering.
 * View direction is assumed to be +Z (screen-facing sphere).
 */

// === BLINN-PHONG ===

/**
 * Compute Blinn-Phong diffuse + specular lighting.
 *
 * Uses a fixed view direction of +Z (appropriate for screen-facing
 * analytic sphere rendering). Includes a small ambient floor.
 *
 * @param normal     Surface normal (normalized)
 * @param lightDir   Light direction (normalized, pointing toward the light)
 * @param shininess  Specular exponent — higher = tighter highlight (15–60 typical)
 * @param specAmount Specular intensity multiplier (0.0–1.0)
 * @param ambient    Ambient light floor (typically 0.05)
 * @return vec2(diffuse, specular) — combine as: diffuse * color + specular * lightColor
 */
vec2 blinnPhong(vec3 normal, vec3 lightDir, float shininess, float specAmount, float ambient) {
    float diffuse = ambient + clamp(dot(normal, lightDir), 0.0, 1.0);
    vec3 halfVec = normalize(lightDir + vec3(0.0, 0.0, 1.0));
    float specular = specAmount * pow(clamp(dot(normal, halfVec), 0.0, 1.0), shininess);
    return vec2(diffuse, specular);
}
`},{name:"atmosphere",source:`/**
 * Atmospheric Effects
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless helpers for planetary atmosphere rendering:
 * Fresnel-like rim glow and off-sphere halo.
 */

// === RIM GLOW ===

/**
 * Compute Fresnel-like atmospheric rim glow at the sphere limb.
 *
 * Simulates the increased optical path through a thin atmosphere at
 * grazing angles. The glow intensifies as the surface normal tilts
 * away from the viewer (posZ approaches 0).
 *
 * @param posZ       Z component of the unit-sphere position (0 at limb, 1 at center)
 * @param atmosColor Atmosphere tint color
 * @param exponent   Falloff exponent — higher = thinner rim (1.0–2.0 typical)
 * @param intensity  Overall glow strength multiplier
 * @return RGB rim glow contribution to add to the surface color
 */
vec3 rimGlow(float posZ, vec3 atmosColor, float exponent, float intensity) {
    return pow(1.0 - posZ, exponent) * atmosColor * intensity;
}

/**
 * Blend atmosphere color at the sphere edge for anti-aliased limb transition.
 *
 * @param color      Current surface color
 * @param atmosColor Atmosphere tint (pre-multiplied by diffuse)
 * @param uv         Current UV coordinates
 * @param blendScale Scale factor for the atmosphere blend (typically 0.5–0.6)
 * @return Blended color with smooth atmosphere edge
 */
vec3 atmosEdge(vec3 color, vec3 atmosColor, vec2 uv, float blendScale) {
    return mix(color, blendScale * atmosColor, smoothstep(0.993, 1.0, length(uv)));
}

// === HALO ===

/**
 * Compute off-sphere atmospheric halo glow.
 *
 * Renders the faint atmospheric glow visible in the space surrounding
 * the planet, strongest on the sun-facing side.
 *
 * @param uv         Current UV coordinates (off-sphere, length > 1.0)
 * @param atmosColor Atmosphere tint color
 * @param lightDir   Light direction (normalized)
 * @param intensity  Overall halo brightness multiplier
 * @return RGB halo color for off-sphere pixels
 */
vec3 halo(vec2 uv, vec3 atmosColor, vec3 lightDir, float intensity) {
    float dist = length(uv);
    vec3 dir = normalize(vec3(uv, 1.0));
    float falloff = smoothstep(1.3, 0.95, dist);
    float lightFacing = clamp(dot(dir, lightDir), 0.0, 1.0);
    return atmosColor * falloff * lightFacing * intensity;
}
`}]},{slug:"plasma",title:"Perlin Plasma Study",description:"Classic demoscene plasma effect enhanced with Perlin noise for organic turbulence. Multiple sine wave interference patterns warped through FBM noise create flowing psychedelic color fields.",date:"2026-01-30",tags:["10-days","procedural","noise"],links:{},screenshotUrl:D0,passes:{image:`/**\r
 * Perlin Plasma Study\r
 * @author guinetik\r
 * @date 2026-01-30\r
 *\r
 * Classic demoscene plasma enhanced with 3D Perlin gradient noise\r
 * for organic turbulence. Multiple sine wave interference patterns\r
 * warped through FBM noise create flowing psychedelic color fields.\r
 *\r
 * Noise: Uses noise-perlin.glsl commons (Perlin gradient noise with\r
 * quintic C2 interpolation). FBM with 5 octaves, lacunarity 2.0,\r
 * gain 0.5 for natural 1/f turbulence.\r
 *\r
 * Commons: noise-perlin.glsl\r
 *\r
 * Plasma Techniques:\r
 * - True 3D Perlin gradient noise (via commons)\r
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
// --- Plasma sine wave frequencies ---\r
// Control the spatial frequency of each sine layer.\r
// Higher values = tighter wave patterns; lower = broader undulations.\r
#define PLASMA_FREQ_X 3.0        // Horizontal sine frequency\r
#define PLASMA_FREQ_Y 2.7        // Vertical sine frequency\r
#define PLASMA_FREQ_DIAG 2.5     // Diagonal (x+y) sine frequency\r
#define PLASMA_FREQ_RADIAL 4.0   // Radial distance sine frequency\r
#define PLASMA_FREQ_RIPPLE 5.0   // Moving center ripple frequency\r
\r
// --- Plasma time multipliers ---\r
// Control how fast each sine layer animates.\r
// Higher = faster movement; mismatched values prevent repetition.\r
#define PLASMA_TIME_X 1.0        // Horizontal layer time speed\r
#define PLASMA_TIME_Y 1.3        // Vertical layer time speed\r
#define PLASMA_TIME_DIAG 0.7     // Diagonal layer time speed\r
#define PLASMA_TIME_RADIAL 1.5   // Radial layer time speed (subtracted)\r
#define PLASMA_TIME_CENTER 0.5   // Center orbit X speed\r
#define PLASMA_TIME_CENTER_Y 0.7 // Center orbit Y speed\r
\r
// --- Perlin noise scales and time speeds ---\r
// Control the spatial scale and animation speed of noise layers.\r
// Larger scale = zoomed out (broader features); faster time = more motion.\r
#define NOISE_SCALE_PRIMARY 1.5    // Spatial scale for primary Perlin layer\r
#define NOISE_TIME_PRIMARY 0.4     // Time speed for primary Perlin layer\r
#define NOISE_SCALE_FBM 0.8        // Spatial scale for FBM turbulence layer\r
#define NOISE_TIME_FBM 0.3         // Time speed for FBM turbulence layer\r
#define NOISE_SCALE_WARP 2.0       // Spatial scale for coordinate warp noise\r
#define NOISE_TIME_WARP 0.25       // Time speed for coordinate warp noise\r
#define NOISE_SCALE_DETAIL 4.0     // Spatial scale for high-frequency detail layer\r
#define NOISE_TIME_DETAIL 0.6      // Time speed for detail layer\r
\r
// --- Warp intensity ---\r
// How strongly Perlin noise distorts the plasma coordinates.\r
// 0.0 = no warp; 0.3 = moderate organic distortion; above 0.5 = chaotic.\r
#define WARP_INTENSITY 0.3\r
\r
// --- Scanlines ---\r
// CRT-style horizontal scanline overlay.\r
// Higher frequency = thinner lines; higher strength = more visible.\r
#define SCANLINE_FREQUENCY 400.0  // Lines per screen height — 400 gives subtle CRT feel\r
#define SCANLINE_STRENGTH 0.03    // Brightness reduction per line — keep under 0.05 to stay subtle\r
\r
// --- Palette cycle speed ---\r
// How fast the shader cycles between the three color palettes.\r
// Lower = longer time per palette; 0.1 gives ~10s per palette.\r
#define PALETTE_CYCLE_SPEED 0.1\r
\r
// --- Texture overlay blend ---\r
// Blend factor for the overlay blending with iChannel0 texture.\r
// 0.0 = pure texture; 1.0 = pure overlay; 0.6 = balanced plasma tint.\r
#define TEXTURE_BLEND 0.6\r
\r
// --- Vignette ---\r
// Darkening at screen edges. Controls the radius-to-darkening multiplier.\r
// 0.0 = no vignette; 0.5 = moderate; 1.0 = strong tunnel effect.\r
#define VIGNETTE_STRENGTH 0.5\r
\r
/**\r
 * Classic plasma + Perlin turbulence\r
 */\r
float plasma(vec2 p, float time) {\r
    float v = 0.0;\r
\r
    // Classic sine waves\r
    v += sin(p.x * PLASMA_FREQ_X + time * PLASMA_TIME_X);\r
    v += sin(p.y * PLASMA_FREQ_Y + time * PLASMA_TIME_Y);\r
    v += sin((p.x + p.y) * PLASMA_FREQ_DIAG + time * PLASMA_TIME_DIAG);\r
    v += sin(length(p) * PLASMA_FREQ_RADIAL - time * PLASMA_TIME_RADIAL);\r
\r
    // Moving center ripple\r
    vec2 center = vec2(sin(time * PLASMA_TIME_CENTER), cos(time * PLASMA_TIME_CENTER_Y)) * 0.5;\r
    v += sin(length(p - center) * PLASMA_FREQ_RIPPLE + time);\r
\r
    // ADD PERLIN: 3D noise traveling through time\r
    vec3 noiseCoord = vec3(p * NOISE_SCALE_PRIMARY, time * NOISE_TIME_PRIMARY);\r
    v += perlinNoise3D(noiseCoord) * 2.0;\r
\r
    // ADD PERLIN: Turbulent FBM layer\r
    v += perlinFbm(vec3(p * NOISE_SCALE_FBM, time * NOISE_TIME_FBM), 5, 2.0, 0.5) * 1.5;\r
\r
    return v / 7.0;\r
}\r
\r
/**\r
 * Perlin-warped coordinates\r
 * Distorts the plasma field organically\r
 */\r
vec2 perlinWarp(vec2 p, float time) {\r
    vec3 np = vec3(p * NOISE_SCALE_WARP, time * NOISE_TIME_WARP);\r
\r
    return p + vec2(\r
        perlinNoise3D(np),\r
        perlinNoise3D(np + vec3(5.2, 1.3, 2.7))\r
    ) * WARP_INTENSITY;\r
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
    float detail = perlinNoise3D(vec3(warped * NOISE_SCALE_DETAIL, time * NOISE_TIME_DETAIL)) * 0.15;\r
    combined += detail;\r
\r
    // === COLOR ===\r
    float paletteTime = mod(time * PALETTE_CYCLE_SPEED, 3.0);\r
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
        color = mix(texColor, overlay, TEXTURE_BLEND);\r
    } else {\r
        color = plasmaCol;\r
    }\r
\r
    // === SCANLINES ===\r
    float scanline = sin(uv.y * SCANLINE_FREQUENCY) * SCANLINE_STRENGTH;\r
    color -= scanline;\r
\r
    // === POST ===\r
    color += plasmaCol * 0.1;\r
    float vig = 1.0 - length(uv - 0.5) * VIGNETTE_STRENGTH;\r
    color *= vig;\r
\r
    fragColor = vec4(color, 1.0);\r
}\r
`},channels:{},commonsSources:[{name:"noise-perlin",source:`/**
 * Perlin Gradient Noise
 * @author guinetik
 * @date 2026-02-15
 *
 * True 3D gradient noise with quintic interpolation for C2 continuity.
 * Smoother than value noise (noise-value.glsl) — gradient dot products
 * produce directional variation that eliminates the blocky artifacts of
 * lattice-aligned value noise.
 *
 * Noise: Chosen over value noise when smooth, organic turbulence is needed
 * (plasma fields, liquid surfaces). Costlier per sample due to 8 gradient
 * dot products vs 8 scalar lookups, but the quality difference is visible
 * at low octave counts.
 */

// === GRADIENT HASH ===

/**
 * 3D gradient vector hash.
 * Maps a lattice point to a pseudo-random unit-ish vector in [-1, 1]^3.
 * Uses dot-product projection + sin for decorrelation across axes.
 *
 * @param p  Integer lattice coordinate
 * @return   Gradient vector in [-1, 1] per component
 */
vec3 perlinGrad3(vec3 p) {
    p = vec3(
        dot(p, vec3(127.1, 311.7, 213.6)),
        dot(p, vec3(327.1, 211.7, 113.6)),
        dot(p, vec3(269.5, 183.3, 351.1))
    );
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

// === PERLIN NOISE ===

/**
 * 3D Perlin gradient noise with quintic interpolation.
 *
 * At each of the 8 cube corners, a pseudo-random gradient vector is
 * dot-producted with the offset from that corner. Trilinear interpolation
 * blends the 8 results using quintic smoothstep (6t^5 - 15t^4 + 10t^3)
 * for C2 continuity — no visible grid-line artifacts.
 *
 * @param p  3D sample position
 * @return   Noise value in approximately [-0.5, 0.5]
 */
float perlinNoise3D(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);

    // Quintic interpolation: 6t^5 - 15t^4 + 10t^3
    // C2 continuous — second derivative is zero at lattice boundaries,
    // eliminating the subtle grid-aligned ridges that cubic produces.
    vec3 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);

    return mix(
        mix(
            mix(dot(perlinGrad3(i + vec3(0, 0, 0)), f - vec3(0, 0, 0)),
                dot(perlinGrad3(i + vec3(1, 0, 0)), f - vec3(1, 0, 0)), u.x),
            mix(dot(perlinGrad3(i + vec3(0, 1, 0)), f - vec3(0, 1, 0)),
                dot(perlinGrad3(i + vec3(1, 1, 0)), f - vec3(1, 1, 0)), u.x),
            u.y),
        mix(
            mix(dot(perlinGrad3(i + vec3(0, 0, 1)), f - vec3(0, 0, 1)),
                dot(perlinGrad3(i + vec3(1, 0, 1)), f - vec3(1, 0, 1)), u.x),
            mix(dot(perlinGrad3(i + vec3(0, 1, 1)), f - vec3(0, 1, 1)),
                dot(perlinGrad3(i + vec3(1, 1, 1)), f - vec3(1, 1, 1)), u.x),
            u.y),
        u.z);
}

// === FBM ===

/**
 * Fractional Brownian Motion using 3D Perlin noise.
 *
 * Sums multiple octaves of perlinNoise3D with decreasing amplitude.
 * Domain is offset between octaves to decorrelate layers.
 *
 * @param pos        3D sample position
 * @param octaves    Number of noise octaves (1-8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0-3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4-0.5)
 * @return           FBM value (centered near 0, range depends on octaves)
 */
float perlinFbm(vec3 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * perlinNoise3D(pos);
        total += scale;
        pos += vec3(0.31, 0.83, 0.47);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}
`}]},{slug:"ripples",title:"Perlin Ripples Study",description:"Chaotic liquid surface with multiple wandering ripple sources that move unpredictably through noise space. Each source has randomized parameters and pulsing intensity. Sudden burst ripples spawn randomly. Turbulent noise adds extra chaos.",date:"2026-01-30",tags:["10-days","procedural","noise"],links:{},screenshotUrl:P0,passes:{image:`/**\r
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
 *\r
 * Commons: noise-perlin (perlinNoise3D, perlinGrad3), noise-value (hashN)\r
 */\r
\r
#define PI 3.14159265359\r
\r
// --- Source geometry ---\r
#define SOURCE_COUNT 6           // Number of wandering ripple emitters\r
#define WANDER_SPEED_X 0.3       // Horizontal noise-space traversal speed — higher = faster drift\r
#define WANDER_SPEED_Y 0.25      // Vertical noise-space traversal speed — slightly slower gives organic asymmetry\r
#define WANDER_AMPLITUDE 0.8     // Spatial extent of source wander — 0.5: centered, 1.0: fills screen\r
\r
// --- Ripple parameters ---\r
#define RIPPLE_BASE_FREQ 15.0    // Minimum ripple spatial frequency (Hz) — lower = broader rings\r
#define RIPPLE_FREQ_RANGE 20.0   // Random frequency added per source (15-35 Hz total range)\r
#define RIPPLE_BASE_SPEED 2.0    // Minimum outward propagation speed — lower = slower wave travel\r
#define RIPPLE_SPEED_RANGE 3.0   // Random speed added per source (2-5 total range)\r
#define RIPPLE_DISPLACE 0.015    // Displacement amplitude per ripple source — higher = more UV distortion\r
\r
// --- Turbulence ---\r
#define TURB_SPATIAL_SCALE 4.0   // Spatial frequency of turbulent noise layer — higher = finer detail\r
#define TURB_TIME_SPEED 0.4      // Animation rate of turbulence — 0.2: slow churn, 1.0: rapid boil\r
#define TURB_STRENGTH 0.03       // UV displacement from turbulence — above 0.05 looks jittery\r
\r
// --- Burst events ---\r
#define BURST_EVENT_FREQ 0.5     // Bursts per second — higher = more frequent eruptions\r
#define BURST_RIPPLE_FREQ 25.0   // Spatial frequency of burst wavefront — higher = tighter rings\r
#define BURST_SPEED 15.0         // Outward propagation speed of burst ripple — fast for explosive feel\r
#define BURST_DISPLACE 0.025     // UV displacement strength of burst — stronger than ambient ripples\r
#define BURST_FADE_TIME 0.5      // Temporal fade threshold — burst decays from 1.0 to 0.0 over this fraction\r
#define BURST_FADE_RADIUS 0.6    // Spatial fade radius — burst invisible beyond this distance from origin\r
\r
// --- Refraction & specular ---\r
#define REFRACT_HIGHLIGHT_SCALE 20.0  // Multiplier on displacement length for brightness — higher = brighter caustics\r
#define REFRACT_STRENGTH 0.5          // How much refraction modulates brightness — 0.0: none, 1.0: doubles\r
#define SPECULAR_POWER 6.0            // Exponent for specular flash sharpness — higher = tighter highlights\r
#define SPECULAR_STRENGTH 0.4         // Additive specular intensity — above 0.6 blows out whites\r
\r
// --- Post-processing ---\r
#define VIGNETTE_STRENGTH 0.4    // Edge darkening factor — 0.0: no vignette, 1.0: fully dark corners\r
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
    for (int i = 0; i < SOURCE_COUNT; i++) {\r
        float fi = float(i);\r
        // Seed offset per source — 73.156 is an arbitrary irrational-ish\r
        // constant that spaces sources far apart in noise space, avoiding\r
        // correlated motion between emitters\r
        float seed = fi * 73.156;\r
\r
        // Each source wanders unpredictably using noise\r
        vec2 sourcePos = vec2(\r
            perlinNoise3D(vec3(time * WANDER_SPEED_X + seed, fi * 1.7, 0.0)),\r
            perlinNoise3D(vec3(fi * 2.3, time * WANDER_SPEED_Y + seed, 1.0))\r
        ) * WANDER_AMPLITUDE;\r
\r
        // Distance to this source\r
        float dist = length(p - sourcePos);\r
\r
        // Ripple with unique frequency, speed, and phase\r
        // Hash seeds (5.1, 7.3, 11.7) are coprime-ish multipliers that\r
        // ensure each source gets decorrelated freq/speed/phase values\r
        float freq = RIPPLE_BASE_FREQ + hashN(fi * 5.1) * RIPPLE_FREQ_RANGE;   // 15-35 Hz range\r
        float speed = RIPPLE_BASE_SPEED + hashN(fi * 7.3) * RIPPLE_SPEED_RANGE; // 2-5 propagation speed\r
        float phase = hashN(fi * 11.7) * 6.28;          // random initial phase\r
\r
        float ripple = sin(dist * freq - time * speed + phase);\r
\r
        // Irregular decay - not smooth falloff\r
        float decay = 1.0 / (1.0 + dist * (3.0 + hashN(fi * 3.3) * 4.0));\r
        decay *= 0.5 + 0.5 * sin(time * (0.5 + hashN(fi * 9.1)) + fi);\r
\r
        ripple *= decay;\r
        totalRipple += ripple;\r
\r
        // Displacement toward/away from source\r
        vec2 dir = normalize(p - sourcePos + 0.001);\r
        totalDisplace += dir * ripple * RIPPLE_DISPLACE;\r
    }\r
\r
    // === TURBULENT NOISE LAYER ===\r
    // Add chaotic 3D noise displacement\r
    vec3 noisePos = vec3(p * TURB_SPATIAL_SCALE, time * TURB_TIME_SPEED);\r
    float turb1 = perlinNoise3D(noisePos);\r
    float turb2 = perlinNoise3D(noisePos * 2.3 + 100.0);\r
\r
    totalDisplace += vec2(turb1, turb2) * TURB_STRENGTH;\r
\r
    // === SUDDEN BURSTS ===\r
    // Occasional random strong ripples\r
    float burstPhase = floor(time * BURST_EVENT_FREQ);\r
    float burstT = fract(time * BURST_EVENT_FREQ);\r
    vec2 burstPos = vec2(\r
        hashN(burstPhase * 17.1) - 0.5,\r
        hashN(burstPhase * 23.7) - 0.5\r
    ) * BURST_FADE_RADIUS;\r
    float burstDist = length(p - burstPos);\r
    float burst = sin(burstDist * BURST_RIPPLE_FREQ - burstT * BURST_SPEED);\r
    burst *= smoothstep(BURST_FADE_TIME, 0.0, burstT);\r
    burst *= smoothstep(BURST_FADE_RADIUS, 0.0, burstDist);\r
    totalDisplace += normalize(p - burstPos + 0.001) * burst * BURST_DISPLACE;\r
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
    float refract = length(totalDisplace) * REFRACT_HIGHLIGHT_SCALE;\r
    color *= 1.0 + refract * REFRACT_STRENGTH;\r
\r
    // === SPECULAR FLASHES ===\r
    float spec = pow(max(0.0, totalRipple), SPECULAR_POWER) * SPECULAR_STRENGTH;\r
    color += vec3(1.0) * spec;\r
\r
    // === POST ===\r
    float vig = 1.0 - length(uv - 0.5) * VIGNETTE_STRENGTH;\r
    color *= vig;\r
\r
    fragColor = vec4(color, 1.0);\r
}\r
`},channels:{image:{iChannel0:"textures/water.avif"}},commonsSources:[{name:"noise-perlin",source:`/**
 * Perlin Gradient Noise
 * @author guinetik
 * @date 2026-02-15
 *
 * True 3D gradient noise with quintic interpolation for C2 continuity.
 * Smoother than value noise (noise-value.glsl) — gradient dot products
 * produce directional variation that eliminates the blocky artifacts of
 * lattice-aligned value noise.
 *
 * Noise: Chosen over value noise when smooth, organic turbulence is needed
 * (plasma fields, liquid surfaces). Costlier per sample due to 8 gradient
 * dot products vs 8 scalar lookups, but the quality difference is visible
 * at low octave counts.
 */

// === GRADIENT HASH ===

/**
 * 3D gradient vector hash.
 * Maps a lattice point to a pseudo-random unit-ish vector in [-1, 1]^3.
 * Uses dot-product projection + sin for decorrelation across axes.
 *
 * @param p  Integer lattice coordinate
 * @return   Gradient vector in [-1, 1] per component
 */
vec3 perlinGrad3(vec3 p) {
    p = vec3(
        dot(p, vec3(127.1, 311.7, 213.6)),
        dot(p, vec3(327.1, 211.7, 113.6)),
        dot(p, vec3(269.5, 183.3, 351.1))
    );
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

// === PERLIN NOISE ===

/**
 * 3D Perlin gradient noise with quintic interpolation.
 *
 * At each of the 8 cube corners, a pseudo-random gradient vector is
 * dot-producted with the offset from that corner. Trilinear interpolation
 * blends the 8 results using quintic smoothstep (6t^5 - 15t^4 + 10t^3)
 * for C2 continuity — no visible grid-line artifacts.
 *
 * @param p  3D sample position
 * @return   Noise value in approximately [-0.5, 0.5]
 */
float perlinNoise3D(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);

    // Quintic interpolation: 6t^5 - 15t^4 + 10t^3
    // C2 continuous — second derivative is zero at lattice boundaries,
    // eliminating the subtle grid-aligned ridges that cubic produces.
    vec3 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);

    return mix(
        mix(
            mix(dot(perlinGrad3(i + vec3(0, 0, 0)), f - vec3(0, 0, 0)),
                dot(perlinGrad3(i + vec3(1, 0, 0)), f - vec3(1, 0, 0)), u.x),
            mix(dot(perlinGrad3(i + vec3(0, 1, 0)), f - vec3(0, 1, 0)),
                dot(perlinGrad3(i + vec3(1, 1, 0)), f - vec3(1, 1, 0)), u.x),
            u.y),
        mix(
            mix(dot(perlinGrad3(i + vec3(0, 0, 1)), f - vec3(0, 0, 1)),
                dot(perlinGrad3(i + vec3(1, 0, 1)), f - vec3(1, 0, 1)), u.x),
            mix(dot(perlinGrad3(i + vec3(0, 1, 1)), f - vec3(0, 1, 1)),
                dot(perlinGrad3(i + vec3(1, 1, 1)), f - vec3(1, 1, 1)), u.x),
            u.y),
        u.z);
}

// === FBM ===

/**
 * Fractional Brownian Motion using 3D Perlin noise.
 *
 * Sums multiple octaves of perlinNoise3D with decreasing amplitude.
 * Domain is offset between octaves to decorrelate layers.
 *
 * @param pos        3D sample position
 * @param octaves    Number of noise octaves (1-8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0-3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4-0.5)
 * @return           FBM value (centered near 0, range depends on octaves)
 */
float perlinFbm(vec3 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * perlinNoise3D(pos);
        total += scale;
        pos += vec3(0.31, 0.83, 0.47);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}
`},{name:"noise-value",source:`/**
 * Value Noise (sin-hash family)
 * @author guinetik
 * @date 2026-02-15
 *
 * Hash-based value noise using the fract(sin(x)*43758) family.
 * Fast and simple, produces smooth non-directional noise suitable for terrain.
 * C1 continuous via Hermite smoothstep interpolation (3t^2 - 2t^3).
 *
 * Noise: Chosen for speed on desktop GPUs. For mobile or precision-sensitive
 * use cases, prefer noise-pcg.glsl which avoids sin-based hashing.
 */

// === HASH FUNCTIONS ===

/**
 * 1D hash — maps a float to a pseudo-random float in [0, 1).
 */
float hashN(float n) {
    return fract(sin(n) * 43758.5453123);
}

/**
 * 2D hash — maps a vec2 to a pseudo-random float in [0, 1).
 */
float hashN2(vec2 p) {
    float h = dot(p, vec2(127.1, 311.7));
    return fract(sin(h) * 43758.5453123);
}

// === VALUE NOISE ===

/**
 * 2D value noise with Hermite interpolation.
 *
 * @param p  2D position to sample
 * @return Noise value in [0, 1)
 */
float valueNoise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hashN2(i + vec2(0.0, 0.0)), hashN2(i + vec2(1.0, 0.0)), u.x),
               mix(hashN2(i + vec2(0.0, 1.0)), hashN2(i + vec2(1.0, 1.0)), u.x), u.y);
}

/**
 * 3D value noise with Hermite interpolation.
 *
 * Uses dot-product lattice hashing with step (1, 157, 113) for
 * decorrelated cell values.
 *
 * @param pos  3D position to sample
 * @return Noise value in [0, 1)
 */
float valueNoise3D(vec3 pos) {
    vec3 i = floor(pos);
    vec3 f = fract(pos);
    vec3 u = f * f * (3.0 - 2.0 * f);

    float n = dot(i, vec3(1.0, 157.0, 113.0));
    return mix(mix(mix(hashN(n + 0.0),   hashN(n + 1.0), u.x),
                   mix(hashN(n + 157.0), hashN(n + 158.0), u.x), u.y),
               mix(mix(hashN(n + 113.0), hashN(n + 114.0), u.x),
                   mix(hashN(n + 270.0), hashN(n + 271.0), u.x), u.y), u.z);
}

// === FBM ===

/**
 * Fractional Brownian Motion using 3D value noise.
 *
 * Sums multiple octaves of valueNoise3D with decreasing amplitude.
 * Domain is offset and rotated between octaves to decorrelate layers.
 *
 * @param pos        3D sample position
 * @param octaves    Number of noise octaves (1–8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0–3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4–0.5)
 * @return Normalized FBM value in approximately [0, 1)
 */
float fbmValue(vec3 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * valueNoise3D(pos);
        total += scale;
        pos += vec3(0.23, 0.77, 0.57);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}

/**
 * Fractional Brownian Motion using 2D value noise.
 *
 * Sums multiple octaves of valueNoise2D with decreasing amplitude.
 * Domain is offset between octaves to decorrelate layers.
 *
 * @param pos        2D sample position
 * @param octaves    Number of noise octaves (1-8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0-3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4-0.5)
 * @return Normalized FBM value in approximately [0, 1)
 */
float fbmValue2D(vec2 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * valueNoise2D(pos);
        total += scale;
        pos += vec2(0.23, 0.77);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}
`}]},{slug:"rossler",title:"Attractor Study #03: Rossler",description:"Rössler strange attractor (1976), a single-scroll spiral with chaotic z-foldback. Distance-field line tracing with feedback accumulation. Velocity-mapped HSL coloring, hue shift, blink pulses, and click-drag orbit.",date:"2026-02-11",tags:["attractors","3d"],links:{},screenshotUrl:L0,passes:{image:`/**\r
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
        float pv = (hashN(float(p) * 7.13) - 0.5) * 0.10;\r
\r
        // TECHNIQUE: Per-particle intensity modulation\r
        // Each particle oscillates brightness at its own frequency/phase,\r
        // creating a firefly-like effect where different orbits pulse independently.\r
        float pFreq = 0.3 + hashN(float(p) * 3.71) * 0.7;\r
        float pPhase = hashN(float(p) * 11.3) * 6.2832;\r
        float pAlpha = 0.3 + 0.7 * max(0.0, sin(iTime * pFreq + pPhase));\r
\r
        for (float i = 0.0; i < STEPS; i++) {\r
            next = integrateV(last, 0.016 * SPEED, pv);\r
\r
            float segD = dfLine(projectMat(last - center3d, viewRot, viewScale), projectMat(next - center3d, viewRot, viewScale), uv);\r
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
    float blink = hashN(blinkSeed) < 0.3\r
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
                (hashN(seed) - 0.5) * 10.0,\r
                (hashN(seed * 1.31) - 0.5) * 10.0,\r
                hashN(seed * 2.17) * 0.2\r
            );\r
            fragColor = vec4(pos, 0);\r
        } else {\r
            vec3 pos = finalPos[px];\r
            // TECHNIQUE: Stochastic respawn\r
            // Particles that escape beyond ESCAPE_RADIUS are respawned, plus a small\r
            // random chance (RESPAWN_CHANCE) per frame ensures continuous renewal\r
            // even for well-behaved orbits. Prevents stale/stuck particles and keeps\r
            // the form regenerating organically without hard cycle cuts.\r
            float rng = hashN(float(px) * 13.7 + iTime * 60.0);\r
            if (length(pos) > ESCAPE_RADIUS || rng < RESPAWN_CHANCE) {\r
                float seed = float(px) + iTime * 60.0;\r
                pos = vec3(\r
                    (hashN(seed) - 0.5) * 10.0,\r
                    (hashN(seed * 1.31) - 0.5) * 10.0,\r
                    hashN(seed * 2.17) * 0.2\r
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
`},channels:{image:{iChannel0:"buffer-a"},bufferA:{iChannel0:"buffer-a"}},commonsSources:[{name:"noise-value",source:`/**
 * Value Noise (sin-hash family)
 * @author guinetik
 * @date 2026-02-15
 *
 * Hash-based value noise using the fract(sin(x)*43758) family.
 * Fast and simple, produces smooth non-directional noise suitable for terrain.
 * C1 continuous via Hermite smoothstep interpolation (3t^2 - 2t^3).
 *
 * Noise: Chosen for speed on desktop GPUs. For mobile or precision-sensitive
 * use cases, prefer noise-pcg.glsl which avoids sin-based hashing.
 */

// === HASH FUNCTIONS ===

/**
 * 1D hash — maps a float to a pseudo-random float in [0, 1).
 */
float hashN(float n) {
    return fract(sin(n) * 43758.5453123);
}

/**
 * 2D hash — maps a vec2 to a pseudo-random float in [0, 1).
 */
float hashN2(vec2 p) {
    float h = dot(p, vec2(127.1, 311.7));
    return fract(sin(h) * 43758.5453123);
}

// === VALUE NOISE ===

/**
 * 2D value noise with Hermite interpolation.
 *
 * @param p  2D position to sample
 * @return Noise value in [0, 1)
 */
float valueNoise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hashN2(i + vec2(0.0, 0.0)), hashN2(i + vec2(1.0, 0.0)), u.x),
               mix(hashN2(i + vec2(0.0, 1.0)), hashN2(i + vec2(1.0, 1.0)), u.x), u.y);
}

/**
 * 3D value noise with Hermite interpolation.
 *
 * Uses dot-product lattice hashing with step (1, 157, 113) for
 * decorrelated cell values.
 *
 * @param pos  3D position to sample
 * @return Noise value in [0, 1)
 */
float valueNoise3D(vec3 pos) {
    vec3 i = floor(pos);
    vec3 f = fract(pos);
    vec3 u = f * f * (3.0 - 2.0 * f);

    float n = dot(i, vec3(1.0, 157.0, 113.0));
    return mix(mix(mix(hashN(n + 0.0),   hashN(n + 1.0), u.x),
                   mix(hashN(n + 157.0), hashN(n + 158.0), u.x), u.y),
               mix(mix(hashN(n + 113.0), hashN(n + 114.0), u.x),
                   mix(hashN(n + 270.0), hashN(n + 271.0), u.x), u.y), u.z);
}

// === FBM ===

/**
 * Fractional Brownian Motion using 3D value noise.
 *
 * Sums multiple octaves of valueNoise3D with decreasing amplitude.
 * Domain is offset and rotated between octaves to decorrelate layers.
 *
 * @param pos        3D sample position
 * @param octaves    Number of noise octaves (1–8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0–3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4–0.5)
 * @return Normalized FBM value in approximately [0, 1)
 */
float fbmValue(vec3 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * valueNoise3D(pos);
        total += scale;
        pos += vec3(0.23, 0.77, 0.57);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}

/**
 * Fractional Brownian Motion using 2D value noise.
 *
 * Sums multiple octaves of valueNoise2D with decreasing amplitude.
 * Domain is offset between octaves to decorrelate layers.
 *
 * @param pos        2D sample position
 * @param octaves    Number of noise octaves (1-8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0-3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4-0.5)
 * @return Normalized FBM value in approximately [0, 1)
 */
float fbmValue2D(vec2 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * valueNoise2D(pos);
        total += scale;
        pos += vec2(0.23, 0.77);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}
`},{name:"color",source:`/**
 * Color Conversion Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless color space conversion functions.
 */

// === HSL TO RGB ===

/**
 * Convert HSL color to RGB.
 *
 * @param h  Hue in degrees (0–360, wraps automatically)
 * @param s  Saturation (0.0–1.0)
 * @param l  Lightness (0.0–1.0)
 * @return RGB color in [0, 1] per component
 */
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

// === HSV CONVERSIONS ===

/**
 * Convert RGB color to HSV.
 *
 * @param c  RGB color in [0, 1] per component
 * @return   HSV where H is in [0, 1] (not degrees), S and V in [0, 1]
 */
vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

/**
 * Convert HSV color to RGB.
 *
 * @param c  HSV where H is in [0, 1] (not degrees), S and V in [0, 1]
 * @return   RGB color in [0, 1] per component
 */
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
`},{name:"sdf",source:`/**
 * Signed Distance Field Primitives
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless distance field functions for 2D rendering.
 */

// === LINE SEGMENT ===

/**
 * Compute minimum distance from a point to a line segment.
 *
 * Returns the perpendicular distance from point \`p\` to the closest
 * point on the segment from \`a\` to \`b\`. Handles degenerate
 * zero-length segments gracefully.
 *
 * @param a  Segment start point
 * @param b  Segment end point
 * @param p  Query point
 * @return Distance from \`p\` to the nearest point on segment (a, b)
 */
float dfLine(vec2 a, vec2 b, vec2 p) {
    vec2 ab = b - a;
    float denom = dot(ab, ab);
    if (denom < 1e-10) return distance(a, p);
    float t = clamp(dot(p - a, ab) / denom, 0.0, 1.0);
    return distance(a + ab * t, p);
}
`},{name:"projection",source:`/**
 * 3D Projection Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless 3D-to-2D projection helpers for attractor rendering.
 * Provides rotation matrices and projection functions.
 */

// === ROTATION MATRICES ===

/**
 * Rotation matrix around the X axis.
 *
 * @param a  Angle in radians
 * @return 3x3 rotation matrix
 */
mat3 rotX(float a) {
    float c = cos(a), s = sin(a);
    return mat3(1,0,0, 0,c,-s, 0,s,c);
}

/**
 * Rotation matrix around the Y axis.
 *
 * @param a  Angle in radians
 * @return 3x3 rotation matrix
 */
mat3 rotY(float a) {
    float c = cos(a), s = sin(a);
    return mat3(c,0,s, 0,1,0, -s,0,c);
}

// === PROJECTION ===

/**
 * Project a 3D point to 2D screen space via rotation matrix.
 *
 * Applies the view rotation and scales the result. The Z component
 * is discarded (orthographic projection along the view axis).
 *
 * @param p        3D point to project
 * @param viewRot  Combined view rotation matrix (typically rotY * rotX)
 * @param scale    Screen scale factor (pixels per unit)
 * @return 2D screen-space position
 */
vec2 projectMat(vec3 p, mat3 viewRot, float scale) {
    return (viewRot * p).xy * scale;
}
`}]},{slug:"signal-noise",title:"Signal / Noise",description:"A meditation on attractors, cosmic distance, and connection across void. Two pulsing signals interfere through a Lorenz attractor field, connected by a breathing filament amid cosmic dust and nebula.",date:"2026-02-11",tags:["attractors","space"],links:{},screenshotUrl:O0,passes:{image:`/**
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

// Hash (hashN2) and value noise (valueNoise2D) provided by noise-value commons.

/**
 * Fractal Brownian Motion — 6 octaves with domain rotation.
 * The rotation matrix between octaves prevents axis-aligned artifacts
 * and produces more isotropic, cloud-like patterns.
 */
float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);  // ~36.87 degree rotation between octaves
    for (int i = 0; i < 6; i++) {
        v += a * valueNoise2D(p);
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
        float h = hashN2(starId + i * 100.0);
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
                         hashN2(floor(uv * 80.0)));
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
    col += (hashN2(uv * iResolution.xy + fract(time)) - 0.5) * 0.015;
    // Near-unity gamma — slight contrast lift
    col = pow(max(col, 0.0), vec3(0.95));
    col = clamp(col, 0.0, 1.0);

    fragColor = vec4(col, 1.0);
}
`},channels:{},commonsSources:[{name:"noise-value",source:`/**
 * Value Noise (sin-hash family)
 * @author guinetik
 * @date 2026-02-15
 *
 * Hash-based value noise using the fract(sin(x)*43758) family.
 * Fast and simple, produces smooth non-directional noise suitable for terrain.
 * C1 continuous via Hermite smoothstep interpolation (3t^2 - 2t^3).
 *
 * Noise: Chosen for speed on desktop GPUs. For mobile or precision-sensitive
 * use cases, prefer noise-pcg.glsl which avoids sin-based hashing.
 */

// === HASH FUNCTIONS ===

/**
 * 1D hash — maps a float to a pseudo-random float in [0, 1).
 */
float hashN(float n) {
    return fract(sin(n) * 43758.5453123);
}

/**
 * 2D hash — maps a vec2 to a pseudo-random float in [0, 1).
 */
float hashN2(vec2 p) {
    float h = dot(p, vec2(127.1, 311.7));
    return fract(sin(h) * 43758.5453123);
}

// === VALUE NOISE ===

/**
 * 2D value noise with Hermite interpolation.
 *
 * @param p  2D position to sample
 * @return Noise value in [0, 1)
 */
float valueNoise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hashN2(i + vec2(0.0, 0.0)), hashN2(i + vec2(1.0, 0.0)), u.x),
               mix(hashN2(i + vec2(0.0, 1.0)), hashN2(i + vec2(1.0, 1.0)), u.x), u.y);
}

/**
 * 3D value noise with Hermite interpolation.
 *
 * Uses dot-product lattice hashing with step (1, 157, 113) for
 * decorrelated cell values.
 *
 * @param pos  3D position to sample
 * @return Noise value in [0, 1)
 */
float valueNoise3D(vec3 pos) {
    vec3 i = floor(pos);
    vec3 f = fract(pos);
    vec3 u = f * f * (3.0 - 2.0 * f);

    float n = dot(i, vec3(1.0, 157.0, 113.0));
    return mix(mix(mix(hashN(n + 0.0),   hashN(n + 1.0), u.x),
                   mix(hashN(n + 157.0), hashN(n + 158.0), u.x), u.y),
               mix(mix(hashN(n + 113.0), hashN(n + 114.0), u.x),
                   mix(hashN(n + 270.0), hashN(n + 271.0), u.x), u.y), u.z);
}

// === FBM ===

/**
 * Fractional Brownian Motion using 3D value noise.
 *
 * Sums multiple octaves of valueNoise3D with decreasing amplitude.
 * Domain is offset and rotated between octaves to decorrelate layers.
 *
 * @param pos        3D sample position
 * @param octaves    Number of noise octaves (1–8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0–3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4–0.5)
 * @return Normalized FBM value in approximately [0, 1)
 */
float fbmValue(vec3 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * valueNoise3D(pos);
        total += scale;
        pos += vec3(0.23, 0.77, 0.57);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}

/**
 * Fractional Brownian Motion using 2D value noise.
 *
 * Sums multiple octaves of valueNoise2D with decreasing amplitude.
 * Domain is offset between octaves to decorrelate layers.
 *
 * @param pos        2D sample position
 * @param octaves    Number of noise octaves (1-8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0-3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4-0.5)
 * @return Normalized FBM value in approximately [0, 1)
 */
float fbmValue2D(vec2 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * valueNoise2D(pos);
        total += scale;
        pos += vec2(0.23, 0.77);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}
`}]},{slug:"star-blue-giant",title:"Blue Giant",description:"A massive blue giant star with a smooth, intense surface and powerful corona glow. Temperature at ~20000K with low but steady stellar activity.",date:"2025-11-29",tags:["exoplanets","space","3d","raymarching"],links:{},screenshotUrl:M0,passes:{image:`/**
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
 *   3. Corona          — FBM flame tendrils + 2 subtle prominences, rotating with star
 *   4. Star surface    — self-emissive granulation (1-abs pattern), cycling spots
 *   5. Tone mapping    — Reinhard at 2.0x exposure (highest of the three stars)
 *
 * TECHNIQUE: Ray-sphere intersection with orbiting camera. Same architecture as
 * the red dwarf and sun shaders but with the slowest orbital and self-rotation
 * speeds, emphasizing the massive scale of a blue giant.
 *
 * TECHNIQUE: Granulation via 1-abs(noise) creates cell-like patterns — bright
 * broad centers with thin dark boundaries, mimicking convection. Blue giant uses
 * the lowest frequencies (3/7/14) for the smoothest, largest-scale cells.
 *
 * TECHNIQUE: Pure self-emission rendering — no directional lighting. All visual
 * detail comes from heat-to-color mapping through the hand-tuned starRamp palette.
 * Contrast curve (smoothstep 0.2-0.85) is gentler than sun/red dwarf for a
 * smoother, more uniform appearance.
 *
 * TECHNIQUE: Dual-layer cycling starspots — two noise layers at different speeds
 * create spots that form, dissolve, and reappear as layers phase in/out of
 * alignment. Blue giant has the fewest, most subtle spots of all star types.
 *
 * TECHNIQUE: Corona rotation — screen-space angle offset by star's axial rotation
 * so corona tendrils rotate with the surface, maintaining visual coherence.
 *
 * TECHNIQUE: Wider corona (extends to r=2.5 vs r=2.0 for other stars) with
 * slower exponential decay (exp(-rimFactor * 3.0) vs 4.0-4.5), reflecting the
 * powerful radiation pressure of a luminous blue giant.
 *
 * Physics: Color palette approximates ~20000K blackbody radiation — dominated
 * by blue-white emission. Wien's displacement law places peak emission in the
 * UV, so visible light appears strongly blue-shifted. Planck's law can't produce
 * blue colors at any temperature, so the palette is hand-tuned (starRamp).
 *
 * Noise: 3D simplex noise (Ashima Arts implementation). Lower frequency
 * multipliers and fewer FBM octaves than cooler stars produce the smoother,
 * larger-scale convection patterns characteristic of massive stellar envelopes.
 */

#define PI 3.14159265359   // Half-circle — used for prominence angular wrapping
#define TAU 6.28318530718  // Full circle — used for prominence distribution

// =============================================================================
// NOISE — 3D Simplex Noise provided by noise-simplex commons (snoise3D)
// =============================================================================

// FBM with configurable octaves — lacunarity 2.0, gain 0.5
// Called with fewer octaves (3-4) than the other stars to produce the
// smoother surface characteristic of a massive blue giant.
// NOTE: Kept inline because the domain shift differs from fbmSimplex3D.
float fbm(vec3 p, int octaves) {
    float v = 0.0, a = 0.5, f = 1.0;
    for (int i = 0; i < 6; i++) {
        if (i >= octaves) break;
        v += a * snoise3D(p * f);
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
// TECHNIQUE: Granulation via 1-abs(noise) creates cell-like shapes — bright
// convective cell centers with thin dark intergranular lanes.
// All frequencies are the lowest of the three star types (3/7/14 vs Sun's
// 5/10/20 vs red dwarf's 6/14/28). The large cells weigh more (0.55) and
// fine detail weighs less (0.15), producing the smooth appearance of a massive
// stellar envelope where convection operates on much larger spatial scales.

float granulation(vec3 p, float time) {
    // Large cells — primary granulation (lowest frequency of all star types)
    float g1 = 1.0 - abs(snoise3D(p * 3.0 + vec3(0.0, time * 0.05, 0.0)));
    // Medium cells — supergranulation
    float g2 = 1.0 - abs(snoise3D(p * 7.0 + vec3(time * 0.04, 0.0, time * 0.03)));
    // Fine turbulence — surface detail
    float g3 = snoise3D(p * 14.0 + vec3(0.0, time * 0.06, time * 0.05)) * 0.5 + 0.5;
    return g1 * 0.55 + g2 * 0.3 + g3 * 0.15;
}

// Starspots — dual-layer cycling. Two noise layers at different speeds create
// spots that form, dissolve, and reappear as layers phase in/out of alignment.
// Blue giant has the fewest, most subtle spots: lowest frequency (2.0/3.0),
// highest threshold (0.55), and slowest drift of all star types.
float starSpots(vec3 p, float time) {
    // Primary spots — slow drift
    float spots1 = snoise3D(p * 2.0 + vec3(0.0, time * 0.03, time * 0.02));
    // Secondary cycle — different frequency creates interference pattern
    float spots2 = snoise3D(p * 3.0 + vec3(time * 0.04, 0.0, time * 0.02) + vec3(30.0));
    float spots = spots1 * 0.6 + spots2 * 0.4;
    return smoothstep(0.55, 0.85, spots);
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

// Surface rendering — pure self-emission, no directional lighting.
// The most stable and luminous of the three star types.
// All visual detail comes from heat-to-color mapping through starRamp.
vec3 renderSurface(vec3 spherePos, float viewAngle, float time) {
    float plasma = plasmaFlow(spherePos, time);
    float cells = granulation(spherePos, time);
    float spots = starSpots(spherePos, time);

    // Very subtle pulsing — +/-5% (vs +/-10% Sun, +/-15% red dwarf)
    float pulse = 0.95 + 0.05 * sin(time * 0.3 + snoise3D(spherePos * 1.5) * 2.0);

    // Heat map — equal blend for smooth look
    float heat = cells * 0.5 + plasma * 0.5;
    heat *= pulse;
    heat *= 1.0 - spots * 0.35;   // 35% spot darkening — mildest of all

    // Contrast curve — gentler than sun/red dwarf for smoother look
    heat = smoothstep(0.2, 0.85, heat);

    // TECHNIQUE: Limb darkening — pow(viewAngle, 0.5), strongest of the three
    // star types. Hot blue giants have steep photospheric temperature gradients.
    float limb = pow(viewAngle, 0.5);
    heat *= 0.6 + limb * 0.4;

    // Minimal edge flares — blue giants are more stable due to their
    // radiation-dominated envelopes (less convective turbulence at surface)
    float edgeDist = 1.0 - viewAngle;
    float edgeFlare = pow(edgeDist, 3.0) * fbm(spherePos * 6.0 + vec3(time * 0.1), 3);
    heat += edgeFlare * 0.12;     // Lowest flare contribution (vs 0.2 Sun, 0.3 red dwarf)

    heat = clamp(heat, 0.0, 1.0);

    // Uses starRamp (not firePalette) — Planck's law can't produce blue colors
    // at any temperature, so the palette is hand-tuned for ~20000K appearance.
    vec3 color = starRamp(heat) * (1.5 + heat * 2.0);
    // Quadratic emissive boost — hottest regions blaze white-blue
    color += starRamp(1.0) * heat * heat * 0.8;

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
    // Offset screen-space angle by star's axial rotation so corona rotates with surface
    float starRot = time * 0.09;
    float angle = atan(p.y, p.x) - starRot;

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
    float rotX = time * 0.3;               // Horizontal orbit (slowest: 0.3 vs 0.36 vs 0.45)
    float rotY = sin(time * 0.12) * 0.2;   // Vertical bob — gentlest (+/-0.2 vs 0.25 vs 0.3)

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
            float starRot = time * 0.09;
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
`},channels:{},commonsSources:[{name:"noise-simplex",source:`/**
 * Simplex Noise (Ashima Arts implementation)
 * @author guinetik
 * @date 2026-02-16
 *
 * 2D and 3D simplex noise plus FBM and specialty variants.
 * Simplex noise is preferred over classic Perlin for 3D work because it
 * evaluates 4 simplex corners instead of 8 cube corners, and has no
 * axis-aligned artifacts. Range is approximately [-1, 1].
 *
 * Noise: Chosen for star surfaces, corona flames, and planet terrain where
 * isotropic noise without grid bias is important. Costlier than value noise
 * but cheaper than 3D Perlin in practice due to fewer gradient evaluations.
 *
 * Based on: "Simplex noise demystified" by Stefan Gustavson (2005),
 * GLSL implementation by Ashima Arts / Ian McEwan.
 */

// === INTERNAL HELPERS ===
// These mod289/permute functions form the hash core of simplex noise.
// 289 = 17*17 — chosen so that permute(permute(x)) covers [0,289) uniformly.

vec2 mod289_s2(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 mod289_s3(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289_s4(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }

vec3 permute_s3(vec3 x) { return mod289_s3(((x * 34.0) + 1.0) * x); }
vec4 permute_s4(vec4 x) { return mod289_s4(((x * 34.0) + 1.0) * x); }

vec4 taylorInvSqrt_s(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

// === 3D SIMPLEX NOISE ===

/**
 * 3D simplex noise.
 *
 * Evaluates gradient noise on a simplex (tetrahedron) lattice.
 * Output range is approximately [-1, 1].
 *
 * @param v  3D sample position
 * @return   Noise value in ~[-1, 1]
 */
float snoise3D(vec3 v) {
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

    i = mod289_s3(i);
    vec4 p = permute_s4(permute_s4(permute_s4(
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

    vec4 norm = taylorInvSqrt_s(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

// === 2D SIMPLEX NOISE ===

/**
 * 2D simplex noise.
 *
 * Evaluates gradient noise on a triangular simplex lattice.
 * Output range is approximately [-1, 1].
 *
 * @param v  2D sample position
 * @return   Noise value in ~[-1, 1]
 */
float snoise2D(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289_s2(i);
    vec3 p = permute_s3(permute_s3(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

// === FBM VARIANTS ===

/**
 * 2D FBM using simplex noise, 5 fixed octaves.
 *
 * Standard lacunarity 2.0, gain 0.5 (pink noise spectrum).
 *
 * @param p  2D sample position
 * @return   FBM value, centered near 0
 */
float fbmSimplex2D(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
        value += amplitude * snoise2D(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

/**
 * 3D FBM using simplex noise, configurable octaves (1–6).
 *
 * Standard lacunarity 2.0, gain 0.5 (pink noise spectrum).
 *
 * @param p        3D sample position
 * @param octaves  Number of octaves (clamped to 1–6)
 * @return         FBM value, centered near 0
 */
float fbmSimplex3D(vec3 p, int octaves) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 6; i++) {
        if (i >= octaves) break;
        value += amplitude * snoise3D(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
    }
    return value;
}

// === SPECIALTY NOISE ===

/**
 * Seamless tiling noise for sphere textures.
 *
 * Uses lattice hashing with modular wrap to tile seamlessly at resolution \`res\`.
 * Output range is [-1, 1]. Ideal for star flame patterns where seam-free
 * spherical coverage is needed.
 *
 * @param uv   3D coordinate (typically angular coords + time)
 * @param res  Tiling resolution — higher = finer detail
 * @return     Tiled noise in [-1, 1]
 */
float tiledNoise3D(vec3 uv, float res) {
    uv *= res;
    vec3 uv0 = floor(mod(uv, res)) * vec3(1.0, 100.0, 10000.0);
    vec3 uv1 = floor(mod(uv + vec3(1.0), res)) * vec3(1.0, 100.0, 10000.0);
    vec3 f = fract(uv);
    f = f * f * (3.0 - 2.0 * f);

    vec4 v = vec4(uv0.x + uv0.y + uv0.z, uv1.x + uv0.y + uv0.z,
                  uv0.x + uv1.y + uv0.z, uv1.x + uv1.y + uv0.z);

    vec4 r = fract(sin(v * 0.001) * 100000.0);
    float r0 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);

    r = fract(sin((v + uv1.z - uv0.z) * 0.001) * 100000.0);
    float r1 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);

    return mix(r0, r1, f.z) * 2.0 - 1.0;
}

/**
 * Animated flowing plasma noise.
 *
 * Multi-octave simplex noise with per-octave time-varying offsets that
 * create a "boiling" or flowing effect. Normalized to [0, 1].
 * Used for star surface plasma, lava flows, and other animated surfaces.
 *
 * @param p     3D sample position
 * @param time  Animation time (typically iTime or wrapped iTime)
 * @return      Plasma value in [0, 1]
 */
float plasmaNoise(vec3 p, float time) {
    float value = 0.0;
    float amplitude = 1.0;
    float frequency = 1.0;
    float totalAmp = 0.0;

    for (int i = 0; i < 5; i++) {
        vec3 offset = vec3(
            sin(time * 0.1 + float(i)) * 0.5,
            cos(time * 0.15 + float(i) * 0.7) * 0.5,
            time * 0.05
        );
        value += amplitude * snoise3D((p + offset) * frequency);
        totalAmp += amplitude;
        amplitude *= 0.5;
        frequency *= 2.0;
    }

    return value / totalAmp;
}
`}]},{slug:"star-red-dwarf",title:"Red Dwarf",description:"A small, turbulent red dwarf star with orange-red boiling plasma, active flares, and prominent corona. Temperature locked at ~3000K with high stellar activity.",date:"2025-11-29",tags:["exoplanets","space","3d","raymarching"],links:{},screenshotUrl:k0,passes:{image:`/**
 * Red Dwarf Star
 * @author guinetik
 * @date 2025-11-29
 *
 * A small, turbulent red dwarf star with deep red-orange plasma, cell-like
 * granulation, cycling starspots, and a warm glowing corona. Temperature
 * locked at ~3000K with high stellar activity — the most active of the three
 * star types.
 *
 * Based on the exoplanets v2 star shaders by guinetik.
 * Fire palette based on "Combustible Voronoi" by Shane.
 *
 * Rendering layers (back to front):
 *   1. Background      — near-black with subtle blue tint
 *   2. Glow            — inverse-square radial falloff, deep red-orange
 *   3. Corona          — FBM flame tendrils + 4 cyclic prominences
 *   4. Star surface    — granulation cells, plasma flow, dual-layer spots,
 *                        self-emission via Planck blackbody palette
 *   5. Tone mapping    — Reinhard operator with exposure boost
 *
 * TECHNIQUE: Ray-sphere intersection with orbiting camera.
 *
 * TECHNIQUE: Planck's law fire palette (1200-2400K range) for physically-motivated
 * deep red through orange fire colors — cooler than the Sun, matching M-dwarf
 * photosphere temperatures.
 *
 * TECHNIQUE: Self-emission rendering — no directional lighting. All visual detail
 * comes from heat-to-color mapping through the fire palette. Contrast curve
 * (smoothstep) sharpens granule boundaries.
 *
 * TECHNIQUE: Granulation using 1-abs(noise) for cell-like patterns with bright
 * convective centers and thin dark intergranular lanes. Highest frequencies of
 * the three star types, reflecting the most turbulent convection cells.
 *
 * TECHNIQUE: Limb darkening with pow(viewAngle, 0.35) — stronger than the Sun,
 * approximating the deeper convective envelope of a red dwarf.
 *
 * TECHNIQUE: Prominence lifecycle. Corona prominences use a golden-ratio angular
 * distribution (0.618 * i) for even spacing, modulated by sin()-based lifecycle
 * functions so prominences grow and fade over time independently.
 *
 * Physics: Color palette approximates ~3000K blackbody radiation — dominant
 * deep red emission with occasional orange flare peaks. Red dwarfs are fully
 * convective, so the surface shows vigorous boiling granulation at higher
 * activity levels than hotter stars.
 *
 * Noise: 3D simplex noise (Ashima Arts implementation) chosen for its smooth,
 * isotropic gradients — critical for convincing stellar surface turbulence
 * without visible grid artifacts. FBM with up to 5 octaves for plasma flow.
 */

#define PI 3.14159265359   // Half-circle — used for prominence angular wrapping
#define TAU 6.28318530718  // Full circle — used for prominence distribution

// =============================================================================
// NOISE — 3D Simplex Noise provided by noise-simplex commons (snoise3D)
// =============================================================================

// FBM with configurable octaves — lacunarity 2.0, gain 0.5
// Domain offset vec3(100.0) between octaves decorrelates layers.
// 5 octaves for plasma detail, 3-4 for corona flames.
// NOTE: Kept inline because the domain shift differs from fbmSimplex3D.
float fbm(vec3 p, int octaves) {
    float v = 0.0, a = 0.5, f = 1.0;
    for (int i = 0; i < 6; i++) {
        if (i >= octaves) break;
        v += a * snoise3D(p * f);
        f *= 2.0;         // Double frequency each octave
        a *= 0.5;         // Halve amplitude each octave
        p += vec3(100.0); // Domain shift to decorrelate
    }
    return v;
}

// =============================================================================
// FIRE PALETTE — Planck's law blackbody radiation
// =============================================================================
// Physics: Maps a 0-1 heat value to blackbody color via Planck spectral radiance.
// Temperature range chosen for deep red M-dwarf colors:
//   i=0 → 1200K (deep red/dark)  i=0.5 → 1800K (warm red-orange)  i=1 → 2400K (orange)
// Based on "Combustible Voronoi" by Shane (https://www.shadertoy.com/view/4tlSzl).

#define TEMP_MIN 1200.0   // Coolest — deep red, starspot
#define TEMP_RANGE 1200.0  // Range — 1200K to 2400K, deep red through orange

vec3 firePalette(float i) {
    float T = TEMP_MIN + TEMP_RANGE * i;
    vec3 L = vec3(7.4, 5.6, 4.4);   // RGB wavelengths in 100s of nm
    L = pow(L, vec3(5.0)) * (exp(1.43876719683e5 / (T * L)) - 1.0);
    return 1.0 - exp(-5e8 / L);
}

// =============================================================================
// STAR SURFACE
// =============================================================================

// Granulation — cell-like pattern using 1-abs(noise).
// This creates bright convective cells with thin dark intergranular lanes.
// Highest frequencies of the three star types — red dwarfs are the most turbulent.
float granulation(vec3 p, float time) {
    // Large cells — primary granulation scale
    float g1 = 1.0 - abs(snoise3D(p * 6.0 + vec3(0.0, time * 0.1, 0.0)));
    // Medium cells — supergranulation
    float g2 = 1.0 - abs(snoise3D(p * 12.0 + vec3(time * 0.08, 0.0, time * 0.07)));
    // Fine turbulence — surface detail
    float g3 = snoise3D(p * 25.0 + vec3(0.0, time * 0.12, time * 0.1)) * 0.5 + 0.5;
    return g1 * 0.5 + g2 * 0.3 + g3 * 0.2;
}

// Starspots — dual-layer cycling spots. Red dwarfs have the most active spots
// due to their fully convective interiors and strong magnetic fields.
// Two noise layers at different speeds create spots that cycle in and out.
float starSpots(vec3 p, float time) {
    // Primary spots — moderate speed so they visibly drift and fade
    float spots1 = snoise3D(p * 3.0 + vec3(0.0, time * 0.05, time * 0.04));
    // Secondary cycle — different frequency creates interference pattern
    // so spots appear/vanish as the two layers phase in and out of alignment
    float spots2 = snoise3D(p * 4.0 + vec3(time * 0.06, 0.0, time * 0.03) + vec3(30.0));
    float spots = spots1 * 0.6 + spots2 * 0.4;
    return smoothstep(0.4, 0.75, spots);
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

// Surface rendering — pure self-luminous plasma, no directional lighting.
// All visual detail comes from heat-to-color mapping through the fire palette.
// Red dwarf is the most active star type — strongest spots and edge flares.
vec3 renderSurface(vec3 spherePos, float viewAngle, float time) {
    float plasma = plasmaFlow(spherePos, time);
    float cells = granulation(spherePos, time);
    float spots = starSpots(spherePos, time);

    // Pulsing modulation — convective churning
    float pulse = 0.9 + 0.1 * sin(time * 0.5 + snoise3D(spherePos * 2.0) * 3.0);

    // Heat map — equal blend of cells and plasma
    float heat = cells * 0.5 + plasma * 0.5;
    heat *= pulse;
    heat *= 1.0 - spots * 0.5;

    // Contrast curve — sharpens granule boundaries.
    // Pushes bright areas brighter and dark lanes darker.
    heat = smoothstep(0.15, 0.85, heat);

    // Limb darkening — purely emissive, just reduces heat at edges
    float limb = pow(viewAngle, 0.35);
    heat *= 0.55 + limb * 0.45;

    // Edge flares — bright turbulence at the limb
    float edgeDist = 1.0 - viewAngle;
    float edgeFlare = pow(edgeDist, 2.0) * fbm(spherePos * 8.0 + vec3(time * 0.2), 3);
    heat += edgeFlare * 0.25;

    heat = clamp(heat, 0.0, 1.0);

    // Fire palette — all color from self-emission, no shading
    vec3 color = firePalette(heat) * (1.0 + heat * 2.0);

    // Quadratic emissive boost — hottest granule centers blaze
    color += firePalette(1.0) * heat * heat * 1.0;

    return color;
}

// =============================================================================
// GLOW AND CORONA
// =============================================================================

// Radial glow — inverse-square falloff, deep red-orange from fire palette.
vec3 renderGlow(vec2 p, float starRadius) {
    float dist = length(p);
    float r = dist / starRadius;   // Normalized distance from star center

    // Soft inner glow — 1/r^2 with small epsilon to prevent division by zero
    float glow = 1.0 / (r * r * 1.5 + 0.01);  // Factor 1.5 controls falloff steepness
    glow *= smoothstep(4.0, 1.0, r);           // Fade to zero beyond 4x star radius
    vec3 glowColor = firePalette(0.6) * glow * 0.15;  // 0.15 intensity — brighter = more bloom

    // Wider, dimmer haze — secondary falloff layer
    float haze = 1.0 / (r * r * 5.0 + 0.1);   // Steeper 1/r^2 for outer haze
    haze *= smoothstep(6.0, 1.5, r);            // Extends to 6x radius
    glowColor += firePalette(0.3) * haze * 0.1;  // Deep red outer haze

    return glowColor;
}

// Corona — FBM-driven flame tendrils extending beyond the stellar surface.
// Only rendered in the annular region between 1.0x and 2.0x star radius.
vec3 renderCorona(vec2 p, float starRadius, float time) {
    float dist = length(p);
    float r = dist / starRadius;

    if (r < 1.0 || r > 2.0) return vec3(0.0);  // Skip pixels outside corona range

    float rimFactor = (r - 1.0);   // 0 at surface, 1 at outer corona edge
    // Offset screen-space angle by star's axial rotation so corona rotates with surface
    float starRot = time * 0.15;
    float angle = atan(p.y, p.x) - starRot;

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

    vec3 coronaColor = mix(firePalette(0.8), firePalette(0.4), rimFactor);
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
    float rotX = time * 0.45;              // Horizontal orbit speed — fastest of three star types
    float rotY = sin(time * 0.21) * 0.3;  // Vertical bob amplitude — +/-0.3 rad

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
            float starRot = time * 0.15;
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
`},channels:{},commonsSources:[{name:"noise-simplex",source:`/**
 * Simplex Noise (Ashima Arts implementation)
 * @author guinetik
 * @date 2026-02-16
 *
 * 2D and 3D simplex noise plus FBM and specialty variants.
 * Simplex noise is preferred over classic Perlin for 3D work because it
 * evaluates 4 simplex corners instead of 8 cube corners, and has no
 * axis-aligned artifacts. Range is approximately [-1, 1].
 *
 * Noise: Chosen for star surfaces, corona flames, and planet terrain where
 * isotropic noise without grid bias is important. Costlier than value noise
 * but cheaper than 3D Perlin in practice due to fewer gradient evaluations.
 *
 * Based on: "Simplex noise demystified" by Stefan Gustavson (2005),
 * GLSL implementation by Ashima Arts / Ian McEwan.
 */

// === INTERNAL HELPERS ===
// These mod289/permute functions form the hash core of simplex noise.
// 289 = 17*17 — chosen so that permute(permute(x)) covers [0,289) uniformly.

vec2 mod289_s2(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 mod289_s3(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289_s4(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }

vec3 permute_s3(vec3 x) { return mod289_s3(((x * 34.0) + 1.0) * x); }
vec4 permute_s4(vec4 x) { return mod289_s4(((x * 34.0) + 1.0) * x); }

vec4 taylorInvSqrt_s(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

// === 3D SIMPLEX NOISE ===

/**
 * 3D simplex noise.
 *
 * Evaluates gradient noise on a simplex (tetrahedron) lattice.
 * Output range is approximately [-1, 1].
 *
 * @param v  3D sample position
 * @return   Noise value in ~[-1, 1]
 */
float snoise3D(vec3 v) {
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

    i = mod289_s3(i);
    vec4 p = permute_s4(permute_s4(permute_s4(
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

    vec4 norm = taylorInvSqrt_s(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

// === 2D SIMPLEX NOISE ===

/**
 * 2D simplex noise.
 *
 * Evaluates gradient noise on a triangular simplex lattice.
 * Output range is approximately [-1, 1].
 *
 * @param v  2D sample position
 * @return   Noise value in ~[-1, 1]
 */
float snoise2D(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289_s2(i);
    vec3 p = permute_s3(permute_s3(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

// === FBM VARIANTS ===

/**
 * 2D FBM using simplex noise, 5 fixed octaves.
 *
 * Standard lacunarity 2.0, gain 0.5 (pink noise spectrum).
 *
 * @param p  2D sample position
 * @return   FBM value, centered near 0
 */
float fbmSimplex2D(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
        value += amplitude * snoise2D(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

/**
 * 3D FBM using simplex noise, configurable octaves (1–6).
 *
 * Standard lacunarity 2.0, gain 0.5 (pink noise spectrum).
 *
 * @param p        3D sample position
 * @param octaves  Number of octaves (clamped to 1–6)
 * @return         FBM value, centered near 0
 */
float fbmSimplex3D(vec3 p, int octaves) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 6; i++) {
        if (i >= octaves) break;
        value += amplitude * snoise3D(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
    }
    return value;
}

// === SPECIALTY NOISE ===

/**
 * Seamless tiling noise for sphere textures.
 *
 * Uses lattice hashing with modular wrap to tile seamlessly at resolution \`res\`.
 * Output range is [-1, 1]. Ideal for star flame patterns where seam-free
 * spherical coverage is needed.
 *
 * @param uv   3D coordinate (typically angular coords + time)
 * @param res  Tiling resolution — higher = finer detail
 * @return     Tiled noise in [-1, 1]
 */
float tiledNoise3D(vec3 uv, float res) {
    uv *= res;
    vec3 uv0 = floor(mod(uv, res)) * vec3(1.0, 100.0, 10000.0);
    vec3 uv1 = floor(mod(uv + vec3(1.0), res)) * vec3(1.0, 100.0, 10000.0);
    vec3 f = fract(uv);
    f = f * f * (3.0 - 2.0 * f);

    vec4 v = vec4(uv0.x + uv0.y + uv0.z, uv1.x + uv0.y + uv0.z,
                  uv0.x + uv1.y + uv0.z, uv1.x + uv1.y + uv0.z);

    vec4 r = fract(sin(v * 0.001) * 100000.0);
    float r0 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);

    r = fract(sin((v + uv1.z - uv0.z) * 0.001) * 100000.0);
    float r1 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);

    return mix(r0, r1, f.z) * 2.0 - 1.0;
}

/**
 * Animated flowing plasma noise.
 *
 * Multi-octave simplex noise with per-octave time-varying offsets that
 * create a "boiling" or flowing effect. Normalized to [0, 1].
 * Used for star surface plasma, lava flows, and other animated surfaces.
 *
 * @param p     3D sample position
 * @param time  Animation time (typically iTime or wrapped iTime)
 * @return      Plasma value in [0, 1]
 */
float plasmaNoise(vec3 p, float time) {
    float value = 0.0;
    float amplitude = 1.0;
    float frequency = 1.0;
    float totalAmp = 0.0;

    for (int i = 0; i < 5; i++) {
        vec3 offset = vec3(
            sin(time * 0.1 + float(i)) * 0.5,
            cos(time * 0.15 + float(i) * 0.7) * 0.5,
            time * 0.05
        );
        value += amplitude * snoise3D((p + offset) * frequency);
        totalAmp += amplitude;
        amplitude *= 0.5;
        frequency *= 2.0;
    }

    return value / totalAmp;
}
`}]},{slug:"star-study",title:"Star Study",description:"A procedural star with boiling plasma surface and an orbiting planet",date:"2025-11-30",tags:["exoplanets","space","3d","raymarching"],links:{},screenshotUrl:H0,passes:{image:`/**\r
 * Star Study - 3D Raymarched Star with Orbiting Planet\r
 *\r
 * @author guinetik\r
 * @date 2025-11-30\r
 *\r
 * A procedural star system featuring a realistic granulated plasma surface,\r
 * corona flames, solar prominences, and an orbiting rocky planet.\r
 *\r
 * Features:\r
 * - Raymarched 3D star with 1-abs(noise) granulation for convection cells\r
 * - Dual-layer cycling spots, plasma flow, and contrast-curved heat mapping\r
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
 * Commons: sphere (intersectSphere), color (hsv2rgb/rgb2hsv), noise-simplex\r
 * (snoise2D/3D, fbmSimplex2D, tiledNoise3D, plasmaNoise).\r
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
// LOCAL UTILITIES (unique to star-study, not in commons)\r
// =============================================================================\r
\r
float hash(float n) { return fract(sin(n) * 43758.5453123); }\r
float hash3(vec3 p) {\r
    p = fract(p * 0.3183099 + 0.1);\r
    p *= 17.0;\r
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));\r
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
// CAMERA\r
// =============================================================================\r
\r
mat3 rotateY(float a) {\r
    float c = cos(a), s = sin(a);\r
    return mat3(c, 0, s, 0, 1, 0, -s, 0, c);\r
}\r
\r
// =============================================================================\r
// FBM — inline with domain shift (differs from fbmSimplex3D in commons)\r
// =============================================================================\r
\r
float fbm(vec3 p, int octaves) {\r
    float v = 0.0, a = 0.5, f = 1.0;\r
    for (int i = 0; i < 6; i++) {\r
        if (i >= octaves) break;\r
        v += a * snoise3D(p * f);\r
        f *= 2.0;\r
        a *= 0.5;\r
        p += vec3(100.0);\r
    }\r
    return v;\r
}\r
\r
// =============================================================================\r
// GRANULATION — cell-like pattern using 1-abs(noise)\r
// =============================================================================\r
// Bright convective cells with thin dark intergranular lanes,\r
// matching the real photosphere appearance across all spectral types.\r
\r
float granulation(vec3 p, float time) {\r
    // Large cells — primary granulation scale\r
    float g1 = 1.0 - abs(snoise3D(p * 5.0 + vec3(0.0, time * 0.08, 0.0)));\r
    // Medium cells — supergranulation\r
    float g2 = 1.0 - abs(snoise3D(p * 10.0 + vec3(time * 0.07, 0.0, time * 0.06)));\r
    // Fine turbulence — surface detail\r
    float g3 = snoise3D(p * 20.0 + vec3(0.0, time * 0.1, time * 0.08)) * 0.5 + 0.5;\r
    return g1 * 0.5 + g2 * 0.3 + g3 * 0.2;\r
}\r
\r
// =============================================================================\r
// STAR SPOTS — dual-layer cycling dark regions\r
// =============================================================================\r
// Two noise layers at different speeds create spots that cycle in and out\r
// as the layers phase in/out of alignment.\r
\r
float starSpots(vec3 p, float time) {\r
    float spots1 = snoise3D(p * 2.5 + vec3(0.0, time * 0.04, time * 0.03));\r
    float spots2 = snoise3D(p * 3.5 + vec3(time * 0.05, 0.0, time * 0.02) + vec3(30.0));\r
    float spots = spots1 * 0.6 + spots2 * 0.4;\r
    return smoothstep(0.45, 0.8, spots);\r
}\r
\r
// =============================================================================\r
// PLASMA FLOW — large-scale turbulent flow patterns\r
// =============================================================================\r
\r
float plasmaFlow(vec3 p, float time) {\r
    vec3 q = p * 3.0;\r
    q += vec3(sin(time * 0.12) * 0.4, cos(time * 0.15) * 0.35, time * 0.06);\r
    float n1 = fbm(q, 5) * 0.5 + 0.5;\r
\r
    vec3 r = p * 5.0 + vec3(50.0);\r
    r += vec3(cos(time * 0.1) * 0.4, sin(time * 0.13) * 0.3, time * 0.08);\r
    float n2 = fbm(r, 4) * 0.5 + 0.5;\r
\r
    return n1 * 0.55 + n2 * 0.45;\r
}\r
\r
// =============================================================================\r
// STAR SURFACE — pure self-luminous plasma, color from baseColor × heat\r
// =============================================================================\r
// TECHNIQUE: Same granulation/spots/plasma pipeline as individual star shaders,\r
// but instead of firePalette (which can't produce blue), the heat map modulates\r
// the temperatureToColor base — cool lanes get darker/warmer, hot granules\r
// get brighter, preserving the spectral cycling across all temperatures.\r
\r
vec3 renderSurface(vec3 spherePos, float viewAngle, vec3 baseColor, float time) {\r
    float plasma = plasmaFlow(spherePos, time);\r
    float cells = granulation(spherePos, time);\r
    float spots = starSpots(spherePos, time);\r
\r
    // Pulsing modulation — convective churning\r
    float pulse = 0.9 + 0.1 * sin(time * 0.5 + snoise3D(spherePos * 2.0) * 4.0);\r
\r
    // Heat map — granulation dominant for visible cell structure\r
    float heat = cells * 0.55 + plasma * 0.45;\r
    heat *= pulse;\r
    heat *= 1.0 - spots * 0.5;\r
\r
    // Contrast curve — sharpens granule boundaries\r
    heat = smoothstep(0.15, 0.85, heat);\r
\r
    // Limb darkening — purely emissive, just reduces heat at edges\r
    float limb = pow(viewAngle, 0.4);\r
    heat *= 0.55 + limb * 0.45;\r
\r
    // Edge flares — bright turbulence at the limb\r
    float edgeDist = 1.0 - viewAngle;\r
    float edgeFlare = pow(edgeDist, 2.0) * fbm(spherePos * 7.0 + vec3(time * 0.15), 3);\r
    heat += edgeFlare * 0.2;\r
\r
    heat = clamp(heat, 0.0, 1.0);\r
\r
    // Color mapping — baseColor modulated by heat instead of firePalette.\r
    // Cool lanes get a dark, warm-shifted multiplier; hot granules get bright boost.\r
    vec3 coolColor = baseColor * vec3(0.4, 0.25, 0.15);\r
    vec3 hotColor = baseColor * vec3(1.5, 1.3, 1.1);\r
    vec3 color = mix(coolColor, hotColor, heat) * (1.0 + heat * 2.0);\r
\r
    // Quadratic emissive boost — hottest granule centers blaze\r
    color += baseColor * heat * heat * 1.0;\r
\r
    return color;\r
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
    float terrain = fbmSimplex2D(terrainUv * (3.0 + seed * 3.0));\r
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
            float viewAngle = max(dot(n, -rd), 0.0);\r
            col = renderSurface(rotatedP, viewAngle, starColor, iTime);\r
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
`},channels:{},commonsSources:[{name:"sphere",source:`/**
 * Sphere Projection & Intersection Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless helpers for analytic sphere rendering:
 * 2D rotation, responsive UV-to-sphere projection, ray-sphere intersection,
 * and surface normal/UV extraction.
 */

// === 2D ROTATION ===

/**
 * Rotate a 2D vector by angle \`a\` (radians).
 * Equivalent to multiplying by mat2(cos(a), -sin(a), sin(a), cos(a)).
 */
vec2 Rotate(vec2 p, float a) {
    return p * cos(a) + vec2(-p.y, p.x) * sin(a);
}

// === SPHERE PROJECTION ===

/**
 * Compute responsive UV coordinates for unit-sphere rendering.
 *
 * Maps fragment coordinates to a centered coordinate system where the
 * unit sphere fills most of the viewport. On portrait screens, applies an
 * additional scale boost to shrink the sphere from ~91% to ~68% of viewport
 * width, preventing the sphere from dominating mobile displays.
 *
 * Portrait boost: linearly increases with portrait-ness (1 - aspect),
 * scaled by 0.7 for a natural feel. On landscape/square screens the boost
 * is zero and behavior is identical to the original formula.
 *
 * | Device             | Aspect | uvScale | Sphere width fill |
 * |--------------------|--------|---------|-------------------|
 * | Phone portrait     | 0.46   | 3.04    | ~68%              |
 * | iPad portrait      | 0.75   | 1.72    | ~78%              |
 * | Desktop 16:9       | 1.78   | 1.1     | ~51% (unchanged)  |
 *
 * @param fragCoord  Pixel coordinates (gl_FragCoord.xy)
 * @param resolution Viewport resolution (iResolution.xy)
 * @param baseScale  Base UV scale — larger zooms out (typically 1.1)
 * @return Centered UV coordinates where unit sphere has radius 1.0
 */
vec2 sphereUV(vec2 fragCoord, vec2 resolution, float baseScale) {
    float aspect = resolution.x / resolution.y;
    // Boost effective scale on portrait screens to shrink sphere from 91% → ~68% width fill
    float portraitBoost = max(0.0, 1.0 - aspect) * 0.7;
    float uvScale = (baseScale + portraitBoost) / min(1.0, aspect);
    return uvScale * (2.0 * fragCoord - resolution) / resolution.y;
}

// === RAY-SPHERE INTERSECTION ===

// Guard PI/TAU defines to avoid conflicts with shader-local constants
#ifndef M_PI
#define M_PI 3.14159265359
#endif
#ifndef M_TAU
#define M_TAU 6.28318530718
#endif

/**
 * Ray-sphere intersection via quadratic discriminant.
 *
 * Solves |ro + t*rd - center|^2 = radius^2 for the nearest positive t.
 * Returns -1.0 on miss (discriminant < 0 or both roots behind the ray).
 *
 * @param ro      Ray origin
 * @param rd      Ray direction (must be normalized)
 * @param center  Sphere center in world space
 * @param radius  Sphere radius
 * @return Nearest positive t, or -1.0 if no hit
 */
float intersectSphere(vec3 ro, vec3 rd, vec3 center, float radius) {
    vec3 oc = ro - center;
    float b = dot(oc, rd);
    float c = dot(oc, oc) - radius * radius;
    float h = b * b - c;

    if (h < 0.0) return -1.0;

    h = sqrt(h);
    float t = -b - h;

    if (t < 0.0) t = -b + h;
    if (t < 0.0) return -1.0;

    return t;
}

/**
 * Compute surface normal and spherical UV at a hit point on a sphere.
 *
 * Normal points outward from center. UV maps longitude to [0,1] on x
 * and latitude to [0,1] on y (0 = south pole, 1 = north pole).
 *
 * @param hitPoint  World-space intersection point
 * @param center    Sphere center
 * @param normal    (out) Unit surface normal
 * @param uv        (out) Spherical UV in [0,1]^2
 */
void getSphereInfo(vec3 hitPoint, vec3 center, out vec3 normal, out vec2 uv) {
    normal = normalize(hitPoint - center);
    float latitude = 0.5 + asin(normal.y) / M_PI;
    float longitude = 0.5 + atan(normal.x, normal.z) / M_TAU;
    uv = vec2(longitude, latitude);
}
`},{name:"color",source:`/**
 * Color Conversion Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless color space conversion functions.
 */

// === HSL TO RGB ===

/**
 * Convert HSL color to RGB.
 *
 * @param h  Hue in degrees (0–360, wraps automatically)
 * @param s  Saturation (0.0–1.0)
 * @param l  Lightness (0.0–1.0)
 * @return RGB color in [0, 1] per component
 */
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

// === HSV CONVERSIONS ===

/**
 * Convert RGB color to HSV.
 *
 * @param c  RGB color in [0, 1] per component
 * @return   HSV where H is in [0, 1] (not degrees), S and V in [0, 1]
 */
vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

/**
 * Convert HSV color to RGB.
 *
 * @param c  HSV where H is in [0, 1] (not degrees), S and V in [0, 1]
 * @return   RGB color in [0, 1] per component
 */
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
`},{name:"noise-simplex",source:`/**
 * Simplex Noise (Ashima Arts implementation)
 * @author guinetik
 * @date 2026-02-16
 *
 * 2D and 3D simplex noise plus FBM and specialty variants.
 * Simplex noise is preferred over classic Perlin for 3D work because it
 * evaluates 4 simplex corners instead of 8 cube corners, and has no
 * axis-aligned artifacts. Range is approximately [-1, 1].
 *
 * Noise: Chosen for star surfaces, corona flames, and planet terrain where
 * isotropic noise without grid bias is important. Costlier than value noise
 * but cheaper than 3D Perlin in practice due to fewer gradient evaluations.
 *
 * Based on: "Simplex noise demystified" by Stefan Gustavson (2005),
 * GLSL implementation by Ashima Arts / Ian McEwan.
 */

// === INTERNAL HELPERS ===
// These mod289/permute functions form the hash core of simplex noise.
// 289 = 17*17 — chosen so that permute(permute(x)) covers [0,289) uniformly.

vec2 mod289_s2(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 mod289_s3(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289_s4(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }

vec3 permute_s3(vec3 x) { return mod289_s3(((x * 34.0) + 1.0) * x); }
vec4 permute_s4(vec4 x) { return mod289_s4(((x * 34.0) + 1.0) * x); }

vec4 taylorInvSqrt_s(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

// === 3D SIMPLEX NOISE ===

/**
 * 3D simplex noise.
 *
 * Evaluates gradient noise on a simplex (tetrahedron) lattice.
 * Output range is approximately [-1, 1].
 *
 * @param v  3D sample position
 * @return   Noise value in ~[-1, 1]
 */
float snoise3D(vec3 v) {
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

    i = mod289_s3(i);
    vec4 p = permute_s4(permute_s4(permute_s4(
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

    vec4 norm = taylorInvSqrt_s(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

// === 2D SIMPLEX NOISE ===

/**
 * 2D simplex noise.
 *
 * Evaluates gradient noise on a triangular simplex lattice.
 * Output range is approximately [-1, 1].
 *
 * @param v  2D sample position
 * @return   Noise value in ~[-1, 1]
 */
float snoise2D(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289_s2(i);
    vec3 p = permute_s3(permute_s3(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

// === FBM VARIANTS ===

/**
 * 2D FBM using simplex noise, 5 fixed octaves.
 *
 * Standard lacunarity 2.0, gain 0.5 (pink noise spectrum).
 *
 * @param p  2D sample position
 * @return   FBM value, centered near 0
 */
float fbmSimplex2D(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
        value += amplitude * snoise2D(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

/**
 * 3D FBM using simplex noise, configurable octaves (1–6).
 *
 * Standard lacunarity 2.0, gain 0.5 (pink noise spectrum).
 *
 * @param p        3D sample position
 * @param octaves  Number of octaves (clamped to 1–6)
 * @return         FBM value, centered near 0
 */
float fbmSimplex3D(vec3 p, int octaves) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 6; i++) {
        if (i >= octaves) break;
        value += amplitude * snoise3D(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
    }
    return value;
}

// === SPECIALTY NOISE ===

/**
 * Seamless tiling noise for sphere textures.
 *
 * Uses lattice hashing with modular wrap to tile seamlessly at resolution \`res\`.
 * Output range is [-1, 1]. Ideal for star flame patterns where seam-free
 * spherical coverage is needed.
 *
 * @param uv   3D coordinate (typically angular coords + time)
 * @param res  Tiling resolution — higher = finer detail
 * @return     Tiled noise in [-1, 1]
 */
float tiledNoise3D(vec3 uv, float res) {
    uv *= res;
    vec3 uv0 = floor(mod(uv, res)) * vec3(1.0, 100.0, 10000.0);
    vec3 uv1 = floor(mod(uv + vec3(1.0), res)) * vec3(1.0, 100.0, 10000.0);
    vec3 f = fract(uv);
    f = f * f * (3.0 - 2.0 * f);

    vec4 v = vec4(uv0.x + uv0.y + uv0.z, uv1.x + uv0.y + uv0.z,
                  uv0.x + uv1.y + uv0.z, uv1.x + uv1.y + uv0.z);

    vec4 r = fract(sin(v * 0.001) * 100000.0);
    float r0 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);

    r = fract(sin((v + uv1.z - uv0.z) * 0.001) * 100000.0);
    float r1 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);

    return mix(r0, r1, f.z) * 2.0 - 1.0;
}

/**
 * Animated flowing plasma noise.
 *
 * Multi-octave simplex noise with per-octave time-varying offsets that
 * create a "boiling" or flowing effect. Normalized to [0, 1].
 * Used for star surface plasma, lava flows, and other animated surfaces.
 *
 * @param p     3D sample position
 * @param time  Animation time (typically iTime or wrapped iTime)
 * @return      Plasma value in [0, 1]
 */
float plasmaNoise(vec3 p, float time) {
    float value = 0.0;
    float amplitude = 1.0;
    float frequency = 1.0;
    float totalAmp = 0.0;

    for (int i = 0; i < 5; i++) {
        vec3 offset = vec3(
            sin(time * 0.1 + float(i)) * 0.5,
            cos(time * 0.15 + float(i) * 0.7) * 0.5,
            time * 0.05
        );
        value += amplitude * snoise3D((p + offset) * frequency);
        totalAmp += amplitude;
        amplitude *= 0.5;
        frequency *= 2.0;
    }

    return value / totalAmp;
}
`}]},{slug:"star-sun",title:"Solar",description:"Our Sun rendered as a yellow-white star with balanced convection cells, moderate flare activity, and a warm corona glow. Temperature set to 5778K.",date:"2025-11-29",tags:["exoplanets","space","3d","raymarching"],links:{},screenshotUrl:U0,passes:{image:`/**
 * Solar Star
 * @author guinetik
 * @date 2025-11-29
 *
 * Our Sun -- a yellow-white G-type main sequence star with turbulent convection
 * cells, visible surface relief, and a fiery corona. Rendered as a ray-sphere
 * intersection with noise-driven bump mapping for 3D surface detail.
 *
 * Based on the exoplanets v2 star shaders by guinetik.
 * Fire palette based on "Combustible Voronoi" by Shane.
 *
 * Rendering layers (back to front):
 *   1. Background      — near-black with subtle warm tint
 *   2. Glow            — inverse-square radial falloff, warm yellow-orange
 *   3. Corona          — FBM flame tendrils + 3 cyclic prominences
 *   4. Star surface    — bump-mapped convection with Planck blackbody palette
 *   5. Tone mapping    — Reinhard operator with moderate exposure
 *
 * TECHNIQUE: Ray-sphere intersection with orbiting camera.
 *
 * TECHNIQUE: Bump mapping via finite differences on high-frequency simplex noise.
 * Gradient is computed properly (divided by epsilon) so surface perturbation is
 * visible as turbulent ridges and granulation cells, not a flat painted sphere.
 *
 * TECHNIQUE: Planck's law fire palette (1400-3200K range) for physically-motivated
 * but visually saturated fire colors — deep red spots through orange to bright yellow.
 *
 * TECHNIQUE: Limb darkening with pow(viewAngle, 0.4) and self-illumination from
 * the perturbed normal, creating visible contrast between granule peaks and valleys.
 */

#define PI 3.14159265359   // Half-circle — used for prominence angular wrapping
#define TAU 6.28318530718  // Full circle — used for prominence distribution

// =============================================================================
// NOISE — 3D Simplex Noise provided by noise-simplex commons (snoise3D)
// =============================================================================

// FBM with configurable octaves — lacunarity 2.0, gain 0.5
// NOTE: Kept inline because the domain shift differs from fbmSimplex3D.
float fbm(vec3 p, int octaves) {
    float v = 0.0, a = 0.5, f = 1.0;
    for (int i = 0; i < 6; i++) {
        if (i >= octaves) break;
        v += a * snoise3D(p * f);
        f *= 2.0;
        a *= 0.5;
        p += vec3(100.0);
    }
    return v;
}

// =============================================================================
// SOLAR PALETTE — Planck's law blackbody radiation
// =============================================================================
// Physics: Maps a 0-1 heat value to blackbody color via Planck spectral radiance.
// Temperature range chosen for visually saturated fire colors:
//   i=0 → 1400K (deep red/dark)  i=0.5 → 2300K (bright orange)  i=1 → 3200K (yellow-white)
// Based on "Combustible Voronoi" by Shane (https://www.shadertoy.com/view/4tlSzl).

#define TEMP_MIN 1900.0   // Coolest — dark orange, intergranular lanes
#define TEMP_RANGE 1500.0  // Range — 1900K to 3400K, orange through bright yellow

vec3 firePalette(float i) {
    float T = TEMP_MIN + TEMP_RANGE * i;
    vec3 L = vec3(7.4, 5.6, 4.4);   // RGB wavelengths in 100s of nm
    L = pow(L, vec3(5.0)) * (exp(1.43876719683e5 / (T * L)) - 1.0);
    return 1.0 - exp(-5e8 / L);
}

// =============================================================================
// STAR SURFACE
// =============================================================================
// TECHNIQUE: High-contrast granulation — bright convective cell centers with
// dark intergranular lanes, all self-luminous (no directional lighting).
// The surface is pure emissive plasma: color contrast comes from the heat map
// driving the fire palette, not from light/shadow.
//
// Granulation pattern uses 1-abs(noise) to create cell-like shapes: bright
// broad centers with thin dark boundaries, mimicking solar convection.

// Granulation — cell-like pattern using 1-abs(noise).
// This creates bright convective cells with thin dark intergranular lanes,
// matching the real sun's photosphere appearance.
float granulation(vec3 p, float time) {
    // Large cells — primary granulation scale (~1000km on real sun)
    float g1 = 1.0 - abs(snoise3D(p * 5.0 + vec3(0.0, time * 0.08, 0.0)));
    // Medium cells — supergranulation
    float g2 = 1.0 - abs(snoise3D(p * 10.0 + vec3(time * 0.07, 0.0, time * 0.06)));
    // Fine turbulence — surface detail
    float g3 = snoise3D(p * 20.0 + vec3(0.0, time * 0.1, time * 0.08)) * 0.5 + 0.5;
    return g1 * 0.5 + g2 * 0.3 + g3 * 0.2;
}

// Sunspots — transient cooler regions that form, dissolve, and erupt elsewhere.
// Two noise layers at different speeds create spots that cycle in and out.
float starSpots(vec3 p, float time) {
    // Primary spots — moderate speed so they visibly drift and fade
    float spots1 = snoise3D(p * 2.5 + vec3(0.0, time * 0.04, time * 0.03));
    // Secondary cycle — different frequency creates interference pattern
    // so spots appear/vanish as the two layers phase in and out of alignment
    float spots2 = snoise3D(p * 3.5 + vec3(time * 0.05, 0.0, time * 0.02) + vec3(30.0));
    float spots = spots1 * 0.6 + spots2 * 0.4;
    return smoothstep(0.45, 0.8, spots);
}

// Plasma turbulence — large-scale slow-moving flow patterns.
float plasmaFlow(vec3 p, float time) {
    vec3 q = p * 3.0;
    q += vec3(sin(time * 0.12) * 0.4, cos(time * 0.15) * 0.35, time * 0.06);
    float n1 = fbm(q, 5) * 0.5 + 0.5;

    vec3 r = p * 5.0 + vec3(50.0);
    r += vec3(cos(time * 0.1) * 0.4, sin(time * 0.13) * 0.3, time * 0.08);
    float n2 = fbm(r, 4) * 0.5 + 0.5;

    return n1 * 0.55 + n2 * 0.45;
}

// Surface rendering — pure self-luminous plasma, no directional lighting.
// All visual detail comes from heat-to-color mapping through the fire palette.
vec3 renderSurface(vec3 spherePos, float viewAngle, float time) {
    float plasma = plasmaFlow(spherePos, time);
    float cells = granulation(spherePos, time);
    float spots = starSpots(spherePos, time);

    // Pulsing modulation — convective churning
    float pulse = 0.9 + 0.1 * sin(time * 0.5 + snoise3D(spherePos * 2.0) * 4.0);

    // Heat map — granulation dominant for visible cell structure
    float heat = cells * 0.55 + plasma * 0.45;
    heat *= pulse;
    heat *= 1.0 - spots * 0.5;

    // Contrast curve — sharpens granule boundaries.
    // Pushes bright areas brighter and dark lanes darker.
    heat = smoothstep(0.15, 0.85, heat);

    // Limb darkening — purely emissive, just reduces heat at edges
    float limb = pow(viewAngle, 0.4);
    heat *= 0.55 + limb * 0.45;

    // Edge flares — bright turbulence at the limb
    float edgeDist = 1.0 - viewAngle;
    float edgeFlare = pow(edgeDist, 2.0) * fbm(spherePos * 7.0 + vec3(time * 0.15), 3);
    heat += edgeFlare * 0.2;

    heat = clamp(heat, 0.0, 1.0);

    // Fire palette — all color from self-emission, no shading
    vec3 color = firePalette(heat) * (1.0 + heat * 2.0);

    // Quadratic emissive boost — hottest granule centers blaze
    color += firePalette(1.0) * heat * heat * 1.0;

    return color;
}

// =============================================================================
// GLOW AND CORONA
// =============================================================================

// Radial glow — warm yellow-orange, moderate intensity.
vec3 renderGlow(vec2 p, float starRadius) {
    float dist = length(p);
    float r = dist / starRadius;

    float glow = 1.0 / (r * r * 1.5 + 0.01);
    glow *= smoothstep(4.5, 1.0, r);
    vec3 glowColor = firePalette(0.6) * glow * 0.2;

    float haze = 1.0 / (r * r * 5.0 + 0.1);
    haze *= smoothstep(6.0, 1.5, r);
    glowColor += firePalette(0.3) * haze * 0.1;

    return glowColor;
}

// Corona — flame tendrils and prominences.
vec3 renderCorona(vec2 p, float starRadius, float time) {
    float dist = length(p);
    float r = dist / starRadius;

    if (r < 1.0 || r > 2.5) return vec3(0.0);

    float rimFactor = (r - 1.0);
    // Offset screen-space angle by star's axial rotation so corona rotates with surface
    float starRot = time * 0.12;
    float angle = atan(p.y, p.x) - starRot;

    float flame1 = fbm(vec3(angle * 2.0, rimFactor * 5.0, time * 0.25), 4);
    float flame2 = fbm(vec3(angle * 4.0 + 10.0, rimFactor * 3.0, time * 0.18), 3);
    float flames = (flame1 * 0.6 + flame2 * 0.4) * 0.5 + 0.5;

    float fade = exp(-rimFactor * 3.5);
    float intensity = flames * fade * 1.0;

    for (int i = 0; i < 3; i++) {
        float fi = float(i);
        float promAngle = fract(fi * 0.618 + 0.4) * TAU;
        float angleDiff = abs(mod(angle - promAngle + PI, TAU) - PI);
        float promMask = exp(-angleDiff * angleDiff * 10.0);
        float lifecycle = max(sin(time * 0.2 * (1.0 + fi * 0.3) + fi * 2.5), 0.0);
        intensity += promMask * lifecycle * fade * 1.5;
    }

    vec3 coronaColor = mix(firePalette(0.8), firePalette(0.4), rimFactor);
    return coronaColor * intensity;
}

// =============================================================================
// MAIN
// =============================================================================

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 p = (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);
    float time = mod(iTime, 1000.0);

    float starRadius = 0.85;
    float focalLength = 1.5;

    float rotX = time * 0.36;
    float rotY = sin(time * 0.18) * 0.25;

    float camDist = 3.5;
    vec3 camPos = vec3(
        camDist * sin(rotX) * cos(rotY),
        camDist * sin(rotY),
        camDist * cos(rotX) * cos(rotY)
    );

    vec3 camDir = normalize(-camPos);
    vec3 camRight = normalize(cross(vec3(0.0, 1.0, 0.0), camDir));
    vec3 camUp = cross(camDir, camRight);
    vec3 rd = normalize(p.x * camRight + p.y * camUp + focalLength * camDir);

    float apparentRadius = starRadius / sqrt(camDist * camDist - starRadius * starRadius) * focalLength;

    vec3 color = vec3(0.0, 0.0, 0.01);

    color += renderGlow(p, apparentRadius);
    color += renderCorona(p, apparentRadius, time);

    // Ray-sphere intersection
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

            float starRot = time * 0.12;
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

    // Tone mapping — moderate Reinhard
    color *= 1.8;
    color = color / (color + vec3(1.0));
    color += vec3(0.005, 0.002, 0.0);
    color = pow(color, vec3(0.85));

    fragColor = vec4(color, 1.0);
}
`},channels:{},commonsSources:[{name:"noise-simplex",source:`/**
 * Simplex Noise (Ashima Arts implementation)
 * @author guinetik
 * @date 2026-02-16
 *
 * 2D and 3D simplex noise plus FBM and specialty variants.
 * Simplex noise is preferred over classic Perlin for 3D work because it
 * evaluates 4 simplex corners instead of 8 cube corners, and has no
 * axis-aligned artifacts. Range is approximately [-1, 1].
 *
 * Noise: Chosen for star surfaces, corona flames, and planet terrain where
 * isotropic noise without grid bias is important. Costlier than value noise
 * but cheaper than 3D Perlin in practice due to fewer gradient evaluations.
 *
 * Based on: "Simplex noise demystified" by Stefan Gustavson (2005),
 * GLSL implementation by Ashima Arts / Ian McEwan.
 */

// === INTERNAL HELPERS ===
// These mod289/permute functions form the hash core of simplex noise.
// 289 = 17*17 — chosen so that permute(permute(x)) covers [0,289) uniformly.

vec2 mod289_s2(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 mod289_s3(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289_s4(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }

vec3 permute_s3(vec3 x) { return mod289_s3(((x * 34.0) + 1.0) * x); }
vec4 permute_s4(vec4 x) { return mod289_s4(((x * 34.0) + 1.0) * x); }

vec4 taylorInvSqrt_s(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

// === 3D SIMPLEX NOISE ===

/**
 * 3D simplex noise.
 *
 * Evaluates gradient noise on a simplex (tetrahedron) lattice.
 * Output range is approximately [-1, 1].
 *
 * @param v  3D sample position
 * @return   Noise value in ~[-1, 1]
 */
float snoise3D(vec3 v) {
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

    i = mod289_s3(i);
    vec4 p = permute_s4(permute_s4(permute_s4(
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

    vec4 norm = taylorInvSqrt_s(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

// === 2D SIMPLEX NOISE ===

/**
 * 2D simplex noise.
 *
 * Evaluates gradient noise on a triangular simplex lattice.
 * Output range is approximately [-1, 1].
 *
 * @param v  2D sample position
 * @return   Noise value in ~[-1, 1]
 */
float snoise2D(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289_s2(i);
    vec3 p = permute_s3(permute_s3(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

// === FBM VARIANTS ===

/**
 * 2D FBM using simplex noise, 5 fixed octaves.
 *
 * Standard lacunarity 2.0, gain 0.5 (pink noise spectrum).
 *
 * @param p  2D sample position
 * @return   FBM value, centered near 0
 */
float fbmSimplex2D(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
        value += amplitude * snoise2D(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

/**
 * 3D FBM using simplex noise, configurable octaves (1–6).
 *
 * Standard lacunarity 2.0, gain 0.5 (pink noise spectrum).
 *
 * @param p        3D sample position
 * @param octaves  Number of octaves (clamped to 1–6)
 * @return         FBM value, centered near 0
 */
float fbmSimplex3D(vec3 p, int octaves) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 6; i++) {
        if (i >= octaves) break;
        value += amplitude * snoise3D(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
    }
    return value;
}

// === SPECIALTY NOISE ===

/**
 * Seamless tiling noise for sphere textures.
 *
 * Uses lattice hashing with modular wrap to tile seamlessly at resolution \`res\`.
 * Output range is [-1, 1]. Ideal for star flame patterns where seam-free
 * spherical coverage is needed.
 *
 * @param uv   3D coordinate (typically angular coords + time)
 * @param res  Tiling resolution — higher = finer detail
 * @return     Tiled noise in [-1, 1]
 */
float tiledNoise3D(vec3 uv, float res) {
    uv *= res;
    vec3 uv0 = floor(mod(uv, res)) * vec3(1.0, 100.0, 10000.0);
    vec3 uv1 = floor(mod(uv + vec3(1.0), res)) * vec3(1.0, 100.0, 10000.0);
    vec3 f = fract(uv);
    f = f * f * (3.0 - 2.0 * f);

    vec4 v = vec4(uv0.x + uv0.y + uv0.z, uv1.x + uv0.y + uv0.z,
                  uv0.x + uv1.y + uv0.z, uv1.x + uv1.y + uv0.z);

    vec4 r = fract(sin(v * 0.001) * 100000.0);
    float r0 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);

    r = fract(sin((v + uv1.z - uv0.z) * 0.001) * 100000.0);
    float r1 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);

    return mix(r0, r1, f.z) * 2.0 - 1.0;
}

/**
 * Animated flowing plasma noise.
 *
 * Multi-octave simplex noise with per-octave time-varying offsets that
 * create a "boiling" or flowing effect. Normalized to [0, 1].
 * Used for star surface plasma, lava flows, and other animated surfaces.
 *
 * @param p     3D sample position
 * @param time  Animation time (typically iTime or wrapped iTime)
 * @return      Plasma value in [0, 1]
 */
float plasmaNoise(vec3 p, float time) {
    float value = 0.0;
    float amplitude = 1.0;
    float frequency = 1.0;
    float totalAmp = 0.0;

    for (int i = 0; i < 5; i++) {
        vec3 offset = vec3(
            sin(time * 0.1 + float(i)) * 0.5,
            cos(time * 0.15 + float(i) * 0.7) * 0.5,
            time * 0.05
        );
        value += amplitude * snoise3D((p + offset) * frequency);
        totalAmp += amplitude;
        amplitude *= 0.5;
        frequency *= 2.0;
    }

    return value / totalAmp;
}
`}]},{slug:"stargate",title:"Stargate Study",description:"Infinite corridor inspired by the 2001 Stargate sequence. Analytical ray-plane intersection on flat walls with Kubrick/Trumbull slit-scan false-color grading.",date:"2026-02-02",tags:["10-days","analytical","3d"],links:{},screenshotUrl:B0,passes:{image:`/**\r
 * Stargate Study\r
 * @author guinetik\r
 * @date 2026-02-02\r
 *\r
 * A corridor effect inspired by the 2001: A Space Odyssey Stargate sequence,\r
 * recreating Kubrick/Trumbull's slit-scan false-color aesthetic.\r
 *\r
 * Techniques:\r
 * - Analytical ray-plane corridor intersection — walls are flat planes at\r
 *   x=±1 or y=±1, solved with a single division per wall (no raymarching).\r
 * - Kubrick false-color grading: per-channel contrast stretch → HSV remap\r
 *   with cycling hue and forced saturation. Emulates slit-scan photography\r
 *   of aerial footage through rotating color gels on high-contrast film.\r
 * - Alternating horizontal/vertical slit-scan orientation every few seconds.\r
 * - Feathered black seam along the corridor center hides wall convergence.\r
 *\r
 * Commons: noise-value (valueNoise2D), color (rgb2hsv, hsv2rgb)\r
 *\r
 * @project Genuary 2026\r
 * @see https://genuary2026.guinetik.com\r
 */\r
\r
// --- Camera ---\r
#define FOV_ZOOM 0.4               // Field-of-view width — smaller = wider FOV, larger = more telephoto.\r
#define CAM_OSCILLATION_BASE 0.1   // Camera drift amplitude — subtle organic sway. Above 0.3: very shaky.\r
#define CAM_OSCILLATION_FREQ1 1.137 // Primary drift frequency — irrational to avoid looping.\r
#define CAM_OSCILLATION_FREQ2 0.37  // Secondary drift modulation frequency.\r
#define CAM_OSCILLATION_FREQ3 17.39 // High-frequency vertical jitter — simulates handheld camera.\r
#define CAM_FORWARD_MIX 0.6        // How much the camera looks forward vs. back at origin. 1.0 = pure forward.\r
\r
// --- Ray-plane intersection ---\r
// No raymarching needed — corridor walls are flat planes, solved analytically.\r
\r
// --- Wall UVs ---\r
#define WALL_UV_TILE_SCALE  0.35   // How much of the texture each wall tile shows — higher = smaller tiles, lower = more recognizable.\r
#define WALL_UV_TIME_SCROLL 2.0    // Speed of horizontal UV scrolling on walls — creates the rushing-forward effect.\r
#define WALL_UV_VERT_SCROLL 0.05   // Speed of vertical UV offset — slow vertical drift.\r
#define NOISE_WARP_SCALE 1.5       // Frequency of noise used to distort wall UVs. Higher = more chaotic detail.\r
#define NOISE_WARP_AMOUNT 0.06     // Strength of UV distortion from noise. Above 0.3: very warped.\r
\r
// --- Kubrick false-color grading ---\r
// TECHNIQUE: Per-channel contrast + HSV remap (slit-scan emulation)\r
// Kubrick/Trumbull's slit-scan shot aerial footage through rotating color gels\r
// on high-contrast film. We emulate this by:\r
//   (1) Per-channel contrast stretch — normalize R, G, B independently\r
//   (2) Convert to HSV, rotate hue over time, force full saturation\r
//   (3) Boost brightness while preserving texture detail\r
#define CONTRAST_BOOST 1.8         // Power curve on luminance. Higher = more separation between darks and lights. 1.0 = linear.\r
#define GRADIENT_SPEED 0.06        // How fast the gradient palette rotates over time. 0.0 = static.\r
// --- Mix / blend ---\r
#define MIX_BASE 0.6               // Base mix factor for wall color blending. Higher = more noise texture.\r
#define MIX_AMPLITUDE 0.35         // Amplitude of sinusoidal mix variation over time.\r
#define MIX_FREQUENCY 0.253        // Frequency of mix oscillation — irrational to avoid repetitive patterns.\r
\r
// --- Orientation ---\r
#define ORIENT_SWITCH_INTERVAL 4.0 // Seconds between horizontal/vertical tunnel orientation switches.\r
\r
// --- Post-processing ---\r
#define VIGNETTE_STRENGTH 0.4      // Vignette darkening factor — 0.0 = none, 1.0 = heavy edge darkening.\r
\r
// ---------------------------------------------------------------------------\r
// Kubrick false-color grading\r
// ---------------------------------------------------------------------------\r
\r
// TECHNIQUE: Duotone gradient map (slit-scan emulation)\r
// The original 2001 Stargate was shot by Douglas Trumbull using slit-scan\r
// photography of aerial landscape footage through rotating color gels on\r
// high-contrast film. The result: fully detailed landscapes with luminance\r
// remapped through a bold 2-3 color gradient — deep saturated shadows,\r
// vivid midtones, bright contrasting highlights. All original texture\r
// and edge detail is preserved; only the color mapping changes.\r
\r
/** Apply Kubrick-style false-color grading to a video sample. */\r
vec3 kubrickGrade(vec3 texColor, float time) {\r
    // TECHNIQUE: Per-channel contrast + HSV remap\r
    // Luminance-only grading fails on dark/uniform footage because all pixels\r
    // land in one brightness zone. Instead we boost per-channel contrast first\r
    // (so R, G, B separate even in dark scenes), then convert to HSV and\r
    // rotate/saturate. This preserves the original texture edges while\r
    // remapping to bold cycling colors — the Kubrick slit-scan look.\r
\r
    // Per-channel contrast stretch — normalize each channel independently\r
    // so even dark footage uses the full 0-1 range\r
    vec3 stretched = clamp((texColor - 0.05) / 0.55, 0.0, 1.0);\r
    stretched = pow(stretched, vec3(CONTRAST_BOOST));\r
\r
    // Convert to HSV — the hue now comes from the actual video color differences\r
    vec3 hsv = rgb2hsv(stretched);\r
\r
    // Rotate hue over time — cycling psychedelic palette\r
    hsv.x = fract(hsv.x + time * GRADIENT_SPEED);\r
\r
    // Force full saturation — even near-gray pixels become vivid\r
    hsv.y = 1.0;\r
\r
    // Boost brightness — keep texture detail but lift everything\r
    hsv.z = 0.4 + 0.6 * hsv.z;\r
\r
    return hsv2rgb(hsv);\r
}\r
\r
// ---------------------------------------------------------------------------\r
// Tunnel tracer\r
// ---------------------------------------------------------------------------\r
\r
// TECHNIQUE: Analytical ray-plane corridor intersection\r
// The corridor walls are flat planes at x=±1 or y=±1. Instead of\r
// raymarching (250 steps!) to find the hit, we compute the exact\r
// intersection with a single division per wall. This is faster,\r
// more accurate at the horizon, and eliminates step-count artifacts.\r
\r
/**\r
 * Trace an infinite corridor and sample the false-color-graded texture on walls.\r
 * @param isVertical 0.0 = horizontal walls (x=±1), 1.0 = vertical walls (y=±1)\r
 */\r
vec3 traceTunnel(vec2 uv, float time, sampler2D videoTex, float isVertical) {\r
    // Camera oscillation — subtle drift for organic camera movement\r
    float oscillation = CAM_OSCILLATION_BASE * sin(time * CAM_OSCILLATION_FREQ1)\r
                        * (1.0 + CAM_OSCILLATION_BASE * cos(time * CAM_OSCILLATION_FREQ2));\r
\r
    // Camera setup — slightly off-center, looking mostly down the corridor\r
    vec3 camPos = vec3(oscillation, sin(time * CAM_OSCILLATION_FREQ3) * oscillation * oscillation, -1.0);\r
    vec3 forward = normalize(mix(-camPos, vec3(0.0, 0.0, 1.0), CAM_FORWARD_MIX));\r
    vec3 up = vec3(0.0, 1.0, 0.0);\r
    vec3 right = cross(forward, up);\r
\r
    // Ray direction — project screen pixel through camera basis\r
    vec3 screenPoint = camPos + forward * FOV_ZOOM + uv.x * right + uv.y * up;\r
    vec3 rayDir = normalize(screenPoint - camPos);\r
\r
    // Analytical ray-plane intersection for corridor walls\r
    float rd = mix(rayDir.x, rayDir.y, isVertical);\r
    float ro = mix(camPos.x, camPos.y, isVertical);\r
\r
    float t1 = ( 1.0 - ro) / rd;  // +1 wall\r
    float t2 = (-1.0 - ro) / rd;  // -1 wall\r
\r
    float rayLength = (t1 > 0.0 && t2 > 0.0) ? min(t1, t2)\r
                    : max(t1, t2);\r
\r
    vec3 rayPos = camPos + rayDir * max(rayLength, 0.0);\r
    bool hitWall = rayLength > 0.0;\r
\r
    // Start with graded video — visible through the corridor center\r
    vec2 fillUV = uv * 0.25 + 0.5;  // Map centered coords back to [0,1] range\r
    vec3 col = kubrickGrade(texture(videoTex, fract(fillUV + time * 0.03)).rgb, time);\r
\r
    if (hitWall) {\r
        // Compute wall UVs\r
        vec2 wallUV_horiz = vec2(rayPos.z, rayPos.y + step(rayPos.x, 0.0) * 33.1 + time * WALL_UV_VERT_SCROLL);\r
        vec2 wallUV_vert = vec2(rayPos.z, rayPos.x + step(rayPos.y, 0.0) * 33.1 + time * WALL_UV_VERT_SCROLL);\r
        vec2 wallUV = mix(wallUV_horiz, wallUV_vert, isVertical);\r
        wallUV.x += time * WALL_UV_TIME_SCROLL;\r
\r
        // Sample video texture\r
        vec2 sampleUV = fract(wallUV * WALL_UV_TILE_SCALE);\r
        vec3 wallColor = texture(videoTex, sampleUV).rgb;\r
\r
        // Noise variation for organic distortion\r
        float noiseVal = valueNoise2D(wallUV * NOISE_WARP_SCALE) * 2.0 - 1.0;\r
        vec3 noiseColor = texture(videoTex, fract(sampleUV + noiseVal * NOISE_WARP_AMOUNT)).rgb;\r
\r
        // Animated mix between clean and noise-warped sample\r
        float mixFactor = MIX_BASE + MIX_AMPLITUDE * sin(MIX_FREQUENCY * time);\r
        wallColor = mix(noiseColor, wallColor, mixFactor);\r
\r
        // Apply Kubrick false-color grading — this IS the color, no further hue shift needed\r
        wallColor = kubrickGrade(wallColor, time);\r
\r
        col = wallColor;\r
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
    // === KUBRICK-GRADED BASE VIDEO ===\r
    vec3 baseColor = texture(iChannel0, uv).rgb;\r
\r
    // Fallback gradient if no texture\r
    if (length(texture(iChannel0, vec2(0.5)).rgb) < 0.01) {\r
        baseColor = vec3(0.1, 0.1, 0.15);\r
        baseColor += vec3(0.05, 0.1, 0.15) * (1.0 - length(uv - 0.5));\r
    }\r
\r
    // Apply false-color to the base video too — full-screen Kubrick look\r
    vec3 gradedBase = kubrickGrade(baseColor, time);\r
\r
    // === TUNNEL ===\r
    float tunnelOrientation = mod(floor(time / ORIENT_SWITCH_INTERVAL), 2.0);\r
\r
    vec2 tunnelUV = (uv - 0.5) * 2.0;\r
    tunnelUV.x *= aspect;\r
\r
    // Trace tunnel — walls already use kubrickGrade internally\r
    vec3 tunnelColor = traceTunnel(tunnelUV, time, iChannel0, tunnelOrientation);\r
\r
    // === COMPOSITING ===\r
    vec3 color = tunnelColor;\r
\r
    // === SEAM FADE ===\r
    // Feathered black stripe along the corridor center where walls converge.\r
    // isVertical=0 (walls at x=±1): seam is vertical (fade on x distance)\r
    // isVertical=1 (walls at y=±1): seam is horizontal (fade on y distance)\r
    float seamDist = mix(abs(uv.x - 0.5), abs(uv.y - 0.5), tunnelOrientation);\r
    float seamFade = smoothstep(0.0, 0.12, seamDist);  // Fades from black at seam to full color ~12% out\r
    color *= seamFade;\r
\r
    // === POST ===\r
    float vig = 1.0 - length(uv - 0.5) * VIGNETTE_STRENGTH;\r
    color *= vig;\r
\r
    // === DEBUG: PiP video monitor (bottom-right corner) ===\r
    vec2 pipSize = vec2(0.25, 0.25);  // 25% of screen\r
    vec2 pipOrigin = vec2(1.0 - pipSize.x, 0.0);  // bottom-right\r
    if (uv.x > pipOrigin.x && uv.y < pipSize.y) {\r
        vec2 pipUV = (uv - pipOrigin) / pipSize;\r
        vec3 raw = texture(iChannel0, pipUV).rgb;\r
        // Left half: raw video, Right half: graded\r
        if (pipUV.x < 0.5) {\r
            color = raw;\r
        } else {\r
            color = kubrickGrade(raw, time);\r
        }\r
        // Border\r
        if (abs(uv.x - pipOrigin.x) < 0.002 || abs(uv.y - pipSize.y) < 0.002 ||\r
            abs(pipUV.x - 0.5) < 0.005) {\r
            color = vec3(1.0);\r
        }\r
    }\r
\r
    fragColor = vec4(color, 1.0);\r
}\r
`},channels:{image:{iChannel0:"textures/stargate.mp4"}},commonsSources:[{name:"noise-value",source:`/**
 * Value Noise (sin-hash family)
 * @author guinetik
 * @date 2026-02-15
 *
 * Hash-based value noise using the fract(sin(x)*43758) family.
 * Fast and simple, produces smooth non-directional noise suitable for terrain.
 * C1 continuous via Hermite smoothstep interpolation (3t^2 - 2t^3).
 *
 * Noise: Chosen for speed on desktop GPUs. For mobile or precision-sensitive
 * use cases, prefer noise-pcg.glsl which avoids sin-based hashing.
 */

// === HASH FUNCTIONS ===

/**
 * 1D hash — maps a float to a pseudo-random float in [0, 1).
 */
float hashN(float n) {
    return fract(sin(n) * 43758.5453123);
}

/**
 * 2D hash — maps a vec2 to a pseudo-random float in [0, 1).
 */
float hashN2(vec2 p) {
    float h = dot(p, vec2(127.1, 311.7));
    return fract(sin(h) * 43758.5453123);
}

// === VALUE NOISE ===

/**
 * 2D value noise with Hermite interpolation.
 *
 * @param p  2D position to sample
 * @return Noise value in [0, 1)
 */
float valueNoise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hashN2(i + vec2(0.0, 0.0)), hashN2(i + vec2(1.0, 0.0)), u.x),
               mix(hashN2(i + vec2(0.0, 1.0)), hashN2(i + vec2(1.0, 1.0)), u.x), u.y);
}

/**
 * 3D value noise with Hermite interpolation.
 *
 * Uses dot-product lattice hashing with step (1, 157, 113) for
 * decorrelated cell values.
 *
 * @param pos  3D position to sample
 * @return Noise value in [0, 1)
 */
float valueNoise3D(vec3 pos) {
    vec3 i = floor(pos);
    vec3 f = fract(pos);
    vec3 u = f * f * (3.0 - 2.0 * f);

    float n = dot(i, vec3(1.0, 157.0, 113.0));
    return mix(mix(mix(hashN(n + 0.0),   hashN(n + 1.0), u.x),
                   mix(hashN(n + 157.0), hashN(n + 158.0), u.x), u.y),
               mix(mix(hashN(n + 113.0), hashN(n + 114.0), u.x),
                   mix(hashN(n + 270.0), hashN(n + 271.0), u.x), u.y), u.z);
}

// === FBM ===

/**
 * Fractional Brownian Motion using 3D value noise.
 *
 * Sums multiple octaves of valueNoise3D with decreasing amplitude.
 * Domain is offset and rotated between octaves to decorrelate layers.
 *
 * @param pos        3D sample position
 * @param octaves    Number of noise octaves (1–8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0–3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4–0.5)
 * @return Normalized FBM value in approximately [0, 1)
 */
float fbmValue(vec3 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * valueNoise3D(pos);
        total += scale;
        pos += vec3(0.23, 0.77, 0.57);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}

/**
 * Fractional Brownian Motion using 2D value noise.
 *
 * Sums multiple octaves of valueNoise2D with decreasing amplitude.
 * Domain is offset between octaves to decorrelate layers.
 *
 * @param pos        2D sample position
 * @param octaves    Number of noise octaves (1-8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0-3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4-0.5)
 * @return Normalized FBM value in approximately [0, 1)
 */
float fbmValue2D(vec2 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * valueNoise2D(pos);
        total += scale;
        pos += vec2(0.23, 0.77);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}
`},{name:"color",source:`/**
 * Color Conversion Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless color space conversion functions.
 */

// === HSL TO RGB ===

/**
 * Convert HSL color to RGB.
 *
 * @param h  Hue in degrees (0–360, wraps automatically)
 * @param s  Saturation (0.0–1.0)
 * @param l  Lightness (0.0–1.0)
 * @return RGB color in [0, 1] per component
 */
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

// === HSV CONVERSIONS ===

/**
 * Convert RGB color to HSV.
 *
 * @param c  RGB color in [0, 1] per component
 * @return   HSV where H is in [0, 1] (not degrees), S and V in [0, 1]
 */
vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

/**
 * Convert HSV color to RGB.
 *
 * @param c  HSV where H is in [0, 1] (not degrees), S and V in [0, 1]
 * @return   RGB color in [0, 1] per component
 */
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
`}]},{slug:"thomas",title:"Attractor Study #04: Thomas",description:"Thomas' cyclically symmetric attractor (1999) with 16 particles traced through 3D phase space. Drag to rotate.",date:"2026-02-13",tags:["attractors","3d"],links:{},screenshotUrl:F0,passes:{image:`/**
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
    float blink = hashN(blinkSeed) < 0.25
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
`},channels:{image:{iChannel0:"buffer-a"},bufferA:{iChannel0:"buffer-a"}},commonsSources:[{name:"noise-value",source:`/**
 * Value Noise (sin-hash family)
 * @author guinetik
 * @date 2026-02-15
 *
 * Hash-based value noise using the fract(sin(x)*43758) family.
 * Fast and simple, produces smooth non-directional noise suitable for terrain.
 * C1 continuous via Hermite smoothstep interpolation (3t^2 - 2t^3).
 *
 * Noise: Chosen for speed on desktop GPUs. For mobile or precision-sensitive
 * use cases, prefer noise-pcg.glsl which avoids sin-based hashing.
 */

// === HASH FUNCTIONS ===

/**
 * 1D hash — maps a float to a pseudo-random float in [0, 1).
 */
float hashN(float n) {
    return fract(sin(n) * 43758.5453123);
}

/**
 * 2D hash — maps a vec2 to a pseudo-random float in [0, 1).
 */
float hashN2(vec2 p) {
    float h = dot(p, vec2(127.1, 311.7));
    return fract(sin(h) * 43758.5453123);
}

// === VALUE NOISE ===

/**
 * 2D value noise with Hermite interpolation.
 *
 * @param p  2D position to sample
 * @return Noise value in [0, 1)
 */
float valueNoise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hashN2(i + vec2(0.0, 0.0)), hashN2(i + vec2(1.0, 0.0)), u.x),
               mix(hashN2(i + vec2(0.0, 1.0)), hashN2(i + vec2(1.0, 1.0)), u.x), u.y);
}

/**
 * 3D value noise with Hermite interpolation.
 *
 * Uses dot-product lattice hashing with step (1, 157, 113) for
 * decorrelated cell values.
 *
 * @param pos  3D position to sample
 * @return Noise value in [0, 1)
 */
float valueNoise3D(vec3 pos) {
    vec3 i = floor(pos);
    vec3 f = fract(pos);
    vec3 u = f * f * (3.0 - 2.0 * f);

    float n = dot(i, vec3(1.0, 157.0, 113.0));
    return mix(mix(mix(hashN(n + 0.0),   hashN(n + 1.0), u.x),
                   mix(hashN(n + 157.0), hashN(n + 158.0), u.x), u.y),
               mix(mix(hashN(n + 113.0), hashN(n + 114.0), u.x),
                   mix(hashN(n + 270.0), hashN(n + 271.0), u.x), u.y), u.z);
}

// === FBM ===

/**
 * Fractional Brownian Motion using 3D value noise.
 *
 * Sums multiple octaves of valueNoise3D with decreasing amplitude.
 * Domain is offset and rotated between octaves to decorrelate layers.
 *
 * @param pos        3D sample position
 * @param octaves    Number of noise octaves (1–8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0–3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4–0.5)
 * @return Normalized FBM value in approximately [0, 1)
 */
float fbmValue(vec3 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * valueNoise3D(pos);
        total += scale;
        pos += vec3(0.23, 0.77, 0.57);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}

/**
 * Fractional Brownian Motion using 2D value noise.
 *
 * Sums multiple octaves of valueNoise2D with decreasing amplitude.
 * Domain is offset between octaves to decorrelate layers.
 *
 * @param pos        2D sample position
 * @param octaves    Number of noise octaves (1-8)
 * @param lacunarity Frequency multiplier per octave (typically 2.0-3.0)
 * @param gain       Amplitude multiplier per octave (typically 0.4-0.5)
 * @return Normalized FBM value in approximately [0, 1)
 */
float fbmValue2D(vec2 pos, int octaves, float lacunarity, float gain) {
    float height = 0.0;
    float scale = 0.5;
    float total = 0.0;
    for (int i = 0; i < 8; i++) {
        if (i >= octaves) break;
        height += scale * valueNoise2D(pos);
        total += scale;
        pos += vec2(0.23, 0.77);
        pos *= lacunarity;
        scale *= gain;
    }
    return height / total;
}
`},{name:"color",source:`/**
 * Color Conversion Utilities
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless color space conversion functions.
 */

// === HSL TO RGB ===

/**
 * Convert HSL color to RGB.
 *
 * @param h  Hue in degrees (0–360, wraps automatically)
 * @param s  Saturation (0.0–1.0)
 * @param l  Lightness (0.0–1.0)
 * @return RGB color in [0, 1] per component
 */
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

// === HSV CONVERSIONS ===

/**
 * Convert RGB color to HSV.
 *
 * @param c  RGB color in [0, 1] per component
 * @return   HSV where H is in [0, 1] (not degrees), S and V in [0, 1]
 */
vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

/**
 * Convert HSV color to RGB.
 *
 * @param c  HSV where H is in [0, 1] (not degrees), S and V in [0, 1]
 * @return   RGB color in [0, 1] per component
 */
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
`},{name:"sdf",source:`/**
 * Signed Distance Field Primitives
 * @author guinetik
 * @date 2026-02-15
 *
 * Stateless distance field functions for 2D rendering.
 */

// === LINE SEGMENT ===

/**
 * Compute minimum distance from a point to a line segment.
 *
 * Returns the perpendicular distance from point \`p\` to the closest
 * point on the segment from \`a\` to \`b\`. Handles degenerate
 * zero-length segments gracefully.
 *
 * @param a  Segment start point
 * @param b  Segment end point
 * @param p  Query point
 * @return Distance from \`p\` to the nearest point on segment (a, b)
 */
float dfLine(vec2 a, vec2 b, vec2 p) {
    vec2 ab = b - a;
    float denom = dot(ab, ab);
    if (denom < 1e-10) return distance(a, p);
    float t = clamp(dot(p - a, ab) / denom, 0.0, 1.0);
    return distance(a + ab * t, p);
}
`}]},{slug:"waves",title:"Smooth Waves",description:"Dali-inspired liquid with layered sine waves, center ripple source, corner-based interference patterns, and heat shimmer. Smooth flowing animation with displacement edge highlighting.",date:"2026-01-29",tags:["10-days","procedural"],links:{},screenshotUrl:z0,passes:{image:`/**\r
 * Smooth Waves Study\r
 * @author guinetik\r
 * @date 2026-01-29\r
 *\r
 * Dali-inspired liquid surface with layered sine waves, center ripple\r
 * source, corner-based interference patterns, and heat shimmer.\r
 * The three wave layers approximate a real ocean wave spectrum: long swell,\r
 * medium chop, and fine surface ripples. Concentric ripples radiate from a\r
 * drifting center point while four corner sources create an interference grid.\r
 * A horizontal heat-shimmer pass adds convection-like jitter.\r
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
// --- Wave Layer 1: large swell (longest wavelength, biggest amplitude) ---\r
#define SWELL_FREQ_X 4.0       // Primary Y-axis frequency — lower = wider swells\r
#define SWELL_FREQ_Y 2.0       // Cross-term X frequency for diagonal tilt\r
#define SWELL_CROSS_FREQ_X 3.0 // Primary X-axis frequency for vertical offset\r
#define SWELL_CROSS_FREQ_Y 2.0 // Cross-term Y frequency for diagonal tilt\r
#define SWELL_AMPLITUDE 0.03   // Peak displacement — above 0.05 tears the image apart\r
#define SWELL_SPEED_X 1.2      // Horizontal phase speed — keep close to 1.0 for gentle rolling\r
#define SWELL_SPEED_Y 1.0      // Vertical phase speed\r
\r
// --- Wave Layer 2: medium chop ---\r
#define CHOP_FREQ_X 8.0        // Y-axis frequency — ~2x swell for visible mid-band detail\r
#define CHOP_FREQ_Y 6.0        // X-axis frequency\r
#define CHOP_AMPLITUDE_X 0.015 // Horizontal displacement — half of swell amplitude\r
#define CHOP_AMPLITUDE_Y 0.02  // Vertical displacement — slightly stronger for asymmetry\r
#define CHOP_SPEED_X 1.8       // Faster than swell to differentiate motion bands\r
#define CHOP_SPEED_Y 1.5       // Slightly slower vertical phase\r
\r
// --- Wave Layer 3: surface ripples (highest frequency, lowest amplitude) ---\r
#define RIPPLE_FREQ_X 15.0     // Y-axis frequency — ~4x swell; fine texture detail\r
#define RIPPLE_CROSS_X 10.0    // Cross-term X frequency\r
#define RIPPLE_FREQ_Y 12.0     // X-axis frequency\r
#define RIPPLE_CROSS_Y 8.0     // Cross-term Y frequency\r
#define RIPPLE_AMPLITUDE 0.008 // Very small — just enough to add sparkle. Above 0.015 looks noisy\r
#define RIPPLE_SPEED_X 3.0     // Fast phase speed — gives quick shimmering motion\r
#define RIPPLE_SPEED_Y 2.5     // Slightly slower to avoid uniform crawl\r
\r
// --- Ripple source (concentric rings from drifting center) ---\r
#define RIPPLE_SRC_FREQ 30.0   // Radial ring frequency — higher = tighter rings. Above 50 aliases\r
#define RIPPLE_SRC_SPEED 4.0   // Outward propagation speed — higher = faster expansion\r
#define RIPPLE_SRC_AMP 0.02    // Ring displacement strength — above 0.04 causes visible tearing\r
#define RIPPLE_SRC_DECAY 0.8   // Fade-out radius — rings vanish beyond this distance from center\r
#define RIPPLE_SRC_DRIFT_X 0.3 // Center horizontal drift frequency — keeps the source moving\r
#define RIPPLE_SRC_DRIFT_AMP_X 0.1 // Horizontal drift amplitude (fraction of screen)\r
#define RIPPLE_SRC_DRIFT_Y 0.4 // Center vertical drift frequency\r
#define RIPPLE_SRC_DRIFT_AMP_Y 0.1 // Vertical drift amplitude\r
\r
// --- Interference pattern (four corner wave sources) ---\r
#define INTERF_FREQ 20.0       // Radial frequency per source — higher = denser grid. Above 30 aliases\r
#define INTERF_SPEED 3.0       // Phase speed — higher = faster pattern crawl\r
#define INTERF_AMPLITUDE 0.01  // Per-source displacement — keep small; 4 sources accumulate\r
\r
// --- Shimmer (horizontal heat-haze jitter) ---\r
#define SHIMMER_FREQ_A 40.0    // Primary vertical frequency — sets shimmer band width\r
#define SHIMMER_FREQ_B 80.0    // Secondary frequency (2x) — adds fine-grain jitter\r
#define SHIMMER_AMP_A 0.003    // Primary amplitude — visible wobble. Above 0.005 looks glitchy\r
#define SHIMMER_AMP_B 0.001    // Secondary amplitude — subtle detail layer\r
#define SHIMMER_SPEED_A 5.0    // Primary phase speed — fast for heat-convection look\r
#define SHIMMER_SPEED_B 8.0    // Secondary speed — faster to decorrelate from primary\r
#define SHIMMER_MASK_LO 0.3    // Lower fade-in (screen Y fraction) — shimmer fades near bottom\r
#define SHIMMER_MASK_HI 0.7    // Upper fade-out (screen Y fraction) — shimmer fades near top\r
\r
// --- Post-processing ---\r
#define DISP_HIGHLIGHT_SCALE 20.0 // Displacement-to-brightness multiplier — higher = brighter edges\r
#define DISP_HIGHLIGHT_MIX 0.3    // Brightness boost strength — above 0.5 washes out darks\r
#define VIGNETTE_STRENGTH 0.4     // Edge darkening — higher = darker corners. 0.0 disables\r
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
    offset.x += sin(uv.y * SWELL_FREQ_X + uv.x * SWELL_FREQ_Y + time * SWELL_SPEED_X) * SWELL_AMPLITUDE;\r
    offset.y += cos(uv.x * SWELL_CROSS_FREQ_X + uv.y * SWELL_CROSS_FREQ_Y + time * SWELL_SPEED_Y) * SWELL_AMPLITUDE;\r
\r
    // Layer 2: Medium flowing waves (2x frequency, ~half amplitude)\r
    offset.x += sin(uv.y * CHOP_FREQ_X + time * CHOP_SPEED_X) * CHOP_AMPLITUDE_X;\r
    offset.y += cos(uv.x * CHOP_FREQ_Y + time * CHOP_SPEED_Y) * CHOP_AMPLITUDE_Y;\r
\r
    // Layer 3: Small fast ripples (~4x frequency, ~quarter amplitude)\r
    offset.x += sin(uv.y * RIPPLE_FREQ_X + uv.x * RIPPLE_CROSS_X + time * RIPPLE_SPEED_X) * RIPPLE_AMPLITUDE;\r
    offset.y += sin(uv.x * RIPPLE_FREQ_Y + uv.y * RIPPLE_CROSS_Y + time * RIPPLE_SPEED_Y) * RIPPLE_AMPLITUDE;\r
\r
    return uv + offset * intensity;\r
}\r
\r
/**\r
 * Concentric ripple from center\r
 * Radial sine waves propagate outward from a given center point,\r
 * fading with distance via smoothstep decay.\r
 */\r
vec2 rippleDistort(vec2 uv, vec2 center, float time, float intensity) {\r
    vec2 delta = uv - center;\r
    float dist = length(delta);\r
\r
    // Outward propagating ripples\r
    float ripple = sin(dist * RIPPLE_SRC_FREQ - time * RIPPLE_SRC_SPEED) * RIPPLE_SRC_AMP;\r
\r
    // Fade with distance\r
    ripple *= smoothstep(RIPPLE_SRC_DECAY, 0.0, dist);\r
\r
    return uv + normalize(delta + 0.001) * ripple * intensity;\r
}\r
\r
/**\r
 * Interference pattern from multiple wave sources\r
 * Four corner sources each emit concentric waves; their superposition\r
 * creates a grid-like interference pattern across the surface.\r
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
        float wave = sin(dist * INTERF_FREQ - time * INTERF_SPEED + float(i) * 1.5);\r
        offset += normalize(delta + 0.001) * wave * INTERF_AMPLITUDE;\r
    }\r
\r
    return uv + offset * intensity;\r
}\r
\r
/**\r
 * Horizontal heat shimmer effect\r
 * Two high-frequency sine layers (40 Hz, 80 Hz) create the jittery\r
 * horizontal displacement characteristic of heat convection.\r
 * A vertical mask confines the effect to the middle band of the screen.\r
 */\r
vec2 shimmerDistort(vec2 uv, float time, float intensity) {\r
    float shimmer = sin(uv.y * SHIMMER_FREQ_A + time * SHIMMER_SPEED_A) * SHIMMER_AMP_A;  // primary shimmer\r
    shimmer += sin(uv.y * SHIMMER_FREQ_B + time * SHIMMER_SPEED_B) * SHIMMER_AMP_B;        // fine detail at 2x freq\r
\r
    // Stronger in middle, fade at edges\r
    float mask = smoothstep(0.0, SHIMMER_MASK_LO, uv.y) * smoothstep(1.0, SHIMMER_MASK_HI, uv.y);\r
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
    // Center ripple with drifting source point\r
    vec2 center = vec2(\r
        0.5 + sin(time * RIPPLE_SRC_DRIFT_X) * RIPPLE_SRC_DRIFT_AMP_X,\r
        0.5 + cos(time * RIPPLE_SRC_DRIFT_Y) * RIPPLE_SRC_DRIFT_AMP_Y\r
    );\r
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
    float displacement = length(warped - uv) * DISP_HIGHLIGHT_SCALE;\r
    color *= 1.0 + displacement * DISP_HIGHLIGHT_MIX;\r
\r
    // === POST ===\r
    // Soft vignette\r
    float vig = 1.0 - length(uv - 0.5) * VIGNETTE_STRENGTH;\r
    color *= vig;\r
\r
    fragColor = vec4(color, 1.0);\r
}\r
`},channels:{image:{iChannel0:"textures/sea.jpg"}},commonsSources:[]}],kr=[...es].sort((e,n)=>new Date(n.date).getTime()-new Date(e.date).getTime()),G0=[...new Set(es.flatMap(e=>e.tags))].sort();function _d(e){return kr.find(n=>n.slug===e)}function V0(){const e=xe(null),n=He(()=>e.value===null?kr:kr.filter(r=>r.tags.includes(e.value)));function t(r){e.value=e.value===r?null:r}return{activeTag:e,allTags:G0,filteredShaders:n,setTag:t}}const q0=Math.PI*.5,vo=150;function Hr(e,n,t,r=0){let a=null,o=null,i=0,s=null,l=0,f="none",c=0;function d(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function m(){return window.matchMedia("(hover: hover)").matches}function h(){a=document.createElement("canvas"),a.style.cssText="position:fixed;pointer-events:none;z-index:50;opacity:0;transition:none;",a.setAttribute("aria-hidden","true"),document.body.appendChild(a),o=a.getContext("2d")}function C(E){if(!a)return;const A=E.getBoundingClientRect(),L=getComputedStyle(E).borderRadius||"0";a.style.top=`${A.top+r}px`,a.style.left=`${A.left}px`,a.style.width=`${A.width}px`,a.style.height=`${A.height}px`,a.style.borderRadius=L,a.style.overflow="hidden";const G=window.devicePixelRatio||1,V=Math.round(A.width*G),ae=Math.round(A.height*G);(a.width!==V||a.height!==ae)&&(a.width=V,a.height=ae)}function _(E){if((!a||!o||!s)&&f==="none"&&l<=0)return;const A=c?E-c:16;if(c=E,f==="in")l=Math.min(1,l+A/vo),l>=1&&(f="none");else if(f==="out"&&(l=Math.max(0,l-A/vo),l<=0)){f="none",a&&(a.style.opacity="0");return}if(a&&(a.style.opacity=String(l)),!a||!o)return;s&&C(s);const w=window.devicePixelRatio||1,L=a.width/w,G=a.height/w;o.setTransform(w,0,0,w,0,0),o.clearRect(0,0,L,G);const V=E*.001*qc,ae=G*.5;for(let H=0;H<2;H++){const W=H===0?0:q0,$=H===0?.5:.25;o.beginPath(),o.strokeStyle=`rgba(17, 220, 255, ${$})`,o.lineWidth=Yc,o.shadowColor=`rgba(17, 220, 255, ${$*.5})`,o.shadowBlur=Kc;for(let I=0;I<=L;I+=2){const X=ae+Math.sin(I/L*Math.PI*2*Vc+V+W)*Gc;I===0?o.moveTo(I,X):o.lineTo(I,X)}o.stroke(),o.shadowBlur=0}i=requestAnimationFrame(_)}function k(E){if(d()||!m())return;const A=E.target.closest(n);if(!A)return;a||h();const w=t?A.querySelector(t)??A:A;s=w,C(w),f="in",cancelAnimationFrame(i),c=0,i=requestAnimationFrame(_)}function O(E){if(!E.target.closest(n))return;const w=E.relatedTarget;w&&w.closest(n)||(s=null,f="out",cancelAnimationFrame(i),c=0,i=requestAnimationFrame(_))}Un(()=>{const E=e.value;E&&(E.addEventListener("mouseenter",k,!0),E.addEventListener("mouseleave",O,!0))}),Zn(()=>{cancelAnimationFrame(i);const E=e.value;E&&(E.removeEventListener("mouseenter",k,!0),E.removeEventListener("mouseleave",O,!0)),a&&a.parentNode&&a.parentNode.removeChild(a),a=null,o=null,s=null})}const Y0=["onClick"],K0=An({__name:"TagFilter",props:{tags:{},activeTag:{}},emits:["select"],setup(e,{emit:n}){const t=n,r=xe(null);return Hr(r,".tag-btn"),(a,o)=>(Re(),Fe("div",{ref_key:"filterRef",ref:r,class:"tag-filter"},[Ce("button",{class:Mn(["tag-btn",{active:e.activeTag===null}]),onClick:o[0]||(o[0]=i=>t("select",null))}," All ",2),(Re(!0),Fe(Ae,null,Jr(e.tags,i=>(Re(),Fe("button",{key:i,class:Mn(["tag-btn",{active:e.activeTag===i}]),onClick:s=>t("select",i)},it(i),11,Y0))),128))],512))}}),W0=Ct(K0,[["__scopeId","data-v-f002c231"]]),X0={class:"card-trace-svg","aria-hidden":"true"},j0=["stroke-dasharray","stroke-dashoffset"],Q0={class:"card-content"},Z0=["src","alt"],$0={class:"card-overlay"},J0={class:"card-kicker"},ed={class:"card-title"},nd={class:"card-tags"},td=An({__name:"ShaderCard",props:{shader:{},index:{},total:{}},setup(e,{expose:n}){const t=e,r=c0(),{prefersReducedMotion:a,getStaggerDelay:o,setTransitionSnapshot:i}=oa(),s=xe(null),l=xe(null),f=xe("hidden"),c=xe(0);let d=null,m=0,h=!1,C=0;function _(){const w=s.value;if(!w)return null;const L=w.$el;return L instanceof HTMLElement?L:null}function k(w){const L=l.value;if(!L||!c.value){f.value="visible";return}C=window.setTimeout(()=>{f.value="tracing",L.animate([{strokeDashoffset:c.value},{strokeDashoffset:0}],{duration:Wa,easing:"cubic-bezier(0.25, 0.1, 0.25, 1)",fill:"forwards"}).finished.then(()=>{f.value="filling",setTimeout(()=>{f.value="visible"},Xa)})},w)}function O(){clearTimeout(C),f.value="hidden";const w=l.value;w&&w.getAnimations().forEach(L=>L.cancel())}Un(()=>{if(a.value==="reduced"){f.value="visible";return}const w=_(),L=l.value;if(!w||!L){f.value="visible";return}const G=w.getBoundingClientRect();c.value=(G.width+G.height)*2,m=performance.now(),d=new IntersectionObserver(V=>{const ae=V[0];if(ae)if(ae.isIntersecting){const H=!h&&performance.now()-m<100;H&&(h=!0);const W=H?o(t.index,t.total):0;k(W)}else(h||performance.now()-m>100)&&O()},{rootMargin:"0px 0px 75px 0px"}),d.observe(w)}),Zn(()=>{d==null||d.disconnect(),d=null,clearTimeout(C)});function E(){if(a.value==="reduced"){f.value="visible";return}const w=l.value;if(!w||!c.value){f.value="visible";return}f.value="tracing",w.animate([{strokeDashoffset:c.value},{strokeDashoffset:0}],{duration:Wa,easing:"cubic-bezier(0.25, 0.1, 0.25, 1)",fill:"forwards"}).finished.then(()=>{f.value="filling",setTimeout(()=>{f.value="visible"},Xa)})}function A(w){if(a.value==="reduced")return;w.preventDefault();const L=_();if(!L)return;const G=L.getBoundingClientRect();i({direction:"to-detail",slug:t.shader.slug,rect:{top:G.top,left:G.left,width:G.width,height:G.height},screenshotUrl:t.shader.screenshotUrl});const V=L.parentElement;V&&Array.from(V.children).filter(H=>H!==L).forEach(H=>{H.animate([{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.95)"}],{duration:Oc,easing:"ease-out",fill:"forwards"})}),setTimeout(()=>{r.push("/shader/"+t.shader.slug)},100)}return n({triggerEntrance:E,getCardEl:_}),(w,L)=>{const G=li("router-link");return Re(),ta(G,{ref_key:"cardRef",ref:s,to:"/shader/"+e.shader.slug,"data-shader-slug":e.shader.slug,class:Mn(["shader-card n-panel n-corner-frame",{"card--hidden":f.value==="hidden","card--tracing":f.value==="tracing","card--filling":f.value==="filling","card--visible":f.value==="visible"}]),onClick:A},{default:$r(()=>[(Re(),Fe("svg",X0,[Ce("rect",{ref_key:"svgRef",ref:l,class:"entrance-trace",x:"0.5",y:"0.5",rx:"8",ry:"8",width:"calc(100% - 1px)",height:"calc(100% - 1px)",fill:"none","stroke-dasharray":c.value,"stroke-dashoffset":c.value,"stroke-width":"2"},null,8,j0)])),Ce("div",Q0,[Ce("img",{src:e.shader.screenshotUrl,alt:e.shader.title,loading:"lazy",class:"card-image"},null,8,Z0),L[0]||(L[0]=Ce("div",{class:"card-scanline","aria-hidden":"true"},null,-1)),Ce("div",$0,[Ce("span",J0,it(e.shader.date),1),Ce("span",ed,it(e.shader.title),1)]),Ce("div",nd,[(Re(!0),Fe(Ae,null,Jr(e.shader.tags,V=>(Re(),Fe("span",{key:V,class:"card-tag"},it(V),1))),128))])])]),_:1},8,["to","data-shader-slug","class"])}}}),rd=Ct(td,[["__scopeId","data-v-a59e80ff"]]),It=200,go=40,ad=280,od=12,yo=85,id=55,bo=.45,sd=.12,ld=.25,cd=15;function fd(e){let n=0,t=-1,r=-1,a=!0;function o(f){const c=e.value;if(!c)return;const d=c.getBoundingClientRect();t=f.clientX-d.left,r=f.clientY-d.top}function i(){t=-1,r=-1}function s(){a=!document.hidden,a&&e.value&&(n=requestAnimationFrame(l))}function l(f){if(!a)return;const c=e.value;if(!c)return;const d=c.getContext("2d");if(!d)return;const m=window.devicePixelRatio||1,h=c.clientWidth,C=c.clientHeight;if(h===0||C===0){n=requestAnimationFrame(l);return}const _=Math.round(h*m),k=Math.round(C*m);(c.width!==_||c.height!==k)&&(c.width=_,c.height=k),d.setTransform(m,0,0,m,0,0),d.clearRect(0,0,h,C);const O=f*.001,E=O*Bc,A=O*od,w=2;for(let L=0;L<ur;L++){const G=L/(ur-1),V=C*(.08+G*.84),ae=L*Math.PI*.6,H=Uc+L%3*.3,W=1+(L%2===0?.15:-.1)*(L/ur),I=(go+G*(ad-go)+A)%360,X=Math.abs(G-.5)*2;let le=bo-(bo-sd)*X,ve=id;const ce=.4+L%4*.15,J=Math.sin(O*ce+L*1.7)*.5+.5;le*=.7+J*.3;let K=0;if(t>=0&&r>=0){const de=Math.abs(V-r);de<It&&(K=1-de/It,K*=K,le=Math.min(1,le+ld*K),ve=ve+cd*K)}const Ge=`hsla(${I}, ${yo}%, ${ve}%, ${le})`,Xe=`hsla(${I}, ${yo}%, ${ve}%, ${le*.5})`;d.beginPath(),d.strokeStyle=Ge,d.lineWidth=Fc+K*.5,d.shadowColor=Xe,d.shadowBlur=zc+K*6;for(let de=0;de<=h;de+=w){let ge=kc;if(t>=0&&r>=0){const sn=de-t,je=V-r,Ee=Math.sqrt(sn*sn+je*je);if(Ee<It){const y=1-Ee/It;ge+=Hc*y*y}}const on=V+Math.sin(de/h*Math.PI*2*H+E*W+ae)*ge;de===0?d.moveTo(de,on):d.lineTo(de,on)}d.stroke(),d.shadowBlur=0}n=requestAnimationFrame(l)}Un(()=>{const f=e.value;f&&(f.addEventListener("mousemove",o),f.addEventListener("mouseleave",i),document.addEventListener("visibilitychange",s),n=requestAnimationFrame(l))}),Zn(()=>{cancelAnimationFrame(n);const f=e.value;f&&(f.removeEventListener("mousemove",o),f.removeEventListener("mouseleave",i)),document.removeEventListener("visibilitychange",s)})}const dd=An({__name:"SineWaveDivider",setup(e){const n=xe(null);return fd(n),(t,r)=>(Re(),Fe("canvas",{ref_key:"canvasRef",ref:n,class:"sine-wave-bg","aria-hidden":"true"},null,512))}}),pd=Ct(dd,[["__scopeId","data-v-05c59859"]]),ud={class:"gallery-filter gallery-seq-2"},md={key:0,class:"gallery-empty"},hd=An({__name:"GalleryView",setup(e){const{activeTag:n,allTags:t,filteredShaders:r,setTag:a}=V0(),{triggerCardExit:o,prefersReducedMotion:i}=oa(),s=xe(null),l=xe(null),f=xe(!0);Hr(s,".profile-link, .github-link"),Hr(l,".shader-card",".card-overlay",8),Un(()=>{if(i.value==="reduced"){f.value=!1;return}requestAnimationFrame(()=>{requestAnimationFrame(()=>{f.value=!1})})});function c(m,h){if(i.value==="reduced"){h();return}setTimeout(h,800)}function d(m,h){if(i.value==="reduced"){h();return}o(m).then(h)}return(m,h)=>(Re(),Fe("div",{class:Mn(["gallery-view n-layout-shell",{"gallery--entering":f.value}])},[Ce("header",{ref_key:"headerRef",ref:s,class:"gallery-header n-panel gallery-seq-1"},[ue(pd),h[0]||(h[0]=Fl('<div class="gallery-brand" data-v-2a9ac4b9><a href="https://guinetik.com" target="_blank" rel="noopener" class="brand-logo-link" aria-label="Visit Guinetik website" data-v-2a9ac4b9><svg class="brand-logo" xmlns="http://www.w3.org/2000/svg" viewBox="32.9 174.743 71.888 63.576" aria-hidden="true" data-v-2a9ac4b9><path d="M 57.971 224.292 L 57.971 203.374 L 57.971 194.861 L 75.109 194.861 L 75.109 188.769 L 63.16 188.769 L 63.16 174.743 L 57.971 174.743 L 57.971 189.041 L 57.971 194.861 L 32.9 194.861 L 32.9 203.773 L 50.377 203.773 L 50.377 224.292 L 57.971 224.292 Z M 79.717 238.319 L 79.717 224.02 L 79.717 218.2 L 104.788 218.2 L 104.788 209.287 L 87.31 209.287 L 87.31 188.769 L 79.717 188.769 L 79.717 209.686 L 79.717 218.2 L 62.579 218.2 L 62.579 224.293 L 74.526 224.293 L 74.526 238.319 L 79.717 238.319 Z" data-v-2a9ac4b9></path></svg></a><h1 class="gallery-title" data-v-2a9ac4b9>Guinetik&#39;s Shaders Collection</h1></div><nav class="gallery-links" aria-label="Profile links" data-v-2a9ac4b9><a href="https://guinetik.com" target="_blank" rel="noopener" class="profile-link" data-v-2a9ac4b9>Website</a><a href="https://www.shadertoy.com/user/guinetik" target="_blank" rel="noopener" class="profile-link" data-v-2a9ac4b9>Shadertoy</a><a href="https://x.com/guinetik" target="_blank" rel="noopener" class="github-link" aria-label="Visit Guinetik on X" title="X (Twitter)" data-v-2a9ac4b9><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" data-v-2a9ac4b9><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" data-v-2a9ac4b9></path></svg></a><a href="https://github.com/guinetik" target="_blank" rel="noopener" class="github-link" aria-label="Visit Guinetik on GitHub" title="GitHub" data-v-2a9ac4b9><svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true" data-v-2a9ac4b9><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" data-v-2a9ac4b9></path></svg></a></nav><p class="gallery-subtitle" data-v-2a9ac4b9> Interactive GPU programming experiments using WebGL. </p>',3))],512),Ce("div",ud,[ue(W0,{tags:Le(t),activeTag:Le(n),onSelect:Le(a)},null,8,["tags","activeTag","onSelect"])]),Ce("div",{ref_key:"gridRef",ref:l,class:"gallery-seq-3"},[ue(wc,{name:"shader-card",tag:"div",class:"gallery-grid",onEnter:c,onLeave:d,css:!1},{default:$r(()=>[(Re(!0),Fe(Ae,null,Jr(Le(r),(C,_)=>(Re(),ta(rd,{key:C.slug,shader:C,index:_,total:Le(r).length},null,8,["shader","index","total"]))),128))]),_:1})],512),Le(r).length===0?(Re(),Fe("p",md," No shaders found. ")):Ri("",!0)],2))}}),vd=Ct(hd,[["__scopeId","data-v-2a9ac4b9"]]),gd=[{path:"/",name:"gallery",component:vd},{path:"/shader/:slug",name:"shader-detail",component:()=>ef(()=>import("./ShaderDetailView-DA3X-B4q.js"),__vite__mapDeps([0,1]))}],ns=l0({history:Ff(),routes:gd});ns.afterEach(e=>{typeof window.gtag=="function"&&window.gtag("event","page_view",{page_path:e.fullPath})});Nc(Zc).use(ns).mount("#app");export{c0 as A,Wo as B,bd as F,yd as M,xd as O,Sd as S,Ct as _,Fe as a,Ri as b,He as c,An as d,Ce as e,_d as f,Re as g,ef as h,Ae as i,Jr as j,oa as k,Hr as l,Un as m,Mn as n,Zn as o,Ed as p,ue as q,xe as r,$r as s,it as t,Le as u,ta as v,ct as w,Bl as x,wd as y,li as z};
