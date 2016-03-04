
module.exports = function execute (config, req, res, data) {
    console.log('EXECUTING', config);
    let rule = null;
    for(let ruleName in config.rules){
        rule = config.rules[ruleName];
        
        if (rule.match) {
            if (rule.match.header) {
                return; // should be treated afterwards
            }
            
            if (rule.match.path) {
                let matched;
                if (matched = data.urlData.normalized.match(rule.match.path)) {
                    try{
                        for (let action in rule.apply) {
                            action = action.replace(/\\|\/|\./g, ''); // removing characters that could be unsife for paths
                            action = require(`../actions/${action}.js`);
                            action.run(config, req, res, data);
                        }
                    }catch(e){
                        console.error(e);
                        // TODO: throw a 500 error
                    }
                }
            }
        }
        //console.log(rule);
    }
    
};
