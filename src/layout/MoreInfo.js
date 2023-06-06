import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from 'react-icons/ai';
import { showMoreInfoView } from '../store/slices/navigationSlice';
import AirPollutionCharts from '../components/AirPollutionCharts';

function MoreInfo() {
    const dispatch = useDispatch();
    const navigation = useSelector((state) => state.navigation);

    const closeMoreInfoView = () => {
        dispatch(showMoreInfoView(false));
    };

    if(navigation.moreInfoView){
        return (
            <div className='absolute w-screen h-screen top-0 left-0 bg-gray-800'>
                <div className="absolute top-6 right-6 text-white text-2xl cursor-pointer" onClick={closeMoreInfoView}>
                    <AiOutlineClose />
                </div>
                <div className="pt-12 px-12 max-md:px-2">
                    <AirPollutionCharts />
                </div>
            </div>
        );
    }
    
    return null;
}

export default MoreInfo;