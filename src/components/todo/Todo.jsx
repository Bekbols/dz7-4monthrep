

export  function Todo({todo, deleteTodo, updateTodo}) {



    return (
        <div className="todo">
            <span>{todo.title}</span>
            <button onClick={() => deleteTodo(todo.id)}>удалить</button>
            <button onClick={() => updateTodo(todo.id)}>Поменять</button>
        </div>
    )
}