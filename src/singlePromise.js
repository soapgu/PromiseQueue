const superPromise = require('./superPromise');

class SinglePromise extends superPromise {
    constructor(){
        super();
        this.queue = [];
    }

    
    #enqueue(task) {
        return new Promise((resolve) => {
            this.queue.push({
                task,
                resolve
            });
        });
    }

    #processQueue() {
        if (this.queue.length > 0 && !this.queue[0].processing) {
            //console.log("process task")
            const { task, resolve } = this.queue[0];
            this.queue[0].processing = true;
            //console.log(task);
            task()
                .then(result => {
                    this.queue.shift(); // 移除已完成的任务
                    resolve(result);
                    this.#processQueue(); // 处理下一个任务
                });
        }
    }

    /**
     * 执行
     * @param {(()=>Promise<string>)[]} tasks
     * 
     * @returns {Promise<Array<string>>} - 所以执行结果
     */
    excuteTasks( tasks ){
        let results = Promise.all( tasks.map( t=> this.#enqueue(t) ) );
        this.#processQueue();
        return results
    }
}

module.exports = new SinglePromise();