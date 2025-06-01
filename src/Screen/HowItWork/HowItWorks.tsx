import Navbar from "@/components/Navbar"; // adjust based on your path

const steps = [
  {
    title: "Register",
    description:
      "Create your partner account in just a few steps. Start your journey toward monetizing your warehouse space.",
  },
  {
    title: "Complete KYC",
    description:
      "Verify your identity and ownership through our secure KYC process. Build trust and unlock platform features.",
  },
  {
    title: "List Your Warehouse",
    description:
      "Provide detailed info, upload high-quality photos, and showcase key facilities to attract clients.",
  },
  {
    title: "Get Booked or Sold",
    description:
      "Once live, your listing reaches buyers or renters. Receive real-time offers and manage bookings effortlessly.",
  },
  {
    title: "Receive Payments Easily",
    description:
      "Enjoy secure, direct payments with complete transparency. We handle the logistics while you earn.",
  },
];

const HowItWorks = () => {
  return (
    <div>
      <Navbar />
      <section className="relative px-4 py-20 md:px-16 bg-gradient-to-br from-base-100 to-base-200">
        {/* Decorative gradient blob */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary opacity-10 blur-3xl rounded-full z-0 transform translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 text-center mb-16">
          <h2 className="text-4xl font-extrabold text-primary">How It Works</h2>
          <p className="text-lg text-base-content mt-4 max-w-xl mx-auto">
            A clear and easy-to-follow process to list, manage, and grow with
            BookMyWarehouse.
          </p>
        </div>

        <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group card bg-white dark:bg-base-200 shadow-xl border border-base-300 p-6 rounded-3xl transition-transform hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold shadow-lg">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-primary">
                  {step.title}
                </h3>
              </div>
              <p className="text-base text-base-content leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="relative z-10 mt-16 text-center">
          <button className="btn btn-primary btn-lg rounded-full px-8">
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
