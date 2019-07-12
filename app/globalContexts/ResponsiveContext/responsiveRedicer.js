import { TOGGLE_FORCE_SHOW_SIDEBAR } from "./responsiveActions";

const initialState = {
  drawer: {
    hidden: false,
    forceShow: false
  }
};

export default function responsiveReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_FORCE_SHOW_SIDEBAR:
      return;

    default:
      return state;
  }
}
