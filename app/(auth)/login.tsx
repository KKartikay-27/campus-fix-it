import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import PasswordInput from '../../components/PasswordInput';
import { Colors } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const loggedInUser = await login(email, password);

      // role-based navigation
      if (loggedInUser.role === 'admin') {
        router.replace('/(admin)');
      } else {
        router.replace('/(student)');
      }
    } catch (error: any) {
      Alert.alert('Login failed', 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Campus <Text style={styles.highlight}>Fix-it</Text>
        </Text>

        <Text style={styles.tagline}>Report. Track. Resolve.</Text>

        <AppInput placeholder="Email" value={email} onChangeText={setEmail} />
        <PasswordInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />

        <AppButton title={loading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={loading} />

        <Link href="/(auth)/register" style={styles.link}>
          Don’t have an account? <Text style={styles.linkHighlight}>Register</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, justifyContent: 'center', padding: 20 },
  card: { backgroundColor: Colors.card, padding: 24, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 10, elevation: 5 },
  title: { fontSize: 28, fontWeight: '800', color: Colors.text, textAlign: 'center', letterSpacing: 0.5 },
  highlight: { color: Colors.primary },
  tagline: { fontSize: 13, color: Colors.muted, textAlign: 'center', marginTop: 4, marginBottom: 16 },
  link: { marginTop: 16, textAlign: 'center', color: Colors.muted, fontSize: 14 },
  linkHighlight: { color: Colors.primary, fontWeight: '600' },
});
