package com.arobs.scheduler.weather;

import java.util.Date;
import java.util.List;

import com.arobs.scheduler.weather.forecast.Clouds;
import com.arobs.scheduler.weather.forecast.Coord;
import com.arobs.scheduler.weather.forecast.Main;
import com.arobs.scheduler.weather.forecast.Sys;
import com.arobs.scheduler.weather.forecast.Weather;
import com.arobs.scheduler.weather.forecast.Wind;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({"id", "name", "cod", "dt", "base", "visibility", "coord", "weather", "main", "wind", "clouds", "sys"})
public class WeatherForecastJson {
	@JsonProperty("id")
	private Integer id;
	@JsonProperty("name")
	private String name;
	@JsonProperty("cod")
	private Integer cod;
	@JsonProperty("dt")
	private Integer dt;
	@JsonProperty("base")
	private String base;
	@JsonProperty("visibility")
	private Integer visibility;
	
	@JsonProperty("coord")
	private Coord coord;
	@JsonProperty("weather")
	private List<Weather> weather = null;
	@JsonProperty("main")
	private Main main;
	@JsonProperty("wind")
	private Wind wind;
	@JsonProperty("clouds")
	private Clouds clouds;
	@JsonProperty("sys")
	private Sys sys;

	@JsonProperty("id")
	public Integer getId() {
		return id;
	}

	@JsonProperty("id")
	public void setId(Integer id) {
		this.id = id;
	}

	@JsonProperty("name")
	public String getName() {
		return name;
	}

	@JsonProperty("name")
	public void setName(String name) {
		this.name = name;
	}

	@JsonProperty("cod")
	public Integer getCod() {
		return cod;
	}

	@JsonProperty("cod")
	public void setCod(Integer cod) {
		this.cod = cod;
	}

	@JsonProperty("dt")
	public Date getDt() {
		return new Date(dt * 1000L);
	}

	@JsonProperty("dt")
	public void setDt(Integer dt) {
		this.dt = dt;
	}

	@JsonProperty("base")
	public String getBase() {
		return base;
	}

	@JsonProperty("base")
	public void setBase(String base) {
		this.base = base;
	}

	@JsonProperty("visibility")
	public Integer getVisibility() {
		return visibility;
	}

	@JsonProperty("visibility")
	public void setVisibility(Integer visibility) {
		this.visibility = visibility;
	}

	@JsonProperty("coord")
	public Coord getCoord() {
		return coord;
	}

	@JsonProperty("coord")
	public void setCoord(Coord coord) {
		this.coord = coord;
	}

	@JsonProperty("weather")
	public List<Weather> getWeather() {
		return weather;
	}

	@JsonProperty("weather")
	public void setWeather(List<Weather> weather) {
		this.weather = weather;
	}

	@JsonProperty("main")
	public Main getMain() {
		return main;
	}

	@JsonProperty("main")
	public void setMain(Main main) {
		this.main = main;
	}

	@JsonProperty("wind")
	public Wind getWind() {
		return wind;
	}

	@JsonProperty("wind")
	public void setWind(Wind wind) {
		this.wind = wind;
	}

	@JsonProperty("clouds")
	public Clouds getClouds() {
		return clouds;
	}

	@JsonProperty("clouds")
	public void setClouds(Clouds clouds) {
		this.clouds = clouds;
	}

	@JsonProperty("sys")
	public Sys getSys() {
		return sys;
	}

	@JsonProperty("sys")
	public void setSys(Sys sys) {
		this.sys = sys;
	}

}
