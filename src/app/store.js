import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import forksReducer from '../reducers/forks/forksSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    forks: forksReducer
  },
});
