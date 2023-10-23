import { createSlice } from '@reduxjs/toolkit';

type IState = {
  sample: string;
};

const initialState: IState = { sample: '' };

const sampleSlice = createSlice({
  name: 'sampleSlice',
  initialState,
  reducers: {
    sample: (state) => {
      state.sample = 'sample';
      console.log('sample');
    },
  },
});

export default sampleSlice;
