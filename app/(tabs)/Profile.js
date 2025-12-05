import { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';

const Profile = () => {
  const slideX = useRef(new Animated.Value(-20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideX, { toValue: 0, duration: 400, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 450, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, { opacity, transform: [{ translateX: slideX }] }]}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>A short profile preview — ready for recruiter review.</Text>
      </Animated.View>
    </View>
  );
};

export default Profile;

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  card: { width: Math.min(520, width - 48), padding: 20, borderRadius: 14, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#2b2b2b', marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#666', textAlign: 'center' },
});