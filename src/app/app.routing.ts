import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


//importar componentes 
import { IndexComponent } from "./components/index/index.component";

import { LoginuComponent } from "./components/loginu/loginu.component";
import { MenuComponent } from "./components/menu/menu.component";

import { DinamismoComponent } from "./components/dinamismo/dinamismo.component";


import { ReporteuserComponent } from "./components/reporteuser/reporteuser.component";

//array de rutas
const appRoutes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'index', component: IndexComponent },
    { path: 'loginuser', component: LoginuComponent },

    { path: 'menu', component: MenuComponent },

    { path: 'dinamismo', component: DinamismoComponent },


    { path: 'repouser', component: ReporteuserComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
