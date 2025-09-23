import { Link } from "react-router-dom";

const Header = () => {
  return (
      <div className="fixed h-24 shadow w-full top-0 left-0 bg-white z-50">
        <div className="flex items-center justify-center">
          <div className="container flex items-center justify-between h-24">
            <div>
              <h1 className="text-2xl font-bold">
                <span className="text-[#2563EB]">Ace</span>
                <span className="text-[#818CF8]">AI</span>
              </h1>
            </div>
            <div>
              <ul className="flex gap-10">
                <li className="text-gray-600 font-[500] hover:text-[#2563EB]">
                  <Link to={"/features"}>Features</Link>
                </li>
                <li className="text-gray-600 font-[500] hover:text-[#2563EB]">
                  <Link to={"/features"}>Features</Link>
                </li>
                <li className="text-gray-600 font-[500] hover:text-[#2563EB]">
                  <Link to={"/features"}>Features</Link>
                </li>
              </ul>
            </div>
            <div>
              <Link
                to={"/auth/login"}
                className="font-semibold text-white bg-[#2563EB] px-7 py-3 rounded-lg mr-5 hover:text-[#2563EB] hover:bg-gray-200"
              >
                Log In
              </Link>
              <Link
                to={"/auth/login"}
                className="font-semibold text-white bg-[#818CF8] px-7 py-3 rounded-lg hover:text-[#818CF8] hover:bg-gray-200"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Header;
