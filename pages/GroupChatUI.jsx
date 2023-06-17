import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {NativeWind} from 'native-wind';

const GroupChatUI = () => {
  return (
    <View className="flex-1 bg-black">
      <View className="flex-1">
        {/* Chat messages */}
        <View className="p-4">
          <View className="bg-gray-200 rounded-lg p-2">
            <Text className="text-gray-600">User1: Hello!</Text>
          </View>
          <View className="bg-gray-200 rounded-lg p-2 mt-2">
            <Text className="text-gray-600">User2: Hi there!</Text>
          </View>
          <View className="bg-gray-200 rounded-lg p-2 mt-2">
            <Text className="text-gray-600">User1: How are you?</Text>
          </View>
        </View>
      </View>

      {/* Input box */}
      <View className="p-10">
        <View className="flex flex-row bg-gray-200 rounded-lg">
          <TextInput placeholder="Type a message..." className="flex-1 p-2" />
          <TouchableOpacity className="p-2">
            <Text className="text-blue-500">Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default GroupChatUI;
