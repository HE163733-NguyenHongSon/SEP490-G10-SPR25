const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const handleVNPayPayment = async (paymentData: Partial<IPayment>) => {
            console.log("sonnn",paymentData);
    
  try {
    const response = await fetch(`${apiUrl}/api/VnPay/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const paymentUrl = data.paymentUrl;
    if (paymentUrl) {
      console.log(paymentUrl);
      window.location.href = paymentUrl;
    } else {
      console.error("Không nhận được URL thanh toán", data);
      throw new Error("Không nhận được URL thanh toán từ server");
    }
  } catch (error) {
    console.error("Lỗi khi gọi API thanh toán:", error);
  }
  return true;
};
