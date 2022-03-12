import React, {useState} from 'react';
import {message, Button, Form, Input} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Link, useHistory} from 'react-router-dom';
import Wrapper from '../Wrapper';
import axios from '../../config/axios';
import {RuleObject, StoreValue} from 'rc-field-form/lib/interface';

type Validator = (rule: RuleObject, value: StoreValue, callback: (error?: string) => void) => Promise<void | any> | void;


const SignUp: React.FC = () => {
  const history = useHistory()
  const onFinish = (values: any) => {
    console.log('Success:', values);
    axios.post('sign_up/user', {
      account: values.username,
      password: values.password,
      password_confirmation: values.passwordConfirmation
    }).then(() => {
        message.success('注册成功', 3)
        history.push('/login');},
      () => {
      message.warn('用户名已存在, 请重试', 3); });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const validatorUsername: Validator = (rule, value, callback) => {
    if (!value) {return Promise.reject('用户名不能为空'); }
    if (/\W/.test(value)) {return Promise.reject('用户名只能是字母数者下划线');}
    if (value.length < 6 || value.length > 20) {return Promise.reject('用户名的长度必须为6~20个字符');}
    return Promise.resolve();
  };
  const validatorPassword: Validator = (rule, value) => {
    if (!value) {return Promise.reject('密码不能为空'); }
    if (value.length < 6 || value.length > 15) {return Promise.reject('密码的长度必须为6~15个字符');}
    return Promise.resolve();
  };
  return (
    <Wrapper>
      <h1 className={'title'}>番茄闹钟注册</h1>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item
          name="username"
          rules={[{validator: validatorUsername}]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="请输入你要创建的用户名"/>
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{validator: validatorPassword}]}>
          <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>} placeholder="请设置你的密码"/>
        </Form.Item>

        <Form.Item
          name="passwordConfirmation"
          rules={[{required: true, message: '请再次确认密码'},
            ({getFieldValue}) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致'));
              },
            }),
          ]}>
          <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>} placeholder="再次确认密码"/>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            创建账户
          </Button>
        </Form.Item>
      </Form>
      <div>
        <span>已有帐号？</span>
        <Link to={'/login'}>去登录</Link>
      </div>
    </Wrapper>
  );
};
export default SignUp;