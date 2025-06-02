import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  interface RegisterResponse {
    message?: string;
    success?: boolean;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/v1/partner/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
          phone,
        }),
        credentials: "include",
      });

      const data: RegisterResponse = await response.json();

      if (response.ok && data.success) {
        console.log("Registration successful:", data);
        navigate("/signin");
      } else {
        setError(data.message || "Registration failed");
        setLoading(false);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Registration error:", err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4 bg-base-100">
      <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
        <div>
          <h2 className="lg:text-5xl text-3xl font-bold lg:leading-[57px] text-base-content">
            Join as a Partner and List Your Warehouse
          </h2>
          <p className="text-sm mt-6 text-base-content/70 leading-relaxed">
            Become a part of BookMyWarehouse and unlock new business
            opportunities. List your warehouses, reach verified clients, and
            manage everything from one powerful dashboard.
          </p>
          <p className="text-sm mt-12 text-base-content/70">
            Already have an account?
            <Link
              to={"/signin"}
              className="text-primary font-medium hover:underline ml-1"
            >
              Login here
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md md:ml-auto w-full">
          <h3 className="text-base-content lg:text-3xl text-2xl font-bold mb-8">
            Sign Up
          </h3>

          <div className="space-y-6">
            <div>
              <label className="text-sm text-base-content font-medium mb-2 block">
                Name
              </label>
              <input
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter Full Name"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="text-sm text-base-content font-medium mb-2 block">
                Username
              </label>
              <input
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Choose a Username"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="text-sm text-base-content font-medium mb-2 block">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter Email"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="text-sm text-base-content font-medium mb-2 block">
                Phone
              </label>
              <input
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="Enter Phone Number"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="text-sm text-base-content font-medium mb-2 block">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter Password"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {error && (
            <p className="text-error text-sm mt-4 font-medium">{error}</p>
          )}

          <div className="mt-10">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? <ClipLoader color="#ffffff" size={24} /> : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
