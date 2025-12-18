import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import TaskItem from "./TaskItem";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("Todas");

  useEffect(() => {
    const tasksRef = ref(db, "tasks");

    const unsubscribe = onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const tasksArray = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setTasks(tasksArray);
      } else {
        setTasks([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const filteredTasks =
    filter === "Todas"
      ? tasks
      : tasks.filter((task) => task.difficulty === filter);

  const completed = tasks.filter((t) => t.completed).length;
  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  return (
    <div>
      {/* CONTADOR */}
      <div className="task-counter">
        <span>Total: {tasks.length}</span>
        <span>Completadas: {completed}</span>
        <span>{progress}% completado</span>
      </div>

      {/* BARRA DE PROGRESO */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* FILTRO */}
      <select
        className="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="Todas">Todas</option>
        <option value="Fácil">Fácil</option>
        <option value="Media">Media</option>
        <option value="Difícil">Difícil</option>
      </select>

      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
