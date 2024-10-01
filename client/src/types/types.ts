export type LoginForm = {
  email: string
  password: string
}

export type ValidationError = {
  msg: string;
  param: string;
}

export type SignupForm = {
  fullName: string
  email: string
  password: string
}