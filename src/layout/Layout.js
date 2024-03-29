import { useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";

import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { BsFillCloudLightningFill } from 'react-icons/bs';
import { MdLanguage } from 'react-icons/md';
import moment from 'moment';

import Map from '../map/Map';
import ViewChange from './ViewChange';
import Drawer from './Drawer';
import Notification from './Notification';
import MoreInfo from './MoreInfo';
import Information from '../components/Information';
import Preloader from './Preloader';

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const languages = [
    { name: 'Bulgarian', key: 'bg' },
    { name: 'English', key: 'en' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Layout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { t, i18n } = useTranslation();

    const [mapView, setMapView] = useState('city');
    const [openNotification, setOpenNotification] = useState({
        open: false,
        data: {}
    });

    const navigation = [
        { name: t('nav_map'), href: '/' },
        { name: t('nav_air_pollution'), href: '/air-pollution' },
    ];

    const handleViewChange = (type) => {
        setMapView(type);
    };

    const handleLanguageChange = (language) => {
        i18n.changeLanguage(language);
        moment.locale(language);
        localStorage.setItem('language', language);
    };

    const onMarkerHover = (show, city) => {
        console.log(show);
        setOpenNotification({
            open: show,
            data: {
                city: city
            }
        });
    };

    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-gray-800">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <BsFillCloudLightningFill className="h-8 w-8 text-blue-500 cursor-pointer" onClick={() => navigate('/')} />
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-4">
                                                {navigation.map((item) => (
                                                    <Link to={item.href} className={classNames(
                                                        location.pathname === item.href
                                                            ? 'bg-gray-900 text-white'
                                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'px-3 py-2 rounded-md text-sm font-medium'
                                                    )}>{item.name}</Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            {/* Language dropdown */}
                                            <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-white text-sm">
                                                        <MdLanguage className="h-6 w-6" aria-hidden="true" />
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        {languages.map((item) => (
                                                            <Menu.Item key={item.key}>
                                                                <span
                                                                    className={classNames(
                                                                        i18n.language === item.key ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                                                    )}
                                                                    onClick={() => handleLanguageChange(item.key)}
                                                                >
                                                                    {item.name}
                                                                </span>
                                                            </Menu.Item>
                                                        ))}
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex items-center space-x-4 md:hidden">
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-white text-sm">
                                                    <MdLanguage className="h-6 w-6" aria-hidden="true" />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {languages.map((item) => (
                                                        <Menu.Item key={item.key}>
                                                            <span
                                                                className={classNames(
                                                                    i18n.language === item.key ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                                                )}
                                                                onClick={() => handleLanguageChange(item.key)}
                                                            >
                                                                {item.name}
                                                            </span>
                                                        </Menu.Item>
                                                    ))}
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="span"
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'block px-3 py-2 rounded-md text-base font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                            onClick={() => navigate(item.href)}
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <main>
                    <Routes>
                        <Route path="/" exact element={<Map mapView={mapView} onMarkerHover={onMarkerHover} />} />
                        <Route path="air-pollution" element={<Information />} />
                    </Routes>
                    {/* <ViewChange handleViewChange={handleViewChange} /> */}
                    <Drawer />
                    <Notification openNotification={openNotification} />
                    <MoreInfo />
                    <Preloader />
                </main>
            </div>
        </>
    )
}

export default Layout;