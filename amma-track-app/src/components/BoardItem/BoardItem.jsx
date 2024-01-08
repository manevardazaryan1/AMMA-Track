import './BoardItem.css'
export const BoardItem = ({ img, title }) => {
  return (
    <div style={{ backgroundImage: `url(${img})` }} className="boardItem">
      <div className='boardItem__text-wrapper'>{title}</div>
    </div>
  )
}