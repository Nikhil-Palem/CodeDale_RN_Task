import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { COLORS } from '../../constants/Theme';

const { width } = Dimensions.get('window');

const TopCard = ({ isOpen = true }) => {
    const anim = useRef(new Animated.Value(isOpen ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(anim, {
            toValue: isOpen ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isOpen]);

    const actionsHeight = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 180] });

    return (
        <View style={[styles.wrapper, { zIndex: 1000 }]}>
            <LinearGradient
                colors={[COLORS.innerCardStart, COLORS.innerCardEnd]}
                start={{ x: 0.5, y: 0 }}   // top-center
                end={{ x: 0.5, y: 1 }}
                style={styles.card}
            >
                {/* SEARCH: search icon, input, filter icon embedded at end */}
                <View style={styles.searchRow}>
                    <View style={styles.searchInput}>
                        <Ionicons name="search-outline" size={23} color="#061f35b1" fontWeight="500" />
                        <TextInput
                            placeholder="Pay anyone on UPI"
                            placeholderTextColor="#061f3585"
                            style={styles.input}
                            fontWeight="500"
                            underlineColorAndroid="transparent"
                        />

                        {/* filter icon inside the input on the right (keeps it visually inside field) */}
                        <TouchableOpacity style={styles.filterInside}>
                            <Ionicons name="filter-outline" size={16} color="#754AD3" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* BALANCE ROW: rupee small, number less-heavy, + button to right */}
                <View style={styles.balanceRow}>
                    <View style={styles.balanceLeft}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalText}>Total Balance</Text>
                            <MaterialIcons name="local-fire-department" size={16} color="white" />
                        </View>
                        <View style={styles.balanceAmountRow}>
                            <Text style={styles.rupee}>₹</Text>
                            <Text style={styles.balanceText}>1,32,000.04</Text>
                            <Text style={styles.balSuffix}> Bal</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.plusBtn}>
                        <View style={styles.PlusContainer} >
                            <Text style={styles.plusText}>+</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </LinearGradient>
            {/* ACTIONS: icons + labels (collapsible) */}
            <Animated.View style={{ height: actionsHeight, overflow: 'hidden', width: '100%' }}>
                <LinearGradient
                    colors={[COLORS.ActionStart, COLORS.ActionMiddle, COLORS.ActionEnd]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.card}
                >
                    {/* 3 dots top right */}
                    <TouchableOpacity style={styles.topRightMenu}>
                        <MaterialCommunityIcons name="dots-horizontal" size={24} color="#fff" />
                    </TouchableOpacity>

                    <View style={styles.quickActions}>
                        <ActionItem
                            iconComp={<MaterialCommunityIcons name="qrcode-scan" size={20} color="#fff" />}
                            label="Scan & Pay"
                        />
                        <ActionItem
                            iconComp={<Ionicons name="person-outline" size={20} color="#fff" />}
                            label="Pay Contact"
                            style={{ marginTop: 25 }}
                        />
                        <ActionItem
                            iconComp={<FontAwesome5 name="university" size={18} color="#fff" />}
                            label="Bank Transfer"
                            style={{ marginTop: 25 }}
                        />
                        <ActionItem
                            iconComp={<MaterialCommunityIcons name="cellphone" size={20} color="#fff" />}
                            label="Mobile Recharge"
                        />
                    </View>

                </LinearGradient>
            </Animated.View>
        </View>
    );
};

export default TopCard;

/* small component for action */
const ActionItem = ({ iconComp, label, style }) => {
    return (
        <View style={[styles.action, style]}>
            <View style={styles.actionIcon}>
                {iconComp}
            </View>
            <Text style={styles.actionText}>
                {label.split(" ")[0] + "\n" + label.split(" ").slice(1).join(" ")}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 8,
        marginBottom: 6,
        zIndex:1001,
    },
    totalRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        color: 'white',
    },
    /* card */
    card: {
        borderRadius: 22,
        padding: 16,
        // Add subtle shadow for both android and iOS
        shadowColor: COLORS.cardShadow || '#000',
        shadowOpacity: 0.18,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 6 },
        elevation: 6,
    },

    /* search */
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    searchInput: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        // paddingHorizontalL: 12,
        paddingLeft: 12,
        paddingRight: 6,
        height: 46,
        borderRadius: 14,
        position: 'relative',
    },

    input: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 14,
        flex: 1,
        paddingVertical: Platform.OS === 'ios' ? 10 : 6,
    },

    /* filter inside the input on far right */
    filterInside: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: 'rgba(117, 74, 211, 0.09)',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },

    /* balance row */
    balanceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 14,
    },

    balanceLeft: {
        flex: 1,
    },

    totalText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
    },

    balanceAmountRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 6,
    },

    rupee: {
        color: '#fff',
        fontSize: 16, // smaller rupee symbol
        marginRight: 4,
        lineHeight: 36,
        fontWeight: '600',
    },

    balanceText: {
        color: '#fff',
        fontSize: 28, // slightly smaller than previous heavy 30+
        fontWeight: '600', // less bold to match Figma
    },

    balSuffix: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 12,
        marginLeft: 8,
        alignSelf: 'flex-end',
        paddingBottom: 4,
    },

    plusBtn: {
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    PlusContainer: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        borderRadius: 20,
    },
    plusText: {
        color: 'rgb(117, 74, 211)',
        fontSize: 20,
        fontWeight: '600',
        textAlignVertical: 'center',
    },

    /* actions */
    quickActions: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    action: {
        alignItems: 'center',
        width: (width - 64) / 4, // keep spacing similar to figma
    },

    actionIcon: {
        width: 52,
        height: 52,
        borderRadius: 25,
        backgroundColor: '#4327e5b5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
        borderWidth: 0.2,
        borderColor: '#ffffff',
    },

    actionText: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.92)',
        textAlign: 'center',
        lineHeight: 16,
    },
    topRightMenu: {
        position: "absolute",
        right: 10,
        padding: 6,
    }

});
