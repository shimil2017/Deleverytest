export const MY_PREVIOUS_START_LOADING="MY_PREVIOUS_START_LOADING";
export const MY_PREVIOUSPOST_LIST_SUCCESS='MY_PREVIOUSPOST_LIST_SUCCESS';
export const MY_PREVIOUSPOST_LIST_FAIL='MY_PREVIOUSPOST_LIST_FAIL';
export const MY_PREVIOUSPOST_PULLTOREFRESH='MY_PREVIOUSPOST_PULLTOREFRESH';
import {My_PREVIOUS} from '../constant/index'
export const getMyPreviousList=(user_id)=> {
    return function(dispatch){
        var data ={
            "user_id":user_id,
            "previous":4
        };
        var request={
            headers:{
                "Content-type":'application/json'
            },
            method:'POST',
            body:JSON.stringify(data)
        };
        console.log("requestprevious",My_PREVIOUS,JSON.stringify(data),My_PREVIOUS);
        fetch(My_PREVIOUS,request)
        .then(function(response){
            if(response.status!==200){
                throw new Error(response.json());
            }
            return response.json();

        })
        .then(function(responseJson){
            if(responseJson.messageId!==200){
            throw new Error(responseJson.message);
            }else{
                dispatch({
                    type:MY_PREVIOUSPOST_LIST_SUCCESS,
                    payload:responseJson,
                });
            }

        })
        .catch((error)=>
        {
            alert(error);
            dispatch({
                type:MY_PREVIOUSPOST_LIST_FAIL,
            });
        });
    };
};
export const myPreviouspostStartLoading=()=>{
    return{
        type:MY_PREVIOUS_START_LOADING,
    };
};
export const myPulltorefreshPreviousPost=()=>{
    return{
        type:MY_PREVIOUSPOST_PULLTOREFRESH,
    };
};
