export interface User {
    id: string;
    email: string,
    username: string;
    bio: string;
    image: string;
    role: string;
    token: string;
}

export interface UserSchema {
    authData?: string;
    userData?: User;
    page: number;

    _inited: boolean;
}
