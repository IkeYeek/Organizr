// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::ops::Deref;
use std::sync::Mutex;
use serde::Serialize;
use tauri::{AppHandle, generate_handler, Manager};
use log::{debug, error, warn};
use crate::storage::{NonPersistentStorage, Storage};
use crate::task::Task;
use crate::todo_list::{AvailableIcons, Tasks, TodoList, TodoListType};

mod todo_list;
mod task;
mod api;
pub(crate) mod storage;
mod test;


#[derive(Clone, Serialize)]
struct PullListPayload {
    lists: Vec<TodoList>
}

#[tauri::command]
fn pull_todo_lists(app_handle: AppHandle, state: tauri::State<NonPersistentStorage>) -> Vec<TodoList> {
    debug!("commands::pull_todo_lists");
    state.pull()
}

#[tauri::command]
fn create_todo_list(app_handle: AppHandle, state: tauri::State<NonPersistentStorage>) -> TodoList {
    debug!("commands::create_todo_list");
    let created_list_id = state.create_todo_list();
    state.pull_list(created_list_id).unwrap()
}

#[tauri::command]
fn pull_todo_list(id: usize, app_handle: AppHandle, state: tauri::State<NonPersistentStorage>) -> Option<TodoList> {
    debug!("commands::pull_todo_list");
    for list in state.pull() {
        println!("{}", list);
    }
    match state.pull_list(id) {
        None => None,
        Some(list) => Some(list),
    }
}

#[tauri::command]
fn create_task_in_list(id: usize, app_handle: AppHandle, state: tauri::State<NonPersistentStorage>) {
    debug!("commands::create_task_in_list");
    state.create_task_in_list(id);
    evt_refresh_list(id, app_handle);
}

#[tauri::command]
fn update_list(updated_list: TodoList, app_handle: AppHandle, state: tauri::State<NonPersistentStorage>) {
    debug!("commands::update_list");
    let id = updated_list.id;
    state.update_list(updated_list);
    evt_refresh_list(id, app_handle);
}
#[tauri::command]
fn update_task_in_list(id: usize, task: Task, app_handle: AppHandle, state: tauri::State<NonPersistentStorage>) {
    debug!("commands::update_task_in_list");
    state.update_task_in_list(id, task);
    evt_refresh_list(id, app_handle);
}

#[tauri::command]
fn delete_task_in_list(id: usize, tid: usize, app_handle: AppHandle, state: tauri::State<NonPersistentStorage>) {
    debug!("commands::delete_task_in_list");
    state.delete_task_in_list(id, tid);
    evt_refresh_list(id, app_handle);
}

#[tauri::command]
fn delete_list(id: usize, state: tauri::State<NonPersistentStorage>) {
    debug!("commands::delete_list");
    state.delete_list(id);
}
#[derive(Clone, Serialize)]
struct UpdateListPayload {
    list_id: usize,
}

fn evt_refresh_list(list_id: usize, app_handle: AppHandle) {
    debug!("evt::refresh_list");
    let _unsubscribe = app_handle.emit_all("refresh-list", UpdateListPayload {
        list_id
    });
}

fn main() {
    use log::debug;
    std::env::set_var("RUST_LOG", "debug");
    env_logger::init();
    let state = NonPersistentStorage::new();

    tauri::Builder::default()
        .manage(state)
        .invoke_handler(generate_handler![create_todo_list, pull_todo_list, pull_todo_lists, create_task_in_list, update_list, update_task_in_list, delete_task_in_list, delete_list])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


