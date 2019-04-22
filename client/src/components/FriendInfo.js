import React from 'react';
import Input from '../components/Input';

const FriendInfo = (props) => {
	return (
    <div>
      <Input type={'text'}
        title= {'Friend name ' + props.display_number}
        name= {'friend_name_' + props.number}
        value={props.name}
        placeholder = {'Friend ' + props.display_number + 's name'}
        handleChange = {props.handleInput}
      />
      <Input type={'text'}
        title= {'Friend name ' + props.display_number}
        name= {'friend_name_' + props.number}
        value={props.name}
        placeholder = {'Friend ' + props.display_number + 's name'}
        handleChange = {props.handleInput}
      />
    </div>
  )
}

export default FriendInfo;
