import { useState } from "react";
import { ref, remove, update } from "firebase/database";
import { db } from "../firebase";

function TaskItem({ task }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [difficulty, setDifficulty] = useState(task.difficulty || "Fácil");

  const handleDelete = async () => {
    await remove(ref(db, `tasks/${task.id}`));
  };

  const handleUpdate = async () => {
    await update(ref(db, `tasks/${task.id}`), {
      title,
      description,
      difficulty
    });
    setEditing(false);
  };

  const toggleCompleted = async () => {
    await update(ref(db, `tasks/${task.id}`), {
      completed: !task.completed
    });
  };

  return (
    <div style={{ border: "1px solid #555", padding: "1rem", marginBottom: "1rem" }}>
      {editing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="Fácil">Fácil</option>
            <option value="Media">Media</option>
            <option value="Difícil">Difícil</option>
          </select>
          <button onClick={handleUpdate}>Guardar</button>
          <button onClick={() => setEditing(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={!!task.completed}
            onChange={toggleCompleted}
          />
          <h3 style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            {task.title}
          </h3>
          <p>{task.description}</p>
          <strong>Dificultad: {task.difficulty}</strong>
          <br />
          <button onClick={() => setEditing(true)}>Editar</button>
          <button onClick={handleDelete}>Eliminar</button>
        </>
      )}
    </div>
  );
}

export default TaskItem;
