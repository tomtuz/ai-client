declare module "eslint-plugin-react" {
  import type { Rule } from "eslint";
  const plugin: Omit<ESLint.Plugin, "configs"> & {
    deprecatedRules;
    rules: Record<string, Rule.RuleModuleRecord<string, Rule.RuleModule>>;
    configs: Record<string, ESLint.ConfigData>;
    // configs: {
    //   recommended: {
    //     plugins: any,
    //     parserOptions: any,
    //     rules: any,
    //   },
    //   all: {
    //     plugins: any,
    //     parserOptions: any,
    //     rules: any,
    //   },
    //   'jsx-runtime': {
    //     plugins: any,
    //     parserOptions: any,
    //     rules: any,
    //   }
    // },
  };
  export default plugin;
}
