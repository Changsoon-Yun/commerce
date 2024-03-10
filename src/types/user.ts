export interface User {
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  isSeller: boolean;
  uid: string;
  email: string;
  profileImg: string;
  userName: string;
  updatedAt: {
    seconds: number;
    nanoseconds: number;
  };
}
