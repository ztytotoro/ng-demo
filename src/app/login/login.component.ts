import { AuthService } from 'src/services/auth/auth.service';
import { LocaleType, LocaleInfo } from 'src/services/i18n/rules/index';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { I18nService } from 'src/services/i18n/i18n.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  locale = new FormControl('');
  localeInfo = LocaleInfo;
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }

  constructor(private fb: FormBuilder, private i18nService: I18nService, private authService: AuthService) {
    this.locale.setValue(i18nService.localeType);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
    this.locale.valueChanges.subscribe(value => this.SwitchLanguage(value));
  }

  get localeText() {
    return this.i18nService.GetLocale().Login;
  }

  SwitchLanguage(locale: LocaleType) {
    this.i18nService.SetLocale(locale);
  }

  Login() {
    this.authService.Login(this.validateForm.value.userName, this.validateForm.value.password);
  }
}
