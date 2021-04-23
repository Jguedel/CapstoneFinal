import React from 'react';
import './Inputs.scss'

const Inputs =({handleChange, label, ...otherProps}) =>{
    return(
        <div className='inputRow'>
            {label && (
                <label {...otherProps}>
                    {label}
                </label>
            )}

            <input type="Inputs" onChange={handleChange} {...otherProps}/>
        </div>
    )
}

export default Inputs;