import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import TaskItem from "./TaskItem";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const tasksRef = ref(db, "tasks");

    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const tasksArray = Object.entries(data).map(([id, value]) => ({
          id,
          ...value
        }));
        setTasks(tasksArray);
      } else {
        setTasks([]);
      }
    });
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const getProgressMessage = () => {
    if (progress === 0) return "¡Empecemos! Añade tu primera tarea 🚀";
    if (progress < 50) return "Vas bien, sigue así 💪";
    if (progress < 100) return `¡Buen trabajo! Ya llevas ${progress}%`;
    return "🏆 ¡Todas las tareas completadas!";
  };

  return (
    <div>
      <h2>Lista de tareas</h2>

      <div className="task-counter">
        <span>Total: {totalTasks}</span>
        <span>Completadas: {completedTasks}</span>
        <span>{progress}% completado</span>
      </div>

      <div className="global-progress-bar">
        <div
          className="global-progress"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/*  MENSAJE INTELIGENTE */}
      <p className="progress-message">
        {getProgressMessage()}
      </p>

      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
