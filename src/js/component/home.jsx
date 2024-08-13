import React, { useState } from "react";


// input which info gets "stored" in variable as toDo
// press enter to add the toDo
// delete function when clicked button
// add the delete button to the toDo task
// count items
const countItems = () => {}




const Home = () => {
	const [ inputValue, setInputValue ] = useState("");
	const [ todos, setTodos ] = useState ([""]);
	
	const todoInList = () => {
		return todos.map((task, index) => (
			<li id="task" key={index}> {task} 
					<svg xmlns="http://www.w3.org/2000/svg" type="button" onClick={() => deleteTodo(index)} width="20" height="20" fill="currentColor" className="icon bi bi-trash text-danger float-end" viewBox="0 0 16 16">
						<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
						<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
					</svg>
				{index < todos.length - 1 && <hr />}
			</li>))
	};
	
	const saveTodo = (event) => {
		if (event.key === 'Enter') {
		setTodos(todos.concat(inputValue))
		setInputValue('');
		}
	};

	const deleteTodo = (index) => {
		const updatedTodo = todos.filter((_, i) => i !== index);
		setTodos(updatedTodo);
	};

	return (
		<>
			<h1>My ToDos</h1>
			<div className="container">
				<ul className="list">
					<input type="text" placeholder="What do you need to do?" onKeyDown={saveTodo} onChange={(e) => setInputValue(e.target.value)} value={inputValue}></input>
					<li>{() => todoInList}</li>
					
					{/* {todos.map((task, index) => (
						<li id="task" key={index}> {task} 
								<svg xmlns="http://www.w3.org/2000/svg" type="button" onClick={() => deleteTodo(index)} width="20" height="20" fill="currentColor" className="icon bi bi-trash text-danger float-end" viewBox="0 0 16 16">
									<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
									<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
								</svg>
							{index < todos.length - 1 && <hr />}
					</li>))}	 */}
				</ul>
				<div className="tasksleft text-secondary">1 task left</div>
			</div>
		</>
	);
};

export default Home;
