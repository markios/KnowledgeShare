import React from 'react';
import { connect } from 'react-redux'
import './users.css';
import Dialog from '../Dialog/Dialog';
import UserDialogItem from './UserDialogItem';
import { getUsers } from '../../store/thunks/users'

class Users extends React.Component {
  componentDidMount() {
    this.props.loadUsers()
  }

  render() {
    const { users, onClickHandler, onDialogClose, isLoading, showDialog, selectedUser } = this.props;
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
  }
}

const mapStateToProps = state => ({
  ...state.users
})

const mapDispatchToProps = dispatch => ({
  onClickHandler: e => dispatch({
    type: "SHOW_USER",
    payload: Number(e.currentTarget.dataset.target)
  }),
  onDialogClose: () => dispatch({ type: "RESET" }),
  loadUsers: () => dispatch(getUsers())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);