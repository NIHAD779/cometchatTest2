import React from 'react'
import { View,Text,StyleSheet } from 'react-native';
const GroupItem = ({item}) => {
  return (
    <View style={styles.groupItemContainer}>
      <Text>{item.name}</Text>
    </View>
  );
};

export default GroupItem

const styles = StyleSheet.create({
  groupItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  groupIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  memberCount: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  owner: {
    fontSize: 12,
    color: '#888',
  },
});