import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { AsideNavComponent } from './aside-nav/aside-nav.component';
import { FooterComponent } from './footer/footer.component';
import { QuickSidebarComponent } from './quick-sidebar/quick-sidebar.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { TopBarLanguageSwitchComponent } from './topbar-languageswitch/topbar-languageswitch.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HrefPreventDefaultDirective } from '../../directives/href-prevent-default.directive';
import { UnwrapTagDirective } from '../../directives/unwrap-tag.directive';
import { AppBodyComponent } from "./body/app-body.component";

@NgModule({
    declarations: [
        AppBodyComponent,
        LayoutComponent,
        HeaderNavComponent,
        AsideNavComponent,
        FooterComponent,
        QuickSidebarComponent,
        ScrollTopComponent,
        TooltipsComponent,
        TopBarLanguageSwitchComponent,
        HrefPreventDefaultDirective,
        UnwrapTagDirective
    ],
    exports: [
        AppBodyComponent,
        LayoutComponent,
        HeaderNavComponent,
        AsideNavComponent,
        FooterComponent,
        QuickSidebarComponent,
        ScrollTopComponent,
        TooltipsComponent,
        TopBarLanguageSwitchComponent,
        HrefPreventDefaultDirective
    ],
    imports: [
        CommonModule,
        RouterModule,
    ]
})
export class LayoutModule {
}