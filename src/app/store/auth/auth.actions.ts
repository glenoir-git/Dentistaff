import { User } from "../../entity/user";

export class Login {
    static readonly type = '[Auth] Login';
    constructor(public payload: { email: string, password: string }) { }
}

export class Logout {
    static readonly type = '[Auth] Logout';
}

export class SetUser {
    static readonly type = '[Auth] Set User';
    constructor(public user: User) { }
}

export class Register {
    static readonly type = '[Auth] Register';
    constructor(public payload: {email: string, password: string, firstName: string, lastName: string}) { }
}
