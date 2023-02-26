import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet";

import { HiMapPin } from 'react-icons/hi2';

function Map({ mapView, onMarkerClick }) {
    const markerRef = useRef();
    const [coordinates, setCoordinates] = useState([]);

    const bulgaria = require('./map.json');
    const markers = require('./markers.json');

    const iconMarkup = renderToStaticMarkup(
        <HiMapPin className='relative w-8 h-8 bottom-5 right-3 text-red-700' />
    );

    const customMarkerIcon = divIcon({
        html: iconMarkup
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
        <MapContainer center={[42.7229021, 25.6415769]} zoom={8} scrollWheelZoom={false} style={{ height: 'Calc(100vh - 64px)', width: '100wh', zIndex: 0 }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {coordinates.map((coord) => (
                <Polygon positions={coord} />
            ))}
            {markers[mapView].map((marker) => (
                <Marker position={marker.cordinates} icon={customMarkerIcon} ref={markerRef} eventHandlers={{
                    click: () => onMarkerClick(marker.name),
                    mouseover: () => {
                        if (markerRef) markerRef.current.openPopup();
                    },
                    mouseout: () => {
                        if (markerRef) markerRef.current.closePopup();
                    }
                }}>
                    <Popup>
                        {marker.name}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default Map;
