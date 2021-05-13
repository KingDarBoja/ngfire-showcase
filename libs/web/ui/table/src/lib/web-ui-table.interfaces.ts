import { FlatBounded } from '@ngfire-showcase/shared/util/data-structures';

export interface WebUiTableColumn<T> {
  field: FlatBounded<T>;
  className?: string;
  header?: string;
  headerClassName?: string;
  hide?: boolean;
}

export interface WebUiTableConfig {
  initialSelection: [];
  allowMultiSelect: boolean;
}
