# Docker

## 常用命令
```bash
# 查看版本信息
docker version

# 拉取镜像
docker pull <image_name>:<tag>

# 运行容器（示例）
docker run -d -p 80:80 --name my_container <image_name>

# 查看正在运行的容器
docker ps

# 查看所有容器（包括已停止的）
docker ps -a

# 启动/停止容器
docker start <container_id>
docker stop <container_id>

# 进入容器终端
docker exec -it <container_id> /bin/bash

# 查看容器日志
docker logs <container_id>

# 删除容器/镜像
docker rm <container_id>
docker rmi <image_id>

# 查看网络列表
docker network ls

# 查看镜像列表
docker images
```

## Volume管理
```bash
# 创建数据卷
docker volume create mysql_volume

# 查看所有数据卷
docker volume ls

# 删除数据卷
docker volume rm <volume_name>

# 清理未使用的数据卷
docker volume prune
```

## 容器监控
```bash
# 查看容器资源使用情况
docker stats

# 查看容器进程列表
docker top <container_id>
```
