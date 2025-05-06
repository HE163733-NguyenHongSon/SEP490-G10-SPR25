const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL!;
export const emailService = {
  async sendEmail(data: IIMailPayload): Promise<boolean> {
    console.log("Gửi email đến:", data);
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        console.error("Gửi thất bại:", await res.text());
        return false;
      }

      const result = await res.json();
      return true;
    } catch (err) {
      console.error("Lỗi gửi email:", err);
      return false;
    }
  },
};
