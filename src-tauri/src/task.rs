use std::fmt;
use std::fmt::{Display, Formatter};
use chrono::{DateTime, Utc};
use chrono::serde::ts_seconds_option;



#[derive(Debug, serde::Serialize, serde::Deserialize, Clone)]
pub enum NotificationType {
    None,
    NonIntrusive,
    Intrusive,
}

impl Display for NotificationType {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        match self {
            NotificationType::Intrusive => write!(f, "Intrusive"),
            NotificationType::None => write!(f, "None"),
            NotificationType::NonIntrusive => write!(f, "NonIntrusive"),
        }
    }
}


#[derive(Debug, serde::Serialize, serde::Deserialize, Clone)]
pub struct Task {
    pub(crate) id: usize,
    pub(crate) title: String,
    pub(crate) done: bool,
    #[serde(with = "ts_seconds_option")]
    pub(crate) due: Option<DateTime<Utc>>,
    pub(crate) notify: NotificationType,
}

impl Task {
    pub fn new( id: usize,
                title: String,
                done: bool,
                due: Option<DateTime<Utc>>,
                notify: NotificationType,) -> Self {
        Self {
            id,
            title,
            done,
            due,
            notify
        }
    }
}

impl Display for Task {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        let due = match self.due {
            Option::None => String::from("Not defined"),
            Option::Some(due_to) => due_to.to_string(),
        };

        write!(f, "\tid: {}; title: {}; due to: {}; notify: {}, done: {}\n", self.id, self.title, due, self.notify, self.done)
    }
}