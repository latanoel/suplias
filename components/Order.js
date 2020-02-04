import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Image } from 'react-native';
import {
    Text,
    Icon,
    Card,
    Avatar,
    TabView,
    Tab,
    Layout,
    Button
} from '@ui-kitten/components';
import { TextStyleProps } from '@ui-kitten/components/ui/support/typings';

const loadOrderItem = async () => {
    let result = new Promise((resolve, reject) => {
        // CALL TO `FAKE` API
        setTimeout(function () {
            resolve(require('../api-data/order_item.json'))
        }, 800)
    })
    return await result
}

const Order = (props) => {
    const [product, setProduct] = useState(null)

    useEffect(() => {
        loadOrderItem().then(resp => {
            let list = []
            for (var i in resp.data) {
                let item = resp.data[i]
                if (item.order_id === props.order_id) {
                    list.push(resp.data[item])
                }
            }
            if (list.length > 0) { setProduct(list) }
        })
        return () => {
            // cleanup
        };
    }, []);

    return (
        <Card {...TextStyleProps} style={styles.card}>

            <View>
                <Text style={styles.cardHeaderText} category='h5'>Order #FC09882</Text>
            </View>

            <View style={styles.meta}>
                <View style={{ width: '50%' }}>
                    <Text style={styles.infoHeader}>Date</Text>
                    <Text style={styles.infoText}>Aug 3, 2019</Text>
                </View>
                <View style={{ width: '50%' }}>
                    <Text style={styles.infoHeader}>Status</Text>
                    <Text style={styles.wellComplete}>Completed</Text>
                </View>
            </View>

            <View>
                <View>
                    <Text style={styles.infoHeader}>Distributor</Text>
                    <Text style={styles.infoText}>Suplias</Text>
                </View>
            </View>

            <View style={{flexDirection: 'row'}}>
                <View>
                    <Image style={{width: 80, height: 80}} source={require('../assets/img/3563071689.jpg')}/>
                </View>
            </View>


        </Card>
    )
}

export default Order;

const styles = StyleSheet.create({
    card: {
        marginTop: 30,
        paddingHorizontal: 0
    },
    cardHeaderText: {
        paddingBottom: 10
    },
    infoHeader: {
        fontWeight: "bold",
        textTransform: 'uppercase',
        marginTop: 15,
        color: '#C4CAD0',
    },
    infoText: {
        fontSize: '1.05em',
        color: '#171C34',
    },
    meta: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    well: {
        borderRadius: 4,
        backgroundColor: '#F1B93D1a',
        color: '#F1B93D',
        paddingVertical: 8,
        paddingHorizontal: 12,
        textTransform: 'capitalize'
    },
    wellComplete: {
        borderRadius: 4,
        backgroundColor: '#00a8791a',
        color: '#00a879',
        paddingVertical: 8,
        paddingHorizontal: 12,
        textTransform: 'capitalize'
    }
});
