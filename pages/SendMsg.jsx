import React, {useEffect, useState} from 'react';
import {View, Button, TextInput} from 'react-native';
import {CometChat, AuthFailureReason} from '@cometchat-pro/react-native-chat';

const SendMsg = () => {
  const appID = '240805dc16cf0e12';
  const region = 'us';
  const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .build();

  const [groupList, setGroupList] = useState([]);
  const [messageText, setMessageText] = useState('');

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
        console.log('Groups list fetched successfully', fetchedGroupList);

        setGroupList(fetchedGroupList);
      } catch (error) {
        console.log('Groups list fetching failed with error', error);
      }
    };

    authenticateUser();
  }, []);

  const sendMessage = async (receiverID, receiverType) => {
    try {
      const textMessage = new CometChat.TextMessage(
        receiverID,
        messageText,
        receiverType,
      );

      const sentMessage = await CometChat.sendMessage(textMessage);
      console.log('Message sent successfully:', sentMessage);

      // Clear the input field after sending the message
      setMessageText('');
    } catch (error) {
      console.log('Message sending failed with error:', error);
    }
  };

  const renderGroupItem = ({item}) => {
    const handleSendMessage = () => {
      const receiverID = item.guid;
      const receiverType = CometChat.RECEIVER_TYPE.GROUP;

      sendMessage(receiverID, receiverType);
    };

    return (
      <View className="p-10">
        <Button title="Send Message" onPress={handleSendMessage} />
      </View>
    );
  };

  return (
    <View>
      <TextInput
        value={messageText}
        onChangeText={setMessageText}
        placeholder="Enter your message"
      />
      <Button title="Send" onPress={() => sendMessage('GUID', 'GROUP')} />

      {groupList.map(group => (
        <View key={group.guid} className="p-10">
          <Button
            title={`Send Message to ${group.name}`}
            onPress={() =>
              sendMessage(group.guid, CometChat.RECEIVER_TYPE.GROUP)
            }
          />
        </View>
      ))}
    </View>
  );
};

export default SendMsg;
