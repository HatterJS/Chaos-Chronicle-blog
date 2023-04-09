import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios.js';

export const fetchAnswers = createAsyncThunk(
  'answers/fetchAnswers',
  async (id) => {
    try {
      const { data } = await axios.get(`/answers/${id}`);
      return data;
    } catch (err) {
      const { message } = err.response.data;
      throw new Error(message);
    }
  }
);

export const fetchAddAnswer = createAsyncThunk(
  'answers/fetchAddAnswer',
  async (answer) => {
    try {
      const { data } = await axios.post('/answer', answer);
      return data;
    } catch (err) {
      const { message } = err.response.data;
      throw new Error(message);
    }
  }
);

const initialState = {
  answers: {},
  status: 'loading',
};

const answersSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    removeAnswer: (state, action) => {
      const { commentId, answerId } = action.payload;
      state.answers[commentId] = state.answers[commentId].filter(
        (item) => item._id !== answerId
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnswers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAnswers.fulfilled, (state, action) => {
        const { commentId, answers } = action.payload;
        state.answers[commentId] = answers;
        state.status = 'loaded';
      })
      .addCase(fetchAnswers.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchAddAnswer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddAnswer.fulfilled, (state, action) => {
        const { commentId, answer } = action.payload;
        state.answers[commentId] = [...state.answers[commentId], answer];
        state.status = 'loaded';
      })
      .addCase(fetchAddAnswer.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { removeAnswer } = answersSlice.actions;
export default answersSlice.reducer;
