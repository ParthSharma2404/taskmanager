import React, { useState, useContext, useEffect } from "react";
import logo from "../images/logo.svg";
import Login from "./Login";
import check from "../images/circle-check-regular-full.svg";
import clock from "../images/clock-regular-full.svg";
import light from "../images/lightning.png";
import shield from "../images/shield.png";
import users from "../images/people (2).png";
import chart from "../images/icons8-bar-graph-64.png";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Close modal after successful login
  useEffect(() => {
    if (user) {
      setIsModalOpen(false);
    }
  }, [user]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-[#101121] pt-20 pb-15">
        <div className="flex justify-center items-center">
          <img src={logo} alt="Logo" className="w-18 h-18" />
          <h1 className="text-6xl font-bold text-[#7a3cde] px-5">TaskFlow</h1>
        </div>

        <p className="text-center my-4 text-lg max-w-2xl mx-auto text-[#a2a2ab]">
          The modern task manager that helps you stay organized, productive, and
          in control. Manage your tasks with style and efficiency.
        </p>

        <div className="flex justify-center gap-4">
          {user ? (
            <button
              className="text-white py-3 px-10 rounded bg-[#7d40de] cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </button>
          ) : (
            <>
              <button
                className="text-white py-3 px-10 rounded bg-[#7d40de] cursor-pointer"
                onClick={toggleModal}
              >
                Get Started
              </button>
              <button className="bg-[#08080a] text-white py-3 px-10 rounded border border-[#7d40de] cursor-pointer">
                Learn More
              </button>
            </>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-[#08080a] py-25">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold">
            Everything you need to stay productive
          </h1>
          <div className="text-[#a2a2ab] max-w-xl mx-auto mt-2">
            TaskFlow combines beautiful design with powerful features to help
            you manage tasks effortlessly.
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 p-4 max-w-7xl mx-auto">
          {[ // small cleanup for DRY, optional
            { img: check, title: "Smart Organization", desc: "Organize tasks by priority, category, and due dates. Never miss an important deadline again." },
            { img: clock, title: "Real-time Updates", desc: "Track your progress in real-time with live updates and completion statistics." },
            { img: light, title: "Lightning Fast", desc: "Built for speed and efficiency. Add, edit, and complete tasks in seconds, not minutes." },
            { img: shield, title: "Secure & Private", desc: "Your tasks are private and secure. We never share your data with third parties." },
            { img: users, title: "Team Ready", desc: "Built with collaboration in mind. Perfect for personal use and team projects." },
            { img: chart, title: "Analytics", desc: "Get insights into your productivity with detailed analytics and progress tracking." },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-[#0c0c0f] border-[2px] border-gray-900 p-10 rounded-xl hover:scale-110 transition-transform"
            >
              <img src={f.img} alt={f.title} className="w-15 h-15 mb-2" />
              <h2 className="font-bold text-white text-2xl">{f.title}</h2>
              <p className="text-[#a2a2ab]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center py-20 p-8 bg-[#0f0f12]">
        <h1 className="text-3xl font-bold text-white pb-2">
          Ready to Boost Your Productivity?
        </h1>
        <p className="text-[#a2a2ab] text-lg max-w-xl mx-auto">
          Join thousands of users who have already transformed their task
          management with TaskFlow.
        </p>
        <button
          className="bg-[#7d40de] text-white py-3 px-10 mt-4 rounded cursor-pointer"
          onClick={toggleModal}
        >
          Start Managing Tasks Today
        </button>
      </div>

      {/* Footer */}
      <footer className="pt-8 p-4 text-center bg-[#08080a] text-[#a2a2ab]">
        <p>&copy; 2025 TaskFlow. All rights reserved.</p>
      </footer>

      {/* ✅ Modal for Login */}
      {isModalOpen && !user && (
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
