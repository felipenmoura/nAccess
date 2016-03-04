
function runInSequence (tasks) {
    // running all the promises in sequence
    return new Promise((res, rej)=>{
        tasks.reduce(function(cur, next) {
            return cur.then(next);
        }, Promise.resolve()).then(function(result) {
            res(result);
        }).catch(err=>{
            console.error(err);
            rej(err);
        });
    });
}

function applyRule (ruleName, rule, config, req, res, data) {
    return function(){
        new Promise((resolve, reject)=>{
            if (rule.match) {
                if (rule.match.header) {
                    resolve();
                }

                if (rule.match.path) {
                    let matched;
                    let tasks = [];

                    matched = data.urlData.normalized.match(rule.match.path);
                    //console.log('Running rule', ruleName);
                    if (matched) {
                        try{
                            for (let action in rule.apply) {
                                let value = rule.apply[action];
                                action = action.replace(/\\|\/|\./g, ''); // removing characters that could be unsife for paths
                                action = require(`../actions/${action}.js`);

                                // these promises must be executed in sequence
                                tasks.push(function(){
                                    return action.run({
                                        config,
                                        rule,
                                        req,
                                        res,
                                        urlData: data.urlData,
                                        matched,
                                        value
                                    });
                                })
                            }
                        }catch(e){
                            console.error(e);
                            // TODO: throw a 500 error
                        }
                    }

                    runInSequence(tasks)
                        .then(resolve)
                        .catch(err=>{
                            console.error(err);
                            reject(err);
                        });
                }
            }
        });
    };
}

module.exports = function execute (config, req, res, data) {
    return new Promise((resolve, reject)=>{
        let rules = [];

        for(let ruleName in config.rules){
            rules.push(applyRule(ruleName, config.rules[ruleName], config, req, res, data));
        }

        runInSequence(rules)
            .then(resolve)
            .catch(err=>{
                console.error(err);
                reject(err);
            });
    });
};
