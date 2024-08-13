// const initialState = false;

// const addToBagReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "SHOWSMALLBAG":
//       return action.payload;
//     default:
//       return state;
//   }
// };

// export default addToBagReducer;
const initialState = {
  showSmallCart: false,
  productData: null,
};

const addToBagReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOWSMALLBAG":
      return {
        ...state,
        showSmallCart: action.payload.showSmallCartValue,
        productData: action.payload.productData,
      };
    default:
      return state;
  }
};

export default addToBagReducer;
