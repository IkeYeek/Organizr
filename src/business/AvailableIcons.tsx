import React from "react";
import { Camera, Trash } from "react-feather";

export enum AvailableIcons {
  None,
  Camera,
  Trash,
}
const iconEnumFromName = (iconName: "None" | "Camera" | "Trash") => {
  switch (iconName) {
    case "None":
      return AvailableIcons.None;
    case "Camera":
      return AvailableIcons.Camera;
    case "Trash":
      return AvailableIcons.Trash;
  }
};
const matchIconWithElement = (icon: AvailableIcons) => {
  switch (icon) {
    case AvailableIcons.None:
      return null;
    case AvailableIcons.Camera:
      return <Camera key={"camera-icon"} />;
    case AvailableIcons.Trash:
      return <Trash key={"trash-icon"} />;
  }
};

export { matchIconWithElement, iconEnumFromName };
