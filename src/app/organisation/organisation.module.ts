import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganisationRoutingModule } from './organisation-routing.module';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { OrgaMenuComponent } from './template/orga-menu/orga-menu.component';
import { OrgaStocksComponent } from './pages/orga-stocks/orga-stocks.component';
import { OrgaEventsComponent } from './pages/orga-events/orga-events.component';
import { OrganisationComponent } from './organisation/organisation.component';

@NgModule({
  declarations: [AccueilComponent, OrgaMenuComponent, OrgaStocksComponent, OrgaEventsComponent, OrganisationComponent],
  imports: [CommonModule, OrganisationRoutingModule],
})
export class OrganisationModule {}
