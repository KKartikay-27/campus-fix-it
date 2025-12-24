import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { Colors } from '../../constants/theme';
import AppInput from '@/components/AppInput';

function IssueCard({ issue, onUpdate }: any) {
  const [status, setStatus] = useState(issue.status);
  const [remarks, setRemarks] = useState(issue.remarks || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleUpdate = async (newStatus: string, newRemarks: string) => {
    setSaving(true);
    try {
      await onUpdate(issue._id, newStatus, newRemarks);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error('Update error:', err);
      Alert.alert('Error', 'Failed to update issue');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{issue.title}</Text>
      <Text style={styles.category}>Category: {issue.category}</Text>
      <Text style={styles.sub}>Reported by: {issue.createdBy.name}</Text>
      <Text style={styles.sub}>Email: {issue.createdBy.email}</Text>

      <Text style={styles.label}>Status</Text>
      <Picker
        selectedValue={status}
        onValueChange={(value) => {
          setStatus(value);
          handleUpdate(value, remarks);
        }}
        enabled={!saving}
        style={styles.picker}
      >
        <Picker.Item label="Open" value="Open" />
        <Picker.Item label="In Progress" value="In Progress" />
        <Picker.Item label="Resolved" value="Resolved" />
      </Picker>

      <AppInput
        placeholder="Remarks"
        value={remarks}
        onChangeText={(text: any) => setRemarks(text)}
        onBlur={() => handleUpdate(status, remarks)}
        editable={!saving}
      />

      {saved && <Text style={styles.saved}>Saved ✓</Text>}
    </View>
  );
}

export default function AdminDashboard() {
  const { token, logout } = useAuth();
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const ISSUE_CATEGORIES = ['Electrical', 'Water', 'Internet', 'Infrastructure'];

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/issues', {
        headers: { Authorization: `Bearer ${token}` },
      });
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

  const updateIssue = async (id: string, status: string, remarks: string) => {
    await api.put(
      `/api/issues/${id}`,
      { status, remarks },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // optionally refresh list to get latest from backend
    fetchIssues();
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout },
    ]);
  };

  const filteredIssues = issues.filter((issue) => {
    const statusMatch = statusFilter === 'All' || issue.status === statusFilter;
    const categoryMatch = categoryFilter === 'All' || issue.category === categoryFilter;
    return statusMatch && categoryMatch;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.header}>Admin Dashboard</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filterRow}>
        <View style={styles.filterBox}>
          <Text style={styles.filterLabel}>Status</Text>
          <Picker
            selectedValue={statusFilter}
            onValueChange={setStatusFilter}
          >
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Open" value="Open" />
            <Picker.Item label="In Progress" value="In Progress" />
            <Picker.Item label="Resolved" value="Resolved" />
          </Picker>
        </View>

        <View style={styles.filterBox}>
          <Text style={styles.filterLabel}>Category</Text>
          <Picker
            selectedValue={categoryFilter}
            onValueChange={setCategoryFilter}
          >
            <Picker.Item label="All" value="All" />
            {ISSUE_CATEGORIES.map((cat) => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Issue List */}
      <FlatList
        data={filteredIssues}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <IssueCard issue={item} onUpdate={updateIssue} />
        )}
        refreshing={loading}
        onRefresh={fetchIssues}
        ListEmptyComponent={<Text style={styles.empty}>No issues reported yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: Colors.background },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  header: { fontSize: 22, fontWeight: '700', color: Colors.text },
  logout: { color: Colors.danger || '#ef4444', fontWeight: '600' },
  filterRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  filterBox: { flex: 1, backgroundColor: Colors.card, borderRadius: 8, padding: 6 },
  filterLabel: { fontSize: 12, fontWeight: '600', color: Colors.muted, marginBottom: 4 },
  card: { backgroundColor: Colors.card, padding: 16, borderRadius: 10, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 },
  title: { fontSize: 18, fontWeight: '600', color: Colors.text },
  category: { marginTop: 4, fontWeight: '600', color: Colors.primary },
  sub: { marginTop: 2, color: Colors.muted },
  label: { marginTop: 8, fontWeight: '600', color: Colors.text },
  picker: { backgroundColor: Colors.lightGray, borderRadius: 8, marginVertical: 8 },
  saved: { color: Colors.success || '#22c55e', marginTop: 4, fontWeight: '600' },
  empty: { textAlign: 'center', marginTop: 50, color: Colors.muted },
});
