import { CATEGORIES_ACTION_TYPES } from "./categories.types"

const CATEGORIES_INITIAL_STATE = {
    categories: [],
    isLoading: false,
    error: null,
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => {

    switch(action.type) {
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
            return { ...state, isLoading: true };
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
            return { ...state, isLoading: false, categories: action.payload }
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
            return { ...state, error: action.payload, isLoading: false };
        default:
            return state;
    }
}