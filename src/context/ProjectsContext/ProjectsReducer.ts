import { Project } from "../../types/project";
type ProjectAction =
    | {
          type: "GET_PROJECT" | "ADD_PROJECT";
          payload: Project[];
      }
    | { type: "REMOVE_PROJECT" | "UPDATE_PROJECT"; payload: Project };

export const initialState: { projects: Project[] } = {
    projects: [],
};

export const projectsReducer = (
    state: typeof initialState,
    action: ProjectAction
) => {
    const { type, payload } = action;
    switch (type) {
        case "GET_PROJECT": {
            return { projects: [...payload] };
        }
        case "ADD_PROJECT": {
            return { projects: [...state.projects, ...payload] };
        }
        case "REMOVE_PROJECT": {
            const newState = [...state.projects].filter(
                (project) => project.id !== payload.id
            );

            return { projects: newState };
        }
        case "UPDATE_PROJECT": {
            const newState = [...state.projects].map((project) =>
                project.id === payload.id
                    ? {
                          ...payload,
                          tasks: project.tasks,
                      }
                    : project
            );

            return { projects: newState };
        }
        default:
            return state;
    }
};
