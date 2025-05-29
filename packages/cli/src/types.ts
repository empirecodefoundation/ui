export interface Config {
  style: string;
  rsc: boolean;
  tsx: boolean;
  tailwind: {
    config: string;
    css: string;
    baseColor: string;
    cssVariables: boolean;
    prefix: string;
  };
  aliases: {
    components: string;
    utils: string;
    ui: string;
    lib: string;
    hooks: string;
  };
}

export interface ComponentTemplate {
  name: string;
  dependencies: string[];
  files: {
    path: string;
    content: string;
  }[];
}
