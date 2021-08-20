// Tarea asincrona lleva el return del callback respectivo
// El argumento get State es casi igual al useSelector

import Swal from 'sweetalert2';

import { db } from "../firbase/firebase-config";
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

// react.journal


export const startNewNote = () => {
    return async ( dispatch, getState ) => {

        //const uid = getState().auth.uid;
        const { uid } = getState().auth;
        //console.log( uid )

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        // Crear nota y guarda en Firebse
        const doc = await db.collection(`${ uid }/journal/notes`).add( newNote )

        dispatch( activeNote( doc.id, newNote ) );
        dispatch( addNewNote( doc.id, newNote ) );

    }
}

// accion sincrona= cuando tengo el resultado voy a mandarle algo ami reducer
export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
});

export const startLoadingNotes = ( uid ) => {
    return async ( dispatch ) => {
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );
    }
}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});

// action to save the note in Firebase
export const startSaveNote = ( note ) => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;

        if ( !note.url ) {
            delete note.url;
        }

        const noteToFirestore = { ...note }
        delete noteToFirestore.id;

        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore );

        dispatch( refreshNote( note.id, noteToFirestore ) )
        Swal.fire('Saved', note.title, 'success')
    }
}

export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
})

// action That makes images appear in the note. Because its an async task we use Thunk
export const startUploading = ( file ) => {
    return async ( dispatch, getState ) => {

        const { active:activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // Here is begining to make the load
        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;

        dispatch( startSaveNote( activeNote ) );

        Swal.close();

        //console.log(file)
        //console.log(activeNote)

    }
}

export const startDeleting = ( id ) => {
    return async ( dispatch, getState ) => {

        const uid = getState().auth.uid
        await db.doc(`${ uid }/journal/notes/${ id }`).delete();

        //Swal.fire({
        //  title: 'Do you want to delete the note?',
        //  showDenyButton: true,
        //  showCancelButton: true,
        //  confirmButtonText: `Delete`,
        //  denyButtonText: `Don't Delete`,
        //}).then((result) => {
        //  /* Read more about isConfirmed, isDenied below */
        //  if (result.isConfirmed) {
        //    Swal.fire('Deleted!', '', 'success')
        //  } else if (result.isDenied) {
        //    Swal.fire('I will keep it', '', 'info')
        //  }
        //})

        dispatch( deleteNote( id ) )

    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
});

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});
