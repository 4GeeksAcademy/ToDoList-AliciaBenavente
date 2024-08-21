import React, { useState, useEffect } from "react";


const Home = () => {
	const [ inputValue, setInputValue ] = useState("");
	const [ todos, setTodos ] = useState ([]);	


	function deleteAllTodos () {
		if(todos.length === 0) {
			alert("No tasks to be deleted")
		} else if (todos.length !== 0) {
			if (window.confirm("Are you sure you want to delete all your ToDos from the list?") === true) {
				return setTodos([])
			}
		}
	};

	function checkUsers () {
		fetch(`https://playground.4geeks.com/todo/users`, {
			method: "GET"
		})
          .then(response => {
				return response.json();
          })
          .then(data => {
			let totalUsers = data.users;
			let userExist = totalUsers.find((user) => user.name === "Closet");
			if (!userExist) {createUser();}
			else {
				getTodos();
				localStorage.setItem("name", userExist.name)
			}
          })
          .catch(error => {
            	console.error("User exist", error);
          });
	}

	function createUser () {
        fetch(`https://playground.4geeks.com/todo/users/${localStorage.getItem("name")}`, {
			method: "POST"
		})
          .then(response => {
				return response.json();
          })
          .then(data => {
				console.log(data);
          })
          .catch(error => {
            	console.error("User exist", error);
          });
    }


	function getTodos () {
        fetch(`https://playground.4geeks.com/todo/users/Closet`, {
			method: "GET"
		})
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error ("Couldn't fetch the Todo");
			};
			})
		.then(data => {
				setTodos(data.todos);
				console.log(todos);
				console.log(data)
			})
		.catch(error => {
				console.error("Error fetching Todo", error);
			});
    }

	function addTodo () {
		console.log(typeof inputValue)
		fetch(`https://playground.4geeks.com/todo/todos/Closet`, {
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ 
				label: inputValue,
				is_done: false,
			}),
			method: "POST"})
		.then(response => {
			if (response.status === 201) {
				getTodos()
				return response.json();
			}
			throw new Error("Couldn't add task")
		})
		.then(data => {
			console.log(data)
			setInputValue("");
		}
		)
		.catch(error => {
			console.error("Error adding task:", error);
		});
	}

	function handleEnter (event)  {
		if (event.key === 'Enter') {
			let trimmedValue = inputValue.trim();
			if(trimmedValue !== "")
				addTodo()
		}
	};


	function deleteTodo (todoId) {

		fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}})
		.then(response => {
			console.log(todoId)
			if (response.ok) {
				getTodos()
				return response;
			}
			throw new Error("Couldn't delete task")
		})
		.then(data => {
			console.log(data)
			// setTodos(data.todos);
		}
		)
		.catch(error => {
			console.error("Error deleting task:", error);
		});
	};

	// function updateTheData () {};

    useEffect(() => {
		checkUsers()
    },[])

	return (
		<>
			<p>My ToDos</p>
			<div className="container">
				<input type="text" className="form-control border border-0" placeholder="What do you need to do?" onKeyDown={handleEnter} onChange={(e) => setInputValue(e.target.value)} value={inputValue}></input>
				<hr className="inputhr" />
				<ul className="list">
					{todos ? todos.map((task, index) => (
						<li id="task" key={index}>{task.label} {task.label && (<button className="border border-0 bg-white float-end pe-4" onClick={() => deleteTodo(task.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon bi bi-trash text-danger mt-1" viewBox="0 0 15 15">
						<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
						<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
					  </svg></button>)}
					{index < todos.length - 1 && <hr className="lihr"/>}</li>
				)): "no todos"}
				</ul>
				<div className="tasksleft pb-2">{todos.length > 0 ? `${todos.length} task${todos.length > 1 ? 's' : ''} left` : 'No tasks, add a task'}</div>
			</div>
			<button className="deleteAllToDos" onClick={() => deleteAllTodos()}>Delete ToDos</button>
		</>
	);
};

export default Home;
