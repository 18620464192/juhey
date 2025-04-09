const fs = require('fs');
const path = require('path');

// 读取原始数据
const rawData = require('./public/js/data.json');

// 创建输出目录
const outputDir = './public/data';
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// 处理每个分类
rawData.categories.forEach((category, index) => {
    // 生成合法文件名
    const cleanName = category.name.replace(/[\\/:*?"<>|]/g, '');
    const filename = `${cleanName || `category_${index}`}.json`;

    // 创建分类数据结构
    const categoryData = {
        categories: [category]
    };

    // 写入文件
    fs.writeFileSync(
        path.join(outputDir, filename),
        JSON.stringify(categoryData, null, 2),
        'utf8'
    );
});

console.log(`成功生成 ${rawData.categories.length} 个分类文件到 ${outputDir} 目录`);