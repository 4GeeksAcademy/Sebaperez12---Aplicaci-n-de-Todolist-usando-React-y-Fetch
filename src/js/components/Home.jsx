import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";




//create your first component
const Home = () => {

	const API_URL = "https://playground.4geeks.com/todo";

	let [task, setTask] = useState("")
	let [list, setList] = useState([])



	function sendData(event) {
		event.preventDefault();
		crearTarea();
	}

	useEffect(() => {
		traerLista()

	}, [])


	const crearUsuario = () => {
		fetch(API_URL + "/users/sebastian12", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify([])
		})
			.then(response => response.json())
			.then(data => {
				console.log(data); return { todos: [] };

			})

			.catch((error) => { console.error("Error:", error); });

	}

	const borrarLista = () => {
		fetch(`${API_URL}/users/sebastian12`, {
			method: "DELETE",
		})


			.then((response) => {
				if (!response.ok) throw new Error("Error al borrar usuario");
				crearUsuario(); setList([]); setTask("");


			})

			.catch((error) => console.log(error))

	}



	const traerLista = () => {
		fetch(API_URL + "/users/sebastian12")
			.then((response) => {
				if (response.status === 404) {
					return crearUsuario()
				}
				return response.json()
			})

			.then((data) => setList(data.todos))
			.catch((error) => console.log(error))
	}



	const crearTarea = () => {
		fetch(API_URL + "/todos/sebastian12", {
			method: "POST",
			headers: {

				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"label": task,
				"is_done": false

			})
		})
			.then(response => response.json())
			.then(() => { setTask(""); traerLista(); })
			.catch((error) => console.log(error))
	}


	const deleteTarea = (id) => {
		fetch(`${API_URL}/todos/${id}`, {
			method: "DELETE",
		})
			.then((response) => {
				if (!response.ok) throw new Error("Error al borrar");
				/*setList(prev => prev.filter());*/
			})
			.then(() => traerLista())
			.catch((error) => console.log(error));
	};



	return (

		<div className=" container justify-content-center align-items-center ">
			<h1 style={{ fontSize: "100px", fontWeight: "lighter" }} className=" col-5 container justify-content-center align-items-center  mt-3" >todos</h1>
			<form onSubmit={sendData} className=" col-5 container justify-content-center align-items-center background-white p-4 shadow-lg mt-2 ">
				<label htmlFor="text1">  </label>
				<input type="text" className="form-control border border-0 shadow-none fs-5 fw-light" id="text1" value={task} placeholder="What needs to be done?" onChange={(event) => setTask(event.target.value)} />
				<ul className="list-unstyled">

					{list?.map((item, index) => (

						<div className="border-bottom p-2 mt-2 pb-3 ">
							<li key={index} className="row" id="cruzbox">
								<div className="d-flex flex-row col-10 text-body-secondary fs-5 fw-light"  >
									{item.label}
								</div>
								<div id="cruzOpacity" className="d-flex flex-row-reverse col-2 " role="button" onClick={() => deleteTarea(item.id)} >
									<FontAwesomeIcon className="text-body-danger pt-2 " icon={faXmark} style={{ color: "red" }} />
								</div>

							</li>
						</div>

					))}


				</ul>
				<p> {list.length} items left</p>
				<button type="button" className="btn btn-info" onClick={borrarLista} >Borrar Usuario</button>

			</form >

			<div className="paper col-5 container justify-content-center  "></div>


		</div >




	);
};


export default Home;