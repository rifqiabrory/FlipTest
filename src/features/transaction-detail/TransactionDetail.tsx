import React, { useCallback } from "react";
import { Text, View, Alert, Image, Pressable, StyleSheet, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useClipboard } from '@react-native-clipboard/clipboard';
import Utilities, { Colors, Strings, ARROW_DOWN_ICON, ARROW_RIGHT_ICON, COPY_ICON } from "../../utilities";
import { useTransactionDetail, useToggle } from "../../hooks";
import { Divider, Visibility } from "../../components";
import { StackParams } from "../../types";
import styles from "../../styles";

/**
 * Transaction Detail Props
 */
type Props = NativeStackScreenProps<StackParams, 'TransactionDetail'>

/**
 * Transaction Detail Screen
 */
const TransactionDetail: React.FC<Props> = ({ route }) => {
    /**
     * Hook's
     */
    const { transactionID } = route.params;
    const [visible, toggle] = useToggle(false);
    const [copy, setCopiedValue] = useClipboard();
    const { transaction } = useTransactionDetail(transactionID);

    /**
     * onCopyToClipboard Method
     * @description Copy data to clipboard
     */
    const _onCopyToClipboard = useCallback(() => {
        setCopiedValue(transactionID);
        Alert.alert(Strings.COPIED);
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={transactionDetailStyles.box}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[transactionDetailStyles.label, { paddingHorizontal: 14, paddingVertical: 24 }]}>{Strings.ID_TRANSAKSI_LABEL + "" + transaction?.id}</Text>
                    <Pressable onPress={_onCopyToClipboard}><Image source={COPY_ICON} style={[styles.icon, { tintColor: Colors.warm }]} /></Pressable>
                </View>
                <Divider />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 24 }}>
                    <Text style={transactionDetailStyles.label}>{Strings.DETAIL_TRANSAKSI_LABEL}</Text>
                    <Pressable onPress={toggle} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[transactionDetailStyles.sublabel, { color: Colors.warm, paddingRight: 5 }]}>{visible ? 'Tutup' : 'Detail'}</Text>
                        <Image source={ARROW_DOWN_ICON} style={[styles.icon, { tintColor: Colors.warm, transform: [{ rotate: visible ? '180deg' : '0deg' }] }]} />
                    </Pressable>
                </View>
                <Divider />
                <Visibility visible={visible} style={{ paddingHorizontal: 14, paddingBottom: 14 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[transactionDetailStyles.label, { paddingVertical: 12, textTransform: 'uppercase' }]}>{transaction?.sender_bank}</Text>
                        <Image source={ARROW_RIGHT_ICON} style={{ tintColor: Colors.black, height: 18, width: 18 }} />
                        <Text style={[transactionDetailStyles.label, { paddingVertical: 12, textTransform: 'uppercase' }]}>{transaction?.beneficiary_bank}</Text>
                    </View>
                    <View style={transactionDetailStyles.item}>
                        <View style={{ flex: 1 }}>
                            <Text style={[transactionDetailStyles.label, { textTransform: 'uppercase' }]}>{transaction?.beneficiary_name}</Text>
                            <Text style={transactionDetailStyles.sublabel}>{transaction?.account_number}</Text>
                        </View>
                        <View style={{ flex: 0.3 }}>
                            <Text style={transactionDetailStyles.label}>{Strings.NOMINAL_LABEL}</Text>
                            <Text style={transactionDetailStyles.sublabel}>{transaction?.amount ? Utilities.currencyFormat(transaction?.amount.toString()) : null}</Text>
                        </View>
                    </View>
                    <View style={transactionDetailStyles.item}>
                        <View style={{ flex: 1 }}>
                            <Text style={transactionDetailStyles.label}>{Strings.BERITA_TRANSFER_LABEL}</Text>
                            <Text style={transactionDetailStyles.sublabel}>{transaction?.remark}</Text>
                        </View>
                        <View style={{ flex: 0.3 }}>
                            <Text style={transactionDetailStyles.label}>{Strings.KODE_UNIK_LABEL}</Text>
                            <Text style={transactionDetailStyles.sublabel}>{transaction?.unique_code}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={transactionDetailStyles.label}>{Strings.WAKTU_DIBUAT_LABEL}</Text>
                        <Text style={transactionDetailStyles.sublabel}>{transaction?.created_at ? Utilities.parseDateTime(transaction.created_at) : null}</Text>
                    </View>
                </Visibility>
            </View>
        </ScrollView>
    )
}

/**
 * Transaction Detail Screen Styles
 */
const transactionDetailStyles = StyleSheet.create({
    box: {
        marginTop: 14,
        backgroundColor: Colors.white,
    },
    label: {
        fontSize: 13,
        lineHeight: 18,
        fontWeight: '700',
        color: Colors.black,
    },
    sublabel: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '400',
        color: Colors.black,
    },
    item: {
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})

export default TransactionDetail;