export const CHANGE_EDIT_ACTION = "change_edit_action";
export const SELECT_EDIT_ACTION = "select_edit_action";

export function ChangeEditAction(isEdit:boolean) {
  return {
    type: CHANGE_EDIT_ACTION,
    isEdit
  } 
}

export function SelectEditAction(selectThing:ISelectThing){
  return {
    type: SELECT_EDIT_ACTION,
    selectThing
  }
}

export interface ISelectThing {
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  id: string;
}

export interface IChangeEditAction {
  type: string,
  isEdit: boolean
}

export interface ISelectEditAction {
  type: string,
  selectThing: ISelectThing,
}