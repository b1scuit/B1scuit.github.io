# Use the official Node.js 18 image as base
FROM node:18-bullseye

# Install additional system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    vim \
    nano \
    zsh \
    build-essential \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Install Oh My Zsh for better terminal experience
RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

# Set up zsh as default shell for the node user
RUN chsh -s $(which zsh) node

# Install global npm packages for development
RUN npm install -g \
    npm@latest \
    typescript \
    ts-node \
    @vitejs/create-vite \
    eslint \
    prettier \
    serve

# Create workspace directory
RUN mkdir -p /workspace && chown -R node:node /workspace

# Switch to node user
USER node

# Set working directory
WORKDIR /workspace

# Configure git for the node user (these can be overridden)
RUN git config --global user.email "developer@example.com" && \
    git config --global user.name "Developer"

# Set up Oh My Zsh configuration for node user
RUN echo 'export ZSH="$HOME/.oh-my-zsh"' >> ~/.zshrc && \
    echo 'ZSH_THEME="robbyrussell"' >> ~/.zshrc && \
    echo 'plugins=(git node npm vscode)' >> ~/.zshrc && \
    echo 'source $ZSH/oh-my-zsh.sh' >> ~/.zshrc && \
    echo 'alias dev="npm run dev"' >> ~/.zshrc && \
    echo 'alias build="npm run build"' >> ~/.zshrc && \
    echo 'alias preview="npm run preview"' >> ~/.zshrc && \
    echo 'alias lint="npm run lint"' >> ~/.zshrc

# Set default shell to zsh
ENV SHELL /bin/zsh

# Expose common development ports
EXPOSE 5173 4173 3000

# Set default command
CMD ["/bin/zsh"]