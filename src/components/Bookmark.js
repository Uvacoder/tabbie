import React from "react";
import { Avatar } from "@vechaiui/react";
import { stringToColour, getContrastYIQ } from "../util/color";

export default function Bookmark(props) {
  return (
    <div
      onClick={() => window.open(props.link)}
      className="rounded text-center p-3 bg-neutral-50 dark:bg-neutral-700 hover:cursor-pointer w-24 h-24 transition-all hover:bg-neutral-100 dark:hover:bg-neutral-600"
    >
      <Avatar
        name={props.name}
        size="xl"
        className="mb-2"
        style={{
          backgroundColor: stringToColour(props.name + " " + props.link),
          color: getContrastYIQ(stringToColour(props.name + " " + props.link))
        }}
      />
      <p>{props.name}</p>
    </div>
  );
}
