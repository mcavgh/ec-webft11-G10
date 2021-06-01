
export const DARCK_MODE = "DARCK_MODE";


export const switchDark= (darckmode) => {
       return (dispatch) => {
        dispatch({type: DARCK_MODE, payload:darckmode})
      }
    };
