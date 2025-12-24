import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { router } from 'expo-router';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import { Colors } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { issueApi } from '../../services/issueApi';

export default function CreateIssue() {
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const ISSUE_CATEGORIES = [
    'Electrical',
    'Water',
    'Internet',
    'Infrastructure',
  ];

  const submitIssue = async () => {
    // ✅ Validate FIRST
    if (!title || !description || !category) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const res = await issueApi.createIssue(title, description, category);

      if (res.data.success) {
        Alert.alert('Success', 'Issue submitted successfully');
        setTitle('');
        setDescription('');
        setCategory('');

        router.replace('/(student)');

      } else {
        Alert.alert('Error', res.data.message);
      }
    } catch (err: any) {
      Alert.alert(
        'Error',
        err.response?.data?.message || err.message || 'Something went wrong'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Issue</Text>

      <AppInput
        placeholder="Issue Title"
        value={title}
        onChangeText={setTitle}
      />

      {/* Category Picker */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Category</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={category}
            onValueChange={(value) => setCategory(value)}
          >
            <Picker.Item label="Select category" value="" />
            {ISSUE_CATEGORIES.map((cat) => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
          </Picker>
        </View>
      </View>

      <AppInput
        placeholder="Issue Description"
        value={description}
        onChangeText={setDescription}
        style={styles.descriptionInput}
        multiline
      />

      <AppButton
        title={loading ? 'Submitting...' : 'Submit Issue'}
        onPress={submitIssue}
        disabled={loading}
      />
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
    marginBottom: 20,
    textAlign: 'center',
  },
  pickerContainer: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 6,
    color: Colors.text,
    fontWeight: '500',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: Colors.border || '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: Colors.card || '#fff',
  },
  descriptionInput: {
    height: 120,
    textAlignVertical: 'top',
  },
});
