const normal = require('./normalPromise');
const SuperPromise = require('./superPromise');
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

/**
 * 
 * @param {SuperPromise} excutor 
 */
async function run( excutor ){
    let tasks = excutor.excuteTasks( createTasks() );
    let appendTasks = excutor.excuteTasks( createAppendTasks() );
    let results = await tasks;
    logger.info( results );
    let appendResult = await appendTasks;
    logger.info( appendResult )
}

const main = async () => {
	console.log("---main begin---");
    console.log("<<<<<<< begin excute normal tasks >>>>>>>");
    await run(normal);
    console.log("<<<<<<< end excute normal tasks >>>>>>>");
};

main().catch(error => {
	console.error('============= main catched error:', error);
});



