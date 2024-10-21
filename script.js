const modal = document.getElementById('theModal');
const openModal = document.getElementById('taskButton');
const closeModal = document.getElementById('closeButton');

let taskId = 0;

openModal.addEventListener("click", () => {
    modal.showModal();
    taskId++;
    console.log(`Unique id: ${taskId}`)
});

closeModal.addEventListener("click", () => {
    modal.close();
});



const submitForm = (event) => {
    let forms = JSON.parse(localStorage.getItem('formSubmissions')) || [];

    event.preventDefault();
    
    const form = {
        id: generateTaskId(),
        title: document.getElementById('taskTitle').value,
        date: document.getElementById('taskDate').value,
        description: document.getElementById('taskDescription').value,
        status: "to-do"
    }
    forms.push(form);
    // console.log(forms);

    localStorage.setItem('formSubmissions', JSON.stringify(forms));

    renderCards()
}


document.getElementById('closeButton').addEventListener("click", submitForm)

// // Todo: create a function to generate a unique task id
//received help on lines 44-49 from tutors
function generateTaskId() {
    const prefix = "taskId"
    const sec = Date.now() * 1000 + Math.random() * 1000;
    const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
    return `${prefix}${id}${`.${Math.trunc(Math.random() * 100000000)}`}`;
}


// // Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    event.preventDefault();

}

