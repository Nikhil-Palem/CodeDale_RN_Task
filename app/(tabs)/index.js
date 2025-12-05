import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import ContactList from '../../components/homeScreenComponents/ContactList';
import TopCard from '../../components/homeScreenComponents/TopCard';
import TransactionItem from '../../components/homeScreenComponents/TransactionItem';
import { COLORS } from '../../constants/Theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
const Index = () => {
    const transactions = [
        {
            id: '1',
            title: 'Youtube Premium',
            subtitle: 'Monthly Subscription',
            date: '22 May 2025',
            amount: '-₹190.00',
            icon: 'youtube',
        },
        {
            id: '2',
            title: 'Instamart',
            subtitle: 'Groceries',
            date: '12 May 2025',
            amount: '-₹699.00',
            icon: 'shopping-cart',
        },
        {
            id: '3',
            title: 'Salary',
            subtitle: 'Company XYZ',
            date: '01 May 2025',
            amount: '+₹45,000.00',
            icon: 'briefcase',
        },
    ];

    const [actionsOpen, setActionsOpen] = useState(true);
    const rotateAnim = useRef(new Animated.Value(actionsOpen ? 0 : 1)).current;

    useEffect(() => {
        Animated.timing(rotateAnim, { toValue: actionsOpen ? 0 : 1, duration: 300, useNativeDriver: true }).start();
    }, [actionsOpen]);

    const rotateDeg = rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            {/* WRAPPER FOR GRADIENT + ARROW */}
            <View style={{ position: 'relative' }}>
                <LinearGradient
                    colors={[
                        COLORS.gradientStart,
                        COLORS.gradientMiddle,
                        COLORS.gradientEnd
                    ]}
                    start={[1, 1]}
                    end={[0, 0]}
                    style={styles.topBackground}
                >
                    <SafeAreaView>
                        <View style={[styles.header, { borderRadius: 14 }]}>
                            <Image
                                source={require('../../assets/CashlyLogo.png')}
                                style={styles.logo}
                            />

                            <View style={styles.headerRight}>
                                <TouchableOpacity style={styles.headerIcon}>
                                    <Ionicons name="notifications-outline" size={20} color="#fff" />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.headerIcon}>
                                    <MaterialCommunityIcons
                                        name="calendar-month-outline"
                                        size={20}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TopCard isOpen={actionsOpen} />
                    </SafeAreaView>
                </LinearGradient>
                {/* FIXED ARROW OUTSIDE GRADIENT */}
                <View style={styles.downArrowContainer} pointerEvents="box-none">
                    <TouchableOpacity activeOpacity={0.85} onPress={() => setActionsOpen((s) => !s)}>
                        <LinearGradient
                            colors={[COLORS.gradientMiddle, COLORS.gradientEnd]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.downTab}
                        >
                            <Animated.View style={{ transform: [{ rotate: rotateDeg }] }}>
                                <MaterialCommunityIcons name="chevron-down" size={35} color="#fff" />
                            </Animated.View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Contact Lists</Text>
                        <TouchableOpacity style={styles.viewAllBtn}>
                            <Text style={styles.viewAll}>View all</Text>
                            <MaterialIcons name="keyboard-arrow-right" size={12} color="black" style={styles.rightArrow} />
                        </TouchableOpacity>
                    </View>

                    <ContactList />
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Transactions</Text>
                        <TouchableOpacity style={styles.viewAllBtn}>
                            <Text style={styles.dateBtn}>July 25, 2025</Text>
                            <FontAwesome name="calendar-plus-o" size={12} color="black" style={styles.calendar} />
                        </TouchableOpacity>
                    </View>

                    {transactions.map((tx) => (
                        <TransactionItem key={tx.id} item={tx} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    topBackground: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 0,
        paddingHorizontal: 16,
        paddingBottom: 12,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 0,
        marginTop: 10,
    },

    logo: {
        width: 140,
        height: 40,
        resizeMode: 'contain',
    },

    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    headerIcon: {
        width: 42,
        height: 42,
        borderRadius: 20,
        backgroundColor: '#4327e5b5',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },

    scrollContent: {
        paddingTop: 12,
        paddingBottom: 40,
    },

    section: {
        paddingHorizontal: 16,
        marginTop: 18,
    },

    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },

    sectionTitle: {
        color: COLORS.darkText,
        fontSize: 16,
        fontWeight: '700',
    },
    viewAllBtn: {
        borderWidth: 1.3,
        padding: 5,
        borderRadius: 18,
        borderColor: COLORS.cardShadow,
        flexDirection: 'row',
        alignItems: 'center',

    },

    viewAll: {
        fontSize: 12.5,
        color: '#7e7e8eff',
        fontWeight: '600',
        opacity: 0.8,
        marginRight: 2,
    },
    rightArrow: {
        padding: 0,
        margin: 0,
        borderWidth: 1.3,
        borderColor: 'rgba(133, 55, 254, 1)',
        borderRadius: 10,
        color: 'rgba(133, 55, 254, 1)',
    },
    dateBtn: {
        fontSize: 12.5,
        color: '#7e7e8eff',
        fontWeight: '600',
        opacity: 0.8,
        marginRight: 2,
    },
    downArrowContainer: {
        position: "absolute",
        bottom: -28,
        width: "100%",
        alignItems: "center",
        zIndex: 999,
    },

    downTab: {
        width: 60,
        height: 60,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
    },
    downArrow: {
        position: 'absolute',
        bottom: -30, // now free to float
        left: '50%',
        transform: [{ translateX: -20 }],
        width: 60,
        height: 60,
        backgroundColor: '#573BFF',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 6,
        zIndex: 50,
    },
    contactFadeWrapper: {
        position: "relative",
        paddingVertical: 5,
        marginBottom: 10,
    },

    fadeCircle: {
        position: "absolute",
        right: -40,       // pushes the circle to right side
        top: -20,
        width: 200,
        height: 200,
        borderRadius: 200,
        opacity: 0.22,     // adjust strength
        zIndex: 1,
    },
    calendar: {
        marginLeft: 4,
        color: 'rgba(133, 55, 254, 1)'
    }
});
