import React, { useState, useEffect } from "react";


const Home = () => {
	const [ inputValue, setInputValue ] = useState("");
	const [ todos, setTodos ] = useState ([]);
	const [ user, setUser ] = useState ("");
	const [ selectedUser, setSelectedUser] = useState ("");
	
	// function saveTodo (event)  {
	// 	if (event.key === 'Enter') {
	// 		let trimmedValue = inputValue.trim();
	// 		if(trimmedValue !== "")
	// 	setTodos(todos.concat(trimmedValue))
	// 	setInputValue('');
	// 	}
	// };

	// function deleteTodo (index) {
	// 	const updatedTodo = todos.filter((_, i) => i !== index);
	// 	setTodos(updatedTodo);
	// };

	function deleteAllTodos () {
		if(todos.length === 0) {
			alert("No tasks to be deleted")
		} else if (todos.length !== 0) {
			if (window.confirm("Are you sure you want to delete all your ToDos from the list?") === true) {
				return setTodos([])
			}
		}
	};

	function createUser () {
        fetch(`https://playground.4geeks.com/todo/users/Closet`, {
			method: "POST"
		})
          .then(response => {
			if (response.status === 201) {
				// console.log(response)
				return response.json();
			} else if (response.status === 400) {
				console.log(response)
				getTodos();
			};
          })
          .then(data => {
				console.log(data);
          })
          .catch(error => {
            	console.error("Error fetching Todo", error);
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
		// let newTodo = { 
		// 	"label": inputValue,
		// 	"is_done": false,
		// };
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

		fetch(`https://playground.4geeks.com/todo/todos/Closet/${todoId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}})
		.then(response => {
			if (!response.ok) {
				throw new Error("Couldn't delete task")
			}
			return response.json();
		})
		.then(data => {
			setTodos(data.todos);
		}
		)
		.catch(error => {
			console.error("Error deleting task:", error);
		});
	};

	// function updateTheData () {};

    useEffect(() => {
		createUser()
    },[])

	return (
		<>
			<p>My ToDos</p>
			<div className="container">
			<h1 className="userName">{}</h1>
				{/* <form id="users">
					<select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
						<option id="userSelection" value="users">Select your user</option> {users?.map((user, index) => (<option key={index} value={user}>{user}</option>))}
					</select>
				</form> */}
				<input type="text" className="form-control border border-0" placeholder="What do you need to do?" onKeyDown={handleEnter} onChange={(e) => setInputValue(e.target.value)} value={inputValue}></input>
				<hr className="inputhr" />
				<ul className="list">
					{todos ? todos.map((task, index) => (
						<li id="task" key={index}>{task.label} {task.label && (<button onClick={() => deleteTodo(index)}><svg xmlns="http:/5/www.w3.org/2000/svg" width="22px" height="22px" className="icon bi bi-trash text-danger float-end" viewBox="0 0 448 512"><path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg></button>)}
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
