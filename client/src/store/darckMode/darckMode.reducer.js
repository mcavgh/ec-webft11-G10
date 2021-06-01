import {
    DARCK_MODE
} from "./darckMode.action";

var initialState = {
    darckModeState: ""
};

const DarckModeReducer = (state = initialState, action) => {
    switch (action.type) {
        case DARCK_MODE:
            return {
                ...state,
                darckModeState,
            }

    }
}

export default DarckModeReducer;