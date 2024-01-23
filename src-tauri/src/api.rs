use chrono::{ TimeZone, Utc};
use log::debug;
use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Manager};
use crate::storage::{NonPersistentStorage, Storage};
use crate::task::{NotificationType, Task};
use crate::todo_list::TodoList;

#[derive(Copy, Clone, Serialize, Deserialize)]
struct EmptyPayload {}

#[derive(Clone, Serialize, Deserialize)]
pub(crate) struct JSTask {
    pub(crate) id: usize,
    pub(crate) title: String,
    pub(crate) done: bool,
    pub(crate) due: Option<i64>,
    pub(crate) notify: NotificationType,
}

#[derive(Clone, Serialize)]
struct PullListPayload {
    lists: Vec<TodoList>
}
#[allow(clippy::needless_pass_by_value)]
#[tauri::command]
pub(crate) fn pull_todo_lists(state: tauri::State<NonPersistentStorage>) -> Vec<TodoList> {
    debug!("commands::pull_todo_lists");
    state.pull()
}
#[allow(clippy::needless_pass_by_value)]
#[tauri::command]
pub(crate) fn create_todo_list(app_handle: AppHandle, state: tauri::State<NonPersistentStorage>) -> TodoList {
    debug!("commands::create_todo_list");
    let created_list_id = state.create_todo_list();

    let list = state.pull_list(created_list_id).unwrap();
    evt_refresh_lists(app_handle);
    list
}
#[allow(clippy::needless_pass_by_value)]
#[tauri::command]
pub(crate) fn pull_todo_list(id: usize, state: tauri::State<NonPersistentStorage>) -> Option<TodoList> {
    debug!("commands::pull_todo_list");
    state.pull_list(id)
}
#[allow(clippy::needless_pass_by_value)]
#[tauri::command]
pub(crate) fn create_task_in_list(id: usize, app_handle: AppHandle, state: tauri::State<NonPersistentStorage>) {
    debug!("commands::create_task_in_list");
    state.create_task_in_list(id);
    evt_refresh_list(id, app_handle);
}
#[allow(clippy::needless_pass_by_value)]
#[tauri::command]
pub(crate) fn update_list(updated_list: TodoList, app_handle: AppHandle, state: tauri::State<NonPersistentStorage>) {
    debug!("commands::update_list");
    let id = updated_list.id;
    state.update_list(updated_list.clone());
    println!("{updated_list}");
    evt_refresh_list(id, app_handle);
}#[allow(clippy::needless_pass_by_value)]
#[tauri::command]
pub(crate) fn update_task_in_list(id: usize, task: JSTask, app_handle: AppHandle, state: tauri::State<NonPersistentStorage>) {
    debug!("commands::update_task_in_list");
    state.update_task_in_list(id, Task {
        id: task.id,
        title: task.title,
        notify: task.notify,
        done: task.done,
        due: task.due.map(|t| Utc.timestamp_opt(t / 1000, 0).unwrap())
    });
    evt_refresh_list(id, app_handle);
}

#[allow(clippy::needless_pass_by_value)]
#[tauri::command]
pub(crate) fn delete_task_in_list(id: usize, tid: usize, app_handle: AppHandle, state: tauri::State<NonPersistentStorage>) {
    debug!("commands::delete_task_in_list");
    state.delete_task_in_list(id, tid);
    evt_refresh_list(id, app_handle);
}
#[allow(clippy::needless_pass_by_value)]
#[tauri::command]
pub(crate) fn delete_list(id: usize, app_handle: AppHandle, state: tauri::State<NonPersistentStorage>) {
    debug!("commands::delete_list");
    state.delete_list(id);
    evt_refresh_lists(app_handle);
}
#[derive(Clone, Serialize)]
struct UpdateListPayload {
    list_id: usize,
}

pub(crate) fn evt_refresh_list(list_id: usize, app_handle: AppHandle) {
    debug!("evt::refresh_list");
    let _unsubscribe = app_handle.emit_all("refresh-list", UpdateListPayload {
        list_id
    });
    evt_refresh_lists(app_handle);
}

#[allow(clippy::needless_pass_by_value)]
pub(crate) fn evt_refresh_lists(app_handle: AppHandle) {
    debug!("evt::refresh_lists");
    let _unsubscribe = app_handle.emit_all("refresh-lists", EmptyPayload{});
}