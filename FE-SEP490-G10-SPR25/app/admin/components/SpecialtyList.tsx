import React from 'react';

const SpecialtyList: React.FC = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mb-3 mb-lg-5">
          <div className="overflow-hidden card table-nowrap table-card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">New customers</h5>
              <a href="#!" className="btn btn-light btn-sm">View All</a>
            </div>
            <div className="table-responsive">
              <table className="table mb-0">
                <thead className="small text-uppercase bg-body text-muted">
                  <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Created Date</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[1,2,3,4,5].map((id) => (
                    <tr key={id} className="align-middle">
                      <td>
                        <div className="d-flex align-items-center">
                          <img src={`https://bootdey.com/img/Content/avatar/avatar${id}.png`} className="avatar sm rounded-pill me-3 flex-shrink-0" alt="Customer" />
                          <div>
                            <div className="h6 mb-0 lh-1">Customer Name {id}</div>
                          </div>
                        </div>
                      </td>
                      <td>customer{id}@email.com</td>
                      <td><span className="d-inline-block align-middle">Country{id}</span></td>
                      <td><span>****{(id*1234)%9999}</span></td>
                      <td>01 Jan, 2023</td>
                      <td className="text-end">
                        <div className="dropdown">
                          <a data-bs-toggle="dropdown" href="#!" className="btn p-1">
                            <i className="fa fa-bars" aria-hidden="true"></i>
                          </a>
                          <div className="dropdown-menu dropdown-menu-end">
                            <a href="#!" className="dropdown-item">View Details</a>
                            <a href="#!" className="dropdown-item">Delete user</a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialtyList;
