export interface ILogin {
  email: string;
  password: string;
}
export interface IUser {
  uid: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  displayName: string;
  email: string;
  photoUrl?: string;
  dob?: string;
  gender?: string;
}

export type ISession = {
  email: string;
  expired: Date;
  ip: string;
  messagingToken: string;
  token: string;
  ua: string;
  user: IUser;
};

export const InitIUser: IUser = {
    uid: '',
    avatar: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    displayName: '',
    email: '',
    photoUrl: '',
    dob: '',
    gender: '',
  };
  
  export const InitISession: ISession = {
    email: '',
    expired: new Date(),
    ip: '',
    messagingToken: '',
    token: '',
    ua: '',
    user: InitIUser,
  };