<<<<<<< HEAD
exports.get404 = (req, res, next) => {
    res.status(404).render('404' , {pageTitle: 'Page Not Found' , path: 'admin/404'} );
=======
exports.get404 = (req, res, next) => {
    res.status(404).render('404' , {pageTitle: 'Page Not Found' , path: 'admin/404'} );
>>>>>>> 58dbb0b7dbfef9105531a0ceb479ce8b8c01ca4e
};