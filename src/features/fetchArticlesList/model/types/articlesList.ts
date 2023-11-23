import { Article } from 'entities/Article/model/types/article';

export enum ArticleView {
    BIG = 'BIG',
    SMALL = 'SMALL'
}

export type SortType = 'ASC' | 'DESC';

export interface ArticlesListSchema {
    articlesList?: Article[];
    articlesCount?: number;
    view?: ArticleView;
    sort?: string;
    isLoading?: boolean;
    error?: string;
}
