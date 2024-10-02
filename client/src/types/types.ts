export type LoginForm = {
  email?: string
  password?: string
}

export type SignupForm = {
  fullName?: string
  email?: string
  password?: string
}

export type IRouterType = {
  title: string;
  path?: string;
  element: JSX.Element;
  children?: IRouterType[];
}