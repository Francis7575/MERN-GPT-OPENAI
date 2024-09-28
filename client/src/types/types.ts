export type LoginForm = {
  email: string
  password: string
}

export type ValidationError = {
  msg: string;
  param: string;
}

export type SignupForm = {
  name: string
  email: string
  password: string
}