import React from 'react'

import { Checkbox } from 'antd';

type Props = {
  id: number,
  description: string,
  completed?: boolean,
  created_at?: string,
  deleted?: boolean,
  extra?: object,
  updateTodo: (id:number , params: any) => void
}
const TodoItem:React.FC<Props> = (props)=> {

  function update(e:any) {
    props.updateTodo( props.id ,{completed:e.target.checked} )
    console.log(`checked = ${e.target.checked}`);
  }
  return (
    <div>
      <Checkbox onChange={update} checked={props.completed}>{props.description}</Checkbox>
    </div>
  )
}
export default  TodoItem