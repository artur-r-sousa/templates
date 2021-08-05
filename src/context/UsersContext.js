import React, { createContext, useReducer } from 'react';
import { act } from 'react-test-renderer';
import users from '../data/users';

const initialState = { users }
const UsersContext = createContext({});

const actions = {
    updateUser(state, action) {
        const updated = action.payload
        return {
            ...state,
            users: state.users.map(u => u.id === updated.id ? updated : u)
        }
    },

    createUser(state, action) {
        const user = action.payload
        user.id = Math.random()
        return {
            ...state,
            users: [...state.users, user]
        }
    },

    deleteUser(state, action) {
        const user = action.payload
        return{
            //se tiver mais de um elemento no estado, copia o state com spread, pra nao ter erro.
            //...state,
            users: state.users.filter(u => u.id !== user.id)
        }
    }


}

//gerencia as informações do estado
export const UsersProvider = props => {

    //um tipo de controle para qual ação o estado deve realizar
    function reducer(state, action) {
        const fn = actions[action.type]
        return fn? fn(state, action) : state;
    }

    const [state, dispatch] = useReducer(reducer, initialState) 

    return (
        <UsersContext.Provider value={{ state , dispatch }}>
                {props.children}
        </UsersContext.Provider>
    );
}

export default UsersContext;