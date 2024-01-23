use std::fmt;
use std::fmt::Formatter;
use crate::task::Task;
use crate::todo_list::TodoList;

pub(crate) struct HydratedTodoLists<'a> {
    lists: Vec<&'a mut TodoList<'a>>,
}

impl<'a> HydratedTodoLists<'a> {
    pub(crate) fn new() -> Self {
        Self {
            lists: Vec::new(),
        }
    }

    pub(crate) fn get_lists(&self) -> &Vec<&mut TodoList<'a>> {
        &self.lists
    }

    pub(crate) fn get_list(&mut self, list_id: usize) -> Option<&TodoList<'a>> {
        let pos = self.lists.iter().position(|list| list.id == list_id);
        match pos {
            None => None,
            Some(idx) => Some(& self.lists[pos.unwrap()]),
        }
    }

    pub(crate) fn add_list(&mut self, to_add: &'a mut TodoList<'a>) {
        self.lists.push(to_add);
    }

    pub(crate) fn update_list(&mut self, updated: &'a mut TodoList<'a>) {
        let to_update = self.lists.iter().position(|list| list.id == updated.id);
        match to_update {
            None => panic!("TODO: handle this"),
            Some(matching_list_idx) => {
                let _ = std::mem::replace(&mut self.lists[matching_list_idx], updated);
            }
        }
    }

    pub(crate) fn remove_list(&mut self, to_delete_id: usize) {
        let to_delete = self.lists.iter().position(|list| list.id == to_delete_id);
        match to_delete {
            None => panic!("TODO: handle this"),
            Some(matching_list_idx) => {
                self.lists.remove(matching_list_idx);
            },
        };
    }
}

impl<'a> HydratedTodoLists<'a> {
    fn _list_by_id(&self, id: usize) -> Option<usize> {
        self.lists.iter().position(|curr_list| id == curr_list.id)
    }
    pub(crate) fn insert_task_in_list(&mut self, list_id: usize, task: &'a mut Task<'a>) {
        let list_position = self._list_by_id(list_id);
        match list_position {
            None => panic!("TODO: handle this"),
            Some(idx) => self.lists[idx].tasks.0.push(task),
        }
    }
}

impl fmt::Display for HydratedTodoLists<'_> {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        let mut dbg = String::from("Todo Lists:\n");
        self.lists.iter().for_each(|list| dbg.push_str(list.to_string().as_str()));
        write!(f, "{}", dbg)
    }
}