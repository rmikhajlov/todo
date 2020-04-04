'use strict'

//get saved todos
const getSavedTodos = () => {
    const JSONtodos = localStorage.getItem('todos')

    try {
        return JSONtodos ? JSON.parse(JSONtodos) : []
    } catch (e) {
        return []
    }

    
}

//save todos to localstorage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

//render todos
const renderTodos = (todos, filters) => {
    const todoEl = document.querySelector("#todos")
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    todoEl.innerHTML = ''
    todoEl.appendChild(generateSummaryTodo(incompleteTodos))

    if (filteredTodos.length > 0) {
        filteredTodos.forEach(element =>{
            todoEl.appendChild(generateTodoDOM(element))
        })
    } else {
        const noTodosMessage = document.createElement('p')
        noTodosMessage.textContent = 'No to-dos to show'
        noTodosMessage.classList.add('empty-message')
        todoEl.appendChild(noTodosMessage)
    }
}

//remove Todo
const removeTodo = function (id){
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex > -1){
        todos.splice(todoIndex, 1)
    }
}



//generate DOM for todo
const generateTodoDOM = (todo) => {

    const todoEl = document.createElement('label')
    const containerEL = document.createElement('div')
    const todoParagraph = document.createElement('span')
    const removeTodoButton = document.createElement('button')

    removeTodoButton.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    const todoCheckbox = document.createElement('input')
    todoCheckbox.addEventListener('change', () => {
        updateTodoStatus(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)   
    })

    //setup is completed checkbox
    todoCheckbox.setAttribute('type', 'checkbox')
    todoCheckbox.checked = todo.completed   
    containerEL.appendChild(todoCheckbox)

    

    //setup todo paragraph
    let todoCompleted = ""
    todoParagraph.textContent = todo.text + ' '
    containerEL.appendChild(todoParagraph)

    //Setup container
    todoEl.classList.add('list-item')
    containerEL.classList.add('list-item__container')
    todoEl.appendChild(containerEL)

    //setup remove todo button
    removeTodoButton.textContent = 'remove'
    removeTodoButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeTodoButton) 

    return todoEl
}

const updateTodoStatus = function (id) {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex > -1){
        todos[todoIndex].completed = !todos[todoIndex].completed
    }
}


//generate summary todo
const generateSummaryTodo = (filteredTodos) => {
    const summaryEl = document.createElement('h2')
    const plural = filteredTodos.length === 1 ? '' : 's'
    summaryEl.textContent = `You have ${filteredTodos.length} thing${plural} to do left.` 
    summaryEl.classList.add('list-title')
    return summaryEl
}