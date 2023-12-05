import React from 'react';
import { useImmerReducer } from '@szzj/hooks';

const initialUser = {
  name: 'Alice',
  hobby: ['react', 'antd', 'redux'],
}

export default () => {
  const [user, dispatch] = useImmerReducer((state, action) => {
    switch (action.type) {
      case 'ADD_HOBBY':
        state.hobby.push(action.hobby)
    }
  }, initialUser);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1' }}>
        <p>{user.name}</p>
        <p>{user.hobby.join(',')}</p>
        <button
          onClick={() => {
            dispatch({
              type: 'ADD_HOBBY',
              hobby: 'js'
            });
          }}
        >
          add_hobby
        </button>
      </div>
    </div>
  );
};
