export default function DoctorDetails({ params }: { params: { doctorId: string } }) {
    return (
      <div className="my-52 ">
        <h1>Doctor ID: {params.doctorId}</h1>
      </div>
    );
  }
  