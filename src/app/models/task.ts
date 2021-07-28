import { Project } from "./project";

export interface Task {
  id: number;
  name: string;
  description: string;
  project: Project;

  /** Kanban state this task is in */
  state: string;
}
