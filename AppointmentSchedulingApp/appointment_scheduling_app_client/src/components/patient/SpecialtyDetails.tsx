import { useParams } from "react-router-dom";

export const SpecialtyDetails = () => {
  const { id } = useParams();

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Specialty Details</h1>
      <p className="mt-4 text-gray-700">You are viewing details for specialty ID: {id}</p>
      {/* Add more details about the specialty here */}
    </div>
  );
};
