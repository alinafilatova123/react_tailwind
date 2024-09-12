// Define a type for the slice state
export interface notesState {
    list: any[],
    reload: boolean,
    selected_note: {
        id?: string,
        title?: string,
        content?: string
    }
}

export interface NoteI {
    id?: undefined | string; 
    title?: string | undefined; 
    content?: string | undefined;
}

export type ApplicationAction = 
    | notesState;