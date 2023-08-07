import { Model } from './Model';
import { View } from './View.js';

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