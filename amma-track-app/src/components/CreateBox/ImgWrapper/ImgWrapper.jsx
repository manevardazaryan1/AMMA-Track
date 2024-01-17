
import { useDispatch } from 'react-redux';
import { selectWorkspaceImg } from '../../../redux/slices/workspacesSlice'
import { selectBoardImg } from '../../../redux/slices/boardsSlice'

import { useSelector } from 'react-redux';
export const ImgWrapper = ({ type, urls }) => {
  const dispatch = useDispatch()
  const activeWorkspaceImg = useSelector((state) => state.workspaces.selectedImg)
  const activeBoardImg = useSelector((state) => state.boards.selectedImg)
  const activeImg = type === 'workspace' ? activeWorkspaceImg : activeBoardImg;
  const handleImgSelect = (obj) => {
    console.log(obj);
    switch (type) {
      case 'workspace': {
        dispatch(selectWorkspaceImg(obj))
        return
      }
      case 'board': {
        dispatch(selectBoardImg(obj))
        return
      }
    }
  }

  return (
    <div onClick={() => handleImgSelect(urls)} className={`create-box__images-wrapper ${activeImg?.thumb === urls?.thumb || activeImg?.thumb === urls?.regular ? 'active' : ''}`}>
      <img src={urls?.thumb ?? ''} alt="pic" />
    </div>
  )
}
