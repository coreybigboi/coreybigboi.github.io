import { Component } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { MatTabsModule } from "@angular/material/tabs";
import { FavouriteSoundsComponent } from "./favourite-sounds/favourite-sounds.component";
import { FavouriteMoviesComponent } from "./favourite-movies/favourite-movies.component";
import { FavouriteGamesComponent } from "./favourite-games/favourite-games.component";
import { AnimatedTextComponent } from '../../shared/components/animated-text/animated-text.component';
import { ColouredBoxComponent } from '../../shared/components/coloured-box/coloured-box.component';
import { TerminalTextComponent } from '../../shared/components/terminal-text/terminal-text.component';
import { Colours } from '../../shared/enums/colours';

@Component({
  selector: 'app-about',
  standalone: true,
    imports: [
        MatTabsModule,
        NgOptimizedImage,
        FavouriteSoundsComponent,
        FavouriteMoviesComponent,
        FavouriteGamesComponent,
        ColouredBoxComponent,
        AnimatedTextComponent,
        TerminalTextComponent
    ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  readonly Dialogue = "I don't know what to say about myself, so instead I'll share some of my favourite stuff. ¯\\_(ツ)_/¯ ";
  readonly terminalText = ["About me"];
  readonly Blue = Colours.Blue;
}
