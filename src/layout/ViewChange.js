import { BsBuilding } from 'react-icons/bs';
import { IoSnow } from 'react-icons/io5';
import { MdOutlineBeachAccess } from 'react-icons/md';

function ViewChange({ handleViewChange }) {
    return (
        <>
            <div className="absolute top-0 h-screen flex items-center">
                <div className='bg-gray-800 text-white'>
                    <BsBuilding className="h-7 w-7 m-4 hover:cursor-pointer" aria-hidden="true" onClick={() => handleViewChange('city')} />
                    <IoSnow className="h-7 w-7 m-4 hover:cursor-pointer" aria-hidden="true" onClick={() => handleViewChange('winter')} />
                    <MdOutlineBeachAccess className="h-7 w-7 m-4 hover:cursor-pointer" aria-hidden="true" onClick={() => handleViewChange('summer')} />
                </div>
            </div>
        </>
    )
}

export default ViewChange;