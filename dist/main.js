(()=>{"use strict";function e(e,t,n){return function(i,o){e.beginPath(),e.rect(i,o,t,n),e.fillStyle="black",e.fill(),e.closePath()}}const t=function(t,n){const i=e(t,15,15),o=e(t,20,10);i(n.myShip.x,n.myShip.y),o(n.enemyShip.x,n.enemyShip.y);const s=Object.keys(n.bullets);s.length&&s.forEach((e=>{!function(e,t,n){e.beginPath(),e.rect(t,n,2,10),e.fillStyle="black",e.fill(),e.closePath()}(t,n.bullets[e].x,n.bullets[e].y)}))},n=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),i=document.getElementById("gameCanvas"),o=document.querySelector(".SpaceImpact_Shoot"),s=window.innerHeight,c=window.innerWidth;i.setAttribute("width",c-50),i.setAttribute("height",Math.floor(.8*s));const l=i.getContext("2d"),h=i.width,u=i.height,r=(new class{events={};subscribe=(e,t)=>{this.events[e]?this.events[e].push(t):this.events[e]=[t]};publish=(e,t)=>{this.events[e]&&this.events[e].forEach((e=>{e.call(this,t)}))}},{myShip:{x:Math.floor(h/2),y:u-30},enemyShip:{x:h+5,y:0},bullets:{}});function a(){l.clearRect(0,0,h,u),t(l,r)}function d(e){let{clientX:t}=e;n&&(t=e.changedTouches[0].clientX),r.myShip.x=t-25,a()}function m(e){let{type:t,clientX:o}=e;n&&(o=e.changedTouches[0].clientX),"mousedown"!==t&&"touchstart"!==t||(r.myShip.x=o-25,a(),i.addEventListener(n?"touchmove":"mousemove",d)),"mouseup"!==t&&"touchend"!==t||i.removeEventListener(n?"touchmove":"mousemove",d)}function y(e){r.bullets[e].y-=1,a(),r.bullets[e].y>=0?requestAnimationFrame((()=>y(e))):(delete r.bullets[e],a())}t(l,r),i.addEventListener(n?"touchstart":"mousedown",m),i.addEventListener(n?"touchend":"mouseup",m),o.addEventListener("click",(function(){const e=([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)));r.bullets[e]={x:r.myShip.x,y:r.myShip.y},a(),y(e)}))})();