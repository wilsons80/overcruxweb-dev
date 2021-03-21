import { Component, ViewChild, HostListener } from '@angular/core';
import { LoadingIndicatorService } from 'src/app/services/loadingIndicator/loading-indicator.service';
import { MenuPrincipalService } from './services/menuPrincipal/menu-principal.service';
import { ToolbarPrincipalService } from './services/toolbarPrincipal/toolbar-principal.service';
import { AuthGuard } from './guards/auth.guard';
import { environment } from '../environments/environment';
import { versions } from 'src/environments/versions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'S3Manager';

  data = new Date();
  teste = false;

  versions = versions;
  environment = environment;

  @ViewChild('menuPrincipal', { static: false }) menuPrincipal;
  reason = '';

  showFiller = false;
  mostrarMenu: any;

  constructor(
    private menuPrincipalService: MenuPrincipalService,
    loadingIndicatorService: LoadingIndicatorService,
    public toolbarPrincipalService: ToolbarPrincipalService,
    private authGuard: AuthGuard,
  ) {
    loadingIndicatorService.onLoadingChanged.subscribe(
      isLoading => setTimeout(() => this.toolbarPrincipalService.setLoadingCompleto(!isLoading), 0)
    );

    this.limparCacheToken();

  }

  ngOnInit(): void {
    this.authGuard.mostrarMenu.subscribe(resultado => this.mostrarMenu = resultado);

    this.menuPrincipalService.toggle.subscribe((resposta) => {
      if (resposta && resposta.logout == true) {
        this.close()
      } 
      // else this.menuPrincipal.toggle()
    });
  }

  close() {
    this.menuPrincipal.close();
  }


  limparCacheToken() {
    if(localStorage.getItem('expires_at')) {
      localStorage.removeItem('expires_at');
    }

    if(localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }

    if(localStorage.getItem('IDSESSIONUSUARIO')) {
      localStorage.removeItem('IDSESSIONUSUARIO');
    }
  }


  ngOnDestroy(): void {
    this.limparCacheToken();
  }
  
}
