import './BoardItem.css'
export const BoardItem = ({ img, title }) => {
  console.log('img',img);
  return (
    <div style={{ backgroundImage: `url(${img.thumb})` }} className="boardItem">
      <div className='boardItem__text-wrapper'>{title}</div>
    </div>
  )
}