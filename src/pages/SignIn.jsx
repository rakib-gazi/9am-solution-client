import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { FadeLoader } from "react-spinners";
const SignIn = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const {setUser} = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const handleSignUp = async (data) => {
    try {
      setLoading(true);
      const res = await axiosPublic.post("/auth/signin", data, {
        withCredentials: true,
      });
      setLoading(false);
      if (res.data.success) {
        setUser(res.data.user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location.state?.pathname || "/dashboard");
      }
    } catch (err) {
      setLoading(false);
      const { field, message } = err.response.data;

      if (field) {
        setError(field, {
          type: "server",
          message,
        });
      } else {
        setError("root", {
          type: "server",
          message: message || "Invalid credentials",
        });
      }
    }
  };
  return (
    <div className="py-12">
      <div className=" mx-auto bg-white shadow-lg rounded-3xl max-w-lg p-6">
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="flex  flex-col gap-4"
          autoComplete="off"
        >
          {/* username */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username">Username</Label>
            </div>
            <TextInput
              id="username"
              type="text"
              placeholder="John Doe"
              {...register("username", {
                required: true,
                maxLength: 12,
                minLength: 3,
              })}
              shadow
            />
            {errors.username?.type === "required" && (
              <p className="text-red-600 text-sm">User Name is required</p>
            )}
            {errors.username?.type === "maxLength" && (
              <p className="text-red-600 text-sm">
                User Name cannot exceed 12 character
              </p>
            )}
            {errors.username?.type === "minLength" && (
              <p className="text-red-600 text-sm">
                User Name must be grater than 3 character
              </p>
            )}
            {errors.username?.message && (
              <p className="text-red-600 text-sm">{errors.username.message}</p>
            )}
          </div>
          {/* password */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password">Password</Label>
            </div>
            <TextInput
              id="password"
              type="password"
              shadow
              placeholder="Your Password"
              {...register("password", {
                required: true,
                minLength: 8,
                pattern: /(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]/,
              })}
            />
            {errors.password?.type === "required" && (
              <p className="text-red-600 text-sm">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600 text-sm">
                Password must be at least 8 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600 text-sm">
                Password must be contain at least one number, and one special
                character
              </p>
            )}
            {errors.password?.message && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>
          {errors.root && (
            <p className="text-red-600 text-sm text-center">
              {errors.root.message}
            </p>
          )}
          <div className="flex items-center gap-2">
            <Checkbox id="remember" {...register("remember")} />
            <Label htmlFor="remember" className="flex dark:text-black">
              Remember Me
            </Label>
          </div>
          <Button type="submit" className="cursor-pointer">{loading ? (
              <FadeLoader color="#ffffff" height={10} width={5}  className="py-2"/>
            ) : (
              "Sign In"
            )}</Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
