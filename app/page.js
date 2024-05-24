"use client";
import { useState, useEffect } from "react";

const page = () => {
	let [title, settitle] = useState("");
	let [desc, setdesc] = useState("");
	let [mainTasks, setMainTasks] = useState([]);
	let [completeTasks, setCompleteTasks] = useState([]);
	let renderTask = <h1 className="text-xl">No tasks pending...</h1>;
	let completeTask = <h1 className="text-xl">No tasks completed...</h1>;

	// Load tasks from local storage on mount
	useEffect(() => {
		const savedMainTasks =
			JSON.parse(localStorage.getItem("mainTasks")) || [];
		const savedCompleteTasks =
			JSON.parse(localStorage.getItem("completeTasks")) || [];
		setMainTasks(savedMainTasks);
		setCompleteTasks(savedCompleteTasks);
		console.log(
			"Loaded tasks from local storage:",
			savedMainTasks,
			savedCompleteTasks
		);
	}, []);

	const deleteHandeler = (i) => {
		let copy = [...mainTasks];
		copy.splice(i, 1);
		localStorage.setItem("mainTasks", JSON.stringify(copy));
		setMainTasks(copy);
	};

	const deleteCHandeler = (i) => {
		let copy = [...completeTasks];
		copy.splice(i, 1);
		localStorage.setItem("completeTasks", JSON.stringify(copy));
		setCompleteTasks(copy);
	};

	const completeHandeler = (i) => {
		let copy = [...mainTasks];
		let spliced = copy.splice(i, 1);
		localStorage.setItem("mainTasks", JSON.stringify(copy));
		localStorage.setItem("completeTasks", JSON.stringify([...completeTasks, ...spliced]));
		setMainTasks(copy);
		setCompleteTasks([...completeTasks, ...spliced]);

	};

	if (mainTasks.length > 0) {
		renderTask = mainTasks.map((task, i) => {
			return (
				<li key={i} className="flex justify-between items-center mb-2">
					<div className="flex justify-between mb-1 px-10 w-2/3 text-wrap">
						<h1 className="text-lg font-bold text-wrap">{task.title}</h1>
						<h3 className="text-gray-700 text-wrap">{task.desc}</h3>
					</div>
					<button
						className="rounded bg-green-500 text-green-100 font-bold py-1 px-2"
						onClick={() => {
							completeHandeler(i);
						}}
					>
						Complete
					</button>
					<button
						className="rounded bg-red-500 text-red-100 font-bold py-1 px-2"
						onClick={() => {
							deleteHandeler(i);
						}}
					>
						Delete
					</button>
				</li>
			);
		});
	}
	if (completeTasks.length > 0) {
		completeTask = completeTasks.map((task, i) => {
			return (
				<li key={i} className="flex justify-evenly items-center mb-2">
					<div className="flex justify-between mb-1 px-10 w-2/3 text-wrap">
						<h1 className="text-lg font-bold w-1/2 text-wrap">
							{task.title}
						</h1>
						<h3 className="text-gray-700 w-1/2 text-wrap">{task.desc}</h3>
					</div>
					<button
						className="rounded bg-red-500 text-red-100 font-bold py-1 px-2"
						onClick={() => {
							deleteCHandeler(i);
						}}
					>
						Delete
					</button>
				</li>
			);
		});
	}

	const submitHandeler = (e) => {
		e.preventDefault();
		setMainTasks([...mainTasks, { title, desc }]);
		localStorage.setItem("mainTasks", JSON.stringify(mainTasks));
		
		settitle("");
		setdesc("");
	};

	return (
		<>
			<h1 className="bg-gray-900 text-4xl text-center py-4 text-gray-50 font-extrabold mb-2">
				My TODO List
			</h1>

			<form className="text-center" onSubmit={submitHandeler}>
				<input
					type="text"
					required
					className="px-3 py-2 border-2 rounded m-2"
					placeholder="Enter Task Here..."
					value={title}
					onChange={(e) => {
						settitle(e.target.value);
					}}
				/>
				<input
					type="text"
					className="px-3 py-2 border-2 rounded m-2"
					placeholder="Enter Description Here..."
					value={desc}
					onChange={(e) => {
						setdesc(e.target.value);
					}}
				/>
				<button className="px-4 py-2 bg-slate-950 text-fuchsia-100 text-bold font-serif rounded-md text-xl">
					Set Task
				</button>
			</form>

			<div className="px-6 py-3 my-6 bg-slate-200">
				<h1 className="pl-3 font-extrabold text-zinc-900 text-2xl mb-3">
					Pending Tasks
				</h1>
				<ol>{renderTask}</ol>

				<hr className="border-slate-950 my-4" />

				<h1 className="pl-3 font-extrabold text-zinc-900 text-2xl mb-3">
					Completed Tasks
				</h1>
				<ol>{completeTask}</ol>
			</div>
		</>
	);
};

export default page;
