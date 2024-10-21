const todoCards = document.getElementById('todo-cards');
const inProgressCards = document.getElementById('in-progress-cards');
const doneCards = document.getElementById('done-cards');
const blogCards = document.querySelector('blog-cards');


function renderCards() {
    todoCards.innerHTML = "";
    inProgressCards.innerHTML = "";
    doneCards.innerHTML = "";
    

    let forms = JSON.parse(localStorage.getItem('formSubmissions')) || [];

    for (let i = 0; i < forms.length; i++) {

        const element = forms[i];
        const cardEl = document.createElement('section');
        cardEl.setAttribute('class', 'blog-cards');
        cardEl.setAttribute("taskId", element.id)
        const titleEl = document.createElement('p');
        const dateEl = document.createElement('p');
        const descriptionEl = document.createElement('p');
        titleEl.textContent = element.title;
        descriptionEl.textContent = element.description;
        const deleteEl = document.createElement('button')
        deleteEl.textContent = ('Delete');
        deleteEl.addEventListener('click', () => {
            cardEl.remove();
            console.log("hi")
        })
        cardEl.appendChild(titleEl);
        cardEl.appendChild(dateEl);
        cardEl.appendChild(descriptionEl);
        cardEl.appendChild(deleteEl);

        if (element.status == "to-do") {
            todoCards.appendChild(cardEl);
            $(cardEl).addClass("todoCards");
            
            
        } else if (element.status == "in-progress") {
            inProgressCards.appendChild(cardEl);
            
            $(cardEl).addClass("inProgressCards");

        } else {
            // append to the done cards
            doneCards.appendChild(cardEl);
            $(cardEl).addClass("doneCards");
        }

        // console.log(forms);
    }

    $('.blog-cards').draggable({
        opacity: 0.7,
        zIndex: 100,
        
        // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
        helper: function (e) {
            // const newStatus = (e.target.getAttribute("class"));
            // console.log('testing');
            // console.log(newStatus);
            // if (newStatus === newStatus) {
                
            //      console.log('testing123');
            //     $(this).addClass("todoCards");
            //     // $(this).removeClass("bg-danger");
            //     // $(this).removeClass("bg-warning");
            // // } else if (newStatus == "in-progress"){
            // //     $(this).addClass("bg-warning");
            // // } else {
            // //     $(this).removeClass("bg-warning");
            // //     $(this).addClass("bg-danger");
            // }
        
            
            // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
            //received help from tutors on lines 81-86
            const original = $(e.target).hasClass('ui-draggable')
                ? $(e.target)
                : $(e.target).closest('.ui-draggable');
            // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
            return original.clone().css({
                width: original.outerWidth(),
            });
        },
    });
}




function handleDrop(event, ui) {
    console.log("dropping!")

    const targetId = (ui.draggable[0].getAttribute("taskId"));
    const newStatus = (event.target.getAttribute("id"));

    let forms = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    

    const updatedForms = forms.map(form => {
        if (form.id == targetId) {
            return {
                ...form,
                status: newStatus
            };
        } else {
            return form;
        }
    })
    console.log(newStatus);

    localStorage.setItem('formSubmissions', JSON.stringify(updatedForms));

   
    renderCards();

}
    



$('.lane').droppable({
    accept: '.blog-cards',
    drop: handleDrop,
});

renderCards();
