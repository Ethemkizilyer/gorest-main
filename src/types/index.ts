// Main user data type
export type IUserData = {
  id: string;
  name: string;
  email: string;
  gender: string;
  status: string;
};
// Main todos data type
export type IUserTodos = {
  id: string;
  user_id: string;
  title: string;
  due_on: string;
  status: string;
};
