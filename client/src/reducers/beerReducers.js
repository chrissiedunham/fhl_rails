export default (state = [], action) => {
  switch (action.type){
    case 'ADD_BEER_FORM':
      return [
        ...state,
        Object.assign({}, action.book)
      ];
    default:
			return state;
  }
};
