import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
// chnages 
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  interface LoginResponse {
    message?: string;
    // Add other properties of the response if needed
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/v1/partner/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include", // Include credentials if needed
      });

      const data: LoginResponse = await response.json();

      if (response.ok) {
        // Handle successful login
        console.log("Login successful:", data);

        // Redirect to the "/" route and force a refresh
        navigate("/");
        window.location.reload();
      } else {
        // Handle errors
        setError(data.message || "Login failed");
        setLoading(false);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", err);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4 bg-base-100">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
          <div>
            <h2 className="lg:text-5xl text-3xl font-bold lg:leading-[57px] text-base-content">
              Partner Login for Effortless Warehouse Management
            </h2>
            <p className="text-sm mt-6 text-base-content/70 leading-relaxed">
              Access your partner dashboard seamlessly. Manage listings, monitor
              bookings, and optimize your warehouse operations—all in one place.
            </p>

            <p className="text-sm mt-12 text-base-content/70">
              Don't have an account
              <Link
                to={"/signup"}
                className="text-primary font-medium hover:underline ml-1"
              >
                Register here
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md md:ml-auto w-full">
            <h3 className="text-base-content lg:text-3xl text-2xl font-bold mb-8">
              Sign In
            </h3>

            <div className="space-y-6">
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

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="form-control">
                  <label className="label cursor-pointer gap-3">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                    />
                    <span className="label-text text-sm text-base-content/70">
                      Remember me
                    </span>
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="text-primary hover:underline font-medium"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
            </div>

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
    </>
  );
}
