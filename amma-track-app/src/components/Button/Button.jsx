import './Button.css'
export const Button = ({ onClick, children, type }) => {
  return (
    <button onClick={onClick} className={`button ${type}`}>{children}</button>
  )
}