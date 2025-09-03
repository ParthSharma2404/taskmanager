import React, { useState, useEffect, useContext, useCallback } from 'react';
import Navbar from './NavBar';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [button, setButton] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  const fetchTasks = useCallback(async () => {
    if (!user) return;
    try {
      const response = await axios.get('http://localhost:5000/api/auth/tasks', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setTasks(response.data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err.response?.status, err.response?.data?.error || err.message);
      setError('Failed to load tasks');
    }
  }, [user]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setError('Title is required');
      return;
    }
    try {
      await axios.post(
        'http://localhost:5000/api/auth/tasks',
        { title, description, priority, category, dueDate },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setTitle('');
      setDescription('');
      setPriority('low');
      setCategory('');
      setDueDate('');
      setButton(false);
      fetchTasks();
      setError('');
    } catch (err) {
      console.error('Failed to create task:', err.response?.status, err.response?.data?.error || err.message);
      setError('Failed to create task');
    }
  };

  const handleToggleComplete = async (taskId, completed) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/auth/tasks/${taskId}`,
        { completed: !completed },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchTasks(); // Refresh the task list
    } catch (err) {
      console.error('Failed to update task:', err.response?.status, err.response?.data?.error || err.message);
      setError('Failed to update task');
    }
  };

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <>
      <Navbar />
      <div className='bg-[#08080a] min-h-screen'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
          <div className='bg-[#0c0c0f] border-[2px] border-gray-900 p-5 rounded-xl hover:scale-103 transition-transform'>
            <h1 className='text-[#a2a2ab] text-xl'>Total Tasks</h1>
            <p className='text-white font-bold text-2xl'>{totalTasks}</p>
            <p className='text-white bg-[#7d40de] w-fit rounded px-2 mt-1'>All Tasks</p>
          </div>
          <div className='bg-[#0c0c0f] border-[2px] border-gray-900 p-5 rounded-xl hover:scale-103 transition-transform'>
            <h1 className='text-[#a2a2ab] text-xl'>Pending Tasks</h1>
            <p className='text-white font-bold text-2xl'>{pendingTasks}</p>
            <p className='text-white bg-[#F59F0A] w-fit rounded px-2 mt-1'>In Progress</p>
          </div>
          <div className='bg-[#0c0c0f] border-[2px] border-gray-900 p-5 rounded-xl hover:scale-103 transition-transform'>
            <h1 className='text-[#a2a2ab] text-xl'>Completed Tasks</h1>
            <p className='text-white font-bold text-2xl'>{completedTasks}</p>
            <p className='text-white bg-[#00ad00] w-fit rounded px-2  mt-1'>Done</p>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
          <div className='h-fit p-3 col-span-1 bg-[#0c0c0f] border-[2px] border-gray-900 rounded-xl hover:scale-103 transition-transform'>
            {!button ? (
              <button
                className='w-full bg-[#7d40de] text-white py-3 px-10 rounded hover:bg-[#6b35c2] transition-colors'
                onClick={() => setButton(!button)}
              >
                Add Task
              </button>
            ) : (
              <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                <h1 className='text-[#a2a2ab] font-bold text-3xl pb-5'>Add New Task</h1>
                {error && <p className='text-red-500'>{error}</p>}
                <label className='text-white'>Task Title*</label>
                <input
                  type='text'
                  className='w-full bg-[#0c0c0f] border-[2px] border-gray-900 p-2 rounded-xl text-white'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label className='text-white'>Description</label>
                <textarea
                  className='w-full bg-[#0c0c0f] border-[2px] border-gray-900 p-2 rounded-xl text-white'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className='flex gap-4 my-2'>
                  <div>
                    <label className='text-white'>Priority</label>
                    <select
                      className='w-full bg-[#0c0c0f] border-[2px] border-gray-900 p-2 rounded-xl text-white'
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      <option value='low'>Low</option>
                      <option value='medium'>Medium</option>
                      <option value='high'>High</option>
                    </select>
                  </div>
                  <div>
                    <label className='text-white'>Category</label>
                    <input
                      type='text'
                      className='w-full bg-[#0c0c0f] border-[2px] border-gray-900 p-2 rounded-xl text-white'
                      placeholder='eg., Work, Personal...'
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
                </div>
                <div className='pb-5'>
                  <label className='text-white'>Due Date</label>
                  <input
                    type='date'
                    className='w-full bg-[#0c0c0f] border-[2px] border-gray-900 p-2 rounded-xl'
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
                <button
                  type='submit'
                  className='w-full bg-[#7d40de] text-white py-3 px-10 rounded mb-4 hover:bg-[#6b35c2] transition-colors'
                >
                  Add Task
                </button>
                <button
                  className='w-full bg-[#08080a] text-white py-3 px-10 rounded border-1 border-[#7d40de] cursor-pointer'
                  onClick={()=>setButton(!button)}
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
          <div className='h-fit col-span-2 bg-[#0c0c0f] border-[2px] border-gray-900 p-5 rounded-xl hover:scale-101 transition-transform'>
            <h1 className='text-[#a2a2ab] text-xl'>Tasks</h1>
            {tasks.map((task) => (
              <div key={task._id} className='bg-[#1a1a1e] p-3 rounded-md mb-2  items-center'>
                <input
                  type='checkbox'
                  className='mr-2 w-5 h-5 accent-[#7d40de] border-[#7d40de] border-5'
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task._id, task.completed)}
                />
                <div className={task.completed ? 'line-through text-gray-500' : ''}>
                  <h2 className='inline font-bold text-white'>{task.title}</h2><br/>
                  <p className='inline text-[#a2a2ab]'>{task.description || 'No description'}</p>
                </div>
                <div className='flex justify-between mt-2'>
                {task.priority === 'high' ? (
                  <p className='text-[#7d40de] bg-[#ad0000] ml-1 px-2 py-1 rounded text-white'>{task.priority}</p>
                ) : task.priority === 'medium' ? (
                  <p className='text-[#7d40de] bg-[#d8a800] ml-1 px-2 py-1 rounded text-white'>{task.priority}</p>
                ) : (
                  <p className='text-[#7d40de] bg-[#00ad00] ml-1 px-2 py-1 rounded text-white'>{task.priority}</p>
                )}
                {/* <p className='text-[#7d40de] '>{task.priority}</p> */}
                <div className='flex gap-4'>
                <p className='text-[#a2a2ab] ml-2'>Category: {task.category || 'Uncategorized'}</p>
                <p className='text-[#a2a2ab] ml-2'>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                </div>
                </div>
              </div>
            ))}
            {tasks.length === 0 && <p className='text-[#a2a2ab]'>No tasks yet.</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;