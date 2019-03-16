import { Injectable } from '@angular/core';
import Cookies from 'cookies-ts';

@Injectable({
  providedIn: 'root'
})
export class CookiesService extends Cookies {
}
