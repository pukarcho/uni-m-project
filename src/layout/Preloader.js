import { useSelector } from 'react-redux';

import { BsFillCloudLightningFill } from 'react-icons/bs';

function Preloader() {
    const navigation = useSelector((state) => state.navigation);

    if(navigation.preloaderView){
        return (
            <div className='absolute w-screen h-screen left-0 top-0 bg-gray-800 flex justify-center items-center z-[9999]'>
                <BsFillCloudLightningFill className='text-white text-6xl animate-pulse' />
            </div>
        );
    }

    return null;
}

export default Preloader;