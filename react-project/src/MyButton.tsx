import React from "react";

export const message = "test";
export function MyButton({text}: {text:string}) {
    return (
        <button>{text}</button>
    );
}

export default MyButton;
