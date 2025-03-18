import { fetchUser } from "@/utils/service";
import { useQuery } from "@tanstack/react-query";

function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading user data</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Welcome to the Home Page
      </h1>

      {/* Displaying All Users Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">All Users</h3>
        <ul className="space-y-4">
          {data?.data.map((user: any, index: number) => (
            <li
              key={index}
              className="flex flex-col md:flex-row items-start justify-between p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all"
            >
              <div className="flex flex-col space-y-2">
                <p className="text-lg font-medium text-gray-800">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-600">Email: {user.email}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
