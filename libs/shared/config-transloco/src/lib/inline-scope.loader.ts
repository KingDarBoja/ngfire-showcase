import { InlineLoader, Translation } from '@ngneat/transloco';
import {
  DefaultAvailableLangs,
  DEFAULT_AVAILABLE_LANGS,
} from './shared-config-transloco.module';

export const InlineScopeLoader = (
  importer: (lang: DefaultAvailableLangs, root: string) => Promise<Translation>,
  root = 'i18n',
) => {
  return DEFAULT_AVAILABLE_LANGS.reduce((acc, lang) => {
    acc[lang.id] = () => importer(lang.id, root);
    return acc;
  }, {} as InlineLoader);
};
