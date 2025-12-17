import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import TaskItem from "./TaskItem";

function TaskList({ refresh }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    const tasksArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTasks(tasksArray);
  };

  useEffect(() => {
    getTasks();
  }, [refresh]);

  return (
    <div>
      <h2>Lista de tareas</h2>
     {tasks.map((task) => (
  <TaskItem
    key={task.id}
    task={task}
    onTaskUpdated={getTasks}
  />
))}

    </div>
  );
}

export default TaskList;


