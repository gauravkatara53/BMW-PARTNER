export default function HowItWork() {
  return (
    <div className="bg-[#0a1217] py-20">
      <div className="container mx-auto flex flex-col items-center gap-16 px-4">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="mb-2 text-3xl font-extrabold leading-tight text-white lg:text-4xl">
            How It Works ?
          </h2>
          <p className="text-base font-medium leading-7 text-gray-400">
            Just three simple steps to start earning from your warehouse.
          </p>
        </div>

        <div className="flex w-full flex-col items-center justify-between gap-y-10 lg:flex-row lg:gap-x-8 lg:gap-y-0 xl:gap-x-10">
          {/* Step 1 */}
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-600">
              <span className="text-base font-bold leading-7 text-white">
                1
              </span>
            </div>
            <div className="flex flex-col">
              <h3 className="mb-2 text-base font-bold leading-tight text-white">
                Create Your Account
              </h3>
              <p className="text-base font-medium leading-7 text-gray-400">
                Sign up as a partner to get started with listing your warehouse.
              </p>
            </div>
          </div>

          {/* Arrow */}
          <div className="rotate-90 lg:rotate-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="43"
              height="42"
              viewBox="0 0 43 42"
              fill="none"
            >
              <path
                d="M16.9242 11.7425C16.2417 12.425 16.2417 13.5275 16.9242 14.21L23.7142 21L16.9242 27.79C16.2417 28.4725 16.2417 29.575 16.9242 30.2575C17.6067 30.94 18.7092 30.94 19.3917 30.2575L27.4242 22.225C28.1067 21.5425 28.1067 20.44 27.4242 19.7575L19.3917 11.725C18.7267 11.06 17.6067 11.06 16.9242 11.7425Z"
                fill="#9ca3af"
              />
            </svg>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-purple-600 text-purple-400">
              <span className="text-base font-bold leading-7">2</span>
            </div>
            <div className="flex flex-col">
              <h3 className="mb-2 text-base font-bold leading-tight text-white">
                Complete KYC Verification
              </h3>
              <p className="text-base font-medium leading-7 text-gray-400">
                Submit your documents securely and verify your identity.
              </p>
            </div>
          </div>

          {/* Arrow */}
          <div className="rotate-90 lg:rotate-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="43"
              height="42"
              viewBox="0 0 43 42"
              fill="none"
            >
              <path
                d="M16.9242 11.7425C16.2417 12.425 16.2417 13.5275 16.9242 14.21L23.7142 21L16.9242 27.79C16.2417 28.4725 16.2417 29.575 16.9242 30.2575C17.6067 30.94 18.7092 30.94 19.3917 30.2575L27.4242 22.225C28.1067 21.5425 28.1067 20.44 27.4242 19.7575L19.3917 11.725C18.7267 11.06 17.6067 11.06 16.9242 11.7425Z"
                fill="#9ca3af"
              />
            </svg>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-purple-600 text-purple-400">
              <span className="text-base font-bold leading-7">3</span>
            </div>
            <div className="flex flex-col">
              <h3 className="mb-2 text-base font-bold leading-tight text-white">
                List Your Warehouse
              </h3>
              <p className="text-base font-medium leading-7 text-gray-400">
                Add details, upload images, and publish your space to start
                receiving bookings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
