import { ActionReducer, Action } from '@ngrx/store';

export const UPDATE_QUERY = 'UPDATE_QUERY';
export const UPDATE_FILTER = 'UPDATE_FILTER';

export interface PlayerSearch {
    query: string,
    filter: string
}
let initialState: PlayerSearch = {
    query: '',
    filter: ''
}
export const search: ActionReducer<PlayerSearch> = (state: PlayerSearch = initialState, action: Action) => {

    switch (action.type) {
        case UPDATE_QUERY:
            return Object.assign({}, state, { query: action.payload });

        case UPDATE_FILTER:
            return state;

        default:
            return state;
    }
}
