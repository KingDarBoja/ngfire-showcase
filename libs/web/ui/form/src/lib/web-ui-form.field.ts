import { FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';
import { FlatBounded } from '@ngfire-showcase/shared/util/data-structures';
import { ThemePalette } from '@angular/material/core';

interface ButtonTemplateOptions extends FormlyTemplateOptions {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  btnType: 'raised' | 'stroked' | 'flat' | 'icon' | 'fab' | 'mini-fab';
  color?: ThemePalette;
  autofocus?: boolean;
  onClick?: (event$: unknown) => void;
}

export class WebUiFormField implements FormlyFieldConfig {
  static button(
    templateOptions?: ButtonTemplateOptions,
    options?: FormlyFieldConfig,
  ) {
    const defaults = { color: 'primary', autofocus: false, type: 'button' };
    return {
      type: 'button',
      templateOptions: {
        ...defaults,
        ...templateOptions,
      },
      ...options,
    };
  }

  static checkbox<T>(
    key: FlatBounded<T>,
    templateOptions?: FormlyTemplateOptions,
    options?: FormlyFieldConfig,
  ): FormlyFieldConfig {
    return this.field(key, 'checkbox', templateOptions, options);
  }

  static date<T>(
    key: FlatBounded<T>,
    templateOptions?: FormlyTemplateOptions,
    options?: FormlyFieldConfig,
  ): FormlyFieldConfig {
    return this.field(
      key,
      'date',
      templateOptions,
      options,
    );
  }

  static datetime<T>(
    key: FlatBounded<T>,
    templateOptions?: FormlyTemplateOptions,
    options?: FormlyFieldConfig,
  ): FormlyFieldConfig {
    return this.field(
      key,
      'datetime',
      templateOptions,
      options,
    );
  }

  static time<T>(
    key: FlatBounded<T>,
    templateOptions?: FormlyTemplateOptions,
    options?: FormlyFieldConfig,
  ): FormlyFieldConfig {
    return this.field(
      key,
      'time',
      templateOptions,
      options,
    );
  }

  static year<T>(
    key: FlatBounded<T>,
    templateOptions?: FormlyTemplateOptions,
    options?: FormlyFieldConfig,
  ): FormlyFieldConfig {
    return this.field(
      key,
      'year',
      templateOptions,
      options,
    );
  }

  static month<T>(
    key: FlatBounded<T>,
    templateOptions?: FormlyTemplateOptions,
    options?: FormlyFieldConfig,
  ): FormlyFieldConfig {
    return this.field(
      key,
      'month',
      templateOptions,
      options,
    );
  }

  static email<T>(
    key: FlatBounded<T>,
    templateOptions?: FormlyTemplateOptions,
    options?: FormlyFieldConfig,
  ): FormlyFieldConfig {
    const defaults = {
      type: 'email',
      label: 'Email',
    };
    const defaultOptions = { validators: { validation: ['email'] } };
    return this.input(
      key,
      { ...defaults, ...templateOptions },
      { ...defaultOptions, ...options },
    );
  }

  static fieldRow(
    fieldGroup: FormlyFieldConfig[] = [],
    fieldGroupClassName: string = 'flex',
    config: FormlyFieldConfig = {},
  ): FormlyFieldConfig {
    return {
      fieldGroup,
      fieldGroupClassName,
      ...config,
    };
  }

  static field<T>(
    key: FlatBounded<T>,
    type?: string,
    templateOptions: FormlyTemplateOptions = {},
    config: FormlyFieldConfig = {},
  ): FormlyFieldConfig {
    return {
      key,
      type,
      templateOptions: {
        ...templateOptions,
      },
      ...config,
    };
  }

  static input<T>(
    key: FlatBounded<T>,
    templateOptions: FormlyTemplateOptions = {},
    config: FormlyFieldConfig = {},
  ): FormlyFieldConfig {
    return this.field(key, 'input', templateOptions, config);
  }

  static multicheckbox<T>(
    key: FlatBounded<T>,
    templateOptions?: FormlyTemplateOptions,
    options?: FormlyFieldConfig,
  ): FormlyFieldConfig {
    return this.field(key, 'multicheckbox', templateOptions, options);
  }

  static number<T>(
    key: FlatBounded<T>,
    templateOptions?: FormlyTemplateOptions,
    options?: FormlyFieldConfig,
  ): FormlyFieldConfig {
    return this.input(
      key,
      { ...templateOptions, type: 'number' },
      { ...options },
    );
  }

  static phone<T>(
    key: FlatBounded<T>,
    templateOptions?: FormlyTemplateOptions,
    options?: FormlyFieldConfig,
  ): FormlyFieldConfig {
    return this.input(key, { ...templateOptions, type: 'phone' }, options);
  }

  static password<T>(
    key: FlatBounded<T>,
    templateOptions?: FormlyTemplateOptions,
    options?: FormlyFieldConfig,
  ): FormlyFieldConfig {
    const defaults = {
      label: 'Password',
      type: 'password',
      minLength: 8,
      required: true,
    };

    return this.input(key, { ...templateOptions, ...defaults }, options);
  }

  static radio<T>(
    key: FlatBounded<T>,
    templateOptions?: FormlyTemplateOptions,
    options?: FormlyFieldConfig,
  ): FormlyFieldConfig {
    return this.field(key, 'radio', templateOptions, options);
  }

  static select<T>(
    key: FlatBounded<T>,
    templateOptions?: FormlyTemplateOptions,
    options?: FormlyFieldConfig,
  ): FormlyFieldConfig {
    return this.field(key, 'select', templateOptions, options);
  }

  static textarea<T>(
    key: FlatBounded<T>,
    templateOptions?: FormlyTemplateOptions,
    options?: FormlyFieldConfig,
  ): FormlyFieldConfig {
    const defaultTemplateOptions = { rows: 5 };

    return this.field(
      key,
      'textarea',
      { ...defaultTemplateOptions, ...templateOptions },
      options,
    );
  }

  static template(template: string): FormlyFieldConfig {
    return { type: 'formly-template', template };
  }
}
