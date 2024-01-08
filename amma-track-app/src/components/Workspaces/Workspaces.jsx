import './Workspaces.css'
import { Button } from '../Button/Button'
import { WorkspacesItem } from '../WorkspacesItem/WorkspacesItem'
import { add } from '../../redux/slices/workspacesSlice'
import { useDispatch, useSelector } from "react-redux";
import { unsplash } from '../../lib/unsplash';
import { useState, useEffect } from 'react';



export const Workspaces = () => {

  const workspacesList = useSelector((state) => state.workspaces.workspaces)
  const [list, setList] = useState(useSelector((state) => state.workspaces.workspaces))
  useEffect(() => {
    setList(workspacesList)
  }, [workspacesList])
  console.log(workspacesList);
  const loggedUser = useSelector((state) => state.auth.loggedUser)
  const dispatch = useDispatch()
  const [img, setImage] = useState('')

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await unsplash.photos.getRandom({
          collectionIds: ['317099'],
          count: 1
        })

        if (res && res.response) {
          const resImg = res.response
          setImage(resImg.urls.thumb)
        } else {
          console.error('Cant get image from unsplash');
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchImages()
  }, [])


  return (
    <div className="workspaces">
      <div className="workspaces-title">
        <h4>Workspaces</h4>
        <Button onClick={() => { dispatch(add({ img: 'https://images.unsplash.com/photo-1576772852498-1645ee4adfa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NTAxMDl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDQ3MjE0Mjh8&ixlib=rb-4.0.3&q=80&w=200', title: 'test title', userEmail: loggedUser.payload })) }} type="main">+</Button>
      </div>
      {
        list.map(({payload}) => {

          return <WorkspacesItem key={1} img={payload.img} title={payload.title} />
        })
      }
    </div>


  )
}