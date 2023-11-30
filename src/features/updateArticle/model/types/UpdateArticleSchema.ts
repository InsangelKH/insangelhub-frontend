import { Article, ArticleType } from 'entities/Article/model/types/article';
import { BlocksDataInterface, BlocksToCreateInterface } from 'features/createArticle/model/types/CreateArticleSchema';

export interface UpdateArticleSchema {
    title: string,
    subtitle: string,
    types: ArticleType[];
    blocks: BlocksDataInterface[];
    blocksToCreate: BlocksToCreateInterface[];
    imageFile?: File;
    files: File[];
    image?: string;
    isLoading?: boolean;
    error?: string;
    edited?: boolean;
    articleResponse?: Article;
    emptyFieldError?: boolean;
}
