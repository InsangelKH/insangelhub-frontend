import {
    AnyAction,
    CombinedState, EmptyObject, MiddlewareArray, Reducer, ReducersMapObject, ThunkMiddleware, configureStore, getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { UserSchema, userReducer } from 'entities/User';
import { $api } from 'shared/api/api';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { ReducerManager, StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './reducerManager';

interface StoreType extends ToolkitStore<
    EmptyObject & StateSchema, AnyAction,
    MiddlewareArray<[ThunkMiddleware<CombinedState<StateSchema>, AnyAction, ThunkExtraArg>]>
> {
    reducerManager: ReducerManager;
}

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer as Reducer<UserSchema | undefined>,
    };

    const reducerManager = createReducerManager(rootReducers);

    const extraArg: ThunkExtraArg = {
        api: $api,
    };

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg,
            },
        }),
    });

    (store as StoreType).reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
