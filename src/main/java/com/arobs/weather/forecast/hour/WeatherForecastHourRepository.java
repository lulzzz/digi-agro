package com.arobs.weather.forecast.hour;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.arobs.weather.entity.WeatherForecastHour;

import java.util.Date;
import java.util.List;

@Repository
public interface WeatherForecastHourRepository extends JpaRepository<WeatherForecastHour, Long> {

//    @Query("SELECT weatherForecastHour FROM WeatherForecastHour weatherForecastHour " +
//            "WHERE weatherForecastHour.name LIKE :name " +
//            "ORDER BY weatherForecastHour.name ")
//    List<WeatherForecastHour> find(@Param("name") String name);

	@Query("SELECT DISTINCT weatherForecastHour " + 
			"FROM WeatherForecastHour weatherForecastHour " + 
			"LEFT JOIN FETCH weatherForecastHour.forecastItems")
    List<WeatherForecastHour> findAll();
	
	@Query("SELECT DISTINCT weatherForecastHour " + 
			"FROM WeatherForecastHour weatherForecastHour " + 
			"LEFT JOIN FETCH weatherForecastHour.forecastItems " + 
			"WHERE weatherForecastHour.cityId = :locationId")
    List<WeatherForecastHour> find(@Param("locationId") Integer locationId);

	@Query("SELECT DISTINCT weatherForecastHour " + 
			"FROM WeatherForecastHour weatherForecastHour " + 
			"LEFT JOIN FETCH weatherForecastHour.forecastItems forecastItem " + 
			"WHERE YEAR(forecastItem.dt) = :year " +
				"AND MONTH(forecastItem.dt )= :month " + 
				"AND DAY(forecastItem.dt) = :day " + 
				"AND HOUR(forecastItem.dt) = :hour ")
	List<WeatherForecastHour> find(@Param("year") Integer year, @Param("month") Integer month, @Param("day") Integer day, @Param("hour") Integer hour);

	@Query("SELECT DISTINCT weatherForecastHour " + 
			"FROM WeatherForecastHour weatherForecastHour " + 
			"LEFT JOIN FETCH weatherForecastHour.forecastItems forecastItem " + 
			"WHERE weatherForecastHour.cityId = :locationId AND forecastItem.dt BETWEEN :dateFrom AND :dateTo")
	List<WeatherForecastHour> find(@Param("locationId") Integer locationId, @Param("dateFrom") Date dateFrom, @Param("dateTo") Date dateTo);

}

