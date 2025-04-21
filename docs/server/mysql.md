# MySQL

## 构建docker容器
```bash
docker run  \
  --name gbf.mysql  \
  --restart always  \
  --network gbf.net  \
  -v mysql.volume:/var/lib/mysql  \
  -p 3306:3306  \
  -p 33060:33060  \
  -e LANG=C.UTF-8  \
  -e MYSQL_ROOT_PASSWORD=gbf  \
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
CREATE DATABASE database_name;
USE database_name;
SHOW TABLES;
DESC table_name;
SELECT VERSION();

# 显示建表语句
SHOW CREATE TABLE gbf_member_code;

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
ALTER TABLE gbf_member_code ADD COLUMN new_column INT COMMENT '新字段';
CREATE INDEX idx_status ON gbf_member_code(status);
OPTIMIZE TABLE gbf_member_code;

# 查询示例
SELECT * FROM gbf_member_code WHERE status = 0 ORDER BY creat_time DESC LIMIT 10;
UPDATE gbf_member_code SET status = 1 WHERE code = 'XXX';
DELETE FROM gbf_member_code WHERE redeem_time < 1717027200;
```

## 建表语句
```sql
CREATE TABLE `gbf_member_code` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(32) NOT NULL COMMENT '激活码(UUID格式)',
  `account_id` bigint DEFAULT NULL COMMENT '使用用户ID',
  `days` int unsigned NOT NULL COMMENT '激活天数',
  `create_time` bigint unsigned NOT NULL COMMENT '创建时间',
  `export_time` bigint unsigned DEFAULT NULL COMMENT '导出时间',
  `redeem_time` bigint unsigned DEFAULT NULL COMMENT '激活时间',
  `status` tinyint NOT NULL DEFAULT '0' COMMENT '状态（0-未使用,1-已使用）',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `idx_code` (`code`),
  KEY `gbf_member_code_account_id_fkey` (`account_id`),
  CONSTRAINT `gbf_member_code_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `gbf_member_user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='激活码表'
```

```sql
CREATE TABLE `gbf_member_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
  `account_token` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
  `create_time` bigint NOT NULL,
  `expire_time` bigint DEFAULT NULL,
  `password` varchar(768) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` int DEFAULT NULL,
  `uid` varchar(32) COLLATE utf8mb4_general_ci NOT NULL,
  `update_time` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_account` (`account`),
  UNIQUE KEY `uniq_account_token_uid` (`account_token`,`uid`),
  KEY `idx_account_token` (`account_token`),
  KEY `idx_uid` (`uid`),
  KEY `idx_create_time` (`create_time`),
  KEY `idx_update_time` (`update_time`)
) ENGINE=InnoDB AUTO_INCREMENT=643 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
```
