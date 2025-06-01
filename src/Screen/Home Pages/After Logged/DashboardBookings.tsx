import { apiService } from "@/components/APIService/ApiService";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

// 1. Define BookingStats type
type BookingStats = {
  totalRented: number;
  totalSold: number;
  totalAvailable: number;
};

// 2. Define full API response type
type ApiResponse<T> = {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
  errors: any;
  timestamp: string;
};

const DashboardBookings = () => {
  const [stats, setStats] = useState<BookingStats>({
    totalRented: 0,
    totalSold: 0,
    totalAvailable: 0,
  });

  const fetchPartnerBookingsStats = async () => {
    try {
      const response = await apiService.get<ApiResponse<BookingStats>>(
        "/partner/partner/stats"
      );
      setStats(response.data); // ✅ safely access 'data' property
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  useEffect(() => {
    fetchPartnerBookingsStats();
  }, []);

  return (
    <div className="px-20 bg-[#0a1217] py-20">
      <div className="p-4 md:p-8 bg-[#0a1217] text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Bookings</h1>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-sm btn-outline">
              Finder
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="card bg-base-300 shadow-md p-4">
            <div className="flex items-center gap-4">
              <div className="text-3xl">📄</div>
              <div>
                <div className="text-sm text-gray-400">
                  No of Rented Warehouses
                </div>
                <div className="text-2xl font-bold">
                  <CountUp end={stats.totalRented} duration={1.5} />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card bg-base-300 shadow-md p-4">
            <div className="flex items-center gap-4">
              <div className="text-3xl">🗓️</div>
              <div>
                <div className="text-sm text-gray-400">
                  No of Sold Warehouses
                </div>
                <div className="text-2xl font-bold">
                  <CountUp end={stats.totalSold} duration={1.5} />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card bg-base-300 shadow-md p-4 col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-4">
              <div className="text-3xl">⏳</div>
              <div>
                <div className="text-sm text-gray-400">
                  Number of Warehouses Available
                </div>
                <div className="text-2xl font-bold">
                  <CountUp end={stats.totalAvailable} duration={1.5} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <button
            className="btn btn-outline"
            onClick={() => {
              const modal = document.getElementById(
                "warehouse_create_modal"
              ) as HTMLDialogElement;
              if (modal) modal.showModal();
            }}
          >
            Add New Warehouse
          </button>

          <button className="btn btn-outline">View Bookings</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardBookings;
