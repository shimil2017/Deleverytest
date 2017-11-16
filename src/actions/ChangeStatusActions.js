import { UPDATE_DEAL_STATUS } from '../constant/index';
export const UPDATE_DEAL_SUCCESS = 'UPDATE_DEAL_SUCCESS';
export const UPDATE_DEAL_FAIL = 'UPDATE_DEAL_FAIL';
export const LOADING_UPDATE_DEAL = 'LOADING_UPDATE_DEAL';
import { Actions } from 'react-native-router-flux';
export const updateDealStatus = (is_delivered, packId, planId, last_comment, rating, deal_id ) => {
return function (dispatch) {
    const data = { is_delivered: is_delivered ,last_comment: last_comment, rating: rating };
    const request = {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    }
    console.log('REQUEST',UPDATE_DEAL_STATUS+""+packId+"/"+planId+"/"+deal_id, request);
    fetch(UPDATE_DEAL_STATUS+""+packId+"/"+planId+"/"+deal_id, request)
      .then(function (response) {
        console.log(response);
        return response.json();
        })
      .then((responseJson) => {
        if (responseJson.messageId != 200) {
          throw new Error(responseJson.message);
        } else {
          alert(responseJson.message);
          dispatch({
            type: UPDATE_DEAL_SUCCESS,
            payload: responseJson,
          });
          Actions.pop();
          Actions.pop();
        }
})
.catch((error) => {
          console.log( "Error Forgot", error.message);
          alert(error.message);
          dispatch({
            type: UPDATE_DEAL_FAIL,
          });
        });
    };
  };
export const updateDealLoading = () => {
    return {
      type: LOADING_UPDATE_DEAL,
    };
  };
