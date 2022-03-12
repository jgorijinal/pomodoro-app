import React, {useEffect, useState} from 'react';
import { message } from 'antd';
import { useHistory} from 'react-router-dom';
import axios from '../../config/axios';
import Header from './Header'
import Todos from '../Todos/Todos';
import styled from 'styled-components';
type State = {
  user: any
}
const Main = styled.main ` 
  max-width:1000px;
  margin: 0 auto;
`
const Index: React.FC = () => {

  const [state, setSate] = useState<State>({user: {}});

  const history = useHistory();
  const getMe = async () => {                       //获取用户信息
    try {
      const response = await axios.get('/me');
      setSate({user: response.data});
    } catch (e: any) {
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
      <Main>
        <Todos />
      </Main>
    </div>
  );
};

export default Index;