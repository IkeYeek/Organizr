import React from "react";
import { Calendar, Video, List, Trash, Briefcase, Music } from "react-feather";

export type AvailableIconsAsStrings =
  | "None"
  | "Video"
  | "Trash"
  | "List"
  | "Calendar"
  | "Briefcase"
  | "Music";

export enum AvailableIcons {
  None,
  List,
  Calendar,
  Music,
  Video,
  Trash,
  Briefcase,
}
const iconEnumFromName = (iconName: AvailableIconsAsStrings) => {
  switch (iconName) {
    case "None":
      return AvailableIcons.None;
    case "Video":
      return AvailableIcons.Video;
    case "Trash":
      return AvailableIcons.Trash;
    case "List":
      return AvailableIcons.List;
    case "Calendar":
      return AvailableIcons.Calendar;
    case "Briefcase":
      return AvailableIcons.Briefcase;
    case "Music":
      return AvailableIcons.Music;
  }
};
const matchIconWithElement = (icon: AvailableIcons) => {
  switch (icon) {
    case AvailableIcons.None:
      return null;
    case AvailableIcons.Video:
      return <Video />;
    case AvailableIcons.Trash:
      return <Trash />;
    case AvailableIcons.List:
      return <List />;
    case AvailableIcons.Calendar:
      return <Calendar />;
    case AvailableIcons.Briefcase:
      return <Briefcase />;
    case AvailableIcons.Music:
      return <Music />;
  }
};

export { matchIconWithElement, iconEnumFromName };
