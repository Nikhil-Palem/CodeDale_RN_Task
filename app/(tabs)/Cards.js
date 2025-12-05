import { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';

export default function Cards() {
  const pulse = useRef(new Animated.Value(1)).current;
  const slide = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 350, useNativeDriver: true }),
        Animated.timing(slide, { toValue: 0, duration: 350, useNativeDriver: true }),
      ]),
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1.06, duration: 700, useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
        ])
      ),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, { opacity, transform: [{ translateY: slide }, { scale: pulse }] }]}>
        <Text style={styles.title}>Cards</Text>
        <Text style={styles.subtitle}>Payment methods, mock data and UI showcase.</Text>
      </Animated.View>
    </View>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  card: { width: Math.min(520, width - 48), padding: 20, borderRadius: 14, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#2b2b2b', marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#666', textAlign: 'center' },
});