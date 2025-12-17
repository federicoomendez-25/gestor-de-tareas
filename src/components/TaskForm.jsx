import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Fácil");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Completa todos los campos");
      return;
    }

    try {
      await addDoc(collection(db, "tasks"), {
        title,
        description,
        difficulty,
        createdAt: new Date()
      });

      setTitle("");
      setDescription("");
      setDifficulty("Fácil");

      onTaskAdded();
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Nueva Tarea</h2>

      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="Fácil">Fácil</option>
        <option value="Media">Media</option>
        <option value="Difícil">Difícil</option>
      </select>

      <button type="submit">Crear tarea</button>
    </form>
  );
}

export default TaskForm;
