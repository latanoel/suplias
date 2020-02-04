import React, { useEffect, useState } from 'react';
import {
    Text,
    Input,
    Icon,
} from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

const searchIcon = (style) => (
    <Icon name={'search'} {...style} />
)

const CartIcon = (props) => (<Icon name="shopping-bag" {...props} width={36} height={36} fill='#ffffff' />)
const CartCounter = (props) => (<Text style={styles.counter}>{props.count}</Text>)

const apiCall = async () => {
    let isDone = new Promise((resolve, reject) => {
        // CALL TO `FAKE` API
        setTimeout(function () {
            resolve(require('../api-data/buyer.json'))
        }, 0)
    })
    let result = await isDone
    return result
}

const Header = (props) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        apiCall().then(result=>setUser(result))
        return () => {
            // cleanup
        };
    }, []);

    return (
        <> 
            { user ? (
                <>
                    <Text style={styles.salutation} category="h6" appearance='alternative'>Good Morning</Text>
                    <Text category="h5" appearance='alternative'>{user.data.name + ' (' + user.data.store_type.name + ')'}</Text>
                    <View style={styles.searchContainer}>
                        <Input
                            name='search'
                            placeholder=''
                            icon={searchIcon}
                            style={styles.searchInput}
                        />
                        <Text appearance='alternative' style={styles.cartIcon}>
                            <CartIcon />
                            <CartCounter count={2} />
                        </Text>
                    </View>
                </>) : (<Text appearance="alternative"> ... </Text>) }
        </>
    )
}

export default Header;

const styles = StyleSheet.create({
    salutation: {
        opacity: .7
    },
    searchContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 10
    },
    searchInput: {
        flexGrow: '1'
    },
    cartIcon: {
        paddingLeft: 5,
        paddingRight: 12,
        alignSelf: 'center'
    },
    counter: {
        backgroundColor: '#EE3939',
        paddingLeft: 4,
        paddingRight: 4,
        borderRadius: 2,
        color: '#fff',
        position: 'absolute',
        top: 0,
        right: 0
    }
});
