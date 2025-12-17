import { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function TaskItem({ task, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [difficulty, setDifficulty] = useState(task.difficulty);

  const handleDelete = async () => {
    onDelete(task.id); // UI inmediata
    await deleteDoc(doc(db, "tasks", task.id));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedTask = {
      ...task,
      title,
      description,
      difficulty,
    };

    onUpdate(updatedTask); // UI inmediata
    setIsEditing(false);

    await updateDoc(doc(db, "tasks", task.id), {
      title,
      description,
      difficulty,
    });
  };

  return (
    <div style={{ marginBottom: "15px", borderBottom: "1px solid #444" }}>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option>Fácil</option>
            <option>Media</option>
            <option>Difícil</option>
          </select>
          <button type="submit">Guardar</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancelar
          </button>
        </form>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p><strong>Dificultad:</strong> {task.difficulty}</p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button onClick={handleDelete}>Eliminar</button>
        </>
      )}
    </div>
  );
}

export default TaskItem;
