const initialState = false;

const addToBagReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOWSMALLBAG":
      return action.payload;
    default:
      return state;
  }
};

export default addToBagReducer;
