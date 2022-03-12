import React from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import {AlertOutlined, DownOutlined} from '@ant-design/icons';

const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: sans-serif;
  max-width: 1000px;
  padding: 14px;
  border-bottom: 1px solid #ddd;
  > .logo {
    font-size: 20px;
    font-weight: bold;
    svg {
      font-size: 1em;
      margin-right: 0.5em;
    }
  }
  .ant-dropdown-link {
  }
`;

type Props = {
  username : string
}
const Header: React.FC<Props> = (props) => {

  const history = useHistory();
  const logout = () => {                             //注销
    window.localStorage.setItem('x-token', '');
    history.push('/login');
  };
  const menu = (
    <Menu>
      <Menu.Item key="0">个人设置</Menu.Item>
      <Menu.Item key="1" onClick={logout}>注销</Menu.Item>
    </Menu>
  );
  return (
    <Wrapper>
      <span className={'logo'}><AlertOutlined />番茄闹钟</span>
      <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          {props.username} <DownOutlined />
        </a>
      </Dropdown>
    </Wrapper>
  );
};
export default Header;