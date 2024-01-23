use fmt::Display;
use std::fmt;
use std::fmt::{Formatter};
use crate::task::Task;
#[derive(Debug, serde::Serialize, serde::Deserialize, Clone)]
pub enum TodoListType {
    Todo,
    TodoDone,
}
#[derive(Debug, serde::Serialize, serde::Deserialize, Clone)]
pub enum AvailableIcons {
    None,
    List,
    Calendar,
    Music,
    Video,
    Trash,
    Briefcase,
}
impl Display for AvailableIcons {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            AvailableIcons::List => write!(f, "List"),
            AvailableIcons::Briefcase => write!(f, "Briefcase"),
            AvailableIcons::Calendar => write!(f, "Calendar"),
            AvailableIcons::Music => write!(f, "Music"),
            AvailableIcons::Trash => write!(f, "Trash"),
            AvailableIcons::Video => write!(f, "Video"),
            AvailableIcons::None => write!(f, "None"),
        }
    }
}

impl Display for TodoListType {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        match self {
            TodoListType::Todo => write!(f, "Todo"),
            TodoListType::TodoDone => write!(f, "Todo/Done"),
        }
    }
}
pub type TasksType = Vec<Task>;

#[derive(Debug, serde::Serialize, serde::Deserialize, Clone)]
pub struct Tasks (pub TasksType);
#[derive(Debug, serde::Serialize, serde::Deserialize, Clone)]
pub struct TodoList {
    pub(crate) id: usize,
    pub title: String,
    pub icon: AvailableIcons,
    pub list_type: TodoListType,
    pub tasks: Tasks,
}
impl TodoList {
    pub fn new(id: usize, title: String, icon: AvailableIcons, list_type: TodoListType, tasks: Tasks) -> Self {
        Self {
            id,
            title,
            icon,
            list_type,
            tasks
        }
    }

    pub fn add_task(&mut self, task: Task) {
        self.tasks.0.push(task);
    }

    pub fn update_task(&mut self, updated_task: Task) {
        if let Some(existing_task_idx) = self.tasks.0.iter().position(|task| task.id == updated_task.id) {
            // Replace the existing task with the updated_task
            self.tasks.0[existing_task_idx] = updated_task;
        } else {
            // Handle the case where the task with the same id is not found
            // You might want to log a message or raise an error here based on your requirements.
            println!("Task with id {} not found in the list.", updated_task.id);
        }
    }

    pub fn get_task_by_id(&self, task_id: usize) -> Option<&Task> {
        match self.tasks().iter().find(|task| task.id == task_id) {
            None => None,
            Some(task) => Some(task)
        }
    }

    pub fn tasks(&self) -> &TasksType {
      & self.tasks.0
    }
}

impl PartialEq for TodoList {
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}

impl Display for TodoList {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        let dbg = format!("List {} of id {}\n\t icon: {}\t-\ttype: {}\n{}", self.title, self.id, self.icon, self.list_type, self.tasks).to_string();
        write!(f, "{}", dbg.as_str())
    }
}

impl Display for Tasks {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        let mut dbg = String::from("\t tasks:\n");
        self.0.iter().for_each(|task| dbg.push_str(format!("\t{}", task.to_string()).as_str()));
        write!(f, "{}", dbg)
    }
}