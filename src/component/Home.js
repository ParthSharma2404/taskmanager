import React, {useState} from 'react';
import logo from '../images/logo.svg'
import Login from './Login'; // Import your separate Login component
import check from '../images/circle-check-regular-full.svg'
import clock from '../images/clock-regular-full.svg'
import light from '../images/lightning.png'
import shield from '../images/shield.png'
import users from '../images/people (2).png'
import chart from '../images/icons8-bar-graph-64.png'
function Home(){
    const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility


  // Toggle modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
    return(
        <div>
            <div className='bg-[#101121] pt-20 pb-15'>
                <div className='flex justify-center items-center'>
                    <img src={logo} alt="Logo" className='w-18 h-18' />
                    <h1 className='text-6xl font-bold text-[#7a3cde] px-5'>TaskFlow</h1>
                </div>

                <p className='text-center my-4 text-lg max-w-2xl mx-auto text-[#a2a2ab]'>
                    The modern task manager that helps you stay organized, productive, and in control. Manage your task with style and efficiency.
                </p>
                <div className='flex justify-center gap-4 '>
                    <button className=' text-white py-3 px-10 rounded bg-[#7d40de] cursor-pointer' onClick={toggleModal}>Get Started</button>
                    <button className='bg-[#08080a] text-white py-3 px-10 rounded border-1 border-[#7d40de] cursor-pointer'>Learn More</button>
                </div>
            </div>

            <div className='bg-[#08080a] py-25'>
                <div className='text-center text-white'>
                <div>

                </div>
                <h1 className='text-3xl font-bold'>Everthing you need to stay productive</h1>
                <div className='text-[#a2a2ab] max-w-xl mx-auto mt-2'>TaskFlow combined beautiful design with powerful features to help you manage tasks effortlessly.</div>
                </div>
                <div className='grid grid-cols-3 gap-8 mt-4 p-4 max-w-7xl mx-auto'>
                    <div className='bg-[#0c0c0f] border-[2px] border-gray-900 p-10 rounded-xl hover:scale-110 transition-transform'>
                        <img src={check} alt="check" className='w-15 h-15 mb-2'/>
                        <h2 className='font-bold text-white text-2xl'>Smart Organization</h2>
                        <p className='text-[#a2a2ab]'>Organize tasks by priority, category, and due dates. Never miss an Important deadline again.</p>
                    </div>
                    <div className='bg-[#0c0c0f] border-[2px] border-gray-900 p-10 rounded-xl hover:scale-110 transition-transform'>
                        <img src={clock} alt="check" className='w-15 h-15 mb-2' />
                        <h2 className='font-bold text-white text-2xl'>Real-time Updates</h2>
                        <p className='text-[#a2a2ab]'>Track your progress in real-time with live updates and completion statistics.</p>
                    </div>
                    <div className='bg-[#0c0c0f] border-[2px] border-gray-900 p-10 rounded-xl hover:scale-110 transition-transform'>
                        <img src={light} className='w-15 h-15 mb-2' alt="check" />
                        <h2 className='font-bold text-white text-2xl'>Lightning Fast</h2>
                        <p className='text-[#a2a2ab]'>Built for speed and efficiency. Add, edit, and complete tasks in seconds, not minutes.</p>
                    </div>
                    <div className='bg-[#0c0c0f] border-[2px] border-gray-900 p-10 rounded-xl hover:scale-110 transition-transform'>
                        <img src={shield} className='w-15 h-15 mb-2' alt="check" />
                        <h2 className='font-bold text-white text-2xl'>Secure & Private</h2>
                        <p className='text-[#a2a2ab]'>Your tasks are private and secure. We never share your data with third parties.</p>
                    </div>
                    <div className='bg-[#0c0c0f] border-[2px] border-gray-900 p-10 rounded-xl hover:scale-110 transition-transform'>
                        <img src={users} className='w-15 h-15 mb-2' alt="check" />
                        <h2 className='font-bold text-white text-2xl'>Team Ready</h2>
                        <p className='text-[#a2a2ab]'>Built with collaboration in mind. Perfect for personal use and team projects.</p>
                    </div>
                    <div className='bg-[#0c0c0f] border-[2px] border-gray-900 p-10 rounded-xl hover:scale-110 transition-transform'>
                        <img src={chart} className='w-15 h-15 mb-2' alt="check" />
                        <h2 className='font-bold text-white text-2xl'>Analytics</h2>
                        <p className='text-[#a2a2ab]'>Get insights into your productivity with detailed analytics and progress tracking.</p>
                    </div>
                </div>
            </div>

            <div className='text-center py-20 p-8 bg-[#0f0f12]'>
                <h1 className='text-3xl font-bold text-white pb-2'>Ready to Boost Your Productivity?</h1>
                <p className='text-[#a2a2ab] text-lg max-w-xl mx-auto'>Join thousands of users who have already transformed their task management with TaskFlow.</p>
                <button className='bg-[#7d40de] text-white py-3 px-10 mt-4 rounded cursor-pointer' onClick={toggleModal}>Start Managing Tasks Today</button>
            </div>

            <footer className='pt-8 p-4 text-center bg-[#08080a] text-[#a2a2ab]'>
                <p>&copy; 2025 TaskFlow. All rights reserved.</p>
            </footer>
            {/* Modal for Login Component */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="relative">
                    <button
                    className="absolute top-2 right-2 text-[#a2a2ab] hover:text-white text-2xl"
                    onClick={toggleModal}
                    >
                    &times;
                    </button>
                    <Login />
                </div>
                </div>
            )}
        </div>
    );
}

export default Home;