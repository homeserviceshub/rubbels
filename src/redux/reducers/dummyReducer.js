const initialState = "harman";

const DummyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "check":
      return action.payload;
    default:
      return state;
  }
};

export default DummyReducer;
