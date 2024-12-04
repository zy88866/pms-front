# 物业管理系统

基于前后端分离开发</br>
1. 前端地址：https://github.com/zy88866/pms-front
2. 后端地址：https://github.com/zy88866/pms

## 技术框架
vue cli + elementUI + Vuex + vue-router

## 项目使用

``` bash
# 安装项目依赖
npm install

# 开启本地服务，默认为 localhost:8080
npm run dev

# 项目打包，构建生产环境
npm run build

# 打包过程中想查看具体报告则可以通过以下命令实现
npm run build --report
```

## Nginx简单部署配置
将打包后的文件放到Nginx安装目录中的html文件夹内，然后对Nginx进行简单配置即可。
``` 
server {
    listen     8080;
    server_name  localhost;
    # 项目文件目录
    root   html/vue-backend;
    index  index.html index.htm;

    location / {
        # vue-router使用history模式下的必须配置
        try_files $uri $uri/ /index.html;
        index index.html;
    }
}
```

## 阿里矢量图标使用
1. 下载 Font class 文件到本地
2. 拷贝 iconfont.woff iconfont.ttf iconfont.svg icon.eot 文件到 src/assets/icon 目录下
3. 将iconfont.css 中 头替换 添加对应的icon 
4. 在页面中使用 ``` <i class="pms-icon-**"/> ```

## 代码贡献
1. Fork
2. git checkout -b 'new-branch'
3. git commit -m '提交改动的内容'
4. git push origin/new-branch
5. 在githup下的该分支下发起 Pull Request

### 项目截图



