import SpecialtyList from "./component/SpecialtyList";
// hoặc import Table từ "./component/Table" nếu bạn muốn xài component Table

export default function SpecialtiesPage() {
  return (
    <div>
      {/* <h1>Danh sách chuyên khoa</h1> */}
      <SpecialtyList />
      {/* hoặc <Table /> nếu bạn muốn hiển thị bằng Table component */}
    </div>
  );
}
