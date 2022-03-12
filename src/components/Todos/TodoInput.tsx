import React, { useState } from 'react';
import { Input} from 'antd';
import styled from 'styled-components';
const { Search } = Input;

const SearchWrapper = styled(Search)`
  .ant-input-affix-wrapper {
    &:focus , &:hover {
     border-color: darkgray;
    }
  }
  button {
    background: #e9e9e9;
    color: #282c34;
    border: white;
    &:hover {
      background: #d0cece;
      color: #282c34;
    }
  }
`
type TodoInputState = {
  description : string
}

type Props = {
  addTodo:({})=>Promise<void>
}
const TodoInput:React.FC<Props> = (props)=>{
  const [state , setState ] = useState<TodoInputState>({description:''})
  const onAdd = ()=>{
    props.addTodo(state)
    setState({description:''} )
  }
  const onKeyUp = (e:any)=>{
    if(e.keyCode === 13 && state.description !== '') {
      props.addTodo(state)
      setState({description:''} )
      console.log('提交')
    }

  }
  return (
      <SearchWrapper
        placeholder="请添加新的任务"
        allowClear
        enterButton="添加任务"
        size="large"
        onSearch={onAdd}
        value= {state.description}
        onKeyUp={onKeyUp}
        onChange = {(e:any)=>setState({description : e.target.value }) }
      />
  )
}
export default TodoInput