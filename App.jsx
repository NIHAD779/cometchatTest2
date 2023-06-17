import {View,Text} from 'react-native';
import Groups from './pages/Groups';
import SignUp from './pages/SignUp';
import SendMsg from './pages/SendMsg';
import GroupChatUI from './pages/GroupChatUI';

const App = () => {
  return (
    <View className="flex p-10 bg-white">
     {/* <SignUp/> */}
     {/* <Groups/> */}
     {/* <SendMsg/> */}
     <GroupChatUI/>
    </View>
  );
};

export default App;
