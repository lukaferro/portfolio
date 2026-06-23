import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ParticlesComponent } from './components/particles/particles.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, ParticlesComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.component.css'
})
export class AppComponent { }
