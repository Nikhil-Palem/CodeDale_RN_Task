import { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';

const Insights = () => {
  const floatY = useRef(new Animated.Value(10)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(floatY, { toValue: 0, duration: 400, useNativeDriver: true }),
      Animated.timing(fade, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, { opacity: fade, transform: [{ translateY: floatY }] }]}>
        <Text style={styles.title}>Insights</Text>
        <Text style={styles.subtitle}>Charts, analytics snippets and demo content.</Text>
      </Animated.View>
    </View>
  );
};

export default Insights;

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  box: { width: Math.min(520, width - 48), padding: 20, borderRadius: 14, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#2b2b2b', marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#666', textAlign: 'center' },
});