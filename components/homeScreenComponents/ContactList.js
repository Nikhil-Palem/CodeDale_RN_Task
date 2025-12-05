import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const contacts = [
  { id: "c1", name: "Fany", avatar: require("../../assets/fany.png"), mask: "**12" },
  { id: "c2", name: "Robin", avatar: require("../../assets/Luffy.png"), mask: "**56" },
  { id: "c3", name: "Sam", avatar: require("../../assets/Robin.png"), mask: "" },
];

const ContactList = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/* Add Button */}
      <TouchableOpacity style={styles.addCard}>
        <Text style={styles.addPlus}>+</Text>
      </TouchableOpacity>

      {/* Contact Cards */}
      {contacts.map((c) => (
        <View key={c.id} style={styles.card}>
          <View style={styles.avatarWrapper}>
            <Image source={c.avatar} style={styles.avatar} resizeMode="cover" />
          </View>

          <View style={styles.textBlock}>
            <Text style={styles.name}>{c.name}</Text>
            {c.mask ? <Text style={styles.mask}>{c.mask}</Text> : null}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default ContactList;

const styles = StyleSheet.create({
  // ⭐ EXACT FIGMA “+” BUTTON
  addCard: {
    width: 49,
    height: 79,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#A66BFF",
    borderStyle: "dashed",
    backgroundColor: "rgba(246,240,255,0.4)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  addPlus: {
    fontSize: 36,
    color: "#A45CFF",
    fontWeight: "300",
    marginTop: -4,
  },

  // ⭐ EXACT CONTACT CARD LIKE FIGMA
  card: {
    width: 160,
    height: 79,
    borderRadius: 20,
    backgroundColor: "rgba(6, 31, 53, 0.05)",
    marginRight: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  // ⭐ PERFECT WHITE RING AROUND AVATAR
  avatarWrapper: {
    width: 58,
    height: 58,
    borderRadius: 29,
    padding: 3,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
  },

  textBlock: {
    marginLeft: 14,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },

  mask: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "500",
    color: "#8C8C8C",
  },
});
