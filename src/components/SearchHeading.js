import React from "react";

export default function SearchHeading(props) {
  return (
    <div>
      <p className="text-5xl font-mono text-center">
        Tabbie : Startpage        
      </p>
      <p className="text-base italic text-center ">
        {props.name} search.
      </p>
    </div>
  );
}
