# Empire UI CLI

A command-line interface for adding Empire UI components to your Next.js projects.

## Installation

You can install the CLI globally using npm:

```bash
npm install -g @empireui/empire-ui
```

Or use it directly with npx:

```bash
npx @empireui/empire-ui <command>
```

## Commands

### Initialize Empire UI

Sets up Empire UI in your project by creating necessary configuration files and directories.

```bash
npx @empireui/empire-ui init
```

This will:

- Create `components.json` configuration file
- Set up required directories (components/ui, lib)
- Create Tailwind CSS configuration
- Add necessary CSS variables and styles

### Add Components

Add pre-built components to your project:

```bash
npx @empireui/empire-ui add <component>
```

Example:

```bash
npx @empireui/empire-ui add button
```

Available components:

- button
- dialog
- dropdown-menu
- input
- label
- select
- textarea
- toast

Options:

- `--overwrite`: Overwrites existing component files (default: false)

## Project Requirements

- Next.js 13+
- Tailwind CSS
- TypeScript

## Directory Structure

After initialization, Empire UI will create the following structure:
