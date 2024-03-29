import { Route } from '@angular/router';

export const appRoutes: Route[] = [
{
    path: '',
    loadComponent: ()  =>
    import ('./home-page.component').then((m) => m.HomePageComponent),
},
{
    path: 'settings',
    loadComponent: ()  =>
    import ('./settings-page.component').then((m) => m.SettingsPageComponent),
},
{
    path: 'transactions',
    loadComponent: ()  =>
    import ('./transactions-section.component').then((m) => m.TransactionssectionComponent),
},

{
    path: '**',
    redirectTo:' '
}
];
