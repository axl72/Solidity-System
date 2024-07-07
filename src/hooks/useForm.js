import { useState } from "react"

export const useForm = (initialSate) => {
    const [ formState, setFormState ] = useState(initialSate);

    const onChange = ({target}) => {
        const { name, value} = target;
        setFormState({
            ...formState,
            [name]: value
        })
    }

    const resetForm = () => {
        setFormState(initialSate)
    }

    return {
        ...formState,
        onChange,
        resetForm
    }
}