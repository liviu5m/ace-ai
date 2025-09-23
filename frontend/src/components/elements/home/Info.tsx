import { BarChart, Brain, Calendar, Mail } from "lucide-react";

const Info = () => {
  return (
    <div className="container py-20">
      <h1 className="text-3xl font-bold text-center">
        Supercharge Your Interview Preparation
      </h1>
      <h4 className="text-gray-700 text-center mt-5 text-lg">
        Prepline combines the power of AI with your existing tools to create the
        ultimate
        <br /> interview preparation experience.
      </h4>
      <div className="mt-16 grid grid-cols-4 gap-10">
        <div className="bg-[#F9FAFB] rounded-lg shadow px-8 py-5 hover:shadow-lg cursor-pointer">
          <div className="text-[#2563EB] bg-[#EFF6FF] rounded-full w-16 h-16 flex items-center justify-center">
            <Mail className="w-8 h-8" />
          </div>
          <h1 className="text-lg font-semibold mt-5">Gmail Integration</h1>
          <p className="mt-3 text-gray-700">
            Automatically detect interviews from your Gmail inbox. No more
            manual entry or missed opportunities.
          </p>
        </div>
        <div className="bg-[#F9FAFB] rounded-lg shadow px-8 py-5 hover:shadow-lg cursor-pointer">
          <div className="text-[#2563EB] bg-[#EFF6FF] rounded-full w-16 h-16 flex items-center justify-center">
            <Brain className="w-8 h-8" />
          </div>
          <h1 className="text-lg font-semibold mt-5">AI Question Generation</h1>
          <p className="mt-3 text-gray-700">
            Get personalized technical and behavioral questions based on the
            company, role, and your experience.
          </p>
        </div>
        <div className="bg-[#F9FAFB] rounded-lg shadow px-8 py-5 hover:shadow-lg cursor-pointer">
          <div className="text-[#2563EB] bg-[#EFF6FF] rounded-full w-16 h-16 flex items-center justify-center">
            <Calendar className="w-8 h-8" />
          </div>
          <h1 className="text-lg font-semibold mt-5">Smart Scheduling</h1>
          <p className="mt-3 text-gray-700">
            Automatically schedule optimal preparation time in your calendar
            based on interview complexity and your availability.
          </p>
        </div>
        <div className="bg-[#F9FAFB] rounded-lg shadow px-8 py-5 hover:shadow-lg cursor-pointer">
          <div className="text-[#2563EB] bg-[#EFF6FF] rounded-full w-16 h-16 flex items-center justify-center">
            <BarChart className="w-8 h-8" />
          </div>
          <h1 className="text-lg font-semibold mt-5">Performance Analytics</h1>
          <p className="mt-3 text-gray-700">
            Track your preparation progress and interview performance to
            continuously improve your skills.
          </p>
        </div>
      </div>
      <div className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-10 text-white flex gap-10">
        <div className="w-1/2">
          <h2 className="text-xl font-bold">How AceAI Works</h2>
          <p className="mt-2 text-gray-200">
            Our intelligent system connects to your Gmail and Google Calendar
            accounts securely using OAuth. When an interview invitation is
            detected, Prepline automatically extracts key information and begins
            generating personalized preparation materials using advanced AI.
          </p>
        </div>
        <div className="w-1/2">
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-5">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-700 font-semibold">1</div>
              <span>Connect your Google account (Gmail & Calendar)</span>
            </li>
            <li className="flex items-center gap-5">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-700 font-semibold">2</div>
              <span>Prepline automatically detects interview invitations</span>
            </li>
            <li className="flex items-center gap-5">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-700 font-semibold">3</div>
              <span>AI generates tailored practice questions</span>
            </li>
            <li className="flex items-center gap-5">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-700 font-semibold">4</div>
              <span>Prep sessions are scheduled in your calendar</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Info;
