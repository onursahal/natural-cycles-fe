import {
  Component,
  computed,
  effect,
  input,
  model,
  ViewChild,
} from '@angular/core'
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker'
import { provideNativeDateAdapter } from '@angular/material/core'
import { formatDate } from '@angular/common'
@Component({
  selector: 'app-textinput',
  imports: [MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './textinput.component.html',
  styleUrl: './textinput.component.css',
})
export class TextinputComponent {
  title = input.required<string>()
  value = input.required<string | Date>()
  type = input<'countdown' | 'title'>('title')
  onInputChange = model<string>()
  formattedDate = computed<string>(() => {
    if (this.value()) {
      return formatDate(this.value(), 'd/M/yyyy', 'en-US')
    }
    return ''
  })

  @ViewChild('picker') datePicker!: MatDatepicker<any>

  minDate = new Date(new Date().setDate(new Date().getDate() + 1))

  onFocus() {
    this.datePicker.open()
  }

  onChange(event: any) {
    console.log(event.target.value)
    this.onInputChange.set(`${event.target.value}`)
  }
}
