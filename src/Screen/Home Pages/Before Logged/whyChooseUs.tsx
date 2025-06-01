export default function WhyChooseUs() {
  return (
    <div className="bg-[#0a1217] py-20">
      <section
        id="features"
        className="relative block px-6 py-10 md:py-20 md:px-10 border-t  border-neutral-800"
      >
        <div className="relative mx-auto max-w-5xl text-center">
          <span className="text-gray-400 my-3 flex items-center justify-center font-medium uppercase tracking-wider">
            Why choose us
          </span>
          <h2 className="block w-full font-extrabold text-white text-3xl sm:text-4xl">
            Trusted by Partners. Built for Growth.
          </h2>
          <p className="mx-auto my-4 w-full max-w-xl text-center font-medium leading-relaxed tracking-wide text-gray-400">
            Empowering warehouse partners with the tools they need to succeed —
            fast, secure, and fully supported.
          </p>
        </div>

        <div className="relative mx-auto max-w-7xl z-10 grid grid-cols-1 gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-md border border-neutral-700 bg-[#111c22] p-8 text-center shadow">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-purple-600 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-currency-rupee"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 5h-12" />
                <path d="M18 9h-12" />
                <path d="M10 21l6 -10h-6" />
                <path d="M6 15h4" />
              </svg>
            </div>
            <h3 className="mt-6 text-white font-semibold">Instant Payout</h3>
            <p className="mt-2 text-gray-400">
              Receive your earnings immediately after a successful booking. No
              delays, no hassle.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-md border border-neutral-700 bg-[#111c22] p-8 text-center shadow">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-purple-600 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-headset"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
                <path d="M18 19a2 2 0 0 0 2 -2v-2" />
                <path d="M6 19a2 2 0 0 1 -2 -2v-2" />
                <path d="M12 21v-3" />
              </svg>
            </div>
            <h3 className="mt-6 text-white font-semibold">24/7 Support</h3>
            <p className="mt-2 text-gray-400">
              Get round-the-clock assistance from our expert support team for
              anything you need.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-md border border-neutral-700 bg-[#111c22] p-8 text-center shadow">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-purple-600 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-checkup-list"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 4h18" />
                <path d="M3 10h18" />
                <path d="M3 16h18" />
                <path d="M5 20h4" />
                <path d="M17 20l2 -2l-2 -2" />
              </svg>
            </div>
            <h3 className="mt-6 text-white font-semibold">
              Trusted by 1000+ Partners
            </h3>
            <p className="mt-2 text-gray-400">
              Join a growing network of warehouse owners who trust and earn with
              us every day.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
