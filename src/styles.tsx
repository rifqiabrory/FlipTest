import { StyleSheet } from 'react-native';
import { Colors } from './utilities';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    icon: { 
        height: 24, 
        width: 24, 
        tintColor: Colors.softGrey 
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    retryButtton: {
        borderRadius: 4,
        paddingVertical: 5,
        paddingHorizontal: 20,
        backgroundColor: Colors.warm,
    },
    retryLabel: {
        fontSize: 13,
        fontWeight: '600',
        lineHeight: 15,
        letterSpacing: 0.2,
        textTransform: 'uppercase',
        color: Colors.white
    }
})