import { ArticleType, BlockType } from 'entities/Article/model/types/article';

export interface BlocksToCreateInterface {
    id: number,
    type: string,
}

export interface BlocksDataInterface {
    id: number,
    blockData: BlockType,
}

export interface CreateArticleSchema {
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
}
