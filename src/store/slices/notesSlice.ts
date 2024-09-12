import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { notesState } from '../../types'
import { notes } from '../API'

// определяем initialState
const initialState: notesState = {
  list: [],
  reload: false,
  selected_note: {
    id: "",
    title: "",
    content: ""
  }
}

// получаем все заметки
export const getNotes = createAsyncThunk(
  'notes/getdata',
  async () => {
    const response = await notes.getData();
    return response.data;
  }
);

// получаем заметку по id
export const getNoteById = createAsyncThunk(
  'notes/getdataById',
  async (id:string | undefined) => {
    const response = await notes.getDataById(id);
    return response.data;
  }
);

// удаляем заметку по id
export const deleteNoteById = createAsyncThunk(
  'notes/deleteDataById',
  async (id:string | undefined) => {
    const response = await notes.deleteDataById(id);
    return response.data;
  }
);

// обнавляем заметку по id
export const saveNoteById = createAsyncThunk(
  'notes/saveDataByPid',
  async (data:any) => {
    if(data.id === "new"){
      let response = await notes.saveNewData(data); 
      return response.data;
    } else {
      let response = await notes.saveDataById(data.id, data);
      return response.data;
    }
  }
);

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  
  reducers: {
    saveNote: (state: any, action: PayloadAction<object>) => {}
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.fulfilled, (state, action) => {
        state.list = action.payload;
        state.reload = false;
      })
      .addCase(getNoteById.fulfilled, (state, action) => {
        state.selected_note = action.payload;
      })
      .addCase(deleteNoteById.fulfilled, (state) => {
        state.reload = true;
      })
      .addCase(deleteNoteById.rejected, (state) => {
        state.reload = false;
      })
  },
});

export const { saveNote } = notesSlice.actions;

export default notesSlice.reducer;
