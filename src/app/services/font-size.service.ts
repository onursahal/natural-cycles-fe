import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class FontSizeService {
  private readonly MAX_FONT_SIZE = 1000
  private readonly MIN_FONT_SIZE = 1

  adjustFontSizeToWidth(element: HTMLElement, targetWidth: number): number {
    const testFontSize = (fontSize: number) => {
      element.style.fontSize = `${fontSize}px`
      return element.scrollWidth
    }

    let low = this.MIN_FONT_SIZE
    let high = this.MAX_FONT_SIZE
    let bestFit = this.MIN_FONT_SIZE

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

    return bestFit
  }

  getWindowWidth(padding: number = 0): number {
    return window.innerWidth - padding
  }
}
