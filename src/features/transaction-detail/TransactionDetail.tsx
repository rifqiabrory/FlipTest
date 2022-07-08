import React, { useCallback, useState } from "react";
import { Text, View, Alert, Image, Pressable, StyleSheet, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Clipboard from '@react-native-clipboard/clipboard';
import Utilities, { Colors, ARROW_DOWN_ICON, ARROW_RIGHT_ICON, COPY_ICON } from "../../utilities";
import { Divider } from "../../components";
import { StackParams } from "../../types";
import styles from "../../styles";
import { useTransactionDetail } from "../../hooks/useTransactionDetail";

type Props = NativeStackScreenProps<StackParams, 'TransactionDetail'>

const TransactionDetail: React.FC<Props> = ({ route, navigation }) => {
    const { transactionID } = route.params;
    const [visible, setVisible] = useState<boolean>(false);
    const { transaction } = useTransactionDetail(transactionID);
    
    const _onCopyToClipboard = useCallback(() => {
        Clipboard.setString(transactionID);
        Alert.alert("Berhasil Salin ID Transaksi")
    }, []);

    const _onToggleDetail = useCallback(() => {
        setVisible(prev => !prev);
    }, [visible]);

    return (
        <ScrollView style={styles.container}>
            <View style={transactionDetailStyles.box}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[transactionDetailStyles.label, { paddingHorizontal: 14, paddingVertical: 24 }]}>{`ID TRANSAKSI:#${transaction?.id}`}</Text>
                    <Pressable onPress={_onCopyToClipboard}><Image source={COPY_ICON} style={[styles.icon, { tintColor: Colors.warm }]} /></Pressable>
                </View>
                <Divider />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 24 }}>
                    <Text style={transactionDetailStyles.label}>DETAIL TRANSAKSI</Text>
                    <Pressable onPress={_onToggleDetail} style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={[transactionDetailStyles.sublabel, { color: Colors.warm, paddingRight: 5 }]}>{visible ? 'Tutup' : 'Detail'}</Text>
                        <Image source={ARROW_DOWN_ICON} style={[styles.icon, { tintColor: Colors.warm, transform: [{rotate: visible ? '180deg' : '0deg' }]}]} />
                    </Pressable>
                </View>
                <Divider />
                {visible && (
                    <View style={{ paddingHorizontal: 14, paddingBottom: 14, opacity: visible ? 1 : 0 }}>
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
                            <Text style={transactionDetailStyles.label}>NOMINAL</Text>
                            <Text style={transactionDetailStyles.sublabel}>{ transaction?.amount ? Utilities.currencyFormat(transaction?.amount.toString()) : null}</Text>
                        </View>
                    </View>
                    <View style={transactionDetailStyles.item}>
                        <View style={{ flex: 1 }}>
                            <Text style={transactionDetailStyles.label}>BERITA TRANSFER</Text>
                            <Text style={transactionDetailStyles.sublabel}>{transaction?.remark}</Text>
                        </View>
                        <View style={{ flex: 0.3 }}>
                            <Text style={transactionDetailStyles.label}>KODE UNIK</Text>
                            <Text style={transactionDetailStyles.sublabel}>{transaction?.unique_code}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={transactionDetailStyles.label}>WAKTU DIBUAT</Text>
                        <Text style={transactionDetailStyles.sublabel}>{transaction?.created_at ? Utilities.parseDateTime(transaction.created_at) : null}</Text>
                    </View>
                </View>
                )}
            </View>
        </ScrollView>
    )
}

const transactionDetailStyles = StyleSheet.create({
    box: { backgroundColor: Colors.white, marginTop: 14},
    label: { fontWeight: '700', fontSize: 13, color: Colors.black, lineHeight: 18 },
    sublabel: { fontWeight: '400', fontSize: 12, color: Colors.black, lineHeight: 18 },
    item: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 }
})

export default TransactionDetail;