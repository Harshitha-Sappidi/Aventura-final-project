import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './WeatherTab.scss';

interface WeatherTabProps {
    coordinates: string;
}

interface WeatherData {
    date: string;
    temperature: number;
    description: string;
    icon: string;
    feelsLike: number;
    windSpeed: number;
    humidity: number;
    pressure: number;
}

const WeatherTab: React.FC<WeatherTabProps> = ({ coordinates }) => {
    const { t } = useTranslation();
    const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const [lat, lon] = coordinates.split(',').map(coord => coord.trim());
                const apiKey = '71b55da7fe979daa7172906a60316f9b';
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
                    params: {
                        lat: lat,
                        lon: lon,
                        cnt: 40,
                        units: 'metric',
                        appid: apiKey
                    }
                });

                // Filter response to get one entry per day
                const filteredResponse = response.data.list.filter((_: any, index: number) => index % 8 === 0);

                const data = filteredResponse.map((item: any) => ({
                    date: item.dt_txt,
                    temperature: item.main.temp,
                    description: item.weather[0].description,
                    icon: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`,
                    feelsLike: item.main.feels_like,
                    windSpeed: item.wind.speed,
                    humidity: item.main.humidity,
                    pressure: item.main.pressure
                }));

                setWeatherData(data);
            } catch (err) {
                setError(t('fetch_weather_error'));
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [coordinates, t]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box className="weather-tab">
            <Box className="current-weather">
                <Typography variant="h4">{t('current_weather')}</Typography>
                {weatherData.length > 0 && (
                    <>
                        <img src={weatherData[0].icon} alt={weatherData[0].description} />
                        <Typography variant="h5">{weatherData[0].temperature}°C</Typography>
                        <Typography variant="body1">{weatherData[0].description}</Typography>
                        <Typography variant="body2">{t('feels_like')} {weatherData[0].feelsLike}°C</Typography>
                        <Typography variant="body2">{t('wind')}: {weatherData[0].windSpeed} {t('wind_speed_unit')}</Typography>
                        <Typography variant="body2">{t('humidity')}: {weatherData[0].humidity}%</Typography>
                        <Typography variant="body2">{t('pressure')}: {weatherData[0].pressure} hPa</Typography>
                    </>
                )}
            </Box>
            <Box className="forecast-container">
                <Typography variant="h5" className="forecast-title">{t('five_day_forecast')}</Typography>
                <Grid container spacing={2}>
                    {weatherData.map((day, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                            <Paper className="forecast-day">
                                <Typography variant="body2">{new Date(day.date).toLocaleDateString()}</Typography>
                                <img src={day.icon} alt={day.description} />
                                <Typography>{day.temperature}°C</Typography>
                                <Typography variant="body2">{day.description}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default WeatherTab;
