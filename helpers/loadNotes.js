import { db } from '../firbase/firebase-config';

export const loadNotes = async ( uid ) => {

    const notesSnap = await db.collection(`${ uid }/journal/notes`).get();
    const notes = [];

    notesSnap.forEach( snapChild => {
        //console.log(snapChild.data());
        notes.push({
            id: snapChild.id,
            ...snapChild.data()
        })

    })

    console.log(notes)

    return notes;

}