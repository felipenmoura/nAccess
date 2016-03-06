module.exports = {
    run: function (data) {
        return new Promise((resolve, reject)=>{
            console.log('running log');
            resolve(data);
        });
    }
};
