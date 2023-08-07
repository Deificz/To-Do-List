import { Model } from './Model';

export const View = (() => {

    const displayPlanList = () =>{
        const planPane = document.querySelector(`.plan-list`);

        //reset fields
        planPane.innerHTML = "";

        for(let i = 0; i < Model.myPlans.length; i++){
            const plan = Model.myPlans[i];
            
            const btnPlan = document.createElement(`button`);
            btnPlan.classList.add(`plan-utility`);
            btnPlan.setAttribute(`id`,`plan${i}`);

            const iconPlan = document.createElement(`i`);
            iconPlan.classList.add(`fa-solid`);
            iconPlan.classList.add(`fa-list`);

            const text = document.createTextNode(plan.title);
            
            const iconRemove = document.createElement(`i`);
            iconRemove.classList.add(`remove-plan`);
            iconRemove.classList.add(`fa-solid`);
            iconRemove.classList.add(`fa-xmark`);
            iconRemove.setAttribute(`id`,`removePlan${i}`);

            btnPlan.appendChild(iconPlan);
            btnPlan.appendChild(text);
            btnPlan.appendChild(iconRemove);

            planPane.appendChild(btnPlan);

            //Event listeners for the plan
            document.getElementById(`removePlan${i}`).addEventListener(`click`,()=>{
                Model.removePlan(i);
                displaySwitch(`Home`);
                displayAllTask();
            });

            document.getElementById(`plan${i}`).addEventListener(`click`, () => {
                displaySwitch(`${plan.title}`);
                displayPlanTask(i+1);
            });

            document.querySelector(`.confirm-task`).addEventListener(`click`, () => {
                

                const form = document.querySelector(`.task-form`);

                const inputName = document.getElementById(`task-input`).value;
                const inputSched = document.getElementById(`task-sched`).value;
                const displayTitle = document.querySelector(`.display-title`).textContent;
                
                if(displayTitle === plan.title){
                    if(form.reportValidity()){
                        if(inputName && inputSched){
                            Model.addTaskPlan(i+1);
                            Model.saveTask();
                            displayPlanTask(i+1);
                            document.querySelector(`.task-modal`).close();
                        }
                    }
                }
            });
        }
    }

    const displayAllTask = () => {
        const windowDisplay = document.querySelector(`.display`);

        //reset fields
        windowDisplay.innerHTML = ``;
        
      
            for(let i=0; i < Model.myTasks[0].length; i++){
                const task = Model.myTasks[0][i];
                const task_div = document.createElement(`div`);
                task_div.classList.add(`task`);

                const name = document.createElement(`h3`)
                name.textContent = task.name;

                const note = document.createElement(`p`);
                note.textContent = task.note;
                note.classList.add(`description`);

                const sched = document.createElement(`h3`);
                sched.textContent = task.schedule;
                sched.classList.add(`schedule`);

                const iconRemove = document.createElement(`i`);
                iconRemove.classList.add(`remove-task`);
                iconRemove.classList.add(`fa-solid`);
                iconRemove.classList.add(`fa-xmark`);
                iconRemove.setAttribute(`id`,`removeTaskHome${i}`);
                
                task_div.appendChild(name);
                task_div.appendChild(note);
                task_div.appendChild(sched);
                task_div.appendChild(iconRemove);

                windowDisplay.appendChild(task_div);

                document.getElementById(`removeTaskHome${i}`).addEventListener(`click`, ()=>{
                    Model.removeTaskHome(0,i);
                })
            }
        
            for(let i = 1; i < Model.myTasks.length; i++){
                for(let j=0; j < Model.myTasks[i].length; j++){
                    const task = Model.myTasks[i][j];
                    const task_div = document.createElement(`div`);
                    task_div.classList.add(`task`);
    
                    const name = document.createElement(`h3`)
                    name.textContent = task.name;
    
                    const note = document.createElement(`p`);
                    note.textContent = task.note;
                    note.classList.add(`description`);
    
                    const sched = document.createElement(`h3`);
                    sched.textContent = task.schedule;
                    sched.classList.add(`schedule`);
    
                   
                    task_div.appendChild(name);
                    task_div.appendChild(note);
                    task_div.appendChild(sched);
    
                    windowDisplay.appendChild(task_div);
    
                }
            }
            
    }
    
    const displayPlanTask = (plan) => {
        const windowDisplay = document.querySelector(`.display`);

        windowDisplay.innerHTML = "";
        
            for(let i=0; i < Model.myTasks[plan].length; i++){
                const task = Model.myTasks[plan][i];
                const task_div = document.createElement(`div`);
                task_div.classList.add(`task`);

                const name = document.createElement(`h3`)
                name.textContent = task.name;

                const note = document.createElement(`p`);
                note.textContent = task.note;
                note.classList.add(`description`);

                const sched = document.createElement(`h3`);
                sched.textContent = task.schedule;
                sched.classList.add(`schedule`);

                const iconRemove = document.createElement(`i`);
                iconRemove.classList.add(`remove-task`);
                iconRemove.classList.add(`fa-solid`);
                iconRemove.classList.add(`fa-xmark`);
                iconRemove.setAttribute(`id`,`removeTaskPlan${i}`);

                task_div.appendChild(name);
                task_div.appendChild(note);
                task_div.appendChild(sched);
                task_div.appendChild(iconRemove);

                windowDisplay.appendChild(task_div);

                document.getElementById(`removeTaskPlan${i}`).addEventListener(`click`, ()=>{
                    Model.removeTaskPlan(plan,i);
                })
            }
        
        
    }

    const displaySwitch = (title) => {
        const mainDisplay = document.getElementById(`main`);
        const display_title = document.querySelector(`.display-title`);
        const add_task = document.querySelector(`.add-task`);
        //reset elements
        if(display_title && add_task){
            mainDisplay.removeChild(display_title);
            mainDisplay.removeChild(add_task);
        }
        else if(display_title){
            mainDisplay.removeChild(display_title);
        }

        const displayTitle = document.createElement(`h1`);
        displayTitle.classList.add(`display-title`);
        displayTitle.innerHTML = `${title}`;
    
        
        if(title === `Today` || title === `This Week`){
            mainDisplay.insertBefore(displayTitle, mainDisplay.firstChild);
            document.querySelector(`.display`).innerHTML = ``;
        }
        else{
            const btnAddTask = document.createElement(`button`);
            btnAddTask.classList.add(`add-task`);
            
            const iconAdd = document.createElement(`i`);
            iconAdd.classList.add(`fa-solid`);
            iconAdd.classList.add(`fa-plus`);

            const text = document.createTextNode(` Add task `);

            btnAddTask.appendChild(iconAdd);
            btnAddTask.appendChild(text);
            mainDisplay.insertBefore(btnAddTask, mainDisplay.firstChild);
            mainDisplay.insertBefore(displayTitle, mainDisplay.firstChild);

            document.querySelector(`.add-task`).addEventListener(`click`,()=>{
                document.querySelector(`.task-modal`).showModal();
            })
        }   
    }

    const displayTodayTask = () => {
        const windowDisplay = document.querySelector(`.display`);
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, '0');;
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear();
        const dateToday = `${year}-${month}-${day}`;
        
        //reset fields
        windowDisplay.innerHTML = ``;
        

        for(let i = 0; i < Model.myTasks.length; i++){
            for(let j = 0; j < Model.myTasks[i].length; j++){
                const task = Model.myTasks[i][j];

            if(task.schedule === dateToday){
                
                const task_div = document.createElement(`div`);
                task_div.classList.add(`task`);

                const name = document.createElement(`h3`)
                name.textContent = task.name;

                const note = document.createElement(`p`);
                note.textContent = task.note;
                note.classList.add(`description`);

                const sched = document.createElement(`h3`);
                sched.textContent = task.schedule;
                sched.classList.add(`schedule`);

                const iconRemove = document.createElement(`i`);
               
                iconRemove.setAttribute(`id`,`task${i}`);

                task_div.appendChild(name);
                task_div.appendChild(note);
                task_div.appendChild(sched);
                task_div.appendChild(iconRemove);

                windowDisplay.appendChild(task_div);

                document.getElementById(`task${i}`).addEventListener(`click`, ()=>{
                    Model.removeTaskHome(i);
                })
            }
            }
        }
    }

    const displayWeekTask = () => {
        const windowDisplay = document.querySelector(`.display`);
        
        //reset fields
        windowDisplay.innerHTML = ``;
       
        let days = [];

        function getDatesInWeek() {
            const today = new Date();
            const weekDates = [];
          
            const currentDayOfWeek = today.getDay();
          
            const startDate = new Date(today);
            startDate.setDate(today.getDate() - currentDayOfWeek);
       
            for (let i = 0; i < 7; i++) {
              const currentDate = new Date(startDate);
              currentDate.setDate(startDate.getDate() + i);
              weekDates.push(currentDate);
            }
          
            return weekDates;
          }
        
          getDatesInWeek().forEach((date) => {
            const formattedDate = date.toISOString().split('T')[0];
            days.push(formattedDate);
          });

        for(let i = 0; i < Model.myTasks.length; i++){
            for(let j = 0; j < Model.myTasks[i].length; j++){
                const task = Model.myTasks[i][j];
                for(let k = 0; k < 7; k++){
                    if(task.schedule === days[k]){
                    
                        const task_div = document.createElement(`div`);
                        task_div.classList.add(`task`);
        
                        const name = document.createElement(`h3`)
                        name.textContent = task.name;
        
                        const note = document.createElement(`p`);
                        note.textContent = task.note;
                        note.classList.add(`description`);
        
                        const sched = document.createElement(`h3`);
                        sched.textContent = task.schedule;
                        sched.classList.add(`schedule`);
        
                        const iconRemove = document.createElement(`i`);
                        iconRemove.setAttribute(`id`,`task${j}`);
        
                        task_div.appendChild(name);
                        task_div.appendChild(note);
                        task_div.appendChild(sched);
                        task_div.appendChild(iconRemove);
        
                        windowDisplay.appendChild(task_div);
        
                        document.getElementById(`task${j}`).addEventListener(`click`, ()=>{
                            Model.removeTaskHome(i, j);
                        })
                    }
                }
            }
        
        }
    }

    return {
        displayPlanList,
        displayAllTask,
        displayPlanTask,
        displaySwitch,
        displayTodayTask,
        displayWeekTask,
    }
    
})();

