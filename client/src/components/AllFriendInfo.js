import React from 'react';
import Input from '../components/Input';

const AllFriendInfo = (props) => {
  var friendInfos = [];

  for (var i = 0; i < props.numBeers; i++) {
    var displayNumber = i + 1
    friendInfos.push(
      <div className= "flex-container" key={'friend_' + i}>
        <Input type={'text'}
          title= {'Friend name ' + displayNumber}
          name= {'friend_name' + i}
          value={(props.friends[i]||{}).name}
          placeholder = {'Friend ' + displayNumber + 's name'}
          handleChange = {props.updateFriendAttribute}
        />
        <Input type={'text'}
          title= {'Friend email ' + displayNumber}
          name= {'friend_email' + i}
          value={(props.friends[i]||{}).email}
          placeholder = {'Friend ' + displayNumber + 's email'}
          handleChange = {props.updateFriendAttribute}
        />
      </div>
    )
  }
	return (
    <div >
      {friendInfos}
    </div>
  )
}

export default AllFriendInfo;
