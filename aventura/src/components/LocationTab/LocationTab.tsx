import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './LocationTab.scss';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhcmFua3VtYXIxOTk2IiwiYSI6ImNsemNteHowMzBjaW8yaXM4bDdxNm1sMjQifQ.35teyZGZlkbOO6koHKVRdQ';

interface LocationTabProps {
    coordinates: string;
}

const LocationTab: React.FC<LocationTabProps> = ({ coordinates }) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    const [lat, lng] = coordinates.split(',').map(coord => parseFloat(coord));

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current!,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: 14,
            interactive: true
        });

        new mapboxgl.Marker({color: 'red'}).setLngLat([lng, lat]).addTo(map);  

        map.addControl(new mapboxgl.NavigationControl());

        return () => map.remove();
    }, [lng, lat]);

    return <div ref={mapContainerRef} className="map-container" />;
};

export default LocationTab;
