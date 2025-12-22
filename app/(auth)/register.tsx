import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import PasswordInput from '../../components/PasswordInput';
import { Colors } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      if (!name || !email || !password) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }

      setLoading(true);
      const newUser = await register(name, email, password);
      
      if (newUser) {
        Alert.alert('Success', 'Account created successfully!', [
          {
            text: 'OK',
            onPress: () => {
              // Navigate based on user role
              router.replace(newUser.role === 'admin' ? '/(admin)' : '/(student)');
            }
          }
        ]);
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      Alert.alert('Error', error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>

        <View style={styles.form}>
          <AppInput placeholder="Name" value={name} onChangeText={setName} />
          <AppInput placeholder="Email" value={email} onChangeText={setEmail} />
          <PasswordInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <AppButton
          title={loading ? 'Creating account...' : 'Register'}
          onPress={handleRegister}
          disabled={loading}
        />

        <Link href="/(auth)/login" style={styles.link}>
          Already have an account? <Text style={styles.linkHighlight}>Login</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, justifyContent: 'center', padding: 20 },
  card: { backgroundColor: Colors.card, padding: 24, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 10, elevation: 5 },
  title: { fontSize: 26, fontWeight: '700', color: Colors.text, textAlign: 'center' },
  form: { marginTop: 20 },
  link: { marginTop: 16, textAlign: 'center', color: Colors.muted, fontSize: 14 },
  linkHighlight: { color: Colors.primary, fontWeight: '600' },
});
