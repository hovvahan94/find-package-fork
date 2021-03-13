import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getForks = createAsyncThunk('forks/getForks',
    async ({ owner, repoName, page = null }, { dispatch, getState }) => {
        // const store = getState() // this gives all state here

        // const params = new URLSearchParams({ page })

        
        /* const response = await fetch(`https://api.github.com/repos/${owner}/${repoName}/forks${params ? '?' + params.toString() : ''}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/vnd.github.v3+json'
            }
        }) */

        const params = new URLSearchParams({ page, owner, repoName })

        const response = await fetch(`http://localhost:3000/forks${params ? '?' + params.toString() : ''}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/vnd.github.v3+json'
            }
        })

        return response.json()
    })

export const forksSlice = createSlice({
    name: 'forks',
    initialState: {
        status: '',
        owner: '',
        repoName: '',
        data: [],
        error: ''
    },
    extraReducers: {
        [getForks.pending]: (state, action) => {
            state.status = 'pending'
            state.error = ''
            state.data = []
        },
        [getForks.fulfilled]: (state, action) => {
            console.log(action)
            if (action.payload.message) {
                state.status = 'failed'
                state.error = action.payload.message
            } else {
                state.owner = action.meta.arg.owner.slice(1)
                state.repoName = action.meta.arg.repoName.slice(1)
                state.data = action.payload
                state.status = 'success'
            }
        },
        [getForks.rejected]: (state, action) => {
            console.log(action)
            state.data = action.payload
            state.status = 'failed'
        }
    }
});

// export const {  } = counterSlice.actions;

export const selectForksStatus = state => state.forks.status;
export const selectForksData = state => state.forks.data;
export const selectForksError = state => state.forks.error;

export default forksSlice.reducer;
