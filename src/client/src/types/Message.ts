import User from "types/User";

export default interface Message {
  message: string;
  author: User;
  timestamp: number;
}
