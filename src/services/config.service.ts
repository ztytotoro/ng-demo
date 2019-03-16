import { Injectable } from '@angular/core';
import { API_URL, DEFAULT_LOCALE } from 'src/configs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  API_URL = API_URL;
  DEFAULT_LOCALE = DEFAULT_LOCALE;
}
