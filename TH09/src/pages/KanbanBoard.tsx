import {
  DragDropContext,
  Droppable,
  Draggable,
  
} from "@hello-pangea/dnd";
import type {DropResult} from "@hello-pangea/dnd";
import { useState } from "react";
import { getTasks, saveTasks } from "../utils/storage";
import type { Task } from "../types/task";

const columns = {
  todo: "Cần làm",
  inprogress: "Đang làm",
  done: "Hoàn thành"
};

const getColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "#ff4d4f";
    case "medium":
      return "#faad14";
    default:
      return "#52c41a";
  }
};

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(getTasks());

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const updated = tasks.map(task =>
      task.id === result.draggableId
        ? { ...task, status: result.destination!.droppableId as Task["status"] }
        : task
    );

    setTasks(updated);
    saveTasks(updated);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", gap: 16, padding: 20 }}>
        {Object.entries(columns).map(([key, title]) => (
          <Droppable droppableId={key} key={key}>
            {(provided) => (
              <div
                className="column"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3>{title}</h3>

                {tasks
                  .filter(t => t.status === key)
                  .map((task, index) => (
                    <Draggable
                      draggableId={task.id}
                      index={index}
                      key={task.id}
                    >
                      {(provided) => (
                        <div
                          className="task-card"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            borderLeft: `5px solid ${getColor(task.priority)}`,
                            ...provided.draggableProps.style
                          }}
                        >
                          <b>{task.title}</b>
                          <div style={{ fontSize: 12, color: "#888" }}>
                            {task.deadline}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}