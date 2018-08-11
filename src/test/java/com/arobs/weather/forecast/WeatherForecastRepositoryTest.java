package com.arobs.weather.forecast;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.jdto.DTOBinder;
import org.jdto.DTOBinderFactory;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.autoconfigure.web.client.AutoConfigureWebClient;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

import com.arobs.entity.WeatherForecast;
import com.arobs.entity.WeatherLocation;
import com.arobs.scheduler.WeatherForecastRepository;
import com.arobs.scheduler.weather.WeatherSnapshotJson;
import com.arobs.scheduler.weather.WeatherLocationJson;
import com.arobs.scheduler.weather.forecast.hour.WeatherHourForecast;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@AutoConfigureWebClient 
public class WeatherForecastRepositoryTest {
	private static final Logger logger = LoggerFactory.getLogger(WeatherForecastRepositoryTest.class); 

	@Autowired
	private DTOBinder binder;

	@Autowired
	private TestEntityManager entityManager;

	@Autowired
	public WeatherForecastRepository repository;
	
	@Test
	public void testEntityManager() {
		assertNotNull(entityManager);
	}
	
	@Test
	public void testFindAll() {
		List<WeatherForecast> weatherForecasts = repository.findAll();
		assertNotNull(weatherForecasts);
	}
	
	@Test
	public void testFindOne() {
		Long id = 617077L;
		WeatherForecast location = repository.findOne(id);
		assertEquals("Raionul Edineţ", location.getName());
	}
	
	@Test
//	@Ignore
	public void testDTOBinder() throws JsonParseException, JsonMappingException, IOException {
		Resource resource = new ClassPathResource("location.test.json");
		File file = resource.getFile(); 
		ObjectMapper objectMapper = new ObjectMapper();
		CollectionType listType = objectMapper.getTypeFactory().constructCollectionType(List.class, WeatherLocationJson.class);
		List<WeatherLocationJson> weatherLocations = objectMapper.readValue(file,  listType);
		DTOBinder binder = DTOBinderFactory.getBinder();
		List<WeatherLocation> locations = binder.bindFromBusinessObjectList(WeatherLocation.class, weatherLocations);
		assertNotNull(locations);
		int count = 0;
//		for (WeatherLocation location : locations) {
//			if (location.getCountryCode().equalsIgnoreCase("md") || location.getCountryCode().equalsIgnoreCase("ro")) {
//				repository.save(location);
//				count++;
//			}
//		}
		logger.info("Au fost salvate {} articole", count);
	}
	
	@Test
//	@Ignore
	public void testWeatherHourForecast() throws JsonParseException, JsonMappingException, IOException {
		Resource resource = new ClassPathResource("forecast.hour.json");
		File file = resource.getFile(); 
		ObjectMapper objectMapper = new ObjectMapper();
//		CollectionType listType = objectMapper.getTypeFactory().constructCollectionType(List.class, WeatherHourForecast.class);
//		List<WeatherHourForecast> weatherHourForecasts = objectMapper.readValue(file,  listType);
		WeatherHourForecast weatherHourForecasts = objectMapper.readValue(file,  WeatherHourForecast.class);
		DTOBinder binder = DTOBinderFactory.getBinder();
		WeatherHourForecast hourForecasts = binder.bindFromBusinessObject(WeatherHourForecast.class, weatherHourForecasts);
		assertNotNull(hourForecasts);
	}
	
}
