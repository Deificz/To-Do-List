(()=>{"use strict";var e,t,n={157:(e,t,n)=>{n.d(t,{H:()=>s});var a=n(380);const s=(()=>{let e,t;if("myPlans"in localStorage){const t=localStorage.getItem("myPlans"),n=JSON.parse(t);e=n}else e=[];if("myTasks"in localStorage){const e=localStorage.getItem("myTasks"),n=JSON.parse(e);t=n}else t=[];function n(e){this.title=e}function s(e,t,n){this.name=e,this.note=t,this.schedule=n}const d=()=>{const t=JSON.stringify(e);localStorage.setItem("myPlans",t)},l=()=>{const e=JSON.stringify(t);localStorage.setItem("myTasks",e)};return{myPlans:e,myTasks:t,addPlan:()=>{let t=new n(document.getElementById("plan-input").value);e.push(t),document.getElementById("plan-input").value=""},addTaskHome:()=>{let e=new s(document.getElementById("task-input").value,document.getElementById("task-note").value,document.getElementById("task-sched").value);Array.isArray(t[0])||(t[0]=[]),t[0].push(e),document.getElementById("task-input").value="",document.getElementById("task-note").value="",document.getElementById("task-sched").value=""},addTaskPlan:e=>{let n=new s(document.getElementById("task-input").value,document.getElementById("task-note").value,document.getElementById("task-sched").value);Array.isArray(t[e])||(t[e]=[]),t[e].push(n),document.getElementById("task-input").value="",document.getElementById("task-note").value="",document.getElementById("task-sched").value=""},removePlan:n=>{e.splice(n,1),t.splice(n+1,1),a.G.displayPlanList(),l(),d()},removeTaskHome:(e,n)=>{t[e].splice(n,1),l(),a.G.displayAllTask()},removeTaskPlan:(e,n)=>{t[e].splice(n,1),l(),a.G.displayPlanTask(e)},savePlan:d,saveTask:l}})()},380:(e,t,n)=>{n.d(t,{G:()=>s});var a=n(157);const s=(()=>{const e=()=>{const e=document.querySelector(".display");e.innerHTML="";for(let t=0;t<a.H.myTasks[0].length;t++){const n=a.H.myTasks[0][t],s=document.createElement("div");s.classList.add("task");const d=document.createElement("h3");d.textContent=n.name;const l=document.createElement("p");l.textContent=n.note,l.classList.add("description");const c=document.createElement("h3");c.textContent=n.schedule,c.classList.add("schedule");const o=document.createElement("i");o.classList.add("remove-task"),o.classList.add("fa-solid"),o.classList.add("fa-xmark"),o.setAttribute("id",`removeTaskHome${t}`),s.appendChild(d),s.appendChild(l),s.appendChild(c),s.appendChild(o),e.appendChild(s),document.getElementById(`removeTaskHome${t}`).addEventListener("click",(()=>{a.H.removeTaskHome(0,t)}))}for(let t=1;t<a.H.myTasks.length;t++)for(let n=0;n<a.H.myTasks[t].length;n++){const s=a.H.myTasks[t][n],d=document.createElement("div");d.classList.add("task");const l=document.createElement("h3");l.textContent=s.name;const c=document.createElement("p");c.textContent=s.note,c.classList.add("description");const o=document.createElement("h3");o.textContent=s.schedule,o.classList.add("schedule"),d.appendChild(l),d.appendChild(c),d.appendChild(o),e.appendChild(d)}},t=e=>{const t=document.querySelector(".display");t.innerHTML="";for(let n=0;n<a.H.myTasks[e].length;n++){const s=a.H.myTasks[e][n],d=document.createElement("div");d.classList.add("task");const l=document.createElement("h3");l.textContent=s.name;const c=document.createElement("p");c.textContent=s.note,c.classList.add("description");const o=document.createElement("h3");o.textContent=s.schedule,o.classList.add("schedule");const i=document.createElement("i");i.classList.add("remove-task"),i.classList.add("fa-solid"),i.classList.add("fa-xmark"),i.setAttribute("id",`removeTaskPlan${n}`),d.appendChild(l),d.appendChild(c),d.appendChild(o),d.appendChild(i),t.appendChild(d),document.getElementById(`removeTaskPlan${n}`).addEventListener("click",(()=>{a.H.removeTaskPlan(e,n)}))}},n=e=>{const t=document.getElementById("main"),n=document.querySelector(".display-title"),a=document.querySelector(".add-task");n&&a?(t.removeChild(n),t.removeChild(a)):n&&t.removeChild(n);const s=document.createElement("h1");if(s.classList.add("display-title"),s.innerHTML=`${e}`,"Today"===e||"This Week"===e)t.insertBefore(s,t.firstChild),document.querySelector(".display").innerHTML="";else{const e=document.createElement("button");e.classList.add("add-task");const n=document.createElement("i");n.classList.add("fa-solid"),n.classList.add("fa-plus");const a=document.createTextNode(" Add task ");e.appendChild(n),e.appendChild(a),t.insertBefore(e,t.firstChild),t.insertBefore(s,t.firstChild),document.querySelector(".add-task").addEventListener("click",(()=>{document.querySelector(".task-modal").showModal()}))}};return{displayPlanList:()=>{const s=document.querySelector(".plan-list");s.innerHTML="";for(let d=0;d<a.H.myPlans.length;d++){const l=a.H.myPlans[d],c=document.createElement("button");c.classList.add("plan-utility"),c.setAttribute("id",`plan${d}`);const o=document.createElement("i");o.classList.add("fa-solid"),o.classList.add("fa-list");const i=document.createTextNode(l.title),r=document.createElement("i");r.classList.add("remove-plan"),r.classList.add("fa-solid"),r.classList.add("fa-xmark"),r.setAttribute("id",`removePlan${d}`),c.appendChild(o),c.appendChild(i),c.appendChild(r),s.appendChild(c),document.getElementById(`removePlan${d}`).addEventListener("click",(()=>{a.H.removePlan(d),n("Home"),e()})),document.getElementById(`plan${d}`).addEventListener("click",(()=>{n(`${l.title}`),t(d+1)})),document.querySelector(".confirm-task").addEventListener("click",(()=>{const e=document.querySelector(".task-form"),n=document.getElementById("task-input").value,s=document.getElementById("task-sched").value;document.querySelector(".display-title").textContent===l.title&&e.reportValidity()&&n&&s&&(a.H.addTaskPlan(d+1),a.H.saveTask(),t(d+1),document.querySelector(".task-modal").close())}))}},displayAllTask:e,displayPlanTask:t,displaySwitch:n,displayTodayTask:()=>{const e=document.querySelector(".display"),t=new Date,n=t.getDate().toString().padStart(2,"0"),s=(t.getMonth()+1).toString().padStart(2,"0"),d=`${t.getFullYear()}-${s}-${n}`;e.innerHTML="";for(let t=0;t<a.H.myTasks.length;t++)for(let n=0;n<a.H.myTasks[t].length;n++){const s=a.H.myTasks[t][n];if(s.schedule===d){const n=document.createElement("div");n.classList.add("task");const d=document.createElement("h3");d.textContent=s.name;const l=document.createElement("p");l.textContent=s.note,l.classList.add("description");const c=document.createElement("h3");c.textContent=s.schedule,c.classList.add("schedule");const o=document.createElement("i");o.setAttribute("id",`task${t}`),n.appendChild(d),n.appendChild(l),n.appendChild(c),n.appendChild(o),e.appendChild(n),document.getElementById(`task${t}`).addEventListener("click",(()=>{a.H.removeTaskHome(t)}))}}},displayWeekTask:()=>{const e=document.querySelector(".display");e.innerHTML="";let t=[];(function(){const e=new Date,t=[],n=e.getDay(),a=new Date(e);a.setDate(e.getDate()-n);for(let e=0;e<7;e++){const n=new Date(a);n.setDate(a.getDate()+e),t.push(n)}return t})().forEach((e=>{const n=e.toISOString().split("T")[0];t.push(n)}));for(let n=0;n<a.H.myTasks.length;n++)for(let s=0;s<a.H.myTasks[n].length;s++){const d=a.H.myTasks[n][s];for(let l=0;l<7;l++)if(d.schedule===t[l]){const t=document.createElement("div");t.classList.add("task");const l=document.createElement("h3");l.textContent=d.name;const c=document.createElement("p");c.textContent=d.note,c.classList.add("description");const o=document.createElement("h3");o.textContent=d.schedule,o.classList.add("schedule");const i=document.createElement("i");i.setAttribute("id",`task${s}`),t.appendChild(l),t.appendChild(c),t.appendChild(o),t.appendChild(i),e.appendChild(t),document.getElementById(`task${s}`).addEventListener("click",(()=>{a.H.removeTaskHome(n,s)}))}}}}})()}},a={};function s(e){var t=a[e];if(void 0!==t)return t.exports;var d=a[e]={exports:{}};return n[e](d,d.exports,s),d.exports}s.d=(e,t)=>{for(var n in t)s.o(t,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e=s(157),t=s(380),document.querySelector(".confirm-plan").addEventListener("click",(()=>{const n=document.querySelector(".plan-form"),a=document.getElementById("plan-input").value;n.reportValidity()&&a&&(e.H.addPlan(),e.H.savePlan(),t.G.displayPlanList(),document.querySelector(".plan-modal").close())})),document.querySelector(".confirm-task").addEventListener("click",(()=>{const n=document.querySelector(".task-form"),a=document.getElementById("task-input").value,s=document.getElementById("task-sched").value;"Home"===document.querySelector(".display-title").textContent&&n.reportValidity()&&a&&s&&(e.H.addTaskHome(),e.H.saveTask(),t.G.displayAllTask(),document.querySelector(".task-modal").close())})),document.querySelector(".home").addEventListener("click",(()=>{t.G.displaySwitch("Home"),t.G.displayAllTask(),console.log(e.H.myTasks)})),document.querySelector(".today").addEventListener("click",(()=>{t.G.displaySwitch("Today"),t.G.displayTodayTask()})),document.querySelector(".week").addEventListener("click",(()=>{t.G.displaySwitch("This Week"),t.G.displayWeekTask()})),document.querySelector(".add-plan").addEventListener("click",(()=>{document.querySelector(".plan-modal").show()})),document.querySelector(".cancel-plan").addEventListener("click",(()=>{document.querySelector(".plan-modal").close()})),document.querySelector(".add-task").addEventListener("click",(()=>{document.querySelector(".task-modal").showModal()})),document.querySelector(".cancel-task").addEventListener("click",(()=>{document.querySelector(".task-modal").close()}))})();