# Ubuntu

## 安装docker
```bash
# Add Docker's official GPG key:
# sudo apt-get update
# sudo apt-get install ca-certificates curl
# sudo install -m 0755 -d /etc/apt/keyrings
# sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
# sudo chmod a+r /etc/apt/keyrings/docker.asc

curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add
cd /etc/apt/sources.list.d
sudo touch docker.list
sudo chmod 666 docker.list
sudo echo "deb [arch=amd64] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable" > docker.list
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

#将xxx替换为用户名加入到docker组中
sudo gpasswd -a xxx docker
#更新docker组
newgrp docker
```

## git
```bash
# /etc/hosts增加
140.82.113.4 github.com

# 调整密钥权限
sudo chmod 700 public-key.pem
```
