use std::sync::Mutex;
use crate::task::{NotificationType, Task};
use crate::todo_list::{AvailableIcons, Tasks, TodoList, Type};

pub(crate) trait Storage {
    fn new() -> Self;
    fn create_todo_list(&self) -> usize;
    fn pull(&self) -> Vec<TodoList>;
    fn pull_list(&self, id: usize) -> Option<TodoList>;
    fn update_list(&self, update_model: TodoList);
    fn delete_list(&self, list_id: usize);

    fn create_task_in_list(&self, id: usize) -> Task;
    fn update_task_in_list(&self, list_id: usize, task: Task);
    fn delete_task_in_list(&self, list_id: usize, task_id: usize);
}
pub(crate) struct NonPersistentStorage {
    list_idx: Mutex<usize>,
    task_idx: Mutex<usize>,
    lists: Mutex<Vec<TodoList>>,
}

impl Storage for NonPersistentStorage {
    fn new() -> Self {
        Self {
            list_idx: Mutex::new(0),
            task_idx: Mutex::new(0),
            lists: Mutex::new(Vec::new())
        }
    }
    fn create_todo_list(&self) -> usize {
        let mut lists = self.lists.lock().unwrap();
        let mut list_idx_mutex = self.list_idx.lock().unwrap();
        let list_idx = *list_idx_mutex;
        *list_idx_mutex += 1;
        let title = format!("New list {list_idx}");
        let list = TodoList::new(
            list_idx,
            title,
            AvailableIcons::None,
            Type::Todo,
            Tasks(Vec::new()),
        );
        lists.push(list);
        list_idx
    }

    fn pull(&self) -> Vec<TodoList> {
        self.lists.lock().unwrap().to_vec()
    }

    fn pull_list(&self, id: usize) -> Option<TodoList> {
        self.lists.lock().unwrap().clone().into_iter().find(|l| l.id == id)
    }

    fn update_list(&self, update_model: TodoList) {
        match self.pull().iter().position(|list| list.id == update_model.id) {
            None => panic!("TODO: handle this"),
            Some(idx) => self.lists.lock().unwrap()[idx] = update_model,
        }

    }

    fn delete_list(&self, list_id: usize) {
        let mut lists = self.lists.lock().unwrap();
        let list_pos = lists.iter_mut().position(|tdl| tdl.id == list_id);
        lists.remove(list_pos.unwrap());
    }

    fn create_task_in_list(&self, list_id: usize) -> Task {
        let mut lists = self.lists.lock().unwrap();
        let mut idx_mutex = self.task_idx.lock().unwrap();
        let next_id = idx_mutex.to_owned();
        *idx_mutex += 1;
        let list = lists.iter_mut().find(|tdl| tdl.id == list_id);
        let task = Task::new(next_id, format!("New task #{next_id}"), false, None, NotificationType::None);
        match list {
            None => panic!("Todo: handle this"),
            Some(list) => list.add_task(task.clone()),
        }
        task
    }

    fn update_task_in_list(&self, list_id: usize, task: Task) {
        let mut lists = self.lists.lock().unwrap();
        let list = lists.iter_mut().find(|l| l.id == list_id).expect("Todo: handle this");
        list.update_task(task);
    }

    fn delete_task_in_list(&self, list_id: usize, task_id: usize) {
        let mut lists = self.lists.lock().unwrap();
        let list = lists.iter_mut().find(|l| l.id == list_id).expect("Todo: handle this");
        list.remove_task(task_id);
    }
}