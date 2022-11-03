import React from "react";
import { Avatar } from "@vechaiui/react";
import { stringToColour, getContrastYIQ } from "../util/color";

export default function Bookmark(props) {
  return (
    <div
      onClick={() => window.open(props.link)}
      className="rounded w-full mb-2 md:w-24 text-center p-3 bg-neutral-50 dark:bg-neutral-700 hover:cursor-pointer h-24 transition-all hover:bg-neutral-100 dark:hover:bg-neutral-600"
    >
      <Avatar
        name={props.name}
        size="3xl"
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
