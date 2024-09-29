import { useNavigate } from "react-router-dom"
import Button from "components/Button"

const MainPage = () => {
  return (
    <div>
      <Button size="M" color="red" state="enabled" disableable={false} label="Disabled Button" />
      <Button size="M" color="black" state="enabled" disableable={false} label="Disabled Button" />
    </div>
  )
}

export default MainPage
