import { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "../firebase";


function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Fácil");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await push(ref(db, "tasks"), {
      title,
      description,
      difficulty
    });

    setTitle("");
    setDescription("");
    setDifficulty("Fácil");
    onTaskAdded();
  };

  return (
    <>
      <h2>Nueva Tarea</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option>Fácil</option>
          <option>Media</option>
          <option>Difícil</option>
        </select>

        <button>Crear tarea</button>
      </form>
    </>
  );
}

export default TaskForm;
