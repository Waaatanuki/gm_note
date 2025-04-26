# Redis

## 构建docker容器
```bash
docker run \
  --name gbf.redis \
  --restart always \
  --network gbf.net \
  -p 6379:6379 \
  -v redis.volume:/data \
  -d redis:7.4-alpine \
  redis-server \
  --save 60 100 \
  --loglevel warning \
  --maxmemory 2gb \
  --maxmemory-policy allkeys-lru
```

## 常用命令
```bash
# 进入 Redis 容器命令行
docker exec -it gbf.redis redis-cli

# 执行 Redis 命令
KEYS *       # 查看所有键
GET "key1"   # 查看指定键值
SCAN 0       # 分页扫描键（适合大数据量）
TYPE "key1"  # 查看键的数据类型
DEL "key1"   # 删除键
EXISTS "key1" # 检查键是否存在
EXPIRE "key1" 60 # 设置键的过期时间（秒）
```
