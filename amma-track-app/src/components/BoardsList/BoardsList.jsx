import './BoardsList.css'
import { BoardItem } from '../BoardItem/BoardItem'
import person from '../../images/person-svgrepo-com.svg'
const Boards = [{ id: 1, img: 'https://fastly.picsum.photos/id/909/400/300.jpg?hmac=nCqtZVRm7LwKwboLyn1TEnVZ246zLRfT8GYomM90qOo', title: 'My board 1' }, { id: 2, img: 'https://fastly.picsum.photos/id/936/400/300.jpg?hmac=VoQ4l3Em2B4slTalHcBRok55mIwHxgM5B3pH0x1UTGA', title: 'My board 2' }, { id: 3, img: 'https://fastly.picsum.photos/id/363/400/300.jpg?hmac=IgZfCbcHqRWsVrwPbpLUbx5WXUDvBK4nrW7lVqOngb4', title: 'My board 3' }, { id: 4, img: 'https://fastly.picsum.photos/id/1073/400/300.jpg?hmac=ZdJp4btme4xCGgSv2RS8ZmR5ht4Ky3wYyHl8kExsH9o', title: 'My board 4' }, { id: 5, img: 'https://fastly.picsum.photos/id/301/400/300.jpg?hmac=L0K7Re58MztPUju15VCl3Jowll_8W-rYtzAP5mKXrjQ', title: 'My board 5' }]
export const BoardsList = () => {
  return (
    <div className="boardsList">
      <div className="workspace-box">
        <img src="https://fastly.picsum.photos/id/977/200/200.jpg?hmac=bhLVu-kBB_plx-DkWXz4gYn-ViPAhDjTtGFwu143FiA" alt="workspace img" />
        <p>My Task</p>
      </div>
      <div className='boardsList-text'>
        <img src={person} alt="person" />
        <p>Your boards</p>
      </div>
      <div className="boardsList-items">
        {Boards.map(item => <BoardItem key={item.id} {...item} />)}
        <div className='boardsList-items__create'>
          Create new board
        </div>
      </div>
    </div>
  )
}