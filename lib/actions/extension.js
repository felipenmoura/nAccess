module.exports = {
    run: function (data) {
//        {
//            config,
//            rule,
//            req,
//            res,
//            urlData,
//            matched,
//            value
//        }
        return new Promise((resolve, reject)=>{
            if (!data.config.allowOverwrite || !data.config.allowOverwrite.paths) {
                data.state.dontGoDeeper = true;
            }
            if (data.urlData.ext) {
                data.urlData.redirect(data.urlData.normalized.replace(new RegExp(`\.${data.urlData.ext}$`, 'i'), data.value));
                console.log('REDIRECTING Extension', data.urlData.normalized);
            }
            
            resolve(data);
        });
    }
};
