import TaskItem from '../TaskItem';
import Pagination from '../Pagination';

const TaskList = ({ tasks, isLoading, error, onStatusChange, offset, limit, onPageChange }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-gray-100 shadow-sm animate-pulse">
        <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-3 bg-gray-100 rounded w-1/4"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center text-red-600">
        <svg className="w-12 h-12 mx-auto mb-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <h3 className="text-lg font-medium mb-1">Failed to load tasks</h3>
        <p className="text-sm opacity-80">{error}</p>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-gray-100 border-dashed text-gray-400 shadow-sm">
        <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-lg font-medium text-gray-600">No tasks found</p>
        <p className="text-sm">Create a new task or adjust your filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onStatusChange={onStatusChange} />
        ))}
      </div>
      
      <div className="pt-4">
        <Pagination 
          offset={offset} 
          limit={limit} 
          totalContent={tasks.length} 
          onPageChange={onPageChange} 
        />
      </div>
    </div>
  );
};

export default TaskList;
