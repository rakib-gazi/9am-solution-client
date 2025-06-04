import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useFieldArray, useForm } from "react-hook-form";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import { FadeLoader } from "react-spinners";
const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      shops: [{ value: "" }, { value: "" }, { value: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "shops",
  });
  const handleSignUp = (data) => {
    const shopsArray = data.shops.map((shop) => shop.value);
    const finalData = { ...data, shops: shopsArray };
    setLoading(true);
    axiosPublic.post("users", finalData).then((res) => {
      setLoading(false)
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/signin");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.data.message || "Something went wrong!",
          confirmButtonColor: "#3B82F6",
        });
      }
    });
    
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
              className="dark:bg-white"
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
          </div>
          {/* shops */}
          <div>
            <div className="mb-2 block">
              <Label>Shop Names (Enter at least 3)</Label>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="flex flex-col gap-2 mb-2">
                <TextInput
                  placeholder={`Shop ${index + 1}`}
                  {...register(`shops.${index}.value`, {
                    required: index < 3 ? "Shop name is required" : false,
                    validate: (value) =>
                      index === fields.length - 1 &&
                      fields.length === 4 &&
                      !value.trim()
                        ? "Last shop can't be empty"
                        : true,
                  })}
                  className="flex-1"
                />
                {errors.shops?.[index]?.value && (
                  <p className="text-red-600 text-sm">
                    {errors.shops[index].value.message}
                  </p>
                )}
              </div>
            ))}

            {fields.length < 4 ? (
              <button
                type="button"
                onClick={() => append({ value: "" })}
                className="text-blue-600 text-sm hover:underline"
              >
                + Add another shop
              </button>
            ) : (
              <button
                type="button"
                onClick={() => remove(fields.length - 1)}
                className="text-red-600 text-sm hover:underline"
              >
                Remove
              </button>
            )}
          </div>
          <Button type="submit" className="cursor-pointer">
            {" "}
            {loading ? (
              <FadeLoader color="#ffffff" height={10} width={5}  className="py-2"/>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
