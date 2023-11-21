import { Article } from 'entities/Article/model/types/article';

export enum ArticleView {
    BIG = 'BIG',
    SMALL = 'SMALL'
}

export interface ArticlesListSchema {
    articlesList?: Article[];
    articlesCount?: number;
    isLoading?: boolean;
    error?: string;
    view?: ArticleView;

    page: number;
}
