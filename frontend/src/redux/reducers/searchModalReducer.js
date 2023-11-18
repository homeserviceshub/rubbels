const initialState = {
  isModalOpen: false,
};

const searchModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_SEARCH_MODAL":
      return { ...state, isModalOpen: true };
    case "CLOSE_SEARCH_MODAL":
      return { ...state, isModalOpen: false };
    default:
      return state;
  }
};

export default searchModalReducer;
