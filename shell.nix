with import <nixpkgs> { };
mkShell {
  packages = [
    zola
    sops
    age
    terraform
  ];
  shellHook = ''
    echo "🚀 0xc1 Blog Environment!"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "zola:       $(zola --version)"
    echo "sops:       $(sops --version --check-for-updates)"
    echo "age:        $(age --version)"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "🔧 Project-specific commands:"
    echo "  zola serve               # Start local development server"
    echo "  npx czon build --lang zh-Hans --lang en-US --lang ja-JP --lang es-ES --lang de-DE"
    echo ""
    echo "💡 Tip: Use 'npx czon --help' & 'zola --help' for more commands"
    echo ""

    export OPENAI_MAX_TOKENS="8192"

    export PATH=$HOME/.opencode/bin:$PATH
    export PUB=$(cat ~/.ssh/id_ed25519.pub 2>/dev/null || echo \'\')
    export OPENAI_API_KEY=$(sops -d secrets/api_key.enc || echo 'NONE')
    alias czongen="npx czon build --lang zh-Hans --lang en-US --lang es-ES --lang ja-JP --lang de-DE"
  '';

  env = {
    # # Deepseek API configuration
    # OPENAI_BASE_URL='https://api.deepseek.com';
    # OPENAI_MODEL='deepseek-chat'
    # ----------------
    # silicon flow Deepseek API configuration
    OPENAI_BASE_URL="https://api.deepseek.com";
    OPENAI_MODEL="deepseek-v4-pro";
  };
}
