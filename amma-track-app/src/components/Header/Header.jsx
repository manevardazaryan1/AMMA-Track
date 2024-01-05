import './Header.css'
import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom'
import { Button } from '../Button/Button'
export const Header = () => {
  return (
    <div className='header'>
      <div className="container">
        <div className="header-wrapper">
          <Link to='/'>
            <img src={logo} alt="logo" />
            <p >AMMA-Track</p>
          </Link>
          <div className='header-buttons'>
            <Button type='main'>
              <Link to='/login'>Login</Link>
            </Button>
            <Button type='secondary'><Link to='/sign-up'>Sign-up</Link></Button>
          </div>
        </div>

      </div>
    </div>
  )
}