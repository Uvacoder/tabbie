import React from "react";

export default function SearchHeading(props) {
  return (
    <div>
      <p className="text-3xl font-mono text-center">
        Tabbie
        <sup>
          <small className="text-base">α</small>
        </sup>
      </p>
      <p className="text-base italic text-center ">
        {props.name} the World.
      </p>
    </div>
  );
}
