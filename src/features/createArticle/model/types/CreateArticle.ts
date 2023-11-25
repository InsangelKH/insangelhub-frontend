import { ArticleType, BlockType } from 'entities/Article/model/types/article';

export interface CreateArticleSchema {
    title: string,
    subtitle: string,
    types: ArticleType[];
    blocks: BlockType[];
    isLoading?: boolean;
    error?: string;
}
