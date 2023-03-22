//basic angular service
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    
    constructor(private http: HttpClient, private db: AngularFirestore) { }

    public isAdmin(id: string): Observable<any> {
        return this.db.collection('admin').doc(id).get();
    }
}
