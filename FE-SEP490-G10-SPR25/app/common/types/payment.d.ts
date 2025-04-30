 interface IPayment {
    paymentId?: number;
    payerId: string;
    reservation: Partial<IReservation>;
    transactionId?: string;
    paymentStatus?: string;
    paymentMethod: string; 
    amount: number;
    vnPayResponseCode?: string;
  }
  