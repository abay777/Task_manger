import { useState } from 'react';
import { updateTaskStatus } from '../../services/api';

const statusConfig = {
  OPEN: {
    label: 'Open',
    colors: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    next: 'IN_PROGRESS',
    nextLabel: 'Start Progress'
  },
  IN_PROGRESS: {
    label: 'In Progress',
    colors: 'bg-blue-50 text-blue-700 border-blue-200',
    next: 'DONE',
    nextLabel: 'Mark Done'
  },
  DONE: {
    label: 'Done',
    colors: 'bg-green-50 text-green-700 border-green-200',
    next: null,
    nextLabel: ''
  }
};

const TaskItem = ({ task, onStatusChange }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const config = statusConfig[task.status] || statusConfig.OPEN;

  const handleAdvanceStatus = async () => {
    if (!config.next || isUpdating) return;
    
    setIsUpdating(true);
    try {
      await updateTaskStatus(task.id, config.next);
      onStatusChange(); // refresh list
    } catch (error) {
      console.error('Failed to update status', error);
      alert('Failed to update task status'); // simple fallback
    } finally {
      setIsUpdating(false);
    }
  };

  const formattedDate = new Date(task.created_at).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <div className="group bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:border-indigo-100 transition-all duration-300 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {task.title}
          </h3>
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${config.colors}`}>
            {config.label}
          </span>
        </div>
        
        {task.description && (
          <p className="text-gray-500 text-sm mb-3 line-clamp-2">
            {task.description}
          </p>
        )}
        
        <div className="flex items-center text-xs text-gray-400 font-medium">
          <svg className="w-4 h-4 mr-1 pb-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Created on {formattedDate}
        </div>
      </div>

      <div className="flex-shrink-0 w-full sm:w-auto">
        {config.next && (
          <button
            onClick={handleAdvanceStatus}
            disabled={isUpdating}
            className={`w-full sm:w-auto px-5 py-2 rounded-xl text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isUpdating 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-50 text-indigo-600 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200 active:scale-95'
            }`}
          >
            {isUpdating ? 'Updating...' : config.nextLabel}
          </button>
        )}
      </div>

    </div>
  );
};

export default TaskItem;
