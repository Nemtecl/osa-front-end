import User from "../Pages/Guest/SignUp/types/user";

const register = async (user: User) => {
  try {
    return fetch("http://localhost:3008/auth/register", {
      method: "POST",
      body: JSON.stringify({
        ...user,
      }),
      headers: {
        "Content-type": "Application/json",
      },
    });
  } catch (error) {
    throw new Error();
  }
};

export default register;