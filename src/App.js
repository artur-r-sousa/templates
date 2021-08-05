
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Icon } from 'react-native-elements';

import { Text } from 'react-native';
import UserList from './Views/UserList';
import UserForm from './Views/UserForm';
import { UsersProvider } from './context/UsersContext';

const Stack = createNativeStackNavigator();

export default props => {
    return (
        <UsersProvider>
            <NavigationContainer>
                <Stack.Navigator 
                    initialRouteName="UserList"
                    screenOptions={screenOptions}>
                    <Stack.Screen
                        name="UserList"
                        component={UserList}
                        options={({ navigation })=>{
                            return {
                                title: "User List",
                                headerRight: () => (
                                    <Button
                                        onPress={() => navigation.navigate('UserForm')}
                                        type='clear'
                                        icon={<Icon
                                            type='Ionicons'
                                            name='add'
                                            size={25}
                                            color='#FFF'
                                        ></Icon>}
                                    />
                                )
                            }
                        }}
                    />
                    <Stack.Screen
                        name="UserForm"
                        component={UserForm}
                        options={{
                            title: 'User Form'
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>

        </UsersProvider>

       
    )
}

const screenOptions = {
    headerStyle: {
        backgroundColor: "#0000FF"
    },
    headerTintColor: '#fff'
}