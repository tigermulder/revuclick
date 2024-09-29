import axiosInstance from "./axios"
import {
  FavoriteListRequest,
  FavoriteListResponse,
  FavoriteAddRequest,
  FavoriteAddResponse,
  FavoriteRemoveRequest,
  FavoriteRemoveResponse,
} from "types/api-types/favorite-type"

//** Favorite 리스트 요청 API */
export const getFavoriteList = async (
  data: FavoriteListRequest
): Promise<FavoriteListResponse> => {
  const response = await axiosInstance.post<FavoriteListResponse>(
    "/favorite/list",
    data
  )
  return response.data
}

//** Favorite 추가 요청 API */
export const addFavorite = async (
  data: FavoriteAddRequest
): Promise<FavoriteAddResponse> => {
  const response = await axiosInstance.post<FavoriteAddResponse>(
    "/favorite/add",
    data
  )
  return response.data
}

//** Favorite 제거 요청 API */
export const removeFavorite = async (
  data: FavoriteRemoveRequest
): Promise<FavoriteRemoveResponse> => {
  const response = await axiosInstance.post<FavoriteRemoveResponse>(
    "/favorite/remove",
    data
  )
  return response.data
}
