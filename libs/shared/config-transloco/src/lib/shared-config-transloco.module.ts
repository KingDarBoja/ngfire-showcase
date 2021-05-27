import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  InlineLoader,
  TranslocoConfig,
  TranslocoModule,
  TRANSLOCO_CONFIG,
  TRANSLOCO_SCOPE,
} from '@ngneat/transloco';
// import { translocoLoader } from './transloco.loader';

export type AvailableLang = string | { id: string; label: string } | undefined;

export const DEFAULT_AVAILABLE_LANGS = [
  { id: 'en', label: 'English' },
  { id: 'es', label: 'Español' },
] as const;
export type DefaultAvailableLangs = typeof DEFAULT_AVAILABLE_LANGS[number]['id'];

/**
 * Configures the Transloco Module for Apps.
 *
 * Use forRoot configuration only in app.module of apps.
 *
 * Use forChild configuration only in main module of libs.
 *
 * To optimize the transloco work under the hood, we can enable the
 * `transloco-optimize` tool according to the
 * [docs](https://ngneat.github.io/transloco/docs/tools/optimize).
 *
 * For a complete list of plugins check
 * [ngneat/transloco](https://ngneat.github.io/transloco/docs/plugins/locale/)
 *
 * If translation loading speed needs to be improved check this
 * [post](https://netbasal.com/optimize-user-experience-while-your-angular-app-loads-7e982a67ff1a)
 * made by ngneat/transloco creators.
 *
 *
 */
@NgModule({
  imports: [CommonModule, TranslocoModule],
  exports: [TranslocoModule],
})
export class SharedConfigTranslocoModule {
  static forRoot(
    prodMode: boolean,
    availableLangs: ReadonlyArray<AvailableLang> = DEFAULT_AVAILABLE_LANGS,
  ): ModuleWithProviders<SharedConfigTranslocoModule> {
    return {
      ngModule: SharedConfigTranslocoModule,
      providers: [
        {
          provide: TRANSLOCO_CONFIG,
          useValue: {
            availableLangs: availableLangs,
            defaultLang: 'en',
            fallbackLang: 'en',
            prodMode: prodMode,
            // Remove this option if your application doesn't support changing
            // language in runtime.
            reRenderOnLangChange: true,
            flatten: {
              aot: prodMode,
            },
          } as TranslocoConfig,
        },
        // translocoLoader,
      ],
    };
  }

  static forChild(
    scopeName: string,
    scopeLoader: InlineLoader,
  ): ModuleWithProviders<SharedConfigTranslocoModule> {
    return {
      ngModule: SharedConfigTranslocoModule,
      providers: [
        {
          provide: TRANSLOCO_SCOPE,
          useValue: {
            scope: scopeName,
            loader: scopeLoader,
          },
        },
      ],
    };
  }
}
