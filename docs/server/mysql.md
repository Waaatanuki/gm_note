# MySQL

## 构建docker容器
```bash
docker run  \
  --name gbf.mysql  \
  --restart always  \
  --network gbf.net  \
  -v mysql_volume:/var/lib/mysql  \
  -p 3306:3306  \
  -p 33060:33060  \
  -e LANG=C.UTF-8  \
  -e MYSQL_ROOT_PASSWORD=***  \
  -d mysql:8.4  \
  --character-set-server=utf8mb4  \
  --collation-server=utf8mb4_general_ci  \
  --default_time_zone=Asia/Shanghai
```
## 常用命令
```bash
# 连接MySQL服务器（在宿主机执行）
docker exec -it gbf.mysql mysql -u root -p

# 基础操作
SHOW DATABASES;
USE database_name;
SHOW TABLES;
DESC table_name;
SELECT VERSION();

# 用户权限管理
CREATE USER 'username'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'username'@'%';
FLUSH PRIVILEGES;

# 备份与恢复
# 备份整个数据库（在宿主机执行）
docker exec gbf.mysql sh -c 'exec mysqldump --all-databases -uroot -p"$MYSQL_ROOT_PASSWORD"' > backup.sql

# 从备份恢复（在宿主机执行）
docker exec -i gbf.mysql sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD"' < backup.sql

# 表操作示例
ALTER TABLE gbf_code ADD COLUMN new_column INT COMMENT '新字段';
CREATE INDEX idx_status ON gbf_code(status);
OPTIMIZE TABLE gbf_code;

# 查询示例
SELECT * FROM gbf_code WHERE status = 0 ORDER BY creat_time DESC LIMIT 10;
UPDATE gbf_code SET status = 1 WHERE code = 'XXX';
DELETE FROM gbf_code WHERE redeem_time < 1717027200;
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
