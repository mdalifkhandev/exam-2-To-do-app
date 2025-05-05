let taskName = document.getElementById('name')
let taskDetails = document.getElementById('details')
let addBtn = document.getElementById('addbtn')
let updateBtn = document.getElementById('updatebtn')
let taskArray = []
let activeIndex;
let nameWarning= document.getElementById('warName')
let detailsWarning= document.getElementById('warDetails')
let clearAllBtn = document.getElementById('clearbtn')

// Delete task function
const deleteTask = (indes) => {
    taskArray.splice(indes, 1)
    displayData()
}

// Update task function
const editTask = (index) => {
    let task = taskArray[index]
    taskName.value = task.name
    taskDetails.value = task.details
    updateBtn.classList.remove('d-none')
    addBtn.classList.add('d-none')
    activeIndex = index
}



// Update task function
updateBtn.addEventListener('click', () => {

    if (taskName.value == '') {
        nameWarning.innerText = 'Please fill the name field !!!!'
        return
    }
    if (taskDetails.value == '') {
        detailsWarning.innerText = 'Please fill the name field !!!!'
        return
    }

    if(taskDetails.value && taskName.value){
        nameWarning.innerText = ''
        detailsWarning.innerText = ''

        taskArray[activeIndex].name = taskName.value
        taskArray[activeIndex].details = taskDetails.value
        taskName.value = ''
        taskDetails.value = ''
        displayData()
        updateBtn.classList.add('d-none')
        addBtn.classList.remove('d-none')
    }


})



// Complit task function

const complitTask = (index) => {
    taskArray[index].status = 'complit'
    displayData()
    console.log(taskArray);

}


// Display data funtion
const displayData = () => {
    let taskList = document.getElementById('tasklist')
    taskList.innerHTML = taskArray.map((task, index) => {

        if (task.status == 'complit') {

            return `
        
                
                 <div class="card col-1 bg-success mt-5" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">details</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <button class="btn btn-danger" onclick="deleteTask(${index})"> Delete </button>
                        <p class="text-center text-success bg-dark">Complited !</p>
                    </div>
                </div>
            </div>
            
            `

        }


        return `
    
        <div class="card col-1 mt-5" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${task.name}</h5>
                    <p class="card-text">${task.details}</p>
                    <div>
                        <button class="btn btn-info" onclick="editTask(${index})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteTask(${index})"> Delete </button>
                        <button class="btn btn-primary" onclick="complitTask(${index})"> Complit </button>
                    </div>
                </div>
            </div>

    `
    })
}

//add task function
addBtn.addEventListener('click', () => {


    if (taskName.value == '') {
        nameWarning.innerText = 'Please fill the name field !!!!'
        return
    }
    if (taskDetails.value == '') {
        detailsWarning.innerText = 'Please fill the name field !!!!'
        return
    }

    if(taskDetails.value && taskName.value){
        detailsWarning.innerText = ''
        nameWarning.innerText = ''

        let task = {
            name: taskName.value,
            details: taskDetails.value
        }
        taskArray.push(task)
        taskName.value = ''
        taskDetails.value = ''
        displayData()
    }

   if(taskArray.length > 2){
        clearAllBtn.classList.remove('d-none')
    }

})


// Clear all task function

clearAllBtn.addEventListener('click', () => {
    const confirmClear = confirm("Are you sure you want to clear all tasks? This action cannot be undone.");
    if(confirmClear){
        taskArray.splice(0,taskArray.length)
        
    }
    
})
