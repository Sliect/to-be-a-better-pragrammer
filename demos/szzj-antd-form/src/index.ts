export { default as logger } from './logger';
export { default as createField } from './createField';
export { default as Form } from './Form';
export { useFormContext } from './contexts/FormContext';
export { useFormAttrsContext } from './contexts/FormAttrsContext';
export { useFieldContext } from './contexts/FieldContext';

export * from './fields';
export * as Rules from './rules';
import { setDetailComponent } from './detail';
export * from './forms';
export { default as When } from './FormItem/WhenWrap';

export const registerDetailComponent = setDetailComponent;

export { default as EditableFieldDetail } from './EditableFieldDetail';

export { default as SchemaForm } from './SchemaForm';
export { registerField, unregisterField, getField } from './SchemaForm';
