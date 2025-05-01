import {
  Component,
  effect,
  ElementRef,
  input,
  signal,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'app-title',
  imports: [],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css',
  host: {
    '(window:resize)': 'onWindowResize($event)',
  },
})
export class TitleComponent {
  inputTitle = input.required<string>()
  type = input<'countdown' | 'title'>('title')
  titleFontSize = signal(0)
  scrollWidth = signal(0)
  windowWidth = signal(0)

  @ViewChild('title') title!: ElementRef

  constructor() {}

  private getActualWindowWidth(): number {
    return (window.visualViewport?.width || window.innerWidth) - 48
  }

  private adjustFontSize() {
    const titleElement = this.title.nativeElement
    this.scrollWidth.set(titleElement.scrollWidth)
    this.windowWidth.set(this.getActualWindowWidth())
    while (this.scrollWidth() > this.windowWidth()) {
      if (this.titleFontSize() <= 1) {
        break
      }
      this.titleFontSize.set(this.titleFontSize() - 1)
      this.title.nativeElement.setAttribute(
        'style',
        `font-size: ${this.titleFontSize()}px`,
      )
      this.scrollWidth.set(titleElement.scrollWidth)
      this.windowWidth.set(this.getActualWindowWidth())
    }
    while (this.scrollWidth() <= this.windowWidth()) {
      this.titleFontSize.set(this.titleFontSize() + 1)
      this.title.nativeElement.setAttribute(
        'style',
        `font-size: ${this.titleFontSize()}px`,
      )
      this.scrollWidth.set(titleElement.scrollWidth)
      this.windowWidth.set(this.getActualWindowWidth())
    }
    if (this.titleFontSize() <= 1) {
      return
    }
    this.titleFontSize.set(this.titleFontSize() - 1)
    this.title.nativeElement.setAttribute(
      'style',
      `font-size: ${this.titleFontSize()}px`,
    )
  }

  ngAfterViewInit() {
    this.adjustFontSize()
  }

  ngAfterViewChecked() {
    this.adjustFontSize()
  }

  onWindowResize(event: any) {
    requestAnimationFrame(() => {
      this.adjustFontSize()
    })
  }
}
