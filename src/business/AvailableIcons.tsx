import React from "react";
import { Camera } from "react-feather";

export enum AvailableIcons {
  None,
  Camera,
}
const iconEnumFromName = (iconName: "None" | "Camera") => {
  switch (iconName) {
    case "None":
      return AvailableIcons.None;
    case "Camera":
      return AvailableIcons.Camera;
  }
};
const matchIconWithElement = (icon: AvailableIcons) => {
  switch (icon) {
    case AvailableIcons.None:
      return null;
    case AvailableIcons.Camera:
      return <Camera />;
  }
};

export { matchIconWithElement, iconEnumFromName };
