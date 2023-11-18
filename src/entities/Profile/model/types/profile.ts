export interface Profile {
    id?: string;
    email?: string,
    username?: string;
    bio?: string;
    image?: string;
}

export interface ProfileSchema {
    data?: Profile;
    form?: Profile;
    imageFile?: File;
    isLoading?: boolean;
    readonly?: boolean;
    error?: string;
    emptyField?: boolean;
}
