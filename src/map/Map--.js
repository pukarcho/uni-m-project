import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker, Line } from "react-simple-maps"

function Map({ onMarkerClick }) {
    let maps = require('./map.json');
    const geoUrl = 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';

    const rows = [];
    maps.features.map((map) => {
        map.geometry.coordinates.map((cordGroups) => {
            cordGroups.map((coord, index) => {
                if (map.geometry.type === 'MultiPolygon') {
                    coord.map((coord2, key) => {
                        if (coord.length - 1 > key) {
                            rows.push(
                                <Line
                                    key={rows.length}
                                    from={coord2}
                                    to={coord[key + 1]}
                                    stroke="#F1F1F1"
                                    strokeWidth={0.03}
                                    strokeLinecap="round"
                                />
                            );
                        }
                        else {
                            rows.push(
                                <Line
                                    key={rows.length}
                                    from={coord2}
                                    to={coord[0]}
                                    stroke="#F1F1F1"
                                    strokeWidth={0.03}
                                    strokeLinecap="round"
                                />
                            );
                        }
                    });
                }
                else {
                    if (cordGroups.length - 1 > index) {
                        rows.push(
                            <Line
                                key={rows.length}
                                from={coord}
                                to={cordGroups[index + 1]}
                                stroke="#F1F1F1"
                                strokeWidth={0.03}
                                strokeLinecap="round"
                            />
                        );
                    }
                    else {
                        rows.push(
                            <Line
                                key={rows.length}
                                from={coord}
                                to={cordGroups[0]}
                                stroke="#F1F1F1"
                                strokeWidth={0.03}
                                strokeLinecap="round"
                            />
                        );
                    }
                }
            });
        });
    });

    return (
        <ComposableMap projection="geoMercator" width={1000} height={461}>
            <ZoomableGroup center={[25.6415769, 42.7229021]} zoom={40}>
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography key={geo.rsmKey} geography={geo} />
                        ))
                    }
                </Geographies>
                <Marker coordinates={[25.6108875, 43.0757759]} onClick={onMarkerClick}>
                    <circle r={0.1} fill="#FF5533" />
                </Marker>
                {rows}
            </ZoomableGroup>
        </ComposableMap>
    );
}

export default Map;
