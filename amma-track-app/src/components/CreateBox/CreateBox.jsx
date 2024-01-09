import { useEffect, useState } from 'react'
import { unsplash } from '../../lib/unsplash'
import { Button } from '../Button/Button'
import './CreateBox.css'

export const CreateBox = ({ type }) => {
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([{ id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }])
  const handleChange = (text) => {
    if (text.trim().length) {
      setTitle(text);
    }
  }
  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const result = await unsplash.photos.getRandom({
  //         collectionIds: ["317099"],
  //         count: 9,
  //       })
  //       if (result && result.response) {
  //         const newImages = result.response;
  //         setImages(newImages)
  //       }
  //       else {
  //         console.log('Failed to get images from unsplash')
  //       }
  //     }
  //     catch (err) {
  //       console.log(err);
  //       setImages([])
  //     }
  //   }
  //   fetchImages()
  // },[])
  return (
    <div className='create-box'>
      <div className='create-box__images'>
        {
          images.map(img => {
            return (
              <div key={img?.id} className='create-box__images-wrapper'>
                <img src={img?.urls?.thumb} alt="" />
              </div>
            )
          })
        }</div>
      <div className="create-box__info">
        <p className='create-box__title'><span>{type}</span> title</p>
        <label>
          <input type="text" value={title} onChange={(e) => handleChange(e.target.value)} />
          <Button>Add {type}</Button>
        </label>
      </div>
    </div>
  )
}
