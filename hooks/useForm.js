import { useState } from 'react';


export const useForm = ( initialState = {} ) => {

    const [values, setValues] = useState(initialState);

    const reset = ( newFormState = initialState ) => {   // This is to avoid a ciclic error and return to initial State
        setValues( initialState );
    }


    const handleInputChange = ({ target }) => {

        setValues({
            ...values,
            [ target.name ]: target.value  // Is important to put the name in the <tag> because this form calls it
        });

    }

    return [ values, handleInputChange, reset ];

}