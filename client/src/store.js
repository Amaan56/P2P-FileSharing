
import { createStore, combineReducers } from 'redux';
import FileReducer from './reducers/FileReducer';

const rootReducer = combineReducers({
    file: FileReducer
});

const configureStore = () => {
  return createStore(rootReducer);
}

export default configureStore;