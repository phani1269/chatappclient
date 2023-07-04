import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  getDoc,
  query,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject, from, Observable, of, switchMap } from 'rxjs';
import { ProfileUser } from 'src/app/_models/user-profile';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {


  private currentUserSubject: BehaviorSubject<ProfileUser>;
  public currentUser: Observable<ProfileUser>;


  get currentUserProfile$(): Observable<ProfileUser | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<ProfileUser>;
      })
    );
  }

  get allUsers$(): Observable<ProfileUser[]> {
    const ref = collection(this.firestore, 'users');
    const queryAll = query(ref);
    return collectionData(queryAll) as Observable<ProfileUser[]>;
  }

  constructor(
    private firestore: Firestore,
    private authService: AuthenticationService
  ) { 
    
  }

  addUser(user: ProfileUser): Observable<any> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(setDoc(ref, user));
  }

  updateUser(user: ProfileUser): Observable<any> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(updateDoc(ref, { ...user }));
  }

  getUserById(userId: string): Observable<ProfileUser> {
    // const ref = collection(this.firestore, 'users');
    // const queryall = query(ref);
    // return collectionData(queryall) as Observable<ProfileUser>;

    const docRef = doc(this.firestore,'users', userId);
    return docData(docRef) as Observable<ProfileUser>;
  }
}
