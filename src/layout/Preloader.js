import { BsFillCloudLightningFill } from 'react-icons/bs';

function Preloader() {
        return (
            <div className='absolute w-screen h-screen bg-gray-800 flex justify-center items-center'>
                <BsFillCloudLightningFill className='text-white text-9xl animate-pulse' />
            </div>
        );
}

export default Preloader;