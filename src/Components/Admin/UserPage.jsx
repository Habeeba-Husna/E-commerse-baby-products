import React, { useContext, useState } from "react";
import { Admincontext } from "./AdminContext";
import { MdClose } from "react-icons/md";

const UserPage = () => {
  const { users, block } = useContext(Admincontext);
  const [usershow, setUsershow] = useState(null);   //holds the user details for the modal.

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-center text-4xl font-bold text-rose-500 mb-10">
        User Management
      </h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-indigo-100">
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 cursor-pointer"
                onDoubleClick={() => setUsershow(user)}
              >
                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                  {user.userName}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                  {user.email}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-center">

                  <button
                    className={`${user.status
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-blue-600 hover:bg-blue-700"
                      } text-white font-medium py-1 px-4 rounded-full transition-all`}
                    onClick={() => block(user.id, user.status)}
                  >
                    {user.status ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* User Details Modal */}
        {usershow && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full relative">
              <MdClose
                className="absolute top-3 right-3 text-gray-600 cursor-pointer hover:text-gray-800"
                onClick={() => setUsershow(null)}
                size={28}
              />
              <h2 className="text-2xl text-center font-bold text-gray-800 mb-4">
                USER DETAILS
              </h2>
              <div className="space-y-4">
                <p className="text-lg pt-3 text-gray-700">
                  <strong>Username:</strong> {usershow.userName}
                </p>
                <p className="text-lg text-gray-700">
                  <strong>Email:</strong> {usershow.email}
                </p>

                {usershow.order.length === 0 ? (
                  <h3 className="text-center text-xl text-gray-500">
                    No orders
                  </h3>
                ) : (
                  <>
                    {usershow.order.map((order, index) => (
                      <div
                        key={order.id}
                        className="mb-4 border-b pb-4 last:border-0"
                      >
                        <p className="text-lg pb-2 font-semibold text-gray-800">
                          Order {index + 1} :
                        </p>
                      
                        <p className="text-sm text-gray-500">
                          <strong>Date:</strong>{" "}
                          {order.date
                            ? new Date(order.date).toLocaleString()
                            : "Date not available"}
                        </p>

                        <ul className="list-disc list-inside mt-2 space-y-2">
                          {order.items.map((item) => (
                            <li
                              key={item.id}
                              className="flex justify-between text-sm text-gray-700"
                            >
                              <span>{item.name}</span>
                              <span>
                                {item.quantity} x ₹{item.price}
                              </span>
                              <span>
                                ₹{(item.quantity * item.price).toFixed(2)}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <p className="mt-2 text-lg pt-5 font-semibold text-gray-800">
                          <strong>Order Total:</strong> ₹{order.total.toFixed(2)}
                        </p>
                      </div>
                    ))}
                    <div className="flex justify-center items-center mt-6">
                      <p className="text-lg font-semibold text-gray-800">
                        <strong>Total Amount:</strong> ₹{" "}
                        {usershow.order
                          .reduce((acc, order) => acc + order.total, 0)
                          .toFixed(2)}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;


