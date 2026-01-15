with import <nixpkgs> { };
mkShell {
  nativeBuildInputs = [
    zola
  ];
  shellHook = ''
    # # Deepseek API configuration
    # export OPENAI_API_KEY='sk-44ede23dbc804f81a9f8dbeb5826616d'
    # export OPENAI_BASE_URL='https://api.deepseek.com'
    # export OPENAI_MODEL='deepseek-chat'

    # silicon flow Deepseek API configuration
    export OPENAI_API_KEY='sk-jybvfwuisbnloedovfevuroyxxdvtphueqdikmcnepqnrjhv'
    export OPENAI_BASE_URL='https://api.siliconflow.cn/v1'
    export OPENAI_MODEL='Pro/deepseek-ai/DeepSeek-V3.2'

    export OPENAI_MAX_TOKENS="8192"

    export PATH=$HOME/.opencode/bin:$PATH
  '';
}
