"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),e}var globalMultiplier=1;window.presets=[{name:"Slow",velocity:.1,gradient:2,lifespan:100,lifespanBase:50,lifeOpacity:.25,opacityMultiplier:1,size:3,rainbow:!0,particles:100,rate:50,delayAll:4e3,delayPer:5},{name:"Speed",velocity:.3,gradient:10,lifespan:250,lifespanBase:450,lifeOpacity:.25,opacityMultiplier:.8,size:3,rainbow:!0,particles:200,rate:5,delayAll:2e3,delayPer:20},{name:"Speeder",velocity:.35,gradient:20,lifespan:250,lifespanBase:200,lifeOpacity:.25,opacityMultiplier:.8,size:3,rainbow:!0,particles:100,rate:4,delayAll:2e3,delayPer:5},{name:"Speeder mess",velocity:.4,gradient:15,lifespan:100,lifespanBase:50,lifeOpacity:.25,opacityMultiplier:1,size:3,rainbow:!0,particles:700,rate:10,delayAll:3e3,delayPer:1},{name:"Stars",velocity:.005,gradient:0,lifespan:300,lifespanBase:100,lifeOpacity:.1,opacityMultiplier:.4,size:2,rainbow:!1,particles:500,rate:42,delayAll:5e3,delayPer:10},{name:"Rainbow stars",velocity:.005,gradient:0,lifespan:300,lifespanBase:100,lifeOpacity:.1,opacityMultiplier:1,size:2.2,rainbow:!0,particles:250,rate:42,delayAll:5e3,delayPer:10}];var concat=function(e,i,a){return e.map(function(e,t){return a(e,i[t])})},merge=function(e,t){return concat(e,t,function(e,t){return e+t})},Particle=function(){function e(){_classCallCheck(this,e),this.started=!1}return _createClass(e,[{key:"start",value:function(){this.started=!0,this.lifespan=Math.random()*config.lifespan+config.lifespanBase,this.age=0,this.initial=[Math.random()*canvas.clientWidth,Math.random()*canvas.clientHeight],this.pos=this.initial.slice(0),this.velocity=[Math.random()*config.velocity*2-config.velocity,Math.random()*config.velocity*2-config.velocity],config.rainbow?(this.colour=[Math.floor(256*Math.random()),Math.floor(256*Math.random()),Math.floor(256*Math.random())],this.gradient=[Math.random()*config.gradient*2-config.gradient,Math.random()*config.gradient*2-config.gradient,Math.random()*config.gradient*2-config.gradient]):this.colour=[255,255,255],this.ctx=canvas.getContext("2d")}},{key:"calcOpacity",value:function(){var e=this.lifespan*config.lifeOpacity;return this.age<e?this.age/e:this.age>this.lifespan-e?1-(this.age-this.lifespan+e)/e:1}},{key:"destroy",value:function(){clearInterval(this.renderer),this.start()}},{key:"draw",value:function(){if(this.started){if(this.age++,this.age>=this.lifespan)return this.destroy();this.pos=merge(this.pos,this.velocity),this.rainbow&&(this.colour=merge(this.colour,this.gradient)),this.ctx.beginPath(),this.ctx.fillStyle="rgba(".concat(this.colour[0],", ").concat(this.colour[1],", ").concat(this.colour[2],", ").concat(this.calcOpacity()*config.opacityMultiplier,")"),this.ctx.arc(this.pos[0],this.pos[1],config.size,0,2*Math.PI,!0),this.ctx.closePath(),this.ctx.fill()}}},{key:"lifespan",get:function(){return this._lifespan/globalMultiplier},set:function(e){return this._lifespan=e}},{key:"velocity",get:function(){return this._velocity.map(function(e){return e*globalMultiplier})},set:function(e){return this._velocity=e}},{key:"gradient",get:function(){return this._gradient.map(function(e){return e*globalMultiplier})},set:function(e){return this._gradient=e}}]),e}();window.particles=[];var canvas=document.getElementById("bg"),si=0;window.initParticles=function(e){if(e<0||e>=presets.length)return console.log("bruh");window.particles=[],si=0,window.config=presets[e],console.log("preset ".concat(e," - ").concat(config.name));for(var t=0;t<config.particles;t++)particles.push(new Particle);setTimeout(start,450)};var start=function e(){si>=config.particles||(particles[si].start(),si++,setTimeout(e,Math.random()*config.delayPer+config.delayAll/config.particles))},prev=0,render=function e(t){if(t<500)return globalMultiplier=(t-prev)/config.rate,prev=t,void window.requestAnimationFrame(e);canvas.clientHeight!==window.innerHeight&&canvas.setAttribute("height",window.innerHeight),canvas.clientWidth!==window.innerWidth&&canvas.setAttribute("width",window.innerWidth),canvas.getContext("2d").clearRect(0,0,canvas.clientWidth,canvas.clientHeight),particles.forEach(function(e){return e.draw()}),window.requestAnimationFrame(e)};canvas.getContext&&(initParticles(Math.floor(Math.random()*presets.length)),window.requestAnimationFrame(render));