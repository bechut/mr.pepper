import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';

type IState = {
  alert: {
    message: string;
    status: boolean;
    show: boolean;
  };
};

const initialState: IState = {
  alert: {
    message: '',
    status: false,
    show: false,
  },
};

function errorHandler(state: IState, errorMsg: string) {
  let error: {
    message: string;
    status: boolean;
    show: boolean;
  };
  try {
    error = JSON.parse(errorMsg);
  } catch (e) {
    error = {
      message: errorMsg,
      status: false,
      show: true,
    };
  }
  state.alert = {
    message: error.message,
    status: error.status,
    show: true,
  };
}

const routerSlice = createSlice({
  name: 'routerSlice',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.alert = {
        show: true,
        message: action.payload.message,
        status: action.payload.status,
      };
    },
    resetAlert: (state) => {
      state.alert = initialState.alert;
    },
  },
  extraReducers: (buider: ActionReducerMapBuilder<IState>) => {
    buider.addMatcher(
      (action) => {
        return action.type.indexOf("fulfilled") !== -1;
      },
      (state: IState, action) => {
        if (action.payload?.message && action.payload?.status)
          errorHandler(state, JSON.stringify(action.payload));
      }
    );
    buider.addMatcher(
      (action) => {
        return action.type.indexOf("rejected") !== -1;
      },
      (state: IState, action) => {
        if (action.error.message) errorHandler(state, action.error.message);
      }
    );
  },
});

export default routerSlice;
