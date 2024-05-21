import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import instance from "../api/axios.ts";



interface IMessage {
    id:string;
    author:string;
    message:string;
    date:string
}



interface State {
    messages: IMessage[];
    error: Error | null;
    loading: boolean;
}



const initialState: State = {
    messages: [],
    error: null,
    loading: false,
};

export const fetchMessage = createAsyncThunk('/message/get', async () => {
        const response = await instance.get<IMessage[]>('/messages');
        return response.data
});

export const createMessage = createAsyncThunk('/message/post', async (payload:Omit<IMessage, 'id' | 'date'>) => {
            const response = await instance.post('messages' , payload);
            return response.data;
})

export const deleteMessage = createAsyncThunk('/message/delete', async (id:string) => {
    const response = await instance.delete(`messages/${id}`);
    return response.data;
})

// Assuming you have an API function like this in your instance file
export const editMessageAPI = async (id: string, updatedMessage: Omit<IMessage, 'id' | 'date'>): Promise<IMessage> => {
    const response = await instance.put(`messages/${id}`, updatedMessage);
    return response.data;
};

export const editMessage = createAsyncThunk('/message/put', async ({ id, updatedMessage }: { id: string; updatedMessage: Omit<IMessage, 'id' | 'date'> }) => {
    const response = await editMessageAPI(id, updatedMessage);
    return response;
});






const messageSlice = createSlice({

  name: 'message',

  initialState,

  reducers: {},

  extraReducers: builder => {

    builder

        .addCase(fetchMessage.fulfilled, (state, action) => {

          state.messages = action.payload;

          state.loading = false;

        })

        .addCase(fetchMessage.rejected, (state, action) => {

          state.error = action.error as Error;

          state.loading = false;

        })

        .addCase(fetchMessage.pending, (state) => {

          state.loading = true;

        })
        .addCase(editMessage.fulfilled, (state, action) => {
            const index = state.messages.findIndex((message) => message.id === action.payload.id);

            if (index !== -1) {
                state.messages[index] = action.payload;
            }

            state.loading = false;
        })

        .addCase(editMessage.rejected, (state, action) => {
            state.error = action.error as Error;
            state.loading = false;
        })

        .addCase(editMessage.pending, (state) => {
            state.loading = true;
        });

  }

})



export const messageReducer = messageSlice.reducer;

