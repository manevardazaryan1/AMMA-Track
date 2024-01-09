import { useEffect, useState } from 'react'
import { unsplash } from '../../lib/unsplash'
import { Button } from '../Button/Button'
import './CreateBox.css'
import { ImgWrapper } from './ImgWrapper/ImgWrapper'
import { useDispatch, useSelector } from 'react-redux'

import { addWorkspace, creationBoxHandle } from '../../redux/slices/workspacesSlice'
export const CreateBox = ({ type }) => {
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }])
  const selectedImg = useSelector((state) => state.workspaces.selectedImg)
  const dispatch = useDispatch();
  const handleAdd = () => {
    const newWorkspace = {
      title: 'title',
      img: {
        thumb: selectedImg.thumb,
        bigImg: selectedImg.bigImg,
      },
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
          count: 2,
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
