import React, {useEffect, useState} from 'react';
import {Text, View, FlatList} from 'react-native';
import {CometChat, AuthFailureReason} from '@cometchat-pro/react-native-chat';

const Groups = () => {
  const appID = '240805dc16cf0e12';
  const region = 'us';
  const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .build();

  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        await CometChat.init(appID, appSetting);
        console.log('Initialization completed successfully');

        const UID = 'superhero1'; // Replace with the user ID
        const authKey = '0876b9e867001b11f4e6bef66d130453a719c5d4'; // Replace with the correct authKey

        const loggedInUser = await CometChat.getLoggedinUser();
        if (!loggedInUser) {
          await CometChat.login(UID, authKey);
          console.log('Login Successful');
        }

        fetchGroupList();
      } catch (error) {
        console.log(
          'Initialization or authentication failed with error:',
          error,
        );

        if (
          error &&
          error.hasOwnProperty('reason') &&
          error.reason === AuthFailureReason.AUTH_TOKEN_NOT_PROVIDED
        ) {
          console.log('Please provide a valid authToken.');
        }
      }
    };

    const fetchGroupList = async () => {
      try {
        const limit = 30;
        const groupsRequest = new CometChat.GroupsRequestBuilder()
          .setLimit(limit)
          .build();
        const fetchedGroupList = await groupsRequest.fetchNext();
        console.log('Groups list fetched successfully',fetchedGroupList);

        setGroupList(fetchedGroupList);
        
      } catch (error) {
        console.log('Groups list fetching failed with error', error);
      }
    };


    

    authenticateUser();
  }, []);

  const renderGroupItem = ({item}) => {
    return (
      <View className='p-10' >
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={groupList}
        renderItem={renderGroupItem}
        keyExtractor={item => item.guid}
      />
    </View>
  );
};

export default Groups;
