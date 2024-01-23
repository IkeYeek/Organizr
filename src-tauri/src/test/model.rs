#[cfg(test)]
mod tests {
    use crate::model::HydratedTodoLists;
    use crate::task::{NotificationType, Task};
    use crate::todo_list::{AvailableIcons, TodoList, TodoListType};
    use crate::todo_list::Tasks;
    #[test]
    fn test_get_list(){
        let model = HydratedTodoLists::new();

        let mut dummy_list = TodoList {
            id: 0,
            icon: AvailableIcons::None,
            title: String::from("DummyTitle"),
            list_type: TodoListType::Todo,
            tasks: Tasks {0: Vec::new()},
        };
        let mut model = model;
        model.add_list(&mut dummy_list);
        let mut model = model;
        let retrieved = model.get_list(0);
        match retrieved {
            None => panic!("failed!"),
            Some(list_ref) => assert_eq!(list_ref.id, 0),
        }
    }
    #[test]
    fn test_add_list(){
        let model = HydratedTodoLists::new();

        assert_eq!(model.get_lists().len(), 0);
        let mut dummy_list = TodoList {
            id: 0,
            icon: AvailableIcons::None,
            title: String::from("DummyTitle"),
            list_type: TodoListType::Todo,
            tasks: Tasks {0: Vec::new()},
        };
        let mut model = model;
        model.add_list(&mut dummy_list);
        let model = model;
        assert_eq!(model.get_lists().len(), 1);
    }
    #[test]
    fn test_update_list(){
        let model = HydratedTodoLists::new();
        let mut dummy_list = TodoList {
            id: 0,
            icon: AvailableIcons::None,
            title: String::from("DummyTitle"),
            list_type: TodoListType::Todo,
            tasks: Tasks {0: Vec::new()},
        };
        let mut model = model;
        model.add_list(&mut dummy_list);
        let mut model = model;

        let unchanged_list = model.get_list(0);
        match unchanged_list {
            None => panic!("Error!"),
            Some(list) => {
                assert_eq!(list.id, 0);
                assert_eq!(list.title, "DummyTitle");
            }
        }

        let mut updated_dummy_list = TodoList {
            id: 0,
            icon: AvailableIcons::None,
            title: String::from("LOL"),
            list_type: TodoListType::Todo,
            tasks: Tasks {0: Vec::new()},
        };

        let mut model = model;
        model.update_list(&mut updated_dummy_list);
        let mut model = model;
        let changed_list = model.get_list(0);
        match changed_list {
            None => panic!("Error!"),
            Some(list) => {
                assert_eq!(list.id, 0);
                assert_eq!(list.title, "LOL");
            }
        }
    }
    #[test]
    fn test_remove_list() {
        let model = HydratedTodoLists::new();

        let mut dummy_list = TodoList {
            id: 0,
            icon: AvailableIcons::None,
            title: String::from("DummyTitle"),
            list_type: TodoListType::Todo,
            tasks: Tasks {0: Vec::new()},
        };
        let mut model = model;
        model.add_list(&mut dummy_list);
        model.remove_list(0);
        let retrieved = model.get_list(0);
        assert_eq!(retrieved, None);
    }

    #[test]
    fn test_insert_task_in_list() {
        let mut list = TodoList::new(0, String::from("list_test_insert_task_in_list"), AvailableIcons::None, TodoListType::Todo, Tasks {
            0: Vec::new()
        });
        let mut task = Task::new(String::from("dummy"), "task_test_insert_task_in_list", false, None, NotificationType::None);
        let mut model = HydratedTodoLists::new();
        model.add_list(&mut list);
        model.insert_task_in_list(0, &mut task);

        let list = model.get_list(0);
        match list {
            None => panic!("fail"),
            Some(list) => assert_eq!(list.tasks().len(), 1)
        }
    }
}