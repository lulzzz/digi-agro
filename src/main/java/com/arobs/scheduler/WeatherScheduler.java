package com.arobs.scheduler;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.jdto.DTOBinder;
import org.jdto.DTOBinderFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.arobs.entity.WeatherLocation;
import com.arobs.model.WeatherModel;
import com.arobs.service.WeatherService;
import com.arobs.weather.location.WeatherLocationJson;
import com.arobs.weather.snapshot.WeatherSnapshotJson;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;

@Component
public class WeatherScheduler {
	private static final Logger logger = LoggerFactory.getLogger(WeatherScheduler.class);
	
	@Value("${weather.url}")
	private String weatherUrl;
	
	@Value("${openweather.url}")
	private String openWeatherUrl;
	
	@Value("${weather.lat}")
	private String weatherLat;
	
	@Value("${weather.lon}")
	private String weatherLon;
	
	@Value("${weather.appid}")
	private String weatherAppid;
	
	@Value("${weather.units}")
	private String weatherUnits;
	
	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private WeatherService weatherService;  
	
	@Autowired
	private WeatherLocationService weatherLocationService;  
	
	@Autowired
	private WeatherForecastService weatherForecastService;  
	
//	@Scheduled(cron = "${cron.weather}")
	public void readWeather() {
		String url = String.format(weatherUrl, Double.valueOf(weatherLat), Double.valueOf(weatherLon), weatherAppid, weatherUnits);
		logger.info("Este ora: {}, URL: {}", new Date(), url);
		RestTemplate restTemplate = new RestTemplate();
		WeatherSnapshotJson weather = restTemplate.getForObject(url, WeatherSnapshotJson.class);
		WeatherModel weatherModel = WeatherModel.buildWeatherModel(weather);
		weatherService.save(weatherModel);
        logger.info(weather.toString());
	}
	
	@Scheduled(cron = "${cron.weather.forecast}")
	public void readWeatherForecast() {
		List<WeatherLocation> weatherLocations = weatherLocationService.findAllMdRo();
		ObjectMapper objectMapper = new ObjectMapper();
		List<WeatherModel> weatherModels = new ArrayList<>();
		for (WeatherLocation weatreLocation : weatherLocations) {
			String url = openWeatherUrl + "?" + "id=" + weatreLocation.getId() + "&appid=" + weatherAppid;
			WeatherSnapshotJson weather = restTemplate.getForObject(url, WeatherSnapshotJson.class);
			
			
			CollectionType listType = objectMapper.getTypeFactory().constructCollectionType(List.class, WeatherLocationJson.class);
//			List<WeatherLocationJson> weatherLocations = objectMapper.readValue(file,  listType);
			DTOBinder binder = DTOBinderFactory.getBinder();
			List<WeatherLocation> locations = binder.bindFromBusinessObjectList(WeatherLocation.class, weatherLocations);
			
			
			
			
			WeatherModel weatherModel = WeatherModel.buildWeatherModel(weather);
			weatherModels.add(weatherModel);
		}
//		weatherForecastService.getRepository().save((Iterable<WeatherModel>) weatherModels);
	}
}
