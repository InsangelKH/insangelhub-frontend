import { User } from 'entities/User';

export interface Comment {
    id: number;
    text: string;
    author: User;
}

export interface CommentSchema {
    text?: string;
    commentList?: Comment[];
    error?: string;
    isLoading?: boolean;
}
