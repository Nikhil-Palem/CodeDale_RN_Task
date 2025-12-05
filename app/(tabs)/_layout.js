// import { Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useIsFocused } from "@react-navigation/native";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View, Pressable } from "react-native";
import * as Haptics from 'expo-haptics';
// -----------------------------------------------------
// Animated Icon Wrapper
// -----------------------------------------------------
const AnimatedTabIcon = ({ children }) => {
    const scale = useRef(new Animated.Value(1)).current;
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.2,
                    duration: 150,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: 1,
                    duration: 150,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [isFocused]);

    return <Animated.View style={{ transform: [{ scale }] }}>{children}</Animated.View>;
};

// Animated scanner center icon: scales / lifts when focused to give click feedback
// Scanner button that animates on focus and press + gives haptic feedback
function ScannerButton({ focused }) {
    const focusScale = useRef(new Animated.Value(1)).current;
    const lift = useRef(new Animated.Value(0)).current;
    const pressScale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(focusScale, { toValue: focused ? 1.12 : 1, friction: 6, useNativeDriver: true }),
            Animated.timing(lift, { toValue: focused ? -6 : 0, duration: 180, useNativeDriver: true }),
        ]).start();
    }, [focused]);

    const handlePressIn = () => {
        Haptics.selectionAsync();
        Animated.spring(pressScale, { toValue: 0.92, friction: 8, useNativeDriver: true }).start();
    };

    const handlePressOut = () => {
        Animated.spring(pressScale, { toValue: 1, friction: 8, useNativeDriver: true }).start();
    };

    const combinedScale = Animated.multiply(focusScale, pressScale);
    const background = focused ? '#5A30F0' : '#6A3CFF';

    return (
        <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.fabContainer}>
            <Animated.View style={{ transform: [{ scale: combinedScale }, { translateY: lift }] }}>
                <View style={[styles.fabGlow, { backgroundColor: '#fff' }]} />
                <View style={[styles.fabButton, { backgroundColor: background, shadowOpacity: focused ? 0.32 : 0.22 }]}>
                    <MaterialCommunityIcons name="qrcode-scan" size={36} color="#fff" />
                </View>
            </Animated.View>
        </Pressable>
    );
}


// -----------------------------------------------------
// MAIN LAYOUT WITH TABS
// -----------------------------------------------------
const _layout = () => {
    return (
        <>
            <StatusBar style="dark" />

            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: "#000",
                    tabBarInactiveTintColor: "#888",
                    tabBarLabelStyle: { fontSize: 11 },
                    tabBarStyle: {
                        height: 80,
                        paddingBottom: 12,
                        borderTopWidth: 2,
                        borderLeftWidth: 2,
                        borderRightWidth: 2,
                        borderTopLeftWidth: 2,
                        borderTopRightWidth: 2,
                        borderTopColor: "#583bff57",
                        borderTopLeftRadius: 28,
                        borderTopRightRadius: 28,
                    },
                }}
            >
                {/* ----------------------- HOME ----------------------- */}
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Home",
                        headerShown: false,
                        statusBarStyle: "dark",
                        tabBarIcon: ({ color, size }) => (
                            <AnimatedTabIcon>
                                <Ionicons name="home" size={26} color={color} />
                            </AnimatedTabIcon>
                        ),
                    }}
                />

                {/* ----------------------- INSIGHTS ----------------------- */}
                <Tabs.Screen
                    name="Insights"
                    options={{
                        title: "Insights",
                        headerShown: false,
                        statusBarStyle: "dark",
                        tabBarIcon: ({ color, size }) => (
                            <AnimatedTabIcon>
                                <Foundation name="graph-pie" size={26} color={color} />
                            </AnimatedTabIcon>
                        ),
                    }}
                />

                {/* ----------------------- SCANNER (CENTER BUTTON) ----------------------- */}
                <Tabs.Screen
                    name="Scanner"
                    options={{
                        tabBarLabel: "",
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.fabContainer}>
                                <View style={styles.fabGlow} />
                                <View style={styles.fabButton}>
                                    <AnimatedTabIcon>

                                        <MaterialCommunityIcons
                                            name="qrcode-scan"
                                            size={36}
                                            color="#fff"
                                        />
                                    </AnimatedTabIcon>
                                </View>
                            </View>
                        ),
                    }}
                />

                {/* ----------------------- CARDS ----------------------- */}
                <Tabs.Screen
                    name="Cards"
                    options={{
                        title: "Cards",
                        headerShown: false,
                        statusBarStyle: "dark",
                        tabBarIcon: ({ color, size }) => (
                            <AnimatedTabIcon>
                                <MaterialCommunityIcons name="cards" size={26} color={color} />
                            </AnimatedTabIcon>
                        ),
                    }}
                />

                {/* ----------------------- PROFILE ----------------------- */}
                <Tabs.Screen
                    name="Profile"
                    options={{
                        title: "Profile",
                        headerShown: false,
                        statusBarStyle: "dark",
                        tabBarIcon: ({ color, size }) => (
                            <AnimatedTabIcon>
                                <Ionicons name="person-circle" size={26} color={color} />
                            </AnimatedTabIcon>
                        ),
                    }}
                />
            </Tabs>
        </>
    );
}
export default _layout;

const styles = StyleSheet.create({
    fabContainer: {
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        top: -20, // floating effect
    },

    fabGlow: {
        position: "absolute",
        width: 80,
        height: 80,
        borderWidth: 4,
        borderColor: "#583bff96",
        borderRadius: 40,
        backgroundColor: "#fff",
        shadowColor: "#7B4DFF",
        shadowOpacity: 0.6,
        shadowRadius: 20,
        borderWidth: 2,
        borderColor: "#6A3CFF33",
    },

    fabButton: {
        width: 65,
        height: 65,
        borderRadius: 40,
        backgroundColor: "#6A3CFF",
        justifyContent: "center",
        alignItems: "center",
        elevation: 8,
        shadowColor: "#6A3CFF",
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
});