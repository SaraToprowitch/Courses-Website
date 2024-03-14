import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RecipeService } from './course.service';
import "primeng/resources/themes/lara-light-blue/theme.css";
import "primeng/resources/primeng.css";
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import "primeicons/primeicons.css";
import 'bootstrap/dist/css/bootstrap.css';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,LoginComponent,TopBarComponent,FooterComponent,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [RecipeService]
})
export class AppComponent {
  title = 'recipes-project';
}
