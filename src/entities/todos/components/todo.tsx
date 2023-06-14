import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {addNewTask, deleteTask, setPriority, toggleTaskComplete} from '../store/todo';
import {EditTodoForm} from '@features/todoFeatures/EditTodo';
import {ITodo} from '@shared/interfacesAndTypes';
import TodoCard from './todoCard';
import {useVisable} from '@shared/hooks';
import {deleteTodoById, postNewTodo, sendUpdatedTodo} from '@shared/api/services/todos';
import {userIdSelector} from '@entities/user/model/store';

interface Props {
    todo: ITodo
}

const Todo = ({todo}: Props) => {
  const {id} = todo;
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector)
  const [isEditing, openEditing, closeEditing] = useVisable(false);

  const onComplete = () => {
    sendUpdatedTodo({id, done: !todo.done}, userId)
    dispatch(toggleTaskComplete(Number(id)));
  };

  const onDeleteAction = () => {
    dispatch(deleteTask(id));
    deleteTodoById(id, userId)
  };
  const onDuplicateAction = () => {
    const newTodo = ({...todo, id: Date.now()})
    dispatch(addNewTask(newTodo));
    postNewTodo(newTodo, userId)
  };
  const setPriorityAction = (priority: string) => {
    const data = {id, priority}
    sendUpdatedTodo(data, userId)
    dispatch(setPriority(data));
  };

  if (isEditing) return <EditTodoForm onClose={closeEditing} todo={todo}/>;

  return <TodoCard
    todo={todo}
    onDeleteAction={onDeleteAction}
    onDuplicateAction={onDuplicateAction}
    setPriorityAction={setPriorityAction}
    onComplete={onComplete}
    onEdit={openEditing}/>;
};

export default Todo;
