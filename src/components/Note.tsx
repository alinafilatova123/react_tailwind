import { useNavigate } from "react-router-dom";
import { memo } from 'react';

import trashIcon from '../icons/trash.svg'
import editIcon from '../icons/edit.svg'
import { useAppDispatch } from "../utils/hooks";
import { NoteI } from "../types";
import { deleteNoteById } from "../store/slices/notesSlice";

const Note = ({title, content, id}:NoteI) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // переходим на страницу редактирования заметки 
    const navigateHandler = () => {
        navigate(`/notes/${id}`);
    }

    // удаляем заметку
    const deleteHandler = () => {
        dispatch(deleteNoteById(id))
    }

    return (
        <div
            className="pl-7 p-3 w-full border-b border-white flex flex-col justify-start "
        >
            <div className="flex gap-2 items-center mb-2">
                <span className="text-indigo-800 font-semibold text-lg">
                    {title}
                </span>
                <div className="flex gap-1 h-15 w-15 items-center cursor-pointer">
                    <div onClick={navigateHandler}>
                        <img src={editIcon} alt="edit" />
                    </div>
                    <div onClick={deleteHandler}>
                        <img src={trashIcon} alt="trash" />
                    </div>
                </div>
            </div>
            
            <div className="font-light text-white text-left text-lg">
                {content}
            </div>
        </div>
    )
}

export default memo(Note);