import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import TaskItem from "./TaskItem";

function TaskList() {
  const [tasks, setTasks] = useState([]);

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

  return (
    <div>
      <h2>Lista de tareas</h2>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
