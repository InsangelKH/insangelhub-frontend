import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ArticleSchema } from 'entities/Article';
import { ProfileSchema } from 'entities/Profile';
import { UserSchema } from 'entities/User/model/types/user';
import { CreateArticleSchema } from 'features/createArticle';
import { ArticlesListSchema } from 'features/fetchArticlesList';
import { LoginSchema } from 'features/loginByUsername';
import { RegisterSchema } from 'features/registerUser';

export interface StateSchema {
    user?: UserSchema
    // async reducers
    loginForm?: LoginSchema;
    registerForm?: RegisterSchema;
    profile?: ProfileSchema;
    article?: ArticleSchema;
    articlesList?: ArticlesListSchema;
    createArticle?: CreateArticleSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
