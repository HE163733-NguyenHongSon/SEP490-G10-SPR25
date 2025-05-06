const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const handleVNPayPayment = async (paymentData: Partial<IPayment>) => {
  try {
    const response = await fetch(`${apiUrl}/api/VnPay/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Payment failed: ${errorData}`);
    }

    const data = await response.json();

    if (!data.paymentUrl) {
      throw new Error("Invalid payment URL received from server");
    }
    console.log("Payment URL:", data.paymentUrl);
    window.location.href = data.paymentUrl.result;
    // return { ok: true, paymentUrl: data.paymentUrl };
  } catch (error) {
    console.error("Payment error:", error);
    throw error; // Rethrow to handle in the component
  }
};
