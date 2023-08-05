import _ from 'lodash';
import './style.css';
import iconLogo from '../src/assets/images/logo.png';

window.addEventListener('load', function() {
    const icon = document.querySelector(`.logo`);
    icon.setAttribute(`src`,`${iconLogo}`);
    View.displayPlanList();
    View.displayAllTask();
});

const View = (() => {

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

const Model = (() => {
    
    let myPlans;
    let myTasks;

    if (`myPlans` in localStorage){
        const storedPlansJSON = localStorage.getItem('myPlans');
        const storedPlans = JSON.parse(storedPlansJSON);
        myPlans = storedPlans;
    }
    else{
        myPlans = [];
    }

    if (`myTasks` in localStorage){
        const storedTasksJSON = localStorage.getItem('myTasks');
        const storedTasks = JSON.parse(storedTasksJSON);
        myTasks = storedTasks;
    }
    else{
        myTasks = [];
    }

    

    function __Plan(title){
            this.title = title;
        };

    function __Task(name,note,schedule){
            this.name = name;
            this.note = note;
            this.schedule = schedule;
    }

    const addPlan = () =>{
        const planInput = document.getElementById(`plan-input`).value;
        let plan = new __Plan(planInput);
        myPlans.push(plan);

        //Reset input field
        document.getElementById(`plan-input`).value = ``;
    }

    const removePlan = (plan) => {
        myPlans.splice(plan, 1);
        myTasks.splice(plan+1,1);
        View.displayPlanList();
        saveTask();
        savePlan();
    }

    const addTaskHome = () =>{
        const taskName = document.getElementById(`task-input`).value;
        const taskNote = document.getElementById(`task-note`).value;
        const taskSched = document.getElementById(`task-sched`).value;

        let task = new __Task(taskName, taskNote, taskSched);

        if (!Array.isArray(myTasks[0])) {
            myTasks[0] = [];
        }

        myTasks[0].push(task);

        //Reset input fields
        document.getElementById(`task-input`).value = ``;
        document.getElementById(`task-note`).value = ``;
        document.getElementById(`task-sched`).value = ``;
    }

    const addTaskPlan = (plan) => {
        const taskName = document.getElementById(`task-input`).value;
        const taskNote = document.getElementById(`task-note`).value;
        const taskSched = document.getElementById(`task-sched`).value;

        let task = new __Task(taskName, taskNote, taskSched);

        if(!Array.isArray(myTasks[plan])){
            myTasks[plan] = [];
        }

        myTasks[plan].push(task);

        document.getElementById(`task-input`).value = ``;
        document.getElementById(`task-note`).value = ``;
        document.getElementById(`task-sched`).value = ``;
    }

    const removeTaskHome = (index, task) =>{
        myTasks[index].splice(task, 1);
        saveTask();
        View.displayAllTask();

    }

    const removeTaskPlan = (index, task) => {
        myTasks[index].splice(task,1);
        saveTask();
        View.displayPlanTask(index);
    }

    const savePlan = () => {
        const jsonString = JSON.stringify(myPlans);
        localStorage.setItem('myPlans', jsonString);
    }

    const saveTask = () => {
        const jsonString = JSON.stringify(myTasks);
        localStorage.setItem('myTasks', jsonString);
    }

    return {
        myPlans,
        myTasks,
        addPlan,
        addTaskHome,
        addTaskPlan,
        removePlan,
        removeTaskHome,
        removeTaskPlan,
        savePlan,
        saveTask,
    }
 
})();


const Controller = (() => {

    //handle clicks for confirm buttons
    document.querySelector(`.confirm-plan`).addEventListener(`click`, ()=>{
        

        const form = document.querySelector(`.plan-form`);
        const userInput = document.getElementById(`plan-input`).value;

        if (form.reportValidity()) {
            if(userInput){
                Model.addPlan();
                Model.savePlan();
                View.displayPlanList();
                document.querySelector(`.plan-modal`).close();
            }
        }
    });
    document.querySelector(`.confirm-task`).addEventListener(`click`, () => {
        
        const form = document.querySelector(`.task-form`);

        const inputName = document.getElementById(`task-input`).value;
        const inputSched = document.getElementById(`task-sched`).value;
        const displayTitle = document.querySelector(`.display-title`).textContent;
        if(displayTitle === `Home`){
            if(form.reportValidity()){
                if(inputName && inputSched){
                    Model.addTaskHome();
                    Model.saveTask();
                    View.displayAllTask();
                    document.querySelector(`.task-modal`).close();
                }
            }
        }
       
    });

    //handle clicks for changing display
    document.querySelector(`.home`).addEventListener(`click`, ()=>{
        View.displaySwitch(`Home`);
        View.displayAllTask();
        console.log(Model.myTasks);
    });
    document.querySelector(`.today`).addEventListener(`click`, ()=>{
        View.displaySwitch(`Today`);
        View.displayTodayTask();
    });
    document.querySelector(`.week`).addEventListener(`click`, ()=>{
        View.displaySwitch(`This Week`);
        View.displayWeekTask();
    });

    //handle clicks for modals
    document.querySelector(`.add-plan`).addEventListener(`click`,()=>{
        document.querySelector(`.plan-modal`).show();
    })

    document.querySelector(`.cancel-plan`).addEventListener(`click`, ()=>{
        document.querySelector(`.plan-modal`).close();
        
    })           

    document.querySelector(`.add-task`).addEventListener(`click`,()=>{
        document.querySelector(`.task-modal`).showModal();
    })

    document.querySelector(`.cancel-task`).addEventListener(`click`, ()=>{
        document.querySelector(`.task-modal`).close();
    })        

})();