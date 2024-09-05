# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [v1.9.1](https://github.com/netservicespa/astrea-react-ds/commit/823cd7a44363a2291ab08a65a6e1741d3bea585b) (Mar 27 2024)

## Fixes

- **NsDateCalendar**:
  - Fixed locale issues by adding the `adapterLocale` property.

- **NsFeedback**:
  - Corrected icon size and padding.

- **Themes**:
  - Resolved an error associated with locale settings.


# [v1.9.0](https://github.com/netservicespa/astrea-react-ds/commit/5cf4760144df5d166f457758bb143141e871c673) (Mar 18 2024)

## Improved

- **NsModal**:
  - Adjusted backdrop color and modal title font sizes.
- **ValidatedCheckbox**:
  - Added a "Select all / Deselect all" version in the story.
- **NsFeedback**:
  - Updated line height on the feedback component.
- **MuiAlert**:
  - Updated the `MuiAlert` configuration in theme files to ensure proper operation of the Feedback component.
- **Functional Enhancements**:
  - Exported components and hooks including `NsFormProps`, `NsForm`, `NsWizardStepper`, `NsWizardStepperProps`, `DefaultButtons`, and `useFormContext`.
  - Introduced aliasing for certain components and interfaces for backward compatibility, including `ValidatedForm`, `FormProps`, `WizardStepperProps`, `WizardStepper`.

- **Storybook Enhancements**:
  - Sorted the order of sections, placing "Patterns" before "Layouts."
  - Enabled code display by default in Storybook.
  - Added the Astrea theme.
  - Adjusted the date format for Italian display in the datepicker.
  - Improved padding for `NsSelectAutocomplete`.

- **Renaming and Deprecation**:
  - Renamed components with the `Ns` prefix to unify naming conventions, including:
    - UserPanel to **NsUserPanel**
    - HttpStatus to **NsHttpStatus**
    - GridLayout to **NsGridLayout**
    - LabelInput to **NsLabelInput**
    - DragDrop to **NsDragDrop**
    - Notifier to **NsNotifier**
    - Login to **NsLogin**
    - FileUpload to **NsFileUpload**
    - Errors to **NsErrors**
    - ValidatedCheckbox to **NsCheckbox**
    - ValidatedDateCalendar to **NsDateCalendar**
    - ValidatedDragDrop to **NsDragDrop**
    - ValidatedFileUpload to **NsFileUpload**
    - ValidatedRadio to **NsRadio**
    - ValidatedSelect to **NsSelect**
    - ValidatedSelectAutocomplete to **NsSelectAutocomplete**
    - ValidatedTextArea to **NsTextArea**
    - ValidatedTextInput to **NsTextInput**
    - ValidatedForm to **NsForm**
    - Wizard to **NsWizard**
    - WizardFormStep to **NsWizardFormStep**
    - WizardStep to **NsWizardStep**
    - WizardProgressButtons to **NsWizardProgressButtons**
  - Components without the `Ns` prefix are still there, added deprecation messages for renamed components, from **version 2.0** components without the prefix `Ns` will be removed.

- **Refactors**:
  - Removed all warnings during build (using `pnpm build`).
  - Removed unused code, including console logs.
  - Exported props interfaces and fixed imports.
  - Updated the `NsPanel` component and `readme.md` documentation.

# [v1.8.1](https://github.com/netservicespa/astrea-react-ds/commit/21275c55b9db9186aef2ba2985a8342009d9e481) (Feb 28 2024)
## Fixed

- **NsFeedback**:
   - Fixed line height and updated other CSS rules in the `NsFeedback` component

# [v1.8.0](https://github.com/netservicespa/astrea-react-ds/commit/21275c55b9db9186aef2ba2985a8342009d9e481) (Feb 26 2024)
 ## Improved

- **Themes**:
  - Added two new themes: **BlueChia** and **GoldMina**.

- **NsFeedback**:
  - Updated and improved the NsFeedback component functionality.
  - Ensured proper operation of the NsFeedback component with BlueChia and GoldMina themes.

- **Functional Enhancements**:
  - Renamed DropDown component to **NsDropDown**.
  - Renamed ConfirmPage component to **NsConfirmPage**.
  - Renamed Pagination component to **NsPagination**.
  - Renamed Notification component to **NsNotification**.
  - Renamed Panel component to **NsPanel**.
  - Renamed FullPageSpinner component to **NsFullPageSpinner**.
  - Renamed PageHeader component to **NsPageHeader**.
  - Removed some warnings during build (`pnpm build`) and unused imports.
  - Fixed type on `ValidatedDateCalendar`.
  - Fixed type on `ValidatedSelect`.
  - Fixed broken imports in storybook.
  - Exported **BluChiaTheme** and **GoldMinaTheme** themes.
  - Migrated to version 7.6.17 of storybook.

