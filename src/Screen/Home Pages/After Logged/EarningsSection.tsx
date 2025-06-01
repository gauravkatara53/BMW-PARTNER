import { useEffect, useState } from "react";
import { apiService } from "@/components/APIService/ApiService";
import { format } from "date-fns";

interface Transaction {
  _id: string;
  transactionDate: string;
  amount: number;
  isdebited: boolean;
  warehouseName: string;
  totalPrice: number;
  UTR: string;
  orderId: string;
}

interface StatsResponse {
  totalEarnings: number;
  thisMonthEarnings: number;
  thisWeekEarnings: number;
}

const ITEMS_PER_PAGE = 10;

export const EarningsSection = () => {
  const [metrics, setMetrics] = useState<StatsResponse>({
    totalEarnings: 0,
    thisMonthEarnings: 0,
    thisWeekEarnings: 0,
  });

  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await apiService.get<StatsResponse>(
        "transaction/get/partner/payment/stats"
      );
      setMetrics(res);
    } catch (err) {
      console.error("Error fetching stats", err);
    }
  };

  const fetchAllTransactions = async () => {
    setLoading(true);
    try {
      const res = await apiService.get<any>(
        "transaction/all/transaction/bmw/to/partner",
        { limit: 1000, sortBy: "transactionDate", sortOrder: "desc" } // big enough limit
      );
      setAllTransactions(res.data.transactions || []);
    } catch (err) {
      console.error("Error fetching transactions", err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...allTransactions];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((txn) =>
        txn.warehouseName?.toLowerCase().includes(q)
      );
    }

    if (startDate) {
      filtered = filtered.filter(
        (txn) => new Date(txn.transactionDate) >= new Date(startDate)
      );
    }

    if (endDate) {
      filtered = filtered.filter(
        (txn) => new Date(txn.transactionDate) <= new Date(endDate)
      );
    }

    const total = filtered.length;
    setTotalPages(Math.ceil(total / ITEMS_PER_PAGE));

    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginated = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);
    setTransactions(paginated);
  };

  useEffect(() => {
    fetchStats();
    fetchAllTransactions();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, startDate, endDate]);

  useEffect(() => {
    applyFilters();
  }, [allTransactions, searchQuery, startDate, endDate, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-[#0a1217] px-6 md:px-20 py-10 text-white">
      <div className="bg-base-200 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6">💰 Earnings Overview</h2>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {[
            {
              label: "Total Earnings",
              value: `₹${metrics.totalEarnings.toLocaleString()}`,
              color: "text-green-500",
            },
            {
              label: "This Month",
              value: `₹${metrics.thisMonthEarnings.toLocaleString()}`,
              color: "text-blue-500",
            },
            {
              label: "This Week",
              value: `₹${metrics.thisWeekEarnings.toLocaleString()}`,
              color: "text-yellow-500",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-base-100 p-5 rounded-lg shadow flex flex-col gap-2"
            >
              <p className="text-sm text-gray-400">{item.label}</p>
              <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by warehouse"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered input-sm text-black"
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="input input-bordered input-sm text-black"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input input-bordered input-sm text-black"
          />
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-10 text-gray-400">Loading...</div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              No transactions found.
            </div>
          ) : (
            <table className="table text-white">
              <thead>
                <tr className="text-gray-400 text-sm">
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Warehouse</th>
                  <th>Amount</th>
                  <th>UTR</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn._id} className="hover">
                    <td>{txn.orderId}</td>
                    <td>
                      {format(new Date(txn.transactionDate), "dd MMM, yyyy")}
                    </td>
                    <td>{txn.warehouseName || "N/A"}</td>

                    <td>₹{(txn.totalPrice ?? txn.amount).toLocaleString()}</td>
                    <td>{txn.UTR || "N/A"}</td>
                    <td>
                      <span
                        className={`badge ${
                          txn.isdebited ? "badge-success" : "badge-warning"
                        }`}
                      >
                        {txn.isdebited ? "Completed" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          <button
            className="btn btn-sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`btn btn-sm ${
                currentPage === i + 1 ? "btn-primary" : "btn-outline text-white"
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="btn btn-sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
