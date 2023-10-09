import { Link, useNavigate } from "react-router-dom";
// import SocialLink from "../Shared/SocialLink/SocialLink";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");
  const { createUser, updateUserProfile, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);

      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          const saveUser = {
            name: data.name,
            email: data.email,
            photoURL: data.photoURL,
            role: "user",
          };
          fetch("https://shine-on-server.vercel.app/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(saveUser),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                // reset();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "User created successfully",
                  timer: 1500,
                });
                logOut()
                  .then(() => {})
                  .catch((error) => error.message);
                navigate("/login");
              }
            });
        })
        .catch((error) => console.log(error.message));
    });
  };
  return (
    <div className="bg-gray-100">
      <h1 className="text-center font-semibold text-gray-800 text-lg mb-3">
        Sign Up
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-[400px] mx-4 md:mx-auto p-4 md:p-8 bg-white shadow-xl rounded-md"
      >
        <div className="">
          <label className="font-semibold" htmlFor="name">
            Name
          </label>
          <input
            className="border-2 border-[#C5C5C5] py-2 px-3 w-full rounded-lg mt-2"
            type="text"
            {...register("name", { required: "Name is required" })}
            id=""
            placeholder="Enter Name"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div className="my-3">
          <label className="font-semibold" htmlFor="email">
            Email
          </label>
          <input
            className="border-2 border-[#C5C5C5] py-2 px-3 w-full rounded-lg mt-2"
            type="email"
            {...register("email", { required: "Email is required" })}
            id=""
            placeholder="Enter email"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="">
          <label className="font-semibold" htmlFor="photoURL">
            Photo URL
          </label>
          <input
            className="border-2 border-[#C5C5C5] py-2 px-3 w-full rounded-lg mt-2"
            type="text"
            {...register("photoURL", { required: "Photo URL is required" })}
            id=""
            placeholder="Enter Photo URL"
          />
          {errors.photoURL && (
            <p className="text-sm text-red-500">{errors.photoURL.message}</p>
          )}
        </div>
        <div className="my-3">
          <label className="font-semibold" htmlFor="password">
            Password
          </label>
          <input
            className="border-2 border-[#C5C5C5] py-2 px-3 w-full rounded-lg mt-2"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              pattern: {
                value: /^(?=.*?[A-Z])(?=.*?[!@#$%^&*])/,
                message:
                  "Password must contain at least one capital letter and one special character",
              },
            })}
            id=""
            placeholder="Enter Password"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="font-semibold" htmlFor="confirm">
            Confirm Password
          </label>
          <input
            className="border-2 border-[#C5C5C5] py-2 px-3 w-full rounded-lg mt-2"
            type="password"
            {...register("confirm", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            id=""
            placeholder="Confirm Password"
          />
          {errors.confirm && (
            <p className="text-sm text-red-500">{errors.confirm.message}</p>
          )}
        </div>
        <input
          className="w-full py-3 bg-[#2cdbde] rounded-[10px] font-semibold text-lg cursor-pointer"
          type="submit"
          value="Sign Up"
        />
      </form>
      <p className="text-center mt-2">
        Already have an account?{" "}
        <Link
          className="text-blue-500 hover:text-blue-700 font-semibold"
          to="/login"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
