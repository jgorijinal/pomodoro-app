import React from 'react';
import {Button} from 'antd';
import {Link, useHistory} from 'react-router-dom';

const Index: React.FC = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/login');
  };
  return (
    <div>
      <Button onClick={handleClick}>跳转</Button>
    </div>
  );
};

export default Index;