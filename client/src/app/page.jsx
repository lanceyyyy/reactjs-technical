"use client";
import AddFruit from "@/components/AddFruit";
import { FruitProvider } from "@/contexts/FruitContext";

function App() {
  return (
    <FruitProvider>
      <main className="min-h-screen bg-gray-50 p-6 md:p-12 flex flex-col items-center gap-8">
        <h1 className="text-3xl border-b-4 font-bold text-gray-800 border-blue-200 pb-2">
          Fruit Inventory
        </h1>
        <div className="w-full max-w-4xl overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-left border border-gray-200 bg-white ">
            <thead className="bg-blue-100 text-gray-700 uppercase text-sm">
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((fruit, index) => (
                <tr
                  key={index}
                  className="hover:bg-blue-50 transition-colors border-t"
                >
                  <td>{fruit.name}</td>
                  <td>{fruit.type}</td>
                  <td>{fruit.price}</td>
                  <td>{fruit.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AddFruit />
      </main>
    </FruitProvider>
  );
}

export default App;
