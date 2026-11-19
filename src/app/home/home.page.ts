
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';

import { WeatherService } from '../services/weather';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent
  ]
})

export class HomePage implements OnInit {

  weatherData: any[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.loadWeather();
  }

  loadWeather() {

    this.weatherService.getWeather().subscribe((data) => {

      const times = data.hourly.time;
      const temps = data.hourly.temperature_2m;

      this.weatherData = times.map((time: string, index: number) => ({

        time: new Date(time).toLocaleString('id-ID', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }) + ' WIB',

        temp: temps[index],

        icon: this.getWeatherIcon(temps[index])

      }));

    });

  }

  getWeatherIcon(temp: number): string {

    if (temp >= 33) {
      return '☀️';
    }
    else if (temp >= 30) {
      return '🌤️';
    }
    else if (temp >= 27) {
      return '⛅';
    }
    else if (temp >= 24) {
      return '☁️';
    }
    else {
      return '🌧️';
    }

  }

}
