import { useState } from "react";
import { ref, remove, update } from "firebase/database";
import { db } from "../firebase";

function TaskItem({ task }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [difficulty, setDifficulty] = useState(task.difficulty);

  const getDifficultyClass = (difficulty) => {
    if (difficulty === "Fácil") return "easy";
    if (difficulty === "Media") return "medium";
    if (difficulty === "Difícil") return "hard";
    return "";
  };

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
    <div
      className={`task-item ${getDifficultyClass(task.difficulty)} ${
        task.completed ? "completed" : ""
      }`}
    >
      {editing ? (
        <div className="task-content">
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option>Fácil</option>
            <option>Media</option>
            <option>Difícil</option>
          </select>

          <div className="task-actions">
            <button onClick={handleUpdate}>Guardar</button>
            <button className="danger" onClick={() => setEditing(false)}>
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <>
          <label className="task-check">
            <input
              type="checkbox"
              checked={task.completed ?? false}
              onChange={toggleCompleted}
            />
            <span className="checkmark"></span>
          </label>

          <div className="task-content">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <strong>Dificultad: {task.difficulty}</strong>

            <div className="task-actions">
              <button onClick={() => setEditing(true)}>Editar</button>
              <button className="danger" onClick={handleDelete}>
                Eliminar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;
