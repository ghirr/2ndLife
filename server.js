const app=require('./backend/app');
const {backend_server}=require('./backend/config/config')

app.listen(3000,()=>{
    console.log("server is running");
});
