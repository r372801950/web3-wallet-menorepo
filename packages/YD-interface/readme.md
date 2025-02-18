nvm ls  20.13.1

pnpm -v 9.15.5

pnpm init

Web3 前端项目架构文档
技术栈
核心技术

React 19
TypeScript
Tailwind CSS
Web3 相关: wagmi v2, viem, ethers v5
React Query (Tanstack Query)

构建工具

Webpack 5 作为主要构建工具
SWC 替代 Babel 进行代码转译（更快的编译速度）
PostCSS 处理 CSS
pnpm 作为包管理器

项目特性
1. 高性能构建系统

使用 SWC (Rust-based) 替代 Babel，提供更快的编译速度
开发环境和生产环境分离配置
CSS 提取和优化
资源模块处理（图片、字体等）

2. 开发体验优化

TypeScript 路径别名配置
友好的错误提示
热更新支持
进度条显示
环境变量支持 (.env)

3. 代码质量保证

Jest 测试框架集成
UI 差异测试 (BackstopJS)
TypeScript 严格模式
代码覆盖率报告

项目结构
Copysrc/
├── abis/          # 智能合约 ABI 文件
├── components/    # 可复用组件
├── connections/   # Web3 连接相关
├── hooks/         # 自定义 Hooks
├── pages/         # 页面组件
├── utils/         # 工具函数
└── types/         # TypeScript 类型定义
构建配置
Webpack 配置特点

环境分离（开发/生产）
CSS 处理优化

MiniCssExtractPlugin 提取 CSS
PostCSS 处理
Tailwind CSS 集成


别名配置，简化导入路径
静态资源处理
清理打包目录
环境变量注入

命令说明
bashCopy# 开发构建
pnpm clent:dev

# 开发服务器
pnpm clent:server

# 生产构建
pnpm clent:prod

# UI 差异测试
pnpm test:uidiff

# 单元测试
pnpm test
Web3 功能

Metamask 集成
wagmi v2 hooks 支持
ethers v5 集成
ConnectKit UI 组件

样式方案

Tailwind CSS 配置
主题变量支持
PostCSS 处理
CSS 模块化

测试策略

Jest 单元测试
BackstopJS 视觉回归测试
测试覆盖率报告生成
Jest Stare 报告集成

项目依赖管理

使用 pnpm 作为包管理器
版本锁定 (pnpm-lock.yaml)
工作空间支持

最佳实践

使用 TypeScript 严格模式
组件化开发
路径别名使用
环境变量管理
Web3 最佳实践集成

注意事项

node_modules 使用 pnpm 安装
需要配置 .env 文件
确保 Node.js 版本兼容性
Web3 钱包配置检查