- **UI/UX Improvements**:
  - **Login Layout**:
    - `Classic` version: Moved the menu logo to be centered as it was off-center before.
    - Removed the "Reset" button.
    - Made Username and Password fields mandatory by adding the classic asterisk before the label.
    - `Form` version: Removed rounded borders on the left panel.
    - Corrected broken logo image.
    - `Link` version: Adjusted the "Login" title closer to the button.
  
  - **Tags**:
    - Improved style (colors, font, and padding) and set the "Type" property with variants (Default, Success, Warning, Error).

- **Storybook**:
  - Applied Titillium font throughout.
  - Enabled dark-mode and created a theme for dark mode.
  - Enabled Sass for CSS with dependencies installed: `css-loader`, `resolve-url-loader`, `sass`, `sass-loader`, `style-loader`.
  - Updated the menu item order.
  - Removed duplicate MDX documentation for `Typography` and `Colour`.

## Fixed

- **ValidatedRadio**:
  - Fixed an issue with radios having multiple selections instead of the normal single selection behavior expected of a radio button.

# [v1.7.2](https://github.com/netservicespa/astrea-react-ds/commit/f5ee9af10e6bc0de990ce86da30baf732a841304) (Feb 7 2024)
  ## Fixed

- **ValidateFileUpload**:
  - Resolved issue where multiple instances on the same page shared the same ID, leading to only the first one functioning correctly. Implemented dynamic ID assignment to ensure each instance operates independently.

# [v1.7.1](https://github.com/netservicespa/astrea-react-ds/commit/da9e8d0e4b2e2261ce5a2c68d46896158d042ce3) (Jan 31 2024)
 ## Fixed

- **NsTableAdvanced**:
  - Remove NsTableAdvanced (not used)

# [v1.7.0](https://github.com/netservicespa/astrea-react-ds/commit/13535f782a9a1548b6ea8cf65f89482199444a9d) (Jan 31 2024)
 ## Improved

- **NsTable**:
  - Enabled the `<br>` tag in table cells.
  - Added the story of Table Advanced and Table Classic.

- **Forms**:
  - Enhanced the styling of forms for better aesthetics and user interaction.

- **UI/UX Improvements**:
  - **Button**
    - Respected button font sizes: LARGE 22px (1.375 rem), MEDIUM 20px (1.25 rem), SMALL 18px (1.125 rem).
    - Outlined: focus adjusted to be inside the border - Button font changed to semibold.
    - Primary buttons: Changed to green background with white text. Updated green to `#226157` for AAA compliance.
    - Secondary buttons: Updated text on background color for AAA compliance. Recommended green changed to `#264A4F`.
    - Warning button: Updated the red color to a darker shade for better visibility. New color: `#A82916`.
    - Disabled buttons: Grey color intensified for better visibility. New color: `#595959`.

  - **Pagination**
    - Increased text size to 1.125 rem.
    - Selected page background color changed to light green `#cce2df` with a bottom border 3px solid in dark green `#2e5a60`. Font-color updated to `#2e5a60`.
    - Added a border around the page number.
    - Changed the clickable area to be 44x44px.
    - Uniformed font size across all elements to match the input font size.

  - **Spinner**
    - Renamed spinner story to "Loader" as per the design system documentation.
    - Created two versions (light and green background) as per DS and ensured that opacity of label and spinner is at 100%
    - Removed unnecessary element

  - **Page Header**
    - Removed the X to close the panel.
    - Removed documentation "Page Header Stories".
    - Fixed font and changed it to Tittillium Web.
    - Corrected broken image and inserted black Astrea logo.
    - Changed texts to avoid hardcoded texts.
    - Removed padding for full width display and top alignment.

- **Update Dependency**:
  - Upgrading Typescript version from v4.8.4 to v4.9.5.
  - Removed the `yarn.lock` file since there is already a `pnpm-lock.yaml`.

## Fixed

- **Textarea**:
  - Fixed issues with Textarea validation UI to show border in red when it is in error.

# [v1.6.0](https://github.com/netservicespa/astrea-react-ds/commit/2b262da31eb20d26dfd34442fc0b8fac8da69437) (Jan 15 2024)
## Improved

-   **MDX**:
    
    -   Added MDX documentation for:
        - Feedback
        - ValidatedSelectAutocomplete
        - ValidatedCheckBox
        - ValidatedDateCalendar
        - ValidatedSelect
        - Typography

