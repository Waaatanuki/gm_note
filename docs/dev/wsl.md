# WSL

## 常用命令

### 安装与配置
```bash
# 安装WSL（需要管理员权限）
wsl --install

# 安装指定发行版（以Ubuntu为例）
wsl --install -d Ubuntu-20.04

# 列出已安装的发行版
wsl -l -v

# 设置默认发行版
wsl -s <发行版名称>

# 运行指定发行版
wsl -d <发行版名称>

# 立即停止所有子系统
wsl --shutdown

# 更新
sudo apt update
sudo apt full-upgrade -y
```

### 文件系统互通
```bash
# 从Windows访问Linux文件系统
\\wsl$\<发行版名称>\

# 从Linux访问Windows文件系统
/mnt/c/  # C盘根目录
/mnt/d/  # D盘根目录
```

### 网络相关
```bash
# 查看WSL的IP地址
ip addr show eth0

# 导出子系统镜像（备份）
wsl --export <发行版名称> backup.tar

# 导入子系统镜像
wsl --import <新发行版名称> <安装路径> backup.tar
```

### 服务管理
```bash
# 启动子系统服务（需要管理员权限）
net start LxssManager

# 停止子系统服务（需要管理员权限）
net stop LxssManager
```

### 进程管理
```bash
# 查看正在运行的Linux进程
wsl -e ps aux

# 终止指定任务
wsl -t <发行版名称>
```
