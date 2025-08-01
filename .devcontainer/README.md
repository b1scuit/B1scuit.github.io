# Development Container for Peter Holt Portfolio

This devcontainer provides a complete development environment for the React TypeScript portfolio project.

## Features

### Development Environment
- **Node.js 18** - Latest LTS version for optimal performance
- **Oh My Zsh** - Enhanced terminal experience with useful plugins
- **Global Tools**: TypeScript, ESLint, Prettier, Vite CLI
- **Git & GitHub CLI** - Version control and GitHub integration

### VS Code Extensions
- **TypeScript**: Advanced TypeScript support and IntelliSense
- **ESLint**: Code linting and error detection
- **Prettier**: Automatic code formatting
- **Path IntelliSense**: Autocomplete for file paths
- **Auto Rename Tag**: Automatically rename paired HTML/JSX tags
- **Import Cost**: Display import/require package sizes
- **Error Lens**: Highlight errors and warnings inline
- **Spell Checker**: Catch typos in code and comments

### Port Configuration
- **5173**: Vite development server (auto-forwarded with notifications)
- **4173**: Vite preview server (for testing production builds)

### Optimizations
- **Volume Mount**: `node_modules` stored in named volume for faster rebuilds
- **Auto Install**: Dependencies installed automatically on container creation
- **Pre-configured Settings**: Consistent formatting, linting, and editor behavior

## Usage

### Prerequisites
- [Docker](https://www.docker.com/get-started)
- [VS Code](https://code.visualstudio.com/)
- [Dev Containers Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### Getting Started

1. **Open in Container**
   ```bash
   # Clone the repository
   git clone https://github.com/b1scuit/B1scuit.github.io.git
   cd B1scuit.github.io
   
   # Open in VS Code
   code .
   ```

2. **Launch Devcontainer**
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "Dev Containers: Reopen in Container"
   - Select the command and wait for container to build

3. **Start Development**
   ```bash
   # Development server (auto-starts on port 5173)
   npm run dev
   
   # Or use the convenient alias
   dev
   ```

### Available Commands

```bash
# Development
npm run dev          # Start dev server
dev                  # Alias for npm run dev

# Building
npm run build        # Build for production
build               # Alias for npm run build

# Preview
npm run preview     # Preview production build
preview            # Alias for npm run preview

# Code Quality
npm run lint        # Run ESLint
lint               # Alias for npm run lint
```

### Container Features

- **Automatic Dependency Installation**: `npm install` runs on container creation
- **Port Forwarding**: Development server automatically accessible from host
- **Volume Persistence**: `node_modules` cached between container rebuilds
- **Git Configuration**: Pre-configured (customize as needed)
- **Zsh Shell**: Enhanced terminal with Oh My Zsh and useful aliases

### Customization

#### Git Configuration
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

#### Additional Extensions
Add extensions to `.devcontainer/devcontainer.json`:
```json
{
  "customizations": {
    "vscode": {
      "extensions": [
        "your.extension.id"
      ]
    }
  }
}
```

## Troubleshooting

### Container Won't Start
- Ensure Docker is running
- Check Docker has sufficient resources allocated
- Try rebuilding: `Ctrl+Shift+P` → "Dev Containers: Rebuild Container"

### Port Issues
- Ensure ports 5173 and 4173 aren't in use on host machine
- Check port forwarding in VS Code's "Ports" panel

### Performance Issues
- Increase Docker memory allocation (4GB+ recommended)
- Named volume for `node_modules` should improve performance
- Consider using Docker Desktop's "Use Rosetta for x86/amd64 emulation" on Apple Silicon

## Development Workflow

1. **Make Changes**: Edit files in VS Code with full IntelliSense
2. **Auto-Format**: Files format on save with Prettier
3. **Live Reload**: Vite hot-reloads changes automatically
4. **Lint Check**: ESLint highlights issues in real-time
5. **Build Test**: Run `npm run build` before committing
6. **Preview**: Use `npm run preview` to test production build

The devcontainer provides a consistent, feature-rich development environment that works the same across different machines and operating systems.