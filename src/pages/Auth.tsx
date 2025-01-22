import { useState } from "react";
import logo from "../assets/logo.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

type Inputs = {
  name?: string;
  email: string;
  password: string;
  userId?: number;
  authenticated?: boolean;
};

export default function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const {
    register,
    handleSubmit,

    formState: {  },
  } = useForm<Inputs>();
  let userId;
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // store localstorage

    if(localStorage.getItem("users") === null){
      data = {...data, userId: 1,authenticated:false}
      localStorage.setItem("users", JSON.stringify([data]))
    }
    else if (localStorage.getItem("users") && !isLogin) {
      const users = localStorage.getItem("users");
      if (users) {
        const parsedUsers = JSON.parse(users);
        if(parsedUsers[0].email === data.email){
          toast.error("User already exists")
          setIsLogin(true)
        }
        else {
          userId = parsedUsers.length + 1
          data = {...data, userId,authenticated:false}
          parsedUsers.push(data)
          localStorage.setItem("users", JSON.stringify(parsedUsers))
          toast.success("User created successfully")
          setIsLogin(true)
        }
      }
    }
    else if ( localStorage.getItem("users") && isLogin) {
      const users = localStorage.getItem("users");
      if (users) {
        const parsedUsers = JSON.parse(users);
        const user = parsedUsers.find((user: { email: string; password: string }) => user.email === data.email && user.password === data.password)
        if(user){
          user.authenticated = true
          localStorage.setItem("users", JSON.stringify(parsedUsers))
          toast.success("User logged in successfully")
          dispatch({type:"LOGIN",payload:user})
          navigate("/Home")
        }
        else {
          toast.error("Invalid email or password")
        }
      }
    }
    
    

  }
  const handleClick = () => {
    setIsLogin((prev) => !prev);
  };
 

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="Your Company" src={logo} className="mx-auto h-16 w-auto" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            {isLogin ? "Sign in to your account" : "Create an account"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {!isLogin && <div>
              <label
                htmlFor="Name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  {...register("name", { required: true })}
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>}
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  {...register("email", { required: true })}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  {...register("password", { required: true })}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                // onClick={isLogin ? handleRegister : handleRegister}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLogin ? "Sign in" : "Sign up"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="text-sm/6 text-center text-gray-900 flex flex-col gap-y-1">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={handleClick}
                className="font-semibold cursor-pointer text-indigo-600 hover:text-indigo-500"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
