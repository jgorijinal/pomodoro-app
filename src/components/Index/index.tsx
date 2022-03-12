import React, {useEffect, useState} from 'react';
import {Button, message} from 'antd';
import {Link, useHistory} from 'react-router-dom';
import axios from '../../config/axios';

type State = {
  user: any
}
const Index: React.FC = () => {
  const [state, setSate] = useState<State>({
    user: {}
  });
  const history = useHistory();
  const logout = () => {
    window.localStorage.setItem('x-token', '');
    history.push('/login');
  };

  const getMe = async () => {
    try {
      const response = await axios.get('/me');
      console.log(response);
      setSate({user: response.data});
    } catch (e) {
      console.log(e.response)
      console.log('获取用户信息失败');
      // if(e.response.status === 401){
      //   message.warn(e.response.data.errors[0])
      //   history.push('/login')
      // }
    }
  };
  useEffect(() => {
    getMe();
  }, []);


  return (
    <div>
      {state.user.id}
      <Button onClick={logout}>注销</Button>
    </div>
  );
};

export default Index;