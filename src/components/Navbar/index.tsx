import { Link } from "react-router-dom";
import { useAuth } from "../Common/AuthContext";
import { useEffect, useState } from "react";
import { apiService } from "../APIService/ApiService";

interface PartnerProfile {
  _id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  status: string;
  kycStatus: string;
}

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const [profile, setProfile] = useState<PartnerProfile | null>(null);
  useEffect(() => {
    apiService
      .get<{ data: PartnerProfile }>("partner/get-partner")
      .then((res) => {
        setProfile(res.data);
      });
  }, []); // ✅ Empty array to run only once

  return (
    <div className="bg-base-100">
      <div className="mx-8">
        <div className="navbar bg-base-100 shadow-sm ">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a>Home</a>
                </li>
                <li>
                  <a>How It Works</a>
                </li>
                <li>
                  <a>Pricing</a>
                </li>
                <li>
                  <a>Parent</a>
                  <ul className="p-2">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>Item 3</a>
                </li>
              </ul>
            </div>
            <div className="w-8 h-8 text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10.5L12 4l9 6.5v9.5a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 20V10.5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 21V12h6v9"
                />
              </svg>
            </div>

            <Link to={"/"}>
              <a className="btn btn-ghost text-xl">BookMyWarehoue | Partner</a>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <Link to={"/"}>
                <li>
                  <a className="mx-1">Home</a>
                </li>
              </Link>
              <Link to={"/how-it-works"}>
                <li>
                  <a className="mx-1">How It Works</a>
                </li>
              </Link>
              <Link to={"/pricing"}>
                <li>
                  <a className="mx-1">Pricing</a>
                </li>
              </Link>
              {/* <li>
                <details>
                  <summary>Parent</summary>
                  <ul className="p-2">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </details>
              </li> */}
              <Link to={"/support"}>
                <li>
                  <a>Support</a>
                </li>
              </Link>
            </ul>
          </div>

          {isAuthenticated ? (
            <div className=" navbar-end">
              <Link to={"/profile"}>
                <div className="w-10 h-10 avatar  ">
                  <img
                    src={
                      profile?.avatar ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSeatcmYRYsMNho5mAp9qySUzghxQYU_TPGw&s"
                    }
                    alt="profile"
                    className="rounded-full w-10 h-20 object-cover"
                  />
                </div>
              </Link>
            </div>
          ) : (
            <div className="navbar-end">
              <Link to={"/signin"}>
                <a className="btn">Join Us</a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
