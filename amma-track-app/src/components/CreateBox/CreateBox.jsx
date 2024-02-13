import './CreateBox.css'
import { useEffect, useState } from 'react'
import { unsplash } from '../../lib/unsplash'
import { collection, addDoc } from 'firebase/firestore';
import { Button } from '../Button/Button'
import { ImgWrapper } from './ImgWrapper/ImgWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { addWorkspace } from
  '../../redux/slices/workspacesSlice'
import { addBoard, selectBoardImg } from '../../redux/slices/boardsSlice'
import { db } from '../../config/firebaseConfig';

export const CreateBox = ({ type, handleBox }) => {
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([])
  const selectedWorkspaceImg = useSelector((state) => state.workspaces.selectedImg.thumb)
  const selectedBoardImg = useSelector(state => state.boards.selectedImg)
  const activeWorkspace = useSelector(state => state.workspaces.workspaces.find(workspace => workspace.active))
  const currentUser = useSelector((state) => state.auth.loggedUser)
  const dispatch = useDispatch();

  const handleAddClick = async () => {
    switch (type) {
      case 'workspace':
        const workspacesCollection = collection(db, 'workspaces')
        const workspaceId = new Date().toISOString()
        await addDoc(workspacesCollection, {id: workspaceId, title, img: {thumb: selectedWorkspaceImg}, user: currentUser,})

        const newWorkspace = {
          id: workspaceId,
          title,
          img: {
            thumb: selectedWorkspaceImg,
          },
          user: currentUser,
          active:true,
        };
        if (title.trim().length && selectedWorkspaceImg) {
          dispatch(addWorkspace(newWorkspace));
          dispatch(handleBox({ val: false }));
          setTitle('');
          dispatch(selectBoardImg({ thumb: ''}))
        }
        return
      case 'board':
        const boardsCollection = collection(db, 'boards')
        const boardId = new Date().toISOString()
        await addDoc(boardsCollection, {id: boardId, title, img: selectedBoardImg, workspace: activeWorkspace,})

        const newBoard = {
          id: boardId,
          title,
          img: selectedBoardImg,
          workspace: activeWorkspace,
        };
        if (title.trim().length && selectedBoardImg) {
          dispatch(addBoard(newBoard));
          dispatch(handleBox({ val: false }));
          setTitle('');
          dispatch(selectBoardImg({ thumb: '' }))
        }
        return
    }

  }
  const handleEnter = event => {
    if (event.key === 'Enter') {
      switch (type) {
        case 'workspace':
          const newWorkspace = {
            title,
            img: {
              thumb: selectedWorkspaceImg,
            },
            user: currentUser,
            active:true,
          };
          if (title.trim().length && selectedWorkspaceImg) {
            dispatch(addWorkspace(newWorkspace));
            dispatch(handleBox({ val: false }));
            setTitle('');
            dispatch(selectBoardImg({ thumb: ''}))
          }
          return
        case 'board':
          const newBoard = {
            title,
            img: selectedBoardImg,

            workspace: activeWorkspace,
          };
          if (title.trim().length && selectedBoardImg) {
            dispatch(addBoard(newBoard));
            dispatch(handleBox({ val: false }));
            setTitle('');
            dispatch(selectBoardImg({ regular: '', raw: '' }))
          }
          return
      }
    }
  };
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        })
        if (result && result.response) {
          const newImages = result.response;
          setImages(newImages)
        }
        else {
          console.log('Failed to get images from unsplash')
        }
      }
      catch (err) {
        console.log(err);
        setImages([])
      }
    }
    
    fetchImages()
  }, [])

  return (
    <div className={`create-box ${type}`}>
      <p className='create-box__type'>Create {type}</p>
      <div onClick={() => dispatch(handleBox({ vale: false }))} className="create-box__btn"><Button>X</Button></div>
      <div className='create-box__images'>
        {
          images.map(img => {
            return (
              <ImgWrapper type={type} key={img.id} urls={img?.urls} />
            )
          })
        }
      </div>
      <div className="create-box__info">
        <p className='create-box__title'><span>{type}</span> title</p>
        <label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={handleEnter} />
          <Button disabled={!(title.length && (selectedWorkspaceImg || selectedBoardImg))} type={'secondary'} onClick={handleAddClick} >Add {type}</Button>
        </label>
      </div>
    </div>
  )
}
