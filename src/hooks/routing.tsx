import { useNavigate } from "react-router-dom"
import { useMemo } from "react"
import { stringify } from "qs"
import { RoutePath, SearchParams } from "types/type"

export function useRouter() {
  const navigate = useNavigate()
  return useMemo(() => {
    return {
      back(steps = 1) {
        navigate(-steps)
      },
      push(path: RoutePath, search?: SearchParams) {
        navigate({
          pathname: path,
          search: search ? stringify(search, { indices: false }) : undefined,
        })
      },
    }
  }, [navigate])
}
