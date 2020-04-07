// ref: https://github.com/Kiikurage/babel-plugin-flow-to-typescript/blob/master/src/types/babel-plugin-tester.d.ts
declare namespace pluginTester {
  export interface TesterOption {
      plugin: any;
      filename: any;
      snapshot?: boolean;
      pluginOptions?: {
        minJSONStringSize: number
      };
      tests: Test[];
  }

  export interface Test {
      title?: string;
      pluginOptions?: {
        minJSONStringSize: number
      };
      code?: string;
      output?: string;
      snapshot?: boolean;
      fixture?: string;
      outputFixture?: string;
  }
}

declare module 'babel-plugin-tester' {
  export default function pluginTester(option: pluginTester.TesterOption): void;
}
