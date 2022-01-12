import React from 'react'

const Input = (props) => {
    return (
        <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">

            <div className="-mt-4 absolute tracking-wider px-1 text-xs">
                <p>
                    <label htmlFor={props.id} className={props.clLabel}>{props.labelText}</label>
                </p>
            </div>
            <p>

                <input id={props.id} className={props.clInput}
                    {...props} />
            </p>

        </div>
    )
}

export default Input
