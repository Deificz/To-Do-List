import { View } from './View.js';


export const Model = (() => {
    
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