use fmt::Display;
use std::fmt;
use std::fmt::{Formatter};
use crate::task::Task;
#[derive(Debug)]
pub enum TodoListType {
    Todo,
    TodoDone,
}
#[derive(Debug)]
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
pub type TasksType<'a> = Vec<&'a mut Task<'a>>;

#[derive(Debug)]
pub struct Tasks<'a> (pub TasksType<'a>);
#[derive(Debug)]
pub struct TodoList<'a> {
    pub(crate) id: usize,
    pub title: String,
    pub icon: AvailableIcons,
    pub list_type: TodoListType,
    pub tasks: Tasks<'a>,
}
impl<'a> TodoList<'a> {
    pub fn new(id: usize, title: String, icon: AvailableIcons, list_type: TodoListType, tasks: Tasks<'a>) -> Self {
        Self {
            id,
            title,
            icon,
            list_type,
            tasks
        }
    }

    pub fn add_task(&mut self, task: &'a mut Task<'a>) {
        self.tasks.0.push(task);
    }

    pub fn tasks(&self) -> &TasksType<'a> {
       &self.tasks.0
    }
}

impl PartialEq for TodoList<'_> {
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}

impl Display for TodoList<'_> {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        let dbg = format!("List {} of id {}\n\t icon: {}\t-\ttype: {}\n{}", self.title, self.id, self.icon, self.list_type, self.tasks).to_string();
        write!(f, "{}", dbg.as_str())
    }
}

impl Display for Tasks<'_> {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        let mut dbg = String::from("\t tasks:\n");
        self.0.iter().for_each(|task| dbg.push_str(format!("\t{}", task.to_string()).as_str()));
        write!(f, "{}", dbg)
    }
}