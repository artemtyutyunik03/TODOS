import React, {useState} from 'react';
import {Box, Grid, SelectChangeEvent} from '@mui/material';
import {ITodo, Priority} from '@shared/interfaces';
import CheckboxComponent from '@entities/todos/components/Checkbox';
import {EditTodoForm} from '../../components/';
import TaskOverview from './components/TaskOverview';
import DetailActionPanelItem from '@pages/todos/pages/TodoDetailPage/components/DetailsActionsPanelItem';
import DueDateButton from '@shared/components/DueDateComponents';
import {useTodoDate} from '@entities/todos/hooks';
import PriorityButton from '@shared/components/Priority/PriorityButton';
import useSelectPriority from '@shared/hooks/useSelectPriority';
import {useDispatch} from 'react-redux';
import {setPriority} from '@entities/todos/store/todo';

interface Props {
  todo: ITodo,
  onComplete: (e: React.SyntheticEvent) => void
}

const DetailsCard = ({todo, onComplete}: Props) => {
  const {label, description, date, id} = todo
  const dispatch = useDispatch()
  const [isEditDetailsOpen, setIsEditDetailsOpen] = useState(false)
  const [todoDate, setTodoDate] = useTodoDate(date, id)
  const [priority, onSelected] = useSelectPriority(todo.priority)

  const onClose = () => {
    setIsEditDetailsOpen(false)
  }

  const onPriorityHandler = (event: SelectChangeEvent<Priority>) => {
    const priority = event.target.value
    onSelected(event)
    dispatch(setPriority({id, priority}))
  }

  const onOpenEditForm = () => setIsEditDetailsOpen(true)

  return (
    <Box bgcolor={'#fff'} minWidth={'700px'}>
      <Grid container>
        <Grid item md={8}>
          <Box mb={'30px'} display={'flex'} marginRight={'10px'} marginTop={'10px'}>
            <Box display={'flex'}>
              <CheckboxComponent onComplete={onComplete} todo={todo}/>
            </Box>
            {
              isEditDetailsOpen ? (
                  <Box width={'100%'}>
                    <EditTodoForm
                      onClose={onClose}
                      todo={todo}
                      hideActions/>
                  </Box>
              ) : (
                  <TaskOverview
                    label={label}
                    description={description}
                    onOpenForm={onOpenEditForm}/>
              )
            }
          </Box>
        </Grid>
        <Grid item md={4}>
          <Box width={'100%'} height={'100%'} sx={{backgroundColor: '#fafafa'}} padding={'10px 25px'}>
            <DetailActionPanelItem label={'Due date'}>
              <DueDateButton date={todoDate} variant={'Standard'} onPassDateToBaseForm={setTodoDate}/>
            </DetailActionPanelItem>
            <DetailActionPanelItem label={'Set priority'}>
              <PriorityButton initialPriority={priority} changeHandler={onPriorityHandler} variant={'short'}/>
            </DetailActionPanelItem>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailsCard;
