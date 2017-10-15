import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { HeaderNavComponent } from './header-nav.component';
import { AsideNavComponent } from './aside-nav.component';
import { FooterComponent } from './footer.component';
import { QuickSidebarComponent } from './quick-sidebar.component';
import { ScrollTopComponent } from './scroll-top.component';
import { TooltipsComponent } from './tooltips.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HrefPreventDefaultDirective } from '@shared/directives/href-prevent-default.directive';
import { UnwrapTagDirective } from '@shared/directives/unwrap-tag.directive';

@NgModule({
    declarations: [
        LayoutComponent,
        HeaderNavComponent,
        AsideNavComponent,
        FooterComponent,
        QuickSidebarComponent,
        ScrollTopComponent,
        TooltipsComponent,
        HrefPreventDefaultDirective,
        UnwrapTagDirective,
    ],
    exports: [
        LayoutComponent,
        HeaderNavComponent,
        AsideNavComponent,
        FooterComponent,
        QuickSidebarComponent,
        ScrollTopComponent,
        TooltipsComponent,
        HrefPreventDefaultDirective,
    ],
    imports: [
        CommonModule,
        RouterModule,
    ]
})
export class LayoutModule {
}