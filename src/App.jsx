import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProject from "./components/NoProject";
import Sidebar from "./components/Sidebar";
import SelectedProject from "./components/SelectedProject";
function App() {
  const [projects, setProjects] = useState({
    selectedProjID: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setProjects((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectID: prevState.selectedProjID,
        id: taskId,
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjects((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id != id),
      };
    });
  }

  function handleAddProject() {
    setProjects((prevState) => {
      return {
        ...prevState,
        selectedProjID: null,
      };
    });
  }
  function handleSelectProject(id) {
    setProjects((prevState) => {
      return {
        ...prevState,
        selectedProjID: id,
      };
    });
  }

  function handleCancelProject() {
    setProjects((prevState) => {
      return {
        ...prevState,
        selectedProjID: undefined,
      };
    });
  }

  function handleDeleteProject() {
    setProjects((prevState) => {
      return {
        ...prevState,
        selectedProjID: undefined,
        projects: prevState.projects.filter(
          (project) => project.id != prevState.selectedProjID
        ),
      };
    });
  }

  function handleNewProject(projectData) {
    setProjects((prevState) => {
      const projectID = Math.random();
      const newProject = {
        ...projectData,
        id: projectID,
      };
      return {
        ...prevState,
        selectedProjID: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  console.log(projects);

  const selectedProject = projects.projects.find(
    (project) => project.id === projects.selectedProjID
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projects.tasks}
    ></SelectedProject>
  );
  if (projects.selectedProjID === null) {
    content = (
      <NewProject
        onAdd={handleNewProject}
        onCancel={handleCancelProject}
      ></NewProject>
    );
  } else if (projects.selectedProjID === undefined)
    content = <NoProject onStartAddProject={handleAddProject}></NoProject>;
  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <Sidebar
          onStartAddProject={handleAddProject}
          projects={projects.projects}
          onSelectProject={handleSelectProject}
          slectedProjectID={projects.selectedProjID}
        ></Sidebar>
        {content}
      </main>
    </>
  );
}

export default App;
