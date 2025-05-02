import { Component, ElementRef, input, signal, ViewChild } from '@angular/core'
import { FontSizeService } from '../services/font-size.service'

@Component({
  selector: 'app-title',
  imports: [],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css',
  host: {
    '(window:resize)': 'onWindowResize($event)',
    '(window:orientationchange)': 'onWindowResize($event)',
  },
})
export class TitleComponent {
  inputTitle = input.required<string>()
  type = input<'countdown' | 'title'>('title')
  titleFontSize = signal(0)
  scrollWidth = signal(0)
  windowWidth = signal(0)

  @ViewChild('title') titleElement!: ElementRef

  constructor(private fontSizeService: FontSizeService) {}

  private adjustFontSize() {
    const titleElement = this.titleElement.nativeElement
    const targetWidth = this.fontSizeService.getWindowWidth(48)
    const fontSize = this.fontSizeService.adjustFontSizeToWidth(
      titleElement,
      targetWidth,
    )
    titleElement.style.fontSize = `${fontSize}px`
  }

  ngAfterViewInit() {
    this.adjustFontSize()
  }

  ngAfterViewChecked() {
    this.adjustFontSize()
  }

  onWindowResize() {
    requestAnimationFrame(() => {
      this.adjustFontSize()
    })
  }
}
