import { NgModule } from '@angular/core';

import { LayoutModule } from '@angular/cdk/layout';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


const modules: any[] = [
	LayoutModule,

    MatProgressSpinnerModule,
	MatNativeDateModule,
	MatExpansionModule,
	MatCardModule,
	MatTabsModule,
	MatSidenavModule,
	MatToolbarModule,
	MatAutocompleteModule,
	MatCheckboxModule,
	MatDatepickerModule,
	MatFormFieldModule,
	MatInputModule,
	MatRadioModule,
	MatSelectModule,
	MatSliderModule,
	MatSlideToggleModule,
	MatMenuModule,
	MatButtonModule,
	MatIconModule,
];

@NgModule({
	imports: [...modules],
	exports: [...modules],
	providers: [MatDatepickerModule],
})
export class AngularMaterialModule {}
