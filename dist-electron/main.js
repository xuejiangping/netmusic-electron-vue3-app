"use strict";const E=require("electron"),re=require("path");function Zt(e,t){const n=Object.create(null),s=e.split(",");for(let r=0;r<s.length;r++)n[s[r]]=!0;return t?r=>!!n[r.toLowerCase()]:r=>!!n[r]}const P=process.env.NODE_ENV!=="production"?Object.freeze({}):{};process.env.NODE_ENV!=="production"&&Object.freeze([]);const je=()=>{},kt=/^on[^a-z]/,en=e=>kt.test(e),R=Object.assign,tn=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},nn=Object.prototype.hasOwnProperty,m=(e,t)=>nn.call(e,t),h=Array.isArray,X=e=>ve(e)==="[object Map]",rn=e=>ve(e)==="[object Set]",S=e=>typeof e=="function",T=e=>typeof e=="string",ze=e=>typeof e=="symbol",v=e=>e!==null&&typeof e=="object",sn=e=>v(e)&&S(e.then)&&S(e.catch),on=Object.prototype.toString,ve=e=>on.call(e),Et=e=>ve(e).slice(8,-1),cn=e=>ve(e)==="[object Object]",We=e=>T(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,ln=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},an=ln(e=>e.charAt(0).toUpperCase()+e.slice(1)),ie=(e,t)=>!Object.is(e,t),un=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n})};let Ze;const Re=()=>Ze||(Ze=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Ke(e){if(h(e)){const t={};for(let n=0;n<e.length;n++){const s=e[n],r=T(s)?hn(s):Ke(s);if(r)for(const o in r)t[o]=r[o]}return t}else{if(T(e))return e;if(v(e))return e}}const fn=/;(?![^(]*\))/g,pn=/:([^]+)/,dn=/\/\*[^]*?\*\//g;function hn(e){const t={};return e.replace(dn,"").split(fn).forEach(n=>{if(n){const s=n.split(pn);s.length>1&&(t[s[0].trim()]=s[1].trim())}}),t}function Ue(e){let t="";if(T(e))t=e;else if(h(e))for(let n=0;n<e.length;n++){const s=Ue(e[n]);s&&(t+=s+" ")}else if(v(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}function ke(e,...t){console.warn(`[Vue warn] ${e}`,...t)}let wt;function _n(e,t=wt){t&&t.active&&t.effects.push(e)}function gn(){return wt}const ce=e=>{const t=new Set(e);return t.w=0,t.n=0,t},Nt=e=>(e.w&z)>0,bt=e=>(e.n&z)>0,mn=({deps:e})=>{if(e.length)for(let t=0;t<e.length;t++)e[t].w|=z},En=e=>{const{deps:t}=e;if(t.length){let n=0;for(let s=0;s<t.length;s++){const r=t[s];Nt(r)&&!bt(r)?r.delete(e):t[n++]=r,r.w&=~z,r.n&=~z}t.length=n}},Ce=new WeakMap;let te=0,z=1;const Te=30;let N;const H=Symbol(process.env.NODE_ENV!=="production"?"iterate":""),De=Symbol(process.env.NODE_ENV!=="production"?"Map key iterate":"");class wn{constructor(t,n=null,s){this.fn=t,this.scheduler=n,this.active=!0,this.deps=[],this.parent=void 0,_n(this,s)}run(){if(!this.active)return this.fn();let t=N,n=j;for(;t;){if(t===this)return;t=t.parent}try{return this.parent=N,N=this,j=!0,z=1<<++te,te<=Te?mn(this):et(this),this.fn()}finally{te<=Te&&En(this),z=1<<--te,N=this.parent,j=n,this.parent=void 0,this.deferStop&&this.stop()}}stop(){N===this?this.deferStop=!0:this.active&&(et(this),this.onStop&&this.onStop(),this.active=!1)}}function et(e){const{deps:t}=e;if(t.length){for(let n=0;n<t.length;n++)t[n].delete(e);t.length=0}}let j=!0;const Ot=[];function St(){Ot.push(j),j=!1}function vt(){const e=Ot.pop();j=e===void 0?!0:e}function x(e,t,n){if(j&&N){let s=Ce.get(e);s||Ce.set(e,s=new Map);let r=s.get(n);r||s.set(n,r=ce());const o=process.env.NODE_ENV!=="production"?{effect:N,target:e,type:t,key:n}:void 0;Pe(r,o)}}function Pe(e,t){let n=!1;te<=Te?bt(e)||(e.n|=z,n=!Nt(e)):n=!e.has(N),n&&(e.add(N),N.deps.push(e),process.env.NODE_ENV!=="production"&&N.onTrack&&N.onTrack(R({effect:N},t)))}function W(e,t,n,s,r,o){const i=Ce.get(e);if(!i)return;let c=[];if(t==="clear")c=[...i.values()];else if(n==="length"&&h(e)){const u=Number(s);i.forEach((d,l)=>{(l==="length"||l>=u)&&c.push(d)})}else switch(n!==void 0&&c.push(i.get(n)),t){case"add":h(e)?We(n)&&c.push(i.get("length")):(c.push(i.get(H)),X(e)&&c.push(i.get(De)));break;case"delete":h(e)||(c.push(i.get(H)),X(e)&&c.push(i.get(De)));break;case"set":X(e)&&c.push(i.get(H));break}const a=process.env.NODE_ENV!=="production"?{target:e,type:t,key:n,newValue:s,oldValue:r,oldTarget:o}:void 0;if(c.length===1)c[0]&&(process.env.NODE_ENV!=="production"?G(c[0],a):G(c[0]));else{const u=[];for(const d of c)d&&u.push(...d);process.env.NODE_ENV!=="production"?G(ce(u),a):G(ce(u))}}function G(e,t){const n=h(e)?e:[...e];for(const s of n)s.computed&&tt(s,t);for(const s of n)s.computed||tt(s,t)}function tt(e,t){(e!==N||e.allowRecurse)&&(process.env.NODE_ENV!=="production"&&e.onTrigger&&e.onTrigger(R({effect:e},t)),e.scheduler?e.scheduler():e.run())}const Nn=Zt("__proto__,__v_isRef,__isVue"),xt=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(ze)),bn=He(),On=He(!0),Sn=He(!0,!0),nt=vn();function vn(){const e={};return["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...n){const s=p(this);for(let o=0,i=this.length;o<i;o++)x(s,"get",o+"");const r=s[t](...n);return r===-1||r===!1?s[t](...n.map(p)):r}}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...n){St();const s=p(this)[t].apply(this,n);return vt(),s}}),e}function xn(e){const t=p(this);return x(t,"has",e),t.hasOwnProperty(e)}function He(e=!1,t=!1){return function(s,r,o){if(r==="__v_isReactive")return!e;if(r==="__v_isReadonly")return e;if(r==="__v_isShallow")return t;if(r==="__v_raw"&&o===(e?t?Ct:Rt:t?Kn:yt).get(s))return s;const i=h(s);if(!e){if(i&&m(nt,r))return Reflect.get(nt,r,o);if(r==="hasOwnProperty")return xn}const c=Reflect.get(s,r,o);return(ze(r)?xt.has(r):Nn(r))||(e||x(s,"get",r),t)?c:O(c)?i&&We(r)?c:c.value:v(c)?e?Dt(c):Tt(c):c}}const Vn=In();function In(e=!1){return function(n,s,r,o){let i=n[s];if(K(i)&&O(i)&&!O(r))return!1;if(!e&&(!we(r)&&!K(r)&&(i=p(i),r=p(r)),!h(n)&&O(i)&&!O(r)))return i.value=r,!0;const c=h(n)&&We(s)?Number(s)<n.length:m(n,s),a=Reflect.set(n,s,r,o);return n===p(o)&&(c?ie(r,i)&&W(n,"set",s,r,i):W(n,"add",s,r)),a}}function yn(e,t){const n=m(e,t),s=e[t],r=Reflect.deleteProperty(e,t);return r&&n&&W(e,"delete",t,void 0,s),r}function Rn(e,t){const n=Reflect.has(e,t);return(!ze(t)||!xt.has(t))&&x(e,"has",t),n}function Cn(e){return x(e,"iterate",h(e)?"length":H),Reflect.ownKeys(e)}const Tn={get:bn,set:Vn,deleteProperty:yn,has:Rn,ownKeys:Cn},Vt={get:On,set(e,t){return process.env.NODE_ENV!=="production"&&ke(`Set operation on key "${String(t)}" failed: target is readonly.`,e),!0},deleteProperty(e,t){return process.env.NODE_ENV!=="production"&&ke(`Delete operation on key "${String(t)}" failed: target is readonly.`,e),!0}},Dn=R({},Vt,{get:Sn}),Le=e=>e,xe=e=>Reflect.getPrototypeOf(e);function fe(e,t,n=!1,s=!1){e=e.__v_raw;const r=p(e),o=p(t);n||(t!==o&&x(r,"get",t),x(r,"get",o));const{has:i}=xe(r),c=s?Le:n?Je:le;if(i.call(r,t))return c(e.get(t));if(i.call(r,o))return c(e.get(o));e!==r&&e.get(t)}function pe(e,t=!1){const n=this.__v_raw,s=p(n),r=p(e);return t||(e!==r&&x(s,"has",e),x(s,"has",r)),e===r?n.has(e):n.has(e)||n.has(r)}function de(e,t=!1){return e=e.__v_raw,!t&&x(p(e),"iterate",H),Reflect.get(e,"size",e)}function rt(e){e=p(e);const t=p(this);return xe(t).has.call(t,e)||(t.add(e),W(t,"add",e,e)),this}function st(e,t){t=p(t);const n=p(this),{has:s,get:r}=xe(n);let o=s.call(n,e);o?process.env.NODE_ENV!=="production"&&It(n,s,e):(e=p(e),o=s.call(n,e));const i=r.call(n,e);return n.set(e,t),o?ie(t,i)&&W(n,"set",e,t,i):W(n,"add",e,t),this}function ot(e){const t=p(this),{has:n,get:s}=xe(t);let r=n.call(t,e);r?process.env.NODE_ENV!=="production"&&It(t,n,e):(e=p(e),r=n.call(t,e));const o=s?s.call(t,e):void 0,i=t.delete(e);return r&&W(t,"delete",e,void 0,o),i}function it(){const e=p(this),t=e.size!==0,n=process.env.NODE_ENV!=="production"?X(e)?new Map(e):new Set(e):void 0,s=e.clear();return t&&W(e,"clear",void 0,void 0,n),s}function he(e,t){return function(s,r){const o=this,i=o.__v_raw,c=p(i),a=t?Le:e?Je:le;return!e&&x(c,"iterate",H),i.forEach((u,d)=>s.call(r,a(u),a(d),o))}}function _e(e,t,n){return function(...s){const r=this.__v_raw,o=p(r),i=X(o),c=e==="entries"||e===Symbol.iterator&&i,a=e==="keys"&&i,u=r[e](...s),d=n?Le:t?Je:le;return!t&&x(o,"iterate",a?De:H),{next(){const{value:l,done:f}=u.next();return f?{value:l,done:f}:{value:c?[d(l[0]),d(l[1])]:d(l),done:f}},[Symbol.iterator](){return this}}}}function M(e){return function(...t){if(process.env.NODE_ENV!=="production"){const n=t[0]?`on key "${t[0]}" `:"";console.warn(`${an(e)} operation ${n}failed: target is readonly.`,p(this))}return e==="delete"?!1:this}}function Pn(){const e={get(o){return fe(this,o)},get size(){return de(this)},has:pe,add:rt,set:st,delete:ot,clear:it,forEach:he(!1,!1)},t={get(o){return fe(this,o,!1,!0)},get size(){return de(this)},has:pe,add:rt,set:st,delete:ot,clear:it,forEach:he(!1,!0)},n={get(o){return fe(this,o,!0)},get size(){return de(this,!0)},has(o){return pe.call(this,o,!0)},add:M("add"),set:M("set"),delete:M("delete"),clear:M("clear"),forEach:he(!0,!1)},s={get(o){return fe(this,o,!0,!0)},get size(){return de(this,!0)},has(o){return pe.call(this,o,!0)},add:M("add"),set:M("set"),delete:M("delete"),clear:M("clear"),forEach:he(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(o=>{e[o]=_e(o,!1,!1),n[o]=_e(o,!0,!1),t[o]=_e(o,!1,!0),s[o]=_e(o,!0,!0)}),[e,n,t,s]}const[Mn,$n,Fn,An]=Pn();function Be(e,t){const n=t?e?An:Fn:e?$n:Mn;return(s,r,o)=>r==="__v_isReactive"?!e:r==="__v_isReadonly"?e:r==="__v_raw"?s:Reflect.get(m(n,r)&&r in s?n:s,r,o)}const jn={get:Be(!1,!1)},zn={get:Be(!0,!1)},Wn={get:Be(!0,!0)};function It(e,t,n){const s=p(n);if(s!==n&&t.call(e,s)){const r=Et(e);console.warn(`Reactive ${r} contains both the raw and reactive versions of the same object${r==="Map"?" as keys":""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`)}}const yt=new WeakMap,Kn=new WeakMap,Rt=new WeakMap,Ct=new WeakMap;function Un(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Hn(e){return e.__v_skip||!Object.isExtensible(e)?0:Un(Et(e))}function Tt(e){return K(e)?e:qe(e,!1,Tn,jn,yt)}function Dt(e){return qe(e,!0,Vt,zn,Rt)}function ge(e){return qe(e,!0,Dn,Wn,Ct)}function qe(e,t,n,s,r){if(!v(e))return process.env.NODE_ENV!=="production"&&console.warn(`value cannot be made reactive: ${String(e)}`),e;if(e.__v_raw&&!(t&&e.__v_isReactive))return e;const o=r.get(e);if(o)return o;const i=Hn(e);if(i===0)return e;const c=new Proxy(e,i===2?s:n);return r.set(e,c),c}function L(e){return K(e)?L(e.__v_raw):!!(e&&e.__v_isReactive)}function K(e){return!!(e&&e.__v_isReadonly)}function we(e){return!!(e&&e.__v_isShallow)}function Me(e){return L(e)||K(e)}function p(e){const t=e&&e.__v_raw;return t?p(t):e}function Ln(e){return un(e,"__v_skip",!0),e}const le=e=>v(e)?Tt(e):e,Je=e=>v(e)?Dt(e):e;function Bn(e){j&&N&&(e=p(e),process.env.NODE_ENV!=="production"?Pe(e.dep||(e.dep=ce()),{target:e,type:"get",key:"value"}):Pe(e.dep||(e.dep=ce())))}function qn(e,t){e=p(e);const n=e.dep;n&&(process.env.NODE_ENV!=="production"?G(n,{target:e,type:"set",key:"value",newValue:t}):G(n))}function O(e){return!!(e&&e.__v_isRef===!0)}function ct(e){return Jn(e,!1)}function Jn(e,t){return O(e)?e:new Gn(e,t)}class Gn{constructor(t,n){this.__v_isShallow=n,this.dep=void 0,this.__v_isRef=!0,this._rawValue=n?t:p(t),this._value=n?t:le(t)}get value(){return Bn(this),this._value}set value(t){const n=this.__v_isShallow||we(t)||K(t);t=n?t:p(t),ie(t,this._rawValue)&&(this._rawValue=t,this._value=n?t:le(t),qn(this,t))}}function Yn(e){return O(e)?e.value:e}const Qn={get:(e,t,n)=>Yn(Reflect.get(e,t,n)),set:(e,t,n,s)=>{const r=e[t];return O(r)&&!O(n)?(r.value=n,!0):Reflect.set(e,t,n,s)}};function Xn(e){return L(e)?e:new Proxy(e,Qn)}const B=[];function Zn(e){B.push(e)}function kn(){B.pop()}function b(e,...t){if(process.env.NODE_ENV==="production")return;St();const n=B.length?B[B.length-1].component:null,s=n&&n.appContext.config.warnHandler,r=er();if(s)q(s,n,11,[e+t.join(""),n&&n.proxy,r.map(({vnode:o})=>`at <${Gt(n,o.type)}>`).join(`
`),r]);else{const o=[`[Vue warn]: ${e}`,...t];r.length&&o.push(`
`,...tr(r)),console.warn(...o)}vt()}function er(){let e=B[B.length-1];if(!e)return[];const t=[];for(;e;){const n=t[0];n&&n.vnode===e?n.recurseCount++:t.push({vnode:e,recurseCount:0});const s=e.component&&e.component.parent;e=s&&s.vnode}return t}function tr(e){const t=[];return e.forEach((n,s)=>{t.push(...s===0?[]:[`
`],...nr(n))}),t}function nr({vnode:e,recurseCount:t}){const n=t>0?`... (${t} recursive calls)`:"",s=e.component?e.component.parent==null:!1,r=` at <${Gt(e.component,e.type,s)}`,o=">"+n;return e.props?[r,...rr(e.props),o]:[r+o]}function rr(e){const t=[],n=Object.keys(e);return n.slice(0,3).forEach(s=>{t.push(...Pt(s,e[s]))}),n.length>3&&t.push(" ..."),t}function Pt(e,t,n){return T(t)?(t=JSON.stringify(t),n?t:[`${e}=${t}`]):typeof t=="number"||typeof t=="boolean"||t==null?n?t:[`${e}=${t}`]:O(t)?(t=Pt(e,p(t.value),!0),n?t:[`${e}=Ref<`,t,">"]):S(t)?[`${e}=fn${t.name?`<${t.name}>`:""}`]:(t=p(t),n?t:[`${e}=`,t])}const Mt={sp:"serverPrefetch hook",bc:"beforeCreate hook",c:"created hook",bm:"beforeMount hook",m:"mounted hook",bu:"beforeUpdate hook",u:"updated",bum:"beforeUnmount hook",um:"unmounted hook",a:"activated hook",da:"deactivated hook",ec:"errorCaptured hook",rtc:"renderTracked hook",rtg:"renderTriggered hook",[0]:"setup function",[1]:"render function",[2]:"watcher getter",[3]:"watcher callback",[4]:"watcher cleanup function",[5]:"native event handler",[6]:"component event handler",[7]:"vnode hook",[8]:"directive hook",[9]:"transition hook",[10]:"app errorHandler",[11]:"app warnHandler",[12]:"ref function",[13]:"async component loader",[14]:"scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"};function q(e,t,n,s){let r;try{r=s?e(...s):e()}catch(o){$t(o,t,n)}return r}function $e(e,t,n,s){if(S(e)){const o=q(e,t,n,s);return o&&sn(o)&&o.catch(i=>{$t(i,t,n)}),o}const r=[];for(let o=0;o<e.length;o++)r.push($e(e[o],t,n,s));return r}function $t(e,t,n,s=!0){const r=t?t.vnode:null;if(t){let o=t.parent;const i=t.proxy,c=process.env.NODE_ENV!=="production"?Mt[n]:n;for(;o;){const u=o.ec;if(u){for(let d=0;d<u.length;d++)if(u[d](e,i,c)===!1)return}o=o.parent}const a=t.appContext.config.errorHandler;if(a){q(a,null,10,[e,i,c]);return}}sr(e,n,r,s)}function sr(e,t,n,s=!0){if(process.env.NODE_ENV!=="production"){const r=Mt[t];if(n&&Zn(n),b(`Unhandled error${r?` during execution of ${r}`:""}`),n&&kn(),s)throw e;console.error(e)}else console.error(e)}let Ne=!1,Fe=!1;const C=[];let F=0;const Z=[];let D=null,$=0;const Ft=Promise.resolve();let Ge=null;const or=100;function ir(e){const t=Ge||Ft;return e?t.then(this?e.bind(this):e):t}function cr(e){let t=F+1,n=C.length;for(;t<n;){const s=t+n>>>1;ae(C[s])<e?t=s+1:n=s}return t}function Ye(e){(!C.length||!C.includes(e,Ne&&e.allowRecurse?F+1:F))&&(e.id==null?C.push(e):C.splice(cr(e.id),0,e),At())}function At(){!Ne&&!Fe&&(Fe=!0,Ge=Ft.then(zt))}function jt(e){h(e)?Z.push(...e):(!D||!D.includes(e,e.allowRecurse?$+1:$))&&Z.push(e),At()}function lr(e){if(Z.length){const t=[...new Set(Z)];if(Z.length=0,D){D.push(...t);return}for(D=t,process.env.NODE_ENV!=="production"&&(e=e||new Map),D.sort((n,s)=>ae(n)-ae(s)),$=0;$<D.length;$++)process.env.NODE_ENV!=="production"&&Wt(e,D[$])||D[$]();D=null,$=0}}const ae=e=>e.id==null?1/0:e.id,ar=(e,t)=>{const n=ae(e)-ae(t);if(n===0){if(e.pre&&!t.pre)return-1;if(t.pre&&!e.pre)return 1}return n};function zt(e){Fe=!1,Ne=!0,process.env.NODE_ENV!=="production"&&(e=e||new Map),C.sort(ar);const t=process.env.NODE_ENV!=="production"?n=>Wt(e,n):je;try{for(F=0;F<C.length;F++){const n=C[F];if(n&&n.active!==!1){if(process.env.NODE_ENV!=="production"&&t(n))continue;q(n,null,14)}}}finally{F=0,C.length=0,lr(e),Ne=!1,Ge=null,(C.length||Z.length)&&zt(e)}}function Wt(e,t){if(!e.has(t))e.set(t,1);else{const n=e.get(t);if(n>or){const s=t.ownerInstance,r=s&&Jt(s.type);return b(`Maximum recursive updates exceeded${r?` in component <${r}>`:""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`),!0}else e.set(t,n+1)}}const ee=new Set;process.env.NODE_ENV!=="production"&&(Re().__VUE_HMR_RUNTIME__={createRecord:Ve(ur),rerender:Ve(fr),reload:Ve(pr)});const be=new Map;function ur(e,t){return be.has(e)?!1:(be.set(e,{initialDef:se(t),instances:new Set}),!0)}function se(e){return Yt(e)?e.__vccOpts:e}function fr(e,t){const n=be.get(e);n&&(n.initialDef.render=t,[...n.instances].forEach(s=>{t&&(s.render=t,se(s.type).render=t),s.renderCache=[],s.update()}))}function pr(e,t){const n=be.get(e);if(!n)return;t=se(t),lt(n.initialDef,t);const s=[...n.instances];for(const r of s){const o=se(r.type);ee.has(o)||(o!==n.initialDef&&lt(o,t),ee.add(o)),r.appContext.propsCache.delete(r.type),r.appContext.emitsCache.delete(r.type),r.appContext.optionsCache.delete(r.type),r.ceReload?(ee.add(o),r.ceReload(t.styles),ee.delete(o)):r.parent?Ye(r.parent.update):r.appContext.reload?r.appContext.reload():typeof window<"u"?window.location.reload():console.warn("[HMR] Root or manually mounted instance modified. Full reload required.")}jt(()=>{for(const r of s)ee.delete(se(r.type))})}function lt(e,t){R(e,t);for(const n in e)n!=="__file"&&!(n in t)&&delete e[n]}function Ve(e){return(t,n)=>{try{return e(t,n)}catch(s){console.error(s),console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.")}}}let A=null,dr=null;const hr=e=>e.__isSuspense;function _r(e,t){t&&t.pendingBranch?h(e)?t.effects.push(...e):t.effects.push(e):jt(e)}function at(e,t){return Kt(e,null,t)}const me={};function Kt(e,t,{immediate:n,deep:s,flush:r,onTrack:o,onTrigger:i}=P){var c;process.env.NODE_ENV!=="production"&&!t&&(n!==void 0&&b('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'),s!==void 0&&b('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));const a=g=>{b("Invalid watch source: ",g,"A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.")},u=gn()===((c=k)==null?void 0:c.scope)?k:null;let d,l=!1,f=!1;if(O(e)?(d=()=>e.value,l=we(e)):L(e)?(d=()=>e,s=!0):h(e)?(f=!0,l=e.some(g=>L(g)||we(g)),d=()=>e.map(g=>{if(O(g))return g.value;if(L(g))return Y(g);if(S(g))return q(g,u,2);process.env.NODE_ENV!=="production"&&a(g)})):S(e)?t?d=()=>q(e,u,2):d=()=>{if(!(u&&u.isUnmounted))return _&&_(),$e(e,u,3,[V])}:(d=je,process.env.NODE_ENV!=="production"&&a(e)),t&&s){const g=d;d=()=>Y(g())}let _,V=g=>{_=y.onStop=()=>{q(g,u,4)}},I=f?new Array(e.length).fill(me):me;const U=()=>{if(y.active)if(t){const g=y.run();(s||l||(f?g.some((Qt,Xt)=>ie(Qt,I[Xt])):ie(g,I)))&&(_&&_(),$e(t,u,3,[g,I===me?void 0:f&&I[0]===me?[]:I,V]),I=g)}else y.run()};U.allowRecurse=!!t;let ue;r==="sync"?ue=U:r==="post"?ue=()=>ht(U,u&&u.suspense):(U.pre=!0,u&&(U.id=u.uid),ue=()=>Ye(U));const y=new wn(d,ue);return process.env.NODE_ENV!=="production"&&(y.onTrack=o,y.onTrigger=i),t?n?U():I=y.run():r==="post"?ht(y.run.bind(y),u&&u.suspense):y.run(),()=>{y.stop(),u&&u.scope&&tn(u.scope.effects,y)}}function gr(e,t,n){const s=this.proxy,r=T(e)?e.includes(".")?mr(s,e):()=>s[e]:e.bind(s,s);let o;S(t)?o=t:(o=t.handler,n=t);const i=k;gt(this);const c=Kt(r,o.bind(s),n);return i?gt(i):Fr(),c}function mr(e,t){const n=t.split(".");return()=>{let s=e;for(let r=0;r<n.length&&s;r++)s=s[n[r]];return s}}function Y(e,t){if(!v(e)||e.__v_skip||(t=t||new Set,t.has(e)))return e;if(t.add(e),O(e))Y(e.value,t);else if(h(e))for(let n=0;n<e.length;n++)Y(e[n],t);else if(rn(e)||X(e))e.forEach(n=>{Y(n,t)});else if(cn(e))for(const n in e)Y(e[n],t);return e}const Er=Symbol.for("v-ndc"),Ae=e=>e?Ar(e)?jr(e)||e.proxy:Ae(e.parent):null,oe=R(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>process.env.NODE_ENV!=="production"?ge(e.props):e.props,$attrs:e=>process.env.NODE_ENV!=="production"?ge(e.attrs):e.attrs,$slots:e=>process.env.NODE_ENV!=="production"?ge(e.slots):e.slots,$refs:e=>process.env.NODE_ENV!=="production"?ge(e.refs):e.refs,$parent:e=>Ae(e.parent),$root:e=>Ae(e.root),$emit:e=>e.emit,$options:e=>__VUE_OPTIONS_API__?Or(e):e.type,$forceUpdate:e=>e.f||(e.f=()=>Ye(e.update)),$nextTick:e=>e.n||(e.n=ir.bind(e.proxy)),$watch:e=>__VUE_OPTIONS_API__?gr.bind(e):je}),wr=e=>e==="_"||e==="$",Ie=(e,t)=>e!==P&&!e.__isScriptSetup&&m(e,t),Nr={get({_:e},t){const{ctx:n,setupState:s,data:r,props:o,accessCache:i,type:c,appContext:a}=e;if(process.env.NODE_ENV!=="production"&&t==="__isVue")return!0;let u;if(t[0]!=="$"){const _=i[t];if(_!==void 0)switch(_){case 1:return s[t];case 2:return r[t];case 4:return n[t];case 3:return o[t]}else{if(Ie(s,t))return i[t]=1,s[t];if(r!==P&&m(r,t))return i[t]=2,r[t];if((u=e.propsOptions[0])&&m(u,t))return i[t]=3,o[t];if(n!==P&&m(n,t))return i[t]=4,n[t];(!__VUE_OPTIONS_API__||br)&&(i[t]=0)}}const d=oe[t];let l,f;if(d)return t==="$attrs"?(x(e,"get",t),process.env.NODE_ENV!=="production"&&void 0):process.env.NODE_ENV!=="production"&&t==="$slots"&&x(e,"get",t),d(e);if((l=c.__cssModules)&&(l=l[t]))return l;if(n!==P&&m(n,t))return i[t]=4,n[t];if(f=a.config.globalProperties,m(f,t))return f[t];process.env.NODE_ENV!=="production"&&A&&(!T(t)||t.indexOf("__v")!==0)&&(r!==P&&wr(t[0])&&m(r,t)?b(`Property ${JSON.stringify(t)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`):e===A&&b(`Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`))},set({_:e},t,n){const{data:s,setupState:r,ctx:o}=e;return Ie(r,t)?(r[t]=n,!0):process.env.NODE_ENV!=="production"&&r.__isScriptSetup&&m(r,t)?(b(`Cannot mutate <script setup> binding "${t}" from Options API.`),!1):s!==P&&m(s,t)?(s[t]=n,!0):m(e.props,t)?(process.env.NODE_ENV!=="production"&&b(`Attempting to mutate prop "${t}". Props are readonly.`),!1):t[0]==="$"&&t.slice(1)in e?(process.env.NODE_ENV!=="production"&&b(`Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`),!1):(process.env.NODE_ENV!=="production"&&t in e.appContext.config.globalProperties?Object.defineProperty(o,t,{enumerable:!0,configurable:!0,value:n}):o[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:s,appContext:r,propsOptions:o}},i){let c;return!!n[i]||e!==P&&m(e,i)||Ie(t,i)||(c=o[0])&&m(c,i)||m(s,i)||m(oe,i)||m(r.config.globalProperties,i)},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:m(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};process.env.NODE_ENV!=="production"&&(Nr.ownKeys=e=>(b("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."),Reflect.ownKeys(e)));function ut(e){return h(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let br=!0;function Or(e){const t=e.type,{mixins:n,extends:s}=t,{mixins:r,optionsCache:o,config:{optionMergeStrategies:i}}=e.appContext,c=o.get(t);let a;return c?a=c:!r.length&&!n&&!s?a=t:(a={},r.length&&r.forEach(u=>Oe(a,u,i,!0)),Oe(a,t,i)),v(t)&&o.set(t,a),a}function Oe(e,t,n,s=!1){const{mixins:r,extends:o}=t;o&&Oe(e,o,n,!0),r&&r.forEach(i=>Oe(e,i,n,!0));for(const i in t)if(s&&i==="expose")process.env.NODE_ENV!=="production"&&b('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');else{const c=Sr[i]||n&&n[i];e[i]=c?c(e[i],t[i]):t[i]}return e}const Sr={data:ft,props:dt,emits:dt,methods:ne,computed:ne,beforeCreate:w,created:w,beforeMount:w,mounted:w,beforeUpdate:w,updated:w,beforeDestroy:w,beforeUnmount:w,destroyed:w,unmounted:w,activated:w,deactivated:w,errorCaptured:w,serverPrefetch:w,components:ne,directives:ne,watch:xr,provide:ft,inject:vr};function ft(e,t){return t?e?function(){return R(S(e)?e.call(this,this):e,S(t)?t.call(this,this):t)}:t:e}function vr(e,t){return ne(pt(e),pt(t))}function pt(e){if(h(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function w(e,t){return e?[...new Set([].concat(e,t))]:t}function ne(e,t){return e?R(Object.create(null),e,t):t}function dt(e,t){return e?h(e)&&h(t)?[...new Set([...e,...t])]:R(Object.create(null),ut(e),ut(t??{})):t}function xr(e,t){if(!e)return t;if(!t)return e;const n=R(Object.create(null),e);for(const s in t)n[s]=w(e[s],t[s]);return n}const ht=_r,Vr=e=>e.__isTeleport,Ut=Symbol.for("v-fgt"),Ir=Symbol.for("v-txt"),yr=Symbol.for("v-cmt");let Q=null;function Rr(e){return e?e.__v_isVNode===!0:!1}const Cr=(...e)=>Bt(...e),Ht="__vInternal",Lt=({key:e})=>e??null,Ee=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?T(e)||O(e)||S(e)?{i:A,r:e,k:t,f:!!n}:e:null);function Tr(e,t=null,n=null,s=0,r=null,o=e===Ut?0:1,i=!1,c=!1){const a={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Lt(t),ref:t&&Ee(t),scopeId:dr,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:o,patchFlag:s,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:A};return c?(Qe(a,n),o&128&&e.normalize(a)):n&&(a.shapeFlag|=T(n)?8:16),process.env.NODE_ENV!=="production"&&a.key!==a.key&&b("VNode created with invalid key (NaN). VNode type:",a.type),!i&&Q&&(a.patchFlag>0||o&6)&&a.patchFlag!==32&&Q.push(a),a}const Dr=process.env.NODE_ENV!=="production"?Cr:Bt;function Bt(e,t=null,n=null,s=0,r=null,o=!1){if((!e||e===Er)&&(process.env.NODE_ENV!=="production"&&!e&&b(`Invalid vnode type when creating vnode: ${e}.`),e=yr),Rr(e)){const c=Se(e,t,!0);return n&&Qe(c,n),!o&&Q&&(c.shapeFlag&6?Q[Q.indexOf(e)]=c:Q.push(c)),c.patchFlag|=-2,c}if(Yt(e)&&(e=e.__vccOpts),t){t=Pr(t);let{class:c,style:a}=t;c&&!T(c)&&(t.class=Ue(c)),v(a)&&(Me(a)&&!h(a)&&(a=R({},a)),t.style=Ke(a))}const i=T(e)?1:hr(e)?128:Vr(e)?64:v(e)?4:S(e)?2:0;return process.env.NODE_ENV!=="production"&&i&4&&Me(e)&&(e=p(e),b("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",`
Component that was made reactive: `,e)),Tr(e,t,n,s,r,i,o,!0)}function Pr(e){return e?Me(e)||Ht in e?R({},e):e:null}function Se(e,t,n=!1){const{props:s,ref:r,patchFlag:o,children:i}=e,c=t?$r(s||{},t):s;return{__v_isVNode:!0,__v_skip:!0,type:e.type,props:c,key:c&&Lt(c),ref:t&&t.ref?n&&r?h(r)?r.concat(Ee(t)):[r,Ee(t)]:Ee(t):r,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:process.env.NODE_ENV!=="production"&&o===-1&&h(i)?i.map(qt):i,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Ut?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Se(e.ssContent),ssFallback:e.ssFallback&&Se(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce}}function qt(e){const t=Se(e);return h(e.children)&&(t.children=e.children.map(qt)),t}function Mr(e=" ",t=0){return Dr(Ir,null,e,t)}function Qe(e,t){let n=0;const{shapeFlag:s}=e;if(t==null)t=null;else if(h(t))n=16;else if(typeof t=="object")if(s&65){const r=t.default;r&&(r._c&&(r._d=!1),Qe(e,r()),r._c&&(r._d=!0));return}else{n=32;const r=t._;!r&&!(Ht in t)?t._ctx=A:r===3&&A&&(A.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else S(t)?(t={default:t,_ctx:A},n=32):(t=String(t),s&64?(n=16,t=[Mr(t)]):n=8);e.children=t,e.shapeFlag|=n}function $r(...e){const t={};for(let n=0;n<e.length;n++){const s=e[n];for(const r in s)if(r==="class")t.class!==s.class&&(t.class=Ue([t.class,s.class]));else if(r==="style")t.style=Ke([t.style,s.style]);else if(en(r)){const o=t[r],i=s[r];i&&o!==i&&!(h(o)&&o.includes(i))&&(t[r]=o?[].concat(o,i):i)}else r!==""&&(t[r]=s[r])}return t}let k=null,Xe,J,_t="__VUE_INSTANCE_SETTERS__";(J=Re()[_t])||(J=Re()[_t]=[]),J.push(e=>k=e),Xe=e=>{J.length>1?J.forEach(t=>t(e)):J[0](e)};const gt=e=>{Xe(e),e.scope.on()},Fr=()=>{k&&k.scope.off(),Xe(null)};function Ar(e){return e.vnode.shapeFlag&4}function jr(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(Xn(Ln(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in oe)return oe[n](e)},has(t,n){return n in t||n in oe}}))}const zr=/(?:^|[-_])(\w)/g,Wr=e=>e.replace(zr,t=>t.toUpperCase()).replace(/[-_]/g,"");function Jt(e,t=!0){return S(e)?e.displayName||e.name:e.name||t&&e.__name}function Gt(e,t,n=!1){let s=Jt(t);if(!s&&t.__file){const r=t.__file.match(/([^/\\]+)\.\w+$/);r&&(s=r[1])}if(!s&&e&&e.parent){const r=o=>{for(const i in o)if(o[i]===t)return i};s=r(e.components||e.parent.type.components)||r(e.appContext.components)}return s?Wr(s):n?"App":"Anonymous"}function Yt(e){return S(e)&&"__vccOpts"in e}function ye(e){return!!(e&&e.__v_isShallow)}function Kr(){if(process.env.NODE_ENV==="production"||typeof window>"u")return;const e={style:"color:#3ba776"},t={style:"color:#0b1bc9"},n={style:"color:#b62e24"},s={style:"color:#9d288c"},r={header(l){return v(l)?l.__isVue?["div",e,"VueInstance"]:O(l)?["div",{},["span",e,d(l)],"<",c(l.value),">"]:L(l)?["div",{},["span",e,ye(l)?"ShallowReactive":"Reactive"],"<",c(l),`>${K(l)?" (readonly)":""}`]:K(l)?["div",{},["span",e,ye(l)?"ShallowReadonly":"Readonly"],"<",c(l),">"]:null:null},hasBody(l){return l&&l.__isVue},body(l){if(l&&l.__isVue)return["div",{},...o(l.$)]}};function o(l){const f=[];l.type.props&&l.props&&f.push(i("props",p(l.props))),l.setupState!==P&&f.push(i("setup",l.setupState)),l.data!==P&&f.push(i("data",p(l.data)));const _=a(l,"computed");_&&f.push(i("computed",_));const V=a(l,"inject");return V&&f.push(i("injected",V)),f.push(["div",{},["span",{style:s.style+";opacity:0.66"},"$ (internal): "],["object",{object:l}]]),f}function i(l,f){return f=R({},f),Object.keys(f).length?["div",{style:"line-height:1.25em;margin-bottom:0.6em"},["div",{style:"color:#476582"},l],["div",{style:"padding-left:1.25em"},...Object.keys(f).map(_=>["div",{},["span",s,_+": "],c(f[_],!1)])]]:["span",{}]}function c(l,f=!0){return typeof l=="number"?["span",t,l]:typeof l=="string"?["span",n,JSON.stringify(l)]:typeof l=="boolean"?["span",s,l]:v(l)?["object",{object:f?p(l):l}]:["span",n,String(l)]}function a(l,f){const _=l.type;if(S(_))return;const V={};for(const I in l.ctx)u(_,I,f)&&(V[I]=l.ctx[I]);return V}function u(l,f,_){const V=l[_];if(h(V)&&V.includes(f)||v(V)&&f in V||l.extends&&u(l.extends,f,_)||l.mixins&&l.mixins.some(I=>u(I,f,_)))return!0}function d(l){return ye(l)?"ShallowRef":l.effect?"ComputedRef":"Ref"}window.devtoolsFormatters?window.devtoolsFormatters.push(r):window.devtoolsFormatters=[r]}function Ur(){Kr()}process.env.NODE_ENV!=="production"&&Ur();function Hr(e){const t=new E.Tray(re.join(__dirname,"../public/favicon.ico")),s=ct([{label:"xue6474",id:"curSong",click(){e.isVisible()||e.show(),e.webContents.send("music_detail")}},{label:"播放/暂停",click(){e.webContents.send("playMusic")}},{label:"上一曲",click(){e.webContents.send("prevMusic")}},{label:"下一曲",click(){e.webContents.send("nextMusic")}},{label:"退出",click(){e.close()}}]),r=ct("浮生浪迹笑明月");return at(()=>{const o=E.Menu.buildFromTemplate(s.value);t.setContextMenu(o)}),at(()=>t.setToolTip(r.value)),t.on("click",()=>e.show()),E.ipcMain.handle("tray_setContextMenu_musicName",(o,i)=>{s.value[0].label=i}),E.ipcMain.handle("tray_setToolTip",(o,i)=>{r.value=i}),{tray:t,menu_template_ref:s,toolTip:r}}function Lr(e){let t;E.ipcMain.handle("desktop_lyric",(n,s)=>{if(s.type==="open"){let r=process.env.VITE_DEV_SERVER_URL||re.join(__dirname,"../dist-electron/index.html");t=new E.BrowserWindow({width:600,height:200,parent:e||E.BrowserWindow.getFocusedWindow()||void 0,transparent:!0,frame:!1,resizable:!0,maxHeight:250,minWidth:300,minHeight:150,alwaysOnTop:!0,webPreferences:{nodeIntegration:!0,contextIsolation:!1}}),t.loadURL(r+s.path),t.webContents.ipc.handle("close",()=>{e.webContents.send("desktop-lyric-close")}),t.on("always-on-top-changed",o=>o.preventDefault())}else s.type==="data"?t==null||t.webContents.send("lyric_data",JSON.stringify(s.data)):s.type==="close"&&(t==null||t.close())})}function Br(e){e.webContents.ipc.handle("window_control",(n,s)=>{switch(s.type){case"close":e.close();break;case"min":e.minimize();break;case"max":e.isMaximized()?e.restore():e.maximize();break;case"hide":e.hide();break}})}function qr(e){Hr(e),Lr(e),Br(e)}process.env.ELECTRON_DISABLE_SECURITY_WARNINGS="true";function mt(){E.Menu.setApplicationMenu(null);const e=new E.BrowserWindow({width:800,height:560,minWidth:760,minHeight:550,frame:!1,title:"网易云音乐",icon:re.join(__dirname,"../public/favicon.ico"),webPreferences:{contextIsolation:!1,nodeIntegration:!1,preload:re.join(__dirname,"../electron-preload/index.ts"),webSecurity:!1}});if(E.app.isPackaged)e.loadFile(re.join(__dirname,"../dist/index.html"));else{const t="http://localhost:5173/";e.loadURL(process.env.VITE_DEV_SERVER_URL||t)}return e}E.app.whenReady().then(()=>{const e=mt();E.globalShortcut.register("CommandOrControl+Shift+i",function(){e.webContents.openDevTools({activate:!0,mode:"undocked"})}),E.app.on("activate",()=>{E.BrowserWindow.getAllWindows().length===0&&mt()}),qr(e)});E.app.on("window-all-closed",()=>{process.platform!=="darwin"&&E.app.quit()});
