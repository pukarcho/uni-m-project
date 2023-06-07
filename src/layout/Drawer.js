import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { selectCity, showDrawerView, selectCityCoord } from '../store/slices/navigationSlice';

import CurrentWeather from '../components/CurrentWeather';
import { AiOutlineClose } from 'react-icons/ai';

function Drawer() {
  const dispatch = useDispatch();
  const navigation = useSelector((state) => state.navigation);

  const closeDrawer = () => {
    dispatch(selectCity(null));
    dispatch(selectCityCoord([]));
    dispatch(showDrawerView(false));
  };

  return (
    <Transition.Root show={navigation.drawerView} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeDrawer}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <div className="absolute top-5 right-5 text-white text-2xl cursor-pointer" onClick={closeDrawer}>
                    <AiOutlineClose />
                  </div>
                  <div className="flex h-full flex-col bg-gray-800 py-6 shadow-xl text-white">
                    {/* <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-lg font-medium text-gray-900">Panel title</Dialog.Title>
                    </div> */}
                    <div className="relative mt-6 flex-1 px-8">

                      <CurrentWeather />

                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Drawer;