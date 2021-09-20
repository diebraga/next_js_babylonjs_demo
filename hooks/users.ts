import useSWR from "swr";
import { Users } from "../types/users";

export function getUsers() {
  const { data, error } = useSWR('/api/users')

  return {
    users: data as Users[],
    isLoading: !error && !data,
    error,
  } 
}

export function getUserById(id: string) {
  const { data, error } = useSWR(`/api/users/${id}`)
  
  return {
    user: data as Users,
    isLoading: !error && !data,
    error,
  } 
}

export function getUserMe() {
  const { data, error } = useSWR(`/api/users/me`)
  
  return {
    userMe: data as Users,
    isLoading: !error && !data,
    error,
  } 
}