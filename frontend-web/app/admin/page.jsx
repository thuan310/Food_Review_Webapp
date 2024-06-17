'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import config from "@/constants/apiconfig";
import { useUser } from "@/components/UserContext";

export default function AdminPage() {
  const [foods, setFoods] = useState([]);
  const [feeback, setfeeback] = useState([])
  const [views, setviews] = useState([])
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {

    const allFoodAPI = `${config.apiBaseUrl}/foods/all`;
    const allFeedBackAPI = `${config.apiBaseUrl}/feedbacks/all`
    const allViewAPI = `${config.apiBaseUrl}/views/all`

    const fetchData = async () => {
      try {
        setLoading(true);
        const [response1, response2, response3] = await Promise.all([
          fetch(allFoodAPI, {

          }), 

          fetch(allFeedBackAPI, {

            method: 'GET',
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          }), 

          fetch(allViewAPI, {

            method: 'GET',
            headers: {
              'Authorization': `Bearer ${user.token}`
              
            }
          }),
        ]);
        
        if (!response1.ok || !response2.ok || !response3.ok) {
          throw new Error("Failed to fetch data");
        }

        const data1 = await response1.json();
        const data2 = await response2.json();
        const data3 = await response3.json();
        console.log(data2)
        setFoods(data1.data);
        setfeeback(data2.data);
        setviews(data3.data)

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = foods.slice(indexOfFirstItem, indexOfLastItem);

  const changePage = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return null;
  }

  return (
    <div className="pt-[100px] container mx-auto bg-kem">
      <div className="px-10 py-10">
        <h1 className="text-3xl font-bold mb-6 ">Page Views</h1>
        <p className="text-xl mb-4">
            Total Views: {views.reduce((total, view) => total + view.count, 0)}
        </p>
        <table className="min-w-full bg-white border rounded-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Pathname</th>
              <th className="py-2 px-4 border-b">View Count</th>
            </tr>
          </thead>
          <tbody>
            {views.map((view) => (
              <tr key={view.pathName}>
                <td className="py-2 px-4 border-b">
                  <a
                    href={view.pathName}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {view.pathName}
                  </a>
                </td>
                <td className="py-2 px-4 border-b">{view.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-10 py-10">
        <h1 className="text-3xl font-bold mb-6">All Feedback</h1>
        <table className="min-w-full bg-white border rounded-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Message</th>
            </tr>
          </thead>
          <tbody>
            {feeback.map((fb) => (
              <tr key={fb.id}>
                <td className="py-2 px-4 border-b">{fb.name}</td>
                <td className="py-2 px-4 border-b">{fb.email}</td>
                <td className="py-2 px-4 border-b">{fb.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-10 py-10">
        <h1 className="text-3xl font-bold mb-6 ">All Food</h1>
        <div className="mx-auto grid grid-cols-5 gap-5">
          {currentItems.map((food) => (

              <Link href={`/admin/${food.id}` } className=" hover:bg-gray-200 bg-white p-4 mb-4 rounded-md shadow-md transition duration-300">
                <img src={food.images[0].url} alt={food.name} className="w-full h-40 object-cover rounded-md" />
                <p className="text-xl font-bold cursor-pointer">{food.name}</p>
                <p className="text-gray-600">ID: {food.id}</p>
              </Link>
              
          ))}
        </div>

        <div className="flex justify-center mt-6">
          {[...Array(Math.ceil(foods.length / itemsPerPage)).keys()].map((number) => (
            <button
              key={number}
              onClick={() => changePage(number + 1)}
              className="mx-1 px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300"
            >
              {number + 1}
            </button>
          ))}
        </div>
      </div>
      
    </div>
  );
}
