import React from 'react';
import { Text, View, Image, Pressable, StyleSheet } from 'react-native';
import Utilities, { ARROW_RIGHT_ICON, Colors, StatusColor, StatusChip } from '../../utilities';
import type { Transaction } from '../../types';

/**
 * List Item Props's Interface
 */
interface ListItemProps {
    item: Transaction,
    onPressItem?: (item: any) => void,
}

/**
 * List Item Component
 */
export const ListItem: React.FC<ListItemProps> = ({ item, onPressItem }) => {
    return (
        <Pressable style={styles.container} onPress={onPressItem}>
            <View style={[styles.badge, { backgroundColor: item.status === "SUCCESS" ? Colors.green : Colors.softRed }]} />
            <View style={styles.wrapper}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.label, { paddingVertical: 12, textTransform: 'uppercase' }]}>{item.sender_bank}</Text>
                    <Image source={ARROW_RIGHT_ICON} style={{ tintColor: Colors.black, height: 18, width: 18 }} />
                    <Text style={[styles.label, { paddingVertical: 12, textTransform: 'uppercase' }]}>{item.beneficiary_bank}</Text>
                </View>
                <Text style={[styles.sublabel, { textTransform: 'uppercase' }]}>{item.beneficiary_name}</Text>
                <Text style={styles.sublabel}>{`${Utilities.currencyFormat(item.amount.toString(), { prefix: "Rp", })} • ${Utilities.parseDateTime(item.completed_at)}`}</Text>
            </View>
            <View style={[styles.chips, { backgroundColor: StatusColor[item.status] }]}>
                <Text style={styles.chipsLabel}>{StatusChip[item.status]}</Text>
            </View>
        </Pressable>
    )
}

/**
 * List Item Component Styles
 */
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 8,
        overflow: 'hidden',
        paddingRight: 14,
        marginVertical: 5
    },
    badge: {
        width: 8,
        height: '100%'
    },
    label: {
        fontWeight: '700',
        fontSize: 13,
        color: Colors.black,
        lineHeight: 18
    },
    sublabel: {
        fontWeight: '400',
        fontSize: 12, color: Colors.black,
        lineHeight: 18
    },
    chipsLabel: {
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 18,
        textTransform: 'capitalize',
        color: Colors.white
    },
    wrapper: {
        flex: 1,
        marginLeft: 14,
        paddingVertical: 14,
    },
    icon: {
        height: 24,
        width: 24,
        tintColor: Colors.softGrey,
        marginHorizontal: 5
    },
    chips: {
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10
    }
})