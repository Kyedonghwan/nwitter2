import { combineReducers } from "redux";
import { CHANGE_EDIT_ACTION, IChangeEditAction, ISelectEditAction, SELECT_EDIT_ACTION } from "./actions/actions";

const isEditReducer = (state=false, action: IChangeEditAction ) => {
  switch(action.type) {
    case CHANGE_EDIT_ACTION:
      return !state
    default:
      return state
  } 
}

const selectEditReducer = (state={}, action: ISelectEditAction) => {
  switch(action.type) {
    case SELECT_EDIT_ACTION:
      return {...action.selectThing}
    default:
      return state
  } 
}

export default function Reducers () {
  combineReducers({
    isEdit: isEditReducer,
    editObj: selectEditReducer
  })
}