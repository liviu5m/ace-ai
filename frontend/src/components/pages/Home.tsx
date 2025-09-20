import { useAppContext } from "@/lib/AppContext";

const Home = () => {
  const { user } = useAppContext();
  console.log(user);

  return <div>Home</div>;
};

export default Home;
