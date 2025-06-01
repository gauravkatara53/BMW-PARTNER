export const SupportNotifications = () => {
  const notifications = [
    {
      type: "info",
      title: "Feature Update",
      message: "Email booking confirmation has been launched.",
    },
    {
      type: "warning",
      title: "Document Expiry",
      message: "Warehouse B compliance documents are expiring soon.",
    },
    {
      type: "success",
      title: "Booking Completed",
      message: "Booking #102 has been successfully processed.",
    },
  ];

  const typeStyles: Record<string, string> = {
    info: "border-l-4 border-blue-500 bg-blue-50 text-blue-900",
    warning: "border-l-4 border-yellow-500 bg-yellow-50 text-yellow-900",
    success: "border-l-4 border-green-500 bg-green-50 text-green-900",
  };

  return (
    <div className="bg-[#0a1217] px-6 md:px-20 py-8">
      <div className="bg-base-200 p-6 rounded-xl shadow-md text-white">
        <h2 className="text-2xl font-semibold mb-6">Notifications</h2>
        <div className="space-y-4">
          {notifications.map((n, i) => (
            <div
              key={i}
              className={`p-4 rounded-md ${
                typeStyles[n.type]
              } transition-all duration-300`}
            >
              <p className="font-medium">{n.title}</p>
              <p className="text-sm mt-1">{n.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
