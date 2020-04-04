'use strict'

// delete the dummy data +
// read and parse when the app starts up +
// stringify and write data when added



const todos = getSavedTodos()

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters)

document.querySelector("#filter-todos").addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector("#newTodoForm").addEventListener('submit', (e) => {
    e.preventDefault()
    const textValue = e.target.elements.newTodoText.value.trim()
    if (textValue.length > 0) {
        todos.push({
            id: uuidv4(),
            text: textValue,
            completed: false
        })
        saveTodos(todos)
        renderTodos(todos, filters)
        e.target.elements.newTodoText.value = ''
    }
})

document.querySelector("#hideCompleted").addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters) 
})



//getSavedTodos +


//Save Todos to localStorage +

//Render app todos based on filters +

//Get the DOM elements for an individual todo +

//Get the DOM elements for list summary 
