import './Button.css'
export const Button = ({ children, type, className }) => {
  return (
    <button className={`button ${type} ${className??''}`}>{children}</button>
  )
}