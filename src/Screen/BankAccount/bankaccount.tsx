import { useEffect, useState } from "react";
import { apiService } from "@/components/APIService/ApiService";
import { Plus, Trash2, Pencil } from "lucide-react";
import Navbar from "@/components/Navbar";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface BankDetails {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
  branchName: string;
  status?: string;
}

export default function BankAccountPage() {
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showFull, setShowFull] = useState(false);

  const [form, setForm] = useState<BankDetails>({
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
    branchName: "",
  });

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        setLoading(true);
        const res = await apiService.get<{
          data: BankDetails;
          success: boolean;
        }>("/transaction/get/bank/detail");
        setBankDetails(res.data);
      } catch (err) {
        setBankDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBankDetails();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const res = await apiService.post<{
        data: BankDetails;
        success: boolean;
      }>("/transaction/bank/detail/", form);
      setBankDetails(res.data);
      setModalOpen(false);
    } catch (err) {
      alert("❌ Failed to submit bank details.");
    } finally {
      setSubmitting(false);
    }
  };
  const toggleVisibility = () => setShowFull((prev) => !prev);
  return (
    <div className="bg-base-200">
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto bg-base-200 min-h-screen pt-12">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <span className="text-blue-600">
            <svg
              className="w-6 h-6 inline-block"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M4 3a1 1 0 000 2h12a1 1 0 100-2H4zm14 4H2v2h16V7zm-2 4H4a1 1 0 000 2h12a1 1 0 100-2zM2 15h16v2H2v-2z" />
            </svg>
          </span>
          Bank Account
        </h2>
        <p className="text-gray-600 mb-6">
          Manage your bank account details to receive payments from
          BookMyWarehouse
        </p>

        {loading ? (
          <div className="flex justify-center py-16">
            <ClipLoader size={36} color="#3B82F6" />
          </div>
        ) : bankDetails ? (
          <div className="rounded-xl border border-gray-300 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h4 className="text-lg font-semibold mb-1">
                  Bank Account Details
                </h4>
                <p className="text-sm text-gray-500">
                  Your primary account for receiving payments
                </p>
              </div>
              <div className="flex gap-2">
                <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  Pending Verification
                </span>
                <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                  Primary
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <p>
                <span className="font-medium">Account Holder Name:</span>{" "}
                {bankDetails.accountHolderName}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Account Number:</span>
                {showFull
                  ? bankDetails.accountNumber
                  : "****" + bankDetails.accountNumber.slice(-4)}
                <button
                  onClick={toggleVisibility}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FontAwesomeIcon
                    icon={showFull ? faEyeSlash : faEye}
                    className="w-4 h-4"
                  />
                </button>
              </p>

              <p>
                <span className="font-medium">IFSC Code:</span>{" "}
                {bankDetails.ifscCode}
              </p>
              <p>
                <span className="font-medium">Bank Name:</span>{" "}
                {bankDetails.bankName}
              </p>
              <p>
                <span className="font-medium">Branch:</span>{" "}
                {bankDetails.branchName}
              </p>
            </div>

            <div className="flex justify-end mt-4 gap-2">
              <button
                className="btn btn-outline btn-sm"
                onClick={() => setModalOpen(true)}
              >
                <Pencil className="w-4 h-4 mr-1" /> Edit Account
              </button>
              <button className="btn btn-error btn-sm">
                <Trash2 className="w-4 h-4 mr-1" /> Remove Account
              </button>
            </div>
          </div>
        ) : (
          <div className="border border-dashed border-gray-300 p-8 rounded-xl text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="bg-gray-100 p-4 rounded-full">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12H3m18 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">No Bank Account Added</h3>
              <p className="text-sm text-gray-500 max-w-md">
                Add your bank account details to receive payments from your
                warehouse bookings securely and efficiently.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setModalOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" /> Add Bank Account
              </button>
            </div>
          </div>
        )}

        {modalOpen && (
          <dialog open className="modal modal-open">
            <div className="modal-box space-y-4">
              <h3 className="text-lg font-semibold">Add Bank Account</h3>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="accountHolderName"
                  placeholder="Account Holder Name"
                  value={form.accountHolderName}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
                <input
                  type="text"
                  name="bankName"
                  placeholder="Bank Name"
                  value={form.bankName}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
                <input
                  type="text"
                  name="accountNumber"
                  placeholder="Account Number"
                  value={form.accountNumber}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
                <input
                  type="text"
                  name="ifscCode"
                  placeholder="Routing Number / IFSC Code"
                  value={form.ifscCode}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
                <input
                  type="text"
                  name="branchName"
                  placeholder="Branch Name"
                  value={form.branchName}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
                <select
                  name="accountType"
                  onChange={handleInputChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Account Type</option>
                  <option value="Checking">Checking Account</option>
                  <option value="Savings">Savings Account</option>
                </select>
              </div>
              <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded">
                <strong>Note:</strong> Please ensure all information is
                accurate. Incorrect details may delay your payments. Your
                account will need to be verified before receiving payments.
              </div>
              <div className="modal-action justify-end">
                <button
                  className="btn btn-outline"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? (
                    <ClipLoader size={18} color="#fff" />
                  ) : (
                    "Add Account"
                  )}
                </button>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
}
