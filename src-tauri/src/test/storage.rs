#[cfg(test)]
mod storage_tests {
    #[cfg(test)]
    mod non_persistent {
        use crate::storage::{NonPersistentStorage, Storage};
        use crate::todo_list::TodoList;

        #[test]
        fn test_create_todo_list() {
            let store = NonPersistentStorage::new();
            assert_eq!(store.pull().len(), 0);
            store.create_todo_list();
            assert_eq!(store.pull().len(), 1);
            let pulled = store.pull_list(0).unwrap();
            assert_eq!(pulled.title, "New list 0");
        }

        #[test]
        fn test_update_todo_list() {
            let mut store = NonPersistentStorage::new();
            store.create_todo_list();
            assert_eq!(store.pull_list(0).unwrap().title, "New list 0");
            let last_inserted = store.pull_list(0).unwrap();
            store.update_list(TodoList {
                title: "Updated title".into(),
                id: last_inserted.id,
                tasks: last_inserted.tasks,
                list_type: last_inserted.list_type,
                icon: last_inserted.icon,
            });
            assert_eq!(store.pull_list(0).unwrap().title, "Updated title");
        }
    }
}