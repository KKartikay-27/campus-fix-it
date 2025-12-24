import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { issueApi } from '../../services/issueApi';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/theme';

export default function StudentDashboard() {
  const { user, token, logout } = useAuth();
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout },
      ]
    );
  };

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const res = await issueApi.getMyIssues();
      setIssues(res.data.issues || []);
    } catch (err) {
      console.error('Error fetching issues:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchIssues();
  }, [token]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return Colors.warning || '#f59e0b';
      case 'In Progress':
        return Colors.primary;
      case 'Resolved':
        return Colors.success || '#22c55e';
      default:
        return Colors.text;
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.category}>{item.category}</Text>

      <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
        Status: {item.status}
      </Text>

      {item.remarks ? (
        <Text style={styles.remarks}>Remarks: {item.remarks}</Text>
      ) : null}
    </View>
  );

  return (
    <View style={styles.container}>

      <View style={styles.headerRow}>
        <Text style={styles.header}>Hi, {user?.name}</Text>

        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>


      <TouchableOpacity
        style={styles.createButton}
        onPress={() => router.push('/(student)/create')}
      >
        <Text style={styles.createText}>+ Create New Issue</Text>
      </TouchableOpacity>

      {loading ? (
        <Text style={styles.empty}>Loading issues...</Text>
      ) : (
        <FlatList
          data={issues}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          onRefresh={fetchIssues}
          refreshing={loading}
          ListEmptyComponent={
            <Text style={styles.empty}>No issues reported yet.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.background,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
  },

  createButton: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  createText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
  card: {
    backgroundColor: Colors.card,
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  category: {
    color: Colors.primary,
    marginTop: 4,
  },
  status: {
    marginTop: 6,
    fontWeight: '600',
  },
  remarks: {
    marginTop: 6,
    fontStyle: 'italic',
    color: Colors.muted,
  },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    color: Colors.muted,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logout: {
    color: Colors.danger || '#ef4444',
    fontWeight: '600',
  },

});
