# 🎉 Pull Request Contribution Guide

Thank you for contributing to **Empire UI**! We’re excited to see your contributions and want to make sure the process is as smooth as possible. Please follow the guidelines below when submitting a pull request (PR) to help us review and merge your changes quickly. 🚀

## 📝 General Guidelines

1. **🔖 Title your PR Clearly:**
   - Use a descriptive title that summarizes the changes made.
   - Follow the convention: `type(scope): description`.
     - Example: `feat(button): add AI-ready tooltip component`.

2. **📄 Detailed Description:**
   - Provide a brief overview of what the PR does.
   - Clearly list the specific files and components you’ve added or modified.
   - Mention any dependencies or external libraries required by your changes.
   - Include the purpose of the changes and the expected outcome.
   - Reference any relevant issues by including `Closes #issue-number` if your PR resolves a specific issue.

3. **📂 Required Files:**
   - **Component File:** Include the `.tsx` component file in the appropriate directory.
   - **Route File:** Add the corresponding `route.ts` file, containing the routing logic for the component.
   - **.env Information:** Provide any necessary environment variables that need to be added to the `.env` file. Include a description of what each variable does.
   - **Relevant Installs:** If your component requires any new packages, update the `package.json` file and list the necessary installations in your PR description.

4. **🔧 Formatting and Naming Conventions:**
   - Follow the existing code style and naming conventions used in the repository.
   - Components should be named in `PascalCase`, and routes should follow the existing convention.
   - Ensure your code is clean and well-documented, with comments where necessary to explain complex logic.

5. **🧪 Testing Your Component:**
   - Test your component thoroughly in a local environment before submitting the PR.
   - Ensure it integrates seamlessly with other components in the library.
   - If applicable, include test files and ensure they pass by running `pnpm test` before submission.

6. **💬 Commit Messages:**
   - Write meaningful commit messages using the following convention: `type(scope): message`.
   - Example: `fix(button): correct alignment issue in AI tooltip`.
   - Squash multiple commits if necessary to keep the commit history clean.

## ✅ Checklist for PR Submission

Before submitting your PR, please ensure the following:

- [ ] **Component File:** The `.tsx` component file is included and located in the correct directory.
- [ ] **Route File:** The corresponding `route.ts` file is added and properly configured.
- [ ] **Environment Variables:** Any required `.env` variables are documented and explained in the PR description.
- [ ] **Dependencies:** All necessary packages are added to `package.json`, and the installation steps are described.
- [ ] **Testing:** The component has been tested locally, and tests have been included where applicable.
- [ ] **Documentation:** Update the documentation if your component requires specific usage instructions.

## 📄 Example Pull Request Template

Here’s a template you can use when creating a new PR:

```markdown
### Title: `feat(component-name): add [feature/component-name]`

#### Description:
- **Overview:** [Brief overview of the changes made]
- **Files Added/Modified:**
  - `components/[ComponentName].tsx`
  - `routes/[route-name].ts`
- **Environment Variables:** [List any new `.env` variables]
- **Dependencies:** [List any new packages required]
- **Testing:** [Describe how you tested your changes]

#### Checklist:
- [ ] Component file added/modified.
- [ ] Route file added/modified.
- [ ] Environment variables documented.
- [ ] Dependencies added to `package.json`.
- [ ] Component tested locally and integrated.
