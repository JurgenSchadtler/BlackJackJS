const myModule=(()=>{"use strict";let e=[];const t=["C","D","H","S"],n=["A","J","Q","K"],s=new Audio("assets/Sounds/victory.mp3"),o=new Audio("assets/Sounds/aiwins.mp3"),l=new Audio("assets/Sounds/bonk.mp3"),r=new Audio("assets/Sounds/shuffle.mp3");let a=[];const d=document.querySelector("#btnDraw"),i=document.querySelector("#btnStop"),c=document.querySelector("#btnNew"),u=document.querySelectorAll(".divCards"),p=document.querySelectorAll("small"),m=(t=2)=>{e=f(),a=[];for(let e=0;e<t;e++)a.push(0);p.forEach(e=>e.innerText=0),u.forEach(e=>e.innerHTML=""),d.disabled=!1,i.disabled=!1},f=()=>{e=[];for(let n=2;n<=10;n++)for(let s of t)e.push(n+s);for(let s of t)for(let t of n)e.push(t+s);return _.shuffle(e)},b=()=>{if(0===e.length)throw"No more cards";return e.pop()},h=(e,t)=>(a[t]=a[t]+(e=>{const t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:1*t})(e),p[t].innerText=a[t],a[t]),w=(e,t)=>{const n=document.createElement("img");n.src=`assets/cartas/${e}.png`,n.classList.add("carta"),u[t].append(n)},y=e=>{let t=0;do{const e=b();t=h(e,a.length-1),w(e,a.length-1)}while(t<e&&e<=21);(()=>{const[e,t]=a;setTimeout(()=>{t===e?(l.play(),alert("Nobody Wins D:")):e>21?(o.play(),alert("AI Wins")):t>21?(s.play(),alert("You Win :D")):(o.play(),alert("AI Wins"))},100)})()};return d.addEventListener("click",function(){const e=b(),t=h(e,0);w(e,0),t>21?(console.warn("You lost"),d.disabled=!0,i.disabled=!0,y(t)):21===t&&(console.warn("You are a winner"),d.disabled=!0,i.disabled=!0,y(t))}),i.addEventListener("click",()=>{d.disabled=!0,i.disabled=!0,y(a[0])}),c.addEventListener("click",()=>{r.play(),m()}),{newGame:m}})();