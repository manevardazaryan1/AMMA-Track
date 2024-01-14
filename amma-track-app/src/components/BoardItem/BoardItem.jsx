import './BoardItem.css'
import { useNavigate } from 'react-router-dom';

export const BoardItem = ({ img, title }) => {
  const navigation = useNavigate()
  const handleClick = () => {
    navigation(`/workspaces/board`);
  };
  return (
    <div style={{ backgroundImage: `url(${img.thumb})` }} className="boardItem" onClick={handleClick}>
      <div className='boardItem__text-wrapper'>{title}</div>
    </div>
  )
}