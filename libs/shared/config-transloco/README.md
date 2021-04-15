# shared-config-transloco

Wrapper configuration library for [`@ngneat/transloco`](https://github.com/ngneat/transloco) in NX Workspaces based on the work of [transloco-with-nx-libs](https://github.com/NachoVazquez/transloco-with-nx-libs)
repository, which is a clone of `@ngneat/transloco` creator example showcase.

This wrapper enables the use of lazy loaded translation files with the usage of
[inline loaders](https://ngneat.github.io/transloco/docs/inline-loaders/) to
keep translation files in the same scope as the component / module.

For other tools related to transloco, take a look at this [blog post](https://netbasal.com/translocos-new-dev-tools-make-i18n-in-angular-easy-as-pie-889b3ddd6a69) of `@ngneat/transloco` creators.

## Running unit tests

Run `nx test shared-config-transloco` to execute the unit tests.
