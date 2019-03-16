import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import { NzI18nService } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import zh from '@angular/common/locales/zh';
import { en_US as ng_en, zh_CN as ng_zh } from 'ng-zorro-antd';
import { en_US, zh_CN, LocaleType } from '../assets/i18n';
import { CookiesService } from './cookies.service';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private locale: LocaleType;

  constructor(private ngI18n: NzI18nService, private config: ConfigService, private cookies: CookiesService) {
    this.locale = (this.cookies.get('locale') as LocaleType) || config.DEFAULT_LOCALE;
    this.SetLocale(this.locale);
  }

  public SetLocale(locale: LocaleType) {
    if (!locale) { return; }
    this.locale = locale;
    this.cookies.set('locale', this.locale);
    switch (this.locale) {
      case LocaleType.en_US: this.ngI18n.setLocale(ng_en); registerLocaleData(en); break;
      case LocaleType.zh_CN: this.ngI18n.setLocale(ng_zh); registerLocaleData(zh); break;
      default: break;
    }
  }

  public GetLocale() {
    switch (this.locale) {
      case LocaleType.en_US: return en_US;
      case LocaleType.zh_CN: return zh_CN;
      default: return en_US;
    }
  }

  public get localeType() {
    return this.locale;
  }
}
