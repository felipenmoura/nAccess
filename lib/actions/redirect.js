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
            data.urlData.redirect(data.urlData.normalized.replace(data.rule.match.path, data.value));
            console.log('REDIRECTING', data.urlData.normalized);
            resolve(data);
        });
    }
};
