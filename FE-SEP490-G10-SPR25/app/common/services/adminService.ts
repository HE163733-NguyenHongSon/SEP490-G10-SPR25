import axios from "axios";
import { AdminDTO } from "@/common/types/admin";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const adminService = {
  async getAllAccounts(): Promise<IUser[]> {
    try {
      const response = await axios.get(`${API_URL}/api/Admin/accounts`);
      return response.data;
    } catch (error) {
      console.error("Error fetching accounts:", error);
      throw error;
    }
  },

  async getAccountsByType(): Promise<{ staff: IUser[]; customers: IUser[] }> {
    try {
      const response = await axios.get(`${API_URL}/api/Admin/accounts/by-type`);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching accounts by type:", error);

      // Log chi tiết về lỗi từ API
      if (error.response) {
        console.error("Response error data:", error.response.data);
        console.error("Response status:", error.response.status);

        // Nếu là lỗi SQL (thường được trả về bởi API trong message)
        if (
          error.response.data &&
          error.response.data.error &&
          error.response.data.error.includes("Invalid column name")
        ) {
          console.error("SQL Error detected - Invalid column name issue");
        }
      }

      // Mặc định trả về một đối tượng rỗng để tránh gây lỗi UI
      if (error.response && error.response.status === 500) {
        console.warn("Returning empty result due to server error");
        return { staff: [], customers: [] };
      }

      throw error;
    }
  },

  async createDoctorAccount(accountData: AdminDTO): Promise<IUser | null> {
    try {
      const formattedData = {
        ...accountData,
        citizenId:
          typeof accountData.citizenId === "string"
            ? parseInt(accountData.citizenId)
            : accountData.citizenId,
      };


      const response = await axios.post(
        `${API_URL}/api/Admin/accounts/doctor`,
        formattedData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating doctor account:", error);
      throw error;
    }
  },

  async createReceptionistAccount(
    accountData: AdminDTO
  ): Promise<IUser | null> {
    try {
      const formattedData = {
        ...accountData,
        citizenId:
          typeof accountData.citizenId === "string"
            ? parseInt(accountData.citizenId)
            : accountData.citizenId,
      };

    

      const response = await axios.post(
        `${API_URL}/api/Admin/accounts/receptionist`,
        formattedData
      );
      return response.data;
    } catch (error: any) {
      console.error("Error creating receptionist account:", error);

      // Log chi tiết lỗi từ API
      if (error.response) {
        console.error("Response error data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request was made but no response was received");
        console.error(error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }

      throw error;
    }
  },

  async updateAccount(userId: number, accountData: AdminDTO): Promise<IUser> {
    try {
      // Tạo object chứa các thuộc tính từ accountData
      const formattedData: any = {
        name: accountData.name || accountData.userName,
        userName: accountData.userName,
        email: accountData.email,
        phone: accountData.phone,
        gender: accountData.gender,
        dob: accountData.dob,
        address: accountData.address || "",
        citizenId:
          typeof accountData.citizenId === "string"
            ? parseInt(accountData.citizenId as string)
            : accountData.citizenId,
        // Chỉ sử dụng trường Password với P viết hoa (theo format backend)
        Password: accountData.Password || accountData.password || "",
      };

      // Thêm avatarUrl nếu có
      if (accountData.avatarUrl) {
        formattedData.avatarUrl = accountData.avatarUrl;
      }

      // Thêm role nếu có
      if (accountData.role) {
        formattedData.role = accountData.role;
      }



      // Check for missing required fields according to backend DTO
      const requiredFields = [
        "userName",
        "email",
        "phone",
        "gender",
        "dob",
        "citizenId",
      ];
      for (const field of requiredFields) {
        // Use type assertion to access the property
        const key = field as keyof typeof formattedData;
        if (
          formattedData[key] === undefined ||
          formattedData[key] === null ||
          formattedData[key] === ""
        ) {
          console.warn(
            `Warning: Required field '${field}' may be missing or empty in request`
          );
        }
      }

      // Đảm bảo trường mật khẩu được gửi đúng cách - log chi tiết để debug

      const response = await axios.put(
        `${API_URL}/api/Admin/accounts/${userId}`,
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          // Tắt tính năng allowAbsoluteUrls
          transformRequest: [
            (data) => {
              // Nếu có trường allowAbsoluteUrls, loại bỏ nó
              if (data && typeof data === "object") {
                const cleanData = { ...data };
                if ("allowAbsoluteUrls" in cleanData) {
                  delete cleanData.allowAbsoluteUrls;

                }
                return JSON.stringify(cleanData);
              }
              return JSON.stringify(data);
            },
          ],
        }
      );


      return response.data;
    } catch (error: any) {
      console.error("------------- ACCOUNT UPDATE ERROR -------------");
      console.error("Error updating account:", error);

      // Log chi tiết lỗi từ API
      if (error.response) {
        console.error("Error response status:", error.response.status);
        console.error("Error response statusText:", error.response.statusText);
        console.error("Error response headers:", error.response.headers);

        if (typeof error.response.data === "string") {
          console.error("Error response data (string):", error.response.data);
        } else {
          console.error(
            "Error response data (object):",
            JSON.stringify(error.response.data, null, 2)
          );

          // Check for validation errors specifically
          if (error.response.data.errors) {
            console.error("Validation errors found:");
            for (const field in error.response.data.errors) {
              console.error(
                `  ${field}: ${error.response.data.errors[field].join(", ")}`
              );
            }
          }
        }
      } else if (error.request) {
        console.error("Request was made but no response was received");
        console.error("Request details:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }

      console.error("Error config:", error.config);

      throw error;
    }
  },

  async deleteAccount(userId: number): Promise<boolean> {
    try {
      await axios.delete(`${API_URL}/api/Admin/accounts/${userId}`);
      return true;
    } catch (error: any) {
      console.error("Error deleting account:", error);

      // Xử lý lỗi từ API
      if (error.response && error.response.data) {
        // Trường hợp lỗi Validation
        if (error.response.status === 400 || error.response.status === 500) {
          // Lấy thông báo lỗi từ response
          let errorMessage = "Không thể xóa tài khoản";

          if (typeof error.response.data === "string") {
            errorMessage = error.response.data;
          } else if (error.response.data.message) {
            errorMessage = error.response.data.message;
          } else if (error.response.data.error) {
            errorMessage = error.response.data.error;
          }

          // Nếu thông báo lỗi quá dài, rút gọn lại
          if (errorMessage.includes("Không thể xóa tài khoản lễ tân vì")) {
            errorMessage =
              "Không thể xóa tài khoản lễ tân vì đang có ca làm việc hoặc thanh toán chưa hoàn thành";
          } else if (
            errorMessage.includes("Không thể xóa tài khoản bác sĩ vì")
          ) {
            errorMessage =
              "Không thể xóa tài khoản bác sĩ vì đang có lịch hẹn hoặc dịch vụ đang hoạt động";
          } else if (
            errorMessage.includes("Không thể xóa tài khoản bệnh nhân vì")
          ) {
            errorMessage =
              "Không thể xóa tài khoản bệnh nhân vì đang có lịch hẹn hoặc dịch vụ đang hoạt động";
          }

          error.userMessage = errorMessage;
        }
      }

      throw error;
    }
  },

  async toggleAccountStatus(
    userId: number,
    isActive: boolean
  ): Promise<boolean> {
    try {
      const response = await axios.patch(
        `${API_URL}/api/Admin/accounts/${userId}/status?isActive=${isActive}`
      );
      return response.data;
    } catch (error) {
      console.error("Error toggling account status:", error);
      throw error;
    }
  },

  async getAllRoles(): Promise<any[]> {
    try {
      const response = await axios.get(`${API_URL}/api/Admin/roles`);
      return response.data;
    } catch (error) {
      console.error("Error fetching roles:", error);
      throw error;
    }
  },

  async assignRole(userId: number, roleId: number): Promise<boolean> {
    try {
      const response = await axios.post(
        `${API_URL}/api/Admin/accounts/${userId}/roles/${roleId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error assigning role:", error);
      throw error;
    }
  },

  async removeRole(userId: number, roleId: number): Promise<boolean> {
    try {
      const response = await axios.delete(
        `${API_URL}/api/Admin/accounts/${userId}/roles/${roleId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error removing role:", error);
      throw error;
    }
  },

  async getDashboard(): Promise<IDashboardAdmin> {
    try {
      const response = await axios.get(`${API_URL}/api/Admin/dashboard`);
      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard metrics:", error);
      throw error;
    }
  },
  async getStatics(): Promise<IDashboardAdminStatistic[]> {
    try {
      const response = await axios.get(
        `${API_URL}/api/Admin/statistics/last-12-months`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard statistics:", error);
      throw error;
    }
  },
  async exportDashboardToExcel(): Promise<void> {
    try {
      const response = await axios.get(`${API_URL}/api/File/export-dashboard`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Tạo ngày tháng định dạng DDMMYYYY
      const today = new Date();
      const formattedDate = [
        today.getDate().toString().padStart(2, "0"), // Ngày
        (today.getMonth() + 1).toString().padStart(2, "0"), // Tháng (+1 vì getMonth() trả về 0-11)
        today.getFullYear(), // Năm
      ].join("");

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `DashBoard_${formattedDate}.xlsx`; // Thêm ngày vào tên file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Lỗi khi export dashboard:", error);
      throw error;
    }
  },
};
