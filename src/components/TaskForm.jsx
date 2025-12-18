import { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "../firebase";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Fácil");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await push(ref(db, "tasks"), {
      title,
      description,
      difficulty,
      completed: false
    });

    setTitle("");
    setDescription("");
    setDifficulty("Fácil");
  };

  return (
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
        <option value="Fácil">Fácil</option>
        <option value="Media">Media</option>
        <option value="Difícil">Difícil</option>
      </select>

      <button type="submit">Crear tarea</button>
    </form>
  );
}

export default TaskForm;
