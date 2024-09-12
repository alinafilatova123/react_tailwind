import React from "react";
import classNames from "classnames";

interface Props {
    className?: string;
    onClick: () => void;
    children?: React.ReactNode;
}

const Button = ({className, onClick, children }:Props) => {
    let btnClass = classNames(className ? className : "");
    return (
        <button 
            className={ 'rounded px-4 py-2 font-semibold text-sm bg-indigo-500 text-white ' + btnClass } 
            onClick={onClick}
        >{ children }
        </button>
    )
}

export default Button;