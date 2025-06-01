import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiService } from "@/components/APIService/ApiService";
import Navbar from "@/components/Navbar";
import { Warehouse } from "lucide-react";

interface Price {
  title: string;
  amount: number;
  isMonthly: boolean;
}

interface Partner {
  name: string;
  username: string;
  avatar: string;
  email: string;
  phone: string;
  status: string;
  kycStatus: string;
}

interface Warehouse {
  _id: string;
  name: string;
  about: string;
  category: string;
  price: Price[];
  WarehouseStatus: string;
  address: string;
  city: string;
  pincode: number;
  state: string;
  country: string;
  areaSqFt: string;
  rentOrSell: string;
  thumbnail: string;
  images: string[];
  partnerName: Partner;
  subTotalPrice: number;
  totalPrice: number;
}

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

interface OrderHistoryEntry {
  customer: Customer;
  startDate: string;
  endDate: string;
}

const WarehouseProfile: React.FC = () => {
  const { warehouseId } = useParams<{ warehouseId: string }>();
  const [warehouse, setWarehouse] = useState<Warehouse | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [CustomerData, setCustomerData] = useState<any>(null);
  const [history, setHistory] = useState<OrderHistoryEntry[]>([]);

  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [_loading1, setLoading1] = useState(true);

  useEffect(() => {
    if (!warehouseId) return;

    apiService
      .get<{ data: Warehouse }>(`warehouse/get/detail/${warehouseId}`)
      .then((res) => {
        setWarehouse(res.data);
      })
      .finally(() => setLoading(false));
  }, [warehouseId]);

  useEffect(() => {
    if (!warehouseId) return;

    apiService
      .get<{ data: Warehouse }>(
        `warehouse/get/warehouse/order/status/${warehouseId}`
      )
      .then((res) => {
        setCustomerData(res.data);
      })
      .finally(() => setLoading(false));
  }, [warehouseId]);

  useEffect(() => {
    if (!warehouseId) return;

    apiService
      .get<{ data: OrderHistoryEntry[] }>(
        `warehouse/get/warehouse/order/history/${warehouseId}`
      )
      .then((res) => {
        setHistory(res.data);
      })
      .finally(() => setLoadingHistory(false));
  }, [warehouseId]);

  useEffect(() => {
    if (!warehouseId) return;

    apiService
      .get<{ data: { orders: any[] } }>(`order/warehouse/${warehouseId}`)
      .then((res) => {
        setOrders(res.data.orders);
      })
      .finally(() => setLoading1(false));
  }, [warehouseId]);

  const toggleExpand = (orderId: string) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  if (loading)
    return (
      <div className="bg-[#1d232a] text-white min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center mt-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </div>
    );

  if (!warehouse)
    return <div className="text-center mt-10">No warehouse found.</div>;

  return (
    <div className="bg-[#1d232a] text-white">
      <Navbar />
      <div className="p-6 pt-10 max-w-6xl mx-auto space-y-10">
        {/* Basic Details */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 h-full">
            <img
              src={warehouse.thumbnail}
              alt="Thumbnail"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold">{warehouse.name}</h1>
              <p className="text-gray-400 mb-2">{warehouse.about}</p>
              <p className="text-sm text-gray-500">
                {warehouse.address}, {warehouse.city}, {warehouse.state},{" "}
                {warehouse.country} - {warehouse.pincode}
              </p>
              <div className="mt-4 space-x-2">
                <span className="badge badge-success">
                  {warehouse.WarehouseStatus}
                </span>
                <span className="badge badge-info">{warehouse.rentOrSell}</span>
                <span className="badge badge-warning">
                  {warehouse.category}
                </span>
              </div>
              <div className="mt-4">
                <h2 className="font-semibold">Area:</h2>
                <p>{warehouse.areaSqFt} SqFt</p>
              </div>
              <div className="mt-4">
                <h2 className="font-semibold">Pricing:</h2>
                <ul className="list-disc list-inside text-gray-300">
                  {warehouse.price.map((p) => (
                    <li key={p.title}>
                      {p.title}: ₹{p.amount}{" "}
                      {p.isMonthly ? "/ month" : "(One-time)"}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {warehouse.images.map((img, idx) => (
              <div
                key={idx}
                className="aspect-[4/3] overflow-hidden rounded-lg shadow"
              >
                <img
                  src={img}
                  alt={`Warehouse ${idx}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Partner + User */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Partner Info */}
          <div>
            <h2 className="text-xl font-bold mb-2">Partner Details</h2>
            <div className="flex items-center gap-4 bg-base-200 p-4 rounded-lg">
              <img
                src={warehouse.partnerName.avatar}
                alt="Partner"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <p className="font-semibold ">
                  {warehouse.partnerName.name} ({warehouse.partnerName.username}
                  )
                </p>
                <p className="">
                  {warehouse.partnerName.email} | {warehouse.partnerName.phone}
                </p>
                <p className="py-1">
                  Status:{" "}
                  <span className="badge badge-primary">
                    {warehouse.partnerName.status}
                  </span>
                </p>
                <p className="py-1">
                  KYC:{" "}
                  <span className="badge badge-accent">
                    {warehouse.partnerName.kycStatus}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Current User */}
          <div>
            <h2 className="text-xl font-bold mb-2">Current User</h2>
            {CustomerData ? (
              <div className="bg-base-200 p-4 rounded-lg">
                <div>
                  <div className="flex items-center gap-4 bg-base-200 p-4 rounded-lg">
                    <img
                      src={CustomerData.avatar}
                      alt="Partner"
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <p className="font-semibold ">
                        {CustomerData.name} ({CustomerData.username})
                      </p>
                      <p className="">
                        {CustomerData.email} | {CustomerData.phone}
                      </p>
                      <p className="py-1">
                        Status:{" "}
                        <span className="badge badge-primary">
                          {CustomerData.status}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-base-200 p-4 rounded-lg text-gray-400">
                No user now.
              </div>
            )}
          </div>
        </div>

        {/* User History */}
        <div>
          <h2 className="text-xl font-bold mb-2">User History</h2>

          {loadingHistory ? (
            <div className="text-gray-500">Loading...</div>
          ) : history.length === 0 ? (
            <div className="text-gray-500">No order history found.</div>
          ) : (
            <ul className="bg-base-200 rounded-lg p-4 space-y-2">
              {history.map((entry, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center py-1"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={entry.customer.avatar}
                      alt={entry.customer.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{entry.customer.name}</p>
                      <p className="text-sm text-gray-500">
                        {entry.customer.email} | {entry.customer.phone}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-right text-gray-400">
                    <div>
                      <span className="font-medium">Start:</span>{" "}
                      {new Date(entry.startDate).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">End:</span>{" "}
                      {new Date(entry.endDate).toLocaleDateString()}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Payment Info */}
        <div>
          <h2 className="text-xl font-bold mb-4">Orders</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Rent/Sell</th>
                  <th>Total Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <React.Fragment key={order._id}>
                    <tr className="bg-base-100">
                      <td>{order.orderId}</td>
                      <td>{new Date(order.startDate).toLocaleDateString()}</td>
                      <td>{new Date(order.endDate).toLocaleDateString()}</td>
                      <td>
                        {order.WarehouseDetail?.WarehouseStatus === "Sold"
                          ? "Sell"
                          : "Rent"}
                      </td>
                      <td>₹{order.totalPrice}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline"
                          onClick={() => toggleExpand(order._id)}
                        >
                          {expandedOrderId === order._id
                            ? "Hide Payments"
                            : "View Payments"}
                        </button>
                      </td>
                    </tr>

                    {expandedOrderId === order._id && (
                      <tr className="bg-base-200">
                        <td colSpan={6}>
                          <div className="p-4">
                            <h3 className="font-semibold mb-2">
                              Payment History
                            </h3>
                            <table className="table w-full">
                              <thead>
                                <tr>
                                  <th>Month</th>
                                  <th>Amount</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {order.monthlyPayment.map(
                                  (p: any, i: number) => (
                                    <tr key={i}>
                                      <td>{p.month}</td>
                                      <td>₹{p.amount}</td>
                                      <td>
                                        <span
                                          className={`badge ${
                                            p.paymentForPartnerByBMW === "Paid"
                                              ? "badge-success"
                                              : "badge-error"
                                          }`}
                                        >
                                          {p.paymentForPartnerByBMW}
                                        </span>
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseProfile;
