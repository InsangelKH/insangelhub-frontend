import { Article } from 'entities/Article/model/types/article';

export interface ArticlesListSchema {
    articlesList?: Article[];
    articlesCount?: number;
    isLoading?: boolean;
    error?: string;
}
