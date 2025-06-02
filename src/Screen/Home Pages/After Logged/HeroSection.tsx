import Navbar from "@/components/Navbar";
import WarehouseCreateModal from "./WarehouseCreateModal";
import { useEffect, useState } from "react";
import { apiService } from "@/components/APIService/ApiService";
import { ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";
type Warehouse = {
  _id: string;
  name: string;
  address: string;
  city: string;
  WarehouseStatus: string;
  rentOrSell: string;
};

type WarehouseAPIResponse = {
  data: {
    warehouses: Warehouse[];
    currentPage: number;
    totalPages: number;
  };
};

export default function WarehousesHero() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchWarehouses = (page = 1) => {
    setLoading(true);
    apiService
      .get(`/warehouse/all/partner?page=${page}`)
      .then((response: unknown) => {
        const res = response as WarehouseAPIResponse;
        setWarehouses(res.data.warehouses);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching warehouses:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      fetchWarehouses(page);
    }
  };

  const handleWarehouseClick = (warehouseId: string) => {
    if (warehouseId) {
      navigate(`/warehouse-profile/${warehouseId}`);
    } else {
      alert("Partner document ID is missing.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#0a1217] px-20 ">
        <div className="p-4 md:p-8 bg-[#0a1217] text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl font-bold">My Warehouses</h1>
            <button
              className="btn btn-primary mt-4 md:mt-0"
              onClick={() => {
                const modal = document.getElementById(
                  "warehouse_create_modal"
                ) as HTMLDialogElement;
                if (modal) modal.showModal();
              }}
            >
              + Add New Warehouse
            </button>
          </div>

          <div className="overflow-x-auto">
            <div className="overflow-x-auto min-h-[15rem] flex flex-col items-center justify-center">
              <table className="table w-full text-sm md:text-base">
                <thead>
                  <tr className="text-gray-400">
                    <th>Name</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Rent/Sell</th>
                  </tr>
                </thead>
              </table>

              {loading ? (
                <div className="flex flex-col items-center justify-center h-60 text-gray-400">
                  <ClipboardList className="animate-pulse w-8 h-8 mb-2" />
                  <p className="text-sm">Loading warehouses...</p>
                </div>
              ) : warehouses.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-60 text-gray-400">
                  <ClipboardList className="w-8 h-8 mb-2" />
                  <p className="text-sm">No warehouses found.</p>
                </div>
              ) : (
                <table className="table w-full text-sm md:text-base">
                  <tbody>
                    {warehouses.map((warehouse) => (
                      <tr
                        onClick={() => handleWarehouseClick(warehouse._id)}
                        key={warehouse._id}
                        className="cursor-pointer hover:bg-gray-800"
                      >
                        <td>{warehouse.name}</td>
                        <td>{warehouse.city}</td>
                        <td>
                          <span
                            className={`badge border-0 px-3 py-1 rounded text-xs font-semibold ${
                              warehouse.WarehouseStatus === "Available"
                                ? "bg-green-800 text-green-200"
                                : warehouse.WarehouseStatus === "Rented"
                                ? "bg-yellow-700 text-yellow-200"
                                : warehouse.WarehouseStatus === "Sold"
                                ? "bg-red-800 text-red-200"
                                : "bg-gray-700 text-gray-300"
                            }`}
                          >
                            {warehouse.WarehouseStatus}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge border-0 ${
                              warehouse.rentOrSell === "Rent"
                                ? "bg-green-900 text-green-200"
                                : "bg-amber-900 text-amber-300"
                            }`}
                          >
                            {warehouse.rentOrSell}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination Controls */}
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
                    currentPage === i + 1
                      ? "btn-primary"
                      : "btn-outline text-white"
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

        <WarehouseCreateModal />
      </div>
    </>
  );
}
