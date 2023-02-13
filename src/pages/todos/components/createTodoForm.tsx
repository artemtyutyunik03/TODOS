import {useDispatch} from 'react-redux';

import BaseTodoForm from '../../../shared/forms/ui/baseTodoForm';
import {addNewTask} from '../../../entities/todos/store/todo';
import {IBaseFormInputsValues} from '../../../shared/forms/interfaces/interfaces';
import {IDate} from '../../../shared/interfaces';

interface Props {
    onClose: () => void
}

const CreateTodoForm = ({onClose}: Props) => {
  const dispatch = useDispatch();

  const onSubmit = (data:IBaseFormInputsValues, date: IDate) => {
    dispatch(addNewTask({...data, id: Date.now(), done: false, date: date}));
    onClose();
  };

  return <BaseTodoForm onClose={onClose} onSubmit={onSubmit}/>;
};


export default CreateTodoForm;
