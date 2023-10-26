import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { auth, store } from '@mr-pepper/firebase';
import { signOut } from 'firebase/auth';
import { ISession, InitISession } from '../pages/login/@types';

export const sessionSub = (fn: (session: ISession) => void) => {
  const uid = auth.currentUser?.uid;

  if (!uid) return;

  const startOfDay = new Date();

  const q = query(
    collection(store, 'sessions'),
    where(`token`, '==', auth.currentUser?.refreshToken),
    where(`user`, '==', doc(store, 'users', uid)),
    where('expired', '>=', startOfDay)
  );

  const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
    let res: ISession = InitISession;
    if (!QuerySnapshot.docs.length) {
      return signOut(auth);
    }
    QuerySnapshot.forEach((snapshot) => {
      const d = snapshot.data();
      d.uid = snapshot.id;
      d.user = getDoc(d.user).then((x: any) => ({ ...x.data(), uid: x.id }));
      res = d as ISession;
    });

    fn(res);
    return res;
  });
  return unsubscribe;
};
