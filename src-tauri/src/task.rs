use std::fmt;
use std::fmt::{Display, Formatter};
use chrono::{DateTime, Utc};

#[derive(Debug)]
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

#[derive(Debug)]
pub struct Task<'a> {
    id: String,
    title: &'a str,
    done: bool,
    due: Option<DateTime<Utc>>,
    notify: NotificationType,
}

impl<'a> Task<'a> {
    pub fn new( id: String,
                title: &'a str,
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

impl Display for Task<'_> {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        let due = match self.due {
            Option::None => String::from("Not defined"),
            Option::Some(due_to) => due_to.to_rfc2822(),
        };

        write!(f, "\tid: {}; title: {}; due to: {}; notify: {}, done: {}\n", self.id, self.title, due, self.notify, self.done)
    }
}