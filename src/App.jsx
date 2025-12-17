import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gestor de Tareas</h1>

      <TaskForm onTaskAdded={() => setRefresh(!refresh)} />

      <TaskList refresh={refresh} />
    </div>
  );
}

export default App;
