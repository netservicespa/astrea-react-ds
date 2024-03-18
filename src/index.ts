/**
 * Export all the components that are exposed by this library.
 */
export { NsFullPageSpinner } from './components/NsFullPageSpinner';
export { ErrorBoundary } from './components/error/ErrorBoundary';
export { FallbackPage } from './components/error/FallbackPage';

/**
 * @deprecated
 * The "Header" component is deprecated, it will be removed starting with version 2.0 of astrea-react-ds.
 * use the "NsHeader" component.
 */
export {
  NsHeader,
  NsHeader as Header,
} from './components/patterns/navigation/NsHeader';

/**
 * @deprecated
 * The "DragDrop" component is deprecated, it will be removed starting with version 2.0 of astrea-react-ds.
 * use the "NsDragDrop" component.
 */
export {
  NsDragAndDrop,
  NsDragAndDrop as DragDrop,
} from './components/components/NsDragAndDrop';
export { NsFooter } from './components/patterns/footer/NsFooter';
/**
 * @deprecated
 * The "Errors" component is deprecated, it will be removed starting with version 2.0 of astrea-react-ds.
 * use the "NsErrors" component.
 */
export { NsErrors, NsErrors as Errors } from './components/components/NsErrors';

/**
 * @deprecated
 * The "LabelInput" component is deprecated, it will be removed starting with version 2.0 of astrea-react-ds.
 * use the "NsLabelInput" component.
 */
export {
  NsLabelInput,
  NsLabelInput as LabelInput,
} from './components/components/NsLabelInput';
export { NsButton } from './components/components/NsButton';
export { NsTabs } from './components/components/tabs/NsTabs';
export { NsPanel } from './components/components/panel/NsPanel';
export { NsAccordion } from './components/components/NsAccordion';
export { NsProgress } from './components/components/NsProgress';
export { NsPageHeader } from './components/components/PageHeader/NsPageHeader';
export { NsModal } from './components/components/NsModal';
export { NsTag } from './components/components/NsTag';
export { NsCard } from './components/components/card/NsCard';
export { NsTable } from './components/components/NsTable';
export { NsTooltip } from './components/components/NsTooltip';
export { NsDropDown } from './components/components/Dropdown/NsDropDown';
export { NsPagination } from './components/components/pagination/NsPagination';
export { NsFeedback } from './components/components/feedback/NsFeedback';

// export { NsTable } from './components/components/table/NsTable'; TODO: change the table library that we use here or resolve the issue with ES Module

/**
 * Forms and validation
 *
 * the following components are deprecated:
 *
 * @deprecated
 *  - "ValidatedCheckbox" component is deprecated, use "NsCheckbox"
 * @deprecated
 *  - "ValidatedDateCalendar" component is deprecated, use "NsDateCalendar"
 * @deprecated
 *  - "ValidatedDragDrop" component is deprecated, use "NsDragDrop"
 * @deprecated
 *  - "ValidatedFileUpload" component is deprecated, use "NsFileUpload"
 * @deprecated
 *  - "ValidatedRadio" component is deprecated, use "NsRadio"
 * @deprecated
 *  - "ValidatedSelect" component is deprecated, use "NsSelect"
 * @deprecated
 *  - "ValidatedSelectAutocomplete" component is deprecated, use "NsSelectAutocomplete"
 * @deprecated
 *  - "ValidatedTextArea" component is deprecated, use "NsTextArea"
 * @deprecated
 *  - "ValidatedTextInput" component is deprecated, use "NsTextInput"
 * @deprecated
 *  - "ValidatedForm" component is deprecated, use "NsForm"
 *
 * will be removed starting with version 2.0 of astrea-react-ds.
 */
