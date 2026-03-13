import { useState } from 'react';
import { createTask } from '../../services/api';

const NewTaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await createTask({ title, description });
      setTitle('');
      setDescription('');
      onTaskCreated(); // Trigger a refresh of the list
    } catch (err) {
      setError(err.message || 'Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 hover:shadow-md transition-shadow">
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Create New Task
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 flex items-start gap-2">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Task Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all bg-gray-50/50"
            placeholder="What needs to be done?"
            disabled={isSubmitting}
          />
        </div>

        <div>
           <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="2"
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none bg-gray-50/50"
            placeholder="Add some details..."
            disabled={isSubmitting}
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-600/30 transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </>
            ) : (
              'Create Task'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTaskForm;
