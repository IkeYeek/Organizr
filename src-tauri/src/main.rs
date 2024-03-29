// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{generate_handler};
use crate::devcode::bootstrap_lists;
use crate::storage::{NonPersistentStorage, Storage};

mod todo_list;
mod task;
mod api;
pub(crate) mod storage;
mod test;
mod devcode;

fn main() {
    std::env::set_var("RUST_LOG", "debug");
    env_logger::init();
    let state = NonPersistentStorage::new();
    
    tauri::Builder::default()
        .manage(state)
        .invoke_handler(generate_handler![api::create_todo_list, api::pull_todo_list, api::pull_todo_lists, api::create_task_in_list, api::update_list, api::update_task_in_list, api::delete_task_in_list, api::delete_list])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


