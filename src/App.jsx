import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h1>Gestor de Tareas</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;
