import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/theme';

export default function PasswordInput({ value, onChangeText, placeholder, style }: any) {
  const [isSecure, setIsSecure] = useState(true);

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || 'Password'}
        secureTextEntry={isSecure}
        placeholderTextColor={Colors.gray}
      />
      <TouchableOpacity 
        style={styles.iconContainer}
        onPress={() => setIsSecure(!isSecure)}
      >
        <Ionicons 
          name={isSecure ? 'eye-off' : 'eye'} 
          size={20} 
          color={Colors.gray} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
    position: 'relative',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: Colors.white,
    paddingRight: 50, // Space for the icon
  },
  iconContainer: {
    position: 'absolute',
    right: 16,
    top: 15,
    zIndex: 10,
  },
});
