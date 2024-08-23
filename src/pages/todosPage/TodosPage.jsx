import {useEffect, useState} from "react";
import {Todo} from "../../components/todo/Todo";



function TodosPage() {
    const [todos, setTodos] = useState([]);
    const [value, setValue] = useState("");


    async function getTodos() {
        const response = await fetch("http://localhost:8000/todos");
        const data = await response.json();
        setTodos(data)
    }

    async function createTodo() {
        const obj = {
            status: false,
            title: value
        }
        const response = await fetch("http://localhost:8000/todos", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })

        if(response.status === 201) {
            getTodos()
            setValue("")
        }
    }

    async function deleteTodo(id) {
        const response = await fetch(`http://localhost:8000/todos/${id}`, {
            method: 'DELETE',
        })
        if(response.status === 200) {
            getTodos()
        }
    }

    function changeInput(event) {
        setValue(event.target.value)
    }

    async function updateTodo (id, todo) {
        const newTitle = {
            title:value
        }
        const response = await fetch(`http://localhost:8000/todos/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTitle)
        })
        if(response.status === 200){
            getTodos()
        }
    }


    useEffect(() => {
        getTodos()
    }, []);

    return (
        <>
            <h2>Todo List</h2>
            <input
                type="text"
                placeholder="добавьте задачу"
                onInput={changeInput}
                value={value}
            />

            <button onClick={createTodo}>создать</button>
            {
                todos.map(elem => <Todo key={elem.id} todo={elem} deleteTodo={deleteTodo} updateTodo={updateTodo}/>)
            }
        </>
    );
}

export default TodosPage;