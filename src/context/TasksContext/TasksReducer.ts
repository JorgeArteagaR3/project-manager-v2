import { TaskInterface } from "../../types/task";

type ProjectAction =
    | {
          type: "SAVE_TASKS" | "ADD_TASK";
          payload: TaskInterface[];
      }
    | { type: "REMOVE_TASK" | "UPDATE_TASKS"; payload: TaskInterface };

export const initialState: { tasks: TaskInterface[] } = {
    tasks: [],
};

export const tasksReducer = (
    state: typeof initialState,
    action: ProjectAction
) => {
    const { type, payload } = action;

    switch (type) {
        case "SAVE_TASKS": {
            const newState = [...payload].sort(
                (a, b) =>
                    new Date(a.createdAt!).getTime() -
                    new Date(b.createdAt!).getTime()
            );
            return { ...state, tasks: newState };
        }
        case "ADD_TASK": {
            return { tasks: [...state.tasks, ...payload] };
        }

        case "REMOVE_TASK": {
            const newState = [...state.tasks].filter(
                (task) => task.id !== payload.id
            );

            return { tasks: newState };
        }
        case "UPDATE_TASKS": {
            const newState = [...state.tasks].map((task) =>
                task.id === payload.id ? payload : task
            );
            return { tasks: newState };
        }

        default: {
            return state;
        }
    }
};
