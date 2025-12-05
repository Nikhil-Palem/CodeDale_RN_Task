import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../constants/Theme';

const getIcon = (icon) => {
  switch (icon) {
    case 'youtube':
      return <Ionicons name="logo-youtube" size={22} color="#FF3D3D" />;
    case 'shopping-cart':
      return <MaterialCommunityIcons name="cart-outline" size={22} color="#7B4BFF" />;
    case 'briefcase':
      return <MaterialCommunityIcons name="briefcase-outline" size={22} color="#12A24C" />;
    default:
      return <Ionicons name="wallet-outline" size={22} color="#7B4BFF" />;
  }
};

const TransactionItem = ({ item }) => {
  return (
    <View style={styles.card}>
      {/* LEFT ICON WRAPPER */}
      <View style={styles.iconWrap}>{getIcon(item.icon)}</View>

      {/* MIDDLE TEXT */}
      <View style={styles.mid}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>

      {/* RIGHT AMOUNT + DATE */}
      <View style={styles.right}>
        <Text
          style={[
            styles.amount,
            { color: item.amount.startsWith('+') ? '#12A24C' : '#FF4D4F' },
          ]}
        >
          {item.amount}
        </Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </View>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 16,

    // Soft Figma shadow
    shadowColor: '#4B4B70',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },

  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F4F3FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  mid: {
    flex: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.darkText,
  },

  subtitle: {
    fontSize: 12.5,
    color: COLORS.grey,
    marginTop: 4,
  },

  right: {
    alignItems: 'flex-end',
  },

  amount: {
    fontSize: 15,
    fontWeight: '700',
  },

  date: {
    fontSize: 11.5,
    color: COLORS.grey,
    marginTop: 6,
  },
});
