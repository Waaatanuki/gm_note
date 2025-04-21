# Mongo

## 构建docker容器
```bash
docker run  \
  --name gbf.mongo \
  --restart always \
  --network gbf.net \
  -p 27017:27017 \
  -v mongo.volume:/data/db \
  -v /etc/mongo/mongod.conf:/etc/mongo/mongod.conf \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=gbf \
  -e LANG=C.UTF-8 \
  -d mongo:8.0.6-noble \
  --config /etc/mongo/mongod.conf
```

## 常用命令
```bash
# 连接MongoDB服务器（宿主机执行）
docker exec -it gbf.mongo mongosh -u root -p gbf

# 数据库操作
show dbs
use gbf_db
db.stats()

# 集合操作
db.createCollection("codes")
show collections
db.codes.drop()

# 文档CRUD示例
# 插入文档
db.codes.insertOne({
    code: "XXXX-XXXX-XXXX",
    account_id: NumberLong(123456),
    creat_time: new Date().getTime(),
    status: 0
})

# 查询文档
db.codes.find({ status: 0 }).sort({ creat_time: -1 }).limit(10)
db.codes.findOne({ code: "XXXX-XXXX-XXXX" })

# 更新文档
db.codes.updateOne(
    { code: "XXXX-XXXX-XXXX" },
    { $set: { status: 1, redeem_time: new Date().getTime() } }
)

# 删除文档
db.codes.deleteMany({ creat_time: { $lt: 1717027200 } })

# 索引管理
db.codes.createIndex({ code: 1 }, { unique: true })
db.codes.createIndex({ status: 1, creat_time: -1 })
db.codes.getIndexes()

# 用户权限管理
db.createUser({
    user: "admin",
    pwd: "password",
    roles: [ { role: "readWrite", db: "gbf_db" } ]
})

# 备份与恢复（宿主机执行）
# 备份整个数据库
docker exec gbf.mongo sh -c 'exec mongodump -u root -p gbf --archive' > backup.gz

# 从备份恢复
docker exec -i gbf.mongo sh -c 'exec mongorestore -u root -p gbf --archive' < backup.gz
```

## 建表语句
```sql
CREATE TABLE gbf_code (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(36) NOT NULL UNIQUE COMMENT '激活码(UUID格式)',
    account_id BIGINT NULL COMMENT '使用用户ID',
    creat_time BIGINT NOT NULL COMMENT '创建时间',
    redeem_time BIGINT NULL COMMENT '激活时间',
    days INT NOT NULL COMMENT '激活天数',
    status TINYINT NOT NULL DEFAULT 0 COMMENT '状态（0-未使用,1-已使用,3-禁用）',

    INDEX idx_code (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='激活码表';
```sql
