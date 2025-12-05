import { StyleSheet, Text, View } from 'react-native';

export default function ScannerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanner</Text>
      <Text style={styles.subtitle}>Scanner screen (placeholder)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 8,
    color: '#666',
  },
});
