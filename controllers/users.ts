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

export function getPostById(id: string) {
  const { data, error } = useSWR(`api/user/${id}`, { dedupingInterval: 80000 })
  
  return {
    user: data as usersModel[],
    isLoading: !error && !data,
    error,
  } 
}