// Temporary file for dev purposes. I could use TDD but I'm lazy

use crate::storage::Storage;

pub(crate) fn bootstrap_lists(state: &impl Storage, list_amount: usize, task_per_list_amount: usize) {
    (0..list_amount).for_each(|idx| {
        state.create_todo_list();
        (0..task_per_list_amount).for_each(|_| {
            state.create_task_in_list(idx);
        });
    });
}