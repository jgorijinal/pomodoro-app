import React from 'react';
import TodoInput from './TodoInput';
import axios from '../../config/axios';
import styled from 'styled-components';

const TodoWrapper = styled.div`
  padding: 16px;
  margin: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`
const addTodo =async ( params :{}) =>{
  try {
    const  response = await axios.post('/todos' , params)
    console.log(response)
  }catch(e:any){
    console.log(e.response)
  }
}

const Todos:React.FC = ()=>{

  return (
    <TodoWrapper>
      <TodoInput  addTodo={addTodo}/>
    </TodoWrapper>
  )
}
export default Todos