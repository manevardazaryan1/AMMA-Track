
import { useDispatch } from 'react-redux';
import { selectImg } from '../../../redux/slices/workspacesSlice'
import { useState } from 'react';
import { useSelector } from 'react-redux';
export const ImgWrapper = ({ urls }) => {
  const [selectedImg, setSelectedImg] = useState(false)
  const dispatch = useDispatch()
  const activeImg = useSelector((state) => state.workspaces.selectedImg)

  return (
    <div onClick={() => dispatch(selectImg({ urls }))} className={`create-box__images-wrapper ${activeImg?.thumb === urls?.thumb ? 'active' : ''}`}>
      <img src={urls?.thumb ?? ''} alt="pic" />
    </div>
  )
}
