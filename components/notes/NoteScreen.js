import React, { useEffect, useRef } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';

import { useSelector, useDispatch } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();

    // Here is how to save the note and send it to firebase=> the active note from the notes
    const { active:note } = useSelector(state => state.notes)
    const [ formValues, handleInputChange, reset ] = useForm( note )
    const { body, title, id } = formValues;

    const activeId = useRef( note.id )

    useEffect(() => {

        if ( note.id !== activeId.current ) {
            reset( note )
            activeId.current = note.id
        }

    }, [note, reset])


    useEffect(() => {

        dispatch( activeNote(formValues.id, { ...formValues } ) );

    }, [formValues, dispatch])

    const handleDelete = () => {
        dispatch( startDeleting( id ) );
    }

    return (
        <div className="note__main-content">

            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    name="title"
                    autoComplete="off"
                    value={ title }
                    onChange={ handleInputChange }
                />

                <textarea
                    placeholder="What happened today?"
                    className="notes__textarea"
                    name="body"
                    value={ body }
                    onChange={ handleInputChange }
                ></textarea>

                {
                    ( note.url )
                    &&
                    (
                        <div className="notes__image">
                            <img
                                src={ note.url }
                                alt="imagen"
                            />
                        </div>
                    )
                }

            </div>

            <button
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                <DeleteIcon />
            </button>

        </div>
    )
}
