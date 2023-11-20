export type ArticleType = 'IT' | 'ECONOMICS' | 'LIFE';

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
    createAt: string;
    updateAt: string;
    type: ArticleType[];
    blocks: BlockType[];
}

export interface ArticleSchema {
    article?: Article;
    isLoading?: boolean;
    error?: boolean;
}
