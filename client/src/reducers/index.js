import { combineReducers } from 'redux';
import books from './beerReducers'

export default combineReducers({
    books: books,
});
