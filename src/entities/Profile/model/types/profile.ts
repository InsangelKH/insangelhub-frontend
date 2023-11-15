export interface Profile {
    email: string,
    username: string;
    bio: string;
    image: string;
}

export interface ProfileSchema {
    data?: Profile;
    isLoading?: boolean;
    readonly?: boolean;
    error?: string;
}
