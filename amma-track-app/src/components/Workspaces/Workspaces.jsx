import './Workspaces.css'
import { Button } from '../Button/Button'
import { WorkspacesItem } from '../WorkspacesItem/WorkspacesItem'
const workspacesList = [{ id: 1, img: "https://fastly.picsum.photos/id/977/200/200.jpg?hmac=bhLVu-kBB_plx-DkWXz4gYn-ViPAhDjTtGFwu143FiA", title: 'My Task' }, { id: 2, img: "https://fastly.picsum.photos/id/719/200/200.jpg?hmac=WkMnZveCKylVzw33Ui-BNFbah8IQWImYq68wVKznlEo", title: 'Trello Clone' }, { id: 3, img: "https://fastly.picsum.photos/id/432/200/200.jpg?hmac=b4-kxXh_oTpvCBH9hueJurvHDdhy0eYNNba-mO9Q8bU", title: 'Another task' }]

export const Workspaces = () => {

  return (
    <div className="workspaces">
      <div className="workspaces-title">
        <h4>Workspaces</h4>
        <Button type="main">+</Button>
      </div>
      {
        workspacesList.map(({ img, title, id }) => {
          return <WorkspacesItem key={id} img={img} title={title} />
        })
      }
    </div>


  )
}