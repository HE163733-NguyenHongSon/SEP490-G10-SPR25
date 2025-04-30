import ClearButton from "@/common/components/ClearButton";

export default async function PatientsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center z-10"
      style={{ backgroundImage: 'url("/images/background_doctors.jpeg")' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>

      <div className="container mt-20 mb-5 z-30 bg-white rounded-xl shadow-2xl">
        <div className="w-full p-4 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
