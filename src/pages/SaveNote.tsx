import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, memo } from "react";

import { useAppDispatch, useAppSelector } from "../utils/hooks";
import type { RootState } from '../store'
import { getNoteById, saveNoteById } from "../store/slices/notesSlice";
import Button from "../components/CustomButton";
import { NoteI } from "../types";

const SaveNote = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const stateData = useAppSelector((state:RootState) => state.notes)
    let { id } = useParams();
    const selectedNote = stateData.selected_note;

    let [ noteData, setNoteData ] = useState({} as NoteI)

    useEffect(()=>{
        if(id !== "new") setNoteData(selectedNote);
    }, [id, selectedNote]);


    // получаем данные заметки
    useEffect(()=>{
        if(id === "new"){
            setNoteData({
                id: "new",
                title: "",
                content: ""
            });
        } else {
            dispatch( getNoteById(id));
        }
    }, [id])
    
    // сохраняем
    const saveNoteHandler = () => {
        dispatch( saveNoteById(noteData) ).then(()=>{
            navigate("/notes");
        })
    }

    return (
        <div className="mt-10">
            <div className="flex justify-between px-7 mb-7">
                <div className="text-3xl text-zinc-900 font-bold">
                    {id === 'new' ? 'Создать': 'Редактировать'} заметку
                </div>
                <div className="actions">
                    <Button className="mr-5" onClick={ () => navigate("/notes") }>Назад</Button>
                    <Button onClick={ saveNoteHandler }>Сохранить</Button>
                </div>
            </div>
            <div className="mt-10">
                <div className="flex mb-5">
                    <div className="w-4/12 text-end mr-32">Название заметки</div>
                    <div className="w-8/12">
                        <input 
                            type = "text" 
                            value = { noteData.title }
                            onChange = { (e) => setNoteData({ ...noteData, title:e.target.value }) }
                            className="w-96 border px-1 border-indigo-400 focus:outline-none" 
                        />
                    </div>
                </div>
                <div className="flex mb-5">
                    <div className="w-4/12 text-end mr-32">Содержание заметки</div>
                    <div className="w-8/12">
                        <textarea 
                            value = { noteData.content }
                            onChange = { (e) => setNoteData({ ...noteData, content:e.target.value }) }
                            className="w-8/12 border border-indigo-400 p-1 h-36 focus:outline-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(SaveNote)