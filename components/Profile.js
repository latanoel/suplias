import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import {
    Text,
    Icon,
    Card,
    Avatar
} from '@ui-kitten/components';

const CardHeaderText = () => (
    <Text style={styles.cardHeaderText} category='h5'>Billing Info</Text>
)

const apiCall = async () => {
    let isDone = new Promise((resolve, reject) => {
        // CALL TO `FAKE` API
        setTimeout(function () {
            resolve(require('../api-data/buyer.json'))
        }, 1500)
    })
    let result = await isDone
    return result
}

const Profile = (props) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        apiCall().then(result=>setUser(result.data))
        return () => {
            // cleanup
        };
    }, []);

    return (
        <Card header={CardHeaderText}>
            { user ? (<>
                <Avatar style={styles.avatar} source={require('../assets/img/avatar.jpg')} />
                <Text style={styles.infoHeader}>PERSON</Text>
                <Text style={styles.infoText}>{user.person}</Text>
                <Text style={styles.infoText}>{user.phone}</Text>
                
                <Text style={styles.infoHeader}>STORE</Text>
                <Text style={styles.infoText}>{user.name + ' (' + user.store_type.name + ')'}</Text>
                
                <Text style={styles.infoHeader}>BILLING ADDRESS</Text>
                <Text style={styles.infoText}>{user.address}</Text>
            </>) : <ActivityIndicator size='large' style={{margin:20}} /> }
        </Card>
    )
}

export default Profile;

const styles = StyleSheet.create({
    avatar: {
        width: 96,
        height: 96
    },
    cardHeaderText: {
        padding: 15
    },
    infoHeader: {
        fontWeight: "bold",
        textTransform: 'uppercase',
        marginTop: 15,
        color: '#C4CAD0'
    },
    infoText: {
        fontSize: '1.05em',
        color: '#171C34'
    },
});
