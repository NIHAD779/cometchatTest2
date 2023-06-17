import React, {useState, useEffect} from 'react';
import {TextInput, View, Button} from 'react-native';
import {CometChat} from '@cometchat-pro/react-native-chat';

const SignUp = () => {
  const [uid, setUid] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const appID = '240805dc16cf0e12'; // Replace with your actual App ID
    const region = 'us'; // Replace with your actual region
   
    const appSettings = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .autoEstablishSocketConnection(true)
      .build();

    CometChat.init(appID, appSettings)
      .then(() => {
        console.log('CometChat initialization completed successfully');
      })
      .catch(error => {
        console.log('CometChat initialization failed with error:', error);
      });
  }, []);

  const onSignUp = () => {
    const user = new CometChat.User(uid);
    user.setName(name);

    const authKey = '0876b9e867001b11f4e6bef66d130453a719c5d4'; // Replace with your actual auth key

    CometChat.createUser(user, authKey).then(
      user => {
        console.log('user created', user);
      },
      error => {
        console.log('error', error);
      },
    );
  };

  return (
    <View className="flex justify-center items-center border-red-500">
      <TextInput value={uid} onChangeText={setUid} placeholder="User ID" />
      <TextInput value={name} onChangeText={setName} placeholder="Name" />
      <Button title="Sign Up" onPress={onSignUp} />
    </View>
  );
};

export default SignUp;
