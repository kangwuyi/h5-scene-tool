/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      concat: {
        base: {
          src: ['test/js/base/*.js'],
          dest: 'dist/base.js',
        }
      },
      uglify: {
           options: {
               banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'//添加banner
           },
           build_1: {//任务一：压缩a.js，不混淆变量名，保留注释，添加banner和footer
               options: {
                   mangle: true, //混淆变量名
                   preserveComments: false, //'all'不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
                   footer:'\n/*! <%= pkg.name %> 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */'//添加footer
               },
               files: {
                   'dist/base.min.js': ['dist/base.js']
               }
           },
           buildall: {//任务三：按原文件结构压缩js文件夹内所有JS文件
               files: [{
                   expand:true,
                   cwd:'test/js/',//js目录下
                   src:'**/*.js',//所有js文件
                   dest: 'test/minjs'//输出到此目录下
               }]
           }//,
           //release: {//任务四：合并压缩a.js和b.js
            //   files: {
          //         'output/js/index.min.js': ['js/a.js', 'js/main/b.js']
          //     }
          // }
       }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  // 加载提供"uglify"任务的插件
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // 默认任务
  grunt.registerTask('defaultrelease', ['uglify:release']);
  grunt.registerTask('mina', ['uglify:build_1']);
  grunt.registerTask('minall', ['uglify:buildall']);
  grunt.registerTask('default', ['concat']);
}
