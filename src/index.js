import _ from 'lodash';
import './style.css';


const View = (() => {

    const displayPlanList = () =>{
        const planPane = document.querySelector(`.plan-list`);

        //reset fields
        planPane.innerHTML = "";

        for(let i = 0; i < Model.myPlans.length; i++){
            const plan = Model.myPlans[i];
            
            const btnPlan = document.createElement(`button`);
            btnPlan.classList.add(`plan-utility`);

            const iconPlan = document.createElement(`i`);
            iconPlan.classList.add(`fa-solid`);
            iconPlan.classList.add(`fa-list`);

            const text = document.createTextNode(plan.title);

            const iconRemove = document.createElement(`i`);
            iconRemove.classList.add(`remove-plan`);
            iconRemove.classList.add(`fa-solid`);
            iconRemove.classList.add(`fa-xmark`);
            iconRemove.setAttribute(`id`,`plan${i}`);

            btnPlan.appendChild(iconPlan);
            btnPlan.appendChild(text);
            btnPlan.appendChild(iconRemove);

            planPane.appendChild(btnPlan);

            document.getElementById(`plan${i}`).addEventListener(`click`,()=>{
                Model.removePlan(i);
            });
        }
    }

    const displayTaskList = () => {
        const windowDisplay = document.querySelector(`.display`);

        //reset fields
        windowDisplay.innerHTML = ``;

        for(let i=0; i < Model.myTasks.length; i++){
            const task = Model.myTasks[i];

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
            iconRemove.setAttribute(`id`,`task${i}`);

            task_div.appendChild(name);
            task_div.appendChild(note);
            task_div.appendChild(sched);
            task_div.appendChild(iconRemove);

            windowDisplay.appendChild(task_div);

            document.getElementById(`task${i}`).addEventListener(`click`, ()=>{
                Model.removeTask(i);
            })
        }

    }
    
    const clearDisplay = (title) => {
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
    
        

        if(title === `Home`){
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
        else{
            mainDisplay.insertBefore(displayTitle, mainDisplay.firstChild);
            document.querySelector(`.display`).innerHTML = ``;
        }
            
    }

    return {
        displayPlanList,
        displayTaskList,
        clearDisplay,
    }
    
})();

const Model = (() => {

    let myPlans = [];
    let myTasks = [];

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
        View.displayPlanList();
    }

    const addTask = () =>{
        const taskName = document.getElementById(`task-input`).value;
        const taskNote = document.getElementById(`task-note`).value;
        const taskSched = document.getElementById(`task-sched`).value;

        let task = new __Task(taskName, taskNote, taskSched);

        myTasks.push(task);

        //Reset input fields
        document.getElementById(`task-input`).value = ``;
        document.getElementById(`task-note`).value = ``;
        document.getElementById(`task-sched`).value = ``;
    }

    const removeTask = (task) =>{
        myTasks.splice(task,1);
        View.displayTaskList();
    }

    return {
        myPlans,
        addPlan,
        removePlan,
        myTasks,
        addTask,
        removeTask,
    }
 
})();

//EVENT LISTENERS (click) FOR CONFIRM BUTTONS
document.querySelector(`.confirm-plan`).addEventListener(`click`, (event)=>{
    event.preventDefault();

    const form = document.querySelector(`.plan-form`);
    const userInput = document.getElementById(`plan-input`).value;

    if (form.reportValidity()) {
        if(userInput){
            Model.addPlan();
            View.displayPlanList();
        }
    }
});

document.querySelector(`.confirm-task`).addEventListener(`click`, (event) => {
    event.preventDefault();
    const form = document.querySelector(`.task-form`);

    const inputName = document.getElementById(`task-input`).value;
    const inputNote = document.getElementById(`task-note`).value;
    const inputSched = document.getElementById(`task-sched`).value;

    if(form.reportValidity()){
        if(inputName && inputNote && inputSched){
            Model.addTask();
            View.displayTaskList();
            document.querySelector(`.task-modal`).close();
        }
    }
});

//EVENT LISTENERS (click) FOR CHANGING DISPLAY
document.querySelector(`.home`).addEventListener(`click`, ()=>{
    View.clearDisplay(`Home`);
    View.displayTaskList();
});
document.querySelector(`.today`).addEventListener(`click`, ()=>{
    View.clearDisplay(`Today`);
    
   
});
document.querySelector(`.week`).addEventListener(`click`, ()=>{
    View.clearDisplay(`This Week`);
    
});
//SHOW AND CLOSE MODALS
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

