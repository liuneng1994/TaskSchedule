# HAP_boot #

本项目为HAP前端启动入口,不要在本项目做任何业务功能性的开发

## 开发步骤 ##

### clone项目 ###

> 1.	在本地创建父级目录如`front`。
<p>

> 2.	clone本项目到父级目录中,如`front/boot`。
<p>

> 3.	clone（rdc_jee/core, rdc_jee/theme）到父级目录中,如`front/core`, `front/theme`。
<p>

> 4.	安装gulp-cli至全局环境中。并检查gulp-cli的版本号。
>
	<pre><code>$npm install gulp-cli -g</code>
	<code>$gulp --version</code></pre>
>
	 
### 项目安装 ###

进入项目路径`front/boot` 下

执行：
<pre><code>$npm install
$gulp bower:install
</code></pre>

分别安装项目依赖和bower依赖。*顺序不可以更改*

## 运行 ##

执行`gulp serve` 启动项目。

## 打包 ##

执行`gulp build` 打包项目。

## 清空 ##

执行`gulp` 清空`front/boot/src/app/` 下除`boot` 以外的所有模块以及临时文件和打包好的文件。

## 帮助 ##

执行`gulp help` 获取glup的操作。

# 声明 #

......