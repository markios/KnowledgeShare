import React, {useEffect, useReducer} from 'react';
import './users.css';
import Dialog from '../Dialog/Dialog';
import userHook from './userHook';
import UserDialogItem from './UserDialogItem';


const Users = () => {
  const {
    onClickHandler,
    onDialogClose,
    state,
  } = userHook();

  const {isLoading, users, showDialog, selectedUser} = state;

  return (
    <>
      <div className="users">
        {isLoading && <p className="users__loading">Loading</p>}
        {users && <p className="users__total">Total users {users.info.results}</p>}
        {users && users.results.map((r, i) => 
          <div key={r.id} className="users__user">
            <a className="users__user__a" onClick={onClickHandler} data-target={r.id} href="#">{r.name.title} {r.name.first} {r.name.last}</a>
          </div>
        )}
      </div>
      {showDialog &&
        <Dialog onClose={onDialogClose}>
          <UserDialogItem name={selectedUser.name} dob={selectedUser.dob} location={selectedUser.location} />
        </Dialog>
      }
    </>
  )
};

export default Users;