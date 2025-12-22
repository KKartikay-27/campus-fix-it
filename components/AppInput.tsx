import { TextInput, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';

export default function AppInput(props: any) {
  return (
    <TextInput
      {...props}
      placeholderTextColor={Colors.muted}
      style={[styles.input, props.style]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.text,
    marginBottom: 14,
    backgroundColor: Colors.card,
  },
});
