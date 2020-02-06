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

const EditIcon = (props) => (<Icon name='edit' {...props} width={20} height={20} fill="#C4CAD0" />)
const CloseIcon = (props) => (<Icon name='close' {...props}  width={20} height={20} fill="#EE3939" />)

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
        <View style={styles.card}>

            <View>
                <Text style={styles.cardHeaderText} category='h5'>Order #FC09882</Text>
            </View>

            <View style={styles.infoRow} >
                <View style={{ width: '50%' }}>
                    <Text style={styles.infoHeader}>Date</Text>
                    <Text style={styles.infoText}>Aug 3, 2019</Text>
                </View>
                <View style={{ width: '50%' }}>
                    <Text style={styles.infoHeader}>Status</Text>
                    <Text style={styles.wellComplete}>Completed</Text>
                </View>
            </View>

            <View style={styles.distributorRow}>
                <View>
                    <Text style={styles.infoHeader}>Distributor</Text>
                    <Text style={styles.infoText}>Suplias</Text>
                </View>
            </View>

            <View style={styles.productRow}>
                <View style={styles.productItem}>
                    <View style={styles.productImageWrapper}>
                        <Image style={styles.productImage} source={require('../assets/img/3563071689.jpg')}/>
                    </View>
                    <View style={styles.productContentWrapper}>
                        <Text category='s2'>Nivea Body Lotion Cocoa Butter Milk 400ml (8 X 1) - 89156</Text>
                        <View style={{flexDirection: 'row', justifyContent:'space-between', marginTop: 8}}>
                            <View style={{flexDirection: 'row', justifyContent:'flex-start'}}>
                                <Text category='h6' style={{marginRight:8}}>₦1,100</Text>
                                <Text appearance='hint' style={{alignSelf:'center', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>10 Units <EditIcon /></Text>
                            </View>
                            <Text style={{alignSelf:'center'}}><CloseIcon /></Text>
                        </View>
                    </View>
                </View>
                <View style={styles.productItem}>
                    <View style={styles.productImageWrapper}>
                        <Image style={styles.productImage} source={require('../assets/img/3563071689.jpg')}/>
                    </View>
                    <View style={styles.productContentWrapper}>
                        <Text category='s2'>Nivea Body Lotion Cocoa Butter Milk 400ml (8 X 1) - 89156</Text>
                        <View style={{flexDirection: 'row', justifyContent:'space-between', marginTop: 8}}>
                            <View style={{flexDirection: 'row', justifyContent:'flex-start'}}>
                                <Text category='h6' style={{marginRight:8}}>₦1,100</Text>
                                <Text appearance='hint' style={{alignSelf:'center', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>10 Units <EditIcon /></Text>
                            </View>
                            <Text style={{alignSelf:'center'}}><CloseIcon /></Text>
                        </View>
                    </View>
                </View>
            </View>


        </View>
    )
}

export default Order;

const styles = StyleSheet.create({
    card: {
        marginTop: 30,
        paddingHorizontal: 0,
        paddingVertical: 30,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        borderColor: '#e4e9f2',
        borderStyle: 'solid',
        borderWidth: 1
    },
    cardHeaderText: {
        paddingBottom: 10,
        paddingHorizontal: 15,
        borderBottomColor: '#e4e9f2',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 15,
        paddingHorizontal: 15
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
    distributorRow: {
        paddingHorizontal: 15,
        marginBottom: 15
    },
    productRow: {
        borderTopColor: '#e4e9f2',
        borderTopStyle: 'solid',
        borderTopWidth: 1
    },
    productItem: {
        flexDirection: 'row',
        borderBottomColor: '#e4e9f2',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1
    },
    productImageWrapper: {
        alignSelf: 'center',
        alignContent: 'center',
    },
    productImage: {
        width: 80, height: 80,
    },
    productContentWrapper: {
        borderLeftColor: '#e4e9f2',
        borderLeftStyle: 'solid',
        borderLeftWidth: 1,
        flexShrink: 1,
        padding: 8,
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
