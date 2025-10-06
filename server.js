const express = require('express');
const cors = require('cors');
const path = require('path');

// 正确导入您的数据库连接文件
const db = require('./api/event_db'); 

const app = express();
const port = 3000;

// 中间件配置
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API路由

// 健康检查
app.get('/api/health', (_req, res) => {
    res.json({ status: 'OK', message: '服务器运行正常' });
});

// 获取所有活动
app.get('/api/events', async (_req, res) => {
    try {
        const sql = `
            SELECT e.*, c.name AS category_name 
            FROM events e 
            JOIN categories c ON e.category_id = c.id 
            WHERE e.is_active = TRUE 
            ORDER BY e.date ASC
        `;
        const [rows] = await db.execute(sql);
        res.json(rows);
    } catch (error) {
        console.error('获取活动列表错误:', error);
        res.status(500).json({ error: '获取活动数据失败' });
    }
});

// 搜索活动
app.get('/api/events/search', async (req, res) => {
    try {
        const { category, location, date } = req.query;
        
        let sql = `
            SELECT e.*, c.name AS category_name 
            FROM events e 
            JOIN categories c ON e.category_id = c.id 
            WHERE e.is_active = TRUE
        `;
        const params = [];
        
        if (category) {
            sql += ' AND e.category_id = ?';
            params.push(category);
        }
        if (location) {
            sql += ' AND e.location LIKE ?';
            params.push(`%${location}%`);
        }
        if (date) {
            sql += ' AND DATE(e.date) = ?';
            params.push(date);
        }
        
        sql += ' ORDER BY e.date ASC';
        
        const [rows] = await db.execute(sql, params);
        res.json(rows);
    } catch (error) {
        console.error('搜索活动错误:', error);
        res.status(500).json({ error: '搜索活动失败' });
    }
});

// 获取单个活动详情
app.get('/api/events/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        const sql = `
            SELECT e.*, c.name AS category_name 
            FROM events e 
            JOIN categories c ON e.category_id = c.id 
            WHERE e.id = ?
        `;
        const [rows] = await db.execute(sql, [eventId]);
        
        if (rows.length === 0) {
            res.status(404).json({ error: '活动未找到' });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        console.error('获取活动详情错误:', error);
        res.status(500).json({ error: '获取活动详情失败' });
    }
});

// 获取所有类别
app.get('/api/categories', async (_req, res) => {
    try {
        const sql = 'SELECT * FROM categories ORDER BY name ASC';
        const [rows] = await db.execute(sql);
        res.json(rows);
    } catch (error) {
        console.error('获取类别错误:', error);
        res.status(500).json({ error: '获取类别数据失败' });
    }
});

app.get('*path', (_req, res) => {  
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 处理前端路由 - 返回主页面
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// 错误处理中间件
app.use((err, _req, res, _next) => {
    console.error('服务器错误:', err);
    res.status(500).json({ error: '服务器内部错误' });
});

async function testDatabaseConnection() {
    try {
        const connection = await db.getConnection();
        console.log('✅ 数据库连接成功');
        connection.release();
    } catch (error) {
        console.error('❌ 数据库连接失败:', error.message);
    }
}


// 启动服务器
app.listen(port, async () => {
    console.log(`=================================`);
    console.log(`🚀 CharityConnect服务器已启动`);
    console.log(`📍 地址: http://localhost:${port}`);
    console.log(`⏰ 时间: ${new Date().toLocaleString()}`);
    console.log(`=================================`);
    
    // 测试数据库连接
    await testDatabaseConnection();
});

// 测试数据库连接
