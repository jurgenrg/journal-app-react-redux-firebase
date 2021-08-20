import React from 'react';
import moment from 'moment';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

import { startSaveNote, startUploading } from '../../actions/notes';
import { useDispatch, useSelector } from 'react-redux';
import { ImageAvatars } from './avatars/ImageAvatars';




export const NotesAppBar = ({ date }) => {

    const noteDate = moment( date );

    const dispatch = useDispatch()
    const { active } = useSelector(state => state.notes)

    const handleSave = () => {
        dispatch( startSaveNote( active ) )
    }

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if ( file ) {
            dispatch( startUploading( file ) )
        }
    }

    return (
        <div className="notes__appbar">
            <ImageAvatars />

            <span><h4>{noteDate.format('dddd')}</h4>      { noteDate.format( 'Do, MMMM, yyyy' ) }</span>

            <input
                id="fileSelector"
                type="file"
                style={{ display: 'none' }}
                onChange={ handleFileChange }
            />

            <div>
                <button
                    className="btn"
                    onClick={ handlePictureClick }
                >
                    <AddPhotoAlternateIcon fontSize="large" />
                </button>
                <button
                    className="btn"
                    onClick={ handleSave }
                >
                   <SaveAltIcon fontSize="large"/>
                </button>
            </div>

        </div>
    )
}
