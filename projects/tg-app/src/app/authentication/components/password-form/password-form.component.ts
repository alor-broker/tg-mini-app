import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  forwardRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NzIconDirective } from "ng-zorro-antd/icon";

@Component({
  selector: 'tga-password-form',
  standalone: true,
  imports: [ReactiveFormsModule, NzIconDirective],
  templateUrl: './password-form.component.html',
  styleUrl: './password-form.component.less',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordFormComponent),
      multi: true
    }
  ]
})
export class PasswordFormComponent implements ControlValueAccessor, OnInit, AfterViewInit {

  @ViewChild('inputElement', { static: true })
  inputElement!: ElementRef<HTMLInputElement>;

  passwordControl = new FormControl('');

  onChange?: (val: string) => void;
  onTouch?: () => void;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly destroyRef: DestroyRef
  ) {
  }

  ngOnInit() {
    this.passwordControl.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(v => {
        let parsedValue = (v ?? '')
          .trim()
          .replace(/\D/g, '');

        if (v != parsedValue) {
          this.passwordControl.setValue(parsedValue);
          return;
        }

        this.onChange?.(v ?? '');
        this.cdr.detectChanges();
      })
  }

  ngAfterViewInit() {
    this.inputElement.nativeElement.focus();
  }

  writeValue(val: string | null): void {
    this.passwordControl.setValue(val ?? '');
    this.cdr.detectChanges();
  }

  registerOnChange(fn: (val: string) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn:  () => void) {
    this.onTouch = fn;
  }

  focusToInput() {
    this.inputElement.nativeElement.focus();
  }
}
