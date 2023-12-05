import StepsForm from './StepsForm';
import StepForm from './StepForm';

type StepsFormType = typeof StepsForm;

interface StepsFormInterface extends StepsFormType {
  StepForm: typeof StepForm;
}

const FinalStepsForm = StepsForm as StepsFormInterface;
FinalStepsForm.StepForm = StepForm;

export default FinalStepsForm;

export type {
  StepsFormProps,
  StepFormProps,
  Action,
  SaveAction,
  ButtonConfig,
} from './types';