export {
  NsFormProps,
  NsFormProps as FormProps,
  NsForm,
  NsForm as ValidatedForm,
  useFormContext,
  DefaultButtons,
} from './components/components/form/NsForm';
export {
  NsFormWrapper,
  NsFormWrapper as ValidatedFormWrapper,
} from './components/components/form/NsFormWrapper';
export {
  NsCheckbox,
  NsCheckbox as ValidatedCheckbox,
} from './components/components/form/fields/NsCheckbox';
export {
  NsRadio,
  NsRadio as ValidatedRadio,
} from './components/components/form/fields/NsRadio';
export {
  NsDateCalendar,
  NsDateCalendar as ValidatedDateCalendar,
} from './components/components/form/fields/NsDateCalendar';
export {
  NsDragDrop,
  NsDragDrop as ValidatedDragDrop,
} from './components/components/form/fields/NsDragDrop';
export {
  NsSelect,
  NsSelect as ValitatedSelect,
} from './components/components/form/fields/NsSelect';
export {
  NsSelectAutocomplete,
  NsSelectAutocomplete as ValidatedSelectAutocomplete,
} from './components/components/form/fields/NsSelectAutocomplete';
export {
  NsTextInput,
  NsTextInput as ValidatedTextInput,
} from './components/components/form/fields/NsTextInput';
export {
  NsTextArea,
  NsTextArea as ValidatedTextArea,
} from './components/components/form/fields/NsTextArea';
export {
  NsFileUpload,
  NsFileUpload as ValidatedFileUpload,
} from './components/components/form/fields/NsFileUpload';
export * from './components/components/form/validators';

/**
 * Notifier
 */
export * from './components/notifier/NotificationContext';
export * from './components/notifier/NotificationReducer';

/**
 * @deprecated
 * The "Notifier" component is deprecated, it will be removed starting with version 2.0 of astrea-react-ds.
 * use the "NsNotifier" component.
 */
export {
  NsNotifier,
  NsNotifier as Notifier,
} from './components/notifier/NsNotifier';

/**
 * Wizard
 *
 * @deprecated
 *  - "Wizard" component is deprecated, use "NsWizard"
 * @deprecated
 *  - "WizardFormStep" component is deprecated, use "NsWizardFormStep"
 * @deprecated
 *  - "WizardStep" component is deprecated, use "NsWizardStep"
 * @deprecated
 *  - "WizardProgressButtons" component is deprecated, use "NsWizardProgressButtons"
 * @deprecated
 *  - "WizardStepper" component is deprecated, use "NsWizardStepper"
 * @deprecated
 *  - "WizardStepperProps" interface is deprecated, use "NsWizardStepperProps"
 * will be removed starting with version 2.0 of astrea-react-ds.
 */
export {
  NsWizard,
  NsWizard as Wizard,
  NsWizardFormStep,
  NsWizardFormStep as WizardFormStep,
  NsWizardStep,
  NsWizardStep as WizardStep,
  NsWizardProgressButtons,
  NsWizardProgressButtons as WizardProgressButtons,
} from './components/wizard/NsWizard';
export {
  NsWizardStepper,
  NsWizardStepper as WizardStepper,
  NsWizardStepperProps,
  NsWizardStepperProps as WizardStepperProps,
} from './components/wizard/NsStepper';
export * from './components/wizard/WizardContext';
export * from './components/wizard/WizardReducer';

/**
 * Layouts
 */
/**
 * @deprecated
 * The "GridLayout" component is deprecated, it will be removed starting with version 2.0 of astrea-react-ds.
 * use the "NsGridLayout" component.
 */
export {
  NsGridLayout,
  NsGridLayout as GridLayout,
} from './components/layout/NsGridLayout';

/**
 * @deprecated
 * The "HttpStatus" component is deprecated, it will be removed starting with version 2.0 of astrea-react-ds.
 * use the "NsHttpStatus" component.
 * */
export {
  NsHttpStatus,
  NsHttpStatus as HttpStatus,
} from './components/layout/httpStatus/NsHttpStatus';

/**
 * @deprecated
 * The "Login" component is deprecated, it will be removed starting with version 2.0 of astrea-react-ds.
 * use the "NsLogin" component.
 */
export { NsLogin, NsLogin as Login } from './components/layout/login/NsLogin';

/**
 * Utils
 */
export * from './util/uniqueId';
export * from './util/types';

/**
 * Themes
 */
export { theme as NetServiceTheme } from './themes/NetServiceTheme';
export { BlueChiaTheme } from './themes/BlueChiaTheme';
export { GoldMinaTheme } from './themes/GoldMinaTheme';
