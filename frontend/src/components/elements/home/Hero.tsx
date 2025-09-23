import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCircleCheck, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  return (
    <div className="container flex items-center justify-between py-20">
      <div className="w-1/2">
        <h1 className="text-5xl font-bold">
          Smart Interview<br/> Preparation{" "}
          <span className="text-[#2563EB]">Powered by<br /> AI</span>
        </h1>
        <p className="text-gray-700 font-[500] mt-7 text-lg">
          Prepline automatically detects your interviews from Gmail, generates
          personalized practice questions with AI, and schedules optimal
          preparation time in your calendar.
        </p>
        <ul className="mt-8 flex flex-col gap-3">
          <li className="flex items-center gap-3">
            <FontAwesomeIcon icon={faEnvelope} className="text-[#2563EB] text-xl" />
            <span className="text-gray-700 font-[500]">Automatic interview detection from your Gmail</span>
          </li>
          <li className="flex items-center gap-3">
            <FontAwesomeIcon icon={faCircleCheck} className="text-[#2563EB] text-xl" />
            <span className="text-gray-700 font-[500]">AI-powered question generation tailored to the role</span>
          </li>
          <li className="flex items-center gap-3">
            <FontAwesomeIcon icon={faCalendar} className="text-[#2563EB] text-xl" />
            <span className="text-gray-700 font-[500]">Smart scheduling of prep sessions in your calendar</span>
          </li>
        </ul>
        <div className="mt-10">
          <button className="px-5 py-4 rounded-lg font-semibold text-white bg-[#2563EB] cursor-pointer hover:bg-[#0f55eb] border border-[#2563EB] hover:border hover:border-[#0f55eb]">Get Started Free</button>
          <button className="ml-10 px-5 py-4 rounded-lg font-semibold text-gray-700 cursor-pointer border-gray-700 border hover:text-[#2563EB] hover:border hover:border-[#2563EB]">See How It Works</button>
        </div>
      </div>
      <div className="w-1/2"></div>
    </div>
  );
};

export default Hero;
