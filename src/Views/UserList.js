import React, { useContext } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { ListItem, Avatar, Button } from 'react-native-elements';
import UsersContext from '../context/UsersContext';

export default props => {

    const { state, dispatch } = useContext(UsersContext);
    
    function confirmUserDeletion(user) {
        Alert.alert('Delete user', 'Do you wish to delete this user?', [
            {
                text: 'Yes',
                onPress(){
                    dispatch({
                        type: 'deleteUser',
                        payload: user,
                    })
                }
            },
            {
                text: "No"
            }
        ])
    }
    
    function getUserItem({ item: user }) {
        return (
            <ListItem.Swipeable 
                key={user.id}
                bottomDivider
                onPress = {() => props.navigation.navigate("UserForm", user)}
                rightContent={
                    <Button
                        title="Delete"
                        icon={{ name: 'delete', color: 'white' }}
                        buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                        onPress={ () => {confirmUserDeletion(user)}}
                    />
                }  
                >
                <Avatar source={{uri: user.image}}/>
                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem.Swipeable>
        );
    }

    

    return (
        <View>
            <FlatList
                data={state.users}
                keyExtractor={user => user.id.toString()}
                renderItem={getUserItem}
                scrollEnabled={true}
            />
        </View>
    );
}