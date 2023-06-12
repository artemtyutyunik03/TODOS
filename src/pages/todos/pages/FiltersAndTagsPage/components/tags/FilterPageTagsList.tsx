import React, {memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Box} from '@mui/material';
import {deleteUserTag} from '@shared/api/services/todosService/fetchTodos';
import {deleteTag} from '@entities/tag/store/tagStore';
import {userIdSelector} from '@entities/user/model/store';
import {ITag} from '@shared/interfacesAndTypes';
import {addToFavorites} from '@features/addToFavorites';
import {configureFavoriteItem} from '@shared/helpers';
import TagItem from '@pages/todos/pages/FiltersAndTagsPage/components/tags/TagListItem';


const FilterPageTagsList = memo(({userTags}: {userTags: ITag[]}) => {
  const dispatch = useDispatch()
  const userId = useSelector(userIdSelector)

  const onDeleteTag = (tag: string) => {
    dispatch(deleteTag(tag))
    deleteUserTag(tag, userId)
  }

  const onAddToFavorite = (tagId: string) => {
    const favoriteItem = configureFavoriteItem('tag', tagId)
    dispatch(addToFavorites(favoriteItem))
  }

  return (
    <Box mt={'10px'}>
      {
        userTags.length > 0 ?
            userTags.map((tag) => <TagItem key={tag.name}
              tag={tag}
              addToFavorite={onAddToFavorite}
              onDelete={onDeleteTag}/>) :
            <Box sx={{padding: '16px 0', fontSize: '16px', color: 'grey'}}>
              A place for your tags.
            </Box>
      }
    </Box>
  );
});


export default FilterPageTagsList;
