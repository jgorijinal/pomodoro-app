import React, {useEffect, useState} from 'react';
import TodoInput from './TodoInput';
import axios from '../../config/axios';
import styled from 'styled-components';
import TodoItem from './TodoItem';

const TodoWrapper = styled.div`
  padding: 16px;
  margin: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;


const Todos: React.FC = () => {
  const [todoList , setTodoList] = useState<any[]>([])

  const addTodo = async (params: {}) => {                   //添加一个任务到列表 函数
    try {
      const response = await axios.post('/todos', params);
      setTodoList([response.data.resource , ...todoList ])
    } catch (e: any) {
      console.log(e.response);
    }
  };

  const getTodos = async ()=>{
    try {
      const response = await axios.get('/todos')
      console.log(response.data.resources)
      setTodoList(response.data.resources)        //获取列表 函数
      console.log('拿到todoList')
    }catch(e){
      console.log(e)
    }
  }
 useEffect(()=>{
    getTodos()         //第一次挂载时获取列表
   console.log('第一次挂载')
 } , [])

 // useEffect(()=>{
 //   console.log('更新了')      //看一下 todoList 更新了几次
 // } , [todoList])
  return (
    <TodoWrapper>
      <TodoInput addTodo={addTodo}/>
      <div>
          {todoList.map( t => <TodoItem key={t.id} {...t}  /> )}
      </div>
    </TodoWrapper>
  );
};
export default Todos;