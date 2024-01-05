import './Header.css'
import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom'

import { Button } from '../Button/Button'
import  user from '../../images/user.jpg'
export const Header = ({ logged }) => {
  return (
    <div className='header'>
      <div className="container">
        <div className="header-wrapper">
          <Link className='header-logo' to='/'>
            <img src={logo} alt="logo" />
            <p >AMMA-Track</p>
          </Link>
          {logged ? <>
            <Button className="create-btn" type='create'>
              Create
            </Button>
            <div className='header-userImg'>
              <img src={user} alt="" />
            </div>
          </> :
            <div className='header-buttons'>
              <Button type='main'>
                <Link to='/login'>Login</Link>
              </Button>
              <Button type='secondary'><Link to='/sign-up'>Sign-up</Link></Button>
            </div>
          }

        </div>

      </div>
    </div>
  )
}