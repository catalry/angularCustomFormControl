import { Component, OnInit, Self, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-required-text',
  templateUrl: './required-text.component.html',
  styleUrls: ['./required-text.component.css']
})
export class RequiredTextComponent implements OnInit, ControlValueAccessor {
  disabled!: boolean;
  constructor(@Self() public controlDirective: NgControl) {
    controlDirective.valueAccessor = this;
  }
  onChange: () => void;
  onTouched: () => void;
  @ViewChild("input") input!: ElementRef;
  ngOnInit(): void {
    const control = this.controlDirective.control;
    if (control) {
      let validators = control.validator
        ? [control.validator, Validators.required]
        : Validators.required;
      control.setValidators(validators);
      control.updateValueAndValidity();
    }
  }

  writeValue(value: any): void {
    this.input.nativeElement.value = value;
  }
  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}

