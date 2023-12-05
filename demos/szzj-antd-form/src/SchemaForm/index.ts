import SchemaForm from './components/SchemaForm';
import useSchemaForm from './hooks/useForm';
import { registerField, unregisterField, getField, getFields } from './register';

type SchemaFormType = typeof SchemaForm;

interface FinalSchemaFormType extends SchemaFormType {
  useForm: typeof useSchemaForm;
  registerField: typeof registerField;
  unregisterField: typeof unregisterField;
  getField: typeof getField;
  getFields: typeof getFields;
}

const FinalSchemaForm: FinalSchemaFormType = SchemaForm as FinalSchemaFormType;
FinalSchemaForm.useForm = useSchemaForm;
FinalSchemaForm.registerField = registerField;
FinalSchemaForm.unregisterField = unregisterField;
FinalSchemaForm.getField = getField;
FinalSchemaForm.getFields = getFields;

export default FinalSchemaForm;
export { registerField, unregisterField, getField };
