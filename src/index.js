const normal = require('./normalPromise');
const logger = require('./logger');

const createTasks = ()=> [1,2,2,3,4].map( (item,index) => new Promise( (resolve, _reject) =>{
    logger.info( `task-${index} start` )
    setTimeout( ()=>{
        logger.info( `task-${index} end` );
        resolve(`task-${index} use ${item} second`);
    }, item * 1000 );
} ));

const createAppendTasks = ()=> [1,2,3].map( (item,index) => new Promise( (resolve, _reject) =>{
    logger.info( `append task-${index} start` )
    setTimeout( ()=>{
        logger.info( `append task-${index} end` );
        resolve(`append task-${index} use ${item} second`);
    }, item * 1000 );
} ));

const main = async () => {
	logger.info("---welcome---");
    let tasks = normal.excuteTasks( createTasks() );
    let appendTasks = normal.excuteTasks( createAppendTasks() );
    let results = await tasks;
    logger.info( results );
};

main().catch(error => {
	console.error('============= main catched error:', error);
});



