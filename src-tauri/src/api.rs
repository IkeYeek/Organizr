use log::debug;
use serde::Serialize;
use tauri::{AppHandle, Manager};
use crate::storage::{NonPersistentStorage, Storage};
use crate::task::Task;
use crate::todo_list::TodoList;


#[derive(Clone, Serialize)]
struct PullListPayload {
    lists: Vec<TodoList>
}

#[tauri::command]
pub(crate) fn pull_todo_lists(state: tauri::State<NonPersistentStorage>) -> Vec<TodoList> {
    debug!("commands::pull_todo_lists");
    state.pull()
}

#[tauri::command]
pub(crate) fn create_todo_list(app_handle: AppHandle, state: tauri::State<NonPersistentStorage>) -> TodoList {
    debug!("commands::create_todo_list");
    let created_list_id = state.create_todo_list();

    let list = state.pull_list(created_list_id).unwrap();
    evt_refresh_lists(app_handle);
    list
}

#[tauri::command]
pub(crate) fn pull_todo_list(id: usize, state: tauri::State<NonPersistentStorage>) -> Option<TodoList> {
    debug!("commands::pull_todo_list");
    state.pull_list(id)
}

#[tauri::command]
pub(crate) fn create_task_in_list(id: usize, app_handle: AppHandle, state: tauri::State<NonPersistentStorage>) {
    debug!("commands::create_task_in_list");
    state.create_task_in_list(id);
    evt_refresh_list(id, app_handle);
}

#[tauri::command]
pub(crate) fn update_list(updated_list: TodoList, app_handle: AppHandle, state: tauri::State<NonPersistentStorage>) {
    debug!("commands::update_list");
    let id = updated_list.id;
    state.update_list(updated_list.clone());
    println!("{}", updated_list);
    evt_refresh_list(id, app_handle);
}
#[tauri::command]
pub(crate) fn update_task_in_list(id: usize, task: Task, app_handle: AppHandle, state: tauri::State<NonPersistentStorage>) {
    debug!("commands::update_task_in_list");
    state.update_task_in_list(id, task);
    evt_refresh_list(id, app_handle);
}


#[tauri::command]
pub(crate) fn delete_task_in_list(id: usize, tid: usize, app_handle: AppHandle, state: tauri::State<NonPersistentStorage>) {
    debug!("commands::delete_task_in_list");
    state.delete_task_in_list(id, tid);
    evt_refresh_list(id, app_handle);
}

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

pub(crate) fn evt_refresh_lists(app_handle: AppHandle) {
    debug!("evt::refresh_lists");
    let _unsubscribe = app_handle.emit_all("refresh-lists",{});
}