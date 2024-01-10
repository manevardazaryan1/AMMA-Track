import './CreateBox.css'
import { useEffect, useState } from 'react'
import { unsplash } from '../../lib/unsplash'
import { Button } from '../Button/Button'
import { ImgWrapper } from './ImgWrapper/ImgWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { addWorkspace, creationBoxHandle } from '../../redux/slices/workspacesSlice'
export const CreateBox = ({ type }) => {
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([])
  const selectedImg = useSelector((state) => state.workspaces.selectedImg)
  const currentUser = useSelector((state) => state.auth.loggedUser)
  console.log(currentUser);
  const dispatch = useDispatch();
  const handleAdd = () => {
    const newWorkspace = {
      title,
      img: {
        thumb: selectedImg.thumb,
      },
      user: currentUser,
    };
    if (title.trim().length) {
      dispatch(addWorkspace(newWorkspace));
      dispatch(creationBoxHandle({ val: false }));
      setTitle('');
    }

  }
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
    <div className='create-box'>
      <p className='create-box__type'>Create {type}</p>
      <div onClick={()=>dispatch(creationBoxHandle({ vale: false }))} className="create-box__btn"><Button>X</Button></div>
      <div className='create-box__images'>
        {
          images.map(img => {
            return (
              <ImgWrapper key={img.id} urls={img?.urls} />
            )
          })
        }
      </div>
      <div className="create-box__info">
        <p className='create-box__title'><span>{type}</span> title</p>
        <label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Button disabled={!title.length} type={'secondary'} onClick={handleAdd} >Add {type}</Button>
        </label>
      </div>
    </div>
  )
}
