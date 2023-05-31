import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootReducer} from '@app/store';
import {Box, Typography} from '@mui/material';
import {default as LabelIcon} from '@mui/icons-material/LocalOffer';
import TodosCount from '@shared/components/TodosCount';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CustomIconButton from '@pages/todos/pages/FiltersAndTagsPage/components/CustomIconButton';
import {deleteTag} from '@pages/authorization/store';
import {deleteUserTag} from '@shared/api/services/todosService/fetchTodos';
import ConfirmDeleteModal from '@shared/components/ConfirmDeletion';
import useVisable from '@shared/hooks/useVisable';

const TagsList = () => {
  const userTags = useSelector((state: RootReducer ) => state.userReducer.tags)
  const dispatch = useDispatch()
  const userId = useSelector((state: RootReducer ) => state.userReducer.user.user_id)

  const onDeleteTag = (tag: string) => {
    dispatch(deleteTag(tag))
    deleteUserTag(tag, userId)
  }

  return (
    <Box mt={'10px'}>
      {
        userTags.length > 0 ?
            userTags.map((tag) => <TagItem key={tag}
              tag={tag}
              onDelete={onDeleteTag}/>) :
            <Box sx={{padding: '16px 0', fontSize: '16px', color: 'grey'}}>
              A place for your tags.
            </Box>
      }
    </Box>
  );
};

const tagNameStyle = {
  fontSize: '15px',
  color: 'rgb(128, 128, 128)',
  fontFamily: '-apple-system',
}

const tagItemContainer = {
  'display': 'flex',
  'position': 'relative',
  'alignItems': 'center',
  'justifyContent': 'space-between',
  'padding': '8px 0',
  'mt': '5px',
  'cursor': 'pointer',
  'borderBottom': '1px solid rgba(0, 0, 0, 0.12)',
  '&:hover': {
    '.tag_actions': {
      opacity: 1,
    },
  },
}

const tagActionStyles = {
  position: 'absolute',
  backgroundColor: '#fff',
  opacity: 0,
  zIndex: 9,
  top: 0,
  right: 0,
}

const iconStyles = {
  color: '#a09f9f',
  fontSize: '20px',
}

interface TagItemProps {
  tag: string,
  onDelete: (tag: string) => void
}

function TagItem({tag, onDelete}: TagItemProps) {
  const [isConfirmDeleteModalVisable, openConfirmDeleteModal, onCloseConfirmDeleteModal] = useVisable(false)
  return <>
    <Box sx={tagItemContainer}>
      <Box display={'flex'} alignItems={'center'}>
        <LabelIcon sx={tagNameStyle}/>
        <Typography marginLeft={'10px'} color={'#333333'}>{tag}</Typography>
      </Box>
      <TodosCount>
        1
      </TodosCount>
      <Box className='tag_actions' sx={tagActionStyles}>
        <CustomIconButton>
          <FavoriteBorderIcon sx={iconStyles}/>
        </CustomIconButton>

        <CustomIconButton>
          <DriveFileRenameOutlineIcon sx={iconStyles}/>
        </CustomIconButton>

        <CustomIconButton onClick={openConfirmDeleteModal}>
          <DeleteOutlineIcon sx={iconStyles}/>
        </CustomIconButton>
        {/*delete confirmation modal*/}
        <ConfirmDeleteModal isOpen={isConfirmDeleteModalVisable}
          onClose={onCloseConfirmDeleteModal}
          onSubmit={() => onDelete(tag)}/>
      </Box>
    </Box>
  </>
}

export default TagsList;
