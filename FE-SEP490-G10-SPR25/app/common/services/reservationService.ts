const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL!;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const reservationService = {
  async getListReservationByFilter(
    patientId: string | undefined,
    status: string,
    sortBy: string
  ) {
    const response = await fetch(
      `${apiUrl}/api/Reservations/${patientId}/${status}/${sortBy}`
    );
    return response.json();
  },
  async getReservationById(reservationId: string): Promise<IReservation> {
    const response = await fetch(`${apiUrl}/api/Reservations/${reservationId}`);
    if (!response.ok) throw new Error("Không thể lấy thông tin đặt lịch");
    return response.json();
  },
  
  async getNumberOfReservationsByPatientIdAndStatus(
    patientId: string,
    status: string
  ): Promise<IStatus> {
    const response = await fetch(
      `${apiUrl}/odata/Reservations/$count?$filter=patient/userId eq ${patientId} and status eq '${status}'`
    );

    const data = await response.json();
    return { name: status, count: data };
  },
  async getCancelCountThisMonth(patientId?: string): Promise<IStatus> {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // JS: 0 = Jan
    const url =
      `${apiUrl}/odata/Reservations/$count?$filter=` +
      `patient/userId eq ${patientId} and ` +
      `status eq 'Đã hủy' and ` +
      `year(createdDate) eq ${year} and ` +
      `month(createdDate) eq ${month}`;
    const response = await fetch(url, {
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch reservation count");
    }

    const data = await response.text();
    return { name: "Đã hủy trong tháng", count: Number(data) };
  },
  async getListReservationByPatientId(
    patientId?: string
  ): Promise<IReservation[]> {
    const response = await fetch(
      `${apiUrl}/api/Reservations?$filter=patient/userId eq ${patientId}`
    );
    return response.json();
  },

  async getBookingSuggestion(
    symptoms: string,
    patientId?: string
  ): Promise<IBookingSuggestion | null> {
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symptoms,
          patientId,
        }),
      });

      if (!res.ok) {
        console.error("Gợi ý thất bại:", await res.text());
        return null;
      }

      const result = await res.json();
      return result;
    } catch (error) {
      console.error("Error fetching booking suggestion:", error);
      return null;
    }
  },

  async validateSymptomsMatchSpecialtyAndService(
    symptoms: string,
    serviceOverview: string,
    specialtyDescription: string
  ): Promise<{
    isValid: boolean;
    message?: string;
  }> {
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symptoms,
          serviceOverview,
          specialtyDescription,
        } as ISymptomValidation),
      });

      if (!response.ok) {
        throw new Error("Failed to connect to n8n.");
      }

      const result = await response.json();

      return result;
    } catch (error) {
      console.error("Validation error:", error);
      return {
        isValid: true,
        message: "Không thể kiểm tra triệu chứng tự động.",
      };
    }
  },

  async updateReservationStatus(rs: IReservationStatus) {
    const response = await fetch(
      `${apiUrl}/api/Reservations/UpdateReservationStatus`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rs),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update reservation status");
    }

    const data = await response.json();

    return data;
  },
};

export default reservationService;
