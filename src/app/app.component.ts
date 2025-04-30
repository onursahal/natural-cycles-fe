import { Component, computed, effect, input, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleComponent } from './title/title.component';
import { TextinputComponent } from './textinput/textinput.component';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TitleComponent, TextinputComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = signal<string>(localStorage.getItem('title') || '');
  endDate = signal<string>(localStorage.getItem('endDate') || '');
  today = signal(new Date());

  countdownString = computed(() => {
    const countdown =
      new Date(this.endDate()).getTime() - this.today().getTime();
    if (countdown) {
      const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((countdown % (1000 * 60)) / 1000);

      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    return '';
  });

  constructor() {
    effect(() => {
      localStorage.setItem('title', this.title());
      localStorage.setItem('endDate', this.endDate());
    });
    interval(1000).subscribe(() => {
      this.today.set(new Date());
    });
  }
}
