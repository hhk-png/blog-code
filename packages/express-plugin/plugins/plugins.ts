import fs from "fs";
// import { App } from "../server/server.js";

export default class Plugins {
  app: any;
  plugins: { [key: string]: any };
  constructor(app: any) {
    // super();
    this.app = app;
    this.plugins = {};
  }

  async loadFromConfig(path = './plugins.json') {
    const plugins = JSON.parse(fs.readFileSync(path, 'utf8')).plugins;
    for (const plugin of plugins) {
      if (plugin.enabled) {
        this.load(plugin.name);
      }
    }
  }

  async load(name: string) {
    try {
      const plugin = await import(`./${name}.js`);
      this.plugins[name] = plugin;
      await this.plugins[name].load(this.app);
      console.log(`Loaded plugin: '${plugin}'`);
    } catch(e) {
      console.log(`Failed to load plugin: '${name}'`);
      this.app.stop();
    }
  }

  unload(name: string) {
    if (this.plugins[name]) {
      this.plugins[name].unload();
      delete this.plugins[name];
      console.log(`Unloaded plugin: '${name}'`)
    }
  }

  stop() {
    for (let plugin in this.plugins) {
      this.unload(plugin);
    }
  }
}
