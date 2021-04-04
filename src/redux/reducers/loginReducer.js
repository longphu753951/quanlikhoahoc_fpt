import { POST_LOGIN_SUCCESS,POST_LOGIN_ERROR,DID_LOGIN_ACTION} from "../actions/actionTypes";

const intialState ={
    loading: false,
}

const loginReducer = (login = intialState,action)=>{
    try{
        switch(action.type){
            case POST_LOGIN_SUCCESS:
                return action.response;
            case POST_LOGIN_ERROR:
                return action.response
            case DID_LOGIN_ACTION:
                return 0;
            default:
                return login;
        }
    }catch(error){
        console.error(error);
    }
}

export default loginReducer;