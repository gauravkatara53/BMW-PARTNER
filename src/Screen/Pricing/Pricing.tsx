import React from "react";
import Navbar from "@/components/Navbar";

const plans = [
  {
    title: "Basic",
    price: 0,
    image: "https://res.cloudinary.com/williamsondesign/abstract-1.jpg",
    features: [
      "Get started with Listing ",
      "Normal support system",
      "list upto 10 warehouses",
    ],
    highlight: false,
  },
  {
    title: "Premium",
    price: 1999,
    image: "https://res.cloudinary.com/williamsondesign/abstract-2.jpg",
    features: [
      "All features in Basic",
      "Personalized support",
      "list upto 50 warehouses",
    ],
    highlight: true,
  },
  {
    title: "Extra Premium",
    price: 4999,
    image: "https://res.cloudinary.com/williamsondesign/abstract-3.jpg",
    features: [
      "All features in Startup",
      "Priority support",
      "list upto 100 warehouses",
    ],
    highlight: false,
  },
];

const PricingPage: React.FC = () => {
  return (
    <div className="bg-base-200 min-h-screen">
      <Navbar />
      <main className="max-w-6xl mx-auto pt-10 pb-36 px-5 lg:px-8 bg-base-200">
        <div className="max-w-md mx-auto mb-14 text-center">
          <h1 className="text-4xl font-semibold mb-6 lg:text-5xl">
            <span className="text-primary">Flexible</span> Plans
          </h1>
          <p className="text-xl text-base-content/60 font-medium">
            Choose a plan that works best for you and your team.
          </p>
        </div>

        <div className="flex flex-col justify-between items-center lg:flex-row lg:items-start">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`w-full flex-1 p-8 mt-8 order-${
                index + 1
              } rounded-3xl shadow-xl sm:w-96 lg:w-full ${
                plan.highlight
                  ? "bg-neutral text-neutral-content lg:mt-0"
                  : "bg-base-100 text-base-content"
              } ${
                index === 0
                  ? "lg:rounded-r-none"
                  : index === 2
                  ? "lg:rounded-l-none"
                  : ""
              }`}
            >
              <div
                className={`mb-7 pb-7 flex items-center border-b ${
                  plan.highlight
                    ? "border-neutral-content/30"
                    : "border-base-300"
                }`}
              >
                <img
                  src={plan.image}
                  alt={`${plan.title} plan`}
                  className="rounded-3xl w-20 h-20"
                />
                <div className="ml-5">
                  <span
                    className={`block font-semibold ${
                      plan.highlight ? "text-3xl" : "text-2xl"
                    }`}
                  >
                    {plan.title}
                  </span>
                  <span className="block mt-1">
                    <span
                      className={`font-medium text-xl align-top ${
                        plan.highlight ? "" : "text-base-content/70"
                      }`}
                    >
                      ₹&thinsp;
                    </span>
                    <span className={`text-3xl font-bold`}>{plan.price}</span>
                    <span
                      className={`ml-1 font-medium ${
                        plan.highlight ? "" : "text-base-content/70"
                      }`}
                    >
                      / month
                    </span>
                  </span>
                </div>
              </div>

              <ul
                className={`mb-7 font-medium ${
                  plan.highlight ? "text-lg" : "text-base-content/70"
                }`}
              >
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className={`flex ${
                      plan.highlight ? "mb-6" : "text-md mb-2"
                    }`}
                  >
                    <img
                      src={
                        plan.highlight
                          ? "https://res.cloudinary.com/williamsondesign/check-white.svg"
                          : "https://res.cloudinary.com/williamsondesign/check-grey.svg"
                      }
                      alt="check"
                    />
                    <span className="ml-3">
                      {feature.split(" ").map((word, i) =>
                        [
                          "messaging",
                          "team",
                          "cloud",
                          "storage",
                          "Basic",
                          "Startup",
                          "oriented",
                        ].includes(word.replace(/[^a-zA-Z]/g, "")) ? (
                          <span
                            key={i}
                            className={
                              plan.highlight
                                ? "text-white"
                                : "text-base-content"
                            }
                          >
                            {word}{" "}
                          </span>
                        ) : (
                          word + " "
                        )
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#/"
                className={`flex justify-center items-center rounded-xl px-4 text-center text-white ${
                  plan.highlight ? "py-6 text-2xl" : "py-5 text-xl"
                } bg-primary`}
              >
                Choose Plan
                <img
                  src="https://res.cloudinary.com/williamsondesign/arrow-right.svg"
                  className="ml-2"
                  alt="arrow"
                />
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PricingPage;
