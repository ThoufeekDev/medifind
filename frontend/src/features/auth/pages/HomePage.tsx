import { useAuthStore } from "../store/auth.store";

const HomePage = () => {

  return (

    <div>

      <h1>
        Welcome to MediFind
      </h1>

      <input
        type="text"
        placeholder="
          Search hospitals,
          doctors,
          diseases...
        "
      />

    </div>
  );
};

export default HomePage;