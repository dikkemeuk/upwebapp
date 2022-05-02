import React from "react";

interface Props {
    children?: React.ReactNode;
    pretitle: string;
    title?: string;
    align?: "left" | "center" | "right";
}

export default function SectionTitle(props: Props) {
  return (
      < div className={`flex w-full flex-col mt-4 ${
        props.align === "left" ? "" : "items-center justify-center text-center"
      }`}>
      {props.pretitle && (
        <div className="text-lg font-bold tracking-wider text-white uppercase">
          {props.pretitle}
        </div>
      )}

      {props.title && (
        <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-white lg:leading-tight lg:text-4xl">
          {props.title}
        </h2>
      )}

      {props.children && (
        
        props.children

      )}
      </ div>
  );
}

