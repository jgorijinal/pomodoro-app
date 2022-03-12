import React, {useState} from 'react';
import {message , Form, Input, Button, Checkbox} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {Link, useHistory} from 'react-router-dom';
import Wrapper from '../Wrapper';
import {RuleObject, StoreValue} from 'rc-field-form/lib/interface';
import axios from '../../config/axios';

type Validator = (rule: RuleObject, value: StoreValue, callback: (error?: string) => void) => Promise<void | any> | void;

const Login: React.FC = () => {
  const history = useHistory()

  const onFinish = (values: any) => {
    console.log('Success:', values);
    axios.post('sign_in/user' ,{
      account: values.username,
      password: values.password
    } ).then(()=>{
      message.success('登录成功',2.5)
      history.push('/')
      } ,
      ()=>{message.error('登录失败, 请重试' , 2.5)})
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const validatorUsername:Validator = (rule,value , callback) =>{
    if(!value){return Promise.reject('用户名不能为空') }
    if (/\W/.test(value)) {return Promise.reject('用户名只能是字母数者下划线')}
    if(value.length <6 || value.length > 15 ) {return Promise.reject('用户名的长度必须为6~15个字符')}
    return Promise.resolve()
  }
  return (
    <Wrapper>
      <h1 className={'title'}>番茄闹钟登录</h1>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item
          name="username"
          rules={[{validator:validatorUsername}]}
        >
          <Input   prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="请输入你的用户名" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '密码不能为空' }]}>
          <Input.Password  prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入你的密码"/>
        </Form.Item>

        <Form.Item >
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
      <div>
        <span>没有帐号？</span>
        <Link to={'/signUp'}>去注册</Link>
      </div>
    </Wrapper>
  );
};
export default Login;