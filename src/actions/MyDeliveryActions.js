export const MY_DELIVERY_LIST_SUCCESS = 'MY_DELIVERY_LIST_SUCCESS';
export const MY_DELIVERY_LIST_FAIL = 'MY_DELIVERY_LIST_FAIL';
export const MY_PULL_TO_REFRESH_DELIVERY = 'MY_PULL_TO_REFRESH_DELIVERY';
export const MY_PLAN_START_LOADING = 'MY_PLAN_START_LOADING';
import { My_DELIVERY } from '../constant/index';
/* eslint no-undef: "error"*/
/* eslint-env browser*/
export const getMyDeliveryList = (user_id) => {
  return function (dispatch) {
    var data ={
      "user_id":user_id,
      "previous":4
    };
    var request = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    };
    console.log("REQUEST", My_DELIVERY ,JSON.stringify(data), My_DELIVERY );
    fetch( My_DELIVERY , request)
      .then(function (response) {
        console.log("first response :",response);
        if (response.status !== 200) {
          throw new Error(response.json());
        }
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.messageId != 200) {
          throw new Error(responseJson.message);
        }
         else {
          console.log("responseJSon ====>",responseJson);
          dispatch({
            type: MY_DELIVERY_LIST_SUCCESS,
            payload: responseJson.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        dispatch({
          type: MY_DELIVERY_LIST_FAIL,
        });
      });
  };
};

export const myDeliveryStartLoading = () => {
  return {
    type: MY_PLAN_START_LOADING,
  };
};
export const pullToRefreshDeliveryList = () => {
  return {
    type: MY_PULL_TO_REFRESH_DELIVERY,
  };
};
