import {
  createAsyncThunk,
  createSlice,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
//   import { IFriendRequest } from "../@types/friend";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from 'firebase/firestore';
//   import { auth, store } from "../../lib/firebase";
//   import { ISession, IUser, InitISession } from "../@types/auth";
//   import { InferType } from "yup";
//   import { isEmailSchema } from "../../validate/user";
//   import { sendSingleNoti } from "../../api/sendSingleNoti";

type IState = {
  loading: boolean;
  // searchEmail: InferType<typeof isEmailSchema>;
  // searchPopup: boolean;
  // searchedFriend: ISession;
};

const initialState: IState = {
  loading: false,
  // searchEmail: "",
  // searchPopup: false,
  // searchedFriend: InitISession,
};

// export const thunkSearchFriendByEmail = createAsyncThunk(
//   'search-friend-by-email',
//   async (arg: { email: string }) => {
//     console.log('fire');
//     const { email } = arg;
//     const q = query(
//       collection(store, 'sessions'),
//       where('email', '==', email),
//       limit(1)
//     );
//     return await getDocs(q)
//       .then(async (x) => {
//         if (x.docs.length) {
//           const d = x.docs[0];
//           return {
//             ...d.data(),
//             uid: d.id,
//             user: await getDoc(d.data().user).then((x: any) => ({
//               ...x.data(),
//               uid: x.id,
//             })),
//           };
//         }
//         throw new Error('User not found');
//       })
//       .catch((e) => {
//         throw new Error(
//           JSON.stringify({
//             status: false,
//             message: e.message,
//           })
//         );
//       });
//   }
// );

// export const thunkSendFriendRequest = createAsyncThunk(
//   'send-friend-request',
//   async (arg: IFriendRequest) => {
//     const { receiverId, messageToken } = arg;
//     return addDoc(collection(store, 'friend-request'), {
//       sender: doc(store, `users/${auth.currentUser?.uid}`),
//       receiver: doc(store, `users/${receiverId}`),
//       createdAt: new Date(),
//     })
//       .then(() => {
//         sendSingleNoti(
//           {
//             message: `${auth.currentUser?.email} has sent friend request`,
//             description: `Hello, my name is ${auth.currentUser?.displayName}. Let's be friend.`,
//             icon: auth.currentUser?.photoURL,
//           },
//           messageToken
//         );
//         return { message: 'Request has been sent', status: true };
//       })
//       .catch((e) => {
//         throw new Error(
//           JSON.stringify({
//             status: false,
//             message: e.message,
//           })
//         );
//       });
//   }
// );

export const friendSlice = createSlice({
  name: 'friendSlice',
  initialState,
  reducers: {
    // setSearchEmail: (state: State, action) => {
    //   state.searchEmail = action.payload;
    // },
    // setPopup: (state: State, action) => {
    //   state.searchPopup = action.payload;
    // },
    // resetSearchedFriend: (state: State) => {
    //   state.searchedFriend = InitISession;
    // },
  },
  extraReducers: (buider: ActionReducerMapBuilder<IState>) => {
    // buider.addCase(
    //   thunkSearchFriendByEmail.fulfilled,
    //   (state: State, action) => {
    //     console.log(action);
    //     state.searchedFriend = action.payload as ISession | any;
    //   }
    // );
    // buider.addCase(
    //   thunkSearchFriendByEmail.rejected,
    //   (state: State, action) => {
    //     console.log(action);
    //   }
    // );
    // addCase before addMatcher
    buider.addMatcher(
      (action) => {
        return action.type.indexOf('pending') !== -1;
      },
      (state: IState, action) => {
        state.loading = true;
      }
    );
    buider.addMatcher(
      (action) => {
        return action.type.indexOf('fulfilled') !== -1;
      },
      (state: IState, action) => {
        state.loading = false;
      }
    );
    buider.addMatcher(
      (action) => {
        return action.type.indexOf('rejected') !== -1;
      },
      (state: IState) => {
        state.loading = false;
      }
    );
  },
});
