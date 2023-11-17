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
    isLoading?: boolean;
    readonly?: boolean;
    error?: string;
}
