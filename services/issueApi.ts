import api from './api';

export const issueApi = {
  createIssue: (title: string, description: string, category: string) =>
    api.post('/api/issues', { title, description, category }),

  getMyIssues: () => api.get('/api/issues/my'),

  getAllIssues: () => api.get('/api/issues'),

  updateIssue: (id: string, status: string, remarks: string) =>
    api.put(`/api/issues/${id}`, { status, remarks }),
};
