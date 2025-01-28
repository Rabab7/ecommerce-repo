export interface IUserOrders {
    shippingAddress: {
      details: string;
      phone: string;
      city: string;
    };
    taxPrice: number;
    shippingPrice: number;
    totalOrderPrice: number;
    paymentMethodType: string;
    isPaid: boolean;
    isDelivered: boolean;
    _id: string;
    user: {
      _id: string;
      name: string;
      email: string;
      phone: string;
    };
    cartItems: {
      count: number;
      _id: string;
      product: {
        subcategory: {
          _id: string;
          name: string;
          slug: string;
          category: string;
        }[];
        ratingsQuantity: number;
        _id: string;
        title: string;
        imageCover: string;
        category: {
          _id: string;
          name: string;
          slug: string;
          image: string;
        };
        brand: {
          _id: string;
          name: string;
          slug: string;
          image: string;
        };
        ratingsAverage: number;
        id: string;
      };
      price: number;
    }[];
    createdAt: string;
    updatedAt: string;
    id: number;
    __v: number;
  }