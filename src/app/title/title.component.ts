import { Component, ElementRef, input, signal, ViewChild } from '@angular/core'

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
    return window.innerWidth - 48
  }

  private adjustFontSizeToFullWidthText(titleElement: HTMLElement) {
    const maxFontSize = 1000
    const minFontSize = 1
    const targetWidth = this.getActualWindowWidth()

    const testFontSize = (fontSize: number) => {
      titleElement.style.fontSize = `${fontSize}px`
      return titleElement.scrollWidth
    }

    let low = minFontSize
    let high = maxFontSize
    let bestFit = minFontSize

    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      const currentWidth = testFontSize(mid)

      if (currentWidth <= targetWidth) {
        bestFit = mid
        low = mid + 1
      } else {
        high = mid - 1
      }
    }

    this.titleFontSize.set(bestFit)
    titleElement.style.fontSize = `${bestFit}px`
  }

  ngAfterViewInit() {
    this.adjustFontSizeToFullWidthText(this.title.nativeElement)
  }

  ngAfterViewChecked() {
    this.adjustFontSizeToFullWidthText(this.title.nativeElement)
  }

  onWindowResize() {
    requestAnimationFrame(() => {
      this.adjustFontSizeToFullWidthText(this.title.nativeElement)
    })
  }
}
