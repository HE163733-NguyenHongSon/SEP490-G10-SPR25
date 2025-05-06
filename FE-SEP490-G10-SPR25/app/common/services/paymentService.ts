const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const paymentService = {
  async updatePaymentStatusByReservationId(
    reservationId: number,
    status: string
  ): Promise<boolean> {
    try {
      const response = await fetch(
        `${apiUrl}/api/Payments/UpdateStatus?reservationId=${reservationId}&status=${encodeURIComponent(
          status
        )}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error(
          `Update failed with status ${response.status}: ${response.statusText}`
        );
        return false;
      }

   
      return true;
    } catch (error) {
      console.error("Error updating payment status:", error);
      return false;
    }
  },
};
