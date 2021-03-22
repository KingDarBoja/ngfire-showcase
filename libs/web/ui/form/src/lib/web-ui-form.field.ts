import { FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';

export class WebUiFormField implements FormlyFieldConfig {
  static checkbox<T>(
    key: Extract<keyof T, string>,
    templateOptions?: FormlyTemplateOptions,
    options?: FormlyFieldConfig
  ): FormlyFieldConfig {
    return this.field(key, 'checkbox', templateOptions, options);
  }

  static date<T>(
    key: Extract<keyof T, string>,
    templateOptions?: FormlyTemplateOptions,
    options?: FormlyFieldConfig
  ): FormlyFieldConfig {
    return this.input(
      key,
      { ...templateOptions, type: 'date' },
      { ...options }
    );
  }

  static datetime<T>(
    key: Extract<keyof T, string>,
    templateOptions?: FormlyTemplateOptions,
    options?: FormlyFieldConfig
  ): FormlyFieldConfig {
    return this.input(
      key,
      { ...templateOptions, type: 'datetime-local' },
      { ...options }
    );
  }

  static email<T>(
    key: Extract<keyof T, string>,
    templateOptions?: FormlyTemplateOptions,
    options?: FormlyFieldConfig
  ): FormlyFieldConfig {
    const defaults = {
      type: 'email',
      label: 'Email',
    };
    const defaultOptions = { validators: { validation: ['email'] } };
    return this.input(
      key,
      { ...defaults, ...templateOptions },
      { ...defaultOptions, ...options }
    );
  }

  static fieldRow(
    fieldGroup: FormlyFieldConfig[] = [],
    fieldGroupClassName: string = 'flex'
  ): FormlyFieldConfig {
    return {
      fieldGroup,
      fieldGroupClassName,
    };
  }

  static field<T>(
    key: Extract<keyof T, string>,
    type?: string,
    templateOptions: FormlyTemplateOptions = {},
    config: FormlyFieldConfig = {}
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
    key: Extract<keyof T, string>,
    templateOptions: FormlyTemplateOptions = {},
    config: FormlyFieldConfig = {}
  ): FormlyFieldConfig {
    return this.field(key, 'input', templateOptions, config);
  }

  static multicheckbox<T>(
    key: Extract<keyof T, string>,
    templateOptions?: FormlyTemplateOptions,
    options?: FormlyFieldConfig
  ): FormlyFieldConfig {
    return this.field(key, 'multicheckbox', templateOptions, options);
  }

  static number<T>(
    key: Extract<keyof T, string>,
    templateOptions?: FormlyTemplateOptions,
    options?: FormlyFieldConfig
  ): FormlyFieldConfig {
    return this.input(
      key,
      { ...templateOptions, type: 'number' },
      { ...options }
    );
  }

  static password<T>(
    key: Extract<keyof T, string>,
    templateOptions?: FormlyTemplateOptions,
    options?: FormlyFieldConfig
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
    key: Extract<keyof T, string>,
    templateOptions?: FormlyTemplateOptions,
    options?: FormlyFieldConfig
  ): FormlyFieldConfig {
    return this.field(key, 'radio', templateOptions, options);
  }

  static select<T>(
    key: Extract<keyof T, string>,
    templateOptions?: FormlyTemplateOptions,
    options?: FormlyFieldConfig
  ): FormlyFieldConfig {
    return this.field(key, 'select', templateOptions, options);
  }

  static textarea<T>(
    key: Extract<keyof T, string>,
    templateOptions?: FormlyTemplateOptions,
    options?: FormlyFieldConfig
  ): FormlyFieldConfig {
    const defaultTemplateOptions = { rows: 5 };

    return this.field(
      key,
      'textarea',
      { ...defaultTemplateOptions, ...templateOptions },
      options
    );
  }

  static template(template: string): FormlyFieldConfig {
    return { type: 'formly-template', template };
  }

  static time<T>(
    key: Extract<keyof T, string>,
    templateOptions?: FormlyTemplateOptions,
    options?: FormlyFieldConfig
  ): FormlyFieldConfig {
    return this.input(
      key,
      { ...templateOptions, type: 'time' },
      { ...options }
    );
  }
}
