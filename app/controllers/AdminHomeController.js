



const home = (req,res)=>{
    res.locals.title = "Admin Anasayfa"
    return res.status(200).render('admin/home', {layout:"admin/layout"})
}



export default {
    home
}