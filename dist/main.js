(()=>{"use strict";function t(t,e,i){return function(n,l){t.beginPath(),t.rect(n,l,e,i),t.fillStyle="black",t.fill(),t.closePath()}}const e=document.getElementById("gameCanvas"),i=document.body.clientHeight,n=document.body.clientWidth;e.setAttribute("width",n),e.setAttribute("height",Math.floor(.75*i));const l=e.getContext("2d"),o=e.clientWidth,h=e.clientHeight;!function(e,i){const n=t(e,15,15),l=t(e,20,10);n(i.myShip.x,i.myShip.y),l(i.enemyShip.x,i.enemyShip.y),i.bullet.x,i.bullet.y}(l,{myShip:{x:Math.floor(o/2),y:h-15},enemyShip:{x:o+5,y:0},bullet:{x:Math.floor(o/2),y:h-15}})})();