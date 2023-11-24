import { User } from 'entities/User';

export type ArticleType = 'ALL' | 'IT' | 'ECONOMICS' | 'LIFE';

export interface TextBlock {
    type: 'TEXT';
    title: string;
    paragraphs: string[];
}

export interface CodeBlock {
    type: 'CODE';
    code: string;
}

export interface ImageBlock {
    type: 'IMAGE';
    src: string;
    title: string;
}

export type BlockType = TextBlock | CodeBlock | ImageBlock;

export interface Article {
    id: number;
    slug: string;
    title: string;
    subtitle: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    type: ArticleType[];
    blocks: BlockType[];
    author: User;
}

export interface ArticleSchema {
    article?: Article;
    isLoading?: boolean;
    error?: string;
}
