export interface WebUiTableColumn<T> {
  id: Extract<keyof T, string>;
  className?: string;
  header?: string;
  headerClassName?: string;
  hide?: boolean;
}
