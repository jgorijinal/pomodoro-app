import React, {useEffect, useState} from 'react';
import {Button, message} from 'antd';
import {Link, useHistory} from 'react-router-dom';
import axios from '../../config/axios';
import Header from './Header'
import Todos from '../Todos/Todos';
type State = {
  user: any
}
const Index: React.FC = () => {

  const [state, setSate] = useState<State>({
    user: {}
  });

  const history = useHistory();
  const getMe = async () => {                       //获取用户信息
    try {
      const response = await axios.get('/me');
      console.log(response);
      setSate({user: response.data});
    } catch (e: any) {
      console.log('获取用户信息失败');
      if (e.response.status === 401) {
        message.warn(e.response.data.errors[0]);
        history.push('/login');
      }
    }
  };
  useEffect(() => {
    getMe();
  }, []);

  return (
    <div>
      <Header username={state.user.account} />
      <main>
        <Todos />
      </main>
    </div>
  );
};

export default Index;