const express = require('express')
const sequelize = require('./models/index')


const test_table = sequelize.test_table
const test_table_include = sequelize.test_table_include

const app = express()

app.use(express.urlencoded())
app.use(express.json())

//進入頁面
app.get('/', (req, res, next) => {
    // select * from test_table
    test_table.findAll().then(result => {
        if (result.length > 0) {
            // render 是傳值對模板編譯 常見模板有 .ejs .hjs .jade 這邊使用.ejs  
            // ejs 雖不用引用，但使用前需npm install ejs --s
            // 模板方便但容易降低程式可讀性 vue可以直接取代他們
            res.render('index.ejs', { DATA: result }) // 路徑會修先找views底下檔案 第二欄為傳至網頁的值
        } else {
            res.sendStatus(404)
        }
    })
})

// 修改
app.post('/', (req, res, next) => {
    let body = req.body  //body example >> {testId:1,testName:'ABC',testAccount:'a12356',testMessage:'helloween'}
    if (!body.ID) { // 若ID為undefined   javascript中 [undefined,null,0,""] 在判斷式視為false 
        // update test_table set testName='XXX',testAccount='' ,testMessage='YYY' where testId='id'
        test_table.update(body, { where: { testId: body.testId } }).then(back => {
            res.send('更新成功')
        })
    } else {
        next()// 給下一個
    }
})

// 查看
app.post('/', (req, res) => {
    let id = req.body.ID // example>>{ID:1}
    // select * from test_table left join test_table_include on test_table.testId=test_table_include.testId where testId= 'id'
    test_table.findAll({ include: [{ model: test_table_include }], where: { testId: id } }).then(result => {
        res.render('include.ejs', { DATA: result })
    })
})
// include需先建立關聯，關聯設定在models資料夾的table設定 associate 中


const server = app.listen(24530, () => {
    let port = server.address().port
    console.log("application running on port: " + port)
})