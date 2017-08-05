const initialState = {
  trc2201: [
    {lec1: "Mechanics"}
  ]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'z':
      return {
        ...state,
        [action.payload.series]: [...state[action.payload.series], action.payload.video]
      };
    default:
      return state;
  }
};
