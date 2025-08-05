import logo from '../assets/images/logo.png';
import learn from '../assets/images/Learn.png';
import reload from '../assets/images/Reload.png';

function Header() {
  return (
    <div className='flex items-center justify-between px-160'>
      <img
          src={learn}
          alt="Learn"
          className="cursor-pointer"
          
        />
      <Logo />
      <img
          src={reload}
          alt="Reload"
          className="cursor-pointer"
          onClick={() => {window.location.reload()}}
        />
    </div>
  )
}

function Logo() {
  return (
    <div className="flex items-center justify-center">
      <img
        src={logo}
        alt="Codlab Logo"
        className="mt-[15px] h-[80px]"
      />
      <h1 className="text-[48px] h-[41px] w-[176px] font-black font-montserrat text-white">
        CODLE
      </h1>
    </div>
  )
}

export default Header;