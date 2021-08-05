import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import UsersContext from '../context/UsersContext';

export default ({ route, navigation }) => {

    const [user, setUser] = useState(route.params ? route.params : {})
    const { dispatch } = useContext(UsersContext)
    
    return (
        <View style={style.form}>
            <Input
                label="User name"
                leftIcon={{
                    type:'font-awesome',
                    name:'user'
                }}
                onChangeText={name => setUser({...user, name})}
                placeholder="Enter user name"
                value={user.name}
            ></Input>
            <Input
                label="User email"
                leftIcon={{
                    type:'materialicons',
                    name:'email'
                }}
                onChangeText={email => setUser({...user, email})}
                placeholder="Enter user email"
                value={user.email}
            ></Input>

            <Button 
                title = "Save"
                onPress={()=> {
                    dispatch({
                        type:user.id ? 'updateUser' : 'createUser',
                        payload: user,
                    })
                    navigation.goBack()
                }}>


            </Button>

        </View>
    );
}

const style = StyleSheet.create({
    form: {
        padding: 12
    }
})

