import { useNavigate } from 'react-router-dom';
import { useEffect, useState, memo } from 'react';

import { useAppDispatch, useAppSelector } from "../utils/hooks";
import type { RootState } from '../store';
import Note from "../components/Note";
import Button from "../components/CustomButton";
import { NoteI } from '../types';
import { getNotes } from '../store/slices/notesSlice';

const AllNotes = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const stateData = useAppSelector((state:RootState) => state.notes)
    const shouldReaload = useAppSelector((state:RootState) => state.notes.reload)

    let [ notes, setNotes ] = useState([] as NoteI[]);
    let [ loading, setLoading ] = useState(true);

    // получаем заметки
    useEffect(() => {
        dispatch(getNotes()).then((res)=>{
            setLoading(res?.meta?.requestStatus !== 'fulfilled')
        })
    }, [])

    // получаем заметки после удаления одной из заметок
    useEffect(() => {
        if (shouldReaload) dispatch( getNotes() );
    }, [shouldReaload])
    
    useEffect(() => {
        setNotes(stateData.list)
    }, [stateData.list])

    // переходим на /notes/new для добавления заметки
    const addNoteHandler = () => {
        navigate('/notes/new')
    }

    return (
        <div className='mt-10'>
            <div className='flex justify-between px-7 mb-7'>
                <div className='text-3xl font-bold'>
                    Заметки
                </div>
                <Button onClick={addNoteHandler}>Добавить заметку</Button>
            </div>
            {!notes?.length 
            ? <div className="mt-10 pl-7 pt-7 pb-7 bg-indigo-300 text-white">
                {loading ? 'Загрузка ...' : 'Заметок нет!'}
            </div>
            : <div className='mt-10 bg-indigo-300'>
                    {notes.map(note => {
                        return (
                            <div key={note.id}>
                                <Note id={note.id} title={note.title} content={note.content}/>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default memo(AllNotes);