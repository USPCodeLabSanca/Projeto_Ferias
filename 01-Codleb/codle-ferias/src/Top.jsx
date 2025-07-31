import logo from '../assets/images/logo.png';
import refresh from "../assets/images/ec339611d269199fb90173724581cd4a4d4f1b15.png";

function Top ()
{
    return (
        <div className="row-span-1 flex justify-between items-start mx-4 md:mx-10">
            <button className="border border-white text-white rounded flex justify-center items-center w-8 h-8 md:w-10 md:h-10 md:text-xl md:border-2 hover:scale-[1.1] duration-500 cursor-pointer">?</button>
            <div className='flex justify-center items-end'>
                <img src={logo} alt="" className="h-16 hover:scale-[1.20] duration-700"/>
                <h1 className="text-4xl md:text-5xl text-white mb-1">CODLE</h1>
            </div>
            <button className="border border-white text-white rounded flex justify-center items-center w-8 h-8 md:w-10 md:h-10 md:text-xl md:border-2 hover:scale-[1.1] duration-500 cursor-pointer">
                <img src={refresh} alt="" className='h-6 md:h-8' />
            </button>
        </div>
    )
}
export default Top