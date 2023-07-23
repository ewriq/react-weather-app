package module

import (
	"net/http"
	"fmt"
	"encoding/json"
)

const key = "token"

type Main struct {
	Temperature float64 `json:"temp"`
	Pressure    int     `json:"pressure"`
	Humidity    int     `json:"humidity"`
}

type WeatherInfo struct {
	ID          int    `json:"id"`
	Main        string `json:"main"`
	Description string `json:"description"`
	Icon        string `json:"icon"`
}

type WeatherData struct {
	Name       string `json:"name"`
	Main       Main   `json:"main"`
	Visibility int    `json:"visibility"`
	Weather []WeatherInfo `json:"weather"`
}

func Get(seehir string) (*WeatherData, error) {
	url := fmt.Sprintf("http://api.openweathermap.org/data/2.5/weather?q=%s,tr&appid=%s&units=metric", seehir, key)
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var data WeatherData
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		return nil, err
	}

	return &data, nil
}
