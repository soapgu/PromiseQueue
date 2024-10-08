const superPromise = require('./superPromise');

class NormalTask extends superPromise  {
    constructor(){
        super();
    }

    /**
     * 执行
     * @param {(()=>Promise<string>)[]} tasks
     * 
     * @returns {Promise<Array<string>>} - 所以执行结果
     */
    async excuteTasks( tasks ){
        const results = await Promise.all( tasks.map( t => t() ) );
        return results;
    }
}

module.exports = new NormalTask();