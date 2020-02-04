import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
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

const formatDate = (unix) => {
    let date = new Date(unix * 1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = date.getFullYear();
    let month = months[date.getMonth()];
    let day = date.getDate();

    return month + ' ' + day + ', ' + year;
}

const CardHeaderText = () => (
    <>
        <Text style={styles.cardHeaderText} category='h5'>Billing Info</Text>
    </>
)

const loadOrder = async () => {
    let result = new Promise((resolve, reject) => {
        // CALL TO `FAKE` API
        setTimeout(function () {
            resolve(require('../api-data/order.json'))
        }, 800)
    })
    return await result
}

const loadOrderItem = async () => {
    let result = new Promise((resolve, reject) => {
        // CALL TO `FAKE` API
        setTimeout(function () {
            resolve(require('../api-data/order_item.json'))
        }, 800)
    })
    return await result
}

const OrderItem = (props) => {
    const [orderItem, setOrderItem] = useState(null)
    
    useEffect(() => {
        loadOrderItem().then(resp => {
            let list = []
            for(var i in resp.data) {
                let item = resp.data[i]
                if (item.order_id === props.data._id) {
                    list.push(resp.data[item])
                }
            }
            if (list.length > 0) { setOrderItem(list) }
        })
        return () => {
            // cleanup
        };
    }, []);

    return (
        <View style={styles.orderList}>
            <View style={{paddingVertical: 20}}>
                <Text style={{marginBottom: 10}}>
                    <Text style={props.data.tag === 'pending' ? styles.well : styles.wellComplete }>{props.data.tag}</Text>
                </Text>
                <Text style={{marginBottom: 5}} category='h6'>{'Order #'+props.data.ref}</Text>
                <Text category='h6' style={{opacity: .4}}>{orderItem ? orderItem.length : 0 } Items &middot; {formatDate(props.data.created)}</Text>
            </View>
            <View style={{alignSelf: "center"}}>
                <Text category="h5">{'₦'+props.data.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }</Text>
            </View>
        </View>
    )
}

const Orders = (props) => {
    return <>
        {props.data ?
            <FlatList
                data={props.data}
                renderItem={({ item }) => <OrderItem data={item} />}
                keyExtractor={item => item._id}
            /> : <ActivityIndicator size="large" style={{ paddingVertical: 15 }} />
        }
    </>
}
const WeeklyOrders = (props) => {
    return <>
        {props.data ?
            <Text category='h3' >Weekly Order</Text> : <ActivityIndicator size="large" style={{ paddingVertical: 15 }} />
        }
    </>
}
const InCart = (props) => {
    return <>
        {props.data ?
            <Text category='h3' >Weekly Order</Text> : <ActivityIndicator size="large" style={{ paddingVertical: 15 }} />
        }
    </>
}

const OrderSummary = (props) => {
    const [tab, setTab] = useState(0)
    const [orders, setOrders] = useState(null)
    const [weeklyOrder, setWeeklyOrder] = useState(null)
    const [cart, setCart] = useState(null)

    const SelectedTab = () => {
        switch (tab) {
            case 1:
                return <WeeklyOrders data={weeklyOrder} />
                break;
            case 2:
                return <InCart data={cart} />
                break;

            default:
                return <Orders data={orders}/>
                break;
        }
    }

    useEffect(() => {
        loadOrder().then(resp => setOrders(resp.data.data))
        return () => {
            // cleanup
        };
    }, []);

    return (
        <>
            <Card {...TextStyleProps} style={styles.card}>

                <View><CardHeaderText /></View>

                <View style={styles.navbar}>
                    <Text style={tab == 0 ? styles.navTabBtnActive : styles.navTabBtn} onPress={() => setTab(0)}>
                        <Text>Orders</Text>
                        <Text style={styles.tabCounter}>{2}</Text>
                    </Text>
                    <Text style={tab == 1 ? styles.navTabBtnActive : styles.navTabBtn} onPress={() => setTab(1)}>
                        <Text>Weekly Order</Text>
                        <Text style={styles.tabCounter}>{3}</Text>
                    </Text>
                    <Text style={tab == 2 ? styles.navTabBtnActive : styles.navTabBtn} onPress={() => setTab(2)}>In Cart</Text>
                </View>

                <View>
                    <SelectedTab />
                </View>

            </Card>

        </>
    )
}

export default OrderSummary;

const styles = StyleSheet.create({
    card: {
        marginTop: 30,
        paddingHorizontal: 0
    },
    cardHeaderText: {
        paddingBottom: 10
    },
    navbar: {
        flex: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderBottomColor: '#C4CAD0',
        borderBottomWidth: 1,
        marginBottom: 10
    },
    navTabBtn: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderBottomColor: 'transparent',
        borderBottomWidth: 3
    },
    navTabBtnActive: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderBottomColor: '#3B54EC',
        borderBottomWidth: 3
    },
    tabCounter: {
        backgroundColor: '#EE3939',
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4,
        marginLeft: 2,
        color: '#fff'
    },
    tabContainer: {
        minHeight: 64
    },
    avatar: {
        width: 96,
        height: 96
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
    orderList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',

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
