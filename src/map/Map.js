import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet";

import { HiMapPin } from 'react-icons/hi2';

function Map({ mapView, onMarkerClick, onMarkerHover }) {
    const airData = useSelector((state) => state.mapData.airData);
    const [coordinates, setCoordinates] = useState([]);

    const bulgaria = require('./map.json');
    const markers = require('./markers.json');

    const iconMarkupAir1 = renderToStaticMarkup(
        <div className='flex justify-center items-center w-14 h-14 rounded-full relative bottom-10 right-4' style={{ background: "radial-gradient(circle, rgba(47, 255, 1, 0.8), rgba(0, 0, 0, 0))" }}>
            <HiMapPin className='w-8 h-8 bottom-1 text-red-700' />
        </div>
    );

    const iconMarkupAir2 = renderToStaticMarkup(
        <div className='flex justify-center items-center w-14 h-14 rounded-full relative bottom-10 right-4' style={{ background: "radial-gradient(circle, rgba(255, 247, 1, 0.8), rgba(0, 0, 0, 0))" }}>
            <HiMapPin className='w-8 h-8 bottom-1 text-red-700' />
        </div>
    );

    const iconMarkupAir3 = renderToStaticMarkup(
        <div className='flex justify-center items-center w-14 h-14 rounded-full relative bottom-10 right-4' style={{ background: "radial-gradient(circle, rgba(255, 166, 1, 0.8), rgba(0, 0, 0, 0))" }}>
            <HiMapPin className='w-8 h-8 bottom-1 text-red-700' />
        </div>
    );

    const iconMarkupAir4 = renderToStaticMarkup(
        <div className='flex justify-center items-center w-14 h-14 rounded-full relative bottom-10 right-4' style={{ background: "radial-gradient(circle, rgba(255, 93, 1 , 0.8), rgba(0, 0, 0, 0))" }}>
            <HiMapPin className='w-8 h-8 bottom-1 text-red-700' />
        </div>
    );

    const iconMarkupAir5 = renderToStaticMarkup(
        <div className='flex justify-center items-center w-14 h-14 rounded-full relative bottom-10 right-4' style={{ background: "radial-gradient(circle, rgba(255, 1, 1, 0.8), rgba(0, 0, 0, 0))" }}>
            <HiMapPin className='w-8 h-8 bottom-1 text-red-700' />
        </div>
    );

    const customMarkerIconAir1 = divIcon({
        html: iconMarkupAir1
    });

    const customMarkerIconAir2 = divIcon({
        html: iconMarkupAir2
    });

    const customMarkerIconAir3 = divIcon({
        html: iconMarkupAir3
    });

    const customMarkerIconAir4 = divIcon({
        html: iconMarkupAir4
    });

    const customMarkerIconAir5 = divIcon({
        html: iconMarkupAir5
    });

    useEffect(() => {
        let tempCordinates = [];

        bulgaria.features.map((bul) => {
            if (bul.geometry.type === 'MultiPolygon') {
                bul.geometry.coordinates.map((coord) => {
                    tempCordinates.push(coord[0].map((row) => [row[1], row[0]]));
                });
            }
            else {
                tempCordinates.push(bul.geometry.coordinates[0].map((row) => [row[1], row[0]]));
            }
        });

        setCoordinates(tempCordinates);
    }, []);

    return (
        <MapContainer center={[42.7229021, 25.6415769]} zoom={8} scrollWheelZoom={true} style={{ height: 'Calc(100vh - 64px)', width: '100wh', zIndex: 0 }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {coordinates.map((coord) => (
                <Polygon positions={coord} />
            ))}
            {markers[mapView].map((marker) => {
                const cityAir = airData.find(a => a.name === marker.name);
                const cityAirIndex = cityAir ? cityAir.data.list[0].main.aqi : null;

                switch (cityAirIndex) {
                    case 5:
                        return (
                            <Marker position={marker.cordinates} icon={customMarkerIconAir5} eventHandlers={{
                                click: () => onMarkerClick(marker.name),
                            }}>
                            </Marker>
                        );
                    case 4:
                        return (
                            <Marker position={marker.cordinates} icon={customMarkerIconAir4} eventHandlers={{
                                click: () => onMarkerClick(marker.name),
                            }}>
                            </Marker>
                        );
                    case 3:
                        return (
                            <Marker position={marker.cordinates} icon={customMarkerIconAir3} eventHandlers={{
                                click: () => onMarkerClick(marker.name),
                            }}>
                            </Marker>
                        );
                    case 2:
                        return (
                            <Marker position={marker.cordinates} icon={customMarkerIconAir2} eventHandlers={{
                                click: () => onMarkerClick(marker.name),
                            }}>
                            </Marker>
                        );
                    default:
                        return (
                            <Marker position={marker.cordinates} icon={customMarkerIconAir1} eventHandlers={{
                                click: () => onMarkerClick(marker.name),
                                // mouseover: () => onMarkerHover(true, marker.name),
                                // mouseout: () => onMarkerHover(false),
                            }}>
                            </Marker>
                        );
                }
            })}
        </MapContainer>
    );
}

export default Map;
