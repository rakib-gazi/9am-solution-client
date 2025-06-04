import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const protocol = window.location.protocol;
  const { user, setUser } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await axiosPublic.post("/auth/signout", {}, { withCredentials: true });
    setUser(null);
    navigate("/signin");
  };

  return (
    <Navbar className="bg-white text-black dark:bg-white shadow-md sticky top-0 z-50 ">
      <NavbarBrand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold">
          Shop Hub
        </span>
      </NavbarBrand>

      {user ? (
        <div className="flex md:order-2 cursor-pointer">
          <Dropdown
            className="dark:bg-white "
            arrowIcon={false}
            inline
            label={
              <Avatar
                className="cursor-pointer"
                alt="User settings"
                img="./avatar.svg"
                rounded
              />
            }
          >
            {user.shops.map((s, index) => {
              const shopName = s.trim();
              const safeShopName = shopName
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "");
              return (
                <DropdownItem
                  key={index}
                  onClick={() =>
                    (window.location.href = `${protocol}//${safeShopName}.localhost:5173`)
                  }
                  className="text-start dark:text-black"
                >
                  {shopName}
                </DropdownItem>
              );
            })}
            <DropdownDivider />
            <DropdownItem onClick={handleSignOut} className="dark:text-black">
              Sign out
            </DropdownItem>
          </Dropdown>
        </div>
      ) : null}

      <NavbarCollapse className="text-black font-bold">
        {!user && (
          <>
            <Link
              to="/signin"
              className="bg-gray-200 px-4 py-1 rounded hover:bg-blue-600 hover:text-white tansition duration-300"
            >
              Signin
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-800 hover:text-white tansition duration-300"
            >
              Signup
            </Link>
          </>
        )}
      </NavbarCollapse>
    </Navbar>
  );
};

export default Header;
