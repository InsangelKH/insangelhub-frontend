import { Article, ArticleType } from 'entities/Article/model/types/article';

export enum ArticleView {
    BIG = 'BIG',
    SMALL = 'SMALL'
}

export type SortType = 'ASC' | 'DESC';

export interface ArticlesListSchema {
    articlesList?: Article[];
    articlesCount?: number;
    view?: ArticleView;
    sort?: SortType;
    isLoading?: boolean;
    error?: string;
    search?: string;
    type: ArticleType;
    offset: number;
}
