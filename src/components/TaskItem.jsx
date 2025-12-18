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
      difficulty,
    });
    setEditing(false);
  };

  const toggleCompleted = async () => {
    await update(ref(db, `tasks/${task.id}`), {
      completed: !task.completed,
    });
  };

  if (editing) {
    return (
      <div className="task-item" data-difficulty={difficulty}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea
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

        <div className="task-actions">
          <button onClick={handleUpdate}>Guardar</button>
          <button className="danger" onClick={() => setEditing(false)}>
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`task-item ${task.completed ? "completed" : ""}`}
      data-difficulty={task.difficulty}
    >
      <label className="task-check">
        <input
          type="checkbox"
          checked={!!task.completed}
          onChange={toggleCompleted}
        />
        <span className="checkmark"></span>
      </label>

      <div className="task-content">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <small>Dificultad: {task.difficulty}</small>

        <div className="task-actions">
          <button onClick={() => setEditing(true)}>Editar</button>
          <button className="danger" onClick={handleDelete}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
