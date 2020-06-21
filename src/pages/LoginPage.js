import React, { useReducer, useState, createContext } from 'react';
import { UsersCollection } from '../components/UsersList';
import { userInitialState, userReducer } from '../reducers/UserReducer';

export const LoginPage = () => {

  const [user, setUser] = useState({username: '', password: ''})

  const [state, dispatch] = useReducer(userReducer, userInitialState)
 
  const UseContext = createContext();

  const handleChanges = (e) => {
    setUser({ ...user,
      [e.target.name]: e.target.value
    });
  }

  const addUser = (user) => {
    const newUser = {
      username: user.username,
      password: user.password
    }
    dispatch({type: 'ADD_USER', payload: newUser})
    setUser({username: '', password: ''})
  }

  return(
    <>      
      <form style={{"display": "flex", "flex-direction": "column", "justify-content": "space-between"}} onSubmit={(e) => e.preventDefault()}>
        <h2>Login Component</h2>
        {/* manages own state **/}
        <small>( needs form validation )</small>

        <label>username</label>
        <input
          name='username'
          type='username'
          value={user.username}
          onChange={handleChanges}
        />

        <label>password</label>
        <input
          name='password'
          type='password'
          value={user.password}
          onChange={handleChanges}
        />

        <button onClick={() => addUser(user)} type="submit" >Go</button>

        <p>{JSON.stringify(user)}</p>
      </form>
      <UseContext.Provider value={state.users}>
        <UsersCollection users={state.users} />
      </UseContext.Provider>
    </>
  )
}


