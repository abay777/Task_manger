const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Helper to handle fetch responses and throwing unified errors
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Something went wrong with the API call');
  }
  return response.json();
};

export const fetchTasks = async ({ limit = 10, offset = 0, status, q } = {}) => {
  const params = new URLSearchParams()
  params.append('limit', limit)
  params.append('offset', offset)
  if (status && status !== 'ALL') params.append('status', status)
  if (q) params.append('q', q)

  const response = await fetch(`${API_BASE_URL}/api/tasks?${params.toString()}`);
  return handleResponse(response);
};

export const createTask = async ({ title, description }) => {
  const response = await fetch(`${API_BASE_URL}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  });
  return handleResponse(response);
};

export const updateTaskStatus = async (id, status) => {
  const response = await fetch(`${API_BASE_URL}/api/tasks/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return handleResponse(response);
};
