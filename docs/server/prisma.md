# Prisma

## 常用命令
```bash
# 初始化Prisma项目
npx prisma init

# 生成Prisma客户端
npx prisma generate

# 创建并应用数据库迁移
npx prisma migrate dev --name init

# 查看迁移状态
npx prisma migrate status

# 重置数据库并应用所有迁移
npx prisma migrate reset

# 启动Prisma Studio（可视化数据管理）
npx prisma studio

# 生成数据模型文档
npx prisma-docs-generator

# 拉取数据库Schema到Prisma Schema文件
npx prisma db pull

# 推送Schema变更到数据库（不生成迁移）
npx prisma db push

# 验证Prisma Schema文件
npx prisma validate

# 生成ER图
npx prisma-erd-generator --version
```
