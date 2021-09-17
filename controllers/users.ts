import useSWR from "swr";
import { usersModel } from "../models/users";

export function getUsers() {
  const { data, error } = useSWR('api/users')

  return {
    users: data as usersModel[],
    isLoading: !error && !data,
    error,
  } 
}

export function getUserById(id: string) {
  const { data, error } = useSWR(`api/users/${id}`)
  
  return {
    user: data as usersModel,
    isLoading: !error && !data,
    error,
  } 
}