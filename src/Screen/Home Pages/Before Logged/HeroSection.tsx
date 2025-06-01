import Navbar from "@/components/Navbar";

export default function HeroSection() {
  return (
    <>
      <Navbar />
      <div className="bg-[#0a1217] pt-32">
        <div className="flex flex-col lg:flex-row justify-between items-start w-full max-w-screen-xl mx-auto px-4">
          <div className="text-left">
            <h1 className="text-5xl font-bold">List Your Warehouse!</h1>
            <h1 className="text-5xl font-bold">Start Earning</h1>
            <p className="py-6">
              Own a warehouse? List it on our platform to rent or sell with
              ease.
              <br /> Connect with verified businesses looking for spaces like
              yours.
            </p>

            <button className="btn btn-primary">Get Started</button>
          </div>
          <img
            src="https://res.cloudinary.com/dyrapz6bn/image/upload/v1744231517/x7fxcmy57kseaf3jqtcz.png"
            className="max-w-sm rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </>
  );
}
