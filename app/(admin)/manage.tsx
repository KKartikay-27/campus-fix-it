import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/theme';

export default function ManageIssues() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Issues</Text>
      <Text style={styles.subtitle}>
        Issue list & status update UI goes here
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.muted,
  },
});
