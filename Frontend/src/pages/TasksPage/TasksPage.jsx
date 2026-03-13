import { useState, useEffect, useCallback } from 'react';
import { fetchTasks } from '../../services/api';
import Header from '../../components/Header';
import NewTaskForm from '../../components/NewTaskForm';
import TaskList from '../../components/TaskList';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Pagination & Filtering state
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetchTasks({ 
        limit, 
        offset, 
        status: statusFilter, 
        q: searchQuery 
      });
      // Handle the case where the API returns the format specified in requirements
      if (response && response.data) {
        setTasks(response.data);
      } else if (Array.isArray(response)) {
        // Fallback in case the API just returns the array directly
        setTasks(response);
      } else {
        setTasks([]);
      }
    } catch (err) {
      setError(err.message || 'Error loading tasks');
    } finally {
      setIsLoading(false);
    }
  }, [limit, offset, statusFilter, searchQuery]);

  // Initial load and reload when dependencies (filters, pagination) change
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setOffset(0); // Reset pagination on new search
  };

  const handleFilterChange = (status) => {
    setStatusFilter(status);
    setOffset(0); // Reset pagination on new filter
  };

  const handlePageChange = (newOffset) => {
    setOffset(newOffset);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header 
        onSearch={handleSearch} 
        onFilterChange={handleFilterChange} 
        currentFilter={statusFilter} 
      />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-6">
            <TaskList 
              tasks={tasks}
              isLoading={isLoading}
              error={error}
              offset={offset}
              limit={limit}
              onStatusChange={loadTasks}
              onPageChange={handlePageChange}
            />
          </div>

          {/* Sidebar / Form Area */}
          <div className="lg:col-span-4 lg:sticky lg:top-[120px]">
            <NewTaskForm onTaskCreated={loadTasks} />
          </div>

        </div>
      </main>
    </div>
  );
};

export default TasksPage;
