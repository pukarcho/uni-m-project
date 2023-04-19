import { BsBuilding } from 'react-icons/bs';
import { IoSnow } from 'react-icons/io5';
import { MdOutlineBeachAccess } from 'react-icons/md';

function Notification({ openNotification }) {
    if(openNotification.open){
        return (
            <div className='absolute bottom-6 right-6 w-96 h-52 bg-gray-800 p-3 text-white'>
                <h2>{openNotification.data.city}</h2>
                <div className='flex justify-between items-center'>
                    <span>SO2</span>
                    <div className='flex h-3 space-x-1'>
                        <div className='w-12 h-full rounded-l bg-slate-100'></div>
                        <div className='w-12 h-full bg-slate-100'></div>
                        <div className='w-12 h-full bg-slate-100'></div>
                        <div className='w-12 h-full bg-slate-100'></div>
                        <div className='w-12 h-full rounded-r bg-slate-100'></div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return null;
    }
}

export default Notification;