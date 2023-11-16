### 问题总结

## 无法下载 ohmyzsh 提示访问 https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh Operation timed out 超时

1、电脑配置 git 账号
2、使用 switchhosts 更改 github 的 hosts 访问列表后还不能访问 github，添加自定义 hosts 文件

访问 (IPAddress.com)[https://www.ipaddress.com/ip-lookup] 查看以下域名的IP地址，查出来的地址尽量各种尝试
```
raw.github.com
raw.githubusercontent.com
```

## (zsh 配置插件)[https://blog.osvlabs.com/?p=144]

```shell
安装插件管理插件
brew install zplug

```

在 `.zshrc` 中配置，详细配置查看 [zsh](https://github.com/zplug/zplug)
```shell
export ZPLUG_HOME=/opt/homebrew/opt/zplug
source $ZPLUG_HOME/init.zsh
```

```shell
# zsh-syntax-highlighting 命令高亮 红色代表没有此命令 绿色可能执行此命令
zplug "zsh-users/zsh-syntax-highlighting", defer:2

# git git命令alias, 使用 cat ~/.oh-my-zsh/plugins/git/git.plugin.zsh 查看所有
zplug "plugins/git",   from:oh-my-zsh

zplug "plugins/vi-mode", from:oh-my-zsh

zplug 'zsh-users/zsh-completions', defer:2

# autosuggestions 补全命令历史
zplug "zsh-users/zsh-autosuggestions"

# sudo 按两下ESC，就会在命令行头部加上sudo
zplug "plugins/sudo",   from:oh-my-zsh

# Z 类似 autojump,快速跳转文件夹
zplug "plugins/z",   from:oh-my-zsh 
```
