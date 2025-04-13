import axios from 'axios';
import { DoctorDetailDTO, IDoctor, IDoctorDetail } from '../types/doctor';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const doctorService = {
  async getDoctorList(): Promise<IDoctor[]> {
    const response = await axios.get(`${API_URL}/api/Doctors`);
    return response.data;
  },

  async getDoctorDetailById(
    doctorId: string | number
  ): Promise<IDoctorDetail> {
      const response = await axios.get(`${API_URL}/api/Doctors/${doctorId}`);
    return response.data;
  },

  async getNumberOfDoctors(): Promise<number> {
    try {
      const doctors = await this.getDoctorList();
      return doctors.length;
    } catch (error) {
      console.error("Error getting number of doctors:", error);
      return 0; // Default value if error occurs
    }
  },

  async getDoctorListByFilterAndSort(
    specialties: string[],
    academicTitles: string[],
    degrees: string[],
    sortBy: string
  ): Promise<IDoctor[]> {
    const query = [];
    const sortOptions: { [key: string]: string } = {
      most_exp: "experienceYear",
      most_exam: "numberOfExamination",
      most_service: "numberOfService",
    };
    const orderBy = sortOptions[sortBy] || "rating";

    if (specialties.length > 0) {
      query.push(
        `specialtyNames/any(s: ${specialties
          .map((sp) => `s eq '${sp}'`)
          .join(" or ")})`
      );
    }
    if (academicTitles.length > 0) {
      query.push(
        `academicTitle in (${academicTitles.map((a) => `'${a}'`).join(",")})`
      );
    }
    if (degrees.length > 0) {
      query.push(`degree in (${degrees.map((d) => `'${d}'`).join(",")})`);
    }

    const res = await axios.get(
      `${API_URL}/api/Doctors?${
        query.length > 0 ? `$filter=${query.join(" or ")}&` : ""
      }$orderby=${orderBy} desc`
    );
    return res.data;
  },
  
  async deleteDoctor(doctorId: number): Promise<{ success: boolean; message: string }> {
    try {
      const response = await axios.delete(`${API_URL}/api/Doctors/${doctorId}`);
      return { 
        success: true, 
        message: "Xóa bác sĩ thành công" 
      };
    } catch (error: any) {
      console.error("Error deleting doctor:", error);
      
      // Check if the error has a response with a validation error
      if (error.response) {
        // If it's a validation exception (e.g., active reservations)
        if (error.response.status === 400 || error.response.status === 409) {
          return {
            success: false,
            message: error.response.data.message || error.response.data || "Không thể xóa bác sĩ vì có ràng buộc với dữ liệu khác"
          };
        }
        
        // If the doctor is not found
        if (error.response.status === 404) {
          return {
            success: false,
            message: "Không tìm thấy bác sĩ"
          };
        }
        
        // Any other error with response
        return {
          success: false,
          message: error.response.data.message || error.response.data || "Lỗi khi xóa bác sĩ"
        };
      }
      
      // General error without response details
      return {
        success: false,
        message: error.message || "Lỗi khi xóa bác sĩ"
      };
    }
  },
  
  async updateDoctor(doctorId: number, doctorData: DoctorDetailDTO): Promise<IDoctorDetail> {
    try {
      const response = await axios.put(`${API_URL}/api/Doctors/${doctorId}`, doctorData);
      return response.data;
    } catch (error: any) {
      console.error("Error updating doctor:", error);
      
      // Check if the error has a response
      if (error.response) {
        // If it's a validation error
        if (error.response.status === 400) {
          throw new Error(error.response.data.message || error.response.data || "Dữ liệu bác sĩ không hợp lệ");
        }
        
        // If the doctor is not found
        if (error.response.status === 404) {
          throw new Error("Không tìm thấy bác sĩ");
        }
        
        // Any other error with response
        throw new Error(error.response.data.message || error.response.data || `Lỗi khi cập nhật bác sĩ: ${error.response.status}`);
      }
      
      // General error without response details
      throw new Error(error.message || "Lỗi khi cập nhật bác sĩ");
    }
  }
};
