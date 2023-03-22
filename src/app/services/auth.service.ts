import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { browserSessionPersistence, getAuth, setPersistence } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        public afAuth: AngularFireAuth // Inject Firebase auth service
    ) { }

    //sign in with email
    async SignIn(email:string, password:string) {
        return this.afAuth.signInWithEmailAndPassword(email, password);
    }

    //get auth token
    getAuthToken() {
        return this.afAuth.currentUser.then(user => {
            return user?.getIdToken();
        });
    }
    
    // get auth user
    getAuthUser() {
        console.log(this.afAuth.currentUser);
        return this.afAuth.currentUser;
    }
    
    //is loggeg in
    isLoggedIn() {
        return this.afAuth.currentUser.then(user => {
            return user != null;
        });
    }

    //logout
    SignOut() {
        return this.afAuth.signOut();
    }


}