class SuperPromise {
    /**
     * 执行
     * @param {(()=>Promise<string>)[]} tasks
     * 
     * @returns {Promise<Array<string>>} - 所以执行结果
     */
     excuteTasks( tasks ){
        throw new Error('this methd must be override by subclass!');
     }
    
}

module.exports = SuperPromise;