-   **DragDrop**:
    
    -   Transitioned from using `div` tags to `Box` tags for a more structured layout.
    -   Removed the left margin to align content properly within the container.
    -   Updated the placeholder text "No file has been uploaded" to use the color code `#333`.

-   **Forms**:
    
    -   Enhanced the styling of forms for better aesthetics and user interaction.

-   **Storybook UI Enhancements**:
    
    -   Overall improvements to the Storybook user interface for a more seamless experience.
    - Introduced a new "Tools" category featuring GridLayout and HttpStatus components

## Fixed

-   **ValidatedCheckbox Component**:
    -   Fixed issues with value handling in the ValidatedCheckbox component

## New Additions

-   **NsTable**:
    -   Introduced a new component, `NsTable`, which is based on the MUI table

# [v1.5.1](https://github.com/netservicespa/astrea-react-ds/commit/dbcacbfd6c78ca57d11d9c8bcb4b6ab8ba80e2e0) (Dec 12 2023)
 ## Fixed

-   **Exports**:
    - Exported `PaginationComponent` in the `index.ts`.
    - Exported `DropdownComponent` in the `index.ts`.

# [v1.5.0](https://github.com/netservicespa/astrea-react-ds/commit/70617fc8066267076d40513008cc3bbc6f377742) (Dec 11 2023)
## Improved

-   **MDX**:
    -   Added MDX documentation for:
        - Skip Link
        - Dropdown
        - Card
        - Accordion
        - Button

-   **Tab**:
    - Borders of `TabPanel` and `Tabs` now use colors from `theme.palette`.
    - Increased minimum height of tabs from `40px` to `43px`.
    - Enabled keyboard navigation focus on tabs with internal `box-shadow` indicating the selected tab.
    - Made all tabs focusable by adding `tabIndex={0}`.

-   **Tooltip**:
    - Introduced the Tooltip component.

## Fixed

-   **Drag-and-Drop Component**:
    - Updated translation label from `dragDrop.labels.rilasciaFile` to `dragDrop.labels.releaseFile` for consistency.

# [v1.4.0](https://github.com/netservicespa/astrea-react-ds/commit/52be6521db0392ff794b5c92b054a8c489139877) (Nov 30 2023)
## Improved

- **FileUpload**:
  - Removed the black border around and bottom border of default on `FileUpload.tsx`.
  - Added `FileUploadProps` interface on `FileUpload.tsx`.

- **DragDrop**:
  - Removed `toUpperCase()` in translation label: `dragDrop.labels.loadFromFile`.
  - Added the `dragDrop.uploadedFile` label.
  - Decreased the font size for the `dragDrop.noFile` label from h4 to h6.

## Fixed

- **Exports**: 
  - Exported `ValidatedTextArea` in the `index.ts`.
  - Exported `ValidatedFileUpload` in the `index.ts`.


# [v1.3.0](https://github.com/netservicespa/astrea-react-ds/commit/152ac3ca5e27fb43417122399765b37de1ea9ea8) (Nov 28 2023)
## Improved

- **ValidatedCheckbox**:
  - Added `sx` prop for style extensions.
  - Updated `label` prop to accept `React.ReactNode`, enabling the use of React components as labels.
- **ValidatedTextArea**:
  - Introduced a new component, `ValidatedTextArea`, for enhanced text area functionality.

## Fixed

- **ValidatedSelectAutocomplete**:
  - Fixed an issue where options were rendering twice.
  - **Important Change**: To ensure optimal performance and functionality, it is now required to use `useMemo` for the `items` of the select. This change is crucial for maintaining efficient rendering behavior.


# [v1.2.0](https://github.com/netservicespa/astrea-react-ds/commit/6f4b7b034845ece78fd7750ffc8cfb39638618d6) (Nov 27 2023)
# Improved
Made Wizard component more customizable:
 * the Stepper component is now swappable via slot prop
 * the Wizard root component now exposes all of MUI Box props, allowing the user some degree of customization
 * Improved the useWizard hook to allow specifying the wizard payload type as a type parameter

# [v1.1.1](https://github.com/netservicespa/astrea-react-ds/commit/7d5815b7f134b63afa56343b189d3e301c0c6e6f) (Nov 23 2023)
# Fixed
  * translations

# [v1.1.0](https://github.com/netservicespa/astrea-react-ds/commit/e806528c8caca518938d127077ebb958c7389d9e) (Nov 23 2023)
# Improved
  * update relay-forms dependency
